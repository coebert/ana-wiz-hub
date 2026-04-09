import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { renalPhysiologyQuiz } from "@/data/quizzes";
import { NephronDiagram } from "@/components/diagrams/NephronDiagram";
import { TubularCellDiagram } from "@/components/diagrams/TubularCellDiagram";
import { CountercurrentMultiplierDiagram } from "@/components/diagrams/CountercurrentMultiplierDiagram";
import { ReferencesList } from "@/components/ReferencesList";

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

      <TopicCompletionToggle topicId="renal-physiology" topicTitle="Renal Physiology" />
    </SectionLayout>
  );
};

export default RenalPhysiologyTopic;
