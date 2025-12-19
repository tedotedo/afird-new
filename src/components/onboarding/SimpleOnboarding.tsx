'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/hooks/useOnboarding';

export default function SimpleOnboarding() {
  const [screen, setScreen] = useState<'welcome' | 'choose'>('welcome');
  const { completeOnboarding, setPreferredHomePage } = useOnboarding();
  const router = useRouter();

  const handleGetStarted = () => {
    setScreen('choose');
  };

  const handleSelectPage = (page: string) => {
    setPreferredHomePage(page);
    completeOnboarding();
    router.push(page);
  };

  const handleQuickStart = (page: string) => {
    completeOnboarding();
    router.push(page);
  };

  if (screen === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 animate-fade-in">
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Welcome to <span className="text-blue-600">ARFID</span> Wellness Tracker
            </h1>
            <p className="text-lg text-gray-600">
              Supporting families managing Avoidant/Restrictive Food Intake Disorder
            </p>
          </div>

          {/* Key Benefits */}
          <div className="space-y-6 mb-10">
            <button
              onClick={() => handleQuickStart('/camera')}
              className="w-full flex items-start gap-4 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition cursor-pointer text-left"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Track food with AI camera</h3>
                <p className="text-gray-600">Snap a photo and get instant nutrition analysis powered by AI</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickStart('/profile')}
              className="w-full flex items-start gap-4 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition cursor-pointer text-left"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Monitor children's nutrition</h3>
                <p className="text-gray-600">Track multiple children and their unique nutritional needs</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickStart('/profile')}
              className="w-full flex items-start gap-4 p-4 rounded-lg bg-amber-50 hover:bg-amber-100 transition cursor-pointer text-left"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Track your own health too</h3>
                <p className="text-gray-600">Parents can also track their nutritional intake and body mass index alongside their children</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickStart('/trends')}
              className="w-full flex items-start gap-4 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition cursor-pointer text-left"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">See growth trends and BMI</h3>
                <p className="text-gray-600">Visualize progress with charts and WHO-standard BMI tracking</p>
              </div>
            </button>

            <button
              onClick={() => handleQuickStart('/summary')}
              className="w-full flex items-start gap-4 p-4 rounded-lg bg-orange-50 hover:bg-orange-100 transition cursor-pointer text-left"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Compare against WHO standards</h3>
                <p className="text-gray-600">See how nutrition stacks up against recommended daily values</p>
              </div>
            </button>
          </div>

          {/* Get Started Button */}
          <button
            onClick={handleGetStarted}
            className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl transition shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Started →
          </button>
        </div>
      </div>
    );
  }

  // Choose Home Page Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Where would you like to start?
          </h2>
          <p className="text-lg text-gray-600">
            Choose your preferred starting page (you can change this later)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Camera Option */}
          <button
            onClick={() => handleSelectPage('/')}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition text-left group"
          >
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-700 transition">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Camera</h3>
            <p className="text-gray-600">Take photos of food and get instant nutrition analysis</p>
          </button>

          {/* Summary Option */}
          <button
            onClick={() => handleSelectPage('/summary')}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition text-left group"
          >
            <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-700 transition">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Summary</h3>
            <p className="text-gray-600">See daily nutrition overview and WHO comparisons</p>
          </button>

          {/* Trends Option */}
          <button
            onClick={() => handleSelectPage('/trends')}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition text-left group"
          >
            <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-700 transition">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Trends</h3>
            <p className="text-gray-600">Track growth, BMI, and nutrition progress over time</p>
          </button>

          {/* Profile Option */}
          <button
            onClick={() => handleSelectPage('/profile')}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition text-left group"
          >
            <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-700 transition">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Profile</h3>
            <p className="text-gray-600">Manage children profiles and track your own growth measurements too</p>
          </button>
        </div>
      </div>
    </div>
  );
}

