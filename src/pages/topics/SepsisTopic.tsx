import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { sepsisQuestions } from "@/data/quizzes";
import SepsisManagementDiagram from "@/components/diagrams/SepsisManagementDiagram";
import { ReferencesList } from "@/components/ReferencesList";

const SepsisTopic = () => {
  return (
    <SectionLayout title="Sepsis & Septic Shock" subtitle="FRCA Final / FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Sepsis is a life-threatening organ dysfunction caused by a dysregulated host response to infection (Sepsis-3, 2016). It remains the leading cause of mortality in ICU. Early recognition, source control, and protocolised resuscitation are the cornerstones of management.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Sepsis-3 Definitions</h2>
          <div className="space-y-3">
            {[
              { term: "Sepsis", def: "Infection + organ dysfunction (SOFA score ≥2 points above baseline). qSOFA ≥2 at bedside (RR ≥22, altered mentation, SBP ≤100)." },
              { term: "Septic Shock", def: "Sepsis + vasopressors required to maintain MAP ≥65 mmHg AND lactate >2 mmol/L despite adequate fluid resuscitation." },
            ].map((item) => (
              <div key={item.term} className="p-4 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">{item.term}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.def}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Hour-1 Bundle (SSC 2021)</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The Surviving Sepsis Campaign recommends initiating ALL elements within 1 hour of sepsis recognition:
          </p>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="space-y-3">
              {[
                { step: "1", action: "Measure lactate", detail: "Re-measure if initial lactate >2 mmol/L" },
                { step: "2", action: "Obtain blood cultures", detail: "Before antibiotics, from 2 separate sites" },
                { step: "3", action: "Administer broad-spectrum antibiotics", detail: "Within 1 hour. Each hour delay increases mortality ~7%" },
                { step: "4", action: "Begin rapid IV fluid resuscitation", detail: "30 ml/kg crystalloid for hypotension or lactate ≥4 mmol/L" },
                { step: "5", action: "Apply vasopressors", detail: "If hypotensive during or after fluid resuscitation. Target MAP ≥65 mmHg" },
              ].map((s) => (
                <div key={s.step} className="flex gap-3">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{s.step}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{s.action}</p>
                    <p className="text-sm text-muted-foreground">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Vasopressor Therapy</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Agent</th>
                  <th className="text-left py-2 text-foreground font-semibold">Receptor</th>
                  <th className="text-left py-2 text-foreground font-semibold">Role</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2">Noradrenaline</td><td>α₁ &gt; β₁</td><td>1st-line vasopressor</td></tr>
                <tr className="border-b border-border"><td className="py-2">Vasopressin</td><td>V₁</td><td>2nd-line (catecholamine-sparing, 0.03 U/min)</td></tr>
                <tr className="border-b border-border"><td className="py-2">Adrenaline</td><td>α₁, β₁, β₂</td><td>If cardiac dysfunction/inadequate response</td></tr>
                <tr><td className="py-2">Dobutamine</td><td>β₁ &gt; β₂</td><td>If myocardial dysfunction (↓CO despite adequate filling)</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Source Control</h2>
          <p className="text-muted-foreground leading-relaxed">
            Identify and control the source of infection as rapidly as possible. Drainage of abscesses, debridement of infected tissue, removal of infected devices. Delay in source control is independently associated with increased mortality. Consider CT imaging early if source unclear.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Corticosteroids</h2>
          <p className="text-muted-foreground leading-relaxed">
            IV hydrocortisone 200 mg/day (50 mg QDS or continuous infusion) if haemodynamic instability persists despite adequate fluid resuscitation and vasopressor therapy. ADRENAL and APROCCHSS trials support use in refractory septic shock for faster shock reversal but no mortality benefit is definitively proven.
          </p>
        </div>
      </section>

      <SepsisManagementDiagram />

      <KeyLearningPoints points={[
        "Sepsis-3: infection + organ dysfunction (SOFA ≥2). Septic shock: vasopressors needed + lactate >2",
        "Hour-1 bundle: lactate, cultures, antibiotics, fluids (30 ml/kg), vasopressors",
        "Noradrenaline is the first-line vasopressor; vasopressin is second-line",
        "Each hour delay in antibiotics increases mortality by approximately 7%",
        "Source control is critical — drain, debride, or remove infected sources early",
      ]} />

      <QuizSection questions={sepsisQuestions} />
      <ReferencesList topicId="sepsis" />

      <TopicCompletionToggle topicId="sepsis" topicTitle="Sepsis &amp; Septic Shock" />
    </SectionLayout>
  );
};

export default SepsisTopic;
