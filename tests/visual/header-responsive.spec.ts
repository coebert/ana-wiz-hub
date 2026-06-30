import { test, expect, type Page } from "@playwright/test";

/**
 * Header responsive layout tests.
 *
 * Guards the header against the overlap class of bugs we've fixed before
 * (brand wordmark colliding with the icon nav, exam chips clipping into
 * "Primary", search button stacking on top of the theme toggle, etc.).
 *
 * For every common breakpoint *and* a handful of awkward in-between widths,
 * we assert two invariants on the sticky `<header>`:
 *
 *   1. The header itself does not overflow horizontally — its `scrollWidth`
 *      must not exceed the viewport width.
 *   2. No two visible interactive items inside the header (links, buttons,
 *      brand wordmark) overlap each other, *unless* they live inside an
 *      ancestor that is intentionally horizontally scrollable
 *      (`overflow-x: auto/scroll` — the mobile nav row and mobile exam-chip
 *      rail are allowed to scroll sideways).
 *
 * Run:    npx playwright test tests/visual/header-responsive.spec.ts
 */

/** Common device breakpoints + awkward in-between widths where overlap historically appeared. */
const WIDTHS = [
  320,   // very narrow phones
  360,   // small Android
  375,   // iPhone SE / mini
  390,   // iPhone 14
  414,   // iPhone Plus
  480,   // large phones
  600,   // small tablets
  640,   // sm: breakpoint
  768,   // md: breakpoint — desktop nav appears
  820,   // iPad portrait
  900,   // narrow laptop
  1024,  // lg: breakpoint
  1108,  // viewport that exposed earlier overlap
  1180,  // iPad Pro 11"
  1200,
  1280,  // xl: breakpoint — wordmark + Support label appear
  1366,  // common laptop
  1440,
  1536,  // 2xl: breakpoint
  1600,
  1920,  // desktop
] as const;

const HEIGHT = 900;
const OVERLAP_TOLERANCE_PX2 = 1; // ignore sub-pixel rounding

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

type Hit = { a: string; b: string; area: number };

/**
 * Collect overlapping pairs of visible interactive header items.
 * Items inside a horizontally-scrollable ancestor are allowed to extend
 * past the viewport / each other (intentional scrolling rail).
 */
async function findHeaderOverlaps(page: Page): Promise<{
  overlaps: Hit[];
  headerScrollWidth: number;
  headerClientWidth: number;
}> {
  return page.evaluate((tolerance) => {
    const header = document.querySelector("header");
    if (!header) {
      return { overlaps: [], headerScrollWidth: 0, headerClientWidth: 0 };
    }

    function describe(el: Element): string {
      const tag = el.tagName.toLowerCase();
      const label =
        el.getAttribute("aria-label") ||
        el.getAttribute("title") ||
        (el.textContent || "").trim().slice(0, 30);
      return `${tag}[${label || "?"}]`;
    }

    function hasHorizScrollAncestor(el: Element): boolean {
      let cur: Element | null = el.parentElement;
      while (cur && cur !== header) {
        const cs = getComputedStyle(cur);
        if (cs.overflowX === "auto" || cs.overflowX === "scroll") return true;
        cur = cur.parentElement;
      }
      return false;
    }

    function isVisible(el: Element): boolean {
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") return false;
      if (parseFloat(cs.opacity) === 0) return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    }

    // Interactive items we expect to never overlap.
    const items = Array.from(
      header!.querySelectorAll<HTMLElement>(
        "a, button, [role='button'], [data-header-brand]"
      )
    ).filter((el) => isVisible(el) && !hasHorizScrollAncestor(el));

    function intersect(a: DOMRect, b: DOMRect): number {
      const x = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
      const y = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
      return x * y;
    }

    const rects = items.map((el) => el.getBoundingClientRect());
    const hits: { a: string; b: string; area: number }[] = [];
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        // Skip ancestor/descendant pairs — they naturally overlap.
        if (items[i].contains(items[j]) || items[j].contains(items[i])) continue;
        const area = intersect(rects[i], rects[j]);
        if (area > tolerance) {
          hits.push({ a: describe(items[i]), b: describe(items[j]), area: Math.round(area) });
        }
      }
    }

    return {
      overlaps: hits.slice(0, 12),
      headerScrollWidth: (header as HTMLElement).scrollWidth,
      headerClientWidth: (header as HTMLElement).clientWidth,
    };
  }, OVERLAP_TOLERANCE_PX2);
}

for (const width of WIDTHS) {
  test.describe(`header @ ${width}px`, () => {
    test.use({ viewport: { width, height: HEIGHT } });

    test(`no horizontal overflow & no overlapping items`, async ({ page }) => {
      // `/revise` exercises the in-app header variant (brand wordmark links to
      // /revise, every nav item is rendered). The same Header component is used
      // throughout the app, so a single representative route is sufficient.
      await page.goto("/revise", { waitUntil: "domcontentloaded" });
      await freezeAnimations(page);
      await settle(page);

      const { overlaps, headerScrollWidth, headerClientWidth } = await findHeaderOverlaps(page);

      expect(
        headerScrollWidth,
        `Header overflows horizontally at ${width}px: scrollWidth=${headerScrollWidth} > clientWidth=${headerClientWidth}`
      ).toBeLessThanOrEqual(headerClientWidth + 1);

      expect(
        overlaps,
        `Header items overlap at ${width}px:\n` +
          overlaps.map((o) => `  • ${o.a}  ⨯  ${o.b}  (area=${o.area}px²)`).join("\n")
      ).toEqual([]);
    });
  });
}
