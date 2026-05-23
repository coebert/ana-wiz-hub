UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now()
WHERE id = '6e21d608-dcc2-48f9-b1ad-eb9a76afd97e';