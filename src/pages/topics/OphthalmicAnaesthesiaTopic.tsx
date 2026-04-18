import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { ophthalmicAnaesthesiaQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const OphthalmicAnaesthesiaTopic = () => {
  return (
    <SectionLayout title="Ophthalmic Anaesthesia" subtitle="FRCA Final — Clinical" backPath="/clinical" backLabel="Clinical" accentColor="text-clinical">
      <section className="space-y-6 mb-10">
        <p className="text-muted-foreground leading-relaxed">
          Ophthalmic anaesthesia is dominated by two priorities: controlling intra-ocular pressure during open-eye surgery, and providing reliable akinesia and analgesia — increasingly through regional rather than general techniques. The oculocardiac reflex remains the classic intra-operative event to anticipate, particularly in paediatric strabismus surgery.
        </p>
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Ocular Physiology</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>IOP</strong>: normal 10-21 mmHg. Aqueous humour produced by ciliary body, drains via canal of Schlemm. IOP ↑ by: coughing, straining, prone, N₂O (if SF₆ in eye), suxamethonium, ketamine</li>
            <li><strong>IOP ↓ by</strong>: mannitol, acetazolamide, timolol, hyperventilation, non-depolarising NMBs, propofol, volatile agents</li>
            <li><strong>Oculocardiac reflex</strong>: traction on extraocular muscles (especially medial rectus) → trigeminal afferent (V₁) → vagal efferent → bradycardia, asystole. Treatment: stop surgical stimulus, atropine 20mcg/kg. More common in children (strabismus surgery)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Regional Techniques</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border">
                <th className="text-left py-2 text-foreground font-semibold">Technique</th>
                <th className="text-left py-2 text-foreground font-semibold">Needle Position</th>
                <th className="text-left py-2 text-foreground font-semibold">Advantages</th>
                <th className="text-left py-2 text-foreground font-semibold">Risks</th>
              </tr></thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Sub-Tenon's</td><td>Under Tenon's capsule (conjunctiva + Tenon's incised inferonasal)</td><td>No sharp needle near globe. Good akinesia + anaesthesia</td><td>Chemosis, subconjunctival haemorrhage. Low risk of serious complications</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Peribulbar</td><td>Outside muscle cone (inferotemporal, often 2 injections)</td><td>Lower risk of brainstem anaesthesia vs retrobulbar</td><td>Globe perforation, retrobulbar haemorrhage, slower onset (10-15min)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Retrobulbar</td><td>Inside muscle cone (rarely used now)</td><td>Rapid akinesia + anaesthesia</td><td>Globe perforation, retrobulbar haemorrhage, brainstem anaesthesia, optic nerve damage</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Topical + intracameral</td><td>Drops ± intracameral LA</td><td>No injection risks. Patient cooperation required</td><td>No akinesia. Patient may move. Used mainly for cataract surgery</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Open Globe Injury</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li>Avoid ↑ IOP: suxamethonium is <strong>relatively</strong> contraindicated (but may be used if RSI required for life-threatening aspiration risk — benefit vs risk)</li>
            <li>RSI with rocuronium (1.2 mg/kg) preferred. Sugammadex available for reversal</li>
            <li>Smooth induction, avoid coughing/straining. Consider antiemetics (vomiting ↑ IOP)</li>
            <li>Do NOT press on the eye (no eye pad pressure, careful intubation)</li>
          </ul>
        </div>
      </section>

      <KeyLearningPoints points={[
        "IOP ↑ by suxamethonium, coughing, prone, N₂O (if SF₆ present). IOP ↓ by propofol, volatiles, mannitol",
        "Oculocardiac reflex: medial rectus traction → V₁ afferent → vagal bradycardia. Treat: stop stimulus + atropine",
        "Sub-Tenon's block: safest needle technique, good akinesia. Peribulbar: outside muscle cone (safer than retrobulbar)",
        "Open globe: avoid suxamethonium if possible. RSI with rocuronium 1.2mg/kg preferred",
        "Brainstem anaesthesia (retrobulbar complication): contralateral amaurosis, respiratory depression, apnoea, ↓ consciousness",
      ]} />
      <QuizSection questions={ophthalmicAnaesthesiaQuestions} />
      <ReferencesList topicId="ophthalmic-anaesthesia" />
      <SeeAlso topicId="ophthalmic-anaesthesia" />
        <TopicCompletionToggle topicId="ophthalmic-anaesthesia" topicTitle="Ophthalmic Anaesthesia" />
    </SectionLayout>
  );
};

export default OphthalmicAnaesthesiaTopic;
