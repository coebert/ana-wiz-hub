import { test, expect, type Page } from "@playwright/test";

/**
 * Mobile drawer focus-trap tests.
 *
 * The Header's mobile slide-out panel is a Radix Dialog (via shadcn `Sheet`).
 * Radix provides the focus trap, initial focus, focus restoration, and
 * Escape-to-close behaviour. These tests pin those guarantees so a future
 * change (custom dialog, removing modal=true, etc.) can't silently let
 * keyboard / screen-reader users tab to the page behind the open drawer.
 *
 * Assertions:
 *   1. While open, the dialog exposes role="dialog" and aria-modal="true".
 *   2. Tab cycles only through focusables inside the panel — focus never
 *      escapes to a button in the underlying page (verified across 40
 *      forward Tabs and 40 Shift+Tabs).
 *   3. Escape closes the drawer and restores focus to the hamburger trigger.
 *
 * Run:  npx playwright test tests/visual/drawer-focus-trap.spec.ts
 */

const MOBILE_VIEWPORTS = [
  { name: "iphone-se", width: 375, height: 667 },
  { name: "iphone-14", width: 390, height: 844 },
] as const;

async function openDrawer(page: Page) {
  await page.getByLabel("Open navigation menu").click();
  await page.waitForSelector('[role="dialog"]', { state: "visible", timeout: 2000 });
}

async function activeElementInfo(page: Page) {
  return page.evaluate(() => {
    const dlg = document.querySelector('[role="dialog"]');
    const ae = document.activeElement as HTMLElement | null;
    return {
      insideDialog: !!(dlg && ae && dlg.contains(ae)),
      tag: ae?.tagName.toLowerCase() ?? null,
      label: ae?.getAttribute("aria-label") ?? ae?.textContent?.trim().slice(0, 40) ?? null,
    };
  });
}

for (const vp of MOBILE_VIEWPORTS) {
  test.describe(`drawer focus trap @ ${vp.name}`, () => {
    test.use({
      viewport: { width: vp.width, height: vp.height },
      hasTouch: true,
      isMobile: true,
    });

    test.beforeEach(async ({ page }) => {
      await page.goto("/revise", { waitUntil: "domcontentloaded" });
      await page.evaluate(() => (document as any).fonts?.ready).catch(() => {});
    });

    test("dialog exposes modal ARIA when open", async ({ page }) => {
      await openDrawer(page);
      const dlg = page.locator('[role="dialog"]');
      await expect(dlg).toBeVisible();
      await expect(dlg).toHaveAttribute("aria-modal", "true");
    });

    test("Tab and Shift+Tab never escape the dialog", async ({ page }) => {
      await openDrawer(page);

      let escapes = 0;
      const path: string[] = [];

      for (let i = 0; i < 40; i++) {
        await page.keyboard.press("Tab");
        const info = await activeElementInfo(page);
        path.push(`→ ${info.tag}[${info.label}]`);
        if (!info.insideDialog) escapes++;
      }
      expect(
        escapes,
        `Focus escaped the drawer on forward Tab. Path:\n${path.join("\n")}`
      ).toBe(0);

      escapes = 0;
      const backPath: string[] = [];
      for (let i = 0; i < 40; i++) {
        await page.keyboard.press("Shift+Tab");
        const info = await activeElementInfo(page);
        backPath.push(`← ${info.tag}[${info.label}]`);
        if (!info.insideDialog) escapes++;
      }
      expect(
        escapes,
        `Focus escaped the drawer on Shift+Tab. Path:\n${backPath.join("\n")}`
      ).toBe(0);
    });

    test("Escape closes the drawer and restores focus to the trigger", async ({ page }) => {
      const trigger = page.getByLabel("Open navigation menu");
      await trigger.click();
      await page.waitForSelector('[role="dialog"]', { state: "visible" });

      await page.keyboard.press("Escape");
      await page.waitForSelector('[role="dialog"]', { state: "detached", timeout: 2000 });

      const restoredLabel = await page.evaluate(
        () => document.activeElement?.getAttribute("aria-label") ?? null
      );
      expect(restoredLabel).toBe("Open navigation menu");
    });
  });
}
