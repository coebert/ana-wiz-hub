import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { pulseOximetryQuiz } from "@/data/quizzes";
import { AbsorptionSpectraDiagram } from "@/components/diagrams/physics/AbsorptionSpectraDiagram";
import { CapnographyDiagram } from "@/components/diagrams/physics/CapnographyDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";

const TOPIC_ID = "pulse-oximetry";

const pulseOximetryFaqs: Array<[string, string]> = [
  [
    "How does a pulse oximeter calculate SpO₂?",
    "Two LEDs emit red (660 nm) and infrared (940 nm) light through a pulsating vascular bed. Deoxy-Hb absorbs more red; oxy-Hb absorbs more infrared. The probe measures the AC (pulsatile, arterial) component as a ratio of DC (constant — venous, tissue) absorbances. The ratio is converted to SpO₂ via an empirical lookup table (Beer–Lambert calibrated against in-vitro co-oximetry in healthy volunteers 70–100 %)."
  ],
  [
    "What conditions cause pulse-oximeter inaccuracy?",
    "Falsely low: nail polish (especially blue/black), methylene blue, low perfusion, motion, venous pulsations (tricuspid regurgitation). Falsely high or normal despite hypoxia: carboxyhaemoglobin (reads ~100 %), methaemoglobinaemia (reads ~85 % regardless), severe anaemia. Skin pigmentation may cause overestimation of SpO₂ in hypoxia (more recently recognised)."
  ],
  [
    "What is the difference between SpO₂ and SaO₂?",
    "SaO₂ — directly measured arterial saturation from a co-oximeter on a blood sample (4-wavelength, distinguishes oxy/deoxy/COHb/MetHb). SpO₂ — non-invasive estimate from a 2-wavelength pulse oximeter; assumes only oxy- and deoxy-Hb are present. SpO₂ ±2 % of SaO₂ in the range 70–100 %; unreliable below 70 % and in dyshaemoglobinaemias."
  ]
];

const objectives = [
  "Apply the Beer-Lambert law to explain how pulse oximetry derives SpO₂ from red and infrared absorption.",
  "Describe the absorption characteristics of oxyHb, deoxyHb, COHb and MetHb and how they distort SpO₂.",
  "Explain the principle of co-oximetry and the difference between functional (SpO₂) and fractional (SaO₂) saturation.",
  "Recognise CO poisoning and methaemoglobinaemia clinically and outline appropriate treatment.",
  "Interpret a normal capnograph waveform (phases I–IV, α and β angles) and explain mainstream vs sidestream analysis.",
];

const keyPoints = [
  { text: "Pulse oximetry uses red (660 nm) and infrared (940 nm) light; isobestic point ~805 nm.", cites: ["BJA Educ 2003"] },
  { text: "Functional SpO₂ = HbO₂ / (HbO₂ + HHb); ignores dyshaemoglobins and is misleading in CO/MetHb.", cites: ["BJA Educ 2014"] },
  { text: "COHb absorbs like HbO₂ at 660 nm → SpO₂ falsely ~100%; diagnose with co-oximetry; treat with 100% O₂ ± HBO.", cites: ["Cross & Plunkett Ch.15"] },
  { text: "MetHb drives SpO₂ towards 85% irrespective of true SaO₂; treat with methylene blue 1–2 mg/kg (avoid in G6PD).", cites: ["BJA Educ 2003"] },
  { text: "Co-oximetry uses ≥4 wavelengths on haemolysed blood and quantifies each Hb species — the reference standard.", cites: ["BJA Educ 2014"] },
  { text: "Capnography uses IR absorption at 4.26 µm; only polyatomic gases with a changing dipole absorb (not O₂, N₂, Ar).", cites: ["Cross & Plunkett Ch.15"] },
  { text: "Mainstream capnography is fast and tubeless; sidestream is lighter but has a 2–3 s delay and needs scavenging.", cites: ["BJA Educ 2003"] },
  { text: "Capnograph phases: I baseline, II rapid rise, III alveolar plateau, IV inspiration; α/β angles reflect V/Q.", cites: ["BJA Educ 2014"] },
];

const PulseOximetryTopicWorkedExamples: WorkedExample[] = [
  {
    title: "Troubleshooting a low SpO₂ in theatre",
    scenario: "Mid-procedure, the SpO₂ falls from 99% to 86% on FiO₂ 0.5. Capnography trace is normal. List the systematic causes from probe to patient and the next steps.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Probe and signal: check pulsatile waveform, perfusion index, sensor position, nail varnish, motion artefact, ambient light, methylene blue</li>
          <li>Patient delivery: confirm FiO₂ delivered (analyser), circuit integrity, endobronchial intubation (auscultate, recheck tube depth), bronchospasm, pneumothorax</li>
          <li>Ventilation/perfusion mismatch: atelectasis (recruitment manoeuvre), one-lung position, mucus plug (suction)</li>
          <li>Diffusion / shunt: pulmonary oedema, embolism, intracardiac shunt</li>
          <li>Dyshaemoglobinaemia: send co-oximetry if COHb/MetHb suspected (SpO₂ ceiling at 85% in metHb)</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
          <li>Treating low SpO₂ before checking the waveform — non-pulsatile reading is unreliable</li>
          <li>Forgetting that SpO₂ lags 20–30 s behind a desaturating event (probe site dependent)</li>
          <li>Beer–Lambert assumes only two absorbers — dyes (methylene blue, indocyanine green) cause transient dips</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Apply a structured probe-→circuit-→lung-→haemoglobin algorithm. Address the most likely cause (endobronchial intubation, atelectasis) first; escalate FiO₂, recruit, recheck tube depth, exclude pneumothorax.",
    cites: ["BJA Educ 2014", "BJA Educ 2003", "Cross & Plunkett Ch.15"],
  },
];

const PulseOximetryTopic = () => {
  return (
    <TopicTemplate
      title="Pulse Oximetry & Capnography"
      subtitle="FRCA Primary — Physics"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      topicId="pulse-oximetry"
      topicTitle="Pulse Oximetry & Capnography"
      workedExamples={PulseOximetryTopicWorkedExamples}
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={pulseOximetryQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY] },
        keyPoints: { exams: [Exam.PRIMARY] },
      }}
      sectionSources={{
        objectives: [
          "BJA Educ 2014",
          "BJA Educ 2003",
          "Cross & Plunkett Ch.15",
        ],
        keyPoints: [
          "BJA Educ 2014",
          "BJA Educ 2003",
          "Cross & Plunkett Ch.15",
        ],
      }}
      coreConcepts={
        <>
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
        <div className="prose prose-slate max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
            <p className="text-foreground/90 leading-relaxed">
              Pulse oximetry and capnography are mandatory monitoring standards during anaesthesia. Both rely on absorption
              spectroscopy principles — the Beer-Lambert law — applied at different wavelengths to measure different substances.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Absorption Spectra</h2>
            <p className="text-foreground/90 leading-relaxed mb-4">
              The diagram below shows the absorption characteristics of oxyhaemoglobin and deoxyhaemoglobin at the two
              wavelengths used by pulse oximetry.
            </p>
            <div className="bg-card rounded-xl border border-border p-6">
              <AbsorptionSpectraDiagram />
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Beer-Lambert Law</h2>
            <p className="text-foreground/90 leading-relaxed">
              <strong>A = εcl</strong>, where A = absorbance, ε = extinction coefficient (wavelength-specific), c = concentration,
              l = path length. Absorbance is logarithmic: <strong>A = log₁₀(I₀/I)</strong>. The law assumes monochromatic light,
              dilute solutions, and no scattering — all assumptions that are violated to some degree in biological tissue.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Pulse Oximetry</h2>
            <p className="text-foreground/90 leading-relaxed">
              Pulse oximetry measures <strong>SpO₂</strong> by comparing absorption of red (660 nm) and infrared (940 nm) light.
              At 660 nm, deoxyHb absorbs more than oxyHb; at 940 nm the reverse is true. The <strong>isobestic point</strong>
              (~805 nm) is where both species absorb equally.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              The oximeter derives SpO₂ from the <strong>ratio of ratios, R = (AC/DC)₆₆₀ / (AC/DC)₉₄₀</strong>.
              This is calculated in stages:<InlineRef topicId={TOPIC_ID} refLabel="Sensors 2020 (Oximetric techniques)" />
            </p>
            <ol className="list-decimal list-inside space-y-1.5 mt-2 text-foreground/90 leading-relaxed">
              <li>At <strong>each wavelength</strong> (red 660 nm and infrared 940 nm), the photodetector measures the total light transmitted through the tissue.</li>
              <li>Each signal comprises a large steady <strong>DC component</strong> (absorption by tissue, bone, venous blood and non-pulsatile arterial blood) and a small pulsatile <strong>AC component</strong> (~1–5% of DC) produced by the cyclical influx of arterial blood with each heartbeat.</li>
              <li>The microprocessor isolates the pulsatile component and computes the normalised pulsatile absorption at the red wavelength: <strong>AC₆₆₀ / DC₆₆₀</strong>.</li>
              <li>It simultaneously computes the same ratio at the infrared wavelength: <strong>AC₉₄₀ / DC₉₄₀</strong>. Dividing AC by DC at each wavelength normalises for tissue thickness, skin tone and total haemoglobin, making the measurement largely independent of probe site.</li>
              <li>The <strong>ratio of ratios</strong> is then calculated: <strong>R = (AC₆₆₀ / DC₆₆₀) / (AC₉₄₀ / DC₉₄₀)</strong>.</li>
              <li>This R value is mapped to a displayed SpO₂ via the device's internal <strong>look-up table</strong> — an empirical calibration curve derived from volunteer desaturation studies against co-oximetry: R = 1 → SpO₂ ≈ 85%; R = 0.4 → SpO₂ ≈ 100%.</li>
            </ol>
            <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
              <p className="text-sm font-medium text-foreground">Sources of Error</p>
              <p className="text-sm text-muted-foreground mt-1">
                <strong>COHb</strong>: reads as ~SpO₂ 100% (absorbs similarly to oxyHb at 660 nm). <strong>MetHb</strong>:
                SpO₂ tends toward 85% regardless of true SaO₂ (R → 1). Motion artefact. Poor perfusion. Nail polish
                (blue/green/black). Ambient light. Intravenous dyes (methylene blue). Skin pigmentation — see the
                dedicated subsection below.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Skin Pigmentation and Accuracy</h2>
            <p className="text-foreground/90 leading-relaxed">
              Pulse oximeters may <strong>overestimate SpO₂ in individuals with darker skin pigmentation</strong>,
              particularly at lower true saturations.<InlineRef topicId={TOPIC_ID} refLabel="Physiol Meas 2023 (Skin pigmentation)" /> Increased
              melanin in the epidermis acts as an <strong>additional optical absorber</strong> that is not accounted for
              in the empirical calibration curve, altering the effective AC/DC ratios and biasing the displayed value.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              The clinically important consequence is <strong>occult hypoxaemia</strong>: a true SaO₂ that is dangerously
              low while the displayed SpO₂ remains reassuring. Although the <strong>mean bias is small</strong> (typically
              1–2%), it is consistently <strong>positive in patients with darkly pigmented skin</strong> and can be
              clinically significant in individual patients at the hypoxic end of the scale. This issue was re-evaluated
              prominently during the COVID-19 pandemic, when retrospective studies demonstrated higher rates of missed
              hypoxaemia in Black patients, prompting regulatory review of device calibration and labelling.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              <strong>Practical implication:</strong> interpret borderline SpO₂ values with extra caution in patients with
              darker skin, correlate with the clinical picture, and have a low threshold for arterial blood gas
              co-oximetry when the reading does not fit.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Advanced Waveform Analysis</h2>
            <p className="text-foreground/90 leading-relaxed">
              Beyond SpO₂, the plethysmographic waveform yields secondary physiological parameters of increasing
              relevance to FRCA Final and FFICM practice.
            </p>
            <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Perfusion Index (PI)</h3>
            <p className="text-foreground/90 leading-relaxed">
              PI is the ratio of the <strong>pulsatile (AC) to non-pulsatile (DC)</strong> component of the infrared
              signal, expressed as a percentage — effectively a non-invasive index of peripheral perfusion. It falls
              with vasoconstriction (hypovolaemia, hypothermia, high sympathetic tone) and rises with vasodilatation.
              Clinical uses include a perfusion/ sympathetic-tone marker in <strong>sepsis</strong> and an objective
              early sign of successful <strong>regional blockade</strong> (sympathectomy raises PI in the blocked limb).
            </p>
            <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Pleth Variability Index (PVI)</h3>
            <p className="text-foreground/90 leading-relaxed">
              PVI is an automated, continuous measure of the <strong>dynamic respiratory variation in PI</strong> over
              the ventilatory cycle (PI<sub>max</sub> − PI<sub>min</sub>)/PI<sub>max</sub> × 100. In mechanically
              ventilated patients under general anaesthesia it predicts <strong>fluid responsiveness</strong>: a PVI
              &gt;14% before volume expansion discriminates responders from non-responders with 81% sensitivity and
              100% specificity.<InlineRef topicId={TOPIC_ID} refLabel="BJA 2008 (Pleth Variability Index)" />
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              <strong>Limitations:</strong> PVI is validated only in <strong>fully mechanically ventilated</strong>
              patients with a regular rhythm — spontaneous breathing, arrhythmias, low tidal volumes, vasopressors and
              poor peripheral perfusion all degrade its accuracy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Co-oximetry</h2>
            <p className="text-foreground/90 leading-relaxed">
              A <strong>co-oximeter</strong> is a multi-wavelength spectrophotometer (typically 4–8 wavelengths, modern
              laboratory units up to 128) that quantifies <strong>each individual haemoglobin species</strong> in a sample
              of haemolysed whole blood. It is the reference method against which pulse oximetry is calibrated, and is
              built into all modern blood-gas analysers.
            </p>

            <h3 className="text-lg font-serif font-semibold text-foreground mt-4 mb-2">Principle</h3>
            <p className="text-foreground/90 leading-relaxed">
              Each haemoglobin species — oxyhaemoglobin (HbO₂), deoxyhaemoglobin (HHb), carboxyhaemoglobin (COHb) and
              methaemoglobin (MetHb) — has a <strong>unique absorption spectrum</strong>. With <em>n</em> unknowns, you
              need at least <em>n</em> wavelengths and a system of simultaneous Beer-Lambert equations:
            </p>
            <div className="bg-muted/40 rounded-lg p-4 border border-border my-3">
              <p className="text-center font-mono text-foreground text-sm">
                A<sub>λ₁</sub> = ε<sub>HbO₂,λ₁</sub>·c<sub>HbO₂</sub> + ε<sub>HHb,λ₁</sub>·c<sub>HHb</sub> + ε<sub>COHb,λ₁</sub>·c<sub>COHb</sub> + ε<sub>MetHb,λ₁</sub>·c<sub>MetHb</sub>
              </p>
              <p className="text-center font-mono text-foreground text-sm mt-1">… (one equation per wavelength) …</p>
              <p className="text-xs text-muted-foreground text-center mt-2">
                The sample is first <strong>haemolysed</strong> (ultrasound or surfactant) so that scattering by intact red
                cells is eliminated and the assumptions of Beer-Lambert are met. The instrument then solves the matrix to
                give the <strong>fractional concentration</strong> of each species.
              </p>
            </div>

            <h3 className="text-lg font-serif font-semibold text-foreground mt-5 mb-2">Two ways to express oxygen saturation</h3>
            <div className="overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-foreground">Term</th>
                    <th className="text-left p-3 font-semibold text-foreground">Definition</th>
                    <th className="text-left p-3 font-semibold text-foreground">Behaviour with COHb / MetHb</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="p-3 align-top font-medium text-foreground">SpO₂ (pulse ox)</td>
                    <td className="p-3 align-top text-foreground/80">"Functional" saturation = HbO₂ / (HbO₂ + HHb)</td>
                    <td className="p-3 align-top text-foreground/80">Ignores dyshaemoglobins → falsely reassuring in CO; drifts to ~85% in MetHb.</td>
                  </tr>
                  <tr>
                    <td className="p-3 align-top font-medium text-foreground">SaO₂ / FO₂Hb (co-ox)</td>
                    <td className="p-3 align-top text-foreground/80">"Fractional" saturation = HbO₂ / (HbO₂ + HHb + COHb + MetHb)</td>
                    <td className="p-3 align-top text-foreground/80">True proportion of total haemoglobin carrying O₂. Falls in proportion to dyshaemoglobinaemia.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-serif font-semibold text-foreground mt-5 mb-2">Co-oximetry vs pulse oximetry</h3>
            <div className="overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold text-foreground">Feature</th>
                    <th className="text-left p-3 font-semibold text-foreground">Pulse oximetry (SpO₂)</th>
                    <th className="text-left p-3 font-semibold text-foreground">Co-oximetry</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="p-3 font-medium text-foreground">Wavelengths</td><td className="p-3 text-foreground/80">2 (660 + 940 nm)</td><td className="p-3 text-foreground/80">4–128 across the visible–NIR range</td></tr>
                  <tr><td className="p-3 font-medium text-foreground">Sample</td><td className="p-3 text-foreground/80">Pulsatile arterial bed in vivo (transmitted/reflected)</td><td className="p-3 text-foreground/80">Haemolysed whole blood ex vivo</td></tr>
                  <tr><td className="p-3 font-medium text-foreground">Output</td><td className="p-3 text-foreground/80">Functional SpO₂ only</td><td className="p-3 text-foreground/80">HbO₂, HHb, COHb, MetHb, total Hb, fractional & functional SaO₂</td></tr>
                  <tr><td className="p-3 font-medium text-foreground">Detects COHb?</td><td className="p-3 text-foreground/80">No — reads ~100%</td><td className="p-3 text-foreground/80">Yes — direct quantification</td></tr>
                  <tr><td className="p-3 font-medium text-foreground">Detects MetHb?</td><td className="p-3 text-foreground/80">No — drifts to 85%</td><td className="p-3 text-foreground/80">Yes</td></tr>
                  <tr><td className="p-3 font-medium text-foreground">Continuous?</td><td className="p-3 text-foreground/80">Yes (real-time)</td><td className="p-3 text-foreground/80">Intermittent (sample-based)</td></tr>
                  <tr><td className="p-3 font-medium text-foreground">Where</td><td className="p-3 text-foreground/80">Bedside, ubiquitous</td><td className="p-3 text-foreground/80">Built into ABG analysers (Radiometer ABL, GEM, Siemens RAPIDPoint)</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-foreground/90 leading-relaxed mt-3 text-sm">
              <strong>Pulse co-oximeters</strong> (e.g. Masimo Rainbow SET) extend the principle non-invasively, using
              7–12 wavelengths to estimate SpCO and SpMet at the bedside. Useful as a screening tool but less accurate
              than blood-sample co-oximetry — confirmation with arterial co-oximetry is required before treatment
              decisions.
            </p>

            <h3 className="text-lg font-serif font-semibold text-foreground mt-5 mb-2">Clinical applications</h3>

            <div className="bg-card rounded-lg border border-border p-4 mt-3">
              <h4 className="font-semibold text-foreground mb-2">Carbon monoxide poisoning</h4>
              <p className="text-sm text-foreground/90 mb-2">
                CO binds Hb with ~240× the affinity of O₂, forming COHb that is bright cherry-red and absorbs almost
                identically to HbO₂ at 660 nm. Pulse oximetry therefore reads falsely high (often 100%) despite profound
                tissue hypoxia. CO also <strong>shifts the ODC to the left</strong>, impairing offloading of the residual
                oxygen.
              </p>
              <ul className="list-disc pl-5 text-sm text-foreground/90 space-y-0.5">
                <li><strong>When to suspect:</strong> house fire, faulty boiler, suicide attempt, multiple casualties from the same building, headache + nausea + confusion + cherry-red skin.</li>
                <li><strong>Diagnosis:</strong> arterial co-oximetry. Normal COHb &lt;3% (non-smokers), &lt;10% (smokers). Symptoms typically &gt;15%; severe &gt;25%; coma/death &gt;40–60%.</li>
                <li><strong>Treatment:</strong> 100% O₂ via tight-fitting non-rebreather → t½ COHb falls from ~250 min (room air) to ~80 min (15 L/min mask) to ~22 min (hyperbaric at 3 ATA).</li>
                <li><strong>HBO indications:</strong> COHb &gt;25% (15% in pregnancy), loss of consciousness, neurological signs, ECG ischaemia, persistent symptoms after 4 h of normobaric O₂.</li>
                <li><strong>Pitfall:</strong> the PaO₂ on an ABG is <em>normal</em> (it measures dissolved O₂) — only co-oximetry-derived SaO₂ reveals the true catastrophe.</li>
              </ul>
            </div>

            <div className="bg-card rounded-lg border border-border p-4 mt-3">
              <h4 className="font-semibold text-foreground mb-2">Methaemoglobinaemia</h4>
              <p className="text-sm text-foreground/90 mb-2">
                MetHb contains iron in the ferric (Fe³⁺) state, which cannot bind O₂ and shifts the ODC of the remaining
                functional Hb to the left. Causes: <strong>local anaesthetics</strong> (prilocaine — classically EMLA in
                neonates, benzocaine sprays for awake fibreoptic), <strong>dapsone</strong>, nitrates / nitrites, sulphonamides, inhaled NO, aniline dyes, congenital cytochrome-b₅-reductase deficiency.
              </p>
              <ul className="list-disc pl-5 text-sm text-foreground/90 space-y-0.5">
                <li><strong>Presentation:</strong> "<em>chocolate-brown</em>" arterial blood, central cyanosis disproportionate to PaO₂, SpO₂ stuck at ~85% that does <em>not</em> rise with supplemental O₂ ("oxygen-resistant cyanosis").</li>
                <li><strong>Diagnosis:</strong> co-oximetry. Symptoms ~15%; dyspnoea/fatigue ~30%; metabolic acidosis &amp; arrhythmia &gt;50%; lethal &gt;70%.</li>
                <li><strong>Treatment:</strong> high-flow O₂, remove the trigger. <strong>Methylene blue 1–2 mg/kg IV over 5 min</strong> (acts as an electron acceptor for NADPH-MetHb reductase). Avoid in G6PD deficiency (risk of haemolysis) — use ascorbic acid or exchange transfusion instead.</li>
                <li><strong>Sulphaemoglobinaemia</strong> behaves similarly clinically but cannot be reduced by methylene blue and resolves only with red-cell turnover.</li>
              </ul>
            </div>

            <div className="bg-secondary/30 rounded-lg p-4 mt-4 border border-border">
              <p className="text-sm font-medium text-foreground">Exam pearl</p>
              <p className="text-sm text-muted-foreground mt-1">
                Two-wavelength pulse oximetry only distinguishes <em>two</em> species. Whenever clinical state and SpO₂
                disagree (cherry-red after a fire, oxygen-resistant cyanosis after prilocaine, chocolate-brown ABG sample),
                the answer is <strong>co-oximetry</strong>. The defining numbers: COHb ~250 min half-life on air, ~80 min
                on 100% O₂, ~22 min HBO; methylene blue 1–2 mg/kg, contraindicated in G6PD deficiency.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">Capnography</h2>
            <p className="text-foreground/90 leading-relaxed">
              Capnography measures CO₂ concentration using <strong>infrared absorption</strong> at 4.26 µm. CO₂ absorbs
              infrared because it is a polyatomic molecule with different atoms — it has a changing dipole moment during
              asymmetric stretching. Monoatomic (Ar) and homonuclear diatomic (O₂, N₂) gases do not absorb IR.
            </p>
            <div className="grid md:grid-cols-2 gap-3 mt-3 text-sm"><div className="rounded-lg border border-border p-3"><strong>Mainstream</strong><p className="mt-1">Fast response; no gas removal or sample-line blockage. The airway sensor adds weight and dead space, can heat or become secretion-contaminated, and is difficult without an advanced airway.</p></div><div className="rounded-lg border border-border p-3"><strong>Sidestream</strong><p className="mt-1">Light adaptor, usable through nasal cannulae and compatible with multigas analysis. It has transit delay, requires scavenging and can kink, leak or block with water/secretions.</p></div></div><InlineRef topicId={TOPIC_ID} refLabel="Cross & Plunkett Ch.15" />
          </section>

          <section className="mb-10">
            <h3 className="text-xl font-serif font-bold text-foreground">Principle of Infrared Analysis</h3>
            <ul className="mt-2 list-disc pl-5 text-foreground/90 space-y-1">
              <li><strong>Components:</strong> a broad-spectrum infrared source (heated wire or ceramic element), a sample chamber with sapphire or crystal windows (glass absorbs IR), a rotating chopper wheel carrying a measurement filter and a reference filter, and a photodetector (photoconductive or thermopile) with an amplifier.</li>
              <li><strong>Single-beam, positive-filter principle:</strong> one beam passes through the sample chamber and the chopper wheel alternately places the 4.26 µm measurement filter and a filter at a non-absorbed wavelength (reference) in the path. The detector therefore sees alternating &ldquo;absorbed&rdquo; and &ldquo;unabsorbed&rdquo; signals, and their ratio gives CO₂ concentration.</li>
              <li><strong>Why 4.26 µm:</strong> this is the peak of the CO₂ asymmetric-stretch absorption band and is well separated from the absorption peaks of N₂O (4.5 µm) and water vapour, minimising cross-sensitivity.</li>
              <li><strong>Reference filter:</strong> corrects for drift in lamp output, detector sensitivity, window contamination and stray light, so background effects cancel in the ratio rather than appearing as a false reading.</li>
              <li><strong>Collision (pressure) broadening:</strong> collisions between CO₂ and N₂O (and to a lesser extent O₂) broaden the CO₂ absorption band and falsely elevate the measured CO₂ by up to a few mmHg. Modern analysers compensate by measuring the N₂O and O₂ concentrations in the same multigas bench and applying a correction algorithm; older machines needed manual N₂O compensation.</li>
              <li>Absorption follows the Beer&ndash;Lambert law, so the relationship is exponential rather than linear and analysers are calibrated against known gas mixtures with a linearising algorithm.</li>
            </ul>
            <InlineRef topicId={TOPIC_ID} refLabel="Cross & Plunkett Ch.15" />
            <InlineRef topicId={TOPIC_ID} refLabel="Respir Care 2016 (Capnography)" />
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-foreground">The Capnograph Waveform</h2>
            <p className="text-foreground/90 leading-relaxed">
              <strong>Phase I</strong>: baseline (inspired gas, CO₂ ≈ 0). <strong>Phase II</strong>: rapid rise (mixing of
              dead space and alveolar gas). <strong>Phase III</strong>: alveolar plateau. <strong>Phase IV</strong>: rapid
              descent (inspiration begins). The <strong>α angle</strong> (II–III junction) and <strong>β angle</strong>
              (III–IV junction) reflect V/Q mismatch when abnormal.
            </p>
            <ul className="mt-3 list-disc pl-5 text-foreground/90 space-y-1"><li><strong>Phase I — baseline:</strong> should read zero. An elevated baseline means rebreathing: exhausted soda lime, an incompetent expiratory or inspiratory valve, inadequate fresh gas flow in a Mapleson circuit, or a faulty ventilator.</li><li><strong>Phase II — expiratory upstroke:</strong> the transition from anatomical dead-space gas to alveolar gas, normally steep. A sloping upstroke with a widened α angle (normal 100–110°) indicates expiratory obstruction — bronchospasm, COPD, a kinked or partially obstructed tracheal tube, or a leaking sampling line.</li><li><strong>Phase III — alveolar plateau:</strong> exhalation of alveolar gas; EtCO₂ is read at its end. An upsloping plateau indicates uneven alveolar emptying and V/Q mismatch; a mid-plateau dip (&ldquo;curare cleft&rdquo;) is a spontaneous inspiratory effort during partial paralysis; small pulse-synchronous cardiogenic oscillations may appear at the end of the plateau.</li><li><strong>Phase IV — inspiratory downstroke:</strong> normally near-vertical. A sloping downstroke with a widened β angle (normal ~90°) suggests rebreathing from a leaking cuff, an incompetent inspiratory valve, or too long a sampling-line response time relative to respiratory rate.</li><li>Increased alveolar dead space (PE or low cardiac output) lowers EtCO₂ and widens PaCO₂−EtCO₂; pure shunt need not widen it unless V/Q heterogeneity or dead space also rises.</li></ul><InlineRef topicId={TOPIC_ID} refLabel="BJA Educ 2014" /><InlineRef topicId={TOPIC_ID} refLabel="Respir Care 2016 (Capnography)" />
            <div className="bg-card rounded-xl border border-border p-4 mt-4">
              <CapnographyDiagram />
            </div>
          </section>
          <section className="mb-10"><h2 className="text-2xl font-serif font-bold text-foreground">Sources of Error in Capnography</h2><ul className="list-disc pl-5 text-foreground/90 space-y-1"><li><strong>Patient:</strong> low cardiac output, arrest or massive PE reduces pulmonary CO₂ delivery and EtCO₂.</li><li><strong>Breathing system:</strong> cuff/circuit leak or disconnected sample line attenuates the trace; exhausted absorber or incompetent valve raises the inspired baseline.</li><li><strong>Sidestream:</strong> water/secretions block the line; leaks dilute the sample; an excessive sampling rate distorts small tidal volumes.</li><li><strong>Mainstream:</strong> damaged or secretion-contaminated windows cause drift or failure.</li><li><strong>Gas interference:</strong> N₂O collisionally broadens the CO₂ infrared absorption band; high O₂ has a smaller pressure-broadening effect, requiring analyser compensation.</li></ul><InlineRef topicId={TOPIC_ID} refLabel="Cross & Plunkett Ch.15" /></section>
          <section className="mb-10"><h2 className="text-2xl font-serif font-bold text-foreground">Volumetric Capnography</h2><p className="text-foreground/90">Volumetric capnography plots expired CO₂ against expired tidal volume rather than time. Phase I is airway dead-space gas, phase II is mixing and phase III is alveolar gas. The phase-I/II transition estimates airway dead space; Bohr physiological dead space uses mixed-expired CO₂, while the Enghoff modification substitutes PaCO₂ and therefore reflects global V/Q inequality and shunt as well as true dead space. Alveolar dead space is physiological minus airway dead space. Trends can help titrate PEEP and recruitment in ARDS and assess one-lung ventilation, but depend on reliable flow and gas synchronisation. <InlineRef topicId={TOPIC_ID} refLabel="BJA Educ 2014" /></p></section>
          <ExamPitfallsCallout
            accent="physics"
            pitfalls={[
              "Beer–Lambert with two wavelengths (660 nm red, 940 nm IR); ratio of pulsatile (AC) to baseline (DC) absorbances gives SpO₂.",
              "Carboxyhaemoglobin reads as oxy-Hb → falsely high SpO₂; methaemoglobin tends to drive SpO₂ towards 85%.",
              "Motion, low perfusion, nail polish (blue/black), bright ambient light and venous pulsation all cause errors.",
              "Capnography: phase I (dead-space), II (mixed), III (alveolar plateau), IV (inspiration). Rising baseline = rebreathing; shark-fin slope = obstruction.",
              "Sudden loss of ETCO₂ in a ventilated patient = circuit disconnect, oesophageal intubation, cardiac arrest or massive PE until proven otherwise.",
            ]}
          />
        </div>
      </ExamSection>
          <TopicFaqs faqs={pulseOximetryFaqs} />
        </>
      }
    />
  );
};

export default PulseOximetryTopic;
