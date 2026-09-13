/**
 * Visual consistency checks for VascularAccessTypesDiagram chest plates.
 *
 * The PICC, non-tunnelled CVC, tunnelled line and Portacath plates are
 * drawn in a shared 300 x 260 viewBox and must keep matching landmark
 * coordinates so that catheter paths, ribs, clavicles and torso
 * silhouettes line up when viewed side-by-side.
 *
 * These checks scan the source file (the diagram is hand-authored SVG)
 * and assert numeric invariants. They are deliberately strict — any
 * future edit that drifts a landmark out of tolerance will fail here
 * before it ships.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const SOURCE = fs.readFileSync(
  path.resolve(__dirname, "../components/diagrams/perioperative/VascularAccessTypesDiagram.tsx"),
  "utf8",
);

// Split the source into per-archetype chunks. Each plate is delimited by
// a `// ─── N. <name>` banner comment.
function chunkFor(label: string): string {
  const re = new RegExp(`// ─── ${label}[\\s\\S]*?(?=// ─── (?:\\d|Wrapper))`);
  const m = SOURCE.match(re);
  if (!m) throw new Error(`Could not locate plate chunk: ${label}`);
  return m[0];
}

const PLATES = {
  PICC: chunkFor("2\\. PICC"),
  CVC: chunkFor("3\\. Non-tunnelled CVC"),
  Tunnelled: chunkFor("4\\. Tunnelled line"),
  Port: chunkFor("5\\. Implanted port"),
};

const CHEST_PLATES = ["PICC", "CVC", "Tunnelled", "Port"] as const;

// All chest plates use the same 300x260 viewBox.
describe("VascularAccessTypesDiagram — shared viewBox", () => {
  for (const name of CHEST_PLATES) {
    it(`${name} plate uses 300x260 viewBox`, () => {
      expect(PLATES[name]).toMatch(/viewBox="0 0 300 260"/);
    });
  }
});

// Clavicles must terminate at the AC joint (≈ x=78 left, x=222 right) and
// meet at the sternal notch at x=150. Tolerances allow PICC's slightly
// narrower clavicles (5 px stroke vs 6 px) but keep the joint within ±10 px
// of the canonical landmark so the shoulder width matches across plates.
describe("VascularAccessTypesDiagram — clavicle landmarks", () => {
  const CLAV_RE =
    /M(\d+),(\d+)\s+C[^"]*?\s+(\d+),(\d+)\s+(\d+),(\d+)"\s*stroke=\{Bone\}/g;

  for (const name of CHEST_PLATES) {
    it(`${name} clavicles meet at sternal notch and end over AC joint`, () => {
      const matches = [...PLATES[name].matchAll(CLAV_RE)];
      expect(matches.length, `${name} should have 2 clavicle paths`).toBe(2);

      const [left, right] = matches;
      const leftStartX = +left[1];
      const leftEndX = +left[5];
      const rightStartX = +right[1];
      const rightEndX = +right[5];

      // Lateral ends ≈ 78 / 222 (AC joint), within ±12 px tolerance.
      expect(leftStartX).toBeGreaterThanOrEqual(70);
      expect(leftStartX).toBeLessThanOrEqual(90);
      expect(rightEndX).toBeGreaterThanOrEqual(210);
      expect(rightEndX).toBeLessThanOrEqual(230);

      // Medial ends meet at sternal notch ≈ x=150, within ±5 px.
      expect(Math.abs(leftEndX - 150)).toBeLessThanOrEqual(5);
      expect(Math.abs(rightStartX - 150)).toBeLessThanOrEqual(5);

      // Continuity: left.end == right.start.
      expect(leftEndX).toBe(rightStartX);
      expect(+left[6]).toBe(+right[2]);
    });
  }
});

// Subclavian / SVC anchor at (200,72) → (190,140) on every chest plate
// that draws a venous tree (CVC plate uses IJV instead so is excluded).
describe("VascularAccessTypesDiagram — venous tree anchor points", () => {
  const VENOUS_PLATES = ["Tunnelled", "Port"] as const;
  for (const name of VENOUS_PLATES) {
    it(`${name} subclavian → SVC catheter ends at (190,140)`, () => {
      // SVC tip is the cavoatrial junction landmark for all CVADs.
      expect(PLATES[name]).toMatch(/circle cx="190" cy="140"/);
      // Subclavian junction landmark.
      expect(PLATES[name]).toContain("200,72");
    });
  }
});

// Ribs must use exactly 18 px intercostal spacing and share the same
// lateral span (M100 → 200) so the thoracic cage scale is uniform.
describe("VascularAccessTypesDiagram — rib cage spacing", () => {
  // Tunnelled plate omits ribs because the chest is shown as a subcutaneous
  // cut-away window — that is a deliberate exception, not a drift.
  const RIB_PLATES = ["PICC", "CVC", "Port"] as const;
  for (const name of RIB_PLATES) {
    it(`${name} ribs use 18 px spacing and span 100→200`, () => {
      const m = PLATES[name].match(/\[(\d+(?:,\s*\d+)+)\]\.map\(\(y/);
      expect(m, `${name} should declare a rib y-coordinate array`).toBeTruthy();
      const ys = m![1].split(",").map((s) => +s.trim());
      expect(ys.length).toBe(4);
      const gaps = ys.slice(1).map((y, i) => y - ys[i]);
      for (const g of gaps) expect(g).toBe(18);

      // Shared lateral span: M100,${y} Q150,${y + 8} 200,${y}
      expect(PLATES[name]).toMatch(
        /M100,\$\{y\} Q150,\$\{y \+ 8\} 200,\$\{y\}/,
      );
    });
  }
});

// Heart silhouette anchor — all four chest plates render a heart so the
// catheter tip relates to a recognisable mediastinal landmark. We just
// assert the heart radial gradient is referenced once per plate.
describe("VascularAccessTypesDiagram — heart silhouette present", () => {
  for (const name of CHEST_PLATES) {
    it(`${name} renders a heart silhouette`, () => {
      expect(PLATES[name]).toMatch(/url\(#heartGrad\)/);
    });
  }
});

// Torso silhouette must use the shared skinGrad fill and SkinEdge stroke
// so all plates share the same skin tone and outline weight.
describe("VascularAccessTypesDiagram — torso skin styling", () => {
  for (const name of CHEST_PLATES) {
    it(`${name} torso uses url(#skinGrad) fill`, () => {
      expect(PLATES[name]).toMatch(/fill="url\(#skinGrad\)"/);
    });
  }
});
