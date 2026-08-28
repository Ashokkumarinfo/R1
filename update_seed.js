const fs = require('fs');
const path = require('path');

const mediaItems = JSON.parse(fs.readFileSync(path.join(__dirname, 'scratch_media.json'), 'utf8'));

const totalBytes = mediaItems.reduce((acc, item) => acc + item.size, 0);

// Find first image for cover image
const firstImage = mediaItems.find(m => m.media_type === 'image');
const coverUrl = firstImage ? firstImage.url : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop';

const seedDataContent = `import { Vault, MediaItem, Folder, AnalyticsEvent } from '@/types';

export const INITIAL_VAULTS: Vault[] = [
  {
    id: 'my-private-vault',
    slug: 'my-vault',
    title: 'My Private Media Vault',
    description: 'Personal collection of high-res photos, cinema videos, audio tracks, and chats. Protected with PIN 1831.',
    pin_hash: '1831',
    raw_pin: '1831',
    is_active: true,
    download_enabled: true,
    max_attempts: 5,
    lockout_duration_mins: 5,
    session_timeout_mins: 60,
    cover_image: ${JSON.stringify(coverUrl)},
    created_at: new Date().toISOString(),
    theme: {
      primaryColor: '#06b6d4',
      accentGlow: 'cyan',
      cardStyle: 'glass',
    },
    media_count: ${mediaItems.length},
    total_storage_bytes: ${totalBytes},
  },
  {
    id: 'nebula-v1',
    slug: 'nebula-keynote-2026',
    title: 'Project Nebula: Secret Keynotes & High-Res Assets',
    description: 'Confidential product launch footage, 4K camera stills, product design master PDFs, and ambient soundtrack.',
    pin_hash: '1831',
    raw_pin: '1831',
    is_active: true,
    download_enabled: true,
    max_attempts: 5,
    lockout_duration_mins: 5,
    session_timeout_mins: 30,
    cover_image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    theme: {
      primaryColor: '#06b6d4',
      accentGlow: 'cyan',
      cardStyle: 'glass',
    },
    media_count: 8,
    total_storage_bytes: 84500000,
  }
];

export const INITIAL_FOLDERS: Folder[] = [
  {
    id: 'folder-my-photos',
    vault_id: 'my-private-vault',
    name: 'Photos & Stills',
    color: '#06b6d4',
    created_at: new Date().toISOString(),
  },
  {
    id: 'folder-my-videos',
    vault_id: 'my-private-vault',
    name: 'Videos & Cinema',
    color: '#3b82f6',
    created_at: new Date().toISOString(),
  },
  {
    id: 'folder-my-audio',
    vault_id: 'my-private-vault',
    name: 'Songs & Audio',
    color: '#8b5cf6',
    created_at: new Date().toISOString(),
  },
  {
    id: 'folder-my-docs',
    vault_id: 'my-private-vault',
    name: 'WhatsApp Chat & Docs',
    color: '#10b981',
    created_at: new Date().toISOString(),
  },
];

export const INITIAL_MEDIA: MediaItem[] = ${JSON.stringify(mediaItems, null, 2)};

export const INITIAL_ANALYTICS: AnalyticsEvent[] = [
  {
    id: 'ev-1',
    vault_id: 'my-private-vault',
    event_type: 'scan',
    device_type: 'mobile',
    browser: 'Mobile Safari',
    os: 'iOS 18.2',
    country: 'India',
    city: 'Chennai',
    created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: 'ev-2',
    vault_id: 'my-private-vault',
    event_type: 'pin_success',
    device_type: 'mobile',
    browser: 'Mobile Safari',
    os: 'iOS 18.2',
    country: 'India',
    city: 'Chennai',
    created_at: new Date(Date.now() - 1000 * 60 * 11).toISOString(),
  }
];
`;

fs.writeFileSync(path.join(__dirname, 'src', 'lib', 'seed-data.ts'), seedDataContent, 'utf8');
console.log('Successfully updated src/lib/seed-data.ts with all user files!');
