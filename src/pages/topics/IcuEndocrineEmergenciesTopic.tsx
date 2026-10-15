import { Link } from "react-router-dom";
import { AdrenalInsufficiencyResuscitationTeaching, SepsisSteroidDecisionsTeaching, DkaSafetyAndRecoveryTeaching } from "@/components/topic/EndocrineEmergenciesTeaching";
import { InlineRef } from "@/components/references/InlineRef";
import { HyponatraemiaCorrectionTeaching, PhaeochromocytomaPreparationTeaching, PhaeochromocytomaCrisisTeaching, DkaFluidChoiceTeaching, PituitaryApoplexyGuidelineTeaching } from "@/components/topic/EndocrineEmergenciesTeaching";
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
import { HyperglycaemicEmergenciesTeaching, ThyroidEmergenciesTeaching, AdrenalPituitaryEmergenciesTeaching, EndocrinePerioperativeTeaching } from "@/components/topic/EndocrineEmergenciesTeaching";

// Section-specific guideline references (BJA Education + primary guidelines)
const HYPERGLYCAEMIC_SOURCES: GuidelineSource[] = [
  { label: "JBDS-IP — DKA in adults (2023)", url: "https://abcd.care/sites/default/files/site_uploads/JBDS_Guidelines_Current/JBDS_02_DKA_Guideline_with_QR_code_March_2023.pdf", detail: "Joint British Diabetes Societies fixed-rate insulin protocol, K⁺ replacement and resolution criteria." },
  { label: "JBDS-IP — HHS in adults (2022)", url: "https://abcd.care/sites/default/files/site_uploads/JBDS_Guidelines_Current/JBDS_06_The_Management_of_the_Hyperosmolar_Hyperglycaemic_State_HHS_in_Adults_FINAL_0.pdf", detail: "HHS diagnosis (osmolality > 320, glucose > 30, pH > 7.30), fluid-first strategy, low-rate insulin." },
  { label: "BJA Educ — DKA & HHS perioperative", url: "https://www.bjaed.org/article/S2058-5349(22)00076-1/fulltext", detail: "Perioperative recognition and management of hyperglycaemic emergencies." },
  { label: "NICE NG28 — Type 2 diabetes", url: "https://www.nice.org.uk/guidance/ng28", detail: "General type 2 diabetes management; see the MHRA notice below for treatment interruption." },
];

const THYROID_SOURCES: GuidelineSource[] = [
  { label: "ATA 2016 — Hyperthyroidism guideline", url: "https://www.thyroid.org/wp-content/uploads/publications/guidelines/2016/ATA-2016-Hyperthyroidism-Guidelines.pdf", detail: "American Thyroid Association management of thyroid storm — 5-step block & support." },
  { label: "Burch & Wartofsky 1993", url: "https://pubmed.ncbi.nlm.nih.gov/8325286/", detail: "Original Burch-Wartofsky Point Scale for thyroid storm severity." },
  { label: "BJA Educ — Thyroid disease & anaesthesia", url: "https://www.bjaed.org/article/S2058-5349(20)30005-X/fulltext", detail: "Perioperative thyroid emergencies including storm and myxoedema coma." },
  { label: "ATA 2014 — Hypothyroidism guideline", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4267409/", detail: "Recommendations 21a–21d: IV levothyroxine, preceding glucocorticoids and clinical endpoints." },
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
  { label: "MHRA — SGLT2 inhibitors & DKA", url: "https://www.gov.uk/drug-safety-update/sglt2-inhibitors-monitor-ketones-in-blood-during-treatment-interruption-for-surgical-procedures-or-acute-serious-medical-illness", detail: "Interrupt during hospitalisation for major surgery/serious illness; monitor blood ketones. This notice does not specify an elective cessation interval." },
  { label: "BJA Educ — Vasopressors in shock", url: "https://www.bjaed.org/article/S2058-5349(19)30075-1/fulltext", detail: "Differential for catecholamine-resistant shock including adrenal insufficiency." },
];

const icuEndocrineEmergenciesFaqs: Array<[string, string]> = [
  ["How is diabetic ketoacidosis managed in the first hour?", "0.9% saline 500–1000 mL bolus, fixed-rate insulin 0.1 U/kg/h, replace K⁺ once <5.5 mmol/L (urgent senior review if K⁺ <3.5 mmol/L), and check ketones, glucose and bicarbonate hourly (JBDS 2023)."],
  ["What distinguishes HHS from DKA and how does management differ?", "HHS: glucose ≥30 mmol/L, osmolality ≥320 mOsm/kg, ketones ≤3.0 mmol/L, pH >7.3, bicarbonate ≥15 and marked hypovolaemia (losses 100–220 ml/kg); 0.9% saline is the priority — fixed-rate insulin at 0.05 U/kg/h once osmolality stops falling with fluids alone, unless there is significant ketonaemia (JBDS 2023)."],
  ["How is myxoedema coma treated?", "IV levothyroxine initially (ATA: 200–400 µg load, reduced for age, size and cardiac risk), subsequent weight-based replacement, preceded by IV glucocorticoid cover, passive rewarming, treat precipitants and avoid sedatives."],
];

const objectives = [
  "Recognise and treat diabetic ketoacidosis using the JBDS-IP fixed-rate insulin protocol, including the potassium paradox",
  "Distinguish emergency cortisol replacement from adjunctive steroids in septic shock, and apply current adult DKA safety guidance",
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
        <li>Diagnostic triad met: glucose &gt; 11, ketones ≥ 3, pH &lt; 7.30 → DKA with haemodynamic compromise; assess critical-care need (pH &lt; 7.0 or HCO₃⁻ &lt; 5 or K⁺ &lt; 3.5 → HDU/ICU).</li>
        <li>Hour 1: <strong>0.9% NaCl 1 L over 1 h</strong>. Start <strong>fixed-rate insulin 0.1 U/kg/h = 7 U/h</strong> as soon as fluid running. Continue patient's long-acting insulin.</li>
        <li>K⁺ 5.6 → no KCl in first bag. Once K⁺ 3.5–5.5 → add 40 mmol KCl/L. K⁺ &lt; 3.5 → halt insulin until replaced.</li>
        <li>Add <strong>10% dextrose at 125 ml/h</strong> when glucose &lt; 14 (run alongside saline) — keeps insulin running until ketones clear.</li>
        <li>Aim ketones falling ≥ 0.5/h (or HCO₃⁻ rising ≥ 3/h, or glucose falling ≥ 3/h). If not met: increase fixed-rate by 1 U/h.</li>
        <li>Resolution: ketones &lt; 0.6 and venous pH &gt; 7.30; do not require bicarbonate normalisation.</li>
      </ul>
    ),
    answer: (
      <>
        DKA with haemodynamic compromise. Activate fixed-rate insulin 7 U/h after 1 L 0.9% NaCl.
        Withhold KCl while potassium remains above 5.5; reassess before the next bag. Continue long-acting insulin. Add 10% dextrose
        when glucose &lt; 14. Frequent potassium checks, hourly glucose and ketones
        until resolution.
      </>
    ),
   cites: ["JBDS-IP DKA 2023 (ABCD)", "JBDS DKA resolution 2023"],
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
        <li>BWPS components: T 40.2 = 30 · agitation = 10 · jaundice = 20 · AF = 10 · HR 158 = 25 · precipitating event = 10 → <strong>105 → highly suggestive of storm</strong>.</li>
        <li><strong>Step 1 — β-blockade</strong>: after haemodynamic assessment, ATA propranolol 60–80 mg every 4 h (consider invasive monitoring in heart failure), or an esmolol infusion as the alternative. High-dose propranolol, not esmolol, reduces T₄→T₃ conversion.</li>
        <li><strong>Step 2 — block synthesis</strong>: PTU 500–1000 mg PO/NG load then 250 mg q4h (PTU preferred — also blocks peripheral conversion).</li>
        <li><strong>Step 3 — block release</strong>: potassium iodide (SSKI) 5 drops (0.25 mL) PO q6h, started <em>no sooner than 1 h after PTU</em>; Lugol's solution is the alternative.</li>
        <li><strong>Step 4 — steroid</strong>: ATA regimen hydrocortisone 300 mg IV load, then 100 mg IV q8h (blocks conversion + treats relative adrenal insufficiency).</li>
        <li><strong>Step 5 — supportive</strong>: paracetamol + cooling blankets, fluids, nutrition and respiratory support in ICU, treat surgical/septic precipitant. Plasmapheresis or emergency surgery have been used when response to standard therapy is poor.</li>
      </ul>
    ),
    answer: (
      <>
        BWPS &gt; 45 → thyroid storm. Treat in parallel with haemodynamically appropriate β-blockade, PTU,
        hydrocortisone and supportive care; give iodide at least one hour after the thionamide. Modern series report mortality of 8–25 %.
      </>
    ),
   cites: ["ATA 2016"],
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
        <li>Vasopressor-resistant shock + hyponatraemia and hypoglycaemia in a chronic steroid user; high K⁺ also needs investigation for AKI or another cause → adrenal crisis until proven otherwise.</li>
        <li>Take paired random cortisol + ACTH if possible — but <strong>do not delay treatment</strong>.</li>
        <li><strong>Hydrocortisone 100 mg IV stat</strong>, then 200 mg/24 h (50 mg q6h or infusion).</li>
        <li><strong>1 L isotonic saline within the first hour</strong>, then further IV fluid as required with monitoring for overload; treat hypoglycaemia using the local emergency protocol.</li>
        <li>Treat trigger (surgical stress + chronic HPA suppression). Taper with recovery under endocrine advice. In primary adrenal insufficiency, start fludrocortisone (100 micrograms daily) once hydrocortisone falls below 50 mg/24 h; it is not routinely needed in steroid-induced secondary insufficiency.</li>
        <li>Sick-day rules going forward: follow individual sick-day replacement advice; IV cover for any major surgery / vomiting.</li>
      </ul>
    ),
    answer: (
      <>
        Adrenal crisis from chronic steroid HPA suppression. Hydrocortisone
        100 mg IV stat, then 200 mg/24 h by infusion (or 50 mg every 6 h), with
        1 L isotonic saline in the first hour and correction of hypoglycaemia.
        Fludrocortisone is only started in primary insufficiency, once
        hydrocortisone falls below 50 mg/24 h.
      </>
    ),
   cites: ["SfE crisis hydrocortisone 2016", "SfE crisis fluids 2016", "SfE adrenal emergency 2016"],
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
        { text: "DKA potassium paradox: serum K⁺ often normal/high at presentation despite massive total-body deficit — falls fast on insulin; replace K⁺ when 3.5–5.5, urgent senior review and additional potassium if K⁺ <3.5", cites: ["JBDS DKA potassium 2023"] },
        { text: "HHS: marked hyperglycaemia/hyperosmolality with minimal ketosis; in non-ketotic HHS start insulin 0.05 U/kg/h after adequate fluid replacement when glucose plateaus to avoid cerebral oedema and pontine myelinolysis", cites: ["JBDS HHS sodium 2023"] },
        { text: "Thyroid storm (BWPS ≥45): multimodal treatment in parallel; assess cardiac function before β-blockade, and give iodide ≥1 h after thionamide", cites: ["ATA 2016"] },
        { text: "Adrenal crisis: refractory shock + low Na⁺ / high K⁺ / low glucose → hydrocortisone 100 mg IV/IM stat then 200 mg/24 h, without waiting for tests; fludrocortisone only in primary insufficiency once hydrocortisone is below 50 mg/24 h", cites: ["SfE crisis hydrocortisone 2016", "SfE crisis immediate treatment 2016", "SfE adrenal emergency 2016"] },
        { text: "Myxoedema coma: hypothermia + hyponatraemia + hypoventilation + obtundation — IV glucocorticoid cover before initial IV levothyroxine; selected T3 adjunct under endocrine advice + passive rewarming + ICU ventilation", cites: ["ATA myxoedema 2014"] },
        { text: "Phaeochromocytoma: specialist-led α-blockade before β-blockade — never β-blocker alone (unopposed α → hypertensive crisis, pulmonary oedema)", cites: ["Endocrine Society PPGL 2014"] },
        { text: "DKA: no routine phosphate or bicarbonate; discuss severe depletion or cardiovascular compromise with diabetes and critical care", cites: ["JBDS-IP DKA 2023 PDF"] },
        { text: "Pituitary apoplexy: sudden headache + visual loss + ophthalmoplegia + hypopituitarism → empirical hydrocortisone (100–200 mg IV bolus then 2–4 mg/h infusion, per SfE 2016) when unstable or vision is threatened + urgent neurosurgical referral; replace cortisol BEFORE thyroxine", cites: ["SfE apoplexy dose 2016", "SfE apoplexy emergency 2016"] },
      ]}
      sectionSources={{
        objectives: ["JBDS-IP DKA 2023 (ABCD)", "JBDS HHS sodium 2023", "ATA 2016", "SfE adrenal emergency 2016"],
        workedExamples: ["JBDS-IP DKA 2023 (ABCD)", "ATA 2016", "SfE adrenal emergency 2016"],
        keyPoints: ["JBDS-IP DKA 2023 (ABCD)", "JBDS HHS sodium 2023", "ATA 2016", "ATA myxoedema 2014", "SfE adrenal emergency 2016", "SfE apoplexy emergency 2016", "SfE Adrenal Crisis 2020", "JBDS-IP HHS 2022 (ABCD)", "UK Pituitary Apoplexy 2011"],
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
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                For the full DKA lesson — diagnosis, fluids, fixed-rate insulin, potassium safety, resolution criteria and euglycaemic DKA — see the dedicated <Link to="/intensive-care/dka" className="text-primary underline">Diabetic Ketoacidosis (DKA)</Link> page.
              </p>
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
                  Severe DKA (consider HDU/critical care) if any of: ketones &gt; 6, HCO₃⁻ &lt; 5, pH &lt; 7.0, K⁺ &lt; 3.5
                  on admission, GCS &lt; 12 or abnormal AVPU, SpO₂ &lt; 92% on air, SBP &lt; 90, HR &gt; 100
                  or &lt; 60, anion gap &gt; 16.<InlineRef topicId="icu-endocrine-emergencies" refLabel="JBDS-IP DKA 2023 PDF" />
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">DKA — hourly treatment targets (JBDS-IP 2023)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Check capillary ketones and glucose hourly, and venous pH, bicarbonate and potassium at 60 minutes, 2 hours and
                  2-hourly thereafter. Aim for ketones falling ≥ 0.5 mmol/L/h, venous bicarbonate rising ≥ 3.0
                  mmol/L/h and capillary glucose falling ≥ 3.0 mmol/L/h. If these are not met, check the
                  infusion and pump, then increase the fixed-rate insulin infusion by 1 unit/h until they
                  are.<InlineRef topicId="icu-endocrine-emergencies" refLabel="JBDS-IP DKA 2023 (ABCD)" />
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">HHS — distinguishing features</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Osmolality ≥ 320 mOsm/kg (= 2[Na⁺] + glucose + urea), glucose ≥ 30, ketones
                  ≤ 3.0, pH &gt; 7.3, bicarbonate ≥ 15. Fluid losses 100–220 ml/kg. Aim osmolality fall 3–8 mOsm/kg/h, glucose fall
                  ≤ 5 mmol/L/h, Na⁺ fall ≤ 10 mmol/L in 24 h. Prophylactic LMWH for the whole admission unless contraindicated.<InlineRef topicId="icu-endocrine-emergencies" refLabel="JBDS HHS sodium 2023" />
                </p>
              </div>
            </div>
            <HyperglycaemicEmergenciesTeaching />
            <DkaFluidChoiceTeaching />
            <CollapsibleSubsection title="DKA safety and recovery — adult consensus 2024"><DkaSafetyAndRecoveryTeaching /></CollapsibleSubsection>
            <p className="text-sm text-muted-foreground mt-4">Routine phosphate and bicarbonate replacement are not recommended in DKA. Severe electrolyte depletion or cardiovascular compromise requires an individual critical-care/diabetes plan rather than a routine replacement recipe.<InlineRef topicId="icu-endocrine-emergencies" refLabel="JBDS-IP DKA 2023 PDF" /></p>
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
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                For the full thyroid storm lessons — diagnosis, thionamide and iodide timing, beta-blockade, steroids, cooling and plasmapheresis — see the dedicated <Link to="/intensive-care/thyroid-storm" className="text-primary underline">Thyroid Storm</Link> page.
              </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Thyroid storm (mortality 8–25 %)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Decompensation of underlying hyperthyroidism by surgery, sepsis, DKA,
                  iodinated contrast or drug withdrawal. <strong>Burch-Wartofsky ≥ 45</strong>{" "}
                  highly suggestive. Treat in five steps: β-blockade → PTU → iodine
                  (≥ 1 h later) → hydrocortisone → support (cooling, fluids, treat trigger).
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Adjuncts:</strong> cholestyramine binds thyroid hormone in the gut during enterohepatic
                  recirculation and has been used alongside other drugs. <strong>Plasmapheresis/plasma exchange</strong> and
                  emergency surgery have been used in storm that responds poorly to standard treatment; both need
                  specialist input.<InlineRef topicId="icu-endocrine-emergencies" refLabel="ATA 2016" />
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Myxoedema coma</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Severe hypothyroid decompensation: <strong>hypothermia, hypoventilation,
                  hyponatraemia, bradycardia, altered mental state</strong>. Treat initially with IV levothyroxine under endocrine advice, with preceding IV glucocorticoid cover
                  (cover potential adrenal insufficiency), passive rewarming,
                  ventilation as needed. Endocrinology referral.
                </p>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mt-4">
              <ThyroidStormAnimation />
            </div>
            <ThyroidEmergenciesTeaching />
            <GuidelineSources sources={THYROID_SOURCES} />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Adrenal & pituitary emergencies">
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Full lessons are on the dedicated <Link to="/intensive-care/adrenal-crisis" className="text-primary underline">Adrenal Crisis</Link> and <Link to="/intensive-care/pituitary-apoplexy" className="text-primary underline">Pituitary Apoplexy</Link> pages.
              </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Adrenal (Addisonian) crisis</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Acute decompensation of primary (Addison's, autoimmune, bilateral
                  adrenal haemorrhage — Waterhouse-Friderichsen) or secondary (HPA
                  suppression by chronic steroid, pituitary disease) insufficiency.
                  Shock, hyponatraemia and hypoglycaemia may occur; hyperkalaemia is mainly a feature of primary insufficiency and is not required. Treat suspected crisis with{" "}
                  <strong>hydrocortisone 100 mg IV stat then 200 mg/24 h</strong> + 0.9% NaCl
                  + glucose as indicated; do not delay for tests.<InlineRef topicId="icu-endocrine-emergencies" refLabel="SfE crisis hydrocortisone 2016" />
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Phaeochromocytoma crisis</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Catecholamine surge causing severe hypertension, arrhythmia, myocardial injury or
                  stroke — or sustained hypotension and shock. Alpha-blockade is strongly associated
                  with surviving a crisis; never give a β-blocker before α-blockade. Mechanical
                  circulatory support is strongly recommended for sustained hypotension, and surgery
                  is deferred until the patient is medically stable.{" "}
                  <InlineRef topicId="icu-endocrine-emergencies" refLabel="Whitelaw 2014 (Phaeo crisis)" />
                </p>
              </div>
              <div className="md:col-span-2"><PhaeochromocytomaPreparationTeaching /></div>
              <div className="md:col-span-2"><PhaeochromocytomaCrisisTeaching /></div>
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
                  empirical hydrocortisone when there is haemodynamic instability, altered consciousness, reduced visual acuity or severe visual field defects — <strong>100–200 mg IV bolus then 2–4 mg/h by continuous infusion</strong>, or 100 mg IM then 50–100 mg IM 6-hourly — before any other hormone (take a random cortisol first if it does not delay treatment);<InlineRef topicId="icu-endocrine-emergencies" refLabel="SfE apoplexy dose 2016" /> cautious isotonic fluid resuscitation
                  with vasopressors as required; treat hypoglycaemia and correct sodium slowly (≤ 10
                  mmol/L/24 h); full anterior pituitary profile (cortisol, ACTH, TFTs, prolactin, IGF-1,
                  LH/FSH, testosterone/oestradiol) plus hourly urine output and paired osmolalities for
                  diabetes insipidus; formal visual field and acuity assessment; and joint
                  endocrinology/neurosurgical/ophthalmology review. <strong>Urgent transsphenoidal
                  decompression</strong> is indicated for acute or deteriorating visual loss, declining
                  consciousness ; isolated ophthalmoplegia with intact
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
                <div className="mt-3"><HyponatraemiaCorrectionTeaching /></div>

              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Surgical / sick-day steroid cover</p>
                <p className="text-sm text-muted-foreground mt-1">Patients with established adrenal insufficiency or glucocorticoid-induced suppression need an individual perioperative replacement plan. Do not omit replacement while fasting or vomiting. Suspected crisis needs hydrocortisone 100 mg IV/IM followed by 200 mg/24 h and resuscitation. Taper with recovery under endocrine advice; do not apply a universal minor-surgery dose or daily-halving rule.<InlineRef topicId="icu-endocrine-emergencies" refLabel="SfE adrenal emergency 2016" /></p>

              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mt-4">
              <AdrenalCrisisAnimation />
            </div>
            <CollapsibleSubsection title="Adrenal insufficiency — recognition, resuscitation and recovery"><AdrenalInsufficiencyResuscitationTeaching /></CollapsibleSubsection>
            <AdrenalPituitaryEmergenciesTeaching />
            <PituitaryApoplexyGuidelineTeaching />
            <GuidelineSources sources={ADRENAL_PITUITARY_SOURCES} />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Anaesthetic pitfalls">
            <div className="space-y-2">
              {[
                { topic: "Etomidate", detail: "Etomidate can suppress adrenal steroid synthesis. Consider this when selecting induction agents; a single dose does not itself establish a diagnosis of adrenal crisis or an automatic indication for steroid treatment." },
                { topic: "SGLT2 inhibitors", detail: "Interrupt during hospitalisation for major surgery or serious acute illness (MHRA); elective timing follows current local guidance. Cause euglycaemic DKA — measure ketones in any unwell perioperative patient on these drugs even if glucose normal. See the dedicated euglycaemic DKA panel below." },
                { topic: "Iodinated contrast", detail: "Can precipitate thyroid storm in untreated hyperthyroidism, and contrast-induced thyrotoxicosis weeks later. Check TFTs in known thyroid disease before contrast." },
                { topic: "Vasopressor failure", detail: "Persistent shock needs reassessment for infection, bleeding, cardiac dysfunction and adrenal insufficiency. Treat suspected adrenal crisis promptly; do not diagnose it from a single vasopressor-dose threshold." },
                { topic: "Beta-blockers in phaeo", detail: "Do not give β-blockade before adequate α-blockade in phaeochromocytoma; obtain specialist advice for acute crisis management." },
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
            <EndocrinePerioperativeTeaching />
            <GuidelineSources sources={PITFALLS_SOURCES} />
            </CollapsibleSubsection>
          </ExamSection>
          <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Sepsis and corticosteroids — replacement versus adjunctive treatment"><SepsisSteroidDecisionsTeaching /></CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "DKA: fluids first (1 L 0.9% saline over 1 h), then fixed-rate insulin 0.1 U/kg/h, replace K⁺ once <5.5, continue long-acting insulin.",
              "HHS: slower correction than DKA; high VTE risk — prophylactic anticoagulation; watch for cerebral oedema.",
              "Thyroid storm: propranolol, propylthiouracil, iodine (after PTU), hydrocortisone, supportive cooling — treat trigger.",
              "Addisonian crisis: hydrocortisone 100 mg IV/IM stat then 200 mg/24 h (SfE 2016), 1 L isotonic saline in the first hour, treat hypoglycaemia; do not delay for cortisol assay.",
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
