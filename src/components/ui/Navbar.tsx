'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Scan, ShieldCheck, Database, LayoutDashboard, Sparkles, PlusCircle } from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();

  const isLinkActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname?.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 glass-panel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-600 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-glow-cyan">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Scan className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-400 bg-clip-text text-transparent">
                LensVault
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                PRO
              </span>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              Google Lens Scan &bull; PIN-Protected Vault
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/v/my-vault"
            className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
              pathname?.startsWith('/v/my-vault')
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-glow-cyan'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="hidden xs:inline">My Vault (1831)</span>
            <span className="xs:hidden">Vault</span>
          </Link>

          <Link
            href="/admin/qr-studio"
            className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
              isLinkActive('/admin/qr-studio')
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline">QR Generator</span>
            <span className="sm:hidden">QR</span>
          </Link>

          <Link
            href="/admin"
            className={`flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
              isLinkActive('/admin') && !isLinkActive('/admin/qr-studio')
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-blue-400" />
            <span className="hidden sm:inline">Admin Studio</span>
            <span className="sm:hidden">Admin</span>
          </Link>

          <Link
            href="/admin/vaults/new"
            className="hidden md:flex items-center gap-1.5 ml-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create Vault</span>
          </Link>
        </nav>

      </div>
    </header>
  );
}
