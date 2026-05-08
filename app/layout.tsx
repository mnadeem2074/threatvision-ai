import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ThreatVision AI - Enterprise Cyber Threat Intelligence Platform',
  description: 'Real-time threat intelligence platform for security professionals. Analyze IPs, domains, and file hashes with instant risk scoring.',
  keywords: 'cybersecurity, threat intelligence, IOC, malware detection, virus total, security',
  authors: [{ name: 'mnadeem2074' }],
  openGraph: {
    title: 'ThreatVision AI - Cyber Threat Intelligence',
    description: 'Enterprise-grade threat intelligence platform',
    url: 'https://threatvision-ai.vercel.app',
    siteName: 'ThreatVision AI',
    images: [
      {
        url: 'https://threatvision-ai.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ThreatVision AI Platform',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ThreatVision AI - Cyber Threat Intelligence',
    description: 'Real-time threat intelligence platform',
    images: ['https://threatvision-ai.vercel.app/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
