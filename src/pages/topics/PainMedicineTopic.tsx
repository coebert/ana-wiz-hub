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
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Chronic Pain — General Principles</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Chronic pain is defined (IASP / ICD-11, 2019) as pain that persists or recurs for &gt;3 months. It is now formally recognised as a <strong>disease in its own right</strong> when it cannot be better explained by another condition (chronic primary pain) — encompassing fibromyalgia, chronic primary low back pain, primary headaches and CRPS. The dominant biological substrate is <strong>central sensitisation / nociplastic pain</strong>: amplified central nervous system processing without ongoing tissue or nerve damage. Genetic predisposition, adverse childhood experiences, sleep disruption, mood disorder and autonomic dysregulation all contribute.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Modern guidance (<strong>NICE NG193, 2021</strong>) marks a deliberate shift away from pharmacological and procedural management of chronic primary pain toward <strong>supported self-management, exercise, psychological therapy and acupuncture</strong>. Notably, paracetamol, NSAIDs, opioids, gabapentinoids and benzodiazepines are <em>not</em> recommended for chronic primary pain (excluding established neuropathic pain, which still follows NICE CG173). Antidepressants (amitriptyline, citalopram, duloxetine, fluoxetine, paroxetine, sertraline) <em>can</em> be considered.
          </p>
          <div className="p-4 rounded-lg border-l-4 border-clinical bg-secondary/30">
            <p className="font-semibold text-foreground text-sm mb-1">Biopsychosocial model — the modern formulation</p>
            <p className="text-sm text-muted-foreground">
              Pain experience = biological inputs (peripheral &amp; central nociception, inflammation, autonomic) × psychological factors (catastrophising, fear-avoidance, depression, PTSD) × social context (work, relationships, deprivation, healthcare access). Treating any single domain in isolation typically fails — hence the central role of multidisciplinary teams.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Specialised Multidisciplinary Pain Teams</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            UK chronic-pain services are organised in tiers per the <strong>British Pain Society / FPM Core Standards (2021)</strong> and the <strong>NHS Long Term Plan</strong>. Specialised pain MDTs offer the best functional outcomes for complex, refractory or high-impact chronic pain.
          </p>
          <div className="overflow-x-auto mb-3">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Tier</th>
                  <th className="text-left py-2 text-foreground font-semibold">Setting</th>
                  <th className="text-left py-2 text-foreground font-semibold">Role</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border align-top"><td className="py-2 font-medium text-foreground">1 — Self-management</td><td>Community / online</td><td>Patient education, exercise apps, peer-support, NHS "Live Well with Pain" resources.</td></tr>
                <tr className="border-b border-border align-top"><td className="py-2 font-medium text-foreground">2 — Primary care</td><td>GP, practice physio, social prescriber</td><td>Initial assessment, NICE NG193 / CG173 first-line management, screening for red/yellow flags.</td></tr>
                <tr className="border-b border-border align-top"><td className="py-2 font-medium text-foreground">3 — Community pain MDT</td><td>Pain physician/GPwER, physio, psychologist</td><td>Pain Management Programmes (PMPs), assessment for tier-4 referral.</td></tr>
                <tr className="border-b border-border align-top"><td className="py-2 font-medium text-foreground">4 — Specialist hospital MDT</td><td>Tertiary pain centre</td><td>Complex/refractory pain, interventional procedures (radiofrequency, neuromodulation, intrathecal pumps), opioid stewardship clinics.</td></tr>
                <tr><td className="py-2 font-medium text-foreground">5 — Highly specialised</td><td>Supraregional commissioned centre (NHS England SCS service)</td><td>Spinal cord stimulation, intrathecal drug delivery, paediatric chronic pain, complex CRPS, post-amputation pain.</td></tr>
              </tbody>
            </table>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Core MDT membership</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li><strong>Pain physician(s)</strong> (consultant anaesthetist with FPM accreditation, ± neurologist, ± rheumatologist)</li>
                <li><strong>Clinical psychologist</strong> trained in CBT / ACT for pain</li>
                <li><strong>Specialist physiotherapist</strong> (graded activity, pacing, desensitisation)</li>
                <li><strong>Occupational therapist</strong> (functional adaptation, vocational rehab)</li>
                <li><strong>Specialist pain nurse</strong> (medication review, opioid taper, self-management coaching)</li>
                <li><strong>Pharmacist</strong> (deprescribing, complex polypharmacy)</li>
                <li>Liaison psychiatry, social worker, peer-support worker as required</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Pain Management Programmes (PMPs)</p>
              <p className="text-sm text-muted-foreground mt-1">
                Group-based, intensive (typically 8 × half-day or 5 × full-day) programmes combining CBT/ACT, paced exercise, education and goal-setting. <strong>Strongest evidence base of any chronic-pain intervention</strong> — Cochrane 2012 (Williams) and subsequent reviews show medium-effect-size improvements in disability, mood and self-efficacy that <em>persist at 12 months</em>, even where pain intensity itself changes little. The aim is restored function, not abolition of pain.
              </p>
            </div>
          </div>
          <div className="p-4 rounded-lg border-l-4 border-destructive bg-destructive/5 mt-3">
            <p className="font-semibold text-foreground text-sm">Opioid stewardship</p>
            <p className="text-sm text-muted-foreground mt-1">
              The <strong>FPM "Opioids Aware"</strong> resource and the <strong>Royal College "Painkillers Don't Exist"</strong> campaign emphasise that long-term opioids are rarely effective for chronic non-cancer pain and carry harms (hyperalgesia, hormonal suppression, falls, dependence). Specialist MDTs increasingly run dedicated opioid-tapering clinics; doses &gt;120 mg oral morphine equivalents per day rarely confer additional benefit and should prompt review.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Fibromyalgia</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Prevalence ~2–4%, F:M ~3:1. Now diagnosed using the <strong>2016 revised ACR criteria</strong>: Widespread Pain Index (WPI) ≥7 + Symptom Severity Score (SSS) ≥5 (or WPI 4–6 + SSS ≥9) for ≥3 months, with no condition that better explains the pain. The original 1990 tender-point criteria are obsolete.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Mechanism — current evidence</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li><strong>Nociplastic pain</strong> — augmented central pain processing (functional MRI shows enhanced activation of insula, S1/S2, ACC; reduced descending inhibition from PAG/RVM).</li>
                <li>Elevated <strong>substance P</strong> and <strong>glutamate</strong> in CSF; reduced serotonin, noradrenaline and dopamine signalling.</li>
                <li>Evidence of <strong>small-fibre neuropathy</strong> on skin biopsy in ~40% (Üçeyler 2013) — challenges the purely "central" view.</li>
                <li>Strong genetic component (heritability ~50%); polymorphisms in catecholamine and serotonin transporter genes.</li>
                <li>Frequent comorbidities: IBS, migraine, restless legs, depression, anxiety, sleep disorder.</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Best-evidenced management (EULAR 2016)</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li><strong>Aerobic + strengthening exercise</strong> — strongest single evidence (Cochrane Bidonde 2017). Graded, low-impact (swimming, cycling, tai chi).</li>
                <li><strong>CBT / ACT</strong> — improves function and mood; effect persists at 12 months.</li>
                <li><strong>Multicomponent rehabilitation</strong> (PMP) — recommended for refractory cases.</li>
                <li><strong>Pharmacological (selected patients):</strong> amitriptyline 10–50 mg ON, duloxetine 60 mg OD, pregabalin 150–450 mg/day, low-dose naltrexone (emerging — Younger 2013).</li>
                <li><strong>Avoid:</strong> NSAIDs (ineffective), opioids (worsen central sensitisation, FDA black-box for tramadol misuse), corticosteroids.</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Myalgic Encephalomyelitis / Chronic Fatigue Syndrome (ME/CFS)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Diagnosed clinically (<strong>NICE NG206, 2021</strong>; IOM 2015 criteria) by ≥3 months of <strong>debilitating fatigue + post-exertional malaise (PEM) + unrefreshing sleep + cognitive dysfunction or orthostatic intolerance</strong>, after exclusion of alternative diagnoses. Often follows a viral illness; long-COVID overlaps clinically and may share mechanisms.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Mechanism — current evidence</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li><strong>Mitochondrial / bioenergetic dysfunction</strong> — impaired oxidative phosphorylation, abnormal lactate kinetics on repeat CPET (Snell 2013, Davenport 2019).</li>
                <li><strong>Neuroinflammation</strong> — PET imaging shows microglial activation in cingulate, thalamus and midbrain (Nakatomi 2014).</li>
                <li><strong>Autonomic dysregulation</strong> — high prevalence of POTS / orthostatic intolerance.</li>
                <li><strong>Immune dysregulation</strong> — altered NK-cell function, persistent cytokine signatures (IL-1β, IL-6, TNF-α).</li>
                <li><strong>HPA-axis hypofunction</strong> — mild hypocortisolism in many patients.</li>
                <li>Long-COVID has revitalised mechanistic research; significant overlap suggests shared post-viral pathophysiology.</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Management (NICE NG206)</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li><strong>Energy management ("pacing")</strong> within an individual energy envelope is the cornerstone — <em>not</em> graded exercise therapy (GET), which NG206 explicitly removed after the PACE trial controversies and patient harm reports.</li>
                <li>CBT may be offered to <strong>support coping</strong>, but is no longer presented as curative.</li>
                <li>Symptom-targeted treatment: sleep hygiene, low-dose amitriptyline for pain/sleep, postural management for POTS (compression, salt, fludrocortisone).</li>
                <li>Avoid: prescribed exercise programmes, "psychogenic" framing, dismissing PEM.</li>
                <li><strong>Anaesthetic implications:</strong> heightened sensitivity to opioids and sedatives; risk of post-operative crash; plan day-case carefully; consider regional anaesthesia; warn re: prolonged recovery.</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Complex Regional Pain Syndrome (CRPS)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Disabling regional pain syndrome typically following a (often minor) limb injury or surgery. <strong>CRPS-I</strong> = no identifiable nerve lesion (~90%); <strong>CRPS-II</strong> = following identifiable peripheral nerve injury. Female:male ~3–4:1, peak 40–60 yr. Diagnosed clinically using the <strong>Budapest criteria (Harden 2010, IASP-endorsed)</strong>:
          </p>
          <div className="p-4 rounded-lg bg-secondary/30 border border-border mb-3">
            <p className="font-semibold text-foreground text-sm mb-1">Budapest criteria — all four must be met</p>
            <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
              <li>Continuing pain disproportionate to any inciting event.</li>
              <li><strong>Symptoms</strong> reported in ≥3 of 4 categories: sensory (hyperalgesia, allodynia); vasomotor (temperature/skin colour asymmetry); sudomotor/oedema (sweating, swelling); motor/trophic (weakness, tremor, dystonia, hair/nail/skin changes).</li>
              <li><strong>Signs</strong> at examination in ≥2 of the same 4 categories.</li>
              <li>No alternative diagnosis better explains the signs and symptoms.</li>
            </ol>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Mechanisms — current understanding</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li><strong>Peripheral:</strong> neurogenic inflammation (substance P, CGRP, bradykinin), small-fibre denervation, microvascular dysfunction.</li>
                <li><strong>Autonomic:</strong> early sympathetic dysregulation → vasomotor/sudomotor changes; later sympatho-adrenergic receptor up-regulation.</li>
                <li><strong>Central:</strong> cortical reorganisation (shrinkage of S1 representation of affected limb — Maihöfner 2003), central sensitisation, altered body schema.</li>
                <li><strong>Immune:</strong> auto-antibodies against β2-adrenergic and M2 muscarinic receptors (Goebel 2011) — basis for IVIG trials.</li>
                <li><strong>Genetic:</strong> HLA associations; family clustering reported.</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Best-evidenced management (RCP / BPS 2018; Goebel 2018)</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li><strong>Early MDT referral &amp; rehabilitation is the single most important intervention</strong> — outcomes are time-critical (better if treated &lt;6 months).</li>
                <li><strong>Physiotherapy:</strong> graded motor imagery (laterality recognition → imagined movement → mirror therapy — Moseley 2004), desensitisation, functional restoration.</li>
                <li><strong>Psychology:</strong> CBT, ACT, addressing fear-avoidance and kinesiophobia.</li>
                <li><strong>Pharmacology:</strong> neuropathic agents (amitriptyline, duloxetine, gabapentinoids); short course of oral steroids in early/inflammatory phase (Christensen 1982); bisphosphonates (zoledronate / pamidronate — Varenna 2013) have RCT support in early CRPS with bone marrow oedema.</li>
                <li><strong>Interventional (selected, refractory):</strong> sympathetic blocks (limited evidence — Cochrane O'Connell 2016 found no significant effect); <strong>spinal cord stimulation</strong> NICE TA159 — best-evidenced interventional therapy, sustained benefit at 5 yr (Kemler 2008); ketamine infusion; intrathecal baclofen for CRPS dystonia.</li>
                <li><strong>Prevention:</strong> Vitamin C 500 mg/day for 50 days post wrist fracture reduces CRPS incidence (Zollinger 2007; meta-analysis Aïm 2017) — recommended by RCP guideline.</li>
                <li><strong>Avoid:</strong> immobilisation, repeat surgery on the affected limb, opioid escalation.</li>
              </ul>
            </div>
          </div>
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
