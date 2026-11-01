import { describe, it, expect } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { parseTopic, labelIssues } from "../../scripts/lib/topic-citations";
import { diagramIssues } from "../../scripts/lib/diagram-provenance";
import { extractTopic } from "../__tests__/citation-coverage-extractor";

describe("fail-closed CLI citation diagnostics", () => {
  it.each(["check-cites-labels.mjs", "check-section-sources.mjs"])("%s rejects unresolved legacy and malformed otherwise-valid source", script => {
    const dir = mkdtempSync(join(tmpdir(), "negative-citation-cli-"));
    try {
      mkdirSync(join(dir, "src/pages/topics"), { recursive: true });
      writeFileSync(join(dir, "src/pages/topics/Legacy.tsx"), "<Legacy keyPoints={[{cites:getRefs()}]} />");
      const malformed = 'const broken = ; <TopicTemplate topicId="neuromuscular" keyPoints={[{cites:["Bridion SmPC"]}]} sectionSources={{diagrams:["Bridion SmPC"]}} />';
      const path = join(dir, "src/pages/topics/Broken.tsx");
      writeFileSync(path, malformed);
      const result = spawnSync("node", [resolve("scripts", script)], { cwd: dir, encoding: "utf8" });
      expect(result.status).toBe(1);
      expect(result.stderr).toContain("Legacy.tsx: unresolved cites: getRefs()");
      expect(result.stderr).toMatch(/Broken\.tsx: syntax 1:\d+: Expression expected/);
      expect(result.stdout).not.toContain("No cites-label mismatches");
      const parsed = parseTopic(malformed);
      for (const kind of ["cites", "sections"] as const) expect(labelIssues(parsed, new Map([["neuromuscular", new Set(["Bridion SmPC"])]]), kind).some(issue => issue.startsWith("syntax "))).toBe(true);
      expect(extractTopic(path).warnings.some(issue => issue.startsWith("syntax "))).toBe(true);
      const cwd = process.cwd();
      try { process.chdir(dir); expect(diagramIssues().some(issue => issue.file.endsWith("Broken.tsx") && issue.kind === "parser-error")).toBe(true); }
      finally { process.chdir(cwd); }
      rmSync(join(dir, "src/pages/topics/Legacy.tsx"));
      rmSync(path);
      writeFileSync(join(dir, "src/pages/topics/Wrapper.tsx"), "const unrelated = 'neuromuscular'; <main />");
      const clean = spawnSync("node", [resolve(cwd, "scripts", script)], { cwd: dir, encoding: "utf8" });
      expect(clean.status).toBe(0); expect(clean.stdout).toContain("across 0 topic pages");
    } finally { rmSync(dir, { recursive: true, force: true }); }
  }, 30000);
});