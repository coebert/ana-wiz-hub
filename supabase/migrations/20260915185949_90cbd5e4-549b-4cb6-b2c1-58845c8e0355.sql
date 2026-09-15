CREATE TABLE public.podcast_rerecord_jobs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  status text NOT NULL DEFAULT 'queued',
  voices text[] NOT NULL DEFAULT '{}',
  total integer NOT NULL DEFAULT 0,
  processed integer NOT NULL DEFAULT 0,
  succeeded integer NOT NULL DEFAULT 0,
  failed integer NOT NULL DEFAULT 0,
  skipped integer NOT NULL DEFAULT 0,
  current_topic text,
  current_voice text,
  last_error text,
  paused boolean NOT NULL DEFAULT false,
  paused_reason text,
  created_by uuid,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  completed_at timestamp with time zone
);

GRANT SELECT, INSERT, UPDATE ON public.podcast_rerecord_jobs TO authenticated;
GRANT ALL ON public.podcast_rerecord_jobs TO service_role;

ALTER TABLE public.podcast_rerecord_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view rerecord jobs"
  ON public.podcast_rerecord_jobs FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create rerecord jobs"
  ON public.podcast_rerecord_jobs FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update rerecord jobs"
  ON public.podcast_rerecord_jobs FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.podcast_rerecord_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id uuid NOT NULL REFERENCES public.podcast_rerecord_jobs(id) ON DELETE CASCADE,
  topic_id text NOT NULL,
  topic_title text NOT NULL,
  topic_path text NOT NULL,
  voice text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  attempts integer NOT NULL DEFAULT 0,
  error_message text,
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (job_id, topic_id, voice)
);

CREATE INDEX podcast_rerecord_items_job_status_idx
  ON public.podcast_rerecord_items (job_id, status);

GRANT SELECT, INSERT, UPDATE ON public.podcast_rerecord_items TO authenticated;
GRANT ALL ON public.podcast_rerecord_items TO service_role;

ALTER TABLE public.podcast_rerecord_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view rerecord items"
  ON public.podcast_rerecord_items FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create rerecord items"
  ON public.podcast_rerecord_items FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update rerecord items"
  ON public.podcast_rerecord_items FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER podcast_rerecord_jobs_updated_at
  BEFORE UPDATE ON public.podcast_rerecord_jobs
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TRIGGER podcast_rerecord_items_updated_at
  BEFORE UPDATE ON public.podcast_rerecord_items
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

ALTER TABLE public.podcasts
  ADD COLUMN IF NOT EXISTS regenerating boolean NOT NULL DEFAULT false;