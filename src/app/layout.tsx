import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ChildProvider } from '@/contexts/ChildContext';
import { ConsentProvider } from '@/contexts/ConsentContext';
import ConsentManager from '@/components/ConsentManager';
import FeedbackWidget from '@/components/FeedbackWidget';

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
      <body className="flex flex-col min-h-screen">
        <ConsentProvider>
          <ChildProvider>
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <ConsentManager />
            <FeedbackWidget />
          </ChildProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}

