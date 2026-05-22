UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Topic page exists in repo; Firecrawl scrape failure was transient — content already includes section structure, key points, and citations.'
WHERE id IN (
  '443b0d2a-8f1b-4f13-b4c3-e66c5711f1a0',
  '332380a6-9da3-46f3-a78d-02006176f551',
  '715dc66c-493c-4b65-a38c-032ed9d47224',
  'deab18d6-601e-4e83-9275-70e2b7a35ee6',
  'a09171b8-e17f-4ce6-8ac5-c0f7f4c5dd5e'
);

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='IVAnaestheticsTopic already uses InlineRef pattern with refLabel for every numbered citation (Peck & Hill Ch.5, BJA Educ 2014, AAGBI 2018) — full citations resolve via TopicReferences/references.ts.'
WHERE id = '3907f4db-7644-402b-83ee-a5dd9e3ab463';

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Aprepitant duration corrected to "Prolonged action (t½ ~40 h)" with InlineRef to Gan et al. 2020.'
WHERE id = 'abaf2d45-e47d-4fc9-8784-a0be3bec5c44';

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Apfel section now cites Gan et al. 2020 and BJA Educ 2013 via InlineRef; full citations in references.ts under antiemetics.'
WHERE id = '1521cdae-2142-45eb-b585-040d879202f2';

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Apfel section now explicitly states the 4-point score is patient-specific and surgical/anaesthetic factors are independent predictors (not part of the score); cited via InlineRef to BJA Educ 2013.'
WHERE id = '86a0f2d4-3e97-4de2-b83e-3c19702f8b16';

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Dexamethasone receptor cell updated to note proposed central prostaglandin synthesis inhibition mechanism; InlineRef to BJA Educ 2013.'
WHERE id = '40e0c0ff-4463-4b59-abc5-c77714d5a470';

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now()
WHERE id IN (
  'b4efcf42-0791-455c-86d7-08732bf680ce',
  'f67a1938-cc53-417e-858c-a1b1a0a6a54e',
  '012a1e6e-0c6c-44fc-addb-c927e6f877d5'
);

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Diagram label "Brainstem /" fixed to "Brainstem &" in ANSPathwayDiagram.tsx; cosmetic typo with no source needed.'
WHERE id = '7d826e1e-6d9b-4543-9758-cd3e6e813b40';