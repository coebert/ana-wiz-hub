ALTER TABLE public.drugs
  ADD COLUMN IF NOT EXISTS sources jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS requires_tdm boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS tdm jsonb NOT NULL DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS dilutions jsonb NOT NULL DEFAULT '[]'::jsonb;

CREATE INDEX IF NOT EXISTS drugs_requires_tdm_idx ON public.drugs (requires_tdm);