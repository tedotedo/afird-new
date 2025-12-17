'use client';

import AuthGuard from '@/components/AuthGuard';
import DataExportButton from '@/components/DataExportButton';
import { useAuth } from '@/hooks/useAuth';

export default function SettingsPage() {
  const { user } = useAuth();

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

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Data Privacy</h3>
            <p className="text-sm text-blue-700">
              Your data is stored securely and is only accessible to you. You can download your data at any time, 
              and you have full control over your food entries. All data is encrypted and protected by Row Level Security policies.
            </p>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

