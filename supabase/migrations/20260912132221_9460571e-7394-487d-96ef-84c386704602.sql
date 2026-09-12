-- lovable-cron-fallback-reviewed: 288 runs/day; audit sweeps advance only via a self-chained HTTP call, and a single dropped call freezes the sweep with no row change to trigger on; this is the recovery backstop, cadence chosen so a stall costs minutes not hours.
SELECT cron.schedule(
  'content-audit-watchdog',
  '*/5 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://aqkusdwwhlqqttvnxuwu.supabase.co/functions/v1/audit-topics',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-internal-token', current_setting('app.settings.service_role_key', true)
    ),
    body := '{"action":"watchdog"}'::jsonb
  );
  $$
);