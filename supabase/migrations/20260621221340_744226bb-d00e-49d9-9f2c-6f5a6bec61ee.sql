-- 1. Reviews: hide soft-deleted rows from the public.
DROP POLICY IF EXISTS "Anyone can view approved or deleted reviews" ON public.reviews;
CREATE POLICY "Anyone can view approved reviews"
  ON public.reviews
  FOR SELECT
  USING (status = 'approved');

-- 2. Inaccuracy reports: lock down PII columns at the column-grant level
--    so even a direct PostgREST request cannot read them. The
--    scrub_published_errata_pii trigger already nullifies these on
--    publish; this is defence in depth.
REVOKE SELECT (contact_email, user_agent) ON public.inaccuracy_reports FROM anon;
REVOKE SELECT (contact_email, user_agent) ON public.inaccuracy_reports FROM authenticated;

-- 3. Podcasts: explicitly revoke SELECT on the internal error_message
--    column from public roles. service_role keeps full access for the
--    background generation pipeline.
REVOKE SELECT (error_message) ON public.podcasts FROM anon;
REVOKE SELECT (error_message) ON public.podcasts FROM authenticated;