import React from "react";

/**
 * Labelled schematic plates of the five archetypal vascular access devices.
 * Each plate annotates skin entry site, course, tip position, dwell time
 * and key complication — to be read alongside the dwell-time / site
 * evidence tables in the Vascular Access Devices topic.
 */

interface PlateProps {
  title: string;
  dwell: string;
  evidence: string;
  children: React.ReactNode;
}

const Plate: React.FC<PlateProps> = ({ title, dwell, evidence, children }) => (
  <div className="rounded-lg border border-border bg-card overflow-hidden flex flex-col">
    <div className="px-3 py-2 border-b border-border bg-muted/40">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="text-[11px] text-muted-foreground mt-0.5">
        <span className="font-medium text-foreground">Dwell:</span> {dwell}
      </p>
      <p className="text-[11px] text-muted-foreground italic mt-0.5">
        {evidence}
      </p>
    </div>
    <div className="p-2 flex-1">{children}</div>
  </div>
);

// ─── Shared body silhouette helper ────────────────────────────────────
const SkinTone = "hsl(28 35% 88%)";
const SkinEdge = "hsl(28 25% 60%)";
const VeinColor = "hsl(220 60% 45%)";
const ArteryColor = "hsl(0 60% 50%)";
const CatheterColor = "hsl(45 25% 92%)";
const FgEdge = "hsl(var(--foreground))";

const labelStyle: React.CSSProperties = {
  fontSize: 9,
  fill: "hsl(var(--foreground))",
};

const leader = (
  x1: number, y1: number, x2: number, y2: number,
) => (
  <line
    x1={x1} y1={y1} x2={x2} y2={y2}
    stroke="hsl(var(--muted-foreground))"
    strokeWidth={0.6}
  />
);

// ─── 1. Peripheral cannula ────────────────────────────────────────────
const PeripheralCannula: React.FC = () => (
  <svg viewBox="0 0 280 200" role="img" aria-label="Peripheral cannula in dorsal hand vein"
       className="w-full h-auto">
    {/* Hand silhouette */}
    <path
      d="M30,150 C25,110 35,70 70,55 L100,40 L130,38 L160,42 L185,55 C215,70 230,110 220,150 L220,180 L30,180 Z"
      fill={SkinTone} stroke={SkinEdge} strokeWidth={1}
    />
    {/* Dorsal veins */}
    <path d="M70,160 C90,130 110,110 130,90 L150,60" stroke={VeinColor} strokeWidth={3} fill="none" />
    <path d="M180,160 C170,130 160,115 150,95" stroke={VeinColor} strokeWidth={3} fill="none" />
    <path d="M120,170 C125,150 130,130 135,110" stroke={VeinColor} strokeWidth={2.5} fill="none" />

    {/* Cannula entering vein */}
    <rect x="95" y="118" width="32" height="10" rx="2" fill="hsl(200 70% 55%)" stroke={FgEdge} strokeOpacity={0.5} />
    <line x1="127" y1="123" x2="148" y2="103" stroke="hsl(45 30% 75%)" strokeWidth={3} strokeLinecap="round" />
    <circle cx="148" cy="103" r="2" fill={FgEdge} />

    {/* Labels */}
    <text x="92" y="113" textAnchor="end" {...labelStyle as object}>Hub (colour-coded gauge)</text>
    {leader(95, 117, 92, 113)}
    <text x="200" y="80" {...labelStyle as object}>Tip in dorsal hand vein</text>
    {leader(200, 84, 152, 102)}
    <text x="240" y="160" textAnchor="end" {...labelStyle as object}>Forearm / dorsum hand</text>
  </svg>
);

// ─── 2. PICC ──────────────────────────────────────────────────────────
const PICC: React.FC = () => (
  <svg viewBox="0 0 280 240" role="img" aria-label="PICC inserted at basilic vein with tip at cavoatrial junction"
       className="w-full h-auto">
    {/* Torso outline */}
    <path d="M90,30 L190,30 L210,80 L210,210 L70,210 L70,80 Z"
          fill={SkinTone} stroke={SkinEdge} strokeWidth={1}/>
    {/* Right arm */}
    <path d="M210,80 C245,90 260,140 250,200 L235,225 L210,200 L210,80 Z"
          fill={SkinTone} stroke={SkinEdge} strokeWidth={1}/>
    {/* Heart silhouette */}
    <ellipse cx="135" cy="120" rx="22" ry="28" fill="hsl(0 40% 80%)" stroke={FgEdge} strokeOpacity={0.4}/>
    {/* SVC */}
    <path d="M140,75 L140,110" stroke={VeinColor} strokeWidth={4} fill="none" />
    {/* Subclavian + axillary + basilic vein course */}
    <path d="M240,210 C240,180 235,150 220,130 C200,115 175,95 140,90"
          stroke={VeinColor} strokeWidth={3.5} fill="none" />
    {/* Catheter (overlying vein) */}
    <path d="M240,210 C240,180 235,150 220,130 C200,115 175,95 140,108"
          stroke={CatheterColor} strokeWidth={2.5} fill="none" strokeDasharray="3 2" />
    <circle cx="140" cy="108" r="2.5" fill={FgEdge} />
    {/* External hub */}
    <rect x="232" y="208" width="14" height="6" rx="1.5" fill="hsl(280 50% 50%)" stroke={FgEdge} strokeOpacity={0.5}/>

    {/* Labels */}
    <text x="265" y="200" textAnchor="end" {...labelStyle as object}>Skin entry: basilic v.</text>
    {leader(240, 212, 230, 200)}
    <text x="20" y="105" {...labelStyle as object}>Tip at cavoatrial</text>
    <text x="20" y="116" {...labelStyle as object}>junction (SVC/RA)</text>
    {leader(75, 110, 138, 110)}
    <text x="20" y="55" {...labelStyle as object}>Single/double-lumen,</text>
    <text x="20" y="66" {...labelStyle as object}>4–6 Fr, weeks–months</text>
  </svg>
);

// ─── 3. Non-tunnelled CVC ─────────────────────────────────────────────
const NonTunnelledCVC: React.FC = () => (
  <svg viewBox="0 0 280 240" role="img" aria-label="Non-tunnelled triple-lumen CVC in right internal jugular vein"
       className="w-full h-auto">
    {/* Head + torso */}
    <circle cx="140" cy="40" r="26" fill={SkinTone} stroke={SkinEdge} />
    <path d="M90,70 L190,70 L210,110 L210,220 L70,220 L70,110 Z"
          fill={SkinTone} stroke={SkinEdge}/>
    {/* Clavicle */}
    <line x1="80" y1="100" x2="200" y2="100" stroke="hsl(45 30% 70%)" strokeWidth={3} />
    {/* IJV */}
    <path d="M155,55 L155,105" stroke={VeinColor} strokeWidth={4} fill="none" />
    {/* Carotid */}
    <path d="M145,55 L145,105" stroke={ArteryColor} strokeWidth={3} fill="none" />
    {/* SVC */}
    <path d="M155,105 L155,160" stroke={VeinColor} strokeWidth={4} fill="none" />
    {/* Heart */}
    <ellipse cx="150" cy="180" rx="24" ry="22" fill="hsl(0 40% 80%)" stroke={FgEdge} strokeOpacity={0.4}/>
    {/* Catheter — skin entry then descending */}
    <path d="M170,90 L160,100 L160,165" stroke={CatheterColor} strokeWidth={3} fill="none" />
    <circle cx="160" cy="165" r="2.5" fill={FgEdge} />
    {/* External 3-lumen hub */}
    {[0, 6, 12].map((dy, i) => (
      <rect key={i} x="172" y={82 + dy} width="20" height="4" rx="1"
            fill={["hsl(0 70% 50%)","hsl(220 60% 50%)","hsl(150 60% 45%)"][i]}
            stroke={FgEdge} strokeOpacity={0.4} />
    ))}

    {/* Labels */}
    <text x="225" y="92" {...labelStyle as object}>3 colour-coded</text>
    <text x="225" y="103" {...labelStyle as object}>lumens (distal,</text>
    <text x="225" y="114" {...labelStyle as object}>medial, proximal)</text>
    {leader(220, 90, 195, 90)}
    <text x="20" y="60" {...labelStyle as object}>Right IJV</text>
    {leader(60, 62, 153, 65)}
    <text x="20" y="80" fill={ArteryColor} fontSize={9}>Carotid (avoid)</text>
    {leader(75, 82, 145, 75)}
    <text x="20" y="170" {...labelStyle as object}>Tip: lower SVC,</text>
    <text x="20" y="181" {...labelStyle as object}>above pericardium</text>
    {leader(75, 170, 158, 165)}
  </svg>
);

// ─── 4. Tunnelled line (Hickman) ──────────────────────────────────────
const TunnelledLine: React.FC = () => (
  <svg viewBox="0 0 280 240" role="img" aria-label="Tunnelled Hickman line with subcutaneous Dacron cuff"
       className="w-full h-auto">
    {/* Torso */}
    <path d="M50,40 L230,40 L230,220 L50,220 Z"
          fill={SkinTone} stroke={SkinEdge}/>
    {/* Subclavian vein */}
    <path d="M70,80 C110,80 140,75 165,70" stroke={VeinColor} strokeWidth={4} fill="none"/>
    {/* SVC */}
    <path d="M165,70 L165,140" stroke={VeinColor} strokeWidth={4} fill="none"/>
    {/* Heart */}
    <ellipse cx="160" cy="160" rx="22" ry="20" fill="hsl(0 40% 80%)" stroke={FgEdge} strokeOpacity={0.4}/>

    {/* Tunnel — from chest exit site, subcutaneously to venotomy */}
    {/* Exit site on chest wall */}
    <circle cx="120" cy="160" r="4" fill="hsl(28 50% 70%)" stroke={FgEdge} strokeOpacity={0.6} />
    {/* Subcutaneous tunnel (dashed under skin) */}
    <path d="M120,160 L150,100 L165,82" stroke={CatheterColor} strokeWidth={3} fill="none" strokeDasharray="3 2"/>
    {/* Cuff in tunnel */}
    <rect x="135" y="125" width="10" height="6" rx="1.5" fill="hsl(35 40% 55%)" stroke={FgEdge} strokeOpacity={0.6}/>
    {/* Intravascular segment */}
    <path d="M165,82 L165,145" stroke={CatheterColor} strokeWidth={3} fill="none"/>
    <circle cx="165" cy="145" r="2.5" fill={FgEdge}/>

    {/* External catheter + bifurcated hub */}
    <path d="M120,160 L100,180" stroke={CatheterColor} strokeWidth={3} fill="none"/>
    <rect x="88" y="178" width="14" height="5" rx="1" fill="hsl(0 70% 50%)" stroke={FgEdge} strokeOpacity={0.4}/>
    <rect x="88" y="184" width="14" height="5" rx="1" fill="hsl(220 60% 50%)" stroke={FgEdge} strokeOpacity={0.4}/>

    {/* Labels */}
    <text x="80" y="155" textAnchor="end" {...labelStyle as object}>Skin exit site</text>
    {leader(82, 158, 116, 160)}
    <text x="220" y="125" textAnchor="end" {...labelStyle as object}>Dacron cuff —</text>
    <text x="220" y="136" textAnchor="end" {...labelStyle as object}>tissue ingrowth, infection barrier</text>
    {leader(180, 128, 145, 128)}
    <text x="220" y="80" {...labelStyle as object}>Venotomy:</text>
    <text x="220" y="91" {...labelStyle as object}>subclavian v.</text>
    {leader(218, 80, 168, 78)}
    <text x="20" y="195" {...labelStyle as object}>External hub</text>
    {leader(60, 192, 90, 184)}
  </svg>
);

// ─── 5. Implanted port (Portacath) ────────────────────────────────────
const Portacath: React.FC = () => (
  <svg viewBox="0 0 280 240" role="img" aria-label="Implanted subcutaneous port with Huber needle"
       className="w-full h-auto">
    {/* Torso */}
    <path d="M50,40 L230,40 L230,220 L50,220 Z" fill={SkinTone} stroke={SkinEdge}/>
    {/* Subclavian vein */}
    <path d="M70,80 C110,80 140,75 165,70" stroke={VeinColor} strokeWidth={4} fill="none"/>
    <path d="M165,70 L165,140" stroke={VeinColor} strokeWidth={4} fill="none"/>
    <ellipse cx="160" cy="160" rx="22" ry="20" fill="hsl(0 40% 80%)" stroke={FgEdge} strokeOpacity={0.4}/>

    {/* Port reservoir under skin */}
    <ellipse cx="110" cy="130" rx="18" ry="12" fill="hsl(210 25% 55%)" stroke={FgEdge} strokeOpacity={0.6}/>
    {/* Septum */}
    <ellipse cx="110" cy="130" rx="9" ry="6" fill="hsl(280 30% 35%)" />
    {/* Catheter from port to SVC */}
    <path d="M125,125 C145,110 158,90 165,82" stroke={CatheterColor} strokeWidth={3} fill="none"/>
    <path d="M165,82 L165,145" stroke={CatheterColor} strokeWidth={3} fill="none"/>
    <circle cx="165" cy="145" r="2.5" fill={FgEdge}/>

    {/* Huber needle — non-coring, accessing through skin */}
    <line x1="110" y1="95" x2="110" y2="124" stroke="hsl(0 0% 30%)" strokeWidth={1.5}/>
    <path d="M105,90 L115,90 L113,98 L107,98 Z" fill="hsl(0 0% 50%)" stroke={FgEdge} strokeOpacity={0.5}/>

    {/* Skin line indicator over port */}
    <path d="M75,118 C90,115 130,115 145,118" stroke={SkinEdge} strokeDasharray="2 2" fill="none"/>

    {/* Labels */}
    <text x="20" y="100" {...labelStyle as object}>Huber (non-coring)</text>
    <text x="20" y="111" {...labelStyle as object}>needle through skin</text>
    {leader(75, 98, 108, 92)}
    <text x="220" y="135" textAnchor="end" {...labelStyle as object}>Self-sealing silicone septum</text>
    {leader(160, 132, 120, 130)}
    <text x="220" y="170" textAnchor="end" {...labelStyle as object}>Reservoir in subcutaneous pocket</text>
    {leader(180, 167, 125, 138)}
    <text x="220" y="80" {...labelStyle as object}>Tip at cavoatrial junction</text>
    {leader(218, 83, 168, 145)}
  </svg>
);

// ─── Wrapper ──────────────────────────────────────────────────────────
export const VascularAccessTypesDiagram: React.FC = () => (
  <figure className="my-6 rounded-xl border border-border bg-card overflow-hidden">
    <figcaption className="px-4 py-3 border-b border-border bg-muted/30">
      <p className="text-sm font-semibold text-foreground">
        Device archetypes — anatomy, dwell time and supporting evidence
      </p>
      <p className="text-xs text-muted-foreground mt-0.5">
        Five labelled schematics matching the dwell-time and site evidence
        tables. Each plate shows the skin entry site, intravascular course,
        tip position and the device-defining feature (cuff, septum,
        multi-lumen hub). Read alongside the Rickard 2012 / epic3 / 3SITES
        evidence summarised in the Key Learning Points.
      </p>
    </figcaption>
    <div className="p-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <Plate
        title="1 · Peripheral cannula"
        dwell="Remove when clinically indicated (no fixed 72–96 h)"
        evidence="Rickard 2012 (Lancet); Cochrane 2019; epic3"
      >
        <PeripheralCannula />
      </Plate>
      <Plate
        title="2 · PICC"
        dwell="Weeks to months (≤ 6 months typical)"
        evidence="CRBSI ≈ 1.1/1000 catheter-days (Maki 2006)"
      >
        <PICC />
      </Plate>
      <Plate
        title="3 · Non-tunnelled CVC"
        dwell="≤ 7–14 days (no routine replacement — CDC 2017)"
        evidence="3SITES (Parienti 2015): SCV < IJV < femoral CRBSI"
      >
        <NonTunnelledCVC />
      </Plate>
      <Plate
        title="4 · Tunnelled line (Hickman / Groshong / Permcath)"
        dwell="Months to years"
        evidence="Subcutaneous Dacron cuff ↓ CRBSI vs non-tunnelled"
      >
        <TunnelledLine />
      </Plate>
      <Plate
        title="5 · Implanted port (Portacath)"
        dwell="Years (intermittent access)"
        evidence="Lowest CRBSI of any CVAD ≈ 0.1/1000 catheter-days"
      >
        <Portacath />
      </Plate>
    </div>
  </figure>
);

export default VascularAccessTypesDiagram;
