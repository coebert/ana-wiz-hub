import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { humidityGasSamplingQuiz } from "@/data/quizzes";
import HumidityGasSamplingDiagram from "@/components/diagrams/HumidityGasSamplingDiagram";

const HumidityGasSamplingTopic = () => {
  return (
    <SectionLayout
      title="Humidity & Gas Analysis"
      subtitle="Pneumotachographs, mass spectrometry, Raman scattering, and humidification physics"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
    >
      <div className="space-y-8">
        <KeyLearningPoints
          points={[
            "Absolute humidity at the carina = 44 mg/L at 37°C (100% RH); the isothermic saturation boundary (ISB) is normally at this level",
            "Pneumotachographs (Fleisch/Lilly) measure flow via ΔP across a known resistance — valid only for laminar flow (Hagen-Poiseuille)",
            "Mass spectrometry ionises gas molecules and separates by m/z ratio in a magnetic field (r = mv/qB) — the only analyser to identify all gases simultaneously",
            "N₂O and CO₂ share m/z = 44 — mass spec distinguishes them by fragmentation patterns; Raman distinguishes by unique vibrational shifts",
            "Raman scattering is inelastic — frequency shift (Δν) unique to each molecule; can detect N₂ (unlike infrared absorption)",
            "HME filters provide 25–30 mg/L humidity passively but add dead space; heated humidifiers achieve 44 mg/L but risk condensation",
          ]}
        />

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Gas analysis and humidity management are fundamental to safe anaesthesia and ventilation. Understanding the physics
            of flow measurement, gas identification, and airway humidification underpins rational use of monitoring equipment
            and ventilator circuits. This topic covers pneumotachography, mass spectrometry, Raman scattering, and the physics
            of humidity — all core Primary FRCA material.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Interactive Diagrams</h2>
          <HumidityGasSamplingDiagram />
        </div>

        <div>
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
        </div>

        <div>
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
        </div>

        <div>
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
        </div>

        <div>
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
        </div>

        <QuizSection questions={humidityGasSamplingQuiz} />

        <TopicCompletionToggle topicId="humidity-gas-sampling" topicTitle="Humidity & Gas Analysis" />
      </div>
    </SectionLayout>
  );
};

export default HumidityGasSamplingTopic;
