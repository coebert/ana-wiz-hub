import { useState, useCallback, useRef, useEffect, useMemo } from "react";

interface Event {
  id: string;
  label: string;
  shortLabel: string;
  color: string;
  bisEffect: number;   // target BIS shift (negative = deeper)
  duration: number;     // seconds the effect lasts
  rampUp: number;       // seconds to reach peak effect
  rampDown: number;     // seconds to wear off
}

const events: Event[] = [
  { id: "bolus", label: "Propofol bolus 2 mg/kg", shortLabel: "Propofol bolus", color: "hsl(200, 65%, 50%)", bisEffect: -50, duration: 120, rampUp: 30, rampDown: 90 },
  { id: "infusion-start", label: "Start propofol infusion", shortLabel: "Start infusion", color: "hsl(160, 55%, 45%)", bisEffect: -35, duration: 600, rampUp: 60, rampDown: 30 },
  { id: "infusion-stop", label: "Stop infusion (emergence)", shortLabel: "Stop infusion", color: "hsl(35, 65%, 50%)", bisEffect: 40, duration: 300, rampUp: 120, rampDown: 60 },
  { id: "stimulus", label: "Surgical stimulus", shortLabel: "Stimulus", color: "hsl(0, 55%, 50%)", bisEffect: 15, duration: 60, rampUp: 10, rampDown: 50 },
  { id: "remi-bolus", label: "Remifentanil bolus", shortLabel: "Remi bolus", color: "hsl(280, 50%, 55%)", bisEffect: -10, duration: 90, rampUp: 20, rampDown: 70 },
];

interface ActiveEvent {
  event: Event;
  startTime: number; // seconds into the simulation
}

const TOTAL_TIME = 600; // 10-minute window
const TICK_MS = 100;    // update every 100ms
const TIME_SCALE = 4;   // 4x speed

function computeBIS(baselineBIS: number, activeEvents: ActiveEvent[], currentTime: number): number {
  let bis = baselineBIS;

  for (const ae of activeEvents) {
    const elapsed = currentTime - ae.startTime;
    if (elapsed < 0) continue;

    const { bisEffect, rampUp, rampDown, duration } = ae.event;
    let effectMagnitude = 0;

    if (elapsed < rampUp) {
      // Ramping up
      effectMagnitude = (elapsed / rampUp) * bisEffect;
    } else if (elapsed < duration - rampDown) {
      // Plateau
      effectMagnitude = bisEffect;
    } else if (elapsed < duration) {
      // Ramping down
      const fadeProgress = (elapsed - (duration - rampDown)) / rampDown;
      effectMagnitude = bisEffect * (1 - fadeProgress);
    }
    // else: effect over

    bis += effectMagnitude;
  }

  // Add small noise
  const noise = (Math.sin(currentTime * 7.13) * 43758.5453 % 1) * 4 - 2;
  bis += noise;

  return Math.max(0, Math.min(100, bis));
}

function bisToColor(bis: number): string {
  if (bis >= 80) return "hsl(150, 50%, 45%)";
  if (bis >= 60) return "hsl(150, 45%, 40%)";
  if (bis >= 40) return "hsl(200, 55%, 50%)";
  if (bis >= 20) return "hsl(35, 65%, 50%)";
  return "hsl(0, 55%, 50%)";
}

function bisZoneLabel(bis: number): string {
  if (bis >= 80) return "Awake / Light sedation";
  if (bis >= 60) return "Light anaesthesia — risk of awareness";
  if (bis >= 40) return "General anaesthesia (target)";
  if (bis >= 20) return "Deep anaesthesia";
  return "Burst suppression / Isoelectric";
}

const BISTrendDiagram = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [simTime, setSimTime] = useState(0);
  const [bisHistory, setBisHistory] = useState<{ t: number; bis: number }[]>([]);
  const [activeEvents, setActiveEvents] = useState<ActiveEvent[]>([]);
  const [eventMarkers, setEventMarkers] = useState<{ t: number; event: Event }[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentBIS = bisHistory.length > 0 ? bisHistory[bisHistory.length - 1].bis : 95;

  const startSim = useCallback(() => {
    setIsRunning(true);
  }, []);

  const resetSim = useCallback(() => {
    setIsRunning(false);
    setSimTime(0);
    setBisHistory([]);
    setActiveEvents([]);
    setEventMarkers([]);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const fireEvent = useCallback((event: Event) => {
    setActiveEvents(prev => [...prev, { event, startTime: simTime }]);
    setEventMarkers(prev => [...prev, { t: simTime, event }]);
  }, [simTime]);

  // Simulation loop
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }

    intervalRef.current = setInterval(() => {
      setSimTime(prev => {
        const next = prev + (TICK_MS / 1000) * TIME_SCALE;
        if (next >= TOTAL_TIME) {
          setIsRunning(false);
          return TOTAL_TIME;
        }
        return next;
      });
    }, TICK_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  // Update BIS history
  useEffect(() => {
    const bis = computeBIS(95, activeEvents, simTime);
    setBisHistory(prev => {
      // Sample every ~0.5 simulated seconds
      if (prev.length > 0 && simTime - prev[prev.length - 1].t < 0.4) return prev;
      return [...prev, { t: simTime, bis }];
    });
  }, [simTime, activeEvents]);

  // SVG dimensions
  const svgW = 560;
  const svgH = 220;
  const plotX = 45;
  const plotY = 15;
  const plotW = 495;
  const plotH = 170;

  const xScale = useCallback((t: number) => plotX + (t / TOTAL_TIME) * plotW, []);
  const yScale = useCallback((bis: number) => plotY + plotH - (bis / 100) * plotH, []);

  // BIS trend polyline
  const trendLine = useMemo(() => {
    if (bisHistory.length < 2) return "";
    return bisHistory.map(p => `${xScale(p.t).toFixed(1)},${yScale(p.bis).toFixed(1)}`).join(" ");
  }, [bisHistory, xScale, yScale]);

  // Target zone
  const zoneY1 = yScale(60);
  const zoneY2 = yScale(40);

  return (
            <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">
        BIS Trend Simulator
      </h3>
      <p className="text-xs text-muted-foreground mb-4">
        Press Start, then trigger clinical events to see how BIS responds in real time. Runs at 4× speed over a 10-minute window.
      </p>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {!isRunning && simTime === 0 && (
          <button onClick={startSim}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
            ▶ Start
          </button>
        )}
        {isRunning && (
          <button onClick={() => setIsRunning(false)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium border border-border text-muted-foreground hover:text-foreground transition-colors">
            ⏸ Pause
          </button>
        )}
        {!isRunning && simTime > 0 && (
          <button onClick={startSim}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
            ▶ Resume
          </button>
        )}
        {simTime > 0 && (
          <button onClick={resetSim}
            className="px-3 py-1.5 rounded-lg text-sm font-medium border border-border text-muted-foreground hover:text-foreground transition-colors">
            ↺ Reset
          </button>
        )}

        <div className="h-6 w-px bg-border mx-1" />

        {events.map(evt => (
          <button key={evt.id} onClick={() => fireEvent(evt)}
            disabled={!isRunning}
            className="px-2 py-1 rounded-md text-[11px] font-medium border transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={isRunning ? { borderColor: evt.color, color: evt.color, backgroundColor: `${evt.color}10` } : undefined}>
            {evt.shortLabel}
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-start">
        <div className="flex-shrink-0 mx-auto lg:mx-0">
          <svg viewBox={`0 0 ${svgW} ${svgH}`} width={svgW} height={svgH}
            className="border border-border rounded bg-gradient-to-b from-background to-secondary/10 max-w-full">

            {/* Target zone */}
            <rect x={plotX} y={zoneY1} width={plotW} height={zoneY2 - zoneY1}
              fill="hsl(200, 55%, 50%)" opacity="0.06" />
            <text x={plotX + plotW - 2} y={zoneY1 + 10} textAnchor="end" fontSize="5.5"
              fill="hsl(200, 55%, 50%)" opacity="0.4" fontWeight="600">Target 40–60</text>

            {/* BIS zone backgrounds */}
            {[
              { y1: 0, y2: 20, color: "hsl(0, 55%, 50%)", label: "Burst suppression" },
              { y1: 20, y2: 40, color: "hsl(35, 65%, 50%)", label: "Deep" },
              { y1: 60, y2: 80, color: "hsl(150, 45%, 40%)", label: "Light" },
              { y1: 80, y2: 100, color: "hsl(150, 50%, 45%)", label: "Awake" },
            ].map(zone => (
              <text key={zone.label} x={plotX + 3} y={yScale((zone.y1 + zone.y2) / 2) + 3}
                fontSize="5" fill={zone.color} opacity="0.25" fontWeight="600">{zone.label}</text>
            ))}

            {/* Grid */}
            {[0, 20, 40, 60, 80, 100].map(v => (
              <g key={v}>
                <line x1={plotX} y1={yScale(v)} x2={plotX + plotW} y2={yScale(v)}
                  stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.15" />
                <text x={plotX - 4} y={yScale(v) + 3} textAnchor="end" fontSize="6"
                  fill="hsl(var(--muted-foreground))" opacity="0.5">{v}</text>
              </g>
            ))}
            {Array.from({ length: 11 }, (_, i) => i * 60).map(t => (
              <g key={t}>
                <line x1={xScale(t)} y1={plotY} x2={xScale(t)} y2={plotY + plotH}
                  stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.1" />
                <text x={xScale(t)} y={plotY + plotH + 12} textAnchor="middle" fontSize="5.5"
                  fill="hsl(var(--muted-foreground))" opacity="0.4">{t / 60} min</text>
              </g>
            ))}

            {/* Axis labels */}
            <text x="10" y={plotY + plotH / 2} textAnchor="middle" fontSize="7"
              fill="hsl(var(--muted-foreground))" opacity="0.5"
              transform={`rotate(-90, 10, ${plotY + plotH / 2})`}>BIS</text>
            <text x={plotX + plotW / 2} y={svgH - 3} textAnchor="middle" fontSize="6"
              fill="hsl(var(--muted-foreground))" opacity="0.35">Time</text>

            {/* Event markers */}
            {eventMarkers.map((m, i) => (
              <g key={i}>
                <line x1={xScale(m.t)} y1={plotY} x2={xScale(m.t)} y2={plotY + plotH}
                  stroke={m.event.color} strokeWidth="1" opacity="0.3" strokeDasharray="3 2" />
                <circle cx={xScale(m.t)} cy={plotY + 4} r="2.5" fill={m.event.color} opacity="0.6" />
                <text x={xScale(m.t) + 4} y={plotY + 6 + (i % 3) * 9} fontSize="4.5"
                  fill={m.event.color} opacity="0.6" fontWeight="600">{m.event.shortLabel}</text>
              </g>
            ))}

            {/* BIS trend line */}
            {trendLine && (
              <polyline points={trendLine} fill="none" stroke={bisToColor(currentBIS)}
                strokeWidth="2" opacity="0.85" strokeLinejoin="round" />
            )}

            {/* Current time cursor */}
            {simTime > 0 && (
              <g>
                <line x1={xScale(simTime)} y1={plotY} x2={xScale(simTime)} y2={plotY + plotH}
                  stroke="hsl(var(--foreground))" strokeWidth="0.5" opacity="0.25" />
                {/* Current BIS value */}
                <circle cx={xScale(simTime)} cy={yScale(currentBIS)} r="4"
                  fill={bisToColor(currentBIS)} opacity="0.8" />
                <rect x={xScale(simTime) + 7} y={yScale(currentBIS) - 10} width="32" height="16" rx="3"
                  fill="hsl(var(--background))" fillOpacity="0.85"
                  stroke={bisToColor(currentBIS)} strokeWidth="0.75" />
                <text x={xScale(simTime) + 23} y={yScale(currentBIS) + 1} textAnchor="middle"
                  fontSize="8" fill={bisToColor(currentBIS)} fontWeight="700">
                  {Math.round(currentBIS)}
                </text>
              </g>
            )}

            {/* Plot border */}
            <rect x={plotX} y={plotY} width={plotW} height={plotH}
              fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.2" />
          </svg>
        </div>

        {/* Info panel */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Live BIS display */}
          <div className="p-3 rounded-lg border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-muted-foreground font-medium">Current BIS</p>
                <p className="text-3xl font-bold" style={{ color: bisToColor(currentBIS) }}>
                  {Math.round(currentBIS)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-muted-foreground font-medium">Status</p>
                <p className="text-xs font-semibold" style={{ color: bisToColor(currentBIS) }}>
                  {bisZoneLabel(currentBIS)}
                </p>
              </div>
            </div>
            <div className="mt-2 h-2 rounded-full bg-secondary overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300"
                style={{ width: `${currentBIS}%`, backgroundColor: bisToColor(currentBIS) }} />
            </div>
          </div>

          {/* Event log */}
          <div className="p-3 rounded-lg border border-border bg-secondary/20 max-h-32 overflow-y-auto">
            <p className="font-semibold text-foreground text-xs mb-1.5">Event Log</p>
            {eventMarkers.length === 0 ? (
              <p className="text-xs text-muted-foreground/50 italic">Press Start then trigger events…</p>
            ) : (
              <div className="space-y-1">
                {eventMarkers.slice().reverse().map((m, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px]">
                    <span className="text-muted-foreground w-12 shrink-0">{(m.t / 60).toFixed(1)} min</span>
                    <span className="inline-block w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: m.event.color }} />
                    <span className="text-foreground">{m.event.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Clinical guide */}
          <div className="p-3 rounded-lg border border-border bg-secondary/20">
            <p className="font-semibold text-foreground text-xs mb-1">Suggested Sequence</p>
            <ol className="text-xs text-muted-foreground space-y-0.5 list-decimal list-inside leading-relaxed">
              <li>Press <strong>Start</strong> — BIS begins at ~95 (awake)</li>
              <li>Click <strong>Propofol bolus</strong> — watch BIS drop rapidly</li>
              <li>Click <strong>Start infusion</strong> — maintains BIS 40–60</li>
              <li>Click <strong>Stimulus</strong> — brief BIS rise (arousal)</li>
              <li>Click <strong>Stop infusion</strong> — BIS gradually rises (emergence)</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BISTrendDiagram;
