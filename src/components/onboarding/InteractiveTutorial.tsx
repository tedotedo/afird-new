'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/hooks/useOnboarding';
import Spotlight from './Spotlight';

export default function InteractiveTutorial({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(0);
  const [elementPosition, setElementPosition] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);
  const { completeOnboarding, setPreferredHomePage } = useOnboarding();
  const router = useRouter();

  const totalSteps = 4;

  // Update element position based on step
  useEffect(() => {
    const updatePosition = () => {
      let element: HTMLElement | null = null;

      switch (step) {
        case 0:
          // Try to find the camera button (main capture button)
          element = document.querySelector('button[class*="rounded-full"]') as HTMLElement;
          if (!element) {
            // Fallback to any prominent button
            element = document.querySelector('button') as HTMLElement;
          }
          break;
        case 1:
          // Try to find the child selector dropdown
          element = document.querySelector('select, [role="combobox"]') as HTMLElement;
          if (!element) {
            // Fallback to navigation area
            element = document.querySelector('nav') as HTMLElement;
          }
          break;
        case 2:
          // Navigation links
          element = document.querySelector('nav') as HTMLElement;
          break;
        case 3:
          // Final modal - no spotlight needed
          setElementPosition(null);
          return;
      }

      if (element) {
        const rect = element.getBoundingClientRect();
        setElementPosition({
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
        });
      }
    };

    // Update position after a short delay to ensure DOM is ready
    const timer = setTimeout(updatePosition, 300);
    window.addEventListener('resize', updatePosition);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updatePosition);
    };
  }, [step]);

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  };

  const handleSelectPage = (page: string) => {
    setPreferredHomePage(page);
    completeOnboarding();
    router.push(page);
  };

  const handleComplete = () => {
    setPreferredHomePage('/');
    completeOnboarding();
  };

  const renderTooltip = () => {
    switch (step) {
      case 0:
        return (
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-3">📸 Camera</h3>
            <p className="text-gray-700 mb-4">
              This is where you'll take photos of food. Our AI will analyze them and provide instant nutrition information.
            </p>
            <button
              onClick={handleNext}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              Next →
            </button>
          </div>
        );

      case 1:
        return (
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-3">👨‍👩‍👧‍👦 Child Selector</h3>
            <p className="text-gray-700 mb-4">
              Select which child you're tracking for. You can create profiles in the Profile section and switch between them anytime.
            </p>
            <button
              onClick={handleNext}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              Got it →
            </button>
          </div>
        );

      case 2:
        return (
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-sm mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-3">🧭 Navigation</h3>
            <div className="text-gray-700 mb-4 space-y-2">
              <p className="font-semibold">Explore the app:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Camera:</strong> Take food photos</li>
                <li><strong>History:</strong> View past entries</li>
                <li><strong>Summary:</strong> Daily nutrition overview</li>
                <li><strong>Trends:</strong> Track progress over time</li>
                <li><strong>Profile:</strong> Manage children & BMI</li>
              </ul>
            </div>
            <button
              onClick={handleNext}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              Show me more →
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  // Final modal (step 3)
  if (step === 3) {
    return (
      <>
        {children}
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
              Where would you like to start?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => handleSelectPage('/')}
                className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition text-left"
              >
                <div className="text-3xl mb-2">📸</div>
                <h4 className="font-bold text-gray-900 mb-1">Camera</h4>
                <p className="text-sm text-gray-600">Start taking food photos</p>
              </button>

              <button
                onClick={() => handleSelectPage('/summary')}
                className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 hover:border-green-500 hover:shadow-lg transition text-left"
              >
                <div className="text-3xl mb-2">📊</div>
                <h4 className="font-bold text-gray-900 mb-1">Summary</h4>
                <p className="text-sm text-gray-600">View daily nutrition</p>
              </button>

              <button
                onClick={() => handleSelectPage('/trends')}
                className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6 hover:border-purple-500 hover:shadow-lg transition text-left"
              >
                <div className="text-3xl mb-2">📈</div>
                <h4 className="font-bold text-gray-900 mb-1">Trends</h4>
                <p className="text-sm text-gray-600">Track progress over time</p>
              </button>

              <button
                onClick={() => handleSelectPage('/profile')}
                className="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6 hover:border-orange-500 hover:shadow-lg transition text-left"
              >
                <div className="text-3xl mb-2">👤</div>
                <h4 className="font-bold text-gray-900 mb-1">Profile</h4>
                <p className="text-sm text-gray-600">Manage children profiles</p>
              </button>
            </div>
            <button
              onClick={handleComplete}
              className="w-full py-3 text-gray-600 hover:text-gray-900 font-medium transition"
            >
              I'll explore on my own
            </button>
          </div>
        </div>
      </>
    );
  }

  // Steps 0-2: Spotlight overlay
  return (
    <>
      {children}
      {elementPosition && (
        <Spotlight position={elementPosition}>
          {renderTooltip()}
        </Spotlight>
      )}
      {!elementPosition && step < 3 && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-6 z-50">
          {renderTooltip()}
        </div>
      )}
    </>
  );
}

