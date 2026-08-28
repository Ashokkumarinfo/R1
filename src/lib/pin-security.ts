import { PinValidationResult } from '@/types';

// SHA-256 helper for client & server
export async function hashPin(pin: string): Promise<string> {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(pin);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback simple hash for non-crypto environments
  let hash = 0;
  for (let i = 0; i < pin.length; i++) {
    const char = pin.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'hash_' + Math.abs(hash).toString(16);
}

const ATTEMPTS_STORAGE_KEY_PREFIX = 'lensvault_attempts_';
const SESSION_STORAGE_KEY_PREFIX = 'lensvault_session_';

interface AttemptData {
  failedAttempts: number;
  lockoutUntil: number | null; // ms timestamp
}

export function getPinAttemptState(vaultId: string, maxAttempts = 5, lockoutDurationMins = 5): {
  isLocked: boolean;
  lockoutRemainingSecs: number;
  remainingAttempts: number;
  failedAttempts: number;
} {
  if (typeof window === 'undefined') {
    return { isLocked: false, lockoutRemainingSecs: 0, remainingAttempts: maxAttempts, failedAttempts: 0 };
  }

  try {
    const raw = localStorage.getItem(`${ATTEMPTS_STORAGE_KEY_PREFIX}${vaultId}`);
    if (!raw) {
      return { isLocked: false, lockoutRemainingSecs: 0, remainingAttempts: maxAttempts, failedAttempts: 0 };
    }

    const data: AttemptData = JSON.parse(raw);
    const now = Date.now();

    if (data.lockoutUntil && data.lockoutUntil > now) {
      const remainingSecs = Math.ceil((data.lockoutUntil - now) / 1000);
      return {
        isLocked: true,
        lockoutRemainingSecs: remainingSecs,
        remainingAttempts: 0,
        failedAttempts: data.failedAttempts,
      };
    }

    // Lockout expired, reset attempts
    if (data.lockoutUntil && data.lockoutUntil <= now) {
      clearPinAttempts(vaultId);
      return { isLocked: false, lockoutRemainingSecs: 0, remainingAttempts: maxAttempts, failedAttempts: 0 };
    }

    const remaining = Math.max(0, maxAttempts - data.failedAttempts);
    return {
      isLocked: false,
      lockoutRemainingSecs: 0,
      remainingAttempts: remaining,
      failedAttempts: data.failedAttempts,
    };
  } catch {
    return { isLocked: false, lockoutRemainingSecs: 0, remainingAttempts: maxAttempts, failedAttempts: 0 };
  }
}

export function recordFailedPinAttempt(
  vaultId: string,
  maxAttempts = 5,
  lockoutDurationMins = 5
): { isLocked: boolean; lockoutUntil: number | null; remainingAttempts: number } {
  if (typeof window === 'undefined') {
    return { isLocked: false, lockoutUntil: null, remainingAttempts: maxAttempts - 1 };
  }

  try {
    const current = getPinAttemptState(vaultId, maxAttempts, lockoutDurationMins);
    const newFailedCount = current.failedAttempts + 1;
    let lockoutUntil: number | null = null;
    let isLocked = false;

    if (newFailedCount >= maxAttempts) {
      lockoutUntil = Date.now() + lockoutDurationMins * 60 * 1000;
      isLocked = true;
    }

    const data: AttemptData = {
      failedAttempts: newFailedCount,
      lockoutUntil,
    };

    localStorage.setItem(`${ATTEMPTS_STORAGE_KEY_PREFIX}${vaultId}`, JSON.stringify(data));

    return {
      isLocked,
      lockoutUntil,
      remainingAttempts: Math.max(0, maxAttempts - newFailedCount),
    };
  } catch {
    return { isLocked: false, lockoutUntil: null, remainingAttempts: 1 };
  }
}

export function clearPinAttempts(vaultId: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(`${ATTEMPTS_STORAGE_KEY_PREFIX}${vaultId}`);
  } catch (e) {
    console.error('Failed to clear pin attempts', e);
  }
}

// Session Token Management (30-Minute Inactivity Window)
export function createVaultSession(vaultId: string, timeoutMins = 30): string {
  const token = `lv_${vaultId}_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
  const expiresAt = Date.now() + timeoutMins * 60 * 1000;

  if (typeof window !== 'undefined') {
    sessionStorage.setItem(`${SESSION_STORAGE_KEY_PREFIX}${vaultId}`, JSON.stringify({
      token,
      expiresAt,
      lastActive: Date.now(),
    }));
  }
  return token;
}

export function validateVaultSession(vaultId: string, timeoutMins = 30): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const raw = sessionStorage.getItem(`${SESSION_STORAGE_KEY_PREFIX}${vaultId}`);
    if (!raw) return false;

    const data = JSON.parse(raw);
    const now = Date.now();

    if (data.expiresAt < now) {
      sessionStorage.removeItem(`${SESSION_STORAGE_KEY_PREFIX}${vaultId}`);
      return false;
    }

    // Refresh rolling session timeout on activity
    data.expiresAt = now + timeoutMins * 60 * 1000;
    data.lastActive = now;
    sessionStorage.setItem(`${SESSION_STORAGE_KEY_PREFIX}${vaultId}`, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function clearVaultSession(vaultId: string): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(`${SESSION_STORAGE_KEY_PREFIX}${vaultId}`);
}
