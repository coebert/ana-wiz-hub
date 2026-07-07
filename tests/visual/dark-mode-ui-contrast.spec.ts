import { test, expect, type Page } from "@playwright/test";

/**
 * Dark-mode WCAG AA contrast regression for interactive UI primitives.
 *
 * Sibling of `dark-mode-regression.spec.ts` (page-level) and
 * `dark-mode-diagrams-contrast.spec.ts` (SVG labels). This suite targets
 * the three surfaces users interact with most:
 *
 *   1. CTA buttons — every `<button>` and `role="button"` that carries
 *      visible text. Both the resting state AND the focus-visible state
 *      are sampled (focus rings often collapse in dark mode).
 *   2. Cards — anything shadcn ships as `.rounded-lg.border.bg-card` or
 *      elements with `data-slot="card"`. Body text and heading text are
 *      checked against the card surface.
 *   3. Form controls — `<input>`, `<textarea>`, `<select>` and their
 *      shadcn wrappers. Placeholder and value colours are checked
 *      against the control surface; associated label text is checked
 *      against its own effective background.
 *
 * WCAG AA thresholds:
 *   - Normal text: ≥ 4.5:1
 *   - Large text (≥18pt, or ≥14pt bold): ≥ 3.0:1
 *   - Non-text UI (button borders, focus rings, input borders): ≥ 3.0:1
 *
 * Routes cover Landing (hero CTAs), `/revise` (mixed UI), `/login`
 * (form-heavy) and a section index (card grid). Viewports mirror the
 * rest of the dark-mode suite: 390×844 mobile, 1280×900 desktop.
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

for (const vp of VIEWPORTS) {
  test.describe(`dark-mode UI contrast @ ${vp.name} (${vp.width}×${vp.height})`, () => {
    test.use({ viewport: { width: vp.width, height: vp.height } });

    for (const route of ROUTES) {
      test(`CTAs, cards, form controls hit WCAG AA on ${route}`, async ({ page }) => {
        await enableDarkTheme(page);
        await page.goto(route, { waitUntil: "domcontentloaded" });
        await settle(page);

        // Focus the first visible button-like control so we also sample
        // the focus-visible variant. If none exists this is a no-op.
        await page
          .evaluate(() => {
            const el = Array.from(
              document.querySelectorAll<HTMLElement>("button, [role='button']"),
            ).find((e) => {
              const r = e.getBoundingClientRect();
              return r.width > 0 && r.height > 0 && !e.hasAttribute("disabled");
            });
            el?.focus();
            return !!el;
          })
          .catch(() => false);

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
              const p = parse(getComputedStyle(cur).backgroundColor);
              if (p && p[3] > 0) return [p[0], p[1], p[2]];
              cur = cur.parentElement;
            }
            const body = parse(getComputedStyle(document.body).backgroundColor);
            return body ? [body[0], body[1], body[2]] : null;
          }
          function isVisible(el: HTMLElement) {
            const cs = getComputedStyle(el);
            if (cs.display === "none" || cs.visibility === "hidden") return false;
            if (parseFloat(cs.opacity || "1") < 0.4) return false;
            const r = el.getBoundingClientRect();
            return r.width >= 12 && r.height >= 12;
          }
          function describe(el: Element) {
            const id = (el as HTMLElement).id ? `#${(el as HTMLElement).id}` : "";
            const cls =
              typeof (el as HTMLElement).className === "string"
                ? "." +
                  (el as HTMLElement).className
                    .trim()
                    .split(/\s+/)
                    .slice(0, 2)
                    .join(".")
                : "";
            const t = (el.textContent || "").trim().slice(0, 40);
            return `${el.tagName.toLowerCase()}${id}${cls} "${t}"`;
          }
          function ownText(el: HTMLElement) {
            return Array.from(el.childNodes)
              .filter((n) => n.nodeType === Node.TEXT_NODE)
              .map((n) => (n.textContent || "").trim())
              .join(" ")
              .trim();
          }
          function requiredRatio(cs: CSSStyleDeclaration) {
            const px = parseFloat(cs.fontSize || "14");
            const weight = parseInt(cs.fontWeight || "400", 10) || 400;
            const isLarge = px >= 24 || (px >= 18.66 && weight >= 700);
            return isLarge ? 3.0 : 4.5;
          }

          type Hit = {
            kind: "cta-text" | "cta-border" | "cta-focus-ring" | "card-text" | "control-text" | "control-border" | "label-text";
            selector: string;
            fg: string;
            bg: string;
            ratio: number;
            required: number;
          };
          const hits: Hit[] = [];
          const counts = { ctas: 0, cards: 0, controls: 0, labels: 0 };

          function rgbStr(c: [number, number, number]) {
            return `rgb(${c[0] | 0},${c[1] | 0},${c[2] | 0})`;
          }

          // --- 1. CTA buttons ---
          const buttons = Array.from(
            document.querySelectorAll<HTMLElement>("button, a[role='button'], [data-slot='button']"),
          ).filter(isVisible);
          buttons.forEach((btn) => {
            const text = (btn.textContent || "").trim();
            if (!text) return; // icon-only buttons have their own a11y story
            counts.ctas++;
            const cs = getComputedStyle(btn);
            const fg = parse(cs.color);
            const bg = effectiveBg(btn);
            if (fg && bg) {
              const r = contrast(lum([fg[0], fg[1], fg[2]]), lum(bg));
              const need = requiredRatio(cs);
              if (r + 0.01 < need) {
                hits.push({
                  kind: "cta-text",
                  selector: describe(btn),
                  fg: rgbStr([fg[0], fg[1], fg[2]]),
                  bg: rgbStr(bg),
                  ratio: +r.toFixed(2),
                  required: need,
                });
              }
            }
            // Non-text UI: border contrast against the surrounding surface.
            const border = parse(cs.borderTopColor);
            const parentBg = effectiveBg(btn.parentElement);
            const borderWidth = parseFloat(cs.borderTopWidth || "0");
            if (border && border[3] > 0 && borderWidth >= 1 && parentBg) {
              const r = contrast(lum([border[0], border[1], border[2]]), lum(parentBg));
              if (r + 0.01 < 3.0) {
                hits.push({
                  kind: "cta-border",
                  selector: describe(btn),
                  fg: rgbStr([border[0], border[1], border[2]]),
                  bg: rgbStr(parentBg),
                  ratio: +r.toFixed(2),
                  required: 3.0,
                });
              }
            }
            // Focus-visible ring when this is the focused element.
            if (document.activeElement === btn) {
              const ring = parse(cs.outlineColor);
              const ringWidth = parseFloat(cs.outlineWidth || "0");
              const bs = cs.boxShadow;
              const hasRing = (ring && ring[3] > 0 && ringWidth >= 1) || (bs && bs !== "none");
              if (ring && hasRing && parentBg) {
                const r = contrast(lum([ring[0], ring[1], ring[2]]), lum(parentBg));
                if (r + 0.01 < 3.0) {
                  hits.push({
                    kind: "cta-focus-ring",
                    selector: describe(btn),
                    fg: rgbStr([ring[0], ring[1], ring[2]]),
                    bg: rgbStr(parentBg),
                    ratio: +r.toFixed(2),
                    required: 3.0,
                  });
                }
              }
            }
          });

          // --- 2. Cards ---
          const cards = Array.from(
            document.querySelectorAll<HTMLElement>(
              "[data-slot='card'], .rounded-lg.border.bg-card, .rounded-xl.border.bg-card",
            ),
          ).filter(isVisible);
          cards.forEach((card) => {
            counts.cards++;
            const cardBg = effectiveBg(card);
            if (!cardBg) return;
            const textNodes = Array.from(
              card.querySelectorAll<HTMLElement>("h1,h2,h3,h4,h5,h6,p,li,span,div,dd,dt"),
            ).filter(isVisible);
            textNodes.forEach((el) => {
              const own = ownText(el);
              if (!own) return;
              const cs = getComputedStyle(el);
              const fg = parse(cs.color);
              const bg = effectiveBg(el) || cardBg;
              if (!fg) return;
              const r = contrast(lum([fg[0], fg[1], fg[2]]), lum(bg));
              const need = requiredRatio(cs);
              if (r + 0.01 < need) {
                hits.push({
                  kind: "card-text",
                  selector: describe(el),
                  fg: rgbStr([fg[0], fg[1], fg[2]]),
                  bg: rgbStr(bg),
                  ratio: +r.toFixed(2),
                  required: need,
                });
              }
            });
          });

          // --- 3. Form controls + labels ---
          const controls = Array.from(
            document.querySelectorAll<HTMLElement>(
              "input:not([type='hidden']), textarea, select, [data-slot='input'], [data-slot='textarea']",
            ),
          ).filter(isVisible);
          controls.forEach((ctrl) => {
            counts.controls++;
            const cs = getComputedStyle(ctrl);
            const fg = parse(cs.color);
            const bg = effectiveBg(ctrl);
            if (fg && bg) {
              const r = contrast(lum([fg[0], fg[1], fg[2]]), lum(bg));
              const need = requiredRatio(cs);
              if (r + 0.01 < need) {
                hits.push({
                  kind: "control-text",
                  selector: describe(ctrl),
                  fg: rgbStr([fg[0], fg[1], fg[2]]),
                  bg: rgbStr(bg),
                  ratio: +r.toFixed(2),
                  required: need,
                });
              }
            }
            // Border of the control against the page — must be
            // discernible or blind users can't perceive the input.
            const border = parse(cs.borderTopColor);
            const borderWidth = parseFloat(cs.borderTopWidth || "0");
            const parentBg = effectiveBg(ctrl.parentElement);
            if (border && border[3] > 0 && borderWidth >= 1 && parentBg) {
              const r = contrast(lum([border[0], border[1], border[2]]), lum(parentBg));
              if (r + 0.01 < 3.0) {
                hits.push({
                  kind: "control-border",
                  selector: describe(ctrl),
                  fg: rgbStr([border[0], border[1], border[2]]),
                  bg: rgbStr(parentBg),
                  ratio: +r.toFixed(2),
                  required: 3.0,
                });
              }
            }
          });

          const labels = Array.from(document.querySelectorAll<HTMLElement>("label")).filter(isVisible);
          labels.forEach((lbl) => {
            const own = ownText(lbl);
            if (!own) return;
            counts.labels++;
            const cs = getComputedStyle(lbl);
            const fg = parse(cs.color);
            const bg = effectiveBg(lbl);
            if (!fg || !bg) return;
            const r = contrast(lum([fg[0], fg[1], fg[2]]), lum(bg));
            const need = requiredRatio(cs);
            if (r + 0.01 < need) {
              hits.push({
                kind: "label-text",
                selector: describe(lbl),
                fg: rgbStr([fg[0], fg[1], fg[2]]),
                bg: rgbStr(bg),
                ratio: +r.toFixed(2),
                required: need,
              });
            }
          });

          return { counts, hits: hits.slice(0, 25) };
        });

        const { counts, hits } = report;
        // Guard: at least one of the three surfaces must have been present
        // on this route, otherwise the test silently passes.
        expect(
          counts.ctas + counts.cards + counts.controls,
          `${route}: no CTAs / cards / form controls detected — check the route selector`,
        ).toBeGreaterThan(0);

        expect(
          hits,
          `${route}: dark-mode contrast failures (sampled ` +
            `${counts.ctas} CTAs, ${counts.cards} cards, ${counts.controls} controls, ` +
            `${counts.labels} labels):\n` +
            hits
              .map(
                (h) =>
                  `  • [${h.kind}] ${h.selector}\n      fg=${h.fg} on bg=${h.bg} ratio=${h.ratio} (need ≥ ${h.required})`,
              )
              .join("\n"),
        ).toEqual([]);
      });
    }
  });
}
