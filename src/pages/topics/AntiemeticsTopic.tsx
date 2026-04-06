import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { antiemeticsQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";

const AntiemeticsTopic = () => {
  return (
    <SectionLayout title="Antiemetics & PONV" subtitle="FRCA Primary & Final — Pharmacology" backPath="/pharmacology" backLabel="Pharmacology" accentColor="text-pharmacology">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">PONV Risk Factors (Apfel Score)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">Each factor adds ~20% baseline PONV risk: (1) Female sex, (2) Non-smoker, (3) History of PONV/motion sickness, (4) Postoperative opioids. Score 0=10%, 1=21%, 2=39%, 3=61%, 4=79%.</p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Antiemetic Drug Classes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border">
                <th className="text-left py-2 text-foreground font-semibold">Class</th>
                <th className="text-left py-2 text-foreground font-semibold">Receptor</th>
                <th className="text-left py-2 text-foreground font-semibold">Site</th>
                <th className="text-left py-2 text-foreground font-semibold">Examples</th>
                <th className="text-left py-2 text-foreground font-semibold">Side Effects</th>
              </tr></thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">5-HT₃ antagonist</td><td>5-HT₃</td><td>CTZ + vagal afferents</td><td>Ondansetron 4mg</td><td>Headache, constipation, ↑QTc</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">D₂ antagonist</td><td>Dopamine D₂</td><td>CTZ</td><td>Droperidol 0.625-1.25mg</td><td>Sedation, extrapyramidal, ↑QTc</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Antihistamine</td><td>H₁</td><td>Vestibular + vomiting centre</td><td>Cyclizine 50mg</td><td>Sedation, dry mouth, tachycardia</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Anticholinergic</td><td>M₁</td><td>Vestibular + vomiting centre</td><td>Hyoscine 0.3mg</td><td>Sedation, dry mouth, confusion (elderly), tachycardia</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">NK₁ antagonist</td><td>NK₁ (substance P)</td><td>Vomiting centre</td><td>Aprepitant 80mg PO</td><td>CYP3A4 inhibitor, headache. Long duration (24h+)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Corticosteroid</td><td>Multiple</td><td>Central + peripheral</td><td>Dexamethasone 4-8mg</td><td>↑ glucose, perineal pruritus (IV push), ? wound infection. Give at induction</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Prokinetic</td><td>D₂ + 5-HT₄</td><td>CTZ + GI tract</td><td>Metoclopramide 10mg</td><td>Extrapyramidal (young females), ↑ LOS tone. Weak antiemetic</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">PONV Management Strategy</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Low risk</strong> (Apfel 0-1): no routine prophylaxis</li>
            <li><strong>Moderate risk</strong> (Apfel 2): 1-2 antiemetics from different classes</li>
            <li><strong>High risk</strong> (Apfel 3-4): multimodal ≥2 agents + consider TIVA (propofol has intrinsic antiemetic properties), avoid N₂O, minimise opioids (use regional/multimodal analgesia)</li>
            <li><strong>Rescue</strong>: use agent from a different class to prophylaxis. Do not repeat same drug within 6h</li>
            <li><strong>Non-pharmacological</strong>: adequate hydration, P6 acupressure, avoid excessive opioids</li>
          </ul>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Apfel score: female, non-smoker, history of PONV, postoperative opioids — each adds ~20% risk",
        "Multimodal antiemesis from different receptor classes is more effective than single-agent prophylaxis",
        "Ondansetron (5-HT₃) and dexamethasone (corticosteroid) are the most commonly used combination",
        "Propofol (TIVA) has intrinsic antiemetic properties — consider for high-risk patients",
        "Metoclopramide is a weak antiemetic but useful as a prokinetic (↑ gastric emptying, ↑ LOS tone)",
        "Dexamethasone should be given at induction (takes time to work); ondansetron at end of surgery",
      ]} />
      <QuizSection questions={antiemeticsQuestions} />
      <ReferencesList topicId="antiemetics" />
      <TopicCompletionToggle topicId="antiemetics" topicTitle="Antiemetics &amp; PONV" />
    </SectionLayout>
  );
};

export default AntiemeticsTopic;
