-- Nullify PII when an errata report is published, and scrub existing published rows.
CREATE OR REPLACE FUNCTION public.scrub_published_errata_pii()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.status = 'published' THEN
    NEW.contact_email := NULL;
    NEW.user_agent := NULL;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS scrub_published_errata_pii_trg ON public.inaccuracy_reports;
CREATE TRIGGER scrub_published_errata_pii_trg
  BEFORE INSERT OR UPDATE ON public.inaccuracy_reports
  FOR EACH ROW EXECUTE FUNCTION public.scrub_published_errata_pii();

-- Scrub any already-published rows
UPDATE public.inaccuracy_reports
SET contact_email = NULL, user_agent = NULL
WHERE status = 'published'
  AND (contact_email IS NOT NULL OR user_agent IS NOT NULL);