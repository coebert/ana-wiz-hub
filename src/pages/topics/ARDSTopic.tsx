import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { SynthesisBlock } from "@/components/SynthesisBlock";
import { ardsQuestions } from "@/data/quizzes";
import ECMOCircuitDiagram from "@/components/diagrams/ECMOCircuitDiagram";
import ECMOTroubleshootingDiagram from "@/components/diagrams/ECMOTroubleshootingDiagram";
import ARDSVentModeComparisonDiagram from "@/components/diagrams/ARDSVentModeComparisonDiagram";
import EOLIAMurrayCalculator from "@/components/diagrams/EOLIAMurrayCalculator";
import PneumoniaSteroidDecisionTree from "@/components/diagrams/PneumoniaSteroidDecisionTree";
import { DiagramSection } from "@/components/DiagramSection";
import { ExamSection } from "@/components/ExamSection";
import type { WorkedExample } from "@/components/WorkedExamples";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const objectives = [
  "Apply the Berlin definition to stratify ARDS severity and prognosis.",
  "Prescribe lung-protective ventilation (Vt, plateau and driving pressure, PEEP titration).",
  "Justify and deliver adjuncts: prone positioning, neuromuscular blockade, recruitment, iNO.",
  "Identify candidates for VV-ECMO using EOLIA / Murray score and outline referral.",
  "Describe ECMO circuit physiology, anticoagulation, and management of common complications.",
  "Manage COVID-19 specific evidence: dexamethasone, tocilizumab, anticoagulation, respiratory support escalation.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "P/F ratio and Berlin staging",
    scenario: (
      <>
        Intubated patient on FiO₂ 0.8, PEEP 12 cmH₂O. ABG: PaO₂ 9.6 kPa, PaCO₂ 6.0 kPa.
        Bilateral infiltrates on CXR, no LV failure on echo. Classify the ARDS.
      </>
    ),
    working: (
      <>
        Convert PaO₂ to mmHg: 9.6 × 7.5 = <strong>72 mmHg</strong>. P/F = 72 / 0.8 ={" "}
        <strong>90 mmHg</strong>. PEEP ≥5 ✓, bilateral opacities ✓, not cardiac ✓.
      </>
    ),
    answer: (
      <>
        <strong>Severe ARDS</strong> (P/F &lt;100). Mortality ~45%. Indications now triggered for
        prone positioning ≥16 h/day and early ECMO referral discussion (EOLIA threshold P/F &lt;80
        for &gt;6 h despite optimisation).
      </>
    ),
    cites: ["PROSEVA 2013"],
  },
  {
    title: "Driving pressure assessment",
    scenario: (
      <>
        70 kg (IBW) ARDS patient on VCV: Vt 420 mL, PEEP 14, plateau pressure 32 cmH₂O. Should
        you change anything?
      </>
    ),
    working: (
      <>
        Vt = 420 / 70 = <strong>6 mL/kg IBW</strong> ✓. Driving pressure ΔP = Pplat − PEEP =
        32 − 14 = <strong>18 cmH₂O</strong> (target ≤15). Plateau also above 30 cmH₂O ceiling.
      </>
    ),
    answer: (
      <>
        Reduce Vt towards 4–5 mL/kg IBW (permissive hypercapnia), reassess plateau and driving
        pressure. If ΔP remains &gt;15 despite this, recheck PEEP titration (decremental PEEP
        trial) and consider prone positioning — driving pressure is the strongest ventilator
        predictor of mortality (Amato 2015).
      </>
    ),
    cites: ["ARDS Definition 2012"],
  },
  {
    title: "VV-ECMO sweep vs flow troubleshooting",
    scenario: (
      <>
        Patient on VV-ECMO, blood flow 4.5 L/min, sweep 4 L/min, FdO₂ 1.0. SpO₂ 88%, PaCO₂ 4.2
        kPa. How do you respond?
      </>
    ),
    working: (
      <>
        Recall: <strong>blood flow → oxygenation</strong>; <strong>sweep gas → CO₂ clearance</strong>.
        Hypoxaemia + hypocapnia means too much sweep and not enough oxygenated blood reaching the
        patient. Check for recirculation (venous SpO₂ rising), Hb &gt;80 g/L, oxygenator
        function (pre/post gases).
      </>
    ),
    answer: (
      <>
        Reduce sweep to ~2 L/min to normalise PaCO₂ (avoid rapid drop &gt;1.3 kPa/h — risk of
        cerebral vasoconstriction and seizures). Increase blood flow if cannulae allow, transfuse
        to Hb 80–90 g/L, and recruit native lung. If oxygenator post-membrane PaO₂ low →
        change oxygenator.
      </>
    ),
    cites: ["BJA Educ 2018"],
  },
];

const ARDSTopic = () => {
  return (
    <TopicTemplate
      title="ARDS & Lung Injury"
      subtitle="FRCA Final / FFICM / EDIC — Intensive Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={[
        { text: "Berlin definition: mild (P/F 200-300), moderate (100-200), severe (<100) with PEEP ≥5", cites: ["ARDSNet 2000"] },
        { text: "Lung-protective ventilation: VT 6 ml/kg IBW, Pplat ≤30, driving pressure ≤15", cites: ["PROSEVA 2013"] },
        { text: "Prone positioning ≥16h/day reduces mortality in moderate-severe ARDS (PROSEVA)", cites: ["ARDS Definition 2012"] },
        { text: "VV-ECMO: respiratory support only — ↑ blood flow = ↑ oxygenation, ↑ sweep = ↑ CO₂ removal", cites: ["BJA Educ 2018"] },
        { text: "VA-ECMO: cardiac + respiratory — risk of Harlequin syndrome (monitor R radial SpO₂) and LV distension", cites: ["ARDSNet 2000"] },
        { text: "UFH is first-line anticoagulation: target APTT 50–70s or anti-Xa 0.3–0.5 IU/mL; bivalirudin for HIT", cites: ["PROSEVA 2013"] },
        { text: "COVID-19: Dexamethasone 6 mg/d × 10d is standard of care (RECOVERY). Add tocilizumab within 24h of organ support if CRP >75", cites: ["ARDS Definition 2012"] },
        { text: "COVID-19: Therapeutic anticoagulation benefits moderate (non-ICU) patients but NOT critically ill (REMAP-CAP/ATTACC/ACTIV-4a)", cites: ["BJA Educ 2018"] },
        { text: "COVID-19: CPAP preferred over HFNO over standard O₂ for non-intubated patients (RECOVERY-RS). Awake proning reduces intubation", cites: ["ARDSNet 2000"] },
        { text: "VV weaning: sweep-off trial (NOT flow-off). VA weaning: gradual flow reduction with echo assessment", cites: ["PROSEVA 2013"] },
        { text: "EOLIA: VV-ECMO for P/F <80 — non-significant but practice-changing (28% crossover, Bayesian benefit ~88%)", cites: ["ARDS Definition 2012"] },
      ]}
      topicId="ards"
      topicTitle="ARDS & Lung Injury"
      quizQuestions={ardsQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
      }}
      sectionSources={{
        objectives: [
          "ARDS Definition 2012",
          "PROSEVA 2013",
          "ARDSNet 2000",
          "BJA Educ 2018",
        ],
        keyPoints: [
          "ARDS Definition 2012",
          "PROSEVA 2013",
          "ARDSNet 2000",
          "BJA Educ 2018",
        ],
        workedExamples: ["PROSEVA 2013", "ARDS Definition 2012", "BJA Educ 2018"],
      }}
      coreConcepts={
    <>
      <section className="space-y-6">
        <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["CC2.4"]}>
          <CollapsibleSubsection title="Berlin Definition (2012)" defaultOpen>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The Berlin definition replaced the 1994 AECC criteria and stratifies ARDS by oxygenation impairment (PaO₂/FiO₂ on ≥5 cmH₂O PEEP) into mild, moderate, and severe categories — each with a stepwise rise in mortality. Onset must be within 7 days of a known insult, with bilateral opacities not fully explained by cardiac failure or volume overload.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Severity</th>
                  <th className="text-left py-2 text-foreground font-semibold">PaO₂/FiO₂</th>
                  <th className="text-left py-2 text-foreground font-semibold">Mortality</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Mild</td><td>200-300 mmHg</td><td>~27%</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Moderate</td><td>100-200 mmHg</td><td>~32%</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Severe</td><td>&lt;100 mmHg</td><td>~45%</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            All with: onset within 7 days, bilateral opacities on CXR/CT, not fully explained by cardiac failure/fluid overload, PEEP ≥5 cmH₂O.
          </p>
          </CollapsibleSubsection>
        </ExamSection>

        <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
          <CollapsibleSubsection title="Management Strategy">
          <div className="space-y-3">
            {[
              { level: "Foundation", items: "Lung-protective ventilation (VT 6 ml/kg IBW, Pplat ≤30), conservative fluid strategy, treat underlying cause" },
              { level: "Moderate ARDS", items: "Higher PEEP strategy, prone positioning for ≥16 hours/day (PROSEVA — mortality benefit), neuromuscular blockade in first 48h (ACURASYS/ROSE)" },
              { level: "Severe / Rescue", items: "VV-ECMO (EOLIA — referral for PaO₂/FiO₂ <80 despite optimisation), inhaled nitric oxide (↑V/Q matching, no mortality benefit), recruitment manoeuvres (caution — ART trial)" },
            ].map((l) => (
              <div key={l.level} className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{l.level}</p>
                <p className="text-sm text-muted-foreground mt-1">{l.items}</p>
              </div>
            ))}
          </div>
          </CollapsibleSubsection>
        </ExamSection>

        <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
          <CollapsibleSubsection title="Prone Positioning">
          <p className="text-muted-foreground leading-relaxed">
            PROSEVA trial (2013): prone positioning ≥16h/day in moderate-severe ARDS (P/F &lt;150) reduced 28-day mortality from 32.8% to 16.0% (NNT = 6). Mechanism: improved V/Q matching, recruitment of dorsal lung, reduced transpulmonary pressure gradient, improved drainage of secretions. Contraindications: spinal instability, open abdomen, raised ICP.
          </p>
          </CollapsibleSubsection>
        </ExamSection>

        <ARDSVentModeComparisonDiagram />
      </section>

      {/* ECMO Section */}
      <EOLIAMurrayCalculator />
      <ECMOCircuitDiagram />
      <ECMOTroubleshootingDiagram />

      <section className="space-y-6 mb-10">
        {/* ECMO Indications & Referral */}
        <ExamSection exams={[Exam.FFICM, Exam.EDIC]}>
          <CollapsibleSubsection title="ECMO — Indications & Referral Criteria">
          <div className="space-y-3">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">VV-ECMO — Refractory Hypoxaemia</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>EOLIA criteria:</strong> PaO₂/FiO₂ &lt;80 mmHg for &gt;6 hours, OR PaO₂/FiO₂ &lt;50 for &gt;3 hours, OR pH &lt;7.25 + PaCO₂ ≥60 mmHg for &gt;6 hours — despite optimal conventional management (prone, PEEP, NMB). Refer early to ECMO centre. UK: 5 designated centres (Glenfield, Royal Papworth, St Thomas', Aberdeen, GICU).
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">VA-ECMO — Cardiogenic Shock</p>
              <p className="text-sm text-muted-foreground mt-1">
                Refractory cardiogenic shock despite inotropes/IABP. Indications: massive MI, fulminant myocarditis, post-cardiotomy shock, cardiac arrest (eCPR), bridge to LVAD/transplant, pulmonary embolism with RV failure. Also bridge to decision in hypothermic cardiac arrest.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
              <p className="text-sm font-semibold text-destructive">⚠ Contraindications to ECMO</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Absolute:</strong> Irreversible condition with no plan (bridge to nowhere), advanced directives refusing. <strong>Relative:</strong> Prolonged MV &gt;10 days, severe immunosuppression, uncontrolled bleeding, severe aortic regurgitation (VA-ECMO), aortic dissection.
              </p>
            </div>
          </div>
          </CollapsibleSubsection>
        </ExamSection>

        {/* Key ECMO Parameters */}
        <ExamSection exams={[Exam.FFICM, Exam.EDIC]}>
          <CollapsibleSubsection title="Key Adjustable ECMO Parameters">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Parameter</th>
                  <th className="text-left py-2 text-foreground font-semibold">Controls</th>
                  <th className="text-left py-2 text-foreground font-semibold">Clinical Effect</th>
                  <th className="text-left py-2 text-foreground font-semibold">Typical Range</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Blood flow rate (RPM)</td>
                  <td className="py-2">Oxygenation (primary)</td>
                  <td className="py-2">↑ flow = ↑ O₂ delivery. In VA-ECMO also ↑ cardiac output support</td>
                  <td className="py-2">3–6 L/min (60–80 ml/kg/min)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Sweep gas flow</td>
                  <td className="py-2">CO₂ removal (primary)</td>
                  <td className="py-2">↑ sweep = ↑ CO₂ clearance. Independent of blood flow. Very efficient — even low flows clear CO₂</td>
                  <td className="py-2">1–10 L/min (start 1:1 with blood flow)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">FdO₂ (sweep gas FiO₂)</td>
                  <td className="py-2">Oxygenation</td>
                  <td className="py-2">Fraction of O₂ in sweep gas. Usually kept at 1.0 initially, can wean as lung recovers</td>
                  <td className="py-2">0.21–1.0</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Temperature (heater)</td>
                  <td className="py-2">Patient temperature</td>
                  <td className="py-2">Heat exchanger integrated into circuit. Can actively warm or cool (TTM post-arrest)</td>
                  <td className="py-2">33–37°C</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Ventilator settings</td>
                  <td className="py-2">Lung rest</td>
                  <td className="py-2">"Rest settings" to minimise VILI: FiO₂ 0.3, PEEP 10, RR 10, Pplat &lt;25. Lungs kept open but not stressed</td>
                  <td className="py-2">Ultra-protective: TV 3–4 ml/kg</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-3 grid sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Oxygenation Troubleshooting</p>
              <p className="text-xs text-muted-foreground mt-1">
                Low SpO₂ on ECMO: ↑ blood flow rate → ↑ FdO₂ → check for recirculation (VV) → check haemoglobin (aim Hb &gt;70–80 g/L) → check oxygenator function (pre/post-oxygenator gases) → consider native lung recruitment.
              </p>
            </div>
            <div className="p-3 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">CO₂ Troubleshooting</p>
              <p className="text-xs text-muted-foreground mt-1">
                High PaCO₂: ↑ sweep gas flow (most effective). Low PaCO₂: ↓ sweep gas flow. <strong>Caution:</strong> Rapid CO₂ correction can cause cerebral vasoconstriction → seizures. Reduce PaCO₂ slowly (&lt;10 mmHg/hr).
              </p>
            </div>
          </div>
          </CollapsibleSubsection>
        </ExamSection>

        {/* Anticoagulation */}
        <ExamSection exams={[Exam.FFICM, Exam.EDIC]}>
          <CollapsibleSubsection title="Anticoagulation on ECMO">
          <p className="text-muted-foreground leading-relaxed mb-4">
            The extracorporeal circuit activates the coagulation cascade on contact with foreign surfaces. Anticoagulation is essential to prevent circuit thrombosis but must be balanced against bleeding risk — the leading cause of morbidity on ECMO.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Agent</th>
                  <th className="text-left py-2 text-foreground font-semibold">Mechanism</th>
                  <th className="text-left py-2 text-foreground font-semibold">Monitoring</th>
                  <th className="text-left py-2 text-foreground font-semibold">Target</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Unfractionated Heparin (UFH)</td>
                  <td className="py-2">AT-III dependent thrombin/Xa inhibition</td>
                  <td className="py-2">APTT, anti-Xa, ACT</td>
                  <td className="py-2">APTT 50–70s or anti-Xa 0.3–0.5 IU/mL (ACT 180–220s)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Bivalirudin</td>
                  <td className="py-2">Direct thrombin inhibitor (AT-III independent)</td>
                  <td className="py-2">APTT, ECT, ACT</td>
                  <td className="py-2">APTT 50–80s. No antidote (short t½ ~25 min). Dose: 0.05–0.2 mg/kg/hr</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Argatroban</td>
                  <td className="py-2">Direct thrombin inhibitor</td>
                  <td className="py-2">APTT</td>
                  <td className="py-2">APTT 1.5–3× baseline. Used in HIT. Hepatic metabolism — caution in liver failure</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">No anticoagulation</td>
                  <td className="py-2">—</td>
                  <td className="py-2">Close circuit inspection</td>
                  <td className="py-2">Considered in active bleeding, recent surgery, DIC. Higher blood flows (&gt;3.5 L/min) + heparin-bonded circuits reduce clotting risk</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="space-y-3">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Heparin-Induced Thrombocytopenia (HIT) on ECMO</p>
              <p className="text-sm text-muted-foreground mt-1">
                HIT is a clinical diagnosis on ECMO — thrombocytopenia is common from consumption, haemodilution, and circuit sequestration. 4Ts score is unreliable. If suspected: stop all heparin (including flushes and heparin-bonded lines), send HIT antibodies + SRA, switch to <strong>bivalirudin</strong> or <strong>argatroban</strong>. Do NOT use LMWH (cross-reactivity).
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Acquired Von Willebrand Syndrome (AVWS)</p>
              <p className="text-sm text-muted-foreground mt-1">
                High shear stress in centrifugal pump cleaves large vWF multimers → acquired type 2A vWD. Causes mucosal bleeding (GI, pulmonary, surgical sites). Occurs in nearly all ECMO patients. Management: DDAVP, vWF concentrate, reduce pump speed if possible. Monitor: vWF activity/antigen ratio.
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Practical Anticoagulation Strategy</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Initiation:</strong> UFH bolus 50–100 IU/kg at cannulation → infusion 10–20 IU/kg/hr. <strong>Monitoring:</strong> APTT 4–6 hourly initially. Anti-Xa more reliable in critical illness (less affected by factor depletion). <strong>AT-III:</strong> If APTT unresponsive to heparin escalation → check AT-III levels → supplement if &lt;60% (AT-III concentrate). <strong>Bleeding:</strong> Most centres accept lower targets (APTT 40–50s) or withhold anticoagulation with high blood flows.
              </p>
            </div>
          </div>
          </CollapsibleSubsection>
        </ExamSection>

        {/* ECMO Complications */}
        <ExamSection exams={[Exam.FFICM, Exam.EDIC]}>
          <CollapsibleSubsection title="ECMO Complications">
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: "Bleeding", detail: "Most common complication (30–50%). Surgical sites, cannulation sites, GI, intracranial. Manage: reduce anticoagulation, transfuse, surgical control, consider AVWS." },
              { title: "Circuit thrombosis", detail: "Oxygenator clot (↑ transmembrane pressure gradient, ↓ gas exchange) → exchange oxygenator. Pump head thrombus. Cannula thrombus." },
              { title: "Haemolysis", detail: "Shear stress from pump, kinking, high RPM. Monitor: plasma-free Hb, LDH, haptoglobin. Manage: ↓ RPM, check circuit for kinks, exchange pump head." },
              { title: "Limb ischaemia (VA)", detail: "Femoral artery cannulation → distal ischaemia. Prevented by distal perfusion cannula (6–8 Fr). Monitor: NIRS, pulse oximetry on ipsilateral foot, hourly limb checks." },
              { title: "Air embolism", detail: "Catastrophic — air enters drainage side (negative pressure). Prevention: secure all connections, avoid access proximal to drainage. Emergency: clamp circuit, Trendelenburg, aspirate air." },
              { title: "Infection", detail: "Cannula-related bloodstream infection. Daily inspection, aseptic technique. Empiric treatment as per local protocol if septic. Circuit is NOT routinely changed." },
            ].map((c) => (
              <div key={c.title} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{c.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{c.detail}</p>
              </div>
            ))}
          </div>
          </CollapsibleSubsection>
        </ExamSection>

        {/* Weaning */}
        <ExamSection exams={[Exam.FFICM, Exam.EDIC]}>
          <CollapsibleSubsection title="ECMO Weaning & Decannulation">
          <div className="space-y-3">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">VV-ECMO Weaning</p>
              <p className="text-sm text-muted-foreground mt-1">
                Evidence of lung recovery: improving CXR, compliance, native gas exchange. <strong>Sweep-off trial:</strong> Reduce sweep gas to 0 (blood still flowing) → assess native gas exchange on "rest" ventilator settings. If PaO₂ &gt;60 mmHg and PaCO₂ &lt;50 mmHg on FiO₂ ≤0.5 and PEEP ≤10 for 4–6 hours → decannulate. Do NOT reduce blood flow (clotting risk).
              </p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">VA-ECMO Weaning</p>
              <p className="text-sm text-muted-foreground mt-1">
                Evidence of cardiac recovery: improving EF on echo, ↑ pulse pressure, ↑ aortic VTI. <strong>Turndown trial:</strong> Gradually reduce flow (by 0.5 L/min every few hours) to minimum (1–1.5 L/min) while monitoring haemodynamics. Assess: MAP, CVP, lactate, echo (LV function, filling). If stable at minimum flow → decannulate. Ensure adequate anticoagulation during low flows.
              </p>
            </div>
          </div>
          </CollapsibleSubsection>
        </ExamSection>

        {/* Key Evidence */}
        <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
          <CollapsibleSubsection title="Key ECMO Evidence">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Trial</th>
                  <th className="text-left py-2 text-foreground font-semibold">Population</th>
                  <th className="text-left py-2 text-foreground font-semibold">Key Finding</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">CESAR (2009)</td>
                  <td className="py-2">Severe ARDS (Murray ≥3)</td>
                  <td className="py-2">Transfer to ECMO centre improved survival (63% vs 47%), but not all received ECMO — benefit may be centre expertise</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">EOLIA (2018)</td>
                  <td className="py-2">Very severe ARDS (P/F &lt;80)</td>
                  <td className="py-2">60-day mortality 35% vs 46% (p=0.09). Not significant but 28% crossover. Bayesian post-hoc: ~88% probability of benefit. Changed practice despite failing primary endpoint.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">ELSO Registry</td>
                  <td className="py-2">Global ECMO data</td>
                  <td className="py-2">Adult respiratory ECMO survival ~60%. Cardiac ~40%. eCPR ~30%. COVID-era survival lower (~48% respiratory).</td>
                </tr>
              </tbody>
            </table>
          </div>
          </CollapsibleSubsection>
        </ExamSection>

        {/* COVID-19 Severe Respiratory Failure */}
        <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
          <CollapsibleSubsection title="COVID-19 — Severe Respiratory Failure">
          <p className="text-muted-foreground leading-relaxed mb-4">
            COVID-19 pneumonitis can cause ARDS but may present with atypical features. The evidence base evolved rapidly during the pandemic and continues to be refined. Key principles align with standard ARDS management but with specific pharmacological adjuncts.
          </p>

          <div className="space-y-3 mb-4">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Phenotypes of COVID-19 Respiratory Failure</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Type L (early / "silent hypoxia"):</strong> Low elastance (high compliance), low V/Q ratio, low lung weight, low recruitability. Patients may tolerate hypoxia well initially. Responds to supplemental O₂, CPAP/HFNO, prone positioning (awake). <strong>Type H (later / classic ARDS):</strong> High elastance (low compliance), high right-to-left shunt, high lung weight, high recruitability. Requires intubation, lung-protective ventilation, higher PEEP. Some patients transition from L → H phenotype.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-serif font-semibold text-foreground mb-2">Pharmacological Management — Current Evidence</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Therapy</th>
                  <th className="text-left py-2 text-foreground font-semibold">Evidence</th>
                  <th className="text-left py-2 text-foreground font-semibold">Recommendation</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Dexamethasone</td>
                  <td className="py-2">RECOVERY trial: 6 mg/day × 10 days reduced 28-day mortality in ventilated patients (29.3% → 23.3%, NNT 8) and those on O₂ (26.2% → 23.3%). No benefit if no O₂ requirement.</td>
                  <td className="py-2 font-medium text-primary">Standard of care for all hospitalised patients requiring O₂</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Tocilizumab (IL-6 inhibitor)</td>
                  <td className="py-2">REMAP-CAP & RECOVERY: Reduced mortality and organ support duration when given within 24h of ICU admission alongside corticosteroids. CRP &gt;75 mg/L used as eligibility marker.</td>
                  <td className="py-2 font-medium text-primary">Recommended within 24h of organ support + CRP &gt;75</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Baricitinib (JAK inhibitor)</td>
                  <td className="py-2">COV-BARRIER & RECOVERY: Reduced 28-day mortality (HR 0.87). Alternative to tocilizumab if IL-6 inhibitors unavailable. Can be combined with corticosteroids.</td>
                  <td className="py-2 font-medium text-primary">Alternative to tocilizumab, especially if IL-6 inhibitor unavailable</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Anticoagulation</td>
                  <td className="py-2">REMAP-CAP/ATTACC/ACTIV-4a: Therapeutic-dose LMWH improved organ support-free days in moderate illness (ward patients). <strong>No benefit in critically ill / ICU patients</strong> — standard prophylactic dose recommended in ICU.</td>
                  <td className="py-2">Therapeutic in moderate (non-ICU); prophylactic in ICU</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Antivirals (Nirmatrelvir/Ritonavir, Remdesivir)</td>
                  <td className="py-2">Nirmatrelvir/ritonavir (Paxlovid): reduces hospitalisation in high-risk outpatients (EPIC-HR). Remdesivir: modest benefit if given early (&lt;7 days symptoms), ACTT-1 showed faster recovery. No mortality benefit in ventilated patients.</td>
                  <td className="py-2">Early treatment in high-risk patients; limited role once ventilated</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Convalescent plasma / HCQ / Lopinavir-ritonavir</td>
                  <td className="py-2">RECOVERY, REMAP-CAP, SOLIDARITY: No benefit demonstrated. Hydroxychloroquine showed possible harm.</td>
                  <td className="py-2 text-destructive font-medium">Not recommended — no benefit</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-serif font-semibold text-foreground mb-2">Respiratory Support Escalation</h3>
          <div className="space-y-2 mb-4">
            {[
              { step: "1. Supplemental O₂", detail: "Target SpO₂ 92–96%. Nasal cannulae → Venturi mask → non-rebreathe mask." },
              { step: "2. HFNO / CPAP", detail: "RECOVERY-RS: CPAP reduced intubation + death vs conventional O₂ (OR 0.72). HFNO non-inferior. Awake prone positioning recommended concurrently (meta-analyses show reduced intubation)." },
              { step: "3. Intubation & Ventilation", detail: "Standard ARDS lung-protective ventilation. VT 6 ml/kg IBW, Pplat ≤30. Video laryngoscopy first-line (aerosol-generating procedure). Full PPE (FFP3/N95, gown, visor)." },
              { step: "4. Prone Positioning", detail: "Same PROSEVA principles ≥16h/day. COVID patients often show excellent oxygenation response. Awake self-proning in non-intubated patients also beneficial." },
              { step: "5. ECMO", detail: "VV-ECMO for refractory hypoxia. ELSO COVID registry: survival ~48% (lower than pre-COVID ~60%). Refer early. Later waves showed worse outcomes — patient selection critical." },
            ].map((s) => (
              <div key={s.step} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{s.step}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-semibold text-foreground mb-2">COVID-Specific ICU Considerations</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: "Thromboprophylaxis", detail: "Markedly elevated VTE risk. Standard prophylactic LMWH in ICU. Low threshold for CTPA if PE suspected." },
              { title: "Secondary Infections", detail: "Bacterial co-infection ~5% at presentation but VAP common (~40%). COVID-associated pulmonary aspergillosis (CAPA) — screen BAL galactomannan if refractory fever on steroids." },
              { title: "Cytokine Storm", detail: "Hyperinflammatory phenotype: ↑ferritin, CRP, IL-6, D-dimer. Treat with dexamethasone + tocilizumab/baricitinib. HLH screen if refractory." },
              { title: "Prolonged Weaning", detail: "ICU-acquired weakness very common (immobility, steroids, NMB). Tracheostomy often required. Early rehab. Post-ICU follow-up for long COVID / PICS." },
              { title: "Cardiac Complications", detail: "Myocarditis, AF, ACS, RV failure from pulmonary hypertension. Troponin and echo monitoring. PE vs in-situ pulmonary thrombosis." },
              { title: "Renal & Multi-organ", detail: "AKI in 20–30% of ventilated patients. Multifactorial: direct viral, haemodynamic, nephrotoxins. RRT if standard indications." },
            ].map((c) => (
              <div key={c.title} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{c.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{c.detail}</p>
              </div>
            ))}
          </div>
          </CollapsibleSubsection>
        </ExamSection>

        {/* Key COVID Trials */}
        <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
          <CollapsibleSubsection title="Key COVID-19 Critical Care Trials">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Trial</th>
                  <th className="text-left py-2 text-foreground font-semibold">Intervention</th>
                  <th className="text-left py-2 text-foreground font-semibold">Key Finding</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">RECOVERY (2020–)</td>
                  <td className="py-2">Dexamethasone</td>
                  <td className="py-2">6 mg/d × 10d: ↓ mortality in ventilated (NNT 8) and O₂-dependent. Largest COVID RCT (12,000+ patients).</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">REMAP-CAP (2021)</td>
                  <td className="py-2">Tocilizumab / Sarilumab</td>
                  <td className="py-2">IL-6 inhibitors within 24h of organ support: ↓ mortality + ↓ organ support duration. aOR for hospital survival 1.64.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">COV-BARRIER (2021)</td>
                  <td className="py-2">Baricitinib</td>
                  <td className="py-2">JAK inhibitor: ↓ 28-day mortality (HR 0.57 in ventilated subgroup). WHO strong recommendation.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">RECOVERY-RS (2022)</td>
                  <td className="py-2">CPAP vs HFNO vs O₂</td>
                  <td className="py-2">CPAP ↓ intubation + death vs standard O₂. HFNO non-inferior to CPAP.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">REMAP-CAP / ATTACC / ACTIV-4a</td>
                  <td className="py-2">Therapeutic anticoagulation</td>
                  <td className="py-2">Benefit in moderate (non-critically ill). No benefit (possible harm) in critically ill.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">SOLIDARITY (WHO)</td>
                  <td className="py-2">Remdesivir, HCQ, Lopinavir, IFN</td>
                  <td className="py-2">None showed mortality benefit. Remdesivir: modest ↓ recovery time (ACTT-1) but no benefit once ventilated.</td>
                </tr>
              </tbody>
            </table>
          </div>
          </CollapsibleSubsection>
        </ExamSection>

        {/* Guideline comparison */}
        <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
          <CollapsibleSubsection title="Major Guideline Comparison">
          <p className="text-muted-foreground leading-relaxed mb-3">
            Side-by-side summary of the contemporary ARDS frameworks. Berlin 2012 is purely diagnostic, while
            ESICM 2023 and the ATS/ESICM/SCCM 2024 Global Definition cover both diagnosis and management — the 2024
            update notably includes non-intubated patients on HFNO.
          </p>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-xs min-w-[760px]">
              <thead>
                <tr className="bg-secondary/40 text-foreground">
                  <th className="text-left p-2 font-semibold border-b border-border">Topic</th>
                  <th className="text-left p-2 font-semibold border-b border-border">Berlin 2012</th>
                  <th className="text-left p-2 font-semibold border-b border-border">ESICM 2023</th>
                  <th className="text-left p-2 font-semibold border-b border-border">ATS/ESICM/SCCM 2024 (Global Definition)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground align-top">
                {[
                  {
                    topic: "Definition / severity",
                    berlin: "Acute (≤7d), bilateral opacities, not fully explained by cardiac failure, P/F on PEEP ≥5: mild 200–300, moderate 100–200, severe ≤100. Requires invasive ventilation.",
                    esicm: "Adopts Berlin. Adds 'ARDS on HFNO' category for ≥30 L/min when intubation deferred.",
                    global: "Expands Berlin: includes non-intubated patients on HFNO ≥30 L/min or NIV/CPAP ≥5 cmH₂O. SpO₂/FiO₂ ratio ≤315 acceptable when ABG unavailable. Removes mandatory PEEP threshold for non-intubated.",
                  },
                  {
                    topic: "Tidal volume",
                    berlin: "Not prescriptive (definition only) — implies low V_T per ARDSnet (6 mL/kg PBW).",
                    esicm: "6 mL/kg PBW (strong). Plateau pressure ≤30 cmH₂O. Driving pressure ≤15 cmH₂O.",
                    global: "Reaffirms 4–8 mL/kg PBW (target 6). Plateau ≤30, driving pressure ≤15. Personalised based on respiratory mechanics.",
                  },
                  {
                    topic: "PEEP strategy",
                    berlin: "PEEP ≥5 required to define ARDS — no specific titration recommendation.",
                    esicm: "Higher PEEP in moderate–severe ARDS (conditional). Use ARDSnet PEEP/FiO₂ tables or oesophageal manometry. Recruitment manoeuvres NOT recommended (ART trial — increased mortality).",
                    global: "Higher PEEP for moderate–severe. Individualise (PEEP/FiO₂ table, transpulmonary pressure, EIT). Avoid sustained recruitment manoeuvres.",
                  },
                  {
                    topic: "Prone positioning",
                    berlin: "Not addressed.",
                    esicm: "Strong recommendation — prone for ≥12h (ideally 16h) in moderate–severe ARDS (P/F <150). Based on PROSEVA (mortality benefit).",
                    global: "Strong recommendation — prone ≥12–16h/day in moderate–severe ARDS, including awake proning in non-intubated COVID-related ARDS (RECOVERY-RS). Initiate within first 36h.",
                  },
                  {
                    topic: "Neuromuscular blockade",
                    berlin: "Not addressed.",
                    esicm: "Conditional — short-course (≤48h) cisatracurium for moderate–severe ARDS with severe dyssynchrony. ROSE trial diluted earlier ACURASYS benefit, so reserved for refractory dyssynchrony rather than routine.",
                    global: "Same as ESICM — NMB only for severe dyssynchrony or refractory hypoxaemia, NOT routine. Use deep sedation first.",
                  },
                  {
                    topic: "ECMO criteria",
                    berlin: "Not addressed.",
                    esicm: "VV-ECMO for severe ARDS refractory to optimal conventional therapy (lung-protective + prone + NMB). Refer early. EOLIA criteria: P/F <80 for >6h, OR pH <7.25 + PaCO₂ ≥60 for >6h, OR Murray ≥3.",
                    global: "Endorses VV-ECMO for severe ARDS refractory to conventional therapy. Refer early to ECMO centre. Bayesian re-analysis of EOLIA + post-hoc data support mortality benefit.",
                  },
                  {
                    topic: "Steroids",
                    berlin: "Not addressed.",
                    esicm: "Conditional recommendation — methylprednisolone in early moderate–severe ARDS (DEXA-ARDS, CoDEX). Avoid in late fibroproliferative phase.",
                    global: "Supports steroids in moderate–severe ARDS, particularly COVID-19 (dexamethasone 6 mg per RECOVERY).",
                  },
                ].map((row) => (
                  <tr key={row.topic} className="border-b border-border last:border-b-0 hover:bg-secondary/20">
                    <td className="p-2 font-semibold text-foreground">{row.topic}</td>
                    <td className="p-2">{row.berlin}</td>
                    <td className="p-2">{row.esicm}</td>
                    <td className="p-2">{row.global}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-sm mb-1">Where they all agree</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>Low tidal volume (6 mL/kg PBW), plateau ≤30, driving pressure ≤15</li>
                <li>Prone positioning ≥12–16h for moderate–severe ARDS (PROSEVA)</li>
                <li>VV-ECMO referral for severe refractory ARDS (EOLIA)</li>
                <li>Avoid sustained recruitment manoeuvres (ART trial harm)</li>
                <li>Conservative fluid balance once shock resolved (FACTT)</li>
              </ul>
            </div>
            <div className="p-3 rounded-lg border border-border bg-secondary/20">
              <p className="font-semibold text-foreground text-sm mb-1">Where they differ</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li><strong>Diagnostic scope</strong>: Global 2024 includes HFNO/NIV patients and SpO₂/FiO₂; Berlin requires invasive ventilation + ABG</li>
                <li><strong>NMB</strong>: ESICM/Global narrow indication after ROSE; older practice was routine for moderate–severe</li>
                <li><strong>PEEP titration</strong>: Global emphasises personalisation (transpulmonary pressure, EIT) vs older PEEP/FiO₂ table</li>
                <li><strong>Steroids</strong>: stronger endorsement in Global (post-COVID evidence) than earlier guidance</li>
              </ul>
            </div>
          </div>
          </CollapsibleSubsection>
        </ExamSection>
      </section>

      <section className="space-y-4 mb-10">
        <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
          <CollapsibleSubsection title="Corticosteroids in Severe Pneumonia — Updated Evidence">
          <p className="text-muted-foreground leading-relaxed mb-3">
            The role of steroids in pneumonia has been transformed since 2020. Three high-quality RCTs (RECOVERY, CAPE COD, ESCAPe) and the post-COVID guideline updates have moved corticosteroids from "controversial adjunct" to <strong>standard care in severe community-acquired pneumonia (sCAP) and COVID-19 pneumonia requiring oxygen</strong>. The picture for influenza and non-severe CAP remains more nuanced.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">COVID-19 pneumonia — the paradigm shifter</h3>
          <div className="overflow-x-auto mb-3">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 text-foreground font-semibold">Trial</th>
                  <th className="text-left p-2 text-foreground font-semibold">Population</th>
                  <th className="text-left p-2 text-foreground font-semibold">Intervention</th>
                  <th className="text-left p-2 text-foreground font-semibold">Outcome</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border align-top"><td className="p-2 font-medium text-foreground">RECOVERY (Horby, NEJM 2021)</td><td className="p-2">6,425 hospitalised COVID-19</td><td className="p-2">Dexamethasone 6 mg OD × 10 d vs usual care</td><td className="p-2">28-day mortality ↓ overall (22.9% vs 25.7%, RR 0.83). Benefit confined to those on O₂ (RR 0.82) or IMV (RR 0.64); <strong>harm signal in patients NOT requiring oxygen</strong>.</td></tr>
                <tr className="border-b border-border align-top"><td className="p-2 font-medium text-foreground">REMAP-CAP steroid domain (Angus, JAMA 2020)</td><td className="p-2">384 ICU COVID-19</td><td className="p-2">Hydrocortisone 50 mg QDS × 7 d vs no steroid</td><td className="p-2">Bayesian probability of superiority ≥93% for organ-support-free days. Stopped early after RECOVERY.</td></tr>
                <tr className="border-b border-border align-top"><td className="p-2 font-medium text-foreground">COVID STEROID 2 (Munch, JAMA 2021)</td><td className="p-2">1,000 patients on ≥10 L/min O₂</td><td className="p-2">Dexamethasone 12 mg vs 6 mg × 10 d</td><td className="p-2">No significant difference in days alive without life support at 28 days. <strong>6 mg remains standard.</strong></td></tr>
                <tr><td className="p-2 font-medium text-foreground">RECOVERY high-dose (2023, Lancet)</td><td className="p-2">Hypoxic, escalating O₂ need</td><td className="p-2">Dex 20 mg × 5 d then 10 mg × 5 d vs 6 mg × 10 d</td><td className="p-2">No mortality benefit; <strong>more hyperglycaemia &amp; infection</strong>. High dose not recommended outside trials.</td></tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 rounded-lg border-l-4 border-primary bg-secondary/30 mb-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Practice point:</strong> dexamethasone 6 mg OD (PO/IV) for up to 10 days, in any hospitalised COVID-19 patient requiring supplemental oxygen or organ support. Equivalent doses: hydrocortisone 50 mg QDS, methylprednisolone 32 mg OD, prednisolone 40 mg OD. Combine with tocilizumab (single 8 mg/kg) if CRP ≥75 mg/L or escalating O₂ requirement (REMAP-CAP / RECOVERY).
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Severe community-acquired pneumonia (non-COVID)</h3>
          <div className="overflow-x-auto mb-3">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 text-foreground font-semibold">Trial</th>
                  <th className="text-left p-2 text-foreground font-semibold">Population</th>
                  <th className="text-left p-2 text-foreground font-semibold">Intervention</th>
                  <th className="text-left p-2 text-foreground font-semibold">Outcome</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border align-top"><td className="p-2 font-medium text-foreground">CAPE COD (Dequin, NEJM 2023)</td><td className="p-2">800 ICU sCAP (PSI &gt;130, mech vent, HFNO with PaO₂/FiO₂ &lt;300, or NIV)</td><td className="p-2">Hydrocortisone 200 mg/day × 4–7 d then taper vs placebo. <strong>Excluded influenza & septic shock.</strong></td><td className="p-2"><strong>28-day mortality 6.2% vs 11.9% (ARR 5.6%, NNT 18).</strong> Less intubation (18% vs 29.5%), less vasopressor use. No ↑ in nosocomial infection or GI bleed; mild ↑ in insulin requirement.</td></tr>
                <tr className="border-b border-border align-top"><td className="p-2 font-medium text-foreground">ESCAPe (Meduri, ICM 2022)</td><td className="p-2">584 US veterans, severe CAP within 96 h of ICU admission</td><td className="p-2">Methylprednisolone 40 mg/day taper × 20 d</td><td className="p-2">No 60-day mortality benefit (16% vs 18%). Late enrolment (median 60 h) and predominantly male/older cohort. Less compelling than CAPE COD.</td></tr>
                <tr className="border-b border-border align-top"><td className="p-2 font-medium text-foreground">Torres (JAMA 2015)</td><td className="p-2">120 sCAP with ↑CRP (&gt;150 mg/L)</td><td className="p-2">Methylpred 0.5 mg/kg BD × 5 d</td><td className="p-2">Treatment failure 13% vs 31%; no mortality difference. Hyperinflammatory signal.</td></tr>
                <tr><td className="p-2 font-medium text-foreground">Stern Cochrane (2017, updated 2023)</td><td className="p-2">17 RCTs, ~3,000 hospitalised CAP</td><td className="p-2">Steroids vs placebo</td><td className="p-2">All-cause mortality reduced in <strong>severe CAP only</strong> (RR 0.58); no benefit in non-severe. Reduced LOS, time to clinical stability across all severities. Trade-off: hyperglycaemia (NNH ~10).</td></tr>
              </tbody>
            </table>
          </div>
          <div className="p-3 rounded-lg border-l-4 border-clinical bg-secondary/30 mb-2">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Current consensus (ATS/IDSA 2024 update, ESICM/SCCM 2024):</strong> hydrocortisone 200 mg/day (continuous infusion or 50 mg QDS) for 4–7 days then taper, in adults admitted to ICU with severe CAP <em>not</em> caused by influenza, ideally started within 24 h of ICU admission. CAPE COD-style dosing is now recommended over older methylprednisolone regimens.
            </p>
          </div>
          <div className="p-3 rounded-lg border-l-4 border-destructive bg-destructive/5 mb-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Caveats:</strong> CAPE COD <em>excluded</em> influenza, septic shock requiring high-dose vasopressors, and immunocompromised hosts. Benefit may not extend to these groups. Always send respiratory viral PCR + atypical screen before committing to steroids — particularly to exclude influenza.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Influenza pneumonia — caution</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Observational data (Rodrigo 2016 meta-analysis, Moreno 2018, REVA-FRENCH ICU Network) consistently show <strong>increased mortality, longer ICU stay and more secondary infections</strong> with corticosteroids in influenza pneumonia. The 2024 ATS/IDSA, WHO and ESICM guidelines all recommend <strong>against routine steroids in influenza</strong>, restricting use to recognised secondary indications (refractory septic shock per SURVIVING SEPSIS, exacerbation of COPD/asthma, or established ARDS where benefit is felt to outweigh harm). Always test for influenza in any patient being considered for steroids during the respiratory virus season.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Pneumocystis (PJP) pneumonia</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Long-established benefit in <strong>HIV-associated PJP with PaO₂ &lt;9.3 kPa or A–a gradient &gt;4.7 kPa on room air</strong>: prednisolone 40 mg BD × 5 d → 40 mg OD × 5 d → 20 mg OD × 11 d, started within 72 h of antimicrobial therapy (Bozzette NEJM 1990). Evidence in non-HIV PJP (haematology, transplant) is weaker but most centres extrapolate the same regimen.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Mechanism — why does it work?</h3>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
            <li><strong>Suppression of host hyperinflammation</strong> — IL-6, TNF-α, IL-1β downregulation prevents the diffuse alveolar damage that drives ARDS in severe pneumonia.</li>
            <li><strong>Reduced pulmonary vascular permeability</strong> — preserves alveolar–capillary barrier; mirrors the vasogenic-oedema hypothesis in COVID-19.</li>
            <li><strong>Restored vascular tone</strong> — counters relative adrenal insufficiency and reduces vasopressor requirement (CAPE COD secondary outcome).</li>
            <li><strong>Neutrophil &amp; macrophage modulation</strong> — at the cost of impairing pathogen clearance, which is why benefit is concentrated in <em>severe</em>, hyperinflammatory disease.</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Practical prescribing summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 text-foreground font-semibold">Indication</th>
                  <th className="text-left p-2 text-foreground font-semibold">Regimen</th>
                  <th className="text-left p-2 text-foreground font-semibold">Evidence base</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border align-top"><td className="p-2 font-medium text-foreground">Hospitalised COVID-19 needing O₂</td><td className="p-2">Dexamethasone 6 mg OD PO/IV × up to 10 days</td><td className="p-2">RECOVERY 2021 (NEJM)</td></tr>
                <tr className="border-b border-border align-top"><td className="p-2 font-medium text-foreground">ICU sCAP (non-influenza, non-shock)</td><td className="p-2">Hydrocortisone 200 mg/day (50 mg QDS or infusion) × 4–7 d, then taper over 8–14 d</td><td className="p-2">CAPE COD 2023 (NEJM)</td></tr>
                <tr className="border-b border-border align-top"><td className="p-2 font-medium text-foreground">Septic shock complicating pneumonia</td><td className="p-2">Hydrocortisone 200 mg/day if vasopressors persist</td><td className="p-2">SURVIVING SEPSIS 2021; ADRENAL/APROCCHSS 2018</td></tr>
                <tr className="border-b border-border align-top"><td className="p-2 font-medium text-foreground">HIV-PJP with hypoxia</td><td className="p-2">Prednisolone taper 40 mg BD → 20 mg OD over 21 d</td><td className="p-2">Bozzette 1990</td></tr>
                <tr><td className="p-2 font-medium text-foreground">Influenza pneumonia (alone)</td><td className="p-2"><strong>Avoid</strong> — only if co-existing recognised indication (shock, COPD, ARDS)</td><td className="p-2">Rodrigo 2016 meta; ATS/IDSA 2024</td></tr>
              </tbody>
            </table>
          </div>

          <DiagramSection
            title="Interactive Decision Tree — 'Should I Give Steroids?'"
            intro={
              <p>
                Walk through severity, suspected pathogen, shock status and contraindications to get an evidence-based
                regimen at the leaf node. Synthesises CAPE COD 2023, RECOVERY 2021, ATS/IDSA 2024, ESICM/SCCM 2024 and
                Bozzette 1990 into a single bedside aid.
              </p>
            }
          >
            <PneumoniaSteroidDecisionTree />
          </DiagramSection>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Adverse effects to monitor</h3>
          <p className="text-muted-foreground leading-relaxed">
            Hyperglycaemia (most common, often requires insulin infusion), secondary bacterial / fungal infections (CAPA risk in COVID), GI bleeding (co-prescribe PPI), neuropsychiatric effects, ICU-acquired weakness (synergistic with NMB), and <strong>strongyloides hyperinfection</strong> in patients from endemic areas — give empirical ivermectin if recent travel/residence and unable to test promptly.
          </p>
          </CollapsibleSubsection>
        </ExamSection>
      </section>

      <SynthesisBlock
        title="ARDS — Severity-Stratified Management"
        subtitle="An at-a-glance map from the Berlin/Global definition to the corresponding evidence-based interventions."
        variant="table"
      >
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left p-2 text-foreground font-semibold">Severity</th>
              <th className="text-left p-2 text-foreground font-semibold">P/F (PEEP ≥5)</th>
              <th className="text-left p-2 text-foreground font-semibold">Mortality</th>
              <th className="text-left p-2 text-foreground font-semibold">Key Interventions</th>
            </tr>
          </thead>
          <tbody className="text-foreground/90">
            {[
              ["Mild", "200–300", "~27%", "Vt 6 ml/kg PBW · plateau <30 · driving Δ <15 · moderate PEEP"],
              ["Moderate", "100–200", "~32%", "+ Higher PEEP (LOV/EXPRESS) · consider proning if P/F <150"],
              ["Severe", "<100", "~45%", "Proning ≥16 h (PROSEVA) · NMB if dyssynchrony · ECMO referral if refractory (EOLIA)"],
            ].map(([severity, pf, mortality, action]) => (
              <tr key={severity as string} className="border-b border-border/50">
                <td className="p-2 font-medium">{severity}</td>
                <td className="p-2 text-muted-foreground">{pf}</td>
                <td className="p-2 text-muted-foreground">{mortality}</td>
                <td className="p-2 text-muted-foreground">{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-muted-foreground mt-3">
          Cross-cutting: low Vt + low driving pressure are the only ventilator interventions with consistent mortality benefit. Steroids (dexamethasone, COVID-era evidence) and conservative fluids (FACTT) improve secondary outcomes across all severities.
        </p>
      </SynthesisBlock>

          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "Berlin definition: acute (<7 days), bilateral infiltrates, not explained by cardiac failure, PaO₂/FiO₂ ≤300 on PEEP ≥5.",
              "Mild 200–300, moderate 100–200, severe ≤100 (mmHg) — mortality rises stepwise.",
              "Prone for ≥16 h/day in severe ARDS (PaO₂/FiO₂ <150) — PROSEVA showed mortality benefit.",
              "Neuromuscular blockade for 48 h in severe ARDS reduces barotrauma but ROSE trial showed no mortality benefit.",
              "Refractory hypoxaemia: consider ECMO referral (Murray score ≥3, PaO₂/FiO₂ <80) — EOLIA trial.",
            ]}
          />
    </>
      }
    />
  );
};

export default ARDSTopic;
