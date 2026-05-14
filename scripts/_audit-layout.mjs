import { chromium } from "playwright";

const BASE = "https://id-preview--639dd1cf-ba5d-4be1-8c49-a0b9a3d29143.lovable.app";

const ROUTES = [
  "/", "/revise", "/physics", "/physiology", "/pharmacology", "/clinical",
  "/intensive-care", "/perioperative",
  "/clinical/burns-plastics",
  "/clinical/tiva",
  "/physiology/autonomic-nervous",
  "/physiology/cardiac-anatomy",
  "/physiology/foetal-circulation",
  "/clinical/neuroanaesthesia",
  "/intensive-care/icu-sedation-delirium",
  "/anatomy/brachial-plexus",
  "/anatomy/spinal",
  "/clinical/ophthalmic-anaesthesia",
  "/perioperative/elderly-anaesthesia",
];

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1366, height: 768 },
];

const TOL = 1;

async function audit(page, route, vw) {
  await page.goto(BASE + route, { waitUntil: "domcontentloaded", timeout: 30000 }).catch(()=>{});
  await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(()=>{});
  await page.evaluate(() => (document as any).fonts?.ready).catch(()=>{});
  await page.waitForTimeout(400);

  return await page.evaluate((tol) => {
    const vw = document.documentElement.clientWidth;
    const pageScroll = document.documentElement.scrollWidth;
    const offenders: any[] = [];
    const all = document.querySelectorAll<HTMLElement>("body *");
    all.forEach((el) => {
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") return;
      if (cs.position === "fixed" || cs.position === "sticky") return;
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      if (r.right > vw + tol) {
        // skip if inside scroll wrapper
        let cur: HTMLElement | null = el.parentElement;
        let scrollAncestor = false;
        while (cur && cur !== document.documentElement) {
          const a = getComputedStyle(cur);
          if (a.overflowX === "auto" || a.overflowX === "scroll" || a.overflowX === "hidden") { scrollAncestor = true; break; }
          cur = cur.parentElement;
        }
        if (!scrollAncestor) {
          const tag = el.tagName.toLowerCase();
          const id = el.id ? `#${el.id}` : "";
          const cls = typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).slice(0,3).join(".") : "";
          offenders.push({ sel: tag+id+cls, right: Math.round(r.right), w: Math.round(r.width), text: (el.innerText || "").slice(0,60) });
        }
      }
    });
    // Tiny SVGs (diagrams that are too small)
    const tinySvgs: any[] = [];
    document.querySelectorAll("svg[role='img']").forEach((svg) => {
      const r = (svg as SVGElement).getBoundingClientRect();
      if (r.width > 0 && r.width < 260) {
        tinySvgs.push({ aria: svg.getAttribute("aria-label"), w: Math.round(r.width), h: Math.round(r.height) });
      }
    });
    return { vw, pageScroll, pageOverflow: pageScroll > vw + tol, offenders: offenders.slice(0, 8), tinySvgs };
  }, tol);
}

const browser = await chromium.launch();
const results: any[] = [];
for (const v of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: v.width, height: v.height } });
  const page = await ctx.newPage();
  for (const route of ROUTES) {
    try {
      const r = await audit(page, route, v);
      const flagged = r.pageOverflow || r.offenders.length > 0 || r.tinySvgs.length > 0;
      if (flagged) {
        results.push({ vp: v.name, route, ...r });
        console.log(`\n[${v.name}] ${route} pageOverflow=${r.pageOverflow} (sw=${r.pageScroll} vw=${r.vw})`);
        r.offenders.forEach((o:any)=>console.log(`  OVERFLOW ${o.sel} right=${o.right} w=${o.w} "${o.text}"`));
        r.tinySvgs.forEach((s:any)=>console.log(`  TINY SVG aria="${s.aria}" ${s.w}x${s.h}`));
      } else {
        console.log(`[${v.name}] ${route} ok`);
      }
    } catch (e:any) {
      console.log(`[${v.name}] ${route} ERROR ${e.message}`);
    }
  }
  await ctx.close();
}
await browser.close();
import { writeFileSync } from "fs";
writeFileSync("/tmp/audit.json", JSON.stringify(results, null, 2));
console.log("\nSaved /tmp/audit.json. Issues:", results.length);
