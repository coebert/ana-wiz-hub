import { Helmet } from "react-helmet-async";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";

import { WorkedExample } from "@/components/topic/WorkedExamples";
import { painMedicineQuestions } from "@/data/quizzes";
import { DorsalHornSynapseDiagram } from "@/components/diagrams/DorsalHornSynapseDiagram";
import { DiagramSection } from "@/components/topic/DiagramSection";
import { PainMechanismsDiagram } from "@/components/diagrams/PainMechanismsDiagram";
import OpioidConversionCalculator from "@/components/diagrams/OpioidConversionCalculator";
import PcaEpiduralCalculator from "@/components/diagrams/PcaEpiduralCalculator";
import { SpinalCordStimulatorDiagram } from "@/components/diagrams/SpinalCordStimulatorDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";

const objectives = [
  "Distinguish nociceptive, neuropathic and nociplastic pain mechanisms and tailor pharmacotherapy accordingly",
  "Build a multimodal opioid-sparing analgesic plan (paracetamol, NSAID, gabapentinoids, ketamine, IV Mg, IV lidocaine)",
  "Apply NICE NG193 (chronic primary pain) and CG173 (neuropathic pain) recommendations",
  "Manage CRPS using Budapest criteria with early MDT, graded motor imagery and SCS where indicated",
  "Perform safe opioid rotation using OMEDD with a 25–50% dose reduction for incomplete cross-tolerance",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Opioid rotation — oral morphine to subcutaneous diamorphine",
    scenario:
      "A palliative cancer patient on oral morphine 60 mg modified-release BD develops persistent vomiting and is no longer absorbing oral medication. Calculate an equivalent 24-h subcutaneous diamorphine infusion via syringe driver.",
    working:
      "Total oral morphine = 120 mg/24 h.\nOral morphine : SC morphine = 2 : 1 → SC morphine = 60 mg/24 h.\nSC morphine : SC diamorphine ≈ 3 : 1 → SC diamorphine = 20 mg/24 h.\nReduce by 25–33% for incomplete cross-tolerance and to allow titration → start ~15 mg SC diamorphine over 24 h via syringe driver.\nPrescribe rescue: SC diamorphine 2.5 mg PRN q1h (≈1/6 of 24-h dose).",
    answer:
      "Start SC diamorphine ~15 mg over 24 h with rescue SC diamorphine 2.5 mg PRN q1h, and review after 24 h.",
    cites: ["Faculty of Pain Medicine"],
  },
  {
    title: "Acute neuropathic pain after thoracotomy",
    scenario:
      "Two weeks after a thoracotomy, a patient describes persistent burning, allodynia and electric-shock pains in the scar — typical of neuropathic post-thoracotomy pain. What is your first-line management plan?",
    working:
      "Confirm neuropathic features (DN4 / S-LANCSS) — burning, shooting, allodynia, hyperalgesia in dermatomal distribution.\nApply NICE CG173: first-line monotherapy from amitriptyline, duloxetine, gabapentin or pregabalin (chosen for comorbidity / interaction profile).\nStart amitriptyline 10 mg ON, titrate to 25–75 mg ON; OR pregabalin 75 mg BD titrated to 150–300 mg BD.\nMaintain multimodal analgesia (paracetamol + NSAID if no contraindication); add topical 5% lidocaine patch for focal allodynia.\nReview at 4–6 weeks; if inadequate, switch to a different first-line agent before combining; refer to chronic pain MDT if persistent.",
    answer:
      "Start a NICE first-line agent (e.g. amitriptyline 10 mg ON titrated, or pregabalin 75 mg BD titrated), continue multimodal analgesia, add topical 5% lidocaine for focal allodynia, and refer to the pain MDT if not improving at 4–6 weeks.",
    cites: ["IASP 2020"],
  },
];


const tocItems = [
  { id: "pathways", label: "Pain Pathways & Classification", group: "Core" },
  { id: "multimodal", label: "Multimodal Analgesia", group: "Core" },
  { id: "magnesium", label: "IV Magnesium", group: "Adjuncts" },
  { id: "lidocaine", label: "IV Lidocaine", group: "Adjuncts" },
  { id: "neuropathic", label: "Neuropathic Pain", group: "Chronic" },
  { id: "chronic", label: "Chronic Pain Principles", group: "Chronic" },
  { id: "specialised-mdt", label: "Specialised Pain MDT", group: "Chronic" },
  { id: "fibromyalgia", label: "Fibromyalgia", group: "Chronic" },
  { id: "mecfs", label: "ME/CFS", group: "Chronic" },
  { id: "crps", label: "CRPS", group: "Chronic" },
  { id: "cancer", label: "Cancer Pain", group: "Cancer" },
  { id: "scs", label: "Spinal Cord Stimulation", group: "Interventional" },
  { id: "nerve-root", label: "Nerve Root Injections", group: "Interventional" },
  { id: "faq", label: "FAQ", group: "Reference" },
];

const painFaqs: Array<[string, string]> = [
  [
    "What is the difference between nociceptive, neuropathic and nociplastic pain?",
    "Nociceptive pain arises from actual or threatened tissue damage — it is the normal physiological response to noxious stimuli (somatic or visceral). Neuropathic pain is caused by a lesion or disease of the somatosensory nervous system — it features burning, shooting, allodynia and hyperalgesia. Nociplastic pain arises from altered nociception despite no clear tissue damage or nerve lesion — the hallmark is central sensitisation, where the CNS amplifies pain signals. Fibromyalgia, chronic primary low back pain and irritable bowel syndrome are classic nociplastic conditions. The distinction matters because drugs that work for one type may be ineffective or harmful for another — for example, NSAIDs and opioids are generally ineffective for nociplastic pain, whereas amitriptyline, duloxetine and graded exercise can help.",
  ],
  [
    "What does NICE NG193 recommend for chronic primary pain?",
    "NICE NG193 (2021) recommends a deliberate shift away from pharmacological management of chronic primary pain. Paracetamol, NSAIDs, opioids, gabapentinoids and benzodiazepines are explicitly NOT recommended. Instead, offer: (1) supervised group exercise programmes, (2) cognitive behavioural therapy (CBT) or acceptance and commitment therapy (ACT), (3) acupuncture, and (4) certain antidepressants (amitriptyline, citalopram, duloxetine, fluoxetine, paroxetine, sertraline) as a single option if exercise and psychological therapy are insufficient. The guideline reflects evidence that long-term drugs provide minimal benefit and substantial harm in chronic primary pain, whereas exercise and psychological therapy improve function and quality of life.",
  ],
  [
    "How does IV magnesium work as an analgesic?",
    "Magnesium is a physiological NMDA receptor antagonist and calcium channel blocker. It prevents glutamate-mediated central sensitisation and wind-up in the dorsal horn, potentiates opioid receptor binding, and has anti-inflammatory effects (reduces IL-6, TNF-α and CRP). Dosing: 30–50 mg/kg IV bolus over 15–30 min at induction, then 6–15 mg/kg/hr intraoperatively. The Albrecht 2013 Cochrane review of 25 RCTs found IV magnesium reduced 24-hour morphine consumption by ~25% and decreased PONV without increasing haemodynamic instability. Monitor deep tendon reflexes and respiratory rate — high serum magnesium can cause hypotension, muscle weakness and prolonged neuromuscular blockade.",
  ],
  [
    "What is the evidence for IV lidocaine in perioperative analgesia?",
    "IV lidocaine blocks voltage-gated sodium channels, inhibits pro-inflammatory cytokines, and has weak NMDA antagonism and glycinergic potentiation. The Weibel 2018 Cochrane review (68 RCTs, 4,525 patients) found IV lidocaine reduced opioid consumption, PONV, ileus duration and hospital length of stay — but primarily in open abdominal surgery. The LOLIPOP trial (2024), a large multicentre RCT in laparoscopic surgery, found no significant benefit over placebo. The consensus is that IV lidocaine has strongest evidence in open abdominal and colorectal surgery (where ERAS protocols include it when epidural is not feasible), but its role in minimally invasive surgery is less convincing. Dosing: 1–1.5 mg/kg bolus then 1–2 mg/kg/hr infusion.",
  ],
  [
    "What are the Budapest criteria for CRPS?",
    "The Budapest criteria (Harden 2010, IASP-endorsed) require all four to be met: (1) Continuing pain disproportionate to the inciting event; (2) Symptoms reported in at least 3 of 4 categories: sensory (hyperalgesia, allodynia), vasomotor (temperature/skin colour asymmetry), sudomotor/oedema (sweating, swelling), and motor/trophic (weakness, tremor, dystonia, hair/nail/skin changes); (3) Signs at examination in at least 2 of the same 4 categories; (4) No alternative diagnosis better explains the signs and symptoms. The criteria distinguish CRPS-I (no identifiable nerve lesion, ~90%) from CRPS-II (following identifiable nerve injury). Early MDT rehabilitation within 6 months of onset is the single most important predictor of good outcome.",
  ],
  [
    "What is the modern approach to the WHO analgesic ladder for cancer pain?",
    "The 2018 WHO cancer pain guideline moved away from rigid stepwise progression. Step 2 (weak opioids like codeine and tramadol) is increasingly skipped because these drugs have ceiling effects and poor tolerability. Instead, start low-dose strong opioids (e.g., morphine 5 mg q4h) for moderate–severe pain from the outset. A fourth 'interventional' step has been proposed for refractory pain — coeliac plexus neurolysis, intrathecal drug delivery, and spinal cord stimulation. Adjuvants are essential and mechanism-based: NSAIDs + bisphosphonates for bone pain, gabapentinoids/TCAs/SNRIs for neuropathic pain, and steroids for inflammatory pain. Breakthrough pain is managed with rescue doses equal to 1/6 to 1/10 of the 24-hour oral morphine equivalent.",
  ],
  [
    "How is safe opioid rotation performed?",
    "Opioid rotation is indicated when analgesia is inadequate, side effects are intolerable, or renal impairment requires a safer agent. Steps: (1) Calculate the 24-hour oral morphine equivalent dose (OMEDD); (2) Convert to the equianalgesic dose of the new opioid using a standard table; (3) Reduce by 25–50% for incomplete cross-tolerance (50% if elderly, frail, or renal/hepatic impairment); (4) Provide rescue doses at 1/6 of the new 24-hour dose; (5) Titrate over 2–3 days. Key ratios: oral morphine 30 mg ≈ oral oxycodone 15–20 mg ≈ oral hydromorphone 4–6 mg. Transdermal fentanyl 25 µg/hr ≈ 60–90 mg oral morphine/day. Methadone has a variable ratio (5–15×) and long unpredictable half-life — specialist initiation only.",
  ],
  [
    "What is spinal cord stimulation and when is it indicated?",
    "Spinal cord stimulation (SCS) delivers low-voltage electrical pulses to the dorsal columns via an epidural electrode array, modulating pain transmission per the gate control theory. NICE TA159 recommends SCS for chronic neuropathic pain >6 months despite conventional therapy, after a successful percutaneous trial (>50% pain reduction and functional gain). Strongest evidence exists for failed back surgery syndrome with radicular leg pain (PROCESS trial), CRPS (Kemler NEJM 2000), and painful diabetic neuropathy (SENZA-PDN). Newer waveforms include 10 kHz high-frequency, burst, and closed-loop ECAP-controlled systems. Mandatory psychology assessment and a successful trial are prerequisites before permanent implantation.",
  ],
  [
    "What are the key safety principles for nerve root injections?",
    "Nerve root (transforaminal epidural steroid) injections must be performed with real-time fluoroscopy and iodinated contrast — blind injection is no longer acceptable. Use non-particulate steroid (dexamethasone) for all cervical and thoracic injections, and consider it for lumbar too, because particulate steroids (methylprednisolone, triamcinolone) can embolise into radiculomedullary arteries causing spinal cord infarction. The patient should be awake or only lightly sedated — deep sedation masks intravascular or intrathecal injection. Stop antiplatelets and anticoagulants per ASRA neuraxial guidance. Always confirm contrast spread excludes vascular uptake (rapid washout) and intrathecal spread (myelogram pattern). Keep resuscitation drugs and Intralipid 20% immediately available for local anaesthetic systemic toxicity.",
  ],
  [
    "What are the anaesthetic considerations for spinal cord stimulation implantation?",
    "SCS trial and percutaneous lead placement are typically performed under local anaesthesia with conscious sedation, because intra-operative paraesthesia mapping requires a cooperative, communicating patient. The IPG pocket and tunnelling may be done under deeper sedation or short GA after lead position is confirmed. Key points: prone position with chest/pelvis bolsters; full AAGBI monitoring plus capnography (sedated prone patients are high-risk for airway obstruction); supplemental O₂ via nasal specs. Target-controlled propofol Ce 0.8–1.5 µg/mL ± remifentanil, or dexmedetomidine 0.2–0.6 µg/kg/hr (preserves cooperation, no respiratory depression). Avoid opioid or benzodiazepine boluses during paraesthesia mapping. Prophylactic IV antibiotics within 60 minutes. Post-op: watch for new neurological deficit (epidural haematoma — urgent MRI within 8 hours), restrict trunk flexion/lifting for 6 weeks to prevent lead migration, and ensure the patient has a device wallet card.",
  ],
];

const PainMedicineTopic = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: painFaqs.map(([name, acceptedAnswer]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text: acceptedAnswer },
    })),
  };

  return (
    <>
      <Helmet>
        <title>Pain Medicine: Multimodal, Neuropathic & Cancer | FRCA</title>
        <meta name="description" content="FRCA Final & FFICM pain medicine: acute and chronic pain mechanisms, multimodal analgesia, neuropathic pain guidelines, CRPS, cancer pain, opioid rotation, SCS, and interventional techniques." />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <TopicTemplate
      title="Pain Medicine"
      subtitle="FRCA / FFICM — Clinical Anaesthesia"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
      topicId="pain-medicine"
      topicTitle="Pain Medicine"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={painMedicineQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["RCoA Final — Clinical Anaesthesia"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: [
          "BJA Educ 2018",
          "IASP 2020",
          "Faculty of Pain Medicine",
          "NICE NG193",
          "NICE CG173",
          "NICE TA159",
        ],
        keyPoints: [
          "BJA Educ 2018",
          "IASP 2020",
          "Faculty of Pain Medicine",
          "NICE NG193",
          "NICE CG173",
          "NICE TA159",
          "Weibel 2018",
          "LOLIPOP 2024",
          "Albrecht 2013",
          "Wong 2004",
          "Smith 2002",
          "Temel 2010",
        ],
        workedExamples: ["Faculty of Pain Medicine", "IASP 2020", "NICE CG173"],
      }}
      keyPoints={[
        { text: "Multimodal analgesia reduces opioid consumption — paracetamol, NSAIDs, gabapentinoids, ketamine, magnesium, IV lidocaine", cites: ["BJA Educ 2018"] },
        { text: "IV magnesium reduces 24-h opioid use ~25% (Albrecht 2013); IV lidocaine — strongest evidence in open abdominal surgery (Weibel 2018), LOLIPOP 2024 questioned benefit in laparoscopic surgery", cites: ["Albrecht 2013", "Weibel 2018", "LOLIPOP 2024"] },
        { text: "Neuropathic pain first-line: amitriptyline, duloxetine, pregabalin or gabapentin (NICE CG173)", cites: ["NICE CG173"] },
        { text: "NICE NG193 (2021): chronic primary pain — do NOT offer paracetamol, NSAIDs, opioids, gabapentinoids; offer exercise, CBT/ACT, acupuncture, certain antidepressants", cites: ["NICE NG193"] },
        { text: "Specialist pain MDT (physician, psychologist, physio, OT, nurse, pharmacist) + Pain Management Programmes — strongest evidence base for restored function", cites: ["Faculty of Pain Medicine"] },
        { text: "Fibromyalgia (ACR 2016): nociplastic central sensitisation; aerobic exercise + CBT + duloxetine/amitriptyline (EULAR 2016); avoid opioids and NSAIDs", cites: ["IASP 2020"] },
        { text: "ME/CFS (NICE NG206, 2021): pacing within energy envelope, NOT graded exercise therapy; PEM is the cardinal feature", cites: ["BJA Educ 2018"] },
        { text: "CRPS — Budapest criteria; early MDT and graded motor imagery / mirror therapy; SCS (NICE TA159) for refractory; vitamin C 500 mg × 50 days post wrist # for prevention", cites: ["NICE TA159", "Faculty of Pain Medicine"] },
        { text: "Cancer pain WHO ladder revisited (2018) — skip step 2, start low-dose strong opioid; consider 4th 'interventional' step; mechanism-based adjuvants are essential", cites: ["IASP 2020"] },
        { text: "Opioid rotation: calculate 24-h OMEDD, convert, reduce 25–50% for incomplete cross-tolerance; methadone is specialist-only", cites: ["Faculty of Pain Medicine", "BJA Educ 2018"] },
        { text: "Coeliac plexus neurolysis — first-line interventional for pancreatic cancer pain (Wong 2004); EUS-guided increasingly preferred; risk of paraplegia from artery of Adamkiewicz", cites: ["Wong 2004", "Faculty of Pain Medicine"] },
        { text: "Intrathecal pumps: oral : IV : epidural : intrathecal morphine ≈ 300 : 100 : 10 : 1; Smith 2002 showed survival benefit in refractory cancer pain", cites: ["Smith 2002"] },
        { text: "Early palliative care MDT (Temel NEJM 2010) improves QoL and survival; addresses Cicely Saunders' 'total pain'", cites: ["Temel 2010"] },
      ]}
      coreConcepts={
        <ExamSection exams={[Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
        <TopicTableOfContents items={tocItems} />
        <section className="space-y-6">
        <div id="pathways" className="scroll-mt-24">
        <CollapsibleSubsection title="Pain Pathways & Classification" defaultOpen>
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
        </CollapsibleSubsection>
        </div>

        <DorsalHornSynapseDiagram />

        <div id="multimodal" className="scroll-mt-24">
        <CollapsibleSubsection title="Multimodal Analgesia (WHO Ladder & Beyond)">
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
        </CollapsibleSubsection>
        </div>

        <div id="magnesium" className="scroll-mt-24">
        <CollapsibleSubsection title="IV Magnesium as an Analgesic">
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
        </CollapsibleSubsection>
        </div>

        <div id="lidocaine" className="scroll-mt-24">
        <CollapsibleSubsection title="IV Lidocaine (Lignocaine) as an Analgesic">
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
        </CollapsibleSubsection>
        </div>

        <div id="neuropathic" className="scroll-mt-24">
        <CollapsibleSubsection title="Neuropathic Pain Management">
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
        </CollapsibleSubsection>
        </div>

        <div id="chronic" className="scroll-mt-24">
        <CollapsibleSubsection title="Chronic Pain — General Principles">
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
        </CollapsibleSubsection>
        </div>

        <DiagramSection
          title="Nociceptive vs Neuropathic vs Nociplastic — Mechanism Comparison"
          intro={
            <p>
              Modern pain medicine recognises three distinct mechanism categories (IASP). The lesion site, signalling biology, exemplar conditions and the drugs that work — or do harm — are different for each. Click a mechanism to see the lesion site light up on the pathway above and the targeted treatment vs low-value options.
            </p>
          }
        >
          <PainMechanismsDiagram />
        </DiagramSection>

        <div id="specialised-mdt" className="scroll-mt-24">
        <CollapsibleSubsection title="Specialised Multidisciplinary Pain Teams">
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
        </CollapsibleSubsection>
        </div>

        <div id="fibromyalgia" className="scroll-mt-24">
        <CollapsibleSubsection title="Fibromyalgia">
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
        </CollapsibleSubsection>
        </div>

        <div id="mecfs" className="scroll-mt-24">
        <CollapsibleSubsection title="Myalgic Encephalomyelitis / Chronic Fatigue Syndrome (ME/CFS)">
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
        </CollapsibleSubsection>
        </div>

        <div id="crps" className="scroll-mt-24">
        <CollapsibleSubsection title="Complex Regional Pain Syndrome (CRPS)">
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
        </CollapsibleSubsection>
        </div>

        <div id="cancer" className="scroll-mt-24">
        <CollapsibleSubsection title="Cancer Pain Management">
          <p className="text-muted-foreground leading-relaxed mb-3">
            Pain affects ~55% of patients during cancer treatment and ~66% of those with advanced disease (van den Beuken-van Everdingen, 2016). Despite decades of guidance it remains <strong>under-treated in around one-third</strong> of patients (the "pain treatment gap"). Modern cancer pain care is mechanism-based, multimodal, integrated with oncology and palliative care, and increasingly involves interventional techniques alongside opioids.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">WHO Analgesic Ladder — Revisited (2018 update)</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The original 1986 three-step ladder remains a useful teaching framework but has been substantially refined. The <strong>WHO 2018 cancer-pain guideline</strong> moved away from the rigid stepwise progression in favour of <em>tailoring opioid choice and route to pain severity and mechanism from the outset</em>. Key updates:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Original 3-step ladder (1986)</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li><strong>Step 1:</strong> Non-opioid (paracetamol, NSAID) ± adjuvant</li>
                <li><strong>Step 2:</strong> Weak opioid (codeine, tramadol) ± non-opioid ± adjuvant</li>
                <li><strong>Step 3:</strong> Strong opioid (morphine) ± non-opioid ± adjuvant</li>
                <li>By the clock, by the mouth, by the ladder, for the individual, attention to detail</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Modern modifications</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Step 2 increasingly skipped — start <strong>low-dose strong opioid</strong> (morphine 5 mg q4h) for moderate–severe pain (better titration, fewer ceiling effects).</li>
                <li><strong>4th step</strong> proposed: interventional techniques (neuraxial, neurolytic blocks, intrathecal delivery, neuromodulation) for refractory pain.</li>
                <li>Adjuvants are <em>not optional add-ons</em> — they're the cornerstone for neuropathic and bone pain.</li>
                <li>Mechanism-based selection: bone (NSAID + bisphosphonate ± radiotherapy), neuropathic (gabapentinoid/TCA/SNRI), visceral (opioid + antispasmodic), inflammatory (steroid).</li>
              </ul>
            </div>
          </div>
          <div className="p-4 rounded-lg border-l-4 border-clinical bg-secondary/30 mb-3">
            <p className="font-semibold text-foreground text-sm mb-1">Breakthrough cancer pain (BTcP)</p>
            <p className="text-sm text-muted-foreground">
              Defined as a transient exacerbation of pain on a background of otherwise controlled chronic pain. Affects ~60% of cancer-pain patients. Manage with a <strong>rescue dose = 1/6 to 1/10 of the 24-h oral morphine equivalent</strong> (immediate-release oral morphine, oxycodone IR or, for incident/predictable pain with rapid onset, <strong>transmucosal/intranasal fentanyl</strong>). If &gt;3–4 rescue doses/day are needed, increase the background dose by ~30–50%.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-5 mb-2">Opioid Rotation (Switching)</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Indicated when (1) analgesia is inadequate despite dose escalation, (2) intolerable side effects (sedation, hallucinations, myoclonus, constipation, hyperalgesia), (3) tolerance, or (4) renal impairment requiring a safer opioid. The basis is <strong>incomplete cross-tolerance</strong> between opioids — different μ-receptor binding, intracellular signalling and active metabolites mean a different opioid often achieves analgesia at a lower equianalgesic dose with a better side-effect profile.
          </p>
          <div className="overflow-x-auto mb-3">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Opioid</th>
                  <th className="text-left py-2 text-foreground font-semibold">Equianalgesic ratio (oral morphine = 1)</th>
                  <th className="text-left py-2 text-foreground font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border align-top"><td className="py-2 font-medium text-foreground">Oral morphine</td><td>1 (reference)</td><td>Active metabolites M3G (neurotoxic) and M6G (analgesic) accumulate in renal failure.</td></tr>
                <tr className="border-b border-border align-top"><td className="py-2 font-medium text-foreground">Oral oxycodone</td><td>~1.5–2× more potent</td><td>30 mg morphine ≈ 15–20 mg oxycodone. Less histamine release; partial CYP2D6 metabolism.</td></tr>
                <tr className="border-b border-border align-top"><td className="py-2 font-medium text-foreground">Oral hydromorphone</td><td>~5–7× more potent</td><td>Useful in renal impairment; smaller volumes for SC infusion.</td></tr>
                <tr className="border-b border-border align-top"><td className="py-2 font-medium text-foreground">Transdermal fentanyl</td><td>25 µg/h ≈ 60–90 mg oral morphine/day</td><td>Useful for stable pain, dysphagia, bowel obstruction, renal failure. NOT for opioid-naïve or unstable pain.</td></tr>
                <tr className="border-b border-border align-top"><td className="py-2 font-medium text-foreground">Transdermal buprenorphine</td><td>5 µg/h ≈ ~10–15 mg oral morphine/day</td><td>Partial agonist with high receptor affinity; safe in renal impairment; ceiling for respiratory depression.</td></tr>
                <tr className="border-b border-border align-top"><td className="py-2 font-medium text-foreground">SC morphine</td><td>2× oral morphine</td><td>Common in palliative syringe drivers (with anti-emetic ± hyoscine).</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Methadone</td><td>Variable (5–15× depending on dose)</td><td>NMDA antagonism, no active metabolites — useful in refractory neuropathic pain. Long, unpredictable half-life — <strong>specialist initiation only</strong>.</td></tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 rounded-lg border-l-4 border-destructive bg-destructive/5 mb-3">
            <p className="font-semibold text-foreground text-sm mb-1">Safe rotation principles</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mt-1">
              <li>Calculate the 24-h oral morphine equivalent dose (OMEDD).</li>
              <li>Convert to the equianalgesic dose of the new opioid using a published table.</li>
              <li><strong>Reduce by 25–50%</strong> for incomplete cross-tolerance (50% reduction if elderly, frail, renal/hepatic impairment, very high doses).</li>
              <li>Provide rescue at 1/6 of the new 24-h dose; titrate up over 2–3 days.</li>
              <li>Methadone rotation requires a <strong>different ratio at higher OMEDDs</strong> and is typically done under specialist palliative care supervision, often with admission.</li>
            </ul>
          </div>

          <DiagramSection
            title="Interactive Opioid Conversion Calculator"
            intro={
              <p>
                Translate the current opioid regimen into 24-h <strong>OMEDD</strong>, then rotate to a target opioid with the
                standard 25–50% incomplete cross-tolerance reduction applied automatically. Use the high-risk toggle for
                elderly/frail patients, renal/hepatic impairment, very high doses, or patch rotations.
              </p>
            }
          >
            <OpioidConversionCalculator />
          </DiagramSection>

          <DiagramSection
            title="PCA / NCA + Epidural Prescribing Calculator"
            intro={
              <p>
                Weight-based PCA (morphine, fentanyl, oxycodone) and epidural infusion rates with adult and paediatric
                variants. Includes APAGBI-aligned NCA settings for children &lt;6 yr, infant LA-toxicity ceilings, and
                APM/RCoA monitoring requirements.
              </p>
            }
          >
            <PcaEpiduralCalculator />
          </DiagramSection>
          <h3 className="text-lg font-semibold text-foreground mt-5 mb-2">Interventional Techniques — When Opioids Fail</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Approximately <strong>10–20% of cancer-pain patients</strong> have pain refractory to systemic analgesia or develop intolerable side effects. Interventional ("4th-step") techniques can achieve dramatic improvements and reduce systemic opioid burden.
          </p>

          <div className="p-4 rounded-lg border border-border mb-3">
            <p className="font-semibold text-foreground text-sm">Coeliac plexus block / neurolysis</p>
            <p className="text-sm text-muted-foreground mt-1">
              <strong>Indication:</strong> upper-abdominal visceral pain — particularly <strong>pancreatic cancer</strong>, also gastric, hepatic and biliary malignancy. The coeliac plexus (T5–T12 sympathetic afferents) lies anterolateral to the aorta at L1.
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
              <li><strong>Approaches:</strong> percutaneous posterior (CT- or fluoroscopy-guided, retrocrural or anterocrural), anterior trans-aortic, or <strong>endoscopic ultrasound-guided</strong> (transgastric — increasingly the technique of choice when EUS expertise is available).</li>
              <li><strong>Diagnostic block</strong> with local anaesthetic first; <strong>neurolysis</strong> with 50–100% absolute alcohol (or 6% phenol) if effective.</li>
              <li><strong>Evidence:</strong> Wong RCT (2004, JAMA) and Cochrane (Arcidiacono 2011) — significant pain reduction and ~40–50% lower opioid requirement vs systemic analgesia alone in pancreatic cancer; possibly improved quality of life. Effect lasts weeks–months.</li>
              <li><strong>Complications:</strong> orthostatic hypotension (sympathetic blockade), diarrhoea (unopposed parasympathetic), back pain, retroperitoneal haemorrhage; rare but devastating <strong>paraplegia</strong> from inadvertent injection into the artery of Adamkiewicz.</li>
              <li>Best performed <strong>early</strong> in pancreatic cancer pain rather than as a last resort — outcomes correlate inversely with disease burden.</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg border border-border mb-3">
            <p className="font-semibold text-foreground text-sm">Other neurolytic / interventional options by site</p>
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-sm border-collapse">
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border align-top"><td className="py-2 font-medium text-foreground">Hypogastric plexus block</td><td>Pelvic visceral pain (cervical, prostate, rectal cancer).</td></tr>
                  <tr className="border-b border-border align-top"><td className="py-2 font-medium text-foreground">Ganglion impar block</td><td>Perineal / coccygeal pain (rectal, anal, vulval cancer).</td></tr>
                  <tr className="border-b border-border align-top"><td className="py-2 font-medium text-foreground">Stellate ganglion block</td><td>Head/neck/upper-limb sympathetic pain; post-radiation neuropathy.</td></tr>
                  <tr className="border-b border-border align-top"><td className="py-2 font-medium text-foreground">Intercostal / paravertebral neurolysis</td><td>Chest-wall metastases, post-thoracotomy pain in cancer.</td></tr>
                  <tr className="border-b border-border align-top"><td className="py-2 font-medium text-foreground">Vertebral augmentation (kyphoplasty / vertebroplasty)</td><td>Painful vertebral metastases / pathological compression fractures.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Cordotomy (percutaneous cervical)</td><td>Unilateral cancer pain below C5 with limited prognosis (e.g. mesothelioma); largely confined to specialist UK centres.</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-5 mb-2">Intrathecal Drug Delivery (IDD) Pumps</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Implanted programmable pump (e.g. Medtronic SynchroMed) delivering analgesia directly into the CSF via a tunnelled intrathecal catheter. Allows analgesia at <strong>~1/300 of the equivalent oral morphine dose</strong>, dramatically reducing systemic side effects.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Indications &amp; evidence</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li>Refractory cancer pain (life expectancy ≥3 months, failed systemic opioids).</li>
                <li>Refractory non-cancer pain (chronic spinal pain, FBSS) — more controversial; PACC (Polyanalgesic Consensus Conference) 2017 guidelines.</li>
                <li><strong>Smith RCT (2002, J Clin Oncol):</strong> IDD vs comprehensive medical management in cancer pain — better pain control, fewer toxicities, and a 6-month survival benefit (likely from reduced opioid morbidity).</li>
                <li>Always preceded by a <strong>trial</strong> (intrathecal bolus, continuous external infusion, or epidural) before permanent implant.</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Drugs (PACC 2017 recommendations)</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li><strong>First-line:</strong> intrathecal morphine, ziconomide, or hydromorphone.</li>
                <li><strong>Adjuncts:</strong> bupivacaine (for incident/somatic pain), clonidine, baclofen (for spasticity-related pain).</li>
                <li><strong>Conversion:</strong> oral morphine : IV morphine : epidural morphine : intrathecal morphine ≈ <strong>300 : 100 : 10 : 1</strong>.</li>
                <li><strong>Complications:</strong> infection / meningitis, catheter migration or kinking, granuloma at catheter tip (especially with high-dose morphine), pump malfunction, <strong>opioid withdrawal or overdose if pump fails</strong> — patients carry a wallet card and need 24/7 access to a specialist centre.</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-5 mb-2">Palliative Care Multidisciplinary Team</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Cancer pain is rarely a pain problem alone — Cicely Saunders' concept of <strong>"total pain"</strong> (physical, psychological, social, spiritual) demands an MDT response. Early integration of palliative care (Temel NEJM 2010 — early palliative care in metastatic NSCLC improved quality of life <em>and</em> survival) is now a cornerstone of oncology practice.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Core MDT membership</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li><strong>Palliative care consultant</strong> (medicine of palliative care)</li>
                <li><strong>Pain physician</strong> (FPM-accredited anaesthetist) for interventional input</li>
                <li><strong>Oncologist</strong> &amp; clinical nurse specialist (CNS)</li>
                <li><strong>Specialist palliative care nurse</strong> (community / hospice / hospital)</li>
                <li><strong>Pharmacist</strong> — complex polypharmacy, syringe-driver compatibility, controlled drug supply</li>
                <li><strong>Psychologist / psychiatrist</strong>, social worker, occupational therapist, physiotherapist</li>
                <li><strong>Chaplain / spiritual care</strong>, bereavement support</li>
                <li>Family / informal carers as central members of the team</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Service structure (UK)</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                <li><strong>Hospital specialist palliative care team</strong> — inpatient referrals, complex symptom control, end-of-life care planning.</li>
                <li><strong>Community palliative care</strong> — Macmillan / Marie Curie nurses, GPs, district nurses; supports preferred place of care/death.</li>
                <li><strong>Hospices</strong> — inpatient (symptom control, end-of-life), day units, hospice-at-home.</li>
                <li><strong>Anaesthetic / pain interventional clinics</strong> — coeliac plexus, IDD, neuromodulation.</li>
                <li><strong>Advance care planning</strong>: ReSPECT process, DNACPR discussions, lasting power of attorney, preferred place of care.</li>
                <li>End-of-life care guided by individualised care plans (replaced the discredited Liverpool Care Pathway after Neuberger 2013).</li>
              </ul>
            </div>
          </div>
        </CollapsibleSubsection>
        </div>

        <div id="scs" className="scroll-mt-24">
        <CollapsibleSubsection title="Spinal Cord Stimulation (SCS) — Neuromodulation">
          <p className="text-muted-foreground leading-relaxed mb-3">
            SCS delivers low-voltage electrical pulses to the dorsal columns via an epidural electrode array, modulating the gate (Melzack &amp; Wall) and supraspinal pain networks. NICE TA159 (2008, reaffirmed) recommends SCS for chronic neuropathic pain &gt; 6 months despite conventional therapy after a successful percutaneous trial. Strongest evidence: <strong>failed back surgery syndrome (FBSS)</strong> with predominant radicular leg pain (PROCESS trial, Kumar 2007), <strong>complex regional pain syndrome (CRPS)</strong>, refractory angina, and painful diabetic neuropathy (SENZA-PDN, Petersen 2021). Newer waveforms — 10 kHz high-frequency (SENZA-RCT, Kapural 2015), burst (DeRidder), and closed-loop ECAP-controlled (Mekhail 2020) — provide sub-perception analgesia without paraesthesia.
          </p>
          <SpinalCordStimulatorDiagram />
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">System components</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                <li><strong>Epidural lead</strong> — 8 or 16 cylindrical contacts (percutaneous) or paddle (surgical laminotomy, lower migration risk)</li>
                <li><strong>Anchor</strong> sutured to supraspinous fascia at the entry level</li>
                <li><strong>Tunnelled extension</strong> wires running subcutaneously to the IPG pocket</li>
                <li><strong>Implantable pulse generator (IPG)</strong> — primary-cell or rechargeable Li-ion, sited in upper buttock, flank, or lower abdomen</li>
                <li><strong>Patient and clinician programmers</strong> via wireless telemetry</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Indications &amp; level of evidence</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                <li>FBSS with neuropathic leg pain (Level I)</li>
                <li>CRPS type I/II (Level I — Kemler NEJM 2000)</li>
                <li>Painful diabetic peripheral neuropathy (Level I — SENZA-PDN)</li>
                <li>Refractory angina pectoris (Level II)</li>
                <li>Critical limb ischaemia (selected, Level II)</li>
                <li>Post-amputation / post-herpetic neuralgia (Level III)</li>
                <li><strong>Mandatory trial:</strong> 5–10 day percutaneous trial — &gt;50 % pain reduction <em>and</em> functional improvement before permanent implant</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Lead targets</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                <li><strong>Low back / lower limb:</strong> tip at T8–T10 (T9 sweet spot for FBSS)</li>
                <li><strong>Upper limb:</strong> C2–C4</li>
                <li><strong>Angina:</strong> T1–T2 left-sided</li>
                <li><strong>Pelvic / perineal pain:</strong> conus or DRG (T12–S1)</li>
                <li>Tuohy puncture two levels below the target; loss-of-resistance to <em>saline</em> (air risks pneumocephalus and patchy stimulation)</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Contraindications &amp; risks</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                <li><strong>Absolute:</strong> active sepsis, untreated coagulopathy, inability to consent or operate device, untreated psychological comorbidity (mandatory pre-implant psychology assessment)</li>
                <li><strong>Relative:</strong> immunosuppression, anticipated whole-body MRI need (most modern systems are MR-conditional), demand pacemaker / ICD (programmer interaction)</li>
                <li><strong>Complications:</strong> lead migration (most common, 13–22 %), infection (3–6 %), epidural haematoma, dural puncture &amp; CSF leak, lead fracture, IPG pocket pain, loss of efficacy, hardware failure</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">Anaesthesia for SCS Implantation</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The trial and the percutaneous lead placement of the permanent system are typically performed under <strong>local anaesthesia with conscious sedation</strong>, because intra-operative paraesthesia mapping requires a co-operative, communicating patient (paraesthesia–pain overlap is the historical predictor of long-term success, although high-frequency systems may be placed asleep with anatomical landmarks alone). The IPG pocket and tunnelling are usually performed under deeper sedation or short GA after lead position is confirmed.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Pre-operative assessment</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                <li>Confirm successful trial (≥ 50 % pain reduction, functional gain) and psychology sign-off</li>
                <li>Chronic-pain medication review — long-term opioids, gabapentinoids, antidepressants; <strong>do not stop</strong> on day of surgery (withdrawal, opioid-induced hyperalgesia)</li>
                <li>Anticoagulants per <strong>ASRA / AAGBI neuraxial guidelines</strong> — SCS is a high-bleeding-risk procedure: stop clopidogrel 7 d, ticagrelor 5 d, DOAC 48–72 h, warfarin → INR &lt; 1.4, LMWH prophylactic 12 h, treatment 24 h</li>
                <li>Screen for active infection (skin, urinary, dental); MRSA decolonisation per local policy</li>
                <li>Latex / chlorhexidine / nickel (lead) allergy</li>
                <li>Cardiac devices — liaise with cardiology re cross-talk; usually safe but reprogramme/monitor</li>
                <li>MRI-conditional status of any previously implanted device</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Intra-operative conduct</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                <li>Prone position with chest/pelvis bolsters, abdomen free; pillows to optimise lumbar flexion and open inter-laminar space</li>
                <li>Full AAGBI monitoring + capnography (sedated prone patient is high-risk for airway obstruction); supplemental O₂ via nasal specs</li>
                <li>Wide-bore IV access; fluid-warmer and forced-air warming (long fluoroscopy-guided procedure)</li>
                <li><strong>Sedation goal:</strong> rousable, communicative, comfortable. Target-controlled propofol (effect-site 0.8–1.5 µg·mL⁻¹) ± remifentanil 0.02–0.05 µg·kg⁻¹·min⁻¹, or low-dose dexmedetomidine 0.2–0.6 µg·kg⁻¹·h⁻¹ (preserves co-operation, no respiratory depression)</li>
                <li>Avoid <strong>boluses of opioid or benzodiazepine</strong> during paraesthesia mapping — abolishes patient feedback</li>
                <li>Generous local infiltration of skin, fascia and IPG pocket with lidocaine + adrenaline; ropivacaine for longer cover</li>
                <li>Prophylactic IV antibiotic (cefuroxime / teicoplanin) within 60 min of incision — infection is a device-loss event</li>
                <li>Strict asepsis: full surgical scrub, double gloves, plastic adhesive drape, antibiotic-impregnated pocket lavage</li>
                <li>Fluoroscopy: lead-protective garments for staff; minimise screening time</li>
                <li>Communicate with the implanting team during stimulation testing — keep the patient awake enough to localise paraesthesia to the painful area</li>
              </ul>
            </div>
          </div>
          <div className="p-4 rounded-lg border border-border mt-3">
            <p className="font-semibold text-foreground text-sm">Post-operative care &amp; pitfalls</p>
            <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
              <li>Recovery in lateral position to protect IPG pocket; observe for new neurological deficit (epidural haematoma — urgent MRI and decompression within 8 h)</li>
              <li>Restrict trunk flexion / lifting / driving for 6 weeks to reduce lead migration</li>
              <li>Resume anticoagulants when haemostasis secure (typically &gt; 24 h)</li>
              <li>Multimodal post-op analgesia (paracetamol + low-dose opioid + local infiltration); the procedure is more painful than expected — do not under-treat</li>
              <li>Diathermy in any future surgery: <strong>bipolar only</strong>, short bursts, away from device; turn IPG off pre-op</li>
              <li>MRI: only with explicit MR-conditional certification — full-body 1.5 T or 3 T per manufacturer's instructions; device interrogation before and after</li>
              <li>Document device make, model, serial number, programming parameters in the anaesthetic record</li>
            </ul>
          </div>
        </CollapsibleSubsection>
        </div>

        <div id="nerve-root" className="scroll-mt-24">
        <CollapsibleSubsection title="Nerve Root Injections (Selective Nerve Root Block &amp; Transforaminal Epidural Steroid Injection)">
          <p className="text-muted-foreground leading-relaxed mb-3">
            A nerve root injection deposits local anaesthetic ± corticosteroid around a specific spinal nerve as it traverses the intervertebral foramen. It is used <strong>diagnostically</strong> (to confirm a single radicular pain generator before surgery or radiofrequency) and <strong>therapeutically</strong> (to relieve radicular pain from disc prolapse, foraminal stenosis, or post-surgical scarring). Evidence is strongest for short- to medium-term relief of acute lumbosacral radiculopathy (NICE NG59 — consider for severe sciatica when surgery is being weighed); chronic and axial low back pain respond less reliably (FDA black-box on particulate steroids in cervical injections, 2014).
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Approaches</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                <li><strong>Lumbar transforaminal:</strong> "safe triangle" (Bogduk) — inferior to pedicle, lateral to nerve root, in upper-anterior part of the foramen, viewed in oblique fluoroscopy with the "Scotty dog" silhouette</li>
                <li><strong>Cervical transforaminal:</strong> oblique fluoroscopy 45°; needle in posterior aspect of foramen to avoid the vertebral and radicular arteries — <strong>non-particulate steroid only</strong></li>
                <li><strong>Thoracic transforaminal:</strong> rare; superior costotransverse approach, beware pneumothorax</li>
                <li><strong>Sacral (S1) transforaminal:</strong> through the dorsal S1 foramen, AP and lateral views</li>
                <li><strong>Selective nerve root block (SNRB)</strong>: small volume (0.5–1 mL) of LA only, deliberately limited to one root for diagnostic specificity</li>
                <li><strong>Image guidance:</strong> fluoroscopy with iodinated contrast is standard; CT-guided for difficult anatomy or thoracic levels; ultrasound for cervical roots in experienced hands</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Technique &amp; safety</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                <li>Awake, lightly sedated patient (deep sedation masks intravascular or intrathecal injection — avoid)</li>
                <li>Prone (lumbar/thoracic) or supine with head turned (cervical); skin preparation, sterile drape, local infiltration</li>
                <li>22–25 G spinal/Quincke or blunt-tip needle; advance under intermittent fluoroscopy</li>
                <li><strong>Confirm position with contrast (1–2 mL iohexol):</strong> neurogram outlines the nerve root sleeve — exclude vascular uptake (rapid washout) or intrathecal spread (myelogram pattern)</li>
                <li>Inject slowly, pause if reproduces concordant radicular pain, stop for any new neurological symptom</li>
                <li>Continuous verbal contact, ECG/SpO₂/NIBP; resus drugs and Intralipid 20 % immediately available for LAST</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-5 mb-2">Drugs Injected</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Drug</th>
                  <th className="text-left py-2 text-foreground font-semibold">Typical dose / volume</th>
                  <th className="text-left py-2 text-foreground font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Lidocaine 1–2 %</td>
                  <td>0.5–1 mL per root</td>
                  <td>Diagnostic SNRB — short-acting, rapid feedback within 15 min</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Bupivacaine 0.25 % / Levobupivacaine 0.25 %</td>
                  <td>0.5–2 mL per root</td>
                  <td>Therapeutic block; longer duration. Maximum total dose 2 mg·kg⁻¹</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Ropivacaine 0.2 %</td>
                  <td>0.5–2 mL per root</td>
                  <td>Lower cardiotoxicity; favoured by some centres</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Iohexol (Omnipaque 240/300)</td>
                  <td>1–2 mL</td>
                  <td>Non-ionic, low-osmolar contrast — confirm neurogram, exclude vascular / intrathecal</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Dexamethasone <em>(non-particulate)</em></td>
                  <td>4–8 mg</td>
                  <td><strong>Mandatory</strong> for cervical and thoracic transforaminal injections; preferred at all sites (FDA 2014 safety alert)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Methylprednisolone acetate (Depo-Medrone) <em>particulate</em></td>
                  <td>40–80 mg</td>
                  <td>Lumbar/sacral therapeutic injection only; <strong>contraindicated cervical</strong> (vertebral artery embolic infarct, paraplegia)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Triamcinolone acetonide <em>particulate</em></td>
                  <td>20–40 mg</td>
                  <td>Same caveats as methylprednisolone</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Hyaluronidase</td>
                  <td>1500 IU</td>
                  <td>Adjunct for adhesiolysis (Racz procedure) — not routine SNRB</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Complications</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                <li><strong>Catastrophic but rare:</strong> spinal cord infarction from particulate steroid embolus into a radiculomedullary artery (artery of Adamkiewicz at L1–L2 typically), vertebral artery injection at cervical levels, epidural haematoma</li>
                <li><strong>Nerve injury / dural puncture / post-dural-puncture headache</strong></li>
                <li><strong>LAST</strong> (intravascular injection) — treat with 20 % Intralipid bolus 1.5 mL·kg⁻¹ then 0.25 mL·kg⁻¹·min⁻¹ per AAGBI 2010</li>
                <li><strong>Vasovagal syncope</strong> — common; pre-warn the patient</li>
                <li><strong>Steroid effects:</strong> facial flushing, transient hyperglycaemia (warn diabetics), HPA-axis suppression with repeat doses (limit to 3–4 per year), avascular necrosis of the femoral head (rare)</li>
                <li><strong>Infection:</strong> superficial 0.1–0.5 %, epidural abscess and meningitis are rare but devastating</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Key safety rules</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1 list-disc list-inside">
                <li>Always use real-time imaging and live (or digital subtraction) contrast injection — blind injection is no longer acceptable</li>
                <li>Use <strong>non-particulate steroid (dexamethasone)</strong> for all cervical and thoracic transforaminal injections, and consider for all levels</li>
                <li>Test dose principle: small LA dose first; abandon if any new neurological symptom</li>
                <li>Stop antiplatelets / anticoagulants per ASRA neuraxial guidance — these are <strong>high-bleed-risk</strong> interventional pain procedures</li>
                <li>Maximum 3–4 epidural / transforaminal steroid injections per anatomical region per year</li>
                <li>Document concordant pain reproduction, contrast spread, drugs and doses, and immediate post-procedure neurology</li>
              </ul>
            </div>
          </div>
        </CollapsibleSubsection>
        </div>

        <div id="faq" className="scroll-mt-24">
          <CollapsibleSubsection title="Frequently Asked Questions" defaultOpen>
            <div className="space-y-4">
              {painFaqs.map(([question, answer], idx) => (
                <div key={idx} className="rounded-lg border border-border p-4">
                  <p className="font-semibold text-foreground text-sm mb-1">{question}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{answer}</p>
                </div>
              ))}
            </div>
          </CollapsibleSubsection>
        </div>

          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "WHO analgesic ladder (paracetamol → weak opioid → strong opioid) is a starting framework — escalate, combine modalities and add adjuncts.",
              "Neuropathic pain responds poorly to opioids — first line: gabapentinoids, TCAs (amitriptyline) or SNRIs (duloxetine).",
              "Chronic post-surgical pain risk factors: pre-existing pain, severe acute postoperative pain, certain surgeries (thoracotomy, hernia, breast, amputation).",
              "Multimodal analgesia: paracetamol + NSAID + regional + opioid-sparing adjuncts (ketamine, lidocaine, magnesium, dexmedetomidine).",
              "Opioid-induced hyperalgesia and tolerance are dose-related — minimise long-term opioid use and consider opioid rotation if tolerance develops.",
            ]}
          />
      </section>
      </ExamSection>
      }
    />
    </>
  );
};

export default PainMedicineTopic;
