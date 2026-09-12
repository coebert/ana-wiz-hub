import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { arrhythmiasEcgIcuQuestions } from "@/data/quizzes";
import CardiacConductionDiagram from "@/components/diagrams/intensive-care/CardiacConductionDiagram";
import HeartBlockDiagram from "@/components/diagrams/intensive-care/HeartBlockDiagram";
import BundleBranchBlockDiagram from "@/components/diagrams/intensive-care/BundleBranchBlockDiagram";
import TachyarrhythmiaDiagram from "@/components/diagrams/intensive-care/TachyarrhythmiaDiagram";
import BradyarrhythmiaDiagram from "@/components/diagrams/intensive-care/BradyarrhythmiaDiagram";
import PacingDevicesDiagram from "@/components/diagrams/intensive-care/PacingDevicesDiagram";
import TwelveLeadEcgDiagram from "@/components/diagrams/intensive-care/TwelveLeadEcgDiagram";
import StemiLocalisationDiagram from "@/components/diagrams/intensive-care/StemiLocalisationDiagram";
import { CoronarySelectionProvider } from "@/components/diagrams/intensive-care/coronarySelectionContext";
import ExpandableEcgCard from "@/components/diagrams/intensive-care/ExpandableEcgCard";
import WellensSyndromeDiagram from "@/components/diagrams/intensive-care/WellensSyndromeDiagram";
import {
  bradyContent,
  heartBlockContent,
  bbbContent,
  tachyContent,
  twelveLeadContent,
  wellensContent,
} from "@/components/diagrams/ecgExpandedContent";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";

const arrhythmiasEcgIcuFaqs: Array<[string, string]> = [
  ["How is new-onset AF in critical illness managed?", "Treat underlying sepsis/electrolytes; rate control with β-blocker (esmolol/metoprolol) or amiodarone if heart failure; DC cardioversion if haemodynamically unstable; anticoagulate per CHA₂DS₂-VASc balanced against bleeding risk."],
  ["What is the initial management of polymorphic VT (torsades)?", "IV magnesium 2 g, correct K⁺ and Ca²⁺, stop QT-prolonging drugs, overdrive pacing or isoprenaline if bradycardia-dependent; DC shock if unstable."],
  ["How are wide-complex tachycardias approached when the diagnosis is uncertain?", "Assume VT until proven otherwise — particularly with structural heart disease; treat with synchronised DC if unstable, amiodarone 300 mg IV if stable, avoid verapamil which can collapse VT into VF."],
];

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
      sectionSources={{
        objectives: [
          "Resuscitation Council UK 2021",
          "ERC/ESICM 2021 Post-Resus",
          "ESC AF 2020",
          "BJA Educ 2018",
          "TTM2 2021",
          "ACC/AHA/HRS 2017",
        ],
        keyPoints: [
          "Resuscitation Council UK 2021",
          "ERC/ESICM 2021 Post-Resus",
          "ESC AF 2020",
          "BJA Educ 2018",
          "TTM2 2021",
          "ACC/AHA/HRS 2017",
        ],
        workedExamples: ["BJA Educ 2018", "ESC AF 2020"],
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
            <CollapsibleSubsection title="Diagnosing MI in LBBB: Sgarbossa criteria">
            <p className="text-muted-foreground leading-relaxed mb-3">
              LBBB produces its own secondary ST/T abnormalities (discordant ST elevation/depression
              opposite to QRS direction), which masks the typical ST-elevation pattern of acute MI.
              The original Sgarbossa criteria <InlineRef topicId="arrhythmias-ecg-icu" refLabel="Sgarbossa 1996" /> use a weighted score:
            </p>
            <div className="grid sm:grid-cols-3 gap-3 mb-3">
              <div className="p-3 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground text-sm">Concordant ST elevation ≥ 1 mm</p>
                <p className="text-xs text-muted-foreground mt-1">In any lead, same direction as QRS — 5 points.</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground text-sm">Concordant ST depression ≥ 1 mm</p>
                <p className="text-xs text-muted-foreground mt-1">In V1–V3 — 3 points.</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground text-sm">Excessive discordant ST elevation</p>
                <p className="text-xs text-muted-foreground mt-1">≥ 5 mm, in leads with a negative QRS — 2 points.</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-3">
              A score ≥ 3 is highly specific for acute MI but poorly sensitive — a low score does not
              exclude infarction. The <span className="font-medium text-foreground">Smith-modified (Sgarbossa) criteria</span>
              {" "}<InlineRef topicId="arrhythmias-ecg-icu" refLabel="Smith 2012 (Modified Sgarbossa)" /> replace the fixed 5 mm discordant
              ST-elevation threshold with a <span className="font-medium text-foreground">proportional ratio of ST-elevation to S-wave depth ≥ 0.25 (25 %)</span>
              in the most discordant lead, substantially improving sensitivity while retaining specificity.
              The same logic applies to <span className="font-medium text-foreground">ventricular-paced rhythms</span>, which produce an
              analogous discordant pattern. In practice: new LBBB (or a new pacing pattern) with ongoing
              ischaemic symptoms, haemodynamic instability, or in the post-ROSC patient should still prompt
              urgent PPCI discussion regardless of the calculated score.
            </p>
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
            <CollapsibleSubsection title="Atrial fibrillation in the ICU">
            <p className="text-muted-foreground leading-relaxed mb-3">
              New-onset AF is common in critical illness and is usually a marker of an underlying
              trigger rather than a primary cardiac problem: sepsis, hypovolaemia or fluid overload,
              electrolyte derangement (K⁺, Mg²⁺), catecholamine infusions, hypoxia, pain, PE, and
              post-cardiac-surgery inflammation <InlineRef topicId="arrhythmias-ecg-icu" refLabel="ESC AF 2020" />. Treat the precipitant first — rhythm often
              settles once the trigger is corrected.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <div className="p-3 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground text-sm">Rate vs rhythm control</p>
                <p className="text-xs text-muted-foreground mt-1">Rate control is first-line unless the patient is haemodynamically unstable or new-onset AF is itself driving the shock state, in which case synchronised DCCV is indicated <InlineRef topicId="arrhythmias-ecg-icu" refLabel="BJA Educ 2018" />.</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground text-sm">Electrolyte replacement</p>
                <p className="text-xs text-muted-foreground mt-1">Replace K⁺ to &gt; 4.0 mmol/L and Mg²⁺ to &gt; 1.0 mmol/L before/alongside rate-control drugs — correction alone can restore sinus rhythm.</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-card md:col-span-2">
                <p className="font-semibold text-foreground text-sm">Rate-control drug choice</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  <li>• <span className="font-medium text-foreground">Esmolol / metoprolol</span> — first choice in most; caution in shock or reduced LVEF (negative inotropy).</li>
                  <li>• <span className="font-medium text-foreground">Diltiazem</span> — effective but avoid in LV dysfunction/heart failure.</li>
                  <li>• <span className="font-medium text-foreground">Amiodarone</span> — 300 mg IV over 20–60 min then 900 mg/24 h infusion; preferred agent in heart failure or when β-blockers/calcium-channel blockers are contraindicated.</li>
                  <li>• <span className="font-medium text-foreground">Digoxin</span> — 500 µg IV loading (repeat to max ~1 mg/24 h); useful in heart failure or hypotension where other agents are relatively contraindicated, but slow onset and unreliable rate control in high sympathetic tone (sepsis, catecholamines).</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg border border-border bg-card md:col-span-2">
                <p className="font-semibold text-foreground text-sm">Rhythm control and anticoagulation</p>
                <p className="text-xs text-muted-foreground mt-1">Rhythm control with amiodarone or synchronised DCCV if rate control fails or instability persists. Thromboprophylaxis is guided by CHA₂DS₂-VASc, balanced against ICU-specific bleeding risk (indwelling lines, recent procedures, coagulopathy, thrombocytopenia); timing of anticoagulation should be individualised. New-onset AF in critical illness frequently recurs after ICU discharge and warrants outpatient cardiology follow-up.</p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="peri-arrest" exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]} curriculumCodes={["RCUK 2021"]}>
            <CollapsibleSubsection title="Peri-arrest Algorithms (RCUK 2021)">
            <div className="grid md:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground text-sm mb-2">Tachycardia algorithm</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>1. <span className="font-medium text-foreground">Adverse features?</span> Shock · Syncope · Myocardial ischaemia · Heart failure → <span className="font-medium text-foreground">synchronised DCCV ×3</span> (sedate / GA), then amiodarone 300 mg over 10–20 min and re-shock.</li>
                  <li>2. Stable + <span className="font-medium text-foreground">narrow regular</span>: vagal manoeuvres → adenosine 6 mg, then 12 mg, then a further 12 mg if required (not 18 mg — the 2021 RCUK adult tachycardia algorithm caps escalation at 12 mg for the third dose) <InlineRef topicId="arrhythmias-ecg-icu" refLabel="RCUK 2021 Tachycardia" />.</li>
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
            <CollapsibleSubsection title="Managing arrhythmias in patients with CIEDs">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Initial assessment: identify the device and manufacturer (device card, chest X-ray
              silhouette, ID app), interrogate to determine mode and battery/lead status, and establish
              whether the patient is <span className="font-medium text-foreground">pacing-dependent</span> and what their underlying
              rhythm is <InlineRef topicId="arrhythmias-ecg-icu" refLabel="ASA CIED Advisory 2020" />.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-3">
              <div className="p-3 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground text-sm">Magnet response</p>
                <p className="text-xs text-muted-foreground mt-1">Pacemaker: switches to fixed-rate asynchronous pacing (typically 70–100 bpm, manufacturer-specific) — useful to unmask the underlying rhythm or terminate pacemaker-mediated tachycardia, but removes sensing, risking R-on-T/VF if a paced beat lands on a native T wave in a pacing-dependent patient. ICD: a magnet suspends tachytherapies (antitachycardia pacing and shocks) but does not change the pacing mode/rate.</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground text-sm">AF with a CIED</p>
                <p className="text-xs text-muted-foreground mt-1">Watch for rapid ventricular pacing or inappropriate atrial tracking (dual-chamber devices tracking fibrillatory activity); mode-switch algorithms should engage automatically. In CRT devices, loss of biventricular capture from AF/frequent ectopy reduces resynchronisation benefit and can precipitate decompensation.</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground text-sm">VT in a patient with an ICD</p>
                <p className="text-xs text-muted-foreground mt-1">Distinguish appropriate shocks (true VT/VF) from inappropriate shocks (SVT with rapid conduction, lead fracture, oversensing). VT storm: β-blockade, IV amiodarone, sedation, and treat ischaemia/electrolytes; consider transiently deactivating tachytherapies (with external pacing/defibrillation pads applied and continuous monitoring) if shocks are frequent and non-terminating.</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground text-sm">External defibrillation with a CIED</p>
                <p className="text-xs text-muted-foreground mt-1">If ICD therapies fail or the device is deactivated, defibrillate externally with pads placed ≥ 8 cm from the generator (anterior–posterior preferred) to reduce the risk of device damage <InlineRef topicId="arrhythmias-ecg-icu" refLabel="ACC/AHA/HRS 2017" />.</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-card md:col-span-2">
                <p className="font-semibold text-foreground text-sm">Peri-procedural management</p>
                <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                  <li>• Pre-op device interrogation; disable tachytherapies (ICD) or apply a magnet for the duration of surgery involving diathermy.</li>
                  <li>• Use bipolar diathermy where possible; if monopolar is required, keep the current path away from the device and use short bursts.</li>
                  <li>• Continuous ECG monitoring with external pacing/defibrillation pads applied and a plan for asynchronous pacing if inhibition occurs in a pacing-dependent patient.</li>
                  <li>• Post-op re-interrogation and reprogramming to restore tachytherapies and normal pacing mode before the patient leaves a monitored area.</li>
                </ul>
              </div>
            </div>
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
              "Narrow-complex tachy: vagal manoeuvres, adenosine 6 mg, then 12 mg, then a further 12 mg if required; AF/flutter — rate vs rhythm control + anticoagulation.",
              "Broad-complex tachy: assume VT until proven otherwise; if unstable → synchronised DC shock.",
              "Bradyarrhythmia + adverse signs: atropine 500 µg, escalating to transcutaneous pacing, isoprenaline or adrenaline infusion.",
              "Long QT predisposes to torsades — withdraw culprits, correct K⁺/Mg²⁺/Ca²⁺, IV magnesium 2 g, overdrive pacing if persistent.",
            ]}
          />
        </>
          <TopicFaqs faqs={arrhythmiasEcgIcuFaqs} />
        </>
      }
    />
  );
};

export default ArrhythmiasEcgIcuTopic;
