import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { calculateEGFR, computeEgfr, stageFor } from "@/components/diagrams/physiology/EGFRCalculator";

const read = (p: string) => readFileSync(p, "utf8");

describe("SCI036/038 eGFR", () => {
  it.each(["", " ", "0", "-5", "NaN", "Infinity", "80abc", "1e400", "abc"])("rejects creatinine %j", (c) => {
    expect(computeEgfr(c, "60", "male").ok).toBe(false);
  });
  it.each(["17", "17.9", "-1", "", "60y", "121"])("rejects age %j", (a) => {
    expect(computeEgfr("80", a, "male").ok).toBe(false);
  });
  it("rejects nonfinite/zero output (overflow)", () => {
    expect(computeEgfr("1e300", "60", "female").ok).toBe(false);
  });
  it("accepts finite adult values and matches CKD-EPI 2021", () => {
    const r = computeEgfr("80", "60", "male");
    expect(r.ok && r.egfr).toBeCloseTo(calculateEGFR(80, 60, "male"), 10);
    expect(computeEgfr("80", "18", "female").ok).toBe(true);
  });
  it("sex-specific kappa boundary (Scr = κ: both terms equal 1)", () => {
    expect(calculateEGFR(0.7 * 88.4, 0, "female")).toBeCloseTo(142 * 1.012, 8);
    expect(calculateEGFR(0.9 * 88.4, 0, "male")).toBeCloseTo(142, 8);
  });
  it("raw category cut-offs", () => {
    const pairs: Array<[number, string]> = [[14.99, "G5"], [15, "G4"], [29.99, "G4"], [30, "G3b"], [44.99, "G3b"], [45, "G3a"], [59.99, "G3a"], [60, "G2"], [89.99, "G2"], [90, "G1"]];
    for (const [v, g] of pairs) expect(stageFor(v).stage).toBe(g);
  });
  it("no automatic management directives in any category", () => {
    for (const v of [100, 70, 50, 35, 20, 10]) {
      const s = stageFor(v);
      const t = s.description + s.considerations;
      expect(t).not.toMatch(/PTH|130\/80|Avoid gadolinium|Avoid contrast|Dose-adjust .*DOAC|day after|cisatracurium|Stop metformin|usually requires RRT/i);
      expect(t).toMatch(/not CKD|only if sustained|A category, not a decision/);
    }
  });
});

describe("SCI039/033 worked examples", () => {
  it("shunt fraction 47.898523%", () => {
    const c = (hb: number, s: number, po2kPa: number) => 1.34 * hb * s + 0.0225 * po2kPa;
    const cc = c(10, 1, 90), ca = c(10, 0.9, 9), cv = c(10, 0.65, 5);
    expect([cc, ca, cv].map((x) => +x.toFixed(4))).toEqual([15.425, 12.2625, 8.8225]);
    expect(((cc - ca) / (cc - cv)) * 100).toBeCloseTo(47.898523, 5);
  });
  it("Enghoff 0.545454545 and 272.727273 mL", () => {
    const f = (5.5 - 2.5) / 5.5;
    expect(f).toBeCloseTo(0.545454545, 8);
    expect(f * 500).toBeCloseTo(272.727273, 5);
  });
  it("V/Q text: no EtCO₂ proxy, CTPA conclusion or >30% futility", () => {
    const t = read("src/pages/topics/VentilationPerfusionTopic.tsx");
    expect(t).not.toMatch(/EtCO₂ as a proxy|urgent CTPA|futile|refractory hypoxaemia|0\.023 × 90 \/ 7\.5/);
    expect(t).toContain("15.425");
    expect(t).toContain("0.47898523");
    expect(t).toContain("272.727");
  });
  it("V/Q FAQ, body and exam pearl: no categorical oxygen/shunt claims", () => {
    const t = read("src/pages/topics/VentilationPerfusionTopic.tsx");
    expect(t).not.toMatch(/does NOT correct shunt|Does NOT respond to supplemental|fails to correct with 100|single most tested point|PEEP\/recruitment for shunt vs bronchodilators/);
    expect(t.match(/generally respond better to supplemental o(xygen|₂|2|\S*)/gi)?.length ?? 0).toBeGreaterThanOrEqual(2);
  });
});

describe("SCI025/021/040/026 text", () => {
  it("charge units", () => {
    expect(read("src/components/topic/AtomicStructureTeaching.tsx")).toContain("1 mmol of Ca²⁺ carries 2 mEq of charge (0.002 Eq); 1 mol carries 2 Eq");
  });
  it("neck anatomy", () => {
    const t = read("src/pages/topics/HeadNeckAnatomyTopic.tsx");
    expect(t).not.toMatch(/[Aa]vascular midline|roughly at the level of the cricoid|Intermediate\/deep block|largely superseded|cricothyroidotomy \(below\)/);
    expect(t).toMatch(/<strong>Intermediate block:<\/strong> deep to the investing fascia but superficial to the prevertebral fascia/);
  });
  it("lung ultrasound", () => {
    const t = read("src/pages/topics/UltrasoundPhysicsTopic.tsx");
    expect(t).not.toMatch(/≥3 B-lines per rib space is pathological|A-lines \(reverberation\) = normal aerated lung|absent lung sliding → pneumothorax/);
    expect(t).toMatch(/not across the whole hemithorax/);
    expect(t).not.toMatch(/B-lines = interstitial|they indicate <strong>interstitial/);
    expect((t.match(/occasional B-lines occur in healthy lungs/g) ?? []).length).toBe(2);
  });
});
