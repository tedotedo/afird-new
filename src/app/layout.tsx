import type { Metadata, Viewport } from 'next';
import { Source_Sans_3, Libre_Baskerville } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MedicalDisclaimerGate from '@/components/MedicalDisclaimerGate';
import ConsentAnalytics from '@/components/ConsentAnalytics';

const sans = Source_Sans_3({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });
const serif = Libre_Baskerville({ subsets: ['latin'], weight: ['400', '700'], display: 'swap', variable: '--font-serif' });

export const metadata: Metadata = {
  title: { default: 'ARFID Wellness', template: '%s — ARFID Wellness' },
  description:
    'Quiet UK information for families living with Avoidant/Restrictive Food Intake Disorder. Notes stay on this device. This site does not collect child or health data.',
  applicationName: 'ARFID Wellness',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f7f6f2',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${serif.variable}`}>
      <body className="flex min-h-screen flex-col bg-paper text-ink">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <MedicalDisclaimerGate />
        <ConsentAnalytics />
      </body>
    </html>
  );
}
