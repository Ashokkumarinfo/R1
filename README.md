# 🛡️ LensVault — Google Lens & PIN-Protected Private Media Vault

> **Ultra-premium full-stack media vault inspired by Google Lens optical scanning and Apple Photos luxury.** Share confidential media albums, 4K film reels, lossless audio, and PDF documents through dynamic QR codes and secure 4-digit PIN locks.

---

## ✨ Key Features

### 🔍 1. Google Lens Optical Viewfinder
- Real-time **WebRTC camera stream scanner** with animated corner brackets, targeting reticle, and laser sweeps.
- **Drag-and-drop QR image decoder** using `jsQR`.
- Optical feedback bursts and celebratory particle animations upon identification.

### 🔢 2. Hardware-Grade 4-Digit PIN Security
- **Apple-style 4-circle PIN indicator** with instant keypad and physical keyboard detection (0–9, Backspace, Clear).
- **Auto-submission** immediately upon entering the 4th digit.
- **Rate-limiting & Lockout**: Maximum 5 attempts $\rightarrow$ triggers a **5-minute cooldown timer** with persistent countdown.
- **Session Security**: 30-minute rolling session expiration and instant lock/exit capability.

### 📸 3. Apple Photos & iCloud Aesthetic Media Vault
- Responsive **masonry & dynamic grid** gallery layouts.
- **Format Support**:
  - **Photos**: JPG, PNG, GIF, WEBP (with high-res fullscreen zoom, pan, EXIF metadata drawer).
  - **Videos**: MP4, MOV, WEBM, MKV (with custom player: play/pause, seek scrubber, volume, fullscreen, speed switcher 0.5x–2x, keyboard shortcuts).
  - **Audio**: MP3, WAV, AAC, FLAC (with waveform visualizer, track playlist queue, shuffle, volume).
  - **Documents**: Interactive in-browser PDF reader with zoom and download.
- Instant search bar, folder explorer, and category filters (Photos, Videos, Audio, Docs).
- Admin-controlled master download permissions.

### ⚡ 4. Realtime Synchronization
- Powered by **Supabase Realtime** + local **`BroadcastChannel` fallback**.
- Uploads, renames, and deletions made in the Admin Studio appear **instantly across all connected viewer windows without page refresh**.

### 📊 5. Admin Dashboard & QR Studio
- **Multi-File Drag-and-Drop Uploader** with preview, format detection, and progress bars.
- **Folder & Album Hierarchy Management**: Move files between folders, rename, delete.
- **Storage Allocation Gauge**: Visual breakdown across photos, videos, audio, and documents.
- **Custom QR Code Studio**: Customize accent colors, download 1024px PNG, vector SVG, and printable tent-cards.
- **Live Inbound Telemetry**: Real-time traffic breakdown (Mobile vs Desktop vs Tablet), QR scans vs link opens, and access event stream.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 14 (App Router, Server Components & Client Hooks) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS (Glassmorphism, custom glowing utilities, dark theme) |
| **Icons & Animation** | Lucide React + Framer Motion + Canvas Confetti |
| **Scanning** | `jsqr` (WebRTC camera stream + static image decoding) |
| **QR Generation** | `qrcode.react` (Canvas & SVG vector export) |
| **Database & Realtime** | Supabase (PostgreSQL with RLS, Storage Buckets, Realtime WebSockets) |
| **Dual-Engine Sync** | BroadcastChannel + localStorage + IndexedDB for instant zero-config testing |
| **Deployment** | Vercel Ready |

---

## 🚀 One-Command Quickstart

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Default Demo Vault PINs

| Vault | Slug / URL | Demo PIN | Description |
| :--- | :--- | :---: | :--- |
| **Project Nebula** | `/v/nebula-keynote-2026` | `1337` | 4K keynote stills, prototypes, teaser video, OST, and whitepaper |
| **Sarah & James Wedding** | `/v/sarah-james-wedding` | `2026` | Ceremony photo gallery, 4K cinema trailer, vows audio, guestbook |
| **Tokyo Cyberpunk** | `/v/tokyo-neon-archives` | `9999` | Neon street captures, synthwave stems, moodboards |

---

## 🗄️ Supabase Setup (Optional for Production)

LensVault works out of the box with realistic seed media and real-time syncing. To connect your live Supabase project:

1. Create a project at [supabase.com](https://supabase.com).
2. Go to the **SQL Editor** in Supabase and run the script in [`supabase/schema.sql`](supabase/schema.sql).
3. Run [`supabase/storage.sql`](supabase/storage.sql) to set up private media buckets.
4. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
5. Fill in your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

---

## 📁 Project Directory Structure

```
├── public/
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout with navbar & footer
│   │   ├── page.tsx              # Landing page with Lens scanner hero & demo vaults
│   │   ├── scan/page.tsx         # Dedicated Google Lens optical viewfinder page
│   │   ├── v/[vaultId]/page.tsx  # Dynamic vault (PIN gate -> Media vault)
│   │   └── admin/
│   │       ├── page.tsx          # Admin command center & vault overview
│   │       ├── vaults/[id]/      # File manager, folder organizer, settings
│   │       ├── qr-studio/        # Dedicated custom QR code studio
│   │       ├── analytics/        # Live traffic telemetry and logs
│   │       └── settings/         # Security policies & Supabase status
│   ├── components/
│   │   ├── scanner/              # Google Lens optical scanner HUD & WebRTC
│   │   ├── auth/                 # Apple 4-digit PIN keypad & rate limiter
│   │   ├── vault/                # Masonry gallery & folder explorer
│   │   ├── player/               # Universal media player (Video, Audio, Docs, Photos)
│   │   ├── admin/                # Multi-file drag uploader & storage gauge
│   │   ├── qr/                   # Dynamic QR code card with PNG/SVG export
│   │   ├── analytics/            # Device breakdown & live event stream
│   │   └── ui/                   # Glassmorphic navbar and footer
│   ├── lib/
│   │   ├── store/vault-store.ts  # Hybrid Realtime Store & BroadcastChannel sync
│   │   ├── pin-security.ts       # Rate-limiting, SHA-256, 5-min lockout, sessions
│   │   ├── formatters.ts         # Bytes, duration, date, mime helpers
│   │   ├── seed-data.ts          # Pre-configured 4K demo vaults & media items
│   │   └── supabase/client.ts    # Supabase client wrapper
│   ├── types/                    # TypeScript interfaces
│   └── styles/globals.css        # Tailwind glassmorphism & HUD animations
├── supabase/
│   ├── schema.sql                # PostgreSQL tables, RLS policies, indexes
│   ├── storage.sql               # Private storage buckets
│   └── seed.sql                  # Database seed script
└── README.md
```

---

## 🚢 Deployment to Vercel

```bash
# Using Vercel CLI
npx vercel
```
Or connect your GitHub repository directly to Vercel. All environment variables can be populated in the Vercel Project Settings.

---

## 📜 License
MIT License. Built for high-security, elegant media sharing.
