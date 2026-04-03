import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { acidBaseQuestions } from "@/data/quizzes";
import StewartAcidBaseDiagram from "@/components/diagrams/StewartAcidBaseDiagram";
import AcidBaseInterpretationDiagram from "@/components/diagrams/AcidBaseInterpretationDiagram";

const AcidBaseTopic = () => {
  return (
    <SectionLayout title="Acid-Base Disorders" subtitle="Primary / Final / FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <StewartAcidBaseDiagram />
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Systematic ABG Interpretation</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Assess oxygenation: P/F ratio, A-a gradient</li>
            <li>Identify the primary disorder (pH + PaCO₂ + HCO₃⁻)</li>
            <li>Calculate compensation (Winter's formula for metabolic acidosis: expected PaCO₂ = 1.5 × [HCO₃⁻] + 8 ± 2)</li>
            <li>Calculate anion gap: Na⁺ − (Cl⁻ + HCO₃⁻). Normal 8-12 mEq/L</li>
            <li>If HAGMA: calculate delta ratio (ΔAG/ΔHCO₃⁻) to detect hidden disorders</li>
          </ol>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">High Anion Gap Metabolic Acidosis</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Mnemonic: <strong>MUDPILES</strong>
          </p>
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
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Stewart Approach</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The physicochemical approach identifies 3 independent variables that determine pH:
          </p>
          <div className="space-y-3">
            {[
              { var: "Strong Ion Difference (SID)", detail: "= [Na⁺ + K⁺ + Ca²⁺ + Mg²⁺] − [Cl⁻ + lactate⁻]. Normal ~38-42 mEq/L. ↓SID → acidosis (e.g., hyperchloraemia from 0.9% saline)." },
              { var: "PaCO₂", detail: "Respiratory component. Regulated by ventilation." },
              { var: "Total weak acids (Atot)", detail: "Mainly albumin and phosphate. ↓Albumin → alkalosis (each 10 g/L decrease ↑ base excess by ~2.5)." },
            ].map((v) => (
              <div key={v.var} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{v.var}</p>
                <p className="text-sm text-muted-foreground mt-1">{v.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Lactic Acidosis</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Type A (hypoxic)</p>
              <p className="text-sm text-muted-foreground mt-1">Tissue hypoperfusion: shock, cardiac arrest, regional ischaemia, severe anaemia</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Type B (non-hypoxic)</p>
              <p className="text-sm text-muted-foreground mt-1">Metformin, liver failure, malignancy, thiamine deficiency, propofol infusion syndrome</p>
            </div>
          </div>
        </div>
      </section>

      <AcidBaseInterpretationDiagram />

      <KeyLearningPoints points={[
        "Systematic approach: oxygenation → primary disorder → compensation → anion gap → delta ratio",
        "HAGMA: MUDPILES. Normal AG acidosis: renal tubular acidosis, diarrhoea, saline excess",
        "Stewart: pH determined by SID, PaCO₂, and Atot (albumin). ↓SID = acidosis",
        "0.9% NaCl causes hyperchloraemic acidosis by reducing SID",
        "Type A lactate = tissue hypoxia; Type B = metabolic (metformin, liver failure, PRIS)",
      ]} />

      <QuizSection questions={acidBaseQuestions} />
      <TopicCompletionToggle topicId="acid-base" topicTitle="Acid-Base Disorders" />
    </SectionLayout>
  );
};

export default AcidBaseTopic;
