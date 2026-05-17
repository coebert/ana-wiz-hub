import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";
import { ExamSection } from "@/components/ExamSection";
import { geneticSyndromesQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

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
        workedExamples: ["EMHG 2020 Guidelines", "TAPS 2013"],
        keyPoints: ["BJA Educ MH 2011", "BJA Educ MuscularDystrophy 2017", "AAGBI Sickle 2020", "British Porphyria Association Drug Database"],
      }}
      coreConcepts={
        <>
          <ExamSection exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Why genetics matter to the anaesthetist</h2>
            <p className="text-muted-foreground leading-relaxed">
              A handful of inherited disorders are over-represented in critical incidents because they alter the response to commonly used drugs (suxamethonium, volatiles, NMBAs, barbiturates) or because they affect the airway, the cervical spine, the heart or the lungs in ways that surprise the unprepared anaesthetist. A structured framework — <strong>airway, cardiorespiratory, neuromuscular, pharmacology, regional, transfusion</strong> — lets you assess any unfamiliar syndromic patient.
            </p>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Malignant Hyperthermia (RYR1 / CACNA1S)</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Autosomal dominant; uncontrolled SR Ca²⁺ release on exposure to volatiles or suxamethonium → hypermetabolism, masseter spasm, ↑EtCO₂, hyperthermia, rhabdomyolysis, hyperkalaemia, DIC.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Genetics", value: "RYR1 (~70%), CACNA1S; autosomal dominant. Penetrance variable." },
                { label: "Triggers", value: "All volatiles (sevo, iso, des), suxamethonium. NOT N₂O, propofol, opioids, NMBAs (non-dep), regional." },
                { label: "First sign", value: "Unexplained ↑EtCO₂ despite ↑MV; masseter spasm after sux; tachycardia; mixed acidosis." },
                { label: "Dantrolene", value: "2.5 mg/kg IV bolus, repeat to 10 mg/kg. Each vial = 20 mg + 60 mL water; new formulation Ryanodex 250 mg / 5 mL." },
                { label: "Adjuncts", value: "Stop trigger, 100% O₂ high-flow, charcoal filters, active cooling, treat hyperK⁺ and acidosis, forced diuresis." },
                { label: "Confirmation", value: "EMHG IVCT (caffeine-halothane contracture test) on muscle biopsy = gold standard. Genetic testing complementary." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Muscular dystrophies (DMD, BMD)</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Anaesthesia-induced rhabdomyolysis (AIR)</strong>: hyperkalaemic cardiac arrest with sux ± volatiles — clinically resembles MH but is a different mechanism (membrane fragility, not RYR1).</li>
              <li><strong>Avoid</strong>: suxamethonium absolutely; volatiles relatively (use TIVA).</li>
              <li><strong>Cardiomyopathy</strong>: dilated cardiomyopathy in &gt;90% of DMD by late teens; preop echo + ECG.</li>
              <li><strong>Respiratory</strong>: restrictive lung disease, weak cough, OSA — preop FVC, consider postop NIV.</li>
              <li><strong>Sensitivity</strong>: exaggerated response to non-depolarising NMBAs; titrate carefully with TOF; sugammadex preferred for reversal of rocuronium.</li>
            </ul>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Myotonic dystrophy (DM1, DMPK CTG repeat)</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Myotonia not relieved by NMBAs, regional anaesthesia, or deep volatile — it is a sarcolemmal channelopathy. Triggers: cold, shivering, sux, neostigmine, surgical/electrical stimulation.</li>
              <li>Treatment of intra-op contracture: local infiltration of LA into the muscle ± systemic procainamide/phenytoin/quinine.</li>
              <li>Cardiac conduction disease (AV block) — preop ECG ± Holter; pacemaker if symptomatic. Risk of sudden death.</li>
              <li>Bulbar weakness → aspiration risk; slow gastric emptying.</li>
              <li>Exquisite sensitivity to opioids, benzodiazepines and propofol — use minimal doses with monitoring.</li>
              <li>Avoid sux and neostigmine; use sugammadex.</li>
            </ul>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Pseudocholinesterase deficiency</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Reduced or absent butyrylcholinesterase (BChE) → prolonged sux block (2–8 h with homozygous atypical genotype). TOF shows phase II block (fade, post-tetanic facilitation).
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Management: keep sedated and ventilated until block resolves; do NOT give neostigmine early (prolongs block); sugammadex does NOT reverse sux.</li>
              <li>Send dibucaine number to confirm; family screening — autosomal recessive.</li>
              <li>Acquired BChE reduction: pregnancy, liver failure, plasmapheresis, ecothiopate eye drops.</li>
            </ul>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Down syndrome (trisomy 21)</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Airway</strong>: macroglossia, midface hypoplasia, narrow nasopharynx, subglottic stenosis (use ETT 0.5–1 size smaller).</li>
              <li><strong>C-spine</strong>: atlanto-axial instability in 10–20% (symptomatic 1–2%). Routine X-rays not recommended; focused neuro exam — image only if symptomatic or before high-risk procedure.</li>
              <li><strong>Cardiac</strong>: 40–50% have CHD (AVSD, VSD, PDA, ToF). Pulmonary hypertension common.</li>
              <li><strong>Other</strong>: OSA, hypothyroidism, leukaemia risk, recurrent chest infections, behavioural issues — premedication and parental presence often valuable.</li>
            </ul>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Connective tissue disorders</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Marfan (FBN1)", value: "Aortic root dilatation/dissection (continue β-blockers, control BP/dP/dt), MV prolapse, pneumothorax risk, lens dislocation, dural ectasia → unreliable spinal." },
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
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Haemoglobinopathies</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li><strong>Sickle cell (HbSS)</strong>: avoid the 5 H's — Hypoxia, Hypothermia, Hypotension/dehydration, Hypoperfusion (stasis), High acidity. Top-up to Hb ~100 g/L for medium-risk surgery (TAPS); exchange to HbS &lt;30% for high-risk (cardiac, neuro). Active warming, generous fluids, supplemental O₂, multimodal analgesia.</li>
              <li><strong>β-thalassaemia major</strong>: chronic transfusion → iron overload (cardiomyopathy, cirrhosis, endocrinopathies). Pre-op echo, ferritin, glucose. Consider chelation continuity.</li>
              <li><strong>G6PD deficiency</strong>: avoid oxidative stressors — sulphonamides, nitrofurantoin, methylene blue (also causes false low SpO₂), prilocaine in large doses, fava beans. Methaemoglobinaemia is treated with ascorbic acid in G6PD-deficient patients (NOT methylene blue).</li>
            </ul>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Acute intermittent porphyria (HMBS)</h2>
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
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Syndrome quick-reference grid</h2>
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
                      syndrome: "Marfan / Loeys-Dietz (FBN1 / TGFBR)",
                      system: "Aorta, lungs, dura",
                      hazards: "Aortic dissection, MV prolapse, pneumothorax, dural ectasia → unreliable spinal",
                      safe: "Continue β-blockade, strict BP/dP/dt control, art line, epidural > spinal, avoid hypertensive surges",
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
          </ExamSection>

          <ExamSection exams={[Exam.FINAL]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Other syndromes worth knowing</h2>
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
        { text: "Marfan / Loeys-Dietz: strict BP control, continue β-blockers, dural ectasia → unreliable spinal.", cites: ["BJA Educ Marfan 2016"] },
        { text: "Sickle cell: avoid the 5 H's; top-up Hb to ~100 g/L (TAPS) for medium-risk surgery.", cites: ["AAGBI Sickle 2020", "TAPS 2013"] },
        { text: "AIP: avoid barbiturates, etomidate, diclofenac, phenytoin; propofol/opioids/sevoflurane safe; cross-check every drug.", cites: ["BJA Educ Porphyria 2017", "Drug Database Porphyria"] },
      
      ]}
    />
  );
};

export default GeneticSyndromesTopic;
