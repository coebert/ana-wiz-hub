REVOKE SELECT ON public.inaccuracy_reports FROM anon, authenticated;

GRANT SELECT
  (id, topic_id, topic_title, topic_url, quoted_text, message,
   public_note, reviewed_at, created_at, status)
  ON public.inaccuracy_reports
  TO anon;

GRANT SELECT ON public.inaccuracy_reports TO authenticated;
GRANT ALL ON public.inaccuracy_reports TO service_role;