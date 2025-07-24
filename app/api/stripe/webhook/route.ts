import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

export async function POST(request: NextRequest) {
  try {
    // Get the stripe signature from headers
    const sig = request.headers.get('stripe-signature');

    if (!sig) {
      return NextResponse.json(
        { error: 'Missing stripe signature' },
        { status: 400 }
      );
    }

    // Get the raw body as text for signature verification
    const body = await request.text();

    // Construct the event
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Handle the event based on its type
    switch (stripeEvent.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(stripeEvent);
        break;

      case 'customer.subscription.created':
        await handleSubscriptionCreated(stripeEvent);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(stripeEvent);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(stripeEvent);
        break;

      case 'invoice.paid':
        await handleInvoicePaid(stripeEvent);
        break;

      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(stripeEvent);
        break;

      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(stripeEvent);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(stripeEvent);
        break;

      default:
        console.log(`Unhandled event type: ${stripeEvent.type}`);
    }

    // Return success response
    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook handler failed' },
      { status: 400 }
    );
  }
}

// Handle successful checkout session
async function handleCheckoutSessionCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session.client_reference_id;

  if (!userId) {
    console.error('No user ID found in checkout session');
    return;
  }

  try {
    const clerk = await clerkClient();
    // Update user metadata with subscription info
    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: {
        stripeCustomerId: session.customer,
        subscriptionStatus: 'active',
        subscriptionId: session.subscription,
        planType: session.metadata?.priceId || 'premium',
      },
    });

    console.log(`✅ Checkout completed for user: ${userId}`);
  } catch (error) {
    console.error('Error updating user after checkout:', error);
  }
}

// Handle subscription creation
async function handleSubscriptionCreated(event: Stripe.Event) {
  const subscription = event.data.object as any; // Using any to avoid type issues
  const userId = subscription.metadata?.userId;

  if (!userId) {
    console.error('No user ID found in subscription metadata');
    return;
  }

  try {
    const clerk = await clerkClient();
    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: {
        stripeCustomerId: subscription.customer,
        subscriptionStatus: subscription.status,
        subscriptionId: subscription.id,
        currentPeriodEnd: subscription.current_period_end,
        planType: 'premium',
      },
    });

    console.log(`✅ Subscription created for user: ${userId}`);
  } catch (error) {
    console.error('Error updating user after subscription creation:', error);
  }
}

// Handle subscription updates
async function handleSubscriptionUpdated(event: Stripe.Event) {
  const subscription = event.data.object as any; // Using any to avoid type issues
  const userId = subscription.metadata?.userId;

  if (!userId) {
    console.error('No user ID found in subscription metadata');
    return;
  }

  try {
    const clerk = await clerkClient();
    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: {
        subscriptionStatus: subscription.status,
        currentPeriodEnd: subscription.current_period_end,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });

    console.log(`✅ Subscription updated for user: ${userId}`);
  } catch (error) {
    console.error('Error updating user after subscription update:', error);
  }
}

// Handle subscription deletion
async function handleSubscriptionDeleted(event: Stripe.Event) {
  const subscription = event.data.object as any; // Using any to avoid type issues
  const userId = subscription.metadata?.userId;

  if (!userId) {
    console.error('No user ID found in subscription metadata');
    return;
  }

  try {
    const clerk = await clerkClient();
    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: {
        subscriptionStatus: 'cancelled',
        subscriptionId: null,
        currentPeriodEnd: null,
        planType: 'free',
      },
    });

    console.log(`✅ Subscription cancelled for user: ${userId}`);
  } catch (error) {
    console.error('Error updating user after subscription cancellation:', error);
  }
}

// Handle successful invoice payment
async function handleInvoicePaid(event: Stripe.Event) {
  const invoice = event.data.object as any; // Using any to avoid type issues
  const subscriptionId = invoice.subscription;

  if (!subscriptionId) return;

  try {
    // Get subscription to find user
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const userId = subscription.metadata.userId;

    if (userId) {
      const clerk = await clerkClient();
      await clerk.users.updateUserMetadata(userId, {
        publicMetadata: {
          subscriptionStatus: 'active',
          lastPaymentDate: invoice.status_transitions?.paid_at,
        },
      });

      console.log(`✅ Invoice paid for user: ${userId}`);
    }
  } catch (error) {
    console.error('Error handling invoice payment:', error);
  }
}

// Handle failed invoice payment
async function handleInvoicePaymentFailed(event: Stripe.Event) {
  const invoice = event.data.object as any; // Using any to avoid type issues
  const subscriptionId = invoice.subscription;

  if (!subscriptionId) return;

  try {
    // Get subscription to find user
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const userId = subscription.metadata.userId;

    if (userId) {
      const clerk = await clerkClient();
      await clerk.users.updateUserMetadata(userId, {
        publicMetadata: {
          subscriptionStatus: 'past_due',
          lastPaymentFailed: true,
        },
      });

      console.log(`⚠️ Payment failed for user: ${userId}`);
    }
  } catch (error) {
    console.error('Error handling failed payment:', error);
  }
}

// Handle successful payment intent
async function handlePaymentIntentSucceeded(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  const userId = paymentIntent.metadata.userId;

  if (!userId) return;

  try {
    const clerk = await clerkClient();
    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: {
        lastPaymentDate: paymentIntent.created,
        planType: 'premium',
      },
    });

    console.log(`✅ One-time payment succeeded for user: ${userId}`);
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}

// Handle failed payment intent
async function handlePaymentIntentFailed(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  const userId = paymentIntent.metadata.userId;

  if (!userId) return;

  console.log(`⚠️ Payment failed for user: ${userId}`);
}
