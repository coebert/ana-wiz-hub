import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { InlineRef } from "@/components/references/InlineRef";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { endocrinePhysiologyQuestions } from "@/data/quizzes";
import HPAAxisDiagram from "@/components/diagrams/physiology/HPAAxisDiagram";
import { Exam } from "@/data/curriculum";

const endocrinePhysiologyFaqs: Array<[string, string]> = [
  [
    "Describe the hypothalamic–pituitary–adrenal axis response to surgical stress.",
    "Surgical stimulus → hypothalamic CRH → anterior pituitary ACTH → adrenal cortex → cortisol (peaks at 4–6 h, may reach 200–500 mg/day vs basal 30 mg/day for major surgery). Cortisol promotes gluconeogenesis, lipolysis, protein catabolism, sodium retention, immunosuppression, and permissive action on catecholamines. Regional anaesthesia and opioids attenuate this response."
  ],
  [
    "What is the perioperative steroid replacement regimen for adrenal suppression?",
    "Patients on >5 mg prednisolone/day for >3 weeks are at risk of HPA suppression. Replacement scaled to surgical stress: minor — usual dose + 25 mg hydrocortisone at induction. Moderate — 25 mg at induction + 100 mg/day for 24 h. Major — 100 mg at induction + 200 mg/day for 48–72 h, then taper. Avoid abrupt withdrawal — addisonian crisis is life-threatening."
  ],
  [
    "What are the perioperative implications of thyroid disease?",
    "Hyperthyroidism — risk of thyroid storm if untreated; defer elective surgery until euthyroid. Treat with carbimazole + β-blocker; consider Lugol's iodine pre-op. Hypothyroidism — increased sensitivity to anaesthetics and opioids, slow drug metabolism, hyponatraemia, hypothermia, ileus. Severe (myxoedema coma): postpone if elective; if emergency, give IV levothyroxine + hydrocortisone (cover possible coexistent adrenal failure)."
  ]
];

const objectives = [
  "Outline the hypothalamic-pituitary axis and identify hormones with major perioperative relevance.",
  "Describe HPA axis regulation and the implications of exogenous steroid use for surgical patients.",
  "Summarise adrenal cortical and medullary function and the principles of phaeochromocytoma preparation.",
  "Explain thyroid and calcium homeostasis and recognise the perioperative emergencies of thyroid storm and hypocalcaemia.",
  "Describe the surgical stress response and strategies that attenuate it.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Perioperative steroid cover",
    scenario: (
      <>
        A 64-year-old taking prednisolone 10 mg daily for 6 months for polymyalgia rheumatica is listed for a total knee
        replacement. Does she need supplementary steroid cover and, if so, how much?
      </>
    ),
    working: (
      <>
        Prednisolone &gt;5 mg/day for &gt;3 weeks is assumed to suppress the HPA axis. The physiological cortisol output
        rises with surgical magnitude (Salem &amp; Kehlet):
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Minor</strong> (e.g. inguinal hernia): equivalent to ~25 mg cortisol over 24 h.</li>
          <li><strong>Moderate</strong> (e.g. THR/TKR, cholecystectomy): ~50–75 mg over 24 h.</li>
          <li><strong>Major</strong> (e.g. cardiac, oesophagectomy): ~75–150 mg over 24 h.</li>
        </ul>
        Standard UK guidance (AAGBI 2020): continue usual oral dose AND give hydrocortisone 100 mg IV at induction, then
        50 mg IV 8-hourly for 24 h for moderate surgery. Reduce by 50% per day until back on baseline.
      </>
    ),
    answer: (
      <>
        Continue oral prednisolone, hydrocortisone 100 mg IV at induction, then 50 mg IV 8-hourly for 24 h, then taper
        over 48 h back to baseline. Monitor BP and glucose.
      </>
    ),
    cites: ["BJA Educ 2015"],
  },
  {
    title: "Phaeochromocytoma preparation",
    scenario: (
      <>
        A 45-year-old with episodic hypertension, sweating and palpitations has plasma metanephrines 5× the upper limit
        of normal and a 4 cm right adrenal mass. What is the preoperative plan and why must α-blockade precede β-blockade?
      </>
    ),
    working: (
      <>
        Catecholamines act at α₁ (vasoconstriction), β₁ (HR/contractility) and β₂ (vasodilation). Unopposed β-blockade
        removes β₂-mediated vasodilation while α₁ vasoconstriction is unchecked → severe hypertension and acute LV
        failure.
        <p className="mt-2">Standard regimen (typically 10–14 days):</p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li><strong>α-blockade first</strong>: phenoxybenzamine 10 mg BD, titrated up. Doxazosin is a selective α₁
            alternative.</li>
          <li>Liberalise salt and fluid intake to expand contracted intravascular volume.</li>
          <li>Add <strong>β-blocker</strong> (atenolol/propranolol) only once α-blockade established, to control reflex
            tachycardia.</li>
          <li>Goals: BP &lt;130/80 seated and ≥90/45 standing; HR 60–80; mild orthostasis acceptable; no ST changes.</li>
        </ul>
      </>
    ),
    answer: (
      <>
        Adequate α-blockade for 10–14 days, then β-blockade, plus volume expansion. Intra-op: arterial line, large-bore
        IV access, magnesium and short-acting agents (esmolol, GTN, phentolamine, sodium nitroprusside) ready for
        catecholamine surges and post-resection hypotension.
      </>
    ),
    cites: ["Power & Kam Ch.12"],
  },
];

const EndocrinePhysiologyTopic = () => {
  return (
    <TopicTemplate
      title="Endocrine Physiology"
      subtitle="FRCA Primary & Final — Physiology"
      backPath="/physiology"
      backLabel="Physiology"
      accentColor="text-physiology"
      topicId="endocrine-physiology"
      topicTitle="Endocrine Physiology"
      quizQuestions={endocrinePhysiologyQuestions}
      objectives={objectives}
      workedExamples={workedExamples}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["CR_BK_07"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["OA_BK_05"] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: ["Power & Kam Ch.12"],
        workedExamples: ["BJA Educ 2015", "Nicholson & Hall 2011", "Power & Kam Ch.12"],
        keyPoints: ["Power & Kam Ch.12", "BJA Educ 2015", "Nicholson & Hall 2011"],
      }}
      keyPoints={[
        { text: "Cortisol: diurnal rhythm (peak 8 am), suppressed by exogenous steroids — perioperative cover needed if HPA axis suppressed.", cites: ["Nicholson & Hall 2011"] },
        { text: "Phaeochromocytoma: α-blockade BEFORE β-blockade (phenoxybenzamine then propranolol/atenolol) and volume loading.", cites: ["BJA Educ 2015"] },
        { text: "T₃ is the active thyroid hormone (T₄ is prohormone). Hypothyroid patients have ↑ sensitivity to anaesthetics.", cites: ["Power & Kam Ch.12"] },
        { text: "Calcium ~50% ionised. Post-thyroidectomy hypocalcaemia from parathyroid damage causes tetany and ↑ QTc.", cites: ["Nicholson & Hall 2011"] },
        { text: "Surgical stress response: ↑ cortisol, catecholamines, ADH → hyperglycaemia, Na⁺/H₂O retention. Attenuated by neuraxial regional.", cites: ["BJA Educ 2015"] },
        { text: "Perioperative glucose target 6–10 mmol/L. Hypoglycaemia (<4 mmol/L) is more dangerous than moderate hyperglycaemia.", cites: ["Power & Kam Ch.12"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="overview" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_07"]}>
            <CollapsibleSubsection title="Overview" defaultOpen>
            <p className="text-muted-foreground leading-relaxed">
              The endocrine system co-ordinates whole-body homeostasis through hormonal feedback loops centred on the
              hypothalamus and pituitary. Every major perioperative emergency — adrenal crisis, thyroid storm,
              diabetic ketoacidosis, phaeochromocytoma haemodynamic instability — sits on a defect in one of these
              axes. The surgical stress response itself is an endocrine event, and anaesthetic technique modulates
              its magnitude.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="carcinoid" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["CR_BK_07"]}>
            <CollapsibleSubsection title="Carcinoid Syndrome and Crisis">
              <p className="text-sm text-muted-foreground leading-relaxed">Neuroendocrine tumours can release serotonin, histamine, bradykinin and other vasoactive mediators, causing flushing, secretory diarrhoea and bronchospasm; metastatic disease may produce right-sided carcinoid valvular disease. A perioperative crisis can cause profound hypotension or hypertension, bronchospasm and arrhythmia. Optimise with a specialist team, somatostatin analogue therapy (octreotide or lanreotide) and echocardiography where heart disease is suspected. Avoid catecholamine surges and histamine-releasing drugs such as morphine and atracurium; use invasive arterial pressure monitoring for major tumour surgery, with octreotide bolus/infusion, vasopressors and bronchodilators immediately available <InlineRef topicId="endocrine-physiology" refLabel="Power & Kam Ch.12" />.</p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="hp-axis" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_07"]}>
            <CollapsibleSubsection title="Hypothalamic-Pituitary & HPA Axes">
              <p className="text-muted-foreground leading-relaxed mb-4">
                The hypothalamus controls the anterior pituitary via releasing/inhibiting hormones through the
                hypothalamic-hypophyseal portal system. The posterior pituitary stores and releases ADH and oxytocin
                (synthesised in supraoptic and paraventricular hypothalamic nuclei). ACTH drives cortisol release from the
                zona fasciculata and androgens from the zona reticularis; aldosterone from the zona glomerulosa is
                regulated primarily by the renin–angiotensin system and plasma K⁺, with only a minor permissive
                contribution from ACTH (<InlineRef topicId="endocrine-physiology" refLabel="Ganong Ch.20 Adrenal" />).
              </p>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-foreground font-semibold">Hormone</th>
                      <th className="text-left py-2 text-foreground font-semibold">Source</th>
                      <th className="text-left py-2 text-foreground font-semibold">Anaesthetic Relevance</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border">
                      <td className="py-2 font-medium text-foreground">ACTH</td>
                      <td>Anterior pituitary</td>
                      <td>Stimulates cortisol. ↑ in stress response. Suppressed by exogenous steroids.</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 font-medium text-foreground">ADH (vasopressin)</td>
                      <td>Posterior pituitary</td>
                      <td>V₁ (vasoconstriction), V₂ (aquaporin-2, water reabsorption). Used in septic shock, DI.</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 font-medium text-foreground">TSH</td>
                      <td>Anterior pituitary</td>
                      <td>Stimulates T₃/T₄. Thyroid storm is a perioperative emergency.</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-medium text-foreground">GH</td>
                      <td>Anterior pituitary</td>
                      <td>Acromegaly: difficult airway, OSA, ↑ cardiac disease.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <HPAAxisDiagram />
            </CollapsibleSubsection>
          </ExamSection>


          <ExamSection id="adrenal" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_07"]}>
            <CollapsibleSubsection title="Adrenal Glands">
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                {
                  label: "Cortex — Zona glomerulosa",
                  value:
                    "Mineralocorticoids (aldosterone): Na⁺ retention, K⁺ excretion via ENaC. Regulated by RAAS and K⁺.",
                },
                {
                  label: "Cortex — Zona fasciculata",
                  value:
                    "Glucocorticoids (cortisol): ↑ glucose, anti-inflammatory, immunosuppression, permissive for catecholamines. Diurnal rhythm (peak 8 am).",
                },
                {
                  label: "Cortex — Zona reticularis",
                  value: "Androgens (DHEA, androstenedione). Minor role in adults.",
                },
                {
                  label: "Medulla",
                  value:
                    "Catecholamines: 80% adrenaline, 20% noradrenaline. Modified postganglionic sympathetic neurones. Phaeochromocytoma: episodic hypertension; α-blockade before β-blockade.",
                },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-border p-4 text-sm text-muted-foreground leading-relaxed">
              <p className="font-semibold text-foreground">Phaeochromocytoma preparation</p>
              <p className="mt-1">Block for 10–14 days. Start phenoxybenzamine about 10 mg twice daily and titrate, or use selective α₁ blockade such as doxazosin. Liberal salt and fluid intake correct chronic catecholamine-mediated volume contraction. Add β-blockade only after effective α-blockade if reflex tachycardia persists. Targets include seated BP &lt;130/80 mmHg, standing systolic BP &gt;90 mmHg, HR 60–70 seated and 70–80 standing, with ECG review for ischaemia/arrhythmia <InlineRef topicId="endocrine-physiology" refLabel="BJA Educ Phaeochromocytoma" />.</p>
            </div>
            <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm text-muted-foreground leading-relaxed">
              <div className="rounded-lg border border-border p-4"><p className="font-semibold text-foreground">Cushing's syndrome</p><p className="mt-1">Excess glucocorticoid may be iatrogenic, pituitary ACTH-driven (Cushing's disease), adrenal, or ectopic ACTH. Central obesity, thin fragile skin, difficult access, hypertension, hyperglycaemia, hypokalaemia and proximal myopathy create positioning, airway, ventilation, infection and thrombotic risk. Correct electrolytes, control glucose and blood pressure, pad carefully and plan postoperative steroid replacement after definitive surgery.</p></div>
              <div className="rounded-lg border border-border p-4"><p className="font-semibold text-foreground">Conn's syndrome</p><p className="mt-1">Primary hyperaldosteronism, commonly from an adrenal adenoma, causes resistant hypertension, hypokalaemia and metabolic alkalosis. Correct potassium and control pressure before surgery, usually with spironolactone or eplerenone; after adrenalectomy monitor for hypotension, hyperkalaemia and transient hypoaldosteronism <InlineRef topicId="endocrine-physiology" refLabel="Ganong Ch.20 Adrenal" />.</p></div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="thyroid-calcium" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_07"]}>
            <CollapsibleSubsection title="Thyroid & Calcium Homeostasis">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li>
                <strong>Thyroid hormones</strong>: T₄ (prohormone) → T₃ (active, intracellular receptors). ↑ BMR, ↑ O₂
                consumption, ↑ CO. 99% protein-bound (TBG). Hypothyroidism: ↑ sensitivity to anaesthetics, ↓ MAC.
              </li>
              <li>
                <strong>Thyroid storm</strong>: tachycardia, hyperthermia, agitation. Treatment: β-blocker, PTU/carbimazole,
                iodine (≥1 h after PTU), hydrocortisone, active cooling.
              </li>
              <li>
                <strong>Myxoedema coma</strong>: decompensated severe hypothyroidism, classically altered consciousness, hypothermia and a precipitant such as infection or surgery, with bradycardia, hypotension, hypoventilation, hyponatraemia and hypoglycaemia. Admit to ICU, support ventilation/circulation, correct glucose and electrolytes, rewarm cautiously, give IV levothyroxine with or without liothyronine, and empirical hydrocortisone until adrenal insufficiency is excluded <InlineRef topicId="endocrine-physiology" refLabel="ATA Hypothyroidism 2014" />.
              </li>
              <li>
                <strong>Calcium</strong>: normal 2.2–2.6 mmol/L. ~50% ionised (active), ~40% albumin-bound. PTH ↑ Ca²⁺
                (bone resorption, renal reabsorption, ↑ 1,25(OH)₂D₃). Calcitonin ↓ Ca²⁺ (minor role).
              </li>
              <li>
                <strong>Hypocalcaemia</strong>: post-thyroidectomy (parathyroid damage), massive transfusion (citrate),
                ↑ QTc, tetany, Chvostek's/Trousseau's signs.
              </li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="insulin-glucose" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_07"]}>
            <CollapsibleSubsection title="Insulin & Glucose">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li>
                <strong>Insulin</strong>: β-cells of islets of Langerhans. Anabolic: ↑ glucose uptake (GLUT4),
                glycogenesis, lipogenesis, protein synthesis. Released in response to glucose, amino acids, incretins
                (GLP-1).
              </li>
              <li>
                <strong>Glucagon</strong>: α-cells. Counter-regulatory: glycogenolysis, gluconeogenesis, lipolysis.
              </li>
              <li>
                <strong>Stress response</strong>: surgery → ↑ cortisol, catecholamines, glucagon, GH → insulin resistance
                → hyperglycaemia. Target glucose 6–10 mmol/L perioperatively.
              </li>
              <li>
                <strong>Perioperative management</strong>: VRIII (variable rate intravenous insulin infusion) for
                diabetic patients unable to eat. Avoid hypoglycaemia (&lt;4 mmol/L) — brain injury risk.
              </li>
            </ul>
            <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm"><div className="rounded-lg border border-border p-4"><p className="font-semibold text-foreground">DKA</p><p className="mt-1 text-muted-foreground">Glucose &gt;11 mmol/L (or known diabetes), blood ketones &gt;3 mmol/L and bicarbonate &lt;15 mmol/L or venous pH &lt;7.3. Begin 0.9% saline, check K⁺ before insulin, then fixed-rate insulin 0.1 units/kg/h; replace potassium according to serial values, add glucose as glucose falls, and treat the precipitant.</p></div><div className="rounded-lg border border-border p-4"><p className="font-semibold text-foreground">HHS</p><p className="mt-1 text-muted-foreground">Usually glucose ≥30 mmol/L, osmolality ≥320 mOsm/kg, profound dehydration and little ketonaemia/acidosis. Correct fluid and osmolality more slowly than DKA; insulin is generally delayed until initial fluid replacement unless significant ketonaemia is present.</p></div></div>
            <p className="mt-3 text-sm text-muted-foreground">The five practical pillars are fluids, insulin, potassium, glucose/ketone monitoring and identification of the precipitant <InlineRef topicId="endocrine-physiology" refLabel="JBDS DKA 2023" /> <InlineRef topicId="endocrine-physiology" refLabel="JBDS HHS 2022" />.</p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="perioperative-diabetes" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["CR_BK_07"]}>
            <CollapsibleSubsection title="Perioperative Management of Diabetes">
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Diabetes affects around 15% of surgical inpatients and independently increases length of stay, infection and
              mortality. UK practice follows CPOC/JBDS: optimise before admission, minimise starvation, keep the patient
              on their own regimen wherever possible, and use a variable rate intravenous insulin infusion (VRIII) only
              when it is genuinely needed <InlineRef topicId="endocrine-physiology" refLabel="CPOC Diabetes 2021" />{" "}
              <InlineRef topicId="endocrine-physiology" refLabel="JBDS Surgery 2022" />.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li>
                <strong>Pre-operative assessment</strong>: check HbA1c within 3 months. HbA1c &lt;69 mmol/mol (8.5%) is the
                usual threshold for proceeding with elective surgery; higher values warrant referral for optimisation
                unless surgery is urgent. Assess end-organ disease (nephropathy, autonomic neuropathy, ischaemic heart
                disease, stiff-joint syndrome and difficult airway in long-standing type 1).
              </li>
              <li>
                <strong>Medication review</strong>: omit <strong>SGLT2 inhibitors</strong> for at least 3 days before major
                surgery and on the day of any procedure (euglycaemic DKA risk); omit <strong>metformin</strong> on the day
                of surgery if more than one meal is missed or contrast/renal impairment is expected; omit sulfonylureas on
                the morning of surgery (hypoglycaemia); GLP-1 receptor agonists may be continued but consider gastric
                residue and aspiration risk.
              </li>
              <li>
                <strong>Type 1 diabetes</strong>: <em>never</em> stop basal insulin. Reduce long-acting basal by ~20% the
                evening before, omit morning short-acting if fasting, and start a VRIII with substrate (0.45% saline with
                5% glucose and potassium) if a meal will be missed. Continuous subcutaneous insulin infusion (pump) may
                continue for short procedures at a reduced basal rate with hourly capillary glucose.
              </li>
              <li>
                <strong>Type 2 diabetes</strong>: diet or single-agent control usually needs only omission of oral agents,
                hourly glucose and early return to normal diet. Insulin-treated type 2 patients follow the type 1 pathway.
              </li>
              <li>
                <strong>By surgical magnitude</strong>: minor/short day-case surgery — first on the list, omit relevant
                oral agents, no VRIII. Intermediate — VRIII if more than one missed meal or poor control. Major surgery,
                emergency surgery, sepsis or critical illness — VRIII from the outset with substrate infusion.
              </li>
              <li>
                <strong>Running a VRIII</strong>: 50 units soluble insulin in 50 mL 0.9% saline (1 unit/mL) via a
                dedicated line with a non-return valve. Target capillary glucose <strong>6–10 mmol/L</strong> (acceptable
                4–12 mmol/L), measured hourly and titrated against a written sliding scale (e.g. glucose &lt;4 → stop and
                treat hypoglycaemia; 4–7 → 0.5–1 unit/h; 7–11 → 2 units/h; 11–14 → 3 units/h; &gt;14 → 4 units/h and
                review for ketones). Always co-infuse substrate and monitor potassium and sodium at least daily.
              </li>
              <li>
                <strong>Coming off the VRIII</strong>: overlap with the first subcutaneous dose — give short-acting insulin
                with a meal and stop the infusion 30–60 min later, or continue basal analogue throughout so no gap occurs.
              </li>
              <li>
                <strong>Perioperative emergencies</strong>: DKA and HHS (see above). Suspect{" "}
                <strong>euglycaemic DKA</strong> in any patient on an SGLT2 inhibitor who is acidotic, nauseated or
                tachypnoeic despite a near-normal glucose — check blood ketones, and treat with fixed-rate insulin plus
                glucose rather than waiting for hyperglycaemia.
              </li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="adh-disorders" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["CR_BK_07"]}>
            <CollapsibleSubsection title="ADH Disorders — Diabetes Insipidus & SIADH">
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              ADH (vasopressin) is synthesised in the hypothalamic supraoptic and paraventricular nuclei and released from
              the posterior pituitary, acting on renal V₂ receptors to insert aquaporin-2 channels in the collecting duct.
              Too little produces dilute polyuria; too much produces dilutional hyponatraemia. Both are common after
              pituitary and neurosurgical procedures and in the head-injured ICU patient{" "}
              <InlineRef topicId="endocrine-physiology" refLabel="BJA Educ 2015" />.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="rounded-lg border border-border p-4">
                <p className="font-semibold text-foreground">Diabetes insipidus</p>
                <ul className="mt-1 space-y-1 text-muted-foreground list-disc list-inside">
                  <li><strong>Cranial (central)</strong>: failure of ADH secretion — pituitary surgery, TBI, hypoxic brain injury, brain-stem death, tumour, infiltration.</li>
                  <li><strong>Nephrogenic</strong>: renal resistance to ADH — lithium, demeclocycline, hypercalcaemia, hypokalaemia, chronic kidney disease, congenital V₂/aquaporin defects.</li>
                  <li><strong>Features</strong>: polyuria &gt;3 L/day (often &gt;4 mL/kg/h), polydipsia if conscious, hypernatraemia and rising plasma osmolality with inappropriately dilute urine.</li>
                  <li><strong>Diagnosis</strong>: plasma osmolality &gt;295 mOsm/kg with urine osmolality &lt;300 mOsm/kg and urine specific gravity &lt;1.005; water-deprivation test with desmopressin distinguishes cranial (urine concentrates after dDAVP) from nephrogenic (no response). Copeptin assay is now used in place of formal water deprivation in many centres.</li>
                  <li><strong>Management</strong>: replace the measured urinary losses and free-water deficit (hourly input/output charting), correct hypernatraemia no faster than ~10 mmol/L per 24 h, and give <strong>desmopressin</strong> — 0.25–1 microgram IV/SC or 10–20 micrograms intranasally, titrated to urine output. Recheck sodium 4–6 hourly perioperatively; in nephrogenic DI use thiazides, a low-solute diet, remove the offending drug and consider an NSAID only with specialist renal-risk assessment.</li>
                </ul>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="font-semibold text-foreground">SIADH</p>
                <ul className="mt-1 space-y-1 text-muted-foreground list-disc list-inside">
                  <li><strong>Causes</strong>: CNS pathology (subarachnoid haemorrhage, meningitis, TBI), lung disease (pneumonia, tuberculosis), small-cell lung cancer and other ectopic ADH, drugs (SSRIs, carbamazepine, cyclophosphamide, opioids, thiazides), pain, nausea and surgery itself.</li>
                  <li><strong>Features</strong>: <em>euvolaemic</em> hypotonic hyponatraemia with concentrated urine (urine osmolality &gt;100 mOsm/kg, urinary sodium &gt;30 mmol/L) and normal thyroid and adrenal function.</li>
                  <li><strong>Management</strong>: fluid restriction (usually 800–1000 mL/day) plus treatment of the cause; consider oral sodium/urea or a vasopressin-receptor antagonist if restriction fails. Severe symptomatic hyponatraemia (seizures, coma) — 100–150 mL of 3% saline boluses, limiting the rise to 8–10 mmol/L in 24 h to avoid osmotic demyelination <InlineRef topicId="endocrine-physiology" refLabel="Verbalis Hyponatraemia 2013" />.</li>
                  <li><strong>Differentiate from cerebral salt wasting</strong>: both hyponatraemic with natriuresis, but CSW patients are hypovolaemic and need salt and volume replacement, not restriction.</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm"><thead className="bg-secondary/40"><tr><th className="p-3 text-left">Feature</th><th className="p-3 text-left">SIADH</th><th className="p-3 text-left">Cerebral salt wasting</th></tr></thead><tbody className="divide-y divide-border text-muted-foreground"><tr><td className="p-3 font-medium text-foreground">Mechanism / volume</td><td className="p-3">ADH-mediated water retention; clinically euvolaemic.</td><td className="p-3">Renal sodium loss, often after SAH; hypovolaemic.</td></tr><tr><td className="p-3 font-medium text-foreground">Urine</td><td className="p-3">Osmolality &gt;100 mOsm/kg and sodium &gt;30 mmol/L.</td><td className="p-3">High output and high sodium, with dehydration or rising haematocrit.</td></tr><tr><td className="p-3 font-medium text-foreground">Treatment</td><td className="p-3">Treat cause; fluid restriction, with urea/demeclocycline or selected vaptan use under specialist supervision.</td><td className="p-3">Replace volume and sodium with isotonic or hypertonic saline; consider fludrocortisone.</td></tr></tbody></table>
              <p className="p-3 text-xs text-muted-foreground">The urine results overlap: serial volume assessment and response to treatment determine the diagnosis. Fluid restriction can worsen CSW <InlineRef topicId="endocrine-physiology" refLabel="Verbalis Hyponatraemia 2013" />.</p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="steroid-cover" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["CR_BK_07"]}>
            <CollapsibleSubsection title="Perioperative Steroid Cover">
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">Aim to match, not exceed, the physiological cortisol response — normal output is ~5–10 mg/m²/day of cortisol, rising to 75–150 mg/day after major surgery. Continue the patient's usual glucocorticoid and add supplementation according to risk and surgical stress <InlineRef topicId="endocrine-physiology" refLabel="AAGBI Steroid Cover" />.</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2"><strong>Risk stratification</strong></p>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside mb-3">
                <li><strong>Assume adrenal suppression</strong>: prednisolone ≥5 mg/day (or equivalent) for &gt;4 weeks, any dose of long-term steroid within the past 3 months, known primary/secondary adrenal insufficiency, or high-dose inhaled/topical/intra-articular steroid exposure.</li>
                <li><strong>Unlikely to be suppressed</strong>: &lt;5 mg/day prednisolone, or any dose for less than 3 weeks — usual dose alone is sufficient.</li>
                <li><strong>Uncertain</strong>: consider a short Synacthen test if surgery is elective and time allows; otherwise treat as suppressed.</li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed mb-2"><strong>Matching cover to surgical stress</strong> — minor = short, superficial or day-case procedures under local/brief general anaesthesia (e.g. hernia repair, cataract); moderate = intra-abdominal, joint replacement or laparoscopic surgery of 1–2 hours; major = prolonged, cardiothoracic, major bowel, obstetric or emergency surgery and critical illness.</p>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside"><li><strong>Minor:</strong> take the usual morning dose — this is often sufficient; hydrocortisone 25 mg IV at induction if in doubt or the patient is fasted.</li><li><strong>Moderate:</strong> usual dose, hydrocortisone 25–50 mg at induction, then 100 mg over 24 h for 24–48 h.</li><li><strong>Major:</strong> usual dose, hydrocortisone 100 mg at induction, then 200 mg per 24 h by infusion for 48–72 h.</li></ul>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc list-inside">
                <li><strong>Avoid routine high-dose regimens</strong> — supraphysiological steroid worsens hyperglycaemia, wound healing and infection risk without benefit.</li>
                <li><strong>Postoperatively</strong>: continue supplementation until oral intake and normal physiology resume, then halve the daily dose each day back to the baseline oral regimen; double the usual oral dose for 24–48 h after discharge-level stress or intercurrent illness (sick-day rules), and issue a steroid emergency card.</li>
                <li><strong>Watch for addisonian crisis</strong>: unexplained hypotension unresponsive to fluid and vasopressors, tachycardia, nausea and vomiting, abdominal pain, hypoglycaemia, hyponatraemia with hyperkalaemia, confusion or fever. Treat immediately with hydrocortisone 100 mg IV, 0.9% saline and glucose — do not wait for cortisol results.</li>
              </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="stress-response" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_07"]}>
            <CollapsibleSubsection title="Surgical Stress Response">
            <p className="text-muted-foreground leading-relaxed">
              Surgical injury activates the HPA axis and sympathetic nervous system. Key features: ↑ cortisol,
              catecholamines, ADH, aldosterone, glucagon, GH, IL-6/TNF-α. Results in: hyperglycaemia, sodium/water
              retention, protein catabolism, immunosuppression.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3">
              Cuthbertson described two phases <InlineRef topicId="endocrine-physiology" refLabel="Finnerty Stress Response 2013" />:
            </p>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Ebb phase</strong> (first 24–48 h): hypovolaemia, reduced cardiac output and oxygen consumption, hypothermia and a fall in metabolic rate — a resuscitation-dependent survival phase.</li>
              <li><strong>Flow phase</strong> (days to weeks): hypermetabolism with raised cardiac output and oxygen consumption, catabolism of muscle protein and fat, followed by an anabolic recovery phase once the insult resolves.</li>
              <li><strong>Mediators beyond cortisol</strong>: catecholamines (adrenaline, noradrenaline) drive glycogenolysis and lipolysis; glucagon and growth hormone add to gluconeogenesis; cytokines IL-1, IL-6 and TNF-α trigger the acute-phase response; ADH and aldosterone retain sodium and water.</li>
              <li><strong>Metabolic consequences</strong>: insulin resistance and stress hyperglycaemia, protein catabolism with negative nitrogen balance (urinary nitrogen loss up to 15–20 g/day after major surgery), lipolysis, sodium and water retention with a fall in urine output, and hypokalaemia.</li>
              <li><strong>Systemic effects</strong>: fever, leucocytosis, thrombocytosis, hepatic acute-phase protein synthesis (CRP, fibrinogen, ferritin) with reduced albumin and transferrin, and transient immunosuppression.</li>
              <li><strong>Attenuation</strong>: neuraxial blockade (most effective — an epidural to T4 for lower-body surgery blocks the afferent limb), effective opioid analgesia and regional techniques, minimally invasive/laparoscopic surgery, avoidance of hypothermia, early enteral feeding and carbohydrate loading, and the wider ERAS bundle.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamPitfallsCallout
            pitfalls={[
              <><strong>Steroid cover</strong>: any patient on ≥5 mg prednisolone for ≥3 weeks within the last year is at risk of adrenal suppression — give hydrocortisone supplementation matched to surgical severity.</>,
              <><strong>Phaeochromocytoma</strong>: α-block first (phenoxybenzamine/doxazosin) THEN β-block — reverse sequence precipitates hypertensive crisis.</>,
              <><strong>Thyroid storm</strong>: postoperative tachycardia + fever + agitation. Treat with β-blockade, propylthiouracil, iodine (≥1 h after PTU), steroids, cooling.</>,
              <><strong>Diabetic patient</strong>: variable-rate insulin infusion only if &gt;1 missed meal; otherwise omit short-acting + half long-acting on day of surgery and check CBG hourly.</>,
              <><strong>SIADH vs cerebral salt wasting</strong>: both hyponatraemic but volume status differs (euvolaemic vs hypovolaemic) — gets the fluid plan right.</>,
            ]}
          />
          <TopicFaqs faqs={endocrinePhysiologyFaqs} />

        </>
      }
    />
  );
};

export default EndocrinePhysiologyTopic;
