import { test, expect, type Page } from "@playwright/test";

/**
 * Component-scoped layout regression tests.
 *
 * Where `layout-regression.spec.ts` walks every route looking for generic
 * overflow / overlap, this file zooms in on the three components that have
 * historically broken at narrow / laptop widths:
 *
 *   1. Sticky TOC chip strip      — must wrap or scroll cleanly, never clip
 *                                   into the card grid below it.
 *   2. Topic card grids           — cards must lay out without horizontal
 *                                   overflow and without overlapping each
 *                                   other vertically.
 *   3. Diagram tables             — the wide tables inside diagram figures
 *                                   must either fit the viewport or live
 *                                   inside their own overflow-x scroller
 *                                   (never force the page to scroll).
 *
 * Run:  npx playwright test tests/visual/component-layout.spec.ts
 */

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1366, height: 768 },
] as const;

/** Pages that exercise each component class. */
const TOC_AND_CARDS_ROUTES = [
  "/physiology",
  "/clinical",
  "/intensive-care",
] as const;

/** Topic pages that render at least one diagram <table>. */
const DIAGRAM_TABLE_ROUTES = [
  "/physiology/autonomic-nervous",
] as const;

const TOLERANCE_PX = 1;
const OVERLAP_TOLERANCE_PX2 = 4;

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
}

/**
 * For a given selector, return per-element diagnostics so an assertion
 * failure tells us which element broke and how.
 */
async function measureElements(page: Page, selector: string) {
  return page.evaluate((sel) => {
    const out: {
      selector: string;
      width: number;
      right: number;
      overflowsViewport: boolean;
      hasScrollableSelf: boolean;
      hasScrollableAncestor: boolean;
      scrollWidth: number;
      clientWidth: number;
    }[] = [];
    const vw = document.documentElement.clientWidth;
    const els = document.querySelectorAll<HTMLElement>(sel);
    els.forEach((el) => {
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") return;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const selfScrolls = cs.overflowX === "auto" || cs.overflowX === "scroll";
      let cur: HTMLElement | null = el.parentElement;
      let ancestorScrolls = false;
      while (cur && cur !== document.documentElement) {
        const a = getComputedStyle(cur);
        if (a.overflowX === "auto" || a.overflowX === "scroll") {
          ancestorScrolls = true;
          break;
        }
        cur = cur.parentElement;
      }
      out.push({
        selector: el.tagName.toLowerCase() +
          (el.id ? `#${el.id}` : "") +
          (typeof el.className === "string"
            ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".")
            : ""),
        width: Math.round(rect.width),
        right: Math.round(rect.right),
        overflowsViewport: rect.right > vw + 1,
        hasScrollableSelf: selfScrolls,
        hasScrollableAncestor: ancestorScrolls,
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
      });
    });
    return out;
  }, selector);
}

/** Return overlapping pairs amongst the elements matching `selector`. */
async function findOverlapsAmong(page: Page, selector: string) {
  return page.evaluate(
    ({ sel, tolerance }) => {
      const out: { a: string; b: string; area: number }[] = [];
      const els = Array.from(
        document.querySelectorAll<HTMLElement>(sel)
      ).filter((el) => {
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden") return false;
        if (cs.position === "absolute" || cs.position === "fixed") return false;
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      });
      const describe = (el: Element) =>
        el.tagName.toLowerCase() +
        ((el as HTMLElement).id ? `#${(el as HTMLElement).id}` : "");
      for (let i = 0; i < els.length; i++) {
        for (let j = i + 1; j < els.length; j++) {
          const a = els[i].getBoundingClientRect();
          const b = els[j].getBoundingClientRect();
          const x = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
          const y = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
          const area = x * y;
          if (area > tolerance) {
            out.push({ a: describe(els[i]), b: describe(els[j]), area: Math.round(area) });
          }
        }
      }
      return out.slice(0, 10);
    },
    { sel: selector, tolerance: OVERLAP_TOLERANCE_PX2 }
  );
}

for (const viewport of VIEWPORTS) {
  test.describe(`components @ ${viewport.name} (${viewport.width}×${viewport.height})`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    /* ---------------------------------------------------------------- */
    /* 1. Sticky TOC chip strip                                          */
    /* ---------------------------------------------------------------- */
    for (const route of TOC_AND_CARDS_ROUTES) {
      test(`TOC chip strip stays in bounds on ${route}`, async ({ page }) => {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await freezeAnimations(page);
        await settle(page);

        const tocs = await measureElements(page, 'nav[aria-label="On this page"]');
        if (tocs.length === 0) test.skip(true, "No auto TOC on this route");

        for (const toc of tocs) {
          // The TOC nav itself must not push past the viewport.
          expect(
            toc.overflowsViewport,
            `TOC nav overflows viewport on ${route}: right=${toc.right}`
          ).toBe(false);
        }

        // The chip strip must EITHER wrap (scrollWidth ≤ clientWidth) OR
        // be inside its own horizontal scroll container.
        const strips = await measureElements(page, ".toc-chip-strip");
        for (const strip of strips) {
          const fits = strip.scrollWidth <= strip.clientWidth + TOLERANCE_PX;
          const scrolls = strip.hasScrollableSelf || strip.hasScrollableAncestor;
          expect(
            fits || scrolls,
            `TOC chip strip neither wraps nor scrolls on ${route}: ` +
              `scrollWidth=${strip.scrollWidth} clientWidth=${strip.clientWidth} ` +
              `selfScrolls=${strip.hasScrollableSelf}`
          ).toBe(true);
        }
      });
    }

    /* ---------------------------------------------------------------- */
    /* 2. Topic card grids                                               */
    /* ---------------------------------------------------------------- */
    for (const route of TOC_AND_CARDS_ROUTES) {
      test(`topic cards lay out without overflow/overlap on ${route}`, async ({ page }) => {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await freezeAnimations(page);
        await settle(page);

        const cards = await measureElements(page, ".topic-card");
        expect(cards.length, `expected topic cards on ${route}`).toBeGreaterThan(0);

        const overflowing = cards.filter((c) => c.overflowsViewport);
        expect(
          overflowing,
          `Topic cards overflow viewport on ${route}:\n` +
            overflowing.map((c) => `  • ${c.selector} right=${c.right}`).join("\n")
        ).toEqual([]);

        // Inner content of each card must fit (no horizontal scroll inside the card).
        const overflowingContent = cards.filter(
          (c) => c.scrollWidth > c.clientWidth + TOLERANCE_PX
        );
        expect(
          overflowingContent,
          `Topic card inner content clips on ${route}:\n` +
            overflowingContent
              .map((c) => `  • ${c.selector} scrollW=${c.scrollWidth} clientW=${c.clientWidth}`)
              .join("\n")
        ).toEqual([]);

        // Cards in a grid must not overlap each other.
        const overlaps = await findOverlapsAmong(page, ".topic-card");
        expect(
          overlaps,
          `Overlapping topic cards on ${route}:\n` +
            overlaps.map((o) => `  • ${o.a} ⨯ ${o.b} area=${o.area}px²`).join("\n")
        ).toEqual([]);
      });
    }

    /* ---------------------------------------------------------------- */
    /* 3. Diagram tables                                                 */
    /* ---------------------------------------------------------------- */
    for (const route of DIAGRAM_TABLE_ROUTES) {
      test(`diagram tables stay contained on ${route}`, async ({ page }) => {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await freezeAnimations(page);
        await settle(page);

        const tables = await measureElements(page, "figure table, [data-diagram] table");
        expect(tables.length, `expected diagram tables on ${route}`).toBeGreaterThan(0);

        for (const t of tables) {
          // A diagram table is allowed to be wider than the viewport ONLY if
          // it sits inside an overflow-x scroller (a `-mx-* overflow-x-auto`
          // wrapper). Otherwise it must fit.
          const fits = !t.overflowsViewport;
          expect(
            fits || t.hasScrollableAncestor,
            `Diagram table overflows on ${route} without a scroll wrapper: ` +
              `${t.selector} right=${t.right} scrollableAncestor=${t.hasScrollableAncestor}`
          ).toBe(true);
        }

        // Page-level: even with wide tables, the document must not scroll.
        const pageOverflow = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));
        expect(
          pageOverflow.scrollWidth,
          `Page horizontal overflow on ${route}: ${pageOverflow.scrollWidth} > ${pageOverflow.clientWidth}`
        ).toBeLessThanOrEqual(pageOverflow.clientWidth + TOLERANCE_PX);
      });
    }
  });
}
