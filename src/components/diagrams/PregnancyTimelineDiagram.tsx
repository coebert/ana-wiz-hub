import { useEffect, useRef, useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Animated maternal physiology timeline.
 *
 * X-axis: gestational weeks 0 → 40 (+ "PP" post-partum window).
 * Y-axis: clustered tracks for organ systems (CV, Respiratory, Haematology,
 * Renal/Hepatic, GI/Airway, Endocrine/Pharmacology).
 *
 * Each marker indicates the gestational window in which a physiological
 * change typically appears, peaks, or becomes clinically relevant.
 * A draggable / animated playhead sweeps across weeks and surfaces the
 * changes that are "active" at that gestational age in a side panel.
 */

type Track =
  | "cv"
  | "resp"
  | "haem"
  | "renal"
  | "gi"
  | "endo";

interface Event {
  id: string;
  track: Track;
  start: number; // week (0-40, or 41 = postpartum)
  end?: number;
  label: string;
  detail: string;
  peak?: number; // optional peak marker
}

const TRACKS: { id: Track; label: string; color: string; y: number }[] = [
  { id: "cv",    label: "Cardiovascular",       color: "hsl(0 70% 55%)",     y: 80  },
  { id: "resp",  label: "Respiratory",          color: "hsl(200 70% 50%)",   y: 130 },
  { id: "haem",  label: "Haematology",          color: "hsl(340 65% 55%)",   y: 180 },
  { id: "renal", label: "Renal / Hepatic",      color: "hsl(150 55% 45%)",   y: 230 },
  { id: "gi",    label: "GI / Airway",          color: "hsl(30 80% 50%)",    y: 280 },
  { id: "endo",  label: "Endocrine / Pharm.",   color: "hsl(270 55% 55%)",   y: 330 },
];

const EVENTS: Event[] = [
  // Cardiovascular
  { id: "co",    track: "cv",   start: 5,  end: 28, peak: 28, label: "↑ Cardiac output (peaks +30–50%)", detail: "CO rises from 5 weeks; reaches +30–50% by ~28 weeks driven by ↑ SV then ↑ HR." },
  { id: "hr",    track: "cv",   start: 8,  end: 40, label: "↑ HR (+15–25 bpm)", detail: "Heart rate climbs progressively, plateaus in 3rd trimester." },
  { id: "svr",   track: "cv",   start: 5,  end: 20, label: "↓ SVR (progesterone, placenta)", detail: "SVR falls ~20%; BP nadir ~20 weeks." },
  { id: "ivc",   track: "cv",   start: 20, end: 40, label: "Aortocaval compression risk", detail: "From ~20 weeks supine position → IVC compression; left lateral tilt mandatory." },
  { id: "labour",track: "cv",   start: 40, end: 41, peak: 40.5, label: "Labour: CO ↑ further 50%", detail: "Auto-transfusion 300–500 mL per contraction; peak CO immediately post-delivery." },

  // Respiratory
  { id: "mv",    track: "resp", start: 8,  end: 40, label: "↑ Minute ventilation +50%", detail: "Progesterone-driven, primarily ↑ tidal volume. Begins early 1st trimester." },
  { id: "paco2", track: "resp", start: 12, end: 40, label: "Chronic respiratory alkalosis (PaCO₂ ~4 kPa)", detail: "Renal HCO₃⁻ compensation maintains pH ~7.42." },
  { id: "frc",   track: "resp", start: 20, end: 40, label: "↓ FRC (–20% by term)", detail: "Diaphragm displaced by gravid uterus — accelerates desaturation in apnoea." },
  { id: "vo2",   track: "resp", start: 16, end: 40, label: "↑ O₂ consumption +20–30%", detail: "Combined with ↓ FRC → very short safe apnoea time at term." },

  // Haematology
  { id: "plasma",track: "haem", start: 6,  end: 32, peak: 32, label: "↑ Plasma volume (+45%)", detail: "Plateaus ~32 weeks; outpaces RBC mass rise → dilutional anaemia." },
  { id: "rbc",   track: "haem", start: 8,  end: 40, label: "↑ RBC mass (+20%)", detail: "Erythropoietin-driven; lags plasma expansion." },
  { id: "anaemia",track:"haem", start: 28, end: 32, peak: 30, label: "Hb nadir ~110 g/L", detail: "Physiological dilutional anaemia — most marked late 2nd / early 3rd trimester." },
  { id: "hyper", track: "haem", start: 12, end: 40, label: "Hypercoagulable state (↑ fibrinogen, ↓ protein S)", detail: "VTE risk ↑ 5–10×; persists ≥6 weeks postpartum." },
  { id: "wcc",   track: "haem", start: 20, end: 41, label: "↑ WCC (up to 25 in labour)", detail: "Limits utility of WCC as infection marker." },

  // Renal / Hepatic
  { id: "gfr",   track: "renal",start: 6,  end: 16, peak: 16, label: "↑ GFR +50% (creatinine ↓)", detail: "Renal blood flow ↑ 50–80% by mid-pregnancy; upper-limit creatinine ~75 µmol/L." },
  { id: "glyc",  track: "renal",start: 10, end: 40, label: "Glycosuria (↓ tubular threshold)", detail: "Common and benign; do not over-investigate in isolation." },
  { id: "alb",   track: "renal",start: 8,  end: 40, label: "↓ Albumin (dilutional)", detail: "↑ free fraction of highly protein-bound drugs." },
  { id: "alp",   track: "renal",start: 20, end: 40, label: "↑ ALP (placental isoenzyme)", detail: "Not a reliable marker of hepatic disease in pregnancy." },

  // GI / Airway
  { id: "los",   track: "gi",   start: 12, end: 40, label: "↓ LOS tone, ↑ aspiration risk", detail: "Progesterone-mediated; treat all ≥18-week parturients as full stomach." },
  { id: "gastric",track:"gi",   start: 38, end: 41, label: "Delayed gastric emptying in labour", detail: "Opioid analgesia compounds delay — RSI mandated for GA." },
  { id: "airway",track: "gi",   start: 28, end: 41, peak: 40, label: "Airway oedema, Mallampati ↑", detail: "Capillary engorgement worsens through 3rd trimester and labour; use 6.0–6.5 ETT." },

  // Endocrine / Pharmacology
  { id: "mac",   track: "endo", start: 8,  end: 40, label: "↓ MAC 30–40%", detail: "Progesterone + endogenous opioids reduce volatile requirement." },
  { id: "la",    track: "endo", start: 12, end: 40, label: "↓ LA dose ~30% (neuraxial)", detail: "Engorged epidural veins ↓ CSF volume + ↑ neural sensitivity." },
  { id: "chol",  track: "endo", start: 12, end: 41, label: "↓ Plasma cholinesterase", detail: "Subtle prolongation of suxamethonium; rarely clinically important." },
  { id: "thy",   track: "endo", start: 8,  end: 20, label: "↑ TBG → ↑ total T4 (free T4 normal)", detail: "Interpret thyroid function with pregnancy-specific ranges." },
];

const PregnancyTimelineDiagram = () => {
  const [week, setWeek] = useState(20);
  const [playing, setPlaying] = useState(true);
  const [activeTrack, setActiveTrack] = useState<Track | "all">("all");
  const rafRef = useRef<number | null>(null);
  const lastT = useRef<number>(performance.now());

  useEffect(() => {
    if (!playing) return;
    const tick = (t: number) => {
      const dt = t - lastT.current;
      lastT.current = t;
      setWeek((w) => {
        const next = w + dt * 0.0035; // ~ 1 week / 285 ms
        return next > 41 ? 0 : next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    lastT.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  const W = 880;
  const H = 410;
  const X0 = 140;
  const X1 = W - 30;
  const weekToX = (w: number) => X0 + (Math.min(Math.max(w, 0), 41) / 41) * (X1 - X0);

  const playheadX = weekToX(week);
  const trimester =
    week < 13 ? "1st trimester" : week < 27 ? "2nd trimester" : week < 40 ? "3rd trimester" : "Labour / Postpartum";

  const visibleEvents = EVENTS.filter((e) => activeTrack === "all" || e.track === activeTrack);
  const activeEvents = visibleEvents.filter(
    (e) => week >= e.start && week <= (e.end ?? e.start + 0.5)
  );

  return (
    <DiagramFigure
      id="pregnancy-timeline-diagram"
      title="Pregnancy timeline"
      description="Auto-generated wrapper for the Pregnancy timeline anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="rounded-xl border border-border bg-card/50 p-4 space-y-4">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div>
            <h3 className="font-serif font-bold text-foreground text-lg">Pregnancy Physiology Timeline</h3>
            <p className="text-xs text-muted-foreground">
              Week <span className="font-mono text-foreground">{week >= 41 ? "PP" : week.toFixed(1)}</span> · {trimester}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="px-3 py-1.5 text-xs rounded-md bg-primary text-primary-foreground hover:opacity-90"
            >
              {playing ? "Pause" : "Play"}
            </button>
            <button
              onClick={() => setWeek(0)}
              className="px-3 py-1.5 text-xs rounded-md bg-secondary text-foreground hover:bg-secondary/80"
            >
              Reset
            </button>
          </div>
        </div>
  
        {/* Track filter */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveTrack("all")}
            className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
              activeTrack === "all"
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-muted-foreground border-border hover:text-foreground"
            }`}
          >
            All systems
          </button>
          {TRACKS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTrack(t.id)}
              className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                activeTrack === t.id ? "text-background border-transparent" : "bg-transparent text-muted-foreground border-border hover:text-foreground"
              }`}
              style={activeTrack === t.id ? { backgroundColor: t.color } : undefined}
            >
              {t.label}
            </button>
          ))}
        </div>
  
        <div className="overflow-x-auto">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" style={{ minWidth: 640 }}>
            {/* Trimester bands */}
            {[
              { from: 0, to: 13, label: "1st trimester", fill: "hsl(var(--secondary) / 0.25)" },
              { from: 13, to: 27, label: "2nd trimester", fill: "hsl(var(--secondary) / 0.45)" },
              { from: 27, to: 40, label: "3rd trimester", fill: "hsl(var(--secondary) / 0.65)" },
              { from: 40, to: 41, label: "Labour / PP", fill: "hsl(0 60% 50% / 0.18)" },
            ].map((b) => (
              <g key={b.label}>
                <rect x={weekToX(b.from)} y={50} width={weekToX(b.to) - weekToX(b.from)} height={H - 90} fill={b.fill} />
                <text x={(weekToX(b.from) + weekToX(b.to)) / 2} y={42} textAnchor="middle"
                  className="fill-muted-foreground" fontSize="10">{b.label}</text>
              </g>
            ))}
  
            {/* Week axis */}
            {[0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40].map((w) => (
              <g key={w}>
                <line x1={weekToX(w)} y1={H - 40} x2={weekToX(w)} y2={H - 35} stroke="hsl(var(--muted-foreground))" strokeWidth={1} />
                <text x={weekToX(w)} y={H - 22} textAnchor="middle" className="fill-muted-foreground" fontSize="10">{w}</text>
              </g>
            ))}
            <text x={weekToX(41)} y={H - 22} textAnchor="middle" className="fill-muted-foreground" fontSize="10">PP</text>
            <text x={(X0 + X1) / 2} y={H - 6} textAnchor="middle" className="fill-muted-foreground" fontSize="11">
              Gestational age (weeks)
            </text>
  
            {/* Track rows */}
            {TRACKS.map((t) => {
              const dim = activeTrack !== "all" && activeTrack !== t.id;
              return (
                <g key={t.id} opacity={dim ? 0.2 : 1}>
                  <line x1={X0} y1={t.y} x2={X1} y2={t.y} stroke="hsl(var(--border))" strokeDasharray="2 4" />
                  <text x={X0 - 10} y={t.y + 4} textAnchor="end" className="fill-foreground" fontSize="11" fontWeight={600}>
                    {t.label}
                  </text>
                  <circle cx={X0 - 122} cy={t.y - 1} r={4} fill={t.color} />
                </g>
              );
            })}
  
            {/* Events */}
            {visibleEvents.map((e) => {
              const track = TRACKS.find((t) => t.id === e.track)!;
              const x1 = weekToX(e.start);
              const x2 = weekToX(e.end ?? e.start + 0.5);
              const isActive = week >= e.start && week <= (e.end ?? e.start + 0.5);
              return (
                <g key={e.id}>
                  {/* span bar */}
                  <rect
                    x={x1}
                    y={track.y - 7}
                    width={Math.max(6, x2 - x1)}
                    height={14}
                    rx={7}
                    fill={track.color}
                    opacity={isActive ? 0.95 : 0.45}
                    stroke={isActive ? track.color : "transparent"}
                    strokeWidth={isActive ? 2 : 0}
                    style={{ filter: isActive ? `drop-shadow(0 0 6px ${track.color})` : "none" }}
                  >
                    <title>{e.label} (weeks {e.start}{e.end ? `–${e.end === 41 ? "PP" : e.end}` : ""})</title>
                  </rect>
                  {/* peak marker */}
                  {e.peak !== undefined && (
                    <circle cx={weekToX(e.peak)} cy={track.y} r={3.5} fill="hsl(var(--background))" stroke={track.color} strokeWidth={2} />
                  )}
                  {/* start tick */}
                  <line x1={x1} y1={track.y - 10} x2={x1} y2={track.y + 10} stroke={track.color} strokeWidth={1} opacity={0.6} />
                </g>
              );
            })}
  
            {/* Playhead */}
            <line x1={playheadX} y1={50} x2={playheadX} y2={H - 40} stroke="hsl(var(--primary))" strokeWidth={2} />
            <polygon
              points={`${playheadX - 6},46 ${playheadX + 6},46 ${playheadX},56`}
              fill="hsl(var(--primary))"
            />
            <rect
              x={playheadX - 22}
              y={28}
              width={44}
              height={16}
              rx={3}
              fill="hsl(var(--primary))" stroke="hsl(var(--border))" strokeWidth="0.75" />
            <text x={playheadX} y={40} textAnchor="middle" className="fill-primary-foreground" fontSize="10" fontWeight={700}>
              {week >= 41 ? "PP" : `wk ${Math.round(week)}`}
            </text>
          </svg>
        </div>
  
        {/* Scrubber */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-8">0</span>
          <input
            type="range"
            min={0}
            max={41}
            step={0.1}
            value={week}
            onChange={(e) => {
              setPlaying(false);
              setWeek(parseFloat(e.target.value));
            }}
            className="flex-1 accent-primary"
          />
          <span className="text-xs text-muted-foreground w-8 text-right">PP</span>
        </div>
  
        {/* Active changes panel */}
        <div className="rounded-lg border border-border bg-secondary/30 p-3">
          <p className="text-xs font-semibold text-foreground mb-2">
            Active at week {week >= 41 ? "PP" : week.toFixed(0)} — {activeEvents.length} change{activeEvents.length === 1 ? "" : "s"}
          </p>
          {activeEvents.length === 0 ? (
            <p className="text-xs text-muted-foreground italic">No specific changes flagged at this gestational age.</p>
          ) : (
            <ul className="space-y-1.5">
              {activeEvents.map((e) => {
                const track = TRACKS.find((t) => t.id === e.track)!;
                return (
                      <li key={e.id} className="flex gap-2 text-xs">
                    <span
                      className="mt-1 h-2 w-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: track.color }}
                    />
                    <div>
                      <span className="font-semibold text-foreground">{e.label}</span>
                      <span className="text-muted-foreground"> — {e.detail}</span>
                    </div>
                  </li>
    );
              })}
            </ul>
          )}
        </div>
      </div>
    </DiagramFigure>
  );
};

export default PregnancyTimelineDiagram;
