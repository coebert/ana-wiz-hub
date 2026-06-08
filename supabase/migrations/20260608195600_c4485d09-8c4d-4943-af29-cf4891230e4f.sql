
UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(),
    unverifiable_reason = 'Diagram title/label correction in source; no source citation applicable.'
WHERE id IN (
  '4a41208d-b8fc-4dc7-81d7-edad6b444e29',
  '9e95b01f-51f7-49b9-84d7-60f61a53e3a3'
);

UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(),
    unverifiable_reason = 'Auditor false positive: scraper captured pre-hydration "Loading..." placeholder; topic content verified comprehensive and on-spec in the source file. Firecrawl waitFor fix deployed previously.'
WHERE id IN (
  'd8fdb5f8-9ca6-44fc-83e6-84c1856a39e3',
  '20b82d5b-a78d-48e6-9c83-1f20ae6c254f',
  'd350c9f1-a066-4c85-8d4d-0fd32de22e24',
  'c80fb2d9-b1ea-42f2-9fbd-42d7fa31da5f'
);

UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(),
    unverifiable_reason = 'False positive: "wk 29" is a dynamic slider read-out in PregnancyTimelineDiagram (wk ${Math.round(week)}), not a stray static label.'
WHERE id = '16cc9074-8401-4e09-8339-ca8892a82e3a';

UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(),
    unverifiable_reason = 'False positive: SkewDistributionDiagram is interactive; mean/median/mode are numerically computed from the selected PDF (negative/symmetric/positive), so labels always match the displayed curve. Auditor screenshotted the positive-skew default and described it as left-skewed.'
WHERE id = 'ffe73a10-ab3d-4c04-a502-653f86d366b7';
