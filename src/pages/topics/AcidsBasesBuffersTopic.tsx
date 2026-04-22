import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { AcidsBasesDiagram } from "@/components/diagrams/AcidsBasesDiagram";
import { acidsBasesQuiz } from "@/data/quizzes";

const objectives = [
  "Define pH, pKa, and apply the Henderson-Hasselbalch equation to drug ionisation",
  "Distinguish strong and weak acids/bases and explain why only weak acids buffer effectively",
  "List the body's main buffer systems and rank their importance (bicarbonate, Hb, phosphate, protein)",
  "Explain ion trapping and its clinical relevance (local anaesthetics, paracetamol, salicylate elimination)",
  "Predict drug behaviour at extremes of pH (e.g. local anaesthetic failure in infected tissue)",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Local anaesthetic failure in an abscess",
    scenario:
      "A patient with a dental abscess (local tissue pH ~6.0) receives lidocaine (pKa 7.9) for an inferior alveolar block. The block fails. Why, and what would you do differently?",
    working:
      "Lidocaine is a weak base. Henderson-Hasselbalch (for bases): % unionised = 100 / [1 + 10^(pKa − pH)].\nAt physiological pH 7.4: % unionised = 100 / [1 + 10^(7.9 − 7.4)] = 100 / [1 + 10^0.5] = 100/4.16 ≈ 24%.\nAt abscess pH 6.0: % unionised = 100 / [1 + 10^(7.9 − 6.0)] = 100 / [1 + 79.4] ≈ 1.2%.\nOnly the unionised (B) form crosses the nerve membrane. Dropping unionised fraction from 24% to 1% explains the dramatic loss of efficacy.",
    answer:
      "Acidic infected tissue ionises the local anaesthetic, leaving little unionised drug to cross the nerve membrane. Either drain/treat the abscess first, use a regional block away from the infected tissue, or alkalinise the LA with bicarbonate (1 mEq per 10 mL of lidocaine) to raise the unionised fraction at injection.",
  },
  {
    title: "Urinary alkalinisation in salicylate overdose",
    scenario:
      "A 30-year-old presents with aspirin overdose (salicylate 650 mg/L; pH 7.32; HCO₃⁻ 14). Why does giving IV bicarbonate help, and what's the target urinary pH?",
    working:
      "Salicylic acid is a weak acid (pKa 3.5). In acidic urine it remains predominantly unionised → reabsorbed.\nAlkalinising urine to pH 7.5–8.5 ionises the drug (HA → H⁺ + A⁻). The ionised salicylate cannot cross the renal tubular membrane → 'ion trapping' → urinary excretion increased ~10–20-fold.\nGive 1.26% or 8.4% sodium bicarbonate IV; monitor K⁺ (often falls — replace) and urinary pH every hour.",
    answer:
      "Sodium bicarbonate raises urinary pH to trap ionised salicylate in the tubule. Target urinary pH 7.5–8.5, monitoring serum K⁺ (replacement essential — alkalosis worsens hypokalaemia and hypokalaemia stops urinary alkalinisation working). Haemodialysis is indicated for severe toxicity (level &gt; 700 mg/L, neurology, renal failure, refractory acidosis).",
  },
];

const AcidsBasesBuffersTopic = () => {
  return (
    <TopicTemplate
      title="Acids, Bases & Buffer Systems"
      subtitle="pH, pKa, Henderson-Hasselbalch, and the body's buffer systems"
      backPath="/chemistry"
      backLabel="Chemistry Foundations"
      accentColor="text-chemistry"
      topicId="acids-bases-buffers"
      topicTitle="Acids, Bases & Buffer Systems"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={acidsBasesQuiz}
      sectionExamMapping={{
        objectives: { exams: ["primary"], curriculumCodes: ["RCoA Primary — Physics & Clinical Measurement", "RCoA Primary — Pharmacology"] },
        workedExamples: { exams: ["primary", "final"] },
        keyPoints: { exams: ["primary", "final"] },
      }}
      sectionSources={{
        workedExamples: [
          "BJA Educ — Local anaesthetics: physical chemistry and clinical use",
          "TOXBASE / NPIS guidance on salicylate poisoning",
        ],
      }}
      keyPoints={[
        "pH = −log₁₀[H⁺]; each pH unit = 10-fold change in [H⁺]",
        "Normal blood pH 7.35–7.45 ([H⁺] 35–45 nmol/L). Compatible range ~6.8–7.8",
        "Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA]). When pH = pKa → 50% ionised",
        "Only unionised drug crosses lipid membranes — basis of ion trapping and drug absorption",
        "Bicarbonate buffer is the most important ECF buffer (open system — CO₂ exhaled by lungs)",
        "Haemoglobin provides ~35% of total body buffering; deoxyHb is a better buffer (Haldane effect)",
        "Buffer systems work best within ±1 pH unit of their pKa",
        "Strong acids fully dissociate (HCl); weak acids partially dissociate (H₂CO₃) — only weak acids buffer",
      ]}
      coreConcepts={
        <>
          <ExamSection id="foundations" exams={["primary"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Foundations of Acid-Base Chemistry</h2>
            <div className="text-muted-foreground space-y-3 leading-relaxed">
              <p>
                Acid-base chemistry is arguably the most important chemistry topic for anaesthetists. Every arterial blood gas you
                interpret, every drug ionisation calculation, and every understanding of buffer therapy rests on these principles.
              </p>
              <p>
                <strong>Brønsted-Lowry definition:</strong> An acid is a proton (H⁺) donor; a base is a proton acceptor. This is
                the most clinically useful definition. When HCl dissolves in water, it donates H⁺ to water: HCl → H⁺ + Cl⁻.
              </p>
              <p>
                <strong>Lewis definition:</strong> An acid is an electron-pair acceptor; a base is an electron-pair donor. Less
                commonly used clinically but explains coordination chemistry (e.g. metal ion-drug interactions).
              </p>
            </div>
          </ExamSection>

          <ExamSection id="diagram" exams={["primary"]}>
            <h2 className="text-xl font-bold text-foreground mb-4">Interactive Diagram</h2>
            <AcidsBasesDiagram />
          </ExamSection>

          <ExamSection id="henderson-hasselbalch" exams={["primary", "final"]} curriculumCodes={["RCoA Primary — Pharmacology"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">The Henderson-Hasselbalch Equation in Practice</h2>
            <div className="text-muted-foreground space-y-3 leading-relaxed">
              <p>
                The Henderson-Hasselbalch equation is the single most important equation linking chemistry to clinical pharmacology.
                It tells you what fraction of a drug is ionised vs unionised at any given pH.
              </p>
              <p>
                <strong>For weak acids</strong> (e.g. thiopentone pKa 7.6, aspirin pKa 3.5): in a solution more alkaline than the
                pKa, the drug is predominantly ionised (A⁻ form). In acidic conditions, it exists mainly as the unionised acid (HA).
              </p>
              <p>
                <strong>For weak bases</strong> (e.g. morphine pKa 8.0, local anaesthetics pKa ~7.7–8.1): in acidic conditions, the
                base accepts a proton and becomes ionised (BH⁺). In alkaline conditions, it is unionised (B).
              </p>
              <p>
                <strong>Clinical pearl:</strong> Only the <strong>unionised fraction</strong> is lipid-soluble enough to cross cell
                membranes (blood-brain barrier, placenta, nerve sheath). This explains why local anaesthetics work poorly in infected
                tissue (lower pH → more ionised → less crosses the nerve membrane).
              </p>
            </div>
          </ExamSection>
        </>
      }
    />
  );
};

export default AcidsBasesBuffersTopic;
