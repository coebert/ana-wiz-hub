-- lovable-cron-fallback-reviewed: 288 runs/day; the queue normally self-chains, while this lightweight recovery backstop restarts only expired active jobs after dropped callbacks or runtime termination, limiting a stall to five minutes.
DO $$
DECLARE
  existing_job bigint;
BEGIN
  SELECT jobid INTO existing_job
  FROM cron.job
  WHERE jobname = 'podcast-rerecord-watchdog';

  IF existing_job IS NOT NULL THEN
    PERFORM cron.unschedule(existing_job);
  END IF;
END $$;

SELECT cron.schedule(
  'podcast-rerecord-watchdog',
  '*/5 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://aqkusdwwhlqqttvnxuwu.supabase.co/functions/v1/process-podcast-rerecord',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-internal-token', current_setting('app.settings.service_role_key', true)
    ),
    body := '{"action":"watchdog"}'::jsonb
  );
  $$
);