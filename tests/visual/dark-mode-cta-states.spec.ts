import { test, expect, type Locator, type Page } from "@playwright/test";

/**
 * Dark-mode WCAG AA contrast regression for CTA interaction states.
 *
 * Companion to `dark-mode-ui-contrast.spec.ts`, which only samples the
 * resting state. Hover/active/focus variants routinely regress because
 * they lean on `:hover` / `:active` / `:focus-visible` overrides that
 * flip token opacity or swap to a lighter shade — easy to miss in a
 * static screenshot pass.
 *
 * For each CTA on each route we drive the button through three states
 * with real user gestures and re-measure contrast:
 *
 *   • hover           → `page.hover()` (real mousemove)
 *   • active          → hold `mouse.down()` over the button
 *   • focus-visible   → keyboard focus via `page.keyboard.press("Tab")`
 *                       until the element is `document.activeElement`
 *                       (mouse focus does NOT trigger `:focus-visible`)
 *
 * At each state we check:
 *   1. Button label ≥ 4.5:1 (3:1 for large text) against the resolved
 *      button background.
 *   2. Button border/outline/ring ≥ 3:1 against the surrounding surface
 *      (WCAG 1.4.11 non-text contrast). Ring is read from `outlineColor`
 *      first, then the last non-inset `box-shadow` layer.
 *
 * A minimum of one CTA per route must be exercised — otherwise the
 * test fails so we can't silently pass a route that stopped exposing
 * buttons.
 */

const ROUTES = [
  "/",
  "/revise",
  "/login",
  "/physics",
] as const;

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1280, height: 900 },
] as const;

/** Max CTAs to exercise per route (keeps the run bounded on hub pages). */
const MAX_CTAS_PER_ROUTE = 8;

async function enableDarkTheme(page: Page) {
  await page.addInitScript(() => {
    try {
      localStorage.setItem("theme", "dark");
    } catch {}
  });
  await page.emulateMedia({ colorScheme: "dark" });
}

async function settle(page: Page) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.evaluate(() => (document as any).fonts?.ready).catch(() => {});
  await page
    .waitForFunction(() => document.documentElement.classList.contains("dark"), null, { timeout: 5000 })
    .catch(() => {});
}

type StateSample = {
  state: "rest" | "hover" | "active" | "focus";
  fg: string;
  bg: string;
  textRatio: number;
  textRequired: number;
  ringRatio: number | null;
  ringRequired: number;
  hasRing: boolean;
};

/**
 * Read text + focus-ring contrast for the currently-styled element.
 * Runs entirely in the page so `:hover` / `:focus-visible` pseudo-styles
 * are picked up by `getComputedStyle`.
 */
async function sampleState(
  page: Page,
  target: Locator,
  state: StateSample["state"],
): Promise<StateSample> {
  return await target.evaluate((el, state) => {
    function parse(str: string): [number, number, number, number] | null {
      const m = str.match(
        /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s]+([\d.]+))?/,
      );
      if (!m) return null;
      const a = m[4] === undefined ? 1 : parseFloat(m[4]);
      return [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3]), a];
    }
    function lum([r, g, b]: [number, number, number]) {
      const c = (v: number) => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      };
      return 0.2126 * c(r) + 0.7152 * c(g) + 0.0722 * c(b);
    }
    function contrast(a: number, b: number) {
      const [hi, lo] = a > b ? [a, b] : [b, a];
      return (hi + 0.05) / (lo + 0.05);
    }
    function effectiveBg(node: Element | null): [number, number, number] | null {
      let cur: Element | null = node;
      while (cur && cur !== document.documentElement) {
        const p = parse(getComputedStyle(cur).backgroundColor);
        if (p && p[3] > 0) return [p[0], p[1], p[2]];
        cur = cur.parentElement;
      }
      const body = parse(getComputedStyle(document.body).backgroundColor);
      return body ? [body[0], body[1], body[2]] : null;
    }
    // Extract the outermost non-inset box-shadow layer for a ring colour
    // fallback (shadcn focus rings usually ship as `shadow-ring/50`).
    function ringFromShadow(bs: string): [number, number, number, number] | null {
      if (!bs || bs === "none") return null;
      const layers = bs.split(/,(?![^()]*\))/);
      for (const layer of layers) {
        if (/\binset\b/.test(layer)) continue;
        const m = layer.match(/rgba?\([^)]+\)|#[0-9a-f]{3,8}|hsla?\([^)]+\)/i);
        if (m) return parse(m[0]);
      }
      return null;
    }

    const cs = getComputedStyle(el as Element);
    const parentBg = effectiveBg((el as Element).parentElement);
    const btnBg = effectiveBg(el as Element) || parentBg;
    const fg = parse(cs.color);

    const px = parseFloat(cs.fontSize || "14");
    const weight = parseInt(cs.fontWeight || "400", 10) || 400;
    const isLarge = px >= 24 || (px >= 18.66 && weight >= 700);
    const textRequired = isLarge ? 3.0 : 4.5;

    const textRatio = fg && btnBg
      ? +contrast(lum([fg[0], fg[1], fg[2]]), lum(btnBg)).toFixed(2)
      : 21;

    // Ring detection: outline first, then box-shadow, then border.
    let ringColour = parse(cs.outlineColor);
    const outlineWidth = parseFloat(cs.outlineWidth || "0");
    const outlineStyle = cs.outlineStyle;
    let hasRing = ringColour !== null && ringColour[3] > 0 && outlineWidth >= 1 && outlineStyle !== "none";
    if (!hasRing) {
      const shadow = ringFromShadow(cs.boxShadow);
      if (shadow && shadow[3] > 0) {
        ringColour = shadow;
        hasRing = true;
      }
    }
    if (!hasRing) {
      const b = parse(cs.borderTopColor);
      const bw = parseFloat(cs.borderTopWidth || "0");
      if (b && b[3] > 0 && bw >= 1) {
        ringColour = b;
        hasRing = true;
      }
    }
    const ringRatio = hasRing && ringColour && parentBg
      ? +contrast(lum([ringColour[0], ringColour[1], ringColour[2]]), lum(parentBg)).toFixed(2)
      : null;

    return {
      state,
      fg: fg ? `rgb(${fg[0] | 0},${fg[1] | 0},${fg[2] | 0})` : "n/a",
      bg: btnBg ? `rgb(${btnBg[0] | 0},${btnBg[1] | 0},${btnBg[2] | 0})` : "n/a",
      textRatio,
      textRequired,
      ringRatio,
      ringRequired: 3.0,
      hasRing,
    };
  }, state);
}

/** Tab through focusable elements until `target` gains focus. Caps at 40
 *  tabs so a broken keyboard order can't spin forever. */
async function focusByKeyboard(page: Page, target: Locator): Promise<boolean> {
  const handle = await target.elementHandle();
  if (!handle) return false;
  // Reset focus to <body> so we always start from a known position.
  await page.evaluate(() => (document.body as HTMLElement).focus?.());
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press("Tab");
    const focused = await page.evaluate((el) => document.activeElement === el, handle);
    if (focused) return true;
  }
  return false;
}

for (const vp of VIEWPORTS) {
  test.describe(`dark-mode CTA interaction contrast @ ${vp.name} (${vp.width}×${vp.height})`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    for (const route of ROUTES) {
      test(`hover/active/focus keep AA on ${route}`, async ({ page }) => {
        await enableDarkTheme(page);
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await settle(page);

        // Collect visible CTAs currently in the viewport (or scrollable
        // into it). Icon-only buttons are skipped — they're covered by
        // the resting-state suite and have no user-facing text ratio.
        const ctas = page
          .locator("button, a[role='button'], [data-slot='button']")
          .filter({ hasText: /\S/ });
        const totalCtas = await ctas.count();
        expect(
          totalCtas,
          `${route}: no text-bearing CTAs found — check the selectors or the route`,
        ).toBeGreaterThan(0);

        const failures: string[] = [];
        let exercised = 0;

        for (let i = 0; i < totalCtas && exercised < MAX_CTAS_PER_ROUTE; i++) {
          const cta = ctas.nth(i);
          if (!(await cta.isVisible().catch(() => false))) continue;
          const disabled = await cta.evaluate(
            (el) => (el as HTMLButtonElement).disabled || el.getAttribute("aria-disabled") === "true",
          );
          if (disabled) continue;
          await cta.scrollIntoViewIfNeeded().catch(() => {});
          const box = await cta.boundingBox();
          if (!box || box.width < 8 || box.height < 8) continue;

          const label = (await cta.textContent())?.trim().slice(0, 40) || "(no text)";
          exercised++;

          // --- Rest ---
          await page.mouse.move(0, 0);
          await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur?.());
          const rest = await sampleState(page, cta, "rest");

          // --- Hover ---
          await cta.hover({ trial: false }).catch(() => {});
          await page.waitForTimeout(60); // let transitions land
          const hover = await sampleState(page, cta, "hover");

          // --- Active (still hovered, mouse pressed) ---
          await page.mouse.down();
          await page.waitForTimeout(30);
          const active = await sampleState(page, cta, "active");
          await page.mouse.up();
          await page.mouse.move(0, 0);

          // --- Focus-visible (keyboard) ---
          const focused = await focusByKeyboard(page, cta);
          let focus: StateSample | null = null;
          if (focused) {
            await page.waitForTimeout(30);
            focus = await sampleState(page, cta, "focus");
          }

          for (const s of [rest, hover, active, ...(focus ? [focus] : [])]) {
            if (s.textRatio + 0.01 < s.textRequired) {
              failures.push(
                `  • "${label}" [${s.state}] text ${s.fg} on ${s.bg} = ${s.textRatio} (need ≥ ${s.textRequired})`,
              );
            }
            // Focus-visible MUST expose a discernible ring (WCAG 2.4.7
            // + 1.4.11). Rest/hover/active only fail if a ring exists
            // but is too dim.
            if (s.state === "focus" && !s.hasRing) {
              failures.push(`  • "${label}" [focus] has no visible focus indicator (outline/ring/border)`);
            } else if (s.hasRing && s.ringRatio !== null && s.ringRatio + 0.01 < s.ringRequired) {
              failures.push(
                `  • "${label}" [${s.state}] ring/border ratio ${s.ringRatio} (need ≥ ${s.ringRequired})`,
              );
            }
          }
        }

        expect(exercised, `${route}: no CTAs could be exercised`).toBeGreaterThan(0);
        expect(
          failures,
          `${route}: CTA interaction-state contrast failures (exercised ${exercised} CTAs):\n` +
            failures.join("\n"),
        ).toEqual([]);
      });
    }
  });
}
