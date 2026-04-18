import { SectionLayout } from "@/components/SectionLayout";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { ReferencesList } from "@/components/ReferencesList";
import { endocrineDiseaseQuestions } from "@/data/quizzes";
import { SeeAlso } from "@/components/SeeAlso";
import PerioperativeDiabetesDiagram from "@/components/diagrams/PerioperativeDiabetesDiagram";

const keyPoints = [
  "Diabetes mellitus: target perioperative blood glucose 6–10 mmol/L; avoid hypoglycaemia (more dangerous than moderate hyperglycaemia); use variable-rate insulin infusion (VRIII) for patients who will miss ≥1 meal",
  "Thyroid storm (thyrotoxic crisis) has >20% mortality — treat with β-blockers, Lugol's iodine, propylthiouracil, hydrocortisone, and active cooling; never anaesthetise an uncontrolled hyperthyroid patient electively",
  "Phaeochromocytoma requires 10–14 days of α-blockade (phenoxybenzamine) before surgery, followed by β-blockade — never give β-blockers first (risk of unopposed α-stimulation and hypertensive crisis)",
  "Patients on long-term corticosteroids (≥5 mg prednisolone/day for ≥3 months) may have HPA axis suppression — give perioperative steroid supplementation based on surgical stress",
  "Addisonian crisis (acute adrenal insufficiency) presents as refractory hypotension, hypoglycaemia, and hyperkalaemia — treat with IV hydrocortisone 100 mg stat, IV fluids, and glucose",
];

const EndocrineDiseaseTopic = () => {
  return (
    <SectionLayout
      title="Endocrine Co-Existing Disease"
      subtitle="Diabetes mellitus, thyroid disease, adrenal disorders, phaeochromocytoma, and carcinoid syndrome"
      backPath="/perioperative"
      backLabel="Perioperative Medicine"
      accentColor="text-clinical"
    >
      <div className="space-y-8">
        <KeyLearningPoints points={keyPoints} />
        <PerioperativeDiabetesDiagram />

        {/* Diabetes Mellitus */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Diabetes Mellitus</h2>
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
              <h3 className="font-semibold text-foreground mb-2">Perioperative Glucose Management</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Target glucose: 6–10 mmol/L (NICE-SUGAR trial: tight control [4.5–6] increased mortality vs moderate control)</li>
                <li>Type 1 DM: never omit insulin — always requires background insulin or VRIII</li>
                <li>Type 2 DM on oral agents: omit metformin day of surgery (lactic acidosis risk); omit SGLT2 inhibitors 3 days before (euglycaemic DKA risk)</li>
                <li>Sulfonylureas: omit on morning of surgery (hypoglycaemia risk)</li>
                <li>GLP-1 agonists (semaglutide): consider omitting — associated with delayed gastric emptying and increased aspiration risk</li>
                <li>VRIII (sliding scale): dextrose 5%/10% with KCl + separate insulin syringe; hourly glucose monitoring</li>
                <li>Schedule diabetic patients first on morning list to minimise fasting duration</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Diabetic Emergencies</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>DKA: insulin infusion (0.1 U/kg/h), IV fluids, potassium replacement, monitor for cerebral oedema</li>
                <li>Hypoglycaemia (&lt;4 mmol/L): 75–100 mL of 20% glucose IV; glucagon 1 mg IM if no IV access</li>
                <li>Euglycaemic DKA: suspect in patients on SGLT2 inhibitors — normal glucose but raised ketones and metabolic acidosis</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Thyroid Disease */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Thyroid Disease</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Hyperthyroidism</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Cardiovascular effects: tachycardia, AF, increased cardiac output, widened pulse pressure</li>
                <li>Must be euthyroid before elective surgery — carbimazole/propylthiouracil + β-blocker</li>
                <li>Anaesthetic implications: exaggerated response to catecholamines, increased MAC, risk of thyroid storm</li>
                <li>Thyroid storm: hyperthermia (&gt;40°C), tachycardia, altered consciousness — mortality &gt;20%</li>
                <li>Treatment: propranolol, Lugol's iodine, PTU, dexamethasone, active cooling, ICU admission</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Hypothyroidism</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Cardiovascular: bradycardia, reduced cardiac output, pericardial effusion, diastolic hypertension</li>
                <li>Increased sensitivity to anaesthetic agents and opioids; reduced MAC</li>
                <li>Delayed gastric emptying, hypothermia, and impaired drug metabolism</li>
                <li>Mild/moderate hypothyroidism: safe to proceed with surgery; severe (myxoedema coma) is a contraindication</li>
                <li>Myxoedema coma: IV T3, hydrocortisone, rewarming, ventilatory support — ICU management</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Thyroidectomy Considerations</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Airway assessment: retrosternal extension, tracheal deviation/compression, CT thorax if stridor</li>
                <li>Postoperative complications: recurrent laryngeal nerve palsy (hoarseness), bilateral RLN palsy (stridor → reintubation), hypocalcaemia (parathyroid damage), haematoma (surgical emergency — open wound at bedside)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Adrenal Disorders */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Adrenal Disorders</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Adrenal Insufficiency & Steroid Supplementation</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Chronic steroid use (≥5 mg prednisolone/day for ≥3 months) → HPA axis suppression for up to 12 months after cessation</li>
                <li>Perioperative supplementation (2023 guidelines): minor surgery — usual dose; moderate — hydrocortisone 50 mg at induction + 25 mg q8h for 24 h; major — 100 mg at induction + 50 mg q8h for 48–72 h</li>
                <li>Addisonian crisis: refractory hypotension, hyperkalaemia, hyponatraemia, hypoglycaemia</li>
                <li>Treatment: IV hydrocortisone 100 mg stat, 0.9% saline bolus, 10% dextrose for hypoglycaemia</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Cushing's Syndrome</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Features: central obesity, hypertension, diabetes, osteoporosis, proximal myopathy, thin skin</li>
                <li>Difficult IV access, fragile tissues; anticipate difficult positioning and pressure area care</li>
                <li>Continue perioperative steroid cover — risk of adrenal crisis with adrenalectomy</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Phaeochromocytoma */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Phaeochromocytoma</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Catecholamine-secreting tumour of adrenal medulla (90%) or extra-adrenal paraganglia</li>
                <li>Classic triad: headache, sweating, palpitations with paroxysmal hypertension</li>
                <li>Preoperative preparation (10–14 days): α-blockade first (phenoxybenzamine 10 mg BD, titrate up), then β-blockade (propranolol) once α-blocked</li>
                <li>Never give β-blockers without prior α-blockade → unopposed α-stimulation → hypertensive crisis</li>
                <li>Volume expansion: patients are chronically vasoconstricted and intravascularly depleted; encourage salt and fluid intake</li>
                <li>Readiness criteria: BP &lt;130/80 sitting, postural drop present, no ST changes, nasal congestion developing</li>
                <li>Intraoperative: arterial line + CVP essential; have phentolamine (α-blocker), SNP, GTN, esmolol, and magnesium drawn up</li>
                <li>Tumour handling → catecholamine surge → hypertension/tachycardia; after venous ligation → risk of profound hypotension</li>
                <li>Postoperative: risk of hypotension (depleted catecholamines) and hypoglycaemia (rebound insulin secretion)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Carcinoid Syndrome */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Carcinoid Syndrome</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Neuroendocrine tumour secreting serotonin (5-HT), histamine, kallikrein, and prostaglandins</li>
                <li>Features: flushing, diarrhoea, bronchospasm, right-sided cardiac valvular fibrosis (carcinoid heart disease)</li>
                <li>Diagnosis: urinary 5-HIAA, serum chromogranin A</li>
                <li>Perioperative octreotide infusion (50–100 µg/h) — blocks mediator release; have bolus available</li>
                <li>Avoid histamine-releasing drugs, sympathomimetics, and suxamethonium (may trigger carcinoid crisis)</li>
                <li>Carcinoid crisis: IV octreotide 100–500 µg bolus; avoid catecholamines (may worsen); use vasopressin for hypotension</li>
              </ul>
            </div>
          </div>
        </section>

        <QuizSection questions={endocrineDiseaseQuestions} />
        <ReferencesList topicId="endocrine-disease" />
        <SeeAlso topicId="endocrine-disease" />
        <TopicCompletionToggle topicId="endocrine-disease" topicTitle="Endocrine Co-Existing Disease" />
      </div>
    </SectionLayout>
  );
};

export default EndocrineDiseaseTopic;
