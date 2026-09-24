import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * NSAID Mechanism Diagram
 * ─────────────────────────
 * Single arachidonic-acid pathway figure showing how COX-1 / COX-2
 * inhibition produces both therapeutic and adverse effects, plus the
 * lipoxygenase "shunt" responsible for AERD.
 *
 * Three selectable inhibitor profiles:
 *   • Non-selective NSAID (ibuprofen / naproxen / diclofenac)
 *   • Aspirin (irreversible, low-dose platelet effect dominant)
 *   • COX-2 selective (parecoxib / celecoxib)
 *
 * Each profile shades the affected enzyme columns and the resulting
 * therapeutic (green) and adverse (red) effect cards.
 */

type ProfileId = "nonselective" | "aspirin" | "cox2";

interface Profile {
  id: ProfileId;
  label: string;
  short: string;
  cox1: number; // 0–1 inhibition strength
  cox2: number;
  shunt: number; // leukotriene shunt magnitude
  description: string;
  examples: string;
}

const PROFILES: Record<ProfileId, Profile> = {
  nonselective: {
    id: "nonselective",
    label: "Non-selective NSAID",
    short: "Non-selective",
    cox1: 0.85,
    cox2: 0.85,
    shunt: 0.7,
    description:
      "Reversibly blocks both isoforms. Strong analgesia & anti-inflammation but full COX-1 trade-offs (GI, renal, platelet) and leukotriene shunt.",
    examples: "Ibuprofen · Naproxen · Diclofenac · Ketorolac",
  },
  aspirin: {
    id: "aspirin",
    label: "Aspirin (irreversible)",
    short: "Aspirin",
    cox1: 1,
    cox2: 0.4,
    shunt: 0.5,
    description:
      "Irreversibly acetylates COX-1 (Ser529) → permanent platelet TXA₂ block for the 7–10 d platelet lifespan. Low dose is cardioprotective; high dose adds analgesia.",
    examples: "Aspirin 75 mg (antiplatelet) · 300–900 mg (analgesic)",
  },
  cox2: {
    id: "cox2",
    label: "COX-2 selective",
    short: "Coxib",
    cox1: 0.1,
    cox2: 0.9,
    shunt: 0.6,
    description:
      "Spares COX-1 → ↓ GI ulceration & no platelet effect. But blocks endothelial PGI₂ without ↓ platelet TXA₂ → prothrombotic. Renal PGE₂ still ↓ (COX-2 expressed in macula densa).",
    examples: "Parecoxib (IV prodrug) · Celecoxib · Etoricoxib",
  },
};

// ── Effect cards ────────────────────────────────────────────────
type Driver = "cox1" | "cox2" | "shunt";

interface Effect {
  id: string;
  label: string;
  detail: string;
  driver: Driver;
  kind: "therapeutic" | "adverse";
  mediator: string;
}

const EFFECTS: Effect[] = [
  // Therapeutic (green) — driven mainly by COX-2 inhibition
  {
    id: "analgesia",
    label: "Analgesia",
    mediator: "↓ PGE₂ at peripheral nociceptors",
    detail: "Reduces sensitisation of nociceptors to bradykinin and histamine.",
    driver: "cox2",
    kind: "therapeutic",
  },
  {
    id: "antiinflam",
    label: "Anti-inflammatory",
    mediator: "↓ PGE₂ / PGI₂ at inflamed tissue",
    detail: "Reduces vasodilation, capillary leak and oedema in inflamed tissue.",
    driver: "cox2",
    kind: "therapeutic",
  },
  {
    id: "antipyretic",
    label: "Antipyretic",
    mediator: "↓ PGE₂ in hypothalamus (OVLT)",
    detail: "Resets the hypothalamic set-point downward toward normothermia.",
    driver: "cox2",
    kind: "therapeutic",
  },
  {
    id: "antiplatelet",
    label: "Antiplatelet (cardioprotection)",
    mediator: "↓ platelet TXA₂",
    detail:
      "Low-dose aspirin irreversibly inhibits platelet COX-1 → ↓ TXA₂ for the platelet lifespan (7–10 d) → ↓ MI/stroke.",
    driver: "cox1",
    kind: "therapeutic",
  },

  // Adverse (red)
  {
    id: "gi",
    label: "GI ulceration & bleeding",
    mediator: "↓ gastric PGE₂ / PGI₂",
    detail:
      "Loss of mucus, bicarbonate and mucosal blood flow → erosions, ulcers, GI bleeding. Worse with steroids, anticoagulants, H. pylori.",
    driver: "cox1",
    kind: "adverse",
  },
  {
    id: "platelet",
    label: "Bleeding (↓ aggregation)",
    mediator: "↓ platelet TXA₂",
    detail:
      "Reduced platelet aggregation. Aspirin → 7–10 d effect; reversible NSAIDs → effect resolves with drug clearance.",
    driver: "cox1",
    kind: "adverse",
  },
  {
    id: "renal",
    label: "↓ GFR · Na⁺/H₂O retention · AKI",
    mediator: "↓ renal PGE₂ (afferent arteriole)",
    detail:
      "Loss of afferent arteriolar vasodilation → ↓ GFR. 'Triple-whammy' = NSAID + ACEi/ARB + hypovolaemia/diuretic. COX-2 selective drugs are NOT renally safe (COX-2 in macula densa).",
    driver: "cox2",
    kind: "adverse",
  },
  {
    id: "cv",
    label: "Prothrombotic / ↑ MI risk",
    mediator: "↓ endothelial PGI₂ without ↓ TXA₂",
    detail:
      "Endothelial PGI₂ (vasodilator, anti-aggregant) is COX-2 derived; platelet TXA₂ is COX-1 derived. Selective COX-2 block tilts the balance toward thrombosis.",
    driver: "cox2",
    kind: "adverse",
  },
  {
    id: "aerd",
    label: "Bronchospasm (AERD)",
    mediator: "Arachidonate shunted to LOX → ↑ LTC₄/D₄/E₄",
    detail:
      "Aspirin-exacerbated respiratory disease: blocking COX shunts arachidonic acid into 5-lipoxygenase → cysteinyl leukotrienes → bronchoconstriction and rhinosinusitis.",
    driver: "shunt",
    kind: "adverse",
  },
  {
    id: "ductus",
    label: "Ductus arteriosus closure",
    mediator: "↓ PGE₂ (foetus / neonate)",
    detail:
      "Antenatal NSAID exposure can cause premature ductal closure → pulmonary hypertension. Indomethacin is used therapeutically to close a PDA in neonates.",
    driver: "cox1",
    kind: "adverse",
  },
];

// ── Component ──────────────────────────────────────────────────
const W = 560;
const H = 480;

export const NSAIDMechanismDiagram = () => {
  const [profileId, setProfileId] = useState<ProfileId>("nonselective");
  const [selectedEffect, setSelectedEffect] = useState<string>("analgesia");

  const profile = PROFILES[profileId];

  // Visual helpers
  const _arrowOpacity = (mag: number) => 0.25 + mag * 0.55;
  const _flowOpacity = (mag: number) => 1 - mag * 0.85; // higher inhibition → less flow

  // Layout coordinates
  const aaX = 280;
  const aaY = 70;

  const cox1X = 175;
  const cox2X = 385;
  const loxX = 70;
  const enzymeY = 150;

  const productY = 230;
  const cox1ProductX = cox1X;
  const cox2ProductX = cox2X;
  const loxProductX = loxX;

  const driverColor = (d: Driver) =>
    d === "cox1"
      ? "hsl(210 70% 50%)"
      : d === "cox2"
      ? "hsl(280 55% 55%)"
      : "hsl(0 65% 50%)";

  const therapeuticColor = "hsl(150 55% 40%)";
  const adverseColor = "hsl(0 65% 50%)";

  // Active magnitudes for each pathway
  const cox1Mag = profile.cox1;
  const cox2Mag = profile.cox2;
  const shuntMag = profile.shunt;

  return (
    <DiagramFigure
      id="nsaid-mechanism-diagram"
      title="NSAID mechanism"
      description="NSAID Mechanism Diagram ───────────────────────── Single arachidonic-acid pathway figure showing how COX-1 / COX-2 inhibition produces both therapeutic and adverse effects, plus the lipoxygenase 'shunt' responsible for AERD."
    >
          <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                NSAID mechanism — therapeutic &amp; adverse pathway map
              </h3>
              <p className="text-xs text-muted-foreground">
                Pick a drug class to see which COX isoform is blocked and which
                effects follow.
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(Object.values(PROFILES) as Profile[]).map((p) => {
                const active = p.id === profileId;
                return (
                  <button
                    key={p.id}
                    onClick={() => setProfileId(p.id)}
                    className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-border hover:bg-muted"
                    }`}
                    aria-pressed={active}
                  >
                    {p.short}
                  </button>
                );
              })}
            </div>
          </div>
  
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full max-w-2xl mx-auto"
            role="img"
            aria-label="Arachidonic acid pathway showing COX-1, COX-2 and lipoxygenase branches with NSAID inhibition effects"
          >
            <defs>
              <marker
                id="nsaid-arrow"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L6,3 L0,6 Z" fill="hsl(var(--muted-foreground))" />
              </marker>
              <marker
                id="nsaid-arrow-shunt"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
              >
                <path d="M0,0 L6,3 L0,6 Z" fill="hsl(0 65% 50%)" />
              </marker>
              <pattern
                id="nsaid-block-hatch"
                patternUnits="userSpaceOnUse"
                width="6"
                height="6"
                patternTransform="rotate(45)"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="6"
                  stroke="hsl(0 65% 50%)"
                  strokeWidth="2"
                  opacity="0.55"
                />
              </pattern>
            </defs>
  
            {/* ── Membrane phospholipids ── */}
            <rect
              x={50}
              y={20}
              width={W - 100}
              height={22}
              rx={3}
              fill="hsl(45 30% 92%)"
              stroke="hsl(var(--border))"
            />
            <text
              x={W / 2}
              y={35}
              textAnchor="middle"
              fontSize="9.5"
              className="fill-foreground font-semibold"
            >
              Membrane phospholipids
            </text>
  
            {/* PLA2 step */}
            <line
              x1={W / 2}
              x2={W / 2}
              y1={42}
              y2={aaY - 12}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={1.5}
              markerEnd="url(#nsaid-arrow)"
            />
            <text
              x={W / 2 + 8}
              y={55}
              fontSize="8.5"
              className="fill-muted-foreground italic"
            >
              phospholipase A₂
            </text>
  
            {/* Arachidonic acid pool */}
            <rect
              x={aaX - 80}
              y={aaY - 12}
              width={160}
              height={26}
              rx={6}
              fill="hsl(var(--background))"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={1}
            />
            <text
              x={aaX}
              y={aaY + 5}
              textAnchor="middle"
              fontSize="10.5"
              className="fill-foreground font-bold"
            >
              Arachidonic acid
            </text>
  
            {/* ── Three branches ── */}
            {/* COX-1 branch */}
            <Branch
              x={cox1X}
              startY={aaY + 14}
              enzymeY={enzymeY}
              label="COX-1"
              sublabel="constitutive"
              color="hsl(210 70% 50%)"
              inhibition={cox1Mag}
              startX={aaX - 30}
            />
            {/* COX-2 branch */}
            <Branch
              x={cox2X}
              startY={aaY + 14}
              enzymeY={enzymeY}
              label="COX-2"
              sublabel="inducible"
              color="hsl(280 55% 55%)"
              inhibition={cox2Mag}
              startX={aaX + 30}
            />
            {/* Lipoxygenase shunt — increases when COX is blocked */}
            <Branch
              x={loxX}
              startY={aaY + 14}
              enzymeY={enzymeY}
              label="5-LOX"
              sublabel="shunt"
              color="hsl(0 65% 50%)"
              inhibition={0}
              shuntMagnitude={shuntMag}
              startX={aaX - 70}
              isShunt
            />
  
            {/* ── Products row ── */}
            {/* COX-1 products */}
            <ProductBox
              x={cox1ProductX}
              y={productY}
              color="hsl(210 70% 50%)"
              inhibition={cox1Mag}
              title="TXA₂ · PGE₂ · PGI₂"
              sub="(platelet · gastric · renal)"
            />
            {/* COX-2 products */}
            <ProductBox
              x={cox2ProductX}
              y={productY}
              color="hsl(280 55% 55%)"
              inhibition={cox2Mag}
              title="PGE₂ · PGI₂"
              sub="(inflammation · pain · fever · endothelium · macula densa)"
            />
            {/* LOX products */}
            <ProductBox
              x={loxProductX}
              y={productY}
              color="hsl(0 65% 50%)"
              inhibition={-shuntMag} // negative inhibition → boosted
              title="LTB₄ · LTC₄/D₄/E₄"
              sub="(bronchospasm)"
            />
  
            {/* ── Outcome rows ── */}
            {/* Therapeutic outcomes (green band) */}
            <rect
              x={20}
              y={295}
              width={W - 40}
              height={70}
              rx={8}
              fill={`${therapeuticColor}10`}
              stroke={therapeuticColor}
              strokeOpacity={0.4}
              strokeDasharray="4 3"
            />
            <text
              x={28}
              y={310}
              fontSize="9"
              fontWeight={700}
              fill={therapeuticColor}
            >
              THERAPEUTIC EFFECTS
            </text>
  
            {/* Adverse outcomes (red band) */}
            <rect
              x={20}
              y={375}
              width={W - 40}
              height={92}
              rx={8}
              fill={`${adverseColor}10`}
              stroke={adverseColor}
              strokeOpacity={0.4}
              strokeDasharray="4 3"
            />
            <text x={28} y={390} fontSize="9" fontWeight={700} fill={adverseColor}>
              ADVERSE EFFECTS
            </text>
  
            {/* Effect chips */}
            {EFFECTS.map((e, _i) => {
              const therapeuticList = EFFECTS.filter((x) => x.kind === "therapeutic");
              const adverseList = EFFECTS.filter((x) => x.kind === "adverse");
              const isThera = e.kind === "therapeutic";
              const list = isThera ? therapeuticList : adverseList;
              const idx = list.findIndex((x) => x.id === e.id);
              const cols = isThera ? therapeuticList.length : Math.ceil(adverseList.length / 2);
              const colW = (W - 60) / cols;
              const col = idx % cols;
              const row = Math.floor(idx / cols);
              const cx = 30 + col * colW + colW / 2;
              const cy = isThera ? 340 : 410 + row * 28;
  
              const driverMag =
                e.driver === "cox1"
                  ? cox1Mag
                  : e.driver === "cox2"
                  ? cox2Mag
                  : shuntMag;
              const active = driverMag > 0.25;
              const dColor = driverColor(e.driver);
              const isSelected = selectedEffect === e.id;
              return (
                <g
                  key={e.id}
                  onClick={() => setSelectedEffect(e.id)}
                  style={{ cursor: "pointer" }}
                  opacity={active ? 1 : 0.35}
                >
                  <rect
                    x={cx - colW / 2 + 4}
                    y={cy - 11}
                    width={colW - 8}
                    height={22}
                    rx={11}
                    fill={isSelected ? dColor : "hsl(var(--background))"}
                    stroke={dColor}
                    strokeWidth={isSelected ? 1.8 : 1.1}
                    opacity={isSelected ? 0.9 : active ? 1 : 0.6}
                  />
                  <text
                    x={cx}
                    y={cy + 3.5}
                    textAnchor="middle"
                    fontSize="8.5"
                    fontWeight={isSelected ? 700 : 600}
                    fill={isSelected ? "hsl(var(--background))" : dColor}
                  >
                    {e.label}
                  </text>
                </g>
              );
            })}
  
            {/* Connector lines from products to selected effect */}
            {(() => {
              const sel = EFFECTS.find((e) => e.id === selectedEffect);
              if (!sel) return null;
              const sourceX =
                sel.driver === "cox1"
                  ? cox1ProductX
                  : sel.driver === "cox2"
                  ? cox2ProductX
                  : loxProductX;
              const sourceY = productY + 30;
              const therapeuticList = EFFECTS.filter((x) => x.kind === "therapeutic");
              const adverseList = EFFECTS.filter((x) => x.kind === "adverse");
              const list = sel.kind === "therapeutic" ? therapeuticList : adverseList;
              const idx = list.findIndex((x) => x.id === sel.id);
              const cols = sel.kind === "therapeutic" ? therapeuticList.length : Math.ceil(adverseList.length / 2);
              const colW = (W - 60) / cols;
              const col = idx % cols;
              const row = Math.floor(idx / cols);
              const targetX = 30 + col * colW + colW / 2;
              const targetY = sel.kind === "therapeutic" ? 340 - 11 : 410 + row * 28 - 11;
              const dColor = driverColor(sel.driver);
              return (
                <path
                  d={`M ${sourceX} ${sourceY} C ${sourceX} ${(sourceY + targetY) / 2}, ${targetX} ${(sourceY + targetY) / 2}, ${targetX} ${targetY}`}
                  fill="none"
                  stroke={dColor}
                  strokeWidth={1.5}
                  strokeDasharray="4 3"
                  opacity={0.85}
                />
              );
            })()}
          </svg>
  
          {/* Selected effect detail panel */}
          {(() => {
            const sel = EFFECTS.find((e) => e.id === selectedEffect);
            if (!sel) return null;
            const dColor = driverColor(sel.driver);
            const driverMag =
              sel.driver === "cox1"
                ? cox1Mag
                : sel.driver === "cox2"
                ? cox2Mag
                : shuntMag;
            const driverLabel =
              sel.driver === "cox1"
                ? "COX-1 inhibition"
                : sel.driver === "cox2"
                ? "COX-2 inhibition"
                : "Lipoxygenase shunt";
            return (
              <div
                className="mt-4 p-3 rounded-lg border border-border bg-background/80 space-y-1.5"
                style={{ borderLeftWidth: 4, borderLeftColor: dColor }}
              >
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <p className="font-semibold text-foreground text-sm">{sel.label}</p>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                      style={{
                        background: `${
                          sel.kind === "therapeutic"
                            ? "hsl(150 55% 40%)"
                            : "hsl(0 65% 50%)"
                        }26`,
                        color:
                          sel.kind === "therapeutic"
                            ? "hsl(150 55% 30%)"
                            : "hsl(0 65% 40%)",
                      }}
                    >
                      {sel.kind}
                    </span>
                    <span
                      className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                      style={{ background: `${dColor}26`, color: dColor }}
                    >
                      {driverLabel} · {Math.round(driverMag * 100)}%
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Mediator:</span>{" "}
                  {sel.mediator}
                </p>
                <p className="text-xs text-muted-foreground">{sel.detail}</p>
              </div>
            );
          })()}
  
          {/* Profile description */}
          <div className="mt-3 text-xs text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            <p>
              <span className="font-semibold text-foreground">{profile.label}:</span>{" "}
              {profile.description}
            </p>
            <p className="mt-1">
              <span className="font-medium text-foreground">Examples:</span>{" "}
              {profile.examples}
            </p>
          </div>
  
          <p className="text-xs text-center text-muted-foreground mt-3 italic">
            <span className="font-semibold not-italic text-foreground">
              COX-1 = housekeeping (gastric, platelet, renal). COX-2 = inflammation, fever, pain — and endothelial PGI₂.
            </span>
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

/* ─── Sub-components ───────────────────────────────────────── */

interface BranchProps {
  x: number;
  startX: number;
  startY: number;
  enzymeY: number;
  label: string;
  sublabel: string;
  color: string;
  inhibition: number;
  shuntMagnitude?: number;
  isShunt?: boolean;
}

const Branch = ({
  x,
  startX,
  startY,
  enzymeY,
  label,
  sublabel,
  color,
  inhibition,
  shuntMagnitude = 0,
  isShunt,
}: BranchProps) => {
  // Shunt arrow grows with shuntMagnitude; COX arrows shrink with inhibition.
  const flow = isShunt ? 0.25 + shuntMagnitude * 0.75 : 1 - inhibition * 0.8;
  return (
    <g>
      {/* Pathway arrow from arachidonic acid down to enzyme */}
      <path
        d={`M ${startX} ${startY} Q ${(startX + x) / 2} ${startY + 20}, ${x} ${enzymeY - 16}`}
        fill="none"
        stroke={color}
        strokeWidth={1.2 + flow * 2.2}
        opacity={0.4 + flow * 0.5}
        markerEnd="url(#nsaid-arrow)"
        strokeDasharray={isShunt ? "5 3" : undefined}
      />
      {/* Enzyme box */}
      <rect
        x={x - 38}
        y={enzymeY - 16}
        width={76}
        height={32}
        rx={6}
        fill={`${color}20`}
        stroke={color}
        strokeWidth={1.5}
      />
      <text
        x={x}
        y={enzymeY - 2}
        textAnchor="middle"
        fontSize="11"
        fontWeight={700}
        fill={color}
      >
        {label}
      </text>
      <text
        x={x}
        y={enzymeY + 10}
        textAnchor="middle"
        fontSize="7.5"
        className="fill-muted-foreground italic"
      >
        {sublabel}
      </text>

      {/* Inhibition overlay — diagonal hatch + "BLOCKED" badge */}
      {inhibition > 0.15 && (
        <g>
          <rect
            x={x - 38}
            y={enzymeY - 16}
            width={76}
            height={32}
            rx={6}
            fill="url(#nsaid-block-hatch)"
            opacity={inhibition}
            pointerEvents="none"
          />
          <rect
            x={x - 22}
            y={enzymeY + 18}
            width={44}
            height={14}
            rx={7}
            fill="hsl(0 65% 50%)"
            opacity={inhibition}
          />
          <text
            x={x}
            y={enzymeY + 28}
            textAnchor="middle"
            fontSize="8"
            fontWeight={700}
            fill="hsl(var(--background))"
            opacity={inhibition}
          >
            inhibited
          </text>
        </g>
      )}

      {/* Shunt boost badge */}
      {isShunt && shuntMagnitude > 0.2 && (
        <g>
          <rect
            x={x - 22}
            y={enzymeY + 18}
            width={44}
            height={14}
            rx={7}
            fill="hsl(0 65% 50%)"
          />
          <text
            x={x}
            y={enzymeY + 28}
            textAnchor="middle"
            fontSize="8"
            fontWeight={700}
            fill="hsl(var(--background))"
          >
            ↑ shunt
          </text>
        </g>
      )}
    </g>
  );
};

interface ProductBoxProps {
  x: number;
  y: number;
  color: string;
  inhibition: number; // negative = boosted, positive = blocked
  title: string;
  sub: string;
}

const ProductBox = ({ x, y, color, inhibition, title, sub }: ProductBoxProps) => {
  const blocked = inhibition > 0.25;
  const boosted = inhibition < -0.25;
  return (
            <g>
      <line
        x1={x}
        x2={x}
        y1={y - 30}
        y2={y - 8}
        stroke={color}
        strokeWidth={1}
        opacity={0.6}
        markerEnd="url(#nsaid-arrow)"
      />
      <rect
        x={x - 90}
        y={y - 8}
        width={180}
        height={36}
        rx={6}
        fill="hsl(var(--background))"
        stroke={color}
        strokeWidth={1}
        opacity={blocked ? 0.5 : 1}
      />
      <text
        x={x}
        y={y + 6}
        textAnchor="middle"
        fontSize="9.5"
        fontWeight={700}
        fill={color}
        opacity={blocked ? 0.45 : 1}
      >
        {title}
      </text>
      <text
        x={x}
        y={y + 19}
        textAnchor="middle"
        fontSize="7.5"
        className="fill-muted-foreground"
        opacity={blocked ? 0.45 : 1}
      >
        {sub}
      </text>
      {blocked && (
        <text
          x={x + 80}
          y={y - 12}
          textAnchor="end"
          fontSize="9"
          fontWeight={700}
          fill="hsl(0 65% 50%)"
        >
          ↓↓
        </text>
      )}
      {boosted && (
        <text
          x={x + 80}
          y={y - 12}
          textAnchor="end"
          fontSize="9"
          fontWeight={700}
          fill="hsl(0 65% 50%)"
        >
          ↑↑
        </text>
      )}
    </g>
  );
};
