
-- Extensions for scheduled background audits
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Job table: one row per audit sweep
CREATE TABLE public.topic_audit_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status TEXT NOT NULL DEFAULT 'pending', -- pending|running|completed|failed|cancelled
  trigger TEXT NOT NULL DEFAULT 'manual', -- manual|scheduled
  triggered_by UUID,
  total INTEGER NOT NULL DEFAULT 0,
  processed INTEGER NOT NULL DEFAULT 0,
  succeeded INTEGER NOT NULL DEFAULT 0,
  failed INTEGER NOT NULL DEFAULT 0,
  findings_count INTEGER NOT NULL DEFAULT 0,
  current_topic TEXT,
  last_error TEXT,
  options JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_topic_audit_jobs_created ON public.topic_audit_jobs (created_at DESC);

-- Findings table
CREATE TABLE public.topic_audit_findings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES public.topic_audit_jobs(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  topic_title TEXT NOT NULL,
  section TEXT NOT NULL,
  topic_url TEXT,
  severity TEXT NOT NULL DEFAULT 'minor', -- info|minor|major|critical
  category TEXT NOT NULL DEFAULT 'factual', -- factual|outdated|missing|citation|diagram|terminology
  summary TEXT NOT NULL,
  details TEXT,
  suggested_fix TEXT,
  sources JSONB NOT NULL DEFAULT '[]'::jsonb, -- [{title,url}]
  diagram_ref TEXT, -- screenshot/image URL inspected
  status TEXT NOT NULL DEFAULT 'open', -- open|acknowledged|fixed|dismissed
  resolved_by UUID,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_topic_audit_findings_job ON public.topic_audit_findings (job_id);
CREATE INDEX idx_topic_audit_findings_topic ON public.topic_audit_findings (topic_id);
CREATE INDEX idx_topic_audit_findings_status ON public.topic_audit_findings (status);
CREATE INDEX idx_topic_audit_findings_severity ON public.topic_audit_findings (severity);

ALTER TABLE public.topic_audit_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_audit_findings ENABLE ROW LEVEL SECURITY;

-- Admin-only policies (service role bypasses RLS automatically)
CREATE POLICY "Admins view audit jobs"
  ON public.topic_audit_jobs FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update audit jobs"
  ON public.topic_audit_jobs FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins view audit findings"
  ON public.topic_audit_findings FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update audit findings"
  ON public.topic_audit_findings FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete audit findings"
  ON public.topic_audit_findings FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Weekly cron: Sunday 03:00 UTC -> invoke audit-topics edge function
SELECT cron.schedule(
  'weekly-topic-audit',
  '0 3 * * 0',
  $$
  SELECT net.http_post(
    url := 'https://aqkusdwwhlqqttvnxuwu.supabase.co/functions/v1/audit-topics',
    headers := '{"Content-Type":"application/json","apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxa3VzZHd3aGxxcXR0dm54dXd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NjY5MzQsImV4cCI6MjA5MTA0MjkzNH0.nsUXCjevjUkKCETKdJmJRZgTIdpKf6jJ5EsEFr-D1T4"}'::jsonb,
    body := '{"action":"start","trigger":"scheduled"}'::jsonb
  );
  $$
);
