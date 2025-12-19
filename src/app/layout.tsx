import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
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
      <body className="flex flex-col min-h-screen">
        <ChildProvider>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ChildProvider>
      </body>
    </html>
  );
}

