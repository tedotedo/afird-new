'use client';

import CameraScreen from '@/screens/CameraScreen';
import AuthGuard from '@/components/AuthGuard';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import OnboardingWrapper from '@/components/onboarding/OnboardingWrapper';

// TESTING: Change this constant to try different onboarding styles
// Options: 'simple' | 'walkthrough' | 'interactive' | 'minimal'
const ONBOARDING_VARIATION = 'simple' as const;

// To reset and see onboarding again, open browser console and run:
// localStorage.removeItem('hasSeenOnboarding');
// Then refresh the page

export default function Home() {
  return (
    <AuthGuard>
      <OnboardingProvider variation={ONBOARDING_VARIATION}>
        <OnboardingWrapper>
          <CameraScreen />
        </OnboardingWrapper>
      </OnboardingProvider>
    </AuthGuard>
  );
}

