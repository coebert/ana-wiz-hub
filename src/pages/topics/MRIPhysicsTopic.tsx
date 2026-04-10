import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { mriPhysicsQuiz } from "@/data/quizzes";
import MRIPhysicsDiagram from "@/components/diagrams/MRIPhysicsDiagram";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const MRIPhysicsTopic = () => {
  return (
    <SectionLayout
      title="MRI Physics"
      subtitle="Nuclear spin, precession, T1/T2 relaxation, and MRI safety for anaesthetists"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
    >
      <div className="space-y-8">
        <KeyLearningPoints
          points={[
            "MRI uses hydrogen protons (¹H) which precess at the Larmor frequency ω₀ = γB₀ (42.58 MHz/T × field strength)",
            "An RF pulse at the Larmor frequency tips net magnetisation into the transverse plane (resonance condition)",
            "T1 (spin-lattice) = longitudinal recovery; T2 (spin-spin) = transverse decay; T2* includes field inhomogeneity",
            "T1-weighted: fat bright, water dark (short TR/TE); T2-weighted: water bright, fat dark (long TR/TE) — 'WW2' mnemonic",
            "Gadolinium shortens T1 → bright on T1W; risk of nephrogenic systemic fibrosis in renal failure (eGFR <30)",
            "Three MRI hazards: missile effect (ferromagnetic projectiles), thermal burns (RF heating/SAR), device malfunction",
            "Equipment labels: MR Safe (green), MR Conditional (yellow), MR Unsafe (red) — all anaesthetic equipment must be checked",
          ]}
        />

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            MRI is increasingly used for diagnostic and interventional procedures requiring anaesthesia, particularly in
            paediatrics and neurosurgery. Understanding the fundamental physics of MRI is essential for safe anaesthetic practice
            in the MR environment. The unique hazards of strong magnetic fields make MRI anaesthesia a high-risk remote location
            requiring specific equipment, monitoring, and safety protocols.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Interactive Diagrams</h2>
          <MRIPhysicsDiagram />
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Nuclear Spin & Precession</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              MRI exploits the magnetic properties of <strong>hydrogen nuclei (¹H protons)</strong>, which are abundant in water
              and fat. Each proton has quantum spin (½) and acts as a tiny magnet. When placed in a strong external magnetic field
              (B₀), protons align either <strong>parallel</strong> (low energy, spin-up) or <strong>anti-parallel</strong> (high
              energy, spin-down) to B₀. A slight excess align parallel, creating a small but detectable <strong>net magnetisation
              vector (M₀)</strong> along B₀.
            </p>
            <p>
              Each proton <strong>precesses</strong> (wobbles like a gyroscope) around the B₀ axis at a frequency given by the
              <strong> Larmor equation: ω₀ = γ × B₀</strong>. For hydrogen, γ = 42.58 MHz/T, giving a Larmor frequency of
              63.87 MHz at 1.5T and 127.74 MHz at 3T. An <strong>RF pulse</strong> at exactly the Larmor frequency transfers energy
              to the protons (resonance), tipping M₀ away from B₀ into the transverse plane where it can be detected by receiver coils.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">T1 & T2 Relaxation</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              After the RF pulse, the protons return to equilibrium through two simultaneous but independent relaxation processes.
              <strong> T1 (spin-lattice/longitudinal) relaxation</strong> describes the recovery of magnetisation along B₀ as protons
              release energy to the surrounding lattice. T1 is the time for 63% recovery. Fat has a <strong>short T1</strong> (efficient
              energy transfer) while water has a <strong>long T1</strong>.
            </p>
            <p>
              <strong>T2 (spin-spin/transverse) relaxation</strong> describes the loss of transverse magnetisation as protons lose
              phase coherence through interactions with neighbouring spins. T2 is the time to 37% remaining signal. <strong>T2*</strong>
              is always shorter than T2 because it includes additional dephasing from B₀ field inhomogeneities.
            </p>
            <p>
              <strong>Image weighting</strong> is controlled by TR (repetition time) and TE (echo time). T1-weighted images (short
              TR, short TE) show fat as bright and water as dark — best for anatomical detail. T2-weighted images (long TR, long TE)
              show water as bright and fat as dark — best for detecting pathology (oedema, inflammation, CSF).
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">MRI Safety for Anaesthetists</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              The MR environment is divided into <strong>four safety zones</strong>. Zone I (public), Zone II (screening/questionnaire),
              Zone III (controlled access, MR-trained personnel only), and Zone IV (the magnet room itself). The <strong>5 Gauss
              line</strong> marks the boundary beyond which the fringe field may affect pacemakers and attract ferromagnetic objects.
            </p>
            <p>
              The three principal hazards are: (1) <strong>Missile/projectile effect</strong> — ferromagnetic objects (O₂ cylinders,
              scissors, laryngoscopes, IV poles) are accelerated toward the bore with lethal force; (2) <strong>Thermal injury</strong>
              — RF energy deposits heat in tissue (measured as SAR, W/kg) and loops of wire/ECG leads can act as antennae causing
              focal burns; (3) <strong>Device malfunction</strong> — pacemakers, cochlear implants, and certain aneurysm clips
              may malfunction, move, or heat.
            </p>
            <p>
              <strong>Practical considerations</strong>: all equipment must be MR Safe or MR Conditional. Use fibreoptic ECG cables,
              MR-compatible pulse oximetry, capnography with long sampling lines, and non-ferromagnetic anaesthetic machines and
              ventilators. Patient access is limited inside the bore — use long breathing circuits and IV extensions. A
              <strong> quench</strong> (rapid boil-off of cryogenic helium) can displace oxygen and cause asphyxiation — emergency
              ventilation must be available.
            </p>
          </div>
        </div>

        <QuizSection questions={mriPhysicsQuiz} />

      <ReferencesList topicId="mri-physics" />

        <SeeAlso topicId="mri-physics" />
        <TopicCompletionToggle topicId="mri-physics" topicTitle="MRI Physics" />
      </div>
    </SectionLayout>
  );
};

export default MRIPhysicsTopic;
