DO $$
DECLARE
  r record;
  seven text := '((source = ANY (ARRAY[''home-note''::text, ''support-box''::text, ''support-card-3gbp''::text, ''support-card-5gbp''::text, ''support-card-10gbp''::text, ''support-card-other''::text, ''support-card-stripe''::text])) AND (clicked_at >= (now() - ''00:05:00''::interval)) AND (clicked_at <= (now() + ''00:05:00''::interval)))';
  eight text := '((source = ANY (ARRAY[''home-note''::text, ''support-box''::text, ''support-card-3gbp''::text, ''support-card-5gbp''::text, ''support-card-10gbp''::text, ''support-card-other''::text, ''support-card-stripe''::text, ''support-card-buymeacoffee''::text])) AND (clicked_at >= (now() - ''00:05:00''::interval)) AND (clicked_at <= (now() + ''00:05:00''::interval)))';
BEGIN
  SELECT * INTO r FROM pg_policies WHERE schemaname='public' AND tablename='donation_clicks' AND policyname='Anyone can log a valid donate click';
  IF NOT FOUND THEN RAISE EXCEPTION 'Expected donation click policy missing; inspect before changing'; END IF;
  IF r.cmd <> 'INSERT' OR r.permissive <> 'PERMISSIVE' OR r.qual IS NOT NULL OR r.roles::text[] <> ARRAY['anon','authenticated']::text[] THEN
    RAISE EXCEPTION 'Unexpected donation click policy shape; refusing replacement';
  END IF;
  IF r.with_check = eight THEN RETURN; END IF;
  IF r.with_check IS DISTINCT FROM seven THEN RAISE EXCEPTION 'Unexpected donation click predicate; refusing replacement'; END IF;
  EXECUTE 'ALTER POLICY "Anyone can log a valid donate click" ON public.donation_clicks WITH CHECK (source = ANY (ARRAY[''home-note'',''support-box'',''support-card-3gbp'',''support-card-5gbp'',''support-card-10gbp'',''support-card-other'',''support-card-stripe'',''support-card-buymeacoffee'']::text[]) AND clicked_at >= now() - interval ''5 minutes'' AND clicked_at <= now() + interval ''5 minutes'')';
END $$;