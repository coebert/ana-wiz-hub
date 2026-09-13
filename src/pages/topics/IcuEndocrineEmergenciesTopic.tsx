import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import { icuEndocrineEmergenciesQuestions } from "@/data/quizzes";
import DKAAnimation from "@/components/diagrams/intensive-care/DKAAnimation";
import ThyroidStormAnimation from "@/components/diagrams/intensive-care/ThyroidStormAnimation";
import AdrenalCrisisAnimation from "@/components/diagrams/intensive-care/AdrenalCrisisAnimation";
import DKAvsHHSDiagram from "@/components/diagrams/intensive-care/DKAvsHHSDiagram";
import EndocrineEmergencyAlgorithms from "@/components/diagrams/intensive-care/EndocrineEmergencyAlgorithms";
import EndocrineEmergencyDrugs from "@/components/diagrams/intensive-care/EndocrineEmergencyDrugs";
import EndocrineSymptomTriage from "@/components/diagrams/intensive-care/EndocrineSymptomTriage";
import GuidelineSources, { type GuidelineSource } from "@/components/references/GuidelineSources";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";

// Section-specific guideline references (BJA Education + primary guidelines)
const HYPERGLYCAEMIC_SOURCES: GuidelineSource[] = [
  { label: "JBDS-IP — DKA in adults (2023)", url: "https://abcd.care/sites/default/files/site_uploads/JBDS_Guidelines_Current/JBDS_02_DKA_Guideline_with_QR_code_March_2023.pdf", detail: "Joint British Diabetes Societies fixed-rate insulin protocol, K⁺ replacement and resolution criteria." },
  { label: "JBDS-IP — HHS in adults (2022)", url: "https://abcd.care/sites/default/files/site_uploads/JBDS_Guidelines_Current/JBDS_06_The_Management_of_the_Hyperosmolar_Hyperglycaemic_State_HHS_in_Adults_FINAL_0.pdf", detail: "HHS diagnosis (osmolality > 320, glucose > 30, pH > 7.30), fluid-first strategy, low-rate insulin." },
  { label: "BJA Educ — DKA & HHS perioperative", url: "https://www.bjaed.org/article/S2058-5349(22)00076-1/fulltext", detail: "Perioperative recognition and management of hyperglycaemic emergencies." },
  { label: "NICE NG28 — Type 2 diabetes", url: "https://www.nice.org.uk/guidance/ng28", detail: "SGLT2 inhibitor cessation and euglycaemic DKA risk." },
];

const THYROID_SOURCES: GuidelineSource[] = [
  { label: "ATA 2016 — Hyperthyroidism guideline", url: "https://www.thyroid.org/wp-content/uploads/publications/guidelines/2016/ATA-2016-Hyperthyroidism-Guidelines.pdf", detail: "American Thyroid Association management of thyroid storm — 5-step block & support." },
  { label: "Burch & Wartofsky 1993", url: "https://pubmed.ncbi.nlm.nih.gov/8325286/", detail: "Original Burch-Wartofsky Point Scale for thyroid storm severity." },
  { label: "BJA Educ — Thyroid disease & anaesthesia", url: "https://www.bjaed.org/article/S2058-5349(20)30005-X/fulltext", detail: "Perioperative thyroid emergencies including storm and myxoedema coma." },
  { label: "Endocrine Society — Myxoedema coma review", url: "https://academic.oup.com/jcem/article/99/8/2745/2538045", detail: "Diagnosis and IV T3/T4 + hydrocortisone management of myxoedema coma." },
];

const ADRENAL_PITUITARY_SOURCES: GuidelineSource[] = [
  { label: "Bornstein 2016 — Endocrine Society Addison's", url: "https://academic.oup.com/jcem/article/101/2/364/2810222", detail: "Diagnosis and treatment of primary adrenal insufficiency including crisis (hydrocortisone 100 mg IV)." },
  { label: "BJA Educ — Adrenal disease & anaesthesia", url: "https://www.bjaed.org/article/S2058-5349(17)30068-9/fulltext", detail: "Perioperative steroid cover and management of adrenal crisis." },
  { label: "AAGBI 2020 — Perioperative steroid cover", url: "https://associationofanaesthetists-publications.onlinelibrary.wiley.com/doi/10.1111/anae.14963", detail: "Stress-dose steroids for surgery in HPA-suppressed patients." },
  { label: "BJA Educ — Phaeochromocytoma", url: "https://www.bjaed.org/article/S2058-5349(16)30139-4/fulltext", detail: "α-blockade first; never β-blocker alone." },
  { label: "Society for Endocrinology — Pituitary apoplexy", url: "https://www.endocrinology.org/clinical-practice/clinical-guidance/uk-guidelines-for-the-management-of-pituitary-apoplexy/", detail: "UK guideline — hydrocortisone before thyroxine, urgent neurosurgical referral." },
];

const PITFALLS_SOURCES: GuidelineSource[] = [
  { label: "BJA Educ — Etomidate & adrenal suppression", url: "https://www.bjaed.org/article/S2058-5349(17)30068-9/fulltext", detail: "Single dose suppresses 11β-hydroxylase ~24 h." },
  { label: "MHRA — SGLT2 inhibitors & DKA", url: "https://www.gov.uk/drug-safety-update/sglt2-inhibitors-monitor-ketones-in-blood-during-treatment-interruption-for-surgical-procedures-or-acute-serious-medical-illness", detail: "Stop ≥ 3 days pre-op; monitor ketones — euglycaemic DKA risk." },
  { label: "BJA Educ — Vasopressors in shock", url: "https://www.bjaed.org/article/S2058-5349(19)30075-1/fulltext", detail: "Differential for catecholamine-resistant shock including adrenal insufficiency." },
];

const icuEndocrineEmergenciesFaqs: Array<[string, string]> = [
  ["How is diabetic ketoacidosis managed in the first hour?", "0.9% saline 500–1000 mL bolus, fixed-rate insulin 0.1 U/kg/h, replace K⁺ once <5.5 mmol/L (do not start insulin if K⁺ <3.3 mmol/L), and check ketones, glucose and bicarbonate hourly (JBDS 2021)."],
  ["What distinguishes HHS from DKA and how does management differ?", "HHS: glucose >30, osmolality >320, minimal ketones, no acidosis, profound dehydration (often 8–10 L deficit); fluid resuscitation is the priority — insulin only when glucose stops falling with fluids alone, at lower rates (0.05 U/kg/h) to prevent osmotic shifts."],
  ["How is myxoedema coma treated?", "IV levothyroxine 200–400 µg load then 50–100 µg daily (or T3 if available), IV hydrocortisone 100 mg 8-hourly until adrenal insufficiency excluded, passive rewarming, treat precipitants and avoid sedatives."],
];

const objectives = [
  "Recognise and treat diabetic ketoacidosis using the JBDS-IP fixed-rate insulin protocol, including the potassium paradox",
  "Differentiate hyperosmolar hyperglycaemic state (HHS) from DKA and adapt resuscitation accordingly",
  "Diagnose thyroid storm using the Burch-Wartofsky scale and apply the five-step block-and-support treatment",
  "Recognise adrenal (Addisonian) crisis as refractory shock with low Na⁺ / high K⁺ / low glucose, and treat with hydrocortisone before tests",
  "Outline the recognition and emergency management of myxoedema coma, phaeochromocytoma crisis and pituitary apoplexy",
];

const workedExamples: WorkedExample[] = [
  {
    title: "DKA — first-hour resuscitation (JBDS-IP)",
    scenario: (
      <>
        A 24-year-old with T1DM is brought to ED with vomiting, abdominal pain
        and Kussmaul breathing after a 48-h gastroenteritis. HR 128, BP 92/58,
        GCS 14. <strong>Glucose 32 mmol/L · ketones 5.8 · pH 7.08 · HCO₃⁻ 6 ·
        K⁺ 5.6 · Na⁺ 132</strong>. Weight 70 kg.
      </>
    ),
    working: (
      <ul className="list-disc list-inside space-y-1">
        <li>Diagnostic triad met: glucose &gt; 11, ketones ≥ 3, pH &lt; 7.30 → severe DKA (pH &lt; 7.10 or HCO₃⁻ &lt; 5 or K⁺ &lt; 3.5 → HDU/ICU).</li>
        <li>Hour 1: <strong>0.9% NaCl 1 L over 1 h</strong>. Start <strong>fixed-rate insulin 0.1 U/kg/h = 7 U/h</strong> as soon as fluid running. Continue patient's long-acting insulin.</li>
        <li>K⁺ 5.6 → no KCl in first bag. Once K⁺ 3.5–5.5 → add 40 mmol KCl/L. K⁺ &lt; 3.5 → halt insulin until replaced.</li>
        <li>Switch to <strong>10% dextrose at 125 ml/h</strong> when glucose &lt; 14 (run alongside saline) — keeps insulin running until ketones clear.</li>
        <li>Aim ketones falling ≥ 0.5/h (or HCO₃⁻ rising ≥ 3/h, or glucose falling ≥ 3/h). If not met: increase fixed-rate by 1 U/h.</li>
        <li>Resolution: ketones &lt; 0.6 + venous pH &gt; 7.30 + HCO₃⁻ &gt; 18.</li>
      </ul>
    ),
    answer: (
      <>
        Severe DKA. Activate fixed-rate insulin 7 U/h after 1 L 0.9% NaCl.
        Withhold KCl until next bag. Continue long-acting insulin. Add 10% dextrose
        when glucose &lt; 14. Daily K⁺/PO₄/Mg, hourly glucose, 2-hourly ketones
        until resolution.
      </>
    ),
   cites: ["ATA Thyroid Storm"],
  },
  {
    title: "Thyroid storm — applying the Burch-Wartofsky scale",
    scenario: (
      <>
        A 34-year-old with poorly controlled Graves' disease presents 36 h after
        an emergency appendicectomy with T 40.2 °C, HR 158 (AF), agitation, mild
        jaundice and diarrhoea. TSH undetectable, free T4 markedly raised.
      </>
    ),
    working: (
      <ul className="list-disc list-inside space-y-1">
        <li>BWPS components: T 40.2 = 25 · agitation = 20 · diarrhoea/jaundice = 20 · AF = 10 · HR 158 = 25 · precipitating event = 10 → <strong>~ 110 → highly suggestive of storm</strong>.</li>
        <li><strong>Step 1 — β-blockade</strong>: propranolol 1 mg IV titrated, or esmolol infusion (also blocks T₄→T₃).</li>
        <li><strong>Step 2 — block synthesis</strong>: PTU 500–1000 mg PO/NG load then 250 mg q4h (PTU preferred — also blocks peripheral conversion).</li>
        <li><strong>Step 3 — block release</strong>: Lugol's iodine 5 drops PO q6h <em>≥ 1 h after PTU</em> (otherwise iodine fuels storm).</li>
        <li><strong>Step 4 — steroid</strong>: hydrocortisone 100 mg IV q8h (blocks conversion + treats relative adrenal insufficiency).</li>
        <li><strong>Step 5 — supportive</strong>: paracetamol + active cooling (avoid aspirin), fluids, treat surgical/septic precipitant. Plasmapheresis if refractory.</li>
      </ul>
    ),
    answer: (
      <>
        BWPS &gt; 45 → thyroid storm. Treat in this order: β-blocker → PTU →
        Lugol's iodine (≥ 1 h later) → hydrocortisone → cooling/fluids/treat
        precipitant. Mortality 10–30 % even with treatment.
      </>
    ),
   cites: ["ES Adrenal Crisis 2016"],
  },
  {
    title: "Adrenal crisis — refractory shock under anaesthesia",
    scenario: (
      <>
        A 45-year-old on 10 mg prednisolone for 3 years (Crohn's) has emergency
        laparotomy. Intra-op: persistent MAP 50 mmHg despite 2 L crystalloid
        and noradrenaline 0.4 mcg/kg/min. Post-op blood gas:{" "}
        <strong>Na⁺ 128 · K⁺ 5.9 · glucose 3.1 · BE −7</strong>.
      </>
    ),
    working: (
      <ul className="list-disc list-inside space-y-1">
        <li>Vasopressor-resistant shock + classic biochemistry (low Na⁺, high K⁺, low glucose) in a chronic steroid user → adrenal crisis until proven otherwise.</li>
        <li>Take paired random cortisol + ACTH if possible — but <strong>do not delay treatment</strong>.</li>
        <li><strong>Hydrocortisone 100 mg IV stat</strong>, then 200 mg/24 h (50 mg q6h or infusion).</li>
        <li><strong>1 L 0.9% NaCl over 1 h</strong>; correct glucose with 10% dextrose if &lt; 4.</li>
        <li>Treat trigger (surgical stress + chronic HPA suppression). Convert to oral hydrocortisone once stable, add fludrocortisone when oral dose &lt; 50 mg/day.</li>
        <li>Sick-day rules going forward: triple oral dose for 24–48 h around stress; IV cover for any major surgery / vomiting.</li>
      </ul>
    ),
    answer: (
      <>
        Adrenal crisis from chronic steroid HPA suppression. Hydrocortisone
        100 mg IV stat + 200 mg/24 h + 0.9% NaCl 1 L/h + glucose. High-dose
        hydrocortisone has full mineralocorticoid effect — fludrocortisone not
        needed acutely.
      </>
    ),
   cites: ["JBDS-IP DKA 2023"],
  },
];

const IcuEndocrineEmergenciesTopic = () => {
  return (
    <TopicTemplate
      title="Endocrine Emergencies in ICU"
      subtitle="FRCA Final / FFICM / EDIC — DKA, HHS, thyroid storm, adrenal crisis, myxoedema coma, phaeo crisis, pituitary apoplexy"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      topicId="icu-endocrine-emergencies"
      topicTitle="Endocrine Emergencies in ICU"
      quizQuestions={icuEndocrineEmergenciesQuestions}
      workedExamples={workedExamples}
      keyPoints={[
        { text: "DKA diagnostic triad (JBDS-IP): glucose > 11 (or known DM) + ketones ≥ 3 (or 2+ on dipstick) + pH < 7.30 / HCO₃⁻ < 15", cites: ["JBDS-IP DKA 2023"] },
        { text: "DKA potassium paradox: serum K⁺ often normal/high at presentation despite massive total-body deficit — falls fast on insulin; replace K⁺ when 3.5–5.5, halt insulin if K⁺ < 3.5", cites: ["JBDS-IP HHS 2022"] },
        { text: "HHS: glucose > 30 + osmolality > 320 + minimal ketones — give fluids FIRST (insulin only after fluids running, lower rate 0.05 U/kg/h) to avoid cerebral oedema and pontine myelinolysis", cites: ["BJA Educ Endo 2014"] },
        { text: "Thyroid storm (BWPS ≥ 45): treat in order — β-blocker → PTU → Lugol's iodine (≥ 1 h after PTU) → hydrocortisone → cooling. Avoid aspirin (displaces T₄ from TBG)", cites: ["ATA Thyroid Storm"] },
        { text: "Adrenal crisis: refractory shock + low Na⁺ / high K⁺ / low glucose → hydrocortisone 100 mg IV stat BEFORE tests; high-dose hydrocortisone has full mineralocorticoid effect", cites: ["ES Adrenal Crisis 2016", "SfE Adrenal Crisis 2020"] },
        { text: "Myxoedema coma: hypothermia + hyponatraemia + hypoventilation + obtundation — IV T3/T4 + IV hydrocortisone (cover concurrent adrenal insufficiency) + passive rewarming + ICU ventilation", cites: ["JBDS-IP DKA 2023"] },
        { text: "Phaeochromocytoma crisis: phenoxybenzamine / phentolamine / IV magnesium FIRST (α-blockade) then β-blockade — never β-blocker alone (unopposed α → hypertensive crisis, pulmonary oedema)", cites: ["JBDS-IP HHS 2022"] },
        { text: "DKA: do not give routine phosphate or bicarbonate — replace phosphate only below 0.3 mmol/L or with muscle/cardiac dysfunction; reserve bicarbonate for pH < 6.9 with collapse", cites: ["JBDS-IP DKA 2023 PDF"] },
        { text: "Pituitary apoplexy: sudden headache + visual loss + ophthalmoplegia + hypopituitarism → hydrocortisone 100 mg IV + urgent neurosurgical referral; replace cortisol BEFORE thyroxine", cites: ["BJA Educ Endo 2014", "UK Pituitary Apoplexy 2011"] },
      ]}
      sectionSources={{
        objectives: ["JBDS-IP DKA 2023", "JBDS-IP HHS 2022", "Endocrine Society 2016"],
        workedExamples: ["JBDS-IP DKA 2023", "Burch-Wartofsky 1993", "Bornstein 2016", "ATA Thyroid Storm", "ES Adrenal Crisis 2016"],
        keyPoints: ["JBDS-IP", "BJA Educ", "Endocrine Society", "JBDS-IP DKA 2023", "JBDS-IP HHS 2022", "BJA Educ Endo 2014", "ATA Thyroid Storm", "ES Adrenal Crisis 2016"],
      }}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
      }}
      coreConcepts={
        <>
        <>
          <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Hyperglycaemic emergencies — DKA & HHS" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Two ends of the same spectrum: insulin deficiency drives counter-regulatory
              hormone release, hyperglycaemia, osmotic diuresis and dehydration. DKA
              additionally has unrestrained lipolysis → ketogenesis → high-anion-gap
              acidosis. HHS retains enough insulin to suppress ketogenesis but produces
              extreme hyperglycaemia and hyperosmolality over days. Always look for the
              precipitant: infection, missed insulin, MI, CVA, steroids, SGLT2 inhibitors
              (euglycaemic DKA — glucose may be normal).
            </p>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-4">
              <EndocrineSymptomTriage />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Severity criteria — DKA (JBDS-IP)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Severe / HDU referral if any of: pH &lt; 7.10, HCO₃⁻ &lt; 5, K⁺ &lt; 3.5
                  on admission, GCS &lt; 12, SpO₂ &lt; 92% on air, SBP &lt; 90, HR &gt; 100
                  or &lt; 60, anion gap &gt; 16, ketones &gt; 6.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">HHS — distinguishing features</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Osmolality &gt; 320 (= 2[Na⁺] + glucose + urea), pH &gt; 7.30, ketones
                  &lt; 3, glucose &gt; 30. Fluid deficit 100–220 ml/kg. Aim glucose fall
                  ≤ 5 mmol/L/h, Na⁺ change ≤ 10 mmol/L/24 h. Always give VTE prophylaxis.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-lg border border-border mt-4">
              <p className="font-semibold text-foreground text-sm">
                HHS — managing the hypernatraemia and hyperosmolality (JBDS-IP 2022)
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-2">
                <li>
                  <strong>Resuscitate with 0.9% sodium chloride</strong> — 1 L over the first hour, then
                  0.5–1 L/h titrated to haemodynamics; expect 3–6 L positive by 12 h and total replacement
                  of the 100–220 ml/kg deficit over 24–48 h. Fluid alone lowers glucose and osmolality; the
                  serum sodium will often <em>rise</em> initially as glucose falls, and this is expected.
                </li>
                <li>
                  <strong>Corrected (osmolality-adjusted) sodium</strong> = measured Na⁺ + 0.4 ×
                  (glucose − 5.5) mmol/L. Track this alongside calculated osmolality hourly, and plot the
                  trend rather than reacting to a single value.
                </li>
                <li>
                  <strong>Switch to 0.45% sodium chloride</strong> if the corrected sodium is rising, or
                  remains high, while osmolality is not falling despite an adequate rate of 0.9% saline and
                  a positive fluid balance — 0.45% saline delivers the free water needed to correct the
                  hyperosmolar state once the patient is haemodynamically stable.
                </li>
                <li>
                  <strong>Rate limits:</strong> do not change sodium by &gt; 10 mmol/L in any 24 h, keep the
                  fall in osmolality to 3–8 mosmol/kg/h and the fall in glucose ≤ 5 mmol/L/h. Rapid
                  correction risks cerebral oedema and osmotic demyelination (central pontine
                  myelinolysis).
                </li>
                <li>
                  <strong>Insulin only once fluids are running</strong> — start fixed-rate 0.05 units/kg/h
                  when glucose stops falling with fluid alone (or immediately if significant ketonaemia).
                  Starting insulin early accelerates the intracellular shift of water, sodium and
                  potassium, and worsens cardiovascular collapse.
                </li>
                <li>
                  Add 10% glucose alongside saline once glucose reaches 10–15 mmol/L, replace potassium as
                  in DKA, monitor for foot ulceration, and give full-dose LMWH prophylaxis for the duration
                  of admission (very high thrombotic risk).
                </li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border mt-4">
              <p className="font-semibold text-foreground text-sm">
                DKA — phosphate and bicarbonate (JBDS-IP 2023)
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-2">
                <li>
                  <strong>Phosphate:</strong> total-body phosphate is depleted by osmotic diuresis, and serum
                  phosphate falls further once insulin drives it intracellularly. JBDS-IP advises{" "}
                  <strong>against routine replacement</strong> — trials show no benefit for acidosis
                  resolution, morbidity or mortality, and over-replacement causes hypocalcaemia and
                  hypomagnesaemia. Replace only if phosphate is &lt; 0.3 mmol/L or there is respiratory or
                  skeletal muscle weakness, cardiac dysfunction, haemolysis or unexplained failure to wean,
                  giving 9–18 mmol IV over 6–12 h with paired calcium and magnesium monitoring. Check
                  phosphate at least daily in prolonged or severe DKA, particularly when feeding is started
                  (refeeding risk).
                </li>
                <li>
                  <strong>Bicarbonate:</strong> <strong>not recommended</strong>. Insulin plus fluid
                  resuscitation halts ketogenesis and corrects the acidosis; giving bicarbonate risks
                  paradoxical CSF acidosis and cerebral oedema (especially in children and young adults),
                  a left shift of the oxyhaemoglobin curve, worsened hypokalaemia, sodium and volume
                  loading, rebound alkalosis and delayed ketone clearance. Reserve discussion of
                  bicarbonate for extreme acidaemia (pH &lt; 6.9) with cardiovascular collapse, as a
                  consultant-level decision alongside critical care — and remember that a persisting
                  acidosis with clearing ketones is usually a hyperchloraemic acidosis from saline
                  resuscitation, which needs no treatment.
                </li>
              </ul>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4">

              <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                <DKAAnimation />
              </div>
              <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                <DKAvsHHSDiagram />
              </div>
            </div>
            <GuidelineSources sources={HYPERGLYCAEMIC_SOURCES} />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Thyroid emergencies">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Thyroid storm (mortality 10–30 %)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Decompensation of underlying hyperthyroidism by surgery, sepsis, DKA,
                  iodinated contrast or drug withdrawal. <strong>Burch-Wartofsky ≥ 45</strong>{" "}
                  highly suggestive. Treat in five steps: β-blockade → PTU → iodine
                  (≥ 1 h later) → hydrocortisone → support (cooling, fluids, treat trigger).
                  Avoid aspirin.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Myxoedema coma (mortality 30–40 %)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Severe hypothyroid decompensation: <strong>hypothermia, hypoventilation,
                  hyponatraemia, bradycardia, obtunded</strong>. Treat with IV T3 (10–20 mcg
                  bolus then 10 mcg q4h) or IV T4, plus IV hydrocortisone 100 mg q8h
                  (always cover potential adrenal insufficiency), passive rewarming,
                  ventilation as needed. Endocrinology referral.
                </p>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mt-4">
              <ThyroidStormAnimation />
            </div>
            <GuidelineSources sources={THYROID_SOURCES} />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Adrenal & pituitary emergencies">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Adrenal (Addisonian) crisis</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Acute decompensation of primary (Addison's, autoimmune, bilateral
                  adrenal haemorrhage — Waterhouse-Friderichsen) or secondary (HPA
                  suppression by chronic steroid, pituitary disease) insufficiency.
                  Refractory shock + Na⁺ ↓ + K⁺ ↑ + glucose ↓. Treat with{" "}
                  <strong>hydrocortisone 100 mg IV stat then 200 mg/24 h</strong> + 0.9% NaCl
                  + glucose; do not delay for tests.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Phaeochromocytoma crisis</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Catecholamine surge → severe hypertension, arrhythmia, MI, cerebral
                  haemorrhage, takotsubo. Manage with{" "}
                  <strong>α-blockade FIRST</strong> (phentolamine bolus, or
                  phenoxybenzamine 10 mg q6h titrated, or IV magnesium 2–4 g),{" "}
                  <em>then</em> β-blockade (esmolol). NEVER β-blocker alone — unopposed
                  α stimulation causes hypertensive crisis and pulmonary oedema. Avoid
                  ephedrine, ketamine, halothane, metoclopramide.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Pituitary apoplexy</p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Pathophysiology:</strong> haemorrhagic infarction of a pre-existing
                  pituitary adenoma (often previously undiagnosed) — the expanding gland outgrows its
                  tenuous portal blood supply within the confined sella, compressing the optic chiasm
                  above and the cavernous sinus laterally, and destroying the anterior pituitary.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Precipitants:</strong> often spontaneous, but consider dynamic pituitary
                  testing, head trauma, major surgery (especially cardiac surgery / cardiopulmonary
                  bypass), anticoagulation or thrombolysis, dopamine agonists or GnRH analogues, severe
                  hypertension, and pregnancy/postpartum haemorrhage (Sheehan&rsquo;s syndrome —
                  infarction of a physiologically enlarged gland).
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Clinical features:</strong> abrupt &lsquo;thunderclap&rsquo; headache
                  (retro-orbital or frontal) with vomiting; meningism and photophobia from blood in the
                  CSF; visual failure — <em>bitemporal hemianopia</em> or reduced acuity from chiasmal
                  compression; ophthalmoplegia from CN III (commonest — ptosis, dilated pupil), IV and
                  VI in the cavernous sinus; reduced consciousness. Acute
                  <strong> ACTH deficiency</strong> gives hypotension resistant to vasopressors,
                  hyponatraemia and hypoglycaemia; also hypothyroidism, and either SIADH or (less often)
                  diabetes insipidus with polyuria and rising sodium.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Differential:</strong> subarachnoid haemorrhage, bacterial meningitis,
                  cavernous sinus thrombosis, posterior circulation stroke, migraine, and
                  ophthalmoplegic causes such as posterior communicating artery aneurysm — CT is often
                  normal, so <strong>MRI pituitary is the investigation of choice</strong>.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Initial ICU management:</strong> ABC with airway protection if obtunded;{" "}
                  <strong>hydrocortisone 100 mg IV stat then 200 mg/24 h</strong> before any other
                  hormone (cortisol replacement is life-saving and is given empirically — take a random
                  cortisol first if it does not delay treatment); cautious isotonic fluid resuscitation
                  with vasopressors as required; treat hypoglycaemia and correct sodium slowly (≤ 10
                  mmol/L/24 h); full anterior pituitary profile (cortisol, ACTH, TFTs, prolactin, IGF-1,
                  LH/FSH, testosterone/oestradiol) plus hourly urine output and paired osmolalities for
                  diabetes insipidus; formal visual field and acuity assessment; and joint
                  endocrinology/neurosurgical/ophthalmology review. <strong>Urgent transsphenoidal
                  decompression</strong> is indicated for acute or deteriorating visual loss, declining
                  consciousness or progressive ophthalmoplegia; isolated ophthalmoplegia with intact
                  vision can often be managed conservatively. Replace cortisol{" "}
                  <strong>before thyroxine</strong> — thyroid hormone accelerates cortisol metabolism and
                  will precipitate adrenal crisis.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Water balance — DI and SIADH:</strong> posterior pituitary involvement or
                  post-decompression oedema can give either picture, and a triphasic response (transient DI
                  → SIADH at days 5–10 as stored ADH is released → permanent DI) is classic. Monitor hourly
                  urine output, 4–6 hourly serum sodium, and paired plasma/urine osmolality and urine
                  sodium. <em>Cranial DI</em> — urine output &gt; 3 mL/kg/h with dilute urine (osmolality
                  &lt; 300 mosmol/kg, specific gravity &lt; 1.005) and rising plasma sodium/osmolality:
                  match losses with enteral water or hypotonic IV fluid, and give desmopressin 0.5–1 µg
                  IV/SC titrated to urine output, correcting sodium by no more than 10 mmol/L/24 h.{" "}
                  <em>SIADH</em> — hyponatraemia with concentrated urine (osmolality &gt; 100 mosmol/kg,
                  urine sodium &gt; 30 mmol/L) in a euvolaemic patient: fluid restrict 800–1000 mL/day, and
                  use hypertonic saline only for seizures or severe symptomatic hyponatraemia. Never
                  diagnose SIADH before confirming adequate cortisol and thyroid replacement, since
                  hypocortisolaemia itself causes hyponatraemia.
                </p>

              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Surgical / sick-day steroid cover</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Patients on &gt; 5 mg prednisolone/day for &gt; 3 weeks risk HPA
                  suppression. Minor surgery: 25 mg hydrocortisone IV at induction, normal
                  oral dose post-op. Major surgery: 50–100 mg IV at induction + 200 mg/24 h
                  for 24–72 h. Sepsis / vomiting / unable to take oral: IV hydrocortisone
                  100 mg + 200 mg/24 h until eating.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Weaning and tapering:</strong> stress-dose hydrocortisone is reduced as the
                  physiological stress resolves, not stopped abruptly. After major surgery or critical
                  illness, halve the dose each day (e.g. 200 mg → 100 mg → 50 mg/24 h) until the patient
                  is back on their usual replacement or maintenance dose — typically over 48–72 h, longer
                  if there is ongoing sepsis, ileus or a further procedure. Patients on long-term
                  glucocorticoids resume their pre-admission oral dose (doubled for 24–48 h if still
                  unwell). Where steroids were started <em>de novo</em> for septic shock, stop or taper
                  hydrocortisone as vasopressors are weaned (abrupt cessation can cause rebound
                  hypotension). For prolonged supraphysiological courses, reduce to the equivalent of
                  7.5 mg prednisolone/day, then taper slowly (e.g. 1 mg every 2–4 weeks) with an early
                  09:00 cortisol or Synacthen test to confirm HPA recovery before final withdrawal.
                  Warn every patient about sick-day rules, issue a steroid emergency card and IM
                  hydrocortisone for home use, and never omit doses during vomiting or diarrhoea.
                </p>

              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mt-4">
              <AdrenalCrisisAnimation />
            </div>
            <GuidelineSources sources={ADRENAL_PITUITARY_SOURCES} />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Anaesthetic pitfalls">
            <div className="space-y-2">
              {[
                { topic: "Etomidate", detail: "Single induction dose suppresses 11β-hydroxylase for 24 h — avoid in septic / adrenally compromised patients; consider hydrocortisone cover if used." },
                { topic: "SGLT2 inhibitors", detail: "Stop ≥ 3 days pre-op (MHRA). Cause euglycaemic DKA — measure ketones in any unwell perioperative patient on these drugs even if glucose normal. See the dedicated euglycaemic DKA panel below." },
                { topic: "Iodinated contrast", detail: "Can precipitate thyroid storm in untreated hyperthyroidism, and contrast-induced thyrotoxicosis weeks later. Check TFTs in known thyroid disease before contrast." },
                { topic: "Vasopressor failure", detail: "MAP not responding to noradrenaline ≥ 0.4 mcg/kg/min in shock → think adrenal crisis (give hydrocortisone) and check cortisol; also consider vasopressin and methylene blue." },
                { topic: "Beta-blockers in phaeo", detail: "Never first-line. Even labetalol's α:β ratio (1:7 PO) is insufficient — use phentolamine or magnesium for crisis." },
              ].map((it) => (
                <div key={it.topic} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="font-semibold text-foreground text-sm">{it.topic}</p>
                  <p className="text-sm text-muted-foreground mt-1">{it.detail}</p>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                <EndocrineEmergencyAlgorithms />
              </div>
              <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                <EndocrineEmergencyDrugs />
              </div>
            </div>
            <div className="p-4 rounded-lg border border-border mt-4">
              <p className="font-semibold text-foreground text-sm">
                Euglycaemic DKA — the diagnosis that is missed
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Definition:</strong> significant ketoacidosis (capillary ketones ≥ 3.0 mmol/L or
                urine ketones ≥ 2+, with pH &lt; 7.30 and/or HCO₃⁻ &lt; 15) in a patient whose glucose is{" "}
                <strong>&lt; 14 mmol/L</strong> — and often entirely normal. Because the usual trigger for
                a DKA pathway (hyperglycaemia) is absent, the diagnosis is repeatedly delayed.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Mechanism:</strong> SGLT2 inhibition (dapagliflozin, empagliflozin, canagliflozin)
                causes glycosuria, lowering plasma glucose and insulin secretion while raising glucagon;
                the fall in the insulin:glucagon ratio drives lipolysis and hepatic ketogenesis, and
                ketone reabsorption is increased. Superimposed on fasting, surgery, sepsis, vomiting,
                dehydration, low-carbohydrate diet, alcohol excess or reduced insulin dose, ketoacidosis
                develops with a normal glucose. The same picture occurs in pregnancy, prolonged starvation
                and after bariatric surgery.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Who to test:</strong> measure blood ketones and a venous gas in{" "}
                <em>any</em> unwell, vomiting, tachypnoeic, acidotic or perioperative patient taking an
                SGLT2 inhibitor, regardless of glucose — and in any unexplained high-anion-gap metabolic
                acidosis. Stop the SGLT2 inhibitor at least 3 days before elective surgery (MHRA) and
                immediately on acute illness.
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Management:</strong> treat as DKA but give the carbohydrate first — stop the SGLT2
                inhibitor, start <strong>fixed-rate intravenous insulin 0.1 units/kg/h</strong> (insulin is
                needed to switch off ketogenesis) <strong>with concurrent 10% glucose</strong> at
                125 ml/h from the outset to prevent hypoglycaemia, plus 0.9% sodium chloride with
                potassium for volume and electrolyte replacement. Continue long-acting basal insulin.
                Track resolution by <strong>ketones and bicarbonate/pH, not glucose</strong> — aim ketone
                fall ≥ 0.5 mmol/L/h, HCO₃⁻ rise ≥ 3 mmol/L/h; only convert to variable-rate insulin once
                ketones &lt; 0.6 mmol/L and the acidosis has resolved. Ketosis may persist 24–48 h because
                the drug&rsquo;s effect outlasts the last dose.
              </p>
            </div>
            <GuidelineSources sources={PITFALLS_SOURCES} />
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "DKA: fluids first (1 L 0.9% saline over 1 h), then fixed-rate insulin 0.1 U/kg/h, replace K⁺ once <5.5, continue long-acting insulin.",
              "HHS: slower correction than DKA; high VTE risk — prophylactic anticoagulation; watch for cerebral oedema.",
              "Thyroid storm: propranolol, propylthiouracil, iodine (after PTU), hydrocortisone, supportive cooling — treat trigger.",
              "Addisonian crisis: hydrocortisone 100 mg IV stat then 200 mg/24 h, fluids, glucose; do not delay for cortisol assay.",
              "Phaeochromocytoma crisis: α-block first (phenoxybenzamine/phentolamine) before β-block — avoid β-blocker alone (unopposed α causes worsening hypertension).",
            ]}
          />
        </>
          <TopicFaqs faqs={icuEndocrineEmergenciesFaqs} />
        </>
      }
    />
  );
};

export default IcuEndocrineEmergenciesTopic;
