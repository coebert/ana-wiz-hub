# Anatomy diagram audit & SVG replacement

## Goal
Every anatomy label is **defined in code** (SVG `<text>` + leader-line `<path>`), so labels and arrows can be reviewed, corrected, and version-controlled. No more pixel-baked labels that we can't fix.

## Scope
- **35 painted plates** in `src/assets/plates/` driven by `CorPictumFolio` + `anatomyFolios.ts` (cardiac, thoracic, abdominal, airway, head/neck, neuro, spinal, brachial, upper limb, lower limb).
- **~60 existing hand-coded anatomy SVG components** (CircleOfWillis, BrachialPlexus, CoronaryTree, Dermatome, Nephron, NeckCrossSection, OrbitAnatomy, LaryngealCrossSection, FoetalCirculation, etc.) — audit labels + leader endpoints against standard anatomy references.

## Approach

### 1. Build a reusable SVG anatomy primitive
A single `AnatomyPlate` component that takes:
- a `viewBox` and a stylised `<path>`/`<g>` body for the structures (drawn in muted clinical palette using existing HSL tokens),
- a `labels[]` array of `{ text, anchor:[x,y], leader:[x,y][], side:'L'|'R' }`,
- automatic leader-line routing, label boxes, exam-filter integration, and the same caption/checkpoint footer used by `PatientPositioningIllustrations`.

This replaces both the JPEG-based `CorPictumFolio` *and* the ad-hoc inline SVGs across the diagram folder, giving one consistent visual language and one place to audit label accuracy.

### 2. Replace painted plates in batches
Order by curriculum weight (most-tested first). Each batch ships a working topic page before moving on:

1. **Cardiac** — anterior heart, conduction system, short-axis (3 plates) — *CardiacAnatomyTopic*
2. **Airway** — sagittal, coronal, axial, laryngoscopic (4 plates) — *AirwayManagementTopic*
3. **Neuraxial / Spinal** — sagittal, posterior, caudal (3 plates) — *SpinalAnatomyTopic*
4. **Brachial plexus** — roots-to-branches, interscalene cross-section (2 plates) — *BrachialPlexusTopic*
5. **Upper limb** — arteries, veins, nerves, axilla, forearm (5 plates) — *UpperLimbAnatomyTopic*
6. **Lower limb** — arteries, veins, nerves, femoral, popliteal (5 plates) — *LowerLimbAnatomyTopic*
7. **Head & neck + skull base + neuro** — carotid, superficial, orbit ×2, neck-C6, skull base ×2, Circle of Willis, midsagittal brain (9 plates) — *NeuroanatomyTopic*
8. **Thoracic + abdominal** — thoracic anterior, mediastinum, abdominal anterior, retroperitoneum (4 plates) — *ThoracicAnatomyTopic*, *AbdominalAnatomyTopic*

### 3. Audit existing SVG anatomy diagrams
After the painted plates are replaced, sweep the existing `*Diagram.tsx` anatomy files. For each: open the rendered SVG, verify every label points to the anatomically correct structure (e.g. ACA vs MCA on Circle of Willis, median vs ulnar at the wrist, T4 dermatome at the nipple line, RCA giving off PDA in 85% etc.). Fix label text and leader endpoints in code. Group the fixes per topic page so each commit is reviewable.

### 4. Retire the painted assets
Once a plate's SVG replacement ships, delete the corresponding JPEG and remove its entry from `anatomyFolios.ts`. Keep `CorPictumFolio` until the last plate is migrated, then delete the component and its tests.

## Cadence
This is a multi-turn job (≈8 batches for the plates + the SVG audit sweep). Each turn I'll:
- ship one batch (new SVG plate(s) + topic page wired up + tests),
- show the rendered result,
- list anatomical decisions made (e.g. "drew dominant right coronary system"),
- wait for your sign-off before the next batch.

## Technical notes
- Single `<svg>` per plate, viewBox `0 0 1000 700`, stroke widths in viewBox units.
- Vessels: arteries `hsl(var(--destructive))`, veins `hsl(217 70% 45%)`, nerves `hsl(45 90% 50%)`, muscle `hsl(15 35% 75%)`, bone `hsl(40 15% 90%)` — added as semantic tokens to `index.css` (`--anatomy-artery`, `--anatomy-vein`, `--anatomy-nerve`, `--anatomy-muscle`, `--anatomy-bone`).
- Labels: Inter 12px, black on white pill, 1px border, leader line `stroke-dasharray:none`, terminating dot at structure.
- Exam filter aware via existing `useExamFilter` so labels can be tagged Primary / Final / FFICM.
- Vitest snapshot per plate to catch regressions.
- No business logic, no DB, no edge functions touched.

## Out of scope
- 3D heart model (`GltfHeartModel`) — kept as-is.
- Non-anatomy diagrams (capnography, PV loops, ECG traces, equipment schematics) — those are physiology/equipment, not the audit target.
