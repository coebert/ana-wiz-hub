import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { icuSedationDeliriumQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";
import { ICUSedationComparisonDiagram } from "@/components/diagrams/ICUSedationComparisonDiagram";
import { CAMICUFlowchartDiagram } from "@/components/diagrams/CAMICUFlowchartDiagram";

const IcuSedationDeliriumTopic = () => {
  return (
    <SectionLayout title="ICU Sedation & Delirium" subtitle="FRCA / FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Sedation Assessment</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Target light sedation (RASS 0 to −2) unless specific indication for deep sedation. Daily sedation holds improve outcomes.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">RASS Score</th>
                  <th className="text-left py-2 text-foreground font-semibold">Term</th>
                  <th className="text-left py-2 text-foreground font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">+4</td><td>Combative</td><td>Violent, immediate danger to staff</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">+1 to +3</td><td>Agitated</td><td>Anxious, aggressive, pulling at lines</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">0</td><td>Alert & calm</td><td>Spontaneously attentive</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">−1 to −2</td><td>Light sedation</td><td>Drowsy, eye opening to voice ({'>'} 10s)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">−3 to −4</td><td>Moderate/Deep</td><td>Movement or eye opening to voice/physical stimulation</td></tr>
                <tr><td className="py-2 font-medium text-foreground">−5</td><td>Unarousable</td><td>No response to voice or physical stimulation</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Sedative Agents Comparison</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { agent: "Propofol", pros: "Rapid onset/offset, anti-emetic, reduces ICP", cons: "Hypotension, hypertriglyceridaemia, PRIS (propofol infusion syndrome) >4 mg/kg/hr for >48h" },
              { agent: "Midazolam", pros: "Anxiolytic, amnestic, anticonvulsant", cons: "Accumulation in renal/hepatic failure, prolonged sedation, delirium risk" },
              { agent: "Dexmedetomidine", pros: "Cooperative sedation, no respiratory depression, reduces delirium (SPICE III — neutral on mortality)", cons: "Bradycardia, hypotension, limited depth of sedation" },
              { agent: "Alfentanil/Remifentanil", pros: "Excellent analgesia-based sedation, predictable offset", cons: "Rigidity at high doses, hyperalgesia with prolonged remifentanil" },
            ].map((a) => (
              <div key={a.agent} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{a.agent}</p>
                <p className="text-xs text-muted-foreground mt-1"><strong className="text-foreground">Pros:</strong> {a.pros}</p>
                <p className="text-xs text-muted-foreground mt-1"><strong className="text-foreground">Cons:</strong> {a.cons}</p>
              </div>
            ))}
          </div>
          <ICUSedationComparisonDiagram />
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ICU Delirium</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Affects up to 80% of ventilated patients. Associated with increased mortality, prolonged ventilation, and long-term cognitive impairment. Screen with CAM-ICU.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">CAM-ICU Assessment</p>
              <p className="text-sm text-muted-foreground mt-1">4 features: (1) Acute onset/fluctuating course + (2) Inattention + (3) Altered consciousness OR (4) Disorganised thinking. Delirium positive = Feature 1+2 + either 3 or 4.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">ABCDEF Bundle</p>
              <p className="text-sm text-muted-foreground mt-1"><strong>A</strong>ssess pain, <strong>B</strong>oth SATs & SBTs, <strong>C</strong>hoice of sedation, <strong>D</strong>elirium monitoring, <strong>E</strong>arly mobility, <strong>F</strong>amily engagement. Reduces delirium, ventilator days, and mortality.</p>
          </div>
          <CAMICUFlowchartDiagram />
        </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Delirium Prevention & Treatment</h2>
          <div className="space-y-2">
            {[
              { approach: "Non-pharmacological (first-line)", detail: "Sleep hygiene (reduce nocturnal interventions, earplugs, eye masks), early mobilisation, reorientation, cognitive stimulation, family presence, minimise benzodiazepines." },
              { approach: "Dexmedetomidine", detail: "Preferred sedative in delirious patients — SPICE III: no mortality difference vs usual care, but shorter time to extubation." },
              { approach: "Haloperidol", detail: "MIND-USA, AID-ICU: no benefit for treatment or prevention of ICU delirium. Not routinely recommended." },
              { approach: "Propofol Infusion Syndrome", detail: "PRIS: metabolic acidosis, rhabdomyolysis, hyperkalaemia, cardiac failure. Risk: >4 mg/kg/hr for >48h. Treat: stop propofol, supportive care." },
            ].map((a) => (
              <div key={a.approach} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{a.approach}</p>
                <p className="text-sm text-muted-foreground mt-1">{a.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Target light sedation (RASS 0 to −2) with daily sedation holds — improves outcomes",
        "PRIS risk: propofol >4 mg/kg/hr for >48h → metabolic acidosis, rhabdomyolysis, cardiac failure",
        "CAM-ICU: acute onset + inattention + altered consciousness or disorganised thinking",
        "ABCDEF bundle reduces delirium, ventilator days, and ICU mortality",
        "Haloperidol has no proven benefit for ICU delirium (MIND-USA, AID-ICU trials)",
      ]} />

      <QuizSection questions={icuSedationDeliriumQuestions} />
      <ReferencesList topicId="icu-sedation-delirium" />

      <SeeAlso topicId="icu-sedation-delirium" />
        <TopicCompletionToggle topicId="icu-sedation-delirium" topicTitle="ICU Sedation & Delirium" />
    </SectionLayout>
  );
};

export default IcuSedationDeliriumTopic;
