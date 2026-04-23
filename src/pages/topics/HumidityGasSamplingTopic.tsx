import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import HumidityGasSamplingDiagram from "@/components/diagrams/HumidityGasSamplingDiagram";
import { humidityGasSamplingQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

const objectives = [
  "Define absolute and relative humidity and recall the saturated value at 37 °C (44 mg/L)",
  "Locate the isothermic saturation boundary (ISB) and explain how intubation displaces it distally",
  "Compare HME filters and heated humidifiers in terms of efficiency, dead space and complications",
  "Describe how a pneumotachograph (Fleisch / Lilly) measures flow and what causes inaccuracy",
  "Compare mass spectrometry, infrared absorption and Raman scattering for clinical gas analysis",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Humidity deficit when bypassing the upper airway",
    scenario:
      "A patient is intubated and ventilated with cold, dry medical gas (≈0 mg/L water content) without humidification. How much water is the patient losing per minute through the airway at a minute ventilation of 6 L/min?",
    working:
      "Target conditioning at the carina = 44 mg/L (37 °C, 100% RH).\nDeficit per litre of inspired gas ≈ 44 mg.\nPer minute = 44 × 6 = 264 mg/min ≈ 16 g/h ≈ 380 mL/day of insensible water loss + corresponding heat loss (latent heat of vaporisation 2.26 kJ/g → ~14 W of heat loss).",
    answer:
      "About 264 mg/min of water (and ~14 W of heat) is lost from the lower airway. Over hours this dries secretions, impairs ciliary function and contributes to hypothermia — mandating an HME (≈25–30 mg/L) or active heated humidifier (44 mg/L) in any prolonged anaesthetic.",
  },
  {
    title: "Distinguishing N₂O from CO₂ on a gas analyser",
    scenario:
      "A combined gas analyser reports rising CO₂ during a laparoscopic case. Why might mass spectrometry alone be ambiguous, and what alternative confirms the gas identity?",
    working:
      "Mass spec separates by m/z. N₂O and CO₂ both have molecular m/z = 44 → primary peak overlaps.\nFragmentation patterns differ (CO₂ → m/z 28, 16; N₂O → m/z 30, 14) so high-resolution mass spec can still distinguish them, but the primary peak alone is not specific.\nInfrared absorption can resolve them (different absorption bands).\nRaman scattering is unambiguous: each molecule has a unique vibrational shift, including for homonuclear gases like N₂ that are invisible to IR.",
    answer:
      "Rely on either the fragmentation pattern (m/z 28 vs 30), an IR analyser tuned to CO₂'s 4.26 µm band, or Raman spectroscopy. In modern theatres the dual IR/paramagnetic analyser is the standard solution.",
  },
];

const HumidityGasSamplingTopic = () => {
  return (
    <TopicTemplate
      title="Humidity & Gas Analysis"
      subtitle="Pneumotachographs, mass spectrometry, Raman scattering, and humidification physics"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      topicId="humidity-gas-sampling"
      topicTitle="Humidity & Gas Analysis"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={humidityGasSamplingQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["RCoA Primary — Physics", "RCoA Final — Physics"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: ["Cross & Plunkett Ch.9"],
      }}
      keyPoints={[
        "Absolute humidity at the carina = 44 mg/L at 37°C (100% RH); the isothermic saturation boundary (ISB) is normally at this level",
        "Pneumotachographs (Fleisch/Lilly) measure flow via ΔP across a known resistance — valid only for laminar flow (Hagen-Poiseuille)",
        "Mass spectrometry ionises gas molecules and separates by m/z ratio in a magnetic field (r = mv/qB) — the only analyser to identify all gases simultaneously",
        "N₂O and CO₂ share m/z = 44 — mass spec distinguishes them by fragmentation patterns; Raman distinguishes by unique vibrational shifts",
        "Raman scattering is inelastic — frequency shift (Δν) unique to each molecule; can detect N₂ (unlike infrared absorption)",
        "HME filters provide 25–30 mg/L humidity passively but add dead space; heated humidifiers achieve 44 mg/L but risk condensation",
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={["primary", "final"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Gas analysis and humidity management are fundamental to safe anaesthesia and ventilation. Understanding the physics
              of flow measurement, gas identification, and airway humidification underpins rational use of monitoring equipment
              and ventilator circuits. This topic covers pneumotachography, mass spectrometry, Raman scattering, and the physics
              of humidity — all core Primary FRCA material.
            </p>
          </ExamSection>

          <ExamSection id="diagram" exams={["primary", "final"]}>
            <h2 className="text-xl font-bold text-foreground mb-4">Interactive Diagrams</h2>
            <HumidityGasSamplingDiagram />
          </ExamSection>

          <ExamSection id="humidity" exams={["primary", "final"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Humidity & Humidification</h2>
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Absolute humidity</strong> is the mass of water vapour per unit volume of gas (mg/L). <strong>Relative
                humidity</strong> is the ratio of actual water vapour content to the maximum possible at that temperature (%).
                At 37°C, the saturated vapour pressure of water is 6.3 kPa, giving an absolute humidity of 44 mg/L at 100% RH.
              </p>
              <p>
                The nose warms, humidifies, and filters inspired gas. At the <strong>isothermic saturation boundary (ISB)</strong>,
                normally at the carina, gas is fully conditioned to 37°C and 44 mg/L. Endotracheal intubation bypasses the nose,
                shifting the ISB distally and risking mucociliary damage, secretion thickening, and heat loss.
              </p>
              <p>
                <strong>HME filters</strong> passively trap heat and moisture from exhaled gas, returning 25–30 mg/L on inspiration.
                They add mechanical dead space (30–90 mL). <strong>Heated water bath humidifiers</strong> actively achieve 44 mg/L
                but carry risks of circuit condensation, infection, and airway burns.
              </p>
            </div>
          </ExamSection>

          <ExamSection id="pneumotachography" exams={["primary", "final"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Pneumotachography</h2>
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                A pneumotachograph measures gas flow by detecting the pressure difference (ΔP) across a known fixed resistance.
                The <strong>Fleisch</strong> type uses parallel capillary tubes to ensure laminar flow; the <strong>Lilly</strong>
                type uses a fine wire mesh screen. In both, ΔP is proportional to flow (Hagen-Poiseuille equation), but only
                while flow remains laminar.
              </p>
              <p>
                The flow signal is <strong>integrated electronically</strong> to derive volume (tidal volume, minute ventilation).
                Both types must be <strong>heated to body temperature</strong> to prevent condensation on the resistance element,
                which would increase resistance and cause inaccuracy. Changes in gas composition (viscosity, density) also affect readings.
              </p>
            </div>
          </ExamSection>

          <ExamSection id="mass-spec" exams={["primary", "final"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Mass Spectrometry</h2>
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                The mass spectrometer is the <strong>only gas analyser that can identify all respiratory and anaesthetic gases
                simultaneously</strong>. Gas molecules are ionised by electron bombardment in a high vacuum, then accelerated
                through a voltage gradient and deflected by a magnetic field. The radius of curvature depends on mass-to-charge
                ratio: <strong>r = mv/qB</strong>. Lighter ions curve more tightly.
              </p>
              <p>
                A key exam point: <strong>N₂O and CO₂ both have m/z = 44</strong>. The mass spectrometer distinguishes them by
                their different fragmentation patterns (daughter ions). The instrument is expensive, large, and requires a high
                vacuum pump, but can be multiplexed to serve multiple operating theatres via a rotating valve and long sampling lines.
              </p>
            </div>
          </ExamSection>

          <ExamSection id="raman" exams={["primary", "final"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Raman Scattering</h2>
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                When monochromatic light (argon laser) interacts with gas molecules, most photons scatter elastically
                (<strong>Rayleigh scattering</strong> — same frequency). A tiny fraction (~1 in 10⁷) scatter inelastically
                with a frequency shift corresponding to the molecule's vibrational energy — this is <strong>Raman scattering</strong>.
              </p>
              <p>
                The <strong>Stokes shift</strong> (lower frequency) is most commonly measured. Each molecule has a unique Raman
                shift acting as a fingerprint. Unlike infrared absorption (which requires a changing dipole moment), Raman can
                detect <strong>homonuclear diatomic molecules</strong> like N₂ and O₂. It can also distinguish N₂O from CO₂
                by their different vibrational modes — something IR absorption and mass spectrometry find challenging.
              </p>
              <p>
                <strong>Clinical Raman analysers</strong> (e.g., Rascal™) are fast, measure all gases, and don't require a vacuum.
                However, the signal is extremely weak, requiring sensitive photodetectors and powerful lasers, making the equipment
                expensive. They are not widely used in current clinical practice.
              </p>
            </div>
          </ExamSection>
        </>
      }
    />
  );
};

export default HumidityGasSamplingTopic;
