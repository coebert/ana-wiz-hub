import { useState } from "react";
import { withAlpha } from "@/lib/color-utils";

// =================================================================
// Types & data
// =================================================================
type TractKey =
  | "dorsal-col"
  | "lat-cst"
  | "ant-cst"
  | "stt"
  | "post-spinocerebellar"
  | "ant-spinocerebellar"
  | "rubrospinal"
  | "reticulospinal"
  | "post-horn"
  | "ant-horn"
  | "lat-horn"
  | "central"
  | "asa"
  | "psa"
  | "dorsal-root"
  | "ventral-root";
type Direction = "ascending" | "descending" | "none";
type SyndromeKey = "anterior" | "central" | "brown-sequard" | "posterior" | "complete";
type CordLevel = "cervical" | "thoracic" | "lumbar" | "sacral";

interface TractInfo {
  label: string;
  category: "white" | "grey" | "vascular" | "nerve";
  direction: Direction;
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

const ASC = "hsl(210 70% 50%)"; // blue family — ascending
const DESC = "hsl(0 65% 50%)"; // red family — descending
const GREY = "hsl(45 35% 50%)";

const TRACTS: Record<TractKey, TractInfo> = {
  // ───── ASCENDING (blue tones) ─────
  "dorsal-col": {
    label: "Dorsal Columns", category: "white", direction: "ascending",
    color: "hsl(210 70% 50%)",
    detail: "Fasciculus gracilis (medial, lower limbs below T6) and cuneatus (lateral, upper limbs above T6). First-order neurons ascend ipsilaterally to nucleus gracilis/cuneatus in medulla, decussate as internal arcuate fibres → medial lemniscus → VPL → cortex.",
    modality: "Fine touch, vibration, proprioception, two-point discrimination",
  },
  stt: {
    label: "Spinothalamic", category: "white", direction: "ascending",
    color: "hsl(195 65% 45%)",
    detail: "Second-order neurons from the contralateral dorsal horn — decussate via the anterior white commissure within 1–2 segments of entry. Lateral STT: pain & temperature. Anterior STT: crude touch. Somatotopic: sacral lateral, cervical medial.",
    modality: "Pain, temperature (lateral); crude touch (anterior)",
  },
  "post-spinocerebellar": {
    label: "Posterior Spinocerebellar", category: "white", direction: "ascending",
    color: "hsl(225 55% 50%)",
    detail: "Originates from Clarke's column (T1–L2). Carries ipsilateral lower-limb proprioception to the cerebellum via the inferior cerebellar peduncle. Does NOT decussate.",
    modality: "Unconscious proprioception (lower limbs, ipsilateral)",
  },
  "ant-spinocerebellar": {
    label: "Anterior Spinocerebellar", category: "white", direction: "ascending",
    color: "hsl(180 50% 40%)",
    detail: "Origin: spinal border cells (L1–L5). Crosses in the cord, ascends in the anterolateral funiculus, then crosses again in the superior cerebellar peduncle — net ipsilateral. Whole-limb movement information.",
    modality: "Unconscious proprioception (lower limbs, double-cross)",
  },

  // ───── DESCENDING (red tones) ─────
  "lat-cst": {
    label: "Lateral Corticospinal", category: "white", direction: "descending",
    color: "hsl(0 65% 50%)",
    detail: "≈90% of corticospinal fibres decussate at the medullary pyramids. UMNs from motor cortex synapse onto LMNs in the anterior horn. Somatotopic lamination: cervical fibres medial, sacral lateral. The principal voluntary motor pathway.",
    modality: "Voluntary skilled motor (contralateral)",
  },
  "ant-cst": {
    label: "Anterior Corticospinal", category: "white", direction: "descending",
    color: "hsl(15 60% 50%)",
    detail: "≈10% of corticospinal fibres that do NOT decussate at the pyramids. Descend ipsilaterally and decussate at the segmental level via the anterior white commissure. Supplies axial/proximal muscles bilaterally.",
    modality: "Axial and proximal motor (bilateral)",
  },
  rubrospinal: {
    label: "Rubrospinal", category: "white", direction: "descending",
    color: "hsl(345 55% 50%)",
    detail: "From the red nucleus (midbrain), decussates immediately (ventral tegmental decussation), descends in the lateral funiculus adjacent to the lateral CST. Facilitates flexor MNs. Vestigial in humans, best developed in the cervical cord.",
    modality: "Flexor motor facilitation (rudimentary in humans)",
  },
  reticulospinal: {
    label: "Reticulospinal", category: "white", direction: "descending",
    color: "hsl(25 55% 45%)",
    detail: "Pontine (medial): ipsilateral, anterior funiculus — facilitates extensors / antigravity, inhibits flexors. Medullary (lateral): bilateral, anterior funiculus — inhibits extensors, facilitates flexors. Important for posture, tone and locomotion. Volatile-anaesthetic target for muscle tone.",
    modality: "Posture, muscle tone, locomotion (bilateral)",
  },

  // ───── GREY MATTER ─────
  "post-horn": {
    label: "Posterior (Dorsal) Horn", category: "grey", direction: "none",
    color: "hsl(45 50% 45%)",
    detail: "Sensory relay — Rexed laminae I–VI. Lamina II = substantia gelatinosa, the gate-control zone targeted by intrathecal/epidural opioids and local anaesthetics.",
    modality: "Sensory processing & modulation",
  },
  "ant-horn": {
    label: "Anterior (Ventral) Horn", category: "grey", direction: "none",
    color: "hsl(45 50% 35%)",
    detail: "Contains α and γ motor neurons. Rexed lamina IX. Somatotopic: medial = axial muscles, lateral = distal limb muscles. Massive at the cervical (C3–T1) and lumbosacral (L1–S3) enlargements.",
    modality: "Lower motor neuron cell bodies",
  },
  "lat-horn": {
    label: "Lateral Horn (IML)", category: "grey", direction: "none",
    color: "hsl(280 40% 50%)",
    detail: "Intermediolateral cell column — preganglionic sympathetic neurons. PRESENT ONLY T1–L2. T1–T4 are the cardiac accelerator fibres. High cord injury → loss of sympathetic outflow → neurogenic shock.",
    modality: "Sympathetic preganglionic outflow",
  },
  central: {
    label: "Central Canal", category: "grey", direction: "none",
    color: "hsl(195 50% 55%)",
    detail: "Ependyma-lined remnant of the neural tube. Expansion = syringomyelia, damaging crossing STT fibres in the anterior white commissure → cape-like dissociated sensory loss.",
    modality: "CSF conduit",
  },

  // ───── VASCULAR ─────
  asa: {
    label: "Anterior Spinal Artery", category: "vascular", direction: "none",
    color: "hsl(0 70% 45%)",
    detail: "Single midline vessel from the vertebrals. Supplies the anterior 2/3 of the cord via sulcal branches. Reinforced by the artery of Adamkiewicz (T9–T12, left in 75%). Vulnerable to aortic surgery, cross-clamping, hypotension.",
    modality: "Anterior 2/3: motor, pain/temp, autonomic",
  },
  psa: {
    label: "Posterior Spinal Arteries", category: "vascular", direction: "none",
    color: "hsl(210 60% 45%)",
    detail: "Paired arteries from the vertebral or PICA. Supply the posterior 1/3 (dorsal columns, posterior horns). Better collaterals than ASA → isolated infarction is rare.",
    modality: "Posterior 1/3: dorsal columns",
  },

  // ───── NERVE ROOTS ─────
  "dorsal-root": {
    label: "Dorsal Root + DRG", category: "nerve", direction: "ascending",
    color: "hsl(210 60% 55%)",
    detail: "Sensory afferents — cell bodies in the DRG (outside the blood–nerve barrier, target for pulsed RF in pain medicine). Aβ touch/proprioception, Aδ sharp pain, C dull pain.",
    modality: "All sensory modalities entering cord",
  },
  "ventral-root": {
    label: "Ventral Root", category: "nerve", direction: "descending",
    color: "hsl(0 60% 55%)",
    detail: "Motor efferents from the anterior horn plus sympathetic preganglionic (T1–L2) or parasympathetic (S2–S4) fibres. Bell–Magendie law: dorsal sensory, ventral motor.",
    modality: "Motor & autonomic efferents",
  },
};

const SYNDROMES: Record<SyndromeKey, SyndromeInfo> = {
  anterior: { label: "Anterior Cord Syndrome", cause: "ASA occlusion (aortic surgery, dissection, hypotension); flexion injury with disc retropulsion.", deficit: "Loss of motor (CST), pain & temperature (STT) below the lesion. PRESERVED dorsal columns. Worst prognosis (~10% motor recovery).", color: "hsl(0 65% 55%)", affected: ["lat-cst", "ant-cst", "stt", "ant-horn", "lat-horn", "asa"] },
  central: { label: "Central Cord Syndrome", cause: "Hyperextension in elderly with cervical spondylosis; syringomyelia; intramedullary tumour.", deficit: "Upper limbs > lower limbs weakness (somatotopy). Cape-like dissociated sensory loss in syrinx. Best prognosis.", color: "hsl(280 50% 55%)", affected: ["central", "stt", "lat-cst"] },
  "brown-sequard": { label: "Brown-Séquard (Hemisection)", cause: "Penetrating trauma; lateral compression.", deficit: "Ipsilateral UMN weakness + dorsal column loss. Contralateral pain/temperature loss (STT crosses 1–2 levels above). Best overall prognosis.", color: "hsl(35 70% 50%)", affected: ["dorsal-col", "lat-cst", "stt", "ant-horn", "lat-horn"] },
  posterior: { label: "Posterior Cord Syndrome", cause: "PSA occlusion (rare), MS, B12 deficiency (SACD), tabes dorsalis, Friedreich's.", deficit: "Loss of proprioception/vibration. Sensory ataxia, positive Romberg.", color: "hsl(210 60% 55%)", affected: ["dorsal-col", "psa"] },
  complete: { label: "Complete Transection", cause: "Severe trauma, transverse myelitis, cord compression.", deficit: "Loss of all modalities below the level. Spinal shock → UMN signs. Autonomic dysreflexia risk if T6 or above.", color: "hsl(0 0% 50%)", affected: ["dorsal-col", "lat-cst", "ant-cst", "stt", "ant-horn", "post-horn", "lat-horn", "asa", "psa"] },
};

// =================================================================
// Per-level cord geometry — visibly different shapes
// =================================================================
interface LevelGeometry {
  label: string;
  desc: string;
  rx: number;   // cord half-width
  ry: number;   // cord half-height
  greyScale: number;     // grey matter overall scale
  antHornScale: number;  // anterior horn enlargement
  postHornScale: number; // posterior horn size
  hasLateralHorn: boolean;
  hasClarke: boolean;
  whiteToGreyRatio: string;
}

const LEVEL_INFO: Record<CordLevel, LevelGeometry> = {
  cervical: {
    label: "Cervical (C5–T1)",
    desc: "Cervical enlargement — brachial plexus origin. Largest cord diameter, oval shape (wider than tall). Big anterior horns for upper-limb motor neurons. White matter dominates because all ascending and descending tracts must traverse this level.",
    rx: 130, ry: 100,
    greyScale: 1.05,
    antHornScale: 1.4,
    postHornScale: 1.0,
    hasLateralHorn: false,
    hasClarke: false,
    whiteToGreyRatio: "White matter ≫ grey matter",
  },
  thoracic: {
    label: "Thoracic (T1–T12)",
    desc: "Smallest, near-circular cord. Slim anterior horns (no limb enlargement). Lateral horns (IML) PRESENT for sympathetic outflow. Clarke's column at the base of the dorsal horn for the posterior spinocerebellar tract.",
    rx: 85, ry: 95,
    greyScale: 0.75,
    antHornScale: 0.7,
    postHornScale: 0.85,
    hasLateralHorn: true,
    hasClarke: true,
    whiteToGreyRatio: "White matter > grey matter",
  },
  lumbar: {
    label: "Lumbar (L1–S2)",
    desc: "Lumbosacral enlargement — lumbosacral plexus. Cord becomes round and grey-matter dominant. MASSIVE anterior horns for lower-limb motor neurons. White matter relatively reduced as many tracts have already terminated above.",
    rx: 110, ry: 105,
    greyScale: 1.25,
    antHornScale: 1.55,
    postHornScale: 1.2,
    hasLateralHorn: false,
    hasClarke: false,
    whiteToGreyRatio: "Grey matter ≈ white matter",
  },
  sacral: {
    label: "Sacral (S2–S4)",
    desc: "Smallest cross-section, almost circular and tiny. Grey matter dominates — proportionally enormous horns. White matter is sparse because so few tracts remain. Parasympathetic outflow (S2–S4) and Onuf's nucleus for pelvic floor.",
    rx: 65, ry: 65,
    greyScale: 1.15,
    antHornScale: 1.1,
    postHornScale: 1.05,
    hasLateralHorn: false,
    hasClarke: false,
    whiteToGreyRatio: "Grey matter ≫ white matter",
  },
};

// =================================================================
// Component
// =================================================================
const SpinalCordAxialDiagram = () => {
  const [selectedTract, setSelectedTract] = useState<TractKey | null>(null);
  const [selectedSyndrome, setSelectedSyndrome] = useState<SyndromeKey | null>(null);
  const [cordLevel, setCordLevel] = useState<CordLevel>("thoracic");

  const activeInfo = selectedTract ? TRACTS[selectedTract] : null;
  const syndInfo = selectedSyndrome ? SYNDROMES[selectedSyndrome] : null;
  const level = LEVEL_INFO[cordLevel];

  const isHL = (k: TractKey) => (selectedSyndrome ? SYNDROMES[selectedSyndrome].affected.includes(k) : selectedTract === k);
  const isDim = (k: TractKey) => {
    if (selectedSyndrome) return !SYNDROMES[selectedSyndrome].affected.includes(k);
    if (selectedTract) return selectedTract !== k;
    return false;
  };

  // SVG canvas
  const VB_W = 460, VB_H = 380;
  const cx = 230, cy = 195;
  const { rx, ry, greyScale, antHornScale, postHornScale, hasLateralHorn, hasClarke } = level;

  const select = (k: TractKey) => { setSelectedTract(selectedTract === k ? null : k); setSelectedSyndrome(null); };

  // Tract opacity helpers
  const fillOp = (k: TractKey) => (isHL(k) ? 0.55 : isDim(k) ? 0.05 : 0.22);
  const strokeOp = (k: TractKey) => (isHL(k) ? 1 : isDim(k) ? 0.15 : 0.7);
  const strokeW = (k: TractKey) => (isHL(k) ? 1.6 : 0.6);

  // ───── Tract path generator ─────
  // Uses POLAR coords inside a unit ellipse (rx, ry) so paths can never escape the cord.
  // arcRing(angleStart, angleEnd, radialOuter, radialInner) draws an annular wedge.
  const arcRing = (a0: number, a1: number, rOut: number, rIn: number) => {
    const pt = (a: number, r: number) => {
      const x = cx + Math.cos(a) * rx * r;
      const y = cy + Math.sin(a) * ry * r;
      return [x, y];
    };
    const [x1, y1] = pt(a0, rOut);
    const [x2, y2] = pt(a1, rOut);
    const [x3, y3] = pt(a1, rIn);
    const [x4, y4] = pt(a0, rIn);
    const largeArc = Math.abs(a1 - a0) > Math.PI ? 1 : 0;
    return `M ${x1} ${y1} A ${rx * rOut} ${ry * rOut} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${rx * rIn} ${ry * rIn} 0 ${largeArc} 0 ${x4} ${y4} Z`;
  };
  // Centre point for a wedge label
  const centroid = (a0: number, a1: number, r: number) => {
    const a = (a0 + a1) / 2;
    return [cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r];
  };

  // Angle convention: 0 = right (3 o'clock), -π/2 = top (posterior), π/2 = bottom (anterior).
  // We split white matter into wedges around the cord's outer rim (rIn=0.55 .. rOut=0.97).

  return (
    <div className="border border-border rounded-lg p-4 mb-6 bg-card/30">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Spinal Cord — Axial Cross-Section</h3>
      <p className="text-xs text-muted-foreground mb-3">
        Tap a structure for details. Switch cord level to see how the cord changes shape and proportion.
      </p>

      {/* Level selector with size hint */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        {(Object.keys(LEVEL_INFO) as CordLevel[]).map((lv) => {
          const g = LEVEL_INFO[lv];
          const size = Math.round((g.rx * g.ry) / 100);
          const active = cordLevel === lv;
          return (
            <button
              key={lv}
              onClick={() => setCordLevel(lv)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-all flex items-center gap-1.5 ${
                active ? "border-primary/60 bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:bg-secondary/40"
              }`}
            >
              {/* Tiny inline cord-size icon scales with level */}
              <span
                className="inline-block rounded-full"
                style={{
                  width: `${Math.max(6, g.rx / 12)}px`,
                  height: `${Math.max(6, g.ry / 12)}px`,
                  background: active ? "hsl(var(--primary) / 0.4)" : "hsl(var(--muted-foreground) / 0.4)",
                }}
                aria-hidden
              />
              {lv.charAt(0).toUpperCase() + lv.slice(1)}
              <span className="text-[9px] opacity-60">({size})</span>
            </button>
          );
        })}
      </div>
      <div className="rounded-md bg-muted/40 p-2 mb-3 text-[11px] text-muted-foreground leading-snug">
        <span className="font-semibold text-foreground">{level.label}.</span> {level.desc}{" "}
        <span className="italic">{level.whiteToGreyRatio}.</span>
      </div>

      {/* Syndrome overlay selector */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="text-[10px] text-muted-foreground self-center mr-1">Cord syndromes:</span>
        {(Object.keys(SYNDROMES) as SyndromeKey[]).map((sk) => (
          <button
            key={sk}
            onClick={() => { setSelectedSyndrome(selectedSyndrome === sk ? null : sk); setSelectedTract(null); }}
            className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-all ${
              selectedSyndrome === sk ? "text-foreground" : "border-border text-muted-foreground hover:bg-secondary/40"
            }`}
            style={selectedSyndrome === sk ? { borderColor: SYNDROMES[sk].color, backgroundColor: withAlpha(SYNDROMES[sk].color, 0.12) } : {}}
          >
            {SYNDROMES[sk].label.replace(" Syndrome", "").replace(" (Hemisection)", "")}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* SVG */}
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full max-w-md mx-auto flex-shrink-0">
          {/* clip path = cord ellipse, ensures NOTHING escapes */}
          <defs>
            <clipPath id="cordClip">
              <ellipse cx={cx} cy={cy} rx={rx} ry={ry} />
            </clipPath>
            <marker id="arrUp" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M4 1 L7 7 L1 7 Z" fill={ASC} />
            </marker>
            <marker id="arrDown" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M4 7 L7 1 L1 1 Z" fill={DESC} />
            </marker>
          </defs>

          {/* Orientation labels */}
          <text x={cx} y={18} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontWeight={600}>POSTERIOR</text>
          <text x={cx} y={VB_H - 6} textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontWeight={600}>ANTERIOR</text>

          {/* Asc/Desc legend within SVG */}
          <g transform={`translate(${VB_W - 130}, 18)`}>
            <g>
              <path d="M5 12 L5 2" stroke={ASC} strokeWidth={1.5} markerEnd="url(#arrUp)" />
              <text x={14} y={11} fontSize="9" fill={ASC} fontWeight={600}>Ascending (sensory)</text>
            </g>
            <g transform="translate(0, 14)">
              <path d="M5 2 L5 12" stroke={DESC} strokeWidth={1.5} markerEnd="url(#arrDown)" />
              <text x={14} y={11} fontSize="9" fill={DESC} fontWeight={600}>Descending (motor)</text>
            </g>
          </g>

          {/* Cord outline */}
          <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth={1.8} />

          {/* Everything inside the cord is clipped to the outline */}
          <g clipPath="url(#cordClip)">
            {/* Anterior median fissure & posterior median sulcus */}
            <line x1={cx} y1={cy + ry} x2={cx} y2={cy + ry * 0.2} stroke="hsl(var(--border))" strokeWidth={1.5} />
            <line x1={cx} y1={cy - ry} x2={cx} y2={cy - ry * 0.25} stroke="hsl(var(--border))" strokeWidth={1} />

            {/* ───── WHITE MATTER WEDGES (radial) ─────
                Convention: inner radial 0.55, outer 0.97. */}

            {/* Dorsal columns — posterior, hugs midline (top wedges) */}
            {[
              [-Math.PI / 2 - 0.55, -Math.PI / 2 - 0.05],
              [-Math.PI / 2 + 0.05, -Math.PI / 2 + 0.55],
            ].map(([a0, a1], i) => (
              <path
                key={`dc-${i}`}
                d={arcRing(a0, a1, 0.97, 0.45)}
                fill={TRACTS["dorsal-col"].color}
                fillOpacity={fillOp("dorsal-col")}
                stroke={TRACTS["dorsal-col"].color}
                strokeOpacity={strokeOp("dorsal-col")}
                strokeWidth={strokeW("dorsal-col")}
                className="cursor-pointer transition-all"
                onClick={() => select("dorsal-col")}
              />
            ))}

            {/* Posterior spinocerebellar — postero-lateral surface */}
            {[
              [-Math.PI / 2 - 1.15, -Math.PI / 2 - 0.6],
              [-Math.PI / 2 + 0.6, -Math.PI / 2 + 1.15],
            ].map(([a0, a1], i) => (
              <path
                key={`psc-${i}`}
                d={arcRing(a0, a1, 0.97, 0.78)}
                fill={TRACTS["post-spinocerebellar"].color}
                fillOpacity={fillOp("post-spinocerebellar")}
                stroke={TRACTS["post-spinocerebellar"].color}
                strokeOpacity={strokeOp("post-spinocerebellar")}
                strokeWidth={strokeW("post-spinocerebellar")}
                className="cursor-pointer transition-all"
                onClick={() => select("post-spinocerebellar")}
              />
            ))}

            {/* Lateral CST — lateral funiculus, deep to surface */}
            {[
              [-Math.PI / 2 - 1.55, -Math.PI / 2 - 1.15],
              [-Math.PI / 2 + 1.15, -Math.PI / 2 + 1.55],
            ].map(([a0, a1], i) => (
              <path
                key={`lcst-${i}`}
                d={arcRing(a0, a1, 0.78, 0.55)}
                fill={TRACTS["lat-cst"].color}
                fillOpacity={fillOp("lat-cst")}
                stroke={TRACTS["lat-cst"].color}
                strokeOpacity={strokeOp("lat-cst")}
                strokeWidth={strokeW("lat-cst")}
                className="cursor-pointer transition-all"
                onClick={() => select("lat-cst")}
              />
            ))}

            {/* Rubrospinal — sliver superficial to lat CST, mid-lateral */}
            {[
              [-Math.PI / 2 - 1.55, -Math.PI / 2 - 1.15],
              [-Math.PI / 2 + 1.15, -Math.PI / 2 + 1.55],
            ].map(([a0, a1], i) => (
              <path
                key={`rub-${i}`}
                d={arcRing(a0, a1, 0.97, 0.78)}
                fill={TRACTS.rubrospinal.color}
                fillOpacity={fillOp("rubrospinal")}
                stroke={TRACTS.rubrospinal.color}
                strokeOpacity={strokeOp("rubrospinal")}
                strokeWidth={strokeW("rubrospinal")}
                className="cursor-pointer transition-all"
                onClick={() => select("rubrospinal")}
              />
            ))}

            {/* Spinothalamic — anterolateral, antero-lateral surface */}
            {[
              [-Math.PI / 2 - 2.1, -Math.PI / 2 - 1.55],
              [-Math.PI / 2 + 1.55, -Math.PI / 2 + 2.1],
            ].map(([a0, a1], i) => (
              <path
                key={`stt-${i}`}
                d={arcRing(a0, a1, 0.97, 0.6)}
                fill={TRACTS.stt.color}
                fillOpacity={fillOp("stt")}
                stroke={TRACTS.stt.color}
                strokeOpacity={strokeOp("stt")}
                strokeWidth={strokeW("stt")}
                className="cursor-pointer transition-all"
                onClick={() => select("stt")}
              />
            ))}

            {/* Anterior spinocerebellar — sliver superficial to STT, anterolateral */}
            {[
              [-Math.PI / 2 - 2.1, -Math.PI / 2 - 1.85],
              [-Math.PI / 2 + 1.85, -Math.PI / 2 + 2.1],
            ].map(([a0, a1], i) => (
              <path
                key={`asc-${i}`}
                d={arcRing(a0, a1, 0.97, 0.85)}
                fill={TRACTS["ant-spinocerebellar"].color}
                fillOpacity={fillOp("ant-spinocerebellar")}
                stroke={TRACTS["ant-spinocerebellar"].color}
                strokeOpacity={strokeOp("ant-spinocerebellar")}
                strokeWidth={strokeW("ant-spinocerebellar")}
                className="cursor-pointer transition-all"
                onClick={() => select("ant-spinocerebellar")}
              />
            ))}

            {/* Reticulospinal — anterior funiculus, paramedian */}
            {[
              [-Math.PI / 2 - 2.6, -Math.PI / 2 - 2.1],
              [-Math.PI / 2 + 2.1, -Math.PI / 2 + 2.6],
            ].map(([a0, a1], i) => (
              <path
                key={`ret-${i}`}
                d={arcRing(a0, a1, 0.97, 0.55)}
                fill={TRACTS.reticulospinal.color}
                fillOpacity={fillOp("reticulospinal")}
                stroke={TRACTS.reticulospinal.color}
                strokeOpacity={strokeOp("reticulospinal")}
                strokeWidth={strokeW("reticulospinal")}
                className="cursor-pointer transition-all"
                onClick={() => select("reticulospinal")}
              />
            ))}

            {/* Anterior CST — anterior, hugs midline */}
            {[
              [Math.PI / 2 - 0.55, Math.PI / 2 - 0.05],
              [Math.PI / 2 + 0.05, Math.PI / 2 + 0.55],
            ].map(([a0, a1], i) => (
              <path
                key={`acst-${i}`}
                d={arcRing(a0, a1, 0.97, 0.55)}
                fill={TRACTS["ant-cst"].color}
                fillOpacity={fillOp("ant-cst")}
                stroke={TRACTS["ant-cst"].color}
                strokeOpacity={strokeOp("ant-cst")}
                strokeWidth={strokeW("ant-cst")}
                className="cursor-pointer transition-all"
                onClick={() => select("ant-cst")}
              />
            ))}

            {/* ───── GREY MATTER — H-shape, scaled per level ───── */}
            <g transform={`translate(${cx}, ${cy}) scale(${greyScale})`}>
              {/* central commissure */}
              <rect x={-10} y={-4} width={20} height={8} rx={2} fill={GREY} fillOpacity={0.35} />
              {/* central canal */}
              <circle
                cx={0}
                cy={0}
                r={4}
                fill={TRACTS.central.color}
                fillOpacity={isHL("central") ? 0.7 : isDim("central") ? 0.05 : 0.35}
                stroke={TRACTS.central.color}
                strokeWidth={isHL("central") ? 1.5 : 0.8}
                className="cursor-pointer"
                onClick={() => select("central")}
              />

              {/* Posterior horns — narrow, point dorsally */}
              {[-1, 1].map((side) => (
                <path
                  key={`ph-${side}`}
                  d={`M ${side * 4} -4 Q ${side * 12 * postHornScale} -22 ${side * 18 * postHornScale} -42
                      Q ${side * 22 * postHornScale} -50 ${side * 16 * postHornScale} -52
                      Q ${side * 10 * postHornScale} -48 ${side * 12 * postHornScale} -36
                      Q ${side * 8 * postHornScale} -22 ${side * 4} -4 Z`}
                  fill={TRACTS["post-horn"].color}
                  fillOpacity={isHL("post-horn") ? 0.65 : isDim("post-horn") ? 0.05 : 0.32}
                  stroke={TRACTS["post-horn"].color}
                  strokeOpacity={0.8}
                  strokeWidth={isHL("post-horn") ? 1.5 : 0.7}
                  className="cursor-pointer transition-all"
                  onClick={() => select("post-horn")}
                />
              ))}

              {/* Anterior horns — broad, scaled larger at enlargements */}
              {[-1, 1].map((side) => (
                <path
                  key={`ah-${side}`}
                  d={`M ${side * 4} 4 Q ${side * 14 * antHornScale} 18 ${side * 32 * antHornScale} 38
                      Q ${side * 40 * antHornScale} 46 ${side * 32 * antHornScale} 52
                      Q ${side * 22 * antHornScale} 50 ${side * 18 * antHornScale} 38
                      Q ${side * 10 * antHornScale} 22 ${side * 4} 4 Z`}
                  fill={TRACTS["ant-horn"].color}
                  fillOpacity={isHL("ant-horn") ? 0.65 : isDim("ant-horn") ? 0.05 : 0.32}
                  stroke={TRACTS["ant-horn"].color}
                  strokeOpacity={0.8}
                  strokeWidth={isHL("ant-horn") ? 1.5 : 0.7}
                  className="cursor-pointer transition-all"
                  onClick={() => select("ant-horn")}
                />
              ))}

              {/* Lateral horns — only thoracic (and L1–L2) */}
              {hasLateralHorn &&
                [-1, 1].map((side) => (
                  <path
                    key={`lh-${side}`}
                    d={`M ${side * 8} -2 Q ${side * 20} -8 ${side * 28} -12
                        Q ${side * 32} -10 ${side * 28} -4
                        Q ${side * 18} 0 ${side * 8} 2 Z`}
                    fill={TRACTS["lat-horn"].color}
                    fillOpacity={isHL("lat-horn") ? 0.65 : isDim("lat-horn") ? 0.05 : 0.4}
                    stroke={TRACTS["lat-horn"].color}
                    strokeOpacity={0.9}
                    strokeWidth={isHL("lat-horn") ? 1.5 : 0.8}
                    className="cursor-pointer transition-all"
                    onClick={() => select("lat-horn")}
                  />
                ))}

              {/* Clarke's column nodes — thoracic only */}
              {hasClarke &&
                [-1, 1].map((side) => (
                  <ellipse
                    key={`ck-${side}`}
                    cx={side * 14}
                    cy={-18}
                    rx={4}
                    ry={3.5}
                    fill={TRACTS["post-spinocerebellar"].color}
                    fillOpacity={isHL("post-spinocerebellar") ? 0.7 : 0.3}
                    stroke={TRACTS["post-spinocerebellar"].color}
                    strokeWidth={0.8}
                  />
                ))}

              {/* SG cap on tip of dorsal horn */}
              {[-1, 1].map((side) => (
                <ellipse
                  key={`sg-${side}`}
                  cx={side * 17 * postHornScale}
                  cy={-50}
                  rx={6}
                  ry={3}
                  transform={`rotate(${side * -15} ${side * 17 * postHornScale} -50)`}
                  fill="none"
                  stroke={TRACTS["post-horn"].color}
                  strokeOpacity={isDim("post-horn") ? 0.05 : 0.5}
                  strokeWidth={1.5}
                />
              ))}
            </g>

            {/* Direction arrows on each tract — placed at wedge centroid */}
            {([
              ["dorsal-col", -Math.PI / 2 - 0.3],
              ["dorsal-col", -Math.PI / 2 + 0.3],
              ["stt", -Math.PI / 2 - 1.85],
              ["stt", -Math.PI / 2 + 1.85],
              ["post-spinocerebellar", -Math.PI / 2 - 0.9],
              ["post-spinocerebellar", -Math.PI / 2 + 0.9],
              ["ant-spinocerebellar", -Math.PI / 2 - 1.97],
              ["ant-spinocerebellar", -Math.PI / 2 + 1.97],
              ["lat-cst", -Math.PI / 2 - 1.35],
              ["lat-cst", -Math.PI / 2 + 1.35],
              ["rubrospinal", -Math.PI / 2 - 1.35],
              ["rubrospinal", -Math.PI / 2 + 1.35],
              ["reticulospinal", -Math.PI / 2 - 2.35],
              ["reticulospinal", -Math.PI / 2 + 2.35],
              ["ant-cst", Math.PI / 2 - 0.3],
              ["ant-cst", Math.PI / 2 + 0.3],
            ] as Array<[TractKey, number]>).map(([k, angle], i) => {
              const dir = TRACTS[k].direction;
              if (dir === "none") return null;
              // Choose radius depending on tract band
              const r =
                k === "dorsal-col" ? 0.7 :
                k === "stt" ? 0.78 :
                k === "post-spinocerebellar" ? 0.88 :
                k === "ant-spinocerebellar" ? 0.91 :
                k === "lat-cst" ? 0.66 :
                k === "rubrospinal" ? 0.88 :
                k === "reticulospinal" ? 0.75 :
                k === "ant-cst" ? 0.76 : 0.7;
              const [px, py] = centroid(angle, angle + 0.001, r);
              const op = isDim(k) ? 0.1 : isHL(k) ? 1 : 0.7;
              const len = isHL(k) ? 14 : 10;
              return dir === "ascending" ? (
                <line
                  key={`dir-${i}`}
                  x1={px}
                  y1={py + len / 2}
                  x2={px}
                  y2={py - len / 2}
                  stroke={ASC}
                  strokeWidth={isHL(k) ? 2 : 1.4}
                  opacity={op}
                  markerEnd="url(#arrUp)"
                />
              ) : (
                <line
                  key={`dir-${i}`}
                  x1={px}
                  y1={py - len / 2}
                  x2={px}
                  y2={py + len / 2}
                  stroke={DESC}
                  strokeWidth={isHL(k) ? 2 : 1.4}
                  opacity={op}
                  markerEnd="url(#arrDown)"
                />
              );
            })}

            {/* Anterior white commissure — STT crossing, animated when STT highlighted */}
            <g opacity={isHL("stt") ? 0.8 : 0.15}>
              <path d={`M ${cx - 8} ${cy + 6} Q ${cx} ${cy + 12} ${cx + 8} ${cy + 6}`} stroke={TRACTS.stt.color} strokeWidth={0.9} fill="none" strokeDasharray="2 1.5" />
              <path d={`M ${cx + 8} ${cy + 6} Q ${cx} ${cy + 14} ${cx - 8} ${cy + 6}`} stroke={TRACTS.stt.color} strokeWidth={0.7} fill="none" strokeDasharray="1.5 1.5" />
            </g>

            {/* Syndrome overlays — clipped so they hug the cord */}
            {selectedSyndrome === "brown-sequard" && (
              <rect x={cx - rx} y={cy - ry} width={rx} height={ry * 2} fill={SYNDROMES["brown-sequard"].color} fillOpacity={0.12} stroke={SYNDROMES["brown-sequard"].color} strokeDasharray="4 3" strokeWidth={1.5} />
            )}
            {selectedSyndrome === "anterior" && (
              <path d={arcRing(0.05, Math.PI - 0.05, 0.97, 0)} fill={SYNDROMES.anterior.color} fillOpacity={0.12} stroke={SYNDROMES.anterior.color} strokeDasharray="4 3" strokeWidth={1.5} />
            )}
            {selectedSyndrome === "central" && (
              <ellipse cx={cx} cy={cy} rx={rx * 0.45} ry={ry * 0.45} fill={SYNDROMES.central.color} fillOpacity={0.12} stroke={SYNDROMES.central.color} strokeDasharray="4 3" strokeWidth={1.5} />
            )}
            {selectedSyndrome === "posterior" && (
              <path d={arcRing(-Math.PI + 0.05, -0.05, 0.97, 0.4)} fill={SYNDROMES.posterior.color} fillOpacity={0.12} stroke={SYNDROMES.posterior.color} strokeDasharray="4 3" strokeWidth={1.5} />
            )}
            {selectedSyndrome === "complete" && (
              <ellipse cx={cx} cy={cy} rx={rx * 0.98} ry={ry * 0.98} fill={SYNDROMES.complete.color} fillOpacity={0.12} stroke={SYNDROMES.complete.color} strokeDasharray="6 3" strokeWidth={1.8} />
            )}
          </g>

          {/* ───── OUTSIDE-CORD ELEMENTS ───── */}

          {/* ASA — anterior midline (sits OUTSIDE cord on purpose) */}
          <circle
            cx={cx}
            cy={cy + ry + 10}
            r={5}
            fill={TRACTS.asa.color}
            fillOpacity={isHL("asa") ? 0.7 : isDim("asa") ? 0.05 : 0.4}
            stroke={TRACTS.asa.color}
            strokeWidth={isHL("asa") ? 1.6 : 0.9}
            className="cursor-pointer transition-all"
            onClick={() => select("asa")}
          />
          <text x={cx + 10} y={cy + ry + 13} fontSize="8" fill={TRACTS.asa.color} fontWeight={600} opacity={isDim("asa") ? 0.1 : 0.85}>ASA</text>

          {/* PSA — paired posterior */}
          {[-1, 1].map((s) => (
            <circle
              key={`psa-${s}`}
              cx={cx + s * rx * 0.35}
              cy={cy - ry - 8}
              r={3.5}
              fill={TRACTS.psa.color}
              fillOpacity={isHL("psa") ? 0.7 : isDim("psa") ? 0.05 : 0.4}
              stroke={TRACTS.psa.color}
              strokeWidth={isHL("psa") ? 1.6 : 0.9}
              className="cursor-pointer transition-all"
              onClick={() => select("psa")}
            />
          ))}
          <text x={cx} y={cy - ry - 14} fontSize="8" fill={TRACTS.psa.color} fontWeight={600} textAnchor="middle" opacity={isDim("psa") ? 0.1 : 0.85}>PSA (paired)</text>

          {/* Roots */}
          {[-1, 1].map((s) => (
            <g key={`roots-${s}`}>
              {/* Dorsal root */}
              <path
                d={`M ${cx + s * (rx - 4)} ${cy - ry * 0.55} Q ${cx + s * (rx + 25)} ${cy - ry * 0.7} ${cx + s * (rx + 50)} ${cy - ry * 0.65}`}
                fill="none"
                stroke={TRACTS["dorsal-root"].color}
                strokeWidth={isHL("dorsal-root") ? 2 : 1.2}
                opacity={isDim("dorsal-root") ? 0.08 : 0.7}
                className="cursor-pointer"
                onClick={() => select("dorsal-root")}
              />
              <ellipse
                cx={cx + s * (rx + 55)}
                cy={cy - ry * 0.65}
                rx={8}
                ry={5}
                fill={TRACTS["dorsal-root"].color}
                fillOpacity={isHL("dorsal-root") ? 0.6 : isDim("dorsal-root") ? 0.05 : 0.25}
                stroke={TRACTS["dorsal-root"].color}
                strokeWidth={isHL("dorsal-root") ? 1.5 : 0.8}
                className="cursor-pointer"
                onClick={() => select("dorsal-root")}
              />
              <text x={cx + s * (rx + 55)} y={cy - ry * 0.65 - 10} fontSize="7" fill={TRACTS["dorsal-root"].color} textAnchor="middle" opacity={isDim("dorsal-root") ? 0.1 : 0.7}>DRG</text>

              {/* Ventral root */}
              <path
                d={`M ${cx + s * (rx - 4)} ${cy + ry * 0.55} Q ${cx + s * (rx + 25)} ${cy + ry * 0.7} ${cx + s * (rx + 50)} ${cy + ry * 0.65}`}
                fill="none"
                stroke={TRACTS["ventral-root"].color}
                strokeWidth={isHL("ventral-root") ? 2 : 1.2}
                opacity={isDim("ventral-root") ? 0.08 : 0.7}
                className="cursor-pointer"
                onClick={() => select("ventral-root")}
              />
              <text x={cx + s * (rx + 55)} y={cy + ry * 0.65 + 12} fontSize="7" fill={TRACTS["ventral-root"].color} textAnchor="middle" opacity={isDim("ventral-root") ? 0.1 : 0.7}>Vent.</text>
            </g>
          ))}
        </svg>

        {/* Info panel */}
        <div className="flex-1 min-w-0">
          {syndInfo ? (
            <div className="p-4 rounded-lg border animate-fade-in" style={{ borderColor: withAlpha(syndInfo.color, 0.25) }}>
              <p className="font-bold text-sm" style={{ color: syndInfo.color }}>{syndInfo.label}</p>
              <p className="text-xs text-muted-foreground mt-1"><span className="font-semibold text-foreground">Cause:</span> {syndInfo.cause}</p>
              <p className="text-xs text-muted-foreground mt-1"><span className="font-semibold text-foreground">Deficit:</span> {syndInfo.deficit}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {syndInfo.affected.map((tk) => (
                  <span key={tk} className="px-1.5 py-0.5 rounded text-[9px] border" style={{ borderColor: withAlpha(TRACTS[tk].color, 0.31), color: TRACTS[tk].color }}>
                    {TRACTS[tk].label}
                  </span>
                ))}
              </div>
            </div>
          ) : activeInfo ? (
            <div className="p-4 rounded-lg border border-border animate-fade-in">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: activeInfo.color }} />
                <p className="font-bold text-sm" style={{ color: activeInfo.color }}>{activeInfo.label}</p>
                {activeInfo.direction !== "none" && (
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wide"
                    style={{
                      color: activeInfo.direction === "ascending" ? ASC : DESC,
                      backgroundColor: (activeInfo.direction === "ascending" ? ASC : DESC) + "1F",
                    }}
                  >
                    {activeInfo.direction === "ascending" ? "▲ Ascending" : "▼ Descending"}
                  </span>
                )}
                <span className="text-[10px] px-1.5 py-0.5 rounded border border-border text-muted-foreground capitalize">{activeInfo.category}</span>
              </div>
              <p className="text-xs text-primary/80 font-medium mt-1 mb-1">Modality: {activeInfo.modality}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{activeInfo.detail}</p>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center italic py-2">Tap a structure for details, or select a cord syndrome above.</p>
          )}

          {/* Direction-grouped legend */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
            <div className="rounded-md border border-border p-2">
              <div className="font-semibold mb-1 flex items-center gap-1" style={{ color: ASC }}>▲ Ascending (sensory)</div>
              <div className="space-y-0.5">
                {(Object.entries(TRACTS) as Array<[TractKey, TractInfo]>)
                  .filter(([, t]) => t.direction === "ascending" && t.category === "white")
                  .map(([k, t]) => (
                    <button
                      key={k}
                      onClick={() => select(k)}
                      className="block w-full text-left hover:underline"
                      style={{ color: t.color }}
                    >
                      {t.label}
                    </button>
                  ))}
              </div>
            </div>
            <div className="rounded-md border border-border p-2">
              <div className="font-semibold mb-1 flex items-center gap-1" style={{ color: DESC }}>▼ Descending (motor)</div>
              <div className="space-y-0.5">
                {(Object.entries(TRACTS) as Array<[TractKey, TractInfo]>)
                  .filter(([, t]) => t.direction === "descending" && t.category === "white")
                  .map(([k, t]) => (
                    <button
                      key={k}
                      onClick={() => select(k)}
                      className="block w-full text-left hover:underline"
                      style={{ color: t.color }}
                    >
                      {t.label}
                    </button>
                  ))}
              </div>
            </div>
            <div className="rounded-md border border-border p-2 col-span-2">
              <div className="font-semibold mb-1 text-foreground">Grey matter, vessels & roots</div>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5">
                {(Object.entries(TRACTS) as Array<[TractKey, TractInfo]>)
                  .filter(([, t]) => t.category !== "white")
                  .map(([k, t]) => (
                    <button
                      key={k}
                      onClick={() => select(k)}
                      className="hover:underline"
                      style={{ color: t.color }}
                    >
                      {t.label}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinalCordAxialDiagram;
