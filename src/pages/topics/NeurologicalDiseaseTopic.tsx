import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamMappingBadges } from "@/components/ExamMappingBadges";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";
import { neurologicalDiseaseQuestions } from "@/data/quizzes";
import MGNMBASensitivityDiagram from "@/components/diagrams/MGNMBASensitivityDiagram";
import {
  MGPathophysDiagram,
  EpilepsyPathophysDiagram,
  MSPathophysDiagram,
  PDPathophysDiagram,
  MNDPathophysDiagram,
  MDPathophysDiagram,
  SCIPathophysDiagram,
} from "@/components/diagrams/NeuroDiseasePathophysDiagram";
import { PathophysDrugMapper } from "@/components/diagrams/PathophysDrugMapper";
import { FRCARelevanceCallout } from "@/components/FRCARelevanceCallout";
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

const objectives = [
  "Choose neuromuscular blockers and reversal strategies for myasthenia gravis and other neuromuscular disorders.",
  "Manage patients with epilepsy peri-operatively, avoiding pro-convulsant agents.",
  "Plan anaesthesia for multiple sclerosis and Parkinson's disease without precipitating relapse or withdrawal.",
  "Recognise and treat autonomic dysreflexia in spinal cord injury.",
  "Adjust technique for muscular dystrophies and motor neuron disease (MH risk, sux/volatile avoidance).",
];

const keyPoints = [
  { text: "Myasthenia gravis: increased sensitivity to non-depolarising NMBAs (use 10–50% of normal dose); resistance to suxamethonium (ED₉₅ 2.6× normal); always use neuromuscular monitoring", cites: ["BJA Educ MG 2018", "AAGBI Neuromuscular"] },
  { text: "Epilepsy: avoid drugs that lower seizure threshold (enflurane, tramadol, high-dose remifentanil); propofol and sevoflurane are generally safe; ensure therapeutic anticonvulsant levels preoperatively", cites: ["BJA Educ Epilepsy 2015"] },
  { text: "Multiple sclerosis: neuraxial anaesthesia may be associated with postoperative relapse (controversial); spinal anaesthesia carries higher risk than epidural; document existing deficits preoperatively", cites: ["AAGBI Neuromuscular"] },
  { text: "Parkinson's disease: continue levodopa until immediately before surgery and restart ASAP postoperatively — abrupt withdrawal can cause neuroleptic malignant-like syndrome; avoid all dopamine antagonists (metoclopramide, droperidol, prochlorperazine)", cites: ["BJA Educ PD 2014"] },
  { text: "Autonomic dysreflexia in spinal cord injury (lesion ≥T6): massive sympathetic discharge below lesion triggered by bladder/bowel distension — treat with removal of stimulus, GTN, and nifedipine; can cause life-threatening hypertension and bradycardia", cites: ["Autonomic Dysreflexia"] },

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
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={neurologicalDiseaseQuestions}
      diagrams={<MGNMBASensitivityDiagram />}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM] },
        diagrams: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["BJA Educ MG 2018", "BJA Educ PD 2014", "BJA Educ Epilepsy 2015"],
        diagrams: ["BJA Educ MG 2018", "AAGBI Neuromuscular"],
        keyPoints: ["BJA Educ MG 2018", "BJA Educ PD 2014", "BJA Educ Epilepsy 2015", "AAGBI Neuromuscular", "Autonomic Dysreflexia"],
      }}
      coreConcepts={
        <>
          <p className="text-muted-foreground leading-relaxed">
          Neurological co-existing disease changes drug handling, raises specific intra-operative risks, and dictates choices around regional versus general anaesthesia. This topic covers the high-yield conditions — myasthenia gravis, epilepsy, MS, Parkinson's disease, motor neuron disease, muscular dystrophies, and spinal cord injury — with an emphasis on neuromuscular blocker selection, autonomic safety, and continuation of disease-modifying therapy.
        </p>

        {/* Myasthenia Gravis */}
        <section>
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
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Myasthenic vs Cholinergic Crisis</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Myasthenic crisis: weakness from disease exacerbation — needs more anticholinesterase or immunotherapy</li>
                <li>Cholinergic crisis: weakness from excess anticholinesterase — excessive secretions, bradycardia, miosis</li>
                <li>Edrophonium (Tensilon) test can differentiate — improvement = myasthenic; worsening = cholinergic</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Epilepsy */}
        <section>
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
          </div>
        </section>

        {/* Multiple Sclerosis */}
        <section>
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
          </div>
        </section>

        {/* Parkinson's Disease */}
        <section>
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
          </div>
        </section>

        {/* Motor Neuron Disease */}
        <section>
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
          </div>
        </section>

        {/* Muscular Dystrophies */}
        <section>
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
        <section>
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
                <li>Management: sit patient up, remove trigger, GTN spray/infusion, nifedipine, labetalol; regional/general anaesthesia for surgical procedures</li>
                <li>Chronic SCI: osteoporosis (fracture risk with positioning), pressure areas, thermoregulation impairment (poikilothermia), latex allergy (repeated catheterisations)</li>
                <li>Respiratory: lesion above C3–5 → diaphragm paralysis (phrenic nerve); thoracic lesions → reduced FVC (loss of intercostal/abdominal muscles)</li>
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
        </>
      }
    />
  );
};

export default NeurologicalDiseaseTopic;
