
UPDATE public.topic_audit_findings
SET sources = '[
  {"label":"AAGBI Positioning 2018","url":"https://associationofanaesthetists-publications.onlinelibrary.wiley.com/doi/full/10.1111/anae.14920"},
  {"label":"ASA Practice Advisory 2020","url":"https://doi.org/10.1097/ALN.0000000000001937"}
]'::jsonb
WHERE id = 'b7e21f5c-efe2-4c8a-9dec-b27d7e41fa41';

UPDATE public.topic_audit_findings
SET sources = '[
  {"label":"Ganong Ch.20 Adrenal","url":"https://accessmedicine.mhmedical.com/content.aspx?bookid=2525&sectionid=204293427"}
]'::jsonb
WHERE id = 'c13d2bad-ac88-4094-adb8-58fac20cc752';

UPDATE public.topic_audit_findings
SET status='fixed', resolved_at=now()
WHERE id IN ('b7e21f5c-efe2-4c8a-9dec-b27d7e41fa41','c13d2bad-ac88-4094-adb8-58fac20cc752');

UPDATE public.topic_audit_findings
SET status='fixed', resolved_at=now(), unverifiable_reason='Transient Firecrawl scrape timeout (HTTP 408) — page renders correctly; no content fix actionable.'
WHERE id='14e4b05a-d7d4-4f5e-b1ec-1c4f13a5ae27';
