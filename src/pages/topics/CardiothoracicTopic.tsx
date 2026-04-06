import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { cardiothoracicQuestions } from "@/data/quizzes";
import CPBCircuitDiagram from "@/components/diagrams/CPBCircuitDiagram";
import DLTInsertionDiagram from "@/components/diagrams/DLTInsertionDiagram";

const CardiothoracicTopic = () => {
  return (
    <SectionLayout title="Cardiothoracic Anaesthesia" subtitle="FRCA / FFICM — Clinical Anaesthesia" backPath="/clinical" backLabel="Clinical Anaesthesia" accentColor="text-clinical">
      <CPBCircuitDiagram />
      <DLTInsertionDiagram />
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Cardiopulmonary Bypass (CPB)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            CPB allows the heart and lungs to be bypassed during cardiac surgery. Understanding the circuit and physiological derangements is essential.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">CPB Circuit Components</p>
              <p className="text-sm text-muted-foreground mt-1">Venous cannula (RA/SVC/IVC) → venous reservoir → pump (roller/centrifugal) → oxygenator/heat exchanger → arterial filter → arterial cannula (aorta). Prime volume ~1.5 L (haemodilution).</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Anticoagulation</p>
              <p className="text-sm text-muted-foreground mt-1">Heparin 300–400 units/kg before cannulation. Target ACT &gt;480 seconds. Reverse with protamine 1 mg per 100 units heparin. Protamine reactions: hypotension, bronchospasm, pulmonary hypertension.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Physiological Effects of CPB</h2>
          <div className="space-y-2">
            {[
              { effect: "SIRS", detail: "Blood contact with circuit surfaces activates complement, cytokines, and coagulation cascades — systemic inflammatory response." },
              { effect: "Haemodilution", detail: "Prime volume reduces Hct to ~25%. Acceptable — improves rheology. Transfuse if Hct <20% on bypass." },
              { effect: "Hypothermia", detail: "Intentional cooling to 28–32°C (moderate) or 18–20°C (deep — circulatory arrest). Reduces metabolic rate ~7% per 1°C." },
              { effect: "Non-pulsatile flow", detail: "Roller pumps provide non-pulsatile flow. May impair microcirculation and organ perfusion. Centrifugal pumps provide some pulsatility." },
              { effect: "Coagulopathy", detail: "Platelet dysfunction, consumption of factors, heparin rebound, fibrinolysis. Give TXA (ATACAS trial)." },
            ].map((e) => (
              <div key={e.effect} className="flex gap-3 p-3 rounded border border-border">
                <span className="font-bold text-primary text-sm whitespace-nowrap">{e.effect}</span>
                <span className="text-sm text-muted-foreground">{e.detail}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">One-Lung Ventilation (OLV)</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Double-Lumen Tube (DLT)</p>
              <p className="text-sm text-muted-foreground mt-1">Left-sided DLT preferred (right upper lobe anatomy variable). Confirm position with fibreoptic bronchoscopy. Sizes: 35–41 Fr (women 35–37, men 39–41).</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Bronchial Blocker</p>
              <p className="text-sm text-muted-foreground mt-1">Alternative to DLT. Passed through single-lumen ETT. Useful in difficult airway, existing tracheostomy. Slower deflation, less reliable isolation.</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mt-3">
            <strong className="text-foreground">Hypoxia during OLV:</strong> Hypoxic pulmonary vasoconstriction (HPV) diverts blood from the collapsed lung. Management: ↑FiO₂, CPAP to non-dependent lung (5–10 cmH₂O), PEEP to dependent lung, check tube position, recruitment manoeuvres.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Key Cardiac Surgery Considerations</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Aortic Valve Replacement</p>
              <p className="text-sm text-muted-foreground mt-1">Aortic stenosis: maintain SVR, avoid tachycardia, maintain sinus rhythm. Dangerous triad: hypotension → coronary hypoperfusion → further hypotension. Phenylephrine for BP support.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">CABG</p>
              <p className="text-sm text-muted-foreground mt-1">On-pump vs off-pump (OPCAB). Maintain haemodynamic stability during grafting. TOE to assess wall motion abnormalities. ATACAS trial: TXA reduces bleeding without increasing thrombotic events.</p>
            </div>
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "CPB: heparin 300-400 u/kg, target ACT >480s, reverse with protamine 1mg:100u ratio",
        "CPB activates SIRS — complement, cytokines, coagulopathy; TXA reduces bleeding (ATACAS)",
        "Left-sided DLT preferred for OLV; always confirm position with fibreoptic bronchoscopy",
        "HPV reduces shunt during OLV — inhibited by volatiles >1 MAC, vasodilators, and hypothermia",
        "Aortic stenosis: maintain SVR and sinus rhythm, avoid tachycardia and hypotension",
      ]} />

      <QuizSection questions={cardiothoracicQuestions} />
      <TopicCompletionToggle topicId="cardiothoracic" topicTitle="Cardiothoracic Anaesthesia" />
    </SectionLayout>
  );
};

export default CardiothoracicTopic;
