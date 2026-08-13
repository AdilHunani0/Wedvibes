-- Remove if exists
DELETE FROM templates WHERE slug = 'birthday-love-card';

-- Insert birthday-love-card template
INSERT INTO templates (name, slug, category, tier, price, credit_cost, html_file_path, features, is_active, sort_order)
VALUES (
  'Birthday Love Card',
  'birthday-love-card',
  'birthday',
  'premium',
  49900,
  2,
  '/templates/birthday-love-card.html',
  ARRAY[
    'Gift box opening animation',
    'Rotating photo carousel',
    'Flip-card reasons I love you',
    'Memory photo gallery',
    'Interactive candle blowing',
    'Love button with burst hearts',
    'Ambient floating hearts'
  ],
  true,
  9
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  features = EXCLUDED.features,
  is_active = EXCLUDED.is_active;
