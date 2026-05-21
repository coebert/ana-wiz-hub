
UPDATE public.topic_audit_jobs
SET status = 'failed',
    last_error = COALESCE(last_error, '') || ' [auto-cancelled: runtime stalled mid-batch; chain reinforced — please restart audit]',
    completed_at = now(),
    updated_at = now()
WHERE status = 'running'
  AND updated_at < now() - interval '5 minutes';

UPDATE public.topic_audit_topic_logs
SET status = 'failed',
    error_message = COALESCE(error_message, 'Runtime terminated before topic completed; auto-marked failed.'),
    completed_at = now(),
    updated_at = now()
WHERE status = 'running'
  AND updated_at < now() - interval '5 minutes';
