- Build audit data to data-build/ with build:audit-corpus; upload to private audit-corpus for runtime downloads, avoiding oversized bundles.
- FRCA hubs share ExamLessonLinks to resolve curriculum IDs and collapsible anchors without drift.
- Diagram snapshots recursively scan diagram folders and topic atlases, including static SVG plates, so moves or missing interactions cannot remove visual-review coverage.
- Anatomy root verification recursively parses TSX object properties; positional heuristics are limited to declared anterior projections because label positions and other views cannot prove anatomical laterality.
- Painted anatomy plates carry optional plate-specific audit warnings beside the artwork so uncorrected printed labels cannot silently appear verified.
- Anatomy source directory is generated from component/atlas metadata before dev/build, with one entry per atlas plate and explicit missing-source flags; citations must never imply anatomical certification.
- Anatomy directory review completion applies only to page wording and record handling; derive artwork classification from source URL and rights metadata, retain historical-plate/hotspot uncertainty, and never infer verification from an empty warning list.
- Anatomy topic bibliographies reuse editorial topicReferences through anatomyReferences; automation checks record integrity without AI, because a generated verdict cannot establish source support or anatomical accuracy.
- APRVSection unifies ventilation guidance, sources and learning checks.

- Keep expanded lessons in imported Teaching modules for audit retention; ICU outcomes use IcuOutcomesTeaching and reference excerpts, distinguishing periods, denominators, endpoints and symptom thresholds to avoid conflation.
- Citation-snapshot generation must resolve the data-driven topic route table and refuse empty output when fixed findings exist, so routing refactors cannot erase regression coverage.
- Keep curriculum subsection coverage in curriculum-expansion.md and mark batches checked only after source, rendering and audit-corpus verification, so partial expansion cannot imply whole-topic completion.
- Search uses src/data/searchIndex.generated.json, rebuilt by scripts/build-search-index.ts on predev/prebuild and lazy-loaded on dialog open. Reuse the audit extractor and CollapsibleSubsection anchors for exact links; filter named imports to prevent cross-topic leakage and give each export a prose queue so later lessons are retained.

- Keep acid-base teaching and linked displays aligned with canonical charge/unit conventions; qualitative Stewart controls must not present an unvalidated numerical pH, and toxin unit conversion must not issue automated treatment verdicts from incomplete clinical inputs.
- Keep PEEP management in its own registered topic linked from Mechanical Ventilation; put case teaching in a Teaching module and label invented observations as fictional, not patient records or predicted responses. Its timing explorer performs arithmetic only, so breath timing cannot imply a predicted intrinsic PEEP or patient-safe setting.
- Keep metabolic alkalosis as a source-led registered topic linked from Acid-Base Disorders, with its parent-page lesson in the shared Teaching module; reuse verified excerpt records so quotations cannot drift and distinguish physiological correction from proven clinical outcome benefits.
- Keep ICU liberation teaching in the Mechanical Ventilation Teaching module; separate readiness screening, SBT tolerance and airway/extubation decisions so a numeric index cannot become automatic clearance.

- Keep fluid tonicity teaching in its own registered topic linked from Acid-Base Disorders; trial outcome detail stays in the acid-base saline/balanced lesson so the two cannot drift.
- Keep haemorrhagic shock physiology, monitoring and trial evidence in its own registered topic linked with Trauma; NICE NG39 primary survey and bolus detail stay on the trauma page so the two cannot drift.
- Keep ICU ventilation protocol teaching in its own registered topic linked from Mechanical Ventilation; weaning readiness and SBT detail stay in the Mechanical Ventilation weaning lesson so the two cannot drift.
- Load the user-provided heart through CDN asset pointers with precomputed detail levels; keep DOM figure wrappers outside the Three.js scene and never simplify the mesh on the render thread.

- Keep endocrine resuscitation lessons in the shared EndocrineEmergenciesTeaching module; distinguish adrenal replacement from septic-shock adjuncts and explicitly name the adopted DKA guideline so different resolution criteria cannot silently merge.
- Keep NTS expansions in NTSEvidenceTeaching using topic-reference quotations; distinguish operational debriefs from psychological interventions and TeamSTEPPS tools from local adaptations to prevent unsafe conflation.
- Standalone endocrine pages reuse parent excerpts; tests enforce identical wording.

- Admin learning aggregates require server-checked admin access and account-scoped study-time caches; saved progress is distinct from visitor estimates.
