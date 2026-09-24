DROP POLICY IF EXISTS "Anyone can log a donate click" ON public.donation_clicks;
CREATE POLICY "Anyone can log a valid donate click"
ON public.donation_clicks FOR INSERT TO anon, authenticated
WITH CHECK (
  source IN ('home-note', 'support-box')
  AND clicked_at BETWEEN now() - interval '5 minutes' AND now() + interval '5 minutes'
);