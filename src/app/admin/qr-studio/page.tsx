'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, QrCode, Sparkles } from 'lucide-react';
import { useVaultStore } from '@/lib/store/vault-store';
import { QRCodeCard } from '@/components/qr/QRCodeCard';

export default function QRStudioPage() {
  const { vaults } = useVaultStore();
  const [selectedVaultId, setSelectedVaultId] = useState<string>(vaults[0]?.id || '');

  const activeVault = vaults.find((v) => v.id === selectedVaultId) || vaults[0];

  return (
    <div className="py-6 space-y-8 flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-4xl flex items-center justify-between">
        <Link
          href="/admin"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Admin Dashboard</span>
        </Link>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <QrCode className="w-3.5 h-3.5" />
          <span>DYNAMIC_QR_STUDIO</span>
        </div>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          QR Code Generation Studio
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Export high-resolution PNGs, vector SVGs, and printable cards configured for Google Lens and camera scanning.
        </p>
      </div>

      {/* Vault Picker */}
      {vaults.length > 1 && (
        <div className="flex items-center gap-2 p-2 rounded-2xl glass-panel border border-white/10 text-xs">
          <span className="font-semibold text-slate-400 px-2">Select Vault:</span>
          {vaults.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedVaultId(v.id)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                (activeVault?.id === v.id)
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow-cyan'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {v.title}
            </button>
          ))}
        </div>
      )}

      {/* QR Studio Card */}
      {activeVault && <QRCodeCard vault={activeVault} />}

    </div>
  );
}
