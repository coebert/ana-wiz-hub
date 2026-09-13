import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { ExamMappingBadges } from "@/components/exam/ExamMappingBadges";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { endocrineDiseaseQuestions } from "@/data/quizzes";
import PerioperativeDiabetesDiagram from "@/components/diagrams/perioperative/PerioperativeDiabetesDiagram";
import ThyroidStormDiagram from "@/components/diagrams/perioperative/ThyroidStormDiagram";
import PhaeochromocytomaDiagram from "@/components/diagrams/perioperative/PhaeochromocytomaDiagram";
import AddisonianCrisisDiagram from "@/components/diagrams/perioperative/AddisonianCrisisDiagram";
import CarcinoidSyndromeDiagram from "@/components/diagrams/perioperative/CarcinoidSyndromeDiagram";
import { Exam } from "@/data/curriculum";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { InlineRef } from "@/components/references/InlineRef";

const objectives = [
  "Apply JBDS-IP perioperative diabetes pathway, including VRIII indications and glucose targets.",
  "Optimise hyper- and hypothyroid patients and recognise/treat thyroid storm.",
  "Plan α- then β-blockade for phaeochromocytoma and intra-operative haemodynamic management.",
  "Decide perioperative steroid supplementation for chronic glucocorticoid users; recognise Addisonian crisis.",
  "Manage carcinoid syndrome with octreotide and avoid trigger drugs.",
];

const keyPoints = [
  { text: "Diabetes mellitus: target perioperative blood glucose 6–10 mmol/L; avoid hypoglycaemia (more dangerous than moderate hyperglycaemia); use variable-rate insulin infusion (VRIII) for patients who will miss ≥1 meal", cites: ["JBDS-IP 2021", "BJA Educ DM 2015"] },
  { text: "Thyroid storm (thyrotoxic crisis) has >20% mortality — treat with β-blockers, Lugol's iodine, propylthiouracil, hydrocortisone, and active cooling; never anaesthetise an uncontrolled hyperthyroid patient electively", cites: ["BJA Educ Thyroid 2014"] },
  { text: "Phaeochromocytoma requires 10–14 days of α-blockade (phenoxybenzamine) before surgery, followed by β-blockade — never give β-blockers first (risk of unopposed α-stimulation and hypertensive crisis)", cites: ["BJA Educ Phaeo 2017"] },
  { text: "Patients on long-term corticosteroids (≥5 mg prednisolone/day for ≥3 months) may have HPA axis suppression — give perioperative steroid supplementation based on surgical stress", cites: ["Addison's Guidelines"] },
  { text: "Addisonian crisis (acute adrenal insufficiency) presents as refractory hypotension, hypoglycaemia, and hyperkalaemia — treat with IV hydrocortisone 100 mg stat, IV fluids, and glucose", cites: ["Addison's Guidelines"] },

];

const EndocrineDiseaseTopicWorkedExamples: WorkedExample[] = [
  {
    title: "Perioperative management of an insulin-dependent diabetic for major surgery",
    scenario: "A 60-year-old with T1DM on basal-bolus insulin is first on the list for a 4-h Whipple procedure. Plan his peri-operative glycaemic strategy.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Pre-op: HbA1c if not within 3 months (target &lt;69 mmol/mol), continue long-acting basal at 80% night before, omit short-acting on the morning</li>
          <li>Schedule first on list, start variable-rate insulin infusion (VRII) with 0.45% saline + 5% glucose + 0.15% KCl when missed &gt;1 meal</li>
          <li>Intra-op: capillary or arterial glucose hourly, target 6–10 mmol/L (acceptable up to 12), adjust VRII per NHS England/JBDS algorithm</li>
          <li>Maintain basal insulin alongside VRII (overlap to prevent DKA in T1DM — never stop basal completely)</li>
          <li>Post-op: restart subcutaneous regimen once eating and drinking with 30-min overlap before stopping VRII</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
          <li>Stopping all insulin in T1DM perioperatively → DKA within hours</li>
          <li>Sliding-scale insulin without dextrose → hypoglycaemia</li>
          <li>Treating stress hyperglycaemia with aggressive insulin → hypoglycaemia + variability</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Continue basal insulin, omit prandial, start VRII with glucose/saline/KCl, hourly glucose monitoring, restart SC regimen with overlap when eating.",
    cites: ["BJA Educ DM 2015", "JBDS-IP 2021", "BJA Educ Thyroid 2014"],
  },
];

const tocItems = [
  { id: "section-diabetes-mellitus", label: "Diabetes Mellitus", group: "Core" },
  { id: "section-thyroid-disease", label: "Thyroid Disease", group: "Thyroid" },
  { id: "section-adrenal-disorders", label: "Adrenal Disorders", group: "Adrenal" },
  { id: "section-phaeochromocytoma", label: "Phaeochromocytoma", group: "Neuroendocrine" },
  { id: "section-carcinoid-syndrome", label: "Carcinoid Syndrome", group: "Neuroendocrine" },
  { id: "section-pituitary-disease", label: "Pituitary Disease", group: "Neuroendocrine" },
  { id: "section-obesity-endocrine", label: "Obesity-Related Endocrine/Metabolic Issues", group: "Neuroendocrine" },
];

const endocrineDiseaseFaqs: Array<[string, string]> = [
  ["What perioperative glucose target and insulin strategy apply in diabetes?", "Aim for capillary blood glucose 6–10 mmol/L (acceptable 4–12). Continue 80% of usual long-acting basal insulin; use a variable-rate insulin infusion (VRIII) for prolonged starvation, complex surgery or poor glycaemic control (CPOC/JBDS 2023)."],
  ["How is phaeochromocytoma prepared for surgery?", "α-blockade first (phenoxybenzamine or doxazosin titrated over 10–14 days) until orthostatic hypotension is achieved, followed by β-blockade only once α-blockade is established — never β-block first, as unopposed α-activity precipitates hypertensive crisis."],
  ["How are major-surgery steroid requirements managed in chronic steroid users?", "Continue the usual dose plus IV hydrocortisone — typically 25 mg at induction for minor, 50 mg + 25 mg 8-hourly for moderate, and 100 mg + 50 mg 8-hourly for major surgery — to prevent Addisonian crisis from HPA-axis suppression."],
];

const EndocrineDiseaseTopic = () => {
  return (
    <TopicTemplate
      title="Endocrine Co-Existing Disease"
      subtitle="Diabetes mellitus, thyroid disease, adrenal disorders, phaeochromocytoma, and carcinoid syndrome"
      backPath="/perioperative"
      backLabel="Perioperative Medicine"
      accentColor="text-clinical"
      topicId="endocrine-disease"
      topicTitle="Endocrine Co-Existing Disease"
      workedExamples={EndocrineDiseaseTopicWorkedExamples}
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={endocrineDiseaseQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["BJA Educ DM 2015", "JBDS-IP 2021", "Addison's Guidelines"],
        keyPoints: ["BJA Educ DM 2015", "JBDS-IP 2021", "BJA Educ Thyroid 2014", "BJA Educ Phaeo 2017", "Addison's Guidelines"],
      }}
      coreConcepts={
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
          <p className="text-muted-foreground leading-relaxed">
           Endocrine disease alters perioperative physiology in ways that demand specific planning: glucose targets and insulin handling in diabetes, the catastrophic risk of unrecognised thyroid storm or phaeochromocytoma, and the need for steroid supplementation in patients with HPA-axis suppression. This topic covers the high-yield endocrine conditions encountered in adult anaesthetic practice and the principles that prevent decompensation.
         </p>
         <TopicTableOfContents items={tocItems} />

         {/* Diabetes Mellitus */}
         <section id="section-diabetes-mellitus" className="scroll-mt-24">
           <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Diabetes Mellitus</h2>
          <ExamMappingBadges exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_08"]} />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Preoperative Assessment</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>HbA1c: target &lt;69 mmol/mol (8.5%) for elective surgery; &gt;69 = consider postponement for optimisation</li>
                <li>Assess for end-organ damage: autonomic neuropathy (gastroparesis, silent MI, postural hypotension), nephropathy, retinopathy</li>
                <li>Stiff joint syndrome (limited joint mobility): "prayer sign" — may indicate difficult intubation</li>
                <li>Coronary artery disease screening — diabetic patients have 2–4× increased cardiovascular risk</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Day-of-Surgery Drug Modification by Class</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Metformin: continue if eGFR normal and only one meal missed; omit on the day if a prolonged (&gt;1 meal) fast is planned or renal function is impaired (lactic acidosis risk)</li>
                <li>Sulfonylureas (gliclazide, glimepiride): omit on the morning of surgery — hypoglycaemia risk from ongoing insulin secretion without oral intake</li>
                <li>SGLT2 inhibitors: stop on the day before surgery for most patients, and 2 days before surgery for those at higher risk of ketoacidosis (insulin-deficient, prolonged fasting expected, major surgery) per CPOC/JBDS 2023 — risk of euglycaemic diabetic ketoacidosis (normal or mildly raised glucose with raised ketones and metabolic acidosis) driven by glycosuria-induced volume depletion and enhanced ketogenesis; restart only once eating/drinking normally and ketones normal <InlineRef topicId="endocrine-disease" refLabel="CPOC-JBDS Diabetes 2023" /></li>
                <li>DPP-4 inhibitors (sitagliptin, linagliptin) and pioglitazone: continue as usual on the day of surgery</li>
                <li>GLP-1 receptor agonists (semaglutide, liraglutide, dulaglutide, tirzepatide): delay gastric emptying via vagally-mediated pyloric slowing — solid gastric residue and aspiration risk persist despite standard fasting even when the drug is correctly omitted</li>
                <li>Association of Anaesthetists advice: omit daily preparations on the day of surgery; omit weekly preparations for at least one week before surgery (guidance continues to evolve)</li>
                <li>If not omitted as advised, manage as high aspiration risk: consider prolonged clear-fluid-only fasting, point-of-care gastric ultrasound where available, and rapid sequence induction <InlineRef topicId="endocrine-disease" refLabel="BJA Educ Diabetes 2024" /></li>
                <li>All basal (long-acting/background) insulin: continue but reduce by ~20% (i.e. give 80% of usual dose) the night before/morning of surgery in both type 1 and type 2 DM</li>
                <li>Short-acting/prandial and mixed insulins: omit the dose that coincides with a missed meal</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Perioperative Glucose Management</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Target glucose: 6–10 mmol/L (NICE-SUGAR trial: tight control [4.5–6] increased mortality vs moderate control)</li>
                <li>Type 1 DM: never omit insulin — always requires background insulin or VRIII</li>
                <li>Type 2 DM on oral agents: omit metformin day of surgery (lactic acidosis risk); omit SGLT2 inhibitors from the day before surgery (2 days before if at higher risk of ketoacidosis) — euglycaemic DKA risk</li>
                <li>Sulfonylureas: omit on morning of surgery (hypoglycaemia risk)</li>
                <li>GLP-1 receptor agonists (semaglutide, liraglutide, tirzepatide): delay gastric emptying via vagally-mediated pyloric slowing, so solid gastric residue and aspiration risk persist despite standard fasting</li>
                <li>Association of Anaesthetists advice: omit daily preparations on the day of surgery; omit weekly preparations for at least one week before surgery (guidance continues to evolve as evidence accumulates)</li>
                <li>If not omitted as advised, manage as high aspiration risk — consider prolonged clear-fluid-only fasting, point-of-care gastric ultrasound where available, and rapid sequence induction</li>
                <li>Omission has glycaemic consequences (rebound hyperglycaemia) — monitor glucose and use variable-rate insulin infusion if required <InlineRef topicId="endocrine-disease" refLabel="BJA Educ Diabetes 2024" /></li>
                <li>Schedule diabetic patients first on the morning (or afternoon) list to minimise fasting duration — the "first on list" principle</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Variable Rate Intravenous Insulin Infusion (VRIII)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Indications: type 1 DM expected to miss &gt;1 meal; poorly controlled diabetes (HbA1c &gt;69 mmol/mol) undergoing major surgery; type 2 DM on insulin who will miss &gt;1 meal; emergency surgery; need for two-bag or complex fluid management</li>
                <li>Prescription: soluble insulin 50 units in 50 mL 0.9% saline (1 unit/mL) via syringe driver, rate adjusted according to a sliding-scale algorithm based on hourly capillary glucose</li>
                <li>Co-administer substrate: 5% or 10% glucose with 0.15–0.3% KCl (e.g. 0.45% saline + 5% glucose + 0.15% KCl) running concurrently at ~83–125 mL/h, or the "two-bag" system (separate glucose and saline bags run at variable relative rates) to prevent starvation ketosis and hypoglycaemia</li>
                <li>Never stop background/basal insulin in type 1 DM even while VRIII is running — omission risks rapid ketogenesis and DKA within hours; continue basal analogue insulin alongside the infusion</li>
                <li>Target capillary/arterial glucose: 6–10 mmol/L (acceptable range 4–12 mmol/L); check hourly (or more often if unstable)</li>
                <li>Check capillary/blood ketones and venous bicarbonate/pH if glucose &gt;12 mmol/L or the patient is unwell — rising ketones with normal or near-normal glucose indicates euglycaemic DKA</li>
                <li>Discontinue only once eating and drinking normally, with subcutaneous insulin restarted and a 30–60 minute overlap before stopping the infusion (to avoid a gap in insulin delivery)</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Diabetic Emergencies</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>DKA diagnostic criteria: glucose &gt;11 mmol/L (or known diabetes), capillary ketones ≥3 mmol/L (or urine ketones ≥2+), venous pH &lt;7.3 and/or bicarbonate &lt;15 mmol/L</li>
                <li>DKA management: fixed-rate IV insulin infusion 0.1 units/kg/h; 0.9% saline resuscitation (typically 1 L over the first hour, then according to clinical state); potassium replacement guided by serum K+ (withhold if &gt;5.5 mmol/L, standard replacement 20–40 mmol/L if 3.5–5.5 mmol/L, senior input if &lt;3.5 mmol/L); add 10% glucose once glucose falls below ~14 mmol/L to allow the fixed-rate insulin to continue; monitor for cerebral oedema (more common in young patients) and hypokalaemia</li>
                <li>Hypoglycaemia (&lt;4 mmol/L): 75–100 mL of 20% glucose IV (or 15–20 g oral glucose if conscious); glucagon 1 mg IM/IV if no IV access; recheck glucose in 10–15 minutes</li>
                <li>Euglycaemic DKA: classically associated with SGLT2 inhibitors, prolonged fasting, pregnancy, low-carbohydrate diets, or acute illness — normal or only mildly raised glucose (often &lt;11 mmol/L) with significant ketosis and metabolic acidosis; a normal glucose must not be used to exclude DKA if ketones are checked and raised — treat as standard DKA including insulin and dextrose co-administration</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Hyperosmolar Hyperglycaemic State (HHS)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Definition: hypovolaemia with marked hyperglycaemia (glucose ≥30 mmol/L), serum osmolality ≥320 mosmol/kg, and no significant ketonaemia (&lt;3 mmol/L) or acidosis (pH &gt;7.3, bicarbonate &gt;15 mmol/L)</li>
                <li>Typical patient: older person with type 2 diabetes, precipitated by infection, MI, corticosteroids, or missed medication; gradual onset over days rather than the hours typical of DKA</li>
                <li>Features: profound dehydration (often 100–220 mL/kg fluid deficit), obtundation, focal neurology or seizures, high thrombosis risk and hyperviscosity</li>
                <li>Management: 0.9% sodium chloride 1 L/h initially; aim for osmolality to fall by 3–8 mosmol/kg/h and glucose to fall no faster than ~5 mmol/L/h to avoid cerebral oedema; switch to 0.45% saline only if osmolality is not falling despite adequate fluid replacement</li>
                <li>Low-dose fixed-rate insulin infusion (0.05 units/kg/h) started once glucose stops falling with fluids alone; potassium replacement, prophylactic LMWH, and meticulous foot/pressure care; treat the precipitant <InlineRef topicId="endocrine-disease" refLabel="JBDS HHS 2022" /></li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Type 1 vs Type 2 DM: Perioperative Contrasts</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>T1DM: absolute insulin deficiency — there is always an obligate requirement for background insulin; never stop basal insulin completely, but reduce it to ~80% of the usual dose; have a low threshold for starting VRIII if more than one meal will be missed; omitting insulin carries a high risk of rapid DKA</li>
                <li>T2DM: perioperative plan depends on baseline therapy — diet-controlled: monitor glucose only, no specific drug adjustment needed; oral agents: omit metformin and sulfonylureas on the day of surgery, stop SGLT2 inhibitors the day before surgery (2 days before if at higher risk of ketoacidosis); insulin-treated: reduce basal insulin (as for T1DM) and start VRIII if fasting is prolonged or glycaemic control is poor</li>
                <li>T2DM has residual endogenous insulin secretion, so the risk of ketoacidosis from insulin omission alone is much lower than in T1DM, though SGLT2 inhibitor use can still precipitate euglycaemic DKA in either type <InlineRef topicId="endocrine-disease" refLabel="CPOC-JBDS Diabetes 2023" /></li>
              </ul>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <PerioperativeDiabetesDiagram />
            </div>
          </div>
        </section>

         {/* Thyroid Disease */}
         <section id="section-thyroid-disease" className="scroll-mt-24">
           <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Thyroid Disease</h2>
          <ExamMappingBadges exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["PO_BK_08"]} />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Hyperthyroidism</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Cardiovascular effects: tachycardia, AF, increased cardiac output, widened pulse pressure</li>
                <li>Must be euthyroid before elective surgery — carbimazole/propylthiouracil + β-blocker</li>
                <li>Anaesthetic implications: exaggerated response to catecholamines, increased MAC, risk of thyroid storm</li>
                <li>Thyroid storm: hyperthermia (&gt;40°C), severe tachycardia/AF, agitation or coma, vomiting/diarrhoea, high-output cardiac failure — mortality &gt;20% untreated</li>
                <li>Thyroid storm treatment (stepwise, with exact doses): propranolol 60–80 mg orally 4-hourly or 1–2 mg IV boluses (titrated) to control the adrenergic surge; propylthiouracil (PTU) 500–1000 mg loading dose then 250 mg orally 4-hourly (blocks new hormone synthesis and peripheral T4→T3 conversion — preferred over carbimazole in storm); hydrocortisone 100 mg IV 6–8-hourly (reduces T4→T3 conversion and covers relative adrenal insufficiency); Lugol's iodine (aqueous iodine oral solution) 0.3–0.5 mL 8-hourly, started at least 1 hour after the first dose of PTU/carbimazole to avoid the iodine being incorporated into new hormone synthesis (Wolff–Chaikoff-mediated block of hormone release)</li>
                <li>Supportive care: active cooling (paracetamol, cooling blankets — avoid aspirin which displaces T4 from binding proteins), IV fluids, treat the precipitant (infection, surgery, iodine load), ICU admission for cardiovascular support and monitoring</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Hypothyroidism</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Cardiovascular: bradycardia, reduced cardiac output, pericardial effusion, diastolic hypertension</li>
                <li>Increased sensitivity to anaesthetic agents and opioids; reduced MAC</li>
                <li>Delayed gastric emptying, hypothermia, and impaired drug metabolism</li>
                <li>Mild/moderate hypothyroidism: safe to proceed with surgery; severe (myxoedema coma) is a contraindication</li>
                <li>Myxoedema coma: medical emergency with mortality up to 30–50%; features include hypothermia, bradycardia, hyponatraemia, hypoglycaemia, hypoventilation, and depressed consciousness</li>
                <li>Myxoedema coma treatment: IV levothyroxine (T4) 200–500 µg loading dose then 50–100 µg daily, often with IV liothyronine (T3) 5–20 µg (faster onset) given cautiously due to arrhythmia risk; IV hydrocortisone 100 mg 6–8-hourly (until co-existing adrenal insufficiency excluded); gradual passive rewarming (rapid rewarming risks vasodilatation and cardiovascular collapse); ventilatory support for hypoventilation/CO2 retention; cautious fluid and glucose correction; ICU management</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Thyroidectomy Considerations</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Airway assessment for goitre: assess for tracheal deviation/compression, stridor, positional dyspnoea, and voice change; flow–volume loops may show a fixed extrathoracic or intrathoracic obstruction pattern</li>
                <li>Retrosternal extension: examine for a goitre that disappears below the sternal notch, "sail sign" on CXR, or symptoms exacerbated by arms raised above the head (Pemberton's sign, suggesting thoracic inlet obstruction); obtain CT thorax/neck if retrosternal extension, significant tracheal compression, or stridor is present — informs decision on awake fibreoptic intubation, armoured tube use, and availability of rigid bronchoscopy/ECMO standby for severe compression</li>
                <li>Postoperative haematoma: surgical emergency causing airway compromise from tracheal compression and venous/lymphatic obstruction (laryngeal oedema) rather than the haematoma volume alone; immediate management is to remove the skin clips/sutures and evacuate the haematoma at the bedside before returning to theatre, as this can rapidly relieve the airway obstruction</li>
                <li>Recurrent laryngeal nerve (RLN) palsy: unilateral injury causes hoarseness with a normal airway (ipsilateral vocal cord in a paramedian position); bilateral RLN palsy causes both cords to lie paramedian, producing stridor and airway obstruction that may require immediate reintubation or emergency tracheostomy</li>
                <li>Hypocalcaemia: from inadvertent parathyroid gland damage/devascularisation; typically develops 24–48 h post-op with perioral tingling, paraesthesiae, Chvostek's and Trousseau's signs, and can progress to laryngospasm or seizures — check serum calcium routinely post-thyroidectomy and treat with IV calcium gluconate if symptomatic</li>
                <li>Tracheomalacia: long-standing goitre compression may weaken the tracheal cartilage, so that after gland removal the trachea can collapse dynamically on extubation, causing stridor and respiratory distress; consider a leak test before extubation and have a plan for re-intubation or staged extubation over an airway exchange catheter</li>
              </ul>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <ThyroidStormDiagram />
            </div>
          </div>
        </section>

         {/* Adrenal Disorders */}
         <section id="section-adrenal-disorders" className="scroll-mt-24">
           <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Adrenal Disorders</h2>
          <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_08"]} />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Primary vs Secondary Adrenal Insufficiency</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Primary (Addison's disease): destruction of the adrenal cortex itself (autoimmune commonest in the UK, also TB, malignancy, haemorrhage) — deficiency of both cortisol and aldosterone, so features include hyponatraemia, hyperkalaemia, postural hypotension, and hyperpigmentation (from raised ACTH/POMC)</li>
                <li>Secondary/tertiary insufficiency: hypothalamic–pituitary disease or, most commonly in anaesthetic practice, exogenous corticosteroid suppression of ACTH — aldosterone secretion is largely preserved (renin–angiotensin driven), so hyperkalaemia is typically absent and hyperpigmentation does not occur</li>
                <li>Short synacthen test (SST): baseline cortisol measured, then tetracosactide (synthetic ACTH) 250 µg IM/IV given, with cortisol repeated at 30 minutes; a normal response is a post-stimulation cortisol &gt;450–550 nmol/L (assay-dependent) — a failure to rise adequately confirms adrenal insufficiency and, in known steroid users, indicates HPA-axis suppression requiring perioperative cover</li>
                <li>Chronic steroid use (≥5 mg prednisolone/day, or equivalent, for ≥3 months in the preceding year) is assumed to cause clinically significant HPA-axis suppression lasting up to 12 months after cessation — no need for an SST in this group as supplementation is given empirically</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Perioperative Steroid Supplementation & Addisonian Crisis</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Continue the patient's usual daily glucocorticoid dose throughout the perioperative period in all cases, plus additional cover according to surgical severity (2020 Association of Anaesthetists guidance)</li>
                <li>Minor surgery (e.g. under local anaesthesia, minor procedure with rapid recovery): usual glucocorticoid dose PLUS hydrocortisone 25 mg i.v. at induction (Association of Anaesthetists 2020); resume oral medication as soon as possible <InlineRef topicId="endocrine-disease" refLabel="Addison's Guidelines" /></li>
                <li>Moderate surgery: hydrocortisone 50 mg IV at induction, then 25 mg IV every 8 hours for 24 hours, then resume usual oral dose</li>
                <li>Major surgery: hydrocortisone 100 mg IV at induction, then 50 mg IV every 8 hours (or an infusion of 200 mg/24 h) for 48–72 hours depending on recovery, then wean back to the usual oral dose over several days</li>
                <li>Alternative simplified approach for known/suspected adrenal insufficiency or long-term steroid use: hydrocortisone 100 mg IM/IV at induction then 50 mg IV/IM 6-hourly until eating/drinking, then double the usual oral dose for 24–48 h</li>
                <li>Addisonian (adrenal) crisis: refractory/vasopressor-resistant hypotension, hyperkalaemia, hyponatraemia, hypoglycaemia, abdominal pain, and vomiting — must be treated on clinical suspicion without waiting for confirmatory cortisol results</li>
                <li>Treatment: IV hydrocortisone 100 mg stat bolus then 100 mg every 6 hours (or a continuous infusion), rapid 0.9% saline resuscitation (typically 1 L over 1 hour then reassess), 10% dextrose for hypoglycaemia, and correction of hyperkalaemia if severe; fludrocortisone is not required acutely as high-dose hydrocortisone has intrinsic mineralocorticoid activity</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Cushing's Syndrome</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Features: central obesity, hypertension, diabetes/impaired glucose tolerance, osteoporosis (careful positioning, risk of vertebral/rib fracture), proximal myopathy, thin fragile skin and easy bruising, striae, and psychiatric disturbance</li>
                <li>Cardiovascular: hypertension is near-universal and should be optimised preoperatively; increased risk of ischaemic heart disease and cardiac failure from chronic glucocorticoid excess and associated dyslipidaemia; markedly increased risk of venous thromboembolism (cortisol excess promotes a hypercoagulable state) — ensure mechanical and pharmacological thromboprophylaxis unless contraindicated</li>
                <li>Metabolic: hyperglycaemia/steroid-induced diabetes requires perioperative glucose monitoring and insulin as needed; hypokalaemic metabolic alkalosis may occur with severe hypercortisolism (mineralocorticoid effect of very high cortisol) — correct potassium preoperatively and monitor closely</li>
                <li>Musculoskeletal: proximal myopathy can affect the respiratory muscles, impairing ventilatory reserve and slowing recovery from neuromuscular blockade — use neuromuscular monitoring and consider reduced NMBA doses; osteoporosis increases fracture risk during positioning and transfers, so handle and pad the patient carefully</li>
                <li>Airway: truncal obesity, a "buffalo hump", and soft tissue oedema can make airway management and mask ventilation more difficult — assess and prepare accordingly</li>
                <li>Difficult IV access and fragile veins/skin; meticulous pressure area care</li>
                <li>Continue perioperative steroid cover; after successful adrenalectomy for a cortisol-secreting tumour the contralateral (or remaining) adrenal is suppressed, so patients require full postoperative glucocorticoid replacement to avoid an adrenal crisis</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Conn's Syndrome (Primary Hyperaldosteronism)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Excess aldosterone from an adrenal adenoma or bilateral hyperplasia causes sodium/water retention with hypertension, and renal potassium/hydrogen ion wasting causing hypokalaemia and metabolic alkalosis</li>
                <li>Preoperative optimisation: correct hypokalaemia (may require high-dose potassium replacement) and control blood pressure with a mineralocorticoid receptor antagonist (spironolactone or eplerenone) before elective adrenalectomy</li>
                <li>Anaesthetic implications: hypokalaemia increases sensitivity to neuromuscular blocking agents and risk of arrhythmia; monitor potassium and ECG perioperatively; use invasive arterial blood pressure monitoring intraoperatively given the labile hypertension</li>
                <li>Avoid hyperventilation intraoperatively — respiratory alkalosis drives potassium intracellularly and can worsen pre-existing hypokalaemia, precipitating arrhythmia</li>
                <li>Large fluid and haemodynamic shifts may occur after adrenalectomy as aldosterone excess resolves — anticipate and manage volume status closely in the immediate postoperative period</li>
                <li>Postoperative monitoring: watch for hypotension (as vasoconstrictor aldosterone effect is lost) and hyperkalaemia (from unmasking of the suppressed contralateral adrenal/renin-angiotensin axis) once the aldosterone-secreting tissue is removed; blood pressure typically improves after successful unilateral adrenalectomy but may take weeks to normalise</li>
              </ul>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <AddisonianCrisisDiagram />
            </div>
          </div>
        </section>

         {/* Phaeochromocytoma */}
         <section id="section-phaeochromocytoma" className="scroll-mt-24">
           <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Phaeochromocytoma</h2>
          <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_08"]} />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Diagnosis and Preoperative Preparation</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Catecholamine-secreting tumour of the adrenal medulla (90%) or extra-adrenal paraganglia; "rule of 10s" (10% bilateral, 10% extra-adrenal, 10% malignant, ~10% familial — higher in modern series with genetic screening)</li>
                <li>Classic triad: headache, sweating, and palpitations with paroxysmal hypertension; may also present with anxiety, pallor, tremor, or catecholamine-induced cardiomyopathy</li>
                <li>Biochemical diagnosis: plasma free metanephrines (or 24-h urinary fractionated metanephrines/catecholamines) — plasma metanephrines have the highest sensitivity and are the preferred first-line test; imaging (CT/MRI, MIBG scintigraphy) localises the tumour after biochemical confirmation</li>
                <li>Preoperative preparation (10–14 days minimum): α-blockade first — phenoxybenzamine (non-competitive, long-acting) starting 10 mg BD and titrated up (often to 1 mg/kg/day in divided doses) until postural hypotension develops, or doxazosin (competitive, selective α1-blocker, shorter-acting, less reflex tachycardia) starting 1–2 mg OD/BD and titrated up to effect</li>
                <li>β-blockade (e.g. propranolol 10–40 mg TDS, or atenolol) is added only once α-blockade is established, usually after 2–3 days, to control reflex tachycardia and any catecholamine-induced arrhythmia</li>
                <li>Never give β-blockers before adequate α-blockade → unopposed α-adrenergic vasoconstriction → severe hypertensive crisis and potential acute heart failure/pulmonary oedema</li>
                <li>Volume repletion: patients are chronically vasoconstricted and intravascularly volume-depleted despite hypertension; encourage a high-salt diet and oral fluid intake during preparation, and give generous IV crystalloid preoperatively to blunt the post-ligation hypotension</li>
                <li>Readiness criteria (Roizen's criteria): arterial pressure &lt;160/90 mmHg for the preceding 24–48 h; postural hypotension present but standing blood pressure &gt;80/45 mmHg; no ST/T-wave changes on ECG for at least one week; no more than one ventricular premature beat every 5 minutes <InlineRef topicId="endocrine-disease" refLabel="BJA Educ Phaeo 2017" /></li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Intraoperative Management and Crisis Drugs</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Invasive monitoring: arterial line pre-induction, central venous access; consider cardiac output monitoring for large/complex tumours</li>
                <li>Avoid histamine-releasing agents and drugs that provoke catecholamine release (e.g. ketamine, ephedrine, atracurium in large doses, metoclopramide)</li>
                <li>Tumour handling causes catecholamine surges with severe hypertension and tachy-arrhythmia; have the following drawn up and immediately available:</li>
                <li>Magnesium sulfate 2–4 g IV bolus (then infusion) — reduces catecholamine release, causes vasodilatation, and has anti-arrhythmic effect</li>
                <li>Phentolamine 1–5 mg IV boluses (short-acting competitive α-blocker) titrated for acute hypertensive spikes</li>
                <li>Sodium nitroprusside 0.5–1.5 µg/kg/min IV infusion titrated to effect — rapid-onset arterial and venous vasodilator for refractory hypertension (watch for cyanide toxicity with prolonged high-dose use)</li>
                <li>Esmolol 0.5 mg/kg IV loading bolus then 50–200 µg/kg/min infusion — short-acting cardioselective β-blocker for tachyarrhythmia, only once adequate α-blockade/vasodilatation is present</li>
                <li>After venous ligation of the tumour, circulating catecholamines fall abruptly → risk of profound hypotension; treat with rapid volume loading, and vasopressors (noradrenaline) if fluid alone is insufficient — communicate with the surgeon before ligation to prepare</li>
                <li>Postoperative: continue close monitoring for hypotension (from residual α-blockade and depleted catecholamines) and hypoglycaemia (rebound hyperinsulinaemia after removal of the catecholamine-driven suppression of insulin secretion) — check glucose regularly for 24–48 h</li>
              </ul>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <PhaeochromocytomaDiagram />
            </div>
          </div>
        </section>

         {/* Carcinoid Syndrome */}
         <section id="section-carcinoid-syndrome" className="scroll-mt-24">
           <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Carcinoid Syndrome</h2>
          <ExamMappingBadges exams={[Exam.FINAL]} curriculumCodes={["PO_BK_08"]} />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Neuroendocrine tumour secreting serotonin (5-HT), histamine, kallikrein, and prostaglandins</li>
                <li>Features: flushing, diarrhoea, bronchospasm, right-sided cardiac valvular fibrosis (carcinoid heart disease)</li>
                <li>Carcinoid heart disease: endocardial fibrous plaques deposited by serotonin and other vasoactive amines; occurs in around half of patients with carcinoid syndrome <InlineRef topicId="endocrine-disease" refLabel="BJA Educ Carcinoid 2011" /></li>
                <li>Predominantly right-sided — tricuspid regurgitation (commonest) and pulmonary stenosis; the left side is typically spared because mediators are metabolised on first pass through the lungs (unless bronchial carcinoid, a right-to-left shunt, or very high tumour burden allows mediators to bypass pulmonary clearance)</li>
                <li>Consequences of right heart failure: raised JVP, hepatic congestion, ascites, peripheral oedema, and a low fixed cardiac output that tolerates vasodilatation poorly</li>
                <li>Management: mandatory preoperative echocardiography, NT-proBNP and 5-HIAA <InlineRef topicId="endocrine-disease" refLabel="BJA Educ Carcinoid 2011" />; maintain preload, avoid rises in pulmonary vascular resistance (hypoxia, hypercapnia, acidosis), use invasive monitoring, cover with an octreotide infusion for crisis prevention, avoid histamine-releasing drugs, and be prepared to treat right ventricular failure with inotropes and pulmonary vasodilators</li>
                <li>Diagnosis: urinary 5-HIAA, serum chromogranin A</li>
                <li>Preoperative octreotide loading: 100–500 µg subcutaneously 8-hourly (or a continuous infusion) for 1–2 days before major surgery in symptomatic patients, in addition to intraoperative cover</li>
                <li>Perioperative octreotide infusion: 50–100 µg/h IV started at induction (some protocols use 25–50 µg/h) to suppress hormone release during handling of the tumour; have IV bolus doses drawn up and immediately available throughout the case</li>
                <li>Avoid histamine-releasing drugs (morphine, atracurium, mivacurium), sympathomimetics/catecholamines (adrenaline, ephedrine, dopamine — may paradoxically stimulate further mediator release), and suxamethonium (fasciculation-related mediator release may trigger carcinoid crisis)</li>
                <li>Carcinoid crisis (profound flushing, bronchospasm, labile blood pressure, arrhythmia): treat with IV octreotide 500–1000 µg bolus, repeated if no response <InlineRef topicId="endocrine-disease" refLabel="AoA Carcinoid 2018" />; avoid catecholamines/adrenergic vasopressors which may worsen mediator release — use vasopressin or phenylephrine cautiously for hypotension, and treat bronchospasm avoiding histamine-releasing agents</li>
              </ul>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <CarcinoidSyndromeDiagram />
            </div>
          </div>
        </section>
        {/* Pituitary Disease */}
         <section id="section-pituitary-disease" className="scroll-mt-24">
           <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Pituitary Disease</h2>
          <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_08"]} />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Acromegaly</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Excess growth hormone (usually from a GH-secreting pituitary adenoma) causes soft tissue and skeletal overgrowth affecting airway management at every level</li>
                <li>Airway difficulty predictors: macroglossia, mandibular prognathism and overgrowth, thickened pharyngeal/laryngeal soft tissue, glottic and subglottic narrowing, and a high incidence of obstructive sleep apnoea — anticipate difficult mask ventilation, difficult laryngoscopy, and potential difficult front-of-neck access</li>
                <li>Consider awake fibreoptic intubation and a range of smaller endotracheal tubes; check for recurrent laryngeal nerve involvement/voice change and prior transsphenoidal surgery scarring</li>
                <li>Systemic associations: hypertension, cardiomyopathy, glucose intolerance/diabetes, and peripheral neuropathy (nerve entrapment) — screen and optimise before elective surgery</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Diabetes Insipidus (DI)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Deficiency of (cranial DI) or renal resistance to (nephrogenic DI) antidiuretic hormone (ADH/vasopressin) causes production of large volumes of dilute urine with hypernatraemia and hyperosmolar plasma if free water intake cannot keep pace</li>
                <li>Commonly seen after pituitary surgery/trauma, or as a feature of brain death — often transient/triphasic (DI → transient antidiuresis from stored ADH release → permanent DI) after pituitary stalk injury</li>
                <li>Diagnosis: urine output &gt;3 mL/kg/h with dilute urine (low urine osmolality) despite rising plasma osmolality/sodium</li>
                <li>Management: replace free water losses (enteral water or IV 5% dextrose/hypotonic fluid) matched to urine output, and give desmopressin (DDAVP) — typically 1–2 µg IV/SC or 10–20 µg intranasal, titrated to urine output and serum sodium</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">SIADH</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Syndrome of inappropriate antidiuretic hormone secretion causes euvolaemic hyponatraemia with inappropriately concentrated urine (urine osmolality &gt;100 mosmol/kg) despite low plasma osmolality</li>
                <li>Causes relevant to perioperative practice: intracranial pathology/surgery (including pituitary surgery), pulmonary disease, malignancy, and drugs (e.g. carbamazepine, SSRIs, opioids)</li>
                <li>Management: fluid restriction (typically 750–1000 mL/day) as first-line for chronic/asymptomatic hyponatraemia; correct severe/symptomatic hyponatraemia cautiously with hypertonic saline under specialist guidance, limiting the rate of sodium correction (generally no more than 8–10 mmol/L in 24 hours) to avoid osmotic demyelination syndrome</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Panhypopituitarism</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Global anterior pituitary failure (tumour, surgery, radiotherapy, Sheehan's syndrome, pituitary apoplexy) causes combined deficiency of ACTH (secondary adrenal insufficiency), TSH (secondary hypothyroidism), gonadotrophins, and GH, plus possible posterior pituitary (ADH) involvement</li>
                <li>Perioperative priority: secondary adrenal insufficiency takes precedence — give perioperative glucocorticoid replacement/cover as for chronic steroid users (see Adrenal Disorders) before correcting hypothyroidism, since thyroxine replacement alone can precipitate an adrenal crisis by increasing metabolic clearance of cortisol</li>
                <li>Ensure thyroid hormone replacement is optimised where possible, and monitor for diabetes insipidus if the posterior pituitary/stalk is involved (e.g. after pituitary apoplexy or transsphenoidal surgery)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Obesity-Related Endocrine and Metabolic Considerations */}
         <section id="section-obesity-endocrine" className="scroll-mt-24">
           <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Obesity-Related Endocrine and Metabolic Considerations</h2>
          <ExamMappingBadges exams={[Exam.FINAL]} curriculumCodes={["PO_BK_08"]} />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Obesity is strongly associated with type 2 diabetes, metabolic syndrome, obstructive sleep apnoea, and non-alcoholic fatty liver disease, each of which independently affects perioperative risk and drug handling</li>
                <li>Increasing use of GLP-1 receptor agonists and dual GIP/GLP-1 agonists for weight management (as well as diabetes) means gastric-emptying and aspiration considerations discussed above apply to an expanding non-diabetic surgical population — always ask specifically about these drugs during preoperative assessment</li>
                <li>Bariatric/metabolic surgery patients may have post-surgical hypoglycaemia (post-gastric-bypass hyperinsulinaemic hypoglycaemia) and nutritional deficiencies (B12, iron, thiamine) requiring perioperative attention</li>
                <li>See the dedicated Obesity and Bariatric Surgery topic for full airway, drug dosing, and positioning considerations in this population</li>
              </ul>
            </div>
          </div>
        </section>

        <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              'Diabetes: aim CBG 6–10 mmol/L (acceptable 4–12). Variable rate insulin infusion (VRIII) for prolonged starvation or poor control; continue long-acting basal at 80%.',
              'Omit SGLT-2 inhibitors 3–4 days depending on the agent (dapagliflozin/empagliflozin/canagliflozin 3 days, ertugliflozin 4 days) preoperatively — risk of euglycaemic DKA.',
              'Steroid cover: continue usual dose + perioperative hydrocortisone (25 mg minor, 50 mg + 25 mg q8h moderate, 100 mg + 50 mg q8h major) for chronic steroid users.',
              'Thyrotoxic patient: defer elective surgery until euthyroid; in emergency use β-blocker, propylthiouracil, iodine, steroids — avoid ketamine, ephedrine.',
              'Phaeochromocytoma: α-block (phenoxybenzamine/doxazosin) first, then β-block 3–14 days preoperatively — never β-block first (unopposed α → hypertensive crisis).',
              'Carcinoid crisis: treat with IV octreotide 500–1000 µg bolus, repeated if no response; avoid histamine-releasing drugs (morphine, atracurium), and catecholamines (worsen mediator release).',
            ]}
          />
          <TopicFaqs faqs={endocrineDiseaseFaqs} />
        </ExamSection>
      }
    />
  );
};

export default EndocrineDiseaseTopic;
