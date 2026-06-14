UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now()
WHERE id='169571ae-eb12-4318-96e8-4c4d5f0c9c0f';

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Internal copy fix (expanded STOP-5 components in Briefing/Debriefing card); cites existing topic references already in sectionSources.'
WHERE id='cc88a09e-a9b9-4e9f-ace3-ab1c79a5c79b';

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Internal copy fix (expanded Just-Culture into Marx three-behaviour model with console/coach/discipline responses); cites existing Marx 2001 / PSIRF 2022 references.'
WHERE id='3a14f2b8-b917-4856-a076-d7c88dde1a30';

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Internal diagram label fix in VAECMOCircuitDiagram (oxygenator inlet/outlet relabelled with explicit blood-flow direction); no external source required.'
WHERE id='b90e2696-255b-47c5-9d4c-43e79cf45c1c';

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Firecrawl SCRAPE_TIMEOUT (HTTP 408) on /clinical/orthopaedic-anaesthesia after 9 attempts — page renders fine in browser; no content defect to cite.'
WHERE id='e51dcbba-ea8c-4fa0-93eb-719c7690db70';

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Internal diagram label fix in DermatomeMapDiagram (posterior iliac-crest label corrected to skin=L1; bony landmark for L4 spinous process).'
WHERE id='7c0210a6-6560-41c0-a90d-a98e1cec13c3';

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Internal diagram label fix in NMJDiagram (Ca → Ca²⁺ on streaming ion glyphs).'
WHERE id='3f9d80af-1d5c-4cd1-bf72-a6704b83c822';

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Diagram already implemented with four tabs (thermocouple/thermistor/RTD/IR) plus comparison; replaced auto-generated placeholder description with a curriculum-aligned summary.'
WHERE id='b5bb9ff0-9796-4378-96a8-dcff4cdd3162';