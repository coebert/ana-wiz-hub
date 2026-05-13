import { describe, it, expect } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "fs";
import { resolve, join, relative } from "path";

/**
 * Validate JSON-LD against the BUILT site (dist/**\/*.html) when a build
 * exists. This catches issues that source-scanning can't see (Vite HTML
 * transforms, env substitution, minification stripping properties, etc.).
 *
 * If dist/ is absent we skip — local `bun run test` shouldn't force a build.
 * CI runs `vite build` before tests so the suite executes there.
 */

const SCHEMA_ORG = /^https?:\/\/schema\.org\/?$/;
const REQUIRED: Record<string, string[]> = {
  WebSite: ["name", "url"],
  Organization: ["name", "url"],
  Article: ["headline"],
  Product: ["name"],
  FAQPage: ["mainEntity"],
  BreadcrumbList: ["itemListElement"],
  Course: ["name", "description", "provider"],
  WebPage: ["name"],
  LearningResource: ["name"],
};
const SITEWIDE = ["WebSite", "Organization"];

const REPO = process.cwd();
const DIST = resolve(REPO, "dist");
const has = existsSync(join(DIST, "index.html"));

function walk(dir: string, out: string[] = []): string[] {
  for (const n of readdirSync(dir)) {
    const p = join(dir, n);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (n.endsWith(".html")) out.push(p);
  }
  return out;
}
function rel(p: string) { return relative(REPO, p); }
function blocks(html: string): string[] {
  const re = /<script\b[^>]*\btype\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) out.push(m[1]);
  return out;
}
function flatten(v: unknown, into: Record<string, unknown>[] = []): Record<string, unknown>[] {
  if (Array.isArray(v)) v.forEach((x) => flatten(x, into));
  else if (v && typeof v === "object") {
    const o = v as Record<string, unknown>;
    if (Array.isArray(o["@graph"])) (o["@graph"] as unknown[]).forEach((x) => flatten(x, into));
    else into.push(o);
  }
  return into;
}

const d = has ? describe : describe.skip;

d("JSON-LD validation against built dist/", () => {
  const files = has ? walk(DIST) : [];
  const indexPath = join(DIST, "index.html");

  it("dist/index.html exists with at least one JSON-LD block", () => {
    expect(existsSync(indexPath)).toBe(true);
    const all = blocks(readFileSync(indexPath, "utf8"));
    expect(all.length, "no JSON-LD blocks survived the build").toBeGreaterThan(0);
  });

  it("every JSON-LD block in built HTML parses as JSON", () => {
    const errs: string[] = [];
    for (const f of files) {
      blocks(readFileSync(f, "utf8")).forEach((raw, i) => {
        try { JSON.parse(raw); }
        catch (e) { errs.push(`${rel(f)}#${i}: ${(e as Error).message}`); }
      });
    }
    expect(errs, errs.join("\n")).toEqual([]);
  });

  it("every item has schema.org @context, valid @type, and required properties", () => {
    const errs: string[] = [];
    for (const f of files) {
      blocks(readFileSync(f, "utf8")).forEach((raw, i) => {
        let parsed: unknown;
        try { parsed = JSON.parse(raw); } catch { return; }
        for (const [j, item] of flatten(parsed).entries()) {
          const ctx = item["@context"];
          const t = item["@type"];
          const type = typeof t === "string" ? t : Array.isArray(t) ? String(t[0]) : null;
          if (!(typeof ctx === "string" && SCHEMA_ORG.test(ctx))) {
            errs.push(`${rel(f)}#${i}[${j}]: bad @context ${JSON.stringify(ctx)}`);
          }
          if (!type) { errs.push(`${rel(f)}#${i}[${j}]: missing @type`); continue; }
          const req = REQUIRED[type];
          if (!req) { errs.push(`${rel(f)}#${i}[${j}]: unknown @type "${type}"`); continue; }
          const missing = req.filter((p) => item[p] === undefined || item[p] === null || item[p] === "");
          if (missing.length) errs.push(`${rel(f)}#${i}[${j}]: ${type} missing ${missing.join(", ")}`);
        }
      });
    }
    expect(errs, errs.join("\n")).toEqual([]);
  });

  it("dist/index.html ships sitewide @types (WebSide + Organization)", () => {
    const items = blocks(readFileSync(indexPath, "utf8"))
      .flatMap((raw) => { try { return flatten(JSON.parse(raw)); } catch { return []; } });
    const types = new Set(items.map((o) => (typeof o["@type"] === "string" ? (o["@type"] as string) : null)).filter(Boolean));
    for (const t of SITEWIDE) expect(types.has(t), `built index.html missing sitewide @type ${t}`).toBe(true);
  });
});
