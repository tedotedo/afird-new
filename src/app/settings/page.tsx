'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';
import DataExportButton from '@/components/DataExportButton';
import { useAuth } from '@/hooks/useAuth';

export default function SettingsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      setDeleteError('Please type DELETE to confirm');
      return;
    }

    if (!confirm('This action cannot be undone. Are you absolutely sure you want to permanently delete your account and all data?')) {
      return;
    }

    setDeleting(true);
    setDeleteError(null);

    try {
      const response = await fetch('/api/user/delete-account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          confirmationText: deleteConfirmText,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete account');
      }

      // Redirect to login after successful deletion
      alert(data.message || 'Account deleted successfully');
      router.push('/login');
    } catch (err: any) {
      setDeleteError(err.message || 'Failed to delete account');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings</h1>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Information</h2>
            <div className="space-y-2">
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-gray-800">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">User ID</label>
                <p className="text-gray-800 text-xs font-mono">{user?.id}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Data Export</h2>
            <p className="text-gray-600 mb-4">
              Download all your food entries and nutritional data. You can choose between JSON (structured data) or CSV (spreadsheet-friendly) format.
            </p>
            <div className="flex gap-4">
              <DataExportButton format="json" />
              <DataExportButton format="csv" />
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Data Privacy</h3>
            <p className="text-sm text-blue-700">
              Your data is stored securely and is only accessible to you. You can download your data at any time, 
              and you have full control over your food entries. All data is encrypted and protected by Row Level Security policies.
            </p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-6 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">Medical Disclaimer</h3>
                <p className="text-sm text-yellow-700 leading-relaxed">
                  All nutritional analyses provided by this application are estimates based on AI image recognition and food label databases. 
                  The accuracy of these estimates can vary considerably depending on factors such as food preparation methods, 
                  portion sizes, ingredient variations, and image quality. This tool is designed for general nutritional tracking purposes only 
                  and should not be used as a substitute for professional medical, dietary, or nutritional advice.
                </p>
                <p className="text-sm text-yellow-700 leading-relaxed mt-3">
                  <strong>Always consult with a qualified healthcare professional, registered dietitian, or physician</strong> regarding any 
                  health conditions, dietary requirements, nutritional concerns, or before making any changes to your diet or your child's diet. 
                  This is particularly important for individuals managing conditions such as ARFID (Avoidant/Restrictive Food Intake Disorder) 
                  or other eating disorders, food allergies, or special dietary needs.
                </p>
              </div>
            </div>
          </div>

          {/* Delete Account Section - GDPR Right to Erasure */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-red-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-red-600">⚠️</span>
              Delete Account
            </h2>

            {!showDeleteConfirm ? (
              <div>
                <p className="text-gray-600 mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition"
                >
                  Delete My Account
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 className="font-semibold text-red-900 mb-2">⚠️ Warning: This action cannot be undone!</h3>
                  <p className="text-sm text-red-800 mb-3">
                    Deleting your account will permanently remove:
                  </p>
                  <ul className="text-sm text-red-800 list-disc list-inside space-y-1 mb-3">
                    <li>Your account and login credentials</li>
                    <li>All children profiles and their data</li>
                    <li>All food entries and nutritional data</li>
                    <li>All measurements (height, weight, BMI)</li>
                    <li>Food journey achievements and milestones</li>
                    <li>Nutrition goals and preferences</li>
                    <li>All feedback and consent records</li>
                  </ul>
                  <p className="text-sm text-red-800 font-semibold">
                    We recommend downloading your data first (see Data Export section above).
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type <strong>DELETE</strong> to confirm:
                  </label>
                  <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    placeholder="Type DELETE"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {deleteError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {deleteError}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={handleDeleteAccount}
                    disabled={deleteConfirmText !== 'DELETE' || deleting}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deleting ? 'Deleting...' : 'Permanently Delete Account'}
                  </button>
                  <button
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setDeleteConfirmText('');
                      setDeleteError(null);
                    }}
                    disabled={deleting}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg transition disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

