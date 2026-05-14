/**
 * Validates that every `svgNodeProps("…")` label across the registered
 * flowchart diagrams follows the standardized
 *   `<Kind> [N/M][ —|:] body`
 * wording, and uses consistent units.
 *
 * Static analysis: we read each diagram source file from the
 * flowchart a11y registry and regex-extract the literal label strings
 * passed to svgNodeProps(...). Template literals are normalised
 * (`${…}` → `$X`) so format/unit checks still apply to the static
 * scaffold around the interpolation.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { FLOWCHART_AUDIT_REGISTRY } from "@/lib/flowchart-a11y-registry";

const ALLOWED_KINDS = [
  "Step",
  "Decision",
  "Branch",
  "Outcome",
  "Pathway",
  "Tier",
  "Phase",
  "Modality",
] as const;

// `<Kind>` then either:
//   - " N/M" (with optional " — body" or ": body")
//   - ": body" or " — body" or " yes:"/" no:" (Branch shorthand)
const KIND_RE = new RegExp(
  `^(?:${ALLOWED_KINDS.join("|")})(?:\\s+\\$?\\w+\\/\\$?\\w+)?(?:\\s+(?:yes|no))?\\s*(?:[—:])\\s+\\S`,
);

// Disallowed unit variants → preferred form
const UNIT_LINTS: Array<[RegExp, string]> = [
  [/cmH₂O/, "use cmH2O (ASCII)"],
  [/mmH₂O/, "use mmH2O (ASCII)"],
  [/PaCO₂/, "use PaCO2 (ASCII)"],
  [/PaO₂/, "use PaO2 (ASCII)"],
  [/\bml\/kg\b/, "use mL/kg (capital L)"],
  [/\bmcg\b/, "use μg"],
  [/\bug\b/, "use μg"],
  [/\bhrs?\b/, "use h"],
  [/\bhour(s)?\b/i, "use h"],
  [/\bminutes?\b/i, "use min"],
];

function extractLabels(source: string): string[] {
  const out: string[] = [];
  // Match svgNodeProps("…") and svgNodeProps(`…`) at top level only
  // (no nested calls); good enough for our diagrams.
  const re = /svgNodeProps\(\s*([`"])((?:\\.|(?!\1).)*)\1\s*\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(source)) !== null) {
    // Normalise template-literal interpolations to a placeholder so
    // the static format checks still apply.
    const raw = m[2].replace(/\$\{[^}]+\}/g, "X");
    out.push(raw);
  }
  return out;
}

function sourcePathFor(componentImport: string): string {
  const rel = componentImport.replace(/^@\//, "src/");
  const candidates = [`${rel}.tsx`, `${rel}.ts`];
  for (const c of candidates) {
    const abs = resolve(process.cwd(), c);
    if (existsSync(abs)) return abs;
  }
  throw new Error(`Cannot resolve source for ${componentImport}`);
}

// Parse the registry source to recover the import() spec for each entry,
// keyed by the registry id literal.
const REGISTRY_SRC = readFileSync(
  resolve(process.cwd(), "src/lib/flowchart-a11y-registry.ts"),
  "utf8",
);
function importSpecFor(entry: (typeof FLOWCHART_AUDIT_REGISTRY)[number]): string {
  const idIdx = REGISTRY_SRC.indexOf(`id: "${entry.id}"`);
  if (idIdx === -1) throw new Error(`id "${entry.id}" not found in registry source`);
  const after = REGISTRY_SRC.slice(idIdx);
  const m = after.match(/import\(\s*["'`]([^"'`]+)["'`]\s*\)/);
  if (!m) throw new Error(`Cannot find import() for ${entry.id}`);
  return m[1];
}

describe("svgNodeProps label format & unit consistency", () => {
  for (const entry of FLOWCHART_AUDIT_REGISTRY) {
    describe(entry.name, () => {
      const spec = importSpecFor(entry);
      const file = sourcePathFor(spec);
      const src = readFileSync(file, "utf8");
      const labels = extractLabels(src);

      it("exposes at least one labelled group", () => {
        expect(labels.length).toBeGreaterThan(0);
      });

      it("exposes >= expectedGroups labels (registry contract)", () => {
        expect(labels.length).toBeGreaterThanOrEqual(entry.expectedGroups);
      });

      it.each(labels.map((l, i) => [i, l]))(
        "label #%i matches `<Kind> [N/M] —|: body`: %s",
        (_i, label) => {
          expect(label, `label: "${label}"`).toMatch(KIND_RE);
        },
      );

      it.each(labels.map((l, i) => [i, l]))(
        "label #%i uses consistent units: %s",
        (_i, label) => {
          for (const [bad, hint] of UNIT_LINTS) {
            expect(
              bad.test(label),
              `"${label}" — ${hint}`,
            ).toBe(false);
          }
        },
      );
    });
  }
});
