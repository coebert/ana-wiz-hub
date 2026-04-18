import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { SynthesisBlock } from "@/components/SynthesisBlock";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { anaestheticMachineQuiz, breathingCircuitsQuiz, vaporizersQuiz } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import AnaestheticMachineDiagram from "@/components/diagrams/AnaestheticMachineDiagram";
import BreathingCircuitsDiagram from "@/components/diagrams/BreathingCircuitsDiagram";
import { VaporizerDiagram } from "@/components/diagrams/VaporizerDiagram";
import NeuraxialNeedlesDiagram from "@/components/diagrams/NeuraxialNeedlesDiagram";
import { SeeAlso } from "@/components/SeeAlso";

const subtopicLinks = [
  { path: "/physics/anaesthetic-machine", title: "The Anaesthetic Machine", desc: "Pipeline supply, regulators, flowmeters, safety features" },
  { path: "/physics/breathing-circuits", title: "Breathing Circuits & Scavenging", desc: "Mapleson classification, circle system, soda lime" },
  { path: "/physics/vaporizers", title: "Vaporizers", desc: "SVP, plenum & draw-over, TEC 6, splitting ratio" },
  { path: "/clinical/regional-anaesthesia", title: "Needles (Regional & Neuraxial)", desc: "Quincke, Whitacre, Sprotte, Tuohy, Huber needles" },
];

const EquipmentMonitoringTopic = () => {
  return (
    <SectionLayout
      title="Equipment & Monitoring"
      subtitle="Anaesthetic machine, breathing circuits, vaporizers, and needles — a consolidated overview"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
    >
      <div className="space-y-10">
        {/* Quick-nav cards */}
        <section>
          <h2 className="text-xl font-serif font-bold text-foreground mb-4">Detailed Topic Pages</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {subtopicLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="group flex items-center justify-between gap-3 rounded-lg border border-border bg-card p-4 hover:bg-accent/50 transition-colors"
              >
                <div>
                  <p className="font-medium text-foreground group-hover:text-primary transition-colors">{link.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{link.desc}</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </section>

        {/* 1 — Anaesthetic Machine */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-2">The Anaesthetic Machine</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              The modern anaesthetic workstation delivers a precise gas mixture from pipeline (400 kPa) or cylinder supply,
              through pressure regulators, flowmeters (rotameters or electronic), vaporizer, and breathing system to the patient.
              Key safety features include the <strong>oxygen failure alarm</strong> (Ritchie whistle — powered by O₂ pressure,
              not electricity), <strong>anti-hypoxia device</strong> (chain-link or proportioning system ensuring ≥25% O₂),
              and a <strong>pressure relief valve</strong> (set at ~35 cmH₂O).
            </p>
            <p>
              The <strong>common gas outlet</strong> delivers fresh gas to the breathing system at ~40 kPa. A one-way
              check valve at the outlet prevents back-flow. Modern machines integrate agent monitors, spirometry,
              gas analysis (sidestream or mainstream), and automated self-check routines before use.
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 mt-4">
            <AnaestheticMachineDiagram />
          </div>
        </section>

        {/* 2 — Breathing Circuits */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Breathing Circuits & Scavenging</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              Breathing circuits connect the machine to the patient and manage CO₂ elimination. The <strong>Mapleson
              classification (A–F)</strong> describes semi-open circuits distinguished by the position of FGF inlet,
              APL valve, reservoir bag, and corrugated tubing.
            </p>
            <p>
              <strong>Mapleson A (Magill)</strong> is most efficient for spontaneous ventilation (FGF ≈ MV).
              <strong> Mapleson D (Bain)</strong> — coaxial, most efficient for controlled ventilation.
              <strong> Mapleson E (Ayre's T-piece)</strong> has no valves (minimal resistance → neonates);
              <strong> F (Jackson-Rees)</strong> adds an open-tail bag.
            </p>
            <p>
              The <strong>circle system</strong> (7 components) enables low-flow anaesthesia (FGF 0.5–1 L/min) by
              rebreathing after CO₂ absorption with soda lime. Soda lime: Ca(OH)₂ 80%, NaOH 4% — exothermic,
              producing heat and water. Risks: compound A (sevoflurane + desiccated soda lime), CO (desflurane + desiccated soda lime).
            </p>
            <p>
              <strong>Scavenging</strong>: 4 components with a 30 mm connector; safety valves ±0.5 cmH₂O.
              COSHH limits: N₂O &lt;100 ppm, halogenated agents &lt;50 ppm (8-hr TWA).
            </p>
          </div>

          {/* Mapleson Comparison Table */}
          <div className="mt-6">
            <h3 className="text-lg font-serif font-bold text-foreground mb-3">Mapleson Circuit Efficiency Comparison</h3>
            <div className="overflow-x-auto rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/50">
                    <th className="text-left p-3 font-semibold text-foreground border-b border-border">Circuit</th>
                    <th className="text-left p-3 font-semibold text-foreground border-b border-border">Also Known As</th>
                    <th className="text-center p-3 font-semibold text-foreground border-b border-border">Spontaneous</th>
                    <th className="text-center p-3 font-semibold text-foreground border-b border-border whitespace-nowrap">FGF (SV)</th>
                    <th className="text-center p-3 font-semibold text-foreground border-b border-border">Controlled</th>
                    <th className="text-center p-3 font-semibold text-foreground border-b border-border whitespace-nowrap">FGF (IPPV)</th>
                    <th className="text-left p-3 font-semibold text-foreground border-b border-border">Key Feature</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { circuit: "A", aka: "Magill", spont: "★★★", spontFGF: "1× MV", ctrl: "★", ctrlFGF: "≥3× MV", note: "APL valve near patient — vents alveolar gas first" },
                    { circuit: "B", aka: "—", spont: "★", spontFGF: "2–3× MV", ctrl: "★★", ctrlFGF: "2–3× MV", note: "Rarely used clinically" },
                    { circuit: "C", aka: "Waters", spont: "★", spontFGF: "2–3× MV", ctrl: "★★", ctrlFGF: "2–3× MV", note: "No tubing — bag connected directly" },
                    { circuit: "D", aka: "Bain (coaxial)", spont: "★★", spontFGF: "2–3× MV", ctrl: "★★★", ctrlFGF: "70 mL/kg/min", note: "FGF at patient end via inner tube" },
                    { circuit: "E", aka: "Ayre's T-piece", spont: "★★", spontFGF: "2–3× MV", ctrl: "★★", ctrlFGF: "2–3× MV", note: "No valves/bag — minimal resistance (neonates)" },
                    { circuit: "F", aka: "Jackson-Rees", spont: "★★", spontFGF: "2–3× MV", ctrl: "★★", ctrlFGF: "2–3× MV", note: "T-piece + open-tail bag for IPPV" },
                  ].map((row) => (
                    <tr key={row.circuit} className="border-b border-border last:border-0 hover:bg-accent/30 transition-colors">
                      <td className="p-3 font-medium text-foreground">Mapleson {row.circuit}</td>
                      <td className="p-3 text-muted-foreground">{row.aka}</td>
                      <td className="p-3 text-center">{row.spont}</td>
                      <td className="p-3 text-center font-mono text-xs text-foreground">{row.spontFGF}</td>
                      <td className="p-3 text-center">{row.ctrl}</td>
                      <td className="p-3 text-center font-mono text-xs text-foreground">{row.ctrlFGF}</td>
                      <td className="p-3 text-muted-foreground">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              ★★★ = most efficient (lowest FGF) · ★ = least efficient. MV = minute ventilation (~70–100 mL/kg/min).
              Mapleson A SV: FGF ≈ alveolar ventilation (~1× MV). Mapleson D IPPV: classically quoted as 70 mL/kg/min (~1× MV).
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 mt-4">
            <BreathingCircuitsDiagram />
          </div>
        </section>

        {/* 3 — Vaporizers */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Vaporizers</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              Vaporizers convert liquid volatile agent into a controlled vapour concentration. <strong>Saturated vapour
              pressure (SVP)</strong> depends only on temperature and the agent — not atmospheric pressure. At 20 °C:
              sevoflurane SVP ≈ 21.3 kPa, isoflurane ≈ 33.2 kPa, desflurane ≈ 88.5 kPa.
            </p>
            <p>
              <strong>Plenum vaporizers</strong> (TEC 5/7) use a <strong>splitting ratio</strong> (bypass : chamber)
              controlled by the dial. Temperature compensation via a bimetallic strip adjusts the splitting ratio as
              cooling from latent heat loss occurs. Wicks and sintered discs maximise surface area.
            </p>
            <p>
              <strong>Desflurane</strong> (boiling point 22.8 °C) requires the <strong>TEC 6</strong> — electrically
              heated to 39 °C and 2 atm, injecting measured pure vapour into FGF.
            </p>
            <p>
              <strong>Draw-over vaporizers</strong> (Oxford Miniature Vaporizer, Triservice) operate at or below
              atmospheric pressure — patient-driven. Portable but less precise. Used in field/military anaesthesia.
            </p>
            <p>
              <strong>Altitude effect:</strong> partial pressure of agent is maintained (clinical effect unchanged)
              despite a higher % concentration at lower atmospheric pressure.
            </p>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 mt-4">
            <VaporizerDiagram />
          </div>
        </section>

        {/* 4 — Needles */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-2">Needles in Anaesthetic Practice</h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              Needle design profoundly affects tissue trauma, post-dural-puncture headache (PDPH) risk, and procedural
              feel. Key needle types:
            </p>
            <div className="grid gap-3 sm:grid-cols-2 mt-3">
              <div className="rounded-lg bg-secondary/30 border border-border p-3">
                <p className="font-semibold text-foreground text-sm">Quincke (Cutting)</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Medium-length bevel with a sharp cutting edge. Cuts dural fibres → higher PDPH risk (especially in larger gauges).
                  Good CSF flow and tactile feedback. Standard for diagnostic LP; use 25–27G for spinal anaesthesia.
                </p>
              </div>
              <div className="rounded-lg bg-secondary/30 border border-border p-3">
                <p className="font-semibold text-foreground text-sm">Whitacre (Pencil-Point)</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Conical non-cutting tip with a side port. Spreads rather than cuts dural fibres → lower PDPH rate.
                  Preferred for spinal anaesthesia (25G). Slightly more force to advance; may deflect off-midline.
                </p>
              </div>
              <div className="rounded-lg bg-secondary/30 border border-border p-3">
                <p className="font-semibold text-foreground text-sm">Sprotte (Pencil-Point)</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Longer side aperture than Whitacre → faster CSF flow and more even LA distribution. Elongated
                  opening may reduce failed blocks. Similar PDPH rates to Whitacre. Also pencil-point.
                </p>
              </div>
              <div className="rounded-lg bg-secondary/30 border border-border p-3">
                <p className="font-semibold text-foreground text-sm">Tuohy (Epidural)</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Curved Huber-type tip deflects the catheter laterally into the epidural space. Reduces accidental
                  dural puncture. 16–18G for adult epidurals. Loss of resistance (LOR) technique with saline or air.
                </p>
              </div>
              <div className="rounded-lg bg-secondary/30 border border-border p-3">
                <p className="font-semibold text-foreground text-sm">Huber Point (Non-Coring)</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Deflected tip that parts tissue rather than coring — essential for accessing implanted ports
                  (e.g., chemo ports). Prevents silicone fragments. Also the basis of the Tuohy tip geometry.
                </p>
              </div>
              <div className="rounded-lg bg-secondary/30 border border-border p-3">
                <p className="font-semibold text-foreground text-sm">Stimulating Needles</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Insulated shaft with exposed tip allows nerve stimulation for peripheral nerve blocks. Short-bevel
                  tip reduces nerve injury risk. Often combined with ultrasound guidance.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-4 mt-4">
            <NeuraxialNeedlesDiagram />
          </div>
        </section>

        <KeyLearningPoints points={[
          "The anaesthetic machine delivers gas via pipeline (400 kPa) or cylinders through regulators, flowmeters, and vaporizer to the breathing system.",
          "Oxygen failure alarm (Ritchie whistle) is gas-powered, not electrical — it sounds even during power failure.",
          "Mapleson A is most efficient for spontaneous ventilation; Mapleson D (Bain) for controlled ventilation.",
          "Circle system (7 components) allows low-flow anaesthesia; soda lime is exothermic and produces heat/water.",
          "SVP depends only on temperature and agent. Desflurane's near-RT boiling point requires the heated TEC 6.",
          "Pencil-point needles (Whitacre, Sprotte) spread dural fibres → lower PDPH than cutting Quincke needles.",
          "Tuohy needles have a curved Huber-type tip to direct epidural catheters and reduce accidental dural puncture.",
          "Scavenging safety valves limit pressure to ±0.5 cmH₂O; COSHH: N₂O <100 ppm, volatiles <50 ppm (8-hr TWA).",
        ]} />

        <QuizSection questions={[...anaestheticMachineQuiz, ...breathingCircuitsQuiz, ...vaporizersQuiz]} />
        <ReferencesList topicId="equipment-monitoring" />
        <SeeAlso topicId="equipment-monitoring" />
        <TopicCompletionToggle topicId="equipment-monitoring" topicTitle="Equipment & Monitoring" />
      </div>
    </SectionLayout>
  );
};

export default EquipmentMonitoringTopic;
