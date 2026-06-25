import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";

/**
 * Diagram animation contract enforcement.
 *
 * Animated diagram components in `src/components/diagrams/` follow a clear
 * naming convention — `*Animation.tsx` or `Animated*.tsx`. Each one MUST:
 *
 *   1. Provide an accessible fallback for users who can't see motion, either:
 *      (a) an `role="img"` + `aria-label` description on the animated SVG, OR
 *      (b) a motion-preference hook (`useMotionPreference` or a
 *          `prefers-reduced-motion` media-query check) that swaps in a static
 *          state when motion is disabled.
 *      In practice every shipping animation uses (a); some also use (b).
 *
 *   2. Be referenced (imported AND rendered) by at least one topic page in
 *      `src/pages/topics/`. An animation defined but never mounted is a
 *      "missing animation" — the topic that should host it has drifted away
 *      from the diagram contract.
 *
 *   3. Any topic page that imports an animation component MUST also render it
 *      (`<ComponentName …/>`), not just import it. Dead imports indicate a
 *      half-removed animation block.
 *
 * Violations fail CI with a per-file diagnostic.
 */

const DIAGRAMS_DIR = resolve("src/components/diagrams");
const TOPICS_DIR = resolve("src/pages/topics");

const ANIMATION_RE = /(?:^Animated[A-Z]\w*|Animation)\.tsx$/;

function listAnimationComponents(): Array<{ name: string; file: string; src: string }> {
  return readdirSync(DIAGRAMS_DIR)
    .filter((f) => ANIMATION_RE.test(f))
    .map((f) => {
      const file = resolve(DIAGRAMS_DIR, f);
      return {
        name: f.replace(/\.tsx$/, ""),
        file,
        src: readFileSync(file, "utf8"),
      };
    });
}

function listTopicFiles(): Array<{ file: string; src: string }> {
  return readdirSync(TOPICS_DIR)
    .filter((f) => f.endsWith(".tsx"))
    .map((f) => {
      const file = resolve(TOPICS_DIR, f);
      return { file, src: readFileSync(file, "utf8") };
    });
}

function hasAccessibleFallback(src: string): boolean {
  const hasRoleImg = /role\s*=\s*["']img["']/.test(src);
  const hasAriaLabel = /aria-label\s*=/.test(src);
  const usesMotionHook =
    /useMotionPreference\s*\(/.test(src) ||
    /prefers-reduced-motion/i.test(src) ||
    /prefersReducedMotion/.test(src) ||
    /reduceMotion/.test(src) ||
    /reducedMotion/.test(src);
  // (a) SVG description OR (b) motion-preference branch is acceptable.
  return (hasRoleImg && hasAriaLabel) || usesMotionHook;
}

interface UsageRecord {
  importingTopics: string[];
  renderingTopics: string[];
  importOnlyTopics: string[]; // imported but not rendered
}

function indexUsage(
  animations: ReturnType<typeof listAnimationComponents>,
  topics: ReturnType<typeof listTopicFiles>,
): Map<string, UsageRecord> {
  const out = new Map<string, UsageRecord>();
  for (const a of animations) {
    out.set(a.name, { importingTopics: [], renderingTopics: [], importOnlyTopics: [] });
  }
  for (const t of topics) {
    for (const a of animations) {
      const importRe = new RegExp(
        `import\\s+\\{[^}]*\\b${a.name}\\b[^}]*\\}\\s+from\\s+["']@/components/diagrams/${a.name}["']`,
      );
      const defaultImportRe = new RegExp(
        `import\\s+${a.name}\\s+from\\s+["']@/components/diagrams/${a.name}["']`,
      );
      const isImported = importRe.test(t.src) || defaultImportRe.test(t.src);
      if (!isImported) continue;
      const renderRe = new RegExp(`<${a.name}[\\s/>]`);
      const isRendered = renderRe.test(t.src);
      const rec = out.get(a.name)!;
      rec.importingTopics.push(t.file);
      if (isRendered) rec.renderingTopics.push(t.file);
      else rec.importOnlyTopics.push(t.file);
    }
  }
  return out;
}

describe("Animated diagram contract", () => {
  const animations = listAnimationComponents();
  const topics = listTopicFiles();
  const usage = indexUsage(animations, topics);

  it("discovers animated diagram components (guards naming-convention drift)", () => {
    expect(animations.length).toBeGreaterThan(0);
  });

  it("every animated diagram provides an accessible fallback", () => {
    const failures: string[] = [];
    for (const a of animations) {
      if (!hasAccessibleFallback(a.src)) {
        failures.push(
          `  ${a.name}: missing accessible fallback — needs either ` +
            `role="img" + aria-label on the animated SVG, OR a ` +
            `useMotionPreference / prefers-reduced-motion branch.`,
        );
      }
    }
    if (failures.length > 0) {
      throw new Error(
        `Found ${failures.length} animation(s) without an accessible fallback:\n${failures.join("\n")}`,
      );
    }
  });

  it("every animated diagram is referenced by ≥1 topic page (no orphan animations)", () => {
    const orphans: string[] = [];
    for (const [name, rec] of usage.entries()) {
      if (rec.renderingTopics.length === 0) {
        orphans.push(
          `  ${name}: not rendered by any topic in src/pages/topics/ ` +
            `(imported by ${rec.importingTopics.length} file(s), rendered by 0)`,
        );
      }
    }
    if (orphans.length > 0) {
      throw new Error(
        `Found ${orphans.length} orphan animation(s) — topic that should host them is missing:\n${orphans.join("\n")}`,
      );
    }
  });

  it("topic pages that import an animation also render it (no dead imports)", () => {
    const dead: string[] = [];
    for (const [name, rec] of usage.entries()) {
      for (const t of rec.importOnlyTopics) {
        dead.push(`  ${t}: imports ${name} but never renders <${name} …/>`);
      }
    }
    if (dead.length > 0) {
      throw new Error(
        `Found ${dead.length} dead animation import(s):\n${dead.join("\n")}`,
      );
    }
  });
});
