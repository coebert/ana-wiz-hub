UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(),
    unverifiable_reason = 'Transient Firecrawl SCRAPE_TIMEOUT on /intensive-care/ards — page renders correctly; no content fix required.'
WHERE id = '7e21f57c-461f-4562-b5b1-eeee98c7d90f';

UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now()
WHERE id IN (
  '5ecd23e5-83af-43d7-bda8-ca659c9702d8',
  '832e45a0-3ed2-4cc6-a6e8-feb9e8096095'
);