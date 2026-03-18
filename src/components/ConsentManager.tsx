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

  useEffect(() => {
    if (!loading) {
      // Show modals in sequence: medical -> cookies -> GDPR
      // Only show if not already accepted
      if (!consents.medical_disclaimer) {
        setShowMedical(true);
      } else if (!consents.cookies) {
        setShowCookies(true);
      } else if (!consents.gdpr) {
        setShowGDPR(true);
      }
    }
  }, [loading, consents]);

  const handleMedicalAccept = async () => {
    await acceptConsent('medical_disclaimer');
    setShowMedical(false);
    // After accepting medical, show cookies if not accepted
    if (!consents.cookies) {
      setShowCookies(true);
    } else if (!consents.gdpr) {
      setShowGDPR(true);
    }
  };

  const handleCookieAccept = async () => {
    await acceptConsent('cookies');
    setShowCookies(false);
    // After accepting cookies, show GDPR if not accepted
    if (!consents.gdpr) {
      setShowGDPR(true);
    }
  };

  const handleGDPRAccept = async () => {
    await acceptConsent('gdpr');
    setShowGDPR(false);
  };

  // Don't render anything while loading
  if (loading) {
    return null;
  }

  return (
    <>
      {showMedical && <MedicalDisclaimerModal onAccept={handleMedicalAccept} />}
      {showCookies && <CookieConsent onAccept={handleCookieAccept} />}
      {showGDPR && <GDPRModal onAccept={handleGDPRAccept} />}
    </>
  );
}
