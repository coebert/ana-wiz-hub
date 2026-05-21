-- Fix the silent-failing upsert in topic_audit_topic_logs by adding the
-- unique constraint that the edge function's onConflict targets.
-- Also cancel the currently-stuck audit job so the UI can recover.

-- 1) Deduplicate any existing rows (defensive — table is currently empty).
DELETE FROM public.topic_audit_topic_logs a
USING public.topic_audit_topic_logs b
WHERE a.id < b.id
  AND a.job_id = b.job_id
  AND a.section = b.section
  AND a.topic_id = b.topic_id;

-- 2) Add the unique constraint used by the edge function upsert.
ALTER TABLE public.topic_audit_topic_logs
  ADD CONSTRAINT topic_audit_topic_logs_job_section_topic_key
  UNIQUE (job_id, section, topic_id);

-- 3) Mark the currently stalled job as failed so the UI clears.
UPDATE public.topic_audit_jobs
SET status = 'failed',
    last_error = COALESCE(last_error, '') ||
      ' Stalled on Pressure Measurement (no heartbeat >1h). Auto-cancelled by maintenance migration; restart audit to retry.',
    completed_at = now(),
    updated_at = now()
WHERE status = 'running'
  AND updated_at < now() - interval '15 minutes';