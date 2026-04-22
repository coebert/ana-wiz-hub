import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { NMJDiagram } from "@/components/diagrams/NMJDiagram";
import NeuromuscularMonitoringDiagram from "@/components/diagrams/NeuromuscularMonitoringDiagram";
import { neuromuscularQuiz } from "@/data/quizzes";

const objectives = [
  "Describe the sequence of events at the neuromuscular junction from action potential arrival to ACh hydrolysis.",
  "Identify the subunit composition of adult, fetal/extrajunctional, and pre-junctional nicotinic receptors.",
  "Explain the safety margin of NM transmission and its relevance to TOF monitoring.",
  "Predict altered sensitivity to neuromuscular blocking agents in myasthenia, Lambert–Eaton, burns, and ICU immobility.",
  "Recognise pharmacological and pathological causes of NM transmission failure in the perioperative period.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Suxamethonium hyperkalaemia in a burns patient",
    scenario: (
      <>
        A 35-year-old man is admitted to the burns unit 5 days after a 40% TBSA flame injury. He requires
        emergency theatre for debridement. The trainee asks about RSI agents — would suxamethonium be safe?
      </>
    ),
    working: (
      <>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Major burns (and denervation, prolonged immobility, sepsis, stroke) trigger up-regulation of
            <strong> extrajunctional fetal-type nAChRs (α₂βδγ)</strong> across the entire muscle membrane —
            not just the end-plate.
          </li>
          <li>
            The γ subunit prolongs channel open time and lowers conductance — but the receptors are
            massively more numerous, so depolarisation by suxamethonium opens vast numbers of channels
            simultaneously.
          </li>
          <li>
            Each open channel allows K⁺ efflux → potassium release can be 2–5× the normal 0.5 mmol/L rise,
            triggering hyperkalaemic cardiac arrest.
          </li>
          <li>Risk window: from ~24–48 h post-injury until full healing/rehabilitation (months).</li>
        </ul>
      </>
    ),
    answer: (
      <>
        Avoid suxamethonium beyond 24 h post-burn. Use rocuronium 1.2 mg/kg with sugammadex available, or a
        modified RSI with high-dose rocuronium for rapid intubation. Same caution applies to denervation
        injury, prolonged ICU stay (&gt;1 week), and Guillain–Barré.
      </>
    ),
  },
  {
    title: "Interpreting train-of-four fade",
    scenario: (
      <>
        At end of surgery the TOF count is 4 with TOFR 0.4. What proportion of receptors is still occupied,
        and what is the appropriate reversal strategy with rocuronium-induced block?
      </>
    ),
    working: (
      <>
        <ul className="list-disc list-inside space-y-1">
          <li>
            The NMJ has ~70% safety margin — clinical weakness only emerges when receptor occupancy exceeds
            ~75%. TOFR 0.4 corresponds to ~70–80% receptor occupancy.
          </li>
          <li>
            Fade reflects pre-junctional α₃β₂ block — non-depolarisers block positive feedback that
            normally mobilises ACh during repetitive stimulation.
          </li>
          <li>
            Neostigmine works only when TOFR ≥ 0.4 (≥2 twitches reliably present). Sugammadex encapsulates
            steroidal NMBAs and reverses any depth: 2 mg/kg if TOFR ≥ 0.2, 4 mg/kg for deep block, 16 mg/kg
            for immediate rescue after rocuronium 1.2 mg/kg.
          </li>
        </ul>
      </>
    ),
    answer: (
      <>
        Sugammadex 2 mg/kg is the cleanest option — predictable, complete reversal within ~2 min. Aim for
        TOFR &gt; 0.9 before extubation; residual block (TOFR 0.7–0.9) increases postoperative pulmonary
        complications, hypoxaemia, and aspiration risk.
      </>
    ),
  },
];

const NeuromuscularTopic = () => {
  return (
    <TopicTemplate
      title="Neuromuscular Transmission"
      subtitle="FRCA Primary — Physiology"
      backPath="/physiology"
      backLabel="Physiology"
      accentColor="text-physiology"
      topicId="neuromuscular"
      topicTitle="Neuromuscular Transmission"
      quizQuestions={neuromuscularQuiz}
      objectives={objectives}
      workedExamples={workedExamples}
      sectionExamMapping={{
        objectives: { exams: ["primary", "final"], curriculumCodes: ["NA_BK_03"] },
        diagrams: { exams: ["primary", "final"] },
        workedExamples: { exams: ["primary", "final", "fficm"], curriculumCodes: ["NA_BK_03", "OA_BK_03"] },
        keyPoints: { exams: ["primary", "final"] },
      }}
      sectionSources={{
        objectives: ["Martyn BJA Educ 2020", "Peck & Hill"],
        workedExamples: ["AAGBI NMB Guidelines 2021", "BJA Educ 2020"],
        keyPoints: ["Martyn BJA Educ 2020"],
      }}
      diagrams={
        <>
          <div className="bg-card rounded-xl border border-border p-4 md:p-6">
            <NMJDiagram />
          </div>
          <NeuromuscularMonitoringDiagram />
        </>
      }
      keyPoints={[
        "Adult nAChR subunit composition is α₂βδε; fetal/extrajunctional receptors contain γ instead of ε.",
        "Two ACh molecules must bind (one per α subunit) to open the nAChR channel.",
        "AChE rapidly hydrolyses ACh to choline + acetate; choline is recycled via active reuptake.",
        "The safety margin means ~75% receptor occupancy before fade appears, ~80% before single twitch depression, >90% for complete block.",
        "Pre-junctional nAChRs (α₃β₂) mediate positive feedback — their block by non-depolarising agents explains train-of-four fade.",
        "Extrajunctional receptor upregulation (burns, denervation, ICU immobility) causes suxamethonium-induced hyperkalaemia.",
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={["primary", "final"]} curriculumCodes={["NA_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
            <p className="text-foreground/90 leading-relaxed">
              Neuromuscular transmission is the process by which a motor nerve impulse is converted into
              muscle contraction at the neuromuscular junction (NMJ). Understanding this process is
              essential for anaesthetists, as it underpins the pharmacology of neuromuscular blocking
              agents, their reversal, and neuromuscular monitoring.
            </p>
          </ExamSection>

          <ExamSection id="sequence" exams={["primary", "final"]} curriculumCodes={["NA_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Sequence of Events</h2>
            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">1. Action Potential Arrival</h3>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  A motor nerve action potential propagates along the myelinated axon to the nerve terminal.
                  The terminal is unmyelinated and contains ~300,000 vesicles, each containing approximately
                  5,000–10,000 molecules of acetylcholine (ACh).
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">2. Calcium Influx</h3>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  Depolarisation of the nerve terminal opens voltage-gated calcium channels (P/Q-type). Ca²⁺
                  influx is essential for vesicle fusion — blocking these channels (e.g., Lambert–Eaton
                  syndrome, aminoglycosides) impairs neuromuscular transmission.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">3. Vesicle Fusion & ACh Release</h3>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  Ca²⁺ triggers the SNARE protein complex (synaptobrevin, SNAP-25, syntaxin) to fuse vesicles
                  with the pre-synaptic membrane (exocytosis). Approximately 200–300 vesicles release their
                  ACh content into the synaptic cleft — far more than needed (safety margin of ~70%).
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">4. ACh Binds Nicotinic Receptors</h3>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  ACh crosses the 50 nm synaptic cleft and binds to nicotinic acetylcholine receptors (nAChR)
                  on the post-synaptic motor end plate. The adult nAChR has the subunit composition{" "}
                  <strong>α₂βδε</strong>. Two ACh molecules must bind (one to each α subunit) to open the
                  channel.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">5. End-Plate Potential</h3>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  Channel opening allows Na⁺ influx (and K⁺ efflux), producing a localised depolarisation —
                  the end-plate potential (EPP). If the EPP exceeds threshold (~−55 mV), it triggers a
                  propagating muscle action potential via adjacent voltage-gated Na⁺ channels, leading to
                  excitation–contraction coupling.
                </p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <h3 className="font-semibold text-foreground">6. ACh Hydrolysis</h3>
                <p className="text-sm text-foreground/80 mt-1 leading-relaxed">
                  Acetylcholinesterase (AChE), concentrated in the synaptic cleft, rapidly hydrolyses ACh to
                  choline and acetate. Choline is actively reuptaken into the nerve terminal for resynthesis
                  of ACh by choline acetyltransferase (ChAT). This rapid termination ensures each nerve
                  impulse produces a single, discrete muscle twitch.
                </p>
              </div>
            </div>
          </ExamSection>

          <ExamSection id="receptors" exams={["primary", "final"]} curriculumCodes={["NA_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Receptor Subtypes at the NMJ</h2>
            <p className="text-foreground/90 leading-relaxed">There are multiple receptor types at the NMJ:</p>
            <ul className="mt-3 space-y-2 text-foreground/80">
              <li>
                <strong>Post-junctional nAChR (α₂βδε)</strong> — the primary target for neuromuscular blocking
                agents. Non-depolarising agents compete with ACh at the α subunits.
              </li>
              <li>
                <strong>Pre-junctional nAChR (α₃β₂)</strong> — facilitate positive feedback, mobilising more
                ACh vesicles during sustained activity (explains fade with non-depolarising block).
              </li>
              <li>
                <strong>Fetal/extrajunctional nAChR (α₂βδγ)</strong> — contain the γ subunit instead of ε.
                They have a longer channel open time and lower conductance. Upregulated in denervation,
                burns, and immobilisation — causing hyperkalaemia with suxamethonium.
              </li>
            </ul>
          </ExamSection>

          <ExamSection id="safety-margin" exams={["primary", "final"]} curriculumCodes={["NA_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">The Safety Margin</h2>
            <p className="text-foreground/90 leading-relaxed">
              The NMJ has a large safety margin: approximately 70–80% of receptors must be blocked before
              clinical weakness becomes apparent, and {'>'}90% must be blocked for complete paralysis. This
              is exploited in neuromuscular monitoring — train-of-four fade appears when ~75% of receptors
              are occupied, and single twitch depression requires ~80% blockade.
            </p>
          </ExamSection>

          <ExamSection id="clinical" exams={["primary", "final", "fficm"]} curriculumCodes={["OA_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Clinical Relevance</h2>
            <div className="bg-secondary/30 rounded-lg p-4 border border-border">
              <p className="text-sm font-medium text-foreground">Conditions Affecting NM Transmission</p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• <strong>Myasthenia Gravis</strong> — autoantibodies against post-junctional nAChR; increased sensitivity to non-depolarising agents</li>
                <li>• <strong>Lambert–Eaton Syndrome</strong> — antibodies against pre-synaptic Ca²⁺ channels; post-tetanic potentiation occurs</li>
                <li>• <strong>Burns/Denervation</strong> — upregulation of extrajunctional receptors; risk of hyperkalaemia with suxamethonium</li>
                <li>• <strong>Aminoglycosides</strong> — reduce pre-synaptic Ca²⁺ entry and potentiate neuromuscular block</li>
              </ul>
            </div>
          </ExamSection>
        </>
      }
    />
  );
};

export default NeuromuscularTopic;
