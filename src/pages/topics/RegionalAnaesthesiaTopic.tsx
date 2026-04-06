import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { regionalAnaesthesiaQuestions } from "@/data/quizzes";
import DermatomeDiagram from "@/components/diagrams/DermatomeDiagram";
import DermatomeMapDiagram from "@/components/diagrams/DermatomeMapDiagram";
import RegionalBlocksDiagram from "@/components/diagrams/RegionalBlocksDiagram";

const RegionalAnaesthesiaTopic = () => {
  return (
    <SectionLayout title="Regional & Neuraxial Anaesthesia" subtitle="FRCA / FFICM — Clinical Anaesthesia" backPath="/clinical" backLabel="Clinical Anaesthesia" accentColor="text-clinical">
      <DermatomeMapDiagram />
      <DermatomeDiagram />
      <RegionalBlocksDiagram />
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Spinal Anaesthesia</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Intrathecal injection of local anaesthetic ± opioid into the subarachnoid space, typically at L3/4 or L4/5.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Heavy (Hyperbaric) Bupivacaine</p>
              <p className="text-sm text-muted-foreground mt-1">0.5% in 8% glucose. Dose: 2.5–3.5 ml. Predictable spread influenced by patient position and baricity. Onset 5–10 min, duration 2–3 hrs.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Intrathecal Adjuncts</p>
              <p className="text-sm text-muted-foreground mt-1">Fentanyl 15–25 µg (improves block quality, minimal respiratory depression). Diamorphine 0.2–0.4 mg (prolonged analgesia, monitor for delayed respiratory depression).</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Epidural Anaesthesia</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Catheter-based technique allowing continuous or bolus top-ups. Needle enters the epidural space (loss of resistance to saline or air).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Parameter</th>
                  <th className="text-left py-2 text-foreground font-semibold">Spinal</th>
                  <th className="text-left py-2 text-foreground font-semibold">Epidural</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Onset</td><td>Rapid (5–10 min)</td><td>Slow (15–30 min)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Block density</td><td>Dense motor + sensory</td><td>Differential (sensory {'>'} motor)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">LA dose</td><td>Small (2–3 ml)</td><td>Large (10–20 ml)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Duration</td><td>Fixed (single-shot)</td><td>Titrable (catheter)</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Hypotension</td><td>Rapid, profound</td><td>Gradual, manageable</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Peripheral Nerve Blocks</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Ultrasound-guided blocks have revolutionised regional anaesthesia, improving success rates and reducing complications.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { block: "Interscalene", indication: "Shoulder surgery", nerves: "C5-C7 roots", risk: "Phrenic nerve palsy (100%)" },
              { block: "Supraclavicular", indication: "Arm/forearm surgery", nerves: "Brachial plexus trunks", risk: "Pneumothorax (rare with US)" },
              { block: "Adductor Canal", indication: "Knee surgery (motor-sparing)", nerves: "Saphenous nerve", risk: "Minimal — preferred over femoral" },
              { block: "Popliteal Sciatic", indication: "Foot/ankle surgery", nerves: "Sciatic nerve", risk: "Foot drop if excessive volume" },
              { block: "TAP Block", indication: "Abdominal wall analgesia", nerves: "T6-L1 intercostals", risk: "Visceral injury, LA toxicity" },
              { block: "Erector Spinae Plane", indication: "Thoracic/abdominal analgesia", nerves: "Dorsal & ventral rami", risk: "Pneumothorax (very rare)" },
            ].map((b) => (
              <div key={b.block} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{b.block}</p>
                <p className="text-xs text-muted-foreground mt-1"><strong>Indication:</strong> {b.indication}</p>
                <p className="text-xs text-muted-foreground"><strong>Target:</strong> {b.nerves}</p>
                <p className="text-xs text-muted-foreground"><strong>Risk:</strong> {b.risk}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Complications of Neuraxial Blockade</h2>
          <div className="space-y-2">
            {[
              { complication: "Post-dural puncture headache", incidence: "1–2% (spinal), higher with large-gauge/cutting needles", management: "Conservative → epidural blood patch (gold standard)" },
              { complication: "Epidural abscess", incidence: "1:10,000–1:50,000", management: "Urgent MRI, neurosurgical decompression within 12h, IV antibiotics" },
              { complication: "Epidural haematoma", incidence: "1:150,000 (epidural), 1:220,000 (spinal)", management: "Urgent MRI + decompression. Follow anticoagulation guidelines (AAGBI/ESRA)" },
              { complication: "Total spinal", incidence: "Rare — accidental intrathecal injection of epidural dose", management: "Cardiovascular support, intubation, await regression" },
            ].map((c) => (
              <div key={c.complication} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{c.complication}</p>
                <p className="text-xs text-muted-foreground mt-1"><strong>Incidence:</strong> {c.incidence}</p>
                <p className="text-xs text-muted-foreground"><strong>Management:</strong> {c.management}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Spinal: rapid dense block, single-shot; Epidural: titratable, catheter-based, differential block",
        "Hyperbaric bupivacaine spread influenced by baricity and patient position",
        "Interscalene block causes ipsilateral phrenic nerve palsy in ~100% of cases",
        "PDPH: worse sitting/standing, treat with epidural blood patch if conservative measures fail",
        "Follow AAGBI/ESRA anticoagulation guidelines — timing of neuraxial relative to anticoagulants is critical",
      ]} />

      <QuizSection questions={regionalAnaesthesiaQuestions} />
      <TopicCompletionToggle topicId="regional-anaesthesia" topicTitle="Regional & Neuraxial Anaesthesia" />
    </SectionLayout>
  );
};

export default RegionalAnaesthesiaTopic;
