'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Lock, Heart, KeyRound, Sparkles, AlertCircle, Clock } from 'lucide-react';
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

    // Simulate authentic verification delay
    await new Promise((r) => setTimeout(r, 250));

    // Check against vault pin (secret 1831)
    const expectedPin = vault.raw_pin || vault.pin_hash || '1831';
    const isCorrect = pinToVerify === expectedPin || pinToVerify === '1831';

    if (isCorrect) {
      clearPinAttempts(vault.id);
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#f43f5e', '#fb7185', '#d4a574', '#fbbf24'],
      });

      onLogAnalytics?.('pin_success');
      const token = createVaultSession(vault.id, vault.session_timeout_mins || 60);
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
        setErrorMessage(`Too many attempts. Locked for ${vault.lockout_duration_mins || 5} minutes.`);
        onLogAnalytics?.('lockout');
      } else {
        setRemainingAttempts(res.remainingAttempts);
        setErrorMessage(`Incorrect code. ${res.remainingAttempts} attempts remaining.`);
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
      
      {/* Romantic Number Lock Card */}
      <div className={`w-full max-w-sm rounded-3xl p-8 glass-card border border-rose-500/20 shadow-2xl flex flex-col items-center text-center relative overflow-hidden ${shake ? 'animate-shake' : ''}`}>
        
        {/* Ambient Warm Top Glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Lock Icon Emblem */}
        <div className="relative mb-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500/20 via-amber-500/20 to-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-300 shadow-glow-rose">
            <Heart className="w-8 h-8 fill-rose-500/40 text-rose-400 animate-heartbeat" />
          </div>
        </div>

        {/* Title & Romantic Subtitle (No PIN number mentioned) */}
        <h2 className="text-xl font-bold text-white tracking-tight line-clamp-1 mb-1 font-sans">
          Secret Number Lock
        </h2>
        <p className="text-xs text-rose-200/70 max-w-xs mb-6 font-light">
          Enter the 4-digit numeric password to unlock all photos, videos, songs & memories.
        </p>

        {/* Lockout Banner */}
        {isLocked ? (
          <div className="w-full p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex flex-col items-center space-y-2 mb-6">
            <div className="flex items-center gap-1.5 font-bold">
              <Clock className="w-4 h-4 text-rose-400 animate-spin" />
              <span>Temporarily Locked</span>
            </div>
            <p className="text-[11px] text-rose-200/80">
              Please wait before trying again.
            </p>
            <div className="font-mono text-lg font-extrabold text-rose-400">
              {formatLockoutTime(lockoutSeconds)}
            </div>
          </div>
        ) : (
          <>
            {/* 4 Glowing PIN Indicator Dots */}
            <div className="flex items-center justify-center gap-4 mb-6">
              {[0, 1, 2, 3].map((index) => {
                const filled = pin.length > index;
                return (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      filled
                        ? 'bg-gradient-to-tr from-rose-500 to-amber-400 scale-125 shadow-glow-rose ring-4 ring-rose-500/30'
                        : 'bg-[#220d16] border-2 border-rose-500/30'
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
              className="h-14 rounded-2xl bg-white/[0.04] hover:bg-rose-500/20 active:scale-95 text-xl font-bold text-white transition-all duration-150 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center border border-white/5 hover:border-rose-500/30 shadow-sm"
            >
              {digit}
            </button>
          ))}

          {/* Clear Key */}
          <button
            disabled={isLocked || isSubmitting || pin.length === 0}
            onClick={handleClear}
            className="h-14 rounded-2xl bg-white/[0.02] hover:bg-white/10 active:scale-95 text-xs font-semibold text-rose-200/60 transition-all disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center border border-white/5"
          >
            Clear
          </button>

          {/* 0 Key */}
          <button
            disabled={isLocked || isSubmitting}
            onClick={() => handleKeypadPress('0')}
            className="h-14 rounded-2xl bg-white/[0.04] hover:bg-rose-500/20 active:scale-95 text-xl font-bold text-white transition-all duration-150 disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center border border-white/5 hover:border-rose-500/30 shadow-sm"
          >
            0
          </button>

          {/* Backspace Key */}
          <button
            disabled={isLocked || isSubmitting || pin.length === 0}
            onClick={handleBackspace}
            className="h-14 rounded-2xl bg-white/[0.02] hover:bg-white/10 active:scale-95 text-rose-200/80 transition-all disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center border border-white/5"
          >
            &larr;
          </button>
        </div>

        {/* Security Footnote (Clean with no passwords written) */}
        <div className="w-full pt-4 border-t border-white/5 flex flex-col items-center text-[10px] text-rose-200/50">
          <span>Auto-submits on 4th digit &bull; Protected Memories</span>
        </div>

      </div>

    </div>
  );
}
