import { useState } from "react";
import { ExamSection } from "@/components/ExamSection";
import EEGTraceDiagram from "@/components/diagrams/EEGTraceDiagram";
import ExpandableEcgCard from "@/components/diagrams/ExpandableEcgCard";
import { eegTraceContent, dsaSpectrogramContent, bisTrendContent } from "@/components/diagrams/ecgExpandedContent";
import DSASpectrogramDiagram from "@/components/diagrams/DSASpectrogramDiagram";
import BISTrendDiagram from "@/components/diagrams/BISTrendDiagram";
import { TopicTemplate } from "@/components/TopicTemplate";
import { TopicFaqs } from "@/components/TopicFaqs";
import { WorkedExample } from "@/components/WorkedExamples";
import { SynthesisBlock } from "@/components/SynthesisBlock";
import { depthOfAnaesthesiaQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const depthOfAnaesthesiaMonitoringFaqs: Array<[string, string]> = [
  [
    "What is the target BIS range for general anaesthesia and what is its evidence base?",
    "BIS 40–60 corresponds to surgical anaesthesia. B-Aware and B-Unaware trials showed BIS-guided anaesthesia reduces awareness in high-risk patients (TIVA, paralysed, low-MAC techniques). NICE DG6 recommends DoA monitoring for TIVA and for any case where end-tidal volatile monitoring is unreliable. BIS values are derived from EEG but are not a direct EEG; they lag by 15–30 s."
  ],
  [
    "How does processed EEG differ from raw EEG?",
    "Raw EEG — continuous voltage trace, requires expert interpretation. Processed EEG (BIS, Entropy, Narcotrend) applies algorithms (frequency-domain analysis, burst-suppression detection) to produce a single dimensionless number (0–100). Newer monitors (e.g. Sedline) show colour-density spectrograms — clinically more informative than a number, especially in the elderly."
  ],
  [
    "What are the limitations of BIS monitoring?",
    "Unreliable with ketamine and nitrous oxide (BIS may remain high despite deep anaesthesia), with cerebral ischaemia/hypothermia (artificially low), with neuromuscular blockade absent (frontalis EMG inflates the value), and with paediatric brains <2 years. EMG artefact and electrocautery interfere. BIS does not abolish awareness — it reduces incidence but does not eliminate it."
  ]
];

const objectives = [
  "Explain the rationale for processed EEG monitoring with reference to NAP5, NICE and AAGBI guidance.",
  "Describe the EEG bands (β/α/θ/δ) and how they change with anaesthetic depth.",
  "Compare BIS, Entropy and Narcotrend in terms of scale, algorithm and unique parameters.",
  "Interpret SEF95, suppression ratio and density spectral array on a depth monitor.",
  "Recognise common artefacts (EMG, NMB, ketamine, diathermy) and limitations of processed EEG.",
];

const keyPoints = [
  { text: "BIS target 40–60 for GA. BIS >60 with NMB = awareness risk. BIS <40 sustained = excessive depth", cites: ["Purdon et al. 2015"] },
  { text: "Suppression Ratio: % of time EEG is isoelectric — any SR >0% indicates burst suppression, reduce anaesthetic", cites: ["BJA Educ 2014"] },
  { text: "SEF95: frequency below which 95% of EEG power lies. Awake ~25 Hz, anaesthetised ~10–15 Hz, deep <8 Hz", cites: ["NICE DG6"] },
  { text: "Entropy: RE−SE gap >5–10 suggests EMG activation (pain/light anaesthesia) — unique nociception indicator", cites: ["NAP5 2014"] },
  { text: "Narcotrend: stages A–F with NI 0–100. Target D0–D2 (NI 37–65). Pattern recognition rather than spectral analysis", cites: ["Purdon et al. 2015"] },
  { text: "EMG contamination falsely ELEVATES BIS. NMB may artefactually DROP BIS by removing EMG — not deeper anaesthesia", cites: ["BJA Educ 2014"] },
  { text: "Ketamine causes high BIS despite adequate anaesthesia (beta EEG activation) — processed EEG unreliable", cites: ["NICE DG6"] },
  { text: "NAP5: awareness 1:19,600 overall, 1:8,000 with TIVA. Recommends processed EEG for all TIVA cases", cites: ["NAP5 2014"] },
];

type Monitor = "bis" | "entropy" | "narcotrend";

const monitors: Record<Monitor, {
  label: string;
  fullName: string;
  manufacturer: string;
  method: string;
  range: { label: string; value: string; meaning: string }[];
  extras: { param: string; detail: string }[];
}> = {
  bis: {
    label: "BIS",
    fullName: "Bispectral Index",
    manufacturer: "Medtronic (formerly Aspect Medical)",
    method: "Single-channel frontal EEG → proprietary algorithm combining time-domain, frequency-domain, and bispectral analysis. Uses a 4-electrode sensor on the forehead. Outputs a dimensionless number 0–100.",
    range: [
      { label: "100", value: "100", meaning: "Fully awake" },
      { label: "80–100", value: "80–100", meaning: "Light sedation / anxiolysis" },
      { label: "60–80", value: "60–80", meaning: "Light to moderate hypnotic state — risk of awareness" },
      { label: "40–60", value: "40–60", meaning: "General anaesthesia — recommended target range" },
      { label: "20–40", value: "20–40", meaning: "Deep hypnotic state — approaching burst suppression" },
      { label: "0", value: "0", meaning: "Isoelectric EEG / cortical silence" },
    ],
    extras: [
      { param: "Suppression Ratio (SR)", detail: "Percentage of time in the preceding 63 seconds during which the EEG is isoelectric (amplitude <0.5 µV). SR 0% = no suppression (normal). SR 100% = completely isoelectric. Values >0% at BIS <30 indicate burst suppression. Clinically: excessive depth, reduce anaesthetic. Associated with postoperative delirium and cognitive dysfunction in the elderly." },
      { param: "Signal Quality Index (SQI)", detail: "0–100%. Measures reliability of the BIS value. SQI <50% = unreliable — check electrode impedance, contact, EMG artefact. High EMG activity (shivering, frontalis contraction) can falsely elevate BIS." },
      { param: "Electromyographic (EMG) bar", detail: "Displays EMG power (30–300 Hz). High EMG contaminates the EEG signal → falsely elevated BIS. Common causes: light anaesthesia, pain response, shivering, neuromuscular activity. NMB agents abolish EMG but do NOT affect cortical EEG — BIS may drop artefactually when paralysis eliminates EMG." },
      { param: "Spectral Edge Frequency (SEF95)", detail: "The frequency below which 95% of the total EEG power lies. Awake: SEF95 ~25–30 Hz. Adequate anaesthesia: SEF95 ~10–15 Hz. Deep anaesthesia/burst suppression: SEF95 <8 Hz. Useful adjunct — raw number less susceptible to proprietary algorithm artefacts." },
    ],
  },
  entropy: {
    label: "Entropy",
    fullName: "GE Entropy Module (State Entropy & Response Entropy)",
    manufacturer: "GE Healthcare",
    method: "Uses entropy (irregularity/disorder) of the frontal EEG signal. Based on spectral entropy — measures the randomness of the power spectrum. Two simultaneous values from a 3-electrode sensor.",
    range: [
      { label: "SE 91 / RE 100", value: "91 / 100", meaning: "Fully awake" },
      { label: "SE 60–80 / RE 70–90", value: "60–80 / 70–90", meaning: "Light anaesthesia" },
      { label: "SE 40–60 / RE 50–70", value: "40–60 / 50–70", meaning: "Adequate general anaesthesia — target range" },
      { label: "SE <40 / RE <50", value: "<40 / <50", meaning: "Deep anaesthesia" },
      { label: "SE 0 / RE 0", value: "0 / 0", meaning: "Isoelectric EEG" },
    ],
    extras: [
      { param: "State Entropy (SE)", detail: "Range 0–91. Analyses EEG frequencies 0.8–32 Hz only (cortical activity). Reflects the hypnotic component of anaesthesia. Equivalent to the 'cortical' depth measure. Less affected by EMG artefact than RE." },
      { param: "Response Entropy (RE)", detail: "Range 0–100. Analyses EEG + EMG frequencies 0.8–47 Hz. Includes frontalis EMG activity. RE > SE gap indicates facial EMG activation → possible inadequate analgesia or light anaesthesia. RE − SE difference is a clinical clue: gap >5–10 suggests nociceptive response." },
      { param: "RE − SE Difference", detail: "When RE ≈ SE: no significant EMG → adequate depth. When RE >> SE: EMG activation (pain, arousal). This is unique to Entropy — provides a built-in 'nociception indicator' without needing a separate parameter. Useful for titrating analgesics vs hypnotics." },
      { param: "Burst Suppression", detail: "Detected when SE drops below 20. Entropy algorithm identifies burst suppression patterns similarly to BIS SR. Displayed as very low SE with intermittent spikes. Same clinical significance as BIS SR — reduce anaesthetic depth." },
    ],
  },
  narcotrend: {
    label: "Narcotrend",
    fullName: "Narcotrend Compact M",
    manufacturer: "Narcotrend-Gruppe (MonitorTechnik)",
    method: "Single-channel frontal EEG analysed by pattern recognition algorithm classifying EEG into stages (A–F) analogous to sleep staging. Also provides a numerical Narcotrend Index (NI) 0–100. Uses 2–3 electrode montage.",
    range: [
      { label: "A (NI 95–100)", value: "A", meaning: "Awake" },
      { label: "B (NI 80–95)", value: "B", meaning: "Sedated / drowsy (B0–B2)" },
      { label: "C (NI 65–80)", value: "C", meaning: "Light anaesthesia (C0–C2)" },
      { label: "D (NI 37–65)", value: "D", meaning: "General anaesthesia — target range (D0–D2)" },
      { label: "E (NI 13–37)", value: "E", meaning: "Deep anaesthesia with burst suppression (E0–E2)" },
      { label: "F (NI 0–13)", value: "F", meaning: "Burst suppression → isoelectric (F0–F1)" },
    ],
    extras: [
      { param: "EEG Staging (A–F)", detail: "Based on automated pattern recognition comparing the patient's EEG to a database of classified EEG patterns. Each stage has substages (e.g., D0, D1, D2). Stages map to classical EEG descriptions: D corresponds to high-amplitude, low-frequency delta/theta activity typical of surgical anaesthesia." },
      { param: "Narcotrend Index (NI)", detail: "Continuous numerical value 0–100, derived from the EEG staging. Provides finer granularity than letter stages alone. Target: D0–D2 (NI 37–65) for general anaesthesia. Correlation with BIS is generally good (r ~0.9) though not perfectly interchangeable." },
      { param: "Suppression Time", detail: "Duration of EEG suppression periods within the analysis window. Analogous to BIS suppression ratio but reported differently. Increasing suppression time at low NI values (<20) indicates excessive depth. Used to detect burst suppression patterns in stages E and F." },
      { param: "Cerebral State Index (CSI)", detail: "Some Narcotrend models display additional parameters including power spectrum analysis and SEF. The visual EEG trace and density spectral array (DSA/spectrogram) help experienced users identify EEG patterns directly — an advantage over 'black box' single-number displays." },
    ],
  },
};

const DepthOfAnaesthesiaMonitoringTopicWorkedExamples: WorkedExample[] = [
  {
    title: "Awareness risk in TIVA with neuromuscular blockade",
    scenario: "Propofol/remifentanil TIVA with rocuronium for laparoscopic surgery. BIS reads 62 despite Ce propofol 4 µg/mL. How do you respond and what does NAP5 say?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Confirm BIS signal quality (SQI &gt;80, EMG &lt;40) — high frontalis EMG inflates BIS</li>
          <li>Cross-check TCI: pump infusing, IV cannula patent, no extravasation, line connections secure (TIVA disconnects underlie many NAP5 awareness cases)</li>
          <li>Deepen anaesthesia: bolus propofol 0.5–1 mg/kg, increase Ce target, consider adding low-dose volatile if available</li>
          <li>Document any patient warning signs (lacrimation, sweating, hypertension, tachycardia in absence of stimulus)</li>
          <li>NAP5: TIVA with NMB carries the highest awareness risk — use processed EEG and end-of-case debrief; avoid running BIS &gt;60 sustained</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
          <li>Trusting BIS in ketamine, N₂O or dexmedetomidine anaesthesia — paradoxical readings</li>
          <li>Ignoring electrocautery artefact that transiently inflates BIS</li>
          <li>Failing to maintain anaesthesia during transfer/induction of paralysis</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Check TIVA delivery, deepen anaesthesia to target BIS 40–60, and document. NAP5 mandates depth-of-anaesthesia monitoring when NMB is used with TIVA.",
    cites: ["NAP5 2014", "NICE DG6", "BJA Educ 2014"],
  },
];

const DepthOfAnaesthesiaMonitoringTopic = () => {
  const [selectedMonitor, setSelectedMonitor] = useState<Monitor>("bis");
  const info = monitors[selectedMonitor];

  return (
    <TopicTemplate
      title="Depth of Anaesthesia Monitoring"
      subtitle="FRCA Primary & Final / FFICM — Physics & Clinical Measurement"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      topicId="depth-of-anaesthesia"
      topicTitle="Depth of Anaesthesia Monitoring"
      workedExamples={DepthOfAnaesthesiaMonitoringTopicWorkedExamples}
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={depthOfAnaesthesiaQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: [
          "NAP5 2014",
          "NICE DG6",
          "BJA Educ 2014",
          "Purdon et al. 2015",
        ],
        keyPoints: [
          "NAP5 2014",
          "NICE DG6",
          "BJA Educ 2014",
          "Purdon et al. 2015",
        ],
      }}
      coreConcepts={
        <>
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
      {/* Introduction */}
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Why Monitor Depth of Anaesthesia?</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Depth of anaesthesia monitoring aims to reduce the risk of intraoperative awareness (incidence ~1:19,000 with neuromuscular blockade — NAP5 2014), avoid unnecessarily deep anaesthesia (associated with postoperative delirium and mortality in the elderly), and guide titration of anaesthetic agents to an individual patient's needs.
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">NAP5 (2014)</p>
              <p className="text-xs text-muted-foreground mt-1">5th National Audit Project. Incidence of accidental awareness during GA in the UK: 1:19,600 overall. Higher risk with TIVA (1:8,000) and NMB use. Recommended processed EEG monitoring for all TIVA cases.</p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">NICE Guidance (2012)</p>
              <p className="text-xs text-muted-foreground mt-1">Recommends considering EEG-based depth monitoring in patients receiving TIVA, at higher risk of awareness (e.g., emergency CS, cardiac surgery, trauma), or where clinical signs are unreliable.</p>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="font-semibold text-foreground text-sm">Association of Anaesthetists Guidelines (2017)</p>
              <p className="text-xs text-muted-foreground mt-1">Association of Anaesthetists: processed EEG should be used for all TIVA, considered when NMB used, and in high-risk cases. Monitor does NOT replace clinical vigilance — it is an adjunct.</p>
            </div>
          </div>
        </div>

        {/* EEG Fundamentals — foundations before drilling into traces */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">EEG Fundamentals for Anaesthetists</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            All processed EEG monitors derive their output from raw electroencephalography. Understanding the key EEG parameters helps interpret monitor values and troubleshoot artefacts.
          </p>

          <div className="my-6">
            <ExpandableEcgCard content={eegTraceContent}>
              {() => <EEGTraceDiagram />}
            </ExpandableEcgCard>
          </div>
          <div className="my-6">
            <ExpandableEcgCard content={dsaSpectrogramContent}>
              {() => <DSASpectrogramDiagram />}
            </ExpandableEcgCard>
          </div>
          <div className="my-6">
            <ExpandableEcgCard content={bisTrendContent}>
              {() => <BISTrendDiagram />}
            </ExpandableEcgCard>
          </div>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">EEG Band</th>
                  <th className="text-left py-2 text-foreground font-semibold">Frequency</th>
                  <th className="text-left py-2 text-foreground font-semibold">Clinical State</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Beta (β)</td><td>13–30 Hz</td><td>Awake, alert, anxious. Dominant with eyes open.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Alpha (α)</td><td>8–13 Hz</td><td>Relaxed, eyes closed. Prominent over occipital cortex. 'Alpha anteriorisation' seen with anaesthetic induction.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Theta (θ)</td><td>4–8 Hz</td><td>Drowsiness, light sedation, light anaesthesia.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Delta (δ)</td><td>0.5–4 Hz</td><td>Deep sleep, deep anaesthesia. High-amplitude slow waves.</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Burst Suppression</td><td>Variable</td><td>Alternating bursts of activity and isoelectric periods. Very deep anaesthesia / cerebral insult.</td></tr>
              </tbody>
            </table>
          </div>

          {/* Key Derived Parameters */}
          <h3 className="text-lg font-serif font-semibold text-foreground mb-2">Key Derived Parameters (All Monitors)</h3>
          <div className="space-y-2 mb-4">
            {[
              { param: "Spectral Edge Frequency (SEF95)", detail: "The frequency below which 95% of total EEG power lies. Awake: 25–30 Hz. Adequate anaesthesia: 10–15 Hz. Deep anaesthesia: <8 Hz. Progressively decreases with increasing anaesthetic depth. Less susceptible to proprietary algorithm errors — a useful cross-check." },
              { param: "Median Frequency (MF50)", detail: "The frequency that divides the EEG power spectrum into two equal halves. Awake: ~12 Hz. Anaesthetised: 2–5 Hz. Similar trend to SEF95 but more affected by low-frequency artefact." },
              { param: "Suppression Ratio (SR)", detail: "Percentage of time in the analysis epoch during which EEG amplitude is <0.5 µV (isoelectric). SR 0% = no suppression. SR 100% = completely flat trace. Any SR >0% indicates burst suppression — clinical action required (reduce anaesthetic). BIS reports SR over 63 seconds. Associated with postoperative delirium (CODA trial)." },
              { param: "Burst Suppression", detail: "Pattern of alternating high-voltage bursts and isoelectric periods. Represents profound cortical depression. Can be caused by deep anaesthesia, hypothermia, severe cerebral injury, or metabolic derangement. All monitors detect it — BIS (SR%), Entropy (low SE), Narcotrend (stages E–F)." },
              { param: "Density Spectral Array (DSA) / Spectrogram", detail: "Visual time-frequency representation of EEG power. Colour-coded: typically blue = low power, red = high power. Shows evolution of EEG frequencies over time. Experienced users can identify anaesthetic transitions, artefact, and burst suppression at a glance. Available on most modern displays." },
            ].map((p) => (
              <div key={p.param} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{p.param}</p>
                <p className="text-xs text-muted-foreground mt-1">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Monitor Comparison */}
      <div className="border border-border rounded-lg p-4 mb-10">
        <h3 className="text-lg font-serif font-bold text-foreground mb-1">Monitor Comparison — BIS vs Entropy vs Narcotrend</h3>
        <p className="text-xs text-muted-foreground mb-4">Select a monitor to explore its parameters, scales, and unique features</p>

        <div className="flex gap-2 mb-5">
          {(Object.keys(monitors) as Monitor[]).map((m) => (
            <button key={m} onClick={() => setSelectedMonitor(m)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                selectedMonitor === m
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}>
              {monitors[m].label}
            </button>
          ))}
        </div>

        <div className="animate-fade-in" key={selectedMonitor}>
          {/* Monitor header */}
          <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 mb-4">
            <p className="font-bold text-foreground">{info.fullName}</p>
            <p className="text-xs text-muted-foreground mt-1"><strong>Manufacturer:</strong> {info.manufacturer}</p>
            <p className="text-xs text-muted-foreground mt-1">{info.method}</p>
          </div>

          {/* Scale visualisation */}
          <div className="mb-4">
            <p className="text-sm font-semibold text-foreground mb-2">Scale & Target Ranges</p>
            <div className="space-y-1">
              {info.range.map((r, i) => {
                const isTarget = r.meaning.toLowerCase().includes("target") || r.meaning.toLowerCase().includes("general anaesthesia");
                return (
                  <div key={i} className={`flex items-center gap-3 p-2 rounded-lg border ${isTarget ? "border-primary/40 bg-primary/5" : "border-border"}`}>
                    <span className={`text-sm font-mono font-bold min-w-[80px] ${isTarget ? "text-primary" : "text-foreground"}`}>{r.value}</span>
                    <span className="text-xs text-muted-foreground flex-1">{r.meaning}</span>
                    {isTarget && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary text-primary-foreground">TARGET</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Monitor-specific parameters */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-2">Key Parameters & Features</p>
            <div className="space-y-2">
              {info.extras.map((e) => (
                <div key={e.param} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{e.param}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{e.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Head-to-Head Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Feature</th>
                  <th className="text-left py-2 text-foreground font-semibold">BIS</th>
                  <th className="text-left py-2 text-foreground font-semibold">Entropy</th>
                  <th className="text-left py-2 text-foreground font-semibold">Narcotrend</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Scale</td><td>0–100</td><td>SE 0–91, RE 0–100</td><td>A–F (NI 0–100)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Target (GA)</td><td>40–60</td><td>SE 40–60</td><td>D0–D2 (NI 37–65)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Algorithm</td><td>Proprietary bispectral analysis</td><td>Spectral entropy</td><td>Pattern recognition / classification</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">EMG discrimination</td><td>Separate EMG bar</td><td>RE−SE gap detects EMG</td><td>Limited EMG separation</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Suppression detection</td><td>Suppression Ratio (%)</td><td>Low SE values</td><td>Stages E–F, suppression time</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Delay</td><td>~15–30 seconds</td><td>~15–20 seconds</td><td>~20 seconds</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Electrodes</td><td>4 (proprietary sensor)</td><td>3 (proprietary sensor)</td><td>2–3 (reusable option)</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Key evidence</td><td>Most studied. B-Aware, BAG-RECALL, MACS trials</td><td>Less RCT data. Integrated into GE monitors.</td><td>Moderate evidence base. More common in Europe.</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Limitations & Artefacts */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Limitations & Artefacts</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { title: "EMG Contamination", detail: "Frontalis muscle activity (shivering, pain, light anaesthesia) generates high-frequency signals that can falsely ELEVATE BIS/Entropy values. Neuromuscular blockade removes EMG but does NOT affect consciousness — BIS may paradoxically DROP when NMB given (removal of EMG artefact, not deeper anaesthesia)." },
              { title: "Ketamine & N₂O", detail: "Ketamine causes dissociative anaesthesia with paradoxically high BIS values (>60) despite adequate anaesthesia — EEG shows beta activation. N₂O has minimal effect on BIS. These agents render processed EEG unreliable as a sole depth indicator." },
              { title: "Neurological Conditions", detail: "Pre-existing EEG abnormalities (epilepsy, dementia, encephalopathy, brain injury) alter baseline values and reduce reliability. Post-ictal suppression mimics deep anaesthesia. Brain death → BIS 0 with SR 100%." },
              { title: "Electrical Interference", detail: "Diathermy, pacing, warming devices, and forced-air warmers can generate artefact. Results in erratic or falsely high/low values. Check SQI — if <50%, value unreliable. Ensure good electrode contact and low impedance." },
              { title: "Age & Drug Interactions", detail: "Neonates and infants have different baseline EEG patterns — monitors are validated for adults (>1 year for BIS). Elderly patients may have lower baseline values. Opioids alone cause minimal EEG change — processed EEG monitors primarily detect HYPNOTIC depth, not analgesia." },
              { title: "Volatile vs TIVA", detail: "All monitors perform better with TIVA (propofol) than volatile agents. Sevoflurane can cause paradoxical EEG excitation (epileptiform activity) especially at high concentrations → BIS may fluctuate unpredictably. End-tidal agent monitoring remains important for volatile anaesthesia." },
            ].map((l) => (
              <div key={l.title} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{l.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{l.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Evidence */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Key Evidence</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Trial</th>
                  <th className="text-left py-2 text-foreground font-semibold">Finding</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">B-Aware (2004)</td>
                  <td className="py-2">BIS-guided anaesthesia reduced awareness by 82% in high-risk patients (NNT 138). First major RCT supporting processed EEG monitoring.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">BAG-RECALL (2011)</td>
                  <td className="py-2">BIS vs ETAG-guided anaesthesia: no difference in awareness rates in unselected surgical patients. Suggested BIS not superior to careful ETAG monitoring for volatile anaesthesia.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">NAP5 (2014)</td>
                  <td className="py-2">UK national audit: 1:19,600 awareness incidence. 1:8,000 with TIVA. Recommended processed EEG for all TIVA. Most awareness occurred during induction/emergence.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">CODA (2019)</td>
                  <td className="py-2">EEG-guided anaesthesia (targeting BIS &gt;45) in elderly patients (&gt;60 yr) did not significantly reduce postoperative delirium vs usual care. Challenged the hypothesis that depth monitoring prevents delirium.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">ENGAGES (2019)</td>
                  <td className="py-2">BIS-guided care vs usual care in elderly: no reduction in postoperative delirium. However, cumulative time at low BIS (&lt;40) was independently associated with delirium.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Clinical Practice */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Clinical Practice Recommendations</h2>
          <div className="space-y-2">
            {[
              { rec: "Use processed EEG for ALL TIVA cases", detail: "No end-tidal agent to guide dosing. Risk of awareness is 5× higher with TIVA (NAP5). BIS/Entropy is the primary depth indicator alongside clinical signs." },
              { rec: "Consider for high-risk patients", detail: "Emergency surgery, cardiac surgery, caesarean section under GA, haemodynamically unstable patients where anaesthetic is deliberately limited, prior history of awareness." },
              { rec: "Target BIS/SE 40–60 for general anaesthesia", detail: "Avoid sustained BIS <40 especially in elderly (association with delirium). Avoid BIS >60 with NMB (awareness risk). Use SQI and EMG to validate readings." },
              { rec: "Monitor SR — aim for 0%", detail: "Any suppression ratio >0% = burst suppression. Reduce anaesthetic depth. Particularly important in the elderly. Suppression time >10% of total anaesthetic associated with worse outcomes." },
              { rec: "Interpret in context — never rely on number alone", detail: "Cross-reference with clinical signs (HR, BP, lacrimation, movement), ETAG (volatiles), plasma concentration estimates (TCI), SEF95, and raw EEG/spectrogram. The number is a guide, not a guarantee." },
            ].map((r) => (
              <div key={r.rec} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{r.rec}</p>
                <p className="text-xs text-muted-foreground mt-1">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SynthesisBlock
        title="Depth of Anaesthesia Monitoring — When and How"
        subtitle="Indications, devices, and target ranges for processed EEG."
        variant="summary"
      >
        <ul className="space-y-2 list-disc list-inside text-sm">
          <li><strong>Strong indications</strong> (AAGBI/RCoA): TIVA + NMB, high awareness risk (cardiac, obstetric GA, trauma), elderly/frail (titrate to avoid burst suppression).</li>
          <li><strong>BIS target 40–60</strong> for surgical anaesthesia. Values &lt;40 associated with delirium (ENGAGES trial — but no mortality benefit).</li>
          <li><strong>Density spectral array (DSA)</strong>: visualises EEG power vs frequency over time — confirms anaesthetic state and detects burst suppression.</li>
          <li><strong>Limitations</strong>: 30-s delay, ketamine/N₂O paradoxically ↑BIS, NMBs reduce frontal EMG artefact.</li>
          <li><strong>Don't replace clinical assessment</strong>: end-tidal volatile concentration, MAC, autonomic signs all complement processed EEG.</li>
        </ul>
      </SynthesisBlock>
          <ExamPitfallsCallout
            accent="physics"
            pitfalls={[
              "BIS is a dimensionless 0–100 scale derived from processed EEG; 40–60 target for general anaesthesia.",
              "Suppression ratio quantifies burst suppression; SEF₉₅ is the frequency below which 95% of EEG power lies.",
              "Ketamine and N₂O can paradoxically raise BIS despite deep anaesthesia; EMG contamination can inflate values.",
              "Processed-EEG monitors reduce awareness in TIVA without NM block, but evidence is weakest with volatile + ETAG monitoring.",
              "Always interpret in clinical context — never titrate purely to a number.",
            ]}
          />
        </ExamSection>
          <TopicFaqs faqs={depthOfAnaesthesiaMonitoringFaqs} />
        </>
      }
    />
  );
};

export default DepthOfAnaesthesiaMonitoringTopic;
