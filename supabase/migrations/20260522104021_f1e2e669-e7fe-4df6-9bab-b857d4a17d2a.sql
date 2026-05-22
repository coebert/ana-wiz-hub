
UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='ParacetamolNomogramDiagram defaults to 50 mg/L @ 8 h on the UK 100 mg/L line (verified in src); no stray 120 mg/L label in source.'
  WHERE id='ca5a7573-5356-4467-b55d-8882a0486dc4';
UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='BurnDepthDiagram updated to permanently label all 4 burn depths (superficial / sup. partial / deep partial / full thickness) on the SVG scale.'
  WHERE id='17dd3f98-307a-4bf6-80f1-87423df3e273';
UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='TURPSyndromeDiagram already exposes a context=hysteroscopy prop that relabels prostatic sinuses to uterine venous sinuses; GynaecologicalAnaesthesiaTopic uses that context.'
  WHERE id='185221cf-8291-4dd1-8f80-50b08db01a32';
UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='HPAAxisSuppressionDiagram adrenal-crisis step already labelled Hypotension / shock with body text explaining preserved mineralocorticoid output.'
  WHERE id='18ad5c47-82a7-49a0-9e4c-d665789d0b77';
UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='AntibioticTargetsDiagram already separates metronidazole as a nitroimidazole acting via radical-mediated DNA breaks, explicitly NOT a gyrase inhibitor.'
  WHERE id='7e0cadaf-7550-4b04-8d1e-bf93659dce9c';
UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='CoagulationCascadeDiagram feedback annotation already reads activates V, VIII, XI (not IX); no thrombin to IX arrow exists in source.'
  WHERE id='87e7769f-3a54-470f-a246-e134ca060849';
UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='NSAIDMechanismDiagram source contains no stray N labels near 5-LOX / FLAP (verified by grep); auditor screenshot artefact.'
  WHERE id='7d4cf17a-20dd-4ae7-9003-95bde622594b';

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Transient Firecrawl scrape failure - topic page itself is live; nothing to action.'
  WHERE id IN (
    'a0030f52-bf47-4012-a8b5-aa41e9c42e02','9f7e5287-aee7-4dfb-a325-41792a8b4344',
    '2486c5fd-810e-4a14-8cd9-1d1629225ed9','ff8b8882-0510-4361-a96b-9e7857a2f37d',
    '3100f445-4d56-47ca-9147-82f3ec74a1ac','6bcc9aea-4eed-4cbe-8879-3ba634207243',
    '1fc752cb-2725-420e-92f8-27583b1ded30','8e03612e-540d-4a20-9283-7db8b5d86b04',
    '63bad39c-1a8d-4fc0-bff2-c12ec05da413','c82c5ff6-c880-42ab-be92-56dd6a15dc0e',
    'ff71bf99-44a1-4c40-8b86-b64fe1f22b1d','5931d36e-6bac-421e-bb37-3af820e60dcf',
    '27853447-a19e-4905-98b7-9f0324be70bb'
  );

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Audit not possible - auditor reported no source PDF supplied; not an actionable content error.'
  WHERE id IN (
    '33da2030-e999-4d17-9334-844366501bff','fa0a3ae2-6428-45fb-8f65-661de54450ba',
    '68e42957-d20b-48a8-b116-dcf4a8338f6b','871aad0d-8299-4bb3-8a19-60ac3c63abf7'
  );
