import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Animated auscultatory (manual / Riva-Rocci) NIBP diagram.
 *
 * Shows:
 *  - Mercury sphygmomanometer column falling as cuff is deflated
 *  - A "stethoscope" indicator over the brachial artery
 *  - Korotkoff phase chips highlighting in real time
 *  - Pulsing "sound" dot when audible (phases I–IV), silent above SBP and below DBP
 */

const SBP = 120;
const DBP = 80;
const PEAK = 160;
const HR = 72; // bpm
const DURATION = 14000;

const PHASES = [
  { id: "I", name: "Phase I", range: [110, 120], desc: "First clear tapping sounds → SBP" },
  { id: "II", name: "Phase II", range: [100, 110], desc: "Softer, swishing 'murmur' quality" },
  { id: "III", name: "Phase III", range: [90, 100], desc: "Crisper, louder thumping returns" },
  { id: "IV", name: "Phase IV", range: [80, 90], desc: "Sudden muffling of sounds" },
  { id: "V", name: "Phase V", range: [40, 80], desc: "Sounds disappear → DBP" },
];

const cuffAt = (t: number) => {
  if (t < 1500) return (PEAK * t) / 1500;
  if (t < 2500) return PEAK;
  if (t < 12000) {
    const k = (t - 2500) / 9500;
    return PEAK - k * (PEAK - 40);
  }
  return 40;
};

const phaseFor = (cuff: number) => {
  if (cuff > SBP) return null; // silent — artery occluded
  if (cuff < DBP) return null; // silent — artery fully open
  return PHASES.find((p) => cuff >= p.range[0] && cuff < p.range[1]) ?? null;
};

const W = 720;
const H = 360;

const AuscultatoryNIBPDiagram = () => {
  const [running, setRunning] = useState(true);
  const [muted, setMuted] = useState(true);
  const [t, setT] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lastBeatRef = useRef<number>(-1);

  useEffect(() => {
    if (!running) {
      lastRef.current = null;
      return;
    }
    const tick = (ts: number) => {
      if (lastRef.current == null) lastRef.current = ts;
      const dt = ts - lastRef.current;
      lastRef.current = ts;
      setT((prev) => (prev + dt) % DURATION);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running]);

  // Optional click sound on each beat when audible
  useEffect(() => {
    if (muted) return;
    const cuff = cuffAt(t);
    const phase = phaseFor(cuff);
    if (!phase) return;
    const beatPeriod = 60000 / HR;
    const beatIdx = Math.floor(t / beatPeriod);
    if (beatIdx === lastBeatRef.current) return;
    lastBeatRef.current = beatIdx;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = phase.id === "II" ? 180 : phase.id === "IV" ? 120 : 240;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {
      /* ignore */
    }
  }, [t, muted]);

  const reset = () => {
    setT(0);
    lastRef.current = null;
  };

  const cuffNow = cuffAt(t);
  const currentPhase = phaseFor(cuffNow);

  // Beat pulse (0 → 1 each beat)
  const beatPeriod = 60000 / HR;
  const beatPhase = (t % beatPeriod) / beatPeriod;
  const beatPulse = Math.max(0, Math.sin(beatPhase * Math.PI)); // half-sine
  const audible = !!currentPhase;

  // Mercury column geometry
  const COL_X = 80;
  const COL_TOP_Y = 40;
  const COL_BOT_Y = 300;
  const COL_RANGE_TOP = 200; // mmHg at top
  const COL_RANGE_BOT = 0; // mmHg at bottom
  const yForP = (p: number) =>
    COL_TOP_Y + ((COL_RANGE_TOP - p) / (COL_RANGE_TOP - COL_RANGE_BOT)) * (COL_BOT_Y - COL_TOP_Y);

  // Cuff occlusion state
  const occluded = cuffNow > SBP;
  const partial = cuffNow > DBP && cuffNow <= SBP;

  const phase =
    t < 1500
      ? "Inflating"
      : t < 2500
        ? "Occluded — listen"
        : t < 12000
          ? "Slow deflation (~2–3 mmHg/s)"
          : "Result";

  return (
    <DiagramFigure
      id="auscultatory-nibp"
      title="Auscultatory (manual) NIBP measurement"
      description="Animated mercury sphygmomanometer with cuff deflation showing the five Korotkoff phases — first sound at systolic, disappearance at diastolic."
    >
      <div className="my-6">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h3 className="text-lg font-serif font-bold text-foreground">
            Auscultatory NIBP — Korotkoff sound phases
          </h3>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setMuted((m) => !m)}
              aria-label={muted ? "Unmute beats" : "Mute beats"}
              title={muted ? "Enable beat sounds" : "Mute beat sounds"}
            >
              {muted ? <VolumeX className="h-4 w-4"  aria-hidden="true" focusable={false}/> : <Volume2 className="h-4 w-4"  aria-hidden="true" focusable={false}/>}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setRunning((r) => !r)}
              aria-label={running ? "Pause" : "Play"}
            >
              {running ? <Pause className="h-4 w-4"  aria-hidden="true" focusable={false}/> : <Play className="h-4 w-4"  aria-hidden="true" focusable={false}/>}
            </Button>
            <Button size="sm" variant="outline" onClick={reset} aria-label="Reset">
              <RotateCcw className="h-4 w-4"  aria-hidden="true" focusable={false}/>
            </Button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-3 overflow-x-auto">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto min-w-[460px]"
            role="img"
            aria-label="Mercury sphygmomanometer column with arm, cuff, brachial artery and Korotkoff sound indicator"
          >
            {/* === Mercury sphygmomanometer === */}
            <text x={COL_X} y={28} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
              Sphygmomanometer
            </text>
            {/* Tube outer */}
            <rect
              x={COL_X - 14}
              y={COL_TOP_Y - 4}
              width={28}
              height={COL_BOT_Y - COL_TOP_Y + 8}
              rx={4}
              fill="hsl(var(--background))"
              stroke="hsl(var(--border))"
              strokeWidth={1.5}
            />
            {/* Mercury */}
            <rect
              x={COL_X - 10}
              y={yForP(cuffNow)}
              width={20}
              height={COL_BOT_Y - yForP(cuffNow)}
              fill="hsl(0 70% 45%)"
              style={{ transition: "y 100ms linear, height 100ms linear" }}
            />
            {/* Reservoir */}
            <ellipse cx={COL_X} cy={COL_BOT_Y + 14} rx={22} ry={10} fill="hsl(0 70% 35%)" stroke="hsl(var(--border))" />

            {/* Scale ticks every 20 mmHg */}
            {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200].map((p) => (
              <g key={p}>
                <line
                  x1={COL_X + 16}
                  x2={COL_X + 22}
                  y1={yForP(p)}
                  y2={yForP(p)}
                  stroke="hsl(var(--muted-foreground))"
                />
                <text
                  x={COL_X + 26}
                  y={yForP(p) + 3}
                  className="fill-muted-foreground text-[9px] tabular-nums"
                >
                  {p}
                </text>
              </g>
            ))}
            <text
              x={COL_X + 26}
              y={COL_BOT_Y + 36}
              className="fill-muted-foreground text-[9px] italic"
            >
              mmHg
            </text>

            {/* Pressure readout */}
            <rect
              x={COL_X - 36}
              y={COL_BOT_Y + 36}
              width={92}
              height={32}
              rx={4}
              fill="hsl(var(--muted)/0.4)"
              stroke="hsl(var(--border))"
            />
            <text
              x={COL_X + 10}
              y={COL_BOT_Y + 57}
              textAnchor="middle"
              className="fill-foreground text-[15px] font-bold tabular-nums"
            >
              {Math.round(cuffNow)} mmHg
            </text>

            {/* === Arm + cuff + stethoscope === */}
            <g transform="translate(220, 90)">
              <text x={170} y={-10} textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
                Brachial artery
              </text>

              {/* Arm */}
              <rect x={0} y={20} width={340} height={70} rx={12} fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />

              {/* Brachial artery (height varies with cuff state) */}
              <rect
                x={0}
                y={49}
                width={340}
                height={occluded ? 2 : partial ? 5 : 10}
                fill="hsl(0 70% 55%)"
                style={{ transition: "height 200ms ease" }}
              />

              {/* Cuff */}
              <rect
                x={70}
                y={10}
                width={120}
                height={90}
                rx={8}
                fill="hsl(var(--primary)/0.2)"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
              <text x={130} y={60} textAnchor="middle" className="fill-primary text-[12px] font-bold">
                CUFF
              </text>

              {/* Stethoscope chestpiece distal to cuff over artery */}
              <g transform="translate(240, 40)">
                <circle r={18} fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth={2} />
                <circle r={8} fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
                {/* Tubing */}
                <path d="M 0,-18 Q 30,-50 60,-60" fill="none" stroke="hsl(var(--foreground))" strokeWidth={2} />
                {/* Sound pulse */}
                {audible && (
                  <circle
                    r={20 + 18 * beatPulse}
                    fill="none"
                    stroke="hsl(var(--destructive))"
                    strokeWidth={2}
                    opacity={0.7 * (1 - beatPulse)}
                  />
                )}
                {audible && (
                  <circle r={6} cx={0} cy={0} fill="hsl(var(--destructive))" opacity={0.4 + 0.6 * beatPulse} />
                )}
              </g>
            </g>

            {/* Status + reported BP */}
            <g transform={`translate(${W - 180}, 200)`}>
              <rect width={170} height={50} rx={6} fill="hsl(var(--muted)/0.4)" stroke="hsl(var(--border))" />
              <text x={85} y={20} textAnchor="middle" className="fill-muted-foreground text-[10px] uppercase tracking-wide">
                {phase}
              </text>
              <text x={85} y={40} textAnchor="middle" className="fill-foreground text-[14px] font-semibold">
                {currentPhase ? `Korotkoff ${currentPhase.id}` : "Silent"}
              </text>

              {t > 11500 && (
                <g transform="translate(0, 60)">
                  <rect width={170} height={56} rx={6} fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary))" />
                  <text x={85} y={20} textAnchor="middle" className="fill-foreground text-[11px] font-semibold">
                    Reported BP
                  </text>
                  <text x={85} y={42} textAnchor="middle" className="fill-foreground text-[16px] font-bold tabular-nums">
                    {SBP}/{DBP} mmHg
                  </text>
                </g>
              )}
            </g>
          </svg>
        </div>

        {/* Phase legend */}
        <div className="mt-4 grid sm:grid-cols-5 gap-2 text-xs">
          {PHASES.map((p) => {
            const active = currentPhase?.id === p.id;
            return (
              <div
                key={p.id}
                className={`p-2 rounded-md border transition-colors ${
                  active
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card"
                }`}
              >
                <p className={`font-semibold ${active ? "text-primary" : "text-foreground"}`}>
                  {p.name}
                </p>
                <p className="text-[10px] text-muted-foreground tabular-nums mt-0.5">
                  {p.range[0]}–{p.range[1]} mmHg
                </p>
                <p className="text-[11px] text-muted-foreground leading-snug mt-1">{p.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-4 rounded-lg border border-border bg-muted/30 text-sm text-foreground/90 leading-relaxed">
          <p className="font-semibold mb-1">Auscultatory vs oscillometric — what's actually measured?</p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
            <li><strong>Auscultatory:</strong> directly senses <em>SBP</em> (first Korotkoff sound) and <em>DBP</em> (disappearance, phase V); MAP is calculated as DBP + ⅓ pulse pressure.</li>
            <li><strong>Oscillometric:</strong> directly senses <em>MAP</em> (peak oscillation amplitude); SBP and DBP are derived algorithmically from amplitude ratios.</li>
            <li>Auscultation is unreliable in arrhythmias, low cardiac output, shock and noisy environments — oscillometry tolerates these better but still struggles in atrial fibrillation and severe hypotension.</li>
          </ul>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default AuscultatoryNIBPDiagram;
