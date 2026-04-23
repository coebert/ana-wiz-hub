import { AnimatedMechanism, AnimatedMechanismStep } from "./AnimatedMechanism";

/**
 * Category 1 caesarean — rapid sequence induction (RSI) under general
 * anaesthesia. Animated step-by-step OAA/AAGBI 2020 conduct, designed for the
 * Obstetric Anaesthesia topic.
 *
 * Scene is a stylised parturient with left-lateral tilt, monitor and a
 * progress meter for the decision-to-delivery interval (DDI).
 */
const STEPS: AnimatedMechanismStep[] = [
  {
    label: "Declare Cat 1",
    detail: (
      <>
        Immediate threat to maternal/fetal life. Target{" "}
        <strong>decision-to-delivery interval (DDI) &lt; 30 min</strong> — most
        units aim for &lt;15 min. Call senior anaesthetic and obstetric help,
        alert neonatal team, brief everyone (allergies, weight, airway,
        coagulation, antibiotic).
      </>
    ),
    callout: <>If a working epidural is in situ — top-up first, reserve GA for failed neuraxial.</>,
  },
  {
    label: "Position & prep",
    detail: (
      <>
        15° <strong>left lateral tilt</strong> or manual uterine displacement
        to relieve aortocaval compression. Ramped (HELP) position if obese.
        Two large-bore IVs. Surgeon scrubbed, prepped and draped{" "}
        <em>before</em> induction — knife on skin only after intubation
        confirmed.
      </>
    ),
  },
  {
    label: "Aspiration prophylaxis",
    detail: (
      <>
        <strong>30 ml 0.3M sodium citrate PO</strong>, ranitidine 50 mg IV (or
        omeprazole 40 mg IV), metoclopramide 10 mg IV if time allows. Pregnant
        women ≥16–18 wk are full-stomach by default — gastric emptying delayed
        in labour and by opioids.
      </>
    ),
  },
  {
    label: "Pre-oxygenate",
    detail: (
      <>
        Tight-fitting mask, 100% O₂ for 3 min OR 8 vital-capacity breaths if
        extreme urgency. Target end-tidal O₂ &gt; 90%. Consider HFNO/THRIVE as
        adjunct (does not replace standard pre-ox in obstetrics).
      </>
    ),
    callout: <>Pregnancy: ↓FRC 20% + ↑O₂ consumption 20% → desaturation in &lt;2 min on apnoea.</>,
  },
  {
    label: "RSI induction",
    detail: (
      <>
        <strong>Thiopentone 5–7 mg/kg</strong> or propofol 2–2.5 mg/kg +
        <strong> sux 1.5 mg/kg</strong> (actual body weight). Rocuronium
        1.0–1.2 mg/kg with sugammadex 16 mg/kg available is acceptable.
        Cricoid 10 N awake → 30 N at LOC (release if view poor or vomiting).
      </>
    ),
    callout: <>High-risk groups (severe PET, cardiac, raised ICP): blunt pressor response with alfentanil 10 µg/kg or remifentanil 0.5–1 µg/kg — warn neonatal team.</>,
  },
  {
    label: "Intubate + confirm",
    detail: (
      <>
        Cuffed ETT <strong>6.5–7.0</strong> (mucosal oedema). Confirm with
        sustained <strong>ETCO₂</strong> + bilateral auscultation. If failed:
        DAS obstetric failed-intubation algorithm — declare early, prioritise
        oxygenation, decide wake vs proceed by maternal/fetal status.
      </>
    ),
  },
  {
    label: "Maintenance pre-delivery",
    detail: (
      <>
        O₂/air FiO₂ 0.5 + volatile at <strong>≥1.0 age-adjusted MAC</strong>.
        Maintain normocapnia (ETCO₂ ~4.0 kPa — pregnant baseline). Phenylephrine
        infusion 25–50 µg/min to baseline SBP. <strong>Processed EEG (BIS)
        strongly recommended</strong> — obstetric GA is highest awareness-risk
        group (NAP5).
      </>
    ),
  },
  {
    label: "Delivery → uterotonics",
    detail: (
      <>
        On delivery: <strong>slow IV oxytocin 5 IU</strong> (3 IU per MBRRACE
        if cardiac), then infusion 10 IU/h. Now safe to give long-acting
        opioids (fentanyl 1–2 µg/kg, morphine 0.1–0.15 mg/kg). Reduce volatile
        to 0.5–0.75 MAC to support uterine tone.
      </>
    ),
    callout: <>Major PPH? Drop volatile to ≤0.5 MAC and switch to TIVA — volatile worsens atony.</>,
  },
  {
    label: "Wake + handover",
    detail: (
      <>
        Antibiotics if not pre-induction. Regional adjunct for analgesia (TAP
        or quadratus lumborum block, wound catheter). Extubate{" "}
        <strong>awake, lateral position</strong>, full reversal confirmed (TOF
        ratio &gt; 0.9). Structured handover to recovery + neonatal team.
      </>
    ),
  },
];

const STEP_DURATIONS = [2800, 2600, 2600, 2800, 3000, 2600, 2800, 2800, 2600];

export const Cat1RSIAnimation = () => {
  const stepsWithDur = STEPS.map((s, i) => ({ ...s, durationMs: STEP_DURATIONS[i] }));

  // DDI clock progresses linearly across steps 0-7 (delivery at step 7)
  const clockMinutes = (active: number) => {
    if (active <= 0) return 0;
    if (active >= 7) return 14;
    return Math.round((active / 7) * 14);
  };

  return (
    <AnimatedMechanism
      title="GA for Cat 1 LSCS — RSI conduct (OAA/AAGBI 2020)"
      subtitle="Decision-to-delivery in under 15 minutes. Each step highlights the parturient setup, drug timing and key safety target."
      steps={stepsWithDur}
      accentClass="border-clinical/50"
      renderScene={(active) => (
        <div className="flex items-center justify-center h-full">
          <svg
            viewBox="0 0 360 280"
            className="w-full max-w-[400px] h-auto"
            role="img"
            aria-label="Stylised parturient with monitor showing RSI conduct"
          >
            {/* OR table with left lateral tilt (after step 1) */}
            <g transform={active >= 1 ? "rotate(-8 180 180)" : ""} className="transition-transform duration-700">
              {/* Table */}
              <rect
                x="40"
                y="170"
                width="280"
                height="14"
                rx="2"
                fill="hsl(var(--muted))"
                stroke="hsl(var(--border))"
              />

              {/* Patient body silhouette */}
              <ellipse
                cx="170"
                cy="140"
                rx="90"
                ry="28"
                fill="hsl(var(--muted-foreground) / 0.18)"
                stroke="hsl(var(--border))"
              />
              {/* Gravid uterus */}
              <ellipse
                cx="200"
                cy="135"
                rx="40"
                ry="22"
                fill="hsl(var(--clinical) / 0.2)"
                stroke="hsl(var(--clinical) / 0.6)"
              />
              {/* Head */}
              <circle cx="80" cy="140" r="20" fill="hsl(var(--muted-foreground) / 0.25)" stroke="hsl(var(--border))" />
            </g>

            {/* Mask / pre-ox (step 3) */}
            {active === 3 && (
              <g className="animate-fade-in">
                <ellipse cx="78" cy="138" rx="16" ry="12" fill="hsl(var(--accent) / 0.4)" stroke="hsl(var(--accent))" strokeWidth="1.5" />
                <text x="78" y="115" textAnchor="middle" className="text-[9px] font-semibold" fill="hsl(var(--accent))">100% O₂</text>
              </g>
            )}

            {/* ETT (steps 5+) */}
            {active >= 5 && (
              <g className="animate-fade-in">
                <line x1="50" y1="135" x2="78" y2="138" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
                <text x="32" y="128" className="text-[9px] font-semibold" fill="hsl(var(--primary))">ETT 6.5</text>
              </g>
            )}

            {/* Cricoid pressure indicator (step 4) */}
            {active === 4 && (
              <g className="animate-fade-in">
                <circle cx="98" cy="148" r="6" fill="hsl(var(--destructive) / 0.5)" stroke="hsl(var(--destructive))" />
                <text x="105" y="165" className="text-[8px] font-semibold" fill="hsl(var(--destructive))">cricoid 30 N</text>
              </g>
            )}

            {/* Drug syringes appearing at the relevant step */}
            <g transform="translate(20, 220)">
              {[
                { step: 2, label: "citrate", token: "accent" },
                { step: 4, label: "thio + sux", token: "pharmacology" },
                { step: 7, label: "oxytocin", token: "clinical" },
              ].map((d, i) => {
                const visible = active >= d.step;
                return (
                  <g key={d.label} transform={`translate(${i * 80}, 0)`} opacity={visible ? 1 : 0.25} className="transition-opacity duration-500">
                    <rect width="60" height="22" rx="3" fill={`hsl(var(--${d.token}) / 0.2)`} stroke={`hsl(var(--${d.token}))`} />
                    <text x="30" y="15" textAnchor="middle" className="text-[9px] font-semibold" fill="hsl(var(--foreground))">
                      {d.label}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Monitor — top right */}
            <g transform="translate(250, 20)">
              <rect width="100" height="60" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
              <text x="6" y="14" className="text-[9px] font-semibold" fill="hsl(var(--muted-foreground))">Monitor</text>
              {/* SpO2 */}
              <text x="6" y="30" className="text-[10px]" fill="hsl(var(--accent))">
                SpO₂ {active === 3 ? "100" : active >= 5 ? "99" : "98"}%
              </text>
              {/* ETCO2 (after intubation) */}
              {active >= 5 && (
                <text x="6" y="44" className="text-[10px] animate-fade-in" fill="hsl(var(--primary))">
                  ETCO₂ 4.0 kPa
                </text>
              )}
              {/* BIS (after maintenance) */}
              {active >= 6 && (
                <text x="6" y="56" className="text-[10px] animate-fade-in" fill="hsl(var(--clinical))">
                  BIS 45 · MAC 1.0
                </text>
              )}
            </g>

            {/* DDI clock — bottom right */}
            <g transform="translate(260, 200)">
              <circle cx="40" cy="40" r="34" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
              <text x="40" y="32" textAnchor="middle" className="text-[9px]" fill="hsl(var(--muted-foreground))">
                DDI
              </text>
              <text
                x="40"
                y="48"
                textAnchor="middle"
                className="text-base font-bold tabular-nums"
                fill={clockMinutes(active) < 15 ? "hsl(var(--accent))" : "hsl(var(--destructive))"}
              >
                {clockMinutes(active)}:00
              </text>
              <text x="40" y="62" textAnchor="middle" className="text-[8px]" fill="hsl(var(--muted-foreground))">
                target &lt; 15 min
              </text>
            </g>

            {/* Step 7 — baby out indicator */}
            {active >= 7 && (
              <g className="animate-fade-in" transform="translate(180, 195)">
                <circle r="10" fill="hsl(var(--accent) / 0.35)" stroke="hsl(var(--accent))" />
                <text textAnchor="middle" y="3" className="text-[10px] font-bold" fill="hsl(var(--accent))">
                  ✓
                </text>
                <text x="14" y="3" className="text-[9px] font-semibold" fill="hsl(var(--accent))">
                  delivered
                </text>
              </g>
            )}
          </svg>
        </div>
      )}
    />
  );
};

export default Cat1RSIAnimation;
