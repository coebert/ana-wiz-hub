import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { painMedicineQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const PainMedicineTopic = () => {
  return (
    <SectionLayout title="Pain Medicine" subtitle="FRCA / FFICM — Clinical Anaesthesia" backPath="/clinical" backLabel="Clinical Anaesthesia" accentColor="text-clinical">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Pain Pathways & Classification</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Pain is classified as nociceptive (somatic/visceral), neuropathic (nerve damage), or nociplastic (central sensitisation without tissue/nerve damage).
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Ascending Pathways</p>
              <p className="text-sm text-muted-foreground mt-1">Aδ fibres (fast, sharp, myelinated) and C fibres (slow, burning, unmyelinated) → dorsal horn (Rexed laminae I, II, V) → spinothalamic tract → thalamus → somatosensory cortex.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Descending Modulation</p>
              <p className="text-sm text-muted-foreground mt-1">Periaqueductal grey (PAG) → rostral ventromedial medulla (RVM) → dorsal horn. Serotonergic and noradrenergic inhibition. Gate control theory (Melzack & Wall).</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Multimodal Analgesia (WHO Ladder & Beyond)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Agent</th>
                  <th className="text-left py-2 text-foreground font-semibold">Mechanism</th>
                  <th className="text-left py-2 text-foreground font-semibold">Key Points</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Paracetamol</td><td>Central COX inhibition, serotonergic pathways</td><td>1g QDS (max 4g/day). Hepatotoxic in overdose. IV onset 5 min.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">NSAIDs</td><td>COX-1 & COX-2 inhibition</td><td>Renal, GI, platelet effects. Avoid post-CABG. Ibuprofen, diclofenac, ketorolac.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Gabapentinoids</td><td>α₂δ calcium channel subunit binding</td><td>Pregabalin, gabapentin. Neuropathic pain. NICE recommends for post-op. Sedation, dizziness.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Ketamine</td><td>NMDA receptor antagonist</td><td>Prevents central sensitisation, opioid-sparing. 0.1–0.5 mg/kg/hr infusion. Psychomimetic effects.</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Clonidine/Dexmedetomidine</td><td>α₂-agonists</td><td>Analgesic, opioid-sparing, anxiolytic. Dexmedetomidine: cooperative sedation without respiratory depression.</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Neuropathic Pain Management</h2>
          <div className="space-y-2">
            {[
              { line: "First-line", agents: "Amitriptyline 10–75 mg ON, duloxetine 60 mg OD, pregabalin 75–300 mg BD, gabapentin 300–1200 mg TDS" },
              { line: "Second-line", agents: "Combination of first-line agents from different classes. Topical lidocaine 5% patches or capsaicin 8% patches." },
              { line: "Third-line", agents: "Tramadol, strong opioids (with caution — limited evidence in neuropathic pain). Referral to pain specialist." },
              { line: "Interventional", agents: "Nerve blocks, spinal cord stimulation (NICE TA159), intrathecal drug delivery, radiofrequency denervation." },
            ].map((l) => (
              <div key={l.line} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{l.line}</p>
                <p className="text-sm text-muted-foreground mt-1">{l.agents}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Complex Regional Pain Syndrome (CRPS)</h2>
          <p className="text-muted-foreground leading-relaxed mb-2">
            Budapest criteria: continuing pain disproportionate to inciting event + signs/symptoms in ≥3 of 4 categories (sensory, vasomotor, sudomotor/oedema, motor/trophic) + signs in ≥2 categories at examination.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Treatment:</strong> MDT approach — physiotherapy (essential), psychology, pharmacology (neuropathic agents), sympathetic blocks, spinal cord stimulation, mirror therapy.
          </p>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Multimodal analgesia reduces opioid consumption and improves outcomes — use paracetamol, NSAIDs, gabapentinoids, ketamine",
        "Neuropathic pain first-line: amitriptyline, duloxetine, pregabalin, or gabapentin (NICE CG173)",
        "Ketamine (NMDA antagonist) prevents wind-up and central sensitisation — useful in opioid-tolerant patients",
        "CRPS diagnosed by Budapest criteria — MDT approach with physiotherapy as cornerstone",
        "Aδ fibres: fast, sharp pain; C fibres: slow, burning pain — both synapse in dorsal horn laminae I, II, V",
      ]} />

      <QuizSection questions={painMedicineQuestions} />
      <ReferencesList topicId="pain-medicine" />

      <SeeAlso topicId="pain-medicine" />
        <TopicCompletionToggle topicId="pain-medicine" topicTitle="Pain Medicine" />
    </SectionLayout>
  );
};

export default PainMedicineTopic;
