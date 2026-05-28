
UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(),
    unverifiable_reason = 'Transient Firecrawl scrape failure (502/408); page renders fine — no content issue to cite.'
WHERE id IN (
  '158b69f5-9131-4ee4-a69c-ff5c195c4aed',
  '2bd9fab8-a0bf-4ae5-9998-d5b7d78329b2',
  '93247bc5-9d92-4ea6-961a-c79624869d33',
  '0e8ca493-678c-4fa9-b1aa-d963841a2050',
  '9dc9086f-7473-4e9f-835f-703a96dffb32',
  'd544cca1-df1f-4ea5-ab55-fc3363d8ba3e'
);

UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(),
    unverifiable_reason = 'Diagram label clarified (P–MAPK / PI3K → MAPK / PI3K pathways); cosmetic, no external citation required.'
WHERE id = '37c30509-574e-454a-9591-a4c4695511e8';

UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(),
    unverifiable_reason = 'Diagram label corrected (SMV tributaries → Superior mesenteric v.) per Kenhub anatomy reference; label-only edit.'
WHERE id = '9d81c0ba-2403-450f-af9c-fc2e02357de9';

UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now()
WHERE id = '99d57d06-7c81-4a69-a9ac-bdae68df74cc';
