import { useState } from "react";

type BlockLevel = "interscalene" | "supraclavicular" | "infraclavicular" | "axillary";

const levels: Record<BlockLevel, { label: string; subtitle: string; description: string; landmarks: string; needle: string; tips: string }> = {
  interscalene: {
    label: "Interscalene",
    subtitle: '"Traffic Lights"',
    description: "Three hypoechoic round structures (C5, C6, C7 roots/trunks) stacked vertically between anterior and middle scalene muscles — resembling traffic lights. Located deep to SCM at C6 level.",
    landmarks: "SCM (superficial), anterior scalene (medial), middle scalene (lateral), carotid artery (medial/deep), internal jugular vein (superficial/medial)",
    needle: "In-plane lateral to medial. Target: between the nerve roots. Avoid phrenic nerve (anterior to anterior scalene).",
    tips: "Trace distally from supraclavicular view to identify roots. Slide cranially to see C5–C7 as separate round structures. Doppler to identify vertebral artery (deep, medial).",
  },
  supraclavicular: {
    label: "Supraclavicular",
    subtitle: '"Bunch of Grapes"',
    description: "Trunks and divisions appear as a cluster of hypoechoic nodules (bunch of grapes) sitting on top of the first rib, lateral and superficial to the subclavian artery. Pleura visible as bright sliding line deep to artery.",
    landmarks: "Subclavian artery (pulsatile, round), first rib (hyperechoic with acoustic shadow), pleura (sliding, deep to rib), nerve cluster (posterolateral to artery)",
    needle: "In-plane lateral to medial. Target: 'corner pocket' — junction of nerve cluster, artery, and first rib. Keep needle tip visible at all times to avoid pneumothorax.",
    tips: "Start with probe in supraclavicular fossa, tilted caudally. Identify artery first, then look posterolateral for the nerve cluster. First rib = safety backstop. Colour Doppler to confirm dorsal scapular/transverse cervical arteries.",
  },
  infraclavicular: {
    label: "Infraclavicular",
    subtitle: '"Cords Around Artery"',
    description: "Three cords (lateral, posterior, medial) surround the second part of the axillary artery deep to pectoralis major and minor. Appear as hyperechoic structures at roughly 9, 6, and 3 o'clock positions relative to artery.",
    landmarks: "Pectoralis major (superficial), pectoralis minor (deep), axillary artery (pulsatile), axillary vein (compressible, medial/caudal), pleura (deep)",
    needle: "In-plane sagittal parasagittal approach. Target: posterior cord (6 o'clock to artery — single injection point gives best spread around artery). Steep angle required.",
    tips: "Arm abduction improves access. Identify coracoid process as bony landmark. U-shaped spread of LA around artery indicates correct placement. Avoid the vein (Doppler). Good site for catheter (pectoralis muscle holds catheter in place).",
  },
  axillary: {
    label: "Axillary",
    subtitle: '"Cross-Section"',
    description: "Terminal branches (median, ulnar, radial) arranged around the third part of the axillary artery in the axilla. Musculocutaneous nerve seen separately as a hyperechoic oval within coracobrachialis muscle.",
    landmarks: "Axillary artery (centre), median nerve (superficial/lateral ~12 o'clock), ulnar nerve (superficial/medial ~2 o'clock), radial nerve (posterior/deep ~6 o'clock), musculocutaneous nerve (in coracobrachialis, lateral)",
    needle: "In-plane. Multiple injections around individual nerves or perivascular technique. Separate injection for musculocutaneous nerve in coracobrachialis.",
    tips: "Arm abducted 90°. Slide probe distally — nerves become more superficial and separate from artery. Median and ulnar are hyperechoic with honeycomb pattern. Musculocutaneous appears as bright oval between biceps and coracobrachialis. Safest block — no pneumothorax risk.",
  },
};

// SVG sonographic appearance for each level
const SonoView = ({ level, size = 200 }: { level: BlockLevel; size?: number }) => {
  const s = size;
  const cx = s / 2;
  const cy = s / 2;

  return (
    <svg viewBox={`0 0 ${s} ${s}`} width={s} height={s} className="rounded-lg" style={{ background: "hsl(220, 10%, 8%)" }}>
      {/* Scan lines for US texture */}
      {Array.from({ length: 20 }).map((_, i) => (
        <line key={i} x1={i * (s / 20)} y1="0" x2={i * (s / 20)} y2={s}
          stroke="hsl(0,0%,100%)" strokeWidth="0.3" opacity="0.03" />
      ))}

      {/* Speckle noise */}
      {Array.from({ length: 40 }).map((_, i) => (
        <circle key={`sp${i}`}
          cx={((i * 37 + 13) % s)} cy={((i * 53 + 7) % s)}
          r={0.8 + (i % 3) * 0.4}
          fill="hsl(0,0%,100%)" opacity={0.03 + (i % 5) * 0.01} />
      ))}

      {level === "interscalene" && (
        <>
          {/* Anterior scalene */}
          <path d={`M${s * 0.05},${s * 0.15} Q${s * 0.35},${s * 0.12} ${s * 0.38},${s * 0.85}`}
            stroke="hsl(0,0%,45%)" strokeWidth="1.5" fill="none" opacity="0.5" />
          <text x={s * 0.15} y={s * 0.35} fontSize="6" fill="hsl(0,0%,55%)" opacity="0.7" transform={`rotate(-80,${s * 0.15},${s * 0.35})`}>Ant. Scalene</text>

          {/* Middle scalene */}
          <path d={`M${s * 0.62},${s * 0.12} Q${s * 0.65},${s * 0.5} ${s * 0.95},${s * 0.85}`}
            stroke="hsl(0,0%,45%)" strokeWidth="1.5" fill="none" opacity="0.5" />
          <text x={s * 0.78} y={s * 0.35} fontSize="6" fill="hsl(0,0%,55%)" opacity="0.7" transform={`rotate(80,${s * 0.78},${s * 0.35})`}>Mid. Scalene</text>

          {/* SCM superficial */}
          <rect x={s * 0.2} y={s * 0.04} width={s * 0.6} height={s * 0.08} rx="4"
            fill="hsl(0,0%,30%)" opacity="0.4" stroke="hsl(0,0%,40%)" strokeWidth="0.5" />
          <text x={cx} y={s * 0.1} textAnchor="middle" fontSize="6" fill="hsl(0,0%,60%)" opacity="0.8">SCM</text>

          {/* Three roots — "traffic lights" */}
          {[0.28, 0.48, 0.68].map((yFrac, i) => (
            <g key={i}>
              <circle cx={cx} cy={s * yFrac} r={s * 0.06}
                fill="hsl(0,0%,15%)" stroke="hsl(0,0%,55%)" strokeWidth="1.2" />
              <text x={cx + s * 0.1} y={s * yFrac + 2} fontSize="6" fill="hsl(180,50%,60%)" fontWeight="bold">
                C{5 + i}
              </text>
            </g>
          ))}

          {/* Carotid artery (medial) */}
          <circle cx={s * 0.22} cy={s * 0.6} r={s * 0.07}
            fill="hsl(0,60%,25%)" stroke="hsl(0,0%,50%)" strokeWidth="1" opacity="0.6" />
          <text x={s * 0.22} y={s * 0.78} textAnchor="middle" fontSize="5" fill="hsl(0,50%,55%)" opacity="0.7">CA</text>

          {/* Label */}
          <text x={cx} y={s * 0.92} textAnchor="middle" fontSize="7" fill="hsl(180,50%,65%)" fontWeight="bold">"Traffic Lights"</text>
        </>
      )}

      {level === "supraclavicular" && (
        <>
          {/* First rib - bright hyperechoic line with shadow */}
          <line x1={s * 0.05} y1={s * 0.78} x2={s * 0.95} y2={s * 0.72}
            stroke="hsl(0,0%,80%)" strokeWidth="2.5" />
          <rect x={s * 0.05} y={s * 0.78} width={s * 0.9} height={s * 0.18}
            fill="hsl(0,0%,5%)" opacity="0.7" />
          <text x={s * 0.5} y={s * 0.88} textAnchor="middle" fontSize="6" fill="hsl(0,0%,35%)" opacity="0.6">1st Rib (shadow)</text>

          {/* Subclavian artery */}
          <circle cx={s * 0.45} cy={s * 0.58} r={s * 0.11}
            fill="hsl(0,0%,8%)" stroke="hsl(0,0%,55%)" strokeWidth="1.5" />
          <text x={s * 0.45} y={s * 0.61} textAnchor="middle" fontSize="6" fill="hsl(0,50%,55%)" opacity="0.8">SCA</text>

          {/* Nerve cluster — bunch of grapes (posterolateral to artery) */}
          {[
            { x: 0.68, y: 0.48 }, { x: 0.76, y: 0.55 }, { x: 0.7, y: 0.62 },
            { x: 0.62, y: 0.44 }, { x: 0.78, y: 0.46 }, { x: 0.74, y: 0.66 },
          ].map((p, i) => (
            <circle key={i} cx={s * p.x} cy={s * p.y} r={s * 0.035}
              fill="hsl(0,0%,18%)" stroke="hsl(0,0%,55%)" strokeWidth="0.8" />
          ))}
          <text x={s * 0.72} y={s * 0.38} textAnchor="middle" fontSize="6" fill="hsl(180,50%,60%)" fontWeight="bold">Nerves</text>

          {/* Pleura */}
          <path d={`M${s * 0.1},${s * 0.74} Q${s * 0.5},${s * 0.7} ${s * 0.9},${s * 0.68}`}
            stroke="hsl(0,0%,70%)" strokeWidth="1" fill="none" strokeDasharray="3 2" opacity="0.5" />
          <text x={s * 0.15} y={s * 0.72} fontSize="5" fill="hsl(0,0%,55%)" opacity="0.6">Pleura</text>

          {/* Corner pocket arrow */}
          <path d={`M${s * 0.56},${s * 0.68} L${s * 0.6},${s * 0.72}`}
            stroke="hsl(45,80%,55%)" strokeWidth="1.5" markerEnd="none" opacity="0.8" />
          <text x={s * 0.42} y={s * 0.7} fontSize="5" fill="hsl(45,80%,55%)" opacity="0.9" fontWeight="bold">Corner pocket</text>

          <text x={cx} y={s * 0.16} textAnchor="middle" fontSize="7" fill="hsl(180,50%,65%)" fontWeight="bold">"Bunch of Grapes"</text>
        </>
      )}

      {level === "infraclavicular" && (
        <>
          {/* Pec major */}
          <rect x={s * 0.1} y={s * 0.06} width={s * 0.8} height={s * 0.12} rx="3"
            fill="hsl(0,0%,22%)" opacity="0.5" stroke="hsl(0,0%,40%)" strokeWidth="0.5" />
          <text x={cx} y={s * 0.13} textAnchor="middle" fontSize="5.5" fill="hsl(0,0%,55%)" opacity="0.7">Pec Major</text>

          {/* Pec minor */}
          <rect x={s * 0.15} y={s * 0.2} width={s * 0.7} height={s * 0.1} rx="3"
            fill="hsl(0,0%,25%)" opacity="0.4" stroke="hsl(0,0%,40%)" strokeWidth="0.5" />
          <text x={cx} y={s * 0.27} textAnchor="middle" fontSize="5.5" fill="hsl(0,0%,55%)" opacity="0.7">Pec Minor</text>

          {/* Axillary artery */}
          <circle cx={cx} cy={s * 0.52} r={s * 0.1}
            fill="hsl(0,0%,8%)" stroke="hsl(0,0%,55%)" strokeWidth="1.5" />
          <text x={cx} y={s * 0.54} textAnchor="middle" fontSize="6" fill="hsl(0,50%,55%)" opacity="0.8">AA</text>

          {/* Axillary vein */}
          <ellipse cx={s * 0.32} cy={s * 0.6} rx={s * 0.06} ry={s * 0.045}
            fill="hsl(220,30%,15%)" stroke="hsl(0,0%,45%)" strokeWidth="0.8" />
          <text x={s * 0.32} y={s * 0.62} textAnchor="middle" fontSize="4.5" fill="hsl(220,40%,55%)" opacity="0.7">AV</text>

          {/* Cords at clock positions */}
          {/* Lateral cord ~9 o'clock */}
          <circle cx={s * 0.35} cy={s * 0.48} r={s * 0.03}
            fill="hsl(45,60%,55%)" fillOpacity="0.4" stroke="hsl(45,60%,55%)" strokeWidth="1" />
          <text x={s * 0.24} y={s * 0.46} fontSize="5.5" fill="hsl(45,60%,60%)" fontWeight="bold">LC</text>

          {/* Posterior cord ~6 o'clock */}
          <circle cx={cx} cy={s * 0.65} r={s * 0.03}
            fill="hsl(120,40%,50%)" fillOpacity="0.4" stroke="hsl(120,40%,50%)" strokeWidth="1" />
          <text x={cx} y={s * 0.73} textAnchor="middle" fontSize="5.5" fill="hsl(120,40%,55%)" fontWeight="bold">PC</text>

          {/* Medial cord ~3 o'clock */}
          <circle cx={s * 0.62} cy={s * 0.55} r={s * 0.03}
            fill="hsl(270,40%,55%)" fillOpacity="0.4" stroke="hsl(270,40%,55%)" strokeWidth="1" />
          <text x={s * 0.71} y={s * 0.57} fontSize="5.5" fill="hsl(270,40%,60%)" fontWeight="bold">MC</text>

          {/* Clock labels */}
          <text x={cx} y={s * 0.38} textAnchor="middle" fontSize="4.5" fill="hsl(0,0%,45%)" opacity="0.5">12</text>
          <text x={s * 0.68} y={s * 0.52} fontSize="4.5" fill="hsl(0,0%,45%)" opacity="0.5">3</text>
          <text x={cx} y={s * 0.68} textAnchor="middle" fontSize="4.5" fill="hsl(0,0%,45%)" opacity="0.5">6</text>
          <text x={s * 0.3} y={s * 0.52} fontSize="4.5" fill="hsl(0,0%,45%)" opacity="0.5">9</text>

          {/* Pleura */}
          <path d={`M${s * 0.08},${s * 0.85} Q${s * 0.5},${s * 0.78} ${s * 0.92},${s * 0.85}`}
            stroke="hsl(0,0%,65%)" strokeWidth="1" fill="none" strokeDasharray="3 2" opacity="0.4" />
          <text x={cx} y={s * 0.92} textAnchor="middle" fontSize="5" fill="hsl(0,0%,50%)" opacity="0.5">Pleura</text>

          <text x={cx} y={s * 0.04} textAnchor="middle" fontSize="7" fill="hsl(180,50%,65%)" fontWeight="bold">"Cords Around Artery"</text>
        </>
      )}

      {level === "axillary" && (
        <>
          {/* Axillary artery (centre) */}
          <circle cx={cx} cy={cy} r={s * 0.1}
            fill="hsl(0,0%,8%)" stroke="hsl(0,0%,55%)" strokeWidth="1.5" />
          <text x={cx} y={cy + 2} textAnchor="middle" fontSize="6" fill="hsl(0,50%,55%)" opacity="0.8">AA</text>

          {/* Axillary vein (medial) */}
          <ellipse cx={s * 0.3} cy={s * 0.55} rx={s * 0.08} ry={s * 0.06}
            fill="hsl(220,30%,12%)" stroke="hsl(0,0%,45%)" strokeWidth="0.8" />
          <text x={s * 0.3} y={s * 0.57} textAnchor="middle" fontSize="5" fill="hsl(220,40%,55%)" opacity="0.7">AV</text>

          {/* Median nerve ~12 o'clock */}
          <ellipse cx={s * 0.45} cy={s * 0.32} rx={s * 0.04} ry={s * 0.03}
            fill="hsl(0,0%,40%)" stroke="hsl(45,60%,55%)" strokeWidth="1.2" />
          <text x={s * 0.45} y={s * 0.26} textAnchor="middle" fontSize="6" fill="hsl(45,60%,60%)" fontWeight="bold">Median</text>

          {/* Ulnar nerve ~2 o'clock */}
          <ellipse cx={s * 0.63} cy={s * 0.38} rx={s * 0.035} ry={s * 0.025}
            fill="hsl(0,0%,40%)" stroke="hsl(270,40%,55%)" strokeWidth="1.2" />
          <text x={s * 0.75} y={s * 0.38} fontSize="6" fill="hsl(270,40%,60%)" fontWeight="bold">Ulnar</text>

          {/* Radial nerve ~6 o'clock */}
          <ellipse cx={s * 0.52} cy={s * 0.66} rx={s * 0.04} ry={s * 0.03}
            fill="hsl(0,0%,40%)" stroke="hsl(120,50%,50%)" strokeWidth="1.2" />
          <text x={s * 0.52} y={s * 0.75} textAnchor="middle" fontSize="6" fill="hsl(120,50%,55%)" fontWeight="bold">Radial</text>

          {/* Musculocutaneous nerve in coracobrachialis */}
          <ellipse cx={s * 0.78} cy={s * 0.52} rx={s * 0.035} ry={s * 0.025}
            fill="hsl(0,0%,45%)" stroke="hsl(0,60%,55%)" strokeWidth="1.2" />
          {/* Coracobrachialis muscle */}
          <ellipse cx={s * 0.78} cy={s * 0.52} rx={s * 0.09} ry={s * 0.07}
            fill="none" stroke="hsl(0,0%,35%)" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.6" />
          <text x={s * 0.78} y={s * 0.43} textAnchor="middle" fontSize="5" fill="hsl(0,60%,60%)" fontWeight="bold">MCN</text>
          <text x={s * 0.78} y={s * 0.63} textAnchor="middle" fontSize="4.5" fill="hsl(0,0%,45%)" opacity="0.6">Coracobrachialis</text>

          {/* Biceps superficial */}
          <path d={`M${s * 0.55},${s * 0.08} Q${s * 0.7},${s * 0.15} ${s * 0.9},${s * 0.12}`}
            fill="hsl(0,0%,20%)" fillOpacity="0.3" stroke="hsl(0,0%,35%)" strokeWidth="0.6" />
          <text x={s * 0.72} y={s * 0.14} fontSize="4.5" fill="hsl(0,0%,45%)" opacity="0.5">Biceps</text>

          <text x={cx} y={s * 0.94} textAnchor="middle" fontSize="7" fill="hsl(180,50%,65%)" fontWeight="bold">"Axillary Cross-Section"</text>
        </>
      )}
    </svg>
  );
};

const BrachialPlexusUltrasoundDiagram = () => {
  const [selected, setSelected] = useState<BlockLevel>("interscalene");
  const info = levels[selected];

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Ultrasound Anatomy — Brachial Plexus Blocks</h3>
      <p className="text-xs text-muted-foreground mb-4">Select a block level to see the sonographic appearance and key landmarks</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {(Object.keys(levels) as BlockLevel[]).map((l) => (
          <button key={l} onClick={() => setSelected(l)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              selected === l
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}>
            {levels[l].label}
          </button>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-5 items-start animate-fade-in" key={selected}>
        <div className="flex-shrink-0 mx-auto">
          <SonoView level={selected} size={220} />
        </div>

        <div className="flex-1 min-w-0 space-y-3">
          <div className="p-3 rounded-lg border border-border">
            <p className="font-bold text-foreground text-sm">{info.label} — {info.subtitle}</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{info.description}</p>
          </div>
          <div className="p-3 rounded-lg border border-border">
            <p className="font-semibold text-foreground text-xs">Key Landmarks</p>
            <p className="text-xs text-muted-foreground mt-1">{info.landmarks}</p>
          </div>
          <div className="p-3 rounded-lg border border-border">
            <p className="font-semibold text-foreground text-xs">Needle Technique</p>
            <p className="text-xs text-muted-foreground mt-1">{info.needle}</p>
          </div>
          <div className="p-3 rounded-lg border border-border bg-secondary/20">
            <p className="font-semibold text-foreground text-xs">💡 Scanning Tips</p>
            <p className="text-xs text-muted-foreground mt-1">{info.tips}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrachialPlexusUltrasoundDiagram;
