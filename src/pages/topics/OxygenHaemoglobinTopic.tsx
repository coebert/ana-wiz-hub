import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { OxygenDissociationCurve } from "@/components/diagrams/physiology/OxygenDissociationCurve";
import { oxygenHaemoglobinQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

const oxygenHaemoglobinFaqs: Array<[string, string]> = [
  [
    "What causes a right shift of the oxygen-haemoglobin dissociation curve?",
    "Right shift (lower affinity, easier offloading at tissues) is caused by ↑PCO₂, ↑H⁺ (acidaemia), ↑temperature, and ↑2,3-DPG (chronic hypoxia, anaemia). Mnemonic: 'CADET, face Right' — CO₂, Acid, DPG, Exercise, Temperature. The Bohr effect refers specifically to the CO₂/H⁺ shift in active tissues."
  ],
  [
    "What is the P50 and why does fetal haemoglobin have a lower value?",
    "P50 is the PO₂ at which haemoglobin is 50 % saturated — normally 3.5 kPa (26.6 mmHg) for adult HbA. HbF lacks β-chains (has γ-chains instead) which bind 2,3-DPG poorly, giving a left-shifted curve with P50 ~2.5 kPa. This higher O₂ affinity allows the fetus to extract O₂ from maternal blood across the placenta."
  ],
  [
    "How does carbon-monoxide poisoning affect the dissociation curve?",
    "CO binds Hb with ~240× the affinity of O₂, forming carboxyhaemoglobin which cannot carry O₂. It also left-shifts the residual oxy-Hb curve, impairing O₂ release to tissues. SpO₂ reads falsely normal (~100 %); diagnosis requires co-oximetry. Treat with 100 % O₂ (half-life 60 min on FiO₂ 1.0 vs 4–5 h on air) ± hyperbaric O₂ for severe cases."
  ]
];

const objectives = [
  "Describe the structure of haemoglobin and explain why the ODC is sigmoid (cooperativity).",
  "Define P₅₀ and identify the factors that shift the ODC left or right.",
  "Explain the Bohr and Haldane effects and their physiological significance.",
  "Calculate oxygen delivery (DO₂) and arterial oxygen content (CaO₂) and use them clinically.",
  "Apply the curve's shape to pre-oxygenation, hypoxaemia and CO/methaemoglobin poisoning.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Calculating arterial oxygen content and DO₂",
    scenario: (
      <>
        Patient: Hb 120 g/L, SaO₂ 98%, PaO₂ 13 kPa (97.5 mmHg), cardiac output 5 L/min. Calculate CaO₂ and DO₂.
      </>
    ),
    working: (
      <>
        <strong>CaO₂ = (1.34 × Hb × SaO₂) + (0.0225 × PaO₂)</strong> (mL O₂ per dL when Hb in g/dL and PaO₂ in kPa)
        <br />
        Convert: Hb 120 g/L = 12.0 g/dL.
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Bound: 1.34 × 12.0 × 0.98 = <strong>15.76 mL/dL</strong></li>
          <li>Dissolved: 0.0225 × 13 = <strong>0.29 mL/dL</strong></li>
          <li>CaO₂ ≈ <strong>16.05 mL/dL</strong> ≈ 160.5 mL/L</li>
        </ul>
        <strong>DO₂ = CO × CaO₂ × 10</strong> (×10 to convert dL → L)
        <br />
        DO₂ = 5 × 16.05 × 10 = <strong>~800 mL/min</strong> (normal ~1000 mL/min).
      </>
    ),
    answer: (
      <>
        CaO₂ ≈ 16 mL/dL, DO₂ ≈ 800 mL/min. Note how trivial the dissolved fraction is at room-air PaO₂ — at FiO₂ 1.0
        (PaO₂ ~80 kPa), dissolved climbs to ~1.8 mL/dL but bound is unchanged because Hb is already saturated.
      </>
    ),
    cites: ["BJA Educ 2004"],
  },
  {
    title: "CO poisoning — why SpO₂ misleads",
    scenario: (
      <>
        A 30-year-old rescued from a house fire is alert; SpO₂ on the pulse oximeter reads 99% on 15 L O₂ via reservoir
        mask. Co-oximetry shows COHb 35%. Why is SpO₂ falsely reassuring and what is happening to oxygen delivery?
      </>
    ),
    working: (
      <>
        Standard pulse oximeters use two wavelengths (660 nm, 940 nm) and cannot distinguish COHb from O₂Hb because COHb
        absorbs similarly to O₂Hb at 660 nm — SpO₂ reads "saturation" of haemoglobin that includes COHb.
        <p className="mt-2">CO has two effects on the ODC and DO₂:</p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Affinity ~240× greater than O₂ → reduces functional Hb able to carry O₂.</li>
          <li>Shifts the remaining curve <strong>left</strong> → impaired tissue offloading.</li>
        </ul>
        With 35% COHb, only 65% of Hb is available for O₂ — equivalent to anaemia (effective Hb ~7.8 g/dL), but with
        worse offloading. PaO₂ is normal because dissolved O₂ is unaffected.
      </>
    ),
    answer: (
      <>
        Use co-oximetry, not SpO₂. Treat with high-FiO₂ (reduces CO half-life from ~5 h on air to ~80 min on FiO₂ 1.0).
        Per the BJA Education review on CO poisoning, consider hyperbaric O₂ for COHb &gt;25%, loss of consciousness or
        neurological signs, pregnancy, or persistent symptoms (further reduces half-life to ~20 min).
      </>
    ),
    cites: ["Power & Kam Ch.7", "BJA Educ 2018 (CO)"],
  },
];

const OxygenHaemoglobinTopic = () => {
  return (
    <TopicTemplate
      title="Oxygen-Haemoglobin Dissociation Curve"
      subtitle="FRCA Primary — Physiology"
      backPath="/physiology"
      backLabel="Physiology"
      accentColor="text-physiology"
      topicId="oxygen-haemoglobin"
      topicTitle="Oxygen-Haemoglobin Dissociation"
      quizQuestions={oxygenHaemoglobinQuiz}
      objectives={objectives}
      workedExamples={workedExamples}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["CR_BK_03"] },
        
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["OA_BK_02"] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["West Ch.6"],
        workedExamples: ["BJA Educ 2004", "Power & Kam Ch.7", "BJA Educ 2018 (CO)", "BNF Methylthioninium"],
        keyPoints: ["BJA Educ 2016 (O2 transport)", "West Ch.6", "BJA Educ 2004", "Power & Kam Ch.7"],
      }}
      keyPoints={[
        { text: "The ODC is sigmoid due to cooperative O₂ binding to haemoglobin's four haem groups (T → R conformational change).", cites: ["West Ch.6"] },
        { text: "P₅₀ is normally 26.7 mmHg (3.5 kPa) — the PaO₂ at which Hb is 50% saturated.", cites: ["BJA Educ 2004"] },
        { text: "Right shift (↓ affinity): ↑ temp, ↑ CO₂, ↓ pH, ↑ 2,3-DPG — aids tissue O₂ delivery.", cites: ["Power & Kam Ch.7"] },
        { text: "Left shift (↑ affinity): ↓ temp, ↓ CO₂, ↑ pH, HbF, COHb, methaemoglobin — impairs O₂ offloading.", cites: ["West Ch.6"] },
        { text: "Bohr effect: ↑CO₂/H⁺ in tissues → right shift → more O₂ released. Reverses in lungs.", cites: ["BJA Educ 2004"] },
        { text: "DO₂ = CO × [(1.34 × Hb × SaO₂) + (0.0225 × PaO₂)]; normal ~1000 mL/min.", cites: ["Power & Kam Ch.7"] },
        { text: "SpO₂ is a late indicator of falling PaO₂ — pre-oxygenation provides a reservoir on the flat upper part of the curve.", cites: ["West Ch.6"] },
        { text: "Standard pulse oximetry cannot detect COHb or metHb — use co-oximetry when these are suspected.", cites: ["BJA Educ 2004"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="normal-curve" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["CR_BK_03"]}>
            <CollapsibleSubsection title="The Normal Curve" defaultOpen>
            <p className="text-foreground/90 leading-relaxed">
              The oxygen-haemoglobin dissociation curve (ODC) describes the relationship between PaO₂ and the percentage
              saturation of haemoglobin (SaO₂). The sigmoid shape reflects cooperativity: binding of the first O₂
              molecule facilitates subsequent binding (the T → R conformational change). The P₅₀ — the PaO₂ at which Hb
              is 50% saturated — is normally 26.7 mmHg (3.5 kPa).
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              Key points: at PaO₂ 13.3 kPa (100 mmHg), SaO₂ ≈ 97.5%. At the venous point (PaO₂ ~5.3 kPa / 40 mmHg), SaO₂
              ≈ 75%. The steep portion between 20–60 mmHg allows efficient O₂ unloading in the tissues.
            </p>
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <OxygenDissociationCurve showShifts={false} />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="shifts" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["CR_BK_03"]}>
            <CollapsibleSubsection title="Factors Shifting the Curve">
            <p className="text-foreground/90 leading-relaxed mb-4">
              The curve can shift left (increased affinity, harder to offload O₂) or right (decreased affinity, easier
              to offload O₂).
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                <h3 className="font-semibold text-primary text-sm mb-2">← Left Shift (↑ Affinity)</h3>
                <ul className="text-sm text-foreground/80 space-y-1">
                  <li>• ↓ Temperature (hypothermia)</li>
                  <li>• ↓ PaCO₂ / Alkalosis (↑ pH)</li>
                  <li>• ↓ 2,3-DPG (stored blood)</li>
                  <li>• Fetal haemoglobin (HbF)</li>
                  <li>• Carbon monoxide (COHb)</li>
                  <li>• Methaemoglobin</li>
                </ul>
              </div>
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                <h3 className="font-semibold text-destructive text-sm mb-2">Right Shift → (↓ Affinity)</h3>
                <ul className="text-sm text-foreground/80 space-y-1">
                  <li>• ↑ Temperature (fever, exercise)</li>
                  <li>• ↑ PaCO₂ / Acidosis (↓ pH) — Bohr effect</li>
                  <li>• ↑ 2,3-DPG</li>
                  <li>• Sickle haemoglobin (HbS)</li>
                  <li>• Anaemia / chronic hypoxia</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <OxygenDissociationCurve showShifts={true} />
            </div>
            </CollapsibleSubsection>
          </ExamSection>


          <ExamSection id="bohr-haldane" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_03"]}>
            <CollapsibleSubsection title="Bohr & Haldane Effects">
            <p className="text-foreground/90 leading-relaxed">
              The <strong>Bohr effect</strong> describes the rightward shift of the ODC caused by increased CO₂ and H⁺
              concentration. In metabolically active tissues, CO₂ production lowers pH locally, promoting O₂ release
              exactly where it is needed. In the lungs, CO₂ excretion raises pH, shifting the curve left and promoting
              O₂ loading.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              The <strong>Haldane effect</strong> is the converse: deoxyhaemoglobin carries more CO₂ (as carbamino
              compound) and buffers more H⁺ than oxyhaemoglobin. As Hb releases O₂ in tissues it picks up CO₂ more
              efficiently; as Hb binds O₂ in lungs it releases CO₂ — so both gases exchange more efficiently than
              either would alone.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="oxygen-delivery" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["OA_BK_02"]}>
            <CollapsibleSubsection title="Oxygen Delivery (DO₂)">
            <p className="text-foreground/90 leading-relaxed">
              <strong>DO₂ = CO × CaO₂</strong>, where <strong>CaO₂ = (1.34 × Hb × SaO₂) + (0.0225 × PaO₂)</strong>{" "}
              (with Hb in g/dL and PaO₂ in kPa). Normal DO₂ ≈ 1000 mL/min; whole-body VO₂ ≈ 250 mL/min, giving an
              extraction ratio of ~25%. The bound fraction dominates carriage; dissolved O₂ becomes meaningful only at
              very high PaO₂ (e.g. hyperbaric therapy).
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="clinical" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["OA_BK_02"]}>
            <CollapsibleSubsection title="Clinical Significance">
            <p className="text-foreground/90 leading-relaxed">
              The flat upper portion of the curve means that even moderate drops in PaO₂ from normal values cause
              minimal desaturation — a physiological safety margin. Once PaO₂ falls below ~8 kPa (60 mmHg), the steep
              portion means saturation drops rapidly, explaining the sudden clinical deterioration of hypoxic patients.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              Pre-oxygenation aims to fill the FRC with oxygen and place the patient on the flat upper plateau. This
              extends safe apnoea time during induction (especially with high-flow nasal O₂). In CO poisoning and
              methaemoglobinaemia the curve shifts left and effective Hb falls — pulse oximetry is unreliable and
              co-oximetry is required.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamPitfallsCallout
            pitfalls={[
              <><strong>SpO₂ cannot distinguish COHb from O₂Hb</strong> — in any burn, smoke or suicide-attempt patient, use co-oximetry.</>,
              <><strong>Methaemoglobinaemia</strong>: SpO₂ plateaus around 85% regardless of FiO₂ — treat with methylthioninium chloride (methylene blue) 1–2 mg/kg IV over 5 min, repeated after 30–60 min if required (BNF; max 7 mg/kg total).</>,
              <><strong>Stored blood</strong> is 2,3-DPG depleted → left shift → impaired offloading for ~24 h after transfusion.</>,
              <><strong>HbF</strong> sits left of adult Hb (P₅₀ ~2.5 kPa) — essential for placental O₂ uptake but means neonates desaturate quickly when offloading is compromised.</>,
              <><strong>Pre-oxygenation</strong> works by filling the FRC, not by raising SaO₂ further — gains apnoea time on the upper plateau.</>,
            ]}
          />
          <TopicFaqs faqs={oxygenHaemoglobinFaqs} />

        </>
      }
    />
  );
};

export default OxygenHaemoglobinTopic;
