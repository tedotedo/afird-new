'use client';

import React from 'react';
import AuthGuard from '@/components/AuthGuard';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pb-24">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy & Terms of Service</h1>
            <p className="text-xl text-blue-100">
              Last updated: December 2025
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl mt-8 space-y-8">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to ARFID Wellness Tracker. We are committed to protecting your privacy and ensuring the security
              of your personal data. This Privacy Policy explains how we collect, use, store, and protect your information
              in compliance with the General Data Protection Regulation (GDPR) and other applicable data protection laws.
            </p>
          </div>

          {/* Data Controller */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Data Controller</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The data controller for ARFID Wellness Tracker is:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold">Dr. Odet Aszkenasy</p>
              <p className="text-sm text-gray-600 mt-2">
                For privacy-related inquiries, please contact us through the support section.
              </p>
            </div>
          </div>

          {/* What Data We Collect */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">1. What Data We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Account Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Email address</li>
                  <li>Encrypted password</li>
                  <li>Account creation date</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Food Tracking Data</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Photos of food items</li>
                  <li>AI-generated nutritional analysis data</li>
                  <li>Meal times and dates</li>
                  <li>Manual notes about foods</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Child Profile Information (Optional)</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Child names</li>
                  <li>Birth dates</li>
                  <li>Physical measurements (height, weight, BMI)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Consent Records</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Cookie consent acceptance</li>
                  <li>Medical disclaimer acknowledgment</li>
                  <li>GDPR consent acceptance</li>
                  <li>Timestamps and IP addresses for consent records</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Usage Data</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Device type and browser information</li>
                  <li>Pages visited within the application</li>
                  <li>Features used</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Your Data */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">2. How We Use Your Data</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We process your personal data for the following purposes:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Service Provision:</strong> To provide nutritional tracking, analysis, and reporting features</li>
              <li><strong>AI Analysis:</strong> To analyze food photos using AI and generate nutritional estimates</li>
              <li><strong>Growth Tracking:</strong> To calculate and display growth charts and BMI percentiles based on WHO standards</li>
              <li><strong>Account Management:</strong> To manage your account, authenticate access, and provide support</li>
              <li><strong>Legal Compliance:</strong> To maintain consent records and comply with legal obligations</li>
              <li><strong>Service Improvement:</strong> To improve our features, fix bugs, and enhance user experience</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Legal Basis:</strong> We process your data based on your consent (GDPR Article 6(1)(a)) and for the performance
              of our service contract with you (GDPR Article 6(1)(b)).
            </p>
          </div>

          {/* Data Storage & Security */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Data Storage & Security</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Where We Store Your Data</h3>
                <p className="text-gray-700 leading-relaxed">
                  All data is stored on secure servers within the European Union (EU) using Supabase infrastructure.
                  Data does not leave the EU unless you explicitly request data export.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Security Measures</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li><strong>Encryption:</strong> All data is encrypted both in transit (TLS/SSL) and at rest</li>
                  <li><strong>Access Control:</strong> Row Level Security (RLS) ensures only you can access your data</li>
                  <li><strong>Authentication:</strong> Industry-standard secure authentication protocols</li>
                  <li><strong>Password Protection:</strong> Passwords are hashed and never stored in plain text</li>
                  <li><strong>Regular Backups:</strong> Automated backups with disaster recovery procedures</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Sharing */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Data Sharing</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do <strong>NOT</strong> sell, rent, or share your personal data with third parties for marketing purposes.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may share data with the following service providers under strict data processing agreements:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Supabase:</strong> For database hosting and authentication (EU-based)</li>
              <li><strong>Google Gemini AI:</strong> For food image analysis (data is processed and not retained by Google)</li>
              <li><strong>Vercel/Hosting Provider:</strong> For application hosting and delivery</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              All service providers are GDPR-compliant and process data only as instructed by us.
            </p>
          </div>

          {/* Your Rights Under GDPR */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Your Rights Under GDPR</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the following rights regarding your personal data:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl mt-1">✓</span>
                <div>
                  <strong className="text-gray-900">Right to Access:</strong>
                  <span className="text-gray-700"> Request a copy of all personal data we hold about you</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl mt-1">✓</span>
                <div>
                  <strong className="text-gray-900">Right to Rectification:</strong>
                  <span className="text-gray-700"> Correct any inaccurate or incomplete data</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl mt-1">✓</span>
                <div>
                  <strong className="text-gray-900">Right to Erasure ("Right to be Forgotten"):</strong>
                  <span className="text-gray-700"> Request deletion of your account and all associated data</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl mt-1">✓</span>
                <div>
                  <strong className="text-gray-900">Right to Data Portability:</strong>
                  <span className="text-gray-700"> Export your data in JSON or CSV format</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl mt-1">✓</span>
                <div>
                  <strong className="text-gray-900">Right to Restriction:</strong>
                  <span className="text-gray-700"> Limit how we process your data</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl mt-1">✓</span>
                <div>
                  <strong className="text-gray-900">Right to Object:</strong>
                  <span className="text-gray-700"> Object to certain types of processing</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl mt-1">✓</span>
                <div>
                  <strong className="text-gray-900">Right to Withdraw Consent:</strong>
                  <span className="text-gray-700"> Withdraw consent at any time by deleting your account</span>
                </div>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              To exercise any of these rights, please use the data export feature in <Link href="/settings" className="text-blue-600 hover:underline">Settings</Link> or
              contact our support team.
            </p>
          </div>

          {/* Data Retention */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We retain your data for as long as your account is active. If you delete your account:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>All personal data is permanently deleted within 30 days</li>
              <li>Backups containing your data are automatically purged within 90 days</li>
              <li>Anonymized statistical data (no personally identifiable information) may be retained for service improvement</li>
            </ul>
          </div>

          {/* Cookies */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Cookies & Tracking</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use only <strong>essential cookies</strong> required for the application to function:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Authentication cookies:</strong> To keep you logged in securely</li>
              <li><strong>Session cookies:</strong> To remember your preferences during your visit</li>
              <li><strong>Consent cookies:</strong> To record your cookie and privacy preferences</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              We do <strong>NOT</strong> use:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Advertising or tracking cookies</li>
              <li>Third-party analytics (e.g., Google Analytics)</li>
              <li>Social media tracking pixels</li>
            </ul>
          </div>

          {/* Children's Privacy */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              This application is designed for use by parents and caregivers. Users must be 18 years or older to create
              an account. While the application allows tracking of children's nutritional data, all accounts are managed
              by adult users who are responsible for the data they input.
            </p>
          </div>

          {/* Terms of Service */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Terms of Service</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Acceptable Use</h3>
                <p className="text-gray-700 leading-relaxed">
                  You agree to use this service only for lawful purposes and in accordance with its intended use as a
                  nutritional tracking tool. You must not use the service to harm others, violate laws, or abuse the platform.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Disclaimer of Medical Advice</h3>
                <p className="text-gray-700 leading-relaxed">
                  This application provides nutritional tracking and information for educational purposes only. It does
                  <strong> NOT</strong> provide medical advice, diagnosis, or treatment. Always consult with qualified
                  healthcare professionals for medical concerns.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Accuracy of Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  Nutritional estimates are based on AI analysis and food databases. We strive for accuracy but cannot
                  guarantee the precision of all nutritional data. Use this information as a general guide only.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Limitation of Liability</h3>
                <p className="text-gray-700 leading-relaxed">
                  We provide this service "as is" without warranties of any kind. We are not liable for any decisions
                  made based on information from this application. Health and dietary decisions should always involve
                  professional medical guidance.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Service Modifications</h3>
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to modify, suspend, or discontinue the service at any time with reasonable notice.
                  We will provide options to export your data before any service discontinuation.
                </p>
              </div>
            </div>
          </div>

          {/* Changes to This Policy */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by email
              or through a prominent notice in the application. Your continued use of the service after changes indicates
              your acceptance of the updated policy.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-4">Questions or Concerns?</h2>
            <p className="text-lg text-blue-100 mb-4">
              If you have any questions about this Privacy Policy, your data, or how to exercise your rights, please
              contact us through the application's support section.
            </p>
            <p className="text-blue-100">
              You also have the right to lodge a complaint with your local data protection authority if you believe
              your data protection rights have been violated.
            </p>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

