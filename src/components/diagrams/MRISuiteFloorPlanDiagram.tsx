import { useState } from "react";
import { cn } from "@/lib/utils";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Bird's-eye view of an MRI suite.
 *
 * Shows the four MR safety zones, the Faraday cage (with its waveguide
 * penetration / "hole" for piped gases & monitoring), the magnet bore,
 * and the 50 G and 5 G (and 100 G for completeness) iso-Gauss contour
 * lines projected onto the floor. Equipment and personnel positions are
 * tap-able and highlight a detail card below the SVG.
 *
 * Follows the project diagram style guide: DiagramToggleBar header,
 * HSL tokens, prefixed defs ids, detail panel with 4-px accent border.
 */

type EquipmentKey =
  | "magnet"
  | "control"
  | "anaesthetic-machine"
  | "monitor"
  | "infusion"
  | "patient-table"
  | "induction-trolley"
  | "waveguide"
  | "quench-pipe"
  | "cryogen-vent"
  | "zone1"
  | "zone2"
  | "zone3"
  | "zone4"
  | "gauss-5"
  | "gauss-50"
  | "gauss-100"
  | "faraday";

interface EquipmentInfo {
  title: string;
  zone: string;
  body: string;
  toneClass: string;
}

const INFO: Record<EquipmentKey, EquipmentInfo> = {
  magnet: {
    title: "Superconducting magnet (1.5 T or 3 T)",
    zone: "Zone IV",
    body:
      "Bore aperture ≈ 60 cm. Static field B₀ is always on — even when the scanner appears 'off'. The magnet is the source of every fringe-field hazard in this room.",
    toneClass: "border-destructive",
  },
  control: {
    title: "Control room (radiographer console)",
    zone: "Zone III",
    body:
      "RF-shielded glass window onto the scanner. Anaesthetic monitor slave display sits here so the team can watch vitals without re-entering Zone IV.",
    toneClass: "border-physics",
  },
  "anaesthetic-machine": {
    title: "MR-conditional anaesthetic machine",
    zone: "Zone IV",
    body:
      "Yellow-labelled, MR-conditional (safe up to a stated Gauss line — typically 100 G). Positioned outside the 50 G line. Aluminium gas cylinders only.",
    toneClass: "border-pharmacology",
  },
  monitor: {
    title: "MR-conditional patient monitor",
    zone: "Zone IV",
    body:
      "Fibre-optic ECG cables, long sampling line for capnography (≈ 3 m delay), wireless or fibre-optic SpO₂ to avoid burns. Displays slaved to the control room.",
    toneClass: "border-pharmacology",
  },
  infusion: {
    title: "MR-conditional syringe pumps",
    zone: "Zone IV",
    body:
      "Mounted on non-ferrous stand outside 50 G. Long extension lines run to the patient. TIVA is preferred when volatile delivery to the bore is impractical.",
    toneClass: "border-pharmacology",
  },
  "patient-table": {
    title: "Patient table & bore",
    zone: "Zone IV",
    body:
      "Patient is supine, head- or feet-first. Acoustic noise ≥ 99 dB during scanning — ear protection mandatory. Plan for emergency removal during a quench.",
    toneClass: "border-physiology",
  },
  "induction-trolley": {
    title: "Anaesthetic induction area",
    zone: "Zone III",
    body:
      "Induction occurs OUTSIDE Zone IV on a standard (ferromagnetic) trolley, then the patient is transferred to an MR-safe trolley before crossing the Zone IV door.",
    toneClass: "border-clinical",
  },
  waveguide: {
    title: "Waveguide penetration ('hole' in the Faraday cage)",
    zone: "Cage wall",
    body:
      "A short, narrow brass tube through the copper Faraday cage that lets piped medical gases, scavenging and electrical/fibre lines into Zone IV without admitting RF interference (the tube length ≫ wavelength of stray RF).",
    toneClass: "border-accent",
  },
  "quench-pipe": {
    title: "Cryogen quench pipe",
    zone: "Roof / external",
    body:
      "Wide-bore pipe vents helium gas safely to atmosphere if the magnet quenches. If it fails, helium displaces O₂ in the room → asphyxia + freezing burns + sudden door pressure lock.",
    toneClass: "border-destructive",
  },
  "cryogen-vent": {
    title: "Quench button",
    zone: "Zone IV / Control",
    body:
      "Manually quenches the magnet — collapses B₀ over ~20 seconds. Reserved for true emergency (entrapment by ferromagnetic projectile, fire). Costs ≈ £30k of helium and days of downtime.",
    toneClass: "border-destructive",
  },
  zone1: {
    title: "Zone I — Public access",
    zone: "Zone I",
    body: "Freely accessible to the general public. No MR hazards. Hospital corridors, waiting room.",
    toneClass: "border-border",
  },
  zone2: {
    title: "Zone II — Reception & screening",
    zone: "Zone II",
    body:
      "Patients are greeted and complete the MR safety questionnaire. Supervised but unrestricted. No fringe field of clinical significance.",
    toneClass: "border-border",
  },
  zone3: {
    title: "Zone III — Restricted (control room)",
    zone: "Zone III",
    body:
      "Access strictly controlled by MR personnel. Includes the control room. Ferromagnetic objects can become projectiles if accidentally taken further inwards.",
    toneClass: "border-physics",
  },
  zone4: {
    title: "Zone IV — The magnet room",
    zone: "Zone IV",
    body:
      "Inside the Faraday cage. The magnet is here and is ALWAYS ON. Entry only after checklist screening. All equipment must be MR-safe or MR-conditional.",
    toneClass: "border-destructive",
  },
  "gauss-5": {
    title: "5 Gauss line (0.5 mT)",
    zone: "Safety boundary",
    body:
      "Public exclusion limit — pacemakers and other active implants must NOT cross. Often the boundary of Zone IV in practice. In SI units this equals 0.5 mT (Earth's field ≈ 0.5 G).",
    toneClass: "border-physics",
  },
  "gauss-50": {
    title: "50 Gauss line (5 mT)",
    zone: "Safety boundary",
    body:
      "Maximum field at which most MR-conditional anaesthetic monitors and infusion pumps remain functional. Equipment placed OUTSIDE this contour; long lines run inwards to the patient.",
    toneClass: "border-pharmacology",
  },
  "gauss-100": {
    title: "100 Gauss line (10 mT)",
    zone: "Safety boundary",
    body:
      "Many MR-conditional anaesthetic machines are rated to 100 G — they may sit between 50 and 100 G. Beyond this, mechanical valves and motors fail and ferromagnetic attraction becomes very strong.",
    toneClass: "border-clinical",
  },
  faraday: {
    title: "Faraday cage",
    zone: "Zone IV wall",
    body:
      "Continuous copper / aluminium mesh sheath enclosing the entire magnet room — including walls, ceiling, floor and door. Excludes external RF that would otherwise contaminate the 64 / 128 MHz received signal. Penetrated only by sealed waveguides and an RF-shielded door & window.",
    toneClass: "border-accent",
  },
};

const HotZone = ({
  active,
  onClick,
  children,
  label,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  label: string;
}) => (
  <g
    role="button"
    aria-label={label}
    tabIndex={0}
    onClick={onClick}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    }}
    className={cn(
      "cursor-pointer transition-opacity",
      active ? "opacity-100" : "opacity-90 hover:opacity-100",
    )}
  >
    {children}
  </g>
);

export const MRISuiteFloorPlanDiagram = () => {
  const [showLabels, setShowLabels] = useState(true);
  const [showSutures, setShowSutures] = useState(true); // re-purposed: "show contour lines"
  const [selected, setSelected] = useState<EquipmentKey>("magnet");

  const select = (k: EquipmentKey) => setSelected(k);
  const isSel = (k: EquipmentKey) => selected === k;

  const info = INFO[selected];

  return (
    <DiagramFigure
      id="mri-suite-floor-plan-diagram"
      title="MRI suite floor plan"
      description="Auto-generated wrapper for the MRI suite floor plan anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="MRI Suite — Bird's-eye view"
            subtitle="Tap a zone, equipment item or contour for details"
            toggles={[
              { label: "Gauss lines", active: showSutures, onChange: () => setShowSutures((v) => !v) },
              { label: "Labels", active: showLabels, onChange: () => setShowLabels((v) => !v) },
            ]}
          />
  
          <svg
            viewBox="0 0 760 520"
            role="img"
            aria-label="Bird's eye view of an MRI suite showing the four safety zones, the Faraday cage with its waveguide penetration, equipment positions, and the 50 G and 100 G iso-contour lines"
            className="w-full mt-3"
          >
            <defs>
              <radialGradient id="mri-fp-bg" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.35" />
                <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0" />
              </radialGradient>
  
              <pattern id="mri-fp-floor" patternUnits="userSpaceOnUse" width="14" height="14">
                <rect width="14" height="14" fill="hsl(var(--background))" />
                <path
                  d="M 14 0 L 0 0 0 14"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.5"
                  opacity="0.45"
                  fill="none"
                />
              </pattern>
  
              <pattern id="mri-fp-faraday" patternUnits="userSpaceOnUse" width="6" height="6">
                <path
                  d="M 0 6 L 6 0"
                  stroke="hsl(var(--accent))"
                  strokeWidth="1"
                  opacity="0.55"
                />
              </pattern>
  
              <radialGradient id="mri-fp-gauss" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity="0.35" />
                <stop offset="55%" stopColor="hsl(var(--destructive))" stopOpacity="0.10" />
                <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity="0" />
              </radialGradient>
  
              <filter id="mri-fp-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="hsl(var(--foreground))" floodOpacity="0.18" />
              </filter>
            </defs>
  
            {/* Backdrop */}
            <rect x="0" y="0" width="760" height="520" fill="url(#mri-fp-bg)" />
  
            {/* ============================================================
                ZONE I — Public corridor (left strip)
               ============================================================ */}
            <HotZone active={isSel("zone1")} onClick={() => select("zone1")} label="Zone I">
              <rect
                x="20"
                y="40"
                width="100"
                height="440"
                rx="6"
                fill="url(#mri-fp-floor)"
                stroke={isSel("zone1") ? "hsl(var(--primary))" : "hsl(var(--border))"}
                strokeWidth={isSel("zone1") ? 2 : 1}
              />
              {showLabels && (
                <>
                  <text
                    x="70"
                    y="62"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="hsl(var(--muted-foreground))"
                    letterSpacing="1.5"
                  >
                    ZONE I
                  </text>
                  <text
                    x="70"
                    y="76"
                    textAnchor="middle"
                    fontSize="8"
                    fill="hsl(var(--muted-foreground))"
                  >
                    Public
                  </text>
                </>
              )}
            </HotZone>
  
            {/* ============================================================
                ZONE II — Reception / screening
               ============================================================ */}
            <HotZone active={isSel("zone2")} onClick={() => select("zone2")} label="Zone II">
              <rect
                x="120"
                y="40"
                width="120"
                height="440"
                rx="4"
                fill="url(#mri-fp-floor)"
                stroke={isSel("zone2") ? "hsl(var(--primary))" : "hsl(var(--border))"}
                strokeWidth={isSel("zone2") ? 2 : 1}
              />
              {showLabels && (
                <>
                  <text
                    x="180"
                    y="62"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="hsl(var(--muted-foreground))"
                    letterSpacing="1.5"
                  >
                    ZONE II
                  </text>
                  <text x="180" y="76" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">
                    Reception · Screening
                  </text>
                </>
              )}
              {/* Reception desk */}
              <rect x="140" y="200" width="80" height="20" rx="3" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
              {showLabels && (
                <text x="180" y="214" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">Reception</text>
              )}
            </HotZone>
  
            {/* ============================================================
                ZONE III — Control room area
               ============================================================ */}
            <HotZone active={isSel("zone3")} onClick={() => select("zone3")} label="Zone III">
              <rect
                x="240"
                y="40"
                width="180"
                height="440"
                rx="4"
                fill="url(#mri-fp-floor)"
                stroke={isSel("zone3") ? "hsl(var(--physics))" : "hsl(var(--border))"}
                strokeWidth={isSel("zone3") ? 2 : 1}
              />
              {showLabels && (
                <>
                  <text
                    x="330"
                    y="62"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="hsl(var(--physics))"
                    letterSpacing="1.5"
                  >
                    ZONE III
                  </text>
                  <text x="330" y="76" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">
                    Restricted · Control
                  </text>
                </>
              )}
            </HotZone>
  
            {/* Control room console */}
            <HotZone active={isSel("control")} onClick={() => select("control")} label="Control room">
              <rect
                x="270"
                y="160"
                width="120"
                height="60"
                rx="4"
                fill={isSel("control") ? "hsl(var(--physics) / 0.25)" : "hsl(var(--card))"}
                stroke={isSel("control") ? "hsl(var(--physics))" : "hsl(var(--border))"}
                strokeWidth={isSel("control") ? 2 : 1}
                filter="url(#mri-fp-shadow)"
              />
              {/* Monitors on console */}
              <rect x="285" y="172" width="30" height="20" rx="2" fill="hsl(var(--physics) / 0.5)" stroke="hsl(var(--physics))" />
              <rect x="320" y="172" width="30" height="20" rx="2" fill="hsl(var(--physics) / 0.5)" stroke="hsl(var(--physics))" />
              <rect x="355" y="172" width="30" height="20" rx="2" fill="hsl(var(--physics) / 0.5)" stroke="hsl(var(--physics))" />
              {/* Operator chair */}
              <circle cx="330" cy="208" r="6" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
              {showLabels && (
                <text x="330" y="244" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontWeight="600">
                  Control console
                </text>
              )}
            </HotZone>
  
            {/* Induction trolley */}
            <HotZone active={isSel("induction-trolley")} onClick={() => select("induction-trolley")} label="Induction trolley">
              <rect
                x="270"
                y="380"
                width="120"
                height="50"
                rx="4"
                fill={isSel("induction-trolley") ? "hsl(var(--clinical) / 0.25)" : "hsl(var(--card))"}
                stroke={isSel("induction-trolley") ? "hsl(var(--clinical))" : "hsl(var(--border))"}
                strokeWidth={isSel("induction-trolley") ? 2 : 1}
                filter="url(#mri-fp-shadow)"
              />
              {/* Trolley body */}
              <rect x="285" y="392" width="90" height="22" rx="3" fill="hsl(var(--clinical) / 0.4)" stroke="hsl(var(--clinical))" />
              {[295, 320, 345, 370].map((cx) => (
                <circle key={cx} cx={cx} cy="418" r="3" fill="hsl(var(--foreground))" />
              ))}
              {showLabels && (
                <text x="330" y="446" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontWeight="600">
                  Induction area
                </text>
              )}
            </HotZone>
  
            {/* RF-shielded window between III and IV */}
            <line x1="420" y1="160" x2="420" y2="220" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" />
            {showLabels && (
              <text
                x="430"
                y="155"
                fontSize="7"
                fill="hsl(var(--accent))"
                fontWeight="600"
              >
                RF-shielded window
              </text>
            )}
  
            {/* ============================================================
                ZONE IV — Magnet room (inside the Faraday cage)
               ============================================================ */}
            <HotZone active={isSel("zone4")} onClick={() => select("zone4")} label="Zone IV">
              <rect
                x="420"
                y="40"
                width="320"
                height="440"
                rx="4"
                fill="url(#mri-fp-floor)"
                stroke={isSel("zone4") ? "hsl(var(--destructive))" : "hsl(var(--border))"}
                strokeWidth={isSel("zone4") ? 2 : 1}
              />
              {showLabels && (
                <>
                  <text
                    x="580"
                    y="62"
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="hsl(var(--destructive))"
                    letterSpacing="1.5"
                  >
                    ZONE IV — MAGNET ROOM
                  </text>
                  <text x="580" y="76" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">
                    Faraday cage · Field always ON
                  </text>
                </>
              )}
            </HotZone>
  
            {/* Faraday cage outline (stripe pattern just inside Zone IV) */}
            <HotZone active={isSel("faraday")} onClick={() => select("faraday")} label="Faraday cage">
              <rect
                x="424"
                y="86"
                width="312"
                height="390"
                rx="3"
                fill="none"
                stroke="url(#mri-fp-faraday)"
                strokeWidth="3"
              />
              <rect
                x="424"
                y="86"
                width="312"
                height="390"
                rx="3"
                fill="none"
                stroke={isSel("faraday") ? "hsl(var(--accent))" : "hsl(var(--accent) / 0.6)"}
                strokeWidth={isSel("faraday") ? 2 : 1}
                strokeDasharray="2 3"
              />
              {showLabels && (
                <text x="436" y="100" fontSize="7" fill="hsl(var(--accent))" fontWeight="700" letterSpacing="1">
                  FARADAY CAGE (Cu mesh)
                </text>
              )}
            </HotZone>
  
            {/* Iso-Gauss contour lines (concentric ellipses centred on the magnet) */}
            {showSutures && (
              <g aria-label="Iso-Gauss contour lines" style={{ pointerEvents: "none" }}>
                {/* 5 G — large outer */}
                <ellipse
                  cx="580"
                  cy="260"
                  rx="200"
                  ry="160"
                  fill="none"
                  stroke="hsl(var(--physics))"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                  opacity="0.7"
                />
                {/* 50 G */}
                <ellipse
                  cx="580"
                  cy="260"
                  rx="135"
                  ry="105"
                  fill="none"
                  stroke="hsl(var(--pharmacology))"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />
                {/* 100 G */}
                <ellipse
                  cx="580"
                  cy="260"
                  rx="95"
                  ry="72"
                  fill="none"
                  stroke="hsl(var(--clinical))"
                  strokeWidth="2"
                  strokeDasharray="10 3"
                />
                {/* Soft fringe field wash */}
                <ellipse cx="580" cy="260" rx="200" ry="160" fill="url(#mri-fp-gauss)" opacity="0.5" />
              </g>
            )}
  
            {/* Clickable Gauss labels */}
            {showSutures && showLabels && (
              <>
                <HotZone active={isSel("gauss-5")} onClick={() => select("gauss-5")} label="5 Gauss line">
                  <rect x="438" y="112" width="46" height="14" rx="3" fill="hsl(var(--background))" stroke="hsl(var(--physics))" strokeWidth="1" />
                  <text x="461" y="122" textAnchor="middle" fontSize="9" fill="hsl(var(--physics))" fontWeight="700">5 G</text>
                </HotZone>
                <HotZone active={isSel("gauss-50")} onClick={() => select("gauss-50")} label="50 Gauss line">
                  <rect x="498" y="158" width="48" height="14" rx="3" fill="hsl(var(--background))" stroke="hsl(var(--pharmacology))" strokeWidth="1" />
                  <text x="522" y="168" textAnchor="middle" fontSize="9" fill="hsl(var(--pharmacology))" fontWeight="700">50 G</text>
                </HotZone>
                <HotZone active={isSel("gauss-100")} onClick={() => select("gauss-100")} label="100 Gauss line">
                  <rect x="540" y="195" width="56" height="14" rx="3" fill="hsl(var(--background))" stroke="hsl(var(--clinical))" strokeWidth="1" />
                  <text x="568" y="205" textAnchor="middle" fontSize="9" fill="hsl(var(--clinical))" fontWeight="700">100 G</text>
                </HotZone>
              </>
            )}
  
            {/* Magnet (centre of Zone IV) — drawn as cylindrical bore */}
            <HotZone active={isSel("magnet")} onClick={() => select("magnet")} label="MRI magnet">
              {/* Outer housing */}
              <rect
                x="530"
                y="220"
                width="100"
                height="80"
                rx="14"
                fill="hsl(var(--card))"
                stroke={isSel("magnet") ? "hsl(var(--destructive))" : "hsl(var(--foreground))"}
                strokeWidth={isSel("magnet") ? 2.5 : 1.5}
                filter="url(#mri-fp-shadow)"
              />
              {/* Bore */}
              <ellipse
                cx="580"
                cy="260"
                rx="20"
                ry="22"
                fill="hsl(var(--muted))"
                stroke="hsl(var(--foreground))"
                strokeWidth="1"
              />
              <ellipse cx="580" cy="260" rx="14" ry="16" fill="hsl(var(--background))" stroke="hsl(var(--border))" />
              {/* North/South pole hints */}
              <text x="540" y="266" fontSize="9" fill="hsl(var(--muted-foreground))" fontWeight="700">N</text>
              <text x="615" y="266" fontSize="9" fill="hsl(var(--muted-foreground))" fontWeight="700">S</text>
              {showLabels && (
                <text x="580" y="214" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="700">
                  Magnet (1.5 T)
                </text>
              )}
            </HotZone>
  
            {/* Patient table extending out of bore */}
            <HotZone active={isSel("patient-table")} onClick={() => select("patient-table")} label="Patient table">
              <rect
                x="618"
                y="252"
                width="92"
                height="16"
                rx="3"
                fill={isSel("patient-table") ? "hsl(var(--physiology) / 0.4)" : "hsl(var(--muted))"}
                stroke={isSel("patient-table") ? "hsl(var(--physiology))" : "hsl(var(--border))"}
                strokeWidth={isSel("patient-table") ? 2 : 1}
              />
              {/* Patient silhouette */}
              <ellipse cx="700" cy="260" rx="6" ry="5" fill="hsl(var(--foreground))" opacity="0.55" />
              <rect x="640" y="256" width="60" height="8" rx="3" fill="hsl(var(--foreground))" opacity="0.35" stroke="hsl(var(--border))" strokeWidth="0.75" />
              {showLabels && (
                <text x="664" y="282" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">
                  Patient table
                </text>
              )}
            </HotZone>
  
            {/* Anaesthetic machine — placed just outside 50 G to the right */}
            <HotZone active={isSel("anaesthetic-machine")} onClick={() => select("anaesthetic-machine")} label="Anaesthetic machine">
              <rect
                x="700"
                y="350"
                width="32"
                height="44"
                rx="3"
                fill={isSel("anaesthetic-machine") ? "hsl(var(--pharmacology) / 0.4)" : "hsl(var(--card))"}
                stroke={isSel("anaesthetic-machine") ? "hsl(var(--pharmacology))" : "hsl(var(--pharmacology) / 0.7)"}
                strokeWidth={isSel("anaesthetic-machine") ? 2 : 1.4}
                filter="url(#mri-fp-shadow)"
              />
              {/* Cylinders on top */}
              <circle cx="708" cy="356" r="3" fill="hsl(var(--pharmacology))" />
              <circle cx="716" cy="356" r="3" fill="hsl(var(--pharmacology))" />
              <circle cx="724" cy="356" r="3" fill="hsl(var(--pharmacology))" />
              {/* Long circuit tubing back to the patient */}
              <path
                d="M 700 372 C 680 372 670 268 700 264"
                stroke="hsl(var(--pharmacology))"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="3 3"
                opacity="0.7"
              />
              {showLabels && (
                <text x="716" y="408" textAnchor="middle" fontSize="7" fill="hsl(var(--pharmacology))" fontWeight="600">
                  MR-cond. machine
                </text>
              )}
            </HotZone>
  
            {/* MR-conditional monitor */}
            <HotZone active={isSel("monitor")} onClick={() => select("monitor")} label="Patient monitor">
              <rect
                x="688"
                y="120"
                width="40"
                height="30"
                rx="3"
                fill={isSel("monitor") ? "hsl(var(--pharmacology) / 0.4)" : "hsl(var(--card))"}
                stroke={isSel("monitor") ? "hsl(var(--pharmacology))" : "hsl(var(--pharmacology) / 0.7)"}
                strokeWidth={isSel("monitor") ? 2 : 1.4}
                filter="url(#mri-fp-shadow)"
              />
              <rect x="694" y="126" width="28" height="18" rx="1.5" fill="hsl(var(--pharmacology) / 0.55)" />
              {/* Fibre line to patient */}
              <path
                d="M 700 150 C 700 200 700 230 706 252"
                stroke="hsl(var(--pharmacology))"
                strokeWidth="1"
                fill="none"
                strokeDasharray="2 3"
                opacity="0.7"
              />
              {showLabels && (
                <text x="708" y="116" textAnchor="middle" fontSize="7" fill="hsl(var(--pharmacology))" fontWeight="600">
                  Monitor
                </text>
              )}
            </HotZone>
  
            {/* Infusion pumps */}
            <HotZone active={isSel("infusion")} onClick={() => select("infusion")} label="Syringe pumps">
              <rect
                x="438"
                y="350"
                width="34"
                height="44"
                rx="3"
                fill={isSel("infusion") ? "hsl(var(--pharmacology) / 0.4)" : "hsl(var(--card))"}
                stroke={isSel("infusion") ? "hsl(var(--pharmacology))" : "hsl(var(--pharmacology) / 0.7)"}
                strokeWidth={isSel("infusion") ? 2 : 1.4}
                filter="url(#mri-fp-shadow)"
              />
              <rect x="442" y="356" width="26" height="6" rx="1" fill="hsl(var(--pharmacology) / 0.55)" />
              <rect x="442" y="366" width="26" height="6" rx="1" fill="hsl(var(--pharmacology) / 0.55)" />
              <rect x="442" y="376" width="26" height="6" rx="1" fill="hsl(var(--pharmacology) / 0.55)" />
              {/* Long line to patient */}
              <path
                d="M 472 372 C 540 372 600 320 660 268"
                stroke="hsl(var(--pharmacology))"
                strokeWidth="1"
                fill="none"
                strokeDasharray="3 3"
                opacity="0.7"
              />
              {showLabels && (
                <text x="455" y="408" textAnchor="middle" fontSize="7" fill="hsl(var(--pharmacology))" fontWeight="600">
                  TIVA pumps
                </text>
              )}
            </HotZone>
  
            {/* Quench button on Zone IV wall (near door) */}
            <HotZone active={isSel("cryogen-vent")} onClick={() => select("cryogen-vent")} label="Quench button">
              <circle
                cx="430"
                cy="448"
                r="8"
                fill={isSel("cryogen-vent") ? "hsl(var(--destructive))" : "hsl(var(--destructive) / 0.7)"}
                stroke="hsl(var(--background))"
                strokeWidth="2"
              />
              <text x="430" y="452" textAnchor="middle" fontSize="9" fill="hsl(var(--destructive-foreground, 0 0% 100%))" fontWeight="700">
                Q
              </text>
              {showLabels && (
                <text x="446" y="452" fontSize="7" fill="hsl(var(--destructive))" fontWeight="600">
                  Quench btn
                </text>
              )}
            </HotZone>
  
            {/* Cryogen quench pipe — shown on the roof exiting through cage */}
            <HotZone active={isSel("quench-pipe")} onClick={() => select("quench-pipe")} label="Quench pipe">
              <rect
                x="572"
                y="86"
                width="16"
                height="40"
                fill={isSel("quench-pipe") ? "hsl(var(--destructive) / 0.4)" : "hsl(var(--muted))"}
                stroke={isSel("quench-pipe") ? "hsl(var(--destructive))" : "hsl(var(--border))"}
                strokeWidth={isSel("quench-pipe") ? 2 : 1}
              />
              {/* Hatching to indicate "up & out" */}
              <line x1="572" y1="92" x2="588" y2="92" stroke="hsl(var(--destructive))" strokeWidth="1" />
              <line x1="572" y1="100" x2="588" y2="100" stroke="hsl(var(--destructive))" strokeWidth="1" />
              <line x1="572" y1="108" x2="588" y2="108" stroke="hsl(var(--destructive))" strokeWidth="1" />
              {showLabels && (
                <text x="580" y="138" textAnchor="middle" fontSize="7" fill="hsl(var(--destructive))" fontWeight="600">
                  Quench pipe ↑
                </text>
              )}
            </HotZone>
  
            {/* ============================================================
                WAVEGUIDE — the "hole" in the Faraday cage
               ============================================================ */}
            <HotZone active={isSel("waveguide")} onClick={() => select("waveguide")} label="Waveguide penetration">
              {/* A short brass tube straddling the bottom cage wall */}
              <rect
                x="466"
                y="466"
                width="42"
                height="22"
                rx="2"
                fill={isSel("waveguide") ? "hsl(var(--accent) / 0.5)" : "hsl(var(--accent) / 0.3)"}
                stroke={isSel("waveguide") ? "hsl(var(--accent))" : "hsl(var(--accent) / 0.8)"}
                strokeWidth={isSel("waveguide") ? 2.5 : 1.5}
              />
              {/* Lines representing piped gases passing through */}
              <line x1="470" y1="470" x2="504" y2="470" stroke="hsl(var(--physiology))" strokeWidth="1.5" />
              <line x1="470" y1="477" x2="504" y2="477" stroke="hsl(var(--pharmacology))" strokeWidth="1.5" />
              <line x1="470" y1="484" x2="504" y2="484" stroke="hsl(var(--clinical))" strokeWidth="1.5" />
              {/* Annotation arrow */}
              <line
                x1="487"
                y1="466"
                x2="487"
                y2="436"
                stroke={isSel("waveguide") ? "hsl(var(--accent))" : "hsl(var(--muted-foreground))"}
                strokeWidth="1"
                markerEnd=""
              />
              {showLabels && (
                <text
                  x="487"
                  y="430"
                  textAnchor="middle"
                  fontSize="8"
                  fill={isSel("waveguide") ? "hsl(var(--accent))" : "hsl(var(--foreground))"}
                  fontWeight="700"
                >
                  Waveguide
                </text>
              )}
              {showLabels && (
                <text x="487" y="504" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">
                  gases · scavenge · fibre
                </text>
              )}
            </HotZone>
  
            {/* RF-shielded door between Zone III and Zone IV */}
            <g style={{ pointerEvents: "none" }}>
              <line x1="420" y1="320" x2="420" y2="380" stroke="hsl(var(--background))" strokeWidth="3" />
              <path
                d="M 420 320 A 60 60 0 0 1 460 360"
                fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              {showLabels && (
                <text x="430" y="316" fontSize="7" fill="hsl(var(--accent))" fontWeight="600">
                  RF door
                </text>
              )}
            </g>
  
            {/* Compass */}
            <g transform="translate(40 460)" style={{ pointerEvents: "none" }}>
              <circle r="14" fill="hsl(var(--background))" stroke="hsl(var(--border))" />
              <text y="-4" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" fontWeight="700">N</text>
              <text y="12" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">S</text>
            </g>
          </svg>
  
          {/* ============================================================
              DETAIL PANEL
             ============================================================ */}
          <div
            className={cn(
              "mt-3 rounded-md border-l-4 bg-card p-3 min-h-[110px] transition-colors",
              info.toneClass,
            )}
            aria-live="polite"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h4 className="text-sm font-semibold text-foreground">{info.title}</h4>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                {info.zone}
              </span>
            </div>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{info.body}</p>
          </div>
  
          {/* Quick-pick chips */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {(
              [
                ["zone1", "Zone I"],
                ["zone2", "Zone II"],
                ["zone3", "Zone III"],
                ["zone4", "Zone IV"],
                ["faraday", "Faraday cage"],
                ["waveguide", "Waveguide"],
                ["magnet", "Magnet"],
                ["patient-table", "Table"],
                ["anaesthetic-machine", "Machine"],
                ["monitor", "Monitor"],
                ["infusion", "Pumps"],
                ["control", "Control room"],
                ["induction-trolley", "Induction"],
                ["quench-pipe", "Quench pipe"],
                ["cryogen-vent", "Quench btn"],
                ["gauss-5", "5 G line"],
                ["gauss-50", "50 G line"],
                ["gauss-100", "100 G line"],
              ] as [EquipmentKey, string][]
            ).map(([k, label]) => (
              <button
                key={k}
                type="button"
                onClick={() => select(k)}
                aria-pressed={isSel(k)}
                className={cn(
                  "text-[11px] px-2 py-0.5 rounded-full border transition-colors",
                  isSel(k)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:bg-muted",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default MRISuiteFloorPlanDiagram;
