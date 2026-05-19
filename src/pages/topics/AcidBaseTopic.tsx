import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { acidBaseQuestions } from "@/data/quizzes";
import StewartAcidBaseDiagram from "@/components/diagrams/StewartAcidBaseDiagram";
import HendersonHasselbalchDiagram from "@/components/diagrams/HendersonHasselbalchDiagram";
import AcidBaseInterpretationDiagram from "@/components/diagrams/AcidBaseInterpretationDiagram";
import { WorkedExample } from "@/components/WorkedExamples";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

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
          <ExamSection id="systematic-abg" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["FFICM 4.4"]}>
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

          <ExamSection id="hagma" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="High Anion Gap Metabolic Acidosis">
            <p className="text-muted-foreground leading-relaxed mb-3">Mnemonic: <strong>MUDPILES</strong></p>
            <div className="grid sm:grid-cols-2 gap-2">
              {[
                { letter: "M", cause: "Methanol" },
                { letter: "U", cause: "Uraemia" },
                { letter: "D", cause: "Diabetic ketoacidosis" },
                { letter: "P", cause: "Propylene glycol / Paracetamol" },
                { letter: "I", cause: "Isoniazid / Iron" },
                { letter: "L", cause: "Lactic acidosis" },
                { letter: "E", cause: "Ethylene glycol" },
                { letter: "S", cause: "Salicylates" },
              ].map((item) => (
                <div key={item.letter} className="flex items-center gap-2 p-2 rounded border border-border">
                  <span className="font-bold text-primary text-sm">{item.letter}</span>
                  <span className="text-sm text-muted-foreground">{item.cause}</span>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="stewart" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["FFICM 4.4", "EDIC 5.4"]}>
            <CollapsibleSubsection title="Stewart Approach">
            <p className="text-muted-foreground leading-relaxed mb-3">
              The physicochemical (Stewart) approach identifies 3 independent variables that determine pH. Unlike the Henderson-Hasselbalch approach, HCO₃⁻ is a <strong>dependent</strong> variable — it changes as a consequence of the independent variables, not as a cause.
            </p>
            <div className="mb-4">
              <StewartAcidBaseDiagram />
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="comparing-frameworks" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
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

          <ExamSection id="lactic" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
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
      }
    />
  );
};

export default AcidBaseTopic;
