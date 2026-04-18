import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { renalPhysiologyQuiz } from "@/data/quizzes";
import { NephronDiagram } from "@/components/diagrams/NephronDiagram";
import { TubularCellDiagram } from "@/components/diagrams/TubularCellDiagram";
import { CountercurrentMultiplierDiagram } from "@/components/diagrams/CountercurrentMultiplierDiagram";
import { GlomerularBarrierDiagram } from "@/components/diagrams/GlomerularBarrierDiagram";
import { JGADiagram } from "@/components/diagrams/JGADiagram";
import { RAASCascadeDiagram } from "@/components/diagrams/RAASCascadeDiagram";
import { CorticalJuxtamedullaryDiagram } from "@/components/diagrams/CorticalJuxtamedullaryDiagram";
import { RenalBloodFlowDiagram } from "@/components/diagrams/RenalBloodFlowDiagram";
import { UrineConcentrationSimulator } from "@/components/diagrams/UrineConcentrationSimulator";
import HyponatraemiaWorkupDiagram from "@/components/diagrams/HyponatraemiaWorkupDiagram";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const RenalPhysiologyTopic = () => {
  return (
    <SectionLayout
      title="Renal Physiology"
      subtitle="FRCA Primary — Physiology"
      backPath="/physiology"
      backLabel="Physiology"
      accentColor="text-physiology"
    >
      <div className="prose prose-slate max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
          <p className="text-foreground/90 leading-relaxed">
            The kidneys receive 20–25% of cardiac output and are responsible for filtration, selective reabsorption, secretion,
            acid-base homeostasis, and endocrine functions. Understanding renal physiology is essential for managing fluid
            balance, electrolytes, and drug excretion in the perioperative period.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Nephron Segments</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Explore the functional segments of the nephron and the transport processes occurring in each.
          </p>
          <div className="bg-card rounded-xl border border-border p-6">
            <NephronDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Cortical vs Juxtamedullary Nephrons</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Two functionally distinct populations of nephrons exist. Compare their anatomy, post-glomerular vasculature,
            and roles — toggle the feature pills to highlight differences side-by-side.
          </p>
          <div className="bg-card rounded-xl border border-border p-6">
            <CorticalJuxtamedullaryDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Renal Blood Flow Distribution</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            The kidneys receive ~20% of cardiac output (≈1100 ml/min) but distribute it very unevenly: the cortex
            receives ~90%, the medulla only 5–10%. This protects the corticomedullary osmotic gradient but leaves
            the outer medulla vulnerable to ischaemia. Switch between scenarios to see how shock, contrast, and
            NSAIDs/ACEi precipitate ATN.
          </p>
          <div className="bg-card rounded-xl border border-border p-6">
            <RenalBloodFlowDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Glomerular Filtration</h2>
          <p className="text-foreground/90 leading-relaxed">
            GFR ≈ 125 ml/min (180 L/day). The glomerular filtration barrier consists of fenestrated endothelium, basement
            membrane, and podocyte slit diaphragms. Filtration depends on <strong>Starling forces</strong>: net filtration
            pressure = (Pgc − Pbc) − (πgc − πbc) ≈ (50 − 10) − (25 − 0) = 15 mmHg.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            GFR is maintained by <strong>autoregulation</strong> (myogenic response + tubuloglomerular feedback via
            macula densa) over MAP 80–180 mmHg. Below MAP 80, GFR falls linearly. Autoregulation is impaired by NSAIDs
            (block afferent arteriolar prostaglandin-mediated vasodilation) and ACE inhibitors (block efferent constriction).
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Juxtaglomerular Apparatus & TGF</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            The juxtaglomerular apparatus (JGA) is the anatomical basis of tubuloglomerular feedback (TGF) and renin
            release. Explore its components and the signalling cascades that stabilise single-nephron GFR.
          </p>
          <div className="bg-card rounded-xl border border-border p-6">
            <JGADiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Glomerular Filtration Barrier</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Explore the three-layer filtration barrier in cross-section. Animated particles show how small solutes
            pass freely while albumin and larger proteins are retained by size and charge selectivity.
          </p>
          <div className="bg-card rounded-xl border border-border p-6">
            <GlomerularBarrierDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Tubular Cell Transport</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Explore the individual tubular cell types, their apical and basolateral transporters, and the animated flow
            of molecules through pumps, channels, cotransporters, and exchangers. Each cell diagram shows the driving
            force (Na⁺/K⁺-ATPase) and key drug targets.
          </p>
          <div className="bg-card rounded-xl border border-border p-6">
            <TubularCellDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Tubular Function Summary</h2>
          <p className="text-foreground/90 leading-relaxed">
            <strong>PCT</strong>: reabsorbs 65–70% of filtered Na⁺, water, glucose, amino acids, HCO₃⁻. Na⁺/K⁺-ATPase on
            basolateral membrane drives all transport. Glucose is reabsorbed by SGLT2 (Tm ≈ 375 mg/min).
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Loop of Henle</strong>: descending limb permeable to water, ascending limb impermeable (countercurrent
            multiplier). Thick ascending limb: Na⁺/K⁺/2Cl⁻ cotransporter (NKCC2) — target of loop diuretics.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>DCT</strong>: Na⁺/Cl⁻ cotransporter (NCC) — target of thiazides. <strong>Collecting duct</strong>:
            principal cells (ENaC — aldosterone-sensitive Na⁺ channels); intercalated cells (H⁺-ATPase, H⁺/K⁺-ATPase for
            acid-base). ADH acts on V2 receptors → aquaporin-2 insertion → water reabsorption.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Countercurrent Multiplier</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Step through the countercurrent multiplication process to understand how the loop of Henle generates
            the corticomedullary osmotic gradient (300→1200 mOsm/kg). Press Play or use the step buttons.
          </p>
          <div className="bg-card rounded-xl border border-border p-6">
            <CountercurrentMultiplierDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Urine Concentration & Dilution Simulator</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Slide the ADH level from 0 to 100% to see how tubular fluid osmolality changes through each nephron segment
            — and how final urine osmolality varies between 50 mOsm/kg (water diuresis / DI) and 1200 mOsm/kg
            (maximal antidiuresis / SIADH).
          </p>
          <div className="bg-card rounded-xl border border-border p-6">
            <UrineConcentrationSimulator />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Hyponatraemia Workup Algorithm</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            A structured approach to hyponatraemia (Na⁺ &lt; 135 mmol/L): plasma osmolality → urine osmolality →
            volume status → urine sodium. Click through each step to reach the diagnosis (SIADH, hypovolaemic,
            hypervolaemic, pseudo, primary polydipsia).
          </p>
          <div className="bg-card rounded-xl border border-border p-6">
            <HyponatraemiaWorkupDiagram />
          </div>
        </section>
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Measurement of Renal Function</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            GFR is the best overall index of renal function but cannot be measured directly. Instead, the
            <strong> clearance</strong> of a marker substance is used: <em>Clearance = (U × V) / P</em>, where
            U = urinary concentration, V = urine flow rate, P = plasma concentration. The ideal marker is freely
            filtered, not reabsorbed, not secreted, not metabolised, not protein-bound, and non-toxic. No endogenous
            substance fulfils all criteria perfectly, so each marker carries trade-offs between accuracy, practicality
            and cost.
          </p>
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold text-foreground">Marker</th>
                  <th className="text-left p-3 font-semibold text-foreground">Type</th>
                  <th className="text-left p-3 font-semibold text-foreground">Advantages</th>
                  <th className="text-left p-3 font-semibold text-foreground">Disadvantages</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Inulin</td>
                  <td className="p-3 align-top text-foreground/80">Exogenous polysaccharide (fructose polymer)</td>
                  <td className="p-3 align-top text-foreground/80">Gold standard. Freely filtered, not reabsorbed, not secreted, not metabolised, not protein-bound. True GFR.</td>
                  <td className="p-3 align-top text-foreground/80">Requires continuous IV infusion + timed urine collections + bladder catheterisation. Expensive, impractical clinically — research only.</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Creatinine</td>
                  <td className="p-3 align-top text-foreground/80">Endogenous (muscle creatine breakdown)</td>
                  <td className="p-3 align-top text-foreground/80">Cheap, readily available, freely filtered. Steady production in stable patients. Basis of eGFR (CKD-EPI, MDRD).</td>
                  <td className="p-3 align-top text-foreground/80">~10–20% tubular secretion overestimates GFR (worse at low GFR). Affected by muscle mass, age, sex, race, diet (cooked meat), drugs (trimethoprim, cimetidine block secretion). Insensitive — plasma rises only after ~50% GFR loss.</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Cystatin C</td>
                  <td className="p-3 align-top text-foreground/80">Endogenous 13 kDa protein, produced by all nucleated cells</td>
                  <td className="p-3 align-top text-foreground/80">Independent of muscle mass, age, sex. Detects early GFR decline ("creatinine-blind range"). Useful in elderly, children, cirrhosis, amputees.</td>
                  <td className="p-3 align-top text-foreground/80">More expensive. Affected by thyroid dysfunction, steroids, smoking, inflammation, obesity. Reabsorbed and metabolised by PCT (so urinary clearance not usable — plasma only).</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Urea</td>
                  <td className="p-3 align-top text-foreground/80">Endogenous (hepatic protein catabolism)</td>
                  <td className="p-3 align-top text-foreground/80">Cheap, ubiquitous. Useful with creatinine to assess hydration (urea:creatinine ratio &gt; 100:1 suggests pre-renal AKI or GI bleed).</td>
                  <td className="p-3 align-top text-foreground/80">40–50% tubular reabsorption (more in dehydration) underestimates GFR. Affected by protein intake, GI bleeding, catabolism, steroids, liver failure. Poor GFR marker.</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">PAH (para-aminohippurate)</td>
                  <td className="p-3 align-top text-foreground/80">Exogenous organic acid</td>
                  <td className="p-3 align-top text-foreground/80">Almost completely cleared in single pass (filtered + secreted). Measures effective <strong>renal plasma flow</strong> (ERPF ≈ 600 ml/min) → calculate RBF and filtration fraction.</td>
                  <td className="p-3 align-top text-foreground/80">Requires IV infusion + timed urine. Extraction ratio falls at high plasma levels and in renal disease. Research / physiology lab use only.</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground"><sup>51</sup>Cr-EDTA / <sup>99m</sup>Tc-DTPA</td>
                  <td className="p-3 align-top text-foreground/80">Exogenous radiolabelled chelates</td>
                  <td className="p-3 align-top text-foreground/80">Accurate measured GFR from plasma disappearance curve — no urine collection. Reference standard in clinical practice (transplant work-up, chemotherapy dosing, living donor assessment).</td>
                  <td className="p-3 align-top text-foreground/80">Radiation exposure (small). Requires nuclear medicine facility. Slow (3–4 h sampling). EDTA slightly underestimates, DTPA can be protein-bound.</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">Iohexol</td>
                  <td className="p-3 align-top text-foreground/80">Exogenous non-ionic iodinated contrast</td>
                  <td className="p-3 align-top text-foreground/80">Non-radioactive alternative to Cr-EDTA. Accurate measured GFR by plasma clearance. Increasingly used in paediatrics and research.</td>
                  <td className="p-3 align-top text-foreground/80">Risk of contrast nephropathy / anaphylaxis (rare at GFR doses). HPLC or X-ray fluorescence assay needed — not routine.</td>
                </tr>
                <tr>
                  <td className="p-3 align-top font-medium text-foreground">NGAL, KIM-1, IL-18, [TIMP-2]·[IGFBP7]</td>
                  <td className="p-3 align-top text-foreground/80">Tubular injury biomarkers (urine/plasma)</td>
                  <td className="p-3 align-top text-foreground/80">Detect AKI hours before creatinine rises. NephroCheck® ([TIMP-2]·[IGFBP7]) FDA-approved for AKI risk stratification in ICU.</td>
                  <td className="p-3 align-top text-foreground/80">Mark <em>injury</em>, not function — do not measure GFR. Expensive, limited availability, variable cut-offs. Not yet routine outside specialist ICU/cardiac surgery.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-foreground/80 leading-relaxed mt-4 text-sm">
            <strong>Clinical bottom line:</strong> serum creatinine + eGFR (CKD-EPI) is the workhorse; add cystatin C
            when creatinine is unreliable (extremes of muscle mass, cirrhosis, early CKD); use <sup>51</sup>Cr-EDTA or
            iohexol when an accurate measured GFR is required (transplant donor, carboplatin dosing); use injury
            biomarkers (NephroCheck) for early AKI prediction in high-risk perioperative/ICU patients.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Acid-Base Handling</h2>
          <p className="text-foreground/90 leading-relaxed">
            The kidneys regenerate HCO₃⁻ and excrete H⁺. Daily acid load ≈ 1 mmol/kg H⁺. Three mechanisms: (1) HCO₃⁻
            reabsorption in PCT (85%) via carbonic anhydrase. (2) Titratable acid excretion (H₂PO₄⁻). (3) Ammonium (NH₄⁺)
            production and excretion — the most important adaptive mechanism in chronic acidosis.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Renal Endocrine Function</h2>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Renin</strong>: released from juxtaglomerular cells in response to decreased renal perfusion, sympathetic
            stimulation, or decreased Na⁺ at macula densa → activates RAAS. <strong>Erythropoietin</strong>: produced by
            peritubular interstitial cells in response to hypoxia → stimulates erythropoiesis. <strong>1,25(OH)₂ vitamin D₃
            </strong>: 1α-hydroxylation occurs in PCT cells → increases Ca²⁺ absorption from gut.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">RAAS Cascade</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            The renin-angiotensin-aldosterone system is the principal hormonal regulator of blood pressure and
            fluid balance. Explore each component of the cascade and the four major drug intervention points.
          </p>
          <div className="bg-card rounded-xl border border-border p-6">
            <RAASCascadeDiagram />
          </div>
        </section>
      </div>

      <KeyLearningPoints points={[
        "GFR ≈ 125 ml/min. Autoregulation maintains GFR over MAP 80–180 mmHg (myogenic + TGF).",
        "PCT reabsorbs 65-70% of filtered Na⁺, all glucose (SGLT2, Tm 375 mg/min), and 85% of HCO₃⁻.",
        "Loop of Henle: NKCC2 in thick ascending limb — target of furosemide. Countercurrent multiplier creates medullary gradient.",
        "ADH acts on V2 receptors → aquaporin-2 insertion in collecting duct → water reabsorption.",
        "Renal acid excretion: HCO₃⁻ reabsorption (PCT), titratable acid (HPO₄²⁻), NH₄⁺ (most important adaptive mechanism).",
        "Renal endocrine: renin (RAAS), erythropoietin (hypoxia response), 1,25(OH)₂D₃ (calcium homeostasis)."
      ]} />
      <QuizSection questions={renalPhysiologyQuiz} />
      <ReferencesList topicId="renal-physiology" />

      <SeeAlso topicId="renal-physiology" />
        <TopicCompletionToggle topicId="renal-physiology" topicTitle="Renal Physiology" />
    </SectionLayout>
  );
};

export default RenalPhysiologyTopic;
