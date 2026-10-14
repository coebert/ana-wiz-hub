import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { acidBaseQuestions } from "@/data/quizzes";
import StewartAcidBaseDiagram from "@/components/diagrams/intensive-care/StewartAcidBaseDiagram";
import HendersonHasselbalchDiagram from "@/components/diagrams/intensive-care/HendersonHasselbalchDiagram";
import AcidBaseInterpretationDiagram from "@/components/diagrams/intensive-care/AcidBaseInterpretationDiagram";
import HAGMAPathophysiologyDiagram from "@/components/diagrams/intensive-care/HAGMAPathophysiologyDiagram";
import DeltaRatioDiagram from "@/components/diagrams/intensive-care/DeltaRatioDiagram";
import OsmolarGapCalculator from "@/components/diagrams/intensive-care/OsmolarGapCalculator";
import OsmolarityBreakdownDiagram from "@/components/diagrams/intensive-care/OsmolarityBreakdownDiagram";
import ToxicAlcoholSalicylateCalculator from "@/components/diagrams/intensive-care/ToxicAlcoholSalicylateCalculator";
import ToxicAlcoholTimelineDiagram from "@/components/diagrams/intensive-care/ToxicAlcoholTimelineDiagram";
import HAGMAManagementAlgorithm from "@/components/diagrams/intensive-care/HAGMAManagementAlgorithm";
import HAGMAWorkupFlowchart from "@/components/diagrams/intensive-care/HAGMAWorkupFlowchart";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { InlineRef } from "@/components/references/InlineRef";
import { HAGMATeaching, NAGMATeaching, OsmolarGapTeaching, StewartTeaching, CitrateTeaching } from "@/components/topic/AcidBaseReviewTeaching";
import { AcidBaseFluidsTeaching, BicarbonateTherapyTeaching } from "@/components/topic/AcidBaseTherapyTeaching";
import { AcidBaseAlkalosisTeaching } from "@/components/topic/MetabolicAlkalosisTeaching";

const acidBaseFaqs: Array<[string, string]> = [
  ["How do you calculate and interpret the anion gap?", "AG = Na⁺ − (Cl⁻ + HCO₃⁻); use the local laboratory range (often around 12 ± 4 mmol/L without potassium). Correct for albumin using AG + 0.25 × (40 − albumin g/L). A raised AG metabolic acidosis points to lactate, ketones, renal failure or toxins (MUDPILES); a normal AG acidosis suggests GI HCO₃⁻ loss or RTA."],
  ["What is the Stewart approach and when does it help?", "Stewart uses strong ion difference (SID), weak acids (Atot) and pCO₂ as independent determinants of [H⁺]; it explains hyperchloraemic acidosis from saline (SID = 0) and the alkalinising effect of albumin loss alongside the albumin-corrected anion-gap approach; neither framework is a substitute for identifying the cause."],
  ["How is a mixed acid–base disorder identified?", "Apply expected compensation formulae (e.g. Winter's: pCO₂ = 1.5 × HCO₃ + 8 ± 2 for metabolic acidosis); deviation from expected compensation means a second primary disturbance is present."],
];

const objectives = [
  "Apply a five-step systematic ABG interpretation (oxygenation → primary disorder → compensation → anion gap → delta ratio)",
  "Recall the differentials for HAGMA (MUDPILES) and normal-AG metabolic acidosis",
  "Explain metabolic alkalosis generation and maintenance, recognise mixed disorders and select a cause-led treatment strategy",
  "Explain the Stewart approach (SID, SIG, Atot) and use it to interpret complex ICU acid-base disturbances",
  "Distinguish Type A and Type B lactic acidosis and their bedside implications",
  "Compare Henderson-Hasselbalch, Base Excess and Stewart frameworks and choose the appropriate tool for each clinical scenario",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Stewart analysis — septic post-laparotomy patient",
    scenario:
      "68-year-old, post-laparotomy for sepsis, 4 L 0.9% NaCl intra-op. ABG: pH 7.28, PaCO₂ 4.5 kPa, HCO₃⁻ 16, BE −9, lactate 3.5. Bloods: Na⁺ 140, K⁺ 4.5, Cl⁻ 115, Ca²⁺ 1.1, Mg²⁺ 0.9, albumin 18 g/L, PO₄ 1.2 mmol/L.",
    working:
      "SIDa = (140+4.5+2×1.1+2×0.9) − (115+3.5) = 30 mEq/L (low).\nAlbumin charge = 18 × (0.123×7.28 − 0.631) = 4.8 mEq/L.\nPhosphate charge = 1.2 × (0.309×7.28 − 0.469) = 2.2 mEq/L.\nSIDe = 16 + 4.8 + 2.2 = 23 mEq/L.\nSIG ≈ 30 − 23 = 7 mEq/L (unmeasured charge; reference intervals depend on the method).\nAtot reduced by hypoalbuminaemia → masking effect.\nTraditional AG = 140 − (115+16) = 9 (falsely normal); albumin-corrected AG ≈ 14.5.",
    answer:
      "Triple disorder: (1) hyperchloraemic acidosis from saline-induced ↓SID; (2) unmeasured-anion acidosis (↑SIG) from sepsis ± ketoacids; (3) hypoalbuminaemic alkalosis (↓Atot) partially masking severity. Stewart separates all three quantitatively and the albumin-corrected anion gap also exposes the hidden unmeasured-anion component.",
    cites: ["Wooten 2004 Stewart", "Jung 2019 albumin"],
  },
  {
    title: "Winter's compensation in DKA",
    scenario:
      "DKA: pH 7.10, HCO₃⁻ 6 mmol/L, PaCO₂ 2.0 kPa (15 mmHg), Na⁺ 134, Cl⁻ 96, glucose 32.",
    working:
      "Expected PaCO₂ (Winter's) = 1.5 × 6 + 8 ± 2 = 17 ± 2 mmHg → measured 15 mmHg = within range → appropriate respiratory compensation, no superimposed respiratory disorder.\nAG = 134 − (96 + 6) = 32 (raised, ketoacids).\nΔAG = 32 − 12 = 20; ΔHCO₃⁻ = 24 − 6 = 18 → delta ratio = 20/18 ≈ 1.1 → compatible with predominantly HAGMA; this ratio alone cannot exclude another process.",
    answer:
      "Pure HAGMA from ketoacidosis with appropriate respiratory compensation. Treat with fluids + fixed-rate insulin + K⁺ replacement; bicarbonate not indicated.",
    cites: ["BJA Educ 2022 Acid-Base"],
  },
];

const tocItems = [
  { id: "section-systematic-abg", label: "Systematic ABG Interpretation", group: "Core" },
  { id: "section-henderson-hasselbalch", label: "Henderson–Hasselbalch", group: "Core" },
  { id: "section-hagma", label: "HAGMA", group: "Disorders" },
  { id: "section-nagma", label: "NAGMA & RTA", group: "Disorders" },
  { id: "section-metabolic-alkalosis", label: "Metabolic Alkalosis", group: "Disorders" },
  { id: "section-osmolar-gap", label: "Osmolar Gap", group: "Disorders" },
  { id: "section-stewart", label: "Stewart Approach", group: "Advanced" },
  { id: "section-comparing-frameworks", label: "Comparing Frameworks", group: "Advanced" },
  { id: "section-citrate", label: "Citrate Anticoagulation", group: "Advanced" },
  { id: "section-lactic", label: "Lactic Acidosis", group: "Disorders" },
  { id: "section-fluids-chloride", label: "Saline vs Balanced Fluids", group: "Treatment" },
  { id: "section-bicarbonate", label: "Bicarbonate Therapy", group: "Treatment" },
];

const AcidBaseTopic = () => {
  return (
    <TopicTemplate
      title="Acid-Base Disorders"
      subtitle="Primary / Final / FFICM — Intensive Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      topicId="acid-base"
      topicTitle="Acid-Base Disorders"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={acidBaseQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC], curriculumCodes: ["FFICM 4.4", "EDIC 5.4"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC] },
      }}
      sectionSources={{
        objectives: [
          "BJA Educ 2022 Acid-Base",
          "Brandis",
          "Power & Kam Ch.11",
        ],
        keyPoints: [
          "BJA Educ 2022 Acid-Base",
          "Brandis",
          "Power & Kam Ch.11",
        ],
        workedExamples: ["Brandis", "BJA Educ 2022 Acid-Base"],
      }}
      keyPoints={[
        { text: "Systematic approach: oxygenation → primary disorder → compensation → anion gap → delta ratio", cites: ["Power & Kam Ch.11"] },
        { text: "HAGMA: MUDPILES. Normal AG acidosis: renal tubular acidosis, diarrhoea, saline excess", cites: ["Brandis"] },
        { text: "Stewart: pH determined by SID, PaCO₂, and Atot (albumin). ↓SID = acidosis", cites: ["BJA Educ 2022 Acid-Base"] },
        { text: "0.9% NaCl causes hyperchloraemic acidosis by reducing SID; whether this changes outcomes is contested — SMART found fewer major kidney events with balanced fluids, PLUS found no mortality difference", cites: ["SMART 2018", "PLUS 2022"] },
        { text: "Type A lactate = tissue hypoxia; Type B = metabolic (metformin, liver failure, PRIS)", cites: ["Brandis"] },
        { text: "Always albumin-correct the anion gap in ICU patients — uncorrected AG misses unmeasured anions in hypoalbuminaemia", cites: ["BJA Educ 2022 Acid-Base"] },
      ]}
      coreConcepts={
        <>
          <TopicTableOfContents items={tocItems} />
          <p className="text-muted-foreground leading-relaxed mb-6">For chloride depletion, renal maintenance, post-hypercapnic alkalosis and mechanism-led treatment, see <Link to="/intensive-care/metabolic-alkalosis" className="text-primary font-semibold underline underline-offset-4">Metabolic Alkalosis</Link>.</p>
          <ExamSection id="section-systematic-abg" className="scroll-mt-24" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["FFICM 4.4"]}>
            <CollapsibleSubsection title="Systematic ABG Interpretation" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              A structured approach to arterial blood gas analysis prevents the common pitfall of anchoring on a single derangement and missing mixed disorders. Work through oxygenation, primary acid-base disturbance, expected compensation, anion gap, and the delta ratio in that order — each step adds diagnostic information that the previous one cannot provide.
            </p>
            <div className="mb-4">
              <AcidBaseInterpretationDiagram />
            </div>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Assess oxygenation: P/F ratio, A-a gradient</li>
              <li>Identify the primary disorder (pH + PaCO₂ + HCO₃⁻)</li>
              <li>Calculate compensation (Winter's formula for metabolic acidosis: expected PaCO₂ = 1.5 × [HCO₃⁻] + 8 ± 2)</li>
              <li>Calculate anion gap: Na⁺ − (Cl⁻ + HCO₃⁻). Normal 8-12 mEq/L</li>
              <li>If HAGMA: calculate delta ratio (ΔAG/ΔHCO₃⁻) to detect hidden disorders</li>
            </ol>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-henderson-hasselbalch" className="scroll-mt-24" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["RCoA Primary — Physiology", "FFICM 4.4"]}>
            <CollapsibleSubsection title="Henderson–Hasselbalch Approach" defaultOpen>
              <p className="text-muted-foreground leading-relaxed mb-3">
                The Henderson–Hasselbalch approach treats the body as a single dominant buffer pair — bicarbonate and dissolved CO₂ — and asks: <em>given today's CO₂ tension and bicarbonate concentration, what is the pH?</em> It is the framework taught at medical school, used in every ABG machine's report, and remains the fastest bedside tool for classifying a disturbance as respiratory or metabolic and judging compensation.
              </p>

              <div className="mb-4">
                <HendersonHasselbalchDiagram />
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <div className="p-4 rounded-lg border border-border bg-secondary/30">
                  <p className="font-semibold text-foreground text-sm">1. Start with the dissociation of carbonic acid</p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻</p>
                  <p className="text-xs text-muted-foreground mt-1">Carbonic anhydrase makes this equilibrium effectively instantaneous in red cells. CO₂ behaves as a volatile acid (excreted by the lung); HCO₃⁻ is the conjugate base, regulated by the kidney.</p>
                </div>
                <div className="p-4 rounded-lg border border-border bg-secondary/30">
                  <p className="font-semibold text-foreground text-sm">2. Apply the law of mass action</p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">[H⁺] = K × [CO₂] / [HCO₃⁻]</p>
                  <p className="text-xs text-muted-foreground mt-1">Take the negative log of both sides — the pK<sub>a</sub> of this system at 37 °C is 6.1 and [CO₂] = 0.03 × PaCO₂ (kPa: × 0.23). This gives the clinical equation.</p>
                </div>
              </div>

              <div className="p-4 rounded-lg border-2 border-primary/20 bg-primary/5 mb-4">
                <p className="text-sm font-semibold text-foreground mb-1">The Henderson–Hasselbalch equation</p>
                <p className="text-base text-foreground font-mono">pH = 6.1 + log<sub>10</sub> ([HCO₃⁻] / (0.03 × PaCO₂))</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Three logical consequences fall out immediately:
                </p>
                <ul className="text-xs text-muted-foreground list-disc pl-5 mt-1 space-y-0.5">
                  <li><strong>It is the <em>ratio</em>, not the absolute concentrations, that fixes pH.</strong> A patient with HCO₃⁻ 36 and PaCO₂ 8 kPa has the same pH as one with HCO₃⁻ 18 and PaCO₂ 4 kPa — both ratios = 75.</li>
                  <li><strong>Compensation is the body restoring the 20:1 ratio of HCO₃⁻ to dissolved CO₂.</strong> The lung adjusts CO₂ in minutes; the kidney adjusts HCO₃⁻ over 2–5 days.</li>
                  <li><strong>The lung and kidney act as the two arms of one feedback loop.</strong> A primary fall in one variable provokes a predictable secondary change in the other — quantified by Winter's formula and the acute/chronic respiratory compensation rules below.</li>
                </ul>
              </div>

              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-foreground font-semibold">Primary disorder</th>
                      <th className="text-left py-2 text-foreground font-semibold">Expected compensation</th>
                      <th className="text-left py-2 text-foreground font-semibold">Time course</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border">
                      <td className="py-2 font-medium text-foreground">Metabolic acidosis</td>
                      <td className="py-2 font-mono">PaCO₂ = 1.5 × [HCO₃⁻] + 8 ± 2 (mmHg) (Winter)</td>
                      <td className="py-2">Minutes–hours</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 font-medium text-foreground">Metabolic alkalosis</td>
                      <td className="py-2 font-mono">ΔPaCO₂ ≈ 0.7 × Δ[HCO₃⁻] (mmHg)</td>
                      <td className="py-2">Minutes–hours (limited — hypoxia)</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 font-medium text-foreground">Acute respiratory acidosis</td>
                      <td className="py-2 font-mono">Δ[HCO₃⁻] = 1 per 10 mmHg Δ PaCO₂</td>
                      <td className="py-2">Minutes (cell buffering)</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 font-medium text-foreground">Chronic respiratory acidosis</td>
                      <td className="py-2 font-mono">Δ[HCO₃⁻] = 4 per 10 mmHg Δ PaCO₂</td>
                      <td className="py-2">2–5 days (renal)</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 font-medium text-foreground">Acute respiratory alkalosis</td>
                      <td className="py-2 font-mono">Δ[HCO₃⁻] = −2 per 10 mmHg Δ PaCO₂</td>
                      <td className="py-2">Minutes</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-foreground">Chronic respiratory alkalosis</td>
                      <td className="py-2 font-mono">Δ[HCO₃⁻] = −5 per 10 mmHg Δ PaCO₂</td>
                      <td className="py-2">2–5 days (renal)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-lg border border-border bg-secondary/30 mb-4">
                <p className="text-sm font-semibold text-foreground mb-1">Extending the framework — anion gap &amp; delta ratio</p>
                <p className="text-sm text-muted-foreground">
                  Henderson–Hasselbalch tells you <em>that</em> a metabolic acidosis exists, but not <em>why</em>. The anion gap (AG = Na⁺ − [Cl⁻ + HCO₃⁻], use the local laboratory range) detects unmeasured anions (lactate, ketones, toxins, urate, sulphate). Hypoalbuminaemia masks a raised AG — correct by adding 0.25 × (40 − measured albumin g/L). The delta ratio (Δ AG / Δ HCO₃⁻) detects mixed disorders: &lt;0.4 = pure NAGMA, 0.4–1 = mixed HAGMA + NAGMA, 1–2 = pure HAGMA, &gt;2 = HAGMA with concurrent metabolic alkalosis or chronic respiratory acidosis.
                </p>
              </div>

              <div className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
                <p className="text-sm font-semibold text-amber-400 mb-1">⚠ Where the descriptive approach breaks down</p>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-0.5">
                  <li><strong>HCO₃⁻ is treated as causal.</strong> But [HCO₃⁻] cannot be regulated in isolation from water dissociation, strong ions or weak acids — it is a <em>dependent</em> variable. This causes circular reasoning ("acidosis happened because HCO₃⁻ fell; HCO₃⁻ fell because of the acidosis").</li>
                  <li><strong>Hyperchloraemic acidosis after large-volume 0.9% NaCl looks "unexplained"</strong> on a Henderson–Hasselbalch analysis — there is no extra acid generated and no buffer consumption. The Stewart approach (below) explains it directly through a fall in SID.</li>
                  <li><strong>Hypoalbuminaemia hides acidosis.</strong> Each 10 g/L fall in albumin generates a metabolic alkalosis of ~2.5 mEq/L base excess, which can mask a coexisting lactic or ketoacidosis on a casual ABG read.</li>
                  <li><strong>Compensation rules are empirical regressions</strong>, not derivations from the equation — they fit the average patient and become unreliable in extreme or rapidly changing physiology.</li>
                </ul>
              </div>
            </CollapsibleSubsection>
          </ExamSection>



          <ExamSection id="section-hagma" className="scroll-mt-24" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="High Anion Gap Metabolic Acidosis (HAGMA)">
              <HAGMATeaching /><HAGMAWorkupFlowchart /><HAGMAPathophysiologyDiagram /><DeltaRatioDiagram /><HAGMAManagementAlgorithm /><ToxicAlcoholSalicylateCalculator />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-nagma" className="scroll-mt-24" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Normal Anion Gap Metabolic Acidosis (NAGMA)">
              <NAGMATeaching />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-osmolar-gap" className="scroll-mt-24" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="The Osmolar Gap">
              <OsmolarGapTeaching /><OsmolarityBreakdownDiagram /><OsmolarGapCalculator /><ToxicAlcoholTimelineDiagram />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-metabolic-alkalosis" className="scroll-mt-24" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Metabolic Alkalosis — BJA Education Lesson">
              <AcidBaseAlkalosisTeaching />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-stewart" className="scroll-mt-24" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Strong Ion Difference (Stewart) Approach">
              <StewartTeaching /><StewartAcidBaseDiagram />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-comparing-frameworks" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Comparing Frameworks">
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Henderson-Hasselbalch</p>
                <p className="text-xs text-muted-foreground mt-1">pH → primary → compensation (Winter's) → AG → albumin-corrected AG → delta ratio. Best for rapid bedside assessment; dominates FRCA Primary.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Base Excess (Copenhagen)</p>
                <p className="text-xs text-muted-foreground mt-1">Standard BE 0 ± 2 mEq/L. Easy to trend. Cannot distinguish cause of metabolic disturbance.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Stewart</p>
                <p className="text-xs text-muted-foreground mt-1">SIDa → SIDe → SIG → Atot. Best for complex ICU patients with hypoalbuminaemia, renal/liver failure, massive transfusion. Increasingly examined in Final/FFICM.</p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-citrate" className="scroll-mt-24" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Acid-Base Effects of Regional Citrate Anticoagulation">
              <CitrateTeaching />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-lactic" className="scroll-mt-24" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Lactic Acidosis">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Type A (hypoxic)</p>
                <p className="text-sm text-muted-foreground mt-1">Tissue hypoperfusion: shock, cardiac arrest, regional ischaemia, severe anaemia.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Type B (non-hypoxic)</p>
                <p className="text-sm text-muted-foreground mt-1">Metformin, liver failure, malignancy, thiamine deficiency, propofol infusion syndrome.</p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamSection id="section-fluids-chloride" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Saline, Balanced Fluids and Outcome">
              <AcidBaseFluidsTeaching />
            </CollapsibleSubsection>
          </ExamSection>
          <ExamSection id="section-bicarbonate" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Sodium Bicarbonate for Severe Metabolic Acidaemia">
              <BicarbonateTherapyTeaching />
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "Henderson–Hasselbalch: pH = 6.1 + log([HCO₃⁻] / 0.03 × PaCO₂).",
              "Anion gap = Na⁺ − (Cl⁻ + HCO₃⁻); use the local laboratory reference interval; raised = MUDPILES (methanol, uraemia, DKA, paraldehyde, INH, lactate, ethylene glycol, salicylate).",
              "Delta ratio (Δ AG / Δ HCO₃⁻): <1 mixed NAGMA + HAGMA; >2 metabolic alkalosis coexists.",
              "Stewart approach: SID, weak acids (Atot), pCO₂ — useful for hyperchloraemic acidosis after saline resuscitation.",
              "Expected compensation rules: metabolic acidosis ΔPaCO₂ = 1.2 × Δ HCO₃⁻; respiratory acute ΔHCO₃⁻ = 1 per 10 ΔPaCO₂.",
            ]}
          />
          <TopicFaqs faqs={acidBaseFaqs} />
        </>
      }
    />
  );
};

export default AcidBaseTopic;
