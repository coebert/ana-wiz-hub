-- 1. Evidence columns on findings
ALTER TABLE public.topic_audit_findings
  ADD COLUMN IF NOT EXISTS evidence_quote text,
  ADD COLUMN IF NOT EXISTS evidence_doi text,
  ADD COLUMN IF NOT EXISTS evidence_pmid text,
  ADD COLUMN IF NOT EXISTS evidence_journal text,
  ADD COLUMN IF NOT EXISTS evidence_year integer,
  ADD COLUMN IF NOT EXISTS evidence_is_open_access boolean;

-- 2. Reference integrity checks
CREATE TABLE IF NOT EXISTS public.audit_reference_checks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id text NOT NULL,
  topic_title text NOT NULL,
  section text,
  reference_label text NOT NULL,
  citation text NOT NULL,
  url text,
  doi text,
  pmid text,
  status text NOT NULL DEFAULT 'ok',
  resolved_title text,
  resolved_journal text,
  resolved_year integer,
  title_similarity numeric,
  is_retracted boolean NOT NULL DEFAULT false,
  has_erratum boolean NOT NULL DEFAULT false,
  problems jsonb NOT NULL DEFAULT '[]'::jsonb,
  checked_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (topic_id, reference_label)
);

GRANT SELECT ON public.audit_reference_checks TO authenticated;
GRANT ALL ON public.audit_reference_checks TO service_role;
ALTER TABLE public.audit_reference_checks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read reference checks"
  ON public.audit_reference_checks FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- 3. Content gaps / expansion suggestions
CREATE TABLE IF NOT EXISTS public.audit_content_gaps (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id text NOT NULL,
  topic_title text NOT NULL,
  section text,
  gap_kind text NOT NULL DEFAULT 'uncited_review',
  summary text NOT NULL,
  rationale text,
  suggested_addition text,
  source_title text,
  source_journal text,
  source_year integer,
  source_doi text,
  source_pmid text,
  source_is_open_access boolean,
  status text NOT NULL DEFAULT 'open',
  resolved_by uuid,
  resolved_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE ON public.audit_content_gaps TO authenticated;
GRANT ALL ON public.audit_content_gaps TO service_role;
ALTER TABLE public.audit_content_gaps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read content gaps"
  ON public.audit_content_gaps FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update content gaps"
  ON public.audit_content_gaps FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE INDEX IF NOT EXISTS audit_content_gaps_topic_idx ON public.audit_content_gaps (topic_id, status);

-- 4. Single-row job state (lease + pause + rotation cursor)
CREATE TABLE IF NOT EXISTS public.audit_job_state (
  id text NOT NULL PRIMARY KEY DEFAULT 'content-audit',
  lease_owner text,
  lease_expires_at timestamp with time zone,
  paused boolean NOT NULL DEFAULT false,
  paused_reason text,
  paused_at timestamp with time zone,
  consecutive_rate_limits integer NOT NULL DEFAULT 0,
  cursor_topic_id text,
  last_run_at timestamp with time zone,
  last_batch_size integer,
  topics_audited_total integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, UPDATE ON public.audit_job_state TO authenticated;
GRANT ALL ON public.audit_job_state TO service_role;
ALTER TABLE public.audit_job_state ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can read audit job state"
  ON public.audit_job_state FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update audit job state"
  ON public.audit_job_state FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.audit_job_state (id) VALUES ('content-audit')
  ON CONFLICT (id) DO NOTHING;

-- 5. updated_at triggers
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS audit_reference_checks_touch ON public.audit_reference_checks;
CREATE TRIGGER audit_reference_checks_touch BEFORE UPDATE ON public.audit_reference_checks
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS audit_content_gaps_touch ON public.audit_content_gaps;
CREATE TRIGGER audit_content_gaps_touch BEFORE UPDATE ON public.audit_content_gaps
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS audit_job_state_touch ON public.audit_job_state;
CREATE TRIGGER audit_job_state_touch BEFORE UPDATE ON public.audit_job_state
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();