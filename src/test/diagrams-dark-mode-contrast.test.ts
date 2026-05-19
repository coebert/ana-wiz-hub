/**
 * Dark-mode contrast guard for diagrams.
 *
 * Static-analysis test that scans every file under src/components/diagrams
 * for patterns that produce unreadable text in dark mode:
 *
 *   1. SVG <text> / <tspan> with an explicit dark fill (#000, #111, "black",
 *      dark rgb()/hsl()). On a dark surface these collapse into the
 *      background.
 *   2. Tailwind utilities that lock text to a near-black tone
 *      (text-black, text-gray-700+, text-slate-700+, text-zinc-700+,
 *      text-neutral-700+, text-stone-700+) without a `dark:` override.
 *   3. Canvas drawText calls preceded by ctx.fillStyle = "<dark>".
 *
 * Diagrams whose dark background is INTENTIONAL (ultrasound monitor mimics,
 * gas-cylinder colour coding, CT/X-ray displays) are allowlisted below —
 * their light text is correct on a black SVG <rect>, regardless of theme.
 *
 * Run via `bun run test` / `npm test`. CI / pre-deploy will fail on any
 * new offender, forcing either a fix or an explicit allowlist entry.
 */

import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIAGRAM_DIR = join(process.cwd(), "src/components/diagrams");

/** Files whose dark text on a hard-coded dark <rect>/canvas background is
 *  intentional (ultrasound, ECG, CT, gas-cylinder colour code). */
const INTENTIONAL_DARK_SURFACE = new Set<string>([
  "MModeDiagram.tsx",
  "MModePathologyDiagram.tsx",
  "EchoDiagram.tsx",
  "SinogramFBPWalkthrough.tsx",
  "AnaestheticMachineDiagram.tsx", // ISO cylinder colour code
  "CardiacAnatomyDiagram.tsx",     // three.js scene
  "TwelveLeadEcgDiagram.tsx",      // ECG paper background
  "StemiLocalisationDiagram.tsx",
]);

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else if (/\.(t|j)sx?$/.test(name)) out.push(p);
  }
  return out;
}

interface Finding {
  file: string;
  line: number;
  rule: string;
  snippet: string;
}

/* ---------- Pattern detectors ---------- */

// Dark fills that would be invisible on a dark page surface. We only want
// matches that sit INSIDE a <text>/<tspan> open tag, so the regex anchors
// on the element name and walks its attributes.
const DARK_TEXT_TAG = new RegExp(
  String.raw`<(?:text|tspan)\b[^>]*\bfill\s*=\s*"(?:` +
    String.raw`#0{3}|#0{6}|#1[0-9a-f]{2}|#2[0-9a-f]{2}|black|` +
    String.raw`rgb\(\s*[0-3]?\d\s*,\s*[0-3]?\d\s*,\s*[0-3]?\d\s*\)|` +
    String.raw`hsl\([^)]*?\b(?:[0-9]|1[0-9])%\s*\))"`,
  "i",
);

// Tailwind utilities locking text near-black, with no dark: override on the same className.
const DARK_TEXT_UTILITY = /\btext-(?:black|gray|slate|zinc|neutral|stone)-(?:7|8|9)00\b|\btext-black\b/;
const HAS_DARK_OVERRIDE = /\bdark:text-/;

// Canvas: ctx.fillStyle = "#000" / "black" used as fill for text.
const CANVAS_DARK_FILL = /fillStyle\s*=\s*['"](?:#0{3}|#0{6}|#1[0-9a-f]{2}|#2[0-9a-f]{2}|black|rgb\(\s*[0-3]?\d\s*,\s*[0-3]?\d\s*,\s*[0-3]?\d\s*\))['"]/i;

describe("Diagrams: dark-mode contrast guard", () => {
  const files = walk(DIAGRAM_DIR);

  it("does not introduce low-contrast text patterns", () => {
    const findings: Finding[] = [];

    for (const fullPath of files) {
      const file = fullPath.replace(process.cwd() + "/", "");
      const basename = file.split("/").pop()!;
      if (INTENTIONAL_DARK_SURFACE.has(basename)) continue;

      const src = readFileSync(fullPath, "utf8");
      const lines = src.split("\n");

      // Pre-compute whether this file uses a canvas (only then is fillStyle relevant for text).
      const usesCanvasText = /\bgetContext\(['"]2d['"]\)/.test(src) && /\bfillText\(/.test(src);

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const lineNo = i + 1;

        if (DARK_SVG_FILL.test(line) && /<text|<tspan/i.test(src.slice(Math.max(0, src.indexOf(line) - 200), src.indexOf(line) + line.length + 20))) {
          findings.push({ file, line: lineNo, rule: "dark-svg-text-fill", snippet: line.trim().slice(0, 160) });
        }

        if (DARK_TEXT_UTILITY.test(line) && !HAS_DARK_OVERRIDE.test(line)) {
          findings.push({ file, line: lineNo, rule: "dark-tailwind-text", snippet: line.trim().slice(0, 160) });
        }

        if (usesCanvasText && CANVAS_DARK_FILL.test(line)) {
          // Require a nearby fillText (within 6 lines) to count as text — keeps shape fills out of this.
          const window = lines.slice(i, Math.min(i + 7, lines.length)).join("\n");
          if (/\bfillText\(/.test(window)) {
            findings.push({ file, line: lineNo, rule: "dark-canvas-text-fill", snippet: line.trim().slice(0, 160) });
          }
        }
      }
    }

    if (findings.length > 0) {
      const grouped = findings
        .map((f) => `  ✗ [${f.rule}] ${f.file}:${f.line}\n      ${f.snippet}`)
        .join("\n");
      throw new Error(
        `Found ${findings.length} dark-mode contrast risk(s) in diagrams:\n\n${grouped}\n\n` +
          `Fix by:\n` +
          `  • SVG: use fill="currentColor" or fill="hsl(var(--foreground))" instead of dark literals.\n` +
          `  • Tailwind: use text-foreground / text-muted-foreground (or add a dark: variant).\n` +
          `  • Canvas: read the foreground colour at draw time, e.g.\n` +
          `      const fg = getComputedStyle(document.documentElement).getPropertyValue('--foreground');\n` +
          `      ctx.fillStyle = \`hsl(\${fg})\`;\n` +
          `  • If the dark surface is intentional (ultrasound, ECG, CT), add the basename to\n` +
          `    INTENTIONAL_DARK_SURFACE in src/test/diagrams-dark-mode-contrast.test.ts.\n`,
      );
    }

    expect(findings).toHaveLength(0);
  });

  it("catches the patterns it claims to catch (self-test)", () => {
    expect(DARK_SVG_FILL.test('<text fill="#000">x</text>')).toBe(true);
    expect(DARK_SVG_FILL.test('<text fill="black">x</text>')).toBe(true);
    expect(DARK_SVG_FILL.test('<text fill="currentColor">x</text>')).toBe(false);
    expect(DARK_SVG_FILL.test('<text fill="hsl(var(--foreground))">x</text>')).toBe(false);

    expect(DARK_TEXT_UTILITY.test('className="text-gray-800"')).toBe(true);
    expect(DARK_TEXT_UTILITY.test('className="text-black"')).toBe(true);
    expect(DARK_TEXT_UTILITY.test('className="text-foreground"')).toBe(false);
    expect(HAS_DARK_OVERRIDE.test('className="text-gray-800 dark:text-gray-100"')).toBe(true);

    expect(CANVAS_DARK_FILL.test('ctx.fillStyle = "#000";')).toBe(true);
    expect(CANVAS_DARK_FILL.test('ctx.fillStyle = "black";')).toBe(true);
    expect(CANVAS_DARK_FILL.test('ctx.fillStyle = "#fff";')).toBe(false);
  });
});
