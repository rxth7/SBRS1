-- Run this in Supabase SQL Editor to support faculty profile images.

-- 1. Add image column to faculty table
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS image TEXT DEFAULT '';

-- 2. Create public storage bucket for faculty images
INSERT INTO storage.buckets (id, name, public) VALUES ('faculty-images', 'faculty-images', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Storage policy so authenticated admins can manage faculty images
DROP POLICY IF EXISTS "Faculty images public read" ON storage.objects;
CREATE POLICY "Faculty images public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'faculty-images');

DROP POLICY IF EXISTS "Faculty images write" ON storage.objects;
CREATE POLICY "Faculty images write" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'faculty-images');

DROP POLICY IF EXISTS "Faculty images update" ON storage.objects;
CREATE POLICY "Faculty images update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'faculty-images');

DROP POLICY IF EXISTS "Faculty images delete" ON storage.objects;
CREATE POLICY "Faculty images delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'faculty-images');
