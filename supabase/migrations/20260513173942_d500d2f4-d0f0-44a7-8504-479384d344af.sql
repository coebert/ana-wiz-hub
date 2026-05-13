
CREATE TABLE public.lighthouse_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  url text NOT NULL,
  commit_sha text,
  branch text,
  lh_version text,
  score_performance smallint,
  score_accessibility smallint,
  score_best_practices smallint,
  score_seo smallint,
  lcp_ms integer,
  cls numeric(6,4),
  inp_ms integer,
  tbt_ms integer,
  report_path text,
  raw_summary jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX lighthouse_runs_created_at_idx ON public.lighthouse_runs (created_at DESC);
CREATE INDEX lighthouse_runs_url_created_at_idx ON public.lighthouse_runs (url, created_at DESC);

ALTER TABLE public.lighthouse_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view lighthouse runs"
  ON public.lighthouse_runs
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Private storage bucket for raw HTML reports
INSERT INTO storage.buckets (id, name, public)
VALUES ('lighthouse-reports', 'lighthouse-reports', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Admins can read lighthouse reports"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'lighthouse-reports'
    AND public.has_role(auth.uid(), 'admin'::public.app_role)
  );
