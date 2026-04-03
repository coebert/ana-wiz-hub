import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { lungMechanicsQuiz } from "@/data/quizzes";
import { ComplianceDiagram } from "@/components/diagrams/ComplianceDiagram";
import { FlowVolumeLoopDiagram } from "@/components/diagrams/FlowVolumeLoopDiagram";
import { PVLoopWOBDiagram } from "@/components/diagrams/PVLoopWOBDiagram";
import { LungVolumesDiagram } from "@/components/diagrams/LungVolumesDiagram";
import { DeadSpaceDiagram } from "@/components/diagrams/DeadSpaceDiagram";
import { AlveolarGasEquationDiagram } from "@/components/diagrams/AlveolarGasEquationDiagram";
import { WestZonesDiagram } from "@/components/diagrams/WestZonesDiagram";
import { ClosingVolumeDiagram } from "@/components/diagrams/ClosingVolumeDiagram";
import { VentilatorWaveformsDiagram } from "@/components/diagrams/VentilatorWaveformsDiagram";
import { AutoPEEPDiagram } from "@/components/diagrams/AutoPEEPDiagram";
import { TranspulmonaryPressureDiagram } from "@/components/diagrams/TranspulmonaryPressureDiagram";
import { VILIDiagram } from "@/components/diagrams/VILIDiagram";
import { PVRecruitmentDiagram } from "@/components/diagrams/PVRecruitmentDiagram";
import { ControlOfBreathingDiagram } from "@/components/diagrams/ControlOfBreathingDiagram";

const LungMechanicsTopic = () => {
  return (
    <SectionLayout
      title="Lung Mechanics"
      subtitle="FRCA Primary — Physiology"
      backPath="/physiology"
      backLabel="Physiology"
      accentColor="text-physiology"
    >
      <div className="prose prose-slate max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
          <p className="text-foreground/90 leading-relaxed">
            Lung mechanics describes the forces that move air into and out of the lungs. Understanding compliance, resistance,
            time constants, surfactant, and the work of breathing is fundamental to ventilator management and respiratory physiology.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Lung Volumes & Capacities</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            The four primary lung volumes (IRV, TV, ERV, RV) combine to form four capacities (IC, FRC, VC, TLC). Only RV, FRC, and TLC cannot be measured by spirometry alone.
          </p>
          <div className="bg-card rounded-xl border border-border p-4">
            <LungVolumesDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Compliance Curves</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Explore the pressure-volume relationship of the lung, chest wall, and total respiratory system.
          </p>
          <div className="bg-card rounded-xl border border-border p-6">
            <ComplianceDiagram />
          </div>
        </section>

        <section className="mb-10">
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

        <section className="mb-10">
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

        <section className="mb-10">
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

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Flow-Volume Loops</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Flow-volume loops are essential for distinguishing obstructive from restrictive patterns and identifying upper airway obstruction.
          </p>
          <div className="bg-card rounded-xl border border-border p-4">
            <FlowVolumeLoopDiagram />
          </div>
        </section>

        <section className="mb-10">
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
      </div>

      <div className="prose prose-slate max-w-none mb-10">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Dead Space & V/Q Mismatch</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Dead space is the portion of tidal volume that does not participate in gas exchange. Physiological dead space = anatomical + alveolar dead space.
            The Bohr equation quantifies the dead space fraction. V/Q mismatch is the most common cause of hypoxaemia in clinical practice.
          </p>
          <div className="bg-card rounded-xl border border-border p-4">
            <DeadSpaceDiagram />
          </div>
        </section>
      </div>

      <div className="prose prose-slate max-w-none mb-10">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Alveolar Gas Equation & Oxygen Cascade</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            The alveolar gas equation calculates PAO₂ from FiO₂, atmospheric pressure, and PaCO₂. It underpins the A-a gradient and assessment of gas exchange efficiency.
          </p>
          <div className="bg-card rounded-xl border border-border p-4">
            <AlveolarGasEquationDiagram />
          </div>
        </section>
      </div>

      <div className="prose prose-slate max-w-none mb-10">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">West's Lung Zones</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            West's zones describe how the relationship between alveolar (PA), arterial (Pa), and venous (Pv) pressures
            determines regional blood flow distribution. Gravity creates a hydrostatic pressure gradient from apex to base.
          </p>
          <div className="bg-card rounded-xl border border-border p-4">
            <WestZonesDiagram />
          </div>
        </section>
      </div>

      <div className="prose prose-slate max-w-none mb-10">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Closing Volume & Closing Capacity</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            The single-breath nitrogen washout test measures closing volume — the lung volume at which dependent airways begin to close.
            When closing capacity exceeds FRC, airway closure occurs during tidal breathing, causing V/Q mismatch and hypoxaemia.
          </p>
          <div className="bg-card rounded-xl border border-border p-4">
            <ClosingVolumeDiagram />
          </div>
        </section>
      </div>

      <div className="prose prose-slate max-w-none mb-10">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Ventilator Waveforms</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Understanding pressure-time, flow-time, and volume-time waveforms is essential for ventilator management.
            Each mode produces characteristic patterns that change with compliance and resistance.
          </p>
          <div className="bg-card rounded-xl border border-border p-4">
            <VentilatorWaveformsDiagram />
          </div>
        </section>
      </div>

      <div className="prose prose-slate max-w-none mb-10">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Auto-PEEP & Air Trapping</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Auto-PEEP (intrinsic PEEP) occurs when expiratory time is insufficient for complete lung emptying.
            Air trapping increases end-expiratory lung volume, raises intrathoracic pressure, and increases the work of triggering.
          </p>
          <div className="bg-card rounded-xl border border-border p-4">
            <AutoPEEPDiagram />
          </div>
        </section>
      </div>

      <div className="prose prose-slate max-w-none mb-10">
        <section className="mb-10">
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
      </div>

      <div className="prose prose-slate max-w-none mb-10">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">VILI: Stress, Strain & Mechanical Power</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Ventilator-induced lung injury results from excessive stress (transpulmonary pressure) and strain (tidal deformation relative to FRC).
            Mechanical power unifies VT, driving pressure, RR, flow, and PEEP into a single energy-based metric for VILI risk assessment.
          </p>
          <div className="bg-card rounded-xl border border-border p-4">
            <VILIDiagram />
          </div>
        </section>
      </div>

      <div className="prose prose-slate max-w-none mb-10">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">PV Recruitment Curve & Hysteresis</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            The static pressure-volume curve reveals lower and upper inflection points that guide PEEP and plateau pressure targets.
            Hysteresis between inflation and deflation limbs demonstrates that recruited alveoli remain open at lower pressures than required to initially open them.
          </p>
          <div className="bg-card rounded-xl border border-border p-4">
            <PVRecruitmentDiagram />
          </div>
        </section>
      </div>

      <KeyLearningPoints points={[
        "Compliance = ΔV/ΔP. Total respiratory compliance (~100 ml/cmH₂O) = lung + chest wall in series.",
        "Static compliance uses plateau pressure; dynamic compliance uses peak pressure. Dynamic < static.",
        "Surfactant (DPPC from Type II pneumocytes) reduces surface tension and stabilises alveoli via Laplace's law (P = 2T/r).",
        "Major site of airway resistance: medium bronchi (generations 4-8), not small airways.",
        "Time constant τ = R × C. 3τ required for 95% equilibration. Heterogeneous τ causes V/Q mismatch.",
        "Normal WOB = 0.3-0.6 J/L, consuming 2-3% of VO₂. Can exceed 30% in respiratory failure."
      ]} />
      <QuizSection questions={lungMechanicsQuiz} />
      <TopicCompletionToggle topicId="lung-mechanics" topicTitle="Lung Mechanics" />
    </SectionLayout>
  );
};

export default LungMechanicsTopic;
