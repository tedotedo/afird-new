'use client';

import React from 'react';
import AuthGuard from '@/components/AuthGuard';

export default function ARFIDInfoPage() {
  const ukResources = [
    {
      name: 'CNTW NHS - ARFID Support Resources',
      url: 'https://www.cntw.nhs.uk/resource-library/support-for-avoidant-restrictive-food-intake-disorder-arfid/',
      description: 'Comprehensive NHS resource co-produced with experts and lived experience. Includes self-help guides, carer support, and practical strategies.',
      organization: 'CNTW NHS'
    },
    {
      name: 'ARFID Awareness UK',
      url: 'https://www.arfidawarenessuk.org/',
      description: 'Dedicated UK charity raising awareness and providing support specifically for ARFID.',
      organization: 'ARFID Awareness UK'
    },
    {
      name: 'NHS Inform Scotland - ARFID',
      url: 'https://www.nhsinform.scot/illnesses-and-conditions/mental-health/eating-disorders/avoidant-restrictive-food-intake-disorder-arfid/',
      description: 'Scottish NHS comprehensive guide to ARFID, including symptoms, diagnosis, treatment options, and when to seek help.',
      organization: 'NHS Inform Scotland'
    },
    {
      name: 'Beat Eating Disorders',
      url: 'https://www.beateatingdisorders.org.uk/types/arfid',
      description: 'UK\'s leading eating disorder charity providing information, support, and helpline services for ARFID.',
      organization: 'Beat'
    },
    {
      name: 'Triumph Over Phobia - Food Anxiety',
      url: 'https://topuk.org/',
      description: 'UK charity supporting those with phobias and anxieties, including food-related fears.',
      organization: 'TOP UK'
    }
  ];

  const helplineInfo = [
    {
      name: 'Beat Eating Disorders Helpline',
      phone: '0808 801 0677',
      availability: 'Open 365 days a year, 9am-8pm weekdays, 4pm-8pm weekends',
      type: 'Phone & Online Chat'
    },
    {
      name: 'Beat Youthline (under 18s)',
      phone: '0808 801 0711',
      availability: 'Open 365 days a year, 9am-8pm weekdays, 4pm-8pm weekends',
      type: 'Phone & Online Chat'
    },
    {
      name: 'NHS 111',
      phone: '111',
      availability: '24/7',
      type: 'Phone & Online'
    }
  ];

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-24">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Understanding ARFID</h1>
            <p className="text-xl text-blue-100">
              Avoidant/Restrictive Food Intake Disorder - Information and Support for Families
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl mt-8 space-y-8">
          {/* What is ARFID */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">ℹ️</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">What is ARFID?</h2>
              </div>
            </div>
            
            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                Avoidant/Restrictive Food Intake Disorder (ARFID) is an eating disorder where someone avoids certain foods or types of food, restricts their food intake, or both. Unlike other eating disorders, ARFID is not about body image, weight, or shape concerns.
              </p>
              
              <p>
                Children and adults with ARFID may have limited food preferences, sensory sensitivities to certain textures or tastes, fear of negative consequences from eating (such as choking or being sick), or simply lack interest in food.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <p className="font-semibold text-blue-900 mb-2">It's important to know:</p>
                <p className="text-blue-800">
                  ARFID is a recognised medical condition, not just "picky eating" or a phase. With proper support and treatment, significant improvement is possible, and many people manage their symptoms successfully.
                </p>
              </div>
            </div>
          </div>

          {/* Common Signs */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">👀</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Common Signs</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-3">Eating Patterns</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Limited range of foods accepted</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Strong reactions to food textures, smells, or appearance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Anxiety or distress around mealtimes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Lack of interest in eating or food</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-3">Physical & Social Impact</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Weight loss or failure to gain expected weight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Nutritional deficiencies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Avoidance of social situations involving food</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Difficulty functioning in daily life</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* When to Seek Help */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl shadow-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💚</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">When to Seek Help</h2>
            </div>

            <div className="space-y-4 text-gray-700">
              <p className="text-lg">
                If food avoidance or restriction is affecting your or your child's health, growth, or quality of life, it's important to seek professional support. The earlier ARFID is addressed, the better the outcomes tend to be.
              </p>

              <div className="bg-white rounded-lg p-4 space-y-3">
                <p className="font-semibold text-gray-900">Start with your GP who can:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Assess nutritional status and growth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Rule out other medical causes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Refer to specialist services (dietitian, eating disorder team, CAMHS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>Provide ongoing monitoring and support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Support & Management */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🌟</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Support & Management</h2>
            </div>

            <div className="space-y-4 text-gray-700">
              <p>
                Treatment for ARFID is individualised and may involve a multidisciplinary team including dietitians, psychologists, occupational therapists, and medical doctors. Common approaches include:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 mb-2">🍽️ Nutritional Support</h3>
                  <p className="text-sm">Ensuring adequate nutrition while gradually expanding food choices at an appropriate pace.</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 mb-2">🧠 Psychological Therapy</h3>
                  <p className="text-sm">CBT, exposure therapy, or family-based treatment to address anxieties and avoidance.</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 mb-2">🤝 Sensory Work</h3>
                  <p className="text-sm">Occupational therapy to help manage sensory sensitivities around food.</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 mb-2">👨‍👩‍👧 Family Support</h3>
                  <p className="text-sm">Guidance for families on managing mealtimes and supporting recovery.</p>
                </div>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded mt-6">
                <p className="text-amber-900">
                  <strong>Remember:</strong> Recovery is possible and progress happens at different rates for different people. Small steps forward are still progress, and setbacks are a normal part of the journey.
                </p>
              </div>
            </div>
          </div>

          {/* UK Resources */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🔗</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">UK Resources & Support</h2>
            </div>

            <div className="space-y-4">
              {ukResources.map((resource) => (
                <a
                  key={resource.name}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition">
                        {resource.name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                      <span className="inline-block mt-2 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {resource.organization}
                      </span>
                    </div>
                    <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Helplines */}
          <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-xl shadow-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-2xl text-white">📞</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Helplines & Urgent Support</h2>
            </div>

            <p className="text-gray-700 mb-6">
              If you need immediate support or advice, these helplines are available:
            </p>

            <div className="space-y-4">
              {helplineInfo.map((helpline) => (
                <div key={helpline.name} className="bg-white rounded-lg p-4 border-l-4 border-red-400">
                  <h3 className="font-semibold text-lg text-gray-900">{helpline.name}</h3>
                  <p className="text-2xl font-bold text-red-600 my-2">{helpline.phone}</p>
                  <p className="text-sm text-gray-600">{helpline.availability}</p>
                  <span className="inline-block mt-2 text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded">
                    {helpline.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Closing Message */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">You're Not Alone</h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Many families are navigating ARFID, and support is available. This app is here to help you track nutrition and growth, but it's not a substitute for professional medical advice. Always consult with healthcare professionals about your or your child's specific situation.
            </p>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

