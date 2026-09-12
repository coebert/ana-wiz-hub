import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";

const acidsBasesBuffersFaqs: Array<[string, string]> = [
  ["What defines a buffer's effective range?", "A buffer works best within ±1 pH unit of its pKa, where the Henderson–Hasselbalch ratio of weak acid to conjugate base lies between 10:1 and 1:10. The bicarbonate system (pKa 6.1) effectively buffers blood at pH 7.4 only because it is open — CO₂ is continuously removed by ventilation, regenerating capacity and uncoupling it from the closed-system pKa limit."],
  ["How is base excess calculated and what does it mean?", "Base excess is the amount of strong acid or base required to titrate 1 L of blood back to pH 7.40 at PaCO₂ 5.3 kPa, 37 °C and full oxygenation. Values outside ±2 mmol/L indicate a metabolic disturbance — positive in metabolic alkalosis or compensation for chronic respiratory acidosis, negative in metabolic acidosis or compensation for chronic respiratory alkalosis."],
  ["Why does CO₂ acidify blood despite not being an acid?", "CO₂ reacts with water (carbonic anhydrase in red cells) to form H₂CO₃, which dissociates to H⁺ and HCO₃⁻. A rise in PaCO₂ pushes the equilibrium right, generating H⁺ and lowering pH — the basis of respiratory acidosis. Hyperventilation does the reverse and rapidly raises pH."],
];
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { AcidsBasesDiagram } from "@/components/diagrams/chemistry/AcidsBasesDiagram";
import { InlineRef } from "@/components/references/InlineRef";
import { acidsBasesQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

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
    cites: ["Peck & Hill Ch.2"],
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
    cites: ["BJA Educ 2009"],
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
        objectives: { exams: [Exam.PRIMARY], curriculumCodes: ["RCoA Primary — Physics & Clinical Measurement", "RCoA Primary — Pharmacology"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: [
          "BJA Educ 2009",
          "Peck & Hill Ch.2",
          "Cross & Plunkett Ch.3",
        ],
        workedExamples: [
          "BJA Educ 2009",
          "Peck & Hill Ch.2",
          "BJA Educ 2009",
          "BJA Educ 2009",
        ],
        keyPoints: [
          "Peck & Hill Ch.2",
          "Stewart 1983",
          "Cross & Plunkett Ch.3",
        
          "BJA Educ 2009",
        ],
      }}
      keyPoints={[
        { text: "pH = −log₁₀[H⁺]; each pH unit = 10-fold change in [H⁺]", cites: ["Stewart 1983"] },
        { text: "Normal blood pH 7.35–7.45 ([H⁺] 35–45 nmol/L). Compatible range ~6.8–7.8", cites: ["Cross & Plunkett Ch.3"] },
        { text: "Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA]). When pH = pKa → 50% ionised", cites: ["Peck & Hill Ch.2"] },
        { text: "Only unionised drug crosses lipid membranes — basis of ion trapping and drug absorption", cites: ["BJA Educ 2009"] },
        { text: "Bicarbonate buffer is the most important ECF buffer (open system — CO₂ exhaled by lungs)", cites: ["Stewart 1983"] },
        { text: "Haemoglobin provides ~35% of total body buffering; deoxyHb is a better buffer (Haldane effect)", cites: ["Cross & Plunkett Ch.3"] },
        { text: "Buffer systems work best within ±1 pH unit of their pKa", cites: ["Peck & Hill Ch.2"] },
        { text: "Strong acids fully dissociate (HCl); weak acids partially dissociate (H₂CO₃) — only weak acids buffer", cites: ["BJA Educ 2009"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="foundations" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Foundations of Acid-Base Chemistry" defaultOpen>
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="diagram" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Interactive Diagram">
            <AcidsBasesDiagram />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="henderson-hasselbalch" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["RCoA Primary — Pharmacology"]}>
            <CollapsibleSubsection title="The Henderson-Hasselbalch Equation in Practice">
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
            </CollapsibleSubsection>

            <CollapsibleSubsection title="Buffer Capacity and Titration Curves">
            <div className="text-muted-foreground space-y-3 leading-relaxed">
              <p>
                A buffer's ability to resist pH change — its <strong>buffer capacity</strong> — is not constant across the whole
                titration curve. It is greatest when <strong>pH = pKa</strong>, because at that point [A⁻] = [HA]: equal
                concentrations of weak acid and conjugate base are present, so the system can mop up an added strong acid
                (converting A⁻ → HA) or an added strong base (converting HA → A⁻) with almost equal ease. Moving away from the
                pKa in either direction leaves one species in short supply, so the same amount of added acid or base produces a
                much bigger swing in pH.
              </p>
              <svg viewBox="0 0 400 220" className="w-full h-auto" role="img" aria-label="Titration curve of a weak acid showing pH versus volume of strong base added, with the flat buffering region centred on the pKa">
                <rect x="55" y="105" width="290" height="70" fill="hsl(160 55% 45% / 0.15)" />
                <text x="200" y="118" textAnchor="middle" className="fill-muted-foreground" fontSize="9">flat buffering region (pKa ± 1, ratio 10:1 to 1:10)</text>
                <line x1="55" y1="190" x2="55" y2="20" stroke="currentColor" strokeWidth="1.5" />
                <line x1="55" y1="190" x2="360" y2="190" stroke="currentColor" strokeWidth="1.5" />
                <text x="12" y="105" className="fill-muted-foreground" fontSize="10">pH</text>
                <text x="200" y="210" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Volume of strong base added</text>
                <path d="M 60 178 C 90 176, 120 165, 150 140 C 175 120, 190 110, 200 105 C 210 110, 225 120, 250 140 C 280 165, 310 176, 340 25"
                  fill="none" stroke="hsl(160 55% 35%)" strokeWidth="2.5" />
                <line x1="200" y1="105" x2="200" y2="190" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="55" y1="140" x2="200" y2="140" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
                <circle cx="200" cy="140" r="3.5" fill="hsl(160 55% 35%)" />
                <text x="205" y="135" fontSize="10" fontWeight="600" className="fill-foreground">pKa (midpoint, 50% ionised)</text>
                <text x="65" y="55" fontSize="9" className="fill-muted-foreground">steep — buffer exhausted (mostly A⁻)</text>
                <text x="65" y="185" fontSize="9" className="fill-muted-foreground" transform="translate(0,0)">steep — buffer exhausted (mostly HA)</text>
              </svg>
              <p>
                Within roughly ±1 pH unit of the pKa the curve is nearly flat — this is the <strong>useful buffering range</strong>,
                corresponding to a ratio of conjugate base to acid between 10:1 and 1:10. Beyond this range one component is
                nearly used up, so the curve steepens sharply and small further additions of acid or base cause large pH swings —
                the buffer is said to be <strong>exhausted</strong>. Buffer capacity therefore depends on two things: how close the
                system's pKa is to the prevailing pH, and the <strong>total concentration</strong> of buffer pair present — a more
                concentrated buffer (more HA + A⁻ in absolute terms) can absorb a larger amount of acid or base before the same
                pH change occurs, even though the shape of the curve is unchanged. <InlineRef topicId="acids-bases-buffers" refLabel="Peck & Hill Ch.2" />
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="buffer-systems" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Buffer Systems">
            <div className="text-muted-foreground space-y-3 leading-relaxed">
              <p>
                The body relies on several buffer systems working in parallel: bicarbonate/carbonic acid (the dominant ECF
                buffer, made effective by being an <strong>open system</strong> — CO₂ generated is exhaled by the lungs),
                phosphate (important intracellularly and in urine), plasma proteins, and haemoglobin.
              </p>
              <p>
                <strong>Haemoglobin</strong> accounts for roughly <strong>35% of total body buffering capacity</strong>, chiefly
                through the imidazole side chains of histidine residues, which have a pKa close to physiological pH. Deoxygenated
                haemoglobin is a <strong>weaker acid (better proton acceptor)</strong> than oxyhaemoglobin, because removing O₂
                changes the protein's conformation (T-state) and lowers the pKa-relevant histidine environment, allowing it to
                bind H⁺ more readily.
              </p>
              <p>
                <strong>Bohr effect:</strong> at the tissues, raised PCO₂ and the resulting increase in [H⁺] shift the
                oxyhaemoglobin dissociation curve to the <strong>right</strong>, reducing Hb's affinity for O₂ and favouring O₂
                unloading where it is needed. <strong>Haldane effect:</strong> the reverse coupling — as haemoglobin gives up O₂
                at the tissues, it becomes better able to carry CO₂, both as carbamino compounds (bound to deoxygenated globin
                amino groups) and by buffering the H⁺ generated from carbonic acid dissociation. The Haldane effect accounts for
                a substantial proportion (often quoted as roughly half) of the CO₂ released from venous blood at the lungs.
              </p>
              <p>
                This coupling underlies <strong>isohydric carriage</strong>: as CO₂ enters red cells and is hydrated to H₂CO₃ →
                H⁺ + HCO₃⁻, the H⁺ produced is immediately buffered by the newly deoxygenated haemoglobin (which is simultaneously
                releasing its O₂ to the tissues). Because of this near-instantaneous buffering, mixed venous blood picks up a
                large CO₂ load yet its pH falls by only around <strong>0.03 units</strong> compared with arterial blood.
                <InlineRef topicId="acids-bases-buffers" refLabel="Cross & Plunkett Ch.3" />
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="stewart-model" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Stewart's Quantitative Acid-Base Model">
            <div className="text-muted-foreground space-y-3 leading-relaxed">
              <p>
                Stewart's approach reframes acid-base balance around three <strong>independent variables</strong> that determine
                [H⁺] and [HCO₃⁻] in plasma: the <strong>strong ion difference (SID)</strong>, <strong>PCO₂</strong>, and
                <strong> ATOT</strong> (the total concentration of non-volatile weak acids, principally albumin and phosphate).
                [H⁺] and [HCO₃⁻] are treated as <strong>dependent</strong> variables — they cannot be changed directly, only as a
                consequence of changes in SID, PCO₂ or ATOT, constrained by electroneutrality and the dissociation of water.
                <InlineRef topicId="acids-bases-buffers" refLabel="Stewart 1983" />
              </p>
              <p>
                <strong>Apparent SID (SIDa)</strong> = ([Na⁺] + [K⁺] + [Ca²⁺] + [Mg²⁺]) − ([Cl⁻] + [lactate⁻]), normally around
                <strong> 40–42 mEq/L</strong>. A fall in SID (relative excess of strong anions over cations) drives water
                dissociation to increase [H⁺] and cause acidosis; a rise in SID causes alkalosis — entirely independent of
                bicarbonate itself, which is simply a dependent marker.
              </p>
              <p>
                <strong>Effective SID (SIDe)</strong> is calculated instead from measured PCO₂, pH and ATOT (accounting for the
                buffering effect of albumin and phosphate). The difference between SIDa and SIDe is the
                <strong> strong ion gap (SIG)</strong>, which represents unmeasured anions (e.g. ketoacids, sulphates, or
                unidentified anions in critical illness) not captured by the standard anion gap.
              </p>
              <p>
                The model explains phenomena that are awkward to rationalise with Henderson-Hasselbalch alone:
                <strong> 0.9% saline-induced hyperchloraemic acidosis</strong> — normal saline has a SID of 0 (equal Na⁺ and Cl⁻),
                so large-volume infusion lowers plasma SID and causes acidosis; <strong>dilutional acidosis</strong> from any
                SID-neutral fluid diluting the buffer base; and <strong>hypoalbuminaemic alkalosis</strong>, where a fall in ATOT
                (less weak acid) causes a mild alkalosis, often masked in critically ill patients whose SIG-driven unmeasured
                anions are simultaneously pushing towards acidosis.
              </p>
              <p>
                Compared with the traditional Henderson-Hasselbalch/base excess approach, Stewart's model gives a more complete,
                mechanistic account of quantitatively complex derangements (e.g. mixed disorders in sepsis or after large-volume
                resuscitation), but its practical criticism is that the underlying algebra is <strong>cumbersome for bedside
                use</strong>, and simplified derivatives (corrected anion gap, base excess) usually give equivalent clinical
                conclusions with far less calculation.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <TopicFaqs faqs={acidsBasesBuffersFaqs} />
        </>
      }
    />
  );
};

export default AcidsBasesBuffersTopic;
