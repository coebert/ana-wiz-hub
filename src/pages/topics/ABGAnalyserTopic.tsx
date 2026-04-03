import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { abgAnalyserQuestions } from "@/data/quizzes";
import ABGAnalyserDiagram from "@/components/diagrams/ABGAnalyserDiagram";

const ABGAnalyserTopic = () => {
  return (
    <SectionLayout title="ABG Analyser & Gas Measurement" subtitle="Primary / Final — Physics" backPath="/physics" backLabel="Physics" accentColor="text-physics">
      <ABGAnalyserDiagram />

      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ABG Analyser Overview</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            A modern blood gas analyser directly measures three parameters — pH, PO₂, and PCO₂ — using electrochemical electrodes maintained at 37°C. All other values (HCO₃⁻, base excess, SaO₂) are <strong>calculated</strong> using the Henderson-Hasselbalch equation and standard algorithms.
          </p>
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
                <tr className="border-b border-border">
                  <td className="p-2 font-medium text-foreground">Type</td>
                  <td className="p-2">Potentiometric</td>
                  <td className="p-2">Amperometric</td>
                  <td className="p-2">Potentiometric</td>
                  <td className="p-2">Galvanic (self-generating)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium text-foreground">Measures</td>
                  <td className="p-2">Voltage (mV)</td>
                  <td className="p-2">Current (nA)</td>
                  <td className="p-2">Voltage (mV)</td>
                  <td className="p-2">EMF (mV)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium text-foreground">External power</td>
                  <td className="p-2">No</td>
                  <td className="p-2">Yes (−0.6V)</td>
                  <td className="p-2">No</td>
                  <td className="p-2">No</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium text-foreground">Cathode</td>
                  <td className="p-2">—</td>
                  <td className="p-2">Platinum</td>
                  <td className="p-2">—</td>
                  <td className="p-2">Gold</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium text-foreground">Anode</td>
                  <td className="p-2">—</td>
                  <td className="p-2">Ag/AgCl</td>
                  <td className="p-2">—</td>
                  <td className="p-2">Lead (consumed)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium text-foreground">Membrane</td>
                  <td className="p-2">pH-sensitive glass</td>
                  <td className="p-2">Polypropylene (O₂)</td>
                  <td className="p-2">Teflon (CO₂)</td>
                  <td className="p-2">PTFE (O₂)</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium text-foreground">Response time</td>
                  <td className="p-2">~5s</td>
                  <td className="p-2">~20-30s</td>
                  <td className="p-2">~60-120s</td>
                  <td className="p-2">~20-30s</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-2 font-medium text-foreground">Sample</td>
                  <td className="p-2">Blood</td>
                  <td className="p-2">Blood</td>
                  <td className="p-2">Blood</td>
                  <td className="p-2">Gas</td>
                </tr>
              </tbody>
            </table>
          </div>
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
        </div>

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
      </section>

      <KeyLearningPoints points={[
        "ABG directly measures pH (glass electrode), PO₂ (Clark), PCO₂ (Severinghaus). HCO₃⁻ and BE are calculated.",
        "Clark electrode: amperometric, −0.6V polarizing voltage, Pt cathode, polypropylene membrane, consumes O₂.",
        "Severinghaus: modified pH electrode with Teflon membrane; CO₂ → H₂CO₃ → ΔpH ∝ log PCO₂. Slowest response (~60-120s).",
        "Galvanic fuel cell: self-generating EMF, gold cathode/lead anode, lead consumed over time (~1 year lifespan). Measures FiO₂ in breathing circuit.",
        "α-stat vs pH-stat: α-stat (uncorrected at 37°C) preferred in adults; pH-stat (corrected to patient temp) in paediatric cardiac surgery.",
      ]} />

      <QuizSection questions={abgAnalyserQuestions} />
      <TopicCompletionToggle topicId="abg-analyser" topicTitle="ABG Analyser & Gas Measurement" />
    </SectionLayout>
  );
};

export default ABGAnalyserTopic;
