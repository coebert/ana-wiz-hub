ALTER TABLE public.app_visits
  ADD COLUMN IF NOT EXISTS referrer text,
  ADD COLUMN IF NOT EXISTS traffic_source text;

-- Update existing insert policy to allow the new optional fields. The existing
-- WITH CHECK only validates visitor_id/page_path bounds, so we extend it with
-- length bounds for the new fields so it stays explicit.
DROP POLICY IF EXISTS "Anyone can insert visits" ON public.app_visits;
CREATE POLICY "Anyone can insert visits"
  ON public.app_visits
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    visitor_id IS NOT NULL
    AND length(visitor_id) BETWEEN 1 AND 128
    AND (page_path IS NULL OR length(page_path) <= 512)
    AND (referrer IS NULL OR length(referrer) <= 1024)
    AND (traffic_source IS NULL OR length(traffic_source) <= 32)
  );