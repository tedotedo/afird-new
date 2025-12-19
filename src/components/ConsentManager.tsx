'use client';

import React, { useEffect, useState } from 'react';
import { useConsent } from '@/contexts/ConsentContext';
import { usePathname } from 'next/navigation';
import CookieConsent from './CookieConsent';
import MedicalDisclaimerModal from './MedicalDisclaimerModal';
import GDPRModal from './GDPRModal';

export default function ConsentManager() {
  const { consents, acceptConsent, loading } = useConsent();
  const pathname = usePathname();
  const [showCookies, setShowCookies] = useState(false);
  const [showMedical, setShowMedical] = useState(false);
  const [showGDPR, setShowGDPR] = useState(false);

  // Don't show consent on login page
  const isLoginPage = pathname === '/login';

  useEffect(() => {
    if (!loading && !isLoginPage) {
      // Show modals in sequence: cookies -> medical -> GDPR
      // Only show if not already accepted
      if (!consents.cookies) {
        setShowCookies(true);
      } else if (!consents.medical_disclaimer) {
        setShowMedical(true);
      } else if (!consents.gdpr) {
        setShowGDPR(true);
      }
    }
  }, [loading, consents, isLoginPage]);

  const handleCookieAccept = async () => {
    await acceptConsent('cookies');
    setShowCookies(false);
    // After accepting cookies, show medical disclaimer if not accepted
    if (!consents.medical_disclaimer) {
      setShowMedical(true);
    }
  };

  const handleMedicalAccept = async () => {
    await acceptConsent('medical_disclaimer');
    setShowMedical(false);
    // After accepting medical disclaimer, show GDPR if not accepted
    if (!consents.gdpr) {
      setShowGDPR(true);
    }
  };

  const handleGDPRAccept = async () => {
    await acceptConsent('gdpr');
    setShowGDPR(false);
  };

  // Don't render anything while loading or on login page
  if (loading || isLoginPage) {
    return null;
  }

  return (
    <>
      {showCookies && <CookieConsent onAccept={handleCookieAccept} />}
      {showMedical && <MedicalDisclaimerModal onAccept={handleMedicalAccept} />}
      {showGDPR && <GDPRModal onAccept={handleGDPRAccept} />}
    </>
  );
}

