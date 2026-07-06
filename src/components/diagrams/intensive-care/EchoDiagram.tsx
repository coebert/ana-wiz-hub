import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DiagramFigure } from "./_shared/DiagramFigure";

type DopplerJet =
  | "off"
  | "normal"
  | "mr"
  | "ar"
  | "tr"
  | "ms";

const EchoDiagram = () => {
  const [selectedView, setSelectedView] = useState<string | null>(null);
  const [selectedMeasurement, setSelectedMeasurement] = useState<string | null>(null);
  const [selectedFUSE, setSelectedFUSE] = useState<number | null>(null);
  const [doppler, setDoppler] = useState<DopplerJet>("off");

  // Reusable ultrasound sector frame — mimics the fan-shaped image with depth markers
  const SectorFrame = () => (
    <g>
      <defs>
        <clipPath id="sector-clip">
          <path d="M 200,5 L 60,235 A 180,180 0 0 0 340,235 Z" />
        </clipPath>
        <radialGradient id="sector-bg" cx="200" cy="5" r="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0a0a0a" />
          <stop offset="60%" stopColor="#050505" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>
      </defs>
      <path d="M 200,5 L 60,235 A 180,180 0 0 0 340,235 Z" fill="url(#sector-bg)" stroke="hsl(var(--border))" strokeWidth="0.5" />
      {[60, 110, 160, 210].map((r) => (
        <path key={r} d={`M ${200 - r * 0.6},${5 + r * 0.8} A ${r},${r} 0 0 0 ${200 + r * 0.6},${5 + r * 0.8}`}
          fill="none" stroke="hsl(var(--background))" strokeWidth="0.5" opacity="0.18" strokeDasharray="2 3" />
      ))}
      <circle cx="92" cy="60" r="2.5" fill="hsl(var(--primary))" />
      <text x="88" y="50" fontSize="5" fill="hsl(var(--background))" opacity="0.7" textAnchor="end">probe ▸</text>
      <text x="345" y="240" fontSize="6" fill="hsl(var(--background))" opacity="0.6" textAnchor="end">16 cm</text>
    </g>
  );

  const DopplerDefs = () => (
    <defs>
      <radialGradient id="jet-red" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ff2a2a" stopOpacity="0.95" />
        <stop offset="60%" stopColor="#ff7a3a" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#ff2a2a" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="jet-blue" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#2a6dff" stopOpacity="0.95" />
        <stop offset="60%" stopColor="#3acfff" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#2a6dff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="jet-mosaic" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2a6dff" stopOpacity="0.9" />
        <stop offset="25%" stopColor="#3acfff" stopOpacity="0.85" />
        <stop offset="45%" stopColor="#7dfb6e" stopOpacity="0.85" />
        <stop offset="65%" stopColor="#fff04a" stopOpacity="0.9" />
        <stop offset="85%" stopColor="#ff7a3a" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#ff2a2a" stopOpacity="0.95" />
      </linearGradient>
      <radialGradient id="pisa-shell" cx="50%" cy="100%" r="80%">
        <stop offset="0%" stopColor="#fff04a" stopOpacity="0" />
        <stop offset="60%" stopColor="#fff04a" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#ff7a3a" stopOpacity="0" />
      </radialGradient>
    </defs>
  );

  const DopplerScale = () => (
    <g>
      <rect x="350" y="55" width="6" height="55" fill="url(#jet-mosaic)" stroke="hsl(var(--accent))" strokeWidth="0.5" />
      <text x="358" y="60" fontSize="5" fill="hsl(var(--destructive))" fontWeight="700">+0.6</text>
      <text x="358" y="86" fontSize="5" fill="hsl(var(--accent))">0</text>
      <text x="358" y="112" fontSize="5" fill="hsl(var(--primary))" fontWeight="700">−0.6</text>
      <text x="358" y="120" fontSize="4" fill="hsl(var(--accent))" opacity="0.8">m/s Nyq</text>
    </g>
  );

  const PlaxDoppler = ({ mode }: { mode: DopplerJet }) => {
    if (mode === "off") return null;
    return (
      <g clipPath="url(#sector-clip)" style={{ mixBlendMode: "screen" }}>
        {mode === "normal" && (
          <>
            <ellipse cx="215" cy="135" rx="22" ry="12" fill="url(#jet-red)" transform="rotate(-25 215 135)" />
            <ellipse cx="295" cy="115" rx="20" ry="9" fill="url(#jet-blue)" transform="rotate(-15 295 115)" />
            <text x="218" y="128" fontSize="5" fill="hsl(var(--accent))" fontWeight="700">MV inflow</text>
            <text x="282" y="108" fontSize="5" fill="hsl(var(--accent))" fontWeight="700">LVOT→Ao</text>
          </>
        )}
        {mode === "mr" && (
          <>
            <path d="M 252,150 Q 285,160 320,180 Q 305,195 280,195 Q 260,180 248,158 Z" fill="url(#jet-mosaic)" opacity="0.92" />
            <path d="M 235,148 A 10,10 0 0 1 255,148 Z" fill="url(#pisa-shell)" />
            <line x1="245" y1="148" x2="245" y2="138" stroke="hsl(var(--accent))" strokeWidth="0.5" strokeDasharray="1 1" />
            <text x="248" y="140" fontSize="5" fill="hsl(var(--accent))" fontWeight="700">PISA r</text>
            <text x="295" y="172" fontSize="6" fill="hsl(var(--accent))" fontWeight="700">MR jet</text>
            <text x="295" y="180" fontSize="4" fill="hsl(var(--accent))" opacity="0.85">(mosaic = aliased)</text>
          </>
        )}
        {mode === "ar" && (
          <>
            <path d="M 290,118 Q 270,135 240,160 Q 225,170 215,158 Q 235,135 270,115 Z" fill="url(#jet-mosaic)" opacity="0.9" />
            <text x="225" y="155" fontSize="6" fill="hsl(var(--accent))" fontWeight="700">AR jet</text>
            <text x="225" y="163" fontSize="4" fill="hsl(var(--accent))" opacity="0.85">(diastolic, into LV)</text>
          </>
        )}
        {mode === "ms" && (
          <>
            <path d="M 248,148 Q 235,160 220,172 Q 200,178 180,170 Q 200,160 230,150 Z" fill="url(#jet-mosaic)" opacity="0.92" />
            <path d="M 240,152 A 9,9 0 0 0 258,152 Z" fill="url(#pisa-shell)" transform="rotate(180 249 152)" />
            <text x="195" y="168" fontSize="6" fill="hsl(var(--accent))" fontWeight="700">MS jet</text>
            <text x="195" y="176" fontSize="4" fill="hsl(var(--accent))" opacity="0.85">(diastolic, narrow)</text>
          </>
        )}
        {mode === "tr" && (
          <text x="200" y="80" fontSize="6" fill="hsl(var(--accent))" fontWeight="700" textAnchor="middle">TR best seen on A4C</text>
        )}
        <DopplerScale />
      </g>
    );
  };

  const A4cDoppler = ({ mode }: { mode: DopplerJet }) => {
    if (mode === "off") return null;
    return (
      <g clipPath="url(#sector-clip)" style={{ mixBlendMode: "screen" }}>
        {mode === "normal" && (
          <>
            <ellipse cx="170" cy="180" rx="18" ry="10" fill="url(#jet-red)" />
            <ellipse cx="225" cy="172" rx="15" ry="9" fill="url(#jet-red)" />
            <text x="148" y="178" fontSize="5" fill="hsl(var(--accent))" fontWeight="700">MV in</text>
            <text x="232" y="170" fontSize="5" fill="hsl(var(--accent))" fontWeight="700">TV in</text>
          </>
        )}
        {mode === "mr" && (
          <>
            <path d="M 178,200 Q 175,212 175,222 Q 195,228 205,222 Q 200,210 192,200 Z" fill="url(#jet-mosaic)" opacity="0.92" />
            <path d="M 175,198 A 8,8 0 0 1 191,198 Z" fill="url(#pisa-shell)" transform="rotate(180 183 198)" />
            <text x="148" y="218" fontSize="6" fill="hsl(var(--accent))" fontWeight="700">MR jet</text>
            <text x="148" y="225" fontSize="4" fill="hsl(var(--accent))" opacity="0.85">(into LA)</text>
          </>
        )}
        {mode === "tr" && (
          <>
            <path d="M 222,193 Q 230,210 240,222 Q 248,225 245,210 Q 235,198 228,190 Z" fill="url(#jet-mosaic)" opacity="0.92" />
            <text x="252" y="215" fontSize="6" fill="hsl(var(--accent))" fontWeight="700">TR jet</text>
            <text x="252" y="222" fontSize="4" fill="hsl(var(--accent))" opacity="0.85">→ PASP (Bernoulli)</text>
          </>
        )}
        {mode === "ms" && (
          <>
            <path d="M 178,196 Q 168,180 158,165 Q 148,150 155,140 Q 175,160 188,190 Z" fill="url(#jet-mosaic)" opacity="0.92" />
            <text x="130" y="158" fontSize="6" fill="hsl(var(--accent))" fontWeight="700">MS jet</text>
            <text x="130" y="165" fontSize="4" fill="hsl(var(--accent))" opacity="0.85">(diastolic, narrow)</text>
          </>
        )}
        {mode === "ar" && (
          <>
            <text x="160" y="120" fontSize="6" fill="hsl(var(--accent))" fontWeight="700">AR not well seen on A4C</text>
            <text x="160" y="128" fontSize="5" fill="hsl(var(--accent))" opacity="0.85">— use PLAX / A5C</text>
          </>
        )}
        <DopplerScale />
      </g>
    );
  };

  const views = [
    {
      id: "plax",
      name: "PLAX",
      full: "Parasternal Long Axis",
      probe: "Left parasternal border, 3rd–4th intercostal space. Marker to right shoulder. Patient left lateral decubitus.",
      structures: "RV (anterior), IVS, LV cavity, mitral valve (anterior + posterior leaflets), LVOT, aortic valve, aortic root, LA (posterior), descending aorta (behind LA in cross-section).",
      measures: "LV dimensions (LVIDd/LVIDs — M-mode), IVS and posterior wall thickness, aortic root diameter, LA anteroposterior diameter, E-point septal separation (EPSS — quick LVEF estimate: >7 mm suggests ↓EF).",
      pathology: "Pericardial effusion (posterior to LV, anterior to descending aorta — distinguishes from pleural effusion which tracks behind aorta). MV prolapse. Aortic dissection flap. LVH. RWMA.",
      svg: (
        <svg viewBox="0 0 400 250" className="w-full h-auto">
          <SectorFrame />
          <g clipPath="url(#sector-clip)">
            {/* Anterior chest wall echo (bright top band) */}
            <rect x="60" y="48" width="280" height="6" fill="hsl(var(--accent))" opacity="0.5" />
            {/* RV */}
            <path d="M 110,58 Q 150,55 215,62 L 220,95 Q 165,90 115,92 Z" fill="hsl(var(--foreground))" stroke="hsl(var(--accent))" strokeWidth="1" />
            {/* IVS */}
            <path d="M 115,92 Q 175,98 240,108 L 240,118 Q 175,108 115,103 Z" fill="hsl(var(--accent))" opacity="0.85" />
            {/* LV cavity */}
            <path d="M 115,103 Q 175,108 240,118 L 270,165 Q 200,180 120,165 Z" fill="hsl(var(--foreground))" stroke="hsl(var(--accent))" strokeWidth="1" />
            {/* Posterior wall */}
            <path d="M 120,165 Q 200,180 270,165 L 275,180 Q 200,195 120,180 Z" fill="hsl(var(--accent))" opacity="0.85" />
            {/* Mitral valve leaflets */}
            <path d="M 240,108 Q 248,128 245,148" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" />
            <path d="M 270,118 Q 262,138 250,148" fill="none" stroke="hsl(var(--accent))" strokeWidth="1.5" />
            {/* Chordae */}
            <line x1="245" y1="148" x2="232" y2="170" stroke="hsl(var(--accent))" strokeWidth="0.5" opacity="0.7" />
            <line x1="250" y1="148" x2="240" y2="172" stroke="hsl(var(--accent))" strokeWidth="0.5" opacity="0.7" />
            {/* LVOT + Aortic root */}
            <path d="M 240,108 L 290,80 L 320,90 L 325,135 L 280,148 L 270,118 Z" fill="hsl(var(--foreground))" stroke="hsl(var(--accent))" strokeWidth="1" />
            {/* AV cusps */}
            <line x1="278" y1="100" x2="282" y2="115" stroke="hsl(var(--accent))" strokeWidth="1" />
            <line x1="305" y1="105" x2="301" y2="120" stroke="hsl(var(--accent))" strokeWidth="1" />
            <path d="M 282,115 Q 292,128 301,120" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.5" opacity="0.7" />
            {/* LA */}
            <path d="M 270,148 Q 320,160 335,180 L 330,205 Q 280,205 245,190 Z" fill="hsl(var(--foreground))" stroke="hsl(var(--accent))" strokeWidth="1" />
            {/* Descending aorta */}
            <circle cx="295" cy="215" r="9" fill="hsl(var(--foreground))" stroke="hsl(var(--accent))" strokeWidth="1" />
            {/* Pericardium */}
            <path d="M 120,180 Q 200,195 275,180" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.75" opacity="0.6" strokeDasharray="3 2" />
            {/* M-mode caliper line */}
            <line x1="180" y1="92" x2="180" y2="180" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.6" strokeDasharray="2 2" />
          </g>
          {/* Labels (outside clipPath so never clipped) */}
          <g fontFamily="system-ui, sans-serif">
            <text x="160" y="78" fontSize="9" fill="hsl(var(--accent))" fontWeight="700">RV</text>
            <text x="180" y="105" fontSize="6" fill="hsl(var(--foreground))" fontWeight="600">IVS</text>
            <text x="180" y="148" fontSize="14" fill="hsl(var(--accent))" fontWeight="800" textAnchor="middle">LV</text>
            <text x="200" y="175" fontSize="6" fill="hsl(var(--foreground))" fontWeight="600" textAnchor="middle">PW</text>
            <text x="247" y="135" fontSize="6" fill="hsl(var(--accent))" fontWeight="600">AMVL</text>
            <text x="252" y="158" fontSize="6" fill="hsl(var(--accent))" fontWeight="600">PMVL</text>
            <text x="298" y="113" fontSize="6.5" fill="hsl(var(--accent))" fontWeight="600">Ao root</text>
            <text x="278" y="95" fontSize="6" fill="hsl(var(--accent))" fontWeight="600">AV</text>
            <text x="290" y="178" fontSize="11" fill="hsl(var(--accent))" fontWeight="800">LA</text>
            <text x="295" y="218" fontSize="5" fill="hsl(var(--accent))" fontWeight="600" textAnchor="middle">DAo</text>
            <text x="160" y="200" fontSize="5" fill="hsl(var(--accent))" opacity="0.7">pericardium</text>
            <text x="184" y="135" fontSize="5" fill="hsl(var(--primary))" opacity="0.85">M-mode</text>
          </g>
          <PlaxDoppler mode={doppler} />
          <DopplerDefs />
          <text x="200" y="245" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">Parasternal Long Axis — anatomical orientation</text>
        </svg>
      ),
    },
    {
      id: "psax",
      name: "PSAX",
      full: "Parasternal Short Axis",
      probe: "Same position as PLAX, rotate probe 90° clockwise. Marker to left shoulder. Tilt to scan from base (aortic valve) to apex.",
      structures: "Base level: aortic valve (3 cusps — 'Mercedes-Benz' sign), LA, RA, RVOT, TV, PV. Mid-papillary level: circular LV ('doughnut'), papillary muscles (2), RV crescent. Apical level: LV cavity only.",
      measures: "LV wall motion (16-segment model — each coronary territory visualised). LV geometry (D-shaped = RV pressure/volume overload). Fractional area change. AV morphology (bicuspid = 2 cusps).",
      pathology: "RWMA (corresponds to coronary territories — LAD anterior, RCA inferior, LCx lateral). RV dilatation (D-shaped septum). VSD (colour Doppler at septal level). Bicuspid AV.",
      svg: (
        <svg viewBox="0 0 400 250" className="w-full h-auto">
          <SectorFrame />
          <g clipPath="url(#sector-clip)">
            {/* LV — circular doughnut */}
            <circle cx="200" cy="148" r="58" fill="hsl(var(--accent))" opacity="0.9" />
            <circle cx="200" cy="148" r="42" fill="hsl(var(--foreground))" stroke="hsl(var(--accent))" strokeWidth="1.5" />
            {/* Coronary segmentation lines */}
            <g stroke="hsl(var(--accent))" strokeWidth="0.5" opacity="0.45" fill="none">
              <line x1="200" y1="106" x2="200" y2="190" />
              <line x1="163" y1="127" x2="237" y2="169" />
              <line x1="163" y1="169" x2="237" y2="127" />
            </g>
            {/* Papillary muscles */}
            <ellipse cx="174" cy="128" rx="6" ry="5" fill="hsl(var(--accent))" opacity="0.9" />
            <ellipse cx="222" cy="172" rx="6" ry="5" fill="hsl(var(--accent))" opacity="0.9" />
            {/* RV crescent */}
            <path d="M 155,90 Q 100,135 165,205 Q 180,180 168,148 Q 160,115 185,95 Z" fill="hsl(var(--foreground))" stroke="hsl(var(--accent))" strokeWidth="1.5" />
            <circle cx="200" cy="148" r="60" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.5" opacity="0.5" strokeDasharray="3 2" />
          </g>
          {/* Labels — placed outside clipPath but inside the visible sector area */}
          <g fontFamily="system-ui, sans-serif">
            <text x="200" y="151" fontSize="13" fill="hsl(var(--accent))" fontWeight="800" textAnchor="middle">LV</text>
            <text x="128" y="148" fontSize="10" fill="hsl(var(--accent))" fontWeight="800" textAnchor="middle">RV</text>
            <text x="187" y="151" fontSize="5" fill="hsl(var(--foreground))" fontWeight="700" textAnchor="middle">IVS</text>
            {/* Coronary territory labels — moved INSIDE the donut sector, around the ring */}
            <text x="200" y="118" fontSize="5.5" fill="hsl(var(--destructive))" fontWeight="700" textAnchor="middle">ANT (LAD)</text>
            <text x="226" y="132" fontSize="5" fill="hsl(var(--primary))" fontWeight="700" textAnchor="middle">ANT-SEPT</text>
            <text x="226" y="170" fontSize="5" fill="hsl(var(--clinical))" fontWeight="700" textAnchor="middle">INF-SEPT</text>
            <text x="200" y="186" fontSize="5.5" fill="hsl(var(--accent))" fontWeight="700" textAnchor="middle">INF (RCA)</text>
            <text x="174" y="170" fontSize="5" fill="hsl(var(--pharmacology))" fontWeight="700" textAnchor="middle">INF-LAT</text>
            <text x="174" y="132" fontSize="5" fill="hsl(var(--accent))" fontWeight="700" textAnchor="middle">ANT-LAT</text>
            <text x="170" y="120" fontSize="4.5" fill="hsl(var(--accent))" opacity="0.85">AL pap</text>
            <text x="226" y="186" fontSize="4.5" fill="hsl(var(--accent))" opacity="0.85">PM pap</text>
          </g>
          {/* AV inset — moved BELOW the sector tip on the right, fully visible */}
          <g transform="translate(345,150)">
            <rect x="-32" y="-30" width="64" height="60" fill="hsl(var(--foreground))" stroke="hsl(var(--border))" strokeWidth="0.5" rx="2" />
            <circle cx="0" cy="-3" r="18" fill="hsl(var(--foreground))" stroke="hsl(var(--accent))" strokeWidth="1" />
            <line x1="0" y1="-3" x2="0" y2="-21" stroke="hsl(var(--accent))" strokeWidth="1" />
            <line x1="0" y1="-3" x2="15.6" y2="6" stroke="hsl(var(--accent))" strokeWidth="1" />
            <line x1="0" y1="-3" x2="-15.6" y2="6" stroke="hsl(var(--accent))" strokeWidth="1" />
            <text x="0" y="-22" fontSize="5" fill="hsl(var(--accent))" textAnchor="middle">L</text>
            <text x="14" y="10" fontSize="5" fill="hsl(var(--accent))">R</text>
            <text x="-14" y="10" fontSize="5" fill="hsl(var(--accent))" textAnchor="end">N</text>
            <text x="0" y="24" fontSize="5" fill="hsl(var(--accent))" textAnchor="middle" fontWeight="600">AV (base)</text>
          </g>
          <text x="200" y="245" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">PSAX mid-papillary — 6 coronary segments + AV inset</text>
        </svg>
      ),
    },
    {
      id: "a4c",
      name: "A4C",
      full: "Apical 4-Chamber",
      probe: "Apex (PMI, 5th ICS mid-clavicular line). Marker to patient's left. Left lateral decubitus position essential.",
      structures: "All four chambers simultaneously. MV and TV (TV more apical — if MV more apical, suspect AV canal defect). IAS (foramen ovale region). IVS. Moderator band (RV). Pulmonary veins entering LA.",
      measures: "LVEF (Simpson's biplane — trace LV endocardium in systole and diastole). TAPSE (tricuspid annular plane systolic excursion — RV function, normal >17 mm). MV E/A ratio (diastolic function). E/e' ratio (LV filling pressures). TR velocity (estimate PASP). LV volumes.",
      pathology: "RWMA. LV thrombus (apex). Pericardial effusion. Valvular regurgitation (colour Doppler). ASD (dropout at IAS — confirm with bubble study). RV dilatation (RV:LV ratio >0.6).",
      svg: (
        <svg viewBox="0 0 400 250" className="w-full h-auto">
          <SectorFrame />
          <g clipPath="url(#sector-clip)">
            {/* LV */}
            <path d="M 200,55 Q 165,70 145,100 Q 132,135 138,170 Q 148,195 195,200 L 200,135 Z" fill="hsl(var(--foreground))" stroke="hsl(var(--accent))" strokeWidth="1.5" />
            {/* RV */}
            <path d="M 200,55 Q 232,70 252,100 Q 263,130 258,162 Q 248,182 205,188 L 200,135 Z" fill="hsl(var(--foreground))" stroke="hsl(var(--accent))" strokeWidth="1.5" />
            {/* Moderator band */}
            <line x1="218" y1="155" x2="245" y2="170" stroke="hsl(var(--accent))" strokeWidth="1" opacity="0.7" />
            {/* IVS */}
            <path d="M 200,60 L 198,135 L 200,195" fill="none" stroke="hsl(var(--accent))" strokeWidth="3" opacity="0.9" />
            {/* MV */}
            <line x1="148" y1="200" x2="180" y2="195" stroke="hsl(var(--accent))" strokeWidth="1.5" />
            <line x1="180" y1="195" x2="200" y2="200" stroke="hsl(var(--accent))" strokeWidth="1.5" />
            {/* TV */}
            <line x1="200" y1="195" x2="220" y2="190" stroke="hsl(var(--accent))" strokeWidth="1.5" />
            <line x1="220" y1="190" x2="252" y2="185" stroke="hsl(var(--accent))" strokeWidth="1.5" />
            {/* Atria */}
            <path d="M 148,200 Q 150,225 200,228 Q 250,225 252,185 L 220,190 L 200,200 Z" fill="hsl(var(--foreground))" stroke="hsl(var(--accent))" strokeWidth="1.5" />
            {/* IAS */}
            <line x1="200" y1="200" x2="200" y2="228" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.9" />
            {/* Pulmonary vein */}
            <path d="M 150,225 Q 135,232 122,230" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" opacity="0.7" />
            {/* TAPSE caliper */}
            <line x1="252" y1="185" x2="252" y2="170" stroke="hsl(var(--primary))" strokeWidth="0.5" />
            <line x1="248" y1="185" x2="256" y2="185" stroke="hsl(var(--primary))" strokeWidth="0.5" />
            <line x1="248" y1="170" x2="256" y2="170" stroke="hsl(var(--primary))" strokeWidth="0.5" />
          </g>
          {/* Labels outside clipPath */}
          <g fontFamily="system-ui, sans-serif">
            <text x="200" y="50" fontSize="6" fill="hsl(var(--accent))" textAnchor="middle" fontWeight="700">apex</text>
            <text x="170" y="135" fontSize="13" fill="hsl(var(--accent))" fontWeight="800" textAnchor="middle">LV</text>
            <text x="232" y="125" fontSize="11" fill="hsl(var(--accent))" fontWeight="800" textAnchor="middle">RV</text>
            <text x="184" y="80" fontSize="5" fill="hsl(var(--accent))" opacity="0.85">IVS</text>
            <text x="218" y="165" fontSize="4.5" fill="hsl(var(--accent))" opacity="0.85">mod band</text>
            <text x="158" y="192" fontSize="6" fill="hsl(var(--accent))" fontWeight="700">MV</text>
            <text x="232" y="184" fontSize="6" fill="hsl(var(--accent))" fontWeight="700">TV</text>
            <text x="172" y="221" fontSize="10" fill="hsl(var(--accent))" fontWeight="800">LA</text>
            <text x="222" y="218" fontSize="10" fill="hsl(var(--accent))" fontWeight="800">RA</text>
            <text x="184" y="217" fontSize="5" fill="hsl(var(--accent))" opacity="0.85">IAS</text>
            <text x="118" y="240" fontSize="5" fill="hsl(var(--accent))" opacity="0.7" textAnchor="end">PV</text>
            <text x="260" y="180" fontSize="5" fill="hsl(var(--primary))" fontWeight="700">TAPSE</text>
          </g>
          <A4cDoppler mode={doppler} />
          <DopplerDefs />
          <text x="200" y="245" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">Apical 4-chamber — apex at top, RV:LV ratio assessable</text>
        </svg>
      ),
    },
    {
      id: "subcostal",
      name: "Subcostal",
      full: "Subcostal / Subxiphoid",
      probe: "Below xiphisternum, probe flat, angled towards left shoulder. Patient supine with knees bent (relaxes abdominal wall). Best view in ventilated patients (PLAX/A4C difficult).",
      structures: "Four chambers (liver as acoustic window). IVC entering RA (subcostal IVC view — rotate 90°). Pericardium (best view for effusion — gravity-dependent fluid anterior to RV). Hepatic veins. IAS (best view for ASD detection).",
      measures: "IVC diameter and collapsibility (inspiratory collapse >50% with sniff = CVP ~3 mmHg; <50% collapse = CVP ~15 mmHg). Pericardial effusion quantification. RV wall thickness.",
      pathology: "Pericardial effusion and tamponade (RA/RV diastolic collapse). IVC plethora (dilated, non-collapsible = ↑CVP). ASD (bubble study — early bubbles in LA). Peritoneal free fluid.",
      svg: (
        <svg viewBox="0 0 400 250" className="w-full h-auto">
          <SectorFrame />
          <defs>
            <marker id="arrow-down-sm" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
              <path d="M 0,0 L 4,2 L 0,4 Z" fill="hsl(var(--clinical))" />
            </marker>
            <marker id="arrow-up-sm" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto-start-reverse">
              <path d="M 0,0 L 4,2 L 0,4 Z" fill="hsl(var(--clinical))" />
            </marker>
          </defs>
          <g clipPath="url(#sector-clip)">
            {/* Liver — narrowed to fit sector */}
            <path d="M 95,55 Q 200,52 305,62 L 295,108 Q 200,113 105,106 Z" fill="hsl(var(--accent))" opacity="0.55" />
            <path d="M 260,75 Q 235,90 222,108" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.7" />
            {/* RA — shifted right and narrowed */}
            <path d="M 105,118 Q 95,140 105,165 Q 130,176 158,168 L 158,120 Z" fill="hsl(var(--foreground))" stroke="hsl(var(--accent))" strokeWidth="1.5" />
            {/* RV */}
            <path d="M 158,120 L 158,168 Q 195,180 225,168 L 225,120 Z" fill="hsl(var(--foreground))" stroke="hsl(var(--accent))" strokeWidth="1.5" />
            {/* LA */}
            <path d="M 225,120 L 225,168 Q 250,176 275,165 L 275,122 Z" fill="hsl(var(--foreground))" stroke="hsl(var(--accent))" strokeWidth="1.5" />
            {/* LV — pulled INSIDE the sector (was at x=300-340, clipped) */}
            <path d="M 275,122 L 275,165 Q 295,178 312,168 L 312,127 Z" fill="hsl(var(--foreground))" stroke="hsl(var(--accent))" strokeWidth="1.5" />
            {/* Septae */}
            <line x1="225" y1="120" x2="225" y2="170" stroke="hsl(var(--accent))" strokeWidth="2" opacity="0.9" />
            <line x1="192" y1="122" x2="192" y2="170" stroke="hsl(var(--accent))" strokeWidth="0.5" opacity="0.6" />
            {/* AV valve plane */}
            <line x1="162" y1="143" x2="188" y2="143" stroke="hsl(var(--accent))" strokeWidth="1" />
            <line x1="196" y1="143" x2="221" y2="143" stroke="hsl(var(--accent))" strokeWidth="1" />
            <line x1="229" y1="143" x2="271" y2="143" stroke="hsl(var(--accent))" strokeWidth="1" />
            <line x1="279" y1="143" x2="308" y2="143" stroke="hsl(var(--accent))" strokeWidth="1" />
            {/* Pericardium */}
            <path d="M 105,118 Q 95,140 105,165 Q 200,185 312,168 L 312,127 Q 200,114 105,118 Z" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.5" opacity="0.55" strokeDasharray="3 2" />
          </g>
          {/* Labels outside clipPath */}
          <g fontFamily="system-ui, sans-serif">
            <text x="200" y="85" fontSize="9" fill="hsl(var(--accent))" fontWeight="700" textAnchor="middle">Liver (acoustic window)</text>
            <text x="263" y="73" fontSize="5" fill="hsl(var(--primary))">hepatic v.</text>
            <text x="125" y="148" fontSize="9" fill="hsl(var(--accent))" fontWeight="800">RA</text>
            <text x="190" y="148" fontSize="10" fill="hsl(var(--accent))" fontWeight="800" textAnchor="middle">RV</text>
            <text x="250" y="148" fontSize="9" fill="hsl(var(--accent))" fontWeight="800">LA</text>
            <text x="293" y="150" fontSize="9" fill="hsl(var(--accent))" fontWeight="800" textAnchor="middle">LV</text>
          </g>
          {/* IVC inset — moved BELOW sector so it doesn't overlap chambers */}
          <g transform="translate(200,225)">
            <rect x="-95" y="-15" width="190" height="28" fill="hsl(var(--foreground))" stroke="hsl(var(--border))" strokeWidth="0.5" rx="2" />
            <path d="M -88,2 Q -45,-3 0,-5 Q 45,-7 82,-9 L 82,-1 Q 45,3 0,5 Q -45,7 -88,10 Z" fill="hsl(var(--foreground))" stroke="hsl(var(--accent))" strokeWidth="0.75" />
            <text x="-78" y="3" fontSize="5" fill="hsl(var(--accent))" fontWeight="700">IVC</text>
            <line x1="-30" y1="-6" x2="-30" y2="6" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeDasharray="1 1" />
            <text x="-26" y="-7" fontSize="4" fill="hsl(var(--primary))">d</text>
            <circle cx="82" cy="-5" r="3" fill="hsl(var(--accent))" />
            <text x="86" y="-7" fontSize="4" fill="hsl(var(--accent))">→ RA</text>
            <path d="M 0,-12 L 0,-7" stroke="hsl(var(--clinical))" strokeWidth="0.5" markerEnd="url(#arrow-down-sm)" />
            <path d="M 0,11 L 0,6" stroke="hsl(var(--clinical))" strokeWidth="0.5" markerEnd="url(#arrow-up-sm)" />
            <text x="4" y="-10" fontSize="4" fill="hsl(var(--clinical))">inspiration</text>
            <text x="0" y="-10" fontSize="4" fill="hsl(var(--accent))" opacity="0.7" textAnchor="middle">IVC long-axis (90° rotation)</text>
          </g>
          <text x="200" y="248" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">Subcostal 4-chamber + IVC inset</text>
        </svg>
      ),
    },
  ];

  const measurements = [
    { id: "lvef", name: "LVEF", full: "LV Ejection Fraction", normal: ">55%", method: "Simpson's biplane (gold standard): trace LV endocardium at end-diastole and end-systole in A4C and A2C views. EF = (EDV − ESV) / EDV × 100. Eyeball estimate acceptable in emergencies. EPSS (E-point septal separation on PLAX M-mode): >7 mm suggests ↓EF.", grades: "Normal >55%. Mild ↓ 45–54%. Moderate ↓ 30–44%. Severe ↓ <30%.", clinical: "Most important single echo measurement. Guides inotrope therapy, device eligibility (ICD if EF ≤35%), surgical risk. Visual estimate correlates well with formal methods in experienced hands." },
    { id: "ea", name: "E/A Ratio", full: "Mitral Inflow Velocities", normal: "1–2 (age-dependent)", method: "PW Doppler at mitral leaflet tips in A4C. E wave = early passive filling (LV relaxation). A wave = atrial contraction ('atrial kick'). E/A ratio reflects diastolic function. Must interpret with tissue Doppler (e') and age.", grades: "Normal: E/A 1–2. Grade I (impaired relaxation): E/A <1, DT >200 ms. Grade II (pseudonormal): E/A 1–2 but e' reduced. Grade III (restrictive): E/A >2, DT <150 ms.", clinical: "Diastolic dysfunction grading. Pseudonormal pattern (looks normal but e' is low — use E/e' to unmask). Restrictive pattern = severe ↑filling pressures, poor prognosis." },
    { id: "ee", name: "E/e' Ratio", full: "LV Filling Pressure Estimate", normal: "<8 (normal), >14 (elevated)", method: "E = mitral inflow E wave (PW Doppler). e' = tissue Doppler velocity at mitral annulus (septal e' or lateral e'). Use average of septal and lateral e'. E/e' estimates LVEDP/PAOP non-invasively.", grades: "E/e' <8: normal filling pressures. 8–14: indeterminate (use other markers). >14: elevated filling pressures (correlates with PAOP >18 mmHg). Lateral e' normal >10 cm/s, septal e' normal >7 cm/s.", clinical: "Best non-invasive estimate of LV filling pressures. Remains reliable even with ↓EF (unlike E/A alone). Key in diagnosing HFpEF. E/e' >14 = likely elevated LAP = pulmonary congestion." },
    { id: "ivc", name: "IVC Assessment", full: "IVC Diameter & Collapsibility", normal: "1.5–2.5 cm, >50% collapse", method: "Subcostal view, long-axis of IVC entering RA. Measure diameter 2 cm from RA junction. Assess respiratory variation with sniff test (sharp inspiration). M-mode for precise measurement.", grades: "Small IVC (<1.5 cm) + >50% collapse: CVP ~0–5 mmHg. Normal IVC (1.5–2.5 cm) + >50% collapse: CVP ~5–10 mmHg. Dilated IVC (>2.5 cm) + <50% collapse: CVP ~15–20 mmHg. Fixed dilated IVC: CVP >20 mmHg.", clinical: "Quick volume status assessment. Plethoric IVC: RV failure, tamponade, PE, fluid overload. Collapsing IVC: hypovolaemia, may be fluid responsive (but poor PPV as isolated marker). In ventilated patients: distensibility index (opposite — IVC distends with inspiration)." },
    { id: "tapse", name: "TAPSE", full: "Tricuspid Annular Plane Systolic Excursion", normal: ">17 mm", method: "M-mode cursor through lateral tricuspid annulus in A4C. Measure total excursion of annulus towards apex during systole. Simple, reproducible, angle-dependent.", grades: "Normal >17 mm. Mild RV dysfunction 14–17 mm. Severe RV dysfunction <10 mm.", clinical: "Quick, reliable RV systolic function marker. Low TAPSE: acute PE (RV strain), RV infarct, pulmonary HTN, post-cardiac surgery (always reduced — unreliable after sternotomy). Prognostic in PE and heart failure." },
    { id: "pasp", name: "PASP", full: "Pulmonary Artery Systolic Pressure", normal: "<35 mmHg", method: "Continuous-wave Doppler across tricuspid valve in A4C (TR jet). Apply modified Bernoulli: PASP = 4 × (TR Vmax)² + RAP. RAP estimated from IVC diameter/collapsibility. Requires at least mild TR (present in ~70% of patients).", grades: "Normal <35 mmHg. Mild PH 35–45 mmHg. Moderate PH 45–60 mmHg. Severe PH >60 mmHg.", clinical: "Non-invasive estimate of PA systolic pressure. Requires TR jet — if absent, cannot calculate. May underestimate in severe TR (low velocity). Confirms pulmonary HTN but PAC remains gold standard for PH classification (pre- vs post-capillary)." },
  ];

  const fuseSteps = [
    { step: "LV Function", view: "A4C / PLAX", look: "Eyeball LVEF. Hyperdynamic (sepsis, hypovolaemia) vs severely impaired (cardiogenic). RWMA suggests MI. LV dilatation.", action: "↓EF: inotropes (dobutamine). RWMA: cardiology referral, consider PCI. Hyperdynamic + ↓BP: consider sepsis or hypovolaemia." },
    { step: "RV Size & Function", view: "A4C / Subcostal", look: "RV:LV ratio (normal <0.6, dilated >1.0). TAPSE (<17 mm = dysfunction). D-shaped septum (PSAX). McConnell's sign (apical sparing in acute PE).", action: "Dilated RV + haemodynamic compromise: consider PE (CTPA), thrombolysis if massive PE. RV infarct: fluid cautiously, avoid GTN/diuretics." },
    { step: "IVC & Volume Status", view: "Subcostal IVC", look: "IVC diameter + collapsibility. Small collapsing IVC → hypovolaemia. Plethoric IVC → ↑CVP (RV failure, tamponade, fluid overload).", action: "Collapsing IVC: fluid challenge. Plethoric IVC: stop fluids, consider vasopressors/inotropes, assess for tamponade/PE." },
    { step: "Pericardial Effusion", view: "Subcostal / PLAX", look: "Circumferential fluid (global). RA/RV diastolic collapse = tamponade. Swinging heart. Electrical alternans on ECG.", action: "Tamponade: pericardiocentesis (echo-guided, subcostal approach). Do NOT give diuretics. Fluid load to maintain preload. Call cardiology/surgery." },
    { step: "Pleural Effusion & Lung", view: "Posterior / lateral", look: "Anechoic fluid above diaphragm. Consolidated lung (tissue-like appearance). B-lines (vertical comet-tail artefacts from pleura = interstitial oedema — ≥3 per field is abnormal).", action: "Large effusion + respiratory failure: drain. B-lines: diuresis if cardiogenic. Consolidation: antibiotics. Absent lung sliding: pneumothorax." },
    { step: "Aorta", view: "PLAX / Subcostal / Suprasternal", look: "Aortic root dilatation (>4.0 cm). Dissection flap (intimal flap in ascending/descending aorta). Aortic regurgitation (colour Doppler).", action: "Dissection flap: urgent CT aortogram, BP control (esmolol/labetalol), call cardiothoracic surgery. Type A = surgical emergency." },
  ];

  return (
    <DiagramFigure
      id="echo-diagram"
      title="Echo"
      description="Auto-generated wrapper for the Echo anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 p-4 bg-muted/30 rounded-xl border border-border">
        <h3 className="text-lg font-bold text-foreground mb-1">Echocardiography for Anaesthesia & ICU</h3>
        <p className="text-sm text-muted-foreground mb-4">Standard views, key measurements, and focused echo in shock</p>
  
        <Tabs defaultValue="views" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="views" className="text-xs">Standard Views</TabsTrigger>
            <TabsTrigger value="measurements" className="text-xs">Measurements</TabsTrigger>
            <TabsTrigger value="fuse" className="text-xs">FUSE Protocol</TabsTrigger>
          </TabsList>
  
          <TabsContent value="views">
            <div className="grid grid-cols-2 gap-1.5 mb-3">
              {views.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedView(selectedView === v.id ? null : v.id)}
                  className={`p-2 rounded-lg border text-left transition-all text-xs ${selectedView === v.id ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
                >
                  <span className="font-bold text-foreground">{v.name}</span>
                  <p className="text-muted-foreground mt-0.5 text-[10px]">{v.full}</p>
                </button>
              ))}
            </div>
  
            {selectedView && (() => {
              const v = views.find((x) => x.id === selectedView)!;
              return (
                <div className="animate-fade-in space-y-3">
                  <div className="bg-background rounded-lg border border-border p-2">{v.svg}</div>
                  {(v.id === "plax" || v.id === "a4c") && (
                    <div className="p-2 rounded-lg border border-border bg-background space-y-2">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-[11px] font-semibold text-foreground">Colour Doppler overlay</span>
                        <span className="text-[10px] text-muted-foreground">Red = towards probe · Blue = away · Mosaic = aliased (above Nyquist)</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {([
                          { id: "off", label: "Off" },
                          { id: "normal", label: "Normal flow" },
                          { id: "mr", label: "MR" },
                          { id: "ar", label: "AR" },
                          { id: "tr", label: "TR" },
                          { id: "ms", label: "MS" },
                        ] as { id: DopplerJet; label: string }[]).map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => setDoppler(opt.id)}
                            className={`px-2 py-1 rounded text-[10px] font-semibold border transition-all ${doppler === opt.id ? "border-primary bg-primary/15 text-foreground ring-1 ring-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                      {doppler !== "off" && (
                        <div className="text-[11px] text-muted-foreground space-y-1 pt-1 border-t border-border">
                          {doppler === "normal" && (
                            <p><strong className="text-foreground">Normal flow:</strong> low-velocity laminar flow stays within the Nyquist limit, so colour stays pure red (towards probe) or pure blue (away). MV inflow appears red on PLAX/A4C in diastole; LVOT→Ao appears blue on PLAX in systole.</p>
                          )}
                          {doppler === "mr" && (
                            <p><strong className="text-foreground">Mitral regurgitation:</strong> high-velocity systolic jet from LV→LA. Mosaic colours indicate aliasing (velocity exceeds Nyquist limit ≈ ½ PRF). <strong className="text-foreground">PISA</strong> (proximal isovelocity surface area) — flow converges into hemispheric shells on the LV side; measure the radius (r) at the aliasing velocity (Va) to calculate <em>EROA = 2πr² × Va / Vmax</em>. Severe MR: EROA ≥0.4 cm², jet area &gt;40% of LA, vena contracta ≥7 mm.</p>
                          )}
                          {doppler === "ar" && (
                            <p><strong className="text-foreground">Aortic regurgitation:</strong> diastolic mosaic jet from aortic root back into the LV (PLAX or A5C). Severity by jet width / LVOT diameter ratio (&gt;65% = severe), vena contracta ≥6 mm, pressure half-time &lt;200 ms (severe), holodiastolic flow reversal in descending aorta.</p>
                          )}
                          {doppler === "tr" && (
                            <p><strong className="text-foreground">Tricuspid regurgitation:</strong> systolic jet RV→RA on A4C. CW Doppler peak velocity (TR Vmax) used to estimate <strong className="text-foreground">PASP = 4·(TR Vmax)² + RAP</strong> (modified Bernoulli). Mild TR is present in ~70% of normal subjects and is the main route to non-invasive PASP estimation.</p>
                          )}
                          {doppler === "ms" && (
                            <p><strong className="text-foreground">Mitral stenosis:</strong> narrow high-velocity diastolic mosaic jet through stenotic orifice (rheumatic in most cases). Severity by mean gradient (severe &gt;10 mmHg), pressure half-time (MVA = 220 / PHT; severe ≤1.0 cm²) and planimetered orifice area on PSAX.</p>
                          )}
                          <p className="pt-1 border-t border-border/60"><strong className="text-foreground">Nyquist limit:</strong> the maximum unambiguous velocity = ½ PRF. Velocities above this <em>alias</em> — red wraps to blue (or vice-versa), producing the characteristic mosaic. Lowering the Nyquist (colour scale) increases sensitivity to slow flow but worsens aliasing for high-velocity jets.</p>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-3 rounded-lg border border-primary/30 bg-primary/5 text-xs space-y-2">
                    <p className="font-bold text-foreground text-sm">{v.full} ({v.name})</p>
                    <div className="p-2 rounded bg-background border border-border">
                      <span className="font-semibold text-foreground">Probe position: </span>
                      <span className="text-muted-foreground">{v.probe}</span>
                    </div>
                    <div className="p-2 rounded bg-background border border-border">
                      <span className="font-semibold text-foreground">Structures: </span>
                      <span className="text-muted-foreground">{v.structures}</span>
                    </div>
                    <div className="p-2 rounded bg-background border border-border">
                      <span className="font-semibold text-foreground">Measurements: </span>
                      <span className="text-muted-foreground">{v.measures}</span>
                    </div>
                    <div className="p-2 rounded bg-primary/10 border border-primary/20">
                      <span className="font-semibold text-foreground">Pathology: </span>
                      <span className="text-muted-foreground">{v.pathology}</span>
                    </div>
                  </div>
                </div>
              );
            })()}
  
            {!selectedView && (
              <div className="p-3 rounded bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
                <strong className="text-foreground">Echo windows: </strong>
                Parasternal views use the cardiac notch (lung-free zone). Apical views: patient must be in left lateral decubitus. Subcostal: best window in ventilated/obese patients (liver as acoustic window). Always adjust gain, depth, and sector width before assessing.
              </div>
            )}
          </TabsContent>
  
          <TabsContent value="measurements">
            <p className="text-xs text-muted-foreground mb-3">Core quantitative measurements — tap for method and grading</p>
            <div className="grid grid-cols-2 gap-1.5 mb-3">
              {measurements.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMeasurement(selectedMeasurement === m.id ? null : m.id)}
                  className={`p-2 rounded-lg border text-left transition-all text-xs ${selectedMeasurement === m.id ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
                >
                  <span className="font-bold text-foreground">{m.name}</span>
                  <p className="text-muted-foreground mt-0.5 text-[10px]">{m.full}</p>
                  <p className="text-primary text-[10px] font-semibold mt-0.5">Normal: {m.normal}</p>
                </button>
              ))}
            </div>
  
            {selectedMeasurement && (() => {
              const m = measurements.find((x) => x.id === selectedMeasurement)!;
              return (
                    <div className="p-3 rounded-lg border border-primary/30 bg-primary/5 animate-fade-in text-xs space-y-2">
                  <p className="font-bold text-foreground text-sm">{m.name} — {m.full}</p>
                  <div className="p-2 rounded bg-background border border-border">
                    <span className="font-semibold text-foreground">How to measure: </span>
                    <span className="text-muted-foreground">{m.method}</span>
                  </div>
                  <div className="p-2 rounded bg-background border border-border">
                    <span className="font-semibold text-foreground">Grading: </span>
                    <span className="text-muted-foreground">{m.grades}</span>
                  </div>
                  <div className="p-2 rounded bg-primary/10 border border-primary/20">
                    <span className="font-semibold text-foreground">Clinical significance: </span>
                    <span className="text-muted-foreground">{m.clinical}</span>
                  </div>
                </div>
    );
            })()}
          </TabsContent>
  
          <TabsContent value="fuse">
            <p className="text-xs text-muted-foreground mb-1 font-semibold">Focused Ultrasound in Shock & Emergencies</p>
            <p className="text-xs text-muted-foreground mb-3">Systematic 6-step protocol — identify the cause of shock at the bedside in &lt;5 minutes</p>
  
            <div className="space-y-2">
              {fuseSteps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedFUSE(selectedFUSE === i ? null : i)}
                  className={`w-full text-left transition-all ${selectedFUSE === i ? "ring-1 ring-primary" : ""}`}
                >
                  <div className={`p-3 rounded-lg border ${selectedFUSE === i ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}>
                    <div className="flex items-center gap-2">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary">{i + 1}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-foreground text-sm">{s.step}</p>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{s.view}</span>
                        </div>
                      </div>
                    </div>
                    {selectedFUSE === i && (
                      <div className="mt-2 ml-8 space-y-1.5 animate-fade-in text-xs">
                        <p className="text-muted-foreground"><strong className="text-foreground">Look for:</strong> {s.look}</p>
                        <div className="p-2 rounded bg-primary/10 border border-primary/20">
                          <span className="font-semibold text-foreground">Action: </span>
                          <span className="text-muted-foreground">{s.action}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
  
            <div className="mt-3 p-2 rounded bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
              <strong className="text-foreground">FATE protocol (Focus Assessed Transthoracic Echo): </strong>
              4 views in &lt;2 minutes: subcostal 4C → A4C → PLAX → pleural. Answers: Is there a pericardial effusion? Is LV/RV severely impaired? Is the patient severely hypovolaemic? Any pleural effusion? Level 1 echo competence — all anaesthetists/intensivists should achieve.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DiagramFigure>
  );
};

export default EchoDiagram;
