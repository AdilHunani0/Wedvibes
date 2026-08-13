-- 003_storage_buckets.sql
-- Run this in Supabase SQL Editor OR create these buckets from the Supabase Dashboard

-- Bucket: card-templates (private) — raw template HTML files
INSERT INTO storage.buckets (id, name, public)
VALUES ('card-templates', 'card-templates', false)
ON CONFLICT (id) DO NOTHING;

-- Bucket: card-photos (public) — user uploaded photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('card-photos', 'card-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Bucket: generated-cards (public) — generated card HTML files
INSERT INTO storage.buckets (id, name, public)
VALUES ('generated-cards', 'generated-cards', true)
ON CONFLICT (id) DO NOTHING;

-- Bucket: template-previews (public) — template thumbnail images
INSERT INTO storage.buckets (id, name, public)
VALUES ('template-previews', 'template-previews', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for card-photos
CREATE POLICY "Users can upload photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'card-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Anyone can view photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'card-photos');

-- Storage policies for generated-cards
CREATE POLICY "Anyone can view generated cards"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'generated-cards');

CREATE POLICY "Service role can insert generated cards"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'generated-cards');

-- Storage policies for template-previews
CREATE POLICY "Anyone can view template previews"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'template-previews');
