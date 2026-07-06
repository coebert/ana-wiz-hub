import { useState } from "react";
import { DiagramToggleBar } from "@/components/diagrams/shared/DiagramToggleBar";
import { DiagramFigure } from "./_shared/DiagramFigure";

type VeinKey = "great-saphenous" | "small-saphenous" | "femoral-vein" | "popliteal-vein" | "deep-veins-leg" | "external-iliac-vein" | "dorsal-venous-arch" | "perforators" | "saphenofemoral" | "saphenopopliteal";

interface Vein {
  label: string;
  color: string;
  detail: string;
  clinicalNote: string;
}

const veins: Record<VeinKey, Vein> = {
  "dorsal-venous-arch": {
    label: "Dorsal Venous Arch",
    color: "hsl(220, 55%, 55%)",
    detail: "Formed by the dorsal digital veins on the dorsum of the foot. The great saphenous vein arises from the medial end and the small saphenous vein from the lateral end. The arch receives blood from plantar veins via perforating veins between the metatarsals.",
    clinicalNote: "Visible veins on the dorsum of the foot are useful for peripheral IV cannulation, particularly in children. The great saphenous vein origin anterior to the medial malleolus is a predictable cutdown site (1 cm anterior and 1 cm superior to the medial malleolus)."
  },
  "great-saphenous": {
    label: "Great Saphenous Vein (GSV)",
    color: "hsl(220, 60%, 50%)",
    detail: "The longest vein in the body. Arises from the medial end of the dorsal venous arch. Passes anterior to the medial malleolus, ascends along the medial leg and thigh. Passes behind the medial femoral condyle. In the thigh, runs in the saphenous compartment (bounded by saphenous fascia). Drains into the femoral vein at the saphenofemoral junction (SFJ) in the groin, 3.5 cm below and lateral to the pubic tubercle.",
    clinicalNote: "The GSV is harvested for CABG conduit — long length, few valves. Saphenous cutdown at the ankle: landmark is 1 cm anterior + 1 cm superior to medial malleolus. The saphenous nerve accompanies the GSV below the knee — risk of nerve injury during stripping. Varicose veins: GSV incompetence is the most common cause."
  },
  "small-saphenous": {
    label: "Small Saphenous Vein (SSV)",
    color: "hsl(220, 55%, 52%)",
    detail: "Arises from the lateral end of the dorsal venous arch. Passes posterior to the lateral malleolus, ascends in the midline of the posterior calf between the two heads of gastrocnemius. Pierces the deep fascia in the popliteal fossa to drain into the popliteal vein at the saphenopopliteal junction (SPJ). The sural nerve runs adjacent to it.",
    clinicalNote: "SSV incompetence causes posterior calf varicose veins (~15% of varicose veins). The SPJ is variable in height (within 5 cm of the popliteal crease in 60%) — preoperative duplex marking is essential before surgery. Sural nerve injury is a risk of SSV stripping → lateral foot numbness."
  },
  "saphenofemoral": {
    label: "Saphenofemoral Junction (SFJ)",
    color: "hsl(230, 55%, 48%)",
    detail: "The GSV drains into the femoral vein at the SFJ in the groin. Located 3.5 cm below and lateral to the pubic tubercle, in the fossa ovalis. The SFJ receives several tributaries: superficial epigastric, superficial circumflex iliac, and external pudendal veins. A terminal valve and a pre-terminal valve guard the junction.",
    clinicalNote: "SFJ ligation and stripping was the traditional treatment for GSV varicose veins. Now largely replaced by endovenous thermal ablation (laser or radiofrequency) or foam sclerotherapy. Duplex ultrasound assessment of SFJ competence is mandatory before any varicose vein intervention."
  },
  "saphenopopliteal": {
    label: "Saphenopopliteal Junction (SPJ)",
    color: "hsl(230, 50%, 50%)",
    detail: "The SSV drains into the popliteal vein at the SPJ. The level of this junction is highly variable — may be at the level of the popliteal crease, above it, or may join a thigh perforator (Giacomini vein) instead. Duplex mapping before surgery is essential.",
    clinicalNote: "Failure to accurately identify SPJ height is the most common cause of recurrent SSV varicose veins after surgery. The SPJ lies in close proximity to the common peroneal nerve and the tibial nerve — both at risk during SPJ surgery."
  },
  "femoral-vein": {
    label: "Femoral Vein",
    color: "hsl(230, 55%, 45%)",
    detail: "Accompanies the femoral artery in the femoral sheath (medial compartment). Receives the GSV at the SFJ. Ascends through the femoral triangle and becomes the external iliac vein behind the inguinal ligament. In the femoral triangle, lies MEDIAL to the femoral artery (VAN: vein, artery, nerve — medial to lateral).",
    clinicalNote: "Femoral vein cannulation: medial to the femoral artery pulse. Used for central venous access, temporary dialysis catheters, and cardiac catheterisation. Higher infection rate than subclavian/IJV for long-term access. Femoral DVT is the most common lower limb DVT site."
  },
  "popliteal-vein": {
    label: "Popliteal Vein",
    color: "hsl(230, 50%, 48%)",
    detail: "Formed by the union of the anterior and posterior tibial veins. Ascends through the popliteal fossa, superficial to the popliteal artery (between artery and tibial nerve). Receives the small saphenous vein. Becomes the femoral vein at the adductor hiatus.",
    clinicalNote: "Popliteal vein DVT is the most proximal 'below-knee' DVT — carries higher embolisation risk than calf vein DVTs. Compression ultrasound of the popliteal vein (non-compressibility = DVT) is a key element of the two-point compression ultrasound protocol for DVT diagnosis."
  },
  "deep-veins-leg": {
    label: "Deep Veins of the Leg",
    color: "hsl(240, 45%, 45%)",
    detail: "Paired venae comitantes (tibial veins) accompany the anterior tibial, posterior tibial, and peroneal arteries. Soleal and gastrocnemius veins (intramuscular calf veins) drain into the posterior tibial and popliteal veins. The calf muscle pump (gastrocnemius and soleus contraction) is the main driver of venous return from the lower limb.",
    clinicalNote: "Calf vein DVTs (tibial/muscular veins) account for ~50% of all DVTs. Controversy regarding anticoagulation — surveillance with repeat imaging vs immediate treatment. The calf muscle pump is critical: immobility (surgery, long-haul flights) impairs the pump → venous stasis → DVT. TEDs and intermittent pneumatic compression augment the pump."
  },
  perforators: {
    label: "Perforating Veins",
    color: "hsl(250, 40%, 52%)",
    detail: "Connect the superficial and deep venous systems through the deep fascia. Named perforators include: Cockett's (posterior tibial perforators — medial calf), Boyd's (below-knee medial), Dodd's (mid-thigh medial), and Hunterian (upper thigh). Valves direct flow from superficial → deep. Approximately 150 perforators in the lower limb.",
    clinicalNote: "Incompetent perforators allow bidirectional flow → venous hypertension in the superficial system → varicose veins, oedema, skin changes (lipodermatosclerosis), and venous ulceration. Cockett's perforators are the most clinically significant — their incompetence causes medial ankle/gaiter area venous ulcers. Subfascial endoscopic perforator surgery (SEPS) or ultrasound-guided foam sclerotherapy treats incompetent perforators."
  },
  "external-iliac-vein": {
    label: "External Iliac → IVC",
    color: "hsl(240, 50%, 42%)",
    detail: "The femoral vein becomes the external iliac vein at the inguinal ligament. Joins the internal iliac vein to form the common iliac vein. Left and right common iliac veins merge to form the IVC at L5 level. The left common iliac vein passes behind the right common iliac artery (May-Thurner anatomy).",
    clinicalNote: "May-Thurner syndrome: compression of the left common iliac vein by the right common iliac artery → left iliofemoral DVT. Accounts for the higher incidence of left-sided lower limb DVTs (60% vs 40%). Treated with angioplasty and stenting. IVC filters are placed below the renal veins when anticoagulation is contraindicated."
  }
};

const categories = {
  superficial: { label: "Superficial System", keys: ["dorsal-venous-arch", "great-saphenous", "small-saphenous"] as VeinKey[] },
  junctions: { label: "Junctions", keys: ["saphenofemoral", "saphenopopliteal", "perforators"] as VeinKey[] },
  deep: { label: "Deep System", keys: ["deep-veins-leg", "popliteal-vein", "femoral-vein", "external-iliac-vein"] as VeinKey[] },
};

const LowerLimbVeinsDiagram = () => {
  const [selected, setSelected] = useState<VeinKey>("great-saphenous");
  const [showSutures, setShowSutures] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const info = veins[selected];
  const isActive = (k: VeinKey) => selected === k;

  return (
    <DiagramFigure
      id="lower-limb-veins-diagram"
      title="Lower limb veins"
      description="Auto-generated wrapper for the Lower limb veins anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="Venous drainage of the lower limb"
            subtitle="Superficial and deep venous systems with surgical and DVT correlations"
            toggles={[
              { label: "Sutures", active: showSutures, onChange: () => setShowSutures((s) => !s) },
              { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
            ]}
          />
  
          <div className="flex flex-col lg:flex-row gap-4 items-start">
          <div className="flex-shrink-0 mx-auto">
            <svg viewBox="0 0 220 580" className="w-full max-w-[240px]" role="img" aria-label="Venous drainage of the lower limb showing superficial and deep systems with perforators">
              <defs>
                <radialGradient id="llv-bgShade" cx="50%" cy="40%" r="65%">
                  <stop offset="0%" stopColor="hsl(220, 50%, 30%)" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="hsl(220, 40%, 20%)" stopOpacity="0.03" />
                </radialGradient>
                <pattern id="llv-tissue" patternUnits="userSpaceOnUse" width="6" height="6">
                  <circle cx="1" cy="1" r="0.4" fill="hsl(var(--muted-foreground))" opacity="0.18" />
                </pattern>
                <filter id="llv-shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
                  <feOffset dx="0" dy="1.2" result="off" />
                  <feComponentTransfer><feFuncA type="linear" slope="0.26" /></feComponentTransfer>
                  <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
  
              <rect x="2" y="2" width="216" height="576" rx="10" fill="url(#llv-bgShade)" stroke="hsl(var(--border))" strokeWidth="0.5" />
              {showSutures && <rect x="2" y="2" width="216" height="576" rx="10" fill="url(#llv-tissue)" pointerEvents="none" />}
  
              {/* Leg outline */}
              <path d="M70,15 Q60,80 58,150 Q55,220 52,280 Q50,340 48,400 Q45,440 40,480 Q37,510 32,550" fill="none" stroke="hsl(var(--border))" strokeWidth="0.75" opacity="0.4" />
              <path d="M150,15 Q160,80 162,150 Q165,220 168,280 Q168,340 165,400 Q160,440 155,480 Q150,510 140,550" fill="none" stroke="hsl(var(--border))" strokeWidth="0.75" opacity="0.4" />
  
              {showSutures && (
                <g pointerEvents="none">
                  <line x1="45" y1="30" x2="175" y2="30" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.35" />
                  <line x1="45" y1="280" x2="175" y2="280" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.35" />
                  <line x1="35" y1="460" x2="160" y2="460" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.35" />
                </g>
              )}
              {showLabels && (
                <g pointerEvents="none">
                  <text x="178" y="33" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.55" fontWeight="600">Groin</text>
                  <text x="178" y="283" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.55" fontWeight="600">Knee</text>
                  <text x="165" y="463" fontSize="4.5" fill="hsl(var(--muted-foreground))" opacity="0.55" fontWeight="600">Ankle</text>
                  <text x="110" y="12" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.55" textAnchor="middle" fontWeight="600">MEDIAL VIEW</text>
                </g>
              )}
  
              {/* External iliac / IVC */}
              <g className="cursor-pointer" onClick={() => setSelected("external-iliac-vein")}>
                <path d="M100,5 Q102,15 103,28" fill="none" stroke={veins["external-iliac-vein"].color}
                  strokeWidth={isActive("external-iliac-vein") ? 5 : 3.5} opacity={isActive("external-iliac-vein") ? 0.7 : 0.3} strokeLinecap="round" />
                <text x="108" y="10" fontSize="4.5" fill={veins["external-iliac-vein"].color}>→ IVC</text>
              </g>
  
              {/* Femoral vein (deep) */}
              <g className="cursor-pointer" onClick={() => setSelected("femoral-vein")}>
                <path d="M103,28 Q104,80 105,140 Q106,200 107,260" fill="none" stroke={veins["femoral-vein"].color}
                  strokeWidth={isActive("femoral-vein") ? 4 : 2.5} opacity={isActive("femoral-vein") ? 0.7 : 0.3}
                  strokeDasharray="6 3" strokeLinecap="round" />
                <text x="115" y="150" fontSize="5" fill={veins["femoral-vein"].color}>Femoral V.</text>
                <text x="115" y="158" fontSize="4" fill={veins["femoral-vein"].color} opacity="0.5">(deep)</text>
              </g>
  
              {/* SFJ */}
              <g className="cursor-pointer" onClick={() => setSelected("saphenofemoral")}>
                <circle cx="103" cy="35" r="4" fill={veins.saphenofemoral.color}
                  fillOpacity={isActive("saphenofemoral") ? 0.5 : 0.15}
                  stroke={veins.saphenofemoral.color} strokeWidth={isActive("saphenofemoral") ? 2 : 1} />
                <text x="80" y="42" fontSize="4.5" fill={veins.saphenofemoral.color} textAnchor="end" fontWeight="bold">SFJ</text>
              </g>
  
              {/* Great saphenous vein (superficial, medial) */}
              <g className="cursor-pointer" onClick={() => setSelected("great-saphenous")}>
                <path d="M103,35 Q90,60 82,100 Q75,150 72,200 Q70,240 68,280 Q65,330 62,380 Q58,420 55,460 Q52,480 50,500 Q48,520 45,540" fill="none" stroke={veins["great-saphenous"].color}
                  strokeWidth={isActive("great-saphenous") ? 3.5 : 2} opacity={isActive("great-saphenous") ? 0.7 : 0.3} strokeLinecap="round" />
                <text x="55" y="200" fontSize="5" fill={veins["great-saphenous"].color} textAnchor="end" fontWeight="bold">GSV</text>
                <text x="55" y="208" fontSize="4" fill={veins["great-saphenous"].color} textAnchor="end" opacity="0.6">(medial)</text>
                {/* Ankle landmark */}
                <circle cx="52" cy="465" r="2" fill={veins["great-saphenous"].color} fillOpacity="0.4" />
                <text x="35" y="475" fontSize="3.5" fill={veins["great-saphenous"].color} textAnchor="end">ant. to med.</text>
                <text x="35" y="481" fontSize="3.5" fill={veins["great-saphenous"].color} textAnchor="end">malleolus</text>
              </g>
  
              {/* Popliteal vein (deep) */}
              <g className="cursor-pointer" onClick={() => setSelected("popliteal-vein")}>
                <path d="M107,260 Q108,275 108,295 Q108,310 108,320" fill="none" stroke={veins["popliteal-vein"].color}
                  strokeWidth={isActive("popliteal-vein") ? 4 : 2.5} opacity={isActive("popliteal-vein") ? 0.7 : 0.3}
                  strokeDasharray="6 3" strokeLinecap="round" />
                <text x="118" y="300" fontSize="4.5" fill={veins["popliteal-vein"].color}>Popliteal V.</text>
              </g>
  
              {/* SPJ */}
              <g className="cursor-pointer" onClick={() => setSelected("saphenopopliteal")}>
                <circle cx="108" cy="285" r="3.5" fill={veins.saphenopopliteal.color}
                  fillOpacity={isActive("saphenopopliteal") ? 0.5 : 0.15}
                  stroke={veins.saphenopopliteal.color} strokeWidth={isActive("saphenopopliteal") ? 2 : 1} />
                <text x="130" y="288" fontSize="4.5" fill={veins.saphenopopliteal.color} fontWeight="bold">SPJ</text>
              </g>
  
              {/* Small saphenous vein (superficial, posterior/lateral) */}
              <g className="cursor-pointer" onClick={() => setSelected("small-saphenous")}>
                <path d="M108,285 Q125,310 135,350 Q140,390 142,430 Q143,450 143,460 Q142,480 140,510 Q138,530 135,545" fill="none" stroke={veins["small-saphenous"].color}
                  strokeWidth={isActive("small-saphenous") ? 3 : 1.8} opacity={isActive("small-saphenous") ? 0.7 : 0.3} strokeLinecap="round" />
                <text x="148" y="390" fontSize="5" fill={veins["small-saphenous"].color}>SSV</text>
                <text x="148" y="398" fontSize="4" fill={veins["small-saphenous"].color} opacity="0.6">(posterior)</text>
                <text x="148" y="465" fontSize="3.5" fill={veins["small-saphenous"].color} opacity="0.5">post. to lat.</text>
                <text x="148" y="471" fontSize="3.5" fill={veins["small-saphenous"].color} opacity="0.5">malleolus</text>
              </g>
  
              {/* Deep veins of leg */}
              <g className="cursor-pointer" onClick={() => setSelected("deep-veins-leg")}>
                <path d="M108,320 Q107,370 106,420 Q105,450 104,460" fill="none" stroke={veins["deep-veins-leg"].color}
                  strokeWidth={isActive("deep-veins-leg") ? 3 : 1.5} opacity={isActive("deep-veins-leg") ? 0.5 : 0.15}
                  strokeDasharray="5 3" strokeLinecap="round" />
                <text x="90" y="380" fontSize="4" fill={veins["deep-veins-leg"].color} textAnchor="end">Tibial vv.</text>
                <text x="90" y="387" fontSize="3.5" fill={veins["deep-veins-leg"].color} textAnchor="end" opacity="0.6">(deep)</text>
              </g>
  
              {/* Perforating veins */}
              <g className="cursor-pointer" onClick={() => setSelected("perforators")}>
                {[{y:350,l:"Cockett"}, {y:270,l:"Boyd"}, {y:180,l:"Dodd"}].map(p => (
                  <g key={p.l}>
                    <line x1={68} y1={p.y} x2={106} y2={p.y}
                      stroke={veins.perforators.color}
                      strokeWidth={isActive("perforators") ? 2 : 1}
                      opacity={isActive("perforators") ? 0.6 : 0.2}
                      strokeDasharray="2 2" />
                    <text x={65} y={p.y - 3} fontSize="3.5" fill={veins.perforators.color} textAnchor="end"
                      opacity={isActive("perforators") ? 0.8 : 0.4}>{p.l}</text>
                  </g>
                ))}
              </g>
  
              {/* Dorsal venous arch */}
              <g className="cursor-pointer" onClick={() => setSelected("dorsal-venous-arch")}>
                <path d="M45,540 Q60,550 80,555 Q100,558 120,555 Q130,550 135,545" fill="none" stroke={veins["dorsal-venous-arch"].color}
                  strokeWidth={isActive("dorsal-venous-arch") ? 3 : 1.5} opacity={isActive("dorsal-venous-arch") ? 0.6 : 0.25} strokeLinecap="round" />
                <text x="90" y="570" fontSize="5" textAnchor="middle" fill={veins["dorsal-venous-arch"].color}>Dorsal venous arch</text>
              </g>
  
              {/* Flow arrow */}
              <polygon points="98,8 102,2 106,8" fill={veins["external-iliac-vein"].color} opacity="0.3" />
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
                        {veins[key].label.split(" (")[0]}
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

export default LowerLimbVeinsDiagram;
