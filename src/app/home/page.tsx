'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';

export default function HomePage() {
  const router = useRouter();

  const handleNavigate = (page: string) => {
    router.push(page);
  };

  const benefitCards = [
    {
      title: 'Track food with AI camera',
      description: 'Snap a photo and get instant nutrition analysis powered by AI',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100',
      iconBgColor: 'bg-blue-600',
      link: '/camera'
    },
    {
      title: 'Monitor children\'s nutrition',
      description: 'Track multiple children and their unique nutritional needs',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100',
      iconBgColor: 'bg-green-600',
      link: '/profile'
    },
    {
      title: 'Track your own health too',
      description: 'Parents can also track their nutritional intake and body mass index alongside their children',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      bgColor: 'bg-amber-50',
      hoverColor: 'hover:bg-amber-100',
      iconBgColor: 'bg-amber-600',
      link: '/profile'
    },
    {
      title: 'See growth trends and BMI',
      description: 'Visualize progress with charts and WHO-standard BMI tracking',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100',
      iconBgColor: 'bg-purple-600',
      link: '/trends'
    },
    {
      title: 'Compare against WHO standards',
      description: 'See how nutrition stacks up against recommended daily values',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-orange-50',
      hoverColor: 'hover:bg-orange-100',
      iconBgColor: 'bg-orange-600',
      link: '/summary'
    }
  ];

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-24">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          {/* Welcome Header */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Welcome to <span className="text-blue-600">ARFID</span> Wellness Tracker
              </h1>
              <p className="text-lg text-gray-600">
                Supporting families managing Avoidant/Restrictive Food Intake Disorder
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-6">
              {benefitCards.map((card, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigate(card.link)}
                  className={`w-full flex items-start gap-4 p-4 rounded-lg ${card.bgColor} ${card.hoverColor} transition cursor-pointer text-left`}
                >
                  <div className={`flex-shrink-0 w-12 h-12 ${card.iconBgColor} rounded-full flex items-center justify-center`}>
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{card.title}</h3>
                    <p className="text-gray-600">{card.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

