import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { Exam } from "@/data/curriculum";
import { ExamSection } from "@/components/exam/ExamSection";
import { cardiacArrestPostResusQuestions } from "@/data/quizzes";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import { InlineRef } from "@/components/references/InlineRef";

/**
 * Dedicated FFICM / EDIC topic page for multimodal neuroprognostication after
 * cardiac arrest, distilling the ERC/ESICM 2021 post-resuscitation guidelines
 * (Nolan, Sandroni et al.) and TTM2 implications. Carved out of
 * `cardiac-arrest-post-resus` so it ranks for the specific high-intent query
 * cluster ("post-cardiac-arrest neuroprognostication algorithm", "NSE
 * threshold", "highly malignant EEG", "bilateral absent N20 SSEP").
 */

const neuroprognosticationFaqs: Array<[string, string]> = [
  ["When should neuroprognostication be performed after cardiac arrest?", "≥72 h after ROSC (later if sedation/hypothermia confound), using multimodal assessment: clinical exam (absent pupillary/corneal reflexes, GCS-M ≤2), NSE, EEG, SSEP and CT/MRI (ERC/ESICM 2021)."],
  ["What clinical signs reliably predict poor outcome after cardiac arrest?", "Bilaterally absent pupillary and corneal reflexes at ≥72 h, bilaterally absent N20 on SSEP, status myoclonus within 72 h with malignant EEG, or NSE >60 µg/L at 48–72 h — used in combination, not alone."],
  ["What confounders must be excluded before neuroprognostication?", "Residual sedation/paralysis, hypothermia, metabolic derangement, hypotension, seizures and organ failure — all can produce false-positive findings of poor outcome."],
];

const objectives = [
  "State why neurological injury is the leading cause of in-hospital mortality after ROSC and the rationale for a structured multimodal approach.",
  "Apply the ERC/ESICM 2021 timing rule: defer formal prognostication ≥ 72 h after ROSC, after sedation washout and exclusion of confounders.",
  "List the five modalities (clinical, EEG, evoked potentials, biomarkers, neuroimaging) and the specific findings that predict poor outcome with low false-positive rate.",
  "Combine ≥ 2 concordant modalities to justify a poor-outcome conclusion and avoid single-modality decisions.",
  "Identify and correct common confounders — residual sedation, neuromuscular blockade, hypothermia, metabolic derangement, organ failure.",
  "Communicate uncertainty to families, integrate prognostication with withdrawal-of-life-sustaining-treatment (WLST) decisions, and account for the self-fulfilling prophecy bias.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Day 3 post-arrest — when can I formally prognosticate?",
    scenario: (
      <>
        58-year-old, VF arrest, 12 min downtime, ROSC after 2 shocks. TTM at 36 °C for 24 h, then
        normothermia. Off propofol and alfentanil for 18 h. GCS M = 1, no pupillary or corneal reflexes.
        Normal U&E, no liver failure, temperature 37.1 °C. NSE day 2 = 78 µg/L.
      </>
    ),
    working: (
      <>
        ERC/ESICM 2021 requires ≥ 72 h post-ROSC, sedation cleared, and confounders excluded before
        formal prognostication. At 72 h with M ≤ 3 we may apply the algorithm. He already has two
        positive criteria: absent pupillary <em>and</em> corneal reflexes at ≥ 72 h, plus NSE &gt; 60 µg/L.
      </>
    ),
    answer: (
      <>
        Poor neurological outcome is likely. Document the multimodal findings, hold a family discussion
        and consider WLST after consultation with intensivist colleagues. Confirm with a second
        modality (EEG showing highly malignant pattern, or bilateral absent N20 SSEP) before any
        irreversible decision.
      </>
    ),
    cites: ["ERC/ESICM 2021 Post-Resus"],
  },
  {
    title: "Day 2 myoclonus — status myoclonus or benign?",
    scenario: (
      <>
        42-year-old, OHCA, ROSC after 28 min. Day 2: spontaneous generalised myoclonic jerks involving
        face and limbs, continuous for &gt; 30 min, on no sedation. EEG: burst-suppression with
        identical bursts.
      </>
    ),
    working: (
      <>
        Status myoclonus within 72 h of ROSC associated with a highly malignant EEG (burst-suppression
        with identical bursts, or suppression) is a poor-prognosis criterion. Single myoclonic jerks or
        Lance–Adams syndrome (post-anoxic action myoclonus with preserved awareness) are different and
        do <strong>not</strong> indicate poor prognosis.
      </>
    ),
    answer: (
      <>
        Document EEG findings; this represents two concordant criteria (status myoclonus + highly
        malignant EEG). Continue intensive care to ≥ 72 h, then complete multimodal prognostication.
        Treat clinical seizures with levetiracetam / sodium valproate as ERC first-line.
      </>
    ),
    cites: ["ERC/ESICM 2021 Post-Resus"],
  },
  {
    title: "NSE rising — but confounded by haemolysis",
    scenario: (
      <>
        Post-arrest day 3. NSE 48 h = 42 µg/L, 72 h = 71 µg/L. Sample at 72 h flagged "haemolysed —
        repeat advised". Pupil and corneal reflexes absent, motor M = 2, no SSEP yet, CT brain
        unremarkable.
      </>
    ),
    working: (
      <>
        NSE is released from erythrocytes; haemolysis falsely elevates the value. ERC/ESICM mandates
        rejecting any haemolysed NSE sample. NSE alone cannot drive a decision: minimum threshold is
        &gt; 60 µg/L at 48 <em>and/or</em> 72 h, ideally with a rising trend, in a non-haemolysed sample,
        combined with at least one other modality.
      </>
    ),
    answer: (
      <>
        Discard the haemolysed sample, repeat in 24 h. In the meantime obtain an SSEP and EEG to
        achieve two-modality concordance. Do not prognosticate from clinical signs alone — bilaterally
        absent pupillary + corneal reflexes have a low false-positive rate but the &gt; 5 % FPR upper
        confidence interval mandates a second modality.
      </>
    ),
    cites: ["ERC/ESICM 2021 Post-Resus"],
  },
];

const keyPoints = [
  {
    text: "Hypoxic-ischaemic brain injury is the leading cause of death after admission post-cardiac-arrest. Two-thirds of in-hospital post-arrest deaths follow WLST for predicted poor neurological outcome — making accurate prognostication an ethical imperative.",
    cites: ["ERC/ESICM 2021 Post-Resus"],
  },
  {
    text: "Timing: do not formally prognosticate before ≥ 72 h after ROSC. Earlier signs may reflect residual sedation, paralysis, hypothermia or metabolic disturbance rather than irreversible brain injury.",
    cites: ["ERC/ESICM 2021 Post-Resus"],
  },
  {
    text: "Entry criterion (ERC/ESICM 2021): comatose patient with motor score M ≤ 3 at ≥ 72 h post-ROSC, after sedation washout and confounders excluded.",
    cites: ["ERC/ESICM 2021 Post-Resus"],
  },
  {
    text: "Poor-outcome criteria — require ≥ 2 concordant: (i) absent pupillary AND corneal reflexes at ≥ 72 h; (ii) bilaterally absent N20 SSEP at ≥ 24 h; (iii) highly malignant EEG (suppression or burst-suppression with identical bursts) at > 24 h; (iv) NSE > 60 µg/L at 48 h and/or 72 h (non-haemolysed); (v) status myoclonus ≤ 72 h; (vi) diffuse and extensive anoxic injury on brain CT or MRI.",
    cites: ["ERC/ESICM 2021 Post-Resus"],
  },
  {
    text: "Single-modality prognostication is forbidden — every published criterion has a false-positive rate confidence interval that crosses 5 %. Concordance across modalities is what justifies the conclusion.",
    cites: ["ERC/ESICM 2021 Post-Resus"],
  },
  {
    text: "Confounders that invalidate prognostication: residual sedation/analgesia (propofol, midazolam, opioids — wait ≥ 5 half-lives), neuromuscular blockade, hypothermia (< 36 °C), severe metabolic derangement (Na+, glucose, urea), profound shock, hepatic or renal failure with drug accumulation.",
    cites: ["ERC/ESICM 2021 Post-Resus"],
  },
  {
    text: "TTM2 (2021): targeted hypothermia at 33 °C did not improve 6-month mortality vs targeted normothermia (≤ 37.7 °C). ERC/ESICM 2021 still recommends TTM (32–36 °C constant value for ≥ 24 h) and active fever avoidance to 72 h.",
    cites: ["TTM2 2021", "ERC/ESICM 2021 Post-Resus"],
  },
  {
    text: "Beware status myoclonus vs Lance–Adams: status myoclonus = continuous, generalised, within 72 h, usually with malignant EEG → poor prognosis. Lance–Adams = action myoclonus, days–weeks later, awake patient → not a poor-prognosis sign.",
    cites: ["ERC/ESICM 2021 Post-Resus"],
  },
  {
    text: "Indeterminate result: if multimodal assessment is inconclusive, continue intensive care for at least 24–72 h and re-evaluate. Late awakening (≥ 7 days) is not uncommon, particularly after TTM.",
    cites: ["ERC/ESICM 2021 Post-Resus"],
  },
  {
    text: "Self-fulfilling prophecy: WLST itself produces the outcome being predicted. Validation studies should ideally exclude patients who underwent WLST on the basis of the test — a known limitation of all post-arrest evidence.",
    cites: ["ERC/ESICM 2021 Post-Resus"],
  },
];

const NeuroprognosticationTopic = () => {
  return (
    <TopicTemplate
      title="Neuroprognostication after Cardiac Arrest"
      subtitle="FFICM / EDIC — Intensive Care (ERC/ESICM 2021 multimodal algorithm)"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={keyPoints}
      topicId="neuroprognostication"
      topicTitle="Neuroprognostication after Cardiac Arrest"
      quizQuestions={cardiacArrestPostResusQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FFICM, Exam.EDIC] },
        workedExamples: { exams: [Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FFICM, Exam.EDIC] },
      }}
      sectionSources={{
        objectives: ["ERC/ESICM 2021 Post-Resus", "TTM2 2021"],
        keyPoints: ["ERC/ESICM 2021 Post-Resus", "TTM2 2021"],
        workedExamples: ["ERC/ESICM 2021 Post-Resus"],
      }}
      coreConcepts={
        <>
        <ExamSection exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
          <section className="space-y-6">
            {/* Why it matters */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Why prognostication matters</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Hypoxic-ischaemic brain injury (HIBI) is the leading cause of death after cardiac arrest
                admission. Two-thirds of in-hospital deaths in comatose post-arrest patients are preceded
                by <strong>withdrawal of life-sustaining treatment (WLST)</strong> for predicted poor
                neurological outcome. Premature or wrong prognostication therefore <em>causes</em> bad
                outcomes — making a structured, multimodal, evidence-based approach an ethical imperative,
                not a procedural one.
              </p>
              <div className="p-3 rounded-lg border border-border bg-secondary/20">
                <p className="text-xs font-semibold text-foreground mb-1">Definitions</p>
                <p className="text-xs text-muted-foreground">
                  <strong>Poor neurological outcome</strong> — CPC 3–5 or modified Rankin 4–6 (severe
                  disability, vegetative state, or death) at 3–6 months. <strong>Good outcome</strong> —
                  CPC 1–2 (no/moderate disability, independent living).
                </p>
              </div>
            </div>

            {/* Entry criteria & timing */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ERC/ESICM 2021 — entry criteria & timing</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Formal prognostication begins only when <strong>all</strong> of the following are true.
                Premature assessment is the single commonest source of false-positive predictions.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
                <li>≥ <strong>72 h</strong> have elapsed since ROSC (not since rewarming).</li>
                <li>Patient remains <strong>comatose</strong> with motor score <strong>M ≤ 3</strong>.</li>
                <li>Sedation and analgesia have been stopped long enough for clearance (≥ 5 half-lives — longer in obesity, hepatic / renal failure, prolonged infusions).</li>
                <li>Neuromuscular blockade has been excluded (train-of-four).</li>
                <li>Normothermia (≥ 36 °C) for at least 24 h.</li>
                <li>No major metabolic or electrolyte derangement, severe shock, or hepatic/renal failure causing drug accumulation.</li>
              </ul>
              <p className="text-sm text-muted-foreground">
                If any criterion is unmet, <strong>defer</strong> prognostication. Continue active care
                and re-evaluate every 24–72 h. Late awakening (≥ 7 days post-ROSC) is not rare,
                particularly after TTM.
              </p>
            </div>

            {/* Modality 1: Clinical */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">1. Clinical examination</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { sign: "Absent pupillary light reflex (≥ 72 h)", detail: "Standard pupillometry preferred. Confirm bilateral, sustained absence. FPR 1 % (95 % CI 0–3 %)." },
                  { sign: "Absent corneal reflex (≥ 72 h)", detail: "Test with sterile saline drop, not cotton wool (avoids corneal abrasion). Bilateral absence. FPR 2 % (95 % CI 0–7 %)." },
                  { sign: "Status myoclonus ≤ 72 h", detail: "Continuous, generalised myoclonic jerks > 30 min in a comatose patient. Pair with EEG to distinguish from Lance–Adams. FPR low when EEG is highly malignant." },
                  { sign: "Motor score M ≤ 3", detail: "Entry criterion only — not a prognostic finding on its own. Even M = 1–2 alone has a false-positive rate too high to justify WLST." },
                ].map((c) => (
                  <div key={c.sign} className="p-3 rounded-lg border border-border">
                    <p className="font-semibold text-foreground text-sm">{c.sign}</p>
                    <p className="text-sm text-muted-foreground mt-1">{c.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Modality 2: EEG */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">2. Electroencephalography</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Use standardised ACNS terminology. The robust prognostic patterns are the
                <strong> highly malignant</strong> categories — older terms such as "isoelectric" or
                "alpha-coma" have been superseded.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Highly malignant (poor outcome):</strong> suppressed
                  background (&lt; 10 µV) with or without superimposed periodic discharges; or
                  burst-suppression with <em>identical</em> bursts (stereotyped, repetitive burst
                  morphology). Specificity approaches 100 % at &gt; 24 h post-ROSC
                  <InlineRef topicId="neuroprognostication" refLabel="ERC/ESICM 2021 Post-Resus" />.
                </p>
                <p>
                  <strong className="text-foreground">Malignant but not uniformly fatal (intermediate):</strong>{" "}
                  electrographic status epilepticus meeting <strong>Salzburg criteria</strong>
                  (epileptiform discharges &gt; 2.5 Hz for &gt; 10 s, or discharges/rhythmic activity &lt; 2.5 Hz
                  or spike-wave with subtle clinical correlate/evolution lasting &gt; 10 min); abundant
                  periodic discharges (lateralised — LPDs, or generalised — GPDs); burst-suppression with
                  <em> non-identical</em> (variable) bursts. Not sufficient alone — combine with another
                  concordant modality
                  <InlineRef topicId="neuroprognostication" refLabel="EHJ-ACC 2023 (Neuroprognostication)" />.
                </p>
                <p>
                  <strong className="text-foreground">Benign / favourable:</strong> continuous background,
                  <strong> reactivity</strong> to external stimulation, and presence of
                  <strong> sleep–wake cycles</strong>. Strong predictor of <em>good</em> outcome when seen
                  early, particularly when all three features co-exist.
                </p>
                <div className="p-3 rounded-lg border border-border bg-secondary/20 mt-2">
                  <p className="text-xs font-semibold text-foreground mb-1">Defining reactivity</p>
                  <p className="text-xs text-muted-foreground">
                    A reproducible change in EEG background frequency and/or amplitude in response to an
                    external stimulus (auditory, tactile or noxious), assessed away from spontaneous
                    fluctuation. Stimulus-induced rhythmic, periodic or ictal discharges (SIRPIDs) are
                    excluded from this definition and are not evidence of reactivity
                    <InlineRef topicId="neuroprognostication" refLabel="EHJ-ACC 2023 (Neuroprognostication)" />.
                  </p>
                </div>
              </div>
            </div>

            {/* Modality 3: Evoked potentials */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">3. Short-latency somatosensory evoked potentials (SSEPs)</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                <strong>Bilateral absence of the N20 cortical response</strong> ≥ 24 h after ROSC (and
                after rewarming) predicts poor outcome with a false-positive rate close to 0 % when
                recorded and interpreted by an experienced neurophysiologist. Among the most robust
                single criteria — but still must be paired with a second concordant modality.
              </p>
              <div className="p-3 rounded-lg bg-secondary/30 border border-border mb-3">
                <p className="text-sm font-semibold text-foreground mb-1">Technical pitfalls that invalidate an "absent N20"</p>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li><strong>Noisy recording:</strong> ICU electrical interference (pumps, CRRT, warming devices, mains 50 Hz artefact) and muscle activity raise the noise floor. Absence can only be declared when background noise is low (peak-to-peak amplitude &lt; 0.25 µV) — otherwise the result is "uninterpretable", not "absent".</li>
                  <li><strong>No proof the stimulus arrived:</strong> the peripheral (Erb's point, N9) and cervical (N13) responses must be present bilaterally to confirm intact conduction; peripheral nerve injury, critical-illness neuropathy, oedematous wrists, cervical cord or brachial plexus pathology otherwise produce a false "absent N20".</li>
                  <li><strong>Physiological confounders:</strong> temperature below about 33 °C, high-dose sedation or neuromuscular blockade, hypotension, and severe metabolic derangement — record after rewarming and with confounders minimised.</li>
                  <li><strong>Timing and repetition:</strong> record at ≥ 24 h after ROSC, ideally repeat, and require reproducible bilateral absence in two independent averaged trials read by an experienced neurophysiologist.</li>
                  <li><strong>Interpretation asymmetry:</strong> a <em>present</em> N20 has poor specificity for good outcome — it does not predict recovery, and unilateral absence is not a poor-outcome criterion <InlineRef topicId="neuroprognostication" refLabel="ERC/ESICM 2021 Post-Resus" />.</li>
                </ul>
              </div>

            </div>

            {/* Modality 4: Biomarkers */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">4. Biomarkers</h2>
              <p className="text-muted-foreground leading-relaxed mb-2 text-sm">
                <strong className="text-foreground">Neuron-specific enolase (NSE)</strong> remains the only
                biomarker formally embedded in the ERC/ESICM algorithm.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
                <li>Released from injured neurons; concentrations peak 48–72 h after ROSC.</li>
                <li>Threshold for poor outcome: <strong>NSE &gt; 60 µg/L at 48 h and/or 72 h</strong>; a <em>rising</em> trend strengthens the prediction.</li>
                <li>Reject haemolysed samples — NSE is abundant in erythrocytes and even mild haemolysis falsely elevates results.</li>
                <li>Other sources of false elevation: neuroendocrine tumours, small-cell lung cancer, ECMO-related haemolysis.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-2 text-sm">
                <strong className="text-foreground">Emerging biomarkers</strong> (not yet part of the
                formal ERC/ESICM criteria, but increasingly reported in exam-level and clinical literature):
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
                <li>
                  <strong>GFAP (glial fibrillary acidic protein)</strong> — released from injured
                  astrocytes; peaks slightly later than NSE, at around <strong>48–72 h</strong> post-ROSC.
                  Meta-analytic data show good discriminatory accuracy for poor outcome (AUC ≈ 0.88 at
                  72 h), but it remains <em>investigational</em> pending standardised assay cut-offs and
                  external validation before routine clinical use
                  <InlineRef topicId="neuroprognostication" refLabel="GFAP Meta-analysis 2026" />.
                </li>
                <li>
                  <strong>Neurofilament light chain (NfL)</strong> — a marker of axonal injury with a
                  later and more prolonged peak than NSE or GFAP; may add prognostic value for
                  <strong> later</strong> assessment (&gt; 7 days post-ROSC) in patients with an initially
                  indeterminate multimodal result, but is not part of the 72 h algorithm.
                </li>
                <li>
                  <strong>S100B</strong> — released from astrocytes and adipocytes (less neurospecific
                  than NSE or GFAP); still <strong>not incorporated</strong> into the ERC/ESICM
                  algorithm.
                </li>
              </ul>
            </div>

            {/* Modality 5: Neuroimaging */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">5. Neuroimaging</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">CT brain (early, &lt; 24 h)</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    <strong>Generalised oedema</strong> with effacement of sulci and loss of grey–white
                    matter differentiation (GWR &lt; 1.10–1.15 at basal ganglia level) predicts poor
                    outcome. Useful when MRI not feasible.
                  </p>
                </div>
                <div className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">MRI brain (2–7 days)</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    <strong>Diffuse restricted diffusion on DWI</strong> involving cortex and deep grey
                    nuclei. ADC values &lt; 650 × 10⁻⁶ mm²/s in &gt; 10 % of brain tissue predict poor
                    outcome. Best obtained 2–5 days post-ROSC.
                  </p>
                </div>
              </div>
            </div>

            {/* The multimodal algorithm */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Putting it together — multimodal algorithm</h2>
              <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-2">
                <li>At ≥ 72 h, confirm entry criteria (comatose, M ≤ 3, confounders excluded).</li>
                <li>Examine pupillary and corneal reflexes — if both absent, this is criterion 1.</li>
                <li>Document any status myoclonus within the first 72 h — criterion 2 if present.</li>
                <li>Send NSE at 48 h and 72 h (non-haemolysed) — criterion 3 if &gt; 60 µg/L and/or rising.</li>
                <li>Record SSEPs after rewarming — bilateral absent N20 = criterion 4.</li>
                <li>EEG (continuous or routine ≥ 24 h post-ROSC) — highly malignant pattern = criterion 5.</li>
                <li>Imaging — diffuse anoxic injury on CT or MRI = criterion 6.</li>
                <li>Poor outcome is "likely" when <strong>≥ 2 criteria are concordant</strong>. If only one is positive, the result is <strong>indeterminate</strong> — continue care and re-evaluate.</li>
              </ol>
              <p className="text-sm text-muted-foreground mt-3">
                The ERC/ESICM algorithm explicitly avoids predicting <em>good</em> outcome — clinicians
                must remain open to late recovery and avoid premature WLST in indeterminate cases.
              </p>
            </div>

            {/* Confounders */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Confounders that invalidate the assessment</h2>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li><strong>Residual sedation</strong> — propofol context-sensitive half-time rises sharply with prolonged infusions; midazolam accumulates in renal failure; fentanyl in obesity. Always wait ≥ 5 half-lives, with TOF and BIS as adjuncts.</li>
                <li><strong>Neuromuscular blockade</strong> — abolishes motor response and corneal reflex testing. Confirm TOF = 4/4.</li>
                <li><strong>Hypothermia</strong> — &lt; 36 °C suppresses pupil and brainstem reflexes and slows drug clearance.</li>
                <li><strong>Metabolic</strong> — severe hyponatraemia, hypoglycaemia/hyperglycaemia, uraemia, hepatic encephalopathy all confound clinical and EEG findings.</li>
                <li><strong>Shock / multi-organ failure</strong> — drug accumulation, impaired clearance, and global hypoperfusion can mimic irreversible HIBI.</li>
                <li><strong>Recent seizure</strong> — postictal state may produce a transient highly malignant EEG. Repeat after 24 h.</li>
              </ul>
            </div>

            {/* Cognitive-motor dissociation */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Cognitive-motor dissociation (covert consciousness)</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                <strong>Cognitive-motor dissociation (CMD)</strong> describes a state in which a patient
                shows no behavioural or motor response to command (motor score M1–M3) despite
                demonstrable, preserved higher-order cortical processing detectable only on
                neurophysiological or functional imaging testing
                <InlineRef topicId="neuroprognostication" refLabel="EHJ-ACC 2023 (Neuroprognostication)" />.
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
                <li><strong>Significance:</strong> a proportion of behaviourally unresponsive patients (M1–M3) who appear to lack awareness on bedside examination retain some degree of covert consciousness — a critical caveat for prognostication and WLST decision-making.</li>
                <li><strong>Detection:</strong> EEG motor-imagery paradigms — asking the patient to imagine repetitive movement (e.g. "keep imagining opening and closing your right hand") and looking for a reproducible, task-appropriate EEG response over sensorimotor cortex; equivalent paradigms using functional MRI (imagined motor or spatial-navigation tasks) can show appropriate cortical activation despite absent overt behaviour.</li>
                <li><strong>Implications:</strong> CMD is a key argument for <strong>multimodal</strong> assessment and against decisions based on clinical examination or a single test alone. Extreme caution is warranted before WLST in patients with an indeterminate multimodal result, particularly where the EEG background is benign/reactive with sleep–wake cycles, as this combination raises the possibility of covert awareness or later recovery.</li>
              </ul>
            </div>

            {/* Predicting good outcome */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Predicting a <em>good</em> outcome</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                The ERC/ESICM algorithm is designed only to identify patients in whom a poor outcome is
                very likely; the absence of poor-outcome criteria is not the same as a prediction of
                recovery. Predictors of good outcome are less well validated but increasingly
                described, and matter because they justify continued treatment and more time before any
                decision on withdrawal
                <InlineRef topicId="neuroprognostication" refLabel="EHJ-ACC 2023 (Neuroprognostication)" />.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mb-3">
                <div className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">Features favouring recovery</p>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1 mt-1">
                    <li>Continuous, reactive EEG background with normal voltage, and re-emergence of sleep–wake patterns.</li>
                    <li>Low or falling NSE (broadly &lt; 17 µg/L at 24–48 h) and low GFAP/NfL where available.</li>
                    <li>Present and symmetrical N20 with a normal cortical amplitude (higher N20 amplitudes are associated with better outcome).</li>
                    <li>Normal brain CT grey/white matter ratio and absence of diffusion restriction on MRI.</li>
                    <li>Early return of brainstem reflexes, preserved pupillary quantitative light-reflex (NPi ≥ 3), and improving motor score by 72 h.</li>
                    <li>Favourable arrest characteristics: witnessed collapse, bystander CPR, shockable rhythm, short low-flow time, and a reversible cardiac cause.</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">How to use them</p>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1 mt-1">
                    <li>Treat these as reasons to <strong>wait and continue full support</strong>, not as a promise of recovery.</li>
                    <li>Late awakening is common — a substantial proportion of survivors regain consciousness after 72 h, and occasionally after a week or more, particularly with sedation, renal failure or hypothermia.</li>
                    <li>Where the multimodal result is indeterminate, extend observation, repeat EEG and imaging, and consider testing for cognitive-motor dissociation before any decision on withdrawal.</li>
                    <li>Document the balance of poor- and good-outcome indicators explicitly in the family discussion, and involve neurology/neurophysiology.</li>
                  </ul>
                </div>
              </div>
            </div>


            {/* Communication */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Communication, ethics & WLST</h2>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Document the modalities used, the time after ROSC, and the named clinicians performing the assessment.</li>
                <li>Discuss findings with a second senior intensivist before any family conversation about WLST.</li>
                <li>Frame the conversation as <em>likely</em> poor outcome — not certainty. Acknowledge the indeterminate band and the self-fulfilling prophecy risk.</li>
                <li>Align with the patient's previously expressed wishes (advance decisions, ReSPECT form, family knowledge).</li>
                <li>Where DCD pathways are relevant, prognostication is the entry gate — apply it rigorously before any organ-donation discussion.</li>
              </ul>
            </div>

            {/* Pitfalls */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Common exam pitfalls</h2>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Prognosticating before 72 h, or before sedation clearance.</li>
                <li>Acting on a single modality — every criterion's confidence interval crosses 5 % FPR.</li>
                <li>Accepting a haemolysed NSE result.</li>
                <li>Mistaking Lance–Adams syndrome for status myoclonus.</li>
                <li>Forgetting that the M ≤ 3 entry criterion is <em>not itself</em> a prognostic finding.</li>
                <li>Conflating "poor outcome unlikely" with "good outcome likely" — the algorithm does not predict good outcome.</li>
              </ul>
            </div>
          </section>
        </ExamSection>
          <TopicFaqs faqs={neuroprognosticationFaqs} />
        </>
      }
    />
  );
};

export default NeuroprognosticationTopic;
