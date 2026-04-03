import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { obstetricAnaesthesiaQuestions } from "@/data/quizzes";

const ObstetricAnaesthesiaTopic = () => {
  return (
    <SectionLayout title="Obstetric Anaesthesia" subtitle="FRCA / FFICM — Clinical Anaesthesia" backPath="/clinical" backLabel="Clinical Anaesthesia" accentColor="text-clinical">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Physiological Changes of Pregnancy</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">System</th>
                  <th className="text-left py-2 text-foreground font-semibold">Change</th>
                  <th className="text-left py-2 text-foreground font-semibold">Anaesthetic Implication</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">CVS</td><td>CO ↑40%, SVR ↓, aortocaval compression</td><td>Left lateral tilt, rapid hypotension with neuraxial</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Resp</td><td>FRC ↓20%, O₂ consumption ↑20%, minute ventilation ↑50%</td><td>Rapid desaturation on apnoea, reduced respiratory alkalosis (PaCO₂ ~4 kPa)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">GI</td><td>Reduced LOS tone, delayed gastric emptying (labour)</td><td>Full stomach precautions, RSI for GA caesarean</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Haem</td><td>Dilutional anaemia, hypercoagulable state</td><td>VTE prophylaxis, physiological leucocytosis</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Neuro</td><td>Reduced LA requirement (30–40% less), engorged epidural veins</td><td>Lower spinal doses, higher epidural catheter migration risk</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Anaesthesia for Caesarean Section</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Spinal (Gold Standard)</p>
              <p className="text-sm text-muted-foreground mt-1">Heavy bupivacaine 0.5% 2.2–2.6 ml + fentanyl 15 µg + diamorphine 0.3 mg. Target block T4. Left lateral tilt 15°. Phenylephrine infusion to prevent hypotension.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">General Anaesthesia</p>
              <p className="text-sm text-muted-foreground mt-1">RSI with cricoid pressure. Preoxygenation critical (reduced FRC). Thiopentone 5–7 mg/kg or propofol. Suxamethonium 1–1.5 mg/kg. Avoid awareness — MAC increased in pregnancy.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Obstetric Emergencies</h2>
          <div className="space-y-3">
            {[
              { emergency: "Major Obstetric Haemorrhage", key: "Antepartum (placenta praevia, abruption) or postpartum (uterine atony — commonest cause). Massive transfusion protocol. Uterotonic escalation: oxytocin → ergometrine → carboprost → misoprostol. Surgical: B-Lynch suture, balloon tamponade, hysterectomy." },
              { emergency: "Pre-eclampsia / Eclampsia", key: "BP ≥140/90 + proteinuria after 20 weeks. Severe: BP ≥160/110, HELLP syndrome. IV MgSO₄ (4g bolus, 1g/hr) for seizure prophylaxis. Labetalol/hydralazine for BP. Definitive treatment: delivery." },
              { emergency: "Amniotic Fluid Embolism", key: "Sudden cardiovascular collapse + hypoxia + DIC during labour or CS. Incidence ~1:40,000. Mortality 20–60%. Treatment: supportive — intubation, vasopressors, blood products for DIC." },
              { emergency: "Category 1 Caesarean Section", key: "Decision-to-delivery interval <30 minutes (ideally <15 min). If no existing epidural, spinal preferred if feasible. GA if time-critical. Pre-prepared drug trays essential." },
            ].map((e) => (
              <div key={e.emergency} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{e.emergency}</p>
                <p className="text-sm text-muted-foreground mt-1">{e.key}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Labour Analgesia</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Epidural analgesia is the gold standard for labour pain. Low-dose combined spinal-epidural (CSE) provides rapid onset with minimal motor block.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Epidural</p>
              <p className="text-sm text-muted-foreground mt-1">Low-dose bupivacaine 0.1% + fentanyl 2 µg/ml. PIEB (programmed intermittent epidural bolus) superior to continuous infusion — better spread, less motor block, higher satisfaction.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Remifentanil PCA</p>
              <p className="text-sm text-muted-foreground mt-1">Alternative when epidural contraindicated. Bolus 30–40 µg, lockout 2 min. Requires 1:1 midwifery, continuous SpO₂ monitoring. Risk of respiratory depression.</p>
            </div>
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Pregnancy: ↑CO 40%, ↓FRC 20%, ↑O₂ consumption — rapid desaturation on apnoea",
        "Spinal for CS: heavy bupivacaine + fentanyl + diamorphine, target T4, phenylephrine infusion",
        "PPH: commonest cause is uterine atony — oxytocin → ergometrine → carboprost → surgical",
        "Pre-eclampsia: MgSO₄ 4g bolus for seizure prophylaxis; definitive treatment is delivery",
        "PIEB epidural technique provides better analgesia and satisfaction than continuous infusion",
      ]} />

      <QuizSection questions={obstetricAnaesthesiaQuestions} />
      <TopicCompletionToggle topicId="obstetric-anaesthesia" topicTitle="Obstetric Anaesthesia" />
    </SectionLayout>
  );
};

export default ObstetricAnaesthesiaTopic;
