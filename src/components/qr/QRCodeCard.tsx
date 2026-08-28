'use client';

import React, { useState, useRef } from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { Download, Share2, Copy, Check, Sparkles, Printer, Sliders, Eye } from 'lucide-react';
import { Vault } from '@/types';

interface QRCodeCardProps {
  vault: Vault;
  baseUrl?: string;
}

export function QRCodeCard({ vault, baseUrl }: QRCodeCardProps) {
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [includeMargin, setIncludeMargin] = useState(true);
  const [copied, setCopied] = useState(false);

  const canvasRef = useRef<HTMLDivElement | null>(null);

  // Compute absolute vault URL
  const origin = typeof window !== 'undefined' ? window.location.origin : (baseUrl || 'https://lensvault.app');
  const vaultUrl = `${origin}/v/${vault.slug}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(vaultUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download High-Resolution PNG
  const downloadPNG = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current.querySelector('canvas');
    if (!canvas) return;

    const pngUrl = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `LensVault_${vault.slug}_QR.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Download SVG
  const downloadSVG = () => {
    const svg = document.getElementById(`qr-svg-${vault.id}`);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `LensVault_${vault.slug}_QR.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Print Tent-Card Sheet
  const printSheet = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl glass-card border border-white/10 shadow-2xl flex flex-col items-center text-center">
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
          QR Studio
        </span>
        <span className="text-xs text-slate-400">Dynamic Scan Tag</span>
      </div>

      <h3 className="text-lg font-bold text-white mb-1">
        {vault.title}
      </h3>
      <p className="text-xs text-slate-400 mb-6">
        Scan with any mobile camera or Google Lens to unlock vault.
      </p>

      {/* QR Code Presentation Box */}
      <div className="relative p-5 rounded-2xl bg-white shadow-2xl mb-6 group">
        <div ref={canvasRef} className="hidden">
          <QRCodeCanvas
            value={vaultUrl}
            size={1024}
            fgColor={fgColor}
            bgColor={bgColor}
            level="H"
            includeMargin={includeMargin}
          />
        </div>

        <QRCodeSVG
          id={`qr-svg-${vault.id}`}
          value={vaultUrl}
          size={200}
          fgColor={fgColor}
          bgColor={bgColor}
          level="H"
          includeMargin={includeMargin}
          className="rounded-lg"
        />

        <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/0 group-hover:border-cyan-400/80 transition-colors pointer-events-none" />
      </div>

      {/* Vault Direct Link Copier */}
      <div className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-900/80 border border-white/10 text-xs mb-6">
        <span className="text-slate-400 font-mono truncate max-w-[220px] px-2 text-left">
          {vaultUrl}
        </span>
        <button
          onClick={copyUrl}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Customization Palette */}
      <div className="w-full flex items-center justify-between p-3 rounded-xl glass-panel border border-white/10 mb-6 text-xs text-slate-300">
        <span className="font-semibold flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Color Accent
        </span>
        <div className="flex items-center gap-2">
          {['#000000', '#06b6d4', '#3b82f6', '#8b5cf6', '#f43f5e'].map((color) => (
            <button
              key={color}
              onClick={() => setFgColor(color)}
              style={{ backgroundColor: color }}
              className={`w-6 h-6 rounded-full border-2 transition-transform ${
                fgColor === color ? 'scale-125 border-white shadow-md' : 'border-transparent'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Export Action Buttons */}
      <div className="w-full grid grid-cols-3 gap-2">
        <button
          onClick={downloadPNG}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all"
        >
          <Download className="w-3.5 h-3.5 text-cyan-400" />
          <span>PNG</span>
        </button>

        <button
          onClick={downloadSVG}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all"
        >
          <Download className="w-3.5 h-3.5 text-blue-400" />
          <span>SVG</span>
        </button>

        <button
          onClick={printSheet}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-all"
        >
          <Printer className="w-3.5 h-3.5 text-purple-400" />
          <span>Print</span>
        </button>
      </div>

      {/* PIN Security Hint Pill */}
      <div className="mt-4 pt-4 border-t border-white/5 text-[11px] text-slate-400">
        PIN Code: <strong className="text-cyan-300 font-mono">{vault.raw_pin || '1337'}</strong> (Protected)
      </div>

    </div>
  );
}
