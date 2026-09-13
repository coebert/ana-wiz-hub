-- 1) Correction reports: remove direct public read of the table; the public_errata view (no contact_email) stays the only public path
DROP POLICY IF EXISTS "Anyone can view published errata" ON public.inaccuracy_reports;
REVOKE SELECT ON public.inaccuracy_reports FROM anon;

-- 2) Discussion moderation
ALTER TABLE public.topic_discussions
  ADD COLUMN IF NOT EXISTS is_hidden boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS hidden_reason text,
  ADD COLUMN IF NOT EXISTS flag_count integer NOT NULL DEFAULT 0;

DROP POLICY IF EXISTS "Discussions are publicly readable" ON public.topic_discussions;
CREATE POLICY "Visible discussions are publicly readable"
  ON public.topic_discussions FOR SELECT
  USING (is_hidden = false);

CREATE POLICY "Admins can view all discussions"
  ON public.topic_discussions FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can moderate discussions"
  ON public.topic_discussions FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete discussions"
  ON public.topic_discussions FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

GRANT UPDATE ON public.topic_discussions TO authenticated;

-- Flag/report queue
CREATE TABLE IF NOT EXISTS public.discussion_flags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discussion_id uuid NOT NULL REFERENCES public.topic_discussions(id) ON DELETE CASCADE,
  reporter_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (discussion_id, reporter_id)
);

GRANT SELECT, INSERT ON public.discussion_flags TO authenticated;
GRANT ALL ON public.discussion_flags TO service_role;
ALTER TABLE public.discussion_flags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Signed-in learners can flag a post"
  ON public.discussion_flags FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = reporter_id AND (reason IS NULL OR length(reason) <= 500));

CREATE POLICY "Reporters can see their own flags"
  ON public.discussion_flags FOR SELECT TO authenticated
  USING (auth.uid() = reporter_id OR public.has_role(auth.uid(), 'admin'::app_role));

CREATE OR REPLACE FUNCTION public.apply_discussion_flag()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.topic_discussions
  SET flag_count = flag_count + 1,
      is_hidden = CASE WHEN flag_count + 1 >= 3 THEN true ELSE is_hidden END,
      hidden_reason = CASE WHEN flag_count + 1 >= 3 THEN 'Automatically hidden pending review after multiple reports' ELSE hidden_reason END
  WHERE id = NEW.discussion_id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS apply_discussion_flag_trg ON public.discussion_flags;
CREATE TRIGGER apply_discussion_flag_trg
  AFTER INSERT ON public.discussion_flags
  FOR EACH ROW EXECUTE FUNCTION public.apply_discussion_flag();