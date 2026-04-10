import { useState } from "react";

const FoetalCirculationDiagram = () => {
  const [activeShunt, setActiveShunt] = useState<string | null>(null);

  const dim = (id?: string) => (activeShunt && activeShunt !== id ? 0.15 : 1);
  const sw = (id: string) => (activeShunt === id ? 5 : 3);
  const glow = (id: string) => (activeShunt === id ? "url(#fc-glow)" : "none");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Foetal Blood Flow & Oxygen Saturation</h3>
      <p className="text-sm text-muted-foreground">Click a shunt to highlight its pathway. Animated dots show flow direction; colour indicates oxygen saturation.</p>

      <div className="flex flex-wrap gap-2 mb-2">
        {[
          { id: "dv", label: "Ductus Venosus", c: "#ef4444" },
          { id: "fo", label: "Foramen Ovale", c: "#a855f7" },
          { id: "da", label: "Ductus Arteriosus", c: "#3b82f6" },
        ].map((s) => (
          <button key={s.id}
            onClick={() => setActiveShunt(activeShunt === s.id ? null : s.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              activeShunt === s.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-secondary/50 text-muted-foreground border-border hover:border-primary/50"
            }`}>{s.label}</button>
        ))}
      </div>

      <div className="relative w-full overflow-hidden rounded-xl border border-border bg-gradient-to-b from-secondary/5 to-secondary/20">
        <svg viewBox="0 0 620 860" className="w-full h-auto" style={{ maxHeight: "80vh" }}>
          <defs>
            <filter id="fc-glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            <filter id="fc-sh"><feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.12" /></filter>
            <radialGradient id="fc-lung" cx=".5" cy=".5" r=".5">
              <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.12" />
            </radialGradient>
            <radialGradient id="fc-plac" cx=".5" cy=".4" r=".6">
              <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.12" />
            </radialGradient>
          </defs>

          {/* ══════ BRAIN ══════ */}
          <g opacity={dim()}>
            <ellipse cx="310" cy="58" rx="55" ry="44" fill="#fef3c7" fillOpacity="0.25" stroke="#d4a574" strokeWidth="1.5" filter="url(#fc-sh)" />
            <path d="M270,48 Q290,30 310,33 Q330,30 350,48" fill="none" stroke="#d4a574" strokeWidth="1" opacity="0.45" />
            <path d="M275,58 Q293,45 310,47 Q327,45 345,58" fill="none" stroke="#d4a574" strokeWidth="1" opacity="0.35" />
            <text x="310" y="56" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e" opacity="0.8">Brain</text>
            <text x="310" y="70" textAnchor="middle" fontSize="8" fill="#92400e" opacity="0.55">SpO₂ ~65%</text>
          </g>

          {/* ══════ RIGHT LUNG ══════ */}
          <g opacity={dim()}>
            <path d="M115,220 Q80,245 75,310 Q75,375 110,395 Q140,405 165,375 Q178,350 178,290 Q175,240 148,220 Z"
              fill="url(#fc-lung)" stroke="#60a5fa" strokeWidth="1.5" filter="url(#fc-sh)" />
            <path d="M148,245 L135,275 L125,315" fill="none" stroke="#93c5fd" strokeWidth="1" opacity="0.4" />
            <text x="125" y="310" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1e40af" opacity="0.65">R Lung</text>
            <text x="125" y="324" textAnchor="middle" fontSize="7" fill="#1e40af" opacity="0.45">~5% CO</text>
          </g>

          {/* ══════ LEFT LUNG ══════ */}
          <g opacity={dim()}>
            <path d="M505,220 Q540,245 545,310 Q545,375 510,395 Q480,405 455,375 Q442,350 442,290 Q445,240 472,220 Z"
              fill="url(#fc-lung)" stroke="#60a5fa" strokeWidth="1.5" filter="url(#fc-sh)" />
            <path d="M472,245 L485,275 L495,315" fill="none" stroke="#93c5fd" strokeWidth="1" opacity="0.4" />
            <text x="495" y="310" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1e40af" opacity="0.65">L Lung</text>
            <text x="495" y="324" textAnchor="middle" fontSize="7" fill="#1e40af" opacity="0.45">~5% CO</text>
          </g>

          {/* ══════ HEART ══════ */}
          <g filter="url(#fc-sh)">
            {/* Outer shape */}
            <path d="M240,225 Q215,225 210,260 Q205,300 230,330 Q255,360 310,400 Q365,360 390,330 Q415,300 410,260 Q405,225 380,225 Q358,220 340,242 Q330,252 310,242 Q290,252 280,242 Q262,220 240,225 Z"
              fill="#fecaca" fillOpacity="0.15" stroke="#dc2626" strokeWidth="1.5" opacity="0.5" />
            {/* Septum */}
            <line x1="310" y1="238" x2="310" y2="390" stroke="#dc2626" strokeWidth="1.5" opacity="0.25" />

            {/* RA — top-left chamber */}
            <path d="M240,240 Q215,248 212,275 Q212,305 240,320 L310,320 L310,240 Z"
              fill="#dbeafe" fillOpacity="0.35" stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
            <text x="262" y="278" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">RA</text>
            <text x="262" y="295" textAnchor="middle" fontSize="7.5" fill="#1e40af" opacity="0.65">SpO₂ ~67%</text>

            {/* LA — top-right chamber */}
            <path d="M380,240 Q405,248 408,275 Q408,305 380,320 L310,320 L310,240 Z"
              fill="#fecaca" fillOpacity="0.35" stroke="#ef4444" strokeWidth="1" opacity="0.5" />
            <text x="358" y="278" textAnchor="middle" fontSize="14" fontWeight="700" fill="#dc2626">LA</text>
            <text x="358" y="295" textAnchor="middle" fontSize="7.5" fill="#dc2626" opacity="0.65">SpO₂ ~65%</text>

            {/* RV — bottom-left */}
            <path d="M240,320 Q212,328 218,360 Q228,382 280,395 L310,385 L310,320 Z"
              fill="#dbeafe" fillOpacity="0.25" stroke="#3b82f6" strokeWidth="1" opacity="0.5" />
            <text x="265" y="358" textAnchor="middle" fontSize="14" fontWeight="700" fill="#1e40af">RV</text>

            {/* LV — bottom-right */}
            <path d="M380,320 Q408,328 402,360 Q392,382 340,395 L310,385 L310,320 Z"
              fill="#fecaca" fillOpacity="0.25" stroke="#ef4444" strokeWidth="1" opacity="0.5" />
            <text x="355" y="358" textAnchor="middle" fontSize="14" fontWeight="700" fill="#dc2626">LV</text>

            {/* Foramen Ovale in septum */}
            <ellipse cx="310" cy="280" rx="9" ry="15"
              fill={activeShunt === "fo" ? "#a855f7" : "#e9d5ff"} fillOpacity={activeShunt === "fo" ? 0.5 : 0.25}
              stroke="#7c3aed" strokeWidth={activeShunt === "fo" ? 2.5 : 1.5}
              opacity={dim("fo")} filter={glow("fo")}
              style={{ cursor: "pointer" }}
              onClick={() => setActiveShunt(activeShunt === "fo" ? null : "fo")} />
            <text x="310" y="283" textAnchor="middle" fontSize="6.5" fontWeight="600" fill="#7c3aed" opacity={dim("fo")}>FO</text>
          </g>

          {/* ══════ GREAT VESSELS ══════ */}

          {/* SVC → RA */}
          <g opacity={dim()}>
            <path d="M265,140 L265,225" fill="none" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" />
            <text x="240" y="175" fontSize="9" fontWeight="600" fill="#2563eb" transform="rotate(-90,240,175)">SVC</text>
            <polygon points="265,215 260,200 270,200" fill="#2563eb" opacity="0.6" />
            <circle r="4" fill="#3b82f6" opacity="0.9">
              <animateMotion dur="2s" repeatCount="indefinite" path="M265,140 L265,225" />
            </circle>
            <circle r="4" fill="#3b82f6" opacity="0.6">
              <animateMotion dur="2s" repeatCount="indefinite" path="M265,140 L265,225" begin="1s" />
            </circle>
          </g>

          {/* IVC → RA (from below) */}
          <g opacity={dim()}>
            <path d="M265,480 L265,400" fill="none" stroke="#a855f7" strokeWidth="5" strokeLinecap="round" />
            <text x="240" y="450" fontSize="9" fontWeight="600" fill="#7c3aed" transform="rotate(-90,240,450)">IVC</text>
            <text x="282" y="465" fontSize="7" fill="#7c3aed" opacity="0.6">SpO₂ ~67%</text>
            <polygon points="265,410 260,425 270,425" fill="#7c3aed" opacity="0.6" />
            <circle r="4" fill="#a855f7" opacity="0.9">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M265,480 L265,400" />
            </circle>
          </g>

          {/* Foramen Ovale flow RA→LA */}
          <g opacity={dim("fo")}>
            <path d="M298,280 L322,280" fill="none" stroke="#a855f7"
              strokeWidth={sw("fo")} strokeLinecap="round" filter={glow("fo")} />
            <polygon points="320,275 328,280 320,285" fill="#a855f7" opacity={dim("fo")} />
            <text x="310" y="258" textAnchor="middle" fontSize="8" fontWeight="700" fill="#7c3aed" opacity={dim("fo")}>Foramen Ovale</text>
            <circle r="3.5" fill="#a855f7" opacity="0.9">
              <animateMotion dur="1.2s" repeatCount="indefinite" path="M296,280 L324,280" />
            </circle>
          </g>

          {/* Ascending Aorta: LV → arch */}
          <g opacity={dim()}>
            <path d="M380,320 Q410,290 405,250 Q400,215 385,190 Q370,165 350,140 L340,120"
              fill="none" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
            <text x="420" y="245" fontSize="8.5" fontWeight="600" fill="#dc2626">Asc. Aorta</text>
            <circle r="4" fill="#ef4444" opacity="0.9">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M380,320 Q410,290 405,250 Q400,215 385,190 Q370,165 350,140 L340,120" />
            </circle>
          </g>

          {/* Aortic arch curving left */}
          <g opacity={dim()}>
            <path d="M340,120 Q325,105 310,102 Q290,100 275,108" fill="none" stroke="#ef4444" strokeWidth="4.5" strokeLinecap="round" />
            <text x="310" y="96" textAnchor="middle" fontSize="7.5" fontWeight="500" fill="#dc2626" opacity="0.6">Aortic Arch</text>
          </g>

          {/* Arch → brain */}
          <g opacity={dim()}>
            <path d="M340,120 L330,95 Q320,78 310,72" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
            <circle r="3" fill="#ef4444" opacity="0.7">
              <animateMotion dur="2s" repeatCount="indefinite" path="M340,120 L330,95 Q320,78 310,72" />
            </circle>
          </g>

          {/* Descending Aorta — runs LEFT of heart, well clear */}
          <g opacity={dim()}>
            <path d="M275,108 L180,180 L175,350 L180,480 L190,570"
              fill="none" stroke="#a855f7" strokeWidth="4.5" strokeLinecap="round" />
            <text x="155" y="420" fontSize="8.5" fontWeight="600" fill="#7c3aed" transform="rotate(-90,155,420)">Descending Aorta</text>
            <circle r="4" fill="#a855f7" opacity="0.8">
              <animateMotion dur="5s" repeatCount="indefinite" path="M275,108 L180,180 L175,350 L180,480 L190,570" />
            </circle>
            <circle r="4" fill="#a855f7" opacity="0.5">
              <animateMotion dur="5s" repeatCount="indefinite" path="M275,108 L180,180 L175,350 L180,480 L190,570" begin="2.5s" />
            </circle>
          </g>

          {/* PA: RV → PA trunk */}
          <g opacity={dim()}>
            <path d="M245,340 Q225,320 210,290 Q200,265 195,240"
              fill="none" stroke="#3b82f6" strokeWidth="4.5" strokeLinecap="round" />
            <text x="195" y="280" fontSize="9" fontWeight="600" fill="#2563eb" transform="rotate(-70,195,280)">PA</text>
            {/* PA bifurcation → R lung */}
            <path d="M195,240 Q185,235 172,242 Q160,255 155,275" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.45" />
            {/* PA bifurcation → L lung */}
            <path d="M195,240 Q210,225 260,218 Q340,210 410,225 Q440,235 460,250"
              fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.45" />
            <circle r="2.5" fill="#3b82f6" opacity="0.5">
              <animateMotion dur="3s" repeatCount="indefinite" path="M195,240 Q185,235 172,242 Q160,255 155,275" />
            </circle>
          </g>

          {/* Pulmonary veins → LA (dashed, subtle) */}
          <g opacity={dim()}>
            <path d="M165,300 Q230,280 310,260 Q370,250 400,248"
              fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.3" strokeDasharray="4,3" />
            <text x="430" y="248" fontSize="7" fill="#dc2626" opacity="0.45">Pulm. Veins</text>
          </g>

          {/* ══════ DUCTUS ARTERIOSUS ══════ */}
          <g opacity={dim("da")}>
            {/* DA: PA trunk → descending aorta (lateral arch, clear of heart) */}
            <path d="M195,240 Q185,210 190,190 Q195,175 210,170 Q230,165 255,168 Q270,170 275,175"
              fill="none" stroke="#3b82f6"
              strokeWidth={sw("da")} strokeLinecap="round"
              strokeDasharray={activeShunt === "da" ? "none" : "8,4"}
              filter={glow("da")} />
            {/* Label well above heart */}
            <text x="230" y="155" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#2563eb" opacity={dim("da")}>Ductus Arteriosus</text>
            <text x="230" y="145" textAnchor="middle" fontSize="7" fill="#2563eb" opacity={0.65 * (dim("da") as number)}>~90% of RV output</text>
            <circle r="4" fill="#3b82f6" opacity="0.9">
              <animateMotion dur="2s" repeatCount="indefinite" path="M195,240 Q185,210 190,190 Q195,175 210,170 Q230,165 255,168 Q270,170 275,175" />
            </circle>
            <circle r="4" fill="#3b82f6" opacity="0.6">
              <animateMotion dur="2s" repeatCount="indefinite" path="M195,240 Q185,210 190,190 Q195,175 210,170 Q230,165 255,168 Q270,170 275,175" begin="1s" />
            </circle>
          </g>

          {/* ══════ LIVER ══════ */}
          <g opacity={dim()}>
            <path d="M240,505 Q200,500 185,518 Q175,535 185,555 Q200,570 265,572 Q340,572 360,555 Q375,535 365,518 Q350,500 310,505 Z"
              fill="#fde68a" fillOpacity="0.25" stroke="#d97706" strokeWidth="1.5" filter="url(#fc-sh)" />
            <path d="M235,525 Q260,520 285,525" fill="none" stroke="#d97706" strokeWidth="0.8" opacity="0.25" />
            <path d="M255,540 Q280,535 305,540" fill="none" stroke="#d97706" strokeWidth="0.8" opacity="0.25" />
            <text x="280" y="545" textAnchor="middle" fontSize="11" fontWeight="600" fill="#92400e" opacity="0.75">Liver</text>
            {/* Portal flow label */}
            <text x="370" y="545" fontSize="7" fill="#92400e" opacity="0.5">~50% via</text>
            <text x="370" y="555" fontSize="7" fill="#92400e" opacity="0.5">hepatic sinusoids</text>
            {/* Portal flow through liver */}
            <path d="M260,572 Q270,550 280,535 Q290,520 300,512" fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.35" strokeDasharray="3,3" />
          </g>

          {/* ══════ DUCTUS VENOSUS ══════ */}
          <g opacity={dim("dv")}>
            <path d="M255,600 Q250,580 253,560 Q258,535 265,500"
              fill="none" stroke="#ef4444"
              strokeWidth={sw("dv")} strokeLinecap="round"
              strokeDasharray={activeShunt === "dv" ? "none" : "8,4"}
              filter={glow("dv")} />
            {/* Label positioned to the right, clear of vessel */}
            <text x="290" y="568" fontSize="8" fontWeight="700" fill="#dc2626" opacity={dim("dv")}>Ductus</text>
            <text x="290" y="580" fontSize="8" fontWeight="700" fill="#dc2626" opacity={dim("dv")}>Venosus</text>
            <text x="290" y="592" fontSize="6.5" fill="#dc2626" opacity={0.6 * (dim("dv") as number)}>~50% bypasses liver</text>
            <circle r="4" fill="#ef4444" opacity="0.9">
              <animateMotion dur="2s" repeatCount="indefinite" path="M255,600 Q250,580 253,560 Q258,535 265,500" />
            </circle>
            <circle r="4" fill="#ef4444" opacity="0.65">
              <animateMotion dur="2s" repeatCount="indefinite" path="M255,600 Q250,580 253,560 Q258,535 265,500" begin="1s" />
            </circle>
          </g>

          {/* ══════ LOWER BODY ══════ */}
          <g opacity={dim()}>
            <rect x="215" y="605" rx="12" ry="12" width="140" height="42" fill="#e0e7ff" fillOpacity="0.25" stroke="#6366f1" strokeWidth="1.5" filter="url(#fc-sh)" />
            <text x="285" y="626" textAnchor="middle" fontSize="10" fontWeight="600" fill="#4338ca" opacity="0.75">Lower Body</text>
            <text x="285" y="640" textAnchor="middle" fontSize="7.5" fill="#4338ca" opacity="0.55">SpO₂ ~58%</text>
          </g>

          {/* Desc. aorta → lower body */}
          <g opacity={dim()}>
            <path d="M190,570 Q200,590 215,615" fill="none" stroke="#a855f7" strokeWidth="3" opacity="0.5" />
          </g>

          {/* ══════ PLACENTA ══════ */}
          <g opacity={dim()}>
            <ellipse cx="310" cy="780" rx="105" ry="42" fill="url(#fc-plac)" stroke="#ef4444" strokeWidth="2" filter="url(#fc-sh)" />
            <path d="M260,770 Q275,758 290,770 Q298,778 310,768 Q322,758 330,770 Q338,778 350,770 Q358,758 365,770"
              fill="none" stroke="#dc2626" strokeWidth="1" opacity="0.35" />
            <text x="310" y="786" textAnchor="middle" fontSize="12" fontWeight="700" fill="#dc2626" opacity="0.85">Placenta</text>
            <text x="310" y="800" textAnchor="middle" fontSize="7" fill="#dc2626" opacity="0.5">Maternal–foetal gas exchange</text>
          </g>

          {/* ══════ UMBILICAL CORD ══════ */}
          {/* Umbilical Vein — oxygenated */}
          <g opacity={dim()}>
            <path d="M280,738 Q275,715 268,690 Q260,665 255,645 Q250,625 252,610"
              fill="none" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
            <text x="235" y="695" fontSize="8.5" fontWeight="600" fill="#dc2626" transform="rotate(-78,235,695)">Umbilical Vein</text>
            <text x="228" y="725" fontSize="7.5" fill="#dc2626" opacity="0.75">SpO₂ ~80%</text>
            <circle r="4.5" fill="#ef4444" opacity="0.9">
              <animateMotion dur="3s" repeatCount="indefinite" path="M280,738 Q275,715 268,690 Q260,665 255,645 Q250,625 252,610" />
            </circle>
            <circle r="4.5" fill="#ef4444" opacity="0.6">
              <animateMotion dur="3s" repeatCount="indefinite" path="M280,738 Q275,715 268,690 Q260,665 255,645 Q250,625 252,610" begin="1.5s" />
            </circle>
          </g>

          {/* Umbilical Arteries × 2 — deoxygenated */}
          <g opacity={dim()}>
            <path d="M340,647 Q348,675 348,710 Q345,730 338,740" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
            <path d="M350,647 Q358,675 358,710 Q355,730 348,740" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
            <text x="375" y="690" fontSize="8" fontWeight="600" fill="#2563eb">Umb. Arteries ×2</text>
            <text x="375" y="703" fontSize="7" fill="#2563eb" opacity="0.6">SpO₂ ~58%</text>
            <circle r="3.5" fill="#3b82f6" opacity="0.9">
              <animateMotion dur="3s" repeatCount="indefinite" path="M340,647 Q348,675 348,710 Q345,730 338,740" />
            </circle>
            <circle r="3.5" fill="#3b82f6" opacity="0.65">
              <animateMotion dur="3s" repeatCount="indefinite" path="M350,647 Q358,675 358,710 Q355,730 348,740" begin="1s" />
            </circle>
          </g>

          {/* Desc. aorta → umb. arteries */}
          <g opacity={dim()}>
            <path d="M215,625 Q260,640 340,647" fill="none" stroke="#a855f7" strokeWidth="2.5" opacity="0.4" />
            <path d="M215,625 Q270,645 350,647" fill="none" stroke="#a855f7" strokeWidth="2.5" opacity="0.4" />
          </g>

          {/* ══════ LEGEND ══════ */}
          <rect x="430" y="15" width="175" height="100" rx="8" fill="white" fillOpacity="0.88" stroke="#e2e8f0" strokeWidth="1" />
          <text x="442" y="34" fontSize="9.5" fontWeight="700" fill="#1e293b">O₂ Saturation Key</text>
          <circle cx="450" cy="50" r="5.5" fill="#ef4444" />
          <text x="462" y="54" fontSize="8" fill="#374151">High (~80%) — Umb. vein</text>
          <circle cx="450" cy="68" r="5.5" fill="#a855f7" />
          <text x="462" y="72" fontSize="8" fill="#374151">Mixed (~60–67%)</text>
          <circle cx="450" cy="86" r="5.5" fill="#3b82f6" />
          <text x="462" y="90" fontSize="8" fill="#374151">Low (~55–58%)</text>
          <text x="442" y="107" fontSize="7" fill="#6b7280">● = animated flow direction</text>

          {/* ══════ CO label ══════ */}
          <g opacity={dim()}>
            <text x="460" y="370" fontSize="7.5" fill="#6b7280">Combined ventricular</text>
            <text x="460" y="382" fontSize="7.5" fill="#6b7280">output ~450 mL/kg/min</text>
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
