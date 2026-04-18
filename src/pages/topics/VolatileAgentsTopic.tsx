import { SectionLayout } from "@/components/SectionLayout";
import { MACDiagram } from "@/components/diagrams/MACDiagram";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { SynthesisBlock } from "@/components/SynthesisBlock";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { volatileAgentsQuiz } from "@/data/quizzes";
import VolatileAgentStructures from "@/components/diagrams/VolatileAgentStructures";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const VolatileAgentsTopic = () => {
  return (
    <SectionLayout
      title="Volatile Anaesthetic Agents"
      subtitle="FRCA Primary — Pharmacology"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
    >
      <div className="prose prose-slate max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
          <p className="text-foreground/90 leading-relaxed">
            Volatile anaesthetic agents are halogenated hydrocarbons administered via inhalation to produce general
            anaesthesia. The agents in current clinical use — sevoflurane, desflurane, and isoflurane — differ in their
            physicochemical properties, which determine their clinical characteristics including speed of onset, recovery,
            and potency.
          </p>
          <p className="text-sm text-muted-foreground italic mt-2">
            Reference: Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care, 5th edition. Cambridge University Press, 2021; BJA Education.
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

          <h3 className="text-lg font-semibold text-foreground mt-6">The Lipid Theory</h3>
          <p className="text-foreground/90 leading-relaxed">
            The original lipid theory proposed that volatile agents dissolve in the lipid bilayer of neuronal membranes,
            expanding and disordering the membrane sufficiently to alter the function of embedded ion channels. While
            largely superseded, this theory explained the correlation with lipid solubility. Critical volume hypothesis
            (Mullins, 1954) suggested anaesthesia occurs when the membrane expands beyond a critical volume (~0.4%).
            Pressure reversal — where high hydrostatic pressure reverses anaesthesia — was initially cited as support,
            though modern evidence attributes this to direct pressure effects on proteins.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-6">The Protein Theory (Modern Consensus)</h3>
          <p className="text-foreground/90 leading-relaxed">
            Current evidence strongly supports that volatile agents act predominantly by binding directly to specific
            protein targets — particularly ligand-gated ion channels and other membrane proteins. Key molecular targets include:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <h4 className="font-semibold text-primary text-sm mb-2">Enhanced (Inhibitory) Targets</h4>
              <ul className="text-sm text-foreground/80 space-y-2">
                <li>• <strong>GABA<sub>A</sub> receptors</strong>: Potentiate inhibitory chloride currents; major contributor to hypnosis and amnesia. Binding sites in TM2/TM3 domains identified by mutagenesis</li>
                <li>• <strong>Glycine receptors</strong>: Enhanced inhibitory neurotransmission in spinal cord; contributes to immobility (MAC effect)</li>
                <li>• <strong>Two-pore K⁺ channels (TREK-1, TASK)</strong>: Activation hyperpolarises neurones, reducing excitability. TREK-1 knockout mice require higher MAC</li>
              </ul>
            </div>
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
              <h4 className="font-semibold text-destructive text-sm mb-2">Inhibited (Excitatory) Targets</h4>
              <ul className="text-sm text-foreground/80 space-y-2">
                <li>• <strong>NMDA receptors</strong>: Inhibited by volatile agents (particularly N₂O and xenon), reducing excitatory glutamatergic transmission</li>
                <li>• <strong>Nicotinic ACh receptors (nAChR)</strong>: Inhibited at clinical concentrations; may contribute to analgesia and amnesia</li>
                <li>• <strong>HCN channels</strong>: Inhibited by halogenated agents, altering thalamocortical rhythms important for consciousness</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-6">Separating the Components of Anaesthesia</h3>
          <p className="text-foreground/90 leading-relaxed">
            Different components of the anaesthetic state are mediated at different anatomical sites:
          </p>
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
                  <td className="p-3 text-muted-foreground">Glycine receptors, GABA<sub>A</sub>, Na⁺ channels</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 text-foreground font-medium">Hypnosis / unconsciousness</td>
                  <td className="p-3 text-muted-foreground">Cerebral cortex, thalamus</td>
                  <td className="p-3 text-muted-foreground">GABA<sub>A</sub>, HCN, TREK-1</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 text-foreground font-medium">Amnesia</td>
                  <td className="p-3 text-muted-foreground">Hippocampus, amygdala</td>
                  <td className="p-3 text-muted-foreground">GABA<sub>A</sub>, nAChR</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 text-foreground font-medium">Autonomic blunting (MAC-BAR)</td>
                  <td className="p-3 text-muted-foreground">Brainstem, hypothalamus</td>
                  <td className="p-3 text-muted-foreground">Multiple receptor types</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-secondary/30 rounded-lg p-4 mt-4 border border-border">
            <p className="text-sm font-medium text-foreground">Agent-Specific Differences</p>
            <ul className="text-sm text-muted-foreground mt-1 space-y-1">
              <li>• <strong>N₂O & Xenon</strong>: Primarily NMDA antagonists with minimal GABA<sub>A</sub> activity — explains analgesic properties and lack of cardiovascular depression</li>
              <li>• <strong>Halogenated ethers</strong> (sevo, des, iso): Predominantly GABA<sub>A</sub> potentiation + glycine receptor enhancement</li>
              <li>• <strong>Halothane</strong>: Additional significant action at voltage-gated calcium channels — contributes to greater myocardial depression</li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground italic mt-3">
            References: Hemmings et al. Trends Pharmacol Sci 2005; Franks NP. Br J Pharmacol 2006; Peck & Hill, Pharmacology for Anaesthesia and Intensive Care, 5th ed.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Uptake & Distribution</h2>
          <p className="text-foreground/90 leading-relaxed">
            The rate of rise of alveolar concentration (F<sub>A</sub>) towards inspired concentration (F<sub>I</sub>)
            determines speed of induction. Switch to the "FA/FI Uptake" view in the diagram above to compare agents.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            Factors increasing the rate of rise of F<sub>A</sub>/F<sub>I</sub>:
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
          <h2 className="text-2xl font-serif font-bold text-foreground">Clinical Comparison</h2>
          <div className="space-y-4 mt-4">
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground">Sevoflurane</h3>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                Non-pungent, suitable for inhalational induction. Low BGPC allows rapid onset. Metabolised ~5% (produces
                inorganic fluoride and Compound A via soda lime). Minimal cardiovascular depression. Agent of choice for
                paediatric inhalational induction.
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground">Desflurane</h3>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                Lowest BGPC of potent agents — fastest recovery. Pungent and irritant to airways, so not suitable for
                inhalational induction. Requires a heated pressurised vaporizer (TEC 6) due to high SVP (near
                atmospheric at room temperature). Sympathetic stimulation with rapid increases in concentration.
              </p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground">Isoflurane</h3>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                Higher BGPC means slower onset/offset. Potent coronary vasodilator — theoretical risk of coronary steal.
                Minimal metabolism (~0.2%). Good muscle relaxation. Commonly used in veterinary anaesthesia and ICU
                sedation via AnaConDa device.
              </p>
            </div>
          </div>
        </section>
      </div>

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

      <KeyLearningPoints points={[
        "MAC is the ED₅₀ for immobility; lower MAC = more potent. MAC values are additive between agents.",
        "Blood:gas partition coefficient determines speed of onset — low BGPC (desflurane 0.42) = fast onset; high BGPC (halothane 2.54) = slow onset.",
        "Meyer-Overton: anaesthetic potency correlates with lipid solubility (oil:gas partition coefficient). MAC × oil:gas ≈ constant.",
        "FA/FI rise is faster with: low BGPC, high FI, high minute ventilation, low cardiac output, second gas effect.",
        "MAC decreases with: age >40, hypothermia, opioids, pregnancy, acute alcohol. MAC increases with: youth, hyperthermia, chronic alcohol, CNS stimulants.",
        "Sevoflurane: non-pungent, ideal for inhalational induction. Desflurane: fastest recovery but pungent, needs heated vaporizer. Isoflurane: slower, good muscle relaxation.",
        "Modern targets include GABAA receptors, glycine receptors, two-pore K⁺ channels (TREK/TASK), and NMDA receptors."
      ]} />

      <QuizSection questions={volatileAgentsQuiz} />
      <ReferencesList topicId="volatile-agents" />

      <SeeAlso topicId="volatile-agents" />
        <TopicCompletionToggle topicId="volatile-agents" topicTitle="Volatile Anaesthetic Agents" />
    </SectionLayout>
  );
};

export default VolatileAgentsTopic;
