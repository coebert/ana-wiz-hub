import { test, expect, type Page } from "@playwright/test";

/**
 * Diagram text-squish regression tests.
 *
 * Failure mode this catches (regression from /physics/depth-of-anaesthesia,
 * where the DSA spectrogram carried a hard `width: 600px` and squeezed the
 * side panel into a ~90px sliver):
 *
 *   1. A rigid diagram child (fixed px width / min-width) starves its sibling
 *      text column inside the same flex/grid row.
 *   2. The resulting text column renders narrower than a readable measure and
 *      its content overflows horizontally.
 *
 * Assertions per route / viewport:
 *   • Every visible text block (p / li / dd) inside a diagram card renders at
 *     least MIN_TEXT_COL_PX wide.
 *   • No text block overflows its own box horizontally.
 *   • No element inside a diagram card declares a px `min-width` (or fixed
 *     `width`) that exceeds its parent's content width.
 *
 * Run:  npx playwright test tests/visual/diagram-text-squish.spec.ts
 */

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "laptop", width: 1024, height: 768 },
  { name: "desktop", width: 1366, height: 768 },
] as const;

/** Diagram-heavy routes, incl. the route that originally regressed. */
const ROUTES = [
  "/physics/depth-of-anaesthesia",
  "/physics/capnography",
  "/physiology/autonomic-nervous",
  "/pharmacology/opioids",
  "/intensive-care/sepsis",
] as const;

/** Narrowest acceptable rendered width for a diagram text column. */
const MIN_TEXT_COL_PX = 140;
const TOLERANCE_PX = 1;

const CARD_SELECTOR = 'figure, [data-diagram], [data-diagram-card]';

async function settle(page: Page) {
  await page.addStyleTag({
    content: `*,*::before,*::after{animation-duration:0s!important;transition-duration:0s!important}`,
  });
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.evaluate(() => (document as any).fonts?.ready).catch(() => {});
}

type Offender = { where: string; detail: string };

async function findSquishedText(page: Page, minWidth: number) {
  return page.evaluate(
    ({ cardSel, minWidth, tol }) => {
      const out: Offender[] = [];
      const describe = (el: Element) =>
        el.tagName.toLowerCase() +
        ((el as HTMLElement).id ? `#${(el as HTMLElement).id}` : "") +
        ` "${(el.textContent || "").trim().slice(0, 40)}"`;

      document.querySelectorAll<HTMLElement>(cardSel).forEach((card) => {
        card.querySelectorAll<HTMLElement>("p, li, dd").forEach((el) => {
          const cs = getComputedStyle(el);
          if (cs.display === "none" || cs.visibility === "hidden") return;
          if (cs.position === "absolute" || cs.position === "fixed") return;
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) return;
          const text = (el.textContent || "").trim();
          // Ignore short chips/badges and compact stat tiles — they
          // legitimately hug their content.
          if (text.length < 40) return;
          const parentDisplay = el.parentElement
            ? getComputedStyle(el.parentElement).display
            : "";
          if (parentDisplay.includes("grid")) return;
          // Ignore visually-hidden (sr-only) captions and descriptions.
          if (el.closest(".sr-only") || r.width <= 2 || r.height <= 2) return;

          if (r.width < minWidth) {
            out.push({
              where: describe(el),
              detail: `rendered width ${Math.round(r.width)}px < ${minWidth}px`,
            });
          }
          if (el.scrollWidth > el.clientWidth + tol) {
            out.push({
              where: describe(el),
              detail: `overflows horizontally: scrollWidth=${el.scrollWidth} clientWidth=${el.clientWidth}`,
            });
          }
        });
      });
      return out.slice(0, 12) as Offender[];
    },
    { cardSel: CARD_SELECTOR, minWidth, tol: TOLERANCE_PX },
  );
}

async function findRigidWidths(page: Page) {
  return page.evaluate(
    ({ cardSel }) => {
      const out: Offender[] = [];
      const px = (v: string) => (v.endsWith("px") ? parseFloat(v) : NaN);

      document.querySelectorAll<HTMLElement>(cardSel).forEach((card) => {
        card.querySelectorAll<HTMLElement>("*").forEach((el) => {
          const cs = getComputedStyle(el);
          if (cs.display === "none" || cs.visibility === "hidden") return;
          if (cs.position === "absolute" || cs.position === "fixed") return;
          const parent = el.parentElement;
          if (!parent) return;
          const available = parent.clientWidth;
          if (!available) return;

          // A rigid width is fine when it lives in its own horizontal
          // scroller (opt-in wide tables / wide diagrams).
          let scroller: HTMLElement | null = parent;
          let scrolls = false;
          while (scroller && scroller !== document.documentElement) {
            const s = getComputedStyle(scroller);
            if (s.overflowX === "auto" || s.overflowX === "scroll") {
              scrolls = true;
              break;
            }
            scroller = scroller.parentElement;
          }
          if (scrolls) return;

          const minW = px(cs.minWidth);
          if (Number.isFinite(minW) && minW > available + 1) {
            out.push({
              where:
                el.tagName.toLowerCase() +
                (typeof el.className === "string"
                  ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".")
                  : ""),
              detail: `min-width ${minW}px exceeds parent content width ${available}px`,
            });
          }
        });
      });
      return out.slice(0, 12) as Offender[];
    },
    { cardSel: CARD_SELECTOR },
  );
}

for (const viewport of VIEWPORTS) {
  test.describe(`diagram text squish @ ${viewport.name} (${viewport.width}px)`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const route of ROUTES) {
      test(`text columns stay readable on ${route}`, async ({ page }) => {
        const response = await page.goto(route, {
          waitUntil: "domcontentloaded",
        });
        if (response && response.status() >= 400) {
          test.skip(true, `route ${route} unavailable (${response.status()})`);
        }
        await settle(page);

        const cards = await page.locator(CARD_SELECTOR).count();
        if (cards === 0) test.skip(true, `no diagram cards on ${route}`);

        const squished = await findSquishedText(page, MIN_TEXT_COL_PX);
        expect(
          squished,
          `Squished diagram text on ${route} @ ${viewport.name}:\n` +
            squished.map((o) => `  • ${o.where} — ${o.detail}`).join("\n"),
        ).toEqual([]);

        const rigid = await findRigidWidths(page);
        expect(
          rigid,
          `Rigid diagram widths starving siblings on ${route} @ ${viewport.name}:\n` +
            rigid.map((o) => `  • ${o.where} — ${o.detail}`).join("\n"),
        ).toEqual([]);

        const pageOverflow = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));
        expect(
          pageOverflow.scrollWidth,
          `Page overflows horizontally on ${route}`,
        ).toBeLessThanOrEqual(pageOverflow.clientWidth + TOLERANCE_PX);
      });
    }
  });
}
