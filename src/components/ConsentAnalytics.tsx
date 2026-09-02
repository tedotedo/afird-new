'use client';

import { useCallback, useEffect, useState } from 'react';

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
const STORAGE_KEY = 'aw-cookie-consent';

type Consent = 'accepted' | 'rejected';

function readConsent(): Consent | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (value === 'accepted' || value === 'rejected') return value;
  } catch {}
  return null;
}

function writeConsent(value: Consent) {
  try { window.localStorage.setItem(STORAGE_KEY, value); } catch {}
}

function loadAnalytics() {
  if (!MEASUREMENT_ID || typeof window === 'undefined') return;
  const w = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  if (document.getElementById('aw-ga-gtag')) return;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag(...args: unknown[]) { w.dataLayer!.push(args); };
  w.gtag('js', new Date());
  w.gtag('config', MEASUREMENT_ID);
  const script = document.createElement('script');
  script.id = 'aw-ga-gtag';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export default function ConsentAnalytics() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const maybeShow = () => {
      try {
        if (window.localStorage.getItem('aw-medical-disclaimer') !== 'understood') {
          setVisible(false);
          return;
        }
      } catch {}
      if (!MEASUREMENT_ID) { setVisible(false); return; }
      const existing = readConsent();
      if (existing === 'accepted') { loadAnalytics(); setVisible(false); return; }
      if (existing === 'rejected') { setVisible(false); return; }
      setVisible(true);
    };
    maybeShow();
    window.addEventListener('aw-medical-disclaimer-accepted', maybeShow);
    return () => window.removeEventListener('aw-medical-disclaimer-accepted', maybeShow);
  }, []);

  const accept = useCallback(() => { writeConsent('accepted'); setVisible(false); loadAnalytics(); }, []);
  const reject = useCallback(() => { writeConsent('rejected'); setVisible(false); }, []);

  if (!visible) return null;

  return (
    <div role="dialog" aria-live="polite" aria-label="Cookie choices" className="fixed inset-x-0 bottom-0 z-50 border-t border-rule bg-paper-card/95 p-4 shadow-[0_-8px_30px_rgba(46,43,39,0.08)] backdrop-blur sm:p-5">
      <div className="mx-auto flex max-w-site flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-ink">Cookies</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-muted">
            Optional analytics cookies (Google Analytics) help us see which pages are useful.
            They load only if you accept. Food notes and health details are never collected.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button type="button" onClick={reject} className="rounded-md border border-rule bg-paper px-3.5 py-2 text-sm text-ink hover:border-accent/40">Essential only</button>
          <button type="button" onClick={accept} className="rounded-md bg-accent px-3.5 py-2 text-sm text-white hover:bg-accent-hover">Accept analytics</button>
        </div>
      </div>
    </div>
  );
}
