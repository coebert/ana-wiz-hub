import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { starlingForcesQuestions } from "@/data/quizzes";
import StarlingForcesDiagram from "@/components/diagrams/StarlingForcesDiagram";
import GlycocalyxDiagram from "@/components/diagrams/GlycocalyxDiagram";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";
import { DiagramSection } from "@/components/DiagramSection";

const StarlingForcesTopic = () => {
  return (
    <SectionLayout title="Starling Forces & Fluid Exchange" subtitle="FRCA Primary & Final — Physiology" backPath="/physiology" backLabel="Physiology" accentColor="text-physiology">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Transcapillary fluid exchange is governed by the balance of hydrostatic and oncotic pressures across the capillary wall. Ernest Starling's original 1896 hypothesis has been refined by the revised Starling-Levick model, which incorporates the glycocalyx layer as the primary barrier to protein filtration — fundamentally changing our understanding of fluid therapy.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">The Starling Equation</h2>
          <div className="p-4 rounded-lg border border-border bg-secondary/20">
            <p className="font-mono text-sm text-foreground text-center mb-3">
              Jv = Kf × [(Pc − Pi) − σ(πc − πi)]
            </p>
            <div className="grid sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div><strong>Jv</strong> = net fluid movement (positive = filtration)</div>
              <div><strong>Kf</strong> = filtration coefficient (permeability × surface area)</div>
              <div><strong>Pc</strong> = capillary hydrostatic pressure</div>
              <div><strong>Pi</strong> = interstitial hydrostatic pressure</div>
              <div><strong>σ</strong> = reflection coefficient (0-1; 1 = impermeable to protein)</div>
              <div><strong>πc</strong> = capillary oncotic pressure</div>
              <div><strong>πi</strong> = interstitial oncotic pressure</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Classic vs Revised Model</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Feature</th>
                  <th className="text-left py-2 text-foreground font-semibold">Classic (1896)</th>
                  <th className="text-left py-2 text-foreground font-semibold">Revised (Levick & Michel, 2010)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Barrier</td>
                  <td>Endothelial cell junctions</td>
                  <td>Endothelial glycocalyx layer</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Venular reabsorption</td>
                  <td>Yes — fluid reabsorbed at venular end</td>
                  <td>No — filtration occurs along entire length</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">πi in equation</td>
                  <td>Interstitial oncotic pressure</td>
                  <td>Sub-glycocalyx oncotic pressure (πsg ≈ 0)</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Fluid return</td>
                  <td>Venular reabsorption + lymphatics</td>
                  <td>Lymphatic drainage only</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <StarlingForcesDiagram />

      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">The Endothelial Glycocalyx</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li>A 0.5–3 µm thick gel-like layer on the luminal surface of endothelial cells</li>
            <li>Composed of proteoglycans, glycosaminoglycans (heparan sulphate, hyaluronic acid), and glycoproteins</li>
            <li>Acts as a <strong>molecular sieve</strong> — excludes plasma proteins, creating a protein-free sub-glycocalyx space</li>
            <li>Functions: vascular permeability barrier, mechanotransduction (shear stress), anti-inflammatory, anticoagulant</li>
            <li><strong>Damaged by</strong>: sepsis, ischaemia-reperfusion, hyperglycaemia, surgery, excessive IV fluid (particularly &gt;2L crystalloid bolus)</li>
            <li>Damage releases syndecan-1 and heparan sulphate into plasma (measurable biomarkers)</li>
            <li>Glycocalyx shedding → ↑ permeability → ↑ interstitial protein → oedema (explains why crystalloid boluses in sepsis are poorly retained)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Clinical Implications for Fluid Therapy</h2>
          <div className="space-y-3">
            {[
              { title: "Colloid vs Crystalloid Debate", desc: "The revised model explains why colloids don't stay intravascular as long as predicted by the classic model. With an intact glycocalyx, both crystalloid and colloid filtrate at similar rates. In glycocalyx damage (sepsis), colloid advantage is further diminished." },
              { title: "Context-Sensitive Volume Kinetics", desc: "Hypovolaemia reduces Pc → reduces filtration → crystalloid stays intravascular longer. Normovolaemia has higher Pc → faster filtration → bolus poorly retained. This is why fluid resuscitation is more effective in the depleted patient." },
              { title: "Hypervolaemia and ANP", desc: "Volume expansion triggers ANP release → directly damages glycocalyx → ↑ permeability → fluid shifts to interstitium → oedema. Iatrogenic fluid overload is self-perpetuating." },
              { title: "Goal-Directed Fluid Therapy", desc: "Titrated small boluses (3-4 mL/kg) with dynamic monitoring avoid glycocalyx damage from excessive administration. The 'fluid challenge' approach respects Starling physiology." },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{item.title}</p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Oedema Formation</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Oedema occurs when the rate of capillary filtration exceeds lymphatic drainage capacity. Safety factors against oedema include:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li><strong>↑ Interstitial pressure</strong>: as fluid accumulates, Pi rises, reducing the filtration gradient</li>
            <li><strong>↑ Lymphatic flow</strong>: can increase 10-50× before overwhelmed</li>
            <li><strong>Wash-down of interstitial protein</strong>: dilution of πi reduces oncotic pull</li>
            <li>Total safety factor ≈ 17 mmHg — Pc must rise by this amount before oedema develops</li>
          </ul>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Revised Starling model: glycocalyx is the barrier, not endothelial junctions — no venular reabsorption",
        "Fluid return depends entirely on lymphatic drainage, not reabsorption at the venular end",
        "Sub-glycocalyx oncotic pressure (πsg) ≈ 0 in health — this is why colloids don't stay intravascular as long as predicted",
        "Glycocalyx damage (sepsis, surgery, hypervolaemia) increases permeability and worsens oedema",
        "Context-sensitive volume kinetics: crystalloid is retained better in hypovolaemia (↓ Pc) than normovolaemia",
        "ANP release from fluid overload directly damages glycocalyx — iatrogenic oedema is self-perpetuating",
      ]} />

      <QuizSection questions={starlingForcesQuestions} />
      <ReferencesList topicId="starling-forces" />

      <SeeAlso topicId="starling-forces" />
        <TopicCompletionToggle topicId="starling-forces" topicTitle="Starling Forces &amp; Fluid Exchange" />
    </SectionLayout>
  );
};

export default StarlingForcesTopic;
