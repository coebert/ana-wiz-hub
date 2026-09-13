import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { antiemeticsQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { DiagramSection } from "@/components/topic/DiagramSection";
import VomitingControlDiagram from "@/components/diagrams/pharmacology/VomitingControlDiagram";
import { InlineRef } from "@/components/references/InlineRef";
import { AnaesthesiaDosingCallout } from "@/components/perioperative/AnaesthesiaDosingCallout";

const antiemeticsFaqs: Array<[string, string]> = [
  [
    "What is the Apfel score and how does it guide PONV prophylaxis?",
    "Four risk factors: female sex, non-smoker, history of PONV/motion sickness, postoperative opioid use. Each scores 1; predicted risk 10/20/40/60/80 %. Score 0–1: no prophylaxis or 1 agent. Score 2: 2 agents. Score 3–4: 3 agents + consider TIVA + avoid N₂O. Use drugs from different classes (5-HT3 antagonist + steroid + droperidol or cyclizine)."
  ],
  [
    "Compare the mechanisms of common antiemetics.",
    "Ondansetron — 5-HT3 antagonist at vagal afferents and chemoreceptor trigger zone; QT prolongation. Dexamethasone — anti-inflammatory and central effects; given at induction (delayed onset 1–2 h, duration 24 h). Cyclizine — H1 antihistamine + anticholinergic; useful for opioid- and motion-related PONV; tachycardia limits use in cardiac disease. Droperidol — D2 antagonist; effective but QT prolongation black-box. Aprepitant — NK1 antagonist; long-acting (24 h)."
  ],
  [
    "What is the role of TIVA in PONV?",
    "Propofol TIVA reduces PONV incidence by ~25 % compared with volatile anaesthesia (number needed to treat ~6 for high-risk patients). Mechanism is multifactorial — antiemetic action of propofol at low concentrations and avoidance of emetogenic volatiles. Combine with avoidance of N₂O, opioid-sparing techniques (regional, NSAIDs), and a multimodal antiemetic regimen for highest-risk patients."
  ]
];

const objectives = [
  "Apply the Apfel score to estimate baseline PONV risk and stratify prophylaxis",
  "Compare antiemetic drug classes by receptor target, site of action and side-effect profile",
  "Plan multimodal PONV prophylaxis for low-, moderate- and high-risk patients (4-step approach)",
  "Recognise the cardiac, extrapyramidal and metabolic adverse effects of common antiemetics",
  "Choose appropriate rescue therapy (different class to prophylaxis; avoid repeating within 6 h)",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Multimodal PONV prophylaxis for a high-risk patient",
    scenario:
      "A 35-year-old non-smoking woman with a history of motion sickness is listed for laparoscopic cholecystectomy. The plan is GA with postoperative oral oxycodone. How do you stratify and treat her PONV risk?",
    working:
      "Apfel risk factors: female (1) + non-smoker (1) + history of PONV/motion sickness (1) + postoperative opioids (1) = 4 → ~79% baseline PONV risk.\nMultimodal plan: dexamethasone 4–8 mg at induction + ondansetron 4 mg IV at end of surgery + consider TIVA (propofol intrinsic antiemetic) + avoid N₂O + NSAID/regional analgesia to limit opioid load.\nRescue: cyclizine 50 mg IV (H₁) or droperidol 0.625 mg IV (D₂) — different class to prophylaxis.",
    answer:
      "Apfel 4 → ≥3 antiemetics from different classes plus opioid-sparing technique. Standard combination: dexamethasone (induction) + ondansetron (end of surgery) + cyclizine on the ward; TIVA + regional analgesia further halves rebound risk. Rescue with a drug from a class not already used.",
    cites: ["BJA Educ 2013"],
  },
  {
    title: "Drug interactions and the QTc",
    scenario:
      "A patient on methadone for chronic pain (baseline QTc 470 ms) needs PONV prophylaxis. Which agents are safe?",
    working:
      "Both ondansetron and droperidol prolong QTc — combination with methadone (also QTc-prolonging) risks torsades.\nDexamethasone, cyclizine and aprepitant do not significantly affect QTc.\nIf a 5-HT₃ antagonist is essential, use the lowest effective dose (ondansetron 4 mg) and obtain an ECG.",
    answer:
      "Build prophylaxis around dexamethasone + cyclizine ± aprepitant. Avoid droperidol; use ondansetron only at the lowest dose with ECG monitoring. Always check the cumulative QTc-prolonging burden in patients on methadone, antipsychotics or amiodarone.",
    cites: ["Peck & Hill Ch.16"],
  },
];

const AntiemeticsTopic = () => {
  return (
    <TopicTemplate
      title="Antiemetics & PONV"
      subtitle="Apfel risk stratification, drug classes, and multimodal prevention"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
      topicId="antiemetics"
      topicTitle="Antiemetics & PONV"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={antiemeticsQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["RCoA Primary — Pharmacology", "RCoA Final — Pharmacology"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        workedExamples: ["Gan et al. 2020", "BJA Educ 2013", "Peck & Hill Ch.16"],
        keyPoints: ["Gan et al. 2020", "BJA Educ 2013", "Peck & Hill Ch.16"],
      }}
      keyPoints={[
        { text: "Apfel score: female, non-smoker, history of PONV, postoperative opioids — each adds ~20% risk", cites: ["Gan et al. 2020"] },
        { text: "Multimodal antiemesis from different receptor classes is more effective than single-agent prophylaxis", cites: ["BJA Educ 2013"] },
        { text: "Ondansetron (5-HT₃) + dexamethasone (steroid) is the most commonly used combination", cites: ["Peck & Hill Ch.16"] },
        { text: "Propofol (TIVA) has intrinsic antiemetic properties — consider for high-risk patients", cites: ["Gan et al. 2020"] },
        { text: "Metoclopramide is a weak antiemetic but useful as a prokinetic (↑ gastric emptying, ↑ LOS tone)", cites: ["BJA Educ 2013"] },
        { text: "Dexamethasone is given at induction (slow onset); ondansetron at end of surgery", cites: ["Peck & Hill Ch.16"] },
        { text: "Rescue uses a different class to prophylaxis; do not repeat the same drug within 6 h", cites: ["Gan et al. 2020"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="apfel" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="PONV Risk Factors (Apfel Score)" defaultOpen>
            <p className="text-muted-foreground leading-relaxed">
              The Apfel score consists of <strong>four patient-specific factors</strong>, each adding ~20% to baseline PONV risk:
              (1) female sex, (2) non-smoker, (3) history of PONV or motion sickness, (4) anticipated postoperative opioids.
              Score 0 = 10%, 1 = 21%, 2 = 39%, 3 = 61%, 4 = 79%<InlineRef topicId="antiemetics" refLabel="Gan et al. 2020" />.
              Surgical (laparoscopic, gynaecological, ENT, strabismus) and anaesthetic (volatiles, N₂O, neostigmine) factors are
              <em> independent predictors</em> of PONV but are not components of the 4-point Apfel score
              <InlineRef topicId="antiemetics" refLabel="BJA Educ 2013" />.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="drug-classes" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Antiemetic Drug Classes">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Class</th>
                    <th className="text-left py-2 text-foreground font-semibold">Receptor</th>
                    <th className="text-left py-2 text-foreground font-semibold">Site</th>
                    <th className="text-left py-2 text-foreground font-semibold">Examples</th>
                    <th className="text-left py-2 text-foreground font-semibold">Side Effects</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">5-HT₃ antagonist</td><td>5-HT₃</td><td>CTZ + vagal afferents</td><td>Ondansetron 4 mg</td><td>Headache, constipation, ↑ QTc</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Butyrophenones</td><td>Dopamine D₂</td><td>CTZ</td><td>Droperidol 0.625–1.25 mg IV (onset 3–10 min, antiemetic effect ~24 h despite t½ ~2 h); haloperidol 0.5–2 mg IV/IM</td><td>Highly effective prophylaxis or rescue, comparable to ondansetron; sedation, dystonia/akathisia and dose-related QTc prolongation. The 2001 FDA black-box warning followed torsade reports at antipsychotic (10–25 mg) doses; at antiemetic doses the risk is very low and the 4th Consensus Guidelines endorse its use, but obtain an ECG and avoid in congenital long QT, uncorrected hypokalaemia/hypomagnesaemia or with other QT-prolonging drugs <InlineRef topicId="antiemetics" refLabel="Gan et al. 2020" /><InlineRef topicId="antiemetics" refLabel="A&A 2022 PONV Rescue" />.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Antihistamines</td><td>H₁</td><td>Vestibular nucleus + NTS</td><td>Cyclizine 50 mg IV/IM/PO; promethazine 12.5–25 mg IV/IM/PO</td><td>Useful for motion- and opioid-related nausea and rescue PONV; sedation, dry mouth, blurred vision and anticholinergic burden. Cyclizine may cause tachycardia <InlineRef topicId="antiemetics" refLabel="Nat Prod Bioprospect 2022 Tropanes" />.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Anticholinergics</td><td>M₁</td><td>Vestibular nuclei + NTS</td><td>Hyoscine hydrobromide (scopolamine): 1.5 mg transdermal patch, or 0.3–0.6 mg IV/IM/SC</td><td>Central muscarinic blockade interrupts vestibular input to the vomiting centre, so it is the agent of choice for motion-sickness-related and opioid/PCA-related nausea. The patch takes <strong>2–4 h</strong> to reach effect, so apply the evening before or ≥ 2 h pre-induction, and it lasts <strong>up to 72 h</strong>. Dry mouth is the commonest effect; also blurred vision (mydriasis — warn about eye contact after handling), sedation, urinary retention and, in older people, confusion and delirium. Avoid in glaucoma, prostatism and frail elderly patients; remove the patch before MRI as some contain metallic backing <InlineRef topicId="antiemetics" refLabel="Gan et al. 2020" /><InlineRef topicId="antiemetics" refLabel="PONV 4th Consensus 2020" /><InlineRef topicId="antiemetics" refLabel="Nat Prod Bioprospect 2022 Tropanes" />.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">NK₁ antagonist</td><td>NK₁ (substance P)</td><td>Vomiting centre</td><td>Aprepitant 80 mg PO</td><td>CYP3A4 inhibitor, headache. Prolonged action (t½ ~40 h)<InlineRef topicId="antiemetics" refLabel="Gan et al. 2020" /></td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Corticosteroid</td><td>Multiple (?central prostaglandin synthesis inhibition)</td><td>Central + peripheral</td><td>Dexamethasone 4–8 mg</td><td>↑ glucose, perineal pruritus (IV push). Give at induction<InlineRef topicId="antiemetics" refLabel="BJA Educ 2013" /></td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Prokinetic</td><td>D₂ antagonist + 5-HT₄ agonist (5-HT₃ antagonist at high dose)</td><td>CTZ + GI tract</td><td>Metoclopramide 10 mg IV/IM/PO 8-hourly (onset 1–3 min IV, t½ ~4 h)</td><td>Increases lower-oesophageal sphincter tone and accelerates gastric emptying — useful in gastroparesis, opioid-delayed emptying and as an adjunct in aspiration prophylaxis. As a PONV drug it is <strong>weak at 10 mg</strong>: the 4th Consensus Guidelines do not recommend it as a single prophylactic agent and note that 25–50 mg is needed for meaningful benefit, so it should be used as an adjunct in combination rather than alone. Extrapyramidal reactions (acute dystonia, most often in young women and after repeated doses), akathisia, hyperprolactinaemia and, with prolonged use, tardive dyskinesia — hence the MHRA restriction to short-term use (maximum 5 days). Avoid in Parkinson's disease and after bowel anastomosis or where obstruction is suspected <InlineRef topicId="antiemetics" refLabel="Gan et al. 2020" /><InlineRef topicId="antiemetics" refLabel="PONV 4th Consensus 2020" />.</td></tr>
                </tbody>
              </table>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <DiagramSection
            id="vomiting-reflex"
            title="Vomiting Reflex & Antiemetic Receptor Targets"
            intro="The vomiting centre (NTS) integrates inputs from the CTZ, vestibular nuclei, vagal afferents and higher centres. Each antiemetic class blocks a specific input — multimodal therapy works by hitting different receptors along these pathways."
          >
            <VomitingControlDiagram />
          </DiagramSection>

          <ExamSection id="management" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="PONV Management Strategy">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Low risk</strong> (Apfel 0–1): no routine prophylaxis</li>
              <li><strong>Moderate risk</strong> (Apfel 2): 1–2 antiemetics from different classes</li>
              <li><strong>High risk goal:</strong> combine independent measures to reduce baseline risk by more than 75% rather than escalating one drug.</li>
              <li><strong>Risk reduction:</strong> use propofol TIVA instead of volatile anaesthesia (relative risk reduction about 25–30%), avoid N₂O and maximise regional/local and non-opioid analgesia.</li>
              <li><strong>Multimodal prophylaxis:</strong> combine at least two classes; a standard regimen is dexamethasone 4–8 mg at induction plus ondansetron 4 mg near the end. For Apfel 4 or previous severe PONV, add droperidol 0.625 mg or aprepitant <InlineRef topicId="antiemetics" refLabel="BJA 2011 Multimodal PONV" />.</li>
              <li><strong>Rescue</strong>: use an agent from a different class to prophylaxis. Do not repeat the same drug within 6 h</li>
              <li><strong>Non-pharmacological</strong>: see below</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="non-pharmacological" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Non-pharmacological Prevention & Baseline Risk Reduction">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Consensus guidance stresses reducing baseline risk before adding drugs — each measure below acts independently of receptor blockade<InlineRef topicId="antiemetics" refLabel="Gan et al. 2020" />.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Regional in preference to general anaesthesia</strong> — reduces PONV roughly nine-fold in comparable procedures</li>
              <li><strong>TIVA with propofol and avoidance of volatiles and N₂O</strong> — each independently reduces early PONV (relative risk reduction ~25% each)</li>
              <li><strong>Opioid-sparing multimodal analgesia</strong> — paracetamol, NSAIDs, regional/fascial plane blocks, local infiltration, ketamine, dexmedetomidine, gabapentinoids where appropriate</li>
              <li><strong>Adequate hydration</strong> — supplemental crystalloid 20–30 mL/kg reduces PONV after day surgery; avoid prolonged fasting and encourage clear fluids up to 2 h and carbohydrate loading</li>
              <li><strong>Minimise neostigmine</strong> — high-dose reversal is emetogenic; sugammadex is an alternative</li>
              <li><strong>P6 (Neiguan) acupoint stimulation</strong> — acupuncture, acupressure bands or transcutaneous electrical stimulation are as effective as a single antiemetic drug and free of drug side effects<InlineRef topicId="antiemetics" refLabel="Cochrane 2015 P6" /><InlineRef topicId="antiemetics" refLabel="BJA 1999 Paediatric PONV" /></li>
              <li><strong>Aromatherapy (isopropyl alcohol, peppermint)</strong> and <strong>chewing gum</strong> have modest evidence for treating established nausea in recovery</li>
              <li><strong>Avoid gastric insufflation and blood in the stomach</strong>; gentle mask ventilation, orogastric suction after ENT/upper GI surgery</li>
              <li><strong>Supplemental oxygen alone does not prevent PONV</strong> — a common exam misconception</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="special-populations" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="High-risk Special Populations">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Obstetric (caesarean section)</p>
                <p className="text-sm text-muted-foreground mt-1">Intrathecal/epidural opioids, uterotonics and hypotension all provoke nausea. Give <strong>ondansetron 4 mg + dexamethasone 4–8 mg</strong> routinely, treat hypotension pre-emptively with a phenylephrine infusion (the strongest single measure), and use cyclizine for rescue. Avoid droperidol at high dose. Metoclopramide is safe in pregnancy and additionally prokinetic.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Day surgery</p>
                <p className="text-sm text-muted-foreground mt-1">PONV is a leading cause of unplanned admission and delayed discharge. Consider a long-acting agent (dexamethasone, aprepitant, transdermal hyoscine applied 2–4 h pre-op) to cover post-discharge nausea and vomiting, and give the patient oral rescue medication to take home.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Neurosurgery, ENT and ophthalmic</p>
                <p className="text-sm text-muted-foreground mt-1">Vomiting raises ICP, IOP and venous pressure and threatens the surgical result; middle ear and strabismus surgery are strongly emetogenic. Use triple prophylaxis with TIVA. Posterior fossa surgery involves direct stimulation of the vomiting centre.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Bariatric, gynaecological and laparoscopic</p>
                <p className="text-sm text-muted-foreground mt-1">High baseline risk (female sex, pneumoperitoneum, opioids). Combine TIVA, ≥2–3 agents from different classes, opioid-sparing blocks (TAP, rectus sheath)<InlineRef topicId="antiemetics" refLabel="BJA 2009 TAP Caesarean" />, and generous fluid. Avoid nitrous oxide with bowel distension.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Elderly and cardiac disease</p>
                <p className="text-sm text-muted-foreground mt-1">Avoid anticholinergics (cyclizine, hyoscine) — delirium, tachycardia, urinary retention. Avoid droperidol and high-dose ondansetron where QTc is prolonged or the patient takes amiodarone, methadone or antipsychotics. Dexamethasone is usually the safest first agent.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Diabetes and immunosuppression</p>
                <p className="text-sm text-muted-foreground mt-1">A single dose of dexamethasone raises glucose by ~2 mmol/L for 12–24 h; still recommended but check capillary glucose. No increase in wound infection with a single perioperative dose.</p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="paediatric-ponv" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Paediatric PONV">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Vomiting is roughly twice as common in children as in adults and is measured as <strong>postoperative vomiting (POV)</strong> because young children cannot report nausea. The Eberhart/POVOC score uses four factors — <strong>surgery ≥ 30 min, age ≥ 3 years, strabismus surgery, and a history of POV in the child or PONV in a first-degree relative</strong> — giving risks of 9%, 10%, 30%, 55% and 70% for 0–4 factors<InlineRef topicId="antiemetics" refLabel="Eberhart 2004 POVOC" /><InlineRef topicId="antiemetics" refLabel="BJA 1999 Paediatric PONV" />.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Prophylaxis:</strong> ≥2 risk factors → two agents. Ondansetron <strong>0.1 mg/kg (max 4 mg)</strong> plus dexamethasone <strong>0.15 mg/kg (max 8 mg)</strong> is the standard combination; add droperidol 10–15 mcg/kg only in refractory cases with ECG review.</li>
              <li><strong>Highest-risk surgery:</strong> strabismus, adenotonsillectomy, middle ear, orchidopexy, hernia repair.</li>
              <li><strong>Technique:</strong> propofol TIVA, avoid nitrous oxide, use regional/caudal or wound infiltration for opioid sparing, liberal clear fluids until 1 h pre-op and avoid prolonged fasting.</li>
              <li><strong>Cautions:</strong> avoid metoclopramide (extrapyramidal reactions in children and young adults); cyclizine is licensed from 6 years/&gt;10 kg in many formularies; post-tonsillectomy vomiting may signal swallowed blood or bleeding, not simple PONV.</li>
              <li><strong>Consequences:</strong> dehydration, delayed discharge and unplanned admission, wound dehiscence, and distress for child and parents.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="rescue" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Rescue Therapy for Established PONV">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Treatment of established PONV follows two rules: <strong>exclude a treatable cause</strong>, then <strong>use a drug from a class not already given</strong>. Repeating a drug already used within 6 h adds side effects without benefit<InlineRef topicId="antiemetics" refLabel="Gan et al. 2020" /><InlineRef topicId="antiemetics" refLabel="A&A 2022 PONV Rescue" />.
            </p>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside leading-relaxed">
              <li><strong>Look for a cause:</strong> hypotension or hypovolaemia, hypoxia, pain, opioid excess or PCA misuse, bleeding or swallowed blood, bowel obstruction or ileus, raised ICP, hypoglycaemia or hyponatraemia, drugs (antibiotics, uterotonics), vestibular stimulation on movement.</li>
              <li><strong>Supportive measures:</strong> fluid bolus, treat pain with a non-opioid, oxygen if hypoxic, avoid sudden movement, nasogastric decompression if distended.</li>
              <li><strong>If no prophylaxis was given:</strong> ondansetron 4 mg IV is first line (a reduced 1 mg dose is effective for treatment in some studies).</li>
              <li><strong>If prophylaxis was given &gt; 6 h ago:</strong> repeating a 5-HT₃ antagonist is reasonable; within 6 h, switch class.</li>
              <li><strong>Second and third line by class:</strong> dexamethasone 4–8 mg (if not given), cyclizine 50 mg IV, droperidol 0.625 mg IV (ECG), haloperidol 0.5–1 mg IV, prochlorperazine 12.5 mg IM, metoclopramide 10 mg (weak), aprepitant 40–80 mg PO for protracted symptoms, transdermal hyoscine for motion-provoked nausea.</li>
              <li><strong>Refractory PONV:</strong> combine classes, consider a small propofol bolus (10–20 mg) in recovery, isopropyl alcohol sniffs, P6 stimulation, and review for an unrecognised surgical cause before discharge.</li>
            </ol>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="pharmacology"
            pitfalls={[
              "PONV risk (Apfel): female, non-smoker, history of PONV/motion sickness, postoperative opioids — give 1 prophylactic agent per risk factor.",
              "Ondansetron (5-HT3 antagonist): prolongs QT; most effective given at end of surgery.",
              "Dexamethasone 4–8 mg IV at induction — onset over hours; safe single dose even in diabetics (transient glucose rise).",
              "Droperidol/haloperidol: D2 antagonists — extrapyramidal effects and QT prolongation; black-box warning historically limits use.",
              "Cyclizine (H1) is useful but anticholinergic — tachycardia, sedation; avoid in severe heart failure and elderly.",
            ]}
          />
          <TopicFaqs faqs={antiemeticsFaqs} />

          <AnaesthesiaDosingCallout focus="PONV prophylaxis and treatment" />
        </>
      }
    />
  );
};

export default AntiemeticsTopic;
