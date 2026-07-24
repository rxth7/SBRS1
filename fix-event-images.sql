-- Run this in Supabase SQL Editor to fix the event_images rows.
-- The old rows pointed to /images/event1.jpg etc. which do not exist
-- in the deployed (Vercel) build. This updates them to the .webp static
-- assets that are bundled with the site and deployed to the host.

DELETE FROM event_images
WHERE src LIKE '/images/event%.jpg';

INSERT INTO event_images (src, title, description, date) VALUES
  ('/images/event1.webp', 'Annual Day', 'Celebration of annual day event', '15 March 2026'),
  ('/images/event2.webp', 'Sports Day', 'Annual sports meet', '20 February 2026'),
  ('/images/event3.webp', 'Cultural Fest', 'School cultural festival', '10 January 2026');
