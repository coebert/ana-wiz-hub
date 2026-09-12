import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { ExamMappingBadges } from "@/components/exam/ExamMappingBadges";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { psychiatricSubstanceDiseaseQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

const tocItems = [
  { id: "section-psychotropic-drugs", label: "Psychotropic Drugs & Anaesthesia", group: "Pharmacology" },
  { id: "section-serotonin-syndrome", label: "Serotonin Syndrome", group: "Complications" },
  { id: "section-ect", label: "Anaesthesia for ECT", group: "Practice" },
  { id: "section-alcohol", label: "Alcohol Use Disorder", group: "Substance Misuse" },
  { id: "section-opioid-dependence", label: "Opioid Dependence, Methadone & Buprenorphine", group: "Substance Misuse" },
  { id: "section-stimulants", label: "Stimulants & Other Drugs", group: "Substance Misuse" },
  { id: "section-capacity", label: "Capacity, Consent & Safeguarding", group: "Legal" },
];

const objectives = [
  "Describe the perioperative implications of common psychotropic drug classes — antidepressants, MAOIs, lithium, antipsychotics, benzodiazepines and clozapine.",
  "Recognise and manage serotonin syndrome, distinguishing it from neuroleptic malignant syndrome and malignant hyperthermia.",
  "Plan safe anaesthesia for electroconvulsive therapy, including drug choice, physiological response to the seizure, and precautions.",
  "Manage the perioperative patient with alcohol use disorder, including withdrawal, delirium tremens and Wernicke's encephalopathy prophylaxis.",
  "Plan perioperative analgesia for patients on methadone or buprenorphine maintenance therapy without precipitating withdrawal or undertreating pain.",
  "Anticipate the cardiovascular and metabolic complications of stimulant and other recreational drug use in the perioperative setting.",
  "Apply the Mental Capacity Act 2005 and Mental Health Act framework to consent and treatment decisions in patients with psychiatric illness.",
];

const keyPoints = [
  {
    text: "Irreversible MAOIs (phenelzine, tranylcypromine) require avoidance of indirect sympathomimetics, pethidine and tramadol (risk of hypertensive crisis or serotonin syndrome); direct-acting phenylephrine can be used at reduced dose if a vasopressor is needed.",
    cites: ["BJA Educ Psychiatric 2017"],
  },
  {
    text: "Lithium has a narrow therapeutic range (0.4–1.0 mmol/L) and prolongs the action of both depolarising and non-depolarising neuromuscular blockers; toxicity is precipitated by dehydration, NSAIDs, ACE inhibitors and diuretics.",
    cites: ["BJA Educ Psychiatric 2017"],
  },
  {
    text: "Serotonin syndrome is diagnosed clinically using the Hunter Criteria and typically evolves within 24 h of a precipitant; management is supportive — stop the causative drug, cool, benzodiazepines, and cyproheptadine 12 mg then 2 mg 2-hourly for refractory cases.",
    cites: ["Boyer Serotonin 2005"],
  },
  {
    text: "During ECT, an initial parasympathetic discharge (bradycardia, even asystole) is followed by a sympathetic surge (tachycardia, hypertension); propofol 0.75–1 mg/kg raises seizure threshold and shortens seizure duration, whereas ketamine and etomidate lengthen it.",
    cites: ["BJA Educ ECT 2020"],
  },
  {
    text: "Alcohol withdrawal is managed with a symptom-triggered, CIWA-Ar-guided reducing regimen of chlordiazepoxide, with parenteral thiamine (Pabrinex) given before glucose to prevent precipitating Wernicke's encephalopathy.",
    cites: ["NICE CG100 Alcohol"],
  },
  {
    text: "Patients on methadone or buprenorphine maintenance should continue their usual dose perioperatively; expect significantly higher opioid requirements from tolerance, and use multimodal and regional analgesia rather than abrupt substitution to avoid precipitated withdrawal.",
    cites: ["Kohan Buprenorphine 2021", "BJA Educ Substance 2018"],
  },
  {
    text: "Capacity is decision- and time-specific under the Mental Capacity Act 2005; a patient detained under the Mental Health Act may still retain capacity to consent to or refuse treatment unrelated to their mental disorder.",
    cites: ["MCA 2005"],
  },
];

const workedExamples: WorkedExample[] = [
  {
    title: "Emergency laparotomy in a patient taking phenelzine (irreversible MAOI)",
    scenario:
      "A 46-year-old on phenelzine 45 mg BD for treatment-resistant depression presents with a perforated viscus requiring emergency laparotomy. Discuss the anaesthetic and analgesic plan.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>
            Irreversible MAOIs cannot be stopped safely in time for emergency surgery (recovery of monoamine oxidase activity takes ~2 weeks after cessation) — proceed with the drug in situ and modify the anaesthetic instead.
          </li>
          <li>
            Avoid indirect-acting sympathomimetics (ephedrine, metaraminol releases some indirect activity) — accumulated presynaptic noradrenaline can cause an exaggerated hypertensive response. Use a direct-acting agent, <strong>phenylephrine at reduced starting dose</strong>, titrated carefully.
          </li>
          <li>
            Avoid <strong>pethidine and tramadol</strong> absolutely — both inhibit serotonin reuptake and can precipitate life-threatening serotonin syndrome in combination with MAOIs. Fentanyl and morphine are considered safer opioids, used cautiously and titrated to effect.
          </li>
          <li>
            Avoid other serotonergic drugs (ondansetron has a theoretical serotonergic risk — some advise an alternative antiemetic such as droperidol or cyclizine).
          </li>
          <li>
            Standard induction (propofol, rocuronium for RSI) is safe; maintain haemodynamic stability with careful, incremental vasopressor titration and invasive arterial monitoring given the risk of exaggerated pressor responses to laryngoscopy and surgical stimulation.
          </li>
          <li>
            Postoperatively, liaise with psychiatry regarding continuation of the MAOI and multimodal, MAOI-safe analgesia (paracetamol, regional/local techniques, cautious opioid titration).
          </li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Giving pethidine or tramadol for "safer" opioid analgesia — both are classic serotonin syndrome precipitants with MAOIs.</li>
            <li>Using ephedrine as first-line vasopressor — indirect action risks hypertensive crisis.</li>
            <li>Assuming the MAOI must be stopped preoperatively — not feasible or advisable for emergency surgery given the 2-week washout.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Continue the MAOI, avoid pethidine/tramadol and indirect sympathomimetics, use direct-acting phenylephrine at reduced dose with invasive monitoring, and favour fentanyl/morphine with multimodal, regional-based analgesia.",
    cites: ["BJA Educ Psychiatric 2017", "Boyer Serotonin 2005"],
  },
  {
    title: "Major trauma laparotomy in a patient on methadone maintenance",
    scenario:
      "A 34-year-old on methadone 80 mg once daily for opioid use disorder sustains blunt abdominal trauma requiring emergency laparotomy. Plan perioperative analgesia.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>
            Confirm the dose and timing with the prescribing service and continue the usual daily methadone dose (oral or IV equivalent) throughout the perioperative period — this covers baseline opioid tolerance and prevents withdrawal, but provides negligible acute analgesia.
          </li>
          <li>
            Anticipate a substantially higher analgesic requirement due to tolerance and opioid-induced hyperalgesia; plan for multimodal analgesia — paracetamol, NSAID if not contraindicated by trauma, and regional techniques (e.g. rectus sheath/TAP catheters or epidural if feasible) to reduce systemic opioid need.
          </li>
          <li>
            Use additional short-acting opioids (fentanyl/morphine) titrated to effect for breakthrough and intraoperative analgesia — doses will exceed those of an opioid-naïve patient.
          </li>
          <li>
            Consider a low-dose <strong>ketamine infusion</strong> as an opioid-sparing, anti-hyperalgesic adjunct given the tolerance and hyperalgesia risk.
          </li>
          <li>
            Do not give a partial agonist (e.g. buprenorphine) or an antagonist (naloxone/naltrexone) while methadone is on board unless in overdose — this precipitates acute withdrawal. If naloxone is required for over-sedation, use small titrated boluses (e.g. 40–100 microgram increments) to reverse only respiratory depression while preserving analgesia.
          </li>
          <li>
            Postoperatively, continue the maintenance methadone, involve the addiction/pain service early, and wean supplementary opioids with a clear discharge analgesia and safeguarding plan.
          </li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Withholding maintenance methadone perioperatively "to be safe" — precipitates withdrawal and increases pain and agitation.</li>
            <li>Under-dosing opioids because of a stigmatising assumption of "drug-seeking" — tolerance genuinely raises requirements.</li>
            <li>Full-dose naloxone reversal — causes acute withdrawal and severe pain; titrate in small increments.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Continue the maintenance methadone dose, expect markedly higher supplementary opioid requirements, use multimodal and regional analgesia with a ketamine adjunct, and avoid partial agonists/antagonists that would precipitate withdrawal.",
    cites: ["Kohan Buprenorphine 2021", "BJA Educ Substance 2018"],
  },
];

const psychiatricSubstanceDiseaseFaqs: Array<[string, string]> = [
  ["Should buprenorphine be stopped before surgery?", "Current multisociety guidance recommends continuing buprenorphine perioperatively in most cases rather than routine discontinuation, using multimodal analgesia and titrated full-agonist opioids alongside it; stopping risks relapse and does not reliably improve analgesia."],
  ["How do you distinguish serotonin syndrome from neuroleptic malignant syndrome?", "Serotonin syndrome has a rapid onset (usually <24 h), hyperreflexia, myoclonus and clonus, and diarrhoea; NMS develops over days, features 'lead-pipe' rigidity, hyporeflexia and very high CK, and follows dopamine antagonist exposure or dopaminergic withdrawal rather than serotonergic drugs."],
  ["Why does bradycardia occur immediately after the ECT stimulus?", "The electrical stimulus produces an initial brief parasympathetic discharge (vagal outflow) causing bradycardia or even brief asystole, followed within seconds by a sympathetic surge causing tachycardia and hypertension during the tonic-clonic seizure; anticholinergic pre-treatment (glycopyrrolate) may be used in patients at risk of significant bradyarrhythmia."],
  ["Can a patient detained under the Mental Health Act refuse anaesthesia for an unrelated surgical problem?", "Yes — detention under the Mental Health Act only authorises treatment for the mental disorder itself. Capacity for other treatment decisions must be separately assessed under the Mental Capacity Act 2005; if the patient has capacity for that specific decision, their refusal must be respected."],
];

const PsychiatricSubstanceDiseaseTopic = () => {
  return (
    <TopicTemplate
      title="Psychiatric Disease & Substance Misuse"
      subtitle="Perioperative management of psychotropic medication, ECT, and alcohol/substance use disorders"
      backPath="/perioperative"
      backLabel="Perioperative Medicine"
      accentColor="text-clinical"
      topicId="psychiatric-substance-disease"
      topicTitle="Psychiatric Disease & Substance Misuse"
      workedExamples={workedExamples}
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={psychiatricSubstanceDiseaseQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["PO_BK_09"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["BJA Educ Psychiatric 2017", "Boyer Serotonin 2005", "BJA Educ ECT 2020", "NICE CG100 Alcohol", "BJA Educ Substance 2018", "Kohan Buprenorphine 2021", "MCA 2005"],
        workedExamples: ["BJA Educ Psychiatric 2017", "Boyer Serotonin 2005", "Kohan Buprenorphine 2021", "BJA Educ Substance 2018"],
        keyPoints: [
          "BJA Educ Psychiatric 2017",
          "Boyer Serotonin 2005",
          "BJA Educ ECT 2020",
          "NICE CG100 Alcohol",
          "Kohan Buprenorphine 2021",
          "BJA Educ Substance 2018",
          "MCA 2005",
        ],
      }}
      coreConcepts={
        <ExamSection exams={[Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
          <div className="space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              Patients with psychiatric illness and substance misuse disorders present frequently for anaesthesia, and both their underlying condition and its treatment materially change perioperative risk. This topic covers the drug interactions and precautions relevant to common psychotropic medications, the physiology and technique of anaesthesia for electroconvulsive therapy, the acute and chronic management of alcohol and opioid use disorders, and the legal framework governing capacity and consent in this population.
            </p>

            <TopicTableOfContents items={tocItems} />

            {/* Psychotropic drugs */}
            <section id="section-psychotropic-drugs" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Psychotropic Drugs & Anaesthesia</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_09"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">SSRIs / SNRIs</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Inhibit platelet serotonin uptake → mildly impaired platelet aggregation and a small increase in surgical bleeding risk, notably with concurrent NSAIDs or anticoagulants.</li>
                    <li>SIADH-mediated hyponatraemia, especially in the elderly — check sodium preoperatively if symptomatic or long-standing therapy.</li>
                    <li>Serotonergic interaction risk with tramadol, pethidine, linezolid, methylene blue and MAOIs — continue the SSRI/SNRI but avoid these combinations <InlineRef topicId="psychiatric-substance-disease" refLabel="Boyer Serotonin 2005" />.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Tricyclic Antidepressants</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Anticholinergic effects: dry mouth, tachycardia, urinary retention, reduced gastric motility.</li>
                    <li>Quinidine-like membrane effect → QT prolongation and arrhythmia risk, particularly in overdose or with other QT-prolonging drugs.</li>
                    <li>Chronic use depletes presynaptic catecholamine stores, causing an <strong>exaggerated pressor response to indirect-acting sympathomimetics</strong> (e.g. ephedrine) and an unpredictable response to direct agonists — titrate vasopressors cautiously.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Monoamine Oxidase Inhibitors</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Irreversible</strong> (phenelzine, tranylcypromine, isocarboxazid): monoamine oxidase activity takes ~2 weeks to recover after cessation, so continuing perioperatively with modified technique is usually preferred to a risky washout before urgent/emergency surgery.</li>
                    <li><strong>Reversible</strong> (moclobemide): shorter half-life, lower interaction risk, but the same precautions are prudent.</li>
                    <li>Tyramine-containing foods precipitate hypertensive crisis via accumulated noradrenaline release — same mechanism explains exaggerated response to indirect sympathomimetics.</li>
                    <li><strong>Avoid pethidine, tramadol and indirect-acting vasopressors</strong> (ephedrine, metaraminol) — risk of serotonin syndrome or hypertensive crisis. Use a <strong>direct-acting agent (phenylephrine) at reduced starting dose</strong>, titrated with invasive monitoring <InlineRef topicId="psychiatric-substance-disease" refLabel="BJA Educ Psychiatric 2017" />.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Lithium</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Narrow therapeutic range <strong>0.4–1.0 mmol/L</strong> (higher end, up to 1.2, for acute mania); toxicity above ~1.5 mmol/L.</li>
                    <li>Precipitants of toxicity: dehydration, sodium depletion, NSAIDs, ACE inhibitors/ARBs, diuretics (especially thiazides), and perioperative fluid shifts — check levels and renal function preoperatively for major surgery.</li>
                    <li>Prolongs both depolarising and non-depolarising neuromuscular blockade — use peripheral nerve stimulation to guide dosing and reversal.</li>
                    <li>Monitoring: routine 12-hour post-dose trough levels every 3–6 months normally, more frequently perioperatively if levels are borderline or renal function changes.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Antipsychotics</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>QT prolongation (particularly haloperidol IV, quetiapine, and some atypicals) — check ECG and electrolytes if other QT-prolonging drugs are used.</li>
                    <li>α1-blockade causes hypotension and an exaggerated response to vasodilating anaesthetic agents.</li>
                    <li>Neuroleptic malignant syndrome is a rare but life-threatening idiosyncratic reaction — see comparison table below.</li>
                  </ul>
                  <div className="overflow-x-auto mt-3">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-border text-foreground">
                          <th className="text-left py-1 pr-2">Feature</th>
                          <th className="text-left py-1 pr-2">NMS</th>
                          <th className="text-left py-1 pr-2">Serotonin Syndrome</th>
                          <th className="text-left py-1">Malignant Hyperthermia</th>
                        </tr>
                      </thead>
                      <tbody className="align-top">
                        <tr className="border-b border-border/50">
                          <td className="py-1 pr-2">Trigger</td>
                          <td className="py-1 pr-2">Dopamine antagonist (or dopaminergic withdrawal)</td>
                          <td className="py-1 pr-2">Serotonergic drug combination</td>
                          <td className="py-1">Volatile agent / suxamethonium</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-1 pr-2">Onset</td>
                          <td className="py-1 pr-2">Days</td>
                          <td className="py-1 pr-2">Hours (&lt;24 h)</td>
                          <td className="py-1">Minutes</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-1 pr-2">Tone</td>
                          <td className="py-1 pr-2">"Lead-pipe" rigidity, hyporeflexia</td>
                          <td className="py-1 pr-2">Hyperreflexia, clonus, myoclonus</td>
                          <td className="py-1">Rigidity (masseter spasm)</td>
                        </tr>
                        <tr className="border-b border-border/50">
                          <td className="py-1 pr-2">CK</td>
                          <td className="py-1 pr-2">Very high</td>
                          <td className="py-1 pr-2">Mildly raised or normal</td>
                          <td className="py-1">Very high, rapid rise</td>
                        </tr>
                        <tr>
                          <td className="py-1 pr-2">Treatment</td>
                          <td className="py-1 pr-2">Stop drug, dantrolene, bromocriptine, cooling</td>
                          <td className="py-1 pr-2">Stop drug, benzodiazepines, cyproheptadine, cooling</td>
                          <td className="py-1">Stop trigger, dantrolene 2.5 mg/kg, cooling</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Benzodiazepines & Clozapine</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Long-term benzodiazepine users have cross-tolerance to anaesthetic agents; abrupt discontinuation risks withdrawal seizures — continue usual dose perioperatively.</li>
                    <li>Clozapine: risk of <strong>agranulocytosis</strong> (mandatory FBC monitoring) and myocarditis; continue where possible as abrupt cessation risks rebound psychosis and cholinergic rebound, but liaise closely with psychiatry perioperatively <InlineRef topicId="psychiatric-substance-disease" refLabel="BJA Educ Psychiatric 2017" />.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Serotonin syndrome */}
            <section id="section-serotonin-syndrome" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Serotonin Syndrome</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_09"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Hunter Criteria & Triggers</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Requires a serotonergic agent plus one of: spontaneous clonus; inducible clonus + agitation or diaphoresis; ocular clonus + agitation or diaphoresis; tremor + hyperreflexia; hypertonia + temperature &gt; 38°C + ocular or inducible clonus <InlineRef topicId="psychiatric-substance-disease" refLabel="Boyer Serotonin 2005" />.</li>
                    <li>Common perioperative triggers in combination: SSRIs/SNRIs/MAOIs with pethidine, tramadol, methylene blue, linezolid, ondansetron (weak), or each other.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Management</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Stop all serotonergic agents immediately.</li>
                    <li>Supportive care: active cooling for hyperthermia, IV fluids, benzodiazepines for agitation and to reduce autonomic instability and hyperthermia (avoid physical restraint, which worsens hyperthermia via isometric muscle activity).</li>
                    <li>For moderate–severe/refractory cases: <strong>cyproheptadine 12 mg orally/NG loading dose, then 2 mg every 2 hours</strong> until improvement (maximum ~32 mg/24 h) — a 5-HT2A antagonist.</li>
                    <li>Severe cases (temperature &gt; 41°C, rigidity): sedation, paralysis and intubation may be needed — do not rely on antipyretics, which are ineffective (hyperthermia is due to muscular activity, not hypothalamic reset).</li>
                    <li>Distinguish from NMS (slower onset, rigidity with hyporeflexia, dopamine antagonist trigger) — see comparison table above.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* ECT */}
            <section id="section-ect" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Anaesthesia for ECT</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_09"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Physiology of the Seizure</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Initial <strong>parasympathetic discharge</strong> immediately after the stimulus — bradycardia, hypotension, occasionally brief asystole.</li>
                    <li>Followed by a <strong>sympathetic surge</strong> during the tonic-clonic seizure — tachycardia, hypertension, ↑ intracranial and intraocular pressure, ↑ myocardial oxygen demand <InlineRef topicId="psychiatric-substance-disease" refLabel="BJA Educ ECT 2020" />.</li>
                    <li>Postictal phase: transient confusion, headache, and occasionally further bradycardia.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Agent Choice & Seizure Threshold</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Propofol 0.75–1 mg/kg</strong> is the most common induction agent; it raises seizure threshold and shortens seizure duration, which can be a disadvantage if seizure quality is poor.</li>
                    <li><strong>Methohexital</strong> is the classic "gold standard" agent — minimal effect on seizure threshold/duration but limited availability in the UK.</li>
                    <li><strong>Ketamine</strong> and <strong>etomidate</strong> lengthen seizure duration and are useful when seizures are difficult to elicit or inadequate on propofol; ketamine may also benefit refractory depression.</li>
                    <li><strong>Suxamethonium 0.5 mg/kg</strong> (lower than intubation dose) provides adequate muscle relaxation to attenuate the motor component and reduce injury risk while preserving a visible/EEG-monitored seizure.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Technique & Precautions</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Preoxygenate, bag-mask ventilate, insert a bite block before stimulus (dental/tongue injury prevention); no routine airway instrumentation is required if ventilation is adequate.</li>
                    <li><strong>Hyperventilation</strong> to mild hypocapnia before the stimulus lowers the seizure threshold and improves seizure quality.</li>
                    <li>Anticholinergic pre-treatment (glycopyrrolate) may be used in patients with a history of significant bradycardia or on beta-blockers.</li>
                    <li>Contraindications/high-risk conditions: recent MI (&lt;3 months), unstable angina, recent stroke, raised intracranial pressure, aortic aneurysm, retinal detachment, phaeochromocytoma — proceed only after cardiology/senior anaesthetic input where risk factors exist.</li>
                    <li>Recovery: monitor for postictal confusion, ensure return of full consciousness and orientation before discharge from recovery, and treat post-ECT headache with simple analgesia.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Alcohol */}
            <section id="section-alcohol" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Alcohol Use Disorder</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_09"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Acute Intoxication vs Chronic Tolerance</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Acute intoxication potentiates the sedative and cardiodepressant effects of anaesthetic agents — reduced induction doses required, aspiration risk raised.</li>
                    <li>Chronic use induces hepatic enzymes (CYP2E1), producing tolerance and <strong>cross-tolerance</strong> to volatile agents, propofol, and benzodiazepines — higher doses often needed in the non-intoxicated chronic drinker.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Withdrawal & Delirium Tremens</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Timeline: tremor, anxiety, tachycardia from 6–12 h; seizures peak at 24–48 h; <strong>delirium tremens</strong> (confusion, hallucinations, autonomic instability) typically 48–96 h after last drink.</li>
                    <li>Use a symptom-triggered, <strong>CIWA-Ar-guided reducing regimen of chlordiazepoxide</strong> (or diazepam if IV/parenteral route needed) titrated to symptom severity rather than a fixed schedule <InlineRef topicId="psychiatric-substance-disease" refLabel="NICE CG100 Alcohol" />.</li>
                    <li>Delirium tremens: high-dose benzodiazepines, consider IV lorazepam/diazepam, correct electrolytes (magnesium, phosphate, potassium), and manage in a monitored environment given autonomic instability and seizure risk.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Wernicke's Prophylaxis</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Give <strong>parenteral thiamine (Pabrinex)</strong> before or with any glucose administration — glucose without thiamine can precipitate or worsen Wernicke's encephalopathy in a thiamine-deplete patient.</li>
                    <li>Classic triad: confusion, ataxia, ophthalmoplegia — often incomplete; treat any suspicion empirically without waiting for the full triad <InlineRef topicId="psychiatric-substance-disease" refLabel="NICE CG100 Alcohol" />.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Associated Organ Dysfunction</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Alcoholic cardiomyopathy</strong> — dilated cardiomyopathy with impaired systolic function; assess with echocardiography before major surgery.</li>
                    <li>Coagulopathy from impaired hepatic synthetic function and thrombocytopenia (marrow suppression, splenic sequestration).</li>
                    <li>Chronic liver disease — see the dedicated hepatic disease topic for Child-Pugh/MELD-based risk stratification and coagulation management.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Opioid dependence */}
            <section id="section-opioid-dependence" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Opioid Dependence, Methadone & Buprenorphine</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_09"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">General Principles</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Continue maintenance methadone or buprenorphine throughout the perioperative period — it treats dependence and prevents withdrawal but provides minimal acute analgesia at maintenance doses.</li>
                    <li>Expect significantly higher supplementary opioid requirements from tolerance and opioid-induced hyperalgesia <InlineRef topicId="psychiatric-substance-disease" refLabel="BJA Educ Substance 2018" />.</li>
                    <li>Prioritise regional anaesthesia/analgesia and multimodal non-opioid strategies (paracetamol, NSAIDs where appropriate, gabapentinoids, regional blocks/catheters) to reduce total opioid exposure.</li>
                    <li><strong>Ketamine infusion</strong> is a useful opioid-sparing adjunct given the anti-hyperalgesic, NMDA-antagonist mechanism relevant to tolerant patients.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Buprenorphine Specifics</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>High-affinity partial mu-agonist with a ceiling effect — historically stopped preoperatively for fear of blocking full agonists, but current guidance favours <strong>continuation</strong> with careful titration of additional full agonists and multimodal analgesia <InlineRef topicId="psychiatric-substance-disease" refLabel="Kohan Buprenorphine 2021" />.</li>
                    <li>Introducing a full agonist too soon after stopping buprenorphine, or introducing another partial agonist/antagonist while buprenorphine is active, risks <strong>precipitated withdrawal</strong> due to displacement from the mu receptor by a lower-efficacy or antagonist ligand.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Naloxone & Naltrexone Timing</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Naloxone should only be given in small titrated increments for respiratory depression in an opioid-tolerant patient — full reversal doses precipitate acute severe withdrawal and uncontrolled pain.</li>
                    <li>Oral naltrexone (used for relapse prevention) should be discontinued approximately 72 hours before elective major surgery where significant opioid analgesia is anticipated, with a plan for postoperative resumption once analgesic needs have settled.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Stimulants */}
            <section id="section-stimulants" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Stimulants & Other Drugs</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_09"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Cocaine</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Blocks catecholamine reuptake → tachycardia, hypertension, and <strong>coronary artery vasospasm</strong> which can cause myocardial ischaemia/infarction even in young patients with normal coronaries.</li>
                    <li>Avoid <strong>unopposed beta-blockade</strong> — blocking beta-2-mediated vasodilation leaves alpha-mediated vasoconstriction unopposed, worsening coronary spasm and hypertension.</li>
                    <li>First-line treatment of cocaine-associated chest pain/hypertension: <strong>benzodiazepines</strong> (reduce central sympathetic drive) and <strong>nitrates</strong> for coronary vasodilation; phentolamine (alpha-blocker) is an alternative <InlineRef topicId="psychiatric-substance-disease" refLabel="BJA Educ Substance 2018" />.</li>
                    <li>Defer elective surgery for at least 24 hours after last use where possible given ongoing sympathomimetic and arrhythmogenic risk.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Amphetamines & MDMA</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Sympathomimetic toxidrome: hyperthermia, tachycardia, hypertension, and — specific to MDMA — <strong>hyponatraemia</strong> from excess ADH release and compulsive water intake, risking cerebral oedema and seizures.</li>
                    <li>Management is supportive: active cooling, benzodiazepines for agitation, cautious fluid management with sodium monitoring.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Cannabis, Ketamine Misuse & Novel Psychoactive Substances</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Cannabis: chronic use associated with airway hyperreactivity, tachycardia, and (rarely) cannabinoid hyperemesis syndrome; may alter anaesthetic drug requirements.</li>
                    <li>Chronic recreational ketamine use causes a characteristic <strong>ulcerative cystitis/uropathy</strong> with severe bladder pain, frequency and haematuria — relevant to differential diagnosis of pelvic pain and to renal function assessment.</li>
                    <li>Novel psychoactive substances ("legal highs", synthetic cannabinoids, synthetic cathinones) have unpredictable and highly variable sympathomimetic, sedative or dissociative effects — manage symptomatically with vigilance for atypical toxidromes.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Capacity */}
            <section id="section-capacity" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Capacity, Consent & Safeguarding</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_09"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Mental Capacity Act 2005</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Capacity is assumed unless proven otherwise, is <strong>decision-specific and time-specific</strong>, and patients are supported to make their own decision wherever possible.</li>
                    <li>Two-stage test: (1) is there an impairment or disturbance in the functioning of mind or brain; (2) does that impairment mean the person cannot <strong>understand, retain, weigh, or communicate</strong> the decision-relevant information <InlineRef topicId="psychiatric-substance-disease" refLabel="MCA 2005" />.</li>
                    <li>If a patient lacks capacity, treatment proceeds in their <strong>best interests</strong>, using the least restrictive option and consulting those close to the patient, an IMCA where appropriate, or any valid advance decision/Lasting Power of Attorney for health and welfare.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Interaction with the Mental Health Act</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Detention under the Mental Health Act authorises treatment <strong>only for the mental disorder</strong> — it does not itself authorise unrelated surgical or medical treatment.</li>
                    <li>A detained patient may retain capacity to consent to, or refuse, treatment for a physical health problem; capacity must be assessed separately for that decision.</li>
                    <li>Where a detained patient lacks capacity for the physical health decision, proceed under the Mental Capacity Act best-interests framework, involving psychiatric and legal advice for complex or contested cases.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Safeguarding</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Consider safeguarding referral where self-neglect, exploitation, or coercion is suspected in patients with severe mental illness or substance dependence.</li>
                    <li>Document capacity assessments, best-interests decisions, and any restraint or restrictive practice clearly and contemporaneously.</li>
                  </ul>
                </div>
              </div>
            </section>

            <ExamPitfallsCallout
              accent="clinical"
              pitfalls={[
                "Never give pethidine or tramadol to a patient on an MAOI or SSRI — high risk of serotonin syndrome; use fentanyl/morphine and avoid indirect sympathomimetics.",
                "Do not stop methadone or buprenorphine 'to simplify' perioperative care — continue maintenance dosing and add multimodal/regional analgesia on top.",
                "Do not give glucose before thiamine in a malnourished or alcohol-dependent patient — this can precipitate Wernicke's encephalopathy.",
                "Avoid unopposed beta-blockade in cocaine-intoxicated patients — worsens coronary vasospasm; use benzodiazepines and nitrates first.",
                "Detention under the Mental Health Act does not equal incapacity, and does not authorise unrelated physical health treatment — capacity must be assessed decision-by-decision under the MCA 2005.",
                "Lead-pipe rigidity with hyporeflexia and a slow onset over days points to NMS, not serotonin syndrome (hyperreflexia/clonus, rapid onset).",
              ]}
              />
              <TopicFaqs faqs={psychiatricSubstanceDiseaseFaqs} />
            </div>
          </ExamSection>
      }
    />
  );
};

export default PsychiatricSubstanceDiseaseTopic;
