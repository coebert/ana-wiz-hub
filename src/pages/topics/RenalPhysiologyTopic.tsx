import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { ExamSection } from "@/components/exam/ExamSection";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { SynthesisBlock } from "@/components/topic/SynthesisBlock";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { renalPhysiologyQuiz } from "@/data/quizzes";
import { NephronDiagram } from "@/components/diagrams/NephronDiagram";
import { TubularCellDiagram } from "@/components/diagrams/TubularCellDiagram";
import { CountercurrentMultiplierDiagram } from "@/components/diagrams/CountercurrentMultiplierDiagram";
import { GlomerularBarrierDiagram } from "@/components/diagrams/GlomerularBarrierDiagram";
import { JGADiagram } from "@/components/diagrams/JGADiagram";
import { RAASCascadeDiagram } from "@/components/diagrams/RAASCascadeDiagram";
import { CorticalJuxtamedullaryDiagram } from "@/components/diagrams/CorticalJuxtamedullaryDiagram";
import { RenalBloodFlowDiagram } from "@/components/diagrams/RenalBloodFlowDiagram";
import { UrineConcentrationSimulator } from "@/components/diagrams/UrineConcentrationSimulator";
import HyponatraemiaWorkupDiagram from "@/components/diagrams/HyponatraemiaWorkupDiagram";
import { EGFRCalculator } from "@/components/diagrams/EGFRCalculator";
import { Exam } from "@/data/curriculum";

const renalPhysiologyFaqs: Array<[string, string]> = [
  [
    "How is glomerular filtration rate regulated?",
    "Autoregulation maintains GFR over MAP 80–180 mmHg via two mechanisms: myogenic (afferent arteriole constricts in response to stretch) and tubuloglomerular feedback (macula densa senses distal tubule Na⁺/Cl⁻ → adenosine release → afferent constriction). Below MAP 80 mmHg, autoregulation fails and GFR becomes pressure-dependent — at risk in shock, ACEi use, NSAIDs."
  ],
  [
    "What is the difference between osmolar and free-water clearance?",
    "Osmolar clearance = (U_osm × V) / P_osm — volume of plasma cleared of all solute per minute. Free-water clearance = urine volume − osmolar clearance; positive in water diuresis (dilute urine, e.g. DI), negative in water conservation (concentrated urine, e.g. SIADH). Together they describe the kidney's water handling independent of total urine volume."
  ],
  [
    "How do loop diuretics and thiazides differ in mechanism and side effects?",
    "Loop (furosemide) — blocks Na⁺/K⁺/2Cl⁻ cotransporter in thick ascending limb; potent diuresis up to 25 % of filtered Na⁺. Side effects: hypokalaemia, hypomagnesaemia, ototoxicity, hypovolaemia. Thiazide (bendroflumethiazide) — blocks Na⁺/Cl⁻ cotransporter in distal convoluted tubule; modest diuresis (~5 %), but causes hyperglycaemia, hyperuricaemia, hypercalcaemia and hyponatraemia."
  ]
];

const objectives = [
  "Describe the structure of the nephron and the functional differences between cortical and juxtamedullary nephrons.",
  "Explain glomerular filtration in terms of Starling forces and renal autoregulation.",
  "Describe segmental tubular handling of Na⁺, water, glucose and HCO₃⁻ and the major drug targets.",
  "Explain the countercurrent multiplier and the action of ADH on the collecting duct.",
  "Compare markers of GFR (inulin, creatinine, cystatin C, Cr-EDTA) and apply CKD-EPI staging clinically.",
  "Describe renal acid-base handling and the endocrine functions of the kidney (renin, EPO, vitamin D).",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Net glomerular filtration pressure",
    scenario: (
      <p>
        P<sub>glom</sub> 60 mmHg, P<sub>Bowman</sub> 15 mmHg, π<sub>glom</sub> 30 mmHg (afferent end).
        Calculate net filtration pressure and explain why it falls along the capillary.
      </p>
    ),
    working: (
      <ul className="list-disc pl-5 space-y-1">
        <li>NFP = (P<sub>glom</sub> − P<sub>Bowman</sub>) − (π<sub>glom</sub> − π<sub>Bowman</sub>)</li>
        <li>NFP = (60 − 15) − (30 − 0) = <strong>15 mmHg</strong> at the afferent end.</li>
        <li>As filtration occurs, π<sub>glom</sub> rises (~35 mmHg at efferent end) → NFP falls towards zero ("filtration equilibrium").</li>
      </ul>
    ),
    answer: <p>NFP ≈ 15 mmHg afferent → ~0 mmHg efferent. Filtration fraction (GFR/RPF) ≈ 0.2.</p>,
    cites: ["Ganong Ch.37-38"],
  },
  {
    title: "Carboplatin dosing using Calvert formula",
    scenario: (
      <p>
        A 65-year-old (60 kg, female, Cr 90 μmol/L) needs carboplatin AUC 5. Estimate GFR and dose.
      </p>
    ),
    working: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Cockcroft-Gault eCrCl = (140 − age) × wt × 1.04 / Cr = (140 − 65) × 60 × 1.04 / 90 ≈ <strong>52 mL/min</strong>.</li>
        <li>Calvert: dose (mg) = AUC × (GFR + 25) = 5 × (52 + 25) = <strong>385 mg</strong>.</li>
        <li>Use measured Cr-EDTA GFR if accuracy critical (chemotherapy, transplant donor).</li>
      </ul>
    ),
    answer: <p>≈ 385 mg carboplatin. Re-check GFR before each cycle; consider Cr-EDTA in elderly/borderline cases.</p>,
    cites: ["Power & Kam Ch.9"],
  },
  {
    title: "Hyponatraemia workup",
    scenario: (
      <p>
        Post-op day 2: Na⁺ 122 mmol/L, plasma osm 248 mOsm/kg, urine osm 480 mOsm/kg, urine Na 60 mmol/L,
        clinically euvolaemic on 3 L/day 5% dextrose.
      </p>
    ),
    working: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Hypotonic hyponatraemia (low plasma osm).</li>
        <li>Inappropriately concentrated urine (osm &gt;100) and urine Na &gt;30 with euvolaemia → <strong>SIADH</strong> picture, exacerbated by hypotonic fluids.</li>
        <li>Stop dextrose; restrict fluid; if symptomatic → 150 mL 3% saline bolus (ESICM/ESE 2014).</li>
      </ul>
    ),
    answer: <p>Hospital-acquired hyponatraemia from hypotonic fluids on a background of SIADH. Switch to isotonic saline + fluid restriction; correct ≤10 mmol/L in 24 h to avoid ODS.</p>,
    cites: ["BJA Educ 2018"],
  },
];

const RenalPhysiologyTopic = () => {
  return (
    <TopicTemplate
      title="Renal Physiology"
      subtitle="FRCA Primary — Physiology"
      backPath="/physiology"
      backLabel="Physiology"
      accentColor="text-physiology"
      topicId="renal-physiology"
      topicTitle="Renal Physiology"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={renalPhysiologyQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["RU_BK_01", "RU_BK_02"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["RU_BK_02"] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["RU_BK_01"] },
      }}
      sectionSources={{
        objectives: [
          "BJA Educ 2018",
          "Power & Kam Ch.9",
          "Ganong Ch.37-38",
        ],
        keyPoints: [
          "BJA Educ 2018",
          "Power & Kam Ch.9",
          "Ganong Ch.37-38",
        ],
        workedExamples: ["Ganong Ch.37-38", "Power & Kam Ch.9", "BJA Educ 2018"],
      }}
      keyPoints={[
        { text: "GFR ≈ 125 ml/min. Autoregulation maintains RBF and GFR over MAP ~75–160 mmHg (myogenic + TGF).", cites: ["BJA Educ 2015 (Renal)"] },
        { text: "PCT reabsorbs 65-70% of filtered Na⁺, all glucose (SGLT2, Tm 375 mg/min), and 85% of HCO₃⁻.", cites: ["Power & Kam Ch.9"] },
        { text: "Loop of Henle: NKCC2 in thick ascending limb — target of furosemide. Countercurrent multiplier creates medullary gradient.", cites: ["BJA Educ 2018"] },
        { text: "ADH acts on V2 receptors → aquaporin-2 insertion in collecting duct → water reabsorption.", cites: ["Ganong Ch.37-38"] },
        { text: "Renal acid excretion: HCO₃⁻ reabsorption (PCT), titratable acid (HPO₄²⁻), NH₄⁺ (most important adaptive mechanism).", cites: ["Power & Kam Ch.9"] },
        { text: "Renal endocrine: renin (RAAS), erythropoietin (hypoxia response), 1,25(OH)₂D₃ (calcium homeostasis).", cites: ["BJA Educ 2018"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RU_BK_01"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
              <p className="text-foreground/90 leading-relaxed">
                The kidneys receive 20–25% of cardiac output and are responsible for filtration, selective reabsorption, secretion,
                acid-base homeostasis, and endocrine functions. Understanding renal physiology is essential for managing fluid
                balance, electrolytes, and drug excretion in the perioperative period.
              </p>
            </section>
          </ExamSection>

          <ExamSection id="nephron" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["RU_BK_01"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Nephron Segments</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Explore the functional segments of the nephron and the transport processes occurring in each.
              </p>
              <div className="bg-card rounded-xl border border-border p-6">
                <NephronDiagram />
              </div>
            </section>
          </ExamSection>

          <ExamSection id="cortical-juxtamedullary" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["RU_BK_01"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Cortical vs Juxtamedullary Nephrons</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Two functionally distinct populations of nephrons exist. Compare their anatomy, post-glomerular vasculature,
                and roles — toggle the feature pills to highlight differences side-by-side.
              </p>
              <div className="bg-card rounded-xl border border-border p-6">
                <CorticalJuxtamedullaryDiagram />
              </div>
            </section>
          </ExamSection>

          <ExamSection id="renal-blood-flow" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RU_BK_01"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Renal Blood Flow Distribution</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                The kidneys receive ~20% of cardiac output (≈1100 ml/min) but distribute it very unevenly: the cortex
                receives ~90%, the medulla only 5–10%. This protects the corticomedullary osmotic gradient but leaves
                the outer medulla vulnerable to ischaemia. Switch between scenarios to see how shock, contrast, and
                NSAIDs/ACEi precipitate ATN.
              </p>
              <div className="bg-card rounded-xl border border-border p-6">
                <RenalBloodFlowDiagram />
              </div>
            </section>
          </ExamSection>

          <ExamSection id="gfr" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RU_BK_01"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Glomerular Filtration</h2>
              <p className="text-foreground/90 leading-relaxed">
                GFR ≈ 125 ml/min (180 L/day). The glomerular filtration barrier consists of fenestrated endothelium, basement
                membrane, and podocyte slit diaphragms. Filtration depends on <strong>Starling forces</strong>: net filtration
                pressure = (Pgc − Pbc) − (πgc − πbc) ≈ (50 − 10) − (25 − 0) = 15 mmHg.
              </p>
              <p className="text-foreground/90 leading-relaxed mt-3">
                GFR is maintained by <strong>autoregulation</strong> (myogenic response + tubuloglomerular feedback via
                macula densa) over MAP ~75–160 mmHg. Below this range, GFR falls linearly. Autoregulation is impaired by NSAIDs
                (block afferent arteriolar prostaglandin-mediated vasodilation) and ACE inhibitors (block efferent constriction).
              </p>
            </section>
          </ExamSection>

          <ExamSection id="jga" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["RU_BK_01"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Juxtaglomerular Apparatus & TGF</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                The juxtaglomerular apparatus (JGA) is the anatomical basis of tubuloglomerular feedback (TGF) and renin
                release. Explore its components and the signalling cascades that stabilise single-nephron GFR.
              </p>
              <div className="bg-card rounded-xl border border-border p-6">
                <JGADiagram />
              </div>
            </section>
          </ExamSection>

          <ExamSection id="filtration-barrier" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["RU_BK_01"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Glomerular Filtration Barrier</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Explore the three-layer filtration barrier in cross-section. Animated particles show how small solutes
                pass freely while albumin and larger proteins are retained by size and charge selectivity.
              </p>
              <div className="bg-card rounded-xl border border-border p-6">
                <GlomerularBarrierDiagram />
              </div>
            </section>
          </ExamSection>

          <ExamSection id="tubular-cell" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["RU_BK_02"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Tubular Cell Transport</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Explore the individual tubular cell types, their apical and basolateral transporters, and the animated flow
                of molecules through pumps, channels, cotransporters, and exchangers. Each cell diagram shows the driving
                force (Na⁺/K⁺-ATPase) and key drug targets.
              </p>
              <div className="bg-card rounded-xl border border-border p-6">
                <TubularCellDiagram />
              </div>
            </section>
          </ExamSection>

          <ExamSection id="tubular-summary" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RU_BK_02"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Tubular Function Summary</h2>
              <p className="text-foreground/90 leading-relaxed">
                <strong>PCT</strong>: reabsorbs 65–70% of filtered Na⁺, water, glucose, amino acids, HCO₃⁻. Na⁺/K⁺-ATPase on
                basolateral membrane drives all transport. Glucose is reabsorbed by SGLT2 (Tm ≈ 375 mg/min).
              </p>
              <p className="text-foreground/90 leading-relaxed mt-3">
                <strong>Loop of Henle</strong>: descending limb permeable to water, ascending limb impermeable (countercurrent
                multiplier). Thick ascending limb: Na⁺/K⁺/2Cl⁻ cotransporter (NKCC2) — target of loop diuretics.
              </p>
              <p className="text-foreground/90 leading-relaxed mt-3">
                <strong>DCT</strong>: Na⁺/Cl⁻ cotransporter (NCC) — target of thiazides. <strong>Collecting duct</strong>:
                principal cells (ENaC — aldosterone-sensitive Na⁺ channels); intercalated cells (H⁺-ATPase, H⁺/K⁺-ATPase for
                acid-base). ADH acts on V2 receptors → aquaporin-2 insertion → water reabsorption.
              </p>
            </section>
          </ExamSection>

          <ExamSection id="countercurrent" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["RU_BK_01"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Countercurrent Multiplier</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Step through the countercurrent multiplication process to understand how the loop of Henle generates
                the corticomedullary osmotic gradient (300→1200 mOsm/kg). Press Play or use the step buttons.
              </p>
              <p className="rounded-lg border border-border bg-secondary/20 p-4 mb-4 text-sm text-foreground/90 leading-relaxed">
                The countercurrent mechanism has three integrated components: <strong>(1) the loop of Henle
                multiplier</strong> — active NaCl reabsorption from the water-impermeable thick ascending limb,
                amplified by the hairpin geometry, generates the medullary osmotic gradient; <strong>(2) the vasa
                recta exchanger</strong> — slow, hairpin medullary blood flow allows passive countercurrent exchange
                of solute and water and so preserves rather than washes out the gradient; <strong>(3) the collecting
                duct</strong> — under the control of ADH (V2 receptor → aquaporin-2 insertion), tubular water
                equilibrates with the hypertonic medulla, concentrating urine to a maximum of ~1200–1400 mOsm/kg.
              </p>
              <div className="bg-card rounded-xl border border-border p-6">
                <CountercurrentMultiplierDiagram />
              </div>
            </section>
          </ExamSection>

          <ExamSection id="urine-simulator" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["RU_BK_01"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Urine Concentration & Dilution Simulator</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Slide the ADH level from 0 to 100% to see how tubular fluid osmolality changes through each nephron segment
                — and how final urine osmolality varies between 50 mOsm/kg (water diuresis / DI) and 1200 mOsm/kg
                (maximal antidiuresis / SIADH).
              </p>
              <div className="bg-card rounded-xl border border-border p-6">
                <UrineConcentrationSimulator />
              </div>
            </section>
          </ExamSection>

          <ExamSection id="hyponatraemia" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["RU_BK_02"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Hyponatraemia Workup Algorithm</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                A structured approach to hyponatraemia (Na⁺ &lt; 135 mmol/L): plasma osmolality → urine osmolality →
                volume status → urine sodium. Click through each step to reach the diagnosis (SIADH, hypovolaemic,
                hypervolaemic, pseudo, primary polydipsia).
              </p>
              <div className="bg-card rounded-xl border border-border p-6">
                <HyponatraemiaWorkupDiagram />
              </div>
            </section>
          </ExamSection>

          <ExamSection id="measurement" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RU_BK_02"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Measurement of Renal Function</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                GFR is the best overall index of renal function but cannot be measured directly. Instead, the
                <strong> clearance</strong> of a marker substance is used: <em>Clearance = (U × V) / P</em>. The ideal marker is freely
                filtered, not reabsorbed, not secreted, not metabolised, not protein-bound, and non-toxic. No endogenous
                substance fulfils all criteria perfectly, so each marker carries trade-offs between accuracy, practicality
                and cost.
              </p>
              <div className="overflow-x-auto rounded-xl border border-border bg-card">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-semibold text-foreground">Marker</th>
                      <th className="text-left p-3 font-semibold text-foreground">Type</th>
                      <th className="text-left p-3 font-semibold text-foreground">Advantages</th>
                      <th className="text-left p-3 font-semibold text-foreground">Disadvantages</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="p-3 align-top font-medium text-foreground">Inulin</td>
                      <td className="p-3 align-top text-foreground/80">Exogenous polysaccharide</td>
                      <td className="p-3 align-top text-foreground/80">Gold standard. Freely filtered, not reabsorbed/secreted/metabolised. True GFR.</td>
                      <td className="p-3 align-top text-foreground/80">Continuous IV infusion + timed urine collections. Research only.</td>
                    </tr>
                    <tr>
                      <td className="p-3 align-top font-medium text-foreground">Creatinine</td>
                      <td className="p-3 align-top text-foreground/80">Endogenous (muscle)</td>
                      <td className="p-3 align-top text-foreground/80">Cheap, ubiquitous. Basis of eGFR (CKD-EPI).</td>
                      <td className="p-3 align-top text-foreground/80">10–20% tubular secretion overestimates GFR. Affected by muscle mass, diet, drugs (trimethoprim).</td>
                    </tr>
                    <tr>
                      <td className="p-3 align-top font-medium text-foreground">Cystatin C</td>
                      <td className="p-3 align-top text-foreground/80">Endogenous 13 kDa protein</td>
                      <td className="p-3 align-top text-foreground/80">Independent of muscle mass. Detects early GFR decline. Useful in elderly, cirrhosis.</td>
                      <td className="p-3 align-top text-foreground/80">More expensive. Affected by thyroid, steroids, smoking.</td>
                    </tr>
                    <tr>
                      <td className="p-3 align-top font-medium text-foreground">Urea</td>
                      <td className="p-3 align-top text-foreground/80">Endogenous (hepatic)</td>
                      <td className="p-3 align-top text-foreground/80">Useful with creatinine for hydration assessment.</td>
                      <td className="p-3 align-top text-foreground/80">40–50% reabsorbed; affected by protein intake, GI bleeding. Poor GFR marker.</td>
                    </tr>
                    <tr>
                      <td className="p-3 align-top font-medium text-foreground">PAH</td>
                      <td className="p-3 align-top text-foreground/80">Exogenous organic acid</td>
                      <td className="p-3 align-top text-foreground/80">Measures effective renal plasma flow (~600 ml/min).</td>
                      <td className="p-3 align-top text-foreground/80">Research / physiology lab use only.</td>
                    </tr>
                    <tr>
                      <td className="p-3 align-top font-medium text-foreground"><sup>51</sup>Cr-EDTA / <sup>99m</sup>Tc-DTPA</td>
                      <td className="p-3 align-top text-foreground/80">Radiolabelled chelates</td>
                      <td className="p-3 align-top text-foreground/80">Reference clinical standard (transplant work-up, carboplatin dosing).</td>
                      <td className="p-3 align-top text-foreground/80">Radiation; nuclear medicine facility; slow.</td>
                    </tr>
                    <tr>
                      <td className="p-3 align-top font-medium text-foreground">NGAL, KIM-1, [TIMP-2]·[IGFBP7]</td>
                      <td className="p-3 align-top text-foreground/80">Tubular injury biomarkers</td>
                      <td className="p-3 align-top text-foreground/80">Detect AKI hours before creatinine rises (NephroCheck® FDA approved).</td>
                      <td className="p-3 align-top text-foreground/80">Mark <em>injury</em>, not function. Expensive.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-foreground/80 leading-relaxed mt-4 text-sm">
                <strong>Clinical bottom line:</strong> serum creatinine + eGFR (CKD-EPI) is the workhorse; add cystatin C
                when creatinine is unreliable; use <sup>51</sup>Cr-EDTA or iohexol when accurate measured GFR is needed
                (transplant donor, carboplatin dosing); use NephroCheck for early AKI prediction in high-risk ICU patients.
              </p>
              <div className="bg-card rounded-xl border border-border p-6 mt-6">
                <h3 className="text-lg font-serif font-bold text-foreground mb-1">Interactive CKD-EPI 2021 eGFR Calculator</h3>
                <p className="text-sm text-muted-foreground mb-5">
                  Enter serum creatinine, age and sex. The race-free 2021 equation returns eGFR with KDIGO CKD stage
                  (G1–G5), colour-coded severity band, and stage-specific perioperative actions.
                </p>
                <EGFRCalculator />
              </div>
              <div className="rounded-lg bg-muted/30 border border-border p-4 mt-6 text-sm text-foreground/80">
                <p>
                  <strong>Note:</strong> The clinical syndromes and management of acute kidney injury are covered in detail in the dedicated{" "}
                  <a href="/intensive-care/aki-rrt" className="text-physiology hover:underline font-medium">
                    Acute Kidney Injury &amp; RRT
                  </a>{" "}
                  topic.
                </p>
              </div>
            </section>
          </ExamSection>

          <ExamSection id="acid-base" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RU_BK_02"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Acid-Base Handling</h2>
              <p className="text-foreground/90 leading-relaxed">
                The kidneys regenerate HCO₃⁻ and excrete H⁺. Daily acid load ≈ 1 mmol/kg H⁺. Three mechanisms: (1) HCO₃⁻
                reabsorption in PCT (85%) via carbonic anhydrase. (2) Titratable acid excretion (H₂PO₄⁻). (3) Ammonium (NH₄⁺)
                production and excretion — the most important adaptive mechanism in chronic acidosis.
              </p>
            </section>
          </ExamSection>

          <ExamSection id="endocrine" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["RU_BK_02"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Renal Endocrine Function</h2>
              <p className="text-foreground/90 leading-relaxed">
                <strong>Renin</strong>: released from juxtaglomerular cells in response to decreased renal perfusion, sympathetic
                stimulation, or decreased Na⁺ at macula densa → activates RAAS. <strong>Erythropoietin</strong>: produced by
                peritubular interstitial cells in response to hypoxia → stimulates erythropoiesis. <strong>1,25(OH)₂ vitamin D₃
                </strong>: 1α-hydroxylation occurs in PCT cells → increases Ca²⁺ absorption from gut.
              </p>
            </section>
          </ExamSection>

          <ExamSection id="raas" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RU_BK_02"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">RAAS Cascade</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                The renin-angiotensin-aldosterone system is the principal hormonal regulator of blood pressure and
                fluid balance. Explore each component of the cascade and the four major drug intervention points.
              </p>
              <div className="bg-card rounded-xl border border-border p-6">
                <RAASCascadeDiagram />
              </div>
            </section>
          </ExamSection>

          <ExamSection id="synthesis" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RU_BK_01"]}>
            <SynthesisBlock
              title="Renal Physiology — Numbers to Reproduce"
              subtitle="The high-yield values that anchor most renal viva questions."
              variant="table"
            >
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left p-2 text-foreground font-semibold">Parameter</th>
                    <th className="text-left p-2 text-foreground font-semibold">Value</th>
                    <th className="text-left p-2 text-foreground font-semibold">Significance</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/90">
                  {[
                    ["Renal blood flow", "1100 ml/min (~20% CO)", "Highest specific organ flow per gram"],
                    ["GFR", "120 ml/min/1.73 m²", "Filtration fraction ≈ 0.2"],
                    ["Filtration pressure (net)", "10 mmHg", "P_glom (60) − P_Bowman (15) − π_glom (35)"],
                    ["Tubular reabsorption — Na⁺", "67% PCT, 25% LoH, 5% DCT, 3% CD", "Fine tuning at DCT (thiazide) and CD (aldosterone)"],
                    ["Maximum urine osmolality", "1200–1400 mOsm/kg", "Requires intact medullary gradient + ADH"],
                    ["Renal threshold for glucose", "~10 mmol/L (180 mg/dl)", "Glycosuria appears above this"],
                    ["Aldosterone trigger", "↓effective circulating volume, ↑K⁺, AT-II", "Acts on principal cells of CD — ENaC + Na⁺/K⁺-ATPase"],
                  ].map(([p, val, sig]) => (
                    <tr key={p as string} className="border-b border-border/50">
                      <td className="p-2 font-medium">{p}</td>
                      <td className="p-2 text-muted-foreground">{val}</td>
                      <td className="p-2 text-muted-foreground">{sig}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SynthesisBlock>
          </ExamSection>

          <ExamPitfallsCallout
            pitfalls={[
              <><strong>Creatinine lags AKI by 24–48 h</strong> — urine output and trajectory of change are earlier signals; consider novel biomarkers (NGAL, TIMP-2·IGFBP7) where available.</>,
              <><strong>Nephrotoxins to avoid in AKI risk</strong>: NSAIDs, aminoglycosides, iodinated contrast, ACE-i/ARBs during hypovolaemia.</>,
              <><strong>Autoregulation</strong> fails below MAP ~70 mmHg (higher in chronic hypertensives) — perioperative hypotension drives ischaemic AKI.</>,
              <><strong>Hyponatraemia</strong>: correct slowly (&lt;10 mmol/L/24 h) to avoid osmotic demyelination — distinguish SIADH from cerebral salt wasting by volume status.</>,
              <><strong>RAAS blockade</strong>: holding ACE-i/ARBs on the morning of major surgery reduces intra-op hypotension but evidence is mixed — discuss case-by-case.</>,
            ]}
          />
          <TopicFaqs faqs={renalPhysiologyFaqs} />

        </>
      }
    />
  );
};

export default RenalPhysiologyTopic;
