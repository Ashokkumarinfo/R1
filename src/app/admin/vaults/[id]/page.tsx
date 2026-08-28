'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  UploadCloud, 
  FolderPlus, 
  Folder as FolderIcon, 
  Trash2, 
  Edit3, 
  Lock, 
  QrCode, 
  Settings, 
  Eye, 
  ExternalLink, 
  FileText, 
  Image as ImageIcon, 
  Film, 
  Music, 
  Save, 
  Check, 
  Sparkles,
  Plus
} from 'lucide-react';
import { useVaultStore } from '@/lib/store/vault-store';
import { UploadModal } from '@/components/admin/UploadModal';
import { QRCodeCard } from '@/components/qr/QRCodeCard';
import { formatBytes, formatDate } from '@/lib/formatters';

export default function VaultManagerPage() {
  const params = useParams();
  const router = useRouter();
  const vaultId = params?.id as string;

  const { 
    vaults, 
    media, 
    folders, 
    updateVault, 
    deleteVault, 
    addMedia, 
    updateMedia, 
    deleteMedia, 
    addFolder, 
    deleteFolder, 
    moveMediaToFolder 
  } = useVaultStore();

  const vault = vaults.find((v) => v.id === vaultId || v.slug === vaultId);

  const [activeTab, setActiveTab] = useState<'files' | 'folders' | 'qr' | 'settings'>('files');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [editingMediaId, setEditingMediaId] = useState<string | null>(null);
  const [editingMediaName, setEditingMediaName] = useState('');

  // Settings form states
  const [title, setTitle] = useState(vault?.title || '');
  const [pin, setPin] = useState(vault?.raw_pin || '1337');
  const [downloadEnabled, setDownloadEnabled] = useState(vault?.download_enabled ?? true);
  const [savedSettingsNotice, setSavedSettingsNotice] = useState(false);

  if (!vault) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Vault Not Found</h2>
        <Link href="/admin" className="text-cyan-400 text-xs hover:underline">
          Return to Admin Dashboard
        </Link>
      </div>
    );
  }

  const vaultMedia = media.filter((m) => m.vault_id === vault.id);
  const vaultFolders = folders.filter((f) => f.vault_id === vault.id);

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    addFolder(vault.id, newFolderName.trim());
    setNewFolderName('');
  };

  const handleSaveMediaRename = (id: string) => {
    if (editingMediaName.trim()) {
      updateMedia(id, { name: editingMediaName.trim() });
    }
    setEditingMediaId(null);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateVault(vault.id, {
      title,
      raw_pin: pin,
      pin_hash: pin,
      download_enabled: downloadEnabled,
    });
    setSavedSettingsNotice(true);
    setTimeout(() => setSavedSettingsNotice(false), 2000);
  };

  return (
    <div className="py-6 space-y-8">
      
      {/* Top Header */}
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
            {vault.title}
          </h1>
          <p className="text-xs text-slate-400">
            Slug: <span className="font-mono text-cyan-300">/v/{vault.slug}</span> &bull; PIN: <span className="font-mono text-cyan-300">{vault.raw_pin}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-glow-cyan transition-all hover:scale-105"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Media</span>
          </button>

          <Link
            href={`/v/${vault.slug}`}
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold glass-panel hover:bg-white/10 text-slate-200 border border-white/10"
          >
            <ExternalLink className="w-4 h-4 text-cyan-400" />
            <span>Open Vault View</span>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('files')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'files'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Files & Media ({vaultMedia.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('folders')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'folders'
              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FolderIcon className="w-4 h-4" />
          <span>Folders ({vaultFolders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('qr')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'qr'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>QR Tag Studio</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'settings'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Vault Settings</span>
        </button>
      </div>

      {/* Tab 1: Files Manager */}
      {activeTab === 'files' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Media Inventory</h3>
            <span className="text-xs text-slate-400">
              Total Storage: {formatBytes(vaultMedia.reduce((acc, c) => acc + c.size, 0))}
            </span>
          </div>

          {vaultMedia.length === 0 ? (
            <div className="p-12 text-center rounded-3xl glass-card border border-white/10 space-y-3">
              <UploadCloud className="w-10 h-10 text-slate-500 mx-auto" />
              <h4 className="text-sm font-bold text-white">No media uploaded yet</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Drag and drop files into this vault to immediately make them accessible.
              </p>
              <button
                onClick={() => setIsUploadOpen(true)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400"
              >
                Upload Files
              </button>
            </div>
          ) : (
            <div className="rounded-2xl glass-card border border-white/10 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-slate-400 text-[11px] uppercase tracking-wider">
                    <th className="p-3 font-semibold">Item</th>
                    <th className="p-3 font-semibold">Type</th>
                    <th className="p-3 font-semibold">Folder</th>
                    <th className="p-3 font-semibold">Size</th>
                    <th className="p-3 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {vaultMedia.map((item) => {
                    const isEditing = editingMediaId === item.id;
                    const folder = vaultFolders.find((f) => f.id === item.folder_id);

                    return (
                      <tr key={item.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0 border border-white/10">
                              <img
                                src={item.thumbnail_url || item.url}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              {isEditing ? (
                                <div className="flex items-center gap-1">
                                  <input
                                    type="text"
                                    value={editingMediaName}
                                    onChange={(e) => setEditingMediaName(e.target.value)}
                                    className="p-1 rounded bg-slate-900 border border-cyan-400 text-white text-xs outline-none"
                                  />
                                  <button
                                    onClick={() => handleSaveMediaRename(item.id)}
                                    className="p-1 text-cyan-400 hover:text-cyan-300"
                                  >
                                    <Check className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ) : (
                                <div className="font-semibold text-white truncate max-w-xs sm:max-w-md">
                                  {item.name}
                                </div>
                              )}
                              <div className="text-[10px] text-slate-400 truncate">
                                {item.original_name} &bull; {formatDate(item.created_at)}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-white/10 text-slate-300">
                            {item.media_type}
                          </span>
                        </td>

                        <td className="p-3">
                          <select
                            value={item.folder_id || ''}
                            onChange={(e) => moveMediaToFolder(item.id, e.target.value || null)}
                            className="bg-slate-900 border border-white/10 rounded-lg px-2 py-1 text-slate-300 text-[11px] outline-none"
                          >
                            <option value="">(Root)</option>
                            {vaultFolders.map((f) => (
                              <option key={f.id} value={f.id}>
                                {f.name}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td className="p-3 font-mono text-cyan-300">
                          {formatBytes(item.size)}
                        </td>

                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                setEditingMediaId(item.id);
                                setEditingMediaName(item.name);
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                              title="Rename Item"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`Delete "${item.name}" from vault?`)) {
                                  deleteMedia(item.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
                              title="Delete Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Folders Manager */}
      {activeTab === 'folders' && (
        <div className="space-y-6">
          {/* Create Folder Form */}
          <form onSubmit={handleCreateFolder} className="p-4 rounded-2xl glass-card border border-white/10 flex items-center gap-3">
            <FolderPlus className="w-5 h-5 text-cyan-400" />
            <input
              type="text"
              placeholder="New Folder Name (e.g. 4K Drone Footage)"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              className="flex-1 p-2 rounded-xl glass-input text-xs"
            />
            <button
              type="submit"
              disabled={!newFolderName.trim()}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 disabled:opacity-40"
            >
              Add Folder
            </button>
          </form>

          {/* Folder Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {vaultFolders.map((folder) => {
              const inFolderCount = vaultMedia.filter((m) => m.folder_id === folder.id).length;
              return (
                <div
                  key={folder.id}
                  className="p-4 rounded-2xl glass-card border border-white/10 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
                      <FolderIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{folder.name}</h4>
                      <p className="text-[10px] text-slate-400">{inFolderCount} items</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm(`Delete folder "${folder.name}"? (Files will be unassigned to root)`)) {
                        deleteFolder(folder.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: QR Studio */}
      {activeTab === 'qr' && (
        <div className="flex justify-center">
          <QRCodeCard vault={vault} />
        </div>
      )}

      {/* Tab 4: Vault Settings */}
      {activeTab === 'settings' && (
        <div className="max-w-xl mx-auto p-6 rounded-3xl glass-card border border-white/10 space-y-6">
          <h3 className="text-base font-bold text-white pb-3 border-b border-white/10">
            Vault Configuration & PIN Policies
          </h3>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Vault Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl glass-input text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">4-Digit Security PIN</label>
              <input
                type="text"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ''))}
                className="w-full p-2.5 rounded-xl glass-input text-xs font-mono tracking-widest text-base font-bold text-cyan-300"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="vaultDl"
                checked={downloadEnabled}
                onChange={(e) => setDownloadEnabled(e.target.checked)}
                className="w-4 h-4 accent-cyan-500 rounded"
              />
              <label htmlFor="vaultDl" className="text-slate-300 cursor-pointer">
                Enable file downloading for viewers
              </label>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              {savedSettingsNotice ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="w-4 h-4" /> Settings Saved!
                </span>
              ) : <div />}

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-glow-cyan"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        vaultId={vault.id}
        folders={vaultFolders}
        onClose={() => setIsUploadOpen(false)}
        onUploadBatch={(items) => items.forEach((i) => addMedia(i))}
      />

    </div>
  );
}
