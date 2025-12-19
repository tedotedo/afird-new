'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface DropdownItem {
  href: string;
  label: string;
  icon?: string;
}

interface DropdownMenuProps {
  label: string;
  items: DropdownItem[];
  currentPath: string;
}

export default function DropdownMenu({ label, items, currentPath }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Check if any item in this dropdown is active
  const isActive = items.some(item => currentPath === item.href);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  // Close dropdown on window resize (handles responsive breakpoint changes)
  useEffect(() => {
    const handleResize = () => {
      setIsOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
          isActive
            ? 'bg-blue-50 text-blue-700'
            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-fadeIn">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                currentPath === item.href
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.icon && <span className="text-lg">{item.icon}</span>}
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

