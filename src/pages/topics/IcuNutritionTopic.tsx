import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import { icuNutritionQuestions } from "@/data/quizzes";
import RefeedingRiskCalculatorDiagram from "@/components/diagrams/intensive-care/RefeedingRiskCalculatorDiagram";
import RefeedingSyndromeAnimation from "@/components/diagrams/intensive-care/RefeedingSyndromeAnimation";
import EnergyProteinTargetDiagram from "@/components/diagrams/intensive-care/EnergyProteinTargetDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import InlineRef from "@/components/references/InlineRef";

const icuNutritionFaqs: Array<[string, string]> = [
  ["When should enteral nutrition be started in the critically ill?", "Within 24–48 h of ICU admission once haemodynamically stable, even at trophic rates; early EN preserves gut mucosa and reduces infectious complications (ESPEN 2019, ASPEN/SCCM 2016)."],
  ["What energy and protein targets should be used in ICU?", "Aim for 20–25 kcal/kg/day (ramp up from day 3–7) and 1.3 g/kg/day protein using actual body weight; indirect calorimetry is preferred when available to avoid over- and under-feeding."],
  ["How is refeeding syndrome recognised and prevented?", "Risk factors include BMI <16, >10 days starvation, low pre-feed K/Mg/PO₄; start at ≤10 kcal/kg/day, replace phosphate, potassium, magnesium and thiamine, and increase calories over 4–7 days while monitoring electrolytes daily."],
];

const objectives = [
  "Describe the metabolic response to critical illness and its implications for feeding strategy",
  "Compare enteral and parenteral nutrition, including timing, indications and complications",
  "Calculate energy and protein targets for a critically ill patient using ESPEN 2019 guidance",
  "Identify patients at risk of refeeding syndrome using NICE CG32 and outline a safe restart regimen",
  "Summarise the key ICU nutrition trials (NICE-SUGAR, EPaNIC, TARGET, CALORIES) and their impact on practice",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Refeeding-risk patient — first 24 h plan",
    scenario: (
      <>
        A 58-year-old with chronic alcohol misuse and recurrent admissions for pancreatitis is admitted to ICU with aspiration pneumonia. BMI 16.5, weight loss ~12% over 4 months, negligible oral intake for 8 days. Bloods: <strong>K⁺ 3.1, PO₄ 0.55, Mg²⁺ 0.62 mmol/L</strong>.
      </>
    ),
    working: (
      <ul className="list-disc list-inside space-y-1">
        <li>NICE CG32: BMI &lt;18.5, weight loss &gt;10%, &gt;5 days little intake, alcohol misuse, low pre-feed K⁺/PO₄/Mg²⁺ → <strong>≥4 minor + 1 major criteria → high risk</strong>.</li>
        <li>Start at <strong>10 kcal/kg/day</strong> (≈ 700 kcal/day if 70 kg) for first 24 h.</li>
        <li>IV thiamine 200–300 mg ≥30 min before feeding, then daily for 3–10 days; multivitamin + trace elements.</li>
        <li>Replace electrolytes <em>during</em> feeding (do not delay feed for normalisation).</li>
        <li>Increase calories slowly over 4–7 days to full ESPEN target. Daily K⁺/PO₄/Mg²⁺ for first week.</li>
      </ul>
    ),
    answer: (
      <>
        High refeeding risk. Begin 10 kcal/kg/day with parenteral thiamine and aggressive electrolyte replacement; titrate to full target over 4–7 days under daily biochemistry surveillance.
      </>
    ),
    cites: ["ESPEN 2019"],
  },
  {
    title: "Energy &amp; protein target — day 5 ICU",
    scenario: (
      <>
        80 kg male, day 5 of ICU stay following pneumonia and septic shock. Now off vasopressors, weaning sedation, FiO₂ 0.4. No indirect calorimetry available.
      </>
    ),
    working: (
      <ul className="list-disc list-inside space-y-1">
        <li>Late acute phase (day 3–7): ESPEN target 80–100% of REE.</li>
        <li>Predictive: <strong>25 kcal/kg/day × 80 kg = 2000 kcal/day</strong>.</li>
        <li>Protein 1.3–1.5 g/kg/day → <strong>104–120 g/day</strong>.</li>
        <li>Deliver enterally via NG; switch to NJ only if persistent high gastric aspirates &gt;500 mL/4 h despite prokinetics.</li>
      </ul>
    ),
    answer: (
      <>
        Aim for <strong>~2000 kcal/day with 104–120 g protein</strong> via enteral feed. Reassess daily; protein delivery often lags calories — protein matters more for outcomes.
      </>
    ),
    cites: ["EPaNIC 2011"],
  },
  {
    title: "Glycaemic control after EPaNIC and NICE-SUGAR",
    scenario: (
      <>
        A junior trainee asks why your ICU targets glucose 6–10 mmol/L rather than the &quot;tight&quot; 4.5–6 mmol/L range of the original Leuven trials.
      </>
    ),
    working: (
      <ul className="list-disc list-inside space-y-1">
        <li><strong>NICE-SUGAR (2009, n = 6104):</strong> intensive control (4.5–6) increased 90-day mortality (27.5% vs 24.9%) driven by severe hypoglycaemia (6.8% vs 0.5%).</li>
        <li><strong>EPaNIC (2011):</strong> withholding PN until day 8 reduced infections, ICU length of stay and ICU-acquired weakness vs early PN supplementation of insufficient EN.</li>
        <li>Combined message: avoid hypoglycaemia and avoid early aggressive caloric loading; permit modest hyperglycaemia; let EN ramp up alone for the first week unless contraindicated.</li>
      </ul>
    ),
    answer: (
      <>
        Target glucose <strong>6–10 mmol/L</strong> with EN-first strategy; defer PN to ~day 7 unless EN is contraindicated. The harm of hypoglycaemia and early overfeeding outweighs the theoretical benefit of normoglycaemia.
      </>
    ),
    cites: ["NICE-SUGAR 2009"],
  },
];

const IcuNutritionTopic = () => {
  return (
    <TopicTemplate
      title="Nutrition in Critical Care"
      subtitle="FRCA Final / FFICM / EDIC — Intensive Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      topicId="icu-nutrition"
      topicTitle="Nutrition in Critical Care"
      quizQuestions={icuNutritionQuestions}
      workedExamples={workedExamples}
      keyPoints={[
        { text: "Start enteral nutrition within 48 h of ICU admission — maintains gut integrity, reduces translocation", cites: ["NICE CG32", "ESICM Early EN 2017"] },
        { text: "ESPEN target 20–25 kcal/kg/day; in the first 48 h give ≤70% of REE (avoid early overfeeding)", cites: ["BJA Educ 2016"] },
        { text: "Protein 1.2–2.0 g/kg/day is the most important macronutrient target; protein delivery often lags calories", cites: ["ESPEN 2019"] },
        { text: "NICE-SUGAR: target glucose 6–10 mmol/L — tight control (4.5–6) increases mortality via hypoglycaemia", cites: ["EPaNIC 2011"] },
        { text: "EPaNIC: defer parenteral nutrition until day 7–8 if EN insufficient — early PN increases infections and weakness", cites: ["NICE-SUGAR 2009"] },
        { text: "TARGET: energy-dense (1.5 kcal/mL) feed gives no mortality benefit over 1.0 kcal/mL — more is not better", cites: ["NICE CG32"] },
        { text: "Refeeding syndrome (NICE CG32): start 10 kcal/kg/day (5 if extreme), thiamine 200–300 mg before feeding, replace K⁺/PO₄/Mg²⁺ during (not before) feed", cites: ["BJA Educ 2016"] },
        { text: "Indirect calorimetry is the gold standard for energy targeting; predictive equations are second best", cites: ["ESPEN 2019"] },
      ]}
      sectionSources={{
        objectives: ["ESPEN 2019", "NICE CG32"],
        workedExamples: ["NICE CG32", "EPaNIC 2011", "NICE-SUGAR 2009", "ESPEN 2019"],
        keyPoints: ["ESPEN 2019", "BJA Educ 2016", "NICE CG32", "EPaNIC 2011", "NICE-SUGAR 2009"],
      }}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC], curriculumCodes: ["CC1.4"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
      }}
      coreConcepts={
        <>
        <>
          <ExamSection exams={[Exam.FFICM, Exam.EDIC]} curriculumCodes={["CC1.4"]}>
            <CollapsibleSubsection title="Metabolic Response to Critical Illness" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Critical illness induces a catabolic state with hyperglycaemia, protein catabolism and lipolysis. The metabolic response has two phases:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Acute / Ebb (0–48 h)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Sympathetic activation, stress hormones (cortisol, catecholamines, glucagon). Insulin resistance with high endogenous glucose production. Trophic feeds only — overfeeding is harmful.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Flow / Catabolic (48 h – weeks)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Hypermetabolism, muscle wasting (up to 1 kg/day in the first week). Negative nitrogen balance. Gradual increase to target calories. Recovery phase: anabolism, rehabilitation.
                </p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Enteral vs Parenteral Nutrition">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Parameter</th>
                    <th className="text-left py-2 text-foreground font-semibold">Enteral (EN)</th>
                    <th className="text-left py-2 text-foreground font-semibold">Parenteral (PN)</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Timing</td><td>Within 48 h of ICU admission</td><td>Consider if EN fails or contraindicated by day 7 (EPaNIC)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Benefits</td><td>Maintains gut integrity, reduces bacterial translocation, cheaper, fewer infections</td><td>Reliable calorie delivery, no GI requirement</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Risks</td><td>Aspiration, diarrhoea, refeeding syndrome, GI intolerance</td><td>Line sepsis, hepatic steatosis, overfeeding, hyperglycaemia, hypertriglyceridaemia</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Access</td><td>NG / NJ tube. Post-pyloric only if persistent high aspirates despite prokinetics</td><td>CVC — dedicated lumen, strict asepsis</td></tr>
                </tbody>
              </table>
            </div>
            <div className="p-4 rounded-lg border border-border mt-4">
              <p className="font-semibold text-foreground text-sm">
                Complications of parenteral nutrition — and how to prevent them
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-2">
                <li>
                  <strong>Catheter-related bloodstream infection</strong> — the dominant complication.
                  Use a dedicated, never-broached lumen, full asepsis for insertion and access, a
                  chlorhexidine-impregnated dressing and daily line review; remove the line for
                  unexplained fever with positive paired cultures. PICC/CVC insertion also carries
                  pneumothorax, arterial puncture and catheter-related thrombosis (up to 10–30%
                  radiologically).
                </li>
                <li>
                  <strong>Mechanical / occlusion problems</strong> — line fracture, kinking, lipid or
                  calcium-phosphate precipitate. Never flush against resistance; do not add drugs to the
                  PN bag.
                </li>
                <li>
                  <strong>Overfeeding syndrome</strong> — excess calories cause hyperglycaemia, lipogenesis
                  and hepatic steatosis, a rise in CO₂ production with failure to wean from the ventilator,
                  and fluid overload. Cap glucose delivery at ≈ 4–5 mg/kg/min and use indirect calorimetry
                  where available.
                </li>
                <li>
                  <strong>Hyperglycaemia</strong> — target 6–10 mmol/L with a variable-rate insulin
                  infusion; never stop PN abruptly without glucose cover (rebound hypoglycaemia).
                </li>
                <li>
                  <strong>Hypertriglyceridaemia</strong> — check triglycerides at baseline and twice
                  weekly; if &gt; 4.5 mmol/L reduce or interrupt the lipid emulsion (risk of fat-overload
                  syndrome, pancreatitis, impaired immune function, and interference with lab assays).
                </li>
                <li>
                  <strong>PN-associated liver disease (PNALD / IFALD)</strong> — steatosis within 1–2 weeks,
                  then cholestasis with a rising ALP/GGT and conjugated bilirubin; contributed to by
                  overfeeding, excess soybean lipid, lack of enteral stimulation and sepsis. Prevent by
                  giving any tolerated trophic EN, cycling PN, limiting lipid to ≤ 1 g/kg/day and using
                  mixed-oil / fish-oil-containing emulsions. Acalculous cholecystitis and biliary sludge
                  result from gallbladder stasis.
                </li>
                <li>
                  <strong>Electrolyte and micronutrient derangement</strong> — refeeding syndrome
                  (PO₄³⁻/K⁺/Mg²⁺ collapse — give thiamine first), hyponatraemia, metabolic acidosis, and
                  after weeks of PN, deficiencies of thiamine, selenium, zinc, copper and essential fatty
                  acids. Gut atrophy and loss of mucosal immunity occur when nothing is given enterally.
                </li>
                <li>
                  <strong>Monitoring bundle:</strong> daily U&amp;E, glucose, PO₄³⁻/Mg²⁺/Ca²⁺ and fluid
                  balance in the first week; twice-weekly LFTs and triglycerides; weekly CRP, full blood
                  count and (in long-term PN) trace elements and vitamins; daily weight and line-site
                  inspection.
                </li>
              </ul>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Calorie & Protein Targets (ESPEN 2019)">
            <div className="my-4">
              <EnergyProteinTargetDiagram />
            </div>
            <div className="space-y-2">
              {[
                { target: "Energy", detail: "20–25 kcal/kg/day (actual body weight in non-obese). Acute phase: ≤70% of REE; full target by day 4–7. Indirect calorimetry is gold standard. Avoid overfeeding (lipogenesis, hyperglycaemia, ↑CO₂ load)." },
                { target: "Protein", detail: "1.2–2.0 g/kg/day (higher in burns / trauma / CRRT). Protein delivery is the single most outcome-relevant macronutrient target — often under-delivered when calories alone are tracked." },
                { target: "Glucose", detail: "Target 6–10 mmol/L (NICE-SUGAR). Tight control 4.5–6 mmol/L harmful: increased severe hypoglycaemia and 90-day mortality." },
                { target: "Micronutrients", detail: "Thiamine, vitamin B compound, multivitamins and trace elements (Zn, Se, Cu) for prolonged ICU stay, refeeding risk, CRRT and burns." },
              ].map((t) => (
                <div key={t.target} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{t.target}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t.detail}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FFICM, Exam.EDIC]} curriculumCodes={["CC1.4"]}>
            <CollapsibleSubsection title="Micronutrients">
              <p className="text-muted-foreground leading-relaxed mb-3">
                Trace element and vitamin deficiency is common but under-recognised in critical illness <InlineRef topicId="icu-nutrition" refLabel="Curr Opin Anaesthesiol 2018 (ICU nutrition)" />. Groups at particular risk include patients on <strong>CRRT</strong> (sieving losses of water-soluble vitamins and trace elements across the filter), those who have received <strong>large-volume fluid resuscitation</strong> (dilution), <strong>burns</strong> and other large exudative losses, <strong>malabsorption/short bowel</strong>, <strong>chronic alcohol excess</strong>, prolonged ICU stay, and anyone meeting <strong>NICE CG32</strong> refeeding-risk criteria.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Thiamine (vitamin B1)</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Essential co-factor for pyruvate dehydrogenase, α-ketoglutarate dehydrogenase and transketolase; deficiency blocks aerobic entry of pyruvate into the Krebs cycle, forcing anaerobic metabolism and causing a lactic acidosis. Indications beyond refeeding include suspected septic shock with an otherwise unexplained metabolic/lactic acidosis, chronic alcohol excess, and suspected Wernicke&apos;s encephalopathy. Typical dosing: 100 mg IV daily as prophylaxis, 200–300 mg IV daily in high-risk patients, and Pabrinex for suspected Wernicke&apos;s.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Vitamin C</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Antioxidant and co-factor for catecholamine and cortisol synthesis; plasma levels are frequently low in sepsis. Early observational and small RCT data suggested benefit from high-dose vitamin C combined with hydrocortisone and thiamine, but larger, later RCTs — including LOVIT — did not confirm a mortality benefit (and suggested possible harm), so high-dose vitamin C is not standard of care.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Selenium</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Co-factor for glutathione peroxidase and part of antioxidant defence; lost in burns and CRRT effluent. High-dose selenium monotherapy has not shown outcome benefit in trials.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Zinc</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Required for wound healing and immune function; significant losses occur with diarrhoea, burns and high-output stoma losses.
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Practical approach <InlineRef topicId="icu-nutrition" refLabel="ESPEN 2019" />: replace deficiencies to <strong>normal</strong>, not supraphysiological, levels — high-dose antioxidant/vitamin supplementation has not translated into outcome benefit in large trials. All patients receiving parenteral nutrition should receive a daily multivitamin and trace-element preparation as standard.
              </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FFICM, Exam.EDIC]} curriculumCodes={["CC1.4"]}>
            <CollapsibleSubsection title="Refeeding Syndrome">
            <div className="my-4">
              <RefeedingRiskCalculatorDiagram />
            </div>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Life-threatening shifts in fluids and electrolytes when nutrition is restarted after prolonged starvation. Insulin surge drives K⁺, PO₄³⁻ and Mg²⁺ intracellularly, causing arrhythmias, cardiac failure, respiratory muscle weakness and Wernicke&apos;s encephalopathy. Use the calculator above for stratification.
            </p>
            <div className="my-4">
              <RefeedingSyndromeAnimation />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Risk factors (NICE CG32)</p>
                <p className="text-sm text-muted-foreground mt-1">
                  BMI &lt;18.5, unintentional weight loss &gt;10% in 3–6 mo, little / no intake &gt;5 days, low pre-feeding K⁺ / PO₄ / Mg²⁺, alcohol misuse, chemotherapy, insulin, antacids or diuretics. <strong>Extreme</strong>: BMI &lt;14 or negligible intake &gt;15 days.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Prevention &amp; management</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Start 10 kcal/kg/day (5 kcal/kg if extreme risk). IV thiamine 200–300 mg before feeding, then daily 3–10 days. Replace K⁺/PO₄/Mg²⁺ during feeding. Daily biochemistry for the first week. Cardiac monitoring for fluid overload day 3–7.
                </p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Nutrition in the Obese Critically Ill Patient">
            <p className="text-sm text-muted-foreground mb-3">
              Obesity is not protective in critical illness: sarcopenic obesity, insulin resistance and a
              blunted ability to mobilise protein mean these patients are at high risk of muscle wasting
              while being routinely overfed if actual body weight is used.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              <li>
                <strong>Which weight?</strong> Never use actual body weight for calorie targets. Use{" "}
                <strong>indirect calorimetry</strong> where available; otherwise base targets on{" "}
                <strong>adjusted body weight</strong> = IBW + 0.33 × (ABW − IBW).
              </li>
              <li>
                <strong>Energy (ESPEN 2019 hypocaloric approach):</strong> if calorimetry is available give{" "}
                <strong>70% of measured REE</strong>. Without calorimetry, use{" "}
                <strong>11–14 kcal/kg actual body weight/day for BMI 30–50</strong> and{" "}
                <strong>22–25 kcal/kg ideal body weight/day for BMI &gt; 50</strong>.
              </li>
              <li>
                <strong>Protein is deliberately high:</strong> <strong>1.3 g/kg adjusted body weight/day</strong>{" "}
                (ESPEN); the ASPEN alternative is 2.0 g/kg IBW/day for BMI 30–40 and up to 2.5 g/kg
                IBW/day for BMI ≥ 40. High protein with restricted calories preserves lean mass while
                promoting mobilisation of fat stores.
              </li>
              <li>
                <strong>Practical cautions:</strong> avoid a permissive-underfeeding approach in patients at
                refeeding risk or after bariatric surgery; screen for thiamine, vitamin D, B₁₂, iron, folate,
                zinc and copper deficiency (common post-bariatric) and supplement before feeding; monitor
                glucose closely; and reassess targets as the acute phase resolves. Deconditioning and
                pressure-area risk make early mobilisation and physiotherapy part of the nutrition plan.
              </li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Special Populations — ECMO / ECLS and Severe Pancreatitis">
            <p className="text-sm text-muted-foreground mb-3">
              Two groups are repeatedly cited in vivas as &lsquo;too sick to feed&rsquo; when in fact early
              enteral nutrition is both feasible and beneficial.
            </p>
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">
                  ECMO and other extracorporeal life support
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Feed early and enterally.</strong> Multiple cohorts show early EN on VV- and
                  VA-ECMO is safe and tolerated in ~85% of patients; ECMO itself is not a contraindication
                  and non-occlusive bowel ischaemia is rare. Start within 24–48 h at trophic rates once
                  flows are stable. Energy needs are frequently{" "}
                  <em>over</em>-estimated because the oxygenator removes CO₂ — standard indirect
                  calorimetry is invalid unless membrane gas exchange is accounted for, so use
                  weight-based targets (20–25 kcal/kg/day) with protein 1.5–2.0 g/kg/day. Expect
                  circuit-related losses and increased requirements: heat loss, protein loss, and
                  micronutrient/vitamin (thiamine, selenium, zinc) and phosphate depletion, magnified when
                  CRRT runs in series — add 0.2 g/kg/day protein for CRRT. Sedation, opioids, catecholamines
                  and prone positioning cause gastroparesis; use prokinetics and post-pyloric feeding rather
                  than stopping EN, and remember propofol contributes ~1.1 kcal/mL of lipid to the calorie
                  budget. Reserve supplemental PN for persistent failure to reach 60% of target by day 4–7.
                </p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Severe acute pancreatitis</p>
                <p className="text-sm text-muted-foreground mt-1">
                  &lsquo;Gut rest&rsquo; is obsolete. Offer <strong>early oral diet as tolerated</strong> in
                  mild disease, and in predicted severe or intolerant patients start{" "}
                  <strong>enteral nutrition within 24–72 h</strong> — it reduces infected necrosis,
                  multi-organ failure and mortality compared with PN by maintaining gut barrier function.
                  Use a <strong>nasogastric tube first</strong> (non-inferior to nasojejunal in trials, and
                  quicker to place); switch to nasojejunal for persistent gastric intolerance, gastric
                  outlet obstruction or duodenal compression by a collection. A standard polymeric feed is
                  adequate; semi-elemental or MCT-containing feeds only if malabsorption is evident. Target
                  25–30 kcal/kg/day and 1.2–1.5 g/kg/day protein, ramping up over 3–7 days, with thiamine
                  and full micronutrient cover (most cases are alcohol-related and refeeding risk is high).
                  Check triglycerides — hypertriglyceridaemic pancreatitis requires lipid restriction. Use{" "}
                  <strong>PN only if EN is truly impossible</strong> (complete obstruction, uncontrolled
                  abdominal compartment syndrome, high-output enterocutaneous fistula, or failure to meet
                  60% of target enterally by day 4–7). Rising intra-abdominal pressure warrants reducing to
                  trophic feeding rather than stopping outright. Exocrine insufficiency (steatorrhoea,
                  weight loss) needs pancreatic enzyme replacement, and new diabetes is common after
                  extensive necrosis.
                </p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Key Nutrition Trials">
            <div className="space-y-2">
              {[
                { trial: "NICE-SUGAR (2009)", result: "Intensive glucose control (4.5–6 mmol/L) increased 90-day mortality vs conventional (6–10 mmol/L), driven by severe hypoglycaemia. Standard of care: target 6–10." },
                { trial: "EPaNIC (2011)", result: "Late PN (day 8) vs early PN (day 3) — late PN reduced infections, ICU length of stay and ICU-acquired weakness. Do not start PN early to top up insufficient EN." },
                { trial: "TARGET (2018)", result: "Energy-dense (1.5 kcal/mL) vs standard (1.0 kcal/mL) enteral feed — no difference in 90-day mortality. More is not better." },
                { trial: "CALORIES (2014)", result: "Early PN vs early EN in ICU — no difference in 30-day mortality. EN remains preferred (gut integrity, cost, fewer infections)." },
                { trial: "NUTRIREA-2 / 3 (2018, 2023)", result: "Early hypocaloric EN vs early isocaloric PN in shock — no mortality difference; PN had more vomiting and bowel ischaemia signal. Reinforces EN-first." },
              ].map((t) => (
                <div key={t.trial} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="font-semibold text-foreground text-sm">{t.trial}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t.result}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "Enteral feeding preferred — start within 24–48 h if haemodynamically stable; reduces infection vs parenteral.",
              "Target 25–30 kcal/kg/day, protein 1.2–2.0 g/kg/day; trophic feeding in early acute phase is acceptable.",
              "Refeeding syndrome: drop in PO₄³⁻/K⁺/Mg²⁺ when feeding restarts after starvation — start at 5–10 kcal/kg/day, replace electrolytes.",
              "Parenteral nutrition: reserve for those who cannot tolerate enteral after 7 days; central access, daily LFTs/triglycerides.",
              "Stress hyperglycaemia: target glucose 6–10 mmol/L (NICE-SUGAR) — tight control increases mortality.",
            ]}
          />
        </>
          <TopicFaqs faqs={icuNutritionFaqs} />
        </>
      }
    />
  );
};

export default IcuNutritionTopic;
