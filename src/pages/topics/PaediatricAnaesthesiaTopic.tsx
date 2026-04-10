import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { paediatricAnaesthesiaQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const PaediatricAnaesthesiaTopic = () => {
  return (
    <SectionLayout title="Paediatric Anaesthesia" subtitle="FRCA / FFICM — Clinical Anaesthesia" backPath="/clinical" backLabel="Clinical Anaesthesia" accentColor="text-clinical">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Anatomical & Physiological Differences</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">System</th>
                  <th className="text-left py-2 text-foreground font-semibold">Neonate/Infant</th>
                  <th className="text-left py-2 text-foreground font-semibold">Clinical Relevance</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Airway</td><td>Large head/tongue, high anterior larynx (C3-4), narrow subglottis</td><td>Straight blade (Miller), uncuffed ETT &lt;8y (traditional), cuffed now accepted &gt;3kg</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Resp</td><td>High O₂ consumption (6-8 ml/kg/min), low FRC, high closing capacity</td><td>Rapid desaturation, prone to atelectasis</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">CVS</td><td>Rate-dependent cardiac output, immature baroreflexes</td><td>Bradycardia = haemodynamic emergency, atropine 20 µg/kg</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Metabolism</td><td>High BSA:weight ratio, limited glycogen stores</td><td>Hypothermia risk, hypoglycaemia risk — check glucose</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Pharmacology</td><td>↑ Volume of distribution, immature hepatic metabolism, ↓ protein binding</td><td>Higher weight-based doses of water-soluble drugs, prolonged duration of some agents</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ETT Size & Drug Doses</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">ETT Sizing</p>
              <p className="text-sm text-muted-foreground mt-1">Uncuffed: age/4 + 4. Cuffed: age/4 + 3.5. Length (oral): age/2 + 12 cm. Neonate: 3.0–3.5 mm (term).</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Key Drug Doses</p>
              <p className="text-sm text-muted-foreground mt-1">Propofol: 3–5 mg/kg (neonates need more per kg). Suxamethonium: 2 mg/kg IV (children have ↑Vd). Atropine: 20 µg/kg. Adrenaline: 10 µg/kg (cardiac arrest).</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Common Paediatric Scenarios</h2>
          <div className="space-y-3">
            {[
              { scenario: "Laryngospasm", management: "Most common paediatric airway emergency. Apply CPAP with 100% O₂, jaw thrust. If not resolving: propofol 0.5 mg/kg or suxamethonium 0.5–1 mg/kg IV/IM. Larson's notch pressure." },
              { scenario: "Epiglottitis", management: "Now rare (Hib vaccine). Do NOT examine throat. Gaseous induction in theatre with ENT standby. IV access after induction. Tracheostomy rarely needed." },
              { scenario: "Pyloric Stenosis", management: "Hypochloraemic, hypokalaemic metabolic alkalosis. Medical emergency, NOT surgical. Correct electrolytes and dehydration first. RSI with modified approach." },
              { scenario: "Tonsillectomy Bleeding", management: "Assume full stomach and hypovolaemia. Resuscitate with 20 ml/kg crystalloid. RSI with head-down, left lateral position. Suction before induction." },
            ].map((s) => (
              <div key={s.scenario} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{s.scenario}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.management}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Fluid Management</h2>
          <p className="text-muted-foreground leading-relaxed mb-2">
            Maintenance fluids: 4-2-1 rule (Holliday-Segar). Use isotonic balanced solutions (Hartmann's/Plasmalyte). Avoid hypotonic solutions — risk of hyponatraemia.
          </p>
          <div className="p-4 rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">4-2-1 Rule:</strong> 4 ml/kg/hr for first 10 kg, 2 ml/kg/hr for next 10 kg, 1 ml/kg/hr for each kg thereafter.
              <br /><strong className="text-foreground">Replacement:</strong> 10 ml/kg isotonic crystalloid boluses. Reassess after each bolus.
              <br /><strong className="text-foreground">Blood:</strong> Maximum allowable blood loss = EBV × (Hct_start − Hct_min) / Hct_start. Neonatal EBV = 80 ml/kg.
            </p>
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Neonatal cardiac output is rate-dependent — bradycardia is a haemodynamic emergency",
        "High O₂ consumption + low FRC = rapid desaturation; pre-oxygenation essential",
        "ETT size: uncuffed = age/4 + 4; cuffed = age/4 + 3.5",
        "Pyloric stenosis: correct the alkalosis first — it is a medical, not surgical, emergency",
        "Use isotonic balanced crystalloids for maintenance — never hypotonic solutions in children",
      ]} />

      <QuizSection questions={paediatricAnaesthesiaQuestions} />
      <ReferencesList topicId="paediatric-anaesthesia" />

      <SeeAlso topicId="paediatric-anaesthesia" />
        <TopicCompletionToggle topicId="paediatric-anaesthesia" topicTitle="Paediatric Anaesthesia" />
    </SectionLayout>
  );
};

export default PaediatricAnaesthesiaTopic;
