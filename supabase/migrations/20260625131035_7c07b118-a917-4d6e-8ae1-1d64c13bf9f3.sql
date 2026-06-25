CREATE TABLE public.flagged_domains (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  domain text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','dismissed')),
  source text NOT NULL DEFAULT 'semrush',
  authority_score integer,
  trust_score integer,
  anchor_text_sample text,
  reason text,
  notes text,
  first_seen_at timestamp with time zone NOT NULL DEFAULT now(),
  last_seen_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.flagged_domains TO authenticated;
GRANT ALL ON public.flagged_domains TO service_role;

ALTER TABLE public.flagged_domains ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view flagged domains"
  ON public.flagged_domains FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert flagged domains"
  ON public.flagged_domains FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update flagged domains"
  ON public.flagged_domains FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete flagged domains"
  ON public.flagged_domains FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX flagged_domains_status_idx ON public.flagged_domains (status, last_seen_at DESC);

CREATE OR REPLACE FUNCTION public.update_flagged_domains_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_flagged_domains_updated_at
BEFORE UPDATE ON public.flagged_domains
FOR EACH ROW EXECUTE FUNCTION public.update_flagged_domains_updated_at();