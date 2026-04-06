import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { transferMedicineQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";

const TransferMedicineTopic = () => {
  return (
    <SectionLayout title="Transfer Medicine" subtitle="FRCA Final / FFICM — Clinical" backPath="/clinical" backLabel="Clinical" accentColor="text-clinical">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Principles of Safe Transfer</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">ICS/AAGBI guidelines: the standard of care during transfer should be at least as good as at the referring hospital. Decision to transfer must be made by a senior clinician. Benefits must outweigh risks.</p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Indications</strong>: specialist care unavailable (neurosurgery, cardiothoracic, ECMO, burns), investigations (MRI, angiography), repatriation</li>
            <li><strong>Decision</strong>: senior-to-senior communication. Referring and receiving teams agree on timing and clinical plan</li>
            <li><strong>Personnel</strong>: minimum doctor + assistant (nurse/ODP). Doctor experienced in transfer medicine. Both trained in equipment</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Preparation — ABCDE Stabilisation</h2>
          <div className="space-y-3">
            {[
              { area: "Airway", detail: "Secure airway before transfer if any concern. ETT preferred (secured, documented at teeth). Carry difficult airway equipment." },
              { area: "Breathing", detail: "Portable ventilator with disconnect alarm. Sufficient O₂ (calculate: flow rate × duration × 2 for safety). Chest drain clamping is NEVER safe — use underwater seal or Heimlich valve." },
              { area: "Circulation", detail: "Two large-bore IV cannulae (secured). Adequate fluids/blood. Vasopressors prepared in syringes. Invasive arterial monitoring recommended." },
              { area: "Disability", detail: "Sedation/analgesia infusions prepared. ICP management if relevant. Seizure prophylaxis/treatment available." },
              { area: "Exposure", detail: "Temperature management: active warming, space blanket. Prevent hypothermia during prolonged transfers." },
            ].map(item => (
              <div key={item.area} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{item.area}</p>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Equipment & Documentation</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Monitoring</strong>: ECG, SpO₂, ETCO₂, invasive BP, temperature — minimum standard. Battery backup essential</li>
            <li><strong>O₂ calculation</strong>: E-cylinder (680L) at 10L/min = 68 min. D-cylinder (340L). Always carry spare</li>
            <li><strong>Drugs</strong>: emergency drugs drawn up and labelled. Adrenaline, atropine, midazolam, propofol, suxamethonium, rocuronium, vasopressors</li>
            <li><strong>Documentation</strong>: transfer form with observations every 15 min, interventions, clinical events. Handover at receiving unit using SBAR/ISBAR</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Physics of Transport</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Acceleration/deceleration</strong>: affects BP measurement (transducer position relative to heart changes), ↑ ICP risk, equipment movement</li>
            <li><strong>Altitude (air transfer)</strong>: ↓ barometric pressure → gas expansion (Boyle's law). ETT cuff, pneumothorax, bowel gas all expand. ↓ PaO₂ (cabin altitude ~6,000-8,000 ft)</li>
            <li><strong>Vibration</strong>: artefact on monitoring, patient discomfort, equipment damage</li>
            <li><strong>Noise</strong>: makes auscultation impossible — rely on capnography and SpO₂. Communication difficult</li>
          </ul>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Standard of care during transfer must be at least as good as at referring hospital (ICS/AAGBI)",
        "Secure airway BEFORE transfer if any concern. Chest drains must NEVER be clamped — use Heimlich valve",
        "O₂ calculation: E-cylinder = 680L. Calculate flow × time × 2 safety factor. Always carry spare",
        "Altitude: gas expands (Boyle's law) — ETT cuff, pneumothorax, bowel gas. ↓ PaO₂ at cabin altitude",
        "Minimum monitoring: ECG, SpO₂, ETCO₂, invasive BP, temperature. Battery backup essential",
      ]} />
      <QuizSection questions={transferMedicineQuestions} />
      <ReferencesList topicId="transfer-medicine" />
      <TopicCompletionToggle topicId="transfer-medicine" topicTitle="Transfer Medicine" />
    </SectionLayout>
  );
};

export default TransferMedicineTopic;
