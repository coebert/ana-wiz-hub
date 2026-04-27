
-- Track formulary verification jobs
CREATE TABLE IF NOT EXISTS public.drug_verification_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  status text NOT NULL DEFAULT 'pending', -- pending | running | completed | failed | cancelled
  total integer NOT NULL DEFAULT 0,
  processed integer NOT NULL DEFAULT 0,
  succeeded integer NOT NULL DEFAULT 0,
  failed integer NOT NULL DEFAULT 0,
  current_drug text,
  last_error text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE public.drug_verification_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view jobs"
  ON public.drug_verification_jobs FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert jobs"
  ON public.drug_verification_jobs FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update jobs"
  ON public.drug_verification_jobs FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Per-drug audit log
CREATE TABLE IF NOT EXISTS public.drug_verification_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES public.drug_verification_jobs(id) ON DELETE CASCADE,
  drug_slug text NOT NULL,
  drug_name text NOT NULL,
  status text NOT NULL, -- updated | unchanged | failed
  fields_changed text[] NOT NULL DEFAULT '{}',
  error text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.drug_verification_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view log"
  ON public.drug_verification_log FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert log"
  ON public.drug_verification_log FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Allow admins to update the drugs table (currently no UPDATE policy)
CREATE POLICY "Admins can update drugs"
  ON public.drugs FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
