import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
          fill="none" stroke="#ffffff" strokeWidth="0.3" opacity="0.18" strokeDasharray="2 3" />
      ))}
      <circle cx="92" cy="60" r="3" fill="hsl(var(--primary))" />
      <text x="100" y="63" fontSize="6" fill="#ffffff" opacity="0.7">marker</text>
      <text x="345" y="240" fontSize="6" fill="#ffffff" opacity="0.6" textAnchor="end">16 cm</text>
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
      <rect x="350" y="55" width="6" height="55" fill="url(#jet-mosaic)" stroke="#fff8d0" strokeWidth="0.3" />
      <text x="358" y="60" fontSize="5" fill="#ff5050" fontWeight="700">+0.6</text>
      <text x="358" y="86" fontSize="5" fill="#fff8d0">0</text>
      <text x="358" y="112" fontSize="5" fill="#3a8dff" fontWeight="700">−0.6</text>
      <text x="358" y="120" fontSize="4" fill="#fff8d0" opacity="0.8">m/s Nyq</text>
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
            <text x="218" y="128" fontSize="5" fill="#fff8d0" fontWeight="700">MV inflow</text>
            <text x="282" y="108" fontSize="5" fill="#fff8d0" fontWeight="700">LVOT→Ao</text>
          </>
        )}
        {mode === "mr" && (
          <>
            <path d="M 252,150 Q 285,160 320,180 Q 305,195 280,195 Q 260,180 248,158 Z" fill="url(#jet-mosaic)" opacity="0.92" />
            <path d="M 235,148 A 10,10 0 0 1 255,148 Z" fill="url(#pisa-shell)" />
            <line x1="245" y1="148" x2="245" y2="138" stroke="#fff04a" strokeWidth="0.5" strokeDasharray="1 1" />
            <text x="248" y="140" fontSize="5" fill="#fff04a" fontWeight="700">PISA r</text>
            <text x="295" y="172" fontSize="6" fill="#fff8d0" fontWeight="700">MR jet</text>
            <text x="295" y="180" fontSize="4" fill="#fff8d0" opacity="0.85">(mosaic = aliased)</text>
          </>
        )}
        {mode === "ar" && (
          <>
            <path d="M 290,118 Q 270,135 240,160 Q 225,170 215,158 Q 235,135 270,115 Z" fill="url(#jet-mosaic)" opacity="0.9" />
            <text x="225" y="155" fontSize="6" fill="#fff8d0" fontWeight="700">AR jet</text>
            <text x="225" y="163" fontSize="4" fill="#fff8d0" opacity="0.85">(diastolic, into LV)</text>
          </>
        )}
        {mode === "ms" && (
          <>
            <path d="M 248,148 Q 235,160 220,172 Q 200,178 180,170 Q 200,160 230,150 Z" fill="url(#jet-mosaic)" opacity="0.92" />
            <path d="M 240,152 A 9,9 0 0 0 258,152 Z" fill="url(#pisa-shell)" transform="rotate(180 249 152)" />
            <text x="195" y="168" fontSize="6" fill="#fff8d0" fontWeight="700">MS jet</text>
            <text x="195" y="176" fontSize="4" fill="#fff8d0" opacity="0.85">(diastolic, narrow)</text>
          </>
        )}
        {mode === "tr" && (
          <text x="200" y="80" fontSize="6" fill="#fff8d0" fontWeight="700" textAnchor="middle">TR best seen on A4C</text>
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
            <text x="148" y="178" fontSize="5" fill="#fff8d0" fontWeight="700">MV in</text>
            <text x="232" y="170" fontSize="5" fill="#fff8d0" fontWeight="700">TV in</text>
          </>
        )}
        {mode === "mr" && (
          <>
            <path d="M 178,200 Q 175,212 175,222 Q 195,228 205,222 Q 200,210 192,200 Z" fill="url(#jet-mosaic)" opacity="0.92" />
            <path d="M 175,198 A 8,8 0 0 1 191,198 Z" fill="url(#pisa-shell)" transform="rotate(180 183 198)" />
            <text x="148" y="218" fontSize="6" fill="#fff8d0" fontWeight="700">MR jet</text>
            <text x="148" y="225" fontSize="4" fill="#fff8d0" opacity="0.85">(into LA)</text>
          </>
        )}
        {mode === "tr" && (
          <>
            <path d="M 222,193 Q 230,210 240,222 Q 248,225 245,210 Q 235,198 228,190 Z" fill="url(#jet-mosaic)" opacity="0.92" />
            <text x="252" y="215" fontSize="6" fill="#fff8d0" fontWeight="700">TR jet</text>
            <text x="252" y="222" fontSize="4" fill="#fff8d0" opacity="0.85">→ PASP (Bernoulli)</text>
          </>
        )}
        {mode === "ms" && (
          <>
            <path d="M 178,196 Q 168,180 158,165 Q 148,150 155,140 Q 175,160 188,190 Z" fill="url(#jet-mosaic)" opacity="0.92" />
            <text x="130" y="158" fontSize="6" fill="#fff8d0" fontWeight="700">MS jet</text>
            <text x="130" y="165" fontSize="4" fill="#fff8d0" opacity="0.85">(diastolic, narrow)</text>
          </>
        )}
        {mode === "ar" && (
          <>
            <text x="160" y="120" fontSize="6" fill="#fff8d0" fontWeight="700">AR not well seen on A4C</text>
            <text x="160" y="128" fontSize="5" fill="#fff8d0" opacity="0.85">— use PLAX / A5C</text>
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
            <rect x="60" y="48" width="280" height="6" fill="#e8e8c8" opacity="0.5" />
            {/* RV — small triangular anterior chamber */}
            <path d="M 110,58 Q 150,55 215,62 L 220,95 Q 165,90 115,92 Z" fill="#1a1a1a" stroke="#d8d8a8" strokeWidth="1.2" />
            <text x="150" y="80" fontSize="9" fill="#fff8d0" fontWeight="700">RV</text>
            {/* IVS — bright myocardial echo */}
            <path d="M 115,92 Q 175,98 240,108 L 240,118 Q 175,108 115,103 Z" fill="#c8c098" opacity="0.85" />
            <text x="180" y="105" fontSize="6" fill="#1a1a1a" fontWeight="600">IVS</text>
            {/* LV cavity — long elliptical */}
            <path d="M 115,103 Q 175,108 240,118 L 270,165 Q 200,180 120,165 Z" fill="#0a0a0a" stroke="#d8d8a8" strokeWidth="1.2" />
            <text x="180" y="148" fontSize="14" fill="#fff8d0" fontWeight="800" textAnchor="middle">LV</text>
            {/* Posterior wall — bright myocardium */}
            <path d="M 120,165 Q 200,180 270,165 L 275,180 Q 200,195 120,180 Z" fill="#c8c098" opacity="0.85" />
            <text x="200" y="175" fontSize="6" fill="#1a1a1a" fontWeight="600" textAnchor="middle">PW</text>
            {/* Mitral valve leaflets */}
            <path d="M 240,108 Q 248,128 245,148" fill="none" stroke="#fff8d0" strokeWidth="1.4" />
            <path d="M 270,118 Q 262,138 250,148" fill="none" stroke="#fff8d0" strokeWidth="1.4" />
            <text x="285" y="135" fontSize="7" fill="#fff8d0" fontWeight="600">AMVL</text>
            <text x="285" y="148" fontSize="7" fill="#fff8d0" fontWeight="600">PMVL</text>
            {/* Chordae tendineae */}
            <line x1="245" y1="148" x2="232" y2="170" stroke="#fff8d0" strokeWidth="0.4" opacity="0.7" />
            <line x1="250" y1="148" x2="240" y2="172" stroke="#fff8d0" strokeWidth="0.4" opacity="0.7" />
            {/* LVOT + Aortic root */}
            <path d="M 240,108 L 290,80 L 320,90 L 325,135 L 280,148 L 270,118 Z" fill="#0a0a0a" stroke="#d8d8a8" strokeWidth="1.2" />
            <text x="295" y="115" fontSize="7" fill="#fff8d0" fontWeight="600">Ao root</text>
            {/* Aortic valve cusps */}
            <line x1="278" y1="100" x2="282" y2="115" stroke="#fff8d0" strokeWidth="1.2" />
            <line x1="305" y1="105" x2="301" y2="120" stroke="#fff8d0" strokeWidth="1.2" />
            <text x="278" y="95" fontSize="6" fill="#fff8d0" fontWeight="600">AV</text>
            <path d="M 282,115 Q 292,128 301,120" fill="none" stroke="#d8d8a8" strokeWidth="0.6" opacity="0.7" />
            {/* LA — posterior chamber */}
            <path d="M 270,148 Q 320,160 340,180 L 335,210 Q 280,210 245,190 Z" fill="#0a0a0a" stroke="#d8d8a8" strokeWidth="1.2" />
            <text x="295" y="185" fontSize="11" fill="#fff8d0" fontWeight="800">LA</text>
            {/* Descending aorta cross-section */}
            <circle cx="310" cy="218" r="10" fill="#0a0a0a" stroke="#d8d8a8" strokeWidth="1" />
            <text x="310" y="221" fontSize="5" fill="#fff8d0" fontWeight="600" textAnchor="middle">DAo</text>
            {/* Pericardium echo */}
            <path d="M 120,180 Q 200,195 275,180" fill="none" stroke="#ffffd0" strokeWidth="0.8" opacity="0.6" strokeDasharray="3 2" />
            <text x="160" y="200" fontSize="5" fill="#fff8d0" opacity="0.7">pericardium</text>
            {/* M-mode caliper line through LV */}
            <line x1="180" y1="92" x2="180" y2="180" stroke="hsl(var(--primary))" strokeWidth="0.5" opacity="0.6" strokeDasharray="2 2" />
            <text x="184" y="135" fontSize="5" fill="hsl(var(--primary))" opacity="0.8">M-mode</text>
          </g>
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
            {/* LV — circular doughnut, mid-papillary level */}
            <circle cx="210" cy="148" r="58" fill="#c8c098" opacity="0.9" />
            <circle cx="210" cy="148" r="42" fill="#0a0a0a" stroke="#d8d8a8" strokeWidth="1.4" />
            {/* Coronary territory segmentation — 6 segments */}
            <g stroke="#fff8d0" strokeWidth="0.4" opacity="0.45" fill="none">
              <line x1="210" y1="106" x2="210" y2="190" />
              <line x1="173" y1="127" x2="247" y2="169" />
              <line x1="173" y1="169" x2="247" y2="127" />
            </g>
            <text x="210" y="100" fontSize="6" fill="#ff9090" fontWeight="700" textAnchor="middle">ANT (LAD)</text>
            <text x="262" y="135" fontSize="6" fill="#90c0ff" fontWeight="700">ANT-SEPT</text>
            <text x="262" y="168" fontSize="6" fill="#90ffb0" fontWeight="700">INF-SEPT</text>
            <text x="210" y="206" fontSize="6" fill="#ffd090" fontWeight="700" textAnchor="middle">INF (RCA)</text>
            <text x="158" y="168" fontSize="6" fill="#c090ff" fontWeight="700" textAnchor="end">INF-LAT</text>
            <text x="158" y="135" fontSize="6" fill="#ff90d0" fontWeight="700" textAnchor="end">ANT-LAT (LCx)</text>
            <text x="210" y="151" fontSize="13" fill="#fff8d0" fontWeight="800" textAnchor="middle">LV</text>
            {/* Papillary muscles */}
            <ellipse cx="184" cy="128" rx="6" ry="5" fill="#c8c098" opacity="0.9" />
            <ellipse cx="232" cy="172" rx="6" ry="5" fill="#c8c098" opacity="0.9" />
            <text x="178" y="120" fontSize="5" fill="#fff8d0" opacity="0.8">AL pap</text>
            <text x="238" y="184" fontSize="5" fill="#fff8d0" opacity="0.8">PM pap</text>
            {/* RV crescent — anterior, wraps around LV septum */}
            <path d="M 165,90 Q 110,135 175,205 Q 190,180 178,148 Q 170,115 195,95 Z" fill="#1a1a1a" stroke="#d8d8a8" strokeWidth="1.3" />
            <text x="138" y="148" fontSize="10" fill="#fff8d0" fontWeight="800" textAnchor="middle">RV</text>
            <text x="190" y="151" fontSize="5" fill="#1a1a1a" fontWeight="700" textAnchor="middle">IVS</text>
            <circle cx="210" cy="148" r="60" fill="none" stroke="#ffffd0" strokeWidth="0.5" opacity="0.5" strokeDasharray="3 2" />
            {/* Inset: aortic valve at base — Mercedes-Benz sign */}
            <g transform="translate(310,80)">
              <rect x="-32" y="-25" width="64" height="55" fill="#000" stroke="hsl(var(--border))" strokeWidth="0.5" rx="2" />
              <circle cx="0" cy="0" r="18" fill="#0a0a0a" stroke="#d8d8a8" strokeWidth="1" />
              <line x1="0" y1="0" x2="0" y2="-18" stroke="#fff8d0" strokeWidth="1" />
              <line x1="0" y1="0" x2="15.6" y2="9" stroke="#fff8d0" strokeWidth="1" />
              <line x1="0" y1="0" x2="-15.6" y2="9" stroke="#fff8d0" strokeWidth="1" />
              <text x="0" y="-19" fontSize="5" fill="#fff8d0" textAnchor="middle">L</text>
              <text x="14" y="13" fontSize="5" fill="#fff8d0">R</text>
              <text x="-14" y="13" fontSize="5" fill="#fff8d0" textAnchor="end">N</text>
              <text x="0" y="26" fontSize="5" fill="#fff8d0" textAnchor="middle" fontWeight="600">AV (base)</text>
            </g>
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
            {/* LV — large left-side chamber, pointed apex at top */}
            <path d="M 200,55 Q 165,70 145,100 Q 132,135 138,170 Q 148,195 195,200 L 200,135 Z" fill="#0a0a0a" stroke="#d8d8a8" strokeWidth="1.3" />
            <text x="170" y="135" fontSize="13" fill="#fff8d0" fontWeight="800" textAnchor="middle">LV</text>
            {/* RV — smaller right-side chamber */}
            <path d="M 200,55 Q 232,70 252,100 Q 263,130 258,162 Q 248,182 205,188 L 200,135 Z" fill="#0a0a0a" stroke="#d8d8a8" strokeWidth="1.3" />
            <text x="232" y="125" fontSize="11" fill="#fff8d0" fontWeight="800" textAnchor="middle">RV</text>
            {/* Moderator band */}
            <line x1="218" y1="155" x2="245" y2="170" stroke="#fff8d0" strokeWidth="1" opacity="0.7" />
            <text x="252" y="175" fontSize="5" fill="#fff8d0" opacity="0.8">mod band</text>
            {/* IVS */}
            <path d="M 200,60 L 198,135 L 200,195" fill="none" stroke="#c8c098" strokeWidth="3" opacity="0.9" />
            <text x="184" y="80" fontSize="5" fill="#fff8d0" opacity="0.8">IVS</text>
            {/* MV — anterior + posterior leaflets */}
            <line x1="148" y1="200" x2="180" y2="195" stroke="#fff8d0" strokeWidth="1.5" />
            <line x1="180" y1="195" x2="200" y2="200" stroke="#fff8d0" strokeWidth="1.5" />
            <text x="155" y="192" fontSize="6" fill="#fff8d0" fontWeight="700">MV</text>
            {/* TV — slightly more apical */}
            <line x1="200" y1="195" x2="220" y2="190" stroke="#fff8d0" strokeWidth="1.5" />
            <line x1="220" y1="190" x2="252" y2="185" stroke="#fff8d0" strokeWidth="1.5" />
            <text x="240" y="182" fontSize="6" fill="#fff8d0" fontWeight="700">TV</text>
            {/* Atria */}
            <path d="M 148,200 Q 150,225 200,228 Q 250,225 252,185 L 220,190 L 200,200 Z" fill="#0a0a0a" stroke="#d8d8a8" strokeWidth="1.3" />
            <text x="175" y="221" fontSize="10" fill="#fff8d0" fontWeight="800">LA</text>
            <text x="225" y="218" fontSize="10" fill="#fff8d0" fontWeight="800">RA</text>
            {/* IAS */}
            <line x1="200" y1="200" x2="200" y2="228" stroke="#c8c098" strokeWidth="2" opacity="0.9" />
            <text x="184" y="217" fontSize="5" fill="#fff8d0" opacity="0.8">IAS</text>
            {/* Pulmonary vein entering LA */}
            <path d="M 150,225 Q 130,235 115,232" fill="none" stroke="#d8d8a8" strokeWidth="1" opacity="0.7" />
            <text x="110" y="240" fontSize="5" fill="#fff8d0" opacity="0.7" textAnchor="end">PV</text>
            {/* TAPSE caliper */}
            <line x1="252" y1="185" x2="252" y2="170" stroke="hsl(var(--primary))" strokeWidth="0.6" />
            <line x1="248" y1="185" x2="256" y2="185" stroke="hsl(var(--primary))" strokeWidth="0.6" />
            <line x1="248" y1="170" x2="256" y2="170" stroke="hsl(var(--primary))" strokeWidth="0.6" />
            <text x="262" y="180" fontSize="5" fill="hsl(var(--primary))" fontWeight="700">TAPSE</text>
            <text x="200" y="50" fontSize="6" fill="#fff8d0" textAnchor="middle" fontWeight="700">apex</text>
          </g>
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
              <path d="M 0,0 L 4,2 L 0,4 Z" fill="#90ff90" />
            </marker>
            <marker id="arrow-up-sm" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto-start-reverse">
              <path d="M 0,0 L 4,2 L 0,4 Z" fill="#90ff90" />
            </marker>
          </defs>
          <g clipPath="url(#sector-clip)">
            {/* Liver parenchyma — acoustic window */}
            <path d="M 70,55 Q 200,50 330,60 L 320,110 Q 200,115 80,108 Z" fill="#5a4838" opacity="0.55" />
            <text x="200" y="85" fontSize="9" fill="#f0e0c0" fontWeight="700" textAnchor="middle">Liver (acoustic window)</text>
            <path d="M 280,75 Q 250,90 235,110" fill="none" stroke="#9bb8d8" strokeWidth="1.5" opacity="0.7" />
            <text x="285" y="73" fontSize="5" fill="#9bb8d8">hepatic v.</text>
            {/* RA closest to liver/probe */}
            <path d="M 100,115 Q 90,140 100,165 Q 130,178 165,170 L 165,118 Z" fill="#0a0a0a" stroke="#d8d8a8" strokeWidth="1.3" />
            <text x="125" y="148" fontSize="9" fill="#fff8d0" fontWeight="800">RA</text>
            {/* RV */}
            <path d="M 165,118 L 165,170 Q 200,182 235,170 L 235,118 Z" fill="#0a0a0a" stroke="#d8d8a8" strokeWidth="1.3" />
            <text x="200" y="148" fontSize="10" fill="#fff8d0" fontWeight="800" textAnchor="middle">RV</text>
            {/* LA */}
            <path d="M 235,118 L 235,170 Q 270,178 300,165 L 300,120 Z" fill="#0a0a0a" stroke="#d8d8a8" strokeWidth="1.3" />
            <text x="265" y="148" fontSize="9" fill="#fff8d0" fontWeight="800">LA</text>
            {/* LV — far field */}
            <path d="M 300,120 L 300,165 Q 320,180 340,170 L 340,125 Z" fill="#0a0a0a" stroke="#d8d8a8" strokeWidth="1.3" />
            <text x="318" y="150" fontSize="8" fill="#fff8d0" fontWeight="800">LV</text>
            {/* Septae */}
            <line x1="235" y1="118" x2="235" y2="172" stroke="#c8c098" strokeWidth="2" opacity="0.9" />
            <line x1="200" y1="120" x2="200" y2="170" stroke="#c8c098" strokeWidth="0.5" opacity="0.6" />
            {/* AV valve plane */}
            <line x1="170" y1="142" x2="195" y2="142" stroke="#fff8d0" strokeWidth="1.2" />
            <line x1="205" y1="142" x2="230" y2="142" stroke="#fff8d0" strokeWidth="1.2" />
            <line x1="240" y1="142" x2="265" y2="142" stroke="#fff8d0" strokeWidth="1.2" />
            <line x1="275" y1="142" x2="298" y2="142" stroke="#fff8d0" strokeWidth="1.2" />
            {/* Pericardium */}
            <path d="M 100,115 Q 90,140 100,165 Q 200,190 340,170 L 340,125 Q 200,112 100,115 Z" fill="none" stroke="#ffffd0" strokeWidth="0.6" opacity="0.55" strokeDasharray="3 2" />
            {/* IVC long-axis inset */}
            <g transform="translate(280,210)">
              <rect x="-70" y="-22" width="140" height="40" fill="#000" stroke="hsl(var(--border))" strokeWidth="0.5" rx="2" />
              <path d="M -65,-2 Q -30,-6 0,-7 Q 30,-8 60,-12 L 60,-2 Q 30,2 0,3 Q -30,4 -65,8 Z" fill="#0a0a0a" stroke="#d8d8a8" strokeWidth="0.8" />
              <text x="-55" y="0" fontSize="5" fill="#fff8d0" fontWeight="700">IVC</text>
              <line x1="-20" y1="-8" x2="-20" y2="3" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeDasharray="1 1" />
              <text x="-18" y="-10" fontSize="4" fill="hsl(var(--primary))">d</text>
              <circle cx="60" cy="-7" r="3" fill="#d8d8a8" />
              <text x="63" y="-9" fontSize="4" fill="#fff8d0">→ RA</text>
              <path d="M 0,-15 L 0,-9" stroke="#90ff90" strokeWidth="0.5" markerEnd="url(#arrow-down-sm)" />
              <path d="M 0,11 L 0,5" stroke="#90ff90" strokeWidth="0.5" markerEnd="url(#arrow-up-sm)" />
              <text x="5" y="-13" fontSize="4" fill="#90ff90">inspiration</text>
            </g>
          </g>
          <text x="200" y="245" fontSize="7" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">Subcostal 4-chamber + IVC long-axis inset</text>
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
  );
};

export default EchoDiagram;
