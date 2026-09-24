ALTER TABLE public.donations ADD COLUMN IF NOT EXISTS external_id text;
CREATE UNIQUE INDEX IF NOT EXISTS donations_external_id_key ON public.donations(external_id) WHERE external_id IS NOT NULL;
GRANT ALL ON public.donations TO service_role;