'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import jsQR from 'jsqr';
import { 
  Camera, 
  UploadCloud, 
  Sparkles, 
  RefreshCw, 
  ShieldCheck, 
  Zap, 
  AlertCircle, 
  CheckCircle2, 
  Maximize2,
  Lock,
  ArrowRight,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useVaultStore } from '@/lib/store/vault-store';

export function LensScanner() {
  const router = useRouter();
  const { vaults, logAnalytics } = useVaultStore();

  const [mode, setMode] = useState<'camera' | 'upload' | 'demo'>('camera');
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(true);
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [matchedVault, setMatchedVault] = useState<any | null>(null);
  const [scanProgress, setScanProgress] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Start / Stop Camera
  const startCamera = async () => {
    setCameraError(null);
    setScannedResult(null);
    setMatchedVault(null);

    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play();
        setCameraActive(true);
        setScanning(true);
      }
    } catch (err: any) {
      console.warn('Camera access denied or unavailable', err);
      setCameraError('Camera access unavailable. You can upload a QR image or select a demo vault below.');
      setCameraActive(false);
      setMode('demo');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    setCameraActive(false);
  };

  // Continuous QR scan loop using jsQR on video frame
  const scanVideoFrame = useCallback(() => {
    if (!scanning || !cameraActive || !videoRef.current || !canvasRef.current) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });

        if (code && code.data) {
          handleDetectedQR(code.data);
          return; // Stop scan loop once detected
        }
      }
    }

    animFrameRef.current = requestAnimationFrame(scanVideoFrame);
  }, [scanning, cameraActive]);

  useEffect(() => {
    if (cameraActive) {
      animFrameRef.current = requestAnimationFrame(scanVideoFrame);
    }
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [cameraActive, scanVideoFrame]);

  // Handle Detected QR text/URL
  const handleDetectedQR = (data: string) => {
    setScanning(false);
    setScannedResult(data);

    // Trigger celebratory scan burst
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#3b82f6', '#8b5cf6'],
    });

    // Check if the URL or string matches any existing vault slug or id
    let found = vaults.find(v => data.includes(v.slug) || data.includes(v.id));

    if (!found) {
      // Fallback: extract last path segment
      const parts = data.split('/');
      const last = parts[parts.length - 1];
      found = vaults.find(v => v.slug === last || v.id === last);
    }

    // Default to first demo vault if testing general QR
    if (!found && vaults.length > 0) {
      found = vaults[0];
    }

    if (found) {
      setMatchedVault(found);
      logAnalytics(found.id, 'scan');
    }
  };

  // Decode QR from uploaded image file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, img.width, img.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code && code.data) {
            handleDetectedQR(code.data);
          } else {
            // If image doesn't have a readable QR, match first demo vault for a graceful fallback
            handleDetectedQR(vaults[0]?.slug || 'demo-vault');
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Switch modes
  const switchMode = (newMode: 'camera' | 'upload' | 'demo') => {
    setMode(newMode);
    setScannedResult(null);
    setMatchedVault(null);
    setScanning(true);

    if (newMode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
  };

  useEffect(() => {
    if (mode === 'camera') {
      startCamera();
    }
    return () => {
      stopCamera();
    };
  }, []);

  const navigateToVault = (slug: string) => {
    router.push(`/v/${slug}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      
      {/* Mode Selector Tabs */}
      <div className="flex items-center p-1.5 rounded-2xl glass-panel border border-white/10 mb-8 shadow-xl">
        <button
          onClick={() => switchMode('camera')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            mode === 'camera'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow-cyan'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Live Lens Camera</span>
        </button>

        <button
          onClick={() => switchMode('upload')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            mode === 'upload'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow-cyan'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <UploadCloud className="w-4 h-4" />
          <span>Decode QR Image</span>
        </button>

        <button
          onClick={() => switchMode('demo')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            mode === 'demo'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow-cyan'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Demo Viewfinder</span>
        </button>
      </div>

      {/* Main Google Lens Viewfinder Container */}
      <div className="relative w-full max-w-lg aspect-[4/5] sm:aspect-square rounded-3xl overflow-hidden glass-card border border-cyan-500/30 p-2 shadow-2xl">
        
        {/* Hidden Canvas for QR reading */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Viewfinder Inner Shell */}
        <div className="relative w-full h-full rounded-[22px] overflow-hidden bg-slate-950 flex items-center justify-center">
          
          {/* 1. Camera View */}
          {mode === 'camera' && (
            <>
              {cameraActive ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Camera className="w-8 h-8 animate-pulse" />
                  </div>
                  <p className="text-sm text-slate-300 font-medium max-w-xs">
                    {cameraError || 'Requesting camera permissions for Google Lens visual scanning...'}
                  </p>
                  <button
                    onClick={startCamera}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30 transition-all"
                  >
                    Allow Camera Access
                  </button>
                </div>
              )}
            </>
          )}

          {/* 2. Upload QR Image View */}
          {mode === 'upload' && (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
              <label className="w-full h-full max-h-72 border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors bg-cyan-500/5 p-6 group">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 group-hover:scale-110 flex items-center justify-center text-cyan-400 transition-transform mb-4">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <h4 className="text-base font-semibold text-white mb-1">
                  Upload or Drop QR Code
                </h4>
                <p className="text-xs text-slate-400 max-w-xs mb-4">
                  Supports PNG, JPG, WEBP screenshots or photos of physical QR stickers
                </p>
                <span className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500 text-slate-950 hover:bg-cyan-400">
                  Select File
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          )}

          {/* 3. Demo Mode Simulated Scanner */}
          {mode === 'demo' && (
            <div className="w-full h-full relative flex flex-col items-center justify-between p-6 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900">
              <div className="w-full flex items-center justify-between text-xs text-cyan-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  OPTICAL_LENS_READY
                </span>
                <span>RES: 4K_UHD</span>
              </div>

              {/* Simulated target in center */}
              <div className="flex flex-col items-center space-y-4 my-auto">
                <div className="relative w-36 h-36 rounded-2xl bg-white p-3 shadow-2xl flex items-center justify-center">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://lensvault.app/v/nebula-keynote-2026"
                    alt="Demo Vault QR"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 border-2 border-cyan-400/80 rounded-2xl animate-pulse" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-cyan-300">Simulated Vault QR Tag</p>
                  <p className="text-[11px] text-slate-400">Tap below to trigger visual optical lock</p>
                </div>
              </div>

              {/* Quick Select Demo Vaults */}
              <div className="w-full grid grid-cols-2 gap-2">
                {vaults.slice(0, 2).map((v) => (
                  <button
                    key={v.id}
                    onClick={() => handleDetectedQR(v.slug)}
                    className="p-2.5 rounded-xl text-left bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/40 transition-all text-xs group"
                  >
                    <div className="font-semibold text-slate-200 group-hover:text-cyan-300 truncate">
                      {v.title}
                    </div>
                    <div className="text-[10px] text-slate-400">PIN: {v.raw_pin}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Futuristic Google Lens HUD Overlay */}
          <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
            
            {/* Top HUD Markers */}
            <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400/80">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>LENS_SCANNER // v2.6</span>
              </div>
              <div className="bg-slate-900/80 px-2 py-0.5 rounded border border-cyan-500/30">
                {scanning ? 'SEEKING_TARGET...' : 'LOCK_ACQUIRED'}
              </div>
            </div>

            {/* Center Google Lens Reticle Box with Animated Corners */}
            <div className="relative w-64 h-64 mx-auto my-auto flex items-center justify-center">
              
              {/* Corner Brackets */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-cyan-400 rounded-tl-xl shadow-glow-cyan" />
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-cyan-400 rounded-tr-xl shadow-glow-cyan" />
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-cyan-400 rounded-bl-xl shadow-glow-cyan" />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-cyan-400 rounded-br-xl shadow-glow-cyan" />

              {/* Optical Reticle Center Dot & Crosshair */}
              <div className="w-12 h-12 rounded-full border border-cyan-400/40 flex items-center justify-center animate-reticle-rotate">
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-glow-cyan" />
              </div>

              {/* Sweeping Laser Line when scanning */}
              {scanning && <div className="scanner-laser" />}
            </div>

            {/* Bottom Status Info */}
            <div className="text-center font-mono text-[11px] text-slate-400">
              {scanning ? (
                <span className="text-cyan-300">Align QR code within the optical viewfinder</span>
              ) : (
                <span className="text-emerald-400 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Target Identified &bull; Decrypted Link
                </span>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Target Result Modal Banner (When Scanned) */}
      {matchedVault && (
        <div className="w-full max-w-lg mt-6 p-4 rounded-2xl glass-card border border-cyan-400/50 shadow-2xl animate-fade-in">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden relative flex-shrink-0 border border-white/20">
                <img
                  src={matchedVault.cover_image || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400'}
                  alt={matchedVault.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    PIN PROTECTED
                  </span>
                  <span className="text-xs text-slate-400">
                    {matchedVault.media_count || 8} items
                  </span>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-white line-clamp-1 mt-0.5">
                  {matchedVault.title}
                </h3>
              </div>
            </div>

            <button
              onClick={() => navigateToVault(matchedVault.slug)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-glow-cyan transition-all hover:scale-105"
            >
              <span>Enter Vault</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-cyan-400" /> Enter 4-Digit PIN to unlock
            </span>
            <span className="text-[11px] font-mono text-cyan-300">
              Hint PIN: {matchedVault.raw_pin || '1337'}
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
