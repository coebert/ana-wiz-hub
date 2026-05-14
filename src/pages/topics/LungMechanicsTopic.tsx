import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { SynthesisBlock } from "@/components/SynthesisBlock";
import { WorkedExample } from "@/components/WorkedExamples";
import { lungMechanicsQuiz } from "@/data/quizzes";
import { ComplianceDiagram } from "@/components/diagrams/ComplianceDiagram";
import { FlowVolumeLoopDiagram } from "@/components/diagrams/FlowVolumeLoopDiagram";
import { PVLoopWOBDiagram } from "@/components/diagrams/PVLoopWOBDiagram";
import { LungVolumesDiagram } from "@/components/diagrams/LungVolumesDiagram";
import { DeadSpaceDiagram } from "@/components/diagrams/DeadSpaceDiagram";
import { FowlersMethodDiagram } from "@/components/diagrams/FowlersMethodDiagram";
import { AlveolarGasEquationDiagram } from "@/components/diagrams/AlveolarGasEquationDiagram";
import { WestZonesDiagram } from "@/components/diagrams/WestZonesDiagram";
import { ClosingVolumeDiagram } from "@/components/diagrams/ClosingVolumeDiagram";
import { VentilatorWaveformsDiagram } from "@/components/diagrams/VentilatorWaveformsDiagram";
import LaplacesLawDiagram from "@/components/diagrams/LaplacesLawDiagram";
import { AutoPEEPDiagram } from "@/components/diagrams/AutoPEEPDiagram";
import { TranspulmonaryPressureDiagram } from "@/components/diagrams/TranspulmonaryPressureDiagram";
import { VILIDiagram } from "@/components/diagrams/VILIDiagram";
import { PVRecruitmentDiagram } from "@/components/diagrams/PVRecruitmentDiagram";
import { ControlOfBreathingDiagram } from "@/components/diagrams/ControlOfBreathingDiagram";
import { DiffusionCapacityDiagram } from "@/components/diagrams/DiffusionCapacityDiagram";
import { Exam } from "@/data/curriculum";

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
      keyPoints={[
        "Compliance = ΔV/ΔP. Total respiratory compliance (~100 ml/cmH₂O) = lung + chest wall in series.",
        "Static compliance uses plateau pressure; dynamic compliance uses peak pressure. Dynamic < static.",
        "Surfactant (DPPC from Type II pneumocytes) reduces surface tension and stabilises alveoli via Laplace's law (P = 2T/r).",
        "Major site of airway resistance: medium bronchi (generations 4-8), not small airways.",
        "Time constant τ = R × C. 3τ required for 95% equilibration. Heterogeneous τ causes V/Q mismatch.",
        "Normal WOB = 0.3-0.6 J/L, consuming 2-3% of VO₂. Can exceed 30% in respiratory failure.",
        "Driving pressure (Pplat − PEEP) > 15 cmH₂O independently predicts ARDS mortality (Amato 2015).",
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
            </section>
          </ExamSection>

          <ExamSection id="flow-volume-loops" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["RC_BK_02"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Flow-Volume Loops</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Flow-volume loops are essential for distinguishing obstructive from restrictive patterns and identifying upper airway obstruction.
              </p>
              <div className="bg-card rounded-xl border border-border p-4">
                <FlowVolumeLoopDiagram />
              </div>
            </section>
          </ExamSection>

          <ExamSection id="work-of-breathing" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RC_BK_01"]}>
            <section className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-foreground">Work of Breathing</h2>
              <p className="text-foreground/90 leading-relaxed mb-4">
                Work = Pressure × Volume (area on the PV loop). Normal WOB ≈ 0.3–0.6 J/L. Elastic work (overcoming compliance)
                dominates at normal breathing. Resistive work dominates during tachypnoea or in obstructive disease. Total WOB
                normally consumes 2–3% of total body oxygen consumption but can rise to &gt;30% in respiratory failure.
              </p>
              <div className="bg-card rounded-xl border border-border p-4">
                <PVLoopWOBDiagram />
              </div>
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
                The alveolar gas equation calculates PAO₂ from FiO₂, atmospheric pressure, and PaCO₂. It underpins the A-a gradient and assessment of gas exchange efficiency.
              </p>
              <div className="bg-card rounded-xl border border-border p-4">
                <AlveolarGasEquationDiagram />
              </div>
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
        </>
      }
    />
  );
};

export default LungMechanicsTopic;
