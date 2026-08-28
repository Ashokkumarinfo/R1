'use client';

import React, { useEffect } from 'react';
import { ShieldAlert, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function GlobalAppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Router Caught Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-glow-rose">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
        <p className="text-xs text-slate-400 max-w-md font-mono bg-slate-950 p-3 rounded-xl border border-white/10 overflow-x-auto text-left">
          {error?.message || 'An unexpected error occurred in LensVault application.'}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              localStorage.clear();
            }
            reset();
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-glow-cyan"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset App & Retry</span>
        </button>

        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Go Home</span>
        </Link>
      </div>
    </div>
  );
}
