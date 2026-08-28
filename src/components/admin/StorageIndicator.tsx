import React from 'react';
import { HardDrive, Image as ImageIcon, Film, Music, FileText } from 'lucide-react';
import { StorageBreakdown } from '@/types';
import { formatBytes } from '@/lib/formatters';

interface StorageIndicatorProps {
  breakdown: StorageBreakdown;
}

export function StorageIndicator({ breakdown }: StorageIndicatorProps) {
  const { total, images, videos, audio, documents, quota } = breakdown;

  const usedPercent = Math.min(100, Math.max(1, (total / quota) * 100));
  const imagePercent = total > 0 ? (images / total) * 100 : 0;
  const videoPercent = total > 0 ? (videos / total) * 100 : 0;
  const audioPercent = total > 0 ? (audio / total) * 100 : 0;
  const docPercent = total > 0 ? (documents / total) * 100 : 0;

  return (
    <div className="w-full p-6 rounded-3xl glass-card border border-white/10 shadow-xl space-y-4">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Vault Storage Allocation</h4>
            <p className="text-xs text-slate-400">Encrypted Cloud Storage</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-extrabold text-cyan-300 font-mono">
            {formatBytes(total)} <span className="text-xs text-slate-500 font-normal">/ {formatBytes(quota)}</span>
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            {usedPercent.toFixed(1)}% Used
          </div>
        </div>
      </div>

      {/* Multi-colored Progress Bar */}
      <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden flex border border-white/10 p-[1px]">
        <div
          style={{ width: `${(images / quota) * 100}%` }}
          className="h-full bg-cyan-400 transition-all duration-500"
          title={`Images: ${formatBytes(images)}`}
        />
        <div
          style={{ width: `${(videos / quota) * 100}%` }}
          className="h-full bg-blue-500 transition-all duration-500"
          title={`Videos: ${formatBytes(videos)}`}
        />
        <div
          style={{ width: `${(audio / quota) * 100}%` }}
          className="h-full bg-purple-500 transition-all duration-500"
          title={`Audio: ${formatBytes(audio)}`}
        />
        <div
          style={{ width: `${(documents / quota) * 100}%` }}
          className="h-full bg-emerald-400 transition-all duration-500"
          title={`Documents: ${formatBytes(documents)}`}
        />
      </div>

      {/* Breakdown Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        
        <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5 text-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 flex-shrink-0" />
          <div className="truncate">
            <span className="text-slate-400 block text-[10px]">Photos</span>
            <span className="font-semibold text-white font-mono">{formatBytes(images)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5 text-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0" />
          <div className="truncate">
            <span className="text-slate-400 block text-[10px]">4K Videos</span>
            <span className="font-semibold text-white font-mono">{formatBytes(videos)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5 text-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500 flex-shrink-0" />
          <div className="truncate">
            <span className="text-slate-400 block text-[10px]">Audio</span>
            <span className="font-semibold text-white font-mono">{formatBytes(audio)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/5 text-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 flex-shrink-0" />
          <div className="truncate">
            <span className="text-slate-400 block text-[10px]">Docs (PDF)</span>
            <span className="font-semibold text-white font-mono">{formatBytes(documents)}</span>
          </div>
        </div>

      </div>

    </div>
  );
}
