'use client';

import React from 'react';

interface CookieConsentProps {
  onAccept: () => void;
}

export default function CookieConsent({ onAccept }: CookieConsentProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gray-200 shadow-2xl animate-slide-up">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 5a1 1 0 112 0v4a1 1 0 11-2 0V5zm0 8a1 1 0 112 0 1 1 0 01-2 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  🍪 We Use Cookies
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  We use essential cookies to make our site work properly and provide you with a better user experience. 
                  These cookies help us remember your preferences and keep you logged in. 
                  We don't use tracking or advertising cookies. By using our site, you accept our use of cookies. 
                  <a href="/privacy" className="text-blue-600 hover:text-blue-700 underline ml-1">
                    Learn more
                  </a>
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={onAccept}
              className="flex-1 md:flex-none px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-lg"
            >
              Accept Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

