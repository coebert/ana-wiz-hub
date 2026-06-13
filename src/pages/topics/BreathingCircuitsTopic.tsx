import { TopicTemplate } from "@/components/TopicTemplate";
import { TopicFaqs } from "@/components/TopicFaqs";
import { Exam } from "@/data/curriculum";
import { ExamSection } from "@/components/ExamSection";
import { breathingCircuitsQuiz } from "@/data/quizzes";
import type { WorkedExample } from "@/components/WorkedExamples";
import BreathingCircuitsDiagram from "@/components/diagrams/BreathingCircuitsDiagram";
import MaplesonEfficiencyDiagram from "@/components/diagrams/MaplesonEfficiencyDiagram";

const breathingCircuitsFaqs: Array<[string, string]> = [
  [
    "What fresh gas flow is required to prevent rebreathing in a Mapleson D / Bain circuit?",
    "During spontaneous ventilation, FGF must equal 1.5–2 × minute volume (~150 mL/kg/min). During controlled ventilation (the efficient mode for Mapleson D), 70–100 mL/kg/min is sufficient. The Bain is a coaxial Mapleson D — fresh gas runs through the inner tube to the patient, exhaled gas returns via the outer tube; check inner-tube integrity with the Pethick test."
  ],
  [
    "How does a circle system differ from a Mapleson circuit?",
    "A circle system uses CO₂ absorber (soda lime) to scrub exhaled CO₂, allowing very low fresh gas flows (≤1 L/min — low-flow anaesthesia). Two unidirectional valves enforce flow direction, an APL valve releases excess gas, a reservoir bag dampens flow. Conserves heat, moisture and volatile agent; key risks are exhausted soda lime (colour change, rising FiCO₂) and degradation products (compound A with sevoflurane at very low flow)."
  ],
  [
    "What are the signs of exhausted soda lime?",
    "Colour change of indicator (white → violet, or pink → white depending on brand), reduced thermal heat generation (cool to touch), rising inspired CO₂ on capnography, hard granules with cracked surface. Replace when 50–70 % colour-changed, do not wait until exhausted. Modern absorbers without strong alkali (lithium hydroxide, calcium hydroxide) reduce compound A and CO production from desflurane/sevoflurane."
  ]
];

/**
 * Standalone FRCA Primary / Final topic page for Anaesthetic Breathing
 * Systems. Carved out of the unified Equipment & Monitoring topic so the
 * page ranks for the dense Mapleson-classification query cluster
 * ("Mapleson A vs D", "Bain circuit", "Jackson-Rees", "circle system
 * components", "soda lime Compound A", "low-flow anaesthesia"). Built
 * around the existing schematic plus a new interactive Mapleson
 * efficiency simulator that lets learners see the A↔D reversal between
 * spontaneous and controlled ventilation.
 */

const objectives = [
  "Classify breathing systems into open / semi-open / semi-closed / closed and locate the Mapleson families within that schema.",
  "State the position of the reservoir bag, fresh-gas inlet and APL valve for each Mapleson circuit (A–F) and explain why this geometry determines efficiency.",
  "Justify the choice of Mapleson A (Magill / Lack) for spontaneous ventilation and Mapleson D (Bain) for controlled ventilation in adults.",
  "Describe the seven essential components of a circle system and the rationale for low-flow anaesthesia.",
  "Outline the chemistry of soda lime, the production of Compound A (sevoflurane + desiccated absorbent) and carbon monoxide (desflurane + desiccated KOH-containing absorbent), and the role of Amsorb®.",
  "Specify the AAGBI 2012 pre-use circuit checks (two-bag test) and the safety design of scavenging systems (30 mm connector, ±0.5 cmH₂O safety valves).",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Selecting a circuit for a spontaneously breathing 70 kg adult",
    scenario: (
      <>
        A 70 kg adult is breathing spontaneously through a circle-bypass
        Mapleson set-up while awaiting transfer. Which Mapleson circuit
        minimises fresh-gas flow and why?
      </>
    ),
    working: (
      <>
        Spontaneous ventilation favours <strong>Mapleson A</strong> (Magill /
        Lack). During expiration, the first gas expelled (alveolar, high CO₂)
        leaves through the APL valve sited near the patient. The later
        expired gas (dead-space, low CO₂) refills the corrugated tubing.
        Fresh gas entering at the machine end displaces the dead-space gas
        back toward the patient at the next inspiration — so the patient
        re-inhales <em>only</em> CO₂-free dead-space gas.
      </>
    ),
    answer: (
      <>
        FGF ≈ minute ventilation, ≈ 70 mL/kg/min ≈ <strong>5 L/min</strong>
        for a 70 kg adult. The same circuit would require ≈ 3 × MV (≈ 15
        L/min) under IPPV — wasteful — which is why the Bain (Mapleson D)
        is used for ventilated adults.
      </>
    ),
    cites: ["BJA Educ 2005", "Al-Shaikh & Stacey Ch.6-7"],
  },
  {
    title: "Coaxial Bain — diagnose the kinked inner tube",
    scenario: (
      <>
        Mid-case on a Bain circuit, EtCO₂ steadily rises despite increased
        FGF and unchanged minute volume. The capnograph waveform shape is
        normal. What test confirms the diagnosis?
      </>
    ),
    working: (
      <>
        A kinked or disconnected inner tube of a Bain coaxial circuit
        delivers fresh gas into the dead-space at the machine end rather
        than the patient end, converting the circuit into a high-volume
        rebreathing system. Pethick's test detects this — occlude the
        patient end, fill the bag using the O₂ flush, then release.
        Functional circuits collapse the bag (Venturi entrainment past the
        inner tube); a faulty circuit shows no bag collapse.
      </>
    ),
    answer: (
      <>
        Perform Pethick's test. If the bag fails to collapse, the inner
        tube is kinked or disconnected — change the circuit immediately
        and switch to bag-mask ventilation. EtCO₂ will fall within a
        minute on the replacement circuit.
      </>
    ),
    cites: ["BJA Educ 2005", "Davey & Diba Ch.5"],
  },
  {
    title: "Low-flow circle system — safe FGF after 30 minutes",
    scenario: (
      <>
        A 70 kg adult, induced and intubated, on a circle system with
        sevoflurane. After the first 10 minutes of high FGF (denitrogenation
        and uptake of agent), what is the lowest safe FGF, and which monitors
        absolutely have to be in use?
      </>
    ),
    working: (
      <>
        After denitrogenation and agent equilibration, basal oxygen
        consumption is ≈ 250 mL/min in an adult. FGF can be reduced to
        match consumption, but a margin is needed — clinical practice is
        0.5–1 L/min for low-flow, and ≥ 0.25 L/min only with full
        electronic agent monitoring (Aladin / circle workstation).
      </>
    ),
    answer: (
      <>
        Drop FGF to <strong>0.5–1 L/min</strong>. Mandatory monitors:
        <strong> FiO₂</strong> (hypoxic mixture risk as O₂ consumption
        approaches FGF), <strong>inspired and expired agent</strong>
        concentration (vaporiser dial vs delivered agent diverge at low
        flows), and <strong>capnography</strong> (CO₂ absorbent
        exhaustion). Keep FGF ≥ 2 L/min if you suspect desiccated soda
        lime to mitigate Compound A and CO production.
      </>
    ),
    cites: ["BJA Educ 2005", "Al-Shaikh & Stacey Ch.6-7"],
  },
];

const keyPoints = [
  {
    text: "Mapleson classification (A–F) is defined by the geometry of fresh-gas inlet, reservoir bag and APL valve. Geometry determines whether dead-space gas or alveolar gas is preferentially vented during expiration — and therefore efficiency.",
    cites: ["BJA Educ 2005"],
  },
  {
    text: "Mapleson A (Magill / Lack) — most efficient for spontaneous ventilation: FGF ≈ MV (≈ 70 mL/kg/min). Inefficient for IPPV (needs ≈ 3 × MV).",
    cites: ["BJA Educ 2005", "Al-Shaikh & Stacey Ch.6-7"],
  },
  {
    text: "Mapleson D / Bain (coaxial D) — most efficient for IPPV: FGF ≈ MV (≈ 70 mL/kg/min in adults; 100 mL/kg/min often quoted to maintain normocapnia). Inefficient for spontaneous ventilation.",
    cites: ["BJA Educ 2005"],
  },
  {
    text: "Mapleson E (Ayre's T-piece) and F (Jackson-Rees) — valveless, low resistance, designed for paediatric use. F adds an open-tailed bag for visual ventilation feedback. FGF ≈ 2–3 × MV.",
    cites: ["BJA Educ 2005", "Davey & Diba Ch.5"],
  },
  {
    text: "Circle system — 7 components: FGF inlet, inspiratory unidirectional valve, expiratory unidirectional valve, Y-piece, APL valve, reservoir bag, CO₂ absorber. Unidirectional valves are the safety-critical components.",
    cites: ["Al-Shaikh & Stacey Ch.6-7"],
  },
  {
    text: "Low-flow anaesthesia (FGF 0.5–1 L/min) conserves agent, heat and humidity and reduces atmospheric pollution. Requires continuous FiO₂, agent, and capnography monitoring.",
    cites: ["BJA Educ 2005"],
  },
  {
    text: "Soda lime: ~80 % Ca(OH)₂, ~4 % NaOH catalyst, ~1 % KOH, ~14 % water, silica hardener. Exothermic — absorbs heat and humidity into the inspiratory limb.",
    cites: ["Al-Shaikh & Stacey Ch.6-7"],
  },
  {
    text: "Compound A (nephrotoxic in rats) — sevoflurane + desiccated absorbent. Mitigate with FGF ≥ 2 L/min, fresh absorbent, and avoiding overnight FGF.",
    cites: ["BJA Educ 2005"],
  },
  {
    text: "Carbon monoxide — desflurane (and other haloether agents) + desiccated KOH-containing absorbent (Baralyme, older soda lime). Amsorb® (Ca(OH)₂-only, no strong base) eliminates both CO and Compound A.",
    cites: ["BJA Educ 2005", "Davey & Diba Ch.5"],
  },
  {
    text: "Pethick's test verifies coaxial inner tube integrity in a Bain circuit. Occlude patient end, fill bag with O₂ flush, release — functional circuits collapse the bag via Venturi entrainment past the inner tube.",
    cites: ["Davey & Diba Ch.5"],
  },
  {
    text: "Scavenging safety: 30 mm collecting connector (distinct from 22 mm/15 mm patient connectors), ±0.5 cmH₂O safety valves to prevent barotrauma or applied negative pressure if outflow occludes or active suction over-aspirates.",
    cites: ["Al-Shaikh & Stacey Ch.6-7"],
  },
  {
    text: "AAGBI 2012 pre-use circuit check: visual inspection, two-bag test (machine bag + circuit bag occluded at patient end — APL closed for leak, opened for ventilator function), unidirectional valve movement, and vapouriser interlock.",
    cites: ["BJA Educ 2005"],
  },
];

const BreathingCircuitsTopic = () => {
  return (
    <TopicTemplate
      title="Anaesthetic Breathing Systems"
      subtitle="FRCA Primary / Final — Physics (Mapleson A–F, circle systems, low-flow anaesthesia)"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={keyPoints}
      topicId="breathing-circuits"
      topicTitle="Anaesthetic Breathing Systems"
      quizQuestions={breathingCircuitsQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["BJA Educ 2005", "Al-Shaikh & Stacey Ch.6-7"],
        keyPoints: ["BJA Educ 2005", "Al-Shaikh & Stacey Ch.6-7", "Davey & Diba Ch.5"],
        workedExamples: ["BJA Educ 2005", "Al-Shaikh & Stacey Ch.6-7"],
      }}
      coreConcepts={
        <>
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
          <section className="space-y-6">
            {/* Why it matters */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Why breathing circuits dominate the equipment viva
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Two facts examine themselves every year: the
                <strong> reversal </strong> of efficiency between Mapleson A
                and D when you switch between spontaneous and controlled
                ventilation, and the chemistry of soda lime degradation
                (Compound A, carbon monoxide). The interactive simulator
                below makes the first fact visible; the schematic and
                tables make the second testable.
              </p>
            </div>

            {/* Mapleson interactive */}
            <MaplesonEfficiencyDiagram />

            {/* Static schematic */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Mapleson circuits — anatomy
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Trace the position of the fresh-gas inlet, APL valve and
                reservoir bag for each circuit. Geometry is destiny: the
                position of the APL valve relative to the patient is what
                determines whether dead-space or alveolar gas is preferentially
                vented during expiration.
              </p>
              <div className="not-prose">
                <BreathingCircuitsDiagram />
              </div>
            </div>

            {/* Circle system */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Circle system — seven components, two valves
              </h2>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1 mb-3">
                <li>Fresh-gas inlet</li>
                <li>Inspiratory unidirectional valve</li>
                <li>Inspiratory limb (corrugated, heated/humidified by absorber)</li>
                <li>Y-piece at patient</li>
                <li>Expiratory limb + expiratory unidirectional valve</li>
                <li>APL valve (manual mode) / ventilator selector switch</li>
                <li>CO₂ absorber (soda lime or Amsorb®) → reservoir bag → back to FGF inlet</li>
              </ol>
              <p className="text-sm text-muted-foreground">
                The two unidirectional valves are the safety-critical
                components: any failure converts a circle into a Mapleson
                A-equivalent with massive rebreathing.
              </p>
            </div>

            {/* Soda lime chemistry */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Soda lime and its hazards
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  {
                    name: "Composition",
                    detail:
                      "Ca(OH)₂ ~80 %, NaOH ~4 % (catalyst), KOH ~1 % (older formulations), water ~14 %, silica hardener. Indicator dye (ethyl violet) turns blue when exhausted.",
                  },
                  {
                    name: "Reaction (exothermic)",
                    detail:
                      "CO₂ + H₂O → H₂CO₃; H₂CO₃ + 2 NaOH → Na₂CO₃ + 2 H₂O + heat; Na₂CO₃ + Ca(OH)₂ → CaCO₃ + 2 NaOH (regenerated).",
                  },
                  {
                    name: "Compound A",
                    detail:
                      "Sevoflurane + desiccated absorbent → nephrotoxic in rats. Mitigate with FGF ≥ 2 L/min, fresh absorbent, no overnight FGF.",
                  },
                  {
                    name: "Carbon monoxide",
                    detail:
                      "Desflurane (and isoflurane > sevoflurane) + desiccated KOH-containing absorbent → CO. Greatest first case of the week. Amsorb® (Ca(OH)₂-only) eliminates the risk.",
                  },
                ].map((s) => (
                  <div key={s.name} className="p-3 rounded-lg border border-border">
                    <p className="font-semibold text-foreground text-sm">{s.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">{s.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pitfalls */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                Common exam pitfalls
              </h2>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Quoting "A is best for IPPV" — A is best for <em>spontaneous</em>; D / Bain is best for IPPV.</li>
                <li>Calling Bain a Mapleson A — it is a coaxial modification of D.</li>
                <li>Forgetting that the Jackson-Rees (F) bag is open-tailed; squeezing it gives both ventilation and a visual cue of compliance and effort.</li>
                <li>Listing six (not seven) components of the circle system — the reservoir bag is often the forgotten one.</li>
                <li>Claiming Amsorb® is a soda lime — it is a calcium-hydroxide-only absorbent designed to eliminate Compound A and CO.</li>
                <li>Confusing the two-bag test (circuit integrity) with the AAGBI machine check as a whole.</li>
              </ul>
            </div>
          </section>
        </ExamSection>
          <TopicFaqs faqs={breathingCircuitsFaqs} />
        </>
      }
    />
  );
};

export default BreathingCircuitsTopic;
