import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";

describe("Anaesthetic risk generated retention", () => {
  it("retains late prevention teaching and the frequency figure in the private audit", () => {
    const corpus = JSON.parse(readFileSync("data-build/audit-corpus.json", "utf8"));
    const topic = corpus.entries.find((e: { topic_id: string }) => e.topic_id === "anaesthetic-risk");
    expect(topic).toBeDefined();
    expect(topic.text).toContain("Disclosure should not wait for certainty about blame");
    expect(topic.text).toContain("Absolute risk and natural frequencies");
    expect(topic.references.length).toBe(54);
  });
  it("search includes material risk and latest prevention rather than only the introduction", () => {
    const index = JSON.parse(readFileSync("src/data/searchIndex.generated.json", "utf8"));
    const topic = index.topics.find((e: { id: string }) => e.id === "anaesthetic-risk");
    expect(topic).toBeDefined();
    const text = topic.records.map((r: { t: string }) => r.t).join(" ");
    expect(text).toContain("Montgomery");
    expect(text).toContain("Fifth Consensus");
    expect(text).toContain("multicomponent prevention");
  });
});