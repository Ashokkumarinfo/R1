import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import '@/styles/globals.css';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { BackgroundMusicPlayer } from '@/components/ui/BackgroundMusicPlayer';

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Vava — The Untold Love Story 💛',
  description: 'An emotional journey of love, friendship, memories, and timeless feelings. A cinematic celebration of heartfelt moments.',
  keywords: ['Vava', 'The Untold Love Story', 'Memories', 'Photos', 'Videos', 'Love Story', 'Friendship'],
  authors: [{ name: 'Vava & Friends' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.className} bg-[#0c070a] text-slate-100 min-h-screen flex flex-col antialiased relative selection:bg-rose-500 selection:text-white`}>
        
        {/* Ambient Warm Golden & Rose Light Orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-rose-600/15 rounded-full blur-[120px] animate-bokeh" />
          <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] bg-amber-500/10 rounded-full blur-[140px] animate-bokeh" style={{ animationDelay: '2s' }} />
          <div className="absolute -bottom-32 left-1/4 w-[28rem] h-[28rem] bg-rose-500/10 rounded-full blur-[130px] animate-bokeh" style={{ animationDelay: '4s' }} />
        </div>

        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 relative z-10">
          {children}
        </main>
        <Footer />

        {/* Global Floating Romantic BGM Player */}
        <BackgroundMusicPlayer />
      </body>
    </html>
  );
}
