#!/usr/bin/env node
/**
 * Validates the standalone drug reference dataset:
 *  - every infusion recipe has a diluent, draw-up, concentration and dose range
 *  - the slug map has no duplicates and every mapped slug exists in the backend
 *  - pump-rate arithmetic is unit-correct (mg -> micrograms conversion included)
 *  - every backend monograph carries at least one source, and every drug flagged
 *    for therapeutic drug monitoring has targets, timing, toxicity, sampling and
 *    dose-adjustment guidance plus its own sources
 *
 * Backend checks are skipped (with a warning) when the Supabase env vars are absent.
 */
import { readFileSync } from "node:fs";

const failures = [];
const warnings = [];

// ---------------------------------------------------------------- static data
const src = readFileSync("src/data/icuInfusions.ts", "utf8");
const recipeBlocks = src.split(/\n\s*\{\s*\n\s*drug:/).slice(1);
if (recipeBlocks.length === 0) failures.push("No infusion recipes found in src/data/icuInfusions.ts");

for (const block of recipeBlocks) {
  const name = block.match(/^\s*"([^"]+)"/)?.[1] ?? "unknown drug";
  for (const field of ["diluent", "drawUp", "concentrationPerMl", "concentrationLabel", "unit", "startDose", "minDose", "maxDose"]) {
    if (!new RegExp(`\\b${field}:`).test(block)) failures.push(`${name}: missing ${field}`);
  }
  const min = Number(block.match(/minDose:\s*([\d.]+)/)?.[1]);
  const max = Number(block.match(/maxDose:\s*([\d.]+)/)?.[1]);
  const start = Number(block.match(/startDose:\s*([\d.]+)/)?.[1]);
  if (Number.isFinite(min) && Number.isFinite(max) && min > max) failures.push(`${name}: minDose above maxDose`);
  if (Number.isFinite(start) && Number.isFinite(min) && Number.isFinite(max) && (start < min || start > max)) {
    failures.push(`${name}: startDose outside the dose range`);
  }
}

const dilutionSrc = readFileSync("src/features/drugReference/dilutions.ts", "utf8");
const mapBody = dilutionSrc.match(/SLUG_BY_INFUSION_NAME[^{]*\{([\s\S]*?)\n\};/)?.[1] ?? "";
const mappedSlugs = [...mapBody.matchAll(/:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]);
const dupes = mappedSlugs.filter((s, i) => mappedSlugs.indexOf(s) !== i);
if (dupes.length) failures.push(`Duplicate slug mapping: ${[...new Set(dupes)].join(", ")}`);

// ------------------------------------------------------------- rate arithmetic
// Mirrors amountPerHour() in src/features/drugReference/dilutions.ts.
const perHour = (unit, dose, kg) =>
  ({
    "micrograms/kg/min": dose * kg * 60,
    "micrograms/kg/h": dose * kg,
    "micrograms/min": dose * 60,
    "mg/kg/h": dose * kg * 1000,
    "units/min": dose * 60,
    "units/kg/h": dose * kg,
    "units/h": dose,
  })[unit] ?? NaN;

const cases = [
  { unit: "mg/kg/h", dose: 2, kg: 70, conc: 10000, expect: 14 }, // propofol 1%
  { unit: "micrograms/kg/min", dose: 0.05, kg: 70, conc: 160, expect: 1.3125 }, // noradrenaline
  { unit: "units/min", dose: 0.03, kg: 70, conc: 1, expect: 1.8 }, // vasopressin
  { unit: "micrograms/min", dose: 20, kg: 70, conc: 200, expect: 6 }, // metaraminol
  { unit: "micrograms/kg/h", dose: 0.7, kg: 70, conc: 8, expect: 6.125 }, // dexmedetomidine
];
for (const c of cases) {
  const ml = perHour(c.unit, c.dose, c.kg) / c.conc;
  if (Math.abs(ml - c.expect) > 0.001) {
    failures.push(`Rate arithmetic wrong for ${c.unit}: got ${ml} mL/h, expected ${c.expect}`);
  }
}

// ------------------------------------------------------------------- backend
const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
if (!url || !key) {
  warnings.push("Supabase env vars not set — skipped monograph, source and monitoring checks.");
} else {
  const res = await fetch(
    `${url}/rest/v1/drugs?select=slug,name,sources,requires_tdm,tdm&limit=1000`,
    { headers: { apikey: key, Authorization: `Bearer ${key}` } },
  );
  if (!res.ok) {
    failures.push(`Could not read the drugs table (HTTP ${res.status}).`);
  } else {
    const rows = await res.json();
    const slugs = new Set(rows.map((r) => r.slug));
    for (const slug of mappedSlugs) {
      if (!slugs.has(slug)) failures.push(`Infusion recipe maps to unknown drug slug "${slug}"`);
    }
    for (const row of rows) {
      if (!Array.isArray(row.sources) || row.sources.length === 0) {
        failures.push(`${row.name}: no sources listed`);
        continue;
      }
      for (const s of row.sources) {
        if (!s.title || !s.publisher || !s.url) failures.push(`${row.name}: incomplete source entry`);
      }
      if (row.requires_tdm) {
        const t = row.tdm ?? {};
        for (const field of ["targets", "timing", "toxicity", "sampling", "adjustment", "sources"]) {
          if (!Array.isArray(t[field]) || t[field].length === 0) {
            failures.push(`${row.name}: monitoring data missing ${field}`);
          }
        }
        for (const target of t.targets ?? []) {
          if (!target.label || !target.value) failures.push(`${row.name}: incomplete monitoring target`);
        }
        for (const tox of t.toxicity ?? []) {
          if (!tox.threshold || !tox.features || !tox.action) {
            failures.push(`${row.name}: incomplete toxicity entry`);
          }
        }
      }
    }
    console.log(
      `Checked ${rows.length} monographs, ${rows.filter((r) => r.requires_tdm).length} with therapeutic drug monitoring.`,
    );
  }
}

for (const w of warnings) console.warn(`warning: ${w}`);
if (failures.length) {
  console.error(`\ncheck-drug-reference: ${failures.length} problem(s)`);
  for (const f of failures) console.error(` - ${f}`);
  process.exit(1);
}
console.log(`check-drug-reference: ${recipeBlocks.length} infusion recipes OK`);
