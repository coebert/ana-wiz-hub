import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { PKaDiagram } from "@/components/diagrams/pharmacology/PKaDiagram";
import { HendersonHasselbalchDiagram } from "@/components/diagrams/intensive-care/HendersonHasselbalchDiagram";
import IonTrappingDiagram from "@/components/diagrams/pharmacology/IonTrappingDiagram";
import { localAnaestheticsQuiz } from "@/data/quizzes";
import LocalAnaestheticStructures from "@/components/diagrams/pharmacology/LocalAnaestheticStructures";
import PropofolLidocaineMechanismDiagram from "@/components/diagrams/pharmacology/PropofolLidocaineMechanismDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";
import { AnaesthesiaDosingCallout } from "@/components/perioperative/AnaesthesiaDosingCallout";

const localAnaestheticsFaqs: Array<[string, string]> = [
  [
    "What are the maximum safe doses of common local anaesthetics?",
    "Lidocaine — 3 mg/kg plain, 7 mg/kg with adrenaline. Bupivacaine/levobupivacaine — 2 mg/kg (with or without adrenaline; toxicity dominates). Ropivacaine — 3–4 mg/kg. Prilocaine — 6 mg/kg plain, 8 mg/kg with adrenaline (max for Bier's block). Doses should be reduced 30–50 % in the elderly, pregnant, debilitated, and infused at the lowest effective concentration. Always calculate maximum mg before drawing up."
  ],
  [
    "How does pKa of a local anaesthetic relate to onset of action?",
    "Only the unionised form crosses the nerve membrane. The closer the pKa to physiological pH, the higher the proportion unionised, and the faster the onset. Lidocaine pKa 7.9 — ~25 % unionised → onset 2–5 min. Bupivacaine pKa 8.1 — ~15 % unionised → onset 10–15 min. In infected tissue (low pH), more drug is ionised → poor onset (textbook reason to avoid LA in abscesses). Chloroprocaine (pKa 8.7) is exception — fastest onset due to high concentration used."
  ],
  [
    "Outline the management of local-anaesthetic systemic toxicity (LAST).",
    "RCoA/Association of Anaesthetists 2024 algorithm: STOP injection, call for help, ABC (100 % O₂, secure airway, IV access). Manage seizures (small dose benzodiazepine or propofol). Treat arrhythmias (avoid lidocaine, calcium, vasopressin; use small adrenaline 1 µg/kg). Give 20 % Intralipid: 1.5 mL/kg bolus, then 15 mL/kg/h infusion, repeat bolus up to 3×, max 12 mL/kg total. Continue CPR — long resuscitation often successful. Refer to ITU and report to NPSA / Lipid Rescue registry."
  ]
];

const workedExamples: WorkedExample[] = [
  {
    title: "Managing severe local anaesthetic systemic toxicity (LAST)",
    scenario:
      "After an ultrasound-guided axillary block with 30 mL of 0.5% bupivacaine, the patient develops perioral tingling, agitation, then a generalised seizure followed by VT and cardiovascular collapse. Walk through your management.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Call for help and the LAST trolley. Stop injecting LA immediately. Manage airway and ventilate with 100% O₂ — hypoxia and acidosis worsen toxicity.</li>
          <li>Terminate the seizure: small-dose benzodiazepine (midazolam 1–2 mg) preferred. Propofol is not recommended if there is any cardiovascular instability — it is a myocardial depressant and is not a substitute for lipid emulsion.</li>
          <li>Start ALS if pulseless. CPR may need to be prolonged (&gt;60 min) because bupivacaine binds avidly to sodium channels.</li>
          <li>Give 20% lipid emulsion (Intralipid): 1.5 mL/kg bolus over 1 min then 15 mL/kg/h infusion. Repeat bolus every 5 min up to 3 times if circulation not restored; double the infusion rate if BP remains low. Max cumulative dose 12 mL/kg.</li>
          <li>Modify ALS drugs: reduce adrenaline to ≤1 µg/kg boluses; avoid vasopressin, calcium channel blockers, β-blockers, and lidocaine.</li>
          <li>Once stable, transfer to ICU for ≥12 h monitoring (delayed cardiotoxicity), serum amylase/lipase if propofol used, and report to NAP/LAST registry.</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Treating the patient with lidocaine — adds to toxicity.</li>
            <li>Stopping CPR too early — recovery has been reported after &gt;60 min.</li>
            <li>Using full-dose adrenaline — worsens arrhythmia in the bupivacaine-poisoned myocardium.</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Stop LA, secure airway with 100% O₂, suppress seizures with midazolam, start ALS (with reduced adrenaline ≤1 µg/kg, no lidocaine/vasopressin/calcium blockers), and give 20% lipid emulsion 1.5 mL/kg bolus then 15 mL/kg/h infusion. Continue CPR for ≥60 min if needed and admit to ICU for ≥12 h after ROSC.",
    cites: ["AA LAST 2024","BJA Educ 2016"],
  },
];
const LocalAnaestheticsTopic = () => {
  return (
    <TopicTemplate
      title="Local Anaesthetic Agents"
      subtitle="FRCA Primary — Pharmacology"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
      topicId="local-anaesthetics"
      topicTitle="Local Anaesthetic Agents"
      quizQuestions={localAnaestheticsQuiz}
      objectives={[
        "Explain how pKa, lipid solubility and protein binding determine onset, potency and duration of local anaesthetics",
        "Apply the Henderson–Hasselbalch equation and the concept of ion trapping to clinical scenarios (infected tissue, foetal acidosis)",
        "Distinguish ester from amide LAs by metabolism, allergy potential and clinical use",
        "Calculate maximum safe doses for lidocaine, bupivacaine, ropivacaine and prilocaine, with and without adrenaline",
        "Recognise and manage local anaesthetic systemic toxicity (LAST) using the RCoA/Association of Anaesthetists 2024 guideline and 20% lipid emulsion",
      ]}
      keyPoints={[
        { text: "LAs are weak bases; the unionised form crosses the membrane, the ionised form blocks the Na⁺ channel intracellularly.", cites: ["Peck & Hill Ch.8"] },
        { text: "pKa determines onset speed: lower pKa → more unionised at pH 7.4 → faster onset (lidocaine pKa 7.9 > bupivacaine pKa 8.1).", cites: ["BJA Educ 2015"] },
        { text: "Lipid solubility determines potency; protein binding determines duration of action.", cites: ["AA LAST 2024"] },
        { text: "Infected/acidotic tissue has more ionised drug → less membrane penetration → LA failure.", cites: ["Peck & Hill Ch.8"] },
        { text: "Amides (lidocaine, bupivacaine, ropivacaine) are hepatically metabolised; esters are hydrolysed by plasma cholinesterases.", cites: ["BJA Educ 2015"] },
        { text: "Differential blockade: autonomic → pain/temperature → touch → motor. Recovery is in reverse.", cites: ["AA LAST 2024"] },
        { text: "LAST presents as CNS excitation then cardiovascular collapse. Treat with Intralipid 20% (1.5 mL/kg bolus then 15 mL/kg/h infusion).", cites: ["Peck & Hill Ch.8"] },
        { text: "Bupivacaine is most cardiotoxic due to slow dissociation from cardiac Na⁺ channels; ropivacaine is the safer S-enantiomer alternative.", cites: ["BJA Educ 2015"] },
      ]}
      workedExamples={workedExamples}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY], curriculumCodes: ["PR_BK_05"] },
        keyPoints: { exams: [Exam.PRIMARY], curriculumCodes: ["PR_BK_05"] },
      }}
      sectionSources={{
        objectives: ["BJA Educ 2015", "Peck & Hill Ch.8", "AA LAST 2024"],
        keyPoints: ["BJA Educ 2015", "Peck & Hill Ch.8", "AA LAST 2024"],
        workedExamples: ["AA LAST 2024", "BJA Educ 2016"],
      }}
      coreConcepts={
        <>
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} className="scroll-mt-24">
        <div className="prose prose-slate max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
            <p className="text-foreground/90 leading-relaxed">
              Local anaesthetic (LA) agents reversibly block nerve conduction by inhibiting voltage-gated sodium channels.
              They are weak bases with a pKa above physiological pH, meaning the majority exists in the ionised (charged)
              form at body pH. Understanding the relationship between pKa, pH, and ionisation is central to their
              pharmacology.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">pKa and Ionisation</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Local anaesthetics are weak bases. The Henderson-Hasselbalch equation determines the proportion of ionised
              (BH⁺) to unionised (B) drug at any given pH. Use the interactive diagram below to explore how changing pH
              affects ionisation for different agents.
            </p>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <PKaDiagram />
            </div>
            <div className="mt-4">
              <HendersonHasselbalchDiagram />
            </div>
            <div className="mt-4">
              <IonTrappingDiagram />
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 mt-4 border border-border">
              <p className="text-sm font-medium text-foreground">The Key Principle</p>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                The <strong>unionised form (B)</strong> is lipid-soluble and crosses the nerve membrane to reach the
                intracellular side. The <strong>ionised form (BH⁺)</strong> then binds to the intracellular portion of
                the voltage-gated Na⁺ channel to block it. <em>Both forms are needed</em> — the unionised form for
                membrane penetration, the ionised form for receptor binding.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Structure & Classification</h2>
            <p className="text-foreground/90 leading-relaxed">
              All local anaesthetics share a common structure: an aromatic ring (lipophilic) linked to an amine group
              (hydrophilic) via either an <strong>ester</strong> or <strong>amide</strong> bond.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground text-sm mb-2">Esters</h3>
                <p className="text-sm text-muted-foreground">Cocaine, procaine, tetracaine, chloroprocaine</p>
                <p className="text-sm text-muted-foreground mt-1">Metabolised by plasma cholinesterases (pseudocholinesterase). Produce PABA metabolites — higher allergy risk.</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground text-sm mb-2">Amides</h3>
                <p className="text-sm text-muted-foreground">Lidocaine, bupivacaine, ropivacaine, prilocaine, levobupivacaine</p>
                <p className="text-sm text-muted-foreground mt-1">Metabolised by hepatic amidases (CYP450). Very rare true allergy. Remember: amides have two "i"s in the name.</p>
              </div>
            </div>
            <h3 className="text-lg font-serif font-semibold text-foreground mt-6 mb-2">Classification by Potency and Duration</h3>
            <p className="text-foreground/90 leading-relaxed mb-3">
              A second, clinically more useful classification groups the agents by potency and duration of action, which follow lipid
              solubility and protein binding respectively<InlineRef topicId="local-anaesthetics" refLabel="BJA 1986 LA Pharmacology" />.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead><tr className="bg-muted/50"><th className="text-left p-3 font-semibold text-foreground">Group</th><th className="text-left p-3 font-semibold text-foreground">Agents</th><th className="text-left p-3 font-semibold text-foreground">Typical clinical use</th></tr></thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-t border-border"><td className="p-3 font-medium text-foreground">Low potency, short duration</td><td className="p-3">Procaine, chloroprocaine (esters)</td><td className="p-3">Chloroprocaine for rapid epidural top-up (onset ~5 min, rapid ester hydrolysis limits fetal exposure) and short spinal anaesthesia for day-case surgery; procaine is largely historical.</td></tr>
                  <tr className="border-t border-border"><td className="p-3 font-medium text-foreground">Intermediate potency and duration</td><td className="p-3">Lidocaine, prilocaine, mepivacaine</td><td className="p-3">Lidocaine for infiltration, airway topicalisation and dentistry; prilocaine for Bier's block (least cardiotoxic, but methaemoglobinaemia with o-toluidine) and dental use; mepivacaine for peripheral blocks needing quick onset and moderate duration.</td></tr>
                  <tr className="border-t border-border"><td className="p-3 font-medium text-foreground">High potency, long duration</td><td className="p-3">Bupivacaine, levobupivacaine, ropivacaine, tetracaine (amethocaine), etidocaine</td><td className="p-3">Bupivacaine and levobupivacaine for spinal, epidural and peripheral blocks; ropivacaine for infusions where motor sparing and a better cardiotoxicity profile matter; tetracaine as topical gel (Ametop) for cannulation.</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Additives to Local Anaesthetics</h2>
            <div className="space-y-3 text-sm">
              <div className="rounded-lg border border-border p-4">
                <p className="font-semibold text-foreground">Adrenaline (typically 1:200,000 = 5 µg/mL)</p>
                <p className="text-muted-foreground mt-1">α₁-mediated vasoconstriction slows systemic absorption, so peak plasma concentration falls, duration is prolonged (most marked for lidocaine and prilocaine, least for bupivacaine and ropivacaine, which are already highly protein-bound) and the maximum safe dose rises. It also serves as an intravascular marker (tachycardia on test dose). Avoid in digital, penile and ear blocks by tradition, and in unstable ischaemic heart disease or uncontrolled hypertension.</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="font-semibold text-foreground">Sodium bicarbonate</p>
                <p className="text-muted-foreground mt-1">Raising solution pH increases the proportion of unionised base available to cross the axonal membrane, speeding onset and reducing injection pain. A practical recipe is 1 mL of 8.4% sodium bicarbonate added to 10 mL of lidocaine (use only about 0.1 mL per 10 mL for bupivacaine, which precipitates readily). Mix immediately before use.</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="font-semibold text-foreground">Opioids (fentanyl, diamorphine, morphine)</p>
                <p className="text-muted-foreground mt-1">Act synergistically at pre- and post-synaptic µ-receptors in the dorsal horn when given neuraxially, improving block quality without added motor block. Intrathecal fentanyl 10–25 µg improves intra-operative comfort at caesarean section; diamorphine 300–400 µg or preservative-free morphine gives 12–24 h analgesia at the cost of pruritus, nausea and a risk of delayed respiratory depression.</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="font-semibold text-foreground">Clonidine and dexmedetomidine (α₂-agonists)</p>
                <p className="text-muted-foreground mt-1">Prolong both sensory and motor block, probably through hyperpolarisation of C fibres and spinal α₂ effects; clonidine 1 µg/kg is a common peripheral adjunct. Dose-limiting sedation, hypotension and bradycardia.</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="font-semibold text-foreground">Dexamethasone and others</p>
                <p className="text-muted-foreground mt-1">Perineural or intravenous dexamethasone prolongs analgesia after brachial plexus block; hyaluronidase aids spread in ophthalmic blocks; sodium metabisulfite and other preservatives are relevant to neurotoxicity concerns rather than efficacy.</p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Use in Obstetric Anaesthesia</h2>
            <p className="text-foreground/90 leading-relaxed mb-3">
              Obstetric practice demands high-quality block with minimal motor weakness and minimal fetal exposure. Inadequate neuraxial
              anaesthesia for elective caesarean section is common — roughly one in ten women needs supplementation and a small
              proportion require conversion to general anaesthesia — so dose, level testing and a plan for supplementation matter<InlineRef topicId="local-anaesthetics" refLabel="Anaesthesia 2022 Neuraxial CS" />.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-foreground/90">
              <li><strong>Labour epidural:</strong> low-concentration mixtures — bupivacaine or levobupivacaine 0.0625–0.125% (or ropivacaine 0.1–0.2%) with fentanyl 2 µg/mL, given by intermittent bolus or programmed intermittent epidural bolus with patient-controlled top-ups. Low concentration preserves motor power and reduces instrumental delivery.</li>
              <li><strong>Caesarean section (spinal):</strong> hyperbaric bupivacaine 0.5% 2.0–2.5 mL (10–12.5 mg) with fentanyl 10–25 µg and diamorphine 300–400 µg, aiming for a block to T4 (loss of cold to T4, light touch to T5) before incision.</li>
              <li><strong>Epidural top-up for category 1–2 section:</strong> 2% lidocaine with adrenaline and fentanyl, or 0.5% bupivacaine/levobupivacaine; chloroprocaine 3% where the fastest onset is required.</li>
              <li><strong>Ion trapping:</strong> local anaesthetics cross the placenta as the unionised base. In the acidotic fetus, more of the drug is protonated and cannot diffuse back, so it accumulates in the fetal circulation. This is most marked with lidocaine and prilocaine (lower pKa, less protein binding) and least with bupivacaine, which is highly protein-bound with a low umbilical:maternal ratio. Clinically it means fetal distress with acidosis increases fetal drug load — a reason for avoiding repeated large maternal doses and for treating maternal hypotension and uterine hyperstimulation promptly.</li>
              <li><strong>Physiological caveats:</strong> engorged epidural veins reduce the dose requirement by about a third and increase the risk of intravascular injection; progesterone increases neural sensitivity; aortocaval compression exaggerates the hypotension of sympathetic block.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Mechanism of Action</h2>
            <p className="text-foreground/90 leading-relaxed">
              Local anaesthetics block voltage-gated Na⁺ channels from the <strong>intracellular side</strong>, binding
              preferentially to the inactivated state (use-dependent block). This means frequently firing nerves are
              blocked more readily than resting nerves.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              Nerve fibres are blocked in order of susceptibility: small myelinated fibres (Aδ — pain, temperature) and
              unmyelinated C fibres (pain) are blocked before large myelinated fibres (Aα — motor, Aβ — touch, pressure).
              This differential blockade allows sensory block without complete motor block at appropriate concentrations.
            </p>
            <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
              <p className="text-sm font-medium text-foreground">Order of Blockade (typical clinical sequence)</p>
              <p className="text-sm text-muted-foreground mt-1">
                Autonomic (B, C fibres) → Pain & temperature (Aδ, C) → Touch & pressure (Aβ) → Motor (Aα)
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Recovery occurs in reverse order — motor function returns first.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Differential Blockade</h2>
            <p className="text-foreground/90 leading-relaxed">
              Nerve fibres are not blocked simultaneously. The classic clinical sequence is autonomic (B fibres) →
              pain and temperature (Aδ and C) → touch and pressure (Aβ) → motor and proprioception (Aα), with
              recovery in reverse order. This is why a patient may have a warm, vasodilated, pain-free limb while
              still able to move it, and why an epidural can give analgesia without dense motor block.
            </p>
            <ul className="text-foreground/90 space-y-1 mt-3">
              <li><strong>Fibre diameter and myelination:</strong> small unmyelinated C fibres and thinly myelinated Aδ and B fibres have a shorter critical blocking length and need fewer sodium channels blocked, so they succumb at lower concentrations than large myelinated Aα fibres, which require block of at least three consecutive nodes of Ranvier.</li>
              <li><strong>Frequency dependence (use-dependent block):</strong> local anaesthetics bind preferentially to open and inactivated channels, so rapidly firing nociceptive fibres accumulate block more readily than tonically quiet motor fibres.</li>
              <li><strong>Drug and concentration effects:</strong> low concentrations favour sensory-selective block (0.0625–0.1% bupivacaine or 0.1–0.2% ropivacaine for labour epidurals) while higher concentrations recruit motor fibres. Ropivacaine and levobupivacaine show relatively greater sensory-than-motor block than racemic bupivacaine at equivalent analgesic doses, and highly lipid-soluble, potent, long-acting agents produce denser and longer block than the low-potency, short-duration agents<InlineRef topicId="local-anaesthetics" refLabel="BJA 1986 LA Pharmacology" />.</li>
              <li><strong>Anatomical factors:</strong> in a mixed nerve, mantle fibres (supplying proximal structures) are exposed first, giving a proximal-to-distal onset for peripheral blocks; in neuraxial block the sympathetic level typically extends two or more segments above the sensory level, and the motor level lies below it.</li>
              <li><strong>Clinical relevance:</strong> test cold or pinprick rather than touch when assessing a block for surgery; expect hypotension from early sympathetic block; and warn patients that the ability to move does not mean the block has failed, while a dense motor block signals a high concentration or intrathecal spread.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Why LAs Fail in Infected Tissue</h2>
            <p className="text-foreground/90 leading-relaxed">
              Infected tissue has a lower pH (~6.5) due to lactic acid production. Since LAs are weak bases with pKa
              values of 7.7-8.1, a lower pH shifts the equilibrium toward the ionised form (BH⁺). Less unionised drug
              is available to cross the nerve membrane, reducing efficacy. This is why local anaesthesia is often
              inadequate in the presence of abscess or cellulitis.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Physicochemical Properties</h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-3 font-semibold text-foreground">Property</th>
                    <th className="text-center p-3 font-semibold text-foreground">Determines</th>
                    <th className="text-center p-3 font-semibold text-foreground">Clinical Effect</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 text-foreground font-medium">pKa</td>
                    <td className="p-3 text-center text-muted-foreground">Ionisation at pH 7.4</td>
                    <td className="p-3 text-center text-muted-foreground">Speed of onset (lower pKa → more unionised → faster onset)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 text-foreground font-medium">Lipid solubility</td>
                    <td className="p-3 text-center text-muted-foreground">Membrane penetration</td>
                    <td className="p-3 text-center text-muted-foreground">Potency (more lipid-soluble → more potent)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 text-foreground font-medium">Protein binding</td>
                    <td className="p-3 text-center text-muted-foreground">Na⁺ channel binding affinity</td>
                    <td className="p-3 text-center text-muted-foreground">Duration of action (higher binding → longer duration)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Local Anaesthetic Toxicity (LAST)</h2>
            <p className="text-foreground/90 leading-relaxed">
              Systemic toxicity occurs when plasma levels exceed the toxic threshold, typically from inadvertent
              intravascular injection or excessive dosing. The CNS is affected first (excitation → seizures), followed
              by cardiovascular collapse. Bupivacaine is particularly cardiotoxic due to slow dissociation from cardiac
              Na⁺ channels.
            </p>
            <div className="bg-destructive/5 rounded-lg p-4 mt-3 border border-destructive/30">
              <p className="text-sm font-semibold text-destructive mb-2">LAST: Signs in Order of Severity</p>
              <ol className="text-sm text-foreground/80 space-y-1 list-decimal ml-4">
                <li>Perioral tingling, tinnitus, metallic taste, lightheadedness</li>
                <li>Visual disturbance, slurred speech, muscle twitching</li>
                <li>Seizures</li>
                <li>Loss of consciousness</li>
                <li>Cardiovascular collapse (arrhythmias, cardiac arrest)</li>
              </ol>
            </div>
            <div className="bg-accent/10 rounded-lg p-4 mt-3 border border-accent/30">
              <p className="text-sm font-semibold text-accent mb-2">Treatment: Intralipid (20% Lipid Emulsion)</p>
              <ul className="text-sm text-foreground/80 space-y-1">
                <li>• Initial bolus: 1.5 mL/kg over 1 minute</li>
                <li>• Infusion: 15 mL/kg/h (or 0.25 mL/kg/min)</li>
                <li>• Repeat bolus after 5 min if cardiovascular instability persists (max 2 further boluses)</li>
                <li>• Maximum cumulative dose: approximately 12 mL/kg (about 1000 mL in a 70 kg adult)</li>
                <li>• Modify ALS: adrenaline boluses &lt;1 µg/kg; avoid vasopressin, calcium channel blockers, β-blockers and further local anaesthetic<InlineRef topicId="local-anaesthetics" refLabel="ASRA LAST 2020" /></li>
                <li>• Paediatric doses are the same per kilogram; the 2020 update brought paediatric lipid resuscitation into the main guideline<InlineRef topicId="local-anaesthetics" refLabel="AA LAST 2020" /></li>
                <li>• Post-event care: critical care for at least 12 h (delayed cardiotoxicity), check triglycerides/amylase, and report to the national registry<InlineRef topicId="local-anaesthetics" refLabel="AA LAST 2024" /></li>
                <li>• The RCoA/Association of Anaesthetists 2024 guideline requires lipid emulsion to be immediately available wherever local anaesthetic is used, with a laminated checklist</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Maximum Safe Doses</h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-3 font-semibold text-foreground">Agent</th>
                    <th className="text-center p-3 font-semibold text-foreground">Plain (mg/kg)</th>
                    <th className="text-center p-3 font-semibold text-foreground">With adrenaline (mg/kg)</th>
                    <th className="text-center p-3 font-semibold text-foreground">pKa</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 text-foreground">Lidocaine</td>
                    <td className="p-3 text-center text-muted-foreground">3</td>
                    <td className="p-3 text-center text-muted-foreground">7</td>
                    <td className="p-3 text-center text-muted-foreground">7.9</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 text-foreground">Bupivacaine</td>
                    <td className="p-3 text-center text-muted-foreground">2</td>
                    <td className="p-3 text-center text-muted-foreground">2</td>
                    <td className="p-3 text-center text-muted-foreground">8.1</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 text-foreground">Ropivacaine</td>
                    <td className="p-3 text-center text-muted-foreground">3</td>
                    <td className="p-3 text-center text-muted-foreground">3</td>
                    <td className="p-3 text-center text-muted-foreground">8.1</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 text-foreground">Prilocaine</td>
                    <td className="p-3 text-center text-muted-foreground">6</td>
                    <td className="p-3 text-center text-muted-foreground">9</td>
                    <td className="p-3 text-center text-muted-foreground">7.7</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Clinical Application: Lidocaine to Reduce Propofol Injection Pain
            </h2>
            <p className="mt-3 text-foreground/90 leading-relaxed">
              Up to 70% of patients report pain on injection of propofol into a small
              hand vein. The pain has both an immediate component (direct irritation
              of the vessel and free nerve endings by the aqueous phase of the
              emulsion) and a delayed component (kinin cascade activation 10–20 s
              after injection). Mixing 20–40 mg of lidocaine with each 200 mg of
              propofol — or pre-treating with lidocaine under a Bier-style venous
              tourniquet for 30–60 s — is the most widely used and effective
              prophylaxis.
            </p>
            <PropofolLidocaineMechanismDiagram />
            <h3 className="mt-5 text-lg font-semibold text-foreground">
              Why it works (mechanisms)
            </h3>
            <ul className="mt-2 list-disc pl-6 space-y-2 text-foreground/90 leading-relaxed">
              <li>
                <span className="font-semibold">Local anaesthetic action on venous nociceptors.</span>{" "}
                Lidocaine blocks voltage-gated Na<sup>+</sup> channels on the free
                nerve endings in the venous endothelium, raising their threshold
                for the irritant stimulus produced by free propofol in the aqueous
                phase.
              </li>
              <li>
                <span className="font-semibold">Reduction of the free aqueous propofol concentration.</span>{" "}
                Propofol injection pain correlates with the concentration of
                <em> free</em> drug in the aqueous phase of the emulsion (typically
                ~50 µg/mL in 1% propofol). Adding lidocaine lowers the pH of the
                mixture (lidocaine is formulated at pH ~6.5; propofol at pH ~7–8.5),
                which favours partition of propofol back into the lipid micelles
                and reduces the free aqueous concentration that contacts the vein
                wall.
              </li>
              <li>
                <span className="font-semibold">Suppression of the bradykinin-generating cascade.</span>{" "}
                Propofol activates plasma kallikrein in the vein, releasing
                bradykinin which sensitises the vessel and amplifies the delayed
                pain. Lidocaine attenuates this kinin-mediated sensitisation.
              </li>
              <li>
                <span className="font-semibold">Membrane-stabilising / counter-irritant effect.</span>{" "}
                A small systemic lidocaine effect on peripheral and central pain
                pathways may also contribute, particularly when a tourniquet is
                used to retain the lidocaine in the limb for 30–60 s before
                propofol injection (modified Bier's block technique, the most
                effective single intervention in meta-analyses).
              </li>
            </ul>
            <h3 className="mt-5 text-lg font-semibold text-foreground">
              Practical considerations & caveats
            </h3>
            <ul className="mt-2 list-disc pl-6 space-y-2 text-foreground/90 leading-relaxed">
              <li>
                Use a large antecubital vein where possible — site is the single
                biggest modifiable factor; a hand vein hurts far more than a
                forearm or AC vein regardless of additive.
              </li>
              <li>
                Typical admixture: 1–2 mL of 1% (10 mg/mL) lidocaine added to 20 mL
                of 1% propofol immediately before induction. Avoid prolonged
                pre-mixing — lidocaine destabilises the lipid emulsion and can
                cause coalescence of oil droplets, with theoretical risk of fat
                embolism and altered pharmacokinetics.
              </li>
              <li>
                Alternatives or adjuncts: pre-treatment with IV opioid (alfentanil
                or remifentanil), cooling/warming the vein, slow injection into a
                running drip, or use of long/medium-chain triglyceride
                formulations (e.g. propofol-LCT/MCT) which independently reduce
                injection pain.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Molecular Structures</h2>
            <LocalAnaestheticStructures />
          </section>
          <ExamPitfallsCallout
            accent="pharmacology"
            pitfalls={[
              "Onset depends on pKa (closer to 7.4 = faster); duration depends on protein binding (higher = longer); potency depends on lipid solubility.",
              "Maximum safe doses: lidocaine 3 mg/kg (7 with adrenaline); bupivacaine 2 mg/kg; ropivacaine 3 mg/kg — body-weight ideal, not actual.",
              "LAST (local anaesthetic systemic toxicity): CNS first (perioral tingling, seizures), then cardiovascular collapse — bupivacaine is most cardiotoxic.",
              "Treat LAST: stop injection, ABC, control seizures, then 20% Intralipid 1.5 mL/kg bolus + 0.25 mL/kg/min infusion (RCoA/Association of Anaesthetists 2024 guideline).",
              "Adrenaline-containing solutions prolong duration and reduce systemic absorption; avoid in end-arteries (digits, penis, nose).",
            ]}
          />
        </div>
      </ExamSection>
          <TopicFaqs faqs={localAnaestheticsFaqs} />
          <AnaesthesiaDosingCallout focus="local anaesthetic maximum doses" />
        </>
      }
    />
  );
};

export default LocalAnaestheticsTopic;
