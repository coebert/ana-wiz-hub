import { useState } from "react";
import { AnimatedMechanism, AnimatedMechanismStep } from "./AnimatedMechanism";
import { cn } from "@/lib/utils";

/* ============================================================
 * Hygrometers — animated diagrams of the four types tested in
 * the FRCA Primary syllabus:
 *   1) Hair hygrometer
 *   2) Wet-and-dry-bulb (psychrometer)
 *   3) Regnault's dew-point hygrometer
 *   4) Electrical / capacitance (transducer) hygrometer
 *
 * Each tab uses the shared <AnimatedMechanism> for stepping +
 * play controls, and an SVG scene that responds to the active
 * step so students can watch the measurement principle unfold.
 * ============================================================ */

type HygType = "hair" | "wetdry" | "dewpoint" | "electrical";

const TabButton = ({
  active,
  onClick,
  children,
  sublabel,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  sublabel: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={cn(
      "flex-1 min-w-[140px] px-3 py-2 rounded-lg border text-left transition-colors",
      active
        ? "bg-primary text-primary-foreground border-primary shadow-sm"
        : "bg-card text-foreground border-border hover:bg-muted",
    )}
  >
    <div className="text-sm font-semibold leading-tight">{children}</div>
    <div className={cn("text-[11px] mt-0.5", active ? "text-primary-foreground/80" : "text-muted-foreground")}>
      {sublabel}
    </div>
  </button>
);

/* -------------------- 1. HAIR HYGROMETER -------------------- */

const HairScene = ({ step }: { step: number }) => {
  // step 0: dry, hair short  | 1: humid air arrives | 2: hair lengthens | 3: dial moves
  const humidity = step >= 1 ? 0.8 : 0.2;
  const slack = 6 + humidity * 14; // px of mid-point sag
  const needleAngle = -60 + humidity * 120; // -60° (dry) → +60° (humid)

  return (
    <svg viewBox="0 0 360 240" role="img" aria-label="Hair hygrometer animation" className="w-full">
      <defs>
        <radialGradient id="hyg-hair-bg" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="360" height="240" fill="url(#hyg-hair-bg)" />

      {/* Frame */}
      <rect x="40" y="50" width="200" height="140" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
      <text x="140" y="42" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">Hair under tension</text>

      {/* Anchor pin (left) */}
      <circle cx="60" cy="90" r="5" fill="hsl(var(--foreground))" />
      <text x="56" y="80" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="end">Fixed</text>

      {/* Pulley (right) */}
      <circle cx="220" cy="90" r="10" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" />
      <circle cx="220" cy="90" r="2" fill="hsl(var(--foreground))" />

      {/* Hair — sag depends on humidity (longer hair = more sag) */}
      <path
        d={`M 60 90 Q 140 ${90 + slack} 220 90`}
        stroke="hsl(var(--anatomy, var(--primary)))"
        strokeWidth="1.5"
        fill="none"
        className="transition-all duration-700 ease-out"
      />

      {/* Spring/weight on the pulley */}
      <line x1="220" y1="100" x2="220" y2={130 + slack} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <rect
        x="210"
        y={130 + slack}
        width="20"
        height="14"
        rx="2"
        fill="hsl(var(--muted))"
        stroke="hsl(var(--foreground))"
        strokeWidth="1"
        className="transition-all duration-700"
      />
      <text x="240" y={142 + slack} fontSize="8" fill="hsl(var(--muted-foreground))" className="transition-all duration-700">
        Tension wt
      </text>

      {/* Humid air molecules */}
      {step >= 1 && (
        <g className="animate-fade-in">
          {[0, 1, 2, 3, 4].map((i) => (
            <circle
              key={i}
              cx={70 + i * 35}
              cy={60 + (i % 2) * 8}
              r="3"
              fill="hsl(var(--primary))"
              opacity="0.5"
            />
          ))}
          <text x="140" y="210" textAnchor="middle" fontSize="9" fill="hsl(var(--primary))" fontWeight="bold">
            Humid air → hair absorbs water → lengthens
          </text>
        </g>
      )}

      {/* Dial */}
      <g transform="translate(300 130)">
        <circle r="38" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
        {/* Tick marks */}
        {[-60, -30, 0, 30, 60].map((a) => {
          const rad = ((a - 90) * Math.PI) / 180;
          return (
            <line
              key={a}
              x1={Math.cos(rad) * 30}
              y1={Math.sin(rad) * 30}
              x2={Math.cos(rad) * 36}
              y2={Math.sin(rad) * 36}
              stroke="hsl(var(--foreground))"
              strokeWidth="1"
            />
          );
        })}
        <text x="-26" y="32" fontSize="7" fill="hsl(var(--muted-foreground))">0%</text>
        <text x="20" y="32" fontSize="7" fill="hsl(var(--muted-foreground))">100%</text>
        {/* Needle */}
        <line
          x1="0"
          y1="0"
          x2="0"
          y2="-30"
          stroke="hsl(var(--destructive))"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform={`rotate(${needleAngle})`}
          className="transition-transform duration-700 ease-out"
        />
        <circle r="3" fill="hsl(var(--destructive))" />
        <text y="52" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontWeight="bold">
          % RH
        </text>
      </g>
    </svg>
  );
};

const hairSteps: AnimatedMechanismStep[] = [
  {
    label: "Dry air",
    detail: (
      <>
        A defatted human hair is held under light tension between a fixed point and a pulley with a counter-weight.
        In dry conditions the hair is at its shortest and the dial reads low.
      </>
    ),
    callout: "Range ~15-100% RH, slow response (minutes), accuracy ±5%.",
  },
  {
    label: "Humid air",
    detail: (
      <>
        Water molecules in the air are absorbed by the hair (hygroscopic).
      </>
    ),
  },
  {
    label: "Hair lengthens",
    detail: (
      <>
        Hair length varies non-linearly with relative humidity (~2.5% length change over the full RH range).
        The pulley rotates as the hair sags.
      </>
    ),
    callout: "Measures relative humidity directly — no temperature correction needed.",
  },
  {
    label: "Dial reads RH",
    detail: (
      <>
        The pulley drives a needle on a calibrated dial. Cheap, simple, and battery-free — but slow, hysteretic and inaccurate
        at extremes. Used historically in operating-theatre wall units.
      </>
    ),
    callout: "Disadvantages: non-linear scale, hysteresis, drift, slow response.",
  },
];

/* -------------------- 2. WET-AND-DRY-BULB -------------------- */

const WetDryScene = ({ step }: { step: number }) => {
  // step 0: both bulbs equal | 1: water evaporates from wet bulb | 2: wet bulb cools | 3: ΔT read
  const dryT = 22;
  const wetT = step >= 2 ? 16 : step >= 1 ? 19 : 22;

  const mercuryHeight = (t: number) => 30 + (t - 10) * 4; // simple mapping

  const bulbY = 170;
  const dryHg = mercuryHeight(dryT);
  const wetHg = mercuryHeight(wetT);

  return (
    <svg viewBox="0 0 360 240" role="img" aria-label="Wet and dry bulb hygrometer" className="w-full">
      {/* Dry bulb */}
      <g>
        <text x="80" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="hsl(var(--foreground))">Dry bulb</text>
        {/* Stem */}
        <rect x="74" y={bulbY - 110} width="12" height="110" rx="3" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
        {/* Mercury */}
        <rect
          x="76"
          y={bulbY - dryHg}
          width="8"
          height={dryHg}
          fill="hsl(var(--destructive))"
          className="transition-all duration-700"
        />
        {/* Bulb */}
        <circle cx="80" cy={bulbY + 8} r="14" fill="hsl(var(--destructive))" stroke="hsl(var(--border))" strokeWidth="1" />
        <text x="80" y={bulbY + 40} textAnchor="middle" fontSize="11" fontWeight="bold" fill="hsl(var(--destructive))">
          {dryT}°C
        </text>
      </g>

      {/* Wet bulb */}
      <g>
        <text x="220" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="hsl(var(--foreground))">Wet bulb</text>
        <rect x="214" y={bulbY - 110} width="12" height="110" rx="3" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
        <rect
          x="216"
          y={bulbY - wetHg}
          width="8"
          height={wetHg}
          fill="hsl(var(--destructive))"
          className="transition-all duration-700 ease-out"
        />
        <circle cx="220" cy={bulbY + 8} r="14" fill="hsl(var(--destructive))" stroke="hsl(var(--border))" strokeWidth="1" />

        {/* Wet wick around bulb */}
        <path
          d={`M 220 ${bulbY + 22} Q 220 ${bulbY + 35} 220 ${bulbY + 50}`}
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          fill="none"
        />
        <ellipse cx="220" cy={bulbY + 8} rx="16" ry="6" fill="hsl(var(--primary)/0.3)" stroke="hsl(var(--primary))" strokeWidth="1" />

        {/* Reservoir */}
        <rect x="200" y={bulbY + 50} width="40" height="20" rx="3" fill="hsl(var(--primary)/0.3)" stroke="hsl(var(--primary))" strokeWidth="1" />
        <text x="220" y={bulbY + 64} textAnchor="middle" fontSize="7" fill="hsl(var(--primary))">H₂O</text>

        <text x="220" y={bulbY + 90} textAnchor="middle" fontSize="11" fontWeight="bold" fill="hsl(var(--destructive))">
          {wetT}°C
        </text>

        {/* Evaporation animation */}
        {step >= 1 && (
          <g className="animate-fade-in">
            {[0, 1, 2].map((i) => (
              <circle
                key={i}
                cx={210 + i * 10}
                cy={bulbY - 5 - i * 6}
                r="2"
                fill="hsl(var(--primary))"
                opacity={0.6 - i * 0.15}
              />
            ))}
          </g>
        )}
      </g>

      {/* ΔT readout */}
      {step >= 3 && (
        <g className="animate-fade-in">
          <rect x="120" y="100" width="120" height="40" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <text x="180" y="118" textAnchor="middle" fontSize="10" fontWeight="bold" fill="hsl(var(--foreground))">
            ΔT = {dryT - wetT}°C
          </text>
          <text x="180" y="132" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">
            Look up RH on chart
          </text>
        </g>
      )}
    </svg>
  );
};

const wetDrySteps: AnimatedMechanismStep[] = [
  {
    label: "Two thermometers",
    detail: (
      <>
        Two identical mercury thermometers sit side-by-side. One bulb is wrapped in a wick fed by a water reservoir
        (the wet bulb); the other is bare (the dry bulb). At true saturation both read the same temperature.
      </>
    ),
  },
  {
    label: "Evaporation",
    detail: (
      <>
        Water evaporates from the wick at a rate proportional to the humidity deficit
        of the surrounding air (drier air → faster evaporation).
      </>
    ),
    callout: "Latent heat of vaporisation of water = 2.26 kJ/g.",
  },
  {
    label: "Wet bulb cools",
    detail: (
      <>
        Evaporation removes latent heat from the wet bulb, cooling it below ambient. The wet-bulb temperature falls
        until heat lost by evaporation equals heat gained by convection from the surrounding air.
      </>
    ),
  },
  {
    label: "Read ΔT → RH",
    detail: (
      <>
        The wet-bulb depression (dry T − wet T) is looked up on a psychrometric chart (or hygrometric tables) to give
        the relative humidity. Accurate when ventilated (e.g. Assmann / sling psychrometer).
      </>
    ),
    callout: "Cheap, accurate, but requires water and adequate airflow over the wick (≥3 m/s).",
  },
];

/* -------------------- 3. REGNAULT'S DEW-POINT -------------------- */

const DewPointScene = ({ step }: { step: number }) => {
  // step 0: silver tube clear, T=22 | 1: ether bubbles, T cools toward Td | 2: T = Td, dew forms | 3: read Td
  const Tamb = 22;
  const Td = 12; // dew point in this scenario
  const tubeT = step >= 2 ? Td : step >= 1 ? 17 : 22;
  const showDew = step >= 2;
  const showBubbles = step >= 1;
  const atDewPoint = step >= 2;
  const [showSvpTip, setShowSvpTip] = useState(false);

  // Magnus approximation for SVP of water (kPa) — used to verify the
  // numeric example shown to the learner.
  const svpKPa = (T: number) => 0.61094 * Math.exp((17.625 * T) / (T + 243.04));
  const svpAmb = svpKPa(Tamb); // ≈ 2.64 kPa
  const svpTd = svpKPa(Td); //   ≈ 1.40 kPa  (= actual PH₂O in the room)
  const rh = (svpTd / svpAmb) * 100; // ≈ 53%
  const absHum = (svpTd * 1000 * 18.015) / (8.314 * (Tamb + 273.15)); // g/m³ ≈ 10.4

  return (
    <div className="space-y-3">
    <svg viewBox="0 0 360 240" role="img" aria-label="Regnault dew point hygrometer" className="w-full">
      {/* Silver tube */}
      <defs>
        <linearGradient id="hyg-silver" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--muted))" />
          <stop offset="50%" stopColor="hsl(var(--background))" />
          <stop offset="100%" stopColor="hsl(var(--muted))" />
        </linearGradient>
      </defs>

      <rect x="80" y="80" width="200" height="60" rx="6" fill="url(#hyg-silver)" stroke="hsl(var(--border))" strokeWidth="2" />
      <text x="180" y="72" textAnchor="middle" fontSize="10" fontWeight="bold" fill="hsl(var(--foreground))">
        Polished silver tube (mirror)
      </text>

      {/* Ether inside */}
      <rect x="86" y="86" width="188" height="48" rx="3" fill="hsl(var(--primary)/0.15)" />
      <text x="180" y="115" textAnchor="middle" fontSize="9" fill="hsl(var(--primary))" fontWeight="bold">
        Liquid ether
      </text>

      {/* Air-blown tube to bubble ether (cooling) */}
      <line x1="80" y1="110" x2="40" y2="110" stroke="hsl(var(--foreground))" strokeWidth="2" />
      <text x="38" y="105" textAnchor="end" fontSize="8" fill="hsl(var(--muted-foreground))">Air pump</text>

      {/* Bubbles */}
      {showBubbles && (
        <g className="animate-fade-in">
          {[0, 1, 2, 3].map((i) => (
            <circle
              key={i}
              cx={100 + i * 40}
              cy={100 + (i % 2) * 12}
              r={2 + (i % 2)}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
            />
          ))}
        </g>
      )}

      {/* Thermometer in tube */}
      <rect x="174" y="40" width="12" height="50" rx="3" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <rect
        x="176"
        y={90 - (tubeT - 5)}
        width="8"
        height={tubeT - 5}
        fill="hsl(var(--destructive))"
        className="transition-all duration-700"
      />
      <text x="200" y="55" fontSize="10" fontWeight="bold" fill="hsl(var(--destructive))" className="transition-all duration-700">
        {tubeT}°C
      </text>

      {/* Td target marker on the thermometer + info tooltip */}
      {showBubbles && (
        <g className="animate-fade-in">
          <line
            x1="170"
            y1={90 - (Td - 5)}
            x2="158"
            y2={90 - (Td - 5)}
            stroke="hsl(var(--primary))"
            strokeWidth="1.2"
            strokeDasharray="3 2"
          />
          <text
            x="156"
            y={94 - (Td - 5)}
            textAnchor="end"
            fontSize="8"
            fill="hsl(var(--primary))"
            fontWeight="bold"
          >
            Td = {Td}°C
          </text>
          {/* Info button */}
          <g
            transform={`translate(${140} ${90 - (Td - 5) - 4})`}
            role="button"
            tabIndex={0}
            aria-label="Show how Td relates to saturated vapour pressure"
            aria-expanded={showSvpTip}
            onClick={() => setShowSvpTip((v) => !v)}
            onMouseEnter={() => setShowSvpTip(true)}
            onMouseLeave={() => setShowSvpTip(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setShowSvpTip((v) => !v);
              }
            }}
            style={{ cursor: "pointer" }}
          >
            <circle r="6" fill="hsl(var(--primary))" />
            <text textAnchor="middle" y="3" fontSize="9" fontWeight="bold" fill="hsl(var(--primary-foreground))">
              i
            </text>
          </g>

          {/* Tooltip */}
          {showSvpTip && (
            <foreignObject x="6" y="6" width="200" height="140" className="animate-fade-in">
              <div
                className="rounded-md border border-primary/40 bg-card text-foreground shadow-md p-2 text-[10px] leading-snug"
                role="tooltip"
              >
                <div className="font-semibold text-primary mb-1">SVP check — this scenario</div>
                <div className="font-mono text-[10px] space-y-0.5">
                  <div>SVP(T<sub>amb</sub> = {Tamb}°C) ≈ {svpAmb.toFixed(2)} kPa</div>
                  <div>SVP(T<sub>d</sub> = {Td}°C) ≈ {svpTd.toFixed(2)} kPa</div>
                  <div>P<sub>H₂O</sub> in room = SVP(T<sub>d</sub>) ≈ {svpTd.toFixed(2)} kPa</div>
                  <div className="pt-0.5 border-t border-border mt-1">
                    RH = {svpTd.toFixed(2)} / {svpAmb.toFixed(2)} × 100
                    <br />
                    &nbsp;&nbsp;&nbsp;&nbsp;≈ <span className="text-primary font-bold">{rh.toFixed(0)}%</span>
                  </div>
                  <div>
                    Abs. humidity ≈ <span className="text-primary font-bold">{absHum.toFixed(1)} g/m³</span>
                  </div>
                </div>
              </div>
            </foreignObject>
          )}
        </g>
      )}

      {/* Dew/mist forming on outside */}
      {showDew && (
        <g className="animate-fade-in">
          {Array.from({ length: 18 }).map((_, i) => (
            <circle
              key={i}
              cx={92 + (i * 11)}
              cy={144}
              r="1.8"
              fill="hsl(var(--primary))"
              opacity="0.7"
            />
          ))}
        </g>
      )}

      {/* Status banner — explicit cooling vs misting state */}
      {showBubbles && (
        <g className="animate-fade-in">
          <rect
            x="60"
            y="160"
            width="240"
            height="26"
            rx="6"
            fill={atDewPoint ? "hsl(var(--primary) / 0.15)" : "hsl(var(--muted))"}
            stroke={atDewPoint ? "hsl(var(--primary))" : "hsl(var(--border))"}
            strokeWidth="1.2"
          />
          <text
            x="180"
            y="178"
            textAnchor="middle"
            fontSize="10"
            fontWeight="bold"
            fill={atDewPoint ? "hsl(var(--primary))" : "hsl(var(--foreground))"}
          >
            {atDewPoint
              ? `Misting begins — T = Td (${Td}°C)`
              : `Cooling… T = ${tubeT}°C  >  Td`}
          </text>
        </g>
      )}

      {/* Observer's eye */}
      <g transform="translate(320 120)">
        <ellipse rx="10" ry="6" fill="hsl(var(--card))" stroke="hsl(var(--foreground))" strokeWidth="1" />
        <circle r="3" fill="hsl(var(--foreground))" />
        <text y="20" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">Observe</text>
      </g>

      {/* Reference (control) tube outline */}
      <rect x="80" y="200" width="200" height="20" rx="4" fill="none" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="3 3" />
      <text x="180" y="214" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">
        Reference (uncooled) silver tube — compare appearance
      </text>
    </svg>

      {/* Mini comparison callout — clarifies what the apparatus does vs the alternative method */}
      <div className="grid sm:grid-cols-2 gap-2 text-[11px] leading-snug">
        <div className="rounded-md border border-primary/40 bg-primary/5 p-2">
          <div className="font-semibold text-primary mb-0.5">This apparatus — Cooling to Td</div>
          <div className="text-muted-foreground">
            Cool the surface until dew appears. The thermometer reading <em>is</em> Td.
            Then derive RH from <span className="font-mono">SVP(Td) / SVP(Tamb)</span>.
            Td is measured <strong>directly</strong>; humidity is derived.
          </div>
        </div>
        <div className="rounded-md border border-border bg-muted/40 p-2">
          <div className="font-semibold text-foreground mb-0.5">Other hygrometers — Measuring RH then inferring Td</div>
          <div className="text-muted-foreground">
            Hair / wet-and-dry / capacitance sensors give <strong>RH</strong> first;
            Td is calculated by finding the temperature where <span className="font-mono">SVP(Td) = RH × SVP(Tamb)</span>.
            RH is measured <strong>directly</strong>; Td is derived.
          </div>
        </div>
      </div>
    </div>
  );
};

const dewPointSteps: AnimatedMechanismStep[] = [
  {
    label: "Setup",
    detail: (
      <>
        A polished silver tube contains a volatile liquid (ether) and a thermometer. Its mirrored exterior is observed
        alongside an identical reference (uncooled) tube so the eye can detect the moment the surface dulls. At ambient
        temperature both tubes look identical.
      </>
    ),
    callout: "Regnault's hygrometer — the classical dew-point method and the only one that gives an ABSOLUTE humidity reading directly.",
  },
  {
    label: "Cooling to Td",
    detail: (
      <>
        Air is bubbled through the ether. Evaporation absorbs latent heat (2.26 kJ/g for water — even higher for ether),
        progressively cooling the silver wall and the thin layer of room air in contact with it.
      </>
    ),
  },
  {
    label: "Dew forms at Td",
    detail: (
      <>
        Cooling continues until the surface temperature falls to the <strong>dew point (Td)</strong> — the temperature at
        which the partial pressure of water vapour <em>already in the room air</em> equals the saturated vapour pressure (SVP)
        at that temperature. Water then condenses out of the air onto the silver as a fine mist. The thermometer reading
        at the instant misting appears <em>is</em> the dew point.
      </>
    ),
    callout: "Dew point Td: the temperature at which ambient water vapour reaches 100% RH (i.e. PH₂O = SVP(Td)).",
  },
  {
    label: "Convert Td → humidity",
    detail: (
      <>
        Look up the saturated vapour pressure at the dew point — this <strong>equals</strong> the actual partial pressure of
        water vapour in the room (giving absolute humidity in mg/L from standard tables). Relative humidity is then
        <br />
        <span className="font-mono text-xs">RH (%) = SVP(Td) / SVP(Tambient) × 100</span>.
        <br />
        Slow and observer-dependent, but unaffected by ambient temperature changes — hence the reference standard.
      </>
    ),
    callout:
      "Modern automated equivalent: the chilled-mirror (Peltier-cooled) hygrometer — a thermoelectric cooler chills a tiny mirror while a photodetector watches reflected light fall as dew forms; a feedback loop holds the mirror exactly at Td. Same physics, ±0.1 °C accuracy.",
  },
];

/* -------------------- 4. ELECTRICAL / CAPACITANCE -------------------- */

const ElectricalScene = ({ step }: { step: number }) => {
  // 0: dry sensor low capacitance | 1: humid air arrives | 2: polymer absorbs H2O, C rises | 3: digital readout
  const cap = step >= 2 ? 0.85 : step >= 1 ? 0.45 : 0.15;
  const reading = step >= 3 ? 78 : step >= 2 ? 60 : step >= 1 ? 35 : 18;

  return (
    <svg viewBox="0 0 360 240" role="img" aria-label="Electrical capacitance hygrometer" className="w-full">
      {/* Capacitor sensor */}
      <g transform="translate(60 60)">
        <text x="60" y="-8" textAnchor="middle" fontSize="10" fontWeight="bold" fill="hsl(var(--foreground))">
          Hygroscopic polymer capacitor
        </text>
        {/* Top electrode (porous) */}
        <rect x="0" y="0" width="120" height="8" fill="hsl(var(--accent))" />
        {/* Pores */}
        {[10, 30, 50, 70, 90, 110].map((x) => (
          <rect key={x} x={x - 2} y="0" width="4" height="8" fill="hsl(var(--background))" />
        ))}
        {/* Polymer dielectric */}
        <rect
          x="0"
          y="8"
          width="120"
          height="30"
          fill={`hsl(var(--primary) / ${0.15 + cap * 0.5})`}
          className="transition-colors duration-700"
        />
        <text x="60" y="28" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))">Polymer film</text>
        {/* Bottom electrode */}
        <rect x="0" y="38" width="120" height="8" fill="hsl(var(--accent))" />

        {/* Water absorbed dots */}
        {step >= 2 &&
          [10, 30, 50, 70, 90, 110].map((x, i) => (
            <circle
              key={x}
              cx={x}
              cy={20 + (i % 2) * 8}
              r="2"
              fill="hsl(var(--primary))"
              className="animate-fade-in"
            />
          ))}

        {/* Leads */}
        <line x1="60" y1="46" x2="60" y2="80" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="-10" y1="4" x2="-10" y2="80" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <line x1="-10" y1="4" x2="0" y2="4" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      </g>

      {/* Humid air molecules */}
      {step >= 1 && (
        <g className="animate-fade-in">
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx={70 + i * 30} cy={40 - (i % 2) * 8} r="2.5" fill="hsl(var(--primary))" opacity="0.6" />
          ))}
          <text x="120" y="30" fontSize="8" fill="hsl(var(--primary))">H₂O vapour</text>
        </g>
      )}

      {/* Bridge / display */}
      <g transform="translate(230 100)">
        <rect width="100" height="70" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.5" />
        <text x="50" y="14" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">Bridge circuit</text>
        <rect x="10" y="20" width="80" height="32" rx="3" fill="hsl(var(--background))" stroke="hsl(var(--border))" />
        <text
          x="50"
          y="42"
          textAnchor="middle"
          fontSize="18"
          fontWeight="bold"
          fill="hsl(var(--primary))"
          className="transition-all duration-500 font-mono"
        >
          {reading}%
        </text>
        <text x="50" y="64" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">RH</text>
      </g>

      {/* Connecting wires */}
      <line x1="180" y1="110" x2="230" y2="120" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <line x1="180" y1="140" x2="230" y2="155" stroke="hsl(var(--foreground))" strokeWidth="1.5" />

      <text x="180" y="220" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">
        ΔCapacitance ∝ ΔRelative Humidity
      </text>
    </svg>
  );
};

const electricalSteps: AnimatedMechanismStep[] = [
  {
    label: "Dry sensor",
    detail: (
      <>
        Two electrodes sandwich a thin hygroscopic polymer film, forming a capacitor. The top electrode is porous
        to let water vapour reach the dielectric. In dry air the capacitance is at baseline.
      </>
    ),
    callout: "Modern operating-theatre & ICU monitors all use this type.",
  },
  {
    label: "Humid air diffuses in",
    detail: (
      <>
        Water vapour passes through the porous electrode and is absorbed by the polymer film.
      </>
    ),
  },
  {
    label: "Capacitance rises",
    detail: (
      <>
        Water has a high relative permittivity (εr ≈ 80) compared with the dry polymer (εr ≈ 3-6). Absorbing water
        therefore raises the dielectric constant and the capacitance, in proportion to the surrounding RH.
      </>
    ),
    callout: "C = ε₀ · εr · A / d — humidity changes εr.",
  },
  {
    label: "Display %RH",
    detail: (
      <>
        The capacitance change is measured by a Wheatstone-bridge / oscillator circuit and displayed as %RH within
        seconds. Fast, robust, accurate (~±2%), inexpensive — the modern clinical standard.
      </>
    ),
    callout: "Resistive (electrolytic) hygrometers work similarly, measuring conductance instead of capacitance.",
  },
];

/* -------------------- TOP-LEVEL COMPONENT -------------------- */

export const HygrometersDiagram = () => {
  const [type, setType] = useState<HygType>("hair");

  const config: Record<
    HygType,
    {
      title: string;
      subtitle: string;
      steps: AnimatedMechanismStep[];
      render: (s: number) => JSX.Element;
    }
  > = {
    hair: {
      title: "Hair Hygrometer",
      subtitle: "Mechanical: a defatted human hair lengthens with humidity, moving a needle on a calibrated dial.",
      steps: hairSteps,
      render: (s) => <HairScene step={s} />,
    },
    wetdry: {
      title: "Wet-and-Dry Bulb (Psychrometer)",
      subtitle: "Two mercury thermometers — evaporation cools the wet bulb; the depression gives RH from a chart.",
      steps: wetDrySteps,
      render: (s) => <WetDryScene step={s} />,
    },
    dewpoint: {
      title: "Regnault's Dew-Point Hygrometer",
      subtitle: "Cool a polished silver tube with evaporating ether until visible dew forms — that temperature is the dew point.",
      steps: dewPointSteps,
      render: (s) => <DewPointScene step={s} />,
    },
    electrical: {
      title: "Electrical / Capacitance Hygrometer",
      subtitle: "A polymer-dielectric capacitor whose capacitance rises as water vapour is absorbed — modern clinical standard.",
      steps: electricalSteps,
      render: (s) => <ElectricalScene step={s} />,
    },
  };

  const c = config[type];

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-2">Hygrometers — choose a type</h3>
          <div className="flex flex-wrap gap-2">
            <TabButton active={type === "hair"} onClick={() => setType("hair")} sublabel="Mechanical • RH">
              Hair
            </TabButton>
            <TabButton active={type === "wetdry"} onClick={() => setType("wetdry")} sublabel="Psychrometer • ΔT">
              Wet & Dry Bulb
            </TabButton>
            <TabButton active={type === "dewpoint"} onClick={() => setType("dewpoint")} sublabel="Regnault • dew point">
              Dew Point
            </TabButton>
            <TabButton active={type === "electrical"} onClick={() => setType("electrical")} sublabel="Capacitance • RH">
              Electrical
            </TabButton>
          </div>
        </div>

        <AnimatedMechanism
          key={type /* remount on type switch so animation restarts */}
          title={c.title}
          subtitle={c.subtitle}
          steps={c.steps}
          renderScene={c.render}
          stepMs={2600}
          accentClass="border-primary/40"
        />

        <div className="text-xs text-muted-foreground rounded-md border border-border bg-card p-3">
          <strong className="text-foreground">Exam pearls:</strong> Hair = mechanical, slow, non-linear. Wet-and-dry = uses
          latent heat of evaporation. Dew point = the only method giving an absolute reading directly (and the
          gold standard — modern chilled-mirror devices use the same principle). Capacitance = today's clinical
          standard (fast, accurate, ±2%).
        </div>
      </div>
    </div>
  );
};

export default HygrometersDiagram;
