CREATE TABLE public.srs_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  card_id text NOT NULL,
  topic_id text NOT NULL,
  topic_title text NOT NULL,
  topic_section text NOT NULL,
  topic_path text NOT NULL,
  exam_tags text[] NOT NULL DEFAULT '{}',
  question text NOT NULL,
  options jsonb NOT NULL DEFAULT '[]'::jsonb,
  correct_index integer NOT NULL,
  explanation text NOT NULL DEFAULT '',
  ease numeric NOT NULL DEFAULT 2.5,
  interval_days integer NOT NULL DEFAULT 0,
  repetitions integer NOT NULL DEFAULT 0,
  lapses integer NOT NULL DEFAULT 0,
  due_at timestamptz NOT NULL DEFAULT now(),
  last_grade smallint,
  last_reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, card_id)
);

CREATE INDEX srs_reviews_user_due_idx ON public.srs_reviews (user_id, due_at);
CREATE INDEX srs_reviews_user_exam_tags_idx ON public.srs_reviews USING gin (exam_tags);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.srs_reviews TO authenticated;
GRANT ALL ON public.srs_reviews TO service_role;

ALTER TABLE public.srs_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own reviews"
  ON public.srs_reviews FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own reviews"
  ON public.srs_reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users update own reviews"
  ON public.srs_reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own reviews"
  ON public.srs_reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE TRIGGER srs_reviews_set_updated_at
  BEFORE UPDATE ON public.srs_reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.update_drugs_updated_at();