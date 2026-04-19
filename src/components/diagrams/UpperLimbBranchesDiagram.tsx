import { useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { PlexusCard, PlexusChipRow, PlexusDetailPanel, ROOT_COLORS } from "./plexusShared";
import { withAlpha } from "@/lib/color-utils";

/* =========================================================================
   Upper-limb peripheral nerve branches + block coverage.
   Two modes share the same anterior + posterior limb outlines:
     • "branches" — pick one named nerve; its course + sensory zone light up.
     • "blocks"   — pick a regional block; covered nerves light up + the
                    sensory area each one supplies is shaded; missed nerves
                    are listed in the detail panel.
   ========================================================================= */

type Mode = "branches" | "blocks";
type NerveKey = "musculocutaneous" | "axillary" | "median" | "radial" | "ulnar" | "intercostobrachial";

interface NerveData {
  label: string;
  roots: string;
  /** SVG path on the ANTERIOR limb. Empty string = nerve not seen anteriorly. */
  pathAnt: string;
  /** SVG path on the POSTERIOR limb. */
  pathPost: string;
  /** Optional cutaneous patch (anterior). */
  patchAnt?: string;
  /** Optional cutaneous patch (posterior). */
  patchPost?: string;
  motor: string;
  sensory: string;
  injury: string;
}

const NERVES: Record<NerveKey, NerveData> = {
  musculocutaneous: {
    label: "Musculocutaneous",
    roots: "C5, C6, C7",
    pathAnt: "M88,52 C92,72 96,98 100,118 C104,138 108,160 112,178",
    pathPost: "",
    patchAnt: "M105,170 Q112,210 122,238 L132,238 Q124,205 116,170 Z",
    motor: "Coracobrachialis, biceps brachii, brachialis (anterior arm flexors)",
    sensory: "Lateral cutaneous nerve of forearm — lateral forearm to wrist",
    injury: "Pierces coracobrachialis (key landmark). Often missed by axillary block — block separately.",
  },
  axillary: {
    label: "Axillary",
    roots: "C5, C6",
    pathAnt: "M82,48 C76,58 72,72 70,90",
    pathPost: "M82,48 C72,60 64,76 60,98",
    patchPost: "M48,80 Q42,108 50,128 L70,128 Q72,108 70,80 Z",
    patchAnt: "M58,82 Q56,108 64,124 L78,124 Q78,108 78,82 Z",
    motor: "Deltoid (abduction 15–90°), teres minor",
    sensory: "Regimental badge area — lateral shoulder",
    injury: "Quadrangular space. Damaged in surgical-neck humeral fractures and shoulder dislocation.",
  },
  median: {
    label: "Median",
    roots: "C5–T1",
    pathAnt: "M92,52 C96,80 100,108 104,134 C108,160 110,184 112,210 C114,232 116,254 118,272",
    pathPost: "",
    patchAnt: "M100,288 Q105,308 112,322 L122,322 Q118,305 113,288 Z",
    motor: "Pronators, most forearm flexors (not FCU/medial FDP), thenar (LOAF), lateral 2 lumbricals",
    sensory: "Lateral 3½ digits, palmar aspect; nail beds dorsally",
    injury: "Carpal tunnel syndrome; supracondylar fracture (anterior interosseous branch).",
  },
  radial: {
    label: "Radial",
    roots: "C5–T1",
    pathAnt: "M82,52 C84,82 86,108 92,134 C100,160 110,180 122,200 C130,214 138,228 144,244",
    pathPost: "M84,52 C82,80 82,108 88,134 C98,162 112,182 126,200 C136,214 144,230 150,248",
    patchPost: "M88,180 Q92,222 110,250 L130,248 Q120,210 108,180 Z",
    patchAnt: "M118,250 Q126,278 138,298 L148,298 Q140,275 130,250 Z",
    motor: "ALL extensors of arm + forearm (triceps, brachioradialis, supinator, wrist/finger extensors)",
    sensory: "Posterior arm + forearm; dorsal lateral 3½ digits (proximal phalanges only)",
    injury: "Spiral groove of humerus → 'Saturday-night palsy' (wrist drop). PIN compression at supinator.",
  },
  ulnar: {
    label: "Ulnar",
    roots: "C8, T1",
    pathAnt: "M98,52 C102,82 106,112 112,140 C118,168 124,196 130,222 C134,244 138,264 140,280",
    pathPost: "M100,52 C104,82 110,112 116,142 C122,170 130,196 136,222 C140,244 144,264 146,280",
    patchAnt: "M120,300 Q126,318 134,330 L144,330 Q140,315 132,300 Z",
    patchPost: "M126,300 Q134,320 144,332 L154,332 Q146,315 138,300 Z",
    motor: "Most intrinsic hand muscles, FCU, medial half FDP, hypothenar, all interossei, medial 2 lumbricals, adductor pollicis",
    sensory: "Medial 1½ digits (palmar + dorsal)",
    injury: "Cubital tunnel at elbow; Guyon's canal at wrist. 'Hand of benediction' / claw hand.",
  },
  intercostobrachial: {
    label: "Intercostobrachial",
    roots: "T2",
    pathAnt: "M76,70 C70,76 64,80 58,84",
    pathPost: "M76,70 C70,76 64,80 58,84",
    patchAnt: "M40,82 Q38,98 46,112 L60,112 Q56,98 56,82 Z",
    patchPost: "M40,82 Q38,98 46,112 L60,112 Q56,98 56,82 Z",
    motor: "None — pure sensory",
    sensory: "Medial / posterior upper arm (axilla)",
    injury: "Not part of brachial plexus. Often missed by axillary, supraclavicular and infraclavicular blocks → tourniquet pain.",
  },
};

const NERVE_COLOR: Record<NerveKey, string> = {
  musculocutaneous: ROOT_COLORS.C6,
  axillary: ROOT_COLORS.C5,
  median: ROOT_COLORS.C7,
  radial: "hsl(280, 45%, 55%)",
  ulnar: ROOT_COLORS.T1,
  intercostobrachial: "hsl(200, 25%, 55%)",
};

type BlockKey = "interscalene" | "supraclavicular" | "infraclavicular" | "axillary" | "wrist";

interface BlockData {
  label: string;
  level: string;
  covers: NerveKey[];
  misses: NerveKey[];
  technique: string;
  pearls: string;
}

const BLOCKS: Record<BlockKey, BlockData> = {
  interscalene: {
    label: "Interscalene",
    level: "Roots / upper trunk (C5–C7)",
    covers: ["axillary", "musculocutaneous", "median", "radial"],
    misses: ["ulnar", "intercostobrachial"],
    technique: "Needle between anterior and middle scalene at C6 (Chassaignac's tubercle). 15–20 ml LA.",
    pearls: "Best block for shoulder surgery. ~100% ipsilateral phrenic palsy — avoid in respiratory compromise. Spares ulnar territory.",
  },
  supraclavicular: {
    label: "Supraclavicular",
    level: "Trunks / divisions, lateral to subclavian artery",
    covers: ["musculocutaneous", "axillary", "median", "radial", "ulnar"],
    misses: ["intercostobrachial"],
    technique: "US-guided, needle in-plane lateral to subclavian artery, 'corner pocket' injection. 20–25 ml LA.",
    pearls: "'Spinal of the arm' — most complete block of the arm. Pneumothorax risk <1% with US. Misses tourniquet pain (T2).",
  },
  infraclavicular: {
    label: "Infraclavicular",
    level: "Cords around axillary artery",
    covers: ["musculocutaneous", "median", "radial", "ulnar", "axillary"],
    misses: ["intercostobrachial"],
    technique: "US-guided beneath pectoralis minor, target posterior to axillary artery (posterior cord). 20–30 ml LA.",
    pearls: "Reliable for elbow / forearm / hand surgery. Excellent for catheter placement (away from neck movement). No pneumothorax risk if US-guided correctly.",
  },
  axillary: {
    label: "Axillary",
    level: "Terminal branches around 3rd part axillary artery",
    covers: ["median", "radial", "ulnar"],
    misses: ["musculocutaneous", "axillary", "intercostobrachial"],
    technique: "Arm abducted, 4-injection technique around artery (median, ulnar, radial) + separate musculocutaneous in coracobrachialis.",
    pearls: "Safest brachial block (no pneumothorax, no phrenic palsy). Musculocutaneous has already left the sheath → block separately or it WILL be missed.",
  },
  wrist: {
    label: "Wrist block",
    level: "Median / ulnar / radial at the wrist",
    covers: ["median", "ulnar", "radial"],
    misses: ["musculocutaneous", "axillary", "intercostobrachial"],
    technique: "Median: between PL and FCR tendons. Ulnar: lateral to FCU above pisiform. Radial: subcutaneous infiltration over anatomical snuffbox.",
    pearls: "Useful for hand surgery without proximal block. Avoid adrenaline (digital ischaemia risk). 3–5 ml per nerve.",
  },
};

const UpperLimbBranchesDiagram = () => {
  const [mode, setMode] = useState<Mode>("branches");
  const [selectedNerve, setSelectedNerve] = useState<NerveKey>("median");
  const [selectedBlock, setSelectedBlock] = useState<BlockKey>("supraclavicular");
  const [showLabels, setShowLabels] = useState(true);

  const activeNerves: Set<NerveKey> =
    mode === "branches"
      ? new Set([selectedNerve])
      : new Set(BLOCKS[selectedBlock].covers);

  const palette = mode === "branches" ? NERVE_COLOR[selectedNerve] : "hsl(var(--clinical))";

  const renderLimb = (view: "ant" | "post") => (
    <svg viewBox="0 0 200 360" className="w-full max-w-[210px]" role="img"
      aria-label={`${view === "ant" ? "Anterior" : "Posterior"} upper limb nerve diagram`}>
      <defs>
        <radialGradient id={`ulb-${view}-skin`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.35" />
          <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.08" />
        </radialGradient>
      </defs>

      {/* Limb outline (shoulder → upper arm → elbow → forearm → hand) */}
      <path d="M55,30 Q55,18 90,18 Q125,18 125,30 L138,90 Q150,160 145,230 L150,300 Q160,335 155,348 L120,350 Q118,330 116,310 L110,260 Q102,260 95,260 L88,260 L82,310 L78,350 L48,348 Q42,335 50,300 L52,230 Q47,160 60,90 Z"
        fill={`url(#ulb-${view}-skin)`} stroke="hsl(var(--border))" strokeWidth="1" />

      {/* Reference dashed midline (shows on posterior view as spine of scapula proxy) */}
      {view === "post" && (
        <line x1="92" y1="20" x2="92" y2="100" stroke="hsl(var(--muted-foreground))"
          strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
      )}

      {/* Cutaneous patches */}
      {(Object.keys(NERVES) as NerveKey[]).map((k) => {
        const n = NERVES[k];
        const patch = view === "ant" ? n.patchAnt : n.patchPost;
        if (!patch || !activeNerves.has(k)) return null;
        const c = mode === "branches" ? NERVE_COLOR[k] : palette;
        return (
          <path key={`patch-${k}`} d={patch} fill={c} fillOpacity="0.18"
            stroke={c} strokeWidth="0.6" strokeDasharray="2 2" />
        );
      })}

      {/* Nerve courses */}
      {(Object.keys(NERVES) as NerveKey[]).map((k) => {
        const n = NERVES[k];
        const path = view === "ant" ? n.pathAnt : n.pathPost;
        if (!path) return null;
        const isActive = activeNerves.has(k);
        const c = mode === "branches" ? NERVE_COLOR[k] : palette;
        return (
          <g key={`nerve-${k}`}>
            <path d={path} stroke={c} strokeWidth={isActive ? 2.2 : 1}
              fill="none" opacity={isActive ? 1 : 0.18}
              strokeLinecap="round" strokeDasharray={view === "post" && (k === "median" || k === "ulnar") ? "4 3" : undefined} />
            {isActive && showLabels && (
              <text x={view === "ant" ? 6 : 6} y={view === "ant" ? 14 : 14}
                fontSize="6" fill={c} fontWeight="700">
                {/* label drawn once inside renderLimb header below to avoid clutter */}
              </text>
            )}
          </g>
        );
      })}

      {/* View label */}
      <text x="100" y="14" textAnchor="middle" fontSize="7"
        fill="hsl(var(--muted-foreground))" fontWeight="600" opacity="0.6">
        {view === "ant" ? "ANTERIOR" : "POSTERIOR"}
      </text>
    </svg>
  );

  const detail = mode === "branches" ? (() => {
    const n = NERVES[selectedNerve];
    return (
      <PlexusDetailPanel
        title={n.label}
        roots={n.roots}
        region="Branch"
        accent={NERVE_COLOR[selectedNerve]}
        reactKey={`branch-${selectedNerve}`}
        fields={[
          { label: "Motor", value: n.motor },
          { label: "Sensory", value: n.sensory },
          { label: "Clinical", value: n.injury },
        ]}
      />
    );
  })() : (() => {
    const b = BLOCKS[selectedBlock];
    return (
      <PlexusDetailPanel
        title={b.label}
        region="Block coverage"
        accent="hsl(var(--clinical))"
        reactKey={`block-${selectedBlock}`}
        fields={[
          { label: "Level", value: b.level },
          { label: "Covers", value: b.covers.map((k) => NERVES[k].label).join(", ") },
          { label: "Misses", value: b.misses.length ? b.misses.map((k) => NERVES[k].label).join(", ") : "—" },
          { label: "Technique", value: b.technique },
          { label: "Pearls", value: b.pearls },
        ]}
      />
    );
  })();

  return (
    <PlexusCard>
      <DiagramToggleBar
        title="Upper-limb nerve branches & block coverage"
        subtitle={mode === "branches"
          ? "Select a nerve to trace its course (anterior + posterior) and see motor / sensory / clinical pearls."
          : "Select a regional block — covered nerves and their sensory zones light up; missed nerves are listed."}
        toggles={[
          { id: "labels", label: "Labels", value: showLabels, onChange: setShowLabels },
        ]}
      />

      {/* Mode switch */}
      <div className="flex gap-1 mb-2">
        {(["branches", "blocks"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
              mode === m
                ? "border-primary bg-primary/10 text-foreground font-medium"
                : "border-border text-muted-foreground hover:bg-muted/50"
            }`}
          >
            {m === "branches" ? "Branches" : "Block coverage"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-4 justify-items-center">
        {renderLimb("ant")}
        {renderLimb("post")}
      </div>

      {detail}

      {mode === "branches" ? (
        <PlexusChipRow
          items={(Object.keys(NERVES) as NerveKey[]).map((k) => ({
            key: k, label: NERVES[k].label, color: NERVE_COLOR[k],
          }))}
          selected={selectedNerve}
          onSelect={setSelectedNerve}
        />
      ) : (
        <PlexusChipRow
          items={(Object.keys(BLOCKS) as BlockKey[]).map((k) => ({
            key: k, label: BLOCKS[k].label, color: "hsl(var(--clinical))",
          }))}
          selected={selectedBlock}
          onSelect={setSelectedBlock}
        />
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-muted-foreground pt-1 border-t border-border">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block w-4 border-t-2" style={{ borderColor: palette }} /> Nerve course
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded" style={{ background: withAlpha(palette, 0.18), border: `1px dashed ${palette}` }} /> Sensory zone
        </span>
        <span>Posterior dashed lines = nerves seen mostly on posterior view (median, ulnar shown for orientation only).</span>
      </div>
    </PlexusCard>
  );
};

export default UpperLimbBranchesDiagram;
