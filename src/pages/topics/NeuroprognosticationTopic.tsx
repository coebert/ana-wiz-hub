import { TopicTemplate } from "@/components/TopicTemplate";
import { TopicFaqs } from "@/components/TopicFaqs";
import { Exam } from "@/data/curriculum";
import { ExamSection } from "@/components/ExamSection";
import { cardiacArrestPostResusQuestions } from "@/data/quizzes";
import type { WorkedExample } from "@/components/WorkedExamples";

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
                  background (&lt; 10 µV) with or without periodic discharges; burst-suppression with
                  <em> identical</em> bursts. Specificity approaches 100 % at &gt; 24 h post-ROSC.
                </p>
                <p>
                  <strong className="text-foreground">Malignant (intermediate):</strong> burst-suppression
                  with non-identical bursts; abundant rhythmic/periodic discharges; electrographic status
                  epilepticus. Not by itself sufficient — combine with another modality.
                </p>
                <p>
                  <strong className="text-foreground">Benign:</strong> continuous background with
                  reactivity. Strong predictor of <em>good</em> outcome when seen early.
                </p>
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
              <p className="text-sm text-muted-foreground">
                Pitfalls: technical noise (peripheral nerve injury, electrical interference), prior
                cervical spine pathology, profound hypothermia, and severe sedation can all abolish
                N20 without irreversible brain injury.
              </p>
            </div>

            {/* Modality 4: Biomarkers */}
            <div>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">4. Biomarkers — Neuron-Specific Enolase</h2>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1 mb-3">
                <li>NSE released from injured neurons; concentrations peak 48–72 h after ROSC.</li>
                <li>Threshold for poor outcome: <strong>NSE &gt; 60 µg/L at 48 h and/or 72 h</strong>; a <em>rising</em> trend strengthens the prediction.</li>
                <li>Reject haemolysed samples — NSE is abundant in erythrocytes and even mild haemolysis falsely elevates results.</li>
                <li>Other sources of false elevation: neuroendocrine tumours, small-cell lung cancer, ECMO-related haemolysis.</li>
                <li>S100B and neurofilament light chain (NfL) are promising but not yet in the ERC algorithm.</li>
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
