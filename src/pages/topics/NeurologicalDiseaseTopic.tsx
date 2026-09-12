import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { ExamMappingBadges } from "@/components/exam/ExamMappingBadges";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { neurologicalDiseaseQuestions } from "@/data/quizzes";
import { Link } from "react-router-dom";
import MGNMBASensitivityDiagram from "@/components/diagrams/perioperative/MGNMBASensitivityDiagram";
import {
  MGPathophysDiagram,
  EpilepsyPathophysDiagram,
  MSPathophysDiagram,
  PDPathophysDiagram,
  MNDPathophysDiagram,
  MDPathophysDiagram,
  SCIPathophysDiagram,
} from "@/components/diagrams/perioperative/NeuroDiseasePathophysDiagram";
import { PathophysDrugMapper } from "@/components/diagrams/perioperative/PathophysDrugMapper";
import { FRCARelevanceCallout } from "@/components/topic/FRCARelevanceCallout";
import {
  mgMechanisms,
  epilepsyMechanisms,
  msMechanisms,
  pdMechanisms,
  mndMechanisms,
  mdMechanisms,
  sciMechanisms,
} from "@/components/diagrams/neuroDiseaseDrugMappings";
import { Exam } from "@/data/curriculum";
import { InlineRef } from "@/components/references/InlineRef";

const objectives = [
  "Choose neuromuscular blockers and reversal strategies for myasthenia gravis and other neuromuscular disorders.",
  "Manage patients with epilepsy peri-operatively, avoiding pro-convulsant agents.",
  "Plan anaesthesia for multiple sclerosis and Parkinson's disease without precipitating relapse or withdrawal.",
  "Recognise and treat autonomic dysreflexia in spinal cord injury.",
  "Adjust technique for muscular dystrophies and motor neuron disease (MH risk, sux/volatile avoidance).",
];

const tocItems = [
  { id: "section-myasthenia-gravis", label: "Myasthenia Gravis", group: "Neuromuscular" },
  { id: "section-epilepsy", label: "Epilepsy", group: "Seizure" },
  { id: "section-multiple-sclerosis", label: "Multiple Sclerosis", group: "Demyelinating" },
  { id: "section-parkinsons-disease", label: "Parkinson's Disease", group: "Neurodegenerative" },
  { id: "section-motor-neuron-disease", label: "Motor Neuron Disease", group: "Motor Neuron" },
  { id: "section-muscular-dystrophies", label: "Muscular Dystrophies", group: "Muscular" },
  { id: "section-spinal-cord-injury", label: "Spinal Cord Injury", group: "Spinal" },
  { id: "section-guillain-barre", label: "Guillain–Barré Syndrome", group: "Neuropathy" },
  { id: "section-stroke-cognitive", label: "Stroke, Perioperative Cognition & ICP Cross-Links", group: "Cerebrovascular" },
];

const keyPoints = [
  { text: "Myasthenia gravis: increased sensitivity to non-depolarising NMBAs (use 10–50% of normal dose); resistance to suxamethonium (ED₉₅ 2.6× normal); always use neuromuscular monitoring", cites: ["BJA Educ MG 2018", "AAGBI Neuromuscular"] },
  { text: "Epilepsy: avoid drugs that lower seizure threshold (enflurane, tramadol, high-dose remifentanil); propofol and sevoflurane are generally safe; ensure therapeutic anticonvulsant levels preoperatively", cites: ["BJA Educ Epilepsy 2015"] },
  { text: "Multiple sclerosis: neuraxial anaesthesia may be associated with postoperative relapse (controversial); spinal anaesthesia carries higher risk than epidural; document existing deficits preoperatively", cites: ["AAGBI Neuromuscular"] },
  { text: "Parkinson's disease: continue levodopa until immediately before surgery and restart ASAP postoperatively — abrupt withdrawal can cause neuroleptic malignant-like syndrome; avoid all dopamine antagonists (metoclopramide, droperidol, prochlorperazine)", cites: ["BJA Educ PD 2014"] },
  { text: "Autonomic dysreflexia in spinal cord injury (lesion ≥T6): massive sympathetic discharge below lesion triggered by bladder/bowel distension — treat with removal of stimulus, GTN, and nifedipine; can cause life-threatening hypertension and bradycardia", cites: ["Autonomic Dysreflexia"] },

];

const NeurologicalDiseaseTopicWorkedExamples: WorkedExample[] = [
  {
    title: "Anaesthesia for a patient with myasthenia gravis",
    scenario: "A 45-year-old with generalised MG on pyridostigmine and prednisolone is for thymectomy. Plan induction, neuromuscular management and post-op disposition.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Pre-op: optimise MG (plasma exchange or IVIG if bulbar/respiratory weakness), continue pyridostigmine (omit morning dose to reduce secretions and unpredictable NMJ response), steroid cover</li>
          <li>Predict difficult ventilation post-op: vital capacity &lt;2.9 L, disease &gt;6 y, pyridostigmine &gt;750 mg/day, COPD (Leventhal score)</li>
          <li>Induction with TIVA (propofol + remifentanil) — avoids volatile-potentiated weakness</li>
          <li>Avoid or markedly reduce <Link to="/pharmacology/muscle-relaxants" className="text-pharmacology underline">non-depolarising NMB</Link> (sensitive — give 10–20% of normal dose, monitor TOF); suxamethonium is resistant (use 1.5–2 mg/kg) but recovery normal</li>
          <li>Sugammadex preferred for reversal of rocuronium; plan elective post-op critical care for ventilatory observation</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
          <li>Neostigmine reversal can precipitate cholinergic crisis in pyridostigmine-treated patients</li>
          <li>Aminoglycosides, magnesium and high-dose steroids worsen weakness</li>
          <li>Mistaking myasthenic crisis (weakness improved by edrophonium) for cholinergic crisis (weakness worsened)</li>
          </ul>
        </div>
      </div>
    ),
    answer: "TIVA, minimise non-depolarising NMB with TOF monitoring, sugammadex reversal, elective post-op HDU/ICU and continuation of immunosuppression.",
    cites: ["BJA Educ MG 2018", "BJA Educ PD 2014", "BJA Educ Epilepsy 2015"],
  },
];

const neurologicalDiseaseFaqs: Array<[string, string]> = [
  ["How do myasthenia gravis patients respond to neuromuscular blocking drugs?", "They are markedly sensitive to non-depolarising NMBs (use 10–20% of normal dose, ideally rocuronium with sugammadex reversal) and relatively resistant to suxamethonium. Quantitative neuromuscular monitoring is essential."],
  ["What are the anaesthetic implications of Parkinson's disease?", "Never omit l-dopa (risk of neuroleptic malignant–like syndrome and rigidity); avoid D2-antagonists (metoclopramide, prochlorperazine, droperidol, haloperidol); and anticipate autonomic instability, aspiration risk and postoperative confusion."],
  ["Why is suxamethonium dangerous more than 24 hours after spinal cord injury?", "Upregulation of extra-junctional acetylcholine receptors causes massive potassium efflux on depolarisation, producing life-threatening hyperkalaemia and cardiac arrest. Use a non-depolarising NMB instead."],
];

const NeurologicalDiseaseTopic = () => {
  return (
    <TopicTemplate
      title="Neurological Co-Existing Disease"
      subtitle="Myasthenia gravis, epilepsy, multiple sclerosis, Parkinson's disease, motor neuron disease, muscular dystrophies, and spinal cord injury"
      backPath="/perioperative"
      backLabel="Perioperative Medicine"
      accentColor="text-clinical"
      topicId="neurological-disease"
      topicTitle="Neurological Co-Existing Disease"
      workedExamples={NeurologicalDiseaseTopicWorkedExamples}
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={neurologicalDiseaseQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["BJA Educ MG 2018", "BJA Educ PD 2014", "BJA Educ Epilepsy 2015"],
        keyPoints: ["BJA Educ MG 2018", "BJA Educ PD 2014", "BJA Educ Epilepsy 2015", "AAGBI Neuromuscular", "Autonomic Dysreflexia"],
      }}
      coreConcepts={
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
          <p className="text-muted-foreground leading-relaxed">
          Neurological co-existing disease changes drug handling, raises specific intra-operative risks, and dictates choices around regional versus general anaesthesia. This topic covers the high-yield conditions — myasthenia gravis, epilepsy, MS, Parkinson's disease, motor neuron disease, muscular dystrophies, and spinal cord injury — with an emphasis on neuromuscular blocker selection, autonomic safety, and continuation of disease-modifying therapy.
        </p>

        <TopicTableOfContents items={tocItems} />

        {/* Myasthenia Gravis */}
        <section id="section-myasthenia-gravis" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Myasthenia Gravis</h2>
          <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_09", "NA_BK_01"]} />
          <MGPathophysDiagram />
          <PathophysDrugMapper
            title="Pathophysiology → anaesthetic drug effects"
            tagline="Tap a mechanism to see the linked drug implications and key cautions."
            mechanisms={mgMechanisms}
          />
          <FRCARelevanceCallout
            bottomLine="Reduced safety margin at the NMJ — exquisite sensitivity to non-depolarising NMBAs and resistance to suxamethonium; quantitative neuromuscular monitoring is mandatory."
            implications={[
              "Use 10–50% of normal non-depolarising NMBA dose; sugammadex is the preferred reversal agent.",
              "Continue pyridostigmine (some omit on day of surgery to reduce secretions and unpredictable response).",
              "Predictors of postoperative ventilation: disease >6 yr, pyridostigmine >750 mg/day, VC <2.9 L, bulbar symptoms.",
              "Regional anaesthesia preferred — avoids NMBAs and respiratory depression.",
            ]}
            buzzwords={[
              "Fatigable weakness",
              "Anti-AChR antibody",
              "Osserman class",
              "ED₉₅ sux 2.6×",
              "Sugammadex over neostigmine",
              "Myasthenic vs cholinergic crisis",
              "Edrophonium (Tensilon) test",
            ]}
            vivaStem="A 45-year-old with generalised myasthenia gravis presents for thymectomy — outline your anaesthetic plan and postoperative disposition."
          />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Pathophysiology & Assessment</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Autoimmune destruction of postjunctional nicotinic ACh receptors → fatigable weakness</li>
                <li>Osserman classification: I (ocular), IIA (mild generalised), IIB (moderate), III (acute severe/bulbar), IV (myasthenic crisis)</li>
                <li>Associated with thymoma (15%), thymic hyperplasia (65%), and other autoimmune diseases</li>
                <li>Predictors of postoperative ventilation: disease duration &gt;6 years, pyridostigmine dose &gt;750 mg/day, VC &lt;2.9 L, bulbar symptoms</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Anaesthetic Management</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Continue anticholinesterases preoperatively (some omit on morning of surgery to reduce secretions and unpredictable NMBA response)</li>
                <li>Non-depolarising NMBAs: exquisitely sensitive — use 10–50% of normal dose; titrate with neuromuscular monitoring</li>
                <li>Suxamethonium: relative resistance (reduced receptors); ED₉₅ is 2.6× normal; phase II block may occur</li>
                <li>Sugammadex: preferred for reversal of rocuronium — avoids anticholinesterase interactions</li>
                <li>Regional anaesthesia preferred where possible — avoids NMBAs and respiratory depression</li>
                <li>Volatile agents provide some muscle relaxation — may allow intubation without NMBAs in mild cases</li>
                <li>Postoperative: ICU/HDU for monitoring; plan for possible prolonged ventilation; early extubation with adequate cough, swallow, and VC</li>
              </ul>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <MGNMBASensitivityDiagram />
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Myasthenic vs Cholinergic Crisis</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Myasthenic crisis: weakness from disease exacerbation — needs more anticholinesterase or immunotherapy</li>
                <li>Cholinergic crisis: weakness from excess anticholinesterase — excessive secretions, bradycardia, miosis</li>
                <li>Edrophonium (Tensilon) test can differentiate — improvement = myasthenic; worsening = cholinergic</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Quantitative Monitoring, Immunotherapy & Drug Conversion</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Quantitative (objective) neuromuscular monitoring — acceleromyography or mechanomyography with TOF ratio — is mandatory throughout, since qualitative/visual TOF assessment cannot reliably detect fade at the safety margins seen in MG; aim for TOF ratio &gt;0.9 before extubation</li>
                <li>Sugammadex 2–4 mg/kg reverses rocuronium-induced block reliably even in MG and avoids anticholinesterase-related complications (secretions, bradycardia, unmasking cholinergic crisis); higher doses (up to 16 mg/kg) may be needed for immediate reversal of deep block</li>
                <li>Leventhal criteria predict need for postoperative ventilation: disease duration &gt;6 years, coexisting COPD, pyridostigmine dose &gt;750 mg/day, vital capacity &lt;2.9 L — 2 or more positive criteria predicts a high likelihood of requiring postoperative ventilatory support</li>
                <li>Pyridostigmine–neostigmine conversion: oral pyridostigmine 60 mg ≈ IV neostigmine 0.5–1 mg (roughly 1/30th the oral pyridostigmine dose) if the enteral route is temporarily unavailable perioperatively; give with glycopyrronium to limit muscarinic side effects</li>
                <li>Preoperative optimisation for severe/bulbar/respiratory disease: plasma exchange (typically 5 exchanges over 7–14 days) or IVIG 0.4 g/kg/day for 5 days (total 2 g/kg) — both produce rapid but temporary improvement (weeks); equivalent efficacy, do not combine</li>
                <li>Lambert-Eaton myasthenic syndrome (LEMS) — a key exam contrast: presynaptic voltage-gated calcium channel antibodies (often paraneoplastic, small cell lung cancer) cause proximal weakness that <em>improves</em> with repeated activity (post-tetanic potentiation), autonomic dysfunction (dry mouth) is prominent, and patients are sensitive to <strong>both</strong> depolarising and non-depolarising NMBAs — reduce doses of all NMBAs and anticipate a poor/absent response to anticholinesterases</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Epilepsy */}
        <section id="section-epilepsy" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Epilepsy</h2>
          <ExamMappingBadges exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_09"]} />
          <EpilepsyPathophysDiagram />
          <PathophysDrugMapper
            title="Pathophysiology → anaesthetic drug effects"
            tagline="Tap a mechanism to see the linked drug implications and key cautions."
            mechanisms={epilepsyMechanisms}
          />
          <FRCARelevanceCallout
            bottomLine="Continue all AEDs perioperatively, avoid pro-convulsant agents, and account for enzyme induction altering anaesthetic drug clearance."
            implications={[
              "Avoid: enflurane, pethidine, tramadol, methohexitone; use with caution: ketamine, high-dose remifentanil.",
              "Safe: propofol (anticonvulsant), thiopentone, sevoflurane, isoflurane, fentanyl, rocuronium.",
              "Enzyme inducers (carbamazepine, phenytoin, phenobarbital) accelerate clearance of NMBAs and opioids — anticipate higher dose needs.",
              "Sodium valproate may impair platelet function — check FBC/coagulation before neuraxial block.",
              "Intraop seizure: oxygenate, midazolam 2–5 mg, propofol bolus, thiopentone for refractory.",
            ]}
            buzzwords={[
              "Glutamate–GABA imbalance",
              "Pro-convulsant: enflurane/tramadol",
              "Enzyme induction",
              "Valproate platelet dysfunction",
              "Status epilepticus",
              "Continue AEDs",
            ]}
            vivaStem="A patient on phenytoin and sodium valproate is listed for spinal surgery — what perioperative issues do you anticipate?"
          />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Continue all anticonvulsant medications perioperatively — abrupt withdrawal risks status epilepticus</li>
                <li>Enzyme-inducing AEDs (carbamazepine, phenytoin, phenobarbital) → increased hepatic metabolism → faster clearance of opioids, NMBAs, and other anaesthetic drugs</li>
                <li>Non-enzyme-inducing: valproate, levetiracetam, lamotrigine — fewer drug interactions</li>
                <li>Valproate: impairs platelet function and coagulation — check FBC and coagulation preoperatively</li>
                <li>Drugs that lower seizure threshold (avoid/use with caution): enflurane, tramadol, pethidine, methohexitone, ketamine (controversial)</li>
                <li>Safe agents: propofol (anticonvulsant), thiopentone, sevoflurane, isoflurane, fentanyl, rocuronium</li>
                <li>Intraoperative seizure management: ensure oxygenation, midazolam 2–5 mg IV, propofol bolus, thiopentone for refractory seizures</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Parenteral Equivalents & Perioperative AED Continuity</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>If the enteral route is unavailable, convert to IV equivalents rather than omitting doses: levetiracetam has 1:1 oral:IV bioavailability (typical 500–1500 mg BD, infused over 15 min); sodium valproate IV is also 1:1 with oral dose; phenytoin can be given IV (loading 15–20 mg/kg, maintenance 100 mg every 6–8 h) with cardiac monitoring (risk of hypotension/arrhythmia with rapid administration, max rate 50 mg/min); carbamazepine has no parenteral formulation — bridge with an alternative (e.g. IV levetiracetam or phenytoin) if NBM for a prolonged period</li>
                <li>Missing even a single dose of a long-term AED can precipitate seizures or status epilepticus — liaise with pharmacy/neurology early for complex regimens and prioritise same-day surgery to minimise fasting time</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Status Epilepticus: Stepwise Escalation</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Definition: a single seizure lasting &gt;5 minutes, or ≥2 seizures within 5 minutes without full recovery of consciousness between them</li>
                <li><strong>0–5 min (stabilisation):</strong> ABC, high-flow oxygen, check glucose (give 100 mg IV thiamine + 50 mL 50% glucose if hypoglycaemic or alcohol-dependent), IV access, note time of onset</li>
                <li><strong>5–20 min (first-line benzodiazepine):</strong> lorazepam 4 mg IV (repeat once after 10 min if seizure continues) — preferred IV agent; if no IV access, buccal midazolam 10 mg or rectal diazepam 10–20 mg</li>
                <li><strong>20–40 min (second-line):</strong> levetiracetam 60 mg/kg IV (max 4.5 g) over 15 min, OR phenytoin 20 mg/kg IV loading (max 2 g, rate ≤50 mg/min with ECG/BP monitoring), OR sodium valproate 40 mg/kg IV (max 3 g) — choice guided by local protocol and comorbidity (avoid valproate in known/possible hepatic disease or childbearing potential)</li>
                <li><strong>40–60 min (refractory status — general anaesthesia):</strong> rapid sequence induction with thiopentone 3–5 mg/kg or propofol 2 mg/kg ± infusion, intubate and ventilate, continuous EEG monitoring where available, involve ICU/neurology</li>
                <li>Enzyme induction relevance during escalation: patients on enzyme-inducing AEDs (carbamazepine, phenytoin) will have accelerated clearance of induction agents, benzodiazepines and NMBAs — anticipate higher maintenance requirements and more rapid emergence from single bolus doses</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Multiple Sclerosis */}
        <section id="section-multiple-sclerosis" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Multiple Sclerosis</h2>
          <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_09"]} />
          <MSPathophysDiagram />
          <PathophysDrugMapper
            title="Pathophysiology → anaesthetic drug effects"
            tagline="Tap a mechanism to see the linked drug implications and key cautions."
            mechanisms={msMechanisms}
          />
          <FRCARelevanceCallout
            bottomLine="Document baseline deficits, maintain normothermia, and choose the lowest-risk neuraxial technique — surgery, stress, and pyrexia can precipitate relapse."
            implications={[
              "Epidural generally considered safe; spinal more controversial — use lowest effective LA concentration.",
              "Avoid suxamethonium where significant motor deficit exists (denervation hyperkalaemia).",
              "Maintain strict normothermia — Uhthoff phenomenon can unmask deficits.",
              "Disease-modifying therapies (natalizumab, fingolimod) are immunosuppressive — heightened infection risk.",
            ]}
            buzzwords={[
              "Demyelination",
              "Saltatory conduction failure",
              "Uhthoff phenomenon",
              "Relapsing-remitting",
              "Document baseline deficit",
              "Epidural > spinal",
            ]}
            vivaStem="A woman with relapsing-remitting MS requests epidural analgesia in labour — how do you counsel her?"
          />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Demyelinating autoimmune disease affecting CNS; relapsing-remitting in 85%</li>
                <li>Triggers for relapse: stress, infection, hyperthermia, surgery — avoid perioperative pyrexia</li>
                <li>Neuraxial anaesthesia: epidural generally considered safe; spinal anaesthesia more controversial (demyelinated cord exposed to higher LA concentrations)</li>
                <li>Use lowest effective concentration of LA for neuraxial techniques</li>
                <li>General anaesthesia: all agents considered safe; avoid suxamethonium if significant motor deficit (hyperkalaemia risk from denervation)</li>
                <li>Document all pre-existing neurological deficits preoperatively (medicolegal importance)</li>
                <li>Disease-modifying therapies (natalizumab, fingolimod): immunosuppressive — infection risk; discuss with neurologist</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Relapse Risk, Disease-Modifying Therapy & Spasticity</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Perioperative pyrexia (even &lt;1°C rise) can transiently worsen conduction block in demyelinated axons (Uhthoff phenomenon) and is associated with relapse — maintain strict normothermia with active warming and antipyretics for fever</li>
                <li>Physiological and psychological stress of surgery/illness is an independent relapse trigger, independent of anaesthetic technique — counsel patients that relapse risk relates more to the surgical stress response and infection than to the anaesthetic agents chosen</li>
                <li>Disease-modifying therapies: interferon-beta and glatiramer acetate carry low infection/interaction risk; natalizumab, fingolimod, alemtuzumab and ocrelizumab are more potently immunosuppressive — increased risk of infection (including opportunistic, e.g. PML with natalizumab) and may need surgery timed relative to dosing/lymphocyte recovery in discussion with neurology</li>
                <li>Baclofen (oral or intrathecal pump) is first-line for MS spasticity; abrupt withdrawal (pump failure, catheter disconnection, running out of oral drug) causes a life-threatening baclofen withdrawal syndrome — high fever, rebound spasticity/rigidity, pruritus, altered mental status progressing to rhabdomyolysis, multi-organ failure and seizures; treatment is prompt restoration of baclofen (oral or intrathecal), IV benzodiazepines for symptom control, and supportive critical care</li>
                <li>Continue baclofen perioperatively wherever possible; if an intrathecal pump is in situ, involve the pain/neurosurgical pump team before surgery near the pump/catheter or before any interruption in delivery</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Parkinson's Disease */}
        <section id="section-parkinsons-disease" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Parkinson's Disease</h2>
          <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_09"]} />
          <PDPathophysDiagram />
          <PathophysDrugMapper
            title="Pathophysiology → anaesthetic drug effects"
            tagline="Tap a mechanism to see the linked drug implications and key cautions."
            mechanisms={pdMechanisms}
          />
          <FRCARelevanceCallout
            bottomLine="Continue levodopa up to surgery and restart ASAP; avoid all central dopamine antagonists; expect autonomic instability and gastroparesis."
            implications={[
              "Restart levodopa via NG tube if oral route delayed — abrupt withdrawal → NMS-like syndrome.",
              "Absolutely avoid metoclopramide, droperidol, prochlorperazine, haloperidol — use ondansetron or domperidone.",
              "Treat as full stomach if symptomatic gastroparesis — RSI considered.",
              "Regional anaesthesia preferred where feasible; remifentanil + rocuronium a clean TIVA combination.",
            ]}
            buzzwords={[
              "Substantia nigra dopaminergic loss",
              "Lewy bodies",
              "NMS-like syndrome",
              "Avoid D₂ antagonists",
              "Levodopa via NG",
              "Gastroparesis",
            ]}
            vivaStem="A 78-year-old with advanced Parkinson's disease needs an emergency laparotomy — outline your perioperative plan."
          />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Dopaminergic neuron degeneration in substantia nigra → tremor, rigidity, bradykinesia, postural instability</li>
                <li>Critical: continue levodopa up to time of surgery and restart ASAP postoperatively (via NG if needed)</li>
                <li>Abrupt levodopa withdrawal → NMS-like syndrome (rigidity, hyperthermia, rhabdomyolysis, autonomic instability)</li>
                <li>Absolutely avoid dopamine antagonists: metoclopramide, droperidol, prochlorperazine, haloperidol — use domperidone or ondansetron as antiemetics</li>
                <li>Autonomic dysfunction: postural hypotension, gastroparesis (aspiration risk), sialorrhoea, bladder dysfunction</li>
                <li>Rigidity may impair chest wall compliance and respiratory function</li>
                <li>Regional anaesthesia preferred where feasible — avoids polypharmacy interactions</li>
                <li>Propofol may cause dyskinesia in some patients; remifentanil and rocuronium are safe</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Advanced Therapies</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong>Deep brain stimulation (DBS):</strong> check device manufacturer, battery status and current settings preoperatively with the neurology/functional neurosurgery team; use bipolar diathermy only, with the return (neutral) pad sited remote from the implanted pulse generator and leads; switch the device off before diathermy or external defibrillation to prevent current induction, tissue heating and hardware damage, then confirm settings on reprogramming; stimulation on/off state affects emergence (rigidity/tremor may return when off) and can produce artefact on EEG-based depth-of-anaesthesia monitoring; MRI is generally contraindicated or requires MR-conditional mode and specialist protocols</li>
                <li><strong>Duodopa (levodopa–carbidopa intestinal gel):</strong> delivered continuously via a jejunal (PEG-J) tube; protect the PEG-J site and stoma during positioning and surgery, and continue the pump perioperatively wherever feasible; if interrupted (e.g. abdominal surgery, tube displacement), plan an equivalent oral, enteral or transdermal replacement using levodopa-equivalent dosing to avoid acute akinesia and NMS-like withdrawal</li>
                <li><strong>Apomorphine infusion:</strong> a potent subcutaneous dopamine agonist used for severe motor fluctuations; causes severe nausea and vomiting — pretreat/cover with domperidone; avoid ondansetron and other 5-HT3 antagonists in combination, as this can precipitate profound, severe hypotension and collapse</li>
                <li><strong>Rotigotine transdermal patch:</strong> useful bridging therapy when the patient is nil by mouth or the enteral route is unavailable perioperatively; convert the usual oral dopaminergic regimen using published levodopa-equivalent dose tables</li>
                <li>Across all regimens, avoid metoclopramide, prochlorperazine, haloperidol and droperidol — central D2-antagonism can precipitate severe rigidity and an NMS-like crisis <InlineRef topicId="neurological-disease" refLabel="BJA Educ PD 2014" /> <InlineRef topicId="neurological-disease" refLabel="NICE NG71 (Parkinsons)" /></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Motor Neuron Disease */}
        <section id="section-motor-neuron-disease" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Motor Neuron Disease</h2>
          <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_09"]} />
          <MNDPathophysDiagram />
          <PathophysDrugMapper
            title="Pathophysiology → anaesthetic drug effects"
            tagline="Tap a mechanism to see the linked drug implications and key cautions."
            mechanisms={mndMechanisms}
          />
          <FRCARelevanceCallout
            bottomLine="Suxamethonium absolutely contraindicated; non-depolarising NMBAs profoundly potentiated; bulbar/respiratory weakness dictates ventilation strategy and advance care planning."
            implications={[
              "Use rocuronium at reduced dose with quantitative TOF; reverse with sugammadex.",
              "Avoid long-acting opioids/sedatives — high risk of postoperative respiratory failure.",
              "Consider awake fibreoptic intubation if bulbar weakness or difficult airway anticipated.",
              "Discuss DNR, NIV preferences and feeding decisions before surgery.",
            ]}
            buzzwords={[
              "UMN + LMN degeneration",
              "Extra-junctional AChRs",
              "Denervation hyperkalaemia",
              "Sux contraindicated",
              "Bulbar palsy",
              "Advance care planning",
            ]}
            vivaStem="A patient with ALS presents for PEG insertion — what airway and ventilation issues do you anticipate?"
          />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Progressive degeneration of upper and lower motor neurons; mean survival 3–5 years from diagnosis</li>
                <li>Suxamethonium absolutely contraindicated — risk of lethal hyperkalaemia from denervation supersensitivity</li>
                <li>Non-depolarising NMBAs: increased sensitivity — use reduced doses with neuromuscular monitoring</li>
                <li>Respiratory: bulbar dysfunction (aspiration risk), restrictive defect, weak cough — may not tolerate supine position</li>
                <li>Consider awake fibreoptic intubation if difficult airway anticipated</li>
                <li>Discuss advance care planning: DNR status, NIV preferences, feeding decisions</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Respiratory Assessment and Ventilatory Support</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Symptoms of respiratory muscle weakness: orthopnoea, morning headache (nocturnal hypercapnia), daytime somnolence and fatigue, weak/ineffective cough with poor secretion clearance</li>
                <li>Bedside measures: sniff nasal inspiratory pressure (SNIP), supine vs erect FVC (a fall of &gt;20–25% supine indicates diaphragmatic weakness), FVC &lt;50% predicted marks significant respiratory muscle involvement and prompts NIV assessment</li>
                <li>NIV (typically bilevel) for nocturnal hypoventilation improves quality of life and survival; initiate for symptomatic nocturnal hypoventilation, orthopnoea, or FVC/SNIP decline even before daytime hypercapnia develops — early initiation is key <InlineRef topicId="neurological-disease" refLabel="NICE NG42 (MND)" /></li>
                <li>Sialorrhoea management: glycopyrronium (reduces secretions with less CNS penetration than hyoscine), hyoscine hydrobromide transdermal patch, atropine eye drops given sublingually, or botulinum toxin injection into salivary glands for refractory cases</li>
                <li>Aspiration risk from bulbar weakness drives early consideration of gastrostomy (PEG/RIG) for nutrition — ideally performed before FVC falls below ~50% predicted, as respiratory reserve dictates procedural risk and anaesthetic technique</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Anaesthetic Care and Advance Care Planning</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Suxamethonium absolutely avoided — denervation-related upregulation of extra-junctional receptors risks life-threatening hyperkalaemia</li>
                <li>Marked sensitivity to non-depolarising NMBAs — use reduced doses with mandatory quantitative (TOF) monitoring; sugammadex reversal for rocuronium</li>
                <li>Increased sensitivity to opioids and sedatives — titrate cautiously, favour short-acting agents, and anticipate exaggerated respiratory depression</li>
                <li>Use regional or local anaesthetic techniques wherever feasible to avoid airway instrumentation and systemic sedation</li>
                <li>High risk of postoperative ventilator dependence in patients with pre-existing respiratory muscle weakness — plan critical care disposition and discuss realistic weaning/extubation goals before surgery</li>
                <li>Early and ongoing advance care planning is essential: agree a ceiling of treatment and complete a ReSPECT (or equivalent) form; discuss tracheostomy ventilation as a treatment option and the patient's wishes regarding it; where ventilatory support is to be withdrawn, plan this with anticipatory symptom control (opioids, benzodiazepines) and specialist palliative care input <InlineRef topicId="neurological-disease" refLabel="NICE NG42 (MND)" /></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Muscular Dystrophies */}
        <section id="section-muscular-dystrophies" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Muscular Dystrophies</h2>
          <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_09"]} />
          <MDPathophysDiagram />
          <PathophysDrugMapper
            title="Pathophysiology → anaesthetic drug effects"
            tagline="Tap a mechanism to see the linked drug implications and key cautions."
            mechanisms={mdMechanisms}
          />
          <FRCARelevanceCallout
            bottomLine="Avoid suxamethonium AND volatile agents — use TIVA; assess cardiomyopathy and conduction disease preoperatively; in DM1 also prevent myotonia triggers."
            implications={[
              "TIVA with propofol/remifentanil is the default; reverse rocuronium with sugammadex.",
              "Suxamethonium → rhabdomyolysis, hyperkalaemia, cardiac arrest in all dystrophies.",
              "DM1: avoid sux, neostigmine, hypothermia, shivering, diathermy near muscle (myotonia triggers).",
              "Pre-op echo (DMD cardiomyopathy) and ECG (DM1 conduction disease) essential.",
            ]}
            buzzwords={[
              "Dystrophin deficiency",
              "MH-like reaction (not true MH)",
              "Rhabdomyolysis + hyperkalaemia",
              "TIVA only",
              "Myotonia triggers",
              "DMD cardiomyopathy",
            ]}
            vivaStem="A teenage boy with Duchenne muscular dystrophy needs scoliosis surgery — what are the key anaesthetic considerations?"
          />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Duchenne MD: X-linked recessive; cardiomyopathy develops by teens; scoliosis → restrictive lung disease</li>
                <li>Suxamethonium contraindicated in ALL muscular dystrophies — risk of rhabdomyolysis, hyperkalaemia, and cardiac arrest</li>
                <li>Volatile agents: risk of rhabdomyolysis/MH-like reaction (not true MH but clinically similar) — TIVA recommended</li>
                <li>Cardiomyopathy: preoperative echocardiography essential; avoid myocardial depressants</li>
                <li>Myotonic dystrophy (DM1): myotonia (sustained contraction not reversed by NMBAs), cardiomyopathy, conduction abnormalities (require preop ECG), central and obstructive sleep apnoea</li>
                <li>Myotonia triggers: suxamethonium, neostigmine, hypothermia, shivering, diathermy</li>
                <li>TIVA with propofol/remifentanil is preferred; use sugammadex for reversal if rocuronium used</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Spinal Cord Injury */}
        <section id="section-spinal-cord-injury" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Spinal Cord Injury</h2>
          <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_09"]} />
          <SCIPathophysDiagram />
          <PathophysDrugMapper
            title="Pathophysiology → anaesthetic drug effects"
            tagline="Tap a mechanism to see the linked drug implications and key cautions."
            mechanisms={sciMechanisms}
          />
          <FRCARelevanceCallout
            bottomLine="From 24 h post-injury sux is contraindicated; lesions ≥T6 risk autonomic dysreflexia — block the afferent limb with deep GA or dense neuraxial block."
            implications={[
              "Use rocuronium + sugammadex; avoid sux from 24 h post-injury indefinitely.",
              "Dysreflexia: sit up, remove trigger (usually bladder), GTN/nifedipine/labetalol ready.",
              "Spinal/epidural blocks the dysreflexic reflex — preferred for lower-body and obstetric surgery.",
              "Poikilothermia and respiratory loss (high lesions): active warming and short-acting agents mandatory.",
            ]}
            buzzwords={[
              "Denervation hyperkalaemia",
              "Lesion ≥ T6",
              "Autonomic dysreflexia",
              "Bladder distension trigger",
              "Reflex bradycardia + HTN",
              "Poikilothermia",
            ]}
            vivaStem="A T4 paraplegic patient develops severe hypertension and headache during cystoscopy — what is happening and how do you manage it?"
          />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Suxamethonium contraindicated from 24 hours to ≥12 months post-injury (risk persists indefinitely in some) — denervation hyperkalaemia</li>
                <li>Autonomic dysreflexia: occurs with lesions ≥T6; uninhibited sympathetic discharge below lesion</li>
                <li>Triggers: bladder distension (most common), bowel distension, skin stimulation below lesion, uterine contractions</li>
                <li>Presentation: severe hypertension (can cause CVA, MI), reflex bradycardia, headache, flushing/sweating above lesion, pallor below</li>
                <li>Management: sit patient up immediately and loosen restrictive clothing; identify and remove the trigger first (check/empty bladder — catheter kink/blockage is the commonest cause — then check for faecal impaction)</li>
                <li>First-line pharmacotherapy: GTN 1–2 sublingual sprays (400–800 microgram) or IV infusion 10–20 microgram/min titrated to effect — contraindicated within 24 h of phosphodiesterase-5 inhibitors (sildenafil, tadalafil) because of profound refractory hypotension; nifedipine 5–10 mg orally as a bite-and-swallow capsule (avoid sublingual administration — absorption is unpredictable and can produce precipitous, hard-to-reverse hypotension)</li>
                <li>Second-line/refractory hypertension: labetalol 10–20 mg IV boluses, phentolamine 1–5 mg IV, or sodium nitroprusside infusion in a critical care setting with arterial monitoring</li>
                <li>Reflex bradycardia: treat only if haemodynamically compromising (atropine 300–600 microgram IV) — do not treat the bradycardia in isolation while hypertension persists untreated</li>
                <li>For surgery in patients at risk (e.g. cystoscopy, urodynamics, obstetric delivery), deep general anaesthesia or dense spinal/epidural block prevents recurrence by blocking the afferent limb of the reflex — light GA is inadequate <InlineRef topicId="neurological-disease" refLabel="Autonomic Dysreflexia" /></li>
                <li>Chronic SCI: osteoporosis (fracture risk with positioning), pressure areas, thermoregulation impairment (poikilothermia), latex allergy (repeated catheterisations)</li>
                <li>Respiratory: lesion above C3–5 → diaphragm paralysis (phrenic nerve); thoracic lesions → reduced FVC (loss of intercostal/abdominal muscles)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Guillain-Barre Syndrome */}
        <section id="section-guillain-barre" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Guillain–Barré Syndrome</h2>
          <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_09", "NA_BK_01"]} />
          <FRCARelevanceCallout
            bottomLine="An acute, often post-infectious, immune-mediated polyradiculoneuropathy with ascending weakness, autonomic instability and a real risk of ventilatory failure — suxamethonium is contraindicated and respiratory trends (the 20/30/40 rule) drive intubation timing."
            implications={[
              "Suxamethonium contraindicated — denervation hyperkalaemia can cause cardiac arrest.",
              "Marked sensitivity to non-depolarising NMBAs — reduce dose and use quantitative monitoring.",
              "Labile autonomic function — use invasive arterial monitoring and titrate vasoactive drugs cautiously; exaggerated pressor/depressor responses.",
              "20/30/40 rule for elective intubation: VC <20 ml/kg, MIP <30 cmH₂O, MEP <40 cmH₂O.",
              "IVIG 0.4 g/kg/day for 5 days or plasma exchange — equivalent efficacy, do not combine.",
            ]}
            buzzwords={[
              "Ascending symmetrical weakness",
              "Areflexia",
              "AMAN / Miller Fisher variant",
              "Post-Campylobacter jejuni",
              "20/30/40 rule",
              "IVIG vs plasma exchange",
              "Autonomic lability",
            ]}
            vivaStem="A previously fit 30-year-old develops ascending weakness two weeks after a diarrhoeal illness and is now on the ward with a rising respiratory rate — how do you assess and manage them?"
          />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Pathophysiology and Presentation</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Acute inflammatory demyelinating polyradiculoneuropathy (AIDP), the commonest variant of Guillain–Barré syndrome (GBS); typically occurs 1–3 weeks after an infective trigger — <em>Campylobacter jejuni</em>, cytomegalovirus, or Epstein–Barr virus — via molecular mimicry against peripheral nerve gangliosides</li>
                <li>Progressive, ascending, broadly symmetrical limb weakness with hyporeflexia/areflexia; sensory symptoms often precede motor signs; bulbar involvement (dysphagia, facial weakness) and respiratory muscle weakness occur in a significant proportion</li>
                <li>Recognised variants: acute motor axonal neuropathy (AMAN, pure motor, axonal, associated with anti-GM1 antibodies), and Miller Fisher syndrome (ophthalmoplegia, ataxia, areflexia, anti-GQ1b antibodies)</li>
                <li>Autonomic dysfunction is common and can be severe: labile blood pressure, tachyarrhythmias or bradyarrhythmias, and exaggerated/unpredictable responses to vasoactive drugs and positional change <InlineRef topicId="neurological-disease" refLabel="Lancet GBS 2016" /></li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Anaesthetic Considerations</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Suxamethonium is contraindicated — denervation-related upregulation of extra-junctional acetylcholine receptors risks massive potassium efflux and cardiac arrest</li>
                <li>Marked sensitivity to non-depolarising NMBAs — use reduced doses with mandatory quantitative (TOF) neuromuscular monitoring</li>
                <li>Autonomic instability warrants invasive arterial blood pressure monitoring for any anaesthetic or major intervention, with cautious, incremental use of vasopressors/vasodilators given exaggerated responses</li>
                <li>Neuraxial techniques should be used cautiously (and generally avoided in the acute phase) because of autonomic lability and the theoretical risk of triggering/confounding evolving neurology</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Critical Care Management</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Serial bedside spirometry to track deterioration — the "20/30/40 rule" flags the need for elective intubation: vital capacity &lt;20 ml/kg, maximum inspiratory pressure (MIP) &lt;30 cmH₂O, or maximum expiratory pressure (MEP) &lt;40 cmH₂O</li>
                <li>Bulbar signs (weak cough, pooling secretions, dysphagia) and rapid rate of progression (e.g. the EGRIS — Erasmus GBS Respiratory Insufficiency Score) should also prompt early, controlled/elective intubation rather than waiting for crisis</li>
                <li>Disease-modifying treatment: intravenous immunoglobulin 0.4 g/kg/day for 5 days, or plasma exchange — these have equivalent efficacy and should not be combined</li>
                <li>Supportive critical care: VTE prophylaxis (immobility and dysautonomia increase risk), neuropathic pain management (gabapentinoids, e.g. gabapentin or pregabalin), meticulous pressure area care, early physiotherapy and rehabilitation planning given the prolonged recovery trajectory <InlineRef topicId="neurological-disease" refLabel="Lancet GBS 2016" /></li>
              </ul>
            </div>
          </div>
        </section>
        <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              'Myasthenia gravis: sensitive to non-depolarising NMBs — reduce dose by 50–75%, titrate with TOF; resistant to suxamethonium. Sugammadex preferred for reversal.',
              'Dystrophinopathies (DMD/BMD): avoid suxamethonium and volatile agents (rhabdomyolysis, hyperkalaemic arrest) — TIVA only.',
              'Myotonic dystrophy: extreme sensitivity to anaesthetics, opioids and NMBs; avoid suxamethonium (myotonic contraction); plan for postoperative respiratory support.',
              "Parkinson's: never stop l-dopa (risk of neuroleptic malignant–like syndrome); avoid metoclopramide, prochlorperazine, droperidol (D2-antagonists).",
              'Epilepsy: continue AEDs; avoid pro-convulsants (tramadol, pethidine, high-dose propofol with rapid bolus, enflurane).',
              'Spinal cord injury >24 h: avoid suxamethonium (extra-junctional ACh receptors → hyperkalaemic arrest); high lesions risk autonomic dysreflexia.',
            ]}
          />
          <TopicFaqs faqs={neurologicalDiseaseFaqs} />
        </ExamSection>
      }
    />
  );
};

export default NeurologicalDiseaseTopic;
