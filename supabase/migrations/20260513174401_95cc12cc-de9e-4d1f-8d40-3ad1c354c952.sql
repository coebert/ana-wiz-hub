
CREATE TABLE public.seo_scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  base_url text NOT NULL,
  commit_sha text,
  pages_total integer NOT NULL DEFAULT 0,
  pages_ok integer NOT NULL DEFAULT 0,
  pages_failed integer NOT NULL DEFAULT 0,
  findings_count integer NOT NULL DEFAULT 0,
  duration_ms integer,
  results jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX seo_scans_created_at_idx ON public.seo_scans (created_at DESC);

ALTER TABLE public.seo_scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view seo scans"
  ON public.seo_scans
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));
