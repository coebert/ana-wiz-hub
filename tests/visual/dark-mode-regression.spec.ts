import { test, expect, type Page } from "@playwright/test";

/**
 * Dark-mode visual regression tests.
 *
 * next-themes toggles dark mode by adding a `.dark` class to `<html>`.
 * We flip the theme before navigation via localStorage, then assert:
 *
 *   1. `<html>` actually carries the `dark` class (theme provider hydrated).
 *   2. `<body>` renders on a genuinely dark surface (relative luminance
 *      < 0.2) with a light foreground (luminance > 0.6) — catches a
 *      class of regression where the token layer flips but the base
 *      surface stays white.
 *   3. Body text vs body background hits WCAG AA contrast (≥ 4.5:1).
 *   4. No visible element uses a hardcoded light-on-light combination
 *      (bg luminance > 0.85 AND text luminance > 0.85). This catches
 *      components that ship `bg-white` / `text-white` literals instead
 *      of semantic tokens — a common cause of blinding cards in dark
 *      mode.
 *
 * Routes span Landing, Index (`/revise`), an editorial section index,
 * and two topic pages so we exercise `PageContainer`, `SectionLayout`
 * and the topic body layouts.
 */

const ROUTES = [
  "/",
  "/revise",
  "/physics",
  "/physiology",
  "/physiology/autonomic-nervous",
  "/clinical/tiva",
] as const;

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1280, height: 900 },
] as const;

/** WCAG relative-luminance for an sRGB triple. */
function relLuminance([r, g, b]: [number, number, number]): number {
  const conv = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const [R, G, B] = [conv(r), conv(g), conv(b)];
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrastRatio(a: number, b: number): number {
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

/** Parse a `rgb(r, g, b)` / `rgba(r, g, b, a)` string. Returns null if
 *  the colour is fully transparent (so we can walk up the tree). */
function parseRgb(str: string): [number, number, number] | null {
  const m = str.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s]+([\d.]+))?/);
  if (!m) return null;
  const a = m[4] === undefined ? 1 : parseFloat(m[4]);
  if (a === 0) return null;
  return [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])];
}

async function enableDarkTheme(page: Page) {
  // next-themes reads `theme` from localStorage on hydrate. Set it
  // before ANY page script runs so we never see a light-mode flash.
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
  // Wait for next-themes to apply the class.
  await page
    .waitForFunction(() => document.documentElement.classList.contains("dark"), null, { timeout: 5000 })
    .catch(() => {});
}

for (const vp of VIEWPORTS) {
  test.describe(`dark mode @ ${vp.name} (${vp.width}×${vp.height})`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    for (const route of ROUTES) {
      test(`dark surface + contrast on ${route}`, async ({ page }) => {
        await enableDarkTheme(page);
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await settle(page);

        // 1. `.dark` class present on <html>.
        const isDark = await page.evaluate(() =>
          document.documentElement.classList.contains("dark")
        );
        expect(isDark, `${route}: <html> missing .dark class`).toBe(true);

        // 2 + 3. Body surface + foreground luminance & contrast.
        const body = await page.evaluate(() => {
          const cs = getComputedStyle(document.body);
          return { bg: cs.backgroundColor, fg: cs.color };
        });
        const bgRgb = parseRgb(body.bg);
        const fgRgb = parseRgb(body.fg);
        expect(bgRgb, `${route}: body has transparent background`).not.toBeNull();
        expect(fgRgb, `${route}: body has transparent foreground`).not.toBeNull();
        const bgLum = relLuminance(bgRgb!);
        const fgLum = relLuminance(fgRgb!);
        expect(
          bgLum,
          `${route}: body background luminance=${bgLum.toFixed(3)} is not dark`
        ).toBeLessThan(0.2);
        expect(
          fgLum,
          `${route}: body foreground luminance=${fgLum.toFixed(3)} is not light`
        ).toBeGreaterThan(0.6);
        const ratio = contrastRatio(bgLum, fgLum);
        expect(
          ratio,
          `${route}: body contrast ratio=${ratio.toFixed(2)} < 4.5`
        ).toBeGreaterThanOrEqual(4.5);

        // 4. Scan every visible element for light-on-light combos.
        //    We resolve transparent backgrounds up the tree so we don't
        //    flag legitimate transparent wrappers.
        const offenders = await page.evaluate(() => {
          function parse(str: string): [number, number, number] | null {
            const m = str.match(
              /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s]+([\d.]+))?/
            );
            if (!m) return null;
            const a = m[4] === undefined ? 1 : parseFloat(m[4]);
            if (a === 0) return null;
            return [parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])];
          }
          function lum([r, g, b]: [number, number, number]) {
            const c = (v: number) => {
              const s = v / 255;
              return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
            };
            return 0.2126 * c(r) + 0.7152 * c(g) + 0.0722 * c(b);
          }
          function effectiveBg(el: Element): [number, number, number] | null {
            let cur: Element | null = el;
            while (cur && cur !== document.documentElement) {
              const bg = parse(getComputedStyle(cur).backgroundColor);
              if (bg) return bg;
              cur = cur.parentElement;
            }
            return null;
          }
          function describe(el: Element): string {
            const id = (el as HTMLElement).id ? `#${(el as HTMLElement).id}` : "";
            const cls =
              typeof (el as HTMLElement).className === "string"
                ? "." + (el as HTMLElement).className.trim().split(/\s+/).slice(0, 3).join(".")
                : "";
            return `${el.tagName.toLowerCase()}${id}${cls}`;
          }
          const hits: { selector: string; bgLum: number; fgLum: number; text: string }[] = [];
          const nodes = document.querySelectorAll<HTMLElement>("body *");
          nodes.forEach((el) => {
            const cs = getComputedStyle(el);
            if (cs.display === "none" || cs.visibility === "hidden" || parseFloat(cs.opacity) === 0)
              return;
            const rect = el.getBoundingClientRect();
            if (rect.width < 8 || rect.height < 8) return;
            const text = (el.textContent || "").trim();
            if (!text) return;
            // Only care about elements that actually paint their own text
            // (skip pure wrappers whose text lives in a child element).
            const hasOwnText = Array.from(el.childNodes).some(
              (n) => n.nodeType === Node.TEXT_NODE && (n.textContent || "").trim().length > 0
            );
            if (!hasOwnText) return;
            const bg = effectiveBg(el);
            const fg = parse(cs.color);
            if (!bg || !fg) return;
            const bl = lum(bg);
            const fl = lum(fg);
            if (bl > 0.85 && fl > 0.85) {
              hits.push({
                selector: describe(el),
                bgLum: +bl.toFixed(3),
                fgLum: +fl.toFixed(3),
                text: text.slice(0, 60),
              });
            }
          });
          return hits.slice(0, 10);
        });
        expect(
          offenders,
          `${route}: light-on-light elements in dark mode:\n` +
            offenders
              .map((o) => `  • ${o.selector} bg=${o.bgLum} fg=${o.fgLum} "${o.text}"`)
              .join("\n")
        ).toEqual([]);
      });
    }
  });
}
