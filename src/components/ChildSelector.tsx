'use client';

import React, { useState } from 'react';
import { useChildContext } from '@/contexts/ChildContext';
import { usePathname } from 'next/navigation';

export default function ChildSelector() {
  const { selectedChild, setSelectedChild, children, loading } = useChildContext();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Don't show on login, profile, or admin pages
  if (pathname === '/login' || pathname?.startsWith('/profile') || pathname?.startsWith('/admin')) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        <span className="text-sm text-gray-600">Loading...</span>
      </div>
    );
  }

  if (children.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition text-sm font-medium text-gray-700 min-w-[140px] justify-between"
      >
        <span className="truncate">
          {selectedChild ? selectedChild.name : 'My Food'}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20 py-1 max-h-96 overflow-y-auto">
            <button
              onClick={() => {
                setSelectedChild(null);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition ${
                !selectedChild ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700'
              }`}
            >
              <div className="flex items-center gap-2">
                {!selectedChild && (
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                <span>My Food (Parent)</span>
              </div>
            </button>

            <div className="border-t border-gray-200 my-1"></div>

            {children.map((child) => (
              <button
                key={child.id}
                onClick={() => {
                  setSelectedChild(child);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition ${
                  selectedChild?.id === child.id ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  {selectedChild?.id === child.id && (
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  <span>{child.name}</span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

