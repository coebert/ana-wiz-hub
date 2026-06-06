-- Mark cd8941b4 as fixed: shock thresholds now cite ATOTW 193 (Electricity II)
-- with verbatim excerpt; diathermy frequencies cite BJA Educ 2017; capacitor
-- values cite Middleton Ch.15 / Cross & Plunkett.
UPDATE public.topic_audit_findings
SET status='fixed', resolved_at=now(),
    unverifiable_reason='Values verified: shock thresholds (1 mA / 15 mA / 100 mA VF) cite ATOTW 193 (Electricity II) inline and in worked-examples; diathermy frequencies (0.4–3 MHz) cite BJA Educ 2017 in worked-example; capacitor values cite Middleton Ch.15 / Cross & Plunkett in key-points.'
WHERE id='cd8941b4-66a0-440d-b94b-ec9b7ca1a75b';