import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'LensVault | Google Lens & PIN-Protected Private Media Vault',
  description: 'Ultra-secure, Google Lens style scanning and Apple Photos luxury media vaults. PIN protected with real-time syncing and custom 4K media player.',
  keywords: ['Google Lens', 'Media Vault', 'PIN Protected', 'Private Gallery', 'Supabase Realtime', 'Next.js 14'],
  authors: [{ name: 'LensVault' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#060913] text-slate-100 min-h-screen flex flex-col antialiased bg-cyber-grid`}>
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
