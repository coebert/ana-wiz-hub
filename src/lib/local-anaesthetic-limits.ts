/**
 * Product-, technique- and route-scoped local anaesthetic limits for
 * /tools/max-local-anaesthetic-dose.
 *
 * Each row is one named UK product table, not an agent-wide "maximum safe"
 * dose. A row that has no product-specific figure is lookup-only and returns
 * `null` from `calculateLocalAnaestheticLimit`, so the UI fails closed instead
 * of inventing a universal ceiling. Below a listed ceiling, toxicity is still
 * possible: prior doses, mixed agents, site vascularity, weight basis and
 * patient factors all matter.
 */

export interface LocalAnaestheticRow {
  key: string;
  agent: string;
  /** Named UK product the figures come from. */
  product: string;
  technique: string;
  route: string;
  /** Concentrations (%) covered by that product table. */
  concentrations: number[];
  withAdrenaline: boolean;
  /** Weight-based ceiling in mg/kg, where the product gives one. */
  mgPerKg?: number;
  /** Absolute single-dose ceiling in mg. */
  maxMg: number;
  /** Adult product tables are not validated below this weight in this tool. */
  minimumWeightKg: number;
  /** No product-specific maximum is calculated for this row. */
  lookupOnly?: boolean;
  sourceUrl: string;
  notes: string;
}

export const LOCAL_ANAESTHETIC_ROWS: LocalAnaestheticRow[] = [
  {
    key: "lidocaine-plain",
    agent: "Lidocaine",
    product: "Lidocaine 1% w/v Injection BP (B.Braun, emc 15149)",
    technique: "Infiltration / minor nerve block",
    route: "Local infiltration or peripheral nerve block",
    concentrations: [0.5, 1],
    withAdrenaline: false,
    mgPerKg: 4.5,
    maxMg: 300,
    minimumWeightKg: 30,
    sourceUrl: "https://www.medicines.org.uk/emc/product/15149/smpc",
    notes:
      "Named product: single dose ≤4.5 mg/kg and ≤300 mg without a vasoconstrictor. Its own table is lower for some techniques (minor nerve block 200 mg, spinal 100 mg) and IVRA has separate limits. Not a target and not a toxicity threshold.",
  },
  {
    key: "lidocaine-adrenaline",
    agent: "Lidocaine + adrenaline",
    product: "Xylocaine 1% with adrenaline 1:200,000 (emc 2397)",
    technique: "Infiltration or block",
    route: "Infiltration or peripheral nerve block",
    concentrations: [1],
    withAdrenaline: true,
    mgPerKg: 7,
    maxMg: 500,
    minimumWeightKg: 30,
    sourceUrl: "https://www.medicines.org.uk/emc/product/2397/smpc",
    notes:
      "Named product: adult single-dose ceiling 500 mg; 7 mg/kg is a conservative teaching constraint, not permission to exceed a lower procedure-specific limit. Vasoconstrictor suitability (digits, end-arterial sites) must be assessed.",
  },
  {
    key: "prilocaine-plain",
    agent: "Prilocaine",
    product: "Prilocaine hydrochloride 1% Solution for Injection (Aspen, emc 870)",
    technique: "Infiltration / nerve block",
    route: "Infiltration or nerve block (not IVRA)",
    concentrations: [1],
    withAdrenaline: false,
    maxMg: 400,
    minimumWeightKg: 30,
    sourceUrl: "https://www.medicines.org.uk/emc/product/870/smpc",
    notes:
      "Named product: adult maximum 400 mg — it states no adult mg/kg figure, so none is calculated. Children over 6 months have a separate 5 mg/kg limit. Not for IVRA; the o-toluidine metabolite causes methaemoglobinaemia.",
  },
  {
    key: "bupivacaine-field",
    agent: "Bupivacaine",
    product: "Bupivacaine 0.25% w/v (emc 11611)",
    technique: "Field block / infiltration",
    route: "Field block or infiltration only",
    concentrations: [0.25, 0.5],
    withAdrenaline: false,
    mgPerKg: 2,
    maxMg: 150,
    minimumWeightKg: 30,
    sourceUrl: "https://www.medicines.org.uk/emc/product/11611/smpc",
    notes:
      "Named product: field-block/infiltration limit 150 mg and no more than 2 mg/kg in any four hours including prior doses. Not a neuraxial or major-nerve-block dose. Highly cardiotoxic — never give intravenously.",
  },
  {
    key: "levobupivacaine-infiltration",
    agent: "Levobupivacaine",
    product: "Levobupivacaine 2.5 mg/mL (emc 13644)",
    technique: "Local infiltration",
    route: "Local infiltration only",
    concentrations: [0.25, 0.5],
    withAdrenaline: false,
    maxMg: 150,
    minimumWeightKg: 30,
    sourceUrl: "https://www.medicines.org.uk/emc/product/13644/smpc",
    notes:
      "Named product: adult infiltration single-dose limit 150 mg. A 400 mg/24 h figure is not a repeat-dose prescription. Not a paediatric or intrathecal regimen.",
  },
  {
    key: "ropivacaine-lookup",
    agent: "Ropivacaine",
    product: "Ropivacaine — no single named product table adopted",
    technique: "Infiltration or block",
    route: "Route and procedure determine the limit",
    concentrations: [0.5],
    withAdrenaline: false,
    maxMg: 0,
    minimumWeightKg: 30,
    lookupOnly: true,
    sourceUrl: "https://www.medicines.org.uk/emc/search?q=ropivacaine",
    notes:
      "No universal ropivacaine maximum is calculated: the exact product and procedure table must be used. A generic 3 mg/kg or 200 mg figure cannot certify safety.",
  },
];

export interface LocalAnaestheticLimit {
  maxMg: number;
  maxMl: number;
  mgPerMl: number;
  mgPerKg?: number;
  cappedBy: "weight" | "absolute" | "product-only";
}

/**
 * Returns `null` for an unsupported combination: unknown row, invalid weight,
 * weight below the adult product table, a concentration that product does not
 * cover, or a lookup-only row. Callers must show the reason, not a number.
 */
export function calculateLocalAnaestheticLimit(
  rowKey: string,
  weightKg: number,
  concentrationPct: number
): LocalAnaestheticLimit | null {
  const row = LOCAL_ANAESTHETIC_ROWS.find((r) => r.key === rowKey);
  if (!row || row.lookupOnly) return null;
  if (!Number.isFinite(weightKg) || weightKg < row.minimumWeightKg) return null;
  if (!row.concentrations.includes(concentrationPct)) return null;
  if (!Number.isFinite(row.maxMg) || row.maxMg <= 0) return null;

  const weightCeiling = row.mgPerKg !== undefined ? row.mgPerKg * weightKg : Infinity;
  const maxMg = Math.min(weightCeiling, row.maxMg);
  const mgPerMl = concentrationPct * 10;
  return {
    maxMg,
    maxMl: maxMg / mgPerMl,
    mgPerMl,
    mgPerKg: row.mgPerKg,
    cappedBy:
      row.mgPerKg === undefined
        ? "product-only"
        : weightCeiling < row.maxMg
          ? "weight"
          : "absolute",
  };
}

/** Why a selection produced no value — used to explain a failed-closed result. */
export function localAnaestheticUnsupportedReason(
  rowKey: string,
  weightKg: number,
  concentrationPct: number
): string | null {
  const row = LOCAL_ANAESTHETIC_ROWS.find((r) => r.key === rowKey);
  if (!row) return "Unknown product.";
  if (row.lookupOnly)
    return "No product-specific maximum is calculated for this agent — use the exact product table.";
  if (!Number.isFinite(weightKg) || weightKg < row.minimumWeightKg)
    return `This named adult product table is not validated below ${row.minimumWeightKg} kg. Paediatric dosing follows a separate regimen and is not calculated here.`;
  if (!row.concentrations.includes(concentrationPct))
    return `This product table does not cover ${concentrationPct}%.`;
  return null;
}
