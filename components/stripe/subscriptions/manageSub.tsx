'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, CreditCard, Calendar, AlertCircle, Crown } from 'lucide-react';

interface SubscriptionData {
  subscriptionStatus?: string;
  planType?: string;
  stripeCustomerId?: string;
  currentPeriodEnd?: number;
  cancelAtPeriodEnd?: boolean;
  lastPaymentFailed?: boolean;
}

export function ManageSubscription() {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData>({});

  useEffect(() => {
    if (isLoaded && user) {
      const metadata = user.publicMetadata as SubscriptionData;
      setSubscriptionData(metadata);
    }
  }, [user, isLoaded]);

  const openCustomerPortal = async () => {
    if (!subscriptionData.stripeCustomerId) {
      alert('No subscription found');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: subscriptionData.stripeCustomerId,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.open(data.url, '_blank');
      } else {
        throw new Error('No portal URL received');
      }
    } catch (error) {
      console.error('Portal error:', error);
      alert('Failed to open customer portal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'past_due':
        return <Badge variant="destructive">Past Due</Badge>;
      case 'cancelled':
        return <Badge variant="secondary">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Free</Badge>;
    }
  };

  const getPlanName = (planType?: string) => {
    switch (planType) {
      case 'premium':
        return 'Premium';
      case 'free':
        return 'Free';
      default:
        return 'Free';
    }
  };

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please sign in to manage your subscription.</div>;
  }

  const hasActiveSubscription = subscriptionData.subscriptionStatus === 'active';
  const hasPaidPlan = subscriptionData.planType === 'premium';

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Subscription Management</h1>
        <p className="text-muted-foreground mt-2">
          Manage your AI girlfriend subscription and billing
        </p>
      </div>

      {/* Current Plan Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5" />
              <CardTitle>Current Plan</CardTitle>
            </div>
            {getStatusBadge(subscriptionData.subscriptionStatus)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Plan Type</p>
              <p className="font-semibold">{getPlanName(subscriptionData.planType)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="font-semibold">{subscriptionData.subscriptionStatus || 'Free'}</p>
            </div>
          </div>

          {subscriptionData.currentPeriodEnd && (
            <div>
              <p className="text-sm text-muted-foreground">
                {subscriptionData.cancelAtPeriodEnd ? 'Expires on' : 'Renews on'}
              </p>
              <p className="font-semibold">{formatDate(subscriptionData.currentPeriodEnd)}</p>
            </div>
          )}

          {subscriptionData.lastPaymentFailed && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <p className="text-sm text-red-700 dark:text-red-300">
                Your last payment failed. Please update your payment method.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Features Card */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Features</CardTitle>
          <CardDescription>
            {hasPaidPlan ? 'You have access to all premium features' : 'Upgrade to unlock premium features'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className={`flex items-center gap-2 ${hasPaidPlan ? 'text-green-600' : 'text-muted-foreground'}`}>
              <div className={`w-2 h-2 rounded-full ${hasPaidPlan ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-sm">Unlimited messages</span>
            </div>
            <div className={`flex items-center gap-2 ${hasPaidPlan ? 'text-green-600' : 'text-muted-foreground'}`}>
              <div className={`w-2 h-2 rounded-full ${hasPaidPlan ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-sm">Image generation</span>
            </div>
            <div className={`flex items-center gap-2 ${hasPaidPlan ? 'text-green-600' : 'text-muted-foreground'}`}>
              <div className={`w-2 h-2 rounded-full ${hasPaidPlan ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-sm">All AI girlfriends</span>
            </div>
            <div className={`flex items-center gap-2 ${hasPaidPlan ? 'text-green-600' : 'text-muted-foreground'}`}>
              <div className={`w-2 h-2 rounded-full ${hasPaidPlan ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-sm">Priority support</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        {hasActiveSubscription && subscriptionData.stripeCustomerId && (
          <Button
            onClick={openCustomerPortal}
            disabled={loading}
            className="flex items-center gap-2"
            variant="outline"
          >
            <Settings className="w-4 h-4" />
            {loading ? 'Opening...' : 'Manage Billing'}
          </Button>
        )}

        {!hasPaidPlan && (
          <Button asChild className="flex items-center gap-2">
            <a href="/#pricing">
              <CreditCard className="w-4 h-4" />
              Upgrade to Premium
            </a>
          </Button>
        )}

        <Button variant="ghost" asChild>
          <a href="mailto:support@yourdomain.com">
            Contact Support
          </a>
        </Button>
      </div>
    </div>
  );
}
