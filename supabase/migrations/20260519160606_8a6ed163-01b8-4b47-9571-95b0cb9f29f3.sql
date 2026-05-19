CREATE TABLE public.topic_references (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id text NOT NULL UNIQUE,
  topic_title text NOT NULL,
  section text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  refs jsonb NOT NULL DEFAULT '[]'::jsonb,
  error_message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.topic_references ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view topic references"
  ON public.topic_references FOR SELECT
  USING (true);

CREATE OR REPLACE FUNCTION public.update_topic_references_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_topic_references_updated_at
BEFORE UPDATE ON public.topic_references
FOR EACH ROW EXECUTE FUNCTION public.update_topic_references_updated_at();

CREATE INDEX idx_topic_references_section ON public.topic_references(section);
CREATE INDEX idx_topic_references_status ON public.topic_references(status);