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

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Data Privacy</h3>
            <p className="text-sm text-blue-700">
              Your data is stored securely and is only accessible to you. You can download your data at any time, 
              and you have full control over your food entries. All data is encrypted and protected by Row Level Security policies.
            </p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-xl p-6">
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
        </div>
      </div>
    </AuthGuard>
  );
}

