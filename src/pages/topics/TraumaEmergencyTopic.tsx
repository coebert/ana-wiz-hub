import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { traumaEmergencyQuestions } from "@/data/quizzes";

const TraumaEmergencyTopic = () => {
  return (
    <SectionLayout title="Trauma & Emergency Anaesthesia" subtitle="FRCA Final / FFICM — Clinical Anaesthesia" backPath="/clinical" backLabel="Clinical Anaesthesia" accentColor="text-clinical">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Trauma is a leading cause of death in young adults. Anaesthetists play a key role in airway management, resuscitation, and perioperative care. The ATLS &lt;C&gt;ABCDE approach, damage control resuscitation, and massive transfusion protocols are fundamental.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Rapid Sequence Induction (RSI)</h2>
          <div className="space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              RSI is indicated when the patient is at risk of aspiration (full stomach, bowel obstruction, pregnancy, trauma). Key principles:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Pre-oxygenation", value: "3 min tidal breathing or 8 vital capacity breaths with 100% O₂" },
                { label: "Cricoid pressure", value: "30N applied by trained assistant (controversial — may impair laryngoscopy)" },
                { label: "Induction", value: "Ketamine 1-2 mg/kg (haemodynamically stable) or propofol (if stable)" },
                { label: "Muscle relaxant", value: "Suxamethonium 1-1.5 mg/kg or rocuronium 1.2 mg/kg" },
                { label: "No bag-mask ventilation", value: "Between induction and intubation (unless SpO₂ falls)" },
                { label: "Plan B ready", value: "2nd-gen SAD and FONA equipment immediately available" },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Damage Control Resuscitation</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Targets the lethal triad of hypothermia, acidosis, and coagulopathy:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li><strong>Permissive hypotension</strong>: target SBP 80-90 mmHg (except TBI) until surgical haemorrhage control</li>
            <li><strong>Haemostatic resuscitation</strong>: 1:1:1 ratio (PRBC : FFP : platelets)</li>
            <li><strong>Tranexamic acid</strong>: 1g IV within 3 hours of injury (CRASH-2)</li>
            <li><strong>Limit crystalloid</strong>: avoid haemodilution and worsening coagulopathy</li>
            <li><strong>Warm fluids/patient</strong>: active warming to prevent hypothermia</li>
            <li><strong>Point-of-care testing</strong>: TEG/ROTEM to guide targeted blood product therapy</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Massive Transfusion Protocol</h2>
          <p className="text-muted-foreground leading-relaxed">
            Activated when anticipated need for ≥10 units PRBC in 24h or &gt;4 units in 1 hour. Trigger: uncontrolled haemorrhage, haemodynamic instability despite fluids, or anticipated major blood loss. Emergency O-negative blood should be available within minutes. Monitor for complications: hyperkalaemia, hypocalcaemia (citrate toxicity), hypothermia, TRALI, TACO.
          </p>
        </div>
      </section>

      <KeyLearningPoints points={[
        "RSI: pre-oxygenation, rapid induction, no ventilation (unless desaturation), rapid intubation",
        "Damage control: permissive hypotension, 1:1:1 ratio, TXA within 3 hours",
        "The lethal triad: hypothermia, acidosis, coagulopathy — prevent all three",
        "Ketamine is the induction agent of choice in haemodynamically unstable patients",
        "TEG/ROTEM enables goal-directed transfusion and reduces blood product use",
      ]} />

      <QuizSection questions={traumaEmergencyQuestions} />
      <TopicCompletionToggle />
    </SectionLayout>
  );
};

export default TraumaEmergencyTopic;
