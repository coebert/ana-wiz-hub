import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { CompartmentModelDiagram } from "@/components/diagrams/pharmacology/CompartmentModelDiagram";
import { CSHTComparisonDiagram } from "@/components/diagrams/pharmacology/CSHTComparisonDiagram";
import { ADMECascadeDiagram } from "@/components/diagrams/pharmacology/ADMECascadeDiagram";
import { pharmacokineticsQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { InlineRef } from "@/components/references/InlineRef";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";

const pharmacokineticsFaqs: Array<[string, string]> = [
  [
    "Define volume of distribution and give a clinical example.",
    "Vd = total amount of drug in the body / plasma concentration. It is an apparent volume — it can far exceed total body water if the drug binds extensively to tissues (digoxin Vd ~7 L/kg, amiodarone ~70 L/kg). A large Vd predicts a long elimination half-life (T½ = 0.693 × Vd / Cl) and means dialysis is ineffective for removal. Highly water-soluble, plasma-bound drugs (warfarin, heparin) have small Vd (~0.1 L/kg)."
  ],
  [
    "What is context-sensitive half-time and why does it matter for TIVA?",
    "CSHT = the time for plasma concentration to halve after stopping an infusion that has run for a particular duration (the 'context'). Unlike elimination half-life, CSHT lengthens with infusion duration as peripheral compartments fill. Remifentanil CSHT remains ~3 min regardless of duration (esterase metabolism); fentanyl CSHT rises from 12 min after 1 h to >200 min after 8 h — explains why fentanyl is unsuitable for prolonged TIVA."
  ],
  [
    "Explain first-pass metabolism and its anaesthetic relevance.",
    "Orally administered drugs absorbed from the gut pass via portal vein to the liver, where they may be largely metabolised before reaching the systemic circulation. Morphine has ~30 % oral bioavailability (heavy first pass), GTN is essentially zero (hence sublingual), midazolam ~40 %. Buccal, sublingual, IV, IM and rectal routes bypass first pass. Hepatic dysfunction increases bioavailability of high-extraction drugs unpredictably."
  ]
];

const PharmacokineticsTopic = () => {
  return (
    <TopicTemplate
      title="Pharmacokinetic Principles"
      subtitle="FRCA Primary — Pharmacology"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
      topicId="pharmacokinetics"
      quizQuestions={pharmacokineticsQuiz}
      objectives={[
        "Define ADME and how each step shapes plasma concentration over time.",
        "Describe one- and two-compartment models and bi-exponential decline.",
        "Calculate volume of distribution, clearance, and elimination half-life.",
        "Distinguish flow- from capacity-dependent hepatic clearance.",
        "Use context-sensitive half-time to predict offset of TIVA infusions.",
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY], curriculumCodes: ["PH_BK_01"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: ["Peck & Hill Ch.2", "BJA Educ 2017", "BJA Educ PK 2018"],
        workedExamples: ["Peck & Hill Ch.2", "Stanski & Shafer", "BJA Educ 2017", "BJA Educ PK 2018"],
        keyPoints: ["ICM 2013 (Antibiotic PK in critical illness)", "Peck & Hill Ch.2", "BJA Educ 2017", "Stanski & Shafer", "BJA Educ PK 2018"],
      }}
      coreConcepts={
        <>
          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="Introduction" defaultOpen>
            <p className="text-foreground/90 leading-relaxed">
              Pharmacokinetics describes what the body does to a drug — its absorption, distribution, metabolism, and
              elimination (ADME). Understanding these principles allows the anaesthetist to predict drug onset, duration,
              and accumulation with repeated dosing.
            </p>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mt-4">
              <ADMECascadeDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="Compartment Models">
            <p className="text-foreground/90 leading-relaxed">
              Compartment models are mathematical abstractions that describe drug distribution. The body is divided into
              compartments based on the rate of drug equilibration. The central compartment (V₁) represents the
              well-perfused tissues (blood, heart, brain, kidneys). Peripheral compartments represent less well-perfused
              tissues (muscle, fat). The two-compartment model shows a bi-exponential decline: a rapid distribution
              phase (α) followed by a slower elimination phase (β).
            </p>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mt-4">
              <CompartmentModelDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="Volume of Distribution (Vd)">
            <p className="text-foreground/90 leading-relaxed">
              Vd is a theoretical volume that would be required to contain the total amount of drug at the same concentration
              as in plasma: <strong>Vd = Dose / C₀</strong>. A large Vd (e.g., amiodarone ~70 L/kg) indicates extensive
              tissue distribution. A small Vd (e.g., warfarin ~0.1 L/kg) suggests the drug remains largely in plasma.
            </p>
            <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
              <p className="text-sm font-medium text-foreground">Clinical Application</p>
              <p className="text-sm text-muted-foreground mt-1">
                Drugs with a large Vd are poorly removed by haemodialysis (e.g., digoxin, Vd = 500 L). Context-sensitive
                half-time increases with infusion duration for drugs that accumulate in peripheral compartments.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="Clearance">
            <div className="space-y-3 text-foreground/90 leading-relaxed">
              <p>Clearance (Cl) is the volume of plasma completely cleared of drug per unit time: <strong>Cl = elimination rate / plasma concentration</strong>. Total clearance is additive: <strong>Cl<sub>total</sub> = Cl<sub>renal</sub> + Cl<sub>hepatic</sub> + Cl<sub>other</sub></strong>.</p>
              <p>The organ extraction ratio is the fraction removed in one pass: <strong>ER = (C<sub>in</sub> − C<sub>out</sub>) / C<sub>in</sub></strong>, and organ clearance approximates blood flow × ER. High-ER (&gt;0.7) drugs such as propofol, lidocaine and morphine are flow-limited. Low-ER (&lt;0.3) drugs such as warfarin, diazepam and phenytoin are capacity-limited and depend more on unbound fraction and intrinsic enzyme activity <InlineRef topicId="pharmacokinetics" refLabel="Peck & Hill Ch.2" />.</p>
              <p><strong>Renal clearance</strong> is the net result of three processes. <strong>Glomerular filtration</strong> handles only <em>unbound</em> drug — a highly protein-bound drug such as warfarin is filtered poorly regardless of GFR, so changes in free fraction matter more than changes in total concentration. <strong>Active tubular secretion</strong> in the proximal tubule uses OAT and OCT transporters and is not limited by protein binding, so clearance can exceed GFR; penicillins, methotrexate and diuretics are secreted this way, and probenecid competitively blocks the anionic transporter (historically used to prolong penicillin levels). <strong>Passive tubular reabsorption</strong> returns lipid-soluble, un-ionised drug to the blood down the concentration gradient created by water reabsorption.</p>
              <p>Because only the un-ionised form is reabsorbed, urine pH manipulation alters excretion: <strong>urinary alkalinisation</strong> with sodium bicarbonate ionises weak acids such as salicylate and phenobarbitone, trapping them in the tubular lumen and increasing elimination; acidification would conversely trap weak bases. Renal clearance falls with reduced GFR, competition for secretion, and drugs that reduce renal blood flow (NSAIDs, ACE inhibitors) <InlineRef topicId="pharmacokinetics" refLabel="Peck & Hill Ch.2" />.</p>

            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="kinetic-order" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="First-Order vs Zero-Order Kinetics">
              <div className="grid md:grid-cols-2 gap-4 text-sm"><div className="rounded-lg border border-border p-4"><p className="font-semibold text-foreground">First-order</p><p className="mt-1 text-muted-foreground">A constant <strong>fraction</strong> is eliminated per unit time; rate is proportional to concentration and half-life is constant. Most drugs behave this way at therapeutic concentrations.</p></div><div className="rounded-lg border border-border p-4"><p className="font-semibold text-foreground">Zero-order</p><p className="mt-1 text-muted-foreground">A saturated pathway removes a constant <strong>amount</strong> per unit time; no fixed half-life. Small dose increases can cause disproportionate concentration rises and toxicity. Examples: ethanol, phenytoin, and high-dose salicylate; theophylline and warfarin can become capacity-limited near saturation.</p></div></div>
              <InlineRef topicId="pharmacokinetics" refLabel="Peck & Hill Ch.2" />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="critical-illness-pk" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="Pharmacokinetics in Critical Illness">
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed"><li><strong>Distribution:</strong> capillary leak, oedema and fluid resuscitation enlarge hydrophilic-drug Vd; hypoalbuminaemia increases free acidic drug, while raised α₁-acid glycoprotein alters basic-drug binding.</li><li><strong>Clearance:</strong> shock and hepatic/renal failure reduce clearance, but augmented renal clearance in younger hyperdynamic patients can make standard β-lactam doses subtherapeutic.</li><li><strong>Organ support:</strong> CKRT adds extracorporeal clearance according to membrane, modality, flow and protein binding; ECMO circuitry adds an apparent compartment and may sequester lipophilic, protein-bound drugs.</li><li><strong>Practice:</strong> use loading doses based on altered Vd, then individualise maintenance to measured clearance, organ support and therapeutic drug monitoring.</li></ul>
              <InlineRef topicId="pharmacokinetics" refLabel="Intensive Care Med PK 2014" />
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Standard dosing derived from healthy volunteers frequently fails in the ICU: hydrophilic drugs are diluted into an expanded Vd, hypoalbuminaemia raises the free fraction of highly bound drugs such as ceftriaxone and phenytoin, and clearance may be either augmented (creatinine clearance &gt;130 mL/min in young hyperdynamic sepsis) or collapsed by renal and hepatic failure. The practical answer is a generous loading dose, extended or continuous infusion for time-dependent antibiotics, and therapeutic drug monitoring where available <InlineRef topicId="pharmacokinetics" refLabel="ICM 2013 (Antibiotic PK in critical illness)" />.</p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="special-populations-pk" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="Pharmacokinetics in Special Populations">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="rounded-lg border border-border p-4">
                  <p className="font-semibold text-foreground">Neonates and children</p>
                  <ul className="mt-1 space-y-1 text-muted-foreground list-disc list-inside leading-relaxed">
                    <li><strong>Body composition:</strong> total body water ~75–80 % at birth (adult ~60 %) with low fat and muscle → larger Vd for water-soluble drugs (suxamethonium 2 mg/kg in neonates vs 1 mg/kg in adults), smaller Vd for lipid-soluble drugs.</li>
                    <li><strong>Protein binding:</strong> low albumin and α₁-acid glycoprotein, plus competition from bilirubin, raise the free fraction.</li>
                    <li><strong>Metabolism:</strong> immature phase I oxidation and especially <strong>glucuronidation</strong> (mature by ~6–12 months); sulphation partly compensates. Morphine clearance is markedly reduced in the neonate → prolonged half-life and apnoea risk.</li>
                    <li><strong>Maturation:</strong> tramadol clearance rises from 5.5 L/h/70 kg at 25 weeks post-conception age to 84 % of the mature value by 44 weeks when scaled allometrically <InlineRef topicId="pharmacokinetics" refLabel="BJA 2005 Tramadol Neonates" />.</li>
                    <li><strong>Renal:</strong> GFR ~30 % of adult (per surface area) at term, mature by ~1 year — reduce doses of renally cleared drugs (aminoglycosides, vancomycin).</li>
                    <li><strong>Beyond infancy:</strong> toddlers have higher weight-normalised clearance than adults (larger liver and kidney mass per kg) and often need larger mg/kg doses at shorter intervals.</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <p className="font-semibold text-foreground">The elderly</p>
                  <ul className="mt-1 space-y-1 text-muted-foreground list-disc list-inside leading-relaxed">
                    <li><strong>Body composition:</strong> total body water and lean mass fall while fat fraction rises → smaller central compartment (higher initial concentration after a bolus — hence slow, reduced induction doses) but larger Vd and longer terminal half-life for lipophilic drugs such as diazepam and thiopentone.</li>
                    <li><strong>Protein binding:</strong> modest fall in albumin increases free fraction of acidic drugs.</li>
                    <li><strong>Hepatic:</strong> liver mass and blood flow decline ~30–40 % → reduced clearance of flow-limited, high-extraction drugs (propofol, lidocaine, morphine); phase I oxidation declines more than conjugation, so lorazepam and oxazepam are relatively spared.</li>
                    <li><strong>Renal:</strong> GFR falls ~1 mL/min/year from mid-life; creatinine may remain normal despite low clearance because muscle mass is reduced.</li>
                    <li><strong>Net effect:</strong> prolonged half-lives, slower recovery and accumulation on infusion — plus increased pharmacodynamic sensitivity. Reduce doses, lengthen intervals and titrate to effect.</li>
                  </ul>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Also consider pregnancy (increased plasma volume and GFR, reduced albumin) and obesity (dose induction agents to lean body weight, maintenance infusions to adjusted body weight) <InlineRef topicId="pharmacokinetics" refLabel="Peck & Hill Ch.2" />.</p>
            </CollapsibleSubsection>
          </ExamSection>


          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="Half-Life and Steady State">
            <p className="text-foreground/90 leading-relaxed">
              The elimination half-life (t½) is the time for plasma concentration to fall by 50%:
              <strong> t½ = 0.693 × Vd / Cl</strong>. It depends on both distribution and elimination. Steady state during
              continuous infusion is reached after approximately 4-5 half-lives, where the rate of administration equals the
              rate of elimination.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="Context-Sensitive Half-Time">
            <p className="text-foreground/90 leading-relaxed">
              Unlike terminal half-life, the context-sensitive half-time (CSHT) describes the time for plasma concentration
              to fall by 50% after stopping an infusion of a given duration. Remifentanil has a short, constant CSHT (~3-4 min)
              regardless of infusion duration, while fentanyl's CSHT increases markedly with prolonged infusions.
            </p>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mt-4">
              <CSHTComparisonDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="pharmacology"
            pitfalls={[
              "Volume of distribution is a virtual volume — high Vd reflects extensive tissue binding, not actual fluid volume.",
              "Clearance, not half-life, drives steady-state concentration on an infusion (Css = rate / clearance).",
              "Context-sensitive half-time (not elimination half-life) predicts offset after prolonged infusions — remifentanil stays ~4 min regardless of duration.",
              "Five half-lives ≈ 97% steady state or elimination; loading dose = Vd × target concentration.",
              "Hepatic extraction ratio: high-ER drugs (propofol, lidocaine, morphine) are flow-limited; low-ER drugs (warfarin, diazepam) are capacity-limited.",
            ]}
          />
        </>
      }
      workedExamples={[
        {
          title: "Half-life and steady state from Vd and Cl",
          scenario: "A drug has Vd = 70 L and clearance Cl = 7 L/h in a 70 kg adult. Calculate t½ and time to steady state on a continuous infusion.",
          working: (
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Step-by-step reasoning</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Use t½ = 0.693 × Vd / Cl.</li>
                <li>t½ = 0.693 × 70 / 7 = <strong>6.93 h ≈ 7 h</strong>.</li>
                <li>Time to steady state ≈ 4–5 × t½ = <strong>28–35 h</strong>.</li>
                <li>If urgent therapeutic level needed → give a loading dose = target plasma concentration × Vd.</li>
              </ol>
              <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
                <p className="text-xs font-semibold text-destructive uppercase">Common traps</p>
                <ul className="list-disc list-inside text-foreground">
                  <li>Using terminal t½ to predict offset after a long infusion — use CSHT instead (e.g. fentanyl).</li>
                  <li>Forgetting that Vd is theoretical (can exceed total body water for highly tissue-bound drugs).</li>
                </ul>
              </div>
            </div>
          ),
          answer: "t½ ≈ 7 h, steady state in 28–35 h; load with Cp_target × Vd if urgent.",
    cites: ["Peck & Hill Ch.2"],
  },
        {
          title: "Choosing remifentanil vs fentanyl for a long case",
          scenario: "You plan a 6-hour spinal procedure with rapid postoperative neurological assessment. Which opioid infusion would you choose and why?",
          working: (
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Step-by-step reasoning</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Target offset: minutes after infusion stop, regardless of duration.</li>
                <li>Fentanyl CSHT after 6 h ≈ 250 min (rising to ~280 min by 8 h); remifentanil CSHT ~3–4 min (constant).</li>
                <li>Choose <strong>remifentanil</strong> for predictable rapid offset enabled by ester hydrolysis (independent of organ function).</li>
                <li>Plan multimodal analgesia (paracetamol, regional, long-acting opioid bridge before stopping) to avoid acute hyperalgesia.</li>
              </ol>
              <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
                <p className="text-xs font-semibold text-destructive uppercase">Common traps</p>
                <ul className="list-disc list-inside text-foreground">
                  <li>Stopping remifentanil without analgesic bridge → severe rebound pain.</li>
                  <li>Assuming fentanyl 'short-acting' from terminal t½ — context-sensitive half-time is what matters.</li>
                </ul>
              </div>
            </div>
          ),
          answer: "Remifentanil — flat CSHT ~3–4 min ensures predictable wake-up; bridge with longer-acting analgesia.",
    cites: ["BJA Educ 2017"],
  },
      ]}
      keyPoints={[
        { text: "Pharmacokinetics is ADME: Absorption, Distribution, Metabolism, and Elimination.", cites: ["Stanski & Shafer"] },
        { text: "Compartment models describe drug distribution kinetically. The two-compartment model shows bi-exponential decline (α distribution, β elimination).", cites: ["Peck & Hill Ch.2", "BJA Educ PK 2018"] },
        { text: "Volume of distribution (Vd) is a theoretical concept; a large Vd indicates extensive tissue distribution.", cites: ["BJA Educ 2017"] },
        { text: "Clearance is the volume of plasma completely cleared of drug per unit time. High extraction ratio drugs are flow-dependent.", cites: ["Stanski & Shafer"] },
        { text: "Half-life (t½ = 0.693 × Vd / Cl) determines time to steady state (~4-5 half-lives).", cites: ["Peck & Hill Ch.2"] },
        { text: "Context-sensitive half-time is more clinically relevant for infusions than terminal half-life. Remifentanil has a uniquely short and constant CSHT.", cites: ["BJA Educ 2017"] },
      ]}
    />
  );
};

export default PharmacokineticsTopic;
