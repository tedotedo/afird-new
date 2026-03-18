'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function AuthGuard({ 
  children, 
  redirectTo = '/login' 
}: AuthGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Define route prefixes that contain personal data or settings
  const protectedPrefixes = [
    '/camera',
    '/results',
    '/summary',
    '/trends',
    '/history',
    '/profile',
    '/achievement-settings',
    '/settings',
    '/goals',
    '/admin',
    '/bmi-trends'
  ];
  
  // Check if current path starts with any of the protected prefixes
  const isProtectedPath = protectedPrefixes.some(
    prefix => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  useEffect(() => {
    if (!loading && !user && isProtectedPath) {
      router.push(redirectTo);
    }
  }, [user, loading, router, redirectTo, isProtectedPath]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If path is protected and no user, return null while redirecting
  if (!user && isProtectedPath) {
    return null; 
  }

  // Allow access to children for unprotected paths, or authenticated users
  return <>{children}</>;
}

