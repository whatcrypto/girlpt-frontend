/**
 * Age verification utilities for NSFW content access
 */

import React from 'react';

export const AGE_VERIFICATION_COOKIE = 'age_verified';
export const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

/**
 * Sets the age verification cookie
 */
export function setAgeVerificationCookie(): void {
  if (typeof document !== 'undefined') {
    document.cookie = `${AGE_VERIFICATION_COOKIE}=true; max-age=${COOKIE_MAX_AGE}; path=/; secure; samesite=strict`;
  }
}

/**
 * Checks if user has verified their age (client-side)
 */
export function isAgeVerified(): boolean {
  if (typeof document === 'undefined') return false;

  return document.cookie
    .split(';')
    .some(c => c.trim().startsWith(`${AGE_VERIFICATION_COOKIE}=true`));
}

/**
 * Removes the age verification cookie
 */
export function clearAgeVerification(): void {
  if (typeof document !== 'undefined') {
    document.cookie = `${AGE_VERIFICATION_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

/**
 * Redirects to age verification page with return URL
 */
export function redirectToAgeVerification(returnTo?: string): void {
  if (typeof window !== 'undefined') {
    const url = new URL('/age-verification', window.location.origin);
    if (returnTo) {
      url.searchParams.set('returnTo', returnTo);
    }
    window.location.href = url.toString();
  }
}

/**
 * Higher-order component to protect pages with age verification
 */
export function withAgeVerification<T extends {}>(
  Component: React.ComponentType<T>
): React.ComponentType<T> {
  return function AgeVerifiedComponent(props: T) {
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
      setIsClient(true);

      if (!isAgeVerified()) {
        redirectToAgeVerification(window.location.pathname);
      }
    }, []);

    if (!isClient || !isAgeVerified()) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p>Verifying access...</p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}

/**
 * Hook to check age verification status
 */
export function useAgeVerification() {
  const [verified, setVerified] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setVerified(isAgeVerified());
    setLoading(false);
  }, []);

  return {
    isVerified: verified,
    isLoading: loading,
    verify: setAgeVerificationCookie,
    clear: clearAgeVerification
  };
}
