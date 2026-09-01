-- seed.sql — Run AFTER all migrations

INSERT INTO templates (name, slug, category, tier, price, credit_cost, html_file_path, features, sort_order) VALUES
(
  'Rose Bloom',
  'rose-bloom-wedding',
  'wedding',
  'premium',
  0,
  3,
  '/templates/rose-bloom-wedding.html',
  ARRAY['Door opening animation', 'Floating petals', 'Polaroid rope section', '4 photo slots', 'Scroll reveal', 'RSVP button'],
  1
),
(
  'Royal Dark',
  'royal-dark-wedding',
  'wedding',
  'premium',
  49900,
  3,
  '/templates/royal-dark-wedding.html',
  ARRAY['Luxury dark theme', 'Gold particle rain', 'Envelope opening', '4 photo slots', 'RSVP button'],
  2
),
(
  'Vintage Story Book',
  'vintage-story-book-wedding',
  'wedding',
  'premium',
  49900,
  3,
  '/templates/vintage-story-book-wedding.html',
  ARRAY['Book style design', '3D page flipping animation', 'Countdown timer', 'Scratch letter reveal', 'Wish wall (floating wishes)'],
  4
),
(
  'Emerald Nikkah',
  'emerald-nikkah-wedding',
  'wedding',
  'premium',
  49900,
  3,
  '/templates/emerald-nikkah-wedding.html',
  ARRAY['Arch opening animation', 'Interactive scratch card reveal', 'Multi-day tickets (Haldi, Nikkah, Walima)', 'Scrapbook gallery', 'Floating duas wall'],
  5
),
(
  'Grand Opening Gold',
  'grand-opening-gold',
  'opening',
  'premium',
  49900,
  3,
  '/templates/grand-opening-gold.html',
  ARRAY['Business launch', 'Logo slot', 'Full animation', 'QR code slot'],
  6
),
(
  'Classic Maroon Wedding',
  'classic-maroon-wedding',
  'wedding',
  'premium',
  49900,
  3,
  '/templates/classic-maroon-wedding.html',
  ARRAY['Diya gate opening animation', 'Interactive scratch card reveal', '3-day events tickets (Haldi, Wedding, Reception)', 'Scrapbook gallery', 'Floating blessings wall', 'Ambient music player'],
  7
),
(
  'Our Wedding Story',
  'our-wedding-story',
  'wedding',
  'premium',
  49900,
  3,
  '/templates/our-wedding-story.html',
  ARRAY['Cinematic dark theme', 'Book style animation', 'Interactive photo wall', 'Multi-day events', 'RSVP section'],
  8
),
(
  'Crimson Door Wedding',
  'crimson-door-wedding',
  'wedding',
  'premium',
  49900,
  3,
  '/templates/crimson-door-wedding.html',
  ARRAY['Double door opening', 'Scratch card date reveal', 'Events timeline', 'Story with photo collage', 'Countdown timer'],
  9
);

INSERT INTO credit_plans (name, description, basic_credits, standard_credits, premium_credits, price, discount_percent, sort_order) VALUES
(
  'Starter Pack',
  'Perfect for new wedding planners. 10 basic + 5 standard + 5 premium cards.',
  10, 5, 5,
  349900,
  30,
  1
),
(
  'Growth Pack',
  'For growing businesses. 20 basic + 15 standard + 10 premium cards.',
  20, 15, 10,
  799900,
  38,
  2
),
(
  'Agency Pack',
  'For established agencies. 50 basic + 30 standard + 20 premium cards.',
  50, 30, 20,
  1699900,
  45,
  3
);
