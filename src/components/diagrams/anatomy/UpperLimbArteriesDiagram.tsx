import { useState } from "react";
import { DiagramToggleBar } from "@/components/diagrams/shared/DiagramToggleBar";
import { DiagramFigure } from "./_shared/DiagramFigure";

type ArteryKey = "subclavian" | "axillary" | "brachial" | "profunda-brachii" | "radial" | "ulnar" | "anterior-interosseous" | "posterior-interosseous" | "superficial-palmar" | "deep-palmar" | "princeps-pollicis";

interface Artery {
  label: string;
  color: string;
  detail: string;
  clinicalNote: string;
}

const arteries: Record<ArteryKey, Artery> = {
  subclavian: {
    label: "Subclavian Artery",
    color: "hsl(0, 65%, 48%)",
    detail: "Origin: right from brachiocephalic trunk; left directly from aortic arch. Three parts divided by scalenus anterior. First part: vertebral, internal thoracic, thyrocervical trunk. Becomes axillary artery at the lateral border of the first rib.",
    clinicalNote: "First part gives rise to vertebral artery — at risk in subclavian steal syndrome. Internal thoracic artery (IMA) used for CABG. Subclavian artery palpated above clavicle in the interscalene groove."
  },
  axillary: {
    label: "Axillary Artery",
    color: "hsl(0, 60%, 50%)",
    detail: "Continuation of subclavian artery from lateral border of first rib to lower border of teres major. Three parts divided by pectoralis minor. Part 1: superior thoracic. Part 2: thoraco-acromial, lateral thoracic. Part 3: subscapular, anterior & posterior circumflex humeral. Cords of brachial plexus named by relation to Part 2.",
    clinicalNote: "Key landmark for infraclavicular brachial plexus block — cords surround Part 2. Axillary block targets terminal branches around Part 3. Axillary artery cannulation used for ECMO and intra-aortic balloon pump access."
  },
  brachial: {
    label: "Brachial Artery",
    color: "hsl(0, 60%, 52%)",
    detail: "Continuation of axillary artery from lower border of teres major. Runs medially in the arm, in the groove between biceps and medial intermuscular septum. Accompanied by median nerve — nerve crosses from lateral to medial over the artery mid-arm. Bifurcates into radial and ulnar arteries at the cubital fossa (level of the radial neck).",
    clinicalNote: "Used for non-invasive blood pressure measurement (auscultatory gap awareness). Site of Korotkoff sounds. Brachial artery cannulation for arterial blood gas sampling and invasive monitoring (alternative to radial). Risk of median nerve injury with medial approach to brachial artery."
  },
  "profunda-brachii": {
    label: "Profunda Brachii (Deep Brachial)",
    color: "hsl(0, 50%, 55%)",
    detail: "Largest branch of the brachial artery. Arises from the posteromedial aspect, accompanies the radial nerve in the spiral (radial) groove of the humerus between the medial and lateral heads of triceps. Gives superior and inferior collateral branches participating in the anastomosis around the elbow.",
    clinicalNote: "At risk with mid-shaft humeral fractures — together with the radial nerve (wrist drop). The elbow anastomosis (profunda brachii + superior/inferior ulnar collateral + radial/ulnar recurrent arteries) provides collateral supply if the brachial artery is occluded."
  },
  radial: {
    label: "Radial Artery",
    color: "hsl(0, 65%, 45%)",
    detail: "Smaller terminal branch of the brachial artery at the cubital fossa. Passes laterally under brachioradialis, then becomes superficial at the wrist between brachioradialis and flexor carpi radialis tendons. Crosses the anatomical snuffbox, passing between the two heads of the first dorsal interosseous to contribute to the deep palmar arch.",
    clinicalNote: "Most common site for arterial cannulation — superficial at wrist, collateral supply via ulnar artery. Allen's test assesses adequacy of ulnar collateral flow before cannulation. Radial artery harvest for CABG conduit — must confirm dual supply. Radial artery spasm is common — use smallest gauge cannula, avoid multiple attempts."
  },
  ulnar: {
    label: "Ulnar Artery",
    color: "hsl(0, 55%, 50%)",
    detail: "Larger terminal branch of brachial artery. Passes deep to pronator teres, then deep to flexor digitorum superficialis. Gives off the common interosseous artery (divides into anterior and posterior interosseous). Becomes superficial at the wrist lateral to flexor carpi ulnaris and pisiform. Forms the superficial palmar arch.",
    clinicalNote: "Dominant hand supply in most patients — the superficial palmar arch (ulnar-derived) is the main supply to the fingers. Ulnar artery cannulation is an alternative when radial is unavailable. Guyon's canal (between pisiform and hook of hamate) — site of ulnar nerve/artery compression."
  },
  "anterior-interosseous": {
    label: "Anterior Interosseous Artery",
    color: "hsl(0, 45%, 55%)",
    detail: "Branch of the common interosseous artery (from ulnar). Descends on the anterior surface of the interosseous membrane with the anterior interosseous nerve (branch of median). Supplies flexor pollicis longus, pronator quadratus, and the lateral part of flexor digitorum profundus.",
    clinicalNote: "Anterior interosseous syndrome (Kiloh-Nevin): loss of FPL and FDP to index finger — inability to make an 'OK' sign. Pure motor nerve — no sensory deficit. Can be confused with median nerve palsy."
  },
  "posterior-interosseous": {
    label: "Posterior Interosseous Artery",
    color: "hsl(0, 40%, 58%)",
    detail: "Branch of the common interosseous artery. Passes posteriorly through the gap above the proximal border of the interosseous membrane. Accompanies the posterior interosseous nerve (deep branch of radial) in the posterior compartment. Supplies extensor muscles of the forearm.",
    clinicalNote: "Posterior interosseous flap (reverse-flow) used for hand/wrist soft tissue coverage. The posterior interosseous nerve can be compressed at the arcade of Frohse (supinator) causing PIN syndrome — pure motor, no wrist drop (ECRB spared)."
  },
  "superficial-palmar": {
    label: "Superficial Palmar Arch",
    color: "hsl(0, 55%, 52%)",
    detail: "Formed mainly by the ulnar artery, completed by the superficial palmar branch of the radial artery. Lies deep to the palmar aponeurosis but superficial to the flexor tendons and digital nerves. Level: distal border of the extended thumb. Gives off common palmar digital arteries → proper palmar digital arteries.",
    clinicalNote: "The superficial arch is incomplete in ~20% of people — relevant when planning palmar surgery or assessing hand perfusion. Lies superficial to median nerve → at risk in carpal tunnel decompression if the arch is aberrant."
  },
  "deep-palmar": {
    label: "Deep Palmar Arch",
    color: "hsl(0, 60%, 45%)",
    detail: "Formed mainly by the radial artery (after passing through the anatomical snuffbox and between heads of first dorsal interosseous), completed by the deep palmar branch of the ulnar artery. Lies deep to flexor tendons on the bases of metacarpals. Level: proximal transverse crease. Gives off palmar metacarpal arteries.",
    clinicalNote: "The deep arch is complete in ~97% of people — more reliable than the superficial arch. Both arches provide redundancy — the basis for Allen's test safety assessment before radial artery cannulation or harvest."
  },
  "princeps-pollicis": {
    label: "Princeps Pollicis & Radialis Indicis",
    color: "hsl(0, 50%, 50%)",
    detail: "Princeps pollicis arises from the radial artery as it enters the deep palm — supplies both sides of the thumb. Radialis indicis arises nearby, supplying the lateral side of the index finger. These are the first digital branches and arise before the deep palmar arch is formed.",
    clinicalNote: "Important in replantation surgery and thumb reconstruction. The princeps pollicis is an end artery for the thumb — injury causes ischaemia. Both arise from the radial artery, not the palmar arches."
  }
};

const arteryOrder: ArteryKey[] = [
  "subclavian", "axillary", "brachial", "profunda-brachii",
  "radial", "ulnar", "anterior-interosseous", "posterior-interosseous",
  "superficial-palmar", "deep-palmar", "princeps-pollicis"
];

const UpperLimbArteriesDiagram = () => {
  const [selected, setSelected] = useState<ArteryKey>("brachial");
  const [showSutures, setShowSutures] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const info = arteries[selected];
  const isActive = (k: ArteryKey) => selected === k;

  return (
    <DiagramFigure
      id="upper-limb-arteries-diagram"
      title="Upper limb arteries"
      description="Auto-generated wrapper for the Upper limb arteries anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="Arterial supply of the upper limb"
            subtitle="Tap any vessel to explore its course and clinical relevance"
            toggles={[
              { label: "Sutures", active: showSutures, onChange: () => setShowSutures((s) => !s) },
              { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
            ]}
          />
  
          <div className="flex flex-col lg:flex-row gap-4 items-start">
          <div className="flex-shrink-0 mx-auto">
            <svg viewBox="0 0 200 500" className="w-full max-w-[220px]" role="img" aria-label="Arterial supply of the upper limb from subclavian to digital arteries">
              <defs>
                <radialGradient id="ula-bgShade" cx="50%" cy="40%" r="65%">
                  <stop offset="0%" stopColor="hsl(var(--anatomy))" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="hsl(var(--anatomy))" stopOpacity="0.03" />
                </radialGradient>
                <pattern id="ula-tissue" patternUnits="userSpaceOnUse" width="6" height="6">
                  <circle cx="1" cy="1" r="0.4" fill="hsl(var(--muted-foreground))" opacity="0.18" />
                </pattern>
                <filter id="ula-shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
                  <feOffset dx="0" dy="1.2" result="off" />
                  <feComponentTransfer><feFuncA type="linear" slope="0.28" /></feComponentTransfer>
                  <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
  
              <rect x="2" y="2" width="196" height="496" rx="10" fill="url(#ula-bgShade)" stroke="hsl(var(--border))" strokeWidth="0.5" />
              {showSutures && <rect x="2" y="2" width="196" height="496" rx="10" fill="url(#ula-tissue)" pointerEvents="none" />}
  
              {/* Arm outline */}
              <path d="M70,10 Q50,80 55,150 Q57,200 60,250 Q55,300 50,350 Q45,380 30,450 M130,10 Q150,80 145,150 Q143,200 140,250 Q142,300 140,350 Q138,380 115,450" fill="none" stroke="hsl(var(--border))" strokeWidth="0.75" opacity="0.4" />
              {/* Compass + landmarks (gated by sutures) */}
              {showSutures && (
                <g pointerEvents="none">
                  <line x1="50" y1="230" x2="150" y2="230" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.45" />
                  <line x1="40" y1="390" x2="140" y2="390" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.45" />
                </g>
              )}
              {showLabels && (
                <g pointerEvents="none">
                  <text x="100" y="25" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.55" textAnchor="middle" fontWeight="600">SHOULDER</text>
                  <text x="155" y="233" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.55">Elbow</text>
                  <text x="145" y="393" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.55">Wrist</text>
                </g>
              )}
  
              {/* Subclavian */}
              <g className="cursor-pointer" onClick={() => setSelected("subclavian")}>
                <path d="M60,15 Q80,12 100,15" fill="none" stroke={arteries.subclavian.color}
                  strokeWidth={isActive("subclavian") ? 5 : 3.5} opacity={isActive("subclavian") ? 0.8 : 0.4} strokeLinecap="round" />
                <text x="60" y="10" fontSize="5" fill={arteries.subclavian.color}>Subclavian</text>
              </g>
  
              {/* Axillary */}
              <g className="cursor-pointer" onClick={() => setSelected("axillary")}>
                <path d="M100,15 Q100,40 100,70" fill="none" stroke={arteries.axillary.color}
                  strokeWidth={isActive("axillary") ? 4.5 : 3} opacity={isActive("axillary") ? 0.8 : 0.4} strokeLinecap="round" />
                <text x="108" y="45" fontSize="5" fill={arteries.axillary.color}>Axillary</text>
              </g>
  
              {/* Brachial */}
              <g className="cursor-pointer" onClick={() => setSelected("brachial")}>
                <path d="M100,70 Q98,120 97,170 Q96,200 95,225" fill="none" stroke={arteries.brachial.color}
                  strokeWidth={isActive("brachial") ? 4 : 2.5} opacity={isActive("brachial") ? 0.8 : 0.4} strokeLinecap="round" />
                <text x="103" y="150" fontSize="5" fill={arteries.brachial.color}>Brachial</text>
              </g>
  
              {/* Profunda brachii */}
              <g className="cursor-pointer" onClick={() => setSelected("profunda-brachii")}>
                <path d="M100,85 Q115,100 125,130 Q130,150 125,170" fill="none" stroke={arteries["profunda-brachii"].color}
                  strokeWidth={isActive("profunda-brachii") ? 2.5 : 1.5} opacity={isActive("profunda-brachii") ? 0.7 : 0.3} strokeLinecap="round" />
                <text x="130" y="120" fontSize="4.5" fill={arteries["profunda-brachii"].color}>Profunda</text>
                <text x="130" y="126" fontSize="4.5" fill={arteries["profunda-brachii"].color}>brachii</text>
              </g>
  
              {/* Bifurcation point */}
              <circle cx="95" cy="235" r="2.5" fill={arteries.brachial.color} fillOpacity="0.5" />
  
              {/* Radial */}
              <g className="cursor-pointer" onClick={() => setSelected("radial")}>
                <path d="M95,235 Q88,280 82,330 Q78,360 75,390 Q70,410 65,430" fill="none" stroke={arteries.radial.color}
                  strokeWidth={isActive("radial") ? 3 : 2} opacity={isActive("radial") ? 0.8 : 0.4} strokeLinecap="round" />
                <text x="60" y="320" fontSize="5" fill={arteries.radial.color}>Radial</text>
              </g>
  
              {/* Ulnar */}
              <g className="cursor-pointer" onClick={() => setSelected("ulnar")}>
                <path d="M95,235 Q102,280 108,330 Q112,360 115,390 Q118,410 120,430" fill="none" stroke={arteries.ulnar.color}
                  strokeWidth={isActive("ulnar") ? 3 : 2} opacity={isActive("ulnar") ? 0.8 : 0.4} strokeLinecap="round" />
                <text x="115" y="320" fontSize="5" fill={arteries.ulnar.color}>Ulnar</text>
              </g>
  
              {/* Common interosseous → anterior and posterior */}
              <g className="cursor-pointer" onClick={() => setSelected("anterior-interosseous")}>
                <path d="M100,255 Q97,290 95,340 Q94,360 93,385" fill="none" stroke={arteries["anterior-interosseous"].color}
                  strokeWidth={isActive("anterior-interosseous") ? 2 : 1} opacity={isActive("anterior-interosseous") ? 0.7 : 0.25} strokeLinecap="round" />
                <text x="96" y="355" fontSize="4" fill={arteries["anterior-interosseous"].color}>AIO</text>
              </g>
  
              <g className="cursor-pointer" onClick={() => setSelected("posterior-interosseous")}>
                <path d="M100,255 Q105,270 108,290 Q110,310 108,340" fill="none" stroke={arteries["posterior-interosseous"].color}
                  strokeWidth={isActive("posterior-interosseous") ? 2 : 1} opacity={isActive("posterior-interosseous") ? 0.7 : 0.25}
                  strokeDasharray="3 2" strokeLinecap="round" />
                <text x="112" y="300" fontSize="4" fill={arteries["posterior-interosseous"].color}>PIO</text>
              </g>
  
              {/* Superficial palmar arch */}
              <g className="cursor-pointer" onClick={() => setSelected("superficial-palmar")}>
                <path d="M120,430 Q110,450 95,455 Q80,450 70,440" fill="none" stroke={arteries["superficial-palmar"].color}
                  strokeWidth={isActive("superficial-palmar") ? 2.5 : 1.5} opacity={isActive("superficial-palmar") ? 0.7 : 0.3} strokeLinecap="round" />
                <text x="95" y="468" fontSize="4.5" textAnchor="middle" fill={arteries["superficial-palmar"].color}>Superficial arch</text>
              </g>
  
              {/* Deep palmar arch */}
              <g className="cursor-pointer" onClick={() => setSelected("deep-palmar")}>
                <path d="M65,430 Q75,438 90,440 Q105,438 115,430" fill="none" stroke={arteries["deep-palmar"].color}
                  strokeWidth={isActive("deep-palmar") ? 2 : 1} opacity={isActive("deep-palmar") ? 0.7 : 0.25}
                  strokeDasharray="4 2" strokeLinecap="round" />
                <text x="90" y="447" fontSize="4" textAnchor="middle" fill={arteries["deep-palmar"].color}>Deep arch</text>
              </g>
  
              {/* Digital arteries hint */}
              <g className="cursor-pointer" onClick={() => setSelected("princeps-pollicis")}>
                {[0,1,2,3].map(i => (
                  <line key={i} x1={75 + i*15} y1={455} x2={70 + i*15} y2={485}
                    stroke={arteries["princeps-pollicis"].color}
                    strokeWidth={isActive("princeps-pollicis") ? 1.5 : 0.8}
                    opacity={isActive("princeps-pollicis") ? 0.6 : 0.2} />
                ))}
                <text x="55" y="490" fontSize="4" fill={arteries["princeps-pollicis"].color}>Digital aa.</text>
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
  
            <div className="mt-3 space-y-1.5">
              <p className="text-xs text-muted-foreground font-medium">Proximal → Distal</p>
              <div className="flex flex-wrap gap-1.5">
                {arteryOrder.map(key => (
                  <button key={key} onClick={() => setSelected(key)}
                    className={`text-xs px-2 py-1 rounded border transition-all ${
                      selected === key ? "border-primary bg-primary/10 text-foreground font-medium" : "border-border text-muted-foreground hover:border-primary/50"
                    }`}>
                    {arteries[key].label.split(" (")[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default UpperLimbArteriesDiagram;
