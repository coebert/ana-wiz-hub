import { Helmet } from "react-helmet-async";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { Exam } from "@/data/curriculum";
import { ExamSection } from "@/components/exam/ExamSection";
import { ecmoQuestions } from "@/data/quizzes";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import ECMOCircuitDiagram from "@/components/diagrams/intensive-care/ECMOCircuitDiagram";
import VAECMOCircuitDiagram from "@/components/diagrams/intensive-care/VAECMOCircuitDiagram";
import ECMOTroubleshootingDiagram from "@/components/diagrams/intensive-care/ECMOTroubleshootingDiagram";

const ecmoFaqs: Array<[string, string]> = [
  [
    "What is the difference between VV and VA ECMO?",
    "VV-ECMO drains and returns blood to the venous system — it provides gas exchange only and is used for refractory respiratory failure with preserved cardiac output. VA-ECMO drains venous blood and returns oxygenated blood to a major artery, providing both gas exchange and circulatory support; it is used for refractory cardiogenic shock and refractory cardiac arrest (ECPR). VA-ECMO increases LV afterload and carries the risk of differential hypoxia (Harlequin syndrome) when cannulated peripherally.",
  ],
  [
    "What is Harlequin (North–South) syndrome?",
    "In peripheral femoro-femoral VA-ECMO, oxygenated blood is returned retrograde up the descending aorta while a recovering heart ejects native, poorly oxygenated blood antegrade. The watershed between the two flows determines which territory perfuses the coronaries, brain and right arm. Monitor SpO₂ on the right upper limb. Manage by optimising native lung function (increase PEEP and FiO₂, recruit), increasing ECMO flow, adding an internal jugular return cannula (VAV configuration) or converting to central cannulation.",
  ],
  [
    "What are the EOLIA criteria for VV-ECMO referral in ARDS?",
    "EOLIA criteria for severe ARDS refractory to optimal ventilation and proning: PaO₂/FiO₂ < 50 mmHg for > 3 h, or PaO₂/FiO₂ < 80 mmHg for > 6 h, or arterial pH < 7.25 with PaCO₂ ≥ 60 mmHg for > 6 h with respiratory rate increased to 35 and tidal volume reduced to 4 mL/kg PBW. EOLIA stopped early for futility (p = 0.09) but a pre-specified Bayesian re-analysis estimated a 96% probability of mortality benefit, and contemporary ELSO criteria mirror EOLIA.",
  ],
  [
    "When is ECPR indicated for refractory cardiac arrest?",
    "ELSO criteria for ECPR: witnessed arrest with bystander CPR started within 5 min, initial shockable rhythm (VF/pVT), no-flow time < 5 min and low-flow time < 60 min, age < 70 with no major comorbidity, end-tidal CO₂ > 1.3 kPa during CPR (a surrogate for adequate chest compressions), and a suspected reversible cause (most commonly acute coronary syndrome). ARREST (Minneapolis) and Prague-OHCA showed mortality benefit in selected single-centre cohorts; INCEPTION (multicentre Dutch RCT) was neutral — the size and reliability of any ECPR benefit depend on low low-flow time and a straight-to-cath-lab pathway.",
  ],
  [
    "How is anticoagulation managed on ECMO?",
    "First-line is unfractionated heparin bolus 50–100 units/kg at cannulation, followed by continuous infusion titrated to APTT 1.5–2× normal or ACT 180–220 s. Anti-Xa (target 0.3–0.7 IU/mL) is more reliable than APTT in critically ill patients with raised acute-phase reactants. Bivalirudin is the agent of choice when heparin-induced thrombocytopenia is confirmed (4Ts score and anti-PF4 antibody, then functional assay). Bleeding is the commonest complication of ECMO — accept lower anticoagulation targets when active bleeding outweighs thrombotic risk.",
  ],
  [
    "What is the SAVE score and what is the RESP score?",
    "The SAVE (Survival After Veno-Arterial ECMO) score predicts in-hospital survival for adults receiving VA-ECMO for refractory cardiogenic shock. The RESP (Respiratory ECMO Survival Prediction) score predicts in-hospital survival for adults receiving VV-ECMO for severe acute respiratory failure. Both scores assign points for age, organ failure, pre-ECMO ventilation duration, diagnosis and acute clinical variables, then stratify patients into risk classes from I (lowest mortality) to V (highest). They are decision-support tools — not absolute contraindications — and are most useful when patient selection is borderline.",
  ],
  [
    "How is VV-ECMO weaned?",
    "Use a sweep-down trial. Maintain blood flow on the circuit (this prevents thrombosis) and reduce sweep gas stepwise to zero over 30–60 min, ventilating the patient on lung-protective settings (Vt 6 mL/kg PBW, PEEP 10, FiO₂ 0.5). Re-check ABG and lung mechanics. If PaO₂/FiO₂ > 150, pH and PaCO₂ stable, and respiratory mechanics acceptable, plan decannulation. Restart sweep promptly if the patient deteriorates.",
  ],
];


/**
 * Dedicated FFICM / EDIC standalone topic page for Extracorporeal Membrane
 * Oxygenation. Replaces the legacy /intensive-care/ecmo redirect with
 * full-depth content covering VV vs VA configurations, circuit physics,
 * cannulation strategy, complications (Harlequin, recirculation, North–
 * South syndrome), weaning, ECPR, and major trial evidence (CESAR, EOLIA,
 * ARREST, Prague-OHCA, INCEPTION). Carved out so the page ranks for the
 * high-intent query cluster ("VV vs VA ECMO", "Harlequin syndrome",
 * "ECPR indications", "ECMO weaning", "ELSO criteria").
 */

const objectives = [
  "Distinguish veno-venous (VV) and veno-arterial (VA) ECMO by indication, cannulation, physiology and target outputs.",
  "Apply ELSO / EOLIA / CESAR criteria to select adults with severe respiratory or cardiac failure for ECMO referral.",
  "Describe the components of an ECMO circuit (drainage / centrifugal pump / membrane oxygenator / heat exchanger / return) and the meaning of blood flow, sweep gas, FdO₂.",
  "Recognise and manage major ECMO complications: recirculation, Harlequin / North–South syndrome, LV distension, limb ischaemia, bleeding, HIT, oxygenator failure.",
  "Plan anticoagulation, transfusion thresholds and daily monitoring during ECMO support.",
  "Outline a structured weaning trial for VV (sweep-down) and VA (flow-down) ECMO, and the role of ECPR in refractory cardiac arrest.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Severe ARDS — is this patient a VV-ECMO candidate?",
    scenario: (
      <>
        38-year-old, day 4 of viral pneumonitis. Ventilated with Vt 6 mL/kg PBW,
        plateau 32 cmH₂O, PEEP 14, FiO₂ 1.0, prone 16 h. ABG: pH 7.18, PaCO₂ 9.4 kPa,
        PaO₂ 6.8 kPa. Murray score 3.5. No major comorbidity, no contraindication.
      </>
    ),
    working: (
      <>
        EOLIA / ELSO criteria for VV-ECMO referral in ARDS: PaO₂/FiO₂ &lt; 50 mmHg for
        &gt; 3 h, <strong>or</strong> PaO₂/FiO₂ &lt; 80 mmHg for &gt; 6 h, <strong>or</strong>
        pH &lt; 7.25 with PaCO₂ ≥ 60 mmHg for &gt; 6 h despite Vt reduced to 4 mL/kg and
        respiratory rate up to 35. He has refractory hypoxaemic and hypercapnic failure
        despite proning and optimised ventilation.
      </>
    ),
    answer: (
      <>
        Refer to the regional ECMO centre. Pending transfer, continue lung-protective
        ventilation, deepen sedation ± neuromuscular blockade, optimise haemodynamics
        and consider inhaled pulmonary vasodilator as a bridge. Document the EOLIA
        rescue criteria triggered to support the referral conversation.
      </>
    ),
    cites: ["EOLIA 2018", "CESAR 2009", "ELSO Guidelines 2017"],
  },
  {
    title: "Right radial SpO₂ 82 % on peripheral VA-ECMO",
    scenario: (
      <>
        56-year-old on femoral VA-ECMO for post-cardiotomy cardiogenic shock,
        4.5 L/min flow, FdO₂ 1.0. Native cardiac output recovering. Right radial
        SpO₂ 82 %, post-oxygenator SpO₂ 100 %, left foot SpO₂ 100 %.
      </>
    ),
    working: (
      <>
        Classic <strong>Harlequin (North–South) syndrome</strong>: retrograde
        oxygenated femoral arterial flow meets antegrade poorly oxygenated blood
        ejected by a recovering but still-impaired heart. The "watershed" mixing
        zone in the aorta dictates whether the upper body (coronaries, brain,
        right arm) receives hypoxaemic native blood. Always monitor SpO₂ on the
        <em> right </em> upper limb.
      </>
    ),
    answer: (
      <>
        Optimise native lung gas exchange (increase FiO₂ and PEEP, recruit), increase
        ECMO flow, or add an upper-body venous return cannula (convert to VAV /
        VV-A configuration). If unable to oxygenate the upper body, escalate to
        central cannulation. Treat this finding as urgent — coronary and cerebral
        hypoxia drives mortality.
      </>
    ),
    cites: ["BJA Educ ECMO 2018", "ELSO Guidelines 2017"],
  },
  {
    title: "Refractory VF arrest — is ECPR indicated?",
    scenario: (
      <>
        45-year-old, witnessed OHCA, bystander CPR, initial rhythm VF. Three
        defibrillations and adrenaline given, persistent VF at 25 min downtime.
        Mechanical CPR continuing, end-tidal CO₂ 3 kPa.
      </>
    ),
    working: (
      <>
        ELSO criteria for ECPR: witnessed arrest, bystander CPR &lt; 5 min, shockable
        initial rhythm, low-flow time &lt; 60 min, age &lt; 70, no major comorbidity,
        end-tidal CO₂ &gt; 1.3 kPa during CPR (a surrogate for adequate chest
        compressions and tissue perfusion). ARREST and Prague-OHCA showed
        survival benefit in selected patients; INCEPTION (multicentre Dutch RCT)
        did not — patient selection and system performance matter more than the
        intervention itself.
      </>
    ),
    answer: (
      <>
        He meets every published criterion. Activate the ECPR pathway, transfer
        with mechanical CPR continuing, cannulate (femoral V → femoral A) in cath
        lab or ED, then transfer for coronary angiography ± PCI. Aim for low-flow
        time &lt; 60 min; survival falls sharply beyond that.
      </>
    ),
    cites: ["ARREST 2020", "Prague OHCA 2022", "INCEPTION 2023", "ELSO Guidelines 2020"],
  },
];

const keyPoints = [
  {
    text: "VV-ECMO provides respiratory support only (gas exchange); VA-ECMO provides combined respiratory and haemodynamic support but generates LV afterload and risks Harlequin syndrome in peripheral configurations.",
    cites: ["BJA Educ ECMO 2018"],
  },
  {
    text: "EOLIA criteria for VV-ECMO referral in severe ARDS: PaO₂/FiO₂ < 50 mmHg for > 3 h, or < 80 mmHg for > 6 h, or pH < 7.25 with PaCO₂ ≥ 60 mmHg for > 6 h, despite optimal lung-protective ventilation and proning.",
    cites: ["EOLIA 2018", "ELSO Guidelines 2017"],
  },
  {
    text: "CESAR (2009) showed referral to an ECMO centre improved 6-month disability-free survival in severe respiratory failure; EOLIA (2018) was stopped early for futility but a Bayesian re-analysis suggested a mortality benefit. Modern ELSO criteria reflect both.",
    cites: ["CESAR 2009", "EOLIA 2018"],
  },
  {
    text: "Harlequin (North–South) syndrome in peripheral VA-ECMO: monitor the right radial pulse oximeter — it reflects upper-body / coronary / cerebral oxygenation. Manage by optimising native lung function, increasing ECMO flow, or converting to VAV.",
    cites: ["BJA Educ ECMO 2018"],
  },
  {
    text: "LV distension on VA-ECMO is driven by increased afterload from retrograde aortic flow plus persistent venous return. Recognised by rising PAOP, pulmonary oedema, absent aortic valve opening. Manage by inotropy, IABP, atrial septostomy or trans-aortic vent (Impella).",
    cites: ["FICM ECMO 2021"],
  },
  {
    text: "Recirculation in VV-ECMO: oxygenated blood from the return cannula is re-aspirated by the drainage cannula, falsely raising pre-membrane SvO₂ and limiting effective oxygen delivery. Reduce flow, reposition cannulae, or change configuration.",
    cites: ["ELSO Guidelines 2017"],
  },
  {
    text: "Anticoagulation: unfractionated heparin to APTT 1.5–2× normal or ACT 180–220 s. Bivalirudin is the agent of choice if HIT is confirmed. Balance bleeding (commonest complication) against circuit thrombosis.",
    cites: ["ELSO Guidelines 2017", "FICM ECMO 2021"],
  },
  {
    text: "Sweep gas (gas flow through the oxygenator) controls CO₂ clearance; FdO₂ and blood flow control oxygenation. Increasing sweep without changing FdO₂ removes more CO₂ but does not improve PaO₂.",
    cites: ["BJA Educ ECMO 2018"],
  },
  {
    text: "ECPR (ELSO criteria): witnessed arrest with bystander CPR < 5 min, shockable initial rhythm, low-flow < 60 min, age < 70, no major comorbidity, end-tidal CO₂ > 1.3 kPa during CPR. ARREST and Prague-OHCA support; INCEPTION negative — outcomes depend on system performance.",
    cites: ["ARREST 2020", "Prague OHCA 2022", "INCEPTION 2023", "ELSO Guidelines 2020"],
  },
  {
    text: "Weaning: VV-ECMO is weaned by reducing sweep gas to zero while maintaining blood flow (the sweep-down trial) and assessing native gas exchange. VA-ECMO is weaned by stepwise flow reduction with echo assessment of LV / RV function — never clamp the circuit while flow continues.",
    cites: ["FICM ECMO 2021", "ELSO Guidelines 2017"],
  },
];

const EcmoTopic = () => {
  return (
    <TopicTemplate
      title="Extracorporeal Membrane Oxygenation (ECMO)"
      subtitle="FFICM / EDIC — Intensive Care (ELSO / EOLIA / CESAR-based practice)"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={keyPoints}
      topicId="ecmo"
      topicTitle="Extracorporeal Membrane Oxygenation (ECMO)"
      quizQuestions={ecmoQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FFICM, Exam.EDIC] },
        workedExamples: { exams: [Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FFICM, Exam.EDIC] },
      }}
      sectionSources={{
        objectives: ["ELSO Guidelines 2017", "EOLIA 2018", "CESAR 2009"],
        keyPoints: ["ELSO Guidelines 2017", "EOLIA 2018", "ARREST 2020", "INCEPTION 2023"],
        workedExamples: ["ELSO Guidelines 2017", "BJA Educ ECMO 2018", "Prague OHCA 2022"],
      }}
      coreConcepts={
        <ExamSection exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
          <section className="space-y-6">
            {/* Table of contents */}
            <nav aria-label="On this page" className="not-prose rounded-lg border border-border bg-secondary/20 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">On this page</p>
              <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                <li><a href="#overview" className="text-icu hover:underline">What ECMO is — and is not</a></li>
                <li><a href="#circuit" className="text-icu hover:underline">Circuit components</a></li>
                <li><a href="#cannulation" className="text-icu hover:underline">Cannulation strategy</a></li>
                <li><a href="#configurations" className="text-icu hover:underline">ECMO configurations (VV, VA, VAV, VVA)</a></li>
                <li><a href="#gas-exchange" className="text-icu hover:underline">Oxygenation & CO₂ clearance</a></li>
                <li><a href="#vv-ecmo-indications" className="text-icu hover:underline">VV-ECMO: indications & EOLIA</a></li>
                <li><a href="#va-ecmo-indications" className="text-icu hover:underline">VA-ECMO: indications</a></li>
                <li><a href="#anticoagulation" className="text-icu hover:underline">Anticoagulation & monitoring</a></li>
                <li><a href="#complications" className="text-icu hover:underline">Major complications</a></li>
                <li><a href="#icu-care-bundle" className="text-icu hover:underline">ICU care bundle on ECMO</a></li>
                <li><a href="#ecpr" className="text-icu hover:underline">ECPR for refractory arrest</a></li>
                <li><a href="#trial-evidence" className="text-icu hover:underline">Major trial evidence</a></li>
                <li><a href="#prognostic-scores" className="text-icu hover:underline">SAVE & RESP prognostic scores</a></li>
                <li><a href="#weaning" className="text-icu hover:underline">Weaning trials</a></li>
                <li><a href="#ethics" className="text-icu hover:underline">Ethics & withdrawal on ECMO</a></li>
                <li><a href="#pitfalls" className="text-icu hover:underline">Common exam pitfalls</a></li>
                <li><a href="#faq" className="text-icu hover:underline">Frequently asked questions</a></li>
              </ul>
            </nav>

            {/* Overview */}
            <div>
              <h2 id="overview" className="text-2xl font-serif font-bold text-foreground mb-3">What ECMO is — and is not</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Extracorporeal membrane oxygenation is a temporary, miniaturised
                cardiopulmonary bypass circuit used in the ICU. It does not
                <em> treat </em> the underlying disease — it buys time for the lungs
                or heart to recover, or for definitive therapy (transplantation,
                LVAD, PCI). Survival depends as much on patient selection and
                system performance as on the technology itself.
              </p>
              <div className="p-3 rounded-lg border border-border bg-secondary/20">
                <p className="text-xs font-semibold text-foreground mb-1">Two configurations</p>
                <p className="text-xs text-muted-foreground">
                  <strong>VV-ECMO</strong> — gas exchange only. Blood drained from
                  and returned to the venous system. Use for refractory respiratory
                  failure with preserved cardiac output. <strong>VA-ECMO</strong> —
                  cardiac and respiratory support. Venous drainage, arterial return.
                  Use for refractory cardiogenic shock or cardiac arrest (ECPR).
                </p>
              </div>
            </div>

            {/* Circuit */}
            <div>
              <h2 id="circuit" className="text-2xl font-serif font-bold text-foreground mb-3">Circuit components</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { part: "Drainage cannula", detail: "Large-bore (21–29 Fr), multi-fenestrated. Femoral vein → IVC/RA most common. Pre-pump pressure should be negative but > –100 mmHg to avoid haemolysis and cavitation." },
                  { part: "Centrifugal pump", detail: "Magnetically levitated impeller (e.g. CentriMag, Rotaflow). Preload- and afterload-sensitive — flow drops if venous return is poor or systemic resistance rises. Watch for line chatter (hypovolaemia)." },
                  { part: "Membrane oxygenator", detail: "Polymethylpentene hollow-fibre. Blood flows on one side, sweep gas the other. FdO₂ controls oxygenation; sweep flow controls CO₂ removal. Integrated heat exchanger." },
                  { part: "Return cannula", detail: "VV: internal jugular → SVC/RA, or contralateral femoral vein. VA: femoral artery (peripheral) or aorta (central). Distal perfusion cannula essential for femoral arterial return." },
                ].map((c) => (
                  <div key={c.part} className="p-3 rounded-lg border border-border">
                    <p className="font-semibold text-foreground text-sm">{c.part}</p>
                    <p className="text-sm text-muted-foreground mt-1">{c.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Cannulation strategy */}
            <div>
              <h2 id="cannulation" className="text-2xl font-serif font-bold text-foreground mb-3">Cannulation strategy</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Cannula choice, size and position dictate the maximum achievable
                flow, recirculation fraction and complication profile. Drainage
                cannulae are short, large-bore and multi-fenestrated; return
                cannulae are longer, narrower and side-port-free. Maximum flow
                is determined by drainage (negative pressure limits cavitation
                and haemolysis), not by the pump.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg">
                  <thead className="bg-secondary/30">
                    <tr>
                      <th className="text-left p-2 font-semibold">Approach</th>
                      <th className="text-left p-2 font-semibold">Typical cannulae</th>
                      <th className="text-left p-2 font-semibold">Strengths</th>
                      <th className="text-left p-2 font-semibold">Limitations</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-t border-border">
                      <td className="p-2 font-medium text-foreground">Femoral V → Femoral V (VV)</td>
                      <td className="p-2">Drainage 23–25 Fr femoral V (tip at hepatic IVC), return 19–21 Fr contralateral femoral V (tip at RA)</td>
                      <td className="p-2">Fastest peripheral access; suitable for percutaneous insertion in ED/ICU</td>
                      <td className="p-2">Highest recirculation (10–30%); patient bed-bound; femoral access compromises mobilisation</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-2 font-medium text-foreground">Femoral V → Internal Jugular V (VV)</td>
                      <td className="p-2">Drainage 25 Fr femoral V, return 21 Fr right IJ (tip at SVC/RA junction)</td>
                      <td className="p-2">Lower recirculation; permits limb mobilisation</td>
                      <td className="p-2">Two access sites; IJ cannulation in coagulopathy</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-2 font-medium text-foreground">Dual-lumen single-cannula (Avalon, Crescent)</td>
                      <td className="p-2">27–31 Fr right IJ dual-lumen — drainage ports in SVC and IVC, return port directed at tricuspid valve</td>
                      <td className="p-2">Single access; awake ECMO and ambulation; bridge to lung transplantation</td>
                      <td className="p-2">Requires fluoroscopy or TOE for accurate positioning; malposition causes recirculation or RV/PA injury</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-2 font-medium text-foreground">Peripheral femoro-femoral VA</td>
                      <td className="p-2">Drainage 23–25 Fr femoral V (tip at RA), return 15–19 Fr femoral A + 6–8 Fr distal perfusion cannula</td>
                      <td className="p-2">Rapid bedside or cath-lab insertion; standard for cardiogenic shock and ECPR</td>
                      <td className="p-2">Harlequin syndrome; LV distension; limb ischaemia without distal perfusion cannula</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-2 font-medium text-foreground">Central VA (post-cardiotomy)</td>
                      <td className="p-2">RA drainage, ascending aorta return via open chest</td>
                      <td className="p-2">Antegrade aortic flow eliminates Harlequin; high flow achievable</td>
                      <td className="p-2">Sternotomy with open or covered chest; bleeding and mediastinitis risk</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td className="p-2 font-medium text-foreground">VAV (peripheral VA + IJ return)</td>
                      <td className="p-2">Femoral V drainage, femoral A return, plus an IJ return cannula</td>
                      <td className="p-2">Treats Harlequin by delivering oxygenated blood to the upper body</td>
                      <td className="p-2">More complex circuit; balance of flow split between A and V return</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                <strong>Sizing rule of thumb:</strong> target circuit blood flow
                of 60–80 mL/kg/min (full VV support) or 50–70 mL/kg/min (VA
                support). For a 70 kg adult, this is 4–5 L/min — achievable
                with a 23–25 Fr drainage and a 19–21 Fr return cannula. The
                most common cause of inadequate flow is undersized drainage.
              </p>
            </div>

            {/* ECMO configurations comparison */}
            <div>
              <h2 id="configurations" className="text-2xl font-serif font-bold text-foreground mb-3">ECMO configurations at a glance</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg">
                  <thead className="bg-secondary/30">
                    <tr>
                      <th className="text-left p-2 font-semibold">Configuration</th>
                      <th className="text-left p-2 font-semibold">Supports</th>
                      <th className="text-left p-2 font-semibold">Typical indication</th>
                      <th className="text-left p-2 font-semibold">Key risk</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-t border-border"><td className="p-2 font-medium text-foreground">VV</td><td className="p-2">Gas exchange only</td><td className="p-2">Severe ARDS, primary graft dysfunction post-lung transplant</td><td className="p-2">Recirculation; does not unload the right heart</td></tr>
                    <tr className="border-t border-border"><td className="p-2 font-medium text-foreground">Peripheral VA</td><td className="p-2">Heart + lungs</td><td className="p-2">Cardiogenic shock, ECPR, fulminant myocarditis, massive PE</td><td className="p-2">Harlequin, LV distension, limb ischaemia</td></tr>
                    <tr className="border-t border-border"><td className="p-2 font-medium text-foreground">Central VA</td><td className="p-2">Heart + lungs</td><td className="p-2">Post-cardiotomy shock, can't-wean from CPB</td><td className="p-2">Bleeding, open chest, mediastinitis</td></tr>
                    <tr className="border-t border-border"><td className="p-2 font-medium text-foreground">VAV (V→A + V)</td><td className="p-2">Heart + lungs + Harlequin rescue</td><td className="p-2">Peripheral VA with recovering heart causing upper-body hypoxaemia</td><td className="p-2">Flow split between two returns; circuit complexity</td></tr>
                    <tr className="border-t border-border"><td className="p-2 font-medium text-foreground">VV-PA (RVAD)</td><td className="p-2">RV failure with preserved gas exchange</td><td className="p-2">Isolated RV failure (post-LVAD, severe PH crisis)</td><td className="p-2">PA cannula migration; PA rupture</td></tr>
                    <tr className="border-t border-border"><td className="p-2 font-medium text-foreground">ECCO₂R (low-flow)</td><td className="p-2">CO₂ clearance only (0.5–1.5 L/min)</td><td className="p-2">Severe AECOPD; ultra-protective ventilation in moderate ARDS</td><td className="p-2">Bleeding for limited benefit; SUPERNOVA / REST trials neutral or harmful</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Interactive VV circuit animation */}
            <div className="not-prose">
              <ECMOCircuitDiagram />
            </div>


            {/* Physics of gas exchange */}
            <div>
              <h2 id="gas-exchange" className="text-2xl font-serif font-bold text-foreground mb-3">Controlling oxygenation and CO₂ clearance</h2>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
                <li><strong>Oxygenation</strong> depends on circuit blood flow (typically 60–80 mL/kg/min) and FdO₂. The ratio of ECMO flow to native cardiac output determines arterial PaO₂.</li>
                <li><strong>CO₂ removal</strong> is highly efficient and depends almost entirely on <em>sweep gas flow</em>. A small change in sweep (1–2 L/min) can produce large PaCO₂ swings — change slowly to avoid cerebral vasoconstriction.</li>
                <li><strong>Recirculation fraction</strong> in VV-ECMO: a portion of returned oxygenated blood is re-aspirated by the drainage cannula. Suspect when SvO₂ pre-membrane is unexpectedly high but PaO₂ remains low.</li>
                <li><strong>Differential hypoxia</strong> (Harlequin) in peripheral VA-ECMO — see complications below.</li>
              </ul>
            </div>

            {/* VV indications and EOLIA */}
            <div>
              <h2 id="vv-ecmo-indications" className="text-2xl font-serif font-bold text-foreground mb-3">VV-ECMO: indications & EOLIA / CESAR evidence</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Severe ARDS or other reversible hypoxaemic / hypercapnic respiratory
                failure refractory to lung-protective ventilation, proning and
                rescue therapies. ELSO entry criteria mirror the EOLIA trial:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
                <li>PaO₂/FiO₂ &lt; 50 mmHg for &gt; 3 h, <em>or</em></li>
                <li>PaO₂/FiO₂ &lt; 80 mmHg for &gt; 6 h, <em>or</em></li>
                <li>pH &lt; 7.25 with PaCO₂ ≥ 60 mmHg for &gt; 6 h, with Vt reduced to 4 mL/kg and RR up to 35.</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                <strong>CESAR (2009)</strong> randomised severe respiratory failure
                to referral to a single UK ECMO centre vs conventional management;
                referral improved 6-month disability-free survival.
                <strong> EOLIA (2018)</strong> stopped early for futility (60 % vs
                46 % 60-day mortality, p = 0.09) but a pre-specified Bayesian
                re-analysis estimated a 96 % probability of mortality benefit at
                the trial's chosen prior. Practice has converged on referral for
                EOLIA-eligible patients.
              </p>
            </div>

            {/* VA indications */}
            <div>
              <h2 id="va-ecmo-indications" className="text-2xl font-serif font-bold text-foreground mb-3">VA-ECMO: indications</h2>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Refractory cardiogenic shock (post-cardiotomy, fulminant myocarditis, decompensated cardiomyopathy, massive PE, drug toxicity).</li>
                <li>Bridge to recovery, transplantation, or durable LVAD.</li>
                <li>Refractory cardiac arrest (ECPR) in selected patients.</li>
                <li>Right ventricular failure with preserved gas exchange (consider RV-protective configurations or VV with added cannula for selected cases).</li>
              </ul>
            </div>

            {/* Interactive VA circuit animation — shows retrograde aortic flow + Harlequin watershed */}
            <div className="not-prose">
              <VAECMOCircuitDiagram />
            </div>

            {/* Complications */}
            <div>
              <h2 id="complications" className="text-2xl font-serif font-bold text-foreground mb-3">Major complications</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { name: "Bleeding", detail: "Commonest complication. Cannulation sites, ICH, GI, surgical sites. Driven by heparin, acquired vWF deficiency (high shear), thrombocytopaenia. Target the lowest acceptable APTT/ACT and platelets > 50–80 × 10⁹/L." },
                  { name: "Thrombosis / oxygenator failure", detail: "Visible fibrin in the oxygenator, rising trans-membrane pressure, falling post-oxygenator PaO₂, falling platelets and fibrinogen, rising D-dimer. Plan elective circuit change before catastrophic failure." },
                  { name: "Harlequin / North–South syndrome", detail: "Peripheral VA-ECMO: poorly oxygenated native blood ejected by recovering heart perfuses upper body. Monitor right radial SpO₂. Manage with native lung optimisation, ↑ flow, or VAV conversion." },
                  { name: "LV distension", detail: "Increased afterload from retrograde aortic flow + persistent venous return. Watch PAOP, pulmonary oedema, absent aortic valve opening on echo. Decompress with inotropy, IABP, atrial septostomy, or Impella vent." },
                  { name: "Limb ischaemia", detail: "Femoral arterial cannula obstructs distal flow. Distal perfusion cannula (small antegrade catheter into superficial femoral artery) is now standard. Assess pulses, NIRS or Doppler hourly." },
                  { name: "HIT", detail: "Heparin-induced thrombocytopaenia: 4Ts score, anti-PF4 antibody, confirmatory functional assay. Switch to bivalirudin or argatroban; do not give platelets unless bleeding." },
                  { name: "Haemolysis", detail: "Causes: excessively negative pre-pump (drainage) pressure < –100 mmHg from hypovolaemia, cannula malposition or kinking; oxygenator or pump-head thrombus; high pump speed with low flow; roller-pump occlusion. Monitor: plasma free haemoglobin (PfHb) — > 100 mg/L (10 mg/dL) defines significant haemolysis on ELSO criteria — plus LDH, unconjugated bilirubin, falling Hb without bleeding, pink/port-wine plasma or urine, haptoglobin, and a rising trans-membrane pressure gradient. Consequences: haemoglobinuric AKI, scavenging of nitric oxide with vasoconstriction and pulmonary hypertension, hyperkalaemia, and platelet activation. Management: correct drainage (fluid bolus, reduce revolutions per minute, reposition or upsize the cannula), maintain urine output with isotonic fluids, treat hyperkalaemia, transfuse to target, avoid unnecessary further shear, and change the oxygenator or whole circuit if PfHb keeps rising or thrombus is visible; ensure anticoagulation targets are being met, since circuit thrombosis is a common driver (see anticoagulation table) — reference: Willers et al., J Clin Med 2022 (anticoagulation strategies during ECMO)." },
                  { name: "Infection", detail: "Cannula-related bloodstream infection rates 10–20 %. Daily review, low threshold for cultures, no prophylactic antibiotics — surveillance and source control." },
                ].map((c) => (
                  <div key={c.name} className="p-3 rounded-lg border border-border">
                    <p className="font-semibold text-foreground text-sm">{c.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{c.detail}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                <strong>Haemolysis surveillance in practice:</strong> measure plasma free haemoglobin and LDH at least daily, correlate with pre-pump pressure and trans-membrane gradient trends, and treat a rising PfHb as a circuit problem until proven otherwise — inadequate anticoagulation and evolving oxygenator thrombosis are the commonest reversible causes <InlineRef topicId="ecmo" refLabel="ECMO Anticoagulation 2022" />.
              </p>
            </div>

            {/* Configuration change & special indications */}
            <div>
              <h2 id="conversion" className="text-2xl font-serif font-bold text-foreground mb-3">Changing configuration: VV → VA and hybrid (VAV)</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Roughly 3–5% of VV runs are converted to VA or hybrid support, most often for new or unrecognised cardiac failure; conversion identifies a higher-risk group and outcomes are worse than for primary VA-ECMO, so the decision belongs with the ECMO consultant and cardiothoracic team <InlineRef topicId="ecmo" refLabel="ELSO Conversion 2025" />.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <div className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Triggers to convert</p>
                  <p className="text-sm text-muted-foreground mt-1">Progressive biventricular or RV failure with low native cardiac output despite full VV support; refractory arrhythmia or cardiac arrest on VV-ECMO; sepsis-related cardiomyopathy; massive PE; escalating inotropes with rising lactate and falling mixed venous saturation despite adequate ECMO flow. Confirm with echocardiography before committing.</p>
                </div>
                <div className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">How it is done</p>
                  <p className="text-sm text-muted-foreground mt-1">Ultrasound-guided arterial access (femoral, with an obligatory distal perfusion cannula, or axillary/central in selected cases), heparin bolus, then either (a) reuse the existing venous drainage and move the return limb to the artery (VA), or (b) split the return with a Y-connector between the internal jugular vein and the artery to create a <strong>VAV</strong> circuit when gas exchange still needs support — flow to each limb is balanced with a clamp or flow probe.</p>
                </div>
                <div className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Immediate risks after conversion</p>
                  <p className="text-sm text-muted-foreground mt-1">LV distension and pulmonary oedema from retrograde afterload (consider IABP, Impella or septostomy), Harlequin syndrome, limb ischaemia, bleeding at the new site, and differential flow with recirculation in VAV. Re-echo, re-check right radial SpO₂ and arterial blood gases from the right arm, and reassess anticoagulation.</p>
                </div>
                <div className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Accidental hypothermia and ECLS</p>
                  <p className="text-sm text-muted-foreground mt-1">Extracorporeal rewarming is <strong>first-line</strong> for hypothermic cardiac arrest and for a hypothermic patient with cardiac instability that does not respond to medical management: core temperature &lt; 28 °C with instability, &lt; 32 °C with a refractory arrhythmia or shock, or hypothermic cardiac arrest. Confirm potential reversibility (serum potassium generally &lt; 12 mmol/L, no lethal injury, use the HOPE score where available), continue CPR during transfer to an ECLS centre, rewarm at about 3–4 °C per hour, and remember "not dead until warm and dead" <InlineRef topicId="ecmo" refLabel="Accidental Hypothermia 2021" />.</p>
                </div>
              </div>
            </div>


            {/* Interactive troubleshooting decision diagram */}
            <div className="not-prose">
              <ECMOTroubleshootingDiagram />
            </div>

            {/* Anticoagulation & monitoring */}
            <div>
              <h2 id="anticoagulation" className="text-2xl font-serif font-bold text-foreground mb-3">Anticoagulation & monitoring</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Anticoagulation is the central balancing act of ECMO: bleeding
                (40–60% of runs) and thrombosis (oxygenator failure, circuit
                clot, stroke) compete daily. Use the lowest target that keeps
                the circuit patent in the context of the patient's bleeding
                risk and source of bleeding.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg">
                  <thead className="bg-secondary/30">
                    <tr>
                      <th className="text-left p-2 font-semibold">Agent</th>
                      <th className="text-left p-2 font-semibold">Indication</th>
                      <th className="text-left p-2 font-semibold">Monitoring & target</th>
                      <th className="text-left p-2 font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-t border-border"><td className="p-2 font-medium text-foreground">Unfractionated heparin</td><td className="p-2">First-line</td><td className="p-2">APTT 1.5–2× normal, ACT 180–220 s, anti-Xa 0.3–0.7 IU/mL</td><td className="p-2">Anti-Xa is most reliable in critical illness (raised acute-phase reactants distort APTT)</td></tr>
                    <tr className="border-t border-border"><td className="p-2 font-medium text-foreground">Bivalirudin</td><td className="p-2">Confirmed HIT or heparin failure</td><td className="p-2">APTT 1.5–2× normal; dilute pharmacokinetics in renal failure</td><td className="p-2">No reversal agent; useful in HIT; growing use as a primary alternative to heparin</td></tr>
                    <tr className="border-t border-border"><td className="p-2 font-medium text-foreground">Argatroban</td><td className="p-2">HIT, hepatically cleared</td><td className="p-2">APTT 1.5–2× normal</td><td className="p-2">Avoid in hepatic failure</td></tr>
                    <tr className="border-t border-border"><td className="p-2 font-medium text-foreground">No anticoagulation (heparin-bonded circuit)</td><td className="p-2">Major active bleeding</td><td className="p-2">Hourly visual circuit inspection, trans-membrane pressure, oxygenator gas exchange</td><td className="p-2">Time-limited; accept higher circuit-change frequency</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                <strong>Daily haematology bundle:</strong> platelets (target
                &gt; 50 × 10⁹/L, &gt; 80 if bleeding), fibrinogen (&gt; 1.5
                g/L), Hb (target 70–90 g/L unless ischaemic), D-dimer trend
                (rising suggests circuit thrombosis), anti-Xa, ACT 4–6 hourly,
                free Hb (haemolysis), LDH. Acquired von Willebrand syndrome
                from high shear is a major contributor to bleeding —
                consider tranexamic acid for mucocutaneous bleeding and DDAVP
                cautiously.
              </p>
            </div>

            {/* ICU care bundle */}
            <div>
              <h2 id="icu-care-bundle" className="text-2xl font-serif font-bold text-foreground mb-3">ICU care bundle on ECMO</h2>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li><strong>Ventilation</strong>: ultra-protective settings on VV-ECMO — Vt 3–4 mL/kg PBW, plateau ≤ 25 cmH₂O, PEEP 10–15, RR 10, FiO₂ 0.3 to allow lung rest. Avoid spontaneous over-breathing causing patient self-inflicted lung injury (P-SILI).</li>
                <li><strong>Sedation</strong>: deep sedation initially (RASS −4 to −5) ± neuromuscular blockade during cannulation; then light sedation (RASS −1 to 0) and consider awake-ECMO programmes for bridge-to-transplant.</li>
                <li><strong>Mobilisation</strong>: physiotherapy and ambulation are achievable with single-cannula dual-lumen VV configurations and dedicated ECMO–rehab pathways (notably for lung-transplant bridging).</li>
                <li><strong>Transfusion</strong>: restrictive Hb threshold 70–90 g/L unless ischaemic; platelets &gt; 50 × 10⁹/L (&gt; 80 if bleeding); fibrinogen &gt; 1.5 g/L; FFP only for active bleeding or invasive procedures.</li>
                <li><strong>Renal</strong>: AKI is common (60–80%); CRRT is usually integrated into the ECMO circuit via a haemofilter or a separate access. Drug clearance is altered by adsorption to the oxygenator (lipophilic drugs, sedatives) and the larger circuit volume.</li>
                <li><strong>Infection</strong>: surveillance cultures; no routine prophylactic antibiotics; CRBSI rate 10–20 per 1000 ECMO days.</li>
                <li><strong>Nutrition</strong>: enteral feeding within 24–48 h is safe even on full ECMO support; energy targets per critical-care guidance.</li>
              </ul>
            </div>

            <div>
              <h2 id="ecpr" className="text-2xl font-serif font-bold text-foreground mb-3">ECPR — extracorporeal CPR for refractory arrest</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Femoral VA cannulation during ongoing mechanical CPR for selected
                patients with refractory cardiac arrest. ELSO entry criteria:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
                <li>Witnessed arrest with bystander CPR within 5 min.</li>
                <li>Shockable initial rhythm (VF / pulseless VT).</li>
                <li>No-flow time &lt; 5 min, low-flow time &lt; 60 min.</li>
                <li>Age &lt; 70 (centre-dependent), no major comorbidity.</li>
                <li>End-tidal CO₂ &gt; 1.3 kPa (10 mmHg) during CPR — surrogate for adequate compressions and tissue perfusion.</li>
                <li>Reversible cause suspected (commonly ACS for downstream PCI).</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                <strong>ARREST (2020)</strong> and <strong>Prague-OHCA (2022)</strong>
                supported ECPR in highly selected centres; <strong>INCEPTION (2023)</strong>
                (multicentre, Dutch) showed no benefit. The signal is that
                pre-hospital and inter-hospital system performance — low-flow time,
                straight-to-cath-lab pathways — matters as much as the intervention.
              </p>
            </div>

            {/* Weaning */}
            <div>
              <h2 id="weaning" className="text-2xl font-serif font-bold text-foreground mb-3">Weaning trials</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">VV-ECMO — sweep-down trial</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Reduce sweep gas flow stepwise to zero while maintaining blood
                    flow (prevents circuit thrombosis). Ventilate the patient on
                    protective settings (e.g. Vt 6 mL/kg, PEEP 10, FiO₂ 0.5).
                    Reassess gas exchange at 30–60 min; if PaO₂/FiO₂ &gt; 150 and
                    pH/PaCO₂ stable, plan decannulation.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">VA-ECMO — flow-down trial</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Reduce flow stepwise (e.g. 4 → 2 → 1 L/min) with continuous
                    echocardiography. Adequate LVOT VTI &gt; 10 cm, aortic valve
                    opening, MAP &gt; 60 mmHg on minimal inotropy and stable
                    lactate suggests successful weaning. Never clamp — keep flow
                    on a "bridged" circuit until decannulation.
                  </p>
                </div>
              </div>
            </div>

            {/* Major trial evidence */}
            <div>
              <h2 id="trial-evidence" className="text-2xl font-serif font-bold text-foreground mb-3">Major trial evidence</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg">
                  <thead className="bg-secondary/30">
                    <tr>
                      <th className="text-left p-2 font-semibold">Trial (year)</th>
                      <th className="text-left p-2 font-semibold">Population</th>
                      <th className="text-left p-2 font-semibold">Intervention vs comparator</th>
                      <th className="text-left p-2 font-semibold">Result</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-t border-border"><td className="p-2 font-medium text-foreground">CESAR (2009)</td><td className="p-2">Severe adult respiratory failure (Murray ≥ 3 or uncompensated hypercapnia)</td><td className="p-2">Referral to a single UK ECMO centre vs conventional management</td><td className="p-2">↑ 6-month disability-free survival (63% vs 47%, RR 0.69, p = 0.03) — referral effect; not all referred patients received ECMO</td></tr>
                    <tr className="border-t border-border"><td className="p-2 font-medium text-foreground">EOLIA (2018)</td><td className="p-2">Severe ARDS meeting EOLIA criteria</td><td className="p-2">Early VV-ECMO vs continued conventional management with crossover</td><td className="p-2">Stopped early for futility — 60-day mortality 35% vs 46% (RR 0.76, p = 0.09); 28% crossover. Bayesian re-analysis: ≥96% probability of mortality benefit</td></tr>
                    <tr className="border-t border-border"><td className="p-2 font-medium text-foreground">EOLIA Bayesian re-analysis (2018)</td><td className="p-2">Same cohort</td><td className="p-2">Bayesian framework with multiple priors</td><td className="p-2">Robust ≥ 88% probability of mortality reduction across priors; underpins current ELSO referral criteria</td></tr>
                    <tr className="border-t border-border"><td className="p-2 font-medium text-foreground">ARREST (2020)</td><td className="p-2">Refractory OHCA with shockable rhythm, Minneapolis (single-centre)</td><td className="p-2">ECPR vs standard ACLS</td><td className="p-2">Stopped early for benefit — survival to hospital discharge 43% vs 7%; selected, system-supported cohort</td></tr>
                    <tr className="border-t border-border"><td className="p-2 font-medium text-foreground">Prague-OHCA (2022)</td><td className="p-2">Refractory OHCA, Prague (single-centre)</td><td className="p-2">Invasive strategy (ECPR + immediate angiography) vs standard ACLS</td><td className="p-2">No difference in primary 180-day neurologic outcome; signal for benefit in pre-specified subgroups</td></tr>
                    <tr className="border-t border-border"><td className="p-2 font-medium text-foreground">INCEPTION (2023)</td><td className="p-2">Refractory OHCA, 10 Dutch centres</td><td className="p-2">ECPR vs standard ACLS</td><td className="p-2">Neutral — 30-day survival with good neurologic outcome 20% vs 16% (OR 1.4, p = 0.52); highlights system-performance dependence</td></tr>
                    <tr className="border-t border-border"><td className="p-2 font-medium text-foreground">SUPERNOVA (2019) / REST (2022)</td><td className="p-2">Moderate ARDS</td><td className="p-2">Low-flow ECCO₂R to enable ultra-protective ventilation</td><td className="p-2">SUPERNOVA: feasibility, no mortality signal. REST stopped early — increased serious adverse events, no mortality benefit</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Prognostic scores */}
            <div>
              <h2 id="prognostic-scores" className="text-2xl font-serif font-bold text-foreground mb-3">SAVE & RESP prognostic scores</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Two validated tools support patient selection at the bedside.
                Both stratify pre-ECMO predicted hospital survival into five
                classes; treat them as decision-support, not absolute
                contraindications. Discuss borderline cases at MDT and with
                the regional ECMO retrieval team.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">RESP — VV-ECMO for respiratory failure</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Inputs: age, immunocompromised state, mechanical ventilation
                    duration pre-ECMO, diagnosis (viral pneumonia favourable,
                    other less so), CNS dysfunction, acute associated infection,
                    NMB use, NO use, bicarbonate infusion, cardiac arrest pre-ECMO,
                    PaCO₂, peak inspiratory pressure. Classes I–V predict
                    in-hospital survival from 92% to 18%.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">SAVE — VA-ECMO for cardiogenic shock</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Inputs: age, weight, diagnosis (myocarditis and post-heart-
                    transplant favourable; post-cardiotomy less so), CNS, renal,
                    hepatic, pulmonary failure, duration of ventilation pre-ECMO,
                    cardiac arrest before ECMO, peak inspiratory pressure, PEEP,
                    pulse pressure, diastolic BP, HCO₃. Classes I–V predict
                    survival from 75% to 18%.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">PRESERVE — long-term outcome after VV-ECMO for ARDS</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    An eight-variable score (age, BMI, immunocompromised status,
                    prone positioning before ECMO, days of ventilation before
                    ECMO, SOFA score, plateau pressure and PEEP) predicting
                    6-month mortality after VV-ECMO for severe ARDS. Risk
                    classes 0–7 correspond to 6-month mortality of roughly 3%
                    up to about 80%, and it complements RESP by describing
                    longer-term rather than in-hospital outcome
                    <InlineRef topicId="ecmo" refLabel="PRESERVE 2013" />.
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                <strong>Limitations of all three scores:</strong> they were derived in
                selected cohorts before modern practice (and before COVID-19),
                they discriminate only moderately (c-statistic ≈ 0.7), they do
                not include frailty, functional baseline or patient wishes, and
                they must never be used alone to refuse or withdraw ECMO in an
                individual patient.
              </p>
            </div>


            {/* Ethics & withdrawal on ECMO */}
            <div>
              <h2 id="ethics" className="text-2xl font-serif font-bold text-foreground mb-3">Ethics & withdrawal on ECMO</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                ECMO is a bridge — to recovery, to transplantation, or to a
                durable device. When none is achievable, the patient is on a
                <em> bridge to nowhere</em>. Agreeing the exit strategy at
                cannulation and reviewing it daily prevents protracted,
                non-beneficial support.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li><strong>Pre-cannulation conversation:</strong> document the bridge (e.g. "bridge to recovery within 14 days"), the criteria for withdrawal, and what will not be offered (e.g. transplant in a contraindicated patient).</li>
                <li><strong>Daily review:</strong> trajectory, organ recovery, neurology, eligibility for transplant or VAD. If none of the exits remains achievable, escalate to MDT discussion.</li>
                <li><strong>Family communication:</strong> ECMO support is highly visible and patients may look "well". Explicit communication about prognosis and the meaning of the device prevents false hope.</li>
                <li><strong>Withdrawal of ECMO:</strong> usually achieved by reducing sweep gas (VV) or flow (VA) to zero, with continued sedation and symptom management. Decannulation post-mortem may be required for organ donation pathways.</li>
                <li><strong>Donation after circulatory death on ECMO:</strong> emerging pathway — engage the donation team early.</li>
              </ul>
            </div>

            {/* Pitfalls */}
            <div>
              <h2 id="pitfalls" className="text-2xl font-serif font-bold text-foreground mb-3">Common exam pitfalls</h2>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Confusing VV (gas exchange only) with VA (cardiac + respiratory) — the indication, cannulation and complications differ entirely.</li>
                <li>Monitoring a left-sided SpO₂ on peripheral VA-ECMO and missing Harlequin syndrome.</li>
                <li>Adjusting FdO₂ to clear CO₂ — sweep gas, not FdO₂, controls CO₂ clearance.</li>
                <li>Forgetting the distal perfusion cannula and causing limb ischaemia.</li>
                <li>Clamping the circuit during a weaning trial — guaranteed circuit thrombosis.</li>
                <li>Quoting CESAR as proof that "ECMO saves lives" — CESAR proved <em>referral</em> to an ECMO centre improved outcomes; the intervention bundle matters.</li>
                <li>Conflating ARREST (positive, single-centre) with INCEPTION (neutral, multicentre) — both are true; system performance reconciles them.</li>
                <li>Treating SAVE/RESP scores as absolute cut-offs; they are decision-support, not gates.</li>
              </ul>
            </div>

            {/* FAQ */}
            <div>
              <h2 id="faq" className="text-2xl font-serif font-bold text-foreground mb-3">Frequently asked questions</h2>
              <div className="space-y-2">
                {ecmoFaqs.map(([q, a]) => (
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
                mainEntity: ecmoFaqs.map(([name, acceptedAnswer]) => ({
                  "@type": "Question",
                  name,
                  acceptedAnswer: { "@type": "Answer", text: acceptedAnswer },
                })),
              })}</script>
            </Helmet>

          </section>
        </ExamSection>
      }
    />
  );
};

export default EcmoTopic;
