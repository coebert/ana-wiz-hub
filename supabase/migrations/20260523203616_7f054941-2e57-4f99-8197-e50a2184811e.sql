UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now()
WHERE id = '235e3d90-1363-4e9b-bcad-6ae3b24a6dd6';