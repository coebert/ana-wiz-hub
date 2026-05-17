import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";
import { WorkedExample } from "@/components/WorkedExamples";
import { endocrinePhysiologyQuestions } from "@/data/quizzes";
import HPAAxisDiagram from "@/components/diagrams/HPAAxisDiagram";
import { Exam } from "@/data/curriculum";

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

          <ExamSection id="hp-axis" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_07"]}>
            <CollapsibleSubsection title="Hypothalamic-Pituitary Axis">
            <p className="text-muted-foreground leading-relaxed mb-3">
              The hypothalamus controls the anterior pituitary via releasing/inhibiting hormones through the
              hypothalamic-hypophyseal portal system. The posterior pituitary stores and releases ADH and oxytocin
              (synthesised in supraoptic and paraventricular hypothalamic nuclei).
            </p>
            <div className="overflow-x-auto">
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="hpa-axis" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_07"]}>
            <CollapsibleSubsection title="HPA Axis">
            <p className="text-muted-foreground leading-relaxed mb-3">
              The hypothalamic-pituitary-adrenal axis governs cortisol secretion through a three-tier cascade with both
              short- and long-loop negative feedback. Use the interactive diagram below to see how surgical stress,
              exogenous steroids and adrenal/pituitary failure remodel the cascade.
            </p>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <HPAAxisDiagram />
            </div>
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="stress-response" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_07"]}>
            <CollapsibleSubsection title="Surgical Stress Response">
            <p className="text-muted-foreground leading-relaxed">
              Surgical injury activates the HPA axis and sympathetic nervous system. Key features: ↑ cortisol,
              catecholamines, ADH, aldosterone, glucagon, GH, IL-6/TNF-α. Results in: hyperglycaemia, sodium/water
              retention, protein catabolism, immunosuppression. Attenuated by: regional anaesthesia (neuraxial blocks
              best), opioids, minimally invasive surgery, ERAS protocols.
            </p>
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
        </>
      }
    />
  );
};

export default EndocrinePhysiologyTopic;
