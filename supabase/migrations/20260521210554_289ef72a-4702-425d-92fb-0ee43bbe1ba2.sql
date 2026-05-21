CREATE OR REPLACE FUNCTION public.enforce_fixed_findings_have_citations()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'fixed'
     AND (OLD.status IS DISTINCT FROM 'fixed')
  THEN
    IF (NEW.unverifiable_reason IS NULL OR length(trim(NEW.unverifiable_reason)) = 0)
       AND (NEW.sources IS NULL OR jsonb_array_length(NEW.sources) = 0)
    THEN
      RAISE EXCEPTION
        'Cannot mark finding % as fixed: no source citations recorded. Add at least one entry to sources (matching an InlineRef / sectionSources citation in the topic file), or set unverifiable_reason to document why this finding cannot be cited (e.g. transient scrape failure).',
        NEW.id
        USING ERRCODE = 'check_violation';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;