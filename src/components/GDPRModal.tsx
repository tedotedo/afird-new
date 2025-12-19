'use client';

import React from 'react';

interface GDPRModalProps {
  onAccept: () => void;
}

export default function GDPRModal({ onAccept }: GDPRModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <h2 className="text-2xl font-bold">Privacy & Data Protection (GDPR)</h2>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <p className="text-sm text-blue-800 font-semibold">
              Your privacy is important to us. This notice explains how we handle your personal data in compliance with GDPR.
            </p>
          </div>

          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">📊 What Data We Collect</h3>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Account Information:</strong> Email address, encrypted password</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Food Tracking Data:</strong> Photos of food, nutritional estimates, meal times</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Child Profiles:</strong> Names, birth dates, measurements (if you add them)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Consent Records:</strong> Your acceptance of this notice, cookies, and medical disclaimers</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">🔒 How We Protect Your Data</h3>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>All data is encrypted in transit and at rest</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Row Level Security ensures only you can access your data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>We never share your data with third parties for marketing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Secure authentication through industry-standard protocols</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">🎯 Why We Need This Data</h3>
              <p className="text-sm leading-relaxed">
                We collect and process your data to provide the nutritional tracking service, including:
              </p>
              <ul className="text-sm list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Analyzing food photos using AI</li>
                <li>Tracking nutritional intake over time</li>
                <li>Generating growth charts and trends</li>
                <li>Comparing nutrition against WHO standards</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">✅ Your Rights Under GDPR</h3>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Right to Access:</strong> Request a copy of your data at any time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Right to Portability:</strong> Export your data in JSON or CSV format</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Right to Deletion:</strong> Request deletion of your account and all data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Right to Correction:</strong> Update or correct any inaccurate data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Right to Withdraw Consent:</strong> Stop using the service at any time</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">📍 Data Hosting & Retention</h3>
              <p className="text-sm leading-relaxed">
                Your data is hosted on secure servers within the EU. We retain your data for as long as you maintain an active account. 
                You can delete your account and all associated data at any time through Settings.
              </p>
            </div>

            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded">
              <p className="text-sm text-indigo-800">
                <strong>By clicking "I Accept"</strong>, you consent to the collection and processing of your personal data as described above, 
                in accordance with GDPR regulations. You can withdraw this consent at any time.
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onAccept}
              className="flex-1 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition shadow-lg"
            >
              I Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

