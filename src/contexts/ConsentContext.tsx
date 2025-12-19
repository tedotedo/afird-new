'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';

type ConsentType = 'cookies' | 'medical_disclaimer' | 'gdpr';

interface ConsentState {
  cookies: boolean;
  medical_disclaimer: boolean;
  gdpr: boolean;
}

interface ConsentContextType {
  consents: ConsentState;
  hasAllConsents: boolean;
  loading: boolean;
  acceptConsent: (type: ConsentType) => Promise<void>;
  checkConsents: () => Promise<void>;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

const STORAGE_KEY = 'user_consents';

export function ConsentProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [consents, setConsents] = useState<ConsentState>({
    cookies: false,
    medical_disclaimer: false,
    gdpr: false,
  });
  const [loading, setLoading] = useState(true);

  const hasAllConsents = consents.cookies && consents.medical_disclaimer && consents.gdpr;

  // Load consents from localStorage and API
  const checkConsents = async () => {
    try {
      // First check localStorage for quick access
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setConsents(parsed);
        }
      }

      // If user is logged in, fetch from API as source of truth
      if (user) {
        const response = await fetch('/api/consents');
        if (response.ok) {
          const { consents: apiConsents } = await response.json();
          
          // Convert array to object
          const consentState: ConsentState = {
            cookies: false,
            medical_disclaimer: false,
            gdpr: false,
          };

          apiConsents.forEach((consent: any) => {
            if (consent.accepted) {
              consentState[consent.consent_type as ConsentType] = true;
            }
          });

          setConsents(consentState);
          
          // Update localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(consentState));
          }
        }
      }
    } catch (error) {
      console.error('Error checking consents:', error);
    } finally {
      setLoading(false);
    }
  };

  // Accept a specific consent
  const acceptConsent = async (type: ConsentType) => {
    try {
      const newConsents = { ...consents, [type]: true };
      setConsents(newConsents);

      // Update localStorage immediately
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newConsents));
      }

      // If user is logged in, save to database
      if (user) {
        const response = await fetch('/api/consents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            consentType: type,
            accepted: true,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to save consent');
        }
      }
    } catch (error) {
      console.error('Error accepting consent:', error);
    }
  };

  // Check consents when user changes or component mounts
  useEffect(() => {
    checkConsents();
  }, [user]);

  return (
    <ConsentContext.Provider
      value={{
        consents,
        hasAllConsents,
        loading,
        acceptConsent,
        checkConsents,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (context === undefined) {
    throw new Error('useConsent must be used within a ConsentProvider');
  }
  return context;
}

