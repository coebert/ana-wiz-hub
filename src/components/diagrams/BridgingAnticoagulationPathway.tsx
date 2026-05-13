import { useMemo, useState } from "react";
import { withAlpha } from "@/lib/color-utils";
import { DiagramFigure } from "./_shared/DiagramFigure";

type IndicationKey = "afib" | "mhv" | "vte";
type ValveRisk = "low" | "intermediate" | "high";
type SurgicalBleed = "low" | "high";

interface IndicationConfig {
  key: IndicationKey;
  label: string;
  shortLabel: string;
  color: string;
  description: string;
  evidence: string;
}

const INDICATIONS: IndicationConfig[] = [
  {
    key: "afib",
    label: "Atrial fibrillation",
    shortLabel: "AF",
    color: "hsl(210, 75%, 50%)",
    description: "Non-valvular AF — risk stratified by CHA₂DS₂-VASc.",
    evidence: "BRIDGE trial (NEJM 2015): No bridging non-inferior for thromboembolism, halved major bleeding.",
  },
  {
    key: "mhv",
    label: "Mechanical heart valve",
    shortLabel: "MHV",
    color: "hsl(0, 75%, 50%)",
    description: "Risk depends on valve type, position and additional risk factors.",
    evidence: "PERIOP-2 (BMJ 2021): No bridging non-inferior in low-risk MHV. ACCP 2022: bridge only HIGH-risk valves.",
  },
  {
    key: "vte",
    label: "Recent VTE",
    shortLabel: "VTE",
    color: "hsl(265, 60%, 55%)",
    description: "Risk highest in first 3 months after acute event.",
    evidence: "ACCP/ASH: bridge if VTE < 3 mo or severe thrombophilia. Defer surgery if possible.",
  },
];

interface RiskRow {
  band: ValveRisk;
  label: string;
  badgeColor: string;
  afib: string;
  mhv: string;
  vte: string;
  recommendation: string;
}

const RISK_TABLE: RiskRow[] = [
  {
    band: "low",
    label: "LOW thrombotic risk (< 5 %/yr)",
    badgeColor: "hsl(150, 55%, 40%)",
    afib: "CHA₂DS₂-VASc 0–4 with no prior stroke/TIA",
    mhv: "Bileaflet AORTIC (St Jude / On-X) AND no other risk factors (no AF, no prior stroke, EF > 35 %, age < 75)",
    vte: "VTE > 12 months ago, no thrombophilia",
    recommendation: "DO NOT BRIDGE. Stop warfarin 5 days pre-op; restart 12–24 h post-op when haemostasis achieved.",
  },
  {
    band: "intermediate",
    label: "INTERMEDIATE thrombotic risk (5–10 %/yr)",
    badgeColor: "hsl(38, 92%, 50%)",
    afib: "CHA₂DS₂-VASc 5–6, OR previous stroke/TIA > 3 months ago",
    mhv: "Bileaflet aortic + ANY of: AF, prior stroke, HTN, DM, age > 75, EF < 35 %",
    vte: "VTE 3–12 months ago, recurrent VTE, non-severe thrombophilia (heterozygous Factor V Leiden, prothrombin 20210A), active cancer",
    recommendation: "INDIVIDUALISE. Discuss with haematology / cardiology. If bleeding risk acceptable → consider therapeutic LMWH bridge. Otherwise no bridge with early restart.",
  },
  {
    band: "high",
    label: "HIGH thrombotic risk (> 10 %/yr)",
    badgeColor: "hsl(0, 75%, 50%)",
    afib: "CHA₂DS₂-VASc ≥ 7, OR stroke/TIA within 3 months, OR rheumatic valvular AF",
    mhv: "ANY MITRAL prosthesis, ANY caged-ball or tilting-disc valve (Starr–Edwards, Björk–Shiley), recent stroke/TIA < 6 months",
    vte: "VTE within 3 months, severe thrombophilia (antiphospholipid syndrome, antithrombin / protein C / S deficiency, homozygous Factor V Leiden)",
    recommendation: "BRIDGE with therapeutic LMWH (or IV UFH if renal failure / very high risk). Discuss elective surgery deferral if VTE < 1 month.",
  },
];

interface ProtocolStep {
  day: string;
  warfarin: string;
  lmwh: string;
  monitoring: string;
}

const BRIDGING_PROTOCOL: ProtocolStep[] = [
  { day: "Day −5", warfarin: "STOP warfarin", lmwh: "Continue normal dose", monitoring: "Check INR" },
  { day: "Day −3", warfarin: "Off", lmwh: "START therapeutic LMWH (enoxaparin 1 mg/kg BD or 1.5 mg/kg OD; dalteparin 100 IU/kg BD)", monitoring: "Anti-Xa if obese / renal impairment" },
  { day: "Day −1", warfarin: "Off", lmwh: "Last dose ≥ 24 h before surgery (omit evening dose if morning surgery)", monitoring: "Check INR — give 1–2 mg vit K PO if INR > 1.5" },
  { day: "Day 0 (surgery)", warfarin: "Off", lmwh: "OFF (≥ 24 h since last therapeutic dose)", monitoring: "INR ≤ 1.4 acceptable for most surgery" },
  { day: "Day +1", warfarin: "RESTART warfarin at usual maintenance dose (no loading)", lmwh: "Prophylactic LMWH 12–24 h post-op IF haemostasis achieved", monitoring: "Surgical bleeding assessment" },
  { day: "Day +2 to +3", warfarin: "Continue", lmwh: "Resume therapeutic LMWH at 48–72 h IF low bleeding risk surgery and haemostasis good", monitoring: "Daily INR" },
  { day: "Day +5 onwards", warfarin: "Continue", lmwh: "STOP LMWH when INR therapeutic on TWO consecutive days", monitoring: "INR target re-established" },
];

const NO_BRIDGE_RATIONALE = [
  "BRIDGE trial (NEJM 2015, n=1884, non-valvular AF, mean CHA₂DS₂-VASc 2.3): no bridging NON-INFERIOR for arterial thromboembolism (0.4 % vs 0.3 %) and HALVED major bleeding (1.3 % vs 3.2 %, p = 0.005).",
  "PERIOP-2 (BMJ 2021, n=1471, AF + low-risk MHV): no bridging non-inferior for thromboembolism (0.3 % vs 0.4 %) with reduced major bleeding.",
  "ACCP 2022 / ESC 2024: bridging reserved for HIGH thrombotic risk groups (mechanical mitral valve, recent VTE / stroke, severe thrombophilia).",
  "Bridging triples major bleeding risk without reducing thromboembolism in low/moderate-risk patients.",
];

const SURGICAL_BLEED_RISK = {
  high: [
    "Major cardiothoracic, neurosurgery, urological (TURP, prostatectomy)",
    "Major vascular, hepatobiliary, bowel resection",
    "Spinal / epidural anaesthesia, intracranial / intraocular procedures",
    "Reconstructive plastic surgery, major orthopaedic (THR, TKR)",
  ],
  low: [
    "Cataract surgery (no bulbar block)",
    "Minor dermatological / dental extractions",
    "Joint / soft tissue injections, pacemaker / ICD insertion (warfarin often continued)",
    "Diagnostic endoscopy without biopsy",
  ],
};

export const BridgingAnticoagulationPathway = () => {
  const [indication, setIndication] = useState<IndicationKey>("mhv");
  const [risk, setRisk] = useState<ValveRisk>("high");
  const [bleed, setBleed] = useState<SurgicalBleed>("high");

  const activeIndication = useMemo(() => INDICATIONS.find(i => i.key === indication)!, [indication]);
  const activeRisk = useMemo(() => RISK_TABLE.find(r => r.band === risk)!, [risk]);

  const decision = useMemo(() => {
    if (risk === "high") {
      return {
        verdict: "BRIDGE",
        color: "hsl(0, 75%, 50%)",
        text: bleed === "high"
          ? "Bridge with therapeutic LMWH but extend post-op restart to 48–72 h. Consider IV UFH if very high thrombotic risk so it can be stopped 4–6 h pre-op."
          : "Bridge with therapeutic LMWH per protocol below; restart prophylactic LMWH 12–24 h post-op.",
      };
    }
    if (risk === "intermediate") {
      return {
        verdict: bleed === "high" ? "DO NOT BRIDGE" : "INDIVIDUALISE",
        color: "hsl(38, 92%, 50%)",
        text: bleed === "high"
          ? "Bleeding risk outweighs thrombotic risk. Stop warfarin 5 d pre-op, no bridge, restart with prophylactic LMWH cover until INR therapeutic."
          : "Discuss with haematology. Default toward no bridging (BRIDGE trial); consider LMWH bridge only if patient-specific factors raise concern.",
      };
    }
    return {
      verdict: "DO NOT BRIDGE",
      color: "hsl(150, 55%, 40%)",
      text: "Stop warfarin 5 days pre-op. Check INR day −1: if > 1.5 give 1–2 mg vit K PO. Restart warfarin at usual maintenance dose 12–24 h post-op. Prophylactic LMWH per VTE risk.",
    };
  }, [risk, bleed]);

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      {/* Selectors */}
      <div className="p-3 bg-secondary/30 border-b border-border space-y-3">
        <div>
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1.5 font-semibold">
            1. Indication for warfarin
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {INDICATIONS.map(i => {
              const isActive = i.key === indication;
              return (
                <button
                  key={i.key}
                  type="button"
                  onClick={() => setIndication(i.key)}
                  aria-pressed={isActive}
                  className="px-2 py-2 rounded-lg border-2 text-left transition-all"
                  style={{
                    borderColor: isActive ? i.color : "hsl(var(--border))",
                    backgroundColor: isActive ? withAlpha(i.color, 0.1) : "transparent",
                  }}
                >
                  <div className="text-xs font-bold" style={{ color: isActive ? i.color : "hsl(var(--foreground))" }}>
                    {i.shortLabel}
                  </div>
                  <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">{i.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1.5 font-semibold">
            2. Thrombotic risk band
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {RISK_TABLE.map(r => {
              const isActive = r.band === risk;
              return (
                <button
                  key={r.band}
                  type="button"
                  onClick={() => setRisk(r.band)}
                  aria-pressed={isActive}
                  className="px-2 py-2 rounded-lg border-2 text-center transition-all"
                  style={{
                    borderColor: isActive ? r.badgeColor : "hsl(var(--border))",
                    backgroundColor: isActive ? withAlpha(r.badgeColor, 0.1) : "transparent",
                  }}
                >
                  <div className="text-xs font-bold uppercase" style={{ color: isActive ? r.badgeColor : "hsl(var(--foreground))" }}>
                    {r.band}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1.5 font-semibold">
            3. Surgical bleeding risk
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {(["low", "high"] as SurgicalBleed[]).map(b => {
              const isActive = b === bleed;
              const c = b === "high" ? "hsl(0, 75%, 50%)" : "hsl(150, 55%, 40%)";
              return (
                    <button
                  key={b}
                  type="button"
                  onClick={() => setBleed(b)}
                  aria-pressed={isActive}
                  className="px-2 py-2 rounded-lg border-2 text-center transition-all"
                  style={{
                    borderColor: isActive ? c : "hsl(var(--border))",
                    backgroundColor: isActive ? withAlpha(c, 0.1) : "transparent",
                  }}
                >
                  <div className="text-xs font-bold uppercase" style={{ color: isActive ? c : "hsl(var(--foreground))" }}>
                    {b} bleeding risk
                  </div>
                </button>
  );
            })}
          </div>
        </div>
      </div>

      {/* Decision verdict */}
      <div
        className="p-4 border-b border-border"
        style={{ backgroundColor: withAlpha(decision.color, 0.08) }}
      >
        <div className="text-[10px] uppercase tracking-wide font-semibold mb-1" style={{ color: decision.color }}>
          Decision
        </div>
        <div className="text-xl font-serif font-bold mb-2" style={{ color: decision.color }}>
          {decision.verdict}
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed">{decision.text}</p>
        <p className="text-[11px] text-muted-foreground mt-2 italic">
          {activeIndication.shortLabel} · {activeRisk.label.split(" thrombotic risk")[0]} risk · {bleed === "high" ? "high" : "low"}-bleed surgery
        </p>
      </div>

      {/* Risk band detail */}
      <div className="p-4 space-y-3 border-b border-border">
        <div>
          <h4 className="text-base font-serif font-bold mb-2" style={{ color: activeRisk.badgeColor }}>
            {activeRisk.label}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <RiskCard active={indication === "afib"} title="AF / CHA₂DS₂-VASc" body={activeRisk.afib} color={INDICATIONS[0].color} />
            <RiskCard active={indication === "mhv"} title="Mechanical valve" body={activeRisk.mhv} color={INDICATIONS[1].color} />
            <RiskCard active={indication === "vte"} title="Recent VTE" body={activeRisk.vte} color={INDICATIONS[2].color} />
          </div>
        </div>
      </div>

      {/* Bridging protocol — show only if BRIDGE / individualise */}
      {(decision.verdict === "BRIDGE" || decision.verdict === "INDIVIDUALISE") && (
        <div className="p-4 border-b border-border">
          <h4 className="text-base font-serif font-bold mb-2 text-foreground">LMWH bridging protocol</h4>
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="min-w-full text-xs border border-border rounded-lg">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="px-2 py-1.5 text-left font-semibold border-b border-border whitespace-nowrap">Day</th>
                  <th className="px-2 py-1.5 text-left font-semibold border-b border-border">Warfarin</th>
                  <th className="px-2 py-1.5 text-left font-semibold border-b border-border">LMWH</th>
                  <th className="px-2 py-1.5 text-left font-semibold border-b border-border">Monitoring</th>
                </tr>
              </thead>
              <tbody>
                {BRIDGING_PROTOCOL.map(step => (
                  <tr key={step.day} className="border-b border-border/50 align-top">
                    <td className="px-2 py-1.5 font-mono font-semibold whitespace-nowrap">{step.day}</td>
                    <td className="px-2 py-1.5">{step.warfarin}</td>
                    <td className="px-2 py-1.5">{step.lmwh}</td>
                    <td className="px-2 py-1.5 text-muted-foreground">{step.monitoring}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-muted-foreground italic mt-2">
            Reduce LMWH dose if CrCl 15–30 mL/min (use 50 % therapeutic dose) or switch to IV UFH if CrCl &lt; 15 mL/min.
          </p>
        </div>
      )}

      {/* Evidence + bleeding-risk reference */}
      <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="rounded-lg border border-border p-3">
          <div className="text-[10px] uppercase tracking-wide font-semibold mb-1.5 text-foreground">
            Why most patients should NOT be bridged
          </div>
          <ul className="space-y-1.5 text-xs text-muted-foreground leading-relaxed">
            {NO_BRIDGE_RATIONALE.map((r, i) => (
              <li key={i} className="flex gap-1.5">
                <span className="text-foreground">•</span>
                <span className="flex-1">{r}</span>
              </li>
            ))}
          </ul>
          <div className="text-[11px] mt-2 italic" style={{ color: activeIndication.color }}>
            {activeIndication.shortLabel}: {activeIndication.evidence}
          </div>
        </div>

        <div className="rounded-lg border border-border p-3">
          <div className="text-[10px] uppercase tracking-wide font-semibold mb-1.5 text-foreground">
            Surgical bleeding risk reference
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div>
              <div className="text-[11px] font-semibold uppercase mb-1" style={{ color: "hsl(0, 75%, 50%)" }}>
                High bleeding risk
              </div>
              <ul className="space-y-1 text-xs text-muted-foreground">
                {SURGICAL_BLEED_RISK.high.map((s, i) => (
                  <li key={i} className="flex gap-1.5"><span style={{ color: "hsl(0, 75%, 50%)" }}>•</span><span>{s}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase mb-1" style={{ color: "hsl(150, 55%, 40%)" }}>
                Low bleeding risk (warfarin often continued, INR ≤ 3)
              </div>
              <ul className="space-y-1 text-xs text-muted-foreground">
                {SURGICAL_BLEED_RISK.low.map((s, i) => (
                  <li key={i} className="flex gap-1.5"><span style={{ color: "hsl(150, 55%, 40%)" }}>•</span><span>{s}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface RiskCardProps {
  title: string;
  body: string;
  color: string;
  active: boolean;
}

const RiskCard = ({ title, body, color, active }: RiskCardProps) => (
    <DiagramFigure
      id="bridging-anticoagulation-pathway"
      title="Bridging anticoagulation pathway"
      description="Auto-generated wrapper for the Bridging anticoagulation pathway clinical decision flowchart. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
        <div
      className="rounded-lg border p-2.5 transition-all"
      style={{
        borderColor: active ? withAlpha(color, 0.5) : "hsl(var(--border))",
        backgroundColor: active ? withAlpha(color, 0.06) : "transparent",
      }}
    >
      <div className="text-[10px] uppercase tracking-wide font-semibold mb-1" style={{ color }}>
        {title}
      </div>
      <div className="text-xs text-foreground/85 leading-relaxed">{body}</div>
    </div>
    </DiagramFigure>
  );

export default BridgingAnticoagulationPathway;
