CREATE TABLE public.viva_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid(),
  exam text NOT NULL CHECK (exam IN ('primary','final','fficm')),
  topic_id text NOT NULL,
  topic_title text NOT NULL,
  question text NOT NULL CHECK (char_length(question) <= 4000),
  answer text NOT NULL CHECK (char_length(answer) <= 20000),
  score numeric NOT NULL CHECK (score >= 0 AND score <= 10),
  verdict text,
  feedback jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX viva_attempts_user_created_idx ON public.viva_attempts (user_id, created_at DESC);
GRANT SELECT, INSERT, DELETE ON public.viva_attempts TO authenticated;
GRANT ALL ON public.viva_attempts TO service_role;
ALTER TABLE public.viva_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own attempts read" ON public.viva_attempts FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Own attempts insert" ON public.viva_attempts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own attempts delete" ON public.viva_attempts FOR DELETE TO authenticated USING (auth.uid() = user_id);