import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space',
});

export const metadata: Metadata = {
  title: 'ThreatVision AI - Enterprise Cyber Threat Intelligence Platform',
  description: 'Real-time threat intelligence platform for security professionals. Analyze IPs, domains, and file hashes with instant risk scoring.',
  keywords: 'cybersecurity, threat intelligence, IOC, malware detection, virus total, security, threat hunting',
  authors: [{ name: 'mnadeem2074' }],
  openGraph: {
    title: 'ThreatVision AI - Cyber Threat Intelligence',
    description: 'Enterprise-grade threat intelligence platform with real-time analysis',
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
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
