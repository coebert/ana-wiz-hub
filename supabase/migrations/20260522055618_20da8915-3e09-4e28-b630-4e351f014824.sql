UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Citations already present in topic (Assoc Anaesth 2023 (NMB), BJA Educ 2018 (NMJ)); finding source list is the topic URL not the underlying guideline URL.'
 WHERE id='0168f265-5ee1-4fc6-a5d7-92c278b87a19';
UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Citations already present in topic (BNF Methylthioninium, BJA Educ 2018 (CO)); finding source list is the topic URL not the underlying source URL.'
 WHERE id='d144298c-d024-46de-bc51-18da1d7e943e';
UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Transient Firecrawl scrape failure; topic page renders normally.'
 WHERE id='7ec212b4-f5f0-4082-9a7e-2e06ae5ad157';