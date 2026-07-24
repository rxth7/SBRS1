-- Drop existing write policies and recreate with auth check
DROP POLICY IF EXISTS "Allow insert on events" ON events;
CREATE POLICY "Allow insert on events" ON events FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow delete on events" ON events;
CREATE POLICY "Allow delete on events" ON events FOR DELETE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow insert on news" ON news;
CREATE POLICY "Allow insert on news" ON news FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow delete on news" ON news;
CREATE POLICY "Allow delete on news" ON news FOR DELETE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow insert on event_images" ON event_images;
CREATE POLICY "Allow insert on event_images" ON event_images FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow delete on event_images" ON event_images;
CREATE POLICY "Allow delete on event_images" ON event_images FOR DELETE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow insert on fee_structure" ON fee_structure;
CREATE POLICY "Allow insert on fee_structure" ON fee_structure FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow update on fee_structure" ON fee_structure;
CREATE POLICY "Allow update on fee_structure" ON fee_structure FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow delete on fee_structure" ON fee_structure;
CREATE POLICY "Allow delete on fee_structure" ON fee_structure FOR DELETE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow insert on fee_notes" ON fee_notes;
CREATE POLICY "Allow insert on fee_notes" ON fee_notes FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow update on fee_notes" ON fee_notes;
CREATE POLICY "Allow update on fee_notes" ON fee_notes FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow delete on fee_notes" ON fee_notes;
CREATE POLICY "Allow delete on fee_notes" ON fee_notes FOR DELETE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow insert on faculty" ON faculty;
CREATE POLICY "Allow insert on faculty" ON faculty FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow update on faculty" ON faculty;
CREATE POLICY "Allow update on faculty" ON faculty FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow delete on faculty" ON faculty;
CREATE POLICY "Allow delete on faculty" ON faculty FOR DELETE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow insert on disclosure_links" ON disclosure_links;
CREATE POLICY "Allow insert on disclosure_links" ON disclosure_links FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow update on disclosure_links" ON disclosure_links;
CREATE POLICY "Allow update on disclosure_links" ON disclosure_links FOR UPDATE USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow delete on disclosure_links" ON disclosure_links;
CREATE POLICY "Allow delete on disclosure_links" ON disclosure_links FOR DELETE USING (auth.role() = 'authenticated');
