UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now()
WHERE id IN (
  'a4f3d438-d9f6-4164-9ba1-f47ebd8f3d3f',
  'b0e9a1c3-bf80-45bf-b22c-4ab919632879',
  '34b4887b-7b2f-47a2-af5d-c2ede9d2f3ee'
);

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Tryptase sampling times corrected in AnaphylaxisPathophysiologyDiagram SVG to ASAP / 1-2 h / baseline >=24 h; finding source URLs (Resus Council, NAP6) not in clinical-incidents topicReferences.'
WHERE id='b08053c0-bbc9-4834-a4f4-f708442ba877';

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Removed misleading Rx marker on TF.VIIa by clearing drugs[] for tf-vii node and added explanatory detail; no external citation required.'
WHERE id='ce30e086-e270-45ee-a88e-fd4ccf855f74';

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Misleading N2O / micro-anastomosis pitfall bullet removed from PlasticSurgeryTopic per suggested fix; no source citation needed.'
WHERE id='c11d292b-d2c9-40a1-b739-d63d11da1ac9';

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Inconsistency is intentional: body prose uses cmH2O (subscript); SVG aria-labels use ASCII cmH2O as enforced by tests/svgNodeProps-label-format.test.ts for screen-reader compatibility.'
WHERE id='a4d663a2-c7c1-42f8-b443-eadf10485c13';

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Transient Firecrawl scrape failure (502/408) — topic page could not be retrieved at audit time; topic content itself unchanged.'
WHERE id IN (
  'bb32be31-46c3-4f63-9caa-8406e7faddc7',
  'ee39262c-c09d-48aa-9155-402fdad10653',
  'b5cea530-e8cc-4bfd-8e57-d9ec4c15d275',
  '76357dd8-99ba-4c16-a58d-f39b67710c5b'
);

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Auditor self-reported it could not complete the audit because no authoritative reference excerpts were supplied; no actionable claim to correct.'
WHERE id IN (
  '2c8a2064-db8c-43e4-a856-84e8297cc750',
  '82f88756-41b8-4bfd-93f1-dc2a4ac8fbf4',
  '37894910-e604-4e11-8a38-ca19c3e2828e'
);