import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { corticosteroidsQuestions } from "@/data/quizzes";
import { CorticosteroidPharmacodynamicsDiagram } from "@/components/diagrams/pharmacology/CorticosteroidPharmacodynamicsDiagram";
import { HPAAxisSuppressionDiagram } from "@/components/diagrams/pharmacology/HPAAxisSuppressionDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";

const corticosteroidsFaqs: Array<[string, string]> = [
  [
    "What is the equivalent dose conversion between common steroids?",
    "Hydrocortisone 20 mg = prednisolone 5 mg = methylprednisolone 4 mg = dexamethasone 0.75 mg. Mineralocorticoid activity: hydrocortisone ++, prednisolone +, methylprednisolone trace, dexamethasone none. For pure glucocorticoid replacement use dexamethasone; for shock/Addisonian crisis use hydrocortisone (mineralocorticoid effect retains Na⁺/water)."
  ],
  [
    "When is perioperative steroid cover required and what regimen is used?",
    "Required for patients on >5 mg prednisolone/day for >3 weeks (HPA suppression). Minor surgery (e.g. hernia): usual oral dose + hydrocortisone 25 mg IV at induction. Moderate surgery (e.g. hemicolectomy): usual dose + 25 mg at induction then 100 mg over 24 h. Major surgery (e.g. laparotomy, cardiac surgery): usual dose + 50 mg at induction then 200 mg over 24 h, continued while the stress response persists then tapered. Continue maintenance dose throughout. Failure to cover risks Addisonian crisis: profound hypotension unresponsive to fluids/pressors, hyponatraemia, hyperkalaemia."
  ],
  [
    "What are the major side effects of long-term corticosteroids?",
    "Cushingoid (truncal obesity, moon face, buffalo hump), osteoporosis (DXA + bisphosphonates if >5 mg pred for >3 months), hyperglycaemia/diabetes, hypertension, peptic ulcer (especially with NSAIDs), proximal myopathy, immunosuppression, skin thinning/bruising, cataracts, glaucoma, mood disturbance/psychosis, growth retardation in children, adrenal suppression. Withdrawal must be gradual after >3 weeks of treatment to allow HPA recovery."
  ]
];

const objectives = [
  "Describe glucocorticoid receptor signalling and distinguish transrepression from transactivation",
  "Compare the relative glucocorticoid and mineralocorticoid potencies of clinical steroids",
  "Identify patients at risk of HPA axis suppression and prescribe appropriate perioperative steroid cover",
  "Recognise and treat an Addisonian crisis in the perioperative period",
  "Manage perioperative diabetes (variable-rate insulin infusion, basal insulin continuation, target glucose)",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Steroid cover for major surgery in a chronic prednisolone user",
    scenario:
      "A 64-year-old woman on prednisolone 10 mg/day for polymyalgia rheumatica (5 years) is having an open hemicolectomy. What perioperative steroid cover do you prescribe?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Decide if HPA suppression is likely.</strong> Prednisolone ≥ 5 mg/day for &gt; 3 weeks → assume axis is suppressed.</li>
          <li><strong>Convert to hydrocortisone equivalent.</strong> 10 mg prednisolone × 4 (potency) = 40 mg hydrocortisone equivalent (her endogenous output is essentially abolished).</li>
          <li><strong>Stratify the surgical stress.</strong> Hemicolectomy = MAJOR surgery (per AAGBI/AOMRC 2020).</li>
          <li><strong>Prescribe.</strong> Continue usual prednisolone 10 mg PO morning of surgery + <strong>hydrocortisone 50 mg IV at induction</strong>, then <strong>200 mg/24 h</strong> (continuous infusion, or 50 mg IV 6-hourly) for 24 h. Wean to oral usual dose over 48–72 h.</li>
          <li><strong>Monitor.</strong> BP, glucose 4-hourly, U&amp;E daily. Watch for refractory hypotension → suspect adrenal crisis.</li>
        </ol>
        <p className="font-semibold text-foreground mt-2">Quick reference (AOMRC 2020)</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Minor (e.g. cataract, hernia): usual dose + hydrocortisone 25 mg IV at induction.</li>
          <li>Moderate (e.g. lap chole, hemicolectomy): usual dose + hydrocortisone 25 mg IV at induction → 100 mg over 24 h.</li>
          <li>Major (e.g. laparotomy, cardiac surgery): usual dose + hydrocortisone 50 mg IV at induction → 200 mg over 24 h, then wean as stress resolves.</li>
        </ul>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Stopping the patient's usual steroid 'because we'll cover with hydrocortisone' — adds a withdrawal hit on top of the surgical hit.</li>
            <li>Forgetting that inhaled (high-dose fluticasone), topical, and intra-articular steroids can also suppress the HPA axis.</li>
            <li>Using dexamethasone for cover — gives no mineralocorticoid effect, doesn't replace cortisol's full action.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Continue her usual prednisolone, give hydrocortisone 50 mg IV at induction and 200 mg over 24 h, then wean back to her baseline dose over 48–72 h. Monitor BP and glucose closely; treat any refractory hypotension as an Addisonian crisis with a 100 mg bolus.",
    cites: ["BJA Educ 2012"],
  },
  {
    title: "Managing a patient with type 1 diabetes for elective surgery",
    scenario:
      "A 28-year-old man with type 1 DM (HbA1c 58 mmol/mol) on Lantus 24 units nocte and Novorapid with meals is first on the morning list for an arthroscopy. CBG on arrival 9.2 mmol/L. How do you proceed?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Assess length of starvation.</strong> One missed meal only → no need for VRIII (per CPOC 2021 guidance).</li>
          <li><strong>Continue basal insulin.</strong> Lantus (glargine) at 80% of usual dose the night before. Type 1 patients <strong>must never</strong> stop basal insulin (DKA within hours).</li>
          <li><strong>Omit short-acting boluses.</strong> Hold Novorapid the morning of surgery while NBM.</li>
          <li><strong>Check CBG hourly.</strong> Target 6–10 mmol/L (acceptable 4–12).</li>
          <li><strong>Have rescue plan.</strong> If CBG &gt; 12 → correction Novorapid (typical correction = 1 unit per 3 mmol above target). If CBG &lt; 4 → 100 mL of 20% dextrose IV.</li>
          <li><strong>Restart usual regimen</strong> with the first meal post-op; check ketones if CBG &gt; 12 mmol/L.</li>
        </ol>
        <p className="font-semibold text-foreground mt-2">When to use VRIII instead</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Missing &gt; 1 meal, poor diabetes control (HbA1c &gt; 69 mmol/mol), emergency surgery, or established DKA risk.</li>
          <li>VRIII = Actrapid 50 units in 50 mL 0.9% NaCl, run via dedicated line + glucose-containing maintenance fluid (e.g. 5% dextrose + KCl 20 mmol/L).</li>
        </ul>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Stopping Lantus in a type 1 patient → DKA on the table.</li>
            <li>Running VRIII without a substrate (dextrose-containing fluid) → hypoglycaemia.</li>
            <li>Forgetting to scan for ketones if hyperglycaemic — euglycaemic DKA is now common with SGLT2 inhibitors (stop 3 days pre-op).</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Reduce Lantus to 80% the night before, omit morning Novorapid, place him first on the list, and check CBG hourly with a target 6–10 mmol/L. No VRIII needed for one missed meal. Treat hypoglycaemia with 20% dextrose; restart usual insulin with the first post-op meal.",
    cites: ["Peck & Hill Ch.17"],
  },
];

const CorticosteroidsTopic = () => {
  return (
    <TopicTemplate
      title="Corticosteroids & Endocrine Pharmacology"
      subtitle="Glucocorticoid pharmacodynamics, perioperative cover, and diabetes/thyroid drugs"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
      topicId="corticosteroids"
      topicTitle="Corticosteroids & Endocrine Pharmacology"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={corticosteroidsQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["RCoA Primary — Pharmacology", "RCoA Final — Clinical Anaesthesia"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: [
          "Peck & Hill Ch.17",
          "AAGBI Steroid Cover",
        ],
        workedExamples: [
          "BJA Educ 2012",
          "BJA Educ 2012",
          "BJA Educ 2012",
        
          "Peck & Hill Ch.17",
        ],
        keyPoints: [
          "Peck & Hill Ch.17",
          "AAGBI Steroid Cover",
        
          "BJA Educ 2012",
        ],
      }}
      keyPoints={[
        { text: "Dexamethasone: 25× glucocorticoid potency of hydrocortisone, ZERO mineralocorticoid effect, long duration (36–72 h)", cites: ["AAGBI Steroid Cover"] },
        { text: "HPA suppression likely if ≥ 5 mg prednisolone/day for &gt; 3 weeks — perioperative steroid cover needed (AAGBI/AOMRC 2020)", cites: ["BJA Educ 2012"] },
        { text: "Addisonian crisis: refractory hypotension + hypoglycaemia + hyperkalaemia + hyponatraemia. IV hydrocortisone 100 mg", cites: ["Peck & Hill Ch.17"] },
        { text: "Type 1 diabetes: NEVER stop basal insulin (DKA risk). Continue Lantus at 80% the night before surgery", cites: ["AAGBI Steroid Cover"] },
        { text: "Carbimazole inhibits thyroid peroxidase; takes 4–6 weeks. PTU also blocks peripheral T₄→T₃. Risk: agranulocytosis", cites: ["BJA Educ 2012"] },
        { text: "SGLT2 inhibitors → euglycaemic DKA. Stop 3 days before elective surgery (CPOC 2021)", cites: ["Peck & Hill Ch.17"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="pd" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Corticosteroid Pharmacodynamics" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Corticosteroids bind the cytoplasmic glucocorticoid receptor (GR) → nuclear translocation → gene transcription modulation. Therapeutic anti-inflammatory effects are largely <strong>transrepression</strong> (↓ NF-κB, ↓ cytokines, ↓ COX-2, ↓ phospholipase A₂ via lipocortin-1); many side effects come from <strong>transactivation</strong> (gluconeogenesis, Na⁺ retention). A small subset of effects is <strong>non-genomic</strong> and acts within minutes.
            </p>
            <div className="mb-4 grid md:grid-cols-2 gap-4 text-sm">
              <div className="rounded-lg border border-border p-4">
                <p className="font-semibold text-foreground">Genomic actions (hours to days)</p>
                <ul className="mt-1 space-y-1 text-muted-foreground list-disc list-inside">
                  <li><strong>Receptor step</strong>: the lipophilic steroid crosses the membrane and binds the cytoplasmic glucocorticoid receptor, which sheds chaperone proteins and translocates to the nucleus.</li>
                  <li><strong>Transactivation</strong>: two receptor molecules dimerise and bind glucocorticoid response elements (GREs) in DNA, recruiting co-activators and upregulating transcription — e.g. PEPCK and glucose-6-phosphatase. This underlies most metabolic side effects (hyperglycaemia, protein catabolism, fat redistribution).</li>
                  <li><strong>Transrepression</strong>: a receptor monomer binds pro-inflammatory transcription factors such as NF-κB and AP-1, preventing them reaching DNA, so cytokine, COX-2 and inducible NOS transcription falls. This carries most of the therapeutic anti-inflammatory effect.</li>
                </ul>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="font-semibold text-foreground">Non-genomic actions (minutes) and clinical relevance</p>
                <ul className="mt-1 space-y-1 text-muted-foreground list-disc list-inside">
                  <li>Membrane-associated receptor and physicochemical effects on cell membranes and kinase cascades explain the rapid haemodynamic improvement after IV hydrocortisone in adrenal crisis, before any transcriptional change.</li>
                  <li>Separating the two genomic pathways is the rationale for selective glucocorticoid receptor agonists (SEGRAs/SEGRMs), designed to maximise transrepression while minimising transactivation and therefore metabolic harm.</li>
                  <li>Dose matters: anti-inflammatory transrepression predominates at lower doses, while transactivation-driven metabolic effects escalate with dose and duration.</li>
                </ul>
              </div>
            </div>
            <CorticosteroidPharmacodynamicsDiagram />
            <div className="mt-4">
              <HPAAxisSuppressionDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="potency" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Steroid potency & duration">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Steroid</th>
                  <th className="text-left py-2 text-foreground font-semibold">Glucocorticoid Potency</th>
                  <th className="text-left py-2 text-foreground font-semibold">Mineralocorticoid</th>
                  <th className="text-left py-2 text-foreground font-semibold">Duration</th>
                </tr></thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Hydrocortisone</td><td>1</td><td>1</td><td>Short (8–12 h)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Prednisolone</td><td>4</td><td>0.8</td><td>Intermediate (12–36 h)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Methylprednisolone</td><td>5</td><td>0.5</td><td>Intermediate</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Dexamethasone</td><td>25</td><td>0</td><td>Long (36–72 h)</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Fludrocortisone</td><td>10</td><td>125</td><td>Intermediate (mineralocorticoid replacement)</td></tr>
                </tbody>
              </table>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="cover" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RCoA Final — Clinical Anaesthesia"]}>
            <CollapsibleSubsection title="Perioperative Steroid Cover (AAGBI/AOMRC 2020)">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>HPA suppression</strong>: likely if prednisolone ≥ 5 mg/day for &gt; 3 weeks (or equivalent), Cushing's appearance, or recent cessation of long-term steroids</li>
              <li><strong>Minor surgery</strong> (e.g. cataract, hernia): usual dose + hydrocortisone 25 mg IV at induction</li>
              <li><strong>Moderate surgery</strong> (e.g. hemicolectomy, joint replacement): usual dose + hydrocortisone 25 mg IV at induction then 100 mg over 24 h (infusion or 25 mg 6-hourly)</li>
              <li><strong>Major surgery</strong> (e.g. laparotomy, cardiac surgery): usual dose + hydrocortisone 50 mg IV at induction then 200 mg over 24 h (infusion or 50 mg 6-hourly), continued while the stress response persists then tapered <InlineRef topicId="corticosteroids" refLabel="Anaesthesia 2020 Glucocorticoids" /></li>
              <li><strong>Critical illness / septic shock</strong>: 200 mg/24 h is the same target dose — it is not an escalation above major surgery</li>
              <li><strong>Addisonian crisis</strong>: hypotension refractory to fluids/vasopressors + hypoglycaemia + hyperkalaemia + hyponatraemia → IV hydrocortisone 100 mg stat then 200 mg/24 h</li>
            </ul>
            </CollapsibleSubsection>
            <CollapsibleSubsection title="Assessing HPA Axis Suppression — Short Synacthen Test">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Purpose</strong>: formally assess adrenal reserve before stopping long-term steroids, or when adrenal insufficiency is suspected but the history is equivocal.</li>
              <li><strong>Procedure</strong>: baseline serum cortisol (ideally 08:00–09:00), then 250 µg synthetic ACTH (tetracosactide/Synacthen) IV or IM, with further cortisol samples at 30 and/or 60 min.</li>
              <li><strong>Interpretation</strong>: a peak cortisol above roughly 420–500 nmol/L (assay- and laboratory-dependent) indicates an adequate response; failure to reach it indicates adrenal insufficiency.</li>
              <li><strong>Clinical relevance</strong>: an adequate response in a patient with previous steroid exposure supports omitting perioperative cover; an inadequate response mandates cover. Note the test is unreliable in acute-onset (recent pituitary) disease, and exogenous hydrocortisone cross-reacts with the assay — omit the morning dose or use dexamethasone before sampling <InlineRef topicId="corticosteroids" refLabel="Anaesthesia 2020 Glucocorticoids" /></li>
            </ul>
            </CollapsibleSubsection>
            <CollapsibleSubsection title="Stress-Dose Steroids in Septic Shock">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Indication</strong>: septic shock with an ongoing vasopressor requirement despite adequate fluid resuscitation (typically noradrenaline ≥ 0.25 µg/kg/min for ≥ 4 h).</li>
              <li><strong>Rationale</strong>: critical-illness-related corticosteroid insufficiency (&ldquo;relative adrenal insufficiency&rdquo;) plus the permissive effect of cortisol on catecholamine signalling — steroids restore vascular tone and adrenoceptor responsiveness and dampen the inflammatory response.</li>
              <li><strong>Dose</strong>: hydrocortisone 200 mg/day, as a continuous infusion or 50 mg IV 6-hourly, weaned as vasopressors are withdrawn. A Synacthen test is not required before starting.</li>
              <li><strong>Evidence</strong>: ADRENAL showed faster shock resolution and shorter ICU stay but no 90-day mortality benefit, while APROCCHSS (hydrocortisone plus fludrocortisone) showed lower 90-day mortality — hence continued debate <InlineRef topicId="corticosteroids" refLabel="ADRENAL 2018" />. The Surviving Sepsis Campaign 2021 nonetheless suggests IV corticosteroids for adults with septic shock and an ongoing vasopressor requirement <InlineRef topicId="corticosteroids" refLabel="SSC 2021 Steroids" /></li>
              <li><strong>Cautions</strong>: hyperglycaemia, hypernatraemia, and possible myopathy or delayed wound healing with prolonged courses.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="insulin" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Insulin Preparations">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Type</th>
                  <th className="text-left py-2 text-foreground font-semibold">Onset</th>
                  <th className="text-left py-2 text-foreground font-semibold">Peak</th>
                  <th className="text-left py-2 text-foreground font-semibold">Duration</th>
                  <th className="text-left py-2 text-foreground font-semibold">Example</th>
                </tr></thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Rapid-acting</td><td>15 min</td><td>1–2 h</td><td>3–5 h</td><td>Novorapid, Humalog</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Short-acting</td><td>30 min</td><td>2–4 h</td><td>6–8 h</td><td>Actrapid (used in VRIII)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Intermediate</td><td>1–2 h</td><td>4–12 h</td><td>16–24 h</td><td>Insulatard (isophane/NPH)</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Long-acting</td><td>1–2 h</td><td>Flat</td><td>24 h+</td><td>Lantus (glargine), Levemir</td></tr>
                </tbody>
              </table>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="thyroid" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Thyroid Pharmacology">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Carbimazole</strong>: prodrug of methimazole. Inhibits thyroid peroxidase (iodination/coupling). Takes 4–6 weeks for full effect. Risk: agranulocytosis</li>
              <li><strong>Propylthiouracil (PTU)</strong>: also inhibits peripheral T₄ → T₃ conversion. Used in thyroid storm and first-trimester pregnancy</li>
              <li><strong>Lugol's iodine</strong>: reduces thyroid vascularity pre-surgery (Wolff-Chaikoff effect). Given 10–14 days preoperatively</li>
              <li><strong>Levothyroxine</strong>: T₄ replacement in hypothyroidism. Long half-life (~7 days) — can omit on day of surgery</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="pharmacology"
            pitfalls={[
              "Glucocorticoid potency: hydrocortisone 1, prednisolone 4, methylprednisolone 5, dexamethasone 25–30 — no mineralocorticoid effect with dex.",
              "HPA suppression likely after >5 mg prednisolone/day for >3 weeks; taper slowly to avoid adrenal crisis.",
              "Perioperative steroid cover (AAGBI): supplement if on ≥5 mg prednisolone equivalent; dose tailored to surgical stress.",
              "Side effects of chronic use: hyperglycaemia, osteoporosis, immunosuppression, peptic ulceration, proximal myopathy, mood changes.",
              "Dexamethasone is both a potent antiemetic and reduces airway oedema after prolonged intubation or croup.",
            ]}
          />
          <TopicFaqs faqs={corticosteroidsFaqs} />

        </>
      }
    />
  );
};

export default CorticosteroidsTopic;
