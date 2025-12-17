import ResultsScreen from '@/screens/ResultsScreen';
import AuthGuard from '@/components/AuthGuard';

export default function Results() {
  return (
    <AuthGuard>
      <ResultsScreen />
    </AuthGuard>
  );
}

