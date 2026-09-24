CREATE TABLE public.donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  donated_on date NOT NULL DEFAULT CURRENT_DATE,
  amount numeric(10,2) NOT NULL CHECK (amount > 0),
  currency text NOT NULL DEFAULT 'GBP',
  donor_name text,
  method text NOT NULL DEFAULT 'PayPal',
  note text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.donations TO authenticated;
GRANT ALL ON public.donations TO service_role;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage donations" ON public.donations FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.donation_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clicked_at timestamptz NOT NULL DEFAULT now(),
  source text NOT NULL DEFAULT 'unknown' CHECK (length(source) <= 60)
);
GRANT INSERT ON public.donation_clicks TO anon, authenticated;
GRANT SELECT ON public.donation_clicks TO authenticated;
GRANT ALL ON public.donation_clicks TO service_role;
ALTER TABLE public.donation_clicks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can log a donate click" ON public.donation_clicks FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins read donate clicks" ON public.donation_clicks FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));