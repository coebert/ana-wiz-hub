import { useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { DiagramFigure } from "./_shared/DiagramFigure";

type ArteryKey = "external-iliac" | "femoral" | "profunda-femoris" | "popliteal" | "anterior-tibial" | "posterior-tibial" | "peroneal" | "dorsalis-pedis" | "medial-plantar" | "lateral-plantar" | "genicular" | "circumflex-femoral";

interface Artery {
  label: string;
  color: string;
  detail: string;
  clinicalNote: string;
}

const arteries: Record<ArteryKey, Artery> = {
  "external-iliac": {
    label: "External Iliac Artery",
    color: "hsl(0, 60%, 48%)",
    detail: "Continuation of the common iliac artery at the pelvic brim. Runs along the medial border of psoas major. Gives off the inferior epigastric and deep circumflex iliac arteries just above the inguinal ligament. Becomes the femoral artery as it passes behind the inguinal ligament at the mid-inguinal point.",
    clinicalNote: "The inferior epigastric artery defines the boundary between direct (medial) and indirect (lateral) inguinal hernias. Mid-inguinal point (halfway between ASIS and pubic symphysis) marks the surface landmark for the femoral artery — NOT the midpoint of the inguinal ligament."
  },
  femoral: {
    label: "Femoral Artery",
    color: "hsl(0, 65%, 46%)",
    detail: "Continuation of the external iliac below the inguinal ligament. Enters the femoral triangle (borders: inguinal ligament superiorly, sartorius laterally, adductor longus medially). Relations in the femoral sheath: lateral compartment = artery, medial = vein, most medial = femoral canal (lymphatics). Passes through the adductor canal (Hunter's canal) to become the popliteal artery at the adductor hiatus.",
    clinicalNote: "Femoral artery cannulation: palpated at the mid-inguinal point. Used for arterial monitoring, IABP, ECMO, angiography. The femoral nerve lies LATERAL to the artery (VAN: vein, artery, nerve — medial to lateral). Pseudoaneurysm is a recognised complication of repeated puncture."
  },
  "profunda-femoris": {
    label: "Profunda Femoris (Deep Femoral)",
    color: "hsl(0, 55%, 52%)",
    detail: "Largest branch of the femoral artery, arising ~3.5 cm below the inguinal ligament from the posterolateral aspect. Gives rise to the medial and lateral circumflex femoral arteries (may arise from femoral directly in ~20%). Four perforating branches supply the posterior thigh compartment. The profunda is the main supply to the thigh musculature.",
    clinicalNote: "The profunda femoris is the key to thigh blood supply — superficial femoral artery ligation is survivable because of profunda collaterals. In femoral shaft fractures, perforating branches may be damaged → significant blood loss (1–1.5L per thigh). Profunda is NOT palpable — lies deep to adductor longus."
  },
  "circumflex-femoral": {
    label: "Circumflex Femoral Arteries",
    color: "hsl(0, 50%, 55%)",
    detail: "Medial circumflex femoral artery (MCFA): passes posteriorly between psoas and pectineus, around the femoral neck — the MAIN blood supply to the femoral head. Lateral circumflex femoral artery: three branches (ascending, transverse, descending) — supplies vastus lateralis and contributes to the trochanteric anastomosis.",
    clinicalNote: "The MCFA is critical — disruption in displaced intracapsular femoral neck fractures leads to avascular necrosis (AVN) of the femoral head. This is why displaced intracapsular #NOF in the elderly requires hemiarthroplasty rather than fixation. The LCFA descending branch is used as a free flap pedicle in reconstructive surgery."
  },
  popliteal: {
    label: "Popliteal Artery",
    color: "hsl(0, 60%, 48%)",
    detail: "Continuation of the femoral artery after passing through the adductor hiatus. Runs through the popliteal fossa, the deepest structure (closest to bone). Relations: popliteal vein is superficial to the artery; tibial nerve is the most superficial neurovascular structure. Gives five genicular branches before dividing into anterior and posterior tibial arteries at the lower border of popliteus.",
    clinicalNote: "Popliteal artery is at risk in posterior knee dislocations (30–40% have vascular injury) and supracondylar femoral fractures. Popliteal artery aneurysm is the most common peripheral aneurysm. Popliteal block for foot/ankle surgery targets the tibial and common peroneal nerves, which lie superficial to the artery."
  },
  genicular: {
    label: "Genicular Anastomosis",
    color: "hsl(0, 45%, 55%)",
    detail: "Five genicular branches (superior medial/lateral, middle, inferior medial/lateral) form a rich periarticular anastomosis around the knee. Additional contributions from the descending genicular artery (from femoral) and anterior tibial recurrent artery. Maintains knee perfusion during flexion when the popliteal artery is kinked.",
    clinicalNote: "Genicular artery embolisation (GAE) is an emerging treatment for osteoarthritis knee pain. The periarticular anastomosis means knee surgery rarely causes critical ischaemia. Tourniquet use in TKR is safe because collateral flow maintains viability of the distal limb."
  },
  "anterior-tibial": {
    label: "Anterior Tibial Artery",
    color: "hsl(0, 60%, 50%)",
    detail: "Passes anteriorly through the gap above the interosseous membrane to reach the anterior compartment. Descends on the anterior surface of the interosseous membrane between tibialis anterior and extensor hallucis longus. Accompanied by the deep peroneal nerve. Becomes the dorsalis pedis artery at the ankle (anterior to the ankle joint, between EHL and EDL tendons).",
    clinicalNote: "The anterior tibial artery is at risk in anterior compartment syndrome — rising pressure occludes the artery → irreversible muscle ischaemia within 6 hours. Fasciotomy of all four compartments is the definitive treatment. The anterior tibial pulse is NOT routinely palpable; the dorsalis pedis (its continuation) is."
  },
  "posterior-tibial": {
    label: "Posterior Tibial Artery",
    color: "hsl(0, 58%, 48%)",
    detail: "Larger terminal branch of the popliteal artery. Descends in the deep posterior compartment between tibialis posterior and FDL. Passes posterior to the medial malleolus (in the tarsal tunnel with the tibial nerve). Divides into medial and lateral plantar arteries. Accompanied by venae comitantes and the tibial nerve.",
    clinicalNote: "Posterior tibial pulse palpated posterior to the medial malleolus — key peripheral pulse in vascular assessment. Absent posterior tibial pulse suggests significant peripheral arterial disease. Used for arterial cannulation (alternative to radial/dorsalis pedis). At risk in medial malleolus fractures."
  },
  peroneal: {
    label: "Peroneal (Fibular) Artery",
    color: "hsl(0, 50%, 52%)",
    detail: "Branch of the posterior tibial artery. Descends in the deep posterior compartment close to the fibula, between tibialis posterior and flexor hallucis longus. Supplies the lateral compartment muscles via perforating branches. Gives a perforating branch that anastomoses with the anterior tibial artery at the ankle.",
    clinicalNote: "The peroneal artery is the 'artery of preservation' — it may be the only patent vessel below the knee in severe peripheral vascular disease when the anterior and posterior tibial arteries are occluded. Peroneal artery perforator flaps are used in lower limb reconstruction."
  },
  "dorsalis-pedis": {
    label: "Dorsalis Pedis Artery",
    color: "hsl(0, 62%, 48%)",
    detail: "Continuation of the anterior tibial artery at the ankle. Passes over the navicular and cuneiform bones on the dorsum of the foot, between EHL and EDL tendons. Gives the arcuate artery (dorsal metatarsal arteries) and the deep plantar artery (penetrates first interosseous space to complete the plantar arch).",
    clinicalNote: "Dorsalis pedis pulse palpated lateral to EHL tendon on the dorsum of the foot. Absent in 5–12% of normal individuals (congenital variant). Used for arterial cannulation in paediatrics and when radial is unavailable. Assessment of pedal pulses is critical in diabetic foot examination and peripheral vascular disease screening."
  },
  "medial-plantar": {
    label: "Medial Plantar Artery",
    color: "hsl(0, 48%, 52%)",
    detail: "Smaller terminal branch of the posterior tibial artery. Runs along the medial side of the sole of the foot with the medial plantar nerve. Supplies the medial three toes. Equivalent of the radial artery in the hand.",
    clinicalNote: "The medial plantar artery flap is a workhorse flap for heel reconstruction — provides glabrous (hairless, weight-bearing) skin. The medial plantar nerve must be preserved to maintain heel sensation."
  },
  "lateral-plantar": {
    label: "Lateral Plantar Artery",
    color: "hsl(0, 50%, 50%)",
    detail: "Larger terminal branch of the posterior tibial artery. Crosses the sole obliquely to the base of the 5th metatarsal, then turns medially to form the deep plantar arch (completed by the deep plantar artery from dorsalis pedis). Accompanied by the lateral plantar nerve. Supplies plantar metatarsal and digital arteries.",
    clinicalNote: "The deep plantar arch (lateral plantar + dorsalis pedis) is the lower limb equivalent of the deep palmar arch. Complete in ~80% of feet. Diabetic foot ulcers on the plantar surface may involve the plantar arteries — angiography/duplex assessment is essential before debridement."
  }
};

const categories = {
  proximal: { label: "Iliac & Femoral", keys: ["external-iliac", "femoral", "profunda-femoris", "circumflex-femoral"] as ArteryKey[] },
  knee: { label: "Knee Region", keys: ["popliteal", "genicular"] as ArteryKey[] },
  leg: { label: "Below Knee", keys: ["anterior-tibial", "posterior-tibial", "peroneal"] as ArteryKey[] },
  foot: { label: "Foot", keys: ["dorsalis-pedis", "medial-plantar", "lateral-plantar"] as ArteryKey[] },
};

const LowerLimbArteriesDiagram = () => {
  const [selected, setSelected] = useState<ArteryKey>("femoral");
  const [showSutures, setShowSutures] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const info = arteries[selected];
  const isActive = (k: ArteryKey) => selected === k;

  return (
    <DiagramFigure
      id="lower-limb-arteries-diagram"
      title="Lower limb arteries"
      description="Auto-generated wrapper for the Lower limb arteries anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="Arterial supply of the lower limb"
            subtitle="Tap any vessel to explore its course and clinical relevance"
            toggles={[
              { label: "Sutures", active: showSutures, onChange: () => setShowSutures((s) => !s) },
              { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
            ]}
          />
  
          <div className="flex flex-col lg:flex-row gap-4 items-start">
          <div className="flex-shrink-0 mx-auto">
            <svg viewBox="0 0 200 580" className="w-full max-w-[220px]" role="img" aria-label="Arterial supply of the lower limb from external iliac to plantar arches">
              <defs>
                <radialGradient id="lla-bgShade" cx="50%" cy="40%" r="65%">
                  <stop offset="0%" stopColor="hsl(var(--anatomy))" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="hsl(var(--anatomy))" stopOpacity="0.03" />
                </radialGradient>
                <pattern id="lla-tissue" patternUnits="userSpaceOnUse" width="6" height="6">
                  <circle cx="1" cy="1" r="0.4" fill="hsl(var(--muted-foreground))" opacity="0.18" />
                </pattern>
                <filter id="lla-shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
                  <feOffset dx="0" dy="1.2" result="off" />
                  <feComponentTransfer><feFuncA type="linear" slope="0.28" /></feComponentTransfer>
                  <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
  
              <rect x="2" y="2" width="196" height="576" rx="10" fill="url(#lla-bgShade)" stroke="hsl(var(--border))" strokeWidth="0.5" />
              {showSutures && <rect x="2" y="2" width="196" height="576" rx="10" fill="url(#lla-tissue)" pointerEvents="none" />}
  
              {/* Leg outline */}
              <path d="M65,15 Q55,80 55,150 Q52,220 50,280 Q48,340 45,400 Q42,440 38,480 Q35,510 30,550" fill="none" stroke="hsl(var(--border))" strokeWidth="0.75" opacity="0.4" />
              <path d="M135,15 Q145,80 145,150 Q148,220 150,280 Q152,340 148,400 Q145,440 140,480 Q135,510 125,550" fill="none" stroke="hsl(var(--border))" strokeWidth="0.75" opacity="0.4" />
  
              {showSutures && (
                <g pointerEvents="none">
                  <line x1="40" y1="30" x2="160" y2="30" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.35" />
                  <line x1="40" y1="280" x2="160" y2="280" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.35" />
                  <line x1="35" y1="460" x2="145" y2="460" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.35" />
                </g>
              )}
              {showLabels && (
                <g pointerEvents="none">
                  <text x="165" y="33" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.55" fontWeight="600">Inguinal lig.</text>
                  <text x="165" y="283" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.55" fontWeight="600">Knee</text>
                  <text x="150" y="463" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.55" fontWeight="600">Ankle</text>
                </g>
              )}
  
              {/* External iliac */}
              <g className="cursor-pointer" onClick={() => setSelected("external-iliac")}>
                <path d="M80,5 Q85,15 90,28" fill="none" stroke={arteries["external-iliac"].color}
                  strokeWidth={isActive("external-iliac") ? 5 : 3.5} opacity={isActive("external-iliac") ? 0.8 : 0.35} strokeLinecap="round" />
                <text x="55" y="12" fontSize="5" fill={arteries["external-iliac"].color} textAnchor="end">Ext. iliac</text>
              </g>
  
              {/* Femoral */}
              <g className="cursor-pointer" onClick={() => setSelected("femoral")}>
                <path d="M90,28 Q92,80 93,130 Q94,180 95,220 Q95,240 95,260" fill="none" stroke={arteries.femoral.color}
                  strokeWidth={isActive("femoral") ? 4.5 : 3} opacity={isActive("femoral") ? 0.8 : 0.4} strokeLinecap="round" />
                <text x="100" y="140" fontSize="5.5" fill={arteries.femoral.color} fontWeight="bold">Femoral A.</text>
                <text x="100" y="250" fontSize="4" fill={arteries.femoral.color} opacity="0.5">→ adductor hiatus</text>
              </g>
  
              {/* Profunda femoris */}
              <g className="cursor-pointer" onClick={() => setSelected("profunda-femoris")}>
                <path d="M92,55 Q100,80 108,120 Q115,160 118,200 Q120,230 118,260" fill="none" stroke={arteries["profunda-femoris"].color}
                  strokeWidth={isActive("profunda-femoris") ? 3 : 2} opacity={isActive("profunda-femoris") ? 0.7 : 0.3} strokeLinecap="round" />
                {/* Perforating branches */}
                {[100, 140, 180, 220].map((y, i) => (
                  <line key={i} x1={105 + i * 3} y1={y} x2={120 + i * 2} y2={y + 10}
                    stroke={arteries["profunda-femoris"].color} strokeWidth="0.75" opacity="0.25" />
                ))}
                <text x="125" y="150" fontSize="4.5" fill={arteries["profunda-femoris"].color}>Profunda</text>
                <text x="125" y="157" fontSize="4.5" fill={arteries["profunda-femoris"].color}>femoris</text>
              </g>
  
              {/* Circumflex femoral */}
              <g className="cursor-pointer" onClick={() => setSelected("circumflex-femoral")}>
                <path d="M93,50 Q80,55 70,65 Q62,75 60,85" fill="none" stroke={arteries["circumflex-femoral"].color}
                  strokeWidth={isActive("circumflex-femoral") ? 2 : 1.2} opacity={isActive("circumflex-femoral") ? 0.7 : 0.25} strokeLinecap="round" />
                <path d="M95,55 Q108,60 118,68 Q128,78 130,90" fill="none" stroke={arteries["circumflex-femoral"].color}
                  strokeWidth={isActive("circumflex-femoral") ? 2 : 1.2} opacity={isActive("circumflex-femoral") ? 0.7 : 0.25} strokeLinecap="round" />
                <text x="50" y="82" fontSize="4" fill={arteries["circumflex-femoral"].color} textAnchor="end">MCFA</text>
                <text x="135" y="88" fontSize="4" fill={arteries["circumflex-femoral"].color}>LCFA</text>
              </g>
  
              {/* Popliteal */}
              <g className="cursor-pointer" onClick={() => setSelected("popliteal")}>
                <path d="M95,260 Q94,275 93,290 Q92,305 91,318" fill="none" stroke={arteries.popliteal.color}
                  strokeWidth={isActive("popliteal") ? 4 : 2.5} opacity={isActive("popliteal") ? 0.8 : 0.4} strokeLinecap="round" />
                <text x="65" y="295" fontSize="5" fill={arteries.popliteal.color} textAnchor="end" fontWeight="bold">Popliteal</text>
              </g>
  
              {/* Genicular */}
              <g className="cursor-pointer" onClick={() => setSelected("genicular")}>
                {[-15, -8, 8, 15].map((dx, i) => (
                  <line key={i} x1={93} y1={275 + i * 3} x2={93 + dx * 2} y2={278 + i * 3}
                    stroke={arteries.genicular.color}
                    strokeWidth={isActive("genicular") ? 1.5 : 0.8}
                    opacity={isActive("genicular") ? 0.6 : 0.2} />
                ))}
                <text x="130" y="275" fontSize="4" fill={arteries.genicular.color}>Genicular</text>
              </g>
  
              {/* Bifurcation */}
              <circle cx="91" cy="320" r="2" fill={arteries.popliteal.color} fillOpacity="0.4" />
  
              {/* Anterior tibial */}
              <g className="cursor-pointer" onClick={() => setSelected("anterior-tibial")}>
                <path d="M91,320 Q85,350 80,390 Q76,420 73,450 Q70,465 68,475" fill="none" stroke={arteries["anterior-tibial"].color}
                  strokeWidth={isActive("anterior-tibial") ? 3 : 2} opacity={isActive("anterior-tibial") ? 0.8 : 0.35} strokeLinecap="round" />
                <text x="58" y="400" fontSize="4.5" fill={arteries["anterior-tibial"].color} textAnchor="end">Ant. tibial</text>
              </g>
  
              {/* Posterior tibial */}
              <g className="cursor-pointer" onClick={() => setSelected("posterior-tibial")}>
                <path d="M91,320 Q95,360 97,400 Q98,430 96,460 Q92,480 85,500" fill="none" stroke={arteries["posterior-tibial"].color}
                  strokeWidth={isActive("posterior-tibial") ? 3 : 2} opacity={isActive("posterior-tibial") ? 0.8 : 0.35} strokeLinecap="round" />
                <text x="105" y="410" fontSize="4.5" fill={arteries["posterior-tibial"].color}>Post. tibial</text>
              </g>
  
              {/* Peroneal */}
              <g className="cursor-pointer" onClick={() => setSelected("peroneal")}>
                <path d="M94,335 Q100,370 105,410 Q108,435 107,455" fill="none" stroke={arteries.peroneal.color}
                  strokeWidth={isActive("peroneal") ? 2.5 : 1.5} opacity={isActive("peroneal") ? 0.7 : 0.25}
                  strokeDasharray="4 2" strokeLinecap="round" />
                <text x="115" y="440" fontSize="4" fill={arteries.peroneal.color}>Peroneal</text>
              </g>
  
              {/* Dorsalis pedis */}
              <g className="cursor-pointer" onClick={() => setSelected("dorsalis-pedis")}>
                <path d="M68,475 Q65,490 60,510 Q55,530 50,545" fill="none" stroke={arteries["dorsalis-pedis"].color}
                  strokeWidth={isActive("dorsalis-pedis") ? 2.5 : 1.5} opacity={isActive("dorsalis-pedis") ? 0.7 : 0.3} strokeLinecap="round" />
                <text x="40" y="525" fontSize="4.5" fill={arteries["dorsalis-pedis"].color} textAnchor="end">Dorsalis</text>
                <text x="40" y="532" fontSize="4.5" fill={arteries["dorsalis-pedis"].color} textAnchor="end">pedis</text>
              </g>
  
              {/* Plantar arteries */}
              <g className="cursor-pointer" onClick={() => setSelected("medial-plantar")}>
                <path d="M85,500 Q78,520 70,535 Q60,545 50,548" fill="none" stroke={arteries["medial-plantar"].color}
                  strokeWidth={isActive("medial-plantar") ? 2 : 1} opacity={isActive("medial-plantar") ? 0.6 : 0.2} strokeLinecap="round" />
                <text x="60" y="555" fontSize="3.5" fill={arteries["medial-plantar"].color}>Med. plantar</text>
              </g>
  
              <g className="cursor-pointer" onClick={() => setSelected("lateral-plantar")}>
                <path d="M85,500 Q90,520 95,535 Q100,545 105,550" fill="none" stroke={arteries["lateral-plantar"].color}
                  strokeWidth={isActive("lateral-plantar") ? 2 : 1} opacity={isActive("lateral-plantar") ? 0.6 : 0.2} strokeLinecap="round" />
                {/* Plantar arch */}
                <path d="M105,550 Q90,555 70,552 Q55,550 50,548" fill="none" stroke={arteries["lateral-plantar"].color}
                  strokeWidth="0.75" opacity="0.2" strokeDasharray="3 2" />
                <text x="108" y="548" fontSize="3.5" fill={arteries["lateral-plantar"].color}>Lat. plantar</text>
                <text x="80" y="565" fontSize="3.5" fill={arteries["lateral-plantar"].color} textAnchor="middle" opacity="0.5">plantar arch</text>
              </g>
  
              {/* Orientation */}
              <text x="100" y="577" fontSize="5" textAnchor="middle" fill="hsl(var(--muted-foreground))" opacity="0.3" fontStyle="italic">Anterior view</text>
            </svg>
          </div>
  
          <div className="flex-1 min-w-0">
            <div
              className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5 min-h-[110px]"
              style={{ borderLeftWidth: 4, borderLeftColor: info.color }}
              key={selected}
            >
              <p className="font-semibold text-foreground text-sm">{info.label}</p>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Anatomy:</span> {info.detail}
              </p>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Clinical:</span> {info.clinicalNote}
              </p>
            </div>
  
            <div className="mt-3 space-y-2">
              {Object.values(categories).map(cat => (
                <div key={cat.label}>
                  <p className="text-xs text-muted-foreground font-medium mb-1">{cat.label}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.keys.map(key => (
                      <button key={key} onClick={() => setSelected(key)}
                        className={`text-xs px-2 py-1 rounded border transition-all ${
                          selected === key ? "border-primary bg-primary/10 text-foreground font-medium" : "border-border text-muted-foreground hover:border-primary/50"
                        }`}>
                        {arteries[key].label.split(" (")[0]}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default LowerLimbArteriesDiagram;
