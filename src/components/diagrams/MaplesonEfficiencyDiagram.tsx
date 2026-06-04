import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";

/**
 * Interactive Mapleson efficiency simulator for the Breathing Circuits
 * topic page. The learner picks a circuit (A / D / E / F) and a mode
 * (spontaneous vs IPPV), and sets the fresh gas flow as a multiple of
 * minute ventilation. The simulator returns the predicted rebreathing
 * fraction using the canonical clinical thresholds quoted in Mapleson's
 * own series and reproduced in Al-Shaikh & Stacey and BJA Education
 * 2005.
 *
 * Thresholds (FGF in mL/kg/min unless stated; rebreathing assumed
 * absent above the threshold):
 *
 *                 Spontaneous       IPPV
 *   Mapleson A    ≈ MV  (70)        ≈ 3 × MV  (huge)
 *   Mapleson D    ≈ 2-3 × MV        ≈ MV  (70)
 *   Mapleson E    ≈ 2-3 × MV        ≈ MV  (T-piece IPPV uncommon)
 *   Mapleson F    ≈ 2-3 × MV        ≈ 1000 mL + 100 × kg (paediatric)
 *
 * These are simplifications — the real curves are non-linear — but they
 * are accurate enough to teach the exam-relevant ordering and the
 * counter-intuitive A-vs-D reversal between spontaneous and IPPV.
 */

type Circuit = "A" | "D" | "E" | "F";
type Mode = "spont" | "ippv";

interface CircuitSpec {
  label: string;
  description: string;
  thresholds: Record<Mode, number>; // FGF / MV ratio at which rebreathing falls to ~0
}

const CIRCUITS: Record<Circuit, CircuitSpec> = {
  A: {
    label: "Mapleson A (Magill / Lack)",
    description: "Reservoir bag at machine end, APL near patient.",
    thresholds: { spont: 1.0, ippv: 3.0 },
  },
  D: {
    label: "Mapleson D (Bain coaxial)",
    description: "Fresh gas at patient end, APL at machine end.",
    thresholds: { spont: 2.5, ippv: 1.0 },
  },
  E: {
    label: "Mapleson E (Ayre's T-piece)",
    description: "Valveless, low resistance — paediatric workhorse.",
    thresholds: { spont: 2.5, ippv: 1.5 },
  },
  F: {
    label: "Mapleson F (Jackson-Rees)",
    description: "T-piece + open-ended bag — visual ventilation cue.",
    thresholds: { spont: 2.5, ippv: 1.5 },
  },
};

export const MaplesonEfficiencyDiagram = () => {
  const [circuit, setCircuit] = useState<Circuit>("A");
  const [mode, setMode] = useState<Mode>("spont");
  const [ratio, setRatio] = useState(1);

  const spec = CIRCUITS[circuit];

  const { rebreathing, verdict, verdictTone } = useMemo(() => {
    const threshold = spec.thresholds[mode];
    // Linear ramp: 100 % rebreathing at FGF = 0, 0 % at FGF >= threshold.
    const r = Math.max(0, Math.min(100, (1 - ratio / threshold) * 100));
    let verdict: string;
    let verdictTone: "safe" | "warn" | "danger";
    if (r === 0) {
      verdict = "No clinically significant rebreathing.";
      verdictTone = "safe";
    } else if (r < 20) {
      verdict = "Borderline — acceptable but watch EtCO₂.";
      verdictTone = "warn";
    } else {
      verdict = "Significant rebreathing — increase FGF or change circuit.";
      verdictTone = "danger";
    }
    return { rebreathing: r, verdict, verdictTone };
  }, [spec, mode, ratio]);

  const fgfMlPerKgMin = Math.round(ratio * 70); // assuming MV ≈ 70 mL/kg/min

  return (
    <section
      aria-label="Interactive Mapleson efficiency simulator"
      className="rounded-xl border border-border bg-card p-4 sm:p-6"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
        <h3 className="text-lg font-serif font-bold text-foreground">
          Mapleson efficiency simulator
        </h3>
        <p className="text-xs text-muted-foreground">Rebreathing vs FGF — interactive</p>
      </div>

      {/* Circuit selector */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-foreground mb-1">Circuit</label>
        <div className="flex flex-wrap gap-1">
          {(Object.keys(CIRCUITS) as Circuit[]).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCircuit(c)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                circuit === c
                  ? "bg-physics text-white border-physics"
                  : "bg-background text-muted-foreground border-border hover:border-physics"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground mt-1">
          <strong>{spec.label}</strong> — {spec.description}
        </p>
      </div>

      {/* Mode selector */}
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">Ventilation mode</label>
          <div className="flex gap-1">
            {([
              { id: "spont" as Mode, label: "Spontaneous" },
              { id: "ippv" as Mode, label: "Controlled (IPPV)" },
            ]).map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors border ${
                  mode === m.id
                    ? "bg-icu text-white border-icu"
                    : "bg-background text-muted-foreground border-border hover:border-icu"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-foreground mb-1">
            FGF / MV ratio — {ratio.toFixed(1)}× ({fgfMlPerKgMin} mL/kg/min)
          </label>
          <Slider
            value={[ratio]}
            min={0.2}
            max={4}
            step={0.1}
            onValueChange={(v) => setRatio(v[0])}
            aria-label="Fresh gas flow as multiple of minute ventilation"
          />
        </div>
      </div>

      {/* Rebreathing bar */}
      <div className="rounded-lg border border-border bg-background p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-foreground">Predicted rebreathing</span>
          <span className="text-sm font-mono text-foreground">{rebreathing.toFixed(0)} %</span>
        </div>
        <div className="h-3 rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              verdictTone === "safe"
                ? "bg-emerald-500"
                : verdictTone === "warn"
                ? "bg-amber-500"
                : "bg-rose-500"
            }`}
            style={{ width: `${rebreathing}%` }}
          />
        </div>
        <p
          className={`text-xs mt-2 ${
            verdictTone === "safe"
              ? "text-emerald-700 dark:text-emerald-400"
              : verdictTone === "warn"
              ? "text-amber-700 dark:text-amber-400"
              : "text-rose-700 dark:text-rose-400"
          }`}
        >
          {verdict}
        </p>
        <p className="text-[11px] text-muted-foreground mt-2">
          Threshold for zero rebreathing on this circuit in this mode:{" "}
          <strong>FGF ≈ {spec.thresholds[mode].toFixed(1)} × MV</strong>{" "}
          ({Math.round(spec.thresholds[mode] * 70)} mL/kg/min).
        </p>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        The exam-defining counter-intuition: <strong>A</strong> is best for
        spontaneous ventilation, but useless for IPPV; <strong>D</strong> (and
        the Bain) is best for IPPV, but inefficient when the patient is
        breathing for themselves. Toggle the mode to watch the rebreathing bar
        invert.
      </p>
    </section>
  );
};

export default MaplesonEfficiencyDiagram;
