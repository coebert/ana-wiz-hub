UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(),
    unverifiable_reason = 'Diagram description rewritten in TransportVentilationDiagram.tsx to learner-focused summary; no external citation required for in-house diagram.'
WHERE id = 'e976ab7e-bbf0-4504-8a01-f1825e229603';

UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(),
    unverifiable_reason = 'Specific claims already cited via sectionSources/keyPoints (BJA Educ 2021, BAPRAS 2020, Curr Opin Anaesthesiol 2019); added InlineRef on principles paragraph. Auditor flagged absence of provided excerpt, not absence of citation in topic.'
WHERE id = 'eccf3c32-20ac-49c1-86ea-56075341d00c';

UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(),
    unverifiable_reason = 'Cosmetic label deduplication in BurnDepthDiagram (Deep PT → Deep partial); no external citation required.'
WHERE id = 'fdd1aaf4-7714-499a-bb2d-d4c00eef10db';