import { SectionLayout } from "@/components/SectionLayout";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { ReferencesList } from "@/components/ReferencesList";
import { neurologicalDiseaseQuestions } from "@/data/quizzes";
import { SeeAlso } from "@/components/SeeAlso";

const keyPoints = [
  "Myasthenia gravis: increased sensitivity to non-depolarising NMBAs (use 10–50% of normal dose); resistance to suxamethonium (ED₉₅ 2.6× normal); always use neuromuscular monitoring",
  "Epilepsy: avoid drugs that lower seizure threshold (enflurane, tramadol, high-dose remifentanil); propofol and sevoflurane are generally safe; ensure therapeutic anticonvulsant levels preoperatively",
  "Multiple sclerosis: neuraxial anaesthesia may be associated with postoperative relapse (controversial); spinal anaesthesia carries higher risk than epidural; document existing deficits preoperatively",
  "Parkinson's disease: continue levodopa until immediately before surgery and restart ASAP postoperatively — abrupt withdrawal can cause neuroleptic malignant-like syndrome; avoid all dopamine antagonists (metoclopramide, droperidol, prochlorperazine)",
  "Autonomic dysreflexia in spinal cord injury (lesion ≥T6): massive sympathetic discharge below lesion triggered by bladder/bowel distension — treat with removal of stimulus, GTN, and nifedipine; can cause life-threatening hypertension and bradycardia",
];

const NeurologicalDiseaseTopic = () => {
  return (
    <SectionLayout
      title="Neurological Co-Existing Disease"
      subtitle="Myasthenia gravis, epilepsy, multiple sclerosis, Parkinson's disease, motor neuron disease, muscular dystrophies, and spinal cord injury"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
    >
      <div className="space-y-8">
        <KeyLearningPoints points={keyPoints} />

        {/* Myasthenia Gravis */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Myasthenia Gravis</h2>
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

        <QuizSection questions={neurologicalDiseaseQuestions} />
        <ReferencesList topicId="neurological-disease" />
        <SeeAlso topicId="neurological-disease" />
        <TopicCompletionToggle topicId="neurological-disease" topicTitle="Neurological Co-Existing Disease" />
      </div>
    </SectionLayout>
  );
};

export default NeurologicalDiseaseTopic;
