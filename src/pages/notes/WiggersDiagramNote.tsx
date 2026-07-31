import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";
import { WiggersDiagram } from "@/components/diagrams/physiology/WiggersDiagram";

/**
 * High-intent SEO note: "Wiggers diagram" / "cardiac cycle".
 *
 * Reuses the interactive, animated WiggersDiagram component (LV / aortic /
 * LA pressure traces, ventricular volume, ECG and heart sounds, phase
 * scrubbing) and wraps it in exam-focused explanation for FRCA Primary,
 * Final and FFICM candidates.
 */
const WiggersDiagramNote = () => (
  <NoteLayout
    slug="wiggers-diagram-explained"
    title="Wiggers diagram explained: the cardiac cycle, pressures, ECG and heart sounds"
    shortTitle="Wiggers diagram explained"
    description="Interactive Wiggers diagram: how left ventricular, atrial and aortic pressures, ventricular volume, the ECG and heart sounds line up across the seven phases of the cardiac cycle."
    datePublished="2026-07-31"
    lede="The Wiggers diagram stacks left ventricular, left atrial and aortic pressure, ventricular volume, the ECG and the heart sounds on one time axis. Read it correctly and every valve event, murmur and waveform in the cardiac cycle falls out of pressure gradients alone."
    examTags={["primary", "final", "fficm"]}
    curriculumCodes={["CP_BK_02", "PR_BK_15"]}
    faqs={[
      {
        q: "What does the Wiggers diagram show?",
        a: "It plots left ventricular, left atrial and aortic pressure, left ventricular volume, the ECG and the phonocardiogram against time for one cardiac cycle, so that valve opening and closure, filling, ejection and the heart sounds can all be related to the underlying pressure gradients.",
      },
      {
        q: "What are the phases of the cardiac cycle on a Wiggers diagram?",
        a: "Seven: atrial systole, isovolumetric contraction, rapid ejection, reduced ejection, isovolumetric relaxation, rapid (passive) filling, and reduced filling or diastasis. Systole comprises isovolumetric contraction plus the two ejection phases; the remainder is diastole.",
      },
      {
        q: "Why do the a, c and v waves appear on the atrial pressure trace?",
        a: "The a wave is atrial contraction; the c wave is bulging of the closed AV valve into the atrium during isovolumetric contraction; the v wave is atrial filling against a still-closed AV valve during late ventricular systole. The x descent follows atrial relaxation and downward pull of the AV ring, and the y descent follows AV valve opening.",
      },
      {
        q: "What causes the first and second heart sounds?",
        a: "S1 is mitral then tricuspid closure at the start of isovolumetric contraction, when ventricular pressure exceeds atrial pressure. S2 is aortic then pulmonary closure at the start of isovolumetric relaxation, when ventricular pressure falls below arterial pressure; it produces the dicrotic notch on the aortic trace.",
      },
      {
        q: "What is the dicrotic notch?",
        a: "A brief upward deflection on the aortic pressure trace at aortic valve closure, caused by a small retrograde flow of blood and elastic recoil of the closing valve and aortic root. It marks the end of ejection and coincides with S2.",
      },
      {
        q: "Why does tachycardia shorten diastole more than systole?",
        a: "Systolic duration is relatively fixed by the excitation-contraction machinery, so an increased heart rate is accommodated mainly by shortening diastasis. Filling time and coronary perfusion time — which for the left ventricle occurs almost entirely in diastole — fall disproportionately, which is why tachycardia is poorly tolerated in aortic stenosis and ischaemic heart disease.",
      },
    ]}
    related={[
      { label: "Cardiac cycle (Physiology)", to: "/physiology/cardiac-cycle" },
      { label: "Cardiac output formula: Fick, thermodilution and CO = SV × HR", to: "/notes/cardiac-output-formula" },
    ]}
  >
    <p>
      Carl Wiggers' 1915 composite plot is still the single most efficient way
      to revise cardiac physiology, because every event on it is explained by
      one rule: <strong>valves open and close passively along pressure
      gradients</strong>. Nothing on the diagram needs to be memorised
      independently once that rule is applied to the four traces.
    </p>

    <h2>The interactive diagram</h2>
    <p>
      Scrub through the cycle below. The phase highlight moves with the
      cursor, and the pressure, volume, ECG and heart-sound traces are drawn
      on a shared time axis so you can read off exactly which valve event
      belongs to which pressure crossing.
    </p>

    <WiggersDiagram />

    <h2>How to read the traces</h2>
    <ul>
      <li>
        <strong>Aortic pressure</strong> (highest, ~120/80 mmHg): rises only
        while the aortic valve is open, then decays exponentially through
        diastole as the Windkessel recoil of the elastic aorta maintains
        forward flow.
      </li>
      <li>
        <strong>Left ventricular pressure</strong>: swings from near 0 mmHg in
        diastole to peak systolic pressure. It crosses the atrial trace at
        mitral valve events and the aortic trace at aortic valve events —
        those four crossings define the four boundaries of systole and
        diastole.
      </li>
      <li>
        <strong>Left atrial pressure</strong> (lowest, ~5–12 mmHg): carries the
        a, c and v waves with the x and y descents.
      </li>
      <li>
        <strong>Ventricular volume</strong>: flat during both isovolumetric
        phases (all valves closed), falling during ejection from EDV ~120 mL to
        ESV ~50 mL, rising during filling.
      </li>
      <li>
        <strong>ECG</strong>: electrical events <em>precede</em> the mechanical
        ones. P wave precedes atrial systole, QRS precedes isovolumetric
        contraction, and the T wave falls in reduced ejection.
      </li>
    </ul>

    <h2>The seven phases</h2>
    <ol>
      <li>
        <strong>Atrial systole</strong> — follows the P wave. The atrial kick
        contributes 15–25% of filling in a normal ventricle, and considerably
        more when the ventricle is stiff. This is why new atrial fibrillation
        decompensates diastolic dysfunction, severe aortic stenosis and
        hypertrophic cardiomyopathy so abruptly.
      </li>
      <li>
        <strong>Isovolumetric contraction</strong> — mitral valve shut (S1),
        aortic valve still shut. Pressure rises steeply at constant volume;
        this phase is the main determinant of dP/dt<sub>max</sub>, a
        load-dependent index of contractility.
      </li>
      <li>
        <strong>Rapid ejection</strong> — aortic valve opens once LV pressure
        exceeds aortic diastolic pressure. About 70% of the stroke volume
        leaves in the first third of ejection.
      </li>
      <li>
        <strong>Reduced ejection</strong> — LV pressure falls below aortic
        pressure yet flow continues by momentum. Volume reaches ESV.
      </li>
      <li>
        <strong>Isovolumetric relaxation</strong> — aortic valve closes (S2,
        dicrotic notch). Relaxation is an active, ATP-dependent process, which
        is why ischaemia impairs diastolic function before systolic function.
      </li>
      <li>
        <strong>Rapid filling</strong> — mitral valve opens at the y descent;
        roughly 70% of filling is passive. An audible S3 here is normal in the
        young and athletic, pathological in the failing dilated ventricle.
      </li>
      <li>
        <strong>Reduced filling (diastasis)</strong> — the pressure gradient
        equilibrates. This is the phase that disappears with tachycardia.
      </li>
    </ol>

    <h2>Right heart, same shape</h2>
    <p>
      The right ventricular trace has an identical morphology at roughly a
      fifth of the pressure (~25/4 mmHg, pulmonary artery ~25/10 mmHg). Two
      practical consequences: right ventricular ejection starts earlier and
      ends later, giving physiological splitting of S2 on inspiration; and the
      thin-walled RV is perfused throughout the cardiac cycle, unlike the LV
      whose subendocardium is perfused almost solely in diastole.
    </p>

    <h2>Clinical and exam applications</h2>
    <ul>
      <li>
        <strong>Aortic stenosis</strong> — a systolic pressure gradient opens up
        between LV and aorta; the aortic upstroke becomes slow and late
        (pulsus parvus et tardus). Maintain sinus rhythm, rate and preload.
      </li>
      <li>
        <strong>Mitral regurgitation</strong> — a giant v wave appears on the
        atrial (and PAWP) trace as the ventricle ejects backwards during
        systole.
      </li>
      <li>
        <strong>Cardiac tamponade</strong> — equalisation of diastolic
        pressures with a preserved x descent and a blunted y descent, because
        filling in early diastole is prevented.
      </li>
      <li>
        <strong>Coronary perfusion pressure</strong> = aortic diastolic
        pressure − LV end-diastolic pressure. Both terms are read directly off
        the diagram, which is why tachycardia and a raised LVEDP are the two
        classic ways to make ischaemia worse.
      </li>
    </ul>

    <p>
      For the full curriculum treatment, including pressure–volume loops and
      the determinants of stroke volume, work through the{" "}
      <Link to="/physiology/cardiac-cycle">cardiac cycle topic</Link>, then use{" "}
      <Link to="/notes/cardiac-output-formula">the cardiac output formula guide</Link>{" "}
      to link stroke volume to measured output.
    </p>

    <h2>Exam-focused summary</h2>
    <div className="not-prose my-4 rounded-lg border border-physiology/30 bg-physiology/5 p-4">
      <ul className="space-y-2 text-sm text-foreground list-disc pl-5">
        <li>
          <strong>Seven phases</strong>, two of them isovolumetric — those two
          are the only points where volume is flat with all valves shut.
        </li>
        <li>
          <strong>Valve events are pressure crossings:</strong> LV/LA crossings
          give S1 and mitral opening; LV/aortic crossings give aortic opening
          and S2.
        </li>
        <li>
          <strong>Atrial waves:</strong> a = contraction, c = AV valve bulge,
          v = filling against a closed valve; x and y are the descents.
        </li>
        <li>
          <strong>Normal numbers:</strong> EDV ~120 mL, ESV ~50 mL, SV ~70 mL,
          EF ~55–70%, aorta 120/80 mmHg, LA 5–12 mmHg, RV 25/4 mmHg.
        </li>
        <li>
          <strong>Electrical precedes mechanical:</strong> P → atrial systole,
          QRS → isovolumetric contraction, T → reduced ejection.
        </li>
        <li>
          <strong>Tachycardia steals diastole</strong>, cutting both filling
          time and left coronary perfusion time.
        </li>
      </ul>
    </div>
  </NoteLayout>
);

export default WiggersDiagramNote;
