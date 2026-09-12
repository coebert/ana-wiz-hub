# Batch 1 Content Expansion Plan

## Scope
Expand only the 21 supplied findings across eight existing topics, preserving the current FRCA/FFICM tone, collapsible structure, exam mappings, and citation system.

## Content changes
- **Volatile agents:** add environmental considerations, a system-by-system effects comparison, and an agent-specific hazards/contraindications section.
- **Pharmacodynamics:** add a full hysteresis/proteresis explanation with a compact counter-clockwise loop diagram, plus spare-receptor physiology and clinical implications.
- **Pharmacokinetics:** expand clearance and extraction ratio formulas, add first- versus zero-order kinetics, and add critical-illness pharmacokinetics including ARC, organ failure, CKRT, and ECMO.
- **Foetal circulation:** add a duct-dependent congenital heart disease section separating pulmonary-flow, systemic-flow, and mixing-dependent lesions.
- **Haematology and immunity:** expand rebalanced haemostasis in liver disease, transfusion-reaction mechanisms, hypersensitivity Types II–IV, and tranexamic acid pharmacology/evidence.
- **Endocrine physiology:** add myxoedema coma and diabetic emergencies; expand phaeochromocytoma preparation and tiered perioperative steroid cover.
- **Gastrointestinal physiology:** add the major GI hormones, a full abdominal compartment syndrome section, and liver physiology with anaesthetic implications.
- **Renal physiology:** add detailed segmental potassium handling and hormonal/acid–base regulation.

## Sources and safety
- Add the supplied journal/guideline sources to the shared reference registry where absent.
- Add verbatim excerpts for sources supporting specific doses or diagnostic thresholds, keeping each excerpt within the project limit.
- Cite new clinical claims in-page with `InlineRef` and include labels in topic source mappings where appropriate.
- Use authoritative existing textbook references for foundational physiology when a supplied paper does not substantiate the requested claim.
- Preserve currently correct material and expand thin sections in place rather than replacing them wholesale.

## Verification and audit sync
- Run TypeScript typecheck.
- Run `npm run check -- --rule=source-excerpts` and address failures caused by these additions.
- Verify each of the 21 requested findings against its topic and citation.
- Mark only successfully actioned IDs fixed in one database update; attach matching source metadata first if required by the citation guard.
- Report the actioned count and any intentionally open IDs with one-line reasons.
