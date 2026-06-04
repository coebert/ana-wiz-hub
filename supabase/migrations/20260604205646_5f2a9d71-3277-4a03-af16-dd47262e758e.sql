UPDATE public.topic_audit_findings SET sources='[
  {"label":"RCoA GPAS Ch 9 2024","url":"https://rcoa.ac.uk/gpas/chapter-9"},
  {"label":"OAA/DAS 2015","url":"https://doi.org/10.1111/anae.13260"},
  {"label":"BJA Educ 2019","url":"https://doi.org/10.1016/j.bjae.2019.05.003"},
  {"label":"MBRRACE-UK","url":"https://www.npeu.ox.ac.uk/mbrrace-uk"},
  {"label":"NAP5","url":"https://doi.org/10.1093/bja/aeu313"},
  {"label":"OAA PDPH 2023","url":"https://doi.org/10.1111/anae.14464"},
  {"label":"OAA Nerve Injury 2023","url":"https://www.oaa-anaes.ac.uk/postpartum-nerve-injuries"}
]'::jsonb WHERE id='f4a31e7d-9182-447f-b921-e5db93dfde81';