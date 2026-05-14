import { test, expect, type Page } from "@playwright/test";

/**
 * Automated layout regression tests.
 *
 * For each key page at mobile (390px) and desktop (1366px) widths, assert:
 *   1. No page-level horizontal overflow (document scrollWidth ≤ clientWidth).
 *   2. No visible element extends past the right edge of the viewport
 *      (excluding elements inside their own horizontal scroll container).
 *   3. No unexpected overlap between sibling block-level elements within
 *      the main content region (siblings whose bounding rects intersect
 *      with > OVERLAP_TOLERANCE area, ignoring intentionally positioned
 *      / floating / sticky elements).
 *
 * These catch the classes of bugs we've fixed before:
 *   - wide tables/SVGs forcing the page to scroll horizontally,
 *   - header nav clipping into adjacent chips,
 *   - cards stacking onto each other on narrow viewports.
 *
 * Run:    npx playwright test tests/visual/layout-regression.spec.ts
 */

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1366, height: 768 },
] as const;

/** Routes that exercise distinct layouts across the app. */
const ROUTES = [
  "/",
  "/revise",
  "/physics",
  "/physiology",
  "/pharmacology",
  "/clinical",
  "/intensive-care",
  "/perioperative",
  "/physiology/autonomic-nervous",
  "/clinical/tiva",
  "/drugs",
  "/viva",
] as const;

const OVERFLOW_TOLERANCE_PX = 1;
const OVERLAP_TOLERANCE_PX2 = 4; // ignore sub-pixel rounding

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

/** Wait for fonts + initial network so layout has settled. */
async function settle(page: Page) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.evaluate(() => (document as any).fonts?.ready).catch(() => {});
}

/**
 * Find every visible element whose right edge exceeds the viewport,
 * unless it lives inside an ancestor that's itself horizontally
 * scrollable (overflow-x: auto/scroll) — that's intentional internal scroll.
 */
async function findOverflowingElements(page: Page, viewportWidth: number) {
  return page.evaluate(
    ({ viewportWidth, tolerance }) => {
      const offenders: { selector: string; right: number; tag: string; text: string }[] = [];

      function describe(el: Element): string {
        const id = (el as HTMLElement).id ? `#${(el as HTMLElement).id}` : "";
        const cls = (el as HTMLElement).className && typeof (el as HTMLElement).className === "string"
          ? "." + (el as HTMLElement).className.trim().split(/\s+/).slice(0, 3).join(".")
          : "";
        return `${el.tagName.toLowerCase()}${id}${cls}`;
      }

      function hasScrollableAncestor(el: Element): boolean {
        let cur: Element | null = el.parentElement;
        while (cur && cur !== document.documentElement) {
          const cs = getComputedStyle(cur);
          if (cs.overflowX === "auto" || cs.overflowX === "scroll") return true;
          cur = cur.parentElement;
        }
        return false;
      }

      const all = document.querySelectorAll<HTMLElement>("body *");
      all.forEach((el) => {
        // Skip invisible / zero-size elements.
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden" || cs.opacity === "0") return;
        // Skip fixed/sticky overlays — they're intentionally outside flow.
        if (cs.position === "fixed" || cs.position === "sticky") return;
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        if (rect.right <= viewportWidth + tolerance) return;
        if (hasScrollableAncestor(el)) return;
        offenders.push({
          selector: describe(el),
          right: Math.round(rect.right),
          tag: el.tagName.toLowerCase(),
          text: (el.textContent || "").trim().slice(0, 60),
        });
      });

      // De-dup: if a parent overflows, don't also report all its children.
      const filtered = offenders.filter((o, i, arr) => {
        return !arr.some((other, j) =>
          i !== j &&
          other.selector !== o.selector &&
          o.selector.startsWith(other.selector.split(".")[0]) === false
            ? false
            : false
        );
      });

      return offenders.slice(0, 10); // cap report size
    },
    { viewportWidth, tolerance: OVERFLOW_TOLERANCE_PX }
  );
}

/**
 * Detect overlapping in-flow sibling block elements within main content.
 * Ignores elements that are absolutely / fixed positioned, or whose
 * computed style suggests intentional layering (z-index set, transforms).
 */
async function findOverlappingSiblings(page: Page) {
  return page.evaluate((tolerance) => {
    type Hit = { a: string; b: string; area: number };
    const hits: Hit[] = [];

    function describe(el: Element): string {
      const id = (el as HTMLElement).id ? `#${(el as HTMLElement).id}` : "";
      const cls = (el as HTMLElement).className && typeof (el as HTMLElement).className === "string"
        ? "." + (el as HTMLElement).className.trim().split(/\s+/).slice(0, 2).join(".")
        : "";
      return `${el.tagName.toLowerCase()}${id}${cls}`;
    }

    function isInFlow(el: Element): boolean {
      const cs = getComputedStyle(el);
      if (cs.position === "absolute" || cs.position === "fixed" || cs.position === "sticky") return false;
      if (cs.display === "none" || cs.visibility === "hidden") return false;
      if (parseFloat(cs.opacity) === 0) return false;
      return true;
    }

    function intersect(a: DOMRect, b: DOMRect): number {
      const x = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
      const y = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
      return x * y;
    }

    // Examine direct children of <main>, <section>, and common content wrappers.
    const containers = document.querySelectorAll<HTMLElement>(
      "main, main section, main article, main > div, [role='main']"
    );

    containers.forEach((container) => {
      const kids = Array.from(container.children).filter(isInFlow) as HTMLElement[];
      for (let i = 0; i < kids.length; i++) {
        for (let j = i + 1; j < kids.length; j++) {
          const a = kids[i].getBoundingClientRect();
          const b = kids[j].getBoundingClientRect();
          if (a.width === 0 || a.height === 0 || b.width === 0 || b.height === 0) continue;
          const area = intersect(a, b);
          if (area > tolerance) {
            hits.push({ a: describe(kids[i]), b: describe(kids[j]), area: Math.round(area) });
          }
        }
      }
    });

    return hits.slice(0, 10);
  }, OVERLAP_TOLERANCE_PX2);
}

for (const viewport of VIEWPORTS) {
  test.describe(`layout @ ${viewport.name} (${viewport.width}×${viewport.height})`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const route of ROUTES) {
      test(`no overflow / overlap on ${route}`, async ({ page }) => {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await freezeAnimations(page);
        await settle(page);

        // 1. Page-level horizontal overflow.
        const pageOverflow = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));
        expect(
          pageOverflow.scrollWidth,
          `Page horizontal overflow on ${route}: scrollWidth=${pageOverflow.scrollWidth} > clientWidth=${pageOverflow.clientWidth}`
        ).toBeLessThanOrEqual(pageOverflow.clientWidth + OVERFLOW_TOLERANCE_PX);

        // 2. Per-element overflow past viewport right edge.
        const overflowing = await findOverflowingElements(page, viewport.width);
        expect(
          overflowing,
          `Elements overflow viewport on ${route}:\n` +
            overflowing.map((o) => `  • ${o.selector} right=${o.right} text="${o.text}"`).join("\n")
        ).toEqual([]);

        // 3. Overlapping in-flow siblings inside main content.
        const overlaps = await findOverlappingSiblings(page);
        expect(
          overlaps,
          `Overlapping siblings on ${route}:\n` +
            overlaps.map((o) => `  • ${o.a}  ⨯  ${o.b}  (area=${o.area}px²)`).join("\n")
        ).toEqual([]);
      });
    }
  });
}
