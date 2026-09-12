import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";

const solutionsConcentrationFaqs: Array<[string, string]> = [
  ["What is the difference between osmolarity and osmolality?", "Osmolarity is osmoles per litre of solution (mOsm/L); osmolality is osmoles per kilogram of solvent (mOsm/kg). Plasma values overlap at 285–295, but osmolality is preferred clinically because it is independent of temperature and unaffected by the volume occupied by plasma proteins and lipids."],
  ["Why does 0.9% saline carry a risk of hyperchloraemic acidosis?", "It contains 154 mmol/L Cl⁻ — well above the plasma range of 95–105. Large volumes raise plasma Cl⁻, lowering the strong-ion difference and producing a normal-anion-gap metabolic acidosis. Balanced crystalloids (Hartmann's, Plasma-Lyte) substitute lactate, acetate or gluconate for some Cl⁻ to avoid this."],
  ["How do you convert percentage concentration to mg/mL?", "A 1% solution = 1 g/100 mL = 10 mg/mL. So 2% lidocaine is 20 mg/mL, 0.5% bupivacaine is 5 mg/mL, and 1:200 000 adrenaline (1 g per 200 000 mL) is 5 µg/mL. This conversion is essential when calculating maximum safe local anaesthetic doses from the syringe label."],
];
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { SolutionsConcentrationDiagram } from "@/components/diagrams/chemistry/SolutionsConcentrationDiagram";
import { solutionsConcentrationQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

const objectives = [
  "Convert between %, mg/mL, mmol/L and ratio expressions of drug concentration",
  "Define osmolality, osmolarity, tonicity and the osmolar gap, and use them clinically",
  "List the four colligative properties and relate them to particle number rather than identity",
  "Predict cellular volume changes from hypotonic, isotonic and hypertonic solutions",
  "Apply safe-correction principles to acute and chronic hyponatraemia (osmotic demyelination risk)",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Adrenaline ratio conversions for anaphylaxis",
    scenario:
      "An adult collapses with anaphylaxis. You have ampoules labelled 1:1,000 and 1:10,000. What concentration is each, and how much do you draw up for the IM dose?",
    working:
      "1:1,000 = 1 g in 1,000 mL = 1 mg/mL.\n1:10,000 = 1 g in 10,000 mL = 100 µg/mL.\nIM dose for an adult = 500 µg = 0.5 mg → 0.5 mL of 1:1,000.\nIV dose during cardiac arrest = 1 mg = 10 mL of 1:10,000.",
    answer:
      "Use 1:1,000 (1 mg/mL) for the IM anaphylaxis dose (0.5 mL = 500 µg). Use 1:10,000 (100 µg/mL) for IV cardiac-arrest doses. Mixing the two up is a classic 'never event' — always re-check the ampoule before administration.",
    cites: ["Cross & Plunkett Ch.3"],
  },
  {
    title: "Calculated osmolarity and the osmolar gap",
    scenario:
      "A patient presents with metabolic acidosis. Na⁺ 140 mmol/L, urea 6 mmol/L, glucose 5 mmol/L. Measured plasma osmolality is 320 mOsm/kg. Is the osmolar gap raised?",
    working:
      "Calculated osmolarity = 2[Na⁺] + [urea] + [glucose] = 2×140 + 6 + 5 = 291 mOsm/L.\nOsmolar gap = measured − calculated = 320 − 291 = 29 mOsm/kg (normal <10).",
    answer:
      "Yes — an osmolar gap of 29 mOsm/kg is markedly raised. Suspect an unmeasured osmole: methanol, ethylene glycol, ethanol, mannitol or propylene glycol. Combined with the metabolic acidosis (high anion gap) this raises ethylene glycol or methanol toxicity; treat with fomepizole (or ethanol) and urgent toxicology input.",
    cites: ["Lobo & Awad 2014"],
  },
];

const SolutionsConcentrationTopic = () => {
  return (
    <TopicTemplate
      title="Solutions & Concentration"
      subtitle="Molarity, osmolality, tonicity, and colligative properties"
      backPath="/chemistry"
      backLabel="Chemistry Foundations"
      accentColor="text-chemistry"
      topicId="solutions-concentration"
      topicTitle="Solutions & Concentration"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={solutionsConcentrationQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY], curriculumCodes: ["RCoA Primary — Physics & Clinical Measurement"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        workedExamples: ["Severs 2015", "Lobo & Awad 2014", "Cross & Plunkett Ch.3"],
        keyPoints: ["NICE CG174", "Severs 2015", "Cross & Plunkett Ch.3", "Lobo & Awad 2014"],
      }}
      keyPoints={[
        { text: "1% solution = 10 mg/mL. Adrenaline 1:1,000 = 1 mg/mL; 1:10,000 = 100 µg/mL", cites: ["NICE CG174"] },
        { text: "Osmolality (mOsm/kg) is measured; osmolarity (mOsm/L) is calculated. Clinically near-equivalent", cites: ["Severs 2015"] },
        { text: "Normal plasma osmolality 280–295 mOsm/kg. Calculated = 2[Na⁺] + [urea] + [glucose]", cites: ["Cross & Plunkett Ch.3"] },
        { text: "Tonicity considers only non-membrane-permeable solutes. 5% dextrose is hypotonic in vivo", cites: ["Lobo & Awad 2014"] },
        { text: "Osmolar gap >10 → suspect methanol, ethylene glycol, ethanol or mannitol", cites: ["NICE CG174"] },
        { text: "Colligative properties (BP elevation, FP depression, osmotic pressure, VP lowering) depend on particle number, not type", cites: ["Severs 2015"] },
        { text: "Hyponatraemia → cellular oedema. Correct slowly (<10 mmol/24h) to avoid osmotic demyelination syndrome", cites: ["Cross & Plunkett Ch.3"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Solutions in Anaesthetic Practice" defaultOpen>
            <p className="text-muted-foreground leading-relaxed">
              Every drug you administer is a solution. Understanding concentration units, osmolality, and tonicity is essential
              for safe prescribing and fluid management. Errors in concentration calculations (particularly with adrenaline and
              insulin) are a significant cause of drug errors in anaesthesia and remain a UK 'never event'.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="diagram" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Interactive Diagram">
            <SolutionsConcentrationDiagram />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="concentration-units" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["RCoA Primary — Clinical Measurement"]}>
            <CollapsibleSubsection title="Concentration Units">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Percentage (% w/v)</strong> = grams of solute per 100 mL of solution. So 1% = 10 mg/mL, 0.9% NaCl = 9 mg/mL.
                <strong> Ratio (e.g. 1:1,000)</strong> expresses parts of solute to parts of total solution by weight/volume:
                1:1,000 = 1 g in 1,000 mL = 1 mg/mL. <strong>Molarity (mol/L)</strong> normalises by particle number; 1 mole of NaCl
                dissociates into 2 osmoles, which is why osmolarity ≠ molarity for electrolytes.
              </p>
              <p>
                Common pitfalls: lidocaine 2% = 20 mg/mL (not 2 mg/mL); bupivacaine 0.25% = 2.5 mg/mL; phenylephrine 100 µg/mL
                is a dilution of the 10 mg/mL ampoule (1 mL into 100 mL).
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="molarity-molality" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Molarity and Molality">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Molarity</strong> (mol/L) expresses moles of solute per litre of <em>solution</em>. Because it is defined
                by volume, molarity is temperature- and pressure-dependent — a solution's volume expands slightly on warming,
                subtly reducing its molarity. <strong>Molality</strong> (mol/kg) expresses moles of solute per kilogram of
                <em> solvent</em>, a mass-based quantity unaffected by temperature or pressure.
              </p>
              <p>
                In dilute aqueous clinical solutions the two are numerically very similar, since the density of water is
                approximately 1 kg/L. This is why plasma osmolality (mOsm/kg, the value a laboratory osmometer actually measures
                by freezing-point depression) and calculated osmolarity (mOsm/L) are often used interchangeably at the bedside,
                even though osmolality is the physically correct, temperature-independent unit and the standard in physical
                chemistry and laboratory osmometry.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="osmolality-tonicity" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Osmolality, Osmolarity & Tonicity">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Osmolality</strong> (mOsm/kg of solvent) is what an osmometer measures by freezing-point depression.
                <strong> Osmolarity</strong> (mOsm/L of solution) is calculated. In dilute aqueous solutions the two are nearly
                identical. Normal plasma osmolality is 280–295 mOsm/kg.
              </p>
              <p>
                <strong>Tonicity</strong> considers only solutes that cannot cross the cell membrane (effective osmoles). 5% dextrose
                is iso-osmolar in the bag but hypotonic in vivo because glucose is metabolised, leaving free water that distributes
                across all body compartments. Hartmann's is mildly hypotonic (osmolarity 278 mOsm/L) and 0.9% saline is iso-osmotic
                (308 mOsm/L) but causes hyperchloraemic acidosis with large volumes.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="osmolar-gap" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Calculated Osmolarity & The Osmolar Gap">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Calculated osmolarity = 2[Na⁺] + [urea] + [glucose]</strong> (all in mmol/L). The factor of 2 accounts for
                the accompanying anion (mainly Cl⁻ and HCO₃⁻). The <strong>osmolar gap</strong> = measured − calculated; normally
                &lt;10 mOsm/kg.
              </p>
              <p>
                A raised osmolar gap suggests an <strong>unmeasured osmole</strong>: methanol, ethylene glycol, ethanol, mannitol,
                propylene glycol (a vehicle in lorazepam and phenytoin infusions) or isopropanol. Combined with a high anion-gap
                metabolic acidosis, methanol or ethylene glycol toxicity should be suspected and treated empirically with fomepizole.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="colligative" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Colligative Properties">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Colligative properties depend on the <strong>number</strong> of dissolved particles, not their identity. The four
                are: <strong>boiling-point elevation, freezing-point depression, osmotic pressure</strong>, and <strong>vapour-pressure
                lowering</strong>. Freezing-point depression is exploited by clinical osmometers; osmotic pressure underlies fluid
                shifts across capillary and cellular membranes.
              </p>
              <p>
                <strong>Osmotic pressure</strong> is described quantitatively by <strong>van't Hoff's law, π = nCRT</strong> (or
                equivalently π = iMRT), where π is osmotic pressure, C (or M) is molar concentration, R is the gas constant, T is
                absolute temperature and n (or i, the van't Hoff factor) is the number of particles produced per mole of solute —
                the formula is analogous to the ideal gas law and treats dissolved particles as if exerting pressure on a
                semi-permeable membrane. <strong>Oncotic (colloid osmotic) pressure</strong> is the fraction of total plasma osmotic
                pressure exerted by large, membrane-impermeant plasma proteins — mainly <strong>albumin</strong>, which contributes
                roughly 75–80% of it — and is normally around <strong>25–28 mmHg (≈3.3 kPa)</strong>, small compared with total
                plasma osmotic pressure (~5,600 mmHg) but critical because it is the pressure that opposes capillary hydrostatic
                pressure.
              </p>
              <p>
                The classical <strong>Starling principle</strong> describes net capillary filtration as the balance of hydrostatic
                and oncotic pressure gradients across the capillary wall. The <strong>revised Starling principle</strong>
                incorporates the endothelial glycocalyx layer, showing that the subglycocalyx oncotic pressure (not interstitial
                oncotic pressure) opposes filtration, and that under normal conditions there is little or no absorption at the
                venous end of most capillaries — filtered fluid is instead returned via lymphatics. Clinically, this explains why
                <strong> hypoalbuminaemia</strong> (nephrotic syndrome, liver disease, sepsis, critical illness) lowers oncotic
                pressure and promotes oedema, and why the benefit of infused <strong>colloids</strong> in expanding plasma volume
                is less durable than once assumed once the glycocalyx is damaged (e.g. by inflammation, sepsis, or excessive
                crystalloid administration), allowing colloid to leak into the interstitium.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="hyponatraemia" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["FFICM 3.4"]}>
            <CollapsibleSubsection title="Hyponatraemia & Safe Correction">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Acute hyponatraemia (&lt;48 h) causes cerebral oedema → headache, seizures, coma. Symptomatic acute hyponatraemia
                is treated with hypertonic 1.8–3% saline boluses. <strong>Chronic</strong> hyponatraemia (&gt;48 h) requires cautious
                correction: rise &lt;10 mmol/L in the first 24 h and &lt;18 mmol/L over 48 h to avoid <strong>osmotic demyelination
                syndrome</strong> (formerly central pontine myelinolysis).
              </p>
              <p>
                Always classify by volume status (hypovolaemic, euvolaemic, hypervolaemic) and urine osmolality/Na⁺ before treatment.
                SIADH is the commonest perioperative cause of euvolaemic hyponatraemia.
              </p>
              <p>
                <strong>Sodium deficit (mmol) = TBW × (target [Na⁺] − measured [Na⁺])</strong>, where total body water (TBW) is
                approximated as 0.6 × weight (kg) in men and 0.5 × weight in women, falling further to around 0.5 (men) / 0.45
                (women) in the elderly and in obesity, reflecting reduced lean mass and relatively greater fat (which contains
                little water). For example, a 70 kg man with Na⁺ 118 mmol/L targeted to a safe interim value of 126 mmol/L has
                TBW ≈ 42 L, giving a deficit of 42 × (126 − 118) = 336 mmol that must be replaced gradually, not as a single bolus.
              </p>
              <p>
                The <strong>Adrogué–Madias formula</strong> predicts the change in serum sodium produced by one litre of a given
                infusate: <strong>ΔNa⁺ = (infusate [Na⁺] − serum [Na⁺]) / (TBW + 1)</strong>. It allows the infusion rate to be
                titrated to stay within the safe correction limits above, but it assumes a closed, single-compartment system and
                <strong> ignores ongoing renal or gastrointestinal losses</strong>, which can make correction faster or slower than
                predicted (particularly as a suppressed ADH switches off and a brisk water diuresis begins). Serum sodium should
                therefore be re-measured frequently — every 2–4 hours during active correction — with the infusion adjusted or
                desmopressin/5% dextrose given to slow an overly rapid rise.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          <TopicFaqs faqs={solutionsConcentrationFaqs} />
        </>
      }
    />
  );
};

export default SolutionsConcentrationTopic;
