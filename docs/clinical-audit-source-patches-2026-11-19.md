# Clinical audit — source patch application (19 Nov 2026)

Record of applying four supplied patches to the `clinical-content-audit` branch, which already
carried earlier audit fixes for the same files. Nothing here marks content as reviewed and no
clinical signoff is implied.

## Patches

| Patch | Files | Hunks | Applied cleanly | Reconciled by hand |
|---|---|---|---|---|
| `case-scenarios-final.txt` | `src/data/cases/pharmacologyCases.ts`, `src/data/cases/icuCases.ts`, `src/pages/PerioperativeCaseBank.tsx` | 37 | 36 | 1 |
| `three-additional-cases.txt` | `src/data/cases/pharmacologyCases.ts` | 6 | 6 | 0 |
| `teaching-source.txt` | 15 source files + `kb-reindex/corpus.{json,ts}` | 56 | 38 | 18 |
| `retrieval-cleanup.txt` | — (guarded SQL, not executed) | — | — | — |

No `.rej` or `.orig` files were produced; every conflicting hunk was reconciled against the
current file by comparing the patch's *after* text with the branch's existing fix.

## Reconciliation decisions

| File | Hunk(s) | Decision |
|---|---|---|
| `pharmacologyCases.ts` (case patch) | lipid-emulsion regimen | Took the patch's after text; it keeps this branch's earlier `2–3 minutes` correction and adds the 5/10-minute repeat and 12 mL/kg cumulative ceiling. |
| `physicsCases.ts` | capnography source label | Took the patch's label; DOI was already the corrected Anesthesiology 2013 record. |
| `references.ts` | capnography pool, temperature pool | Renamed the pool label to `Kodali 2013 Capnography` (the topic already cited that label) and dropped the superseded excerpt; kept the verified NICE CG65 1.1.5–1.1.6 excerpt; added `Eshraghi 2014 Zero Heat Flux` and `Kurz 1996 wound infection`. |
| `RapidSequenceInductionNote.tsx` | lede, FAQ 1, pre-oxygenation, intubation step | Took the patch's after text (removes "no positive-pressure ventilation until the tube is in place", end-tidal O₂ ≥0.90, sustained waveform confirmation) and kept the branch's DAS 2025 mask-ventilation nuance. |
| `SugammadexReversesRocuroniumNote.tsx` | lede, FAQ 1, 16 mg/kg bullet | Took the patch's after text and kept the DAS 2025 statement that sugammadex is not a reliable CICO strategy. |
| `CapnographyTopic.tsx` | confirmation working/answer, chunks, exam pitfall | Confirmation block kept this branch's seven-breath + PUMA version (superset of the patch); adopted the patch's chunk rewrites, `RCUK 2025 ALS` cite and the ≥1 kPa / seven-breath pitfall bullet. |
| `CapnographyWaveformsTopic.tsx` | flat-trace causes/action/FAQ/triage | Branch text already carried the PUMA default; unchanged. |
| `ClinicalMeasurementTopic.tsx` | hydrostatic error | Branch already states 0.74–0.75 mmHg/cm (7.5 mmHg per 10 cm); unchanged. |
| `RocuroniumTopic.tsx` | reversal answers, CICO wording | Branch already carried the DAS 2025 CICO wording; adopted the patch's exact FAQ answer (ESAIC TOF ratio >0.2) because the guarded cleanup pins its content hash. |
| `TemperatureMeasurementTopic.tsx` | two FAQs, worked-example bullets, section sources | Took the patch's after text verbatim for both FAQs (hash-pinned) and for the two bullets; section sources now list the new labels alongside the required `NICE NG125`. |
| `kb-reindex/corpus.json` | final newline | Corpus is generated; rebuilt from source instead of hand-patching. |

## Guarded retrieval cleanup

`supabase/maintenance/2026-11-19-retire-superseded-faqs.sql` holds the supplied script byte-for-byte.
It is deliberately outside `supabase/migrations/` so it is never applied automatically. It retires six
superseded FAQ rows only when all six exact replacement FAQs exist with fresh embeddings; otherwise it
raises and rolls back. It was **not** run: the sandbox has no hosted database, and it must follow a
re-index that produces the replacement vectors.

Verified against the regenerated corpus (sha256 of each chunk's `content`):

```
/pharmacology/rocuronium            dcb7a0b8…  match
/physics/capnography                8b15b16f…  match
/physics/capnography                eea811f6…  match
/physics/clinical-measurement       771d5c0b…  match
/physics/temperature-measurement    0655a146…  match
/physics/temperature-measurement    acad938a…  match
6/6 expected replacement FAQs present
```

## Generated artefacts refreshed

`corpus.json` + `corpus.ts` (899 chunks), `data-build/audit-corpus.json`,
`src/data/searchIndex.generated.json`, `supabase/functions/process-podcast-rerecord/topic-corpus.json`,
`src/lib/citationStats.json` (3096 entries), `src/data/viva-deck/manifest.json` (+4 assets, −4),
`tests/visual/__diagram-snapshot-manifest.generated.json`,
`src/test/__snapshots__/topic-faq-snapshots.test.ts.snap`.

## Verification

- `npx tsc --noEmit` — clean.
- `npx vitest run` — 3230 passed, 15 failed. The 15 are the same tests that fail on the branch head
  before these changes (`approved-model-replacements`, five `jsonld-*`, `physics-depth-teaching`,
  three `seo-regression`); no new failures.
- `npm run check` — `diagrams`, `sources`, `exam-tags`, `citation-stats` pass. `safety-citations`
  and `drug-doses` fail with the same file set and counts as the branch head, except
  `RocuroniumTopic.tsx` (2 → 5): the hash-pinned sugammadex FAQ now reads "2 mg/kg / 4 mg/kg /
  16 mg/kg" next to the word rocuronium, which the dose scanner attributes to rocuronium.
- Rendered checks in the running app: capnography confirmation criteria and CPR wording,
  rocuronium reversal answer, RSI note lede and sequence, sugammadex note lede and 16 mg/kg bullet,
  arterial-line hydrostatic paragraph, temperature FAQ section (hypothermia answer text confirmed
  in the rendered DOM).
