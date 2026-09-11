CREATE TABLE public.user_study_time (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id text NOT NULL,
  day date NOT NULL DEFAULT CURRENT_DATE,
  seconds integer NOT NULL DEFAULT 0,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, topic_id, day)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_study_time TO authenticated;
GRANT ALL ON public.user_study_time TO service_role;

ALTER TABLE public.user_study_time ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own study time"
  ON public.user_study_time FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_user_study_time_user_day ON public.user_study_time (user_id, day DESC);

CREATE OR REPLACE FUNCTION public.add_study_time(_topic_id text, _seconds integer, _day date DEFAULT CURRENT_DATE)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'not authenticated';
  END IF;
  IF _seconds IS NULL OR _seconds <= 0 OR _seconds > 14400 THEN
    RETURN;
  END IF;
  INSERT INTO public.user_study_time (user_id, topic_id, day, seconds)
  VALUES (auth.uid(), _topic_id, COALESCE(_day, CURRENT_DATE), _seconds)
  ON CONFLICT (user_id, topic_id, day)
  DO UPDATE SET seconds = public.user_study_time.seconds + EXCLUDED.seconds,
                updated_at = now();
END;
$$;

GRANT EXECUTE ON FUNCTION public.add_study_time(text, integer, date) TO authenticated;