UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(), unverifiable_reason = 'Diagram label fix only: replaced non-standard "→ normal"/"⊣" notation with "= normal"/"−" in HPAAxisDiagram. No external citation required.'
WHERE id = '13f7757a-6879-42ee-b99d-1799fa55b8e6';

UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(), unverifiable_reason = 'Auditor note: scraped without sources. Topic already cites Power & Kam, BJA Educ 2015, Nicholson & Hall 2011 and AAGBI 2020 via sectionSources and worked-example cites.'
WHERE id = '8b5aef00-1229-4f76-b905-33fb0e221e64';

UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now()
WHERE id = 'c6224aae-97e4-4474-914e-18d1c38afc2f';

UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(), unverifiable_reason = 'Diagram label consistency fix only: added "(C fibres)" to parasympathetic postganglionic label in ANSPathwayDiagram to match sympathetic side. No external citation required.'
WHERE id = 'a0d47c91-b36b-49d8-896e-fb74bf52e9cd';