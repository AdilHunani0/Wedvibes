-- Insert destination-beach-wedding template
-- Run this in Supabase SQL Editor or via supabase db push

INSERT INTO templates (name, slug, category, tier, price, credit_cost, html_file_path, features, is_active, sort_order)
VALUES (
  'Destination Beach Wedding',
  'destination-beach-wedding',
  'wedding',
  'premium',
  59900,
  3,
  '/templates/destination-beach-wedding.html',
  ARRAY[
    'Flower bloom opening animation',
    'Ocean ambient particles',
    '3-day event timeline (Haldi · Wedding · Reception)',
    'Scratch-card date reveal',
    'Live countdown timer',
    'Polaroid masonry photo gallery',
    'Floating wish wall',
    'Parallax floating photos',
    'Couple photo carousel',
    'Ambient music player'
  ],
  true,
  4
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  features = EXCLUDED.features,
  is_active = EXCLUDED.is_active;
