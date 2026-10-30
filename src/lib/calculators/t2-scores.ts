/**
 * T2 (ROOT16/ROOT17) — educational score arithmetic for APACHE II, SOFA, qSOFA and NEWS2.
 * Pure helpers: no mortality prediction, no treatment orders, no sepsis diagnosis.
 * Unknown / invalid inputs stay unknown (null) and make the total incomplete; they are never
 * silently treated as normal.
 */

export type Num = number | null | undefined;

/** Finite number within [min, max] (and integer if requested), else null. */
export function valid(v: Num, min: number, max: number, integer = false): number | null {
  if (v === null || v === undefined || typeof v !== "number" || !Number.isFinite(v)) return null;
  if (v < min || v > max) return null;
  if (integer && !Number.isInteger(v)) return null;
  return v;
}

export interface Component { key: string; label: string; points: number | null; note?: string }
export interface ScoreResult { total: number | null; partial: number; missing: string[]; breakdown: Component[] }

function sum(breakdown: Component[]): ScoreResult {
  const missing = breakdown.filter((b) => b.points === null).map((b) => b.label);
  const partial = breakdown.reduce((s, b) => s + (b.points ?? 0), 0);
  return { total: missing.length ? null : partial, partial, missing, breakdown };
}

/* ───────────────────────────── APACHE II (Knaus 1985) ───────────────────────────── */

export type ChronicHealth = "none" | "elective" | "emergencyOrMedical";

export const apTemp = (t: number) =>
  t >= 41 ? 4 : t >= 39 ? 3 : t >= 38.5 ? 1 : t >= 36 ? 0 : t >= 34 ? 1 : t >= 32 ? 2 : t >= 30 ? 3 : 4;
export const apMap = (m: number) => (m >= 160 ? 4 : m >= 130 ? 3 : m >= 110 ? 2 : m >= 70 ? 0 : m >= 50 ? 2 : 4);
export const apHr = (h: number) =>
  h >= 180 ? 4 : h >= 140 ? 3 : h >= 110 ? 2 : h >= 70 ? 0 : h >= 55 ? 2 : h >= 40 ? 3 : 4;
export const apRr = (r: number) =>
  r >= 50 ? 4 : r >= 35 ? 3 : r >= 25 ? 1 : r >= 12 ? 0 : r >= 10 ? 1 : r >= 6 ? 2 : 4;
/** FiO₂ ≥ 0.5 → A–a gradient (mmHg); FiO₂ < 0.5 → PaO₂ (mmHg). */
export const apOxy = (fio2: number, aa: number | null, pao2: number | null): number | null => {
  if (fio2 >= 0.5) return aa === null ? null : aa >= 500 ? 4 : aa >= 350 ? 3 : aa >= 200 ? 2 : 0;
  return pao2 === null ? null : pao2 > 70 ? 0 : pao2 >= 61 ? 1 : pao2 >= 55 ? 3 : 4;
};
export const apPh = (p: number) =>
  p >= 7.7 ? 4 : p >= 7.6 ? 3 : p >= 7.5 ? 1 : p >= 7.33 ? 0 : p >= 7.25 ? 2 : p >= 7.15 ? 3 : 4;
export const apNa = (n: number) =>
  n >= 180 ? 4 : n >= 160 ? 3 : n >= 155 ? 2 : n >= 150 ? 1 : n >= 130 ? 0 : n >= 120 ? 2 : n >= 111 ? 3 : 4;
export const apK = (v: number) =>
  v >= 7 ? 4 : v >= 6 ? 3 : v >= 5.5 ? 1 : v >= 3.5 ? 0 : v >= 3 ? 1 : v >= 2.5 ? 2 : 4;
/**
 * Creatinine µmol/L — gap-free SI convention of Féry-Lemonnier et al. 1995 (Table 2):
 * <53 → 2; 53–<133 → 0; 133–<177 → 2; 177–<309 → 3; ≥309 → 4.
 * A named historical SI convention, not an exact equivalent of every mg/dL rounding method.
 */
export const apCreat = (c: number) => (c >= 309 ? 4 : c >= 177 ? 3 : c >= 133 ? 2 : c >= 53 ? 0 : 2);
export const apHct = (h: number) => (h >= 60 ? 4 : h >= 50 ? 2 : h >= 46 ? 1 : h >= 30 ? 0 : h >= 20 ? 2 : 4);
export const apWcc = (w: number) => (w >= 40 ? 4 : w >= 20 ? 2 : w >= 15 ? 1 : w >= 3 ? 0 : w >= 1 ? 2 : 4);
export const apAge = (a: number) => (a >= 75 ? 6 : a >= 65 ? 5 : a >= 55 ? 3 : a >= 45 ? 2 : 0);
export const apChronic = (c: ChronicHealth) => (c === "emergencyOrMedical" ? 5 : c === "elective" ? 2 : 0);

export interface ApacheInputs {
  temp: Num; map: Num; hr: Num; rr: Num; fio2: Num; aaO2: Num; pao2: Num; ph: Num;
  na: Num; k: Num; creat: Num; acuteRenalFailure: boolean; hct: Num; wcc: Num; gcs: Num;
  age: Num; chronic: ChronicHealth | null;
}

export function apacheII(i: ApacheInputs): ScoreResult & { aps: number | null; agePts: number | null; chronicPts: number | null } {
  const pts = <T extends number>(v: number | null, f: (x: T) => number) => (v === null ? null : f(v as T));
  const fio2 = valid(i.fio2, 0.21, 1);
  const creat = valid(i.creat, 1, 3000);
  const creatBase = pts(creat, apCreat);
  const gcs = valid(i.gcs, 3, 15, true);
  const aps: Component[] = [
    { key: "temp", label: "Temperature", points: pts(valid(i.temp, 20, 45), apTemp) },
    { key: "map", label: "MAP", points: pts(valid(i.map, 0, 300), apMap) },
    { key: "hr", label: "Heart rate", points: pts(valid(i.hr, 0, 300), apHr) },
    { key: "rr", label: "Respiratory rate", points: pts(valid(i.rr, 0, 100), apRr) },
    {
      key: "oxy",
      label: fio2 !== null && fio2 >= 0.5 ? "Oxygenation (A–a gradient)" : "Oxygenation (PaO₂)",
      points: fio2 === null ? null : apOxy(fio2, valid(i.aaO2, 0, 800), valid(i.pao2, 0, 800)),
    },
    { key: "ph", label: "Arterial pH", points: pts(valid(i.ph, 6.5, 8.0), apPh) },
    { key: "na", label: "Sodium", points: pts(valid(i.na, 80, 220), apNa) },
    { key: "k", label: "Potassium", points: pts(valid(i.k, 0.5, 12), apK) },
    {
      key: "creat",
      label: i.acuteRenalFailure ? "Creatinine (×2, acute renal failure)" : "Creatinine",
      points: creatBase === null ? null : i.acuteRenalFailure ? creatBase * 2 : creatBase,
    },
    { key: "hct", label: "Haematocrit", points: pts(valid(i.hct, 5, 80), apHct) },
    { key: "wcc", label: "White cell count", points: pts(valid(i.wcc, 0, 500), apWcc) },
    { key: "gcs", label: "GCS (15 − GCS)", points: gcs === null ? null : 15 - gcs },
  ];
  const age = valid(i.age, 16, 120, true);
  const agePts = age === null ? null : apAge(age);
  const chronicPts = i.chronic ? apChronic(i.chronic) : null;
  const all = sum([
    ...aps,
    { key: "age", label: "Age points", points: agePts },
    { key: "chronic", label: "Chronic health points", points: chronicPts },
  ]);
  const apsRes = sum(aps);
  return { ...all, aps: apsRes.total, agePts, chronicPts };
}

/* ───────────────────────────── SOFA (Vincent 1996; Singer 2016 Table 1) ───────────────────────────── */

export type Tri = "yes" | "no" | "unknown";

/** P/F in mmHg. Scores 3–4 require respiratory support; without support the maximum is 2. */
export function sofaResp(pf: number | null, support: Tri): number | null {
  if (pf === null) return null;
  if (pf >= 400) return 0;
  if (pf >= 300) return 1;
  if (pf >= 200) return 2;
  if (support === "unknown") return null;
  if (support === "no") return 2;
  return pf < 100 ? 4 : 3;
}
export const sofaCoag = (p: number) => (p < 20 ? 4 : p < 50 ? 3 : p < 100 ? 2 : p < 150 ? 1 : 0);
/** Bilirubin µmol/L (integer): 20–32 →1, 33–101 →2, 102–204 →3, >204 →4. */
export const sofaLiver = (b: number) => (b > 204 ? 4 : b >= 102 ? 3 : b >= 33 ? 2 : b >= 20 ? 1 : 0);
export const sofaCns = (g: number) => (g < 6 ? 4 : g < 10 ? 3 : g < 13 ? 2 : g < 15 ? 1 : 0);
/** Creatinine µmol/L (integer): 110–170 →1, 171–299 →2, 300–440 →3, >440 →4. */
export const sofaCreat = (c: number) => (c > 440 ? 4 : c >= 300 ? 3 : c >= 171 ? 2 : c >= 110 ? 1 : 0);
/** Measured 24 h urine output, mL: <500 →3, <200 →4. */
export const sofaUrine = (u: number) => (u < 200 ? 4 : u < 500 ? 3 : 0);

export function sofaRenal(creat: number | null, urine24h: number | null): number | null {
  const c = creat === null ? null : sofaCreat(creat);
  const u = urine24h === null ? null : sofaUrine(urine24h);
  if (c === null) return u === 4 ? 4 : null; // without creatinine only a maximal urine score is final
  return Math.max(c, u ?? 0);
}

export type Agent = "dopamine" | "dobutamine" | "adrenaline" | "noradrenaline";
export interface AgentEntry { given: boolean; doseUgKgMin: Num }
export type Duration = "atLeast1h" | "lessThan1h" | "unknown";

/** Cardiovascular SOFA: highest qualifying category. Doses µg/kg/min, agents given for ≥1 h. */
export function sofaCv(map: number | null, agents: Partial<Record<Agent, AgentEntry>>, duration: Duration): { points: number | null; note?: string } {
  const given = (Object.keys(agents) as Agent[]).filter((a) => agents[a]?.given);
  if (given.length && duration === "unknown") return { points: null, note: "Vasoactive duration unknown" };
  const counted = duration === "atLeast1h" ? given : [];
  let best = 0;
  for (const a of counted) {
    const d = valid(agents[a]!.doseUgKgMin, 0, 100);
    if (d === null || d <= 0) return { points: null, note: `${a} dose missing or zero` };
    const p =
      a === "dobutamine" ? 2
      : a === "dopamine" ? (d > 15 ? 4 : d > 5 ? 3 : 2)
      : d > 0.1 ? 4 : 3;
    best = Math.max(best, p);
  }
  if (best >= 2) return { points: best };
  if (map === null) return { points: null, note: "MAP missing" };
  return { points: map < 70 ? 1 : 0, note: given.length && duration === "lessThan1h" ? "Agents given <1 h not counted" : undefined };
}

export interface SofaInputs {
  pf: Num; respSupport: Tri; platelets: Num; bilirubin: Num; gcs: Num; map: Num;
  agents: Partial<Record<Agent, AgentEntry>>; vasoDuration: Duration; creatinine: Num; urine24h: Num;
}

export function sofa(i: SofaInputs): ScoreResult {
  const cv = sofaCv(valid(i.map, 0, 300), i.agents, i.vasoDuration);
  const g = valid(i.gcs, 3, 15, true);
  const p = valid(i.platelets, 0, 2000);
  const b = valid(i.bilirubin, 0, 2000, true);
  return sum([
    { key: "resp", label: "Respiratory (P/F)", points: sofaResp(valid(i.pf, 10, 700), i.respSupport) },
    { key: "coag", label: "Coagulation (platelets)", points: p === null ? null : sofaCoag(p) },
    { key: "liver", label: "Liver (bilirubin)", points: b === null ? null : sofaLiver(b) },
    { key: "cv", label: "Cardiovascular", points: cv.points, note: cv.note },
    { key: "cns", label: "CNS (GCS)", points: g === null ? null : sofaCns(g) },
    { key: "renal", label: "Renal (creatinine / urine)", points: sofaRenal(valid(i.creatinine, 1, 3000, true), valid(i.urine24h, 0, 20000)) },
  ]);
}

/* ───────────────────────────── NEWS2 (RCP 2017, Chart 1 Scale 1; Chart 4) ───────────────────────────── */

export type Acvpu = "A" | "C" | "V" | "P" | "U";

export const nRr = (r: number) => (r <= 8 ? 3 : r <= 11 ? 1 : r <= 20 ? 0 : r <= 24 ? 2 : 3);
export const nSpo2Scale1 = (s: number) => (s <= 91 ? 3 : s <= 93 ? 2 : s <= 95 ? 1 : 0);
export const nTemp = (t: number) => (t <= 35 ? 3 : t <= 36 ? 1 : t <= 38 ? 0 : t <= 39 ? 1 : 2);
export const nSbp = (b: number) => (b <= 90 ? 3 : b <= 100 ? 2 : b <= 110 ? 1 : b <= 219 ? 0 : 3);
export const nHr = (h: number) => (h <= 40 ? 3 : h <= 50 ? 1 : h <= 90 ? 0 : h <= 110 ? 1 : h <= 130 ? 2 : 3);

export interface News2Inputs { rr: Num; spo2: Num; onO2: boolean | null; temp: Num; sbp: Num; hr: Num; acvpu: Acvpu | null; scale2Prescribed: boolean }

export type News2Response = "emergency" | "urgent" | "redComponent" | "low" | "zero";

export function news2(i: News2Inputs): (ScoreResult & { response: News2Response | null; notApplicable: boolean }) {
  if (i.scale2Prescribed) return { total: null, partial: 0, missing: [], breakdown: [], response: null, notApplicable: true };
  const f = (v: number | null, fn: (x: number) => number) => (v === null ? null : fn(v));
  const res = sum([
    { key: "rr", label: "Respiration rate", points: f(valid(i.rr, 0, 100, true), nRr) },
    { key: "spo2", label: "SpO₂ (Scale 1)", points: f(valid(i.spo2, 50, 100, true), nSpo2Scale1) },
    { key: "o2", label: "Air or oxygen", points: i.onO2 === null ? null : i.onO2 ? 2 : 0 },
    { key: "sbp", label: "Systolic BP", points: f(valid(i.sbp, 0, 350, true), nSbp) },
    { key: "hr", label: "Pulse", points: f(valid(i.hr, 0, 300, true), nHr) },
    { key: "acvpu", label: "Consciousness (ACVPU)", points: i.acvpu === null ? null : i.acvpu === "A" ? 0 : 3 },
    { key: "temp", label: "Temperature", points: f(valid(i.temp, 25, 45), nTemp) },
  ]);
  return { ...res, response: res.total === null ? null : news2Response(res.total, res.breakdown), notApplicable: false };
}

export function news2Response(total: number, breakdown: Component[]): News2Response {
  if (total >= 7) return "emergency";
  if (total >= 5) return "urgent";
  if (breakdown.some((b) => b.points === 3)) return "redComponent";
  if (total >= 1) return "low";
  return "zero";
}

export const NEWS2_RESPONSE_TEXT: Record<News2Response, string> = {
  emergency: "Aggregate ≥7: emergency response — emergency assessment by a team with critical-care competencies; continuous monitoring of vital signs.",
  urgent: "Aggregate 5–6: urgent response — urgent review by a clinician competent in assessing acutely ill patients; minimum hourly observations.",
  redComponent: "Single parameter scoring 3: urgent ward-based response — review by a medical team member to decide on escalation; minimum hourly observations.",
  low: "Aggregate 1–4 (no parameter scoring 3): registered-nurse assessment; minimum 4–6-hourly observations.",
  zero: "Aggregate 0: minimum 12-hourly observations. A zero score does not exclude illness — clinical concern should still prompt escalation.",
};

/* ───────────────────────────── qSOFA (Seymour 2016) ───────────────────────────── */

export function qsofa(i: { rr: Num; sbp: Num; alteredMentation: boolean | null }): ScoreResult {
  const rr = valid(i.rr, 0, 100, true);
  const sbp = valid(i.sbp, 0, 350, true);
  return sum([
    { key: "rr", label: "RR ≥ 22/min", points: rr === null ? null : rr >= 22 ? 1 : 0 },
    { key: "sbp", label: "SBP ≤ 100 mmHg", points: sbp === null ? null : sbp <= 100 ? 1 : 0 },
    { key: "ment", label: "Altered mentation", points: i.alteredMentation === null ? null : i.alteredMentation ? 1 : 0 },
  ]);
}
