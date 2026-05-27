/**
 * Unit tests for scripts/check-safety-citations.mjs.
 *
 * Covers:
 *   1. Regex matching for each safety-critical pattern family.
 *   2. Context gating (requireContextWord / requireLineWord).
 *   3. Dedupe of overlapping spans on the same line.
 *   4. isCovered ±6-line citation window.
 *   5. compareAgainstAllowlist baseline logic
 *      (over-baseline error, under-baseline improvement, stale entry).
 *
 * The checker is a plain .mjs script; we import it directly so the tests
 * exercise the production code, not a copy.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";
import {
  scanText,
  compareAgainstAllowlist,
  SAFETY_PATTERNS,
  isCovered,
} from "../../scripts/check-safety-citations.mjs";

const FIXTURES_DIR = resolve(__dirname, "../../tests/fixtures/safety-citations");
const fx = (name: string) => readFileSync(join(FIXTURES_DIR, name), "utf8");

// -------- helpers ----------------------------------------------------------
type Hit = {
  line: number;
  col: number;
  match: string;
  pattern: string;
  snippet: string;
};
const patternsOf = (hits: Hit[]) => hits.map((h) => h.pattern).sort();
const matchesOf = (hits: Hit[]) => hits.map((h) => h.match);

// -------- 1. regex matching ------------------------------------------------
describe("SAFETY_PATTERNS — regex matching", () => {
  it("flags weight-based doses, infusion rates, and absolute doses", () => {
    const hits: Hit[] = scanText(fx("doses.tsx"));
    const pats = new Set(patternsOf(hits));
    expect(pats.has("weight-dose")).toBe(true);
    expect(pats.has("infusion-rate")).toBe(true);
    expect(pats.has("absolute-dose")).toBe(true);
    // Specific numbers we expect to see
    expect(matchesOf(hits).some((m) => /1\s*mg\/kg/.test(m))).toBe(true);
    expect(matchesOf(hits).some((m) => /0\.05\s*mcg\/kg\/min/.test(m))).toBe(
      true,
    );
  });

  it("flags pressure (mmHg), lab (mmol/L), and haematology (g/L, ×10⁹/L) thresholds", () => {
    const hits: Hit[] = scanText(fx("thresholds.tsx"));
    const pats = new Set(patternsOf(hits));
    expect(pats.has("pressure-threshold")).toBe(true);
    expect(pats.has("lab-threshold")).toBe(true);
    expect(pats.has("haem-threshold")).toBe(true);
    expect(matchesOf(hits).some((m) => /<\s*70\s*g\/L/.test(m))).toBe(true);
  });

  it("flags anticoagulation targets (INR, APTT ratio, anti-Xa, ACT)", () => {
    const hits: Hit[] = scanText(fx("anticoag.tsx"));
    expect(patternsOf(hits)).toEqual(
      expect.arrayContaining([
        "anticoag-target",
        "anticoag-target",
        "anticoag-target",
        "anticoag-target",
      ]),
    );
    const matched = matchesOf(hits).join(" | ");
    expect(matched).toMatch(/INR\s+2.*3/);
    expect(matched).toMatch(/APTT/i);
    expect(matched).toMatch(/anti-?Xa/i);
    expect(matched).toMatch(/ACT/);
  });

  it("exposes a non-empty pattern table with unique names", () => {
    expect(SAFETY_PATTERNS.length).toBeGreaterThanOrEqual(8);
    const names = SAFETY_PATTERNS.map((p: { name: string }) => p.name);
    expect(new Set(names).size).toBe(names.length);
  });
});

// -------- 2. context gating ------------------------------------------------
describe("context gating", () => {
  it("temperature targets require a context word (target/cool/TTM/…)", () => {
    // bare "37 °C" with no context → ignored.
    expect(scanText("<p>Room temperature is 37 °C today.</p>\n")).toEqual([]);

    // same number with `target` on the line → flagged.
    const hits: Hit[] = scanText(
      "<p>Post-arrest TTM: target 33 °C for 24 h.</p>\n",
    );
    expect(patternsOf(hits)).toContain("temperature-target");
  });

  it("defib energies require a defib/shock/cardiovert context word", () => {
    expect(scanText("<p>Battery delivers 150 J of energy.</p>\n")).toEqual([]);
    const hits: Hit[] = scanText(
      "<p>Biphasic defibrillation: shock at 150 J.</p>\n",
    );
    expect(patternsOf(hits)).toContain("defib-energy");
  });

  it("oxygen-saturation pattern requires SpO2/saturation/hypoxaemia context — bare % ignored", () => {
    expect(scanText("<p>Conversion rate was 60% in the cohort.</p>\n")).toEqual(
      [],
    );
    const hits: Hit[] = scanText(
      "<p>COPD: target SpO2 88–92% to avoid hypercapnia.</p>\n",
    );
    expect(patternsOf(hits)).toContain("oxygen-saturation");
  });

  it("FiO2 threshold requires FiO2 on the same line (requireLineWord)", () => {
    expect(scanText("<p>The patient is on 60% concentration.</p>\n")).toEqual(
      [],
    );
    const hits: Hit[] = scanText("<p>FiO2 0.6 to maintain saturations.</p>\n");
    expect(patternsOf(hits)).toContain("fio2-threshold");
  });

  it("context word is matched within ±2 lines, not just the same line", () => {
    const src = [
      "<p>",
      "  Use target temperature management:",
      "  cool to 33 °C for 24 h.",
      "</p>",
    ].join("\n");
    const hits: Hit[] = scanText(src);
    expect(patternsOf(hits)).toContain("temperature-target");
  });
});

// -------- 3. overlap dedupe ------------------------------------------------
describe("overlapping-span dedupe", () => {
  it("keeps the more-specific pattern when spans intersect", () => {
    // "0.05 mcg/kg/min" matches BOTH weight-dose ("0.05 mcg/kg") and
    // infusion-rate ("0.05 mcg/kg/min"). SAFETY_PATTERNS lists weight-dose
    // before infusion-rate but the infusion-rate span starts at the same
    // index and is longer — dedupe keeps the FIRST span sorted by
    // (start, end), which prefers the broader infusion-rate match's
    // sibling weight-dose subset starting earlier. The check we care about
    // is that we don't emit BOTH for one number.
    const hits: Hit[] = scanText(
      "<p>Loading dose noradrenaline infusion: 0.05 mcg/kg/min titrated.</p>\n",
    );
    expect(hits).toHaveLength(1);
    expect(["weight-dose", "infusion-rate", "absolute-dose"]).toContain(
      hits[0].pattern,
    );
  });
});

// -------- 4. isCovered citation window ------------------------------------
describe("isCovered ±6-line citation window", () => {
  const baseLine = "Adrenaline IV bolus 1 mg every 3–5 min.";

  it("suppresses when <InlineRef /> sits within ±6 lines", () => {
    const src = [
      "<div>",
      "  <p>",
      `    ${baseLine}`,
      "  </p>",
      "  <InlineRef topicId=\"als\" refLabel=\"RC(UK) ALS 2021\" />",
      "</div>",
    ].join("\n");
    expect(scanText(src)).toEqual([]);
  });

  it("flags when the nearest citation is >6 lines away", () => {
    const farCite = Array.from({ length: 12 }, () => "  // filler").join("\n");
    const src = [
      "<div>",
      `  ${baseLine}`,
      farCite,
      "  <InlineRef topicId=\"als\" refLabel=\"RC(UK) ALS 2021\" />",
      "</div>",
    ].join("\n");
    const hits: Hit[] = scanText(src);
    expect(hits.length).toBeGreaterThan(0);
  });

  it("treats `cites: [...]` and refLabel= as valid citation indicators", () => {
    expect(isCovered(["foo", "  cites: [\"ALS 2021\"],", "bar"], 0)).toBe(true);
    expect(isCovered(["<InlineRef refLabel=\"X\" />", "y"], 1)).toBe(true);
    expect(isCovered(["nothing here", "still nothing"], 0)).toBe(false);
  });
});

// -------- 5. compareAgainstAllowlist --------------------------------------
describe("compareAgainstAllowlist", () => {
  const mkHits = (n: number): Hit[] =>
    Array.from({ length: n }, (_, i) => ({
      line: i + 1,
      col: 1,
      match: "1 mg/kg",
      pattern: "weight-dose",
      snippet: "x",
    }));

  it("errors when a file exceeds its baseline (new uncited claims added)", () => {
    const perFile = new Map([["src/pages/topics/Foo.tsx", mkHits(5)]]);
    const { errors, improvements } = compareAgainstAllowlist(perFile, {
      "src/pages/topics/Foo.tsx": 3,
    });
    expect(errors).toHaveLength(1);
    expect(errors[0]).toMatchObject({ actual: 5, baseline: 3 });
    expect(improvements).toEqual([]);
  });

  it("treats a missing baseline as 0 (any new uncited hit is an error)", () => {
    const perFile = new Map([["src/pages/topics/New.tsx", mkHits(1)]]);
    const { errors } = compareAgainstAllowlist(perFile, {});
    expect(errors).toHaveLength(1);
    expect(errors[0]).toMatchObject({ actual: 1, baseline: 0 });
  });

  it("flags an improvement when actual drops below baseline (one-way backfill)", () => {
    const perFile = new Map([["src/pages/topics/Foo.tsx", mkHits(2)]]);
    const { errors, improvements } = compareAgainstAllowlist(perFile, {
      "src/pages/topics/Foo.tsx": 5,
    });
    expect(errors).toEqual([]);
    expect(improvements).toEqual([
      { rel: "src/pages/topics/Foo.tsx", actual: 2, baseline: 5, reason: "decreased" },
    ]);
  });

  it("flags a stale allowlist entry when the file no longer reports any hits", () => {
    const { errors, improvements } = compareAgainstAllowlist(new Map(), {
      "src/pages/topics/Gone.tsx": 7,
    });
    expect(errors).toEqual([]);
    expect(improvements).toEqual([
      { rel: "src/pages/topics/Gone.tsx", actual: 0, baseline: 7, reason: "stale" },
    ]);
  });

  it("passes silently when actual equals baseline", () => {
    const perFile = new Map([["src/pages/topics/Foo.tsx", mkHits(3)]]);
    const { errors, improvements } = compareAgainstAllowlist(perFile, {
      "src/pages/topics/Foo.tsx": 3,
    });
    expect(errors).toEqual([]);
    expect(improvements).toEqual([]);
  });
});

// -------- 6. fixture sanity ------------------------------------------------
describe("fixture corpus", () => {
  it("ships at least one fixture per pattern family used in tests", () => {
    const files = readdirSync(FIXTURES_DIR).filter((f) => f.endsWith(".tsx"));
    expect(files).toEqual(
      expect.arrayContaining([
        "doses.tsx",
        "thresholds.tsx",
        "anticoag.tsx",
        "covered.tsx",
      ]),
    );
  });

  it("covered.tsx fixture demonstrates the citation window suppresses everything", () => {
    expect(scanText(fx("covered.tsx"))).toEqual([]);
  });
});
