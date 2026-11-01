import { describe, expect, it } from "vitest";
import TransfusionCoagulationTopic from "@/pages/topics/TransfusionCoagulationTopic";
import { referenceLabels } from "../../scripts/lib/reference-labels";
import { readFileSync } from "node:fs";

const storage = () => TransfusionCoagulationTopic().props.keyPoints.find((p: {text: string}) => p.text.startsWith("Standard leucocyte-depleted FFP"));
describe("CL89 component-specific storage", () => {
  it("states the frozen maximum and not the old two-year blanket expiry", () => {
    expect(storage().text).toContain("maximum 36 months frozen at −25°C or colder");
    expect(storage().text).not.toContain("2 years");
  });
  it("requires the explicit non-major-haemorrhage 24-hour FFP limit alongside temperature-specific maxima", () => {
    expect(storage().text).toContain("4 hours at 22 ±2°C");
    expect(storage().text).toContain("up to 120 hours at 4 ±2°C for unexpected major haemorrhage under validated procedures");
    expect(storage().text).toContain("For indications other than unexpected major haemorrhage, use within 24 hours of thawing");
    expect(storage().text).toContain("labile factors decline");
  });
  it("keeps ordinary cryo immediate/4-hour use distinct from the provisional refrigerated component", () => {
    expect(storage().text).toContain("Ordinary cryoprecipitate: use immediately/as soon as possible, or within 4 hours at ambient temperature");
    expect(storage().text).toContain("Only the separately labelled provisional extended-shelf-life pooled cryoprecipitate");
    expect(storage().text).toContain("do not refreeze");
  });
  it("all four actual keypoint citations resolve; local search retains the explicit FFP indication restriction", () => {
    const labels = referenceLabels().get("transfusion-coagulation");
    expect(storage().cites).toHaveLength(4);
    for (const label of storage().cites) expect(labels?.has(label)).toBe(true);
    const search = JSON.parse(readFileSync("src/data/searchIndex.generated.json", "utf8"));
    const topic = search.topics.find((t: {id: string}) => t.id === "transfusion-coagulation");
    expect(JSON.stringify(topic)).toContain("For indications other than unexpected major haemorrhage, use within 24 hours of thawing");
  });
});