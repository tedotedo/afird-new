'use client';

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'aw-medical-disclaimer';

export default function MedicalDisclaimerGate() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) !== 'understood') setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = useCallback(() => {
    try { window.localStorage.setItem(STORAGE_KEY, 'understood'); } catch {}
    setVisible(false);
    window.dispatchEvent(new Event('aw-medical-disclaimer-accepted'));
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/40 p-4 sm:items-center" role="dialog" aria-modal="true" aria-labelledby="aw-disclaimer-title">
      <div className="w-full max-w-lg rounded-lg border border-rule bg-paper-card p-5 shadow-xl sm:p-6">
        <h2 id="aw-disclaimer-title" className="font-display text-xl text-ink">Medical disclaimer</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          ARFID Wellness provides general educational information about Avoidant/Restrictive
          Food Intake Disorder. It is not medical advice, diagnosis, or a treatment plan, and
          it does not create a doctor–patient relationship.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-muted">
          <li>Speak to your GP, paediatrician, or dietitian before changing feeding or nutrition care.</li>
          <li>What helps one child may not help another.</li>
          <li>Private notes on this site stay in your browser only and are never uploaded.</li>
        </ul>
        <button type="button" onClick={accept} className="mt-6 w-full rounded-md bg-ink px-4 py-2.5 text-sm text-white hover:bg-ink-muted sm:w-auto">
          I understand
        </button>
      </div>
    </div>
  );
}
