import { mkdirSync, writeFileSync } from "node:fs";
import { anatomyReferences } from "../src/data/anatomyReferences";

// Checks record integrity only. No network, AI verdicts or source generation.
const topics = anatomyReferences.map(topic => {
  const issues: string[] = [];
  if (topic.missingReferences) issues.push("No curated topic references recorded");
  const labels = new Set<string>();
  for (const ref of topic.references) {
    if (!ref.label.trim() || !ref.citation.trim()) issues.push("Incomplete reference record");
    if (labels.has(ref.label)) issues.push(`Duplicate label: ${ref.label}`);
    labels.add(ref.label);
    if (ref.url) {
      try {
        if (!["https:", "http:"].includes(new URL(ref.url).protocol)) issues.push(`Invalid source URL: ${ref.label}`);
      } catch { issues.push(`Invalid source URL: ${ref.label}`); }
    }
  }
  return { topicId: topic.id, title: topic.title, references: topic.references, issues,
    reviewNote: topic.reviewNote,
    diagramsNeedingReview: topic.diagrams.filter(d => d.status === "needs-review").map(d => ({ id: d.id, uncertainty: d.uncertainty })) };
});
mkdirSync("data-build", { recursive: true });
writeFileSync("data-build/anatomy-reference-report.json", JSON.stringify({
  mode: "curated-record-integrity", accuracyCertified: false, topics,
}, null, 2) + "\n");
const failures = topics.filter(t => t.issues.length);
for (const topic of topics) console.log(`${topic.topicId}: ${topic.references.length} curated references; ${topic.diagramsNeedingReview.length} diagrams need review${topic.issues.length ? `; ${topic.issues.join("; ")}` : ""}`);
console.log("No AI used. Record integrity does not establish anatomical accuracy or claim support.");
if (failures.length) process.exitCode = 1;