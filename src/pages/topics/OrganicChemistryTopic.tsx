import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";

const organicChemistryFaqs: Array<[string, string]> = [
  ["Why do ester local anaesthetics act for a shorter duration than amides?", "Esters (procaine, amethocaine) are hydrolysed rapidly by plasma cholinesterase, giving half-lives of 1–10 min. Amides (lidocaine, bupivacaine, ropivacaine) are metabolised slowly by hepatic CYP enzymes with half-lives of 1.5–3.5 h. Ester hydrolysis also liberates PABA, which explains the allergy risk that amides lack."],
  ["What is a chiral centre and why is ropivacaine an example?", "A chiral centre is a carbon bonded to four different groups, generating two non-superimposable mirror-image enantiomers. Ropivacaine is the pure S(-)-enantiomer of its racemate; the R(+) form is more cardiotoxic. Single-enantiomer formulation gives ropivacaine a safer cardiovascular profile than racemic bupivacaine at equipotent doses."],
  ["How does pKa influence local anaesthetic onset?", "At tissue pH 7.4, Henderson–Hasselbalch dictates the proportion of un-ionised (lipid-soluble) drug. Lidocaine (pKa 7.9) has more un-ionised drug at injection and crosses the nerve membrane in 2–5 min. Higher-pKa drugs (bupivacaine 8.1, procaine 8.9) are more ionised and slower to act."],
];
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { OrganicChemistryDiagram } from "@/components/diagrams/chemistry/OrganicChemistryDiagram";
import IsomerismDiagram from "@/components/diagrams/chemistry/IsomerismDiagram";
import ChiralityAnaesthesiaDiagram from "@/components/diagrams/chemistry/ChiralityAnaesthesiaDiagram";
import AmineComparisonDiagram from "@/components/diagrams/chemistry/AmineComparisonDiagram";
import { organicChemistryQuiz } from "@/data/quizzes";
import { InlineRef } from "@/components/references/InlineRef";
import { Exam } from "@/data/curriculum";

const OrganicChemistryTopic = () => {
  return (
    <TopicTemplate
      title="Organic Chemistry for Anaesthetists"
      subtitle="Functional groups, isomerism, and chirality — how molecular structure determines drug behaviour"
      backPath="/chemistry"
      backLabel="Chemistry Foundations"
      accentColor="text-chemistry"
      topicId="organic-chemistry"
      quizQuestions={organicChemistryQuiz}
      objectives={[
        "Identify ester, amide, amine, and aromatic groups in anaesthetic drugs.",
        "Distinguish structural, geometric, optical isomers, and tautomers with clinical examples.",
        "Explain why chirality alters pharmacology (ketamine, bupivacaine).",
        "Contrast tertiary and quaternary amines and predict membrane crossing behaviour.",
        "Use lipophilicity to predict CNS penetration and protein binding.",
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY], curriculumCodes: ["PH_BK_02"] },
        workedExamples: { exams: [Exam.PRIMARY] },
        keyPoints: { exams: [Exam.PRIMARY] },
      }}
      sectionSources={{
        objectives: ["Peck & Hill Ch.3", "Cross & Plunkett Ch.4"],
        workedExamples: ["Cross & Plunkett Ch.4", "BJA Educ 2008", "Nau & Strichartz 2002"],
        keyPoints: ["Peck & Hill Ch.3", "Cross & Plunkett Ch.4", "BJA Educ 2008", "Nau & Strichartz 2002"],
      }}
      coreConcepts={
        <>
          <ExamSection exams={[Exam.PRIMARY]} curriculumCodes={["PH_BK_02"]}>
            <CollapsibleSubsection title="Why Organic Chemistry Matters" defaultOpen>
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
              <p>
                Organic chemistry is the chemistry of carbon-containing compounds. Almost every drug used in anaesthesia
                is an organic molecule. Understanding functional groups tells you about a drug's <strong>solubility</strong> (will it
                dissolve in blood or cross the BBB?), <strong>metabolism</strong> (ester hydrolysis vs hepatic oxidation),
                and <strong>mechanism</strong> (which part of the molecule binds the receptor?).
              </p>
              <p>
                You don't need to memorise complex synthetic pathways. What matters is recognising the key functional groups
                present in anaesthetic drugs and understanding how they influence clinical behaviour.
              </p>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mt-4">
              <OrganicChemistryDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY]} curriculumCodes={["PH_BK_02"]}>
            <CollapsibleSubsection title="Isomerism">
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
              <p>
                Isomers are molecules with the <strong>same molecular formula</strong> but <strong>different structural arrangements</strong>.
                This is clinically important because isomers can have very different pharmacological properties.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Structural isomers:</strong> Different connectivity. e.g. enflurane vs isoflurane (same formula CHClF₂-O-CHF₂ but atoms connected differently)</li>
                <li><strong>Geometric (cis/trans) isomers:</strong> Different spatial arrangement around a double bond or ring. e.g. atracurium has cis and trans isomers</li>
                <li><strong>Optical isomers (enantiomers):</strong> Non-superimposable mirror images at a chiral centre. e.g. S(+) and R(−) ketamine</li>
              </ul>
              <p>
                <strong>Tautomerism</strong> is a special case where a molecule exists in equilibrium between two structural
                forms. Thiopentone exists as keto and enol tautomers — the enol form (thiol) gives it its name
                and explains its yellow colour in solution.
              </p>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mt-4">
              <IsomerismDiagram />
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mt-4">
              <ChiralityAnaesthesiaDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY]} curriculumCodes={["PH_BK_02"]}>
            <CollapsibleSubsection title="Tertiary vs Quaternary Amines">
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
              <p>
                Nitrogen sits at the heart of an enormous fraction of anaesthetic drugs — local anaesthetics, opioids,
                vasopressors, antimuscarinics and every non-depolarising muscle relaxant. The single most important
                question to ask of any nitrogen-containing drug is: <strong>how many carbon substituents are on the nitrogen?</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Tertiary amine (R₃N):</strong> three carbon substituents, one lone pair. The lone pair can accept a proton, so the drug exists in equilibrium between an unionised (lipid-soluble) form and a protonated (water-soluble) form. The ratio is set by the drug's pKa and the surrounding pH — Henderson–Hasselbalch. Only the unionised form crosses lipid membranes including the BBB and placenta.</li>
                <li><strong>Quaternary amine (R₄N⁺):</strong> four carbon substituents and a permanent positive charge. There is no neutral form, so it cannot dissolve in the lipid bilayer at any pH. Predictable signature: poor oral absorption, small Vd, no BBB or placental crossing, renal excretion of parent compound.</li>
              </ul>
              <p>
                This single structural feature explains why <strong>neostigmine must be paired with glycopyrrolate</strong>
                (both quaternary, no central effects), why <strong>suxamethonium and rocuronium are safe for the foetus</strong>
                (don't cross placenta), and why <strong>atropine causes central anticholinergic syndrome but glycopyrrolate doesn't</strong>.
              </p>
            </div>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mt-4">
              <AmineComparisonDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>


          <ExamSection exams={[Exam.PRIMARY]} curriculumCodes={["PH_BK_02"]}>
            <CollapsibleSubsection title="Functional Groups and Their Pharmacological Consequences">
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
              <p>
                Every functional group hung off a drug's carbon skeleton has predictable consequences for its chemistry,
                its pharmacokinetics, and its interaction with receptors. Learning to "read" a structure this way lets you
                predict behaviour of drugs you have never seen before — a favourite viva technique.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border text-foreground">
                      <th className="text-left py-1 pr-2">Group</th>
                      <th className="text-left py-1 pr-2">Chemical properties</th>
                      <th className="text-left py-1 pr-2">Pharmacokinetic effect</th>
                      <th className="text-left py-1 pr-2">Pharmacodynamic effect</th>
                      <th className="text-left py-1">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50 align-top">
                      <td className="py-1 pr-2 font-semibold text-foreground">Hydroxyl / phenol (−OH)</td>
                      <td className="py-1 pr-2">Polar, hydrogen-bond donor and acceptor; phenolic −OH on a benzene ring is weakly acidic (pKa ~10), largely un-ionised at pH 7.4</td>
                      <td className="py-1 pr-2">Increases water solubility; a prime site for Phase II <strong>glucuronidation</strong> or sulphation, producing water-soluble conjugates for renal excretion</td>
                      <td className="py-1 pr-2">Hydrogen bonding to receptor serine/tyrosine residues; contributes to antioxidant activity</td>
                      <td className="py-1"><strong>Propofol</strong> (phenol ring gives antioxidant, membrane-stabilising and pain-on-injection properties); <strong>morphine</strong> (3- and 6- hydroxyls)</td>
                    </tr>
                    <tr className="border-b border-border/50 align-top">
                      <td className="py-1 pr-2 font-semibold text-foreground">Carbonyl (C=O)</td>
                      <td className="py-1 pr-2">Polar, strong hydrogen-bond acceptor (no donor H); ketones are chemically stable, resist hydrolysis</td>
                      <td className="py-1 pr-2">Susceptible to Phase I reduction to a hydroxyl (e.g. ketone → alcohol) rather than hydrolysis</td>
                      <td className="py-1 pr-2">Dipole allows binding to receptor sites without the lability of an ester bond</td>
                      <td className="py-1"><strong>Ketamine</strong> (cyclohexanone ring carbonyl)</td>
                    </tr>
                    <tr className="border-b border-border/50 align-top">
                      <td className="py-1 pr-2 font-semibold text-foreground">Carboxyl (−COOH)</td>
                      <td className="py-1 pr-2">Acidic (pKa ~4–5) — almost fully ionised (−COO⁻) at pH 7.4, highly polar</td>
                      <td className="py-1 pr-2">High water solubility, extensive plasma protein (albumin) binding; a direct substrate for Phase II <strong>glucuronidation</strong> (acyl glucuronides)</td>
                      <td className="py-1 pr-2">Ionic bonding to cationic receptor residues; poor passive membrane crossing when ionised, limiting CNS penetration</td>
                      <td className="py-1"><strong>Morphine-3-glucuronide / morphine-6-glucuronide</strong> (carboxyl-linked conjugates); NSAIDs (ibuprofen, ketorolac)</td>
                    </tr>
                    <tr className="border-b border-border/50 align-top">
                      <td className="py-1 pr-2 font-semibold text-foreground">Amine, −NH₂ (incl. quaternary ammonium)</td>
                      <td className="py-1 pr-2">Basic; tertiary amines (pKa typically 7.5–8.5) are partly protonated at pH 7.4 (Henderson–Hasselbalch); quaternary ammonium (R₄N⁺) carries a fixed, permanent positive charge with no neutral form</td>
                      <td className="py-1 pr-2">Tertiary amines partition between ionised/un-ionised forms, allowing membrane crossing; quaternary compounds are obligately water-soluble, poorly absorbed orally, and excreted renally largely unchanged</td>
                      <td className="py-1 pr-2">The protonated amine forms an ionic bond with the anionic subsite of the receptor; the quaternary ammonium group mimics the choline moiety of acetylcholine and docks directly into the anionic recognition site of the nicotinic ACh receptor</td>
                      <td className="py-1"><strong>Suxamethonium</strong> and <strong>rocuronium</strong> (quaternary ammonium groups engage the nicotinic receptor's ACh recognition site directly)</td>
                    </tr>
                    <tr className="border-b border-border/50 align-top">
                      <td className="py-1 pr-2 font-semibold text-foreground">Ester (−COO−)</td>
                      <td className="py-1 pr-2">Polar carbonyl-oxygen linkage; the C−O bond is chemically labile and readily attacked by water</td>
                      <td className="py-1 pr-2">Rapidly hydrolysed by plasma (pseudo)cholinesterase and tissue esterases — Phase I metabolism completes in the plasma itself, giving very short half-lives</td>
                      <td className="py-1 pr-2">Short duration of action; hydrolysis products (e.g. PABA from ester local anaesthetics) can trigger true allergy</td>
                      <td className="py-1"><strong>Remifentanil</strong> (ester hydrolysed by non-specific plasma/tissue esterases, context-insensitive half-life ~3 min); <strong>atracurium</strong> (partly by non-specific esterase, alongside Hofmann elimination); <strong>cocaine</strong> and <strong>tetracaine</strong> (ester local anaesthetics)</td>
                    </tr>
                    <tr className="border-b border-border/50 align-top">
                      <td className="py-1 pr-2 font-semibold text-foreground">Amide (−CONH−)</td>
                      <td className="py-1 pr-2">Resonance-stabilised C−N bond, much more resistant to hydrolysis than an ester</td>
                      <td className="py-1 pr-2">Requires hepatic microsomal (CYP) metabolism, so it is slower — half-lives of hours rather than minutes</td>
                      <td className="py-1 pr-2">Longer duration of action; hepatic clearance is dose- and perfusion-dependent, so hepatic impairment prolongs effect</td>
                      <td className="py-1"><strong>Lidocaine</strong> and <strong>bupivacaine</strong> (amide LAs, two "i"s before "-caine") contrasted with the ester LAs <strong>cocaine</strong> and <strong>tetracaine</strong></td>
                    </tr>
                    <tr className="border-b border-border/50 align-top">
                      <td className="py-1 pr-2 font-semibold text-foreground">Ether (C−O−C)</td>
                      <td className="py-1 pr-2">Weakly polar, chemically inert, does not readily hydrolyse or ionise</td>
                      <td className="py-1 pr-2">Confers the moderate lipid solubility and volatility exploited by inhalational agents; largely eliminated unchanged by exhalation rather than metabolism</td>
                      <td className="py-1 pr-2">Stability under clinical conditions (low metabolism → low risk of toxic metabolite formation, e.g. compared with older halogenated agents)</td>
                      <td className="py-1"><strong>Sevoflurane</strong> (fluorinated methyl isopropyl ether)</td>
                    </tr>
                    <tr className="align-top">
                      <td className="py-1 pr-2 font-semibold text-foreground">Benzene ring</td>
                      <td className="py-1 pr-2">Planar, highly lipophilic, delocalised π-electron cloud allows π–π stacking interactions</td>
                      <td className="py-1 pr-2">Increases lipid solubility, protein binding and volume of distribution; promotes hepatic oxidative (CYP) rather than renal clearance</td>
                      <td className="py-1 pr-2">Drives partitioning into lipid-rich CNS tissue, enhancing potency and speed of onset for centrally-acting drugs</td>
                      <td className="py-1"><strong>Propofol</strong>, <strong>thiopentone</strong> and <strong>midazolam</strong> (aromatic rings underpin rapid CNS penetration)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Two Phase II conjugation reactions recur across these examples: <strong>glucuronidation</strong> (UDP-glucuronosyltransferase
                attaches glucuronic acid to a hydroxyl, carboxyl, or amine group) and <strong>sulphation</strong> (attachment of a sulphate
                group, mainly to phenolic hydroxyls). Both dramatically increase water solubility and molecular size, terminating
                pharmacological activity and enabling renal or biliary excretion — morphine's phenolic 3-OH is glucuronidated to the
                largely inactive morphine-3-glucuronide, while its 6-OH forms the potent, active morphine-6-glucuronide.
                <InlineRef topicId="organic-chemistry" refLabel="BJA Educ 2008" />
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY]} curriculumCodes={["PH_BK_02"]}>
            <CollapsibleSubsection title="Lipophilicity & Drug Delivery">
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
              <p>
                A drug's <strong>partition coefficient</strong> (oil:water ratio) determines how it distributes between
                aqueous (blood) and lipid (membrane) compartments. This is directly determined by the molecule's
                functional groups:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>Lipophilic groups</strong> (hydrocarbon chains, benzene rings, halogen atoms): increase membrane penetration, CNS access, and protein binding</li>
                <li><strong>Hydrophilic groups</strong> (—OH, —NH₂, —COOH, ionic groups): increase water solubility but reduce membrane crossing</li>
                <li>Most effective drugs have a balance — enough lipophilicity to cross membranes, enough hydrophilicity to dissolve in plasma</li>
              </ul>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          <TopicFaqs faqs={organicChemistryFaqs} />
        </>
      }
      workedExamples={[
        {
          title: "Choosing an antimuscarinic with neostigmine reversal",
          scenario: "You are reversing rocuronium with neostigmine 50 mcg/kg in a 65-year-old with mild cognitive impairment. Choose between atropine and glycopyrrolate as antimuscarinic cover.",
          working: (
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Step-by-step reasoning</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Identify amine class: <strong>atropine</strong> = tertiary amine (crosses BBB); <strong>glycopyrrolate</strong> = quaternary (does not).</li>
                <li>Risk in elderly/cognitively impaired patient: central anticholinergic syndrome from atropine.</li>
                <li>Match onset: glycopyrrolate onset matches neostigmine better than atropine, reducing transient bradycardia.</li>
                <li>Choose <strong>glycopyrrolate 10 mcg/kg</strong> with neostigmine 50 mcg/kg.</li>
              </ol>
              <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
                <p className="text-xs font-semibold text-destructive uppercase">Common traps</p>
                <ul className="list-disc list-inside text-foreground">
                  <li>Using atropine + neostigmine in the elderly → postoperative delirium.</li>
                  <li>Forgetting the onset mismatch with atropine (faster than neostigmine) → tachycardia then bradycardia.</li>
                </ul>
              </div>
            </div>
          ),
          answer: "Glycopyrrolate (quaternary, no central effects, matched onset) with neostigmine.",
    cites: ["Nau & Strichartz 2002"],
  },
        {
          title: "Viva: Why does it matter that a drug is a racemic mixture?",
          scenario: "The examiner shows you the structure of bupivacaine and asks you to explain the clinical significance of chirality and racemic mixtures, using bupivacaine and ketamine as examples.",
          working: (
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Model answer structure</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>A racemic mixture contains a 50:50 mix of two enantiomers — non-superimposable mirror images differing only in the spatial arrangement around a chiral centre.</li>
                <li>Receptors are themselves chiral (built from L-amino acids), so the two enantiomers can interact with a binding site differently. The <strong>Easson–Stedman hypothesis</strong> explains why: stereoselective activity requires at least <strong>three points of simultaneous contact</strong> between drug and receptor. Only one enantiomer's three substituents can align correctly with all three complementary receptor sites at once; its mirror image can achieve at best two of the three contacts, so it binds more weakly (or not at all).</li>
                <li>The more potent, "better-fitting" enantiomer is termed the <strong>eutomer</strong>; the less potent (or less desirable) mirror image is the <strong>distomer</strong>. The ratio of their potencies is the <strong>eudismic ratio</strong> — a large ratio means high stereoselectivity and a strong case for using the single eutomer clinically.</li>
                <li>Bupivacaine: the eutomer S(-)-bupivacaine (<strong>levobupivacaine</strong>) is the therapeutically desired isomer, with a similar local anaesthetic potency to the racemate but less affinity for cardiac Na⁺ channels. The distomer, R(+)-bupivacaine, contributes disproportionately to <strong>cardiotoxicity</strong> (fast-in/slow-out sodium channel block, refractory ventricular arrhythmias) seen with racemic bupivacaine — the rationale for preferring levobupivacaine or ropivacaine (a pure S-enantiomer from first synthesis) in high-dose regional blocks.</li>
                <li>Ketamine: S(+)-ketamine is the eutomer, roughly 3–4× more potent as an NMDA-receptor antagonist and analgesic than R(-)-ketamine, with a more favourable emergence and recovery profile; the eudismic ratio favours using S-ketamine alone where available.</li>
                <li>Dexmedetomidine is itself a single, pharmacologically active enantiomer (the S-enantiomer of medetomidine) selected specifically for its high α2:α1 selectivity — a further example of enantiomer selection improving the therapeutic index rather than using a racemate.</li>
              </ol>
              <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
                <p className="text-xs font-semibold text-destructive uppercase">Common traps</p>
                <ul className="list-disc list-inside text-foreground">
                  <li>Saying enantiomers have "identical" pharmacology because they share a molecular formula — physical properties (melting point, solubility) are identical, but receptor interactions and hence pharmacodynamics/toxicity often are not.</li>
                  <li>Confusing eutomer/distomer with agonist/antagonist — both enantiomers usually act at the same receptor with the same general mechanism, just different affinity.</li>
                  <li>Forgetting that a racemate is not simply "half as potent"; distomer effects (e.g. bupivacaine cardiotoxicity) may be disproportionately harmful rather than merely inactive.</li>
                </ul>
              </div>
            </div>
          ),
          answer: "Chiral receptors need three simultaneous points of contact (Easson-Stedman) for full activity, so only one enantiomer (the eutomer) binds optimally; the eudismic ratio quantifies its potency advantage over the distomer. Levobupivacaine/S-bupivacaine is the safer eutomer versus the more cardiotoxic R(+)-distomer in racemic bupivacaine; S-ketamine is the more potent eutomer of ketamine; dexmedetomidine is used as a single active enantiomer for receptor selectivity.",
          cites: ["Nau & Strichartz 2002", "Cross & Plunkett Ch.4"],
        },
      ]}
      keyPoints={[
        { text: "Ester bonds (—COO—) are rapidly hydrolysed by plasma esterases → short-acting drugs (remifentanil, mivacurium, ester LAs)", cites: ["BJA Educ 2008"] },
        { text: "Amide bonds (—CONH—) require hepatic metabolism → longer acting. Amide LAs have 2 i's before '-caine'", cites: ["Cross & Plunkett Ch.4"] },
        { text: "Quaternary amines (R₄N⁺) carry permanent charge → cannot cross BBB or placenta (glycopyrrolate, neostigmine)", cites: ["Peck & Hill Ch.3"] },
        { text: "Chirality: enantiomers can have very different potency and toxicity (levobupivacaine vs racemic bupivacaine)", cites: ["Nau & Strichartz 2002"] },
        { text: "Benzene rings increase lipophilicity → better CNS penetration (propofol, thiopentone, midazolam)", cites: ["BJA Educ 2008"] },
        { text: "Halogenation (adding F, Cl, Br) increases molecular stability and alters volatility of anaesthetic agents", cites: ["Cross & Plunkett Ch.4"] },
        { text: "Hydrogen bonding capability determines water solubility and protein binding characteristics", cites: ["Peck & Hill Ch.3"] },
      ]}
    />
  );
};

export default OrganicChemistryTopic;
