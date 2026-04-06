import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { ventilationPerfusionQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";

const VentilationPerfusionTopic = () => {
  return (
    <SectionLayout title="Ventilation-Perfusion & Gas Exchange" subtitle="FRCA Primary & Final — Physiology" backPath="/physiology" backLabel="Physiology" accentColor="text-physiology">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">V/Q Matching</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">Ideal gas exchange requires matched ventilation (V̇) and perfusion (Q̇). Normal overall V̇/Q̇ ≈ 0.8 (V̇ ~4 L/min, Q̇ ~5 L/min). V/Q ratio varies from apex to base in the upright lung due to gravity.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border">
                <th className="text-left py-2 text-foreground font-semibold">Region</th>
                <th className="text-left py-2 text-foreground font-semibold">V̇/Q̇</th>
                <th className="text-left py-2 text-foreground font-semibold">PaO₂</th>
                <th className="text-left py-2 text-foreground font-semibold">PaCO₂</th>
                <th className="text-left py-2 text-foreground font-semibold">Notes</th>
              </tr></thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Apex (Zone 1)</td><td>~3.3</td><td>~132 mmHg</td><td>~28 mmHg</td><td>High V/Q: over-ventilated, under-perfused → wasted ventilation (dead space)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Mid zone</td><td>~0.8</td><td>~100 mmHg</td><td>~40 mmHg</td><td>Optimal matching</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Base (Zone 3)</td><td>~0.6</td><td>~89 mmHg</td><td>~42 mmHg</td><td>Low V/Q: under-ventilated, over-perfused → venous admixture</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">West's Zones</h2>
          <div className="space-y-3">
            {[
              { zone: "Zone 1", eq: "PA > Pa > Pv", desc: "Alveolar pressure exceeds arterial. No flow in diastole. Normally absent in health but occurs with ↓ CO, ↑ PEEP, haemorrhage. Dead space ventilation." },
              { zone: "Zone 2", eq: "Pa > PA > Pv", desc: "Flow determined by arterial-alveolar pressure difference ('Starling resistor'). Pulsatile, intermittent flow. PA catheter tip should be here." },
              { zone: "Zone 3", eq: "Pa > Pv > PA", desc: "Continuous flow determined by arterio-venous gradient. Most of the lung in normal conditions. Recruitment increases Zone 3 area." },
              { zone: "Zone 4", eq: "Pa > Pi > Pv > PA", desc: "Interstitial pressure compresses extra-alveolar vessels at the base. Seen with pulmonary oedema or very low lung volumes." },
            ].map(z => (
              <div key={z.zone} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{z.zone} <span className="font-mono text-xs text-muted-foreground ml-2">{z.eq}</span></p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{z.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Dead Space</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Anatomical</strong>: conducting airways (~150 mL). Measured by Fowler's method (N₂ washout)</li>
            <li><strong>Alveolar</strong>: ventilated but unperfused alveoli (V/Q = ∞). Normally ~negligible</li>
            <li><strong>Physiological</strong> = anatomical + alveolar. Measured by Bohr equation: VD/VT = (PaCO₂ − PĒCO₂) / PaCO₂. Normal ~0.3 (30%)</li>
            <li>Increased by: ↓ CO, PE, excessive PEEP, anaesthesia (↓ FRC), ageing</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Shunt</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>True shunt</strong> (V/Q = 0): blood passes through non-ventilated lung (atelectasis, consolidation, ARDS). Does NOT respond to supplemental O₂</li>
            <li><strong>Physiological shunt</strong>: bronchial circulation (~1-2% CO) + Thebesian veins → normal ~2-5% shunt</li>
            <li><strong>Shunt equation</strong>: Qs/Qt = (CcO₂ − CaO₂) / (CcO₂ − CvO₂). CcO₂ = end-capillary O₂ content (from PAO₂)</li>
            <li><strong>Iso-shunt lines</strong>: at &gt;30% shunt, increasing FiO₂ has minimal effect on PaO₂</li>
            <li><strong>HPV</strong> (hypoxic pulmonary vasoconstriction): low alveolar PO₂ → local pulmonary artery constriction → diverts blood to better-ventilated regions. Inhibited by volatile agents, vasodilators, sepsis</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Control of Ventilation</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Central chemoreceptors", value: "Medullary surface. Respond to ↑ CSF H⁺ (from CO₂ crossing BBB). Main driver of ventilation. Slow response (~minutes)." },
              { label: "Peripheral chemoreceptors", value: "Carotid bodies (CN IX) > aortic bodies (CN X). Respond to ↓ PaO₂ (<8 kPa), ↑ PaCO₂, ↓ pH. Fast response (~seconds). Only receptors detecting hypoxia." },
              { label: "Brainstem centres", value: "DRG (inspiratory), VRG (expiratory), pneumotaxic centre (limits inspiration), apneustic centre. Pre-Bötzinger complex generates rhythm." },
              { label: "Lung receptors", value: "Stretch (Hering-Breuer reflex), irritant (cough, bronchoconstriction), J receptors (pulmonary congestion → rapid shallow breathing)." },
            ].map(item => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-semibold text-foreground text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Normal V̇/Q̇ ≈ 0.8. Apex has highest V/Q (~3.3, dead space-like), base has lowest (~0.6, shunt-like)",
        "West's Zones: Zone 1 (PA > Pa > Pv) — dead space; Zone 3 (Pa > Pv > PA) — continuous flow",
        "Dead space measured by Bohr equation: VD/VT = (PaCO₂ − PĒCO₂)/PaCO₂. Normal ~30%",
        "True shunt does NOT respond to supplemental O₂. At >30% shunt, ↑ FiO₂ has minimal effect on PaO₂",
        "HPV diverts blood from hypoxic alveoli — inhibited by volatiles, vasodilators, sepsis",
        "Central chemoreceptors (CO₂ via H⁺) are the main ventilatory drive; peripheral chemoreceptors detect hypoxia",
      ]} />
      <QuizSection questions={ventilationPerfusionQuestions} />
      <ReferencesList topicId="ventilation-perfusion" />
      <TopicCompletionToggle topicId="ventilation-perfusion" topicTitle="Ventilation-Perfusion &amp; Gas Exchange" />
    </SectionLayout>
  );
};

export default VentilationPerfusionTopic;
