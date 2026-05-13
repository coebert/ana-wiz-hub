import { useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { PlexusChipRow, PlexusDetailPanel, ROOT_COLORS } from "./plexusShared";

type NerveKey = "femoral" | "obturator" | "lcnt" | "sciatic" | "tibial" | "peroneal" | "pudendal";

interface NerveInfo {
  label: string;
  color: string;
  roots: string;
  plexus: "lumbar" | "sacral";
  motor: string;
  sensory: string;
  block: string;
  clinical: string;
}

const nerves: Record<NerveKey, NerveInfo> = {
  femoral: {
    label: "Femoral Nerve",
    color: "hsl(210, 55%, 55%)",
    roots: "L2, L3, L4",
    plexus: "lumbar",
    motor: "Quadriceps (knee extension), sartorius, iliacus, pectineus",
    sensory: "Anterior thigh; medial leg & foot via saphenous branch (terminal sensory branch — longest sensory nerve)",
    block: "Below inguinal ligament, lateral to femoral artery (VAN). Fascia iliaca block for broader coverage.",
    clinical: "Femoral neuropathy from lithotomy position, retractors in pelvic surgery, or psoas haematoma (anticoagulation).",
  },
  obturator: {
    label: "Obturator Nerve",
    color: "hsl(270, 45%, 55%)",
    roots: "L2, L3, L4",
    plexus: "lumbar",
    motor: "Adductors (gracilis, adductor longus/brevis/magnus), obturator externus",
    sensory: "Variable — medial thigh (often missed clinically). Hip joint articular branch.",
    block: "Obturator canal approach (US-guided). Important adjunct to femoral block for knee surgery to prevent adductor spasm during TURBT.",
    clinical: "Obturator reflex during TURBT (bladder wall stimulation → leg adduction). Incomplete knee analgesia if missed with femoral-only block.",
  },
  lcnt: {
    label: "Lateral Cutaneous Nerve of Thigh",
    color: "hsl(45, 65%, 50%)",
    roots: "L2, L3",
    plexus: "lumbar",
    motor: "None — pure sensory nerve",
    sensory: "Lateral thigh from greater trochanter to knee",
    block: "Blocked as part of fascia iliaca block. Dedicated block below ASIS medial to inguinal ligament.",
    clinical: "Meralgia paraesthetica — entrapment under inguinal ligament near ASIS. Causes burning lateral thigh pain. Common in obesity, pregnancy, tight clothing.",
  },
  sciatic: {
    label: "Sciatic Nerve",
    color: "hsl(0, 50%, 52%)",
    roots: "L4, L5, S1, S2, S3",
    plexus: "sacral",
    motor: "Hamstrings (knee flexion), ALL muscles below knee (via tibial & common peroneal divisions)",
    sensory: "Posterior thigh (via posterior cutaneous n.), all below knee except medial leg/foot (saphenous)",
    block: "Subgluteal, anterior, or popliteal approach. Popliteal block at sciatic bifurcation for below-knee surgery.",
    clinical: "Largest nerve in body. Two components wrapped in common sheath: tibial (anterior divisions) + common peroneal (posterior divisions). Piriformis syndrome — entrapment below piriformis.",
  },
  tibial: {
    label: "Tibial Nerve",
    color: "hsl(160, 45%, 45%)",
    roots: "L4, L5, S1, S2, S3",
    plexus: "sacral",
    motor: "Posterior compartment: gastrocnemius, soleus (plantarflexion), tibialis posterior (inversion), toe flexors. Intrinsic foot muscles (medial & lateral plantar nn.)",
    sensory: "Sole of foot (medial & lateral plantar nerves). Heel (medial calcaneal branch).",
    block: "Behind medial malleolus at ankle. Popliteal block proximal to bifurcation.",
    clinical: "Tarsal tunnel syndrome — compression behind medial malleolus. Sural nerve (tibial + peroneal contribution) supplies lateral foot/ankle.",
  },
  peroneal: {
    label: "Common Peroneal (Fibular) Nerve",
    color: "hsl(30, 60%, 52%)",
    roots: "L4, L5, S1, S2",
    plexus: "sacral",
    motor: "Deep peroneal: anterior compartment (tibialis anterior — dorsiflexion, toe extensors). Superficial peroneal: lateral compartment (peroneus longus/brevis — eversion).",
    sensory: "Deep peroneal: 1st web space. Superficial peroneal: dorsum of foot. Sural nerve (lateral foot).",
    block: "At fibular head/neck level. Included in popliteal sciatic block.",
    clinical: "Most commonly injured nerve in lower limb. Wraps around fibular neck — vulnerable to compression (plaster casts, leg crossing, lithotomy). Foot drop = tibialis anterior weakness.",
  },
  pudendal: {
    label: "Pudendal Nerve",
    color: "hsl(320, 40%, 50%)",
    roots: "S2, S3, S4",
    plexus: "sacral",
    motor: "External anal sphincter, external urethral sphincter, perineal muscles (bulbospongiosus, ischiocavernosus)",
    sensory: "Perineum, external genitalia (dorsal nerve of penis/clitoris), perianal skin",
    block: "Pudendal nerve block at ischial spine (transvaginal or transperineal). Used for perineal repair, forceps delivery.",
    clinical: "Passes through greater sciatic foramen, hooks around ischial spine, enters perineum through lesser sciatic foramen via pudendal (Alcock's) canal. S2,3,4 keeps the pelvic floor off the floor.",
  },
};

const nerveKeys: NerveKey[] = ["femoral", "obturator", "lcnt", "sciatic", "tibial", "peroneal", "pudendal"];

const LumbosacralPlexusDiagram = () => {
  const [selected, setSelected] = useState<NerveKey>("femoral");
  const [showSutures, setShowSutures] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const info = nerves[selected];

  const spineX = 55;
  const rootY: Record<string, number> = {
    L1: 30, L2: 55, L3: 80, L4: 105, L5: 130, S1: 160, S2: 182, S3: 204, S4: 222,
  };

  const lumbarRoots = ["L1", "L2", "L3", "L4", "L5"];
  const sacralRoots = ["S1", "S2", "S3", "S4"];
  const allRoots = [...lumbarRoots, ...sacralRoots];

  // Convergence points
  const lumbarTrunkX = 140;
  const sacralTrunkX = 140;

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          title="Lumbosacral plexus (L1–S4)"
          subtitle="Tap a nerve to see its roots, distribution, block techniques and clinical relevance"
          toggles={[
            { label: "Sutures", active: showSutures, onChange: () => setShowSutures((s) => !s) },
            { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
          ]}
        />

        <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox="0 5 350 250" className="w-full max-w-[380px]" role="img" aria-label="Lumbosacral plexus showing roots L1 to S4 and major branches">
            <defs>
              <radialGradient id="lsp-bgShade" cx="50%" cy="50%" r="65%">
                <stop offset="0%" stopColor="hsl(var(--anatomy))" stopOpacity="0.15" />
                <stop offset="100%" stopColor="hsl(var(--anatomy))" stopOpacity="0.03" />
              </radialGradient>
              <pattern id="lsp-tissue" patternUnits="userSpaceOnUse" width="6" height="6">
                <circle cx="1" cy="1" r="0.4" fill="hsl(var(--muted-foreground))" opacity="0.18" />
              </pattern>
              <filter id="lsp-shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
                <feOffset dx="0" dy="1.2" result="off" />
                <feComponentTransfer><feFuncA type="linear" slope="0.26" /></feComponentTransfer>
                <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            <rect x="0" y="5" width="350" height="250" rx="10" fill="url(#lsp-bgShade)" stroke="hsl(var(--border))" strokeWidth="0.5" />
            {showSutures && <rect x="0" y="5" width="350" height="250" rx="10" fill="url(#lsp-tissue)" pointerEvents="none" />}
            {/* ─── Vertebral bodies ─── */}
            <g>
              {allRoots.map((level) => {
                const isSacral = level.startsWith("S");
                return (
                  <g key={level}>
                    <rect x={spineX - 12} y={rootY[level] - 9} width={isSacral ? 24 : 26} height={isSacral ? 18 : 20}
                      rx="3" fill="hsl(var(--muted))" stroke={ROOT_COLORS[level]} strokeWidth="1" />
                    <text x={spineX} y={rootY[level] + 4} fontSize="8" fill={ROOT_COLORS[level]}
                      textAnchor="middle" fontWeight="700">{level}</text>
                  </g>
                );
              })}
              {/* Spinal cord / conus */}
              <rect x={spineX - 4} y={20} width="8" height="100" rx="3"
                fill="hsl(var(--muted))" opacity="0.3" />
              {/* Cauda equina */}
              <path d={`M${spineX},120 C${spineX - 2},140 ${spineX - 3},160 ${spineX - 2},180 C${spineX},200 ${spineX + 1},215 ${spineX},230`}
                stroke="hsl(var(--muted-foreground))" strokeWidth="2" fill="none" opacity="0.15" />
            </g>

            {/* ─── Ventral rami lines ─── */}
            {allRoots.map((level) => (
              <line key={level} x1={spineX + 14} y1={rootY[level]} x2={spineX + 35} y2={rootY[level]}
                stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.2" />
            ))}

            {/* ─── Plexus labels ─── */}
            <text x={lumbarTrunkX} y="20" fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.4"
              textAnchor="middle" fontWeight="600">LUMBAR PLEXUS</text>
            <text x={sacralTrunkX} y="150" fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.4"
              textAnchor="middle" fontWeight="600">SACRAL PLEXUS</text>

            {/* Psoas major outline (lumbar plexus within) */}
            <path d="M90,25 C105,25 115,40 118,60 C120,80 118,100 115,120 C112,130 105,135 95,130 C88,125 85,110 86,90 C87,70 88,45 90,25 Z"
              fill="hsl(var(--muted))" fillOpacity="0.08" stroke="hsl(var(--border))" strokeWidth="0.5"
              strokeDasharray="4 2" />
            <text x="100" y="78" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.3"
              textAnchor="middle" transform="rotate(-8,100,78)">Psoas</text>

            {/* ═══ FEMORAL NERVE ═══ */}
            <g opacity={selected === "femoral" ? 1 : 0.2} className="cursor-pointer transition-opacity duration-200"
              onClick={() => setSelected("femoral")}>
              <path d={`M${spineX + 35},${rootY.L2} C110,55 120,65 125,75`} stroke={nerves.femoral.color} strokeWidth="1.5" fill="none" />
              <path d={`M${spineX + 35},${rootY.L3} C110,80 120,78 125,75`} stroke={nerves.femoral.color} strokeWidth="1.5" fill="none" />
              <path d={`M${spineX + 35},${rootY.L4} C110,105 120,90 125,75`} stroke={nerves.femoral.color} strokeWidth="1.5" fill="none" />
              {/* Main trunk descending */}
              <path d="M125,75 C130,90 135,110 140,130 C145,150 150,170 155,190 L158,210"
                stroke={nerves.femoral.color} strokeWidth="2" fill="none" />
              {/* Inguinal ligament crossing */}
              {selected === "femoral" && <>
                <line x1="120" y1="135" x2="175" y2="128" stroke="hsl(var(--foreground))" strokeWidth="0.75" opacity="0.2" strokeDasharray="3 2" />
                <text x="176" y="127" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.4">Inguinal lig.</text>
                <text x="160" y="205" fontSize="6" fill={nerves.femoral.color} fontWeight="600">Femoral n.</text>
                {/* Saphenous branch */}
                <path d="M155,190 C160,200 165,215 170,235" stroke={nerves.femoral.color}
                  strokeWidth="1" fill="none" strokeDasharray="3 1.5" opacity="0.6" />
                <text x="172" y="232" fontSize="4.5" fill={nerves.femoral.color} opacity="0.6">Saphenous</text>
              </>}
            </g>

            {/* ═══ OBTURATOR NERVE ═══ */}
            <g opacity={selected === "obturator" ? 1 : 0.15} className="cursor-pointer transition-opacity duration-200"
              onClick={() => setSelected("obturator")}>
              <path d={`M${spineX + 35},${rootY.L2} C100,60 108,68 112,75`} stroke={nerves.obturator.color} strokeWidth="1" fill="none" />
              <path d={`M${spineX + 35},${rootY.L3} C100,82 108,80 112,75`} stroke={nerves.obturator.color} strokeWidth="1.5" fill="none" />
              <path d={`M${spineX + 35},${rootY.L4} C100,100 108,90 112,75`} stroke={nerves.obturator.color} strokeWidth="1" fill="none" />
              <path d="M112,75 C108,90 105,110 103,130 C100,150 98,170 97,190"
                stroke={nerves.obturator.color} strokeWidth="2" fill="none" />
              {selected === "obturator" && <>
                <text x="80" y="195" fontSize="6" fill={nerves.obturator.color} fontWeight="600">Obturator n.</text>
                <text x="85" y="145" fontSize="4.5" fill={nerves.obturator.color} opacity="0.5">Obt. foramen</text>
                <ellipse cx="102" cy="140" rx="6" ry="8" fill="none" stroke={nerves.obturator.color}
                  strokeWidth="0.75" opacity="0.4" />
              </>}
            </g>

            {/* ═══ LATERAL CUTANEOUS NERVE OF THIGH ═══ */}
            <g opacity={selected === "lcnt" ? 1 : 0.12} className="cursor-pointer transition-opacity duration-200"
              onClick={() => setSelected("lcnt")}>
              <path d={`M${spineX + 35},${rootY.L2} C115,50 130,48 140,50`} stroke={nerves.lcnt.color} strokeWidth="1.5" fill="none" />
              <path d={`M${spineX + 35},${rootY.L3} C115,72 130,60 140,50`} stroke={nerves.lcnt.color} strokeWidth="1" fill="none" />
              <path d="M140,50 C155,55 168,70 178,90 C188,110 195,140 200,170"
                stroke={nerves.lcnt.color} strokeWidth="2" fill="none" />
              {selected === "lcnt" && <>
                <text x="202" y="168" fontSize="5.5" fill={nerves.lcnt.color} fontWeight="500">LCNT</text>
                <text x="202" y="176" fontSize="4" fill={nerves.lcnt.color} opacity="0.6">(pure sensory)</text>
                <circle cx="170" cy="78" r="3" fill="none" stroke={nerves.lcnt.color} strokeWidth="1" opacity="0.5" />
                <text x="175" y="76" fontSize="4" fill={nerves.lcnt.color} opacity="0.5">ASIS</text>
              </>}
            </g>

            {/* ═══ SCIATIC NERVE ═══ */}
            <g opacity={selected === "sciatic" ? 1 : 0.2} className="cursor-pointer transition-opacity duration-200"
              onClick={() => setSelected("sciatic")}>
              {/* Roots L4-S3 converging */}
              <path d={`M${spineX + 35},${rootY.L4} C110,110 125,130 135,150`} stroke={nerves.sciatic.color} strokeWidth="1" fill="none" />
              <path d={`M${spineX + 35},${rootY.L5} C110,135 125,142 135,150`} stroke={nerves.sciatic.color} strokeWidth="1" fill="none" />
              <path d={`M${spineX + 35},${rootY.S1} C110,162 125,155 135,150`} stroke={nerves.sciatic.color} strokeWidth="1.5" fill="none" />
              <path d={`M${spineX + 35},${rootY.S2} C110,180 125,165 135,150`} stroke={nerves.sciatic.color} strokeWidth="1.5" fill="none" />
              <path d={`M${spineX + 35},${rootY.S3} C110,200 125,175 135,150`} stroke={nerves.sciatic.color} strokeWidth="1" fill="none" />
              {/* Main trunk — thick! */}
              <path d="M135,150 C140,165 145,185 148,200 C150,215 152,225 154,240"
                stroke={nerves.sciatic.color} strokeWidth="3" fill="none" />
              {selected === "sciatic" && <>
                <text x="156" y="175" fontSize="6" fill={nerves.sciatic.color} fontWeight="700">Sciatic n.</text>
                <text x="158" y="183" fontSize="4.5" fill={nerves.sciatic.color} opacity="0.5">(largest nerve)</text>
                {/* Piriformis */}
                <path d="M95,155 C110,148 130,145 145,148" stroke="hsl(var(--muted-foreground))"
                  strokeWidth="3" fill="none" opacity="0.1" />
                <text x="105" y="147" fontSize="4" fill="hsl(var(--muted-foreground))" opacity="0.35">Piriformis</text>
              </>}
            </g>

            {/* ═══ TIBIAL NERVE (division of sciatic) ═══ */}
            <g opacity={selected === "tibial" ? 1 : 0.12} className="cursor-pointer transition-opacity duration-200"
              onClick={() => setSelected("tibial")}>
              {/* Emerges from sciatic bifurcation */}
              <path d="M135,150 C140,165 145,185 148,200"
                stroke={nerves.tibial.color} strokeWidth="2" fill="none" opacity="0.4" />
              <path d="M148,200 C146,215 142,230 138,245"
                stroke={nerves.tibial.color} strokeWidth="2" fill="none" />
              {selected === "tibial" && <>
                <text x="115" y="242" fontSize="6" fill={nerves.tibial.color} fontWeight="600">Tibial n.</text>
                <text x="150" y="198" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.4">Popliteal fossa bifurc.</text>
                <circle cx="148" cy="200" r="3" fill="none" stroke={nerves.tibial.color} strokeWidth="1.5" />
              </>}
            </g>

            {/* ═══ COMMON PERONEAL NERVE ═══ */}
            <g opacity={selected === "peroneal" ? 1 : 0.12} className="cursor-pointer transition-opacity duration-200"
              onClick={() => setSelected("peroneal")}>
              <path d="M135,150 C140,165 145,185 148,200"
                stroke={nerves.peroneal.color} strokeWidth="2" fill="none" opacity="0.3" />
              <path d="M148,200 C155,212 162,225 170,240"
                stroke={nerves.peroneal.color} strokeWidth="2" fill="none" />
              {selected === "peroneal" && <>
                <text x="172" y="238" fontSize="5.5" fill={nerves.peroneal.color} fontWeight="600">Common peroneal</text>
                <text x="172" y="246" fontSize="4" fill={nerves.peroneal.color} opacity="0.6">→ fibular neck (vulnerable!)</text>
                <circle cx="148" cy="200" r="3" fill="none" stroke={nerves.peroneal.color} strokeWidth="1.5" />
              </>}
            </g>

            {/* ═══ PUDENDAL NERVE ═══ */}
            <g opacity={selected === "pudendal" ? 1 : 0.12} className="cursor-pointer transition-opacity duration-200"
              onClick={() => setSelected("pudendal")}>
              <path d={`M${spineX + 35},${rootY.S2} C100,185 110,195 115,200`} stroke={nerves.pudendal.color} strokeWidth="1" fill="none" />
              <path d={`M${spineX + 35},${rootY.S3} C100,205 110,205 115,200`} stroke={nerves.pudendal.color} strokeWidth="1" fill="none" />
              <path d={`M${spineX + 35},${rootY.S4} C100,220 110,210 115,200`} stroke={nerves.pudendal.color} strokeWidth="1" fill="none" />
              <path d="M115,200 C105,210 95,218 88,225 C82,230 80,235 82,240"
                stroke={nerves.pudendal.color} strokeWidth="2" fill="none" />
              {selected === "pudendal" && <>
                <text x="60" y="242" fontSize="5.5" fill={nerves.pudendal.color} fontWeight="600">Pudendal n.</text>
                <circle cx="88" cy="225" r="3" fill="none" stroke={nerves.pudendal.color} strokeWidth="1" opacity="0.5" />
                <text x="58" y="222" fontSize="4" fill={nerves.pudendal.color} opacity="0.5">Ischial spine</text>
              </>}
            </g>

            {/* ─── Lumbosacral trunk label ─── */}
            <path d={`M${spineX + 35},${rootY.L4} C95,115 105,125 ${spineX + 35},${rootY.L5}`}
              stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none" opacity="0.15" strokeDasharray="2 2" />
            <text x={spineX + 40} y={rootY.L4 + 15} fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.25">LS trunk</text>

            {/* Dividing line lumbar/sacral */}
            <line x1="30" y1="145" x2="200" y2="145" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3" strokeDasharray="4 4" />
          </svg>
        </div>

        <div className="flex-1 min-w-0 space-y-3">
          <PlexusDetailPanel
            reactKey={selected}
            title={info.label}
            roots={info.roots}
            region={info.plexus === "lumbar" ? "Lumbar" : "Sacral"}
            accent={info.color}
            fields={[
              { label: "Motor", value: info.motor },
              { label: "Sensory", value: info.sensory },
              { label: "Block", value: info.block },
              { label: "Clinical", value: info.clinical },
            ]}
          />

          <PlexusChipRow<NerveKey>
            selected={selected}
            onSelect={setSelected}
            items={nerveKeys.map((k) => ({
              key: k,
              color: nerves[k].color,
              label: nerves[k].label
                .replace("Nerve", "n.")
                .replace("Lateral Cutaneous n. of Thigh", "LCNT")
                .replace("Common Peroneal (Fibular) n.", "C. Peroneal"),
            }))}
          />
        </div>
      </div>
      </div>
    </div>
  );
};

export default LumbosacralPlexusDiagram;
