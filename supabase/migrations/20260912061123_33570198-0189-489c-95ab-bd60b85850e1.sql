CREATE TABLE public.content_overrides (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id text NOT NULL,
  topic_title text NOT NULL DEFAULT '',
  kind text NOT NULL CHECK (kind IN ('note','correction','subsection','key_point','reference')),
  anchor text,
  heading text,
  body text NOT NULL DEFAULT '',
  original_text text,
  ref_label text,
  ref_url text,
  ref_pmid text,
  ref_excerpt text,
  position integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','live','merged','archived')),
  queued boolean NOT NULL DEFAULT true,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX content_overrides_topic_idx ON public.content_overrides (topic_id, status);

GRANT SELECT ON public.content_overrides TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.content_overrides TO authenticated;
GRANT ALL ON public.content_overrides TO service_role;

ALTER TABLE public.content_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read live content edits"
ON public.content_overrides FOR SELECT
TO anon, authenticated
USING (status = 'live');

CREATE POLICY "Admins can read all content edits"
ON public.content_overrides FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert content edits"
ON public.content_overrides FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update content edits"
ON public.content_overrides FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete content edits"
ON public.content_overrides FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER content_overrides_touch
BEFORE UPDATE ON public.content_overrides
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();