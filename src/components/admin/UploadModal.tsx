'use client';

import React, { useState, useRef } from 'react';
import { 
  X, 
  UploadCloud, 
  FileText, 
  Image as ImageIcon, 
  Film, 
  Music, 
  Check, 
  Trash2, 
  Sparkles, 
  Plus, 
  Folder as FolderIcon 
} from 'lucide-react';
import { Folder, MediaType } from '@/types';
import { detectMediaType, formatBytes } from '@/lib/formatters';

interface UploadFileItem {
  id: string;
  file: File;
  previewUrl: string;
  name: string;
  mediaType: MediaType;
  size: number;
  tags: string[];
}

interface UploadModalProps {
  isOpen: boolean;
  vaultId: string;
  folders: Folder[];
  onClose: () => void;
  onUploadBatch: (items: {
    vault_id: string;
    folder_id?: string | null;
    name: string;
    original_name: string;
    url: string;
    thumbnail_url?: string;
    media_type: MediaType;
    mime_type: string;
    size: number;
    tags: string[];
  }[]) => void;
}

export function UploadModal({
  isOpen,
  vaultId,
  folders,
  onClose,
  onUploadBatch,
}: UploadModalProps) {
  const [fileList, setFileList] = useState<UploadFileItem[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newItems: UploadFileItem[] = Array.from(files).map((file) => {
      const mediaType = detectMediaType(file.type, file.name);
      const previewUrl = URL.createObjectURL(file);

      return {
        id: `upload-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        file,
        previewUrl,
        name: file.name.replace(/\.[^/.]+$/, ''),
        mediaType,
        size: file.size,
        tags: [],
      };
    });

    setFileList((prev) => [...prev, ...newItems]);
  };

  const removeFile = (id: string) => {
    setFileList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleStartUpload = async () => {
    if (fileList.length === 0 || isUploading) return;
    setIsUploading(true);

    // Simulate progress animation
    for (let p = 10; p <= 100; p += 20) {
      setUploadProgress(p);
      await new Promise((r) => setTimeout(r, 120));
    }

    const payload = fileList.map((item) => ({
      vault_id: vaultId,
      folder_id: selectedFolderId,
      name: item.name,
      original_name: item.file.name,
      url: item.previewUrl || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200',
      thumbnail_url: item.previewUrl,
      media_type: item.mediaType,
      mime_type: item.file.type || 'application/octet-stream',
      size: item.size,
      tags: item.tags,
    }));

    onUploadBatch(payload);
    setIsUploading(false);
    setFileList([]);
    setUploadProgress(0);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-3xl glass-card border border-white/15 p-6 sm:p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Upload Media to Vault</h3>
              <p className="text-xs text-slate-400">Drag & drop photos, 4K videos, audio tracks, and documents</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          
          {/* Dropzone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-cyan-500/5 group"
          >
            <UploadCloud className="w-12 h-12 text-cyan-400 group-hover:scale-110 transition-transform mb-3" />
            <h4 className="text-sm font-bold text-white mb-1">
              Select files or drop them here
            </h4>
            <p className="text-xs text-slate-400 max-w-sm">
              Supports JPG, PNG, WEBP, MP4, MOV, MP3, WAV, FLAC, PDF
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*,audio/*,.pdf"
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
            />
          </div>

          {/* Folder Target Selector */}
          {folders.length > 0 && (
            <div className="flex items-center gap-3 p-3 rounded-xl glass-panel border border-white/10 text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <FolderIcon className="w-4 h-4 text-cyan-400" /> Destination Folder:
              </span>
              <select
                value={selectedFolderId || ''}
                onChange={(e) => setSelectedFolderId(e.target.value || null)}
                className="bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-white outline-none text-xs"
              >
                <option value="">Root Vault (No Folder)</option>
                {folders.map((f) => (
                  <option key={f.id} value={f.id}>
                    📁 {f.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Staged File List Preview */}
          {fileList.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span>Staged for Upload ({fileList.length} files)</span>
                <span>{formatBytes(fileList.reduce((acc, c) => acc + c.size, 0))}</span>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {fileList.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2.5 rounded-xl glass-panel border border-white/10 text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0 flex items-center justify-center text-cyan-400 border border-white/10">
                        {item.mediaType === 'image' && <ImageIcon className="w-4 h-4" />}
                        {item.mediaType === 'video' && <Film className="w-4 h-4" />}
                        {item.mediaType === 'audio' && <Music className="w-4 h-4" />}
                        {item.mediaType === 'document' && <FileText className="w-4 h-4" />}
                      </div>
                      <div className="truncate">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => {
                            const val = e.target.value;
                            setFileList((prev) =>
                              prev.map((i) => (i.id === item.id ? { ...i, name: val } : i))
                            );
                          }}
                          className="bg-transparent border-b border-transparent hover:border-white/20 focus:border-cyan-400 font-semibold text-white outline-none w-full truncate"
                        />
                        <div className="text-[10px] text-slate-400">
                          {formatBytes(item.size)} &bull; {item.mediaType.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFile(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Progress Bar */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-cyan-400 font-mono">
                <span>ENCRYPTING & UPLOADING...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  style={{ width: `${uploadProgress}%` }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-200"
                />
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isUploading}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleStartUpload}
            disabled={fileList.length === 0 || isUploading}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-glow-cyan transition-all disabled:opacity-40"
          >
            <Sparkles className="w-4 h-4" />
            <span>Upload {fileList.length > 0 ? `(${fileList.length}) Files` : ''}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
