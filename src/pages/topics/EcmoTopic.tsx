import { TopicTemplate } from "@/components/TopicTemplate";
import { Exam } from "@/data/curriculum";
import { ExamSection } from "@/components/ExamSection";
import { ecmoQuestions } from "@/data/quizzes";
import type { WorkedExample } from "@/components/WorkedExamples";
import ECMOCircuitDiagram from "@/components/diagrams/ECMOCircuitDiagram";
import VAECMOCircuitDiagram from "@/components/diagrams/VAECMOCircuitDiagram";
import ECMOTroubleshootingDiagram from "@/components/diagrams/ECMOTroubleshootingDiagram";

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
            {/* Overview */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">What ECMO is — and is not</h2>
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
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Circuit components</h2>
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

            {/* Physics of gas exchange */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Controlling oxygenation and CO₂ clearance</h2>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
                <li><strong>Oxygenation</strong> depends on circuit blood flow (typically 60–80 mL/kg/min) and FdO₂. The ratio of ECMO flow to native cardiac output determines arterial PaO₂.</li>
                <li><strong>CO₂ removal</strong> is highly efficient and depends almost entirely on <em>sweep gas flow</em>. A small change in sweep (1–2 L/min) can produce large PaCO₂ swings — change slowly to avoid cerebral vasoconstriction.</li>
                <li><strong>Recirculation fraction</strong> in VV-ECMO: a portion of returned oxygenated blood is re-aspirated by the drainage cannula. Suspect when SvO₂ pre-membrane is unexpectedly high but PaO₂ remains low.</li>
                <li><strong>Differential hypoxia</strong> (Harlequin) in peripheral VA-ECMO — see complications below.</li>
              </ul>
            </div>

            {/* VV indications and EOLIA */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">VV-ECMO: indications & EOLIA / CESAR evidence</h2>
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
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">VA-ECMO: indications</h2>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Refractory cardiogenic shock (post-cardiotomy, fulminant myocarditis, decompensated cardiomyopathy, massive PE, drug toxicity).</li>
                <li>Bridge to recovery, transplantation, or durable LVAD.</li>
                <li>Refractory cardiac arrest (ECPR) in selected patients.</li>
                <li>Right ventricular failure with preserved gas exchange (consider RV-protective configurations or VV with added cannula for selected cases).</li>
              </ul>
            </div>

            {/* Complications */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Major complications</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { name: "Bleeding", detail: "Commonest complication. Cannulation sites, ICH, GI, surgical sites. Driven by heparin, acquired vWF deficiency (high shear), thrombocytopaenia. Target the lowest acceptable APTT/ACT and platelets > 50–80 × 10⁹/L." },
                  { name: "Thrombosis / oxygenator failure", detail: "Visible fibrin in the oxygenator, rising trans-membrane pressure, falling post-oxygenator PaO₂, falling platelets and fibrinogen, rising D-dimer. Plan elective circuit change before catastrophic failure." },
                  { name: "Harlequin / North–South syndrome", detail: "Peripheral VA-ECMO: poorly oxygenated native blood ejected by recovering heart perfuses upper body. Monitor right radial SpO₂. Manage with native lung optimisation, ↑ flow, or VAV conversion." },
                  { name: "LV distension", detail: "Increased afterload from retrograde aortic flow + persistent venous return. Watch PAOP, pulmonary oedema, absent aortic valve opening on echo. Decompress with inotropy, IABP, atrial septostomy, or Impella vent." },
                  { name: "Limb ischaemia", detail: "Femoral arterial cannula obstructs distal flow. Distal perfusion cannula (small antegrade catheter into superficial femoral artery) is now standard. Assess pulses, NIRS or Doppler hourly." },
                  { name: "HIT", detail: "Heparin-induced thrombocytopaenia: 4Ts score, anti-PF4 antibody, confirmatory functional assay. Switch to bivalirudin or argatroban; do not give platelets unless bleeding." },
                  { name: "Haemolysis", detail: "Pre-pump pressure < –100 mmHg, kinks, or oxygenator thrombus. Rising free Hb, LDH, pink plasma. Optimise drainage geometry, transfuse, plan circuit change." },
                  { name: "Infection", detail: "Cannula-related bloodstream infection rates 10–20 %. Daily review, low threshold for cultures, no prophylactic antibiotics — surveillance and source control." },
                ].map((c) => (
                  <div key={c.name} className="p-3 rounded-lg border border-border">
                    <p className="font-semibold text-foreground text-sm">{c.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{c.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ECPR */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ECPR — extracorporeal CPR for refractory arrest</h2>
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
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Weaning trials</h2>
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

            {/* Pitfalls */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Common exam pitfalls</h2>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Confusing VV (gas exchange only) with VA (cardiac + respiratory) — the indication, cannulation and complications differ entirely.</li>
                <li>Monitoring a left-sided SpO₂ on peripheral VA-ECMO and missing Harlequin syndrome.</li>
                <li>Adjusting FdO₂ to clear CO₂ — sweep gas, not FdO₂, controls CO₂ clearance.</li>
                <li>Forgetting the distal perfusion cannula and causing limb ischaemia.</li>
                <li>Clamping the circuit during a weaning trial — guaranteed circuit thrombosis.</li>
                <li>Quoting CESAR as proof that "ECMO saves lives" — CESAR proved <em>referral</em> to an ECMO centre improved outcomes; the intervention bundle matters.</li>
              </ul>
            </div>
          </section>
        </ExamSection>
      }
    />
  );
};

export default EcmoTopic;
