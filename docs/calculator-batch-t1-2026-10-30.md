# Calculator batch T1 — ROOT-12/13/14/15/18 (30 Oct 2026)

Scope: four calculators only. Preserves the donation update and the C1 death-determination corrections. No database edits. Not published.
These are scoped fixes to named defects. They do not certify any calculator or regimen as clinically validated.

## Files
- `src/lib/calculators/t1-calculators.ts` (new): pure helpers. All of them return null or "ineligible" for non-finite or non-positive input.
- `src/lib/calculators/t1-calculators.test.ts` (new, 17 tests); `src/components/diagrams/__tests__/t1-calculators-render.test.tsx` (new, 5 rendered-state tests).
- `src/components/diagrams/clinical/OpioidConversionCalculator.tsx`, `PcaEpiduralCalculator.tsx`, `src/components/diagrams/intensive-care/ParklandCalculator.tsx`, `src/pages/tools/SedationCalculatorTool.tsx`: rewritten or corrected.
- `src/pages/topics/PainMedicineTopic.tsx`: only the two calculator intro paragraphs, which described the removed automatic behaviour (needed for consistency).
- `src/data/searchIndex.generated.json`: regenerated.

## Status by ID
- **ROOT-12: completed.**
  - One convention is used: the FPM Opioids Aware oral potency table and transdermal tables (reviewed Mar 2023).
  - Patch input is limited to FPM-listed strengths and maps to oral morphine mg/24 h by table lookup only. There is no ÷24 and no nearest-patch snapping.
  - Patch and rescue outputs are removed. Parenteral routes and IV fentanyl are removed.
  - Inputs are validated: zero, negative or NaN input gives no result.
  - The old 1.92 and 0.01 factors are gone.
- **ROOT-13: completed / mitigated.**
  - The target interval must be selected; the source interval is no longer inherited.
  - The reduction follows FPM: 25–50% as a starting point, and at least 50% at ≥500 mg/24 h, elderly/frail, or switching for intolerable effects. The invented ">200 mg" high-risk trigger is removed.
  - The universal titration and washout text is removed.
  - The patch teaching now separates onset (previous opioid continued for about the first 12 h) from the 72 h steady-state review, per the Scottish guidance.
  - The CYP2D6 "~10%" claim and the blanket "not for opioid-naive" statement are removed rather than re-asserted (not re-sourced).
- **ROOT-14: completed for paediatrics; adult values mitigated.**
  - Paediatrics implements the RCH PCA dilution table (<45 kg / ≥45 kg): bolus, optional background, measured weight only.
  - The RCH epidural uses ropivacaine 0.2% at 0.1–0.3 mL/kg/h, and no rate above that is ever shown.
  - Age is entered in months. Neonates, infants under 8 months and hepatic impairment get no rate.
  - The bupivacaine ceiling is no longer applied to ropivacaine.
  - The weight estimate no longer overwrites the entered weight.
  - PCA eligibility follows RCH (cognitive ability), not a fixed age. NCA is not calculated.
  - Sensory level and Bromage motor assessment are now separate.
  - **Unresolved:** adult PCA cards are kept as labelled "examples", not sourced to a named protocol. No adult epidural rate is computed.
- **ROOT-15: completed.**
  - The automatic weaning table and "Final: Stop" row are removed.
  - The tool is scoped to adults. Weight must be finite, greater than 0 and no more than 300 kg, otherwise no pump rates are shown.
  - Non-finite values show "—", not 0.
  - The unused RASS selector is removed.
  - Remifentanil text now follows the SmPC (emc 794):
    - withdrawal after abrupt cessation, particularly after >3 days;
    - staged ICU discontinuation (0.1 micrograms/kg/min up to 1 h before extubation, then 25% decrements at least 10 min apart);
    - alternative analgesia established in advance;
    - not recommended beyond 3 days or in ICU patients under 18;
    - ideal body weight in obesity (Devine IBW used when height is entered).
  - **Unresolved:** start and maintenance values for all four drugs are not re-sourced in this batch. The other drugs' weaning notes have their numeric steps removed.
- **ROOT-18: completed.**
  - A "rate now" appears only when both hours since injury and fluid given are entered.
  - After 8 h the first-8 h rate stops; after 24 h no first-day output appears.
  - Galveston is flagged as including maintenance, with no added 4-2-1.
  - The population is explicit: the child target is 1 mL/kg/h, so the 20 kg example gives 20 mL/h.
  - The Ivy example is corrected to 240 mL/kg, below 250. The Ivy check uses formula plus entered other fluids.
  - Added the named NSW ACI modified Parkland (3 mL/kg/%TBSA) and an adults-only ABA 2023 option.
  - The electrical formula was removed as a standalone formula and replaced by a protocol note.
  - **Unverified:** the ABA 2023 2 mL/kg/%TBSA adult starting figure and its ≥20% TBSA scope were taken from the payload. The full text (doi 10.1093/jbcr/irad125) was not retrieved.

## Sources retrieved this turn
- FPM: https://www.fpm.ac.uk/opioids-aware-structured-approach-opioid-prescribing/dose-equivalents-and-changing-opioids
- Scottish fentanyl patches: https://www.rightdecisions.scot.nhs.uk/scottish-palliative-care-guidelines/pain/pain-medicines-analgesics/fentanyl-patches/ (the buprenorphine page is linked but was not fetched)
- RCH epidural: https://www.rch.org.au/anaes/pain_management/Epidural_Infusion/
- RCH PCA: https://www.rch.org.au/anaes/pain_management/Patient_Controlled_Analgesia_PCA/
- Remifentanil SmPC: https://www.medicines.org.uk/emc/product/794/smpc
- NSW ACI: https://aci.health.nsw.gov.au/networks/burn-injury/resources/patient-management/fluid-resuscitation
- Not fetched: eviQ, Victorian trauma burns, PMC5582395, ABA 2023.

## Checks
- New tests: 22/22 pass. Existing `clinical-formulae.test.ts`: 18/18 pass. Typecheck clean.
- `diagram-a11y-all`: the four edited calculators pass. Four unrelated operation diagrams fail (pre-existing).
- `diagram-source-citations`: pre-existing failure only (`OperativeStepsTopic.tsx` missing topicId).
- The rendered states were checked with Testing Library. A live browser run could not locate the calculators inside the collapsed topic sections, so they were not inspected visually.
