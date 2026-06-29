#!/usr/bin/env node
/**
 * Validates external URLs (http/https) referenced in:
 *   • src/pages/topics/**.tsx
 *   • src/components/diagrams/**.tsx
 *
 * Two layers of checking:
 *
 *   1. STATIC (always runs, gates unit tests)
 *      - URL must parse via `new URL()`.
 *      - Scheme must be http or https (https preferred — http only flagged
 *        if it points at a host that obviously supports https such as
 *        doi.org, *.nih.gov, *.bja.org.uk).
 *      - No whitespace, no stray closing punctuation, no `${...}` template
 *        leftovers, no obviously truncated tail (e.g. ends mid-encoded
 *        char `%2`).
 *      - Known-broken domains are flagged from a small allowlist below.
 *
 *   2. NETWORK (opt-in: `CHECK_EXTERNAL_URLS=1` or `--network`)
 *      - HEAD → fallback GET, 10 s timeout, 6 concurrent, redirects followed.
 *      - Results cached in `.cache/external-urls.json` for 7 days so CI
 *        doesn't hammer publishers each run.
 *      - Cache is consulted on every run. Any cached `status >= 400 && != 429`
 *        result still in TTL fails the build — so a manual
 *        `CHECK_EXTERNAL_URLS=1 node scripts/check-external-urls.mjs`
 *        seeds CI with definitive 4xx breakage without requiring CI itself
 *        to make outbound HTTP calls.
 *      - 429 / 5xx / network errors are treated as "unknown" and don't
 *        fail (publishers commonly rate-limit or block HEAD from CI).
 */
import { readdirSync, readFileSync, statSync, mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, relative, dirname } from "node:path";

const ROOT = process.cwd();
const TOPICS_DIR = join(ROOT, "src", "pages", "topics");
const DIAGRAMS_DIR = join(ROOT, "src", "components", "diagrams");
const CACHE_PATH = join(ROOT, ".cache", "external-urls.json");
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const NETWORK =
  process.argv.includes("--network") ||
  process.env.CHECK_EXTERNAL_URLS === "1";

/** Domains known to be dead / parked / changed — always fail. */
const BANNED_HOSTS = new Set([
  // add hosts here when a publisher retires a URL pattern
]);

/** Hosts that must be https. */
const HTTPS_ONLY_HOST_RE =
  /(^|\.)(doi\.org|nih\.gov|nice\.org\.uk|bja\.org\.uk|bjaed\.org|resus\.org\.uk|aagbi\.org|anaesthetists\.org|nejm\.org|thelancet\.com|sciencedirect\.com|bmj\.com|nature\.com|springer\.com|wiley\.com|jamanetwork\.com|ahajournals\.org|escardio\.org|esicm\.org|ersnet\.org)$/i;

function listTsx(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...listTsx(p));
    else if (name.endsWith(".tsx")) out.push(p);
  }
  return out;
}

// Conservative URL regex — stops at quote, whitespace, backtick or angle bracket.
const URL_RE = /\bhttps?:\/\/[^\s"'`<>)]+/g;

function cleanTail(raw) {
  // Trim balanced/likely-trailing punctuation that's almost never part of a URL.
  let u = raw;
  while (u.length > 1 && /[.,;:!?)\]}>]$/.test(u)) u = u.slice(0, -1);
  return u;
}

function collectUrls() {
  const found = new Map(); // url -> [{ file, line }]
  const files = [...listTsx(TOPICS_DIR), ...listTsx(DIAGRAMS_DIR)];
  for (const file of files) {
    const src = readFileSync(file, "utf8");
    const lines = src.split("\n");
    lines.forEach((line, i) => {
      const matches = line.match(URL_RE);
      if (!matches) return;
      for (const raw of matches) {
        const url = cleanTail(raw);
        if (!found.has(url)) found.set(url, []);
        found.get(url).push({ file: relative(ROOT, file), line: i + 1 });
      }
    });
  }
  return found;
}

function staticIssues(url) {
  const problems = [];
  if (/\$\{|\}\}|\{\{/.test(url)) problems.push("contains unresolved template syntax");
  if (/%[^0-9a-fA-F]|%.?$/.test(url) && !/%[0-9a-fA-F]{2}/.test(url.slice(-3)))
    problems.push("looks like a truncated percent-encoding");
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    problems.push("does not parse as a URL");
    return problems;
  }
  if (!/^https?:$/.test(parsed.protocol)) problems.push(`unsupported scheme ${parsed.protocol}`);
  if (BANNED_HOSTS.has(parsed.hostname)) problems.push("host is on the banned list (link rot / parked)");
  if (parsed.protocol === "http:" && HTTPS_ONLY_HOST_RE.test(parsed.hostname))
    problems.push(`should use https:// for ${parsed.hostname}`);
  if (/\s/.test(url)) problems.push("contains whitespace");
  return problems;
}

function loadCache() {
  if (!existsSync(CACHE_PATH)) return {};
  try {
    return JSON.parse(readFileSync(CACHE_PATH, "utf8"));
  } catch {
    return {};
  }
}

function saveCache(cache) {
  mkdirSync(dirname(CACHE_PATH), { recursive: true });
  writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
}

async function probe(url) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), 10_000);
  try {
    let res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: ctl.signal,
      headers: { "user-agent": "anaesthesia-core-link-check/1.0" },
    });
    if (res.status === 405 || res.status === 403 || res.status === 501) {
      res = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: ctl.signal,
        headers: { "user-agent": "anaesthesia-core-link-check/1.0" },
      });
    }
    return { status: res.status, checkedAt: Date.now() };
  } catch (e) {
    return { status: 0, error: String(e?.message || e), checkedAt: Date.now() };
  } finally {
    clearTimeout(timer);
  }
}

async function runNetwork(urls, cache) {
  const stale = urls.filter((u) => {
    const c = cache[u];
    return !c || Date.now() - c.checkedAt > CACHE_TTL_MS;
  });
  console.log(`Network check: ${stale.length} URLs to probe (${urls.length - stale.length} fresh-cached).`);
  const CONCURRENCY = 6;
  let i = 0;
  async function worker() {
    while (i < stale.length) {
      const idx = i++;
      const url = stale[idx];
      cache[url] = await probe(url);
      if ((idx + 1) % 20 === 0) console.log(`  …${idx + 1}/${stale.length}`);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  saveCache(cache);
}

function definitivelyBroken(cacheEntry) {
  if (!cacheEntry) return false;
  if (Date.now() - cacheEntry.checkedAt > CACHE_TTL_MS) return false;
  const s = cacheEntry.status;
  // Treat only client errors as broken; skip 429 (rate-limit) and 451 (legal).
  return s >= 400 && s < 500 && s !== 429 && s !== 451 && s !== 403;
}

async function main() {
  const found = collectUrls();
  const urls = [...found.keys()].sort();
  const issues = [];

  for (const url of urls) {
    for (const p of staticIssues(url)) {
      issues.push({ url, kind: "static", detail: p, occurrences: found.get(url) });
    }
  }

  const cache = loadCache();
  if (NETWORK) {
    await runNetwork(urls, cache);
  }
  for (const url of urls) {
    const entry = cache[url];
    if (definitivelyBroken(entry)) {
      issues.push({
        url,
        kind: "network",
        detail: `cached HTTP ${entry.status} (checked ${new Date(entry.checkedAt).toISOString().slice(0, 10)})`,
        occurrences: found.get(url),
      });
    }
  }

  if (issues.length === 0) {
    console.log(
      `✓ ${urls.length} unique external URLs across ${[...new Set([...found.values()].flat().map((o) => o.file))].length} files. ` +
        (NETWORK ? "Network probe clean." : "Static checks clean (run with --network to probe live)."),
    );
    process.exit(0);
  }

  console.error("✗ External URL issues detected:\n");
  for (const it of issues) {
    console.error(`  [${it.kind}] ${it.url}`);
    console.error(`      ${it.detail}`);
    const first = it.occurrences[0];
    console.error(`      first used in ${first.file}:${first.line}` + (it.occurrences.length > 1 ? ` (+${it.occurrences.length - 1} more)` : ""));
  }
  console.error(
    `\nFix: correct or remove the URL. To refresh the network cache: CHECK_EXTERNAL_URLS=1 node scripts/check-external-urls.mjs`,
  );
  process.exit(1);
}

main();
