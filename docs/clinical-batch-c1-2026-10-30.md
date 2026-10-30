# Clinical batch C1 — CL-52, CL-53 (30 Oct 2026)

Source: AoMRC Code of Practice for the Diagnosis and Confirmation of Death, January 2025 (incl. RCPCH 2025 Appendix 2):
https://www.aomrc.org.uk/wp-content/uploads/2025/01/Code_of_Practice_Diagnosis_of_Death_010125.pdf
Sections cited by the prepared payload: 2.2–2.5, 5.13–5.18, 6.21–6.25, 6.35–6.38, 6.43, 6.49–6.53, 6.54–6.67, Appendix 2 A6–A9. The builder did not re-fetch the PDF in this turn; wording is the reviewer-prepared payload.

## Guard result
All 18 `before` snippets matched exactly once in the current files (no drift); replaced verbatim with the payload `after` text. No other lines edited.
File SHA-256 before edit (current head, differs from the payload's local-copy hashes only in ways that did not affect any snippet): OrganDonationTopic `0cc404d0…a7a3ce`, NeurointensiveCareTopic `b2005bab…f3f0`.

## Edits
- `src/pages/topics/OrganDonationTopic.tsx` — 17 edits at original lines 16, 71–72, 110, 140, 175, 181 (+1 inserted li), 198, 207, 366, 387, 402, 424, 459, 460, 480, 497, 617.
  - CL-52: DCD time of death no longer the start of the 5-min observation; DNC ordinarily at second set, later if required ancillary evidence outstanding; stale "first BSD set" removed.
  - CL-53: UK examination list (vestibulo-ocular, cranial-nerve motor response); "permanent" definition; pre-testing observation (6 h / 24 h; <24 months 24 h before testing and 24 h between sets); ancillary-investigation indications and <24-month limitation; universal "≥6 h apart" removed.
- `src/pages/topics/NeurointensiveCareTopic.tsx` — 1 edit (line 495) adding pre-testing observation, <24-month rules and ancillary limitation; rewarming and apnoea-abort text preserved.

## Generated copies
- `src/test/__snapshots__/topic-faq-snapshots.test.ts.snap` — 2 lines (the edited FAQ answer, DOM + JSON-LD).
- `src/data/searchIndex.generated.json` — regenerated.

## Checks
- Residual search in both files: no "start of observation" death-time claim (only "not backdated" statements), no first-set DNC claim except the dated 2008 historical note, no "6 h apart", no "oculocephalic".
- Typecheck (`tsgo -p tsconfig.app.json`): clean.
- `topic-faq-snapshots`: diff was only the intended FAQ answer; updated, passes.
- `diagram-source-citations`: fails on a pre-existing, unrelated entry (`[missing-topicId] OperativeStepsTopic.tsx`); not touched in this batch.

## Residual limitations
- Not consultant-reviewed; no clinical certification implied.
- CTA wording/modality protocols and donor-optimisation content unchanged (excluded by payload).
- No database, viva, Ask AI, podcast or audit-corpus updates in this batch; saved dynamic copies were not rechecked for these claims.
- Page not visually inspected in a browser.
