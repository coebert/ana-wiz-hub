import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import MRIPhysicsDiagram from "@/components/diagrams/physics/MRIPhysicsDiagram";
import MRISuiteFloorPlanDiagram from "@/components/diagrams/physics/MRISuiteFloorPlanDiagram";
import { mriPhysicsQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";

const mriPhysicsFaqs: Array<[string, string]> = [
  [
    "What are the four MRI safety zones?",
    "Zone 1 — public, unrestricted. Zone 2 — interface area (changing rooms, screening). Zone 3 — controlled, restricted access (control room), risk of projectiles. Zone 4 — the magnet room itself, only entered after full ferromagnetic screening; the static field is always on, even when 'off'."
  ],
  [
    "What anaesthetic equipment is MRI-safe, MRI-conditional and MRI-unsafe?",
    "MR-Safe (green) — no ferromagnetic content, safe in any field (plastic, non-magnetic stainless steel). MR-Conditional (yellow) — safe under specified conditions (field strength, distance, anchored). MR-Unsafe (red) — must never enter Zone 4 (laryngoscopes with steel blades, standard infusion pumps, oxygen cylinders unless aluminium and MR-labelled)."
  ],
  [
    "What is quenching and how is it managed?",
    "Sudden boiling of liquid helium that cools the superconducting magnet; helium escapes as gas. Risk of asphyxiation (oxygen displacement) and frostbite. Quench vent should direct helium outside; if it fails, the room may become hypoxic — open all doors, evacuate, do not re-enter until atmosphere checked. Quench permanently disables the magnet and is reserved for emergencies (e.g. ferromagnetic projectile entrapment)."
  ]
];

const objectives = [
  "Explain how nuclear spin, the Larmor equation (ω₀ = γB₀) and resonance generate the MR signal",
  "Distinguish T1, T2 and T2* relaxation and predict the appearance of fat, water and pathology on T1-weighted vs T2-weighted images",
  "Describe the indications, mechanism and risks of gadolinium contrast (including nephrogenic systemic fibrosis)",
  "Identify the four MR safety zones and the three principal hazards (projectile, thermal, device)",
  "Plan a safe anaesthetic in the MR environment: equipment labelling, monitoring, access and quench response",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Larmor frequency at 1.5 T vs 3 T",
    scenario:
      "Calculate the Larmor frequency for ¹H protons in a 1.5 T and a 3 T scanner (γ for ¹H = 42.58 MHz/T). What does this imply for SAR and image quality?",
    working:
      "ω₀ = γ × B₀.\nAt 1.5 T → 42.58 × 1.5 = 63.87 MHz.\nAt 3 T → 42.58 × 3 = 127.74 MHz.\nSAR (W/kg) ∝ B₀² for a given pulse sequence, so doubling field strength quadruples SAR → greater RF heating.",
    answer:
      "The RF system must transmit at 64 MHz (1.5 T) or 128 MHz (3 T). The ~4× higher SAR at 3 T means tighter limits on duty cycle, longer scans for SAR-heavy sequences, and a higher index of suspicion for thermal injury — particularly around looped wires, ECG leads and tattoos.",
    cites: ["Middleton Ch.17"],
  },
  {
    title: "Anaesthesia for paediatric brain MRI",
    scenario:
      "A 4-year-old needs GA for a 60-minute brain MRI with gadolinium. List the equipment and safety steps required before crossing into Zone IV.",
    working:
      "Pre-screen: implants, prior surgery, foreign bodies, eGFR. Gadolinium-based contrast agents (GBCAs) are stratified by risk: older high-risk linear GBCAs are contraindicated if eGFR <30 ml/min/1.73m², whereas the macrocyclic 'Group II' agents in current UK use carry a very low NSF risk and may be used with caution per MHRA/RCR guidance.\nEquipment: MR-conditional anaesthetic machine and monitor; non-ferrous laryngoscope and trolley; aluminium gas cylinders; long sampling line for capnography; long IV extensions; fibreoptic ECG cables to avoid burns.\nPersonnel: MR-trained anaesthetic team per the Association of Anaesthetists 2021 MRI safety guideline; checklist before each entry; remove all loose ferromagnetic items.\nMonitoring: SpO₂, EtCO₂, ECG (low-amplitude in field), NIBP; auditory alarms supplemented by visual alarms (acoustic noise inside bore).\nQuench plan: emergency O₂ source and route to remove patient if cryogen vents into room.",
    answer:
      "Use an MR-conditional anaesthetic machine with long circuits, non-ferromagnetic trolley/laryngoscope, fibreoptic monitoring, and check eGFR before gadolinium (selecting a macrocyclic Group II GBCA where renal function is impaired). Maintain access throughout the scan, brief the team on the quench drill per the Association of Anaesthetists 2021 MRI safety guideline, and use ear protection for the patient (≥99 dB acoustic noise during scanning).",
    cites: ["Assoc Anaesth 2021 (MRI)", "RCR GBCA", "MHRA GBCA"],
  },
];

const MRIPhysicsTopic = () => {
  return (
    <TopicTemplate
      title="MRI Physics"
      subtitle="Nuclear spin, precession, T1/T2 relaxation, and MRI safety for anaesthetists"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      topicId="mri-physics"
      topicTitle="MRI Physics"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={mriPhysicsQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["RCoA Primary — Physics", "RCoA Final — Physics"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        workedExamples: ["Assoc Anaesth 2021 (MRI)", "RCR GBCA", "MHRA GBCA", "Middleton Ch.17"],
        keyPoints: ["BJA Educ 2019", "Middleton Ch.17", "Assoc Anaesth 2021 (MRI)", "RCR GBCA"],
      }}
      keyPoints={[
        { text: "MRI uses hydrogen protons (¹H) which precess at the Larmor frequency ω₀ = γB₀ (42.58 MHz/T × field strength)", cites: ["BJA Educ 2019"] },
        { text: "An RF pulse at the Larmor frequency tips net magnetisation into the transverse plane (resonance condition)", cites: ["Middleton Ch.17"] },
        { text: "T1 (spin-lattice) = longitudinal recovery; T2 (spin-spin) = transverse decay; T2* includes field inhomogeneity", cites: ["Assoc Anaesth 2021 (MRI)"] },
        { text: "T1-weighted: fat bright, water dark (short TR/TE); T2-weighted: water bright, fat dark (long TR/TE) — 'WW2' mnemonic", cites: ["BJA Educ 2019"] },
        { text: "Gadolinium-based contrast: NSF risk is highest with older linear GBCAs at eGFR <30 ml/min/1.73m² and very low with modern macrocyclic Group II agents (RCR/MHRA)", cites: ["RCR GBCA", "MHRA GBCA"] },
        { text: "Three MRI hazards: missile effect (ferromagnetic projectiles), thermal burns (RF heating/SAR), device malfunction", cites: ["Assoc Anaesth 2021 (MRI)"] },
        { text: "Equipment labels: MR Safe (green), MR Conditional (yellow), MR Unsafe (red) — all anaesthetic equipment must be checked", cites: ["BJA Educ 2019"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Introduction" defaultOpen>
            <p className="text-muted-foreground leading-relaxed">
              MRI is increasingly used for diagnostic and interventional procedures requiring anaesthesia, particularly in
              paediatrics and neurosurgery. Understanding the fundamental physics of MRI is essential for safe anaesthetic practice
              in the MR environment. The unique hazards of strong magnetic fields make MRI anaesthesia a high-risk remote location
              requiring specific equipment, monitoring, and safety protocols.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="diagram" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Interactive Diagrams">
            <MRIPhysicsDiagram />
            <MRISuiteFloorPlanDiagram />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="nuclear-spin" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Nuclear Spin & Precession">
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="relaxation" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="T1 & T2 Relaxation">
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="safety" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="MRI Safety for Anaesthetists">
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
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="physics"
            pitfalls={[
              "MRI uses nuclear precession of ¹H in a strong static field (1.5 T or 3 T) — there is no ionising radiation.",
              "T1 (longitudinal) recovery — fat bright; T2 (transverse) decay — fluid bright.",
              "Zone IV is the magnet room; never bring ferromagnetic items inside. The field is always on, even when 'scanning' is not.",
              "Quench releases liquid helium → oxygen-displacing cold gas; activate emergency vent and evacuate.",
              "Anaesthetic risks: projectile injury, RF burns from looped cables/ECG leads, monitor compatibility, and pacemaker/implant safety check.",
            ]}
          />
          <TopicFaqs faqs={mriPhysicsFaqs} />

        </>
      }
    />
  );
};

export default MRIPhysicsTopic;
