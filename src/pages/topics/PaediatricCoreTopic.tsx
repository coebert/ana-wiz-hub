import { Link } from "react-router-dom";
import { Baby, Syringe, Droplets, Activity } from "lucide-react";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import { Exam } from "@/data/curriculum";
import { InlineRef } from "@/components/references/InlineRef";
import WETFLAGDiagram from "@/components/diagrams/intensive-care/WETFLAGDiagram";
import PaediatricVitalsTable from "@/components/diagrams/intensive-care/PaediatricVitalsTable";

const objectives = [
  "Apply age-banded normal vital signs and explain the key physiological differences between neonates, infants and adults (HR-dependent cardiac output, high oxygen consumption, small FRC).",
  "Prescribe paediatric maintenance fluids with the Holliday-Segar (100/50/20 or 4-2-1) formula using isotonic solutions, and give resuscitation boluses of 10–20 mL/kg with reassessment.",
  "Calculate weight-based drug doses, estimate weight from age or length, and explain how neonatal pharmacokinetics alter loading and maintenance dosing.",
  "Select an age-appropriate pain assessment tool (NIPS/CRIES, FLACC, Wong-Baker FACES, NRS) and interpret scores to guide analgesia.",
  "Recognise when a child needs escalation to paediatric intensive care and where to find the full PICU guidance on this platform.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Maintenance fluids for a 22 kg child",
    scenario: (
      <>
        A 5-year-old (22 kg) is nil by mouth after emergency appendicectomy. Prescribe the
        maintenance fluid rate and choose the solution.
      </>
    ),
    working: (
      <>
        <strong>Holliday-Segar (mL/day):</strong> 10 kg × 100 = 1000 mL; next 10 kg × 50 = 500 mL;
        remaining 2 kg × 20 = 40 mL → <strong>1540 mL/day</strong>.{" "}
        <strong>4-2-1 (mL/hr):</strong> 10 × 4 + 10 × 2 + 2 × 1 = <strong>62 mL/hr</strong>{" "}
        (1540 ÷ 24 ≈ 64 mL/hr — the two formulae agree within rounding).
      </>
    ),
    answer: (
      <>
        Prescribe an <strong>isotonic solution</strong> (0.9% sodium chloride with glucose, or a
        balanced crystalloid with glucose) — hypotonic maintenance fluids (e.g. 0.45% saline) are
        associated with hospital-acquired hyponatraemia and are contraindicated. Add potassium only
        once urine output is established and check electrolytes at least daily.
      </>
    ),
    cites: ["NICE NG29", "APLS 2021"],
  },
  {
    title: "Weight estimation and a FLACC score",
    scenario: (
      <>
        An unconscious 4-year-old needs analgesia after a femoral fracture. Estimate weight, give a
        safe paracetamol IV dose, and score pain when they wake crying with legs drawn up.
      </>
    ),
    working: (
      <>
        Weight (age 1–9 y) = (age + 4) × 2 = <strong>16 kg</strong>. Paracetamol IV: 15 mg/kg
        6-hourly (&gt;10 kg) = <strong>240 mg</strong> (max 1 g). FLACC: Face (occasional grimace
        = 1), Legs (kicking/drawn up = 2), Activity (squirming = 1), Cry (crying steadily = 2),
        Consolability (content/relaxed once held = 0) = <strong>6/10</strong>.
      </>
    ),
    answer: (
      <>
        A FLACC of 6 is moderate-to-severe pain — escalate analgesia (e.g. add opioid per local
        protocol) and <strong>re-score after intervention</strong>; the trend matters more than a
        single number. Confirm estimated weight against a measured value or length-based tape as
        soon as practical.
      </>
    ),
    cites: ["FLACC 1997", "Broselow Tape"],
  },
];

const keyPoints = [
  {
    text: "Paediatric cardiac output is heart-rate dependent — stroke volume is relatively fixed, so bradycardia in a child is a pre-arrest sign, not a benign finding",
    cites: ["APLS 2021"],
  },
  {
    text: "Neonates consume 7–9 mL/kg/min of oxygen (vs ~3 in adults) with a small FRC and closing capacity above FRC — they desaturate within seconds of apnoea",
    cites: ["BJA Educ Paeds 2018"],
  },
  {
    text: "Maintenance fluids: 100/50/20 mL/kg/day (or 4-2-1 mL/kg/hr) using ISOTONIC solutions only — hypotonic fluids risk fatal hyponatraemia (NICE NG29)",
    cites: ["NICE NG29"],
  },
  {
    text: "Resuscitation boluses are 10–20 mL/kg isotonic crystalloid with reassessment after each; use 5 mL/kg aliquots in DKA or trauma",
    cites: ["APLS 2021"],
  },
  {
    text: "Estimate weight: (age + 4) × 2 for 1–9 years; verify with a length-based tape (Broselow/PAWPER) whenever possible",
    cites: ["Broselow Tape"],
  },
  {
    text: "Neonates need larger mg/kg LOADING doses (TBW 75–80%, low protein binding) but lower MAINTENANCE doses (immature glucuronidation, GFR 20–30% of adult)",
    cites: ["BJA Educ Paeds 2018"],
  },
  {
    text: "Maximum local anaesthetic doses: bupivacaine/levobupivacaine 2 mg/kg, lidocaine 3 mg/kg plain (7 mg/kg with adrenaline); caudal 0.5 mL/kg (sacral) to 1.25 mL/kg (thoracic)",
    cites: ["ESPA Pain 2021"],
  },
  {
    text: "Pain tools by age: NIPS/CRIES (neonates), FLACC (2 months–7 years or non-verbal), Wong-Baker FACES (≥3–7 years), numeric rating scale (≥8 years); COMFORT-B in PICU",
    cites: ["FLACC 1997", "ESPNIC Sedation 2016"],
  },
];

const PaediatricCoreTopic = () => {
  return (
    <TopicTemplate
      title="Paediatric Core Essentials"
      subtitle="FRCA Primary / Final — Clinical"
      backPath="/clinical"
      backLabel="Clinical"
      accentColor="text-clinical"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={keyPoints}
      sectionSources={{
        objectives: ["APLS 2021"],
        diagrams: ["APLS 2021"],
        workedExamples: ["NICE NG29", "FLACC 1997"],
        keyPoints: ["APLS 2021", "NICE NG29"],
      }}
      topicId="paediatric-core"
      topicTitle="Paediatric Core Essentials"
      quizQuestions={[
        {
          question:
            "A 3-year-old (estimated 14 kg) needs IV maintenance fluids while nil by mouth. Which prescription is most appropriate?",
          options: [
            "0.45% saline with 5% glucose at 56 mL/hr",
            "0.9% saline with 5% glucose at 46 mL/hr",
            "Hartmann's solution at 14 mL/hr",
            "5% glucose alone at 46 mL/hr",
          ],
          correctIndex: 1,
          explanation:
            "4-2-1: 10 kg × 4 + 4 kg × 2 = 48 mL/hr (≈46–48). NICE NG29 mandates isotonic maintenance fluids; 0.45% saline and glucose-only solutions risk hyponatraemia, and Hartmann's without glucose risks hypoglycaemia in small children.",
        },
        {
          question:
            "Which statement about neonatal pharmacology is correct?",
          options: [
            "Neonates need smaller mg/kg loading doses because of reduced total body water",
            "Neonates need larger mg/kg loading doses but reduced maintenance doses",
            "Neonatal protein binding is higher than in adults, reducing free drug fractions",
            "Neonatal GFR is 70–80% of the adult value",
          ],
          correctIndex: 1,
          explanation:
            "TBW is 75–80% of body weight with a large extracellular compartment, so water-soluble drugs need larger mg/kg loading doses; immature hepatic enzymes and a GFR of only 20–30% of adult values mandate reduced maintenance dosing.",
        },
        {
          question:
            "A non-verbal 5-year-old with cerebral palsy is crying, grimacing and kicking after surgery. Which pain tool is most appropriate?",
          options: [
            "Numeric rating scale 0–10",
            "Wong-Baker FACES scale",
            "FLACC (Face, Legs, Activity, Cry, Consolability) behavioural scale",
            "Visual analogue scale",
          ],
          correctIndex: 2,
          explanation:
            "FLACC is validated for children 2 months–7 years and for non-verbal/cognitively impaired children of any age. Self-report tools (FACES, NRS, VAS) require the child to understand and communicate.",
        },
        {
          question:
            "Why do neonates desaturate so rapidly during apnoea at induction?",
          options: [
            "They have a large functional residual capacity relative to weight",
            "Oxygen consumption is 7–9 mL/kg/min with a small FRC and closing capacity above FRC",
            "Fetal haemoglobin has a right-shifted dissociation curve releasing oxygen readily",
            "Neonatal airways are rigid and resist collapse",
          ],
          correctIndex: 1,
          explanation:
            "High oxygen consumption (7–9 vs ~3 mL/kg/min in adults) combined with a small FRC oxygen reservoir and airway closure during tidal breathing gives a margin of seconds, not minutes. HbF is LEFT-shifted, further limiting tissue oxygen unloading.",
        },
        {
          question:
            "What is the correct initial fluid bolus for a 2-year-old in septic shock?",
          options: [
            "5 mL/kg 5% albumin over 1 hour",
            "10–20 mL/kg isotonic crystalloid with reassessment after each bolus",
            "60 mL/kg 0.9% saline as a single rapid bolus",
            "4 mL/kg/hr maintenance only — boluses are contraindicated in children",
          ],
          correctIndex: 1,
          explanation:
            "APLS/Surviving Sepsis (paediatric): 10–20 mL/kg isotonic crystalloid boluses, reassessing after each for signs of overload (hepatomegaly, new crackles). Move early to vasoactive support if shock persists after 1–2 boluses.",
        },
      ]}
      coreConcepts={
        <>
          <ExamSection id="physiology" exams={[Exam.PRIMARY, Exam.FINAL]} className="scroll-mt-24">
            <CollapsibleSubsection title="Age-Specific Physiology" defaultOpen>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Children are not small adults. The neonatal period (0–28 days) and infancy carry the
                greatest physiological differences: cardiac output is <strong>heart-rate
                dependent</strong> because the immature, less compliant ventricle cannot increase
                stroke volume, so bradycardia collapses output and is a pre-arrest sign. Oxygen
                consumption is 7–9 mL/kg/min in neonates (vs ~3 mL/kg/min in adults) against a small
                FRC, with closing capacity encroaching on tidal breathing — apnoea produces
                desaturation within seconds. Haemoglobin F is left-shifted (P₅₀ ~19 vs 27 mmHg),
                favouring oxygen loading but limiting tissue unloading, and thermoregulation depends
                on non-shivering brown-fat thermogenesis, which volatile agents abolish.{" "}
                <InlineRef topicId="paediatric-core" refLabel="BJA Educ Paeds 2018" />
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-3 text-foreground font-semibold">Parameter</th>
                      <th className="text-left py-2 pr-3 text-foreground font-semibold">Neonate</th>
                      <th className="text-left py-2 pr-3 text-foreground font-semibold">Infant (1–12 m)</th>
                      <th className="text-left py-2 text-foreground font-semibold">Clinical implication</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">Heart rate (awake)</td>
                      <td className="py-2 pr-3">110–160</td>
                      <td className="py-2 pr-3">100–150</td>
                      <td className="py-2">Treat bradycardia &lt;80 with hypoxia/HR-support early</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">Respiratory rate</td>
                      <td className="py-2 pr-3">30–60</td>
                      <td className="py-2 pr-3">25–40</td>
                      <td className="py-2">Obligate nasal breathers; secretions raise WOB</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">Systolic BP (mmHg)</td>
                      <td className="py-2 pr-3">60–90</td>
                      <td className="py-2 pr-3">70–100</td>
                      <td className="py-2">Hypotension is a LATE sign of shock — compensate until ~30–40% volume loss</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">Total body water</td>
                      <td className="py-2 pr-3">75–80%</td>
                      <td className="py-2 pr-3">~70%</td>
                      <td className="py-2">Larger volume of distribution for water-soluble drugs</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">Blood volume (mL/kg)</td>
                      <td className="py-2 pr-3">85–90 (term)</td>
                      <td className="py-2 pr-3">~80</td>
                      <td className="py-2">Small absolute volumes — weigh swabs, allow for 10–20 mL/kg boluses</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-medium text-foreground">Glucose stores</td>
                      <td className="py-2 pr-3">Minimal glycogen</td>
                      <td className="py-2 pr-3">Limited</td>
                      <td className="py-2">Risk of hypoglycaemia when fasted/stressed; treat &lt;2.6 mmol/L with 2 mL/kg 10% glucose</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="fluids" exams={[Exam.PRIMARY, Exam.FINAL]} className="scroll-mt-24">
            <CollapsibleSubsection title="Fluid Therapy: Maintenance, Deficit and Resuscitation">
              <p className="text-muted-foreground leading-relaxed mb-3">
                <strong>Maintenance</strong> uses the Holliday-Segar formula: 100 mL/kg/day for the
                first 10 kg, 50 mL/kg/day for the next 10 kg, 20 mL/kg/day thereafter (hourly
                equivalent 4-2-1 mL/kg/hr). NICE NG29 mandates <strong>isotonic</strong> maintenance
                solutions (with glucose where needed) because routine hypotonic fluids caused fatal
                hospital-acquired hyponatraemia; restrict to 50–70% of standard maintenance in
                ventilated, head-injured or postoperative children at risk of SIADH.{" "}
                <InlineRef topicId="paediatric-core" refLabel="NICE NG29" />
              </p>
              <p className="text-muted-foreground leading-relaxed mb-3">
                <strong>Resuscitation</strong>: give 10–20 mL/kg isotonic crystalloid boluses,
                reassessing after each for overload (new hepatomegaly, crackles, rising oxygen
                requirement). Use 5 mL/kg aliquots in DKA (cerebral oedema risk) and trauma; blood
                is given as 10–20 mL/kg. Hypoglycaemia is corrected with 2 mL/kg of 10% glucose —
                never concentrated 50% dextrose.{" "}
                <InlineRef topicId="paediatric-core" refLabel="APLS 2021" />
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-3 text-foreground font-semibold">Situation</th>
                      <th className="text-left py-2 pr-3 text-foreground font-semibold">Prescription</th>
                      <th className="text-left py-2 text-foreground font-semibold">Cautions</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">Routine maintenance</td>
                      <td className="py-2 pr-3">100/50/20 mL/kg/day, isotonic ± glucose</td>
                      <td className="py-2">Add K⁺ only with urine output; daily electrolytes</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">Dehydration deficit</td>
                      <td className="py-2 pr-3">% dehydration × weight × 10 (mL), replace over 24–48 h</td>
                      <td className="py-2">Slower (48 h) if hyper- or hyponatraemic</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">Sepsis / hypovolaemia</td>
                      <td className="py-2 pr-3">10–20 mL/kg boluses, reassess each time</td>
                      <td className="py-2">Escalate to vasoactives after 1–2 boluses</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">DKA</td>
                      <td className="py-2 pr-3">5 mL/kg aliquots only if shocked; deficit over 48 h</td>
                      <td className="py-2">Rapid fluids/insulin shifts → cerebral oedema</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-medium text-foreground">Neonates</td>
                      <td className="py-2 pr-3">Start ~60 mL/kg/day day 1, rising ~30 mL/kg/day; 10% dextrose baseline</td>
                      <td className="py-2">Glucose delivery 4–8 mg/kg/min; specialist guidance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="dosing" exams={[Exam.PRIMARY, Exam.FINAL]} className="scroll-mt-24">
            <CollapsibleSubsection title="Drug Dosing & Weight Estimation">
              <p className="text-muted-foreground leading-relaxed mb-3">
                All paediatric prescribing is <strong>weight-based with an adult-dose ceiling</strong>.
                Estimate weight as (age + 4) × 2 kg for ages 1–9 years ((age + 3) × 2 for 6–12
                months; (age × 3) + 7 for 10–14 years), and verify against a length-based tape such
                as Broselow or PAWPER whenever available. Neonatal pharmacokinetics diverge in both
                directions: larger mg/kg <em>loading</em> doses (total body water 75–80%, low plasma
                protein binding increasing free drug, blood-brain barrier immaturity) but lower{" "}
                <em>maintenance</em> doses (immature glucuronidation and CYP enzymes, GFR 20–30% of
                adult). Toddlers often clear drugs faster per kg than adults — under-dosing is as
                common as over-dosing.{" "}
                <InlineRef topicId="paediatric-core" refLabel="BJA Educ Paeds 2018" />
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-3 text-foreground font-semibold">Drug</th>
                      <th className="text-left py-2 pr-3 text-foreground font-semibold">Typical dose</th>
                      <th className="text-left py-2 text-foreground font-semibold">Notes / maxima</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">Paracetamol IV</td>
                      <td className="py-2 pr-3">15 mg/kg 6-hourly (&gt;10 kg)</td>
                      <td className="py-2">7.5 mg/kg if &lt;10 kg; max 60 mg/kg/day; max 1 g/dose</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">Ibuprofen PO</td>
                      <td className="py-2 pr-3">5–10 mg/kg 6–8-hourly</td>
                      <td className="py-2">&gt;3 months; avoid in dehydration/renal impairment</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">Morphine IV</td>
                      <td className="py-2 pr-3">25–50 mcg/kg boluses; infusion 10–30 mcg/kg/hr</td>
                      <td className="py-2">Halve in neonates; active M6G metabolite accumulates in renal failure</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">Adrenaline (arrest)</td>
                      <td className="py-2 pr-3">10 mcg/kg IV/IO</td>
                      <td className="py-2">= 0.1 mL/kg of 1:10,000 every 3–5 min</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">Suxamethonium</td>
                      <td className="py-2 pr-3">2 mg/kg IV (3 mg/kg neonate)</td>
                      <td className="py-2">Bradycardia risk — have atropine 20 mcg/kg drawn up</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">Bupivacaine / levobupivacaine</td>
                      <td className="py-2 pr-3">Max 2 mg/kg</td>
                      <td className="py-2">Caudal 0.5 (sacral) / 1.0 (lumbar) / 1.25 (thoracic) mL/kg</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-medium text-foreground">Lidocaine</td>
                      <td className="py-2 pr-3">Max 3 mg/kg plain; 7 mg/kg with adrenaline</td>
                      <td className="py-2">Slow IV injection; neonatal clearance reduced</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="pain-scoring" exams={[Exam.PRIMARY, Exam.FINAL]} className="scroll-mt-24">
            <CollapsibleSubsection title="Pain Assessment & Scoring">
              <p className="text-muted-foreground leading-relaxed mb-3">
                Choose the tool by developmental age, not chronological age.{" "}
                <strong>NIPS</strong> (Neonatal Infant Pain Scale) and <strong>CRIES</strong>{" "}
                assess neonates using facial expression, cry, breathing patterns and physiological
                signs. <strong>FLACC</strong> (Face, Legs, Activity, Cry, Consolability; each scored
                0–2, total /10) is validated from 2 months to 7 years and is the standard for
                non-verbal or cognitively impaired children of any age. <strong>Wong-Baker
                FACES</strong> suits children from about 3–7 years who can self-report, and a{" "}
                <strong>numeric rating scale</strong> (0–10) is reliable from around 8 years. In
                PICU, <strong>COMFORT-B</strong> is the validated behavioural scale for ventilated
                children. Re-score after every intervention — the trend guides titration.{" "}
                <InlineRef topicId="paediatric-core" refLabel="FLACC 1997" />{" "}
                <InlineRef topicId="paediatric-core" refLabel="ESPNIC Sedation 2016" />
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-3 text-foreground font-semibold">Tool</th>
                      <th className="text-left py-2 pr-3 text-foreground font-semibold">Age / setting</th>
                      <th className="text-left py-2 text-foreground font-semibold">Interpretation</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">NIPS / CRIES</td>
                      <td className="py-2 pr-3">Neonates, including preterm</td>
                      <td className="py-2">NIPS ≥4 or CRIES ≥4 suggests significant pain</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">FLACC</td>
                      <td className="py-2 pr-3">2 months–7 years; non-verbal any age</td>
                      <td className="py-2">0 = none, 1–3 mild, 4–6 moderate, 7–10 severe</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">Wong-Baker FACES</td>
                      <td className="py-2 pr-3">~3–7 years, self-report</td>
                      <td className="py-2">Child points to the face matching their pain</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">Numeric rating scale</td>
                      <td className="py-2 pr-3">≥8 years</td>
                      <td className="py-2">0–10 self-report, as in adults</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-medium text-foreground">COMFORT-B</td>
                      <td className="py-2 pr-3">Ventilated PICU patients</td>
                      <td className="py-2">Six behavioural items; guides analgesia and sedation titration</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="picu-link" exams={[Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
            <CollapsibleSubsection title="When to Escalate: Paediatric Intensive Care">
              <p className="text-muted-foreground leading-relaxed mb-4">
                These core skills are the foundation, but critically unwell children need
                PICU-level care: septic shock persisting after 1–2 fluid boluses, respiratory
                failure failing high-flow or CPAP, refractory status epilepticus, raised ICP, and
                post-arrest care. The dedicated{" "}
                <Link to="/intensive-care/paediatric-icu" className="text-primary underline underline-offset-2 font-medium">
                  Paediatric Intensive Care
                </Link>{" "}
                topic covers WETFLAG resuscitation pre-calculation, paediatric sepsis bundles,
                PARDS ventilation, congenital heart disease and neurocritical care in exam-level
                depth, and the{" "}
                <Link to="/intensive-care/case-bank" className="text-primary underline underline-offset-2 font-medium">
                  ICU case bank
                </Link>{" "}
                includes worked paediatric scenarios (ARDS, septic shock, DKA, TBI) to rehearse
                these decisions.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <Link
                  to="/physiology/paediatric-physiology"
                  className="flex items-start gap-3 rounded-lg border border-border p-3 hover:border-primary/50 transition-colors"
                >
                  <Activity className="h-5 w-5 text-physiology mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="font-medium text-foreground text-sm">Paediatric Physiology</div>
                    <div className="text-xs text-muted-foreground">
                      Neonatal cardiac output, oxygen consumption and thermoregulation in depth
                    </div>
                  </div>
                </Link>
                <Link
                  to="/intensive-care/paediatric-icu"
                  className="flex items-start gap-3 rounded-lg border border-border p-3 hover:border-primary/50 transition-colors"
                >
                  <Baby className="h-5 w-5 text-icu mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="font-medium text-foreground text-sm">Paediatric Intensive Care</div>
                    <div className="text-xs text-muted-foreground">
                      WETFLAG, sepsis, PARDS, congenital heart disease, neuroprotection
                    </div>
                  </div>
                </Link>
                <Link
                  to="/intensive-care/case-bank"
                  className="flex items-start gap-3 rounded-lg border border-border p-3 hover:border-primary/50 transition-colors"
                >
                  <Activity className="h-5 w-5 text-icu mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="font-medium text-foreground text-sm">Paediatric ICU Cases</div>
                    <div className="text-xs text-muted-foreground">
                      Staged exam scenarios with model answers and dosing references
                    </div>
                  </div>
                </Link>
                <Link
                  to="/intensive-care/drug-doses?age=child"
                  className="flex items-start gap-3 rounded-lg border border-border p-3 hover:border-primary/50 transition-colors"
                >
                  <Syringe className="h-5 w-5 text-icu mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="font-medium text-foreground text-sm">Paediatric Drug Doses</div>
                    <div className="text-xs text-muted-foreground">
                      Child and neonatal dosing for 50+ ICU drugs
                    </div>
                  </div>
                </Link>
                <Link
                  to="/intensive-care/infusions"
                  className="flex items-start gap-3 rounded-lg border border-border p-3 hover:border-primary/50 transition-colors"
                >
                  <Droplets className="h-5 w-5 text-icu mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="font-medium text-foreground text-sm">ICU Infusions &amp; Calculator</div>
                    <div className="text-xs text-muted-foreground">
                      Draw-up recipes, weight-based rates, paediatric caution flags
                    </div>
                  </div>
                </Link>
              </div>
            </CollapsibleSubsection>
          </ExamSection>
        </>
      }
      diagrams={
        <div className="grid lg:grid-cols-2 gap-4 items-start">
          <WETFLAGDiagram />
          <PaediatricVitalsTable />
        </div>
      }
    />
  );
};

export default PaediatricCoreTopic;
