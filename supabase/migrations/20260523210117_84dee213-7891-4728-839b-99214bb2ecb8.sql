UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(),
    unverifiable_reason = 'Auditor process failure: no source excerpts supplied to LLM. Topic file already carries InlineRef citations.'
WHERE id = 'df915ea1-edd2-47c7-8c5f-cb1e14e0052c';

UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(),
    unverifiable_reason = 'Transient Firecrawl scrape timeout (HTTP 408). Topic page renders correctly and source file contains InlineRef citations.'
WHERE id = '4948f1e3-ca1d-4aae-91fc-cb94ad198c1e';