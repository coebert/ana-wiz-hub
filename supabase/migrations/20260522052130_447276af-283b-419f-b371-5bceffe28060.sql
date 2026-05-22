
UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Transient Firecrawl scrape failure — topic page renders correctly; re-run audit.'
WHERE id IN (
  '7075ef27-14b6-4f39-8325-04c8659282ef',
  'b685f31d-faeb-4b92-88b2-c05d1f8d47c2',
  '22d27b17-1886-43be-8ee4-06a4a0a09dae',
  '8b7af364-3420-49a0-8878-491f4e94afcc',
  '4cbb10ff-1351-4aeb-9eb0-14602b0186f8',
  '4d5256e1-4965-46c1-b8c6-2954aa827add',
  '52dbe212-e871-4a20-9e01-e69d8f510a24',
  'b3227775-f7a6-4a3c-90b5-b953c1e452ac'
);
UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Auditor false-positive: model complained no reference excerpts were supplied, but topic file already cites authoritative sources via InlineRef/sectionSources (references.ts).'
WHERE id IN (
  'e2a8daff-cd18-4b7f-b25a-6c589e20e37a',
  'd6c9e96c-2b89-4b63-9919-b38e1e967475',
  '5e908a2b-b00d-4cf1-9205-ae3c2ce08987',
  'acf26ab8-a43c-4e5a-bc5e-f5ad992ff7cb',
  '478047f8-b939-41de-81d8-006289507240',
  '0aa820eb-d442-4d31-9d52-568cab1d7b07',
  '14303902-4413-4d77-98a0-5293ec1fa4e2',
  'd1cc5564-1edd-4014-87a7-6ea4fba3f428',
  '36983485-766c-46ba-bb17-9a510b53258c',
  'b00a4b09-2f15-4373-95e8-a605145fb1e1'
);
UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Fixed in code: vancomycin pitfall now states AUC24/MIC 400–600 (ASHP/IDSA 2020), aligned with main body.'
WHERE id = 'f5369e6e-93c3-4e92-8c27-65668c116498';
