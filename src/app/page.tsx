'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  Film, 
  Music, 
  FileText, 
  Image as ImageIcon, 
  LayoutDashboard, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  QrCode, 
  Radio, 
  Smartphone,
  Download,
  FolderOpen,
  Copy,
  Check,
  Zap,
  KeyRound,
  Eye
} from 'lucide-react';
import { useVaultStore } from '@/lib/store/vault-store';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';

export default function HomePage() {
  const { vaults } = useVaultStore();
  const primaryVault = vaults.find(v => v.slug === 'my-vault' || v.raw_pin === '1831') || vaults[0];

  const [origin, setOrigin] = useState('http://localhost:3000');
  const [copied, setCopied] = useState(false);
  const [qrColor, setQrColor] = useState('#06b6d4');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }
  }, []);

  const vaultUrl = primaryVault ? `${origin}/v/${primaryVault.slug}` : `${origin}/v/my-vault`;

  const copyVaultUrl = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(vaultUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-20 sm:space-y-28">
      
      {/* Hero Section */}
      <section className="relative pt-4 sm:pt-10 text-center flex flex-col items-center">
        
        {/* Glow ambient background */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-6 shadow-glow-cyan">
          <KeyRound className="w-3.5 h-3.5 text-amber-300" />
          <span>Scan QR &bull; PIN-Protected Media Vault &bull; PIN: 1831</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl leading-[1.1]">
          Scan with Mobile Camera.{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Unlock with PIN 1831.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
          Scan the QR tag using your smartphone camera or Google Lens. Enter the 4-digit PIN code <strong className="text-cyan-300 font-mono">1831</strong> to instantly unlock and download your photos, 4K videos, and music files.
        </p>

        {/* Direct Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/v/my-vault"
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-glow-cyan transition-all hover:scale-105"
          >
            <ShieldCheck className="w-5 h-5 text-cyan-200" />
            <span>Open Vault (PIN: 1831)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/admin"
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold glass-panel hover:bg-white/10 text-white border border-white/15 transition-all hover:scale-105"
          >
            <LayoutDashboard className="w-4 h-4 text-blue-400" />
            <span>Admin Studio</span>
          </Link>
        </div>

      </section>

      {/* Main Dynamic QR Presentation & 5-Step Visual Flow */}
      <section className="relative w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive High-Resolution QR Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm rounded-3xl p-6 sm:p-8 glass-card border border-cyan-500/30 shadow-2xl flex flex-col items-center text-center relative">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 mb-4">
                <Smartphone className="w-3.5 h-3.5 animate-pulse" />
                <span>MOBILE_SCAN_READY</span>
              </div>

              <h3 className="text-xl font-extrabold text-white mb-1">
                Scan with Your Phone
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Point your iPhone Camera, Android Camera, or Google Lens at this QR code.
              </p>

              {/* QR Code Canvas */}
              <div className="relative p-5 rounded-2xl bg-white shadow-2xl mb-6 group flex items-center justify-center">
                <QRCodeSVG
                  value={vaultUrl}
                  size={200}
                  fgColor={qrColor}
                  bgColor="#ffffff"
                  level="H"
                  includeMargin={true}
                  className="rounded-lg"
                />
                <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/40 animate-pulse pointer-events-none" />
              </div>

              {/* Direct Link Copier */}
              <div className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-white/10 text-xs mb-4">
                <span className="text-slate-300 font-mono truncate max-w-[190px] px-2 text-left">
                  {vaultUrl}
                </span>
                <button
                  onClick={copyVaultUrl}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* PIN Info */}
              <div className="w-full pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-cyan-400" /> Security PIN:
                </span>
                <span className="font-mono text-cyan-300 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                  1831
                </span>
              </div>

            </div>
          </div>

          {/* Right: Step-by-Step Visual Workflow */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
                HOW IT WORKS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                5 Simple Steps to Unlock & Download
              </h2>
            </div>

            {/* Step 1 */}
            <div className="p-4 rounded-2xl glass-panel border border-white/10 flex items-start gap-4 hover:border-cyan-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-extrabold font-mono flex-shrink-0">
                1
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Scan QR with Mobile Camera</span>
                  <Smartphone className="w-4 h-4 text-cyan-400" />
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Open your phone's native camera app (iOS or Android) and point it at the QR code above.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl glass-panel border border-white/10 flex items-start gap-4 hover:border-cyan-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-extrabold font-mono flex-shrink-0">
                2
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Website Opens Instantly</span>
                  <Radio className="w-4 h-4 text-blue-400 animate-pulse" />
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Tap the link popup on your phone screen to open the encrypted media vault.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl glass-panel border border-white/10 flex items-start gap-4 hover:border-cyan-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-extrabold font-mono flex-shrink-0">
                3
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Enter 4-Digit Security PIN</span>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">1831</span>
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Type <strong className="text-purple-300 font-mono">1831</strong> into the tactile hardware keypad on your mobile screen.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-2xl glass-panel border border-white/10 flex items-start gap-4 hover:border-cyan-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-extrabold font-mono flex-shrink-0">
                4
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>PIN Verified & Vault Unlocked</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The system validates your 4-digit code and establishes a secure 60-minute authenticated session.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-4 rounded-2xl glass-panel border border-white/10 flex items-start gap-4 hover:border-cyan-500/40 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-extrabold font-mono flex-shrink-0">
                5
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>View, Stream & Download All Files</span>
                  <Download className="w-4 h-4 text-amber-400" />
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Stream 4K cinema videos, view high-res photos, listen to audio tracks, and tap the download button to save files directly.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Where to Put Your Files Guide */}
      <section className="rounded-3xl overflow-hidden glass-card border border-cyan-500/30 p-6 sm:p-10 shadow-2xl">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              <FolderOpen className="w-3.5 h-3.5" />
              <span>FILE_STORAGE_GUIDE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Where to Place Your Images, Audio & Video Files
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Simply place your local media files into the <code className="text-cyan-300 bg-slate-900 px-2 py-0.5 rounded">public/media</code> folders in your project:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Images */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Photos & Images</h4>
              <p className="text-xs text-slate-400 font-mono">
                public/media/images/
              </p>
              <p className="text-[11px] text-slate-500">
                Supports JPG, PNG, WEBP, GIF
              </p>
            </div>

            {/* Videos */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Film className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">4K Video Reels</h4>
              <p className="text-xs text-slate-400 font-mono">
                public/media/videos/
              </p>
              <p className="text-[11px] text-slate-500">
                Supports MP4, WEBM, MOV
              </p>
            </div>

            {/* Audio */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Music className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Audio & Music</h4>
              <p className="text-xs text-slate-400 font-mono">
                public/media/audio/
              </p>
              <p className="text-[11px] text-slate-500">
                Supports MP3, WAV, M4A, AAC
              </p>
            </div>

          </div>

          <div className="text-center pt-2">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
            >
              <span>You can also upload files directly in the Admin Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Ready-to-Test Vaults */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 font-mono">
              AVAILABLE VAULTS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Explore Authenticated Media Galleries
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Click any vault to test the 4-digit PIN lock screen and media player.
            </p>
          </div>

          <Link
            href="/admin/vaults/new"
            className="self-start sm:self-auto text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
          >
            <span>Create another vault</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vaults.map((vault) => (
            <Link
              key={vault.id}
              href={`/v/${vault.slug}`}
              className="group relative rounded-3xl overflow-hidden glass-card glass-card-hover border border-white/10 flex flex-col p-5"
            >
              {/* Cover Image Banner */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-4 bg-slate-900">
                <img
                  src={vault.cover_image}
                  alt={vault.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Security Tag */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl text-[10px] font-bold bg-slate-950/80 text-cyan-300 border border-white/10 backdrop-blur-md flex items-center gap-1">
                  <Lock className="w-3 h-3 text-cyan-400" />
                  <span>PIN: {vault.raw_pin || '1831'}</span>
                </div>

                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-lg text-[10px] font-mono bg-cyan-500 text-slate-950 font-extrabold">
                  {vault.media_count || 6} ITEMS
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mb-1">
                {vault.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                {vault.description}
              </p>

              {/* Bottom Action */}
              <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 text-[11px]">
                  <Download className="w-3 h-3 text-emerald-400" /> Downloads Enabled
                </span>
                <span className="font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Enter PIN</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>

            </Link>
          ))}
        </div>
      </section>

      {/* Admin Studio Call to Action Banner */}
      <section className="relative rounded-3xl overflow-hidden glass-card border border-cyan-500/30 p-8 sm:p-12 shadow-2xl text-center flex flex-col items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10" />
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/40">
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>ADMINISTRATOR PORTAL</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Manage Media & Export Custom QR Codes
          </h2>
          <p className="text-sm text-slate-300">
            Upload files, customize PIN codes, print tent cards for weddings or events, and monitor real-time visitor telemetry.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/admin"
              className="px-6 py-3 rounded-2xl text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow-cyan hover:scale-105 transition-all"
            >
              Open Admin Dashboard
            </Link>
            <Link
              href="/admin/qr-studio"
              className="px-6 py-3 rounded-2xl text-sm font-bold glass-panel hover:bg-white/10 text-white border border-white/10 transition-all"
            >
              Custom QR Generator
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
