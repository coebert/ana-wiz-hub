// Teaching arithmetic only — never a treatment decision.
const ok = (...n: number[]) => n.every((x) => Number.isFinite(x));

/** MAP ≈ DBP + (SBP − DBP)/3, shock index = HR/SBP, cardiac power output = MAP × CO / 451 (W). */
export function shockNumbers(hr: number, sbp: number, dbp: number, co?: number) {
  if (!ok(hr, sbp, dbp) || sbp <= 0 || dbp <= 0 || dbp > sbp || hr <= 0) return null;
  const map = Math.round(dbp + (sbp - dbp) / 3);
  const shockIndex = Math.round((hr / sbp) * 100) / 100;
  const cpo = co !== undefined && ok(co) && co > 0 ? Math.round(((map * co) / 451) * 100) / 100 : null;
  return { map, shockIndex, belowSscMap: map < 65, cpo };
}

/** Passive leg raise: % change in cardiac output (or stroke volume); Monnet 2016 best threshold ≥10%. */
export function plrChange(before: number, after: number) {
  if (!ok(before, after) || before <= 0 || after <= 0) return null;
  const pct = Math.round(((after - before) / before) * 1000) / 10;
  return { pct, responsive: pct >= 10 };
}

/** NICE CG174 routine maintenance: 25–30 mL/kg/day water, ~1 mmol/kg/day Na/K/Cl. */
export function niceMaintenance(weightKg: number) {
  if (!ok(weightKg) || weightKg < 20 || weightKg > 250) return null;
  return { waterLow: Math.round(weightKg * 25), waterHigh: Math.round(weightKg * 30), electrolyteMmol: Math.round(weightKg) };
}

/** STOP-IT: fixed course of about 4 days after adequate source control (day 0 = source-control day). */
export function stopItEndDay(sourceControlISO: string) {
  const d = new Date(`${sourceControlISO}T12:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(sourceControlISO) || Number.isNaN(d.getTime())) return null;
  d.setUTCDate(d.getUTCDate() + 4);
  return d.toISOString().slice(0, 10);
}
