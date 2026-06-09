import { TopicTemplate } from "@/components/TopicTemplate";
import { WorkedExample } from "@/components/WorkedExamples";
import { ExamSection } from "@/components/ExamSection";
import { SynthesisBlock } from "@/components/SynthesisBlock";
import { InlineRef } from "@/components/InlineRef";
import { ivAnaestheticsQuiz } from "@/data/quizzes";
import IVAnaestheticStructures from "@/components/diagrams/IVAnaestheticStructures";
import { PropofolTCISimulatorDiagram } from "@/components/diagrams/PropofolTCISimulatorDiagram";
import { PRISDiagram } from "@/components/diagrams/PRISDiagram";
import { SchniderEleveldDiagram } from "@/components/diagrams/SchniderEleveldDiagram";
import { KetaminePharmacologyDiagram } from "@/components/diagrams/KetaminePharmacologyDiagram";
import { DexmedetomidineDiagram } from "@/components/diagrams/DexmedetomidineDiagram";
import { EtomidatePharmacologyDiagram } from "@/components/diagrams/EtomidatePharmacologyDiagram";
import { MidazolamPharmacologyDiagram } from "@/components/diagrams/MidazolamPharmacologyDiagram";
import { BenzodiazepineComparisonDiagram } from "@/components/diagrams/BenzodiazepineComparisonDiagram";
import { FlumazenilDiagram } from "@/components/diagrams/FlumazenilDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const workedExamples: WorkedExample[] = [
  {
    title: "Designing a TIVA technique for a long spine case in a young patient",
    scenario:
      "A 28-year-old, 70 kg patient is having a 6-hour posterior spinal fusion with intraoperative neuromonitoring (motor and somatosensory evoked potentials). Plan a TIVA technique and outline the monitoring and risks.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Choose TIVA because volatile agents at &gt;0.5 MAC abolish motor evoked potentials. TIVA with propofol + remifentanil preserves SSEP/MEP signals.</li>
          <li>Use TCI propofol (Schnider or Marsh; effect-site target 3–4 µg/mL) and TCI remifentanil (Minto; effect-site 3–6 ng/mL). Titrate to processed EEG (BIS 40–60).</li>
          <li>Insert a dedicated, well-secured IV with anti-reflux/anti-siphon valves; pump alarms set; pump line visible throughout.</li>
          <li>Avoid PRIS: keep propofol infusion &lt;4 mg/kg/h for &gt;48 h, ensure adequate carbohydrate and oxygen delivery, monitor lactate, CK, pH and triglycerides for long cases.</li>
          <li>Plan emergence: stop remifentanil last to provide a smooth wake-up; pre-emptive long-acting analgesia (morphine, paracetamol, dexamethasone, regional/wound infiltration) given before remifentanil is stopped to prevent acute opioid-induced hyperalgesia.</li>
          <li>Document: cumulative propofol dose, depth-of-anaesthesia trace, awareness check on emergence (AAGBI Safe TIVA standards).</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Running &gt;4 mg/kg/h propofol for prolonged surgery → PRIS.</li>
            <li>Failing to bolus long-acting opioid before remi is stopped → severe acute pain and hyperalgesia.</li>
            <li>Omitting depth-of-anaesthesia monitoring with TIVA — explicit recommendation in AAGBI safe-practice guideline.</li>
          </ul>
        </div>
      </div>
    ),
    answer: "TIVA with TCI propofol (Schnider, 3–4 µg/mL) + TCI remifentanil (Minto, 3–6 ng/mL), titrated to BIS 40–60, with secure dedicated IV access and processed EEG. Keep propofol <4 mg/kg/h, monitor for PRIS biochemistry on long cases, and load long-acting analgesia before stopping remifentanil. This preserves intraoperative MEP/SSEP signals where volatiles would not.",
    cites: ["AAGBI 2018","Peck & Hill Ch.6"],
  },
];
const IVAnaestheticsTopic = () => {
  return (
    <TopicTemplate
      title="Intravenous Anaesthetic Agents"
      subtitle="FRCA Primary — Pharmacology"
      backPath="/pharmacology"
      backLabel="Pharmacology"
      accentColor="text-pharmacology"
      topicId="iv-anaesthetics"
      topicTitle="Intravenous Anaesthetic Agents"
      quizQuestions={ivAnaestheticsQuiz}
      objectives={[
        "Compare propofol, thiopentone, ketamine, etomidate, midazolam and dexmedetomidine by mechanism, dose, CVS/RS effects",
        "Explain TCI pharmacokinetic models (Marsh, Schnider, Eleveld) and effect-site targeting",
        "Recognise and manage propofol infusion syndrome (PRIS) — thresholds, mechanism, treatment",
        "Describe benzodiazepine receptor pharmacology (α/γ subunits) and the role of flumazenil",
        "Justify drug choice in compromised patients (etomidate in CV instability, ketamine in tamponade/asthma)",
      ]}
      keyPoints={[
        { text: "Propofol: GABA_A agonist. Causes hypotension (vasodilation + myocardial depression). Antiemetic. Pain on injection. Lipid emulsion supports bacterial growth.", cites: ["BJA Educ 2014"] },
        { text: "Thiopentone: alkaline pH 10.5 — tissue necrosis risk. Absolute contraindication in porphyria. Potent anticonvulsant.", cites: ["Miller Ch.26"] },
        { text: "Ketamine: NMDA antagonist. Only IV agent with significant analgesia. Indirect sympathomimetic. Emergence phenomena. Bronchodilator.", cites: ["Peck & Hill Ch.5"] },
        { text: "Etomidate: most haemodynamically stable agent. Inhibits 11β-hydroxylase (adrenal suppression for ~24h even after single dose).", cites: ["BJA Educ 2014"] },
        { text: "All IV agents (except ketamine) cause dose-dependent respiratory depression and apnoea.", cites: ["Miller Ch.26"] },
        { text: "TCI models: Marsh (weight-based), Schnider (age, weight, height, LBM), Eleveld (universal — neonates to elderly).", cites: ["Peck & Hill Ch.5"] },
        { text: "PRIS: >4 mg/kg/h for >48h — metabolic acidosis, rhabdomyolysis, cardiovascular collapse. Stop infusion, supportive care.", cites: ["BJA Educ 2014"] },
      ]}
      workedExamples={workedExamples}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY], curriculumCodes: ["PR_BK_05"] },
        keyPoints: { exams: [Exam.PRIMARY], curriculumCodes: ["PR_BK_05"] },
      }}
      sectionSources={{
        objectives: ["BJA Educ 2014", "Peck & Hill Ch.5", "Miller Ch.26"],
        keyPoints: ["BJA Educ 2014", "Peck & Hill Ch.5", "Miller Ch.26"],
        workedExamples: ["AAGBI 2018", "Peck & Hill Ch.6"],
      }}
      coreConcepts={
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
        <div className="prose prose-slate max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
          <p className="text-foreground/90 leading-relaxed">
            Intravenous anaesthetic agents are used for induction and maintenance of general anaesthesia, as well as sedation.
            Understanding their mechanisms, pharmacokinetics, and clinical profiles is a core FRCA topic. The primary agents
            in current practice are propofol, thiopentone, ketamine, and etomidate.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Propofol</h2>
          <p className="text-foreground/90 leading-relaxed">
            <strong>2,6-diisopropylphenol</strong> in a lipid emulsion (soybean oil, egg lecithin, glycerol). Induction dose
            1.5–2.5 mg/kg<InlineRef topicId="iv-anaesthetics" refLabel="Peck & Hill Ch.5" />. Onset 30–40 s (one arm-brain circulation time). Duration ~5–10 min (redistribution). pKa 11 —
            almost entirely un-ionised at physiological pH.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Mechanism</strong>: enhances GABA_A receptor activity<InlineRef topicId="iv-anaesthetics" refLabel="BJA Educ 2014" />. <strong>CVS</strong>: dose-dependent hypotension
            (vasodilation + myocardial depression), reduced baroreflex sensitivity. <strong>RS</strong>: apnoea, respiratory
            depression. <strong>CNS</strong>: anticonvulsant, antiemetic, reduces CMRO₂ and ICP. <strong>Other</strong>: pain
            on injection (attenuated by lidocaine), supports bacterial growth — discard after 6 hours.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">TIVA & TCI</p>
            <p className="text-sm text-muted-foreground mt-1">
              Target-controlled infusion (TCI) uses pharmacokinetic models (Marsh — weight-based; Schnider — age, weight, height,
              LBM) to achieve and maintain a target plasma or effect-site concentration. Propofol is ideal for TIVA due to its
              short context-sensitive half-time at moderate infusion durations.
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-serif font-bold text-foreground mb-3">Interactive 3-Compartment TCI Simulator</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Adjust bolus, infusion rate, and patient covariates to see how the Marsh and Schnider models predict plasma (Cp)
              and effect-site (Ce) concentration over time. Note the hysteresis between Cp and Ce — the rationale for effect-site
              targeting.
            </p>
            <div className="bg-card rounded-xl border border-border p-4">
              <PropofolTCISimulatorDiagram />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-serif font-bold text-foreground mb-3">Propofol Infusion Syndrome (PRIS)</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              A rare but often fatal complication of prolonged, high-dose propofol infusion. Propofol inhibits the mitochondrial
              electron transport chain and fatty-acid β-oxidation, producing metabolic acidosis, rhabdomyolysis, and
              cardiovascular collapse. Classic thresholds are <strong>&gt; 4 mg/kg/h for &gt; 48 h</strong>, but it can occur with
              shorter exposures in susceptible patients<InlineRef topicId="iv-anaesthetics" refLabel="BJA Educ 2014" />.
            </p>
            <PRISDiagram />
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-serif font-bold text-foreground mb-3">Schnider vs Eleveld — General-Purpose TCI</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              The Eleveld model (2018) is a single propofol model derived from a pooled dataset of more than 1,000 subjects
              ranging from neonates to the very elderly and BMI 12–52. It uses allometric scaling, a maturation function, and
              fat-free mass — replacing the need to choose between Schnider, Marsh and paediatric models. Compare the two side
              by side at population extremes.
            </p>
            <SchniderEleveldDiagram />
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-serif font-bold text-foreground mb-3">Why patients move more often on TIVA than volatile anaesthesia</h3>
            <p className="text-foreground/90 leading-relaxed mb-3">
              Intra-operative movement is consistently reported more frequently with propofol TIVA than with an equivalent
              MAC-guided volatile technique. The difference is not because propofol is a "weaker" hypnotic — it is because of
              <strong> where each class of agent acts to produce immobility</strong> and <strong>how reliably we can measure
              an adequate dose</strong> at the bedside.
            </p>
            <ul className="space-y-2 text-foreground/90 leading-relaxed list-disc list-inside">
              <li>
                <strong>Site of immobility.</strong> Volatile agents produce immobility largely at the <em>spinal cord</em>
                (glycine and GABA_A receptors, and inhibition of dorsal-horn transmission). Propofol's anti-nociceptive and
                immobilising effect is predominantly <em>supraspinal</em>; at hypnotic concentrations the spinal motor
                response to noxious stimulus is comparatively preserved.
              </li>
              <li>
                <strong>No agreed "MAC" for propofol.</strong> With volatiles, end-tidal monitoring lets you titrate to a
                known ED₅₀ (and run 1.2–1.3 MAC for surgical stimulation). With TIVA you target a modelled plasma or
                effect-site concentration — population PK models (Marsh, Schnider, Eleveld) carry a typical bias of
                20–30%, so the actual Ce can be well below the value displayed.
              </li>
              <li>
                <strong>Pharmacokinetic variability.</strong> Volume of distribution, clearance, body composition,
                cardiac output and drug interactions all shift the true Ce. An obese, high-cardiac-output or
                enzyme-induced patient may sit substantially below the target Ce — and therefore move — without any change
                on the pump display.
              </li>
              <li>
                <strong>Hysteresis and effect-site lag.</strong> After a step-up in target, equilibration between plasma
                and effect site takes minutes. If surgical stimulus increases before Ce catches up (skin incision,
                laryngoscopy, peritoneal traction), the patient can move despite an "adequate" target.
              </li>
              <li>
                <strong>Loss of opioid synergy.</strong> Propofol provides little intrinsic analgesia, so adequate
                immobility on TIVA is highly dependent on a co-administered opioid (typically remifentanil). Under-dosing
                or pump occlusion of the opioid line is a classic cause of intra-operative movement on TIVA.
              </li>
              <li>
                <strong>Equipment failure modes.</strong> Volatile delivery failures are visible on the vaporiser dial
                and end-tidal trace. TIVA failures (line disconnection, extravasation, three-way tap left off, IV
                cannula tissued) deliver drug into the dressings instead of the patient — the pump runs normally but Ce
                falls rapidly.
              </li>
              <li>
                <strong>No real-time depth marker.</strong> End-tidal volatile concentration is a continuous, validated
                surrogate for brain partial pressure. There is no equivalent for propofol — processed-EEG monitors
                (BIS/Entropy) are the recommended substitute, and the Association of Anaesthetists advises their routine use whenever TIVA is
                combined with neuromuscular blockade<InlineRef topicId="iv-anaesthetics" refLabel="AAGBI 2018" />.
              </li>
            </ul>
            <p className="text-foreground/90 leading-relaxed mt-3">
              <strong>Practical implication:</strong> when running TIVA, pair propofol with a remifentanil infusion (or
              adequate intermittent opioid), use processed-EEG monitoring (especially with NMB), inspect the IV site and
              giving set frequently, and anticipate stimulating moments by raising the effect-site target several minutes
              in advance.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Thiopentone</h2>
          <p className="text-foreground/90 leading-relaxed">
            Thiobarbiturate. Induction dose 3–5 mg/kg<InlineRef topicId="iv-anaesthetics" refLabel="Peck & Hill Ch.5" />. Highly lipid-soluble, rapid onset. Prepared as 2.5% solution (pH 10.5
            — highly alkaline, tissue necrosis if extravasation). Precipitates if mixed with acidic drugs (e.g., suxamethonium,
            atracurium, opioids).
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Mechanism</strong>: GABA_A agonist (opens chloride channel directly at high doses, potentiates at low doses).
            <strong> CVS</strong>: tachycardia (baroreceptor reflex to vasodilation), myocardial depression. <strong>CNS</strong>:
            powerful anticonvulsant, cerebral protectant (reduces CMRO₂). <strong>Other</strong>: porphyria is an absolute
            contraindication. Histamine release. No analgesic properties.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Ketamine</h2>
          <p className="text-foreground/90 leading-relaxed">
            Phencyclidine derivative. <strong>NMDA receptor antagonist</strong>. Dose: 1–2 mg/kg IV, 5–10 mg/kg IM<InlineRef topicId="iv-anaesthetics" refLabel="Peck & Hill Ch.5" />. The
            S(+)-enantiomer is 2× more potent. Produces "dissociative anaesthesia" — catalepsy, analgesia, amnesia with eyes
            open and maintained airway reflexes (relatively).
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>CVS</strong>: indirect sympathomimetic (↑HR, ↑BP, ↑SVR) — useful in haemodynamically compromised patients
            and tamponade. Direct myocardial depressant in catecholamine-depleted states. <strong>RS</strong>: bronchodilator,
            preserves respiratory drive (relatively), increased secretions. <strong>CNS</strong>: raises ICP and IOP. Emergence
            phenomena (hallucinations, vivid dreams) — reduced with benzodiazepines.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Unique Properties</p>
            <p className="text-sm text-muted-foreground mt-1">
              Ketamine is the only IV induction agent that provides significant analgesia. It can be given IM (useful for
              uncooperative patients/children). It has anti-inflammatory properties and is increasingly used in sub-anaesthetic
              doses for chronic pain and treatment-resistant depression.
            </p>
          </div>

          <div className="mt-6">
            <KetaminePharmacologyDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Etomidate</h2>
          <p className="text-foreground/90 leading-relaxed">
            Imidazole derivative. Dose 0.3 mg/kg IV. <strong>Most haemodynamically stable</strong> induction agent — minimal
            effect on HR, BP, or cardiac output. Ideal for patients with limited cardiovascular reserve.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Mechanism</strong>: GABA_A receptor (selective for β₂/β₃ subunit). <strong>Problems</strong>: adrenocortical
            suppression (inhibits 11β-hydroxylase — even a single dose suppresses cortisol for up to 24 hours). Pain on injection.
            Myoclonus (not seizure activity). High incidence of PONV. Not recommended for infusion due to adrenal suppression.
          </p>
          <div className="mt-6">
            <EtomidatePharmacologyDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Midazolam</h2>
          <p className="text-foreground/90 leading-relaxed">
            Water-soluble imidazobenzodiazepine. The diazepine ring is <strong>open and ionised at pH 3.5</strong> (vial),
            making it injectable without solvent; at physiological pH the ring closes and the molecule becomes highly
            lipid-soluble, accounting for its rapid CNS penetration. Doses: sedation 0.05–0.1 mg/kg IV, induction
            0.2–0.3 mg/kg, premed 0.5 mg/kg PO (paeds).
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Mechanism</strong>: positive allosteric modulator at the <strong>α/γ interface of GABA-A</strong>
            receptors — increases <em>frequency</em> of chloride channel opening (barbiturates increase duration). Selectivity
            for α₁-containing receptors mediates sedation, anterograde amnesia and anticonvulsant action; α₂/α₃ mediate
            anxiolysis and muscle relaxation. <strong>CVS</strong>: mild ↓ SVR, well-preserved cardiac output. <strong>RS</strong>:
            dose-dependent respiratory depression, synergistic with opioids.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>PK</strong>: t½ 1.5–2.5 h, Vd 1.0–1.5 L/kg, 96% protein-bound. Hepatic CYP3A4 → α-hydroxy-midazolam
            (10% potency) → UGT-glucuronidation to <strong>α-hydroxy-midazolam-glucuronide</strong>, which is <em>active</em>,
            water-soluble, and <strong>renally excreted</strong>. In AKI/CKD the glucuronide accumulates → prolonged sedation
            for days after stopping an infusion. <strong>Reversal</strong>: flumazenil 200 µg + 100 µg/min titrated; t½
            shorter than midazolam → resedation likely.
          </p>
          <div className="mt-6">
            <MidazolamPharmacologyDiagram />
          </div>
          <div className="mt-6">
            <BenzodiazepineComparisonDiagram />
          </div>
          <div className="mt-6">
            <FlumazenilDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Dexmedetomidine</h2>
          <p className="text-foreground/90 leading-relaxed">
            Highly selective <strong>α₂-adrenergic agonist</strong> (α₂ : α₁ ≈ 1620 : 1) — the dextro-isomer of medetomidine.
            Acts at pre-synaptic α₂A autoreceptors in the <strong>locus coeruleus</strong>, reducing noradrenaline release and
            disinhibiting the ventrolateral preoptic nucleus (VLPO). The result is a <strong>NREM-stage-2-like sedation</strong> —
            patients are easily roused, follow commands, and have minimal respiratory depression.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Dosing (Dexdor)</strong>: maintenance infusion 0.2–1.4 µg/kg/h titrated to RASS. Optional loading dose
            1 µg/kg over 10 min produces a transient hypertensive peak (peripheral α₂B vasoconstriction) followed by hypotension
            and bradycardia (central α₂A) — the characteristic <strong>biphasic BP response</strong>. Slow infusion without a
            bolus avoids the initial hypertension.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Other uses</strong>: awake fibre-optic intubation, regional block adjunct, paediatric premedication
            (intranasal), opioid/alcohol withdrawal. <strong>SPICE-III (2019)</strong> showed non-inferior 90-day mortality vs
            standard sedation, with more ventilator-free days and less delirium. Cautions: bradycardia, hypotension, hepatic
            dysfunction (reduce dose), and rebound hypertension on prolonged-use cessation.
          </p>
          <div className="mt-6">
            <DexmedetomidineDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Remimazolam</h2>
          <p className="text-foreground/90 leading-relaxed">
            Ultra-short-acting ester-based benzodiazepine (Byfavo), granted UK marketing authorisation by the MHRA in
            2021 for procedural sedation in adults<InlineRef topicId="iv-anaesthetics" refLabel="MHRA Byfavo 2021" />.
            Designed as a "soft drug": a methyl ester side-chain is rapidly hydrolysed by non-specific tissue
            carboxylesterases (predominantly CES-1A) to an inactive carboxylic-acid metabolite (CNS7054), giving a
            short, predictable offset that is largely independent of infusion duration and of hepatic/renal
            function<InlineRef topicId="iv-anaesthetics" refLabel="BJA Educ Remimazolam" />.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Mechanism</strong>: positive allosteric modulator at the α/γ interface of GABA-A receptors —
            identical site to midazolam, increasing chloride-channel <em>opening frequency</em>. <strong>Dosing
            (procedural sedation)</strong>: 5–7 mg IV bolus over 1 min, then 2.5 mg top-ups (≥2 min apart) to effect;
            onset ~1–3 min, clinical duration ~10 min after a single bolus. <strong>PK</strong>: context-sensitive
            half-time ≈ 7–8 min even after prolonged infusion; Vd ~0.9 L/kg; clearance ~70 L/h, independent of CYP
            metabolism.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>CVS/RS</strong>: less hypotension than propofol and less respiratory depression than midazolam,
            but both occur dose-dependently and are synergistic with opioids. <strong>Reversal</strong>: fully
            antagonised by flumazenil (resedation possible because flumazenil's t½ is shorter than the active drug
            window when high doses have been used). <strong>Niche</strong>: examinable as a new UK IV agent with a
            unique esterase-based metabolic profile — useful where rapid, predictable recovery is needed in frail,
            renally or hepatically impaired patients<InlineRef topicId="iv-anaesthetics" refLabel="BJA Educ Remimazolam" />.
          </p>
        </section>


        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Comparative Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 text-foreground">Agent</th>
                  <th className="text-left p-2 text-foreground">Dose (mg/kg)</th>
                  <th className="text-left p-2 text-foreground">Mechanism</th>
                  <th className="text-left p-2 text-foreground">Key Feature</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="p-2 text-foreground font-medium">Propofol</td>
                  <td className="p-2 text-muted-foreground">1.5–2.5</td>
                  <td className="p-2 text-muted-foreground">GABA_A</td>
                  <td className="p-2 text-muted-foreground">Antiemetic, TCI-compatible</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-2 text-foreground font-medium">Thiopentone</td>
                  <td className="p-2 text-muted-foreground">3–5</td>
                  <td className="p-2 text-muted-foreground">GABA_A</td>
                  <td className="p-2 text-muted-foreground">Anticonvulsant, avoid in porphyria</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-2 text-foreground font-medium">Ketamine</td>
                  <td className="p-2 text-muted-foreground">1–2 IV</td>
                  <td className="p-2 text-muted-foreground">NMDA antagonist</td>
                  <td className="p-2 text-muted-foreground">Analgesic, sympathomimetic, IM route</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="p-2 text-foreground font-medium">Etomidate</td>
                  <td className="p-2 text-muted-foreground">0.3</td>
                  <td className="p-2 text-muted-foreground">GABA_A (β₂/β₃)</td>
                  <td className="p-2 text-muted-foreground">CV stability, adrenal suppression</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      <SynthesisBlock
        title="IV Induction Agents — Side-by-Side"
        subtitle="The high-yield comparison across the four FRCA induction agents."
        variant="table"
      >
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="text-left p-2 text-foreground font-semibold">Agent</th>
              <th className="text-left p-2 text-foreground font-semibold">Induction dose</th>
              <th className="text-left p-2 text-foreground font-semibold">CVS</th>
              <th className="text-left p-2 text-foreground font-semibold">Distinguishing feature</th>
            </tr>
          </thead>
          <tbody className="text-foreground/90">
            {[
              ["Propofol", "1.5–2.5 mg/kg", "↓ MAP, ↓ SVR, ↓ contractility", "Pain on injection; PRIS in prolonged high-dose infusion"],
              ["Thiopentone", "3–5 mg/kg", "↓ MAP, venodilation", "Anti-convulsant; avoid in porphyria; intra-arterial = arteritis"],
              ["Etomidate", "0.3 mg/kg", "Cardiostable", "Adrenal suppression even after single dose; avoid in sepsis"],
              ["Ketamine", "1–2 mg/kg IV / 5–10 mg/kg IM", "↑ HR, ↑ BP (sympathomimetic)", "Bronchodilator, analgesic; emergence phenomena; ↑ICP debated"],
            ].map(([agent, dose, cvs, feat]) => (
              <tr key={agent as string} className="border-b border-border/50">
                <td className="p-2 font-medium">{agent}</td>
                <td className="p-2 text-muted-foreground">{dose}</td>
                <td className="p-2 text-muted-foreground">{cvs}</td>
                <td className="p-2 text-muted-foreground">{feat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SynthesisBlock>

      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Molecular Structures</h2>
        <IVAnaestheticStructures />
      </div>
          <ExamPitfallsCallout
            accent="pharmacology"
            pitfalls={[
              "Propofol: rapid recovery via redistribution, not metabolism; causes hypotension via vasodilation and mild myocardial depression.",
              "Thiopentone: pKa 7.6, highly alkaline (pH 10.5) — intra-arterial injection causes severe vasospasm; treat with papaverine/heparin/local block.",
              "Ketamine: NMDA antagonist, dissociative; preserves airway reflexes but raises ICP, IOP and sympathetic tone — avoid in severe IHD/raised ICP.",
              "Etomidate: cardiostable but suppresses 11β-hydroxylase → adrenal suppression even after single dose; avoid as ICU sedation.",
              "Propofol infusion syndrome: lactic acidosis, rhabdomyolysis, cardiac failure with prolonged high-dose (>4 mg/kg/h >48 h) infusion.",
            ]}
          />
      </div>
      </ExamSection>
      }
    />
  );
};

export default IVAnaestheticsTopic;
