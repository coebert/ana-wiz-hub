import { TopicTemplate } from "@/components/TopicTemplate";
import { WorkedExample } from "@/components/WorkedExamples";
import { ExamSection } from "@/components/ExamSection";
import { muscleRelaxantsQuiz } from "@/data/quizzes";
import MuscleRelaxantStructures from "@/components/diagrams/MuscleRelaxantStructures";
import { NMBAMechanismDiagram } from "@/components/diagrams/NMBAMechanismDiagram";
import { TOFPatternDiagram } from "@/components/diagrams/TOFPatternDiagram";
import { NMBATimelineDiagram } from "@/components/diagrams/NMBATimelineDiagram";
import SugammadexDiagram from "@/components/diagrams/SugammadexDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const workedExamples: WorkedExample[] = [
  {
    title: "Reversal choice after deep rocuronium block in a difficult airway",
    scenario:
      "After a CICO scenario, you successfully intubate but want to wake the patient. Rocuronium 1.2 mg/kg was given 4 minutes ago and TOF count is 0 (post-tetanic count 1). How will you reverse the block and why is sugammadex preferred over neostigmine here?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Assess depth: PTC 1 indicates intense (deep) neuromuscular block — neostigmine cannot reverse this depth (requires TOF count ≥2, ideally ≥4).</li>
          <li>Choose sugammadex: a modified γ-cyclodextrin that encapsulates rocuronium (and vecuronium) 1:1, removing it from the neuromuscular junction within ~2–3 min regardless of depth.</li>
          <li>Dose by depth: PTC 1–2 with no TOF = 16 mg/kg for immediate reversal; TOF count 1–2 = 4 mg/kg; routine reversal at reappearance of T2 = 2 mg/kg.</li>
          <li>Confirm reversal objectively: TOF ratio ≥0.9 at the adductor pollicis before extubation. Clinical signs (head-lift, grip) are insufficient.</li>
          <li>Counsel and document: sugammadex inactivates hormonal contraceptives for 7 days; rare anaphylaxis (~1:2500); avoid in severe renal impairment (eGFR &lt;30) where data are limited.</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Giving neostigmine at a deep block — ineffective and risks recurarisation.</li>
            <li>Forgetting that re-paralysis after sugammadex needs a non-aminosteroid relaxant (e.g. cisatracurium) for 24 h or a much larger rocuronium dose.</li>
            <li>Skipping objective TOF monitoring — clinical assessment misses residual paralysis.</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Use sugammadex 16 mg/kg — the only agent that reliably reverses deep rocuronium block (PTC 1). Confirm TOF ratio ≥0.9 before extubation. Counsel the patient about contraceptive failure for 7 days and choose cisatracurium if re-paralysis is needed within 24 h.",
    cites: ["Peck & Hill Ch.10","BJA Educ 2019"],
  },
];
const MuscleRelaxantsTopic = () => {
  return (
    <TopicTemplate
      title="Muscle Relaxants & Neuromuscular Blocking Agents"
      subtitle="FRCA Primary Pharmacology — Suxamethonium, Rocuronium, Sugammadex"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
      topicId="muscle-relaxants"
      topicTitle="Neuromuscular Blocking Agents"
      quizQuestions={muscleRelaxantsQuiz}
      objectives={[
        "Differentiate depolarising (suxamethonium) from non-depolarising NMBAs by mechanism, onset, duration and elimination",
        "Compare aminosteroid and benzylisoquinolinium agents and select an appropriate NMBA in renal/hepatic impairment",
        "Apply quantitative neuromuscular monitoring (TOF, PTC, DBS) to guide dosing and confirm adequate reversal",
        "Choose between neostigmine and sugammadex for reversal based on depth of block, agent and clinical context",
        "Recognise and manage suxamethonium-related complications (hyperkalaemia, MH, anaphylaxis, plasma cholinesterase deficiency)",
      ]}
      keyPoints={[
        { text: "Suxamethonium: only depolarising agent. Fastest onset. Metabolised by plasma ChE. Risk of hyperkalaemia, MH trigger.", cites: ["Fourth National Audit Project"] },
        { text: "Non-depolarising agents: competitive antagonists at nAChR α subunits. Aminosteroids vs benzylisoquinoliniums.", cites: ["Peck & Hill Ch.7"] },
        { text: "Cisatracurium: organ-independent Hofmann elimination. Ideal for renal/hepatic impairment. No histamine release.", cites: ["BJA Educ 2015"] },
        { text: "Neostigmine: anticholinesterase reversal. Requires antimuscarinic co-administration. Cannot reverse deep block.", cites: ["Fourth National Audit Project"] },
        { text: "Sugammadex: encapsulates rocuronium/vecuronium. Can reverse profound block. 16 mg/kg for emergency reversal.", cites: ["Peck & Hill Ch.7"] },
        { text: "TOF ratio <0.9 = residual blockade. Quantitative neuromuscular monitoring is the standard of care.", cites: ["BJA Educ 2015"] },
      ]}
      workedExamples={workedExamples}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY], curriculumCodes: ["PR_BK_05"] },
        keyPoints: { exams: [Exam.PRIMARY], curriculumCodes: ["PR_BK_05"] },
      }}
      sectionSources={{
        objectives: ["BJA Educ 2015", "Peck & Hill Ch.7", "Fourth National Audit Project"],
        keyPoints: ["BJA Educ 2015", "Peck & Hill Ch.7", "Fourth National Audit Project"],
        workedExamples: ["Peck & Hill Ch.10", "BJA Educ 2019"],
      }}
      coreConcepts={
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} className="scroll-mt-24">
        <div className="prose prose-slate max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
            <p className="text-foreground/90 leading-relaxed">
              Muscle relaxants — also called neuromuscular blocking agents (NMBAs), neuromuscular blocking drugs,
              NMJ blockers or NMBAs — produce skeletal muscle relaxation for tracheal intubation, mechanical ventilation
              and surgical access. They fall into two overarching groups: <strong>depolarising</strong> (suxamethonium /
              succinylcholine) and <strong>non-depolarising</strong> (US: non-depolarizing) muscle relaxants. A confident
              grasp of mechanism, pharmacokinetics, monitoring and reversal is core Primary FRCA pharmacology.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Properties of the Ideal Muscle Relaxant</h2>
            <p className="text-foreground/90 leading-relaxed mb-3">
              A classic viva opener. Frame your answer in physical, pharmacokinetic and clinical buckets:
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="rounded-lg border border-border bg-card p-3">
                <p className="text-sm font-semibold text-foreground mb-1">Physical</p>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-0.5">
                  <li>Stable, long shelf-life</li>
                  <li>Room-temperature storage</li>
                  <li>Painless on injection</li>
                  <li>Cheap, widely available</li>
                </ul>
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <p className="text-sm font-semibold text-foreground mb-1">Pharmacokinetic</p>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-0.5">
                  <li>Rapid, predictable onset</li>
                  <li>Predictable, controllable offset</li>
                  <li>Organ-independent elimination</li>
                  <li>Inactive, non-toxic metabolites</li>
                </ul>
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <p className="text-sm font-semibold text-foreground mb-1">Clinical</p>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-0.5">
                  <li>Fully reversible</li>
                  <li>No CVS effects</li>
                  <li>No histamine release / anaphylaxis</li>
                  <li>Safe in pregnancy and paediatrics</li>
                </ul>
              </div>
            </div>
            <p className="text-foreground/90 leading-relaxed mt-3 text-sm italic">
              No current agent meets every criterion — the comparison drives most viva discussion.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">NMJ Anatomy, nAChR Subunits & Drug Action</h2>
            <p className="text-foreground/90 leading-relaxed mb-3">
              The adult nicotinic acetylcholine receptor (nAChR) at the motor end plate is a <strong>pentameric</strong>
              ligand-gated cation channel comprising <strong>2 α, 1 β, 1 δ and 1 ε</strong> subunits. The foetal subtype
              substitutes a <strong>γ</strong> subunit for ε. Binding of <strong>two</strong> acetylcholine molecules to
              the α subunits opens a central pore, allowing Na⁺ influx and end-plate depolarisation.
            </p>
            <p className="text-foreground/90 leading-relaxed mb-4">
              <strong>Extrajunctional foetal-type receptor upregulation</strong> occurs in burns (&gt;24 h), denervation
              injury, prolonged immobilisation and critical illness — these proliferate, depolarise more readily, and
              underpin life-threatening hyperkalaemia after suxamethonium in these patients.
            </p>
            <div className="bg-card rounded-xl border border-border p-6">
              <NMBAMechanismDiagram />
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Pharmacokinetic Principles</h2>
            <p className="text-foreground/90 leading-relaxed">
              All clinically used muscle relaxants are <strong>bulky, highly charged (quaternary ammonium) molecules</strong>.
              This single fact explains most of their pharmacokinetic behaviour:
            </p>
            <ul className="list-disc list-inside text-foreground/90 leading-relaxed mt-2 space-y-1">
              <li><strong>Small volume of distribution</strong> (≈ extracellular fluid, ~0.2–0.4 L/kg).</li>
              <li><strong>Do not cross the blood–brain barrier</strong> → no sedative or analgesic effect.</li>
              <li><strong>Do not cross the placenta</strong> in clinically significant amounts → safe in obstetric anaesthesia.</li>
              <li><strong>Not absorbed orally</strong> — must be given IV (or IM for suxamethonium in paediatric emergencies).</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Suxamethonium (Succinylcholine)</h2>
            <p className="text-foreground/90 leading-relaxed">
              The only depolarising NMBA in clinical use. Structurally two ACh molecules joined end-to-end. Dose 1–1.5 mg/kg IV.
              Onset 30–60 s (fastest of all NMBAs). Duration 5–10 min. Metabolised by plasma cholinesterase (butyrylcholinesterase).
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              <strong>Phase I block</strong> (depolarising): initial fasciculations, sustained depolarisation → desensitisation.
              No fade on TOF, no post-tetanic potentiation. <strong>Phase II block</strong>: with repeated/prolonged dosing
              (cumulative dose &gt;3–5 mg/kg) characteristics resemble non-depolarising block (fade, PTP).
            </p>
            <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
              <p className="text-sm font-medium text-foreground">Side Effects & Contraindications</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>Hyperkalaemia</strong> (~0.5 mmol/L rise normally; massive release with burns &gt;24h, denervation injuries,
                muscular dystrophies, prolonged immobilisation). <strong>Bradycardia</strong> (muscarinic — especially with repeat
                doses). <strong>Raised IOP, ICP, intragastric pressure</strong>. <strong>Malignant hyperthermia trigger</strong>.
                <strong> Anaphylaxis</strong> (most common NMBA trigger). Masseter spasm. Myalgia.
                <strong> Suxamethonium apnoea</strong> in plasma cholinesterase deficiency (dibucaine number &lt;30) — ventilate
                until spontaneous reversal.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Non-Depolarising Muscle Relaxants</h2>
            <p className="text-foreground/90 leading-relaxed">
              Competitive antagonists at postjunctional nAChR α subunits. Sub-classified by chemical structure into
              <strong> aminosteroids</strong> and <strong>benzylisoquinoliniums</strong>; structure dictates histamine
              release, elimination pathway and whether sugammadex can reverse the block.
            </p>

            <h3 className="text-xl font-serif font-semibold text-foreground mt-6 mb-2">Aminosteroids</h3>
            <p className="text-foreground/90 leading-relaxed mb-3">
              Amine-substituted steroid nucleus. <strong>Less histamine release</strong> than benzylisoquinoliniums. The
              steroid ring is the target for <strong>sugammadex</strong>, so block is rapidly reversible at any depth.
              Primarily hepatic metabolism with biliary (and partial renal) excretion — duration prolonged in hepatic
              or renal failure.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="rounded-lg border border-border bg-card p-3">
                <p className="text-sm font-semibold text-foreground">Rocuronium</p>
                <ul className="text-xs text-muted-foreground list-disc list-inside mt-1 space-y-0.5">
                  <li>Dose: 0.6 mg/kg (intubation); 1.2 mg/kg (RSI)</li>
                  <li>Onset 60–90 s; duration ~30–45 min</li>
                  <li>Excretion: bile 60% / urine 40%</li>
                  <li>Reversible by sugammadex (incl. profound block)</li>
                </ul>
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <p className="text-sm font-semibold text-foreground">Vecuronium</p>
                <ul className="text-xs text-muted-foreground list-disc list-inside mt-1 space-y-0.5">
                  <li>Dose: 0.1 mg/kg; duration ~25–45 min</li>
                  <li>Excretion: bile 70% / urine 30%</li>
                  <li>Minimal CVS effect; cardiac-stable choice</li>
                  <li>Reversible by sugammadex</li>
                </ul>
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <p className="text-sm font-semibold text-foreground">Pancuronium</p>
                <ul className="text-xs text-muted-foreground list-disc list-inside mt-1 space-y-0.5">
                  <li>Bisquaternary; long duration ~60–90 min</li>
                  <li>Vagolytic → tachycardia, ↑BP</li>
                  <li>Excretion: urine ~80% / bile ~20%</li>
                  <li>Sugammadex: licensed off-label only</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-serif font-semibold text-foreground mt-6 mb-2">Benzylisoquinoliniums</h3>
            <p className="text-foreground/90 leading-relaxed mb-3">
              Based on a benzylisoquinoline backbone. <strong>More histamine release</strong> (caution in brittle asthma,
              haemodynamic instability). Eliminated by <strong>Hofmann degradation</strong> (spontaneous, pH- and
              temperature-dependent breakdown — slowed by acidosis and hypothermia) and/or <strong>ester hydrolysis</strong>
              by non-specific plasma esterases. <strong>Sugammadex does not reverse these agents.</strong>
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="rounded-lg border border-border bg-card p-3">
                <p className="text-sm font-semibold text-foreground">Atracurium</p>
                <ul className="text-xs text-muted-foreground list-disc list-inside mt-1 space-y-0.5">
                  <li>Dose: 0.5 mg/kg; duration ~25–35 min</li>
                  <li>Hofmann (~40%) + ester hydrolysis (~60%)</li>
                  <li>Histamine release at higher doses</li>
                  <li>Metabolite laudanosine — theoretical seizure risk on prolonged infusion</li>
                </ul>
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <p className="text-sm font-semibold text-foreground">Cisatracurium</p>
                <ul className="text-xs text-muted-foreground list-disc list-inside mt-1 space-y-0.5">
                  <li>R-cis, R'-cis stereoisomer of atracurium</li>
                  <li>Dose: 0.15 mg/kg; ~4–5× more potent</li>
                  <li>Pure Hofmann elimination — organ-independent</li>
                  <li>Negligible histamine release; ICU agent of choice</li>
                </ul>
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <p className="text-sm font-semibold text-foreground">Mivacurium</p>
                <ul className="text-xs text-muted-foreground list-disc list-inside mt-1 space-y-0.5">
                  <li>Dose: 0.2 mg/kg; short-acting 12–20 min</li>
                  <li>Plasma cholinesterase metabolism</li>
                  <li>Prolonged in suxamethonium apnoea</li>
                  <li>Declining use due to onset/offset variability</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-primary/30 bg-primary/5 p-4">
              <h3 className="text-lg font-serif font-semibold text-foreground mb-1">
                Why is rocuronium the non-depolarising RSI agent? The potency argument
              </h3>
              <p className="text-foreground/90 leading-relaxed text-sm">
                Counter-intuitively, rocuronium's <strong>low potency</strong> is what gives it a fast onset. Potency
                is the dose required for a given effect — a less potent drug must be given in a larger absolute dose
                (rocuronium ED₉₅ ~0.3 mg/kg vs vecuronium 0.05 mg/kg). A larger dose creates a steeper
                <strong> plasma–effect-site concentration gradient</strong>, driving more rapid diffusion across the
                NMJ and faster receptor occupancy. At 1.2 mg/kg (2 × ED₉₅), rocuronium achieves intubating conditions
                in ~45–60 s — comparable to suxamethonium and the only non-depolarising agent suitable for true RSI.
                Combined with the availability of sugammadex 16 mg/kg for emergency reversal, roc–sug has largely
                displaced suxamethonium in many UK departments.
              </p>
            </div>
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
            <div className="mt-6">
              <SugammadexDiagram />
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
            <h2 className="text-2xl font-serif font-bold text-foreground">NMBA Onset & Duration Timeline</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Compare the onset and clinical duration of all neuromuscular blocking agents side-by-side.
              Press Play to animate a time cursor across the timeline. Vertical markers show when intubation conditions are achieved.
            </p>
            <div className="bg-card rounded-xl border border-border p-6">
              <NMBATimelineDiagram />
            </div>
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

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Molecular Structures</h2>
            <MuscleRelaxantStructures />
          </section>
          <ExamPitfallsCallout
            accent="pharmacology"
            pitfalls={[
              "Suxamethonium: rapid onset, fasciculations, myalgia; risks include hyperkalaemia (burns, denervation, prolonged immobility), bradycardia (2nd dose), MH trigger.",
              "Suxamethonium apnoea: plasma cholinesterase deficiency — dibucaine number low; ventilate until spontaneous reversal.",
              "Train-of-four ratio >0.9 needed for safe extubation; clinical signs (head lift, grip) are insensitive to residual block.",
              "Sugammadex reverses rocuronium and vecuronium by encapsulation; ineffective for benzylisoquinolinium agents (atracurium, mivacurium).",
              "Atracurium undergoes Hofmann elimination — useful in renal/hepatic failure; metabolite laudanosine accumulates with prolonged infusion (theoretical seizure risk).",
            ]}
          />
        </div>
      </ExamSection>
      }
    />
  );
};

export default MuscleRelaxantsTopic;
