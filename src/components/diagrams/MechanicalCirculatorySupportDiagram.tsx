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

// ---------- IABP ----------
const IABPDiagram = ({ running }: { running: boolean }) => {
  const t = useAnimationFrame(running);
  const cycle = 1.0; // 1 s per cardiac cycle (60 bpm)
  const phase = (t % cycle) / cycle; // 0..1
  // Systole: 0..0.4, Diastole: 0.4..1.0
  const inSystole = phase < 0.4;
  // Balloon volume: deflated during systole (just before), inflated during diastole
  // Inflate at dicrotic notch (phase 0.4), deflate just before next systole (0.95)
  let balloonV = 0;
  if (phase >= 0.4 && phase < 0.95) {
    const p = (phase - 0.4) / 0.55;
    balloonV = Math.sin(p * Math.PI) ** 0.5; // smooth inflate-hold-deflate
  }

  // Aortic pressure trace
  const w = 560, h = 320;
  const traceX = (ph: number) => 60 + ph * 360;
  const buildAortic = () => {
    let d = "";
    for (let i = 0; i <= 200; i++) {
      const ph = i / 200;
      // Native systolic peak around 0.15
      let p = 70; // diastolic baseline
      if (ph < 0.4) {
        // systolic upstroke
        p = 70 + 50 * Math.sin((ph / 0.4) * Math.PI);
      } else {
        // diastolic decay
        const dec = (ph - 0.4) / 0.6;
        p = 70 - 15 * dec;
        // diastolic augmentation from balloon
        if (ph >= 0.4 && ph < 0.95) {
          const bp = (ph - 0.4) / 0.55;
          p += 45 * Math.sin(bp * Math.PI);
        }
        // end-diastolic dip from deflation
        if (ph > 0.93 && ph < 1.0) {
          p -= 18 * Math.sin(((ph - 0.93) / 0.07) * Math.PI);
        }
      }
      const x = traceX(ph);
      const y = 280 - (p - 30) * 1.6;
      d += `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)} `;
    }
    return d;
  };

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full bg-card rounded">
      {/* Aortic arch + descending aorta */}
      <path
        d="M 80 60 C 80 30, 200 20, 260 60 L 260 220"
        stroke="hsl(var(--clinical))"
        strokeWidth="22"
        fill="none"
        strokeLinecap="round"
        opacity="0.25"
      />
      <path
        d="M 80 60 C 80 30, 200 20, 260 60 L 260 220"
        stroke="hsl(var(--clinical))"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* LV */}
      <ellipse
        cx="105"
        cy="120"
        rx={28 - 6 * (inSystole ? 1 : 0)}
        ry={42 - 8 * (inSystole ? 1 : 0)}
        fill="hsl(var(--clinical))"
        opacity="0.15"
        stroke="hsl(var(--clinical))"
        strokeWidth="1.5"
      />
      <text x="105" y="180" textAnchor="middle" fontSize="10" className="fill-muted-foreground">LV</text>
      {/* Aortic valve */}
      <line x1="92" y1="78" x2="118" y2="78" stroke="hsl(var(--clinical))" strokeWidth={inSystole ? 1 : 2.5} opacity={inSystole ? 0.4 : 1} />
      {/* Coronary arteries */}
      <path d="M 130 70 Q 110 90, 95 110" stroke="hsl(0 70% 50%)" strokeWidth="2" fill="none" />
      <path d="M 145 65 Q 165 85, 175 110" stroke="hsl(0 70% 50%)" strokeWidth="2" fill="none" />
      <text x="80" y="110" fontSize="9" className="fill-muted-foreground">coronaries</text>

      {/* Catheter */}
      <line x1="260" y1="220" x2="260" y2="170" stroke="hsl(215 25% 30%)" strokeWidth="2" />
      {/* Balloon */}
      <ellipse
        cx="260"
        cy="140"
        rx={6 + balloonV * 14}
        ry={6 + balloonV * 32}
        fill="hsl(220 80% 55%)"
        opacity={0.3 + 0.5 * balloonV}
        stroke="hsl(220 80% 45%)"
        strokeWidth="1.5"
      />
      <text x="285" y="125" fontSize="10" className="fill-foreground font-medium">Balloon</text>
      <text x="285" y="138" fontSize="9" className="fill-muted-foreground">{balloonV > 0.05 ? "INFLATED (He)" : "deflated"}</text>
      <text x="285" y="151" fontSize="9" className="fill-muted-foreground">{inSystole ? "SYSTOLE → defl." : "DIASTOLE → infl."}</text>

      {/* Coronary flow arrows during diastole */}
      {balloonV > 0.3 && (
        <>
          <path d="M 245 100 L 200 90" stroke="hsl(0 70% 50%)" strokeWidth="2" markerEnd="url(#arrowR)" opacity={balloonV} />
          <text x="180" y="80" fontSize="9" className="fill-[hsl(0_70%_50%)] font-medium" opacity={balloonV}>↑ coronary perfusion</text>
        </>
      )}

      <defs>
        <marker id="arrowR" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="hsl(0 70% 50%)" />
        </marker>
      </defs>

      {/* Aortic pressure trace */}
      <g>
        <line x1="60" y1="160" x2="60" y2="290" stroke="hsl(215 25% 40%)" strokeWidth="1" />
        <line x1="60" y1="290" x2="420" y2="290" stroke="hsl(215 25% 40%)" strokeWidth="1" />
        <text x="50" y="170" textAnchor="end" fontSize="9" className="fill-muted-foreground">120</text>
        <text x="50" y="290" textAnchor="end" fontSize="9" className="fill-muted-foreground">30</text>
        <text x="240" y="308" textAnchor="middle" fontSize="10" className="fill-foreground font-medium">Aortic pressure (mmHg)</text>
        <path d={buildAortic()} stroke="hsl(0 70% 50%)" strokeWidth="2" fill="none" />
        {/* play marker */}
        <line x1={traceX(phase)} y1="160" x2={traceX(phase)} y2="290" stroke="hsl(215 25% 30%)" strokeWidth="1" strokeDasharray="3 3" />
        {/* Annotations */}
        <text x={traceX(0.15)} y="155" textAnchor="middle" fontSize="9" className="fill-muted-foreground">native peak</text>
        <text x={traceX(0.65)} y="155" textAnchor="middle" fontSize="9" className="fill-[hsl(220_80%_55%)] font-medium">diastolic augmentation</text>
        <text x={traceX(0.96)} y="305" textAnchor="middle" fontSize="9" className="fill-[hsl(220_80%_55%)]">↓ afterload</text>
      </g>
    </svg>
  );
};

// ---------- Impella ----------
const ImpellaDiagram = ({ running }: { running: boolean }) => {
  const t = useAnimationFrame(running);
  const rotorAngle = (t * 360 * 4) % 360; // 4 rev/sec on screen (real ~50,000 rpm)
  // Continuous flow particles from LV to aorta
  const particles = Array.from({ length: 8 }, (_, i) => {
    const p = ((t * 0.6 + i / 8) % 1);
    return p;
  });

  const w = 560, h = 320;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full bg-card rounded">
      {/* LV */}
      <ellipse cx="160" cy="180" rx="70" ry="90" fill="hsl(var(--clinical))" opacity="0.12" stroke="hsl(var(--clinical))" strokeWidth="1.5" />
      <text x="160" y="285" textAnchor="middle" fontSize="11" className="fill-muted-foreground">Left ventricle</text>
      {/* Ascending aorta */}
      <path d="M 280 80 C 280 50, 380 40, 440 80 L 440 200" stroke="hsl(var(--clinical))" strokeWidth="22" fill="none" opacity="0.2" />
      <path d="M 280 80 C 280 50, 380 40, 440 80 L 440 200" stroke="hsl(var(--clinical))" strokeWidth="2" fill="none" />
      <text x="430" y="220" textAnchor="middle" fontSize="11" className="fill-muted-foreground">Aorta</text>

      {/* Aortic valve plane */}
      <line x1="225" y1="100" x2="275" y2="100" stroke="hsl(215 25% 50%)" strokeWidth="1" strokeDasharray="3 3" />
      <text x="195" y="98" fontSize="9" className="fill-muted-foreground">AV</text>

      {/* Catheter axis crossing AV from LV apex/cavity to ascending aorta */}
      {/* Inlet (in LV) */}
      <circle cx="170" cy="200" r="10" fill="hsl(220 70% 50%)" opacity="0.9" />
      <text x="170" y="225" textAnchor="middle" fontSize="9" className="fill-foreground font-medium">Inlet</text>
      {/* Catheter shaft */}
      <line x1="170" y1="200" x2="320" y2="80" stroke="hsl(215 25% 25%)" strokeWidth="6" strokeLinecap="round" />
      {/* Pump housing (microaxial) */}
      <rect x="220" y="135" width="50" height="18" rx="6" transform="rotate(-38 245 144)" fill="hsl(215 25% 35%)" stroke="hsl(215 25% 20%)" strokeWidth="1" />
      {/* Rotor (spinning) */}
      <g transform={`translate(245 144) rotate(${rotorAngle - 38})`}>
        <line x1="-12" y1="0" x2="12" y2="0" stroke="hsl(45 90% 55%)" strokeWidth="3" strokeLinecap="round" />
        <line x1="0" y1="-7" x2="0" y2="7" stroke="hsl(45 90% 55%)" strokeWidth="3" strokeLinecap="round" />
        <circle r="3" fill="hsl(45 90% 65%)" />
      </g>
      <text x="295" y="145" fontSize="10" className="fill-foreground font-medium">Axial rotor</text>
      <text x="295" y="158" fontSize="9" className="fill-muted-foreground">~50 000 rpm</text>

      {/* Outlet (in ascending aorta, above AV) */}
      <circle cx="320" cy="80" r="8" fill="hsl(0 70% 50%)" opacity="0.9" />
      <text x="335" y="75" fontSize="9" className="fill-foreground font-medium">Outlet</text>

      {/* Flow particles travelling from inlet → outlet (continuous) */}
      {particles.map((p, i) => {
        // straight-line interpolation along catheter
        const x = 170 + (320 - 170) * p;
        const y = 200 + (80 - 200) * p;
        return <circle key={i} cx={x} cy={y} r="3" fill="hsl(0 70% 50%)" opacity={0.4 + 0.5 * Math.sin(p * Math.PI)} />;
      })}

      {/* Continuous outflow into aorta */}
      {particles.map((p, i) => {
        const ph = (p + 0.3) % 1;
        const x = 320 + ph * 100;
        const y = 80 + ph * 8;
        return <circle key={`o${i}`} cx={x} cy={y} r="2.5" fill="hsl(0 70% 50%)" opacity={0.6 * (1 - ph)} />;
      })}

      {/* Labels */}
      <text x="40" y="40" fontSize="11" className="fill-foreground font-bold">Impella (microaxial)</text>
      <text x="40" y="55" fontSize="9" className="fill-muted-foreground">Continuous LV→aorta unloading, bypasses native valve</text>

      {/* Flow rate badge */}
      <rect x="370" y="240" width="170" height="50" rx="6" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" />
      <text x="455" y="258" textAnchor="middle" fontSize="10" className="fill-muted-foreground">Continuous flow</text>
      <text x="455" y="275" textAnchor="middle" fontSize="13" className="fill-foreground font-bold">2.5 – 5.5 L/min</text>
    </svg>
  );
};

// ---------- LVAD ----------
const LVADDiagram = ({ running }: { running: boolean }) => {
  const t = useAnimationFrame(running);
  const rotorAngle = (t * 360 * 2) % 360;
  const particles = Array.from({ length: 10 }, (_, i) => ((t * 0.4 + i / 10) % 1));

  const w = 560, h = 320;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full bg-card rounded">
      {/* Heart silhouette */}
      <path
        d="M 130 90 C 100 90, 80 130, 100 180 L 180 270 L 260 180 C 280 130, 260 90, 230 90 C 210 90, 200 110, 180 130 C 160 110, 150 90, 130 90 Z"
        fill="hsl(var(--clinical))"
        opacity="0.12"
        stroke="hsl(var(--clinical))"
        strokeWidth="1.5"
      />
      {/* LV cavity */}
      <ellipse cx="180" cy="180" rx="40" ry="60" fill="hsl(var(--clinical))" opacity="0.18" />
      <text x="180" y="120" textAnchor="middle" fontSize="10" className="fill-muted-foreground">LV</text>

      {/* Inflow cannula at apex */}
      <rect x="170" y="235" width="20" height="35" fill="hsl(215 25% 35%)" stroke="hsl(215 25% 20%)" />
      <text x="155" y="285" fontSize="9" className="fill-foreground font-medium">Inflow</text>
      <text x="155" y="297" fontSize="8" className="fill-muted-foreground">(LV apex)</text>

      {/* Pump body (centrifugal disc) */}
      <circle cx="220" cy="285" r="32" fill="hsl(215 25% 30%)" stroke="hsl(215 25% 15%)" strokeWidth="1.5" />
      <circle cx="220" cy="285" r="26" fill="hsl(215 25% 22%)" />
      {/* Spinning impeller */}
      <g transform={`translate(220 285) rotate(${rotorAngle})`}>
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <path
            key={a}
            d="M 0 0 Q 8 -6, 18 -3 L 16 4 Q 6 2, 0 5 Z"
            fill="hsl(45 90% 55%)"
            stroke="hsl(45 90% 40%)"
            strokeWidth="0.5"
            transform={`rotate(${a})`}
          />
        ))}
        <circle r="4" fill="hsl(45 90% 65%)" />
      </g>
      <text x="220" y="335" textAnchor="middle" fontSize="10" className="fill-foreground font-medium">Centrifugal pump</text>
      <text x="220" y="347" textAnchor="middle" fontSize="8" className="fill-muted-foreground">(HeartMate 3, HVAD)</text>

      {/* Outflow graft → ascending aorta */}
      <path d="M 252 285 Q 330 285, 360 230 Q 380 200, 380 130" stroke="hsl(215 25% 35%)" strokeWidth="14" fill="none" strokeLinecap="round" />
      <path d="M 252 285 Q 330 285, 360 230 Q 380 200, 380 130" stroke="hsl(215 25% 50%)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <text x="395" y="155" fontSize="9" className="fill-foreground font-medium">Outflow graft</text>
      <text x="395" y="167" fontSize="8" className="fill-muted-foreground">→ ascending aorta</text>

      {/* Aorta */}
      <path d="M 320 80 C 340 60, 410 60, 430 100 L 430 180" stroke="hsl(var(--clinical))" strokeWidth="20" fill="none" opacity="0.2" />
      <path d="M 320 80 C 340 60, 410 60, 430 100 L 430 180" stroke="hsl(var(--clinical))" strokeWidth="2" fill="none" />
      <text x="430" y="200" textAnchor="middle" fontSize="10" className="fill-muted-foreground">Aorta</text>

      {/* Flow particles: LV apex → pump → graft → aorta */}
      {particles.map((p, i) => {
        // segmented path: (180,235)→(180,260)→(220,285)→(360,230)→(380,130)→(380,80)
        const seg = [
          { x: 180, y: 235 },
          { x: 180, y: 260 },
          { x: 220, y: 285 },
          { x: 330, y: 285 },
          { x: 360, y: 230 },
          { x: 380, y: 130 },
          { x: 380, y: 80 },
        ];
        const total = seg.length - 1;
        const f = p * total;
        const idx = Math.min(Math.floor(f), total - 1);
        const local = f - idx;
        const x = seg[idx].x + (seg[idx + 1].x - seg[idx].x) * local;
        const y = seg[idx].y + (seg[idx + 1].y - seg[idx].y) * local;
        return <circle key={i} cx={x} cy={y} r="3" fill="hsl(0 70% 50%)" opacity={0.5 + 0.4 * Math.sin(p * Math.PI)} />;
      })}

      {/* Native AV closed (bypass) */}
      <line x1="200" y1="115" x2="220" y2="115" stroke="hsl(215 25% 50%)" strokeWidth="2" strokeDasharray="2 2" />
      <text x="160" y="105" fontSize="8" className="fill-muted-foreground">AV mostly closed</text>

      {/* Driveline */}
      <line x1="220" y1="317" x2="220" y2="338" stroke="hsl(215 25% 25%)" strokeWidth="2.5" />
      <line x1="220" y1="338" x2="280" y2="338" stroke="hsl(215 25% 25%)" strokeWidth="2.5" />
      <text x="285" y="342" fontSize="8" className="fill-muted-foreground">→ driveline → controller / battery</text>

      <text x="40" y="30" fontSize="11" className="fill-foreground font-bold">LVAD (continuous-flow centrifugal)</text>
      <text x="40" y="44" fontSize="9" className="fill-muted-foreground">Bridge to transplant / destination therapy</text>
    </svg>
  );
};

export const MechanicalCirculatorySupportDiagram = () => {
  const [device, setDevice] = useState<Device>("iabp");
  const [running, setRunning] = useState(true);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-3 my-6">
      <div className="text-center">
        <h3 className="text-lg font-serif font-bold text-foreground">Mechanical Circulatory Support — how each device augments cardiac output</h3>
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
            <p><strong className="text-foreground">Counterpulsation:</strong> a 30–50 mL helium balloon in the descending aorta <strong>inflates at the dicrotic notch</strong> (start of diastole) and <strong>deflates just before systole</strong>.</p>
            <ul className="list-disc pl-5 mt-2 space-y-0.5">
              <li><strong>Diastolic augmentation</strong> — inflated balloon displaces blood retrograde → ↑ aortic root pressure → ↑ <span className="text-[hsl(0_70%_50%)] font-medium">coronary perfusion</span>.</li>
              <li><strong>Afterload reduction</strong> — sudden deflation creates a "vacuum" → ↓ aortic end-diastolic pressure → ↓ LV wall tension and MVO₂ → ↑ stroke volume by ~10–20%.</li>
              <li>CO augmentation: typically <strong>0.5–1 L/min</strong>. Requires <em>some</em> native CO and a competent aortic valve (AR is a contraindication).</li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="impella" className="mt-3 space-y-3">
          <ImpellaDiagram running={running && device === "impella"} />
          <div className="bg-secondary/30 rounded p-3 border border-border text-xs text-muted-foreground">
            <p><strong className="text-foreground">Microaxial pump (Archimedes screw):</strong> a high-speed rotor (~50 000 rpm) sits across the aortic valve. The inlet draws blood from the LV cavity and the outlet ejects it into the ascending aorta — bypassing the native valve.</p>
            <ul className="list-disc pl-5 mt-2 space-y-0.5">
              <li><strong>Direct LV unloading</strong> → ↓ LVEDP, ↓ wall stress, ↓ MVO₂, ↑ subendocardial perfusion.</li>
              <li><strong>Continuous, non-pulsatile flow</strong> — output is independent of native ejection (works in profound LV failure or VF/VT).</li>
              <li>CO augmentation: <strong>2.5 L/min (Impella 2.5)</strong> up to <strong>5.5 L/min (Impella 5.5)</strong>.</li>
              <li>Contraindications: mechanical AV, severe AS/AR, LV thrombus.</li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="lvad" className="mt-3 space-y-3">
          <LVADDiagram running={running && device === "lvad"} />
          <div className="bg-secondary/30 rounded p-3 border border-border text-xs text-muted-foreground">
            <p><strong className="text-foreground">Implantable centrifugal pump:</strong> inflow cannula in the LV apex, magnetically-levitated impeller (HeartMate 3) ejects blood through an outflow graft anastomosed to the ascending aorta. Driveline tunnels through the abdominal wall to an external controller and batteries.</p>
            <ul className="list-disc pl-5 mt-2 space-y-0.5">
              <li><strong>Total LV bypass</strong> — most CO travels through the pump; the native aortic valve may stay closed for several beats.</li>
              <li><strong>Continuous flow</strong>, narrow pulse pressure — peripheral pulses may be impalpable; MAP measured with Doppler.</li>
              <li>Output: <strong>4–10 L/min</strong>, flow-dependent on preload and afterload (Starling-like response).</li>
              <li>Indications: <strong>bridge to transplant</strong>, <strong>destination therapy</strong>, bridge to recovery. Requires anticoagulation (warfarin + antiplatelet).</li>
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
