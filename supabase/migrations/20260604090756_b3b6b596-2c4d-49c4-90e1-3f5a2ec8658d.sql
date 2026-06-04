-- Drop the broad public-row policy that exposed every column (including
-- contact_email, user_agent, suggested_correction) via PostgREST.
DROP POLICY IF EXISTS "Anyone can view published errata" ON public.inaccuracy_reports;

-- Restricted view: only the columns the public Errata page renders.
-- security_invoker=on so admin RLS on the base table is bypassed for the
-- intentionally-public projection but no other rows leak.
CREATE OR REPLACE VIEW public.public_errata
WITH (security_invoker = off) AS
SELECT
  id,
  topic_id,
  topic_title,
  topic_url,
  quoted_text,
  message,
  public_note,
  reviewed_at,
  created_at
FROM public.inaccuracy_reports
WHERE status = 'published';

REVOKE ALL ON public.public_errata FROM PUBLIC;
GRANT SELECT ON public.public_errata TO anon, authenticated;
GRANT ALL ON public.public_errata TO service_role;