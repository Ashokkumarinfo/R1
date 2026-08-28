'use client';

import { useState, useEffect, useCallback } from 'react';
import { Vault, MediaItem, Folder, AnalyticsEvent, StorageBreakdown, DeviceType, EventType } from '@/types';
import { INITIAL_VAULTS, INITIAL_MEDIA, INITIAL_FOLDERS, INITIAL_ANALYTICS } from '../seed-data';
import { supabase, isSupabaseConfigured } from '../supabase/client';

const VAULTS_KEY = 'lensvault_vaults_v3';
const MEDIA_KEY = 'lensvault_media_v3';
const FOLDERS_KEY = 'lensvault_folders_v3';
const ANALYTICS_KEY = 'lensvault_analytics_v3';

// BroadcastChannel for instant cross-tab real-time sync
const syncChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('lensvault_realtime_sync')
  : null;

// Global memory state for instantaneous access
let memoryVaults: Vault[] = [];
let memoryMedia: MediaItem[] = [];
let memoryFolders: Folder[] = [];
let memoryAnalytics: AnalyticsEvent[] = [];

// Initialize memory state from localStorage or seed
function initMemoryState() {
  if (typeof window === 'undefined') {
    memoryVaults = INITIAL_VAULTS;
    memoryMedia = INITIAL_MEDIA;
    memoryFolders = INITIAL_FOLDERS;
    memoryAnalytics = INITIAL_ANALYTICS;
    return;
  }

  try {
    const rawV = localStorage.getItem(VAULTS_KEY);
    memoryVaults = rawV ? JSON.parse(rawV) : INITIAL_VAULTS;
    if (!rawV) localStorage.setItem(VAULTS_KEY, JSON.stringify(INITIAL_VAULTS));

    const rawM = localStorage.getItem(MEDIA_KEY);
    memoryMedia = rawM ? JSON.parse(rawM) : INITIAL_MEDIA;
    if (!rawM) localStorage.setItem(MEDIA_KEY, JSON.stringify(INITIAL_MEDIA));

    const rawF = localStorage.getItem(FOLDERS_KEY);
    memoryFolders = rawF ? JSON.parse(rawF) : INITIAL_FOLDERS;
    if (!rawF) localStorage.setItem(FOLDERS_KEY, JSON.stringify(INITIAL_FOLDERS));

    const rawA = localStorage.getItem(ANALYTICS_KEY);
    memoryAnalytics = rawA ? JSON.parse(rawA) : INITIAL_ANALYTICS;
    if (!rawA) localStorage.setItem(ANALYTICS_KEY, JSON.stringify(INITIAL_ANALYTICS));
  } catch (e) {
    console.error('Error initializing LensVault local storage', e);
    memoryVaults = INITIAL_VAULTS;
    memoryMedia = INITIAL_MEDIA;
    memoryFolders = INITIAL_FOLDERS;
    memoryAnalytics = INITIAL_ANALYTICS;
  }
}

// Call once on module load
initMemoryState();

// Save helpers
function persistState() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(VAULTS_KEY, JSON.stringify(memoryVaults));
    localStorage.setItem(MEDIA_KEY, JSON.stringify(memoryMedia));
    localStorage.setItem(FOLDERS_KEY, JSON.stringify(memoryFolders));
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(memoryAnalytics));
  } catch (e) {
    console.error('Failed persisting state to localStorage', e);
  }
}

function broadcastUpdate(type: string, payload?: any) {
  if (syncChannel) {
    syncChannel.postMessage({ type, payload, timestamp: Date.now() });
  }
}

// Store Hook
export function useVaultStore() {
  const [vaults, setVaults] = useState<Vault[]>(memoryVaults);
  const [media, setMedia] = useState<MediaItem[]>(memoryMedia);
  const [folders, setFolders] = useState<Folder[]>(memoryFolders);
  const [analytics, setAnalytics] = useState<AnalyticsEvent[]>(memoryAnalytics);
  const [isLiveSupabase, setIsLiveSupabase] = useState(isSupabaseConfigured);

  // Sync state from memory
  const refreshFromMemory = useCallback(() => {
    initMemoryState();
    setVaults([...memoryVaults]);
    setMedia([...memoryMedia]);
    setFolders([...memoryFolders]);
    setAnalytics([...memoryAnalytics]);
  }, []);

  // Listen for local BroadcastChannel messages & storage events
  useEffect(() => {
    refreshFromMemory();

    const handleBroadcast = (event: MessageEvent) => {
      // Reload on real-time update
      refreshFromMemory();
    };

    if (syncChannel) {
      syncChannel.addEventListener('message', handleBroadcast);
    }

    const handleStorage = (e: StorageEvent) => {
      if (
        e.key === VAULTS_KEY ||
        e.key === MEDIA_KEY ||
        e.key === FOLDERS_KEY ||
        e.key === ANALYTICS_KEY
      ) {
        refreshFromMemory();
      }
    };

    window.addEventListener('storage', handleStorage);

    // Supabase Realtime channel setup if configured
    let supabaseChannel: any = null;
    if (isSupabaseConfigured && supabase) {
      supabaseChannel = supabase
        .channel('public:lensvault')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'media' }, () => {
          refreshFromMemory();
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'vaults' }, () => {
          refreshFromMemory();
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'folders' }, () => {
          refreshFromMemory();
        })
        .subscribe();
    }

    return () => {
      if (syncChannel) syncChannel.removeEventListener('message', handleBroadcast);
      window.removeEventListener('storage', handleStorage);
      if (supabaseChannel && supabase) supabase.removeChannel(supabaseChannel);
    };
  }, [refreshFromMemory]);

  // Vault Actions
  const addVault = useCallback((newVaultData: Partial<Vault> & { title: string; pin_hash: string; raw_pin: string }): Vault => {
    const id = `vault-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const slug = newVaultData.slug || newVaultData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `vault-${id}`;

    const newVault: Vault = {
      id,
      slug,
      title: newVaultData.title,
      description: newVaultData.description || '',
      pin_hash: newVaultData.pin_hash,
      raw_pin: newVaultData.raw_pin,
      is_active: newVaultData.is_active ?? true,
      download_enabled: newVaultData.download_enabled ?? true,
      max_attempts: newVaultData.max_attempts || 5,
      lockout_duration_mins: newVaultData.lockout_duration_mins || 5,
      session_timeout_mins: newVaultData.session_timeout_mins || 30,
      cover_image: newVaultData.cover_image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
      created_at: new Date().toISOString(),
      theme: newVaultData.theme || { primaryColor: '#06b6d4', accentGlow: 'cyan', cardStyle: 'glass' },
      media_count: 0,
      total_storage_bytes: 0,
    };

    memoryVaults = [newVault, ...memoryVaults];
    persistState();
    broadcastUpdate('VAULT_CREATED', newVault);
    refreshFromMemory();
    return newVault;
  }, [refreshFromMemory]);

  const updateVault = useCallback((id: string, updates: Partial<Vault>) => {
    memoryVaults = memoryVaults.map(v => (v.id === id ? { ...v, ...updates } : v));
    persistState();
    broadcastUpdate('VAULT_UPDATED', { id, updates });
    refreshFromMemory();
  }, [refreshFromMemory]);

  const deleteVault = useCallback((id: string) => {
    memoryVaults = memoryVaults.filter(v => v.id !== id);
    memoryMedia = memoryMedia.filter(m => m.vault_id !== id);
    memoryFolders = memoryFolders.filter(f => f.vault_id !== id);
    memoryAnalytics = memoryAnalytics.filter(a => a.vault_id !== id);
    persistState();
    broadcastUpdate('VAULT_DELETED', { id });
    refreshFromMemory();
  }, [refreshFromMemory]);

  // Media Actions
  const addMedia = useCallback((mediaItem: Omit<MediaItem, 'id' | 'created_at'>): MediaItem => {
    const id = `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newMedia: MediaItem = {
      ...mediaItem,
      id,
      created_at: new Date().toISOString(),
    };

    memoryMedia = [newMedia, ...memoryMedia];

    // Update vault totals
    const vault = memoryVaults.find(v => v.id === newMedia.vault_id);
    if (vault) {
      vault.media_count = (vault.media_count || 0) + 1;
      vault.total_storage_bytes = (vault.total_storage_bytes || 0) + newMedia.size;
    }

    persistState();
    broadcastUpdate('MEDIA_ADDED', newMedia);
    refreshFromMemory();
    return newMedia;
  }, [refreshFromMemory]);

  const updateMedia = useCallback((id: string, updates: Partial<MediaItem>) => {
    memoryMedia = memoryMedia.map(m => (m.id === id ? { ...m, ...updates, updated_at: new Date().toISOString() } : m));
    persistState();
    broadcastUpdate('MEDIA_UPDATED', { id, updates });
    refreshFromMemory();
  }, [refreshFromMemory]);

  const deleteMedia = useCallback((id: string) => {
    const itemToDelete = memoryMedia.find(m => m.id === id);
    if (itemToDelete) {
      const vault = memoryVaults.find(v => v.id === itemToDelete.vault_id);
      if (vault) {
        vault.media_count = Math.max(0, (vault.media_count || 1) - 1);
        vault.total_storage_bytes = Math.max(0, (vault.total_storage_bytes || itemToDelete.size) - itemToDelete.size);
      }
    }

    memoryMedia = memoryMedia.filter(m => m.id !== id);
    persistState();
    broadcastUpdate('MEDIA_DELETED', { id });
    refreshFromMemory();
  }, [refreshFromMemory]);

  const moveMediaToFolder = useCallback((mediaId: string, folderId: string | null) => {
    memoryMedia = memoryMedia.map(m => (m.id === mediaId ? { ...m, folder_id: folderId } : m));
    persistState();
    broadcastUpdate('MEDIA_MOVED', { mediaId, folderId });
    refreshFromMemory();
  }, [refreshFromMemory]);

  // Folder Actions
  const addFolder = useCallback((vaultId: string, name: string, color = '#3b82f6'): Folder => {
    const newFolder: Folder = {
      id: `folder-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      vault_id: vaultId,
      name,
      color,
      created_at: new Date().toISOString(),
    };

    memoryFolders = [...memoryFolders, newFolder];
    persistState();
    broadcastUpdate('FOLDER_CREATED', newFolder);
    refreshFromMemory();
    return newFolder;
  }, [refreshFromMemory]);

  const deleteFolder = useCallback((folderId: string) => {
    // Unassign media in folder
    memoryMedia = memoryMedia.map(m => (m.folder_id === folderId ? { ...m, folder_id: null } : m));
    memoryFolders = memoryFolders.filter(f => f.id !== folderId);
    persistState();
    broadcastUpdate('FOLDER_DELETED', { folderId });
    refreshFromMemory();
  }, [refreshFromMemory]);

  // Analytics Actions
  const logAnalytics = useCallback((
    vaultId: string,
    eventType: EventType,
    extra?: { mediaId?: string; deviceType?: DeviceType }
  ) => {
    const isMobile = typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isTablet = typeof window !== 'undefined' && /(iPad)|(tablet)|(PlayBook)|(Silk)|(Android(?!.*Mobile))/i.test(navigator.userAgent);
    const detectedDevice: DeviceType = extra?.deviceType || (isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop');

    const newEvent: AnalyticsEvent = {
      id: `ev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      vault_id: vaultId,
      event_type: eventType,
      device_type: detectedDevice,
      browser: typeof navigator !== 'undefined' ? navigator.userAgent.split(' ')[0] : 'Browser',
      os: typeof navigator !== 'undefined' ? (navigator.userAgent.includes('Mac') ? 'macOS' : navigator.userAgent.includes('Windows') ? 'Windows' : 'Mobile OS') : 'Unknown',
      country: 'Global Visitor',
      city: 'Online',
      media_id: extra?.mediaId,
      created_at: new Date().toISOString(),
    };

    memoryAnalytics = [newEvent, ...memoryAnalytics];
    persistState();
    broadcastUpdate('ANALYTICS_LOGGED', newEvent);
    refreshFromMemory();
  }, [refreshFromMemory]);

  // Reset to default seed
  const resetToSeed = useCallback(() => {
    localStorage.removeItem(VAULTS_KEY);
    localStorage.removeItem(MEDIA_KEY);
    localStorage.removeItem(FOLDERS_KEY);
    localStorage.removeItem(ANALYTICS_KEY);
    initMemoryState();
    broadcastUpdate('STORE_RESET');
    refreshFromMemory();
  }, [refreshFromMemory]);

  // Computed helper
  const getStorageBreakdown = useCallback((vaultId?: string): StorageBreakdown => {
    const filteredMedia = vaultId ? memoryMedia.filter(m => m.vault_id === vaultId) : memoryMedia;
    let images = 0;
    let videos = 0;
    let audio = 0;
    let documents = 0;

    for (const item of filteredMedia) {
      if (item.media_type === 'image') images += item.size;
      else if (item.media_type === 'video') videos += item.size;
      else if (item.media_type === 'audio') audio += item.size;
      else documents += item.size;
    }

    return {
      total: images + videos + audio + documents,
      images,
      videos,
      audio,
      documents,
      quota: 5 * 1024 * 1024 * 1024, // 5 GB
    };
  }, []);

  return {
    vaults,
    media,
    folders,
    analytics,
    isLiveSupabase,
    addVault,
    updateVault,
    deleteVault,
    addMedia,
    updateMedia,
    deleteMedia,
    moveMediaToFolder,
    addFolder,
    deleteFolder,
    logAnalytics,
    resetToSeed,
    getStorageBreakdown,
    refreshFromMemory,
  };
}
