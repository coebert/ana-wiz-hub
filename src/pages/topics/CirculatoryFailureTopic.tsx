import { Exam } from "@/data/curriculum";
import { ExamSection } from "@/components/exam/ExamSection";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import { circulatoryFailureQuestions, ecmoQuestions } from "@/data/quizzes";
import FluidResponsivenessDiagram from "@/components/diagrams/intensive-care/FluidResponsivenessDiagram";
import MechanicalCirculatorySupportDiagram from "@/components/diagrams/intensive-care/MechanicalCirculatorySupportDiagram";
import MCSPressureVolumeLoopDiagram from "@/components/diagrams/intensive-care/MCSPressureVolumeLoopDiagram";
import VAECMOCircuitDiagram from "@/components/diagrams/intensive-care/VAECMOCircuitDiagram";
import CPPSpiralDiagram from "@/components/diagrams/intensive-care/CPPSpiralDiagram";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";

const circulatoryFailureFaqs: Array<[string, string]> = [
  ["Which dynamic indices predict fluid responsiveness and when are they invalid?", "PPV, SVV and passive leg raise predict a ≥10–15% SV rise after fluid; they are unreliable in spontaneous breathing, arrhythmia, low tidal volumes (<8 mL/kg), open chest or raised intra-abdominal pressure — use PLR or end-expiratory occlusion instead."],
  ["What is the first-line vasopressor in septic shock and why?", "Noradrenaline — it raises MAP via α₁ vasoconstriction with minimal tachycardia, preserves CO and reduces arrhythmia compared with dopamine (SOAP II); add vasopressin 0.03 U/min if MAP target unmet."],
  ["How does the subendocardial ischaemic spiral develop in cardiogenic shock?", "Hypotension lowers DBP and therefore coronary perfusion pressure (DBP − LVEDP), causing subendocardial ischaemia and further LV dysfunction; restoring DBP with noradrenaline interrupts the spiral and is often more important than inotropy."],
];

const objectives = [
  "Classify shock by mechanism (hypovolaemic, cardiogenic, distributive, obstructive) and recognise the characteristic CVP / CO / SVR pattern of each.",
  "Choose dynamic over static indices to assess fluid responsiveness and apply PPV, SVV, PLR and the mini fluid challenge.",
  "Justify vasopressor use in shock by explaining CPP = DBP − LVEDP and the subendocardial ischaemic spiral.",
  "Pick first-line vasopressor and inotrope for each shock subtype (septic, cardiogenic, RV, neurogenic, AS/HOCM).",
  "Compare IABP, Impella, VA-ECMO and durable LVAD in terms of LV unloading and pressure–volume loop effects.",
  "Identify and manage Harlequin syndrome, LV distension and limb ischaemia on peripheral VA-ECMO.",
  "Set sweep gas and membrane FiO₂ on ECMO and outline a structured weaning trial for VV and VA configurations.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Pattern recognition — which shock?",
    scenario: (
      <>
        Post-op day 4 hip replacement patient collapses. HR 138, BP 72/52, JVP elevated, ETCO₂ 1.7 kPa,
        S1Q3T3, bedside echo shows dilated RV with septal bowing. CVP 18, lactate 5.1.
      </>
    ),
    working: (
      <>
        ↑ CVP, ↓ CO, ↑ SVR, RV failure pattern with low ETCO₂ → <strong>obstructive shock from massive PE</strong>.
        Fluid will worsen RV distension. Hypotension causes RV ischaemia (when RV pressure ≈ systemic, RV
        becomes diastole-perfused like LV) → spiral.
      </>
    ),
    answer: (
      <>
        Systemic thrombolysis (alteplase 50 mg) or surgical/catheter embolectomy. Noradrenaline first-line
        to raise systemic DBP &gt; PA pressure and restore RV CPP. Avoid large fluid boluses. Consider
        VA-ECMO if refractory.
      </>
    ),
    cites: ["BJA Educ 2019"],
  },
  {
    title: "Fluid responsiveness assessment",
    scenario: (
      <>
        Septic shock, intubated VT 6 mL/kg, sinus rhythm, MAP 58 on noradrenaline 0.3 µg/kg/min after
        30 mL/kg crystalloid. PPV 18 %, IVC distensibility 22 %.
      </>
    ),
    working: (
      <>
        PPV &gt; 13 % predicts fluid responsiveness — but caveats apply (sinus rhythm ✓, controlled
        ventilation ✓, VT ≥ 8 mL/kg ✗ — VT is only 6 mL/kg). Confirm with passive leg raise: ≥ 10 % rise
        in CO/VTI predicts ≥ 250 mL bolus benefit, valid in spontaneous breathing and arrhythmias.
      </>
    ),
    answer: (
      <>
        Perform PLR (or 100 mL mini fluid challenge) — if VTI rises ≥ 10 %, give 250–500 mL balanced
        crystalloid and reassess. If non-responsive, escalate vasopressor (add vasopressin), avoid further
        fluid (ANDROMEDA-SHOCK / FRESH).
      </>
    ),
    cites: ["IABP-SHOCK II"],
  },
  {
    title: "ECMO sweep & FiO₂ adjustment",
    scenario: (
      <>
        VV-ECMO day 3 for ARDS. Flow 5 L/min, sweep 4 L/min, FdO₂ 0.6. ABG: PaO₂ 7.8 kPa, PaCO₂ 7.2 kPa,
        pH 7.21. Native ventilation: FiO₂ 0.4, PEEP 10, RR 12.
      </>
    ),
    working: (
      <>
        Sweep gas controls CO₂ removal; membrane FiO₂ (FdO₂) controls O₂. Hypercapnic + acidotic →
        increase sweep. Mild hypoxia → increase FdO₂ and check for recirculation (compare pre- and post-
        oxygenator saturations; target post-oxygenator SaO₂ ~ 100 %, mixed venous &gt; 65 %).
      </>
    ),
    answer: (
      <>
        Increase sweep to 6 L/min (to lower PaCO₂), increase FdO₂ to 0.8. If hypoxia persists, increase
        ECMO flow, check cannula position (recirculation), optimise haemoglobin ≥ 90 g/L.
      </>
    ),
    cites: ["SHOCK trial"],
  },
  {
    title: "VA-ECMO LV distension",
    scenario: (
      <>
        Femoro-femoral VA-ECMO for fulminant myocarditis. Flow 4 L/min. Echo: aortic valve never opens, LV
        markedly distended, severe pulmonary oedema on CXR, frothy ETT secretions.
      </>
    ),
    working: (
      <>
        Retrograde aortic flow ↑↑ afterload → LV cannot eject → LVEDP rises → pulmonary oedema. Without
        venting, the distended LV will not recover and may thrombose.
      </>
    ),
    answer: (
      <>
        Vent the LV: insert IABP (modest unloading), Impella CP/5.0 (direct LV unloading), or perform
        atrial septostomy. Reduce ECMO flow if MAP allows; add inotrope (dobutamine) to encourage AV
        opening. Diurese / ultrafilter for pulmonary oedema.
      </>
    ),
    cites: ["FICM ECMO 2021"],
  },
];

const keyPoints = [
  { text: "Classify shock by mechanism: hypovolaemic, cardiogenic, distributive, obstructive — each has a characteristic CVP/CO/SVR pattern", cites: ["BJA Educ ECMO 2018"] },
  { text: "Dynamic indices (PPV, SVV, PLR) are superior to static measures (CVP) for fluid responsiveness", cites: ["ELSO Guidelines 2017"] },
  { text: "Passive leg raise is the gold standard — works in spontaneous breathing and arrhythmias", cites: ["BJA Educ 2014"] },
  { text: "Cardiogenic shock: inotropes + vasopressors, avoid fluid overload, consider mechanical support (IABP, Impella, VA-ECMO)", cites: ["SSC 2021 Haemodynamics"] },
  { text: "Vasopressors restore CPP = DBP − LVEDP — subendocardial perfusion is the rate-limiting step in shock", cites: ["BJA Educ 2019"] },
  { text: "Noradrenaline is first-line in haemodynamically unstable PE — raises systemic DBP > PA pressure to restore RV CPP", cites: ["IABP-SHOCK II"] },
  { text: "Lactate clearance (>20% in 2 h) is a useful target for resuscitation adequacy", cites: ["SHOCK trial"] },
  { text: "VV-ECMO: respiratory support only. VA-ECMO: cardiac + respiratory support, but risks limb ischaemia, LV distension and Harlequin syndrome", cites: ["FICM ECMO 2021"] },
  { text: "Sweep gas controls CO₂ removal; membrane FiO₂ controls oxygenation — they are independent levers", cites: ["BJA Educ ECMO 2018"] },
  { text: "Harlequin (differential hypoxia): cyanosed upper body + pink legs — monitor right-radial ABG/SpO₂", cites: ["ELSO Guidelines 2017"] },
  { text: "IABP: inflates in diastole (↑ coronary perfusion), deflates in systole (↓ afterload) — contraindicated in AR/dissection; IABP-SHOCK II showed no mortality benefit", cites: ["BJA Educ 2014"] },
  { text: "Impella unloads the LV directly (↓ LVEDP, ↓ MVO₂); LVAD provides total LV bypass for bridge-to-transplant or destination therapy", cites: ["SSC 2021 Haemodynamics"] },
  { text: "ECMO anticoagulation: UFH targeting APTT 60–80 s — balance bleeding vs circuit thrombosis", cites: ["BJA Educ 2019"] },
];

const coreConcepts = (
  <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
    <div>
      <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
      <p className="text-muted-foreground leading-relaxed">
        Shock is defined as inadequate tissue oxygen delivery relative to metabolic demand, resulting in cellular dysfunction. Classification by mechanism guides diagnosis and treatment.
      </p>
    </div>

    <div>
      <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Classification of Shock</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-foreground font-semibold">Type</th>
              <th className="text-left py-2 text-foreground font-semibold">Mechanism</th>
              <th className="text-left py-2 text-foreground font-semibold">CVP</th>
              <th className="text-left py-2 text-foreground font-semibold">CO</th>
              <th className="text-left py-2 text-foreground font-semibold">SVR</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Hypovolaemic</td><td>↓ Preload</td><td>↓</td><td>↓</td><td>↑</td></tr>
            <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Cardiogenic</td><td>Pump failure</td><td>↑</td><td>↓↓</td><td>↑</td></tr>
            <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Distributive</td><td>↓ SVR (vasodilation)</td><td>↓/N</td><td>↑/N</td><td>↓↓</td></tr>
            <tr><td className="py-2 font-medium text-foreground">Obstructive</td><td>↓ Venous return / outflow</td><td>↑</td><td>↓</td><td>↑</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div>
      <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Illustrative Clinical Examples</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-serif font-semibold text-foreground mb-1">Hypovolaemic</h3>
          <p className="text-xs text-muted-foreground italic mb-2">22-year-old motorcyclist, blunt abdominal trauma.</p>
          <p className="text-sm text-foreground/90">HR 135, BP 78/55, cool peripheries, CRT 4 s, lactate 6.2, Hb 72 g/L. FAST: free fluid in Morison's pouch — splenic laceration. <strong>Pattern:</strong> ↓preload, ↓CO, ↑SVR (compensatory), ↓CVP. <strong>Treat:</strong> haemorrhage control + balanced blood products (1:1:1), permissive hypotension until source controlled.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-serif font-semibold text-foreground mb-1">Cardiogenic</h3>
          <p className="text-xs text-muted-foreground italic mb-2">68-year-old with anterior STEMI 6 h ago.</p>
          <p className="text-sm text-foreground/90">HR 110, BP 82/64, cold mottled legs, raised JVP, bibasal crackles, lactate 4.8, oliguric. Echo: LVEF 18%, akinetic anterior wall. <strong>Pattern:</strong> ↑CVP/PAOP, ↓↓CO, ↑SVR. <strong>Treat:</strong> emergency PCI, dobutamine ± noradrenaline, careful diuresis, consider IABP/Impella/VA-ECMO if refractory.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-serif font-semibold text-foreground mb-1">Distributive — septic</h3>
          <p className="text-xs text-muted-foreground italic mb-2">74-year-old with urosepsis from obstructed pyelonephritis.</p>
          <p className="text-sm text-foreground/90">T 39.1, HR 128, BP 76/38 (MAP 51) despite 30 mL/kg crystalloid, warm flushed peripheries, bounding pulse, lactate 4.1, WCC 22. <strong>Pattern:</strong> ↓↓SVR, ↑/N CO ("warm shock"), ↓CVP. <strong>Treat:</strong> source control (urgent nephrostomy), broad-spectrum antibiotics within 1 h, noradrenaline to MAP ≥65, vasopressin if rising NA requirement, hydrocortisone if refractory.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-serif font-semibold text-foreground mb-1">Distributive — anaphylactic</h3>
          <p className="text-xs text-muted-foreground italic mb-2">35-year-old, IV teicoplanin at induction.</p>
          <p className="text-sm text-foreground/90">Sudden ↓ETCO₂, peak airway pressure 38, urticaria, BP 50/30, tryptase rising. <strong>Pattern:</strong> profound vasodilation + capillary leak + bronchospasm. <strong>Treat:</strong> stop trigger, IM adrenaline 500 µg (or IV 50 µg boluses titrated), 100% O₂, IV fluid bolus, second-line: salbutamol, hydrocortisone, chlorphenamine.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-serif font-semibold text-foreground mb-1">Mixed / endocrine — phaeochromocytoma crisis</h3>
          <p className="text-xs text-muted-foreground italic mb-2">44-year-old, hypertensive crisis during laparoscopic adrenal surgery.</p>
          <p className="text-sm text-foreground/90">BP swings from 240/130 to 60/35, HR 150 with ectopy, headache, sweating, hyperglycaemia, lactate 5.0; echo shows a stress (catecholamine) cardiomyopathy with LVEF 30%. <strong>Pattern:</strong> a mixed picture — massive catecholamine surge gives extreme ↑SVR and hypertension, then abrupt <em>cardiogenic and distributive</em> collapse once the tumour is devascularised (loss of catecholamine drive onto a down-regulated, volume-depleted circulation) <InlineRef topicId="circulatory-failure" refLabel="Endocr Rev 2022 (Phaeochromocytoma)" />. <strong>Treat:</strong> phenoxybenzamine/doxazosin α-blockade for 1–2 weeks pre-operatively with liberal salt and fluid, <em>β-blockade only after</em> α-blockade (unopposed α causes catastrophic vasoconstriction); intra-operatively use short-acting agents (phentolamine, magnesium, GTN/SNP, esmolol) and anticipate post-clamp hypotension needing fluid, noradrenaline and occasionally vasopressin. Monitor for post-operative hypoglycaemia from rebound hyperinsulinaemia.</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 md:col-span-2">
          <h3 className="font-serif font-semibold text-foreground mb-1">Distributive — neurogenic</h3>
          <p className="text-xs text-muted-foreground italic mb-2">28-year-old, fall from height, complete C5 cord injury.</p>
          <p className="text-sm text-foreground/90 mb-2">HR 48 (loss of cardiac sympathetic outflow T1–T4), BP 78/40, warm dry skin <em>below</em> the lesion, priapism. <strong>Pattern:</strong> ↓SVR + bradycardia, in contrast to hypovolaemic shock (tachycardic, cool, vasoconstricted).</p>
          <p className="text-sm text-foreground/90 mb-2">
            <strong>Why MAP 80–90 mmHg for the first 5–7 days:</strong> the target is set to preserve <strong>spinal cord perfusion pressure</strong>
            (SCPP = MAP − intraspinal/CSF pressure), directly analogous to CPP = MAP − ICP in traumatic brain injury. Following acute cord injury,
            cord oedema raises intraspinal pressure within the (relatively) fixed dural sac, so a supranormal MAP is needed to maintain adequate SCPP
            and limit secondary ischaemic injury to the penumbra around the primary lesion <InlineRef topicId="circulatory-failure" refLabel="BJA Educ 2014" />.
          </p>
          <p className="text-sm text-foreground/90 mb-2">
            <strong>Why noradrenaline first-line:</strong> its α₁ effect directly counters the loss of sympathetic vasomotor tone (the primary problem),
            while its modest β₁ activity supports a heart rendered bradycardic and inotropically unopposed by unopposed vagal tone
            <InlineRef topicId="circulatory-failure" refLabel="SSC 2021 Haemodynamics" />. Pure α-agonists (phenylephrine) are a reasonable alternative
            if tachyarrhythmia is a concern, but by raising afterload without chronotropic support they <strong>may worsen reflex bradycardia</strong> and
            are used cautiously.
          </p>
          <p className="text-sm text-foreground/90 mb-2">
            <strong>Bradycardia adjuncts:</strong> atropine or glycopyrrolate for symptomatic bradycardia; adrenaline, dopamine, or temporary
            chronotropic (transcutaneous/transvenous) pacing if bradycardia is profound or refractory to anticholinergics — vagal stimulation
            (suctioning, turning) can precipitate severe bradyarrhythmia or asystole in high cervical lesions.
          </p>
          <p className="text-sm text-foreground/90 mb-2">
            <strong>Avoid aggressive fluid loading</strong> — the problem is vasodilatation, not hypovolaemia, and over-resuscitation risks pulmonary
            oedema without correcting SVR. However, in trauma, <strong>occult haemorrhage must always be actively excluded</strong> before attributing
            hypotension to neurogenic shock — the two frequently coexist, and haemorrhagic shock will not respond to vasopressors alone.
          </p>
          <p className="text-sm text-foreground/90">
            <strong>Anatomy:</strong> lesions <strong>above T6</strong> lose the majority of cardiac sympathetic outflow (cardioaccelerator fibres T1–T4)
            and splanchnic vasoconstrictor tone, producing the full triad of hypotension, bradycardia and vasodilated warm skin below the level; lower
            thoracic/lumbar injuries cause vasodilatation with preserved cardiac sympathetics and less bradycardia.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-serif font-semibold text-foreground mb-1">Obstructive — massive PE</h3>
          <p className="text-xs text-muted-foreground italic mb-2">52-year-old, post-op day 4 hip replacement, sudden collapse.</p>
          <p className="text-sm text-foreground/90">HR 140, BP 70/50, JVP elevated, ETCO₂ 1.8 kPa, S1Q3T3 on ECG, RV dilated on bedside echo with septal bowing. <strong>Pattern:</strong> ↑CVP, ↓CO, RV failure. <strong>Treat:</strong> systemic thrombolysis (alteplase 50 mg) or surgical/catheter embolectomy, noradrenaline to support coronary perfusion of the ischaemic RV, avoid fluid overload (worsens RV distension).</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-4 md:col-span-2">
          <h3 className="font-serif font-semibold text-foreground mb-1">Obstructive — tension pneumothorax / tamponade</h3>
          <p className="text-xs text-muted-foreground italic mb-2">Ventilated trauma patient becomes hypotensive 10 min after intubation.</p>
          <p className="text-sm text-foreground/90">↑ peak airway pressure, tracheal deviation, absent breath sounds left, distended neck veins → <strong>tension pneumothorax</strong> — needle decompression then chest drain. Alternative: muffled heart sounds, equal air entry, pulsus paradoxus, swinging RA collapse on echo → <strong>tamponade</strong> — pericardiocentesis. <strong>Pattern:</strong> ↑CVP, ↓venous return, ↓CO, ↑SVR. Vasopressors and fluid are temporising only — definitive treatment is mechanical relief of the obstruction.</p>
        </div>
      </div>
    </div>

    <div>
      <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Assessment of Fluid Responsiveness</h2>
      <div className="my-4"><FluidResponsivenessDiagram /></div>
      <p className="text-muted-foreground leading-relaxed mb-3">
        Static measures (CVP, PAOP) are poor predictors. Dynamic indices are more reliable:
      </p>
      <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
        <li><strong>Pulse pressure variation (PPV)</strong>: &gt;13% predicts fluid responsiveness (requires sinus rhythm, controlled ventilation, VT ≥8 ml/kg)</li>
        <li><strong>Stroke volume variation (SVV)</strong>: &gt;10-15% threshold</li>
        <li><strong>Passive leg raise (PLR)</strong>: Autotransfusion of ~300ml. ↑CO by ≥10% predicts responsiveness. Works in spontaneous breathing and arrhythmias.</li>
        <li><strong>Mini fluid challenge</strong>: 100ml crystalloid over 1 min; ↑VTI &gt;10%</li>
      </ul>
    </div>

    <div>
      <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Cardiogenic Shock</h2>
      <p className="text-muted-foreground leading-relaxed">
        Cardiogenic shock is end-organ hypoperfusion caused by a <em>primary</em> cardiac disorder, and still carries a mortality of around 40%. Acute MI is the commonest cause; others are fulminant myocarditis, decompensated cardiomyopathy, acute valvular emergencies (papillary muscle or chordal rupture, acute aortic or mitral regurgitation), post-cardiotomy stunning, arrhythmia, tamponade and drug overdose.
      </p>
      <div className="grid sm:grid-cols-2 gap-3 mt-3">
        <div className="p-4 rounded-lg border border-border">
          <p className="font-semibold text-foreground text-sm">Pathophysiology — the downward spiral</p>
          <p className="text-sm text-muted-foreground mt-1">
            Loss of contractile mass drops stroke volume and cardiac output. Systemic hypotension reduces coronary perfusion pressure, which is a diastolic phenomenon, while rising LVEDP raises subendocardial wall tension and shortens diastole — so the ischaemic myocardium is simultaneously under-supplied and over-worked. Further ischaemia begets further pump failure. Compensatory sympathetic and RAAS activation increases afterload and heart rate, worsening the oxygen debt. In parallel, systemic hypoperfusion drives a <strong>SIRS response</strong> with inflammatory vasodilatation, so late cardiogenic shock is often a mixed cardiogenic–vasoplegic state with a paradoxically low SVR.
          </p>
        </div>
        <div className="p-4 rounded-lg border border-border">
          <p className="font-semibold text-foreground text-sm">Clinical features</p>
          <p className="text-sm text-muted-foreground mt-1">
            Low output: cool, mottled peripheries, prolonged capillary refill, narrow pulse pressure, tachycardia, raised JVP. Congestion: orthopnoea, crackles, hypoxaemia, hepatomegaly, peripheral oedema. Hypoperfusion end-organ signs: oliguria (&lt; 0.5 mL/kg/h), altered mentation, ileus, rising transaminases and bilirubin ("shock liver"), rising lactate. A cold-and-wet profile is classic; cold-and-dry (euvolaemic) and warm-and-wet (mixed/vasoplegic) profiles also occur and change the fluid strategy.
          </p>
        </div>
        <div className="p-4 rounded-lg border border-border">
          <p className="font-semibold text-foreground text-sm">Diagnostic criteria</p>
          <ul className="list-disc pl-4 mt-1 space-y-1 text-xs text-muted-foreground">
            <li>Systolic BP &lt; 90 mmHg for &gt; 30 min, <em>or</em> vasopressor/inotrope requirement to maintain it</li>
            <li>Evidence of end-organ hypoperfusion (oliguria, cool extremities, altered mentation)</li>
            <li>Cardiac index &lt; 2.2 L/min/m² (&lt; 1.8 without support) with PCWP &gt; 15 mmHg where measured</li>
            <li>Biochemistry: lactate &gt; 2 mmol/L, low ScvO₂/SvO₂ (&lt; 60%), widened veno-arterial CO₂ gap, rising creatinine and transaminases</li>
          </ul>
        </div>
        <div className="p-4 rounded-lg border border-border">
          <p className="font-semibold text-foreground text-sm">Echocardiography — the cornerstone</p>
          <p className="text-sm text-muted-foreground mt-1">
            Echo establishes the aetiology as well as the severity. Look for severe global or regional LV dysfunction with a low LVOT VTI and low stroke volume; RV dilatation and failure (RV:LV ratio, TAPSE &lt; 17 mm, septal shift) suggesting RV infarct or pulmonary embolism; mechanical complications of MI — acute severe mitral regurgitation from papillary muscle rupture, ventricular septal rupture with a shunt jet, free-wall rupture with tamponade; a critical valve lesion; and pericardial tamponade. Repeat echo guides escalation and weaning.
          </p>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">SCAI SHOCK stages — a common language for escalation</h3>
      <p className="text-muted-foreground leading-relaxed mb-2">
        The SCAI five-stage classification (A to E) has been validated in MI-related, post-cardiac-surgery and mixed ICU cohorts, and the stage at presentation is one of the strongest predictors of in-hospital mortality <InlineRef topicId="circulatory-failure" refLabel="SCAI SHOCK 2022" />. Restage the patient after each intervention rather than treating the admission stage as fixed.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border text-left text-foreground"><th className="py-2 pr-3 font-semibold">Stage</th><th className="py-2 font-semibold">Features</th></tr></thead>
          <tbody className="text-muted-foreground align-top">
            <tr className="border-b border-border"><td className="py-2 pr-3 font-medium text-foreground">A — At risk</td><td>Large anterior MI or acute decompensated heart failure but normal perfusion: normal BP, warm, normal lactate, clear JVP.</td></tr>
            <tr className="border-b border-border"><td className="py-2 pr-3 font-medium text-foreground">B — Beginning</td><td>Relative hypotension or tachycardia (SBP &lt; 90, MAP &lt; 60, or a &gt; 30 mmHg fall) <em>without</em> hypoperfusion. Lactate normal, mild congestion.</td></tr>
            <tr className="border-b border-border"><td className="py-2 pr-3 font-medium text-foreground">C — Classic</td><td>Hypoperfusion requiring intervention beyond volume — inotrope, vasopressor or mechanical support. Cold and wet, lactate ≥ 2, oliguria, CI &lt; 2.2.</td></tr>
            <tr className="border-b border-border"><td className="py-2 pr-3 font-medium text-foreground">D — Deteriorating</td><td>Stage C that fails to stabilise after 30 minutes of initial therapy — escalating drug doses or added devices, rising lactate.</td></tr>
            <tr><td className="py-2 pr-3 font-medium text-foreground">E — Extremis</td><td>Circulatory collapse: refractory cardiac arrest with ongoing CPR, or maximal support on multiple pressors ± ECMO, profound acidosis and lactate &gt; 8.</td></tr>
          </tbody>
        </table>
      </div>
      <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Structured management</h3>
      <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
        <li><strong>Stabilise and monitor:</strong> high-flow oxygen or ventilatory support, arterial line, central access, urinary catheter, 12-lead ECG, urgent bedside echo, serial lactate and ScvO₂. Correct hypoxaemia, arrhythmia, electrolytes and acidosis, which are all reversible contributors to pump failure.</li>
        <li><strong>Find and treat the cause:</strong> immediate coronary angiography with <strong>culprit-lesion PCI</strong> for MI-related shock (routine multivessel PCI in the same sitting increases death and renal failure); surgery for mechanical complications and valve emergencies; pericardiocentesis for tamponade; thrombolysis or thrombectomy for massive PE; immunosuppression/mechanical support for fulminant myocarditis.</li>
        <li><strong>Optimise volume, carefully:</strong> assess with echo and dynamic indices. A small challenge (250 mL) is reasonable if the patient is cold-and-dry; in cold-and-wet shock give a loop diuretic or start ultrafiltration/RRT instead — excessive fluid worsens pulmonary oedema and RV distension.</li>
        <li><strong>Pharmacological support:</strong> <strong>noradrenaline</strong> is the first-line vasopressor (better arrhythmia and lactate profile than dopamine or adrenaline in this setting) to restore coronary perfusion pressure, combined with an inotrope — <strong>dobutamine</strong> for β₁ inotropy, <strong>milrinone</strong> or <strong>levosimendan</strong> where β-receptors are downregulated or the patient is β-blocked (both vasodilate, so almost always need a vasopressor alongside). Use the lowest dose that restores perfusion: every inotrope buys output at the cost of myocardial oxygen consumption and arrhythmia.</li>
        <li><strong>Escalate to mechanical circulatory support by SCAI stage:</strong> consider it in stage D and above, or in stage C failing to improve on two agents. IABP for mechanical complications and as a bridge; <strong>Impella</strong> or other percutaneous LV assist for direct unloading; <strong>VA-ECMO</strong> for biventricular or combined cardio-respiratory failure and for eCPR. Decide the strategy explicitly as a <em>bridge to recovery, decision, transplant or candidacy</em>, with an exit plan and a shock-team discussion, before cannulation.</li>
        <li><strong>Reassess and de-escalate:</strong> restage every few hours, wean the inotrope before the vasopressor once lactate clears and urine output returns, and watch for LV distension and aortic-valve non-opening on VA-ECMO.</li>
      </ol>

    </div>

    <div>
      <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Why use vasopressors? — restoring coronary perfusion pressure</h2>
      <p className="text-foreground/90 leading-relaxed mb-3">
        It seems counter-intuitive to <em>increase</em> afterload in a failing heart. The rationale becomes clear once you consider how the left ventricle feeds itself.
      </p>
      <div className="bg-muted/40 rounded-lg p-4 border border-border my-3">
        <p className="text-center font-mono text-foreground">
          CPP = DBP<sub>aorta</sub> − LVEDP
        </p>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Coronary (subendocardial) perfusion pressure is the diastolic aortic pressure minus the LV end-diastolic pressure. Unlike every other vascular bed, the LV myocardium is perfused almost exclusively in <strong>diastole</strong> because systolic intramural pressure exceeds aortic pressure and squeezes the intramyocardial vessels shut.
        </p>
      </div>

      <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">The vicious cycle of hypotension in shock</h3>
      <CPPSpiralDiagram />
      <ol className="list-decimal pl-6 space-y-1 text-foreground/90 text-sm mt-3">
        <li>SVR falls (sepsis, anaphylaxis) <em>or</em> CO falls (cardiogenic) → <strong>diastolic BP falls</strong>.</li>
        <li>Low DBP → <strong>↓ coronary perfusion pressure</strong> → subendocardial ischaemia.</li>
        <li>Ischaemic myocardium contracts and relaxes more poorly → <strong>↓ stroke volume + ↑ LVEDP</strong>.</li>
        <li>↑ LVEDP further <strong>squeezes the subendocardial vessels</strong> from inside → CPP falls again.</li>
        <li>↓ CO → ↓ aortic pressure → ↓ CPP → more ischaemia. The spiral terminates in cardiac arrest unless interrupted.</li>
      </ol>

      <h3 className="text-lg font-serif font-semibold text-foreground mt-5 mb-2">How vasopressors break the cycle</h3>
      <p className="text-foreground/90 leading-relaxed mb-2">
        An α₁-agonist (noradrenaline, phenylephrine, vasopressin via V₁) constricts arterioles and venules. The effects on the LV are twofold:
      </p>
      <ul className="list-disc pl-6 space-y-1 text-foreground/90 text-sm">
        <li><strong>↑ Diastolic aortic pressure</strong> — raising SVR raises the diastolic floor → <strong>↑ CPP and coronary blood flow</strong>, reversing subendocardial ischaemia.</li>
        <li><strong>↑ Venous return</strong> via venoconstriction (~70% of blood volume sits in capacitance veins) → ↑ stroke volume by Frank–Starling, even before any direct inotropy.</li>
        <li>Net effect: a better-perfused myocardium contracts more efficiently, LVEDP falls, and the ischaemic spiral reverses.</li>
      </ul>

      <h3 className="text-lg font-serif font-semibold text-foreground mt-5 mb-2">The trade-off — afterload mismatch</h3>
      <p className="text-foreground/90 leading-relaxed mb-2">
        Raising afterload also raises LV wall stress (Laplace) and MVO₂. The art is finding the SVR at which CPP gain exceeds the MVO₂ cost:
      </p>
      <ul className="list-disc pl-6 space-y-1 text-foreground/90 text-sm">
        <li><strong>Septic / vasoplegic shock:</strong> baseline SVR is profoundly low; restoring it almost always improves CPP without compromising CO. MAP target ≥ 65 mmHg (≥ 80–85 in chronic hypertension).</li>
        <li><strong>Cardiogenic shock:</strong> SVR is already high. Pure α-agonism risks worsening forward failure, so noradrenaline is preferred (β₁ activity preserves CO) and combined with an inotrope (dobutamine, milrinone) or mechanical unloading (IABP, Impella).</li>
        <li><strong>RV failure / massive PE:</strong> the thin-walled RV is normally perfused throughout the cardiac cycle, but when RV pressure rises towards systemic levels, RV perfusion becomes diastole-dependent like the LV. Noradrenaline raises systemic DBP &gt; PA pressure → restores RV CPP → breaks the RV ischaemic spiral. <em>This is why noradrenaline is first-line in haemodynamically unstable PE.</em></li>
        <li><strong>Severe AS / HOCM:</strong> phenylephrine is preferred — pure α₁ raises CPP without the chronotropy that worsens diastolic filling and outflow gradient.</li>
      </ul>

      <div className="bg-secondary/30 rounded-lg p-4 mt-4 border border-border">
        <p className="text-sm font-medium text-foreground">Exam pearl</p>
        <p className="text-sm text-muted-foreground mt-1">
          In a hypotensive patient with myocardial ischaemia, the question "won't a vasopressor make ischaemia worse by raising afterload?" is answered by <strong>CPP = DBP − LVEDP</strong>. Restoring DBP almost always wins because subendocardial perfusion is the rate-limiting step. The strategy fails only when SVR is driven so high that LV wall stress and MVO₂ rise faster than coronary supply — hence the appeal of <em>combining</em> a vasopressor with an inotrope or mechanical unloading device in cardiogenic shock.
        </p>
      </div>

      <h3 className="text-lg font-serif font-semibold text-foreground mt-5 mb-2">Choosing an inotrope in cardiogenic shock</h3>
      <p className="text-foreground/90 leading-relaxed mb-2">
        The SCAI SHOCK staging system (A–E, from "at risk" to "extremis") is a useful common language for escalation decisions and trial reporting <InlineRef topicId="circulatory-failure" refLabel="SCAI SHOCK 2022" />; the choice of inotrope in stages C–E depends on receptor pharmacology as much as haemodynamic target:
      </p>
      <ul className="list-disc pl-6 space-y-1 text-foreground/90 text-sm">
        <li><strong>Dobutamine:</strong> predominantly β₁ agonist with some β₂ activity — increases contractility and heart rate; the β₂ component can cause peripheral vasodilatation and hypotension, particularly at higher doses. Very short half-life (~2 min) allows rapid titration, but tachyphylaxis develops with prolonged infusion (β₁ downregulation). Typical dose 2.5–10 mcg/kg/min <InlineRef topicId="circulatory-failure" refLabel="Br J Pharmacol 2012 (Inotropes)" />.</li>
        <li><strong>Milrinone:</strong> a phosphodiesterase-3 inhibitor that raises intracellular cAMP downstream of, and independently of, β-receptors — so it retains inotropic and vasodilator effect in patients on chronic beta-blockade. It is an "inodilator" (↓ SVR and ↓ PVR as well as ↑ contractility), useful in RV failure and pulmonary hypertension, but causes more hypotension than dobutamine. Half-life ~2 h and renally cleared, so accumulates in renal impairment — reduce dose or avoid in AKI/CKD. Typical dose 0.375–0.75 mcg/kg/min <InlineRef topicId="circulatory-failure" refLabel="Br J Pharmacol 2012 (Inotropes)" />.</li>
        <li><strong>Levosimendan:</strong> a calcium sensitiser that binds troponin C to enhance myofilament calcium responsiveness, increasing contractility <em>without</em> raising intracellular calcium or myocardial oxygen demand; it also opens ATP-sensitive K⁺ channels causing vasodilatation. Its active metabolite OR-1896 has a long half-life, producing haemodynamic effects lasting 7–9 days after a single infusion. LEVO-CTS and SURVIVE showed a neutral mortality effect versus placebo/dobutamine, so it is reserved for beta-blocked patients or as a bridge where prolonged effect is desirable <InlineRef topicId="circulatory-failure" refLabel="Br J Pharmacol 2012 (Inotropes)" />.</li>
        <li><strong>Adrenaline:</strong> potent combined α and β agonist; reserved as a second-line agent because it raises lactate (β₂-mediated) and carries a higher arrhythmia risk. The OptimaCC trial signalled more refractory shock and higher lactate/arrhythmia with adrenaline compared with noradrenaline-dobutamine in cardiogenic shock <InlineRef topicId="circulatory-failure" refLabel="Br J Pharmacol 2012 (Inotropes)" />.</li>
      </ul>
      <div className="bg-muted/40 rounded-lg p-4 border border-border mt-3">
        <p className="text-sm font-medium text-foreground">Practical selection</p>
        <p className="text-sm text-muted-foreground mt-1">
          <strong>Beta-blocked patient:</strong> milrinone or levosimendan (act independently of β-receptors) rather than dobutamine. <strong>Renal failure:</strong> avoid or reduce milrinone (renally cleared, accumulates); dobutamine or levosimendan preferred. <strong>RV failure/pulmonary hypertension:</strong> milrinone's pulmonary vasodilator effect is favourable, though systemic hypotension may need concurrent noradrenaline. <strong>Need for chronotropy</strong> (relative bradycardia): dobutamine's β₁ effect raises heart rate; levosimendan and milrinone are more heart-rate neutral. Adrenaline is kept in reserve when other agents fail to achieve adequate perfusion.
        </p>
      </div>
    </div>

    <div>
      <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Mechanical Circulatory Support (MCS)</h2>
      <div className="my-4 space-y-4">
        <MechanicalCirculatorySupportDiagram />
        <MCSPressureVolumeLoopDiagram />
        <VAECMOCircuitDiagram />
      </div>
      <p className="text-muted-foreground leading-relaxed mb-3">
        When pharmacological therapy fails to restore adequate perfusion in cardiogenic shock, MCS devices can directly augment cardiac output, unload the failing left ventricle, and buy time for recovery, decision, transplantation, or destination therapy. The three principal LV-support devices differ fundamentally in <em>how</em> they generate flow and <em>how much</em> they unload the ventricle.
      </p>

      <h3 className="text-lg font-serif font-semibold text-foreground mt-6 mb-2">Pressure–volume loop analysis</h3>
      <p className="text-foreground/90 leading-relaxed text-sm mb-2">
        The clearest way to compare MCS devices is on the LV pressure–volume (PV) loop. Cardiogenic shock collapses the loop into a tall, wide, low-stroke-work box (low contractility = flatter ESPVR, high LVEDP). Each device modifies the loop differently:
      </p>
      <ul className="list-disc pl-6 space-y-1 text-foreground/90 text-sm mb-3">
        <li><strong>IABP:</strong> small leftward shift — modest ↓ESV/↑SV from afterload reduction; EDV largely unchanged. Stroke work and PVA modestly reduced.</li>
        <li><strong>Impella:</strong> direct LV unloading — loop shrinks and shifts left. EDV ↓, ESV ↓, LVEDP ↓↓, native stroke work ↓ (much of CO is now pump output). PVA falls markedly → ↓MVO₂.</li>
        <li><strong>VA-ECMO:</strong> peripheral retrograde flow ↑↑ afterload → loop becomes tall and may collapse to an isovolumetric vertical line (AV never opens). LVEDP rises → LV distension and pulmonary oedema unless vented (Impella, IABP, atrial septostomy).</li>
        <li><strong>Durable LVAD:</strong> maximal unloading — loop collapses to a small triangle or vertical line at low volume. LVEDP minimal; the native heart contributes essentially no stroke work.</li>
      </ul>

      <h3 className="text-lg font-serif font-semibold text-foreground mt-6 mb-2">VV-ECMO vs VA-ECMO — configuration comparison</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead><tr className="border-b border-border">
            <th className="text-left py-2 text-foreground font-semibold">Feature</th>
            <th className="text-left py-2 text-foreground font-semibold">VV-ECMO</th>
            <th className="text-left py-2 text-foreground font-semibold">VA-ECMO</th>
          </tr></thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Indication</td><td>Severe respiratory failure (ARDS)</td><td>Cardiogenic shock ± respiratory failure</td></tr>
            <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Cannulation</td><td>Femoral vein → internal jugular (or dual-lumen Avalon in IJ)</td><td>Femoral vein → femoral artery (peripheral) or RA → aorta (central)</td></tr>
            <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Cardiac support</td><td>None — patient's heart provides CO</td><td>Yes — provides cardiac output and gas exchange</td></tr>
            <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Oxygenation</td><td>Returned blood mixes with native venous return; risk of recirculation</td><td>Retrograde aortic flow → risk of differential hypoxia (Harlequin)</td></tr>
            <tr><td className="py-2 font-medium text-foreground">Major complications</td><td>Recirculation, haemolysis, bleeding, cannula displacement</td><td>Limb ischaemia, LV distension, differential hypoxia, stroke, bleeding</td></tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-lg font-serif font-semibold text-foreground mt-6 mb-2">ECMO circuit fundamentals</h3>
      <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
        <li><strong className="text-foreground">Components:</strong> drainage cannula → centrifugal pump → polymethylpentene membrane oxygenator → heat exchanger → return cannula.</li>
        <li><strong className="text-foreground">Flow rates:</strong> VV-ECMO 50–80 mL/kg/min for adequate oxygenation; VA-ECMO 3–6 L/min (sufficient to support CO).</li>
        <li><strong className="text-foreground">Sweep gas</strong> controls CO₂ removal (↑ sweep → ↓ PaCO₂); membrane <strong>FiO₂</strong> controls PaO₂. The two are independent.</li>
        <li><strong className="text-foreground">Anticoagulation:</strong> UFH infusion targeting APTT 60–80 s or ACT 180–220 s. Bivalirudin if HIT.</li>
      </ul>

      <h3 className="text-lg font-serif font-semibold text-foreground mt-6 mb-2">Weaning from mechanical circulatory support</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        <div className="p-4 rounded-lg border border-border bg-card">
          <p className="font-semibold text-foreground text-sm">VA-ECMO — the turn-down trial</p>
          <ul className="text-xs text-muted-foreground mt-1 space-y-1 list-disc list-inside">
            <li><strong className="text-foreground">Readiness:</strong> the cause of shock is resolving, arrhythmias controlled, lactate normalised, organ function improving, no significant bleeding, and a return of pulsatility on the arterial trace with recovering pulse pressure.</li>
            <li><strong className="text-foreground">Process:</strong> stepwise reduction of pump flow (typically 0.5 L/min every 10–20 min) down to about 1.5–2 L/min, with anticoagulation intensified at low flows because of stasis and thrombosis risk <InlineRef topicId="circulatory-failure" refLabel="BJA Educ ECMO Weaning 2019" />.</li>
            <li><strong className="text-foreground">Monitoring:</strong> continuous echocardiography (target LVEF &gt; 20–25%, aortic VTI &gt; 10 cm, lateral mitral annular S′ &gt; 6 cm/s, no new RV dilatation), arterial line, PA catheter or ScvO₂ where available.</li>
            <li><strong className="text-foreground">Success:</strong> MAP ≥ 65 mmHg on stable low-dose inotropes/vasopressors, no rise in filling pressures (PAOP/LA pressure) or pulmonary oedema, stable SvO₂ and lactate over the trial period — then decannulate; failure means returning to full flow and reassessing in 24–48 h or escalating to durable support/transplant assessment.</li>
          </ul>
        </div>
        <div className="p-4 rounded-lg border border-border bg-card">
          <p className="font-semibold text-foreground text-sm">VV-ECMO and IABP</p>
          <ul className="text-xs text-muted-foreground mt-1 space-y-1 list-disc list-inside">
            <li><strong className="text-foreground">VV readiness:</strong> improving compliance and chest radiograph, tolerable gas exchange on protective settings (FiO₂ ≤ 0.5–0.6, plateau ≤ 30 cmH₂O, driving pressure ≤ 15 cmH₂O).</li>
            <li><strong className="text-foreground">VV process:</strong> reduce membrane FiO₂, then wean sweep gas to zero (the "sweep-off" or U-bend trial) while keeping blood flow — and therefore anticoagulation — unchanged; assess native lung function on conventional ventilator settings for 2–4 h.</li>
            <li><strong className="text-foreground">VV success:</strong> acceptable PaO₂ and PaCO₂ with a stable respiratory rate and work of breathing on non-injurious settings.</li>
            <li><strong className="text-foreground">IABP:</strong> wean augmentation ratio from 1:1 to 1:2 (and 1:3), then reduce balloon volume, watching MAP, urine output, lactate and inotrope requirement; remove promptly once weaned because of limb ischaemia, haemolysis and infection risk.</li>
          </ul>
        </div>
      </div>

      <h3 className="text-lg font-serif font-semibold text-foreground mt-6 mb-2">Indications & evidence</h3>
      <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
        <li><strong className="text-foreground">VV-ECMO for ARDS:</strong> CESAR (2009) — survival benefit when referred to an ECMO centre. EOLIA (2018) — no significant 60-day mortality benefit but 28% crossover; Bayesian re-analysis suggests probable benefit. Used as rescue after prone positioning, NMB and iNO have failed.</li>
        <li><strong className="text-foreground">VA-ECMO:</strong> refractory cardiogenic shock (post-MI, fulminant myocarditis, post-cardiotomy), bridge to transplant/LVAD, refractory cardiac arrest (eCPR — ARREST 2020 showed survival benefit in shockable OHCA).</li>
        <li><strong className="text-foreground">IABP-SHOCK II</strong> — no mortality benefit from routine IABP in cardiogenic shock complicating MI; IABP no longer Class I indication.</li>
        <li><strong className="text-foreground">Contraindications:</strong> irreversible underlying disease, futility, uncontrolled bleeding, advanced directive against. Severe AR contraindicates VA-ECMO (worsens LV distension).</li>
      </ul>
    </div>

    <div>
      <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Weaning from Vasopressor Support</h2>
      <p className="text-muted-foreground leading-relaxed mb-3">
        Vasopressors should be weaned as soon as the patient is haemodynamically stable rather than continued
        "for safety" — prolonged high-dose catecholamine exposure carries its own morbidity
        <InlineRef topicId="circulatory-failure" refLabel="SSC 2021 Haemodynamics" />.
      </p>

      <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Rationale for early weaning</h3>
      <ul className="list-disc pl-6 space-y-1 text-foreground/90 text-sm">
        <li>Reduces tachyarrhythmias and increased myocardial oxygen demand (MVO₂) from ongoing β-adrenergic stimulation.</li>
        <li>Limits digital and splanchnic ischaemia from sustained peripheral α₁-vasoconstriction.</li>
        <li>Reduces line-related risk (central line duration, extravasation/tissue necrosis, catheter-related bloodstream infection).</li>
      </ul>

      <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Prerequisites before weaning</h3>
      <ul className="list-disc pl-6 space-y-1 text-foreground/90 text-sm">
        <li>Source controlled and infection adequately treated (in septic shock).</li>
        <li>Lactate clearing and improving organ function, including urine output &gt; 0.5 mL/kg/h.</li>
        <li>MAP at target achieved on a low, stable dose of noradrenaline (not rising).</li>
        <li>Adequate but not excessive preload — further fluid is not required to sustain the current MAP.</li>
        <li>Reversible contributors to vasoplegia corrected: hypocalcaemia, acidosis, hypothyroidism, and residual
          sedation/anaesthetic-agent vasodilatation.</li>
      </ul>

      <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Order of weaning</h3>
      <p className="text-foreground/90 leading-relaxed text-sm mb-2">
        Where vasopressin has been added as a second agent, it should generally be weaned <strong>last-in, first-out</strong>
        with caution: because vasopressin cannot be titrated in the same graded way as noradrenaline (fixed low-dose infusion,
        e.g. 0.03 U/min), stopping it first commonly precipitates clinically significant rebound hypotension. Most units
        therefore reduce noradrenaline first and only stop vasopressin once the noradrenaline dose is already low
        <InlineRef topicId="circulatory-failure" refLabel="SSC 2021 Haemodynamics" />. If hydrocortisone was started for
        catecholamine-refractory shock, it is weaned <em>after</em> catecholamines have been discontinued, typically tapered
        over several days rather than stopped abruptly (risk of rebound hypotension/adrenal insufficiency).
      </p>

      <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Practical method</h3>
      <p className="text-foreground/90 leading-relaxed text-sm mb-2">
        Reduce noradrenaline in small increments (e.g. 0.02–0.05 µg/kg/min steps) every 15–30 minutes against a
        defined MAP target (typically ≥ 65 mmHg, higher in chronic hypertension or neurogenic/spinal injury), reassessing
        haemodynamics after each step before proceeding further.
      </p>

      <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Monitoring during the wean</h3>
      <ul className="list-disc pl-6 space-y-1 text-foreground/90 text-sm">
        <li>MAP — continuous arterial line monitoring against the target.</li>
        <li>Lactate trend — rising lactate suggests inadequate perfusion despite an apparently acceptable MAP.</li>
        <li>Urine output — falling below 0.5 mL/kg/h suggests the wean has outpaced renal perfusion.</li>
        <li>Peripheral perfusion — capillary refill time and skin mottling (e.g. mottling score).</li>
        <li>Mentation — new confusion or reduced consciousness may indicate cerebral hypoperfusion.</li>
      </ul>
      <p className="text-foreground/90 leading-relaxed text-sm mt-2">
        If MAP falls below target, lactate rises, urine output drops, mottling worsens, or mentation deteriorates, pause the
        wean and step the dose back up rather than continuing to taper on a fixed schedule.
      </p>
    </div>

    <ExamPitfallsCallout
      accent="icu"
      pitfalls={[
        "Shock classification: hypovolaemic (low preload), cardiogenic (pump failure), distributive (low SVR), obstructive (PE/tamponade/tension PTX).",
        "Noradrenaline first line in septic shock; add vasopressin then hydrocortisone in catecholamine-resistant shock.",
        "IABP-SHOCK II: no mortality benefit from routine IABP in cardiogenic shock post-MI — reserve for selected cases.",
        "VA-ECMO contraindicated in severe AR (worsens LV distension); watch for north–south syndrome with peripheral cannulation.",
        "Fluid responsiveness assessment (PLR, PPV, SVV) — only valid in fully ventilated, sinus-rhythm, Vt ≥8 mL/kg patients.",
      ]}
    />
  </ExamSection>
);

const CirculatoryFailureTopic = () => {
  return (
    <TopicTemplate
      title="Circulatory Failure, Shock & Mechanical Circulatory Support"
      subtitle="FRCA Final / FFICM / EDIC — Intensive Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
      }}
      sectionSources={{
        objectives: [
          "BJA Educ 2019",
          "SSC 2021 Haemodynamics",
          "BJA Educ 2014",
          "ELSO Guidelines 2017",
          "BJA Educ ECMO 2018",
          "FICM ECMO 2021",
          "SHOCK trial",
          "IABP-SHOCK II",
        ],
        keyPoints: [
          "BJA Educ 2019",
          "SSC 2021 Haemodynamics",
          "BJA Educ 2014",
          "ELSO Guidelines 2017",
          "BJA Educ ECMO 2018",
          "FICM ECMO 2021",
          "SHOCK trial",
          "IABP-SHOCK II",
        ],
        workedExamples: ["BJA Educ 2019", "IABP-SHOCK II", "SHOCK trial", "FICM ECMO 2021"],
      }}
      coreConcepts={<>{coreConcepts}<TopicFaqs faqs={circulatoryFailureFaqs} /></>}
      workedExamples={workedExamples}
      keyPoints={keyPoints}
      topicId="circulatory-failure"
      topicTitle="Circulatory Failure, Shock & Mechanical Circulatory Support"
      quizQuestions={[...circulatoryFailureQuestions, ...ecmoQuestions]}
    />
  );
};

export default CirculatoryFailureTopic;
