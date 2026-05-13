import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "charging" | "charged" | "discharging" | "discharged";

export const DefibrillatorCapacitorDiagram = () => {
  const [phase, setPhase] = useState<Phase>("idle");
  const [charge, setCharge] = useState<number>(0); // 0–100
  const [auto, setAuto] = useState<boolean>(false);
  const rafRef = useRef<number | null>(null);
  const lastT = useRef<number>(0);

  // Animation loop
  useEffect(() => {
    const tick = (t: number) => {
      const dt = lastT.current ? (t - lastT.current) / 1000 : 0;
      lastT.current = t;
      setCharge((c) => {
        if (phase === "charging") {
          const next = Math.min(100, c + dt * 35); // ~3 s to full
          if (next >= 100) setPhase("charged");
          return next;
        }
        if (phase === "discharging") {
          const next = Math.max(0, c - dt * 400); // very fast (~250 ms)
          if (next <= 0) setPhase("discharged");
          return next;
        }
        return c;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastT.current = 0;
    };
  }, [phase]);

  // Auto-cycle
  useEffect(() => {
    if (!auto) return;
    if (phase === "idle" || phase === "discharged") {
      const t = setTimeout(() => {
        setCharge(0);
        setPhase("charging");
      }, 800);
      return () => clearTimeout(t);
    }
    if (phase === "charged") {
      const t = setTimeout(() => setPhase("discharging"), 1200);
      return () => clearTimeout(t);
    }
  }, [phase, auto]);

  const startCharging = () => {
    setCharge(0);
    setPhase("charging");
  };
  const discharge = () => {
    if (charge > 5) setPhase("discharging");
  };
  const reset = () => {
    setAuto(false);
    setCharge(0);
    setPhase("idle");
  };

  // Derived values
  const energy = Math.round((charge / 100) * 200); // J at full = 200
  const voltage = Math.round((charge / 100) * 2000); // peak ~2 kV
  const isCharging = phase === "charging";
  const isDischarging = phase === "discharging";

  // Electron generation — moving dots
  // For charging: electrons flow from top plate → through external circuit (battery) → to bottom plate
  // For discharging: electrons flow from bottom plate → through patient (load) → to top plate

  const N = 14;
  const electrons = Array.from({ length: N }, (_, i) => i / N);

  return (
    <div className="w-full bg-card border border-border rounded-lg p-4 sm:p-6 my-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Defibrillator Capacitor — Charge & Discharge</h3>
      <p className="text-sm text-muted-foreground mb-4">
        A defibrillator stores energy in a capacitor, then releases it rapidly through the patient. Watch the electrons (●⁻) move during each phase.
      </p>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={startCharging}
          disabled={isCharging || isDischarging}
          className="px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-background text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ⚡ Charge
        </button>
        <button
          onClick={discharge}
          disabled={charge < 90 || isDischarging}
          className="px-3 py-1.5 rounded-full text-xs font-medium border-2 text-background disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            backgroundColor: charge >= 90 && !isDischarging ? "hsl(0 70% 55%)" : "hsl(var(--muted))",
            borderColor: charge >= 90 && !isDischarging ? "hsl(0 70% 55%)" : "hsl(var(--border))",
            color: charge >= 90 && !isDischarging ? "white" : "hsl(var(--muted-foreground))",
          }}
        >
          ⚡⚡ Shock
        </button>
        <button
          onClick={() => setAuto((a) => !a)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
            auto ? "border-foreground text-background bg-foreground" : "border-border bg-background text-foreground hover:bg-muted"
          }`}
        >
          {auto ? "■ Stop auto-cycle" : "▶ Auto-cycle"}
        </button>
        <button
          onClick={reset}
          className="px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-background text-foreground hover:bg-muted"
        >
          ↺ Reset
        </button>
      </div>

      {/* SVG circuit */}
      <div className="w-full overflow-x-auto">
        <svg viewBox="0 0 800 400" className="w-full h-auto" style={{ minWidth: 600 }}>
          <defs>
            <marker id="arrowDef" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(45 85% 50%)" />
            </marker>
            <marker id="arrowDefRed" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(0 70% 55%)" />
            </marker>
          </defs>

          {/* Battery / DC source (left) */}
          <rect x="60" y="160" width="80" height="80" rx="6" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="2" />
          <text x="100" y="185" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="700">DC source</text>
          <text x="100" y="200" textAnchor="middle" className="fill-muted-foreground" fontSize="9">step-up</text>
          <text x="100" y="212" textAnchor="middle" className="fill-muted-foreground" fontSize="9">transformer</text>
          <line x1="80" y1="225" x2="120" y2="225" stroke="hsl(var(--foreground))" strokeWidth="2" />
          <text x="78" y="222" textAnchor="end" className="fill-foreground" fontSize="11" fontWeight="700">+</text>
          <text x="78" y="235" textAnchor="end" className="fill-foreground" fontSize="11" fontWeight="700">−</text>

          {/* Capacitor (centre) */}
          <line x1="380" y1="120" x2="380" y2="200" stroke="hsl(var(--foreground))" strokeWidth="3" />
          <line x1="420" y1="120" x2="420" y2="200" stroke="hsl(var(--foreground))" strokeWidth="3" />
          <text x="400" y="100" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="700">Capacitor</text>
          <text x="400" y="115" textAnchor="middle" className="fill-muted-foreground" fontSize="9">~32 µF</text>

          {/* Charge indicators on plates */}
          {/* Top plate (positive when charged) */}
          <text x="370" y="155" textAnchor="end" className="fill-foreground" fontSize="11" fontWeight="700" opacity={charge / 100}>
            {"+ + + + +".slice(0, Math.max(1, Math.round((charge / 100) * 9)))}
          </text>
          {/* Bottom plate (negative) */}
          <text x="430" y="155" className="fill-foreground" fontSize="11" fontWeight="700" opacity={charge / 100}>
            {"− − − − −".slice(0, Math.max(1, Math.round((charge / 100) * 9)))}
          </text>

          {/* Charge level bar (visual fill between plates) */}
          <rect x="383" y={200 - (charge / 100) * 75} width="34" height={(charge / 100) * 75} fill={isDischarging ? "hsl(0 70% 55%)" : "hsl(45 85% 50%)"} opacity="0.25" />

          {/* Switch (charge path) — closed when charging */}
          <circle cx="200" cy="100" r="4" fill="hsl(var(--foreground))" />
          <circle cx="260" cy="100" r="4" fill="hsl(var(--foreground))" />
          {isCharging || (phase === "charged" && charge > 0 && charge < 100 ? false : false) ? (
            <line x1="200" y1="100" x2="260" y2="100" stroke="hsl(var(--foreground))" strokeWidth="2" />
          ) : (
            <line x1="200" y1="100" x2="255" y2="80" stroke="hsl(var(--foreground))" strokeWidth="2" />
          )}
          <text x="230" y="75" textAnchor="middle" className="fill-muted-foreground" fontSize="9">charge sw</text>

          {/* Switch (discharge path to patient) */}
          <circle cx="540" cy="100" r="4" fill="hsl(var(--foreground))" />
          <circle cx="600" cy="100" r="4" fill="hsl(var(--foreground))" />
          {isDischarging ? (
            <line x1="540" y1="100" x2="600" y2="100" stroke="hsl(0 70% 55%)" strokeWidth="2" />
          ) : (
            <line x1="540" y1="100" x2="595" y2="80" stroke="hsl(var(--foreground))" strokeWidth="2" />
          )}
          <text x="570" y="75" textAnchor="middle" className="fill-muted-foreground" fontSize="9">shock sw</text>

          {/* Wires — charging loop */}
          {/* From battery + (top) up and across to top plate via charge switch */}
          <polyline
            points="100,160 100,100 200,100 260,100 380,100 380,120"
            fill="none"
            stroke={isCharging ? "hsl(45 85% 50%)" : "hsl(var(--foreground))"}
            strokeWidth={isCharging ? 3 : 2}
            opacity={isCharging ? 1 : 0.6}
          />
          {/* From bottom plate down and across back to battery − */}
          <polyline
            points="420,200 420,300 100,300 100,240"
            fill="none"
            stroke={isCharging ? "hsl(45 85% 50%)" : "hsl(var(--foreground))"}
            strokeWidth={isCharging ? 3 : 2}
            opacity={isCharging ? 1 : 0.6}
          />

          {/* Wires — discharge loop (capacitor → paddles → patient) */}
          <polyline
            points="380,200 380,330 600,330 600,100 540,100 420,100 420,120"
            fill="none"
            stroke={isDischarging ? "hsl(0 70% 55%)" : "hsl(var(--foreground))"}
            strokeWidth={isDischarging ? 3.5 : 2}
            opacity={isDischarging ? 1 : 0.4}
            strokeDasharray={isDischarging ? "0" : "4 3"}
          />

          {/* Patient / paddles (right) */}
          <rect x="640" y="160" width="120" height="100" rx="10" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="2" />
          <text x="700" y="185" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="700">Patient</text>
          <text x="700" y="200" textAnchor="middle" className="fill-muted-foreground" fontSize="9">~70 Ω impedance</text>

          {/* Heart symbol */}
          <path
            d="M 700 215 c -8 -10 -22 -8 -22 4 c 0 14 22 28 22 28 c 0 0 22 -14 22 -28 c 0 -12 -14 -14 -22 -4 z"
            fill={isDischarging ? "hsl(0 70% 55%)" : "hsl(var(--muted-foreground))"}
            opacity={isDischarging ? 0.85 : 0.5}
          />

          {/* Electron animations */}
          {/* Charging path: electrons flow opposite to conventional current → from top plate through battery to bottom plate */}
          {isCharging &&
            electrons.map((offset, i) => {
              // Path: top plate (380,120) → up (380,100) → left (100,100) → down (100,160) → through battery → out at (100,240) → right (100,300) → up (420,300) → up to bottom plate (420,200)
              // Approximate as simple traversal animation
              return (
                    <g key={`charge-e-${i}`}>
                  <circle r="4" fill="hsl(45 85% 50%)" stroke="hsl(var(--foreground))" strokeWidth="0.5">
                    <animateMotion dur="2.4s" repeatCount="indefinite" begin={`-${offset * 2.4}s`}>
                      <mpath href="#chargePath" />
                    </animateMotion>
                  </circle>
                </g>
  );
            })}

          {/* Define electron path for charging (loop) */}
          <path
            id="chargePath"
            d="M 380 120 L 380 100 L 260 100 L 200 100 L 100 100 L 100 160 L 100 240 L 100 300 L 420 300 L 420 200 L 420 120"
            fill="none"
            stroke="none"
          />

          {/* Discharging path */}
          <path
            id="dischargePath"
            d="M 420 120 L 420 100 L 540 100 L 600 100 L 600 330 L 380 330 L 380 200"
            fill="none"
            stroke="none"
          />

          {isDischarging &&
            electrons.map((offset, i) => (
              <g key={`disch-e-${i}`}>
                <circle r="4.5" fill="hsl(0 70% 55%)" stroke="hsl(var(--foreground))" strokeWidth="0.5">
                  <animateMotion dur="0.45s" repeatCount="indefinite" begin={`-${offset * 0.45}s`}>
                    <mpath href="#dischargePath" />
                  </animateMotion>
                </circle>
              </g>
            ))}

          {/* Conventional current direction labels */}
          {isCharging && (
            <text x="200" y="92" className="fill-muted-foreground" fontSize="9" fontStyle="italic">
              electrons → ; conventional current ← (slow charge)
            </text>
          )}
          {isDischarging && (
            <text x="430" y="92" className="fill-foreground" fontSize="10" fontWeight="600" fontStyle="italic">
              electrons → through patient (large rapid current)
            </text>
          )}

          {/* Footer status */}
          <text x="400" y="385" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="700">
            {phase === "idle" && "Idle — press CHARGE to begin"}
            {phase === "charging" && `Charging capacitor… ${Math.round(charge)}%`}
            {phase === "charged" && "Capacitor fully charged — ready to SHOCK"}
            {phase === "discharging" && "DISCHARGING through patient — biphasic ~10 ms"}
            {phase === "discharged" && "Discharge complete"}
          </text>
        </svg>
      </div>

      {/* Live readouts */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="p-3 rounded-md border border-border bg-background">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Charge</p>
          <p className="text-lg font-bold text-foreground">{Math.round(charge)} %</p>
          <div className="w-full h-1.5 bg-muted rounded mt-1 overflow-hidden">
            <div className="h-full transition-all" style={{ width: `${charge}%`, backgroundColor: isDischarging ? "hsl(0 70% 55%)" : "hsl(45 85% 50%)" }} />
          </div>
        </div>
        <div className="p-3 rounded-md border border-border bg-background">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Voltage</p>
          <p className="text-lg font-bold text-foreground">{voltage} V</p>
          <p className="text-[10px] text-muted-foreground">peak ~2 kV at full charge</p>
        </div>
        <div className="p-3 rounded-md border border-border bg-background">
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Energy stored</p>
          <p className="text-lg font-bold text-foreground">{energy} J</p>
          <p className="text-[10px] text-muted-foreground">E = ½ CV² · biphasic max ~200 J</p>
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-4 p-4 rounded-lg border border-border bg-background">
        <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">How a defibrillator works</p>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li><strong className="text-foreground">Charge phase (slow, seconds):</strong> mains AC is rectified to DC and stepped up by a transformer. Electrons are pumped <em>onto</em> one plate of the capacitor and <em>off</em> the other. The conventional current direction is opposite — from + to − around the external circuit.</li>
          <li><strong className="text-foreground">Energy storage:</strong> Energy stored E = ½CV². A 32 µF capacitor charged to ~2000 V stores about 64 J — modern biphasic defibrillators deliver <strong className="text-foreground">120–200 J</strong> in this way.</li>
          <li><strong className="text-foreground">Discharge phase (fast, ~10 ms):</strong> the shock switch closes, and the capacitor releases its energy through the patient's chest. Peak current ~30–40 A flows through ~70 Ω transthoracic impedance — depolarising a critical mass of myocardium.</li>
          <li><strong className="text-foreground">Biphasic waveform:</strong> the current direction reverses partway through the discharge, lowering defibrillation threshold and reducing tissue damage.</li>
          <li><strong className="text-foreground">Inductor</strong> in series with the patient shapes the discharge waveform to a quasi-rectangular pulse of ~10 ms (Lown waveform / biphasic truncated exponential).</li>
        </ul>
      </div>
    </div>
  );
};
