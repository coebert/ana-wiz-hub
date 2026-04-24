-- Cache for AI-generated viva model answers, keyed by exam + question hash.
CREATE TABLE public.viva_model_answers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  exam TEXT NOT NULL,
  question TEXT NOT NULL,
  question_hash TEXT NOT NULL,
  topic_title TEXT NOT NULL,
  model_answer TEXT NOT NULL,
  high_yield_points JSONB NOT NULL DEFAULT '[]'::jsonb,
  pitfalls JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Same question (case/whitespace-normalised hash) at the same exam standard
-- should only be generated once.
CREATE UNIQUE INDEX viva_model_answers_exam_hash_key
  ON public.viva_model_answers (exam, question_hash);

ALTER TABLE public.viva_model_answers ENABLE ROW LEVEL SECURITY;

-- Cached model answers are reusable by anyone hitting the same question.
CREATE POLICY "Anyone can view cached model answers"
  ON public.viva_model_answers
  FOR SELECT
  USING (true);

-- Writes happen only from the edge function (service role bypasses RLS),
-- so no INSERT/UPDATE/DELETE policies are exposed to clients.

-- Auto-bump updated_at on row changes (reuses the existing helper function pattern).
CREATE OR REPLACE FUNCTION public.update_viva_model_answers_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_viva_model_answers_updated_at
BEFORE UPDATE ON public.viva_model_answers
FOR EACH ROW
EXECUTE FUNCTION public.update_viva_model_answers_updated_at();