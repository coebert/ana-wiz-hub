import { Helmet } from "react-helmet-async";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { SynthesisBlock } from "@/components/topic/SynthesisBlock";
import { ardsQuestions } from "@/data/quizzes";
import ECMOCircuitDiagram from "@/components/diagrams/intensive-care/ECMOCircuitDiagram";
import ECMOTroubleshootingDiagram from "@/components/diagrams/intensive-care/ECMOTroubleshootingDiagram";
import ARDSVentModeComparisonDiagram from "@/components/diagrams/intensive-care/ARDSVentModeComparisonDiagram";
import EOLIAMurrayCalculator from "@/components/diagrams/intensive-care/EOLIAMurrayCalculator";
import PneumoniaSteroidDecisionTree from "@/components/diagrams/intensive-care/PneumoniaSteroidDecisionTree";
import ARDSPathophysiologyCascadeDiagram from "@/components/diagrams/intensive-care/ARDSPathophysiologyCascadeDiagram";
import { DiagramSection } from "@/components/topic/DiagramSection";
import { ExamSection } from "@/components/exam/ExamSection";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import InlineRef from "@/components/references/InlineRef";

const ardsFaqs: Array<[string, string]> = [
  [
    "What is the Berlin definition of ARDS?",
    "The Berlin definition (2012) requires four criteria: onset within 7 days of a known clinical insult or new/worsening respiratory symptoms; bilateral opacities on chest imaging not fully explained by effusions, lobar collapse or nodules; respiratory failure not fully explained by cardiac failure or fluid overload (objective assessment with echocardiography if no risk factor); and impaired oxygenation on PEEP or CPAP ≥ 5 cmH₂O. Severity is stratified by PaO₂/FiO₂: mild 200–300 mmHg, moderate 100–200 mmHg, severe < 100 mmHg, with stepwise rises in mortality (~27%, 32%, 45%).",
  ],
  [
    "What are the lung-protective ventilation targets in ARDS?",
    "Tidal volume 6 mL/kg predicted body weight (range 4–8 mL/kg), plateau pressure ≤ 30 cmH₂O, driving pressure (plateau − PEEP) ≤ 15 cmH₂O, PEEP titrated to oxygenation and compliance (higher PEEP tables in moderate–severe disease), and FiO₂ to keep SpO₂ 88–95% or PaO₂ 7.3–10.7 kPa. Permissive hypercapnia (pH ≥ 7.20) is accepted to maintain low tidal volumes. ARDSNet 2000 demonstrated an absolute mortality reduction of 8.8% (39.8% → 31.0%) with 6 vs 12 mL/kg tidal volumes.",
  ],
  [
    "Why is driving pressure important in ARDS?",
    "Driving pressure (ΔP = plateau − PEEP) approximates the cyclic stress applied to the aerated 'baby lung'. In Amato's 2015 NEJM mediation analysis pooling nine ARDS trials, ΔP was the ventilator variable most strongly associated with mortality — a 1 SD (~7 cmH₂O) increase in ΔP corresponded to a relative mortality increase of ~40%, and reductions in tidal volume or increases in PEEP only improved survival if they lowered ΔP. The widely used target is ΔP ≤ 15 cmH₂O, achieved by reducing tidal volume or increasing PEEP to recruit collapsed lung.",
  ],
  [
    "When should prone positioning be used in ARDS?",
    "Prone positioning is indicated in moderate-to-severe ARDS with PaO₂/FiO₂ < 150 mmHg on FiO₂ ≥ 0.6 and PEEP ≥ 5 cmH₂O, initiated early (within 36 h of meeting criteria, after a 12–24 h lung-protective stabilisation period), delivered for ≥ 16 h per session, and continued daily until oxygenation improves (PaO₂/FiO₂ ≥ 150 with PEEP ≤ 10 and FiO₂ ≤ 0.6 sustained ≥ 4 h supine). PROSEVA (NEJM 2013) showed a 28-day mortality of 16.0% vs 32.8% (HR 0.39) and 90-day mortality 23.6% vs 41.0%.",
  ],
  [
    "What are the EOLIA criteria for VV-ECMO referral in ARDS?",
    "EOLIA criteria for VV-ECMO in severe ARDS refractory to optimal ventilation and proning: PaO₂/FiO₂ < 50 mmHg for > 3 h, or PaO₂/FiO₂ < 80 mmHg for > 6 h, or arterial pH < 7.25 with PaCO₂ ≥ 60 mmHg for > 6 h with respiratory rate increased to 35 and tidal volume reduced to 4 mL/kg PBW. EOLIA stopped early for futility (relative risk 0.76, p = 0.09); a pre-specified Bayesian re-analysis estimated ~96% probability of mortality benefit. Refer early (P/F < 150 on FiO₂ ≥ 0.6 PEEP ≥ 10) — do not wait for cannulation criteria.",
  ],
  [
    "Does neuromuscular blockade improve outcomes in ARDS?",
    "Evidence is conflicting. ACURASYS (Papazian, NEJM 2010) showed 48 h cisatracurium infusion in patients with PaO₂/FiO₂ < 150 reduced adjusted 90-day mortality (HR 0.68) without increasing ICU-acquired weakness. ROSE (PETAL, NEJM 2019) — performed with lighter sedation and higher PEEP — showed no mortality benefit (42.5% vs 42.8%) and more cardiovascular adverse events. Current practice: reserve a 48 h NMB infusion for patients with refractory ventilator dyssynchrony, very high driving pressure or persistent severe hypoxaemia despite deep sedation, rather than routine use in all moderate–severe ARDS.",
  ],
  [
    "What is the conservative fluid strategy in ARDS?",
    "After initial resuscitation, target a neutral or slightly negative fluid balance using diuresis and fluid restriction guided by CVP < 4 mmHg or PAOP < 8 mmHg (with mean arterial pressure ≥ 60 mmHg and adequate urine output). FACTT (NHLBI ARDS Network, NEJM 2006) compared conservative vs liberal fluid management and showed more ventilator-free days (14.6 vs 12.1) and ICU-free days, with no increase in shock or renal replacement therapy and no mortality difference. It is a respiratory-mechanics intervention, not a survival intervention.",
  ],
  [
    "Do corticosteroids work in ARDS?",
    "Evidence is heterogeneous and indication-specific. Dexamethasone benefits COVID-19 ARDS needing oxygen or ventilation (RECOVERY, 6 mg OD × 10 d). DEXA-ARDS (Villar, Lancet Respir Med 2020) showed dexamethasone 20 mg × 5 d → 10 mg × 5 d reduced 60-day mortality (21% vs 36%) and increased ventilator-free days in moderate–severe non-COVID ARDS. Hydrocortisone benefits severe community-acquired pneumonia (CAPE COD, NEJM 2023). Routine steroids in all ARDS are not recommended — current practice is targeted (COVID-19, severe CAP, eligible non-COVID moderate–severe ARDS, vasculitis). Avoid in influenza pneumonia.",
  ],
];

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

const tocItems = [
  { id: "section-pathophysiology", label: "Pathophysiology", group: "Core" },
  { id: "section-berlin", label: "Berlin Definition", group: "Core" },
  { id: "section-management", label: "Management Strategy", group: "Core" },
  { id: "section-prone", label: "Prone Positioning", group: "Therapies" },
  { id: "section-historical", label: "Therapies of Uncertain Benefit", group: "Therapies" },
  { id: "section-ecmo", label: "ECMO", group: "Rescue" },
  { id: "section-covid", label: "COVID-19", group: "Special" },
  { id: "trial-evidence", label: "Landmark Trials", group: "Evidence" },
  { id: "faq", label: "FAQ", group: "Reference" },
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
      <TopicTableOfContents items={tocItems} />

      <section className="space-y-6">

        <ExamSection id="section-pathophysiology" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["CC2.4"]}>
          <CollapsibleSubsection title="Pathophysiology of ARDS" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              ARDS is the clinical expression of <strong>diffuse alveolar damage (DAD)</strong> — a stereotyped inflammatory injury to the alveolar–capillary unit triggered by a wide variety of pulmonary (direct) or extra-pulmonary (indirect) insults. The pathological course is conventionally divided into three overlapping phases: an early <strong>exudative</strong> phase (0–7 days) of barrier breakdown and protein-rich oedema, a <strong>proliferative</strong> phase (7–21 days) of epithelial repair, and, in a minority, a late <strong>fibrotic</strong> phase (&gt;3 weeks) of collagen deposition and persistent functional impairment.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Neutrophil and macrophage activation releases proteases, reactive oxygen species and cytokines (TNF-α, IL-1β, IL-6, IL-8) that disrupt tight junctions and shed the endothelial glycocalyx. Type I pneumocyte injury floods the alveolus with proteinaceous fluid and hyaline membranes; surfactant produced by type II pneumocytes is diluted and inactivated, raising surface tension and collapsing dependent alveoli. The result is the Gattinoni <strong>“baby lung”</strong>: a small aerated compartment surrounded by flooded and atelectatic units.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Gas-exchange failure has two components: <strong>true intrapulmonary shunt</strong> (perfused but unventilated alveoli) producing refractory hypoxaemia, and <strong>increased dead space</strong> from microthrombosis and hypoxic pulmonary vasoconstriction, raising pulmonary vascular resistance and risking acute cor pulmonale. Because oxygenation depends on opening these collapsed units, hypoxaemia responds far better to PEEP and prone positioning than to raising FiO₂ alone.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Mechanical ventilation can itself amplify injury — <strong>volutrauma</strong> (overdistension), <strong>atelectrauma</strong> (cyclic recruitment/derecruitment), <strong>barotrauma</strong> and <strong>biotrauma</strong> (cytokine release with systemic spill-over driving multi-organ failure). This pathophysiology underpins the lung-protective strategy proven to reduce mortality: low tidal volume (6 mL/kg IBW), plateau pressure ≤30 cmH₂O, driving pressure ≤15 cmH₂O, individualised PEEP, and early prone positioning in moderate–severe disease.
            </p>
            <div className="p-4 rounded-lg border border-border mt-4">
              <p className="font-semibold text-foreground text-sm">
                Acute cor pulmonale <InlineRef topicId="ards" refLabel="Intensive Care Med 2013 (Cor pulmonale)" />
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Acute right ventricular failure occurs in roughly <strong>22% (range 20–25%)</strong> of moderate-to-severe ARDS patients managed with protective ventilation. It arises from an acute rise in <strong>pulmonary vascular resistance</strong> driven by hypoxic pulmonary vasoconstriction, in-situ microthrombosis, and hypercapnia/acidosis, compounded by the high intrathoracic pressures generated by PEEP and driving pressure impeding RV ejection. Independent risk factors include <strong>infectious/sepsis-induced ARDS</strong> and a <strong>driving pressure &gt; 18 cmH₂O</strong>. Diagnosis is echocardiographic: RV dilatation (RV:LV end-diastolic area ratio &gt; 0.6), septal dyskinesia and paradoxical septal motion ("D-sign") in systole. Its presence carries a marked prognostic penalty — 28-day mortality ~60% vs ~36% without it. Management follows directly from the mechanism: limit driving pressure, avoid excessive PEEP and avoid the extremes of permissive hypercapnia, use prone positioning (which lowers PVR and improves RV function independent of oxygenation), and reserve inhaled nitric oxide or inhaled prostacyclin as selective pulmonary vasodilator rescue when overt RV failure is present, with early ECMO referral if RV failure is refractory.
              </p>
            </div>
          </CollapsibleSubsection>
        </ExamSection>

        <ARDSPathophysiologyCascadeDiagram />

        <ExamSection className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["CC2.4"]}>
          <CollapsibleSubsection title="ARDS Phenotypes">
            <p className="text-muted-foreground leading-relaxed mb-3">
              ARDS is increasingly recognised as a heterogeneous syndrome rather than a single disease, and phenotyping is an active area of research aimed at targeted therapy <InlineRef topicId="ards" refLabel="Semin Respir Crit Care Med 2019 (ARDS phenotypes)" />.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Clinical phenotypes</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Direct/pulmonary injury (e.g. pneumonia, aspiration) vs indirect/extrapulmonary injury (e.g. sepsis, pancreatitis) differ in recruitability and PEEP response — pulmonary ARDS tends to be less recruitable — and in timing of onset relative to the inciting insult.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Radiological phenotypes</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Focal vs diffuse opacification on CT has direct implications for recruitment manoeuvres, PEEP titration and prone positioning. The LIVE trial found that ventilatory strategies mismatched to radiological phenotype (misclassification) were harmful, supporting individualised rather than one-size-fits-all ventilation.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Biological subphenotypes</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Latent class analysis identifies <strong>hyperinflammatory</strong> and <strong>hypoinflammatory</strong> endotypes with different mortality, and possible differential treatment responses to corticosteroids, simvastatin and fluid-conservative strategies within trials that were neutral overall.
                </p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Exam-relevant conclusion: ARDS is a heterogeneous syndrome, and phenotype-targeted (precision) therapy — matching ventilatory and pharmacological strategy to clinical, radiological and biological phenotype — remains an active research direction rather than current standard of care.
            </p>
          </CollapsibleSubsection>
        </ExamSection>

        <ExamSection id="section-berlin" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["CC2.4"]}>
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

        <ExamSection id="section-management" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
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

        <ExamSection id="section-prone" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
          <CollapsibleSubsection title="Prone Positioning">
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              Prone positioning is one of only a handful of interventions proven to reduce mortality in ARDS. Physiological benefits: more homogeneous distribution of transpulmonary pressure (dorsal recruitment without ventral over-distension), improved V/Q matching, reduced shunt, reduced right-ventricular afterload, and better drainage of secretions. The mortality signal depends critically on <strong>patient selection, timing of initiation, daily duration, and the number of sessions delivered</strong>.
            </p>

            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Patient selection — who benefits</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc pl-5">
                <li><strong>Moderate–severe ARDS</strong>: PaO₂/FiO₂ &lt;150 mmHg on FiO₂ ≥0.6 and PEEP ≥5 cmH₂O (PROSEVA entry criteria).</li>
                <li>Earlier trials (Gattinoni 2001, Guérin 2004, Taccone 2009 "Prone-Supine II", Mancebo 2006) enrolled milder disease or used shorter sessions and showed <em>no</em> mortality benefit — meta-analyses (Sud 2014, Beitler 2014, Munshi 2017) confirm benefit is restricted to P/F &lt;150 and ≥12–16 h/session.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Timing of initiation — "early and after stabilisation"</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc pl-5">
                <li><strong>PROSEVA</strong> (Guérin, NEJM 2013): proned <strong>within 12–24 h</strong> of meeting moderate–severe criteria, after a <strong>12–24 h stabilisation period</strong> on lung-protective ventilation (Vt 6 mL/kg, plateau ≤30, FiO₂ ≥0.6, PEEP ≥5). 28-day mortality 16.0% vs 32.8% (HR 0.39); 90-day mortality 23.6% vs 41.0%.</li>
                <li>The stabilisation window matters: ~15% of patients improve sufficiently with lung-protective ventilation alone and no longer meet criteria — these patients do not benefit from proning and incur its risk profile.</li>
                <li>ESICM 2023 and ATS/ESICM/SCCM 2024 guidelines: initiate proning <strong>within the first 36 hours</strong> of meeting criteria; do not delay for trials of recruitment or NMB alone.</li>
                <li>Late proning (after &gt;48–72 h of mechanical ventilation) is associated with attenuated benefit — fibroproliferative changes reduce recruitability ("baby lung" becomes fixed).</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Duration per session — the 16-hour rule</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc pl-5">
                <li><strong>≥16 h/day</strong> is the evidence-based dose (PROSEVA mean 17 h/session). Shorter sessions (8 h in Gattinoni 2001, ~8 h in Taccone 2009) did not improve survival.</li>
                <li>Mechanistic rationale: oxygenation improves within 1–2 h, but alveolar recruitment and resolution of dorsal atelectasis continue over 12–16 h. Premature supination causes derecruitment and a "yo-yo" effect.</li>
                <li>Practical UK delivery: turn in the morning (e.g. 09:00) and return supine the next morning, giving ~16–18 h prone with a 6–8 h supine window for line/skin care, bronchoscopy, and re-assessment.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Number of sessions — when to stop</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc pl-5">
                <li>PROSEVA delivered a <strong>median of 4 sessions</strong> (IQR 2–8) per patient; benefit was seen across this range.</li>
                <li><strong>Continue proning</strong> while the patient remains in moderate–severe ARDS (P/F &lt;150 on FiO₂ ≥0.6, PEEP ≥10) — each session offers incremental benefit.</li>
                <li><strong>Stop criteria</strong> (PROSEVA, widely adopted): in the supine position for ≥4 h after a prone session, PaO₂/FiO₂ ≥150 with PEEP ≤10 and FiO₂ ≤0.6. Other reasons to stop: life-threatening complication (unplanned extubation, displaced lines, haemodynamic collapse, severe pressure injury), or transition to palliation/ECMO.</li>
                <li>There is <strong>no fixed maximum</strong>: case series and COVID-19 cohorts report 5–10+ sessions in responders; durability of oxygenation response (rather than first-session response alone) predicts survival.</li>
                <li>"Non-responders" (no improvement in P/F or compliance after 2–3 sessions) should prompt re-evaluation: consider ECMO referral (EOLIA criteria), reassess for unaddressed causes (fluid overload, ventilator dyssynchrony, undrained pleural collection, secondary infection).</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Awake proning (non-intubated, predominantly COVID-era evidence)</p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc pl-5">
                <li>Meta-trial (Ehrmann, Lancet Respir Med 2021): in COVID-19 hypoxaemic respiratory failure on HFNO, awake proning reduced intubation (HR 0.75) but not mortality. Effect size proportional to time prone — target ≥8 h/day (often split into 2–4 h blocks).</li>
                <li>Outside COVID-19 the evidence is weaker; awake proning is reasonable in cooperative patients on HFNO/NIV but should not delay intubation in clinical deterioration.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
              <p className="text-sm font-semibold text-destructive">⚠ Contraindications &amp; key complications</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Absolute:</strong> unstable spinal/pelvic fracture, open abdomen, raised ICP unmonitored, severe haemodynamic instability, recent sternotomy/anterior tracheostomy (relative — needs head-out frame). <strong>Complications:</strong> facial &amp; chest-wall pressure injury (highest with multiple sessions — daily skin review), endotracheal tube displacement/obstruction, line/drain dislodgement, brachial-plexus injury, vomiting/aspiration, transient haemodynamic dip on turning, ischaemic optic neuropathy. A trained turning team (≥5 staff) and a written checklist (eyes taped, NG decompressed, lines cleared, FiO₂ 1.0 for the turn) materially reduce adverse events.
              </p>
            </div>
          </div>
          </CollapsibleSubsection>
        </ExamSection>

        <ExamSection id="section-historical" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
          <CollapsibleSubsection title="Therapies of Historical / Uncertain Benefit">
          <div className="space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              Several once-routine ARDS adjuncts have either been abandoned after high-quality trials showed no benefit (or harm), or persist only as <strong>rescue</strong> options without a survival signal. Knowing the evidence is examinable: it explains why current bundles are deliberately short (lung-protective ventilation, PEEP titration, prone, NMB in selected patients, ECMO referral) and why these other strategies are <em>not</em> first-line.
            </p>

            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">High-Frequency Oscillatory Ventilation (HFOV)</p>
              <p className="text-sm text-muted-foreground mt-1">
                Theoretical appeal: ultra-low tidal volumes (1–4 mL/kg) at 3–15 Hz with a high constant mean airway pressure — the "open lung" taken to its logical extreme. Two 2013 RCTs ended its routine use:
              </p>
              <ul className="mt-1 space-y-1 text-sm text-muted-foreground list-disc pl-5">
                <li><strong>OSCILLATE</strong> (Ferguson, NEJM 2013): stopped early for <em>harm</em> — in-hospital mortality 47% vs 35% (RR 1.33), with more vasopressor and sedation use.</li>
                <li><strong>OSCAR</strong> (Young, NEJM 2013): no mortality difference (41.7% vs 41.1%); no benefit.</li>
                <li>Subsequent meta-analyses (Sud 2016) confirm no overall benefit and possible harm in moderate–severe ARDS.</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Current role:</strong> not recommended as a routine strategy (ATS/ESICM/SCCM 2023). Occasionally considered as rescue in highly selected centres, but ECMO referral is generally preferred.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Inhaled Nitric Oxide (iNO) and inhaled prostacyclin (epoprostenol / iloprost)</p>
              <p className="text-sm text-muted-foreground mt-1">
                Selective pulmonary vasodilation of ventilated alveoli improves V/Q matching and lowers PVR. iNO reliably raises PaO₂/FiO₂ by ~15–20% in the first 24 h.
              </p>
              <ul className="mt-1 space-y-1 text-sm text-muted-foreground list-disc pl-5">
                <li><strong>Cochrane (Gebistorf 2016, 14 RCTs, n=1303):</strong> no mortality benefit; transient oxygenation improvement only; <em>increased risk of AKI</em> (RR 1.59).</li>
                <li>Oxygenation response is not durable beyond 24–48 h (tachyphylaxis); rebound pulmonary hypertension on abrupt withdrawal.</li>
                <li>Cost: £2,000–£5,000 per patient per day.</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">
                <strong>Current role:</strong> <em>rescue</em> bridge in refractory hypoxaemia (e.g. while organising ECMO retrieval), or where acute cor pulmonale / RV failure dominates the picture. Not recommended as routine therapy.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Recruitment manoeuvres &amp; high-PEEP "open-lung" strategy</p>
              <ul className="mt-1 space-y-1 text-sm text-muted-foreground list-disc pl-5">
                <li>Earlier trials (ALVEOLI, LOVS, EXPRESS) showed at best a trend toward benefit in severe disease only.</li>
                <li><strong>ART trial</strong> (Cavalcanti, JAMA 2017): aggressive stepwise recruitment + decremental PEEP titration <em>increased</em> 28-day mortality (55.3% vs 49.3%) and barotrauma vs conventional PEEP.</li>
                <li>Current guidance (ATS/ESICM/SCCM 2023): avoid prolonged/high-pressure recruitment manoeuvres. Use higher (vs lower) PEEP only in moderate–severe ARDS, titrated to compliance / oesophageal pressure rather than fixed tables.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Continuous neuromuscular blockade (cisatracurium infusion)</p>
              <ul className="mt-1 space-y-1 text-sm text-muted-foreground list-disc pl-5">
                <li><strong>ACURASYS</strong> (Papazian, NEJM 2010): 48 h cisatracurium in P/F &lt;150 reduced adjusted 90-day mortality (HR 0.68) without increased ICU-acquired weakness.</li>
                <li><strong>ROSE</strong> (NHLBI PETAL, NEJM 2019): in patients managed with higher PEEP and lighter sedation, 48 h cisatracurium showed <em>no mortality benefit</em> (42.5% vs 42.8%) and more cardiovascular adverse events.</li>
                <li><strong>Current role:</strong> reserve for patients with refractory ventilator dyssynchrony, very high driving pressure, or severe hypoxaemia despite deep sedation — not as routine for all moderate–severe ARDS.</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Other strategies with negative or no evidence</p>
              <ul className="mt-1 space-y-1 text-sm text-muted-foreground list-disc pl-5">
                <li><strong>Exogenous surfactant</strong> — adult RCTs (Spragg 2004, 2011) negative; no role outside neonatal/paediatric practice.</li>
                <li><strong>Activated protein C (drotrecogin alfa)</strong> — withdrawn 2011 after PROWESS-SHOCK showed no benefit and bleeding harm.</li>
                <li><strong>Statins</strong> — HARP-2 and SAILS trials negative; not indicated for ARDS itself.</li>
                <li><strong>β₂-agonists (salbutamol)</strong> — BALTI-2 (Lancet 2012) <em>stopped early for harm</em> (more tachyarrhythmia, trend to mortality); ALTA also negative. Do not use to "dry the lung".</li>
                <li><strong>Routine high-dose corticosteroids in <em>all</em> ARDS</strong> — heterogeneous evidence; DEXA-ARDS (Villar 2020) showed benefit but is balanced against negative older trials. Current practice is targeted (COVID-19, severe CAP, vasculitis), not blanket.</li>
                <li><strong>Conservative vs liberal fluid strategy</strong> — FACTT (NHLBI 2006) improved ventilator-free days but <em>not</em> mortality; conservative balance after resuscitation remains reasonable but is not a survival intervention.</li>
                <li><strong>Permissive hypercapnia as a target</strong> — tolerated as a consequence of low-Vt ventilation, but not pursued for its own sake; very high PaCO₂ worsens RV function and ICP.</li>
                <li><strong>Prophylactic antibiotics, immunonutrition, omega-3 / antioxidants (OMEGA, EDEN)</strong> — neutral or harmful; not recommended.</li>
              </ul>
            </div>

            <p className="text-xs text-muted-foreground italic">
              Exam framing: when asked about "adjuncts in ARDS", structure answers as (1) proven mortality benefit — lung-protective ventilation, prone ≥16 h/day, ECMO in carefully selected patients; (2) rescue options without mortality benefit — iNO, recruitment manoeuvres, HFOV (largely abandoned); (3) abandoned/harmful — β₂-agonists, routine HFOV, aggressive recruitment, exogenous surfactant.
            </p>
          </div>
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
        <ExamSection id="section-ecmo" className="scroll-mt-24" exams={[Exam.FFICM, Exam.EDIC]}>
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
            <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
              <p className="text-sm font-semibold text-foreground">Optimal timing of SARF / ECMO centre discussion</p>
              <p className="text-sm text-muted-foreground mt-1">
                In England, severe respiratory failure is managed through the commissioned <strong>Severe Acute Respiratory Failure (SARF) service</strong> at five adult centres (Glenfield/Leicester, Royal Papworth, Guy's &amp; St Thomas', Aberdeen Royal Infirmary, Wythenshawe), accessed via a single 24/7 referral pathway. The principle is <strong>"refer early, transfer if needed"</strong> — discussion is not a commitment to cannulation.
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc pl-5">
                <li><strong>Discuss with SARF as soon as the patient is failing optimal conventional therapy</strong>, not when they are <em>in extremis</em>. Trigger thresholds for a phone call:
                  <ul className="mt-1 list-[circle] pl-5 space-y-0.5">
                    <li>PaO₂/FiO₂ &lt;150 mmHg with FiO₂ ≥0.6 and PEEP ≥10 despite lung-protective ventilation, OR</li>
                    <li>Murray score ≥2.5, OR</li>
                    <li>Uncompensated hypercapnia (pH &lt;7.25) with Pplat &gt;30 cmH₂O, OR</li>
                    <li>Anticipated escalation: failing on HFNO/NIV with rising oxygen requirement, or pre-intubation in fulminant viral pneumonitis / status asthmaticus.</li>
                  </ul>
                </li>
                <li><strong>Do not wait for EOLIA criteria</strong> (P/F &lt;80 for 6 h, P/F &lt;50 for 3 h, or pH &lt;7.25 + PaCO₂ ≥60 for 6 h) before <em>phoning</em> — these are cannulation criteria. By the time they are met, retrieval logistics (4–8 h door-to-door in the UK) may make transfer hazardous.</li>
                <li><strong>Refer within the first 7 days of mechanical ventilation.</strong> Mechanical ventilation &gt;7 days is a relative contraindication (ELSO/EOLIA); &gt;10 days approaches absolute. Outcomes deteriorate sharply once fibroproliferative change is established.</li>
                <li><strong>Initiate proning and NMB before or in parallel with the referral call</strong> — do not delay either. SARF teams expect the referring unit to have optimised PEEP, attempted ≥1 prone session where feasible, and corrected fluid balance/sepsis source before retrieval.</li>
                <li><strong>What to have ready for the call</strong> (UK SARF proforma): demographics &amp; weight, premorbid functional status &amp; comorbidities, aetiology &amp; day of illness, current ventilator settings + last ABG (with FiO₂/PEEP), Murray score components (P/F, PEEP, compliance, CXR quadrants), vasopressor dose, recent imaging, COVID/PCR status, and bleeding/anticoagulation status.</li>
                <li><strong>Special groups warranting earlier discussion</strong>: pregnant or peripartum patients, young patients (&lt;65) with single-organ respiratory failure, suspected reversible aetiology (viral pneumonitis, asthma, eosinophilic pneumonia, AAV/anti-GBM, smoke inhalation), and any patient where awake/pre-intubation VV-ECMO is being considered.</li>
                <li><strong>Mobile ECMO retrieval</strong>: if the patient is too unstable to transfer conventionally, SARF centres can deploy a mobile cannulation team — this option only exists if you have referred early enough for the team to mobilise.</li>
              </ul>
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
        <ExamSection id="section-covid" className="scroll-mt-24" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
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

      {/* Deep-content reference block: anchored H2s for TOC */}
      <section className="space-y-8 mt-10 scroll-mt-24">

        <div id="berlin-definition">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Berlin definition (2012) — at a glance</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            ARDS is defined by four mandatory criteria: <strong>acute onset</strong> within 7 days of a known clinical insult; <strong>bilateral opacities</strong> on chest imaging not fully explained by effusion, lobar collapse or nodules; respiratory failure <strong>not fully explained by cardiac failure or fluid overload</strong> (objective echo if no risk factor); and <strong>impaired oxygenation</strong> on PEEP/CPAP ≥ 5 cmH₂O. Severity is graded by PaO₂/FiO₂.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border bg-secondary/40">
                <th className="text-left p-2 font-semibold text-foreground">Severity</th>
                <th className="text-left p-2 font-semibold text-foreground">PaO₂/FiO₂ (mmHg)</th>
                <th className="text-left p-2 font-semibold text-foreground">PEEP / CPAP</th>
                <th className="text-left p-2 font-semibold text-foreground">Observed mortality</th>
                <th className="text-left p-2 font-semibold text-foreground">Median ventilator-free days</th>
              </tr></thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Mild</td><td className="p-2">200 – 300</td><td className="p-2">≥ 5</td><td className="p-2">~27%</td><td className="p-2">20</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Moderate</td><td className="p-2">100 – 200</td><td className="p-2">≥ 5</td><td className="p-2">~32%</td><td className="p-2">16</td></tr>
                <tr><td className="p-2 font-medium text-foreground">Severe</td><td className="p-2">&lt; 100</td><td className="p-2">≥ 5</td><td className="p-2">~45%</td><td className="p-2">1</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            The 2023 <strong>Global ARDS definition</strong> extends Berlin to non-intubated patients on HFNO ≥ 30 L/min or NIV/CPAP ≥ 5 cmH₂O, and accepts SpO₂/FiO₂ ≤ 315 (with SpO₂ ≤ 97%) where ABG unavailable — broadening recognition in resource-limited and pre-intubation settings.
          </p>
        </div>

        <div id="lung-protective">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Lung-protective ventilation — the settings</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The single intervention with the most consistent mortality benefit. Targets apply to <strong>all</strong> ARDS severities from the moment of diagnosis, and tidal volumes should always be calculated on <strong>predicted body weight (PBW)</strong>, not actual weight.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border bg-secondary/40">
                <th className="text-left p-2 font-semibold text-foreground">Parameter</th>
                <th className="text-left p-2 font-semibold text-foreground">Target</th>
                <th className="text-left p-2 font-semibold text-foreground">Why</th>
                <th className="text-left p-2 font-semibold text-foreground">Evidence</th>
              </tr></thead>
              <tbody className="text-muted-foreground align-top">
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Tidal volume</td><td className="p-2">6 mL/kg PBW (range 4–8)</td><td className="p-2">Reduces volutrauma to the &ldquo;baby lung&rdquo;</td><td className="p-2">ARDSNet 2000 (NEJM): mortality 31.0% vs 39.8% with 6 vs 12 mL/kg, ARR 8.8%</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Plateau pressure</td><td className="p-2">≤ 30 cmH₂O</td><td className="p-2">Surrogate for end-inspiratory alveolar stress</td><td className="p-2">ARDSNet 2000; ATS/ESICM/SCCM 2017 strong recommendation</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Driving pressure (ΔP)</td><td className="p-2">≤ 15 cmH₂O (Pplat − PEEP)</td><td className="p-2">Strongest ventilator predictor of mortality</td><td className="p-2">Amato 2015 (NEJM): 1 SD ↑ ΔP ⇒ ~40% relative ↑ mortality across 9 RCTs</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">PEEP</td><td className="p-2">Titrated; higher PEEP table in moderate–severe</td><td className="p-2">Recruits collapsed alveoli, reduces atelectrauma</td><td className="p-2">Briel 2010 meta-analysis: mortality benefit only when P/F &lt; 200</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">FiO₂ / SpO₂</td><td className="p-2">Lowest FiO₂ for SpO₂ 88–95% (PaO₂ 7.3–10.7 kPa)</td><td className="p-2">Avoid oxygen toxicity and hyperoxia</td><td className="p-2">LOCO₂ 2020; ICU-ROX 2020 — conservative not inferior</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Respiratory rate</td><td className="p-2">Up to 35/min; pH ≥ 7.20 (permissive hypercapnia)</td><td className="p-2">Maintains minute ventilation at low Vt</td><td className="p-2">ARDSNet protocol; consensus</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Mode</td><td className="p-2">Volume- or pressure-controlled; either acceptable</td><td className="p-2">No mode shown superior; control Vt &amp; Pplat</td><td className="p-2">Chacko 2015 Cochrane — no mortality difference</td></tr>
                <tr><td className="p-2 font-medium text-foreground">Sedation depth</td><td className="p-2">RASS −2 to 0 when feasible</td><td className="p-2">Lighter sedation reduces delirium &amp; weakness</td><td className="p-2">ABCDEF bundle; SLEAP 2012</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            <strong>PBW (male)</strong> = 50 + 0.91 × (height cm − 152.4). <strong>PBW (female)</strong> = 45.5 + 0.91 × (height cm − 152.4). Always set Vt from height, never from admission weight.
          </p>
        </div>

        <div id="peep-strategy">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">PEEP titration strategies</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border bg-secondary/40">
                <th className="text-left p-2 font-semibold text-foreground">Method</th>
                <th className="text-left p-2 font-semibold text-foreground">How</th>
                <th className="text-left p-2 font-semibold text-foreground">Comment</th>
              </tr></thead>
              <tbody className="text-muted-foreground align-top">
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">ARDSNet FiO₂/PEEP table</td><td className="p-2">Pre-set PEEP for each FiO₂ (low or high table)</td><td className="p-2">Most pragmatic; high-PEEP table for P/F &lt; 200</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Best compliance</td><td className="p-2">Decremental PEEP trial; choose PEEP at peak Crs</td><td className="p-2">Minimises ΔP; widely used</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Oesophageal manometry</td><td className="p-2">Titrate to transpulmonary pressure ≥ 0 end-expiration</td><td className="p-2">EPVent-2 (2019) neutral overall, signal in moderate disease</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">Electrical impedance tomography</td><td className="p-2">Balance overdistension vs collapse pixels</td><td className="p-2">Research / specialist; promising</td></tr>
                <tr><td className="p-2 font-medium text-foreground">Aggressive recruitment + decremental PEEP</td><td className="p-2">Stepwise pressure increase then titration</td><td className="p-2"><strong>Harmful</strong> — ART 2017 ↑ 28-day mortality 55.3% vs 49.3%</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div id="trial-evidence">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Landmark trial evidence</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b border-border bg-secondary/40">
                <th className="text-left p-2 font-semibold text-foreground">Trial (year)</th>
                <th className="text-left p-2 font-semibold text-foreground">Population</th>
                <th className="text-left p-2 font-semibold text-foreground">Intervention</th>
                <th className="text-left p-2 font-semibold text-foreground">Key result</th>
                <th className="text-left p-2 font-semibold text-foreground">Bottom line</th>
              </tr></thead>
              <tbody className="text-muted-foreground align-top">
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">ARDSNet / ARMA (2000)</td><td className="p-2">861 ARDS</td><td className="p-2">Vt 6 vs 12 mL/kg PBW, Pplat ≤ 30</td><td className="p-2">Mortality 31.0% vs 39.8% (p = 0.007)</td><td className="p-2">Founded lung-protective ventilation</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">ALVEOLI (2004)</td><td className="p-2">549 ALI/ARDS</td><td className="p-2">High vs low PEEP table</td><td className="p-2">No mortality difference</td><td className="p-2">PEEP strategy alone neutral</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">FACTT (2006)</td><td className="p-2">1000 ALI</td><td className="p-2">Conservative vs liberal fluids</td><td className="p-2">+2.5 ventilator-free days; no mortality benefit</td><td className="p-2">Dry the lung after resuscitation</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">CESAR (2009)</td><td className="p-2">180 severe ARDS</td><td className="p-2">Referral to ECMO centre</td><td className="p-2">6-mo survival without disability 63% vs 47%</td><td className="p-2">Referral works; whole bundle matters</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">ACURASYS (2010)</td><td className="p-2">340 ARDS P/F &lt; 150</td><td className="p-2">48 h cisatracurium</td><td className="p-2">Adjusted 90-day mortality HR 0.68</td><td className="p-2">NMB may benefit early severe disease</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">OSCILLATE (2013)</td><td className="p-2">548 moderate-severe ARDS</td><td className="p-2">HFOV vs conventional</td><td className="p-2"><strong>Stopped for harm</strong> 47% vs 35%</td><td className="p-2">HFOV not for routine use</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">OSCAR (2013)</td><td className="p-2">795 ARDS</td><td className="p-2">HFOV vs conventional</td><td className="p-2">No difference 41.7% vs 41.1%</td><td className="p-2">Confirms HFOV not beneficial</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">PROSEVA (2013)</td><td className="p-2">466 ARDS P/F &lt; 150</td><td className="p-2">Prone ≥ 16 h/day vs supine</td><td className="p-2">28-d mortality 16.0% vs 32.8% (HR 0.39)</td><td className="p-2">Practice-changing — prone early</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">ART (2017)</td><td className="p-2">1010 moderate-severe ARDS</td><td className="p-2">Stepwise recruitment + decremental PEEP</td><td className="p-2"><strong>↑ 28-d mortality</strong> 55.3% vs 49.3%</td><td className="p-2">Avoid aggressive recruitment</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">EOLIA (2018)</td><td className="p-2">249 very severe ARDS</td><td className="p-2">Early VV-ECMO vs conventional + crossover</td><td className="p-2">60-d mortality 35% vs 46% (RR 0.76, p = 0.09)</td><td className="p-2">Bayesian re-analysis ~96% probability of benefit</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">ROSE (2019)</td><td className="p-2">1006 moderate-severe ARDS</td><td className="p-2">48 h cisatracurium with lighter sedation</td><td className="p-2">No difference 42.5% vs 42.8%</td><td className="p-2">Routine NMB no longer first-line</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">DEXA-ARDS (2020)</td><td className="p-2">277 moderate-severe non-COVID ARDS</td><td className="p-2">Dexamethasone 20 → 10 mg × 10 d</td><td className="p-2">60-d mortality 21% vs 36%</td><td className="p-2">Selective steroid use supported</td></tr>
                <tr className="border-b border-border"><td className="p-2 font-medium text-foreground">RECOVERY (2021)</td><td className="p-2">6425 COVID-19 inpatients</td><td className="p-2">Dexamethasone 6 mg × 10 d</td><td className="p-2">28-d mortality 22.9% vs 25.7%; biggest benefit if ventilated</td><td className="p-2">Standard of care in COVID-19 needing O₂</td></tr>
                <tr><td className="p-2 font-medium text-foreground">RECOVERY-RS (2022)</td><td className="p-2">1273 COVID-19 hypoxia</td><td className="p-2">CPAP vs HFNO vs standard O₂</td><td className="p-2">CPAP ↓ intubation/death vs standard (36% vs 44%)</td><td className="p-2">CPAP preferred non-invasive support</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div id="pitfalls">
        <ExamPitfallsCallout
          accent="icu"
          pitfalls={[
            "Berlin definition: acute (<7 days), bilateral infiltrates, not explained by cardiac failure, PaO₂/FiO₂ ≤300 on PEEP ≥5.",
            "Mild 200–300, moderate 100–200, severe ≤100 (mmHg) — mortality rises stepwise.",
            "Set tidal volume on PREDICTED body weight (height-based), not actual weight.",
            "Driving pressure ≤15 cmH₂O is the single strongest ventilator predictor of survival (Amato 2015).",
            "Prone for ≥16 h/day in severe ARDS (PaO₂/FiO₂ <150) — PROSEVA showed mortality benefit.",
            "Neuromuscular blockade for 48 h in severe ARDS reduces barotrauma but ROSE trial showed no mortality benefit.",
            "Avoid aggressive recruitment manoeuvres — ART (2017) showed increased mortality.",
            "Refractory hypoxaemia: refer EARLY to SARF/ECMO centre (P/F <150) — don't wait for EOLIA cannulation criteria.",
          ]}
        />
        </div>

        {/* FAQ */}
        <div id="faq">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Frequently asked questions</h2>
          <div className="space-y-2">
            {ardsFaqs.map(([q, a]) => (
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
            mainEntity: ardsFaqs.map(([name, acceptedAnswer]) => ({
              "@type": "Question",
              name,
              acceptedAnswer: { "@type": "Answer", text: acceptedAnswer },
            })),
          })}</script>
        </Helmet>
      </section>
    </>
      }
    />
  );
};

export default ARDSTopic;
