import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DiagramFigure } from "./_shared/DiagramFigure";

type DeviceCategory = "ett" | "sad1" | "sad2" | "vl-channelled" | "vl-standard";

interface DeviceInfo {
  label: string;
  fullName: string;
  examples: string;
  sealPressure?: string;
  keyFeatures: string[];
  crossSection: React.ReactNode;
}

const devices: Record<DeviceCategory, DeviceInfo> = {
  ett: {
    label: "ETT",
    fullName: "Endotracheal Tube",
    examples: "Standard oral/nasal ETT, RAE tube, armoured tube",
    keyFeatures: [
      "Definitive airway — cuff seals trachea",
      "Sizes: 7.0-8.0 (♀), 8.0-9.0 (♂) mm ID",
      "Murphy eye — ventilation if bevel occludes",
      "High-volume low-pressure cuff (≤30 cmH₂O)",
      "Subglottic suction port (ICU tubes) — reduces VAP",
    ],
    crossSection: (
      <svg viewBox="0 0 200 160" className="w-full">
        {/* Trachea outline */}
        <ellipse cx="100" cy="80" rx="55" ry="60" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="4 2" />
        <text x="100" y="148" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle">Trachea</text>
        {/* ETT tube */}
        <rect x="82" y="20" width="36" height="120" rx="18" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="2" />
        {/* Lumen */}
        <rect x="90" y="25" width="20" height="110" rx="10" fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1" />
        <text x="100" y="75" fontSize="7" fill="hsl(var(--primary))" textAnchor="middle">Lumen</text>
        {/* Cuff */}
        <ellipse cx="100" cy="110" rx="48" ry="15" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="100" y="114" fontSize="7" fill="hsl(var(--primary))" textAnchor="middle">Cuff</text>
        {/* Murphy eye */}
        <ellipse cx="115" cy="130" rx="5" ry="4" fill="hsl(var(--accent)/0.3)" stroke="hsl(var(--accent))" strokeWidth="1" />
        <text x="140" y="133" fontSize="6" fill="hsl(var(--muted-foreground))">Murphy eye</text>
        {/* Label */}
        <text x="100" y="15" fontSize="8" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">Cross-Section</text>
      </svg>
    ),
  },
  sad1: {
    label: "1st Gen SAD",
    fullName: "1st Generation Supraglottic Airway",
    examples: "Classic LMA, Flexible LMA",
    sealPressure: "15-20 cmH₂O",
    keyFeatures: [
      "Single airway lumen — no gastric port",
      "Oval cuff sits around laryngeal inlet",
      "Lower seal pressures (15-20 cmH₂O)",
      "Adequate for spontaneous ventilation",
      "Higher aspiration risk than 2nd gen",
    ],
    crossSection: (
      <svg viewBox="0 0 200 160" className="w-full">
        {/* Pharynx */}
        <path d="M 40 20 Q 40 80 60 130 Q 80 155 100 155 Q 120 155 140 130 Q 160 80 160 20" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="4 2" />
        <text x="100" y="15" fontSize="8" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">Sagittal View</text>
        {/* Cuff */}
        <path d="M 60 60 Q 50 90 60 120 Q 80 145 100 145 Q 120 145 140 120 Q 150 90 140 60 Z" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="100" y="130" fontSize="7" fill="hsl(var(--primary))" textAnchor="middle">Cuff</text>
        {/* Airway tube */}
        <rect x="88" y="20" width="24" height="80" rx="12" fill="hsl(var(--primary)/0.2)" stroke="hsl(var(--primary))" strokeWidth="2" />
        <text x="100" y="55" fontSize="6" fill="hsl(var(--primary))" textAnchor="middle">Airway</text>
        {/* Aperture bars */}
        <line x1="92" y1="95" x2="108" y2="95" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <line x1="92" y1="100" x2="108" y2="100" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <text x="125" y="98" fontSize="6" fill="hsl(var(--muted-foreground))">Aperture bars</text>
        {/* Larynx label */}
        <text x="100" y="115" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">→ Laryngeal inlet</text>
      </svg>
    ),
  },
  sad2: {
    label: "2nd Gen SAD",
    fullName: "2nd Generation Supraglottic Airway",
    examples: "i-gel, ProSeal LMA, LMA Supreme",
    sealPressure: "25-35 cmH₂O",
    keyFeatures: [
      "Dual lumen — airway + gastric drain channel",
      "Higher seal pressures (25-35 cmH₂O)",
      "Allows PPV and reduces aspiration risk",
      "i-gel: non-inflatable thermoplastic elastomer",
      "DAS Plan B recommended device",
    ],
    crossSection: (
      <svg viewBox="0 0 200 160" className="w-full">
        {/* Pharynx */}
        <path d="M 40 20 Q 40 80 60 130 Q 80 155 100 155 Q 120 155 140 130 Q 160 80 160 20" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="4 2" />
        <text x="100" y="15" fontSize="8" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">Sagittal View</text>
        {/* Cuff - larger, better seal */}
        <path d="M 55 55 Q 45 85 55 120 Q 75 150 100 150 Q 125 150 145 120 Q 155 85 145 55 Z" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="100" y="140" fontSize="7" fill="hsl(var(--primary))" textAnchor="middle">Enhanced cuff</text>
        {/* Airway tube */}
        <rect x="80" y="20" width="20" height="85" rx="10" fill="hsl(var(--primary)/0.2)" stroke="hsl(var(--primary))" strokeWidth="2" />
        <text x="90" y="55" fontSize="5" fill="hsl(var(--primary))" textAnchor="middle">Air</text>
        {/* Gastric drain tube */}
        <rect x="104" y="20" width="14" height="130" rx="7" fill="hsl(var(--accent)/0.2)" stroke="hsl(var(--accent))" strokeWidth="1.5" />
        <text x="111" y="55" fontSize="5" fill="hsl(var(--accent))" textAnchor="middle">GD</text>
        {/* Labels */}
        <line x1="118" y1="50" x2="145" y2="40" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
        <text x="147" y="43" fontSize="6" fill="hsl(var(--muted-foreground))">Gastric drain</text>
        <line x1="80" y1="50" x2="55" y2="40" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
        <text x="53" y="43" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="end">Airway lumen</text>
      </svg>
    ),
  },
  "vl-channelled": {
    label: "VL (Channelled)",
    fullName: "Channelled Videolaryngoscope",
    examples: "Airtraq, King Vision (channelled blade)",
    keyFeatures: [
      "Integrated tube channel guides ETT to glottis",
      "Camera at blade tip for indirect view",
      "Hyperangulated blade (>60°)",
      "Good for anterior larynx / C-spine immobilisation",
      "Higher first-pass success in novice users",
    ],
    crossSection: (
      <svg viewBox="0 0 200 160" className="w-full">
        <text x="100" y="15" fontSize="8" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">Channelled VL — Side View</text>
        {/* Blade body */}
        <path d="M 30 40 L 30 130 Q 30 145 45 150 L 120 155 Q 140 155 145 140 L 148 50 Q 148 35 135 32 L 45 32 Q 30 32 30 40 Z" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="2" />
        {/* Channel */}
        <path d="M 50 40 L 50 140 Q 50 148 60 150 L 90 152" fill="none" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" />
        <text x="38" y="90" fontSize="6" fill="hsl(var(--accent))" textAnchor="end">Channel</text>
        {/* ETT in channel */}
        <circle cx="90" cy="152" r="4" fill="hsl(var(--accent)/0.3)" stroke="hsl(var(--accent))" strokeWidth="1" />
        <text x="100" y="155" fontSize="6" fill="hsl(var(--muted-foreground))">ETT tip</text>
        {/* Camera */}
        <circle cx="130" cy="148" r="5" fill="hsl(var(--primary)/0.3)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="130" y="138" fontSize="6" fill="hsl(var(--primary))" textAnchor="middle">Camera</text>
        {/* Handle */}
        <rect x="60" y="22" width="60" height="14" rx="4" fill="hsl(var(--muted)/0.5)" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="90" y="32" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">Handle + screen</text>
      </svg>
    ),
  },
  "vl-standard": {
    label: "VL (Standard)",
    fullName: "Non-Channelled Videolaryngoscope",
    examples: "McGrath MAC, C-MAC, GlideScope",
    keyFeatures: [
      "Macintosh-profile or hyperangulated blade",
      "Camera near tip — view on attached/separate screen",
      "Use standard intubation technique (with stylet)",
      "Can be used as direct + video simultaneously",
      "Versatile — works for routine and difficult airways",
    ],
    crossSection: (
      <svg viewBox="0 0 200 160" className="w-full">
        <text x="100" y="15" fontSize="8" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="bold">Standard VL — Side View</text>
        {/* Blade */}
        <path d="M 30 50 Q 30 60 35 65 L 35 130 Q 35 145 50 150 L 140 155 Q 155 155 155 140 L 155 65 Q 155 50 140 45 L 45 42 Q 30 42 30 50 Z" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="2" />
        {/* Mac-like curved blade profile */}
        <path d="M 45 145 Q 80 130 120 140 Q 140 148 148 150" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
        <text x="95" y="132" fontSize="6" fill="hsl(var(--muted-foreground))" textAnchor="middle">Curved blade tip</text>
        {/* Camera */}
        <circle cx="140" cy="147" r="5" fill="hsl(var(--primary)/0.3)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="140" y="137" fontSize="6" fill="hsl(var(--primary))" textAnchor="middle">Camera</text>
        {/* Screen */}
        <rect x="50" y="30" width="85" height="15" rx="3" fill="hsl(var(--accent)/0.15)" stroke="hsl(var(--accent))" strokeWidth="1" />
        <text x="92" y="40" fontSize="6" fill="hsl(var(--accent))" textAnchor="middle">Integrated screen</text>
        {/* ETT (separate, with stylet) */}
        <path d="M 75 65 Q 85 100 100 140 Q 105 150 112 153" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" strokeDasharray="4 2" />
        <text x="65" y="85" fontSize="6" fill="hsl(var(--accent))" textAnchor="end">ETT + stylet</text>
      </svg>
    ),
  },
};

export const AirwayDevicesDiagram = () => {
  const [active, setActive] = useState<DeviceCategory>("ett");
  const d = devices[active];

  return (
    <DiagramFigure
      id="airway-devices-diagram"
      title="Airway devices"
      description="Auto-generated wrapper for the Airway devices anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="space-y-4">
        <div className="flex gap-1.5 flex-wrap">
          {(Object.keys(devices) as DeviceCategory[]).map((key) => (
            <Button key={key} variant={active === key ? "default" : "outline"} size="sm" className="text-xs" onClick={() => setActive(key)}>
              {devices[key].label}
            </Button>
          ))}
        </div>
  
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Cross-section diagram */}
          <div className="rounded-lg border border-border bg-secondary/20 p-3">
            {d.crossSection}
          </div>
  
          {/* Features */}
          <div className="space-y-3">
            <div>
              <p className="font-semibold text-foreground text-sm">{d.fullName}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{d.examples}</p>
              {d.sealPressure && (
                <p className="text-xs text-primary font-medium mt-1">Seal pressure: {d.sealPressure}</p>
              )}
            </div>
            <ul className="space-y-1.5">
              {d.keyFeatures.map((f) => (
                <li key={f} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-primary mt-0.5 shrink-0">▸</span>{f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};
