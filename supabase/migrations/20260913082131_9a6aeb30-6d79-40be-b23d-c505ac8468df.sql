UPDATE public.viva_model_answers
SET model_answer = replace(model_answer, 'Atropine 500 micrograms IV, repeatable every 3-5 minutes to a maximum of 3mg', 'Atropine 1 mg IV, repeatable every 3-5 minutes to a maximum of 3mg (RCUK 2021 adult bradycardia algorithm)')
WHERE id = '2ae3bbfd-ace7-49de-8092-5e666c730ad8';

UPDATE public.viva_model_answers
SET model_answer = replace(model_answer, 'Atropine 500mcg IV, repeatable to a maximum of 3mg', 'Atropine 1 mg IV, repeatable to a maximum of 3mg (RCUK 2021 adult bradycardia algorithm)')
WHERE id = 'c78f641f-af26-4c95-9bef-610357a66cce';

UPDATE public.topic_audit_findings
SET sources = '[{"title":"Serious Hazards of Transfusion (SHOT) Annual Report","url":"https://www.shotuk.org/shot-reports/"}]'::jsonb
WHERE id = '6fb6031f-ad82-47c5-995a-158c73ec98ef';

UPDATE public.topic_audit_findings
SET sources = '[{"title":"ESCMID guideline: diagnosis and treatment of acute bacterial meningitis","url":"https://doi.org/10.1016/j.cmi.2016.01.007"}]'::jsonb
WHERE id = '2da4d3a0-03f3-4ab5-a7ac-c6db88676a00';

UPDATE public.topic_audit_findings
SET sources = '[{"title":"IDSA Clinical Practice Guideline for the Management of Candidiasis 2016","url":"https://doi.org/10.1093/cid/civ933"}]'::jsonb
WHERE id = '3e2e170b-a70d-4d1b-ade0-2a1f28341f4b';

UPDATE public.topic_audit_findings
SET sources = '[{"title":"Antimicrobial de-escalation as part of antimicrobial stewardship in intensive care","url":"https://doi.org/10.1007/s00134-019-05871-z"}]'::jsonb
WHERE id = '06c99d3b-c7f4-49a0-8ab6-8365daf7df44';

UPDATE public.topic_audit_findings
SET sources = '[{"title":"ERC/ESICM guidelines 2021: post-resuscitation care","url":"https://doi.org/10.1016/j.resuscitation.2021.02.012"}]'::jsonb
WHERE id IN ('0a86958c-39cc-4512-8b7f-e49c017b6a09','a6a7072f-189b-467a-981e-9db58a581ba9','fd6d7905-88b8-4daf-b2b3-0dd042935781','52cb1dc6-81b6-430c-b287-99542596e6aa');

UPDATE public.topic_audit_findings
SET sources = '[{"title":"Resuscitation Council UK. Adult Advanced Life Support, Tachycardia and Bradycardia algorithms. 2021.","url":"https://www.resus.org.uk/library/2021-resuscitation-guidelines"}]'::jsonb
WHERE id IN ('1a0805a8-f7f5-4832-a915-ef2ea26229f2','bba4e4cb-4f3d-4186-8345-a8b42739f9cd','b4a52310-c4d1-4cf4-85f1-7218f28c3788','057fdd5a-f81c-4ebc-9fd9-134c385a9881');

UPDATE public.topic_audit_findings
SET status = 'fixed', resolved_at = now()
WHERE id IN (
  '6fb6031f-ad82-47c5-995a-158c73ec98ef',
  '2da4d3a0-03f3-4ab5-a7ac-c6db88676a00',
  '3e2e170b-a70d-4d1b-ade0-2a1f28341f4b',
  '06c99d3b-c7f4-49a0-8ab6-8365daf7df44',
  'd71972fa-869a-466e-be06-434589fe1575',
  '291af043-742d-4b64-8b08-1ef1479cb26b',
  '2a9e6c93-6bd4-4352-90ff-960ce4ca2f37',
  '682215ec-3e1b-40c8-bf76-0415a1754497',
  '763633ae-70f3-482c-b1b2-e4aaeaf1d07e',
  'e3c9f24b-d732-4f22-9019-9706c01fc847',
  '71172917-2504-4d63-9500-228abff91d19',
  '57b37c6d-bbf9-40b6-b2c1-1676de1bc4c3',
  '52cb1dc6-81b6-430c-b287-99542596e6aa',
  'd7c9d226-ca84-4ef2-8f5f-e80a7bed0f4e',
  'a6a7072f-189b-467a-981e-9db58a581ba9',
  '0a86958c-39cc-4512-8b7f-e49c017b6a09',
  'ffba100b-5c2d-4047-b1e6-7a6934a67fad',
  'fd6d7905-88b8-4daf-b2b3-0dd042935781',
  '1a0805a8-f7f5-4832-a915-ef2ea26229f2',
  'bba4e4cb-4f3d-4186-8345-a8b42739f9cd',
  'b4a52310-c4d1-4cf4-85f1-7218f28c3788',
  '057fdd5a-f81c-4ebc-9fd9-134c385a9881'
);