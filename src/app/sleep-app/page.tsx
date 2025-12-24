'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DisclaimerBanner from '@/components/sleep-app/DisclaimerBanner';

export default function SleepAppLanding() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      <DisclaimerBanner />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              🌙 Autism Sleep Tracker
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Supporting families in optimizing sleep for autistic children, 
              with special focus on melatonin efficacy tracking
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/sleep-app/login')}
                className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors shadow-lg"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push('/sleep-app/signup')}
                className="bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-800 transition-colors shadow-lg border-2 border-white/20"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 max-w-6xl py-16">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Comprehensive Sleep Support
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">💊</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Melatonin Tracking</h3>
            <p className="text-gray-600">
              Track dosage, timing, and efficacy to optimize medication effectiveness
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Sleep Analytics</h3>
            <p className="text-gray-600">
              Identify patterns and correlations to improve sleep quality
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Visual Routines</h3>
            <p className="text-gray-600">
              Customizable bedtime routines with visual guides for children
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Multi-Child Support</h3>
            <p className="text-gray-600">
              Manage sleep tracking for multiple children in one account
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🔔</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Smart Reminders</h3>
            <p className="text-gray-600">
              Medication and bedtime reminders to maintain consistency
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🇬🇧</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">UK Resources</h3>
            <p className="text-gray-600">
              Curated links to NHS, NICE guidelines, and autism support organizations
            </p>
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">About This App</h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p>
              This application is designed to help families track and optimize sleep patterns 
              for autistic children, with particular focus on monitoring the efficacy of 
              prescribed melatonin supplements.
            </p>
            <p>
              <strong className="text-red-600">Important:</strong> This app is a tracking 
              and observation tool only. It is not a substitute for professional medical 
              advice. Always consult with your GP, pediatrician, or healthcare provider 
              regarding sleep issues and medication management.
            </p>
            <p>
              The app helps you identify patterns and correlations in sleep data, but all 
              medical decisions should be made in consultation with qualified healthcare 
              professionals.
            </p>
          </div>
        </div>

        {/* Resources Preview */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">UK Support Resources</h2>
          <p className="text-gray-700 mb-6">
            Access authoritative UK resources for autism and sleep support:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <Link 
              href="/sleep-app/resources"
              className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow border-l-4 border-blue-500"
            >
              <h3 className="font-semibold text-gray-800 mb-2">📚 Resource Hub</h3>
              <p className="text-sm text-gray-600">
                NHS, NICE guidelines, National Autistic Society, and more
              </p>
            </Link>
            <Link 
              href="/sleep-app/resources/sleep-info"
              className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow border-l-4 border-purple-500"
            >
              <h3 className="font-semibold text-gray-800 mb-2">💤 Sleep Information</h3>
              <p className="text-sm text-gray-600">
                Educational content about autism and sleep
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-indigo-900 text-white py-12">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-indigo-200 mb-6">
            Create a free account and start tracking sleep patterns today
          </p>
          <button
            onClick={() => router.push('/sleep-app/signup')}
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors shadow-lg"
          >
            Sign Up Free
          </button>
        </div>
      </div>
    </div>
  );
}

