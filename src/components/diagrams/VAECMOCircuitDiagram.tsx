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
  const t = useFrame(running);

  const W = 620, H = 420;

  // Femoral venous drainage path: RA/IVC → tube down → up to pump
  const drainSegs = pathPoints([
    { x: 280, y: 230 },   // RA
    { x: 280, y: 320 },   // IVC down
    { x: 350, y: 360 },   // exit body
    { x: 460, y: 360 },   // along to pump area
    { x: 480, y: 320 },   // up to pump
  ]);
  // Pump to oxygenator
  const pumpToOxy = pathPoints([
    { x: 510, y: 280 },
    { x: 560, y: 280 },
    { x: 560, y: 200 },
  ]);
  // Oxygenator outlet to arterial return: oxy top → down loop → into femoral artery
  const oxyToArt = pathPoints([
    { x: 540, y: 100 },
    { x: 540, y: 80 },
    { x: 420, y: 80 },
    { x: 380, y: 360 },   // arterial cannula entry (femoral)
    { x: 320, y: 360 },
    { x: 290, y: 320 },
    { x: 280, y: 200 },   // up the aorta retrograde
    { x: 240, y: 130 },   // into descending → arch
  ]);

  // Native LV ejection path (when heart still pumping): LV → aortic root → arch → forward
  const nativeEjectSegs = pathPoints([
    { x: 200, y: 200 },   // LV
    { x: 220, y: 160 },   // aortic root
    { x: 240, y: 130 },   // arch (meeting point — "watershed")
  ]);

  // Particle counts
  const N = 8;
  const particles = (offset: number) => Array.from({ length: N }, (_, i) => ((t * 0.35 + i / N + offset) % 1));
  const oxyParticles = particles(0);

  // Watershed location depends on native CO vs ECMO flow. Toggle for demonstration.
  // When showHarlequin on: native ejection is preserved (e.g. lung failure but recovering heart) → upper body gets deoxygenated native blood.
  const watershedX = showHarlequin ? 250 : 240;
  const watershedY = showHarlequin ? 110 : 130;

  // Pump rotor angle
  const rotorAngle = (t * 360 * 1.5) % 360;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-3 my-6">
      <div className="text-center">
        <h3 className="text-lg font-serif font-bold text-foreground">
          Peripheral VA-ECMO Circuit
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Femoro-femoral configuration with centrifugal pump and membrane oxygenator
        </p>
      </div>

      <div className="bg-card rounded-lg border border-border p-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
          {/* Patient outline */}
          <rect x="60" y="40" width="220" height="340" rx="40" fill="hsl(var(--clinical))" opacity="0.05" stroke="hsl(var(--clinical))" strokeWidth="1" strokeDasharray="3 3" />
          <text x="170" y="35" textAnchor="middle" fontSize="10" className="fill-muted-foreground">Patient</text>

          {/* Heart */}
          <g>
            {/* RA (right atrium) */}
            <ellipse cx="200" cy="200" rx="22" ry="28" fill="hsl(220 70% 55%)" opacity="0.25" stroke="hsl(220 70% 45%)" strokeWidth="1.2" />
            <text x="200" y="204" textAnchor="middle" fontSize="9" className="fill-foreground font-semibold">RA</text>
            {/* RV */}
            <ellipse cx="170" cy="240" rx="20" ry="26" fill="hsl(220 70% 55%)" opacity="0.2" stroke="hsl(220 70% 45%)" strokeWidth="1.2" />
            <text x="170" y="244" textAnchor="middle" fontSize="9" className="fill-foreground font-semibold">RV</text>
            {/* LA */}
            <ellipse cx="240" cy="195" rx="18" ry="22" fill="hsl(0 70% 55%)" opacity="0.2" stroke="hsl(0 70% 45%)" strokeWidth="1.2" />
            <text x="240" y="199" textAnchor="middle" fontSize="9" className="fill-foreground font-semibold">LA</text>
            {/* LV — distended overlay if toggle on */}
            <ellipse
              cx="225"
              cy="240"
              rx={showLVDistension ? 32 : 22}
              ry={showLVDistension ? 38 : 28}
              fill="hsl(0 70% 55%)"
              opacity={showLVDistension ? 0.35 : 0.22}
              stroke={showLVDistension ? "hsl(0 75% 45%)" : "hsl(0 70% 45%)"}
              strokeWidth={showLVDistension ? 2 : 1.2}
            />
            <text x="225" y="244" textAnchor="middle" fontSize="9" className="fill-foreground font-semibold">LV</text>
            {showLVDistension && (
              <text x="225" y="290" textAnchor="middle" fontSize="9" className="fill-[hsl(0_75%_45%)] font-semibold">DISTENDED</text>
            )}
          </g>

          {/* Aorta — colour split based on watershed */}
          {/* Lower descending aorta (oxygenated by ECMO) — red */}
          <path d="M 280 320 L 280 200 L 240 130" stroke="hsl(0 70% 50%)" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.85" />
          {/* Aortic arch upper portion — depends on Harlequin */}
          <path
            d={`M 240 130 L ${watershedX} ${watershedY} L 195 70`}
            stroke={showHarlequin ? "hsl(220 70% 45%)" : "hsl(0 70% 50%)"}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            opacity="0.85"
          />
          {/* Arch branches (head/right arm) */}
          <path d="M 195 70 L 150 50" stroke={showHarlequin ? "hsl(220 70% 45%)" : "hsl(0 70% 50%)"} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.85" />
          <path d="M 195 70 L 240 55" stroke={showHarlequin ? "hsl(220 70% 45%)" : "hsl(0 70% 50%)"} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.85" />
          {/* Watershed marker */}
          {showHarlequin && (
            <>
              <circle cx={watershedX} cy={watershedY} r="6" fill="none" stroke="hsl(45 95% 50%)" strokeWidth="2" strokeDasharray="2 2" />
              <text x={watershedX + 10} y={watershedY - 5} fontSize="9" className="fill-[hsl(45_95%_45%)] font-semibold">watershed</text>
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
              <text x="170" y="170" fontSize="9" className="fill-[hsl(220_70%_45%)]">native (deox)</text>
            </>
          )}

          {/* Lungs (failed in classic VA-ECMO indication of cardiogenic shock — but if also failing → Harlequin risk) */}
          <ellipse cx="135" cy="170" rx="18" ry="38" fill="hsl(var(--icu))" opacity="0.12" stroke="hsl(var(--icu))" strokeWidth="1" />
          <ellipse cx="270" cy="155" rx="14" ry="30" fill="hsl(var(--icu))" opacity="0.12" stroke="hsl(var(--icu))" strokeWidth="1" />
          <text x="135" y="135" textAnchor="middle" fontSize="9" className="fill-muted-foreground">Lungs</text>

          {/* === ECMO CIRCUIT === */}
          {/* Drainage cannula (venous, blue) — femoral vein → IVC → RA */}
          <path d={svgPath(drainSegs.segs)} stroke="hsl(220 70% 45%)" strokeWidth="5" fill="none" strokeLinecap="round" />
          <text x="350" y="380" fontSize="9" className="fill-muted-foreground">venous drainage (femoral vein → IVC tip in RA)</text>
          {particles(0).map((p, i) => {
            const pt = pointAt(drainSegs, 1 - p); // flow from RA → pump
            return <circle key={`d${i}`} cx={pt.x} cy={pt.y} r="3" fill="hsl(220 75% 50%)" opacity={0.7} />;
          })}

          {/* Centrifugal pump */}
          <g transform="translate(495 280)">
            <circle r="22" fill="hsl(215 25% 22%)" stroke="hsl(215 25% 12%)" strokeWidth="1.5" />
            <circle r="17" fill="hsl(215 25% 30%)" />
            <g transform={`rotate(${rotorAngle})`}>
              {[0, 60, 120, 180, 240, 300].map((a) => (
                <path
                  key={a}
                  d="M 0 0 Q 6 -5, 14 -2 L 12 3 Q 5 1, 0 4 Z"
                  fill="hsl(45 90% 55%)"
                  stroke="hsl(45 90% 40%)"
                  strokeWidth="0.5"
                  transform={`rotate(${a})`}
                />
              ))}
              <circle r="3" fill="hsl(45 90% 65%)" />
            </g>
            <text x="0" y="42" textAnchor="middle" fontSize="10" className="fill-foreground font-semibold">Centrifugal pump</text>
            <text x="0" y="54" textAnchor="middle" fontSize="8" className="fill-muted-foreground">(magnetically levitated)</text>
          </g>

          {/* Pump to oxygenator tubing (still venous = blue) */}
          <path d={svgPath(pumpToOxy.segs)} stroke="hsl(220 70% 45%)" strokeWidth="5" fill="none" strokeLinecap="round" />
          {particles(0.4).map((p, i) => {
            const pt = pointAt(pumpToOxy, p);
            return <circle key={`po${i}`} cx={pt.x} cy={pt.y} r="2.8" fill="hsl(220 75% 50%)" opacity={0.7} />;
          })}

          {/* Membrane oxygenator (rectangle with internal hollow fibres) */}
          <g>
            <rect x="510" y="100" width="60" height="100" rx="6" fill="hsl(var(--secondary))" stroke="hsl(215 25% 25%)" strokeWidth="1.5" />
            {/* Hollow fibres (vertical lines) */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <line
                key={i}
                x1={518 + i * 6.5}
                y1="108"
                x2={518 + i * 6.5}
                y2="192"
                stroke="hsl(215 25% 55%)"
                strokeWidth="0.8"
              />
            ))}
            {/* Sweep gas inlet (top) */}
            <line x1="540" y1="90" x2="540" y2="100" stroke="hsl(195 70% 50%)" strokeWidth="2" />
            <text x="540" y="83" textAnchor="middle" fontSize="8" className="fill-[hsl(195_70%_45%)]">O₂ in (sweep)</text>
            {/* Sweep gas outlet (bottom) */}
            <line x1="540" y1="200" x2="540" y2="210" stroke="hsl(0 60% 50%)" strokeWidth="2" />
            <text x="540" y="220" textAnchor="middle" fontSize="8" className="fill-muted-foreground">CO₂ out</text>

            {/* Animated gas exchange — small bubbles inside */}
            {[0, 1, 2, 3].map((i) => {
              const phase = (t * 0.5 + i * 0.25) % 1;
              const y = 100 + phase * 100;
              return (
                <circle key={`g${i}`} cx={520 + (i % 2) * 30} cy={y} r="1.5" fill="hsl(195 80% 60%)" opacity={0.6 * (1 - phase)} />
              );
            })}

            {/* Blood entering blue, exiting red (colour transition through height) */}
            <text x="595" y="155" fontSize="9" className="fill-foreground font-semibold">Membrane</text>
            <text x="595" y="167" fontSize="9" className="fill-foreground font-semibold">oxygenator</text>
          </g>

          {/* Heat exchanger label */}
          <rect x="510" y="205" width="60" height="14" rx="3" fill="hsl(45 50% 50%)" opacity="0.3" stroke="hsl(45 50% 40%)" strokeWidth="0.8" />
          <text x="540" y="215" textAnchor="middle" fontSize="8" className="fill-foreground">Heater 36–37 °C</text>

          {/* Oxygenator outlet → arterial return */}
          <path d={svgPath(oxyToArt.segs)} stroke="hsl(0 70% 50%)" strokeWidth="5" fill="none" strokeLinecap="round" />
          <text x="350" y="395" fontSize="9" className="fill-muted-foreground">arterial return (femoral artery, retrograde)</text>
          {oxyParticles.map((p, i) => {
            const pt = pointAt(oxyToArt, p);
            return <circle key={`a${i}`} cx={pt.x} cy={pt.y} r="3" fill="hsl(0 75% 50%)" opacity={0.8} />;
          })}

          {/* Cannula labels */}
          <g>
            <circle cx="350" cy="360" r="4" fill="hsl(220 70% 35%)" stroke="white" strokeWidth="1" />
            <circle cx="380" cy="360" r="4" fill="hsl(0 70% 40%)" stroke="white" strokeWidth="1" />
            <text x="365" y="345" textAnchor="middle" fontSize="8" className="fill-muted-foreground">Femoral cannulae</text>
          </g>

          {/* Distal limb perfusion catheter (preventing leg ischaemia) */}
          <path d="M 380 360 Q 400 380, 420 380" stroke="hsl(0 70% 50%)" strokeWidth="2" fill="none" strokeDasharray="2 2" />
          <text x="425" y="385" fontSize="8" className="fill-muted-foreground">distal limb perfusion</text>
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
