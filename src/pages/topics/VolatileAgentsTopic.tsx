import { TopicTemplate } from "@/components/TopicTemplate";
import { MACDiagram } from "@/components/diagrams/MACDiagram";
import { SynthesisBlock } from "@/components/SynthesisBlock";
import { volatileAgentsQuiz } from "@/data/quizzes";
import VolatileAgentStructures from "@/components/diagrams/VolatileAgentStructures";
import SecondGasEffectDiagram from "@/components/diagrams/SecondGasEffectDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const VolatileAgentsTopic = () => {
  return (
    <TopicTemplate
      title="Volatile Anaesthetic Agents"
      subtitle="FRCA Primary — Pharmacology"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
      topicId="volatile-agents"
      topicTitle="Volatile Anaesthetic Agents"
      quizQuestions={volatileAgentsQuiz}
      objectives={[
        "Define MAC and its variants (MAC-awake, MAC-BAR, MAC-intubation) and list factors that increase or decrease MAC",
        "Explain how blood:gas and oil:gas partition coefficients determine onset, offset and potency of inhaled agents",
        "Compare sevoflurane, isoflurane, desflurane and N₂O by physicochemistry, pharmacology and clinical use",
        "Describe modern molecular targets of volatile agents (GABA_A, glycine, two-pore K⁺, NMDA, HCN) and the limits of Meyer–Overton",
        "Identify hazards specific to individual agents (Compound A, halothane hepatitis, desflurane sympathetic surge, N₂O & B12)",
      ]}
      keyPoints={[
        { text: "MAC is the ED₅₀ for immobility; lower MAC = more potent. MAC values are additive between agents.", cites: ["BJA Educ 2014"] },
        { text: "Blood:gas partition coefficient determines speed of onset — low BGPC (desflurane 0.42) = fast onset; high BGPC (halothane 2.54) = slow onset.", cites: ["Eger"] },
        { text: "Meyer-Overton: anaesthetic potency correlates with lipid solubility (oil:gas partition coefficient). MAC × oil:gas ≈ constant.", cites: ["Peck & Hill Ch.4"] },
        { text: "FA/FI rise is faster with: low BGPC, high FI, high minute ventilation, low cardiac output, second gas effect.", cites: ["BJA Educ 2014"] },
        { text: "MAC decreases with: age >40, hypothermia, opioids, pregnancy, acute alcohol. MAC increases with: youth, hyperthermia, chronic alcohol, CNS stimulants.", cites: ["Eger"] },
        { text: "Sevoflurane: non-pungent, ideal for inhalational induction. Desflurane: fastest recovery but pungent, needs heated vaporizer. Isoflurane: slower, good muscle relaxation.", cites: ["Peck & Hill Ch.4"] },
        { text: "Modern targets include GABAA receptors, glycine receptors, two-pore K⁺ channels (TREK/TASK), and NMDA receptors.", cites: ["BJA Educ 2014"] },
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY], curriculumCodes: ["PR_BK_05"] },
        diagrams: { exams: [Exam.PRIMARY], curriculumCodes: ["PR_BK_05"] },
        keyPoints: { exams: [Exam.PRIMARY], curriculumCodes: ["PR_BK_05"] },
      }}
      sectionSources={{
        objectives: ["BJA Educ 2014", "Peck & Hill Ch.4", "Eger"],
        diagrams: ["BJA Educ 2014", "Peck & Hill Ch.4"],
        keyPoints: ["BJA Educ 2014", "Peck & Hill Ch.4", "Eger"],
      }}
      coreConcepts={
        <div className="prose prose-slate max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
            <p className="text-foreground/90 leading-relaxed">
              Volatile anaesthetic agents are halogenated hydrocarbons administered via inhalation to produce general
              anaesthesia. The agents in current clinical use — sevoflurane, desflurane, and isoflurane — differ in their
              physicochemical properties, which determine their clinical characteristics including speed of onset, recovery,
              and potency.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-serif font-bold text-foreground mb-4">Molecular Structures</h2>
            <p className="text-foreground/90 leading-relaxed mb-3">
              All modern volatile agents are halogenated ethers (sevoflurane, isoflurane, desflurane, enflurane) or alkanes (halothane). Halogenation with fluorine increases stability and reduces flammability; the size and shape of the molecule influence potency and partition coefficients.
            </p>
            <VolatileAgentStructures />
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Minimum Alveolar Concentration (MAC)</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              MAC is defined as the minimum alveolar concentration of an inhaled anaesthetic at 1 atmosphere that prevents
              movement in response to a standard surgical stimulus in 50% of subjects. It is the ED₅₀ for immobility and
              provides a measure of anaesthetic potency — a <strong>lower MAC = more potent agent</strong>.
            </p>
            <div className="bg-card rounded-xl border border-border p-6">
              <MACDiagram />
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 mt-4 border border-border">
              <p className="text-sm font-medium text-foreground">MAC Multiples in Practice</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                <li>• <strong>MAC-awake (0.3-0.5 MAC)</strong>: concentration at which 50% of patients open eyes to command</li>
                <li>• <strong>MAC-BAR (1.5-1.7 MAC)</strong>: blocks adrenergic response to surgical incision</li>
                <li>• <strong>MAC-intubation (~1.3 MAC)</strong>: prevents coughing/movement during laryngoscopy</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Factors Affecting MAC</h2>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                <h3 className="font-semibold text-primary text-sm mb-2">↓ Decrease MAC</h3>
                <ul className="text-sm text-foreground/80 space-y-1">
                  <li>• Increasing age (↓ 6% per decade after 40)</li>
                  <li>• Hypothermia</li>
                  <li>• Opioids, benzodiazepines, α₂-agonists</li>
                  <li>• Acute alcohol intoxication</li>
                  <li>• Pregnancy</li>
                  <li>• Hyponatraemia, hypotension, anaemia</li>
                  <li>• Concurrent N₂O or other volatiles (additive)</li>
                </ul>
              </div>
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                <h3 className="font-semibold text-destructive text-sm mb-2">↑ Increase MAC</h3>
                <ul className="text-sm text-foreground/80 space-y-1">
                  <li>• Young age (MAC peaks at ~6 months)</li>
                  <li>• Hyperthermia</li>
                  <li>• Chronic alcohol use / CNS stimulants</li>
                  <li>• Red hair (MC1R mutation)</li>
                  <li>• Hypernatraemia</li>
                </ul>
              </div>
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> MAC is NOT affected by gender, duration of anaesthesia, PaCO₂ (within normal range),
                or PaO₂ above 20 kPa.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Blood:Gas Partition Coefficient</h2>
            <p className="text-foreground/90 leading-relaxed">
              The blood:gas partition coefficient (BGPC) determines the speed of onset and offset. It represents how
              soluble the agent is in blood relative to the alveolar gas phase. A <strong>low BGPC = fast onset</strong>
              because less agent is dissolved in blood, so alveolar (and therefore brain) partial pressure rises rapidly.
            </p>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-3 font-semibold text-foreground">Agent</th>
                    <th className="text-center p-3 font-semibold text-foreground">BGPC</th>
                    <th className="text-center p-3 font-semibold text-foreground">MAC (%)</th>
                    <th className="text-center p-3 font-semibold text-foreground">Oil:Gas</th>
                    <th className="text-center p-3 font-semibold text-foreground">Speed</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 text-foreground">N₂O</td>
                    <td className="p-3 text-center text-muted-foreground">0.47</td>
                    <td className="p-3 text-center text-muted-foreground">105</td>
                    <td className="p-3 text-center text-muted-foreground">1.4</td>
                    <td className="p-3 text-center text-accent font-medium">Fastest</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 text-foreground">Desflurane</td>
                    <td className="p-3 text-center text-muted-foreground">0.42</td>
                    <td className="p-3 text-center text-muted-foreground">6.0</td>
                    <td className="p-3 text-center text-muted-foreground">18.7</td>
                    <td className="p-3 text-center text-accent font-medium">Very fast</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 text-foreground">Sevoflurane</td>
                    <td className="p-3 text-center text-muted-foreground">0.65</td>
                    <td className="p-3 text-center text-muted-foreground">2.0</td>
                    <td className="p-3 text-center text-muted-foreground">47</td>
                    <td className="p-3 text-center text-foreground">Fast</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 text-foreground">Isoflurane</td>
                    <td className="p-3 text-center text-muted-foreground">1.46</td>
                    <td className="p-3 text-center text-muted-foreground">1.15</td>
                    <td className="p-3 text-center text-muted-foreground">91</td>
                    <td className="p-3 text-center text-muted-foreground">Moderate</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 text-foreground">Halothane</td>
                    <td className="p-3 text-center text-muted-foreground">2.54</td>
                    <td className="p-3 text-center text-muted-foreground">0.75</td>
                    <td className="p-3 text-center text-muted-foreground">224</td>
                    <td className="p-3 text-center text-muted-foreground">Slow</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Mechanisms of Action</h2>

            <h3 className="text-lg font-semibold text-foreground mt-4">The Meyer-Overton Hypothesis</h3>
            <p className="text-foreground/90 leading-relaxed">
              The Meyer-Overton hypothesis (1899-1901) states that anaesthetic potency correlates with lipid solubility.
              The oil:gas partition coefficient is inversely proportional to MAC — i.e., the more lipid-soluble an agent,
              the more potent it is. This elegant relationship holds remarkably well across diverse agents (MAC × oil:gas ≈ constant ≈ 1.82–2.05 atm).
            </p>

            <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
              <p className="text-sm font-medium text-foreground">Limitations of Meyer-Overton</p>
              <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                <li>• <strong>Non-immobilisers</strong>: Some highly lipid-soluble compounds (e.g., perfluoroalkanes) do not produce anaesthesia despite predicted potency</li>
                <li>• <strong>Stereoisomers</strong>: Enantiomers of isoflurane have different potencies despite identical lipid solubility, implying a specific protein target</li>
                <li>• <strong>Cut-off effect</strong>: Beyond a certain chain length in homologous series, potency plateaus or disappears</li>
                <li>• <strong>Temperature anomaly</strong>: Does not fully account for temperature-dependent changes in potency</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-6">The Protein Theory (Modern Consensus)</h3>
            <p className="text-foreground/90 leading-relaxed">
              Current evidence strongly supports that volatile agents act predominantly by binding directly to specific
              protein targets — particularly ligand-gated ion channels and other membrane proteins. Key molecular targets include:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                <h4 className="font-semibold text-primary text-sm mb-2">Enhanced (Inhibitory) Targets</h4>
                <ul className="text-sm text-foreground/80 space-y-2">
                  <li>• <strong>GABA<sub>A</sub> receptors</strong>: Potentiate inhibitory chloride currents; major contributor to hypnosis and amnesia</li>
                  <li>• <strong>Glycine receptors</strong>: Enhanced inhibitory transmission in spinal cord; contributes to immobility</li>
                  <li>• <strong>Two-pore K⁺ channels (TREK-1, TASK)</strong>: Activation hyperpolarises neurones</li>
                </ul>
              </div>
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                <h4 className="font-semibold text-destructive text-sm mb-2">Inhibited (Excitatory) Targets</h4>
                <ul className="text-sm text-foreground/80 space-y-2">
                  <li>• <strong>NMDA receptors</strong>: Inhibited by N₂O and xenon, reducing glutamatergic transmission</li>
                  <li>• <strong>Nicotinic ACh receptors</strong>: Inhibited at clinical concentrations</li>
                  <li>• <strong>HCN channels</strong>: Inhibited by halogenated agents — alters thalamocortical rhythms</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-foreground mt-6">Components of Anaesthesia</h3>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-3 font-semibold text-foreground">Component</th>
                    <th className="text-left p-3 font-semibold text-foreground">Primary Site</th>
                    <th className="text-left p-3 font-semibold text-foreground">Key Targets</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 text-foreground font-medium">Immobility (MAC)</td>
                    <td className="p-3 text-muted-foreground">Spinal cord (ventral horn)</td>
                    <td className="p-3 text-muted-foreground">Glycine, GABA<sub>A</sub>, Na⁺ channels</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 text-foreground font-medium">Hypnosis</td>
                    <td className="p-3 text-muted-foreground">Cortex, thalamus</td>
                    <td className="p-3 text-muted-foreground">GABA<sub>A</sub>, HCN, TREK-1</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 text-foreground font-medium">Amnesia</td>
                    <td className="p-3 text-muted-foreground">Hippocampus, amygdala</td>
                    <td className="p-3 text-muted-foreground">GABA<sub>A</sub>, nAChR</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Uptake & Distribution</h2>
            <p className="text-foreground/90 leading-relaxed">
              The rate of rise of alveolar concentration (F<sub>A</sub>) towards inspired concentration (F<sub>I</sub>) determines speed of induction. Factors increasing the rate of rise of F<sub>A</sub>/F<sub>I</sub>:
            </p>
            <ul className="mt-2 space-y-1 text-foreground/80">
              <li>• <strong>Low blood:gas solubility</strong> (less taken up by blood)</li>
              <li>• <strong>High inspired concentration</strong> (concentration effect)</li>
              <li>• <strong>High minute ventilation</strong> (delivers more agent to alveoli)</li>
              <li>• <strong>Low cardiac output</strong> (less blood to carry agent away)</li>
              <li>• <strong>Second gas effect</strong> (N₂O uptake concentrates companion agent)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">N₂O — Second Gas Effect & Diffusion Hypoxia</h2>
            <p className="text-foreground/90 leading-relaxed mb-3">
              Two phenomena are unique to high-volume gases like nitrous oxide. They are flip-sides of the same large-volume
              uptake (during induction) and washout (during emergence) across the alveolar–capillary membrane.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="rounded-lg border border-border p-4 bg-card">
                <h3 className="font-semibold text-foreground text-sm mb-1">Second gas effect (induction)</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  When N₂O (≈70%) is given with a volatile, the very large volume of N₂O dissolves rapidly in pulmonary
                  capillary blood. The alveolar gas pool shrinks, <em>concentrating</em> the remaining volatile and
                  drawing more inspired gas down the airway. The companion volatile's F<sub>A</sub>/F<sub>I</sub> rises
                  faster than it would alone — a clinically useful accelerator at induction.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4 bg-card">
                <h3 className="font-semibold text-foreground text-sm mb-1">Diffusion hypoxia (emergence)</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  When N₂O is switched off at the end of the case, the partial-pressure gradient reverses. Huge volumes
                  of N₂O leave the blood and flood the alveoli, <em>diluting</em> alveolar O₂ and CO₂. The result is a
                  transient fall in alveolar PO₂ and a respiratory drive blunted by reduced PaCO₂ — hypoxia unless the
                  patient is given <strong>100% O₂ for 3–5 minutes</strong> at emergence.
                </p>
              </div>
            </div>

            <SecondGasEffectDiagram />

            <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
              <p className="text-sm font-medium text-foreground mb-1">Why N₂O specifically?</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Both phenomena require a gas that is delivered in <strong>very high inspired concentration</strong> and
                that <strong>moves rapidly between blood and alveolus</strong>. N₂O fits both criteria — its blood:gas
                partition coefficient (0.47) is low, but it is given at ~70%, so the absolute volumes shifting across
                the membrane are vast. Volatile agents are given at 1–6%, far too low to produce the same alveolar
                volume changes.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Clinical Comparison</h2>
            <div className="space-y-4 mt-4">
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">Sevoflurane</h3>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  Non-pungent, suitable for inhalational induction. Low BGPC allows rapid onset. Metabolised ~5% (produces inorganic fluoride and Compound A via soda lime). Minimal cardiovascular depression. Agent of choice for paediatric inhalational induction.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">Desflurane</h3>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  Lowest BGPC of potent agents — fastest recovery. Pungent and irritant to airways, so not suitable for inhalational induction. Requires a heated pressurised vaporizer (TEC 6) due to high SVP (near atmospheric at room temperature). Sympathetic stimulation with rapid increases in concentration.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">Isoflurane</h3>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  Higher BGPC means slower onset/offset. Potent coronary vasodilator — theoretical risk of coronary steal. Minimal metabolism (~0.2%). Good muscle relaxation. Commonly used in veterinary anaesthesia and ICU sedation via AnaConDa device.
                </p>
              </div>
            </div>
          </section>

          <SynthesisBlock
            title="Volatile Agents — Side-by-Side Comparison"
            subtitle="The high-yield numbers and clinical character of each modern agent."
            variant="table"
          >
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left p-2 text-foreground font-semibold">Agent</th>
                  <th className="text-left p-2 text-foreground font-semibold">MAC (40 y)</th>
                  <th className="text-left p-2 text-foreground font-semibold">Blood-gas λ</th>
                  <th className="text-left p-2 text-foreground font-semibold">Key character</th>
                </tr>
              </thead>
              <tbody className="text-foreground/90">
                {[
                  ["Sevoflurane", "1.8%", "0.65", "Non-irritant — induction agent of choice; nephrotoxic Compound A only at low flows + dry CO₂ absorber"],
                  ["Isoflurane", "1.15%", "1.4", "Cheap, well-tolerated; pungent so unsuitable for inhalational induction"],
                  ["Desflurane", "6.0%", "0.42", "Fastest emergence; pungent (laryngospasm); requires heated vaporiser; very low solubility"],
                  ["N₂O", "104%", "0.47", "Adjunct only; expands air-filled cavities; bone marrow / vit B12 risk with prolonged exposure"],
                  ["Halothane (historical)", "0.75%", "2.4", "Sensitises myocardium to catecholamines; halothane hepatitis"],
                ].map(([agent, mac, lambda, char]) => (
                  <tr key={agent as string} className="border-b border-border/50">
                    <td className="p-2 font-medium">{agent}</td>
                    <td className="p-2 text-muted-foreground">{mac}</td>
                    <td className="p-2 text-muted-foreground">{lambda}</td>
                    <td className="p-2 text-muted-foreground">{char}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SynthesisBlock>
          <ExamPitfallsCallout
            accent="pharmacology"
            pitfalls={[
              "MAC = alveolar concentration preventing movement in 50% — additive between agents; reduced by age, opioids, N₂O, hypothermia, pregnancy.",
              "Low blood:gas partition coefficient (desflurane 0.42, sevoflurane 0.69) = fast onset/offset; high (halothane 2.4) = slow.",
              "Sevoflurane + dry baralyme/soda-lime → Compound A (nephrotoxic in rats); avoid low fresh-gas flows with desiccated absorber.",
              "Desflurane has high vapour pressure (88.5 kPa) — needs a heated, pressurised vaporiser; pungent so unsuitable for gas induction.",
              "All halogenated volatiles trigger malignant hyperthermia in susceptible patients; xenon and N₂O do not.",
            ]}
          />
        </div>
      }
    />
  );
};

export default VolatileAgentsTopic;
