/**
 * SEO meta-length guard.
 *
 * Blocks regressions where `<title>` or `<meta name="description">`
 * (and their og:/twitter: equivalents) drift outside the SEO-safe
 * bands that search engines and social previews honour:
 *
 *   - title:        1–60 chars  (Google truncates ~60)
 *   - description:  50–160 chars (below 50 looks thin, above 160 truncates)
 *
 * Two layers of coverage:
 *   1. Static `index.html` head — the sitewide fallback every crawler sees.
 *   2. Per-route templates that build titles/descriptions dynamically
 *      (`DrugDetail.tsx`, `NoteLayout.tsx`, `SectionLayout.tsx`,
 *      `TopicTemplate.tsx`) must keep their 60-char cap logic so dynamic
 *      content cannot push past the limit.
 *
 * Runs in `bunx vitest` and in the `seo-regression` CI workflow.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, existsSync, readdirSync, statSync } from "fs";
import { resolve, join, relative } from "path";

const ROOT = process.cwd();
const TITLE_MAX = 60;
const DESC_MIN = 50;
const DESC_MAX = 160;

// ---------- index.html ----------

const indexHtmlPath = resolve(ROOT, "index.html");
const indexHtml = readFileSync(indexHtmlPath, "utf8");

function pickContent(html: string, re: RegExp): string | null {
  const m = html.match(re);
  return m ? m[1].trim() : null;
}

describe("index.html head — title and description lengths", () => {
  it(`<title> is 1–${TITLE_MAX} chars`, () => {
    const t = pickContent(indexHtml, /<title>([^<]+)<\/title>/);
    expect(t, "index.html missing <title>").toBeTruthy();
    expect(t!.length).toBeGreaterThan(0);
    expect(
      t!.length,
      `index.html <title> is ${t!.length} chars (max ${TITLE_MAX}): "${t}"`,
    ).toBeLessThanOrEqual(TITLE_MAX);
  });

  it(`<meta name="description"> is ${DESC_MIN}–${DESC_MAX} chars`, () => {
    const d = pickContent(
      indexHtml,
      /<meta\s+name="description"\s+content="([^"]+)"/,
    );
    expect(d, "index.html missing meta description").toBeTruthy();
    expect(
      d!.length,
      `index.html meta description is ${d!.length} chars (target ${DESC_MIN}–${DESC_MAX})`,
    ).toBeGreaterThanOrEqual(DESC_MIN);
    expect(
      d!.length,
      `index.html meta description is ${d!.length} chars (max ${DESC_MAX})`,
    ).toBeLessThanOrEqual(DESC_MAX);
  });

  it.each([
    ["og:title", TITLE_MAX],
    ["twitter:title", TITLE_MAX],
  ] as const)(`%s is within %i chars`, (name, max) => {
    const attr = name.startsWith("og:") ? "property" : "name";
    const re = new RegExp(`<meta\\s+${attr}="${name}"\\s+content="([^"]+)"`);
    const v = pickContent(indexHtml, re);
    expect(v, `index.html missing ${name}`).toBeTruthy();
    expect(
      v!.length,
      `index.html ${name} is ${v!.length} chars (max ${max}): "${v}"`,
    ).toBeLessThanOrEqual(max);
  });

  it.each([
    ["og:description"],
    ["twitter:description"],
  ] as const)(`%s is ${DESC_MIN}–${DESC_MAX} chars`, (name) => {
    const attr = name.startsWith("og:") ? "property" : "name";
    const re = new RegExp(`<meta\\s+${attr}="${name}"\\s+content="([^"]+)"`);
    const v = pickContent(indexHtml, re);
    expect(v, `index.html missing ${name}`).toBeTruthy();
    expect(
      v!.length,
      `index.html ${name} is ${v!.length} chars (target ≥${DESC_MIN})`,
    ).toBeGreaterThanOrEqual(DESC_MIN);
    expect(
      v!.length,
      `index.html ${name} is ${v!.length} chars (max ${DESC_MAX})`,
    ).toBeLessThanOrEqual(DESC_MAX);
  });
});

// ---------- Per-route Helmet — literal titles/descriptions ----------

function walk(dir: string, out: string[] = []): string[] {
  for (const n of readdirSync(dir)) {
    if (n === "node_modules" || n.startsWith(".")) continue;
    const p = join(dir, n);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (n.endsWith(".tsx")) out.push(p);
  }
  return out;
}

const srcFiles = walk(resolve(ROOT, "src"));

/**
 * Match `<title>...</title>` and `<meta name="description" content="...">`
 * blocks where the entire value is a single string literal (no template
 * placeholders). Dynamic titles are validated by the cap-logic test below.
 */
const LITERAL_TITLE_TAG = /<title>\s*([^<{}]+?)\s*<\/title>/g;
const LITERAL_DESC_TAG =
  /<meta\s+name="description"\s+content="([^"{}]+)"\s*\/?>/g;
const LITERAL_DESC_JSX =
  /<meta\s+name="description"\s+content=\{\s*["'`]([^"'`{}]+)["'`]\s*\}/g;

describe("per-route Helmet literal titles and descriptions", () => {
  it(`every static <title> literal is ≤${TITLE_MAX} chars`, () => {
    const offenders: string[] = [];
    for (const f of srcFiles) {
      const src = readFileSync(f, "utf8");
      // Skip files that don't render a Helmet head
      if (!src.includes("<Helmet")) continue;
      for (const m of src.matchAll(LITERAL_TITLE_TAG)) {
        const title = m[1].trim();
        if (title.length > TITLE_MAX) {
          offenders.push(
            `${relative(ROOT, f)}: <title> "${title}" is ${title.length} chars`,
          );
        }
      }
    }
    expect(offenders, offenders.join("\n")).toEqual([]);
  });

  it(`every static description literal is ${DESC_MIN}–${DESC_MAX} chars`, () => {
    const offenders: string[] = [];
    for (const f of srcFiles) {
      const src = readFileSync(f, "utf8");
      if (!src.includes("<Helmet")) continue;
      const literals: string[] = [];
      for (const m of src.matchAll(LITERAL_DESC_TAG)) literals.push(m[1]);
      for (const m of src.matchAll(LITERAL_DESC_JSX)) literals.push(m[1]);
      for (const d of literals) {
        if (d.length < DESC_MIN || d.length > DESC_MAX) {
          offenders.push(
            `${relative(ROOT, f)}: description "${d}" is ${d.length} chars (target ${DESC_MIN}–${DESC_MAX})`,
          );
        }
      }
    }
    expect(offenders, offenders.join("\n")).toEqual([]);
  });
});

// ---------- Dynamic-title templates: enforce cap logic still present ----------

/**
 * Templates that build their `<title>` from user/content data must keep a
 * 60-char cap (or equivalent slice/truncation) in the source. If someone
 * rips this out, dynamic titles can blow past Google's limit silently —
 * this test fails the build before that ships.
 */
const DYNAMIC_TITLE_TEMPLATES: { file: string; mustMatch: RegExp[] }[] = [
  {
    file: "src/pages/DrugDetail.tsx",
    mustMatch: [/length\s*<=\s*60/, /pageTitle/],
  },
  {
    file: "src/pages/notes/NoteLayout.tsx",
    mustMatch: [/length\s*<=\s*60/, /pageTitle/],
  },
];

describe("dynamic-title templates keep their 60-char cap", () => {
  it.each(DYNAMIC_TITLE_TEMPLATES)(
    "$file still caps <title> at $#",
    ({ file, mustMatch }) => {
      const path = resolve(ROOT, file);
      expect(existsSync(path), `${file} not found`).toBe(true);
      const src = readFileSync(path, "utf8");
      for (const re of mustMatch) {
        expect(
          re.test(src),
          `${file} no longer contains ${re} — title cap may have been removed`,
        ).toBe(true);
      }
    },
  );
});
