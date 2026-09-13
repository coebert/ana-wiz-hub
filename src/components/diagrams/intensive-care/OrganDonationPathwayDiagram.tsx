import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * DBD vs DCD donation pathways with the drug swaps marked at each step.
 *
 * A shared trunk (SN-OD referral → family approach/authorisation) splits into
 * two lanes:
 *   DBD — brainstem death testing, then timed drug swaps up to cross-clamp.
 *   DCD — comfort-only withdrawal, 5-minute standoff, post-mortem procedures.
 * Clicking any step reveals the drugs given (and the drugs forbidden) at that
 * point in the pathway.
 */

type LaneKey = "shared" | "dbd" | "dcd";

interface Step {
  key: string;
  lane: LaneKey;
  label: string;
  timing: string;
  drugs: string;
  detail: string[];
  color: string;
}

const SHARED_COLOR = "hsl(262 60% 50%)";
const DBD_COLOR = "hsl(210 70% 50%)";
const DCD_COLOR = "hsl(25 85% 48%)";

const STEPS: Step[] = [
  // Shared trunk
  {
    key: "referral",
    lane: "shared",
    label: "SN-OD referral",
    timing: "Futility recognised",
    drugs: "No drug changes",
    detail: [
      "Refer every potential donor — referral is not consent.",
      "Continue physiological care unchanged; nothing is started or stopped for the recipient's benefit.",
      "DBD candidates: neuroprotective care continues until testing.",
    ],
    color: SHARED_COLOR,
  },
  {
    key: "family",
    lane: "shared",
    label: "Family approach",
    timing: "Before testing / WLST",
    drugs: "No drug changes",
    detail: [
      "SN-OD-led approach; check the Organ Donor Register.",
      "Blood tests, tissue typing and organ offers run in parallel.",
      "The pathway branches here on how death will be confirmed.",
    ],
    color: SHARED_COLOR,
  },
  // DBD lane
  {
    key: "dbd-testing",
    lane: "dbd",
    label: "BSD testing",
    timing: "Two sets, two doctors",
    drugs: "Short-acting only: esmolol / GTN / SNP",
    detail: [
      "Legal time of death = completion of the FIRST set of tests.",
      "If the catecholamine storm is ongoing, control it with short-acting agents so the vasoplegia that follows is not compounded.",
      "From confirmation onward, therapy is organ-directed, not brain-directed.",
    ],
    color: DBD_COLOR,
  },
  {
    key: "dbd-bundle",
    lane: "dbd",
    label: "Hormonal bundle",
    timing: "Immediately after BSD",
    drugs: "Methylpred 15 mg/kg IV + insulin infusion (± T4)",
    detail: [
      "Methylprednisolone 15 mg/kg IV single dose — attenuates inflammation, improves lung yield.",
      "Insulin infusion targeting glucose 4–10 mmol/L.",
      "T4 20 µg bolus then 10 µg/h reserved for persisting cardiovascular instability.",
    ],
    color: DBD_COLOR,
  },
  {
    key: "dbd-swap",
    lane: "dbd",
    label: "NA → vasopressin swap",
    timing: "As vasoplegia emerges (hours)",
    drugs: "Vasopressin 0.5–2.4 U/h; wean noradrenaline; DDAVP 1–2 µg for DI",
    detail: [
      "V1 agonism restores tone despite downregulated adrenoceptors; V2 effect treats DI (~65% of donors).",
      "Catecholamine-sparing protects heart, liver and kidneys — retrieval teams grade hearts by vasopressor dose.",
      "DDAVP if polyuria persists; target Na⁺ < 155 mmol/L for liver grafts.",
    ],
    color: DBD_COLOR,
  },
  {
    key: "dbd-theatre",
    lane: "dbd",
    label: "Theatre / cross-clamp",
    timing: "Hours–days after BSD",
    drugs: "Heparin 25,000–30,000 units just before cross-clamp",
    detail: [
      "Support is NOT withdrawn — ventilation and vasopressors continue to cross-clamp.",
      "Heparin immediately before aortic cross-clamp, then cold flush.",
      "NMBAs may be continued to suppress spinal reflexes. All organ drugs stop at cross-clamp.",
    ],
    color: DBD_COLOR,
  },
  // DCD lane
  {
    key: "dcd-plan",
    lane: "dcd",
    label: "Plan withdrawal",
    timing: "Alive — comfort governs",
    drugs: "Comfort drugs only (analgesia / sedation / secretions)",
    detail: [
      "Treating ICU team withdraws — never the retrieval team.",
      "Agree location, family choreography and the stand-down time first.",
      "No organ-directed drug may be given while the patient is alive; pre-mortem heparin is not routine UK practice.",
    ],
    color: DCD_COLOR,
  },
  {
    key: "dcd-wlst",
    lane: "dcd",
    label: "Withdrawal (extubation)",
    timing: "Clock starts",
    drugs: "Titrate to distress — never to hasten death",
    detail: [
      "fWIT begins when SBP < 50 mmHg (or SpO₂ < 70%).",
      "SN-OD records the withdrawal-to-arrest interval minute-by-minute.",
      "Most deaths occur within 1–2 h; organ-specific fWIT limits (liver <20–30 min, kidney ~60 min) decide what can be used.",
    ],
    color: DCD_COLOR,
  },
  {
    key: "dcd-standoff",
    lane: "dcd",
    label: "5-min standoff",
    timing: "After asystole",
    drugs: "Nothing — hands off",
    detail: [
      "Nothing is touched and no drug is given during the observation.",
      "Legal time of death = the START of the 5-minute observation period.",
      "Death confirmed after 5 minutes of absent circulation; stand-down if arrest has not occurred within ~2–3 h of withdrawal.",
    ],
    color: DCD_COLOR,
  },
  {
    key: "dcd-retrieval",
    lane: "dcd",
    label: "Retrieval / NRP",
    timing: "Post-mortem, within ~10 min",
    drugs: "Heparin + vasodilators in circuit/perfusate",
    detail: [
      "Post-mortem reintubation by the retrieval team for lung recruitment and reassessment.",
      "Cannulation for rapid cold perfusion or NRP — arch vessels excluded BEFORE the circuit starts.",
      "TA-NRP enables DCD heart retrieval; organ drugs stop once retrieval is complete.",
    ],
    color: DCD_COLOR,
  },
];

const W = 780;
const H = 470;
const BOX_W = 160;
const BOX_H = 76;

const laneY = (lane: LaneKey) => (lane === "shared" ? 60 : lane === "dbd" ? 185 : 325);
const stepX = (i: number) => 40 + i * 180;

export const OrganDonationPathwayDiagram = () => {
  const [activeKey, setActiveKey] = useState<string>("dbd-swap");
  const step = STEPS.find((s) => s.key === activeKey)!;

  const shared = STEPS.filter((s) => s.lane === "shared");
  const dbd = STEPS.filter((s) => s.lane === "dbd");
  const dcd = STEPS.filter((s) => s.lane === "dcd");

  const renderBox = (s: Step, x: number, y: number) => {
    const isActive = s.key === activeKey;
    return (
      <g key={s.key} style={{ cursor: "pointer" }} onClick={() => setActiveKey(s.key)}>
        <rect
          x={x}
          y={y}
          width={BOX_W}
          height={BOX_H}
          rx="10"
          fill={isActive ? s.color : "hsl(var(--card))"}
          stroke={s.color}
          strokeWidth={isActive ? 3 : 1.5}
          opacity={isActive ? 0.95 : 0.9}
        />
        <text
          x={x + BOX_W / 2}
          y={y + 22}
          textAnchor="middle"
          className={isActive ? "fill-primary-foreground" : "fill-foreground"}
          fontSize="12"
          fontWeight="700"
        >
          {s.label}
        </text>
        <text
          x={x + BOX_W / 2}
          y={y + 38}
          textAnchor="middle"
          className={isActive ? "fill-primary-foreground" : "fill-muted-foreground"}
          fontSize="10"
        >
          {s.timing}
        </text>
        <text
          x={x + BOX_W / 2}
          y={y + 56}
          textAnchor="middle"
          className={isActive ? "fill-primary-foreground" : "fill-muted-foreground"}
          fontSize="9"
          fontStyle="italic"
        >
          {s.drugs.length > 42 ? `${s.drugs.slice(0, 40)}…` : s.drugs}
        </text>
      </g>
    );
  };

  const arrow = (x1: number, y1: number, x2: number, y2: number, key: string) => (
    <line
      key={key}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="hsl(var(--muted-foreground))"
      strokeWidth="1.5"
      markerEnd="url(#odp-arrow)"
    />
  );

  return (
    <DiagramFigure
      id="organ-donation-pathways"
      title="DBD and DCD donation pathways with drug swaps"
      description="Flowchart of the two deceased-donation pathways. A shared trunk of referral and family approach splits into DBD (brainstem death testing, hormonal bundle, noradrenaline-to-vasopressin swap, heparin at cross-clamp) and DCD (comfort-only withdrawal, five-minute standoff, post-mortem reintubation and regional perfusion)."
    >
      <div className="my-6">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="overflow-x-auto">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto min-w-[720px]" style={{ maxHeight: H }}>
              <defs>
                <marker id="odp-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="hsl(var(--muted-foreground))" />
                </marker>
              </defs>

              <text x={W / 2} y="22" textAnchor="middle" className="fill-foreground" fontSize="15" fontWeight="700">
                Deceased Organ Donation — Pathways &amp; Drug Swaps
              </text>
              <text x={W / 2} y="40" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
                Click any step to see the drugs given (or forbidden) at that point
              </text>

              {/* Shared trunk */}
              {shared.map((s, i) => renderBox(s, stepX(i) + 80, laneY("shared")))}
              {arrow(stepX(0) + 80 + BOX_W, laneY("shared") + BOX_H / 2, stepX(1) + 80, laneY("shared") + BOX_H / 2, "s1")}

              {/* Branch arrows from family box to each lane */}
              {arrow(stepX(1) + 80 + BOX_W / 2, laneY("shared") + BOX_H, stepX(0) + BOX_W / 2, laneY("dbd"), "b1")}
              {arrow(stepX(1) + 80 + BOX_W / 2, laneY("shared") + BOX_H, stepX(0) + BOX_W / 2, laneY("dcd"), "b2")}

              {/* Lane labels */}
              <text x="18" y={laneY("dbd") + BOX_H / 2} className="fill-foreground" fontSize="12" fontWeight="700" transform={`rotate(-90 18 ${laneY("dbd") + BOX_H / 2})`} textAnchor="middle">
                DBD
              </text>
              <text x="18" y={laneY("dcd") + BOX_H / 2} className="fill-foreground" fontSize="12" fontWeight="700" transform={`rotate(-90 18 ${laneY("dcd") + BOX_H / 2})`} textAnchor="middle">
                DCD
              </text>

              {/* DBD lane */}
              {dbd.map((s, i) => renderBox(s, stepX(i), laneY("dbd")))}
              {dbd.slice(0, -1).map((s, i) => arrow(stepX(i) + BOX_W, laneY("dbd") + BOX_H / 2, stepX(i + 1), laneY("dbd") + BOX_H / 2, `d${i}`))}
              <text x={stepX(dbd.length - 1) + BOX_W} y={laneY("dbd") + BOX_H + 16} textAnchor="end" className="fill-muted-foreground" fontSize="10">
                Cold flush → organs ex situ — all donor drugs stop
              </text>

              {/* DCD lane */}
              {dcd.map((s, i) => renderBox(s, stepX(i), laneY("dcd")))}
              {dcd.slice(0, -1).map((s, i) => arrow(stepX(i) + BOX_W, laneY("dcd") + BOX_H / 2, stepX(i + 1), laneY("dcd") + BOX_H / 2, `c${i}`))}
              <text x={stepX(dcd.length - 1) + BOX_W} y={laneY("dcd") + BOX_H + 16} textAnchor="end" className="fill-muted-foreground" fontSize="10">
                Stand-down if no arrest within ~2–3 h of withdrawal
              </text>

              {/* Legend */}
              <g transform={`translate(40 ${H - 24})`}>
                <rect x="0" y="-9" width="12" height="12" rx="3" fill={DBD_COLOR} />
                <text x="18" y="1" className="fill-muted-foreground" fontSize="10">DBD — dead before drugs change goal</text>
                <rect x="230" y="-9" width="12" height="12" rx="3" fill={DCD_COLOR} />
                <text x="248" y="1" className="fill-muted-foreground" fontSize="10">DCD — alive until standoff; organ drugs post-mortem only</text>
              </g>
            </svg>
          </div>

          {/* Detail panel */}
          <div className="mt-4 p-3 rounded-lg border" style={{ borderColor: step.color, backgroundColor: `${step.color.replace(")", " / 0.07)")}` }}>
            <p className="text-sm font-bold text-foreground">{step.label} <span className="font-normal text-muted-foreground">— {step.timing}</span></p>
            <p className="text-xs uppercase tracking-wide text-muted-foreground mt-2 mb-1">Drugs at this step</p>
            <p className="text-sm text-foreground mb-2">{step.drugs}</p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              {step.detail.map((d) => <li key={d}>{d}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default OrganDonationPathwayDiagram;
