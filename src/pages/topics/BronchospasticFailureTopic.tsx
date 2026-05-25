import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { Exam } from "@/data/curriculum";
import { ExamSection } from "@/components/ExamSection";
import { SynthesisBlock } from "@/components/SynthesisBlock";
import { bronchospasticFailureQuestions } from "@/data/quizzes";
import DynamicHyperinflationDiagram from "@/components/diagrams/DynamicHyperinflationDiagram";
import SedacondaDiagram from "@/components/diagrams/SedacondaDiagram";
import type { WorkedExample } from "@/components/WorkedExamples";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";
import { InlineRef } from "@/components/InlineRef";

const objectives = [
  "Apply BTS/SIGN criteria to recognise life-threatening and near-fatal asthma and escalate appropriately.",
  "Set safe ventilator parameters in severe bronchospasm — low RR, prolonged expiratory time, permissive hypercapnia — and detect dynamic hyperinflation.",
  "Choose ketamine as the induction agent and outline rescue strategies (volatile via Sedaconda, heliox, ECMO).",
  "Differentiate management of IECOPD from asthma — controlled O₂ 88–92 %, NIV first-line for hypercapnic respiratory failure.",
  "Manage cardiovascular collapse from auto-PEEP by ventilator disconnection, fluid and reduction of minute ventilation.",
  "Explain how Sedaconda/AnaConDa delivers volatile agent through a standard ICU ventilator.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Auto-PEEP cardiac arrest",
    scenario: (
      <>
        Intubated severe asthmatic on VCV: Vt 500 mL, RR 18, I:E 1:2, PEEP 5. Within 8 min the patient
        develops PEA arrest, peak Paw 60, abdomen distending, no breath sounds bilaterally.
      </>
    ),
    working: (
      <>
        Differential is dynamic hyperinflation (auto-PEEP) vs bilateral tension pneumothorax. Both are
        managed by immediate <strong>disconnection from the ventilator</strong> ± bilateral finger
        thoracostomies. Expiratory hold post-resus would confirm total PEEP ≫ set PEEP.
      </>
    ),
    answer: (
      <>
        Disconnect from circuit and let chest deflate (often gives ROSC). Resume at RR 8, I:E 1:5,
        Vt 6 mL/kg, PEEP 0–3, accept pH ≥ 7.15. Bronchodilators, ketamine sedation, IV magnesium 2 g.
        If still failing → volatile via Sedaconda or VV-ECMO referral.
      </>
    ),
    cites: ["GOLD COPD 2023"],
  },
  {
    title: "IECOPD — choosing NIV vs intubation",
    scenario: (
      <>
        70-year-old with IECOPD. RR 28, SpO₂ 84 % on 28 % Venturi (target 88–92 %). ABG: pH 7.24, PaCO₂
        9.8 kPa, HCO₃ 32, GCS 14 with mild confusion.
      </>
    ),
    working: (
      <>
        Hypercapnic acidosis pH 7.24 is in the NIV window (pH 7.25–7.35 ideal but use down to ~7.20 with
        close monitoring). Conscious enough to protect airway. Controlled O₂ on Venturi already set
        appropriately (88–92 %). NIV NNT to avoid intubation ≈ 5 (Plant 2000).
      </>
    ),
    answer: (
      <>
        Start BiPAP (IPAP 12–15, EPAP 4–5, FiO₂ titrated to SpO₂ 88–92 %). Reassess pH, PaCO₂ and GCS at
        1 h — if no improvement or deterioration, intubate (ketamine + rocuronium), set RR 10, I:E 1:4,
        accept permissive hypercapnia.
      </>
    ),
    cites: ["BJA Educ Asthma 2017"],
  },
  {
    title: "Sedaconda for refractory bronchospasm",
    scenario: (
      <>
        Day 2 ventilated near-fatal asthma. Maxed on salbutamol, ipratropium, magnesium, ketamine
        infusion, IV adrenaline 0.1 µg/kg/min, plateau still 38, ETCO₂ 11 kPa.
      </>
    ),
    working: (
      <>
        Volatile anaesthetics are potent bronchodilators (sevoflurane, isoflurane). Sedaconda places a
        carbon reflector between the ETT and ventilator that recaptures ~ 90 % of exhaled volatile,
        allowing delivery via a standard ICU ventilator with a small syringe driver, no anaesthetic
        machine required.
      </>
    ),
    answer: (
      <>
        Set up Sedaconda with sevoflurane 5–8 mL/h, target end-tidal sevo 0.5–1 % (~ 0.3–0.5 MAC).
        Monitor end-tidal volatile, BP (vasodilation), and watch for fluoride accumulation if &gt; 48 h.
        If still failing → VV-ECMO referral.
      </>
    ),
    cites: ["GINA 2023"],
  },
];

const keyPoints = [
  { text: "Dynamic hyperinflation and auto-PEEP cause cardiovascular collapse in ventilated bronchospasm — disconnect the ventilator if PEA arrest occurs", cites: ["BTS/SIGN Asthma 2019"] },
  { text: "Ventilation strategy: low RR, prolonged I:E ratio, high inspiratory flow, permissive hypercapnia — minimising gas trapping is the priority", cites: ["GOLD COPD 2023"] },
  { text: "NIV is first-line for hypercapnic respiratory failure in COPD (pH 7.25–7.35) but NOT for acute asthma", cites: ["BJA Educ Asthma 2017"] },
  { text: "Normal or rising PaCO₂ in acute asthma is a life-threatening sign — the patient is tiring", cites: ["GINA 2023"] },
  { text: "Ketamine is the ideal induction agent for intubation in bronchospasm (bronchodilator + haemodynamic stability)", cites: ["BTS/SIGN Asthma 2019"] },
  { text: "Volatile agents via Sedaconda/AnaConDa provide potent bronchodilation in refractory bronchospasm — rescue therapy when conventional treatment fails", cites: ["GOLD COPD 2023"] },
  { text: "Sedaconda uses a carbon reflector to recapture ~90% of exhaled volatile, allowing delivery via standard ICU ventilators without an anaesthetic machine — typical adult infusion ~5–12 mL/h titrated to end-tidal agent", cites: ["BJA Educ Asthma 2017", "Sedaconda SPC"] },
  { text: "Mucus plugging is the major cause of death in fatal asthma — corticosteroids and bronchoscopic lavage address this", cites: ["GINA 2023"] },
  { text: "COPD O₂ target 88–92%; asthma O₂ target 94–98% — controlled oxygen is critical in COPD to avoid worsening hypercapnia", cites: ["BTS/SIGN Asthma 2019"] },
];

const BronchospasticFailureTopic = () => {
  return (
    <TopicTemplate
      title="Bronchospastic Respiratory Failure"
      subtitle="FRCA Final / FFICM / EDIC — Intensive Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={keyPoints}
      topicId="bronchospastic-failure"
      topicTitle="Bronchospastic Respiratory Failure"
      quizQuestions={bronchospasticFailureQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
      }}
      sectionSources={{
        objectives: [
          "BTS/SIGN Asthma 2019",
          "GINA 2023",
          "BJA Educ Asthma 2017",
          "GOLD COPD 2023",
        ],
        keyPoints: [
          "BTS/SIGN Asthma 2019",
          "GINA 2023",
          "BJA Educ Asthma 2017",
          "GOLD COPD 2023",
          "Sedaconda SPC",
        ],
        workedExamples: ["GOLD COPD 2023", "BJA Educ Asthma 2017", "GINA 2023"],
      }}
      coreConcepts={
    <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
      <section className="space-y-8 mb-10">

        {/* ---- Overview ---- */}
        <CollapsibleSubsection title="Overview" defaultOpen>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Bronchospastic respiratory failure encompasses life-threatening asthma and infective exacerbations of COPD (IECOPD) — two conditions sharing bronchoconstriction as a central mechanism but differing in pathophysiology, reversibility, and ventilatory approach. Both are common reasons for ICU admission, and management errors (particularly during mechanical ventilation) can be rapidly fatal.
          </p>
        </CollapsibleSubsection>

        {/* ---- Life-Threatening Asthma ---- */}
        <CollapsibleSubsection title="Life-Threatening Asthma">
          <p className="text-muted-foreground leading-relaxed mb-3">
            BTS/SIGN classification stratifies acute asthma by severity. Life-threatening and near-fatal asthma require immediate escalation and ICU involvement.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Severity Classification (BTS/SIGN<InlineRef topicId="bronchospastic-failure" refLabel="BTS/SIGN Asthma 2019" />)</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Severity</th>
                  <th className="text-left py-2 text-foreground font-semibold">Features</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Moderate</td>
                  <td>Increasing symptoms, PEF 50–75% best/predicted, no features of severe asthma</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Acute Severe</td>
                  <td>PEF 33–50%, RR ≥25, HR ≥110, inability to complete sentences in one breath</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Life-Threatening</td>
                  <td>PEF &lt;33%, SpO₂ &lt;92%, PaO₂ &lt;8 kPa, normal or raised PaCO₂, silent chest, cyanosis, poor respiratory effort, altered consciousness, hypotension, arrhythmia, exhaustion</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Near-Fatal</td>
                  <td>Raised PaCO₂ and/or requiring mechanical ventilation with raised inflation pressures</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Pathophysiology</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Acute Phase</p>
              <p className="text-xs text-muted-foreground mt-1">Bronchial smooth muscle spasm (minutes), mast cell degranulation, histamine and leukotriene release. Responds to bronchodilators. IgE-mediated in allergic asthma.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Late Phase</p>
              <p className="text-xs text-muted-foreground mt-1">Eosinophilic airway inflammation (4–12 h), mucosal oedema, mucus plugging. Responds to corticosteroids. Mucus plugging is the major cause of death at post-mortem — contributes to refractory hypoxaemia.</p>
            </div>
          </div>

          <DynamicHyperinflationDiagram />

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Dynamic Hyperinflation & Gas Trapping</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Narrowed airways increase expiratory time constants. If insufficient time is allowed for expiration, gas trapping occurs → progressive hyperinflation → intrinsic PEEP (auto-PEEP) → reduced venous return → cardiovascular collapse. This is the primary mechanism of peri-arrest deterioration in severe asthma.
          </p>
          <div className="space-y-2 mb-4">
            {[
              { label: "Clinical Signs", detail: "Tracheal tug, hyperexpanded chest, reduced air entry, paradoxical abdominal movement, pulsus paradoxus (>10 mmHg fall in systolic BP on inspiration — reflects exaggerated intrathoracic pressure swings)." },
              { label: "Cardiovascular Compromise", detail: "Auto-PEEP acts like a Valsalva manoeuvre → ↓ venous return → ↓ cardiac output → PEA arrest. Immediate management: disconnect from ventilator and allow prolonged expiration. Bilateral thoracostomies to exclude tension pneumothorax." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </CollapsibleSubsection>

        {/* ---- Pharmacological Management ---- */}
        <CollapsibleSubsection title="Pharmacological Management">

          <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">First-Line Therapies</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Agent</th>
                  <th className="text-left py-2 text-foreground font-semibold">Mechanism & Dosing</th>
                  <th className="text-left py-2 text-foreground font-semibold">Key Points</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Salbutamol (nebulised)</td>
                  <td>β₂-agonist. 5 mg nebulised, can be continuous (5–10 mg/h) in severe cases. Oxygen-driven nebuliser.</td>
                  <td>Tachycardia, tremor, hypokalaemia, lactic acidosis (β₂-mediated). Back-to-back nebs in life-threatening.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Ipratropium bromide</td>
                  <td>Muscarinic antagonist (M₃). 500 μg nebulised QDS. Additive to β₂-agonists.</td>
                  <td>Slower onset (30–60 min) but longer duration. Add to salbutamol in severe/life-threatening. Blocks vagal bronchomotor tone.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Corticosteroids</td>
                  <td>Prednisolone 40–50 mg PO or hydrocortisone 100 mg IV QDS<InlineRef topicId="bronchospastic-failure" refLabel="BTS/SIGN Asthma 2019" />. Onset 4–6 h.</td>
                  <td>Reduce eosinophilic inflammation and mucus production. Continue for at least 5 days or until recovery. No evidence for &gt;7 days in most exacerbations.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Oxygen</td>
                  <td>Target SpO₂ 94–98% (asthma) or 88–92% (COPD).</td>
                  <td>Asthma: hypoxia kills — give high-flow O₂ freely. COPD: risk of hypercapnia with uncontrolled O₂. Venturi masks for precise FiO₂.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Escalation Therapies</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Agent</th>
                  <th className="text-left py-2 text-foreground font-semibold">Mechanism & Dosing</th>
                  <th className="text-left py-2 text-foreground font-semibold">Key Points</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">IV magnesium sulphate</td>
                  <td>Smooth muscle relaxation via Ca²⁺ antagonism. 1.2–2 g IV over 20 min (single dose).</td>
                  <td>BTS guideline for acute severe/life-threatening asthma with poor initial response. Weak evidence in COPD. Monitor for hypotension, flushing.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">IV salbutamol</td>
                  <td>5 μg/min, titrate to 20 μg/min. Bolus 250 μg slow IV in extremis.</td>
                  <td>When inhaled route is ineffective (severe air trapping, no ventilation). High risk of arrhythmia, lactic acidosis, hypokalaemia. ECG and K⁺ monitoring.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">IV aminophylline</td>
                  <td>Phosphodiesterase inhibitor. Loading 5 mg/kg over 20 min (omit if on theophylline), then 0.5 mg/kg/h infusion<InlineRef topicId="bronchospastic-failure" refLabel="BTS/SIGN Asthma 2019" />. Narrow therapeutic index.</td>
                  <td>Weak bronchodilator, improves diaphragm contractility. Toxicity: arrhythmias, seizures, vomiting. Measure theophylline levels (10–20 mg/L). Drug interactions (CYP1A2): erythromycin, ciprofloxacin increase levels.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">IV ketamine</td>
                  <td>NMDA antagonist with direct bronchodilatory effect and sympathomimetic properties. Sub-dissociative: 0.1–0.5 mg/kg bolus, then 0.1–0.5 mg/kg/h.</td>
                  <td>Increases bronchial secretions (combine with anticholinergic). Useful for sedation in ventilated asthmatics. Preserves respiratory drive at low doses. Evidence mainly from case reports/small series.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">IV adrenaline</td>
                  <td>α + β agonist. 0.5 mg IM (anaphylaxis protocol) or IV infusion 0.05–0.5 μg/kg/min in extremis.</td>
                  <td>Reserved for peri-arrest/cardiac arrest with bronchospasm, or when anaphylaxis cannot be excluded. Potent bronchodilator via β₂ but significant cardiac risk.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CollapsibleSubsection>

        {/* ---- NIV ---- */}
        <CollapsibleSubsection title="Non-Invasive Ventilation (NIV)">
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">NIV in IECOPD (Strong Evidence)</p>
              <p className="text-xs text-muted-foreground mt-1">
                First-line for acute hypercapnic respiratory failure (pH 7.25–7.35, PaCO₂ &gt;6 kPa) in COPD. Reduces intubation rates, mortality, and length of stay (Cochrane evidence). BiPAP: typical starting pressures IPAP 12–15 cmH₂O, EPAP 4–5 cmH₂O, titrate to tidal volume ~7 ml/kg and reduction in PaCO₂. Review ABG at 1–2 h — if no improvement, consider intubation early. BTS/ICS guideline: set ceiling of treatment before starting.
              </p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">NIV in Asthma (Limited Evidence)</p>
              <p className="text-xs text-muted-foreground mt-1">
                NOT first-line in acute asthma (BTS/SIGN). May be considered as a bridge in selected patients with hypercapnic respiratory failure who are tiring but not immediately requiring intubation. Risk of pneumothorax. CPAP/BiPAP may reduce work of breathing and counterbalance auto-PEEP. Close monitoring — low threshold for intubation if deteriorating.
              </p>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            {[
              { label: "Contraindications to NIV", detail: "Undrained pneumothorax, vomiting/high aspiration risk, facial trauma/burns, GCS <8, upper airway obstruction, recent upper GI surgery. Life-threatening haemodynamic instability. Fixed upper airway obstruction." },
              { label: "Monitoring on NIV", detail: "Continuous SpO₂, RR, HR, GCS. ABG at 1 h, 4 h, and if deteriorating. Escalation plan documented. Patient comfort — mask fit, pressure sores, claustrophobia. 1:1 nursing initially." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </CollapsibleSubsection>

        {/* ---- Invasive Ventilation Strategies ---- */}
        <CollapsibleSubsection title="Invasive Ventilation Strategies">
          <p className="text-muted-foreground leading-relaxed mb-3">
            Mechanical ventilation in bronchospasm is high-risk. The fundamental principle is to <strong>minimise gas trapping</strong> by allowing adequate expiratory time — this means tolerating hypercapnia ('permissive hypercapnia') to avoid dynamic hyperinflation and cardiovascular collapse.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Intubation Considerations</h3>
          <div className="space-y-2 mb-4">
            {[
              { label: "Indications", detail: "Respiratory arrest, GCS <8, exhaustion, worsening hypoxaemia despite maximal therapy, cardiovascular collapse, inability to speak/cough. A clinical decision — do not wait for ABG confirmation." },
              { label: "Induction", detail: "Ketamine is ideal (bronchodilator + haemodynamic stability). Propofol also has bronchodilatory properties. Avoid thiopentone (histamine release). Suxamethonium or rocuronium — suxamethonium does NOT worsen bronchospasm despite common misconception. Largest ETT possible (≥7.5 mm) to reduce airway resistance." },
              { label: "Immediate Post-Intubation", detail: "Hand ventilate initially to assess compliance and expiratory time. Watch for cardiovascular collapse on positive pressure (auto-PEEP exacerbation). Have vasopressors available. Ventilate slowly with low rate — allow passive expiration." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Ventilator Settings</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Parameter</th>
                  <th className="text-left py-2 text-foreground font-semibold">Asthma</th>
                  <th className="text-left py-2 text-foreground font-semibold">COPD</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Mode</td>
                  <td>Volume-controlled preferred (guarantees tidal volume despite high resistance). Pressure-controlled acceptable if closely monitored.</td>
                  <td>Volume-controlled or pressure-controlled. Pressure support for weaning when recovering.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Tidal Volume</td>
                  <td>6–8 ml/kg IBW</td>
                  <td>6–8 ml/kg IBW</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Respiratory Rate</td>
                  <td>8–12 /min (low to maximise expiratory time)</td>
                  <td>12–16 /min (less severe gas trapping than asthma)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">I:E Ratio</td>
                  <td>1:3 to 1:5 (prolonged expiration essential)</td>
                  <td>1:2 to 1:4</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Inspiratory Flow</td>
                  <td>High (60–100 L/min) — shortens inspiratory time → more time for expiration</td>
                  <td>Moderate-high (40–80 L/min)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">PEEP</td>
                  <td>Low or zero (0–5 cmH₂O) — adding PEEP to a patient with auto-PEEP risks worsening hyperinflation. Some advocate matching ~80% of auto-PEEP to reduce trigger work.</td>
                  <td>Low-moderate (5–8 cmH₂O) — match ~80% auto-PEEP to reduce trigger effort and work of breathing. More accepted in COPD than asthma.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Permissive Hypercapnia</td>
                  <td>Accept PaCO₂ up to 10–12 kPa and pH down to 7.15–7.20. Avoid in raised ICP. Minute ventilation is sacrificed to prevent hyperinflation.</td>
                  <td>Chronic CO₂ retainers — aim for their usual PaCO₂. Less tolerance for acute rises. Renal compensation already present.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Monitoring for Hyperinflation</h3>
          <div className="space-y-2 mb-4">
            {[
              { label: "Plateau Pressure (Pplat)", detail: <>Aim &lt;30 cmH₂O<InlineRef topicId="bronchospastic-failure" refLabel="BJA Educ Asthma 2017" />. Reflects alveolar pressure at end-inspiration. High Pplat suggests hyperinflation or lung injury risk.</> },
              { label: "Auto-PEEP (Intrinsic PEEP)", detail: "Measured by end-expiratory hold. If >10–15 cmH₂O, gas trapping is significant — reduce RR, increase expiratory time, or disconnect briefly." },
              { label: "Expiratory Flow Waveform", detail: "If flow does not return to zero before the next inspiration, gas trapping is occurring. The most immediate bedside indicator." },
              { label: "VEI (End-Inspiratory Volume)", detail: "Total volume above FRC — measured by collecting all exhaled gas during apnoea. Target <20 ml/kg to avoid haemodynamic compromise." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </CollapsibleSubsection>

        {/* ---- IECOPD ---- */}
        <CollapsibleSubsection title="Infective Exacerbation of COPD (IECOPD)">
          <p className="text-muted-foreground leading-relaxed mb-3">
            COPD exacerbations are characterised by increased dyspnoea, sputum volume and purulence (Anthonisen criteria). Unlike asthma, the airflow limitation is predominantly fixed with a smaller reversible component. Chronic CO₂ retention and reliance on hypoxic respiratory drive add complexity.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Common Precipitants</p>
              <p className="text-xs text-muted-foreground mt-1">Viral (rhinovirus, influenza) and bacterial (<em>H. influenzae</em>, <em>S. pneumoniae</em>, <em>Moraxella catarrhalis</em>, <em>Pseudomonas</em> in severe COPD) infections. Air pollution, non-adherence, PE, pneumothorax, sedatives.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Key Differences from Asthma</p>
              <p className="text-xs text-muted-foreground mt-1">Fixed airflow limitation (FEV₁/FVC &lt;0.7 post-bronchodilator). Neutrophilic rather than eosinophilic inflammation. Loss of elastic recoil → emphysema → reduced driving pressure for expiration. Chronic hyperinflation at baseline. Less bronchodilator reversibility.</p>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            {[
              { label: "Medical Management", detail: "Controlled oxygen (24–28% Venturi, target SpO₂ 88–92%). Nebulised salbutamol + ipratropium (air-driven nebulisers if hypercapnic — or use O₂-driven with 6 min limit). Prednisolone 30 mg PO × 5 days (REDUCE trial). Antibiotics if purulent sputum (amoxicillin, doxycycline, or co-amoxiclav; local guidelines). Aminophylline if inadequate response." },
              { label: "Weaning from Ventilation", detail: "Often more challenging than asthma. Diaphragm weakness, malnutrition, and deconditioning contribute. Early tracheostomy may facilitate weaning. Pressure support weaning trials. NIV can be used as step-down from invasive ventilation. Physiotherapy for secretion clearance. COPD patients may not return to pre-admission baseline." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </CollapsibleSubsection>

        {/* ---- Comparing Asthma vs COPD ---- */}
        <CollapsibleSubsection title="Asthma vs COPD: Key Comparisons">
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Feature</th>
                  <th className="text-left py-2 text-foreground font-semibold">Asthma</th>
                  <th className="text-left py-2 text-foreground font-semibold">COPD</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Airflow obstruction</td>
                  <td>Variable, reversible</td>
                  <td>Progressive, largely fixed</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Inflammatory cell</td>
                  <td>Eosinophils, Th2 lymphocytes, mast cells</td>
                  <td>Neutrophils, CD8+ T cells, macrophages</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Baseline PaCO₂</td>
                  <td>Normal (any CO₂ rise is sinister)</td>
                  <td>Often chronically elevated (compensated respiratory acidosis)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">O₂ target</td>
                  <td>94–98%</td>
                  <td>88–92%</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">NIV role</td>
                  <td>Limited evidence, not first-line</td>
                  <td>Strong evidence, first-line for type 2 respiratory failure</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Ventilation strategy</td>
                  <td>Very low RR (8–12), I:E 1:4–1:5, permissive hypercapnia</td>
                  <td>Low-moderate RR (12–16), I:E 1:2–1:4, aim for baseline PaCO₂</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Severity of gas trapping</td>
                  <td>Severe — dominant mechanism of deterioration</td>
                  <td>Moderate — loss of recoil contributes but less acute</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Recovery/weaning</td>
                  <td>Usually rapid once bronchospasm resolves</td>
                  <td>Often prolonged — respiratory muscle weakness, comorbidities</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CollapsibleSubsection>

        {/* ---- Inhaled Volatile Agents / Sedaconda ---- */}
        <CollapsibleSubsection title="Inhaled Volatile Agents in ICU">
          <p className="text-muted-foreground leading-relaxed mb-3">
            Volatile anaesthetic agents (isoflurane, sevoflurane) are potent bronchodilators that act by direct smooth muscle relaxation, inhibition of airway reflexes, and reduction of inflammatory mediator release. They have been used as rescue therapy in refractory bronchospasm for decades, but traditionally required an anaesthetic machine at the bedside. The development of the <strong>Anaesthetic Conserving Device (AnaConDa / Sedaconda)</strong> has made ICU delivery practical.
          </p>

          <SedacondaDiagram />

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Mechanism of Bronchodilation</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Direct Smooth Muscle Relaxation</p>
              <p className="text-xs text-muted-foreground mt-1">Inhibition of intracellular Ca²⁺ release and sensitisation pathways. Reduction in acetylcholine-mediated bronchoconstriction. Dose-dependent effect — greater bronchodilation at higher MAC fractions.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Anti-inflammatory Effects</p>
              <p className="text-xs text-muted-foreground mt-1">Reduce neutrophil chemotaxis and activation. Decrease pro-inflammatory cytokine release (TNF-α, IL-6, IL-8). May attenuate ventilator-induced lung injury. Emerging evidence for lung-protective properties beyond bronchodilation.</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">The Sedaconda (AnaConDa) System</h3>
          <div className="space-y-2 mb-4">
            {[
              { label: "Device Design", detail: "A modified HME (heat-moisture exchanger) containing an activated carbon fibre reflector. Inserted between the Y-piece and ETT. Liquid volatile agent (isoflurane or sevoflurane) is infused via syringe pump through the device, evaporates within the reflector, and is delivered to the patient. On expiration, ~90% of exhaled volatile is adsorbed by the reflector and re-delivered on the next inspiration — minimising waste and environmental contamination." },
              { label: "Sedaconda-S (Small)", detail: "50 ml dead space device designed for sedation (lower agent concentrations). Suitable for most ICU patients. Isoflurane is the most commonly used agent (lower cost, less compound A concern than sevoflurane)." },
              { label: "Agent Delivery & Monitoring", detail: "Liquid isoflurane/sevoflurane infused via standard syringe pump — typical adult sedation rates ~3–7 mL/h with AnaConDa-S and ~5–12 mL/h with the larger AnaConDa, titrated to end-tidal agent concentration (Sedaconda SPC). End-tidal agent monitored by an inline anaesthetic gas monitor (essential for safe use). Target Fe'Iso 0.3–0.8% for sedation; higher for bronchodilation (0.5–1.5 MAC equivalent). Requires gas scavenging on ventilator exhaust port." },
              { label: "Practical Setup", detail: "Compatible with standard ICU ventilators (no anaesthetic machine needed). Adds 50–100 ml dead space — may need to increase tidal volume slightly. Change AnaConDa device every 24 h. Ensure gas analyser is calibrated for the specific agent. Active charcoal filter on expiratory limb for scavenging." },
              { label: "Advantages over IV Sedation", detail: "Rapid onset and offset (wake-up times 15–20 min vs hours with propofol/midazolam). No accumulation in renal/hepatic failure. Organ-protective properties (cardiac preconditioning). Reduced delirium incidence (some evidence). Direct bronchodilation — dual benefit in bronchospasm." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Safety Considerations</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Risks & Side Effects</p>
              <p className="text-xs text-muted-foreground mt-1">Cardiovascular depression (vasodilation, myocardial depression — dose-dependent). Malignant hyperthermia risk (screen history). Sevoflurane: compound A production (low-flow) and fluoride nephrotoxicity (prolonged use &gt;48 h — prefer isoflurane for longer-term). Environmental pollution — scavenging mandatory. Hepatotoxicity (rare, mainly halothane historically but cross-sensitivity possible).</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Contraindications</p>
              <p className="text-xs text-muted-foreground mt-1">Known/suspected malignant hyperthermia susceptibility. Raised ICP (volatiles increase CBF at &gt;1 MAC). Severe haemodynamic instability (hypotension may worsen). Known hypersensitivity to halogenated agents. Inability to provide adequate gas scavenging/monitoring.</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Evidence Base</h3>
          <div className="space-y-2 mb-4">
            {[
              { label: "Refractory Bronchospasm", detail: "Case series and observational studies demonstrate rapid improvement in airway pressures, PaCO₂, and ventilation within 30–60 min of initiating volatile therapy. No RCTs specifically for bronchospasm. Used as rescue in near-fatal asthma when conventional therapy fails." },
              { label: "ICU Sedation (General)", detail: "ISCA trial (isoflurane via AnaConDa): similar sedation quality to propofol/midazolam with faster wake-up times. Reduced opioid requirements. SED-ICU trial and others support feasibility and safety. Not yet widely adopted outside specialist centres." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </CollapsibleSubsection>

        {/* ---- Rescue Therapies ---- */}
        <CollapsibleSubsection title="Rescue Therapies & Special Situations">
          <div className="space-y-2">
            {[
              { label: "ECMO for Refractory Asthma", detail: "VV-ECMO has been used successfully in near-fatal asthma when conventional ventilation fails. Allows 'lung rest' — can reduce or stop mechanical ventilation entirely while bronchospasm resolves. Young patients with reversible pathology are ideal candidates. Early referral to ECMO centre." },
              { label: "Heliox (Helium-Oxygen)", detail: "Helium (70–80%) + oxygen mixture. Lower density than air → reduces turbulent flow resistance → improves gas delivery to distal airways. Reduces work of breathing. Limitations: FiO₂ limited to 20–30%, not widely available, requires non-rebreathing system. Evidence weak but physiologically rational as a bridge." },
              { label: "Bronchoscopy & Lavage", detail: "Mucus plugging is the major cause of death in fatal asthma. Bronchoscopic lavage can remove inspissated mucus plugs in refractory cases. Risk of worsening bronchospasm during procedure. Consider in ventilated patients with persistent lobar collapse despite aggressive medical therapy." },
              { label: "Prone Positioning", detail: "Limited evidence in asthma/COPD but may improve V/Q matching and facilitate secretion drainage. Case reports of benefit in refractory asthma. More established in ARDS — may overlap if ARDS develops as a complication." },
              { label: "General Anaesthesia", detail: "If volatile agents via Sedaconda are unavailable, transfer to theatre for inhalational anaesthesia with sevoflurane/isoflurane via a standard anaesthetic machine has been used as a last resort in near-fatal asthma." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </CollapsibleSubsection>

      </section>

      <SynthesisBlock
        title="Severe Bronchospasm in the Ventilated Patient — Stepwise Plan"
        subtitle="From immediate ventilator manoeuvres through bronchodilator therapy to rescue strategies."
        variant="table"
      >
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left p-2 text-foreground font-semibold">Step</th>
              <th className="text-left p-2 text-foreground font-semibold">Intervention</th>
              <th className="text-left p-2 text-foreground font-semibold">Rationale / Trigger</th>
            </tr>
          </thead>
          <tbody className="text-foreground/90">
            {[
              ["1 — Recognise", "Wheeze, ↑Paw, ↑PetCO₂, expiratory flow not returning to baseline", "Diagnose dynamic hyperinflation — DISCONNECT if PEA arrest"],
              ["2 — Ventilator", "↓ RR (8–10), ↑ Te (I:E 1:4–1:5), Vt 6 ml/kg, accept permissive hypercapnia", "Allow complete expiration; reduce auto-PEEP"],
              ["3 — Inhaled β₂", "Salbutamol MDI 8–12 puffs via spacer (or 5 mg neb)", "First-line bronchodilator — repeat as needed"],
              ["4 — Anticholinergic", "Ipratropium 500 µg neb 4–6-hrly", "Synergistic with β₂; useful in COPD"],
              ["5 — Steroid", "IV hydrocortisone 200 mg or methylprednisolone 60–125 mg", "Onset 4–6 h — give early"],
              ["6 — IV magnesium", "MgSO₄ 2 g IV over 20 min", "Smooth muscle relaxation; reasonable evidence"],
              ["7 — Volatile / ketamine", "Sevoflurane via Sedaconda; ketamine 1–3 mg/kg/hr", "Bronchodilator; consider if refractory"],
              ["8 — Adrenaline", "IV bolus 10–50 µg or infusion", "Severe refractory bronchospasm; consider IM 0.5 mg if anaphylaxis"],
              ["9 — Rescue", "Heliox · bronchoscopic lavage · VV-ECMO · transfer for inhalational GA", "Near-fatal asthma — ECMO referral early"],
            ].map(([step, intervention, rationale]) => (
              <tr key={step as string} className="border-b border-border/50">
                <td className="p-2 font-medium">{step}</td>
                <td className="p-2 text-muted-foreground">{intervention}</td>
                <td className="p-2 text-muted-foreground">{rationale}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SynthesisBlock>

          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "Life-threatening asthma: PEF <33%, SpO₂ <92%, silent chest, exhaustion, altered consciousness, normal/raised PaCO₂.",
              "Treatment: O₂, nebulised salbutamol + ipratropium, IV hydrocortisone, IV magnesium 2 g, consider IV salbutamol/aminophylline.",
              "Intubation criteria: exhaustion, rising CO₂, altered consciousness — ketamine + suxamethonium induction; expect dynamic hyperinflation.",
              "Ventilator settings: low RR (6–10), long expiratory time (I:E 1:4–1:5), small Vt, permissive hypercapnia, minimal PEEP.",
              "Sedaconda (isoflurane via AnaConDa) is a useful bronchodilator rescue in refractory status asthmaticus.",
            ]}
          />
    </ExamSection>
      }
    />
  );
};

export default BronchospasticFailureTopic;

