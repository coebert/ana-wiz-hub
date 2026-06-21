
-- 1) Tighten note_jump_clicks INSERT policy: validate input shape instead of `with check (true)`.
DROP POLICY IF EXISTS "Anyone can insert jump clicks" ON public.note_jump_clicks;
CREATE POLICY "Anyone can insert jump clicks"
ON public.note_jump_clicks
FOR INSERT
TO anon, authenticated
WITH CHECK (
  note_slug IS NOT NULL AND length(note_slug) BETWEEN 1 AND 128
  AND target_path IS NOT NULL AND length(target_path) BETWEEN 1 AND 256 AND target_path LIKE '/%'
  AND (target_section IS NULL OR length(target_section) <= 64)
  AND (target_label IS NULL OR length(target_label) <= 128)
  AND (visitor_id IS NULL OR length(visitor_id) <= 128)
);

-- 2) Hide internal error_message from public reads on podcasts (column-level privilege).
--    Anon/authenticated keep SELECT on all other columns. service_role retains full access.
REVOKE SELECT ON public.podcasts FROM anon, authenticated;
GRANT SELECT (id, topic_id, topic_title, script, audio_path, duration_seconds, status, voice, created_at, updated_at)
  ON public.podcasts TO anon, authenticated;

-- 3) Validate inaccuracy_reports inputs server-side (length + simple email shape) so the INSERT
--    policy can't be abused with oversized payloads or malformed contact strings.
DROP POLICY IF EXISTS "Anyone can submit an inaccuracy report" ON public.inaccuracy_reports;
CREATE POLICY "Anyone can submit an inaccuracy report"
ON public.inaccuracy_reports
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'new'
  AND public_note IS NULL
  AND reviewed_by IS NULL
  AND reviewed_at IS NULL
  AND topic_id IS NOT NULL AND length(topic_id) BETWEEN 1 AND 128
  AND topic_title IS NOT NULL AND length(topic_title) BETWEEN 1 AND 256
  AND message IS NOT NULL AND length(message) BETWEEN 5 AND 4000
  AND (quoted_text IS NULL OR length(quoted_text) <= 1000)
  AND (suggested_correction IS NULL OR length(suggested_correction) <= 4000)
  AND (topic_url IS NULL OR length(topic_url) <= 1024)
  AND (user_agent IS NULL OR length(user_agent) <= 512)
  AND (
    contact_email IS NULL
    OR (length(contact_email) BETWEEN 3 AND 320 AND contact_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$')
  )
);
