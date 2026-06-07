UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(),
    unverifiable_reason = 'Diagram-only label change: relabelled L fem a. → R fem a. in VAECMOCircuitDiagram to match the illustrated ipsilateral right-femoral arterial return cannula.'
WHERE id = '94258fb2-7549-472f-b051-b049af59fb63';

UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(),
    unverifiable_reason = 'Auditor false positive: TOFPatternDiagram renders all four twitches dynamically via T{i+1}; screenshot captured mid-animation before T4 had fully grown in.'
WHERE id = '48742ea6-9931-43da-9131-40da82ed30e6';

UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(),
    unverifiable_reason = 'Transient Firecrawl failure (400 waitFor>timeout/2, then 502s). CardiacAnatomyTopic.tsx is intact and substantial; not a real content gap.'
WHERE id = '8676f13a-d20a-4a5f-ab3d-9a7205a2ff06';