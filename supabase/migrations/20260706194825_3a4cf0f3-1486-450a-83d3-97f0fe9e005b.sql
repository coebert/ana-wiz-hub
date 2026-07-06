CREATE TABLE public.user_subsection_progress (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  subsection_id TEXT NOT NULL,
  checked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, topic_id, subsection_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_subsection_progress TO authenticated;
GRANT ALL ON public.user_subsection_progress TO service_role;
ALTER TABLE public.user_subsection_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own subsection progress"
  ON public.user_subsection_progress
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
CREATE INDEX idx_user_subsection_progress_user_topic
  ON public.user_subsection_progress(user_id, topic_id);
