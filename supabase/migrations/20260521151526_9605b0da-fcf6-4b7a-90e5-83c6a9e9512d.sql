
ALTER TABLE public.topic_audit_jobs
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

UPDATE public.topic_audit_jobs
SET status = 'failed',
    completed_at = now(),
    last_error = COALESCE(last_error, 'Edge runtime wall-clock limit reached — job stalled mid-sweep. Refactored into self-chaining batches.')
WHERE status = 'running'
  AND created_at < now() - interval '15 minutes';
