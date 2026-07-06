import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";
import bodyLineArt from "@/assets/dermatome-body-lineart.png";

type Region = {
  id: string;
  // SVG path defining the territory on a generic body silhouette
  path: string;
  view: "anterior" | "posterior";
  // Dermatome
  dermatome: string;
  dermatomeColor: string;
  // Peripheral nerve
  nerve: string;
  nerveColor: string;
  nerveOrigin: string;
  clinicalPearl: string;
};

// Coordinates designed for viewBox 0 0 600 700 (two body figures: anterior 30-280, posterior 320-570)
// Paths are hand-tuned curved outlines following anatomical contours of the
// underlying line-art figure (anterior centred ~x=155, posterior ~x=435).
// Regions are sized to sit INSIDE the body outline and to tile against their
// neighbours without overlapping.
const REGIONS: Region[] = [
  // ---------- HEAD / NECK (anterior) ----------
  {
    id: "v1",
    view: "anterior",
    // Forehead band, curved to the cranial vault
    path: "M 132 58 Q 155 44 178 58 Q 182 76 180 92 Q 155 96 130 92 Q 128 76 132 58 Z",
    dermatome: "V1 (ophthalmic, trigeminal — not a true dermatome but tested as one)",
    dermatomeColor: "hsl(0 70% 60%)",
    nerve: "Ophthalmic n. (V1)",
    nerveColor: "hsl(0 70% 55%)",
    nerveOrigin: "Trigeminal nerve (CN V), 1st division",
    clinicalPearl: "Forehead sensation. Spared in upper-motor-neurone facial palsy because V1 is sensory only.",
  },
  {
    id: "c2c3",
    view: "anterior",
    // Jaw / upper neck collar
    path: "M 132 96 Q 155 100 178 96 Q 184 114 178 130 Q 155 134 132 130 Q 126 114 132 96 Z",
    dermatome: "C2–C3",
    dermatomeColor: "hsl(15 75% 55%)",
    nerve: "Greater auricular & transverse cervical nn. (cervical plexus)",
    nerveColor: "hsl(15 75% 55%)",
    nerveOrigin: "Cervical plexus (C2–C3 ventral rami)",
    clinicalPearl: "Targets of superficial cervical plexus block for carotid endarterectomy.",
  },
  // ---------- UPPER LIMB ANTERIOR (viewer-left arm = patient's right) ----------
  {
    id: "c5",
    view: "anterior",
    // Lateral deltoid "regimental badge" — curved around the shoulder cap
    path: "M 82 168 Q 68 192 74 226 Q 86 232 100 228 Q 104 200 100 174 Q 90 166 82 168 Z",
    dermatome: "C5 (lateral arm — 'regimental badge')",
    dermatomeColor: "hsl(40 80% 55%)",
    nerve: "Axillary n. (upper lateral cutaneous n. of arm)",
    nerveColor: "hsl(40 80% 55%)",
    nerveOrigin: "Posterior cord, brachial plexus",
    clinicalPearl: "C5 dermatome ≈ axillary nerve cutaneous distribution. Tested after shoulder dislocation/surgery.",
  },
  {
    id: "c6",
    view: "anterior",
    // Lateral upper arm tapering down lateral forearm to thumb side
    path: "M 74 228 Q 60 262 52 304 Q 70 308 86 304 Q 96 270 100 230 Q 86 234 74 228 Z",
    dermatome: "C6 (lateral forearm + thumb)",
    dermatomeColor: "hsl(60 75% 50%)",
    nerve: "Lateral cutaneous n. of forearm (= musculocutaneous terminal branch) + median n. (thumb)",
    nerveColor: "hsl(60 75% 50%)",
    nerveOrigin: "Lateral cord (musculocutaneous & median)",
    clinicalPearl: "MUSCULOCUTANEOUS supplies LATERAL forearm skin — often missed by axillary block (block at level of cords/branches).",
  },
  {
    id: "c7",
    view: "anterior",
    // Distal forearm / palmar surface tapering toward middle finger
    path: "M 52 306 Q 44 328 42 354 Q 58 360 76 356 Q 84 332 86 306 Q 68 310 52 306 Z",
    dermatome: "C7 (middle finger)",
    dermatomeColor: "hsl(120 50% 45%)",
    nerve: "Median n. (radial 3.5 fingers, palmar)",
    nerveColor: "hsl(120 50% 45%)",
    nerveOrigin: "Lateral + medial cords (C6–T1)",
    clinicalPearl: "C7 dermatome ≈ middle finger only. MEDIAN nerve covers a much wider palmar territory (thumb, index, middle, radial half ring + corresponding palm).",
  },
  {
    id: "c8",
    view: "anterior",
    // Medial hand / little-finger side — small rounded territory
    path: "M 42 356 Q 38 376 42 398 Q 58 404 76 400 Q 80 378 76 356 Q 58 360 42 356 Z",
    dermatome: "C8 (little finger + medial hand)",
    dermatomeColor: "hsl(180 60% 45%)",
    nerve: "Ulnar n. (medial 1.5 fingers + medial hand)",
    nerveColor: "hsl(180 60% 45%)",
    nerveOrigin: "Medial cord (C8–T1)",
    clinicalPearl: "C8 dermatome and ULNAR nerve overlap on the little finger but DIVERGE proximally — ulnar territory stops at the wrist crease, C8 dermatome continues up the medial forearm.",
  },
  {
    id: "t1",
    view: "anterior",
    // Medial upper arm strip (between c5 lateral arm and the trunk)
    path: "M 102 232 Q 96 260 100 310 Q 112 320 118 308 Q 120 270 118 234 Q 110 230 102 232 Z",
    dermatome: "T1 (medial forearm + medial arm)",
    dermatomeColor: "hsl(195 70% 50%)",
    nerve: "Medial cutaneous n. of forearm (T1) + medial cutaneous n. of arm (T1, via intercostobrachial)",
    nerveColor: "hsl(195 70% 50%)",
    nerveOrigin: "Medial cord; intercostobrachial = T2 lateral cutaneous branch",
    clinicalPearl: "INTERCOSTOBRACHIAL N. (T2) supplies medial upper arm — NOT blocked by interscalene/supraclavicular approaches. Must be blocked separately for tourniquet pain.",
  },
  // ---------- THORAX & ABDOMEN (anterior trunk bands) ----------
  {
    id: "t4",
    view: "anterior",
    // Nipple-line band — slight chest curve
    path: "M 122 170 Q 155 164 192 170 Q 196 188 192 206 Q 155 210 122 206 Q 118 188 122 170 Z",
    dermatome: "T4 (nipple line)",
    dermatomeColor: "hsl(220 65% 55%)",
    nerve: "Anterior + lateral cutaneous branches of T4 intercostal n.",
    nerveColor: "hsl(220 65% 55%)",
    nerveOrigin: "T4 ventral ramus",
    clinicalPearl: "Sensory level for thoracic surgery; T4 = nipple. Spinal block must reach T4 for upper-abdominal surgery.",
  },
  {
    id: "t10",
    view: "anterior",
    // Umbilical band — waist curves inward
    path: "M 124 228 Q 155 224 188 228 Q 192 244 188 264 Q 155 268 124 264 Q 120 244 124 228 Z",
    dermatome: "T10 (umbilicus)",
    dermatomeColor: "hsl(245 60% 55%)",
    nerve: "Anterior + lateral cutaneous branches of T10 intercostal n.",
    nerveColor: "hsl(245 60% 55%)",
    nerveOrigin: "T10 ventral ramus",
    clinicalPearl: "T10 = umbilicus. Required block height for LSCS (relieves visceral peritoneal traction).",
  },
  {
    id: "l1",
    view: "anterior",
    // Inguinal crease band — widens slightly for pelvis
    path: "M 122 282 Q 155 278 190 282 Q 194 296 190 312 Q 155 316 122 312 Q 118 296 122 282 Z",
    dermatome: "L1 (inguinal crease)",
    dermatomeColor: "hsl(280 60% 55%)",
    nerve: "Iliohypogastric + ilioinguinal nn.",
    nerveColor: "hsl(280 60% 55%)",
    nerveOrigin: "Lumbar plexus (L1, ± T12)",
    clinicalPearl: "Targets of TAP/ilioinguinal blocks for inguinal hernia. L1 dermatome = roughly the inguinal ligament line.",
  },
  // ---------- LOWER LIMB ANTERIOR ----------
  {
    id: "l2l3-lcnt",
    view: "anterior",
    // Anterolateral thigh — lateral half of patient's right thigh (viewer left)
    path: "M 100 360 Q 92 400 98 442 Q 118 446 138 442 Q 142 400 138 360 Q 118 356 100 360 Z",
    dermatome: "L2–L3 (anterolateral thigh)",
    dermatomeColor: "hsl(310 60% 55%)",
    nerve: "Lateral cutaneous n. of thigh (LCNT)",
    nerveColor: "hsl(310 60% 55%)",
    nerveOrigin: "Lumbar plexus (L2–L3, posterior division)",
    clinicalPearl: "LCNT supplies the anterolateral thigh — overlaps L2–L3 dermatomes BUT is a single peripheral nerve. Compression at the inguinal ligament = MERALGIA PARAESTHETICA. Often missed by femoral nerve block; needs a separate LCNT block for skin grafting from this site.",
  },
  {
    id: "l3l4-saph",
    view: "anterior",
    // Anteromedial thigh + medial knee + medial leg — long contoured strip
    path: "M 140 360 Q 146 400 150 444 Q 154 510 158 576 Q 178 580 192 576 Q 196 510 192 444 Q 188 400 188 360 Q 164 356 140 360 Z",
    dermatome: "L3–L4 (anteromedial thigh, knee, medial leg)",
    dermatomeColor: "hsl(340 65% 55%)",
    nerve: "Femoral n. (anterior cutaneous branches) → SAPHENOUS n. (medial leg below knee)",
    nerveColor: "hsl(340 65% 55%)",
    nerveOrigin: "Femoral nerve (L2–L4, posterior division)",
    clinicalPearl: "SAPHENOUS n. is purely sensory continuation of femoral n. — supplies medial leg/foot below knee. Adductor canal block targets this branch for knee surgery while sparing quadriceps motor function.",
  },
  {
    id: "l4l5-deep",
    view: "anterior",
    // Anterior leg below knee + dorsum of foot — narrows toward ankle
    path: "M 138 578 Q 142 620 152 658 Q 172 662 188 658 Q 196 620 194 578 Q 166 574 138 578 Z",
    dermatome: "L4–L5 (anterior leg, dorsum of foot)",
    dermatomeColor: "hsl(0 65% 55%)",
    nerve: "Deep + superficial peroneal nn. (common peroneal branches)",
    nerveColor: "hsl(0 65% 55%)",
    nerveOrigin: "Common peroneal n. (L4–S2, sciatic division)",
    clinicalPearl: "Deep peroneal: 1st webspace ('big-toe webspace' — small territory but tested separately at the ankle). Superficial peroneal: rest of dorsum.",
  },
  // ---------- POSTERIOR ----------
  {
    id: "c2-occ",
    view: "posterior",
    // Occipital cap
    path: "M 412 46 Q 435 32 458 46 Q 464 70 460 90 Q 435 94 410 90 Q 406 70 412 46 Z",
    dermatome: "C2 (occiput)",
    dermatomeColor: "hsl(15 75% 55%)",
    nerve: "Greater occipital n.",
    nerveColor: "hsl(15 75% 55%)",
    nerveOrigin: "Dorsal ramus of C2",
    clinicalPearl: "Greater occipital n. block is used for occipital neuralgia. Targets the dorsal ramus, not ventral.",
  },
  {
    id: "s2-pos",
    view: "posterior",
    // Posterior thigh — gluteal fold down to popliteal
    path: "M 402 460 Q 396 500 406 540 Q 435 544 464 540 Q 474 500 468 460 Q 435 456 402 460 Z",
    dermatome: "S2–S3 (posterior thigh)",
    dermatomeColor: "hsl(245 60% 55%)",
    nerve: "Posterior cutaneous n. of thigh",
    nerveColor: "hsl(245 60% 55%)",
    nerveOrigin: "Sacral plexus (S1–S3)",
    clinicalPearl: "Posterior cutaneous n. of thigh is a separate branch of the sacral plexus — easily missed by a femoral block, often spared by sciatic block done distally.",
  },
  {
    id: "s1-pos",
    view: "posterior",
    // Posterior calf — narrows toward heel
    path: "M 406 542 Q 398 590 408 650 Q 435 656 462 650 Q 472 590 464 542 Q 435 540 406 542 Z",
    dermatome: "S1 (posterior leg, lateral foot, sole)",
    dermatomeColor: "hsl(195 70% 50%)",
    nerve: "Tibial n. (medial + lateral plantar nn., sural laterally)",
    nerveColor: "hsl(195 70% 50%)",
    nerveOrigin: "Tibial division of sciatic (L4–S3)",
    clinicalPearl: "S1 dermatome ≈ sole + lateral foot. Tibial n. supplies the sole (posterior tibial block at ankle for forefoot surgery).",
  },
];

// (Body silhouettes replaced by anatomically accurate line-art image; see <image href={bodyLineArt} /> below)


const NerveDermatomeOverlayDiagram = () => {
  const [mode, setMode] = useState<"dermatome" | "nerve" | "both">("both");
  const [selectedId, setSelectedId] = useState<string>("c8");
  const sel = REGIONS.find((r) => r.id === selectedId)!;

  return (
    <DiagramFigure
      id="nerve-dermatome-overlay-diagram"
      title="Nerve dermatome overlay"
      description="Auto-generated wrapper for the Nerve dermatome overlay anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 rounded-lg border border-border bg-card p-4">
        <p className="text-sm font-semibold text-foreground mb-1 text-center">
          Dermatomes vs Peripheral Nerve Territories — Comparison Overlay
        </p>
        <p className="text-xs text-muted-foreground text-center mb-3">
          Toggle the view to see how nerve-root (dermatomal) and peripheral-nerve cutaneous distributions overlap and diverge — clinically critical for choosing the right block and interpreting nerve injuries.
        </p>
  
        {/* Mode toggle */}
        <div className="flex justify-center gap-1 mb-3 flex-wrap">
          {([
            { v: "dermatome", label: "Dermatomes (nerve roots)" },
            { v: "nerve", label: "Peripheral nerves" },
            { v: "both", label: "Side-by-side overlay" },
          ] as const).map((opt) => (
            <button
              key={opt.v}
              onClick={() => setMode(opt.v)}
              className={`text-[11px] px-3 py-1 rounded border transition uppercase tracking-wide font-semibold ${
                mode === opt.v
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:bg-muted/50 text-muted-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
  
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4 items-start">
          {/* SVG figure */}
          <div>
            <svg viewBox="0 0 600 700" className="w-full h-auto max-w-[560px] mx-auto" role="img" aria-label="Anterior and posterior body with dermatomes and peripheral nerve territories">
              {/* Anatomically accurate adult male line drawing — anterior (left) + posterior (right) */}
              <image
                href={bodyLineArt}
                x="0"
                y="20"
                width="600"
                height="640"
                preserveAspectRatio="xMidYMid meet"
                opacity="0.85"
                style={{ filter: "var(--lineart-filter, none)" }}
              />

              {/* Labels for views */}
              <text x="155" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(var(--foreground))">ANTERIOR</text>
              <text x="440" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(var(--foreground))">POSTERIOR</text>

              {/* Midline */}
              <line x1="300" y1="10" x2="300" y2="690" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3 4" />

              {/* Overlays aligned to the new anatomical figures (legacy coords were tuned to a simple silhouette) */}
              <g transform="translate(27 8) scale(1 0.95)">
              {/* Region overlays (translucent + dotted boundary) */}
              {REGIONS.map((r) => {
                const isSel = r.id === selectedId;
                if (mode === "dermatome") {
                  return (
                    <g key={r.id} style={{ cursor: "pointer" }} onClick={() => setSelectedId(r.id)}>
                      <path d={r.path} fill={r.dermatomeColor} opacity={isSel ? 0.55 : 0.32} stroke={r.dermatomeColor} strokeWidth={isSel ? 1.2 : 0.6} strokeDasharray="1.5 2" />
                    </g>
                  );
                }
                if (mode === "nerve") {
                  return (
                    <g key={r.id} style={{ cursor: "pointer" }} onClick={() => setSelectedId(r.id)}>
                      <path d={r.path} fill={r.nerveColor} opacity={isSel ? 0.55 : 0.32} stroke={r.nerveColor} strokeWidth={isSel ? 1.2 : 0.6} strokeDasharray="1.5 2" />
                    </g>
                  );
                }
                return (
                  <g key={r.id} style={{ cursor: "pointer" }} onClick={() => setSelectedId(r.id)}>
                    <path d={r.path} fill={r.dermatomeColor} opacity={isSel ? 0.5 : 0.28} stroke={r.dermatomeColor} strokeWidth={isSel ? 1.2 : 0.5} strokeDasharray="1.5 2" />
                    <path d={r.path} fill="none" stroke={r.nerveColor} strokeWidth={isSel ? 1.4 : 0.8} strokeDasharray="4 2" opacity={isSel ? 0.85 : 0.55} />
                  </g>
                );
              })}
              </g>

  
              {/* Selected region marker (transformed to match overlay alignment) */}
              {(() => {
                const r = sel;
                const m = r.path.match(/M\s*(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)/);
                if (!m) return null;
                // Region path-local centroid (approx, first M point) + small offset, then map through overlay transform
                const localCx = parseFloat(m[1]) + 25;
                const localCy = parseFloat(m[2]) + 20;
                const cx = 27 + localCx;
                const cy = 8 + localCy * 0.95;
                return (
                      <circle cx={cx} cy={cy} r="8" fill="none" stroke="hsl(var(--primary))" strokeWidth="2">
                    <animate attributeName="r" values="8;16;8" dur="1.6s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0;1" dur="1.6s" repeatCount="indefinite" />
                  </circle>
    );
              })()}

  
              {/* Legend */}
              <g transform="translate(20 680)">
                <rect x="0" y="-12" width="14" height="10" fill="hsl(var(--foreground))" opacity="0.5" />
                <text x="20" y="-3" fontSize="9" fill="hsl(var(--muted-foreground))">solid = dermatome</text>
                <line x1="155" y1="-7" x2="175" y2="-7" stroke="hsl(var(--foreground))" strokeWidth="2" strokeDasharray="5 3" />
                <text x="180" y="-3" fontSize="9" fill="hsl(var(--muted-foreground))">dashed = peripheral nerve</text>
              </g>
            </svg>
          </div>
  
          {/* Detail panel */}
          <div className="space-y-2">
            {/* Region chips grouped */}
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-1">Regions (click to inspect)</p>
              <div className="flex flex-wrap gap-1">
                {REGIONS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedId(r.id)}
                    className="text-[10px] px-2 py-0.5 rounded border transition font-semibold"
                    style={{
                      background: selectedId === r.id ? r.dermatomeColor : "transparent",
                      color: selectedId === r.id ? "white" : "hsl(var(--foreground))",
                      borderColor: selectedId === r.id ? r.dermatomeColor : "hsl(var(--border))",
                    }}
                  >
                    {r.id.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
  
            <div className="rounded-lg border-2 p-3" style={{ borderColor: `${sel.dermatomeColor}55`, background: `${sel.dermatomeColor}0d` }}>
              <div className="grid gap-2">
                <div className="p-2 rounded bg-card/60 border border-border">
                  <p className="text-[10px] font-bold uppercase tracking-wide mb-0.5" style={{ color: sel.dermatomeColor }}>
                    ▣ Dermatome (nerve root)
                  </p>
                  <p className="text-xs text-foreground font-semibold">{sel.dermatome}</p>
                </div>
                <div className="p-2 rounded bg-card/60 border border-border">
                  <p className="text-[10px] font-bold uppercase tracking-wide mb-0.5" style={{ color: sel.nerveColor }}>
                    ┄ Peripheral nerve
                  </p>
                  <p className="text-xs text-foreground font-semibold">{sel.nerve}</p>
                  <p className="text-[10px] text-muted-foreground italic mt-0.5">Origin: {sel.nerveOrigin}</p>
                </div>
                <div className="p-2 rounded bg-secondary/60 border border-primary/20">
                  <p className="text-[10px] font-bold text-foreground uppercase tracking-wide mb-0.5">💡 Clinical pearl</p>
                  <p className="text-[11px] text-muted-foreground leading-snug">{sel.clinicalPearl}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Synthesis */}
        <div className="mt-3 p-2.5 rounded bg-secondary/40 border border-border">
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Why this matters: </strong>
            Dermatomes follow nerve <em>roots</em> (segmental) — relevant for spinal blocks, radiculopathy and shingles. Peripheral nerve territories follow <em>terminal branches</em> after plexus mixing — relevant for peripheral nerve blocks and traumatic nerve injuries. Classic divergences: <strong>ULNAR n.</strong> stops at the wrist crease, but <strong>C8</strong> extends up the medial forearm; <strong>LCNT</strong> covers anterolateral thigh from L2–L3 roots but is a single trappable nerve under the inguinal ligament (meralgia paraesthetica); <strong>intercostobrachial (T2)</strong> supplies medial upper arm and is missed by interscalene/supraclavicular blocks — a key cause of tourniquet pain.
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default NerveDermatomeOverlayDiagram;
