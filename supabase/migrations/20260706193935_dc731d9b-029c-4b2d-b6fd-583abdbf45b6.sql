-- User-scoped topic completion + recent-visit sync for signed-in users.
-- Anonymous users keep using localStorage; contexts will migrate localStorage
-- into these tables on first sign-in.

CREATE TABLE public.user_topic_progress (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, topic_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_topic_progress TO authenticated;
GRANT ALL ON public.user_topic_progress TO service_role;
ALTER TABLE public.user_topic_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own topic progress"
  ON public.user_topic_progress
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
CREATE INDEX idx_user_topic_progress_user ON public.user_topic_progress(user_id);

CREATE TABLE public.user_recent_topics (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  visited_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, topic_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_recent_topics TO authenticated;
GRANT ALL ON public.user_recent_topics TO service_role;
ALTER TABLE public.user_recent_topics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own recent topics"
  ON public.user_recent_topics
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
CREATE INDEX idx_user_recent_topics_user_visited
  ON public.user_recent_topics(user_id, visited_at DESC);
