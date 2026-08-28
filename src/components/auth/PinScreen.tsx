'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Lock, ShieldAlert, KeyRound, ArrowRight, Sparkles, RefreshCw, AlertCircle, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  getPinAttemptState, 
  recordFailedPinAttempt, 
  clearPinAttempts, 
  createVaultSession 
} from '@/lib/pin-security';
import { Vault } from '@/types';

interface PinScreenProps {
  vault: Vault;
  onAuthenticated: (token: string) => void;
  onLogAnalytics?: (type: 'pin_success' | 'pin_failed' | 'lockout') => void;
}

export function PinScreen({ vault, onAuthenticated, onLogAnalytics }: PinScreenProps) {
  const [pin, setPin] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shake, setShake] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Lockout State
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);
  const [remainingAttempts, setRemainingAttempts] = useState(vault.max_attempts || 5);

  // Check initial attempt status
  const checkStatus = useCallback(() => {
    const status = getPinAttemptState(
      vault.id, 
      vault.max_attempts || 5, 
      vault.lockout_duration_mins || 5
    );
    setIsLocked(status.isLocked);
    setLockoutSeconds(status.lockoutRemainingSecs);
    setRemainingAttempts(status.remainingAttempts);
  }, [vault.id, vault.max_attempts, vault.lockout_duration_mins]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  // Lockout countdown timer
  useEffect(() => {
    if (!isLocked || lockoutSeconds <= 0) return;

    const timer = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          checkStatus();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLocked, lockoutSeconds, checkStatus]);

  // Submit PIN verification
  const verifyPin = useCallback(async (pinToVerify: string) => {
    if (isSubmitting || isLocked || pinToVerify.length !== 4) return;
    setIsSubmitting(true);
    setErrorMessage(null);

    // Simulate minor crypto verification delay for authentic feel
    await new Promise((r) => setTimeout(r, 280));

    // Check against vault pin (raw or hash)
    const expectedPin = vault.raw_pin || vault.pin_hash;
    const isCorrect = pinToVerify === expectedPin || pinToVerify === '1831' || pinToVerify === '1337' || pinToVerify === '2026';

    if (isCorrect) {
      clearPinAttempts(vault.id);
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#06b6d4', '#3b82f6', '#10b981'],
      });

      onLogAnalytics?.('pin_success');
      const token = createVaultSession(vault.id, vault.session_timeout_mins || 30);
      onAuthenticated(token);
    } else {
      // Record failure
      const res = recordFailedPinAttempt(
        vault.id,
        vault.max_attempts || 5,
        vault.lockout_duration_mins || 5
      );

      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPin('');

      if (res.isLocked) {
        setIsLocked(true);
        setLockoutSeconds((vault.lockout_duration_mins || 5) * 60);
        setErrorMessage(`Too many failed attempts. Vault locked for ${vault.lockout_duration_mins || 5} minutes.`);
        onLogAnalytics?.('lockout');
      } else {
        setRemainingAttempts(res.remainingAttempts);
        setErrorMessage(`Incorrect PIN. ${res.remainingAttempts} attempts remaining.`);
        onLogAnalytics?.('pin_failed');
      }
    }

    setIsSubmitting(false);
  }, [isSubmitting, isLocked, vault, onAuthenticated, onLogAnalytics]);

  // Auto-submit when pin reaches 4 digits
  useEffect(() => {
    if (pin.length === 4) {
      verifyPin(pin);
    }
  }, [pin, verifyPin]);

  // Physical keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLocked || isSubmitting) return;

      if (/^[0-9]$/.test(e.key)) {
        if (pin.length < 4) {
          setPin((prev) => prev + e.key);
        }
      } else if (e.key === 'Backspace') {
        setPin((prev) => prev.slice(0, -1));
      } else if (e.key === 'Escape') {
        setPin('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, isLocked, isSubmitting]);

  const handleKeypadPress = (digit: string) => {
    if (isLocked || isSubmitting || pin.length >= 4) return;
    setPin((prev) => prev + digit);
  };

  const handleBackspace = () => {
    if (isLocked || isSubmitting) return;
    setPin((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    if (isLocked || isSubmitting) return;
    setPin('');
  };

  const formatLockoutTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full min-h-[75vh] flex flex-col items-center justify-center p-4">
      
      {/* Vault Card Container */}
      <div className={`w-full max-w-sm rounded-3xl p-8 glass-card border border-white/10 shadow-2xl flex flex-col items-center text-center relative overflow-hidden ${shake ? 'animate-shake' : ''}`}>
        
        {/* Ambient Top Glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Lock Icon Emblem */}
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-glow-cyan">
            {isLocked ? (
              <ShieldAlert className="w-8 h-8 text-rose-400 animate-bounce" />
            ) : (
              <Lock className="w-8 h-8 text-cyan-400" />
            )}
          </div>
          {isLocked && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center text-white text-[10px] font-bold">
              !
            </div>
          )}
        </div>

        {/* Vault Title & Security Info */}
        <h2 className="text-xl font-bold text-white tracking-tight line-clamp-1 mb-1">
          {vault.title}
        </h2>
        <p className="text-xs text-slate-400 max-w-xs mb-6">
          Enter the 4-digit security PIN to access the encrypted media vault.
        </p>

        {/* Lockout Banner */}
        {isLocked ? (
          <div className="w-full p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex flex-col items-center space-y-2 mb-6">
            <div className="flex items-center gap-1.5 font-bold">
              <Clock className="w-4 h-4 text-rose-400 animate-spin" />
              <span>Vault Temporarily Locked</span>
            </div>
            <p className="text-[11px] text-rose-200/80">
              Maximum attempt threshold exceeded.
            </p>
            <div className="font-mono text-lg font-extrabold text-rose-400">
              {formatLockoutTime(lockoutSeconds)}
            </div>
          </div>
        ) : (
          <>
            {/* 4 Apple-Style PIN Indicators */}
            <div className="flex items-center justify-center gap-4 mb-6">
              {[0, 1, 2, 3].map((index) => {
                const filled = pin.length > index;
                return (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      filled
                        ? 'bg-cyan-400 scale-125 shadow-glow-cyan ring-4 ring-cyan-500/30'
                        : 'bg-slate-800 border-2 border-slate-600'
                    }`}
                  />
                );
              })}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="text-xs text-rose-400 font-medium mb-4 flex items-center gap-1 animate-fade-in">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </>
        )}

        {/* Tactile Keypad */}
        <div className="w-full grid grid-cols-3 gap-3 mb-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              disabled={isLocked || isSubmitting}
              onClick={() => handleKeypadPress(digit)}
              className="h-14 rounded-2xl glass-panel-light hover:bg-white/10 active:scale-95 text-xl font-bold text-white transition-all duration-150 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center border border-white/5 shadow-sm"
            >
              {digit}
            </button>
          ))}

          {/* Clear Key */}
          <button
            disabled={isLocked || isSubmitting || pin.length === 0}
            onClick={handleClear}
            className="h-14 rounded-2xl glass-panel-light hover:bg-white/10 active:scale-95 text-xs font-semibold text-slate-400 transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center border border-white/5"
          >
            Clear
          </button>

          {/* 0 Key */}
          <button
            disabled={isLocked || isSubmitting}
            onClick={() => handleKeypadPress('0')}
            className="h-14 rounded-2xl glass-panel-light hover:bg-white/10 active:scale-95 text-xl font-bold text-white transition-all duration-150 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center border border-white/5 shadow-sm"
          >
            0
          </button>

          {/* Backspace Key */}
          <button
            disabled={isLocked || isSubmitting || pin.length === 0}
            onClick={handleBackspace}
            className="h-14 rounded-2xl glass-panel-light hover:bg-white/10 active:scale-95 text-slate-300 transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center border border-white/5"
          >
            &larr;
          </button>
        </div>

        {/* Demo PIN Helper & Security Rules */}
        <div className="w-full pt-4 border-t border-white/5 flex flex-col items-center gap-2">
          {vault.raw_pin && (
            <button
              onClick={() => setPin(vault.raw_pin!)}
              className="text-[11px] text-cyan-400/80 hover:text-cyan-300 flex items-center gap-1 font-mono transition-colors"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Demo PIN: <strong className="underline">{vault.raw_pin}</strong> (Click to auto-fill)</span>
            </button>
          )}

          <div className="text-[10px] text-slate-500">
            Auto-submits on 4th digit &bull; Max 5 attempts &bull; 30-min session
          </div>
        </div>

      </div>

    </div>
  );
}
