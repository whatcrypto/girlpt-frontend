'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AgeVerificationModal } from './ageModal';
import { isAgeVerified } from '@/lib/age';

interface AgeGateProps {
  children: React.ReactNode;
  requireVerification?: boolean;
}

export function AgeGate({ children, requireVerification = true }: AgeGateProps) {
  const [showModal, setShowModal] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    if (requireVerification) {
      const verified = isAgeVerified();
      setIsVerified(verified);

      if (!verified) {
        setShowModal(true);
      }
    } else {
      setIsVerified(true);
    }
  }, [requireVerification]);

  const handleVerified = () => {
    setIsVerified(true);
    setShowModal(false);
  };

  const handleExit = () => {
    router.push('/');
  };

  // Don't render anything on server or while checking verification
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // If verification is required but user hasn't verified, show the modal
  if (requireVerification && !isVerified) {
    return (
      <>
        {/* Blurred background content */}
        <div className="filter blur-sm pointer-events-none">
          {children}
        </div>

        {/* Age verification modal */}
        <AgeVerificationModal
          isOpen={showModal}
          onVerified={handleVerified}
          onExit={handleExit}
        />
      </>
    );
  }

  // User is verified or verification not required
  return <>{children}</>;
}
