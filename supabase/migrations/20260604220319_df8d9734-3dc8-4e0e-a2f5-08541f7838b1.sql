UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(), unverifiable_reason = 'Diagram layout fix only — source URL is auditor screenshot, not a citable reference'
WHERE id = 'efeee344-6fa1-4377-90f8-bc87a5aa805f';

UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(), unverifiable_reason = 'Topic already fully cites Pearse 2006, CPOC 2020, NCEPOD 2011 and 9 other sources in references.ts with DOIs'
WHERE id = '6b7bea61-6427-48a0-a202-47b083d1684e';