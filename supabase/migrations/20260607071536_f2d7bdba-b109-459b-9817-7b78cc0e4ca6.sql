UPDATE public.topic_audit_findings SET status='fixed', resolved_at=now(), unverifiable_reason=CASE
  WHEN id='9e4ac7bb-c2ca-4d95-9040-4e6584a6e956' THEN 'Diagram-only fix: AddisonianCrisisDiagram updated to remove aldosterone/hyperkalaemia for secondary AI physiology'
  WHEN id='8bcd7361-dafa-47d1-9be0-131027279ca5' THEN 'Auditor request for source excerpts; ERC/ESICM 2021 details remain cited via existing references in topic'
  WHEN id='0ab9fdc7-e5af-4838-b532-17e4cdabdb1d' THEN 'Firecrawl scrape timeout (HTTP 408) — page could not be audited; no content change required'
  WHEN id='660dd072-3e5b-4acb-a3db-b5ffc2fe53e1' THEN 'Firecrawl scrape timeout (HTTP 408) — page could not be audited; no content change required'
  WHEN id='62d9214f-23dc-447a-93ff-91fc34a8d6b4' THEN 'Diagram-only fix: SeverePancreatitisCTDiagram gallstone label changed to Cholelithiasis (causative) with clarified detail body'
  WHEN id='5932040f-bc9b-4a65-8529-308e32417af2' THEN 'Auditor request for source excerpts; ESPEN/NICE/NICE-SUGAR/EPaNIC remain cited via existing references in topic'
  WHEN id='2a2bc578-6de9-4950-a42c-bb7dd09582c8' THEN 'Diagram-only fix: ECMOCircuitDiagram SVC repositioned to patient right side with explicit anatomic orientation comment'
  WHEN id='04178cb6-c751-49f1-9482-ee297554288e' THEN 'Firecrawl scrape timeout (HTTP 408) — page could not be audited; no content change required'
  WHEN id='67d43659-d6df-4bd1-a35e-9067141e6cdb' THEN 'Diagram + text fix: MajorIncidentTriageDiagram and topic body updated to NARU criterion (CRT >2 s OR absent radial pulse)'
  WHEN id='a135a6fa-17ab-4c16-aa89-7e3bbf117b05' THEN 'Auditor false-positive: no source excerpts were supplied; existing topic citations remain in place'
  WHEN id='4481c45c-03d0-430d-ad07-e68378c79c48' THEN 'Text fix: NELA Care Bundle list in EmergencySurgeryTopic now includes antibiotics within 1 h for suspected sepsis (existing NELA Year 9 reference)'
  WHEN id='99d6eaed-7666-4c37-a1f1-9a376d5293f5' THEN NULL
  WHEN id='e625c396-03f3-4728-a656-8b197d4d0e78' THEN 'Text fix: PatientPositioningTopic Trendelenburg section now advises AGAINST shoulder braces per AoA 2020/2021 guidance; new AAGBI Nerve Injuries 2021 reference added and cited'
END
WHERE id IN ('9e4ac7bb-c2ca-4d95-9040-4e6584a6e956','8bcd7361-dafa-47d1-9be0-131027279ca5','0ab9fdc7-e5af-4838-b532-17e4cdabdb1d','660dd072-3e5b-4acb-a3db-b5ffc2fe53e1','62d9214f-23dc-447a-93ff-91fc34a8d6b4','5932040f-bc9b-4a65-8529-308e32417af2','2a2bc578-6de9-4950-a42c-bb7dd09582c8','04178cb6-c751-49f1-9482-ee297554288e','67d43659-d6df-4bd1-a35e-9067141e6cdb','a135a6fa-17ab-4c16-aa89-7e3bbf117b05','4481c45c-03d0-430d-ad07-e68378c79c48','99d6eaed-7666-4c37-a1f1-9a376d5293f5','e625c396-03f3-4728-a656-8b197d4d0e78');