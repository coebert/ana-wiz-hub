CREATE TABLE public.topic_audit_topic_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id uuid NOT NULL,
  topic_id text NOT NULL,
  topic_title text NOT NULL,
  section text NOT NULL,
  topic_url text,
  status text NOT NULL DEFAULT 'pending',
  started_at timestamptz,
  completed_at timestamptz,
  duration_ms integer,
  error_message text,
  stages jsonb NOT NULL DEFAULT '{}'::jsonb,
  findings_count integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX topic_audit_topic_logs_job_id_idx ON public.topic_audit_topic_logs (job_id, created_at DESC);
CREATE UNIQUE INDEX topic_audit_topic_logs_job_topic_idx ON public.topic_audit_topic_logs (job_id, section, topic_id);

ALTER TABLE public.topic_audit_topic_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins view topic audit logs"
  ON public.topic_audit_topic_logs FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update topic audit logs"
  ON public.topic_audit_topic_logs FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete topic audit logs"
  ON public.topic_audit_topic_logs FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

ALTER PUBLICATION supabase_realtime ADD TABLE public.topic_audit_topic_logs;