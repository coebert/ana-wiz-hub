import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

interface Threshold {
  at: number; // seconds
  label: string;
  title: string;
  action: string;
  color: string; // hsl
  tone: "info" | "warn" | "critical";
}

const THRESHOLDS: Threshold[] = [
  {
    at: 0,
    label: "0:00",
    title: "Arrest recognised",
    action: "Confirm on monitor + arterial trace. Call cardiac arrest team AND on-call cardiac surgeon. Note time. Pre-applied defib pads in use.",
    color: "hsl(45, 90%, 50%)",
    tone: "info",
  },
  {
    at: 60,
    label: "1:00",
    title: "Stacked shocks / pacing window",
    action: "VF/VT: deliver up to 3 sequential biphasic shocks (150–200 J) BEFORE compressions. Asystole/PEA: switch epicardial wires to DDD/VVI 80–100 bpm at max output before compressions.",
    color: "hsl(0, 75%, 50%)",
    tone: "warn",
  },
  {
    at: 120,
    label: "2:00",
    title: "Compressions if rhythm persists",
    action: "If still arrested after 3 shocks (or no pacing capture): start external compressions 100–120/min, depth 5–6 cm. Amiodarone 300 mg IV for refractory VF/VT. Withhold bolus adrenaline.",
    color: "hsl(210, 65%, 50%)",
    tone: "warn",
  },
  {
    at: 180,
    label: "3:00",
    title: "Asystole/PEA → prepare resternotomy",
    action: "If still in asystole/PEA at 3 min, the resternotomy clock has expired. Open the resternotomy set. Address surgery-specific reversible causes (tamponade, bleeding, graft occlusion, hyperK⁺/acidosis).",
    color: "hsl(25, 80%, 50%)",
    tone: "critical",
  },
  {
    at: 300,
    label: "5:00",
    title: "Emergency resternotomy",
    action: "Refractory VF/VT or any persisting arrest at 5 min: perform bedside resternotomy by trained surgeon. Internal cardiac massage 100/min, internal defibrillation 20 J. Control bleeding, relieve tamponade.",
    color: "hsl(0, 75%, 40%)",
    tone: "critical",
  },
  {
    at: 600,
    label: "10:00",
    title: "Escalate to mechanical support",
    action: "No ROSC after resternotomy and reversible cause correction: escalate to VA-ECMO, IABP, or temporary VAD. Senior cardiac surgeon + intensivist decision. Continue internal massage until on support.",
    color: "hsl(280, 55%, 50%)",
    tone: "critical",
  },
];

const MAX_SECONDS = 720; // 12 min display window

function fmt(t: number) {
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function ArrestTimeWindowWidget() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        setSeconds((s) => (s >= MAX_SECONDS ? s : s + 1));
      }, 1000);
    }
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [running]);

  const currentIdx = THRESHOLDS.reduce(
    (acc, t, i) => (seconds >= t.at ? i : acc),
    0,
  );
  const current = THRESHOLDS[currentIdx];
  const next = THRESHOLDS[currentIdx + 1];
  const secondsToNext = next ? Math.max(0, next.at - seconds) : null;
  const progressPct = Math.min(100, (seconds / MAX_SECONDS) * 100);

  const toneClasses = {
    info: "border-amber-500/30 bg-amber-500/5",
    warn: "border-orange-500/40 bg-orange-500/10",
    critical: "border-red-500/50 bg-red-500/10",
  } as const;

  const toneText = {
    info: "text-amber-500",
    warn: "text-orange-500",
    critical: "text-red-500",
  } as const;

  return (
        <div className="rounded-xl border border-border bg-card p-4 my-6">
      <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
        <div>
          <h3 className="text-base font-serif font-bold text-foreground">
            Arrest Time-Window Widget
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Simulate elapsed arrest time. The widget highlights the action
            required as you approach each EACTS/EACTA threshold.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setRunning((r) => !r)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-primary bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {running ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {running ? "Pause" : seconds === 0 ? "Start" : "Resume"}
          </button>
          <button
            type="button"
            onClick={() => {
              setRunning(false);
              setSeconds(0);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border bg-background text-muted-foreground hover:bg-accent/40"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Quick-jump chips */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {THRESHOLDS.map((t) => (
          <button
            key={t.at}
            type="button"
            onClick={() => setSeconds(t.at)}
            className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors ${
              seconds >= t.at
                ? "border-transparent text-white"
                : "border-border bg-background text-muted-foreground hover:bg-accent/40"
            }`}
            style={seconds >= t.at ? { background: t.color } : undefined}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative mb-6">
        <div className="h-2 rounded-full bg-secondary/60 overflow-hidden">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${progressPct}%`,
              background: `linear-gradient(90deg, ${THRESHOLDS[0].color}, ${current.color})`,
            }}
          />
        </div>
        <div className="relative h-6 mt-1">
          {THRESHOLDS.map((t) => {
            const left = (t.at / MAX_SECONDS) * 100;
            const reached = seconds >= t.at;
            return (
                  <div
                key={t.at}
                className="absolute -translate-x-1/2 flex flex-col items-center"
                style={{ left: `${left}%` }}
              >
                <div
                  className={`w-2 h-2 rounded-full -mt-3 ring-2 ring-background transition-all ${
                    reached ? "scale-125" : ""
                  }`}
                  style={{ background: reached ? t.color : "hsl(var(--muted-foreground) / 0.4)" }}
                />
                <span
                  className={`text-[10px] mt-1 font-medium ${
                    reached ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {t.label}
                </span>
              </div>
  );
          })}
        </div>
      </div>

      {/* Current state */}
      <div className="grid sm:grid-cols-[140px_1fr] gap-3 items-stretch">
        <div className="rounded-lg border border-border bg-secondary/30 p-3 flex flex-col items-center justify-center">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Elapsed
          </span>
          <span className="text-3xl font-mono font-bold text-foreground tabular-nums">
            {fmt(seconds)}
          </span>
          {secondsToNext !== null && next && (
            <span className="text-[10px] text-muted-foreground mt-1 text-center">
              Next threshold {next.label}
              <br />
              in {fmt(secondsToNext)}
            </span>
          )}
        </div>

        <div className={`rounded-lg border p-3 min-h-[180px] sm:min-h-[150px] ${toneClasses[current.tone]}`}>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: current.color }}
              aria-hidden
            />
            <span className={`text-[10px] font-semibold uppercase tracking-wider ${toneText[current.tone]}`}>
              {current.label} · {current.tone === "critical" ? "Critical" : current.tone === "warn" ? "Action now" : "Initial"}
            </span>
          </div>
          <p className="text-sm font-semibold text-foreground mb-1">
            {current.title}
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {current.action}
          </p>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground italic mt-4">
        Educational tool only — not for live clinical use. Thresholds adapted
        from Dunning et al., EACTS/EACTA Guideline for resuscitation after
        cardiac surgery.
      </p>
    </div>
  );
}
