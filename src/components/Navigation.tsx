'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isAdminUser = user?.email?.toLowerCase() === 'aszkenasy@gmail.com';

  // Don't show navigation on login page
  if (pathname === '/login') {
    return null;
  }

  const navLinks = [
    { href: '/', label: 'Camera' },
    { href: '/history', label: 'History' },
    { href: '/summary', label: 'Summary' },
    { href: '/settings', label: 'Settings' },
    ...(isAdminUser ? [{ href: '/admin', label: 'Admin' }] : []),
  ];

  const NavLinks = ({ className = '', onClick }: { className?: string; onClick?: () => void }) => (
    <div className={className}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClick}
          className={`block px-3 py-2 rounded-md text-sm font-medium transition ${
            pathname === link.href
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Food Tracker
            </Link>
            <div className="hidden md:flex space-x-2">
              <NavLinks />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {user && (
              <span className="text-sm text-gray-600 hidden sm:block truncate max-w-[180px]">
                {user.email}
              </span>
            )}

            <button
              onClick={handleLogout}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition hidden sm:inline-flex"
            >
              Logout
            </button>

            <button
              onClick={() => setMenuOpen((open) => !open)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open navigation menu</span>
              <div className="space-y-1">
                <span className={`block h-0.5 w-6 bg-gray-700 transition-transform ${menuOpen ? 'translate-y-1.5 rotate-45' : ''}`}></span>
                <span className={`block h-0.5 w-6 bg-gray-700 transition-opacity ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block h-0.5 w-6 bg-gray-700 transition-transform ${menuOpen ? '-translate-y-1.5 -rotate-45' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 pt-2 pb-3">
            <NavLinks onClick={() => setMenuOpen(false)} />
            <button
              onClick={handleLogout}
              className="mt-2 w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition text-left"
            >
              Logout
            </button>
            {user && (
              <div className="mt-2 px-3 text-xs text-gray-500 break-words">
                {user.email}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
