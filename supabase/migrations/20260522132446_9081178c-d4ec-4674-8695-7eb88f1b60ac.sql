UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Topic page exists in repo; Firecrawl scrape failure was transient — content already includes section structure, key points, and citations.'
WHERE id IN (
  'f4923aa2-f21a-484b-a846-8c8675344fd2',
  'ff23c03e-58af-4a4a-9527-89e1906adc4a',
  'aa3f7930-3a05-4950-8fd3-aa2bce687855',
  '4c533e64-d833-465e-8938-33b92e129cdc',
  '2526f0ce-4083-460a-81c0-fd3a220c9033',
  '97e618a6-a657-4fe5-8ea9-1f6e07ccbaec',
  '41e93a39-f356-45e5-94ee-1961fe6a5df0'
);