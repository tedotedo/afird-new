import CameraScreen from '@/screens/CameraScreen';
import AuthGuard from '@/components/AuthGuard';

export default function Home() {
  return (
    <AuthGuard>
      <CameraScreen />
    </AuthGuard>
  );
}

