import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { DiagramToggleBar } from "./DiagramToggleBar";

type PartId =
  | "cathode"
  | "filament"
  | "anode"
  | "electron-beam"
  | "bremsstrahlung"
  | "characteristic"
  | "window"
  | "envelope";

interface Part {
  id: PartId;
  label: string;
  region: "Source" | "Target" | "Output" | "Housing";
  detail: string;
}

const PARTS: Record<PartId, Part> = {
  filament: {
    id: "filament",
    label: "Heated tungsten filament",
    region: "Source",
    detail:
      "Thermionic emission boils electrons off the cathode coil. mA controls filament heating → electron flux → beam quantity.",
  },
  cathode: {
    id: "cathode",
    label: "Cathode (focusing cup)",
    region: "Source",
    detail:
      "Negatively charged molybdenum cup electrostatically focuses the electron cloud onto the anode focal spot.",
  },
  "electron-beam": {
    id: "electron-beam",
    label: "Accelerated electron beam",
    region: "Target",
    detail:
      "Electrons accelerated across the tube voltage (50–150 kVp) gain kinetic energy = e·V. Strike anode at ~½ speed of light.",
  },
  anode: {
    id: "anode",
    label: "Rotating tungsten anode",
    region: "Target",
    detail:
      "Bevelled tungsten target (high Z, high melting point). Rotates ~3000 rpm to spread heat — <1% of kinetic energy becomes X-rays, the rest is heat.",
  },
  bremsstrahlung: {
    id: "bremsstrahlung",
    label: "Bremsstrahlung ('braking') photons",
    region: "Output",
    detail:
      "Electrons decelerated by tungsten nuclei emit photons across a continuous spectrum from 0 keV up to the peak tube voltage (kVp).",
  },
  characteristic: {
    id: "characteristic",
    label: "Characteristic K-shell lines",
    region: "Output",
    detail:
      "Inner-shell vacancies fill from outer shells, emitting discrete photons at 59 & 67 keV for tungsten — sharp peaks on the spectrum.",
  },
  window: {
    id: "window",
    label: "Beryllium window + filter",
    region: "Housing",
    detail:
      "Thin Be window passes the useful beam; inherent + added Al filtration removes low-energy photons that would only add patient skin dose.",
  },
  envelope: {
    id: "envelope",
    label: "Evacuated glass envelope",
    region: "Housing",
    detail:
      "Vacuum prevents electron scatter by gas molecules; lead-lined housing absorbs off-axis radiation, leaving only the collimated useful beam.",
  },
};

const REGION_COLORS: Record<Part["region"], string> = {
  Source: "hsl(195 80% 55%)",
  Target: "hsl(25 85% 55%)",
  Output: "hsl(280 65% 60%)",
  Housing: "hsl(var(--muted-foreground))",
};

interface SafetyLink {
  href: string;
  label: string;
  why: string;
}

/** Per-part jumps into the same topic's safety sections. */
const SAFETY_LINKS: Partial<Record<PartId, SafetyLink[]>> = {
  "electron-beam": [
    { href: "#alara", label: "ALARA → Distance", why: "Inverse-square law: dose-rate falls as 1/d² from this primary beam axis." },
    { href: "#dose-limits", label: "Dose limits", why: "kVp/mAs determine patient + scatter dose against IRR 2017 limits." },
  ],
  bremsstrahlung: [
    { href: "#alara", label: "ALARA → Shielding", why: "0.5 mm Pb apron attenuates ~95% of this scatter spectrum at 70 kVp." },
    { href: "#interactions", label: "Photon interactions", why: "These photons drive Compton scatter — the dominant operator hazard." },
  ],
  characteristic: [
    { href: "#interactions", label: "Photoelectric effect", why: "59 / 67 keV K-lines sit in the photoelectric-dominant range." },
  ],
  anode: [
    { href: "#alara", label: "ALARA → Time", why: "Pulsed fluoroscopy + short screening times protect anode and operator alike." },
  ],
  window: [
    { href: "#alara", label: "ALARA → Optimisation", why: "Added Al filtration removes low-energy photons that only add patient skin dose." },
  ],
  envelope: [
    { href: "#alara", label: "ALARA → Shielding", why: "Lead-lined housing is the primary barrier; the ceiling-suspended screen is yours." },
    { href: "#dose-limits", label: "Personal dosimetry", why: "Collar badge outside apron monitors residual scatter past the housing." },
  ],
};

export const XRayTubeDiagram = () => {
  const [showSutures, setShowSutures] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [animate, setAnimate] = useState(true);
  const [showSpectrum, setShowSpectrum] = useState(true);
  const [selected, setSelected] = useState<PartId>("electron-beam");

  const item = PARTS[selected];
  const regionColor = REGION_COLORS[item.region];

  const isSel = (id: PartId) => selected === id;
  const opacityFor = (id: PartId, base = 0.55) => (isSel(id) ? 0.92 : base);
  const strokeFor = (id: PartId, base = 0.8) => (isSel(id) ? 1.8 : base);

  // Electron animation positions (cathode ~110 → anode ~430)
  const electrons = [0, 1, 2, 3, 4, 5];

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          title="X-ray tube — electron acceleration & photon production"
          subtitle="Tap a structure to reveal its role"
          toggles={[
            { label: "Sutures", active: showSutures, onChange: () => setShowSutures((s) => !s) },
            { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
            { label: "Animate", active: animate, onChange: () => setAnimate((s) => !s) },
            { label: "Spectrum", active: showSpectrum, onChange: () => setShowSpectrum((s) => !s) },
          ]}
        />

        {/* Legend */}
        <div className="flex flex-wrap gap-2 text-[11px] mb-2">
          {(Object.keys(REGION_COLORS) as Part["region"][]).map((r) => (
            <span
              key={r}
              className="px-1.5 py-0.5 rounded-md border border-border"
              style={{ background: `${REGION_COLORS[r]}1A`, color: REGION_COLORS[r] }}
            >
              {r}
            </span>
          ))}
        </div>

        <svg
          viewBox="0 0 600 360"
          className="w-full max-w-2xl mx-auto"
          role="img"
          aria-label="Animated diagnostic X-ray tube showing electrons accelerating from a heated tungsten cathode across a high-voltage gap, striking a rotating tungsten anode and producing bremsstrahlung and characteristic radiation photons exiting via a beryllium window."
        >
          <defs>
            <radialGradient id="xrt-vacuumShade" cx="50%" cy="45%" r="65%">
              <stop offset="0%" stopColor="hsl(var(--anatomy))" stopOpacity="0.18" />
              <stop offset="100%" stopColor="hsl(var(--anatomy))" stopOpacity="0.03" />
            </radialGradient>
            <radialGradient id="xrt-anodeShade" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="hsl(25 85% 70%)" stopOpacity="0.95" />
              <stop offset="100%" stopColor="hsl(25 75% 35%)" stopOpacity="1" />
            </radialGradient>
            <radialGradient id="xrt-filamentGlow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="hsl(40 100% 75%)" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(15 90% 45%)" stopOpacity="0.6" />
            </radialGradient>
            <pattern id="xrt-leadHatch" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
              <line x1="0" y1="3" x2="6" y2="3" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.35" />
            </pattern>
            <filter id="xrt-tubeShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
              <feOffset dx="0" dy="2" result="off" />
              <feComponentTransfer><feFuncA type="linear" slope="0.32" /></feComponentTransfer>
              <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Lead housing */}
          <rect
            x="60"
            y="80"
            width="430"
            height="200"
            rx="18"
            fill="url(#xrt-leadHatch)"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={strokeFor("envelope", 1)}
            opacity={opacityFor("envelope", 0.6)}
            onClick={() => setSelected("envelope")}
            className="cursor-pointer"
          />
          {showLabels && (
            <text x="70" y="96" className="text-[8px] fill-muted-foreground italic select-none pointer-events-none">
              lead-lined housing
            </text>
          )}

          {/* Glass envelope (vacuum) */}
          <ellipse
            cx="285"
            cy="180"
            rx="195"
            ry="80"
            fill="url(#xrt-vacuumShade)"
            stroke="hsl(var(--foreground))"
            strokeWidth={strokeFor("envelope", 1.2)}
            opacity={opacityFor("envelope", 0.85)}
            filter="url(#xrt-tubeShadow)"
            onClick={() => setSelected("envelope")}
            className="cursor-pointer"
          />

          {/* High-voltage rails */}
          {showSutures && (
            <>
              <line x1="100" y1="60" x2="100" y2="105" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.6" />
              <line x1="430" y1="60" x2="430" y2="105" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.6" />
              <text x="100" y="54" textAnchor="middle" className="text-[9px] font-medium fill-muted-foreground select-none">−</text>
              <text x="430" y="54" textAnchor="middle" className="text-[9px] font-medium fill-muted-foreground select-none">+</text>
              <text x="265" y="54" className="text-[8px] fill-muted-foreground italic select-none">50–150 kVp</text>
              <line x1="110" y1="48" x2="420" y2="48" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
            </>
          )}

          {/* Cathode assembly */}
          <g
            onClick={() => setSelected("cathode")}
            className="cursor-pointer"
          >
            {/* focusing cup */}
            <path
              d="M 95 150 L 130 165 L 130 195 L 95 210 Z"
              fill={REGION_COLORS.Source}
              opacity={opacityFor("cathode")}
              stroke={REGION_COLORS.Source}
              strokeWidth={strokeFor("cathode")}
            />
          </g>

          {/* Filament (heated coil) */}
          <g onClick={() => setSelected("filament")} className="cursor-pointer">
            <circle
              cx="118"
              cy="180"
              r="9"
              fill="url(#xrt-filamentGlow)"
              opacity={opacityFor("filament", 0.95)}
              stroke="hsl(15 90% 45%)"
              strokeWidth={strokeFor("filament", 0.8)}
            >
              {animate && (
                <animate attributeName="r" values="8;10;8" dur="1.4s" repeatCount="indefinite" />
              )}
            </circle>
            {showSutures && (
              <path
                d="M 112 175 q 3 -3 6 0 t 6 0 M 112 180 q 3 -3 6 0 t 6 0 M 112 185 q 3 -3 6 0 t 6 0"
                fill="none"
                stroke="hsl(15 90% 35%)"
                strokeWidth="0.5"
                opacity="0.7"
              />
            )}
          </g>

          {/* Rotating anode */}
          <g onClick={() => setSelected("anode")} className="cursor-pointer">
            {/* stem */}
            <rect x="455" y="172" width="35" height="16" fill="hsl(var(--muted-foreground))" opacity="0.6" />
            {/* bevelled disc */}
            <path
              d="M 405 130 L 460 155 L 460 215 L 405 240 L 380 200 L 380 160 Z"
              fill="url(#xrt-anodeShade)"
              stroke={REGION_COLORS.Target}
              strokeWidth={strokeFor("anode", 1.2)}
              opacity={opacityFor("anode", 0.9)}
            />
            {/* focal spot */}
            <ellipse
              cx="395"
              cy="180"
              rx="6"
              ry="14"
              fill="hsl(40 100% 80%)"
              opacity={opacityFor("anode", 0.85)}
            >
              {animate && (
                <animate attributeName="opacity" values="0.55;1;0.55" dur="0.6s" repeatCount="indefinite" />
              )}
            </ellipse>
            {showSutures && (
              <>
                {/* rotation arrow */}
                <path
                  d="M 425 245 a 18 18 0 1 0 -2 -32"
                  fill="none"
                  stroke="hsl(var(--foreground))"
                  strokeWidth="0.75"
                  opacity="0.6"
                />
                <polygon points="421,212 426,209 425,217" fill="hsl(var(--foreground))" opacity="0.6" />
              </>
            )}
          </g>

          {/* Electron beam */}
          <g
            onClick={() => setSelected("electron-beam")}
            className="cursor-pointer"
          >
            <line
              x1="130"
              y1="180"
              x2="395"
              y2="180"
              stroke={isSel("electron-beam") ? "hsl(195 90% 60%)" : "hsl(195 70% 55%)"}
              strokeWidth={isSel("electron-beam") ? 1.4 : 0.6}
              strokeDasharray="4 3"
              opacity={isSel("electron-beam") ? 0.9 : 0.45}
            />
            {electrons.map((i) => (
              <circle
                key={i}
                r="3"
                fill="hsl(195 90% 65%)"
                stroke="hsl(195 80% 35%)"
                strokeWidth="0.5"
                opacity={animate ? 0.95 : 0}
              >
                {animate && (
                  <>
                    <animate
                      attributeName="cx"
                      values="132;395"
                      dur="1.1s"
                      begin={`${i * 0.18}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="cy"
                      values="180;180"
                      dur="1.1s"
                      begin={`${i * 0.18}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes="0;0.05;0.9;1"
                      dur="1.1s"
                      begin={`${i * 0.18}s`}
                      repeatCount="indefinite"
                    />
                  </>
                )}
              </circle>
            ))}
            {!animate && (
              <>
                <circle cx="200" cy="180" r="3" fill="hsl(195 90% 65%)" />
                <circle cx="270" cy="180" r="3" fill="hsl(195 90% 65%)" />
                <circle cx="340" cy="180" r="3" fill="hsl(195 90% 65%)" />
              </>
            )}
            {showLabels && (
              <text x="225" y="172" className="text-[8px] fill-foreground select-none pointer-events-none">
                e⁻ →
              </text>
            )}
          </g>

          {/* Photon emissions from focal spot */}
          {/* Bremsstrahlung — wavy lines, varied wavelength (continuous spectrum) */}
          <g onClick={() => setSelected("bremsstrahlung")} className="cursor-pointer">
            {[
              { d: "M 395 180 q 8 -6 16 -2 t 16 -2 t 16 -2 t 16 -2", dy: -40, delay: "0s" },
              { d: "M 395 180 q 6 -3 12 -1 t 12 -1 t 12 -1 t 12 -1 t 12 -1", dy: -20, delay: "0.2s" },
              { d: "M 395 180 q 10 -8 20 -3 t 20 -3", dy: 30, delay: "0.4s" },
              { d: "M 395 180 q 7 -4 14 -1 t 14 -1 t 14 -1 t 14 -1", dy: 55, delay: "0.6s" },
            ].map((p, i) => (
              <g key={i} transform={`translate(0 ${p.dy})`}>
                <path
                  d={p.d}
                  fill="none"
                  stroke={REGION_COLORS.Output}
                  strokeWidth={strokeFor("bremsstrahlung", 1)}
                  opacity={opacityFor("bremsstrahlung", 0.7)}
                >
                  {animate && (
                    <animate
                      attributeName="opacity"
                      values="0.1;0.85;0.1"
                      dur="1.4s"
                      begin={p.delay}
                      repeatCount="indefinite"
                    />
                  )}
                </path>
              </g>
            ))}
            {showLabels && (
              <text x="500" y="120" className="text-[8px] fill-foreground select-none pointer-events-none">
                Bremsstrahlung
              </text>
            )}
          </g>

          {/* Characteristic radiation — sharper, monochromatic-looking arrows */}
          <g onClick={() => setSelected("characteristic")} className="cursor-pointer">
            {[
              { x2: 555, y2: 170, delay: "0.1s" },
              { x2: 555, y2: 195, delay: "0.5s" },
            ].map((p, i) => (
              <line
                key={i}
                x1="395"
                y1="180"
                x2={p.x2}
                y2={p.y2}
                stroke="hsl(280 75% 65%)"
                strokeWidth={strokeFor("characteristic", 1.2)}
                opacity={opacityFor("characteristic", 0.75)}
              >
                {animate && (
                  <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="1.0s"
                    begin={p.delay}
                    repeatCount="indefinite"
                  />
                )}
              </line>
            ))}
            {showLabels && (
              <text x="500" y="215" className="text-[8px] fill-foreground select-none pointer-events-none">
                Characteristic (59, 67 keV)
              </text>
            )}
          </g>

          {/* Beryllium window + filtered useful beam (downward) */}
          <g onClick={() => setSelected("window")} className="cursor-pointer">
            <rect
              x="370"
              y="258"
              width="50"
              height="6"
              fill={REGION_COLORS.Housing}
              opacity={opacityFor("window", 0.7)}
              stroke="hsl(var(--foreground))"
              strokeWidth={strokeFor("window", 0.6)}
            />
            <path
              d="M 380 264 L 360 330 L 430 330 L 410 264 Z"
              fill="hsl(280 65% 60%)"
              opacity={opacityFor("window", 0.18)}
              stroke="hsl(280 65% 60%)"
              strokeWidth="0.5"
              strokeDasharray="3 3"
            />
            {showLabels && (
              <text x="395" y="345" textAnchor="middle" className="text-[8px] fill-foreground select-none pointer-events-none">
                useful beam
              </text>
            )}
            {showLabels && (
              <text x="425" y="262" className="text-[7.5px] fill-muted-foreground italic select-none pointer-events-none">
                Be window + Al filter
              </text>
            )}
          </g>

          {/* Compass */}
          <text x="300" y="20" textAnchor="middle" className="text-[9px] fill-muted-foreground font-medium select-none">SUPERIOR</text>
          <text x="300" y="355" textAnchor="middle" className="text-[9px] fill-muted-foreground font-medium select-none">PATIENT (INFERIOR)</text>
          <text x="14" y="184" className="text-[9px] fill-muted-foreground font-medium select-none">CATHODE −</text>
          <text x="540" y="184" className="text-[9px] fill-muted-foreground font-medium select-none">+ ANODE</text>

          {/* Labels for clickable parts */}
          {showLabels && (
            <>
              <text x="80" y="145" className="text-[8px] fill-foreground select-none pointer-events-none">cathode cup</text>
              <text x="118" y="208" textAnchor="middle" className="text-[7.5px] fill-muted-foreground italic select-none pointer-events-none">filament</text>
              <text x="425" y="135" className="text-[8px] fill-foreground select-none pointer-events-none">W anode</text>
            </>
          )}
        </svg>

        <p className="text-xs text-center text-muted-foreground mt-2 italic">
          <span className="font-semibold not-italic text-foreground">&lt;1% efficient — </span>
          most kinetic energy becomes heat; the anode rotates ~3000 rpm to spread it.
        </p>

        {/* Spectrum overlay — bremsstrahlung continuum + tungsten K-lines */}
        {showSpectrum && (
          <div className="mt-4">
            <svg
              viewBox="0 0 600 180"
              className="w-full max-w-2xl mx-auto"
              role="img"
              aria-label="X-ray emission spectrum showing the bremsstrahlung continuum from 0 keV up to the kVp peak, with two sharp tungsten K-shell characteristic lines superimposed at 59 and 67 keV."
            >
              <defs>
                <linearGradient id="xrt-spectrumFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={REGION_COLORS.Output} stopOpacity="0.35" />
                  <stop offset="100%" stopColor={REGION_COLORS.Output} stopOpacity="0.04" />
                </linearGradient>
              </defs>

              {/* Plot area: x = 60→560 (0–150 keV), y = 30→150 (intensity) */}
              {(() => {
                const x0 = 60;
                const x1 = 560;
                const y0 = 150;
                const yTop = 30;
                const kVp = 100; // illustrative tube voltage
                const kVpMax = 150;
                const xAt = (kev: number) => x0 + (kev / kVpMax) * (x1 - x0);
                const yAt = (intensity: number) => y0 - intensity * (y0 - yTop);

                // Build smooth bremsstrahlung curve: rises from low E (filtered),
                // peaks ~⅓ kVp, falls linearly to zero at kVp.
                const samples: Array<[number, number]> = [];
                const stepKev = 2;
                for (let kev = 0; kev <= kVp; kev += stepKev) {
                  const filterRoll = Math.min(1, Math.pow(kev / 25, 2)); // low-E cut-off (Al filter)
                  const linearFall = Math.max(0, 1 - kev / kVp);
                  const intensity = 0.95 * filterRoll * linearFall;
                  samples.push([xAt(kev), yAt(intensity)]);
                }
                samples.push([xAt(kVp), y0]);

                const linePath = samples
                  .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`)
                  .join(" ");
                const fillPath = `M ${x0} ${y0} ${linePath
                  .replace(/^M/, "L")} L ${xAt(kVp)} ${y0} Z`;

                const bremsHot = isSel("bremsstrahlung");
                const charHot = isSel("characteristic");

                return (
                  <>
                    {/* axes */}
                    <line x1={x0} y1={y0} x2={x1} y2={y0} stroke="hsl(var(--foreground))" strokeWidth="0.75" opacity="0.6" />
                    <line x1={x0} y1={y0} x2={x0} y2={yTop - 8} stroke="hsl(var(--foreground))" strokeWidth="0.75" opacity="0.6" />

                    {/* x ticks every 25 keV */}
                    {[0, 25, 50, 75, 100, 125, 150].map((kev) => (
                      <g key={kev}>
                        <line
                          x1={xAt(kev)}
                          y1={y0}
                          x2={xAt(kev)}
                          y2={y0 + 4}
                          stroke="hsl(var(--muted-foreground))"
                          strokeWidth="0.5"
                          opacity="0.7"
                        />
                        <text
                          x={xAt(kev)}
                          y={y0 + 14}
                          textAnchor="middle"
                          className="text-[8px] fill-muted-foreground select-none"
                        >
                          {kev}
                        </text>
                      </g>
                    ))}
                    <text
                      x={(x0 + x1) / 2}
                      y={y0 + 28}
                      textAnchor="middle"
                      className="text-[9px] fill-muted-foreground font-medium select-none"
                    >
                      Photon energy (keV)
                    </text>
                    <text
                      x={x0 - 8}
                      y={(y0 + yTop) / 2}
                      textAnchor="middle"
                      transform={`rotate(-90 ${x0 - 8} ${(y0 + yTop) / 2})`}
                      className="text-[9px] fill-muted-foreground font-medium select-none"
                    >
                      Relative intensity
                    </text>

                    {/* kVp marker */}
                    {showSutures && (
                      <>
                        <line
                          x1={xAt(kVp)}
                          y1={yTop - 4}
                          x2={xAt(kVp)}
                          y2={y0}
                          stroke="hsl(var(--muted-foreground))"
                          strokeWidth="0.5"
                          strokeDasharray="2 3"
                          opacity="0.7"
                        />
                        <text
                          x={xAt(kVp) + 4}
                          y={yTop + 2}
                          className="text-[8px] fill-muted-foreground italic select-none"
                        >
                          kVp = {kVp} keV
                        </text>
                      </>
                    )}

                    {/* Bremsstrahlung continuum — filled curve */}
                    <path
                      d={fillPath}
                      fill="url(#xrt-spectrumFill)"
                      opacity={bremsHot ? 0.95 : 0.7}
                      onClick={() => setSelected("bremsstrahlung")}
                      className="cursor-pointer"
                    />
                    <path
                      d={linePath}
                      fill="none"
                      stroke={REGION_COLORS.Output}
                      strokeWidth={bremsHot ? 1.8 : 1.1}
                      opacity={bremsHot ? 1 : 0.85}
                      onClick={() => setSelected("bremsstrahlung")}
                      className="cursor-pointer"
                    />
                    {showLabels && (
                      <text
                        x={xAt(kVp / 3) + 4}
                        y={yAt(0.55)}
                        className="text-[8px] fill-foreground select-none pointer-events-none"
                      >
                        Bremsstrahlung
                      </text>
                    )}

                    {/* Characteristic K-lines — Kα ≈ 59 keV, Kβ ≈ 67 keV */}
                    {[
                      { kev: 59, h: 0.78, label: "Kα 59" },
                      { kev: 67, h: 0.55, label: "Kβ 67" },
                    ].map((peak) => {
                      // Only meaningful when kVp exceeds K-edge (~70 keV); render dimmed otherwise.
                      const visible = kVp >= 70 || true; // illustrative — show peaks regardless
                      const px = xAt(peak.kev);
                      const py = yAt(peak.h);
                      return (
                            <g
                          key={peak.kev}
                          onClick={() => setSelected("characteristic")}
                          className="cursor-pointer"
                        >
                          <line
                            x1={px}
                            y1={y0}
                            x2={px}
                            y2={py}
                            stroke="hsl(280 75% 65%)"
                            strokeWidth={charHot ? 2.4 : 1.6}
                            opacity={visible ? (charHot ? 1 : 0.85) : 0.35}
                          />
                          <circle
                            cx={px}
                            cy={py}
                            r={charHot ? 3 : 2.2}
                            fill="hsl(280 80% 70%)"
                            stroke="hsl(280 70% 40%)"
                            strokeWidth="0.5"
                            opacity={visible ? 1 : 0.45}
                          />
                          {showLabels && (
                            <text
                              x={px + 5}
                              y={py - 4}
                              className="text-[8px] fill-foreground select-none pointer-events-none"
                            >
                              {peak.label}
                            </text>
                          )}
                        </g>
  );
                    })}

                    {/* Title */}
                    <text
                      x={x0}
                      y={yTop - 14}
                      className="text-[10px] font-semibold fill-foreground select-none"
                    >
                      Output spectrum (W anode, illustrative @ {kVp} kVp)
                    </text>
                  </>
                );
              })()}
            </svg>
            <p className="text-[11px] text-center text-muted-foreground mt-1 italic">
              Continuous bremsstrahlung up to <span className="font-semibold not-italic text-foreground">kVp</span>;
              tungsten K-lines emerge once tube voltage exceeds the ~70 keV K-edge.
            </p>
          </div>
        )}

        {/* Detail panel */}
        <div className="mt-4 min-h-[110px]">
          <div
            className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5"
            style={{ borderLeftWidth: 4, borderLeftColor: regionColor }}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-foreground text-sm">{item.label}</p>
              <span
                className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                style={{ background: `${regionColor}26`, color: regionColor }}
              >
                {item.region}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{item.detail}</p>

            {SAFETY_LINKS[selected] && (
              <div className="pt-2 mt-1 border-t border-border/60">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1.5">
                  Related radiation safety
                </p>
                <ul className="flex flex-wrap gap-1.5">
                  {SAFETY_LINKS[selected]!.map((link) => (
                    <li key={link.href + link.label}>
                      <a
                        href={link.href}
                        title={link.why}
                        className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-md border border-border bg-muted/40 text-foreground hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-colors"
                      >
                        {link.label}
                        <ArrowRight className="h-3 w-3" aria-hidden />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default XRayTubeDiagram;
