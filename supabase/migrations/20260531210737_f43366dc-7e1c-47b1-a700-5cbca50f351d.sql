UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(), unverifiable_reason = CASE id
  WHEN 'c8929868-e744-4362-8f22-d8df886614c9'::uuid THEN 'Source is only the topic URL (scrape failure 502/408) — no external reference to cite; topic content reviewed in chat and unchanged.'
  WHEN 'bd085479-3faf-4a77-8917-28fc3b85541b'::uuid THEN 'Source is only the topic URL (scrape failure) — no external reference to cite; topic content reviewed and unchanged.'
  WHEN '651418f5-676c-4197-914a-a42b38c8fe9a'::uuid THEN 'Verified: topic already contains all sections (Theatre Zoning, Ventilation, Environment, AGSS, Electrical Safety with IT/LIM/CF-BF-B, WHO Checklist Sign-In/Time-Out/Sign-Out). Source is only the topic URL so no external citation needed.'
  WHEN 'c8e12459-1eef-4b18-af0a-26562fd5e2cd'::uuid THEN 'Quantitative claims (≥20 ACH, +25 Pa cascade, 18–25°C, 40–60% RH, COSHH 100/50/60 ppm, <10 µA CF) already cited via sectionSources to HTM 03-01, COSHH WAG 2020, IEC 60601-1. Finding source is only the topic URL.'
  WHEN '22086888-3547-4181-9802-6263b13be87d'::uuid THEN 'Energy doses (120–200 J biphasic, 360 J monophasic) already cited inline via Resuscitation Council UK 2021 in sectionSources and keyPoints; finding source URL (resuscitation.2021.02.010) is the same guideline already referenced under a different DOI.'
  WHEN 'dcb1071c-ae77-43af-ba08-ab31f73b027a'::uuid THEN 'Topic already cites BJA Educ 2017, Cross & Plunkett Ch.15-16 and Middleton Ch.18 across keyPoints/sectionSources for every electrode/principle; finding source URL is a separate BJA blood-gas article covering the same content.'
END
WHERE id IN (
  'c8929868-e744-4362-8f22-d8df886614c9',
  'bd085479-3faf-4a77-8917-28fc3b85541b',
  '651418f5-676c-4197-914a-a42b38c8fe9a',
  'c8e12459-1eef-4b18-af0a-26562fd5e2cd',
  '22086888-3547-4181-9802-6263b13be87d',
  'dcb1071c-ae77-43af-ba08-ab31f73b027a'
);