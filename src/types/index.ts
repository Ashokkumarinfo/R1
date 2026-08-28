export type MediaType = 'image' | 'video' | 'audio' | 'document';

export interface MediaMetadata {
  width?: number;
  height?: number;
  duration?: number; // seconds
  artist?: string;
  album?: string;
  pages?: number;
  camera?: string;
  location?: string;
}

export interface MediaItem {
  id: string;
  vault_id: string;
  folder_id?: string | null;
  name: string;
  original_name: string;
  url: string;
  thumbnail_url?: string;
  media_type: MediaType;
  mime_type: string;
  size: number; // in bytes
  created_at: string;
  updated_at?: string;
  tags?: string[];
  metadata?: MediaMetadata;
}

export interface Folder {
  id: string;
  vault_id: string;
  name: string;
  parent_id?: string | null;
  color?: string;
  created_at: string;
}

export interface VaultTheme {
  primaryColor?: string;
  accentGlow?: string;
  cardStyle?: 'glass' | 'solid' | 'minimal';
  heroBanner?: string;
}

export interface Vault {
  id: string;
  slug: string;
  title: string;
  description?: string;
  pin_hash: string; // SHA-256 or bcrypt hash
  raw_pin?: string; // only for admin UI convenience/demo
  is_active: boolean;
  download_enabled: boolean;
  max_attempts: number;
  lockout_duration_mins: number;
  session_timeout_mins: number;
  expires_at?: string | null;
  created_at: string;
  cover_image?: string;
  theme?: VaultTheme;
  media_count?: number;
  total_storage_bytes?: number;
}

export type EventType =
  | 'scan'
  | 'link_open'
  | 'pin_success'
  | 'pin_failed'
  | 'media_view'
  | 'media_download'
  | 'lockout';

export type DeviceType = 'mobile' | 'desktop' | 'tablet';

export interface AnalyticsEvent {
  id: string;
  vault_id: string;
  event_type: EventType;
  device_type: DeviceType;
  browser?: string;
  os?: string;
  country?: string;
  city?: string;
  user_agent?: string;
  media_id?: string;
  created_at: string;
}

export interface VaultSession {
  id: string;
  vault_id: string;
  session_token: string;
  expires_at: string;
  created_at: string;
  last_active_at: string;
}

export interface PinValidationResult {
  success: boolean;
  sessionToken?: string;
  error?: string;
  remainingAttempts?: number;
  lockoutUntil?: number | null; // epoch ms
}

export interface StorageBreakdown {
  total: number;
  images: number;
  videos: number;
  audio: number;
  documents: number;
  quota: number; // e.g. 5GB or 10GB
}
