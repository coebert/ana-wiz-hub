ALTER PUBLICATION supabase_realtime DROP TABLE public.topic_audit_jobs;
ALTER PUBLICATION supabase_realtime DROP TABLE public.topic_audit_findings;
ALTER PUBLICATION supabase_realtime DROP TABLE public.topic_audit_topic_logs;

SELECT cron.unschedule('weekly-topic-audit');

SELECT cron.schedule(
  'weekly-topic-audit',
  '0 3 * * 0',
  $$
  SELECT net.http_post(
    url := 'https://aqkusdwwhlqqttvnxuwu.supabase.co/functions/v1/audit-topics',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-internal-token', current_setting('app.settings.service_role_key', true)
    ),
    body := '{"action":"start","trigger":"scheduled"}'::jsonb
  );
  $$
);