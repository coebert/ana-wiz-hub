import { test, expect, type Page } from "@playwright/test";

/**
 * Spacing & reading-measure regression tests.
 *
 * Guards the guarantees the shared page templates
 * (`<PageContainer>` / `<PageSection>` / `<SectionLayout>`) make:
 *
 *   1. Horizontal gutters step predictably across breakpoints
 *      (`px-3` = 12 at mobile, `px-4` = 16 at ≥sm, `px-6` = 24 at ≥lg).
 *      Every `.container.mx-auto` on the page must respect this scale.
 *
 *   2. Reading measures cap correctly. When a container uses a
 *      `max-w-{3xl|4xl|5xl|6xl|7xl}` class, its resolved width must
 *      never exceed the token pixel value (48/56/64/72/80 rem =
 *      768/896/1024/1152/1280 px). This catches accidental removal
 *      of the width cap or a class collision that widens the column.
 *
 *   3. The primary reading column is horizontally centred at desktop
 *      widths — a common regression when `mx-auto` gets dropped or
 *      a wider ancestor forces content off-centre.
 *
 * Exercised routes cover Landing, /revise, each section index, and a
 * representative topic page. The Landing test tolerates the fact that
 * its stacked sections legitimately use different measures
 * (hero xwide, tools xwide, evidence-band wide) — every container is
 * checked against its OWN declared cap.
 *
 * Run: npx playwright test tests/visual/spacing-measure-regression.spec.ts
 */

// Tailwind's `sm` breakpoint fires at ≥640px, `lg` at ≥1024px. Gutters
// step: `px-3` (12px) below sm, `px-4` (16px) at sm/md, `px-6` (24px) at
// lg+. Widths chosen to cover the common mobile matrix (Android small,
// iPhone, large phone, phablet, the sm boundary itself) plus tablet and
// desktop so we catch the boundary-crossing bugs on every side.
const VIEWPORTS = [
  { name: "mobile-360",  width: 360,  height: 780,  expectedPad: 12 },
  { name: "mobile-390",  width: 390,  height: 844,  expectedPad: 12 },
  { name: "mobile-414",  width: 414,  height: 896,  expectedPad: 12 },
  { name: "mobile-540",  width: 540,  height: 960,  expectedPad: 12 },
  { name: "mobile-640",  width: 640,  height: 900,  expectedPad: 16 },
  { name: "tablet-768",  width: 768,  height: 1024, expectedPad: 16 },
  { name: "desktop-1280", width: 1280, height: 900, expectedPad: 24 },
] as const;

const ROUTES = [
  "/",
  "/revise",
  "/physics",
  "/physiology",
  "/pharmacology",
  "/clinical",
  "/intensive-care",
  "/perioperative",
  "/anatomy",
  "/chemistry",
  "/physiology/autonomic-nervous",
  "/clinical/tiva",
] as const;

/** Tailwind reading-measure tokens in px (rem × 16). */
const MEASURE_PX: Record<string, number> = {
  "max-w-3xl": 48 * 16,   // 768
  "max-w-4xl": 56 * 16,   // 896
  "max-w-5xl": 64 * 16,   // 1024
  "max-w-6xl": 72 * 16,   // 1152
  "max-w-7xl": 80 * 16,   // 1280
};

async function settle(page: Page) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.evaluate(() => (document as any).fonts?.ready).catch(() => {});
}

type ContainerSample = {
  selector: string;
  paddingLeft: number;
  paddingRight: number;
  width: number;
  offsetLeft: number;
  measureClass: string | null;
  measurePx: number | null;
};

async function sampleContainers(page: Page): Promise<ContainerSample[]> {
  return page.evaluate((measurePx) => {
    function describe(el: Element): string {
      const id = (el as HTMLElement).id ? `#${(el as HTMLElement).id}` : "";
      const cls =
        typeof (el as HTMLElement).className === "string"
          ? "." + (el as HTMLElement).className.trim().split(/\s+/).slice(0, 4).join(".")
          : "";
      return `${el.tagName.toLowerCase()}${id}${cls}`;
    }
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".container.mx-auto")
    );
    return nodes
      .filter((el) => {
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden") return false;
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      })
      .map((el) => {
        const cs = getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        const className =
          typeof el.className === "string" ? el.className : "";
        const measureClass =
          Object.keys(measurePx).find((k) =>
            className.split(/\s+/).includes(k)
          ) ?? null;
        return {
          selector: describe(el),
          paddingLeft: parseFloat(cs.paddingLeft) || 0,
          paddingRight: parseFloat(cs.paddingRight) || 0,
          width: rect.width,
          offsetLeft: rect.left,
          measureClass,
          measurePx: measureClass ? measurePx[measureClass] : null,
        };
      });
  }, MEASURE_PX);
}

for (const vp of VIEWPORTS) {
  test.describe(`spacing/measure @ ${vp.name} (${vp.width}×${vp.height})`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    for (const route of ROUTES) {
      test(`gutters + measures on ${route}`, async ({ page }) => {
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await settle(page);

        const samples = await sampleContainers(page);
        expect(
          samples.length,
          `Expected at least one .container.mx-auto on ${route}`
        ).toBeGreaterThan(0);

        // 1. Every container's horizontal padding matches the breakpoint
        //    gutter (px-3 / px-4 / px-6 → 12 / 16 / 24 px). Symmetric l/r.
        for (const s of samples) {
          expect(
            s.paddingLeft,
            `${route} → ${s.selector}: paddingLeft=${s.paddingLeft} ≠ expected ${vp.expectedPad} at ${vp.name}`
          ).toBe(vp.expectedPad);
          expect(
            s.paddingRight,
            `${route} → ${s.selector}: paddingRight=${s.paddingRight} ≠ expected ${vp.expectedPad} at ${vp.name}`
          ).toBe(vp.expectedPad);
        }

        // 2. Any container that declares a max-w-{3-7}xl cap must not
        //    exceed the token pixel width. Allow 1px sub-pixel slack.
        for (const s of samples) {
          if (!s.measurePx) continue;
          expect(
            s.width,
            `${route} → ${s.selector}: width=${s.width} exceeds ${s.measureClass}=${s.measurePx}px at ${vp.name}`
          ).toBeLessThanOrEqual(s.measurePx + 1);
        }

        // 3. At desktop, capped columns must sit centred inside the
        //    viewport (mx-auto). Only assert when the cap actually
        //    engages (viewport wider than the measure).
        if (vp.name === "desktop") {
          for (const s of samples) {
            if (!s.measurePx) continue;
            if (vp.width <= s.measurePx) continue;
            const expectedLeft = (vp.width - s.width) / 2;
            expect(
              Math.abs(s.offsetLeft - expectedLeft),
              `${route} → ${s.selector}: offsetLeft=${s.offsetLeft} not centred (expected ≈${expectedLeft})`
            ).toBeLessThanOrEqual(1);
          }
        }
      });
    }
  });
}
