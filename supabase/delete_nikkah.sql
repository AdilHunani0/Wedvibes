DELETE FROM public.templates WHERE slug = 'emerald-nikkah-wedding';

INSERT INTO public.templates (name, slug, category, tier, price, credit_cost, html_file_path, features, is_active, sort_order)
VALUES (
  'Emerald Nikkah',
  'emerald-nikkah-wedding',
  'wedding',
  'premium',
  59900,
  3,
  '/templates/emerald-nikkah-wedding.html',
  ARRAY[
    'Arch opening animation',
    'Interactive scratch card reveal',
    'Multi-day tickets (Haldi, Nikkah, Walima)',
    'Scrapbook gallery',
    'Floating duas wall'
  ],
  true,
  5
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  features = EXCLUDED.features,
  is_active = EXCLUDED.is_active;
