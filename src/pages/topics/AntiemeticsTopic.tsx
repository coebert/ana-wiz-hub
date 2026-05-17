import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { antiemeticsQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";
import { DiagramSection } from "@/components/DiagramSection";
import VomitingControlDiagram from "@/components/diagrams/VomitingControlDiagram";

const objectives = [
  "Apply the Apfel score to estimate baseline PONV risk and stratify prophylaxis",
  "Compare antiemetic drug classes by receptor target, site of action and side-effect profile",
  "Plan multimodal PONV prophylaxis for low-, moderate- and high-risk patients (4-step approach)",
  "Recognise the cardiac, extrapyramidal and metabolic adverse effects of common antiemetics",
  "Choose appropriate rescue therapy (different class to prophylaxis; avoid repeating within 6 h)",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Multimodal PONV prophylaxis for a high-risk patient",
    scenario:
      "A 35-year-old non-smoking woman with a history of motion sickness is listed for laparoscopic cholecystectomy. The plan is GA with postoperative oral oxycodone. How do you stratify and treat her PONV risk?",
    working:
      "Apfel risk factors: female (1) + non-smoker (1) + history of PONV/motion sickness (1) + postoperative opioids (1) = 4 → ~79% baseline PONV risk.\nMultimodal plan: dexamethasone 4–8 mg at induction + ondansetron 4 mg IV at end of surgery + consider TIVA (propofol intrinsic antiemetic) + avoid N₂O + NSAID/regional analgesia to limit opioid load.\nRescue: cyclizine 50 mg IV (H₁) or droperidol 0.625 mg IV (D₂) — different class to prophylaxis.",
    answer:
      "Apfel 4 → ≥3 antiemetics from different classes plus opioid-sparing technique. Standard combination: dexamethasone (induction) + ondansetron (end of surgery) + cyclizine on the ward; TIVA + regional analgesia further halves rebound risk. Rescue with a drug from a class not already used.",
    cites: ["BJA Educ 2013"],
  },
  {
    title: "Drug interactions and the QTc",
    scenario:
      "A patient on methadone for chronic pain (baseline QTc 470 ms) needs PONV prophylaxis. Which agents are safe?",
    working:
      "Both ondansetron and droperidol prolong QTc — combination with methadone (also QTc-prolonging) risks torsades.\nDexamethasone, cyclizine and aprepitant do not significantly affect QTc.\nIf a 5-HT₃ antagonist is essential, use the lowest effective dose (ondansetron 4 mg) and obtain an ECG.",
    answer:
      "Build prophylaxis around dexamethasone + cyclizine ± aprepitant. Avoid droperidol; use ondansetron only at the lowest dose with ECG monitoring. Always check the cumulative QTc-prolonging burden in patients on methadone, antipsychotics or amiodarone.",
    cites: ["Peck & Hill Ch.16"],
  },
];

const AntiemeticsTopic = () => {
  return (
    <TopicTemplate
      title="Antiemetics & PONV"
      subtitle="Apfel risk stratification, drug classes, and multimodal prevention"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
      topicId="antiemetics"
      topicTitle="Antiemetics & PONV"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={antiemeticsQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["RCoA Primary — Pharmacology", "RCoA Final — Pharmacology"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        workedExamples: ["Gan et al. 2020"],
      }}
      keyPoints={[
        { text: "Apfel score: female, non-smoker, history of PONV, postoperative opioids — each adds ~20% risk", cites: ["Gan et al. 2020"] },
        { text: "Multimodal antiemesis from different receptor classes is more effective than single-agent prophylaxis", cites: ["BJA Educ 2013"] },
        { text: "Ondansetron (5-HT₃) + dexamethasone (steroid) is the most commonly used combination", cites: ["Peck & Hill Ch.16"] },
        { text: "Propofol (TIVA) has intrinsic antiemetic properties — consider for high-risk patients", cites: ["Gan et al. 2020"] },
        { text: "Metoclopramide is a weak antiemetic but useful as a prokinetic (↑ gastric emptying, ↑ LOS tone)", cites: ["BJA Educ 2013"] },
        { text: "Dexamethasone is given at induction (slow onset); ondansetron at end of surgery", cites: ["Peck & Hill Ch.16"] },
        { text: "Rescue uses a different class to prophylaxis; do not repeat the same drug within 6 h", cites: ["Gan et al. 2020"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="apfel" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="PONV Risk Factors (Apfel Score)" defaultOpen>
            <p className="text-muted-foreground leading-relaxed">
              Each Apfel risk factor adds approximately 20% to the baseline PONV risk: (1) female sex, (2) non-smoker, (3) history of
              PONV or motion sickness, (4) anticipated postoperative opioids. Score 0 = 10%, 1 = 21%, 2 = 39%, 3 = 61%, 4 = 79%.
              Surgical (laparoscopic, gynaecological, ENT, strabismus) and anaesthetic (volatiles, N₂O, neostigmine) factors further
              increase risk.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="drug-classes" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Antiemetic Drug Classes">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Class</th>
                    <th className="text-left py-2 text-foreground font-semibold">Receptor</th>
                    <th className="text-left py-2 text-foreground font-semibold">Site</th>
                    <th className="text-left py-2 text-foreground font-semibold">Examples</th>
                    <th className="text-left py-2 text-foreground font-semibold">Side Effects</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">5-HT₃ antagonist</td><td>5-HT₃</td><td>CTZ + vagal afferents</td><td>Ondansetron 4 mg</td><td>Headache, constipation, ↑ QTc</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">D₂ antagonist</td><td>Dopamine D₂</td><td>CTZ</td><td>Droperidol 0.625–1.25 mg</td><td>Sedation, extrapyramidal, ↑ QTc</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Antihistamine</td><td>H₁</td><td>Vestibular + vomiting centre</td><td>Cyclizine 50 mg</td><td>Sedation, dry mouth, tachycardia</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Anticholinergic</td><td>M₁</td><td>Vestibular + vomiting centre</td><td>Hyoscine 0.3 mg</td><td>Sedation, dry mouth, confusion (elderly)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">NK₁ antagonist</td><td>NK₁ (substance P)</td><td>Vomiting centre</td><td>Aprepitant 80 mg PO</td><td>CYP3A4 inhibitor, headache. Long duration (24 h+)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Corticosteroid</td><td>Multiple</td><td>Central + peripheral</td><td>Dexamethasone 4–8 mg</td><td>↑ glucose, perineal pruritus (IV push). Give at induction</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Prokinetic</td><td>D₂ + 5-HT₄</td><td>CTZ + GI tract</td><td>Metoclopramide 10 mg</td><td>Extrapyramidal (young women), ↑ LOS tone. Weak antiemetic</td></tr>
                </tbody>
              </table>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="management" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="PONV Management Strategy">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Low risk</strong> (Apfel 0–1): no routine prophylaxis</li>
              <li><strong>Moderate risk</strong> (Apfel 2): 1–2 antiemetics from different classes</li>
              <li>
                <strong>High risk</strong> (Apfel 3–4): multimodal ≥2 agents + consider TIVA (propofol's intrinsic antiemetic effect),
                avoid N₂O, minimise opioids (regional/multimodal analgesia)
              </li>
              <li><strong>Rescue</strong>: use an agent from a different class to prophylaxis. Do not repeat the same drug within 6 h</li>
              <li><strong>Non-pharmacological</strong>: adequate hydration, P6 acupressure, and avoiding excessive opioids</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="pharmacology"
            pitfalls={[
              "PONV risk (Apfel): female, non-smoker, history of PONV/motion sickness, postoperative opioids — give 1 prophylactic agent per risk factor.",
              "Ondansetron (5-HT3 antagonist): prolongs QT; most effective given at end of surgery.",
              "Dexamethasone 4–8 mg IV at induction — onset over hours; safe single dose even in diabetics (transient glucose rise).",
              "Droperidol/haloperidol: D2 antagonists — extrapyramidal effects and QT prolongation; black-box warning historically limits use.",
              "Cyclizine (H1) is useful but anticholinergic — tachycardia, sedation; avoid in severe heart failure and elderly.",
            ]}
          />
        </>
      }
    />
  );
};

export default AntiemeticsTopic;
