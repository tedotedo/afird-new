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
                <strong>Email:</strong> aszkenasy@gmail.com
              </p>
              <p className="text-sm text-gray-600 mt-4">
                For privacy-related inquiries, data subject access requests, or to exercise your GDPR rights,
                please email us at the address above with the subject line "Privacy Request" or "Data Protection".
              </p>
              <p className="text-sm text-gray-600 mt-2">
                We aim to respond to all privacy requests within 30 days as required by GDPR.
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
              We retain your data according to the following schedule:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Active accounts:</strong> Data is retained for as long as your account is active</li>
              <li><strong>Inactive accounts:</strong> If you do not log in for 7 consecutive years, we may contact you before deleting your account</li>
              <li><strong>Account deletion:</strong> When you request account deletion, all personal data is permanently deleted within 30 days</li>
              <li><strong>Backups:</strong> Backups containing your data are automatically purged within 90 days of account deletion</li>
              <li><strong>Consent records:</strong> Records of your consent (for GDPR compliance) are retained for 7 years after account deletion as required by law</li>
              <li><strong>Statistical data:</strong> Anonymized statistical data (with no personally identifiable information) may be retained indefinitely for service improvement</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Right to erasure:</strong> You can request immediate deletion of all your data at any time using the "Delete Account" feature in your{' '}
              <Link href="/settings" className="text-blue-600 hover:underline">Settings</Link>.
            </p>
          </div>

          {/* Data Breach Notification */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Data Breach Notification</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We take data security seriously and have implemented robust measures to protect your information.
              However, in the unlikely event of a data breach that poses a risk to your rights and freedoms:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Regulatory notification:</strong> We will notify the relevant data protection authority (ICO in the UK) within 72 hours of becoming aware of the breach</li>
              <li><strong>User notification:</strong> If the breach is likely to result in a high risk to you, we will notify you without undue delay via email</li>
              <li><strong>Information provided:</strong> We will explain the nature of the breach, the likely consequences, and the measures we have taken or propose to take</li>
              <li><strong>Support:</strong> We will provide guidance on steps you can take to protect yourself (e.g., changing passwords)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              <strong>Our security measures:</strong> We use industry-standard encryption, secure authentication (Supabase Auth),
              Row Level Security (RLS) policies to ensure users can only access their own data, and regular security updates.
              Your password is never stored in plain text.
            </p>
          </div>

          {/* Cookies */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Cookies & Tracking</h2>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Children's Privacy & Parental Consent</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>This application is designed for use by parents and caregivers.</strong> Users must be 18 years or older to create an account.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Parental Consent Required (GDPR Compliance)</h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                When you create a child profile, you must explicitly consent to the processing of your child's personal data,
                including health-related information (special category data under GDPR Article 9). This consent is:
              </p>
              <ul className="list-disc list-inside text-sm text-blue-800 mt-2 ml-4 space-y-1">
                <li><strong>Specific:</strong> You understand exactly what data is collected and how it's used</li>
                <li><strong>Informed:</strong> You have read and understand this privacy policy</li>
                <li><strong>Freely given:</strong> You can choose not to create a child profile</li>
                <li><strong>Unambiguous:</strong> You must actively check a consent box to proceed</li>
                <li><strong>Withdrawable:</strong> You can withdraw consent at any time by deleting the child's profile</li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                <strong>What data we collect about children:</strong>
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Name (first name only, no surname required)</li>
                <li>Date of birth (for age-appropriate recommendations)</li>
                <li>Sex (for growth chart calculations)</li>
                <li>Height and weight measurements</li>
                <li>Food intake records and nutritional data</li>
                <li>Food milestone achievements</li>
              </ul>

              <p className="text-gray-700 leading-relaxed mt-4">
                <strong>Your responsibilities as a parent/guardian:</strong>
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>You confirm you are the legal parent or guardian of any child whose data you input</li>
                <li>You are responsible for keeping your account secure (as it contains your children's data)</li>
                <li>You should not share your account credentials with anyone</li>
                <li>You can delete a child's profile at any time, which permanently removes all their data</li>
              </ul>

              <p className="text-gray-700 leading-relaxed mt-4">
                <strong>Record keeping:</strong> We keep a secure record of your parental consent (including timestamp and IP address)
                for legal compliance and audit purposes. This consent record is retained for 7 years as required by GDPR.
              </p>
            </div>
          </div>

          {/* Terms of Service */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Terms of Service</h2>
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

