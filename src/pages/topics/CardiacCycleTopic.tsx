import { SectionLayout } from "@/components/SectionLayout";
import { WiggersDiagram } from "@/components/diagrams/WiggersDiagram";
import PVLoopDiagram from "@/components/diagrams/PVLoopDiagram";
import FrankStarlingDiagram from "@/components/diagrams/FrankStarlingDiagram";
import CardiacActionPotentialDiagram from "@/components/diagrams/CardiacActionPotentialDiagram";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { cardiacCycleQuiz } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const CardiacCycleTopic = () => {
  return (
    <SectionLayout
      title="The Cardiac Cycle"
      subtitle="FRCA Primary — Physiology"
      backPath="/physiology"
      backLabel="Physiology"
      accentColor="text-physiology"
    >
      <div className="prose prose-slate max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Introduction & Curriculum Scope</h2>
          <p className="text-foreground/90 leading-relaxed">
            The cardiac cycle encompasses all electrical and mechanical events from the beginning of one heartbeat to
            the beginning of the next. It comprises <strong>systole</strong> (isovolumetric contraction + ejection)
            and <strong>diastole</strong> (isovolumetric relaxation + filling). At a heart rate of 70 bpm, the cycle
            lasts ~860 ms (systole ~300 ms, diastole ~560 ms). As heart rate rises, diastole shortens
            disproportionately, compromising filling and coronary perfusion.
          </p>
          <div className="grid md:grid-cols-2 gap-3 mt-4">
            <div className="rounded-lg border border-border bg-secondary/30 p-3">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide">FRCA Primary</p>
              <p className="text-xs text-foreground/80 mt-1">
                Phases of the cycle, Wiggers diagram, pressure–volume loop, Frank–Starling relationship,
                determinants of stroke volume and cardiac output, heart sounds, atrial pressure waveform,
                ventricular action potential.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide">FRCA Final / FFICM</p>
              <p className="text-xs text-foreground/80 mt-1">
                Right heart cycle, JVP/CVP waveform interpretation, PA catheter traces, valvular and
                pericardial pathophysiology, ventricular interdependence, diastolic dysfunction, coronary
                perfusion physiology, applied haemodynamics in shock and arrhythmia.
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground italic mt-3">
            References: Levick JR, <em>An Introduction to Cardiovascular Physiology</em>, 6th edn (CRC Press, 2018);
            Pappano & Wier, <em>Cardiovascular Physiology</em>, 11th edn (Elsevier); BJA Education — Cardiovascular
            Physiology series; FRCA Primary & Final curriculum (RCoA 2021); FFICM curriculum (FICM 2019).
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Normal Pressure & Volume Reference</h2>
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
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">The Wiggers Diagram</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            The Wiggers diagram displays the simultaneous temporal relationships between the ECG, left ventricular
            pressure, aortic pressure, left atrial pressure, and heart sounds. Use the controls below to observe how
            these relate across each phase of the cardiac cycle.
          </p>
          <div className="bg-card rounded-xl border border-border p-4 md:p-6">
            <WiggersDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Pressure-Volume Loop</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            The PV loop shows the four phases of the cardiac cycle on a pressure-volume plane. Adjust preload,
            afterload, and contractility to see how they shift the loop and affect stroke volume and ejection fraction.
          </p>
          <div className="bg-card rounded-xl border border-border p-4 md:p-6">
            <PVLoopDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Frank-Starling Curve</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            The Frank-Starling mechanism describes how stroke volume increases with preload (LVEDV) up to a plateau.
            Compare normal function with sympathetic stimulation and heart failure states.
          </p>
          <div className="bg-card rounded-xl border border-border p-4 md:p-6">
            <FrankStarlingDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Phases of the Cardiac Cycle</h2>

          <div className="space-y-6 mt-4">
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground">1. Atrial Systole</h3>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                Corresponds to the P wave on ECG. Atrial contraction contributes the final 15-25% of ventricular
                filling (the "atrial kick"). This becomes increasingly important at higher heart rates when passive
                filling time is reduced. Loss of atrial systole (e.g., atrial fibrillation) can reduce cardiac output
                by up to 25%.
              </p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground">2. Isovolumetric Contraction</h3>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                Begins with mitral valve closure (S1) after the QRS complex triggers ventricular depolarisation. All
                valves are closed; ventricular pressure rises rapidly with no change in volume. LV pressure must exceed
                aortic diastolic pressure (~80 mmHg) before the aortic valve opens. This phase lasts ~50 ms.
              </p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground">3. Rapid Ejection</h3>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                The aortic valve opens when LV pressure exceeds aortic pressure. Approximately two-thirds of the stroke
                volume is ejected during this phase. Peak LV and aortic pressures occur here (~120 mmHg). Aortic flow
                velocity is maximal.
              </p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground">4. Reduced Ejection</h3>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                Ventricular repolarisation occurs (T wave). Ejection rate decreases as the pressure gradient across the
                aortic valve diminishes. The remaining one-third of stroke volume is ejected. LV pressure begins to
                fall below aortic pressure, but momentum maintains forward flow briefly.
              </p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground">5. Isovolumetric Relaxation</h3>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                The aortic valve closes, producing S2 and the dicrotic notch on the aortic pressure trace. All valves
                are again closed. LV pressure falls rapidly with no change in volume. When LV pressure falls below LA
                pressure, the mitral valve opens and filling begins.
              </p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground">6. Rapid Filling</h3>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                The mitral valve opens and blood flows rapidly from LA to LV down the pressure gradient. This passive
                filling accounts for approximately 70-80% of ventricular filling. A third heart sound (S3) may be heard
                at the end of this phase in young or pathological hearts.
              </p>
            </div>

            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground">7. Diastasis (Reduced Filling)</h3>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                LA and LV pressures equilibrate; filling slows considerably. This phase is shortened at high heart
                rates and is the first to be compromised with tachycardia, which is why diastolic filling time is
                rate-dependent and why tachycardia reduces cardiac output in patients with diastolic dysfunction.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Left Atrial Pressure Waves</h2>
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
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Heart Sounds</h2>
          <p className="text-foreground/90 leading-relaxed">
            <strong>S1</strong> is caused by closure of the mitral and tricuspid valves at the onset of ventricular
            systole. It is best heard at the apex. <strong>S2</strong> results from closure of the aortic and pulmonary
            valves at the end of systole. Physiological splitting of S2 occurs during inspiration when increased venous
            return delays pulmonary valve closure.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Cardiac Action Potential & Antiarrhythmics</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            The cardiac action potential differs fundamentally between contractile myocytes (fast response) and pacemaker cells (slow response). Understanding each phase and its ion channels is essential for the pharmacology of antiarrhythmic drugs.
          </p>
          <div className="bg-card rounded-xl border border-border p-4 md:p-6">
            <CardiacActionPotentialDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Anaesthetic Relevance</h2>
          <p className="text-foreground/90 leading-relaxed">
            Understanding the cardiac cycle is essential for interpreting invasive arterial and central venous pressure
            waveforms, understanding the haemodynamic effects of arrhythmias (e.g., loss of atrial kick in AF), optimising
            heart rate in valvular disease, and understanding the effects of anaesthetic agents on myocardial
            contractility and vascular resistance.
          </p>
        </section>
      </div>

      <KeyLearningPoints points={[
        "The cardiac cycle consists of systole (~300 ms) and diastole (~560 ms) at a normal heart rate.",
        "S1 = AV valve closure (start of systole); S2 = semilunar valve closure (end of systole) with dicrotic notch.",
        "Isovolumetric contraction and relaxation are periods where all valves are closed and pressure changes without volume change.",
        "Passive filling (rapid filling + diastasis) accounts for 70-80% of ventricular volume; atrial kick adds 15-25%.",
        "Diastasis is the first phase lost in tachycardia — explaining reduced filling and cardiac output at high heart rates.",
        "LA pressure trace: a wave (atrial contraction), c wave (AV bulge), v wave (atrial filling), x and y descents.",
        "Giant a waves suggest tricuspid stenosis or cannon waves in complete heart block; giant v waves suggest mitral/tricuspid regurgitation."
      ]} />
      <QuizSection questions={cardiacCycleQuiz} />
      <ReferencesList topicId="cardiac-cycle" />

      <SeeAlso topicId="cardiac-cycle" />
        <TopicCompletionToggle topicId="cardiac-cycle" topicTitle="The Cardiac Cycle" />
    </SectionLayout>
  );
};

export default CardiacCycleTopic;
