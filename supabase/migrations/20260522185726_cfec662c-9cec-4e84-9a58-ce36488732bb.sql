UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(), unverifiable_reason=v.reason FROM (VALUES
 ('8b466b88-7d72-48b7-899e-4a8ec7dae2bc'::uuid,'Transient Firecrawl scrape timeout — topic page renders correctly in production.'),
 ('38638399-22ba-4832-99cb-2296ac834535'::uuid,'Transient Firecrawl scrape timeout — topic page renders correctly in production.'),
 ('f1389303-5ac0-40dd-b1ff-304afd6f81ed'::uuid,'Transient Firecrawl scrape timeout — topic page renders correctly in production.'),
 ('c2386f16-3080-4a51-94ff-b95d93579d7a'::uuid,'Transient Firecrawl scrape timeout — topic page renders correctly in production.'),
 ('6c771b42-51b5-4411-8e16-560e67f717a1'::uuid,'Transient Firecrawl scrape timeout — topic page renders correctly in production.'),
 ('65b65607-0ab4-4db8-b0f1-bfdb0490152d'::uuid,'Auditor captured only the static pre-interaction screenshot; LowerLimbBlocksDiagram is an interactive coverage map with full nerve/block territories on click.'),
 ('d61bfa41-933b-4158-b831-ba51c52c3183'::uuid,'False positive — topic already cites NICE NG193, CG173 and Albrecht 2013 via sectionSources / keyPoints in PainMedicineTopic.tsx.'),
 ('fbd4452f-8f0f-4a76-91cb-5e83324f2b0d'::uuid,'False positive — topic already cites BJA Education laser physics and Association of Anaesthetists 2023 guideline via sectionSources in LaserFibreopticsTopic.tsx.'),
 ('e4777683-2ff4-4a50-9d32-7149fe2a45ec'::uuid,'Airway-fire drill already cites the Association of Anaesthetists 2023 guideline (label "Assoc Anaesth Airway Fire") in LaserFibreopticsTopic.tsx keyPoints and worked example.'),
 ('880a53c8-8c21-4c2e-aaee-f72efdc08eeb'::uuid,'Fixed in LowerLimbBranchesDiagram.tsx: visible label updated from "Common peroneal" to "Common fibular (peroneal)" per Terminologia Anatomica.'),
 ('37f01729-d9ef-4a29-a5a8-096f3c18a392'::uuid,'Fixed in AbdominalWallDiagram.tsx: label updated from "T6–L1 intercostal nerves" to "T7–L1 nerve branches"; tap-plane detail now lists thoracoabdominal T7–T11, subcostal T12 and L1 branches.'),
 ('1fa8b2a4-86cf-4181-8bd5-d8f9fa9cd30c'::uuid,'Fixed in CoagulationCascadeDiagram.tsx: label updated from "Antithrombin III" to "Antithrombin" with note on historical nomenclature.'),
 ('df2db07e-67a6-4038-9368-bef911785a74'::uuid,'PortalFirstPassDiagram Kupffer-cell layer is an off-by-default optional toggle, not presented as a parallel primary first-pass pathway; not misleading in default view.'),
 ('6c1869f1-352b-44ac-b62e-ff8e72089320'::uuid,'Fixed in ElectricityMagnetismDiagram.tsx: microshock bullet reworded — high-frequency impedance fall increases risk by lowering driving voltage required, the VF threshold itself is unchanged.')
) AS v(id, reason) WHERE topic_audit_findings.id = v.id;