import { InlineRef } from "@/components/references/InlineRef";
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
  ["What distinguishes HHS from DKA and how does management differ?", "HHS: glucose >30, osmolality >320, minimal ketones, no acidosis, profound dehydration (often 8–10 L deficit); fluid resuscitation is the priority — insulin only when glucose stops falling with fluids alone, at lower rates (0.05 U/kg/h) to prevent osmotic shifts."],
  ["How is myxoedema coma treated?", "IV levothyroxine initially (ATA: 200–400 µg load, reduced for age, size and cardiac risk), subsequent weight-based replacement, preceded by IV glucocorticoid cover, passive rewarming, treat precipitants and avoid sedatives."],
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
        <li>Add <strong>10% dextrose at 125 ml/h</strong> when glucose &lt; 14 (run alongside saline) — keeps insulin running until ketones clear.</li>
        <li>Aim ketones falling ≥ 0.5/h (or HCO₃⁻ rising ≥ 3/h, or glucose falling ≥ 3/h). If not met: increase fixed-rate by 1 U/h.</li>
        <li>Resolution: ketones &lt; 0.6 and venous pH &gt; 7.30; do not require bicarbonate normalisation.</li>
      </ul>
    ),
    answer: (
      <>
        Severe DKA. Activate fixed-rate insulin 7 U/h after 1 L 0.9% NaCl.
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
        <li><strong>Step 1 — β-blockade</strong>: propranolol 1 mg IV titrated, or carefully titrated esmolol if appropriate after haemodynamic assessment. High-dose propranolol, not esmolol, reduces T₄→T₃ conversion.</li>
        <li><strong>Step 2 — block synthesis</strong>: PTU 500–1000 mg PO/NG load then 250 mg q4h (PTU preferred — also blocks peripheral conversion).</li>
        <li><strong>Step 3 — block release</strong>: Lugol's iodine 5 drops PO q6h <em>≥ 1 h after PTU</em> (otherwise iodine fuels storm).</li>
        <li><strong>Step 4 — steroid</strong>: ATA regimen hydrocortisone 300 mg IV load, then 100 mg IV q8h (blocks conversion + treats relative adrenal insufficiency).</li>
        <li><strong>Step 5 — supportive</strong>: paracetamol + active cooling (avoid aspirin), fluids, treat surgical/septic precipitant. Plasmapheresis if refractory.</li>
      </ul>
    ),
    answer: (
      <>
        BWPS &gt; 45 → thyroid storm. Treat in parallel with haemodynamically appropriate β-blockade, PTU,
        hydrocortisone and supportive care; give iodide at least one hour after the thionamide. Mortality 10–30 % even with treatment.
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
        <li><strong>1 L 0.9% NaCl over 1 h</strong>; correct glucose with 10% dextrose if &lt; 4.</li>
        <li>Treat trigger (surgical stress + chronic HPA suppression). Convert to oral hydrocortisone once stable, fludrocortisone is needed below 50 mg/day hydrocortisone in primary adrenal insufficiency, not routinely in steroid-induced secondary insufficiency.</li>
        <li>Sick-day rules going forward: follow individual sick-day replacement advice; IV cover for any major surgery / vomiting.</li>
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
   cites: ["SfE adrenal emergency 2016"],
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
        { text: "Thyroid storm (BWPS ≥45): multimodal treatment in parallel; assess cardiac function before β-blockade, and give iodide ≥1 h after thionamide. Avoid aspirin (displaces T₄ from TBG)", cites: ["ATA Thyroid Storm"] },
        { text: "Adrenal crisis: refractory shock + low Na⁺ / high K⁺ / low glucose → hydrocortisone 100 mg IV stat BEFORE tests; high-dose hydrocortisone has full mineralocorticoid effect", cites: ["ES Adrenal Crisis 2016", "SfE adrenal emergency 2016"] },
        { text: "Myxoedema coma: hypothermia + hyponatraemia + hypoventilation + obtundation — IV glucocorticoid cover before initial IV levothyroxine; selected T3 adjunct under endocrine advice + passive rewarming + ICU ventilation", cites: ["ATA myxoedema 2014"] },
        { text: "Phaeochromocytoma: specialist-led α-blockade before β-blockade — never β-blocker alone (unopposed α → hypertensive crisis, pulmonary oedema)", cites: ["Endocrine Society PPGL 2014"] },
        { text: "DKA: no routine phosphate or bicarbonate; discuss severe depletion or cardiovascular compromise with diabetes and critical care", cites: ["JBDS-IP DKA 2023 PDF"] },
        { text: "Pituitary apoplexy: sudden headache + visual loss + ophthalmoplegia + hypopituitarism → hydrocortisone 100 mg IV + urgent neurosurgical referral; replace cortisol BEFORE thyroxine", cites: ["SfE apoplexy emergency 2016"] },
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
                <p className="font-semibold text-foreground text-sm">DKA — hourly treatment targets (JBDS-IP 2023)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Check capillary ketones and glucose hourly, and venous pH/bicarbonate hourly for 2–4 h then
                  2–4-hourly. Aim for ketones falling ≥ 0.5 mmol/L/h, venous bicarbonate rising ≥ 3.0
                  mmol/L/h and capillary glucose falling ≥ 3.0 mmol/L/h. If these are not met, check the
                  infusion and pump, then increase the fixed-rate insulin infusion by 1 unit/h until they
                  are.<InlineRef topicId="icu-endocrine-emergencies" refLabel="JBDS-IP DKA 2023 (ABCD)" />
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
            <HyperglycaemicEmergenciesTeaching />
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
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Adjuncts:</strong> cholestyramine (e.g. 4 g four times daily) binds thyroid hormone in the gut,
                  interrupting enterohepatic recirculation and speeding clearance. <strong>Plasmapheresis</strong> is a
                  rescue therapy for severe storm that fails standard treatment or when thionamides are contraindicated;
                  it removes circulating thyroid hormone (and antibodies), is resource-intensive and needs specialist
                  input, and is often a bridge to emergency thyroidectomy.<InlineRef topicId="icu-endocrine-emergencies" refLabel="ATA 2016" />
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Myxoedema coma (mortality 30–40 %)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Severe hypothyroid decompensation: <strong>hypothermia, hypoventilation,
                  hyponatraemia, bradycardia, obtunded</strong>. Treat initially with IV levothyroxine under endocrine advice, with preceding IV glucocorticoid cover
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

              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Surgical / sick-day steroid cover</p>
                <p className="text-sm text-muted-foreground mt-1">Patients with established adrenal insufficiency or glucocorticoid-induced suppression need an individual perioperative replacement plan. Do not omit replacement while fasting or vomiting. Suspected crisis needs hydrocortisone 100 mg IV/IM followed by 200 mg/24 h and resuscitation. Taper with recovery under endocrine advice; do not apply a universal minor-surgery dose or daily-halving rule.<InlineRef topicId="icu-endocrine-emergencies" refLabel="SfE adrenal emergency 2016" /></p>

              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mt-4">
              <AdrenalCrisisAnimation />
            </div>
            <AdrenalPituitaryEmergenciesTeaching />
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
