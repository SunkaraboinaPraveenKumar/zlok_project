import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/sonner";
import { Header } from '@/components/layouts/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ZLOK - Redefine Your Lifestyle',
  description: 'Premium co-working spaces, co-living experiences, and vibrant community events across India.',
  keywords: 'co-working, co-living, community, spaces, events, lifestyle, india',
  authors: [{ name: 'ZLOK Team' }],
  creator: 'ZLOK',
  publisher: 'ZLOK',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Header />
        <div className='mt-14'>
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}