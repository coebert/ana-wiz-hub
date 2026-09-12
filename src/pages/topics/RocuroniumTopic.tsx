import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { muscleRelaxantsQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { TOFPatternDiagram } from "@/components/diagrams/pharmacology/TOFPatternDiagram";
import { NMBATimelineDiagram } from "@/components/diagrams/pharmacology/NMBATimelineDiagram";
import SugammadexDiagram from "@/components/diagrams/pharmacology/SugammadexDiagram";
import { AnaesthesiaDosingCallout } from "@/components/perioperative/AnaesthesiaDosingCallout";
import { InlineRef } from "@/components/references/InlineRef";

const workedExamples: WorkedExample[] = [
  {
    title: "Rocuronium dosing for modified RSI in a patient with full stomach",
    scenario:
      "70 kg adult requiring emergency laparotomy. You plan a rocuronium-based RSI with sugammadex immediately available. Calculate the intubating dose, expected onset and the rescue reversal dose if intubation fails.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>RSI dose = 1.2 mg/kg (2× ED₉₅ of 0.6 mg/kg for rapid onset): 70 × 1.2 = <strong>84 mg IV</strong>.</li>
          <li>Onset to intubating conditions ≈ 45–60 s (comparable to suxamethonium 1.5 mg/kg).</li>
          <li>Clinical duration of a 1.2 mg/kg dose: ~45–70 min (vs ~30–45 min after 0.6 mg/kg).</li>
          <li>Rescue reversal if "can't intubate": sugammadex 16 mg/kg = 70 × 16 = <strong>1120 mg IV</strong> — restores TOF to ≥0.9 within ~2–3 min regardless of depth.</li>
          <li>Have sugammadex drawn up and labelled before induction; confirm reversal with quantitative TOF before extubation.</li>
        </ol>
      </div>
    ),
    answer: "Rocuronium 84 mg IV (1.2 mg/kg) gives intubating conditions in ~60 s with ~45–70 min duration. Sugammadex 1120 mg (16 mg/kg) is the immediate rescue reversal dose.",
    cites: ["Peck & Hill Ch.10", "BJA Educ 2015"],
  },
];

const RocuroniumTopic = () => {
  return (
    <TopicTemplate
      title="Rocuronium: Dose, Onset, TOF Monitoring & Sugammadex Reversal"
      subtitle="FRCA Primary Pharmacology — aminosteroid non-depolarising neuromuscular blocking drug for intubation, RSI and infusion"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
      topicId="rocuronium"
      topicTitle="Rocuronium"
      quizQuestions={muscleRelaxantsQuiz}
      objectives={[
        "Describe the mechanism of action of rocuronium as a competitive non-depolarising nAChR antagonist",
        "State intubating, RSI and infusion doses of rocuronium and predict onset and duration at each dose",
        "Apply train-of-four (TOF), post-tetanic count (PTC) and double-burst stimulation (DBS) to titrate rocuronium",
        "Choose between neostigmine and sugammadex for rocuronium reversal based on depth of block",
        "Recognise the indications, contraindications and adverse effects of rocuronium and sugammadex",
      ]}
      keyPoints={[
        { text: "Rocuronium: aminosteroid non-depolarising NMBA. ED₉₅ ≈ 0.3 mg/kg. Quaternary ammonium, monoquaternary structure.", cites: ["Peck & Hill Ch.10"] },
        { text: "Doses: 0.6 mg/kg intubation (onset 60–90 s, 30–45 min); 1.2 mg/kg RSI (onset 45–60 s, 60–70 min); infusion 5–10 µg/kg/min.", cites: ["BJA Educ 2015"] },
        { text: "Elimination: hepatic uptake and biliary excretion (~70%), renal (~30%) — duration prolonged in hepatic/renal failure.", cites: ["Peck & Hill Ch.10"] },
        { text: "Monitor with quantitative TOF at the adductor pollicis; ratio ≥0.9 required before extubation.", cites: ["BJA Educ 2015"] },
        { text: "Sugammadex (γ-cyclodextrin) reverses rocuronium 1:1 at any depth. 2 / 4 / 16 mg/kg by depth of block.", cites: ["Fourth National Audit Project"] },
        { text: "Minimal cardiovascular and histamine effects. Anaphylaxis ~1:2500–1:5000 — the second commonest NMBA cause after suxamethonium.", cites: ["Fourth National Audit Project"] },
      ]}
      workedExamples={workedExamples}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY], curriculumCodes: ["PR_BK_05"] },
        keyPoints: { exams: [Exam.PRIMARY], curriculumCodes: ["PR_BK_05"] },
      }}
      sectionSources={{
        objectives: ["BJA Educ 2015", "Peck & Hill Ch.10"],
        keyPoints: ["BJA Educ 2015", "Peck & Hill Ch.10", "Fourth National Audit Project"],
        workedExamples: ["Peck & Hill Ch.10", "BJA Educ 2015"],
      }}
      coreConcepts={
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} className="scroll-mt-24">
          <Helmet>
            <title>Rocuronium: Dose, Onset, TOF & Sugammadex Reversal | AnaesthesiaCore</title>
            <meta
              name="description"
              content="Rocuronium for FRCA: mechanism, intubating and RSI dose, onset, duration, TOF/PTC monitoring, sugammadex reversal dosing and adverse effects."
            />
            <link rel="canonical" href="https://anaesthesiacore.app/pharmacology/rocuronium" />
            <script type="application/ld+json">{JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalWebPage",
              name: "Rocuronium",
              about: { "@type": "Drug", name: "Rocuronium bromide", drugClass: "Aminosteroid non-depolarising neuromuscular blocking drug" },
              audience: { "@type": "MedicalAudience", audienceType: "Anaesthetist" },
            })}</script>
            <script type="application/ld+json">{JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                ["What is the dose of rocuronium for intubation?", "Standard intubating dose is 0.6 mg/kg IV (2× ED₉₅), giving onset 60–90 s and clinical duration 30–45 min. For rapid sequence induction the dose is increased to 1.0–1.2 mg/kg IV, giving onset 45–60 s — comparable to suxamethonium 1.5 mg/kg — and duration 60–70 min. Maintenance infusion is 5–10 µg/kg/min titrated to TOF."],
                ["How fast does rocuronium work?", "At 0.6 mg/kg, intubating conditions are achieved in 60–90 s. At the 1.2 mg/kg RSI dose, intubating conditions occur in 45–60 s — the only non-depolarising NMBA with onset comparable to suxamethonium. The faster onset at higher dose reflects rocuronium's relatively low potency: a larger absolute dose creates a steeper plasma-to-effect-site concentration gradient and faster receptor occupancy."],
                ["How is rocuronium reversed?", "By sugammadex, a modified γ-cyclodextrin that encapsulates rocuronium 1:1 and removes it from plasma. Dosing depends on depth of block: 2 mg/kg at reappearance of T2 (routine reversal), 4 mg/kg at post-tetanic count 1–2 (deep block), 16 mg/kg for immediate reversal of a 1.2 mg/kg intubating dose (CICO rescue). Neostigmine 50 µg/kg with glycopyrrolate is an alternative but only when TOF count ≥2."],
                ["What is the TOF target before extubation after rocuronium?", "A quantitative train-of-four ratio of ≥0.9 at the adductor pollicis. Below 0.9 there is clinically significant residual neuromuscular block even when the patient appears awake, with risk of airway obstruction, aspiration and hypoxaemia. Clinical signs such as head-lift and grip are insensitive to residual block; quantitative monitoring (acceleromyography, electromyography) is the standard of care."],
                ["When should rocuronium be avoided?", "Avoid in known hypersensitivity to rocuronium or other aminosteroid NMBAs. Use with caution and a reduced or titrated dose in severe hepatic failure (prolonged duration), severe renal impairment (eGFR <30, where sugammadex data are also limited), and myasthenia gravis (use one-tenth dose and titrate to TOF). It is not a malignant hyperthermia trigger and is safe in plasma cholinesterase deficiency."],
                ["Is rocuronium safe in pregnancy?", "Rocuronium is the preferred non-depolarising NMBA for obstetric general anaesthesia when suxamethonium is contraindicated, given the availability of sugammadex for emergency reversal. Like other quaternary ammonium NMBAs it does not cross the placenta in clinically significant amounts. Sugammadex is generally considered safe in pregnancy but may transiently lower hormonal contraceptive efficacy for 7 days post-dose."],
              ].map(([name, acceptedAnswer]) => ({
                "@type": "Question",
                name,
                acceptedAnswer: { "@type": "Answer", text: acceptedAnswer },
              })),
            })}</script>
          </Helmet>

          <div className="prose prose-slate max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
              <p className="text-foreground/90 leading-relaxed">
                <strong>Rocuronium bromide</strong> is the most widely used non-depolarising neuromuscular blocking drug
                (NMBD) in modern anaesthesia. It is an <strong>aminosteroid</strong>, monoquaternary ammonium compound
                derived from vecuronium with deliberately reduced potency to accelerate onset. Combined with the
                availability of <Link to="/pharmacology/muscle-relaxants" className="text-pharmacology underline">sugammadex</Link>
                {" "}for rapid encapsulation reversal, rocuronium has largely displaced suxamethonium for rapid sequence
                induction in many UK departments. This page focuses on the dose, onset, TOF monitoring and reversal of
                rocuronium for FRCA Primary pharmacology.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground">Mechanism of Action</h2>
              <p className="text-foreground/90 leading-relaxed">
                Rocuronium is a <strong>competitive antagonist</strong> at the α-subunits of the postjunctional
                nicotinic acetylcholine receptor (nAChR) at the motor end-plate. By blocking acetylcholine binding it
                prevents end-plate depolarisation and propagation of the muscle action potential, producing flaccid
                paralysis without fasciculations. Block is characterised by <strong>fade on TOF</strong> and
                <strong> post-tetanic potentiation</strong>, both reversible — by neostigmine when block is shallow, or
                by sugammadex at any depth.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground">Dose, Onset & Duration</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2 text-foreground">Indication</th>
                      <th className="text-left p-2 text-foreground">Dose (IV)</th>
                      <th className="text-left p-2 text-foreground">Onset</th>
                      <th className="text-left p-2 text-foreground">Clinical duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Tracheal intubation", "0.6 mg/kg (2× ED₉₅)", "60–90 s", "30–45 min"],
                      ["Rapid sequence induction (RSI)", "1.0–1.2 mg/kg", "45–60 s", "60–70 min"],
                      ["Maintenance bolus", "0.15 mg/kg", "—", "15–25 min"],
                      ["Continuous infusion", "5–10 µg/kg/min", "—", "Titrate to TOF count 1–2"],
                      ["Paediatric (≥1 month)", "0.6 mg/kg", "60 s", "30–40 min"],
                    ].map(([ind, dose, onset, dur]) => (
                      <tr key={ind} className="border-b border-border/50">
                        <td className="p-2 text-foreground font-medium">{ind}</td>
                        <td className="p-2 text-muted-foreground">{dose}</td>
                        <td className="p-2 text-muted-foreground">{onset}</td>
                        <td className="p-2 text-muted-foreground">{dur}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-4">
                <p className="text-sm text-foreground/90">
                  <strong>Why does a bigger dose give a faster onset?</strong> Rocuronium has a relatively low potency
                  (ED₉₅ ~0.3 mg/kg vs vecuronium 0.05 mg/kg). A larger absolute dose creates a steeper
                  plasma–effect-site concentration gradient, driving more rapid diffusion across the NMJ and faster
                  receptor occupancy. At 1.2 mg/kg, intubating conditions are achieved in ~45–60 s — making rocuronium
                  the only non-depolarising NMBA suitable for true RSI.
                </p>
              </div>
              <div className="mt-6 bg-card rounded-xl border border-border p-6">
                <NMBATimelineDiagram />
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground">Pharmacokinetics & Elimination</h2>
              <ul className="list-disc list-inside text-foreground/90 leading-relaxed space-y-1">
                <li><strong>Vd</strong>: ~0.25 L/kg (extracellular fluid — highly charged quaternary ammonium).</li>
                <li><strong>Protein binding</strong>: ~30% (mainly albumin).</li>
                <li><strong>Metabolism</strong>: minimal — &lt;5% to 17-desacetylrocuronium (weakly active).</li>
                <li><strong>Excretion</strong>: hepatic uptake then biliary excretion (~70%); renal (~30%).</li>
                <li><strong>Clearance</strong>: ~4 mL/kg/min — prolonged in hepatic failure, lesser effect in renal failure.</li>
                <li><strong>Elimination t½</strong>: ~70–90 min.</li>
                <li><strong>Crosses placenta</strong>: clinically insignificant amount — safe in obstetrics.</li>
                <li><strong>BBB</strong>: does not cross — no sedative or analgesic effect.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground">TOF Monitoring & Block Titration</h2>
              <p className="text-foreground/90 leading-relaxed">
                Quantitative neuromuscular monitoring is the standard of care. Apply electrodes over the ulnar nerve at
                the wrist and measure the response at the adductor pollicis (acceleromyography or electromyography).
                Different stimulation patterns suit different depths of block:
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mt-3">
                <div className="rounded-lg border border-border bg-card p-3">
                  <p className="text-sm font-semibold text-foreground mb-1">Train-of-four (TOF)</p>
                  <ul className="text-xs text-muted-foreground list-disc list-inside space-y-0.5">
                    <li>4 supramaximal stimuli at 2 Hz over 2 s</li>
                    <li>TOF count = number of palpable twitches (0–4)</li>
                    <li>TOF ratio = T4/T1; ≥0.9 = safe extubation</li>
                    <li>Best for moderate–light block titration and reversal</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-border bg-card p-3">
                  <p className="text-sm font-semibold text-foreground mb-1">Post-tetanic count (PTC)</p>
                  <ul className="text-xs text-muted-foreground list-disc list-inside space-y-0.5">
                    <li>5 s tetanus at 50 Hz, then 1 Hz single twitches</li>
                    <li>Use when TOF count = 0 (deep / intense block)</li>
                    <li>PTC 0 = profound block; PTC 1–2 = deep block</li>
                    <li>Sugammadex 4 mg/kg reverses PTC 1–2</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-border bg-card p-3">
                  <p className="text-sm font-semibold text-foreground mb-1">Double-burst stimulation (DBS)</p>
                  <ul className="text-xs text-muted-foreground list-disc list-inside space-y-0.5">
                    <li>Two short 50 Hz bursts, 750 ms apart</li>
                    <li>Tactile detection of fade easier than TOF</li>
                    <li>Still inferior to quantitative TOF for residual block</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-border bg-card p-3">
                  <p className="text-sm font-semibold text-foreground mb-1">Depth-of-block reference</p>
                  <ul className="text-xs text-muted-foreground list-disc list-inside space-y-0.5">
                    <li>Intense: PTC 0 — no neostigmine</li>
                    <li>Deep: PTC ≥1, TOF 0 — sugammadex 4 mg/kg</li>
                    <li>Moderate: TOF 1–3 — sugammadex 2 mg/kg at T2 or neostigmine</li>
                    <li>Recovery: TOF ratio ≥0.9 required to extubate</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 bg-card rounded-xl border border-border p-6">
                <TOFPatternDiagram />
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground">Reversal with Sugammadex</h2>
              <p className="text-foreground/90 leading-relaxed">
                <strong>Sugammadex</strong> is a modified γ-cyclodextrin that forms a 1:1 host–guest complex with
                rocuronium (and to a lesser extent vecuronium), encapsulating the drug and removing it from plasma.
                Free rocuronium diffuses out of the NMJ down the new concentration gradient, restoring neuromuscular
                function within 2–3 minutes — at <em>any</em> depth of block, unlike neostigmine.
              </p>
              <div className="overflow-x-auto mt-3">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2 text-foreground">Depth of block</th>
                      <th className="text-left p-2 text-foreground">Sugammadex dose</th>
                      <th className="text-left p-2 text-foreground">Expected time to TOF ≥0.9</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Routine reversal (T2 reappeared)", "2 mg/kg", "~2 min"],
                      ["Deep block (PTC 1–2, TOF 0)", "4 mg/kg", "~3 min"],
                      ["Immediate reversal of 1.2 mg/kg RSI dose", "16 mg/kg", "~1.5–3 min"],
                    ].map(([d, dose, t]) => (
                      <tr key={d} className="border-b border-border/50">
                        <td className="p-2 text-foreground font-medium">{d}</td>
                        <td className="p-2 text-muted-foreground">{dose}</td>
                        <td className="p-2 text-muted-foreground">{t}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
                <p className="text-sm font-medium text-foreground">Sugammadex caveats</p>
                <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside space-y-0.5">
                  <li>Inactivates hormonal contraceptives for 7 days — counsel and document.</li>
                  <li>Anaphylaxis ~1:2500; rare bradycardia, bronchospasm.</li>
                  <li>Avoid in severe renal impairment (eGFR &lt;30) — limited data.</li>
                  <li>Re-paralysis within 24 h after sugammadex requires a benzylisoquinolinium (e.g. cisatracurium) or much larger rocuronium dose.</li>
                </ul>
              </div>
              <div className="mt-6">
                <SugammadexDiagram />
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground">Adverse Effects</h2>
              <ul className="list-disc list-inside text-foreground/90 leading-relaxed space-y-1">
                <li><strong>Anaphylaxis</strong>: ~1:2500–1:5000 — with suxamethonium, the commonest NMBA trigger of perioperative anaphylaxis in NAP6. Hypotension dominates the presentation and bronchospasm occurs in roughly half of cases<InlineRef topicId="rocuronium" refLabel="NAP6 2018" />.</li>
                <li><strong>Pain on injection</strong>: ~50–80% of awake patients; mitigated by lidocaine pre-treatment or post-induction administration.</li>
                <li><strong>Histamine release</strong>: clinically insignificant (vs benzylisoquinoliniums).</li>
                <li><strong>Not</strong> a malignant hyperthermia trigger; safe in plasma cholinesterase deficiency.</li>
              </ul>
              <div className="grid md:grid-cols-2 gap-3 mt-4 text-sm">
                <div className="rounded-lg border border-border bg-card p-4">
                  <p className="font-semibold text-foreground mb-1">Cardiovascular effects</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>At clinical doses rocuronium is essentially cardiostable — no ganglion blockade and no significant histamine release, so blood pressure and systemic vascular resistance are maintained.</li>
                    <li>Weak vagolytic (M₂ antagonist) activity at high doses (≥0.9–1.2 mg/kg) may cause a modest rise in heart rate of about 5–10 beats/min; this is far less than pancuronium.</li>
                    <li>Any marked tachycardia, hypotension or cardiovascular collapse after rocuronium should be treated as anaphylaxis rather than a direct drug effect.</li>
                    <li>Because rocuronium does not blunt the sympathetic response to laryngoscopy, an opioid or additional induction agent is still needed in patients where hypertension is hazardous.</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <p className="font-semibold text-foreground mb-1">Respiratory effects</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Complete apnoea from diaphragmatic and intercostal paralysis — ventilation must always be controlled.</li>
                    <li>Bronchospasm is uncommon as a direct effect (minimal histamine release) but is a leading feature of rocuronium anaphylaxis; consider it in the differential for high airway pressures after induction.</li>
                    <li>Residual block (TOF ratio &lt;0.9) causes pharyngeal dysfunction, impaired airway protection, hypoxaemia and post-operative pulmonary complications — quantitative monitoring and full reversal are mandatory.</li>
                    <li>Rapid loss of upper airway tone contributes to airway collapse if mask ventilation is difficult; a plan for failed intubation (including sugammadex 16 mg/kg for immediate reversal) is essential.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground">Factors Potentiating Rocuronium Block</h2>
              <div className="grid md:grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-border bg-card p-4">
                  <p className="font-semibold text-foreground mb-1">Physiological and metabolic</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Hypothermia — reduced hepatic clearance and slowed receptor kinetics.</li>
                    <li>Respiratory acidosis and metabolic acidosis.</li>
                    <li>Hypokalaemia, hypocalcaemia and hypermagnesaemia (magnesium reduces pre-junctional ACh release — obstetric patients on magnesium need markedly reduced doses).</li>
                    <li>Hepatic failure (main route of elimination) and severe renal impairment (about 30% renal excretion) both prolong duration.</li>
                    <li>Elderly patients: reduced hepatic blood flow and muscle mass slow onset and prolong recovery.</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <p className="font-semibold text-foreground mb-1">Drugs and disease</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Volatile anaesthetics (desflurane &gt; sevoflurane &gt; isoflurane &gt; nitrous oxide/TIVA) — dose-dependent potentiation.</li>
                    <li>Aminoglycoside, polymyxin, clindamycin and tetracycline antibiotics.</li>
                    <li>Local anaesthetics, magnesium sulphate, lithium, dantrolene, calcium channel blockers.</li>
                    <li>Prior suxamethonium increases the intensity of subsequent non-depolarising block.</li>
                    <li>Myasthenia gravis (marked sensitivity — use a fraction of the dose with quantitative monitoring), Eaton–Lambert syndrome, muscular dystrophies, critical illness myopathy.</li>
                    <li><strong>Resistance</strong> instead occurs in burns (&gt;24 h), chronic anticonvulsant therapy, prolonged immobilisation and upper motor neurone lesions from receptor upregulation.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground">Use in Intensive Care</h2>
              <p className="text-foreground/90 leading-relaxed">
                Rocuronium is used in critical care for tracheal intubation (1.0–1.2 mg/kg for rapid sequence induction, where it is
                the alternative to suxamethonium in hyperkalaemia, burns, spinal cord injury and malignant hyperthermia
                susceptibility) and occasionally by infusion (typically 0.3–0.6 mg/kg/h) for severe ventilator dyssynchrony,
                therapeutic hypothermia, raised intracranial pressure or prone positioning.
              </p>
              <ul className="list-disc list-inside text-foreground/90 leading-relaxed mt-3 space-y-1">
                <li><strong>Choice of agent:</strong> cisatracurium is generally preferred for prolonged infusions because organ-independent Hofmann elimination avoids accumulation; rocuronium accumulates in hepatic and renal failure, giving unpredictably prolonged paralysis.</li>
                <li><strong>Evidence for infusions in ARDS:</strong> the ROSE trial found no mortality benefit from early continuous neuromuscular blockade with a high-PEEP strategy compared with lighter sedation, so infusions are now reserved for specific indications rather than routine use<InlineRef topicId="rocuronium" refLabel="ROSE 2019" />.</li>
                <li><strong>Mandatory co-interventions:</strong> deep sedation and analgesia (a paralysed patient cannot signal awareness), eye care, pressure area and thromboprophylaxis, and secure ventilator alarms — accidental disconnection is rapidly fatal.</li>
                <li><strong>Monitoring:</strong> daily interruption and quantitative TOF (target 1–2 twitches) to use the minimum effective dose; deep prolonged block increases the risk of ICU-acquired weakness and critical illness neuromyopathy, especially with corticosteroids and hyperglycaemia.</li>
                <li><strong>Reversal:</strong> sugammadex 16 mg/kg reverses profound block within 3 min and is the rescue option in a can't intubate, can't oxygenate scenario; standard reversal doses are 2 mg/kg (TOF count ≥2) and 4 mg/kg (post-tetanic count 1–2).</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-serif font-bold text-foreground">Indications & Contraindications</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-card p-3">
                  <p className="text-sm font-semibold text-foreground mb-1">Indications</p>
                  <ul className="text-xs text-muted-foreground list-disc list-inside space-y-0.5">
                    <li>Tracheal intubation for elective surgery</li>
                    <li>RSI when suxamethonium is contraindicated</li>
                    <li>Maintenance of relaxation for abdominal/thoracic surgery</li>
                    <li>ICU intubation (with sugammadex available)</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-border bg-card p-3">
                  <p className="text-sm font-semibold text-foreground mb-1">Cautions / contraindications</p>
                  <ul className="text-xs text-muted-foreground list-disc list-inside space-y-0.5">
                    <li>Known aminosteroid NMBA hypersensitivity</li>
                    <li>Severe hepatic failure — prolonged duration</li>
                    <li>Severe renal impairment (eGFR &lt;30) — sugammadex caution</li>
                    <li>Myasthenia gravis — use ~10% of normal dose, titrate to TOF</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-10" id="faq">
              <h2 className="text-2xl font-serif font-bold text-foreground">Frequently Asked Questions</h2>
              <div className="space-y-4 mt-3">
                {[
                  { q: "What is the dose of rocuronium for intubation?", a: "0.6 mg/kg IV (2× ED₉₅) for routine intubation: onset 60–90 s, duration 30–45 min. For rapid sequence induction the dose is 1.0–1.2 mg/kg: onset 45–60 s, duration 60–70 min. Maintenance infusion is 5–10 µg/kg/min titrated to TOF." },
                  { q: "How fast does rocuronium work?", a: "At 0.6 mg/kg, intubating conditions occur in 60–90 s. At the 1.2 mg/kg RSI dose, intubating conditions occur in 45–60 s — comparable to suxamethonium 1.5 mg/kg, and the only non-depolarising NMBA fast enough for true RSI. The faster onset at higher dose reflects rocuronium's relatively low potency, which creates a steep plasma-to-effect-site gradient." },
                  { q: "How is rocuronium reversed?", a: "By sugammadex, a modified γ-cyclodextrin that encapsulates rocuronium 1:1. Dose by depth: 2 mg/kg at reappearance of T2 (routine), 4 mg/kg at PTC 1–2 (deep block), 16 mg/kg for immediate reversal of a 1.2 mg/kg intubating dose. Neostigmine 50 µg/kg with glycopyrrolate is an alternative only at TOF count ≥2." },
                  { q: "What is the TOF target before extubation after rocuronium?", a: "A quantitative train-of-four ratio of ≥0.9 at the adductor pollicis. Below 0.9 there is clinically significant residual block despite an apparently awake patient. Clinical signs like head-lift and grip are insensitive to residual paralysis; quantitative monitoring is the standard of care." },
                  { q: "When should rocuronium be avoided?", a: "Avoid in known aminosteroid hypersensitivity. Use with caution and titrate in severe hepatic failure, severe renal impairment (eGFR <30, where sugammadex is also limited) and myasthenia gravis (use ~10% of normal dose). Rocuronium is not an MH trigger and is safe in plasma cholinesterase deficiency." },
                  { q: "Is rocuronium safe in pregnancy?", a: "Yes. Rocuronium is the preferred non-depolarising NMBA for obstetric general anaesthesia when suxamethonium is contraindicated, because sugammadex is available for immediate reversal. It does not cross the placenta in clinically significant amounts. Sugammadex may transiently lower hormonal contraceptive efficacy for 7 days post-dose." },
                ].map((item) => (
                  <details key={item.q} className="group rounded-lg border border-border bg-card p-4">
                    <summary className="cursor-pointer font-semibold text-foreground">{item.q}</summary>
                    <p className="mt-2 text-foreground/90 leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <ExamPitfallsCallout
              accent="pharmacology"
              pitfalls={[
                "Don't give neostigmine at TOF count 0 — it cannot reverse deep block and risks recurarisation.",
                "Confirm reversal with quantitative TOF ≥0.9; clinical signs miss residual paralysis.",
                "After sugammadex, re-paralysis within 24 h requires cisatracurium (or much larger rocuronium dose).",
                "Sugammadex inactivates hormonal contraceptives for 7 days — counsel and document.",
                "Anaphylaxis is the second commonest NMBA cause after suxamethonium (NAP6) — have a structured plan.",
                "Myasthenia gravis: start at ~10% of normal dose and titrate to TOF.",
              ]}
            />
          </div>
        <AnaesthesiaDosingCallout focus="rocuronium dosing and sugammadex reversal" />
        </ExamSection>
      }
    />
  );
};

export default RocuroniumTopic;
