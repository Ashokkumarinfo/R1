'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-bold text-white">404 - Page Not Found</h2>
      <p className="text-xs text-slate-400 max-w-sm">
        The vault page or route you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Return Home</span>
      </Link>
    </div>
  );
}
