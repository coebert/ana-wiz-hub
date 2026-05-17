import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { arrhythmiasEcgIcuQuestions } from "@/data/quizzes";
import CardiacConductionDiagram from "@/components/diagrams/CardiacConductionDiagram";
import HeartBlockDiagram from "@/components/diagrams/HeartBlockDiagram";
import BundleBranchBlockDiagram from "@/components/diagrams/BundleBranchBlockDiagram";
import TachyarrhythmiaDiagram from "@/components/diagrams/TachyarrhythmiaDiagram";
import BradyarrhythmiaDiagram from "@/components/diagrams/BradyarrhythmiaDiagram";
import PacingDevicesDiagram from "@/components/diagrams/PacingDevicesDiagram";
import TwelveLeadEcgDiagram from "@/components/diagrams/TwelveLeadEcgDiagram";
import StemiLocalisationDiagram from "@/components/diagrams/StemiLocalisationDiagram";
import { CoronarySelectionProvider } from "@/components/diagrams/coronarySelectionContext";
import ExpandableEcgCard from "@/components/diagrams/ExpandableEcgCard";
import WellensSyndromeDiagram from "@/components/diagrams/WellensSyndromeDiagram";
import {
  bradyContent,
  heartBlockContent,
  bbbContent,
  tachyContent,
  twelveLeadContent,
  wellensContent,
} from "@/components/diagrams/ecgExpandedContent";
import { WorkedExample } from "@/components/WorkedExamples";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const objectives = [
  "Apply a reproducible 8-step ECG analysis (rate, rhythm, P, PR, QRS, ST/T, QT, compare) to any ICU strip or 12-lead",
  "Localise STEMI to a coronary territory using the 12-lead and recognise STEMI mimics (LBBB, Wellens, posterior MI)",
  "Differentiate the major brady- and tachyarrhythmias and apply the RCUK 2021 peri-arrest algorithms",
  "Identify electrolyte- and drug-induced arrhythmias (hyperK⁺, hypoK⁺/Mg²⁺, digoxin, TCA, LAST) and initiate first-line treatment",
  "Recognise pacing/ICD device modes and manage CIED patients safely peri-procedurally",
  "Deliver post-ROSC care including 12-lead surveillance, electrolyte targeting and ICD referral",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Wide-complex tachycardia in a septic ventilated patient",
    scenario:
      "A 64-year-old man, day 3 of ventilator-associated pneumonia, develops a regular wide-complex tachycardia at 165 bpm. BP 78/42, MAP 54, lactate rising. K⁺ 3.2, Mg²⁺ 0.6. Recent amiodarone load.",
    working:
      "Adverse features present (shock, ischaemia risk). Per RCUK 2021: assume VT in wide-complex tachycardia with structural/critical illness. Plan: synchronised DCCV ×3 under sedation/GA; if fails → amiodarone 300 mg IV over 10–20 min then re-shock. In parallel: replete K⁺ to >4.5 and Mg²⁺ to >1.0 (give 2 g IV Mg²⁺ now), exclude reversible 4Hs/4Ts (hypoxia, ischaemia, tension PTX from VAP, electrolytes).",
    answer:
      "Synchronised DCCV is the immediate priority because adverse features are present. Electrolyte correction and reversible-cause search run alongside but do not delay shock.",
    cites: ["BJA Educ 2018"],
  },
  {
    title: "Hyperkalaemia with peaked T waves",
    scenario:
      "Anuric AKI patient, K⁺ 7.4, ECG shows peaked symmetric T waves and broadening QRS. HR 48, BP 92/50.",
    working:
      "Treat the rhythm, not the number. Step 1 — membrane stabilisation: 10 mL 10% calcium gluconate IV over 2–5 min (or CaCl₂ 10 mL centrally), repeat in 5 min if ECG unchanged. Step 2 — intracellular shift: 10 units actrapid in 50 mL 50% dextrose IV over 15 min; salbutamol 10–20 mg neb. Step 3 — removal: urgent RRT given anuria. Avoid sodium bicarbonate unless severely acidotic.",
    answer:
      "Calcium first (cardio-protection within 1–3 min), then insulin–dextrose ± salbutamol to shift K⁺, then RRT for definitive removal. Re-check K⁺ at 30 min and 1 h.",
    cites: ["ESC AF 2020"],
  },
];

const ArrhythmiasEcgIcuTopic = () => {
  return (
    <TopicTemplate
      title="Arrhythmias & ECG Interpretation"
      subtitle="FFICM / Final FRCA — Cardiovascular Critical Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      topicId="arrhythmias-ecg-icu"
      topicTitle="Arrhythmias & ECG Interpretation"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={arrhythmiasEcgIcuQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC], curriculumCodes: ["FFICM 2.4", "EDIC 4.1"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC], curriculumCodes: ["FFICM 2.4"] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
      }}
      keyPoints={[
        { text: "Apply the same 8-step ECG analysis (rate · rhythm · P · PR · QRS · ST/T · QT · compare) to every strip — speed comes from consistency, not shortcuts", cites: ["ERC/ESICM 2021 Post-Resus"] },
        { text: "Wide-complex tachycardia in an ICU patient = VT until proven otherwise", cites: ["Resuscitation Council UK 2021"] },
        { text: "New-onset AF in ventilated sepsis is usually a marker of evolving shock, fluid overload, or electrolyte derangement — treat the trigger, not just the rhythm", cites: ["ACC/AHA/HRS 2017"] },
        { text: "Site of AV block predicts the device: nodal (1°/Mobitz I) tolerate observation; infranodal (Mobitz II/complete) need urgent pacing", cites: ["TTM2 2021"] },
        { text: "Adverse features (shock, syncope, ischaemia, heart failure) drive the algorithm: synchronised DCCV for unstable tachy, atropine → pacing for unstable brady", cites: ["BJA Educ 2018"] },
        { text: "Always replace magnesium when replacing potassium — refractory hypoK⁺ is often hypoMg²⁺", cites: ["ESC AF 2020"] },
        { text: "Hyperkalaemia: treat the rhythm with calcium first, the number afterwards", cites: ["ERC/ESICM 2021 Post-Resus"] },
        { text: "Post-ROSC: 12-lead within 10 min, MAP ≥ 65 mmHg, SpO₂ 94–98 %, normocapnia, fever avoidance for 72 h", cites: ["Resuscitation Council UK 2021"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="ecg-approach" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["FFICM 2.4"]}>
            <CollapsibleSubsection title="A Systematic ECG Approach in the ICU" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              ICU patients accumulate dozens of ECGs — most reviewed in seconds. A reproducible
              sequence catches the dangerous findings (ischaemia, electrolyte disturbance, drug
              toxicity, arrhythmia) before the haemodynamic collapse. Apply the same eight steps
              to every strip and full 12-lead.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { step: "1. Rate", detail: "300 / number of large squares between R waves (regular). Or count complexes in a 6 s strip × 10 (irregular). Brady < 60, tachy > 100." },
                { step: "2. Rhythm", detail: "Regular vs irregular vs irregularly irregular. Identify the underlying pacemaker (sinus, atrial, junctional, ventricular)." },
                { step: "3. P waves", detail: "Present? Uniform? One per QRS? Inverted (junctional / retrograde)? Sawtooth (flutter)? Absent / fibrillatory (AF)?" },
                { step: "4. PR interval", detail: "Normal 120–200 ms. Long → 1°/2° AV block. Short + delta wave → WPW." },
                { step: "5. QRS", detail: "Width (narrow ≤ 120 ms vs wide > 120 ms), morphology (RBBB/LBBB), axis. Wide QRS = ventricular origin OR aberrant supraventricular conduction." },
                { step: "6. ST/T", detail: "Elevation (STEMI, pericarditis, BER, LBBB), depression (ischaemia, posterior MI, digoxin), T inversion. Compare to old ECGs." },
                { step: "7. QT", detail: "Corrected QT (Bazett: QT/√RR). Prolonged > 500 ms = torsades risk. Drugs, ↓K⁺, ↓Mg²⁺, ↓Ca²⁺, congenital LQTS." },
                { step: "8. Compare", detail: "Always compare with a previous ECG. New changes are far more meaningful than absolute values in isolation." },
              ].map((s) => (
                <div key={s.step} className="p-3 rounded-lg border border-border bg-card">
                  <p className="font-semibold text-foreground text-sm">{s.step}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{s.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg border border-icu/30 bg-icu/5">
              <p className="text-sm font-semibold text-foreground mb-1">ICU red-flag patterns</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li><span className="font-medium text-foreground">Wide-complex tachycardia</span> — assume VT until proven otherwise (especially with structural heart disease).</li>
                <li><span className="font-medium text-foreground">New LBBB + chest pain or ROSC</span> — treat as STEMI equivalent; consider PPCI.</li>
                <li><span className="font-medium text-foreground">QTc &gt; 500 ms</span> — stop QT-prolonging drugs, replete K⁺ &gt; 4.5 and Mg²⁺ &gt; 1.0 mmol/L.</li>
                <li><span className="font-medium text-foreground">Peaked T waves + wide QRS</span> — hyperkalaemia, give 10 mL 10 % calcium gluconate <em>now</em>.</li>
                <li><span className="font-medium text-foreground">U waves + flat T + long QU</span> — hypokalaemia → torsades risk.</li>
              </ul>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="12-lead" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["FFICM 2.4"]}>
            <CollapsibleSubsection title="12-Lead Schematic & Coronary Territories">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Each lead "looks at" a region of the LV supplied by a specific coronary artery. Click a
              territory or a lead to see how ST changes localise the culprit vessel — vital for ROSC,
              STEMI activation, and post-thrombolysis ECGs.
            </p>
            <CoronarySelectionProvider initial="anterior">
              <ExpandableEcgCard content={twelveLeadContent}>
                {() => (
                  <>
                    <TwelveLeadEcgDiagram />
                    <StemiLocalisationDiagram />
                  </>
                )}
              </ExpandableEcgCard>
            </CoronarySelectionProvider>
            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Reciprocal change is your friend</p>
                <p className="text-xs text-muted-foreground mt-1">Inferior STEMI (II, III, aVF) often shows ST depression in I/aVL. Posterior STEMI shows tall R + ST depression in V1–V3 — confirm with V7–V9.</p>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Right-sided leads</p>
                <p className="text-xs text-muted-foreground mt-1">Inferior STEMI: always do V4R. ST elevation = RV infarct → preload-dependent → cautious nitrates, fluid load, avoid β-blockers.</p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="wellens" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Wellens Syndrome">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Wellens syndrome is a pre-infarction ECG pattern caused by a critical proximal LAD
              stenosis. The classic trap is that the patient is <span className="font-medium text-foreground">pain-free</span> at the time of the ECG, the
              <span className="font-medium text-foreground"> ST segment is isoelectric</span>, and the <span className="font-medium text-foreground">troponin is often normal</span> — yet without
              angiography they are at very high risk of an extensive anterior MI within days. Pattern A (biphasic T, ~25%) and pattern B (deep symmetric T inversion, ~75%) in V2–V3.
            </p>
            <ExpandableEcgCard content={wellensContent}>
              {() => <WellensSyndromeDiagram />}
            </ExpandableEcgCard>
            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              <div className="p-3 rounded-lg border border-icu/30 bg-icu/5">
                <p className="font-semibold text-foreground text-sm">de Zwaan diagnostic criteria</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-0.5 leading-snug">
                  <li>· Recent angina, now resolved</li>
                  <li>· Biphasic or deeply inverted T in V2–V3 (± V1, V4)</li>
                  <li>· Isoelectric or minimally elevated ST (&lt; 1 mm)</li>
                  <li>· Preserved precordial R waves, no Q waves</li>
                  <li>· Normal or only minimally elevated troponin</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Pseudonormalisation pitfall</p>
                <p className="text-xs text-muted-foreground mt-1 leading-snug">
                  Wellens T waves can transiently revert to upright when chest pain returns —
                  this represents <em>active re-occlusion</em> of the LAD, not improvement.
                </p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CardiacConductionDiagram />
          </ExamSection>

          <ExamSection id="bradys" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Bradyarrhythmias">
            <p className="text-muted-foreground leading-relaxed mb-3">
              In ICU, bradycardia is rarely "physiological". Look for <span className="font-medium text-foreground">drugs</span> (β-blockers,
              digoxin, dexmedetomidine, opioids, amiodarone), <span className="font-medium text-foreground">ischaemia</span> (inferior MI affects
              the SA/AV nodal supply via RCA), <span className="font-medium text-foreground">electrolytes</span> (hyperkalaemia, hypothermia),
              <span className="font-medium text-foreground"> raised ICP</span> (Cushing's reflex), and <span className="font-medium text-foreground">hypoxia/vagal</span> stimulation.
            </p>
            <ExpandableEcgCard content={bradyContent}>
              {() => <BradyarrhythmiaDiagram />}
            </ExpandableEcgCard>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="heart-block" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Heart Block">
            <p className="text-muted-foreground leading-relaxed mb-3">
              The site of block predicts both the escape rhythm and the device choice. Nodal blocks
              (1°, Mobitz I) usually have a junctional escape and tolerate observation. Infranodal
              blocks (Mobitz II, complete) drop to a slow ventricular escape — early temporary pacing
              and definitive PPM.
            </p>
            <ExpandableEcgCard content={heartBlockContent}>
              {() => <HeartBlockDiagram />}
            </ExpandableEcgCard>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="bbb" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Bundle Branch & Fascicular Block">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Recognising bundle branch block matters in ICU because it complicates STEMI diagnosis
              (Sgarbossa criteria for new LBBB), masks underlying ischaemia, and warns of progression
              to complete heart block (e.g. bifascicular + 1° = trifascicular block — pace early).
            </p>
            <ExpandableEcgCard content={bbbContent}>
              {() => <BundleBranchBlockDiagram />}
            </ExpandableEcgCard>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="tachys" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Tachyarrhythmias">
            <p className="text-muted-foreground leading-relaxed mb-3">
              The key bedside split: <span className="font-medium text-foreground">narrow vs wide</span>, then
              <span className="font-medium text-foreground"> regular vs irregular</span>. New-onset AF affects up to a third of ventilated
              septic patients and is often the first sign of evolving shock, fluid overload, or
              electrolyte derangement — treat the cause before reaching for amiodarone.
            </p>
            <ExpandableEcgCard content={tachyContent}>
              {() => <TachyarrhythmiaDiagram />}
            </ExpandableEcgCard>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="peri-arrest" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["RCUK 2021"]}>
            <CollapsibleSubsection title="Peri-arrest Algorithms (RCUK 2021)">
            <div className="grid md:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground text-sm mb-2">Tachycardia algorithm</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>1. <span className="font-medium text-foreground">Adverse features?</span> Shock · Syncope · Myocardial ischaemia · Heart failure → <span className="font-medium text-foreground">synchronised DCCV ×3</span> (sedate / GA), then amiodarone 300 mg over 10–20 min and re-shock.</li>
                  <li>2. Stable + <span className="font-medium text-foreground">narrow regular</span>: vagal manoeuvres → adenosine 6 → 12 → 18 mg.</li>
                  <li>3. Stable + <span className="font-medium text-foreground">narrow irregular</span>: probable AF → rate control (β-blocker / diltiazem; amiodarone if HF) ± anticoagulate.</li>
                  <li>4. Stable + <span className="font-medium text-foreground">wide regular</span>: assume VT → amiodarone 300 mg IV over 20–60 min.</li>
                  <li>5. Stable + <span className="font-medium text-foreground">wide irregular</span>: AF + BBB, polymorphic VT (Mg²⁺), pre-excited AF (DCCV — avoid AV nodal blockers).</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground text-sm mb-2">Bradycardia algorithm</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>1. <span className="font-medium text-foreground">Adverse features?</span> (as above) → <span className="font-medium text-foreground">atropine 500 mcg IV</span>, repeat to 3 mg.</li>
                  <li>2. Risk factors for asystole: recent asystole, Mobitz II, complete block with broad QRS, ventricular pause &gt; 3 s.</li>
                  <li>3. Interim: <span className="font-medium text-foreground">isoprenaline 5 µg/min</span>, <span className="font-medium text-foreground">adrenaline 2–10 µg/min</span>, <span className="font-medium text-foreground">glucagon</span> for β-blocker / CCB toxicity.</li>
                  <li>4. <span className="font-medium text-foreground">Transcutaneous pacing</span> as a bridge — sedate; capture is mechanical (palpate pulse), not just electrical.</li>
                  <li>5. Definitive: <span className="font-medium text-foreground">transvenous pacing wire</span> ± permanent device.</li>
                </ul>
              </div>
              <div className="md:col-span-2 p-4 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground text-sm mb-2">Cardiac arrest — shockable rhythms (VF / pulseless VT)</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Defibrillate immediately — biphasic 120–150 J first shock (manufacturer-specific), then 150–200 J.</li>
                  <li>• 2 min CPR (30:2 if no advanced airway; continuous if intubated). Minimise hands-off time.</li>
                  <li>• Adrenaline 1 mg IV after the 3rd shock, then every 3–5 min. Amiodarone 300 mg after the 3rd shock; further 150 mg after the 5th.</li>
                  <li>• Search for the <span className="font-medium text-foreground">4 Hs and 4 Ts</span>: Hypoxia, Hypovolaemia, Hyper/hypokalaemia &amp; metabolic, Hypothermia · Tension pneumothorax, Tamponade, Toxins, Thrombosis.</li>
                  <li>• <span className="font-medium text-foreground">eFAST + arterial line + ETCO₂</span> during CPR: ETCO₂ &lt; 10 mmHg suggests poor compressions or futility; sudden ↑ ETCO₂ heralds ROSC.</li>
                </ul>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="electrolytes" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Electrolyte & Drug-Induced Arrhythmias">
            <div className="space-y-2">
              {[
                { label: "Hyperkalaemia (K⁺ > 6.0)", ecg: "Peaked T → loss of P → wide QRS → sine-wave → VF/asystole.", treatment: "10 mL 10 % calcium gluconate IV (membrane stabilisation), insulin–dextrose, salbutamol nebs, sodium bicarbonate (if acidotic), definitive removal (RRT)." },
                { label: "Hypokalaemia (K⁺ < 3.5)", ecg: "Flat / inverted T, prominent U wave, prolonged QU, ST depression.", treatment: "Replace cautiously (max 20 mmol/h peripherally, 40 mmol/h centrally with monitoring). Always replace Mg²⁺ alongside." },
                { label: "Hypomagnesaemia (Mg²⁺ < 0.7)", ecg: "Prolonged QT, torsades de pointes, refractory hypoK⁺.", treatment: "2 g IV Mg²⁺ over 10 min for torsades, then infusion." },
                { label: "Hypocalcaemia (iCa²⁺ < 1.0)", ecg: "Prolonged QT (long ST segment), neuromuscular irritability.", treatment: "10 mL 10 % calcium gluconate IV (peripheral) or 10 mL 10 % calcium chloride centrally." },
                { label: "Digoxin toxicity", ecg: "Reverse-tick ST depression, frequent VEs, slow AF, atrial tachycardia with block, bidirectional VT.", treatment: "Correct K⁺, avoid DC shock if possible, Digibind for haemodynamic compromise." },
                { label: "Tricyclic / Na⁺-channel blocker overdose", ecg: "Wide QRS, R wave in aVR > 3 mm, terminal R aVR, sinus tachycardia, VT.", treatment: "Sodium bicarbonate 1–2 mmol/kg IV bolus until QRS narrows and pH 7.45–7.55." },
                { label: "Local anaesthetic systemic toxicity (LAST)", ecg: "Widening QRS, bradycardia, asystole, refractory VT/VF.", treatment: "Stop injection, 100 % O₂, 20 % Intralipid 1.5 mL/kg bolus then 0.25 mL/kg/min infusion, prolonged CPR." },
              ].map((e) => (
                <div key={e.label} className="p-3 rounded-lg border border-border bg-card">
                  <p className="font-semibold text-foreground text-sm">{e.label}</p>
                  <p className="text-xs text-muted-foreground mt-1"><span className="font-medium text-foreground">ECG:</span> {e.ecg}</p>
                  <p className="text-xs text-muted-foreground mt-0.5"><span className="font-medium text-foreground">Treatment:</span> {e.treatment}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="pacing-devices" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}>
            <CollapsibleSubsection title="Pacing & Defibrillator Devices in the ICU">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Recognise device, mode, and the patient's degree of pacing dependence on every ICU
              admission. For any ICU patient with a CIED: interrogate, document the magnet response,
              and have transcutaneous pacing pads on before procedures involving diathermy or
              defibrillation.
            </p>
            <PacingDevicesDiagram />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="post-arrest" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["FFICM 2.5"]}>
            <CollapsibleSubsection title="Post-cardiac-arrest Care & ECG Surveillance">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Immediate post-ROSC</p>
                <p className="text-xs text-muted-foreground mt-1">12-lead within 10 min. STEMI / new LBBB → urgent PPCI. Aim SpO₂ 94–98 %, normocapnia (PaCO₂ 4.5–6.0 kPa), MAP ≥ 65 mmHg.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Targeted temperature management</p>
                <p className="text-xs text-muted-foreground mt-1">TTM2 trial: target 33–36 °C vs strict normothermia &lt; 37.7 °C; avoid fever for 72 h.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Recurrent arrhythmia prevention</p>
                <p className="text-xs text-muted-foreground mt-1">Replace K⁺ to 4.5 mmol/L, Mg²⁺ &gt; 1.0 mmol/L. Continue / start β-blocker. Amiodarone infusion for refractory VT/VF.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">ICD considerations</p>
                <p className="text-xs text-muted-foreground mt-1">Survivors of VF/VT arrest without reversible cause meet secondary-prevention ICD criteria. Liaise with cardiology before discharge from ICU.</p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "Systematic ECG: rate, rhythm, axis, P-QRS-T morphology, intervals (PR <200, QRS <120, QTc <440 M / 460 F).",
              "Narrow-complex tachy: vagal manoeuvres, adenosine 6→12→12 mg; AF/flutter — rate vs rhythm control + anticoagulation.",
              "Broad-complex tachy: assume VT until proven otherwise; if unstable → synchronised DC shock.",
              "Bradyarrhythmia + adverse signs: atropine 500 µg, escalating to transcutaneous pacing, isoprenaline or adrenaline infusion.",
              "Long QT predisposes to torsades — withdraw culprits, correct K⁺/Mg²⁺/Ca²⁺, IV magnesium 2 g, overdrive pacing if persistent.",
            ]}
          />
        </>
      }
    />
  );
};

export default ArrhythmiasEcgIcuTopic;
