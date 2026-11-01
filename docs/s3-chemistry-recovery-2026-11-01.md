# S3 bounded chemistry recovery — 1 November 2026

## Recovery and preservation

Started from current clean HEAD `9dad139e4ccc606ac6f9bb2b5bfcf28627055df0`, not reset to `51bcc...`. No named prior chemistry helper, ketamine component/connection tables or `/tmp/s3` were present in this sandbox. New chemistry records were retrieved, not blindly replayed. Targeted replacements preserved shared quiz/reference files and unrelated work. `s3-chemistry-guards.json` records exact anchors for the second reconciliation set; it is not a complete all-edit manifest.

## Original IDs and implemented scope

- **SCI-032:** corrected fuel-cell FAQ to gold cathodic oxygen reduction and lead anodic oxidation, retaining correct equations; body now explicit. Keypoints and radical panel distinguish superoxide/hydroxyl/NO radicals from nonradical H₂O₂ and ONOO− RNS. Adjacent source records and FAQ source note.
- **SCI-047:** actual secondary category added; ketamine and ephedrine removed from tertiary. Secondary SVG shows two R groups plus H. Given illustrative pH 7.4, pKa 7.5 computes 0.4426883662, about 44%, not mostly neutral. No interactive input added; pure numeric helper rejects nonfinite/out-of-range values. Removed fetal-safety/onset inference, including erroneous phenylephrine tertiary label in the same panel. Other drug rows retained.
- **SCI-048:** replaced incorrect stereocentre–Cl schematic with freshly sourced complete S/R ketamine graphs. PubChem 182137 S and 644025 R; six-membered cyclohexanone, adjacent tetra-substituted carbon attached to methylamino and 2-chlorophenyl, Cl ortho on phenyl. Source bond orders and endpoint directions preserved. Source bond is from atom 4 to nitrogen 3, S code 6 (hashed) and R code 1 (solid); renderer follows bond records, not atoms[3]. Independent RDKit parsing of fresh SDF assigns centre 3 zero-based as S and R respectively. SVG maps y upward source coordinates to screen downward without an x reflection. Removed unsourced superiority statements in this chirality state and matching ketamine quiz/worked-answer copies, without broad rewrite of other chiral drug teaching.
- **SCI-049:** shared drug-specific hydrolysis explanation in selected ester and parent table. Remifentanil non-specific blood/tissue esterases, not plasma cholinesterase; atracurium Hofmann plus nonspecific esterases, unaffected by low pseudocholinesterase; some ester LAs use butyrylcholinesterase. Blanket plasma completion removed; prior systemic half-life vs block duration and prolonged topical tetracaine preserved.
- **SCI-050:** complete-name limited i mnemonic, one i in -caine, with structural definition by linkage. Actual amide SVG, explanation, parent table and organic quiz option/rationale aligned.
- **SCI-051:** thiopentone removed from benzene examples in diagram, parent table and keypoint; accurately named substituted thiobarbiturate heterocycle. Propofol/midazolam retained. No new penetration claim from nonexistent ring.

No generic fallback needed for SCI-048. These corrections are not whole-topic clinical certification.

## Source access and independent verification

Direct PUG REST data retrieved for ketamine 3821, ephedrine 9294 and lidocaine hydrochloride 6314; IUPAC/SMILES identify methylamino secondary groups and acetamide linkage. Fresh stereo 2D SDF for 182137 and 644025 was parsed both by raw V2000 extraction and RDKit. Heavy-atom graph is stored in `ketamineConnectionTables.ts`, including record hashes. Explicit hydrogens omitted visually; NH and methyl terminal bond remain shown. Source-defined absolute configuration independently checked, not derived from plus/minus optical rotation.

Both eMC 794 and 6297 full texts retrieved via website gateway; relevant exact paragraphs read. NIST thiopental identity, InChI and heterocyclic systematic name retrieved; no fabricated source quote asserting "no benzene".

PMC2248324 full text retrieved and exact paragraph "Although not a free radical in nature, peroxynitrite..." read. User-provided ScienceDirect identifier S0076687994330263 resolves to *Oxidative chemistry of peroxynitrite*, not a fuel-cell electrode chapter; only abstract/landing text available, not used to substantiate electrode claim. Direct manufacturer PO2ES-41P PDF retrieved/read instead: gold oxygen cathode, lead anode, alkaline electrolyte and balanced reactions. This validates electrode chemistry, not every retained lifetime/accuracy/speed statement or device. Clinical specifications outside named correction are not newly certified.

ChEBI/ACMD/eMC6277 were not independently retrieved by root in this batch; no quotes copied from them or assertion of their verification. ChEBI149673 is protonated ephedrine, not fetal-safety evidence. PubChem sources and explicit letter counting support chemistry/name explanation; mnemonic is an aid, not asserted guideline. Temporary full evidence at `/tmp/s3-recovery`; no raw fetches written into project.

## Checks actually executed

- `bunx vitest run src/test/s3-chemistry-recovery.test.tsx`: **10 passed**. Concrete calculation, invalid-number cases, actual three-class selections, six-membered closed-ring topology, carbonyl adjacency, ortho chlorine, secondary nitrogen, stereobond direction/order and specified source configurations; actual ester/amide/benzene selections and extracted FAQ/body.
- Combined chemistry + previous CL91/92 + governance/scanner run: **31 passed, 4 files passed**, no failures. React Router future-flag warnings only.
- Both citation label and section-source scanners: **passed across 191 pages**.
- Local search generator: **192 topics, 1,251 heading + 16,917 prose records, 2,469 KB**. Local output only, no audit corpus upload or podcast/cache/database work; extraction limits mean not every shared claim is indexed. FAQ extractor executes in focused test, not blanket generated schema refresh.
- Browser: normal public learner pages, 1280 × 1800 and 390 × 844. Actual three amine choices, Organic ester/amide/benzene/chirality controls, both S/R structures, expanded fuel FAQ and radical section. **20 captures viewed**, including full individual enantiomer captures desktop/mobile. No page errors or document overflow. Native collapsed sections opened before locating controls; initial selector failures were corrected and full flow rerun successfully.
- Automatic harness logs recorded **build OK** after changes. No separate manual semantic typecheck or production build: builder restrictions apply. No skipped manual check claimed passed; automatic validation is separate from tests.

No full-app test suite rerun or unrelated provenance/snapshot cleanup. No database rows/backend deployments/safety-pause edits/audio/transcripts/credentials/payment settings/publication. Root `AGENTS.md` records source-derived graph/shared chemistry-prose convention. Terminal commit is reported in chat after automatic save.
