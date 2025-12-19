import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import { ChildProvider } from '@/contexts/ChildContext';

export const metadata: Metadata = {
  title: 'ARFID Wellness Tracker',
  description: 'Supporting families managing Avoidant/Restrictive Food Intake Disorder',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ChildProvider>
          <Navigation />
          {children}
        </ChildProvider>
      </body>
    </html>
  );
}

