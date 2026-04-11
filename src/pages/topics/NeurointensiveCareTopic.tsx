import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { neurointensiveCareQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";
import ICPMonitoringDevicesDiagram from "@/components/diagrams/ICPMonitoringDevicesDiagram";

const NeurointensiveCareTopic = () => {
  return (
    <SectionLayout title="Neurointensive Care" subtitle="FRCA / FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Traumatic Brain Injury (TBI)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Primary injury occurs at impact (contusion, DAI, haematoma). Secondary injury (hypoxia, hypotension, pyrexia, hyperglycaemia) is preventable and the focus of ICU management.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Target</th>
                  <th className="text-left py-2 text-foreground font-semibold">Goal</th>
                  <th className="text-left py-2 text-foreground font-semibold">Rationale</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">ICP</td><td>&lt;22 mmHg</td><td>BTF guidelines (4th edition). Higher thresholds associated with worse outcomes.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">CPP</td><td>60–70 mmHg</td><td>Below 60: ischaemia risk. Above 70: no additional benefit, risk of ARDS (Lund concept).</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">PaCO₂</td><td>4.5–5.0 kPa</td><td>Normocapnia. Prophylactic hyperventilation harmful. Brief hyperventilation only for acute herniation.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Temperature</td><td>36–37°C</td><td>Pyrexia increases CMRO₂ by 7% per °C. Eurotherm: therapeutic hypothermia harmful in TBI.</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Glucose</td><td>6–10 mmol/L</td><td>Avoid hypoglycaemia and hyperglycaemia — both worsen outcomes.</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Status Epilepticus</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Continuous seizure ≥5 minutes or ≥2 seizures without regaining consciousness. Medical emergency — time-critical escalation.
          </p>
          <div className="space-y-2">
            {[
              { stage: "Stage 1 (0–5 min)", rx: "Benzodiazepine: IV lorazepam 0.1 mg/kg (max 4 mg), repeat once. Buccal midazolam or rectal diazepam if no IV access." },
              { stage: "Stage 2 (5–20 min)", rx: "IV levetiracetam 60 mg/kg (max 4.5g) OR IV phenytoin 20 mg/kg (max rate 50 mg/min, ECG monitoring) OR IV sodium valproate 40 mg/kg." },
              { stage: "Stage 3 (>30 min) — RSE", rx: "Refractory: intubate, propofol or midazolam or thiopentone infusion. Continuous EEG. Aim burst suppression." },
            ].map((s) => (
              <div key={s.stage} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{s.stage}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.rx}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Subarachnoid Haemorrhage (SAH)</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Grading</p>
              <p className="text-sm text-muted-foreground mt-1">WFNS grade (based on GCS ± focal deficit). Fisher grade (CT blood pattern — predicts vasospasm). Hunt & Hess for clinical grade.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Complications</p>
              <p className="text-sm text-muted-foreground mt-1">Rebleeding (highest risk day 1 — secure aneurysm early). Vasospasm (days 3–14, peak day 7 — nimodipine 60 mg 4-hourly, triple-H therapy). Hydrocephalus (EVD). Hyponatraemia (cerebral salt wasting vs SIADH).</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Brain Death & Brainstem Testing</h2>
          <p className="text-muted-foreground leading-relaxed mb-2">
            UK criteria: known irreversible cause of brain damage. Exclude confounders (hypothermia &lt;34°C, drugs, metabolic/endocrine derangement). Two sets of tests by two senior doctors (one ≥5 years registered).
          </p>
          <div className="grid sm:grid-cols-3 gap-2">
            {[
              "Absent pupillary reflexes (CN II, III)",
              "Absent corneal reflexes (CN V, VII)",
              "Absent vestibulo-ocular reflexes (CN VIII)",
              "No motor response in cranial nerve distribution",
              "Absent gag reflex (CN IX, X)",
              "Absent cough reflex (CN X)",
              "Apnoea test: no respiratory effort with PaCO₂ >6.65 kPa",
            ].map((test) => (
              <div key={test} className="p-2 rounded border border-border text-xs text-muted-foreground">{test}</div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Spinal Cord Injury (SCI) — ICU Management</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Acute traumatic SCI requires a multidisciplinary ICU approach. The level and completeness of injury determines respiratory, cardiovascular, and autonomic consequences. Assume spinal instability until cleared. ASIA (American Spinal Injury Association) impairment scale classifies injury severity A–E.
          </p>

          {/* Respiratory management */}
          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Respiratory Support</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Respiratory failure is the leading cause of death after acute cervical SCI. The level of injury determines which respiratory muscles are preserved.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Level</th>
                  <th className="text-left py-2 text-foreground font-semibold">Respiratory Muscles Lost</th>
                  <th className="text-left py-2 text-foreground font-semibold">Consequence</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">C1–C2</td><td>Diaphragm, intercostals, abdominals — all lost</td><td>Apnoea — immediate ventilatory support. Long-term phrenic nerve pacing may be possible.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">C3–C5</td><td>Partial/complete diaphragm loss (C3,4,5 keeps the diaphragm alive). Intercostals and abdominals lost.</td><td>Severely reduced VC (20–30% predicted). High risk of ventilatory failure, especially with ascending oedema in first 48–72h. Early intubation threshold.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">C6–C8</td><td>Intercostals and abdominals lost. Diaphragm intact.</td><td>VC 30–50% predicted. Paradoxical breathing. Impaired cough → secretion retention → atelectasis/pneumonia.</td></tr>
                <tr><td className="py-2 font-medium text-foreground">T1–T12</td><td>Variable intercostal and abdominal loss</td><td>VC 50–80% predicted. Lower thoracic injuries: may manage without ventilatory support but cough remains impaired.</td></tr>
              </tbody>
            </table>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Ventilation Strategy</p>
              <p className="text-sm text-muted-foreground mt-1">
                Monitor VC serially (intubate if VC &lt;15 ml/kg or falling trend). Use lung-protective ventilation if intubated. Early tracheostomy (day 7–10) for cervical injuries — facilitates weaning, secretion clearance, and communication. NIV may bridge in incomplete injuries with adequate bulbar function.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Secretion Management & Cough Augmentation</p>
              <p className="text-sm text-muted-foreground mt-1">
                Loss of abdominal/intercostal muscles → ineffective cough → mucus plugging → atelectasis → pneumonia (leading cause of morbidity). Use assisted cough techniques (quad coughing, abdominal binder), mechanical insufflation-exsufflation (CoughAssist), regular suctioning, chest physiotherapy, and bronchoscopy for refractory lobar collapse.
              </p>
            </div>
          </div>

          {/* Cardiovascular / BP management */}
          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Cardiovascular & Blood Pressure Management</h3>
          <div className="space-y-2 mb-4">
            {[
              { phase: "Neurogenic shock (acute — hours to weeks)", detail: "Loss of sympathetic tone below injury level (T1–L2 sympathetic outflow). Unopposed vagal tone → bradycardia, hypotension, vasodilation, hypothermia. Distinct from hypovolaemic shock: warm peripheries, low HR. Treat with vasopressors (noradrenaline first-line), cautious fluid resuscitation (avoid overload), and atropine/glycopyrrolate for symptomatic bradycardia." },
              { phase: "MAP target", detail: "Maintain MAP ≥85 mmHg (some guidelines 85–90 mmHg) for the first 5–7 days to optimise spinal cord perfusion. Based on AANS/CNS guidelines — analogous to CPP targets in TBI. May require vasopressor infusion for days." },
              { phase: "Autonomic dysreflexia (subacute/chronic — after spinal shock resolves)", detail: "Injuries above T6. Noxious stimulus below injury (full bladder, faecal impaction, pressure sore) → massive sympathetic discharge below lesion → severe hypertension, reflex bradycardia, pounding headache, flushing/sweating above level, pallor below. EMERGENCY: sit patient up, identify and remove stimulus (catheterise, disimpact), treat with GTN or nifedipine if persistent. Can cause seizures, ICH, death." },
              { phase: "VTE prophylaxis", detail: "SCI patients are at very high VTE risk. LMWH (enoxaparin) as soon as haemostasis allows + mechanical prophylaxis (IPC devices). Continue for 8–12 weeks post-injury. IVC filter if anticoagulation contraindicated." },
            ].map((item) => (
              <div key={item.phase} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{item.phase}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>

          {/* Spinal shock */}
          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Spinal Shock vs Neurogenic Shock</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Feature</th>
                  <th className="text-left py-2 text-foreground font-semibold">Spinal Shock</th>
                  <th className="text-left py-2 text-foreground font-semibold">Neurogenic Shock</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Definition</td><td>Temporary loss of all spinal cord function (motor, sensory, reflex) below injury level</td><td>Haemodynamic instability from loss of sympathetic tone</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Mechanism</td><td>Neurological — areflexia, flaccid paralysis</td><td>Cardiovascular — vasodilation, bradycardia</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Duration</td><td>Days to weeks (ends when bulbocavernosus reflex returns)</td><td>Hours to weeks</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Significance</td><td>Cannot assess final neurological deficit until resolved</td><td>Requires vasopressor support and monitoring</td></tr>
              </tbody>
            </table>
          </div>

          {/* Bowel, bladder, and other ICU care */}
          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Bowel & Bladder Care</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Neurogenic Bladder</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Acute (spinal shock):</strong> Areflexic/atonic bladder → urinary retention. Insert indwelling catheter. <br />
                <strong>After spinal shock resolves:</strong> Upper motor neurone (suprasacral) → spastic/reflex bladder (overactive detrusor, DSD). Lower motor neurone (conus/cauda equina) → flaccid/atonic bladder (overflow incontinence). <br />
                Transition to intermittent self-catheterisation (ISC) when stable — reduces UTI risk vs indwelling catheter.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Neurogenic Bowel</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Upper motor neurone (above conus):</strong> Spastic bowel — intact reflex arc. Manage with timed digital rectal stimulation, suppositories (bisacodyl/glycerine), high-fibre diet, adequate hydration, stool softeners. Aim regular scheduled bowel programme every 1–2 days. <br />
                <strong>Lower motor neurone (conus/cauda):</strong> Flaccid bowel — no reflex. Requires manual evacuation, bulking agents, Valsalva/abdominal straining. <br />
                <strong>Key:</strong> Faecal impaction is the most common trigger for autonomic dysreflexia — prevention is critical.
              </p>
            </div>
          </div>

          {/* Other ICU considerations */}
          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Other ICU Considerations</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Temperature Regulation</p>
              <p className="text-sm text-muted-foreground mt-1">
                Loss of sympathetic thermoregulation below lesion → poikilothermia (body temperature follows environment). Active warming/cooling may be needed. Avoid hypothermia (worsens coagulopathy, arrhythmia risk). Do not mistake poikilothermia for sepsis.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Pressure Area Care & Nutrition</p>
              <p className="text-sm text-muted-foreground mt-1">
                Insensate skin below injury → pressure ulcers develop rapidly. 2-hourly turns (log-roll with spinal precautions), pressure-relieving mattress, skin inspection, nutritional optimisation (high protein, calories). Start enteral nutrition early. Monitor for ileus (common in acute SCI — may need prokinetics or parenteral nutrition).
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Suxamethonium Contraindication</p>
              <p className="text-sm text-muted-foreground mt-1">
                Suxamethonium is <strong>CONTRAINDICATED from 48 hours to ~6–12 months post-SCI</strong> due to upregulation of extrajunctional acetylcholine receptors → life-threatening hyperkalaemia on depolarisation. Safe in the first 24–48 hours. Use rocuronium for RSI after this window.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Psychological Support</p>
              <p className="text-sm text-muted-foreground mt-1">
                Acute SCI carries enormous psychological burden — grief, depression, PTSD. Early psychological and psychiatric input. Family involvement. Rehabilitation planning should begin in ICU. Multidisciplinary team: spinal surgeons, intensivists, physiotherapy, OT, psychology, social work.
              </p>
            </div>
          </div>

          {/* Steroids note */}
          <div className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/5">
            <p className="text-sm font-semibold text-amber-400 mb-1">⚠ Exam Alert — Methylprednisolone in SCI</p>
            <p className="text-sm text-muted-foreground">
              <strong>NASCIS II/III trials</strong> suggested benefit of high-dose methylprednisolone within 8 hours. However, these trials had significant methodological flaws. Current guidelines (NICE, AANS/CNS) <strong>do NOT recommend</strong> routine methylprednisolone for acute SCI due to lack of evidence for benefit and increased complications (infections, GI bleeding, hyperglycaemia). This is frequently examined.
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ICP Monitoring Devices</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            ICP monitoring is indicated in severe TBI (GCS ≤8 with abnormal CT), SAH with hydrocephalus, and other causes of raised ICP. The choice of device depends on clinical need (diagnostic vs therapeutic CSF drainage), accuracy requirements, and available expertise.
          </p>
          <ICPMonitoringDevicesDiagram />
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Autoimmune Encephalitis — ICU Management</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Autoimmune encephalitis (AIE) is an increasingly recognised cause of ICU admission with seizures, altered consciousness, and psychiatric features. Prompt recognition and immunotherapy are essential — outcomes are better with early treatment.
          </p>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Classification & Antibody Types</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              { type: "Anti-NMDAR", detail: "Commonest AIE. Young women > men. Associated with ovarian teratoma (50% in women). Psychiatric features → seizures → movement disorder → autonomic instability → reduced consciousness. Often requires ICU for prolonged period." },
              { type: "Anti-LGI1", detail: "Limbic encephalitis. Older males. Faciobrachial dystonic seizures (pathognomonic). Hyponatraemia common (SIADH). Less likely to need ICU than NMDAR." },
              { type: "Anti-CASPR2", detail: "Morvan syndrome: limbic encephalitis + peripheral nerve hyperexcitability (neuromyotonia). Autonomic dysfunction, insomnia. May coexist with thymoma." },
              { type: "Anti-GABA-B / AMPAR", detail: "Limbic encephalitis with prominent seizures. Often paraneoplastic (lung, breast). Poorer prognosis if underlying malignancy not treated." },
            ].map((a) => (
              <div key={a.type} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{a.type}</p>
                <p className="text-sm text-muted-foreground mt-1">{a.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Diagnosis</h3>
          <div className="space-y-2 mb-4">
            {[
              { test: "Antibodies", detail: "Send paired CSF + serum for neuronal surface antibody panel. CSF is more sensitive for anti-NMDAR. Serum may be falsely positive (low titre) for LGI1/CASPR2." },
              { test: "CSF", detail: "Often lymphocytic pleocytosis, elevated protein, normal glucose. Oligoclonal bands may be present. Can be normal early — does not exclude AIE." },
              { test: "MRI Brain", detail: "May show T2/FLAIR hyperintensity in medial temporal lobes (limbic encephalitis pattern). Often normal in anti-NMDAR encephalitis." },
              { test: "EEG", detail: "Diffuse slowing, epileptiform activity. Extreme delta brush pattern characteristic (but not pathognomonic) of anti-NMDAR encephalitis." },
              { test: "Tumour Screen", detail: "CT/MRI/USS pelvis (ovarian teratoma — NMDAR). CT chest/abdo (thymoma — CASPR2; lung/breast — GABA-B/AMPAR). Consider PET-CT if initial imaging negative." },
            ].map((t) => (
              <div key={t.test} className="flex gap-3 p-3 rounded border border-border">
                <span className="font-bold text-primary text-sm whitespace-nowrap min-w-[90px]">{t.test}</span>
                <span className="text-sm text-muted-foreground">{t.detail}</span>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">ICU Management</h3>
          <div className="space-y-2 mb-4">
            {[
              { system: "Seizures", management: "Often refractory. Standard AED escalation (levetiracetam, lacosamide, phenytoin). May require continuous infusions (midazolam/propofol). Immunotherapy is the definitive seizure treatment — AEDs alone are insufficient." },
              { system: "Airway", management: "Intubation frequently required: reduced consciousness (GCS), refractory status epilepticus, orofacial dyskinesias (NMDAR — cannot protect airway), autonomic instability. Tracheostomy often needed — prolonged course." },
              { system: "Autonomic", management: "Anti-NMDAR: marked autonomic instability — tachycardia/bradycardia, hyper/hypotension, hyperthermia, central hypoventilation. May require pacing for profound bradycardia. Avoid triggering cardiac arrest during procedures." },
              { system: "Movement Disorder", management: "Severe dyskinesias in anti-NMDAR. May cause rhabdomyolysis — monitor CK, aggressive hydration. Benzodiazepines, tetrabenazine may partially help. Physical restraint risks injury — padded environment." },
              { system: "Psychiatric", management: "Psychosis, agitation, catatonia common in anti-NMDAR. Avoid antipsychotics if possible (worsen dyskinesias, NMS risk). Low-dose benzodiazepines preferred for agitation. Dexmedetomidine useful in ICU." },
              { system: "Sodium", management: "Anti-LGI1: hyponatraemia (SIADH) — may be severe. Fluid restriction, consider tolvaptan cautiously. Monitor closely during immunotherapy as sodium may correct rapidly." },
            ].map((s) => (
              <div key={s.system} className="flex gap-3 p-3 rounded border border-border">
                <span className="font-bold text-primary text-sm whitespace-nowrap min-w-[110px]">{s.system}</span>
                <span className="text-sm text-muted-foreground">{s.management}</span>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Immunotherapy</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-4 rounded-lg border border-border" style={{ borderLeftWidth: 4, borderLeftColor: "#3b82f6" }}>
              <p className="font-bold text-foreground text-sm mb-1">First-line</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>IV methylprednisolone 1 g/day × 3–5 days</li>
                <li>IV immunoglobulin (IVIg) 0.4 g/kg/day × 5 days</li>
                <li>Plasma exchange (PLEX) — 5–7 sessions</li>
                <li>Often combine steroids + IVIg or steroids + PLEX</li>
                <li>Start empirically — do not wait for antibody results</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border" style={{ borderLeftWidth: 4, borderLeftColor: "#a855f7" }}>
              <p className="font-bold text-foreground text-sm mb-1">Second-line (if no response by 2–4 weeks)</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Rituximab 375 mg/m² weekly × 4 doses</li>
                <li>Cyclophosphamide 750 mg/m² monthly</li>
                <li>Second-line agents improve outcomes in anti-NMDAR if started early</li>
                <li>Tocilizumab and bortezomib used in refractory cases</li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-secondary/50 border border-primary/20 mb-3">
            <p className="text-sm font-semibold text-foreground mb-1">Tumour Removal</p>
            <p className="text-sm text-muted-foreground">
              If teratoma identified → surgical removal is therapeutic and should be performed as soon as safe. Patients often improve rapidly post-resection. Continue to screen periodically if initial imaging negative — tumours may be small or delayed in presentation.
            </p>
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Prognosis</h3>
          <div className="space-y-2">
            {[
              { ab: "Anti-NMDAR", prognosis: "~80% achieve good outcome (mRS 0–2) with immunotherapy ± tumour removal, but recovery is slow (months). ~12% relapse rate. ICU stay may be prolonged (weeks–months). First-line failure should prompt early second-line escalation." },
              { ab: "Anti-LGI1", prognosis: "Good response to immunotherapy. Seizures often refractory to AEDs but respond well to steroids/IVIg. Cognitive impairment may persist. Hyponatraemia resolves with treatment." },
              { ab: "Paraneoplastic (GABA-B/AMPAR)", prognosis: "Prognosis depends on underlying malignancy. Poorer if tumour not identified or not resectable. May respond partially to immunotherapy." },
            ].map((p) => (
              <div key={p.ab} className="flex gap-3 p-3 rounded border border-border">
                <span className="font-bold text-primary text-sm whitespace-nowrap min-w-[120px]">{p.ab}</span>
                <span className="text-sm text-muted-foreground">{p.prognosis}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-lg bg-secondary/50 border border-primary/20">
            <p className="text-sm font-semibold text-foreground mb-1">💡 Exam Tip</p>
            <p className="text-sm text-muted-foreground">
              Anti-NMDAR encephalitis is the most commonly examined AIE. Know the clinical progression (psychiatric → seizures → movement disorder → autonomic → coma), the association with ovarian teratoma, the principle of starting immunotherapy empirically before antibody results return, and the need for early second-line escalation if no response. Remember that antipsychotics should be avoided (NMS risk, worsened dyskinesias).
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Guillain-Barré Syndrome (GBS) — ICU Management</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            GBS is an acute immune-mediated polyradiculoneuropathy causing ascending flaccid paralysis. ~25% require ICU admission for respiratory failure or autonomic instability. Mortality ~5%, but significant long-term morbidity. Two-thirds have preceding infection (Campylobacter jejuni, CMV, EBV, Zika).
          </p>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Subtypes</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              { type: "AIDP", detail: "Acute inflammatory demyelinating polyradiculoneuropathy. Commonest form in Europe/US (~90%). Demyelination of motor and sensory nerves. Relatively good prognosis." },
              { type: "AMAN", detail: "Acute motor axonal neuropathy. More common in Asia, post-Campylobacter. Pure motor, axonal damage. Associated with anti-GM1/GD1a antibodies. Slower recovery if severe." },
              { type: "AMSAN", detail: "Acute motor and sensory axonal neuropathy. Severe axonal variant affecting both motor and sensory nerves. Poorer prognosis, prolonged recovery." },
              { type: "Miller Fisher", detail: "Triad: ophthalmoplegia, ataxia, areflexia. Anti-GQ1b antibodies (>90%). Rarely needs ICU. Can overlap with GBS (Fisher-GBS overlap)." },
            ].map((s) => (
              <div key={s.type} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{s.type}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Indications for ICU Admission</h3>
          <div className="space-y-2 mb-4">
            {[
              { indication: "Respiratory", detail: "FVC <20 mL/kg or falling rapidly (the '20/30/40 rule': FVC <20, MIP <−30 cmH₂O, MEP <40 cmH₂O → intubate). Single breath count <20. Bulbar weakness with aspiration risk." },
              { indication: "Autonomic", detail: "Labile BP (hyper/hypotension), tachycardia/bradycardia, arrhythmias, urinary retention, ileus. Autonomic dysfunction present in ~70% of ventilated patients." },
              { indication: "Rapid Progression", detail: "Inability to walk within 1 week of onset. Rapid deterioration of power — may need elective intubation before crisis." },
            ].map((i) => (
              <div key={i.indication} className="flex gap-3 p-3 rounded border border-border">
                <span className="font-bold text-primary text-sm whitespace-nowrap min-w-[100px]">{i.indication}</span>
                <span className="text-sm text-muted-foreground">{i.detail}</span>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">System-Based ICU Management</h3>
          <div className="space-y-2 mb-4">
            {[
              { system: "Respiratory", management: "Serial FVC (4–6 hourly) — do NOT rely on SpO₂ (desaturation is a late sign). Intubate electively if FVC declining rapidly, bulbar dysfunction, or fatigue. Suxamethonium is SAFE in GBS (unlike MND/denervation — no upregulation of AChR). Tracheostomy if ventilation expected >2 weeks (common). SIMV/PS weaning." },
              { system: "Autonomic", management: "Continuous ECG monitoring — risk of asystole, VT. Short-acting agents for BP control (esmolol, GTN). Avoid long-acting antihypertensives (rapid swings). Atropine at bedside for bradycardia. Temporary pacing rarely needed. Constipation/ileus — prokinetics, avoid opioids." },
              { system: "Pain", management: "Neuropathic pain is very common (~65%) and often severe. Gabapentin or pregabalin first-line. Carbamazepine, amitriptyline. Opioids may be needed acutely but worsen ileus and mask respiratory decline." },
              { system: "VTE", management: "High risk (immobility + inflammation). LMWH prophylaxis unless contraindicated. Mechanical prophylaxis (IPC). Significant cause of mortality in GBS." },
              { system: "Nutrition", management: "Early enteral nutrition. NG/NJ tube if bulbar dysfunction. Assess swallowing formally before oral intake. Caloric needs may be lower (reduced muscle activity) but catabolism is high." },
              { system: "Rehabilitation", management: "Early physiotherapy — passive movements to prevent contractures. Psychological support — patients often fully aware while paralysed (locked-in-like experience). Fatigue is a major long-term issue even after recovery." },
            ].map((s) => (
              <div key={s.system} className="flex gap-3 p-3 rounded border border-border">
                <span className="font-bold text-primary text-sm whitespace-nowrap min-w-[100px]">{s.system}</span>
                <span className="text-sm text-muted-foreground">{s.management}</span>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Immunotherapy</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-4 rounded-lg border border-border" style={{ borderLeftWidth: 4, borderLeftColor: "#3b82f6" }}>
              <p className="font-bold text-foreground text-sm mb-1">IVIg (first-line in most centres)</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>0.4 g/kg/day × 5 days (total 2 g/kg)</li>
                <li>Start within 2 weeks of symptom onset</li>
                <li>Equal efficacy to PLEX</li>
                <li>Easier to administer, fewer haemodynamic effects</li>
                <li>Monitor for renal impairment, thrombosis, aseptic meningitis</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border" style={{ borderLeftWidth: 4, borderLeftColor: "#a855f7" }}>
              <p className="font-bold text-foreground text-sm mb-1">Plasma Exchange (PLEX)</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>5 exchanges over 1–2 weeks</li>
                <li>Effective if started within 4 weeks</li>
                <li>Requires large-bore vascular access</li>
                <li>Haemodynamic instability may limit use in autonomic GBS</li>
                <li>Do NOT combine IVIg + PLEX (PLEX removes IVIg)</li>
              </ul>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-secondary/50 border border-destructive/30 mb-4">
            <p className="text-sm font-semibold text-foreground mb-1">⚠️ Corticosteroids Are NOT Effective in GBS</p>
            <p className="text-sm text-muted-foreground">
              Unlike CIDP and autoimmune encephalitis, corticosteroids do not improve outcomes in GBS and may worsen them. This is a commonly examined point. IV methylprednisolone alone or combined with IVIg shows no benefit (Cochrane review).
            </p>
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Prognostic Factors</h3>
          <div className="space-y-2">
            {[
              { factor: "Erasmus GBS Outcome Score (EGOS)", detail: "Predicts ability to walk at 6 months. Uses age, preceding diarrhoea (worse — suggests axonal/Campylobacter), and GBS disability score at 2 weeks. Higher score = poorer prognosis." },
              { factor: "Poor Prognostic Features", detail: "Age >60, rapid onset (<7 days to ventilation), preceding Campylobacter, axonal subtype (AMAN/AMSAN), need for ventilation, absent CMAPs on NCS." },
              { factor: "Recovery", detail: "~80% walk independently at 6 months. ~20% have significant residual disability. Mortality ~5% (usually autonomic, PE, nosocomial infection). Fatigue persists in >60% at 1 year." },
            ].map((f) => (
              <div key={f.factor} className="flex gap-3 p-3 rounded border border-border">
                <span className="font-bold text-primary text-sm whitespace-nowrap min-w-[100px]">{f.factor}</span>
                <span className="text-sm text-muted-foreground">{f.detail}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-lg bg-secondary/50 border border-primary/20">
            <p className="text-sm font-semibold text-foreground mb-1">💡 Exam Tip</p>
            <p className="text-sm text-muted-foreground">
              GBS is a favourite FFICM/FRCA exam topic. Key points: the 20/30/40 rule for intubation (FVC/MIP/MEP), suxamethonium is SAFE (contrast with MND/burns/denervation), steroids do NOT work (unlike CIDP), IVIg and PLEX are equivalent but should NOT be combined, and autonomic instability can cause sudden cardiac death — continuous monitoring essential.
            </p>
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "TBI: prevent secondary injury — maintain CPP 60-70, ICP <22, normocapnia, normothermia, normoglycaemia",
        "Eurotherm trial: therapeutic hypothermia is harmful in TBI — do not use",
        "SAH vasospasm peaks day 7 — nimodipine is the only proven pharmacological intervention",
        "Status epilepticus: benzodiazepine → levetiracetam/phenytoin/valproate → RSI + thiopentone/propofol",
        "Brainstem death: 2 sets of tests, 2 senior doctors, exclude confounders, apnoea test PaCO₂ >6.65 kPa",
        "SCI: MAP ≥85 mmHg for 5–7 days; suxamethonium contraindicated 48h–12m post-injury (hyperkalaemia)",
        "EVD is gold standard for ICP monitoring — only device that can drain CSF therapeutically",
        "Anti-NMDAR encephalitis: start immunotherapy empirically — do not wait for antibody results",
        "GBS: 20/30/40 rule for intubation — FVC <20, MIP <−30, MEP <40",
        "GBS: suxamethonium is SAFE; steroids do NOT work; IVIg and PLEX are equivalent but do not combine",
        "GBS autonomic instability can cause sudden cardiac death — continuous ECG monitoring essential",
      ]} />

      <QuizSection questions={neurointensiveCareQuestions} />
      <ReferencesList topicId="neurointensive-care" />

      <SeeAlso topicId="neurointensive-care" />
        <TopicCompletionToggle topicId="neurointensive-care" topicTitle="Neurointensive Care" />
    </SectionLayout>
  );
};

export default NeurointensiveCareTopic;
