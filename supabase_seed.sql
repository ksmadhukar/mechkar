-- Mechkar seed data — matches actual Supabase schema
-- Run in: https://supabase.com/dashboard/project/zaqwydmzupentivirueb/sql/new

-- ============================================================
-- Clean up duplicate David row (inserted without slug)
-- ============================================================
DELETE FROM characters WHERE id = 'e2571b7a-10df-426b-8a27-fe29d173a80c';

-- ============================================================
-- Characters (id = uuid, slug = friendly key)
-- ============================================================
INSERT INTO characters (id, name, title, era, overview, image_url, slug) VALUES
  ('5334510e-88ca-4f62-8efc-60e0cc26a718', 'David',    'King of Israel',          'c. 1010–970 BC',  'David was the second king of Israel, celebrated as a warrior, poet, and man after God''s own heart. He united the twelve tribes and brought the Ark of the Covenant to Jerusalem.',  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', 'david'),
  ('fa63de6e-1219-4f9f-9119-3b02bef02fbb', 'Moses',    'Prophet & Deliverer',     'c. 1391–1271 BC', 'Moses led the Israelites out of slavery in Egypt, received the Ten Commandments on Mount Sinai, and guided God''s people for forty years through the wilderness.',                   'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80', 'moses'),
  ('0b2e752f-4bc3-44a9-879e-cd9f461e363d', 'Esther',   'Queen of Persia',         'c. 479 BC',       'Esther was a Jewish queen of Persia who risked her life to save her people from genocide, demonstrating extraordinary courage and faith.',                                           'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80', 'esther'),
  ('9633dac1-929d-4e46-9f3a-1b1cadb4c3e4', 'Paul',     'Apostle to the Gentiles', 'c. 5–67 AD',      'Originally a persecutor of Christians, Paul encountered the risen Christ and became the most prolific missionary and theological writer of the early church.',                        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80', 'paul'),
  ('6421c7f8-ab93-42e2-b8d9-f52226d24447', 'Abraham',  'Father of Nations',       'c. 2000–1825 BC', 'Abraham is revered as the founding patriarch of Judaism, Christianity, and Islam. His faith in God''s promise made him the father of the covenant people.',                          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80', 'abraham')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, title = EXCLUDED.title, era = EXCLUDED.era,
  overview = EXCLUDED.overview, image_url = EXCLUDED.image_url, slug = EXCLUDED.slug;

-- ============================================================
-- Locations (has ancient_name, modern_name, country — left null)
-- ============================================================
INSERT INTO locations (id, slug, name, description, latitude, longitude, significance, image_url) VALUES
  ('23351cbe-efa9-4f57-8eaf-3413b5645821', 'jerusalem',   'Jerusalem',   'The holy city central to Jewish and Christian history.',          31.7683, 35.2137, 'Site of the Temple and the crucifixion of Jesus.',    'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600&q=80'),
  ('e2bc6ec2-5f01-40ba-971c-2180c61a88d6', 'bethlehem',   'Bethlehem',   'Birthplace of King David and Jesus.',                             31.7054, 35.2024, 'Fulfillment of Messianic prophecy.',                  'https://images.unsplash.com/photo-1555658636-6e4a36218be7?w=600&q=80'),
  ('aa7d3e5f-5c77-4d52-95c2-02e4a2e2b41c', 'babylon',     'Babylon',     'Capital of the Babylonian empire.',                               32.5422, 44.4205, 'Place of Israel''s exile.',                            'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=600&q=80'),
  ('3f2f0904-2b55-4540-b34d-b791292398ca', 'rome',        'Rome',        'Capital of the Roman Empire.',                                    41.9028, 12.4964, 'Center of early Christian mission.',                  'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80'),
  ('f57a5039-41ab-4132-8f9a-daed3dc34e7a', 'mount_sinai', 'Mount Sinai', 'Mountain where Moses received the Ten Commandments.',             28.5392, 33.9751, 'Site of the covenant law.',                            'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=600&q=80')
ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug, name = EXCLUDED.name, description = EXCLUDED.description,
  latitude = EXCLUDED.latitude, longitude = EXCLUDED.longitude,
  significance = EXCLUDED.significance, image_url = EXCLUDED.image_url;

-- ============================================================
-- Timeline Events (uses year_label, not year; no character_ids)
-- location_id references locations.id
-- ============================================================
INSERT INTO timeline_events (id, slug, title, year_label, year_numeric, description, category, location_id) VALUES
  ('53617463-ed68-4e96-be55-e616df891e46', 'exodus',       'The Exodus',          '1446 BC', -1446, 'Moses leads the Israelites out of Egypt.',                         'exodus',   'f57a5039-41ab-4132-8f9a-daed3dc34e7a'),
  ('c0265ccf-331c-4d47-82c1-9e1e5cec3a09', 'david_king',   'David Becomes King',  '1010 BC', -1010, 'David is anointed king over Israel.',                              'kingdom',  '23351cbe-efa9-4f57-8eaf-3413b5645821'),
  ('bd5bda56-71c0-4b77-ba27-86c183a283dc', 'temple_built', 'Temple Built',        '957 BC',   -957, 'Solomon completes the First Temple in Jerusalem.',                 'temple',   '23351cbe-efa9-4f57-8eaf-3413b5645821'),
  ('6ccbd7f8-0969-409d-a939-0071bb1c2349', 'crucifixion',  'The Crucifixion',     '33 AD',      33, 'Jesus is crucified and resurrected.',                              'gospel',   '23351cbe-efa9-4f57-8eaf-3413b5645821'),
  ('29f1ad97-d052-4dce-aa7d-e853af6fd76c', 'pentecost',    'Pentecost',           '33 AD',      33, 'Holy Spirit descends and the church begins.',                      'church',   '23351cbe-efa9-4f57-8eaf-3413b5645821')
ON CONFLICT (id) DO UPDATE SET
  slug = EXCLUDED.slug, title = EXCLUDED.title, year_label = EXCLUDED.year_label,
  year_numeric = EXCLUDED.year_numeric, description = EXCLUDED.description,
  category = EXCLUDED.category, location_id = EXCLUDED.location_id;

-- ============================================================
-- Verses
-- ============================================================
INSERT INTO verses (id, reference, text, book, chapter, verse, testament) VALUES
  ('badd8ad8-e554-41b9-b817-f5f4925df8a5', 'Psalm 46:10', 'Be still, and know that I am God. I will be exalted among the nations, I will be exalted in the earth!', 'Psalms', 46, 10, 'old')
ON CONFLICT (id) DO UPDATE SET
  reference = EXCLUDED.reference, text = EXCLUDED.text, book = EXCLUDED.book,
  chapter = EXCLUDED.chapter, verse = EXCLUDED.verse, testament = EXCLUDED.testament;
