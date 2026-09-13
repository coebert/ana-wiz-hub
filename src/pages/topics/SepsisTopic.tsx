import { Helmet } from "react-helmet-async";
import { DrugDosesCallout } from "@/components/icu/DrugDosesCallout";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { Exam } from "@/data/curriculum";
import { ExamSection } from "@/components/exam/ExamSection";
import { SynthesisBlock } from "@/components/topic/SynthesisBlock";
import { sepsisQuestions } from "@/data/quizzes";
import SepsisManagementDiagram from "@/components/diagrams/intensive-care/SepsisManagementDiagram";
import SepsisBiomarkerKineticsDiagram from "@/components/diagrams/intensive-care/SepsisBiomarkerKineticsDiagram";
import SepsisHostResponseDiagram from "@/components/diagrams/intensive-care/SepsisHostResponseDiagram";
import SepsisScoreCalculator from "@/components/diagrams/intensive-care/SepsisScoreCalculator";
import LactateCRTTool from "@/components/diagrams/intensive-care/LactateCRTTool";
import VasopressorLadderTool from "@/components/diagrams/intensive-care/VasopressorLadderTool";
import AlbuminFluidShiftDiagram from "@/components/diagrams/intensive-care/AlbuminFluidShiftDiagram";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { InlineRef } from "@/components/references/InlineRef";

const sepsisTocItems = [
  { id: "sepsis-3", label: "Sepsis-3 definitions & scores", group: "Core" },
  { id: "hour-1", label: "SSC Hour-1 bundle", group: "Core" },
  { id: "antibiotics", label: "Antibiotics & source control", group: "Management" },
  { id: "fluids", label: "Fluid resuscitation", group: "Management" },
  { id: "vasopressors", label: "Vasopressors & inotropes", group: "Management" },
  { id: "steroids", label: "Hydrocortisone", group: "Management" },
  { id: "septic-cardiomyopathy", label: "Septic cardiomyopathy", group: "Management" },
  { id: "special-populations", label: "Special populations", group: "Special situations" },
  { id: "specific-syndromes", label: "Specific sepsis syndromes", group: "Special situations" },
  { id: "biomarkers", label: "Lactate, CRP & PCT", group: "Monitoring" },
  { id: "trial-evidence", label: "Landmark trials", group: "Evidence" },
  { id: "pitfalls", label: "Exam pitfalls", group: "Reference" },
  { id: "faq", label: "FAQ", group: "Reference" },
];

const sepsisFaqs: Array<[string, string]> = [
  [
    "What is the Sepsis-3 definition of sepsis and septic shock?",
    "Sepsis (Singer, JAMA 2016) is life-threatening organ dysfunction caused by a dysregulated host response to infection, operationalised as a rise of ≥ 2 points in the Sequential Organ Failure Assessment (SOFA) score from baseline in the presence of suspected or proven infection. Septic shock is the subset requiring vasopressors to maintain mean arterial pressure ≥ 65 mmHg AND a serum lactate > 2 mmol/L after adequate fluid resuscitation, identifying a group with hospital mortality > 40%. qSOFA (RR ≥ 22, altered mentation, SBP ≤ 100) is a bedside prompt to consider sepsis — it is a screening tool, not a diagnostic criterion.",
  ],
  [
    "What is the Surviving Sepsis Hour-1 bundle?",
    "The 2021 Surviving Sepsis Campaign Hour-1 bundle is a recognition-to-action package that should be initiated within 1 hour of sepsis recognition: (1) measure lactate and re-measure if > 2 mmol/L; (2) obtain blood cultures before antibiotics; (3) administer broad-spectrum antibiotics; (4) begin rapid 30 mL/kg crystalloid for hypotension or lactate ≥ 4 mmol/L; (5) start vasopressors during or after fluid if MAP < 65 mmHg. For sepsis without shock where infection is possible but not proven, SSC 2021 permits up to 3 hours for antibiotics while diagnostic work-up continues.",
  ],
  [
    "Why does every hour of delayed antibiotics matter in septic shock?",
    "Observational data (Kumar 2006; Ferrer 2014; Seymour NEJM 2017 — New York State sepsis mandate cohort) show that each hour of delay in effective antibiotic administration in septic shock is associated with a ~4–8% absolute increase in in-hospital mortality. The 2017 New York data demonstrated an OR of 1.04 per hour for the 3-hour bundle. Empirical cover should target the suspected source and local resistance patterns, be broad enough to cover MRSA and Pseudomonas where clinical features suggest it, and be de-escalated once cultures and clinical course allow.",
  ],
  [
    "Is 30 mL/kg of crystalloid still the recommended initial fluid bolus?",
    "Yes — SSC 2021 retains a 30 mL/kg balanced crystalloid bolus over the first 3 hours in sepsis-induced hypoperfusion or septic shock as a weak recommendation. Subsequent boluses should be guided by dynamic measures of fluid responsiveness (passive leg raise, stroke-volume variation, end-expiratory occlusion). CLASSIC (Meyhoff, NEJM 2022) showed that a restrictive fluid strategy after initial resuscitation is safe and feasible (no mortality difference vs liberal). CLOVERS (NHLBI 2023) similarly found no difference between early vasopressor-led vs liberal-fluid strategies — both signals support 'don't over-resuscitate after the first bolus'.",
  ],
  [
    "Should I use balanced crystalloids or 0.9% saline?",
    "Balanced crystalloids (Hartmann's, Plasma-Lyte) are preferred over 0.9% saline. SMART (Semler, NEJM 2018, n = 15 802) showed a lower 30-day composite of death, new RRT, or persistent renal dysfunction with balanced solutions in critically ill adults (15.4% vs 14.3%). BaSICS (Zampieri, JAMA 2021) was neutral overall but supported safety. PLUS (Finfer, NEJM 2022) was also neutral. The aggregate of evidence and pathophysiology (avoidance of hyperchloraemic acidosis) supports balanced crystalloids as first-line in sepsis.",
  ],
  [
    "Which vasopressor should I start first, and when do I add vasopressin and hydrocortisone?",
    "Noradrenaline is first-line vasopressor in septic shock (SSC 2021, strong recommendation). Target MAP ≥ 65 mmHg, titrated to perfusion (urine output, mental state, lactate clearance, CRT). Add vasopressin 0.03 U/min when noradrenaline reaches 0.25–0.5 µg/kg/min — VANISH (Gordon, JAMA 2016) showed early vasopressin reduced renal-replacement therapy use. Add hydrocortisone 200 mg/day (50 mg QDS or continuous infusion) when vasopressor-dependent for > 4 h — ADRENAL (Venkatesh, NEJM 2018) showed faster shock resolution; APROCCHSS (Annane, NEJM 2018) showed mortality benefit. Adrenaline is a third-line catecholamine; dopamine is not recommended.",
  ],
  [
    "What is the role of steroids, vitamin C, and other adjuncts in sepsis?",
    "Hydrocortisone 200 mg/day is recommended for adults with septic shock requiring ongoing vasopressor support (SSC 2021). Vitamin C is NOT recommended: LOVIT (Lamontagne, NEJM 2022) showed high-dose IV vitamin C increased the composite of persistent organ dysfunction or death (HR 1.21); the earlier CITRIS-ALI and VICTAS trials were neutral. Selenium, IVIG (except in toxic-shock-like syndromes), and beta-blockers are not routinely recommended. Insulin should target glucose ≤ 10 mmol/L. Stress-ulcer and VTE prophylaxis are standard.",
  ],
  [
    "How is procalcitonin used to guide antibiotic duration?",
    "Procalcitonin (PCT) rises with bacterial infection and falls with effective source control or treatment. SSC 2021 suggests PCT plus clinical assessment may guide antibiotic discontinuation. Pragmatic stop rules used in trials (ProHOSP, SAPS, PRORATA): stop antibiotics if PCT < 0.5 µg/L or has fallen > 80% from peak. PCT-guided strategies have reduced antibiotic exposure by ~1–2 days without harm in multiple RCTs and meta-analyses. PCT should not delay starting antibiotics in suspected septic shock and is unreliable in the first 6–12 h, post-surgery, burns, and end-stage renal failure.",
  ],
];



const objectives = [
  "Apply Sepsis-3 definitions and use SOFA / qSOFA / NEWS2 to recognise sepsis and septic shock.",
  "Deliver the SSC Hour-1 bundle and justify antibiotic, fluid and vasopressor choices.",
  "Titrate noradrenaline, vasopressin, adrenaline and hydrocortisone for catecholamine-resistant shock.",
  "Interpret lactate, CRP, procalcitonin and presepsin trends to guide resuscitation and antibiotic stewardship.",
  "Compare SSC 2021, NICE NG51 and IDSA 2024 guidance on antibiotic timing, fluids and steroids.",
  "Plan source control and de-escalation, including PCT-guided antibiotic stop rules.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Recognising septic shock at the bedside",
    scenario: (
      <>
        72-year-old with urinary sepsis. After 30 mL/kg Hartmann's: BP 82/40 (MAP 54), HR 118,
        lactate 3.6 mmol/L, RR 26, GCS 14. Noradrenaline started. Does this meet septic shock
        criteria?
      </>
    ),
    working: (
      <>
        Sepsis-3 septic shock = sepsis + <strong>vasopressor required for MAP ≥65</strong> AND
        <strong> lactate &gt;2 mmol/L</strong> after adequate fluid. Both true here. qSOFA
        (RR ≥22 ✓, altered mentation ✓, SBP ≤100 ✓) = 3.
      </>
    ),
    answer: (
      <>
        <strong>Septic shock confirmed.</strong> Hospital mortality ~40%. Escalate: titrate
        noradrenaline to MAP ≥65, recheck lactate at 2 h, add vasopressin 0.03 U/min if NA
        &gt;0.25–0.5 µg/kg/min, hydrocortisone 200 mg/day if vasopressor-dependent &gt;4 h, urgent
        source control (CT KUB ± nephrostomy).
      </>
    ),
   cites: ["Sepsis-3 2016"],
  },
  {
    title: "Fluid resuscitation calculation",
    scenario: (
      <>
        85 kg patient with septic shock. What initial crystalloid volume does SSC 2021 recommend,
        and what fluid would you choose?
      </>
    ),
    working: (
      <>
        SSC: 30 mL/kg balanced crystalloid within 3 h → 30 × 85 ={" "}
        <strong>2 550 mL</strong>. Avoid 0.9% saline (hyperchloraemic acidosis, AKI signal in
        SMART/SALT-ED), starches (VISEP/CHEST — AKI/death), gelatins.
      </>
    ),
    answer: (
      <>
        Give ~2.5 L Hartmann's or Plasma-Lyte. Reassess <em>dynamically</em> after each 250–500
        mL bolus (PLR, stroke volume variation, IVC, capillary refill — ANDROMEDA-SHOCK). IDSA
        2024 cautions against rigidly chasing 30 mL/kg if not fluid-responsive — switch to
        vasopressors and consider albumin if &gt;60–80 mL/kg given.
      </>
    ),
    cites: ["SSC 2021"],
  },
  {
    title: "PCT-guided antibiotic stewardship",
    scenario: (
      <>
        Day 5 of meropenem for community-acquired pneumonia with bacteraemia. Patient afebrile,
        off vasopressors. PCT peaked at 18 ng/mL on day 2, now 2.0 ng/mL. Stop antibiotics?
      </>
    ),
    working: (
      <>
        PCT-guided de-escalation rules (PRORATA / SAPS): stop antibiotics if PCT{" "}
        <strong>&lt;0.5 ng/mL</strong> OR <strong>≥80% decline from peak</strong>. 2.0 / 18.0 =
        89% decline ✓. Clinical resolution ✓.
      </>
    ),
    answer: (
      <>
        <strong>Yes — stop antibiotics.</strong> Document source control adequate, no ongoing
        organ dysfunction. PCT-guided de-escalation reduces antibiotic days by 2–3 with no
        mortality penalty (SSC 2021 endorses). If PCT failed to decline → think inadequate
        source control, resistant organism, or alternative diagnosis.
      </>
    ),
    cites: ["Sepsis-3 2016"],
  },
];

const SepsisTopic = () => {
  return (
    <TopicTemplate
      title="Sepsis & Septic Shock"
      subtitle="FRCA Final / FFICM / EDIC — Intensive Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={[
        { text: "Sepsis-3: infection + organ dysfunction (SOFA ≥2). Septic shock: vasopressors needed + lactate >2", cites: ["BJA Educ 2019"] },
        { text: "Hour-1 bundle: lactate, cultures, antibiotics, fluids (30 ml/kg), vasopressors", cites: ["SSC 2021"] },
        { text: "Noradrenaline is the first-line vasopressor; vasopressin is second-line", cites: ["SSC 2021", "ESICM Shock 2014"] },
        { text: "Each hour delay in antibiotics increases mortality by approximately 7%", cites: ["BJA Educ 2019"] },
        { text: "Source control is critical — drain, debride, or remove infected sources early", cites: ["SSC 2021"] },
        { text: "PCT-guided de-escalation reduces antibiotic duration by 2–3 days without increasing mortality", cites: ["Sepsis-3 2016"] },
        { text: "Lactate >4 mmol/L carries 30–40% mortality; serial clearance guides resuscitation adequacy", cites: ["BJA Educ 2019"] },
        { text: "No single biomarker diagnoses sepsis — trends are more informative than single values", cites: ["SSC 2021"] },
        { text: "IDSA 2024 challenges rigid 1h antibiotic + 30 mL/kg fluid targets in undifferentiated sepsis", cites: ["Sepsis-3 2016"] },
      ]}
      topicId="sepsis"
      topicTitle="Sepsis & Septic Shock"
      quizQuestions={sepsisQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
      }}
      sectionSources={{
        objectives: [
          "Sepsis-3 2016",
          "SSC 2021",
          "BJA Educ 2019",
        ],
        keyPoints: [
          "Sepsis-3 2016",
          "SSC 2021",
          "BJA Educ 2019",
        ],
        workedExamples: ["Sepsis-3 2016", "SSC 2021"],
      }}
      coreConcepts={
    <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
      <section className="space-y-6">
        <TopicTableOfContents items={sepsisTocItems} />
        <DrugDosesCallout focus="antimicrobials, vasopressors and hydrocortisone in septic shock" />


        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Sepsis is a life-threatening organ dysfunction caused by a dysregulated host response to infection (Sepsis-3, 2016). It remains the leading cause of mortality in ICU. Early recognition, source control, and protocolised resuscitation are the cornerstones of management.
          </p>
        </div>

        <div>
          <SepsisHostResponseDiagram />
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Sepsis-3 Definitions</h2>
          <div className="space-y-3">
            {[
              { term: "Sepsis", def: "Infection + organ dysfunction (SOFA score ≥2 points above baseline). qSOFA ≥2 at bedside (RR ≥22, altered mentation, SBP ≤100)." },
              { term: "Septic Shock", def: "Sepsis + vasopressors required to maintain MAP ≥65 mmHg AND lactate >2 mmol/L despite adequate fluid resuscitation." },
            ].map((item) => (
              <div key={item.term} className="p-4 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">{item.term}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.def}</p>
              </div>
            ))}
          </div>
        </div>

        <SepsisScoreCalculator />

        <LactateCRTTool />

        <VasopressorLadderTool />

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Hour-1 Bundle (SSC 2021)</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The Surviving Sepsis Campaign recommends initiating ALL elements within 1 hour of sepsis recognition:
          </p>
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="space-y-3">
              {[
                { step: "1", action: "Measure lactate", detail: "Re-measure if initial lactate >2 mmol/L" },
                { step: "2", action: "Obtain blood cultures", detail: "Before antibiotics, from 2 separate sites" },
                { step: "3", action: "Administer broad-spectrum antibiotics", detail: "Within 1 hour. Each hour delay increases mortality ~7%" },
                { step: "4", action: "Begin rapid IV fluid resuscitation", detail: "30 ml/kg crystalloid for hypotension or lactate ≥4 mmol/L" },
                { step: "5", action: "Apply vasopressors", detail: "If hypotensive during or after fluid resuscitation. Target MAP ≥65 mmHg" },
              ].map((s) => (
                <div key={s.step} className="flex gap-3">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">{s.step}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{s.action}</p>
                    <p className="text-sm text-muted-foreground">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Vasopressor Therapy</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Agent</th>
                  <th className="text-left py-2 text-foreground font-semibold">Receptor</th>
                  <th className="text-left py-2 text-foreground font-semibold">Role</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2">Noradrenaline</td><td>α₁ &gt; β₁</td><td>1st-line vasopressor</td></tr>
                <tr className="border-b border-border"><td className="py-2">Vasopressin</td><td>V₁</td><td>2nd-line (catecholamine-sparing, 0.03 U/min)</td></tr>
                <tr className="border-b border-border"><td className="py-2">Adrenaline</td><td>α₁, β₁, β₂</td><td>If cardiac dysfunction/inadequate response</td></tr>
                <tr><td className="py-2">Dobutamine</td><td>β₁ &gt; β₂</td><td>If myocardial dysfunction (↓CO despite adequate filling)</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Source Control</h2>
          <p className="text-muted-foreground leading-relaxed">
            Identify and control the source of infection as rapidly as possible. Drainage of abscesses, debridement of infected tissue, removal of infected devices. Delay in source control is independently associated with increased mortality. Consider CT imaging early if source unclear.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Human Albumin Solution — the evidence</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Albumin (4–5% iso-oncotic or 20% hyper-oncotic) is the only colloid that retains a place in sepsis resuscitation
            after starches and gelatins were withdrawn for harm. Its theoretical appeal is sustained intravascular expansion
            with less interstitial oedema, plus binding/transport, antioxidant and endothelial-glycocalyx effects. The
            randomised evidence is more nuanced.
          </p>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Trial</th>
                  <th className="text-left py-2 text-foreground font-semibold">Population & intervention</th>
                  <th className="text-left py-2 text-foreground font-semibold">Key result</th>
                  <th className="text-left py-2 text-foreground font-semibold">Take-home</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 align-top font-medium text-foreground">SAFE (NEJM 2004, n≈7000)</td>
                  <td className="py-2 align-top">General ICU; 4% albumin vs 0.9% saline for resuscitation.</td>
                  <td className="py-2 align-top">No overall mortality difference (RR 0.99). Pre-specified sepsis subgroup: trend to <em>lower</em> mortality with albumin (OR 0.87, 95% CI 0.74–1.02).</td>
                  <td className="py-2 align-top">Albumin is <strong>safe</strong> in sepsis; signal of possible benefit (hypothesis-generating).</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 align-top font-medium text-foreground">SAFE TBI subgroup (NEJM 2007)</td>
                  <td className="py-2 align-top">Traumatic brain injury subgroup of SAFE.</td>
                  <td className="py-2 align-top">Increased 24-month mortality with albumin (RR 1.63).</td>
                  <td className="py-2 align-top"><strong>Avoid albumin in TBI</strong> — even when sepsis coexists.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 align-top font-medium text-foreground">ALBIOS (NEJM 2014, n=1818)</td>
                  <td className="py-2 align-top">Severe sepsis / septic shock; 20% albumin to keep serum albumin ≥30 g/L + crystalloid vs crystalloid alone, for 28 days.</td>
                  <td className="py-2 align-top">No 28- or 90-day mortality difference. Better haemodynamics (higher MAP, lower fluid balance, faster vasopressor weaning). Post-hoc: ↓ mortality in the septic-shock subgroup (RR 0.87).</td>
                  <td className="py-2 align-top">Albumin <strong>improves haemodynamics</strong> but no proven survival benefit overall; possible benefit in established septic shock.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 align-top font-medium text-foreground">CRISTAL (JAMA 2013)</td>
                  <td className="py-2 align-top">Hypovolaemic shock (incl. sepsis); colloids (mostly albumin/HES) vs crystalloids.</td>
                  <td className="py-2 align-top">No 28-day mortality difference; lower 90-day mortality with colloids (secondary outcome).</td>
                  <td className="py-2 align-top">Hypothesis-generating only — heterogeneous colloid mix limits conclusions for albumin specifically.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 align-top font-medium text-foreground">Meta-analyses (Patel 2014, Xu 2014, Cochrane 2018)</td>
                  <td className="py-2 align-top">Pooled RCTs of albumin vs other fluids in sepsis.</td>
                  <td className="py-2 align-top">No clear all-cause mortality benefit; signal toward reduced mortality when compared specifically to <em>saline</em> rather than balanced crystalloids.</td>
                  <td className="py-2 align-top">Effect size — if real — is small and may largely reflect avoidance of saline-related hyperchloraemia.</td>
                </tr>
                <tr>
                  <td className="py-2 align-top font-medium text-foreground">CHEST (2012) & 6S (2012)</td>
                  <td className="py-2 align-top">Comparator trials of HES vs crystalloid in ICU/sepsis.</td>
                  <td className="py-2 align-top">HES caused increased AKI / RRT and (6S) increased mortality.</td>
                  <td className="py-2 align-top">Established that <strong>synthetic colloids are harmful</strong>, leaving albumin as the only colloid still considered in sepsis.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Guideline positions</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
            <li><strong>Surviving Sepsis Campaign 2021</strong> — <em>weak recommendation</em> for albumin in patients who have received <strong>large volumes of crystalloid</strong> (e.g. &gt;60–80 mL/kg) for sepsis or septic shock; balanced crystalloid remains first-line. Not recommended as the initial resuscitation fluid.</li>
            <li><strong>NICE NG51</strong> — crystalloid first; <strong>do not use</strong> tetrastarch; albumin not routinely recommended but may be considered in ongoing large-volume resuscitation.</li>
            <li><strong>IDSA 2024</strong> — emphasises individualised, dynamic fluid assessment over fixed volumes; reserves albumin for the same large-volume scenario, noting absence of robust mortality benefit.</li>
            <li><strong>Avoid</strong> albumin in <strong>traumatic brain injury</strong> (SAFE TBI signal of harm) and use cautiously in decompensated heart failure (volume load).</li>
          </ul>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Mechanistic rationale & caveats</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
            <li><strong>Oncotic pressure:</strong> albumin contributes ~75–80% of plasma colloid osmotic pressure; iso-oncotic 4–5% expands plasma volume by ~80% of the volume infused vs ~20–25% for crystalloid.</li>
            <li><strong>Glycocalyx in sepsis</strong> is shed → increased capillary leak. The classical "colloid stays intravascular" advantage is <em>attenuated</em>, which may explain why trials show smaller volume-sparing effects than predicted.</li>
            <li><strong>Non-oncotic effects:</strong> antioxidant (binds free radicals, NO carrier), drug/bilirubin transport, possible glycocalyx-stabilising actions — biologically plausible but not proven to translate to survival.</li>
            <li><strong>Hyperchloraemia avoidance:</strong> apparent "albumin benefit" vs saline is attenuated when balanced crystalloid (Hartmann's, Plasma-Lyte) is the comparator (SMART, BaSICS).</li>
            <li><strong>Cost & supply:</strong> albumin is ~30–50× the cost of crystalloid — a key reason routine first-line use is not endorsed despite a favourable safety profile.</li>
          </ul>

          <div className="mb-3 animate-fade-in">
            <AlbuminFluidShiftDiagram />
          </div>

          <div className="rounded-lg border border-border bg-card p-4 text-sm space-y-3 mb-3">
            <p className="font-semibold text-foreground">Practical dosing — when and how to give albumin in sepsis</p>
            <div>
              <p className="font-semibold text-foreground mb-1">When to consider it</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li><strong>Trigger:</strong> persistent hypotension or ongoing vasopressor requirement <em>after</em> ~30 mL/kg balanced crystalloid (SSC 2021 initial bolus), and especially once cumulative crystalloid approaches <strong>60–80 mL/kg</strong> in the first 24 h.</li>
                <li><strong>Goal:</strong> reduce further crystalloid load (limit interstitial oedema, hyperchloraemia and abdominal pressure) while maintaining MAP ≥65 mmHg and adequate end-organ perfusion.</li>
                <li><strong>Avoid</strong> in traumatic brain injury (SAFE TBI). Use cautiously in decompensated heart failure and oliguric AKI with established fluid overload.</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">4–5% (iso-oncotic) — for ongoing volume replacement</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li><strong>Use when</strong> the primary aim is plasma-volume expansion in a fluid-responsive patient who has already had substantial crystalloid.</li>
                <li><strong>Dose:</strong> 250–500 mL boluses (≈ 5 mL/kg) over 15–30 min, reassessing fluid responsiveness (passive leg raise, stroke-volume variation, lactate trend) between boluses. Typical 24-h ceiling 1–2 L.</li>
                <li><strong>Effect:</strong> ~80% of the infused volume retained intravascularly (vs ~20–25% for crystalloid).</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">20% (hyper-oncotic) — for hypoalbuminaemia / oedematous patient</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li><strong>Use when</strong> serum albumin is low (typically &lt;25–30 g/L), the patient is already fluid-overloaded/oedematous, or further large crystalloid boluses are undesirable. This is the ALBIOS strategy — top up to keep serum albumin ≥30 g/L.</li>
                <li><strong>Dose:</strong> 100 mL of 20% (= 20 g albumin) over 30–60 min, repeated 1–2× daily as needed. Some units give up to 200 mL/day in divided doses while titrating to serum albumin ≥30 g/L.</li>
                <li><strong>Caution:</strong> pulls fluid into the intravascular space — risk of acute pulmonary oedema if the patient is not fluid-deplete; pair with diuresis if total body fluid overload exists.</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Monitoring & stop rules</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Reassess MAP, lactate, urine output and dynamic indices after each bolus; stop if no haemodynamic response (non-responder) or if signs of pulmonary oedema appear.</li>
                <li>Do not chase serum albumin above 30–35 g/L — there is no evidence of benefit and cost/supply is significant.</li>
                <li>Document clearly that synthetic colloids (HES, gelatins) are <strong>not</strong> to be used.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg border border-primary/30 bg-primary/5 p-3 text-sm text-foreground">
            <p className="font-semibold mb-1">Practical viva-ready summary</p>
            <p className="text-muted-foreground">
              "Balanced crystalloid is first-line in sepsis. Human albumin (4–5%) is safe (SAFE) and can be added once
              large volumes of crystalloid have been given (SSC 2021, weak recommendation), with ALBIOS showing better
              haemodynamics and a possible benefit in septic shock but no overall mortality reduction. Synthetic colloids
              (HES, gelatins) are contraindicated. Avoid albumin in traumatic brain injury."
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Corticosteroids</h2>
          <p className="text-muted-foreground leading-relaxed">
            IV hydrocortisone 200 mg/day (50 mg QDS or continuous infusion) if haemodynamic instability persists despite adequate fluid resuscitation and vasopressor therapy. ADRENAL and APROCCHSS trials support use in refractory septic shock for faster shock reversal but no mortality benefit is definitively proven.
          </p>
        </div>

        <div id="septic-cardiomyopathy" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Septic Cardiomyopathy</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Septic cardiomyopathy is a <strong>transient, stress-induced global myocardial dysfunction</strong> occurring in up to 40–60% of septic shock, distinct from acute coronary syndrome or fixed structural heart disease.
          </p>
          <div className="space-y-3">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Pathophysiology</p>
              <p className="text-sm text-muted-foreground mt-1">
                Circulating TNF-α and IL-1β directly depress myocardial contractility; mitochondrial dysfunction impairs myocyte energetics; excess nitric oxide production causes further contractile depression and vasoplegia; β-adrenoceptor downregulation and uncoupling reduce catecholamine responsiveness.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Clinical & echocardiographic features</p>
              <p className="text-sm text-muted-foreground mt-1">
                Reduced left and right ventricular ejection fraction with ventricular dilatation (a compensatory Frank–Starling response that preserves stroke volume). Stroke volume is often relatively preserved or even elevated overall because of compensatory tachycardia and profoundly reduced systemic vascular resistance — the depressed EF can therefore be masked clinically unless specifically sought.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Investigation</p>
              <p className="text-sm text-muted-foreground mt-1">
                Transthoracic or transoesophageal echocardiography shows global hypokinesis and ventricular dilatation, typically evolving over the first 24–48 h. Troponin is frequently raised (myocardial strain/microvascular injury) but is non-diagnostic and does not indicate coronary occlusion.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Management</p>
              <p className="text-sm text-muted-foreground mt-1">
                Treat the underlying sepsis (source control, antibiotics). If cardiac output remains low despite adequate filling and an appropriate vasopressor (noradrenaline) achieving MAP targets, add <strong>dobutamine</strong> as the inotrope of choice <InlineRef topicId="sepsis" refLabel="SSC 2012 (Inotropes)" />. Avoid excessive fluid loading, which worsens ventricular dilatation without improving output. Levosimendan has been trialled as a calcium-sensitiser alternative but is not routinely recommended given lack of consistent outcome benefit and vasodilatory/hypotensive effects.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Prognosis</p>
              <p className="text-sm text-muted-foreground mt-1">
                Septic cardiomyopathy is usually fully reversible, with echocardiographic recovery typically within 7–10 days in survivors; persistence beyond this should prompt reconsideration of the diagnosis (e.g. underlying ischaemic or structural heart disease).
              </p>
            </div>
          </div>
        </div>

        <div id="special-populations" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Sepsis in Special Populations</h2>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-2 mb-2">Paediatric sepsis</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Vital-sign thresholds are strongly age-dependent (normal heart rate and respiratory rate fall, and normal blood pressure rises, with increasing age), so adult-derived cut-offs cannot be applied directly. Presentation is often non-specific — poor feeding, lethargy or irritability, temperature instability (fever <em>or</em> hypothermia), prolonged capillary refill and mottling — rather than the overt hypotension seen in adults, since children compensate for a long period before decompensating suddenly.
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
            <li><strong>Fluid resuscitation:</strong> boluses of <strong>10–20 mL/kg</strong> balanced crystalloid with reassessment after each bolus, rather than a fixed adult-style 30 mL/kg <InlineRef topicId="sepsis" refLabel="SSC Children 2020" />. Children are at higher risk of fluid overload (pulmonary oedema, hepatomegaly) — stop and reassess for signs of overload after each aliquot.</li>
            <li><strong>Vasoactive choice:</strong> adrenaline is used early for "cold shock" (poor perfusion, narrow pulse pressure, cool peripheries — the more common paediatric phenotype), while noradrenaline is preferred for "warm shock" (bounding pulses, wide pulse pressure, warm peripheries) <InlineRef topicId="sepsis" refLabel="SSC 2012 (Paediatric considerations)" />.</li>
            <li><strong>Antibiotics:</strong> chosen per local/national paediatric antimicrobial guidelines, reflecting age-specific pathogens (e.g. Group B Streptococcus, E. coli and Listeria in neonates) and weight-based dosing.</li>
            <li><strong>Glucose:</strong> infants have low glycogen reserves and a high risk of hypoglycaemia during sepsis — check and correct blood glucose promptly and monitor closely.</li>
          </ul>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Sepsis in pregnancy</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Normal physiological adaptations of pregnancy — resting tachycardia, peripheral vasodilatation with a lower baseline blood pressure, and a physiological leucocytosis — can mask or mimic the early signs of sepsis, delaying recognition <InlineRef topicId="sepsis" refLabel="RCOG Green-top 64" />. Common sources include chorioamnionitis, endometritis (particularly postpartum), urinary tract infection/pyelonephritis, and wound infection after caesarean section.
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
            <li><strong>Mother first:</strong> maternal resuscitation takes priority — optimising maternal physiology is the most effective way to support the fetus.</li>
            <li><strong>Early multidisciplinary involvement:</strong> obstetric, neonatal, anaesthetic and critical-care teams should be involved early, particularly as gestation advances.</li>
            <li><strong>Source control and delivery:</strong> if the uterus/fetus is the source (e.g. chorioamnionitis, septic miscarriage), delivery should proceed once the mother is adequately stabilised — delivery does not need to wait for full resolution of sepsis if it is required for source control.</li>
            <li><strong>Antibiotics:</strong> pregnancy-safe broad-spectrum agents such as piperacillin–tazobactam or meropenem, ± clindamycin/metronidazole for anaerobic or streptococcal cover, dosed promptly per the Hour-1 approach.</li>
            <li><strong>Positioning:</strong> place in the left lateral tilt (or manual uterine displacement) from ~20 weeks' gestation to relieve aortocaval compression and improve venous return/cardiac output during resuscitation.</li>
          </ul>
        </div>

        <div id="specific-syndromes" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Specific Sepsis Syndromes</h2>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-2 mb-2">Toxic shock syndrome</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Caused by superantigen exotoxins — <em>Staphylococcus aureus</em> TSST-1 or <em>Streptococcus pyogenes</em> SpeA — which bypass conventional antigen processing to cross-link MHC-II and the T-cell receptor directly, producing massive, non-specific T-cell activation and a cytokine storm. Classically associated with retained tampons/nasal packing/surgical wound infection (staphylococcal) or invasive Group A streptococcal infection, but often <strong>no clear focus is found</strong>.
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
            <li><strong>Features:</strong> abrupt high fever, diffuse sunburn-like erythroderma, hypotension/shock, multi-organ failure, with <strong>desquamation of the palms and soles</strong> typically occurring 1–2 weeks later.</li>
            <li><strong>Management:</strong> standard resuscitation and broad-spectrum antibiotics <strong>plus clindamycin</strong>, which suppresses toxin synthesis (protein-synthesis inhibition) independent of its antibacterial action <InlineRef topicId="sepsis" refLabel="IDSA SSTI 2014" />. Consider IV immunoglobulin to neutralise circulating superantigen in severe/refractory cases. Source control is essential — remove the tampon/nasal pack, drain any collection.</li>
          </ul>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Necrotising soft tissue infection (NSTI)</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Rapidly progressive infection of the fascial planes and subcutaneous tissue. <strong>Type I</strong> is polymicrobial (mixed aerobic/anaerobic, often post-surgical or in diabetics/immunocompromised); <strong>Type II</strong> is typically monomicrobial, classically Group A <em>Streptococcus</em> (± staphylococcal co-infection), and can affect previously healthy patients.
          </p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
            <li><strong>Clinical clues:</strong> pain markedly out of proportion to visible signs, rapidly advancing erythema/cellulitis beyond marked margins, skin bullae, crepitus (gas-forming organisms), woody induration, and systemic toxicity disproportionate to the apparent skin findings. The LRINEC score (CRP, WCC, haemoglobin, sodium, creatinine, glucose) is suggestive but neither sensitive nor specific enough to exclude the diagnosis.</li>
            <li><strong>Management:</strong> the cornerstone is <strong>urgent surgical exploration and debridement</strong> — do not wait for imaging confirmation if clinical suspicion is high, as delay increases mortality. Broad-spectrum antibiotics plus <strong>clindamycin</strong> (toxin/exotoxin suppression) are given alongside <InlineRef topicId="sepsis" refLabel="IDSA SSTI 2014" />. Hyperbaric oxygen therapy has theoretical rationale but remains unproven and must never delay debridement. IV immunoglobulin may be considered in streptococcal NSTI complicated by toxic shock, though evidence is limited.</li>
          </ul>
        </div>

        {/* ---- Sepsis Biomarkers ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Sepsis Biomarkers</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            No single biomarker is diagnostic of sepsis. Biomarkers support diagnosis, guide antibiotic duration, prognosticate, and monitor treatment response. Understanding their kinetics and limitations is essential.
          </p>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Biomarker</th>
                  <th className="text-left py-2 text-foreground font-semibold">Source & Kinetics</th>
                  <th className="text-left py-2 text-foreground font-semibold">Clinical Utility</th>
                  <th className="text-left py-2 text-foreground font-semibold">Limitations</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">CRP</td>
                  <td>Hepatic acute-phase protein. Rises 6–8 h, peaks 36–50 h. Half-life ~19 h. Triggered by IL-6.</td>
                  <td>Widely available, inexpensive. Tracks trends and treatment response. Values &gt;100 mg/L suggest significant bacterial infection but not diagnostic.</td>
                  <td>Non-specific — elevated post-surgery, trauma, autoimmune disease, malignancy. Slow kinetics. Poor bacterial vs viral discrimination. Low in hepatic failure.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Procalcitonin (PCT)</td>
                  <td>Calcitonin precursor. Extra-thyroidal production induced by endotoxin and TNF-α/IL-6. Rises 2–4 h, peaks 12–24 h, half-life 24–30 h.</td>
                  <td><strong>Best evidence for guiding antibiotic duration</strong> (PRORATA, SAPS trials). SSC 2021 recommends PCT-guided de-escalation. &lt;0.1 ng/mL: bacterial infection unlikely. &gt;0.5 ng/mL: systemic bacterial infection likely. 80% decline from peak supports stopping antibiotics.</td>
                  <td>Elevated post-surgery, burns, cardiogenic shock, renal failure. Not reliably raised in localised infections. Cost higher than CRP. Viral infections generally suppress PCT (helps differentiate).</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Lactate</td>
                  <td>Anaerobic glycolysis end-product. Normal &lt;2 mmol/L. In sepsis: tissue hypoperfusion AND β₂-adrenergic aerobic glycolysis. Rapid point-of-care assay.</td>
                  <td><strong>Prognostic marker and resuscitation target</strong>. Lactate &gt;2 mmol/L defines septic shock (+ vasopressors). Clearance &gt;20% in 2 h → improved outcomes. Part of Hour-1 bundle. Serial measurements guide resuscitation.</td>
                  <td>Non-specific: seizures, mesenteric ischaemia, liver failure, β₂-agonists, metformin, thiamine deficiency. Type A (hypoperfusion) vs Type B (non-hypoperfusion) distinction important. Hepatic impairment reduces clearance.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Presepsin (sCD14-ST)</td>
                  <td>Soluble fragment of CD14 (monocyte LPS receptor). Rises within 2 h (faster than PCT), peaks 3 h. Half-life 1–3 h — very rapid kinetics.</td>
                  <td>Emerging biomarker with fastest kinetics. &gt;600 pg/mL suggests sepsis. May have superior diagnostic accuracy to PCT for early bacterial sepsis in some studies. Rising levels predict worse prognosis.</td>
                  <td>Not widely available — requires specific immunoassay. Elevated in renal failure. Limited evidence vs PCT/CRP — few large RCTs. Not yet in SSC guidelines. Assay standardisation evolving.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Endotoxin Activity Assay (EAA)</td>
                  <td>Measures LPS-induced neutrophil oxidative burst. Reflects circulating endotoxin. Results &lt;30 min. Scale 0–1: low (&lt;0.4), intermediate (0.4–0.59), high (≥0.6).</td>
                  <td>Specific for Gram-negative sepsis. High EAA (≥0.6) → worse outcomes. Guided polymyxin B haemoperfusion in EUPHRATES trial (post-hoc benefit in EAA 0.6–0.89 subgroup). May differentiate Gram-negative vs Gram-positive source.</td>
                  <td>Gram-negative only — normal in Gram-positive/fungal sepsis. EUPHRATES failed primary endpoint. Limited availability. Does not distinguish viable bacteria from LPS fragments. Antibiotic-induced endotoxin release may confound.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <SepsisBiomarkerKineticsDiagram />

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Practical Approach</h3>
          <div className="space-y-2">
            {[
              { label: "Diagnosis", detail: "No biomarker replaces clinical assessment. PCT >0.5 ng/mL with compatible clinical picture supports bacterial sepsis. Presepsin may add value in early detection but availability is limited." },
              { label: "Antibiotic Stewardship", detail: "PCT-guided algorithms reduce antibiotic duration by 2–3 days without increasing mortality (multiple RCTs). SSC 2021 recommends daily PCT for de-escalation. PCT that fails to decline suggests inadequate source control, resistant organism, or non-infectious cause." },
              { label: "Prognostication", detail: "Lactate >4 mmol/L: mortality ~30–40%. Persistently elevated lactate despite resuscitation is the strongest predictor of poor outcome. Rising PCT/CRP despite treatment suggests treatment failure." },
              { label: "Serial Monitoring", detail: "Trends are more informative than single values. Lactate 2–4 hourly during resuscitation, CRP daily, PCT 24–48 hourly. Declining trajectory supports current management; plateau or rise mandates reassessment." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guideline comparison */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Major Guideline Comparison</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Side-by-side summary of the three contemporary sepsis guidelines on the four big management decisions.
            Where they differ matters in vivas — particularly antibiotic timing windows.
          </p>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-xs min-w-[720px]">
              <thead>
                <tr className="bg-secondary/40 text-foreground">
                  <th className="text-left p-2 font-semibold border-b border-border">Topic</th>
                  <th className="text-left p-2 font-semibold border-b border-border">Surviving Sepsis Campaign 2021</th>
                  <th className="text-left p-2 font-semibold border-b border-border">NICE NG51 (UK, updated 2024)</th>
                  <th className="text-left p-2 font-semibold border-b border-border">IDSA 2024 (sepsis position statement)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground align-top">
                {[
                  {
                    topic: "Antibiotic timing",
                    ssc: "Septic shock or definite sepsis: within 1h. Possible sepsis without shock: investigate and give within 3h if sepsis confirmed.",
                    nice: "High-risk criteria with suspected sepsis: within 1h of identification. Otherwise senior review and source-specific assessment.",
                    idsa: "Disagrees with rigid 1h target for all — argues 1h is appropriate for septic shock but causes diagnostic over-treatment in undifferentiated patients. Recommends rapid assessment, with timing tailored to certainty of diagnosis (within 1h for shock, within 3h for probable sepsis).",
                  },
                  {
                    topic: "Initial fluids",
                    ssc: "30 mL/kg balanced crystalloid within 3h for sepsis-induced hypoperfusion or septic shock. Reassess dynamically. Albumin if large volumes needed.",
                    nice: "IV crystalloid bolus 500 mL over <15 min if hypotensive or lactate >2 — repeat to max 30 mL/kg with senior review. Avoid starches and gelatins.",
                    idsa: "Critical of fixed 30 mL/kg target — recommends individualised, dynamic assessment (CLASSIC, CLOVERS trials). Restrictive strategy non-inferior in many. Use balanced crystalloid; avoid 0.9% saline in large volumes.",
                  },
                  {
                    topic: "Vasopressor choice & target",
                    ssc: "Noradrenaline first line. Target MAP ≥65. Add vasopressin (0.03 U/min) if NA dose rising — start at NA 0.25–0.5 µg/kg/min. Adrenaline if still inadequate. Dobutamine for cardiac dysfunction.",
                    nice: "Noradrenaline first line in critical care for MAP ≥65. Peripheral noradrenaline acceptable short-term while CVC sited.",
                    idsa: "Endorses noradrenaline first line, MAP ≥65 (higher target 80–85 only in chronic hypertension — SEPSISPAM). Earlier vasopressin addition supported. Methylene blue for refractory vasoplegia.",
                  },
                  {
                    topic: "Corticosteroids",
                    ssc: "Suggest IV hydrocortisone 200 mg/day in septic shock with ongoing vasopressor requirement (NA/adrenaline ≥0.25 µg/kg/min for ≥4h). Weak recommendation.",
                    nice: "Consider hydrocortisone in septic shock not responding to fluid + vasopressors; refer to critical care.",
                    idsa: "Supports hydrocortisone 200 mg/day in vasopressor-dependent septic shock (APROCCHSS, ADRENAL meta-analysis — faster shock reversal, possible mortality benefit). Add fludrocortisone 50 µg/day per APROCCHSS.",
                  },
                  {
                    topic: "Lactate-guided resuscitation",
                    ssc: "Suggest using serial lactate to guide resuscitation in patients with elevated lactate.",
                    nice: "Lactate >2 = high risk; >4 = very high risk. Use to escalate care.",
                    idsa: "Lactate clearance useful but not superior to dynamic measures (capillary refill — ANDROMEDA-SHOCK). Avoid chasing lactate with more fluid in non-fluid-responsive patients.",
                  },
                  {
                    topic: "Source control",
                    ssc: "As soon as possible — within 6–12h where logistically feasible.",
                    nice: "Identify and control source urgently; involve relevant specialty.",
                    idsa: "Earliest feasible — recognises 6–12h is operational rather than evidence-based; emphasises minimally invasive options first.",
                  },
                ].map((row) => (
                  <tr key={row.topic} className="border-b border-border last:border-b-0 hover:bg-secondary/20">
                    <td className="p-2 font-semibold text-foreground">{row.topic}</td>
                    <td className="p-2">{row.ssc}</td>
                    <td className="p-2">{row.nice}</td>
                    <td className="p-2">{row.idsa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-sm mb-1">Where they all agree</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Antibiotics within 1h for septic shock</li>
                <li>Noradrenaline first-line vasopressor; MAP target ≥65 mmHg</li>
                <li>Balanced crystalloid over 0.9% saline; avoid starches and gelatins</li>
                <li>Hydrocortisone 200 mg/day in vasopressor-dependent septic shock</li>
                <li>Urgent source control</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-sm mb-1">Where they differ</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li><strong>1h antibiotic target</strong>: SSC/NICE strict for high-risk; IDSA 2024 pushes back — risk of over-treatment in undifferentiated patients</li>
                <li><strong>30 mL/kg fluid bolus</strong>: SSC mandates; IDSA prefers individualised approach (CLASSIC/CLOVERS)</li>
                <li><strong>Steroid recommendation strength</strong>: SSC weak; IDSA stronger, with added fludrocortisone per APROCCHSS</li>
                <li><strong>Lactate clearance</strong>: SSC endorses; IDSA notes capillary refill (ANDROMEDA-SHOCK) equally valid and avoids fluid overload</li>
              </ul>
            </div>
          </div>
        </div>

      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Synthesis — Sepsis Management Algorithm</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Putting it all together: the integrated bundle from recognition through resuscitation, source control, vasopressor titration and de-escalation.
        </p>
        <SepsisManagementDiagram />
      </section>

      {/* Deep-content reference block: anchored H2s for TOC */}
      <section className="space-y-8 mt-10 scroll-mt-24">

        <div id="sepsis-3" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Sepsis-3 definitions &amp; scores</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Sepsis-3 (Singer, JAMA 2016) discarded SIRS in favour of an organ-dysfunction-based definition. The conceptual move: SIRS is a non-specific inflammatory response present in many non-infective insults; sepsis is the <em>dysregulated</em> host response that produces organ failure.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border bg-secondary/40">
                <th className="text-left p-2 font-semibold text-foreground">Term</th>
                <th className="text-left p-2 font-semibold text-foreground">Criteria</th>
                <th className="text-left p-2 font-semibold text-foreground">Mortality</th>
              </tr></thead>
              <tbody className="text-muted-foreground align-top">
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Suspected infection</td><td className="p-2">Body fluid cultures sent &amp; antimicrobials given (or planned) within a ±48 h window</td><td className="p-2">Variable</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Sepsis</td><td className="p-2">Suspected infection + acute rise of ≥ 2 in total SOFA score</td><td className="p-2">~10%</td></tr>
                <tr><td className="p-2 font-medium text-foreground">Septic shock</td><td className="p-2">Sepsis + vasopressors to maintain MAP ≥ 65 mmHg AND lactate &gt; 2 mmol/L after adequate fluid</td><td className="p-2">~40%</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            <strong>qSOFA</strong> (any 2 of RR ≥ 22, altered mentation, SBP ≤ 100): bedside prompt to suspect sepsis outside ICU — sensitive but not diagnostic. <strong>NEWS2</strong> remains the in-hospital track-and-trigger tool of choice in UK practice (NHS England Sepsis CQUIN).
          </p>
        </div>

        <div id="hour-1" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">SSC Hour-1 bundle — operational checklist</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border bg-secondary/40">
                <th className="text-left p-2 font-semibold text-foreground">Element</th>
                <th className="text-left p-2 font-semibold text-foreground">Action</th>
                <th className="text-left p-2 font-semibold text-foreground">Evidence anchor</th>
              </tr></thead>
              <tbody className="text-muted-foreground align-top">
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Lactate</td><td className="p-2">Measure now; remeasure if &gt; 2 mmol/L</td><td className="p-2">SSC 2021; Jansen 2010 lactate clearance</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Cultures</td><td className="p-2">≥ 2 sets blood cultures before antibiotics if no significant delay (&lt; 45 min)</td><td className="p-2">Cheng 2019 — paired cultures ↑ yield</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Antibiotics</td><td className="p-2">Broad-spectrum within 1 h for septic shock; within 3 h for sepsis without shock if infection probable</td><td className="p-2">Kumar 2006; Seymour NEJM 2017</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Fluids</td><td className="p-2">30 mL/kg balanced crystalloid over 3 h for hypotension or lactate ≥ 4 mmol/L</td><td className="p-2">SSC 2021; CLASSIC 2022; CLOVERS 2023</td></tr>
                <tr><td className="p-2 font-medium text-foreground">Vasopressors</td><td className="p-2">Noradrenaline during or after fluid if MAP &lt; 65 mmHg; consider peripheral start to avoid delay</td><td className="p-2">SOAP-II 2010; SSC 2021</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div id="antibiotics" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Empirical antibiotics &amp; source control</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Empirical cover must reflect the suspected source, the patient's recent antimicrobial exposure, local antibiogram, and severity. Source control — drainage of pus, debridement of necrotic tissue, removal of infected hardware or lines — should be achieved as soon as logistically feasible, ideally within 6–12 h.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border bg-secondary/40">
                <th className="text-left p-2 font-semibold text-foreground">Source</th>
                <th className="text-left p-2 font-semibold text-foreground">Typical empirical regimen (UK)</th>
                <th className="text-left p-2 font-semibold text-foreground">Notes</th>
              </tr></thead>
              <tbody className="text-muted-foreground align-top">
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Unknown / community</td><td className="p-2">Piperacillin-tazobactam 4.5 g IV; add gentamicin/amikacin once if shocked</td><td className="p-2">Add vancomycin if MRSA risk</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Hospital-acquired / ICU</td><td className="p-2">Meropenem 1–2 g IV ± vancomycin / linezolid</td><td className="p-2">Consider antifungal if persistent fever &amp; risk factors</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Severe CAP</td><td className="p-2">Co-amoxiclav + clarithromycin; or ceftriaxone + macrolide</td><td className="p-2">Cover atypicals; add oseltamivir in influenza season</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Urinary</td><td className="p-2">Piperacillin-tazobactam or meropenem if ESBL risk</td><td className="p-2">Drain obstruction urgently (nephrostomy/stent)</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Intra-abdominal</td><td className="p-2">Piperacillin-tazobactam or meropenem ± metronidazole</td><td className="p-2">Imaging-guided drainage or laparotomy</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Necrotising soft-tissue</td><td className="p-2">Piperacillin-tazobactam + clindamycin (toxin suppression) ± IVIG</td><td className="p-2"><strong>Surgical debridement is the treatment</strong></td></tr>
                <tr><td className="p-2 font-medium text-foreground">Line / device</td><td className="p-2">Vancomycin + anti-pseudomonal cover</td><td className="p-2">Remove the line; send tip + paired cultures</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div id="fluids" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Fluid resuscitation strategy</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The current consensus is &ldquo;resuscitate then restrict&rdquo;: a 30 mL/kg balanced crystalloid bolus in the first 3 h of sepsis-induced hypoperfusion, then dynamic, individualised top-ups guided by passive leg raise, stroke-volume variation, or end-expiratory occlusion — not CVP. Excessive fluid worsens outcomes by driving interstitial oedema, organ injury, and weaning failure.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border bg-secondary/40">
                <th className="text-left p-2 font-semibold text-foreground">Fluid</th>
                <th className="text-left p-2 font-semibold text-foreground">Role</th>
                <th className="text-left p-2 font-semibold text-foreground">Key evidence</th>
              </tr></thead>
              <tbody className="text-muted-foreground align-top">
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Balanced crystalloid (Hartmann's, Plasma-Lyte)</td><td className="p-2">First-line resuscitation &amp; maintenance</td><td className="p-2">SMART 2018 (composite outcome ↓); BaSICS 2021 / PLUS 2022 (neutral but safe)</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">0.9% saline</td><td className="p-2">Limited role — large volumes cause hyperchloraemic acidosis &amp; AKI</td><td className="p-2">Avoid as first-line in sepsis</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Albumin 4–5%</td><td className="p-2">Consider when large crystalloid volumes given (&gt; 30–60 mL/kg)</td><td className="p-2">SAFE 2004 (neutral overall, signal of harm in TBI); ALBIOS 2014 (no mortality benefit, signal in septic shock)</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Hydroxyethyl starch (HES)</td><td className="p-2"><strong>Do not use</strong></td><td className="p-2">6S, CHEST: ↑ RRT &amp; mortality; withdrawn EU</td></tr>
                <tr><td className="p-2 font-medium text-foreground">Gelatins</td><td className="p-2">Avoid — no benefit, allergy/AKI risk</td><td className="p-2">SSC 2021 weak recommendation against</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Assessing fluid responsiveness at the bedside</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            &ldquo;Fluid responsive&rdquo; means a ≥ 10–15% rise in stroke volume or cardiac output after a preload challenge — it is a statement about the position on the Frank–Starling curve, not a reason to give fluid. Only give fluid if the patient is <em>both</em> fluid responsive <em>and</em> hypoperfused, because static measures such as CVP and pulmonary artery occlusion pressure do not predict responsiveness <InlineRef topicId="sepsis" refLabel="SSC 2012 (Paediatric considerations)" />.
          </p>
          <div className="overflow-x-auto mb-3">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border bg-secondary/40">
                <th className="text-left p-2 font-semibold text-foreground">Test</th>
                <th className="text-left p-2 font-semibold text-foreground">How to do it &amp; threshold</th>
                <th className="text-left p-2 font-semibold text-foreground">Limitations / invalid when</th>
              </tr></thead>
              <tbody className="text-muted-foreground align-top">
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Passive leg raise (PLR)</td><td className="p-2">Semi-recumbent 45° → supine with legs raised 45° for 60–90 s; autotransfuses ~300 mL. Positive if stroke volume or cardiac output rises ≥ 10% (measure with echo VTI, pulse-contour device or bioreactance).</td><td className="p-2">Needs a real-time flow measure (blood-pressure change alone is unreliable), intra-abdominal hypertension, painful/agitated patient, lower-limb amputation, head injury where head-down is unsafe, DVT.</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Pulse-pressure / stroke-volume variation</td><td className="p-2">Respiratory variation &gt; 12–13% (PPV) or &gt; 10% (SVV) on a damping-free arterial line predicts responsiveness.</td><td className="p-2">Invalid with spontaneous breathing effort, arrhythmia (especially AF), tidal volume &lt; 8 mL/kg PBW, low lung compliance, open chest, right ventricular failure, very high respiratory rate (heart rate:respiratory rate &lt; 3.6).</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">End-expiratory occlusion test</td><td className="p-2">Hold ventilation at end-expiration for 12–15 s; a ≥ 5% rise in cardiac output or pulse pressure is positive. Valid at low tidal volume and with mild arrhythmia.</td><td className="p-2">Requires an intubated patient able to tolerate the hold without triggering; needs a precise continuous cardiac-output signal.</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Mini fluid challenge</td><td className="p-2">100–250 mL crystalloid over 1–2 min; ≥ 5–10% rise in stroke volume is positive.</td><td className="p-2">Small signal needs a precise monitor; cumulative fluid if repeated.</td></tr>
                <tr><td className="p-2 font-medium text-foreground">Echocardiography &amp; IVC assessment</td><td className="p-2">Serial LVOT VTI before/after a challenge; IVC distensibility &gt; 18% (ventilated) or collapsibility &gt; 40% (spontaneous) is supportive.</td><td className="p-2">Operator-dependent; IVC indices perform poorly with spontaneous effort, raised intra-abdominal pressure, RV failure or high PEEP — never use in isolation.</td></tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 rounded-lg bg-secondary/30 border border-border mb-3">
            <p className="text-sm text-muted-foreground">
              <strong>Practical rule:</strong> pair a dynamic test with a marker of hypoperfusion (lactate trend, capillary refill time, central venous–arterial CO₂ gap, ScvO₂, urine output). If the test is negative, or the patient is fluid responsive but not hypoperfused, escalate vasopressors or inotropes instead and move towards de-resuscitation once shock has resolved.
            </p>
          </div>

        </div>

        <div id="vasopressors" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Vasopressor &amp; inotrope ladder</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border bg-secondary/40">
                <th className="text-left p-2 font-semibold text-foreground">Drug</th>
                <th className="text-left p-2 font-semibold text-foreground">Receptor / dose</th>
                <th className="text-left p-2 font-semibold text-foreground">When to use</th>
                <th className="text-left p-2 font-semibold text-foreground">Evidence</th>
              </tr></thead>
              <tbody className="text-muted-foreground align-top">
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Noradrenaline</td><td className="p-2">α₁ ≫ β₁; 0.05–1.0 µg/kg/min</td><td className="p-2"><strong>First-line</strong> — target MAP ≥ 65 mmHg</td><td className="p-2">SOAP-II 2010 (fewer arrhythmias vs dopamine)</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Vasopressin</td><td className="p-2">V₁; 0.03 U/min fixed (max 0.04)</td><td className="p-2">Add when NA &gt; 0.25–0.5 µg/kg/min</td><td className="p-2">VASST 2008 (neutral overall, signal in less severe shock); VANISH 2016 (↓ RRT)</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Hydrocortisone</td><td className="p-2">200 mg/day (50 mg QDS or infusion)</td><td className="p-2">Vasopressor-dependent &gt; 4 h</td><td className="p-2">ADRENAL 2018 (faster shock resolution); APROCCHSS 2018 (mortality ↓)</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Adrenaline</td><td className="p-2">α + β; 0.05–1.0 µg/kg/min</td><td className="p-2">Refractory shock; useful if myocardial depression</td><td className="p-2">CAT 2008 (non-inferior to NA + dobutamine but ↑ lactate)</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Dobutamine</td><td className="p-2">β₁; 2.5–20 µg/kg/min</td><td className="p-2">Septic cardiomyopathy / low CO despite MAP target</td><td className="p-2">Guided by echo / advanced monitoring</td></tr>
                <tr><td className="p-2 font-medium text-foreground">Angiotensin II</td><td className="p-2">AT₁; 20 ng/kg/min titrate</td><td className="p-2">Catecholamine-resistant; specialist use</td><td className="p-2">ATHOS-3 2017 (↑ MAP response, no mortality benefit)</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            <strong>Peripheral noradrenaline</strong> is safe via a proximal large-bore cannula for up to 6 h while CVC access is being obtained (Cardenas-Garcia 2015 cohort); this avoids the mortality cost of waiting for a CVC before starting pressors (CENSER trial — early NA improved shock control).
          </p>
        </div>

        <div id="steroids" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Hydrocortisone in septic shock</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            SSC 2021 recommends IV hydrocortisone 200 mg/day for adults with septic shock who require ongoing vasopressor support (typically noradrenaline ≥ 0.25 µg/kg/min for ≥ 4 h). Administer as 50 mg every 6 h or a continuous infusion; wean over 2–3 days as vasopressors are weaned. Mineralocorticoid (fludrocortisone) is used in APROCCHSS but not routinely in UK practice. Steroids carry hyperglycaemia and superinfection risk — they are an adjunct, not a replacement for source control or appropriate antibiotics.
          </p>
        </div>

        <div id="biomarkers" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Lactate, CRP &amp; procalcitonin</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border bg-secondary/40">
                <th className="text-left p-2 font-semibold text-foreground">Biomarker</th>
                <th className="text-left p-2 font-semibold text-foreground">Role in sepsis</th>
                <th className="text-left p-2 font-semibold text-foreground">Caveats</th>
              </tr></thead>
              <tbody className="text-muted-foreground align-top">
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Lactate</td><td className="p-2">Marker of perfusion / metabolic stress; falling lactate (&gt; 10–20% / 2 h) suggests adequate resuscitation</td><td className="p-2">Non-specific — also raised in seizures, salbutamol, metformin, hepatic failure, type B (mitochondrial) sepsis</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">CRP</td><td className="p-2">Trend useful for treatment response; rises later than PCT</td><td className="p-2">Not specific for bacterial infection; not a stewardship tool</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Procalcitonin</td><td className="p-2">Bacterial-specific; guides antibiotic <em>discontinuation</em> (stop if &lt; 0.5 µg/L or &gt; 80% fall)</td><td className="p-2">Unreliable in first 6–12 h, post-surgery, burns, ESRD; do not use to <em>withhold</em> antibiotics in shock</td></tr>
                <tr><td className="p-2 font-medium text-foreground">Presepsin (sCD14-ST)</td><td className="p-2">Emerging early marker — rises within 2 h</td><td className="p-2">Not yet routinely available in UK labs</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div id="trial-evidence" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Landmark trial evidence</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border bg-secondary/40">
                <th className="text-left p-2 font-semibold text-foreground">Trial (year)</th>
                <th className="text-left p-2 font-semibold text-foreground">Question</th>
                <th className="text-left p-2 font-semibold text-foreground">Key result</th>
                <th className="text-left p-2 font-semibold text-foreground">Bottom line</th>
              </tr></thead>
              <tbody className="text-muted-foreground align-top">
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Rivers EGDT (2001)</td><td className="p-2">Protocolised early goal-directed therapy vs usual care</td><td className="p-2">28-d mortality 33% vs 49%</td><td className="p-2">Founded modern sepsis bundles; superseded by ARISE/ProCESS/ProMISe</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">ARISE / ProCESS / ProMISe (2014–15)</td><td className="p-2">EGDT vs usual care in contemporary practice</td><td className="p-2">No mortality difference</td><td className="p-2">Early recognition &amp; antibiotics matter more than CVP/ScvO₂ targets</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">SOAP-II (2010)</td><td className="p-2">Noradrenaline vs dopamine in shock</td><td className="p-2">No mortality difference; fewer arrhythmias with NA</td><td className="p-2">Noradrenaline first-line</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">VASST (2008)</td><td className="p-2">Low-dose vasopressin vs NA monotherapy</td><td className="p-2">Neutral overall; mortality benefit in less severe shock</td><td className="p-2">Vasopressin is a NA-sparing adjunct</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">VANISH (2016)</td><td className="p-2">Early vasopressin vs NA, ± hydrocortisone</td><td className="p-2">↓ RRT use with vasopressin</td><td className="p-2">Add vasopressin early to spare NA</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">SMART (2018)</td><td className="p-2">Balanced crystalloid vs saline (ICU)</td><td className="p-2">Composite of death/RRT/AKI 14.3% vs 15.4%</td><td className="p-2">Use balanced crystalloid first-line</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">ADRENAL (2018)</td><td className="p-2">Hydrocortisone infusion in septic shock</td><td className="p-2">No 90-d mortality benefit; faster shock resolution; ↓ transfusion</td><td className="p-2">Supports hydrocortisone for vasopressor weaning</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">APROCCHSS (2018)</td><td className="p-2">Hydrocortisone + fludrocortisone vs placebo</td><td className="p-2">90-d mortality 43% vs 49%</td><td className="p-2">Steroids reduce mortality in severe shock</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">CENSER (2019)</td><td className="p-2">Early peripheral NA vs standard</td><td className="p-2">↑ shock control by 6 h; ↓ pulmonary oedema</td><td className="p-2">Don't wait for CVC to start pressors</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">LOVIT (2022)</td><td className="p-2">High-dose IV vitamin C in septic shock</td><td className="p-2">Composite organ dysfunction/death HR 1.21</td><td className="p-2"><strong>Do not use</strong> vitamin C</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">CLASSIC (2022)</td><td className="p-2">Restrictive vs liberal fluid after initial resus</td><td className="p-2">No 90-d mortality difference (42.3% vs 42.1%)</td><td className="p-2">Restrictive strategy is safe</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">CLOVERS (2023)</td><td className="p-2">Early vasopressor vs liberal fluid</td><td className="p-2">No mortality difference (14.0% vs 14.9%)</td><td className="p-2">Either strategy acceptable; avoid over-resuscitation</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">PLUS (2022)</td><td className="p-2">Plasma-Lyte vs saline (ICU)</td><td className="p-2">Neutral 90-d mortality</td><td className="p-2">Balanced crystalloid still preferred on aggregate evidence</td></tr>
                <tr><td className="p-2 font-medium text-foreground">ATHOS-3 (2017)</td><td className="p-2">Angiotensin II in catecholamine-resistant shock</td><td className="p-2">↑ MAP response; no mortality benefit</td><td className="p-2">Specialist rescue agent</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div id="pitfalls" className="scroll-mt-24"></div>

        {/* FAQ */}
        <div id="faq" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Frequently asked questions</h2>
          <div className="space-y-2">
            {sepsisFaqs.map(([q, a]) => (
              <details key={q} className="group rounded-lg border border-border p-3">
                <summary className="cursor-pointer font-semibold text-foreground text-sm">{q}</summary>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* FAQ JSON-LD for rich-result eligibility */}
        <Helmet>
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: sepsisFaqs.map(([name, acceptedAnswer]) => ({
              "@type": "Question",
              name,
              acceptedAnswer: { "@type": "Answer", text: acceptedAnswer },
            })),
          })}</script>
        </Helmet>
      </section>



      <SynthesisBlock
        title="Sepsis — Hour-1 Bundle Synthesis"
        subtitle="The Surviving Sepsis 2021 bundle distilled to the actions that change outcome."
        variant="summary"
      >
        <ul className="space-y-2 list-disc list-inside text-sm">
          <li><strong>Measure lactate</strong>; remeasure if &gt;2 mmol/L.</li>
          <li><strong>Blood cultures × 2</strong> before antibiotics (don't delay antibiotics &gt;45 min).</li>
          <li><strong>Broad-spectrum antibiotics within 1 h</strong> (septic shock); within 3 h (sepsis without shock if uncertain).</li>
          <li><strong>30 ml/kg balanced crystalloid</strong> if hypotensive or lactate ≥4 mmol/L — reassess fluid responsiveness.</li>
          <li><strong>Vasopressors for MAP ≥65</strong> if hypotensive after fluid (or alongside) — noradrenaline first-line; add vasopressin / hydrocortisone if catecholamine-resistant.</li>
          <li><strong>Source control</strong> as soon as anatomically feasible — drainage, debridement, removal of infected device.</li>
        </ul>
      </SynthesisBlock>

          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "Sepsis = life-threatening organ dysfunction from dysregulated host response; SOFA increase ≥2 defines it; qSOFA is a screen, not diagnostic.",
              "Hour-1 bundle: lactate, blood cultures, broad-spectrum antibiotics, 30 mL/kg crystalloid for hypotension/lactate ≥4, vasopressors to MAP ≥65.",
              "Noradrenaline is first-line vasopressor; add vasopressin 0.03 U/min then hydrocortisone 200 mg/day in catecholamine-resistant shock.",
              "Source control within 6–12 h where feasible — undrained pus, infected lines, necrotic tissue.",
              "Balanced crystalloids preferred over 0.9% saline (BaSICS, SMART trials); albumin if large volumes needed.",
            ]}
          />
    </ExamSection>
      }
    />
  );
};

export default SepsisTopic;
