import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { operations } from "./operativeSteps";

describe("generated Operations Library coverage", () => {
  it("indexes every procedure heading with its own opening anchor", () => {
    const index = JSON.parse(readFileSync("src/data/searchIndex.generated.json", "utf8"));
    const topic = index.topics.find((entry: { id: string }) => entry.id === "operative-steps");
    expect(topic).toBeDefined();
    for (const op of operations) {
      expect(topic.records.some((record: { a: string; k: string; t: string }) =>
        record.a === op.id && record.k === "heading" && record.t.includes(op.name)), op.id).toBe(true);
    }
  });

  it("retains every operation and its final anaesthetic note in the audit corpus", () => {
    const corpus = JSON.parse(readFileSync("data-build/audit-corpus.json", "utf8"));
    const topic = corpus.entries.find((entry: { topic_id: string }) => entry.topic_id === "operative-steps");
    expect(topic).toBeDefined();
    for (const op of operations) {
      expect(topic.text, op.id).toContain(`## ${op.name} (${op.specialty})`);
      const lastNote = op.anaestheticNotes.at(-1);
      if (lastNote) expect(topic.text, op.id).toContain(lastNote);
    }
  });
});