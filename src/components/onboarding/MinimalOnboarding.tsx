'use client';

import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/hooks/useOnboarding';

export default function MinimalOnboarding() {
  const { completeOnboarding, setPreferredHomePage } = useOnboarding();
  const router = useRouter();

  const handleStartWithCamera = () => {
    setPreferredHomePage('/');
    completeOnboarding();
    router.push('/');
  };

  const handleExploreApp = () => {
    setPreferredHomePage('/summary');
    completeOnboarding();
    router.push('/summary');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 md:p-10 animate-fade-in">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            <span className="text-blue-600">ARFID</span> Wellness Tracker
          </h1>
          <p className="text-gray-600">
            Supporting families with Avoidant/Restrictive Food Intake Disorder
          </p>
        </div>

        {/* Quick Features */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <p>Track food nutrition with your camera</p>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <p>Monitor children's growth and BMI</p>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <p>Track your own nutrition and BMI too</p>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <p>Visualize progress over time</p>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This app tracks food only, not supplements. Always consult healthcare providers for personalized advice.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleStartWithCamera}
            className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl transition shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start with Camera →
          </button>
          <button
            onClick={handleExploreApp}
            className="w-full py-4 px-6 bg-white hover:bg-gray-50 text-gray-900 text-lg font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 transition"
          >
            Explore App
          </button>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-gray-500 mt-6">
          You can access all features from the navigation menu
        </p>
      </div>
    </div>
  );
}


