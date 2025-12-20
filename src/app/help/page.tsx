'use client';

import React, { useState } from 'react';
import AuthGuard from '@/components/AuthGuard';
import Link from 'next/link';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: '1',
    question: 'How accurate is the nutritional analysis?',
    answer: 'Our AI provides estimates based on visual analysis and food databases. Accuracy varies depending on photo quality, portion size estimation, and food complexity. It\'s best used as a general tracking tool rather than precise measurement. For critical dietary needs, consult with a dietitian.',
    category: 'Accuracy',
  },
  {
    id: '2',
    question: 'Why isn\'t the camera working?',
    answer: 'Make sure you\'ve granted camera permissions in your browser settings. For iOS/Safari: Settings > Safari > Camera. For Android/Chrome: Settings > Site Settings > Camera. If problems persist, try refreshing the page or using a different browser.',
    category: 'Technical',
  },
  {
    id: '3',
    question: 'Can I track multiple children?',
    answer: 'Yes! Go to the Profile page and click "Add Child" to create profiles for each child. You can switch between profiles using the dropdown in the navigation bar to track meals separately for each child.',
    category: 'Features',
  },
  {
    id: '4',
    question: 'How do I add my own nutritional data (parent tracking)?',
    answer: 'Simply take a photo of your food without selecting any child profile. The app will automatically track it under your parent account. You can switch between your data and your children\'s data using the profile selector.',
    category: 'Features',
  },
  {
    id: '5',
    question: 'What are WHO growth charts?',
    answer: 'The World Health Organization (WHO) provides standardized growth charts showing healthy height and weight ranges for children of different ages and genders. Our trends page compares your child\'s measurements against these standards to help track healthy development.',
    category: 'Growth',
  },
  {
    id: '6',
    question: 'How do I export my data?',
    answer: 'Go to Settings and click "Export Your Data" to download all your food entries, measurements, and tracking data in JSON format. You can use this for your records or to share with healthcare providers.',
    category: 'Data',
  },
  {
    id: '7',
    question: 'Can I edit or delete food entries?',
    answer: 'Yes. Go to the History page, find the entry you want to modify, and click the edit or delete button. You can update nutritional values, change the date, or remove entries entirely.',
    category: 'Features',
  },
  {
    id: '8',
    question: 'Do you share my data with third parties?',
    answer: 'No. We do NOT sell, rent, or share your personal data with third parties for marketing purposes. Your data is stored securely in EU-based servers and is only accessible to you. See our Privacy Policy for full details.',
    category: 'Privacy',
  },
  {
    id: '9',
    question: 'How do I track a new food my child tried?',
    answer: 'After analyzing a food photo, you\'ll see an option to mark it as a "new food" on the results screen. Select the success level (touched, licked, bite, etc.) and add notes. This helps celebrate progress and track food exposure attempts.',
    category: 'Features',
  },
  {
    id: '10',
    question: 'What should I do if the AI misidentifies a food?',
    answer: 'The AI sometimes makes mistakes, especially with mixed dishes or unusual foods. You can manually edit the food description and nutritional values on the results screen before saving. Taking clear, well-lit photos from directly above helps improve accuracy.',
    category: 'Accuracy',
  },
  {
    id: '11',
    question: 'Can I use this app offline?',
    answer: 'The app requires an internet connection for AI analysis of food photos and syncing data. However, if you\'ve installed it as a Progressive Web App (PWA), some cached pages may work offline temporarily.',
    category: 'Technical',
  },
  {
    id: '12',
    question: 'How do I set nutritional goals?',
    answer: 'Visit the Goals page to set custom nutritional targets for yourself or your children. You can track calories, protein, vitamins, minerals, and more. Goals should be set in consultation with your healthcare provider or dietitian.',
    category: 'Features',
  },
  {
    id: '13',
    question: 'What are achievements and how do I earn them?',
    answer: 'Achievements celebrate milestones in your food journey, like trying your first new food, reaching 10 foods tried, or exploring different textures. Check the Food Journey page to see your progress and unlock new badges.',
    category: 'Features',
  },
  {
    id: '14',
    question: 'How do I delete my account?',
    answer: 'Currently, please contact support to request account deletion. All your data will be permanently deleted within 30 days in compliance with GDPR regulations.',
    category: 'Privacy',
  },
  {
    id: '15',
    question: 'Is this app a substitute for medical advice?',
    answer: 'No. This app is a tracking tool only and does NOT provide medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals (paediatrician, GP, dietitian) for dietary and health decisions, especially for children with ARFID or other medical conditions.',
    category: 'Medical',
  },
  {
    id: '16',
    question: 'What if my child has multiple food allergies?',
    answer: 'You can add notes about allergies and dietary restrictions in the child profile and on individual food entries. However, this app does NOT verify or guarantee allergen information. Always verify ingredients yourself and consult your allergist.',
    category: 'Medical',
  },
  {
    id: '17',
    question: 'Can I share data with my child\'s doctor?',
    answer: 'Yes! Use the export feature in Settings to download your data, or use the "Print" and "Download" buttons on the Summary and Trends pages to create reports you can share with healthcare providers.',
    category: 'Data',
  },
  {
    id: '18',
    question: 'How often should I take measurements?',
    answer: 'For most children, monthly measurements are sufficient. More frequent measurements (weekly) may be appropriate if working with a healthcare provider on specific growth or nutritional concerns. Avoid daily weighing as normal fluctuations can be misleading.',
    category: 'Growth',
  },
];

export default function HelpPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...Array.from(new Set(FAQ_DATA.map(faq => faq.category)))];

  const filteredFAQs = FAQ_DATA.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 pb-24">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">❓</span>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">Help & FAQ</h1>
                <p className="text-xl text-purple-100 mt-2">
                  Find answers to common questions
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl mt-8 space-y-8">
          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <span className="absolute left-4 top-3.5 text-gray-400 text-xl">🔍</span>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-purple-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Quick Links */}
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/privacy" legacyBehavior>
                <a className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition">
                  <span className="text-2xl">🔒</span>
                  <div>
                    <div className="font-semibold text-gray-900">Privacy Policy</div>
                    <div className="text-sm text-gray-600">How we protect your data</div>
                  </div>
                </a>
              </Link>
              <Link href="/arfid-info" legacyBehavior>
                <a className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition">
                  <span className="text-2xl">💙</span>
                  <div>
                    <div className="font-semibold text-gray-900">About ARFID</div>
                    <div className="text-sm text-gray-600">Learn about ARFID</div>
                  </div>
                </a>
              </Link>
              <Link href="/supplements-info" legacyBehavior>
                <a className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition">
                  <span className="text-2xl">💊</span>
                  <div>
                    <div className="font-semibold text-gray-900">Supplement Guidance</div>
                    <div className="text-sm text-gray-600">Evidence-based information</div>
                  </div>
                </a>
              </Link>
              <Link href="/about" legacyBehavior>
                <a className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition">
                  <span className="text-2xl">ℹ️</span>
                  <div>
                    <div className="font-semibold text-gray-900">About the Author</div>
                    <div className="text-sm text-gray-600">Professional background</div>
                  </div>
                </a>
              </Link>
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFAQs.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="text-5xl mb-4">🤷</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No results found</h3>
                <p className="text-gray-600">
                  Try a different search term or browse all categories
                </p>
              </div>
            ) : (
              filteredFAQs.map((faq) => (
                <details
                  key={faq.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden group"
                >
                  <summary className="p-6 cursor-pointer hover:bg-purple-50 transition list-none">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
                            {faq.category}
                          </span>
                        </div>
                      </div>
                      <span className="text-purple-600 text-xl group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 pt-2">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))
            )}
          </div>

          {/* Contact Support */}
          <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-lg text-green-100 mb-6">
              Can't find what you're looking for? We're here to help!
            </p>
            <div className="text-lg">
              For technical support or questions, please visit the <Link href="/settings" className="underline font-semibold hover:text-green-200">Settings page</Link> to
              export your data or manage your account.
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

