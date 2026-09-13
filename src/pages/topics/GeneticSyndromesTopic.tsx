import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { ExamSection } from "@/components/exam/ExamSection";
import { geneticSyndromesQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { InlineRef } from "@/components/references/InlineRef";
const tocItems = [
  { id: "section-framework", label: "Why Genetics Matter", group: "Framework" },
  { id: "section-malignant-hyperthermia", label: "Malignant Hyperthermia", group: "Core" },
  { id: "section-muscular-dystrophies", label: "Muscular Dystrophies", group: "Core" },
  { id: "section-myotonic-dystrophy", label: "Myotonic Dystrophy", group: "Core" },
  { id: "section-pseudocholinesterase-deficiency", label: "Pseudocholinesterase Deficiency", group: "Core" },
  { id: "section-down-syndrome", label: "Down Syndrome", group: "Syndromic" },
  { id: "section-marfan-syndrome", label: "Marfan Syndrome", group: "Syndromic" },
  { id: "section-loeys-dietz-syndrome", label: "Loeys-Dietz Syndrome", group: "Syndromic" },
  { id: "section-ehlers-danlos-syndromes", label: "Ehlers-Danlos Syndromes", group: "Syndromic" },
  { id: "section-connective-tissue-disorders", label: "Other Connective Tissue Disorders", group: "Syndromic" },
  { id: "section-achondroplasia", label: "Achondroplasia", group: "Syndromic" },
  { id: "section-haemoglobinopathies", label: "Haemoglobinopathies", group: "Metabolic" },
  { id: "section-acute-intermittent-porphyria", label: "Acute Intermittent Porphyria", group: "Metabolic" },
  { id: "section-syndrome-quick-reference", label: "Quick-Reference Grid", group: "Reference" },
  { id: "section-other-syndromes", label: "Other Syndromes", group: "Reference" },
];

const geneticSyndromesFaqs: Array<[string, string]> = [
  ["How is malignant hyperthermia treated?", "Stop all volatile agents and suxamethonium, switch to TIVA, hyperventilate with 100% oxygen via a clean circuit, give IV dantrolene 2.5 mg/kg repeated up to 10 mg/kg (more if required), cool actively, and treat hyperkalaemia, acidosis and arrhythmias (AAGBI 2020)."],
  ["Why is suxamethonium contraindicated in Duchenne and Becker muscular dystrophy?", "Even sub-clinical dystrophinopathy can precipitate rhabdomyolysis and hyperkalaemic cardiac arrest after suxamethonium or prolonged volatile exposure — TIVA with non-depolarising NMBs is mandatory."],
  ["What are the airway considerations in Down syndrome?", "Macroglossia, narrow nasopharynx, subglottic stenosis (use a smaller ETT than predicted) and atlanto-axial instability (careful neck positioning, neutral head) — plus a high prevalence of congenital cardiac disease and obstructive sleep apnoea."],
];

const GeneticSyndromesTopic = () => {
  return (
    <TopicTemplate
      title="Genetic Syndromes & Anaesthesia"
      subtitle="FRCA Final / FFICM — Perioperative Medicine"
      backPath="/perioperative"
      backLabel="Perioperative Medicine"
      accentColor="text-perioperative"
      topicId="genetic-syndromes"
      quizQuestions={geneticSyndromesQuestions}
      objectives={[
        "Recognise inherited disorders that alter anaesthetic drug responses (MH, BChE deficiency, porphyria).",
        "Plan safe anaesthesia for muscular dystrophies and myotonic syndromes, avoiding triggering agents.",
        "Identify airway, cervical-spine and cardiac risks in syndromes such as Down, Marfan and connective-tissue disorders.",
        "Manage haemoglobinopathies (sickle cell, thalassaemia) perioperatively, including transfusion thresholds.",
        "Apply a structured framework for the unfamiliar syndromic patient: airway, cardiorespiratory, neuromuscular, drug pharmacology, regional considerations.",
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["BJA Educ MH 2011", "BJA Educ MuscularDystrophy 2017", "AAGBI Sickle 2020"],
        workedExamples: ["EMHG 2020 Guidelines", "TAPS 2013", "BJA Educ DMD 2017", "AAGBI MH 2020"],
        keyPoints: ["BJA Educ MH 2011", "BJA Educ MuscularDystrophy 2017", "AAGBI Sickle 2020", "British Porphyria Association Drug Database", "AAGBI MH 2020", "BJA Educ DMD 2017", "BJA Educ Myotonic 2017", "BJA Educ BChE 2014", "BJA Educ Down 2016", "BJA Educ Marfan 2016", "GeneReviews Loeys-Dietz", "Malfait EDS 2017", "TAPS 2013", "BJA Educ Porphyria 2017", "Drug Database Porphyria", "BJA Educ Achondroplasia 2018", "Berkowitz Achondroplasia 1990"],
      }}
      coreConcepts={
        <>
          <ExamSection exams={[Exam.FINAL, Exam.FFICM]} id="section-framework" className="scroll-mt-24">
            <CollapsibleSubsection title="Why genetics matter to the anaesthetist" defaultOpen>
            <p className="text-muted-foreground leading-relaxed">
              A handful of inherited disorders are over-represented in critical incidents because they alter the response to commonly used drugs (suxamethonium, volatiles, NMBAs, barbiturates) or because they affect the airway, the cervical spine, the heart or the lungs in ways that surprise the unprepared anaesthetist. A structured framework — <strong>airway, cardiorespiratory, neuromuscular, pharmacology, regional, transfusion</strong> — lets you assess any unfamiliar syndromic patient.<InlineRef topicId="genetic-syndromes" refLabel="BJA Educ MH 2011" />
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <TopicTableOfContents items={tocItems} />

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]} id="section-malignant-hyperthermia" className="scroll-mt-24">
            <CollapsibleSubsection title="Malignant Hyperthermia (RYR1 / CACNA1S)">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Autosomal dominant; uncontrolled SR Ca²⁺ release on exposure to volatiles or suxamethonium → hypermetabolism, masseter spasm, ↑EtCO₂, hyperthermia, rhabdomyolysis, hyperkalaemia, DIC.<InlineRef topicId="genetic-syndromes" refLabel="AAGBI MH 2020" /><InlineRef topicId="genetic-syndromes" refLabel="EMHG 2020 Guidelines" />
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Genetics", value: "RYR1 (~70%), CACNA1S; autosomal dominant. Penetrance variable." },
                { label: "Triggers", value: "All volatiles (sevo, iso, des), suxamethonium. NOT N₂O, propofol, opioids, NMBAs (non-dep), regional." },
                { label: "First sign", value: "Unexplained ↑EtCO₂ despite ↑MV; masseter spasm after sux; tachycardia; mixed acidosis." },
                { label: "Dantrolene", value: "2.5 mg/kg IV bolus, repeated every 5–10 min until control; >10 mg/kg may be required, so stock at least 36 vials. Each vial = 20 mg + 60 mL water; Ryanodex 250 mg / 5 mL." },
                { label: "Adjuncts", value: "Stop trigger, 100% O₂ high-flow, charcoal filters, active cooling, treat hyperK⁺ and acidosis, forced diuresis to urine output >1 mL/kg/h." },
                { label: "Confirmation", value: "EMHG IVCT (caffeine-halothane contracture test) on muscle biopsy = gold standard. Genetic testing complementary." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 rounded-lg border border-border space-y-2 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">Continuing management after the acute crisis (AAGBI 2020)</p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Coagulopathy</strong>: DIC is common with severe rhabdomyolysis — send repeated clotting screens and fibrinogen, and treat with FFP, cryoprecipitate (or fibrinogen concentrate) and platelets guided by results and bleeding.</li>
                <li><strong>Renal protection</strong>: aggressive IV fluid resuscitation with forced diuresis to a urine output &gt;1 mL/kg/h; monitor CK, potassium, myoglobinuria and acid-base status, and involve critical care early for renal replacement therapy if required.</li>
                <li><strong>Recrudescence</strong>: occurs in up to 25% of patients, typically within the first 24–36 h. Continue dantrolene 1 mg/kg IV every 4–6 h (or by infusion) for 24–36 h after control, guided by EtCO₂, temperature, CK and acidosis.</li>
                <li><strong>Post-acute care</strong>: admit to critical care for a minimum of 24 h for monitoring of temperature, EtCO₂, potassium, CK, urine output and coagulation.</li>
                <li><strong>Reporting and follow-up</strong>: report every episode to the UK Malignant Hyperthermia Registry (Leeds) and refer the patient and first-degree relatives for family screening and IVCT; document the reaction clearly and issue written information and a warning card.<InlineRef topicId="genetic-syndromes" refLabel="AAGBI MH 2020" /></li>
              </ul>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]} id="section-muscular-dystrophies" className="scroll-mt-24">
            <CollapsibleSubsection title="Muscular dystrophies (DMD, BMD)">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Anaesthesia-induced rhabdomyolysis (AIR)</strong>: hyperkalaemic cardiac arrest with sux ± volatiles — clinically resembles MH but is a different mechanism (membrane fragility, not RYR1).</li>
              <li><strong>Avoid</strong>: suxamethonium absolutely; volatiles relatively (use TIVA).<InlineRef topicId="genetic-syndromes" refLabel="BJA Educ DMD 2017" /></li>
              <li><strong>Cardiomyopathy</strong>: dilated cardiomyopathy in &gt;90% of DMD by late teens; preop echo + ECG.</li>
              <li><strong>Respiratory</strong>: restrictive lung disease, weak cough, OSA — preop FVC, consider postop NIV.</li>
              <li><strong>Sensitivity</strong>: exaggerated response to non-depolarising NMBAs; titrate carefully with TOF; sugammadex preferred for reversal of rocuronium.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]} id="section-myotonic-dystrophy" className="scroll-mt-24">
            <CollapsibleSubsection title="Myotonic dystrophy (DM1, DMPK CTG repeat)">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Myotonia not relieved by NMBAs, regional anaesthesia, or deep volatile — it is a sarcolemmal channelopathy. Triggers: cold, shivering, sux, neostigmine, surgical/electrical stimulation.</li>
              <li>Treatment of intra-op contracture: local infiltration of LA into the muscle ± systemic procainamide/phenytoin/quinine.</li>
              <li>Cardiac conduction disease (AV block) — preop ECG ± Holter; pacemaker if symptomatic. Risk of sudden death.</li>
              <li>Bulbar weakness → aspiration risk; slow gastric emptying.</li>
              <li>Exquisite sensitivity to opioids, benzodiazepines and propofol — use minimal doses with monitoring.</li>
              <li>Avoid sux and neostigmine; use sugammadex.<InlineRef topicId="genetic-syndromes" refLabel="BJA Educ Myotonic 2017" /></li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3 mb-2 text-sm font-semibold">Managing an intra-operative myotonic crisis/contracture</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Myotonia is a <strong>sarcolemmal membrane phenomenon</strong>, not a problem at the neuromuscular junction or in central control of tone — it is therefore <strong>NOT abolished</strong> by non-depolarising neuromuscular blockade, by spinal or epidural anaesthesia, or by deepening volatile anaesthesia. This distinguishes it clearly from malignant hyperthermia (which responds to dantrolene and removal of the trigger) and from ordinary post-operative shivering (which usually responds to warming and opioids).<InlineRef topicId="genetic-syndromes" refLabel="BJA Educ Myotonic 2017" /></li>
              <li>Masseter or generalised muscle contracture can make bag-mask ventilation, laryngoscopy and surgical access impossible, even though the block appears otherwise adequate.</li>
              <li><strong>Direct infiltration</strong> of the affected muscle with local anaesthetic (e.g. lidocaine) can relax a focal contracture rapidly and is often the first practical step.</li>
              <li><strong>Systemic membrane-stabilising drugs</strong>: IV procainamide (where available), IV phenytoin, or quinine (historic, rarely used now) may be given for more generalised contracture. Both procainamide and phenytoin are negative inotropes and pro-arrhythmic, which is particularly hazardous in a patient who may already have underlying cardiac conduction disease.</li>
              <li>Supportive measures: active warming and avoidance of shivering and hypothermia, minimising mechanical or electrical stimulation of muscle, and avoiding the recognised triggers — suxamethonium, neostigmine and hyperkalaemia.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]} id="section-pseudocholinesterase-deficiency" className="scroll-mt-24">
            <CollapsibleSubsection title="Pseudocholinesterase deficiency">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Reduced or absent butyrylcholinesterase (BChE) → prolonged sux block (2–8 h with homozygous atypical genotype). TOF shows phase II block (fade, post-tetanic facilitation).<InlineRef topicId="genetic-syndromes" refLabel="BJA Educ BChE 2014" />
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Management: keep sedated and ventilated until block resolves; do NOT give neostigmine early (prolongs block); sugammadex does NOT reverse sux.</li>
              <li>Send dibucaine number to confirm; family screening — autosomal recessive.</li>
              <li>Acquired BChE reduction: pregnancy, liver failure, plasmapheresis, ecothiopate eye drops.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3 mb-2 text-sm font-semibold">Intraoperative and follow-up management</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Keep the patient sedated, mechanically ventilated and normothermic until neuromuscular function recovers — hypothermia and acidosis further prolong block.</li>
              <li>Use quantitative (objective) neuromuscular monitoring with a peripheral nerve stimulator; do not attempt extubation until the train-of-four ratio recovers to &gt;0.9.</li>
              <li>Neostigmine is contraindicated in the early phase — it inhibits residual plasma cholinesterase activity and paradoxically prolongs the block; sugammadex has no affinity for suxamethonium (a depolarising, non-steroidal agent) and is ineffective.</li>
              <li>Fresh frozen plasma or purified/recombinant BChE has been used to supply active enzyme, but its role is limited and controversial given the risks of transfusion (TRALI, infection) versus simply ventilating until natural recovery.</li>
              <li>After recovery: explain the event fully to the patient and family, document clearly in the anaesthetic record and a letter to the GP, arrange an alert bracelet/card, and refer for dibucaine number/fluoride number testing and genotyping to confirm the atypical variant.</li>
              <li>Offer screening to first-degree relatives — autosomal recessive inheritance means homozygous atypical individuals may show block lasting 2–8 hours, while heterozygotes typically show only mild prolongation of minutes.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]} id="section-down-syndrome" className="scroll-mt-24">
            <CollapsibleSubsection title="Down syndrome (trisomy 21)">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Airway</strong>: macroglossia, midface hypoplasia, narrow nasopharynx, subglottic stenosis (use ETT 0.5–1 size smaller).</li>
              <li><strong>C-spine</strong>: atlanto-axial instability in 10–20% (symptomatic 1–2%). Routine X-rays not recommended; focused neuro exam — image only if symptomatic or before high-risk procedure.</li>
              <li><strong>Cardiac</strong>: congenital heart disease affects 40–50% of individuals with Down syndrome.<InlineRef topicId="genetic-syndromes" refLabel="BJA Educ Down 2016" /> Among those with CHD, the relative frequencies are approximately: atrioventricular septal defect (AVSD) ~45%, ventricular septal defect (VSD) ~35%, secundum atrial septal defect ~8%, patent ductus arteriosus (PDA) ~7%, and tetralogy of Fallot (ToF) ~4%. Unrepaired AVSD progresses early to pulmonary hypertension and Eisenmenger physiology because of the combination of a large shunt, upper-airway obstruction and relative pulmonary hypoplasia — an up-to-date echocardiogram is needed and residual lesions/pulmonary artery pressure must be documented before non-cardiac surgery.</li>
              <li><strong>Other</strong>: OSA, hypothyroidism, leukaemia risk, recurrent chest infections, behavioural issues — premedication and parental presence often valuable.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]} id="section-marfan-syndrome" className="scroll-mt-24">
            <CollapsibleSubsection title="Marfan syndrome (FBN1)">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Autosomal dominant disorder of fibrillin-1 (FBN1) causing abnormal elastic tissue. Cardinal features are aortic root dilatation, arachnodactyly, lens dislocation, and tall stature with arm span exceeding height. Anaesthetic risk is dominated by the aorta — progressive root dilatation and dissection — but the lungs, eyes, spine and joints all matter.<InlineRef topicId="genetic-syndromes" refLabel="BJA Educ Marfan 2016" />
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Aorta / cardiovascular", value: "Progressive aortic root dilatation and type-A dissection are the leading causes of death. Continue β-blockers (reduce dP/dt); target systolic BP <120 mmHg and gentle heart rate. Pre-op CT/MRI aorta if not recent. Mitral valve prolapse and regurgitation common. Place defibrillation pads if root >45 mm." },
                { label: "Respiratory", value: "Pectus excavatum, kyphoscoliosis and apical bullae increase pneumothorax risk — especially with positive pressure ventilation. Use lowest airway pressures possible; high index of suspicion for spontaneous pneumothorax if desaturation or ↑airway pressures." },
                { label: "Ophthalmology", value: "Lens dislocation (ectopia lentis) — upward/subluxation is characteristic. Protect eyes during positioning; avoid pressure on globes. Consider avoiding anticholinergics (less relevant in modern practice)." },
                { label: "Neuraxial", value: "Dural ectasia (widening of the spinal canal) makes spinal block unpredictable and increases risk of post-dural-puncture headache. Dural ectasia also enlarges the dural sac itself, so if a dural puncture headache occurs and an epidural blood patch is required, a larger volume of autologous blood may be needed for it to be effective, the patch is technically more difficult to perform, and repeat patching is more often required. Epidural is preferred over subarachnoid block if neuraxial technique is chosen; expect patchy spread and higher volumes needed." },
                { label: "Musculoskeletal", value: "Joint laxity, scoliosis, pectus deformity and long limbs can make positioning difficult. Hyperextensible joints risk nerve stretch — pad well, avoid extreme positions. Cervical spine instability is uncommon but reported." },
                { label: "Practical", value: "Continue β-blockers on day of surgery; use arterial line for beat-to-beat BP monitoring. Treat intubation response (laryngoscopy → hypertension) with opioid ± esmolol/labetalol. Avoid Valsalva, straining and hypertensive surges perioperatively." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              No association with MH. Suxamethonium and volatile agents are safe from an MH perspective, but avoid hypertensive responses to laryngoscopy and intubation.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]} id="section-loeys-dietz-syndrome" className="scroll-mt-24">
            <CollapsibleSubsection title="Loeys-Dietz syndrome (LDS)">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Autosomal dominant disorder of TGF-β signalling caused by mutations in <em>TGFBR1</em> or <em>TGFBR2</em> (and less commonly <em>SMAD3</em>, <em>TGFB2</em>). It produces a more aggressive aortopathy than Marfan syndrome — dissection can occur at aortic root diameters &lt;4.5 cm, so surgical thresholds are lower and follow-up imaging more frequent. Unlike Marfan, tortuosity and aneurysm formation are widespread throughout the arterial tree (not confined to the root), and craniofacial features — bifid or broad uvula, cleft palate, hypertelorism and craniosynostosis — help distinguish LDS clinically.<InlineRef topicId="genetic-syndromes" refLabel="GeneReviews Loeys-Dietz" />
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Strict blood pressure control is paramount: continue β-blockade/ARB (losartan), and blunt hypertensive surges at laryngoscopy, intubation and emergence with opioid ± esmolol/labetalol.</li>
              <li>Lower the threshold for aortic imaging and surgical referral compared with Marfan given the propensity for dissection at smaller calibre vessels.</li>
              <li>Generalised vascular and soft-tissue fragility affects arterial and central line placement — use ultrasound guidance and gentle technique; consider avoiding arterial cannulation unless essential.</li>
              <li>Cervical spine instability has been described — take care with positioning and neck extension during airway management.</li>
              <li>Caution with regional/neuraxial techniques given tissue fragility and the theoretical risk of vascular injury; dural ectasia may also occur as in Marfan.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]} id="section-ehlers-danlos-syndromes" className="scroll-mt-24">
            <CollapsibleSubsection title="Ehlers-Danlos syndromes (2017 international classification)">
            <p className="text-muted-foreground leading-relaxed mb-3">
              The EDS family comprises 13 subtypes of collagen/connective-tissue disorder. Two ends of the spectrum dominate exam practice: the common <strong>hypermobile type (hEDS)</strong>, and the rare but life-threatening <strong>vascular type (vEDS, COL3A1)</strong>.<InlineRef topicId="genetic-syndromes" refLabel="Malfait EDS 2017" />
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              {[
                { label: "Hypermobile EDS (hEDS)", value: "Generalised joint hypermobility, chronic widespread pain, easy bruising and skin laxity. Associated with postural orthostatic tachycardia syndrome (POTS) — expect exaggerated haemodynamic swings with position change and induction. Chronic pain and long-term opioid use commonly produce opioid tolerance and hyperalgesia — anticipate higher perioperative analgesic requirements and use multimodal/regional strategies. Joint laxity demands careful positioning and padding; dislocation risk during airway manoeuvres and limb positioning." },
                { label: "Vascular EDS (vEDS, COL3A1)", value: "Defective type III collagen causes fragile arteries, bowel and uterus. Spontaneous arterial dissection or rupture (including of major vessels), spontaneous rupture of hollow organs (classically the sigmoid colon, or the gravid uterus in pregnancy) and spontaneous pneumothorax are recognised catastrophic presentations. Diagnosis is often only made after a sentinel vascular or bowel event." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed mb-2 text-sm font-semibold">Anaesthetic implications of vEDS</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Meticulous blood pressure control — avoid both hypertension (risk of dissection/rupture) and hypotension (risk of malperfusion in already fragile vasculature); smooth induction and emergence, blunt the pressor response to laryngoscopy.</li>
              <li>Gentle tissue and airway handling throughout: careful, minimal-force laryngoscopy; avoid nasal intubation and nasogastric tubes (mucosal/vascular fragility and epistaxis risk).</li>
              <li>Avoid intramuscular injections — risk of haematoma; ultrasound-guided venous access to minimise vessel trauma from blind puncture.</li>
              <li>Avoid arterial line placement unless essential given the risk of arterial injury/pseudoaneurysm; if unavoidable, use ultrasound guidance and the smallest gauge feasible.</li>
              <li>Have cross-matched blood available and maintain a high index of suspicion for catastrophic, occult haemorrhage (retroperitoneal, intra-abdominal) — unexplained hypotension or abdominal pain should prompt urgent imaging.</li>
              <li>Obstetric risk is markedly elevated: uterine and vascular rupture, especially peripartum — vEDS pregnancies should be managed in a tertiary unit with vascular surgery/interventional radiology on standby.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL]} id="section-connective-tissue-disorders" className="scroll-mt-24">
            <CollapsibleSubsection title="Other connective tissue disorders">
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Ehlers-Danlos (vascular type, COL3A1)", value: "Tissue fragility, vessel rupture, easy bruising, poor wound healing. Caution with arterial lines/CVCs, gentle laryngoscopy, avoid IM injections." },
                { label: "Osteogenesis imperfecta", value: "Brittle bones — careful positioning, avoid BP cuff trauma, difficult intubation (cervical fragility, dentinogenesis imperfecta), risk of MH (low-grade association)." },
                { label: "Loeys-Dietz", value: "Aggressive arterial dissection at smaller diameters than Marfan — strict BP control essential." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]} id="section-achondroplasia" className="scroll-mt-24">
            <CollapsibleSubsection title="Achondroplasia (FGFR3)">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Autosomal dominant gain-of-function mutation of fibroblast growth factor receptor 3 (FGFR3) causing the commonest non-lethal skeletal dysplasia: rhizomelic short stature, macrocephaly with frontal bossing, midface hypoplasia and a characteristically small foramen magnum. Anaesthetic risk clusters around the airway, the cervical and lumbar spine, and the lungs.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Airway", value: "Midface hypoplasia, large tongue, short neck, restricted mouth opening, choanal stenosis, tonsillar/adenoidal hypertrophy. Anticipate difficult mask seal and laryngoscopy; have videolaryngoscope, smaller ETT (size based on weight not age) and SAD backup. Avoid blind nasal intubation." },
                { label: "Cervical spine", value: "Small foramen magnum with cervicomedullary compression in up to a third of children; atlanto-axial instability uncommon but possible. Maintain neutral neck during induction and positioning; consider awake FOI in adults with myelopathic signs." },
                { label: "Respiratory", value: "Restrictive chest wall (short ribs, thoracolumbar kyphosis) → reduced FRC, faster desaturation. High prevalence of central and obstructive sleep apnoea (cervicomedullary compression + adenotonsillar hypertrophy); preop sleep history ± polysomnography, consider postop HDU/NIV." },
                { label: "Neuraxial", value: "Spinal stenosis, short pedicles, exaggerated lumbar lordosis and kyphoscoliosis make spinal/epidural technically difficult and unpredictable. Reduce LA dose (~50–75% of standard); use slow, titrated epidural with imaging guidance where feasible; CSE preferred over single-shot spinal in obstetrics." },
                { label: "Cardiovascular", value: "Generally structurally normal heart, but obstructive sleep apnoea and chronic hypoxaemia may produce pulmonary hypertension and right-heart strain — screen with echo if symptomatic." },
                { label: "Practical", value: "Dose drugs to lean body weight, not height-predicted weight. Paediatric-sized BP cuff, careful padding (short limbs), avoid extreme positioning. IV access often easy in childhood but tissue laxity in adults." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              No specific association with MH; suxamethonium and volatiles are not contraindicated. The dominant pitfalls are airway and neuraxial planning, not pharmacology.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]} id="section-haemoglobinopathies" className="scroll-mt-24">
            <CollapsibleSubsection title="Haemoglobinopathies">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Sickle cell (HbSS)</strong>: avoid the 5 H's — Hypoxia, Hypothermia, Hypotension/dehydration, Hypoperfusion (stasis), High acidity. Top-up to Hb ~100 g/L for medium-risk surgery (TAPS); exchange to HbS &lt;30% for high-risk (cardiac, neuro). Active warming, generous fluids, supplemental O₂, multimodal analgesia.</li>
              <li><strong>β-thalassaemia major</strong>: chronic transfusion → iron overload (cardiomyopathy, cirrhosis, endocrinopathies). Pre-op echo, ferritin, glucose. Consider chelation continuity.</li>
              <li><strong>G6PD deficiency</strong>: avoid oxidative stressors — sulphonamides, nitrofurantoin, methylene blue (also causes false low SpO₂), prilocaine in large doses, fava beans. Methaemoglobinaemia is treated with ascorbic acid in G6PD-deficient patients (NOT methylene blue).</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3 mb-2 text-sm font-semibold">β-thalassaemia major: perioperative transfusion</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>The minimum acceptable pre-operative haemoglobin is <strong>100 g/L</strong>, checked within 72 hours of surgery.<InlineRef topicId="genetic-syndromes" refLabel="AAGBI Haemoglobinopathy 2021" /><InlineRef topicId="genetic-syndromes" refLabel="TIF Thalassaemia Guidelines 2021" /></li>
              <li>If below this threshold, give a top-up transfusion before the procedure to bring the haemoglobin up to target.</li>
              <li>For major surgery, check haemoglobin daily and maintain it above 100 g/L throughout the perioperative period.</li>
              <li>Use <strong>extended red cell phenotype-matched units</strong> given the repeated transfusion history and high risk of alloimmunisation, and involve the patient's haematology team in transfusion planning.</li>
              <li>Maintain awareness of the consequences of chronic transfusion and iron overload — cardiac siderosis and endocrinopathy — and of the potentially difficult airway from maxillofacial marrow expansion.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]} id="section-acute-intermittent-porphyria" className="scroll-mt-24">
            <CollapsibleSubsection title="Acute intermittent porphyria (HMBS)">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Autosomal dominant defect in haem synthesis. Attacks (abdominal pain, autonomic instability, neuropathy, psychiatric features, hyponatraemia from SIADH) are precipitated by enzyme inducers, fasting, dehydration, infection and stress.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5">
                <p className="text-xs text-destructive font-semibold mb-1">Avoid</p>
                <p className="text-xs text-muted-foreground">Barbiturates (thiopentone), etomidate, ketamine (debated), diclofenac, phenytoin, sulphonamides, oestrogens, ergometrine, metoclopramide.</p>
              </div>
              <div className="p-3 rounded-lg border border-clinical/30 bg-clinical/5">
                <p className="text-xs text-clinical font-semibold mb-1">Generally safe</p>
                <p className="text-xs text-muted-foreground">Propofol, sevoflurane, isoflurane, opioids (morphine, fentanyl, alfentanil, remifentanil), sux, rocuronium, atracurium, neostigmine, paracetamol, bupivacaine, lidocaine.</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              <strong>Acute attack</strong>: stop trigger, IV haem arginate 3 mg/kg/day for 4 days, high-carbohydrate IV (10% glucose), analgesia, monitor sodium and respiratory function. Always cross-check drugs against an up-to-date porphyria database before prescribing.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3 mb-2 text-sm font-semibold">Detailed management of an acute attack</p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Haem arginate</strong> 3 mg/kg/day (max ~250 mg/day) for 4 days via a large-bore central vein or a large peripheral vein — it is highly irritant and causes thrombophlebitis in small/peripheral veins. It provides negative feedback that downregulates hepatic ALA synthase, switching off overproduction of the neurotoxic precursors ALA and PBG.</li>
              <li><strong>High-carbohydrate load</strong> (10% glucose, aiming ≥300 g/day, e.g. via a central line if peripheral tolerance is limited) also suppresses ALA synthase, but large volumes of dextrose risk dilutional hyponatraemia — monitor sodium closely and balance against SIADH-driven hyponatraemia from the attack itself.</li>
              <li><strong>Analgesia</strong>: opioids are safe and often required in large doses for severe visceral pain; avoid diclofenac and other NSAIDs, and cross-check any adjunct against a porphyria drug database before use.</li>
              <li><strong>Nausea and vomiting</strong>: ondansetron is regarded as safe; avoid metoclopramide (porphyrinogenic).</li>
              <li><strong>Seizures</strong>: levetiracetam or gabapentin are preferred anticonvulsants (avoid phenytoin, sodium valproate and barbiturates).</li>
              <li><strong>Monitoring</strong>: serial sodium (SIADH), assessment for evolving motor neuropathy (may progress to quadriparesis) and serial vital capacity/respiratory function — escalate early to critical care if bulbar or respiratory muscle weakness develops, as respiratory failure can progress rapidly.</li>
              <li>Involve the <strong>National Acute Porphyria Service (NAPS)</strong> early for expert advice on drug safety, diagnosis confirmation (urinary PBG/ALA) and ongoing management.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]} id="section-syndrome-quick-reference" className="scroll-mt-24">
            <CollapsibleSubsection title="Syndrome quick-reference grid">
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
              One-look matrix linking each condition to its dominant anaesthetic hazards and the agents/techniques generally regarded as safe. Use as a pre-list checklist — never as a substitute for a current porphyria/MH database lookup on the day.
            </p>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-secondary/40 text-foreground">
                  <tr>
                    <th className="text-left p-2 font-semibold w-[22%]">Syndrome / gene</th>
                    <th className="text-left p-2 font-semibold w-[20%]">System hit hardest</th>
                    <th className="text-left p-2 font-semibold w-[29%]">Key hazards</th>
                    <th className="text-left p-2 font-semibold w-[29%]">Safe / preferred options</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    {
                      syndrome: "Malignant hyperthermia (RYR1/CACNA1S)",
                      system: "Skeletal muscle / metabolic",
                      hazards: "All volatiles, suxamethonium → ↑EtCO₂, masseter spasm, hyperK⁺, rhabdo",
                      safe: "TIVA (propofol + remi), N₂O, NMBAs (non-dep), regional, dantrolene-ready",
                    },
                    {
                      syndrome: "Duchenne / Becker (DMD/BMD)",
                      system: "Muscle, cardiac, respiratory",
                      hazards: "Sux + volatile → AIR / hyperK⁺ arrest; dilated CM; restrictive lung disease",
                      safe: "TIVA, sugammadex for roc, regional where feasible, postop NIV",
                    },
                    {
                      syndrome: "Myotonic dystrophy (DMPK)",
                      system: "Muscle, conduction, bulbar",
                      hazards: "Sux, neostigmine, cold, shivering → myotonic contracture; AV block; opioid/propofol sensitivity",
                      safe: "TIVA at reduced dose, sugammadex, active warming, intra-muscle LA for contracture, pacing pads on",
                    },
                    {
                      syndrome: "Pseudocholinesterase deficiency (BCHE)",
                      system: "Drug metabolism",
                      hazards: "Prolonged sux/mivacurium block (up to 8 h)",
                      safe: "Avoid sux; ventilate until resolved; rocuronium + sugammadex; send dibucaine number",
                    },
                    {
                      syndrome: "Down syndrome (T21)",
                      system: "Airway, C-spine, cardiac",
                      hazards: "Subglottic stenosis, atlanto-axial instability, AVSD/VSD, OSA, pulmonary HTN",
                      safe: "ETT 0.5–1 size smaller, neutral neck, focused neuro exam, premed + parent presence",
                    },
                    {
                      syndrome: "Marfan (FBN1)",
                      system: "Aorta, lungs, dura, eyes, joints",
                      hazards: "Aortic root dilatation / dissection, MV prolapse, pneumothorax/bullae, dural ectasia, lens dislocation",
                      safe: "Continue β-blockers, strict BP/dP/dt control, art line, lowest airway pressures, epidural > spinal, protect eyes",
                    },
                    {
                      syndrome: "Loeys-Dietz (TGFBR)",
                      system: "Aorta, arteries",
                      hazards: "Aggressive arterial dissection at smaller diameters than Marfan; aneurysms throughout arterial tree",
                      safe: "Strict BP control, β-blockade, arterial monitoring, avoid hypertensive surges, imaging-guided vascular access",
                    },
                    {
                      syndrome: "Vascular Ehlers-Danlos (COL3A1)",
                      system: "Vessels, tissues",
                      hazards: "Vessel rupture, easy bruising, poor wound healing, pneumothorax",
                      safe: "Gentle laryngoscopy, US-guided lines, avoid IM/nasal, controlled BP, low airway pressures",
                    },
                    {
                      syndrome: "Osteogenesis imperfecta (COL1A1/2)",
                      system: "Bones, teeth, possible MH link",
                      hazards: "Fractures from positioning/BP cuff, dentinogenesis, kyphoscoliosis",
                      safe: "Padded positioning, manual BP / cycle infrequently, videolaryngoscopy, regional where possible",
                    },
                    {
                      syndrome: "Achondroplasia (FGFR3)",
                      system: "Airway, C-spine, spine, respiratory",
                      hazards: "Difficult airway (midface hypoplasia, large tongue), foramen magnum stenosis/cervicomedullary compression, OSA, restrictive chest, unpredictable neuraxial spread",
                      safe: "Videolaryngoscopy ± awake FOI, neutral neck, reduced neuraxial LA dose (50–75%), titrated epidural, dose to lean weight, postop NIV if OSA",
                    },
                    {
                      syndrome: "Sickle cell (HbSS)",
                      system: "RBC / microvasculature",
                      hazards: "5 H's: hypoxia, hypothermia, hypotension, hypoperfusion, acidosis → vaso-occlusion",
                      safe: "Active warming, generous fluids, supplemental O₂, top-up Hb ~100 g/L (TAPS), tourniquets cautious",
                    },
                    {
                      syndrome: "G6PD deficiency",
                      system: "Erythrocyte oxidative defence",
                      hazards: "Methylene blue, prilocaine (large), sulphonamides, nitrofurantoin → haemolysis / metHb",
                      safe: "Ascorbic acid for metHb, avoid prilocaine in EMLA-equivalent doses, screen ethnic groups",
                    },
                    {
                      syndrome: "Acute intermittent porphyria (HMBS)",
                      system: "Haem synthesis, autonomic, neuro",
                      hazards: "Barbiturates, etomidate, diclofenac, phenytoin, metoclopramide, ergometrine, fasting, stress",
                      safe: "Propofol, sevo/iso, opioids, sux, roc, atracurium, neostigmine, paracetamol, bupivacaine; haem arginate for attack",
                    },
                    {
                      syndrome: "Long QT (KCNQ1/KCNH2/SCN5A)",
                      system: "Cardiac repolarisation",
                      hazards: "Ondansetron, droperidol, methadone, high-dose sevo, hypoK⁺/Mg²⁺ → TdP",
                      safe: "Continue β-blocker, defib pads on, propofol TIVA, isoflurane, treat electrolytes, avoid sympathetic surges",
                    },
                    {
                      syndrome: "MPS (Hunter / Hurler)",
                      system: "Airway, cardiac valves, C-spine",
                      hazards: "Progressive difficult airway with age, AAI, restrictive lung disease, valve disease",
                      safe: "Awake FOI / videolaryngoscopy, ENT standby, supraglottic backup, neutral neck",
                    },
                    {
                      syndrome: "Neurofibromatosis 1 (NF1)",
                      system: "Vascular, airway, endocrine",
                      hazards: "Phaeochromocytoma, airway neurofibromas, scoliosis, vasculopathy",
                      safe: "Pre-op metanephrines if hypertensive, FOI ready, regional with imaging, careful BP control",
                    },
                  ].map((row) => (
                    <tr key={row.syndrome} className="hover:bg-secondary/20 align-top">
                      <td className="p-2 font-semibold text-foreground">{row.syndrome}</td>
                      <td className="p-2 text-muted-foreground">{row.system}</td>
                      <td className="p-2">
                        <span className="text-destructive">{row.hazards}</span>
                      </td>
                      <td className="p-2">
                        <span className="text-clinical">{row.safe}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap gap-3 mt-3 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><span className="inline-block h-2 w-2 rounded-full bg-destructive" /> Hazard / avoid</span>
              <span className="inline-flex items-center gap-1.5"><span className="inline-block h-2 w-2 rounded-full bg-clinical" /> Generally safe / preferred</span>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL]} id="section-other-syndromes" className="scroll-mt-24">
            <CollapsibleSubsection title="Other syndromes worth knowing">
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Pierre Robin / Treacher Collins", value: "Predicted difficult airway from birth — videolaryngoscope, FOI, supraglottic, paediatric DAS algorithm." },
                { label: "Klippel-Feil", value: "Fused cervical vertebrae, restricted neck movement; difficult laryngoscopy; consider awake FOI." },
                { label: "Mucopolysaccharidoses (Hunter, Hurler)", value: "GAG deposition → very difficult airway worsens with age, cardiac valve disease, restrictive lung disease, atlanto-axial instability." },
                { label: "Neurofibromatosis 1 (NF1)", value: "Phaeochromocytoma, airway neurofibromas, scoliosis, intracranial tumours; check BP and consider screening for catecholamine excess." },
                { label: "Cystic fibrosis (CFTR)", value: "Bronchiectasis, sputum, malnutrition, diabetes, liver disease — preop physio, antibiotics, postop NIV, regional where possible." },
                { label: "Long QT syndromes (KCNQ1, KCNH2, SCN5A)", value: "Avoid QT-prolonging drugs (ondansetron, droperidol, methadone, sevoflurane in high doses). Continue β-blockers, defib pads on, treat hypoK⁺/Mg²⁺." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>
        <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              'MH-susceptible: avoid all volatile agents and suxamethonium; use vapour-free machine (flush ≥20 min, remove vaporisers, fresh circuit); have dantrolene 2.5 mg/kg available.',
              'BChE (pseudocholinesterase) deficiency: prolonged suxamethonium/mivacurium paralysis — ventilate until TOF returns; send dibucaine number.',
              'Sickle cell disease: avoid hypoxia, acidosis, hypothermia, dehydration and tourniquets — maintain SpO₂ >95%, normothermia, good hydration.',
              'Porphyria (acute intermittent): avoid trigger drugs — thiopental, etomidate, diclofenac, erythromycin; propofol, sux, opioids, volatiles generally safe.',
              'Down syndrome: atlanto-axial instability (careful neck positioning), subglottic stenosis (use smaller ETT), congenital cardiac disease, OSA.',
              'Marfan: aortic root dilatation/dissection risk — strict BP control, avoid hypertensive responses to laryngoscopy; cervical spine and lens instability.',
            ]}
          />
          <TopicFaqs faqs={geneticSyndromesFaqs} />
        </>
      }
      workedExamples={[
        {
          title: "DMD teenager with hyperkalaemic arrest after induction",
          scenario: "A 15-year-old boy with Duchenne muscular dystrophy is induced with propofol, suxamethonium and sevoflurane for scoliosis surgery. After 5 minutes the ECG shows peaked T waves and broad QRS, then VF arrest. K⁺ is 7.8.",
          working: (
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Step-by-step reasoning</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Diagnose <strong>anaesthesia-induced rhabdomyolysis</strong> — hyperkalaemic arrest after sux + volatile in a dystrophinopathy. Not classical MH (no defective RYR1).</li>
                <li>Start <strong>ALS</strong> — high-quality CPR; defibrillate VF; expect prolonged resuscitation (rhabdo + hyperK⁺ may need &gt;30 min CPR).</li>
                <li>Treat hyperkalaemia: <strong>10 mL 10% calcium chloride IV</strong> (membrane stabilisation), insulin–dextrose, salbutamol nebs, NaHCO₃ if acidotic. Get an arterial line.</li>
                <li>Stop volatile, change circuit/soda lime, run TIVA on propofol if continuing the case (case is likely abandoned).</li>
                <li>Send urgent CK, myoglobin, urinary myoglobin; alkaline diuresis; consider early RRT if oliguric.</li>
                <li>Document, report to MHRA/MH registry, refer family for testing, arrange post-arrest care + counselling.</li>
              </ol>
              <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
                <p className="text-xs font-semibold text-destructive uppercase">Common traps</p>
                <ul className="list-disc list-inside text-foreground">
                  <li>Stopping CPR too early — hyperkalaemic arrest needs sustained efforts while K⁺ is shifted.</li>
                  <li>Using dantrolene as if MH — won't fix this; treat as hyperK⁺.</li>
                  <li>Not screening other male relatives for dystrophinopathy.</li>
                </ul>
              </div>
            </div>
          ),
          answer: "Stop trigger, ALS for hyperK⁺ arrest (Ca²⁺, insulin–dextrose, salbutamol, NaHCO₃), TIVA, alkaline diuresis, family screening.",
          cites: ["BJA Educ DMD 2017", "AAGBI MH 2020"],
        },
      ]}
      keyPoints={[
        { text: "MH (RYR1/CACNA1S): triggered by volatiles + sux. Treat with dantrolene 2.5–10 mg/kg, cooling, hyperK⁺ management.", cites: ["BJA Educ MH 2011", "AAGBI MH 2020"] },
        { text: "Dystrophinopathies (DMD/BMD): avoid sux absolutely, use TIVA — risk of anaesthesia-induced rhabdomyolysis.", cites: ["BJA Educ DMD 2017"] },
        { text: "Myotonic dystrophy: cardiac conduction disease, opioid sensitivity, myotonia not relieved by NMBAs.", cites: ["BJA Educ Myotonic 2017"] },
        { text: "BChE deficiency: prolonged sux block — ventilate until resolved; sugammadex does NOT reverse sux.", cites: ["BJA Educ BChE 2014"] },
        { text: "Down syndrome: focused C-spine neuro exam (not routine X-ray), small ETT, screen for CHD.", cites: ["BJA Educ Down 2016"] },
        { text: "Marfan (FBN1): aortic root dilatation and dissection risk dominate — continue β-blockers, control dP/dt, arterial line, avoid hypertensive responses to laryngoscopy. Pneumothorax risk, dural ectasia, lens dislocation.", cites: ["BJA Educ Marfan 2016"] },
        { text: "Loeys-Dietz: aggressive arterial dissection at smaller aortic diameters than Marfan — strictest BP control.", cites: ["BJA Educ Marfan 2016"] },
        { text: "Sickle cell: avoid the 5 H's; top-up Hb to ~100 g/L (TAPS) for medium-risk surgery.", cites: ["AAGBI Sickle 2020", "TAPS 2013"] },
        { text: "AIP: avoid barbiturates, etomidate, diclofenac, phenytoin; propofol/opioids/sevoflurane safe; cross-check every drug.", cites: ["BJA Educ Porphyria 2017", "Drug Database Porphyria"] },
        { text: "Achondroplasia (FGFR3): predict difficult airway, foramen magnum stenosis and OSA; keep neck neutral; reduce neuraxial LA dose to 50–75% and dose drugs to lean body weight, not height.", cites: ["BJA Educ Achondroplasia 2018", "Berkowitz Achondroplasia 1990"] },
      
      ]}
    />
  );
};

export default GeneticSyndromesTopic;
