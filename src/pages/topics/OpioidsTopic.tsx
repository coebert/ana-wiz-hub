import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import OpioidReceptorDiagram from "@/components/diagrams/pharmacology/OpioidReceptorDiagram";
import { OpioidReceptorSignalingDiagram } from "@/components/diagrams/pharmacology/OpioidReceptorSignalingDiagram";
import { OpioidSignallingCascadeAnimation } from "@/components/diagrams/pharmacology/OpioidSignallingCascadeAnimation";
import { OIHToleranceDiagram } from "@/components/diagrams/pharmacology/OIHToleranceDiagram";
import { KetamineToleranceReversalDiagram } from "@/components/diagrams/pharmacology/KetamineToleranceReversalDiagram";

import { MethadonePharmacologyDiagram } from "@/components/diagrams/pharmacology/MethadonePharmacologyDiagram";
import { BuprenorphinePharmacologyDiagram } from "@/components/diagrams/pharmacology/BuprenorphinePharmacologyDiagram";
import { NaloxoneDiagram } from "@/components/diagrams/pharmacology/NaloxoneDiagram";
import { RemifentanilPKDiagram } from "@/components/diagrams/pharmacology/RemifentanilPKDiagram";
import CSHTDiagram from "@/components/diagrams/clinical/CSHTDiagram";
import OpioidStructures from "@/components/diagrams/pharmacology/OpioidStructures";
import { SynthesisBlock } from "@/components/topic/SynthesisBlock";
import { opioidsQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";


const opioidsFaqs: Array<[string, string]> = [
  [
    "Compare morphine, fentanyl and remifentanil pharmacokinetics.",
    "Morphine — onset 5–10 min IV, duration 3–4 h, active metabolite M6G accumulates in renal failure. Fentanyl — onset 2–3 min, duration 30 min single dose, highly lipid-soluble; CSHT rises with infusion duration. Remifentanil — onset 1 min, esterase metabolism, CSHT constant ~3 min regardless of duration; no active metabolites; ideal for short procedures or sedation in renal/hepatic failure but no residual analgesia."
  ],
  [
    "What is opioid-induced hyperalgesia and how is it managed?",
    "Paradoxical increase in pain sensitivity following high-dose opioid (especially remifentanil) exposure, mediated by NMDA-receptor sensitisation. Distinct from tolerance. Management: limit intra-op remifentanil dose, use multimodal analgesia (paracetamol, NSAIDs, ketamine 0.15–0.5 mg/kg, regional), magnesium, and α2-agonists. Pre-emptive long-acting opioid before infusion termination."
  ],
  [
    "How is opioid overdose recognised and reversed?",
    "Triad: pinpoint pupils, respiratory depression (RR <8 or apnoea), reduced GCS. Reversal: naloxone 100–400 µg IV titrated to respiratory rate (not consciousness — avoids precipitating withdrawal/pain). Half-life of naloxone (~30 min) is shorter than most opioids → infusion (5–10 µg/kg/h) or repeated dosing needed. In opioid-dependent patients, smaller doses (40 µg increments) to avoid acute withdrawal and pulmonary oedema."
  ]
];

const objectives = [
  "Describe µ, κ and δ receptor signalling (Gi/Go → ↓cAMP, K⁺ efflux, Ca²⁺ closure) and the clinical effects mediated by each.",
  "Compare morphine, fentanyl, alfentanil, remifentanil and sufentanil by potency, onset, duration, lipid solubility and metabolism.",
  "Explain the concept of context-sensitive half-time and apply it to choosing an opioid for short vs prolonged infusion.",
  "Distinguish opioid tolerance from opioid-induced hyperalgesia (OIH) — mechanisms, presentation and management.",
  "Outline the pharmacology of buprenorphine, methadone and naloxone and their perioperative implications.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Choosing an opioid for a 6-hour TIVA case",
    scenario:
      "You are planning TIVA for a 6-hour spinal scoliosis correction with motor-evoked potential monitoring. Why is remifentanil preferred over fentanyl, and what must you do at the end of the case?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>CSHT comparison.</strong> Fentanyl CSHT after 6 h infusion ≈ 200 min; remifentanil CSHT remains ≈ 3–4 min regardless of duration.</li>
          <li><strong>Mechanism.</strong> Remifentanil is hydrolysed by non-specific tissue and plasma esterases (not pseudocholinesterase) — clearance is independent of hepatic/renal function and infusion duration.</li>
          <li><strong>MEP compatibility.</strong> Opioids do not depress MEPs significantly, unlike volatiles. Remifentanil + propofol TIVA is the standard for neurosurgery requiring evoked-potential monitoring.</li>
          <li><strong>End-of-case planning.</strong> Rapid offset = no residual analgesia. Give a long-acting opioid (e.g. morphine 0.1 mg/kg IV) 20–30 min before stopping the remifentanil, plus paracetamol/NSAID and wound infiltration.</li>
          <li><strong>OIH risk.</strong> High-dose remifentanil (&gt; 0.2 µg/kg/min) for hours can precipitate hyperalgesia — consider ketamine 0.1–0.2 mg/kg/h infusion as cover.</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Stopping remifentanil without transition analgesia → severe pain within minutes.</li>
            <li>Confusing CSHT with elimination half-life — t½β of fentanyl (~3 h) is misleading after long infusions because of tissue accumulation.</li>
            <li>Forgetting that remifentanil causes profound bradycardia — have glycopyrrolate ready.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Remifentanil's CSHT is essentially constant (~4 min) due to ester metabolism, making it ideal for long cases and rapid wake-up. Bridge analgesia with morphine and multimodal adjuncts before stopping the infusion, and consider ketamine cover to mitigate OIH.",
   cites: ["BJA Educ 2016"],
  },
  {
    title: "Morphine in renal failure",
    scenario:
      "An 80-year-old woman with eGFR 18 mL/min is given morphine 10 mg IV 4-hourly post-op. After 24 h she becomes drowsy with pinpoint pupils and respiratory rate 6/min. Explain the metabolic basis and how you would switch.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Morphine metabolism.</strong> Hepatic glucuronidation produces M3G (~70 %, neuroexcitatory, no analgesia) and <strong>M6G (~10 %, potent µ-agonist)</strong>.</li>
          <li><strong>Renal excretion.</strong> Both metabolites are renally cleared. In severe renal impairment, M6G accumulates over 24–48 h causing delayed sedation and respiratory depression.</li>
          <li><strong>Manage the toxicity.</strong> Stop morphine. Naloxone 100 µg titrated IV (be aware of short duration — re-narcotisation likely → infusion 4–10 µg/kg/h).</li>
          <li><strong>Switch agent.</strong> Use opioids without active renal metabolites: <strong>fentanyl</strong>, <strong>alfentanil</strong>, <strong>buprenorphine</strong>, or <strong>oxycodone</strong> (caution — partly renally cleared but no active metabolite).</li>
          <li><strong>Reduce dose</strong>, lengthen interval, prefer PRN over regular dosing, and add multimodal analgesia (paracetamol, regional block) to minimise opioid load.</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Giving codeine or tramadol as a "safer" alternative — codeine relies on CYP2D6 conversion to morphine (same metabolite problem) and tramadol's M1 metabolite is also renally cleared.</li>
            <li>One bolus of naloxone in a chronic build-up of M6G — recurrence within 30–60 min is the rule, infusion is required.</li>
            <li>Forgetting non-opioid contributors: gabapentinoids and benzodiazepines also accumulate in renal failure.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "M6G accumulates in renal failure causing delayed respiratory depression. Stop morphine, titrate naloxone (likely as infusion), and switch to fentanyl, alfentanil or buprenorphine which lack active renally cleared metabolites.",
   cites: ["Peck & Hill Ch.6"],
  },
  {
    title: "Distinguishing tolerance from OIH",
    scenario:
      "A patient on long-term high-dose oxycodone for chronic pain reports worsening pain post-operatively despite morphine PCA. Pain has spread beyond the surgical site and is qualitatively different. Increasing the PCA bolus makes things worse. Tolerance or OIH — and what do you do?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Pattern recognition.</strong> Tolerance → pain in original distribution, responds to dose escalation. OIH → diffuse / new pain distribution, <em>worsens</em> with dose escalation, improves with dose reduction.</li>
          <li><strong>Mechanism of OIH.</strong> Central sensitisation via NMDA upregulation, descending facilitation from RVM, spinal dynorphin release and TLR4-mediated neuroinflammation.</li>
          <li><strong>Management.</strong> Reduce the opioid dose (or rotate to a structurally different agent). Add an NMDA antagonist — ketamine 0.1–0.25 mg/kg bolus then 0.1–0.2 mg/kg/h. Layer multimodal analgesia: paracetamol, NSAID, regional block, α₂-agonist (clonidine/dexmedetomidine), gabapentinoid, magnesium.</li>
          <li><strong>Confirm by response.</strong> Both can coexist — a trial of dose reduction with NMDA cover is both diagnostic and therapeutic.</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Escalating PCA limits when escalation is the cause — OIH gets worse.</li>
            <li>Rotating within the same chemical class (e.g. oxycodone → morphine) — incomplete cross-tolerance helps, but methadone (NMDA antagonism) or buprenorphine (partial agonism) are often more effective.</li>
            <li>Missing co-existing causes: surgical complication, undiagnosed neuropathic pain, withdrawal.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "OIH is suggested by diffuse new-distribution pain that worsens with dose escalation. Reduce or rotate the opioid (consider methadone or buprenorphine), add ketamine and multimodal adjuncts, and re-evaluate. Tolerance and OIH frequently coexist.",
   cites: ["Miller Ch.28"],
  },
];

const OpioidsTopic = () => {
  return (
    <TopicTemplate
      title="Opioid Pharmacology"
      subtitle="FRCA Primary — Pharmacology"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
      topicId="opioids"
      quizQuestions={opioidsQuiz}
      objectives={objectives}
      workedExamples={workedExamples}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY], curriculumCodes: ["PR_BK_05"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["PR_BK_05"] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["PR_BK_05"] },
      }}
      sectionSources={{
        objectives: ["BJA Educ 2016", "Peck & Hill Ch.6"],
        workedExamples: ["BJA Educ 2016", "Peck & Hill Ch.6", "Miller Ch.28"],
        keyPoints: ["BJA Educ 2016", "Peck & Hill Ch.6", "Miller Ch.28"],
      }}
      coreConcepts={
        <>
          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PR_BK_05"]}>
            <CollapsibleSubsection title="Introduction" defaultOpen>
            <p className="text-foreground/90 leading-relaxed">
              Opioids are the cornerstone of perioperative analgesia. Understanding receptor subtypes, the clinical pharmacology
              of individual agents, and their side effect profiles is essential for FRCA examinations and safe clinical practice.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PR_BK_05"]}>
            <CollapsibleSubsection title="Opioid receptors and signalling">
            <p className="text-foreground/90 leading-relaxed">
              Three classical receptors, all G-protein coupled (Gi/Go): <strong>µ (mu/MOP)</strong> — analgesia (supraspinal and
              spinal), respiratory depression, euphoria, physical dependence, miosis, ↓GI motility, bradycardia.
              <strong> κ (kappa/KOP)</strong> — spinal analgesia, sedation, dysphoria, diuresis. <strong>δ (delta/DOP)</strong>
              — spinal analgesia, modulation of µ receptor function.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              <strong>Signal transduction</strong>: receptor activation → Gi protein → ↓cAMP, opens K⁺ channels (hyperpolarisation),
              closes voltage-gated Ca²⁺ channels → inhibits neurotransmitter release and neuronal firing.
            </p>
            <div className="mt-4 space-y-4">
              <div className="bg-card rounded-xl border border-border p-4 md:p-6"><OpioidStructures /></div>
              <div className="bg-card rounded-xl border border-border p-4 md:p-6"><OpioidReceptorDiagram /></div>
              <div className="bg-card rounded-xl border border-border p-4 md:p-6"><OpioidReceptorSignalingDiagram /></div>
              <div className="bg-card rounded-xl border border-border p-4 md:p-6"><OpioidSignallingCascadeAnimation /></div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PR_BK_05"]}>
            <CollapsibleSubsection title="Morphine">
            <p className="text-foreground/90 leading-relaxed">
              Natural phenanthrene opioid. Dose: 0.1–0.2 mg/kg IV. Oral bioavailability ~30 % (extensive first-pass). Onset 15–20 min IV
              (poor lipid solubility, slow BBB penetration). Duration 3–4 h. Hepatic glucuronidation → <strong>M6G</strong> (active,
              accumulates in renal failure) and <strong>M3G</strong> (neuroexcitatory). Histamine release → hypotension, bronchospasm,
              urticaria. Sphincter of Oddi spasm. Nausea/vomiting (CTZ).
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PR_BK_05"]}>
            <CollapsibleSubsection title="Fentanyl">
            <p className="text-foreground/90 leading-relaxed">
              Synthetic phenylpiperidine. 100× potency of morphine. Dose 1–2 µg/kg IV. High lipid solubility → rapid onset
              (1–2 min) and short duration (30–45 min, redistribution). No histamine release. Minimal cardiovascular effects.
              CYP3A4 → inactive norfentanyl. Chest-wall rigidity with rapid high-dose injection. CSHT increases significantly
              with prolonged infusion.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PR_BK_05"]}>
            <CollapsibleSubsection title="Remifentanil">
            <p className="text-foreground/90 leading-relaxed">
              Ultra-short-acting synthetic opioid. Unique <strong>ester linkage</strong> → metabolised by non-specific tissue
              and plasma esterases (not plasma cholinesterase). CSHT ~3–4 min regardless of infusion duration. Ideal for TIVA.
              Must be given by infusion (0.05–0.5 µg/kg/min). Rapid offset mandates transition analgesia. May cause OIH after
              prolonged high-dose use. Dose reduction in elderly; no adjustment for renal/hepatic impairment. Bradycardia risk.
            </p>
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6"><RemifentanilPKDiagram /></div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PR_BK_05"]}>
            <CollapsibleSubsection title="Other µ-agonists">
            <p className="text-foreground/90 leading-relaxed">
              <strong>Alfentanil</strong>: low pKa 6.5 → 90 % un-ionised at pH 7.4 → faster onset than fentanyl despite lower
              lipid solubility. Smaller V<sub>d</sub>. Shorter duration. <strong>Sufentanil</strong>: 5–10× fentanyl potency,
              highest µ-receptor affinity. <strong>Codeine</strong>: prodrug, CYP2D6 → morphine (~10 % dose). Pharmacogenomic
              variation. <strong>Tramadol</strong>: weak µ + serotonin/noradrenaline reuptake inhibition. Serotonin syndrome
            </p>
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6"><MethadonePharmacologyDiagram /></div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PR_BK_05"]}>
            <CollapsibleSubsection title="Context-sensitive half-time">
            <p className="text-foreground/90 leading-relaxed">
              The CSHT is the time for plasma concentration to fall by 50 % after stopping an infusion of a given duration.
              Unlike elimination half-life, CSHT accounts for redistribution between compartments and is therefore <strong>dependent
              on the "context" of infusion duration</strong> — making it far more clinically useful for predicting recovery.
            </p>
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6"><CSHTDiagram /></div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PR_BK_05"]}>
            <CollapsibleSubsection title="Partial agonists & mixed agonist–antagonists">
            <p className="text-foreground/90 leading-relaxed">
              <strong>Buprenorphine</strong> — partial µ agonist + κ antagonist. High µ affinity (slow dissociation, hard to
              displace with naloxone). Ceiling for respiratory depression but not for analgesia. Sublingual ~30–55 % bioavailability.
              Safe in renal failure. <strong>Nalbuphine</strong> — κ agonist / µ antagonist. Useful to partially reverse µ-mediated
              respiratory depression while preserving κ-analgesia. <strong>Pentazocine</strong> — κ agonist with dysphoric and
              cardiovascular-stimulating effects; rarely used. All can precipitate withdrawal in opioid-dependent patients.
            </p>
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6"><BuprenorphinePharmacologyDiagram /></div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PR_BK_05"]}>
            <CollapsibleSubsection title="Tolerance vs opioid-induced hyperalgesia">
            <p className="text-foreground/90 leading-relaxed">
              <strong>Tolerance</strong> — rightward shift of dose–response curve; pain in original distribution responds to
              dose escalation. Mediated by receptor desensitisation/internalisation (β-arrestin pathway).
              <strong> OIH</strong> — paradoxical increased pain sensitivity; diffuse, qualitatively different pain that
              <em> worsens</em> with dose escalation. Mechanisms: NMDA upregulation, descending facilitation from RVM, spinal
              dynorphin, TLR4-mediated neuroinflammation. Management: opioid dose reduction or rotation, NMDA antagonists
              (ketamine), α₂-agonists, gabapentinoids, magnesium, multimodal analgesia.
            </p>
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6"><OIHToleranceDiagram /></div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PR_BK_05"]}>
            <CollapsibleSubsection title="Ketamine and “re-setting” opioid receptors in tolerant patients">
              <p className="text-foreground/90 leading-relaxed">
                Patients on long-term opioids frequently arrive with a right-shifted, flattened dose–response
                curve: escalating doses give diminishing analgesia and increasing side effects. The clinical
                observation that a <strong>low-dose ketamine infusion restores opioid responsiveness</strong> — often
                with a lower total opioid requirement afterwards — is widely described as “re-setting” or
                “re-sensitising” the opioid receptor. The phrase is a useful shorthand, but it is important to be
                precise about what it does and does not mean.
              </p>

              <div className="mt-3 rounded-md border border-primary/30 bg-primary/5 p-3">
                <p className="text-sm text-foreground/90 leading-relaxed">
                  <strong>What “re-set” really means.</strong> Ketamine does not bind the µ-opioid receptor (MOR) in any
                  clinically meaningful way at analgesic doses, and there is no human evidence that it restores
                  receptor <em>number</em>. What it does is interrupt the <strong>NMDA-receptor-dependent adaptive
                  plasticity</strong> that maintains tolerance and opioid-induced hyperalgesia (OIH), allowing the
                  pre-existing MOR population to signal effectively again. Functionally the patient behaves as if
                  the receptor has been re-set; mechanistically the change is in the downstream and network-level
                  adaptations, not in the receptor protein itself.<InlineRef topicId="opioids" refLabel="Mao 1995" />
                </p>
              </div>

              <h4 className="mt-5 font-semibold text-foreground">Why tolerance and OIH share a mechanism</h4>
              <p className="text-foreground/90 leading-relaxed mt-1">
                Sustained MOR agonism produces two parallel sets of changes. <strong>Receptor-level (homologous)
                desensitisation</strong>: GRK-mediated phosphorylation of the MOR C-terminus, β-arrestin-2 recruitment,
                uncoupling from Gi/Go and receptor internalisation, with agonist-specific differences (morphine
                internalises the receptor poorly and therefore desensitises without efficient resensitisation —
                one explanation for its relatively rapid tolerance). <strong>Network-level (heterologous)
                sensitisation</strong>: increased excitatory drive in the dorsal horn that opposes whatever analgesia
                remains. The second process is <em>NMDA-dependent</em>, and it is the target of ketamine.<InlineRef topicId="opioids" refLabel="Angst & Clark 2006" />
              </p>

              <h4 className="mt-5 font-semibold text-foreground">Molecular mechanisms — how ketamine reverses the adaptation</h4>
              <ol className="list-decimal list-outside ml-5 mt-2 space-y-2 text-foreground/90 leading-relaxed">
                <li>
                  <strong>Open-channel NMDA blockade (PCP site).</strong> Chronic opioid exposure removes the Mg²⁺
                  block and increases NMDA-receptor conductance. Ketamine binds within the open pore, use-dependently
                  silencing the sensitised receptors that carry most of the wind-up current while sparing normal
                  low-frequency transmission — the pharmacological basis for a low-dose, sub-anaesthetic infusion
                  being sufficient.
                </li>
                <li>
                  <strong>Interrupting the PKC → MOR phosphorylation loop.</strong> NMDA-mediated Ca²⁺ entry activates
                  protein kinase C, which phosphorylates the MOR and uncouples it from its G-protein
                  (heterologous desensitisation) <em>and</em> further relieves the Mg²⁺ block on NMDA receptors — a
                  self-reinforcing positive-feedback loop. Blocking NMDA breaks the loop; PKC activity falls and
                  MOR–G-protein coupling recovers. This is the closest mechanistic correlate of “re-setting”.<InlineRef topicId="opioids" refLabel="Mao 1995" />
                </li>
                <li>
                  <strong>Reduced Ca²⁺/CaMKII and nNOS–NO–cGMP signalling.</strong> CaMKII autophosphorylation and
                  nitric oxide generation in dorsal-horn neurones maintain long-term potentiation of nociceptive
                  synapses; both are downstream of NMDA Ca²⁺ flux and both fall with ketamine.
                </li>
                <li>
                  <strong>Attenuated descending facilitation and spinal dynorphin.</strong> Chronic opioids increase
                  on-cell activity in the rostral ventromedial medulla and upregulate spinal dynorphin, which
                  drives pro-nociceptive CGRP/substance-P release. NMDA blockade dampens this pain-facilitating arm.
                </li>
                <li>
                  <strong>Glial and neuroinflammatory modulation.</strong> Opioids activate microglia via TLR4/P2X7 →
                  IL-1β, TNF-α and BDNF release; BDNF–TrkB signalling downregulates the KCC2 chloride transporter and
                  converts GABA-ergic inhibition towards excitation. Ketamine has direct anti-inflammatory and
                  microglia-inhibiting actions in addition to its NMDA effect.
                </li>
                <li>
                  <strong>Reduced β-arrestin-2-biased signalling.</strong> Because ketamine allows the same analgesia at
                  a lower opioid dose, agonist occupancy and therefore GRK/β-arrestin-2 recruitment, receptor
                  internalisation and adenylyl-cyclase superactivation all fall — an indirect but real contribution
                  to restored receptor responsiveness.
                </li>
                <li>
                  <strong>Secondary targets.</strong> HCN1 channel inhibition, adenosine A₁-receptor recruitment,
                  monoaminergic reuptake inhibition, and — for the metabolite (2R,6R)-hydroxynorketamine — AMPA-receptor
                  and mTORC1-dependent synaptic plasticity that may explain benefits outlasting the infusion.
                </li>
              </ol>

              <div className="mt-6 bg-card rounded-xl border border-border p-4 md:p-6">
                <h2 className="text-base font-serif font-semibold text-foreground">
                  Animated: the seven mechanisms of ketamine-mediated tolerance reversal
                </h2>
                <KetamineToleranceReversalDiagram />
              </div>



              <h4 className="mt-5 font-semibold text-foreground">Study evidence</h4>
              <div className="mt-2 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2 text-foreground">Study</th>
                      <th className="text-left p-2 text-foreground">Design</th>
                      <th className="text-left p-2 text-foreground">Key finding</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="p-2 text-foreground font-medium">Trujillo &amp; Akil, <em>Science</em> 1991</td>
                      <td className="p-2 text-muted-foreground">Rodent, MK-801 + morphine</td>
                      <td className="p-2 text-muted-foreground">NMDA antagonism prevented development of morphine tolerance and dependence without blocking acute analgesia — the founding proof of concept.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="p-2 text-foreground font-medium">Joly et al., <em>Anesthesiology</em> 2005</td>
                      <td className="p-2 text-muted-foreground">RCT, major abdominal surgery, high-dose remifentanil</td>
                      <td className="p-2 text-muted-foreground">Small-dose ketamine (0.5 mg/kg then 5 µg/kg/min) abolished remifentanil-induced peri-incisional hyperalgesia and reduced morphine use — evidence that OIH is NMDA-mediated and preventable.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="p-2 text-foreground font-medium">Loftus et al., <em>Anesthesiology</em> 2010</td>
                      <td className="p-2 text-muted-foreground">RCT, 102 opioid-dependent patients, spinal surgery</td>
                      <td className="p-2 text-muted-foreground">Intra-operative ketamine (0.5 mg/kg bolus + 10 µg/kg/min) cut 48-h morphine equivalents by ~37 % and lowered pain scores at 6 weeks — the key trial in the tolerant population.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="p-2 text-foreground font-medium">Laskowski et al., <em>Can J Anaesth</em> 2011</td>
                      <td className="p-2 text-muted-foreground">Systematic review, 70 trials</td>
                      <td className="p-2 text-muted-foreground">IV ketamine reduced opioid consumption and pain scores in ~half of trials; greatest benefit in painful surgery and opioid-tolerant patients; no increase in psychotomimetic effects at low dose.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="p-2 text-foreground font-medium">Nielsen et al., <em>Pain</em> 2017</td>
                      <td className="p-2 text-muted-foreground">RCT, 147 opioid-dependent spinal-fusion patients</td>
                      <td className="p-2 text-muted-foreground">Ketamine reduced 0–24 h morphine consumption (median 79 vs 121 mg) with fewer patients requiring rescue — replication of Loftus in a larger cohort.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="p-2 text-foreground font-medium">Brinck et al., Cochrane 2018</td>
                      <td className="p-2 text-muted-foreground">Meta-analysis, 130 studies, 8341 participants</td>
                      <td className="p-2 text-muted-foreground">Perioperative IV ketamine reduces opioid consumption and postoperative nausea/vomiting; benefit is modest overall but consistent, with low adverse-event rates.</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="p-2 text-foreground font-medium">ASRA/AAPM/ASA consensus 2018</td>
                      <td className="p-2 text-muted-foreground">Guideline</td>
                      <td className="p-2 text-muted-foreground">Opioid tolerance/dependence is an explicitly supported indication; suggested bolus ≤ 0.35 mg/kg and infusion ≤ 1 mg/kg/h in a monitored setting.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-foreground/90 leading-relaxed mt-3">
                Honest appraisal for the viva: effect sizes are modest, heterogeneity is high, and no human study has
                demonstrated normalisation of receptor density or G-protein coupling — the “re-set” is inferred from
                restored opioid responsiveness, not measured directly. Some trials in opioid-naïve patients show
                little benefit, which is itself consistent with the mechanism: if there is no NMDA-dependent
                adaptation to reverse, ketamine has little to add beyond mild direct analgesia.<InlineRef topicId="opioids" refLabel="Brinck 2018" />
              </p>

              <h4 className="mt-5 font-semibold text-foreground">Practical regimen in the opioid-tolerant patient</h4>
              <ul className="list-disc list-outside ml-5 mt-2 space-y-1 text-foreground/90 leading-relaxed">
                <li><strong>Intra-operative:</strong> ketamine 0.25–0.5 mg/kg at induction, then 0.1–0.2 mg/kg/h (≈2–5 µg/kg/min), stopped at or shortly before closure.<InlineRef topicId="opioids" refLabel="Loftus 2010" /></li>
                <li><strong>Postoperative:</strong> 0.05–0.2 mg/kg/h for 24–72 h on a monitored ward, or a ketamine-containing PCA, with acute-pain-team review.<InlineRef topicId="opioids" refLabel="Schwenk 2018" /></li>
                <li><strong>Continue</strong> the patient's baseline opioid (do not attempt withdrawal perioperatively) and layer paracetamol, NSAID, regional block, α₂-agonist, magnesium and gabapentinoid.</li>
                <li><strong>Cautions:</strong> poorly controlled hypertension or ischaemic heart disease, raised ICP with impaired autoregulation, psychosis, severe hepatic impairment; add a benzodiazepine only if psychotomimetic effects emerge (routine co-administration is not recommended).</li>
                <li><strong>Set expectations:</strong> the goal is functional analgesia and a reduced opioid requirement, not zero pain, and the effect on tolerance is partial and may not persist for months.</li>
              </ul>
            </CollapsibleSubsection>
          </ExamSection>


          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PR_BK_05"]}>
            <CollapsibleSubsection title="Naloxone">
            <p className="text-foreground/90 leading-relaxed">
              Competitive µ, κ, δ antagonist. IV dose 1–4 µg/kg titrated. Onset 1–2 min. Duration 30–60 min — shorter than most
              opioids → risk of re-narcotisation; consider infusion (4–10 µg/kg/h). Pulmonary oedema and cardiovascular collapse
              can follow excessive or rapid administration in opioid-tolerant patients.
            </p>
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6"><NaloxoneDiagram /></div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PR_BK_05"]}>
            <SynthesisBlock
              title="Comparative pharmacology of µ-opioids"
              subtitle="Side-by-side reference for the major perioperative µ-agonists."
              variant="table"
            >
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-2 text-foreground">Agent</th>
                    <th className="text-left p-2 text-foreground">Potency (vs morphine)</th>
                    <th className="text-left p-2 text-foreground">Onset</th>
                    <th className="text-left p-2 text-foreground">Key feature</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Morphine", "1", "15–20 min", "M6G active metabolite; histamine release"],
                    ["Fentanyl", "100", "1–2 min", "Chest-wall rigidity; ↑ CSHT with infusion"],
                    ["Alfentanil", "10–20", "<1 min", "Low pKa 6.5 → 90 % un-ionised, rapid onset"],
                    ["Remifentanil", "100–200", "1 min", "Ester metabolism, constant CSHT ~4 min"],
                    ["Sufentanil", "500–1000", "1–2 min", "Highest µ affinity, cardiac surgery"],
                  ].map(([agent, potency, onset, feature]) => (
                    <tr key={agent} className="border-b border-border/50">
                      <td className="p-2 text-foreground font-medium">{agent}</td>
                      <td className="p-2 text-muted-foreground">{potency}</td>
                      <td className="p-2 text-muted-foreground">{onset}</td>
                      <td className="p-2 text-muted-foreground">{feature}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SynthesisBlock>
          </ExamSection>
          <ExamPitfallsCallout
            accent="pharmacology"
            pitfalls={[
              "μ-receptor agonism mediates analgesia, respiratory depression, miosis, euphoria and constipation — all dose-related and reversed by naloxone.",
              "Remifentanil: ester-linked, metabolised by non-specific esterases; context-sensitive half-time ~4 min independent of infusion duration.",
              "Morphine-6-glucuronide is an active metabolite — accumulates in renal failure → prolonged respiratory depression.",
              "Pethidine metabolite norpethidine is pro-convulsant; avoid in renal failure and with MAOIs (serotonin syndrome risk).",
              "Tramadol acts via μ-receptor and serotonin/noradrenaline reuptake inhibition; lowers seizure threshold and interacts with SSRIs.",
            ]}
          />
        </>
      }
      keyPoints={[
        { text: "Three opioid receptors (µ, κ, δ) — all Gi-coupled. µ mediates analgesia, respiratory depression and dependence.", cites: ["BJA Educ 2016"] },
        { text: "Morphine: M6G (active, accumulates in renal failure), M3G (neuroexcitatory). Histamine release.", cites: ["Miller Ch.28"] },
        { text: "Fentanyl: 100× morphine potency, rapid onset due to lipid solubility. CSHT increases with infusion duration.", cites: ["Peck & Hill Ch.6"] },
        { text: "Remifentanil: ester metabolism by tissue esterases. Constant CSHT ~4 min. Requires transition analgesia on cessation.", cites: ["BJA Educ 2016"] },
        { text: "Alfentanil: pKa 6.5 → 90 % un-ionised → fastest onset despite lower lipid solubility than fentanyl.", cites: ["Miller Ch.28"] },
        { text: "Naloxone: competitive antagonist, duration 30–60 min. Risk of re-narcotisation — titrate carefully and consider infusion.", cites: ["Peck & Hill Ch.6"] },
        { text: "OIH: diffuse new-distribution pain that worsens with dose escalation. Manage with dose reduction, opioid rotation, ketamine and multimodal analgesia.", cites: ["BJA Educ 2016"] },
        { text: "Ketamine \u201Cre-sets\u201D opioid responsiveness by blocking NMDA-dependent plasticity (PKC\u2013MOR uncoupling loop, CaMKII/nNOS, descending facilitation, glial BDNF\u2013KCC2) \u2014 not by acting at the \u00B5 receptor or restoring receptor number.", cites: ["Mao 1995", "Angst & Clark 2006"] },
        { text: "Evidence: Trujillo & Akil 1991 (NMDA antagonism prevents tolerance), Joly 2005 (prevents remifentanil OIH), Loftus 2010 and Nielsen 2017 (~30\u201340 % less opioid in tolerant spinal-surgery patients); Cochrane 2018 confirms a modest but consistent opioid-sparing effect.", cites: ["Trujillo & Akil 1991", "Loftus 2010", "Nielsen 2017", "Brinck 2018"] },
        { text: "Regimen in tolerant patients: 0.25\u20130.5 mg/kg bolus then 0.1\u20130.2 mg/kg/h intra-op, 0.05\u20130.2 mg/kg/h for 24\u201372 h post-op; continue baseline opioid and add multimodal adjuncts.", cites: ["Schwenk 2018"] },
      ]}

    />
  );
};

export default OpioidsTopic;
