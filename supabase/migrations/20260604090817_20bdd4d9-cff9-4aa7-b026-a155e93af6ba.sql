-- Replace the SECURITY DEFINER view with column-level grants so the
-- public errata projection runs through normal RLS as the caller.
DROP VIEW IF EXISTS public.public_errata;

-- Restore a public read policy for published errata rows. Column-level
-- grants below are what actually decide which fields anon/authenticated
-- can pull through PostgREST — contact_email / user_agent /
-- suggested_correction stay admin-only.
CREATE POLICY "Anyone can view published errata"
  ON public.inaccuracy_reports
  FOR SELECT
  TO anon, authenticated
  USING (status = 'published');

-- Revoke any blanket SELECT then grant only the safe columns.
REVOKE SELECT ON public.inaccuracy_reports FROM anon, authenticated;

GRANT SELECT
  (id, topic_id, topic_title, topic_url, quoted_text, message,
   public_note, reviewed_at, created_at, status)
  ON public.inaccuracy_reports
  TO anon, authenticated;