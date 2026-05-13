import { useState } from "react";

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
const REGIONS: Region[] = [
  // ---------- HEAD / NECK ----------
  {
    id: "v1",
    view: "anterior",
    path: "M 130 65 Q 155 45, 180 65 L 180 95 L 130 95 Z",
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
    path: "M 130 95 L 180 95 L 180 130 L 130 130 Z",
    dermatome: "C2–C3",
    dermatomeColor: "hsl(15 75% 55%)",
    nerve: "Greater auricular & transverse cervical nn. (cervical plexus)",
    nerveColor: "hsl(15 75% 55%)",
    nerveOrigin: "Cervical plexus (C2–C3 ventral rami)",
    clinicalPearl: "Targets of superficial cervical plexus block for carotid endarterectomy.",
  },
  // ---------- UPPER LIMB ANTERIOR ----------
  {
    id: "c5",
    view: "anterior",
    path: "M 75 175 Q 65 200, 70 230 L 95 235 L 100 200 L 95 175 Z",
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
    path: "M 70 230 L 95 235 L 90 280 L 60 280 Z M 50 280 L 90 280 L 80 320 L 35 315 Z",
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
    path: "M 35 315 L 80 320 L 75 360 L 30 355 Z",
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
    path: "M 30 355 L 75 360 L 80 395 L 35 395 Z",
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
    path: "M 90 280 L 130 280 L 130 320 L 90 320 Z M 80 320 L 130 320 L 130 360 L 75 360 Z",
    dermatome: "T1 (medial forearm + medial arm)",
    dermatomeColor: "hsl(195 70% 50%)",
    nerve: "Medial cutaneous n. of forearm (T1) + medial cutaneous n. of arm (T1, via intercostobrachial)",
    nerveColor: "hsl(195 70% 50%)",
    nerveOrigin: "Medial cord; intercostobrachial = T2 lateral cutaneous branch",
    clinicalPearl: "INTERCOSTOBRACHIAL N. (T2) supplies medial upper arm — NOT blocked by interscalene/supraclavicular approaches. Must be blocked separately for tourniquet pain.",
  },
  // ---------- THORAX & ABDOMEN ----------
  {
    id: "t4",
    view: "anterior",
    path: "M 130 175 L 200 175 L 200 200 L 130 200 Z",
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
    path: "M 130 230 L 200 230 L 200 255 L 130 255 Z",
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
    path: "M 130 285 L 200 285 L 200 305 L 130 305 Z",
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
    path: "M 95 360 L 145 360 L 140 440 L 90 440 Z",
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
    path: "M 145 440 L 200 440 L 200 580 L 165 580 Z",
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
    path: "M 165 580 L 200 580 L 200 660 L 170 660 Z",
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
    path: "M 410 50 Q 435 30, 460 50 L 460 90 L 410 90 Z",
    dermatome: "C2 (occiput)",
    dermatomeColor: "hsl(15 75% 55%)",
    nerve: "Greater occipital n.",
    nerveColor: "hsl(15 75% 55%)",
    nerveOrigin: "Dorsal ramus of C2",
    clinicalPearl: "Greater occipital n. block is used for occipital neuralgia. Targets the dorsal ramus, not ventral.",
  },
  {
    id: "s1-pos",
    view: "posterior",
    path: "M 395 540 L 470 540 L 460 650 L 410 650 Z",
    dermatome: "S1 (posterior leg, lateral foot, sole)",
    dermatomeColor: "hsl(195 70% 50%)",
    nerve: "Tibial n. (medial + lateral plantar nn., sural laterally)",
    nerveColor: "hsl(195 70% 50%)",
    nerveOrigin: "Tibial division of sciatic (L4–S3)",
    clinicalPearl: "S1 dermatome ≈ sole + lateral foot. Tibial n. supplies the sole (posterior tibial block at ankle for forefoot surgery).",
  },
  {
    id: "s2-pos",
    view: "posterior",
    path: "M 410 460 L 460 460 L 470 540 L 395 540 Z",
    dermatome: "S2–S3 (posterior thigh)",
    dermatomeColor: "hsl(245 60% 55%)",
    nerve: "Posterior cutaneous n. of thigh",
    nerveColor: "hsl(245 60% 55%)",
    nerveOrigin: "Sacral plexus (S1–S3)",
    clinicalPearl: "Posterior cutaneous n. of thigh is a separate branch of the sacral plexus — easily missed by a femoral block, often spared by sciatic block done distally.",
  },
];

const ANTERIOR_BODY = "M 155 30 Q 130 30, 128 70 Q 127 100, 145 115 L 75 130 Q 50 140, 50 175 L 50 280 Q 50 320, 90 325 L 100 360 L 100 395 Q 100 410, 115 410 L 90 415 L 85 460 L 95 580 L 100 660 L 130 670 L 165 660 L 165 580 L 175 460 L 170 415 L 145 410 Q 160 410, 160 395 L 160 360 L 170 325 Q 210 320, 210 280 L 210 175 Q 210 140, 185 130 L 115 115 Q 133 100, 132 70 Q 130 30, 155 30 Z";
const POSTERIOR_BODY = "M 435 30 Q 410 30, 408 70 Q 407 100, 425 115 L 355 130 Q 330 140, 330 175 L 330 280 Q 330 320, 370 325 L 380 360 L 380 395 Q 380 410, 395 410 L 370 415 L 365 460 L 375 580 L 380 660 L 410 670 L 445 660 L 445 580 L 455 460 L 450 415 L 425 410 Q 440 410, 440 395 L 440 360 L 450 325 Q 490 320, 490 280 L 490 175 Q 490 140, 465 130 L 395 115 Q 413 100, 412 70 Q 410 30, 435 30 Z";

// Mirror anterior region paths to posterior coordinate space (offset +280) for posterior versions of trunk dermatomes
const _mirrorToPost = (d: string) => d.replace(/(\d+(?:\.\d+)?)/g, (m, _g, _offset, _full) => {
  // crude: alternate numbers x,y,x,y... shift x by +280
  // Use regex with index parity within each command — simpler: process tokens
  return m;
});

const NerveDermatomeOverlayDiagram = () => {
  const [mode, setMode] = useState<"dermatome" | "nerve" | "both">("both");
  const [selectedId, setSelectedId] = useState<string>("c8");
  const sel = REGIONS.find((r) => r.id === selectedId)!;

  return (
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
            {/* Body silhouettes */}
            <path d={ANTERIOR_BODY} fill="hsl(var(--muted))" opacity="0.3" stroke="hsl(var(--foreground))" strokeWidth="1" />
            <path d={POSTERIOR_BODY} fill="hsl(var(--muted))" opacity="0.3" stroke="hsl(var(--foreground))" strokeWidth="1" />

            {/* Labels for views */}
            <text x="130" y="20" textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(var(--foreground))">ANTERIOR</text>
            <text x="410" y="20" textAnchor="middle" fontSize="11" fontWeight="700" fill="hsl(var(--foreground))">POSTERIOR</text>

            {/* Midline */}
            <line x1="300" y1="10" x2="300" y2="690" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3 4" />

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

            {/* Surface anatomy overlay — bony landmarks rendered ON TOP so anatomy stays visible through territories */}
            <g fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.75" opacity="0.55" strokeLinecap="round">
              {/* ── ANTERIOR (centered ~x=130) ── */}
              {/* Clavicles */}
              <path d="M 78 135 Q 105 128 130 138" />
              <path d="M 130 138 Q 155 128 182 135" />
              {/* Sternum (manubrium → body → xiphoid) */}
              <path d="M 130 140 L 130 215" />
              <line x1="123" y1="155" x2="137" y2="155" />
              {/* Costal margins */}
              <path d="M 130 215 Q 100 230 80 255" />
              <path d="M 130 215 Q 160 230 180 255" />
              {/* Nipples (T4) */}
              <circle cx="105" cy="185" r="2" fill="hsl(var(--foreground))" opacity="0.6" />
              <circle cx="155" cy="185" r="2" fill="hsl(var(--foreground))" opacity="0.6" />
              {/* Umbilicus (T10) */}
              <circle cx="130" cy="258" r="2.4" fill="none" />
              <circle cx="130" cy="258" r="0.8" fill="hsl(var(--foreground))" opacity="0.6" />
              {/* ASIS + inguinal ligament hint */}
              <circle cx="98" cy="305" r="1.8" fill="hsl(var(--foreground))" opacity="0.6" />
              <circle cx="162" cy="305" r="1.8" fill="hsl(var(--foreground))" opacity="0.6" />
              <path d="M 98 305 Q 115 318 130 318 Q 145 318 162 305" strokeDasharray="2 2" />
              {/* Patellae */}
              <ellipse cx="115" cy="500" rx="9" ry="11" />
              <ellipse cx="145" cy="500" rx="9" ry="11" />
              {/* Medial malleoli */}
              <circle cx="118" cy="650" r="2" fill="hsl(var(--foreground))" opacity="0.6" />
              <circle cx="142" cy="650" r="2" fill="hsl(var(--foreground))" opacity="0.6" />

              {/* ── POSTERIOR (centered ~x=410) ── */}
              {/* C7 vertebra prominens */}
              <circle cx="410" cy="125" r="2" fill="hsl(var(--foreground))" opacity="0.7" />
              {/* Spine midline */}
              <line x1="410" y1="125" x2="410" y2="320" strokeDasharray="2 2" />
              {/* Scapulae (spine + inferior angle T7) */}
              <path d="M 365 150 Q 385 158 405 162" />
              <path d="M 415 162 Q 435 158 455 150" />
              <path d="M 365 150 L 380 215" />
              <path d="M 455 150 L 440 215" />
              <circle cx="380" cy="215" r="1.5" fill="hsl(var(--foreground))" opacity="0.6" />
              <circle cx="440" cy="215" r="1.5" fill="hsl(var(--foreground))" opacity="0.6" />
              {/* Iliac crests (L4 plane) + PSIS dimples */}
              <path d="M 370 320 Q 410 312 450 320" />
              <circle cx="395" cy="328" r="1.5" fill="hsl(var(--foreground))" opacity="0.6" />
              <circle cx="425" cy="328" r="1.5" fill="hsl(var(--foreground))" opacity="0.6" />
              {/* Gluteal fold */}
              <path d="M 378 410 Q 410 422 442 410" strokeDasharray="2 2" />
              {/* Popliteal crease */}
              <path d="M 388 545 Q 410 552 432 545" strokeDasharray="2 2" />
              {/* Achilles / heel hint */}
              <path d="M 398 660 L 405 670" />
              <path d="M 422 660 L 415 670" />
            </g>

            {/* Selected region marker */}
            {(() => {
              const r = sel;
              // Compute approximate centroid by sampling — use first M coords
              const m = r.path.match(/M\s*(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)/);
              if (!m) return null;
              const cx = parseFloat(m[1]) + 25;
              const cy = parseFloat(m[2]) + 20;
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
  );
};

export default NerveDermatomeOverlayDiagram;
