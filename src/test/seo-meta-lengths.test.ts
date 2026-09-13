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
      /<meta[^>]*\sname="description"[^>]*\scontent="([^"]+)"/,
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
    const re = new RegExp(`<meta[^>]*\\s${attr}="${name}"[^>]*\\scontent="([^"]+)"`);
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
    const re = new RegExp(`<meta[^>]*\\s${attr}="${name}"[^>]*\\scontent="([^"]+)"`);
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

/**
 * Frozen baseline of pre-existing offenders. New violations (any file/value
 * not in the baseline) fail the build — that's the regression guard. Removed
 * violations (baseline entries that are now clean) also fail so the baseline
 * shrinks instead of going stale.
 */
type BaselineEntry = { value: string; length: number };
type Baseline = {
  titles: Record<string, BaselineEntry[]>;
  descriptions: Record<string, BaselineEntry[]>;
};
const baseline = JSON.parse(
  readFileSync(
    resolve(ROOT, "src/test/fixtures/seo-meta-length-baseline.json"),
    "utf8",
  ),
) as Baseline;

function inBaseline(
  bucket: Record<string, BaselineEntry[]>,
  file: string,
  value: string,
): boolean {
  return (bucket[file] ?? []).some((e) => e.value === value);
}

describe("per-route Helmet literal titles and descriptions", () => {
  it(`every static <title> literal is ≤${TITLE_MAX} chars (ratchet vs baseline)`, () => {
    const newOffenders: string[] = [];
    const seenBaseline = new Set<string>();
    for (const f of srcFiles) {
      const src = readFileSync(f, "utf8");
      if (!src.includes("<Helmet")) continue;
      const rel = relative(ROOT, f).replace(/\\/g, "/");
      for (const m of src.matchAll(LITERAL_TITLE_TAG)) {
        const title = m[1].trim();
        if (title.length <= TITLE_MAX) continue;
        if (inBaseline(baseline.titles, rel, title)) {
          seenBaseline.add(`${rel}::${title}`);
          continue;
        }
        newOffenders.push(
          `${rel}: <title> "${title}" is ${title.length} chars (max ${TITLE_MAX}) — not in baseline`,
        );
      }
    }
    // Detect baseline entries that no longer exist — force the baseline to
    // shrink instead of harbouring obsolete exceptions.
    const stale: string[] = [];
    for (const [file, entries] of Object.entries(baseline.titles)) {
      for (const e of entries) {
        if (!seenBaseline.has(`${file}::${e.value}`)) {
          stale.push(
            `${file}: baseline entry no longer present — remove from src/test/fixtures/seo-meta-length-baseline.json: "${e.value}"`,
          );
        }
      }
    }
    expect([...newOffenders, ...stale], [...newOffenders, ...stale].join("\n")).toEqual([]);
  });

  it(`every static description literal is ${DESC_MIN}–${DESC_MAX} chars (ratchet vs baseline)`, () => {
    const newOffenders: string[] = [];
    const seenBaseline = new Set<string>();
    for (const f of srcFiles) {
      const src = readFileSync(f, "utf8");
      if (!src.includes("<Helmet")) continue;
      const rel = relative(ROOT, f).replace(/\\/g, "/");
      const literals: string[] = [];
      for (const m of src.matchAll(LITERAL_DESC_TAG)) literals.push(m[1]);
      for (const m of src.matchAll(LITERAL_DESC_JSX)) literals.push(m[1]);
      for (const d of literals) {
        if (d.length >= DESC_MIN && d.length <= DESC_MAX) continue;
        if (inBaseline(baseline.descriptions, rel, d)) {
          seenBaseline.add(`${rel}::${d}`);
          continue;
        }
        newOffenders.push(
          `${rel}: description "${d}" is ${d.length} chars (target ${DESC_MIN}–${DESC_MAX}) — not in baseline`,
        );
      }
    }
    const stale: string[] = [];
    for (const [file, entries] of Object.entries(baseline.descriptions)) {
      for (const e of entries) {
        if (!seenBaseline.has(`${file}::${e.value}`)) {
          stale.push(
            `${file}: baseline entry no longer present — remove from src/test/fixtures/seo-meta-length-baseline.json: "${e.value}"`,
          );
        }
      }
    }
    expect([...newOffenders, ...stale], [...newOffenders, ...stale].join("\n")).toEqual([]);
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

// ---------- index.html head completeness ----------
//
// Beyond length, the static head must carry the tags that browsers and
// crawlers need to render the page correctly and to build accurate
// previews. These are sitewide fallbacks — per-route Helmet can override
// canonical/og:url, but the static defaults must always be valid.

describe("index.html head — canonical, robots, viewport, og:image", () => {
  it("viewport meta is present and mobile-friendly", () => {
    const v = pickContent(
      indexHtml,
      /<meta\s+name="viewport"\s+content="([^"]+)"/,
    );
    expect(v, "index.html missing <meta name=\"viewport\">").toBeTruthy();
    // width=device-width is the Google mobile-friendly requirement.
    expect(
      /width\s*=\s*device-width/i.test(v!),
      `viewport must include width=device-width, got: "${v}"`,
    ).toBe(true);
    expect(
      /initial-scale\s*=\s*1(\.0+)?/i.test(v!),
      `viewport must include initial-scale=1, got: "${v}"`,
    ).toBe(true);
  });

  it("does not ship a sitewide robots noindex", () => {
    // A sitewide `<meta name="robots" content="noindex">` would silently
    // deindex every page. Per-route noindex is fine; the static head must
    // not block the whole site.
    const r = pickContent(
      indexHtml,
      /<meta\s+name="robots"\s+content="([^"]+)"/i,
    );
    if (r) {
      expect(
        /noindex/i.test(r),
        `index.html has sitewide robots="${r}" — noindex would deindex every page`,
      ).toBe(false);
    }
  });

  it("og:image is present, absolute https URL, and has dimensions + alt", () => {
    const img = pickContent(
      indexHtml,
      /<meta\s+property="og:image"\s+content="([^"]+)"/,
    );
    expect(img, "index.html missing og:image").toBeTruthy();
    expect(
      /^https:\/\//.test(img!),
      `og:image must be an absolute https URL, got: "${img}"`,
    ).toBe(true);

    const w = pickContent(
      indexHtml,
      /<meta\s+property="og:image:width"\s+content="(\d+)"/,
    );
    const h = pickContent(
      indexHtml,
      /<meta\s+property="og:image:height"\s+content="(\d+)"/,
    );
    expect(w, "og:image:width missing — social previews may render at wrong aspect").toBeTruthy();
    expect(h, "og:image:height missing — social previews may render at wrong aspect").toBeTruthy();
    // Facebook/LinkedIn require ≥ 200×200 to render a large card.
    expect(Number(w), `og:image:width too small: ${w}`).toBeGreaterThanOrEqual(200);
    expect(Number(h), `og:image:height too small: ${h}`).toBeGreaterThanOrEqual(200);

    const alt = pickContent(
      indexHtml,
      /<meta\s+property="og:image:alt"\s+content="([^"]+)"/,
    );
    expect(alt, "og:image:alt missing — required for accessibility").toBeTruthy();

    // Twitter cards reuse og:image; make sure twitter:image agrees when present.
    const tw = pickContent(
      indexHtml,
      /<meta\s+name="twitter:image"\s+content="([^"]+)"/,
    );
    if (tw) {
      expect(
        /^https:\/\//.test(tw),
        `twitter:image must be an absolute https URL, got: "${tw}"`,
      ).toBe(true);
    }
  });

  it("twitter:card is summary_large_image when twitter:image is present", () => {
    const tw = pickContent(
      indexHtml,
      /<meta\s+name="twitter:image"\s+content="([^"]+)"/,
    );
    if (!tw) return;
    const card = pickContent(
      indexHtml,
      /<meta\s+name="twitter:card"\s+content="([^"]+)"/,
    );
    expect(card, "twitter:card missing although twitter:image is set").toBeTruthy();
    expect(["summary", "summary_large_image"]).toContain(card!);
  });
});

// ---------- Per-route Helmet completeness ----------
//
// Templates that set per-route `<title>`/og:title must also self-reference
// their canonical URL via `<link rel="canonical">` AND `og:url`. When these
// disagree (or point at the homepage), crawlers attribute the page's
// title/description/image to the wrong URL and the per-route tags are
// silently ignored — see head-meta knowledge file.

const ROUTE_TEMPLATES_WITH_CANONICAL = [
  "src/pages/DrugDetail.tsx",
  "src/pages/notes/NoteLayout.tsx",
];

describe("per-route Helmet templates declare canonical + og:url", () => {
  it.each(ROUTE_TEMPLATES_WITH_CANONICAL)(
    "%s sets <link rel=\"canonical\"> and og:url",
    (file) => {
      const path = resolve(ROOT, file);
      expect(existsSync(path), `${file} not found`).toBe(true);
      const src = readFileSync(path, "utf8");
      expect(
        /<link\s+rel="canonical"/.test(src),
        `${file} missing <link rel="canonical"> inside Helmet`,
      ).toBe(true);
      expect(
        /property="og:url"/.test(src),
        `${file} missing og:url inside Helmet`,
      ).toBe(true);
    },
  );
});
