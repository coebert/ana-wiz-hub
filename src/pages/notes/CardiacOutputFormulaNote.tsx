import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";

/**
 * Diagram: Fick principle at the pulmonary capillary.
 *
 * Shows mixed-venous blood entering the lungs (low CaO₂), O₂ uptake VO₂
 * across the alveolar–capillary membrane, and arterial blood leaving
 * (high CaO₂). Cardiac output falls out of the mass-balance:
 *   CO = VO₂ / (CaO₂ − CvO₂)
 * Colour tokens are semantic (physiology accent + muted arterial/venous)
 * so it works in dark mode without contrast loss.
 */
const FickDiagram = () => (
  <figure className="not-prose my-6 rounded-xl border border-border bg-card p-4 sm:p-5">
    <svg
      viewBox="0 0 640 260"
      role="img"
      aria-labelledby="fick-title fick-desc"
      className="w-full h-auto"
    >
      <title id="fick-title">
        Fick principle applied to the pulmonary circulation
      </title>
      <desc id="fick-desc">
        Mixed venous blood enters the pulmonary capillary at low oxygen
        content. Oxygen uptake VO2 crosses the alveolar membrane and the
        arterial blood leaves at higher oxygen content. Cardiac output equals
        oxygen consumption divided by the arterio-venous oxygen content
        difference.
      </desc>

      {/* Alveolus */}
      <ellipse cx="320" cy="60" rx="150" ry="40" className="fill-physiology/10 stroke-physiology/60" strokeWidth="1.5" />
      <text x="320" y="55" textAnchor="middle" className="fill-foreground text-[13px] font-semibold">Alveolus</text>
      <text x="320" y="72" textAnchor="middle" className="fill-muted-foreground text-[11px]">PAO₂ ≈ 100 mmHg</text>

      {/* Capillary tube */}
      <rect x="80" y="140" width="480" height="34" rx="17" className="fill-muted stroke-border" strokeWidth="1.5" />

      {/* Venous end (blue) */}
      <rect x="80" y="140" width="120" height="34" rx="17" className="fill-clinical/25" />
      <text x="140" y="130" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">Mixed venous</text>
      <text x="140" y="196" textAnchor="middle" className="fill-muted-foreground text-[11px]">CvO₂ ≈ 15 mL/dL</text>

      {/* Arterial end (red-orange) */}
      <rect x="440" y="140" width="120" height="34" rx="17" className="fill-physiology/40" />
      <text x="500" y="130" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">Arterial</text>
      <text x="500" y="196" textAnchor="middle" className="fill-muted-foreground text-[11px]">CaO₂ ≈ 20 mL/dL</text>

      {/* Direction arrow along capillary */}
      <defs>
        <marker id="arrow-r" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" className="fill-foreground/70" />
        </marker>
        <marker id="arrow-d" viewBox="0 0 10 10" refX="5" refY="9" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L5,10 L10,0 z" className="fill-physiology" />
        </marker>
      </defs>
      <line x1="205" y1="157" x2="435" y2="157" className="stroke-foreground/60" strokeWidth="1.5" markerEnd="url(#arrow-r)" />

      {/* O2 uptake arrows */}
      <g>
        {[240, 300, 360, 400].map((x) => (
          <line
            key={x}
            x1={x}
            y1={100}
            x2={x}
            y2={140}
            className="stroke-physiology"
            strokeWidth="2"
            markerEnd="url(#arrow-d)"
          >
            <animate
              attributeName="opacity"
              values="0.2;1;0.2"
              dur="2.4s"
              begin={`${(x - 240) * 0.005}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}
        <text x="320" y="122" textAnchor="middle" className="fill-physiology text-[12px] font-semibold">
          V̇O₂ ≈ 250 mL/min
        </text>
      </g>

      {/* Equation */}
      <text x="320" y="232" textAnchor="middle" className="fill-foreground text-[14px] font-semibold">
        CO = V̇O₂ ÷ (CaO₂ − CvO₂)
      </text>
      <text x="320" y="250" textAnchor="middle" className="fill-muted-foreground text-[11px]">
        250 ÷ (200 − 150) mL/L = 5 L/min
      </text>
    </svg>
    <figcaption className="mt-3 text-xs text-muted-foreground">
      Fick's principle at the lung. Oxygen consumed per minute equals cardiac
      output multiplied by the arterio-venous O₂ content difference —
      rearrange for CO. Note the units: content is per litre when CO is in L/min.
    </figcaption>
  </figure>
);

const CardiacOutputFormulaNote = () => (
  <NoteLayout
    slug="cardiac-output-formula"
    title="Cardiac output formula: Fick principle, thermodilution and CO = SV × HR"
    shortTitle="Cardiac output formula"
    description="Cardiac output = stroke volume × heart rate. Fick's principle (VO₂ / CaO₂−CvO₂), thermodilution and the Stewart–Hamilton equation explained for FRCA and FFICM."
    datePublished="2026-07-28"
    lede="Cardiac output (CO) is the volume of blood ejected by the left ventricle per minute. The bedside formula is CO = stroke volume × heart rate, but the FRCA and FFICM exams expect you to derive it three ways: from oxygen mass-balance (Fick), from an indicator-dilution curve (thermodilution, Stewart–Hamilton), and from arterial pressure waveform analysis. Each rests on the same conservation principle applied to a different tracer."
    examTags={["primary", "final", "fficm"]}
    curriculumCodes={["PR_BK_02", "CI_BK_25"]}
    faqs={[
      {
        q: "What is the formula for cardiac output?",
        a: "CO = stroke volume × heart rate. In an adult at rest, SV ≈ 70 mL and HR ≈ 70 bpm, giving CO ≈ 5 L/min. Indexed to body surface area this becomes cardiac index (CI = CO / BSA) with a normal value of 2.5–4.0 L/min/m².",
      },
      {
        q: "What is Fick's principle?",
        a: "The amount of a substance taken up (or released) by an organ per unit time equals the blood flow through that organ multiplied by the arterio-venous concentration difference of the substance. Applied to the lung: V̇O₂ = CO × (CaO₂ − CvO₂), so CO = V̇O₂ / (CaO₂ − CvO₂).",
      },
      {
        q: "How does thermodilution measure cardiac output?",
        a: "A known volume of cold saline is injected into the right atrium via a pulmonary artery catheter. A thermistor at the PA tip records the temperature change over time. The area under the temperature–time curve is inversely proportional to cardiac output — the Stewart–Hamilton equation solves for CO from the curve, injectate volume, injectate and blood temperatures, and the specific heat and density of blood.",
      },
      {
        q: "What is the normal value of cardiac output?",
        a: "Approximately 4–8 L/min in a resting adult, or a cardiac index of 2.5–4.0 L/min/m². It can rise to 20–25 L/min in trained athletes during maximal exercise, driven mostly by heart rate and a smaller increase in stroke volume.",
      },
      {
        q: "What is the difference between Fick and thermodilution?",
        a: "Fick uses oxygen as the tracer and requires steady-state VO₂ plus arterial and mixed-venous blood gases; it is accurate at low output but slow. Thermodilution uses a cold saline bolus and gives near-real-time values but overestimates CO in tricuspid regurgitation, intracardiac shunts, and very low output states where thermal loss to surrounding tissue becomes significant.",
      },
    ]}
    related={[
      { label: "Cardiac cycle — full topic", to: "/physiology/cardiac-cycle" },
      { label: "Cardiovascular monitoring", to: "/clinical/cardiovascular-monitoring" },
      { label: "Oxygen delivery (DO₂) and consumption", to: "/physiology/oxygen-delivery" },
      { label: "Pulmonary artery catheter", to: "/clinical/pulmonary-artery-catheter" },
    ]}
  >
    <h2>The bedside formula</h2>
    <p>
      Cardiac output is the product of{" "}
      <strong>stroke volume (SV)</strong> and <strong>heart rate (HR)</strong>:
    </p>
    <p className="not-prose text-center text-lg font-semibold text-foreground my-4">
      CO = SV × HR
    </p>
    <p>
      For a resting adult with SV ≈ 70 mL and HR ≈ 70 bpm this gives ~5 L/min.
      Normalising to body size gives{" "}
      <strong>cardiac index (CI) = CO / body surface area</strong>, with a
      normal value of 2.5–4.0 L/min/m² — the more useful number in critical
      care because it removes the confounding effect of body habitus. Stroke
      volume itself is set by three linked variables covered elsewhere in the{" "}
      <Link to="/physiology/cardiac-cycle">cardiac cycle topic</Link>:{" "}
      preload, afterload and contractility.
    </p>

    <h2>Fick's principle</h2>
    <p>
      Adolph Fick's 1870 insight was a mass-balance argument. If an organ
      consumes a substance at a known rate, and you know the arterio-venous
      concentration difference across that organ, blood flow falls out
      algebraically. Applied to the lung, oxygen is the tracer:
    </p>
    <p className="not-prose text-center text-lg font-semibold text-foreground my-4">
      V̇O₂ = CO × (CaO₂ − CvO₂)
    </p>
    <p>Rearranged:</p>
    <p className="not-prose text-center text-lg font-semibold text-foreground my-4">
      CO = V̇O₂ / (CaO₂ − CvO₂)
    </p>

    <FickDiagram />

    <h3>Worked example</h3>
    <ul>
      <li><strong>V̇O₂</strong>: 250 mL/min (measured by expired gas analysis).</li>
      <li>
        <strong>CaO₂</strong>: 20 mL/dL = 200 mL/L (Hb 15 g/dL, SaO₂ 100%: 15 × 1.34 × 1.0 = 20.1 mL/dL).
      </li>
      <li>
        <strong>CvO₂</strong>: 15 mL/dL = 150 mL/L (Hb 15 g/dL, SvO₂ 75%: 15 × 1.34 × 0.75 = 15.1 mL/dL).
      </li>
      <li>
        <strong>CO</strong> = 250 / (200 − 150) = <strong>5 L/min</strong>.
      </li>
    </ul>
    <p>
      The classical "direct Fick" requires simultaneous arterial and mixed
      venous samples (from a{" "}
      <Link to="/clinical/pulmonary-artery-catheter">pulmonary artery catheter</Link>){" "}
      plus a metabolic cart for V̇O₂. It is the reference method — every other
      technique is validated against it — but it is slow and impractical
      outside the catheter lab.
    </p>

    <h2>Indicator dilution and thermodilution</h2>
    <p>
      Any conserved tracer works, not just oxygen. Inject a known amount into
      the circulation, sample downstream, plot concentration against time; the
      area under the curve is inversely proportional to flow. The general form
      is the <strong>Stewart–Hamilton equation</strong>:
    </p>
    <p className="not-prose text-center text-lg font-semibold text-foreground my-4">
      CO = (Amount injected) / ∫ C(t) dt
    </p>
    <p>
      For <strong>thermodilution</strong> the tracer is cold — 10 mL of saline
      at 0–4 °C injected into the right atrium. A thermistor at the pulmonary
      artery catheter tip records the resulting temperature dip. The specific
      form of the equation compensates for injectate and blood
      characteristics:
    </p>
    <p className="not-prose text-center text-base font-semibold text-foreground my-4">
      CO = [V(Tb − Ti) · (Si·Ci) / (Sb·Cb)] / ∫ ΔTb(t) dt
    </p>
    <p>
      where V is injectate volume, Tb and Ti are blood and injectate
      temperatures, and S·C are the specific gravity and heat capacity of
      injectate (subscript i) and blood (subscript b). Modern monitors
      compute this automatically from three sequential injections and average
      them.
    </p>

    <h3>Sources of error</h3>
    <ul>
      <li>
        <strong>Tricuspid regurgitation</strong> — cold recirculates,
        prolonging the curve and <em>under</em>estimating CO.
      </li>
      <li>
        <strong>Intracardiac shunt</strong> — cold takes a shortcut, curve
        shape distorts and CO is invalid.
      </li>
      <li>
        <strong>Low output states</strong> — thermal loss to surrounding
        tissue is proportionally larger, <em>over</em>estimating CO.
      </li>
      <li>
        <strong>Warm or wrong-volume injectate</strong> — smaller signal-to-noise,
        wider scatter between boluses.
      </li>
    </ul>

    <h2>Minimally invasive techniques</h2>
    <p>
      Modern practice has largely replaced the pulmonary artery catheter with
      arterial pressure waveform analysis (LiDCO, PiCCO, FloTrac) or
      oesophageal Doppler. All rely on the same conservation principle applied
      differently:
    </p>
    <ul>
      <li>
        <strong>Pulse contour analysis</strong> — stroke volume is derived from
        the area under the systolic portion of the arterial pressure wave,
        calibrated against a known CO (transpulmonary thermodilution for
        PiCCO, lithium dilution for LiDCO, or a demographic algorithm for
        FloTrac).
      </li>
      <li>
        <strong>Oesophageal Doppler</strong> — measures descending aortic blood
        velocity; SV = velocity–time integral × aortic cross-sectional area.
      </li>
      <li>
        <strong>Bioimpedance / bioreactance</strong> — tracks thoracic
        electrical impedance changes with each ejection; non-invasive but
        least accurate, best for trending rather than absolute values.
      </li>
    </ul>

    <h2>Exam-focused summary</h2>
    <div className="not-prose my-4 rounded-lg border border-physiology/30 bg-physiology/5 p-4">
      <ul className="space-y-2 text-sm text-foreground list-disc pl-5">
        <li>
          <strong>Two formulae to memorise:</strong> CO = SV × HR (clinical);
          CO = V̇O₂ / (CaO₂ − CvO₂) (Fick).
        </li>
        <li>
          <strong>Normal values:</strong> CO 4–8 L/min; CI 2.5–4.0 L/min/m²;
          SvO₂ 70–75%.
        </li>
        <li>
          <strong>Oxygen content:</strong> CaO₂ = (Hb × 1.34 × SaO₂) + (0.003 × PaO₂),
          in mL/dL. The dissolved term is trivial except in hyperbaric
          conditions.
        </li>
        <li>
          <strong>Fick vs thermodilution:</strong> Fick = gold standard,
          slow, needs V̇O₂ + mixed venous gas. Thermodilution = near
          real-time, invalidated by TR / shunt / very low output.
        </li>
        <li>
          <strong>Stewart–Hamilton:</strong> CO ∝ 1 / area under indicator
          curve — the unifying equation behind every dilution technique.
        </li>
        <li>
          <strong>Modern practice:</strong> arterial waveform analysis and
          oesophageal Doppler have largely replaced the PA catheter outside
          cardiac surgery and complex ICU cases.
        </li>
      </ul>
    </div>
  </NoteLayout>
);

export default CardiacOutputFormulaNote;
