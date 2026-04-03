import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { pulseOximetryQuiz } from "@/data/quizzes";
import { AbsorptionSpectraDiagram } from "@/components/diagrams/AbsorptionSpectraDiagram";

const PulseOximetryTopic = () => {
  return (
    <SectionLayout
      title="Pulse Oximetry & Capnography"
      subtitle="FRCA Primary — Physics"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
    >
      <div className="prose prose-slate max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
          <p className="text-foreground/90 leading-relaxed">
            Pulse oximetry and capnography are mandatory monitoring standards during anaesthesia. Both rely on absorption
            spectroscopy principles — the Beer-Lambert law — applied at different wavelengths to measure different substances.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Absorption Spectra</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            The diagram below shows the absorption characteristics of oxyhaemoglobin and deoxyhaemoglobin at the two
            wavelengths used by pulse oximetry.
          </p>
          <div className="bg-card rounded-xl border border-border p-6">
            <AbsorptionSpectraDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Beer-Lambert Law</h2>
          <p className="text-foreground/90 leading-relaxed">
            <strong>A = εcl</strong>, where A = absorbance, ε = extinction coefficient (wavelength-specific), c = concentration,
            l = path length. Absorbance is logarithmic: <strong>A = log₁₀(I₀/I)</strong>. The law assumes monochromatic light,
            dilute solutions, and no scattering — all assumptions that are violated to some degree in biological tissue.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Pulse Oximetry</h2>
          <p className="text-foreground/90 leading-relaxed">
            Pulse oximetry measures <strong>SpO₂</strong> by comparing absorption of red (660 nm) and infrared (940 nm) light.
            At 660 nm, deoxyHb absorbs more than oxyHb; at 940 nm the reverse is true. The <strong>isobestic point</strong>
            (~805 nm) is where both species absorb equally.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            The oximeter calculates the <strong>ratio R = (AC/DC)₆₆₀ / (AC/DC)₉₄₀</strong>. The AC component (pulsatile
            arterial blood) is isolated from the DC component (tissue, venous blood, non-pulsatile arterial blood). R is
            compared to an empirical calibration curve: R = 1 → SpO₂ ≈ 85%; R = 0.4 → SpO₂ ≈ 100%.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Sources of Error</p>
            <p className="text-sm text-muted-foreground mt-1">
              <strong>COHb</strong>: reads as ~SpO₂ 100% (absorbs similarly to oxyHb at 660 nm). <strong>MetHb</strong>:
              SpO₂ tends toward 85% regardless of true SaO₂ (R → 1). Motion artefact. Poor perfusion. Nail polish
              (blue/green/black). Ambient light. Intravenous dyes (methylene blue). Skin pigmentation may affect accuracy
              at low saturations.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Capnography</h2>
          <p className="text-foreground/90 leading-relaxed">
            Capnography measures CO₂ concentration using <strong>infrared absorption</strong> at 4.26 µm. CO₂ absorbs
            infrared because it is a polyatomic molecule with different atoms — it has a changing dipole moment during
            asymmetric stretching. Monoatomic (Ar) and homonuclear diatomic (O₂, N₂) gases do not absorb IR.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Mainstream</strong> analysers: sensor sits on the airway (fast response, no sampling tube, heavier).
            <strong> Sidestream</strong>: gas aspirated via sampling tube to a remote sensor (lighter adaptor, 2–3 s delay,
            scavenging needed).
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">The Capnograph Waveform</h2>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Phase I</strong>: baseline (inspired gas, CO₂ ≈ 0). <strong>Phase II</strong>: rapid rise (mixing of
            dead space and alveolar gas). <strong>Phase III</strong>: alveolar plateau. <strong>Phase IV</strong>: rapid
            descent (inspiration begins). The <strong>α angle</strong> (II–III junction) and <strong>β angle</strong>
            (III–IV junction) reflect V/Q mismatch when abnormal.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Clinical Patterns</p>
            <p className="text-sm text-muted-foreground mt-1">
              <strong>Sudden EtCO₂ = 0</strong>: oesophageal intubation, disconnection, cardiac arrest. <strong>Rising
              baseline</strong>: rebreathing (exhausted soda lime). <strong>Steep phase III</strong>: bronchospasm, COPD.
              <strong> Exponential fall to zero</strong>: cardiac arrest. <strong>Curare cleft</strong>: diaphragmatic
              movement during partial neuromuscular recovery.
            </p>
          </div>
        </section>
      </div>

      <KeyLearningPoints points={[
        "Beer-Lambert law: A = εcl. Absorbance depends on extinction coefficient, concentration, and path length.",
        "Pulse oximetry uses 660 nm (red) and 940 nm (IR). R ratio compared to empirical calibration curve.",
        "COHb falsely elevates SpO₂; MetHb drives SpO₂ toward 85% (R → 1). Two-wavelength oximeters cannot distinguish dyshaemoglobins.",
        "Capnography uses IR absorption at 4.26 µm. Only polyatomic molecules with different atoms absorb IR.",
        "Normal capnograph: 4 phases. EtCO₂ approximates PaCO₂ (normally 0.5–1 kPa less due to alveolar dead space).",
        "Sudden loss of EtCO₂ trace demands immediate assessment: check tube position, circuit integrity, and cardiac output."
      ]} />
      <QuizSection questions={pulseOximetryQuiz} />
      <TopicCompletionToggle topicId="pulse-oximetry" topicTitle="Pulse Oximetry & Capnography" />
    </SectionLayout>
  );
};

export default PulseOximetryTopic;
