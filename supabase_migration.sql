-- ==============================================================================
-- SKRIP MIGRASI SUPABASE - WEDDING INVITATION TEMPLATE
-- Jalankan skrip ini langsung di SQL Editor pada Dashboard Supabase Anda
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================================================
-- 2. TABEL: GUESTS (Daftar Tamu Undangan Personal)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.guests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index performa pencarian tamu
CREATE INDEX IF NOT EXISTS idx_guests_id ON public.guests(id);
CREATE INDEX IF NOT EXISTS idx_guests_slug ON public.guests(slug);

-- ==============================================================================
-- 3. TABEL: RSVPS (Konfirmasi Kehadiran)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.rsvps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    guests INTEGER NOT NULL DEFAULT 1 CHECK (guests >= 0),
    address TEXT,
    attending TEXT NOT NULL CHECK (attending IN ('Yes', 'No')),
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index urutan RSVP terbaru
CREATE INDEX IF NOT EXISTS idx_rsvps_created_at ON public.rsvps(created_at DESC);

-- ==============================================================================
-- 4. TABEL: WISHES (Ucapan & Doa)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.wishes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    relation TEXT NOT NULL DEFAULT 'Sahabat',
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index urutan ucapan terbaru
CREATE INDEX IF NOT EXISTS idx_wishes_created_at ON public.wishes(created_at DESC);

-- ==============================================================================
-- 5. REALTIME PUBLICATION
-- ==============================================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.wishes;

-- ==============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- --- TABEL GUESTS ---
ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view guest info" 
    ON public.guests FOR SELECT 
    TO anon, authenticated
    USING (true);

CREATE POLICY "Public can insert guests" 
    ON public.guests FOR INSERT 
    TO anon, authenticated 
    WITH CHECK (true);

CREATE POLICY "Public can update guests" 
    ON public.guests FOR UPDATE 
    TO anon, authenticated 
    USING (true) 
    WITH CHECK (true);

CREATE POLICY "Public can delete guests" 
    ON public.guests FOR DELETE 
    TO anon, authenticated 
    USING (true);


-- --- TABEL RSVPS ---
ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can submit RSVP" 
    ON public.rsvps FOR INSERT 
    TO anon, authenticated 
    WITH CHECK (true);

CREATE POLICY "Public can view RSVPs" 
    ON public.rsvps FOR SELECT 
    TO anon, authenticated 
    USING (true);

CREATE POLICY "Public can delete RSVPs" 
    ON public.rsvps FOR DELETE 
    TO anon, authenticated 
    USING (true);


-- --- TABEL WISHES ---
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view wishes" 
    ON public.wishes FOR SELECT 
    TO anon, authenticated
    USING (true);

CREATE POLICY "Public can submit wishes" 
    ON public.wishes FOR INSERT 
    TO anon, authenticated 
    WITH CHECK (true);

CREATE POLICY "Public can delete wishes" 
    ON public.wishes FOR DELETE 
    TO anon, authenticated 
    USING (true);

