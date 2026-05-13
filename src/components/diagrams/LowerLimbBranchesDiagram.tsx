import { useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { PlexusCard, PlexusChipRow, PlexusDetailPanel, ROOT_COLORS } from "./plexusShared";
import { withAlpha } from "@/lib/color-utils";

/* =========================================================================
   Lower-limb peripheral nerve branches + block coverage.
   Mirrors UpperLimbBranchesDiagram — anterior + posterior leg outlines
   with two modes: "branches" (one nerve at a time) and "blocks"
   (which nerves a regional block covers / misses).
   ========================================================================= */

type Mode = "branches" | "blocks";
type NerveKey =
  | "femoral"
  | "saphenous"
  | "obturator"
  | "lcnt"
  | "sciatic"
  | "tibial"
  | "commonperoneal"
  | "sural";

interface NerveData {
  label: string;
  short: string;
  roots: string;
  pathAnt: string;
  pathPost: string;
  patchAnt?: string;
  patchPost?: string;
  labelAnt?: [number, number, "start" | "middle" | "end"];
  labelPost?: [number, number, "start" | "middle" | "end"];
  motor: string;
  sensory: string;
  injury: string;
}

const NERVES: Record<NerveKey, NerveData> = {
  femoral: {
    label: "Femoral",
    short: "Femoral",
    roots: "L2, L3, L4",
    pathAnt: "M88,28 C90,60 96,90 100,118 C102,140 100,158 96,178",
    pathPost: "",
    patchAnt: "M70,90 Q72,150 80,200 L108,200 Q108,150 102,90 Z",
    labelAnt: [104, 110, "start"],
    motor: "Quadriceps femoris (knee extension), sartorius, pectineus, iliacus",
    sensory: "Anterior thigh; via saphenous branch — medial leg/ankle/foot",
    injury: "Hip replacement, retractor injury, psoas haematoma. Loss of knee extension + absent knee jerk.",
  },
  saphenous: {
    label: "Saphenous",
    short: "Saphenous",
    roots: "L3, L4 (terminal sensory branch of femoral)",
    pathAnt: "M96,180 C100,220 104,250 108,280 C110,310 110,330 110,350",
    pathPost: "",
    patchAnt: "M104,250 Q108,310 112,348 L122,348 Q120,310 116,250 Z",
    labelAnt: [124, 285, "start"],
    motor: "None — pure sensory (terminal branch of femoral)",
    sensory: "Medial leg below knee, medial malleolus, medial foot to base of great toe",
    injury: "Adductor canal block target — motor-sparing knee analgesia. Vulnerable in saphenous vein harvest for CABG.",
  },
  obturator: {
    label: "Obturator",
    short: "Obturator",
    roots: "L2, L3, L4",
    pathAnt: "M82,28 C78,55 74,80 76,108 C80,135 90,155 100,168",
    pathPost: "",
    patchAnt: "M82,140 Q86,170 96,190 L116,190 Q112,170 108,140 Z",
    labelAnt: [70, 100, "end"],
    motor: "Adductor longus / brevis / magnus, gracilis, obturator externus (hip adduction)",
    sensory: "Small patch of medial thigh (variable, often clinically silent)",
    injury: "TURBT 'obturator kick' (electrical stimulation → adductor jerk → bladder perforation). Often missed by femoral block.",
  },
  lcnt: {
    label: "Lateral cutaneous of thigh",
    short: "LCNT",
    roots: "L2, L3",
    pathAnt: "M62,30 C58,55 56,80 58,108 C62,135 68,155 72,170",
    pathPost: "",
    patchAnt: "M40,80 Q40,150 50,210 L72,210 Q70,150 66,80 Z",
    labelAnt: [38, 70, "end"],
    motor: "None — pure sensory",
    sensory: "Lateral thigh from greater trochanter to knee",
    injury: "Meralgia paraesthetica — entrapment under inguinal ligament (tight belts, obesity, pregnancy). Burning lateral thigh.",
  },
  sciatic: {
    label: "Sciatic",
    short: "Sciatic",
    roots: "L4, L5, S1, S2, S3",
    pathAnt: "",
    pathPost: "M85,30 C82,60 84,90 88,120 C92,150 96,180 100,210",
    patchPost: "M68,170 Q68,220 80,260 L120,260 Q118,220 110,170 Z",
    labelPost: [70, 80, "end"],
    motor: "Hamstrings (semitendinosus, semimembranosus, biceps femoris) + ALL muscles below knee via tibial / common peroneal divisions",
    sensory: "Posterior thigh; via tibial + common peroneal — almost all of leg and foot below knee",
    injury: "IM gluteal injection (avoid — use upper outer quadrant). Posterior hip dislocation. Piriformis syndrome.",
  },
  tibial: {
    label: "Tibial",
    short: "Tibial",
    roots: "L4–S3 (medial division of sciatic)",
    pathAnt: "",
    pathPost: "M100,210 C102,240 104,270 106,300 C108,325 110,345 112,355",
    patchPost: "M88,260 Q92,320 102,355 L130,355 Q124,320 116,260 Z",
    labelPost: [82, 285, "end"],
    motor: "Gastrocnemius, soleus, tibialis posterior, FDL, FHL, intrinsic foot muscles (via medial + lateral plantar nerves)",
    sensory: "Sole of foot (medial + lateral plantar branches) — heel and toes",
    injury: "Tarsal tunnel syndrome (medial malleolus). Loss of plantarflexion / inversion. Loss of ankle jerk.",
  },
  commonperoneal: {
    label: "Common peroneal",
    short: "Common peroneal",
    roots: "L4–S2 (lateral division of sciatic)",
    pathAnt: "M112,200 C118,225 124,250 130,275 C134,295 138,315 140,335",
    pathPost: "M100,210 C108,235 116,260 124,285 C130,305 134,325 136,345",
    patchAnt: "M125,280 Q130,330 140,355 L156,355 Q150,330 144,280 Z",
    patchPost: "M120,300 Q126,340 138,358 L154,358 Q146,330 138,300 Z",
    labelAnt: [144, 250, "start"],
    labelPost: [142, 270, "start"],
    motor: "Tibialis anterior, EHL, EDL, peronei (dorsiflexion, eversion). Splits into deep + superficial peroneal.",
    sensory: "Lateral leg + dorsum of foot (deep peroneal: 1st web space; superficial peroneal: rest of dorsum)",
    injury: "Wraps around fibular neck — vulnerable to lithotomy / leg cross / plaster casts. → FOOT DROP + sensory loss dorsum.",
  },
  sural: {
    label: "Sural",
    short: "Sural",
    roots: "S1, S2 (tibial + common peroneal contributions)",
    pathAnt: "",
    pathPost: "M108,260 C116,290 122,320 130,350",
    patchPost: "M118,310 Q126,345 138,358 L150,358 Q142,335 132,310 Z",
    labelPost: [128, 305, "start"],
    motor: "None — pure sensory",
    sensory: "Lateral aspect of foot and lateral malleolus, posterolateral lower leg",
    injury: "Used as donor for nerve grafts (long, expendable, pure sensory). Component of ankle block.",
  },
};

const NERVE_COLOR: Record<NerveKey, string> = {
  femoral: ROOT_COLORS.L3,
  saphenous: ROOT_COLORS.L4,
  obturator: ROOT_COLORS.L2,
  lcnt: ROOT_COLORS.L1,
  sciatic: ROOT_COLORS.S1,
  tibial: ROOT_COLORS.S2,
  commonperoneal: ROOT_COLORS.L5,
  sural: ROOT_COLORS.S3,
};

type BlockKey =
  | "femoral"
  | "adductor"
  | "fasciailiaca"
  | "lumbarplexus"
  | "popliteal"
  | "ankle";

interface BlockData {
  label: string;
  level: string;
  covers: NerveKey[];
  misses: NerveKey[];
  technique: string;
  pearls: string;
}

const BLOCKS: Record<BlockKey, BlockData> = {
  femoral: {
    label: "Femoral nerve block",
    level: "Femoral nerve in groin, lateral to femoral artery, below inguinal ligament",
    covers: ["femoral", "saphenous"],
    misses: ["obturator", "lcnt", "sciatic", "tibial", "commonperoneal", "sural"],
    technique: "US-guided, in-plane lateral-to-medial. Needle below fascia iliaca, lateral to artery. 15–20 ml LA.",
    pearls: "Quadriceps weakness → fall risk. Largely replaced by adductor canal block for knee surgery (motor-sparing).",
  },
  adductor: {
    label: "Adductor canal block",
    level: "Saphenous nerve in subsartorial canal, mid-thigh",
    covers: ["saphenous"],
    misses: ["femoral", "obturator", "lcnt", "sciatic", "tibial", "commonperoneal", "sural"],
    technique: "US in mid-thigh, sartorius muscle as roof of canal. Femoral artery beneath. 10–15 ml LA around artery.",
    pearls: "Motor-sparing — preserves quadriceps for early ambulation. Standard for TKR analgesia. Combine with iPACK for posterior knee coverage.",
  },
  fasciailiaca: {
    label: "Fascia iliaca block",
    level: "Beneath fascia iliaca, below inguinal ligament — covers femoral + LCNT (± obturator)",
    covers: ["femoral", "saphenous", "lcnt"],
    misses: ["obturator", "sciatic", "tibial", "commonperoneal", "sural"],
    technique: "US or landmark, 1cm below junction of lateral 1/3 and medial 2/3 of inguinal ligament. 30–40 ml LA volume block.",
    pearls: "Standard early analgesia for hip fracture (NICE / NHFD). Easy, opioid-sparing. Obturator coverage variable.",
  },
  lumbarplexus: {
    label: "Lumbar plexus (psoas compartment)",
    level: "Lumbar plexus posteriorly within psoas major",
    covers: ["femoral", "saphenous", "obturator", "lcnt"],
    misses: ["sciatic", "tibial", "commonperoneal", "sural"],
    technique: "Posterior approach (Chayen / Capdevila), patient lateral, needle 4cm lateral to L4 spinous process. Deep block — high LA volume risk.",
    pearls: "Covers entire lumbar plexus in one shot. Risks: epidural spread, retroperitoneal haematoma, intravascular injection. Now usually replaced by superficial blocks.",
  },
  popliteal: {
    label: "Popliteal sciatic block",
    level: "Sciatic nerve in popliteal fossa, before division into tibial + common peroneal",
    covers: ["sciatic", "tibial", "commonperoneal", "sural"],
    misses: ["femoral", "saphenous", "obturator", "lcnt"],
    technique: "US, prone or supine with leg elevated. Inject just proximal to bifurcation (better spread to both divisions). 20–30 ml LA.",
    pearls: "Workhorse for foot/ankle surgery. Combine with saphenous (adductor canal) for complete below-knee anaesthesia. Foot drop expected post-block — counsel patient.",
  },
  ankle: {
    label: "Ankle block (5 nerves)",
    level: "5 distal nerves at the ankle",
    covers: ["tibial", "saphenous", "sural", "commonperoneal"],
    misses: ["femoral", "obturator", "lcnt", "sciatic"],
    technique: "Posterior tibial (behind medial malleolus), deep peroneal (lateral to EHL tendon), superficial peroneal + saphenous + sural (subcutaneous ring at ankle).",
    pearls: "Avoid adrenaline (digital ischaemia). Slow onset (15–20 min). Useful when proximal block contraindicated. 3–5 ml per nerve.",
  },
};

const LowerLimbBranchesDiagram = () => {
  const [mode, setMode] = useState<Mode>("branches");
  const [selectedNerve, setSelectedNerve] = useState<NerveKey>("femoral");
  const [selectedBlock, setSelectedBlock] = useState<BlockKey>("femoral");
  const [showLabels, setShowLabels] = useState(true);

  const activeNerves: Set<NerveKey> =
    mode === "branches"
      ? new Set([selectedNerve])
      : new Set(BLOCKS[selectedBlock].covers);

  const palette = mode === "branches" ? NERVE_COLOR[selectedNerve] : "hsl(var(--clinical))";

  const renderLimb = (view: "ant" | "post") => (
    <svg viewBox="0 0 200 380" className="w-full max-w-[210px]" role="img"
      aria-label={`${view === "ant" ? "Anterior" : "Posterior"} lower limb nerve diagram`}>
      <defs>
        <radialGradient id={`llb-${view}-skin`} cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.35" />
          <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.08" />
        </radialGradient>
      </defs>

      {/* Limb outline (pelvis brim → thigh → knee → calf → foot) */}
      <path d="M50,22 Q50,12 100,12 Q150,12 150,22 L155,80 Q150,140 140,200 L132,260 L130,320 Q132,346 145,358 L130,365 L122,355 L112,330 L108,285 L100,235 L92,285 L88,330 L78,355 L70,365 L55,358 Q68,346 70,320 L68,260 L60,200 Q50,140 45,80 Z"
        fill={`url(#llb-${view}-skin)`} stroke="hsl(var(--border))" strokeWidth="1" />

      {view === "post" && (
        <line x1="100" y1="14" x2="100" y2="80" stroke="hsl(var(--muted-foreground))"
          strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
      )}

      {/* Cutaneous patches (translucent + dotted boundary) */}
      {(Object.keys(NERVES) as NerveKey[]).map((k) => {
        const n = NERVES[k];
        const patch = view === "ant" ? n.patchAnt : n.patchPost;
        if (!patch || !activeNerves.has(k)) return null;
        const c = mode === "branches" ? NERVE_COLOR[k] : palette;
        return (
          <path key={`patch-${k}`} d={patch} fill={c} fillOpacity="0.32"
            stroke={c} strokeWidth="0.5" strokeDasharray="1.5 2" />
        );
      })}

      {/* Nerve courses */}
      {(Object.keys(NERVES) as NerveKey[]).map((k) => {
        const n = NERVES[k];
        const path = view === "ant" ? n.pathAnt : n.pathPost;
        if (!path) return null;
        const isActive = activeNerves.has(k);
        const c = mode === "branches" ? NERVE_COLOR[k] : palette;
        const labelPos = view === "ant" ? n.labelAnt : n.labelPost;
        return (
          <g key={`nerve-${k}`}>
            <path d={path} stroke={c} strokeWidth={isActive ? 2.2 : 1}
              fill="none" opacity={isActive ? 1 : 0.18} strokeLinecap="round" />
            {showLabels && labelPos && (
              <text x={labelPos[0]} y={labelPos[1]} textAnchor={labelPos[2]}
                fontSize={isActive ? 6 : 5}
                fill={c} fontWeight={isActive ? 700 : 500}
                opacity={isActive ? 1 : 0.55}
                style={{ paintOrder: "stroke" }}
                stroke="hsl(var(--background))" strokeWidth="0.5">
                {n.short}
              </text>
            )}
          </g>
        );
      })}

      {/* Surface anatomy overlay — bony landmarks ON TOP */}
      <g fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.75" opacity="0.55" strokeLinecap="round">
        {view === "ant" ? (
          <>
            {/* Iliac crest + ASIS */}
            <path d="M 52 30 Q 100 22 148 30" />
            <circle cx="60" cy="38" r="1.6" fill="hsl(var(--foreground))" opacity="0.6" />
            <circle cx="140" cy="38" r="1.6" fill="hsl(var(--foreground))" opacity="0.6" />
            {/* Inguinal ligament hint */}
            <path d="M 60 38 Q 100 58 140 38" strokeDasharray="2 2" />
            {/* Pubic symphysis */}
            <circle cx="100" cy="62" r="1.3" fill="hsl(var(--foreground))" opacity="0.6" />
            {/* Patellae */}
            <ellipse cx="92" cy="222" rx="7" ry="9" />
            <ellipse cx="108" cy="222" rx="7" ry="9" />
            {/* Tibial tuberosity */}
            <circle cx="92" cy="240" r="1.2" fill="hsl(var(--foreground))" opacity="0.6" />
            <circle cx="108" cy="240" r="1.2" fill="hsl(var(--foreground))" opacity="0.6" />
            {/* Medial + lateral malleoli */}
            <circle cx="80" cy="350" r="1.5" fill="hsl(var(--foreground))" opacity="0.6" />
            <circle cx="88" cy="352" r="1.2" fill="hsl(var(--foreground))" opacity="0.5" />
            <circle cx="112" cy="352" r="1.2" fill="hsl(var(--foreground))" opacity="0.5" />
            <circle cx="120" cy="350" r="1.5" fill="hsl(var(--foreground))" opacity="0.6" />
          </>
        ) : (
          <>
            {/* PSIS dimples + iliac crest */}
            <path d="M 52 30 Q 100 22 148 30" />
            <circle cx="86" cy="40" r="1.4" fill="hsl(var(--foreground))" opacity="0.6" />
            <circle cx="114" cy="40" r="1.4" fill="hsl(var(--foreground))" opacity="0.6" />
            {/* Sacrum midline */}
            <line x1="100" y1="32" x2="100" y2="80" strokeDasharray="2 2" />
            {/* Gluteal fold */}
            <path d="M 60 130 Q 100 142 140 130" strokeDasharray="2 2" />
            {/* Popliteal crease */}
            <path d="M 78 232 Q 92 238 106 232" strokeDasharray="2 2" />
            <path d="M 96 232 Q 110 238 124 232" strokeDasharray="2 2" />
            {/* Achilles + heel */}
            <path d="M 86 340 L 90 360" />
            <path d="M 114 340 L 110 360" />
          </>
        )}
      </g>

      {/* View label */}
      <text x="100" y="14" textAnchor="middle" fontSize="7"
        fill="hsl(var(--muted-foreground))" fontWeight="600" opacity="0.6">
        {view === "ant" ? "ANTERIOR" : "POSTERIOR"}
      </text>

      {/* Anatomical landmarks */}
      {showLabels && view === "ant" && (
        <>
          <text x="100" y="220" textAnchor="middle" fontSize="5"
            fill="hsl(var(--muted-foreground))" opacity="0.45">knee</text>
          <text x="100" y="362" textAnchor="middle" fontSize="5"
            fill="hsl(var(--muted-foreground))" opacity="0.45">ankle</text>
        </>
      )}
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
        title="Lower-limb nerve branches & block coverage"
        subtitle={mode === "branches"
          ? "Select a nerve to trace its course and see motor / sensory / clinical pearls."
          : "Select a regional block — covered nerves and their sensory zones light up; missed nerves are listed."}
        toggles={[
          { label: "Labels", active: showLabels, onChange: () => setShowLabels((v) => !v) },
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
        <PlexusChipRow<NerveKey>
          items={(Object.keys(NERVES) as NerveKey[]).map((k) => ({
            key: k, label: NERVES[k].label, color: NERVE_COLOR[k],
          }))}
          selected={selectedNerve}
          onSelect={setSelectedNerve}
        />
      ) : (
        <PlexusChipRow<BlockKey>
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
        <span>Lumbar-plexus nerves shown anteriorly; sciatic + sural shown posteriorly.</span>
      </div>
    </PlexusCard>
  );
};

export default LowerLimbBranchesDiagram;
