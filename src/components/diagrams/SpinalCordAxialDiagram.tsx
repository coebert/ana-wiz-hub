import { useState } from "react";

type TractKey = "dorsal-col" | "lat-cst" | "ant-cst" | "stt" | "post-horn" | "ant-horn" | "lat-horn" | "central" | "asa" | "psa" | "dorsal-root" | "ventral-root" | "post-spinocerebellar" | "ant-spinocerebellar" | "rubrospinal" | "reticulospinal";
type SyndromeKey = "anterior" | "central" | "brown-sequard" | "posterior" | "complete";
type CordLevel = "cervical" | "thoracic" | "lumbar" | "sacral";

interface TractInfo {
  label: string;
  category: "white" | "grey" | "vascular" | "nerve";
  color: string;
  detail: string;
  modality: string;
}

interface SyndromeInfo {
  label: string;
  cause: string;
  deficit: string;
  color: string;
  affected: TractKey[];
}

const TRACTS: Record<TractKey, TractInfo> = {
  "dorsal-col": { label: "Dorsal Columns", category: "white", color: "hsl(210 60% 55%)",
    detail: "Fasciculus gracilis (medial — lower limbs, below T6) and fasciculus cuneatus (lateral — upper limbs, above T6). First-order neurons ascend ipsilaterally to nucleus gracilis/cuneatus in medulla. Decussate as internal arcuate fibres → medial lemniscus.",
    modality: "Fine touch, vibration, proprioception, two-point discrimination" },
  "lat-cst": { label: "Lateral Corticospinal Tract", category: "white", color: "hsl(0 55% 55%)",
    detail: "~90% of corticospinal fibres decussate at pyramids (medulla). Upper motor neurons from motor cortex → lower motor neurons in anterior horn. Somatotopic: cervical medial, sacral lateral (lamination). Most important voluntary motor tract.",
    modality: "Voluntary skilled motor function (contralateral)" },
  "ant-cst": { label: "Anterior Corticospinal Tract", category: "white", color: "hsl(0 40% 60%)",
    detail: "~10% of corticospinal fibres that do NOT decussate at pyramids. Descend ipsilaterally, decussate at segmental level via anterior white commissure. Supplies axial/proximal muscles bilaterally.",
    modality: "Axial and proximal motor (bilateral)" },
  "stt": { label: "Spinothalamic Tract", category: "white", color: "hsl(35 70% 50%)",
    detail: "Second-order neurons from contralateral dorsal horn. Decussate via anterior white commissure within 1–2 segments of entry. Lateral STT: pain and temperature. Anterior STT: crude touch and pressure. Somatotopic: sacral lateral, cervical medial.",
    modality: "Pain, temperature (lateral), crude touch (anterior)" },
  "post-horn": { label: "Posterior (Dorsal) Horn", category: "grey", color: "hsl(45 50% 55%)",
    detail: "Sensory relay station. Rexed laminae I–VI. Lamina II = substantia gelatinosa (SG) — key site for pain modulation (gate control theory). Receives Aδ and C fibres. SG contains enkephalin interneurons — target for opioids and local anaesthetics in epidural/intrathecal use.",
    modality: "Sensory processing and modulation" },
  "ant-horn": { label: "Anterior (Ventral) Horn", category: "grey", color: "hsl(150 45% 50%)",
    detail: "Contains α-motor neurons (skeletal muscle innervation) and γ-motor neurons (muscle spindle intrafusal fibres). Rexed lamina IX. Somatotopic: medial = axial muscles, lateral = distal limb muscles. Enlargements at C3–T1 (upper limb) and L1–S3 (lower limb).",
    modality: "Lower motor neuron cell bodies" },
  "lat-horn": { label: "Lateral Horn (IML)", category: "grey", color: "hsl(280 40% 55%)",
    detail: "Intermediolateral cell column (IML). Present only T1–L2. Contains preganglionic sympathetic neurons. T1–T4: cardiac accelerator fibres. Disruption → sympathectomy below lesion level (loss of SVR, hypotension — neurogenic shock in high spinal cord injury).",
    modality: "Sympathetic preganglionic outflow (T1–L2)" },
  central: { label: "Central Canal", category: "grey", color: "hsl(195 50% 55%)",
    detail: "Remnant of neural tube lumen. Lined by ependymal cells. Contains CSF. May expand in syringomyelia (syrinx) — damages crossing spinothalamic fibres in anterior white commissure → 'cape-like' dissociated sensory loss (loss of pain/temperature, preserved light touch).",
    modality: "CSF conduit (vestigial)" },
  asa: { label: "Anterior Spinal Artery", category: "vascular", color: "hsl(0 70% 50%)",
    detail: "Single midline vessel from union of vertebral arteries. Supplies anterior 2/3 of cord via sulcal (central) branches. Reinforced by radicular arteries — most important is artery of Adamkiewicz (T9–T12 left side, 75%). Vulnerable to aortic surgery, cross-clamping, hypotension.",
    modality: "Anterior 2/3 cord: motor, pain, temperature, autonomic" },
  psa: { label: "Posterior Spinal Arteries", category: "vascular", color: "hsl(210 50% 50%)",
    detail: "Paired arteries from vertebral or PICA. Supply posterior 1/3 of cord (dorsal columns, posterior horns). Better collateral supply than ASA — isolated posterior cord infarction is rare. Reinforced by posterior radicular arteries.",
    modality: "Posterior 1/3: proprioception, vibration, fine touch" },
  "dorsal-root": { label: "Dorsal Root (+ DRG)", category: "nerve", color: "hsl(45 60% 55%)",
    detail: "Sensory afferents: first-order neurons with cell bodies in dorsal root ganglion (DRG). Aβ (touch, proprioception), Aδ (sharp pain, temperature), C (dull pain, temperature). DRG is outside the blood-nerve barrier — target for pulsed radiofrequency in pain medicine.",
    modality: "All sensory modalities entering cord" },
  "ventral-root": { label: "Ventral Root", category: "nerve", color: "hsl(150 50% 50%)",
    detail: "Motor efferents from anterior horn (α, γ motor neurons) and sympathetic preganglionic fibres (T1–L2) or parasympathetic (S2–S4). Bell-Magendie law: dorsal = sensory, ventral = motor. Ventral roots join dorsal roots to form mixed spinal nerve in intervertebral foramen.",
    modality: "Motor and autonomic efferents" },
  "post-spinocerebellar": { label: "Posterior Spinocerebellar Tract", category: "white", color: "hsl(170 50% 45%)",
    detail: "Originates from Clarke's column (nucleus dorsalis, C8–L2). Carries ipsilateral proprioceptive information from lower limbs to cerebellum via inferior cerebellar peduncle. Does NOT decussate. Relays information about muscle length, tension, and joint position for unconscious coordination.",
    modality: "Unconscious proprioception (lower limbs — ipsilateral)" },
  "ant-spinocerebellar": { label: "Anterior Spinocerebellar Tract", category: "white", color: "hsl(160 45% 50%)",
    detail: "Originates from spinal border cells (L1–L5). Crosses midline in cord, ascends in anterolateral funiculus, enters cerebellum via superior cerebellar peduncle where it crosses AGAIN — net result: ipsilateral information. Carries information about whole-limb movement patterns (Golgi tendon organs).",
    modality: "Unconscious proprioception (lower limbs — double-cross)" },
  rubrospinal: { label: "Rubrospinal Tract", category: "white", color: "hsl(15 55% 50%)",
    detail: "From red nucleus (midbrain), decussates immediately (ventral tegmental decussation), descends in lateral funiculus adjacent to lateral CST. Facilitates flexor motor neurons. Relatively minor in humans compared to other mammals — largely superseded by corticospinal tract. Best developed in cervical cord.",
    modality: "Flexor motor facilitation (rudimentary in humans)" },
  reticulospinal: { label: "Reticulospinal Tracts", category: "white", color: "hsl(50 50% 48%)",
    detail: "Pontine (medial) reticulospinal: ipsilateral, in anterior funiculus — facilitates extensors (antigravity muscles), inhibits flexors. Medullary (lateral) reticulospinal: bilateral, in anterior funiculus — inhibits extensors, facilitates flexors. Important for postural control, muscle tone, and locomotion. Target of volatile anaesthetic agents affecting muscle tone.",
    modality: "Posture, muscle tone, locomotion (bilateral)" },
};

const SYNDROMES: Record<SyndromeKey, SyndromeInfo> = {
  anterior: { label: "Anterior Cord Syndrome", cause: "ASA occlusion (aortic surgery, dissection, hypotension). Flexion injury with disc/bone retropulsion.", deficit: "Loss of motor (CST), pain & temperature (STT) below lesion. PRESERVED dorsal column function (proprioception, vibration, fine touch). Worst prognosis of incomplete injuries (~10% motor recovery).", color: "hsl(0 65% 55%)", affected: ["lat-cst", "ant-cst", "stt", "ant-horn", "lat-horn", "asa"] },
  central: { label: "Central Cord Syndrome", cause: "Hyperextension injury in elderly with cervical spondylosis. Syringomyelia (non-traumatic). Intramedullary tumour.", deficit: "Upper limbs > lower limbs weakness (somatotopic lamination: cervical fibres medial in CST). 'Cape-like' dissociated sensory loss in syrinx (loss of pain/temperature at level, preserved touch). Best prognosis — lower limbs often recover well.", color: "hsl(280 50% 55%)", affected: ["central", "stt", "lat-cst"] },
  "brown-sequard": { label: "Brown-Séquard (Hemisection)", cause: "Penetrating trauma (stab wound). Lateral cord compression (tumour, abscess, disc).", deficit: "Ipsilateral: UMN weakness (CST), loss of proprioception/vibration (dorsal columns). Contralateral: loss of pain & temperature (STT — crosses 1–2 levels above). Best overall prognosis of cord syndromes (~90% ambulate independently).", color: "hsl(35 70% 50%)", affected: ["dorsal-col", "lat-cst", "stt", "ant-horn", "lat-horn"] },
  posterior: { label: "Posterior Cord Syndrome", cause: "PSA occlusion (rare), MS plaques, B12 deficiency (subacute combined degeneration), tabes dorsalis (tertiary syphilis), Friedreich's ataxia.", deficit: "Loss of proprioception, vibration, fine touch. Sensory ataxia (positive Romberg). Preserved motor, pain, and temperature. Very rare as isolated cord syndrome.", color: "hsl(210 60% 55%)", affected: ["dorsal-col", "psa"] },
  complete: { label: "Complete Transection", cause: "Severe trauma (fracture-dislocation), transverse myelitis, cord compression.", deficit: "Complete loss of all motor, sensory, and autonomic function below the level of injury. Spinal shock initially (flaccid areflexia) → UMN signs develop over weeks. Autonomic dysreflexia risk if T6 or above.", color: "hsl(0 0% 50%)", affected: ["dorsal-col", "lat-cst", "ant-cst", "stt", "ant-horn", "post-horn", "lat-horn", "asa", "psa"] },
};

const LEVEL_INFO: Record<CordLevel, { label: string; desc: string; hasLateralHorn: boolean; enlargement: boolean }> = {
  cervical: { label: "Cervical (C5–T1)", desc: "Cervical enlargement — brachial plexus origin. Large anterior horns for upper limb. Lateral CST well-developed.", hasLateralHorn: false, enlargement: true },
  thoracic: { label: "Thoracic (T1–T12)", desc: "Lateral horns present (IML — sympathetic outflow). Smaller overall diameter. Clarke's column (nucleus dorsalis) at T1–L2 for posterior spinocerebellar tract.", hasLateralHorn: true, enlargement: false },
  lumbar: { label: "Lumbar (L1–S2)", desc: "Lumbosacral enlargement — lumbosacral plexus. Large anterior horns for lower limb motor neurons. Cord tapers to conus medullaris at L1/2 in adults.", hasLateralHorn: false, enlargement: true },
  sacral: { label: "Sacral (S2–S4)", desc: "Parasympathetic outflow (S2–S4). Onuf's nucleus — pudendal nerve motor neurons. Conus medullaris and filum terminale.", hasLateralHorn: false, enlargement: false },
};

const SpinalCordAxialDiagram = () => {
  const [selectedTract, setSelectedTract] = useState<TractKey | null>(null);
  const [selectedSyndrome, setSelectedSyndrome] = useState<SyndromeKey | null>(null);
  const [cordLevel, setCordLevel] = useState<CordLevel>("thoracic");

  const activeInfo = selectedTract ? TRACTS[selectedTract] : null;
  const syndInfo = selectedSyndrome ? SYNDROMES[selectedSyndrome] : null;

  const isTractHighlighted = (key: TractKey): boolean => {
    if (selectedSyndrome) return SYNDROMES[selectedSyndrome].affected.includes(key);
    return selectedTract === key;
  };
  const isTractDimmed = (key: TractKey): boolean => {
    if (selectedSyndrome) return !SYNDROMES[selectedSyndrome].affected.includes(key);
    if (selectedTract) return selectedTract !== key;
    return false;
  };

  // SVG layout
  const cx = 200, cy = 190;
  const cordRx = 130, cordRy = 115;
  const level = LEVEL_INFO[cordLevel];

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Spinal Cord — Axial Cross-Section</h3>
      <p className="text-xs text-muted-foreground mb-3">Tap structures to explore. Select cord syndromes to see affected areas.</p>

      {/* Level selector */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {(Object.keys(LEVEL_INFO) as CordLevel[]).map(lv => (
          <button key={lv} onClick={() => setCordLevel(lv)}
            className={`px-2.5 py-1 rounded text-[10px] sm:text-xs font-medium border transition-all ${
              cordLevel === lv ? "border-primary/50 bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:bg-secondary/40"
            }`}>
            {lv.charAt(0).toUpperCase() + lv.slice(1)}
          </button>
        ))}
      </div>
      <p className="text-[10px] text-muted-foreground mb-3">{level.label}: {level.desc}</p>

      {/* Syndrome overlay selector */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <span className="text-[10px] text-muted-foreground self-center mr-1">Cord syndromes:</span>
        {(Object.keys(SYNDROMES) as SyndromeKey[]).map(sk => (
          <button key={sk} onClick={() => { setSelectedSyndrome(selectedSyndrome === sk ? null : sk); setSelectedTract(null); }}
            className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-all ${
              selectedSyndrome === sk ? "text-foreground" : "border-border text-muted-foreground hover:bg-secondary/40"
            }`}
            style={selectedSyndrome === sk ? { borderColor: SYNDROMES[sk].color, backgroundColor: SYNDROMES[sk].color + "18" } : {}}>
            {SYNDROMES[sk].label.replace(" Syndrome", "").replace(" (Hemisection)", "")}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* SVG diagram */}
        <svg viewBox="0 0 400 380" className="w-full max-w-md mx-auto flex-shrink-0">
          {/* Orientation labels */}
          <text x={cx} y={18} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontWeight="600">POSTERIOR (Dorsal)</text>
          <text x={cx} y={375} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontWeight="600">ANTERIOR (Ventral)</text>
          <text x={18} y={cy + 3} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontWeight="600" transform={`rotate(-90,18,${cy})`}>LEFT</text>
          <text x={382} y={cy + 3} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontWeight="600" transform={`rotate(90,382,${cy})`}>RIGHT</text>

          {/* Cord outline — white matter */}
          <ellipse cx={cx} cy={cy} rx={cordRx} ry={cordRy} fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.5" />

          {/* Anterior median fissure */}
          <line x1={cx} y1={cy + cordRy - 5} x2={cx} y2={cy + 20} stroke="hsl(var(--border))" strokeWidth="1.5" />

          {/* Posterior median sulcus */}
          <line x1={cx} y1={cy - cordRy + 5} x2={cx} y2={cy - 25} stroke="hsl(var(--border))" strokeWidth="1" />
          {/* Posterior intermediate sulcus (cuneatus/gracilis boundary) */}
          <line x1={cx - 18} y1={cy - cordRy + 8} x2={cx - 18} y2={cy - 40} stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.4" />
          <line x1={cx + 18} y1={cy - cordRy + 8} x2={cx + 18} y2={cy - 40} stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.4" />

          {/* ═══ WHITE MATTER TRACTS ═══ */}

          {/* Dorsal columns — posterior region */}
          <path d={`M${cx - 45},${cy - cordRy + 10} Q${cx - 45},${cy - 40} ${cx - 3},${cy - 28} L${cx - 3},${cy - cordRy + 8} Z`}
            fill={TRACTS["dorsal-col"].color} fillOpacity={isTractHighlighted("dorsal-col") ? 0.5 : isTractDimmed("dorsal-col") ? 0.04 : 0.15}
            stroke={TRACTS["dorsal-col"].color} strokeWidth={isTractHighlighted("dorsal-col") ? 1.5 : 0.5} strokeOpacity={isTractDimmed("dorsal-col") ? 0.1 : 0.6}
            className="cursor-pointer transition-all duration-200"
            onClick={() => { setSelectedTract(selectedTract === "dorsal-col" ? null : "dorsal-col"); setSelectedSyndrome(null); }} />
          <path d={`M${cx + 45},${cy - cordRy + 10} Q${cx + 45},${cy - 40} ${cx + 3},${cy - 28} L${cx + 3},${cy - cordRy + 8} Z`}
            fill={TRACTS["dorsal-col"].color} fillOpacity={isTractHighlighted("dorsal-col") ? 0.5 : isTractDimmed("dorsal-col") ? 0.04 : 0.15}
            stroke={TRACTS["dorsal-col"].color} strokeWidth={isTractHighlighted("dorsal-col") ? 1.5 : 0.5} strokeOpacity={isTractDimmed("dorsal-col") ? 0.1 : 0.6}
            className="cursor-pointer transition-all duration-200"
            onClick={() => { setSelectedTract(selectedTract === "dorsal-col" ? null : "dorsal-col"); setSelectedSyndrome(null); }} />

          {/* Gracilis / Cuneatus labels */}
          <text x={cx - 10} y={cy - cordRy + 22} textAnchor="end" fontSize="5.5" fill={TRACTS["dorsal-col"].color} opacity={isTractDimmed("dorsal-col") ? 0.1 : 0.7}>Gracilis</text>
          <text x={cx + 10} y={cy - cordRy + 22} textAnchor="start" fontSize="5.5" fill={TRACTS["dorsal-col"].color} opacity={isTractDimmed("dorsal-col") ? 0.1 : 0.7}>Cuneatus</text>

          {/* Lateral CST — posterolateral */}
          <path d={`M${cx - 50},${cy - cordRy + 15} Q${cx - cordRx + 15},${cy - 30} ${cx - cordRx + 8},${cy - 10}
                    Q${cx - cordRx + 5},${cy + 5} ${cx - 55},${cy + 20}
                    Q${cx - 48},${cy - 10} ${cx - 50},${cy - cordRy + 15} Z`}
            fill={TRACTS["lat-cst"].color} fillOpacity={isTractHighlighted("lat-cst") ? 0.45 : isTractDimmed("lat-cst") ? 0.04 : 0.12}
            stroke={TRACTS["lat-cst"].color} strokeWidth={isTractHighlighted("lat-cst") ? 1.5 : 0.5} strokeOpacity={isTractDimmed("lat-cst") ? 0.1 : 0.5}
            className="cursor-pointer transition-all duration-200"
            onClick={() => { setSelectedTract(selectedTract === "lat-cst" ? null : "lat-cst"); setSelectedSyndrome(null); }} />
          <path d={`M${cx + 50},${cy - cordRy + 15} Q${cx + cordRx - 15},${cy - 30} ${cx + cordRx - 8},${cy - 10}
                    Q${cx + cordRx - 5},${cy + 5} ${cx + 55},${cy + 20}
                    Q${cx + 48},${cy - 10} ${cx + 50},${cy - cordRy + 15} Z`}
            fill={TRACTS["lat-cst"].color} fillOpacity={isTractHighlighted("lat-cst") ? 0.45 : isTractDimmed("lat-cst") ? 0.04 : 0.12}
            stroke={TRACTS["lat-cst"].color} strokeWidth={isTractHighlighted("lat-cst") ? 1.5 : 0.5} strokeOpacity={isTractDimmed("lat-cst") ? 0.1 : 0.5}
            className="cursor-pointer transition-all duration-200"
            onClick={() => { setSelectedTract(selectedTract === "lat-cst" ? null : "lat-cst"); setSelectedSyndrome(null); }} />

          {/* Spinothalamic tract — anterolateral */}
          <path d={`M${cx - 55},${cy + 25} Q${cx - cordRx + 8},${cy + 50} ${cx - cordRx + 20},${cy + cordRy - 20}
                    Q${cx - 50},${cy + cordRy - 10} ${cx - 40},${cy + 40}
                    Q${cx - 42},${cy + 30} ${cx - 55},${cy + 25} Z`}
            fill={TRACTS.stt.color} fillOpacity={isTractHighlighted("stt") ? 0.45 : isTractDimmed("stt") ? 0.04 : 0.12}
            stroke={TRACTS.stt.color} strokeWidth={isTractHighlighted("stt") ? 1.5 : 0.5} strokeOpacity={isTractDimmed("stt") ? 0.1 : 0.5}
            className="cursor-pointer transition-all duration-200"
            onClick={() => { setSelectedTract(selectedTract === "stt" ? null : "stt"); setSelectedSyndrome(null); }} />
          <path d={`M${cx + 55},${cy + 25} Q${cx + cordRx - 8},${cy + 50} ${cx + cordRx - 20},${cy + cordRy - 20}
                    Q${cx + 50},${cy + cordRy - 10} ${cx + 40},${cy + 40}
                    Q${cx + 42},${cy + 30} ${cx + 55},${cy + 25} Z`}
            fill={TRACTS.stt.color} fillOpacity={isTractHighlighted("stt") ? 0.45 : isTractDimmed("stt") ? 0.04 : 0.12}
            stroke={TRACTS.stt.color} strokeWidth={isTractHighlighted("stt") ? 1.5 : 0.5} strokeOpacity={isTractDimmed("stt") ? 0.1 : 0.5}
            className="cursor-pointer transition-all duration-200"
            onClick={() => { setSelectedTract(selectedTract === "stt" ? null : "stt"); setSelectedSyndrome(null); }} />

          {/* Anterior CST — small, near midline anteriorly */}
          <path d={`M${cx - 3},${cy + 22} L${cx - 15},${cy + 55} Q${cx - 8},${cy + cordRy - 12} ${cx - 3},${cy + cordRy - 8} Z`}
            fill={TRACTS["ant-cst"].color} fillOpacity={isTractHighlighted("ant-cst") ? 0.45 : isTractDimmed("ant-cst") ? 0.04 : 0.1}
            stroke={TRACTS["ant-cst"].color} strokeWidth={isTractHighlighted("ant-cst") ? 1.2 : 0.3} strokeOpacity={isTractDimmed("ant-cst") ? 0.1 : 0.4}
            className="cursor-pointer transition-all duration-200"
            onClick={() => { setSelectedTract(selectedTract === "ant-cst" ? null : "ant-cst"); setSelectedSyndrome(null); }} />
          <path d={`M${cx + 3},${cy + 22} L${cx + 15},${cy + 55} Q${cx + 8},${cy + cordRy - 12} ${cx + 3},${cy + cordRy - 8} Z`}
            fill={TRACTS["ant-cst"].color} fillOpacity={isTractHighlighted("ant-cst") ? 0.45 : isTractDimmed("ant-cst") ? 0.04 : 0.1}
            stroke={TRACTS["ant-cst"].color} strokeWidth={isTractHighlighted("ant-cst") ? 1.2 : 0.3} strokeOpacity={isTractDimmed("ant-cst") ? 0.1 : 0.4}
            className="cursor-pointer transition-all duration-200"
            onClick={() => { setSelectedTract(selectedTract === "ant-cst" ? null : "ant-cst"); setSelectedSyndrome(null); }} />

          {/* Posterior Spinocerebellar Tract — posterolateral, between lat CST and cord surface */}
          <path d={`M${cx - 50},${cy - cordRy + 18} Q${cx - cordRx + 8},${cy - 15} ${cx - cordRx + 12},${cy + 5}
                    Q${cx - cordRx + 14},${cy + 15} ${cx - 52},${cy + 18}
                    Q${cx - 48},${cy} ${cx - 50},${cy - cordRy + 18} Z`}
            fill={TRACTS["post-spinocerebellar"].color} fillOpacity={isTractHighlighted("post-spinocerebellar") ? 0.45 : isTractDimmed("post-spinocerebellar") ? 0.04 : 0.08}
            stroke={TRACTS["post-spinocerebellar"].color} strokeWidth={isTractHighlighted("post-spinocerebellar") ? 1.5 : 0.3} strokeOpacity={isTractDimmed("post-spinocerebellar") ? 0.1 : 0.4}
            className="cursor-pointer transition-all duration-200"
            onClick={() => { setSelectedTract(selectedTract === "post-spinocerebellar" ? null : "post-spinocerebellar"); setSelectedSyndrome(null); }} />
          <path d={`M${cx + 50},${cy - cordRy + 18} Q${cx + cordRx - 8},${cy - 15} ${cx + cordRx - 12},${cy + 5}
                    Q${cx + cordRx - 14},${cy + 15} ${cx + 52},${cy + 18}
                    Q${cx + 48},${cy} ${cx + 50},${cy - cordRy + 18} Z`}
            fill={TRACTS["post-spinocerebellar"].color} fillOpacity={isTractHighlighted("post-spinocerebellar") ? 0.45 : isTractDimmed("post-spinocerebellar") ? 0.04 : 0.08}
            stroke={TRACTS["post-spinocerebellar"].color} strokeWidth={isTractHighlighted("post-spinocerebellar") ? 1.5 : 0.3} strokeOpacity={isTractDimmed("post-spinocerebellar") ? 0.1 : 0.4}
            className="cursor-pointer transition-all duration-200"
            onClick={() => { setSelectedTract(selectedTract === "post-spinocerebellar" ? null : "post-spinocerebellar"); setSelectedSyndrome(null); }} />

          {/* Anterior Spinocerebellar Tract — anterolateral, superficial to STT */}
          <path d={`M${cx - 58},${cy + 22} Q${cx - cordRx + 12},${cy + 40} ${cx - cordRx + 18},${cy + cordRy - 25}
                    Q${cx - 48},${cy + cordRy - 15} ${cx - 42},${cy + 38}
                    Q${cx - 48},${cy + 30} ${cx - 58},${cy + 22} Z`}
            fill={TRACTS["ant-spinocerebellar"].color} fillOpacity={isTractHighlighted("ant-spinocerebellar") ? 0.4 : isTractDimmed("ant-spinocerebellar") ? 0.04 : 0.06}
            stroke={TRACTS["ant-spinocerebellar"].color} strokeWidth={isTractHighlighted("ant-spinocerebellar") ? 1.5 : 0.3} strokeOpacity={isTractDimmed("ant-spinocerebellar") ? 0.1 : 0.3}
            className="cursor-pointer transition-all duration-200"
            onClick={() => { setSelectedTract(selectedTract === "ant-spinocerebellar" ? null : "ant-spinocerebellar"); setSelectedSyndrome(null); }} />
          <path d={`M${cx + 58},${cy + 22} Q${cx + cordRx - 12},${cy + 40} ${cx + cordRx - 18},${cy + cordRy - 25}
                    Q${cx + 48},${cy + cordRy - 15} ${cx + 42},${cy + 38}
                    Q${cx + 48},${cy + 30} ${cx + 58},${cy + 22} Z`}
            fill={TRACTS["ant-spinocerebellar"].color} fillOpacity={isTractHighlighted("ant-spinocerebellar") ? 0.4 : isTractDimmed("ant-spinocerebellar") ? 0.04 : 0.06}
            stroke={TRACTS["ant-spinocerebellar"].color} strokeWidth={isTractHighlighted("ant-spinocerebellar") ? 1.5 : 0.3} strokeOpacity={isTractDimmed("ant-spinocerebellar") ? 0.1 : 0.3}
            className="cursor-pointer transition-all duration-200"
            onClick={() => { setSelectedTract(selectedTract === "ant-spinocerebellar" ? null : "ant-spinocerebellar"); setSelectedSyndrome(null); }} />

          {/* Rubrospinal Tract — small, adjacent to lateral CST */}
          <path d={`M${cx - 48},${cy - 8} Q${cx - 55},${cy} ${cx - 50},${cy + 10}
                    Q${cx - 46},${cy + 5} ${cx - 45},${cy - 3} Z`}
            fill={TRACTS.rubrospinal.color} fillOpacity={isTractHighlighted("rubrospinal") ? 0.45 : isTractDimmed("rubrospinal") ? 0.04 : 0.06}
            stroke={TRACTS.rubrospinal.color} strokeWidth={isTractHighlighted("rubrospinal") ? 1.5 : 0.3} strokeOpacity={isTractDimmed("rubrospinal") ? 0.1 : 0.3}
            className="cursor-pointer transition-all duration-200"
            onClick={() => { setSelectedTract(selectedTract === "rubrospinal" ? null : "rubrospinal"); setSelectedSyndrome(null); }} />
          <path d={`M${cx + 48},${cy - 8} Q${cx + 55},${cy} ${cx + 50},${cy + 10}
                    Q${cx + 46},${cy + 5} ${cx + 45},${cy - 3} Z`}
            fill={TRACTS.rubrospinal.color} fillOpacity={isTractHighlighted("rubrospinal") ? 0.45 : isTractDimmed("rubrospinal") ? 0.04 : 0.06}
            stroke={TRACTS.rubrospinal.color} strokeWidth={isTractHighlighted("rubrospinal") ? 1.5 : 0.3} strokeOpacity={isTractDimmed("rubrospinal") ? 0.1 : 0.3}
            className="cursor-pointer transition-all duration-200"
            onClick={() => { setSelectedTract(selectedTract === "rubrospinal" ? null : "rubrospinal"); setSelectedSyndrome(null); }} />

          {/* Reticulospinal Tracts — anterior funiculus, near midline */}
          <path d={`M${cx - 18},${cy + 25} Q${cx - 28},${cy + 45} ${cx - 22},${cy + cordRy - 15}
                    Q${cx - 16},${cy + cordRy - 8} ${cx - 16},${cy + 55}
                    Q${cx - 14},${cy + 35} ${cx - 18},${cy + 25} Z`}
            fill={TRACTS.reticulospinal.color} fillOpacity={isTractHighlighted("reticulospinal") ? 0.4 : isTractDimmed("reticulospinal") ? 0.04 : 0.06}
            stroke={TRACTS.reticulospinal.color} strokeWidth={isTractHighlighted("reticulospinal") ? 1.2 : 0.3} strokeOpacity={isTractDimmed("reticulospinal") ? 0.1 : 0.3}
            className="cursor-pointer transition-all duration-200"
            onClick={() => { setSelectedTract(selectedTract === "reticulospinal" ? null : "reticulospinal"); setSelectedSyndrome(null); }} />
          <path d={`M${cx + 18},${cy + 25} Q${cx + 28},${cy + 45} ${cx + 22},${cy + cordRy - 15}
                    Q${cx + 16},${cy + cordRy - 8} ${cx + 16},${cy + 55}
                    Q${cx + 14},${cy + 35} ${cx + 18},${cy + 25} Z`}
            fill={TRACTS.reticulospinal.color} fillOpacity={isTractHighlighted("reticulospinal") ? 0.4 : isTractDimmed("reticulospinal") ? 0.04 : 0.06}
            stroke={TRACTS.reticulospinal.color} strokeWidth={isTractHighlighted("reticulospinal") ? 1.2 : 0.3} strokeOpacity={isTractDimmed("reticulospinal") ? 0.1 : 0.3}
            className="cursor-pointer transition-all duration-200"
            onClick={() => { setSelectedTract(selectedTract === "reticulospinal" ? null : "reticulospinal"); setSelectedSyndrome(null); }} />
          {/* Grey commissure (connecting bar) */}
          <rect x={cx - 10} y={cy - 4} width={20} height={8} rx="2"
            fill={TRACTS["post-horn"].color} fillOpacity={0.3}
            stroke={TRACTS["post-horn"].color} strokeWidth="0.5" strokeOpacity="0.3" />

          {/* Central canal */}
          <circle cx={cx} cy={cy} r={4}
            fill={TRACTS.central.color} fillOpacity={isTractHighlighted("central") ? 0.7 : isTractDimmed("central") ? 0.05 : 0.3}
            stroke={TRACTS.central.color} strokeWidth={isTractHighlighted("central") ? 1.5 : 0.8}
            className="cursor-pointer transition-all duration-200"
            onClick={() => { setSelectedTract(selectedTract === "central" ? null : "central"); setSelectedSyndrome(null); }} />

          {/* Posterior horns (dorsal — thinner, sensory) */}
          <path d={`M${cx - 8},${cy - 6} Q${cx - 18},${cy - 18} ${cx - 30},${cy - 55}
                    Q${cx - 34},${cy - 65} ${cx - 28},${cy - 68}
                    Q${cx - 22},${cy - 65} ${cx - 22},${cy - 55}
                    Q${cx - 14},${cy - 20} ${cx - 6},${cy - 6} Z`}
            fill={TRACTS["post-horn"].color} fillOpacity={isTractHighlighted("post-horn") ? 0.55 : isTractDimmed("post-horn") ? 0.05 : 0.2}
            stroke={TRACTS["post-horn"].color} strokeWidth={isTractHighlighted("post-horn") ? 1.5 : 0.7}
            className="cursor-pointer transition-all duration-200"
            onClick={() => { setSelectedTract(selectedTract === "post-horn" ? null : "post-horn"); setSelectedSyndrome(null); }} />
          <path d={`M${cx + 8},${cy - 6} Q${cx + 18},${cy - 18} ${cx + 30},${cy - 55}
                    Q${cx + 34},${cy - 65} ${cx + 28},${cy - 68}
                    Q${cx + 22},${cy - 65} ${cx + 22},${cy - 55}
                    Q${cx + 14},${cy - 20} ${cx + 6},${cy - 6} Z`}
            fill={TRACTS["post-horn"].color} fillOpacity={isTractHighlighted("post-horn") ? 0.55 : isTractDimmed("post-horn") ? 0.05 : 0.2}
            stroke={TRACTS["post-horn"].color} strokeWidth={isTractHighlighted("post-horn") ? 1.5 : 0.7}
            className="cursor-pointer transition-all duration-200"
            onClick={() => { setSelectedTract(selectedTract === "post-horn" ? null : "post-horn"); setSelectedSyndrome(null); }} />

          {/* Substantia gelatinosa cap */}
          <path d={`M${cx - 32},${cy - 62} Q${cx - 30},${cy - 70} ${cx - 24},${cy - 62}`}
            fill="none" stroke={TRACTS["post-horn"].color} strokeWidth="2" opacity={isTractDimmed("post-horn") ? 0.05 : 0.4}
            strokeLinecap="round" />
          <path d={`M${cx + 32},${cy - 62} Q${cx + 30},${cy - 70} ${cx + 24},${cy - 62}`}
            fill="none" stroke={TRACTS["post-horn"].color} strokeWidth="2" opacity={isTractDimmed("post-horn") ? 0.05 : 0.4}
            strokeLinecap="round" />
          <text x={cx - 29} y={cy - 73} fontSize="5" fill={TRACTS["post-horn"].color} textAnchor="middle" opacity={isTractDimmed("post-horn") ? 0.05 : 0.5}>SG</text>
          <text x={cx + 29} y={cy - 73} fontSize="5" fill={TRACTS["post-horn"].color} textAnchor="middle" opacity={isTractDimmed("post-horn") ? 0.05 : 0.5}>SG</text>

          {/* Anterior horns (ventral — wider, motor) */}
          <path d={`M${cx - 8},${cy + 6} Q${cx - 20},${cy + 18} ${cx - 45},${cy + 48}
                    Q${cx - 52},${cy + 55} ${cx - 48},${cy + 60}
                    Q${cx - 40},${cy + 58} ${cx - 35},${cy + 48}
                    Q${cx - 15},${cy + 22} ${cx - 6},${cy + 6} Z`}
            fill={TRACTS["ant-horn"].color} fillOpacity={isTractHighlighted("ant-horn") ? 0.55 : isTractDimmed("ant-horn") ? 0.05 : 0.2}
            stroke={TRACTS["ant-horn"].color} strokeWidth={isTractHighlighted("ant-horn") ? 1.5 : 0.7}
            className="cursor-pointer transition-all duration-200"
            onClick={() => { setSelectedTract(selectedTract === "ant-horn" ? null : "ant-horn"); setSelectedSyndrome(null); }} />
          <path d={`M${cx + 8},${cy + 6} Q${cx + 20},${cy + 18} ${cx + 45},${cy + 48}
                    Q${cx + 52},${cy + 55} ${cx + 48},${cy + 60}
                    Q${cx + 40},${cy + 58} ${cx + 35},${cy + 48}
                    Q${cx + 15},${cy + 22} ${cx + 6},${cy + 6} Z`}
            fill={TRACTS["ant-horn"].color} fillOpacity={isTractHighlighted("ant-horn") ? 0.55 : isTractDimmed("ant-horn") ? 0.05 : 0.2}
            stroke={TRACTS["ant-horn"].color} strokeWidth={isTractHighlighted("ant-horn") ? 1.5 : 0.7}
            className="cursor-pointer transition-all duration-200"
            onClick={() => { setSelectedTract(selectedTract === "ant-horn" ? null : "ant-horn"); setSelectedSyndrome(null); }} />

          {/* Lateral horns — only at thoracic level */}
          {level.hasLateralHorn && (
            <>
              <path d={`M${cx - 12},${cy - 2} Q${cx - 25},${cy - 8} ${cx - 38},${cy - 12}
                        Q${cx - 42},${cy - 10} ${cx - 38},${cy - 4}
                        Q${cx - 25},${cy} ${cx - 12},${cy + 2} Z`}
                fill={TRACTS["lat-horn"].color} fillOpacity={isTractHighlighted("lat-horn") ? 0.55 : isTractDimmed("lat-horn") ? 0.05 : 0.2}
                stroke={TRACTS["lat-horn"].color} strokeWidth={isTractHighlighted("lat-horn") ? 1.5 : 0.7}
                className="cursor-pointer transition-all duration-200"
                onClick={() => { setSelectedTract(selectedTract === "lat-horn" ? null : "lat-horn"); setSelectedSyndrome(null); }} />
              <path d={`M${cx + 12},${cy - 2} Q${cx + 25},${cy - 8} ${cx + 38},${cy - 12}
                        Q${cx + 42},${cy - 10} ${cx + 38},${cy - 4}
                        Q${cx + 25},${cy} ${cx + 12},${cy + 2} Z`}
                fill={TRACTS["lat-horn"].color} fillOpacity={isTractHighlighted("lat-horn") ? 0.55 : isTractDimmed("lat-horn") ? 0.05 : 0.2}
                stroke={TRACTS["lat-horn"].color} strokeWidth={isTractHighlighted("lat-horn") ? 1.5 : 0.7}
                className="cursor-pointer transition-all duration-200"
                onClick={() => { setSelectedTract(selectedTract === "lat-horn" ? null : "lat-horn"); setSelectedSyndrome(null); }} />
              <text x={cx - 44} y={cy - 15} fontSize="5" fill={TRACTS["lat-horn"].color} textAnchor="middle" opacity={isTractDimmed("lat-horn") ? 0.05 : 0.5}>IML</text>
              <text x={cx + 44} y={cy - 15} fontSize="5" fill={TRACTS["lat-horn"].color} textAnchor="middle" opacity={isTractDimmed("lat-horn") ? 0.05 : 0.5}>IML</text>
            </>
          )}

          {/* Clarke's column (nucleus dorsalis) — at base of posterior horn, thoracic only */}
          {level.hasLateralHorn && (
            <>
              <ellipse cx={cx - 16} cy={cy - 18} rx={5} ry={4}
                fill="hsl(170 50% 45%)" fillOpacity={isTractHighlighted("post-spinocerebellar") ? 0.5 : 0.08}
                stroke="hsl(170 50% 45%)" strokeWidth={isTractHighlighted("post-spinocerebellar") ? 1.2 : 0.4}
                opacity={isTractDimmed("post-spinocerebellar") ? 0.05 : 0.6} />
              <ellipse cx={cx + 16} cy={cy - 18} rx={5} ry={4}
                fill="hsl(170 50% 45%)" fillOpacity={isTractHighlighted("post-spinocerebellar") ? 0.5 : 0.08}
                stroke="hsl(170 50% 45%)" strokeWidth={isTractHighlighted("post-spinocerebellar") ? 1.2 : 0.4}
                opacity={isTractDimmed("post-spinocerebellar") ? 0.05 : 0.6} />
              <text x={cx} y={cy - 25} fontSize="4.5" fill="hsl(170 50% 45%)" textAnchor="middle" opacity={isTractDimmed("post-spinocerebellar") ? 0.05 : 0.4}>Clarke's column</text>
            </>
          )}

          {/* Rexed laminae labels (when posterior horn selected) */}
          {isTractHighlighted("post-horn") && (
            <g fontSize="4" fill={TRACTS["post-horn"].color} opacity="0.5">
              <text x={cx - 30} y={cy - 68} textAnchor="middle">I</text>
              <text x={cx - 29} y={cy - 62} textAnchor="middle" fontWeight="600">II (SG)</text>
              <text x={cx - 28} y={cy - 55} textAnchor="middle">III-IV</text>
              <text x={cx - 25} y={cy - 45} textAnchor="middle">V</text>
              <text x={cx - 18} y={cy - 30} textAnchor="middle">VI</text>
            </g>
          )}

          {/* Rexed laminae labels (when anterior horn selected) */}
          {isTractHighlighted("ant-horn") && (
            <g fontSize="4" fill={TRACTS["ant-horn"].color} opacity="0.5">
              <text x={cx - 12} y={cy + 15} textAnchor="middle">VII</text>
              <text x={cx} y={cy + 6} textAnchor="middle">VIII</text>
              <text x={cx - 42} y={cy + 55} textAnchor="middle" fontWeight="600">IX (α-MN)</text>
              <text x={cx} y={cy + 12} textAnchor="middle">X</text>
            </g>
          )}

          {/* Anterior white commissure — crossing fibres (STT decussation) */}
          <g opacity={isTractHighlighted("stt") ? 0.5 : 0.08}>
            <path d={`M${cx - 8},${cy + 5} Q${cx},${cy + 10} ${cx + 8},${cy + 5}`}
              stroke={TRACTS.stt.color} strokeWidth="0.8" fill="none" strokeDasharray="2 1.5" />
            <path d={`M${cx + 8},${cy + 5} Q${cx},${cy + 12} ${cx - 8},${cy + 5}`}
              stroke={TRACTS.stt.color} strokeWidth="0.6" fill="none" strokeDasharray="1.5 1.5" />
          </g>

          {/* Vasocorona (pial arterial plexus around cord surface) */}
          <g opacity={isTractHighlighted("asa") || isTractHighlighted("psa") ? 0.35 : 0.06}>
            <ellipse cx={cx} cy={cy} rx={cordRx + 5} ry={cordRy + 5}
              fill="none" stroke="hsl(0 50% 50%)" strokeWidth="0.6" strokeDasharray="3 4" />
            {isTractHighlighted("asa") && (
              <text x={cx + cordRx + 12} y={cy} fontSize="5" fill="hsl(0 50% 50%)" opacity="0.5">Vasocorona</text>
            )}
          </g>

          {/* ═══ BLOOD SUPPLY ═══ */}
          {/* ASA — anterior midline */}
          <circle cx={cx} cy={cy + cordRy + 10} r={5}
            fill={TRACTS.asa.color} fillOpacity={isTractHighlighted("asa") ? 0.6 : isTractDimmed("asa") ? 0.05 : 0.25}
            stroke={TRACTS.asa.color} strokeWidth={isTractHighlighted("asa") ? 1.5 : 0.8}
            className="cursor-pointer transition-all duration-200"
            onClick={() => { setSelectedTract(selectedTract === "asa" ? null : "asa"); setSelectedSyndrome(null); }} />
          <text x={cx + 10} y={cy + cordRy + 13} fontSize="7" fill={TRACTS.asa.color} fontWeight="600" opacity={isTractDimmed("asa") ? 0.1 : 0.8}>ASA</text>
          {/* Sulcal branches into anterior fissure */}
          <line x1={cx} y1={cy + cordRy + 5} x2={cx} y2={cy + cordRy - 3} stroke={TRACTS.asa.color} strokeWidth="0.8" opacity={isTractDimmed("asa") ? 0.05 : 0.3} />
          {/* ASA territory shading */}
          {isTractHighlighted("asa") && (
            <path d={`M${cx - cordRx + 10},${cy} Q${cx - cordRx + 5},${cy + cordRy - 10} ${cx},${cy + cordRy}
                      Q${cx + cordRx - 5},${cy + cordRy - 10} ${cx + cordRx - 10},${cy}
                      L${cx + 45},${cy} L${cx + 3},${cy - 25} L${cx - 3},${cy - 25} L${cx - 45},${cy} Z`}
              fill={TRACTS.asa.color} fillOpacity="0.08" stroke="none" />
          )}

          {/* PSA — posterior, paired */}
          <circle cx={cx - 42} cy={cy - cordRy - 8} r={3.5}
            fill={TRACTS.psa.color} fillOpacity={isTractHighlighted("psa") ? 0.6 : isTractDimmed("psa") ? 0.05 : 0.25}
            stroke={TRACTS.psa.color} strokeWidth={isTractHighlighted("psa") ? 1.5 : 0.8}
            className="cursor-pointer transition-all duration-200"
            onClick={() => { setSelectedTract(selectedTract === "psa" ? null : "psa"); setSelectedSyndrome(null); }} />
          <circle cx={cx + 42} cy={cy - cordRy - 8} r={3.5}
            fill={TRACTS.psa.color} fillOpacity={isTractHighlighted("psa") ? 0.6 : isTractDimmed("psa") ? 0.05 : 0.25}
            stroke={TRACTS.psa.color} strokeWidth={isTractHighlighted("psa") ? 1.5 : 0.8}
            className="cursor-pointer transition-all duration-200"
            onClick={() => { setSelectedTract(selectedTract === "psa" ? null : "psa"); setSelectedSyndrome(null); }} />
          <text x={cx} y={cy - cordRy - 14} fontSize="7" fill={TRACTS.psa.color} fontWeight="600" textAnchor="middle" opacity={isTractDimmed("psa") ? 0.1 : 0.8}>PSA (paired)</text>
          {/* PSA territory shading */}
          {isTractHighlighted("psa") && (
            <path d={`M${cx - 45},${cy} Q${cx - cordRx + 5},${cy - cordRy + 20} ${cx},${cy - cordRy}
                      Q${cx + cordRx - 5},${cy - cordRy + 20} ${cx + 45},${cy}
                      L${cx + 3},${cy - 25} L${cx - 3},${cy - 25} Z`}
              fill={TRACTS.psa.color} fillOpacity="0.08" stroke="none" />
          )}

          {/* Dorsal root entry & DRG */}
          <path d={`M${cx - 35},${cy - cordRy + 5} Q${cx - 60},${cy - cordRy - 10} ${cx - 80},${cy - cordRy - 15}`}
            fill="none" stroke={TRACTS["dorsal-root"].color} strokeWidth={isTractHighlighted("dorsal-root") ? 2 : 1}
            opacity={isTractDimmed("dorsal-root") ? 0.08 : 0.5}
            className="cursor-pointer" onClick={() => { setSelectedTract(selectedTract === "dorsal-root" ? null : "dorsal-root"); setSelectedSyndrome(null); }} />
          <ellipse cx={cx - 85} cy={cy - cordRy - 18} rx={8} ry={5}
            fill={TRACTS["dorsal-root"].color} fillOpacity={isTractHighlighted("dorsal-root") ? 0.5 : isTractDimmed("dorsal-root") ? 0.04 : 0.15}
            stroke={TRACTS["dorsal-root"].color} strokeWidth={isTractHighlighted("dorsal-root") ? 1.5 : 0.7}
            className="cursor-pointer" onClick={() => { setSelectedTract(selectedTract === "dorsal-root" ? null : "dorsal-root"); setSelectedSyndrome(null); }} />
          <text x={cx - 85} y={cy - cordRy - 28} fontSize="6" fill={TRACTS["dorsal-root"].color} textAnchor="middle" opacity={isTractDimmed("dorsal-root") ? 0.1 : 0.6}>DRG</text>

          {/* Ventral root */}
          <path d={`M${cx - 48},${cy + cordRy - 15} Q${cx - 70},${cy + cordRy} ${cx - 85},${cy + cordRy + 5}`}
            fill="none" stroke={TRACTS["ventral-root"].color} strokeWidth={isTractHighlighted("ventral-root") ? 2 : 1}
            opacity={isTractDimmed("ventral-root") ? 0.08 : 0.5}
            className="cursor-pointer" onClick={() => { setSelectedTract(selectedTract === "ventral-root" ? null : "ventral-root"); setSelectedSyndrome(null); }} />
          <text x={cx - 90} y={cy + cordRy + 12} fontSize="6" fill={TRACTS["ventral-root"].color} opacity={isTractDimmed("ventral-root") ? 0.1 : 0.6}>Ventral root</text>

          {/* Right side roots (mirror) */}
          <path d={`M${cx + 35},${cy - cordRy + 5} Q${cx + 60},${cy - cordRy - 10} ${cx + 80},${cy - cordRy - 15}`}
            fill="none" stroke={TRACTS["dorsal-root"].color} strokeWidth={isTractHighlighted("dorsal-root") ? 2 : 1}
            opacity={isTractDimmed("dorsal-root") ? 0.08 : 0.5} />
          <ellipse cx={cx + 85} cy={cy - cordRy - 18} rx={8} ry={5}
            fill={TRACTS["dorsal-root"].color} fillOpacity={isTractHighlighted("dorsal-root") ? 0.5 : isTractDimmed("dorsal-root") ? 0.04 : 0.15}
            stroke={TRACTS["dorsal-root"].color} strokeWidth={isTractHighlighted("dorsal-root") ? 1.5 : 0.7} />
          <text x={cx + 85} y={cy - cordRy - 28} fontSize="6" fill={TRACTS["dorsal-root"].color} textAnchor="middle" opacity={isTractDimmed("dorsal-root") ? 0.1 : 0.6}>DRG</text>
          <path d={`M${cx + 48},${cy + cordRy - 15} Q${cx + 70},${cy + cordRy} ${cx + 85},${cy + cordRy + 5}`}
            fill="none" stroke={TRACTS["ventral-root"].color} strokeWidth={isTractHighlighted("ventral-root") ? 2 : 1}
            opacity={isTractDimmed("ventral-root") ? 0.08 : 0.5} />
          <text x={cx + 90} y={cy + cordRy + 12} fontSize="6" fill={TRACTS["ventral-root"].color} opacity={isTractDimmed("ventral-root") ? 0.1 : 0.6} textAnchor="end">Ventral root</text>

          {/* Anterior white commissure label */}
          <text x={cx} y={cy + 14} fontSize="4.5" fill="hsl(var(--muted-foreground))" textAnchor="middle" opacity="0.4">Ant white commissure</text>

          {/* Syndrome overlay — Brown-Séquard hemicord shading */}
          {selectedSyndrome === "brown-sequard" && (
            <path d={`M${cx},${cy - cordRy} Q${cx - cordRx},${cy - cordRy + 30} ${cx - cordRx},${cy}
                      Q${cx - cordRx},${cy + cordRy - 30} ${cx},${cy + cordRy} Z`}
              fill={SYNDROMES["brown-sequard"].color} fillOpacity="0.08" stroke={SYNDROMES["brown-sequard"].color} strokeWidth="1.5" strokeDasharray="4 3" />
          )}

          {/* Syndrome overlay — Anterior cord */}
          {selectedSyndrome === "anterior" && (
            <path d={`M${cx - cordRx + 5},${cy} Q${cx - cordRx + 5},${cy + cordRy - 10} ${cx},${cy + cordRy}
                      Q${cx + cordRx - 5},${cy + cordRy - 10} ${cx + cordRx - 5},${cy} Z`}
              fill={SYNDROMES.anterior.color} fillOpacity="0.08" stroke={SYNDROMES.anterior.color} strokeWidth="1.5" strokeDasharray="4 3" />
          )}

          {/* Syndrome overlay — Central */}
          {selectedSyndrome === "central" && (
            <circle cx={cx} cy={cy} r={35} fill={SYNDROMES.central.color} fillOpacity="0.08" stroke={SYNDROMES.central.color} strokeWidth="1.5" strokeDasharray="4 3" />
          )}

          {/* Syndrome overlay — Posterior */}
          {selectedSyndrome === "posterior" && (
            <path d={`M${cx - 50},${cy} Q${cx - cordRx + 15},${cy - cordRy + 20} ${cx},${cy - cordRy}
                      Q${cx + cordRx - 15},${cy - cordRy + 20} ${cx + 50},${cy} Z`}
              fill={SYNDROMES.posterior.color} fillOpacity="0.08" stroke={SYNDROMES.posterior.color} strokeWidth="1.5" strokeDasharray="4 3" />
          )}

          {/* Syndrome overlay — Complete */}
          {selectedSyndrome === "complete" && (
            <ellipse cx={cx} cy={cy} rx={cordRx + 3} ry={cordRy + 3}
              fill="none" stroke={SYNDROMES.complete.color} strokeWidth="2" strokeDasharray="6 3" opacity="0.5" />
          )}

          {/* Tract labels outside cord */}
          <g fontSize="6" fontWeight="600" opacity="0.6">
            <text x={cx} y={cy - cordRy - 2} textAnchor="middle" fill={TRACTS["dorsal-col"].color} opacity={isTractDimmed("dorsal-col") ? 0.1 : 0.6}>Dorsal Columns</text>
            <text x={cx - cordRx - 5} y={cy - 5} textAnchor="end" fill={TRACTS["lat-cst"].color} opacity={isTractDimmed("lat-cst") ? 0.1 : 0.6}>Lat CST</text>
            <text x={cx + cordRx + 5} y={cy - 5} textAnchor="start" fill={TRACTS["lat-cst"].color} opacity={isTractDimmed("lat-cst") ? 0.1 : 0.6}>Lat CST</text>
            <text x={cx - cordRx - 5} y={cy + 45} textAnchor="end" fill={TRACTS.stt.color} opacity={isTractDimmed("stt") ? 0.1 : 0.6}>STT</text>
            <text x={cx + cordRx + 5} y={cy + 45} textAnchor="start" fill={TRACTS.stt.color} opacity={isTractDimmed("stt") ? 0.1 : 0.6}>STT</text>
            {/* New tract labels */}
            <text x={cx - cordRx - 5} y={cy + 10} textAnchor="end" fontSize="5" fill={TRACTS["post-spinocerebellar"].color} opacity={isTractDimmed("post-spinocerebellar") ? 0.1 : 0.4}>PSCT</text>
            <text x={cx + cordRx + 5} y={cy + 10} textAnchor="start" fontSize="5" fill={TRACTS["post-spinocerebellar"].color} opacity={isTractDimmed("post-spinocerebellar") ? 0.1 : 0.4}>PSCT</text>
            <text x={cx - cordRx - 5} y={cy + 58} textAnchor="end" fontSize="5" fill={TRACTS["ant-spinocerebellar"].color} opacity={isTractDimmed("ant-spinocerebellar") ? 0.1 : 0.35}>ASCT</text>
            <text x={cx + cordRx + 5} y={cy + 58} textAnchor="start" fontSize="5" fill={TRACTS["ant-spinocerebellar"].color} opacity={isTractDimmed("ant-spinocerebellar") ? 0.1 : 0.35}>ASCT</text>
            <text x={cx - cordRx - 5} y={cy + 20} textAnchor="end" fontSize="4.5" fill={TRACTS.rubrospinal.color} opacity={isTractDimmed("rubrospinal") ? 0.1 : 0.3}>RubST</text>
            <text x={cx - 20} y={cy + cordRy + 15} textAnchor="end" fontSize="4.5" fill={TRACTS.reticulospinal.color} opacity={isTractDimmed("reticulospinal") ? 0.1 : 0.3}>RetST</text>
          </g>
        </svg>

        {/* Info panel */}
        <div className="flex-1 min-w-0">
          {syndInfo ? (
            <div className="p-4 rounded-lg border animate-fade-in" style={{ borderColor: syndInfo.color + "40" }}>
              <p className="font-bold text-sm" style={{ color: syndInfo.color }}>{syndInfo.label}</p>
              <p className="text-xs text-muted-foreground mt-1"><span className="font-semibold text-foreground">Cause:</span> {syndInfo.cause}</p>
              <p className="text-xs text-muted-foreground mt-1"><span className="font-semibold text-foreground">Deficit:</span> {syndInfo.deficit}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {syndInfo.affected.map(tk => (
                  <span key={tk} className="px-1.5 py-0.5 rounded text-[9px] border" style={{ borderColor: TRACTS[tk].color + "50", color: TRACTS[tk].color }}>
                    {TRACTS[tk].label}
                  </span>
                ))}
              </div>
            </div>
          ) : activeInfo ? (
            <div className="p-4 rounded-lg border border-border animate-fade-in">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: activeInfo.color }} />
                <p className="font-bold text-sm" style={{ color: activeInfo.color }}>{activeInfo.label}</p>
                <span className="text-[10px] px-1.5 py-0.5 rounded border border-border text-muted-foreground">{activeInfo.category}</span>
              </div>
              <p className="text-xs text-primary/80 font-medium mt-1 mb-1">Modality: {activeInfo.modality}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{activeInfo.detail}</p>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center italic">Tap a structure to view details, or select a cord syndrome above</p>
          )}

          {/* Quick legend */}
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            {(["white", "grey", "vascular", "nerve"] as const).map(cat => (
              <div key={cat} className="text-[10px] text-muted-foreground">
                <span className="font-semibold capitalize">{cat}:</span>{" "}
                {Object.entries(TRACTS).filter(([, t]) => t.category === cat).map(([k, t]) => (
                  <button key={k} onClick={() => { setSelectedTract(selectedTract === k as TractKey ? null : k as TractKey); setSelectedSyndrome(null); }}
                    className="inline-block mr-1 hover:underline" style={{ color: t.color }}>
                    {t.label.replace(" Tract", "").replace(" (IML)", "")}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinalCordAxialDiagram;
