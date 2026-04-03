import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { RRTCircuitDiagram } from "@/components/diagrams/RRTCircuitDiagram";
import { akiRrtQuestions } from "@/data/quizzes";

const AkiRrtTopic = () => {
  return (
    <SectionLayout title="Acute Kidney Injury & RRT" subtitle="FRCA Final / FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">KDIGO Definition & Staging</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Stage</th>
                  <th className="text-left py-2 text-foreground font-semibold">Serum Creatinine</th>
                  <th className="text-left py-2 text-foreground font-semibold">Urine Output</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">1</td><td>1.5-1.9× baseline OR ↑ ≥26.5 µmol/L in 48h</td><td>&lt;0.5 ml/kg/hr for 6-12h</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">2</td><td>2.0-2.9× baseline</td><td>&lt;0.5 ml/kg/hr for ≥12h</td></tr>
                <tr><td className="py-2 font-medium text-foreground">3</td><td>3.0× baseline OR ≥353.6 µmol/L OR initiated RRT</td><td>&lt;0.3 ml/kg/hr for ≥24h OR anuria ≥12h</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">RRT Circuit Comparison</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Compare CRRT and IHD circuits with animated blood and dialysate flow.
          </p>
          <div className="rounded-xl border border-border bg-card p-4">
            <RRTCircuitDiagram />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Indications for RRT in ICU</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            No single absolute trigger — consider the clinical context. Common indications (mnemonic: <strong>AEIOU</strong>):
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { letter: "A", cause: "Acidosis (severe metabolic, pH <7.1)" },
              { letter: "E", cause: "Electrolytes (refractory hyperkalaemia >6.5)" },
              { letter: "I", cause: "Intoxication (dialysable toxins — methanol, ethylene glycol, lithium, salicylates)" },
              { letter: "O", cause: "Overload (fluid overload refractory to diuretics)" },
              { letter: "U", cause: "Uraemia (symptomatic — encephalopathy, pericarditis, bleeding)" },
            ].map((item) => (
              <div key={item.letter} className="flex items-center gap-2 p-3 rounded border border-border">
                <span className="font-bold text-primary text-sm">{item.letter}</span>
                <span className="text-sm text-muted-foreground">{item.cause}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Anticoagulation for CRRT</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Regional Citrate (preferred)</p>
              <p className="text-sm text-muted-foreground mt-1">Citrate chelates calcium in the circuit → anticoagulation. Calcium infused post-filter to restore systemic levels. Avoids systemic bleeding risk. Monitor ionised Ca²⁺ and citrate:Ca²⁺ ratio.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Systemic Heparin</p>
              <p className="text-sm text-muted-foreground mt-1">Unfractionated heparin pre-filter. Target APTT 1.5-2× normal. Higher bleeding risk. Contraindicated in HIT — use argatroban instead.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Key Trials</h2>
          <div className="space-y-3">
            {[
              { trial: "KDIGO Guidelines", result: "Effluent dose 20-25 ml/kg/hr for CRRT (higher doses no benefit — ATN & RENAL trials)" },
              { trial: "STARRT-AKI (2020)", result: "Accelerated vs standard timing of RRT initiation — no difference in 90-day mortality. Supports waiting for conventional indications." },
              { trial: "AKIKI (2016)", result: "Early vs delayed RRT — no mortality benefit from early initiation. Delayed strategy avoided RRT in 49% of patients." },
            ].map((t) => (
              <div key={t.trial} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{t.trial}</p>
                <p className="text-sm text-muted-foreground mt-1">{t.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "KDIGO stages AKI by creatinine rise (1.5×, 2×, 3× baseline) and urine output",
        "CRRT preferred in haemodynamically unstable ICU patients; IHD for stable / urgent K⁺",
        "AEIOU: Acidosis, Electrolytes, Intoxication, Overload, Uraemia",
        "Regional citrate anticoagulation is preferred for CRRT — avoids systemic bleeding",
        "STARRT-AKI / AKIKI: no benefit from early RRT initiation — wait for conventional indications",
      ]} />

      <QuizSection questions={akiRrtQuestions} />
      <TopicCompletionToggle topicId="aki-rrt" topicTitle="Acute Kidney Injury & RRT" />
    </SectionLayout>
  );
};

export default AkiRrtTopic;
