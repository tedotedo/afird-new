'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/hooks/useOnboarding';
import SimpleOnboarding from './SimpleOnboarding';
import WalkthroughOnboarding from './WalkthroughOnboarding';
import InteractiveTutorial from './InteractiveTutorial';
import MinimalOnboarding from './MinimalOnboarding';

export default function OnboardingWrapper({ children }: { children: React.ReactNode }) {
  const { hasSeenOnboarding, currentVariation, preferredHomePage } = useOnboarding();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't show anything until mounted (prevents hydration mismatch)
  if (!mounted) {
    return null;
  }

  // If user has completed onboarding and has a preferred home page, redirect
  if (hasSeenOnboarding && preferredHomePage && preferredHomePage !== '/') {
    router.push(preferredHomePage);
    return null;
  }

  // Show onboarding if not completed
  if (!hasSeenOnboarding) {
    switch (currentVariation) {
      case 'simple':
        return <SimpleOnboarding />;
      case 'walkthrough':
        return <WalkthroughOnboarding />;
      case 'interactive':
        return <InteractiveTutorial>{children}</InteractiveTutorial>;
      case 'minimal':
        return <MinimalOnboarding />;
      default:
        return <SimpleOnboarding />;
    }
  }

  // User has seen onboarding, show normal app
  return <>{children}</>;
}


