'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function Footer() {
  const pathname = usePathname();
  const { user } = useAuth();
  
  const isAdminUser = user?.email?.toLowerCase() === 'aszkenasy@gmail.com';

  // Don't show footer on login page
  if (pathname === '/login') {
    return null;
  }

  const footerLinks = {
    quick: [
      { href: '/home', label: 'Home', icon: '🏠' },
      { href: '/camera', label: 'Camera', icon: '📸' },
      { href: '/history', label: 'History', icon: '📜' },
      { href: '/food-journey', label: 'Food Journey', icon: '🌟' },
    ],
    monitor: [
      { href: '/summary', label: 'Summary', icon: '📊' },
      { href: '/trends', label: 'Trends', icon: '📈' },
      { href: '/goals', label: 'Goals', icon: '🎯' },
      { href: '/nutrition-info', label: 'Nutrition Info', icon: '🥗' },
      { href: '/supplements-info', label: 'Supplement Guidance', icon: '💊' },
    ],
    learn: [
      { href: '/arfid-info', label: 'About ARFID', icon: '💙' },
      { href: '/about', label: 'About the Author', icon: 'ℹ️' },
      { href: '/help', label: 'Help & FAQ', icon: '❓' },
    ],
    manage: [
      { href: '/profile', label: 'Children', icon: '👶' },
      { href: '/settings', label: 'Settings', icon: '⚙️' },
      { href: '/privacy', label: 'Privacy & Terms', icon: '🔒' },
      ...(isAdminUser ? [{ href: '/admin', label: 'Admin', icon: '👤' }] : []),
    ],
  };

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Quick Links Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.quick.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm flex items-center gap-2 transition-colors ${
                      pathname === link.href
                        ? 'text-blue-600 font-medium'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Monitor Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Monitor
            </h3>
            <ul className="space-y-3">
              {footerLinks.monitor.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm flex items-center gap-2 transition-colors ${
                      pathname === link.href
                        ? 'text-blue-600 font-medium'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Learn
            </h3>
            <ul className="space-y-3">
              {footerLinks.learn.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm flex items-center gap-2 transition-colors ${
                      pathname === link.href
                        ? 'text-blue-600 font-medium'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Manage Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Manage
            </h3>
            <ul className="space-y-3">
              {footerLinks.manage.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm flex items-center gap-2 transition-colors ${
                      pathname === link.href
                        ? 'text-blue-600 font-medium'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
                ARFID Wellness Tracker
              </Link>
              <p className="text-sm text-gray-600 mt-1">
                Supporting families with comprehensive nutritional tracking
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Dr. Odet Aszkenasy
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Professional neurodevelopmental paediatrics support
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


