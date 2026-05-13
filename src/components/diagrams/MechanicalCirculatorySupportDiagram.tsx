import { useEffect, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type Device = "iabp" | "impella" | "lvad";

const useAnimationFrame = (running: boolean) => {
  const [t, setT] = useState(0);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    if (!running) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setT((prev) => prev + dt);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [running]);
  return t;
};

// ---------- Shared anatomical heart + aortic arch (used by all three diagrams) ----------
// Drawn at a fixed origin; callers can translate. Returns key landmark coordinates.
const HeartAndAorta = ({
  systoleFrac, // 0 = full diastole (relaxed), 1 = full systole (contracted)
  showLVChamber = true,
  avOpen = false,
}: {
  systoleFrac: number;
  showLVChamber?: boolean;
  avOpen?: boolean;
}) => {
  // LV size shrinks in systole
  const lvScale = 1 - 0.18 * systoleFrac;
  return (
    <g>
      {/* Heart silhouette — anatomically rounded, apex pointing inferolaterally */}
      <path
        d="M 175 95
           C 145 95, 120 120, 118 165
           C 116 200, 130 235, 165 265
           L 215 305
           L 260 270
           C 295 240, 305 205, 300 170
           C 295 130, 270 100, 240 100
           C 220 100, 210 115, 200 130
           C 188 113, 178 95, 175 95 Z"
        fill="hsl(0 60% 88%)"
        opacity="0.55"
        stroke="hsl(0 50% 40%)"
        strokeWidth="1"
      />
      {/* RA */}
      <path d="M 175 110 C 155 115, 140 135, 145 165 C 148 185, 165 195, 185 192 L 195 165 L 195 130 Z"
        fill="hsl(220 70% 70%)" opacity="0.45" stroke="hsl(220 60% 35%)" strokeWidth="1" />
      <text x="167" y="155" fontSize="9" className="fill-foreground" fontWeight="600">RA</text>
      {/* LA */}
      <path d="M 245 115 C 270 120, 285 140, 280 170 C 275 188, 258 195, 240 192 L 230 165 L 230 130 Z"
        fill="hsl(0 65% 70%)" opacity="0.45" stroke="hsl(0 55% 35%)" strokeWidth="1" />
      <text x="258" y="155" fontSize="9" className="fill-foreground" fontWeight="600">LA</text>
      {/* AV valves (mitral + tricuspid) */}
      <line x1="155" y1="195" x2="200" y2="195" stroke="hsl(215 30% 30%)" strokeWidth="1" />
      <line x1="225" y1="195" x2="270" y2="195" stroke="hsl(215 30% 30%)" strokeWidth="1" />
      {/* RV */}
      <path d="M 145 200 C 135 230, 145 265, 175 280 L 200 250 L 200 200 Z"
        fill="hsl(220 70% 60%)" opacity="0.35" stroke="hsl(220 60% 35%)" strokeWidth="1" />
      <text x="160" y="240" fontSize="9" className="fill-foreground" fontWeight="600">RV</text>
      {/* LV cavity — shrinks in systole */}
      {showLVChamber && (
        <g transform={`translate(225 245) scale(${lvScale}) translate(-225 -245)`}>
          <ellipse cx="225" cy="245" rx="32" ry="48" fill="hsl(0 70% 50%)" opacity="0.18"
            stroke="hsl(0 65% 35%)" strokeWidth="1" />
          <ellipse cx="225" cy="245" rx="38" ry="55" fill="none"
            stroke="hsl(0 50% 35%)" strokeWidth="1.5" opacity="0.7" />
        </g>
      )}
      <text x="225" y="248" textAnchor="middle" fontSize="10" className="fill-foreground" fontWeight="700">LV</text>
      {/* Interventricular septum */}
      <path d="M 200 200 C 205 230, 208 260, 213 290" stroke="hsl(215 30% 25%)" strokeWidth="1" fill="none" opacity="0.5" />

      {/* Aortic root + valve cusps */}
      <ellipse cx="218" cy="125" rx="14" ry="10" fill="hsl(0 60% 80%)" opacity="0.55"
        stroke="hsl(0 55% 35%)" strokeWidth="1" />
      {/* Three cusps schematic */}
      {avOpen ? (
        <>
          <line x1="207" y1="125" x2="212" y2="118" stroke="hsl(0 60% 30%)" strokeWidth="1" />
          <line x1="218" y1="115" x2="218" y2="120" stroke="hsl(0 60% 30%)" strokeWidth="1" />
          <line x1="229" y1="125" x2="224" y2="118" stroke="hsl(0 60% 30%)" strokeWidth="1" />
        </>
      ) : (
        <>
          <line x1="207" y1="125" x2="218" y2="125" stroke="hsl(0 60% 30%)" strokeWidth="1.5" />
          <line x1="218" y1="125" x2="229" y2="125" stroke="hsl(0 60% 30%)" strokeWidth="1.5" />
          <line x1="218" y1="118" x2="218" y2="132" stroke="hsl(0 60% 30%)" strokeWidth="1.5" />
        </>
      )}
      <text x="244" y="123" fontSize="8" className="fill-muted-foreground">AV</text>

      {/* Ascending aorta + arch + descending */}
      <path
        d="M 218 115 L 218 75
           C 218 50, 290 35, 340 60
           C 380 80, 380 110, 380 140
           L 380 360"
        stroke="hsl(0 65% 50%)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.18"
      />
      <path
        d="M 218 115 L 218 75
           C 218 50, 290 35, 340 60
           C 380 80, 380 110, 380 140
           L 380 360"
        stroke="hsl(0 65% 40%)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Brachiocephalic / L common carotid / L subclavian branches */}
      <path d="M 245 50 L 250 25" stroke="hsl(0 65% 40%)" strokeWidth="3" fill="none" />
      <text x="244" y="20" fontSize="7" textAnchor="middle" className="fill-muted-foreground">brachioceph</text>
      <path d="M 290 35 L 295 12" stroke="hsl(0 65% 40%)" strokeWidth="2" fill="none" />
      <text x="295" y="9" fontSize="7" textAnchor="middle" className="fill-muted-foreground">L CCA</text>
      <path d="M 325 40 L 340 20" stroke="hsl(0 65% 40%)" strokeWidth="2" fill="none" />
      <text x="350" y="18" fontSize="7" className="fill-muted-foreground">L SCA</text>
      <text x="385" y="200" fontSize="9" className="fill-muted-foreground">Aorta</text>

      {/* Coronary arteries — LMCA → LAD + LCx, RCA */}
      <path d="M 215 130 Q 200 145, 195 175" stroke="hsl(15 85% 45%)" strokeWidth="2" fill="none" />
      <text x="172" y="178" fontSize="7" className="fill-[hsl(15_85%_40%)]" fontWeight="600">LAD</text>
      <path d="M 222 130 Q 245 145, 260 175" stroke="hsl(15 85% 45%)" strokeWidth="2" fill="none" />
      <text x="262" y="178" fontSize="7" className="fill-[hsl(15_85%_40%)]" fontWeight="600">RCA</text>
      <path d="M 218 132 Q 230 155, 250 195" stroke="hsl(15 85% 45%)" strokeWidth="2" fill="none" opacity="0.85" />
      <text x="252" y="208" fontSize="7" className="fill-[hsl(15_85%_40%)]" fontWeight="600">LCx</text>
    </g>
  );
};

// ---------- IABP ----------
const IABPDiagram = ({ running }: { running: boolean }) => {
  const t = useAnimationFrame(running);
  const cycle = 1.0;
  const phase = (t % cycle) / cycle;
  const inSystole = phase < 0.4;
  const systoleFrac = inSystole ? Math.sin((phase / 0.4) * Math.PI) : 0;
  let balloonV = 0;
  if (phase >= 0.4 && phase < 0.95) {
    const p = (phase - 0.4) / 0.55;
    balloonV = Math.sin(p * Math.PI) ** 0.5;
  }

  const w = 700, h = 460;
  const traceX = (ph: number) => 60 + ph * 480;
  const buildAortic = () => {
    let d = "";
    for (let i = 0; i <= 200; i++) {
      const ph = i / 200;
      let p = 70;
      if (ph < 0.4) {
        p = 70 + 50 * Math.sin((ph / 0.4) * Math.PI);
      } else {
        const dec = (ph - 0.4) / 0.6;
        p = 70 - 15 * dec;
        if (ph >= 0.4 && ph < 0.95) {
          const bp = (ph - 0.4) / 0.55;
          p += 45 * Math.sin(bp * Math.PI);
        }
        if (ph > 0.93 && ph < 1.0) {
          p -= 18 * Math.sin(((ph - 0.93) / 0.07) * Math.PI);
        }
      }
      const x = traceX(ph);
      const y = 420 - (p - 30) * 1.6;
      d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)} `;
    }
    return d;
  };

  // Coronary perfusion particles during diastolic augmentation
  const coronaryParticles = Array.from({ length: 6 }, (_, i) => ((t * 0.7 + i / 6) % 1));

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full bg-card rounded">
      <defs>
        <marker id="iabp-arrow-r" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="hsl(15 85% 45%)" />
        </marker>
        <marker id="iabp-arrow-up" markerWidth="6" markerHeight="6" refX="3" refY="0" orient="auto">
          <polygon points="0 6, 3 0, 6 6" fill="hsl(220 80% 50%)" />
        </marker>
      </defs>

      {/* Body cavity outline */}
      <rect x="40" y="20" width="380" height="320" rx="30" fill="hsl(var(--clinical))" opacity="0.04"
        stroke="hsl(var(--clinical))" strokeDasharray="3 3" strokeWidth="0.75" />

      {/* Heart + aorta */}
      <HeartAndAorta systoleFrac={systoleFrac} avOpen={inSystole && systoleFrac > 0.2} />

      {/* IABP catheter — entering at femoral, ascending up descending aorta to position 1–2 cm distal to L SCA */}
      <line x1="380" y1="350" x2="380" y2="160" stroke="hsl(215 25% 25%)" strokeWidth="2" strokeLinecap="round" />
      <text x="395" y="350" fontSize="8" className="fill-muted-foreground">8 Fr catheter</text>
      <text x="395" y="360" fontSize="8" className="fill-muted-foreground">via fem. artery</text>

      {/* Helium drive line */}
      <line x1="380" y1="350" x2="50" y2="430" stroke="hsl(45 80% 50%)" strokeWidth="1" strokeDasharray="3 2" />
      <text x="55" y="445" fontSize="8" className="fill-[hsl(45_80%_45%)]">→ He shuttle pump (console)</text>

      {/* Balloon — sausage-shaped, in descending aorta just distal to L subclavian */}
      <ellipse
        cx="380"
        cy="200"
        rx={4 + balloonV * 7}
        ry={6 + balloonV * 32}
        fill="hsl(220 80% 55%)"
        opacity={0.35 + 0.5 * balloonV}
        stroke="hsl(220 80% 35%)"
        strokeWidth="1.5"
      />
      {/* Balloon position marker (radio-opaque tip) */}
      <circle cx="380" cy="160" r="3" fill="hsl(45 90% 50%)" stroke="hsl(45 80% 30%)" strokeWidth="0.5" />
      <text x="395" y="163" fontSize="8" className="fill-muted-foreground">tip — distal to L SCA</text>

      {/* Status badge */}
      <g transform="translate(440 75)">
        <rect width="220" height="80" rx="6" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
        <text x="110" y="20" textAnchor="middle" fontSize="11" className="fill-foreground" fontWeight="700">
          {inSystole ? "SYSTOLE" : "DIASTOLE"}
        </text>
        <text x="110" y="38" textAnchor="middle" fontSize="10" className="fill-muted-foreground">
          {balloonV > 0.05 ? "Balloon INFLATED (40 mL He)" : "Balloon DEFLATED"}
        </text>
        <text x="110" y="55" textAnchor="middle" fontSize="9" className="fill-muted-foreground">
          {inSystole ? "deflation → afterload reduction" : "inflation → diastolic augmentation"}
        </text>
        <text x="110" y="70" textAnchor="middle" fontSize="9" className="fill-muted-foreground">
          Trigger: ECG R-wave or arterial wave
        </text>
      </g>

      {/* Coronary perfusion arrows during diastolic augmentation */}
      {balloonV > 0.25 && (
        <g opacity={balloonV}>
          {coronaryParticles.map((p, i) => {
            const x = 215 - p * 25;
            const y = 130 + p * 50;
            return <circle key={`cp${i}`} cx={x} cy={y} r="2.5" fill="hsl(15 85% 45%)" opacity={0.8} />;
          })}
          <path d="M 280 75 Q 250 90, 218 115" stroke="hsl(15 85% 45%)" strokeWidth="1.5"
            fill="none" markerEnd="url(#iabp-arrow-r)" opacity="0.85" />
          <text x="290" y="73" fontSize="9" className="fill-[hsl(15_85%_40%)]" fontWeight="600">↑ retrograde aortic flow</text>
          <text x="290" y="85" fontSize="9" className="fill-[hsl(15_85%_40%)]" fontWeight="600">→ ↑ coronary perfusion</text>
        </g>
      )}

      {/* Aortic pressure trace */}
      <g>
        <rect x="50" y="345" width="600" height="105" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="0.5" rx="3" />
        <line x1="60" y1="355" x2="60" y2="430" stroke="hsl(215 25% 40%)" strokeWidth="1" />
        <line x1="60" y1="430" x2="540" y2="430" stroke="hsl(215 25% 40%)" strokeWidth="1" />
        <text x="55" y="362" textAnchor="end" fontSize="8" className="fill-muted-foreground">120</text>
        <text x="55" y="395" textAnchor="end" fontSize="8" className="fill-muted-foreground">75</text>
        <text x="55" y="430" textAnchor="end" fontSize="8" className="fill-muted-foreground">30</text>
        <text x="300" y="447" textAnchor="middle" fontSize="9" className="fill-foreground" fontWeight="600">
          Aortic pressure (mmHg) — augmented (1:1 IABP timing)
        </text>
        <path d={buildAortic()} stroke="hsl(0 70% 50%)" strokeWidth="2" fill="none" />
        <line x1={traceX(phase)} y1="355" x2={traceX(phase)} y2="430" stroke="hsl(215 25% 30%)" strokeWidth="1" strokeDasharray="3 3" />
        <text x={traceX(0.15)} y="352" textAnchor="middle" fontSize="8" className="fill-muted-foreground">native systolic peak</text>
        <text x={traceX(0.65)} y="352" textAnchor="middle" fontSize="8" className="fill-[hsl(220_80%_50%)]" fontWeight="600">diastolic augmentation</text>
        <text x={traceX(0.96)} y="445" textAnchor="middle" fontSize="8" className="fill-[hsl(220_80%_50%)]">↓ AoEDP</text>
      </g>

      <text x="50" y="15" fontSize="11" className="fill-foreground" fontWeight="700">Intra-Aortic Balloon Pump (IABP)</text>
    </svg>
  );
};

// ---------- Impella ----------
const ImpellaDiagram = ({ running }: { running: boolean }) => {
  const t = useAnimationFrame(running);
  const cycle = 1.0;
  const phase = (t % cycle) / cycle;
  const systoleFrac = phase < 0.4 ? Math.sin((phase / 0.4) * Math.PI) : 0;
  const rotorAngle = (t * 360 * 6) % 360;

  // Particles flowing along catheter from inlet (in LV) to outlet (in ascending aorta)
  // Catheter trajectory: through MV plane is wrong — Impella crosses AV. Inlet in LV cavity, outlet in ascending Ao.
  const particles = Array.from({ length: 10 }, (_, i) => ((t * 0.7 + i / 10) % 1));
  const aorticParticles = Array.from({ length: 6 }, (_, i) => ((t * 0.5 + i / 6) % 1));

  const w = 700, h = 420;

  // Inlet/outlet anatomical coordinates (matching HeartAndAorta layout)
  const inlet = { x: 218, y: 250 }; // mid-LV cavity
  const outlet = { x: 220, y: 95 }; // ascending aorta, ~3cm above AV

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full bg-card rounded">
      {/* Body cavity */}
      <rect x="40" y="20" width="380" height="380" rx="30" fill="hsl(var(--clinical))" opacity="0.04"
        stroke="hsl(var(--clinical))" strokeDasharray="3 3" strokeWidth="0.75" />

      <HeartAndAorta systoleFrac={systoleFrac} avOpen={false} />

      {/* Impella catheter — enters via femoral artery, retrograde up descending aorta, around arch, into LV across AV */}
      <path
        d="M 380 350
           L 380 140
           C 380 110, 380 80, 340 60
           C 300 45, 250 50, 235 75
           L 220 110
           L 218 250"
        stroke="hsl(215 25% 22%)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />

      {/* Inlet (pigtail loop in LV) */}
      <circle cx={inlet.x} cy={inlet.y + 12} r="5" fill="none" stroke="hsl(215 25% 22%)" strokeWidth="1.5" />
      <circle cx={inlet.x} cy={inlet.y} r="6" fill="hsl(220 70% 50%)" opacity="0.8" />
      <text x={inlet.x - 25} y={inlet.y + 28} fontSize="8" className="fill-foreground" fontWeight="600">Inlet (LV)</text>

      {/* Pump housing — sits across AV */}
      <g transform="translate(218 130) rotate(2)">
        <rect x="-9" y="-22" width="18" height="44" rx="3" fill="hsl(215 25% 35%)" stroke="hsl(215 25% 15%)" strokeWidth="0.75" />
        {/* Outlet ports (side holes) */}
        <circle cx="-9" cy="-12" r="1.4" fill="hsl(0 75% 55%)" />
        <circle cx="9" cy="-12" r="1.4" fill="hsl(0 75% 55%)" />
        <circle cx="-9" cy="-6" r="1.4" fill="hsl(0 75% 55%)" />
        <circle cx="9" cy="-6" r="1.4" fill="hsl(0 75% 55%)" />
        {/* Spinning rotor inside */}
        <g transform={`rotate(${rotorAngle})`}>
          <path d="M -6 -16 Q 0 -8, 6 -16 L 6 16 Q 0 8, -6 16 Z" fill="hsl(45 90% 60%)" stroke="hsl(45 80% 35%)" strokeWidth="0.5" />
        </g>
        {/* Motor housing */}
        <rect x="-7" y="22" width="14" height="6" fill="hsl(215 30% 18%)" />
      </g>
      <text x="245" y="125" fontSize="8" className="fill-foreground" fontWeight="600">Microaxial pump</text>
      <text x="245" y="135" fontSize="8" className="fill-muted-foreground">~50 000 rpm</text>
      <text x="245" y="145" fontSize="8" className="fill-muted-foreground">across AV</text>

      {/* Outlet labelled */}
      <circle cx={outlet.x} cy={outlet.y} r="4" fill="hsl(0 75% 50%)" />
      <text x={outlet.x + 7} y={outlet.y - 4} fontSize="8" className="fill-foreground" fontWeight="600">Outlet</text>
      <text x={outlet.x + 7} y={outlet.y + 6} fontSize="8" className="fill-muted-foreground">(asc. aorta)</text>

      {/* Continuous flow particles inside catheter from inlet → outlet */}
      {particles.map((p, i) => {
        // Approximate path: (218,250) → (218,150) → (220,95)
        const segs = [
          { x: 218, y: 250 },
          { x: 218, y: 150 },
          { x: 220, y: 95 },
        ];
        const total = segs.length - 1;
        const f = p * total;
        const idx = Math.min(Math.floor(f), total - 1);
        const local = f - idx;
        const x = segs[idx].x + (segs[idx + 1].x - segs[idx].x) * local;
        const y = segs[idx].y + (segs[idx + 1].y - segs[idx].y) * local;
        return <circle key={`f${i}`} cx={x} cy={y} r="2.5" fill="hsl(0 75% 55%)" opacity={0.6 + 0.3 * Math.sin(p * Math.PI)} />;
      })}

      {/* Particles dispersing into ascending aorta + arch */}
      {aorticParticles.map((p, i) => {
        const segs = [
          { x: 220, y: 90 },
          { x: 250, y: 55 },
          { x: 320, y: 45 },
          { x: 370, y: 75 },
          { x: 380, y: 140 },
          { x: 380, y: 250 },
        ];
        const total = segs.length - 1;
        const f = p * total;
        const idx = Math.min(Math.floor(f), total - 1);
        const local = f - idx;
        const x = segs[idx].x + (segs[idx + 1].x - segs[idx].x) * local;
        const y = segs[idx].y + (segs[idx + 1].y - segs[idx].y) * local;
        return <circle key={`ao${i}`} cx={x} cy={y} r="2.5" fill="hsl(0 75% 50%)" opacity={0.7 * (1 - p * 0.5)} />;
      })}

      {/* Purge fluid line (dextrose + heparin) */}
      <path d="M 380 350 L 600 350" stroke="hsl(195 70% 50%)" strokeWidth="1" strokeDasharray="3 2" />
      <text x="430" y="343" fontSize="8" className="fill-[hsl(195_70%_45%)]">purge: 5–30% dextrose + heparin</text>

      {/* Drive console */}
      <g transform="translate(440 60)">
        <rect width="220" height="200" rx="6" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
        <text x="110" y="20" textAnchor="middle" fontSize="11" className="fill-foreground" fontWeight="700">Impella controller</text>
        <text x="20" y="48" fontSize="9" className="fill-muted-foreground">P-level</text>
        <text x="200" y="48" textAnchor="end" fontSize="11" className="fill-foreground" fontWeight="700">P-8</text>
        <text x="20" y="72" fontSize="9" className="fill-muted-foreground">Flow</text>
        <text x="200" y="72" textAnchor="end" fontSize="11" className="fill-foreground" fontWeight="700">3.8 L/min</text>
        <text x="20" y="96" fontSize="9" className="fill-muted-foreground">Motor current</text>
        <text x="200" y="96" textAnchor="end" fontSize="11" className="fill-foreground" fontWeight="700">650 mA</text>
        <text x="20" y="120" fontSize="9" className="fill-muted-foreground">Position</text>
        <text x="200" y="120" textAnchor="end" fontSize="10" className="fill-[hsl(140_60%_40%)]" fontWeight="700">✓ aortic</text>
        <text x="20" y="144" fontSize="9" className="fill-muted-foreground">Suction alarm</text>
        <text x="200" y="144" textAnchor="end" fontSize="10" className="fill-[hsl(140_60%_40%)]" fontWeight="700">none</text>
        <text x="110" y="178" textAnchor="middle" fontSize="9" className="fill-muted-foreground">Continuous, non-pulsatile output</text>
        <text x="110" y="190" textAnchor="middle" fontSize="9" className="fill-muted-foreground">Independent of native ejection</text>
      </g>

      <text x="50" y="15" fontSize="11" className="fill-foreground" fontWeight="700">Impella — microaxial LV→aortic pump</text>
    </svg>
  );
};

// ---------- LVAD ----------
const LVADDiagram = ({ running }: { running: boolean }) => {
  const t = useAnimationFrame(running);
  const rotorAngle = (t * 360 * 3) % 360;
  const particles = Array.from({ length: 14 }, (_, i) => ((t * 0.4 + i / 14) % 1));
  const w = 700, h = 460;

  // Anatomical coordinates: heart at left, pump in pre-peritoneal pocket below diaphragm
  // Inflow cannula: LV apex → pump
  // Outflow graft: pump → ascending aorta

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full bg-card rounded">
      {/* Body outline (torso) */}
      <path
        d="M 50 30 Q 240 20, 430 30 L 430 380 Q 240 400, 50 380 Z"
        fill="hsl(var(--clinical))" opacity="0.04"
        stroke="hsl(var(--clinical))" strokeDasharray="4 3" strokeWidth="0.75"
      />
      {/* Diaphragm */}
      <path d="M 60 320 Q 240 295, 420 320" stroke="hsl(215 30% 50%)" strokeWidth="1" fill="none" strokeDasharray="3 2" opacity="0.5" />
      <text x="68" y="316" fontSize="8" className="fill-muted-foreground">diaphragm</text>

      {/* Heart + aorta — LV apex points down-left toward pump */}
      <HeartAndAorta systoleFrac={0} avOpen={false} />

      {/* AV mostly closed annotation */}
      <text x="245" y="118" fontSize="8" className="fill-muted-foreground">AV mostly closed</text>
      <text x="245" y="128" fontSize="8" className="fill-muted-foreground">(continuous bypass)</text>

      {/* Inflow cannula — sewn into LV apex */}
      <rect x="208" y="295" width="20" height="30" fill="hsl(215 25% 30%)" stroke="hsl(215 25% 12%)" strokeWidth="1" />
      {/* Sewing ring */}
      <ellipse cx="218" cy="298" rx="14" ry="3" fill="hsl(45 30% 60%)" stroke="hsl(45 25% 40%)" strokeWidth="0.5" />
      <text x="153" y="312" fontSize="8" className="fill-foreground" fontWeight="600">Inflow cannula</text>
      <text x="153" y="322" fontSize="8" className="fill-muted-foreground">(LV apex sewing ring)</text>

      {/* Pump body (pre-peritoneal, beneath diaphragm) — HeartMate 3 disc */}
      <g transform="translate(218 350)">
        {/* Outer titanium housing */}
        <circle r="36" fill="hsl(215 30% 30%)" stroke="hsl(215 30% 12%)" strokeWidth="1.5" />
        <circle r="32" fill="hsl(215 30% 22%)" />
        {/* Stator coils — small dots around perimeter */}
        {Array.from({ length: 12 }, (_, i) => i).map((i) => {
          const a = (i / 12) * Math.PI * 2;
          return <circle key={i} cx={Math.cos(a) * 28} cy={Math.sin(a) * 28} r="1.5" fill="hsl(45 80% 55%)" opacity="0.6" />;
        })}
        {/* Magnetically-levitated rotor (HeartMate 3) — 4 wide blades */}
        <g transform={`rotate(${rotorAngle})`}>
          {[0, 90, 180, 270].map((a) => (
            <path
              key={a}
              d="M 0 0 Q 10 -8, 22 -4 L 20 6 Q 8 2, 0 7 Z"
              fill="hsl(45 90% 60%)"
              stroke="hsl(45 80% 35%)"
              strokeWidth="0.5"
              transform={`rotate(${a})`}
            />
          ))}
          <circle r="5" fill="hsl(45 90% 70%)" stroke="hsl(45 80% 35%)" strokeWidth="0.5" />
        </g>
        {/* Inflow port (top) */}
        <rect x="-11" y="-46" width="22" height="14" rx="2" fill="hsl(215 30% 35%)" stroke="hsl(215 30% 12%)" strokeWidth="0.75" />
        {/* Outflow port (right) — angled toward aorta */}
        <rect x="32" y="-9" width="20" height="14" rx="2" fill="hsl(215 30% 35%)" stroke="hsl(215 30% 12%)" strokeWidth="0.75" />
      </g>
      <text x="218" y="408" textAnchor="middle" fontSize="9" className="fill-foreground" fontWeight="700">Centrifugal pump</text>
      <text x="218" y="420" textAnchor="middle" fontSize="8" className="fill-muted-foreground">(HeartMate 3 — fully levitated)</text>

      {/* Outflow graft — anastomosed to ascending aorta */}
      <path
        d="M 270 350
           Q 320 350, 350 320
           Q 380 280, 380 220
           Q 380 160, 340 130
           L 240 100"
        stroke="hsl(0 65% 50%)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        opacity="0.55"
      />
      <path
        d="M 270 350
           Q 320 350, 350 320
           Q 380 280, 380 220
           Q 380 160, 340 130
           L 240 100"
        stroke="hsl(0 65% 35%)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <text x="395" y="240" fontSize="9" className="fill-foreground" fontWeight="600">Outflow graft</text>
      <text x="395" y="252" fontSize="8" className="fill-muted-foreground">→ asc. aorta</text>
      {/* Anastomosis at aorta */}
      <circle cx="240" cy="100" r="4" fill="none" stroke="hsl(0 65% 35%)" strokeWidth="1.5" />

      {/* Flow particles: LV apex → inflow → pump → outflow → aorta */}
      {particles.map((p, i) => {
        const segs = [
          { x: 218, y: 295 },
          { x: 218, y: 322 },
          { x: 218, y: 350 },
          { x: 270, y: 350 },
          { x: 320, y: 350 },
          { x: 360, y: 300 },
          { x: 380, y: 220 },
          { x: 380, y: 150 },
          { x: 320, y: 115 },
          { x: 240, y: 100 },
        ];
        const total = segs.length - 1;
        const f = p * total;
        const idx = Math.min(Math.floor(f), total - 1);
        const local = f - idx;
        const x = segs[idx].x + (segs[idx + 1].x - segs[idx].x) * local;
        const y = segs[idx].y + (segs[idx + 1].y - segs[idx].y) * local;
        return <circle key={i} cx={x} cy={y} r="2.8" fill="hsl(0 75% 50%)" opacity={0.6 + 0.4 * Math.sin(p * Math.PI)} />;
      })}

      {/* Driveline tunnels through abdominal wall to controller */}
      <path d="M 218 386 L 218 410 L 480 410" stroke="hsl(215 30% 22%)" strokeWidth="3" fill="none" strokeLinecap="round" />
      <text x="225" y="406" fontSize="7" className="fill-muted-foreground">driveline</text>

      {/* External controller + batteries */}
      <g transform="translate(485 380)">
        <rect width="170" height="60" rx="4" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
        <text x="85" y="18" textAnchor="middle" fontSize="10" className="fill-foreground" fontWeight="700">External controller</text>
        <rect x="10" y="28" width="40" height="22" rx="2" fill="hsl(140 50% 40%)" />
        <rect x="60" y="28" width="40" height="22" rx="2" fill="hsl(140 50% 40%)" />
        <text x="30" y="43" textAnchor="middle" fontSize="8" fill="hsl(var(--background))" fontWeight="700">14h</text>
        <text x="80" y="43" textAnchor="middle" fontSize="8" fill="hsl(var(--background))" fontWeight="700">14h</text>
        <text x="110" y="43" fontSize="8" className="fill-muted-foreground">2× Li-ion</text>
      </g>

      {/* Status / output panel */}
      <g transform="translate(485 60)">
        <rect width="170" height="180" rx="6" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
        <text x="85" y="20" textAnchor="middle" fontSize="11" className="fill-foreground" fontWeight="700">HeartMate 3</text>
        <text x="14" y="50" fontSize="9" className="fill-muted-foreground">Speed</text>
        <text x="156" y="50" textAnchor="end" fontSize="11" className="fill-foreground" fontWeight="700">5400 rpm</text>
        <text x="14" y="74" fontSize="9" className="fill-muted-foreground">Flow</text>
        <text x="156" y="74" textAnchor="end" fontSize="11" className="fill-foreground" fontWeight="700">5.2 L/min</text>
        <text x="14" y="98" fontSize="9" className="fill-muted-foreground">Power</text>
        <text x="156" y="98" textAnchor="end" fontSize="11" className="fill-foreground" fontWeight="700">5.1 W</text>
        <text x="14" y="122" fontSize="9" className="fill-muted-foreground">Pulsatility</text>
        <text x="156" y="122" textAnchor="end" fontSize="11" className="fill-foreground" fontWeight="700">PI 4.2</text>
        <text x="14" y="146" fontSize="9" className="fill-muted-foreground">MAP (Doppler)</text>
        <text x="156" y="146" textAnchor="end" fontSize="11" className="fill-foreground" fontWeight="700">78 mmHg</text>
        <text x="85" y="170" textAnchor="middle" fontSize="8" className="fill-muted-foreground">narrow pulse pressure — Doppler MAP</text>
      </g>

      <text x="50" y="15" fontSize="11" className="fill-foreground" fontWeight="700">Implantable LVAD (HeartMate 3) — bridge / destination therapy</text>
    </svg>
  );
};

export const MechanicalCirculatorySupportDiagram = () => {
  const [device, setDevice] = useState<Device>("iabp");
  const [running, setRunning] = useState(true);

  return (
            <div className="w-full max-w-3xl mx-auto space-y-3 my-6">
      <div className="text-center">
        <h3 className="text-lg font-serif font-bold text-foreground">Mechanical Circulatory Support — anatomically detailed device animations</h3>
        <p className="text-xs text-muted-foreground">Interactive diagrams of IABP, Impella and LVAD with annotated cardiac anatomy</p>
      </div>

      <Tabs value={device} onValueChange={(v) => setDevice(v as Device)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="iabp">IABP</TabsTrigger>
          <TabsTrigger value="impella">Impella</TabsTrigger>
          <TabsTrigger value="lvad">LVAD</TabsTrigger>
        </TabsList>

        <TabsContent value="iabp" className="mt-3 space-y-3">
          <IABPDiagram running={running && device === "iabp"} />
          <div className="bg-secondary/30 rounded p-3 border border-border text-xs text-muted-foreground">
            <p><strong className="text-foreground">Counterpulsation:</strong> a 30–50 mL helium-filled polyurethane balloon sits in the descending aorta, tip 1–2 cm distal to the left subclavian artery origin. It <strong>inflates at the dicrotic notch</strong> (T-wave on ECG / aortic incisura) and <strong>deflates just before systole</strong> (R-wave / aortic upstroke).</p>
            <ul className="list-disc pl-5 mt-2 space-y-0.5">
              <li><strong>Diastolic augmentation</strong> — inflated balloon displaces ~40 mL of blood retrograde towards the aortic root → ↑ aortic root pressure → ↑ <span className="text-[hsl(15_85%_45%)] font-medium">coronary perfusion</span> (perfused only in diastole).</li>
              <li><strong>Afterload reduction</strong> — sudden pre-systolic deflation creates a low-pressure void → ↓ aortic end-diastolic pressure → ↓ LV wall tension and MVO₂ → ↑ stroke volume by ~10–20%.</li>
              <li>CO augmentation: <strong>0.5–1 L/min</strong>. Requires <em>some</em> native CO and a competent aortic valve. <strong>IABP-SHOCK II (NEJM 2012)</strong>: no mortality benefit in MI cardiogenic shock — IABP no longer Class I.</li>
              <li>Contraindications: severe AR (worsens regurgitation), aortic dissection, severe peripheral vascular disease, abdominal aortic aneurysm.</li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="impella" className="mt-3 space-y-3">
          <ImpellaDiagram running={running && device === "impella"} />
          <div className="bg-secondary/30 rounded p-3 border border-border text-xs text-muted-foreground">
            <p><strong className="text-foreground">Microaxial pump (Archimedes screw):</strong> a high-speed rotor (~50 000 rpm) housed in a cannula that crosses the aortic valve. The pigtail-tipped <em>inlet</em> sits in the LV cavity; the <em>outlet</em> ports are 3–4 cm above the aortic valve in the ascending aorta — bypassing the native valve completely.</p>
            <ul className="list-disc pl-5 mt-2 space-y-0.5">
              <li><strong>Direct LV unloading</strong> → ↓ LVEDP, ↓ wall stress (Laplace), ↓ MVO₂, ↑ subendocardial perfusion (CPP = DBP − LVEDP).</li>
              <li><strong>Continuous, non-pulsatile flow</strong> — output is independent of native ejection (works in profound LV failure or VF/VT).</li>
              <li>CO augmentation: <strong>2.5 L/min (Impella 2.5)</strong> → <strong>3.5 L/min (CP)</strong> → <strong>5.5 L/min (Impella 5.5</strong>, surgical axillary cut-down).</li>
              <li><strong>Purge fluid</strong> (5–30% dextrose + heparin) flows continuously around the motor at 2–30 mL/h — prevents blood entering the motor housing.</li>
              <li>Contraindications: mechanical AV, severe AS/AR, LV thrombus, VSD, severe peripheral arterial disease.</li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="lvad" className="mt-3 space-y-3">
          <LVADDiagram running={running && device === "lvad"} />
          <div className="bg-secondary/30 rounded p-3 border border-border text-xs text-muted-foreground">
            <p><strong className="text-foreground">Implantable centrifugal pump:</strong> the inflow cannula is sewn into the LV apex via a sewing ring, and a fully magnetically-levitated impeller (HeartMate 3 — no mechanical bearings, no contact wear) propels blood through an outflow graft anastomosed end-to-side to the ascending aorta. A driveline tunnels through the abdominal wall to an external controller and two batteries.</p>
            <ul className="list-disc pl-5 mt-2 space-y-0.5">
              <li><strong>Total LV bypass</strong> — most CO travels through the pump; the native aortic valve may stay closed for several beats (intermittent opening reduces leaflet fusion and AI).</li>
              <li><strong>Continuous flow</strong> with narrow pulse pressure — peripheral pulses may be impalpable; MAP is measured by Doppler over the brachial artery.</li>
              <li>Output: <strong>4–10 L/min</strong>, modulated by preload (sensitive to hypovolaemia/RV failure → suction events) and afterload (high SVR → ↓ flow).</li>
              <li>Indications: <strong>bridge to transplant</strong>, <strong>destination therapy</strong>, bridge to recovery / candidacy.</li>
              <li>Anticoagulation: <strong>warfarin</strong> (INR 2.0–3.0) <strong>+ aspirin</strong>. Major complications: GI bleeding (acquired vWF deficiency), driveline infection, stroke, RV failure, pump thrombosis (less common with HM3).</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center gap-2">
        <button
          onClick={() => setRunning((r) => !r)}
          className="px-3 py-1.5 rounded bg-icu text-white text-sm font-medium hover:bg-icu/90"
        >
          {running ? "⏸ Pause" : "▶ Play"}
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-xs">
          <thead className="bg-muted/50">
            <tr className="border-b border-border">
              <th className="text-left p-2 font-semibold text-foreground">Feature</th>
              <th className="text-left p-2 font-semibold text-foreground">IABP</th>
              <th className="text-left p-2 font-semibold text-foreground">Impella</th>
              <th className="text-left p-2 font-semibold text-foreground">LVAD</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-muted-foreground">
            <tr><td className="p-2 font-medium text-foreground">Mechanism</td><td className="p-2">Counterpulsation</td><td className="p-2">Axial pump across AV</td><td className="p-2">Centrifugal LV→aorta bypass</td></tr>
            <tr><td className="p-2 font-medium text-foreground">Flow pattern</td><td className="p-2">Pulsatile (synced to ECG)</td><td className="p-2">Continuous</td><td className="p-2">Continuous</td></tr>
            <tr><td className="p-2 font-medium text-foreground">CO support</td><td className="p-2">0.5–1 L/min</td><td className="p-2">2.5–5.5 L/min</td><td className="p-2">4–10 L/min</td></tr>
            <tr><td className="p-2 font-medium text-foreground">LV unloading</td><td className="p-2">Indirect (↓ afterload)</td><td className="p-2">Direct (↓ LVEDP)</td><td className="p-2">Maximal</td></tr>
            <tr><td className="p-2 font-medium text-foreground">Native CO required</td><td className="p-2">Yes</td><td className="p-2">No</td><td className="p-2">No</td></tr>
            <tr><td className="p-2 font-medium text-foreground">Duration</td><td className="p-2">Days</td><td className="p-2">Days–weeks</td><td className="p-2">Months–years</td></tr>
            <tr><td className="p-2 font-medium text-foreground">Anticoagulation</td><td className="p-2">Heparin</td><td className="p-2">Heparin (purge + systemic)</td><td className="p-2">Warfarin + antiplatelet</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MechanicalCirculatorySupportDiagram;
