-- Remove our-wedding-story template if it exists for some reason
DELETE FROM templates WHERE slug = 'our-wedding-story';

-- Insert our-wedding-story template
INSERT INTO templates (name, slug, category, tier, price, credit_cost, html_file_path, features, is_active, sort_order)
VALUES (
  'Our Wedding Story',
  'our-wedding-story',
  'wedding',
  'premium',
  59900,
  3,
  '/templates/our-wedding-story.html',
  ARRAY[
    'Cinematic dark theme',
    'Book style animation',
    'Interactive photo wall',
    'Multi-day events',
    'RSVP section'
  ],
  true,
  8
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  features = EXCLUDED.features,
  is_active = EXCLUDED.is_active;
