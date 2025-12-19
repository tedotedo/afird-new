'use client';

import CameraScreen from '@/screens/CameraScreen';
import AuthGuard from '@/components/AuthGuard';

export default function CameraPage() {
  return (
    <AuthGuard>
      <CameraScreen />
    </AuthGuard>
  );
}

