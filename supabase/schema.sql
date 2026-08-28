-- ==========================================================
-- LensVault Database Schema
-- Supabase PostgreSQL with Row Level Security (RLS)
-- ==========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Vaults Table
CREATE TABLE IF NOT EXISTS public.vaults (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(64) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    pin_hash VARCHAR(255) NOT NULL,
    raw_pin VARCHAR(10), -- Optional demo convenience
    is_active BOOLEAN DEFAULT true,
    download_enabled BOOLEAN DEFAULT true,
    max_attempts INT DEFAULT 5,
    lockout_duration_mins INT DEFAULT 5,
    session_timeout_mins INT DEFAULT 30,
    cover_image TEXT,
    theme JSONB DEFAULT '{"primaryColor": "#06b6d4", "cardStyle": "glass"}'::jsonb,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Folders Table
CREATE TABLE IF NOT EXISTS public.folders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vault_id UUID REFERENCES public.vaults(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    parent_id UUID REFERENCES public.folders(id) ON DELETE SET NULL,
    color VARCHAR(32) DEFAULT '#3b82f6',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Media Items Table
CREATE TABLE IF NOT EXISTS public.media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vault_id UUID REFERENCES public.vaults(id) ON DELETE CASCADE,
    folder_id UUID REFERENCES public.folders(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    media_type VARCHAR(32) NOT NULL CHECK (media_type IN ('image', 'video', 'audio', 'document')),
    mime_type VARCHAR(128) NOT NULL,
    size BIGINT NOT NULL DEFAULT 0,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Analytics Events Table
CREATE TABLE IF NOT EXISTS public.analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vault_id UUID REFERENCES public.vaults(id) ON DELETE CASCADE,
    event_type VARCHAR(32) NOT NULL CHECK (event_type IN ('scan', 'link_open', 'pin_success', 'pin_failed', 'media_view', 'media_download', 'lockout')),
    device_type VARCHAR(32) DEFAULT 'desktop',
    browser VARCHAR(64),
    os VARCHAR(64),
    country VARCHAR(64),
    city VARCHAR(64),
    user_agent TEXT,
    media_id UUID REFERENCES public.media(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Vault Sessions Table
CREATE TABLE IF NOT EXISTS public.vault_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vault_id UUID REFERENCES public.vaults(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    last_active_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for lightning fast queries
CREATE INDEX IF NOT EXISTS idx_vaults_slug ON public.vaults(slug);
CREATE INDEX IF NOT EXISTS idx_media_vault ON public.media(vault_id);
CREATE INDEX IF NOT EXISTS idx_media_type ON public.media(media_type);
CREATE INDEX IF NOT EXISTS idx_folders_vault ON public.folders(vault_id);
CREATE INDEX IF NOT EXISTS idx_analytics_vault ON public.analytics(vault_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON public.vault_sessions(session_token);

-- Enable Supabase Realtime for instant synchronization
ALTER PUBLICATION supabase_realtime ADD TABLE public.media;
ALTER PUBLICATION supabase_realtime ADD TABLE public.folders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.vaults;
ALTER PUBLICATION supabase_realtime ADD TABLE public.analytics;

-- Row Level Security (RLS)
ALTER TABLE public.vaults ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vault_sessions ENABLE ROW LEVEL SECURITY;

-- Public read for active vaults (PIN checked via API or client function)
CREATE POLICY "Public can view vault metadata" ON public.vaults
    FOR SELECT USING (is_active = true);

-- Vault media visible if vault is active
CREATE POLICY "Public can view vault media" ON public.media
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.vaults WHERE public.vaults.id = media.vault_id AND public.vaults.is_active = true)
    );

CREATE POLICY "Public can view vault folders" ON public.folders
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.vaults WHERE public.vaults.id = folders.vault_id AND public.vaults.is_active = true)
    );

CREATE POLICY "Allow public analytics logging" ON public.analytics
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow session creation and validation" ON public.vault_sessions
    FOR ALL USING (true);
