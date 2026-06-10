UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(), unverifiable_reason = 'Finding has no source URLs recorded; content corrected directly to match 2022 ESC/ERS guidelines'
WHERE id = '96e8a24a-3f41-47ae-91eb-bd5ff526930d';

UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(), unverifiable_reason = 'Transient Firecrawl scrape timeout; page exists and serves correctly'
WHERE id = '64632415-e87f-4936-b742-9c37f1c70214';