UPDATE public.topic_audit_findings SET unverifiable_reason = CASE id
 WHEN '664b90da-7a2e-4b59-876f-5d3e29f73631' THEN 'Auditor source (ERC/ESICM post-resuscitation 2021) does not address donor management; targets cited to existing BJA donor-management reference.'
 WHEN '7018b163-cadc-4185-8155-fa339d2134a3' THEN 'Auditor supplied no source; rituximab timing cited to BSH TTP 2023 in topic.'
 WHEN 'a8bb285c-326e-40bc-b710-f321c13d6a1e' THEN 'Already addressed: infection prophylaxis section exists; auditor supplied no source.' END
WHERE id IN ('664b90da-7a2e-4b59-876f-5d3e29f73631','7018b163-cadc-4185-8155-fa339d2134a3','a8bb285c-326e-40bc-b710-f321c13d6a1e');