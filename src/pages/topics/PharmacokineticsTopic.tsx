import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { CompartmentModelDiagram } from "@/components/diagrams/CompartmentModelDiagram";
import { CSHTComparisonDiagram } from "@/components/diagrams/CSHTComparisonDiagram";
import { ADMECascadeDiagram } from "@/components/diagrams/ADMECascadeDiagram";
import { pharmacokineticsQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

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
        diagrams: { exams: [Exam.PRIMARY, Exam.FINAL] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: ["Peck & Hill Ch.2", "BJA Educ 2017"],
        diagrams: ["BJA Educ 2017", "Stanski & Shafer"],
        workedExamples: ["Peck & Hill Ch.2", "Stanski & Shafer"],
        keyPoints: ["Peck & Hill Ch.2", "BJA Educ 2017", "Stanski & Shafer"],
      }}
      diagrams={
        <>
          <ADMECascadeDiagram />
          <div className="bg-card rounded-xl border border-border p-6">
            <CompartmentModelDiagram />
          </div>
          <CSHTComparisonDiagram />
        </>
      }
      coreConcepts={
        <>
          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="Introduction" defaultOpen>
            <p className="text-foreground/90 leading-relaxed">
              Pharmacokinetics describes what the body does to a drug — its absorption, distribution, metabolism, and
              elimination (ADME). Understanding these principles allows the anaesthetist to predict drug onset, duration,
              and accumulation with repeated dosing.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="Compartment Models">
            <p className="text-foreground/90 leading-relaxed">
              Compartment models are mathematical abstractions that describe drug distribution. The body is divided into
              compartments based on the rate of drug equilibration. The central compartment (V₁) represents the
              well-perfused tissues (blood, heart, brain, kidneys). Peripheral compartments represent less well-perfused
              tissues (muscle, fat). The two-compartment model shows a bi-exponential decline: a rapid distribution
              phase (α) followed by a slower elimination phase (β).
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["PH_BK_01"]}>
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

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="Clearance">
            <p className="text-foreground/90 leading-relaxed">
              Clearance (Cl) is the volume of plasma from which drug is completely removed per unit time (mL/min or L/h).
              Total clearance is the sum of clearances by all eliminating organs:
              <strong> Cl<sub>total</sub> = Cl<sub>renal</sub> + Cl<sub>hepatic</sub> + Cl<sub>other</sub></strong>.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              Hepatic clearance depends on hepatic blood flow, protein binding, and intrinsic hepatic enzyme activity. Drugs
              with high extraction ratios (e.g., propofol, lidocaine) are flow-dependent — their clearance changes with
              hepatic blood flow. Low extraction ratio drugs (e.g., diazepam) are capacity-dependent.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="Half-Life and Steady State">
            <p className="text-foreground/90 leading-relaxed">
              The elimination half-life (t½) is the time for plasma concentration to fall by 50%:
              <strong> t½ = 0.693 × Vd / Cl</strong>. It depends on both distribution and elimination. Steady state during
              continuous infusion is reached after approximately 4-5 half-lives, where the rate of administration equals the
              rate of elimination.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["PH_BK_01"]}>
            <CollapsibleSubsection title="Context-Sensitive Half-Time">
            <p className="text-foreground/90 leading-relaxed">
              Unlike terminal half-life, the context-sensitive half-time (CSHT) describes the time for plasma concentration
              to fall by 50% after stopping an infusion of a given duration. Remifentanil has a short, constant CSHT (~3-4 min)
              regardless of infusion duration, while fentanyl's CSHT increases markedly with prolonged infusions.
            </p>
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
                <li>Fentanyl CSHT after 6 h ≈ 200 min; remifentanil CSHT ~3–4 min (constant).</li>
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
        { text: "Compartment models describe drug distribution kinetically. The two-compartment model shows bi-exponential decline (α distribution, β elimination).", cites: ["Peck & Hill Ch.2"] },
        { text: "Volume of distribution (Vd) is a theoretical concept; a large Vd indicates extensive tissue distribution.", cites: ["BJA Educ 2017"] },
        { text: "Clearance is the volume of plasma completely cleared of drug per unit time. High extraction ratio drugs are flow-dependent.", cites: ["Stanski & Shafer"] },
        { text: "Half-life (t½ = 0.693 × Vd / Cl) determines time to steady state (~4-5 half-lives).", cites: ["Peck & Hill Ch.2"] },
        { text: "Context-sensitive half-time is more clinically relevant for infusions than terminal half-life. Remifentanil has a uniquely short and constant CSHT.", cites: ["BJA Educ 2017"] },
      ]}
    />
  );
};

export default PharmacokineticsTopic;
