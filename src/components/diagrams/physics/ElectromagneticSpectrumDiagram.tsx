import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Electromagnetic spectrum diagram.
 *
 * Logarithmic frequency axis from radio (10^4 Hz) to gamma (10^22 Hz).
 * Each band is selectable; X-ray is highlighted by default to anchor the
 * topic context.
 */

type Band = {
  id: string;
  label: string;
  // log10(frequency Hz) start/end
  fStart: number;
  fEnd: number;
  color: string; // HSL token expression
  wavelength: string;
  energy: string;
  use: string;
  ionising?: boolean;
};

const BANDS: Band[] = [
  {
    id: "radio",
    label: "Radio",
    fStart: 4,
    fEnd: 9,
    color: "hsl(220 70% 60%)",
    wavelength: "100 km – 30 cm",
    energy: "~ 10⁻¹¹ – 10⁻⁶ eV",
    use: "AM/FM broadcasting, MRI RF pulses (typically ~10–300 MHz at clinical field strengths)",
  },
  {
    id: "microwave",
    label: "Microwave",
    fStart: 9,
    fEnd: 12,
    color: "hsl(190 70% 55%)",
    wavelength: "30 cm – 1 mm",
    energy: "~ 10⁻⁶ – 10⁻³ eV",
    use: "Radar, mobile phones, microwave diathermy, satellite communications",
  },
  {
    id: "ir",
    label: "Infrared",
    fStart: 12,
    fEnd: 14.5,
    color: "hsl(15 80% 55%)",
    wavelength: "1 mm – 700 nm",
    energy: "~ 10⁻³ – 1.7 eV",
    use: "Capnography (4.26 µm CO₂ band), pulse oximetry (940 nm), thermal imaging, tympanic thermometers",
  },
  {
    id: "visible",
    label: "Visible",
    fStart: 14.5,
    fEnd: 14.9,
    color: "hsl(120 60% 50%)",
    wavelength: "700 – 400 nm",
    energy: "~ 1.7 – 3.1 eV",
    use: "Pulse oximetry red channel (660 nm), laryngoscopy, fibre-optic illumination",
  },
  {
    id: "uv",
    label: "Ultraviolet",
    fStart: 14.9,
    fEnd: 16.5,
    color: "hsl(270 70% 60%)",
    wavelength: "400 – 10 nm",
    energy: "~ 3.1 – 124 eV",
    use: "UV germicidal irradiation, sterilisation; UV-C is just-ionising at the high end",
    ionising: true,
  },
  {
    id: "xray",
    label: "X-ray",
    fStart: 16.5,
    fEnd: 19.5,
    color: "hsl(var(--primary))",
    wavelength: "10 nm – 0.01 nm",
    energy: "~ 100 eV – 100 keV",
    use: "Diagnostic radiography, fluoroscopy, CT — typically 30–150 keV in clinical use",
    ionising: true,
  },
  {
    id: "gamma",
    label: "Gamma",
    fStart: 19.5,
    fEnd: 22,
    color: "hsl(0 75% 55%)",
    wavelength: "< 0.01 nm",
    energy: "> 100 keV",
    use: "Nuclear medicine (⁹⁹ᵐTc 140 keV), PET (511 keV annihilation photons), radiotherapy (Co-60 1.17/1.33 MeV)",
    ionising: true,
  },
];

const W = 760;
const H = 220;
const PAD_L = 50;
const PAD_R = 30;
const PAD_T = 60;
const PAD_B = 50;
const PLOT_W = W - PAD_L - PAD_R;
const F_MIN = 4;
const F_MAX = 22;

const xOf = (logF: number) => PAD_L + ((logF - F_MIN) / (F_MAX - F_MIN)) * PLOT_W;

const ElectromagneticSpectrumDiagram = () => {
  const [selectedId, setSelectedId] = useState<string>("xray");
  const selected = BANDS.find((b) => b.id === selectedId)!;

  // Sine wave inside each band — frequency proportional to band midpoint
  const wavePath = (band: Band) => {
    const x0 = xOf(band.fStart);
    const x1 = xOf(band.fEnd);
    const width = x1 - x0;
    const cy = PAD_T + 24;
    // Cycles increase by band index — purely illustrative
    const cycles = Math.max(1.5, (band.fStart - F_MIN) * 0.7 + 1);
    const amp = 8;
    const steps = Math.max(20, Math.floor(width / 3));
    const pts: string[] = [];
    for (let i = 0; i <= steps; i++) {
      const x = x0 + (i / steps) * width;
      const y = cy + amp * Math.sin((i / steps) * cycles * 2 * Math.PI);
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return `M ${pts.join(" L ")}`;
  };

  return (
    <DiagramFigure
      id="em-spectrum"
      title="Electromagnetic spectrum"
      description="Frequency, wavelength and photon energy across the electromagnetic spectrum from radio to gamma, with the X-ray band highlighted in clinical context."
    >
      <div className="my-6">
        <h3 className="text-lg font-serif font-bold text-foreground mb-1">
          The Electromagnetic Spectrum
        </h3>
        <p className="text-xs text-muted-foreground mb-3">
          Click a band to see its wavelength, photon energy and clinical relevance. X-rays sit
          between ultraviolet and gamma radiation in the ionising part of the spectrum.
        </p>

        <div className="rounded-xl border border-border bg-card p-3 overflow-x-auto">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto min-w-[480px]"
            role="img"
            aria-label="Electromagnetic spectrum from radio waves to gamma rays on a logarithmic frequency axis"
          >
            {/* Ionising vs non-ionising banner */}
            <rect
              x={xOf(F_MIN)}
              y={20}
              width={xOf(14.9) - xOf(F_MIN)}
              height={14}
              fill="hsl(var(--muted))"
              opacity={0.5}
            />
            <text x={(xOf(F_MIN) + xOf(14.9)) / 2} y={31} textAnchor="middle" className="fill-muted-foreground text-[10px] font-semibold">
              Non-ionising
            </text>
            <rect
              x={xOf(14.9)}
              y={20}
              width={xOf(F_MAX) - xOf(14.9)}
              height={14}
              fill="hsl(var(--destructive)/0.15)"
            />
            <text x={(xOf(14.9) + xOf(F_MAX)) / 2} y={31} textAnchor="middle" className="fill-destructive text-[10px] font-semibold">
              Ionising
            </text>

            {/* Band rectangles */}
            {BANDS.map((b) => {
              const x = xOf(b.fStart);
              const w = xOf(b.fEnd) - xOf(b.fStart);
              const isSel = b.id === selectedId;
              return (
                <g
                  key={b.id}
                  onClick={() => setSelectedId(b.id)}
                  style={{ cursor: "pointer" }}
                >
                  <rect
                    x={x}
                    y={PAD_T}
                    width={w}
                    height={64}
                    fill={b.color}
                    opacity={isSel ? 0.85 : 0.35}
                    stroke={isSel ? "hsl(var(--foreground))" : "hsl(var(--border))"}
                    strokeWidth={isSel ? 2 : 1}
                    style={{ transition: "opacity 200ms" }}
                  />
                  {/* Sine wave illustrating relative frequency */}
                  <path
                    d={wavePath(b)}
                    fill="none"
                    stroke="hsl(var(--background))"
                    strokeWidth={1.4}
                    opacity={isSel ? 1 : 0.6}
                  />
                  {/* Band label */}
                  <text
                    x={x + w / 2}
                    y={PAD_T + 58}
                    textAnchor="middle"
                    className="text-[11px] font-semibold"
                    fill="hsl(var(--foreground))"
                  >
                    {b.label}
                  </text>
                </g>
              );
            })}

            {/* Frequency axis ticks (powers of 10) */}
            {Array.from({ length: F_MAX - F_MIN + 1 }, (_, i) => F_MIN + i)
              .filter((p) => p % 2 === 0)
              .map((p) => (
                <g key={p}>
                  <line
                    x1={xOf(p)}
                    x2={xOf(p)}
                    y1={PAD_T + 64}
                    y2={PAD_T + 70}
                    stroke="hsl(var(--border))"
                  />
                  <text
                    x={xOf(p)}
                    y={PAD_T + 84}
                    textAnchor="middle"
                    className="fill-muted-foreground text-[9px]"
                  >
                    10
                    <tspan dy={-4} fontSize={7}>
                      {p}
                    </tspan>
                  </text>
                </g>
              ))}
            <text
              x={PAD_L + PLOT_W / 2}
              y={PAD_T + 105}
              textAnchor="middle"
              className="fill-muted-foreground text-[10px] italic"
            >
              Frequency (Hz) — log scale · wavelength decreases →   energy increases →
            </text>

            {/* Endpoint labels */}
            <text x={PAD_L} y={PAD_T - 6} className="fill-muted-foreground text-[9px]">
              ← longer λ, lower energy
            </text>
            <text x={PAD_L + PLOT_W} y={PAD_T - 6} textAnchor="end" className="fill-muted-foreground text-[9px]">
              shorter λ, higher energy →
            </text>
          </svg>
        </div>

        {/* Selected band info card */}
        <div
          className="mt-4 p-4 rounded-lg border-l-4"
          style={{
            borderLeftColor: selected.color,
            background: "hsl(var(--muted) / 0.4)",
          }}
        >
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <h4 className="font-semibold text-foreground text-base">{selected.label}</h4>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                selected.ionising
                  ? "bg-destructive/15 text-destructive"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {selected.ionising ? "Ionising" : "Non-ionising"}
            </span>
          </div>
          <dl className="grid sm:grid-cols-3 gap-3 text-xs">
            <div>
              <dt className="text-muted-foreground uppercase tracking-wide">Wavelength</dt>
              <dd className="text-foreground font-medium mt-0.5">{selected.wavelength}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground uppercase tracking-wide">Photon energy</dt>
              <dd className="text-foreground font-medium mt-0.5">{selected.energy}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-muted-foreground uppercase tracking-wide">Clinical relevance</dt>
              <dd className="text-foreground mt-0.5 leading-snug">{selected.use}</dd>
            </div>
          </dl>
        </div>

        <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
          The boundary between non-ionising and ionising radiation lies in the ultraviolet range
          (~10 eV / 124 nm), the energy needed to eject an outer-shell electron from water.
          Diagnostic X-rays (30–150 keV) and γ-rays carry far more than this threshold and are
          therefore biologically hazardous, justifying the ALARA framework that follows.
        </p>
      </div>
    </DiagramFigure>
  );
};

export default ElectromagneticSpectrumDiagram;
