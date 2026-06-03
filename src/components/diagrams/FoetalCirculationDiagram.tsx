import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Foetal circulation — animated diagram.
 *
 * Improvements over previous version:
 *  • HSL design-token colours throughout (no hard-coded hex).
 *  • Three shunt highlights (DV / FO / DA) with focused detail card.
 *  • "Trace circulation" stepper that walks the user through the 8-step
 *    foetal pathway, dimming non-active vessels and pulsing the active one.
 *  • "At birth" toggle that overlays the neonatal transition: closure of
 *    each shunt with annotated mechanism + adult ligamentous remnant.
 *  • Preferential streaming arrow at the crista dividens, making it
 *    visually obvious that oxygenated IVC blood is steered across the FO.
 *  • Continuous SpO₂ gradient legend (deoxygenated → mixed → oxygenated).
 */

type ShuntId = "dv" | "fo" | "da";

interface Step {
  id: string;
  label: string;
  detail: string;
  highlight?: ShuntId;
}

const STEPS: Step[] = [
  { id: "s1", label: "Placenta → umbilical vein", detail: "Oxygenated blood (SpO₂ ~80%) leaves the placenta in the single umbilical vein toward the foetal liver." },
  { id: "s2", label: "Ductus venosus bypass", detail: "~50% of umbilical venous blood is shunted past the hepatic sinusoids into the IVC, preserving its high O₂ content.", highlight: "dv" },
  { id: "s3", label: "IVC → right atrium", detail: "Mixed IVC blood (oxygenated DV + deoxygenated lower-body return) enters the RA from below." },
  { id: "s4", label: "Foramen ovale streaming", detail: "The crista dividens directs the oxygen-rich IVC stream preferentially across the FO into the LA, supplying the brain and coronaries.", highlight: "fo" },
  { id: "s5", label: "LA → LV → ascending aorta", detail: "Best-oxygenated blood is ejected to the upper body, brain (~65%) and myocardium." },
  { id: "s6", label: "SVC → RA → RV → pulmonary trunk", detail: "Deoxygenated SVC blood streams across the RA to the RV and out into the pulmonary artery." },
  { id: "s7", label: "Ductus arteriosus", detail: "High PVR shunts ~90% of RV output through the DA into the descending aorta, bypassing the collapsed lungs.", highlight: "da" },
  { id: "s8", label: "Descending aorta → umbilical arteries", detail: "Two umbilical arteries return desaturated blood (SpO₂ ~58%) to the placenta for re-oxygenation." },
];

const SHUNT_INFO: Record<ShuntId, { name: string; foetal: string; transition: string; remnant: string }> = {
  dv: {
    name: "Ductus venosus",
    foetal: "Bypasses hepatic sinusoids — ~50% of umbilical venous blood (SpO₂ ~80%) flows directly into the IVC.",
    transition: "Functional closure within minutes of cord clamping (loss of umbilical venous flow).",
    remnant: "Ligamentum venosum",
  },
  fo: {
    name: "Foramen ovale",
    foetal: "Flap valve in the interatrial septum. Open because RA pressure > LA pressure. Crista dividens directs IVC blood across it.",
    transition: "First breath ↓ PVR → ↑ pulmonary venous return → LA pressure > RA pressure → flap closes against septum primum.",
    remnant: "Fossa ovalis (patent in ~25% of adults as PFO)",
  },
  da: {
    name: "Ductus arteriosus",
    foetal: "Pulmonary trunk → descending aorta, just distal to L subclavian. Patent due to low PaO₂ and circulating PGE₂.",
    transition: "↑ PaO₂ + ↓ PGE₂ after birth → smooth-muscle contraction. Functional closure 10–15 h, anatomical closure by 2–3 weeks.",
    remnant: "Ligamentum arteriosum",
  },
};

const FoetalCirculationDiagram = () => {
  const [activeShunt, setActiveShunt] = useState<ShuntId | null>(null);
  const [stepIdx, setStepIdx] = useState<number | null>(null);
  const [showBirth, setShowBirth] = useState(false);

  const activeStep = stepIdx !== null ? STEPS[stepIdx] : null;
  const focusedShunt: ShuntId | null = activeStep?.highlight ?? activeShunt;

  // Dim non-focused elements when a shunt OR a step is selected.
  const focused = focusedShunt !== null || activeStep !== null;
  const dim = (id?: ShuntId | string) => {
    if (!focused) return 1;
    if (focusedShunt && id === focusedShunt) return 1;
    if (activeStep && id === activeStep.id) return 1;
    return 0.18;
  };
  const sw = (id: ShuntId) => (focusedShunt === id ? 6 : 3);
  const glow = (id: ShuntId) => (focusedShunt === id ? "url(#fc-glow)" : "none");

  // Token-based colours (HSL via design system in Tailwind config indirectly,
  // but here we need raw HSL strings inside the SVG paint attributes).
  const C = {
    oxy: "hsl(0 75% 55%)",          // oxygenated (umbilical vein, ascending aorta)
    deoxy: "hsl(215 80% 55%)",      // deoxygenated (SVC, PA, umb. arteries)
    mixed: "hsl(280 60% 58%)",      // mixed (IVC, descending aorta)
    organ: "hsl(var(--muted-foreground))",
    border: "hsl(var(--border))",
    surface: "hsl(var(--card))",
    text: "hsl(var(--foreground))",
    sub: "hsl(var(--muted-foreground))",
    placenta: "hsl(0 70% 60%)",
    liver: "hsl(35 75% 50%)",
    brain: "hsl(45 70% 55%)",
    lung: "hsl(210 70% 65%)",
    closed: "hsl(var(--muted-foreground))",
  };

  return (
    <DiagramFigure
      id="foetal-circulation-diagram"
      title="Foetal circulation"
      description="Auto-generated wrapper for the Foetal circulation anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Foetal Blood Flow & Oxygen Saturation</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Click a shunt to highlight, walk the circulation step-by-step, or toggle <em>At birth</em> to see the
              transition to neonatal circulation.
            </p>
          </div>
          <button
            onClick={() => {
              setShowBirth((v) => !v);
              setActiveShunt(null);
              setStepIdx(null);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              showBirth
                ? "bg-primary text-primary-foreground border-primary shadow"
                : "bg-secondary/60 text-foreground border-border hover:border-primary/50"
            }`}
          >
            {showBirth ? "● At birth (showing closure)" : "○ At birth"}
          </button>
        </div>
  
        {/* Shunt buttons */}
        <div className="flex flex-wrap gap-2">
          {(["dv", "fo", "da"] as ShuntId[]).map((id) => {
            const info = SHUNT_INFO[id];
            const isActive = activeShunt === id;
            return (
                  <button
                key={id}
                onClick={() => {
                  setActiveShunt(isActive ? null : id);
                  setStepIdx(null);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary/50 text-muted-foreground border-border hover:border-primary/50"
                }`}
              >
                {info.name}
              </button>
    );
          })}
          <div className="flex items-center gap-1 ml-auto">
            <button
              onClick={() => {
                setStepIdx((i) => (i === null ? 0 : Math.max(0, i - 1)));
                setActiveShunt(null);
              }}
              className="px-2.5 py-1.5 rounded-md text-xs border border-border bg-secondary/50 hover:bg-secondary"
              aria-label="Previous step"
            >
              ◀
            </button>
            <span className="text-xs text-muted-foreground tabular-nums w-20 text-center">
              {stepIdx === null ? "Trace flow" : `Step ${stepIdx + 1} / ${STEPS.length}`}
            </span>
            <button
              onClick={() => {
                setStepIdx((i) => (i === null ? 0 : Math.min(STEPS.length - 1, i + 1)));
                setActiveShunt(null);
              }}
              className="px-2.5 py-1.5 rounded-md text-xs border border-border bg-secondary/50 hover:bg-secondary"
              aria-label="Next step"
            >
              ▶
            </button>
            {stepIdx !== null && (
              <button
                onClick={() => setStepIdx(null)}
                className="px-2 py-1.5 rounded-md text-xs text-muted-foreground hover:text-foreground"
                aria-label="Clear step"
              >
                ✕
              </button>
            )}
          </div>
        </div>
  
        <div className="relative w-full overflow-hidden rounded-xl border border-border bg-gradient-to-b from-secondary/5 to-secondary/20">
          <svg viewBox="0 0 620 860" className="w-full h-auto" style={{ maxHeight: "80vh" }}>
            <defs>
              <filter id="fc-glow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              <filter id="fc-sh"><feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.12" /></filter>
              <radialGradient id="fc-lung" cx=".5" cy=".5" r=".5">
                <stop offset="0%" stopColor={C.lung} stopOpacity="0.5" />
                <stop offset="100%" stopColor={C.lung} stopOpacity="0.12" />
              </radialGradient>
              <radialGradient id="fc-plac" cx=".5" cy=".4" r=".6">
                <stop offset="0%" stopColor={C.placenta} stopOpacity="0.55" />
                <stop offset="100%" stopColor={C.placenta} stopOpacity="0.1" />
              </radialGradient>
              <linearGradient id="fc-spo2" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor={C.deoxy} />
                <stop offset="50%" stopColor={C.mixed} />
                <stop offset="100%" stopColor={C.oxy} />
              </linearGradient>
              {/* Arrowheads */}
              <marker id="fc-arr-oxy" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill={C.oxy} />
              </marker>
              <marker id="fc-arr-deoxy" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill={C.deoxy} />
              </marker>
              <marker id="fc-arr-mixed" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill={C.mixed} />
              </marker>
            </defs>
  
            {/* ══════ BRAIN ══════ */}
            <g opacity={dim()}>
              <ellipse cx="310" cy="58" rx="55" ry="44" fill={C.brain} fillOpacity="0.18" stroke={C.brain} strokeWidth="1.5" filter="url(#fc-sh)" />
              <path d="M270,48 Q290,30 310,33 Q330,30 350,48" fill="none" stroke={C.brain} strokeWidth="1" opacity="0.55" />
              <path d="M275,58 Q293,45 310,47 Q327,45 345,58" fill="none" stroke={C.brain} strokeWidth="1" opacity="0.4" />
              <text x="310" y="56" textAnchor="middle" fontSize="11" fontWeight="600" fill={C.text} opacity="0.85">Brain</text>
              <text x="310" y="70" textAnchor="middle" fontSize="8" fill={C.sub}>SpO₂ ~65%</text>
            </g>
  
            {/* ══════ LUNGS ══════ */}
            <g opacity={dim()}>
              <path d="M115,220 Q80,245 75,310 Q75,375 110,395 Q140,405 165,375 Q178,350 178,290 Q175,240 148,220 Z"
                fill="url(#fc-lung)" stroke={C.lung} strokeWidth="1.5" filter="url(#fc-sh)" />
              <text x="125" y="310" textAnchor="middle" fontSize="10" fontWeight="500" fill={C.text} opacity="0.75">R Lung</text>
              <text x="125" y="324" textAnchor="middle" fontSize="7" fill={C.sub}>{showBirth ? "↑ flow after birth" : "~5% CO"}</text>
            </g>
            <g opacity={dim()}>
              <path d="M505,220 Q540,245 545,310 Q545,375 510,395 Q480,405 455,375 Q442,350 442,290 Q445,240 472,220 Z"
                fill="url(#fc-lung)" stroke={C.lung} strokeWidth="1.5" filter="url(#fc-sh)" />
              <text x="495" y="310" textAnchor="middle" fontSize="10" fontWeight="500" fill={C.text} opacity="0.75">L Lung</text>
              <text x="495" y="324" textAnchor="middle" fontSize="7" fill={C.sub}>{showBirth ? "↑ flow after birth" : "~5% CO"}</text>
            </g>
  
            {/* ══════ HEART ══════ */}
            <g filter="url(#fc-sh)">
              <path d="M240,225 Q215,225 210,260 Q205,300 230,330 Q255,360 310,400 Q365,360 390,330 Q415,300 410,260 Q405,225 380,225 Q358,220 340,242 Q330,252 310,242 Q290,252 280,242 Q262,220 240,225 Z"
                fill={C.placenta} fillOpacity="0.08" stroke={C.placenta} strokeWidth="1.5" opacity="0.55" />
              <line x1="310" y1="238" x2="310" y2="390" stroke={C.placenta} strokeWidth="1.5" opacity="0.3" />
  
              {/* RA */}
              <path d="M240,240 Q215,248 212,275 Q212,305 240,320 L310,320 L310,240 Z"
                fill={C.deoxy} fillOpacity="0.18" stroke={C.deoxy} strokeWidth="1" opacity="0.65" />
              <text x="262" y="278" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.deoxy}>RA</text>
              <text x="262" y="295" textAnchor="middle" fontSize="7.5" fill={C.deoxy} opacity="0.85">SpO₂ ~67%</text>
  
              {/* LA */}
              <path d="M380,240 Q405,248 408,275 Q408,305 380,320 L310,320 L310,240 Z"
                fill={C.oxy} fillOpacity="0.18" stroke={C.oxy} strokeWidth="1" opacity="0.65" />
              <text x="358" y="278" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.oxy}>LA</text>
              <text x="358" y="295" textAnchor="middle" fontSize="7.5" fill={C.oxy} opacity="0.85">SpO₂ ~65%</text>
  
              {/* RV */}
              <path d="M240,320 Q212,328 218,360 Q228,382 280,395 L310,385 L310,320 Z"
                fill={C.deoxy} fillOpacity="0.13" stroke={C.deoxy} strokeWidth="1" opacity="0.6" />
              <text x="265" y="358" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.deoxy}>RV</text>
  
              {/* LV */}
              <path d="M380,320 Q408,328 402,360 Q392,382 340,395 L310,385 L310,320 Z"
                fill={C.oxy} fillOpacity="0.13" stroke={C.oxy} strokeWidth="1" opacity="0.6" />
              <text x="355" y="358" textAnchor="middle" fontSize="14" fontWeight="700" fill={C.oxy}>LV</text>
  
              {/* Foramen Ovale */}
              <ellipse cx="310" cy="280" rx="9" ry="15"
                fill={showBirth ? C.closed : (focusedShunt === "fo" ? C.mixed : "hsl(280 60% 80%)")}
                fillOpacity={showBirth ? 0.4 : (focusedShunt === "fo" ? 0.55 : 0.3)}
                stroke={showBirth ? C.closed : C.mixed}
                strokeWidth={focusedShunt === "fo" ? 2.5 : 1.5}
                strokeDasharray={showBirth ? "3,2" : "none"}
                opacity={dim("fo")} filter={glow("fo")}
                style={{ cursor: "pointer" }}
                onClick={() => { setActiveShunt(activeShunt === "fo" ? null : "fo"); setStepIdx(null); }} />
              <text x="310" y="283" textAnchor="middle" fontSize="6.5" fontWeight="600"
                fill={showBirth ? C.closed : C.mixed} opacity={dim("fo")}>FO</text>
            </g>
  
            {/* ══════ SVC → RA ══════ */}
            <g opacity={dim()}>
              <path d="M265,140 L265,225" fill="none" stroke={C.deoxy} strokeWidth="3" strokeLinecap="round"
                markerEnd="url(#fc-arr-deoxy)" />
              <text x="240" y="175" fontSize="9" fontWeight="600" fill={C.deoxy} transform="rotate(-90,240,175)">SVC</text>
              <circle r="4" fill={C.deoxy} opacity="0.9">
                <animateMotion dur="2s" repeatCount="indefinite" path="M265,140 L265,225" />
              </circle>
              <circle r="4" fill={C.deoxy} opacity="0.6">
                <animateMotion dur="2s" repeatCount="indefinite" path="M265,140 L265,225" begin="1s" />
              </circle>
            </g>
  
            {/* ══════ IVC → RA ══════ */}
            <g opacity={dim()}>
              <path d="M265,480 L265,400" fill="none" stroke={C.mixed} strokeWidth="3" strokeLinecap="round"
                markerEnd="url(#fc-arr-mixed)" />
              <text x="240" y="450" fontSize="9" fontWeight="600" fill={C.mixed} transform="rotate(-90,240,450)">IVC</text>
              <text x="282" y="465" fontSize="7" fill={C.mixed} opacity="0.8">SpO₂ ~67%</text>
              <circle r="4" fill={C.mixed} opacity="0.9">
                <animateMotion dur="2.5s" repeatCount="indefinite" path="M265,480 L265,400" />
              </circle>
            </g>
  
            {/* ══════ Crista dividens / FO streaming ══════ */}
            {!showBirth && (
              <g opacity={dim("fo")}>
                {/* Curved arrow showing IVC blood being directed across FO */}
                <path d="M270,395 Q280,340 298,288" fill="none" stroke={C.oxy} strokeWidth="1.5"
                  strokeDasharray="3,3" opacity="0.7" />
                <text x="232" y="372" fontSize="6.5" fill={C.oxy} opacity="0.9" fontStyle="italic">crista</text>
                <text x="232" y="382" fontSize="6.5" fill={C.oxy} opacity="0.9" fontStyle="italic">dividens</text>
                {/* FO crossing */}
                <path d="M298,280 L322,280" fill="none" stroke={C.mixed}
                  strokeWidth={sw("fo")} strokeLinecap="round" filter={glow("fo")}
                  markerEnd="url(#fc-arr-mixed)" />
                <text x="310" y="258" textAnchor="middle" fontSize="8" fontWeight="700" fill={C.mixed} opacity={dim("fo")}>Foramen Ovale</text>
                <circle r="3.5" fill={C.mixed} opacity="0.9">
                  <animateMotion dur="1.2s" repeatCount="indefinite" path="M296,280 L324,280" />
                </circle>
              </g>
            )}
            {showBirth && (
              <g opacity={dim("fo")}>
                <text x="310" y="258" textAnchor="middle" fontSize="8" fontWeight="700" fill={C.closed}>FO closed</text>
                <text x="310" y="248" textAnchor="middle" fontSize="6.5" fill={C.sub}>→ fossa ovalis</text>
              </g>
            )}
  
            {/* ══════ Ascending aorta ══════ */}
            <g opacity={dim()}>
              <path d="M380,320 Q410,290 405,250 Q400,215 385,190 Q370,165 350,140 L340,120"
                fill="none" stroke={C.oxy} strokeWidth="3" strokeLinecap="round"
                markerEnd="url(#fc-arr-oxy)" />
              <text x="420" y="245" fontSize="8.5" fontWeight="600" fill={C.oxy}>Asc. Aorta</text>
              <circle r="4" fill={C.oxy} opacity="0.9">
                <animateMotion dur="2.5s" repeatCount="indefinite" path="M380,320 Q410,290 405,250 Q400,215 385,190 Q370,165 350,140 L340,120" />
              </circle>
            </g>
            <g opacity={dim()}>
              <path d="M340,120 Q325,105 310,102 Q290,100 275,108" fill="none" stroke={C.oxy} strokeWidth="3" strokeLinecap="round" />
              <text x="310" y="96" textAnchor="middle" fontSize="7.5" fontWeight="500" fill={C.oxy} opacity="0.75">Aortic Arch</text>
            </g>
            <g opacity={dim()}>
              <path d="M340,120 L330,95 Q320,78 310,72" fill="none" stroke={C.oxy} strokeWidth="2" strokeLinecap="round" opacity="0.7" />
              <circle r="3" fill={C.oxy} opacity="0.8">
                <animateMotion dur="2s" repeatCount="indefinite" path="M340,120 L330,95 Q320,78 310,72" />
              </circle>
            </g>
  
            {/* ══════ Descending aorta ══════ */}
            <g opacity={dim()}>
              <path d="M275,108 L180,180 L175,350 L180,480 L190,570"
                fill="none" stroke={C.mixed} strokeWidth="3" strokeLinecap="round" />
              <text x="155" y="420" fontSize="8.5" fontWeight="600" fill={C.mixed} transform="rotate(-90,155,420)">Descending Aorta</text>
              <circle r="4" fill={C.mixed} opacity="0.85">
                <animateMotion dur="5s" repeatCount="indefinite" path="M275,108 L180,180 L175,350 L180,480 L190,570" />
              </circle>
              <circle r="4" fill={C.mixed} opacity="0.55">
                <animateMotion dur="5s" repeatCount="indefinite" path="M275,108 L180,180 L175,350 L180,480 L190,570" begin="2.5s" />
              </circle>
            </g>
  
            {/* ══════ PA ══════ */}
            <g opacity={dim()}>
              <path d="M245,340 Q225,320 210,290 Q200,265 195,240"
                fill="none" stroke={C.deoxy} strokeWidth="3" strokeLinecap="round" />
              <text x="195" y="280" fontSize="9" fontWeight="600" fill={C.deoxy} transform="rotate(-70,195,280)">PA</text>
              <path d="M195,240 Q185,235 172,242 Q160,255 155,275" fill="none" stroke={C.deoxy} strokeWidth="2" opacity="0.5" />
              <path d="M195,240 Q210,225 260,218 Q340,210 410,225 Q440,235 460,250"
                fill="none" stroke={C.deoxy} strokeWidth="2" opacity={showBirth ? 0.85 : 0.45}
                strokeDasharray={showBirth ? "none" : "none"} />
              <circle r="2.5" fill={C.deoxy} opacity={showBirth ? 0.95 : 0.5}>
                <animateMotion dur="3s" repeatCount="indefinite" path="M195,240 Q185,235 172,242 Q160,255 155,275" />
              </circle>
              {showBirth && (
                <circle r="2.5" fill={C.deoxy} opacity="0.9">
                  <animateMotion dur="3s" repeatCount="indefinite" path="M195,240 Q210,225 260,218 Q340,210 410,225 Q440,235 460,250" />
                </circle>
              )}
            </g>
  
            {/* Pulmonary veins */}
            <g opacity={dim()}>
              <path d="M165,300 Q230,280 310,260 Q370,250 400,248"
                fill="none" stroke={C.oxy} strokeWidth={showBirth ? "2.5" : "1.5"}
                opacity={showBirth ? 0.85 : 0.35} strokeDasharray={showBirth ? "none" : "4,3"} />
              <text x="430" y="248" fontSize="7" fill={C.oxy} opacity="0.75">Pulm. Veins</text>
            </g>
  
            {/* ══════ Ductus arteriosus ══════ */}
            <g opacity={dim("da")}>
              <path d="M195,240 Q185,210 190,190 Q195,175 210,170 Q230,165 255,168 Q270,170 275,175"
                fill="none"
                stroke={showBirth ? C.closed : C.deoxy}
                strokeWidth={showBirth ? 2 : sw("da")} strokeLinecap="round"
                strokeDasharray={showBirth ? "4,4" : (focusedShunt === "da" ? "none" : "8,4")}
                opacity={showBirth ? 0.55 : 1}
                filter={glow("da")} />
              <text x="230" y="155" textAnchor="middle" fontSize="8.5" fontWeight="700"
                fill={showBirth ? C.closed : C.deoxy} opacity={dim("da")}>
                {showBirth ? "DA closing" : "Ductus Arteriosus"}
              </text>
              <text x="230" y="145" textAnchor="middle" fontSize="7" fill={showBirth ? C.sub : C.deoxy}
                opacity={0.7 * (dim("da") as number)}>
                {showBirth ? "→ ligamentum arteriosum" : "~90% of RV output"}
              </text>
              {!showBirth && (
                <>
                  <circle r="4" fill={C.deoxy} opacity="0.9">
                    <animateMotion dur="2s" repeatCount="indefinite" path="M195,240 Q185,210 190,190 Q195,175 210,170 Q230,165 255,168 Q270,170 275,175" />
                  </circle>
                  <circle r="4" fill={C.deoxy} opacity="0.6">
                    <animateMotion dur="2s" repeatCount="indefinite" path="M195,240 Q185,210 190,190 Q195,175 210,170 Q230,165 255,168 Q270,170 275,175" begin="1s" />
                  </circle>
                </>
              )}
            </g>
  
            {/* ══════ LIVER ══════ */}
            <g opacity={dim()}>
              <path d="M240,505 Q200,500 185,518 Q175,535 185,555 Q200,570 265,572 Q340,572 360,555 Q375,535 365,518 Q350,500 310,505 Z"
                fill={C.liver} fillOpacity="0.2" stroke={C.liver} strokeWidth="1.5" filter="url(#fc-sh)" />
              <text x="280" y="545" textAnchor="middle" fontSize="11" fontWeight="600" fill={C.text} opacity="0.85">Liver</text>
              <text x="370" y="545" fontSize="7" fill={C.sub}>~50% via</text>
              <text x="370" y="555" fontSize="7" fill={C.sub}>hepatic sinusoids</text>
              <path d="M260,572 Q270,550 280,535 Q290,520 300,512" fill="none" stroke={C.oxy} strokeWidth="1.5" opacity="0.4" strokeDasharray="3,3" />
            </g>
  
            {/* ══════ Ductus venosus ══════ */}
            <g opacity={dim("dv")}>
              <path d="M255,600 Q250,580 253,560 Q258,535 265,500"
                fill="none"
                stroke={showBirth ? C.closed : C.oxy}
                strokeWidth={showBirth ? 2 : sw("dv")} strokeLinecap="round"
                strokeDasharray={showBirth ? "4,4" : (focusedShunt === "dv" ? "none" : "8,4")}
                opacity={showBirth ? 0.55 : 1}
                filter={glow("dv")} />
              <text x="290" y="568" fontSize="8" fontWeight="700"
                fill={showBirth ? C.closed : C.oxy} opacity={dim("dv")}>
                {showBirth ? "DV closed" : "Ductus"}
              </text>
              {!showBirth && (
                <text x="290" y="580" fontSize="8" fontWeight="700" fill={C.oxy} opacity={dim("dv")}>Venosus</text>
              )}
              <text x="290" y="592" fontSize="6.5" fill={showBirth ? C.sub : C.oxy} opacity={0.7 * (dim("dv") as number)}>
                {showBirth ? "→ lig. venosum" : "~50% bypasses liver"}
              </text>
              {!showBirth && (
                <>
                  <circle r="4" fill={C.oxy} opacity="0.9">
                    <animateMotion dur="2s" repeatCount="indefinite" path="M255,600 Q250,580 253,560 Q258,535 265,500" />
                  </circle>
                  <circle r="4" fill={C.oxy} opacity="0.65">
                    <animateMotion dur="2s" repeatCount="indefinite" path="M255,600 Q250,580 253,560 Q258,535 265,500" begin="1s" />
                  </circle>
                </>
              )}
            </g>
  
            {/* ══════ Lower body ══════ */}
            <g opacity={dim()}>
              <rect x="215" y="605" rx="12" ry="12" width="140" height="42" fill={C.mixed} fillOpacity="0.12" stroke={C.mixed} strokeWidth="1.5" filter="url(#fc-sh)" />
              <text x="285" y="626" textAnchor="middle" fontSize="10" fontWeight="600" fill={C.text} opacity="0.85">Lower Body</text>
              <text x="285" y="640" textAnchor="middle" fontSize="7.5" fill={C.sub}>SpO₂ ~58%</text>
            </g>
            <g opacity={dim()}>
              <path d="M190,570 Q200,590 215,615" fill="none" stroke={C.mixed} strokeWidth="3" opacity="0.6" />
            </g>
  
            {/* ══════ Placenta ══════ */}
            <g opacity={dim()}>
              <ellipse cx="310" cy="780" rx="105" ry="42"
                fill={showBirth ? "hsl(var(--muted))" : "url(#fc-plac)"}
                stroke={showBirth ? C.closed : C.placenta} strokeWidth="2"
                strokeDasharray={showBirth ? "5,4" : "none"}
                opacity={showBirth ? 0.5 : 1} filter="url(#fc-sh)" />
              <text x="310" y="786" textAnchor="middle" fontSize="12" fontWeight="700"
                fill={showBirth ? C.sub : C.placenta} opacity="0.9">Placenta</text>
              <text x="310" y="800" textAnchor="middle" fontSize="7" fill={C.sub}>
                {showBirth ? "Cord clamped — circuit interrupted" : "Maternal–foetal gas exchange"}
              </text>
            </g>
  
            {/* ══════ Umbilical vein ══════ */}
            <g opacity={dim()}>
              <path d="M280,738 Q275,715 268,690 Q260,665 255,645 Q250,625 252,610"
                fill="none"
                stroke={showBirth ? C.closed : C.oxy}
                strokeWidth={showBirth ? 2 : 5}
                strokeLinecap="round"
                strokeDasharray={showBirth ? "4,4" : "none"}
                opacity={showBirth ? 0.5 : 1} />
              <text x="235" y="695" fontSize="8.5" fontWeight="600"
                fill={showBirth ? C.sub : C.oxy} transform="rotate(-78,235,695)">
                {showBirth ? "Umb. v. → lig. teres" : "Umbilical Vein"}
              </text>
              {!showBirth && <text x="228" y="725" fontSize="7.5" fill={C.oxy} opacity="0.85">SpO₂ ~80%</text>}
              {!showBirth && (
                <>
                  <circle r="4.5" fill={C.oxy} opacity="0.9">
                    <animateMotion dur="3s" repeatCount="indefinite" path="M280,738 Q275,715 268,690 Q260,665 255,645 Q250,625 252,610" />
                  </circle>
                  <circle r="4.5" fill={C.oxy} opacity="0.6">
                    <animateMotion dur="3s" repeatCount="indefinite" path="M280,738 Q275,715 268,690 Q260,665 255,645 Q250,625 252,610" begin="1.5s" />
                  </circle>
                </>
              )}
            </g>
  
            {/* ══════ Umbilical arteries ══════ */}
            <g opacity={dim()}>
              <path d="M340,647 Q348,675 348,710 Q345,730 338,740" fill="none"
                stroke={showBirth ? C.closed : C.deoxy} strokeWidth={showBirth ? 1.5 : 3}
                strokeLinecap="round" strokeDasharray={showBirth ? "4,4" : "none"} opacity={showBirth ? 0.5 : 1} />
              <path d="M350,647 Q358,675 358,710 Q355,730 348,740" fill="none"
                stroke={showBirth ? C.closed : C.deoxy} strokeWidth={showBirth ? 1.5 : 3}
                strokeLinecap="round" strokeDasharray={showBirth ? "4,4" : "none"} opacity={showBirth ? 0.5 : 1} />
              <text x="375" y="690" fontSize="8" fontWeight="600" fill={showBirth ? C.sub : C.deoxy}>
                {showBirth ? "Umb. a. → med. umb. lig." : "Umb. Arteries ×2"}
              </text>
              {!showBirth && <text x="375" y="703" fontSize="7" fill={C.deoxy} opacity="0.75">SpO₂ ~58%</text>}
              {!showBirth && (
                <>
                  <circle r="3.5" fill={C.deoxy} opacity="0.9">
                    <animateMotion dur="3s" repeatCount="indefinite" path="M340,647 Q348,675 348,710 Q345,730 338,740" />
                  </circle>
                  <circle r="3.5" fill={C.deoxy} opacity="0.65">
                    <animateMotion dur="3s" repeatCount="indefinite" path="M350,647 Q358,675 358,710 Q355,730 348,740" begin="1s" />
                  </circle>
                </>
              )}
            </g>
  
            {/* Desc. aorta → umbilical arteries */}
            <g opacity={dim()}>
              <path d="M215,625 Q260,640 340,647" fill="none" stroke={C.mixed} strokeWidth="2" opacity={showBirth ? 0.2 : 0.5} />
              <path d="M215,625 Q270,645 350,647" fill="none" stroke={C.mixed} strokeWidth="2" opacity={showBirth ? 0.2 : 0.5} />
            </g>
  
            {/* ══════ LEGEND — SpO₂ gradient ══════ */}
            <g>
              <rect x="430" y="15" width="175" height="100" rx="8"
                fill="hsl(var(--card))" fillOpacity="0.92" stroke="hsl(var(--border))" strokeWidth="1" />
              <text x="442" y="34" fontSize="9.5" fontWeight="700" fill={C.text}>O₂ Saturation</text>
              <rect x="442" y="42" width="150" height="10" rx="3" fill="url(#fc-spo2)" />
              <text x="442" y="64" fontSize="7.5" fill={C.sub}>~55%</text>
              <text x="517" y="64" fontSize="7.5" fill={C.sub} textAnchor="middle">~67%</text>
              <text x="592" y="64" fontSize="7.5" fill={C.sub} textAnchor="end">~80%</text>
              <text x="442" y="78" fontSize="7.5" fill={C.deoxy}>● deoxy (SVC, PA, umb. a.)</text>
              <text x="442" y="92" fontSize="7.5" fill={C.mixed}>● mixed (IVC, desc. aorta)</text>
              <text x="442" y="106" fontSize="7.5" fill={C.oxy}>● highest O₂ (umb. v., DV) · asc. aorta intermediate ~65%</text>
            </g>
  
            {/* CO label */}
            <g opacity={dim()}>
              <text x="460" y="370" fontSize="7.5" fill={C.sub}>Combined ventricular</text>
              <text x="460" y="382" fontSize="7.5" fill={C.sub}>output ~450 mL/kg/min</text>
            </g>
  
            {/* Active step badge overlay */}
            {activeStep && (
              <g>
                <rect x="20" y="20" width="170" height="46" rx="8" fill="hsl(var(--primary))" opacity="0.95" stroke="hsl(var(--border))" strokeWidth="0.75" />
                <text x="30" y="40" fontSize="10" fontWeight="700" fill="hsl(var(--primary-foreground))">
                  Step {(stepIdx ?? 0) + 1} of {STEPS.length}
                </text>
                <text x="30" y="56" fontSize="9" fill="hsl(var(--primary-foreground))" opacity="0.95">
                  {activeStep.label}
                </text>
              </g>
            )}
          </svg>
        </div>
  
        {/* Active step detail card */}
        {activeStep && (
          <div className="p-4 rounded-lg border border-primary/30 bg-primary/5 animate-fade-in">
            <p className="font-semibold text-sm text-foreground">{activeStep.label}</p>
            <p className="text-sm text-muted-foreground mt-1">{activeStep.detail}</p>
          </div>
        )}
  
        {/* Shunt detail card */}
        {activeShunt && !activeStep && (
          <div className="p-4 rounded-lg border border-primary/30 bg-primary/5 animate-fade-in space-y-2">
            <p className="font-semibold text-sm text-foreground">{SHUNT_INFO[activeShunt].name}</p>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground/80">Foetal role: </span>
              {SHUNT_INFO[activeShunt].foetal}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground/80">At birth: </span>
              {SHUNT_INFO[activeShunt].transition}
            </p>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground/80">Adult remnant: </span>
              {SHUNT_INFO[activeShunt].remnant}
            </p>
          </div>
        )}
  
        {showBirth && !activeShunt && !activeStep && (
          <div className="p-4 rounded-lg border border-primary/30 bg-primary/5 animate-fade-in text-sm text-muted-foreground">
            <p className="font-semibold text-foreground mb-1">Transition to neonatal circulation</p>
            <p>
              Cord clamping removes the low-resistance placental bed (↑ SVR). The first breath drops PVR dramatically
              (alveolar O₂ ↑, mechanical lung expansion, NO release). Pulmonary venous return rises, lifting LA
              pressure above RA pressure → <strong>foramen ovale</strong> snaps shut. Rising PaO₂ and falling
              circulating PGE₂ constrict the <strong>ductus arteriosus</strong> (functional closure 10–15 h). Loss of
              umbilical venous flow collapses the <strong>ductus venosus</strong> within minutes. The dashed lines on
              the diagram mark vessels that obliterate to ligaments.
            </p>
          </div>
        )}
      </div>
    </DiagramFigure>
  );
};

export default FoetalCirculationDiagram;
