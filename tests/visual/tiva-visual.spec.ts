import { test, expect, type Page } from "@playwright/test";

/**
 * Visual regression check for the TIVA topic page.
 *
 * Verifies that diagrams (SVG content) and animated cues
 * (`animate-fade-in` / model-switch transition) render correctly
 * at mobile, tablet, and desktop widths.
 *
 * Baselines live in tests/visual/__snapshots__/. To update after an
 * intentional design change run:
 *   npx playwright test tests/visual/tiva-visual.spec.ts --update-snapshots
 */

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 820, height: 1180 },
  { name: "desktop", width: 1366, height: 768 },
] as const;

const TIVA_PATH = "/clinical/tiva";

/** Pause CSS animations & transitions so screenshots are deterministic. */
async function freezeAnimations(page: Page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    `,
  });
}

/** Wait for SVG diagrams to be in DOM and for animated blocks to settle. */
async function waitForDiagrams(page: Page) {
  await page.waitForLoadState("networkidle");
  // At least one SVG diagram should be present on the TIVA page
  await page.locator("svg").first().waitFor({ state: "visible", timeout: 10_000 });
  // The model-switch fade-in block should be mounted
  await page.locator(".animate-fade-in").first().waitFor({ state: "attached" });
}

test.describe("TIVA page — visual regression across viewports", () => {
  for (const vp of VIEWPORTS) {
    test(`renders diagrams & animated cues at ${vp.name} (${vp.width}×${vp.height})`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(TIVA_PATH, { waitUntil: "domcontentloaded" });
      await waitForDiagrams(page);
      await freezeAnimations(page);

      // 1. Sanity: at least one SVG and one animated block rendered
      const svgCount = await page.locator("svg").count();
      expect(svgCount, "expected SVG diagrams to render").toBeGreaterThan(0);

      const animatedCount = await page.locator(".animate-fade-in").count();
      expect(
        animatedCount,
        "expected at least one animated cue block",
      ).toBeGreaterThan(0);

      // 2. Sanity: no element overflows the viewport horizontally
      const overflowingElements = await page.evaluate((vw) => {
        const offenders: { tag: string; right: number; cls: string }[] = [];
        document.querySelectorAll("body *").forEach((el) => {
          const r = (el as HTMLElement).getBoundingClientRect();
          if (r.right > vw + 1 && r.width > 4) {
            offenders.push({
              tag: el.tagName,
              right: Math.round(r.right),
              cls: (el as HTMLElement).className?.toString().slice(0, 60) ?? "",
            });
          }
        });
        return offenders.slice(0, 5);
      }, vp.width);
      expect(
        overflowingElements,
        `elements overflow ${vp.width}px viewport`,
      ).toEqual([]);

      // 3. Full-page screenshot baseline
      await expect(page).toHaveScreenshot(`tiva-${vp.name}.png`, {
        fullPage: true,
        animations: "disabled",
        maxDiffPixelRatio: 0.02,
      });

      // 4. Diagram-region close-up baseline (first SVG)
      const firstSvg = page.locator("svg").first();
      await expect(firstSvg).toHaveScreenshot(`tiva-${vp.name}-first-diagram.png`, {
        animations: "disabled",
        maxDiffPixelRatio: 0.02,
      });
    });
  }
});
