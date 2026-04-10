import { useState } from "react";

const FoetalCirculationDiagram = () => {
  const [activeShunt, setActiveShunt] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Foetal Blood Flow & Oxygen Saturation</h3>
      <p className="text-sm text-muted-foreground">Click a shunt label to highlight its pathway. Animated dots show direction of flow; colour indicates oxygen saturation.</p>

      <div className="flex flex-wrap gap-2 mb-2">
        {[
          { id: "dv", label: "Ductus Venosus" },
          { id: "fo", label: "Foramen Ovale" },
          { id: "da", label: "Ductus Arteriosus" },
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

      <div className="relative w-full overflow-hidden rounded-xl border border-border bg-secondary/10">
        <svg viewBox="0 0 500 620" className="w-full h-auto" style={{ maxHeight: "70vh" }}>
          <defs>
            {/* Oxygen saturation colours */}
            <linearGradient id="fc-oxy-high" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
            <linearGradient id="fc-oxy-mid" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
            <linearGradient id="fc-oxy-low" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>

            {/* Animated dot markers */}
            <marker id="fc-dot-red" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="6" markerHeight="6">
              <circle cx="3" cy="3" r="3" fill="#ef4444" />
            </marker>

            {/* Glow filter */}
            <filter id="fc-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>

            {/* Flow animation for dots along paths */}
            <circle id="fc-flow-dot" r="4" />
          </defs>

          {/* ===== ORGANS ===== */}
          {/* Placenta */}
          <ellipse cx="250" cy="585" rx="90" ry="25" fill="hsl(var(--destructive)/0.15)" stroke="hsl(var(--destructive)/0.4)" strokeWidth="1.5" />
          <text x="250" y="590" textAnchor="middle" className="text-[11px] font-semibold" fill="hsl(var(--destructive))">Placenta</text>

          {/* Liver */}
          <rect x="155" y="370" rx="18" ry="18" width="80" height="50" fill="hsl(var(--accent)/0.2)" stroke="hsl(var(--accent)/0.5)" strokeWidth="1.5" />
          <text x="195" y="400" textAnchor="middle" className="text-[10px] font-medium" fill="hsl(var(--foreground)/0.7)">Liver</text>

          {/* Heart chambers */}
          {/* RA */}
          <rect x="195" y="205" rx="12" ry="12" width="55" height="50" fill="hsl(var(--primary)/0.12)" stroke="hsl(var(--primary)/0.4)" strokeWidth="1.5" />
          <text x="222" y="225" textAnchor="middle" className="text-[10px] font-bold" fill="hsl(var(--primary))">RA</text>
          <text x="222" y="240" textAnchor="middle" className="text-[8px]" fill="hsl(var(--muted-foreground))">SpO₂ ~67%</text>

          {/* LA */}
          <rect x="260" y="205" rx="12" ry="12" width="55" height="50" fill="hsl(var(--destructive)/0.12)" stroke="hsl(var(--destructive)/0.4)" strokeWidth="1.5" />
          <text x="287" y="225" textAnchor="middle" className="text-[10px] font-bold" fill="hsl(var(--destructive))">LA</text>
          <text x="287" y="240" textAnchor="middle" className="text-[8px]" fill="hsl(var(--muted-foreground))">SpO₂ ~65%</text>

          {/* RV */}
          <rect x="195" y="260" rx="12" ry="12" width="55" height="50" fill="hsl(var(--primary)/0.12)" stroke="hsl(var(--primary)/0.4)" strokeWidth="1.5" />
          <text x="222" y="290" textAnchor="middle" className="text-[10px] font-bold" fill="hsl(var(--primary))">RV</text>

          {/* LV */}
          <rect x="260" y="260" rx="12" ry="12" width="55" height="50" fill="hsl(var(--destructive)/0.12)" stroke="hsl(var(--destructive)/0.4)" strokeWidth="1.5" />
          <text x="287" y="290" textAnchor="middle" className="text-[10px] font-bold" fill="hsl(var(--destructive))">LV</text>

          {/* Lungs */}
          <ellipse cx="130" cy="250" rx="40" ry="30" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1.5" />
          <text x="130" y="253" textAnchor="middle" className="text-[10px] font-medium" fill="hsl(var(--primary)/0.7)">Lungs</text>
          <text x="130" y="265" textAnchor="middle" className="text-[7px]" fill="hsl(var(--muted-foreground))">~10% RV output</text>

          {/* Brain */}
          <ellipse cx="340" cy="120" rx="45" ry="25" fill="hsl(var(--destructive)/0.1)" stroke="hsl(var(--destructive)/0.3)" strokeWidth="1.5" />
          <text x="340" y="118" textAnchor="middle" className="text-[10px] font-medium" fill="hsl(var(--foreground)/0.7)">Brain</text>
          <text x="340" y="130" textAnchor="middle" className="text-[7px]" fill="hsl(var(--muted-foreground))">SpO₂ ~65%</text>

          {/* Lower Body */}
          <rect x="200" y="480" rx="10" ry="10" width="100" height="35" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1.5" />
          <text x="250" y="500" textAnchor="middle" className="text-[10px] font-medium" fill="hsl(var(--foreground)/0.7)">Lower Body</text>
          <text x="250" y="512" textAnchor="middle" className="text-[7px]" fill="hsl(var(--muted-foreground))">SpO₂ ~58%</text>

          {/* ===== VESSELS & FLOW PATHS ===== */}

          {/* Umbilical Vein: Placenta → Liver/DV area */}
          <path d="M210,560 L210,530 L195,420" fill="none" stroke="#ef4444" strokeWidth="3" opacity="0.7" />
          <text x="175" y="470" className="text-[8px] font-medium" fill="#ef4444" transform="rotate(-80, 175, 470)">Umbilical Vein</text>
          <text x="165" y="530" className="text-[7px]" fill="#ef4444">SpO₂ ~80%</text>
          {/* Animated flow dot */}
          <circle r="4" fill="#ef4444" opacity="0.9">
            <animateMotion dur="3s" repeatCount="indefinite" path="M210,560 L210,530 L195,420" />
          </circle>
          <circle r="4" fill="#ef4444" opacity="0.9">
            <animateMotion dur="3s" repeatCount="indefinite" path="M210,560 L210,530 L195,420" begin="1.5s" />
          </circle>

          {/* Ductus Venosus: bypasses liver → IVC */}
          <path
            d="M215,395 C230,370 230,345 222,330"
            fill="none"
            stroke="#ef4444"
            strokeWidth={activeShunt === "dv" ? 4 : 2.5}
            strokeDasharray={activeShunt === "dv" ? "none" : "6,3"}
            opacity={activeShunt && activeShunt !== "dv" ? 0.3 : 0.8}
            filter={activeShunt === "dv" ? "url(#fc-glow)" : "none"}
          />
          <text x="240" y="360" className="text-[7px] font-bold" fill="#ef4444"
            opacity={activeShunt && activeShunt !== "dv" ? 0.3 : 1}>
            Ductus Venosus
          </text>
          <circle r="3.5" fill="#ef4444" opacity={activeShunt && activeShunt !== "dv" ? 0.2 : 0.9}>
            <animateMotion dur="2s" repeatCount="indefinite" path="M215,395 C230,370 230,345 222,330" />
          </circle>

          {/* IVC → RA */}
          <path d="M222,330 L222,255" fill="none" stroke="#a855f7" strokeWidth="3" opacity="0.6" />
          <text x="205" y="318" className="text-[7px]" fill="#a855f7" transform="rotate(-90, 205, 318)">IVC</text>
          <circle r="3.5" fill="#a855f7" opacity="0.8">
            <animateMotion dur="2s" repeatCount="indefinite" path="M222,330 L222,255" />
          </circle>

          {/* SVC → RA */}
          <path d="M222,160 L222,205" fill="none" stroke="#3b82f6" strokeWidth="3" opacity="0.6" />
          <text x="205" y="180" className="text-[7px]" fill="#3b82f6" transform="rotate(-90, 205, 180)">SVC</text>
          <circle r="3.5" fill="#3b82f6" opacity="0.8">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M222,160 L222,205" />
          </circle>

          {/* Foramen Ovale: RA → LA */}
          <path
            d="M250,230 L260,230"
            fill="none"
            stroke="#a855f7"
            strokeWidth={activeShunt === "fo" ? 5 : 3}
            opacity={activeShunt && activeShunt !== "fo" ? 0.3 : 0.8}
            filter={activeShunt === "fo" ? "url(#fc-glow)" : "none"}
          />
          <text x="255" y="200" textAnchor="middle" className="text-[7px] font-bold" fill="#a855f7"
            opacity={activeShunt && activeShunt !== "fo" ? 0.3 : 1}>
            Foramen Ovale
          </text>
          <circle r="3" fill="#a855f7" opacity={activeShunt && activeShunt !== "fo" ? 0.2 : 0.9}>
            <animateMotion dur="1s" repeatCount="indefinite" path="M248,230 L262,230" />
          </circle>

          {/* RA → RV */}
          <path d="M222,255 L222,260" fill="none" stroke="#3b82f6" strokeWidth="2.5" opacity="0.5" />

          {/* LA → LV */}
          <path d="M287,255 L287,260" fill="none" stroke="#ef4444" strokeWidth="2.5" opacity="0.5" />

          {/* LV → Ascending Aorta → Brain */}
          <path d="M300,260 L340,200 L340,145" fill="none" stroke="#ef4444" strokeWidth="3" opacity="0.6" />
          <text x="350" y="175" className="text-[7px] font-medium" fill="#ef4444">Asc. Aorta</text>
          <circle r="3.5" fill="#ef4444" opacity="0.8">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M300,260 L340,200 L340,145" />
          </circle>

          {/* PA from RV */}
          <path d="M195,280 L160,280" fill="none" stroke="#3b82f6" strokeWidth="3" opacity="0.6" />
          <text x="165" y="275" className="text-[7px]" fill="#3b82f6">PA</text>

          {/* PA → Lungs (10%) */}
          <path d="M160,280 L140,270" fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.4" />
          <circle r="2.5" fill="#3b82f6" opacity="0.5">
            <animateMotion dur="3s" repeatCount="indefinite" path="M160,280 L140,270" />
          </circle>

          {/* Lungs → LA (pulmonary veins) */}
          <path d="M145,230 L260,220" fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.3" />
          <text x="190" y="218" className="text-[7px]" fill="hsl(var(--muted-foreground))">Pulm. veins</text>

          {/* Ductus Arteriosus: PA → Descending Aorta */}
          <path
            d="M160,280 C120,310 120,380 200,430 L250,480"
            fill="none"
            stroke="#3b82f6"
            strokeWidth={activeShunt === "da" ? 4 : 2.5}
            strokeDasharray={activeShunt === "da" ? "none" : "6,3"}
            opacity={activeShunt && activeShunt !== "da" ? 0.3 : 0.8}
            filter={activeShunt === "da" ? "url(#fc-glow)" : "none"}
          />
          <text x="100" y="350" className="text-[7px] font-bold" fill="#3b82f6"
            opacity={activeShunt && activeShunt !== "da" ? 0.3 : 1}>
            Ductus
          </text>
          <text x="100" y="360" className="text-[7px] font-bold" fill="#3b82f6"
            opacity={activeShunt && activeShunt !== "da" ? 0.3 : 1}>
            Arteriosus
          </text>
          <text x="100" y="372" className="text-[7px]" fill="#3b82f6"
            opacity={activeShunt && activeShunt !== "da" ? 0.3 : 0.7}>
            ~90% RV output
          </text>
          <circle r="4" fill="#3b82f6" opacity={activeShunt && activeShunt !== "da" ? 0.2 : 0.9}>
            <animateMotion dur="3s" repeatCount="indefinite" path="M160,280 C120,310 120,380 200,430 L250,480" />
          </circle>
          <circle r="4" fill="#3b82f6" opacity={activeShunt && activeShunt !== "da" ? 0.2 : 0.9}>
            <animateMotion dur="3s" repeatCount="indefinite" path="M160,280 C120,310 120,380 200,430 L250,480" begin="1.5s" />
          </circle>

          {/* Descending Aorta → Lower Body */}
          <path d="M340,200 C380,260 380,400 300,480" fill="none" stroke="#a855f7" strokeWidth="2.5" opacity="0.5" />
          <text x="380" y="340" className="text-[8px]" fill="#a855f7" transform="rotate(70, 380, 340)">Desc. Aorta</text>
          <circle r="3.5" fill="#a855f7" opacity="0.7">
            <animateMotion dur="4s" repeatCount="indefinite" path="M340,200 C380,260 380,400 300,480" />
          </circle>

          {/* Umbilical Arteries: Lower Body → Placenta */}
          <path d="M290,515 L290,560" fill="none" stroke="#3b82f6" strokeWidth="3" opacity="0.6" />
          <text x="300" y="540" className="text-[7px]" fill="#3b82f6">Umb. Arteries</text>
          <circle r="3.5" fill="#3b82f6" opacity="0.8">
            <animateMotion dur="2s" repeatCount="indefinite" path="M290,515 L290,560" />
          </circle>

          {/* ===== LEGEND ===== */}
          <rect x="15" y="15" width="140" height="75" rx="8" fill="hsl(var(--background)/0.9)" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="25" y="32" className="text-[9px] font-bold" fill="hsl(var(--foreground))">O₂ Saturation Key</text>
          <circle cx="30" cy="45" r="5" fill="#ef4444" />
          <text x="40" y="48" className="text-[8px]" fill="hsl(var(--foreground)/0.8)">High (~80%) — Umb. vein</text>
          <circle cx="30" cy="60" r="5" fill="#a855f7" />
          <text x="40" y="63" className="text-[8px]" fill="hsl(var(--foreground)/0.8)">Mixed (~60-67%)</text>
          <circle cx="30" cy="75" r="5" fill="#3b82f6" />
          <text x="40" y="78" className="text-[8px]" fill="hsl(var(--foreground)/0.8)">Low (~55-58%)</text>
        </svg>
      </div>

      {/* Shunt detail card */}
      {activeShunt && (
        <div className="p-4 rounded-lg border border-primary/30 bg-primary/5 animate-fade-in">
          {activeShunt === "dv" && (
            <>
              <p className="font-semibold text-sm text-foreground">Ductus Venosus</p>
              <p className="text-sm text-muted-foreground mt-1">
                Bypasses the liver, shunting ~50% of well-oxygenated umbilical venous blood (SpO₂ ~80%) directly into the IVC and towards the heart. Closes functionally within minutes of birth → becomes the ligamentum venosum.
              </p>
            </>
          )}
          {activeShunt === "fo" && (
            <>
              <p className="font-semibold text-sm text-foreground">Foramen Ovale</p>
              <p className="text-sm text-muted-foreground mt-1">
                A flap valve allowing oxygenated IVC blood to stream from RA → LA, bypassing the pulmonary circulation. Open because RA pressure exceeds LA pressure. Closes functionally when LA pressure rises after the first breath. Patent in ~25% of adults (PFO).
              </p>
            </>
          )}
          {activeShunt === "da" && (
            <>
              <p className="font-semibold text-sm text-foreground">Ductus Arteriosus</p>
              <p className="text-sm text-muted-foreground mt-1">
                Diverts ~90% of RV output from the PA → descending aorta, bypassing high-resistance pulmonary vasculature. Kept open by PGE₂ and low PaO₂. Closes functionally within 10–15 hours of birth (↑ PaO₂ + ↓ PGE₂) → ligamentum arteriosum.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FoetalCirculationDiagram;
