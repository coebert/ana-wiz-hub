
CREATE TABLE public.ask_qa_library (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  normalized text NOT NULL UNIQUE,
  question text NOT NULL,
  answer text NOT NULL,
  ask_count integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX ask_qa_library_updated_at_idx ON public.ask_qa_library (updated_at DESC);

GRANT SELECT ON public.ask_qa_library TO anon;
GRANT SELECT ON public.ask_qa_library TO authenticated;
GRANT ALL ON public.ask_qa_library TO service_role;

ALTER TABLE public.ask_qa_library ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ask AI library is publicly readable"
  ON public.ask_qa_library
  FOR SELECT
  USING (true);

CREATE TRIGGER ask_qa_library_set_updated_at
  BEFORE UPDATE ON public.ask_qa_library
  FOR EACH ROW
  EXECUTE FUNCTION public.update_drugs_updated_at();
