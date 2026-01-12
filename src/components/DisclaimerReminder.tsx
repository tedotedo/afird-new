'use client';

import React, { useState, useEffect } from 'react';
import { useConsent } from '@/contexts/ConsentContext';
import Link from 'next/link';

const REMINDER_STORAGE_KEY = 'disclaimer_reminder';
const REMINDER_INTERVAL_DAYS = 14; // 2 weeks
const REMINDER_LOG_COUNT = 12; // After ~10-15 food logs

interface ReminderState {
  lastShown: number;
  logsSinceReminder: number;
}

export default function DisclaimerReminder() {
  const { consents, loading } = useConsent();
  const [showReminder, setShowReminder] = useState(false);

  useEffect(() => {
    // Only show reminder if user has already accepted the initial medical disclaimer
    if (loading || !consents.medical_disclaimer) {
      return;
    }

    try {
      const stored = localStorage.getItem(REMINDER_STORAGE_KEY);
      const now = Date.now();
      const intervalMs = REMINDER_INTERVAL_DAYS * 24 * 60 * 60 * 1000;

      if (stored) {
        const state: ReminderState = JSON.parse(stored);
        const timeSinceReminder = now - state.lastShown;

        // Show reminder if 2 weeks have passed OR log count threshold reached
        if (timeSinceReminder >= intervalMs || state.logsSinceReminder >= REMINDER_LOG_COUNT) {
          setShowReminder(true);
        }
      }
      // If no stored state, don't show reminder - user just accepted the initial disclaimer
    } catch {
      // Ignore storage errors
    }
  }, [loading, consents.medical_disclaimer]);

  const handleDismiss = () => {
    setShowReminder(false);
    try {
      const state: ReminderState = {
        lastShown: Date.now(),
        logsSinceReminder: 0,
      };
      localStorage.setItem(REMINDER_STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage errors
    }
  };

  if (!showReminder) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 max-w-lg mx-auto animate-fadeIn">
      <div className="bg-amber-50 border border-amber-200 rounded-xl shadow-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 text-amber-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-amber-800">
              <span className="font-medium">Reminder:</span> Nutritional data is AI-estimated and not medical advice.{' '}
              <Link href="/privacy" className="underline hover:text-amber-900">
                Full disclaimer
              </Link>
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 text-amber-600 hover:text-amber-800 transition-colors"
            aria-label="Dismiss reminder"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// Helper function to increment food log count - call this when a food is logged
export function incrementDisclaimerLogCount() {
  try {
    const stored = localStorage.getItem(REMINDER_STORAGE_KEY);
    if (stored) {
      const state: ReminderState = JSON.parse(stored);
      state.logsSinceReminder += 1;
      localStorage.setItem(REMINDER_STORAGE_KEY, JSON.stringify(state));
    } else {
      // Initialize state if it doesn't exist
      const state: ReminderState = {
        lastShown: Date.now(),
        logsSinceReminder: 1,
      };
      localStorage.setItem(REMINDER_STORAGE_KEY, JSON.stringify(state));
    }
  } catch {
    // Ignore storage errors
  }
}
