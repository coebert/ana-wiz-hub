import { TopicTemplate } from "@/components/TopicTemplate";
import { TopicFaqs } from "@/components/TopicFaqs";
import { WorkedExample } from "@/components/WorkedExamples";
import { ExamSection } from "@/components/ExamSection";
import { PKaDiagram } from "@/components/diagrams/PKaDiagram";
import { HendersonHasselbalchDiagram } from "@/components/diagrams/HendersonHasselbalchDiagram";
import IonTrappingDiagram from "@/components/diagrams/IonTrappingDiagram";
import { localAnaestheticsQuiz } from "@/data/quizzes";
import LocalAnaestheticStructures from "@/components/diagrams/LocalAnaestheticStructures";
import PropofolLidocaineMechanismDiagram from "@/components/diagrams/PropofolLidocaineMechanismDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const localAnaestheticsFaqs: Array<[string, string]> = [
  [
    "What are the maximum safe doses of common local anaesthetics?",
    "Lidocaine — 3 mg/kg plain, 7 mg/kg with adrenaline. Bupivacaine/levobupivacaine — 2 mg/kg (with or without adrenaline; toxicity dominates). Ropivacaine — 3–4 mg/kg. Prilocaine — 6 mg/kg plain, 8 mg/kg with adrenaline (max for Bier's block). Doses should be reduced 30–50 % in the elderly, pregnant, debilitated, and infused at the lowest effective concentration. Always calculate maximum mg before drawing up."
  ],
  [
    "How does pKa of a local anaesthetic relate to onset of action?",
    "Only the unionised form crosses the nerve membrane. The closer the pKa to physiological pH, the higher the proportion unionised, and the faster the onset. Lidocaine pKa 7.9 — ~25 % unionised → onset 2–5 min. Bupivacaine pKa 8.1 — ~15 % unionised → onset 10–15 min. In infected tissue (low pH), more drug is ionised → poor onset (textbook reason to avoid LA in abscesses). Chloroprocaine (pKa 8.7) is exception — fastest onset due to high concentration used."
  ],
  [
    "Outline the management of local-anaesthetic systemic toxicity (LAST).",
    "AAGBI 2010 algorithm: STOP injection, call for help, ABC (100 % O₂, secure airway, IV access). Manage seizures (small dose benzodiazepine or propofol). Treat arrhythmias (avoid lidocaine, calcium, vasopressin; use small adrenaline 1 µg/kg). Give 20 % Intralipid: 1.5 mL/kg bolus, then 15 mL/kg/h infusion, repeat bolus up to 3×, max 12 mL/kg total. Continue CPR — long resuscitation often successful. Refer to ITU and report to NPSA / Lipid Rescue registry."
  ]
];

const workedExamples: WorkedExample[] = [
  {
    title: "Managing severe local anaesthetic systemic toxicity (LAST)",
    scenario:
      "After an ultrasound-guided axillary block with 30 mL of 0.5% bupivacaine, the patient develops perioral tingling, agitation, then a generalised seizure followed by VT and cardiovascular collapse. Walk through your management.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Call for help and the LAST trolley. Stop injecting LA immediately. Manage airway and ventilate with 100% O₂ — hypoxia and acidosis worsen toxicity.</li>
          <li>Terminate the seizure: small-dose benzodiazepine (midazolam 1–2 mg) preferred. Avoid propofol if cardiovascularly unstable.</li>
          <li>Start ALS if pulseless. CPR may need to be prolonged (&gt;60 min) because bupivacaine binds avidly to sodium channels.</li>
          <li>Give 20% lipid emulsion (Intralipid): 1.5 mL/kg bolus over 1 min then 15 mL/kg/h infusion. Repeat bolus every 5 min up to 3 times if circulation not restored; double the infusion rate if BP remains low. Max cumulative dose 12 mL/kg.</li>
          <li>Modify ALS drugs: reduce adrenaline to ≤1 µg/kg boluses; avoid vasopressin, calcium channel blockers, β-blockers, and lidocaine.</li>
          <li>Once stable, transfer to ICU for ≥12 h monitoring (delayed cardiotoxicity), serum amylase/lipase if propofol used, and report to NAP/LAST registry.</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Treating the patient with lidocaine — adds to toxicity.</li>
            <li>Stopping CPR too early — recovery has been reported after &gt;60 min.</li>
            <li>Using full-dose adrenaline — worsens arrhythmia in the bupivacaine-poisoned myocardium.</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Stop LA, secure airway with 100% O₂, suppress seizures with midazolam, start ALS (with reduced adrenaline ≤1 µg/kg, no lidocaine/vasopressin/calcium blockers), and give 20% lipid emulsion 1.5 mL/kg bolus then 15 mL/kg/h infusion. Continue CPR for ≥60 min if needed and admit to ICU for ≥12 h after ROSC.",
    cites: ["AAGBI 2010","BJA Educ 2016"],
  },
];
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
        { text: "LAs are weak bases; the unionised form crosses the membrane, the ionised form blocks the Na⁺ channel intracellularly.", cites: ["Peck & Hill Ch.8"] },
        { text: "pKa determines onset speed: lower pKa → more unionised at pH 7.4 → faster onset (lidocaine pKa 7.9 > bupivacaine pKa 8.1).", cites: ["BJA Educ 2015"] },
        { text: "Lipid solubility determines potency; protein binding determines duration of action.", cites: ["AAGBI 2010"] },
        { text: "Infected/acidotic tissue has more ionised drug → less membrane penetration → LA failure.", cites: ["Peck & Hill Ch.8"] },
        { text: "Amides (lidocaine, bupivacaine, ropivacaine) are hepatically metabolised; esters are hydrolysed by plasma cholinesterases.", cites: ["BJA Educ 2015"] },
        { text: "Differential blockade: autonomic → pain/temperature → touch → motor. Recovery is in reverse.", cites: ["AAGBI 2010"] },
        { text: "LAST presents as CNS excitation then cardiovascular collapse. Treat with Intralipid 20% (1.5 mL/kg bolus then 15 mL/kg/h infusion).", cites: ["Peck & Hill Ch.8"] },
        { text: "Bupivacaine is most cardiotoxic due to slow dissociation from cardiac Na⁺ channels; ropivacaine is the safer S-enantiomer alternative.", cites: ["BJA Educ 2015"] },
      ]}
      workedExamples={workedExamples}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY], curriculumCodes: ["PR_BK_05"] },
        keyPoints: { exams: [Exam.PRIMARY], curriculumCodes: ["PR_BK_05"] },
      }}
      sectionSources={{
        objectives: ["BJA Educ 2015", "Peck & Hill Ch.8", "AAGBI 2010"],
        keyPoints: ["BJA Educ 2015", "Peck & Hill Ch.8", "AAGBI 2010"],
        workedExamples: ["AAGBI 2010", "BJA Educ 2016"],
      }}
      coreConcepts={
        <>
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} className="scroll-mt-24">
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
          <ExamPitfallsCallout
            accent="pharmacology"
            pitfalls={[
              "Onset depends on pKa (closer to 7.4 = faster); duration depends on protein binding (higher = longer); potency depends on lipid solubility.",
              "Maximum safe doses: lidocaine 3 mg/kg (7 with adrenaline); bupivacaine 2 mg/kg; ropivacaine 3 mg/kg — body-weight ideal, not actual.",
              "LAST (local anaesthetic systemic toxicity): CNS first (perioral tingling, seizures), then cardiovascular collapse — bupivacaine is most cardiotoxic.",
              "Treat LAST: stop injection, ABC, control seizures, then 20% Intralipid 1.5 mL/kg bolus + 0.25 mL/kg/min infusion (AAGBI guideline).",
              "Adrenaline-containing solutions prolong duration and reduce systemic absorption; avoid in end-arteries (digits, penis, nose).",
            ]}
          />
        </div>
      </ExamSection>
          <TopicFaqs faqs={localAnaestheticsFaqs} />
        </>
      }
    />
  );
};

export default LocalAnaestheticsTopic;
