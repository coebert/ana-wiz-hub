import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { WiggersDiagram } from "@/components/diagrams/WiggersDiagram";
import PVLoopDiagram from "@/components/diagrams/PVLoopDiagram";
import FrankStarlingDiagram from "@/components/diagrams/FrankStarlingDiagram";
import CardiacActionPotentialDiagram from "@/components/diagrams/CardiacActionPotentialDiagram";
import AorticDicroticNotchDiagram from "@/components/diagrams/AorticDicroticNotchDiagram";
import DichroticNotchComparisonPanel from "@/components/diagrams/DichroticNotchComparisonPanel";
import { cardiacCycleQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

const objectives = [
  "Describe the seven phases of the cardiac cycle and correlate them with the Wiggers diagram and PV loop.",
  "State normal pressures, volumes, and the determinants of stroke volume and cardiac output.",
  "Interpret atrial pressure (a, c, v) waves and CVP/JVP descents in health and pathology.",
  "Explain the relationship between the cardiac cycle and coronary perfusion, particularly under tachycardia and hypertrophy.",
  "Apply cardiac cycle physiology to valvular lesions, tamponade, RV failure, and diastolic dysfunction.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Coronary perfusion in severe aortic stenosis",
    scenario: (
      <>
        A 78-year-old with severe AS (peak gradient 80 mmHg, AVA 0.7 cm², LVH) develops chest pain when HR
        rises from 70 to 110 in recovery. Aortic DBP is 70 mmHg; estimated LVEDP is 25 mmHg. Estimate his
        coronary perfusion pressure and explain why tachycardia is dangerous in this patient.
      </>
    ),
    working: (
      <>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>CPP = aortic DBP − LVEDP</strong> = 70 − 25 = <strong>45 mmHg</strong> (normal &gt;60).</li>
          <li>
            LVH ↑ intramural pressure → squeezes intramyocardial vessels in systole; subendocardium perfuses
            <strong> only in diastole</strong>.
          </li>
          <li>
            HR 70 → diastole ~560 ms; HR 110 → diastole ~370 ms (a 35% reduction in perfusion time, while
            myocardial O₂ demand has risen).
          </li>
          <li>O₂ supply ↓ (shorter diastole, low CPP) and demand ↑ (HR, wall tension) → subendocardial ischaemia.</li>
        </ul>
      </>
    ),
    answer: (
      <>
        Restore HR to ~70 (esmolol or phenylephrine to slow reflex tachycardia), maintain SVR (phenylephrine,
        not vasodilators), preserve sinus rhythm and preload — the classic AS quartet of "slow, sinus, full,
        tight". Avoid spinal anaesthesia or sudden vasodilation.
      </>
    ),
  },
  {
    title: "Reading a CVP trace — cannon a waves",
    scenario: (
      <>
        A post-op cardiac patient has irregular cannon a waves visible on the CVP trace. ECG shows a wide
        complex regular tachycardia at 150 bpm with no clear p-waves. What does the CVP tell you, and what
        is the diagnosis?
      </>
    ),
    working: (
      <>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Cannon a waves</strong> = atrial contraction against a closed tricuspid valve —
            occurs when atrial and ventricular systole coincide (AV dissociation).
          </li>
          <li>
            <strong>Irregular</strong> cannon waves = intermittent dissociation → ventricular tachycardia
            (AV dissociation present in ~50% of beats; ECG shows dissociated p-waves marching through).
          </li>
          <li>Regular cannon waves = junctional rhythm or complete heart block (consistent dissociation every beat).</li>
        </ul>
      </>
    ),
    answer: (
      <>
        Wide-complex tachycardia + irregular cannon a waves = <strong>ventricular tachycardia</strong>
        (until proven otherwise). Treat per ALS: sync DC cardioversion if unstable; amiodarone 300 mg if
        stable. The CVP waveform is a powerful bedside diagnostic tool when capture isn't on monitor printout.
      </>
    ),
  },
];

const CardiacCycleTopic = () => {
  return (
    <TopicTemplate
      title="The Cardiac Cycle"
      subtitle="FRCA Primary — Physiology"
      backPath="/physiology"
      backLabel="Physiology"
      accentColor="text-physiology"
      topicId="cardiac-cycle"
      topicTitle="The Cardiac Cycle"
      quizQuestions={cardiacCycleQuiz}
      objectives={objectives}
      workedExamples={workedExamples}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["CR_BK_01"] },
        diagrams: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["CR_BK_01", "OA_BK_05"] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["Power & Kam Ch.4", "Ganong Ch.30"],
        workedExamples: ["BJA Educ 2018", "BJA Educ 2018"],
        keyPoints: ["Power & Kam Ch.4", "BJA Educ 2018"],
      }}
      diagrams={
        <>
          <div className="bg-card rounded-xl border border-border p-4 md:p-6">
            <h3 className="text-base font-semibold text-foreground mb-3">Wiggers Diagram</h3>
            <WiggersDiagram />
          </div>
          <div className="bg-card rounded-xl border border-border p-4 md:p-6">
            <h3 className="text-base font-semibold text-foreground mb-3">Aortic Pressure & the Dichrotic Notch</h3>
            <AorticDicroticNotchDiagram />
          </div>
          <div className="bg-card rounded-xl border border-border p-4 md:p-6">
            <h3 className="text-base font-semibold text-foreground mb-1">Notch Morphology Across Pathologies</h3>
            <p className="text-xs text-muted-foreground mb-4">
              How the dichrotic notch shifts in aortic regurgitation, aortic stenosis, sepsis, and aging arteries — versus the normal reference waveform.
            </p>
            <DichroticNotchComparisonPanel />
          </div>
          <div className="bg-card rounded-xl border border-border p-4 md:p-6">
            <h3 className="text-base font-semibold text-foreground mb-3">Pressure–Volume Loop</h3>
            <PVLoopDiagram />
          </div>
          <div className="bg-card rounded-xl border border-border p-4 md:p-6">
            <h3 className="text-base font-semibold text-foreground mb-3">Frank–Starling Curve</h3>
            <FrankStarlingDiagram />
          </div>
          <div className="bg-card rounded-xl border border-border p-4 md:p-6">
            <h3 className="text-base font-semibold text-foreground mb-3">Cardiac Action Potential</h3>
            <CardiacActionPotentialDiagram />
          </div>
        </>
      }
      keyPoints={[
        "Cardiac cycle = systole (~300 ms) + diastole (~560 ms) at HR 70; diastole shortens disproportionately with tachycardia.",
        "S1 = AV valve closure (start of systole); S2 = semilunar valve closure (end of systole) with dicrotic notch; S3/S4 reflect filling pathology.",
        "Isovolumetric contraction and relaxation: all valves closed; pressure changes without volume change.",
        "Passive filling contributes 70–80% of LVEDV; atrial kick adds 15–25% — critical in stiff ventricles (AS, HCM, diastolic dysfunction).",
        "SV determinants: preload, afterload, contractility; CO = HR × SV; rhythm contributes via AV synchrony.",
        "LA/CVP trace: a (atrial contraction), c (AV bulge), v (atrial filling), x and y descents — interpret abnormalities at the bedside.",
        "Cannon a = AV dissociation; giant a = TS/PHT; giant v = MR/TR; steep y = constriction; blunted y = tamponade.",
        "Left coronary perfusion is diastolic — CPP ≈ aortic DBP − LVEDP; protect with rate control, adequate DBP, low LVEDP.",
        "Right heart operates at low pressure; RV is afterload-sensitive — small ↑PVR markedly reduces RV SV (PE, hypoxia, acidosis).",
        "Valvular lesions each have characteristic loop and waveform changes that drive specific anaesthetic targets (HR, SVR, preload, rhythm).",
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["CR_BK_01"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction & Curriculum Scope</h2>
            <p className="text-foreground/90 leading-relaxed">
              The cardiac cycle encompasses all electrical and mechanical events from the beginning of one
              heartbeat to the beginning of the next. It comprises <strong>systole</strong> (isovolumetric
              contraction + ejection) and <strong>diastole</strong> (isovolumetric relaxation + filling). At
              a heart rate of 70 bpm, the cycle lasts ~860 ms (systole ~300 ms, diastole ~560 ms). As heart
              rate rises, diastole shortens disproportionately, compromising filling and coronary perfusion.
            </p>
          </ExamSection>

          <ExamSection id="reference-values" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["CR_BK_01"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Normal Pressure & Volume Reference</h2>
            <p className="text-foreground/90 leading-relaxed mb-3">
              Approximate adult resting values you should be able to quote in the viva.
            </p>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left p-2 font-semibold">Chamber / Vessel</th>
                    <th className="text-left p-2 font-semibold">Systolic (mmHg)</th>
                    <th className="text-left p-2 font-semibold">Diastolic / Mean (mmHg)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="p-2">Right atrium (CVP)</td><td className="p-2">—</td><td className="p-2">mean 2–6</td></tr>
                  <tr><td className="p-2">Right ventricle</td><td className="p-2">15–25</td><td className="p-2">0–8</td></tr>
                  <tr><td className="p-2">Pulmonary artery</td><td className="p-2">15–25</td><td className="p-2">8–15 (mean 10–20)</td></tr>
                  <tr><td className="p-2">PCWP / LA</td><td className="p-2">—</td><td className="p-2">mean 6–12</td></tr>
                  <tr><td className="p-2">Left ventricle</td><td className="p-2">100–140</td><td className="p-2">3–12 (LVEDP)</td></tr>
                  <tr><td className="p-2">Aorta</td><td className="p-2">100–140</td><td className="p-2">60–90 (mean 70–105)</td></tr>
                </tbody>
              </table>
            </div>
            <div className="grid md:grid-cols-3 gap-3 mt-4">
              <div className="rounded-lg border border-border p-3">
                <p className="text-xs font-semibold text-foreground">Volumes</p>
                <p className="text-xs text-foreground/80 mt-1">LVEDV ~120 mL · LVESV ~50 mL · SV ~70 mL · EF ~55–70%</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="text-xs font-semibold text-foreground">Output</p>
                <p className="text-xs text-foreground/80 mt-1">CO = HR × SV ≈ 5 L/min · CI 2.5–4 L/min/m²</p>
              </div>
              <div className="rounded-lg border border-border p-3">
                <p className="text-xs font-semibold text-foreground">Resistance</p>
                <p className="text-xs text-foreground/80 mt-1">SVR 800–1200 · PVR 50–150 dyn·s·cm⁻⁵</p>
              </div>
            </div>
          </ExamSection>

          <ExamSection id="phases" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_01"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Phases of the Cardiac Cycle</h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">1. Atrial Systole</h3>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  Corresponds to the P wave on ECG. Atrial contraction contributes the final 15–25% of
                  ventricular filling (the "atrial kick"). This becomes increasingly important at higher
                  heart rates when passive filling time is reduced. Loss of atrial systole (e.g., atrial
                  fibrillation) can reduce cardiac output by up to 25%.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">2. Isovolumetric Contraction</h3>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  Begins with mitral valve closure (S1) after the QRS complex triggers ventricular
                  depolarisation. All valves are closed; ventricular pressure rises rapidly with no change
                  in volume. LV pressure must exceed aortic diastolic pressure (~80 mmHg) before the aortic
                  valve opens. This phase lasts ~50 ms.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">3. Rapid Ejection</h3>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  The aortic valve opens when LV pressure exceeds aortic pressure. Approximately two-thirds
                  of the stroke volume is ejected during this phase. Peak LV and aortic pressures occur here
                  (~120 mmHg). Aortic flow velocity is maximal.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">4. Reduced Ejection</h3>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  Ventricular repolarisation occurs (T wave). Ejection rate decreases as the pressure
                  gradient across the aortic valve diminishes. The remaining one-third of stroke volume is
                  ejected. LV pressure begins to fall below aortic pressure, but momentum maintains forward
                  flow briefly.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">5. Isovolumetric Relaxation</h3>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  The aortic valve closes, producing S2 and the dicrotic notch on the aortic pressure trace.
                  All valves are again closed. LV pressure falls rapidly with no change in volume. When LV
                  pressure falls below LA pressure, the mitral valve opens and filling begins.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">6. Rapid Filling</h3>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  The mitral valve opens and blood flows rapidly from LA to LV down the pressure gradient.
                  This passive filling accounts for approximately 70–80% of ventricular filling. A third
                  heart sound (S3) may be heard at the end of this phase in young or pathological hearts.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">7. Diastasis (Reduced Filling)</h3>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  LA and LV pressures equilibrate; filling slows considerably. This phase is shortened at
                  high heart rates and is the first to be compromised with tachycardia, which is why
                  diastolic filling time is rate-dependent and why tachycardia reduces cardiac output in
                  patients with diastolic dysfunction.
                </p>
              </div>
            </div>
          </ExamSection>

          <ExamSection id="atrial-waves" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_01"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Left Atrial Pressure Waves</h2>
            <p className="text-foreground/90 leading-relaxed">
              The LA pressure trace shows three positive waves and two descents:
            </p>
            <ul className="mt-3 space-y-2 text-foreground/80">
              <li><strong>a wave</strong> — atrial contraction (absent in AF; giant in tricuspid stenosis)</li>
              <li><strong>c wave</strong> — bulging of the AV valve into the atrium during isovolumetric contraction</li>
              <li><strong>v wave</strong> — passive atrial filling while the AV valve is closed (giant in MR)</li>
              <li><strong>x descent</strong> — atrial relaxation and descent of the AV ring during ventricular systole</li>
              <li><strong>y descent</strong> — rapid emptying of the atrium when the AV valve opens</li>
            </ul>
          </ExamSection>

          <ExamSection id="heart-sounds" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_01"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Heart Sounds & Added Sounds</h2>
            <p className="text-foreground/90 leading-relaxed">
              <strong>S1</strong> is caused by closure of the mitral and tricuspid valves at the onset of
              ventricular systole. It is best heard at the apex. <strong>S2</strong> results from closure of
              the aortic and pulmonary valves at the end of systole. Physiological splitting of S2 occurs
              during inspiration when increased venous return delays pulmonary valve closure.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-foreground/80">
              <li><strong>S3</strong> — early diastolic, rapid filling against a stiff or volume-loaded ventricle (HF, MR; normal in young).</li>
              <li><strong>S4</strong> — late diastolic, atrial contraction into a non-compliant ventricle (LVH, AS, ischaemia); absent in AF.</li>
              <li><strong>Wide fixed split S2</strong> — ASD. <strong>Reversed split</strong> — LBBB, severe AS.</li>
              <li><strong>Opening snap</strong> — mitral stenosis. <strong>Ejection click</strong> — bicuspid AV / AS.</li>
            </ul>
          </ExamSection>

          <ExamSection id="right-heart" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["OA_BK_05"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Right Heart Cycle & Ventricular Interdependence</h2>
            <p className="text-foreground/90 leading-relaxed">
              The right ventricle (RV) follows the same sequence of phases but operates at much lower
              pressures. Key differences relevant to anaesthesia and intensive care:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-foreground/80">
              <li><strong>Lower pressure system</strong> — RV peak ~25 mmHg vs LV ~120 mmHg; thinner, crescentic geometry.</li>
              <li><strong>Earlier opening, later closure</strong> — pulmonary valve opens before aortic and closes after, producing physiological splitting of S2.</li>
              <li><strong>Continuous ejection profile</strong> — low PVR allows ejection throughout most of systole with minimal isovolumetric phase.</li>
              <li><strong>Afterload-sensitive</strong> — small rises in PVR (hypoxia, hypercapnia, acidosis, PE) markedly reduce RV stroke volume.</li>
              <li><strong>Ventricular interdependence</strong> — shared septum and pericardium mean RV dilation impairs LV filling (acute PE, RV infarct, tamponade).</li>
            </ul>
          </ExamSection>

          <ExamSection id="jvp-cvp" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["OA_BK_05"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">JVP / CVP Waveform (FFICM)</h2>
            <p className="text-foreground/90 leading-relaxed">
              The CVP trace reflects right atrial pressure and shares the same a, c, v wave structure as the
              LA trace but is directly visible at the bedside as the JVP. Recognising abnormal waves is an
              FFICM exam staple.
            </p>
            <div className="overflow-x-auto rounded-lg border border-border mt-3">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left p-2 font-semibold">Wave / descent</th>
                    <th className="text-left p-2 font-semibold">Mechanism</th>
                    <th className="text-left p-2 font-semibold">Pathological correlate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="p-2"><strong>a</strong></td><td className="p-2">Atrial contraction</td><td className="p-2">Absent in AF; large in TS, PHT, RVH; cannon in CHB / VT / junctional rhythm</td></tr>
                  <tr><td className="p-2"><strong>c</strong></td><td className="p-2">TV bulging into RA in early systole</td><td className="p-2">Rarely visible clinically</td></tr>
                  <tr><td className="p-2"><strong>x descent</strong></td><td className="p-2">Atrial relaxation + downward AV ring movement</td><td className="p-2">Prominent in tamponade & constrictive pericarditis</td></tr>
                  <tr><td className="p-2"><strong>v</strong></td><td className="p-2">Atrial filling against closed TV</td><td className="p-2">Giant in TR ("cv" or systolic wave)</td></tr>
                  <tr><td className="p-2"><strong>y descent</strong></td><td className="p-2">Rapid atrial emptying when TV opens</td><td className="p-2">Steep in constrictive pericarditis ("M/W"); blunted in tamponade</td></tr>
                </tbody>
              </table>
            </div>
          </ExamSection>

          <ExamSection id="coronary-perfusion" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["CR_BK_01", "OA_BK_05"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Coronary Perfusion & the Cycle</h2>
            <p className="text-foreground/90 leading-relaxed">
              <strong>Left coronary flow occurs predominantly in diastole</strong> because intramyocardial
              pressure during systole exceeds aortic pressure in the subendocardium. RV perfusion occurs
              throughout the cycle because RV intramural pressure is low.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-foreground/80">
              <li>Coronary Perfusion Pressure (CPP) ≈ <strong>Aortic Diastolic Pressure − LVEDP</strong>.</li>
              <li>Tachycardia shortens diastole more than systole → reduced subendocardial perfusion (rate control in AS, IHD).</li>
              <li>Aortic regurgitation and severe hypotension lower diastolic pressure and CPP.</li>
              <li>LV hypertrophy raises LVEDP and intramural pressure, predisposing to subendocardial ischaemia.</li>
            </ul>
          </ExamSection>

          <ExamSection id="sv-determinants" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_01"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Determinants of Stroke Volume & Cardiac Output</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">Preload</h3>
                <p className="text-sm text-foreground/80 mt-1">
                  LVEDV — determined by venous return, atrial contraction, ventricular compliance,
                  intrathoracic pressure and cycle length. Estimated by CVP, PCWP, IVC distensibility or
                  dynamic indices (PPV, SVV).
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">Afterload</h3>
                <p className="text-sm text-foreground/80 mt-1">
                  Wall stress during ejection; approximated by SVR and aortic impedance. Influenced by
                  aortic compliance, viscosity and outflow obstruction (AS, HOCM). Laplace: σ = P·r / 2h.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">Contractility</h3>
                <p className="text-sm text-foreground/80 mt-1">
                  Load-independent inotropy. Best assessed by ESPVR slope, dP/dt<sub>max</sub>, or ejection
                  fraction (load-dependent). Modulated by sympathetic tone, calcium, pH and drugs.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">Heart Rate & Rhythm</h3>
                <p className="text-sm text-foreground/80 mt-1">
                  CO = HR × SV. Optimal HR balances filling time vs output. Loss of AV synchrony (AF,
                  junctional, VVI pacing) loses the atrial kick — significant in stiff ventricles (AS, HCM,
                  diastolic dysfunction).
                </p>
              </div>
            </div>
          </ExamSection>

          <ExamSection id="diastolic-function" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["OA_BK_05"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Diastolic Function</h2>
            <p className="text-foreground/90 leading-relaxed">
              Diastole has four sub-phases: isovolumetric relaxation, rapid filling, diastasis and atrial
              systole. Active relaxation (lusitropy) is ATP-dependent (SERCA reuptake of Ca²⁺) and is
              impaired by ischaemia. Passive stiffness depends on titin, collagen, fibrosis and hypertrophy.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-foreground/80">
              <li><strong>Grade I (impaired relaxation)</strong> — E/A &lt; 0.8, prolonged DT.</li>
              <li><strong>Grade II (pseudonormal)</strong> — normal E/A but elevated E/e′ (&gt;14).</li>
              <li><strong>Grade III (restrictive)</strong> — E/A &gt; 2, short DT, high LA pressure.</li>
              <li>Anaesthetic implications: maintain sinus rhythm, avoid tachycardia, optimise preload, treat ischaemia, avoid abrupt afterload changes.</li>
            </ul>
          </ExamSection>

          <ExamSection id="applied-pathophysiology" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["OA_BK_05"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Applied Pathophysiology</h2>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left p-2 font-semibold">Condition</th>
                    <th className="text-left p-2 font-semibold">Cycle change</th>
                    <th className="text-left p-2 font-semibold">Anaesthetic priority</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="p-2">Aortic stenosis</td><td className="p-2">Pressure-overloaded LV, prolonged ejection, steep ESPVR</td><td className="p-2">Sinus rhythm, normal HR, maintain SVR & preload, avoid hypotension</td></tr>
                  <tr><td className="p-2">Aortic regurgitation</td><td className="p-2">Volume overload, wide pulse pressure, low aortic DBP</td><td className="p-2">"Fast, full, forward" — modest tachycardia, vasodilate, avoid bradycardia</td></tr>
                  <tr><td className="p-2">Mitral stenosis</td><td className="p-2">Raised LA pressure, large a wave, fixed SV</td><td className="p-2">Avoid tachycardia and AF; cautious fluids; avoid PHT triggers</td></tr>
                  <tr><td className="p-2">Mitral regurgitation</td><td className="p-2">Giant v wave, regurgitant fraction</td><td className="p-2">Reduce afterload, mild tachycardia, avoid bradycardia</td></tr>
                  <tr><td className="p-2">HOCM</td><td className="p-2">Dynamic LVOT obstruction worsened by ↓preload / ↑contractility</td><td className="p-2">Maintain preload, afterload & sinus rhythm; avoid inotropes</td></tr>
                  <tr><td className="p-2">Tamponade</td><td className="p-2">Equalised diastolic pressures, blunted y descent, pulsus paradoxus</td><td className="p-2">"Fast, full, tight" — preserve preload, HR, SVR; drain</td></tr>
                  <tr><td className="p-2">Constrictive pericarditis</td><td className="p-2">Steep x and y descents, dip-and-plateau LV trace</td><td className="p-2">Maintain preload & rate; pericardiectomy definitive</td></tr>
                  <tr><td className="p-2">Atrial fibrillation</td><td className="p-2">Loss of atrial kick, irregular filling time</td><td className="p-2">Rate control, anticoagulation; rhythm control if compromise</td></tr>
                  <tr><td className="p-2">RV failure / acute PE</td><td className="p-2">RV dilation, septal shift, impaired LV filling</td><td className="p-2">Avoid hypoxia/hypercapnia, support RV (noradrenaline, milrinone, iNO)</td></tr>
                </tbody>
              </table>
            </div>
          </ExamSection>

          <ExamSection id="invasive-waveforms" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["OA_BK_05"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Invasive Waveform Correlations</h2>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li><strong>Arterial line</strong> — upstroke = rapid ejection; dicrotic notch = aortic valve closure (end systole); area under systolic portion ∝ stroke volume; slope reflects contractility; downstroke reflects SVR and compliance.</li>
              <li><strong>CVP</strong> — direct visualisation of a, c, v waves and x, y descents; useful in arrhythmia (cannon a), TR (cv wave) and tamponade (blunted y).</li>
              <li><strong>PA catheter</strong> — RA → RV (square root, large pulse pressure) → PA (diastolic step-up, dicrotic notch) → PCWP (a, c, v waves like LA, slightly delayed).</li>
              <li><strong>Pulse pressure variation (PPV)</strong> — reflects preload responsiveness in ventilated patients (PPV &gt; 13% suggests fluid responsiveness).</li>
            </ul>
          </ExamSection>
        </>
      }
    />
  );
};

export default CardiacCycleTopic;
