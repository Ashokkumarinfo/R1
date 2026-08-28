'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useVaultStore } from '@/lib/store/vault-store';
import { VaultGallery } from '@/components/vault/VaultGallery';
import { ShieldAlert, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function VaultPage() {
  const params = useParams();
  const vaultParam = params?.vaultId as string;

  const { vaults, media, folders, logAnalytics } = useVaultStore();

  // Find vault by slug or id
  const vault = vaults.find((v) => v.slug === vaultParam || v.id === vaultParam) || vaults[0];

  // Vault not found state
  if (!vault) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">Gallery Not Found</h2>
        <p className="text-xs text-slate-400 max-w-sm">
          The requested memory collection could not be loaded.
        </p>
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <VaultGallery
        vault={vault}
        mediaItems={media}
        folders={folders}
        onLockVault={() => {}}
        onLogAnalytics={(type, mediaId) => logAnalytics(vault.id, type, { mediaId })}
      />
    </div>
  );
}
