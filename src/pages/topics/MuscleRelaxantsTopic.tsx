import { Helmet } from "react-helmet-async";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { muscleRelaxantsQuiz } from "@/data/quizzes";
import MuscleRelaxantStructures from "@/components/diagrams/pharmacology/MuscleRelaxantStructures";
import { NMBAMechanismDiagram } from "@/components/diagrams/pharmacology/NMBAMechanismDiagram";
import { TOFPatternDiagram } from "@/components/diagrams/pharmacology/TOFPatternDiagram";
import { NMBATimelineDiagram } from "@/components/diagrams/pharmacology/NMBATimelineDiagram";
import SugammadexDiagram from "@/components/diagrams/pharmacology/SugammadexDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { AnaesthesiaDosingCallout } from "@/components/perioperative/AnaesthesiaDosingCallout";
import { InlineRef } from "@/components/references/InlineRef";

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
      title="Neuromuscular Blocking Drugs (Muscle Relaxants)"
      subtitle="FRCA Primary Pharmacology — depolarising vs non-depolarising agents: suxamethonium, rocuronium, vecuronium, atracurium, cisatracurium, sugammadex"
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
            <h2 id="contents" className="text-2xl font-serif font-bold text-foreground">Contents</h2>
            <nav className="mt-3 rounded-lg border border-border bg-card p-4">
              <ul className="space-y-1.5 text-sm">
                <li><a href="#introduction" className="text-pharmacology hover:underline">Introduction</a></li>
                <li><a href="#properties-of-the-ideal-muscle-relaxant" className="text-pharmacology hover:underline">Properties of the Ideal Muscle Relaxant</a></li>
                <li><a href="#nmj-anatomy-nachr-subunits-drug-action" className="text-pharmacology hover:underline">NMJ Anatomy, nAChR Subunits & Drug Action</a></li>
                <li><a href="#pharmacokinetic-principles" className="text-pharmacology hover:underline">Pharmacokinetic Principles</a></li>
                <li><a href="#suxamethonium-succinylcholine-mechanism-of-action-dose-side-effects" className="text-pharmacology hover:underline">Suxamethonium: Mechanism of Action, Dose & Side Effects</a></li>
                <li>
                  <a href="#non-depolarising-muscle-relaxants" className="text-pharmacology hover:underline">Non-Depolarising Muscle Relaxants</a>
                  <ul className="ml-4 mt-1 space-y-1 text-muted-foreground">
                    <li><a href="#aminosteroids" className="hover:text-pharmacology hover:underline">Aminosteroids</a></li>
                    <li><a href="#benzylisoquinoliniums" className="hover:text-pharmacology hover:underline">Benzylisoquinoliniums</a></li>
                    <li><a href="#rocuronium-rsi-agent-potency-argument" className="hover:text-pharmacology hover:underline">Why is Rocuronium the RSI Agent?</a></li>
                  </ul>
                </li>
                <li><a href="#comparative-table" className="text-pharmacology hover:underline">Comparative Table</a></li>
                <li>
                  <a href="#factors-affecting-neuromuscular-blockade" className="text-pharmacology hover:underline">Factors Affecting Neuromuscular Blockade</a>
                  <ul className="ml-4 mt-1 space-y-1 text-muted-foreground">
                    <li><a href="#patient-factors" className="hover:text-pharmacology hover:underline">Patient Factors</a></li>
                    <li><a href="#drug-interactions" className="hover:text-pharmacology hover:underline">Drug Interactions</a></li>
                    <li><a href="#determinants-of-onset-bowmans-principle" className="hover:text-pharmacology hover:underline">Determinants of Onset (Bowman's Principle)</a></li>
                  </ul>
                </li>
                <li><a href="#anaphylaxis-and-nap6" className="text-pharmacology hover:underline">Anaphylaxis and NMBAs: NAP6</a></li>
                <li><a href="#novel-agents" className="text-pharmacology hover:underline">Novel Agents: Gantacurium and the Fumarates</a></li>
                <li><a href="#nmba-use-in-intensive-care" className="text-pharmacology hover:underline">NMBA Use in Intensive Care</a></li>
                <li><a href="#reversal-agents" className="text-pharmacology hover:underline">Reversal Agents</a></li>
                <li><a href="#neuromuscular-monitoring" className="text-pharmacology hover:underline">Neuromuscular Monitoring</a></li>
                <li><a href="#residual-neuromuscular-block-postoperative-outcomes" className="text-pharmacology hover:underline">Residual Neuromuscular Block & Postoperative Outcomes</a></li>
                <li><a href="#nmba-onset-duration-timeline" className="text-pharmacology hover:underline">NMBA Onset & Duration Timeline</a></li>
                <li><a href="#tof-patterns" className="text-pharmacology hover:underline">TOF Patterns: Depolarising vs Non-Depolarising</a></li>
                <li><a href="#molecular-structures" className="text-pharmacology hover:underline">Molecular Structures</a></li>
                <li><a href="#frequently-asked-questions" className="text-pharmacology hover:underline">Frequently Asked Questions</a></li>
              </ul>
            </nav>
          </section>

          <section className="mb-10">
            <h2 id="introduction" className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
            <p className="text-foreground/90 leading-relaxed">
              Muscle relaxants — also called neuromuscular blocking agents (NMBAs), neuromuscular blocking drugs,
              NMJ blockers or NMBAs — produce skeletal muscle relaxation for tracheal intubation, mechanical ventilation
              and surgical access. They fall into two overarching groups: <strong>depolarising</strong> (suxamethonium /
              succinylcholine) and <strong>non-depolarising</strong> (US: non-depolarizing) muscle relaxants. A confident
              grasp of mechanism, pharmacokinetics, monitoring and reversal is core Primary FRCA pharmacology.
            </p>
          </section>

          <section className="mb-10">
            <h2 id="properties-of-the-ideal-muscle-relaxant" className="text-2xl font-serif font-bold text-foreground">Properties of the Ideal Muscle Relaxant</h2>
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
            <h2 id="nmj-anatomy-nachr-subunits-drug-action" className="text-2xl font-serif font-bold text-foreground">NMJ Anatomy, nAChR Subunits & Drug Action</h2>
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
            <h2 id="pharmacokinetic-principles" className="text-2xl font-serif font-bold text-foreground">Pharmacokinetic Principles</h2>
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
            <h2 id="suxamethonium-succinylcholine-mechanism-of-action-dose-side-effects" className="text-2xl font-serif font-bold text-foreground">Suxamethonium (Succinylcholine): Mechanism of Action, Dose & Side Effects</h2>
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
              <p className="text-sm font-medium text-foreground">Mechanism of phase II (desensitisation) block</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground mt-1 space-y-1">
                <li>Prolonged exposure to suxamethonium keeps the post-junctional receptor occupied; the membrane gradually <strong>repolarises</strong> yet remains unresponsive to acetylcholine because the receptor enters a desensitised, non-conducting conformation.</li>
                <li>Additional contributions come from ion channel block of the open receptor pore, pre-junctional effects reducing acetylcholine mobilisation, and receptor down-regulation<InlineRef topicId="muscle-relaxants" refLabel="BJA Educ 2015 NMB Monitoring" />.</li>
                <li>Clinical signature: <strong>fade</strong> on train-of-four (TOF ratio &lt;0.7), post-tetanic potentiation, tachyphylaxis (escalating dose requirement) and prolonged recovery — indistinguishable at the bedside from non-depolarising block.</li>
                <li>Occurs after repeated boluses or an infusion, typically once the cumulative dose exceeds 3–5 mg/kg, and earlier in atypical plasma cholinesterase.</li>
                <li>Management: stop suxamethonium, sedate and ventilate, and monitor with a quantitative nerve stimulator. Anticholinesterase reversal is unreliable and may deepen block if any phase I component remains, so it is not routinely recommended.</li>
              </ul>
            </div>
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
            <h2 id="non-depolarising-muscle-relaxants" className="text-2xl font-serif font-bold text-foreground">Non-Depolarising Muscle Relaxants: Rocuronium, Vecuronium, Atracurium &amp; Cisatracurium</h2>
            <p className="text-foreground/90 leading-relaxed">
              Competitive antagonists at postjunctional nAChR α subunits. Sub-classified by chemical structure into
              <strong> aminosteroids</strong> and <strong>benzylisoquinoliniums</strong>; structure dictates histamine
              release, elimination pathway and whether sugammadex can reverse the block.
            </p>

            <h3 id="aminosteroids" className="text-xl font-serif font-semibold text-foreground mt-6 mb-2">Aminosteroids</h3>
            <p className="text-foreground/90 leading-relaxed mb-3">
              Amine-substituted steroid nucleus. <strong>Less histamine release</strong> than benzylisoquinoliniums. The
              steroid ring is the target for <strong>sugammadex</strong>, so block is rapidly reversible at any depth.
              Primarily hepatic metabolism with biliary (and partial renal) excretion — duration prolonged in hepatic
              or renal failure.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="rounded-lg border border-border bg-card p-3">
                <p className="text-sm font-semibold text-foreground">
                  <a href="/pharmacology/rocuronium" className="text-pharmacology underline">Rocuronium</a>
                </p>
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

            <h3 id="benzylisoquinoliniums" className="text-xl font-serif font-semibold text-foreground mt-6 mb-2">Benzylisoquinoliniums</h3>
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
            <h3 id="rocuronium-rsi-agent-potency-argument" className="text-lg font-serif font-semibold text-foreground mb-1">
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
            <h2 id="comparative-table" className="text-2xl font-serif font-bold text-foreground">Comparative Table</h2>
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
            <h2 id="anaphylaxis-and-nap6" className="text-2xl font-serif font-bold text-foreground">Anaphylaxis and NMBAs: NAP6</h2>
            <p className="text-foreground/90 leading-relaxed">
              The 6th National Audit Project of the Royal College of Anaesthetists studied life-threatening perioperative anaphylaxis
              across the UK. Antibiotics and neuromuscular blocking drugs were the two commonest culprits, with
              <strong> suxamethonium and rocuronium</strong> the most frequently implicated NMBAs; atracurium and vecuronium were
              implicated less often and cisatracurium rarely<InlineRef topicId="muscle-relaxants" refLabel="NAP6 2018" />.
            </p>
            <ul className="list-disc list-inside text-foreground/90 leading-relaxed mt-3 space-y-1">
              <li><strong>Incidence:</strong> approximately 1 in 10,000 anaesthetics overall, with mortality around 4%; NMBA reactions accounted for roughly a third of cases.</li>
              <li><strong>Presentation:</strong> hypotension is the dominant feature (present in the great majority), with bronchospasm in about half; cutaneous signs are frequently absent or noticed late under drapes.</li>
              <li><strong>Immediate management:</strong> stop the trigger, call for help, 100% oxygen, intramuscular or intravenous adrenaline (IV 50 µg boluses titrated by an anaesthetist), aggressive fluid resuscitation, and an adrenaline infusion for refractory cases.</li>
              <li><strong>Investigation:</strong> mast cell tryptase at presentation, 1–2 h and &gt;24 h; referral to a specialist allergy clinic for skin prick/intradermal testing and IgE assays; document and issue written patient information and an alert.</li>
              <li><strong>Cross-reactivity:</strong> common between aminosteroid agents; where NMBA allergy is confirmed, use a structurally unrelated agent with prior testing, or avoid NMBAs altogether. Sugammadex does not treat rocuronium anaphylaxis reliably and is not a substitute for adrenaline.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 id="novel-agents" className="text-2xl font-serif font-bold text-foreground">Novel Agents: Gantacurium and the Fumarates</h2>
            <p className="text-foreground/90 leading-relaxed">
              The search for an agent with suxamethonium-like onset and offset without its side effects has produced the
              <strong> asymmetric mixed-onium chlorofumarates</strong>. Gantacurium (GW280430A) has an onset of about 1–1.5 min and
              an ultra-short duration (5–10 min) because it is inactivated by two non-enzymatic chemical routes: rapid adduction with
              endogenous L-cysteine and slower ester hydrolysis. Administration of exogenous L-cysteine antagonises the block within
              1–2 min from any depth — a fundamentally different reversal mechanism from anticholinesterases or sugammadex<InlineRef topicId="muscle-relaxants" refLabel="Gantacurium 2010" />.
            </p>
            <ul className="list-disc list-inside text-foreground/90 leading-relaxed mt-3 space-y-1">
              <li><strong>Advantages:</strong> organ-independent elimination, no MH trigger, no hyperkalaemia, no myalgia, and reversibility at profound block.</li>
              <li><strong>Limitations:</strong> histamine release and cardiovascular effects at higher multiples of ED₉₅; gantacurium is not licensed for clinical use.</li>
              <li><strong>CW002 (nimacalcin-type intermediate-acting fumarate):</strong> same cysteine-reversal principle with a longer duration and better cardiovascular profile; under investigation.</li>
              <li><strong>Other developments:</strong> calabadion (an acyclic cucurbituril container molecule) binds and reverses both steroidal and benzylisoquinolinium agents, and adamgammadex is a modified cyclodextrin intended to reduce sugammadex hypersensitivity<InlineRef topicId="muscle-relaxants" refLabel="AAS 2023 Novel NMBA" />.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 id="nmba-use-in-intensive-care" className="text-2xl font-serif font-bold text-foreground">NMBA Use in Intensive Care</h2>
            <p className="text-foreground/90 leading-relaxed">
              Indications in critical care are narrow: tracheal intubation, severe ventilator dyssynchrony or very high airway
              pressures, facilitating prone positioning, therapeutic hypothermia with shivering, status asthmaticus, tetanus, raised
              intracranial pressure refractory to sedation, and abdominal compartment syndrome<InlineRef topicId="muscle-relaxants" refLabel="CCM 2006 ICU NMBA" />.
            </p>
            <ul className="list-disc list-inside text-foreground/90 leading-relaxed mt-3 space-y-1">
              <li><strong>Agent choice:</strong> cisatracurium 1–3 µg/kg/min is preferred for infusions — Hofmann elimination is independent of hepatic and renal function, and laudanosine accumulation is clinically insignificant at these doses. Rocuronium and vecuronium accumulate in organ failure (vecuronium's active 3-desacetyl metabolite is renally cleared).</li>
              <li><strong>ARDS evidence:</strong> ACURASYS suggested a survival benefit from 48 h of early cisatracurium, but the larger ROSE trial found no difference in 90-day mortality with a high-PEEP strategy and lighter sedation in the control arm<InlineRef topicId="muscle-relaxants" refLabel="ROSE 2019" />. Current practice is therefore targeted, short-course blockade for refractory hypoxaemia or dyssynchrony rather than routine use.</li>
              <li><strong>Safety essentials:</strong> confirmed deep sedation and analgesia before and during paralysis (risk of awareness), airway disconnection alarms, eye care and lubrication, pressure area care, VTE prophylaxis, and physiotherapy planning.</li>
              <li><strong>Monitoring:</strong> quantitative TOF (aim 1–2 twitches) or post-tetanic count with daily interruption to reassess need; avoid deeper block than the indication requires.</li>
              <li><strong>Complications:</strong> ICU-acquired weakness and critical illness polyneuromyopathy (risk increased by prolonged blockade, corticosteroids, hyperglycaemia and sepsis), prolonged ventilation, corneal abrasion, diaphragm atrophy, and masked seizures or neurological deterioration.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 id="factors-affecting-neuromuscular-blockade" className="text-2xl font-serif font-bold text-foreground">Factors Affecting Neuromuscular Blockade</h2>
            <p className="text-foreground/90 leading-relaxed">
              The clinical effect of any neuromuscular blocking drug — onset, depth and duration — is modulated by patient
              physiology, concurrent drugs and the physicochemical properties of the agent itself. The FRCA examiner expects a
              structured answer covering patient factors, drug interactions and the determinants of onset (Bowman's principle).
            </p>

            <h3 id="patient-factors" className="text-xl font-serif font-semibold text-foreground mt-6 mb-2">Patient Factors</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-border">
                <thead className="bg-secondary/40">
                  <tr>
                    <th className="text-left p-2 border-b border-border">Factor</th>
                    <th className="text-left p-2 border-b border-border">Effect on Block</th>
                    <th className="text-left p-2 border-b border-border">Mechanism</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/90">
                  <tr><td className="p-2 border-b border-border">Hepatic failure</td><td className="p-2 border-b border-border">Prolongs aminosteroids; prolongs suxamethonium in severe disease</td><td className="p-2 border-b border-border">↓ biliary excretion (rocuronium, vecuronium); ↓ plasma cholinesterase synthesis</td></tr>
                  <tr><td className="p-2 border-b border-border">Renal failure</td><td className="p-2 border-b border-border">Prolongs vecuronium, pancuronium; minor effect on rocuronium</td><td className="p-2 border-b border-border">↓ renal clearance of parent drug and active metabolites</td></tr>
                  <tr><td className="p-2 border-b border-border">Plasma cholinesterase deficiency</td><td className="p-2 border-b border-border">Suxamethonium apnoea (hours rather than minutes)</td><td className="p-2 border-b border-border">↓ hydrolysis of suxamethonium and mivacurium</td></tr>
                  <tr><td className="p-2 border-b border-border">Neonates / elderly</td><td className="p-2 border-b border-border">Increased sensitivity, prolonged duration</td><td className="p-2 border-b border-border">Immature NMJ (neonates); ↓ organ clearance and altered Vd (elderly)</td></tr>
                  <tr><td className="p-2 border-b border-border">Hypokalaemia</td><td className="p-2 border-b border-border">Potentiates non-depolarising; antagonises depolarising</td><td className="p-2 border-b border-border">Hyperpolarises end-plate — harder to depolarise</td></tr>
                  <tr><td className="p-2 border-b border-border">Hyperkalaemia</td><td className="p-2 border-b border-border">Potentiates depolarising; antagonises non-depolarising</td><td className="p-2 border-b border-border">Membrane closer to threshold</td></tr>
                  <tr><td className="p-2 border-b border-border">Hypermagnesaemia (e.g. pre-eclampsia)</td><td className="p-2 border-b border-border">Potentiates all NMBAs</td><td className="p-2 border-b border-border">↓ pre-synaptic ACh release; ↓ post-junctional sensitivity</td></tr>
                  <tr><td className="p-2 border-b border-border">Hypocalcaemia</td><td className="p-2 border-b border-border">Potentiates blockade</td><td className="p-2 border-b border-border">↓ Ca²⁺-dependent ACh exocytosis</td></tr>
                  <tr><td className="p-2 border-b border-border">Respiratory / metabolic acidosis</td><td className="p-2 border-b border-border">Potentiates non-depolarising block; reverses neostigmine effect</td><td className="p-2 border-b border-border">Altered ionisation and receptor binding</td></tr>
                  <tr><td className="p-2 border-b border-border">Hypothermia</td><td className="p-2 border-b border-border">Prolongs all NMBAs</td><td className="p-2 border-b border-border">↓ hepatic, renal clearance; ↓ Hofmann elimination of atracurium / cisatracurium</td></tr>
                  <tr><td className="p-2 border-b border-border">Myasthenia gravis</td><td className="p-2 border-b border-border">Resistant to suxamethonium; very sensitive to non-depolarisers</td><td className="p-2 border-b border-border">Autoantibody loss of post-junctional nAChRs — start at 1/10 dose, titrate to TOF</td></tr>
                  <tr><td className="p-2 border-b border-border">Lambert–Eaton (LEMS)</td><td className="p-2 border-b border-border">Sensitive to both depolarising and non-depolarising</td><td className="p-2 border-b border-border">Antibodies against pre-synaptic voltage-gated Ca²⁺ channels — ↓ ACh release</td></tr>
                  <tr><td className="p-2 border-b border-border">Burns &gt;24 h, denervation, prolonged immobility</td><td className="p-2 border-b border-border">Hyperkalaemic response to suxamethonium; resistance to non-depolarisers</td><td className="p-2 border-b border-border">Up-regulation of extrajunctional immature (γ-subunit) nAChRs</td></tr>
                </tbody>
              </table>
            </div>

            <h3 id="drug-interactions" className="text-xl font-serif font-semibold text-foreground mt-6 mb-2">Drug Interactions</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-border">
                <thead className="bg-secondary/40">
                  <tr>
                    <th className="text-left p-2 border-b border-border">Drug</th>
                    <th className="text-left p-2 border-b border-border">Effect</th>
                    <th className="text-left p-2 border-b border-border">Mechanism</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/90">
                  <tr><td className="p-2 border-b border-border">Volatile anaesthetics (sevo, des, iso)</td><td className="p-2 border-b border-border">Potentiate (sevo &gt; iso &gt; des in MAC-equivalent)</td><td className="p-2 border-b border-border">Post-junctional membrane stabilisation; central muscle relaxation</td></tr>
                  <tr><td className="p-2 border-b border-border">Aminoglycosides (gentamicin, tobramycin), tetracyclines, clindamycin</td><td className="p-2 border-b border-border">Potentiate</td><td className="p-2 border-b border-border">↓ pre-synaptic ACh release (Ca²⁺ channel block); post-junctional effects</td></tr>
                  <tr><td className="p-2 border-b border-border">Local anaesthetics (IV lidocaine)</td><td className="p-2 border-b border-border">Potentiate</td><td className="p-2 border-b border-border">↓ ACh release; membrane stabilisation</td></tr>
                  <tr><td className="p-2 border-b border-border">Magnesium sulphate</td><td className="p-2 border-b border-border">Marked potentiation</td><td className="p-2 border-b border-border">Competes with Ca²⁺ at the nerve terminal</td></tr>
                  <tr><td className="p-2 border-b border-border">Calcium-channel blockers, lithium</td><td className="p-2 border-b border-border">Potentiate</td><td className="p-2 border-b border-border">↓ Ca²⁺-dependent ACh release</td></tr>
                  <tr><td className="p-2 border-b border-border">Furosemide</td><td className="p-2 border-b border-border">Biphasic: potentiates at low dose, antagonises at high dose</td><td className="p-2 border-b border-border">Dose-dependent effects on cAMP and ACh release</td></tr>
                  <tr><td className="p-2 border-b border-border">Anticholinesterases (neostigmine)</td><td className="p-2 border-b border-border">Antagonise non-depolarising; prolong suxamethonium &amp; mivacurium</td><td className="p-2 border-b border-border">↑ junctional ACh; ↓ plasma cholinesterase</td></tr>
                  <tr><td className="p-2 border-b border-border">Chronic phenytoin, carbamazepine</td><td className="p-2 border-b border-border">Resistance to non-depolarisers</td><td className="p-2 border-b border-border">Hepatic enzyme induction and up-regulation of nAChRs</td></tr>
                </tbody>
              </table>
            </div>

            <h3 id="determinants-of-onset-bowmans-principle" className="text-xl font-serif font-semibold text-foreground mt-6 mb-2">Determinants of Onset (Bowman's Principle)</h3>
            <p className="text-foreground/90 leading-relaxed">
              <strong>Bowman's principle</strong>: less potent non-depolarising NMBAs have a faster onset because a larger
              absolute dose is required, generating a steeper plasma-to-effect-site concentration gradient and faster nAChR
              occupancy. This is why rocuronium (low potency, ED₉₅ ~0.3 mg/kg) has a faster onset than vecuronium or
              cisatracurium (high potency, ED₉₅ ~0.05 mg/kg) at equipotent doses. Onset is further accelerated by:
            </p>
            <ul className="list-disc list-inside text-foreground/90 leading-relaxed mt-2 space-y-1">
              <li><strong>↑ dose</strong> (2–3 × ED₉₅ for intubation, 3–4 × ED₉₅ for RSI) — steeper gradient.</li>
              <li><strong>↑ cardiac output</strong> and high regional muscle blood flow (diaphragm and laryngeal adductors faster than adductor pollicis).</li>
              <li><strong>Priming</strong>: a sub-paralysing dose (~10% of intubating dose) 3 min before induction occupies spare receptors and shortens onset by ~30 s, at the cost of awake weakness and aspiration risk.</li>
              <li><strong>Timing principle</strong>: induce at peak onset of NMBA (loss of TOF at orbicularis oculi) rather than at a fixed time interval.</li>
            </ul>
          </section>



          <section className="mb-10">
            <h2 id="reversal-agents" className="text-2xl font-serif font-bold text-foreground">Reversal Agents</h2>
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
            <h2 id="neuromuscular-monitoring" className="text-2xl font-serif font-bold text-foreground">Neuromuscular Monitoring</h2>
            <p className="text-foreground/90 leading-relaxed">
              <strong>Train-of-four (TOF)</strong>: 4 stimuli at 2 Hz. TOF ratio = T4/T1. Ratio &lt;0.9 = clinically significant
              residual blockade. <strong>Post-tetanic count (PTC)</strong>: for deep block (TOF count 0). <strong>Double burst
              stimulation (DBS)</strong>: fade easier to detect manually than TOF. Quantitative monitoring (acceleromyography,
              kinemyography) is recommended over qualitative assessment.
            </p>
          </section>

          <section className="mb-10">
            <h2 id="residual-neuromuscular-block-postoperative-outcomes" className="text-2xl font-serif font-bold text-foreground">Residual Neuromuscular Block & Postoperative Outcomes</h2>
            <p className="text-foreground/90 leading-relaxed">
              <strong>Postoperative residual curarisation (PORC)</strong> is defined as a TOF ratio &lt;0.9 at the adductor
              pollicis after tracheal extubation. It occurs in up to 30–40% of patients reversed with neostigmine when only
              qualitative (peripheral nerve stimulator) monitoring is used, and is associated with:
            </p>
            <ul className="list-disc list-inside text-foreground/90 leading-relaxed mt-2 space-y-1">
              <li>Upper airway obstruction and pharyngeal dysfunction (loss of airway protective reflexes at TOF ratio 0.7–0.9).</li>
              <li>Aspiration of pharyngeal contents — silent and clinically unrecognised.</li>
              <li>Hypoxaemia and atelectasis in the recovery room.</li>
              <li>Increased incidence of postoperative pulmonary complications (pneumonia, reintubation, prolonged ICU stay).</li>
              <li>Subjective distress: blurred vision, weakness, inability to swallow or speak clearly.</li>
            </ul>
            <p className="text-foreground/90 leading-relaxed mt-3">
              <strong>Prevention</strong>: quantitative TOF monitoring throughout, reversal guided by TOF count (neostigmine
              only at TOF count ≥2; sugammadex preferred for deep block), and confirmation of TOF ratio ≥0.9 <em>before</em>
              extubation. The 2023 ESAIC guideline on peri-operative management of NMBAs recommends quantitative monitoring as
              standard of care whenever a non-depolarising NMBA is administered.
            </p>
          </section>



          <section className="mb-10">
            <h2 id="nmba-onset-duration-timeline" className="text-2xl font-serif font-bold text-foreground">NMBA Onset & Duration Timeline</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Compare the onset and clinical duration of all neuromuscular blocking agents side-by-side.
              Press Play to animate a time cursor across the timeline. Vertical markers show when intubation conditions are achieved.
            </p>
            <div className="bg-card rounded-xl border border-border p-6">
              <NMBATimelineDiagram />
            </div>
          </section>

          <section className="mb-10">
            <h2 id="tof-patterns" className="text-2xl font-serif font-bold text-foreground">TOF Patterns: Depolarising vs Non-Depolarising</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Compare the animated train-of-four response across different block types. Note the key distinguishing
              feature: fade is present in non-depolarising block but absent in Phase I depolarising block.
            </p>
            <div className="bg-card rounded-xl border border-border p-6">
              <TOFPatternDiagram />
            </div>
          </section>

          <section className="mb-10">
            <h2 id="molecular-structures" className="text-2xl font-serif font-bold text-foreground">Molecular Structures</h2>
            <MuscleRelaxantStructures />
          </section>

          <section className="mb-10" id="faq">
            <h2 id="frequently-asked-questions" className="text-2xl font-serif font-bold text-foreground">Frequently Asked Questions</h2>
            <div className="space-y-4 mt-3">
              {[
                {
                  q: "What are NMJ blockers?",
                  a: "NMJ blockers — neuromuscular junction blockers, also called neuromuscular blocking drugs (NMBAs) or muscle relaxants — are drugs that interrupt acetylcholine signalling at the postjunctional nicotinic receptor of the motor end-plate to produce skeletal muscle paralysis. They are used to facilitate tracheal intubation, optimise surgical conditions and enable mechanical ventilation. NMJ blockers fall into two classes: depolarising (suxamethonium) and non-depolarising (rocuronium, vecuronium, atracurium, cisatracurium, pancuronium, mivacurium). They do not produce anaesthesia or analgesia and must always be given with adequate anaesthesia and ventilation.",
                },
                {
                  q: "What is a depolarising muscle relaxant?",
                  a: "A depolarising muscle relaxant is a neuromuscular blocking drug that acts as an agonist at the α-subunits of the postjunctional nicotinic acetylcholine receptor, opening the ion channel and producing sustained end-plate depolarisation. The only depolarising muscle relaxant in clinical use is suxamethonium (succinylcholine). Initial fasciculations are followed by flaccid paralysis (Phase I block) because perijunctional sodium channels are inactivated and cannot repropagate. There is no TOF fade and no post-tetanic potentiation. Suxamethonium is hydrolysed by plasma cholinesterase; onset is 30–60 s and duration 5–10 min. It is not reversed by neostigmine or sugammadex and must wear off spontaneously.",
                },
                {
                  q: "What is the difference between depolarising and non-depolarising muscle relaxants?",
                  a: "Depolarising agents (only suxamethonium in clinical use) are nicotinic acetylcholine receptor agonists that cause sustained end-plate depolarisation, producing initial fasciculations followed by flaccid paralysis with no TOF fade and no post-tetanic potentiation. Non-depolarising agents (rocuronium, vecuronium, atracurium, cisatracurium) are competitive antagonists at the α-subunits of the nAChR: there are no fasciculations, TOF shows fade, and post-tetanic potentiation is present. Non-depolarising block is reversible (by neostigmine or, for aminosteroids, sugammadex); depolarising block must be allowed to wear off through plasma cholinesterase metabolism.",
                },
                {
                  q: "How does suxamethonium work?",
                  a: "Suxamethonium is structurally two acetylcholine molecules joined end-to-end. It binds the α-subunits of postjunctional nicotinic ACh receptors at the neuromuscular junction and persistently opens the ion channel, depolarising the motor end-plate. The sustained depolarisation inactivates perijunctional sodium channels, so the muscle membrane cannot repolarise and propagate further action potentials — producing flaccid paralysis (Phase I block). It is hydrolysed by plasma cholinesterase (butyrylcholinesterase); typical onset is 30–60 s and duration 5–10 min at 1–1.5 mg/kg IV.",
                },
                {
                  q: "When should rocuronium replace suxamethonium for rapid sequence induction?",
                  a: "Rocuronium 1.0–1.2 mg/kg provides intubating conditions in ~60 s — comparable to suxamethonium — and is preferred when suxamethonium is contraindicated: known or suspected malignant hyperthermia susceptibility, hyperkalaemia or conditions predisposing to it (burns >24 h, denervation injury, prolonged immobilisation, severe muscular dystrophy), plasma cholinesterase deficiency, and patient preference to avoid post-suxamethonium myalgia. Sugammadex must be immediately available to reverse the block if intubation fails.",
                },
                {
                  q: "How does sugammadex reverse rocuronium?",
                  a: "Sugammadex is a modified γ-cyclodextrin with a lipophilic core that encapsulates aminosteroid NMBAs (rocuronium ≫ vecuronium ≫ pancuronium) in a 1:1 complex, removing free drug from plasma. This shifts the equilibrium, drawing drug away from the neuromuscular junction within 2–3 min regardless of block depth. Dosing: 2 mg/kg at reappearance of T2 for routine reversal, 4 mg/kg at PTC 1–2 for deep block, 16 mg/kg for immediate reversal of a 1.2 mg/kg intubating dose. Adequacy must be confirmed objectively (TOF ratio ≥0.9). Sugammadex is ineffective against benzylisoquinoliniums (atracurium, cisatracurium, mivacurium).",
                },
                {
                  q: "What are the side effects of suxamethonium?",
                  a: "Hyperkalaemia (≈0.5 mmol/L rise normally; potentially fatal release in burns >24 h, denervation, muscular dystrophy, prolonged immobilisation); bradycardia (especially with a second dose); raised intraocular, intracranial and intragastric pressure; malignant hyperthermia trigger; anaphylaxis (the most common NMBA cause); masseter spasm; post-operative myalgia; and prolonged paralysis (suxamethonium apnoea) in plasma cholinesterase deficiency — managed by sedation and ventilation until spontaneous recovery.",
                },
                {
                  q: "Why does suxamethonium cause hyperkalaemia in burns patients?",
                  a: "From around 24–48 h after a significant burn, extrajunctional (immature) nicotinic ACh receptors proliferate across the muscle membrane in response to injury and inactivity. Suxamethonium depolarises all of these receptors simultaneously, releasing a massive bolus of intracellular potassium that can produce serum rises of 5–10 mmol/L and cardiac arrest. The risk persists for months (often quoted up to ~1 year) after the burn until the receptor population normalises; suxamethonium is therefore avoided beyond the first 24 h.",
                },
                {
                  q: "What is train-of-four (TOF) monitoring and what does a TOF ratio of 0.9 mean?",
                  a: "TOF delivers four supramaximal 2 Hz stimuli to a peripheral nerve (commonly the ulnar at the wrist, observing adductor pollicis). With non-depolarising block the response shows progressive fade — the fourth twitch (T4) is smaller than the first (T1). The TOF ratio = T4/T1. A ratio ≥0.9 indicates recovery sufficient to protect airway reflexes and ventilation; below 0.9 there is clinically significant residual paralysis even when the patient appears awake. Quantitative (acceleromyography/electromyography) monitoring is the standard of care because clinical signs such as head-lift and grip are insensitive to residual block.",
                },
              ].map((item) => (
                <details key={item.q} className="group rounded-lg border border-border bg-card p-4">
                  <summary className="cursor-pointer font-semibold text-foreground">{item.q}</summary>
                  <p className="mt-2 text-foreground/90 leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
            <Helmet>
              <title>Neuromuscular Blocking Drugs (NMBAs): Depolarising vs Non-Depolarising | AnaesthesiaCore</title>
              <meta
                name="description"
                content="Neuromuscular blocking drugs for FRCA: depolarising (suxamethonium) vs non-depolarising muscle relaxants (rocuronium, vecuronium, atracurium, cisatracurium), TOF monitoring, sugammadex and neostigmine reversal."
              />
              <link rel="canonical" href="https://anaesthesiacore.app/pharmacology/muscle-relaxants" />
              <meta property="og:title" content="Neuromuscular Blocking Drugs: Depolarising vs Non-Depolarising NMBAs" />
              <meta property="og:description" content="FRCA pharmacology of depolarising and non-depolarising muscle relaxants — mechanism, TOF, sugammadex reversal." />
              <meta property="og:url" content="https://anaesthesiacore.app/pharmacology/muscle-relaxants" />
              <meta property="og:type" content="article" />
              <script type="application/ld+json">{JSON.stringify({
                "@context": "https://schema.org",
                "@type": "MedicalWebPage",
                name: "Neuromuscular Blocking Drugs (Muscle Relaxants)",
                about: {
                  "@type": "MedicalEntity",
                  name: "Neuromuscular blocking agents",
                  alternateName: ["NMBAs", "NMJ blockers", "Muscle relaxants", "Depolarising muscle relaxant", "Non-depolarising muscle relaxants"],
                },
                audience: { "@type": "MedicalAudience", audienceType: "Anaesthetist" },
                url: "https://anaesthesiacore.app/pharmacology/muscle-relaxants",
              })}</script>
              <script type="application/ld+json">{JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  ["What are NMJ blockers?","NMJ blockers — neuromuscular junction blockers, also called neuromuscular blocking drugs (NMBAs) or muscle relaxants — interrupt acetylcholine signalling at the postjunctional nicotinic receptor of the motor end-plate to produce skeletal muscle paralysis. They are used to facilitate intubation, optimise surgical conditions and enable mechanical ventilation. Two classes exist: depolarising (suxamethonium) and non-depolarising (rocuronium, vecuronium, atracurium, cisatracurium, pancuronium, mivacurium)."],
                  ["What is a depolarising muscle relaxant?","A depolarising muscle relaxant is a neuromuscular blocking drug that acts as an agonist at the α-subunits of the postjunctional nicotinic acetylcholine receptor, producing sustained end-plate depolarisation. The only depolarising muscle relaxant in clinical use is suxamethonium (succinylcholine). It causes initial fasciculations then flaccid paralysis (Phase I block) with no TOF fade and no post-tetanic potentiation, is hydrolysed by plasma cholinesterase, and is not reversed by neostigmine or sugammadex."],
                  ["What is the difference between depolarising and non-depolarising muscle relaxants?","Depolarising agents (only suxamethonium in clinical use) are nicotinic acetylcholine receptor agonists that cause sustained end-plate depolarisation, producing initial fasciculations followed by flaccid paralysis with no TOF fade and no post-tetanic potentiation. Non-depolarising agents (rocuronium, vecuronium, atracurium, cisatracurium) are competitive antagonists at the α-subunits of the nAChR: there are no fasciculations, TOF shows fade, and post-tetanic potentiation is present. Non-depolarising block is reversible (by neostigmine or, for aminosteroids, sugammadex); depolarising block must be allowed to wear off through plasma cholinesterase metabolism."],
                  ["How does suxamethonium work?","Suxamethonium is structurally two acetylcholine molecules joined end-to-end. It binds the α-subunits of postjunctional nicotinic ACh receptors at the neuromuscular junction and persistently opens the ion channel, depolarising the motor end-plate. The sustained depolarisation inactivates perijunctional sodium channels, so the muscle membrane cannot repolarise and propagate further action potentials. It is hydrolysed by plasma cholinesterase; typical onset is 30–60 s and duration 5–10 min at 1–1.5 mg/kg IV."],
                  ["When should rocuronium replace suxamethonium for rapid sequence induction?","Rocuronium 1.0–1.2 mg/kg provides intubating conditions in ~60 s and is preferred when suxamethonium is contraindicated: malignant hyperthermia susceptibility, hyperkalaemia or conditions predisposing to it (burns >24 h, denervation, prolonged immobilisation, severe muscular dystrophy), plasma cholinesterase deficiency, and to avoid post-suxamethonium myalgia. Sugammadex must be immediately available."],
                  ["How does sugammadex reverse rocuronium?","Sugammadex is a modified γ-cyclodextrin that encapsulates aminosteroid NMBAs 1:1, removing free drug from plasma and reversing block within 2–3 min regardless of depth. Dosing: 2 mg/kg at T2 for routine reversal, 4 mg/kg at PTC 1–2 for deep block, 16 mg/kg for immediate reversal of a 1.2 mg/kg intubating dose. Confirm reversal with TOF ratio ≥0.9. Ineffective against benzylisoquinoliniums."],
                  ["What are the side effects of suxamethonium?","Hyperkalaemia, bradycardia (especially with a second dose), raised intraocular, intracranial and intragastric pressure, malignant hyperthermia, anaphylaxis (most common NMBA cause), masseter spasm, post-operative myalgia, and suxamethonium apnoea in plasma cholinesterase deficiency."],
                  ["Why does suxamethonium cause hyperkalaemia in burns patients?","From 24–48 h after a significant burn, extrajunctional (immature) nicotinic ACh receptors proliferate across the muscle membrane. Suxamethonium depolarises them simultaneously, releasing a large bolus of intracellular potassium that can cause cardiac arrest. The risk persists for months until the receptor population normalises, so suxamethonium is avoided beyond the first 24 h post-burn."],
                  ["What is train-of-four (TOF) monitoring and what does a TOF ratio of 0.9 mean?","TOF delivers four supramaximal 2 Hz stimuli to a peripheral nerve. With non-depolarising block the response fades; TOF ratio = T4/T1. A ratio ≥0.9 indicates recovery sufficient to protect the airway. Below 0.9 there is clinically significant residual paralysis. Quantitative monitoring is the standard of care because clinical signs are insensitive to residual block."],
                ].map(([name, acceptedAnswer]) => ({
                  "@type": "Question",
                  name,
                  acceptedAnswer: { "@type": "Answer", text: acceptedAnswer },
                })),
              })}</script>
            </Helmet>
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
      <AnaesthesiaDosingCallout focus="neuromuscular blockers and their reversal" />
      </ExamSection>
      }
    />
  );
};

export default MuscleRelaxantsTopic;
