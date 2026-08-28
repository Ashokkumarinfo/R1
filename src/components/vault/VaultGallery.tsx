'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Folder as FolderIcon, 
  Image as ImageIcon, 
  Film, 
  Music, 
  FileText, 
  Download, 
  Play, 
  Grid3X3, 
  LayoutGrid, 
  Heart, 
  Sparkles, 
  ArrowUpDown, 
  Lock,
  Eye
} from 'lucide-react';
import { Vault, MediaItem, Folder, MediaType } from '@/types';
import { formatBytes, formatDuration } from '@/lib/formatters';
import { UniversalMediaPlayer } from '../player/UniversalMediaPlayer';
import { clearVaultSession } from '@/lib/pin-security';

interface VaultGalleryProps {
  vault: Vault;
  mediaItems: MediaItem[];
  folders: Folder[];
  onLockVault?: () => void;
  onLogAnalytics?: (eventType: 'media_view' | 'media_download', mediaId?: string) => void;
}

export function VaultGallery({
  vault,
  mediaItems,
  folders,
  onLockVault,
  onLogAnalytics,
}: VaultGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<MediaType | 'all'>('all');
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'size' | 'name'>('newest');
  const [gridColumns, setGridColumns] = useState<'grid' | 'compact'>('grid');

  // Active Lightbox Player State
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);

  // Filtered & Sorted items
  const filteredItems = useMemo(() => {
    return mediaItems
      .filter((item) => {
        // Vault match
        if (item.vault_id !== vault.id) return false;

        // Folder filter
        if (selectedFolderId && item.folder_id !== selectedFolderId) return false;

        // Type filter
        if (selectedType !== 'all' && item.media_type !== selectedType) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = item.name.toLowerCase().includes(q);
          const matchOriginal = item.original_name.toLowerCase().includes(q);
          const matchTags = item.tags?.some((t) => t.toLowerCase().includes(q));
          if (!matchName && !matchOriginal && !matchTags) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        if (sortBy === 'oldest') return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        if (sortBy === 'size') return b.size - a.size;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [mediaItems, vault.id, selectedFolderId, selectedType, searchQuery, sortBy]);

  // Counts by media type
  const counts = useMemo(() => {
    const vMedia = mediaItems.filter((m) => m.vault_id === vault.id);
    return {
      all: vMedia.length,
      image: vMedia.filter((m) => m.media_type === 'image').length,
      video: vMedia.filter((m) => m.media_type === 'video').length,
      audio: vMedia.filter((m) => m.media_type === 'audio').length,
      document: vMedia.filter((m) => m.media_type === 'document').length,
    };
  }, [mediaItems, vault.id]);

  const handleOpenMedia = (item: MediaItem) => {
    setActiveMedia(item);
    onLogAnalytics?.('media_view', item.id);
  };

  const handleDownloadSingle = (e: React.MouseEvent, item: MediaItem) => {
    e.stopPropagation();
    if (!vault.download_enabled) return;
    onLogAnalytics?.('media_download', item.id);

    const a = document.createElement('a');
    a.href = item.url;
    a.download = item.original_name || item.name;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadAll = () => {
    if (!vault.download_enabled || filteredItems.length === 0) return;
    filteredItems.forEach((item, index) => {
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = item.url;
        a.download = item.original_name || item.name;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, index * 300);
    });
  };

  const handleLock = () => {
    clearVaultSession(vault.id);
    onLockVault?.();
  };

  return (
    <div className="w-full min-h-screen pb-20">
      
      {/* Emotional Hero Header */}
      <div className="relative w-full overflow-hidden rounded-3xl mb-8 glass-card border border-rose-500/20 p-6 sm:p-10 shadow-2xl">
        
        {/* Background Cover Art with Blur Overlay */}
        {vault.cover_image && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-2xl scale-110 pointer-events-none"
            style={{ backgroundImage: `url(${vault.cover_image})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#160b10] via-[#160b10]/95 to-[#160b10]/80" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400 animate-heartbeat" /> UNTOLD LOVE STORY
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                <Sparkles className="w-3 h-3 text-amber-400" /> Precious Memories
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
              {vault.title}
            </h1>
            
            <p className="text-xs sm:text-sm text-rose-100/80 leading-relaxed font-light">
              {vault.description || 'A timeless collection of photos, songs, reels, and cherished memories.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-rose-200/60 pt-1">
              <span>{filteredItems.length} precious moments</span>
              <span>&bull;</span>
              <span>{formatBytes(mediaItems.filter(m => m.vault_id === vault.id).reduce((acc, cur) => acc + cur.size, 0))} of memories</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {vault.download_enabled && filteredItems.length > 0 && (
              <button
                onClick={handleDownloadAll}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold bg-gradient-to-r from-rose-500 via-amber-500 to-rose-600 hover:from-rose-400 hover:to-amber-400 text-white shadow-glow-warm transition-all hover:scale-105"
              >
                <Download className="w-4 h-4" />
                <span>Save All ({filteredItems.length})</span>
              </button>
            )}

            <button
              onClick={handleLock}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-semibold bg-white/5 hover:bg-rose-500/20 text-rose-200 border border-white/10 hover:border-rose-500/30 transition-all hover:scale-105"
              title="Lock Gallery"
            >
              <Lock className="w-4 h-4 text-rose-400" />
              <span>Lock</span>
            </button>
          </div>
        </div>

      </div>

      {/* Navigation & Filter Bar */}
      <div className="w-full flex flex-col gap-4 mb-8">
        
        {/* Search, Sort and Grid Switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-rose-300/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search memories, photos, songs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl glass-input text-xs sm:text-sm font-medium focus:border-rose-400"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl glass-panel text-xs text-slate-300 border border-white/10">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent outline-none text-xs font-semibold cursor-pointer text-slate-200"
              >
                <option value="newest" className="bg-[#1a0a10] text-white">Newest First</option>
                <option value="oldest" className="bg-[#1a0a10] text-white">Oldest First</option>
                <option value="size" className="bg-[#1a0a10] text-white">Largest Size</option>
                <option value="name" className="bg-[#1a0a10] text-white">Alphabetical</option>
              </select>
            </div>

            {/* Layout Switcher */}
            <div className="flex items-center p-1 rounded-xl glass-panel border border-white/10">
              <button
                onClick={() => setGridColumns('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  gridColumns === 'grid' ? 'bg-rose-500/20 text-rose-300' : 'text-slate-400 hover:text-white'
                }`}
                title="Masonry Grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridColumns('compact')}
                className={`p-1.5 rounded-lg transition-colors ${
                  gridColumns === 'compact' ? 'bg-rose-500/20 text-rose-300' : 'text-slate-400 hover:text-white'
                }`}
                title="Compact Grid"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Media Type Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setSelectedType('all')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedType === 'all'
                ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-glow-rose'
                : 'glass-panel text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>All Moments</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/30">
              {counts.all}
            </span>
          </button>

          <button
            onClick={() => setSelectedType('image')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedType === 'image'
                ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-glow-rose'
                : 'glass-panel text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-rose-400" />
            <span>Photos</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/30">
              {counts.image}
            </span>
          </button>

          <button
            onClick={() => setSelectedType('video')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedType === 'video'
                ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-glow-rose'
                : 'glass-panel text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Film className="w-3.5 h-3.5 text-amber-400" />
            <span>Videos & Reels</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/30">
              {counts.video}
            </span>
          </button>

          <button
            onClick={() => setSelectedType('audio')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedType === 'audio'
                ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-glow-rose'
                : 'glass-panel text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Music className="w-3.5 h-3.5 text-purple-400" />
            <span>Songs & Audio</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/30">
              {counts.audio}
            </span>
          </button>

          <button
            onClick={() => setSelectedType('document')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedType === 'document'
                ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-glow-rose'
                : 'glass-panel text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Chats & Letters</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/30">
              {counts.document}
            </span>
          </button>
        </div>

        {/* Folders Explorer Subbar */}
        {folders.filter(f => f.vault_id === vault.id).length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1">
            <button
              onClick={() => setSelectedFolderId(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedFolderId === null
                  ? 'bg-rose-500/20 text-rose-200 border border-rose-500/40 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Folders
            </button>
            {folders
              .filter((f) => f.vault_id === vault.id)
              .map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolderId(folder.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedFolderId === folder.id
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'text-slate-400 hover:text-white bg-white/5'
                  }`}
                >
                  <FolderIcon
                    className="w-3.5 h-3.5"
                    style={{ color: folder.color || '#f43f5e' }}
                  />
                  <span>{folder.name}</span>
                </button>
              ))}
          </div>
        )}

      </div>

      {/* Gallery Grid */}
      {filteredItems.length === 0 ? (
        <div className="w-full py-20 flex flex-col items-center justify-center text-center p-6 rounded-3xl glass-card border border-white/5">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-400 mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">No moments found</h3>
          <p className="text-xs text-rose-200/60 max-w-sm">
            Try adjusting your search keywords or switching categories above.
          </p>
        </div>
      ) : (
        <div
          className={`grid gap-4 sm:gap-6 ${
            gridColumns === 'grid'
              ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
              : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
          }`}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenMedia(item)}
              className="group relative rounded-2xl overflow-hidden glass-card glass-card-hover cursor-pointer border border-white/10 flex flex-col"
            >
              {/* Thumbnail Container */}
              <div className="relative w-full aspect-square bg-[#1a0a10] overflow-hidden flex items-center justify-center">
                {item.media_type === 'image' && (
                  <img
                    src={item.thumbnail_url || item.url}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}

                {item.media_type === 'video' && (
                  item.thumbnail_url ? (
                    <img
                      src={item.thumbnail_url}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <video
                      src={item.url}
                      preload="metadata"
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                    />
                  )
                )}

                {item.media_type === 'audio' && (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#2a0e1a] via-[#1a0a10] to-[#200a18] p-4 text-center group-hover:scale-105 transition-transform">
                    <div className="w-14 h-14 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-2 shadow-glow-rose">
                      <Music className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-medium text-rose-100 line-clamp-2 px-2">
                      {item.name}
                    </span>
                  </div>
                )}

                {item.media_type === 'document' && (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1a150a] via-[#1a0a10] to-[#120a15] p-4 text-center group-hover:scale-105 transition-transform">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-2 shadow-glow-golden">
                      <FileText className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-medium text-amber-100 line-clamp-2 px-2">
                      {item.name}
                    </span>
                  </div>
                )}

                {/* Gradient Shading */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e060a]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Media Type Badge */}
                <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider backdrop-blur-md bg-black/60 text-rose-200 border border-white/10 flex items-center gap-1 shadow-md">
                  {item.media_type === 'image' && <ImageIcon className="w-3 h-3 text-rose-400" />}
                  {item.media_type === 'video' && <Film className="w-3 h-3 text-amber-400" />}
                  {item.media_type === 'audio' && <Music className="w-3 h-3 text-purple-400" />}
                  {item.media_type === 'document' && <FileText className="w-3 h-3 text-emerald-400" />}
                  <span>{item.media_type}</span>
                </div>

                {/* Duration Badge */}
                {item.metadata?.duration && (
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/70 text-amber-300 backdrop-blur-sm border border-white/10">
                    {formatDuration(item.metadata.duration)}
                  </div>
                )}

                {/* Play Button Overlay on Hover for Video/Audio */}
                {(item.media_type === 'video' || item.media_type === 'audio') && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center shadow-glow-warm transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Eye Icon Hover on Photos / Docs */}
                {(item.media_type === 'image' || item.media_type === 'document') && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-3 rounded-full bg-black/70 text-rose-200 backdrop-blur-md border border-white/20">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Card Title & Size */}
              <div className="p-3.5 flex flex-col justify-between flex-1">
                <h4 className="text-xs sm:text-sm font-semibold text-white truncate mb-1 group-hover:text-amber-300 transition-colors">
                  {item.name}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-rose-200/60 pt-1">
                  <span>{formatBytes(item.size)}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-mono">
                      {(item.mime_type || '').split('/')[1]?.toUpperCase() || 'FILE'}
                    </span>
                    {vault.download_enabled && (
                      <button
                        onClick={(e) => handleDownloadSingle(e, item)}
                        className="p-1 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-colors"
                        title="Download"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Universal Lightbox & Player Modal */}
      {activeMedia && (
        <UniversalMediaPlayer
          media={activeMedia}
          playlist={filteredItems}
          vault={vault}
          isOpen={Boolean(activeMedia)}
          onClose={() => setActiveMedia(null)}
          onSelectMedia={(item) => setActiveMedia(item)}
          onLogDownload={(mediaId) => onLogAnalytics?.('media_download', mediaId)}
        />
      )}

    </div>
  );
}
