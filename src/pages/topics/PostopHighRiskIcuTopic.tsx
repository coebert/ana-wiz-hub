import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import type { WorkedExample } from "@/components/WorkedExamples";
import { postopHighRiskIcuQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import GoalDirectedTherapyAnimation from "@/components/diagrams/GoalDirectedTherapyAnimation";
import ComplicationBundlesAnimation from "@/components/diagrams/ComplicationBundlesAnimation";
import PostopRiskCalculators from "@/components/diagrams/PostopRiskCalculators";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const objectives = [
  "Define the 'high-risk surgical patient' using validated risk scores (P-POSSUM, SORT, RCRI) and CPET-derived thresholds",
  "Justify the indication for level 2/3 postoperative care using NCEPOD, RCS and CPOC standards",
  "Structure a safe theatre-to-ICU handover and the first 24 h of critical-care management",
  "Apply evidence-based goal-directed haemodynamic, respiratory and metabolic strategies in the postoperative period",
  "Recognise and pre-empt the major postoperative complications (AKI, MINS, ileus, sepsis, delirium) and their long-term mortality signal",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Risk stratification — emergency laparotomy",
    scenario: (
      <>
        A 78-year-old presents with a perforated sigmoid diverticulum. Frailty CFS 5, eGFR 38, lactate 4.2, NEWS2 9. P-POSSUM predicted mortality 18%. The surgical team ask whether ICU admission is mandated.
      </>
    ),
    working: (
      <ul className="list-disc list-inside space-y-1">
        <li>NELA / RCS &amp; AAGBI 2018: predicted 30-day mortality ≥5% should be admitted to a critical-care bed; ≥10% mandates consultant anaesthetist + surgeon presence and level-3 care.</li>
        <li>CPOC 2020: 'high-risk' = mortality ≥5%, age ≥65 with co-morbidity, emergency surgery, AT &lt;11 mL/kg/min, or frailty CFS ≥5.</li>
        <li>This patient meets <strong>three</strong> high-risk criteria (mortality &gt;10%, frail, emergency abdominal sepsis).</li>
      </ul>
    ),
    answer: (
      <>
        Direct postoperative <strong>level-3 admission</strong> with planned sepsis bundle, lung-protective ventilation, vasopressor support and a documented treatment-escalation plan agreed pre-operatively.
      </>
    ),
   cites: ["Pearse 2006"],
  },
  {
    title: "First 24 h goals after major hepatectomy",
    scenario: (
      <>
        70 kg patient returns from a 9-h right hemihepatectomy. Intra-operative blood loss 1.6 L, lactate 3.8, Hb 88 g/L, noradrenaline 0.12 µg/kg/min, urine output 0.3 mL/kg/h for the last 2 h.
      </>
    ),
    working: (
      <ul className="list-disc list-inside space-y-1">
        <li>OPTIMISE-style cardiac-output-guided fluid challenges (250 mL crystalloid; accept if SV ↑≥10%).</li>
        <li>MAP target individualised — within 10–20% of pre-operative baseline (INPRESS 2017 reduced organ dysfunction).</li>
        <li>Lung-protective ventilation: Vt 6–8 mL/kg PBW, PEEP 5–8, plateau &lt;30 cmH₂O (PROVHILO/IMPROVE).</li>
        <li>Glucose 6–10 mmol/L (NICE-SUGAR); transfuse if Hb &lt;70 g/L (TRICC) or &lt;80 g/L with cardiac disease.</li>
        <li>KDIGO bundle for AKI prevention: avoid nephrotoxins, optimise haemodynamics, monitor creatinine and urine output 4-hourly.</li>
      </ul>
    ),
    answer: (
      <>
        SV-guided fluid optimisation, MAP within 10% of baseline, lung-protective ventilation, glucose 6–10 mmol/L, KDIGO bundle, multimodal opioid-sparing analgesia and a planned 06:00 sedation hold for assessment.
      </>
    ),
   cites: ["NCEPOD 2011"],
  },
  {
    title: "MINS detection on day 2",
    scenario: (
      <>
        Day-2 troponin (hsTnT) is 65 ng/L (baseline 12) in an asymptomatic patient after open AAA repair. ECG unchanged. The on-call team ask if this matters.
      </>
    ),
    working: (
      <ul className="list-disc list-inside space-y-1">
        <li>VISION cohort: <strong>Myocardial Injury after Non-cardiac Surgery (MINS)</strong> defined as postop hsTnT ≥20 ng/L with absolute change ≥5, or ≥65 ng/L. Independent 30-day mortality ~9%.</li>
        <li>CCS 2017 + ESC 2022 guidance recommends routine surveillance troponin in patients ≥65 or with vascular disease undergoing inpatient non-cardiac surgery.</li>
        <li>Management: rule out type-1 MI, optimise haemodynamics, start aspirin and high-intensity statin, cardiology referral. Beta-blockade only if already established (POISE).</li>
      </ul>
    ),
    answer: (
      <>
        This <strong>is MINS</strong> and warrants escalation: ECG, repeat troponin, echocardiography, antiplatelet + statin and cardiology review. Do not initiate β-blockade de novo (POISE harm signal).
      </>
    ),
   cites: ["CPOC 2020"],
  },
];

const PostopHighRiskIcuTopic = () => {
  return (
    <TopicTemplate
      title="Critical Care of the High-Risk Surgical Patient"
      subtitle="FRCA Final / FFICM / EDIC — Intensive Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      topicId="postop-high-risk-icu"
      topicTitle="Critical Care of the High-Risk Surgical Patient"
      quizQuestions={postopHighRiskIcuQuestions}
      workedExamples={workedExamples}
      keyPoints={[
        { text: "High-risk surgery accounts for ~12.5% of cases but ~80% of perioperative deaths (Pearse 2006) — proactive critical-care planning is the single biggest lever for outcome", cites: ["Pearse 2006", "CPOC 2020"] },
        { text: "Define high risk pre-operatively: predicted 30-day mortality ≥5%, AT <11 mL/kg/min, CFS ≥5, age ≥65 + co-morbidity, or emergency surgery (NCEPOD 'Knowing the Risk', CPOC 2020)", cites: ["NCEPOD 2011", "CPOC 2020"] },
        { text: "Use a structured risk score (P-POSSUM, SORT, NELA-tool) — communicate the number to the patient, surgeon and ICU team and document a treatment-escalation plan", cites: ["NELA 2023", "SORT"] },
        { text: "Goal-directed haemodynamic therapy reduces complications (OPTIMISE meta-analysis, POEMAS) but no mortality benefit in single trials — use SV-guided fluid + early vasopressor", cites: ["OPTIMISE 2014"] },
        { text: "INPRESS: individualised intra- and postoperative MAP target (within 10% of baseline) reduced organ dysfunction at 7 days vs standard MAP ≥65", cites: ["INPRESS 2017"] },
        { text: "Lung-protective ventilation (Vt 6–8 mL/kg PBW, PEEP 5–8, recruitment) reduces postoperative pulmonary complications (IMPROVE, PROVHILO)", cites: ["IMPROVE 2013"] },
        { text: "Routine surveillance troponin in high-risk patients identifies MINS (≥20 ng/L hsTnT with Δ≥5) — independently associated with 30-day mortality ~9% (VISION)", cites: ["VISION 2017"] },
        { text: "EPOCH cluster RCT showed a complex care bundle did NOT reduce 90-day mortality after emergency laparotomy — successful improvement requires sustained quality-improvement work (NELA Year-on-Year)", cites: ["EPOCH 2019", "NELA 2023"] },
        { text: "Apply the ICU ABCDEF bundle from day 1: Assess pain, Both SAT/SBT, Choice of analgesia/sedation, Delirium monitoring, Early mobility, Family engagement — reduces delirium, ventilator days and mortality", cites: ["ABCDEF 2019"] },
        { text: "Postoperative AKI is common and outcome-defining — avoid nephrotoxins, maintain MAP, implement KDIGO bundle (PrevAKI trial reduced moderate-severe AKI from 71→55%)", cites: ["PrevAKI 2017"] },
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
      }}
      coreConcepts={
        <>
          <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Defining the High-Risk Surgical Patient" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Pearse&apos;s landmark 2006 audit demonstrated that 12.5% of inpatient surgery is &quot;high-risk&quot; yet accounts for ~80% of perioperative deaths, and that fewer than 15% of these patients were admitted to critical care. This drove the NCEPOD <em>Knowing the Risk</em> report (2011), the RCS/AAGBI&nbsp;2018 standards and the CPOC consensus 2020.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Patient factors</p>
                <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside space-y-1">
                  <li>Age ≥65 with co-morbidity</li>
                  <li>Frailty CFS ≥5; sarcopenia</li>
                  <li>Functional capacity &lt;4 METs / AT &lt;11 mL/kg/min</li>
                  <li>RCRI ≥2; significant CV / respiratory / renal / hepatic disease</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Surgical / contextual factors</p>
                <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside space-y-1">
                  <li>Predicted 30-day mortality ≥5% on P-POSSUM/SORT/NELA</li>
                  <li>Major intra-cavity, vascular, hepatobiliary or oesophagogastric surgery</li>
                  <li>Emergency / out-of-hours operation</li>
                  <li>Anticipated blood loss &gt;500 mL or duration &gt;2 h with comorbidity</li>
                </ul>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Risk Scores in Common Use">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Tool</th>
                    <th className="text-left py-2 text-foreground font-semibold">Inputs</th>
                    <th className="text-left py-2 text-foreground font-semibold">Output / role</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">P-POSSUM</td><td>12 physiology + 6 operative variables</td><td>30-day mortality &amp; morbidity; NELA standard</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">SORT</td><td>6 pre-op variables</td><td>Pre-operative 30-day mortality (web/app)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">RCRI / Revised Cardiac Risk Index</td><td>6 clinical factors</td><td>Risk of major perioperative cardiac event</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">CPET</td><td>AT, V̇O₂peak, V̇E/V̇CO₂</td><td>Functional capacity; AT &lt;11 mL/kg/min flags high risk</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Clinical Frailty Scale</td><td>9-point clinical judgement</td><td>CFS ≥5 = vulnerable / frail; doubles 30-day mortality</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">ASA-PS</td><td>Subjective global score</td><td>Crude but universally documented; ASA ≥3 in emergency = high risk</td></tr>
                </tbody>
              </table>
            </div>
            <PostopRiskCalculators />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Indications for Postoperative Level 2 / 3 Care">
            <p className="text-muted-foreground leading-relaxed mb-3">
              The decision is taken pre-operatively, ideally at MDT, and re-confirmed at the WHO sign-out. CPOC 2020 and NELA recommend a critical-care bed for any of:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Predicted 30-day mortality ≥5% (level 2) or ≥10% (level 3)</li>
              <li>Need for invasive ventilation, advanced cardiovascular support or RRT</li>
              <li>Major intra-operative event (massive haemorrhage, cardiac arrest, severe sepsis)</li>
              <li>Significant single- or multi-organ dysfunction not stable on the ward</li>
              <li>Need for invasive haemodynamic monitoring or dense epidural / regional analgesia requiring close observation</li>
              <li>Patient with pre-existing organ failure, frailty or significant cardiopulmonary disease undergoing major surgery</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Theatre-to-ICU Handover">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Structured handover (e.g. <strong>SBAR / RSVP</strong> + iPASS) reduces information loss by ~50%. The receiving team should be pre-warned, the patient transferred with continuous monitoring and a documented handover proforma.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Minimum dataset</p>
                <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside space-y-1">
                  <li>Patient ID, allergies, pre-op risk score &amp; ceiling of care</li>
                  <li>Procedure performed; intra-op events; blood loss / fluids / blood products</li>
                  <li>Drugs given (antibiotics, vasoactives, analgesia, last paralysis)</li>
                  <li>Lines / drains / catheters / wounds; airway plan</li>
                  <li>Latest gas, lactate, glucose, K⁺, Hb</li>
                  <li>Specific surgical concerns / planned re-look</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">First-hour ICU bundle</p>
                <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside space-y-1">
                  <li>12-lead ECG &amp; arterial blood gas</li>
                  <li>Confirm ventilator settings, ETT position, PEEP, FiO₂</li>
                  <li>Confirm vasoactive infusions, MAP target, fluid plan</li>
                  <li>Analgesia plan (regional + multimodal opioid-sparing)</li>
                  <li>VTE prophylaxis, glycaemic plan, antibiotic schedule</li>
                  <li>Document treatment-escalation plan with the family</li>
                </ul>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Postoperative Goal-Directed Therapy">
            <GoalDirectedTherapyAnimation />
            <div className="space-y-2 mt-4">
              {[
                { target: "Haemodynamics", detail: "SV-guided fluid challenges (250 mL crystalloid, response = ΔSV ≥10%); early low-dose noradrenaline rather than chasing fluid. Individualised MAP target — within 10–20% of pre-operative baseline (INPRESS 2017)." },
                { target: "Oxygenation & ventilation", detail: "Lung-protective ventilation (Vt 6–8 mL/kg PBW, PEEP 5–8, plateau <30) with periodic recruitment in obese / abdominal patients (IMPROVE, PROVHILO). Wean FiO₂ to maintain SpO₂ 94–98%; avoid hyperoxia." },
                { target: "Glycaemia", detail: "Target 6–10 mmol/L (NICE-SUGAR). Avoid tight (4.5–6) control — increased severe hypoglycaemia and mortality." },
                { target: "Analgesia", detail: "Multimodal, opioid-sparing: paracetamol + NSAID/COX-2 (where renal function permits) + regional/neuraxial. Reduces PONV, ileus, delirium, chronic post-surgical pain." },
                { target: "Renal", detail: "KDIGO bundle (PrevAKI 2017): avoid nephrotoxins, optimise volume + MAP, monitor creatinine + UO. Early consideration of RRT (STARRT-AKI: no benefit from accelerated initiation)." },
                { target: "Haematology", detail: "Restrictive transfusion (TRICC: Hb 70 g/L, 80 g/L if cardiac disease). Continue VTE prophylaxis from 6 h postop unless contraindicated." },
                { target: "Neurological", detail: "Apply ABCDEF bundle: daily SAT + SBT, light sedation (RASS 0 to −2), CAM-ICU screening; avoid benzodiazepines in elderly." },
                { target: "Nutrition", detail: "Early enteral feed within 24–48 h (ESPEN 2019); consider hypocaloric in shock (NUTRIREA-2)." },
              ].map((t) => (
                <div key={t.target} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{t.target}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t.detail}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Recognising & Pre-empting Complications">
            <ComplicationBundlesAnimation />
            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Cardiovascular</p>
                <p className="text-sm text-muted-foreground mt-1">
                  MINS (hsTnT ≥20 with Δ≥5, or ≥65 ng/L) — surveillance troponin on day 1–3 in patients ≥65 or vascular disease (VISION). Manage with antiplatelet + statin + cardiology review. Avoid de-novo β-blockade (POISE).
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Respiratory</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Postoperative pulmonary complications (PPC) are the commonest serious morbidity. Risk-stratify with ARISCAT; protective ventilation, head-up nursing, early mobilisation, chest physio, NIV/HFNO for hypoxaemic respiratory failure (PRIME-AIR, OPTINIV).
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Renal &amp; metabolic</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Postoperative AKI doubles 30-day mortality. KDIGO bundle (PrevAKI). Watch lactate trend &gt; absolute value; persistent lactataemia = ongoing tissue hypoperfusion or hepatic dysfunction.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Sepsis &amp; surgical site</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Source-control review at 24 h; prompt CT &amp; return to theatre for collection / leak. Surviving Sepsis hour-1 bundle if deteriorating. Avoid antibiotic over-extension (stewardship).
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Delirium &amp; cognition</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Hyperactive &amp; hypoactive delirium are common in the elderly post-major surgery. Non-pharmacological prevention (orientation, sleep, mobility), CAM-ICU screening, treat pain/hypoxia/sepsis first; haloperidol/dexmedetomidine for refractory hyperactive cases.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">GI &amp; nutrition</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Postoperative ileus: opioid-sparing analgesia, early enteral feeding, alvimopan in select centres. Stress-ulcer prophylaxis only for ventilated / coagulopathic patients (REVISE/PEPTIC).
                </p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Evidence Base — Trials & Audits to Quote">
            <div className="space-y-2">
              {[
                { trial: "Pearse 2006 (UK cohort)", result: "12.5% of surgery is high-risk yet accounts for ~80% of perioperative deaths; only 15% admitted to critical care. Foundational for UK perioperative policy." },
                { trial: "EuSOS (2012)", result: "European Surgical Outcomes Study — 28-day in-hospital mortality after non-cardiac surgery 4%, with marked variation between countries; only 5% of those who died were admitted to ICU at any point." },
                { trial: "OPTIMISE (2014) + meta-analysis", result: "Cardiac-output-guided haemodynamic therapy reduced complications (RR 0.77) but no individual trial mortality benefit. Now embedded in ERAS pathways." },
                { trial: "INPRESS (2017)", result: "Individualised MAP target (within 10% of baseline) reduced organ dysfunction at 7 days vs MAP ≥65 mmHg." },
                { trial: "VISION (2017)", result: "Defined MINS — postoperative hsTnT ≥20 ng/L with Δ≥5 (or ≥65 ng/L) confers 9% 30-day mortality; supports surveillance troponin in high-risk patients." },
                { trial: "POISE (2008) / POISE-2 (2014)", result: "Routine perioperative metoprolol initiation reduced MI but increased stroke and total mortality. Aspirin/clonidine showed no benefit in POISE-2. Continue chronic β-blockers; do not start de novo." },
                { trial: "EPOCH (2019)", result: "Cluster-randomised QI bundle for emergency laparotomy — no reduction in 90-day mortality. Implementation matters more than the bundle itself." },
                { trial: "NELA (annual)", result: "National Emergency Laparotomy Audit — year-on-year reductions in mortality (11.8% → 8.5%) through consultant presence, risk-documentation and post-op critical care." },
                { trial: "PrevAKI (2017)", result: "KDIGO bundle in cardiac surgery reduced moderate–severe AKI from 71% to 55% — supports proactive postoperative AKI prevention." },
                { trial: "RELIEF (2018)", result: "Restrictive intra- and postoperative fluid regimen INCREASED AKI vs moderately liberal in major abdominal surgery — avoid dogmatic dryness." },
              ].map((t) => (
                <div key={t.trial} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="font-semibold text-foreground text-sm">{t.trial}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t.result}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Long-term Outcomes & Rehabilitation">
            <p className="text-muted-foreground leading-relaxed">
              30-day mortality is only the start of the story. Patients surviving major surgery + critical care frequently develop <strong>post-intensive care syndrome (PICS)</strong> — physical deconditioning, cognitive impairment and psychological morbidity. Early mobilisation (TEAM trial showed no harm but no clear functional benefit), structured ICU follow-up clinics, and rehabilitation prescriptions (NICE CG83) are now embedded in CPOC pathways. Engage the patient and family in shared decisions about treatment escalation BEFORE surgery — particularly in the frail and elderly — to align critical-care interventions with what matters to the patient.
            </p>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "Risk scores: P-POSSUM, SORT, NELA risk, CPET (AT <11), Clinical Frailty Scale ≥5.",
              "Level-2/3 indications: predicted mortality >5%, intraoperative instability, complex comorbidity, major emergency surgery.",
              "Goal-directed fluid therapy (oesophageal Doppler/PPV) reduces complications in major surgery.",
              "MINS (myocardial injury after non-cardiac surgery): hs-troponin rise within 30 days; associated with high 30-day mortality — surveillance protocols recommended.",
              "Structured handover (SBAR/ATMIST), early HDU/ITU step-down planning, EWS triggers and consultant-delivered review.",
            ]}
          />
        </>
      }
    />
  );
};

export default PostopHighRiskIcuTopic;
