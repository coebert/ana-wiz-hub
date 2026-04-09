import { SectionLayout } from "@/components/SectionLayout";
import OpioidReceptorDiagram from "@/components/diagrams/OpioidReceptorDiagram";
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
          <div className="bg-card rounded-xl border border-border p-6 mt-4">
            <OpioidReceptorDiagram />
          </div>
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
          <h2 className="text-2xl font-serif font-bold text-foreground">Partial Agonists & Mixed Agonist-Antagonists</h2>
          <p className="text-foreground/90 leading-relaxed">
            These agents have complex receptor profiles that distinguish them from pure µ agonists. Understanding their
            pharmacology is essential as they have important implications for perioperative management, addiction medicine,
            and acute pain in opioid-dependent patients.
          </p>

          <div className="space-y-4 mt-4">
            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground">Buprenorphine</h3>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                <strong>Partial µ agonist</strong> and <strong>κ antagonist</strong> (also ORL-1/NOP agonist). Thebaine derivative.
                High µ-receptor affinity (K<sub>d</sub> ~0.2 nM) with slow dissociation — very difficult to displace with naloxone.
              </p>
              <div className="grid md:grid-cols-2 gap-3 mt-3">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                  <p className="text-xs font-semibold text-primary mb-1">Key Pharmacology</p>
                  <ul className="text-xs text-foreground/80 space-y-1">
                    <li>• Oral bioavailability ~5% (sublingual ~30–55%)</li>
                    <li>• Long duration: 6–8 hr (sublingual); transdermal patches 7 days</li>
                    <li>• Metabolised by CYP3A4 → norbuprenorphine (active, full agonist)</li>
                    <li>• Hepatic glucuronidation; excreted mainly faecal (70%)</li>
                    <li>• Safe in renal failure (no active renal metabolites)</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-secondary/30 border border-border p-3">
                  <p className="text-xs font-semibold text-foreground mb-1">Clinical Significance</p>
                  <ul className="text-xs text-foreground/80 space-y-1">
                    <li>• <strong>Ceiling effect for respiratory depression</strong> (not for analgesia at clinical doses)</li>
                    <li>• High affinity blocks other opioids — complicates acute pain management</li>
                    <li>• Precipitates withdrawal in opioid-dependent patients if given acutely</li>
                    <li>• Transdermal (5–70 µg/hr) for chronic pain; sublingual for addiction (with/without naloxone)</li>
                    <li>• Naloxone may require high doses (10–30 mg) or infusion to reverse</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground">Nalbuphine</h3>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                <strong>κ agonist / µ antagonist</strong>. Structurally related to oxymorphone and naloxone.
                Equipotent to morphine (10 mg IV ≈ 10 mg morphine IV).
              </p>
              <div className="grid md:grid-cols-2 gap-3 mt-3">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                  <p className="text-xs font-semibold text-primary mb-1">Key Pharmacology</p>
                  <ul className="text-xs text-foreground/80 space-y-1">
                    <li>• IV/IM/SC administration. Onset 2–3 min IV</li>
                    <li>• Duration 3–6 hours. t½ ~5 hours</li>
                    <li>• Hepatic metabolism (glucuronidation)</li>
                    <li>• Not a controlled drug (no significant abuse potential)</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-secondary/30 border border-border p-3">
                  <p className="text-xs font-semibold text-foreground mb-1">Clinical Significance</p>
                  <ul className="text-xs text-foreground/80 space-y-1">
                    <li>• <strong>Ceiling effect for respiratory depression</strong> (~30 mg dose)</li>
                    <li>• Useful to partially reverse µ-mediated respiratory depression while maintaining κ-mediated analgesia</li>
                    <li>• Reduces opioid-induced pruritus (µ antagonism)</li>
                    <li>• May precipitate withdrawal in opioid-dependent patients</li>
                    <li>• Analgesic ceiling at ~30 mg (limited maximal efficacy)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-border p-4">
              <h3 className="font-semibold text-foreground">Pentazocine</h3>
              <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                <strong>κ agonist / weak µ partial agonist</strong> (and possible µ antagonist at high doses).
                Benzomorphan derivative. First clinically used mixed agonist-antagonist.
              </p>
              <div className="grid md:grid-cols-2 gap-3 mt-3">
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                  <p className="text-xs font-semibold text-primary mb-1">Key Pharmacology</p>
                  <ul className="text-xs text-foreground/80 space-y-1">
                    <li>• Oral bioavailability ~20% (high first-pass metabolism)</li>
                    <li>• Potency: ~30–60 mg oral ≈ 10 mg morphine</li>
                    <li>• Duration 3–4 hours. Hepatic metabolism (CYP-mediated oxidation)</li>
                    <li>• Available oral, IM, IV</li>
                  </ul>
                </div>
                <div className="rounded-lg bg-secondary/30 border border-border p-3">
                  <p className="text-xs font-semibold text-foreground mb-1">Clinical Significance</p>
                  <ul className="text-xs text-foreground/80 space-y-1">
                    <li>• <strong>Dysphoria and psychotomimetic effects</strong> (κ-mediated) — limits clinical use</li>
                    <li>• Cardiovascular stimulation: ↑ HR, ↑ SVR, ↑ pulmonary artery pressure</li>
                    <li>• Avoid in ischaemic heart disease (↑ myocardial work)</li>
                    <li>• Precipitates withdrawal in opioid-dependent patients</li>
                    <li>• Analgesic ceiling effect; rarely used in modern practice</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-secondary/30 rounded-lg p-4 mt-4 border border-border">
            <p className="text-sm font-medium text-foreground">Perioperative Considerations</p>
            <ul className="text-sm text-muted-foreground mt-1 space-y-1">
              <li>• All three agents can <strong>precipitate withdrawal</strong> in patients dependent on pure µ agonists</li>
              <li>• Buprenorphine's high receptor affinity means standard-dose naloxone is ineffective — use doxapram or consider respiratory support</li>
              <li>• Patients on buprenorphine maintenance: continuing low-dose buprenorphine perioperatively (with supplemental multimodal analgesia) is now preferred over discontinuation</li>
              <li>• Ceiling effects on respiratory depression make these agents theoretically safer in overdose than pure agonists</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Tolerance & Opioid-Induced Hyperalgesia</h2>
          <p className="text-foreground/90 leading-relaxed">
            Tolerance and opioid-induced hyperalgesia (OIH) are distinct phenomena that both manifest as apparent reduction
            in opioid efficacy — but they have different mechanisms and require different management strategies.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <h3 className="font-semibold text-primary text-sm mb-2">Tolerance</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                A rightward shift of the dose–response curve — <strong>higher doses are needed for the same effect</strong>.
                Increasing the opioid dose restores analgesia.
              </p>
              <ul className="text-sm text-foreground/80 mt-2 space-y-1">
                <li>• <strong>Pharmacodynamic</strong>: receptor desensitisation, internalisation, and uncoupling of G-protein signalling (β-arrestin pathway)</li>
                <li>• <strong>Pharmacokinetic</strong>: enzyme induction (minor role clinically)</li>
                <li>• Differential tolerance — develops rapidly to euphoria, sedation, and respiratory depression; slowly to miosis and constipation</li>
              </ul>
            </div>
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
              <h3 className="font-semibold text-destructive text-sm mb-2">Opioid-Induced Hyperalgesia (OIH)</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                A paradoxical <strong>increase in pain sensitivity</strong> caused by opioid exposure. Pain is diffuse,
                qualitatively different, and extends beyond the original site. Increasing the dose <strong>worsens</strong> pain.
              </p>
              <ul className="text-sm text-foreground/80 mt-2 space-y-1">
                <li>• Most associated with remifentanil (rapid onset/offset, high doses)</li>
                <li>• Also reported with morphine and fentanyl infusions</li>
                <li>• Clinically: allodynia, hyperalgesia in non-surgical dermatomes, increasing opioid requirements despite adequate dosing</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-6">Mechanisms of OIH</h3>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-sm border border-border rounded-lg">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-semibold text-foreground">Mechanism</th>
                  <th className="text-left p-3 font-semibold text-foreground">Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <td className="p-3 text-foreground font-medium">NMDA receptor activation</td>
                  <td className="p-3 text-muted-foreground">Central sensitisation via glutamate / NMDA pathway in dorsal horn. µ-receptor activation paradoxically enhances NMDA function through PKC-mediated removal of Mg²⁺ block</td>
                </tr>
                <tr className="border-t border-border bg-muted/20">
                  <td className="p-3 text-foreground font-medium">Descending facilitation</td>
                  <td className="p-3 text-muted-foreground">Upregulation of pronociceptive pathways from the rostral ventromedial medulla (RVM) — on-cells become dominant over off-cells</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 text-foreground font-medium">Spinal dynorphin ↑</td>
                  <td className="p-3 text-muted-foreground">Increased spinal dynorphin release promotes excitatory neurotransmitter release from primary afferents via κ receptor and non-opioid mechanisms</td>
                </tr>
                <tr className="border-t border-border bg-muted/20">
                  <td className="p-3 text-foreground font-medium">Neuroinflammation</td>
                  <td className="p-3 text-muted-foreground">Activation of spinal microglia and astrocytes via TLR4 signalling → release of TNF-α, IL-1β, and BDNF, amplifying nociceptive signalling</td>
                </tr>
                <tr className="border-t border-border">
                  <td className="p-3 text-foreground font-medium">Genetic factors</td>
                  <td className="p-3 text-muted-foreground">Polymorphisms in OPRM1 (µ receptor), COMT, and β-arrestin-2 genes influence susceptibility</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-6">Prevention & Management of OIH</h3>
          <ul className="text-foreground/80 mt-2 space-y-1">
            <li>• <strong>NMDA antagonists</strong>: ketamine (0.1–0.25 mg/kg bolus, 0.1–0.2 mg/kg/hr infusion) — strongest evidence</li>
            <li>• <strong>Opioid dose reduction or rotation</strong> — switch to a structurally different opioid</li>
            <li>• <strong>Multimodal analgesia</strong>: paracetamol, NSAIDs, regional anaesthesia to minimise opioid exposure</li>
            <li>• <strong>α₂-agonists</strong>: clonidine, dexmedetomidine — reduce central sensitisation</li>
            <li>• <strong>Gabapentinoids</strong>: pregabalin/gabapentin — modulate calcium channel α₂δ subunit</li>
            <li>• <strong>Magnesium</strong>: physiological NMDA antagonist (Mg²⁺ block)</li>
            <li>• COX-2 inhibitors (parecoxib) may attenuate remifentanil-induced OIH</li>
          </ul>

          <div className="bg-secondary/30 rounded-lg p-4 mt-4 border border-border">
            <p className="text-sm font-medium text-foreground">Tolerance vs OIH — Clinical Differentiation</p>
            <ul className="text-sm text-muted-foreground mt-1 space-y-1">
              <li>• <strong>Tolerance</strong>: pain in original distribution, responds to dose escalation</li>
              <li>• <strong>OIH</strong>: diffuse / new pain distribution, worsens with dose escalation, improves with dose reduction</li>
              <li>• In practice, both may coexist — a trial of dose reduction with NMDA antagonist cover can help distinguish</li>
            </ul>
          </div>
          <p className="text-sm text-muted-foreground italic mt-3">
            References: Colvin LA et al. Br J Anaesth 2019; Lee M et al. Pain Med 2011; Fletcher D & Martinez V. BJA 2014.
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
