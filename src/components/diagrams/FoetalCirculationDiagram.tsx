import { useState } from "react";

const FoetalCirculationDiagram = () => {
  const [activeShunt, setActiveShunt] = useState<string | null>(null);

  const dimmed = (id: string) => activeShunt && activeShunt !== id ? 0.15 : 1;
  const shuntStroke = (id: string) => activeShunt === id ? 5 : 3;
  const shuntGlow = (id: string) => activeShunt === id ? "url(#fc-glow)" : "none";

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Foetal Blood Flow & Oxygen Saturation</h3>
      <p className="text-sm text-muted-foreground">Click a shunt to highlight its pathway. Animated dots show flow direction; colour indicates oxygen saturation.</p>

      <div className="flex flex-wrap gap-2 mb-2">
        {[
          { id: "dv", label: "Ductus Venosus", color: "#ef4444" },
          { id: "fo", label: "Foramen Ovale", color: "#a855f7" },
          { id: "da", label: "Ductus Arteriosus", color: "#3b82f6" },
        ].map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveShunt(activeShunt === s.id ? null : s.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              activeShunt === s.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary/50 text-muted-foreground border-border hover:border-primary/50"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="relative w-full overflow-hidden rounded-xl border border-border bg-gradient-to-b from-secondary/5 to-secondary/20">
        <svg viewBox="0 0 560 780" className="w-full h-auto" style={{ maxHeight: "80vh" }}>
          <defs>
            <filter id="fc-glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="fc-shadow">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.15" />
            </filter>
            {/* Vessel gradients */}
            <linearGradient id="fc-oxy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <linearGradient id="fc-mixed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <linearGradient id="fc-deoxy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            {/* Lung pattern */}
            <radialGradient id="fc-lung-fill" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.15" />
            </radialGradient>
            {/* Placenta pattern */}
            <radialGradient id="fc-placenta" cx="0.5" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.15" />
            </radialGradient>
          </defs>

          {/* ===== HEAD / BRAIN ===== */}
          <g opacity={dimmed("")}>
            {/* Head outline */}
            <ellipse cx="280" cy="62" rx="58" ry="48" fill="#fef3c7" fillOpacity="0.25" stroke="#d4a574" strokeWidth="1.5" filter="url(#fc-shadow)" />
            {/* Brain folds */}
            <path d="M245,52 Q260,35 280,38 Q300,35 315,52" fill="none" stroke="#d4a574" strokeWidth="1" opacity="0.5" />
            <path d="M250,62 Q265,48 280,50 Q295,48 310,62" fill="none" stroke="#d4a574" strokeWidth="1" opacity="0.4" />
            <path d="M255,72 Q268,60 280,62 Q292,60 305,72" fill="none" stroke="#d4a574" strokeWidth="1" opacity="0.3" />
            <text x="280" y="58" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e" opacity="0.8">Brain</text>
            <text x="280" y="72" textAnchor="middle" fontSize="8" fill="#92400e" opacity="0.6">SpO₂ ~65%</text>
          </g>

          {/* ===== LUNGS ===== */}
          {/* Right Lung */}
          <g opacity={dimmed("")}>
            <path d="M135,210 Q100,230 95,290 Q95,350 130,370 Q160,380 180,355 Q190,335 190,280 Q188,230 160,210 Z"
              fill="url(#fc-lung-fill)" stroke="#60a5fa" strokeWidth="1.5" filter="url(#fc-shadow)" />
            {/* Bronchi lines */}
            <path d="M165,230 L150,260 L140,300" fill="none" stroke="#93c5fd" strokeWidth="1" opacity="0.5" />
            <path d="M150,260 L160,290" fill="none" stroke="#93c5fd" strokeWidth="0.8" opacity="0.4" />
            <text x="140" y="295" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1e40af" opacity="0.7">R Lung</text>
            <text x="140" y="310" textAnchor="middle" fontSize="7" fill="#1e40af" opacity="0.5">~5%</text>
          </g>
          {/* Left Lung */}
          <g opacity={dimmed("")}>
            <path d="M425,210 Q460,230 465,290 Q465,350 430,370 Q400,380 380,355 Q370,335 370,280 Q372,230 400,210 Z"
              fill="url(#fc-lung-fill)" stroke="#60a5fa" strokeWidth="1.5" filter="url(#fc-shadow)" />
            <path d="M395,230 L410,260 L420,300" fill="none" stroke="#93c5fd" strokeWidth="1" opacity="0.5" />
            <path d="M410,260 L400,290" fill="none" stroke="#93c5fd" strokeWidth="0.8" opacity="0.4" />
            <text x="420" y="295" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1e40af" opacity="0.7">L Lung</text>
            <text x="420" y="310" textAnchor="middle" fontSize="7" fill="#1e40af" opacity="0.5">~5%</text>
          </g>

          {/* ===== HEART ===== */}
          <g filter="url(#fc-shadow)">
            {/* Heart outline — anatomical shape */}
            <path d="M220,200 Q200,200 195,230 Q190,260 210,290 Q230,320 280,360 Q330,320 350,290 Q370,260 365,230 Q360,200 340,200 Q320,195 300,215 Q290,225 280,215 Q270,225 260,215 Q240,195 220,200 Z"
              fill="#fecaca" fillOpacity="0.2" stroke="#dc2626" strokeWidth="1.5" opacity="0.6" />
            
            {/* Septum */}
            <line x1="280" y1="210" x2="280" y2="350" stroke="#dc2626" strokeWidth="1.5" opacity="0.3" />
            
            {/* RA */}
            <path d="M220,215 Q200,220 200,250 Q200,280 220,295 L280,295 L280,215 Z"
              fill="#dbeafe" fillOpacity="0.4" stroke="#3b82f6" strokeWidth="1" opacity="0.6" />
            <text x="240" y="248" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">RA</text>
            <text x="240" y="263" textAnchor="middle" fontSize="7.5" fill="#1e40af" opacity="0.7">SpO₂ ~67%</text>
            
            {/* LA */}
            <path d="M340,215 Q360,220 360,250 Q360,280 340,295 L280,295 L280,215 Z"
              fill="#fecaca" fillOpacity="0.4" stroke="#ef4444" strokeWidth="1" opacity="0.6" />
            <text x="320" y="248" textAnchor="middle" fontSize="13" fontWeight="700" fill="#dc2626">LA</text>
            <text x="320" y="263" textAnchor="middle" fontSize="7.5" fill="#dc2626" opacity="0.7">SpO₂ ~65%</text>
            
            {/* RV */}
            <path d="M220,295 Q200,300 205,330 Q215,350 260,360 L280,350 L280,295 Z"
              fill="#dbeafe" fillOpacity="0.3" stroke="#3b82f6" strokeWidth="1" opacity="0.6" />
            <text x="243" y="328" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1e40af">RV</text>
            
            {/* LV */}
            <path d="M340,295 Q360,300 355,330 Q345,350 300,360 L280,350 L280,295 Z"
              fill="#fecaca" fillOpacity="0.3" stroke="#ef4444" strokeWidth="1" opacity="0.6" />
            <text x="317" y="328" textAnchor="middle" fontSize="13" fontWeight="700" fill="#dc2626">LV</text>

            {/* Foramen Ovale - hole in septum */}
            <ellipse cx="280" cy="250" rx="8" ry="14"
              fill={activeShunt === "fo" ? "#a855f7" : "#e9d5ff"} fillOpacity={activeShunt === "fo" ? 0.5 : 0.3}
              stroke="#7c3aed" strokeWidth={activeShunt === "fo" ? 2.5 : 1.5}
              opacity={dimmed("fo")}
              filter={shuntGlow("fo")}
              style={{ cursor: "pointer" }}
              onClick={() => setActiveShunt(activeShunt === "fo" ? null : "fo")}
            />
            <text x="280" y="254" textAnchor="middle" fontSize="6" fontWeight="600" fill="#7c3aed" opacity={dimmed("fo")}>FO</text>
          </g>

          {/* ===== GREAT VESSELS ===== */}

          {/* SVC → RA */}
          <g opacity={dimmed("")}>
            <path d="M240,130 L240,200" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
            <text x="225" y="165" fontSize="8" fontWeight="600" fill="#2563eb" transform="rotate(-90,225,165)">SVC</text>
            <circle r="4" fill="#3b82f6" opacity="0.9">
              <animateMotion dur="2s" repeatCount="indefinite" path="M240,130 L240,200" />
            </circle>
            <circle r="4" fill="#3b82f6" opacity="0.7">
              <animateMotion dur="2s" repeatCount="indefinite" path="M240,130 L240,200" begin="1s" />
            </circle>
          </g>

          {/* IVC → RA */}
          <g opacity={dimmed("")}>
            <path d="M240,430 L240,360 Q240,330 235,300" fill="none" stroke="#a855f7" strokeWidth="5" strokeLinecap="round" />
            <text x="220" y="400" fontSize="8" fontWeight="600" fill="#7c3aed" transform="rotate(-90,220,400)">IVC</text>
            <text x="256" y="410" fontSize="7" fill="#7c3aed" opacity="0.7">SpO₂ ~67%</text>
            <circle r="4" fill="#a855f7" opacity="0.9">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M240,430 L240,360 Q240,330 235,300" />
            </circle>
          </g>

          {/* Foramen Ovale flow: RA → LA (through septum) */}
          <g opacity={dimmed("fo")}>
            <path d="M268,250 Q280,250 292,250" fill="none" stroke="#a855f7"
              strokeWidth={shuntStroke("fo")} strokeLinecap="round"
              filter={shuntGlow("fo")} />
            {/* Arrow */}
            <polygon points="290,245 298,250 290,255" fill="#a855f7" opacity={dimmed("fo")} />
            <text x="280" y="232" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#7c3aed" opacity={dimmed("fo")}>
              Foramen Ovale
            </text>
            <circle r="3.5" fill="#a855f7" opacity="0.9">
              <animateMotion dur="1.2s" repeatCount="indefinite" path="M265,250 L295,250" />
            </circle>
          </g>

          {/* Ascending Aorta: LV → arch → brain */}
          <g opacity={dimmed("")}>
            <path d="M330,295 Q345,270 340,230 Q338,200 330,180 Q320,160 310,140 L300,120" 
              fill="none" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
            <text x="355" y="220" fontSize="8" fontWeight="600" fill="#dc2626">Asc.</text>
            <text x="355" y="230" fontSize="8" fontWeight="600" fill="#dc2626">Aorta</text>
            <circle r="4" fill="#ef4444" opacity="0.9">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M330,295 Q345,270 340,230 Q338,200 330,180 Q320,160 310,140 L300,120" />
            </circle>
          </g>

          {/* Aortic arch */}
          <g opacity={dimmed("")}>
            <path d="M300,120 Q290,105 280,100 Q265,96 250,105" fill="none" stroke="#ef4444" strokeWidth="4.5" strokeLinecap="round" />
            <text x="280" y="95" textAnchor="middle" fontSize="7" fontWeight="500" fill="#dc2626" opacity="0.7">Aortic Arch</text>
          </g>

          {/* Coronary supply to brain */}
          <g opacity={dimmed("")}>
            <path d="M300,120 L295,95 Q290,80 280,75" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            <circle r="3" fill="#ef4444" opacity="0.7">
              <animateMotion dur="2s" repeatCount="indefinite" path="M300,120 L295,95 Q290,80 280,75" />
            </circle>
          </g>

          {/* Pulmonary Artery: RV → PA trunk → bifurcation */}
          <g opacity={dimmed("")}>
            <path d="M230,300 Q215,290 200,270 Q190,250 185,230" fill="none" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" />
            <text x="193" y="248" fontSize="8" fontWeight="600" fill="#2563eb" transform="rotate(-70,193,248)">PA</text>
            {/* PA → Right lung */}
            <path d="M185,230 Q175,225 165,230 Q155,240 150,255" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.5" />
            {/* PA → Left lung */}
            <path d="M185,230 Q195,215 220,210 Q280,195 350,210 Q380,218 395,235" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.5" />
            <circle r="2.5" fill="#3b82f6" opacity="0.6">
              <animateMotion dur="3s" repeatCount="indefinite" path="M185,230 Q175,225 165,230 Q155,240 150,255" />
            </circle>
          </g>

          {/* Pulmonary veins → LA */}
          <g opacity={dimmed("")}>
            <path d="M170,270 Q200,260 260,240 Q280,235 310,230 Q330,225 345,225" fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.35" strokeDasharray="4,3" />
            <text x="310" y="218" fontSize="7" fill="#dc2626" opacity="0.5">Pulm. Veins</text>
          </g>

          {/* ===== DUCTUS ARTERIOSUS ===== */}
          <g opacity={dimmed("da")}>
            <path d="M185,230 Q180,210 200,200 Q220,192 250,200 Q260,202 250,210"
              fill="none" stroke="#3b82f6"
              strokeWidth={shuntStroke("da")} strokeLinecap="round"
              strokeDasharray={activeShunt === "da" ? "none" : "8,4"}
              filter={shuntGlow("da")} />
            {/* DA label with background */}
            <rect x="190" y="182" width="80" height="14" rx="3" fill="white" fillOpacity="0.7" />
            <text x="230" y="193" textAnchor="middle" fontSize="8" fontWeight="700" fill="#2563eb">Ductus Arteriosus</text>
            <text x="230" y="178" textAnchor="middle" fontSize="6.5" fill="#2563eb" opacity="0.7">~90% of RV output</text>
            <circle r="4" fill="#3b82f6" opacity="0.9">
              <animateMotion dur="2s" repeatCount="indefinite" path="M185,230 Q180,210 200,200 Q220,192 250,200 Q260,202 250,210" />
            </circle>
            <circle r="4" fill="#3b82f6" opacity="0.7">
              <animateMotion dur="2s" repeatCount="indefinite" path="M185,230 Q180,210 200,200 Q220,192 250,200 Q260,202 250,210" begin="1s" />
            </circle>
          </g>

          {/* Descending Aorta */}
          <g opacity={dimmed("")}>
            <path d="M250,105 L250,210 L255,430 L255,520" fill="none" stroke="#a855f7" strokeWidth="4.5" strokeLinecap="round" />
            <text x="268" y="470" fontSize="8" fontWeight="600" fill="#7c3aed" transform="rotate(-90,268,470)">Desc. Aorta</text>
            <circle r="4" fill="#a855f7" opacity="0.8">
              <animateMotion dur="4s" repeatCount="indefinite" path="M250,105 L250,210 L255,430 L255,520" />
            </circle>
            <circle r="4" fill="#a855f7" opacity="0.6">
              <animateMotion dur="4s" repeatCount="indefinite" path="M250,105 L250,210 L255,430 L255,520" begin="2s" />
            </circle>
          </g>

          {/* ===== LIVER ===== */}
          <g opacity={dimmed("")}>
            <path d="M230,450 Q200,445 185,460 Q175,475 185,495 Q200,510 250,510 Q310,510 330,495 Q345,475 335,460 Q320,445 290,450 Z"
              fill="#fde68a" fillOpacity="0.3" stroke="#d97706" strokeWidth="1.5" filter="url(#fc-shadow)" />
            {/* Hepatic lobule hints */}
            <path d="M220,470 Q240,465 260,470" fill="none" stroke="#d97706" strokeWidth="0.8" opacity="0.3" />
            <path d="M240,480 Q260,475 280,480" fill="none" stroke="#d97706" strokeWidth="0.8" opacity="0.3" />
            <text x="265" y="485" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e" opacity="0.8">Liver</text>
            {/* Portal flow through liver (~50%) */}
            <path d="M225,510 Q230,490 240,475 Q250,465 265,460" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.4" strokeDasharray="3,3" />
            <text x="205" y="492" fontSize="6.5" fill="#92400e" opacity="0.6">~50% portal</text>
          </g>

          {/* ===== DUCTUS VENOSUS ===== */}
          <g opacity={dimmed("dv")}>
            <path d="M220,540 Q215,520 218,500 Q222,475 240,445"
              fill="none" stroke="#ef4444"
              strokeWidth={shuntStroke("dv")} strokeLinecap="round"
              strokeDasharray={activeShunt === "dv" ? "none" : "8,4"}
              filter={shuntGlow("dv")} />
            <rect x="155" y="510" width="60" height="22" rx="4" fill="white" fillOpacity="0.7" />
            <text x="185" y="520" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#dc2626">Ductus</text>
            <text x="185" y="530" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#dc2626">Venosus</text>
            <text x="185" y="542" textAnchor="middle" fontSize="6" fill="#dc2626" opacity="0.7">~50% bypasses liver</text>
            <circle r="4" fill="#ef4444" opacity="0.9">
              <animateMotion dur="2s" repeatCount="indefinite" path="M220,540 Q215,520 218,500 Q222,475 240,445" />
            </circle>
            <circle r="4" fill="#ef4444" opacity="0.7">
              <animateMotion dur="2s" repeatCount="indefinite" path="M220,540 Q215,520 218,500 Q222,475 240,445" begin="1s" />
            </circle>
          </g>

          {/* ===== LOWER BODY ===== */}
          <g opacity={dimmed("")}>
            <rect x="215" y="545" rx="12" ry="12" width="130" height="40" fill="#e0e7ff" fillOpacity="0.3" stroke="#6366f1" strokeWidth="1.5" filter="url(#fc-shadow)" />
            <text x="280" y="565" textAnchor="middle" fontSize="10" fontWeight="600" fill="#4338ca" opacity="0.8">Lower Body</text>
            <text x="280" y="578" textAnchor="middle" fontSize="7" fill="#4338ca" opacity="0.6">SpO₂ ~58%</text>
          </g>

          {/* ===== PLACENTA ===== */}
          <g opacity={dimmed("")}>
            {/* Disc shape */}
            <ellipse cx="280" cy="710" rx="100" ry="40" fill="url(#fc-placenta)" stroke="#ef4444" strokeWidth="2" filter="url(#fc-shadow)" />
            {/* Villous tree pattern */}
            <path d="M240,700 Q250,690 260,700 Q265,705 270,698 Q275,693 280,700 Q285,707 290,698 Q295,693 300,700 Q305,707 310,700 Q315,693 320,700"
              fill="none" stroke="#dc2626" strokeWidth="1" opacity="0.4" />
            <path d="M250,710 Q260,702 270,710 Q275,715 280,708 Q285,702 290,710 Q295,718 300,710 Q305,702 310,710"
              fill="none" stroke="#dc2626" strokeWidth="0.8" opacity="0.3" />
            <text x="280" y="716" textAnchor="middle" fontSize="12" fontWeight="700" fill="#dc2626" opacity="0.9">Placenta</text>
            <text x="280" y="730" textAnchor="middle" fontSize="7" fill="#dc2626" opacity="0.6">Maternal–foetal gas exchange</text>
          </g>

          {/* ===== UMBILICAL CORD ===== */}
          {/* Umbilical Vein (oxygenated — single vein) */}
          <g opacity={dimmed("")}>
            <path d="M260,670 Q255,650 250,620 Q245,600 235,580 Q225,560 220,545"
              fill="none" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
            <text x="230" y="635" fontSize="8" fontWeight="600" fill="#dc2626" transform="rotate(-75,230,635)">Umbilical Vein</text>
            <text x="238" y="660" fontSize="7" fill="#dc2626" opacity="0.8">SpO₂ ~80%</text>
            <circle r="4.5" fill="#ef4444" opacity="0.9">
              <animateMotion dur="3s" repeatCount="indefinite" path="M260,670 Q255,650 250,620 Q245,600 235,580 Q225,560 220,545" />
            </circle>
            <circle r="4.5" fill="#ef4444" opacity="0.7">
              <animateMotion dur="3s" repeatCount="indefinite" path="M260,670 Q255,650 250,620 Q245,600 235,580 Q225,560 220,545" begin="1.5s" />
            </circle>
          </g>

          {/* Umbilical Arteries (× 2, deoxygenated) */}
          <g opacity={dimmed("")}>
            <path d="M310,585 Q315,610 315,640 Q312,660 305,670"
              fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
            <path d="M320,585 Q325,610 325,640 Q322,660 315,670"
              fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
            <text x="340" y="630" fontSize="7.5" fontWeight="600" fill="#2563eb">Umb.</text>
            <text x="340" y="640" fontSize="7.5" fontWeight="600" fill="#2563eb">Arteries ×2</text>
            <text x="340" y="652" fontSize="7" fill="#2563eb" opacity="0.7">SpO₂ ~58%</text>
            <circle r="3.5" fill="#3b82f6" opacity="0.9">
              <animateMotion dur="3s" repeatCount="indefinite" path="M310,585 Q315,610 315,640 Q312,660 305,670" />
            </circle>
            <circle r="3.5" fill="#3b82f6" opacity="0.7">
              <animateMotion dur="3s" repeatCount="indefinite" path="M320,585 Q325,610 325,640 Q322,660 315,670" begin="1s" />
            </circle>
          </g>

          {/* Descending aorta → umbilical arteries connection */}
          <g opacity={dimmed("")}>
            <path d="M255,520 Q260,550 280,570 Q300,580 310,585" fill="none" stroke="#a855f7" strokeWidth="3" opacity="0.5" />
            <path d="M255,520 Q265,555 285,575 Q305,580 320,585" fill="none" stroke="#a855f7" strokeWidth="3" opacity="0.5" />
          </g>

          {/* ===== FLOW DIRECTION ARROWS ===== */}
          {/* Small arrow on IVC */}
          <polygon points="240,380 235,390 245,390" fill="#7c3aed" opacity="0.7" />
          {/* Arrow on SVC */}
          <polygon points="240,175 235,165 245,165" fill="#2563eb" opacity="0.7" />
          {/* Arrow on ascending aorta */}
          <polygon points="330,240 325,250 335,250" fill="#dc2626" opacity="0.5" transform="rotate(-15,330,245)" />

          {/* ===== LEGEND ===== */}
          <g>
            <rect x="12" y="12" width="150" height="95" rx="8" fill="white" fillOpacity="0.85" stroke="#e2e8f0" strokeWidth="1" />
            <text x="22" y="30" fontSize="9.5" fontWeight="700" fill="#1e293b">O₂ Saturation Key</text>
            <circle cx="28" cy="45" r="5.5" fill="#ef4444" />
            <text x="40" y="49" fontSize="8" fill="#374151">High (~80%) — Umb. vein</text>
            <circle cx="28" cy="62" r="5.5" fill="#a855f7" />
            <text x="40" y="66" fontSize="8" fill="#374151">Mixed (~60–67%)</text>
            <circle cx="28" cy="79" r="5.5" fill="#3b82f6" />
            <text x="40" y="83" fontSize="8" fill="#374151">Low (~55–58%)</text>
            <text x="22" y="99" fontSize="7" fill="#6b7280">● = animated flow direction</text>
          </g>

          {/* ===== PERCENTAGE LABELS ===== */}
          <g opacity={dimmed("")}>
            {/* Combined cardiac output label */}
            <text x="420" y="345" fontSize="7" fill="#6b7280" textAnchor="start">Combined ventricular</text>
            <text x="420" y="355" fontSize="7" fill="#6b7280" textAnchor="start">output ~450 mL/kg/min</text>
          </g>
        </svg>
      </div>

      {/* Shunt detail card */}
      {activeShunt && (
        <div className="p-4 rounded-lg border border-primary/30 bg-primary/5 animate-fade-in">
          {activeShunt === "dv" && (
            <>
              <p className="font-semibold text-sm text-foreground">Ductus Venosus</p>
              <p className="text-sm text-muted-foreground mt-1">
                Bypasses the liver, shunting ~50% of well-oxygenated umbilical venous blood (SpO₂ ~80%) directly into the IVC and towards the heart. The remaining ~50% passes through the hepatic sinusoids. Closes functionally within minutes of birth → becomes the <strong>ligamentum venosum</strong>.
              </p>
            </>
          )}
          {activeShunt === "fo" && (
            <>
              <p className="font-semibold text-sm text-foreground">Foramen Ovale</p>
              <p className="text-sm text-muted-foreground mt-1">
                A flap valve in the interatrial septum. Oxygenated IVC blood is directed by the crista dividens preferentially through the FO from RA → LA, bypassing the pulmonary circulation. Open because RA pressure &gt; LA pressure. Functionally closes when LA pressure rises after first breath (↓ PVR → ↑ pulmonary venous return). Patent in ~25% of adults (PFO).
              </p>
            </>
          )}
          {activeShunt === "da" && (
            <>
              <p className="font-semibold text-sm text-foreground">Ductus Arteriosus</p>
              <p className="text-sm text-muted-foreground mt-1">
                Connects the pulmonary trunk to the descending aorta just distal to the left subclavian artery. Diverts ~90% of RV output away from the high-resistance pulmonary vasculature. Kept patent by PGE₂ and low PaO₂. Functionally closes within 10–15 hours of birth (↑ PaO₂ + ↓ PGE₂ → smooth muscle contraction). Anatomically closes by 2–3 weeks → <strong>ligamentum arteriosum</strong>.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FoetalCirculationDiagram;
