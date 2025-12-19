'use client';

import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';
import { OnboardingProvider } from '@/contexts/OnboardingContext';
import OnboardingWrapper from '@/components/onboarding/OnboardingWrapper';
import { useState } from 'react';

// TESTING: Change this constant to try different onboarding styles
// Options: 'simple' | 'walkthrough' | 'interactive' | 'minimal'
const ONBOARDING_VARIATION = 'simple' as const;

// To reset and see onboarding again, open browser console and run:
// localStorage.removeItem('hasSeenOnboarding');
// Then refresh the page

function HomePage() {
  const router = useRouter();
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const mainCards = [
    {
      id: 'camera',
      title: 'Track Food',
      description: 'Take photos and analyze nutritional content with AI',
      icon: '📸',
      href: '/camera',
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'from-blue-600 to-blue-700',
    },
    {
      id: 'summary',
      title: 'Daily Summary',
      description: 'View today\'s nutrition overview and goals',
      icon: '📊',
      href: '/summary',
      color: 'from-green-500 to-green-600',
      hoverColor: 'from-green-600 to-green-700',
    },
    {
      id: 'trends',
      title: 'Trends & Growth',
      description: 'Monitor nutritional patterns and development',
      icon: '📈',
      href: '/trends',
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'from-purple-600 to-purple-700',
    },
    {
      id: 'profile',
      title: 'Children',
      description: 'Manage child profiles and measurements',
      icon: '👶',
      href: '/profile',
      color: 'from-pink-500 to-pink-600',
      hoverColor: 'from-pink-600 to-pink-700',
    },
  ];

  const secondaryCards = [
    {
      id: 'history',
      title: 'History',
      icon: '📜',
      href: '/history',
      color: 'from-amber-500 to-amber-600',
      hoverColor: 'from-amber-600 to-amber-700',
    },
    {
      id: 'nutrition-info',
      title: 'Nutrition Info',
      icon: '🥗',
      href: '/nutrition-info',
      color: 'from-emerald-500 to-emerald-600',
      hoverColor: 'from-emerald-600 to-emerald-700',
    },
    {
      id: 'arfid-info',
      title: 'About ARFID',
      icon: '💙',
      href: '/arfid-info',
      color: 'from-indigo-500 to-indigo-600',
      hoverColor: 'from-indigo-600 to-indigo-700',
    },
    {
      id: 'about',
      title: 'About',
      icon: 'ℹ️',
      href: '/about',
      color: 'from-cyan-500 to-cyan-600',
      hoverColor: 'from-cyan-600 to-cyan-700',
    },
  ];

  const handleCardClick = (href: string) => {
    router.push(href);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">ARFID Wellness Tracker</h1>
          <p className="text-lg md:text-xl text-blue-100">
            Supporting families with comprehensive nutritional tracking and ARFID management
          </p>
        </div>
      </div>

      {/* Main Cards Grid */}
      <div className="container mx-auto px-4 max-w-6xl py-8 md:py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {mainCards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.href)}
              onMouseEnter={() => setActiveCard(card.id)}
              onMouseLeave={() => setActiveCard(null)}
              onTouchStart={() => setActiveCard(card.id)}
              onTouchEnd={() => setActiveCard(null)}
              className={`
                relative overflow-hidden rounded-2xl shadow-lg 
                transform transition-all duration-300 ease-out
                ${activeCard === card.id ? 'scale-105 shadow-2xl' : 'hover:scale-105 hover:shadow-2xl'}
                focus:outline-none focus:ring-4 focus:ring-blue-300
              `}
            >
              <div className={`
                bg-gradient-to-br ${activeCard === card.id ? card.hoverColor : card.color}
                p-8 text-white text-left transition-all duration-300
              `}>
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl md:text-6xl">{card.icon}</div>
                  <svg 
                    className={`w-6 h-6 transform transition-transform duration-300 ${activeCard === card.id ? 'translate-x-1' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                <p className="text-white/90">{card.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Secondary Cards Grid */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Resources</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {secondaryCards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.href)}
              onMouseEnter={() => setActiveCard(card.id)}
              onMouseLeave={() => setActiveCard(null)}
              onTouchStart={() => setActiveCard(card.id)}
              onTouchEnd={() => setActiveCard(null)}
              className={`
                relative overflow-hidden rounded-xl shadow-md
                transform transition-all duration-300 ease-out
                ${activeCard === card.id ? 'scale-105 shadow-xl' : 'hover:scale-105 hover:shadow-xl'}
                focus:outline-none focus:ring-4 focus:ring-blue-300
              `}
            >
              <div className={`
                bg-gradient-to-br ${activeCard === card.id ? card.hoverColor : card.color}
                p-6 text-white text-center transition-all duration-300
              `}>
                <div className="text-4xl mb-3">{card.icon}</div>
                <h3 className="text-base md:text-lg font-semibold">{card.title}</h3>
              </div>
            </button>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-bold text-gray-900 mb-2">Track Nutrition</h3>
              <p className="text-gray-600 text-sm">AI-powered photo analysis for comprehensive nutritional tracking</p>
            </div>
            <div>
              <div className="text-3xl mb-3">📈</div>
              <h3 className="font-bold text-gray-900 mb-2">Monitor Growth</h3>
              <p className="text-gray-600 text-sm">WHO-standard growth charts and BMI tracking for children</p>
            </div>
            <div>
              <div className="text-3xl mb-3">💙</div>
              <h3 className="font-bold text-gray-900 mb-2">ARFID Support</h3>
              <p className="text-gray-600 text-sm">Specialized tools and resources for managing ARFID</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <AuthGuard>
      <OnboardingProvider variation={ONBOARDING_VARIATION}>
        <OnboardingWrapper>
          <HomePage />
        </OnboardingWrapper>
      </OnboardingProvider>
    </AuthGuard>
  );
}

