ALTER TABLE public.app_visits
  ADD COLUMN IF NOT EXISTS country text,
  ADD COLUMN IF NOT EXISTS country_name text;

CREATE INDEX IF NOT EXISTS idx_app_visits_country ON public.app_visits(country);