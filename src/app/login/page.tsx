'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, resetPassword } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'forgot') {
        await resetPassword(email);
        setSuccess('Check your email for a password reset link.');
      } else if (mode === 'signup') {
        await signUp(email, password);
        router.push('/');
      } else {
        await signIn(email, password);
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'signup': return 'Sign Up';
      case 'forgot': return 'Reset Password';
      default: return 'Login';
    }
  };

  const getButtonText = () => {
    if (loading) return 'Loading...';
    switch (mode) {
      case 'signup': return 'Sign Up';
      case 'forgot': return 'Send Reset Link';
      default: return 'Login';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          {getTitle()}
        </h1>

        {mode === 'forgot' && (
          <p className="text-gray-600 text-center mb-6">
            Enter your email and we'll send you a link to reset your password.
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          {mode !== 'forgot' && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
              {mode === 'signup' && (
                <p className="mt-1 text-sm text-gray-500">
                  Password must be at least 6 characters
                </p>
              )}
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {getButtonText()}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          {mode === 'login' && (
            <>
              <button
                onClick={() => {
                  setMode('forgot');
                  setError('');
                  setSuccess('');
                }}
                className="text-blue-500 hover:text-blue-600 text-sm block w-full"
              >
                Forgot your password?
              </button>
              <button
                onClick={() => {
                  setMode('signup');
                  setError('');
                  setSuccess('');
                }}
                className="text-blue-500 hover:text-blue-600 text-sm block w-full"
              >
                Don't have an account? Sign up
              </button>
            </>
          )}

          {mode === 'signup' && (
            <button
              onClick={() => {
                setMode('login');
                setError('');
                setSuccess('');
              }}
              className="text-blue-500 hover:text-blue-600 text-sm"
            >
              Already have an account? Login
            </button>
          )}

          {mode === 'forgot' && (
            <button
              onClick={() => {
                setMode('login');
                setError('');
                setSuccess('');
              }}
              className="text-blue-500 hover:text-blue-600 text-sm"
            >
              Back to login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
