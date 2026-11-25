CREATE TABLE public.podcast_review_drafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id text NOT NULL UNIQUE,
  topic_title text NOT NULL,
  hold_reasons jsonb NOT NULL DEFAULT '[]'::jsonb,
  draft_script text NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','approved','rejected','recorded')),
  review_note text,
  reviewed_by uuid,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.podcast_review_drafts TO authenticated;
GRANT ALL ON public.podcast_review_drafts TO service_role;
ALTER TABLE public.podcast_review_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read held drafts" ON public.podcast_review_drafts FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins review held drafts" ON public.podcast_review_drafts FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin') AND status IN ('draft','approved','rejected'));

CREATE OR REPLACE FUNCTION public.guard_podcast_review_draft()
RETURNS trigger LANGUAGE plpgsql SET search_path TO 'public' AS $$
BEGIN
  NEW.updated_at := now();
  IF current_user IN ('service_role','postgres','supabase_admin') THEN RETURN NEW; END IF;
  IF OLD.status = 'recorded' THEN RAISE EXCEPTION 'Recorded drafts are final'; END IF;
  IF NEW.topic_id IS DISTINCT FROM OLD.topic_id OR NEW.hold_reasons IS DISTINCT FROM OLD.hold_reasons THEN RAISE EXCEPTION 'Topic and hold reasons cannot be edited'; END IF;
  IF NEW.status = 'approved' THEN
    IF char_length(btrim(NEW.draft_script)) < 500 THEN RAISE EXCEPTION 'Script is too short to approve'; END IF;
    NEW.reviewed_by := auth.uid(); NEW.reviewed_at := now();
  ELSIF NEW.draft_script IS DISTINCT FROM OLD.draft_script THEN
    NEW.status := 'draft'; NEW.reviewed_by := NULL; NEW.reviewed_at := NULL;
  ELSE
    NEW.reviewed_by := auth.uid(); NEW.reviewed_at := now();
  END IF;
  IF OLD.status = 'approved' AND NEW.status = 'approved' AND NEW.draft_script IS DISTINCT FROM OLD.draft_script THEN
    NEW.status := 'draft'; NEW.reviewed_by := NULL; NEW.reviewed_at := NULL;
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER guard_podcast_review_draft BEFORE UPDATE ON public.podcast_review_drafts FOR EACH ROW EXECUTE FUNCTION public.guard_podcast_review_draft();