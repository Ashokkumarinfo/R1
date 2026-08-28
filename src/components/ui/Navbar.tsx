'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Sparkles, Image as ImageIcon, Film, Music } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Romantic Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-amber-400 to-rose-600 p-[1.5px] transition-transform duration-300 group-hover:scale-110 shadow-glow-rose">
            <div className="w-full h-full bg-[#160b10] rounded-[14px] flex items-center justify-center">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-500/30 group-hover:scale-110 transition-transform duration-300 animate-heartbeat" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-rose-100 to-amber-300 bg-clip-text text-transparent">
                Vava
              </span>
              <span className="px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Untold Story
              </span>
            </div>
            <span className="text-[11px] text-rose-200/60 hidden sm:inline font-light italic">
              A Journey of Friendship & Love 💛
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-2">
          <Link
            href="/v/my-vault"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
              pathname?.startsWith('/v/my-vault')
                ? 'bg-gradient-to-r from-rose-500/20 to-amber-500/20 text-amber-200 border border-amber-500/40 shadow-glow-golden'
                : 'text-slate-300 hover:text-white hover:bg-white/10 border border-transparent'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Open Gallery</span>
          </Link>
        </nav>

      </div>
    </header>
  );
}
