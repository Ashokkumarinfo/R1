'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Info, 
  Music, 
  Film, 
  FileText, 
  Image as ImageIcon,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Sliders,
  Share2,
  Check
} from 'lucide-react';
import { MediaItem, Vault } from '@/types';
import { formatBytes, formatDuration, formatDate } from '@/lib/formatters';

interface UniversalMediaPlayerProps {
  media: MediaItem;
  playlist?: MediaItem[];
  vault?: Vault;
  isOpen: boolean;
  onClose: () => void;
  onSelectMedia?: (media: MediaItem) => void;
  onLogDownload?: (mediaId: string) => void;
}

export function UniversalMediaPlayer({
  media,
  playlist = [],
  vault,
  isOpen,
  onClose,
  onSelectMedia,
  onLogDownload,
}: UniversalMediaPlayerProps) {
  // Video & Audio States
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(media.metadata?.duration || 0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Photo Lightbox Zoom & Info States
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Media Refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Current playlist index
  const currentIndex = playlist.findIndex((item) => item.id === media.id);
  const hasNext = currentIndex < playlist.length - 1;
  const hasPrev = currentIndex > 0;

  // Reset player states when media changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setZoomLevel(1);
    setDuration(media.metadata?.duration || 0);
  }, [media]);

  // Navigate Playlist
  const goNext = useCallback(() => {
    if (hasNext && onSelectMedia) {
      onSelectMedia(playlist[currentIndex + 1]);
    }
  }, [hasNext, currentIndex, playlist, onSelectMedia]);

  const goPrev = useCallback(() => {
    if (hasPrev && onSelectMedia) {
      onSelectMedia(playlist[currentIndex - 1]);
    }
  }, [hasPrev, currentIndex, playlist, onSelectMedia]);

  // Keyboard Shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default scrolling for space/arrows when player is active
      if (['Space', 'ArrowLeft', 'ArrowRight', 'KeyF', 'KeyM', 'Escape'].includes(e.code)) {
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
        e.preventDefault();
      }

      switch (e.code) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          if (media.media_type === 'video' && videoRef.current) {
            videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 5, duration);
          } else if (media.media_type === 'audio' && audioRef.current) {
            audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 5, duration);
          } else {
            goNext();
          }
          break;
        case 'ArrowLeft':
          if (media.media_type === 'video' && videoRef.current) {
            videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 5, 0);
          } else if (media.media_type === 'audio' && audioRef.current) {
            audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 5, 0);
          } else {
            goPrev();
          }
          break;
        case 'Space':
          togglePlay();
          break;
        case 'KeyF':
          toggleFullscreen();
          break;
        case 'KeyM':
          toggleMute();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, media, isPlaying, duration, goNext, goPrev, onClose]);

  // Play / Pause Controls
  const togglePlay = () => {
    if (media.media_type === 'video' && videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    } else if (media.media_type === 'audio' && audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) videoRef.current.muted = nextMuted;
    if (audioRef.current) audioRef.current.muted = nextMuted;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (videoRef.current) videoRef.current.volume = val;
    if (audioRef.current) audioRef.current.volume = val;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    if (videoRef.current) videoRef.current.currentTime = val;
    if (audioRef.current) audioRef.current.currentTime = val;
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    if (videoRef.current) videoRef.current.playbackRate = speed;
    if (audioRef.current) audioRef.current.playbackRate = speed;
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  };

  const handleDownload = () => {
    if (!vault?.download_enabled && vault !== undefined) return;
    onLogDownload?.(media.id);

    const a = document.createElement('a');
    a.href = media.url;
    a.download = media.original_name || media.name;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyShareLink = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col justify-between overflow-hidden select-none animate-fade-in"
    >
      {/* Top Header Bar */}
      <div className="w-full px-4 sm:px-6 py-4 flex items-center justify-between z-20 bg-gradient-to-b from-slate-950/90 to-transparent">
        
        {/* Title & Metadata */}
        <div className="flex items-center gap-3 max-w-md sm:max-w-xl">
          <div className="p-2 rounded-xl bg-white/10 text-cyan-400">
            {media.media_type === 'image' && <ImageIcon className="w-5 h-5" />}
            {media.media_type === 'video' && <Film className="w-5 h-5" />}
            {media.media_type === 'audio' && <Music className="w-5 h-5" />}
            {media.media_type === 'document' && <FileText className="w-5 h-5" />}
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm sm:text-base font-bold text-white truncate">
              {media.name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>{formatBytes(media.size)}</span>
              <span>&bull;</span>
              <span>{media.original_name}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Download Button */}
          {(vault?.download_enabled ?? true) && (
            <button
              onClick={handleDownload}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-all"
              title="Download Master File"
            >
              <Download className="w-4 h-4" />
            </button>
          )}

          {/* Info Drawer Toggle */}
          <button
            onClick={() => setShowInfo(!showInfo)}
            className={`p-2.5 rounded-xl transition-all ${
              showInfo ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-white/10 hover:bg-white/20 text-slate-200'
            }`}
            title="Inspect Metadata"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Share Link */}
          <button
            onClick={copyShareLink}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-all"
            title="Copy Vault Link"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white transition-all ml-2"
            title="Close Viewer (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Center Media Viewport */}
      <div className="relative flex-1 flex items-center justify-center p-2 sm:p-6 overflow-hidden">
        
        {/* Navigation Arrows */}
        {hasPrev && (
          <button
            onClick={goPrev}
            className="absolute left-4 z-30 p-3 rounded-full bg-slate-900/70 hover:bg-cyan-500 text-white transition-all shadow-xl backdrop-blur-md hover:scale-110"
            title="Previous (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {hasNext && (
          <button
            onClick={goNext}
            className="absolute right-4 z-30 p-3 rounded-full bg-slate-900/70 hover:bg-cyan-500 text-white transition-all shadow-xl backdrop-blur-md hover:scale-110"
            title="Next (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* 1. Image Viewer */}
        {media.media_type === 'image' && (
          <div className="relative max-w-full max-h-full flex items-center justify-center">
            <img
              src={media.url}
              alt={media.name}
              style={{ transform: `scale(${zoomLevel})` }}
              className="max-h-[75vh] max-w-[85vw] object-contain rounded-xl transition-transform duration-200 shadow-2xl"
            />

            {/* Zoom Controls Overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1.5 rounded-2xl glass-panel border border-white/10 shadow-2xl">
              <button
                onClick={() => setZoomLevel((prev) => Math.max(0.5, prev - 0.25))}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2 text-xs font-mono text-cyan-300">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={() => setZoomLevel((prev) => Math.min(3, prev + 0.25))}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10"
                title="Reset Zoom"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 2. Video Player */}
        {media.media_type === 'video' && (
          <div className="relative w-full max-w-4xl max-h-[75vh] aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black flex items-center justify-center group">
            <video
              ref={videoRef}
              src={media.url}
              poster={media.thumbnail_url}
              onClick={togglePlay}
              onTimeUpdate={() => {
                if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
              }}
              onLoadedMetadata={() => {
                if (videoRef.current) setDuration(videoRef.current.duration);
              }}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-contain cursor-pointer"
            />

            {/* Center Play Button if paused */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute p-6 rounded-full bg-cyan-500/90 text-slate-950 shadow-glow-cyan hover:scale-110 transition-transform"
              >
                <Play className="w-10 h-10 fill-current ml-1" />
              </button>
            )}
          </div>
        )}

        {/* 3. Audio Player & Visualizer */}
        {media.media_type === 'audio' && (
          <div className="w-full max-w-md p-8 rounded-3xl glass-card border border-white/10 shadow-2xl flex flex-col items-center text-center">
            <audio
              ref={audioRef}
              src={media.url}
              onTimeUpdate={() => {
                if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
              }}
              onLoadedMetadata={() => {
                if (audioRef.current) setDuration(audioRef.current.duration);
              }}
              onEnded={() => {
                setIsPlaying(false);
                goNext();
              }}
            />

            {/* Album Cover / Waveform Emblem */}
            <div className="relative w-40 h-40 rounded-2xl overflow-hidden mb-6 shadow-2xl border border-white/10 group">
              <img
                src={media.thumbnail_url || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600'}
                alt={media.name}
                className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : ''}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
              
              {/* Pulsing visualizer circle */}
              {isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border-2 border-cyan-400 animate-ping opacity-50" />
                </div>
              )}
            </div>

            <h3 className="text-lg font-bold text-white line-clamp-1 mb-1">
              {media.name}
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              {media.metadata?.artist || 'Unknown Artist'} &bull; {media.metadata?.album || 'Soundtrack'}
            </p>

            {/* Fake Waveform Visualizer Bars */}
            <div className="w-full flex items-end justify-center gap-1 h-12 mb-6 px-4">
              {[40, 65, 20, 85, 45, 95, 30, 70, 50, 90, 60, 40, 80, 25, 75, 100, 35, 60, 85, 40].map((height, i) => (
                <div
                  key={i}
                  style={{
                    height: isPlaying ? `${Math.max(15, (height * (Math.sin(currentTime * 4 + i) + 1.2)) / 2)}%` : `${height * 0.3}%`
                  }}
                  className={`flex-1 rounded-full transition-all duration-100 ${
                    (i / 20) * duration <= currentTime
                      ? 'bg-gradient-to-t from-cyan-500 to-blue-400'
                      : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* 4. Document Viewer (PDF Reader) */}
        {media.media_type === 'document' && (
          <div className="w-full max-w-4xl h-[75vh] rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-2xl flex flex-col">
            <div className="p-3 bg-slate-900 border-b border-white/10 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                {media.name}
              </span>
              <span className="text-slate-400">PDF Reader Mode</span>
            </div>
            <iframe
              src={`${media.url}#toolbar=0`}
              title={media.name}
              className="w-full flex-1 bg-white border-0"
            />
          </div>
        )}

        {/* Metadata Inspection Drawer */}
        {showInfo && (
          <div className="absolute right-4 top-4 bottom-20 w-80 rounded-2xl glass-card border border-white/15 p-6 z-40 shadow-2xl overflow-y-auto animate-slide-in">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
              <h4 className="font-bold text-sm text-white">Item Metadata</h4>
              <button
                onClick={() => setShowInfo(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 uppercase tracking-wider text-[10px] block mb-1">File Name</label>
                <p className="text-slate-200 font-medium break-all">{media.original_name}</p>
              </div>

              <div>
                <label className="text-slate-400 uppercase tracking-wider text-[10px] block mb-1">File Size</label>
                <p className="text-cyan-300 font-mono">{formatBytes(media.size)} ({media.size.toLocaleString()} bytes)</p>
              </div>

              <div>
                <label className="text-slate-400 uppercase tracking-wider text-[10px] block mb-1">MIME Type</label>
                <p className="text-slate-200 font-mono">{media.mime_type}</p>
              </div>

              <div>
                <label className="text-slate-400 uppercase tracking-wider text-[10px] block mb-1">Uploaded On</label>
                <p className="text-slate-200">{formatDate(media.created_at)}</p>
              </div>

              {media.metadata?.camera && (
                <div>
                  <label className="text-slate-400 uppercase tracking-wider text-[10px] block mb-1">Camera Gear</label>
                  <p className="text-slate-200">{media.metadata.camera}</p>
                </div>
              )}

              {media.metadata?.location && (
                <div>
                  <label className="text-slate-400 uppercase tracking-wider text-[10px] block mb-1">Location</label>
                  <p className="text-slate-200">{media.metadata.location}</p>
                </div>
              )}

              {media.tags && media.tags.length > 0 && (
                <div>
                  <label className="text-slate-400 uppercase tracking-wider text-[10px] block mb-1.5">Tags</label>
                  <div className="flex flex-wrap gap-1.5">
                    {media.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[11px]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* Bottom Media Scrubbing & Player Bar (For Video and Audio) */}
      {(media.media_type === 'video' || media.media_type === 'audio') && (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 z-20">
          <div className="p-3 sm:p-4 rounded-2xl glass-panel border border-white/10 shadow-2xl flex flex-col gap-2">
            
            {/* Timeline Progress Slider */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400 w-12 text-right">
                {formatDuration(currentTime)}
              </span>
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 accent-cyan-400 h-1.5 bg-slate-700 rounded-lg cursor-pointer"
              />
              <span className="text-xs font-mono text-slate-400 w-12">
                {formatDuration(duration)}
              </span>
            </div>

            {/* Playback Controls Toolbar */}
            <div className="flex items-center justify-between pt-1">
              
              {/* Play / Next / Prev */}
              <div className="flex items-center gap-2">
                <button
                  onClick={goPrev}
                  disabled={!hasPrev}
                  className="p-2 rounded-xl text-slate-300 hover:text-white disabled:opacity-30"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={togglePlay}
                  className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow-cyan hover:scale-105 transition-all"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>

                <button
                  onClick={goNext}
                  disabled={!hasNext}
                  className="p-2 rounded-xl text-slate-300 hover:text-white disabled:opacity-30"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Volume & Speed & Fullscreen */}
              <div className="flex items-center gap-3 sm:gap-4">
                
                {/* Volume Slider */}
                <div className="flex items-center gap-2">
                  <button onClick={toggleMute} className="text-slate-400 hover:text-white">
                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 sm:w-20 accent-cyan-400 h-1 bg-slate-700 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Speed Toggle */}
                <div className="flex items-center gap-1 text-xs">
                  {[1, 1.5, 2].map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSpeedChange(s)}
                      className={`px-2 py-1 rounded-lg font-mono transition-colors ${
                        playbackRate === s ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>

                {/* Fullscreen Toggle */}
                <button
                  onClick={toggleFullscreen}
                  className="p-2 text-slate-300 hover:text-white transition-colors"
                  title="Toggle Fullscreen (F)"
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
