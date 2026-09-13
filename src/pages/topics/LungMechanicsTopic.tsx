import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { ExamSection } from "@/components/exam/ExamSection";
import { SynthesisBlock } from "@/components/topic/SynthesisBlock";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { lungMechanicsQuiz } from "@/data/quizzes";
import { ComplianceDiagram } from "@/components/diagrams/physiology/ComplianceDiagram";
import { FlowVolumeLoopDiagram } from "@/components/diagrams/physiology/FlowVolumeLoopDiagram";
import { PVLoopWOBDiagram } from "@/components/diagrams/physiology/PVLoopWOBDiagram";
import { LungVolumesDiagram } from "@/components/diagrams/physiology/LungVolumesDiagram";
import { DeadSpaceDiagram } from "@/components/diagrams/physiology/DeadSpaceDiagram";
import { FowlersMethodDiagram } from "@/components/diagrams/physiology/FowlersMethodDiagram";
import { AlveolarGasEquationDiagram } from "@/components/diagrams/physiology/AlveolarGasEquationDiagram";
import OxygenCascadeDiagram from "@/components/diagrams/physiology/OxygenCascadeDiagram";
import { WestZonesDiagram } from "@/components/diagrams/physiology/WestZonesDiagram";
import { ClosingVolumeDiagram } from "@/components/diagrams/physiology/ClosingVolumeDiagram";
import { VentilatorWaveformsDiagram } from "@/components/diagrams/physiology/VentilatorWaveformsDiagram";
import LaplacesLawDiagram from "@/components/diagrams/physiology/LaplacesLawDiagram";
import { AutoPEEPDiagram } from "@/components/diagrams/physiology/AutoPEEPDiagram";
import { TranspulmonaryPressureDiagram } from "@/components/diagrams/physiology/TranspulmonaryPressureDiagram";
import { VILIDiagram } from "@/components/diagrams/physiology/VILIDiagram";
import { PVRecruitmentDiagram } from "@/components/diagrams/physiology/PVRecruitmentDiagram";
import { ControlOfBreathingDiagram } from "@/components/diagrams/physiology/ControlOfBreathingDiagram";
import { DiffusionCapacityDiagram } from "@/components/diagrams/physiology/DiffusionCapacityDiagram";
import { Exam } from "@/data/curriculum";
import { InlineRef } from "@/components/references/InlineRef";

const lungMechanicsFaqs: Array<[string, string]> = [
  [
    "What is the difference between static and dynamic compliance?",
    "Static compliance = ΔV / (plateau pressure − PEEP) — measured at zero flow; reflects elastic properties of lung and chest wall. Normal 60–100 mL/cmH₂O. Dynamic compliance = ΔV / (peak − PEEP) — includes the resistive component, always lower than static. A widening gap between peak and plateau suggests increased airway resistance (bronchospasm, secretions, kinked tube)."
  ],
  [
    "Define FRC and explain why it falls under anaesthesia.",
    "Functional Residual Capacity = volume in the lungs at the end of normal tidal expiration ≈ 30 mL/kg (~2.4 L in a 70 kg adult). FRC falls 15–20 % on induction (loss of diaphragmatic tone, supine position, loss of intercostal activity), and another 30–40 % with paralysis. If FRC drops below closing capacity, small airways close in dependent zones → atelectasis and shunt — mitigated by PEEP, recruitment manoeuvres and lower FiO₂."
  ],
  [
    "State the equation of motion of the respiratory system.",
    "P = (V / C) + (Flow × R) + PEEP. Pressure applied to the airway = elastic component (volume ÷ compliance) + resistive component (flow × resistance) + baseline PEEP. Used to interpret ventilator waveforms: plateau pressure isolates the elastic load, peak − plateau isolates resistance."
  ]
];

const objectives = [
  "Define static and dynamic compliance and explain why dynamic < static.",
  "Describe the role of pulmonary surfactant and apply Laplace's law to alveolar stability.",
  "Locate the major site of airway resistance and explain the time constant (τ = R × C).",
  "Interpret flow-volume loops to distinguish obstructive, restrictive and upper-airway obstruction.",
  "Calculate work of breathing and identify when WOB becomes unsustainable.",
  "Apply lung-protective ventilation principles (Vt, plateau, driving pressure, mechanical power) to ARDS.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Driving pressure in ARDS",
    scenario: (
      <p>
        A 70 kg (PBW) ARDS patient is ventilated at Vt 420 mL, PEEP 12, plateau 28 cmH₂O.
        Calculate driving pressure and static compliance, and judge VILI risk.
      </p>
    ),
    working: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Driving pressure ΔP = P<sub>plat</sub> − PEEP = 28 − 12 = <strong>16 cmH₂O</strong>.</li>
        <li>Static C<sub>RS</sub> = Vt / ΔP = 420 / 16 ≈ <strong>26 mL/cmH₂O</strong> (severely reduced).</li>
        <li>Amato 2015: ΔP &gt; 15 cmH₂O independently predicts mortality in ARDS.</li>
      </ul>
    ),
    answer: (
      <p>
        ΔP 16 cmH₂O exceeds the safe threshold. Reduce Vt towards 4–5 mL/kg PBW, consider prone positioning
        and a recruitment-PEEP strategy; aim ΔP ≤ 14 cmH₂O.
      </p>
    ),
    cites: ["BJA Educ 2015"],
  },
  {
    title: "Time constants in severe asthma",
    scenario: (
      <p>
        A ventilated asthmatic has C 50 mL/cmH₂O and R 25 cmH₂O/L/s. The set respiratory rate is 20/min
        with I:E 1:2. Is expiration adequate?
      </p>
    ),
    working: (
      <ul className="list-disc pl-5 space-y-1">
        <li>τ = R × C = 25 × 0.05 = <strong>1.25 s</strong>.</li>
        <li>3τ (95% emptying) ≈ <strong>3.75 s</strong>.</li>
        <li>Total cycle at 20/min = 3 s; expiratory time = 2 s — well below 3τ → auto-PEEP.</li>
      </ul>
    ),
    answer: (
      <p>
        Expiration is too short. Reduce RR (e.g. 8–10/min), prolong expiratory time, accept permissive
        hypercapnia, and treat bronchospasm aggressively.
      </p>
    ),
    cites: ["Lumb Ch.2-3"],
  },
  {
    title: "Bohr equation in pulmonary embolism",
    scenario: (
      <p>
        A post-op patient develops sudden hypoxia. PaCO₂ 5.3 kPa, PĒCO₂ 2.1 kPa, Vt 500 mL.
        Estimate VD/VT and physiological dead space.
      </p>
    ),
    working: (
      <ul className="list-disc pl-5 space-y-1">
        <li>VD/VT = (PaCO₂ − PĒCO₂) / PaCO₂ = (5.3 − 2.1) / 5.3 = <strong>0.60</strong>.</li>
        <li>Physiological VD = 0.60 × 500 = <strong>300 mL</strong> (normal ≈ 150 mL).</li>
        <li>Doubled dead-space fraction with widened EtCO₂–PaCO₂ gap is classic for PE.</li>
      </ul>
    ),
    answer: <p>High VD/VT supports PE — escalate to CTPA, anticoagulate if no contraindication.</p>,
    cites: ["West Ch.7"],
  },
];

const LungMechanicsTopic = () => {
  return (
    <TopicTemplate
      title="Lung Mechanics"
      subtitle="FRCA Primary — Physiology"
      backPath="/physiology"
      backLabel="Physiology"
      accentColor="text-physiology"
      topicId="lung-mechanics"
      topicTitle="Lung Mechanics"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={lungMechanicsQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["RC_BK_01", "RC_BK_02"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["RC_BK_03"] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["RC_BK_01"] },
      }}
      sectionSources={{
        objectives: [
          "BJA Educ 2015",
          "West Ch.7",
          "Lumb Ch.2-3",
        ],
        keyPoints: [
          "BJA Educ 2015",
          "West Ch.7",
          "Lumb Ch.2-3",
        ],
        workedExamples: ["BJA Educ 2015", "Lumb Ch.2-3", "West Ch.7"],
      }}
      keyPoints={[
        { text: "Compliance = ΔV/ΔP. Total respiratory compliance (~100 ml/cmH₂O) = lung + chest wall in series.", cites: ["BJA Educ 2015"] },
        { text: "Static compliance uses plateau pressure; dynamic compliance uses peak pressure. Dynamic < static.", cites: ["Lumb Ch.2-3"] },
        { text: "Surfactant (DPPC from Type II pneumocytes) reduces surface tension and stabilises alveoli via Laplace's law (P = 2T/r).", cites: ["West Ch.7"] },
        { text: "Major site of airway resistance: medium bronchi (generations 4-8), not small airways.", cites: ["BJA Educ 2015"] },
        { text: "Time constant τ = R × C. 3τ required for 95% equilibration. Heterogeneous τ causes V/Q mismatch.", cites: ["Lumb Ch.2-3"] },
        { text: "Normal WOB = 0.3-0.6 J/L, consuming 2-3% of VO₂. Can exceed 30% in respiratory failure.", cites: ["West Ch.7"] },
        { text: "Driving pressure (Pplat − PEEP) > 15 cmH₂O independently predicts ARDS mortality (Amato 2015).", cites: ["BJA Educ 2015"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RC_BK_01"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
              <p className="text-foreground/90 leading-relaxed">
                Lung mechanics describes the forces that move air into and out of the lungs. Understanding compliance, resistance,
                time constants, surfactant, and the work of breathing is fundamental to ventilator management and respiratory physiology.
              </p>
            </section>
          </ExamSection>

          <ExamSection id="lung-volumes" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["RC_BK_01"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Lung Volumes & Capacities</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                The four primary lung volumes (IRV, TV, ERV, RV) combine to form four capacities (IC, FRC, VC, TLC). Only RV, FRC, and TLC cannot be measured by spirometry alone.
              </p>
              <div className="bg-card rounded-xl border border-border p-4">
                <LungVolumesDiagram />
              </div>
            </section>
          </ExamSection>

          <ExamSection id="compliance-curves" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RC_BK_01"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Compliance Curves</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Explore the pressure-volume relationship of the lung, chest wall, and total respiratory system.
              </p>
              <div className="bg-card rounded-xl border border-border p-6">
                <ComplianceDiagram />
              </div>
            </section>
          </ExamSection>

          <ExamSection id="compliance" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RC_BK_01"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Compliance</h2>
              <p className="text-foreground/90 leading-relaxed">
                <strong>Compliance = ΔV / ΔP</strong> (ml/cmH₂O). It measures the distensibility of the lung or chest wall.
                Normal lung compliance ≈ 200 ml/cmH₂O. Chest wall compliance ≈ 200 ml/cmH₂O. Total respiratory system compliance
                ≈ 100 ml/cmH₂O (reciprocals add: 1/Ctotal = 1/Clung + 1/Cchest wall).
              </p>
              <p className="text-foreground/90 leading-relaxed mt-3">
                <strong>Static compliance</strong> is measured at zero flow (plateau pressure). <strong>Dynamic compliance</strong>
                includes airway resistance effects (measured using peak pressure). Dynamic &lt; static because peak pressure &gt;
                plateau pressure.
              </p>
              <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
                <p className="text-sm font-medium text-foreground">Conditions Affecting Compliance</p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Decreased lung compliance</strong>: pulmonary fibrosis, ARDS, pulmonary oedema, atelectasis, pneumonia.
                  <strong> Decreased chest wall compliance</strong>: obesity, kyphoscoliosis, circumferential burns, abdominal
                  distension. <strong>Increased compliance</strong>: emphysema (loss of elastic recoil).
                </p>
              </div>
            </section>
          </ExamSection>

          <ExamSection id="laplaces-law" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RC_BK_01"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Laplace's Law</h2>
              <p className="text-foreground/90 leading-relaxed mt-2">
                <strong>Laplace's law</strong> relates the pressure across a curved surface to its
                wall tension and radius of curvature. For a <strong>sphere</strong> (two surfaces):
                <span className="font-mono"> P = 2T / r</span>; for a <strong>cylinder</strong>
                (single surface): <span className="font-mono">P = T / r</span>. The clinical
                significance is the same in both cases — for a given wall tension, pressure rises
                steeply as radius falls.
              </p>
              <p className="text-foreground/90 leading-relaxed mt-3">
                Applied to the lung, Laplace predicts that small alveoli (small r) would generate a
                higher inward pressure than large ones and empty into them — alveoli would be
                inherently unstable. <strong>Pulmonary surfactant</strong> resolves the paradox by
                lowering surface tension preferentially in smaller alveoli, equalising the
                distending pressures and preventing collapse. The same equation explains aneurysm
                rupture risk (rises with diameter), ventricular wall stress
                (<span className="font-mono">σ = P · r / 2h</span>), and the ease of bag-mask
                ventilation in larger vs collapsed airways.
              </p>
              <LaplacesLawDiagram />
            </section>
          </ExamSection>

          <ExamSection id="surfactant" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["RC_BK_01"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Surfactant</h2>
              <p className="text-foreground/90 leading-relaxed">
                Pulmonary surfactant is produced by <strong>Type II pneumocytes</strong> from 24 weeks gestation. The major
                component is <strong>dipalmitoylphosphatidylcholine (DPPC)</strong>. It reduces alveolar surface tension,
                preventing collapse according to Laplace's law: <strong>P = 2T/r</strong>.
              </p>
              <p className="text-foreground/90 leading-relaxed mt-3">
                Without surfactant, small alveoli (high P = 2T/r) would empty into large alveoli. Surfactant is more concentrated
                in smaller alveoli (greater surface tension reduction), equalising pressures and promoting alveolar stability.
                It also reduces transudation of fluid into alveoli and improves compliance.
              </p>
            </section>
          </ExamSection>

          <ExamSection id="airway-resistance" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RC_BK_01"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Airway Resistance</h2>
              <p className="text-foreground/90 leading-relaxed">
                <strong>Resistance = ΔP / Flow</strong> (cmH₂O/L/s). Normal airway resistance ≈ 1–2 cmH₂O/L/s. The major site
                of resistance is medium-sized bronchi (generations 4–8) — not the smallest airways, which have enormous total
                cross-sectional area in parallel.
              </p>
              <p className="text-foreground/90 leading-relaxed mt-3">
                Resistance increases with: bronchospasm, secretions, mucosal oedema, small ETT, high flow rates (turbulence).
                The <strong>time constant (τ = R × C)</strong> determines the speed of inflation/deflation. 3τ = 95% equilibration.
                Lung units with different time constants cause V/Q mismatch.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-2 text-sm">
                <div className="rounded-lg border border-border p-4"><h3 className="font-semibold text-foreground">Laminar flow: Poiseuille's law</h3><p className="mt-1 text-foreground/80">For steady laminar flow through a rigid tube, resistance is proportional to <strong>ηL/r⁴</strong>. Radius therefore dominates: halving radius increases resistance sixteen-fold. Gas viscosity matters more than density.</p></div>
                <div className="rounded-lg border border-border p-4"><h3 className="font-semibold text-foreground">Turbulent flow: Reynolds number</h3><p className="mt-1 text-foreground/80">Laminar flow has parallel streamlines; turbulent flow is disordered and requires a pressure gradient approximately proportional to flow². Reynolds number (<strong>Re = ρvd/η</strong>) predicts transition: high velocity, diameter or density favours turbulence, especially in the trachea and large bronchi. Here gas density matters more than viscosity. <InlineRef topicId="lung-mechanics" refLabel="Lumb Ch.2-3" /></p></div>
              </div>
            </section>
          </ExamSection>

          <ExamSection id="flow-volume-loops" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["RC_BK_02"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Flow-Volume Loops</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Flow-volume loops are essential for distinguishing obstructive from restrictive patterns and identifying upper airway obstruction.
              </p>
              <ul className="mb-4 grid md:grid-cols-2 gap-3 text-sm text-foreground/85">
                <li className="rounded-lg border border-border p-3"><strong>Normal:</strong> expiration rises rapidly to PEFR then declines; inspiration forms the smooth lower limb. FVC is loop width and FEF₂₅–₇₅% is mean mid-expiratory flow.</li>
                <li className="rounded-lg border border-border p-3"><strong>Obstructive:</strong> asthma/COPD produce reduced PEFR and a concave “scooped” expiratory limb from dynamic airway compression.</li>
                <li className="rounded-lg border border-border p-3"><strong>Restrictive:</strong> a small, narrow version of normal with reduced FVC but preserved or relatively high flow for lung volume.</li>
                <li className="rounded-lg border border-border p-3"><strong>Upper airway:</strong> fixed lesions flatten both limbs; variable extrathoracic lesions flatten inspiration; variable intrathoracic lesions flatten expiration.</li>
              </ul>
              <div className="bg-card rounded-xl border border-border p-4">
                <FlowVolumeLoopDiagram />
              </div>
            </section>
          </ExamSection>

          <ExamSection id="work-of-breathing" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RC_BK_01"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Work of Breathing</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Work = ∫P·dV, measured in joules and represented by area on the pressure–volume loop. Normal WOB is approximately 0.3–0.6 J/L and consumes only 1–3% of whole-body oxygen consumption, but may exceed 30% during respiratory distress, causing muscle fatigue and prompting ventilatory support.
              </p>
              <div className="grid md:grid-cols-3 gap-3 mb-4 text-sm"><div className="rounded-lg border border-border p-3"><strong>Elastic work</strong><p className="mt-1 text-foreground/80">Overcomes lung/chest-wall recoil. It rises in fibrosis, pulmonary oedema and ARDS and is represented by inspiratory work against the compliance curve.</p></div><div className="rounded-lg border border-border p-3"><strong>Resistive work</strong><p className="mt-1 text-foreground/80">Overcomes airway and tissue resistance. It rises in asthma, COPD and with a small ETT; the inspiratory–expiratory loop area reflects resistive loss.</p></div><div className="rounded-lg border border-border p-3"><strong>Inertial work</strong><p className="mt-1 text-foreground/80">Accelerates gas and respiratory tissues and is normally negligible.</p></div></div>
              <p className="text-sm text-foreground/80 mb-4">Patients minimise total work by taking rapid shallow breaths in restrictive disease (less elastic work per breath) and slower deeper breaths in obstructive disease (lower flow-related resistive work).</p>
              <div className="bg-card rounded-xl border border-border p-4">
                <PVLoopWOBDiagram />
              </div>
              <div className="mt-4 space-y-3 text-sm text-foreground/85"><p><strong>Factors increasing elastic work:</strong> ARDS, pulmonary oedema, pulmonary fibrosis, atelectasis, obesity and abdominal distension (chest-wall elastance), plus large tidal volumes and PEEP that pushes tidal breathing onto the flat upper part of the compliance curve.</p><p><strong>Factors increasing resistive work:</strong> asthma, COPD, bronchospasm and secretions, laryngeal or tracheal narrowing, a small or kinked tracheal tube, HME/filter obstruction, high inspiratory flow and turbulent flow (resistance ∝ 1/r⁵ for turbulent flow, 1/r⁴ for laminar flow).</p><p><strong>How ventilators unload the patient:</strong> pressure support or pressure-control breaths supply the elastic and resistive work; adequate applied PEEP offsets auto-PEEP so less effort is needed to trigger; flow-triggering, appropriate rise time and cycling-off criteria, and automatic tube compensation reduce trigger and tube work; correcting patient–ventilator dyssynchrony removes wasted effort.</p><p><strong>Pressure–time product (PTP)</strong> = ∫(P<sub>mus</sub>·dt) over inspiration, derived from oesophageal pressure. Because inspiratory muscles also consume oxygen during isometric contraction that produces no volume change (as in ineffective triggering or complete airway obstruction), PTP tracks the metabolic cost of breathing better than mechanical work does <InlineRef topicId="lung-mechanics" refLabel="Lumb Ch.2-3" />.</p></div>
            </section>
          </ExamSection>

          <ExamSection id="dead-space" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RC_BK_02"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Dead Space & V/Q Mismatch</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Dead space is the portion of tidal volume that does not participate in gas exchange. Physiological dead space = anatomical + alveolar dead space.
                The Bohr equation quantifies the dead space fraction. V/Q mismatch is the most common cause of hypoxaemia in clinical practice.
              </p>
              <div className="bg-card rounded-xl border border-border p-4">
                <DeadSpaceDiagram />
              </div>

              <h3 className="text-xl font-serif font-semibold text-foreground mt-8 mb-3">
                Fowler's Method — Measuring Anatomical Dead Space
              </h3>
              <p className="text-foreground/90 leading-relaxed mb-3">
                Described by <strong>Ward Fowler in 1948</strong>, this single-breath nitrogen washout remains the
                reference technique for <strong>anatomical</strong> dead space (the volume of conducting airways from the
                lips to the respiratory bronchioles, where no gas exchange occurs). Anatomical V<sub>D</sub> ≈
                <strong> 2 mL/kg</strong> (~150 mL in a 70 kg adult).
              </p>
              <p className="text-foreground/90 leading-relaxed mb-3">
                <strong>Method:</strong> the subject takes a single vital-capacity breath of <strong>100% O₂</strong>
                (washing N₂ out of the conducting airways but not the alveoli, where N₂ is diluted by O₂ from the FRC).
                They then exhale slowly through a <em>rapid-response nitrogen analyser</em> while exhaled volume is recorded
                simultaneously by a spirometer. Plotting expired [N₂] against exhaled volume gives the
                <em> nitrogen expirogram</em> with three characteristic phases:
              </p>
              <ul className="list-disc pl-6 text-foreground/90 mb-4 space-y-1">
                <li><strong>Phase I</strong> — pure dead-space gas (100% O₂, [N₂] = 0).</li>
                <li><strong>Phase II</strong> — rapid S-shaped rise as mixed dead-space and alveolar gas reaches the analyser.</li>
                <li><strong>Phase III</strong> — alveolar plateau. In health it is nearly flat; in disease (COPD, asthma, ageing) it slopes upwards owing to <em>uneven emptying</em> of slow alveolar compartments containing more N₂.</li>
              </ul>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Anatomical dead space is found graphically by the <strong>equal-area construction</strong>: a vertical
                line is drawn through phase II such that the area <em>between the curve and the plateau on its left</em>
                (triangle A) equals the area <em>between the plateau and the curve on its right</em> (triangle B). The
                volume on the x-axis at that vertical is V<sub>D(anat)</sub>.
              </p>
              <div className="bg-card rounded-xl border border-border p-4">
                <FowlersMethodDiagram />
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mt-4 text-sm">
                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <p className="font-semibold text-foreground mb-1">Fowler vs Bohr — what does each measure?</p>
                  <ul className="list-disc pl-4 text-foreground/85 space-y-1">
                    <li><strong>Fowler</strong> → <em>anatomical</em> V<sub>D</sub> (volume of conducting airways).</li>
                    <li><strong>Bohr</strong> (V<sub>D</sub>/V<sub>T</sub> = (PaCO₂ − P<sub>E</sub>CO₂)/PaCO₂) → <em>physiological</em> V<sub>D</sub> (anatomical + alveolar).</li>
                    <li>Difference = <strong>alveolar dead space</strong>; raised in PE, hypotension, IPPV with high airway pressures.</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-border bg-muted/30 p-3">
                  <p className="font-semibold text-foreground mb-1">Factors that change anatomical V<sub>D</sub></p>
                  <ul className="list-disc pl-4 text-foreground/85 space-y-1">
                    <li>↑ Posture (standing &gt; supine), large tidal volume, neck extension, bronchodilators, age.</li>
                    <li>↓ Tracheostomy / cricothyroidotomy (reduces V<sub>D</sub> by ~50%).</li>
                    <li>Apparatus dead space (HME, catheter mount, mask) <em>adds</em> to V<sub>D</sub>.</li>
                  </ul>
                </div>
              </div>
            </section>
          </ExamSection>

          <ExamSection id="alveolar-gas" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RC_BK_02"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Alveolar Gas Equation & Oxygen Cascade</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                The <strong>oxygen cascade</strong> describes the stepwise fall in PO₂ from atmospheric air to
                the mitochondrion. Each step represents a physiological loss: humidification dilutes inspired
                O₂ with water vapour; alveolar gas is further diluted by CO₂ excretion (alveolar gas equation);
                a small A–a gradient is created by physiological V/Q mismatch and anatomical shunt; tissue
                offloading drops capillary PO₂; and the mitochondrion sits just above the <em>Pasteur point</em>
                (~0.5–3 kPa), below which oxidative phosphorylation fails and anaerobic metabolism takes over.
                Understanding the cascade lets you predict where hypoxaemia arises — high altitude affects the
                first step, hypoventilation the third, V/Q mismatch the fourth, and circulatory failure the
                fifth.
              </p>
              <div className="bg-card rounded-xl border border-border p-4 mb-4">
                <OxygenCascadeDiagram />
              </div>
              <p className="text-foreground/90 leading-relaxed mb-4">
                The alveolar gas equation underpins the second-to-third step (humidified inspired → alveolar)
                and is the basis of the A–a gradient calculation used to assess gas exchange efficiency.
              </p>
              <div className="bg-card rounded-xl border border-border p-4 mb-4">
                <AlveolarGasEquationDiagram />
              </div>

              {/* Cause → cascade step mapping */}
              <h3 className="text-lg font-serif font-semibold text-foreground mt-6 mb-2">
                Causes of hypoxaemia mapped to the cascade
              </h3>
              <p className="text-foreground/80 text-sm leading-relaxed mb-3">
                Identifying <em>where</em> in the cascade a patient's PO₂ first falls below normal
                points directly at the mechanism — and at the appropriate intervention.
              </p>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/40 text-foreground">
                    <tr>
                      <th className="text-left px-3 py-2 font-semibold">Cause</th>
                      <th className="text-left px-3 py-2 font-semibold">Step primarily affected</th>
                      <th className="text-left px-3 py-2 font-semibold">A–a gradient</th>
                      <th className="text-left px-3 py-2 font-semibold">Response to 100 % O₂</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-3 py-2 font-medium">Low FiO₂ / altitude</td>
                      <td className="px-3 py-2">1 — Atmospheric / inspired</td>
                      <td className="px-3 py-2">Normal</td>
                      <td className="px-3 py-2">Corrects</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium">Airway obstruction / apnoea</td>
                      <td className="px-3 py-2">2 — Humidified inspired (no fresh gas reaches alveoli)</td>
                      <td className="px-3 py-2">Normal</td>
                      <td className="px-3 py-2">Corrects once airway patent</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium">Hypoventilation (opioids, NMB, COPD type II)</td>
                      <td className="px-3 py-2">3 — Alveolar (↑ PaCO₂ ⇒ ↓ P<sub>A</sub>O₂ via gas equation)</td>
                      <td className="px-3 py-2">Normal</td>
                      <td className="px-3 py-2">Corrects</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium">Diffusion limitation (fibrosis, exercise at altitude)</td>
                      <td className="px-3 py-2">3 → 4 — Alveolar to arterial</td>
                      <td className="px-3 py-2">Widened</td>
                      <td className="px-3 py-2">Largely corrects</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium">V/Q mismatch (asthma, PE, atelectasis)</td>
                      <td className="px-3 py-2">4 — Arterial (regional units with low V/Q)</td>
                      <td className="px-3 py-2">Widened</td>
                      <td className="px-3 py-2">Corrects</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium">Shunt (ARDS, pneumonia, intracardiac)</td>
                      <td className="px-3 py-2">4 — Arterial (deoxygenated blood bypasses alveoli)</td>
                      <td className="px-3 py-2">Widened</td>
                      <td className="px-3 py-2"><strong>Does not correct</strong> (hallmark)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium">Low cardiac output / anaemia</td>
                      <td className="px-3 py-2">5 — Capillary (↓ delivery ⇒ greater extraction ⇒ ↓ PvO₂)</td>
                      <td className="px-3 py-2">Normal (PaO₂ preserved)</td>
                      <td className="px-3 py-2">Only partial — fix the circulation</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 font-medium">Histotoxic (cyanide, sepsis mitochondrial dysfunction)</td>
                      <td className="px-3 py-2">6 — Mitochondrial (O₂ delivered but not utilised)</td>
                      <td className="px-3 py-2">Normal</td>
                      <td className="px-3 py-2">No effect — treat the toxin</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Clinical pearl: the <strong>shunt vs V/Q</strong> distinction is the most exam-relevant —
                only shunt fails to respond to 100 % oxygen because the bypassing blood never sees the alveolus.
              </p>
            </section>
          </ExamSection>

          <ExamSection id="west-zones" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["RC_BK_02"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">West's Lung Zones</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                West's zones describe how the relationship between alveolar (PA), arterial (Pa), and venous (Pv) pressures
                determines regional blood flow distribution. Gravity creates a hydrostatic pressure gradient from apex to base.
              </p>
              <div className="bg-card rounded-xl border border-border p-4">
                <WestZonesDiagram />
              </div>
              <div className="mt-4 space-y-3 text-sm text-foreground/85">
                <p>
                  In the upright lung, pulmonary arterial pressure falls by about 1 cmH₂O per centimetre of vertical height
                  (roughly 20–25 cmH₂O apex to base), while alveolar pressure is essentially uniform. The interaction of the
                  three pressures therefore differs by region <InlineRef topicId="lung-mechanics" refLabel="West Ch.7" />.
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Zone 1 (apex) — P<sub>A</sub> &gt; P<sub>a</sub> &gt; P<sub>v</sub>:</strong> alveolar pressure compresses the capillary throughout the cardiac cycle, so there is no flow. This is alveolar dead space (ventilation without perfusion, high V/Q). Zone 1 does not exist in the healthy upright subject because apical arterial pressure just exceeds alveolar pressure.</li>
                  <li><strong>Zone 2 (mid-zone) — P<sub>a</sub> &gt; P<sub>A</sub> &gt; P<sub>v</sub>:</strong> intermittent flow occurring only when arterial pressure exceeds alveolar pressure. Flow depends on the arterial–alveolar difference, not the arteriovenous difference — the "vascular waterfall" or Starling-resistor behaviour, so flow rises steadily down the zone as P<sub>a</sub> increases.</li>
                  <li><strong>Zone 3 (base) — P<sub>a</sub> &gt; P<sub>v</sub> &gt; P<sub>A</sub>:</strong> continuous flow determined by the arteriovenous pressure difference. Further increases in flow down this zone reflect capillary distension and recruitment. V/Q is low here because perfusion increases down the lung more steeply than ventilation.</li>
                  <li><strong>Zone 4 (most dependent) — interstitial compression:</strong> at low lung volumes, increased interstitial pressure around extra-alveolar vessels raises resistance and reduces flow again. Zone 4 enlarges with pulmonary oedema and at volumes near residual volume <InlineRef topicId="lung-mechanics" refLabel="Lumb Ch.2-3" />.</li>
                </ul>
                <p>
                  <strong>V/Q consequences:</strong> both ventilation and perfusion increase towards the base, but perfusion increases
                  more, so V/Q falls from about 3.0 at the apex to about 0.6 at the base. The apex behaves like dead space and the
                  base like a shunt; overall this gradient accounts for part of the normal alveolar–arterial oxygen difference.
                </p>
                <p>
                  <strong>Factors that alter the zones:</strong> positive pressure ventilation and PEEP raise alveolar pressure and so
                  expand zone 1 and 2 conditions, increasing alveolar dead space — pronounced if hypovolaemia or haemorrhage
                  simultaneously lowers P<sub>a</sub>. Hypotension and pulmonary embolism similarly create zone 1. Exercise raises
                  pulmonary arterial pressure, recruiting and distending apical vessels so the whole lung behaves as zone 3 with more
                  uniform V/Q. The supine position abolishes the vertical gradient (replacing it with an antero-posterior one), and
                  prone positioning produces more uniform perfusion — one reason it improves oxygenation in ARDS. Hypoxic pulmonary
                  vasoconstriction and interstitial oedema modify the pattern further.
                </p>
              </div>
            </section>
          </ExamSection>

          <ExamSection id="closing-volume" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["RC_BK_01"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Closing Volume & Closing Capacity</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                The single-breath nitrogen washout test measures closing volume — the lung volume at which dependent airways begin to close.
                When closing capacity exceeds FRC, airway closure occurs during tidal breathing, causing V/Q mismatch and hypoxaemia.
              </p>
              <div className="bg-card rounded-xl border border-border p-4">
                <ClosingVolumeDiagram />
              </div>
              <div className="mt-4 space-y-3 text-sm text-foreground/85"><p><strong>Definitions:</strong> closing volume (CV) is the volume above residual volume at which dependent small airways begin to close; closing capacity (CC) = CV + RV, so CC is the absolute lung volume at which closure starts. In a healthy young adult CC is well below FRC (roughly 10% of TLC above RV).</p><p><strong>Measurement:</strong> the single-breath nitrogen washout — a vital-capacity breath of 100% oxygen, then a slow full expiration with continuous nitrogen measurement. Phase I is dead-space gas (no N₂), phase II the mixed transition, phase III the alveolar plateau, and the abrupt upward inflection of <strong>phase IV</strong> marks airway closure in dependent lung, because the remaining gas comes from apical units with a higher nitrogen concentration. The volume expired from that inflection to RV is the closing volume.</p><p><strong>Factors increasing CC:</strong> age (CC equals FRC at about 44 years supine and 66 years erect), smoking and chronic airflow limitation, supine posture, obesity, pulmonary oedema and bronchospasm. FRC is reduced by supine position, general anaesthesia, neuromuscular blockade, obesity, pregnancy and abdominal surgery.</p><p><strong>Clinical significance:</strong> when CC exceeds FRC, dependent airways close during normal tidal breathing, producing shunt, V/Q mismatch, atelectasis and hypoxaemia. Anaesthesia lowers FRC by 15–20% within minutes of induction, commonly taking it below CC — hence pre-oxygenation desaturates faster, and PEEP, recruitment manoeuvres, head-up positioning and avoidance of high FiO₂-related absorption atelectasis are used to restore FRC above CC <InlineRef topicId="lung-mechanics" refLabel="West Ch.7" />.</p></div>
            </section>
          </ExamSection>

          <ExamSection id="ventilator-waveforms" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["RC_BK_03"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Ventilator Waveforms</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Understanding pressure-time, flow-time, and volume-time waveforms is essential for ventilator management.
                Each mode produces characteristic patterns that change with compliance and resistance.
              </p>
              <div className="bg-card rounded-xl border border-border p-4">
                <VentilatorWaveformsDiagram />
              </div>
            </section>
          </ExamSection>

          <ExamSection id="auto-peep" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["RC_BK_03"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Auto-PEEP & Air Trapping</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Auto-PEEP (intrinsic PEEP) occurs when expiratory time is insufficient for complete lung emptying.
                Air trapping increases end-expiratory lung volume, raises intrathoracic pressure, and increases the work of triggering.
              </p>
              <div className="grid gap-3 md:grid-cols-2 mb-4 text-sm">
                <div className="rounded-lg border border-border p-4"><h3 className="font-semibold text-foreground">Causes and consequences</h3><p className="mt-1 text-foreground/80">High minute ventilation, a long inspiratory time, short expiratory time, and increased expiratory resistance in asthma or COPD prevent complete emptying. Dynamic hyperinflation raises alveolar pressure, impedes venous return and may cause hypotension; a spontaneously breathing patient must first overcome intrinsic PEEP, increasing trigger work and dyspnoea.</p></div>
                <div className="rounded-lg border border-border p-4"><h3 className="font-semibold text-foreground">Measure and manage</h3><p className="mt-1 text-foreground/80">Suspect persistent expiratory flow at the next inspiration. In a passive patient, an <strong>end-expiratory hold</strong> equilibrates alveolar and airway pressure; total PEEP minus set external PEEP estimates auto-PEEP. Reduce respiratory rate and tidal volume, shorten inspiratory time by increasing inspiratory flow, allow a longer expiratory phase, treat bronchospasm and clear obstruction. In severe hypotension, briefly disconnecting the circuit permits decompression. <InlineRef topicId="lung-mechanics" refLabel="Lumb Ch.2-3" /></p></div>
              </div>
              <div className="bg-card rounded-xl border border-border p-4">
                <AutoPEEPDiagram />
              </div>
            </section>
          </ExamSection>

          <ExamSection id="transpulmonary" exams={[Exam.FFICM]} curriculumCodes={["RC_BK_03"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Transpulmonary Pressure & Oesophageal Manometry</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Transpulmonary pressure (PTP = Paw − Ppl) represents the true distending pressure of the lung.
                Oesophageal manometry estimates pleural pressure, enabling PEEP optimisation particularly in obesity and ARDS
                where chest wall elastance is elevated.
              </p>
              <div className="bg-card rounded-xl border border-border p-4">
                <TranspulmonaryPressureDiagram />
              </div>
            </section>
          </ExamSection>

          <ExamSection id="vili" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["RC_BK_03"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">VILI: Stress, Strain & Mechanical Power</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Ventilator-induced lung injury results from excessive stress (transpulmonary pressure) and strain (tidal deformation relative to FRC).
                Mechanical power unifies VT, driving pressure, RR, flow, and PEEP into a single energy-based metric for VILI risk assessment.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm"><div className="rounded-lg border border-border p-4"><h3 className="font-semibold text-foreground">Stress</h3><p className="mt-1 text-foreground/80">Force per unit lung area, clinically approximated by transpulmonary pressure: P<sub>L</sub> = P<sub>aw</sub> − P<sub>pl</sub>. Plateau and driving pressure are practical surrogates when pleural pressure is unavailable.</p></div><div className="rounded-lg border border-border p-4"><h3 className="font-semibold text-foreground">Strain</h3><p className="mt-1 text-foreground/80">Deformation relative to resting lung volume: dynamic strain ≈ Vt/FRC; static strain reflects the PEEP-related increase in end-expiratory volume. Global strain above roughly 1.5–2 is injurious, and large dynamic strain is generally more damaging than equivalent static strain <InlineRef topicId="lung-mechanics" refLabel="Crit Care Med 2013 Stress Strain" />.</p></div></div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-4 text-sm">
                <div className="rounded-lg border border-border p-3"><h3 className="font-semibold text-foreground">Barotrauma</h3><p className="mt-1 text-foreground/80">High distending pressure causes macroscopic air leak, including pneumothorax, pneumomediastinum and surgical emphysema.</p></div>
                <div className="rounded-lg border border-border p-3"><h3 className="font-semibold text-foreground">Volutrauma</h3><p className="mt-1 text-foreground/80">Excessive regional volume and strain overdistend the small functional “baby lung”, disrupting alveolar and endothelial barriers.</p></div>
                <div className="rounded-lg border border-border p-3"><h3 className="font-semibold text-foreground">Atelectrauma</h3><p className="mt-1 text-foreground/80">Repeated recruitment and collapse of unstable units generates damaging shear stress at interfaces between aerated and collapsed lung.</p></div>
                <div className="rounded-lg border border-border p-3"><h3 className="font-semibold text-foreground">Biotrauma</h3><p className="mt-1 text-foreground/80">Injurious forces activate inflammatory signalling and cytokine release; systemic spill-over can contribute to remote multi-organ dysfunction. <InlineRef topicId="lung-mechanics" refLabel="Crit Care 2022 VILI Vortex" /></p></div>
              </div>
              <p className="text-sm text-foreground/80 mb-4">Low Vt limits dynamic strain; limiting plateau pressure and driving pressure limits stress. PEEP may prevent cyclic collapse but becomes harmful if it overdistends already open lung.</p>
              <div className="bg-card rounded-xl border border-border p-4">
                <VILIDiagram />
              </div>
            </section>
          </ExamSection>

          <ExamSection id="pv-recruitment" exams={[Exam.FFICM]} curriculumCodes={["RC_BK_03"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">PV Recruitment Curve & Hysteresis</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                The static pressure-volume curve reveals lower and upper inflection points that guide PEEP and plateau pressure targets.
                Hysteresis between inflation and deflation limbs demonstrates that recruited alveoli remain open at lower pressures than required to initially open them.
              </p>
              <div className="bg-card rounded-xl border border-border p-4">
                <PVRecruitmentDiagram />
              </div>
              <div className="mt-4 rounded-lg border border-border bg-secondary/30 p-4">
                <h3 className="font-semibold text-foreground">What is hysteresis?</h3>
                <p className="mt-2 text-sm text-foreground/85 leading-relaxed">
                  <strong>Hysteresis</strong> is the difference between the inflation and deflation limbs of the
                  static pressure-volume curve — at any given pressure, lung volume is lower on the way up
                  (inflation) than on the way down (deflation). More pressure is needed to <em>open</em> a collapsed
                  alveolus than to <em>keep it open</em>, for three related reasons: by Laplace's law, the pressure
                  needed to expand a sphere is inversely related to its radius, so a small, collapsed alveolus needs
                  a disproportionately high opening pressure; individual units have different critical opening
                  (recruitment) thresholds, so they recruit progressively rather than all at once; and surfactant
                  needs time and a change in interfacial surface area to reorganise at the air-liquid interface and
                  lower surface tension, so its stabilising effect is greater on deflation than on inflation. The
                  curve therefore shows a <strong>lower inflection point (LIP)</strong>, below which most recruitment
                  occurs, and an <strong>upper inflection point (UIP)</strong>, above which the curve flattens as
                  units become fully distended.
                </p>
                <svg viewBox="0 0 340 220" className="w-full h-auto mt-3" role="img" aria-label="Static pressure-volume loop showing separate inflation and deflation limbs with arrows indicating direction of travel, and the lower and upper inflection points marked">
                  <line x1="45" y1="190" x2="45" y2="20" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="45" y1="190" x2="310" y2="190" stroke="currentColor" strokeWidth="1.5" />
                  <text x="8" y="105" className="fill-muted-foreground" fontSize="10" transform="rotate(-90,8,105)">Volume</text>
                  <text x="177" y="210" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Pressure</text>
                  <path d="M 50 185 C 90 183, 130 175, 160 140 C 185 112, 210 95, 260 85"
                    fill="none" stroke="hsl(210 70% 45%)" strokeWidth="2.5" />
                  <polygon points="258,80 268,86 256,92" fill="hsl(210 70% 45%)" />
                  <text x="220" y="70" className="fill-foreground" fontSize="9" fontWeight="600">Inflation</text>
                  <path d="M 260 85 C 220 78, 170 68, 130 62 C 95 57, 65 55, 50 55"
                    fill="none" stroke="hsl(35 80% 45%)" strokeWidth="2.5" strokeDasharray="0" />
                  <polygon points="55,52 44,55 55,60" fill="hsl(35 80% 45%)" />
                  <text x="130" y="45" className="fill-foreground" fontSize="9" fontWeight="600">Deflation</text>
                  <circle cx="160" cy="140" r="4" fill="hsl(0 70% 50%)" />
                  <text x="166" y="150" className="fill-foreground" fontSize="9" fontWeight="600">LIP</text>
                  <circle cx="230" cy="90" r="4" fill="hsl(0 70% 50%)" />
                  <text x="236" y="85" className="fill-foreground" fontSize="9" fontWeight="600">UIP</text>
                  <text x="120" y="130" className="fill-muted-foreground" fontSize="8">deflation limb lies above inflation limb —</text>
                  <text x="120" y="140" className="fill-muted-foreground" fontSize="8">recruited alveoli stay open at lower pressure</text>
                </svg>
                <p className="mt-2 text-sm text-foreground/85 leading-relaxed">
                  <strong>Clinical relevance:</strong> under anaesthesia, opening pressures around{" "}
                  <strong>40 cmH₂O</strong> are typically needed to reopen collapsed alveoli during a recruitment
                  manoeuvre, but far lower pressures — set on the <strong>deflation limb</strong> — will keep them
                  open, which is why PEEP is titrated downward from a recruited state (a{" "}
                  <strong>decremental PEEP trial</strong>) rather than read directly off the inflation limb. If PEEP
                  is set too low, units cyclically reopen on inspiration and collapse on expiration, generating shear
                  stress at the interface between aerated and collapsed lung — <strong>atelectrauma</strong>{" "}
                  <InlineRef topicId="lung-mechanics" refLabel="BJA 1999 Recruitment" />.
                </p>
              </div>
              <div className="mt-4 space-y-3 text-sm text-foreground/85"><p><strong>Goal:</strong> reopen atelectatic units, improve compliance and gas exchange, and “unshrink” the functional baby lung. Methods include sustained inflation (classically 40 cmH₂O for 40 s), stepwise PEEP/driving-pressure increments, or pressure-controlled ventilation at high PEEP <InlineRef topicId="lung-mechanics" refLabel="BJA 1999 Recruitment" />.</p><p><strong>After recruitment:</strong> titrate down to an “open-lung PEEP” that prevents re-collapse without overdistension, following oxygenation, dynamic compliance, driving pressure and—where available—electrical impedance tomography.</p><p><strong>Risks:</strong> reduced venous return and cardiac output, hypotension, barotrauma/pneumothorax and volutrauma. Avoid routine aggressive recruitment in haemodynamic instability, untreated pneumothorax or predominantly focal lung disease; use selectively in ARDS or to reverse anaesthesia-related atelectasis.</p></div>
            </section>
          </ExamSection>

          <ExamSection id="control-of-breathing" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RC_BK_01"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Control of Breathing</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Respiratory drive is generated by medullary and pontine centres, modulated by central and peripheral chemoreceptors
                responding to CO₂, O₂, and pH. Understanding these response curves is essential for managing ventilation under anaesthesia
                and in critical illness.
              </p>
              <div className="bg-card rounded-xl border border-border p-4">
                <ControlOfBreathingDiagram />
              </div>
            </section>
          </ExamSection>

          <ExamSection id="diffusion" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["RC_BK_02"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Diffusion & Gas Transfer</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Gas transfer across the alveolar-capillary membrane is governed by Fick's law of diffusion.
                DLCO (transfer factor) measures the lung's ability to transfer gas and is determined by membrane conductance and
                red cell uptake capacity.
              </p>
              <div className="bg-card rounded-xl border border-border p-4">
                <DiffusionCapacityDiagram />
              </div>
            </section>
          </ExamSection>

          <ExamSection id="synthesis" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RC_BK_01"]}>
            <SynthesisBlock
              title="Lung Mechanics — High-Yield Numbers"
              subtitle="The values you'll be asked to reproduce in a viva."
              variant="table"
            >
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left p-2 text-foreground font-semibold">Parameter</th>
                    <th className="text-left p-2 text-foreground font-semibold">Normal value</th>
                    <th className="text-left p-2 text-foreground font-semibold">Significance</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/90">
                  {[
                    ["Tidal volume (Vt)", "6–8 ml/kg PBW", "Lung-protective in ARDS: 6 ml/kg"],
                    ["FRC", "30 ml/kg (~2.5 L)", "↓ supine, pregnancy, GA, obesity — risk of atelectasis"],
                    ["Closing capacity", "≈FRC by age 44 (supine) / 66 (erect)", "If CC > FRC → V/Q mismatch + hypoxaemia"],
                    ["Anatomical dead space", "2 ml/kg (~150 ml)", "Includes ETT/circuit in ventilated patient"],
                    ["Static compliance", "60–100 ml/cmH₂O", "↓ ARDS, fibrosis; ↑ emphysema"],
                    ["Airway resistance", "1–2 cmH₂O/L/s", "↑ asthma, COPD, ETT (esp. small bore)"],
                    ["DLCO", "20–30 ml/min/mmHg", "↓ emphysema, fibrosis, anaemia, PE"],
                    ["Time constant (τ)", "C × R ≈ 0.5 s", "3τ ≈ complete expiration; ↑ in obstructive disease"],
                  ].map(([p, val, sig]) => (
                    <tr key={p as string} className="border-b border-border/50">
                      <td className="p-2 font-medium">{p}</td>
                      <td className="p-2 text-muted-foreground">{val}</td>
                      <td className="p-2 text-muted-foreground">{sig}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SynthesisBlock>
          </ExamSection>
          <TopicFaqs faqs={lungMechanicsFaqs} />

        </>
      }
    />
  );
};

export default LungMechanicsTopic;
