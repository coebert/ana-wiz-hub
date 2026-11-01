import { useMemo, useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

import { segments, interpolateOsm } from "@/lib/urine-illustration";
import { Button } from "@/components/ui/button";
import { InlineRef } from "@/components/references/InlineRef";

const adhPresets = [
  { label: "Water diuresis", value: 0, hint: "Low illustrative antidiuretic effect" },
  { label: "Low effect", value: 0.15, hint: "Illustrative low effect" },
  { label: "Intermediate effect", value: 0.5, hint: "Illustrative intermediate effect" },
  { label: "High effect", value: 0.85, hint: "Illustrative high effect" },
  { label: "Antidiuresis", value: 1, hint: "Highest illustrative effect" },
];

export const UrineConcentrationSimulator = () => {
  const [adh, setAdh] = useState(0.5);

  const finalOsm = Math.round(segments[segments.length - 1].osm(adh));
  const interstitialMax = Math.round(800 + adh * 400);

  // Build trace path
  const W = 620;
  const H = 240;
  const padL = 50;
  const padR = 20;
  const padT = 20;
  const padB = 50;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const yForOsm = (osm: number) => padT + plotH - ((osm - 0) / 1300) * plotH;
  const xForT = (t: number) => padL + t * plotW;

  const tracePath = useMemo(() => {
    const pts: string[] = [];
    for (let i = 0; i <= 100; i++) {
      const t = i / 100;
      const osm = interpolateOsm(t, adh);
      pts.push(`${i === 0 ? "M" : "L"} ${xForT(t).toFixed(2)} ${yForOsm(osm).toFixed(2)}`);
    }
    return pts.join(" ");
  }, [adh]);

  // Interstitial gradient shading on the right axis
  const _gradientStops = useMemo(() => {
    return [
      { y: yForOsm(300), osm: 300 },
      { y: yForOsm(600), osm: 600 },
      { y: yForOsm(interstitialMax), osm: interstitialMax },
    ];
  }, [interstitialMax]);

  const finalSegment = segments[segments.length - 1];

  return (
    <DiagramFigure
      id="urine-concentration-simulator"
      title="Urine concentration"
      description="Continuous illustrative antidiuretic-effect profiles, not measured hormone concentrations or patient predictions."
    >
              <div className="space-y-4">
        <p className="text-xs text-muted-foreground">Unvalidated illustrative profiles: values and relative effect do not predict a patient’s urine or hormone concentration. Presets do not diagnose disease.</p>
        {/* Effect slider + presets */}
        <div className="rounded-lg border border-border bg-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="adh-slider" className="text-sm font-semibold text-foreground">
                Relative antidiuretic effect
              </label>
              <p className="text-[11px] text-muted-foreground">Drives AQP2 insertion in the collecting duct</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{Math.round(adh * 100)}%</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide">illustrative scale</p>
            </div>
          </div>
          <input
            id="adh-slider"
            type="range"
            min={0}
            max={100}
            value={Math.round(adh * 100)}
            onChange={(e) => setAdh(Number(e.target.value) / 100)}
            className="w-full accent-primary cursor-pointer"
            aria-label="Relative antidiuretic effect"
          />
          <div className="flex flex-wrap gap-1.5">
            {adhPresets.map((p) => (
              <Button variant="outline"
                key={p.label}
                onClick={() => setAdh(p.value)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all ${
                  Math.abs(adh - p.value) < 0.04
                    ? "bg-primary/15 border-primary/50 text-primary"
                    : "bg-secondary/50 border-border text-muted-foreground hover:bg-secondary"
                }`}
                title={p.hint}
              >
                {p.label}
              </Button>
            ))}
          </div>
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Plot */}
          <div className="lg:col-span-3 rounded-lg border border-border bg-card p-3 overflow-x-auto">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[520px]" role="img" aria-label="Tubular fluid osmolality">
              {/* Y axis grid + labels */}
              {[0, 300, 600, 900, 1200].map((osm) => (
                <g key={osm}>
                  <line x1={padL} y1={yForOsm(osm)} x2={W - padR} y2={yForOsm(osm)} stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.6" />
                  <text x={padL - 6} y={yForOsm(osm) + 3} fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="end">{osm}</text>
                </g>
              ))}
              <text x="10" y={padT + plotH / 2} fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle"
                transform={`rotate(-90, 10, ${padT + plotH / 2})`}>mOsm/kg</text>
  
              {/* Plasma reference (300) */}
              <line x1={padL} y1={yForOsm(300)} x2={W - padR} y2={yForOsm(300)} stroke="hsl(var(--primary))" strokeWidth="0.75" strokeDasharray="4 3" opacity="0.5" />
              <text x={W - padR - 4} y={yForOsm(300) - 4} fontSize="8" fill="hsl(var(--primary))" textAnchor="end" fontWeight="600">plasma 300</text>
  
              {/* Interstitial max line */}
              <line x1={padL} y1={yForOsm(interstitialMax)} x2={W - padR} y2={yForOsm(interstitialMax)}
                stroke="hsl(15 55% 45%)" strokeWidth="0.75" strokeDasharray="2 4" opacity="0.55" />
              <text x={W - padR - 4} y={yForOsm(interstitialMax) - 3} fontSize="8" fill="hsl(15 55% 45%)" textAnchor="end" fontWeight="600">
                illustrative peak {interstitialMax}
              </text>
  
              {/* Trace */}
              <path d={tracePath} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
  
              {/* Segment markers */}
              {segments.map((s) => {
                const osm = s.osm(adh);
                return (
                      <g key={s.id}>
                    <line x1={xForT(s.x)} y1={padT} x2={xForT(s.x)} y2={padT + plotH} stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.4" />
                    <circle cx={xForT(s.x)} cy={yForOsm(osm)} r="3.5" fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth="1" />
                  </g>
    );
              })}
  
              {/* X axis segment labels */}
              {segments.map((s, i) => (
                <text
                  key={`xl-${s.id}`}
                  x={xForT(s.x)}
                  y={padT + plotH + 14}
                  fontSize="7.5"
                  fill="hsl(var(--muted-foreground))"
                  textAnchor="middle"
                  transform={`rotate(-25, ${xForT(s.x)}, ${padT + plotH + 14})`}
                  fontWeight={i === segments.length - 1 ? 700 : 500}
                >
                  {s.label}
                </text>
              ))}
  
              {/* Final urine readout */}
              <g transform={`translate(${xForT(0.99) - 58}, ${yForOsm(finalSegment.osm(adh))})`}>
                <rect x="0" y="-12" width="58" height="20" rx="3" fill="hsl(var(--primary))" stroke="hsl(var(--border))" strokeWidth="0.75" />
                <text x="29" y="2" fontSize="10" fill="hsl(var(--primary-foreground))" textAnchor="middle" fontWeight="700">
                  {finalOsm}
                </text>
              </g>
            </svg>
          </div>
  
          {/* Readouts */}
          <div className="lg:col-span-2 space-y-3">
            {/* Final urine */}
            <div className={`rounded-lg border p-3 ${
              finalOsm < 100 ? "border-blue-500/40 bg-blue-500/10" :
              finalOsm < 300 ? "border-cyan-500/40 bg-cyan-500/10" :
              finalOsm < 600 ? "border-emerald-500/40 bg-emerald-500/10" :
              finalOsm < 900 ? "border-amber-500/40 bg-amber-500/10" :
              "border-red-500/40 bg-red-500/10"
            }`}>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">Illustrative final urine osmolality</p>
              <p className="text-3xl font-bold text-foreground">{finalOsm} <span className="text-sm font-medium text-muted-foreground">mOsm/kg</span></p>
              <p className="text-xs text-foreground/85 leading-relaxed mt-1">{finalSegment.note(adh)}</p>
            </div>
  
            {/* Key segment osmolalities */}
            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-2">Tubular fluid at key sites</p>
              <div className="space-y-1.5">
                {[
                  segments[1], // end PCT
                  segments[2], // tip of loop
                  segments[3], // end TAL
                  segments[5], // end CCD
                  segments[7], // final
                ].map((s) => (
                  <div key={s.id} className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className="font-semibold text-foreground tabular-nums">{Math.round(s.osm(adh))} mOsm/kg</span>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Mechanism note */}
            <div className="rounded-lg border border-border bg-secondary/20 p-3">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-1">Mechanism</p>
              <p className="text-[11px] text-foreground/85 leading-relaxed">
                Vasopressin binds V2 receptors on principal cell basolateral membrane → Gs/cAMP/PKA → AQP2 vesicles fuse with the apical membrane; water exits through basolateral AQP3/4.<InlineRef topicId="renal-physiology" refLabel="Nielsen 1995 AQP2" /><InlineRef topicId="renal-physiology" refLabel="Agre aquaporins lecture" /> Water flows down the corticomedullary gradient (created by the loop of Henle countercurrent multiplier and maintained by vasa recta countercurrent exchange). Urea recycling via UT-A1/A3 transporters amplifies the inner medullary gradient at high ADH.
              </p>
            </div>
          </div>
        </div>
  
        {/* Clinical scenarios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="rounded-lg border border-border bg-secondary/20 p-3">
            <p className="text-xs font-semibold text-foreground mb-1">Diabetes insipidus</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Central vasopressin deficiency differs from nephrogenic renal resistance. Polyuria and dilute urine require clinical investigation; a slider cannot diagnose either. Hypernatraemia depends on water intake and access, not simply hormone or effect level.<InlineRef topicId="renal-physiology" refLabel="NIDDK diabetes insipidus" />
            </p>
          </div>
          <div className="rounded-lg border border-border bg-secondary/20 p-3">
            <p className="text-xs font-semibold text-foreground mb-1">SIADH</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              SIAD is inappropriate antidiuresis in clinical context, requiring exclusion of other causes of hypotonic hyponatraemia. It is not equivalent to maximal hormone concentration or a particular slider position; vasopressin measurement is not recommended to confirm SIAD.<InlineRef topicId="renal-physiology" refLabel="European hyponatraemia 2014 SIAD" />
            </p>
          </div>
          <div className="rounded-lg border border-border bg-secondary/20 p-3">
            <p className="text-xs font-semibold text-foreground mb-1">Loop diuretics</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Loop diuretics inhibit NKCC2 and impair the medullary concentration gradient; they do not invariably abolish it. This schematic provides no hyponatraemia treatment instruction.
            </p>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default UrineConcentrationSimulator;
