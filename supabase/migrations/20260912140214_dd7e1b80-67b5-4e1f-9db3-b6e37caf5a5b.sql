CREATE TABLE public.topic_discussions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id text NOT NULL,
  topic_title text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author_label text NOT NULL,
  parent_id uuid REFERENCES public.topic_discussions(id) ON DELETE CASCADE,
  body text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX topic_discussions_topic_idx ON public.topic_discussions (topic_id, created_at);
CREATE INDEX topic_discussions_parent_idx ON public.topic_discussions (parent_id);

GRANT SELECT ON public.topic_discussions TO anon;
GRANT SELECT, INSERT, DELETE ON public.topic_discussions TO authenticated;
GRANT ALL ON public.topic_discussions TO service_role;

ALTER TABLE public.topic_discussions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Discussions are publicly readable"
  ON public.topic_discussions FOR SELECT
  USING (true);

CREATE POLICY "Signed-in learners can post as themselves"
  ON public.topic_discussions FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authors can delete their own messages"
  ON public.topic_discussions FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.validate_topic_discussion()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  parent_parent uuid;
BEGIN
  NEW.body := btrim(NEW.body);
  IF length(NEW.body) < 2 THEN
    RAISE EXCEPTION 'Message is too short';
  END IF;
  IF length(NEW.body) > 2000 THEN
    RAISE EXCEPTION 'Message is too long (max 2000 characters)';
  END IF;

  -- Never store an email address as the public display name.
  NEW.author_label := btrim(coalesce(NEW.author_label, ''));
  IF NEW.author_label = '' OR NEW.author_label ~ '@' THEN
    NEW.author_label := 'Learner ' || substr(NEW.user_id::text, 1, 4);
  END IF;
  NEW.author_label := left(NEW.author_label, 60);

  -- Replies are limited to one level.
  IF NEW.parent_id IS NOT NULL THEN
    SELECT parent_id INTO parent_parent FROM public.topic_discussions WHERE id = NEW.parent_id;
    IF parent_parent IS NOT NULL THEN
      RAISE EXCEPTION 'Replies cannot be nested further';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_topic_discussion_before_insert
  BEFORE INSERT ON public.topic_discussions
  FOR EACH ROW EXECUTE FUNCTION public.validate_topic_discussion();

ALTER PUBLICATION supabase_realtime ADD TABLE public.topic_discussions;