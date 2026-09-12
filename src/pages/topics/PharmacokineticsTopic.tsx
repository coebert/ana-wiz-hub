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
        keyPoints: ["Peck & Hill Ch.2", "BJA Educ 2017", "Stanski & Shafer", "BJA Educ PK 2018"],
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
              <p>Renal clearance combines filtration of unbound drug, active secretion and reabsorption; it falls with renal dysfunction and can exceed GFR when tubular secretion is important.</p>
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
