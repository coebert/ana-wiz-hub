import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { perioperativeFluidsQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";
import { DiagramSection } from "@/components/DiagramSection";
import GlycocalyxDiagram from "@/components/diagrams/GlycocalyxDiagram";

const PerioperativeFluidsTopic = () => {
  return (
    <SectionLayout title="Perioperative Fluid Therapy" subtitle="FRCA / FFICM — Perioperative Medicine" backPath="/perioperative" backLabel="Perioperative Medicine" accentColor="text-perioperative">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Fluid Compartments</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Total body water (TBW) = ~60% body weight. ICF 40%, ECF 20% (interstitial 15%, plasma 5%). Only 25% of crystalloid remains intravascular — the rest distributes to the interstitium.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Fluid</th>
                  <th className="text-left py-2 text-foreground font-semibold">Na⁺ (mmol/L)</th>
                  <th className="text-left py-2 text-foreground font-semibold">Cl⁻ (mmol/L)</th>
                  <th className="text-left py-2 text-foreground font-semibold">Osmolality</th>
                  <th className="text-left py-2 text-foreground font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">0.9% NaCl</td><td>154</td><td>154</td><td>308</td><td>Hyperchloraemic acidosis. Not "normal".</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Hartmann's</td><td>131</td><td>111</td><td>278</td><td>Contains lactate 29 mmol/L (metabolised to HCO₃⁻). Balanced.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Plasmalyte</td><td>140</td><td>98</td><td>294</td><td>Most physiological. Acetate + gluconate as buffers.</td></tr>
                <tr><td className="py-2 font-medium text-foreground">5% Albumin</td><td>148</td><td>128</td><td>300</td><td>Colloid. Better intravascular expansion. SAFE trial: equivalent to saline in general ICU.</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Goal-Directed Fluid Therapy (GDFT)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Individualised fluid administration guided by haemodynamic monitoring to optimise stroke volume and tissue oxygen delivery. Reduces complications after major surgery.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Stroke Volume Optimisation</p>
              <p className="text-sm text-muted-foreground mt-1">250 ml fluid challenges. Measure SV response with oesophageal Doppler, LiDCO, or FloTrac. If SV rises by ≥10% → fluid responsive → repeat. If {'<'}10% → stop fluids.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Dynamic Parameters</p>
              <p className="text-sm text-muted-foreground mt-1">PPV, SVV (arterial waveform analysis). Reliable only in sinus rhythm + controlled ventilation + VT ≥8 ml/kg. PLR test for spontaneous breathing.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Glycocalyx & Revised Starling</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The endothelial glycocalyx is a carbohydrate-rich layer lining the vascular endothelium. It regulates vascular permeability, prevents leucocyte adhesion, and modulates coagulation.
          </p>
          <div className="p-4 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Revised Starling:</strong> Fluid filtration occurs across the glycocalyx, not at the capillary level. The sub-glycocalyx oncotic pressure (not interstitial) opposes filtration. There is no venous reabsorption in most tissues — lymphatic drainage returns filtered fluid.
              <br /><br />
              <strong className="text-foreground">Clinical implication:</strong> Fluid overload, inflammation, ANP, and surgical stress damage the glycocalyx → increased permeability → oedema. Avoid hypervolaemia — it sheds the glycocalyx via ANP release.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Key Fluid Trials</h2>
          <div className="space-y-2">
            {[
              { trial: "SAFE (2004)", result: "4% albumin vs 0.9% NaCl in ICU — no difference in 28-day mortality. Albumin harmful in TBI (SAFE-TBI subgroup)." },
              { trial: "SPLIT (2015)", result: "Balanced crystalloid (Plasmalyte) vs 0.9% NaCl in ICU — no difference in AKI. But underpowered." },
              { trial: "SMART (2018)", result: "Balanced crystalloids vs 0.9% NaCl — balanced crystalloids reduced composite of death, new RRT, or persistent renal dysfunction (MAKE30)." },
              { trial: "BaSICS (2021)", result: "Balanced vs saline AND slow vs fast infusion in ICU — no difference in 90-day mortality." },
              { trial: "RELIEF (2018)", result: "Restrictive vs liberal IV fluid regimen in major abdominal surgery — restrictive increased AKI. Liberal (but not excessive) approach preferred." },
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
        "Only 25% of crystalloid stays intravascular — colloids have better volume expansion",
        "0.9% NaCl causes hyperchloraemic acidosis — balanced crystalloids preferred (SMART trial)",
        "GDFT: SV optimisation with 250ml challenges — stop when SV rise <10%",
        "Glycocalyx damage (inflammation, hypervolaemia, ANP) increases vascular permeability",
        "RELIEF trial: overly restrictive fluids increase AKI — aim for individualised, goal-directed approach",
      ]} />

      <QuizSection questions={perioperativeFluidsQuestions} />
      <ReferencesList topicId="perioperative-fluids" />

      <SeeAlso topicId="perioperative-fluids" />
        <TopicCompletionToggle topicId="perioperative-fluids" topicTitle="Perioperative Fluid Therapy" />
    </SectionLayout>
  );
};

export default PerioperativeFluidsTopic;
