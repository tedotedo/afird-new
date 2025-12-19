'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/hooks/useOnboarding';
import ProgressDots from './ProgressDots';

export default function WalkthroughOnboarding() {
  const [step, setStep] = useState(0);
  const { completeOnboarding, setPreferredHomePage } = useOnboarding();
  const router = useRouter();

  const totalSteps = 5;

  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSkip = () => {
    setStep(totalSteps - 1);
  };

  const handleSelectPage = (page: string) => {
    setPreferredHomePage(page);
    completeOnboarding();
    router.push(page);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="text-center animate-fade-in">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Welcome to <span className="text-blue-600">AFIRD</span> Food Tracker
            </h2>
            <p className="text-lg text-gray-600 mb-2">
              Supporting families managing Avoidant/Restrictive Food Intake Disorder
            </p>
            <p className="text-base text-gray-500">
              Let's show you around — it only takes a minute!
            </p>
          </div>
        );

      case 1:
        return (
          <div className="text-center animate-fade-in">
            <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-32 h-32 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Camera & AI Analysis
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              Snap a photo, get instant nutrition analysis
            </p>
            <p className="text-base text-gray-500">
              Our AI-powered system recognizes food and provides detailed nutritional information in seconds. No manual entry required!
            </p>
          </div>
        );

      case 2:
        return (
          <div className="text-center animate-fade-in">
            <div className="w-full h-64 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-32 h-32 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Children & Family Tracking
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              Track multiple children, monitor growth
            </p>
            <p className="text-base text-gray-500">
              Create profiles for each child with height, weight, and BMI tracking using WHO standards. Perfect for families managing ARFID.
            </p>
          </div>
        );

      case 3:
        return (
          <div className="text-center animate-fade-in">
            <div className="w-full h-64 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-32 h-32 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Trends & Progress
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              Visualize progress over time
            </p>
            <p className="text-base text-gray-500">
              Beautiful charts showing growth, BMI, and nutrition trends. Track vitamins, minerals, and celebrate every milestone!
            </p>
          </div>
        );

      case 4:
        return (
          <div className="text-center animate-fade-in">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Where would you like to start?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <button
                onClick={() => handleSelectPage('/')}
                className="bg-white border-2 border-blue-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-lg transition text-left group"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-700 transition">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Camera</h4>
                <p className="text-sm text-gray-600">Take food photos</p>
              </button>

              <button
                onClick={() => handleSelectPage('/summary')}
                className="bg-white border-2 border-green-200 rounded-xl p-6 hover:border-green-500 hover:shadow-lg transition text-left group"
              >
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-700 transition">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Summary</h4>
                <p className="text-sm text-gray-600">Daily nutrition</p>
              </button>

              <button
                onClick={() => handleSelectPage('/trends')}
                className="bg-white border-2 border-purple-200 rounded-xl p-6 hover:border-purple-500 hover:shadow-lg transition text-left group"
              >
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-700 transition">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Trends</h4>
                <p className="text-sm text-gray-600">Track progress</p>
              </button>

              <button
                onClick={() => handleSelectPage('/profile')}
                className="bg-white border-2 border-orange-200 rounded-xl p-6 hover:border-orange-500 hover:shadow-lg transition text-left group"
              >
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-orange-700 transition">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 mb-1">Profile</h4>
                <p className="text-sm text-gray-600">Manage children</p>
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Skip button */}
        {step < totalSteps - 1 && (
          <div className="flex justify-end mb-4">
            <button
              onClick={handleSkip}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/50 transition"
            >
              Skip tour →
            </button>
          </div>
        )}

        {/* Main content card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 min-h-[500px] flex flex-col">
          <div className="flex-1 flex items-center justify-center">
            {renderStep()}
          </div>

          {/* Progress dots */}
          <div className="mt-8">
            <ProgressDots total={totalSteps} current={step} />
          </div>

          {/* Navigation buttons */}
          {step < totalSteps - 1 && (
            <div className="flex gap-4 mt-6">
              {step > 0 && (
                <button
                  onClick={handlePrevious}
                  className="flex-1 py-3 px-6 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold rounded-xl transition"
                >
                  ← Previous
                </button>
              )}
              <button
                onClick={handleNext}
                className={`${step === 0 ? 'w-full' : 'flex-1'} py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition`}
              >
                {step === totalSteps - 2 ? 'Choose starting page →' : 'Next →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

