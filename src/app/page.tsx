'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Heart, 
  Sparkles, 
  Film, 
  Music, 
  FileText, 
  Image as ImageIcon, 
  ArrowRight, 
  Lock,
  ChevronRight
} from 'lucide-react';
import { useVaultStore } from '@/lib/store/vault-store';

export default function HomePage() {
  const { vaults } = useVaultStore();
  const primaryVault = vaults.find(v => v.slug === 'my-vault') || vaults[0];

  // Client-side heart particle generation for 3D floating effect
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number }>>([]);

  useEffect(() => {
    const items = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.floor(Math.random() * 95) + 2,
      delay: Math.random() * 8,
      duration: Math.floor(Math.random() * 6) + 7,
      size: Math.floor(Math.random() * 16) + 14,
    }));
    setHearts(items);
  }, []);

  return (
    <div className="space-y-12 sm:space-y-16 relative">
      
      {/* 3D Floating Heart Bubbles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {hearts.map((h) => (
          <div
            key={h.id}
            className="absolute bottom-0 text-rose-500/30 animate-float-heart"
            style={{
              left: `${h.left}%`,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
              fontSize: `${h.size}px`,
            }}
          >
            💛
          </div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12 text-center flex flex-col items-center z-10">
        
        {/* Glow ambient background */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-32 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Romantic Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-6 shadow-glow-rose animate-fade-slide-up">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 animate-heartbeat" />
          <span>A Tale of Friendship, Love & Cherished Memories</span>
        </div>

        {/* Main Cinematic Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] animate-fade-slide-up font-sans">
          Vava —{' '}
          <span className="text-gradient-love">
            The Untold Love Story
          </span>
        </h1>

        {/* Emotional Subtitle (Tamil & English) */}
        <p className="mt-5 text-base sm:text-xl text-rose-100/80 max-w-2xl font-light leading-relaxed animate-fade-slide-up">
          &ldquo;சில கதைகள் முடிவதில்லை... நினைவுகளாய் இதயத்தில் வாழ்கின்றன.&rdquo;
          <br />
          <span className="text-xs sm:text-base text-slate-300">
            A sacred space of unsaid feelings, endless smiles, beautiful music, and precious moments that will never fade.
          </span>
        </p>

        {/* Direct Action Link Button */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 animate-fade-slide-up">
          <Link
            href="/v/my-vault"
            className="flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600 hover:from-rose-400 hover:to-amber-400 text-white shadow-glow-warm transition-all hover:scale-105"
          >
            <Lock className="w-5 h-5 text-amber-200" />
            <span>Unlock Memories Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </section>

      {/* Quick Category Showcase — Links to Protected Vault */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 z-10 relative">
        
        {/* Photos */}
        <Link
          href="/v/my-vault"
          className="p-5 rounded-2xl glass-card glass-card-hover border border-rose-500/20 text-center flex flex-col items-center space-y-2 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow-rose">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">Photos</h3>
          <p className="text-[11px] text-rose-200/60 font-light">Every smile captured</p>
        </Link>

        {/* Videos */}
        <Link
          href="/v/my-vault"
          className="p-5 rounded-2xl glass-card glass-card-hover border border-amber-500/20 text-center flex flex-col items-center space-y-2 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform shadow-glow-golden">
            <Film className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">Videos & Reels</h3>
          <p className="text-[11px] text-amber-200/60 font-light">Living memories</p>
        </Link>

        {/* Audio */}
        <Link
          href="/v/my-vault"
          className="p-5 rounded-2xl glass-card glass-card-hover border border-purple-500/20 text-center flex flex-col items-center space-y-2 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Music className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">Songs & Audio</h3>
          <p className="text-[11px] text-purple-200/60 font-light">Melodies of love</p>
        </Link>

        {/* Chats & Docs */}
        <Link
          href="/v/my-vault"
          className="p-5 rounded-2xl glass-card glass-card-hover border border-emerald-500/20 text-center flex flex-col items-center space-y-2 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">Chats & Notes</h3>
          <p className="text-[11px] text-emerald-200/60 font-light">Unforgotten words</p>
        </Link>

      </section>

      {/* Romantic Lock Invitation Card */}
      <section className="relative rounded-3xl overflow-hidden glass-card border border-rose-500/25 p-8 sm:p-12 shadow-2xl text-center flex flex-col items-center z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-rose-500/10" />
        <div className="relative z-10 max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/40">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>PROTECTED PRIVATE MEMORIES</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Enter Secret Code to Unlock All Files
          </h2>
          
          <p className="text-xs sm:text-sm text-rose-200/80 leading-relaxed font-light">
            Our photos, romantic Tamil songs, 4K film reels, and special messages are kept safe behind a private 4-digit number lock.
          </p>

          <div className="pt-3">
            <Link
              href="/v/my-vault"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-glow-warm hover:scale-105 transition-all"
            >
              <Lock className="w-4 h-4" />
              <span>Enter 4-Digit Password</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
