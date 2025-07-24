'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, Shield, X } from 'lucide-react';
import { setAgeVerificationCookie } from '@/lib/age';

interface AgeVerificationModalProps {
  isOpen: boolean;
  onVerified: () => void;
  onExit: () => void;
}

export function AgeVerificationModal({ isOpen, onVerified, onExit }: AgeVerificationModalProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleVerification = async () => {
    if (!isChecked) return;

    setIsLoading(true);

    try {
      // Set age verification cookie
      setAgeVerificationCookie();

      // Small delay for UX
      await new Promise(resolve => setTimeout(resolve, 300));

      onVerified();
    } catch (error) {
      console.error('Verification failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-md mx-4 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold text-white">Age Verification</h2>
          </div>
          <Button
            onClick={onExit}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Shield className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-200">
                <p className="font-medium mb-1">Adult Content Warning</p>
                <p className="text-xs">
                  This section contains explicit adult content. You must be 18+ to continue.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="age-modal-verification"
              checked={isChecked}
              onCheckedChange={(checked) => setIsChecked(checked === true)}
              className="mt-1"
            />
            <label
              htmlFor="age-modal-verification"
              className="text-sm text-gray-300 leading-relaxed cursor-pointer"
            >
              I am 18 years of age or older and consent to viewing adult content.
            </label>
          </div>

          {/* Actions */}
          <div className="flex flex-col space-y-2 pt-2">
            <Button
              onClick={handleVerification}
              disabled={!isChecked || isLoading}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
              size="sm"
            >
              {isLoading ? 'Verifying...' : 'I am 18+ - Continue'}
            </Button>

            <Button
              onClick={onExit}
              variant="outline"
              size="sm"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Exit
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Verification remembered for 30 days
          </p>
        </div>
      </div>
    </div>
  );
}
