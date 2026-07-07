import { test, expect, type Page } from "@playwright/test";

/**
 * Dark-mode contrast regression for animated diagrams.
 *
 * Complements `dark-mode-regression.spec.ts` (page-level surfaces) by
 * walking every diagram figure on diagram-heavy topic pages and asserting:
 *
 *   1. Each figure paints on a genuinely dark effective background
 *      (luminance < 0.35 — diagram cards use bg-card which sits slightly
 *      above the page surface, so we allow a bit more headroom than the
 *      body check).
 *   2. Every visible SVG `<text>` / `<tspan>` inside a diagram meets WCAG
 *      AA contrast against its resolved background:
 *         - ≥ 4.5:1 for normal text
 *         - ≥ 3.0:1 for large text (≥18pt, or ≥14pt bold)
 *      Fills of `currentColor` / `inherit` resolve via `getComputedStyle`,
 *      so components using semantic tokens pass automatically.
 *   3. Any label rendered via foreignObject / HTML overlays inside the
 *      figure obeys the same contrast rule.
 *
 * The static test `src/test/diagrams-dark-mode-contrast.test.ts` catches
 * *source-level* offenders (dark hex literals, `text-black`, etc.). This
 * spec catches *rendered* offenders — e.g. a light token that resolves to
 * a near-white value on a near-white gradient, or a diagram whose bg
 * accidentally stays light because a wrapper hardcodes `bg-white`.
 */

const DIAGRAM_ROUTES = [
  "/physiology/autonomic-nervous",
  "/clinical/tiva",
  "/physics",
  "/physiology",
] as const;

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1280, height: 900 },
] as const;

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
  // LazyDiagrams defers mounting until near the viewport — scroll the
  // page from top to bottom in chunks so IntersectionObservers fire for
  // every figure, then return to top and wait for paint.
  await page.evaluate(async () => {
    const h = document.documentElement.scrollHeight;
    const step = Math.max(400, window.innerHeight);
    for (let y = 0; y < h; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 200));
  });
  await page.waitForLoadState("networkidle").catch(() => {});
}

for (const vp of VIEWPORTS) {
  test.describe(`diagram dark-mode contrast @ ${vp.name} (${vp.width}×${vp.height})`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    for (const route of DIAGRAM_ROUTES) {
      test(`figures + labels stay legible on ${route}`, async ({ page }) => {
        await enableDarkTheme(page);
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await settle(page);

        const report = await page.evaluate(() => {
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
          function effectiveBg(el: Element | null): [number, number, number] | null {
            let cur: Element | null = el;
            while (cur && cur !== document.documentElement) {
              const raw = getComputedStyle(cur).backgroundColor;
              const p = parse(raw);
              if (p && p[3] > 0) return [p[0], p[1], p[2]];
              cur = cur.parentElement;
            }
            const html = parse(getComputedStyle(document.body).backgroundColor);
            return html ? [html[0], html[1], html[2]] : null;
          }
          function describe(el: Element): string {
            const fig = el.closest("figure,[role='figure'],[data-diagram-id]") as HTMLElement | null;
            const id = fig?.getAttribute("data-diagram-id") || fig?.id || "";
            const tag = el.tagName.toLowerCase();
            const t = (el.textContent || "").trim().slice(0, 40);
            return `${id ? `[${id}] ` : ""}${tag} "${t}"`;
          }

          const figureOffenders: {
            selector: string;
            bgLum: number;
          }[] = [];
          const labelOffenders: {
            selector: string;
            fg: string;
            bg: string;
            ratio: number;
            required: number;
          }[] = [];

          // Every rendered diagram figure. LazyDiagrams wraps them in
          // DiagramFigure which renders a <figure> with a bordered card.
          const figures = Array.from(
            document.querySelectorAll<HTMLElement>(
              "figure, [role='figure'], [data-diagram-id]",
            ),
          ).filter((f) => f.querySelector("svg, canvas, foreignObject"));

          let sampledFigures = 0;
          let sampledLabels = 0;

          figures.forEach((fig) => {
            const rect = fig.getBoundingClientRect();
            if (rect.width < 40 || rect.height < 40) return;
            sampledFigures++;

            // 1) Figure background luminance.
            const bg = effectiveBg(fig);
            if (bg) {
              const bl = lum(bg);
              if (bl > 0.35) {
                figureOffenders.push({
                  selector: describe(fig),
                  bgLum: +bl.toFixed(3),
                });
              }
            }

            // 2) SVG text + tspan contrast.
            const texts = Array.from(
              fig.querySelectorAll<SVGTextElement | SVGTSpanElement>("text, tspan"),
            );
            texts.forEach((t) => {
              const cs = getComputedStyle(t);
              if (cs.display === "none" || cs.visibility === "hidden") return;
              if (parseFloat(cs.opacity || "1") < 0.4) return;
              const content = (t.textContent || "").trim();
              if (!content) return;
              // Skip elements that never actually paint (0-size bbox).
              try {
                const b = (t as SVGGraphicsElement).getBBox();
                if (b.width < 1 || b.height < 1) return;
              } catch {
                return;
              }

              // Resolve fill: prefer computed `fill`, fall back to `color`
              // for `currentColor`.
              let fillStr = cs.fill;
              if (!fillStr || fillStr === "none" || fillStr === "currentcolor" || fillStr === "currentColor") {
                fillStr = cs.color;
              }
              const fg = parse(fillStr);
              const parentBg = effectiveBg(t.parentElement);
              if (!fg || !parentBg) return;
              const fl = lum([fg[0], fg[1], fg[2]]);
              const bl = lum(parentBg);
              const ratio = contrast(fl, bl);

              const px = parseFloat(cs.fontSize || "12");
              const weight = parseInt(cs.fontWeight || "400", 10) || 400;
              // WCAG "large text" = ≥18pt (≈24px) OR ≥14pt bold (≈18.66px + weight ≥ 700).
              const isLarge = px >= 24 || (px >= 18.66 && weight >= 700);
              const required = isLarge ? 3.0 : 4.5;

              sampledLabels++;
              if (ratio + 0.01 < required) {
                labelOffenders.push({
                  selector: describe(t),
                  fg: `rgb(${fg[0]|0},${fg[1]|0},${fg[2]|0})`,
                  bg: `rgb(${parentBg[0]|0},${parentBg[1]|0},${parentBg[2]|0})`,
                  ratio: +ratio.toFixed(2),
                  required,
                });
              }
            });

            // 3) HTML labels rendered inside foreignObject or overlays.
            const htmlLabels = Array.from(
              fig.querySelectorAll<HTMLElement>("foreignObject *, [data-diagram-label]"),
            );
            htmlLabels.forEach((el) => {
              const cs = getComputedStyle(el);
              if (cs.display === "none" || cs.visibility === "hidden") return;
              const text = (el.textContent || "").trim();
              if (!text) return;
              const hasOwnText = Array.from(el.childNodes).some(
                (n) => n.nodeType === Node.TEXT_NODE && (n.textContent || "").trim().length > 0,
              );
              if (!hasOwnText) return;
              const fg = parse(cs.color);
              const bg = effectiveBg(el);
              if (!fg || !bg) return;
              const ratio = contrast(lum([fg[0], fg[1], fg[2]]), lum(bg));
              const px = parseFloat(cs.fontSize || "14");
              const weight = parseInt(cs.fontWeight || "400", 10) || 400;
              const isLarge = px >= 24 || (px >= 18.66 && weight >= 700);
              const required = isLarge ? 3.0 : 4.5;
              sampledLabels++;
              if (ratio + 0.01 < required) {
                labelOffenders.push({
                  selector: describe(el),
                  fg: `rgb(${fg[0]|0},${fg[1]|0},${fg[2]|0})`,
                  bg: `rgb(${bg[0]|0},${bg[1]|0},${bg[2]|0})`,
                  ratio: +ratio.toFixed(2),
                  required,
                });
              }
            });
          });

          return {
            sampledFigures,
            sampledLabels,
            figureOffenders: figureOffenders.slice(0, 10),
            labelOffenders: labelOffenders.slice(0, 15),
          };
        });

        // Guard: the routes above must actually surface diagrams, otherwise
        // this test would silently pass with zero assertions.
        expect(report.sampledFigures, `${route}: no diagram figures rendered`).toBeGreaterThan(0);

        expect(
          report.figureOffenders,
          `${route}: figures with light backgrounds in dark mode:\n` +
            report.figureOffenders
              .map((f) => `  • ${f.selector} bgLum=${f.bgLum}`)
              .join("\n"),
        ).toEqual([]);

        expect(
          report.labelOffenders,
          `${route}: diagram labels below WCAG AA contrast in dark mode ` +
            `(sampled ${report.sampledLabels}):\n` +
            report.labelOffenders
              .map(
                (o) =>
                  `  • ${o.selector} fg=${o.fg} on bg=${o.bg} ratio=${o.ratio} (need ≥ ${o.required})`,
              )
              .join("\n"),
        ).toEqual([]);
      });
    }
  });
}
