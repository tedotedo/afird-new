'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type OnboardingVariation = 'simple' | 'walkthrough' | 'interactive' | 'minimal';

interface OnboardingContextType {
  hasSeenOnboarding: boolean;
  currentVariation: OnboardingVariation;
  preferredHomePage: string;
  setPreferredHomePage: (page: string) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const ONBOARDING_SEEN_KEY = 'hasSeenOnboarding';
const ONBOARDING_COMPLETED_KEY = 'onboardingCompleted';
const PREFERRED_HOME_PAGE_KEY = 'preferredHomePage';

export function OnboardingProvider({ 
  children,
  variation = 'simple'
}: { 
  children: ReactNode;
  variation?: OnboardingVariation;
}) {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(true); // Default to true during SSR
  const [preferredHomePage, setPreferredHomePageState] = useState('/');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage only on client side
    const seen = localStorage.getItem(ONBOARDING_SEEN_KEY) === 'true';
    const preferredPage = localStorage.getItem(PREFERRED_HOME_PAGE_KEY) || '/';
    
    setHasSeenOnboarding(seen);
    setPreferredHomePageState(preferredPage);
  }, []);

  const setPreferredHomePage = (page: string) => {
    setPreferredHomePageState(page);
    if (mounted) {
      localStorage.setItem(PREFERRED_HOME_PAGE_KEY, page);
    }
  };

  const completeOnboarding = () => {
    setHasSeenOnboarding(true);
    if (mounted) {
      localStorage.setItem(ONBOARDING_SEEN_KEY, 'true');
      localStorage.setItem(ONBOARDING_COMPLETED_KEY, new Date().toISOString());
    }
  };

  const resetOnboarding = () => {
    setHasSeenOnboarding(false);
    if (mounted) {
      localStorage.removeItem(ONBOARDING_SEEN_KEY);
      localStorage.removeItem(ONBOARDING_COMPLETED_KEY);
      localStorage.removeItem(PREFERRED_HOME_PAGE_KEY);
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        hasSeenOnboarding,
        currentVariation: variation,
        preferredHomePage,
        setPreferredHomePage,
        completeOnboarding,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboardingContext() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboardingContext must be used within an OnboardingProvider');
  }
  return context;
}


