import React from 'react';
import Link from 'next/link';
import { Scan, Shield, Zap, Sparkles, Code2, Database } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-slate-950/80 backdrop-blur-xl mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1.5px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Scan className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-bold text-lg text-white">LensVault</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm">
              Google Lens-inspired scanning meets Apple Photos luxury. Share confidential media albums, 4K film reels, lossless audio, and PDF documents through dynamic QR codes and secure 4-digit PIN locks.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Scan className="w-3 h-3" /> Lens Viewfinder
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Shield className="w-3 h-3" /> 4-Digit PIN Security
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Zap className="w-3 h-3" /> Realtime Sync
              </span>
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Direct Portals
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/v/my-vault" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-cyan-400" /> My Private Vault (PIN 1831)
                </Link>
              </li>
              <li>
                <Link href="/admin/qr-studio" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Custom QR Studio
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <Code2 className="w-3.5 h-3.5 text-blue-400" /> Admin Studio & Uploads
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech & Infrastructure */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Architecture
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Next.js 14 App Router</span>
              </li>
              <li className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>Supabase PostgreSQL + Storage</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Realtime WebSockets</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                <span>Client-Side Rate Limiter</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} LensVault Systems. Built for high-security media distribution.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Encrypted Session Vaults</span>
            <span>&bull;</span>
            <span>Zero Unauthenticated Exposure</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
