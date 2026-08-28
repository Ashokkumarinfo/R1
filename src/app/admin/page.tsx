'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Plus, 
  FolderPlus, 
  UploadCloud, 
  HardDrive, 
  QrCode, 
  Lock, 
  Settings, 
  Users, 
  BarChart3, 
  Trash2, 
  Edit3, 
  Eye, 
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Database
} from 'lucide-react';
import { useVaultStore } from '@/lib/store/vault-store';
import { StorageIndicator } from '@/components/admin/StorageIndicator';
import { UploadModal } from '@/components/admin/UploadModal';
import { formatBytes, formatDate } from '@/lib/formatters';

export default function AdminPage() {
  const { vaults, media, folders, addVault, deleteVault, addMedia, getStorageBreakdown, isLiveSupabase } = useVaultStore();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [targetVaultId, setTargetVaultId] = useState<string>(vaults[0]?.id || '');

  // New Vault Form
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [pin, setPin] = useState('');
  const [downloadEnabled, setDownloadEnabled] = useState(true);
  const [maxAttempts, setMaxAttempts] = useState(5);
  const [sessionTimeout, setSessionTimeout] = useState(30);

  const storageBreakdown = getStorageBreakdown();

  const handleCreateVault = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || pin.length !== 4) return;

    const created = addVault({
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      description,
      raw_pin: pin,
      pin_hash: pin,
      download_enabled: downloadEnabled,
      max_attempts: maxAttempts,
      session_timeout_mins: sessionTimeout,
      cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200',
    });

    setIsCreateModalOpen(false);
    setTitle('');
    setSlug('');
    setDescription('');
    setPin('');
  };

  const handleOpenUpload = (vaultId: string) => {
    setTargetVaultId(vaultId);
    setIsUploadModalOpen(true);
  };

  const handleBatchUpload = (items: any[]) => {
    items.forEach((item) => {
      addMedia(item);
    });
  };

  return (
    <div className="py-6 space-y-10">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Admin Studio
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <Database className="w-3 h-3 text-emerald-400" />
              {isLiveSupabase ? 'Supabase Cloud Connected' : 'Hybrid Local + Realtime Mode'}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mt-1">
            Vaults & Storage Command Center
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-glow-cyan transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Vault</span>
          </button>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <Link
          href="/admin"
          className="p-4 rounded-2xl glass-card border border-cyan-500/40 shadow-glow-cyan flex items-center gap-3"
        >
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Vaults ({vaults.length})</h4>
            <p className="text-[11px] text-slate-400">Manage galleries</p>
          </div>
        </Link>

        <Link
          href="/admin/qr-studio"
          className="p-4 rounded-2xl glass-card border border-white/10 hover:border-white/25 flex items-center gap-3 transition-colors"
        >
          <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">QR Studio</h4>
            <p className="text-[11px] text-slate-400">Generate & export</p>
          </div>
        </Link>

        <Link
          href="/admin/analytics"
          className="p-4 rounded-2xl glass-card border border-white/10 hover:border-white/25 flex items-center gap-3 transition-colors"
        >
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Analytics</h4>
            <p className="text-[11px] text-slate-400">Scans & telemetry</p>
          </div>
        </Link>

        <Link
          href="/admin/settings"
          className="p-4 rounded-2xl glass-card border border-white/10 hover:border-white/25 flex items-center gap-3 transition-colors"
        >
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Settings</h4>
            <p className="text-[11px] text-slate-400">Security & DB</p>
          </div>
        </Link>
      </div>

      {/* Storage Breakdown Indicator */}
      <StorageIndicator breakdown={storageBreakdown} />

      {/* Vaults List Table / Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Active Media Vaults</h3>
            <p className="text-xs text-slate-400">PIN-protected secure distribution containers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vaults.map((vault) => {
            const vaultMedia = media.filter((m) => m.vault_id === vault.id);
            const totalBytes = vaultMedia.reduce((acc, c) => acc + c.size, 0);

            return (
              <div
                key={vault.id}
                className="rounded-3xl glass-card border border-white/10 p-5 flex flex-col justify-between group hover:border-cyan-500/40 transition-all shadow-xl"
              >
                <div>
                  {/* Card Cover Header */}
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-4 bg-slate-900">
                    <img
                      src={vault.cover_image}
                      alt={vault.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-950/80 text-cyan-300 border border-white/10 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-cyan-400" />
                      <span>PIN: {vault.raw_pin}</span>
                    </div>

                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-lg text-[10px] font-mono bg-cyan-500 text-slate-950 font-bold">
                      {vaultMedia.length} ITEMS
                    </div>
                  </div>

                  {/* Vault Info */}
                  <h4 className="text-base font-bold text-white line-clamp-1 mb-1 group-hover:text-cyan-300 transition-colors">
                    {vault.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                    {vault.description || 'No description provided.'}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pb-4 border-b border-white/5">
                    <span>{formatBytes(totalBytes)} used</span>
                    <span>{formatDate(vault.created_at)}</span>
                  </div>
                </div>

                {/* Vault Management Actions */}
                <div className="pt-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenUpload(vault.id)}
                      className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-colors"
                      title="Upload Media"
                    >
                      <UploadCloud className="w-4 h-4" />
                    </button>

                    <Link
                      href={`/admin/vaults/${vault.id}`}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
                      title="Manage Files & Folders"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>

                    <Link
                      href={`/v/${vault.slug}`}
                      target="_blank"
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
                      title="Open Public Vault Link"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(`Delete vault "${vault.title}" and all its media files?`)) {
                        deleteVault(vault.id);
                      }
                    }}
                    className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete Vault"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Create Vault Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl glass-card border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">Create New Protected Vault</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-semibold"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleCreateVault} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Vault Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tokyo Launch Event Stills & 4K Reel"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl glass-input text-xs"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Custom Slug (URL Path)</label>
                <input
                  type="text"
                  placeholder="e.g. tokyo-launch-2026"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full p-2.5 rounded-xl glass-input text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description</label>
                <textarea
                  placeholder="Brief note about the contents of this vault..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl glass-input text-xs h-20 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">4-Digit PIN *</label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    placeholder="e.g. 7788"
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
                    className="w-full p-2.5 rounded-xl glass-input text-xs font-mono text-center tracking-widest text-base font-bold text-cyan-300"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Max Attempts</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={maxAttempts}
                    onChange={(e) => setMaxAttempts(parseInt(e.target.value) || 5)}
                    className="w-full p-2.5 rounded-xl glass-input text-xs font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="dlEnable"
                  checked={downloadEnabled}
                  onChange={(e) => setDownloadEnabled(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500 rounded"
                />
                <label htmlFor="dlEnable" className="text-slate-300 cursor-pointer">
                  Allow viewers to download master files
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!title || pin.length !== 4}
                  className="px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow-cyan disabled:opacity-40"
                >
                  Create Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        vaultId={targetVaultId}
        folders={folders.filter((f) => f.vault_id === targetVaultId)}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadBatch={handleBatchUpload}
      />

    </div>
  );
}
