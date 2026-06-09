
UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Diagram label swap; fix follows project anatomy-orientation convention (anterior view, patient right = viewer left). No external source URL was supplied with the finding.'
WHERE id='b45eafa0-da98-4a05-983c-c419c4c74510';

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now()
WHERE id='f80a7c13-c67f-4933-9c79-ac660e738d7d';

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Firecrawl scrape timed out (HTTP 408) on all 9 attempts — no page content to audit; topic source file unchanged.'
WHERE id='d5c1a82e-4218-4005-b336-7633e8c6a70c';

UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(),
  unverifiable_reason='Current diagram threshold (>1 error positive for Feature 4) matches the CAM-ICU training manual (4 yes/no + 1 command, >1 combined error positive); auditor-cited >0/≥1 threshold conflicts with mainstream FFICM teaching, left unchanged pending source review.'
WHERE id='23e4a3e3-423e-4bf1-b81e-bb1246a611b5';
