'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BarChart3, Radio, RefreshCw } from 'lucide-react';
import { useVaultStore } from '@/lib/store/vault-store';
import { AnalyticsCharts } from '@/components/analytics/AnalyticsCharts';

export default function AnalyticsPage() {
  const { vaults, analytics, refreshFromMemory } = useVaultStore();
  const [selectedVaultId, setSelectedVaultId] = useState<string>('');

  return (
    <div className="py-6 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Inbound Access Telemetry & Analytics
          </h1>
          <p className="text-xs text-slate-400">
            Real-time tracking of Google Lens scans, link opens, device types, and PIN verification events.
          </p>
        </div>

        {/* Vault Filter Dropdown & Refresh */}
        <div className="flex items-center gap-2">
          <select
            value={selectedVaultId}
            onChange={(e) => setSelectedVaultId(e.target.value)}
            className="bg-slate-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none"
          >
            <option value="">All Vaults Traffic</option>
            {vaults.map((v) => (
              <option key={v.id} value={v.id}>
                {v.title}
              </option>
            ))}
          </select>

          <button
            onClick={refreshFromMemory}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            title="Refresh Telemetry"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <AnalyticsCharts
        analytics={analytics}
        vaults={vaults}
        selectedVaultId={selectedVaultId || undefined}
      />

    </div>
  );
}
