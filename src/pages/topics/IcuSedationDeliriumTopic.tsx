import { TopicTemplate } from "@/components/TopicTemplate";
import { Exam } from "@/data/curriculum";
import { ExamSection } from "@/components/ExamSection";
import { icuSedationDeliriumQuestions } from "@/data/quizzes";
import { ICUSedationComparisonDiagram } from "@/components/diagrams/ICUSedationComparisonDiagram";
import { CAMICUFlowchartDiagram } from "@/components/diagrams/CAMICUFlowchartDiagram";
import type { WorkedExample } from "@/components/WorkedExamples";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";
import { Cite } from "@/components/Cite";

const objectives = [
  "Score sedation depth using RASS and target light sedation (0 to −2) unless a specific indication for deep sedation exists.",
  "Compare propofol, midazolam, dexmedetomidine and remifentanil for ICU sedation, including PRIS risk and pharmacokinetics in organ failure.",
  "Screen for delirium with CAM-ICU and apply the ABCDEF bundle to reduce ventilator days, delirium and mortality.",
  "Manage hyperactive and hypoactive delirium with non-pharmacological measures first; recognise that haloperidol does not improve outcomes (MIND-USA, AID-ICU).",
  "Recognise, prevent and treat propofol infusion syndrome (PRIS).",
  "Apply daily Spontaneous Awakening (SAT) and Spontaneous Breathing (SBT) trials safely.",
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
        PRIS criteria: propofol &gt; 4 mg/kg/h for &gt; 48 h plus metabolic acidosis, rhabdomyolysis,
        hyperkalaemia, cardiac dysfunction. Mechanism: impaired free fatty acid oxidation and
        mitochondrial dysfunction.
      </>
    ),
    answer: (
      <>
        Stop propofol immediately. Switch to midazolam or dexmedetomidine (± analgesia with fentanyl/
        alfentanil). Treat hyperkalaemia, support haemodynamics, consider CRRT. For ongoing ICP control
        use thiopentone, ketamine or volatile via Sedaconda. Mortality of established PRIS &gt; 30 %.
      </>
    ),
    cites: ["DAS-Delirium"],
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
        haloperidol does not treat delirium (MIND-USA, AID-ICU).
      </>
    ),
    answer: (
      <>
        Stop midazolam and haloperidol. Switch to dexmedetomidine (preferred in delirium). Apply ABCDEF
        bundle: assess pain, daily SAT/SBT, choose dex, reorient, mobilise early, family at bedside,
        sleep hygiene (cluster care, earplugs, eye mask). Reassess CAM-ICU each shift.
      </>
    ),
    cites: ["BJA Educ 2019"],
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
        Failure criteria for SAT: agitation/anxiety, RR &gt; 35 for &gt; 5 min, SpO₂ &lt; 88 %, acute
        arrhythmia, signs of distress. Restart sedation at half the previous rate, then titrate.
      </>
    ),
    answer: (
      <>
        Restart propofol at half the prior rate. Reassess pain (alfentanil bolus if appropriate). Retry
        SAT in 24 h with anticipatory analgesia and consider switch to dexmedetomidine to allow
        cooperative arousal. Document failure mode for the next attempt.
      </>
    ),
    cites: ["BJA Educ 2017"],
  },
];

const keyPoints = [
  { text: "Target light sedation (RASS 0 to −2) with daily sedation holds — improves ventilator-free days and ICU outcomes", cites: ["DAS-Delirium", "ESICM Analgosedation 2020"] },
  { text: "PRIS risk: propofol >4 mg/kg/h for >48h → metabolic acidosis, rhabdomyolysis, hyperkalaemia, cardiac failure", cites: ["BJA Educ 2019"] },
  { text: "CAM-ICU = acute onset/fluctuating course + inattention + (altered consciousness OR disorganised thinking)", cites: ["BJA Educ 2017"] },
  { text: "ABCDEF bundle (Assess pain, Both SAT/SBT, Choice of sedation, Delirium monitoring, Early mobility, Family) reduces delirium and mortality", cites: ["DAS-Delirium"] },
  { text: "Dexmedetomidine is preferred in delirious patients (SPICE III: shorter time to extubation, neutral on mortality)", cites: ["BJA Educ 2019"] },
  { text: "Haloperidol does NOT treat or prevent ICU delirium (MIND-USA, AID-ICU)", cites: ["BJA Educ 2017"] },
  { text: "Avoid benzodiazepines for routine sedation — independent risk factor for delirium", cites: ["DAS-Delirium"] },
  { text: "Non-pharmacological measures (sleep hygiene, reorientation, mobilisation, family) are first-line for delirium", cites: ["BJA Educ 2019"] },
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
        objectives: ["BJA Educ 2017", "BJA Educ 2019"],
        workedExamples: ["BJA Educ 2017", "DAS-Delirium", "BJA Educ 2019"],
        keyPoints: ["BJA Educ 2019", "DAS-Delirium", "BJA Educ 2017"],
      }}
      sectionExamMapping={{
        objectives: { exams: [Exam.FFICM, Exam.EDIC] },
        workedExamples: { exams: [Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FFICM, Exam.EDIC] },
      }}
      coreConcepts={
        <ExamSection exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
        <section className="space-y-6">
          {/* RASS */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Sedation Assessment (RASS)</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Target light sedation (RASS 0 to −2) unless specific indication for deep sedation (refractory
              ICP, severe ARDS with paralysis, status epilepticus). Daily sedation holds (SAT) paired with
              spontaneous breathing trials (SBT) — the ABC trial — reduce ventilator days and mortality.
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
                { agent: "Midazolam", pros: "Anxiolytic, amnestic, anticonvulsant", cons: "Active metabolite (1-OH-midazolam) accumulates in renal failure; prolonged sedation; independent risk factor for delirium" },
                { agent: "Dexmedetomidine", pros: "α₂-agonist; cooperative sedation, no respiratory depression, sympatholytic, may reduce delirium duration (SPICE III)", cons: "Bradycardia, hypotension, limited depth of sedation, expensive" },
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

          {/* Delirium */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ICU Delirium</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Affects up to 80 % of ventilated patients. Independently associated with increased
              mortality, prolonged ventilation and long-term cognitive impairment. Three subtypes:
              hyperactive (5 %, easily recognised), hypoactive (most common, frequently missed) and
              mixed. Screen with CAM-ICU each shift.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">CAM-ICU</p>
                <p className="text-sm text-muted-foreground mt-1">
                  4 features: (1) acute onset / fluctuating course + (2) inattention + (3) altered
                  consciousness OR (4) disorganised thinking. Positive = 1 + 2 + (3 or 4).
                  Feature 4: 4 yes/no questions + 2-step command; ≥1 error = positive
                  <Cite topicId="icu-sedation-delirium" labels={["CAM-ICU Training Manual"]} />.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">ABCDEF bundle</p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>A</strong>ssess pain · <strong>B</strong>oth SAT &amp; SBT · <strong>C</strong>hoice
                  of sedation · <strong>D</strong>elirium monitoring · <strong>E</strong>arly mobility ·
                  <strong> F</strong>amily engagement. Reduces delirium, ventilator days and mortality.
                </p>
              </div>
            </div>
            <CAMICUFlowchartDiagram />
          </div>

          {/* Prevention & treatment */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Delirium Prevention &amp; Treatment</h2>
            <div className="space-y-2">
              {[
                { approach: "Non-pharmacological (first-line)", detail: "Sleep hygiene (cluster nocturnal interventions, earplugs, eye masks, light/dark cycling), early mobilisation, reorientation, cognitive stimulation, family presence, minimise benzodiazepines, optimise hearing aids/glasses." },
                { approach: "Dexmedetomidine", detail: "Preferred sedative in the delirious or agitated patient. SPICE III: no mortality difference vs usual care but shorter time to extubation; useful for agitation impeding weaning." },
                { approach: "Haloperidol / atypical antipsychotics", detail: "MIND-USA and AID-ICU: no benefit for treatment or prevention of ICU delirium. Reserve for distressing hyperactive symptoms not controlled by non-pharmacological measures; balance against QT prolongation and EPSE." },
                { approach: "Propofol infusion syndrome (PRIS)", detail: "Triad: metabolic acidosis + rhabdomyolysis/hyperkalaemia + cardiac dysfunction (Brugada-like ECG, RBBB). Risk: >4 mg/kg/h for >48 h, young / lean / catecholamine-loaded patients. Treat: stop propofol, switch agent, supportive care, CRRT for refractory acidosis/hyperkalaemia." },
              ].map((a) => (
                <div key={a.approach} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="font-semibold text-foreground text-sm">{a.approach}</p>
                  <p className="text-sm text-muted-foreground mt-1">{a.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Daily SAT/SBT */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Daily SAT &amp; SBT</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Spontaneous Awakening Trial (SAT)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Stop sedation each morning unless contraindicated (paralysis, ICP, status, severe ARDS
                  with intolerance, escalating vasopressors). Failure: agitation, RR &gt; 35 for &gt; 5 min,
                  SpO₂ &lt; 88 %, acute arrhythmia. Restart at half the prior rate.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Spontaneous Breathing Trial (SBT)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  If SAT passes — 30–120 min on PSV ≤ 8 cmH₂O / PEEP ≤ 5 or T-piece. Pass if RSBI
                  (RR/V<sub>T</sub>) &lt; 105, stable haemodynamics, SpO₂ ≥ 90 %, no distress. Coupled
                  SAT + SBT (ABC trial) ↓ ventilator days &amp; mortality.
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
              "Dexmedetomidine reduces delirium vs benzodiazepines; avoid benzodiazepines for routine sedation (MENDS, SEDCOM).",
              "ABCDEF bundle: Assess pain, Both SAT/SBT, Choice of sedation, Delirium monitoring, Early mobility, Family engagement.",
            ]}
          />
        </section>
      </ExamSection>
      }
    />
  );
};

export default IcuSedationDeliriumTopic;
