'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import ChildSelector from '@/components/ChildSelector';
import DropdownMenu from '@/components/DropdownMenu';

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

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      setMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isAdminUser = user?.email?.toLowerCase() === 'aszkenasy@gmail.com';

  // Don't show navigation on login page
  if (pathname === '/login') {
    return null;
  }

  // Grouped navigation for desktop dropdowns
  const navGroups = {
    track: [
      { href: '/', label: 'Camera', icon: '📸' },
      { href: '/history', label: 'History', icon: '📜' },
    ],
    monitor: [
      { href: '/summary', label: 'Summary', icon: '📊' },
      { href: '/trends', label: 'Trends', icon: '📈' },
      { href: '/nutrition-info', label: 'Nutrition Info', icon: '🥗' },
    ],
    manage: [
      { href: '/profile', label: 'Children', icon: '👶' },
      { href: '/settings', label: 'Settings', icon: '⚙️' },
      ...(isAdminUser ? [{ href: '/admin', label: 'Admin', icon: '👤' }] : []),
    ],
  };

  // Flat list for mobile menu
  const allNavLinks = [
    ...navGroups.track,
    ...navGroups.monitor,
    ...navGroups.manage,
  ];

  const NavLinks = ({ className = '', onClick }: { className?: string; onClick?: () => void }) => (
    <div className={className}>
      {allNavLinks.map((link) => (
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
          <span className="inline-flex items-center gap-2">
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </span>
        </Link>
      ))}
    </div>
  );

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-700 transition">
              Food Tracker
            </Link>
            
            {/* Desktop: Grouped Dropdowns */}
            <div className="hidden md:flex items-center space-x-1">
              <DropdownMenu 
                label="Track" 
                items={navGroups.track} 
                currentPath={pathname}
              />
              <DropdownMenu 
                label="Monitor" 
                items={navGroups.monitor} 
                currentPath={pathname}
              />
              <DropdownMenu 
                label="Manage" 
                items={navGroups.manage} 
                currentPath={pathname}
              />
            </div>
          </div>

          {/* Right side: User controls */}
          <div className="flex items-center space-x-4">
            <ChildSelector />
            
            {user && (
              <span className="text-sm text-gray-600 hidden lg:block truncate max-w-[200px]">
                {user.email}
              </span>
            )}

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition hidden sm:inline-flex"
            >
              Logout
            </button>

            {/* Mobile menu toggle */}
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
