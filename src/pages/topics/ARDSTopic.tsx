import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { ardsQuestions } from "@/data/quizzes";

const ARDSTopic = () => {
  return (
    <SectionLayout title="ARDS & Lung Injury" subtitle="FRCA Final / FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Berlin Definition (2012)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Severity</th>
                  <th className="text-left py-2 text-foreground font-semibold">PaO₂/FiO₂</th>
                  <th className="text-left py-2 text-foreground font-semibold">Mortality</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Mild</td><td>200-300 mmHg</td><td>~27%</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Moderate</td><td>100-200 mmHg</td><td>~32%</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Severe</td><td>&lt;100 mmHg</td><td>~45%</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            All with: onset within 7 days, bilateral opacities on CXR/CT, not fully explained by cardiac failure/fluid overload, PEEP ≥5 cmH₂O.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Management Strategy</h2>
          <div className="space-y-3">
            {[
              { level: "Foundation", items: "Lung-protective ventilation (VT 6 ml/kg IBW, Pplat ≤30), conservative fluid strategy, treat underlying cause" },
              { level: "Moderate ARDS", items: "Higher PEEP strategy, prone positioning for ≥16 hours/day (PROSEVA — mortality benefit), neuromuscular blockade in first 48h (ACURASYS/ROSE)" },
              { level: "Severe / Rescue", items: "VV-ECMO (EOLIA — referral for PaO₂/FiO₂ <80 despite optimisation), inhaled nitric oxide (↑V/Q matching, no mortality benefit), recruitment manoeuvres (caution — ART trial)" },
            ].map((l) => (
              <div key={l.level} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{l.level}</p>
                <p className="text-sm text-muted-foreground mt-1">{l.items}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Prone Positioning</h2>
          <p className="text-muted-foreground leading-relaxed">
            PROSEVA trial (2013): prone positioning ≥16h/day in moderate-severe ARDS (P/F &lt;150) reduced 28-day mortality from 32.8% to 16.0% (NNT = 6). Mechanism: improved V/Q matching, recruitment of dorsal lung, reduced transpulmonary pressure gradient, improved drainage of secretions. Contraindications: spinal instability, open abdomen, raised ICP.
          </p>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Berlin definition: mild (P/F 200-300), moderate (100-200), severe (<100) with PEEP ≥5",
        "Lung-protective ventilation: VT 6 ml/kg IBW, Pplat ≤30, driving pressure ≤15",
        "Prone positioning ≥16h/day reduces mortality in moderate-severe ARDS (PROSEVA)",
        "VV-ECMO is rescue therapy for refractory hypoxaemia (EOLIA trial)",
        "Conservative fluid strategy improves oxygenation and ventilator-free days (FACTT)",
      ]} />

      <QuizSection questions={ardsQuestions} topicId="ards" />
      <TopicCompletionToggle topicId="ards" />
    </SectionLayout>
  );
};

export default ARDSTopic;
