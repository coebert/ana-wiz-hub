import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { giPhysiologyQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";
import VomitingControlDiagram from "@/components/diagrams/VomitingControlDiagram";

const GastrointestinalPhysiologyTopic = () => {
  return (
    <SectionLayout title="Gastrointestinal Physiology" subtitle="FRCA Primary — Physiology" backPath="/physiology" backLabel="Physiology" accentColor="text-physiology">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Gastric Secretion</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">The stomach produces ~2L of gastric juice/day. Parietal cells secrete HCl via H⁺/K⁺-ATPase (proton pump) on the apical membrane. Stimulated by acetylcholine (M₃), histamine (H₂), and gastrin (CCK-B receptors).</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border">
                <th className="text-left py-2 text-foreground font-semibold">Cell Type</th>
                <th className="text-left py-2 text-foreground font-semibold">Secretion</th>
                <th className="text-left py-2 text-foreground font-semibold">Function</th>
              </tr></thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Parietal</td><td>HCl, intrinsic factor</td><td>pH 1-2; protein denaturation; B₁₂ absorption</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Chief</td><td>Pepsinogen</td><td>Activated to pepsin by acid → protein digestion</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">G cells (antrum)</td><td>Gastrin</td><td>Stimulates parietal cells and gastric motility</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">D cells</td><td>Somatostatin</td><td>Inhibits gastrin and acid secretion</td></tr>
                <tr><td className="py-2 font-medium text-foreground">ECL cells</td><td>Histamine</td><td>Paracrine stimulation of parietal cells (H₂ receptors)</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Nausea & Vomiting</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">The vomiting centre (nucleus tractus solitarius) receives input from multiple sites — this explains why different antiemetics target different pathways:</p>
          <div className="space-y-3">
            {[
              { input: "CTZ (area postrema)", receptors: "D₂, 5-HT₃, NK₁, μ-opioid", drugs: "Outside BBB — detects circulating emetogenic substances (opioids, cytotoxics)" },
              { input: "GI tract (vagal afferents)", receptors: "5-HT₃, mechanoreceptors", drugs: "Distension, irritation, chemo/radiotherapy → serotonin release from enterochromaffin cells" },
              { input: "Vestibular system", receptors: "H₁, M₁", drugs: "Motion sickness, opioid-induced. Cyclizine, hyoscine effective" },
              { input: "Higher centres (cortex)", receptors: "Various", drugs: "Anticipatory nausea, anxiety, ↑ ICP, pain" },
            ].map(item => (
              <div key={item.input} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{item.input} <span className="text-xs text-muted-foreground ml-1">({item.receptors})</span></p>
                <p className="text-sm text-muted-foreground mt-1">{item.drugs}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Gut Motility</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Lower oesophageal sphincter</strong>: tonic contraction (15-25 mmHg). Relaxed by volatile agents, opioids, anticholinergics, pregnancy. Barrier pressure = LOS pressure − intragastric pressure</li>
            <li><strong>Gastric emptying</strong>: accelerated by metoclopramide (D₂ antagonist), erythromycin (motilin agonist). Delayed by opioids, pain, trauma, anticholinergics, pregnancy, DM</li>
            <li><strong>Small bowel</strong>: peristalsis + segmentation. Migrating motor complex (MMC) in fasting — 90min cycles. Ileus post-surgery: small bowel recovers first (24h), stomach (48h), colon last (72h)</li>
            <li><strong>Enteric nervous system</strong>: Meissner's (submucosal, secretomotor) and Auerbach's (myenteric, motility) plexuses — can function independently of CNS</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Anaesthetic Implications</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Aspiration risk</strong>: fasting guidelines (2h clear fluids, 6h food), RSI indications, cricoid pressure</li>
            <li><strong>Hepatic first-pass</strong>: oral drugs pass through portal circulation → extensive metabolism of high extraction ratio drugs</li>
            <li><strong>Abdominal compartment syndrome</strong>: IAP &gt;20 mmHg with organ dysfunction → ↓ VR, ↓ renal perfusion, ↑ airway pressures</li>
          </ul>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Parietal cells secrete HCl via H⁺/K⁺-ATPase, stimulated by ACh (M₃), histamine (H₂), and gastrin (CCK-B)",
        "Vomiting centre receives input from CTZ (D₂, 5-HT₃), GI tract (5-HT₃), vestibular (H₁, M₁), and cortex",
        "LOS barrier pressure = LOS pressure − intragastric pressure — reduced by volatiles, opioids, pregnancy",
        "Post-surgical ileus: small bowel recovers 24h, stomach 48h, colon 72h",
        "Enteric nervous system (Auerbach's + Meissner's) can function independently of the CNS",
      ]} />
      <QuizSection questions={giPhysiologyQuestions} />
      <ReferencesList topicId="gi-physiology" />
      <SeeAlso topicId="gi-physiology" />
        <TopicCompletionToggle topicId="gi-physiology" topicTitle="Gastrointestinal Physiology" />
    </SectionLayout>
  );
};

export default GastrointestinalPhysiologyTopic;
