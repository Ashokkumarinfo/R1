import { Vault, MediaItem, Folder, AnalyticsEvent } from '@/types';

export const INITIAL_VAULTS: Vault[] = [
  {
    id: 'my-private-vault',
    slug: 'my-vault',
    title: 'Vava — The Untold Love Story',
    description: 'A timeless collection of photos, videos, audio soundtracks, and letters celebrating our story.',
    pin_hash: '1831',
    raw_pin: '1831',
    is_active: true,
    download_enabled: true,
    max_attempts: 5,
    lockout_duration_mins: 5,
    session_timeout_mins: 60,
    cover_image: "/media/Images/20230618_004251.jpg",
    created_at: '2026-08-27T12:00:00.000Z',
    theme: {
      primaryColor: '#f43f5e',
      accentGlow: 'rose',
      cardStyle: 'glass',
    },
    media_count: 134,
    total_storage_bytes: 937887376,
  }
];

export const INITIAL_FOLDERS: Folder[] = [
  {
    id: 'folder-my-photos',
    vault_id: 'my-private-vault',
    name: 'Photos & Memories',
    color: '#f43f5e',
    created_at: '2026-08-27T12:00:00.000Z',
  },
  {
    id: 'folder-my-videos',
    vault_id: 'my-private-vault',
    name: 'Videos & Reels',
    color: '#f59e0b',
    created_at: '2026-08-27T12:00:00.000Z',
  },
  {
    id: 'folder-my-audio',
    vault_id: 'my-private-vault',
    name: 'Songs & Melodies',
    color: '#a855f7',
    created_at: '2026-08-27T12:00:00.000Z',
  },
  {
    id: 'folder-my-docs',
    vault_id: 'my-private-vault',
    name: 'WhatsApp Chats & Letters',
    color: '#10b981',
    created_at: '2026-08-27T12:00:00.000Z',
  },
];

export const INITIAL_MEDIA: MediaItem[] = [
  {
    "id": "media-user-1",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "20230618 004251",
    "original_name": "20230618_004251.jpg",
    "url": "/media/Images/20230618_004251.jpg",
    "thumbnail_url": "/media/Images/20230618_004251.jpg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 46769,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:56:07.418Z"
  },
  {
    "id": "media-user-2",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "adf23481949 (10)",
    "original_name": "adf23481949 (10).jpg",
    "url": "/media/Images/adf23481949 (10).jpg",
    "thumbnail_url": "/media/Images/adf23481949 (10).jpg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 76802,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:55:07.420Z"
  },
  {
    "id": "media-user-3",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "adf23481949 (11)",
    "original_name": "adf23481949 (11).jpeg",
    "url": "/media/Images/adf23481949 (11).jpeg",
    "thumbnail_url": "/media/Images/adf23481949 (11).jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 91148,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:54:07.420Z"
  },
  {
    "id": "media-user-4",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "adf23481949 (11)",
    "original_name": "adf23481949 (11).jpg",
    "url": "/media/Images/adf23481949 (11).jpg",
    "thumbnail_url": "/media/Images/adf23481949 (11).jpg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 118578,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:53:07.420Z"
  },
  {
    "id": "media-user-5",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "adf23481949 (12)",
    "original_name": "adf23481949 (12).jpeg",
    "url": "/media/Images/adf23481949 (12).jpeg",
    "thumbnail_url": "/media/Images/adf23481949 (12).jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 96886,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:52:07.420Z"
  },
  {
    "id": "media-user-6",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "adf23481949 (13)",
    "original_name": "adf23481949 (13).jpeg",
    "url": "/media/Images/adf23481949 (13).jpeg",
    "thumbnail_url": "/media/Images/adf23481949 (13).jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 93134,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:51:07.420Z"
  },
  {
    "id": "media-user-7",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "adf23481949 (13)",
    "original_name": "adf23481949 (13).jpg",
    "url": "/media/Images/adf23481949 (13).jpg",
    "thumbnail_url": "/media/Images/adf23481949 (13).jpg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 43049,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:50:07.420Z"
  },
  {
    "id": "media-user-8",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "adf23481949 (14)",
    "original_name": "adf23481949 (14).jpeg",
    "url": "/media/Images/adf23481949 (14).jpeg",
    "thumbnail_url": "/media/Images/adf23481949 (14).jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 77620,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:49:07.420Z"
  },
  {
    "id": "media-user-9",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "adf23481949 (14)",
    "original_name": "adf23481949 (14).jpg",
    "url": "/media/Images/adf23481949 (14).jpg",
    "thumbnail_url": "/media/Images/adf23481949 (14).jpg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 85158,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:48:07.420Z"
  },
  {
    "id": "media-user-10",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "adf23481949 (15)",
    "original_name": "adf23481949 (15).jpeg",
    "url": "/media/Images/adf23481949 (15).jpeg",
    "thumbnail_url": "/media/Images/adf23481949 (15).jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 128163,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:47:07.420Z"
  },
  {
    "id": "media-user-11",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "adf23481949 (15)",
    "original_name": "adf23481949 (15).jpg",
    "url": "/media/Images/adf23481949 (15).jpg",
    "thumbnail_url": "/media/Images/adf23481949 (15).jpg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 90123,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:46:07.420Z"
  },
  {
    "id": "media-user-12",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "adf23481949 (16)",
    "original_name": "adf23481949 (16).jpeg",
    "url": "/media/Images/adf23481949 (16).jpeg",
    "thumbnail_url": "/media/Images/adf23481949 (16).jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 85211,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:45:07.420Z"
  },
  {
    "id": "media-user-13",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "adf23481949 (2)",
    "original_name": "adf23481949 (2).jpg",
    "url": "/media/Images/adf23481949 (2).jpg",
    "thumbnail_url": "/media/Images/adf23481949 (2).jpg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 36035,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:44:07.420Z"
  },
  {
    "id": "media-user-14",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "adf23481949 (2)",
    "original_name": "adf23481949 (2).mp4",
    "url": "/media/Images/adf23481949 (2).mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 3163335,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T15:43:07.420Z"
  },
  {
    "id": "media-user-15",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "adf23481949 (3)",
    "original_name": "adf23481949 (3).jpeg",
    "url": "/media/Images/adf23481949 (3).jpeg",
    "thumbnail_url": "/media/Images/adf23481949 (3).jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 35033,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:42:07.420Z"
  },
  {
    "id": "media-user-16",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "adf23481949 (3)",
    "original_name": "adf23481949 (3).jpg",
    "url": "/media/Images/adf23481949 (3).jpg",
    "thumbnail_url": "/media/Images/adf23481949 (3).jpg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 79564,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:41:07.420Z"
  },
  {
    "id": "media-user-17",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "adf23481949 (3)",
    "original_name": "adf23481949 (3).mp4",
    "url": "/media/Images/adf23481949 (3).mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 6087497,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T15:40:07.420Z"
  },
  {
    "id": "media-user-18",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "adf23481949 (4)",
    "original_name": "adf23481949 (4).jpg",
    "url": "/media/Images/adf23481949 (4).jpg",
    "thumbnail_url": "/media/Images/adf23481949 (4).jpg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 93347,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:39:07.420Z"
  },
  {
    "id": "media-user-19",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "adf23481949 (5)",
    "original_name": "adf23481949 (5).jpg",
    "url": "/media/Images/adf23481949 (5).jpg",
    "thumbnail_url": "/media/Images/adf23481949 (5).jpg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 131485,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:38:07.420Z"
  },
  {
    "id": "media-user-20",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "adf23481949 (6)",
    "original_name": "adf23481949 (6).jpeg",
    "url": "/media/Images/adf23481949 (6).jpeg",
    "thumbnail_url": "/media/Images/adf23481949 (6).jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 91560,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:37:07.420Z"
  },
  {
    "id": "media-user-21",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "adf23481949 (6)",
    "original_name": "adf23481949 (6).jpg",
    "url": "/media/Images/adf23481949 (6).jpg",
    "thumbnail_url": "/media/Images/adf23481949 (6).jpg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 60686,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:36:07.420Z"
  },
  {
    "id": "media-user-22",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "adf23481949 (7)",
    "original_name": "adf23481949 (7).jpg",
    "url": "/media/Images/adf23481949 (7).jpg",
    "thumbnail_url": "/media/Images/adf23481949 (7).jpg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 88229,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:35:07.420Z"
  },
  {
    "id": "media-user-23",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "adf23481949 (8)",
    "original_name": "adf23481949 (8).jpeg",
    "url": "/media/Images/adf23481949 (8).jpeg",
    "thumbnail_url": "/media/Images/adf23481949 (8).jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 82489,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:34:07.420Z"
  },
  {
    "id": "media-user-24",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "adf23481949 (8)",
    "original_name": "adf23481949 (8).jpg",
    "url": "/media/Images/adf23481949 (8).jpg",
    "thumbnail_url": "/media/Images/adf23481949 (8).jpg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 84724,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:33:07.420Z"
  },
  {
    "id": "media-user-25",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "adf23481949 (8)",
    "original_name": "adf23481949 (8).mp4",
    "url": "/media/Images/adf23481949 (8).mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 304223,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T15:32:07.420Z"
  },
  {
    "id": "media-user-26",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "adf23481949 (9)",
    "original_name": "adf23481949 (9).jpeg",
    "url": "/media/Images/adf23481949 (9).jpeg",
    "thumbnail_url": "/media/Images/adf23481949 (9).jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 44384,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:31:07.420Z"
  },
  {
    "id": "media-user-27",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "adf23481949 (9)",
    "original_name": "adf23481949 (9).jpg",
    "url": "/media/Images/adf23481949 (9).jpg",
    "thumbnail_url": "/media/Images/adf23481949 (9).jpg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 99927,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:30:07.420Z"
  },
  {
    "id": "media-user-28",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG-20230813-WA0008",
    "original_name": "IMG-20230813-WA0008.jpg",
    "url": "/media/Images/IMG-20230813-WA0008.jpg",
    "thumbnail_url": "/media/Images/IMG-20230813-WA0008.jpg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 46780,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:29:07.420Z"
  },
  {
    "id": "media-user-29",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG-20260305-WA0002",
    "original_name": "IMG-20260305-WA0002.jpg",
    "url": "/media/Images/IMG-20260305-WA0002.jpg",
    "thumbnail_url": "/media/Images/IMG-20260305-WA0002.jpg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 154697,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:28:07.420Z"
  },
  {
    "id": "media-user-30",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1239",
    "original_name": "IMG_1239.JPG",
    "url": "/media/Images/IMG_1239.JPG",
    "thumbnail_url": "/media/Images/IMG_1239.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 4881106,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:27:07.420Z"
  },
  {
    "id": "media-user-31",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1240",
    "original_name": "IMG_1240.JPG",
    "url": "/media/Images/IMG_1240.JPG",
    "thumbnail_url": "/media/Images/IMG_1240.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 4701716,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:26:07.420Z"
  },
  {
    "id": "media-user-32",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1241",
    "original_name": "IMG_1241.JPG",
    "url": "/media/Images/IMG_1241.JPG",
    "thumbnail_url": "/media/Images/IMG_1241.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 4022605,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:25:07.420Z"
  },
  {
    "id": "media-user-33",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1242",
    "original_name": "IMG_1242.JPG",
    "url": "/media/Images/IMG_1242.JPG",
    "thumbnail_url": "/media/Images/IMG_1242.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 3949696,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:24:07.420Z"
  },
  {
    "id": "media-user-34",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1243",
    "original_name": "IMG_1243.JPG",
    "url": "/media/Images/IMG_1243.JPG",
    "thumbnail_url": "/media/Images/IMG_1243.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 4362529,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:23:07.420Z"
  },
  {
    "id": "media-user-35",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1244",
    "original_name": "IMG_1244.JPG",
    "url": "/media/Images/IMG_1244.JPG",
    "thumbnail_url": "/media/Images/IMG_1244.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 4279415,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:22:07.420Z"
  },
  {
    "id": "media-user-36",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1245",
    "original_name": "IMG_1245.JPG",
    "url": "/media/Images/IMG_1245.JPG",
    "thumbnail_url": "/media/Images/IMG_1245.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 4284817,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:21:07.420Z"
  },
  {
    "id": "media-user-37",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1246",
    "original_name": "IMG_1246.JPG",
    "url": "/media/Images/IMG_1246.JPG",
    "thumbnail_url": "/media/Images/IMG_1246.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 3436091,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:20:07.420Z"
  },
  {
    "id": "media-user-38",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1247",
    "original_name": "IMG_1247.JPG",
    "url": "/media/Images/IMG_1247.JPG",
    "thumbnail_url": "/media/Images/IMG_1247.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 4289923,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:19:07.420Z"
  },
  {
    "id": "media-user-39",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1248",
    "original_name": "IMG_1248.JPG",
    "url": "/media/Images/IMG_1248.JPG",
    "thumbnail_url": "/media/Images/IMG_1248.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 4365057,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:18:07.420Z"
  },
  {
    "id": "media-user-40",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1249",
    "original_name": "IMG_1249.JPG",
    "url": "/media/Images/IMG_1249.JPG",
    "thumbnail_url": "/media/Images/IMG_1249.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 4307321,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:17:07.420Z"
  },
  {
    "id": "media-user-41",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1250",
    "original_name": "IMG_1250.JPG",
    "url": "/media/Images/IMG_1250.JPG",
    "thumbnail_url": "/media/Images/IMG_1250.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 4240536,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:16:07.420Z"
  },
  {
    "id": "media-user-42",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1251",
    "original_name": "IMG_1251.JPG",
    "url": "/media/Images/IMG_1251.JPG",
    "thumbnail_url": "/media/Images/IMG_1251.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 4210272,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:15:07.420Z"
  },
  {
    "id": "media-user-43",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1252",
    "original_name": "IMG_1252.JPG",
    "url": "/media/Images/IMG_1252.JPG",
    "thumbnail_url": "/media/Images/IMG_1252.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 4277471,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:14:07.420Z"
  },
  {
    "id": "media-user-44",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1253",
    "original_name": "IMG_1253.JPG",
    "url": "/media/Images/IMG_1253.JPG",
    "thumbnail_url": "/media/Images/IMG_1253.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 4229670,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:13:07.420Z"
  },
  {
    "id": "media-user-45",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1254",
    "original_name": "IMG_1254.JPG",
    "url": "/media/Images/IMG_1254.JPG",
    "thumbnail_url": "/media/Images/IMG_1254.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 4315922,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:12:07.420Z"
  },
  {
    "id": "media-user-46",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1255",
    "original_name": "IMG_1255.JPG",
    "url": "/media/Images/IMG_1255.JPG",
    "thumbnail_url": "/media/Images/IMG_1255.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 4270864,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:11:07.420Z"
  },
  {
    "id": "media-user-47",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1256",
    "original_name": "IMG_1256.JPG",
    "url": "/media/Images/IMG_1256.JPG",
    "thumbnail_url": "/media/Images/IMG_1256.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 4305956,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:10:07.420Z"
  },
  {
    "id": "media-user-48",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1258",
    "original_name": "IMG_1258.JPG",
    "url": "/media/Images/IMG_1258.JPG",
    "thumbnail_url": "/media/Images/IMG_1258.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 4415382,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:09:07.420Z"
  },
  {
    "id": "media-user-49",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1259",
    "original_name": "IMG_1259.JPG",
    "url": "/media/Images/IMG_1259.JPG",
    "thumbnail_url": "/media/Images/IMG_1259.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 4318506,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:08:07.420Z"
  },
  {
    "id": "media-user-50",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1260",
    "original_name": "IMG_1260.JPG",
    "url": "/media/Images/IMG_1260.JPG",
    "thumbnail_url": "/media/Images/IMG_1260.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 4218028,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:07:07.420Z"
  },
  {
    "id": "media-user-51",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1261",
    "original_name": "IMG_1261.JPG",
    "url": "/media/Images/IMG_1261.JPG",
    "thumbnail_url": "/media/Images/IMG_1261.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 4307422,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:06:07.420Z"
  },
  {
    "id": "media-user-52",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1262",
    "original_name": "IMG_1262.JPG",
    "url": "/media/Images/IMG_1262.JPG",
    "thumbnail_url": "/media/Images/IMG_1262.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 4246975,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:05:07.420Z"
  },
  {
    "id": "media-user-53",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1263",
    "original_name": "IMG_1263.JPG",
    "url": "/media/Images/IMG_1263.JPG",
    "thumbnail_url": "/media/Images/IMG_1263.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 4209046,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:04:07.420Z"
  },
  {
    "id": "media-user-54",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1264",
    "original_name": "IMG_1264.JPG",
    "url": "/media/Images/IMG_1264.JPG",
    "thumbnail_url": "/media/Images/IMG_1264.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 4315905,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:03:07.420Z"
  },
  {
    "id": "media-user-55",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1265",
    "original_name": "IMG_1265.JPG",
    "url": "/media/Images/IMG_1265.JPG",
    "thumbnail_url": "/media/Images/IMG_1265.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 3998960,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:02:07.420Z"
  },
  {
    "id": "media-user-56",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 1266",
    "original_name": "IMG_1266.JPG",
    "url": "/media/Images/IMG_1266.JPG",
    "thumbnail_url": "/media/Images/IMG_1266.JPG",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 3908613,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:01:07.420Z"
  },
  {
    "id": "media-user-57",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 20250718 213053 622",
    "original_name": "IMG_20250718_213053_622.jpg",
    "url": "/media/Images/IMG_20250718_213053_622.jpg",
    "thumbnail_url": "/media/Images/IMG_20250718_213053_622.jpg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 79564,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T15:00:07.420Z"
  },
  {
    "id": "media-user-58",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 20250718 213055 982",
    "original_name": "IMG_20250718_213055_982.jpg",
    "url": "/media/Images/IMG_20250718_213055_982.jpg",
    "thumbnail_url": "/media/Images/IMG_20250718_213055_982.jpg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 93347,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:59:07.420Z"
  },
  {
    "id": "media-user-59",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 20250718 213156 719",
    "original_name": "IMG_20250718_213156_719.jpg",
    "url": "/media/Images/IMG_20250718_213156_719.jpg",
    "thumbnail_url": "/media/Images/IMG_20250718_213156_719.jpg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 131485,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:58:07.420Z"
  },
  {
    "id": "media-user-60",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "IMG 20250718 213410 051",
    "original_name": "IMG_20250718_213410_051.jpg",
    "url": "/media/Images/IMG_20250718_213410_051.jpg",
    "thumbnail_url": "/media/Images/IMG_20250718_213410_051.jpg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 84724,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:57:07.420Z"
  },
  {
    "id": "media-user-61",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-17 at 9.45.56 PM",
    "original_name": "WhatsApp Image 2026-07-17 at 9.45.56 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-17 at 9.45.56 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-17 at 9.45.56 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 116484,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:56:07.420Z"
  },
  {
    "id": "media-user-62",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-17 at 9.45.57 PM (1)",
    "original_name": "WhatsApp Image 2026-07-17 at 9.45.57 PM (1).jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-17 at 9.45.57 PM (1).jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-17 at 9.45.57 PM (1).jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 77786,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:55:07.420Z"
  },
  {
    "id": "media-user-63",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-17 at 9.45.57 PM (2)",
    "original_name": "WhatsApp Image 2026-07-17 at 9.45.57 PM (2).jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-17 at 9.45.57 PM (2).jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-17 at 9.45.57 PM (2).jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 102834,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:54:07.420Z"
  },
  {
    "id": "media-user-64",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-17 at 9.45.57 PM",
    "original_name": "WhatsApp Image 2026-07-17 at 9.45.57 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-17 at 9.45.57 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-17 at 9.45.57 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 123535,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:53:07.420Z"
  },
  {
    "id": "media-user-65",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.40.55 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.40.55 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.40.55 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.40.55 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 154945,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:52:07.420Z"
  },
  {
    "id": "media-user-66",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.40.58 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.40.58 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.40.58 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.40.58 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 130610,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:51:07.420Z"
  },
  {
    "id": "media-user-67",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.11 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.11 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.11 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.11 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 147405,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:50:07.420Z"
  },
  {
    "id": "media-user-68",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.14 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.14 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.14 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.14 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 146381,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:49:07.420Z"
  },
  {
    "id": "media-user-69",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.16 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.16 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.16 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.16 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 107936,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:48:07.420Z"
  },
  {
    "id": "media-user-70",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.17 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.17 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.17 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.17 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 131611,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:47:07.420Z"
  },
  {
    "id": "media-user-71",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.18 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.18 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.18 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.18 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 144079,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:46:07.420Z"
  },
  {
    "id": "media-user-72",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.19 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.19 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.19 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.19 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 133134,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:45:07.420Z"
  },
  {
    "id": "media-user-73",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.20 PM (1)",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.20 PM (1).jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.20 PM (1).jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.20 PM (1).jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 165786,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:44:07.420Z"
  },
  {
    "id": "media-user-74",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.20 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.20 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.20 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.20 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 154354,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:43:07.420Z"
  },
  {
    "id": "media-user-75",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.22 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.22 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.22 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.22 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 226950,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:42:07.420Z"
  },
  {
    "id": "media-user-76",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.23 PM (1)",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.23 PM (1).jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.23 PM (1).jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.23 PM (1).jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 135436,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:41:07.420Z"
  },
  {
    "id": "media-user-77",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.23 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.23 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.23 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.23 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 139412,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:40:07.420Z"
  },
  {
    "id": "media-user-78",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.24 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.24 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.24 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.24 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 169135,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:39:07.420Z"
  },
  {
    "id": "media-user-79",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.25 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.25 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.25 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.25 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 133956,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:38:07.420Z"
  },
  {
    "id": "media-user-80",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.26 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.26 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.26 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.26 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 180990,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:37:07.420Z"
  },
  {
    "id": "media-user-81",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.27 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.27 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.27 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.27 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 188703,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:36:07.420Z"
  },
  {
    "id": "media-user-82",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.28 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.28 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.28 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.28 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 143709,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:35:07.420Z"
  },
  {
    "id": "media-user-83",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.31 PM (1)",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.31 PM (1).jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.31 PM (1).jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.31 PM (1).jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 147489,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:34:07.420Z"
  },
  {
    "id": "media-user-84",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.31 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.31 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.31 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.31 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 144810,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:33:07.420Z"
  },
  {
    "id": "media-user-85",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.33 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.33 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.33 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.33 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 183600,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:32:07.420Z"
  },
  {
    "id": "media-user-86",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.34 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.34 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.34 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.34 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 124652,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:31:07.420Z"
  },
  {
    "id": "media-user-87",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.35 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.35 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.35 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.35 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 186183,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:30:07.420Z"
  },
  {
    "id": "media-user-88",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.36 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.36 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.36 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.36 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 191153,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:29:07.420Z"
  },
  {
    "id": "media-user-89",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.37 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.37 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.37 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.37 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 212000,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:28:07.420Z"
  },
  {
    "id": "media-user-90",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.38 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.38 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.38 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.38 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 129629,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:27:07.420Z"
  },
  {
    "id": "media-user-91",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.41 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.41 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.41 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.41 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 172005,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:26:07.420Z"
  },
  {
    "id": "media-user-92",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.43 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.43 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.43 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.43 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 159193,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:25:07.420Z"
  },
  {
    "id": "media-user-93",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.44 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.44 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.44 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.44 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 154167,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:24:07.420Z"
  },
  {
    "id": "media-user-94",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.46 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.46 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.46 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.46 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 149215,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:23:07.420Z"
  },
  {
    "id": "media-user-95",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.49 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.49 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.49 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.49 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 148968,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:22:07.420Z"
  },
  {
    "id": "media-user-96",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.51 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.51 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.51 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.51 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 148731,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:21:07.420Z"
  },
  {
    "id": "media-user-97",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.52 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.52 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.52 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.52 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 165052,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:20:07.420Z"
  },
  {
    "id": "media-user-98",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.53 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.53 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.53 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.53 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 216178,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:19:07.420Z"
  },
  {
    "id": "media-user-99",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.54 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.54 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.54 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.54 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 124470,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:18:07.420Z"
  },
  {
    "id": "media-user-100",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.55 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.55 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.55 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.55 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 124327,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:17:07.420Z"
  },
  {
    "id": "media-user-101",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.56 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.56 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.56 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.56 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 151039,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:16:07.420Z"
  },
  {
    "id": "media-user-102",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.41.59 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.41.59 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.59 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.41.59 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 149824,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:15:07.420Z"
  },
  {
    "id": "media-user-103",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.42.00 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.42.00 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.42.00 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.42.00 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 271172,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:14:07.420Z"
  },
  {
    "id": "media-user-104",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.42.01 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.42.01 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.42.01 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.42.01 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 821087,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:13:07.420Z"
  },
  {
    "id": "media-user-105",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-photos",
    "name": "WhatsApp Image 2026-07-21 at 9.42.02 PM",
    "original_name": "WhatsApp Image 2026-07-21 at 9.42.02 PM.jpeg",
    "url": "/media/Images/WhatsApp Image 2026-07-21 at 9.42.02 PM.jpeg",
    "thumbnail_url": "/media/Images/WhatsApp Image 2026-07-21 at 9.42.02 PM.jpeg",
    "media_type": "image",
    "mime_type": "image/jpeg",
    "size": 803711,
    "tags": [
      "image",
      "photos"
    ],
    "created_at": "2026-08-27T14:12:07.420Z"
  },
  {
    "id": "media-user-106",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "adf23481949 (15)",
    "original_name": "adf23481949 (15).mp4",
    "url": "/media/Videos/adf23481949 (15).mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 1119484,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T14:11:07.420Z"
  },
  {
    "id": "media-user-107",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "adf23481949 (23)",
    "original_name": "adf23481949 (23).mp4",
    "url": "/media/Videos/adf23481949 (23).mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 3163335,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T14:10:07.420Z"
  },
  {
    "id": "media-user-108",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "adf23481949 (4)",
    "original_name": "adf23481949 (4).mp4",
    "url": "/media/Videos/adf23481949 (4).mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 4726055,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T14:09:07.420Z"
  },
  {
    "id": "media-user-109",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "adf23481949 (5)",
    "original_name": "adf23481949 (5).mp4",
    "url": "/media/Videos/adf23481949 (5).mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 4706450,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T14:08:07.420Z"
  },
  {
    "id": "media-user-110",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "adf23481949 (6)",
    "original_name": "adf23481949 (6).mp4",
    "url": "/media/Videos/adf23481949 (6).mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 5335058,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T14:07:07.420Z"
  },
  {
    "id": "media-user-111",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "lv 0 20250514193624",
    "original_name": "lv_0_20250514193624.mp4",
    "url": "/media/Videos/lv_0_20250514193624.mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 14459467,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T14:06:07.420Z"
  },
  {
    "id": "media-user-112",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "lv 7254290708335480065 20260416232150",
    "original_name": "lv_7254290708335480065_20260416232150.mp4",
    "url": "/media/Videos/lv_7254290708335480065_20260416232150.mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 25312715,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T14:05:07.420Z"
  },
  {
    "id": "media-user-113",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "lv 7290615249441459457 20260428002610",
    "original_name": "lv_7290615249441459457_20260428002610.mp4",
    "url": "/media/Videos/lv_7290615249441459457_20260428002610.mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 31521442,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T14:04:07.420Z"
  },
  {
    "id": "media-user-114",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "lv 7356164190652026132 20260416225948",
    "original_name": "lv_7356164190652026132_20260416225948.mp4",
    "url": "/media/Videos/lv_7356164190652026132_20260416225948.mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 14795960,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T14:03:07.420Z"
  },
  {
    "id": "media-user-115",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "lv 7400949186973207809 20260428002357",
    "original_name": "lv_7400949186973207809_20260428002357.mp4",
    "url": "/media/Videos/lv_7400949186973207809_20260428002357.mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 17048873,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T14:02:07.420Z"
  },
  {
    "id": "media-user-116",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "lv 7402110823495159058 20260428002930",
    "original_name": "lv_7402110823495159058_20260428002930.mp4",
    "url": "/media/Videos/lv_7402110823495159058_20260428002930.mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 17928484,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T14:01:07.420Z"
  },
  {
    "id": "media-user-117",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "lv 7455004483039300917 20260416232758",
    "original_name": "lv_7455004483039300917_20260416232758.mp4",
    "url": "/media/Videos/lv_7455004483039300917_20260416232758.mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 13755954,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T14:00:07.420Z"
  },
  {
    "id": "media-user-118",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "lv 7525395112675921213 20260402165644",
    "original_name": "lv_7525395112675921213_20260402165644.mp4",
    "url": "/media/Videos/lv_7525395112675921213_20260402165644.mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 11989307,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T13:59:07.420Z"
  },
  {
    "id": "media-user-119",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "lv 7540678904336469309 20260428003045",
    "original_name": "lv_7540678904336469309_20260428003045.mp4",
    "url": "/media/Videos/lv_7540678904336469309_20260428003045.mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 12505494,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T13:58:07.420Z"
  },
  {
    "id": "media-user-120",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "lv 7578415608186899717 20260402111726",
    "original_name": "lv_7578415608186899717_20260402111726.mp4",
    "url": "/media/Videos/lv_7578415608186899717_20260402111726.mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 17559696,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T13:57:07.420Z"
  },
  {
    "id": "media-user-121",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "lv 7624821136903212305 20260416224916",
    "original_name": "lv_7624821136903212305_20260416224916.mp4",
    "url": "/media/Videos/lv_7624821136903212305_20260416224916.mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 18596609,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T13:56:07.420Z"
  },
  {
    "id": "media-user-122",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "Manichuru 🫡♥️(720P HD)",
    "original_name": "Manichuru 🫡♥️(720P_HD).mp4",
    "url": "/media/Videos/Manichuru 🫡♥️(720P_HD).mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 5439645,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T13:55:07.420Z"
  },
  {
    "id": "media-user-123",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "Mannichiru  ( Official video Song ) FT ASHOK   CV   KEVIN   SHREE   MEENA Dedicate TO  - MINION ⚒",
    "original_name": "Mannichiru  ( Official video Song ) FT_ASHOK _ CV _ KEVIN _ SHREE _ MEENA Dedicate TO_ - MINION ⚒.mp4",
    "url": "/media/Videos/Mannichiru  ( Official video Song ) FT_ASHOK _ CV _ KEVIN _ SHREE _ MEENA Dedicate TO_ - MINION ⚒.mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 38836247,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T13:54:07.420Z"
  },
  {
    "id": "media-user-124",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "Mudhal Murai  Ashok  Cv  Anu  kevin",
    "original_name": "Mudhal_Murai_ Ashok_ Cv _Anu _kevin.mp4",
    "url": "/media/Videos/Mudhal_Murai_ Ashok_ Cv _Anu _kevin.mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 36313369,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T13:53:07.420Z"
  },
  {
    "id": "media-user-125",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "Oru Devathai Kanden 04959382728 A K",
    "original_name": "Oru_Devathai_Kanden 04959382728_A_K.mp4",
    "url": "/media/Videos/Oru_Devathai_Kanden 04959382728_A_K.mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 221788674,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T13:52:07.420Z"
  },
  {
    "id": "media-user-126",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "PJ AYOD1502(2)",
    "original_name": "PJ_AYOD1502(2).mp4",
    "url": "/media/Videos/PJ_AYOD1502(2).mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 194225774,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T13:51:07.420Z"
  },
  {
    "id": "media-user-127",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "Unthen  vizhigalal 14030328 225419650",
    "original_name": "Unthen _vizhigalal_14030328_225419650.mp4",
    "url": "/media/Videos/Unthen _vizhigalal_14030328_225419650.mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 9639525,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T13:50:07.420Z"
  },
  {
    "id": "media-user-128",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "Unthen-vihigalal 14030328 225714822",
    "original_name": "Unthen-vihigalal_14030328_225714822.mp4",
    "url": "/media/Videos/Unthen-vihigalal_14030328_225714822.mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 10602449,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T13:49:07.420Z"
  },
  {
    "id": "media-user-129",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "Uthen vixhigalal 14030328 225413804",
    "original_name": "Uthen_vixhigalal_14030328_225413804.mp4",
    "url": "/media/Videos/Uthen_vixhigalal_14030328_225413804.mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 14470196,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T13:48:07.421Z"
  },
  {
    "id": "media-user-130",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "VID-20260615-WA0000",
    "original_name": "VID-20260615-WA0000.mp4",
    "url": "/media/Videos/VID-20260615-WA0000.mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 8330732,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T13:47:07.421Z"
  },
  {
    "id": "media-user-131",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "VID-20260615-WA0001",
    "original_name": "VID-20260615-WA0001.mp4",
    "url": "/media/Videos/VID-20260615-WA0001.mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 10339118,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T13:46:07.421Z"
  },
  {
    "id": "media-user-132",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "VID 32470414 104746 170",
    "original_name": "VID_32470414_104746_170.mp4",
    "url": "/media/Videos/VID_32470414_104746_170.mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 9491438,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T13:45:07.421Z"
  },
  {
    "id": "media-user-133",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-videos",
    "name": "Vizhi Oram  CV  Ak kevin",
    "original_name": "Vizhi Oram _CV_ Ak_kevin.mp4",
    "url": "/media/Videos/Vizhi Oram _CV_ Ak_kevin.mp4",
    "media_type": "video",
    "mime_type": "video/mp4",
    "size": 28845614,
    "tags": [
      "video",
      "videos"
    ],
    "created_at": "2026-08-27T13:44:07.421Z"
  },
  {
    "id": "media-user-134",
    "vault_id": "my-private-vault",
    "folder_id": "folder-my-docs",
    "name": "WhatsApp Chat with Vicky",
    "original_name": "WhatsApp Chat with Vicky.txt",
    "url": "/media/Whatsapp text/WhatsApp Chat with Vicky.txt",
    "media_type": "document",
    "mime_type": "text/plain",
    "size": 30826,
    "tags": [
      "document",
      "docs"
    ],
    "created_at": "2026-08-27T13:43:07.421Z"
  }
];

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
    created_at: '2026-08-27T10:00:00.000Z',
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
    created_at: '2026-08-27T10:00:00.000Z',
  }
];
