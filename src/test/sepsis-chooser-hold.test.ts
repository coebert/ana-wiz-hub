import { describe, expect, it } from "vitest";
import {
  SOURCES,
  buildRecommendation,
  type Allergy,
  type ChooserInput,
  type Renal,
  type Severity,
  type SourceKey,
} from "@/components/diagrams/pharmacology/sepsisChooserModel";

/**
 * AC-16 evidence hold: the sepsis chooser must generate no dose, regimen or
 * alternative for any selection it could not trace to a supporting
 * recommendation, and must still show the exact source for a verified one.
 */

const HELD_SOURCES: SourceKey[] = ["ia", "uro", "meningitis", "ssti"];
const ALL_SOURCES: SourceKey[] = SOURCES.map((s) => s.key);
const severity: Severity[] = ["mild", "severe"];
const allergy: Allergy[] = ["none", "non-severe", "anaphylaxis"];
const renal: Renal[] = ["normal", "impaired"];
const flags = [false, true];

const combinations: ChooserInput[] = [];
for (const s of severity) {
  for (const a of allergy) {
    for (const r of renal) {
      for (const mrsa of flags) {
        for (const recentAbx of flags) {
          combinations.push({ severity: s, allergy: a, renal: r, mrsa, recentAbx });
        }
      }
    }
  }
}

const text = (value: unknown) => JSON.stringify(value);
const hasDose = (value: unknown) => /\d\s?(mg|g\b|microgram|units?)/.test(text(value));

describe("sepsis chooser evidence holds", () => {
  it.each(HELD_SOURCES)("holds %s for every factor combination with no dose", (key) => {
    for (const input of combinations) {
      const outcome = buildRecommendation(key, input);
      expect(outcome.held, `${key} ${text(input)}`).toBe(true);
      expect("firstLine" in outcome).toBe(false);
      expect(hasDose(outcome), `${key} ${text(input)}`).toBe(false);
      if (outcome.held) {
        expect(outcome.reason).toMatch(/no dose, regimen or alternative|No regimen is generated/);
        expect(outcome.consult.join(" ")).toContain("local antimicrobial policy");
      }
    }
  });

  it.each(ALL_SOURCES)("holds %s at CrCl < 30 ml/min with no renal dose", (key) => {
    for (const input of combinations.filter((c) => c.renal === "impaired")) {
      const outcome = buildRecommendation(key, input);
      expect(outcome.held, `${key} ${text(input)}`).toBe(true);
      expect(hasDose(outcome), `${key} ${text(input)}`).toBe(false);
      if (outcome.held && ["cap", "hap", "neutropenic"].includes(key)) {
        expect(outcome.reason).toContain("No renal dose adjustment is generated");
      }
    }
  });

  it("holds the hospital-acquired-pneumonia MRSA path with no regimen", () => {
    for (const s of severity) {
      const outcome = buildRecommendation("hap", {
        severity: s,
        allergy: "none",
        renal: "normal",
        mrsa: true,
        recentAbx: false,
      });
      expect(outcome.held).toBe(true);
      expect(hasDose(outcome)).toBe(false);
      if (outcome.held) {
        expect(outcome.reason).toContain("includes additional treatment for suspected or confirmed MRSA infection");
        expect(outcome.reason).not.toContain("no MRSA-specific cover");
      }
    }
  });

  it("holds the neutropenic-sepsis penicillin-allergy path with no substitute regimen", () => {
    for (const a of ["non-severe", "anaphylaxis"] as Allergy[]) {
      const outcome = buildRecommendation("neutropenic", {
        severity: "severe",
        allergy: a,
        renal: "normal",
        mrsa: false,
        recentAbx: false,
      });
      expect(outcome.held).toBe(true);
      expect(hasDose(outcome)).toBe(false);
    }
  });

  it("keeps verified adult examples active with their exact supporting recommendation", () => {
    const capSevere = buildRecommendation("cap", {
      severity: "severe",
      allergy: "none",
      renal: "normal",
      mrsa: false,
      recentAbx: false,
    });
    expect(capSevere.held).toBe(false);
    if (capSevere.held === false) {
      expect(capSevere.firstLine).toContain("Co-amoxiclav 1.2 g IV three times a day");
      expect(capSevere.firstLine).toContain("clarithromycin 500 mg IV twice a day");
      expect(capSevere.citation.label).toContain("table 1");
      expect(capSevere.citation.href).toContain("nice.org.uk/guidance/ng250");
      expect(capSevere.citation.recommendation).toContain("1.2 g three times a day intravenously");
    }

    const capAllergy = buildRecommendation("cap", {
      severity: "mild",
      allergy: "anaphylaxis",
      renal: "normal",
      mrsa: false,
      recentAbx: false,
    });
    expect(capAllergy.held).toBe(false);
    if (capAllergy.held === false) {
      expect(capAllergy.firstLine).toContain("Doxycycline 200 mg PO on day 1");
      expect(capAllergy.citation.label).toContain(
        "alternative oral antibiotics for penicillin allergy"
      );
    }

    const hapSevere = buildRecommendation("hap", {
      severity: "severe",
      allergy: "none",
      renal: "normal",
      mrsa: false,
      recentAbx: false,
    });
    expect(hapSevere.held).toBe(false);
    if (hapSevere.held === false) {
      expect(hapSevere.firstLine).toContain("Piperacillin/tazobactam 4.5 g IV three times a day");
      expect(hapSevere.citation.label).toContain("table 3");
      expect(hapSevere.citation.href).toContain("nice.org.uk/guidance/ng250");
    }

    const neutropenic = buildRecommendation("neutropenic", {
      severity: "severe",
      allergy: "none",
      renal: "normal",
      mrsa: false,
      recentAbx: false,
    });
    expect(neutropenic.held).toBe(false);
    if (neutropenic.held === false) {
      expect(neutropenic.firstLine).toContain("Piperacillin/tazobactam");
      expect(neutropenic.citation.label).toContain("CG151");
      expect(neutropenic.citation.href).toContain("nice.org.uk/guidance/cg151");
    }
  });

  it("never attributes an unverified dose to the BNF", () => {
    for (const key of ALL_SOURCES) {
      for (const input of combinations) {
        expect(text(buildRecommendation(key, input))).not.toContain("BNF-derived");
      }
    }
  });
});
