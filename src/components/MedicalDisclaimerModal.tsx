'use client';

import React from 'react';

interface MedicalDisclaimerModalProps {
  onAccept: () => void;
}

export default function MedicalDisclaimerModal({ onAccept }: MedicalDisclaimerModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="sticky top-0 bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-6 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <h2 className="text-2xl font-bold">Important Medical Disclaimer</h2>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <p className="text-sm text-yellow-800 font-semibold">
              Please read this disclaimer carefully before using ARFID Wellness Tracker
            </p>
          </div>

          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">🔍 About Nutritional Estimates</h3>
              <p className="text-sm leading-relaxed">
                All nutritional analyses provided by this application are <strong>estimates based on AI image recognition and food label databases</strong>. 
                The accuracy of these estimates can vary considerably depending on factors such as food preparation methods, 
                portion sizes, ingredient variations, and image quality.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">⚠️ Not Medical Advice</h3>
              <p className="text-sm leading-relaxed">
                This tool is designed for <strong>general nutritional tracking purposes only</strong> and should not be used as a substitute 
                for professional medical, dietary, or nutritional advice, diagnosis, or treatment. The information provided through 
                this app is for informational purposes only.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">👨‍⚕️ Always Consult Healthcare Professionals</h3>
              <p className="text-sm leading-relaxed">
                <strong>Always consult with a qualified healthcare professional, registered dietitian, or physician</strong> regarding any 
                health conditions, dietary requirements, nutritional concerns, or before making any changes to your diet or your child's diet. 
                This is particularly important for individuals managing conditions such as:
              </p>
              <ul className="text-sm list-disc list-inside ml-4 mt-2 space-y-1">
                <li>ARFID (Avoidant/Restrictive Food Intake Disorder)</li>
                <li>Other eating disorders</li>
                <li>Food allergies or intolerances</li>
                <li>Special dietary needs or medical conditions</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">📋 No Physician-Patient Relationship</h3>
              <p className="text-sm leading-relaxed">
                Use of this application does not create a physician-patient relationship. If you have any medical concerns 
                or questions, please contact your healthcare provider immediately.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
              <p className="text-sm text-blue-800">
                <strong>By clicking "I Understand and Accept"</strong>, you acknowledge that you have read and understood this disclaimer 
                and agree to use this tool responsibly as a tracking aid only, not as medical advice.
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onAccept}
              className="flex-1 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-lg"
            >
              I Understand and Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

