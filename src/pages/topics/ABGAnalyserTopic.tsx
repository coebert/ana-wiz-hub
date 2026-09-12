import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { SynthesisBlock } from "@/components/topic/SynthesisBlock";
import { abgAnalyserQuestions } from "@/data/quizzes";
import ABGAnalyserDiagram from "@/components/diagrams/physics/ABGAnalyserDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";

const abgAnalyserFaqs: Array<[string, string]> = [
  [
    "What electrodes are used in a blood-gas analyser and what does each measure?",
    "pH — Sanz (glass) electrode; potential difference across pH-sensitive glass. PCO₂ — Severinghaus (modified pH electrode separated from blood by CO₂-permeable membrane; CO₂ alters pH of bicarbonate solution inside). PO₂ — Clark polarographic electrode; O₂ reduced at platinum cathode under 0.6 V polarising voltage, current proportional to PO₂."
  ],
  [
    "How does a co-oximeter differ from a standard ABG analyser?",
    "Standard ABG calculates SaO₂ from PaO₂ via the dissociation curve — invalid in dyshaemoglobinaemia. A co-oximeter haemolyses the sample and measures absorbance at 4+ wavelengths to quantify oxy-Hb, deoxy-Hb, COHb and MetHb directly. Essential for suspected CO poisoning, methaemoglobinaemia, or after methylene blue."
  ],
  [
    "What are the standard quality-control checks for a blood-gas analyser?",
    "Daily multi-level QC with known gas/buffer cartridges; automatic 1- or 2-point calibrations every 30 min; full calibration after each maintenance; participation in external QC (e.g. UK NEQAS). Always inspect the sample for clots and air bubbles; analyse within 10 min if at room temperature, or place on ice for delays."
  ]
];

const objectives = [
  "Describe the construction and principle of the pH (Sanz) glass electrode.",
  "Explain Clark polarographic and Severinghaus electrodes for PO\u2082 and PCO\u2082.",
  "Differentiate measured vs calculated ABG parameters (HCO\u2083\u207B, BE).",
  "Compare \u03B1-stat and pH-stat blood gas management.",
  "Describe galvanic fuel cell and optode-based gas analysis.",
];

const keyPoints = [
  { text: "ABG directly measures pH (glass electrode), PO\u2082 (Clark), PCO\u2082 (Severinghaus). HCO\u2083\u207B and BE are calculated.", cites: ["BJA Educ 2017"] },
  { text: "Clark electrode: amperometric, \u22120.6V polarizing voltage, Pt cathode reduces O\u2082 (O\u2082+2H\u2082O+4e\u207B\u21924OH\u207B), Ag anode oxidised (4Ag+4Cl\u207B\u21924AgCl+4e\u207B). Current \u221D PO\u2082.", cites: ["Middleton Ch.18"] },
  { text: "pH glass electrode: H\u207A exchanges with Li\u207A/Na\u207A in hydrated gel layers \u2014 boundary potential follows Nernst equation (61.5 mV/pH unit at 37\u00B0C).", cites: ["Cross & Plunkett Ch.15-16"] },
  { text: "Severinghaus: CO\u2082 crosses Teflon membrane \u2192 CO\u2082+H\u2082O\u2192H\u207A+HCO\u2083\u207B \u2192 pH change measured by inner glass electrode. Slowest response (~60\u2013120s).", cites: ["BJA Educ 2017"] },
  { text: "Galvanic fuel cell: self-generating EMF, gold cathode/lead anode (consumed), same cathode reaction as Clark. Measures FiO\u2082 in breathing circuit.", cites: ["Middleton Ch.18"] },
  { text: "\u03B1-stat vs pH-stat: \u03B1-stat (uncorrected at 37\u00B0C) preferred in adults; pH-stat (corrected to patient temp) in paediatric cardiac surgery.", cites: ["Cross & Plunkett Ch.15-16"] },
  { text: "Optodes: fibre-optic fluorescence sensors. PO\u2082 optode uses ruthenium dye fluorescence quenching (Stern\u2013Volmer); pH optode is ratiometric; PCO\u2082 optode = Severinghaus with pH optode inside. Don't consume O\u2082, MRI-compatible, used in POC cartridges, intravascular and CPB monitors.", cites: ["BJA Educ 2017"] },
];

const ABGAnalyserTopicWorkedExamples: WorkedExample[] = [
  {
    title: "Interpreting a discrepant ABG: SaO₂ vs SpO₂",
    scenario: "A 60-year-old smoker rescued from a house fire has SpO₂ 99% on 15 L/min but the ABG reports SaO₂ 78%, COHb 22%, MetHb 1%. Explain the discrepancy and management.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Recognise SpO₂ measures the ratio of two wavelengths (660/940 nm) and cannot distinguish HbO₂ from COHb (both absorb similarly at 660 nm) — falsely reassuring</li>
          <li>Co-oximetry on the ABG uses ≥4 wavelengths and reports fractional saturations (HbO₂, HHb, COHb, MetHb) — gold standard</li>
          <li>Calculate true oxygen content: CaO₂ = (1.34 × Hb × fractional SaO₂) + (0.003 × PaO₂); CO poisoning markedly reduces CaO₂ despite normal PaO₂</li>
          <li>Treat with 100% O₂ via tight-fitting reservoir mask (t½ of COHb falls from 320 min to 80 min)</li>
          <li>Consider hyperbaric O₂ if COHb &gt;25%, neurological signs, pregnancy, or syncope/seizure</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
          <li>Trusting SpO₂ in suspected CO or smoke inhalation</li>
          <li>Methaemoglobinaemia drives SpO₂ towards 85% regardless of PaO₂ — give methylene blue 1–2 mg/kg</li>
          <li>Acid–base interpretation: CO tissue hypoxia produces metabolic acidosis with raised lactate</li>
          </ul>
        </div>
      </div>
    ),
    answer: "SpO₂ is falsely normal because COHb absorbs at 660 nm. Co-oximetry reveals 22% COHb. Treat with 100% O₂, escalate to hyperbaric O₂ given exposure and clinical context.",
    cites: ["BJA Educ 2017", "Cross & Plunkett Ch.15-16", "Middleton Ch.18"],
  },
];

const ABGAnalyserTopic = () => {
  return (
    <TopicTemplate
      title="ABG Analyser & Gas Measurement"
      subtitle="Primary / Final — Physics"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      topicId="abg-analyser"
      topicTitle="ABG Analyser & Gas Measurement"
      workedExamples={ABGAnalyserTopicWorkedExamples}
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={abgAnalyserQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: ["BJA Educ 2017", "Cross & Plunkett Ch.15-16", "Middleton Ch.18"],
        keyPoints: ["BJA Educ 2017", "Cross & Plunkett Ch.15-16", "Middleton Ch.18"],
      }}
      coreConcepts={
        <>
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} className="scroll-mt-24">
        <section className="space-y-6 mb-10">
          <div>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ABG Analyser Overview</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              A modern blood gas analyser directly measures three parameters — pH, PO₂, and PCO₂ — using electrochemical electrodes maintained at 37°C. All other values (HCO₃⁻, base excess, SaO₂) are <strong>calculated</strong> using the Henderson-Hasselbalch equation and standard algorithms.
            </p>
            <div className="my-4">
              <ABGAnalyserDiagram />
            </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">pH</p>
              <p className="text-xs text-muted-foreground mt-1">Sanz glass electrode. Potentiometric (measures voltage). Nernst equation: 61.5 mV per pH unit at 37°C.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">PO₂</p>
              <p className="text-xs text-muted-foreground mt-1">Clark polarographic electrode. Amperometric (measures current). Requires external −0.6V polarizing voltage.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">PCO₂</p>
              <p className="text-xs text-muted-foreground mt-1">Severinghaus modified pH electrode. CO₂ diffuses into NaHCO₃ film; pH change ∝ log PCO₂.</p>
            </div>
          </div>
        </div>

        {/* ── Detailed Electrode Descriptions ── */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">The pH Glass Electrode (Sanz)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The pH electrode is the simplest and fastest of the three electrodes. It consists of two half-cells — a <strong>reference half-cell</strong> (Ag/AgCl in saturated KCl) and a <strong>measuring half-cell</strong> (Ag/AgCl in internal buffer, with a pH-sensitive glass bulb at its tip). The two half-cells are connected via the blood sample and an external high-impedance voltmeter.
          </p>
          <div className="bg-card border border-border rounded-lg p-4 mb-3">
            <h3 className="font-semibold text-foreground mb-2">How the Glass Membrane Works</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              The glass membrane is made of lithium- or cesium-doped silicate glass (~0.1 mm thick). When soaked in aqueous solution, both surfaces develop a <strong>hydrated gel layer</strong> (~10 nm thick) where H⁺ ions can exchange with the metal cations (Li⁺/Na⁺) fixed in the glass lattice:
            </p>
            <div className="bg-secondary/30 rounded-lg p-3 mb-2">
              <p className="text-sm text-foreground font-mono text-center">H⁺<sub>(solution)</sub> + Li⁺<sub>(glass)</sub> ⇌ H⁺<sub>(glass)</sub> + Li⁺<sub>(solution)</sub></p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              The <strong>ion exchange</strong> at each gel layer creates a boundary potential. The <em>difference</em> between the boundary potentials on the inner and outer surfaces gives the overall membrane potential, which follows the Nernst equation. Only H⁺ can enter the gel layer (due to its tiny ionic radius) — this gives the electrode its remarkable selectivity.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Within the dry glass interior, charge is carried by Li⁺/Na⁺ ion migration (not H⁺). The glass itself has enormous electrical resistance (~10⁸ Ω), which is why a high-impedance voltmeter (≥10¹² Ω input impedance) is essential — any current drawn through the glass would alter the H⁺ distribution and corrupt the measurement.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">The Reference Electrode</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The reference half-cell provides a <strong>stable, known potential</strong> against which the measuring electrode is compared. It consists of a silver wire coated with AgCl, immersed in saturated KCl (3.5 mol/L). The Ag/AgCl equilibrium (Ag ⇌ Ag⁺ + e⁻; Ag⁺ + Cl⁻ ⇌ AgCl) produces a fixed potential because [Cl⁻] is constant (saturated). KCl diffuses slowly through the <strong>liquid junction</strong> into the blood sample — KCl is chosen because K⁺ and Cl⁻ have nearly equal mobilities, minimising liquid junction potential.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">The Clark Electrode (PO₂)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The Clark electrode is fundamentally different from the pH and CO₂ electrodes — it is <strong>amperometric</strong> (measures current, not voltage) and requires an external power supply. A <strong>polarizing voltage of −0.6V</strong> is applied between a platinum cathode and an Ag/AgCl anode, immersed in KCl/phosphate buffer electrolyte.
          </p>
          <div className="bg-card border border-border rounded-lg p-4 mb-3">
            <h3 className="font-semibold text-foreground mb-2">The Cathode Reaction (Reduction)</h3>
            <div className="bg-secondary/30 rounded-lg p-3 mb-2">
              <p className="text-sm text-foreground font-mono text-center">O₂ + 2H₂O + 4e⁻ → 4OH⁻</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dissolved O₂ from blood diffuses through the polypropylene membrane to the platinum cathode surface. The −0.6V potential provides the electrons needed to reduce O₂. Each O₂ molecule accepts <strong>4 electrons</strong>, generating 4 hydroxide ions (OH⁻). The electrons consumed at the cathode must be continuously supplied from the anode via the external circuit — this electron flow IS the measured current.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4 mb-3">
            <h3 className="font-semibold text-foreground mb-2">The Anode Reaction (Oxidation)</h3>
            <div className="bg-secondary/30 rounded-lg p-3 mb-2">
              <p className="text-sm text-foreground font-mono text-center">4Ag + 4Cl⁻ → 4AgCl + 4e⁻</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              At the silver anode, silver atoms are oxidised — each Ag atom loses one electron (Ag → Ag⁺ + e⁻). The Ag⁺ ions immediately combine with Cl⁻ from the KCl electrolyte to form insoluble AgCl, which deposits on the anode surface. The 4 electrons released travel through the external wire to the cathode, completing the circuit. More O₂ → more cathode reaction → more electrons needed → more current flows → higher ammeter reading.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">The Polarizing Voltage Plateau</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The −0.6V sits on the <strong>"plateau"</strong> of the current-voltage (polarographic) curve. Below ~−0.4V, not all O₂ molecules reaching the cathode are reduced — current depends on both voltage and PO₂. Above ~−0.8V, water itself begins to be reduced (electrolysis), adding spurious current. At −0.6V, all O₂ is immediately reduced on arrival, so current depends <em>only</em> on the rate of O₂ diffusion through the membrane — which is proportional to PO₂.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">The Severinghaus Electrode (PCO₂)</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The Severinghaus electrode is essentially a <strong>pH electrode with a gas-permeable membrane in front of it</strong>. CO₂ from the blood diffuses through a Teflon (PTFE) membrane into a thin film (~20 µm) of NaHCO₃/NaCl solution, where it hydrates to form carbonic acid, generating H⁺ ions that change the pH of the film. An inner pH glass electrode measures this pH change.
          </p>
          <div className="bg-card border border-border rounded-lg p-4 mb-3">
            <h3 className="font-semibold text-foreground mb-2">The Chemical Cascade</h3>
            <div className="bg-secondary/30 rounded-lg p-3 mb-2">
              <p className="text-sm text-foreground font-mono text-center">CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Higher blood PCO₂ → more CO₂ crosses the Teflon membrane → more H₂CO₃ forms → more H⁺ generated → lower pH in the NaHCO₃ film. The relationship is <strong>logarithmic</strong> (pH ∝ −log PCO₂), which is why two-point calibration uses two known CO₂ concentrations (typically 5% and 10%) to establish the slope of the log curve.
            </p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">Why Teflon Membrane?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The Teflon membrane is <strong>permeable to dissolved gases (CO₂) but impermeable to ions (H⁺, HCO₃⁻)</strong>. This is critical: without the membrane, the inner pH electrode would simply measure the blood pH directly (which is done by the separate pH electrode). The membrane ensures that <em>only</em> dissolved CO₂ from the blood influences the inner pH — giving the electrode its specificity for PCO₂. The trade-off is speed: CO₂ must diffuse through the membrane AND equilibrate with the NaHCO₃ film, giving the longest response time of all three electrodes (60–120 seconds).
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">The Galvanic Fuel Cell</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The galvanic fuel cell measures FiO₂ in the breathing circuit. Unlike the Clark electrode, it requires <strong>no external power supply</strong> — the electrochemical reaction between O₂ and lead spontaneously generates a voltage (EMF) proportional to PO₂. However, the lead anode is irreversibly consumed, giving the cell a finite lifespan (~6–12 months).
          </p>
          <div className="bg-card border border-border rounded-lg p-4 mb-3">
            <h3 className="font-semibold text-foreground mb-2">Ion and Electron Movement</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              <strong>Cathode (gold mesh):</strong> O₂ + 2H₂O + 4e⁻ → 4OH⁻. Same reduction reaction as the Clark electrode. Gold is catalytically active for O₂ reduction but chemically inert — it is not consumed.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              <strong>OH⁻ migration:</strong> The hydroxide ions produced at the cathode migrate through the KOH electrolyte towards the lead anode. This ionic current within the electrolyte completes the internal circuit.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">
              <strong>Anode (lead):</strong> 2Pb + 4OH⁻ → 2Pb(OH)₂ + 4e⁻. Lead atoms are oxidised, giving up electrons and combining with OH⁻ to form lead hydroxide. The lead is <em>consumed</em> — the anode physically shrinks over time.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong>Electron flow:</strong> The 4 electrons released at the anode travel through the external wire → EMF meter → gold cathode, where they are consumed by O₂ reduction. This spontaneous electron flow generates a measurable voltage without any battery.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Electrode Comparison Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 text-foreground font-semibold">Feature</th>
                  <th className="text-left p-2 text-foreground font-semibold">pH (Sanz)</th>
                  <th className="text-left p-2 text-foreground font-semibold">PO₂ (Clark)</th>
                  <th className="text-left p-2 text-foreground font-semibold">PCO₂ (Severinghaus)</th>
                  <th className="text-left p-2 text-foreground font-semibold">Galvanic Cell</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground text-xs">
                {[
                  { f: "Type", a: "Potentiometric", b: "Amperometric", c: "Potentiometric", d: "Galvanic (self-generating)" },
                  { f: "Measures", a: "Voltage (mV)", b: "Current (nA)", c: "Voltage (mV)", d: "EMF (mV)" },
                  { f: "External power", a: "No", b: "Yes (−0.6V)", c: "No", d: "No" },
                  { f: "Cathode", a: "—", b: "Platinum", c: "—", d: "Gold" },
                  { f: "Anode", a: "—", b: "Ag/AgCl", c: "—", d: "Lead (consumed)" },
                  { f: "Electrolyte", a: "Saturated KCl", b: "KCl/phosphate buffer", c: "NaHCO₃/NaCl film", d: "KOH" },
                  { f: "Membrane", a: "pH-sensitive glass", b: "Polypropylene (O₂)", c: "Teflon (CO₂)", d: "PTFE (O₂)" },
                  { f: "Cathode rxn", a: "—", b: "O₂+2H₂O+4e⁻→4OH⁻", c: "—", d: "O₂+2H₂O+4e⁻→4OH⁻" },
                  { f: "Anode rxn", a: "—", b: "4Ag+4Cl⁻→4AgCl+4e⁻", c: "—", d: "2Pb+4OH⁻→2Pb(OH)₂+4e⁻" },
                  { f: "Consumes analyte", a: "No", b: "Yes (O₂)", c: "No", d: "Yes (O₂)" },
                  { f: "Response time", a: "~5s", b: "~20–30s", c: "~60–120s", d: "~20–30s" },
                  { f: "Sample", a: "Blood", b: "Blood", c: "Blood", d: "Gas" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="p-2 font-medium text-foreground">{row.f}</td>
                    <td className="p-2">{row.a}</td>
                    <td className="p-2">{row.b}</td>
                    <td className="p-2">{row.c}</td>
                    <td className="p-2">{row.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">The Nernst Equation</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The <strong>Nernst equation</strong> (E = E₀ + RT/nF × ln[H⁺]) is the fundamental relationship governing all
            potentiometric electrodes. At 37°C (310 K), it predicts a voltage change of <strong>61.5 mV per pH unit</strong> —
            the "Nernst slope". This is derived from 2.303 × RT/nF = 2.303 × (8.314 × 310)/(1 × 96,485) = 61.5 mV.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-3">
            During electrode calibration with two standard buffers (pH 6.840 and 7.384), the measured voltage difference should
            be approximately 33.5 mV. If the measured slope falls outside <strong>95–105%</strong> of the theoretical Nernst slope,
            the electrode is degraded and must be replaced. The temperature dependence of the Nernst slope (proportional to T in
            Kelvin) explains why the analyser must be thermostatted at precisely 37°C.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Beyond the ABG analyser, the Nernst equation has broad physiological significance. It calculates the <strong>equilibrium
            potential</strong> for ions across cell membranes: Eₖ ≈ −90 mV, Eₙₐ ≈ +60 mV. The <strong>Goldman-Hodgkin-Katz
            equation</strong> extends this to multiple ions, determining the resting membrane potential. The Nernst equation also
            applies to the Severinghaus PCO₂ electrode (potentiometric) but <em>not</em> to the Clark PO₂ electrode (amperometric —
            measures current, not voltage).
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Temperature Correction</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            ABG analysers measure at 37°C. For hypothermic or hyperthermic patients, results can be corrected to actual body temperature:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">α-stat (uncorrected)</p>
              <p className="text-xs text-muted-foreground mt-1">Report values at 37°C regardless of patient temperature. Maintains intracellular electroneutrality. Preferred for most cardiac surgery and general hypothermia.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">pH-stat (corrected)</p>
              <p className="text-xs text-muted-foreground mt-1">Correct to actual patient temperature. Maintains pH 7.4 at the actual temperature. CO₂ is added. May improve cerebral blood flow in deep hypothermia. Used in paediatric cardiac surgery.</p>
            </div>
          </div>
          <div className="mt-3 text-sm text-muted-foreground space-y-2"><p>Cooling increases the solubility of O₂ and CO₂ (Henry's law), so their measured partial pressures fall. At the same time, the neutral pH of water and the pKa of histidine imidazole groups rise; if total CO₂ is unchanged, blood therefore becomes more alkaline as temperature falls.</p><p><strong>α-stat</strong> leaves results referenced to 37°C and maintains total CO₂ and histidine protonation, preserving intracellular electroneutrality. <strong>pH-stat</strong> adds CO₂ to hold pH 7.40 at the patient's actual temperature, increasing total-body CO₂ and producing relative respiratory acidosis with greater cerebral blood flow. <InlineRef topicId="abg-analyser" refLabel="Cross & Plunkett Ch.15-16" /></p></div>
        </div>

        <div><h2 className="text-2xl font-serif font-bold text-foreground mb-3">Co-oximetry</h2><div className="text-muted-foreground space-y-2"><p>A co-oximeter haemolyses the sample and applies Beer–Lambert spectrophotometry (A = εcl) at multiple wavelengths, typically 4–7 or more. The ~805 nm isobestic point gives equal HbO₂ and HHb absorptivity; additional wavelengths resolve HbO₂, HHb, COHb and MetHb.</p><p>It directly measures total haemoglobin and each species fraction. It then calculates functional saturation, HbO₂/(HbO₂+HHb), and fractional FO₂Hb, HbO₂/tHb. Fractional saturation is clinically decisive in dyshaemoglobinaemia because it reports the true fraction of haemoglobin carrying oxygen. <InlineRef topicId="abg-analyser" refLabel="BJA Educ 2017" /></p></div></div>

        <div><h2 className="text-2xl font-serif font-bold text-foreground mb-3">Calibration and Quality Control</h2><div className="text-muted-foreground space-y-2"><p>Calibration establishes the relationship between electrode voltage/current and analyte concentration. Frequent <strong>one-point calibration</strong> corrects offset using one known standard (for example pH 7.384), often every 30 minutes or around sampling. Less frequent <strong>two-point calibration</strong> corrects both offset and slope using standards bracketing the physiological range: pH 6.840/7.384 and gas mixtures such as 5% CO₂/20% O₂ and 10% CO₂/0% O₂.</p><p>Independent multi-level controls with known low, normal and high values verify the whole analyser remains within acceptable limits after calibration and maintenance. <InlineRef topicId="abg-analyser" refLabel="Middleton Ch.18" /></p></div></div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Sources of Error</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { error: "Air bubbles in sample", effect: "↑PO₂, ↓PCO₂ (equilibration with room air)" },
              { error: "Excess heparin", effect: "Dilution → ↓PCO₂, ↓HCO₃⁻. Acidic heparin → ↓pH" },
              { error: "Delayed analysis", effect: "Ongoing metabolism → ↓PO₂, ↑PCO₂, ↓pH, ↑lactate" },
              { error: "Hypothermia (uncorrected)", effect: "At 37°C: PO₂ and PCO₂ appear higher than in vivo" },
              { error: "White cell steal", effect: "Leukaemia: WBCs consume O₂ → falsely ↓PO₂" },
              { error: "Protein coating", effect: "Electrode membrane fouling → drift, inaccuracy" },
            ].map((item) => (
              <div key={item.error} className="p-2 rounded border border-border">
                <span className="font-semibold text-foreground text-xs">{item.error}: </span>
                <span className="text-xs text-muted-foreground">{item.effect}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Optodes (Optical Sensors)</h2>
          <p className="text-foreground/90 leading-relaxed mb-3">
            An <strong>optode</strong> (or optrode) is an optical analogue of an electrochemical electrode. Instead of
            generating a current or potential, it measures the analyte by changes in the <strong>fluorescence</strong>
            (or absorbance) of a chemical indicator immobilised at the tip of an optical fibre. Optodes are the basis
            of modern point-of-care and intravascular blood-gas monitoring, single-use cassette analysers (e.g.
            i-STAT-style cartridges, GEM Premier, Radiometer ABL), and CPB in-line monitors.
          </p>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Principle of operation</h3>
          <ol className="list-decimal pl-6 space-y-2 text-foreground/90">
            <li>
              An <strong>excitation light</strong> (LED or laser) of a specific wavelength is delivered down a fibre-
              optic cable to a <strong>fluorophore</strong> embedded in a polymer matrix at the sensor tip.
            </li>
            <li>
              The fluorophore absorbs photons and re-emits at a longer wavelength (Stokes shift). The intensity,
              wavelength shift, or <strong>fluorescence decay time</strong> depends on the local concentration of the
              analyte (O₂, CO₂, H⁺ etc.).
            </li>
            <li>
              The emitted light returns up the same (or a parallel) fibre to a photodetector, where the signal is
              processed to give the analyte concentration.
            </li>
          </ol>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-5 mb-2">Specific optode chemistries</h3>
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold text-foreground">Analyte</th>
                  <th className="text-left p-3 font-semibold text-foreground">Indicator dye</th>
                  <th className="text-left p-3 font-semibold text-foreground">Mechanism</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">PO₂</td>
                  <td className="p-3 align-top text-foreground/80">Ruthenium / platinum porphyrin complexes</td>
                  <td className="p-3 align-top text-foreground/80">
                    O₂ <strong>quenches</strong> fluorescence by collisional energy transfer. Quantified by the
                    Stern–Volmer relation: I₀/I = 1 + K·[O₂]. Higher PO₂ → less fluorescence and shorter decay time.
                  </td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">pH</td>
                  <td className="p-3 align-top text-foreground/80">Hydroxypyrene-trisulphonate (HPTS) or fluorescein derivatives</td>
                  <td className="p-3 align-top text-foreground/80">
                    Protonated and deprotonated forms of the dye fluoresce at different intensities/wavelengths.
                    Ratio of the two emission peaks gives pH directly (ratiometric — independent of dye concentration
                    or LED drift).
                  </td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">PCO₂</td>
                  <td className="p-3 align-top text-foreground/80">pH optode behind a CO₂-permeable membrane (Severinghaus principle)</td>
                  <td className="p-3 align-top text-foreground/80">
                    CO₂ diffuses across a silicone or Teflon membrane into a thin bicarbonate film, generating H⁺
                    that the underlying pH optode measures. PCO₂ is calculated from the Henderson–Hasselbalch
                    relation.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-5 mb-2">Stern–Volmer equation (PO₂ optode)</h3>
          <div className="bg-muted/40 rounded-lg p-4 border border-border">
            <p className="text-foreground font-mono text-center">
              I₀ / I = τ₀ / τ = 1 + K<sub>SV</sub> · PO₂
            </p>
            <p className="text-sm text-muted-foreground text-center mt-2">
              I₀, τ₀ = fluorescence intensity / decay time in the absence of O₂; I, τ = values at PO₂. K<sub>SV</sub>
              is the Stern–Volmer quenching constant.
            </p>
          </div>
          <p className="text-foreground/90 leading-relaxed mt-3">
            Modern systems prefer measuring <strong>fluorescence lifetime (τ)</strong> rather than absolute intensity
            because lifetime is unaffected by dye photobleaching, fibre bending losses, or LED ageing — making the
            sensor inherently self-calibrating.
          </p>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-5 mb-2">Advantages over conventional electrodes</h3>
          <ul className="list-disc pl-6 space-y-1 text-foreground/90">
            <li><strong>No reference electrode</strong> required — fully optical, avoids the junction-potential errors of glass and Clark electrodes.</li>
            <li><strong>No O₂ consumption</strong> (unlike the Clark electrode which consumes O₂ at its cathode), so optodes are stable in low-flow situations and small samples.</li>
            <li><strong>Miniaturisable</strong> to &lt;500 µm diameter — suitable for intravascular and intraparenchymal use (e.g. brain tissue PtO₂ probes — Licox, Neurotrend).</li>
            <li><strong>Disposable, single-use cassettes</strong> — pre-calibrated, no daily quality-control runs, no electrode maintenance.</li>
            <li><strong>MRI-compatible</strong> — fibre-optic, no metal parts or electromagnetic interference.</li>
            <li><strong>Ratiometric pH measurement</strong> is independent of light-source drift and ambient illumination.</li>
            <li>Faster equilibration than the Severinghaus electrode for PCO₂.</li>
          </ul>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-5 mb-2">Limitations</h3>
          <ul className="list-disc pl-6 space-y-1 text-foreground/90">
            <li><strong>Photobleaching</strong> of the fluorophore over time — limits sensor lifespan to hours–days.</li>
            <li><strong>Temperature dependence</strong> — fluorescence quenching is temperature-sensitive; built-in thermistor and software correction required.</li>
            <li>PO₂ optodes are <strong>non-linear</strong> (Stern–Volmer), most accurate at low PO₂; high-PaO₂ readings less precise than the Clark electrode.</li>
            <li>More expensive per disposable cassette than reusable electrodes for high-throughput laboratories.</li>
            <li>Fibre fragility, particularly for indwelling intravascular probes.</li>
          </ul>

          <h3 className="text-lg font-serif font-semibold text-foreground mt-5 mb-2">Clinical applications</h3>
          <ul className="list-disc pl-6 space-y-1 text-foreground/90">
            <li><strong>Point-of-care blood-gas analysers</strong> using disposable cartridges (i-STAT, epoc, GEM Premier).</li>
            <li><strong>Intravascular continuous blood-gas monitoring</strong> (Paratrend / Neurotrend, historically) — a 0.5 mm catheter with three optodes (PO₂, PCO₂, pH) plus a thermocouple, sited via an arterial cannula.</li>
            <li><strong>Cardiopulmonary bypass</strong> in-line gas monitors for continuous PO₂ / PCO₂ / pH on the venous and arterial sides of the circuit (e.g. Terumo CDI 500).</li>
            <li><strong>Brain tissue oxygenation (PbtO₂)</strong> probes (Licox, Neurovent-PTO) for monitoring after traumatic brain injury and subarachnoid haemorrhage.</li>
            <li><strong>Transcutaneous CO₂ / O₂</strong> monitoring in neonates and during sleep studies.</li>
          </ul>

          <div className="bg-secondary/30 rounded-lg p-4 mt-4 border border-border">
            <p className="text-sm font-medium text-foreground">Exam pearl</p>
            <p className="text-sm text-muted-foreground mt-1">
              The single most testable fact: a PO₂ optode works by <strong>fluorescence quenching</strong> of a
              ruthenium dye, described by the <strong>Stern–Volmer equation</strong>, and — unlike the Clark electrode
              — does <strong>not consume oxygen</strong>. The pH optode is <strong>ratiometric</strong>; the PCO₂
              optode is essentially a Severinghaus electrode with the inner pH glass replaced by a pH optode.
            </p>
          </div>
        </div>

      <SynthesisBlock
        title="Blood Gas Analyser — What's Measured vs Calculated"
        subtitle="The headline distinction that drives most viva questions on this topic."
        variant="table"
      >
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left p-2 text-foreground font-semibold">Parameter</th>
              <th className="text-left p-2 text-foreground font-semibold">Status</th>
              <th className="text-left p-2 text-foreground font-semibold">Method / Source</th>
            </tr>
          </thead>
          <tbody className="text-foreground/90">
            {[
              ["pH", "Measured", "Sanz electrode (glass H⁺-selective, vs Ag/AgCl reference) at 37 °C"],
              ["PCO₂", "Measured", "Severinghaus electrode (CO₂ → bicarbonate buffer → pH change)"],
              ["PO₂", "Measured", "Clark electrode (polarographic, O₂ reduction at platinum cathode)"],
              ["HCO₃⁻ / BE", "Calculated", "Henderson-Hasselbalch from pH and PCO₂"],
              ["SaO₂", "Calculated", "Standard O₂-Hb dissociation curve (or measured by co-oximeter)"],
              ["COHb / MetHb", "Measured (co-oximeter)", "Multi-wavelength spectrophotometry"],
            ].map(([p, status, method]) => (
              <tr key={p as string} className="border-b border-border/50">
                <td className="p-2 font-medium">{p}</td>
                <td className="p-2 text-muted-foreground">{status}</td>
                <td className="p-2 text-muted-foreground">{method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SynthesisBlock>
          <ExamPitfallsCallout
            accent="physics"
            pitfalls={[
              "pH electrode: glass membrane sensitive to H⁺, referenced to a Ag/AgCl electrode in saturated KCl.",
              "Clark electrode measures pO₂ amperometrically — current proportional to O₂ reduced at a polarised platinum cathode.",
              "Severinghaus electrode measures pCO₂ — a modified pH electrode behind a CO₂-permeable membrane.",
              "Galvanic fuel cell measures FiO₂ — self-powered, depletes over months; replace when low-O₂ alarm fails calibration.",
              "Pre-analytical errors: air bubbles (falsely high pO₂), delayed analysis (falling pO₂, rising pCO₂), heparin dilution (falsely low pCO₂).",
            ]}
          />
        </section>
      </ExamSection>
          <TopicFaqs faqs={abgAnalyserFaqs} />
        </>
      }
    />
  );
};

export default ABGAnalyserTopic;
