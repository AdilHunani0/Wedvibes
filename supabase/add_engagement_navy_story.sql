-- Run this in your Supabase SQL editor to add the Engagement Navy Story template

INSERT INTO templates (name, slug, category, tier, price, credit_cost, html_file_path, features, sort_order)
VALUES (
  'Engagement Navy Story',
  'engagement-navy-story',
  'engagement',
  'premium',
  49900,
  3,
  '/templates/engagement-navy-story.html',
  ARRAY[
    'Envelope opening animation',
    'Wax seal reveal',
    'Ambient navy & gold theme',
    'Wish wall (floating wishes)',
    'Ambient music player',
    'Engagement details card',
    'Mini photo gallery (up to 4 photos)',
    'Scroll-reveal sections'
  ],
  9
);
