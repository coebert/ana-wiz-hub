ALTER TABLE public.topic_audit_jobs REPLICA IDENTITY FULL;
ALTER TABLE public.topic_audit_findings REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.topic_audit_jobs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.topic_audit_findings;