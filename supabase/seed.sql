-- ==========================================================
-- LensVault Seed Data
-- ==========================================================

-- Insert Demo Vault 1: "Project Nebula Keynotes & Assets" (PIN: 1337)
INSERT INTO public.vaults (id, slug, title, description, pin_hash, raw_pin, is_active, download_enabled, max_attempts, lockout_duration_mins, session_timeout_mins, cover_image, theme)
VALUES (
    'a1b2c3d4-e5f6-47a8-9b0c-1d2e3f4a5b6c',
    'nebula-keynote-2026',
    'Project Nebula: Secret Keynotes & High-Res Assets',
    'Confidential launch keynote footage, 4K camera stills, product design master PDFs, and ambient soundtrack.',
    '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', -- SHA256 of 1
    '1337',
    true,
    true,
    5,
    5,
    30,
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    '{"primaryColor": "#06b6d4", "accentGlow": "cyan", "cardStyle": "glass"}'::jsonb
) ON CONFLICT (id) DO NOTHING;

-- Insert Demo Vault 2: "Wedding Memories & 4K Reel" (PIN: 2026)
INSERT INTO public.vaults (id, slug, title, description, pin_hash, raw_pin, is_active, download_enabled, max_attempts, lockout_duration_mins, session_timeout_mins, cover_image, theme)
VALUES (
    'b2c3d4e5-f6a7-48b9-ac0d-2e3f4a5b6c7d',
    'sarah-james-wedding',
    'Sarah & James - Private Wedding Gallery & 4K Cinema Reel',
    'High resolution ceremony photos, drone cinema captures, vow audio recordings, and banquet guestbook.',
    'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35', -- SHA256
    '2026',
    true,
    true,
    5,
    5,
    30,
    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    '{"primaryColor": "#8b5cf6", "accentGlow": "purple", "cardStyle": "glass"}'::jsonb
) ON CONFLICT (id) DO NOTHING;
