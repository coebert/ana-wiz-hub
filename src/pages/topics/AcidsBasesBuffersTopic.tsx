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
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step calculation</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Recall the equation for a base.</strong> % unionised = 100 / [1 + 10^(pKa − pH)]. Only the unionised (B) form crosses the nerve membrane.</li>
          <li><strong>Calculate at physiological pH 7.4.</strong> 100 / [1 + 10^(7.9 − 7.4)] = 100 / [1 + 10^0.5] = 100 / 4.16 ≈ <strong>24% unionised</strong>.</li>
          <li><strong>Calculate at abscess pH 6.0.</strong> 100 / [1 + 10^(7.9 − 6.0)] = 100 / [1 + 79.4] ≈ <strong>1.2% unionised</strong>.</li>
          <li><strong>Compare.</strong> Unionised drug falls from 24% → 1.2% — a <strong>20-fold drop</strong> in active species reaching the axon.</li>
          <li><strong>Choose a remedy.</strong> Option A: drain the abscess (raises tissue pH). Option B: regional block away from infected tissue (mental, mandibular nerve more proximally). Option C: alkalinise the LA at injection (1 mEq NaHCO₃ per 10 mL lidocaine).</li>
        </ol>
        <p className="font-semibold text-foreground mt-2">Useful rule of thumb</p>
        <ul className="list-disc list-inside space-y-1">
          <li>When pH = pKa → exactly 50% ionised : 50% unionised. Each pH unit moves the ratio by 10-fold.</li>
          <li>Lower pKa local anaesthetics (mepivacaine 7.6, lidocaine 7.9) have faster onset because more drug is unionised at physiological pH.</li>
        </ul>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Using the WEAK ACID form of Henderson-Hasselbalch for a base (or vice versa) — answer comes out the wrong way round.</li>
            <li>Adding bicarbonate to <strong>bupivacaine</strong> — it precipitates above pH ≈ 6.8.</li>
            <li>Blaming 'patient anatomy' for a block that failed because of tissue acidosis.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Acidic infected tissue ionises the local anaesthetic, leaving little unionised drug to cross the nerve membrane. Either drain/treat the abscess first, use a regional block away from the infected tissue, or alkalinise the LA with bicarbonate (1 mEq per 10 mL of lidocaine) to raise the unionised fraction at injection.",
  },
  {
    title: "Urinary alkalinisation in salicylate overdose",
    scenario:
      "A 30-year-old presents with aspirin overdose (salicylate 650 mg/L; pH 7.32; HCO₃⁻ 14). Why does giving IV bicarbonate help, and what's the target urinary pH?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Classify the drug.</strong> Salicylic acid = weak acid, pKa 3.5. Equation for an acid: % ionised = 100 / [1 + 10^(pH − pKa)] (or rearranged Henderson-Hasselbalch).</li>
          <li><strong>Estimate at urine pH 5.</strong> pH − pKa = 1.5 → ratio A⁻/HA = 10^1.5 ≈ 32:1 → ~3% remains unionised and is reabsorbed.</li>
          <li><strong>Estimate at urine pH 8.</strong> pH − pKa = 4.5 → ratio ≈ 31,600:1 → unionised fraction ≈ 0.003%. Reabsorption falls by ~1,000-fold.</li>
          <li><strong>Apply ion trapping.</strong> Ionised salicylate cannot cross the tubular membrane → trapped in urine → excreted. Net effect: 10–20× ↑ in renal clearance.</li>
          <li><strong>Treat.</strong> 1.5 L of 1.26% NaHCO₃ (or 225 mL of 8.4% diluted) over 2 h, then titrate. Add KCl to maintain serum K⁺ &gt; 4.0 — alkalosis worsens hypokalaemia AND hypokalaemia stops urinary alkalinisation working (the H⁺/K⁺ exchanger keeps reabsorbing H⁺).</li>
          <li><strong>Monitor.</strong> Hourly urinary pH (target <strong>7.5–8.5</strong>), serum K⁺, ABG, salicylate level every 2 h.</li>
        </ol>
        <p className="font-semibold text-foreground mt-2">Decision points for haemodialysis</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Salicylate &gt; 700 mg/L (acute) or &gt; 500 mg/L (chronic).</li>
          <li>Severe acidosis (pH &lt; 7.2), AKI, pulmonary/cerebral oedema, altered mental state, or refractory to alkalinisation.</li>
        </ul>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Failing to replace K⁺ — without it the urine never alkalinises despite IV bicarbonate.</li>
            <li>Intubating a salicylate overdose without high minute ventilation — sudden ↓ respiratory drive lets PaCO₂ rise, pH crashes, salicylate enters CNS.</li>
            <li>Using the BASE form of Henderson-Hasselbalch for salicylate — gives the inverse (wrong) answer.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Sodium bicarbonate raises urinary pH to trap ionised salicylate in the tubule. Target urinary pH 7.5–8.5, monitoring serum K⁺ (replacement essential — alkalosis worsens hypokalaemia and hypokalaemia stops urinary alkalinisation working). Haemodialysis is indicated for severe toxicity (level > 700 mg/L, neurology, renal failure, refractory acidosis).",
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
        objectives: [
          "RCoA 2021 Curriculum — Physics & Clinical Measurement / Pharmacology (Primary)",
          "Pinnock C, Lin T, Smith T. Fundamentals of Anaesthesia, 4th ed (Cambridge UP) — acid-base chapter",
          "Cross M, Plunkett E. Physics, Pharmacology and Physiology for Anaesthetists, 2nd ed (Cambridge UP, 2014)",
        ],
        workedExamples: [
          "Becker DE, Reed KL. Local anesthetics: review of pharmacological considerations. Anesth Prog 2012;59:90-102 — pKa, ionisation, infected tissue",
          "Catterall WA, Mackie K. Local anesthetics. In: Goodman & Gilman's, 13th ed — Henderson-Hasselbalch applied to LA",
          "Proudfoot AT, Krenzelok EP, Vale JA. Position paper on urine alkalinization. J Toxicol Clin Toxicol 2004;42:1-26 — salicylate ion trapping",
          "TOXBASE / NPIS — Salicylate poisoning monograph (current edition)",
        ],
        keyPoints: [
          "Story DA. Bench-to-bedside review: a brief history of clinical acid-base. Crit Care 2004;8:253-8 — bicarbonate buffer system",
          "Stewart PA. Modern quantitative acid-base chemistry. Can J Physiol Pharmacol 1983;61:1444-61 — strong ion difference",
          "Siggaard-Andersen O. The Acid-Base Status of the Blood (Copenhagen, 1974) — buffer base concept",
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
