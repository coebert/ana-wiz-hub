import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { urologicalAnaesthesiaQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const UrologicalAnaesthesiaTopic = () => {
  return (
    <SectionLayout title="Urological Anaesthesia" subtitle="FRCA Final — Clinical Anaesthesia" backPath="/clinical" backLabel="Clinical Anaesthesia" accentColor="text-clinical">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Urological surgery ranges from minor cystoscopy to major radical procedures. Anaesthetic considerations include lithotomy positioning, fluid absorption syndromes, laser safety, and the often elderly comorbid patient population. Neuraxial anaesthesia is frequently preferred for lower urinary tract procedures.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">TURP Syndrome</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Absorption of hypotonic glycine 1.5% irrigation fluid during transurethral resection of the prostate — a potentially life-threatening complication.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Mechanism", value: "Absorption of hypotonic irrigant via open prostatic venous sinuses" },
              { label: "Volume risk", value: "Absorption of >1–2 L glycine; risk ↑ with resection time >60 min" },
              { label: "Features", value: "Hyponatraemia, confusion, visual disturbance, seizures, pulmonary oedema, cardiovascular collapse" },
              { label: "Hyponatraemia", value: "Dilutional — Na⁺ may fall to <120 mmol/L; rapid fall is most dangerous" },
              { label: "Visual symptoms", value: "Glycine is an inhibitory neurotransmitter in the retina — causes transient blindness" },
              { label: "Management", value: "Stop surgery, IV furosemide, hypertonic saline (1.8–3%) if Na⁺ <120 with symptoms, supportive care" },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-semibold text-foreground text-sm">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
            <p className="text-xs text-amber-400 font-semibold mb-1">⚠ Exam Tip</p>
            <p className="text-xs text-muted-foreground">
              Spinal anaesthesia for TURP allows early detection of TURP syndrome — the awake patient develops confusion, restlessness, and nausea. Under GA these signs are masked. Spinal block to T10 is sufficient.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Bipolar TURP & Laser Prostatectomy</h2>
          <p className="text-muted-foreground leading-relaxed">
            Modern bipolar TURP uses isotonic saline irrigation, eliminating the risk of TURP syndrome. HoLEP (holmium laser enucleation) and GreenLight PVP (photoselective vaporisation) also use saline. However, fluid overload from excessive absorption remains possible. Bipolar/laser techniques allow longer resection times and are increasingly standard.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Lithotomy Position</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li><strong>Nerve injury</strong>: common peroneal nerve (lateral fibular head compression), femoral nerve (hip hyperflexion), obturator nerve</li>
            <li><strong>Compartment syndrome</strong>: prolonged elevation &gt;4 hours — calf compartment syndrome risk</li>
            <li><strong>Haemodynamic effects</strong>: legs elevated → ↑ preload initially; legs lowered → sudden ↓ preload (hypotension)</li>
            <li><strong>Respiratory</strong>: abdominal viscera push diaphragm cephalad → ↓ FRC, ↓ compliance (similar to Trendelenburg)</li>
            <li><strong>DVT risk</strong>: avoid calf compression from supports; use intermittent pneumatic compression</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Radical Cystectomy</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Major surgery (4–8 hours) with significant blood loss, fluid shifts, and high complication rate. Often elderly patients with smoking history and cardiovascular disease.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li><strong>Preoperative</strong>: cardiopulmonary assessment, prehabilitation, nutritional optimisation</li>
            <li><strong>Monitoring</strong>: arterial line, CVC, cardiac output monitoring, urinary catheter (pre-diversion)</li>
            <li><strong>Blood loss</strong>: 1–3 L typical; crossmatch 4–6 units, cell salvage if no malignancy at field</li>
            <li><strong>Analgesia</strong>: thoracic epidural (T8–T10) or bilateral TAP/rectus sheath blocks + PCA</li>
            <li><strong>ERAS</strong>: enhanced recovery protocols reduce LOS — early feeding, mobilisation, alvimopan for ileus</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Nephrectomy & Renal Surgery</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li><strong>Lateral position</strong>: dependent lung compression, V/Q mismatch; kidney bridge may compress IVC</li>
            <li><strong>Laparoscopic</strong>: pneumoperitoneum effects (↑ PaCO₂, ↓ venous return, ↑ airway pressures)</li>
            <li><strong>Robotic</strong>: steep Trendelenburg + pneumoperitoneum — significant ↑ IOP, ↑ ICP, facial/airway oedema</li>
            <li><strong>Renal function</strong>: protect remaining kidney — maintain renal perfusion, avoid nephrotoxins</li>
            <li><strong>Analgesia</strong>: paravertebral block, wound catheter, or TAP block; avoid NSAIDs if single kidney</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Extracorporeal Shock Wave Lithotripsy (ESWL)</h2>
          <p className="text-muted-foreground leading-relaxed">
            Focused shock waves fragment renal/ureteric calculi. Requires immobility and may be painful. Options: sedation + analgesia, spinal anaesthesia, or GA. Cardiac gating (trigger on R-wave) prevents arrhythmias. Contraindicated in pregnancy, aortic aneurysm, and uncorrected coagulopathy. Immersion lithotripsy (older machines) has additional considerations of hydrostatic effects.
          </p>
        </div>
      </section>

      <KeyLearningPoints points={[
        "TURP syndrome: hyponatraemia from glycine absorption — confusion, visual disturbance, seizures",
        "Spinal anaesthesia for TURP allows early detection of absorption symptoms in awake patients",
        "Bipolar TURP and laser techniques use saline — no TURP syndrome risk but fluid overload still possible",
        "Lithotomy position risks: common peroneal nerve injury, compartment syndrome, haemodynamic shifts",
        "Radical cystectomy: major blood loss, elderly patients, thoracic epidural/TAP blocks, ERAS protocols",
      ]} />

      <QuizSection questions={urologicalAnaesthesiaQuestions} />
      <ReferencesList topicId="urological-anaesthesia" />
      <SeeAlso topicId="urological-anaesthesia" />
        <TopicCompletionToggle topicId="urological-anaesthesia" topicTitle="Urological Anaesthesia" />
    </SectionLayout>
  );
};

export default UrologicalAnaesthesiaTopic;
