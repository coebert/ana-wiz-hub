import { TopicTemplate } from "@/components/TopicTemplate";
import { PKaDiagram } from "@/components/diagrams/PKaDiagram";
import { HendersonHasselbalchDiagram } from "@/components/diagrams/HendersonHasselbalchDiagram";
import IonTrappingDiagram from "@/components/diagrams/IonTrappingDiagram";
import { localAnaestheticsQuiz } from "@/data/quizzes";
import LocalAnaestheticStructures from "@/components/diagrams/LocalAnaestheticStructures";
import PropofolLidocaineMechanismDiagram from "@/components/diagrams/PropofolLidocaineMechanismDiagram";
import { Exam } from "@/data/curriculum";

const LocalAnaestheticsTopic = () => {
  return (
    <TopicTemplate
      title="Local Anaesthetic Agents"
      subtitle="FRCA Primary — Pharmacology"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
      topicId="local-anaesthetics"
      topicTitle="Local Anaesthetic Agents"
      quizQuestions={localAnaestheticsQuiz}
      objectives={[
        "Explain how pKa, lipid solubility and protein binding determine onset, potency and duration of local anaesthetics",
        "Apply the Henderson–Hasselbalch equation and the concept of ion trapping to clinical scenarios (infected tissue, foetal acidosis)",
        "Distinguish ester from amide LAs by metabolism, allergy potential and clinical use",
        "Calculate maximum safe doses for lidocaine, bupivacaine, ropivacaine and prilocaine, with and without adrenaline",
        "Recognise and manage local anaesthetic systemic toxicity (LAST) using AAGBI 2010 guidance and 20% lipid emulsion",
      ]}
      keyPoints={[
        "LAs are weak bases; the unionised form crosses the membrane, the ionised form blocks the Na⁺ channel intracellularly.",
        "pKa determines onset speed: lower pKa → more unionised at pH 7.4 → faster onset (lidocaine pKa 7.9 > bupivacaine pKa 8.1).",
        "Lipid solubility determines potency; protein binding determines duration of action.",
        "Infected/acidotic tissue has more ionised drug → less membrane penetration → LA failure.",
        "Amides (lidocaine, bupivacaine, ropivacaine) are hepatically metabolised; esters are hydrolysed by plasma cholinesterases.",
        "Differential blockade: autonomic → pain/temperature → touch → motor. Recovery is in reverse.",
        "LAST presents as CNS excitation then cardiovascular collapse. Treat with Intralipid 20% (1.5 mL/kg bolus then 15 mL/kg/h infusion).",
        "Bupivacaine is most cardiotoxic due to slow dissociation from cardiac Na⁺ channels; ropivacaine is the safer S-enantiomer alternative.",
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY], curriculumCodes: ["PR_BK_05"] },
        diagrams: { exams: [Exam.PRIMARY], curriculumCodes: ["PR_BK_05"] },
        keyPoints: { exams: [Exam.PRIMARY], curriculumCodes: ["PR_BK_05"] },
      }}
      sectionSources={{
        objectives: ["BJA Educ 2015", "Peck & Hill Ch.8", "AAGBI 2010"],
        diagrams: ["BJA Educ 2015", "Peck & Hill Ch.8"],
        keyPoints: ["BJA Educ 2015", "Peck & Hill Ch.8", "AAGBI 2010"],
      }}
      coreConcepts={
        <div className="prose prose-slate max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
            <p className="text-foreground/90 leading-relaxed">
              Local anaesthetic (LA) agents reversibly block nerve conduction by inhibiting voltage-gated sodium channels.
              They are weak bases with a pKa above physiological pH, meaning the majority exists in the ionised (charged)
              form at body pH. Understanding the relationship between pKa, pH, and ionisation is central to their
              pharmacology.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">pKa and Ionisation</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Local anaesthetics are weak bases. The Henderson-Hasselbalch equation determines the proportion of ionised
              (BH⁺) to unionised (B) drug at any given pH. Use the interactive diagram below to explore how changing pH
              affects ionisation for different agents.
            </p>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6">
              <PKaDiagram />
            </div>
            <div className="mt-4">
              <HendersonHasselbalchDiagram />
            </div>
            <div className="mt-4">
              <IonTrappingDiagram />
            </div>
            <div className="bg-secondary/30 rounded-lg p-4 mt-4 border border-border">
              <p className="text-sm font-medium text-foreground">The Key Principle</p>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                The <strong>unionised form (B)</strong> is lipid-soluble and crosses the nerve membrane to reach the
                intracellular side. The <strong>ionised form (BH⁺)</strong> then binds to the intracellular portion of
                the voltage-gated Na⁺ channel to block it. <em>Both forms are needed</em> — the unionised form for
                membrane penetration, the ionised form for receptor binding.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Structure & Classification</h2>
            <p className="text-foreground/90 leading-relaxed">
              All local anaesthetics share a common structure: an aromatic ring (lipophilic) linked to an amine group
              (hydrophilic) via either an <strong>ester</strong> or <strong>amide</strong> bond.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground text-sm mb-2">Esters</h3>
                <p className="text-sm text-muted-foreground">Cocaine, procaine, tetracaine, chloroprocaine</p>
                <p className="text-sm text-muted-foreground mt-1">Metabolised by plasma cholinesterases (pseudocholinesterase). Produce PABA metabolites — higher allergy risk.</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground text-sm mb-2">Amides</h3>
                <p className="text-sm text-muted-foreground">Lidocaine, bupivacaine, ropivacaine, prilocaine, levobupivacaine</p>
                <p className="text-sm text-muted-foreground mt-1">Metabolised by hepatic amidases (CYP450). Very rare true allergy. Remember: amides have two "i"s in the name.</p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Mechanism of Action</h2>
            <p className="text-foreground/90 leading-relaxed">
              Local anaesthetics block voltage-gated Na⁺ channels from the <strong>intracellular side</strong>, binding
              preferentially to the inactivated state (use-dependent block). This means frequently firing nerves are
              blocked more readily than resting nerves.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              Nerve fibres are blocked in order of susceptibility: small myelinated fibres (Aδ — pain, temperature) and
              unmyelinated C fibres (pain) are blocked before large myelinated fibres (Aα — motor, Aβ — touch, pressure).
              This differential blockade allows sensory block without complete motor block at appropriate concentrations.
            </p>
            <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
              <p className="text-sm font-medium text-foreground">Order of Blockade (typical clinical sequence)</p>
              <p className="text-sm text-muted-foreground mt-1">
                Autonomic (B, C fibres) → Pain & temperature (Aδ, C) → Touch & pressure (Aβ) → Motor (Aα)
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Recovery occurs in reverse order — motor function returns first.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Why LAs Fail in Infected Tissue</h2>
            <p className="text-foreground/90 leading-relaxed">
              Infected tissue has a lower pH (~6.5) due to lactic acid production. Since LAs are weak bases with pKa
              values of 7.7-8.1, a lower pH shifts the equilibrium toward the ionised form (BH⁺). Less unionised drug
              is available to cross the nerve membrane, reducing efficacy. This is why local anaesthesia is often
              inadequate in the presence of abscess or cellulitis.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Physicochemical Properties</h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-3 font-semibold text-foreground">Property</th>
                    <th className="text-center p-3 font-semibold text-foreground">Determines</th>
                    <th className="text-center p-3 font-semibold text-foreground">Clinical Effect</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 text-foreground font-medium">pKa</td>
                    <td className="p-3 text-center text-muted-foreground">Ionisation at pH 7.4</td>
                    <td className="p-3 text-center text-muted-foreground">Speed of onset (lower pKa → more unionised → faster onset)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 text-foreground font-medium">Lipid solubility</td>
                    <td className="p-3 text-center text-muted-foreground">Membrane penetration</td>
                    <td className="p-3 text-center text-muted-foreground">Potency (more lipid-soluble → more potent)</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 text-foreground font-medium">Protein binding</td>
                    <td className="p-3 text-center text-muted-foreground">Na⁺ channel binding affinity</td>
                    <td className="p-3 text-center text-muted-foreground">Duration of action (higher binding → longer duration)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Local Anaesthetic Toxicity (LAST)</h2>
            <p className="text-foreground/90 leading-relaxed">
              Systemic toxicity occurs when plasma levels exceed the toxic threshold, typically from inadvertent
              intravascular injection or excessive dosing. The CNS is affected first (excitation → seizures), followed
              by cardiovascular collapse. Bupivacaine is particularly cardiotoxic due to slow dissociation from cardiac
              Na⁺ channels.
            </p>
            <div className="bg-destructive/5 rounded-lg p-4 mt-3 border border-destructive/30">
              <p className="text-sm font-semibold text-destructive mb-2">LAST: Signs in Order of Severity</p>
              <ol className="text-sm text-foreground/80 space-y-1 list-decimal ml-4">
                <li>Perioral tingling, tinnitus, metallic taste, lightheadedness</li>
                <li>Visual disturbance, slurred speech, muscle twitching</li>
                <li>Seizures</li>
                <li>Loss of consciousness</li>
                <li>Cardiovascular collapse (arrhythmias, cardiac arrest)</li>
              </ol>
            </div>
            <div className="bg-accent/10 rounded-lg p-4 mt-3 border border-accent/30">
              <p className="text-sm font-semibold text-accent mb-2">Treatment: Intralipid (20% Lipid Emulsion)</p>
              <ul className="text-sm text-foreground/80 space-y-1">
                <li>• Initial bolus: 1.5 mL/kg over 1 minute</li>
                <li>• Infusion: 15 mL/kg/h (or 0.25 mL/kg/min)</li>
                <li>• Repeat bolus after 5 min if cardiovascular instability persists (max 2 further boluses)</li>
                <li>• Maximum cumulative dose: 12 mL/kg</li>
                <li>• AAGBI guidelines recommend Intralipid be available wherever regional anaesthesia is performed</li>
              </ul>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Maximum Safe Doses</h2>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left p-3 font-semibold text-foreground">Agent</th>
                    <th className="text-center p-3 font-semibold text-foreground">Plain (mg/kg)</th>
                    <th className="text-center p-3 font-semibold text-foreground">With adrenaline (mg/kg)</th>
                    <th className="text-center p-3 font-semibold text-foreground">pKa</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border">
                    <td className="p-3 text-foreground">Lidocaine</td>
                    <td className="p-3 text-center text-muted-foreground">3</td>
                    <td className="p-3 text-center text-muted-foreground">7</td>
                    <td className="p-3 text-center text-muted-foreground">7.9</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 text-foreground">Bupivacaine</td>
                    <td className="p-3 text-center text-muted-foreground">2</td>
                    <td className="p-3 text-center text-muted-foreground">2</td>
                    <td className="p-3 text-center text-muted-foreground">8.1</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 text-foreground">Ropivacaine</td>
                    <td className="p-3 text-center text-muted-foreground">3</td>
                    <td className="p-3 text-center text-muted-foreground">3</td>
                    <td className="p-3 text-center text-muted-foreground">8.1</td>
                  </tr>
                  <tr className="border-t border-border">
                    <td className="p-3 text-foreground">Prilocaine</td>
                    <td className="p-3 text-center text-muted-foreground">6</td>
                    <td className="p-3 text-center text-muted-foreground">9</td>
                    <td className="p-3 text-center text-muted-foreground">7.7</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Clinical Application: Lidocaine to Reduce Propofol Injection Pain
            </h2>
            <p className="mt-3 text-foreground/90 leading-relaxed">
              Up to 70% of patients report pain on injection of propofol into a small
              hand vein. The pain has both an immediate component (direct irritation
              of the vessel and free nerve endings by the aqueous phase of the
              emulsion) and a delayed component (kinin cascade activation 10–20 s
              after injection). Mixing 20–40 mg of lidocaine with each 200 mg of
              propofol — or pre-treating with lidocaine under a Bier-style venous
              tourniquet for 30–60 s — is the most widely used and effective
              prophylaxis.
            </p>
            <PropofolLidocaineMechanismDiagram />
            <h3 className="mt-5 text-lg font-semibold text-foreground">
              Why it works (mechanisms)
            </h3>
            <ul className="mt-2 list-disc pl-6 space-y-2 text-foreground/90 leading-relaxed">
              <li>
                <span className="font-semibold">Local anaesthetic action on venous nociceptors.</span>{" "}
                Lidocaine blocks voltage-gated Na<sup>+</sup> channels on the free
                nerve endings in the venous endothelium, raising their threshold
                for the irritant stimulus produced by free propofol in the aqueous
                phase.
              </li>
              <li>
                <span className="font-semibold">Reduction of the free aqueous propofol concentration.</span>{" "}
                Propofol injection pain correlates with the concentration of
                <em> free</em> drug in the aqueous phase of the emulsion (typically
                ~50 µg/mL in 1% propofol). Adding lidocaine lowers the pH of the
                mixture (lidocaine is formulated at pH ~6.5; propofol at pH ~7–8.5),
                which favours partition of propofol back into the lipid micelles
                and reduces the free aqueous concentration that contacts the vein
                wall.
              </li>
              <li>
                <span className="font-semibold">Suppression of the bradykinin-generating cascade.</span>{" "}
                Propofol activates plasma kallikrein in the vein, releasing
                bradykinin which sensitises the vessel and amplifies the delayed
                pain. Lidocaine attenuates this kinin-mediated sensitisation.
              </li>
              <li>
                <span className="font-semibold">Membrane-stabilising / counter-irritant effect.</span>{" "}
                A small systemic lidocaine effect on peripheral and central pain
                pathways may also contribute, particularly when a tourniquet is
                used to retain the lidocaine in the limb for 30–60 s before
                propofol injection (modified Bier's block technique, the most
                effective single intervention in meta-analyses).
              </li>
            </ul>
            <h3 className="mt-5 text-lg font-semibold text-foreground">
              Practical considerations & caveats
            </h3>
            <ul className="mt-2 list-disc pl-6 space-y-2 text-foreground/90 leading-relaxed">
              <li>
                Use a large antecubital vein where possible — site is the single
                biggest modifiable factor; a hand vein hurts far more than a
                forearm or AC vein regardless of additive.
              </li>
              <li>
                Typical admixture: 1–2 mL of 1% (10 mg/mL) lidocaine added to 20 mL
                of 1% propofol immediately before induction. Avoid prolonged
                pre-mixing — lidocaine destabilises the lipid emulsion and can
                cause coalescence of oil droplets, with theoretical risk of fat
                embolism and altered pharmacokinetics.
              </li>
              <li>
                Alternatives or adjuncts: pre-treatment with IV opioid (alfentanil
                or remifentanil), cooling/warming the vein, slow injection into a
                running drip, or use of long/medium-chain triglyceride
                formulations (e.g. propofol-LCT/MCT) which independently reduce
                injection pain.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Molecular Structures</h2>
            <LocalAnaestheticStructures />
          </section>
        </div>
      }
    />
  );
};

export default LocalAnaestheticsTopic;
