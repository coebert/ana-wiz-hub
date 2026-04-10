import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { clinicalIncidentsQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";
import MHPathophysiologyDiagram from "@/components/diagrams/MHPathophysiologyDiagram";

const ClinicalIncidentsTopic = () => {
  return (
    <SectionLayout title="Critical Incidents" subtitle="FRCA Final / FFICM — Clinical Anaesthesia" backPath="/clinical" backLabel="Clinical Anaesthesia" accentColor="text-clinical">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Anaphylaxis</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Perioperative anaphylaxis occurs in ~1:10,000 anaesthetics. NMBAs are the commonest cause (60%), followed by antibiotics, chlorhexidine, and latex.
          </p>
          <div className="rounded-xl border border-border bg-card p-5 space-y-2">
            <p className="font-semibold text-foreground text-sm">AAGBI Management Algorithm:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Remove trigger, call for help, note the time</li>
              <li><strong>Adrenaline IM</strong>: 0.5 mg (0.5 ml of 1:1000) — repeat every 5 min. IV: 50 mcg boluses if trained</li>
              <li>High-flow O₂, secure airway, IV access</li>
              <li>Fluid bolus: 20 ml/kg crystalloid</li>
              <li>Chlorphenamine 10 mg IV, hydrocortisone 200 mg IV</li>
              <li>Take mast cell tryptase at 1h, 6h, and &gt;24h (baseline)</li>
            </ol>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Malignant Hyperthermia (MH)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Autosomal dominant ryanodine receptor (RYR1) mutation. Triggered by volatile agents and suxamethonium. Incidence ~1:5,000-15,000. Mortality now &lt;5% with dantrolene.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm mb-1">Early Signs</p>
              <p className="text-sm text-muted-foreground">↑EtCO₂ (earliest), tachycardia, masseter spasm, metabolic acidosis</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm mb-1">Late Signs</p>
              <p className="text-sm text-muted-foreground">Hyperthermia (&gt;2°C/hr rise), rhabdomyolysis, hyperkalaemia, DIC</p>
            </div>
          </div>
          <div className="mt-3 p-4 rounded-lg bg-destructive/5 border border-destructive/20">
            <p className="font-semibold text-foreground text-sm">Treatment: Dantrolene 2.5 mg/kg IV</p>
            <p className="text-sm text-muted-foreground mt-1">Repeat every 5-10 min up to 10 mg/kg. Discontinue triggers, hyperventilate with 100% O₂, active cooling, treat hyperkalaemia.</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Local Anaesthetic Toxicity (LAST)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            CNS toxicity precedes cardiac toxicity (except with bupivacaine which can cause simultaneous cardiac arrest). Maximum doses: lidocaine 3 mg/kg (7 with adrenaline), bupivacaine 2 mg/kg.
          </p>
          <div className="p-4 rounded-lg border border-border">
            <p className="font-semibold text-foreground text-sm mb-2">AAGBI LAST Protocol:</p>
            <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
              <li>Stop injection, call for help</li>
              <li>ABCDE, secure airway, 100% O₂</li>
              <li>Seizures → benzodiazepine (avoid propofol in cardiac arrest)</li>
              <li>If cardiac arrest → CPR, avoid lidocaine/amiodarone</li>
              <li><strong>Intralipid 20%</strong>: 1.5 ml/kg bolus, then 15 ml/kg/hr infusion</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Awareness Under Anaesthesia</h2>
          <p className="text-muted-foreground leading-relaxed">
            NAP5 (2014): incidence ~1:19,000. Risk factors: TIVA without BIS, RSI, cardiac surgery, CS under GA, junior anaesthetist, failure to check equipment. Prevention: processed EEG monitoring (BIS 40-60), ETAG monitoring for volatiles, avoid paralysis unless necessary. Management: immediate acknowledgement, psychological support, formal follow-up.
          </p>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Anaphylaxis: adrenaline IM 0.5 mg is first-line. Take tryptase at 1h, 6h, >24h",
        "MH: rising EtCO₂ is the earliest sign. Dantrolene 2.5 mg/kg IV is definitive treatment",
        "LAST: Intralipid 20% bolus 1.5 ml/kg, infusion 15 ml/kg/hr. Avoid propofol in cardiac arrest",
        "Awareness: NAP5 incidence 1:19,000. BIS 40-60 reduces risk with TIVA",
        "NMBAs are the commonest cause of perioperative anaphylaxis (~60%)",
      ]} />

      <QuizSection questions={clinicalIncidentsQuestions} />
      <ReferencesList topicId="clinical-incidents" />

      <SeeAlso topicId="clinical-incidents" />
        <TopicCompletionToggle topicId="clinical-incidents" topicTitle="Critical Incidents" />
    </SectionLayout>
  );
};

export default ClinicalIncidentsTopic;
