'use client';

import React, { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error Boundary caught error:', error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-white min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md p-8 rounded-3xl bg-slate-900 border border-white/10 shadow-2xl space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto">
            ⚠️
          </div>
          <h2 className="text-xl font-bold text-white">Application Error</h2>
          <p className="text-xs text-slate-400 font-mono bg-slate-950 p-3 rounded-xl border border-white/10 overflow-x-auto text-left">
            {error?.message || 'An unexpected error occurred in LensVault.'}
          </p>
          <div className="flex gap-3 justify-center pt-2">
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.clear();
                  sessionStorage.clear();
                }
                reset();
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors"
            >
              Clear Storage & Retry
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
