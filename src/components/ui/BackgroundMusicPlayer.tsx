'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Heart, Sparkles } from 'lucide-react';

export function BackgroundMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play audio safely
  const startAudio = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Soft gentle background volume
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setShowTooltip(false);
        })
        .catch(() => {
          // Autoplay blocked by browser policy until interaction
          setIsPlaying(false);
        });
    }
  };

  useEffect(() => {
    // Attempt playback immediately
    startAudio();

    // Listen for any initial user interaction to trigger audio smoothly
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        startAudio();
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    window.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [hasInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/bgm/sivantha-kangal.mp3"
        loop
        preload="auto"
      />

      {/* Floating Romantic BGM Controller (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 select-none">
        
        {/* Floating Tooltip Hint on first visit if paused */}
        {!isPlaying && showTooltip && (
          <div 
            onClick={togglePlay}
            className="cursor-pointer hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1f0d14]/90 border border-rose-500/30 text-rose-200 text-xs shadow-glow-rose backdrop-blur-md animate-bounce"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Click to play BGM 🎵</span>
          </div>
        )}

        <div className="flex items-center gap-3 p-2 pl-3 rounded-full bg-[#180a12]/90 border border-rose-500/30 shadow-2xl backdrop-blur-xl shadow-glow-warm">
          
          {/* Animated Vinyl / Music Icon */}
          <div 
            onClick={togglePlay}
            className="cursor-pointer flex items-center gap-2 group"
          >
            <div className={`w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md transition-transform ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }}>
              <Music className="w-4 h-4" />
            </div>

            <div className="flex flex-col text-left max-w-[130px] sm:max-w-[170px] truncate">
              <span className="text-[11px] font-bold text-white truncate flex items-center gap-1">
                <span>Sivantha Kangal</span>
                <Heart className="w-2.5 h-2.5 text-rose-400 fill-rose-400 inline" />
              </span>
              <span className="text-[9px] text-rose-200/70 font-light truncate">
                {isPlaying ? 'Playing Romantic BGM 🎶' : 'Paused • Tap to Play'}
              </span>
            </div>
          </div>

          {/* Equalizer Visualizer Bars when playing */}
          {isPlaying && (
            <div className="hidden xs:flex items-center gap-0.5 h-4 px-1">
              <span className="w-1 bg-amber-400 rounded-full animate-pulse h-3" style={{ animationDelay: '0.1s' }} />
              <span className="w-1 bg-rose-400 rounded-full animate-pulse h-4" style={{ animationDelay: '0.3s' }} />
              <span className="w-1 bg-amber-300 rounded-full animate-pulse h-2" style={{ animationDelay: '0.2s' }} />
              <span className="w-1 bg-rose-500 rounded-full animate-pulse h-4" style={{ animationDelay: '0.4s' }} />
            </div>
          )}

          {/* Play / Pause Toggle */}
          <button
            onClick={togglePlay}
            className="w-7 h-7 rounded-full bg-rose-500/20 hover:bg-rose-500/40 text-rose-200 flex items-center justify-center transition-all hover:scale-110"
            title={isPlaying ? 'Pause BGM' : 'Play BGM'}
            aria-label="Play or Pause BGM"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
          </button>

          {/* Mute / Unmute Toggle */}
          <button
            onClick={toggleMute}
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 flex items-center justify-center transition-all hover:scale-110"
            title={isMuted ? 'Unmute' : 'Mute'}
            aria-label="Mute or Unmute"
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-amber-300" />
            )}
          </button>

        </div>

      </div>
    </>
  );
}
