CREATE OR REPLACE VIEW public.public_errata
WITH (security_invoker = on) AS
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

REVOKE SELECT ON public.inaccuracy_reports FROM anon, authenticated;
GRANT SELECT
  (id, topic_id, topic_title, topic_url, quoted_text, message,
   public_note, reviewed_at, created_at, status)
  ON public.inaccuracy_reports
  TO anon, authenticated;

REVOKE ALL ON public.public_errata FROM PUBLIC;
GRANT SELECT ON public.public_errata TO anon, authenticated;
GRANT ALL ON public.public_errata TO service_role;