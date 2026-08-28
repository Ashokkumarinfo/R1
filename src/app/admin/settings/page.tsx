'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Settings, 
  Database, 
  ShieldAlert, 
  RotateCcw, 
  Download, 
  Check, 
  Copy, 
  Lock, 
  KeyRound,
  Sparkles
} from 'lucide-react';
import { useVaultStore } from '@/lib/store/vault-store';

export default function SettingsPage() {
  const { vaults, media, folders, analytics, resetToSeed, isLiveSupabase } = useVaultStore();

  const [copiedEnv, setCopiedEnv] = useState(false);
  const [resetDone, setResetDone] = useState(false);

  const envSample = `NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`;

  const copyEnvSample = () => {
    navigator.clipboard.writeText(envSample);
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  const handleExportBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      vaults,
      media,
      folders,
      analytics,
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LensVault_Backup_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleReset = () => {
    if (confirm('Reset all vaults and media back to default seed demonstration data?')) {
      resetToSeed();
      setResetDone(true);
      setTimeout(() => setResetDone(false), 2000);
    }
  };

  return (
    <div className="py-6 space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="space-y-1">
        <Link
          href="/admin"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          System & Security Settings
        </h1>
        <p className="text-xs text-slate-400">
          Configure database connectivity, storage buckets, rate-limit policies, and backup data.
        </p>
      </div>

      {/* Supabase Connection Status Card */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Supabase PostgreSQL Engine</h3>
              <p className="text-xs text-slate-400">Cloud database, Row-Level Security, and Storage</p>
            </div>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
            isLiveSupabase 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
          }`}>
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            {isLiveSupabase ? 'Active Connected' : 'Hybrid Local + Realtime Mode'}
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          LensVault is currently functioning in <strong>Dual-Engine Mode</strong>. When local, all cross-tab synchronization operates via <code className="text-cyan-300 font-mono">BroadcastChannel</code> with persistent storage. To connect your live Supabase cloud project, create a <code className="text-cyan-300 font-mono">.env.local</code> file in the project root:
        </p>

        <div className="relative p-4 rounded-2xl bg-slate-950/80 border border-white/10 font-mono text-xs text-cyan-300">
          <pre className="overflow-x-auto">{envSample}</pre>
          <button
            onClick={copyEnvSample}
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Copy Environment Variables"
          >
            {copiedEnv ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <div className="text-[11px] text-slate-400">
          SQL migrations are pre-generated in <code className="text-cyan-300">supabase/schema.sql</code> and <code className="text-cyan-300">supabase/storage.sql</code>.
        </div>
      </div>

      {/* Security Policies Card */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10 space-y-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Default Security & PIN Policies</h3>
            <p className="text-xs text-slate-400">Global defaults applied to newly provisioned vaults</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1 text-xs">
            <span className="text-slate-400">Lockout Trigger</span>
            <div className="text-lg font-bold text-white font-mono">5 Incorrect Tries</div>
            <p className="text-[10px] text-slate-500">Auto-locks keypad</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1 text-xs">
            <span className="text-slate-400">Lockout Duration</span>
            <div className="text-lg font-bold text-white font-mono">5 Minutes</div>
            <p className="text-[10px] text-slate-500">Persistent countdown</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1 text-xs">
            <span className="text-slate-400">Session Window</span>
            <div className="text-lg font-bold text-white font-mono">30 Minutes</div>
            <p className="text-[10px] text-slate-500">Rolling inactivity timeout</p>
          </div>
        </div>
      </div>

      {/* Backup & Reset Data Tools */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-white/10 space-y-6 shadow-xl">
        <h3 className="text-base font-bold text-white pb-3 border-b border-white/10">
          Data Management & State Control
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-white">Export Vault Backup</h4>
            <p className="text-[11px] text-slate-400">
              Download all vaults, media inventory, folders, and telemetry as a JSON file.
            </p>
          </div>
          <button
            onClick={handleExportBackup}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Export JSON Archive</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
          <div>
            <h4 className="text-xs font-bold text-rose-400">Restore Default Seed Data</h4>
            <p className="text-[11px] text-slate-400">
              Resets all test vaults, folders, and sample 4K media items to fresh defaults.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-all"
          >
            {resetDone ? <Check className="w-4 h-4 text-emerald-400" /> : <RotateCcw className="w-4 h-4" />}
            <span>{resetDone ? 'Reset Complete!' : 'Restore Seed Vaults'}</span>
          </button>
        </div>
      </div>

    </div>
  );
}
