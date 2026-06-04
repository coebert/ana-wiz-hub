import { useEffect, useRef, useState } from "react";

const useFrame = (running: boolean) => {
  const [t, setT] = useState(0);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    if (!running) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setT((p) => p + dt);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [running]);
  return t;
};

// Build a path through a list of points and animate particles along its arclength.
function pathPoints(segs: { x: number; y: number }[]) {
  const lens: number[] = [0];
  let total = 0;
  for (let i = 1; i < segs.length; i++) {
    const dx = segs[i].x - segs[i - 1].x;
    const dy = segs[i].y - segs[i - 1].y;
    total += Math.hypot(dx, dy);
    lens.push(total);
  }
  return { segs, lens, total };
}

function pointAt(p: ReturnType<typeof pathPoints>, frac: number) {
  const target = frac * p.total;
  for (let i = 1; i < p.segs.length; i++) {
    if (p.lens[i] >= target) {
      const segLen = p.lens[i] - p.lens[i - 1];
      const local = segLen === 0 ? 0 : (target - p.lens[i - 1]) / segLen;
      return {
        x: p.segs[i - 1].x + (p.segs[i].x - p.segs[i - 1].x) * local,
        y: p.segs[i - 1].y + (p.segs[i].y - p.segs[i - 1].y) * local,
      };
    }
  }
  return p.segs[p.segs.length - 1];
}

function svgPath(segs: { x: number; y: number }[]) {
  return segs.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ");
}

export const VAECMOCircuitDiagram = () => {
  const [running, setRunning] = useState(true);
  const [showHarlequin, setShowHarlequin] = useState(false);
  const [showLVDistension, setShowLVDistension] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const t = useFrame(running);

  const W = 720, H = 520;

  // ===== ANATOMICAL LANDMARKS (patient on left) =====
  // Torso outline reference: head ~y45, neck y70-100, thorax y100-260, abdomen 260-360, pelvis 360-430, thighs 430-505
  // Mid-sternum at x=190

  // Great vessels — IVC enters RA from below, SVC from above
  // RA centre (200, 195); RV (175, 240); LA (235, 195); LV (220, 245)

  // Femoral venous drainage: femoral vein (R groin x205,y420) → external iliac → IVC → RA
  // Cannula path OUTSIDE body then anatomic course INSIDE body
  const drainSegs = pathPoints([
    { x: 200, y: 195 },   // RA / SVC-IVC junction (cannula tip)
    { x: 200, y: 260 },   // IVC mid
    { x: 200, y: 340 },   // IVC at renal level
    { x: 205, y: 395 },   // common iliac → external iliac
    { x: 215, y: 425 },   // groin entry / femoral vein
    { x: 290, y: 455 },   // exit body to circuit
    { x: 430, y: 470 },   // along to pump area
    { x: 540, y: 430 },   // up into pump inlet
    { x: 555, y: 395 },
  ]);

  // Pump → oxygenator
  const pumpToOxy = pathPoints([
    { x: 605, y: 350 },   // pump outlet
    { x: 645, y: 350 },
    { x: 645, y: 240 },   // up to oxygenator inlet (bottom)
  ]);

  // Oxygenator outlet (top) → arterial return → femoral artery → retrograde aorta
  const oxyToArt = pathPoints([
    { x: 645, y: 110 },   // oxygenator top outlet
    { x: 645, y: 80 },
    { x: 480, y: 70 },
    { x: 320, y: 90 },
    { x: 280, y: 460 },   // down to arterial cannula at L groin
    { x: 245, y: 435 },   // femoral artery entry
    { x: 240, y: 395 },   // external iliac
    { x: 235, y: 340 },   // common iliac → distal aorta
    { x: 230, y: 260 },   // descending aorta
    { x: 225, y: 200 },   // aortic isthmus
    { x: 220, y: 165 },   // aortic arch (descending limb)
    { x: 210, y: 140 },   // arch apex (meeting point — watershed)
  ]);

  // Native LV ejection path: LV → aortic root → ascending aorta → arch
  const nativeEjectSegs = pathPoints([
    { x: 220, y: 235 },   // LV cavity
    { x: 222, y: 195 },   // LVOT / aortic valve
    { x: 215, y: 165 },   // ascending aorta
    { x: 210, y: 140 },   // arch apex
  ]);

  // Particle counts
  const N = 9;
  const particles = (offset: number) => Array.from({ length: N }, (_, i) => ((t * 0.32 + i / N + offset) % 1));
  const oxyParticles = particles(0);

  // Watershed location depends on native CO vs ECMO flow
  const watershedX = showHarlequin ? 200 : 210;
  const watershedY = showHarlequin ? 120 : 140;

  // Pump rotor angle
  const rotorAngle = (t * 360 * 1.5) % 360;

  // Heart contraction phase (gentle pulse if not in distension)
  const beat = 0.5 + 0.5 * Math.sin(t * 2 * Math.PI * 1.1); // ~66 bpm
  const contract = showLVDistension ? 0 : beat; // distended LV doesn't contract

  return (
    <div className="w-full max-w-3xl mx-auto space-y-3 my-6">
      <div className="text-center">
        <h3 className="text-lg font-serif font-bold text-foreground">
          Peripheral VA-ECMO Circuit
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Femoro-femoral configuration · anatomical view with centrifugal pump and membrane oxygenator
        </p>
      </div>

      <div className="bg-card rounded-lg border border-border p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="Anatomical diagram of peripheral VA-ECMO circuit showing femoral venous drainage, centrifugal pump, membrane oxygenator and femoral arterial return.">
          <defs>
            <radialGradient id="vae-torso-grad" cx="0.4" cy="0.4" r="0.8">
              <stop offset="0%" stopColor="hsl(var(--clinical))" stopOpacity="0.10" />
              <stop offset="100%" stopColor="hsl(var(--clinical))" stopOpacity="0.02" />
            </radialGradient>
            <radialGradient id="vae-heart-grad" cx="0.5" cy="0.5" r="0.7">
              <stop offset="0%" stopColor="hsl(0 65% 60%)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="hsl(0 65% 35%)" stopOpacity="0.55" />
            </radialGradient>
            <linearGradient id="vae-aorta-oxy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(0 75% 55%)" />
              <stop offset="100%" stopColor="hsl(0 75% 45%)" />
            </linearGradient>
            <linearGradient id="vae-aorta-deox" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(220 70% 50%)" />
              <stop offset="100%" stopColor="hsl(220 70% 40%)" />
            </linearGradient>
            <radialGradient id="vae-pump-grad" cx="0.35" cy="0.35" r="0.8">
              <stop offset="0%" stopColor="hsl(215 25% 35%)" />
              <stop offset="100%" stopColor="hsl(215 25% 15%)" />
            </radialGradient>
            <linearGradient id="vae-oxy-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(0 65% 50%)" stopOpacity="0.55" />
              <stop offset="50%" stopColor="hsl(280 35% 45%)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="hsl(220 70% 45%)" stopOpacity="0.55" />
            </linearGradient>
            <pattern id="vae-skin" width="6" height="6" patternUnits="userSpaceOnUse">
              <rect width="6" height="6" fill="url(#vae-torso-grad)" />
              <circle cx="2" cy="2" r="0.5" fill="hsl(var(--clinical))" opacity="0.08" />
            </pattern>
            <filter id="vae-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" />
            </filter>
          </defs>

          {/* ===== ANATOMICAL TORSO ===== */}
          {/* Head */}
          <ellipse cx="190" cy="55" rx="32" ry="38" fill="url(#vae-skin)" stroke="hsl(var(--clinical))" strokeWidth="1" opacity="0.9" />
          {/* Neck */}
          <path d="M 170 88 Q 165 95, 165 105 L 215 105 Q 215 95, 210 88 Z" fill="url(#vae-skin)" stroke="hsl(var(--clinical))" strokeWidth="1" opacity="0.9" />
          {/* Thorax — trapezoid shoulders narrowing to ribs */}
          <path d="M 165 105 Q 110 110, 95 145 L 95 270 Q 110 285, 130 290 L 250 290 Q 270 285, 285 270 L 285 145 Q 270 110, 215 105 Z"
            fill="url(#vae-skin)" stroke="hsl(var(--clinical))" strokeWidth="1" opacity="0.9" />
          {/* Ribs hinted */}
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={`rib${i}`}
              d={`M 110 ${135 + i * 22} Q 190 ${128 + i * 22}, 270 ${135 + i * 22}`}
              stroke="hsl(var(--clinical))" strokeWidth="0.5" fill="none" opacity="0.18" />
          ))}
          {/* Diaphragm */}
          <path d="M 100 285 Q 190 275, 280 285" stroke="hsl(var(--clinical))" strokeWidth="0.75" fill="none" opacity="0.35" strokeDasharray="3 2" />
          {/* Abdomen */}
          <path d="M 100 285 L 95 365 Q 110 380, 130 385 L 250 385 Q 270 380, 285 365 L 280 285 Z"
            fill="url(#vae-skin)" stroke="hsl(var(--clinical))" strokeWidth="1" opacity="0.9" />
          {/* Pelvis */}
          <path d="M 95 365 Q 90 405, 105 430 L 165 440 L 215 440 L 275 430 Q 290 405, 285 365 Z"
            fill="url(#vae-skin)" stroke="hsl(var(--clinical))" strokeWidth="1" opacity="0.9" />
          {/* Thighs (R then L) */}
          <path d="M 105 430 Q 100 470, 115 510 L 175 510 Q 180 470, 170 440 Z"
            fill="url(#vae-skin)" stroke="hsl(var(--clinical))" strokeWidth="1" opacity="0.85" />
          <path d="M 210 440 Q 205 470, 210 510 L 270 510 Q 285 470, 275 430 Z"
            fill="url(#vae-skin)" stroke="hsl(var(--clinical))" strokeWidth="1" opacity="0.85" />

          {/* ===== LUNGS ===== */}
          <path d="M 115 140 Q 100 170, 105 230 Q 115 265, 140 270 Q 155 250, 152 195 Q 150 155, 140 140 Z"
            fill="hsl(var(--icu))" opacity="0.10" stroke="hsl(var(--icu))" strokeWidth="0.75" />
          <path d="M 265 140 Q 280 170, 275 230 Q 265 265, 245 270 Q 232 250, 235 195 Q 237 155, 245 140 Z"
            fill="hsl(var(--icu))" opacity="0.10" stroke="hsl(var(--icu))" strokeWidth="0.75" />
          {showLabels && <text x="120" y="195" fontSize="10" fontWeight="600" className="fill-muted-foreground">R lung</text>}
          {showLabels && <text x="252" y="195" fontSize="10" fontWeight="600" className="fill-muted-foreground">L lung</text>}

          {/* ===== GREAT VESSELS ===== */}
          {/* SVC — descends from R brachiocephalic vein into RA */}
          <path d="M 175 110 Q 178 140, 188 175" stroke="hsl(220 70% 45%)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9" />
          {/* IVC — long blue vessel from pelvis through abdomen to RA */}
          <path d="M 200 195 L 200 280 L 202 360 Q 205 400, 215 425" stroke="hsl(220 70% 45%)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9" />
          {/* L common iliac feeding IVC (via R common iliac) */}
          <path d="M 215 425 Q 195 415, 175 425" stroke="hsl(220 70% 45%)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7" />

          {/* Aortic arch — anatomical curve with three branches */}
          {/* Ascending aorta */}
          <path d="M 215 220 Q 213 185, 210 160" stroke="url(#vae-aorta-oxy)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.95" />
          {/* Arch curve */}
          <path d="M 210 160 Q 200 125, 220 120 Q 240 122, 235 160" stroke="url(#vae-aorta-oxy)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.95" />
          {/* Three arch branches: brachiocephalic (R), L common carotid, L subclavian */}
          {/* Brachiocephalic trunk */}
          <path d="M 205 135 L 185 110 L 175 95"
            stroke={showHarlequin ? "url(#vae-aorta-deox)" : "url(#vae-aorta-oxy)"}
            strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9" />
          {/* R common carotid + R subclavian split */}
          <path d="M 175 95 L 165 75" stroke={showHarlequin ? "hsl(220 70% 45%)" : "hsl(0 75% 50%)"} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9" />
          <path d="M 175 95 L 145 95 L 130 105" stroke={showHarlequin ? "hsl(220 70% 45%)" : "hsl(0 75% 50%)"} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9" />
          {/* L common carotid */}
          <path d="M 218 118 L 215 90 L 213 70"
            stroke={showHarlequin ? "hsl(220 70% 45%)" : "hsl(0 75% 50%)"}
            strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9" />
          {/* L subclavian */}
          <path d="M 232 122 L 250 105 L 270 100"
            stroke={showHarlequin ? "hsl(220 70% 45%)" : "hsl(0 75% 50%)"}
            strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.9" />

          {/* Descending thoracic + abdominal aorta — always oxygenated by ECMO */}
          <path d="M 235 160 Q 232 220, 230 280 L 230 360 Q 232 400, 240 425" stroke="url(#vae-aorta-oxy)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.95" />

          {/* Iliac bifurcation */}
          <path d="M 240 425 Q 220 432, 200 442" stroke="hsl(0 75% 50%)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85" />
          {/* Femoral arteries (down each thigh) */}
          <path d="M 240 425 Q 245 470, 240 505" stroke="hsl(0 75% 50%)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85" />
          <path d="M 200 442 Q 145 470, 145 505" stroke="hsl(0 75% 50%)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.85" />

          {/* Pulmonary trunk + arteries (from RV) */}
          <path d="M 175 240 Q 165 220, 155 200 Q 140 195, 130 200" stroke="hsl(220 60% 50%)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7" strokeDasharray="2 2" />
          <path d="M 175 240 Q 185 220, 200 215 Q 220 215, 235 215" stroke="hsl(220 60% 50%)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7" strokeDasharray="2 2" />
          {/* Pulmonary veins (oxy → LA) */}
          <path d="M 152 220 Q 180 200, 215 200" stroke="hsl(0 65% 50%)" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" strokeDasharray="2 2" />

          {/* ===== HEART (anatomical, 4 chambers + valves) ===== */}
          {/* Pericardium silhouette */}
          <path d="M 165 175 Q 145 175, 140 215 Q 138 260, 175 280 Q 220 290, 250 275 Q 270 260, 260 220 Q 250 178, 215 175 Z"
            fill="url(#vae-heart-grad)" stroke="hsl(0 60% 35%)" strokeWidth="1" opacity="0.85" filter="url(#vae-shadow)" />

          {/* RA */}
          <ellipse cx="190" cy="195" rx={18 + contract * 1.5} ry={20 + contract * 1.5}
            fill="hsl(220 70% 50%)" opacity="0.45" stroke="hsl(220 70% 35%)" strokeWidth="1" />
          {/* RV */}
          <path d={`M 175 215 Q 150 220, 145 250 Q 150 ${275 - contract * 3}, 195 ${270 - contract * 2} Q 200 245, 195 220 Z`}
            fill="hsl(220 70% 50%)" opacity="0.42" stroke="hsl(220 70% 35%)" strokeWidth="1" />
          {/* LA */}
          <ellipse cx="230" cy="195" rx={16 + contract * 1.2} ry={18 + contract * 1.2}
            fill="hsl(0 65% 50%)" opacity="0.4" stroke="hsl(0 65% 35%)" strokeWidth="1" />
          {/* LV — distended overlay if toggle on */}
          <path
            d={showLVDistension
              ? "M 215 218 Q 250 222, 262 260 Q 258 295, 215 295 Q 195 280, 200 245 Z"
              : `M 215 218 Q 245 220, 252 250 Q ${250 - contract * 4} ${280 - contract * 3}, 215 ${278 - contract * 2} Q 200 260, 205 235 Z`}
            fill="hsl(0 65% 50%)"
            opacity={showLVDistension ? 0.55 : 0.45}
            stroke={showLVDistension ? "hsl(0 75% 38%)" : "hsl(0 65% 35%)"}
            strokeWidth={showLVDistension ? 2.2 : 1.2}
          />
          {/* Interventricular septum */}
          <path d="M 200 220 Q 205 245, 200 270" stroke="hsl(0 50% 30%)" strokeWidth="1" fill="none" opacity="0.55" />

          {/* Valves — schematic */}
          {/* Tricuspid (RA-RV) */}
          <line x1="178" y1="215" x2="195" y2="215" stroke="hsl(45 80% 50%)" strokeWidth="1" opacity="0.7" />
          {/* Mitral (LA-LV) */}
          <line x1="218" y1="215" x2="235" y2="215" stroke="hsl(45 80% 50%)" strokeWidth="1" opacity="0.7" />
          {/* Aortic */}
          <circle cx="218" cy="218" r="3" fill="none" stroke="hsl(45 80% 50%)" strokeWidth={showLVDistension ? 1.2 : 1.6} opacity={showLVDistension ? 0.5 : 0.9} />
          {/* Pulmonary */}
          <circle cx="180" cy="222" r="2.5" fill="none" stroke="hsl(45 80% 50%)" strokeWidth="1" opacity="0.7" />

          {showLabels && (
            <>
              <text x="190" y="199" textAnchor="middle" fontSize="9" className="fill-foreground font-bold">RA</text>
              <text x="170" y="253" textAnchor="middle" fontSize="9" className="fill-foreground font-bold">RV</text>
              <text x="230" y="199" textAnchor="middle" fontSize="9" className="fill-foreground font-bold">LA</text>
              <text x="225" y="259" textAnchor="middle" fontSize="9" className="fill-foreground font-bold">LV</text>
              <text x="245" y="160" fontSize="9" fontWeight="600" className="fill-muted-foreground">Ao</text>
              <text x="158" y="118" fontSize="9" fontWeight="600" className="fill-muted-foreground">SVC</text>
              <text x="208" y="350" fontSize="9" fontWeight="600" className="fill-muted-foreground">IVC</text>
              <text x="245" y="135" fontSize="8" fontWeight="600" className="fill-muted-foreground">arch</text>
            </>
          )}
          {showLVDistension && (
            <text x="225" y="310" textAnchor="middle" fontSize="11" className="fill-[hsl(0_75%_45%)] font-bold">LV DISTENDED</text>
          )}

          {/* Watershed marker on aortic arch */}
          {showHarlequin && (
            <>
              <circle cx={watershedX} cy={watershedY} r="8" fill="none" stroke="hsl(45 95% 50%)" strokeWidth="2.5" strokeDasharray="2 2" />
              <text x={watershedX - 55} y={watershedY - 10} fontSize="11" fontWeight="700" className="fill-[hsl(38_95%_38%)]">watershed</text>
            </>
          )}

          {/* Native ejection arrow if Harlequin */}
          {showHarlequin && (
            <>
              <path d={svgPath(nativeEjectSegs.segs)} stroke="hsl(220 70% 45%)" strokeWidth="2" fill="none" strokeDasharray="4 3" />
              {particles(0.3).map((p, i) => {
                const pt = pointAt(nativeEjectSegs, p);
                return <circle key={`ne${i}`} cx={pt.x} cy={pt.y} r="2.5" fill="hsl(220 70% 45%)" opacity={0.6 + 0.4 * Math.sin(p * Math.PI)} />;
              })}
              <text x="170" y="172" fontSize="10" fontWeight="700" className="fill-[hsl(220_70%_38%)]">native (deox)</text>
            </>
          )}

          {/* ===== ECMO CIRCUIT ===== */}
          {/* Drainage cannula (venous, blue) — IVC tip → femoral vein → out to pump */}
          <path d={svgPath(drainSegs.segs)} stroke="hsl(220 75% 42%)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d={svgPath(drainSegs.segs)} stroke="hsl(220 50% 80%)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
          {/* Side-holes hint near tip */}
          {[0, 1, 2, 3].map((i) => (
            <circle key={`sh${i}`} cx={200} cy={230 + i * 12} r="1" fill="hsl(220 60% 30%)" />
          ))}
          {showLabels && <text x="295" y="448" fontSize="10" fontWeight="600" className="fill-muted-foreground">multi-stage venous drainage 23–25 Fr</text>}
          {particles(0).map((p, i) => {
            const pt = pointAt(drainSegs, 1 - p); // flow from RA → pump
            return <circle key={`d${i}`} cx={pt.x} cy={pt.y} r="2.8" fill="hsl(220 80% 55%)" opacity={0.85} />;
          })}

          {/* Centrifugal pump — labelled with inlet (axial top) and outlet (tangential side) */}
          <g transform="translate(580 380)">
            <circle r="28" fill="url(#vae-pump-grad)" stroke="hsl(215 25% 8%)" strokeWidth="1.5" />
            <circle r="22" fill="hsl(215 25% 28%)" />
            <circle r="20" fill="none" stroke="hsl(215 25% 50%)" strokeWidth="0.5" opacity="0.6" />
            {/* Volute outlet hint */}
            <path d="M 22 -2 Q 30 -8, 32 -28" stroke="hsl(215 25% 50%)" strokeWidth="1" fill="none" opacity="0.6" />
            {/* Magnetic levitation indicator */}
            <circle r="6" fill="none" stroke="hsl(195 70% 60%)" strokeWidth="0.5" opacity="0.5" strokeDasharray="1 1" />
            <g transform={`rotate(${rotorAngle})`}>
              {[0, 60, 120, 180, 240, 300].map((a) => (
                <path
                  key={a}
                  d="M 0 0 Q 7 -6, 17 -2 L 14 4 Q 5 1, 0 5 Z"
                  fill="hsl(45 90% 55%)"
                  stroke="hsl(45 90% 35%)"
                  strokeWidth="0.5"
                  transform={`rotate(${a})`}
                />
              ))}
              <circle r="3.5" fill="hsl(45 95% 70%)" />
            </g>
            {showLabels && (
              <>
                <text x="0" y="52" textAnchor="middle" fontSize="11" className="fill-foreground font-bold">Centrifugal pump</text>
                <text x="0" y="64" textAnchor="middle" fontSize="9" className="fill-muted-foreground">mag-levitated · 2–4k rpm</text>
              </>
            )}
          </g>

          {/* Pump → oxygenator tubing (still venous = blue) */}
          <path d={svgPath(pumpToOxy.segs)} stroke="hsl(220 75% 42%)" strokeWidth="3" fill="none" strokeLinecap="round" />
          {particles(0.4).map((p, i) => {
            const pt = pointAt(pumpToOxy, p);
            return <circle key={`po${i}`} cx={pt.x} cy={pt.y} r="2.6" fill="hsl(220 80% 55%)" opacity={0.8} />;
          })}

          {/* ===== MEMBRANE OXYGENATOR ===== */}
          <g>
            {/* Outer casing */}
            <rect x="615" y="110" width="60" height="135" rx="8" fill="hsl(var(--secondary))" stroke="hsl(215 25% 25%)" strokeWidth="1.5" />
            {/* Inner blood compartment with colour gradient (deox bottom → oxy top) */}
            <rect x="620" y="118" width="50" height="120" rx="4" fill="url(#vae-oxy-grad)" />
            {/* Hollow polymethylpentene fibres */}
            {Array.from({ length: 9 }).map((_, i) => (
              <line
                key={i}
                x1={622 + i * 5.5}
                y1="120"
                x2={622 + i * 5.5}
                y2="236"
                stroke="hsl(215 30% 65%)"
                strokeWidth="0.5"
                opacity="0.7"
              />
            ))}
            {/* Sweep gas inlet (top) */}
            <line x1="645" y1="95" x2="645" y2="110" stroke="hsl(195 70% 50%)" strokeWidth="2" />
            <polygon points="642,108 648,108 645,113" fill="hsl(195 70% 50%)" />
            {showLabels && <text x="645" y="86" textAnchor="middle" fontSize="9.5" className="fill-[hsl(195_70%_38%)] font-bold">sweep gas (FiO₂ 21–100%)</text>}
            {/* Sweep gas outlet (bottom) */}
            <line x1="645" y1="245" x2="645" y2="258" stroke="hsl(0 60% 50%)" strokeWidth="2" />
            <polygon points="642,255 648,255 645,260" fill="hsl(0 60% 50%)" />
            {showLabels && <text x="645" y="272" textAnchor="middle" fontSize="9.5" fontWeight="600" className="fill-muted-foreground">CO₂ + H₂O exhaust</text>}

            {/* Animated O2 bubbles down through fibres */}
            {[0, 1, 2, 3, 4].map((i) => {
              const phase = (t * 0.6 + i * 0.2) % 1;
              const y = 118 + phase * 118;
              return (
                    <circle key={`g${i}`} cx={625 + (i % 3) * 18} cy={y} r="1.4" fill="hsl(195 85% 60%)" opacity={0.7 * (1 - phase)} />
  );
            })}

            {/* Oxygenator labels */}
            {showLabels && (
              <>
                <text x="685" y="132" fontSize="10" className="fill-foreground font-bold">PMP</text>
                <text x="685" y="144" fontSize="10" className="fill-foreground font-bold">membrane</text>
                <text x="685" y="156" fontSize="10" className="fill-foreground font-bold">oxygenator</text>
                <text x="685" y="178" fontSize="9" fontWeight="600" className="fill-[hsl(0_70%_42%)]">↑ oxy out</text>
                <text x="685" y="228" fontSize="9" fontWeight="600" className="fill-[hsl(220_70%_42%)]">↓ deox in</text>
              </>
            )}
          </g>

          {/* Heat exchanger label (integral) */}
          <rect x="615" y="248" width="60" height="14" rx="3" fill="hsl(45 50% 50%)" opacity="0.3" stroke="hsl(45 50% 40%)" strokeWidth="0.75" />
          <text x="645" y="259" textAnchor="middle" fontSize="9" fontWeight="700" className="fill-foreground">Heater 36–37 °C</text>

          {/* Oxygenator outlet → arterial return */}
          <path d={svgPath(oxyToArt.segs)} stroke="hsl(0 75% 48%)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d={svgPath(oxyToArt.segs)} stroke="hsl(0 50% 80%)" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
          {showLabels && <text x="295" y="492" fontSize="10" fontWeight="600" className="fill-muted-foreground">arterial return 15–19 Fr · retrograde ↑</text>}
          {oxyParticles.map((p, i) => {
            const pt = pointAt(oxyToArt, p);
            return <circle key={`a${i}`} cx={pt.x} cy={pt.y} r="2.8" fill="hsl(0 80% 55%)" opacity={0.85} />;
          })}

          {/* Cannula entry markers at groin */}
          <g>
            {/* venous (R groin) */}
            <circle cx="215" cy="425" r="4.5" fill="hsl(220 70% 30%)" stroke="hsl(var(--background))" strokeWidth="1" />
            {showLabels && <text x="172" y="418" fontSize="9" fontWeight="700" className="fill-[hsl(220_70%_38%)]">R fem v.</text>}
            {/* arterial (L groin) */}
            <circle cx="245" cy="435" r="4.5" fill="hsl(0 70% 38%)" stroke="hsl(var(--background))" strokeWidth="1" />
            {showLabels && <text x="252" y="430" fontSize="9" fontWeight="700" className="fill-[hsl(0_70%_42%)]">L fem a.</text>}
          </g>

          {/* Distal limb perfusion catheter (small antegrade sheath off return cannula) */}
          <path d="M 245 435 Q 240 460, 235 490" stroke="hsl(0 75% 50%)" strokeWidth="2" fill="none" strokeDasharray="3 2" />
          <circle cx="235" cy="490" r="2.5" fill="hsl(0 70% 38%)" />
          {showLabels && <text x="240" y="503" fontSize="9" fontWeight="600" className="fill-muted-foreground">distal perfusion 6 Fr (anti-ischaemia)</text>}

          {/* Right radial monitoring marker (clinical relevance for Harlequin) */}
          {showHarlequin && (
            <>
              <circle cx="130" cy="105" r="5" fill="none" stroke="hsl(45 95% 50%)" strokeWidth="2.5" />
              <text x="98" y="128" fontSize="9" fontWeight="700" className="fill-[hsl(38_95%_38%)]">monitor SpO₂ R hand</text>
            </>
          )}

          {/* Compass / orientation */}
          <g transform="translate(40 40)" opacity="0.5">
            <text x="0" y="-2" fontSize="7" textAnchor="middle" className="fill-muted-foreground">cranial</text>
            <line x1="0" y1="0" x2="0" y2="20" stroke="hsl(var(--muted-foreground))" strokeWidth="0.75" />
            <polygon points="-3,3 3,3 0,-2" fill="hsl(var(--muted-foreground))" />
            <text x="0" y="32" fontSize="7" textAnchor="middle" className="fill-muted-foreground">caudal</text>
          </g>
        </svg>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setRunning((r) => !r)}
          className="px-3 py-1.5 rounded bg-icu text-white text-sm font-medium hover:bg-icu/90"
        >
          {running ? "⏸ Pause" : "▶ Play"}
        </button>
        <button
          onClick={() => setShowLabels((s) => !s)}
          className={`px-3 py-1.5 rounded text-sm font-medium border transition-colors ${
            showLabels ? "bg-secondary border-border text-foreground" : "border-border text-muted-foreground hover:bg-secondary"
          }`}
        >
          {showLabels ? "✓ " : ""}Labels
        </button>
        <button
          onClick={() => setShowHarlequin((s) => !s)}
          className={`px-3 py-1.5 rounded text-sm font-medium border transition-colors ${
            showHarlequin ? "bg-[hsl(45_95%_50%)]/15 border-[hsl(45_95%_50%)] text-foreground" : "border-border text-muted-foreground hover:bg-secondary"
          }`}
        >
          {showHarlequin ? "✓ " : ""}Harlequin (N–S) syndrome
        </button>
        <button
          onClick={() => setShowLVDistension((s) => !s)}
          className={`px-3 py-1.5 rounded text-sm font-medium border transition-colors ${
            showLVDistension ? "bg-[hsl(0_75%_45%)]/15 border-[hsl(0_75%_45%)] text-foreground" : "border-border text-muted-foreground hover:bg-secondary"
          }`}
        >
          {showLVDistension ? "✓ " : ""}LV distension
        </button>
      </div>

      {/* Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-card rounded-lg border border-border p-3 text-xs">
          <h4 className="font-semibold text-foreground mb-1.5">Circuit components</h4>
          <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
            <li><strong className="text-foreground">Drainage cannula</strong> — multi-stage 23–25 Fr in the femoral vein, tip in the RA/SVC junction. Drains by gravity + suction created by the pump.</li>
            <li><strong className="text-foreground">Centrifugal pump</strong> — magnetically-levitated impeller (Rotaflow, CentriMag); preload-sensitive, afterload-sensitive, generates ~3–6 L/min at 2000–4000 rpm. No occlusive crush of red cells.</li>
            <li><strong className="text-foreground">Membrane oxygenator</strong> — bundle of polymethylpentene hollow fibres. <em>Blood</em> flows around the fibres, <em>sweep gas</em> (FiO₂ 21–100%) flows inside. O₂ diffuses in, CO₂ diffuses out. FiO₂ controls PaO₂; sweep gas <em>flow rate</em> controls PaCO₂.</li>
            <li><strong className="text-foreground">Heater/cooler</strong> — maintains normothermia or enables targeted temperature management.</li>
            <li><strong className="text-foreground">Return cannula</strong> — 15–19 Fr in the femoral artery. Flow is <em>retrograde</em> up the descending aorta.</li>
            <li><strong className="text-foreground">Distal perfusion catheter</strong> — 6 Fr antegrade sheath into the SFA to prevent ipsilateral limb ischaemia.</li>
          </ul>
        </div>

        <div className="bg-card rounded-lg border border-border p-3 text-xs">
          <h4 className="font-semibold text-foreground mb-1.5">Two unique complications of <em>peripheral</em> VA-ECMO</h4>

          <p className="text-foreground/90 mb-1"><strong>1. Harlequin / North-South / dual-circulation syndrome</strong> (toggle on diagram)</p>
          <p className="text-muted-foreground mb-2">
            ECMO oxygenated blood travels <em>retrograde</em> from the femoral artery up the descending aorta. If the native heart recovers and ejects, but the lungs are still failing, native LV ejects <em>deoxygenated</em> blood into the aortic root. The two flows meet at a <strong>watershed</strong> in the aortic arch. The upper body (right arm, brain, coronary arteries) is perfused by the patient's own poorly-oxygenated blood, while the lower body receives well-oxygenated ECMO blood. Result: cyanosed face/right arm with pink legs.
          </p>
          <ul className="list-disc pl-4 space-y-0.5 text-muted-foreground mb-2">
            <li><strong>Monitor</strong> SpO₂ on the <em>right hand</em> and ABG from the <em>right radial</em> artery.</li>
            <li><strong>Manage</strong>: ↑ventilator FiO₂/PEEP to oxygenate native flow, switch to <strong>VAV-ECMO</strong> (add an internal jugular return), or convert to central cannulation.</li>
          </ul>

          <p className="text-foreground/90 mb-1"><strong>2. LV distension and pulmonary oedema</strong> (toggle on diagram)</p>
          <p className="text-muted-foreground">
            Retrograde aortic flow ↑↑ LV afterload. A failing LV cannot generate enough pressure to open the aortic valve → blood stagnates in the LV, LVEDP rises, pulmonary venous pressure rises → pulmonary oedema and intracardiac thrombus. Adjuncts: <strong>LV venting</strong> with an <em>Impella</em> ("ECMELLA"), an <em>IABP</em>, surgical apical vent, or a percutaneous transseptal LA cannula. Echo target: LV ejects every 1–2 beats and the AV opens.
          </p>
        </div>
      </div>

      <div className="bg-secondary/30 rounded-lg p-3 border border-border text-xs text-muted-foreground">
        <p>
          <strong className="text-foreground">Indications:</strong> refractory cardiogenic shock (post-MI, fulminant myocarditis, post-cardiotomy), refractory cardiac arrest (eCPR), bridge to recovery / decision / transplant / LVAD, refractory pulmonary embolism with RV failure.
        </p>
        <p className="mt-1">
          <strong className="text-foreground">Contraindications:</strong> unrecoverable cardiac/non-cardiac disease, severe AR (worsens LV distension), aortic dissection, prolonged conventional CPR with neurologic injury, contraindication to anticoagulation.
        </p>
      </div>
    </div>
  );
};

export default VAECMOCircuitDiagram;
