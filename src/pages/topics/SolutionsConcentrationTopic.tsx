import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { SolutionsConcentrationDiagram } from "@/components/diagrams/SolutionsConcentrationDiagram";
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
            </div>
            </CollapsibleSubsection>
          </ExamSection>
        </>
      }
    />
  );
};

export default SolutionsConcentrationTopic;
