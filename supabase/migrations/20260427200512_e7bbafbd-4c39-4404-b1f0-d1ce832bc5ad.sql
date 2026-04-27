
CREATE TABLE public.drugs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  drug_class text NOT NULL,
  synonyms text[] NOT NULL DEFAULT '{}',
  indication_oneliner text NOT NULL DEFAULT '',
  key_warning text NOT NULL DEFAULT '',
  adult_bolus_dose text NOT NULL DEFAULT '',
  infusion_range text NOT NULL DEFAULT '',
  presentation text NOT NULL DEFAULT '',
  mechanism_of_action text NOT NULL DEFAULT '',
  pharmacokinetics text NOT NULL DEFAULT '',
  preparation text NOT NULL DEFAULT '',
  dosing text NOT NULL DEFAULT '',
  monitoring text NOT NULL DEFAULT '',
  side_effects text NOT NULL DEFAULT '',
  contraindications text NOT NULL DEFAULT '',
  interactions text NOT NULL DEFAULT '',
  -- Standard infusion preparation for in-page calculator
  -- e.g. {"amount_mg":8,"diluent_ml":50,"unit":"mcg/kg/min","weight_based":true}
  infusion_standard jsonb NOT NULL DEFAULT '{}'::jsonb,
  related_topic_ids text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.drugs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view drugs"
  ON public.drugs FOR SELECT
  USING (true);

CREATE INDEX drugs_drug_class_idx ON public.drugs (drug_class);
CREATE INDEX drugs_name_idx ON public.drugs (lower(name));

CREATE OR REPLACE FUNCTION public.update_drugs_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_drugs_updated_at
  BEFORE UPDATE ON public.drugs
  FOR EACH ROW EXECUTE FUNCTION public.update_drugs_updated_at();
