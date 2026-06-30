import { test, expect, type Page } from "@playwright/test";

/**
 * Mobile drawer swipe gesture tests.
 *
 * The Header exposes a slide-out navigation panel on coarse-pointer devices
 * below the `md` breakpoint. It supports two touch gestures:
 *
 *   • edge-swipe-right from the left edge of the viewport → opens drawer
 *   • swipe-left on the open panel                        → closes drawer
 *
 * Both are guarded by SWIPE_MAX_VERTICAL_PX so that vertical scrolling
 * inside the drawer's nav list or exam-chip filter never accidentally
 * fires a close. These tests pin those invariants.
 *
 * Run:  npx playwright test tests/visual/drawer-swipe.spec.ts
 */

const MOBILE_VIEWPORTS = [
  { name: "iphone-se", width: 375, height: 667 },
  { name: "iphone-14", width: 390, height: 844 },
  { name: "pixel", width: 412, height: 915 },
] as const;

/**
 * Dispatch a synthetic touch sequence. `target` is a CSS selector (panel) or
 * null to dispatch on `window` (page-level edge gestures).
 */
async function dispatchTouch(
  page: Page,
  target: string | null,
  events: Array<["touchstart" | "touchmove" | "touchend", number, number]>
) {
  await page.evaluate(
    async ([sel, evs]) => {
      const node: EventTarget | null = sel ? document.querySelector(sel as string) : window;
      if (!node) throw new Error(`touch target not found: ${sel}`);
      const elTarget = (sel ? (node as Element) : document.body) as Element;
      for (const [type, x, y] of evs as Array<[string, number, number]>) {
        const t = new Touch({
          identifier: 1,
          target: elTarget,
          clientX: x,
          clientY: y,
        });
        const ev = new TouchEvent(type, {
          bubbles: true,
          cancelable: true,
          touches: type === "touchend" ? [] : [t],
          changedTouches: [t],
        });
        node.dispatchEvent(ev);
        await new Promise((r) => setTimeout(r, 15));
      }
    },
    [target, events] as const
  );
}

async function openDrawerViaSwipe(page: Page, viewportHeight: number) {
  await dispatchTouch(page, null, [
    ["touchstart", 5, Math.round(viewportHeight / 2)],
    ["touchend", 220, Math.round(viewportHeight / 2) + 5],
  ]);
  await page.waitForSelector('[role="dialog"]', { state: "visible", timeout: 2000 });
}

for (const vp of MOBILE_VIEWPORTS) {
  test.describe(`drawer swipe @ ${vp.name} (${vp.width}×${vp.height})`, () => {
    test.use({
      viewport: { width: vp.width, height: vp.height },
      hasTouch: true,
      isMobile: true,
    });

    test.beforeEach(async ({ page }) => {
      await page.goto("/revise", { waitUntil: "domcontentloaded" });
      // Wait for fonts so the drawer animation timing is deterministic.
      await page.evaluate(() => (document as any).fonts?.ready).catch(() => {});
    });

    test("swipe-left on the open drawer closes it", async ({ page }) => {
      await openDrawerViaSwipe(page, vp.height);
      expect(await page.locator('[role="dialog"]').count()).toBe(1);

      // Clear horizontal swipe-left across the panel.
      await dispatchTouch(page, '[role="dialog"]', [
        ["touchstart", Math.round(vp.width * 0.7), Math.round(vp.height / 2)],
        ["touchend", 30, Math.round(vp.height / 2) + 4],
      ]);

      await page.waitForSelector('[role="dialog"]', { state: "detached", timeout: 2000 });
      expect(await page.locator('[role="dialog"]').count()).toBe(0);
    });

    test("vertical scroll inside the drawer never closes it", async ({ page }) => {
      await openDrawerViaSwipe(page, vp.height);
      expect(await page.locator('[role="dialog"]').count()).toBe(1);

      // 1. Pure vertical scroll inside the nav list (dx≈0, dy large).
      await dispatchTouch(page, '[role="dialog"]', [
        ["touchstart", Math.round(vp.width * 0.4), Math.round(vp.height * 0.7)],
        ["touchmove", Math.round(vp.width * 0.4) + 2, Math.round(vp.height * 0.4)],
        ["touchend", Math.round(vp.width * 0.4) + 4, Math.round(vp.height * 0.2)],
      ]);
      await page.waitForTimeout(150);
      expect(
        await page.locator('[role="dialog"]').count(),
        "pure vertical scroll inside the panel must not close the drawer"
      ).toBe(1);

      // 2. Diagonal but mostly-vertical (dy >> |dx|, exceeds vertical guard).
      await dispatchTouch(page, '[role="dialog"]', [
        ["touchstart", Math.round(vp.width * 0.6), Math.round(vp.height * 0.75)],
        ["touchend", Math.round(vp.width * 0.6) - 40, Math.round(vp.height * 0.25)],
      ]);
      await page.waitForTimeout(150);
      expect(
        await page.locator('[role="dialog"]').count(),
        "diagonal mostly-vertical gesture must not close the drawer"
      ).toBe(1);

      // 3. Vertical scroll over the exam-chip filter section at the top.
      await dispatchTouch(page, '[role="dialog"]', [
        ["touchstart", Math.round(vp.width * 0.3), Math.round(vp.height * 0.18)],
        ["touchmove", Math.round(vp.width * 0.3), Math.round(vp.height * 0.5)],
        ["touchend", Math.round(vp.width * 0.3) + 3, Math.round(vp.height * 0.75)],
      ]);
      await page.waitForTimeout(150);
      expect(
        await page.locator('[role="dialog"]').count(),
        "vertical scroll over exam-chip section must not close the drawer"
      ).toBe(1);
    });

    test("short horizontal twitch below threshold does not close drawer", async ({ page }) => {
      await openDrawerViaSwipe(page, vp.height);
      expect(await page.locator('[role="dialog"]').count()).toBe(1);

      // dx = -40 (less than SWIPE_THRESHOLD_PX = 60) → ignored.
      await dispatchTouch(page, '[role="dialog"]', [
        ["touchstart", 220, Math.round(vp.height / 2)],
        ["touchend", 180, Math.round(vp.height / 2) + 2],
      ]);
      await page.waitForTimeout(150);
      expect(await page.locator('[role="dialog"]').count()).toBe(1);
    });
  });
}
