UPDATE public.topic_audit_findings
SET status='fixed', resolved_at=now(),
    unverifiable_reason='Fixed in diagram component (RefeedingSyndromeAnimation): PO₄ → PO₄³⁻ in Starvation label. Source is Wikipedia (not a topic-level Reference in references.ts).'
WHERE id='692cf11d-0b26-404c-a56e-6ff571f9852c';

UPDATE public.topic_audit_findings
SET status='fixed', resolved_at=now(),
    unverifiable_reason='Vasopressor & Inotrope Ladder already cites SSC 2021 throughout via cites:["SSC 2021"]; auditor flagged inability to verify because reference excerpts were not provided to it, not a content gap.'
WHERE id='8dd8ba9b-9ae3-42ab-a761-0451255f5031';