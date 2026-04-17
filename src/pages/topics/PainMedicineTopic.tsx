import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { painMedicineQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";
import { DorsalHornSynapseDiagram } from "@/components/diagrams/DorsalHornSynapseDiagram";

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

        <DorsalHornSynapseDiagram />

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
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Clonidine/Dexmedetomidine</td><td>α₂-agonists</td><td>Analgesic, opioid-sparing, anxiolytic. Dexmedetomidine: cooperative sedation without respiratory depression.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">IV Magnesium</td><td>NMDA receptor antagonist, Ca²⁺ channel blocker</td><td>30–50 mg/kg bolus then 6–15 mg/kg/hr. Opioid-sparing (20–25%). Monitor for hypotension, muscle weakness.</td></tr>
                <tr><td className="py-2 font-medium text-foreground">IV Lidocaine</td><td>Na⁺ channel blockade, anti-inflammatory cytokine modulation</td><td>1–1.5 mg/kg bolus then 1–2 mg/kg/hr. Abdominal surgery evidence strongest. Monitor for LAST.</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">IV Magnesium as an Analgesic</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Magnesium is a physiological NMDA receptor antagonist and calcium channel blocker with established analgesic properties when used perioperatively.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Mechanism of Action</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                <li>Voltage-dependent block of NMDA receptor ion channel (Mg²⁺ plug) — prevents glutamate-mediated central sensitisation and wind-up</li>
                <li>L-type and N-type calcium channel antagonism → reduces neurotransmitter release at dorsal horn</li>
                <li>Potentiates opioid receptor binding and reduces tolerance development</li>
                <li>Anti-inflammatory effects: reduces IL-6, TNF-α, and CRP</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Dosing & Monitoring</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                <li><strong className="text-foreground">Bolus:</strong> 30–50 mg/kg IV over 15–30 min at induction</li>
                <li><strong className="text-foreground">Infusion:</strong> 6–15 mg/kg/hr intraoperatively</li>
                <li><strong className="text-foreground">Target serum Mg²⁺:</strong> 2–4 mmol/L (therapeutic range)</li>
                <li><strong className="text-foreground">Monitor:</strong> Deep tendon reflexes, respiratory rate. Risk of hypotension, muscle weakness, prolonged NMBA effect</li>
              </ul>
            </div>
          </div>
          <div className="p-4 rounded-lg border border-border bg-card">
            <p className="font-semibold text-foreground text-sm mb-1">Evidence Summary</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li><strong className="text-foreground">Albrecht et al. (2013) — Cochrane Review:</strong> 25 RCTs (1461 patients). IV MgSO₄ reduced morphine consumption by ~25% at 24h, reduced pain scores at rest and movement, and decreased PONV. No increase in haemodynamic instability.</li>
              <li><strong className="text-foreground">De Oliveira et al. (2013) — Meta-analysis:</strong> Perioperative Mg reduced opioid use (mean 10.5 mg morphine equivalents), reduced pain scores at 4–6h and 24h, and decreased shivering.</li>
              <li><strong className="text-foreground">Murphy et al. (2013):</strong> Demonstrated that Mg potentiates morphine analgesia via attenuation of NMDA-mediated central sensitisation.</li>
              <li>Most consistent benefit in orthopaedic, abdominal, and cardiac surgery. Limited evidence for ambulatory surgery.</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">IV Lidocaine (Lignocaine) as an Analgesic</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Systemic IV lidocaine infusion has emerged as a key component of multimodal, opioid-sparing analgesia, particularly in abdominal surgery where regional anaesthesia is not possible.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Mechanisms of Action</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                <li><strong className="text-foreground">Na⁺ channel blockade:</strong> Blocks voltage-gated sodium channels on peripheral and central neurons, reducing ectopic firing and nociceptive transmission</li>
                <li><strong className="text-foreground">Anti-inflammatory:</strong> Inhibits neutrophil priming, reduces IL-1β, IL-6, TNF-α, and complement activation. Attenuates the surgical inflammatory response</li>
                <li><strong className="text-foreground">NMDA antagonism:</strong> Weak antagonism at NMDA receptors — contributes to anti-hyperalgesic effect</li>
                <li><strong className="text-foreground">Glycinergic:</strong> Potentiates inhibitory glycine receptors in the dorsal horn</li>
                <li><strong className="text-foreground">Prokinetic:</strong> Accelerates return of GI function (anti-ileus effect) — likely via anti-inflammatory mechanism and sympatholysis</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Dosing & Safety</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                <li><strong className="text-foreground">Bolus:</strong> 1–1.5 mg/kg IV over 10 min at induction</li>
                <li><strong className="text-foreground">Infusion:</strong> 1–2 mg/kg/hr intraoperatively (some protocols continue 24–48h post-op at 0.5–1 mg/kg/hr)</li>
                <li><strong className="text-foreground">Therapeutic level:</strong> 2–5 µg/mL (toxic &gt;5 µg/mL)</li>
                <li><strong className="text-foreground">LAST risk:</strong> Perioral tingling → tinnitus → seizures → arrhythmia → cardiac arrest. Treat with Intralipid® 20%</li>
                <li><strong className="text-foreground">Contraindications:</strong> Heart block, severe hepatic impairment, concurrent amiodarone, allergy to amide LAs</li>
              </ul>
            </div>
          </div>
          <div className="p-4 rounded-lg border border-border bg-card">
            <p className="font-semibold text-foreground text-sm mb-1">Evidence Summary</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li><strong className="text-foreground">Weibel et al. (2018) — Cochrane Review:</strong> 68 RCTs (4525 patients). IV lidocaine reduced pain scores at 1–4h (low-certainty evidence), reduced opioid consumption, reduced ileus duration, and shortened hospital stay — primarily in open abdominal surgery.</li>
              <li><strong className="text-foreground">LOLIPOP trial (2024):</strong> Large multicentre RCT (n=562) found no significant benefit of IV lidocaine over placebo for quality of recovery after laparoscopic surgery. Questioned the role in minimally invasive surgery.</li>
              <li><strong className="text-foreground">Vigneault et al. (2011) — Meta-analysis:</strong> Demonstrated significant reductions in pain, opioid consumption, PONV, ileus, and length of stay in abdominal surgery.</li>
              <li><strong className="text-foreground">Consensus:</strong> Strongest evidence in open abdominal surgery. Less convincing for laparoscopic, orthopaedic, or breast surgery. ERAS protocols include IV lidocaine as an option when epidural not feasible.</li>
            </ul>
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
        "Multimodal analgesia reduces opioid consumption and improves outcomes — use paracetamol, NSAIDs, gabapentinoids, ketamine, magnesium, IV lidocaine",
        "IV magnesium (NMDA antagonist) reduces opioid consumption by ~25% (Cochrane 2013) — bolus 30–50 mg/kg then 6–15 mg/kg/hr",
        "IV lidocaine strongest evidence in open abdominal surgery — anti-inflammatory, prokinetic, opioid-sparing. LOLIPOP trial questioned benefit in laparoscopic surgery",
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
