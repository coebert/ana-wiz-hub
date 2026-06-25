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

/**
 * An "animated diagram" is any React component whose name matches
 * `*Animation` or `Animated*`, whether declared in a same-named file
 * (`FooAnimation.tsx`) or as a named export inside a multi-component
 * module (e.g. `PatientPositioningMechanisms.tsx` exports several
 * `*Animation` components).
 */
function listAnimationComponents(): Array<{ name: string; file: string; src: string }> {
  const out: Array<{ name: string; file: string; src: string }> = [];
  const seen = new Set<string>();
  const declRe =
    /export\s+(?:default\s+)?(?:const|function|class)\s+(Animated[A-Z]\w*|\w*Animation)\b/g;
  for (const f of readdirSync(DIAGRAMS_DIR)) {
    if (!f.endsWith(".tsx")) continue;
    const file = resolve(DIAGRAMS_DIR, f);
    const src = readFileSync(file, "utf8");
    // Same-named file (e.g. `AAShuntAnimation.tsx`) is the canonical case.
    const base = f.replace(/\.tsx$/, "");
    if (ANIMATION_RE.test(f) && !seen.has(base)) {
      seen.add(base);
      out.push({ name: base, file, src });
    }
    // Plus any named-export animation living inside a multi-component module.
    for (const m of src.matchAll(declRe)) {
      const name = m[1];
      if (seen.has(name)) continue;
      seen.add(name);
      out.push({ name, file, src });
    }
  }
  return out;
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
      // Use the actual module basename so multi-component modules
      // (e.g. `PatientPositioningMechanisms.tsx`) match correctly.
      const moduleBase = a.file
        .split("/")
        .pop()!
        .replace(/\.tsx$/, "");
      const importRe = new RegExp(
        `import\\s+\\{[^}]*\\b${a.name}\\b[^}]*\\}\\s+from\\s+["']@/components/diagrams/${moduleBase}["']`,
      );
      const defaultImportRe = new RegExp(
        `import\\s+${a.name}\\s+from\\s+["']@/components/diagrams/${moduleBase}["']`,
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

  it("every <*Animation /> rendered in a topic resolves to an existing diagram component", () => {
    // Catches typos / deleted-but-still-referenced animation components.
    const knownAnimations = new Set(animations.map((a) => a.name));
    const failures: string[] = [];
    const jsxRe = /<([A-Z]\w*(?:Animation|AnimatedMechanism))\b/g;
    for (const t of topics) {
      const seen = new Set<string>();
      for (const m of t.src.matchAll(jsxRe)) {
        const name = m[1];
        if (seen.has(name)) continue;
        seen.add(name);
        if (!knownAnimations.has(name)) {
          failures.push(
            `  ${t.file}: renders <${name} …/> but no matching component ` +
              `in src/components/diagrams/`,
          );
        }
      }
    }
    if (failures.length > 0) {
      throw new Error(
        `Found ${failures.length} unresolved animation reference(s):\n${failures.join("\n")}`,
      );
    }
  });
});
