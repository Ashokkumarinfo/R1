'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Sparkles, Scan, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

const LensScanner = dynamic(
  () => import('@/components/scanner/LensScanner').then((mod) => mod.LensScanner),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-lg aspect-square rounded-3xl glass-card border border-cyan-500/30 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        <p className="text-xs font-mono text-cyan-300">INITIALIZING_OPTICAL_LENS...</p>
      </div>
    ),
  }
);

export default function ScanPage() {
  return (
    <div className="py-6 sm:py-10 space-y-8 flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-4xl flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          <Scan className="w-3.5 h-3.5 animate-pulse" />
          <span>OPTICAL_SCANNER_LIVE</span>
        </div>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Google Lens Viewfinder
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Scan any LensVault physical QR tag, wedding table card, or upload a code image to unlock the media vault.
        </p>
      </div>

      {/* Main Scanner */}
      <LensScanner />

    </div>
  );
}
