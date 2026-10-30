DO $$
DECLARE
  chk text;
  six text := '((source = ANY (ARRAY[''home-note''::text, ''support-box''::text, ''support-card-3gbp''::text, ''support-card-5gbp''::text, ''support-card-10gbp''::text, ''support-card-other''::text])) AND (clicked_at >= (now() - ''00:05:00''::interval)) AND (clicked_at <= (now() + ''00:05:00''::interval)))';
  two text := '((source = ANY (ARRAY[''home-note''::text, ''support-box''::text])) AND (clicked_at >= (now() - ''00:05:00''::interval)) AND (clicked_at <= (now() + ''00:05:00''::interval)))';
  seven text := '((source = ANY (ARRAY[''home-note''::text, ''support-box''::text, ''support-card-3gbp''::text, ''support-card-5gbp''::text, ''support-card-10gbp''::text, ''support-card-other''::text, ''support-card-stripe''::text])) AND (clicked_at >= (now() - ''00:05:00''::interval)) AND (clicked_at <= (now() + ''00:05:00''::interval)))';
  r record;
BEGIN
  SELECT * INTO r FROM pg_policies WHERE schemaname='public' AND tablename='donation_clicks' AND policyname='Anyone can log a valid donate click';
  IF NOT FOUND THEN RAISE EXCEPTION 'donation_clicks INSERT policy missing; inspect before changing'; END IF;
  IF r.cmd <> 'INSERT' OR r.permissive <> 'PERMISSIVE' OR r.qual IS NOT NULL OR r.roles::text[] <> ARRAY['anon','authenticated']::text[] THEN
    RAISE EXCEPTION 'unexpected donation_clicks policy shape; inspect';
  END IF;
  chk := r.with_check;
  IF chk = seven THEN RETURN; END IF;
  IF chk <> six AND chk <> two THEN RAISE EXCEPTION 'unexpected donation_clicks predicate: %', chk; END IF;
  EXECUTE 'ALTER POLICY "Anyone can log a valid donate click" ON public.donation_clicks WITH CHECK (source = ANY (ARRAY[''home-note'',''support-box'',''support-card-3gbp'',''support-card-5gbp'',''support-card-10gbp'',''support-card-other'',''support-card-stripe'']::text[]) AND clicked_at >= now() - interval ''5 minutes'' AND clicked_at <= now() + interval ''5 minutes'')';
END $$;