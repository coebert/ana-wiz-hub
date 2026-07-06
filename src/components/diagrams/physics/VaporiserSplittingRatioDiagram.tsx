import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";

/**
 * Interactive splitting-ratio animator for the Vaporisers topic page.
 * Lets the learner change agent (sevoflurane / isoflurane / halothane),
 * dial setting, atmospheric pressure, and temperature, and watch the
 * splitting ratio + bypass / chamber gas flow update in real time.
 *
 * All maths use the standard plenum-vaporiser saturated-vapour-pressure
 * relationship:
 *
 *   chamber concentration (%) = SVP(T) / Patm × 100
 *   splitting ratio  = (chamber% − dial%) : dial%
 *
 * SVP(T) follows the Antoine-style approximation appropriate for the
 * clinical temperature window 15–25 °C, calibrated to the textbook
 * 20 °C values quoted in Al-Shaikh & Stacey and Davey & Diba.
 */

type Agent = "sevoflurane" | "isoflurane" | "halothane";

interface AgentSpec {
  label: string;
  /** SVP at 20 °C, kPa */
  svp20: number;
  /** dSVP/dT slope, kPa per °C, mid-range */
  slope: number;
  /** Maximum clinically realistic dial setting (% v/v) */
  maxDial: number;
}

const AGENTS: Record<Agent, AgentSpec> = {
  sevoflurane: { label: "Sevoflurane", svp20: 21.3, slope: 1.1, maxDial: 8 },
  isoflurane: { label: "Isoflurane", svp20: 33.2, slope: 1.6, maxDial: 5 },
  halothane: { label: "Halothane", svp20: 32.0, slope: 1.5, maxDial: 5 },
};

const svpAt = (agent: AgentSpec, tempC: number) =>
  Math.max(0.1, agent.svp20 + agent.slope * (tempC - 20));

export const VaporiserSplittingRatioDiagram = () => {
  const [agent, setAgent] = useState<Agent>("sevoflurane");
  const [dial, setDial] = useState(2);
  const [patm, setPatm] = useState(101.3);
  const [temp, setTemp] = useState(20);

  const spec = AGENTS[agent];

  const { chamberPct, ratioBypass, bypassPct, chamberFlowPct } = useMemo(() => {
    const svp = svpAt(spec, temp);
    const chamberConc = (svp / patm) * 100;
    if (dial >= chamberConc) {
      // Dial unattainable — clamp to a meaningful display state.
      return {
        chamberPct: chamberConc,
        ratioBypass: 0,
        bypassPct: 0,
        chamberFlowPct: 100,
      };
    }
    const r = (chamberConc - dial) / dial; // bypass : chamber
    const bypassFraction = r / (r + 1);
    return {
      chamberPct: chamberConc,
      ratioBypass: r,
      bypassPct: bypassFraction * 100,
      chamberFlowPct: (1 - bypassFraction) * 100,
    };
  }, [spec, dial, patm, temp]);

  const dialFeasible = dial < chamberPct;

  return (
    <section
      aria-label="Interactive vaporiser splitting-ratio simulator"
      className="rounded-xl border border-border bg-card p-4 sm:p-6"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <h3 className="text-lg font-serif font-bold text-foreground">
          Splitting-ratio simulator
        </h3>
        <p className="text-xs text-muted-foreground">
          Plenum vaporiser — interactive
        </p>
      </div>

      {/* Controls */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">
            Agent
          </label>
          <div className="flex flex-wrap gap-1">
            {(Object.keys(AGENTS) as Agent[]).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => {
                  setAgent(a);
                  setDial(Math.min(dial, AGENTS[a].maxDial));
                }}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                  agent === a
                    ? "bg-physics text-white border-physics"
                    : "bg-background text-muted-foreground border-border hover:border-physics"
                }`}
              >
                {AGENTS[a].label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">
            Dial setting — {dial.toFixed(1)} %
          </label>
          <Slider
            value={[dial]}
            min={0.2}
            max={spec.maxDial}
            step={0.1}
            onValueChange={(v) => setDial(v[0])}
            aria-label="Dial setting in percent"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">
            Atmospheric pressure — {patm.toFixed(1)} kPa
          </label>
          <Slider
            value={[patm]}
            min={60}
            max={110}
            step={0.5}
            onValueChange={(v) => setPatm(v[0])}
            aria-label="Atmospheric pressure in kPa"
          />
          <p className="text-[10px] text-muted-foreground mt-1">
            Sea level ≈ 101 kPa · Denver ≈ 84 kPa · Everest base camp ≈ 53 kPa
          </p>
        </div>
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">
            Chamber temperature — {temp.toFixed(0)} °C
          </label>
          <Slider
            value={[temp]}
            min={15}
            max={25}
            step={1}
            onValueChange={(v) => setTemp(v[0])}
            aria-label="Chamber temperature in degrees celsius"
          />
        </div>
      </div>

      {/* Animated flow diagram */}
      <div className="relative h-56 rounded-lg border border-border bg-background overflow-hidden">
        <svg viewBox="0 0 400 200" className="w-full h-full">
          {/* Inflow */}
          <line x1="10" y1="100" x2="100" y2="100" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
          <text x="14" y="92" fontSize="10" fill="hsl(var(--muted-foreground))">FGF in</text>
          {/* Bypass channel (top) */}
          <path d="M100 100 L130 60 L290 60 L320 100" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
          <text x="180" y="50" fontSize="10" fill="hsl(var(--muted-foreground))">Bypass</text>
          {/* Chamber channel (bottom) */}
          <path d="M100 100 L130 150 L290 150 L320 100" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
          {/* Chamber body */}
          <rect x="170" y="135" width="80" height="40" rx="4" fill="hsl(var(--physics) / 0.15)" stroke="hsl(var(--physics))" strokeWidth="1.5" />
          <text x="210" y="160" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))">
            Vaporising
          </text>
          <text x="210" y="171" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))">
            chamber
          </text>
          {/* Outflow */}
          <line x1="320" y1="100" x2="390" y2="100" stroke="hsl(var(--foreground))" strokeWidth="2" />
          <text x="345" y="92" fontSize="10" fill="hsl(var(--foreground))">to patient</text>

          {/* Animated dots — bypass */}
          {Array.from({ length: 6 }).map((_, i) => (
            <circle
              key={`b-${i}`}
              r={Math.max(1.5, (bypassPct / 100) * 4 + 1)}
              fill="hsl(var(--physics))"
              opacity={bypassPct / 100}
            >
              <animateMotion
                dur={`${Math.max(0.8, 6 - bypassPct / 20)}s`}
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
                path="M100 100 L130 60 L290 60 L320 100"
              />
            </circle>
          ))}
          {/* Animated dots — chamber */}
          {Array.from({ length: 6 }).map((_, i) => (
            <circle
              key={`c-${i}`}
              r={Math.max(1.5, (chamberFlowPct / 100) * 4 + 1)}
              fill="hsl(var(--icu))"
              opacity={chamberFlowPct / 100}
            >
              <animateMotion
                dur={`${Math.max(0.8, 6 - chamberFlowPct / 20)}s`}
                begin={`${i * 0.4}s`}
                repeatCount="indefinite"
                path="M100 100 L130 150 L290 150 L320 100"
              />
            </circle>
          ))}
        </svg>
      </div>

      {/* Read-out */}
      <div className="grid sm:grid-cols-4 gap-3 mt-4">
        <Stat label="Chamber SVP" value={`${svpAt(spec, temp).toFixed(1)} kPa`} />
        <Stat label="Chamber [agent]" value={`${chamberPct.toFixed(1)} %`} />
        <Stat
          label="Splitting ratio"
          value={dialFeasible ? `${ratioBypass.toFixed(1)} : 1` : "—"}
          hint="bypass : chamber"
        />
        <Stat
          label="Partial pressure out"
          value={`${((dial / 100) * patm).toFixed(2)} kPa`}
        />
      </div>

      {!dialFeasible && (
        <p className="mt-3 text-xs text-amber-700 dark:text-amber-400">
          Dial setting ({dial.toFixed(1)} %) exceeds the maximum chamber
          concentration at this temperature and pressure ({chamberPct.toFixed(1)} %).
          A conventional plenum vaporiser cannot deliver this concentration
          — this is exactly why desflurane (SVP 88.5 kPa at 20 °C) requires
          the heated, pressurised Tec 6 design.
        </p>
      )}

      <p className="mt-3 text-xs text-muted-foreground">
        Notice that the <em>percentage</em> output is read off the dial, but
        the <em>partial pressure</em> (which drives MAC) depends on
        atmospheric pressure. Drop Patm to 53 kPa (Everest) and the dial-set
        2 % sevoflurane delivers only ~1 kPa — but SVP and chamber
        concentration both change in step, so the vaporiser still delivers
        the same partial pressure for any given dial setting at altitude.
      </p>
    </section>
  );
};

const Stat = ({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) => (
  <div className="rounded-lg border border-border bg-background p-3">
    <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
      {label}
    </p>
    <p className="text-base font-semibold text-foreground mt-0.5">{value}</p>
    {hint && <p className="text-[10px] text-muted-foreground">{hint}</p>}
  </div>
);

export default VaporiserSplittingRatioDiagram;
