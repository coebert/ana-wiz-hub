
UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now()
WHERE id IN (
  'f346cca6-4987-42d2-9f86-d8471d673f72',
  '76c4412e-7a25-48ba-b8fa-70d15f65cd9e',
  'ddd5fc55-680c-43ee-83f0-11e7684a43ca',
  '0ee42f44-41e6-4799-84f3-9bdfc7d1736f'
);

UPDATE public.topic_audit_findings
SET status='fixed', resolved_at=now(),
    unverifiable_reason='Diagram correction: sympathetic-view SVG now renders the adrenal medulla branch (preganglionic splanchnic to chromaffin cells; adrenaline/noradrenaline into bloodstream). Sourced from standard ANS physiology already cited in topic; auditor provided no external URL.'
WHERE id='67bfa31c-4193-4945-bf60-bfe2122d911c';

UPDATE public.topic_audit_findings
SET status='fixed', resolved_at=now(),
    unverifiable_reason='Diagram axis label correction (1 kPa ~= 7.5 mmHg). Pure unit-conversion fix; auditor sources array was empty.'
WHERE id='2b60f576-e6e5-4504-bbcb-825c1160c93b';

UPDATE public.topic_audit_findings
SET status='fixed', resolved_at=now(),
    unverifiable_reason='Transient Firecrawl scrape failure on /physiology/gi-physiology; underlying topic content was not changed and is verifiable in-app.'
WHERE id='78a7062a-5412-4665-b106-97a95bdad208';
