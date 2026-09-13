import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { Exam } from "@/data/curriculum";
import { ExamSection } from "@/components/exam/ExamSection";
import { breathingCircuitsQuiz } from "@/data/quizzes";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import BreathingCircuitsDiagram from "@/components/diagrams/physics/BreathingCircuitsDiagram";
import MaplesonEfficiencyDiagram from "@/components/diagrams/physics/MaplesonEfficiencyDiagram";
import { InlineRef } from "@/components/references/InlineRef";

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
  "Specify the Association of Anaesthetists / RCoA 2024 pre-use checks of the breathing system (two-bag test) and the safety design of scavenging systems (30 mm connector, ±0.5 cmH₂O safety valves).",
  "Explain how breathing systems conserve heat and humidity, and the role of HMEs and heated humidifiers.",

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
    text: "Pre-use check (Association of Anaesthetists / RCoA 2024, 'Anaesthesia, anaesthetic machines and patient safety'): a full structured check at the start of every session and after any change to the system, following an upstream-to-downstream sequence — machine self-test and power, gas supplies and back-up cylinders, flowmeters and anti-hypoxia device, vapouriser fill/seating and interlock, then the breathing system checked by the anaesthetist personally: visual inspection for correct configuration and patency, a two-bag test (reservoir bag on the machine end and a second bag at the patient end, occluded: APL closed to confirm no leak and correct pressure rise, then opened and the ventilator run to confirm bag movement and valve function), unidirectional valve movement, alternative oxygen supply and a working self-inflating bag immediately available, plus capnography and airway-pressure alarms confirmed. A signed, recorded checklist for each machine each session makes the check auditable; the 2024 guideline additionally covers machine procurement standards, workstation standardisation, servicing, alarm management and training.",
    cites: ["RCoA/AoA 2024 Machine Check"],
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

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Humphrey ADE and Aintree catheter</h2>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p>
                  The <strong>Humphrey ADE</strong> combines Mapleson A, D and E functions in one coaxial system. In
                  <strong> A mode</strong>, its lever routes expiration to an APL valve near the patient, so it behaves like a
                  Lack circuit and is efficient for spontaneous ventilation. In <strong>D/E mode</strong>, that valve is isolated,
                  the reservoir bag lies on the expiratory limb and fresh gas reaches the patient end, making it efficient for
                  controlled ventilation. The mode can therefore change without replacing the circuit
                  <InlineRef topicId="breathing-circuits" refLabel="Anaesthesia 1989 ADE" />.
                </p>
                <p>
                  The <strong>Aintree Intubation Catheter</strong> is an airway-exchange catheter, not a Mapleson class. It is passed
                  over a flexible bronchoscope through a suitable supraglottic airway, the SAD is removed, and a tracheal tube is
                  railroaded over the catheter. Its 15 mm connector permits oxygen insufflation or connection to a breathing system,
                  but gas egress must remain unobstructed to avoid barotrauma.
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Work of breathing</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Circuit work is the integral of pressure against volume for each breath. Every breathing system adds work, with the
                expiratory component often increasing more than inspiration <InlineRef topicId="breathing-circuits" refLabel="BJA 1983 Work of Breathing" />.
                Mapleson systems have no absorber or unidirectional valves and are relatively low resistance; circle systems add valve,
                tubing and absorber resistance, worsened by small-bore components, wet filters or compacted granules. Excess FGF can
                oppose expiration and increase expiratory work. Low-resistance E/F circuits are therefore valuable in infants and in
                patients with limited ventilatory reserve, balanced against their high FGF requirement.
              </p>
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
              <div className="mt-4 border-t border-border pt-4">
                <h3 className="font-semibold text-foreground">Closed-circuit anaesthesia</h3>
                <div className="mt-2 text-sm text-muted-foreground leading-relaxed space-y-2">
                  <p><strong>Wash-in:</strong> begin with high FGF and a high inspired agent setting to denitrogenate the circuit and patient and rapidly approach the target end-tidal concentration. <strong>Equilibration:</strong> reduce FGF in steps while tissue uptake remains high, replacing oxygen consumed and agent taken up. <strong>Maintenance:</strong> in a true closed circuit, total FGF approximates metabolic uptake—about <strong>200–300 mL/min</strong> in a resting adult—so oxygen and agent delivery must track consumption continuously.</p>
                  <p>Agent may be supplied by measured liquid injection, a vaporiser-in-circuit, or a conventional out-of-circle vaporiser with brief setting/flow adjustments. The first two permit fine low-flow control; the last responds slowly because circuit volume buffers every change. Continuous inspired oxygen, inspired/expired agent, capnography, airway pressure and inspired/expired volume monitoring are mandatory.</p>
                  <p>Benefits are maximal gas and agent economy, less theatre pollution, and excellent heat and humidity conservation. Hazards are slow concentration changes, hypoxic-mixture or overdose drift, dependence on circuit integrity and absorbent function, and accumulation of nitrogen, methane, acetone and carbon monoxide. Periodic high-flow flushing removes unwanted gases but temporarily ends closed-circuit operation <InlineRef topicId="breathing-circuits" refLabel="BJA 1986 Closed Loop" />.</p>
                </div>
              </div>
            </div>

            <div id="heat-humidity">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Heat and humidity conservation</h2>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p>
                  Medical gases leave a cylinder or pipeline essentially <strong>dry (0 mg H₂O/L) and at room temperature</strong>.
                  Normally the upper airway warms and saturates inspired gas so that by the carina it is at 32–34 °C with ~30 mg/L of
                  water, reaching <strong>37 °C and 44 mg/L (100 % relative humidity)</strong> at the alveoli. A tracheal tube or
                  supraglottic airway bypasses this air-conditioning function, so the burden falls on the lower airway or on the
                  breathing system.
                </p>
                <p>
                  <strong>Consequences of dry, cold gas:</strong> loss of the periciliary fluid layer with <strong>impaired
                  mucociliary clearance</strong>, thick secretions, mucosal ulceration, atelectasis and sputum retention (important in
                  long cases and in the ICU); loss of <strong>latent heat of vaporisation</strong> as the airway humidifies gas, plus
                  convective loss, contributing perhaps 10 % of intra-operative heat loss and aggravating hypothermia with its coagulopathy,
                  wound-infection and shivering consequences.
                </p>
                <p>
                  <strong>How a circle system conserves both:</strong> exhaled gas is already warm and saturated and is returned to the
                  patient, and the <strong>soda lime reaction is exothermic</strong> (CO₂ + Ca(OH)₂ → CaCO₃ + H₂O + heat), generating both
                  heat and water of neutralisation. Inspired gas from a circle typically reaches ~28–32 °C with 20–30 mg/L of water after
                  20–30 minutes. The <strong>lower the fresh gas flow, the greater the proportion of rebreathed, conditioned gas</strong> — so
                  low-flow (0.5–1 L/min) and closed-circuit anaesthesia give the best heat and humidity preservation, whereas high FGF or a
                  non-rebreathing Mapleson system delivers essentially dry, cold gas <InlineRef topicId="breathing-circuits" refLabel="Davey & Diba Ch.5" />.
                </p>
                <p>
                  <strong>Added devices:</strong> a <strong>heat and moisture exchanger (HME)</strong> is a passive hygroscopic/hydrophobic
                  element at the patient end that traps expired heat and water and returns them on inspiration, achieving ~25–30 mg/L; it is
                  cheap and simple but adds dead space and resistance and becomes less effective when wet or contaminated. <strong>Active
                  heated humidifiers</strong> (hot-water bath with a heated wire circuit) deliver 37 °C and 44 mg/L, and are preferred for
                  prolonged ventilation, paediatric practice, and where secretions are tenacious; risks are circuit condensation, scalding,
                  extra dead space where a chamber is used, and microbial colonisation. Practical measures alongside these — warmed intravenous
                  fluids, forced-air warming and a low fresh gas flow — matter more for whole-body temperature than the circuit alone
                  <InlineRef topicId="breathing-circuits" refLabel="Al-Shaikh & Stacey Ch.6-7" />.
                </p>
              </div>
            </div>


            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Breathing-system filters and HMEs</h2>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p>
                  <strong>Electrostatic filters</strong> attract charged particles; pleated hydrophobic filters combine interception,
                  inertial impaction and diffusion. An <strong>HME</strong> additionally retains expired heat and water in hygroscopic
                  material and returns them during inspiration. At the patient Y-piece, one device protects the circuit and humidifies
                  gas but adds apparatus dead space; at the machine end it protects equipment with less patient dead space but does not
                  humidify the airway or isolate the whole circuit <InlineRef topicId="breathing-circuits" refLabel="Anaesthesia 1999 Filters" />.
                </p>
                <p>
                  Resistance rises with secretions, blood, condensation or nebulised drug deposition and may cause occult obstruction,
                  especially in children or spontaneous ventilation. Select the smallest appropriate dead space, monitor airway pressure
                  and capnography, inspect after nebulisation or bleeding, and replace a visibly wet or contaminated device.
                </p>
              </div>
            </div>

            {/* 2024 machine-safety guideline */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
                The 2024 AoA/RCoA machine-safety guideline — beyond the checklist
              </h2>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
                <p>
                  The joint Association of Anaesthetists / Royal College of Anaesthetists guideline
                  <em> Anaesthesia, anaesthetic machines and patient safety</em> (2024)
                  <InlineRef topicId="breathing-circuits" refLabel="RCoA/AoA 2024 Machine Check" /> supersedes the AAGBI 2012
                  <em> Checking Anaesthetic Equipment</em> guidance and deliberately widens the scope: the pre-use check is only one
                  element of keeping patients safe around anaesthetic machines. Its recommendations cover the whole life-cycle of the
                  workstation.
                </p>
                <ul className="list-disc list-inside space-y-1.5">
                  <li>
                    <strong>Pre-use checking.</strong> A full structured check at the start of every session, following an
                    upstream-to-downstream sequence (power and self-test → gas supplies and back-up cylinders → flowmeters and
                    anti-hypoxia device → vapourisers → breathing system → ventilator, suction and scavenging → monitoring and
                    alarms → airway equipment). The breathing system itself must be checked by the anaesthetist personally before
                    every patient using the <strong>two-bag test</strong>, and an abbreviated check is repeated between cases and
                    after any change to the configuration. Every check is <strong>recorded and signed</strong> for each machine,
                    each session.
                  </li>
                  <li>
                    <strong>Equipment standards and procurement.</strong> Machines should comply with current standards and be
                    purchased, maintained and decommissioned under a documented departmental equipment-management programme, with
                    scheduled servicing and electrical-safety testing.
                  </li>
                  <li>
                    <strong>Human factors and standardisation.</strong> Workstation layout, gas connections, controls and monitors
                    should be standardised within a department so that a familiar machine in one theatre behaves identically in
                    another — reducing error when staff move between rooms or work out of hours.
                  </li>
                  <li>
                    <strong>Alarms and monitoring.</strong> Capnography and airway-pressure alarms must be verified as functioning
                    before use; alarm limits should be set appropriately and restored after temporary silencing, never permanently
                    disabled.
                  </li>
                  <li>
                    <strong>Fallbacks.</strong> An alternative oxygen supply (full cylinder) and a tested <strong>self-inflating
                    bag</strong> — a means of ventilation entirely independent of the machine — must be immediately available at every
                    location where anaesthesia is given, including remote sites.
                  </li>
                  <li>
                    <strong>Training and competence.</strong> Every anaesthetist must be trained and demonstrably competent on the
                    specific machine model in use, including its self-test, vaporiser mounting and ventilator modes; departments must
                    provide that training for new equipment.
                  </li>
                </ul>
                <p>
                  For the exam, know the checklist sequence in order, but be ready to discuss why the 2024 document reframes machine
                  safety as a <strong>system property</strong> — procurement, standardisation, maintenance, alarms and training —
                  rather than a morning ritual <InlineRef topicId="breathing-circuits" refLabel="RCoA/AoA 2024 Machine Check" />.
                </p>
              </div>
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
                      "Strong KOH/NaOH extracts hydrogen from the CHF₂ moiety of desflurane, enflurane or isoflurane, forming an unstable vinyl-halide intermediate that breaks down to carbon monoxide. The exothermic process accelerates with dryness, heat and strong-base concentration and is greatest after prolonged dry FGF, classically the first case after a weekend. Sevoflurane lacks CHF₂ and produces much less CO.",
                  },
                  {
                    name: "Absorbent comparison",
                    detail:
                      "Traditional soda lime contains Ca(OH)₂ plus NaOH/KOH catalysts and can generate heat, Compound A and CO when dry. Modern low-alkali soda lime removes KOH and reduces NaOH. Amsorb® uses Ca(OH)₂ with CaCl₂/CaSO₄, does not degrade volatile agents to Compound A or CO, but costs more and may exhaust more abruptly.",
                  },
                  {
                    name: "Lithium hydroxide",
                    detail:
                      "LiOH-based absorbents (e.g. Litholyme®) do not require water for CO₂ binding, have high absorption capacity per gram and do not generate Compound A or CO. They are lighter and remain safe when desiccated, but are generally more expensive and local compatibility/disposal guidance must be followed.",
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
                <li>Confusing the two-bag test (circuit integrity) with the full AoA/RCoA 2024 machine check as a whole.</li>
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
