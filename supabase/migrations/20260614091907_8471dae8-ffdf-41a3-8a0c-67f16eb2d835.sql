UPDATE public.topic_audit_jobs
SET status = 'cancelled',
    last_error = 'Firecrawl returned HTTP 402 (insufficient credits) on every page fetch — job cancelled to avoid a misleading clean audit. Top up Firecrawl credits and re-run.',
    completed_at = now(),
    updated_at = now()
WHERE id = 'fa5cb4ab-0399-4f06-a899-1644baadc235'
  AND status = 'running';