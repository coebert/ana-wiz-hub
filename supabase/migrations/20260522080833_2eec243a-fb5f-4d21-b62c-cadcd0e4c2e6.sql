UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(), unverifiable_reason = 'Diagram label consistency fix: CSHT comparison playhead now always shows the infusion duration in minutes to match the Y-axis unit. No factual claim to cite.'
WHERE id = '7061af16-5bbd-4516-9ef4-79700af39778';

UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(), unverifiable_reason = 'Auditor false-positive: the "wk 12" label is the dynamic scrubber playhead (current week), not a redundant static annotation; the axis tick is separate. No code change required.'
WHERE id = '255a2522-fd32-4b51-8500-7cb90feb4594';