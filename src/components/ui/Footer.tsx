import React from 'react';
import Link from 'next/link';
import { Heart, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#12080e]/90 backdrop-blur-xl mt-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          
          {/* Brand & Quote */}
          <div className="space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500/50" />
              <span className="font-extrabold text-lg text-white">Vava — The Untold Love Story</span>
            </div>
            <p className="text-xs text-rose-200/60 max-w-md italic">
              &ldquo;சில நினைவுகள் வார்த்தைகளால் சொல்ல முடியாது... இதயத்தால் மட்டுமே உணர முடியும்.&rdquo;
              <br />
              <span className="text-[11px] not-italic text-slate-400">Some memories are beyond words — forever etched in the heart.</span>
            </p>
          </div>

          {/* Quick links */}
          <div className="flex items-center gap-6 text-xs text-slate-300">
            <Link href="/v/my-vault" className="hover:text-amber-300 transition-colors flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Memories Gallery</span>
            </Link>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} Vava & Friends. Crafted with pure love & memories.</p>
          <div className="flex items-center gap-2 text-rose-300/70">
            <span>Love</span>
            <span>&bull;</span>
            <span>Friendship</span>
            <span>&bull;</span>
            <span>Forever</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
