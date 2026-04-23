import { TopicTemplate } from "@/components/TopicTemplate";
import { electricalSafetyQuiz } from "@/data/quizzes";
import ElectricalSafetyDiagram from "@/components/diagrams/ElectricalSafetyDiagram";
import { DefibrillatorCapacitorDiagram } from "@/components/diagrams/DefibrillatorCapacitorDiagram";
import { IsolationTransformerDiagram } from "@/components/diagrams/IsolationTransformerDiagram";
import { RCDDiagram } from "@/components/diagrams/RCDDiagram";
import { MicroshockDiagram } from "@/components/diagrams/MicroshockDiagram";
import { DiathermyDiagram } from "@/components/diagrams/DiathermyDiagram";
import { Exam } from "@/data/curriculum";

const objectives = [
  "Define macroshock and microshock and quote the threshold currents that cause perception, let-go, respiratory arrest and VF.",
  "Explain why intracardiac catheters reduce the VF threshold to ~150 µA and the rationale for Type CF equipment.",
  "Describe the isolated power supply with line isolation monitor and contrast with RCD/RCCB protection.",
  "Compare monopolar and bipolar diathermy, listing the principal hazards and how they are mitigated.",
  "Explain the role of theatre humidity (50–60%) and antistatic footwear (75 kΩ–10 MΩ) in electrical safety.",
  "Outline the physics of capacitor-based defibrillators and contrast monophasic and biphasic waveforms.",
];

const keyPoints = [
  "Macroshock VF threshold ~100 mA via skin; microshock VF threshold ~150 µA via intracardiac catheter.",
  "Type CF equipment (leakage <10 µA) required for intracardiac connections.",
  "Surgical diathermy uses high-frequency AC (0.4-3 MHz) which does not stimulate muscle/nerve.",
  "Monopolar diathermy requires a return plate; bipolar does not. Bipolar is safer near pacemakers.",
  "Equipment classes: I (earthed), II (double insulated), III (low voltage <24V AC).",
  "Theatre humidity 50–60% prevents static charge accumulation by providing a conductive surface film of water.",
  "Antistatic theatre footwear has sole resistance 75 kΩ–10 MΩ — drains static slowly while limiting macroshock current to <3 mA.",
  "Defibrillator capacitor stores energy E = ½CV²; charged slowly (~3 s) and discharged in ~10 ms (biphasic).",
  "Biphasic defibrillators deliver equivalent efficacy at lower energy than monophasic.",
];

const ElectricalSafetyTopic = () => {
  return (
    <TopicTemplate
      title="Electrical Safety"
      subtitle="FRCA Primary — Physics"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      topicId="electrical-safety"
      topicTitle="Electrical Safety"
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={electricalSafetyQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY] },
        keyPoints: { exams: [Exam.PRIMARY] },
      }}
      coreConcepts={
        <div className="prose prose-slate max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
          <p className="text-foreground/90 leading-relaxed">
            Operating theatres contain numerous electrical devices in close proximity to patients. Understanding electrical
            hazards (microshock and macroshock), protection mechanisms, and the safe use of diathermy and defibrillation
            is a core FRCA primary topic.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Current, Voltage & Resistance</h2>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Ohm's law: V = IR</strong>. Current (I) is the flow of electrons; voltage (V) is the driving force;
            resistance (R) opposes current flow. Biological damage from electricity depends primarily on <em>current density</em>
            and <em>pathway</em> through the body. Skin resistance (dry ~100 kΩ, wet ~1 kΩ) is the main protective barrier.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Macroshock</h2>
          <p className="text-foreground/90 leading-relaxed">
            Macroshock occurs when current passes through the body via the skin. Thresholds (50 Hz AC):
          </p>
          <ul className="text-foreground/90 mt-2 space-y-1">
            <li><strong>1 mA</strong> — perception (tingling)</li>
            <li><strong>5 mA</strong> — pain</li>
            <li><strong>15 mA</strong> — "let-go" threshold (tetanic muscle contraction prevents release)</li>
            <li><strong>50 mA</strong> — respiratory arrest</li>
            <li><strong>100 mA</strong> — ventricular fibrillation</li>
            <li><strong>&gt;5 A</strong> — sustained asystole, burns</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Microshock</h2>
          <p className="text-foreground/90 leading-relaxed">
            Microshock occurs when current is delivered directly to the myocardium (e.g., via a pacing wire, central line,
            or intracardiac catheter). As little as <strong>150 µA (0.15 mA)</strong> applied directly to the heart can
            cause ventricular fibrillation — 1000 times less than the macroshock threshold.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Clinical Implication</p>
            <p className="text-sm text-muted-foreground mt-1">
              Patients with intracardiac catheters are "electrically susceptible." All equipment contacting the patient must
              have leakage current &lt;10 µA (Type CF equipment). Saline-filled CVP lines can act as conductors.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Isolation Transformer & Line Isolation Monitor (LIM)</h2>
          <p className="text-foreground/90 leading-relaxed">
            In critical-care areas (operating theatres, cardiac cath labs, ICU bedspaces) the standard earthed mains supply is
            replaced by an <strong>isolated power system</strong>. A 1:1 isolation transformer magnetically couples power to the
            theatre but removes the earth reference — both downstream conductors "float" relative to earth. Because no normal
            return path exists through earth, a patient or staff member touching a single live conductor cannot complete a
            circuit and no current flows through them.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            A <strong>Line Isolation Monitor (LIM)</strong> continuously measures the impedance from each line to earth. A
            single insulation fault is detected and alarmed (typically when leakage current would exceed ~2 mA), but the supply
            is deliberately <em>not</em> automatically interrupted — abrupt loss of power to a ventilator or bypass pump may be
            more dangerous than the fault itself. Two simultaneous faults are required for a hazardous shock.
          </p>
          <div className="mt-4">
            <IsolationTransformerDiagram />
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-serif font-bold text-foreground mb-3">RCD / RCCB — Why Theatres Don't Use One</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Outside theatre, an earthed mains supply is protected by a <strong>Residual Current Device (RCD / RCCB)</strong>.
              An RCD compares the live and neutral currents through a single toroidal current transformer; any imbalance &gt; 30 mA
              triggers disconnection within 40 ms — fast enough to prevent ventricular fibrillation in most macroshock scenarios.
              In theatre this auto-disconnect is itself a hazard, which is why an isolated supply with a LIM is preferred.
            </p>
            <RCDDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Equipment Classification</h2>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Class I</strong>: earthed metal casing (fault current flows to earth via green/yellow wire).
            <strong> Class II</strong>: double insulated, no earth needed (□ within □ symbol).
            <strong> Class III</strong>: powered by safety extra-low voltage (&lt;24V AC).
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Type B</strong>: body contact, leakage &lt;100 µA. <strong>Type BF</strong>: floating patient connection,
            &lt;100 µA. <strong>Type CF</strong>: cardiac floating, leakage &lt;10 µA — required for intracardiac use.
          </p>

          <div className="mt-6">
            <h3 className="text-lg font-serif font-bold text-foreground mb-3">Microshock — Why 100 µA Can Kill</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              <strong>Microshock</strong> is the induction of ventricular fibrillation by very small currents (as low as
              <strong> 100 µA at 50 Hz</strong>) delivered <em>directly to the myocardium</em> via a conductive intracardiac
              pathway — typically a CVP or PA catheter, transvenous pacing wire, or saline-filled pressure transducer line.
              The skin's natural impedance (~100 kΩ) is bypassed, and current is concentrated over a tiny endocardial area,
              producing the high local current density needed to depolarise the ventricle during the vulnerable T-wave period.
              This is the rationale for the <strong>Type CF (&lt;10 µA)</strong> standard — a 10× safety margin below the VF
              threshold.
            </p>
            <MicroshockDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Diathermy</h2>
          <p className="text-foreground/90 leading-relaxed">
            Surgical diathermy uses high-frequency AC (0.4–3 MHz) which does not stimulate neuromuscular tissue. <strong>Monopolar
            </strong>: current flows from active electrode through the patient to a large return plate (current density at plate
            is low → no burns). <strong>Bipolar</strong>: current flows between two prongs of forceps — no return plate needed,
            safer near pacemakers.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Diathermy Hazards</p>
            <p className="text-sm text-muted-foreground mt-1">
              Burns at the return plate (poor contact, small area). Channelling effect at narrow points (digits). Interference
              with pacemakers and monitoring. Bowel burns during laparoscopic surgery (direct coupling, capacitative coupling).
              Ignition of alcohol-based skin prep or airway fires with high FiO₂.
            </p>
          </div>
          <DiathermyDiagram />
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Theatre Environment — Humidity & Footwear</h2>
          <p className="text-foreground/90 leading-relaxed">
            Two often-overlooked engineering controls in the operating theatre — controlled humidity and antistatic footwear —
            were introduced in the era of flammable anaesthetic agents (ether, cyclopropane) but remain part of modern theatre
            design because they continue to mitigate electrical risk.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="text-sm font-semibold text-foreground mb-1">Why humidity matters</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Theatre humidity is maintained at <strong className="text-foreground">50–60% relative humidity</strong> (with temperature 20–22 °C).</li>
                <li>At low humidity (&lt; 40%), insulating surfaces (vinyl flooring, plastics, drapes, hair, clothing) accumulate
                  <strong className="text-foreground"> static charge</strong> by triboelectric (friction-induced) charging.</li>
                <li>Higher humidity allows a thin film of water on surfaces to act as a <strong className="text-foreground">conductive path</strong>,
                  continuously bleeding static charge to earth before it reaches a hazardous potential.</li>
                <li>This <strong className="text-foreground">prevents spark formation</strong> — historically critical to avoid ignition of
                  ether/cyclopropane mixtures, but still relevant to: airway fires, alcohol-based skin prep ignition, microelectronic
                  device damage, and patient micro-shock from static discharge to monitoring leads or intracardiac catheters.</li>
                <li>Humidity also reduces <strong className="text-foreground">skin resistance</strong> in sweating staff and patients — a
                  trade-off that increases macroshock hazard slightly, but the dominant benefit is static dissipation.</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="text-sm font-semibold text-foreground mb-1">Antistatic theatre footwear</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Theatre clogs and overshoes are made of <strong className="text-foreground">antistatic (conductive) rubber</strong>
                  — typically with a sole resistance of <strong className="text-foreground">75 kΩ – 10 MΩ</strong>.</li>
                <li>This range is deliberately chosen as a <strong className="text-foreground">"Goldilocks" resistance</strong>:</li>
                <li><strong className="text-foreground">Low enough</strong> to <em>continuously drain static charge</em> from the wearer
                  to the conductive theatre floor (and on to earth) — preventing spark discharge.</li>
                <li><strong className="text-foreground">High enough</strong> to <em>limit current flow</em> if the wearer accidentally
                  becomes part of a mains circuit — at 240 V across &gt; 75 kΩ, current is limited to &lt; 3 mA (well below the 15 mA
                  let-go threshold and the 100 mA VF threshold).</li>
                <li>Combined with a <strong className="text-foreground">conductive floor</strong> (resistance 20 kΩ – 5 MΩ between two
                  electrodes 60 cm apart), the staff member–shoe–floor system acts as a controlled, slow discharge path.</li>
                <li>Pure rubber boots (very high resistance) would <em>protect against macroshock</em> but allow <strong className="text-foreground">static
                  build-up</strong> — and so are not used in theatre.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Defibrillation</h2>
          <p className="text-foreground/90 leading-relaxed">
            Defibrillation delivers a large DC current (~30–40 A peak) to simultaneously depolarise a critical mass of
            myocardium, allowing the SA node to resume normal conduction. Modern biphasic defibrillators are more effective
            at lower energy (120–200 J) than monophasic (360 J). Transthoracic impedance (~70–80 Ω) affects current delivery.
          </p>
          <DefibrillatorCapacitorDiagram />
        </section>
          <ElectricalSafetyDiagram />
        </div>
      }
    />
  );
};

export default ElectricalSafetyTopic;
