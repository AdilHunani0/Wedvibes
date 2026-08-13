-- Insert Classic Maroon Wedding Template
INSERT INTO templates (name, slug, category, tier, price, credit_cost, html_file_path, features, is_active, sort_order)
VALUES (
  'Classic Maroon Wedding',
  'classic-maroon-wedding',
  'wedding',
  'premium',
  59900,
  3,
  '/templates/classic-maroon-wedding.html',
  ARRAY[
    'Diya gate opening animation',
    'Interactive scratch card reveal',
    '3-day events tickets (Haldi, Wedding, Reception)',
    'Scrapbook gallery',
    'Floating blessings wall',
    'Ambient music player'
  ],
  true,
  6
)
ON CONFLICT (slug) DO UPDATE 
SET 
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  tier = EXCLUDED.tier,
  price = EXCLUDED.price,
  credit_cost = EXCLUDED.credit_cost,
  html_file_path = EXCLUDED.html_file_path,
  features = EXCLUDED.features,
  is_active = EXCLUDED.is_active,
  sort_order = EXCLUDED.sort_order;
