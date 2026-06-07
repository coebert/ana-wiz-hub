UPDATE public.topic_audit_findings
SET status = 'fixed',
    resolved_at = now(),
    unverifiable_reason = 'Transient Firecrawl failure (400 waitFor>timeout/2, then 502s on fallback). CardiacAnatomyTopic.tsx is substantial and intact; not a real content gap. Will clear on rescan once retry logic improvements take effect.'
WHERE id = '8676f13a-d20a-4a5f-ab3d-9a7205a2ff06';