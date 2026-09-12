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

const acidBaseFaqs: Array<[string, string]> = [
  ["How do you calculate and interpret the anion gap?", "AG = (Na⁺ + K⁺) − (Cl⁻ + HCO₃⁻); normal 8–12 mmol/L. A raised AG metabolic acidosis points to lactate, ketones, renal failure or toxins (MUDPILES); a normal AG acidosis suggests GI HCO₃⁻ loss or RTA."],
  ["What is the Stewart approach and when does it help?", "Stewart uses strong ion difference (SID), weak acids (Atot) and pCO₂ as independent determinants of [H⁺]; it explains hyperchloraemic acidosis from saline (SID = 0) and the alkalinising effect of albumin loss better than the Henderson–Hasselbalch view."],
  ["How is a mixed acid–base disorder identified?", "Apply expected compensation formulae (e.g. Winter's: pCO₂ = 1.5 × HCO₃ + 8 ± 2 for metabolic acidosis); deviation from expected compensation means a second primary disturbance is present."],
];

const objectives = [
  "Apply a five-step systematic ABG interpretation (oxygenation → primary disorder → compensation → anion gap → delta ratio)",
  "Recall the differentials for HAGMA (MUDPILES) and normal-AG metabolic acidosis",
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
      "SIDa = (140+4.5+1.1+0.9) − (115+3.5) = 28 mEq/L (low; normal 38–42).\nAlbumin charge = 18 × (0.123×7.28 − 0.631) = 4.8 mEq/L.\nPhosphate charge = 1.2 × (0.309×7.28 − 0.469) = 2.2 mEq/L.\nSIDe = 16 + 4.8 + 2.2 = 23 mEq/L.\nSIG = 28 − 23 = 5 mEq/L (raised; normal 0–2).\nAtot reduced by hypoalbuminaemia → masking effect.\nTraditional AG = 140 − (115+16) = 9 (falsely normal); albumin-corrected AG ≈ 14.5.",
    answer:
      "Triple disorder: (1) hyperchloraemic acidosis from saline-induced ↓SID; (2) unmeasured-anion acidosis (↑SIG) from sepsis ± ketoacids; (3) hypoalbuminaemic alkalosis (↓Atot) partially masking severity. Stewart separates all three quantitatively whereas Henderson-Hasselbalch misses the unmeasured anions.",
    cites: ["Brandis"],
  },
  {
    title: "Winter's compensation in DKA",
    scenario:
      "DKA: pH 7.10, HCO₃⁻ 6 mmol/L, PaCO₂ 2.0 kPa (15 mmHg), Na⁺ 134, Cl⁻ 96, glucose 32.",
    working:
      "Expected PaCO₂ (Winter's) = 1.5 × 6 + 8 ± 2 = 17 ± 2 mmHg → measured 15 mmHg = within range → appropriate respiratory compensation, no superimposed respiratory disorder.\nAG = 134 − (96 + 6) = 32 (raised, ketoacids).\nΔAG = 32 − 12 = 20; ΔHCO₃⁻ = 24 − 6 = 18 → delta ratio = 20/18 ≈ 1.1 → pure HAGMA without superimposed normal-AG acidosis or metabolic alkalosis.",
    answer:
      "Pure HAGMA from ketoacidosis with appropriate respiratory compensation. Treat with fluids + fixed-rate insulin + K⁺ replacement; bicarbonate not indicated.",
    cites: ["BJA Educ 2015"],
  },
];

const tocItems = [
  { id: "section-systematic-abg", label: "Systematic ABG Interpretation", group: "Core" },
  { id: "section-henderson-hasselbalch", label: "Henderson–Hasselbalch", group: "Core" },
  { id: "section-hagma", label: "HAGMA", group: "Disorders" },
  { id: "section-nagma", label: "NAGMA & RTA", group: "Disorders" },
  { id: "section-osmolar-gap", label: "Osmolar Gap", group: "Disorders" },
  { id: "section-stewart", label: "Stewart Approach", group: "Advanced" },
  { id: "section-comparing-frameworks", label: "Comparing Frameworks", group: "Advanced" },
  { id: "section-citrate", label: "Citrate Anticoagulation", group: "Advanced" },
  { id: "section-lactic", label: "Lactic Acidosis", group: "Disorders" },
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
          "BJA Educ 2015",
          "Brandis",
          "Power & Kam Ch.11",
        ],
        keyPoints: [
          "BJA Educ 2015",
          "Brandis",
          "Power & Kam Ch.11",
        ],
        workedExamples: ["Brandis", "BJA Educ 2015"],
      }}
      keyPoints={[
        { text: "Systematic approach: oxygenation → primary disorder → compensation → anion gap → delta ratio", cites: ["Power & Kam Ch.11"] },
        { text: "HAGMA: MUDPILES. Normal AG acidosis: renal tubular acidosis, diarrhoea, saline excess", cites: ["Brandis"] },
        { text: "Stewart: pH determined by SID, PaCO₂, and Atot (albumin). ↓SID = acidosis", cites: ["BJA Educ 2015"] },
        { text: "0.9% NaCl causes hyperchloraemic acidosis by reducing SID (SPLIT/SMART evidence)", cites: ["Power & Kam Ch.11"] },
        { text: "Type A lactate = tissue hypoxia; Type B = metabolic (metformin, liver failure, PRIS)", cites: ["Brandis"] },
        { text: "Always albumin-correct the anion gap in ICU patients — uncorrected AG misses unmeasured anions in hypoalbuminaemia", cites: ["BJA Educ 2015"] },
      ]}
      coreConcepts={
        <>
        <>
          <TopicTableOfContents items={tocItems} />
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
                  Henderson–Hasselbalch tells you <em>that</em> a metabolic acidosis exists, but not <em>why</em>. The anion gap (AG = Na⁺ − [Cl⁻ + HCO₃⁻], normal 8–12) detects unmeasured anions (lactate, ketones, toxins, urate, sulphate). Hypoalbuminaemia masks a raised AG — correct by adding 2.5 × (40 − measured albumin g/L). The delta ratio (Δ AG / Δ HCO₃⁻) detects mixed disorders: &lt;0.4 = pure NAGMA, 0.4–1 = mixed HAGMA + NAGMA, 1–2 = pure HAGMA, &gt;2 = HAGMA with concurrent metabolic alkalosis or chronic respiratory acidosis.
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
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <div>
                <p className="font-semibold text-foreground mb-1">Definition &amp; underlying physiology</p>
                <p>
                  HAGMA is a metabolic acidosis (low HCO₃⁻, low pH) accompanied by an <strong>elevated anion gap</strong>:
                  AG = [Na⁺] − ([Cl⁻] + [HCO₃⁻]); normal 8–12 mEq/L (some labs 3–11 if K⁺ excluded). The gap reflects
                  <em> unmeasured anions</em> — predominantly albumin (negatively charged at physiological pH), phosphate and sulphate,
                  plus pathological additions of lactate, ketoacids, or exogenous toxin anions. When a strong acid HA is added,
                  H⁺ is buffered by HCO₃⁻ (consumed) while A⁻ accumulates: HCO₃⁻ falls, Cl⁻ does <em>not</em> rise, so the gap widens.
                  This distinguishes HAGMA from <strong>NAGMA</strong> (hyperchloraemic acidosis), where HCO₃⁻ loss is matched 1:1 by
                  Cl⁻ gain (GI/renal HCO₃⁻ loss, RTA, large-volume 0.9% saline).
                </p>
              </div>

              <HAGMAWorkupFlowchart />

              <HAGMAPathophysiologyDiagram />

              <div className="rounded-md border border-border bg-secondary/30 p-3">
                <p className="font-semibold text-foreground mb-1">Albumin correction is non-negotiable in ICU</p>
                <p className="text-sm">
                  Each 10 g/L fall in albumin lowers the apparent AG by ~2.5 mEq/L. <strong>Corrected AG = measured AG + 2.5 × (40 − albumin g/L)</strong>.
                  An ICU patient with albumin 20 g/L and "normal" AG of 12 actually has a corrected AG of 17 — a HAGMA hiding in plain sight.
                </p>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-1">Causes — <em>GOLD MARK</em> (modern, preferred to MUDPILES)</p>
                <p className="text-sm mb-2">
                  MUDPILES is the traditional mnemonic but includes obsolete agents (paraldehyde) and omits common ICU causes (pyroglutamic acid, D-lactate).
                  <strong> GOLD MARK</strong> (Mehta, Lancet 2008) captures the realistic differential:
                </p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    { letter: "G", cause: "Glycols", detail: "Ethylene glycol, propylene glycol (lorazepam/diazepam infusions, IV phenobarbital)" },
                    { letter: "O", cause: "Oxoproline", detail: "Pyroglutamic acid — chronic paracetamol + malnutrition/sepsis (γ-glutamyl cycle)" },
                    { letter: "L", cause: "L-lactate", detail: "Type A (hypoperfusion/hypoxia) or Type B (metformin, linezolid, propofol, thiamine deficiency, malignancy)" },
                    { letter: "D", cause: "D-lactate", detail: "Short bowel syndrome — bacterial fermentation; not detected by standard lactate assay" },
                    { letter: "M", cause: "Methanol", detail: "Formate accumulation → optic nerve injury, putaminal necrosis" },
                    { letter: "A", cause: "Aspirin (salicylates)", detail: "Mixed picture: respiratory alkalosis (medullary stimulation) + HAGMA (uncoupled OXPHOS, lactate, ketones)" },
                    { letter: "R", cause: "Renal failure", detail: "Retained sulphate, phosphate, urate, hippurate; usually AG 16–20" },
                    { letter: "K", cause: "Ketoacidosis", detail: "Diabetic (β-hydroxybutyrate, acetoacetate), alcoholic (β-OHB predominant — dipstick may be negative), starvation" },
                  ].map((item) => (
                    <div key={item.letter} className="flex gap-2 p-2 rounded border border-border">
                      <span className="font-bold text-primary text-sm shrink-0">{item.letter}</span>
                      <div>
                        <span className="text-sm font-semibold text-foreground">{item.cause}</span>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-1">Narrowing the differential — the osmolar gap</p>
                <p className="text-sm">
                  In suspected toxic alcohol ingestion, calculate the <strong>osmolar gap</strong>:
                  measured osmolality − calculated (2×Na⁺ + urea + glucose, all mmol/L); normal &lt; 10 mOsm/kg.
                  A <strong>raised osmolar gap + raised AG</strong> strongly suggests methanol or ethylene glycol (their parent alcohols are osmotically active before metabolism).
                  Early on the AG may be near-normal (alcohol unmetabolised → high osmolar gap, low AG); late, after ADH metabolism, the osmolar gap closes and AG climbs as formate/glycolate accumulate.
                  Urinary oxalate crystals (ethylene glycol) and Wood's-lamp fluorescence (fluorescein in antifreeze) support the diagnosis.
                </p>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-1">Lactic acidosis — type A vs type B</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Type A (hypoxic):</strong> shock of any aetiology, severe hypoxaemia, regional ischaemia (mesenteric, limb), seizures, severe exercise. Lactate generation exceeds hepatic/renal clearance.</li>
                  <li><strong>Type B (non-hypoxic):</strong>
                    <em> B1</em> — underlying disease (liver failure → ↓clearance; malignancy, sepsis-associated metabolic reprogramming, thiamine deficiency, DKA);
                    <em> B2</em> — drugs/toxins (metformin, linezolid, NRTIs, propofol infusion syndrome, β₂-agonists, cyanide, paracetamol);
                    <em> B3</em> — inborn errors of metabolism.
                  </li>
                  <li><strong>D-lactic acidosis:</strong> short bowel/blind loop → carbohydrate fermentation by Gram-positives → D-lactate; presents with encephalopathy and HAGMA but <em>normal</em> L-lactate (standard assay is L-specific).</li>
                  <li>Lactate &gt; 4 mmol/L in sepsis triggers Sepsis-6/SSC bundles; trend with serial measurement is more useful than a single value.</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-1">Delta ratio (ΔAG / ΔHCO₃⁻) — detecting mixed disorders</p>
                <p className="text-sm">
                  Once HAGMA is identified, the delta ratio reveals coexisting disturbances:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm mt-1">
                  <li>&lt; 0.4: pure NAGMA (the AG hasn't really risen).</li>
                  <li>0.4–1.0: <strong>mixed HAGMA + NAGMA</strong> (e.g. DKA + saline resuscitation, or diarrhoea + lactic acidosis).</li>
                  <li>1.0–2.0: <strong>pure HAGMA</strong> (1:1 stoichiometric exchange of HCO₃⁻ for unmeasured anion).</li>
                  <li>&gt; 2.0: HAGMA with <strong>concurrent metabolic alkalosis or chronic respiratory acidosis</strong> (HCO₃⁻ has been preserved or augmented — e.g. DKA in a vomiting patient, or COPD with superimposed sepsis).</li>
                </ul>
                <p className="text-xs italic mt-2">Pure lactic acidosis classically gives a ratio ≈ 1.6 (lactate clears partly via tissues other than HCO₃⁻ regeneration); pure DKA ≈ 1.0. A ratio outside expectation always prompts a hunt for a second disorder.</p>
              </div>

              <DeltaRatioDiagram />

              <div>
                <p className="font-semibold text-foreground mb-1">Stewart re-framing</p>
                <p className="text-sm">
                  In Stewart terms, HAGMA = a fall in <strong>SID</strong> driven by accumulation of unmeasured strong anions (lactate⁻, ketoanions, formate, glycolate, oxalate, sulphate). The <strong>strong ion gap (SIG = SID<sub>a</sub> − SID<sub>e</sub>)</strong> quantifies these directly and, unlike the AG, is automatically corrected for albumin and phosphate — particularly useful in critical illness with hypoalbuminaemia and mixed disorders.
                </p>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-1">Management principles</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Treat the cause</strong> — fluids/insulin/K⁺ for DKA, antidote (fomepizole ± dialysis) for toxic alcohols, urinary alkalinisation ± dialysis for salicylates, source control + perfusion for septic lactic acidosis, withdraw offending drug for type B.</li>
                  <li><strong>Bicarbonate</strong> is <em>not</em> routinely indicated. BICAR-ICU (Lancet 2018) showed no 28-day mortality benefit for sodium bicarbonate in severe metabolic acidaemia overall, but a signal for renal-replacement-free days and reduced mortality in the AKI (KDIGO 2–3) subgroup when pH &lt; 7.20. Reasonable to consider in life-threatening acidaemia (pH &lt; 7.1) with AKI, or to facilitate vasopressor responsiveness.</li>
                  <li><strong>Renal replacement therapy</strong> for toxic alcohols (high clearance, removes parent + toxic metabolites), severe salicylate toxicity (level &gt; 700 mg/L, CNS features, refractory acidosis), metformin-associated lactic acidosis with AKI, refractory uraemic acidosis.</li>
                  <li><strong>Avoid harm:</strong> aggressive 0.9% saline resuscitation adds a hyperchloraemic NAGMA on top of HAGMA — prefer balanced crystalloids (Hartmann's, Plasma-Lyte) unless contraindicated.</li>
                </ul>
              </div>

              <HAGMAManagementAlgorithm />

              <ToxicAlcoholSalicylateCalculator />
            </div>
            </CollapsibleSubsection>
          </ExamSection>


          <ExamSection id="section-nagma" className="scroll-mt-24" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Normal Anion Gap Metabolic Acidosis (NAGMA)">
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <div>
                  <p className="font-semibold text-foreground mb-1">Definition &amp; mechanism</p>
                  <p className="text-sm">
                    NAGMA (hyperchloraemic acidosis) occurs when HCO₃⁻ is lost or fails to be regenerated <em>without</em> accumulation of an unmeasured anion — Cl⁻ rises 1:1 to preserve electroneutrality, so the anion gap stays normal (8–12 mEq/L). Two broad mechanisms: extra-renal loss of HCO₃⁻-rich fluid, or a primary renal defect in H⁺ excretion/HCO₃⁻ reabsorption (renal tubular acidosis, RTA) <InlineRef topicId="acid-base" refLabel="Brandis" />.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-1">Renal Tubular Acidosis — the three clinically relevant types</p>
                  <p className="text-sm mb-2">All RTAs share a failure either to reabsorb filtered bicarbonate proximally or to secrete H⁺ distally, despite normal or near-normal GFR.</p>
                  <div className="grid sm:grid-cols-1 gap-2">
                    <div className="p-3 rounded-lg border border-border">
                      <p className="text-sm font-semibold text-foreground">Type 1 — Distal RTA</p>
                      <p className="text-xs text-muted-foreground mt-1">Impaired distal tubular H⁺ secretion (α-intercalated cell dysfunction). Urine pH persistently <strong>&gt; 5.5</strong> even with systemic acidaemia. Associated hypokalaemia (impaired H⁺/K⁺ competition), nephrocalcinosis and renal stones (alkaline urine + hypercalciuria promotes calcium phosphate stone formation). Causes: autoimmune (Sjögren's, RA, SLE), amphotericin B, lithium, hereditary.</p>
                    </div>
                    <div className="p-3 rounded-lg border border-border">
                      <p className="text-sm font-semibold text-foreground">Type 2 — Proximal RTA</p>
                      <p className="text-xs text-muted-foreground mt-1">Reduced proximal tubular HCO₃⁻ reabsorption — the tubule "leaks" filtered bicarbonate until plasma HCO₃⁻ falls low enough that the reduced filtered load can be reabsorbed distally. Urine pH is <em>variable</em>: alkaline while bicarbonaturia is ongoing, but can fall <strong>&lt; 5.5</strong> once plasma HCO₃⁻ has stabilised at a new, lower steady state. Hypokalaemia is typical. Often part of Fanconi syndrome (generalised proximal tubulopathy — glycosuria, phosphaturia, aminoaciduria). Causes: multiple myeloma (light chains), acetazolamide (carbonic anhydrase inhibition), heavy metals, ifosfamide.</p>
                    </div>
                    <div className="p-3 rounded-lg border border-border">
                      <p className="text-sm font-semibold text-foreground">Type 4 — Hyperkalaemic RTA</p>
                      <p className="text-xs text-muted-foreground mt-1">Aldosterone deficiency or tubular resistance to aldosterone → reduced distal Na⁺ reabsorption and impaired K⁺/H⁺ secretion. Defined by <strong>hyperkalaemia</strong> (unlike types 1 and 2), with urine pH usually <strong>&lt; 5.5</strong> (ammoniagenesis is suppressed by hyperkalaemia, but titratable acid excretion continues). The commonest RTA in adults. Causes: diabetic nephropathy (hyporeninaemic hypoaldosteronism), ACE inhibitors/ARBs, spironolactone/eplerenone, trimethoprim, adrenal insufficiency.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-1">Other causes of NAGMA</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>GI bicarbonate loss:</strong> diarrhoea, ileostomy/high-output fistula, pancreatic/biliary drainage.</li>
                    <li><strong>Large-volume 0.9% saline:</strong> dilutional/hyperchloraemic acidosis from a low-SID fluid load.</li>
                    <li><strong>Ileal conduit / ureterosigmoidostomy:</strong> urinary Cl⁻ exchanged for HCO₃⁻ across bowel mucosa in contact with urine.</li>
                    <li><strong>Total parenteral nutrition:</strong> excess chloride-containing amino acid solutions.</li>
                    <li><strong>Carbonic anhydrase inhibitors:</strong> acetazolamide — causes a mild proximal-RTA-like picture.</li>
                  </ul>
                </div>

                <div className="rounded-md border border-border bg-secondary/30 p-3">
                  <p className="font-semibold text-foreground mb-1">Localising the cause — urinary anion gap</p>
                  <p className="text-sm">
                    <strong>UAG = (urine Na⁺ + urine K⁺) − urine Cl⁻</strong>. It is a surrogate for urinary NH₄⁺ excretion (NH₄⁺ is excreted with Cl⁻, which is not otherwise measured). A <strong>negative UAG</strong> implies appropriate renal ammoniagenesis/acid excretion in response to acidaemia — pointing to a <em>GI</em> cause of NAGMA (e.g. diarrhoea). A <strong>positive UAG</strong> implies the kidney cannot appropriately acidify the urine despite systemic acidaemia — pointing to a <em>renal</em> cause (RTA).
                  </p>
                </div>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-osmolar-gap" className="scroll-mt-24" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="The Osmolar Gap">
            <div className="text-muted-foreground leading-relaxed space-y-4">
              <div>
                <p className="font-semibold text-foreground mb-1">Definition</p>
                <p>
                  The osmolar gap is the difference between the <strong>measured</strong> serum osmolality (by freezing-point depression osmometer)
                  and the <strong>calculated</strong> osmolarity from the major osmotically active solutes:
                </p>
                <div className="my-2 p-3 rounded-md border border-border bg-secondary/30 font-mono text-sm text-foreground">
                  Osmolar gap = Osm<sub>measured</sub> − Osm<sub>calculated</sub><br/>
                  Osm<sub>calculated</sub> = 2 × [Na⁺] + [urea] + [glucose] &nbsp;(all in mmol/L)
                </div>
                <p className="text-sm">
                  Some formulae add ethanol/1.15 (mmol/L) when measured. The factor of 2 for sodium accounts for its accompanying anions (mostly Cl⁻ and HCO₃⁻).
                  <strong> Normal &lt; 10 mOsm/kg.</strong> A widened gap means unmeasured, osmotically active particles are present in plasma.
                </p>
              </div>

              <OsmolarityBreakdownDiagram />

              <OsmolarGapCalculator />

              <ToxicAlcoholTimelineDiagram />

              <div>
                <p className="font-semibold text-foreground mb-1">Why osmolality vs osmolarity matters</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Osmolality</strong> (mOsm/kg water) is measured directly — temperature-independent, unaffected by lipids/proteins displacing plasma water.</li>
                  <li><strong>Osmolarity</strong> (mOsm/L solution) is calculated — falsely low in pseudohyponatraemia (hyperlipidaemia, hyperproteinaemia) because the measured Na⁺ is diluted by the non-aqueous fraction.</li>
                  <li>Always pair the gap with the AG and clinical picture — a raised osmolar gap in isolation is non-specific.</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-1">Causes of a raised osmolar gap</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    { group: "Toxic alcohols", detail: "Methanol, ethylene glycol, diethylene glycol, isopropanol — the headline diagnoses, all low molecular weight and freely permeable" },
                    { group: "Therapeutic alcohols/sugars", detail: "Ethanol, mannitol, glycerol, sorbitol, propylene glycol (lorazepam/diazepam/phenobarbital infusion vehicle)" },
                    { group: "Endogenous", detail: "Ketones (acetone), severe lactic acidosis, uraemia (modest contribution), DKA, alcoholic ketoacidosis" },
                    { group: "Artefactual", detail: "Pseudohyponatraemia from hyperlipidaemia / hyperproteinaemia (paraprotein, IVIG)" },
                    { group: "Shock states", detail: "Septic and haemorrhagic shock can give modest gaps (10–20) from unidentified small solutes" },
                    { group: "Iatrogenic", detail: "Recent IV contrast, large-volume mannitol for cerebral oedema, glycine/sorbitol absorption during TURP" },
                  ].map((item) => (
                    <div key={item.group} className="p-2 rounded border border-border">
                      <p className="text-sm font-semibold text-foreground">{item.group}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-md border border-primary/30 bg-primary/5 p-3">
                <p className="font-semibold text-foreground mb-1">Combining the osmolar gap with the anion gap — toxic alcohol time course</p>
                <p className="text-sm">
                  Methanol and ethylene glycol are themselves osmotically active but chemically inert. They become toxic only after alcohol-dehydrogenase metabolism to organic acids (formate; glycolate/glyoxylate/oxalate). This produces a characteristic evolution:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm mt-2">
                  <li><strong>Early (0–6 h):</strong> ↑↑ osmolar gap, AG normal — parent alcohol present, metabolism not yet started.</li>
                  <li><strong>Intermediate:</strong> osmolar gap falling, AG rising — alcohol being converted to toxic anions.</li>
                  <li><strong>Late (&gt; 24 h):</strong> osmolar gap may normalise, AG markedly raised, severe HAGMA, end-organ injury (blindness/putaminal necrosis with methanol; AKI + oxalate crystalluria with ethylene glycol).</li>
                </ul>
                <p className="text-sm mt-2">
                  A "normal" osmolar gap therefore does <em>not</em> exclude toxic alcohol ingestion if presentation is late. Conversely, a raised gap with normal AG warrants urgent measurement of alcohol levels and pre-emptive ADH blockade (fomepizole, or ethanol infusion if unavailable) before metabolism produces irreversible injury.
                </p>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-1">Quantitative pearls</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>To convert a serum concentration (mg/dL) to mOsm/kg, divide by molecular weight (g/mol) and multiply by 10. e.g. methanol MW 32: a level of 32 mg/dL adds ~10 mOsm/kg to the gap.</li>
                  <li>Rule of thumb thresholds: ethanol 100 mg/dL ≈ 22 mOsm/kg; methanol 25 mg/dL ≈ 8; ethylene glycol 25 mg/dL ≈ 4 (MW 62 → smaller osmolar footprint per mg).</li>
                  <li>Because ethylene glycol has a high MW, the osmolar gap can be deceptively modest even at toxic levels — never anchor purely on the gap.</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-1">Pitfalls</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Different formulae give different "normal" ranges (e.g. 1.86 × Na⁺ rather than 2 × Na⁺) — use your lab's convention.</li>
                  <li>The osmometer must use <strong>freezing-point depression</strong>; vapour-pressure osmometers miss volatile solutes (alcohols) and falsely normalise the gap.</li>
                  <li>Always send blood <em>before</em> giving ethanol/fomepizole — once treatment starts, parent alcohol levels fall rapidly.</li>
                  <li>A "negative" osmolar gap (calculated &gt; measured) is usually a lab error or hyperviscosity artefact.</li>
                </ul>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-stewart" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["FFICM 4.4", "EDIC 5.4"]}>
            <CollapsibleSubsection title="Strong Ion Difference (Stewart) Approach">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Peter Stewart (1981) reformulated acid-base chemistry from first principles. He argued that in any aqueous biological solution, three constraints must hold simultaneously: <strong>electroneutrality</strong> (the sum of all charges = 0), <strong>conservation of mass</strong> for all weak acids, and the <strong>dissociation equilibrium</strong> of water itself. Solving these equations shows that [H⁺] (and therefore pH) and [HCO₃⁻] are <em>dependent</em> variables — fully determined by three <em>independent</em> variables that the body can manipulate.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              <div className="p-3 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">1. PaCO₂</p>
                <p className="text-xs text-muted-foreground mt-1">The volatile / respiratory variable. Set by alveolar ventilation. Identical role to the H–H framework.</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">2. Strong Ion Difference (SID)</p>
                <p className="text-xs text-muted-foreground mt-1">The metabolic / renal variable. Driven mainly by the difference between Na⁺ and Cl⁻ in plasma. Manipulated by the kidney (Cl⁻ handling) and by IV fluids.</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">3. Total weak acids (A<sub>tot</sub>)</p>
                <p className="text-xs text-muted-foreground mt-1">Albumin (~80%) + inorganic phosphate (~20%). Set by the liver, GI tract and kidney. Falls in ICU patients → "occult alkalosis".</p>
              </div>
            </div>

            <div className="mb-4">
              <StewartAcidBaseDiagram />
            </div>

            <div className="p-4 rounded-lg border-2 border-primary/20 bg-primary/5 mb-4">
              <p className="text-sm font-semibold text-foreground mb-1">The logic, step by step</p>
              <ol className="text-sm text-muted-foreground list-decimal pl-5 space-y-1">
                <li><strong>Plasma must be electrically neutral.</strong> The dominant cations (Na⁺, K⁺, Ca²⁺, Mg²⁺ — all <em>strong</em>, fully dissociated) outweigh the dominant strong anions (Cl⁻, lactate⁻) by ≈ 40 mEq/L. This positive charge difference is the SID.</li>
                <li><strong>That 40 mEq/L "charge gap" must be balanced</strong> by something — and the only things available are HCO₃⁻, dissociated albumin (Alb⁻) and dissociated phosphate (HPO₄²⁻). Together they comprise SID<sub>e</sub> (effective SID).</li>
                <li><strong>Water dissociates to maintain that balance.</strong> If SID falls (e.g. plasma Cl⁻ rises after 0.9% saline), HCO₃⁻ must fall to preserve electroneutrality — H⁺ rises and pH falls. Conversely, raising SID (loop diuretics, vomiting) forces HCO₃⁻ up → alkalosis.</li>
                <li><strong>PaCO₂ and A<sub>tot</sub> act in parallel</strong> on the same equations — they shift the equilibrium independently of SID.</li>
              </ol>
            </div>


            <div className="space-y-3">
              {[
                { var: "PaCO₂", detail: "Respiratory component. Regulated by ventilation. Acts as an independent variable that directly influences water dissociation and thus [H⁺]." },
                { var: "Total weak acids (Atot)", detail: "Sum of dissociated and undissociated non-volatile weak acids — dominated by albumin (~80%) and inorganic phosphate (~20%). ↓Albumin → ↓Atot → metabolic alkalosis (each 10 g/L ↓ in albumin ↑ BE by ~2.5 mEq/L). This 'occult alkalosis' masks concurrent acidosis in ICU." },
              ].map((v) => (
                <div key={v.var} className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{v.var}</p>
                  <p className="text-sm text-muted-foreground mt-1">{v.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 p-5 rounded-lg border-2 border-primary/20 bg-primary/5">
              <h3 className="text-lg font-serif font-bold text-foreground mb-2">Strong Ion Difference (SID)</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Strong ions are <strong>fully dissociated</strong> at physiological pH. Their difference determines the electrochemical environment in which water dissociates, and therefore [H⁺].
              </p>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border mb-3">
                <p className="text-sm font-semibold text-foreground mb-1">Apparent SID (SIDa)</p>
                <p className="text-sm text-muted-foreground font-mono">SIDa = [Na⁺ + K⁺ + Ca²⁺ + Mg²⁺] − [Cl⁻ + lactate⁻]</p>
                <p className="text-sm text-muted-foreground mt-1">Normal: <strong>38–42 mEq/L</strong></p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border mb-3">
                <p className="text-sm font-semibold text-foreground mb-1">Effective SID (SIDe)</p>
                <p className="text-sm text-muted-foreground font-mono">SIDe ≈ HCO₃⁻ + albumin charge + phosphate charge</p>
                <p className="text-sm text-muted-foreground mt-1">In health, SIDa ≈ SIDe.</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border mb-4">
                <p className="text-sm font-semibold text-foreground mb-1">Strong Ion Gap (SIG)</p>
                <p className="text-sm text-muted-foreground font-mono">SIG = SIDa − SIDe</p>
                <p className="text-sm text-muted-foreground mt-1">Normal 0–2 mEq/L. Raised SIG = unmeasured strong anions (ketoacids, sulphates, toxins) — analogous to AG but corrected for albumin and phosphate.</p>
              </div>
              <div className="mt-4 p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
                <p className="text-sm font-semibold text-amber-400 mb-1">⚠ Exam Pearl — 0.9% NaCl & SID</p>
                <p className="text-sm text-muted-foreground">
                  0.9% NaCl has SID = 0 (Na⁺ 154, Cl⁻ 154). Plasma SID ≈ 40. Large-volume 0.9% NaCl reduces plasma SID toward zero → hyperchloraemic acidosis. Balanced crystalloids (Hartmann's SID = 29, PlasmaLyte SID = 50) cause less disturbance. SPLIT, SALT-ED, and SMART trials demonstrated reduced AKI/mortality with balanced solutions.
                </p>
              </div>
            </div>

            <div className="mt-4 p-5 rounded-lg border-2 border-primary/20 bg-primary/5">
              <h3 className="text-lg font-serif font-bold text-foreground mb-2">Bedside Quantification (Simplified Fencl-Stewart)</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                The full Stewart equations require iterative solving and are impractical at the bedside. The simplified Fencl-Stewart method (Story, Kellum et al.) partitions the standard base excess (SBE) into four additive components, each attributable to a specific mechanism <InlineRef topicId="acid-base" refLabel="BJA 2004 (Simplified Fencl-Stewart)" />:
              </p>
              <div className="space-y-2 mb-3">
                <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-sm font-semibold text-foreground">1. Free-water effect</p>
                  <p className="text-sm text-muted-foreground mt-1">Dilution or concentration of plasma water shifts SID toward or away from zero, producing a dilutional acidosis (free-water excess) or contraction alkalosis (free-water deficit). Tracks [Na⁺] but is not easily quantified numerically at the bedside — read qualitatively from the [Na⁺] trend.</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-sm font-semibold text-foreground">2. Sodium-chloride (SID) effect</p>
                  <p className="text-sm text-muted-foreground mt-1 font-mono">BE<sub>Na-Cl</sub> ≈ [Na⁺] − [Cl⁻] − 38 meq/L</p>
                  <p className="text-sm text-muted-foreground mt-1">Reflects relative retention/loss of Cl⁻ versus Na⁺ (e.g. saline-induced hyperchloraemia). A negative value = acidifying.</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-sm font-semibold text-foreground">3. Albumin effect</p>
                  <p className="text-sm text-muted-foreground mt-1 font-mono">BE<sub>Alb</sub> ≈ 0.25 × (42 − albumin g/L)</p>
                  <p className="text-sm text-muted-foreground mt-1">Quantifies the alkalinising effect of hypoalbuminaemia (fewer weak-acid anions). Always positive when albumin &lt; 42 g/L.</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-sm font-semibold text-foreground">4. Lactate effect</p>
                  <p className="text-sm text-muted-foreground mt-1 font-mono">BE<sub>Lactate</sub> ≈ 1 − [lactate]</p>
                  <p className="text-sm text-muted-foreground mt-1">Negative once lactate &gt; 1 mmol/L — the acidifying contribution of lactate accumulation.</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-sm font-semibold text-foreground">5. Unmeasured-ion effect (the residual)</p>
                  <p className="text-sm text-muted-foreground mt-1 font-mono">BE<sub>unmeasured</sub> = SBE − (BE<sub>Na-Cl</sub> + BE<sub>Alb</sub> + BE<sub>Lactate</sub>)</p>
                  <p className="text-sm text-muted-foreground mt-1">Whatever base excess is left over once the three explicable components are subtracted — analogous to the strong ion gap/SIG. A large negative residual implies unmeasured strong anions (ketoacids, sulphate, toxin metabolites).</p>
                </div>
              </div>
              <div className="p-3 rounded-lg border border-border bg-secondary/30 mb-2">
                <p className="text-sm font-semibold text-foreground mb-1">Worked example</p>
                <p className="text-sm text-muted-foreground">
                  SBE = −16 mEq/L. Na⁺ 138, Cl⁻ 112, albumin 20 g/L, lactate 6 mmol/L.
                </p>
                <p className="text-sm text-muted-foreground font-mono mt-1">
                  BE<sub>Na-Cl</sub> = 138 − 112 − 38 = −12<br/>
                  BE<sub>Alb</sub> = 0.25 × (42 − 20) = +5.5<br/>
                  BE<sub>Lactate</sub> = 1 − 6 = −5<br/>
                  BE<sub>unmeasured</sub> = −16 − (−12 + 5.5 − 5) = −16 − (−11.5) = −4.5
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Interpretation: a hyperchloraemic (saline) component (−12), partly offset by hypoalbuminaemic alkalosis (+5.5), plus lactate (−5) and a residual −4.5 mEq/L of unmeasured strong anions (e.g. sepsis-related ketoacids/sulphate) not explained by chloride, albumin or lactate alone.
                </p>
              </div>
              <p className="text-xs text-muted-foreground italic">Sign convention: a negative component is acidifying (drives SBE more negative); a positive component is alkalinising. The four components sum exactly to SBE by construction.</p>
            </div>
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
          </ExamSection>

          <ExamSection id="section-citrate" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Acid-Base Effects of Regional Citrate Anticoagulation">
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <div>
                  <p className="font-semibold text-foreground mb-1">Mechanism</p>
                  <p className="text-sm">
                    Citrate is infused pre-filter during CRRT and chelates ionised calcium (iCa²⁺) within the extracorporeal circuit, preventing activation of the clotting cascade. Target circuit (post-filter) iCa²⁺ is <strong>&lt; 0.35 mmol/L</strong>. Most citrate-calcium complex is removed in the effluent; the remainder returns to the patient with a separate systemic calcium infusion to restore physiological ionised calcium <InlineRef topicId="acid-base" refLabel="Ann Intensive Care 2023 (Citrate)" />.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Metabolic (alkalinising) effect</p>
                  <p className="text-sm">
                    Citrate returned to the patient is metabolised via the Krebs cycle, predominantly in the liver (also skeletal muscle and renal cortex), generating <strong>3 mmol of bicarbonate per mmol of citrate metabolised</strong>. This is the intended, physiological source of buffer replacement in citrate CRRT, but over-prescription or an already-alkalotic patient can tip into a <strong>metabolic alkalosis</strong> — manage by reducing the citrate dose/blood flow ratio or increasing the systemic bicarbonate deficit tolerance.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Citrate accumulation / toxicity</p>
                  <p className="text-sm">
                    When citrate metabolism is impaired — <strong>liver failure</strong>, <strong>shock with reduced hepatic/muscle perfusion</strong>, or a citrate load that exceeds metabolic capacity — citrate accumulates systemically. Because citrate itself is an unmeasured anion and continues to chelate calcium systemically, accumulation produces a <strong>high anion gap metabolic acidosis with a falling systemic ionised calcium despite a normal or even rising total calcium</strong> (calcium is "trapped" as calcium citrate).
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Monitoring</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Systemic (post-return) ionised calcium target <strong>1.0–1.2 mmol/L</strong>, checked 4–6 hourly.</li>
                    <li><strong>Total-to-ionised calcium ratio &gt; 2.5</strong> is the classic marker suggesting citrate accumulation.</li>
                    <li>Trend the anion gap — a widening AG with falling systemic iCa²⁺ on citrate CRRT should prompt suspicion of accumulation.</li>
                    <li>Watch sodium — some citrate/replacement solutions are hypertonic and can contribute to hypernatraemia.</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Management of accumulation</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Reduce or stop the citrate infusion.</li>
                    <li>Increase dialysate/effluent flow to enhance clearance of accumulated citrate.</li>
                    <li>Give calcium replacement to correct systemic hypocalcaemia.</li>
                    <li>Switch to systemic heparin anticoagulation (or no anticoagulation) if accumulation is severe or recurrent.</li>
                  </ul>
                </div>
              </div>
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
          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "Henderson–Hasselbalch: pH = 6.1 + log([HCO₃⁻] / 0.03 × PaCO₂).",
              "Anion gap = Na⁺ − (Cl⁻ + HCO₃⁻); normal 8–12; raised = MUDPILES (methanol, uraemia, DKA, paraldehyde, INH, lactate, ethylene glycol, salicylate).",
              "Delta ratio (Δ AG / Δ HCO₃⁻): <1 mixed NAGMA + HAGMA; >2 metabolic alkalosis coexists.",
              "Stewart approach: SID, weak acids (Atot), pCO₂ — useful for hyperchloraemic acidosis after saline resuscitation.",
              "Expected compensation rules: metabolic acidosis ΔPaCO₂ = 1.2 × Δ HCO₃⁻; respiratory acute ΔHCO₃⁻ = 1 per 10 ΔPaCO₂.",
            ]}
          />
        </>
          <TopicFaqs faqs={acidBaseFaqs} />
        </>
      }
    />
  );
};

export default AcidBaseTopic;
