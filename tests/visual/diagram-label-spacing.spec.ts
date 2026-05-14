import { test, expect, type Page } from "@playwright/test";

/**
 * Diagram label legibility + collision regression tests.
 *
 * Every interactive anatomy / physiology diagram in the curriculum renders
 * its callouts as <text> elements inside an <svg role="img">. As diagrams
 * scale down with the viewport, two things historically broke:
 *
 *   1. Labels became too small to read (sub-pixel font sizes after viewBox
 *      scaling at 360–390px wide screens).
 *   2. Sibling callouts started overlapping each other once the SVG was
 *      compressed below ~340px effective width.
 *
 * This spec walks a representative set of diagram-heavy topic routes at the
 * SMALLEST officially supported viewport (360 × 800 — Galaxy / older Android)
 * and at 390 × 844 (iPhone 12-15) and asserts:
 *
 *   • Every visible <text> inside `svg[role="img"]` has a rendered font
 *     size ≥ MIN_FONT_PX and a rendered height ≥ MIN_TEXT_HEIGHT_PX.
 *   • No two non-ancestor <text> nodes inside the same SVG overlap by more
 *     than OVERLAP_TOLERANCE_PX² (sub-pixel rounding allowed).
 *   • Each SVG itself renders at ≥ MIN_SVG_WIDTH_PX so the labels above are
 *     not just legible because the diagram collapsed to a sliver.
 *
 * The diagrams chosen below cover the worst offenders: dense leader-line
 * anatomy (skull base, brachial plexus, larynx), packed pharmacology
 * pathways (autonomic, opioid receptor map), and the recently-added burn
 * depth diagram which has chip-driven dynamic labels.
 *
 * Run:  npx playwright test tests/visual/diagram-label-spacing.spec.ts
 */

const VIEWPORTS = [
  { name: "small", width: 360, height: 800 },
  { name: "mobile", width: 390, height: 844 },
] as const;

/**
 * Routes whose primary teaching value is one or more diagrams. Each route
 * is checked at every viewport above. Add new diagram-heavy topics here as
 * they are built — the cost per route is ~1s.
 */
const DIAGRAM_ROUTES = [
  "/physiology/autonomic-nervous",
  "/physiology/foetal-circulation",
  "/physiology/cardiac-anatomy",
  "/anatomy/brachial-plexus",
  "/anatomy/spinal",
  "/anatomy/upper-limb",
  "/clinical/burns-plastics",
  "/clinical/neuroanaesthesia",
  "/clinical/ophthalmic-anaesthesia",
  "/intensive-care/icu-sedation-delirium",
] as const;

/** Smallest computed font-size that is still legible without zooming. */
const MIN_FONT_PX = 7;
/** Rendered text bounding-box height floor (catches scaled-down viewBox text). */
const MIN_TEXT_HEIGHT_PX = 7;
/** Diagrams compressed below this width hide labels behind each other. */
const MIN_SVG_WIDTH_PX = 280;
/** Two labels touching by less than this are sub-pixel rounding, not a bug. */
const OVERLAP_TOLERANCE_PX2 = 2;

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

async function freezeAnimations(page: Page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    `,
  });
}

async function settle(page: Page) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.evaluate(() => (document as any).fonts?.ready).catch(() => {});
  // Diagrams that lazy-mount on scroll need to actually be in view.
  await page.evaluate(async () => {
    const svgs = document.querySelectorAll('svg[role="img"]');
    for (const s of Array.from(svgs)) {
      s.scrollIntoView({ block: "center" });
      await new Promise((r) => requestAnimationFrame(() => r(null)));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(200);
}

interface SvgReport {
  index: number;
  ariaLabel: string | null;
  width: number;
  height: number;
  /** Labels whose rendered font-size is below MIN_FONT_PX. */
  tinyLabels: { text: string; fontPx: number; heightPx: number }[];
  /** Pairs of overlapping label rects within this SVG. */
  overlaps: { a: string; b: string; area: number }[];
}

/**
 * Inspect every `svg[role="img"]` in the page and report (a) labels that
 * are too small to read and (b) labels that overlap each other.
 *
 * Performed entirely in-browser so we use the actual rendered geometry
 * after viewBox scaling.
 */
async function inspectDiagrams(
  page: Page,
  thresholds: {
    minFontPx: number;
    minTextHeightPx: number;
    overlapTolerancePx2: number;
  }
): Promise<SvgReport[]> {
  return page.evaluate((t) => {
    const reports: SvgReport[] = [];
    const svgs = Array.from(
      document.querySelectorAll<SVGSVGElement>('svg[role="img"]')
    );
    svgs.forEach((svg, idx) => {
      const cs = getComputedStyle(svg);
      if (cs.display === "none" || cs.visibility === "hidden") return;
      const svgRect = svg.getBoundingClientRect();
      if (svgRect.width === 0 || svgRect.height === 0) return;

      // Collect visible <text> nodes inside this SVG.
      type Label = {
        el: SVGTextElement;
        rect: DOMRect;
        text: string;
        fontPx: number;
      };
      const labels: Label[] = [];
      svg.querySelectorAll<SVGTextElement>("text").forEach((el) => {
        const lcs = getComputedStyle(el);
        if (lcs.display === "none" || lcs.visibility === "hidden") return;
        if (parseFloat(lcs.opacity || "1") === 0) return;
        // pointerEvents=none decorations are still labels for legibility.
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        const txt = (el.textContent || "").trim();
        if (!txt) return;
        const fontPx = parseFloat(lcs.fontSize || "0");
        labels.push({ el, rect: r, text: txt, fontPx });
      });

      // Tiny labels (below font / height floor).
      const tinyLabels = labels
        .filter(
          (l) =>
            l.fontPx < t.minFontPx || l.rect.height < t.minTextHeightPx
        )
        .map((l) => ({
          text: l.text.slice(0, 60),
          fontPx: Math.round(l.fontPx * 10) / 10,
          heightPx: Math.round(l.rect.height * 10) / 10,
        }));

      // Pairwise overlap between labels (skip ancestor/descendant pairs —
      // <tspan> inside <text> shares geometry by design).
      const overlaps: { a: string; b: string; area: number }[] = [];
      for (let i = 0; i < labels.length; i++) {
        for (let j = i + 1; j < labels.length; j++) {
          const a = labels[i];
          const b = labels[j];
          if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
          const ix =
            Math.max(0, Math.min(a.rect.right, b.rect.right) - Math.max(a.rect.left, b.rect.left));
          const iy =
            Math.max(0, Math.min(a.rect.bottom, b.rect.bottom) - Math.max(a.rect.top, b.rect.top));
          const area = ix * iy;
          if (area > t.overlapTolerancePx2) {
            overlaps.push({
              a: a.text.slice(0, 40),
              b: b.text.slice(0, 40),
              area: Math.round(area),
            });
          }
        }
      }

      reports.push({
        index: idx,
        ariaLabel: svg.getAttribute("aria-label"),
        width: Math.round(svgRect.width),
        height: Math.round(svgRect.height),
        tinyLabels: tinyLabels.slice(0, 8),
        overlaps: overlaps.slice(0, 8),
      });
    });
    return reports;
  }, thresholds);
}

function fmtSvg(r: SvgReport): string {
  return `svg#${r.index} "${r.ariaLabel ?? "(no aria-label)"}" ${r.width}×${r.height}`;
}

/* ------------------------------------------------------------------ */
/* tests                                                               */
/* ------------------------------------------------------------------ */

for (const viewport of VIEWPORTS) {
  test.describe(`diagram labels @ ${viewport.name} (${viewport.width}×${viewport.height})`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const route of DIAGRAM_ROUTES) {
      test(`diagram labels are legible and non-overlapping on ${route}`, async ({
        page,
      }) => {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await freezeAnimations(page);
        await settle(page);

        const reports = await inspectDiagrams(page, {
          minFontPx: MIN_FONT_PX,
          minTextHeightPx: MIN_TEXT_HEIGHT_PX,
          overlapTolerancePx2: OVERLAP_TOLERANCE_PX2,
        });

        if (reports.length === 0) {
          test.skip(true, `No svg[role="img"] diagrams on ${route}`);
        }

        // 1. Each rendered SVG must be wide enough to keep labels apart.
        const collapsedSvgs = reports.filter((r) => r.width < MIN_SVG_WIDTH_PX);
        expect(
          collapsedSvgs,
          `Diagrams collapsed below ${MIN_SVG_WIDTH_PX}px on ${route}:\n` +
            collapsedSvgs.map((r) => `  • ${fmtSvg(r)}`).join("\n")
        ).toEqual([]);

        // 2. No tiny labels.
        const svgsWithTiny = reports.filter((r) => r.tinyLabels.length > 0);
        expect(
          svgsWithTiny,
          `Diagram labels below ${MIN_FONT_PX}px on ${route}:\n` +
            svgsWithTiny
              .map(
                (r) =>
                  `  • ${fmtSvg(r)}\n` +
                  r.tinyLabels
                    .map(
                      (l) =>
                        `      "${l.text}" font=${l.fontPx}px height=${l.heightPx}px`
                    )
                    .join("\n")
              )
              .join("\n")
        ).toEqual([]);

        // 3. No overlapping callouts within a single diagram.
        const svgsWithOverlap = reports.filter((r) => r.overlaps.length > 0);
        expect(
          svgsWithOverlap,
          `Overlapping diagram labels on ${route}:\n` +
            svgsWithOverlap
              .map(
                (r) =>
                  `  • ${fmtSvg(r)}\n` +
                  r.overlaps
                    .map(
                      (o) =>
                        `      "${o.a}" ⨯ "${o.b}"  area=${o.area}px²`
                    )
                    .join("\n")
              )
              .join("\n")
        ).toEqual([]);
      });
    }
  });
}
