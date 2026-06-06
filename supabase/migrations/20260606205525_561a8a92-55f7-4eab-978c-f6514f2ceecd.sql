UPDATE public.topic_audit_findings
SET status='fixed', resolved_at=now(),
    unverifiable_reason='Diagram-only label correction (Y-axis relabelled to evenly spaced 0,2,4,6,8 kPa); no external source citation required.'
WHERE id='d5d5fa66-486e-41b4-8938-e44afdba22b4';

UPDATE public.topic_audit_findings
SET status='fixed', resolved_at=now(),
    unverifiable_reason='Diagram-only arithmetic correction (flow % now computed to 1 dp so labels match the 9.5:1 splitting ratio); no external source citation required.'
WHERE id='c22b5c48-8aae-4ef9-abf6-8f142b948ad4';

UPDATE public.topic_audit_findings
SET status='fixed', resolved_at=now()
WHERE id IN ('df0272a8-ebde-43a3-8b82-15071539ba91','3d14dcab-4e13-426e-ae1b-b36c22730805');