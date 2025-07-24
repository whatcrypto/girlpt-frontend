'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Crown, Zap, Infinity, Coins } from 'lucide-react';

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  priceId: string;
  mode: 'subscription' | 'payment';
  interval?: string;
  popular?: boolean;
  discountPercent?: string;
  icon: React.ReactNode;
  marketingFeatureList: string[];
}
export const pricingPlans: PricingPlan[] = [
  {
    id: 'usage-based',
    name: 'Usage Based',
    description: 'Perfect for trying out the service',
    price: 0.02,
    priceId: 'price_1RiXZnRseLq8LCtOrXado5Gz',
    mode: 'subscription',
    interval: 'per message',
    icon: <Coins className="w-6 h-6" />,
    marketingFeatureList: [
      "No subscription required",
      "Pay only for what you use",
      "Full conversation memory",
      "Same quality responses",
      "Perfect for casual users",
      "No commitment needed"
    ]
  },
  {
    id: 'weekly',
    name: 'Weekly',
    description: 'Perfect for regular users',
    price: 7.00,
    priceId: 'price_1RiXZyRseLq8LCtOq0VHE7Ts',
    mode: 'subscription',
    interval: 'week',
    popular: true,
    icon: <Crown className="w-6 h-6" />,
    marketingFeatureList: [
      "Never Forgets Anything",
      "Unlimited Messaging",
      "Build Your Ideal Partner",
      "Precise Detail Control",
      "Group Conversations",
      "Custom Photos",
      "Set Your Boundaries",
      "Scenario Control",
      "Lightning Fast Responses"
    ]
  },
  {
    id: 'monthly',
    name: 'Monthly',
    description: 'One-time payment, unlimited access',
    price: 25.00,
    priceId: 'price_1RiXaARseLq8LCtOMi90Hbwy',
    mode: 'payment',
    marketingFeatureList: [
      "Unlimited everything",
      "All premium features",
      "Multi-player mode",
      "Custom photos",
      "Never expires"
    ],
    icon: <Infinity className="w-6 h-6" />
  }
];


export interface CheckoutButtonProps {
  plan: PricingPlan;
  className?: string;
}

export function CheckoutButton({ plan, className }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const { isSignedIn } = useUser();

  const handleCheckout = async () => {
    if (!isSignedIn) {
      // Redirect to sign-in
      window.location.href = '/sign-in';
      return;
    }

    setLoading(true);

    try {
      console.log('Starting checkout with:', { priceId: plan.priceId, mode: plan.mode });

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plan.priceId,
          mode: plan.mode,
        }),
      });

      const data = await response.json();
      console.log('Checkout response:', data);

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert(`Failed to start checkout: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      className={className}
      size="lg"
    >
      {loading ? 'Processing...' : `Get ${plan.name}`}
    </Button>
  );
}

export function PricingCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto p-6">
      {pricingPlans.map((plan) => (
        <Card
          key={plan.id}
          className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
        >
          {plan.popular && (
            <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              Most Popular
            </Badge>
          )}

          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {plan.icon}
            </div>
            <CardTitle className="text-xl">{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">${plan.price}</span>
              {plan.interval && <span className="text-muted-foreground">/{plan.interval}</span>}
            </div>
          </CardHeader>

          <CardContent>
            <ul className="space-y-2">
              {plan.marketingFeatureList.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>

          <CardFooter>
            <CheckoutButton
              plan={plan}
              className="w-full"
            />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
