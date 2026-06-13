import { TopicTemplate } from "@/components/TopicTemplate";
import { TopicFaqs } from "@/components/TopicFaqs";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { SynthesisBlock } from "@/components/SynthesisBlock";
import WETFLAGDiagram from "@/components/diagrams/WETFLAGDiagram";
import PaediatricVitalsTable from "@/components/diagrams/PaediatricVitalsTable";
import type { WorkedExample } from "@/components/WorkedExamples";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const paediatricIcuFaqs: Array<[string, string]> = [
  ["What fluid resuscitation strategy is recommended for paediatric septic shock?", "10–20 mL/kg balanced crystalloid boluses with reassessment after each, up to 40–60 mL/kg in the first hour; start adrenaline or noradrenaline early if fluid-refractory rather than continuing boluses (FEAST, SSC paediatric 2020)."],
  ["What is paediatric ARDS (PARDS) and how does ventilation differ?", "Berlin-equivalent criteria (PALICC 2015) using OI rather than P/F ratio; use Vt 5–8 mL/kg PBW, plateau ≤28 cmH₂O, permissive hypercapnia (pH ≥7.20), PEEP titrated 8–15, prone if OI ≥12."],
  ["How is intraosseous access used in paediatric resuscitation?", "Insert in the proximal tibia (or distal femur/humerus) if IV access fails within 60–90 s in shock or arrest; flow rates approach IV after a 10 mL saline flush, and all resus drugs can be given at standard doses."],
];

const objectives = [
  "Apply WETFLAG and APLS age-banded vitals to deliver immediate weight-based therapy in a critically unwell child.",
  "Recognise the age-specific physiology that distinguishes paediatric resuscitation from adult care (HR-dependent CO, rapid desaturation, thermoregulation).",
  "Manage paediatric septic shock with 10–20 mL/kg crystalloid boluses, early vasopressors, and stress-dose hydrocortisone.",
  "Apply lung-protective ventilation, PRIS-aware sedation, and isotonic maintenance fluids in PICU.",
  "Lead paediatric resuscitation (15:2, 4 J/kg, adrenaline 10 mcg/kg) and recognise when brainstem death testing is permissible.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "WETFLAG for a 4-year-old in resus",
    scenario: (
      <>
        A 4-year-old collapses on the ward. Estimate the seven WETFLAG values you need to deliver
        immediate therapy.
      </>
    ),
    working: (
      <>
        <strong>Weight</strong> ((age + 4) × 2 = 16 kg). <strong>E</strong>nergy (4 J/kg = 64 J).{" "}
        <strong>T</strong>ube (uncuffed age/4 + 4 = 5.0 mm; cuffed 4.5; depth age/2 + 12 = 14 cm).{" "}
        <strong>F</strong>luids (10 mL/kg crystalloid bolus = 160 mL). <strong>L</strong>orazepam
        (0.1 mg/kg = 1.6 mg, max 4 mg). <strong>A</strong>drenaline (10 mcg/kg = 160 mcg = 1.6 mL
        of 1:10,000). <strong>G</strong>lucose (2 mL/kg of 10% = 32 mL).
      </>
    ),
    answer: (
      <>
        Have all seven values pre-calculated <em>before</em> the child arrives so therapy is not
        delayed by mental arithmetic. Reassess weight against length-based estimation
        (Broselow/PAWPER) once a tape is to hand.
      </>
    ),
    cites: ["NICE NG29"],
  },
  {
    title: "Single-ventricle saturations",
    scenario: (
      <>
        A 6-week-old post-Norwood (HLHS) becomes acidotic with SpO₂ 94% on FiO₂ 0.4. Lactate is
        rising. Why is this a problem and what would you do?
      </>
    ),
    working: (
      <>
        Single-ventricle physiology requires balanced Qp:Qs ~1:1, achieved at SpO₂ 75–85%. SpO₂
        94% means pulmonary vascular resistance is too low — pulmonary overcirculation steals from
        the systemic circuit, causing hypoperfusion and lactic acidosis despite "good" sats. The
        instinct to give more O₂ would worsen the steal.
      </>
    ),
    answer: (
      <>
        <strong>Reduce FiO₂</strong> (often to 0.21), accept SpO₂ 75–85%, allow permissive
        hypercapnia (raises PVR). Optimise systemic perfusion with milrinone, fluid as guided by
        echo, treat acidosis. Discuss urgently with paediatric cardiac team — may need
        catheterisation or shunt revision.
      </>
    ),
    cites: ["FEAST 2011"],
  },
];

const PaediatricIcuTopic = () => {
  return (
    <TopicTemplate
      title="Paediatric Intensive Care"
      subtitle="FFICM / EDIC — Intensive Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={[
        { text: "Children have HR-dependent cardiac output — bradycardia is a pre-arrest sign; treat with atropine 20 mcg/kg", cites: ["Resuscitation Council UK 2021"] },
        { text: "Paediatric septic shock: 10–20 ml/kg boluses with reassessment; adrenaline for cold shock, noradrenaline for warm shock", cites: ["BJA Educ 2019"] },
        { text: "Single ventricle physiology: target SpO₂ 75–85%; excessive O₂ causes pulmonary overcirculation and systemic steal", cites: ["RCPCH 2019"] },
        { text: "PRIS (propofol infusion syndrome) — avoid prolonged propofol infusions (>48h) in children", cites: ["NICE NG29"] },
        { text: "Isotonic maintenance fluids only — hypotonic fluids can cause fatal hyponatraemia in children", cites: ["FEAST 2011"] },
        { text: "Paediatric cardiac arrest is usually respiratory in origin — 5 rescue breaths first, defibrillation 4 J/kg", cites: ["Resuscitation Council UK 2021"] },
        { text: "Brainstem death testing in children: >2 months, NOT applicable <37 weeks corrected gestational age", cites: ["BJA Educ 2019"] },
        { text: "FEAST trial: fluid boluses increased mortality in resource-limited settings — does NOT change UK practice", cites: ["RCPCH 2019"] },
      ]}
      topicId="paediatric-icu"
      topicTitle="Paediatric Intensive Care"
      quizQuestions={[
        {
          question: "A 6-month-old infant (8 kg) presents in shock. After airway and breathing are addressed, what is the appropriate initial fluid bolus?",
          options: [
            "20 ml/kg 0.9% saline (160 ml) over 5 minutes, reassess",
            "10–20 ml/kg balanced crystalloid (80–160 ml) with reassessment after each bolus",
            "60 ml/kg crystalloid as a single rapid bolus",
            "5 ml/kg 5% albumin only",
          ],
          correctIndex: 1,
          explanation: "Current UK/APLS guidance is 10–20 ml/kg crystalloid boluses with reassessment after each, watching for fluid overload (hepatomegaly, crackles).",
        },
        {
          question: "A 4-year-old with hypoplastic left heart syndrome (post-Norwood) has SpO₂ of 92% on supplemental oxygen with worsening acidosis and poor perfusion. What is the most likely problem?",
          options: [
            "Inadequate oxygenation requiring more FiO₂",
            "Pulmonary overcirculation with systemic steal — reduce FiO₂",
            "Cyanotic spell requiring morphine and knee-to-chest",
            "Sepsis until proven otherwise",
          ],
          correctIndex: 1,
          explanation: "Target SpO₂ in single-ventricle physiology is 75–85%. SpO₂ 92% indicates Qp:Qs imbalance with systemic hypoperfusion.",
        },
        {
          question: "A previously well 2-year-old collapses. Initial rhythm is asystole. Which of the following best reflects paediatric resuscitation priorities?",
          options: [
            "Immediate defibrillation at 4 J/kg",
            "5 rescue breaths first, then CPR at 15:2 with adrenaline 10 mcg/kg every 3–5 min",
            "Adrenaline 1 mg IV every 3–5 minutes as per adult ALS",
            "Atropine 20 mcg/kg as first-line drug",
          ],
          correctIndex: 1,
          explanation: "Paediatric arrests are usually hypoxic — 5 rescue breaths precede CPR. Adrenaline 10 mcg/kg.",
        },
        {
          question: "A 10-kg toddler is admitted post-operatively. Which maintenance fluid is most appropriate?",
          options: [
            "0.18% saline / 4% dextrose at 40 ml/h",
            "Isotonic crystalloid (0.9% saline or balanced) with 5% dextrose at 40 ml/h",
            "0.45% saline at 100 ml/h",
            "Hartmann's at 60 ml/h with no glucose",
          ],
          correctIndex: 1,
          explanation: "NICE NG29: isotonic maintenance only — hypotonic fluids cause fatal hyponatraemia. Holliday-Segar 4-2-1 → 40 ml/h for 10 kg.",
        },
        {
          question: "Which statement about brainstem death testing in children is correct?",
          options: [
            "It can be performed in any infant once apnoea is documented",
            "It is not applicable below 37 weeks corrected gestational age, and additional caution is required under 2 months",
            "It requires EEG confirmation in all children",
            "The same hypothermia thresholds as adults apply without modification",
          ],
          correctIndex: 1,
          explanation: "AoMRC: BSD testing not applicable <37 weeks corrected gestational age. Between term and 2 months, ancillary testing often required.",
        },
        {
          question: "Following a febrile seizure, a child becomes drowsy with new focal neurology. Glucose is 2.1 mmol/L. What is the immediate management?",
          options: [
            "Buccal midazolam 0.5 mg/kg",
            "IV/IO 10% dextrose 2 ml/kg bolus, then reassess",
            "Mannitol 0.5 g/kg for cerebral oedema",
            "Phenytoin loading dose 20 mg/kg",
          ],
          correctIndex: 1,
          explanation: "Always check glucose ('DEFG'). Treat with 10% dextrose 2 ml/kg — avoid 50% (osmolality, vein damage).",
        },
      ]}
      sectionSources={{
        objectives: ["RCPCH 2019", "Resuscitation Council UK 2021", "APLS 2021", "BJA Educ 2019"],
        workedExamples: ["Resuscitation Council UK 2021", "APLS 2021", "NICE NG29", "FEAST 2011"],
        keyPoints: ["RCPCH 2019", "FEAST 2011", "NICE NG29", "Resuscitation Council UK 2021", "APLS 2021", "BJA Educ 2019"],
      }}
      sectionExamMapping={{
        objectives: { exams: [Exam.FFICM, Exam.EDIC], curriculumCodes: ["FFICM 4.6", "EDIC 5.6"] },
        workedExamples: { exams: [Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FFICM, Exam.EDIC] },
      }}
      coreConcepts={
        <>
        <>
          <ExamSection id="wetflag" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="WETFLAG & Age-Specific Vital Signs" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              <strong>WETFLAG</strong> is the standard APLS pre-calculation performed when any unwell child arrives in resus — generating the seven weight-based numbers (<strong>W</strong>eight · <strong>E</strong>nergy · <strong>T</strong>ube · <strong>F</strong>luids · <strong>L</strong>orazepam · <strong>A</strong>drenaline · <strong>G</strong>lucose) needed to deliver immediate therapy without doing arithmetic under stress. Alongside it, the vitals table gives age-banded normal ranges for HR, RR, SBP and urine output so deviations can be recognised at a glance.
            </p>
            <div className="grid lg:grid-cols-2 gap-4 items-start">
              <WETFLAGDiagram />
              <PaediatricVitalsTable />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="physiology" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Age-Specific Physiology">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">System</th>
                    <th className="text-left py-2 text-foreground font-semibold">Neonate / Infant</th>
                    <th className="text-left py-2 text-foreground font-semibold">Clinical Implication</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Airway</td><td>Large head/tongue, anterior larynx, cricoid narrowest &lt;8 yrs</td><td>Cuffed ETT now acceptable from neonates</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Respiratory</td><td>O₂ consumption 6–8 ml/kg/min, low FRC, obligate nasal &lt;6 mo</td><td>Rapid desaturation — HFNO during intubation</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Cardiovascular</td><td>HR-dependent CO, higher resting HR</td><td>Bradycardia ≈ pre-arrest; atropine 20 mcg/kg. Hypotension is LATE</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Renal</td><td>Immature GFR until ~2 y</td><td>Fluid overload risk; weight-based dosing</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Thermoregulation</td><td>Large BSA:weight, brown fat, no shivering</td><td>Active warming essential</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Pharmacology</td><td>Higher Vd, immature CYP, low protein binding</td><td>Weight-based mg/kg; some drugs need higher doses</td></tr>
                </tbody>
              </table>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="airway" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Airway & Ventilation in PICU">
            <div className="space-y-3">
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">ETT Sizing</p>
                <p className="text-sm text-muted-foreground mt-1"><strong>Uncuffed:</strong> Age/4 + 4 (ID mm). <strong>Cuffed:</strong> Age/4 + 3.5. <strong>Depth (oral):</strong> Age/2 + 12 cm. Neonates: 3.0–3.5 mm.</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">Lung-Protective Ventilation</p>
                <p className="text-sm text-muted-foreground mt-1">VT 5–8 ml/kg IBW, plateau &lt;28 cmH₂O, age-appropriate RR, PEEP 5–8. Permissive hypercapnia (pH &gt;7.25). HFOV considered earlier than adults.</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">Non-Invasive Support</p>
                <p className="text-sm text-muted-foreground mt-1">HFNC at 2 ml/kg/min — first-line for bronchiolitis. CPAP/BiPAP increasingly first-line for moderate respiratory failure.</p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="sepsis" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Paediatric Sepsis & Shock">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Children more commonly present with <strong>cold shock</strong> (vasoconstricted, poor perfusion) than warm vasodilated shock. Antibiotics within 1 h. Fluid in 10–20 ml/kg boluses (NOT 30 ml/kg) with reassessment after each — up to 40–60 ml/kg in first hour. Hepatomegaly = fluid overload. Vasoactive support if fluid-refractory after 40 ml/kg: peripheral adrenaline (cold) or noradrenaline (warm). Stress-dose hydrocortisone for catecholamine-resistant shock.
            </p>
            <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
              <p className="text-sm font-semibold text-destructive">⚠ FEAST Trial (2011)</p>
              <p className="text-sm text-muted-foreground mt-1">
                In resource-limited settings, fluid boluses increased 48-h mortality. Does NOT apply to UK PICU practice but is frequently examined.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="cardiac" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Cardiac & Congenital Heart Disease">
            <div className="space-y-3">
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">Single Ventricle Physiology</p>
                <p className="text-sm text-muted-foreground mt-1">Parallel circulation; target SpO₂ 75–85%. Excessive O₂ → pulmonary vasodilation → systemic steal. Manage with subambient FiO₂ or CO₂ addition.</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">Post-CPB / LCOS</p>
                <p className="text-sm text-muted-foreground mt-1">Low cardiac output syndrome peaks 6–18 h post-bypass. Milrinone (load 50 mcg/kg, infusion 0.25–0.75 mcg/kg/min). Avoid hypothermia. Delayed sternal closure common in neonates.</p>
              </div>
              <div className="p-4 rounded-lg border border-border bg-secondary/30">
                <p className="font-semibold text-foreground text-sm">PH Crisis</p>
                <p className="text-sm text-muted-foreground mt-1">Sedate/paralyse, FiO₂ 1.0, alkalosis (pH 7.45–7.50), iNO 10–20 ppm, IV sildenafil. Avoid disconnection.</p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="neurocrit" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Paediatric Neurocritical Care">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Condition</th>
                    <th className="text-left py-2 text-foreground font-semibold">Key Points</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">TBI</td><td>CPP age-dependent (40–50 infant, 50–60 child). ICP &gt;20. Hypertonic saline preferred over mannitol. Earlier decompression.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Status Epilepticus</td><td>Lorazepam 0.1 mg/kg ×2 → phenytoin 20 mg/kg → RSI/thiopentone. Check glucose.</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">DKA</td><td>Cerebral oedema risk highest in children — limit fluid, rehydrate over 48 h. Insulin 0.05–0.1 U/kg/h. Hourly GCS.</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">NAI</td><td>Unexplained injuries, retinal haemorrhages, infant SDH. Mandatory safeguarding referral.</td></tr>
                </tbody>
              </table>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="sedation" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Sedation, Analgesia & Withdrawal">
            <p className="text-muted-foreground text-sm mb-2">COMFORT-B (target 11–17), FLACC for pre-verbal pain. Morphine 10–40 mcg/kg/h, midazolam 1–4 mcg/kg/min, dexmedetomidine 0.2–1.4 mcg/kg/h. <strong>Avoid prolonged propofol infusions (&gt;48 h) — PRIS</strong>: metabolic acidosis, rhabdomyolysis, cardiac failure. Iatrogenic withdrawal after &gt;5 days opioid/benzo: WAT-1 scoring; wean by 10–20%/day with enteral conversion.</p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="fluids" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Fluids, Electrolytes & Nutrition">
            <p className="text-muted-foreground text-sm mb-2">
              <strong>Holliday-Segar:</strong> 4 ml/kg/h (first 10 kg) + 2 ml/kg/h (10–20 kg) + 1 ml/kg/h (each kg &gt;20). <strong>Use isotonic fluids only</strong> (0.9% NaCl + 5% dextrose) — hypotonic fluids cause fatal hyponatraemia (NICE NG29).
              Hypoglycaemia (&lt;2.6 mmol/L): 2 ml/kg of 10% dextrose (NOT 50%). Enteral feeding within 24–48 h; PN by day 5–7 if enteral not possible. Avoid overfeeding.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="resus" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Resuscitation Key Numbers">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Parameter</th>
                    <th className="text-left py-2 text-foreground font-semibold">Infant (&lt;1 yr)</th>
                    <th className="text-left py-2 text-foreground font-semibold">Child</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Compression rate</td><td>100–120/min</td><td>100–120/min</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Depth</td><td>⅓ AP (~4 cm)</td><td>⅓ AP (~5 cm)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">C:V ratio</td><td>15:2</td><td>15:2</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Defibrillation</td><td>4 J/kg</td><td>4 J/kg</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Adrenaline</td><td>10 mcg/kg (0.1 ml/kg 1:10,000)</td><td>10 mcg/kg</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Amiodarone</td><td>5 mg/kg</td><td>5 mg/kg</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-4 rounded-lg border border-destructive/30 bg-destructive/5">
              <p className="text-sm font-semibold text-destructive">⚠ Most paediatric arrests are respiratory — give 5 rescue breaths first.</p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="ethics" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Safeguarding & End-of-Life">
            <p className="text-muted-foreground text-sm">
              All PICU staff need Level 3 safeguarding. Best-interests framework — parents central to decision-making but cannot demand futile treatment. Brainstem death testing requires &gt;2 months age (NOT applicable &lt;37 weeks corrected gestational age), 2 consultants, 2 sets of tests. Family-centred care: open visiting, parental presence, play specialists, bereavement support.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <SynthesisBlock
            title="Paediatric ICU — Critical Differences vs Adults"
            subtitle="The size, physiology, and pharmacology adjustments that matter at the bedside."
            variant="summary"
          >
            <ul className="space-y-2 list-disc list-inside text-sm">
              <li><strong>Tube sizing</strong>: cuffed ETT ID = (age/4) + 3.5; length = (age/2) + 12 (oral).</li>
              <li><strong>Fluid resuscitation</strong>: 10–20 ml/kg isotonic crystalloid bolus, reassess after each.</li>
              <li><strong>Maintenance fluids</strong>: isotonic only (NICE 2015). Holliday-Segar 4-2-1.</li>
              <li><strong>Sepsis</strong>: antibiotics within 1 h; noradrenaline (warm) or adrenaline (cold).</li>
              <li><strong>Drug dosing</strong>: weight-based (mg/kg). Sugammadex 2–4 mg/kg, suxamethonium 1.5–2 mg/kg.</li>
              <li><strong>Family-centred care</strong>: structured updates, consider parental presence at procedures.</li>
            </ul>
          </SynthesisBlock>
          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "Paediatric sepsis: PALS algorithm — 10–20 mL/kg fluid boluses (reassess after each), early antibiotics, early inotropes (peripheral if needed).",
              "ETT/drug doses: WET FLAG (weight, energy 4 J/kg, tube size, fluid 10 mL/kg, lorazepam, adrenaline 10 µg/kg, glucose 2 mL/kg 10%).",
              "Congenital cyanotic heart disease: maintain SpO₂ at usual baseline (often 75–85%), avoid hypoxia/hypocapnia changes that affect PVR/SVR balance.",
              "Paediatric TBI: target CPP age-appropriate (40–60 mmHg), avoid hyponatraemia, head-up, normothermia.",
              "Sedation: morphine/midazolam infusions, dexmedetomidine adjunct; chloral hydrate avoided due to safety concerns.",
            ]}
          />
        </>
          <TopicFaqs faqs={paediatricIcuFaqs} />
        </>
      }
    />
  );
};

export default PaediatricIcuTopic;
