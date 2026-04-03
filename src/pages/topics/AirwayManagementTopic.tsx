import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { AirwayDevicesDiagram } from "@/components/diagrams/AirwayDevicesDiagram";
import { BreathingCircuitDiagram } from "@/components/diagrams/BreathingCircuitDiagram";
import { airwayManagementQuestions } from "@/data/quizzes";

const AirwayManagementTopic = () => {
  return (
    <SectionLayout title="Airway Management" subtitle="FRCA Final / FFICM — Clinical Anaesthesia" backPath="/clinical" backLabel="Clinical Anaesthesia" accentColor="text-clinical">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Airway management is the cornerstone of anaesthetic practice and critical care. The Difficult Airway Society (DAS) guidelines provide structured algorithms for unanticipated difficult intubation. Understanding equipment, techniques, and rescue pathways is essential for safe practice.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Airway Devices Comparison</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Compare endotracheal tubes, supraglottic airways, and videolaryngoscope types with cross-sectional diagrams.
          </p>
          <div className="rounded-xl border border-border bg-card p-4">
            <AirwayDevicesDiagram />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Breathing Circuits</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Explore the different breathing systems with animated gas flow. Understand the efficiency of each for spontaneous vs controlled ventilation.
          </p>
          <div className="rounded-xl border border-border bg-card p-4">
            <BreathingCircuitDiagram />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">DAS Difficult Intubation Algorithm</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The 2015 DAS guidelines outline four plans for managing unanticipated difficult tracheal intubation in adults.
          </p>
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            {[
              { plan: "Plan A", title: "Facemask ventilation & tracheal intubation", detail: "Optimise position (ramped), pre-oxygenation, videolaryngoscopy as default/early. Maximum 3+1 intubation attempts. Maintain oxygenation throughout." },
              { plan: "Plan B", title: "Supraglottic airway device (SAD)", detail: "2nd-generation SAD (e.g., i-gel, ProSeal LMA). Maximum 3 attempts. If successful, wake or proceed. If ventilation fails → Plan C." },
              { plan: "Plan C", title: "Facemask ventilation", detail: "Two-person technique. Paralysis with suxamethonium or rocuronium. If oxygenation maintained → wake patient. If CICO → Plan D." },
              { plan: "Plan D", title: "Emergency front-of-neck access (FONA)", detail: "Scalpel cricothyroidotomy. Stab incision through cricothyroid membrane, bougie, 6.0 cuffed tube. DECLARE CICO EARLY." },
            ].map((p) => (
              <div key={p.plan} className="p-4 rounded-lg bg-secondary/30 border border-border">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-primary text-sm">{p.plan}</span>
                  <span className="font-semibold text-foreground text-sm">— {p.title}</span>
                </div>
                <p className="text-sm text-muted-foreground">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Front-of-Neck Access (FONA)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The scalpel-bougie-tube technique is the DAS-recommended surgical airway for can't intubate, can't oxygenate (CICO):
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Palpate cricothyroid membrane (or use ultrasound pre-procedure)</li>
            <li>Transverse stab incision through skin and membrane</li>
            <li>Rotate scalpel blade 90° to maintain opening</li>
            <li>Insert bougie caudally (tracheal clicks)</li>
            <li>Railroad 6.0 mm cuffed ETT over bougie</li>
            <li>Inflate cuff, ventilate, confirm with capnography</li>
          </ol>
        </div>
      </section>

      <KeyLearningPoints points={[
        "DAS 2015 — 4 sequential plans: intubation → SAD → facemask → FONA",
        "2nd-gen SADs have gastric drain ports and seal pressures 25-35 cmH₂O",
        "Mapleson A most efficient for spontaneous, D (Bain) for controlled ventilation",
        "Circle system allows low-flow anaesthesia (FGF = metabolic O₂ consumption)",
        "CICO requires early declaration and immediate scalpel cricothyroidotomy",
      ]} />

      <QuizSection questions={airwayManagementQuestions} />
      <TopicCompletionToggle topicId="airway-management" topicTitle="Airway Management" />
    </SectionLayout>
  );
};

export default AirwayManagementTopic;
