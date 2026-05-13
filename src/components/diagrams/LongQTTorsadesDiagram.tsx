import { useMemo, useState } from "react";

type Trigger = "normal" | "classIII" | "hypoK" | "congenital" | "combined";

interface TriggerData {
  id: Trigger;
  label: string;
  qtMs: number; // QTc ms
  ikrBlock: number; // 0-1
  description: string;
  mechanism: string;
  ead: boolean; // generates EADs?
  torsades: boolean;
}

const triggers: Record<Trigger, TriggerData> = {
  normal: {
    id: "normal",
    label: "Normal",
    qtMs: 400,
    ikrBlock: 0,
    description: "Repolarisation reserve intact. IKr (rapid) and IKs (slow) delayed-rectifier K⁺ currents repolarise phase 3 efficiently. QTc 350–440 ms.",
    mechanism: "Balanced inward (Ca²⁺) and outward (K⁺) currents in phase 2/3.",
    ead: false,
    torsades: false,
  },
  classIII: {
    id: "classIII",
    label: "Class III antiarrhythmic",
    qtMs: 510,
    ikrBlock: 0.7,
    description: "Sotalol, amiodarone, dofetilide, ibutilide block IKr (hERG channel) → prolong phase 3 → ↑ APD and QT interval. Intentional therapeutic mechanism but creates pro-arrhythmic substrate.",
    mechanism: "IKr blockade ↓ outward K⁺ current during phase 3 → repolarisation slows → window for L-type Ca²⁺ channel reactivation.",
    ead: true,
    torsades: false,
  },
  hypoK: {
    id: "hypoK",
    label: "Hypokalaemia / hypoMg",
    qtMs: 490,
    ikrBlock: 0.5,
    description: "Low extracellular K⁺ paradoxically reduces IKr (channel kinetics depend on [K⁺]ₒ). HypoMg destabilises the channel further. Common in diuretic use, vomiting, DKA recovery.",
    mechanism: "↓ [K⁺]ₒ → ↓ IKr conductance → prolonged phase 3 + EAD susceptibility. Mg²⁺ stabilises the L-type Ca²⁺ channel.",
    ead: true,
    torsades: false,
  },
  congenital: {
    id: "congenital",
    label: "Congenital LQT",
    qtMs: 530,
    ikrBlock: 0.6,
    description: "LQT1 (KCNQ1, IKs loss-of-function) — exercise/swimming triggered. LQT2 (KCNH2/hERG, IKr loss) — auditory/emotional triggers. LQT3 (SCN5A, late INa gain-of-function) — sleep/bradycardia triggered.",
    mechanism: "Genetic loss of repolarisation reserve. LQT2 mimics drug-induced LQT; LQT3 has persistent inward Na⁺ current that prolongs plateau.",
    ead: true,
    torsades: false,
  },
  combined: {
    id: "combined",
    label: "Combined (drug + hypoK)",
    qtMs: 600,
    ikrBlock: 0.95,
    description: "Class III + hypokalaemia + bradycardia is the classic perioperative storm. Repolarisation reserve collapses → EAD reaches threshold → triggered activity → torsades de pointes.",
    mechanism: "Multi-hit IKr suppression. Pause-dependent EAD in a phase-2/3 plateau triggers polymorphic VT with characteristic twisting axis.",
    ead: true,
    torsades: true,
  },
};

// Build action potential SVG path. Phase 3 stretches with QT prolongation.
const buildAPPath = (qtMs: number, hasEAD: boolean) => {
  // baseline normal QT 400, plot width 320 spans 600ms total
  const plotW = 320;
  const plotH = 130;
  const msToX = (ms: number) => (ms / 700) * plotW;
  const mvToY = (mv: number) => plotH - ((mv + 90) / 130) * plotH; // -90 to +40

  const phase0End = msToX(5); // very fast upstroke
  const phase1End = msToX(15);
  const plateauEnd = msToX(qtMs * 0.55); // phase 2 length scales modestly
  const repolEnd = msToX(qtMs);

  let path = `M 0 ${mvToY(-90)}`;
  path += ` L ${phase0End} ${mvToY(30)}`; // phase 0 upstroke
  path += ` L ${phase1End} ${mvToY(10)}`; // phase 1 notch
  path += ` L ${plateauEnd} ${mvToY(5)}`; // phase 2 plateau

  if (hasEAD) {
    // EAD: bump up during phase 3
    const eadX = msToX(qtMs * 0.78);
    const eadPeak = msToX(qtMs * 0.85);
    const eadEnd = msToX(qtMs * 0.92);
    path += ` L ${eadX} ${mvToY(-30)}`;
    path += ` L ${eadPeak} ${mvToY(10)}`; // bump back up
    path += ` L ${eadEnd} ${mvToY(-50)}`;
    path += ` L ${repolEnd} ${mvToY(-90)}`;
  } else {
    path += ` L ${repolEnd} ${mvToY(-90)}`;
  }
  path += ` L ${plotW} ${mvToY(-90)}`;
  return { path, plotW, plotH, repolEnd, plateauEnd };
};

// Torsades wave: amplitude that twists (sinusoidal envelope rotation)
const buildTorsadesPath = (twist: boolean) => {
  const w = 320;
  const h = 60;
  let path = `M 0 ${h / 2}`;
  for (let x = 0; x <= w; x += 2) {
    const phase = (x / w) * Math.PI * 8;
    // Twisting envelope: amplitude waxes/wanes
    const envelope = twist ? Math.abs(Math.sin((x / w) * Math.PI)) * 22 + 4 : 6;
    const y = h / 2 + Math.sin(phase) * envelope;
    path += ` L ${x} ${y}`;
  }
  return { path, w, h };
};

export const LongQTTorsadesDiagram = () => {
  const [trigger, setTrigger] = useState<Trigger>("normal");
  const data = triggers[trigger];

  const ap = useMemo(() => buildAPPath(data.qtMs, data.ead), [data.qtMs, data.ead]);
  const normalAP = useMemo(() => buildAPPath(400, false), []);
  const torsades = useMemo(() => buildTorsadesPath(data.torsades), [data.torsades]);

  return (
    <div className="space-y-4">
      {/* Trigger selector */}
      <div className="flex flex-wrap gap-2">
        {(Object.values(triggers) as TriggerData[]).map((t) => (
          <button
            key={t.id}
            onClick={() => setTrigger(t.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              trigger === t.id
                ? "bg-primary/15 border-primary/50 text-primary"
                : "bg-secondary/50 border-border text-muted-foreground hover:bg-secondary"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Action potential plot */}
        <div className="lg:col-span-3 rounded-lg border border-border bg-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-foreground">Ventricular action potential</h4>
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-foreground/40" /> Normal</span>
              <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-primary" /> Current</span>
            </div>
          </div>
          <svg viewBox={`0 0 ${ap.plotW + 60} ${ap.plotH + 50}`} className="w-full" role="img" aria-label="LQT action potential">
            <g transform="translate(40, 10)">
              {/* Grid */}
              {[-90, -60, -30, 0, 30].map((mv) => (
                <g key={mv}>
                  <line x1="0" y1={ap.plotH - ((mv + 90) / 130) * ap.plotH} x2={ap.plotW} y2={ap.plotH - ((mv + 90) / 130) * ap.plotH}
                    stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.6" />
                  <text x="-4" y={ap.plotH - ((mv + 90) / 130) * ap.plotH + 3} fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="end">{mv}</text>
                </g>
              ))}
              {/* Time markers */}
              {[0, 200, 400, 600].map((ms) => (
                <g key={ms}>
                  <line x1={(ms / 700) * ap.plotW} y1={ap.plotH} x2={(ms / 700) * ap.plotW} y2={ap.plotH + 3} stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
                  <text x={(ms / 700) * ap.plotW} y={ap.plotH + 12} fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle">{ms}</text>
                </g>
              ))}
              <text x={ap.plotW / 2} y={ap.plotH + 24} fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle">time (ms)</text>
              <text x="-32" y={ap.plotH / 2} fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle" transform={`rotate(-90, -32, ${ap.plotH / 2})`}>mV</text>

              {/* Normal reference AP */}
              <path d={normalAP.path} fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.35" strokeDasharray="3 2" />

              {/* Current AP */}
              <path d={ap.path} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />

              {/* QT bracket */}
              <g>
                <line x1="0" y1={ap.plotH + 28} x2={ap.repolEnd} y2={ap.plotH + 28} stroke="hsl(var(--primary))" strokeWidth="1" />
                <line x1="0" y1={ap.plotH + 25} x2="0" y2={ap.plotH + 31} stroke="hsl(var(--primary))" strokeWidth="1" />
                <line x1={ap.repolEnd} y1={ap.plotH + 25} x2={ap.repolEnd} y2={ap.plotH + 31} stroke="hsl(var(--primary))" strokeWidth="1" />
                <text x={ap.repolEnd / 2} y={ap.plotH + 40} fontSize="9" fill="hsl(var(--primary))" textAnchor="middle" fontWeight="700">
                  QTc ≈ {data.qtMs} ms
                </text>
              </g>

              {/* EAD label */}
              {data.ead && (
                <g>
                  <circle cx={(data.qtMs / 700) * ap.plotW * 0.85} cy={ap.plotH - ((10 + 90) / 130) * ap.plotH} r="4" fill="none" stroke="hsl(0 70% 55%)" strokeWidth="1" className="animate-pulse" />
                  <text x={(data.qtMs / 700) * ap.plotW * 0.85 + 8} y={ap.plotH - ((10 + 90) / 130) * ap.plotH - 4} fontSize="8" fill="hsl(0 70% 55%)" fontWeight="700">EAD</text>
                </g>
              )}

              {/* Phase labels */}
              <text x="3" y="14" fontSize="7" fill="hsl(var(--muted-foreground))" fontWeight="600">0</text>
              <text x="20" y="22" fontSize="7" fill="hsl(var(--muted-foreground))" fontWeight="600">1</text>
              <text x={ap.plateauEnd / 2 + 10} y="26" fontSize="7" fill="hsl(var(--muted-foreground))" fontWeight="600">2 (plateau)</text>
              <text x={(ap.plateauEnd + ap.repolEnd) / 2} y="50" fontSize="7" fill="hsl(var(--muted-foreground))" fontWeight="600">3 (repol)</text>
            </g>
          </svg>

          {/* IKr current bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>IKr (hERG) outward K⁺ current</span>
              <span>{Math.round((1 - data.ikrBlock) * 100)}% of normal</span>
            </div>
            <div className="h-2 bg-secondary/60 rounded-full overflow-hidden">
              <div className="h-full transition-all duration-500 bg-gradient-to-r from-emerald-500 to-amber-500"
                style={{ width: `${(1 - data.ikrBlock) * 100}%` }} />
            </div>
          </div>

          {/* Torsades ECG strip */}
          {data.torsades && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3 animate-fade-in">
              <p className="text-[10px] uppercase tracking-wide text-red-500 font-bold mb-1">⚡ Torsades de pointes</p>
              <svg viewBox={`0 0 ${torsades.w} ${torsades.h}`} className="w-full">
                <path d={torsades.path} fill="none" stroke="hsl(0 70% 55%)" strokeWidth="1.5" />
              </svg>
              <p className="text-[10px] text-muted-foreground mt-1">Polymorphic VT with continuously rotating QRS axis ("twisting of points") — usually pause-dependent, may degenerate to VF.</p>
            </div>
          )}
        </div>

        {/* Mechanism + management */}
        <div className="lg:col-span-2 space-y-3">
          <div className="rounded-lg border border-border bg-card p-3">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-1">{data.label}</p>
            <p className="text-xs text-foreground/90 leading-relaxed">{data.description}</p>
          </div>

          <div className="rounded-lg border border-border bg-card p-3">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-1">Mechanism</p>
            <p className="text-xs text-foreground/90 leading-relaxed">{data.mechanism}</p>
          </div>

          {/* Risk indicators */}
          <div className="grid grid-cols-3 gap-2">
            <div className={`rounded-lg border p-2 text-center ${data.qtMs > 500 ? "border-red-500/40 bg-red-500/10" : data.qtMs > 460 ? "border-amber-500/40 bg-amber-500/10" : "border-emerald-500/30 bg-emerald-500/10"}`}>
              <p className="text-[9px] uppercase text-muted-foreground">QTc</p>
              <p className="text-sm font-bold text-foreground">{data.qtMs}</p>
            </div>
            <div className={`rounded-lg border p-2 text-center ${data.ead ? "border-amber-500/40 bg-amber-500/10" : "border-emerald-500/30 bg-emerald-500/10"}`}>
              <p className="text-[9px] uppercase text-muted-foreground">EAD</p>
              <p className="text-sm font-bold text-foreground">{data.ead ? "Yes" : "No"}</p>
            </div>
            <div className={`rounded-lg border p-2 text-center ${data.torsades ? "border-red-500/40 bg-red-500/10" : "border-emerald-500/30 bg-emerald-500/10"}`}>
              <p className="text-[9px] uppercase text-muted-foreground">TdP</p>
              <p className="text-sm font-bold text-foreground">{data.torsades ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cascade explanation */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {[
          { step: "1", title: "Trigger", body: "Class III drug, hypoK/hypoMg, congenital channelopathy, or bradycardia/pause." },
          { step: "2", title: "Phase 3 prolongation", body: "↓ IKr (± IKs) → repolarisation slows → APD ↑ → QT interval prolongs (>500 ms = high risk)." },
          { step: "3", title: "EAD generation", body: "L-type Ca²⁺ channels recover from inactivation during the prolonged plateau → secondary depolarisation = early afterdepolarisation." },
          { step: "4", title: "Torsades de pointes", body: "EAD reaches threshold → triggered activity → polymorphic VT with rotating axis. Treat with IV Mg²⁺, ↑ HR (pacing/isoprenaline), correct K⁺, stop offending drug." },
        ].map((c) => (
          <div key={c.step} className="rounded-lg border border-border bg-secondary/20 p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center">{c.step}</span>
              <p className="text-xs font-semibold text-foreground">{c.title}</p>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LongQTTorsadesDiagram;
