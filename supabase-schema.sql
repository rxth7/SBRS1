-- Run this in your Supabase SQL Editor to set up the database tables

-- =====================
-- EVENTS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO events (title, date, description) VALUES
  ('Tulunadu Fest – Honouring the Past, Inspiring the Future', '8 August', 'Celebrate the rich heritage and vibrant traditions of Tulunadu through a day of cultural learning and celebration.'),
  ('Moral and Spiritual Programme', '22 August', 'A special programme dedicated to fostering moral values, spiritual awareness, and character development.'),
  ('Independence Day Celebration', '15 August', 'The school celebrated Independence Day with patriotic performances, flag hoisting, and inspiring speeches honoring the spirit of freedom and national pride.'),
  ('AICS Cross Country Race', '19 September', 'Our students will participate in the AICS Cross Country Race, promoting physical fitness, endurance, teamwork, and sportsmanship.');

-- =====================
-- NEWS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT DEFAULT '',
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO news (title, date, description) VALUES
  ('World Environment Day', '5 June', 'Students and staff celebrated Environment Day by planting saplings across the campus, promoting environmental awareness and a greener future.'),
  ('International Yoga Day & Investiture Ceremony', '19 June', 'The school celebrated Yoga Day with an inspiring yoga session, followed by the Investiture Ceremony, where student leaders took their oath of responsibility.'),
  ('National Doctors'' Day', '1 July', 'We were privileged to welcome Dr. Srirama Mugeraya, B.A.M.S., who delivered an informative session on child health, personal hygiene, and the importance of understanding Good Touch and Bad Touch.'),
  ('Dental Health Check-up', '', 'Junior doctors from T.M.A. Pai Hospital, Manipal, conducted a comprehensive dental screening and educated students on maintaining good oral hygiene and healthy dental habits.');

-- =====================
-- EVENT IMAGES TABLE
-- =====================
CREATE TABLE IF NOT EXISTS event_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  src TEXT NOT NULL,
  title TEXT DEFAULT '',
  description TEXT DEFAULT '',
  date TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);


INSERT INTO event_images (src, title, description, date) VALUES
  ('/images/campus19.webp', 'Tarang 25', '', '19 Sep 2025');

-- =====================
-- FEE STRUCTURE TABLE
-- =====================
CREATE TABLE IF NOT EXISTS fee_structure (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  particular TEXT NOT NULL,
  lkg TEXT NOT NULL,
  i_to_v TEXT NOT NULL,
  vi_to_x TEXT NOT NULL,
  sort_order INT4 DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- FEE NOTES TABLE
-- =====================
CREATE TABLE IF NOT EXISTS fee_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  note TEXT NOT NULL,
  sort_order INT4 DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================
-- FACULTY TABLE
-- =====================
CREATE TABLE IF NOT EXISTS faculty (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  designation TEXT DEFAULT '',
  type TEXT NOT NULL CHECK (type IN ('primary', 'secondary')),
  sort_order INT4 DEFAULT 0,
  image TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO faculty (name, designation, type, sort_order) VALUES
('Ms. A. Ramya Shetty, BBM, D.P.P.T., D.EL.Ed.', '', 'primary', 1),
('Mrs. Babitha M. Shriyan, B.Com., D.EL.Ed.', '', 'primary', 2),
('Mrs. Mahalaxmi, B.A., NTT, D.EL.Ed.', '', 'primary', 3),
('Mrs. Shwetha, B.Com., D.P.P.T., B.Ed.', '', 'primary', 4),
('Mrs. Namitha N., B.A., D.P.P.T.', '', 'primary', 5),
('Mrs. Smitha, M.A., B.Ed.', '', 'primary', 6),
('Mrs. Pooja D., B.A., B.P.Ed., M.P.Ed.', '', 'primary', 7),
('Mrs. Asmita Prashanth Shetty, P.U.C., D.P.P.T.', '', 'primary', 8),
('Mrs. Kavitha, M.A., N.T.T.', '', 'primary', 9),
('Mrs. Cicilia Mascarenhas, P.U.C., D.Ed.', '', 'primary', 10),
('Mrs. Amritha H., B.Com., N.T.T.', '', 'primary', 11),
('Mrs. Shobha Girish Shetty, B.A., PGDBM, G.D.C., N.T.T.', '', 'primary', 12),
('Mrs. B. Veena Shenoy, M.Sc., B.Ed.', 'Principal', 'secondary', 1),
('Mr. Nishanth Anchan, B.A., B.P.Ed.', '', 'secondary', 2),
('Mrs. Sukanya, B.Sc., B.Ed.', '', 'secondary', 3),
('Mrs. Geetha Shettigar, M.A., B.Ed.', '', 'secondary', 4),
('Mrs. Arathi Achar, M.Sc., B.Ed.', '', 'secondary', 5),
('Mrs. Sowmya P, M.A., B.Ed.', '', 'secondary', 6),
('Mrs. Latha M.M, B.A.', '', 'secondary', 7),
('Mrs. Jyothi Hegde, M.Com., B.Ed.', '', 'secondary', 8),
('Mrs. Mrudula Gokhale M., B.A., Diploma in Comp. Sci. & Engg.', '', 'secondary', 9),
('Mrs. Leera Rodrigues, M.A., B.Ed.', '', 'secondary', 10),
('Mrs. Archana, D.Ed.', '', 'secondary', 11),
('Ms. Poornima P.B, D.Ed.', '', 'secondary', 12),
('Mr. Rakesh, M.A., B.Ed.', '', 'secondary', 13),
('Mrs. Prakrithi K, B.Sc., B.Ed.', '', 'secondary', 14),
('Mrs. Shilpa Devadiga, M.A., B.Ed.', '', 'secondary', 15),
('Mrs. Poojary Nidhi Jarappa, B.Sc., B.Ed.', '', 'secondary', 16),
('Ms. A. Shruthi, M.A.', '', 'secondary', 17),
('Mrs. Ranjitha, B.A., B.Ed.', '', 'secondary', 18),
('Mrs. Shankramma Umesh Poojary, M.A., D.Ed.', '', 'secondary', 19),
('Mrs. Shrithi Nayak, M.Sc., B.Ed.', '', 'secondary', 20),
('Mrs. H. Thejaswini, M.Sc., B.Ed.', '', 'secondary', 21),
('Ms. Sahana J., M.Sc., B.Ed.', '', 'secondary', 22)
ON CONFLICT (name) DO NOTHING;

-- =====================
-- DISCLOSURE LINKS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS disclosure_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL,
  sl_no INT4 NOT NULL,
  link_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(section, sl_no)
);

-- =====================
-- ROW LEVEL SECURITY
-- =====================
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_structure ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE disclosure_links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on events" ON events;
DROP POLICY IF EXISTS "Allow public read on news" ON news;
DROP POLICY IF EXISTS "Allow public read on event_images" ON event_images;
DROP POLICY IF EXISTS "Allow public read on fee_structure" ON fee_structure;
DROP POLICY IF EXISTS "Allow public read on fee_notes" ON fee_notes;
DROP POLICY IF EXISTS "Allow insert on faculty" ON faculty;
DROP POLICY IF EXISTS "Allow update on faculty" ON faculty;
DROP POLICY IF EXISTS "Allow delete on faculty" ON faculty;
DROP POLICY IF EXISTS "Allow public read on faculty" ON faculty;
DROP POLICY IF EXISTS "Allow insert on events" ON events;
DROP POLICY IF EXISTS "Allow delete on events" ON events;
DROP POLICY IF EXISTS "Allow insert on news" ON news;
DROP POLICY IF EXISTS "Allow delete on news" ON news;
DROP POLICY IF EXISTS "Allow insert on event_images" ON event_images;
DROP POLICY IF EXISTS "Allow delete on event_images" ON event_images;
DROP POLICY IF EXISTS "Allow insert on fee_structure" ON fee_structure;
DROP POLICY IF EXISTS "Allow update on fee_structure" ON fee_structure;
DROP POLICY IF EXISTS "Allow delete on fee_structure" ON fee_structure;
DROP POLICY IF EXISTS "Allow insert on fee_notes" ON fee_notes;
DROP POLICY IF EXISTS "Allow update on fee_notes" ON fee_notes;
DROP POLICY IF EXISTS "Allow delete on fee_notes" ON fee_notes;
DROP POLICY IF EXISTS "Allow public read on disclosure_links" ON disclosure_links;
DROP POLICY IF EXISTS "Allow insert on disclosure_links" ON disclosure_links;
DROP POLICY IF EXISTS "Allow update on disclosure_links" ON disclosure_links;
DROP POLICY IF EXISTS "Allow delete on disclosure_links" ON disclosure_links;

CREATE POLICY "Allow public read on events" ON events FOR SELECT USING (true);
CREATE POLICY "Allow public read on news" ON news FOR SELECT USING (true);
CREATE POLICY "Allow public read on event_images" ON event_images FOR SELECT USING (true);
CREATE POLICY "Allow public read on fee_structure" ON fee_structure FOR SELECT USING (true);
CREATE POLICY "Allow public read on fee_notes" ON fee_notes FOR SELECT USING (true);

CREATE POLICY "Allow insert on events" ON events FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow delete on events" ON events FOR DELETE USING (true);
CREATE POLICY "Allow insert on news" ON news FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow delete on news" ON news FOR DELETE USING (true);
CREATE POLICY "Allow insert on event_images" ON event_images FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow delete on event_images" ON event_images FOR DELETE USING (true);
CREATE POLICY "Allow insert on fee_structure" ON fee_structure FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on fee_structure" ON fee_structure FOR UPDATE USING (true);
CREATE POLICY "Allow delete on fee_structure" ON fee_structure FOR DELETE USING (true);
CREATE POLICY "Allow insert on fee_notes" ON fee_notes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on fee_notes" ON fee_notes FOR UPDATE USING (true);
CREATE POLICY "Allow delete on fee_notes" ON fee_notes FOR DELETE USING (true);
CREATE POLICY "Allow public read on faculty" ON faculty FOR SELECT USING (true);
CREATE POLICY "Allow insert on faculty" ON faculty FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on faculty" ON faculty FOR UPDATE USING (true);
CREATE POLICY "Allow delete on faculty" ON faculty FOR DELETE USING (true);
CREATE POLICY "Allow public read on disclosure_links" ON disclosure_links FOR SELECT USING (true);
CREATE POLICY "Allow insert on disclosure_links" ON disclosure_links FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on disclosure_links" ON disclosure_links FOR UPDATE USING (true);
CREATE POLICY "Allow delete on disclosure_links" ON disclosure_links FOR DELETE USING (true);

-- =====================
-- STORAGE BUCKET & POLICIES
-- =====================
-- Create public bucket for event images (idempotent)
INSERT INTO storage.buckets (id, name, public) VALUES ('event-images', 'event-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow all operations on event-images bucket
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects
  FOR ALL USING (bucket_id = 'event-images')
  WITH CHECK (bucket_id = 'event-images');

-- Create public bucket for faculty images (idempotent)
INSERT INTO storage.buckets (id, name, public) VALUES ('faculty-images', 'faculty-images', true)
ON CONFLICT (id) DO NOTHING;

-- Faculty images storage policies
DROP POLICY IF EXISTS "Faculty images public read" ON storage.objects;
CREATE POLICY "Faculty images public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'faculty-images');

DROP POLICY IF EXISTS "Faculty images write" ON storage.objects;
CREATE POLICY "Faculty images write" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'faculty-images');

DROP POLICY IF EXISTS "Faculty images update" ON storage.objects;
CREATE POLICY "Faculty images update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'faculty-images');

DROP POLICY IF EXISTS "Faculty images delete" ON storage.objects;
CREATE POLICY "Faculty images delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'faculty-images');

-- Create public bucket for alumni images (idempotent)
INSERT INTO storage.buckets (id, name, public) VALUES ('alumni-images', 'alumni-images', true)
ON CONFLICT (id) DO NOTHING;

-- Alumni images storage policies
DROP POLICY IF EXISTS "Alumni images public read" ON storage.objects;
CREATE POLICY "Alumni images public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'alumni-images');

DROP POLICY IF EXISTS "Alumni images write" ON storage.objects;
CREATE POLICY "Alumni images write" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'alumni-images');

DROP POLICY IF EXISTS "Alumni images update" ON storage.objects;
CREATE POLICY "Alumni images update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'alumni-images');

DROP POLICY IF EXISTS "Alumni images delete" ON storage.objects;
CREATE POLICY "Alumni images delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'alumni-images');

-- =====================
-- CAMPUS IMAGES TABLE
-- =====================
CREATE TABLE IF NOT EXISTS campus_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  src TEXT NOT NULL,
  name TEXT NOT NULL,
  sort_order INT4 DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE campus_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on campus_images" ON campus_images;
CREATE POLICY "Allow public read on campus_images" ON campus_images FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert on campus_images" ON campus_images;
CREATE POLICY "Allow insert on campus_images" ON campus_images FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow delete on campus_images" ON campus_images;
CREATE POLICY "Allow delete on campus_images" ON campus_images FOR DELETE USING (true);

-- Create public bucket for campus images (idempotent)
INSERT INTO storage.buckets (id, name, public) VALUES ('campus-images', 'campus-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Campus images public read" ON storage.objects;
CREATE POLICY "Campus images public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'campus-images');

DROP POLICY IF EXISTS "Campus images write" ON storage.objects;
CREATE POLICY "Campus images write" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'campus-images');

DROP POLICY IF EXISTS "Campus images delete" ON storage.objects;
CREATE POLICY "Campus images delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'campus-images');

-- =====================
-- ALUMNI MEMBERS TABLE
-- =====================
CREATE TABLE IF NOT EXISTS alumni_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  designation TEXT DEFAULT '',
  is_executive BOOLEAN DEFAULT false,
  sort_order INT4 DEFAULT 0,
  image TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE alumni_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on alumni_members" ON alumni_members;
CREATE POLICY "Allow public read on alumni_members" ON alumni_members FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert on alumni_members" ON alumni_members;
CREATE POLICY "Allow insert on alumni_members" ON alumni_members FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow delete on alumni_members" ON alumni_members;
CREATE POLICY "Allow delete on alumni_members" ON alumni_members FOR DELETE USING (true);

DROP POLICY IF EXISTS "Allow update on alumni_members" ON alumni_members;
CREATE POLICY "Allow update on alumni_members" ON alumni_members FOR UPDATE USING (true);

-- =====================
-- ALUMNI MEET IMAGES TABLE
-- =====================
CREATE TABLE IF NOT EXISTS alumni_meet_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  src TEXT NOT NULL,
  sort_order INT4 DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE alumni_meet_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on alumni_meet_images" ON alumni_meet_images;
CREATE POLICY "Allow public read on alumni_meet_images" ON alumni_meet_images FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow insert on alumni_meet_images" ON alumni_meet_images;
CREATE POLICY "Allow insert on alumni_meet_images" ON alumni_meet_images FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow delete on alumni_meet_images" ON alumni_meet_images;
CREATE POLICY "Allow delete on alumni_meet_images" ON alumni_meet_images FOR DELETE USING (true);

-- Create public bucket for alumni meet images (idempotent)
INSERT INTO storage.buckets (id, name, public) VALUES ('alumni-meet-images', 'alumni-meet-images', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Alumni meet images public read" ON storage.objects;
CREATE POLICY "Alumni meet images public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'alumni-meet-images');

DROP POLICY IF EXISTS "Alumni meet images write" ON storage.objects;
CREATE POLICY "Alumni meet images write" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'alumni-meet-images');

DROP POLICY IF EXISTS "Alumni meet images update" ON storage.objects;
CREATE POLICY "Alumni meet images update" ON storage.objects
  FOR UPDATE USING (bucket_id = 'alumni-meet-images');

DROP POLICY IF EXISTS "Alumni meet images delete" ON storage.objects;
CREATE POLICY "Alumni meet images delete" ON storage.objects
  FOR DELETE USING (bucket_id = 'alumni-meet-images');

-- =====================
-- SUCCESS STORIES TABLE
-- =====================
CREATE TABLE IF NOT EXISTS success_stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  batch TEXT DEFAULT '',
  story TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE success_stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on success_stories" ON success_stories FOR SELECT USING (true);
CREATE POLICY "Allow insert on success_stories" ON success_stories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on success_stories" ON success_stories FOR UPDATE USING (true);
CREATE POLICY "Allow delete on success_stories" ON success_stories FOR DELETE USING (true);
