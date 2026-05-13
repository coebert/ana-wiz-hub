import { useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";

type StructureKey = "biceps-tendon" | "brachial-artery" | "median-nerve" | "radial-nerve" | "bicipital-aponeurosis" | "musculocutaneous" | "cephalic-vein" | "basilic-vein" | "median-cubital-vein" | "pronator-teres" | "brachioradialis" | "supinator" | "radial-recurrent";

interface Structure {
  label: string;
  color: string;
  detail: string;
  clinicalNote: string;
}

const structures: Record<StructureKey, Structure> = {
  "biceps-tendon": {
    label: "Biceps Tendon",
    color: "hsl(25, 55%, 50%)",
    detail: "Tendon of biceps brachii inserts on the radial tuberosity. The most superficial deep structure in the cubital fossa and the key palpable landmark. The bicipital aponeurosis (lacertus fibrosus) arises from its medial side.",
    clinicalNote: "Palpate the biceps tendon to locate the brachial artery (immediately medial). 'TAN' mnemonic lateral to medial: Tendon, Artery, Nerve. The biceps tendon is the central landmark for all cubital fossa procedures."
  },
  "brachial-artery": {
    label: "Brachial Artery",
    color: "hsl(0, 65%, 48%)",
    detail: "Lies immediately MEDIAL to the biceps tendon in the cubital fossa. Bifurcates at the level of the radial neck into the radial (lateral) and ulnar (medial) arteries. The brachial artery pulse is palpable here. It is the artery auscultated for blood pressure measurement.",
    clinicalNote: "Site for arterial blood gas sampling (alternative to radial). Brachial artery catheterisation for invasive monitoring. Risk of pseudoaneurysm and median nerve injury. Supracondylar fractures in children can damage the brachial artery → Volkmann's ischaemic contracture."
  },
  "median-nerve": {
    label: "Median Nerve",
    color: "hsl(45, 65%, 48%)",
    detail: "Lies MEDIAL to the brachial artery in the cubital fossa (most medial of the three structures: TAN). Passes between the two heads of pronator teres to enter the forearm. Gives off the anterior interosseous nerve (pure motor) just distal to the fossa.",
    clinicalNote: "At risk during cubital fossa venepuncture — particularly if needle advanced too deep medially. Pronator teres syndrome: compression of the median nerve between the two heads — pain in the proximal forearm with resisted pronation. Distinguished from carpal tunnel by positive Tinel's at elbow."
  },
  "radial-nerve": {
    label: "Radial Nerve",
    color: "hsl(120, 45%, 45%)",
    detail: "Enters the cubital fossa LATERAL to the biceps tendon, between brachialis and brachioradialis. Divides into superficial (sensory) and deep (posterior interosseous, motor) branches at the level of the radial head. The deep branch passes through the supinator muscle (arcade of Frohse).",
    clinicalNote: "The radial nerve lies OUTSIDE the classic cubital fossa triangle but is closely related. Deep branch (PIN) compression at the arcade of Frohse → finger/thumb extension weakness WITHOUT wrist drop (ECRB spared). Superficial branch damage → numbness over the anatomical snuffbox."
  },
  "bicipital-aponeurosis": {
    label: "Bicipital Aponeurosis (Lacertus Fibrosus)",
    color: "hsl(30, 40%, 55%)",
    detail: "A strong fascial expansion from the medial side of the biceps tendon that sweeps across the cubital fossa to merge with the deep fascia of the forearm. Crosses superficial to the brachial artery and median nerve, providing a protective layer.",
    clinicalNote: "Protects the brachial artery and median nerve during venepuncture — the aponeurosis separates the superficial veins from the deep structures. Its presence is why median cubital vein venepuncture is safer than it appears — but deep needling can still reach the artery/nerve."
  },
  "cephalic-vein": {
    label: "Cephalic Vein",
    color: "hsl(220, 60%, 55%)",
    detail: "Ascends along the lateral border of the cubital fossa, lying over brachioradialis. Continues proximally in the deltopectoral groove to drain into the axillary vein. Communicates with the basilic vein via the median cubital vein across the cubital fossa.",
    clinicalNote: "Cephalic vein cutdown for emergency venous access at the wrist (anatomical snuffbox) or in the deltopectoral groove. PICC line insertion possible but more technically difficult than basilic vein due to the angle at the deltopectoral groove. The cephalic vein is the lateral-most superficial vein."
  },
  "basilic-vein": {
    label: "Basilic Vein",
    color: "hsl(220, 55%, 50%)",
    detail: "Ascends along the medial border of the cubital fossa. Pierces the deep fascia at mid-arm to join the venae comitantes of the brachial artery, forming the axillary vein at the lower border of teres major. The medial cutaneous nerve of the forearm runs alongside it.",
    clinicalNote: "Preferred site for PICC line insertion — large calibre, relatively straight course to the axillary/subclavian vein. The basilic vein is typically larger than the cephalic. Medial cutaneous nerve of forearm lies adjacent — can be injured during PICC insertion causing medial forearm numbness."
  },
  "median-cubital-vein": {
    label: "Median Cubital Vein",
    color: "hsl(220, 65%, 52%)",
    detail: "Connects the cephalic vein (lateral) to the basilic vein (medial) across the cubital fossa. Runs superficial to the bicipital aponeurosis. Most prominent and accessible vein in the cubital fossa. Variable anatomy — may be a single vein or replaced by median forearm vein pattern.",
    clinicalNote: "The most common site for venepuncture and blood sampling — large, superficial, and relatively fixed. The bicipital aponeurosis protects the underlying brachial artery, making this the safest large-calibre venepuncture site. However, the artery lies only 5–10 mm deep."
  },
  "pronator-teres": {
    label: "Pronator Teres",
    color: "hsl(180, 35%, 50%)",
    detail: "Forms the MEDIAL border of the cubital fossa. Two heads: humeral head (from the medial epicondyle) and ulnar head (from the coronoid process). The median nerve passes between the two heads. The ulnar artery passes deep to the muscle.",
    clinicalNote: "Medial border of the cubital fossa. The median nerve passes between its heads — site of pronator syndrome (compression neuropathy). Clinically distinguished from carpal tunnel: Tinel's positive at elbow, pain with resisted pronation, and proximal forearm symptoms."
  },
  brachioradialis: {
    label: "Brachioradialis",
    color: "hsl(160, 35%, 50%)",
    detail: "Forms the LATERAL border of the cubital fossa. Origin: upper 2/3 of the lateral supracondylar ridge of humerus. Despite being in the extensor compartment, it is a flexor of the semi-pronated forearm. Innervated by the radial nerve (C5,6) — the only 'extensor compartment' muscle that flexes.",
    clinicalNote: "Brachioradialis is tested clinically by resisted flexion with the forearm in mid-prone position. Its reflex (C5,6) is the radial/supinator reflex — inverted radial reflex suggests C5/6 myelopathy. In the forearm, the radial artery lies deep to it proximally and emerges lateral to it at the wrist."
  },
  supinator: {
    label: "Supinator & Floor of Fossa",
    color: "hsl(200, 30%, 55%)",
    detail: "The FLOOR of the cubital fossa is formed by supinator (laterally) and brachialis (medially/proximally). The supinator wraps around the proximal radius — the deep branch of the radial nerve (posterior interosseous nerve) passes through it at the arcade of Frohse.",
    clinicalNote: "The arcade of Frohse (proximal edge of supinator) is the most common site of posterior interosseous nerve compression. Supinator syndrome → weakness of finger/thumb extension without wrist drop. Important differential for lateral elbow pain (vs lateral epicondylitis)."
  },
  musculocutaneous: {
    label: "Lateral Cutaneous N. of Forearm",
    color: "hsl(50, 50%, 48%)",
    detail: "Terminal sensory branch of the musculocutaneous nerve. Emerges lateral to the biceps tendon at the cubital fossa, piercing the deep fascia. Supplies sensation to the lateral forearm from elbow to wrist.",
    clinicalNote: "Can be injured during lateral cubital fossa venepuncture or cephalic vein access — causes lateral forearm numbness. When performing axillary brachial plexus block, the musculocutaneous nerve has already left the sheath — must be blocked separately within coracobrachialis."
  },
  "radial-recurrent": {
    label: "Radial Recurrent Artery",
    color: "hsl(0, 50%, 55%)",
    detail: "Branch of the radial artery just after its origin. Ascends between the superficial and deep branches of the radial nerve, anterior to the lateral epicondyle. Anastomoses with the radial collateral artery (from profunda brachii) — part of the periarticular elbow anastomosis.",
    clinicalNote: "Part of the rich anastomotic network around the elbow that maintains blood supply if the main vessels are interrupted. Similar recurrent arteries arise from the ulnar side (anterior and posterior ulnar recurrent). This network is why elbow dislocations rarely cause critical ischaemia."
  }
};

const categories = {
  contents: { label: "Contents (TAN)", keys: ["biceps-tendon", "brachial-artery", "median-nerve"] as StructureKey[] },
  nerves: { label: "Other Nerves", keys: ["radial-nerve", "musculocutaneous"] as StructureKey[] },
  veins: { label: "Superficial Veins", keys: ["cephalic-vein", "basilic-vein", "median-cubital-vein"] as StructureKey[] },
  borders: { label: "Borders & Floor", keys: ["pronator-teres", "brachioradialis", "supinator"] as StructureKey[] },
  other: { label: "Other Structures", keys: ["bicipital-aponeurosis", "radial-recurrent"] as StructureKey[] },
};

const AntecubitalFossaDiagram = () => {
  const [selected, setSelected] = useState<StructureKey>("biceps-tendon");
  const [showSutures, setShowSutures] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const info = structures[selected];
  const isActive = (k: StructureKey) => selected === k;

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          title="Cubital fossa — anterior view"
          subtitle="Tap structures to explore anatomy. Contents medial → lateral: Nerve, Artery, Tendon (TAN)"
          toggles={[
            { label: "Sutures", active: showSutures, onChange: () => setShowSutures((s) => !s) },
            { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-4 items-start">
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox="0 0 300 340" className="w-full max-w-[320px]" role="img" aria-label="Anterior view of the cubital fossa with TAN contents and bordering muscles">
            <defs>
              <radialGradient id="acf-bgShade" cx="50%" cy="50%" r="65%">
                <stop offset="0%" stopColor="hsl(var(--anatomy))" stopOpacity="0.16" />
                <stop offset="100%" stopColor="hsl(var(--anatomy))" stopOpacity="0.03" />
              </radialGradient>
              <pattern id="acf-tissue" patternUnits="userSpaceOnUse" width="6" height="6">
                <circle cx="1" cy="1" r="0.4" fill="hsl(var(--muted-foreground))" opacity="0.18" />
              </pattern>
              <filter id="acf-shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
                <feOffset dx="0" dy="1.2" result="off" />
                <feComponentTransfer><feFuncA type="linear" slope="0.28" /></feComponentTransfer>
                <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            <rect x="2" y="2" width="296" height="336" rx="10" fill="url(#acf-bgShade)" stroke="hsl(var(--border))" strokeWidth="0.5" />
            {showSutures && <rect x="2" y="2" width="296" height="336" rx="10" fill="url(#acf-tissue)" pointerEvents="none" />}

            {/* Arm outline */}
            <path d="M90,10 Q80,60 75,120 Q70,160 60,200 Q55,240 50,280 Q48,300 45,330" fill="none" stroke="hsl(var(--border))" strokeWidth="0.75" opacity="0.4" />
            <path d="M210,10 Q220,60 225,120 Q228,160 235,200 Q238,240 240,280 Q242,300 245,330" fill="none" stroke="hsl(var(--border))" strokeWidth="0.75" opacity="0.4" />

            {/* Elbow crease */}
            {showSutures && (
              <path d="M70,155 Q150,148 230,155" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="4 3" opacity="0.45" />
            )}
            {showLabels && (
              <text x="240" y="150" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.55" fontWeight="600">Elbow crease</text>
            )}

            {/* Cubital fossa triangle */}
            {/* Pronator teres - medial border */}
            <g className="cursor-pointer" onClick={() => setSelected("pronator-teres")}>
              <path d="M150,150 L115,220 Q110,235 108,250"
                fill="none" stroke={structures["pronator-teres"].color}
                strokeWidth={isActive("pronator-teres") ? 8 : 5}
                opacity={isActive("pronator-teres") ? 0.4 : 0.15} strokeLinecap="round" />
              <text x="100" y="230" fontSize="5" fill={structures["pronator-teres"].color} fontWeight={isActive("pronator-teres") ? "bold" : "normal"}>Pronator</text>
              <text x="100" y="237" fontSize="5" fill={structures["pronator-teres"].color}>teres</text>
            </g>

            {/* Brachioradialis - lateral border */}
            <g className="cursor-pointer" onClick={() => setSelected("brachioradialis")}>
              <path d="M150,150 L190,220 Q195,240 198,260"
                fill="none" stroke={structures.brachioradialis.color}
                strokeWidth={isActive("brachioradialis") ? 8 : 5}
                opacity={isActive("brachioradialis") ? 0.4 : 0.15} strokeLinecap="round" />
              <text x="195" y="225" fontSize="5" fill={structures.brachioradialis.color} fontWeight={isActive("brachioradialis") ? "bold" : "normal"}>Brachio-</text>
              <text x="195" y="232" fontSize="5" fill={structures.brachioradialis.color}>radialis</text>
            </g>

            {/* Floor / supinator */}
            <g className="cursor-pointer" onClick={() => setSelected("supinator")}>
              <ellipse cx="155" cy="185" rx="30" ry="20"
                fill={structures.supinator.color}
                fillOpacity={isActive("supinator") ? 0.2 : 0.05}
                stroke={structures.supinator.color}
                strokeWidth={isActive("supinator") ? 1 : 0.5} />
              <text x="155" y="188" fontSize="4.5" textAnchor="middle" fill={structures.supinator.color}>Floor: brachialis / supinator</text>
            </g>

            {/* Bicipital aponeurosis */}
            <g className="cursor-pointer" onClick={() => setSelected("bicipital-aponeurosis")}>
              <path d="M150,145 Q140,155 120,165 Q105,175 95,180"
                fill="none" stroke={structures["bicipital-aponeurosis"].color}
                strokeWidth={isActive("bicipital-aponeurosis") ? 3 : 1.5}
                opacity={isActive("bicipital-aponeurosis") ? 0.6 : 0.2}
                strokeDasharray="5 3" />
              <text x="85" y="190" fontSize="4.5" fill={structures["bicipital-aponeurosis"].color} textAnchor="end">Lacertus fibrosus</text>
            </g>

            {/* Biceps tendon - central */}
            <g className="cursor-pointer" onClick={() => setSelected("biceps-tendon")}>
              <path d="M150,80 Q150,110 150,145 Q150,155 152,165"
                fill="none" stroke={structures["biceps-tendon"].color}
                strokeWidth={isActive("biceps-tendon") ? 5 : 3}
                opacity={isActive("biceps-tendon") ? 0.8 : 0.4} strokeLinecap="round" />
              <text x="158" y="120" fontSize="5.5" fill={structures["biceps-tendon"].color} fontWeight="bold">Biceps</text>
              <text x="158" y="128" fontSize="5.5" fill={structures["biceps-tendon"].color}>tendon</text>
            </g>

            {/* Brachial artery - medial to tendon */}
            <g className="cursor-pointer" onClick={() => setSelected("brachial-artery")}>
              <path d="M140,40 Q139,80 138,120 Q137,150 135,170"
                fill="none" stroke={structures["brachial-artery"].color}
                strokeWidth={isActive("brachial-artery") ? 4 : 2.5}
                opacity={isActive("brachial-artery") ? 0.8 : 0.4} strokeLinecap="round" />
              {/* Bifurcation */}
              <circle cx="135" cy="172" r="2" fill={structures["brachial-artery"].color} fillOpacity="0.5" />
              {/* Radial branch */}
              <path d="M135,172 Q145,200 160,230" fill="none" stroke={structures["brachial-artery"].color}
                strokeWidth="1.5" opacity="0.3" />
              {/* Ulnar branch */}
              <path d="M135,172 Q125,200 115,240" fill="none" stroke={structures["brachial-artery"].color}
                strokeWidth="1.5" opacity="0.3" />
              <text x="115" y="115" fontSize="5.5" fill={structures["brachial-artery"].color} fontWeight="bold" textAnchor="end">Brachial A.</text>
            </g>

            {/* Radial recurrent */}
            <g className="cursor-pointer" onClick={() => setSelected("radial-recurrent")}>
              <path d="M145,180 Q155,175 165,168 Q175,160 180,150"
                fill="none" stroke={structures["radial-recurrent"].color}
                strokeWidth={isActive("radial-recurrent") ? 2 : 1}
                opacity={isActive("radial-recurrent") ? 0.6 : 0.2} />
              <text x="180" y="145" fontSize="4" fill={structures["radial-recurrent"].color}>Radial recurrent</text>
            </g>

            {/* Median nerve - most medial */}
            <g className="cursor-pointer" onClick={() => setSelected("median-nerve")}>
              <path d="M130,40 Q130,80 130,120 Q129,150 128,175 Q125,200 120,240"
                fill="none" stroke={structures["median-nerve"].color}
                strokeWidth={isActive("median-nerve") ? 3 : 1.5}
                opacity={isActive("median-nerve") ? 0.8 : 0.35} strokeLinecap="round" />
              <text x="110" y="85" fontSize="5" fill={structures["median-nerve"].color} textAnchor="end" fontWeight="bold">Median N.</text>
            </g>

            {/* Radial nerve - lateral */}
            <g className="cursor-pointer" onClick={() => setSelected("radial-nerve")}>
              <path d="M170,80 Q168,110 166,140 Q164,155 162,165"
                fill="none" stroke={structures["radial-nerve"].color}
                strokeWidth={isActive("radial-nerve") ? 2.5 : 1.5}
                opacity={isActive("radial-nerve") ? 0.7 : 0.3} strokeLinecap="round" />
              {/* Bifurcation into superficial and deep */}
              <circle cx="162" cy="167" r="1.5" fill={structures["radial-nerve"].color} fillOpacity="0.5" />
              <path d="M162,167 Q170,185 178,210" fill="none" stroke={structures["radial-nerve"].color}
                strokeWidth="1" opacity="0.25" />
              <path d="M162,167 Q160,180 165,200" fill="none" stroke={structures["radial-nerve"].color}
                strokeWidth="1" opacity="0.25" strokeDasharray="2 2" />
              <text x="175" y="90" fontSize="5" fill={structures["radial-nerve"].color} fontWeight="bold">Radial N.</text>
              <text x="180" y="205" fontSize="4" fill={structures["radial-nerve"].color} opacity="0.6">superficial</text>
              <text x="165" y="205" fontSize="4" fill={structures["radial-nerve"].color} opacity="0.6">PIN</text>
            </g>

            {/* Lat cutaneous of forearm */}
            <g className="cursor-pointer" onClick={() => setSelected("musculocutaneous")}>
              <path d="M160,130 Q165,145 168,160 Q172,180 175,200"
                fill="none" stroke={structures.musculocutaneous.color}
                strokeWidth={isActive("musculocutaneous") ? 2 : 1}
                opacity={isActive("musculocutaneous") ? 0.7 : 0.25} strokeLinecap="round" />
              <text x="178" y="170" fontSize="4" fill={structures.musculocutaneous.color}>LCNF</text>
            </g>

            {/* Superficial veins */}
            {/* Cephalic vein - lateral */}
            <g className="cursor-pointer" onClick={() => setSelected("cephalic-vein")}>
              <path d="M200,280 Q195,240 192,200 Q190,160 195,110 Q198,80 200,50"
                fill="none" stroke={structures["cephalic-vein"].color}
                strokeWidth={isActive("cephalic-vein") ? 3 : 2}
                opacity={isActive("cephalic-vein") ? 0.6 : 0.2} strokeLinecap="round" />
              <text x="205" y="100" fontSize="5" fill={structures["cephalic-vein"].color}>Cephalic V.</text>
            </g>

            {/* Basilic vein - medial */}
            <g className="cursor-pointer" onClick={() => setSelected("basilic-vein")}>
              <path d="M100,280 Q105,240 108,200 Q110,160 107,110 Q105,80 103,50"
                fill="none" stroke={structures["basilic-vein"].color}
                strokeWidth={isActive("basilic-vein") ? 3 : 2}
                opacity={isActive("basilic-vein") ? 0.6 : 0.2} strokeLinecap="round" />
              <text x="85" y="100" fontSize="5" fill={structures["basilic-vein"].color} textAnchor="end">Basilic V.</text>
            </g>

            {/* Median cubital vein - connecting */}
            <g className="cursor-pointer" onClick={() => setSelected("median-cubital-vein")}>
              <path d="M190,145 Q165,135 140,130 Q120,128 108,135"
                fill="none" stroke={structures["median-cubital-vein"].color}
                strokeWidth={isActive("median-cubital-vein") ? 4 : 2.5}
                opacity={isActive("median-cubital-vein") ? 0.7 : 0.3} strokeLinecap="round" />
              <text x="150" y="120" fontSize="5.5" textAnchor="middle" fill={structures["median-cubital-vein"].color} fontWeight="bold">Median cubital V.</text>
            </g>

            {/* TAN label */}
            <g opacity="0.5">
              <text x="150" y="30" fontSize="6" textAnchor="middle" fill="hsl(var(--muted-foreground))">← Medial | Lateral →</text>
              <text x="125" y="48" fontSize="5" fill={structures["median-nerve"].color}>N</text>
              <text x="138" y="48" fontSize="5" fill={structures["brachial-artery"].color}>A</text>
              <text x="150" y="48" fontSize="5" fill={structures["biceps-tendon"].color}>T</text>
              <text x="165" y="48" fontSize="4.5" fill="hsl(var(--muted-foreground))">(medial → lateral)</text>
            </g>
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
                      {structures[key].label.split(" (")[0]}
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
  );
};

export default AntecubitalFossaDiagram;
