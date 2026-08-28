-- ==========================================================
-- LensVault Storage Bucket Configuration
-- Supabase Storage & Signed URL Access Setup
-- ==========================================================

-- 1. Create a private bucket for media files
INSERT INTO storage.buckets (id, name, public)
VALUES ('vault-media', 'vault-media', false)
ON CONFLICT (id) DO NOTHING;

-- 2. Create a public bucket for vault thumbnails and avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('vault-thumbnails', 'vault-thumbnails', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Storage Policies
CREATE POLICY "Authenticated users can upload vault media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id IN ('vault-media', 'vault-thumbnails'));

CREATE POLICY "Public can view vault thumbnails"
ON storage.objects FOR SELECT
USING (bucket_id = 'vault-thumbnails');

CREATE POLICY "Allow signed URL reads for vault media"
ON storage.objects FOR SELECT
USING (bucket_id = 'vault-media');
