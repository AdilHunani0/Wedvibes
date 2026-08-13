-- Remove classic-cream-wedding template
DELETE FROM templates WHERE slug = 'classic-cream-wedding';

-- Insert vintage-story-book-wedding template
INSERT INTO templates (name, slug, category, tier, price, credit_cost, html_file_path, features, is_active, sort_order)
VALUES (
  'Vintage Story Book',
  'vintage-story-book-wedding',
  'wedding',
  'premium',
  59900,
  3,
  '/templates/vintage-story-book-wedding.html',
  ARRAY[
    'Book style design',
    '3D page flipping animation',
    'Countdown timer',
    'Scratch letter reveal',
    'Wish wall (floating wishes)'
  ],
  true,
  4
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  features = EXCLUDED.features,
  is_active = EXCLUDED.is_active;
