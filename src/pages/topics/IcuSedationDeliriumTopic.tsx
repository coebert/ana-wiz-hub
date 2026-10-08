import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { Exam } from "@/data/curriculum";
import { ExamSection } from "@/components/exam/ExamSection";
import { icuSedationDeliriumQuestions } from "@/data/quizzes";
import { ICUSedationComparisonDiagram } from "@/components/diagrams/intensive-care/ICUSedationComparisonDiagram";
import { CAMICUFlowchartDiagram } from "@/components/diagrams/intensive-care/CAMICUFlowchartDiagram";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { Cite } from "@/components/references/Cite";
import { DrugDosesCallout } from "@/components/icu/DrugDosesCallout";
import { InlineRef } from "@/components/references/InlineRef";

const icuSedationDeliriumFaqs: Array<[string, string]> = [
  ["What does the ABCDEF bundle entail?", "Assess/treat pain, Both spontaneous awakening and breathing trials, Choice of sedation, Delirium monitoring, Early mobility, Family engagement; higher bundle adherence was associated with lower mortality and less delirium in a large observational collaborative (Pun et al., Crit Care Med 2019)."],
  ["Which sedation agent is preferred for delirium prevention?", "PADIS suggests propofol or dexmedetomidine over benzodiazepines. Dexmedetomidine reduced delirium vs midazolam/lorazepam (SEDCOM, MENDS), but MENDS2 found no difference vs propofol in sepsis and SPICE III showed no mortality benefit. Reserve benzodiazepines for specific indications such as alcohol withdrawal or seizures."],
  ["How is ICU delirium screened?", "CAM-ICU or ICDSC at least once per shift; CAM-ICU requires RASS −3 or lighter and assesses acute change/fluctuation, inattention (letters test: >2 errors), altered level of consciousness (RASS other than 0) and disorganised thinking (>1 error)."],
];

const objectives = [
  "Score sedation depth using RASS and target light sedation (0 to −2) unless a specific indication for deep sedation exists.",
  "Compare propofol, midazolam, dexmedetomidine and remifentanil for ICU sedation, including PRIS risk and pharmacokinetics in organ failure.",
  "Screen for delirium with CAM-ICU and apply the ABCDEF bundle (associated with fewer ventilator days, less delirium and lower mortality).",
  "Manage hyperactive and hypoactive delirium with non-pharmacological measures first; recognise that haloperidol has not improved outcomes in trials (MIND-USA, AID-ICU, REDUCE).",
  "Recognise, prevent and treat propofol infusion syndrome (PRIS).",
  "Apply daily Spontaneous Awakening (SAT) and Spontaneous Breathing (SBT) trials safely.",
  "Describe the role and limitations of processed EEG for sedation titration and seizure detection in ICU.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Suspected propofol infusion syndrome",
    scenario: (
      <>
        25-year-old with severe TBI, day 4 of ventilation. Propofol 5 mg/kg/h for ICP control plus
        noradrenaline. Now: lactate 6.5, K⁺ 6.1, CK 8000, ECG with new RBBB and Brugada-like ST changes.
      </>
    ),
    working: (
      <>
        PRIS has no formal diagnostic criteria. Classic risk: propofol &gt; 4 mg/kg/h for &gt; 48 h (cases
        occur at lower doses), with metabolic acidosis, rhabdomyolysis, hyperkalaemia, cardiac dysfunction. Mechanism: impaired free fatty acid oxidation and
        mitochondrial dysfunction.
      </>
    ),
    answer: (
      <>
        Stop propofol immediately. Switch to midazolam or dexmedetomidine (± analgesia with fentanyl/
        alfentanil). Treat hyperkalaemia, support haemodynamics, consider CRRT. For ongoing ICP control
        consider thiopentone. Consider ECMO for refractory cardiogenic shock. Reported mortality is high (about 1 in 5 of published cases).
      </>
    ),
    cites: ["Krajčová PRIS 2015"],
  },
  {
    title: "CAM-ICU positive after extubation delay",
    scenario: (
      <>
        Day 6 ventilated pneumonia. RASS −1. Nurse reports the patient is inattentive, pulls at lines
        intermittently and is disoriented. Sedation has been midazolam infusion + intermittent
        haloperidol PRN.
      </>
    ),
    working: (
      <>
        CAM-ICU: acute fluctuating course (yes) + inattention (yes) + altered consciousness or
        disorganised thinking (yes) → delirium positive. Midazolam is a reversible risk factor;
        haloperidol has not improved delirium outcomes in trials (MIND-USA, AID-ICU).
      </>
    ),
    answer: (
      <>
        Stop midazolam and haloperidol. Switch to propofol or dexmedetomidine (PADIS suggests dexmedetomidine where agitation is preventing weaning). Apply ABCDEF
        bundle: assess pain, daily SAT/SBT, choose dex, reorient, mobilise early, family at bedside,
        sleep hygiene (cluster care, earplugs, eye mask). Reassess CAM-ICU each shift.
      </>
    ),
    cites: ["SCCM PADIS 2018", "MIND-USA 2018", "AID-ICU 2022"],
  },
  {
    title: "Daily SAT/SBT — when to abort",
    scenario: (
      <>
        Stable ARDS patient day 5, FiO₂ 0.4, PEEP 8, RASS −2 on propofol + alfentanil. SAT begun:
        propofol stopped. After 30 min: RR 35, SpO₂ 88 %, HR 130, agitated, SBP 180.
      </>
    ),
    working: (
      <>
        ABC trial SAT failure criteria: sustained anxiety, agitation or pain; RR &gt; 35 for ≥ 5 min;
        SpO₂ &lt; 88 % for ≥ 5 min; acute arrhythmia; ≥ 2 signs of respiratory distress. Restart sedation at half the previous rate, then titrate.
      </>
    ),
    answer: (
      <>
        Restart propofol at half the prior rate. Reassess pain (alfentanil bolus if appropriate). Retry
        SAT in 24 h with anticipatory analgesia and consider switch to dexmedetomidine to allow
        cooperative arousal. Document failure mode for the next attempt.
      </>
    ),
    cites: ["ABC Trial 2008"],
  },
];

const keyPoints = [
  { text: "Target light sedation (RASS 0 to −2) with daily sedation holds — associated with shorter ventilation and better ICU outcomes", cites: ["SCCM PADIS 2018", "ABC Trial 2008"] },
  { text: "PRIS risk: propofol >4 mg/kg/h for >48h → metabolic acidosis, rhabdomyolysis, hyperkalaemia, cardiac failure (can occur at lower doses)", cites: ["Krajčová PRIS 2015"] },
  { text: "CAM-ICU = acute onset/fluctuating course + inattention + (altered consciousness OR disorganised thinking)", cites: ["Ely CAM-ICU 2001", "CAM-ICU Training Manual"] },
  { text: "ABCDEF bundle (Assess pain, Both SAT/SBT, Choice of sedation, Delirium monitoring, Early mobility, Family) is associated with less delirium and lower mortality (observational data)", cites: ["Pun ABCDEF 2019"] },
  { text: "Prefer propofol or dexmedetomidine over benzodiazepines; SPICE III (early dexmedetomidine) and MENDS2 (dex vs propofol in sepsis) showed no mortality benefit", cites: ["SCCM PADIS 2018", "SPICE III 2019", "MENDS2 2021"] },
  { text: "Routine haloperidol has not improved outcomes for treating (MIND-USA, AID-ICU) or preventing (REDUCE) ICU delirium", cites: ["MIND-USA 2018", "AID-ICU 2022", "REDUCE 2018"] },
  { text: "Avoid benzodiazepines for routine sedation — associated with delirium and longer ventilation", cites: ["SCCM PADIS 2018"] },
  { text: "Non-pharmacological measures (sleep hygiene, reorientation, mobilisation, family) are first-line for delirium", cites: ["SCCM PADIS 2018"] },
  { text: "Processed EEG is an adjunct (not replacement) for sedation scoring — most useful during deep sedation or paralysis; continuous EEG detects non-convulsive seizures missed clinically in ~19% of monitored ICU patients", cites: ["SCCM PAD 2013", "Claassen NCS 2004", "ACNS cEEG 2015"] },
];

const IcuSedationDeliriumTopic = () => {
  return (
    <TopicTemplate
      title="ICU Sedation & Delirium"
      subtitle="FRCA / FFICM — Intensive Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={keyPoints}
      topicId="icu-sedation-delirium"
      topicTitle="ICU Sedation & Delirium"
      quizQuestions={icuSedationDeliriumQuestions}
      sectionSources={{
        objectives: ["SCCM PADIS 2018", "Reade NEJM 2014"],
        workedExamples: ["Krajčová PRIS 2015", "SCCM PADIS 2018", "ABC Trial 2008"],
        keyPoints: ["SCCM PADIS 2018", "Pun ABCDEF 2019", "CAM-ICU Training Manual"],
      }}
      sectionExamMapping={{
        objectives: { exams: [Exam.FFICM, Exam.EDIC] },
        workedExamples: { exams: [Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FFICM, Exam.EDIC] },
      }}
      coreConcepts={
        <>
        <ExamSection exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
        <section className="space-y-6">
          <DrugDosesCallout focus="sedation, analgesia and neuromuscular blocking infusions" />
          {/* RASS */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Sedation Assessment (RASS)</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Target light sedation (RASS 0 to −2) unless a specific indication for deep sedation exists
              <InlineRef topicId="icu-sedation-delirium" refLabel="SCCM PADIS 2018" />. Daily
              sedation holds (SAT) paired with spontaneous breathing trials (SBT) reduced ventilator days and
              1-year mortality in the ABC trial<InlineRef topicId="icu-sedation-delirium" refLabel="ABC Trial 2008" />. Early deep sedation is associated with longer ventilation and higher mortality, so each day of deep sedation must be justified
              against one of the following indications:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mb-3">
              <li>
                <strong>Severe ARDS</strong> — to secure ventilator synchrony, permit low tidal volume /
                prone positioning and prevent patient self-inflicted lung injury (P-SILI); mandatory when
                neuromuscular blockade is used.
              </li>
              <li>
                <strong>Refractory intracranial hypertension</strong> — reduces CMRO₂ and cerebral blood
                volume, blunts coughing and ventilator dyssynchrony that spike ICP.
              </li>
              <li>
                <strong>Status epilepticus</strong> — anaesthetic infusions titrated to seizure suppression
                or EEG burst suppression.
              </li>
              <li>
                <strong>Targeted temperature management / therapeutic hypothermia</strong> — to abolish
                shivering, which raises CMRO₂, CO₂ production and metabolic demand.
              </li>
              <li>
                <strong>Unmanageable agitation</strong> posing immediate danger to the patient (line/tube
                removal) or staff, after non-pharmacological measures and analgesia have failed.
              </li>
              <li>
                Other short-lived needs: <strong>ECMO cannulation</strong>, transport of the unstable
                patient, and open-abdomen/proning procedures.
              </li>
            </ul>
            <p className="text-sm text-muted-foreground mb-3">
              Where an indication exists, document it, set an explicit RASS target, and reassess daily for
              de-escalation. Adopt an <strong>analgesia-first</strong> approach — treat pain before
              deepening sedation.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">RASS</th>
                    <th className="text-left py-2 text-foreground font-semibold">Term</th>
                    <th className="text-left py-2 text-foreground font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">+4</td><td>Combative</td><td>Violent, immediate danger to staff</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">+1 to +3</td><td>Agitated</td><td>Anxious, aggressive, pulling at lines</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">0</td><td>Alert &amp; calm</td><td>Spontaneously attentive</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">−1 to −2</td><td>Light sedation</td><td>Drowsy, eye opening to voice (&gt; 10 s)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">−3 to −4</td><td>Moderate / deep</td><td>Movement or eye opening to voice or physical stimulation</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">−5</td><td>Unarousable</td><td>No response to voice or physical stimulation</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Sedative agents */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Sedative Agents</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { agent: "Propofol", pros: "Rapid onset/offset, anti-emetic, reduces ICP and CMRO₂", cons: "Hypotension, hypertriglyceridaemia, PRIS at >4 mg/kg/h for >48 h, lipid load" },
                { agent: "Midazolam", pros: "Anxiolytic, amnestic, anticonvulsant", cons: "Active metabolite (α-hydroxymidazolam glucuronide) accumulates in renal failure; prolonged sedation; independent risk factor for delirium" },
                { agent: "Dexmedetomidine", pros: "α₂-agonist; cooperative sedation, minimal respiratory depression, sympatholytic, fewer delirium days than benzodiazepines (SEDCOM, MENDS)", cons: "Bradycardia, hypotension, limited depth of sedation; SPICE III: more bradycardia/hypotension and no mortality benefit" },
                { agent: "Alfentanil / Remifentanil", pros: "Analgesia-based sedation; remifentanil offset independent of organ function (esterase metabolism)", cons: "Chest wall rigidity at high doses; remifentanil-induced hyperalgesia and acute tolerance" },
              ].map((a) => (
                <div key={a.agent} className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{a.agent}</p>
                  <p className="text-xs text-muted-foreground mt-1"><strong className="text-foreground">Pros:</strong> {a.pros}</p>
                  <p className="text-xs text-muted-foreground mt-1"><strong className="text-foreground">Cons:</strong> {a.cons}</p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <ICUSedationComparisonDiagram />
            </div>
          </div>

          {/* Processed EEG monitoring */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Processed EEG Monitoring in ICU
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Processed EEG (pEEG — e.g. BIS, SedLine/PSI, Narcotrend) condenses raw frontal EEG into a
              dimensionless index (roughly 0–100) using spectral and burst-suppression features. In ICU it
              has two distinct roles: <strong className="text-foreground">titrating sedation depth</strong> and{" "}
              <strong className="text-foreground">detecting cerebral abnormalities such as non-convulsive
              seizures</strong>.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Sedation titration</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Clinical scales (RASS, SAS) remain first-line. The SCCM PAD guideline suggests objective brain-function monitoring as an{" "}
                  <em>adjunct</em> in patients receiving neuromuscular blockade, and recommends against it as the
                  primary sedation measure in non-comatose, non-paralysed patients
                  <Cite topicId="icu-sedation-delirium" labels={["SCCM PAD 2013"]} />. Indices correlate imperfectly
                  with RASS: electromyographic artefact, frontal dominance of the montage and
                  agent-specific EEG signatures (dexmedetomidine slow-delta spindles vs propofol alpha)
                  all degrade accuracy.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Seizure &amp; abnormality detection</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Most ICU seizures are non-convulsive and invisible clinically. Continuous EEG detects
                  electrographic seizures in ~19% of monitored critically ill patients, 92% entirely
                  non-convulsive
                  <Cite topicId="icu-sedation-delirium" labels={["Claassen NCS 2004"]} />. The CERTA
                  randomised trial found continuous EEG detected more seizures and led to more antiseizure
                  treatment changes than repeated routine EEG, with no difference in 6-month mortality
                  <Cite topicId="icu-sedation-delirium" labels={["CERTA Trial 2020"]} />. Raw-EEG review (or
                  quantitative displays such as density spectral array) is needed — a pEEG index alone cannot
                  exclude seizures.
                </p>
              </div>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Indications for continuous EEG</strong> (ACNS consensus):
                persistent altered consciousness after convulsive status, acute brain injury (TBI, SAH,
                cardiac arrest), suspected non-convulsive status, and paralysed patients at seizure risk
                <Cite topicId="icu-sedation-delirium" labels={["ACNS cEEG 2015"]} />.
              </li>
              <li>
                <strong className="text-foreground">Practical use for sedation:</strong> track the trend, not
                a single number; a falling index with rising burst-suppression ratio signals excessive depth
                and prompts dose reduction — useful during deep sedation for ICP crises, status asthmaticus
                or ECMO.
              </li>
              <li>
                <strong className="text-foreground">Limitations:</strong> no validated outcome benefit for
                routine pEEG-guided sedation; indices do not distinguish sedative agents, miss focal/posterior
                seizures on frontal montages, and are confounded by hypothermia, metabolic encephalopathy and
                EMG artefact.
              </li>
            </ul>
          </div>

          {/* Delirium */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ICU Delirium</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Affects up to 80 % of ventilated patients<InlineRef topicId="icu-sedation-delirium" refLabel="Ely CAM-ICU 2001" />. Independently associated with increased
              mortality, prolonged ventilation and long-term cognitive impairment. Three subtypes:
              pure hyperactive (uncommon, easily recognised), hypoactive (common, frequently missed) and
              mixed. Screen with CAM-ICU each shift.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">CAM-ICU</p>
                <p className="text-sm text-muted-foreground mt-1">
                  4 features: (1) acute onset / fluctuating course + (2) inattention + (3) altered
                  consciousness OR (4) disorganised thinking. Positive = 1 + 2 + (3 or 4).
                  Feature 2: letters test, &gt; 2 errors = positive. Feature 3: any RASS other than 0.
                  Feature 4: 4 yes/no questions + 2-step command; &gt; 1 error = positive
                  <Cite topicId="icu-sedation-delirium" labels={["CAM-ICU Training Manual"]} />.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">ABCDEF bundle</p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>A</strong>ssess pain · <strong>B</strong>oth SAT &amp; SBT · <strong>C</strong>hoice
                  of sedation · <strong>D</strong>elirium monitoring · <strong>E</strong>arly mobility ·
                  <strong> F</strong>amily engagement. Higher adherence is associated with less delirium and lower mortality<InlineRef topicId="icu-sedation-delirium" refLabel="Pun ABCDEF 2019" />.
                </p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1 mt-2">
                  <li><strong>A — Assess, prevent and manage pain:</strong> validated scores (CPOT or BPS if unable to self-report; NRS if able).</li>
                  <li><strong>B — Both SAT and SBT:</strong> daily, paired, after a safety screen (no active seizures, alcohol withdrawal, escalating sedation for agitation, neuromuscular blockade, myocardial ischaemia or raised ICP for the SAT; adequate oxygenation on FiO₂ ≤0.5 and PEEP ≤8, no high-dose vasopressors for the SBT).</li>
                  <li><strong>C — Choice of analgesia and sedation:</strong> analgesia first, light sedation targeting RASS 0 to −2, avoid benzodiazepines (propofol or dexmedetomidine preferred).</li>
                  <li><strong>D — Delirium: assess, prevent and manage:</strong> screen with CAM-ICU or ICDSC at least once per shift and link positive screens to the non-drug measures below.</li>
                  <li><strong>E — Early mobility and exercise:</strong> protocolised progression to reduce ICU-acquired weakness and shorten delirium.</li>
                  <li><strong>F — Family engagement and empowerment:</strong> families help reorient, comfort and take part in rounds and care.</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Evidence:</strong> in the ICU Liberation Collaborative (Pun 2019, &gt;15,000 adults in 68 ICUs), complete bundle performance was associated with lower hospital death, less next-day mechanical ventilation, coma, delirium and physical restraint use, and fewer ICU readmissions — with a dose–response effect as more components were delivered. These are observational data.<InlineRef topicId="icu-sedation-delirium" refLabel="Pun ABCDEF 2019" />
                </p>
              </div>
            </div>
            <CAMICUFlowchartDiagram />
          </div>

          {/* Pain assessment in the non-verbal patient */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Pain Assessment in the Non-Verbal Patient
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Untreated pain is a leading driver of agitation, ventilator dyssynchrony and delirium, so the
              &lsquo;A&rsquo; of the ABCDEF bundle must be delivered with a validated tool.{" "}
              <strong>Patient self-report (0–10 NRS) remains the gold standard</strong>; where sedation,
              delirium or an artificial airway makes self-report impossible, a validated behavioural scale is
              recommended — either the <strong>Critical-Care Pain Observation Tool (CPOT)</strong> or the{" "}
              <strong>Behavioural Pain Scale (BPS)</strong>
              <InlineRef topicId="icu-sedation-delirium" refLabel="SCCM PADIS 2018" />. Vital signs alone
              (tachycardia, hypertension) are <em>not</em> valid indicators of pain and should only prompt
              formal assessment.
            </p>
            <div className="overflow-x-auto mb-3">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">CPOT domain</th>
                    <th className="text-left py-2 text-foreground font-semibold">Score 0</th>
                    <th className="text-left py-2 text-foreground font-semibold">Score 1</th>
                    <th className="text-left py-2 text-foreground font-semibold">Score 2</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Facial expression</td><td>Relaxed, neutral</td><td>Tense (brow lowering, orbit tightening)</td><td>Grimacing, eyelids tightly closed</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Body movements</td><td>Absence of movement</td><td>Protective — slow, cautious, guarding site</td><td>Restless — pulling tube, striking staff, out of bed</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Muscle tension (passive flexion of forearm)</td><td>Relaxed</td><td>Tense, rigid</td><td>Very tense or rigid, resists passive movement</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Compliance with ventilator (intubated) <em>or</em> vocalisation (extubated)</td><td>Tolerating ventilator / normal tone or silent</td><td>Coughing but tolerating / sighing, moaning</td><td>Fighting ventilator, alarms triggered / crying out, sobbing</td></tr>
                </tbody>
              </table>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>Each of the four domains scores <strong>0–2</strong>, giving a total of <strong>0–8</strong>.</li>
              <li>
                A <strong>CPOT &gt; 2</strong> indicates significant pain and should trigger analgesia and
                reassessment (BPS equivalent: score &gt; 5 of 3–12).
              </li>
              <li>
                Assess at least once per shift, before and after procedures (turning, suctioning, dressing
                changes) and after any analgesic intervention.
              </li>
              <li>
                Adopt <strong>analgo-sedation</strong>: treat pain first with opioid ± regional or
                multimodal adjuncts before adding or deepening sedation.
              </li>
              <li>
                Neuromuscular blockade abolishes every behavioural cue — rely on depth-of-sedation
                monitoring plus a fixed analgesic regimen rather than a behavioural score.
              </li>
            </ul>
          </div>

          {/* Prevention & treatment */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Delirium Prevention &amp; Treatment</h2>
            <div className="space-y-2">
              {[
                { approach: "Non-pharmacological (first-line)", detail: "Sleep hygiene (cluster nocturnal interventions, earplugs, eye masks, light/dark cycling, avoid overnight bloods/washes/radiology where safe), early mobilisation, reorientation, cognitive stimulation, family presence, minimise benzodiazepines, optimise hearing aids/glasses. PADIS suggests multicomponent non-drug strategies; no drug reliably prevents or shortens delirium." },
                { approach: "Dexmedetomidine", detail: "PADIS suggests it for ventilated adults whose agitation is preventing weaning or extubation. SPICE III (early sedation): no mortality difference vs usual care, more bradycardia and hypotension." },
                { approach: "Haloperidol / atypical antipsychotics", detail: "MIND-USA and AID-ICU (treatment) and REDUCE (prevention): no improvement in key outcomes. Reserve for distressing hyperactive symptoms not controlled by non-pharmacological measures; balance against QT prolongation and EPSE." },
                { approach: "Propofol infusion syndrome (PRIS)", detail: "Triad: metabolic acidosis + rhabdomyolysis/hyperkalaemia + cardiac dysfunction (Brugada-like ECG, RBBB). Risk: >4 mg/kg/h for >48 h (lower doses also reported), young patients, catecholamine or steroid use, low carbohydrate intake. Treat: stop propofol, switch agent, supportive care, CRRT for refractory acidosis/hyperkalaemia." },
              ].map((a) => (
                <div key={a.approach} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="font-semibold text-foreground text-sm">{a.approach}</p>
                  <p className="text-sm text-muted-foreground mt-1">{a.detail}</p>
                </div>
              ))}
            </div>
            <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Non-Pharmacological Management in Detail</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              Non-pharmacological, bundled care is the cornerstone of both prevention and treatment; no drug
              reliably shortens delirium.<InlineRef topicId="icu-sedation-delirium" refLabel="SCCM PADIS 2018" /> Deliver
              it as an explicit daily checklist rather than ad-hoc measures:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
              <li><strong>Orientation:</strong> visible clock and calendar, name board, staff introducing themselves by name and stating day, place and reason for admission at every contact.</li>
              <li><strong>Sensory optimisation:</strong> glasses, hearing aids and dentures in place before any assessment or conversation; interpreter for language barriers.</li>
              <li><strong>Sleep protocol:</strong> lights and blinds cycled to day/night, noise reduction (alarm limits, quiet hour), earplugs and eye masks, clustering of nursing interventions, avoiding non-urgent overnight procedures, drugs and feeds.</li>
              <li><strong>Mobilisation and physiotherapy:</strong> early, protocolised progression from passive range of movement to sitting out, standing and walking, coordinated with the daily sedation hold.</li>
              <li><strong>Cognitive stimulation:</strong> conversation, reading, music, television or radio chosen by the patient, and simple cognitive tasks once awake.</li>
              <li><strong>Family involvement:</strong> liberal, flexible visiting, family diaries, familiar objects and photographs, and family help with reorientation.</li>
              <li><strong>Screen for causes daily (&lsquo;I WATCH DEATH&rsquo;-style checklist):</strong><InlineRef topicId="icu-sedation-delirium" refLabel="van den Boogaard 2019" />
                <ul className="list-[circle] pl-5 mt-1 space-y-1">
                  <li><em>Drugs:</em> review for deliriogenic drugs — benzodiazepines, opioids, anticholinergics, steroids.</li>
                  <li><em>Electrolytes:</em> sodium, calcium, magnesium and phosphate; correct gradually.</li>
                  <li><em>Lack of drugs:</em> withdrawal from alcohol, benzodiazepines, nicotine or opioids.</li>
                  <li><em>Infection:</em> chest, lines, urine, abdomen and wounds.</li>
                  <li><em>Reduced sensory input:</em> glasses and hearing aids in place.</li>
                  <li><em>Intracranial:</em> stroke, haemorrhage, seizures (consider EEG for non-convulsive status).</li>
                  <li><em>Urinary retention and constipation:</em> bladder scan, bowel chart and treatment.</li>
                  <li><em>Myocardial and metabolic:</em> hypoxia, hypercapnia, hypo/hyperglycaemia, shock, and liver or renal failure.</li>
                </ul>
              </li>
              <li><strong>Physiological and iatrogenic triggers:</strong> treat pain first (analgesia-first sedation), correct hypoxia, hypercapnia, hypoglycaemia, sodium disturbance, sepsis, constipation and urinary retention; remove catheters, lines and restraints as early as possible; review the drug chart for anticholinergics and benzodiazepines.</li>
            </ul>
          </div>


          {/* Daily SAT/SBT */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Daily SAT &amp; SBT</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Spontaneous Awakening Trial (SAT)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Stop all sedative (and usually opioid) infusions each morning, then assess wakefulness.
                  Failure: sustained agitation, RR &gt; 35 for &gt; 5 min, SpO₂ &lt; 88 %, acute arrhythmia or
                  distress — restart at half the prior rate and re-attempt the next day.
                </p>
                <p className="text-sm font-semibold text-foreground mt-2">Do not start a SAT if any of these apply:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1 text-sm text-muted-foreground">
                  <li>Neuromuscular blockade in use (the patient cannot demonstrate wakefulness and would be aware).</li>
                  <li>Raised or unstable intracranial pressure, or active osmotherapy/neuroprotection.</li>
                  <li>Status epilepticus or sedation being used as therapy (e.g. barbiturate/midazolam burst suppression).</li>
                  <li>Active alcohol or drug withdrawal being controlled by the infusion.</li>
                  <li>Severe agitation risking self-harm, or myocardial ischaemia in the previous 24 h.</li>
                  <li>Escalating vasopressor requirement or ongoing haemodynamic instability.</li>
                  <li>Severe respiratory failure requiring deep sedation — high FiO₂/PEEP, prone positioning, refractory hypoxaemia or permissive hypercapnia with intolerance.</li>
                  <li>Therapeutic hypothermia/targeted temperature management with shivering, or an unsecured airway problem/difficult airway where re-sedation would be hazardous.</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Spontaneous Breathing Trial (SBT)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  If SAT passes — 30–120 min on PSV ≤ 8 cmH₂O / PEEP ≤ 5 or T-piece. RSBI
                  (RR/V<sub>T</sub>) &lt; 105 supports readiness; pass requires stable haemodynamics, adequate
                  oxygenation and no distress. Coupled SAT + SBT (ABC trial) ↓ ventilator days &amp; 1-year mortality.
                </p>
              </div>
            </div>
          </div>
          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "Target light sedation (RASS 0 to −2) — over-sedation prolongs ventilation and worsens delirium.",
              "Daily sedation hold + spontaneous breathing trial (ABC bundle) reduces ventilator days.",
              "CAM-ICU screens for delirium; treat with non-pharmacological measures first (orientation, sleep, mobility, family).",
              "Dexmedetomidine reduces delirium vs benzodiazepines (MENDS, SEDCOM) but not vs propofol (MENDS2); avoid benzodiazepines for routine sedation.",
              "ABCDEF bundle: Assess pain, Both SAT/SBT, Choice of sedation, Delirium monitoring, Early mobility, Family engagement.",
            ]}
          />
        </section>
      </ExamSection>
          <TopicFaqs faqs={icuSedationDeliriumFaqs} />
        </>
      }
    />
  );
};

export default IcuSedationDeliriumTopic;
