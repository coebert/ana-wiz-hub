import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { opioidsQuiz } from "@/data/quizzes";
import OpioidStructures from "@/components/diagrams/OpioidStructures";
import { ReferencesList } from "@/components/ReferencesList";

const OpioidsTopic = () => {
  return (
    <SectionLayout
      title="Opioid Pharmacology"
      subtitle="FRCA Primary — Pharmacology"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
    >
      <div className="prose prose-slate max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
          <p className="text-foreground/90 leading-relaxed">
            Opioids are the cornerstone of perioperative analgesia. Understanding receptor subtypes, the clinical pharmacology
            of individual agents, and their side effect profiles is essential for FRCA examinations and safe clinical practice.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Opioid Receptors</h2>
          <p className="text-foreground/90 leading-relaxed">
            Three classical receptors, all G-protein coupled (Gi/Go): <strong>µ (mu/MOP)</strong> — analgesia (supraspinal and
            spinal), respiratory depression, euphoria, physical dependence, miosis, ↓GI motility, bradycardia.
            <strong> κ (kappa/KOP)</strong> — spinal analgesia, sedation, dysphoria, diuresis. <strong>δ (delta/DOP)</strong>
            — spinal analgesia, modulation of µ receptor function.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Signal transduction</strong>: activation → Gi protein → ↓cAMP, opens K⁺ channels (hyperpolarisation),
            closes voltage-gated Ca²⁺ channels → inhibits neurotransmitter release and neuronal firing.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Morphine</h2>
          <p className="text-foreground/90 leading-relaxed">
            Natural phenanthrene opioid. Dose: 0.1–0.2 mg/kg IV. Oral bioavailability ~30% (extensive first-pass metabolism).
            Onset 15–20 min IV (poor lipid solubility, slow BBB penetration). Duration 3–4 hours.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            Metabolised by hepatic glucuronidation: <strong>M6G</strong> (active, potent analgesic — accumulates in renal
            failure) and <strong>M3G</strong> (neuroexcitatory, no analgesia). Histamine release → hypotension, bronchospasm,
            urticaria. Sphincter of Oddi spasm. Nausea/vomiting (CTZ stimulation).
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Fentanyl</h2>
          <p className="text-foreground/90 leading-relaxed">
            Synthetic phenylpiperidine. 100× potency of morphine. Dose: 1–2 µg/kg IV. High lipid solubility → rapid onset
            (1–2 min) and short duration (30–45 min, redistribution). No histamine release. Minimal cardiovascular effects.
            Metabolised by CYP3A4 to inactive norfentanyl.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Chest wall rigidity</strong> can occur with rapid high-dose injection ("wooden chest"). Context-sensitive
            half-time increases significantly with prolonged infusion (tissue accumulation). Transdermal, transmucosal,
            intranasal formulations available.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Remifentanil</h2>
          <p className="text-foreground/90 leading-relaxed">
            Ultra-short-acting synthetic opioid. Unique <strong>ester linkage</strong> → metabolised by non-specific tissue
            and plasma esterases (not plasma cholinesterase). Context-sensitive half-time ~3–4 min regardless of infusion
            duration. Ideal for TIVA. Must be given by infusion (0.05–0.5 µg/kg/min).
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Clinical Pearls</p>
            <p className="text-sm text-muted-foreground mt-1">
              Remifentanil's rapid offset mandates transition analgesia before stopping the infusion. It may cause
              opioid-induced hyperalgesia (OIH) after prolonged high-dose use. Dose reduction in the elderly but no adjustment
              for renal/hepatic impairment. Potent bradycardia risk — glycopyrrolate may be needed.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Other Opioids</h2>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Alfentanil</strong>: lower pKa (6.5) → 90% un-ionised at pH 7.4 → faster onset than fentanyl despite
            lower lipid solubility. Smaller Vd. Shorter duration. <strong>Sufentanil</strong>: 5-10× potency of fentanyl,
            highest µ-receptor affinity.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Codeine</strong>: prodrug, requires CYP2D6 conversion to morphine (~10% dose). Pharmacogenomic variation
            — ultrarapid metabolisers at risk of toxicity; poor metabolisers get no analgesia. <strong>Tramadol</strong>:
            weak µ agonist + serotonin/noradrenaline reuptake inhibition. Risk of serotonin syndrome with SSRIs. Lowers
            seizure threshold.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Naloxone</h2>
          <p className="text-foreground/90 leading-relaxed">
            Competitive µ, κ, δ antagonist. IV dose 1–4 µg/kg titrated. Onset 1–2 min IV. Duration 30–60 min (shorter than
            most opioids → risk of re-narcotisation). Pulmonary oedema and cardiovascular collapse can occur with excessive
            or rapid administration.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Comparative Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 text-foreground">Agent</th>
                  <th className="text-left p-2 text-foreground">Potency (vs morphine)</th>
                  <th className="text-left p-2 text-foreground">Onset</th>
                  <th className="text-left p-2 text-foreground">Key Feature</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Morphine", "1", "15-20 min", "M6G active metabolite, histamine release"],
                  ["Fentanyl", "100", "1-2 min", "Chest wall rigidity, ↑ CSHT with infusion"],
                  ["Alfentanil", "10-20", "<1 min", "Low pKa 6.5 → 90% un-ionised, rapid onset"],
                  ["Remifentanil", "100-200", "1 min", "Ester metabolism, constant CSHT ~4 min"],
                  ["Sufentanil", "500-1000", "1-2 min", "Highest µ affinity, cardiac surgery"],
                ].map(([agent, potency, onset, feature]) => (
                  <tr key={agent} className="border-b border-border/50">
                    <td className="p-2 text-foreground font-medium">{agent}</td>
                    <td className="p-2 text-muted-foreground">{potency}</td>
                    <td className="p-2 text-muted-foreground">{onset}</td>
                    <td className="p-2 text-muted-foreground">{feature}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Equianalgesic Dose Conversion</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Equianalgesic doses are approximate equivalents used when converting between opioids or routes. All values
            are referenced to <strong>10 mg IV morphine</strong>. These are guidelines — individual variation, incomplete
            cross-tolerance, and clinical context must always be considered.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Opioid</th>
                  <th className="text-center p-3 font-semibold text-foreground">Route</th>
                  <th className="text-center p-3 font-semibold text-foreground">Equianalgesic Dose</th>
                  <th className="text-center p-3 font-semibold text-foreground">Ratio to IV Morphine</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Morphine", "IV / SC", "10 mg", "1 : 1", false],
                  ["Morphine", "IM", "10 mg", "1 : 1", false],
                  ["Morphine", "Oral", "30 mg", "3 : 1", true],
                  ["Diamorphine", "IV / SC", "5 mg", "1 : 2 (2× potency)", false],
                  ["Diamorphine", "IM", "6.7 mg", "~1 : 1.5", true],
                  ["Oxycodone", "IV", "6.7 mg", "1 : 1.5 (1.5× potency)", false],
                  ["Oxycodone", "Oral", "15–20 mg", "~1.5–2 : 1", true],
                  ["Fentanyl", "IV", "100 µg", "100× potency", false],
                  ["Fentanyl", "Transdermal (patch)", "12 µg/hr patch ≈ 30 mg oral morphine/24hr", "—", true],
                  ["Buprenorphine", "Transdermal (patch)", "5 µg/hr patch ≈ 12 mg oral morphine/24hr", "—", false],
                  ["Buprenorphine", "Sublingual", "200–400 µg", "~60–100× potency", true],
                  ["Codeine", "Oral", "100 mg", "~1/10 potency", false],
                  ["Tramadol", "Oral", "100 mg", "~1/10 potency", false],
                ].map(([agent, route, dose, ratio, shaded], i) => (
                  <tr key={i} className={`border-t border-border ${shaded ? "bg-muted/20" : ""}`}>
                    <td className="p-3 text-foreground font-medium">{agent as string}</td>
                    <td className="p-3 text-center text-muted-foreground">{route as string}</td>
                    <td className="p-3 text-center text-muted-foreground">{dose as string}</td>
                    <td className="p-3 text-center text-muted-foreground">{ratio as string}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-secondary/30 rounded-lg p-4 mt-4 border border-border">
            <p className="text-sm font-medium text-foreground">Key Conversion Points</p>
            <ul className="text-sm text-muted-foreground mt-1 space-y-1">
              <li>• <strong>Oral : IV morphine = 3 : 1</strong> (oral bioavailability ~30%)</li>
              <li>• <strong>Diamorphine is ~2× IV morphine</strong> (prodrug rapidly deacetylated to 6-MAM then morphine; greater lipid solubility → faster BBB penetration)</li>
              <li>• <strong>Oral oxycodone</strong> has ~75% bioavailability → oral : IV ratio ~1.5–2 : 1 (much better than morphine)</li>
              <li>• <strong>Fentanyl patches</strong>: 25 µg/hr ≈ 60–90 mg oral morphine/24hr. Reservoir takes 12–24 hr to reach steady state; depot persists after removal</li>
              <li>• <strong>Buprenorphine</strong>: partial µ agonist with ceiling effect for respiratory depression; high receptor affinity may impair efficacy of other opioids</li>
              <li>• When converting between opioids, reduce the calculated equianalgesic dose by <strong>25–50%</strong> to account for incomplete cross-tolerance</li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground italic mt-3">
            Reference: Faculty of Pain Medicine, Opioid Dose Equivalence, 2021; BNF; Peck & Hill, Pharmacology for Anaesthesia and Intensive Care, 5th ed.
          </p>
        </section>
      </div>

      <KeyLearningPoints points={[
        "Three opioid receptors (µ, κ, δ) — all Gi-coupled. µ receptor mediates analgesia, respiratory depression, and dependence.",
        "Morphine: M6G (active, accumulates in renal failure), M3G (neuroexcitatory). Histamine release.",
        "Fentanyl: 100× morphine potency, rapid onset due to lipid solubility. Context-sensitive half-time increases with duration.",
        "Remifentanil: ester metabolism by tissue esterases. Constant CSHT ~4 min. Requires transition analgesia on cessation.",
        "Alfentanil: pKa 6.5 → 90% un-ionised → fastest onset despite lower lipid solubility than fentanyl.",
        "Naloxone: competitive antagonist, duration 30-60 min. Risk of re-narcotisation. Titrate carefully to avoid acute reversal."
      ]} />

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Molecular Structures</h2>
          <OpioidStructures />
        </div>

        <QuizSection questions={opioidsQuiz} />
      <ReferencesList topicId="opioids" />

      <TopicCompletionToggle topicId="opioids" topicTitle="Opioid Pharmacology" />
    </SectionLayout>
  );
};

export default OpioidsTopic;
