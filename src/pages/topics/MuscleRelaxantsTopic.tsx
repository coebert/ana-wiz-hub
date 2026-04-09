import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { QuizSection } from "@/components/QuizSection";
import { muscleRelaxantsQuiz } from "@/data/quizzes";
import MuscleRelaxantStructures from "@/components/diagrams/MuscleRelaxantStructures";
import { NMBAMechanismDiagram } from "@/components/diagrams/NMBAMechanismDiagram";
import { TOFPatternDiagram } from "@/components/diagrams/TOFPatternDiagram";
import { ReferencesList } from "@/components/ReferencesList";

const MuscleRelaxantsTopic = () => {
  return (
    <SectionLayout
      title="Neuromuscular Blocking Agents"
      subtitle="FRCA Primary — Pharmacology"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
    >
      <div className="prose prose-slate max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
          <p className="text-foreground/90 leading-relaxed">
            Neuromuscular blocking agents (NMBAs) produce skeletal muscle relaxation for tracheal intubation and surgical access.
            Understanding the distinction between depolarising and non-depolarising agents, their pharmacology, monitoring, and
            reversal is fundamental to safe anaesthetic practice.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">NMJ Mechanism & Drug Action</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Explore how different neuromuscular blocking agents interact with the nicotinic acetylcholine receptor
            at the motor end plate. Switch between scenarios to see normal transmission, non-depolarising block,
            depolarising block (suxamethonium), and neostigmine reversal.
          </p>
          <div className="bg-card rounded-xl border border-border p-6">
            <NMBAMechanismDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Suxamethonium (Succinylcholine)</h2>
          <p className="text-foreground/90 leading-relaxed">
            The only depolarising NMBA in clinical use. Structurally two ACh molecules joined end-to-end. Dose 1–1.5 mg/kg IV.
            Onset 30–60 s (fastest of all NMBAs). Duration 5–10 min. Metabolised by plasma cholinesterase (butyrylcholinesterase).
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Phase I block</strong> (depolarising): initial fasciculations, sustained depolarisation → desensitisation.
            No fade on TOF, no post-tetanic potentiation. <strong>Phase II block</strong>: with repeated/prolonged dosing,
            characteristics resemble non-depolarising block (fade, PTP).
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Side Effects & Contraindications</p>
            <p className="text-sm text-muted-foreground mt-1">
              <strong>Hyperkalaemia</strong> (~0.5 mmol/L rise normally; massive release with burns &gt;24h, denervation injuries,
              muscular dystrophies, prolonged immobilisation). <strong>Bradycardia</strong> (muscarinic — especially with repeat
              doses). <strong>Raised IOP, ICP, intragastric pressure</strong>. <strong>Malignant hyperthermia trigger</strong>.
              <strong> Anaphylaxis</strong> (most common NMBA trigger). Masseter spasm. Myalgia.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Non-Depolarising Agents</h2>
          <p className="text-foreground/90 leading-relaxed">
            Competitive antagonists at postjunctional nAChR α subunits. Two structural classes:
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Aminosteroids</strong> (pancuronium, vecuronium, rocuronium): hepatic metabolism/biliary excretion. Rocuronium
            onset 60–90 s at 0.6 mg/kg, or 45 s at 1.2 mg/kg (modified RSI dose). Pancuronium: vagolytic (tachycardia), long
            duration 60–90 min. Vecuronium: intermediate duration, minimal CVS effects.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Benzylisoquinoliniums</strong> (atracurium, cisatracurium, mivacurium): Hofmann degradation (atracurium,
            cisatracurium — organ-independent), ester hydrolysis (mivacurium — plasma cholinesterase). Cisatracurium: ~4-5× potency of atracurium (ED₉₅ 0.05 vs 0.25 mg/kg), no histamine release, purely Hofmann elimination. Atracurium: histamine
            release at high doses. Cisatracurium: 3× potency, no histamine release, purely Hofmann elimination.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Comparative Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 text-foreground">Agent</th>
                  <th className="text-left p-2 text-foreground">ED₉₅ (mg/kg)</th>
                  <th className="text-left p-2 text-foreground">Onset</th>
                  <th className="text-left p-2 text-foreground">Duration</th>
                  <th className="text-left p-2 text-foreground">Elimination</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Suxamethonium", "0.3", "30-60 s", "5-10 min", "Plasma ChE"],
                  ["Rocuronium", "0.3", "60-90 s", "30-40 min", "Hepatic/biliary"],
                  ["Vecuronium", "0.05", "2-3 min", "25-35 min", "Hepatic/biliary"],
                  ["Atracurium", "0.25", "2-3 min", "25-35 min", "Hofmann + ester"],
                  ["Cisatracurium", "0.05", "3-5 min", "35-45 min", "Hofmann"],
                  ["Pancuronium", "0.07", "3-5 min", "60-90 min", "Renal (40%)"],
                  ["Mivacurium", "0.08", "2-3 min", "12-18 min", "Plasma ChE"],
                ].map(([agent, ed95, onset, duration, elim]) => (
                  <tr key={agent} className="border-b border-border/50">
                    <td className="p-2 text-foreground font-medium">{agent}</td>
                    <td className="p-2 text-muted-foreground">{ed95}</td>
                    <td className="p-2 text-muted-foreground">{onset}</td>
                    <td className="p-2 text-muted-foreground">{duration}</td>
                    <td className="p-2 text-muted-foreground">{elim}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Reversal Agents</h2>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Neostigmine</strong>: anticholinesterase — increases ACh at NMJ to compete with NDMR. Must be given with
            glycopyrrolate or atropine (to block muscarinic effects: bradycardia, salivation, bronchospasm). Ceiling effect —
            cannot reverse deep block (TOF count &lt;2). Dose 50 µg/kg.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Sugammadex</strong>: modified γ-cyclodextrin. Encapsulates rocuronium (and to lesser extent vecuronium) in
            a 1:1 complex, rendering it inactive. Can reverse profound block. Dose: 2 mg/kg (moderate block, TOF ≥2), 4 mg/kg
            (deep block, PTC ≥1), 16 mg/kg (immediate reversal — "can't intubate, can't oxygenate" rescue).
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Sugammadex Considerations</p>
            <p className="text-sm text-muted-foreground mt-1">
              Binds oral contraceptive steroids → advise additional contraception for 7 days. Allergic reactions (rare but
              reported). Does not reverse suxamethonium or benzylisoquinoliniums. May interfere with some coagulation assays.
              Rocuronium + sugammadex has been proposed as an alternative to suxamethonium for RSI.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Neuromuscular Monitoring</h2>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Train-of-four (TOF)</strong>: 4 stimuli at 2 Hz. TOF ratio = T4/T1. Ratio &lt;0.9 = clinically significant
            residual blockade. <strong>Post-tetanic count (PTC)</strong>: for deep block (TOF count 0). <strong>Double burst
            stimulation (DBS)</strong>: fade easier to detect manually than TOF. Quantitative monitoring (acceleromyography,
            kinemyography) is recommended over qualitative assessment.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">TOF Patterns: Depolarising vs Non-Depolarising</h2>
          <p className="text-foreground/90 leading-relaxed mb-4">
            Compare the animated train-of-four response across different block types. Note the key distinguishing
            feature: fade is present in non-depolarising block but absent in Phase I depolarising block.
          </p>
          <div className="bg-card rounded-xl border border-border p-6">
            <TOFPatternDiagram />
          </div>
        </section>
      </div>

      <KeyLearningPoints points={[
        "Suxamethonium: only depolarising agent. Fastest onset. Metabolised by plasma ChE. Risk of hyperkalaemia, MH trigger.",
        "Non-depolarising agents: competitive antagonists at nAChR α subunits. Aminosteroids vs benzylisoquinoliniums.",
        "Cisatracurium: organ-independent Hofmann elimination. Ideal for renal/hepatic impairment. No histamine release.",
        "Neostigmine: anticholinesterase reversal. Requires antimuscarinic co-administration. Cannot reverse deep block.",
        "Sugammadex: encapsulates rocuronium/vecuronium. Can reverse profound block. 16 mg/kg for emergency reversal.",
        "TOF ratio <0.9 = residual blockade. Quantitative neuromuscular monitoring is the standard of care."
      ]} />

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Molecular Structures</h2>
          <MuscleRelaxantStructures />
        </div>

        <QuizSection questions={muscleRelaxantsQuiz} />
      <ReferencesList topicId="muscle-relaxants" />

      <TopicCompletionToggle topicId="muscle-relaxants" topicTitle="Neuromuscular Blocking Agents" />
    </SectionLayout>
  );
};

export default MuscleRelaxantsTopic;
