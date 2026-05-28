
UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(),
    unverifiable_reason = 'Diagram label typo (extra quotes around "Elbow"); presentation fix with no factual claim to cite.'
WHERE id = '48d35b2d-ed8c-4334-aded-574411093d81';

UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(),
    unverifiable_reason = 'Terminology refinement (full-stomach precautions → aspiration prophylaxis / at risk of aspiration); clarity change, not a new factual claim.'
WHERE id = 'a01ca6aa-2ea2-4ced-955f-a1a8eb6058fa';

UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(),
    sources = '[
      {"url":"https://doi.org/10.1016/j.bjae.2019.05.003","title":"BJA Educ 2019 — Kinsella SM et al. Anaesthesia for caesarean section"},
      {"url":"https://doi.org/10.1111/anae.13263","title":"OAA/DAS 2015 — Guidelines for obstetric general anaesthesia"},
      {"url":"https://www.npeu.ox.ac.uk/mbrrace-uk","title":"MBRRACE-UK — Saving Lives, Improving Mothers'' Care"}
    ]'::jsonb
WHERE id = 'aa339344-dd29-42f0-82bd-21448d652699';

UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now(),
    sources = '[
      {"url":"https://www.resus.org.uk/provider-courses/advanced-life-support/apls-advanced-paediatric-life-support","title":"APLS 2021 — Advanced Paediatric Life Support"},
      {"url":"https://bnfc.nice.org.uk/","title":"BNFc — British National Formulary for Children"},
      {"url":"https://www.apagbi.org.uk/publications","title":"APAGBI 2020 — Good Practice in Paediatric Anaesthesia"}
    ]'::jsonb
WHERE id = 'a08efdaf-7959-4d2f-89ab-7696a600895c';
