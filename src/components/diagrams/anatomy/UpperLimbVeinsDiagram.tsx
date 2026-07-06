import { useState } from "react";
import { DiagramToggleBar } from "@/components/diagrams/shared/DiagramToggleBar";
import { DiagramFigure } from "../_shared/DiagramFigure";

type VeinKey = "cephalic" | "basilic" | "median-cubital" | "median-forearm" | "axillary" | "subclavian" | "brachiocephalic" | "deep-veins" | "dorsal-venous" | "external-jugular";

interface Vein {
  label: string;
  color: string;
  detail: string;
  clinicalNote: string;
}

const veins: Record<VeinKey, Vein> = {
  "dorsal-venous": {
    label: "Dorsal Venous Network",
    color: "hsl(220, 55%, 55%)",
    detail: "Formed on the dorsum of the hand by dorsal metacarpal veins. The cephalic vein arises from the lateral (radial) side and the basilic vein from the medial (ulnar) side. The network is prominent and visible in most patients, especially with venous distension.",
    clinicalNote: "Common site for peripheral IV cannulation — visible, accessible, and in the non-dominant hand. Preferred in ambulatory patients and day surgery. Avoid in patients needing AV fistula formation (CKD) — preserve cephalic vein. Tourniquet and gravity enhance visibility."
  },
  cephalic: {
    label: "Cephalic Vein",
    color: "hsl(220, 60%, 50%)",
    detail: "Arises from the lateral (radial) side of the dorsal venous network. Ascends along the lateral forearm, crosses the 'anatomical snuffbox' at the wrist. In the arm, runs in the lateral bicipital groove between deltoid and pectoralis major (deltopectoral groove). Pierces the clavipectoral fascia to drain into the axillary vein.",
    clinicalNote: "Passes through the deltopectoral groove — classic site for cephalic vein cutdown (emergency access). PICC line insertion via the cephalic vein is possible but the acute angle at the deltopectoral groove may cause difficulty advancing. Used for cephalic vein transposition AV fistula in haemodialysis patients."
  },
  basilic: {
    label: "Basilic Vein",
    color: "hsl(220, 55%, 48%)",
    detail: "Arises from the medial (ulnar) side of the dorsal venous network. Ascends along the medial forearm. Pierces the deep fascia at mid-arm level, joining the venae comitantes (paired deep veins accompanying the brachial artery) to form the axillary vein at the lower border of teres major.",
    clinicalNote: "PREFERRED site for PICC line insertion — large calibre, relatively straight course to the central veins. Typically larger than the cephalic vein. Basilic vein transposition for AV fistula is a well-established technique. The medial cutaneous nerve of the forearm runs nearby — risk of injury during access."
  },
  "median-cubital": {
    label: "Median Cubital Vein",
    color: "hsl(220, 65%, 52%)",
    detail: "Connects the cephalic vein (lateral) to the basilic vein (medial) obliquely across the cubital fossa. Runs superficial to the bicipital aponeurosis (lacertus fibrosus). Variable anatomy — H-pattern, M-pattern, or single oblique connection. Fixed in position by perforating veins to the deep venous system.",
    clinicalNote: "The most common site for venepuncture and blood sampling worldwide — large, superficial, and protected by the bicipital aponeurosis from the brachial artery beneath. Avoid deep needling — brachial artery lies 5–10 mm deep. If absent, use cephalic or basilic vein directly."
  },
  "median-forearm": {
    label: "Median Forearm Vein",
    color: "hsl(220, 50%, 55%)",
    detail: "Ascends in the midline of the anterior forearm. Variable — may drain into the median cubital vein, split into median cephalic and median basilic veins (forming an M-pattern), or be absent. When present, it provides an additional venepuncture option.",
    clinicalNote: "Alternative site for peripheral IV cannulation in the forearm. Often visible in thin patients. Less reliable than the cephalic or basilic due to anatomical variability. In some patients, the median forearm vein is the dominant pattern, replacing the median cubital vein."
  },
  "deep-veins": {
    label: "Deep Veins (Venae Comitantes)",
    color: "hsl(240, 45%, 45%)",
    detail: "Paired veins (venae comitantes) that accompany the major arteries of the upper limb — radial, ulnar, and brachial arteries. They have frequent interconnections and valves. The brachial venae comitantes merge with the basilic vein to form the axillary vein. Deep veins are responsible for the majority of venous return from the limb.",
    clinicalNote: "Upper limb DVT is increasingly recognised, especially with PICC lines, central venous catheters, and in cancer patients (Paget-Schroetter syndrome in effort thrombosis). Upper limb DVT accounts for ~10% of all DVTs. Diagnosis by compression ultrasound. May lead to PE. Anticoagulation is the mainstay of treatment."
  },
  axillary: {
    label: "Axillary Vein",
    color: "hsl(230, 55%, 48%)",
    detail: "Formed by the union of the basilic vein and the brachial venae comitantes at the lower border of teres major. Receives the cephalic vein through the clavipectoral fascia. Lies medial and inferior to the axillary artery. Three parts (like the artery) divided by pectoralis minor. Becomes the subclavian vein at the lateral border of the first rib.",
    clinicalNote: "Axillary vein cannulation (first rib approach) is an alternative to subclavian or IJV for central venous access — lower pneumothorax risk than subclavian, compressible against the humerus. Axillary vein thrombosis may follow vigorous exercise (Paget-Schroetter syndrome) or catheter placement."
  },
  subclavian: {
    label: "Subclavian Vein",
    color: "hsl(230, 60%, 45%)",
    detail: "Continuation of the axillary vein from the lateral border of the first rib. Passes anterior to scalenus anterior (and the scalene tubercle) and the subclavian artery. Joins the IJV behind the sternoclavicular joint to form the brachiocephalic vein. Contains a valve near the IJV junction. Receives the external jugular vein.",
    clinicalNote: "Subclavian vein cannulation: infraclavicular approach, needle aimed towards sternal notch. Advantages: comfortable for patient, low infection rate for long-term access. Risks: pneumothorax (1–6%), haemothorax, subclavian artery puncture, thoracic duct injury (left side). Non-compressible — avoid in coagulopathy."
  },
  brachiocephalic: {
    label: "Brachiocephalic (Innominate) Veins",
    color: "hsl(240, 50%, 42%)",
    detail: "Formed by the union of the subclavian and internal jugular veins behind the sternoclavicular joint. Left brachiocephalic vein is longer (~6 cm), crosses the midline anterior to the aortic arch branches. Right brachiocephalic is shorter (~2.5 cm), almost vertical. Both merge to form the SVC.",
    clinicalNote: "The left brachiocephalic vein is at risk during median sternotomy and superior mediastinal surgery. CVC tip should ideally lie in the lower SVC or at the cavoatrial junction — the brachiocephalic vein junction is a useful radiological landmark. Left-sided CVC tips may abut the lateral wall of the SVC → risk of perforation."
  },
  "external-jugular": {
    label: "External Jugular Vein",
    color: "hsl(220, 50%, 52%)",
    detail: "Formed by the union of the posterior auricular vein and the retromandibular vein posterior to the angle of the mandible. Crosses the sternocleidomastoid obliquely, superficial to the muscle. Pierces the deep fascia above the clavicle to drain into the subclavian vein.",
    clinicalNote: "Visible and accessible for emergency peripheral venous access when other sites fail. Distends with raised CVP (useful clinical sign of right heart failure or fluid overload). EJV cannulation for central access is technically possible but catheter advancement is often difficult due to valves and the acute angle at the subclavian junction."
  }
};

const veinOrder: VeinKey[] = [
  "dorsal-venous", "cephalic", "basilic", "median-forearm", "median-cubital",
  "deep-veins", "axillary", "subclavian", "brachiocephalic", "external-jugular"
];

const UpperLimbVeinsDiagram = () => {
  const [selected, setSelected] = useState<VeinKey>("median-cubital");
  const [showSutures, setShowSutures] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const info = veins[selected];
  const isActive = (k: VeinKey) => selected === k;
  const blue = "hsl(220, 60%, 50%)";

  return (
    <DiagramFigure
      id="upper-limb-veins-diagram"
      title="Upper limb veins"
      description="Auto-generated wrapper for the Upper limb veins anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="Venous drainage of the upper limb"
            subtitle="Superficial and deep venous systems with clinical correlations"
            toggles={[
              { label: "Sutures", active: showSutures, onChange: () => setShowSutures((s) => !s) },
              { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
            ]}
          />
  
          <div className="flex flex-col lg:flex-row gap-4 items-start">
          <div className="flex-shrink-0 mx-auto">
            <svg viewBox="0 0 220 500" className="w-full max-w-[240px]" role="img" aria-label="Venous drainage of the upper limb showing superficial and deep systems">
              <defs>
                <radialGradient id="ulv-bgShade" cx="50%" cy="40%" r="65%">
                  <stop offset="0%" stopColor="hsl(220, 50%, 30%)" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="hsl(220, 40%, 20%)" stopOpacity="0.03" />
                </radialGradient>
                <pattern id="ulv-tissue" patternUnits="userSpaceOnUse" width="6" height="6">
                  <circle cx="1" cy="1" r="0.4" fill="hsl(var(--muted-foreground))" opacity="0.18" />
                </pattern>
                <filter id="ulv-shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
                  <feOffset dx="0" dy="1.2" result="off" />
                  <feComponentTransfer><feFuncA type="linear" slope="0.26" /></feComponentTransfer>
                  <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
  
              <rect x="2" y="2" width="216" height="496" rx="10" fill="url(#ulv-bgShade)" stroke="hsl(var(--border))" strokeWidth="0.5" />
              {showSutures && <rect x="2" y="2" width="216" height="496" rx="10" fill="url(#ulv-tissue)" pointerEvents="none" />}
  
              {/* Arm outline */}
              <path d="M60,20 Q50,80 50,140 Q48,200 45,250 Q40,300 35,350 Q30,400 25,440" fill="none" stroke="hsl(var(--border))" strokeWidth="0.75" opacity="0.4" />
              <path d="M160,20 Q170,80 170,140 Q172,200 175,250 Q178,300 180,350 Q182,400 185,440" fill="none" stroke="hsl(var(--border))" strokeWidth="0.75" opacity="0.4" />
  
              {showSutures && (
                <g pointerEvents="none">
                  <line x1="40" y1="240" x2="180" y2="240" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />
                  <line x1="35" y1="400" x2="175" y2="400" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4" />
                </g>
              )}
              {showLabels && (
                <g pointerEvents="none">
                  <text x="190" y="60" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.55" fontWeight="600">Axilla</text>
                  <text x="190" y="155" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.55" fontWeight="600">Arm</text>
                  <text x="185" y="243" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.55" fontWeight="600">Elbow</text>
                  <text x="190" y="330" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.55" fontWeight="600">Forearm</text>
                  <text x="180" y="403" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.55" fontWeight="600">Wrist</text>
                </g>
              )}
  
              {/* Brachiocephalic veins → SVC */}
              <g className="cursor-pointer" onClick={() => setSelected("brachiocephalic")}>
                <path d="M110,5 Q110,12 100,18" fill="none" stroke={veins.brachiocephalic.color}
                  strokeWidth={isActive("brachiocephalic") ? 5 : 3} opacity={isActive("brachiocephalic") ? 0.7 : 0.3} strokeLinecap="round" />
                <text x="115" y="10" fontSize="4.5" fill={veins.brachiocephalic.color}>→ SVC</text>
              </g>
  
              {/* Subclavian */}
              <g className="cursor-pointer" onClick={() => setSelected("subclavian")}>
                <path d="M100,18 Q90,22 80,28 Q70,33 65,38" fill="none" stroke={veins.subclavian.color}
                  strokeWidth={isActive("subclavian") ? 5 : 3.5} opacity={isActive("subclavian") ? 0.7 : 0.3} strokeLinecap="round" />
                <text x="60" y="25" fontSize="5" fill={veins.subclavian.color} textAnchor="end">Subclavian V.</text>
              </g>
  
              {/* EJV */}
              <g className="cursor-pointer" onClick={() => setSelected("external-jugular")}>
                <path d="M88,22 Q82,15 78,8 Q75,2 72,0" fill="none" stroke={veins["external-jugular"].color}
                  strokeWidth={isActive("external-jugular") ? 2.5 : 1.5} opacity={isActive("external-jugular") ? 0.6 : 0.2} strokeLinecap="round" />
                <text x="55" y="8" fontSize="4" fill={veins["external-jugular"].color} textAnchor="end">EJV →</text>
              </g>
  
              {/* Axillary */}
              <g className="cursor-pointer" onClick={() => setSelected("axillary")}>
                <path d="M65,38 Q68,55 72,75 Q75,90 80,105" fill="none" stroke={veins.axillary.color}
                  strokeWidth={isActive("axillary") ? 4.5 : 3} opacity={isActive("axillary") ? 0.7 : 0.3} strokeLinecap="round" />
                <text x="50" y="70" fontSize="5" fill={veins.axillary.color} textAnchor="end">Axillary</text>
              </g>
  
              {/* Cephalic vein - lateral, long course */}
              <g className="cursor-pointer" onClick={() => setSelected("cephalic")}>
                <path d="M72,48 Q80,55 95,70 Q105,90 110,120 Q115,160 118,200 Q120,230 125,260 Q130,300 135,340 Q140,370 143,400 Q145,420 148,440"
                  fill="none" stroke={veins.cephalic.color}
                  strokeWidth={isActive("cephalic") ? 3.5 : 2} opacity={isActive("cephalic") ? 0.7 : 0.3} strokeLinecap="round" />
                <text x="125" y="160" fontSize="5" fill={veins.cephalic.color}>Cephalic V.</text>
                <text x="72" y="55" fontSize="4" fill={veins.cephalic.color} textAnchor="end">↗ deltopectoral</text>
              </g>
  
              {/* Basilic vein - medial */}
              <g className="cursor-pointer" onClick={() => setSelected("basilic")}>
                <path d="M80,105 Q82,130 85,160 Q87,190 88,210 Q87,230 86,250 Q84,280 82,310 Q80,340 78,370 Q76,400 74,430 Q72,445 70,455"
                  fill="none" stroke={veins.basilic.color}
                  strokeWidth={isActive("basilic") ? 3.5 : 2} opacity={isActive("basilic") ? 0.7 : 0.3} strokeLinecap="round" />
                <text x="68" y="190" fontSize="5" fill={veins.basilic.color} textAnchor="end">Basilic V.</text>
                {/* Piercing fascia marker */}
                <circle cx="85" cy="160" r="2" fill={veins.basilic.color} fillOpacity={isActive("basilic") ? 0.5 : 0.2} />
                <text x="68" y="162" fontSize="4" fill={veins.basilic.color} textAnchor="end" opacity="0.6">pierces fascia</text>
              </g>
  
              {/* Median cubital vein */}
              <g className="cursor-pointer" onClick={() => setSelected("median-cubital")}>
                <path d="M118,225 Q105,222 90,225"
                  fill="none" stroke={veins["median-cubital"].color}
                  strokeWidth={isActive("median-cubital") ? 4 : 2.5} opacity={isActive("median-cubital") ? 0.8 : 0.35} strokeLinecap="round" />
                <text x="105" y="218" fontSize="5.5" textAnchor="middle" fill={veins["median-cubital"].color} fontWeight="bold">Median cubital</text>
              </g>
  
              {/* Median forearm vein */}
              <g className="cursor-pointer" onClick={() => setSelected("median-forearm")}>
                <path d="M105,235 Q108,280 110,330 Q112,370 113,400"
                  fill="none" stroke={veins["median-forearm"].color}
                  strokeWidth={isActive("median-forearm") ? 2.5 : 1.5} opacity={isActive("median-forearm") ? 0.6 : 0.2} strokeLinecap="round" />
                <text x="115" y="350" fontSize="4.5" fill={veins["median-forearm"].color}>Median forearm</text>
              </g>
  
              {/* Deep veins - dashed, deep */}
              <g className="cursor-pointer" onClick={() => setSelected("deep-veins")}>
                <path d="M95,110 Q97,160 100,210 Q102,260 104,310 Q106,350 108,390"
                  fill="none" stroke={veins["deep-veins"].color}
                  strokeWidth={isActive("deep-veins") ? 3 : 1.5} opacity={isActive("deep-veins") ? 0.5 : 0.15}
                  strokeDasharray="5 3" strokeLinecap="round" />
                <text x="98" y="270" fontSize="4.5" fill={veins["deep-veins"].color} opacity="0.7">Venae</text>
                <text x="98" y="278" fontSize="4.5" fill={veins["deep-veins"].color} opacity="0.7">comitantes</text>
              </g>
  
              {/* Dorsal venous network */}
              <g className="cursor-pointer" onClick={() => setSelected("dorsal-venous")}>
                <path d="M70,455 Q85,460 100,462 Q120,460 140,455 Q150,450 148,440" fill="none" stroke={veins["dorsal-venous"].color}
                  strokeWidth={isActive("dorsal-venous") ? 3 : 1.5} opacity={isActive("dorsal-venous") ? 0.6 : 0.25} strokeLinecap="round" />
                {/* Network pattern */}
                {[80, 95, 110, 125].map(x => (
                  <line key={x} x1={x} y1={462} x2={x-3} y2={485}
                    stroke={veins["dorsal-venous"].color} strokeWidth="1" opacity={isActive("dorsal-venous") ? 0.4 : 0.15} />
                ))}
                <text x="105" y="478" fontSize="5" textAnchor="middle" fill={veins["dorsal-venous"].color}>Dorsal venous network</text>
              </g>
  
              {/* Flow arrows */}
              <polygon points="108,12 112,18 104,18" fill={blue} opacity="0.3" />
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
              <p className="text-xs text-muted-foreground font-medium">Distal → Proximal</p>
              <div className="flex flex-wrap gap-1.5">
                {veinOrder.map(key => (
                  <button key={key} onClick={() => setSelected(key)}
                    className={`text-xs px-2 py-1 rounded border transition-all ${
                      selected === key ? "border-primary bg-primary/10 text-foreground font-medium" : "border-border text-muted-foreground hover:border-primary/50"
                    }`}>
                    {veins[key].label.split(" (")[0]}
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

export default UpperLimbVeinsDiagram;
