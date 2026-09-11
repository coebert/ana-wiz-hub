/**
 * Deterministic reference-integrity check.
 *
 * For every citation in src/data/references.ts:
 *   • resolve its DOI against Crossref and/or its PMID against PubMed
 *   • compare the official title with the stored citation text
 *   • flag retractions and errata
 *   • flag citations with neither DOI nor PMID nor URL (unverifiable)
 *
 * No AI, no scraping — pure API lookups against Crossref and NCBI, so results are
 * reproducible and safe to run in CI.
 *
 * Results are cached in `.cache/reference-integrity.json` so repeat runs and
 * offline runs are fast and deterministic. Offline with no cache → the check
 * reports "skipped" rather than failing the build.
 *
 * Usage:
 *   bun run scripts/check-reference-integrity.ts            # cached + network
 *   bun run scripts/check-reference-integrity.ts --refresh  # ignore cache
 *   bun run scripts/check-reference-integrity.ts --json out.json
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { topicReferences } from "../src/data/references";
import {
  crossrefWork,
  pubmedSummaries,
  extractDoi,
  titleSimilarity,
} from "../supabase/functions/_shared/literature";

const ROOT = resolve(import.meta.dirname ?? __dirname, "..");
const CACHE = resolve(ROOT, ".cache/reference-integrity.json");
const TITLE_MATCH_THRESHOLD = 0.45;
const CACHE_TTL_DAYS = 30;

interface CheckResult {
  topic_id: string;
  reference_label: string;
  citation: string;
  url?: string;
  doi?: string;
  pmid?: string;
  status: "ok" | "warning" | "error" | "unverifiable";
  problems: string[];
  resolved_title?: string;
  resolved_journal?: string;
  resolved_year?: number;
  title_similarity?: number;
  is_retracted: boolean;
  has_erratum: boolean;
  checked_at: string;
}

interface Cache {
  [key: string]: CheckResult;
}

function loadCache(): Cache {
  if (!existsSync(CACHE)) return {};
  try {
    return JSON.parse(readFileSync(CACHE, "utf8")) as Cache;
  } catch {
    return {};
  }
}

function saveCache(cache: Cache) {
  mkdirSync(dirname(CACHE), { recursive: true });
  writeFileSync(CACHE, JSON.stringify(cache, null, 0));
}

function isFresh(result: CheckResult | undefined): boolean {
  if (!result) return false;
  const age = Date.now() - new Date(result.checked_at).getTime();
  return age < CACHE_TTL_DAYS * 24 * 3600 * 1000;
}

async function online(): Promise<boolean> {
  try {
    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), 6000);
    const res = await fetch("https://api.crossref.org/works?rows=0", { signal: ac.signal });
    clearTimeout(t);
    return res.ok;
  } catch {
    return false;
  }
}

async function checkOne(
  topicId: string,
  ref: { label: string; citation: string; url?: string; pmid?: string },
  pubmed: Map<string, Awaited<ReturnType<typeof pubmedSummaries>> extends Map<string, infer V> ? V : never>,
): Promise<CheckResult> {
  const doi = extractDoi(ref.url, ref.citation);
  const problems: string[] = [];
  let status: CheckResult["status"] = "ok";
  let resolvedTitle: string | undefined;
  let resolvedJournal: string | undefined;
  let resolvedYear: number | undefined;
  let similarity: number | undefined;
  let retracted = false;
  let erratum = false;

  if (!doi && !ref.pmid) {
    if (!ref.url) {
      problems.push("No DOI, PMID or URL — citation cannot be verified programmatically");
      status = "unverifiable";
    } else if (!/^https:\/\//.test(ref.url)) {
      problems.push("URL is not https");
      status = "warning";
    } else {
      problems.push("No DOI or PMID — only a bare URL, so metadata cannot be confirmed");
      status = "warning";
    }
  }

  if (doi) {
    const work = await crossrefWork(doi);
    if (!work) {
      problems.push(`DOI ${doi} did not resolve at Crossref`);
      status = "error";
    } else {
      resolvedTitle = work.title;
      resolvedJournal = work.containerTitle;
      resolvedYear = work.year;
      retracted = retracted || work.isRetracted;
      erratum = erratum || work.hasErratum;
      similarity = work.title ? titleSimilarity(ref.citation, work.title) : undefined;
      if (similarity !== undefined && similarity < TITLE_MATCH_THRESHOLD) {
        problems.push(
          `Citation text does not match the DOI's official title ("${work.title}") — ` +
            `overlap ${(similarity * 100).toFixed(0)}%`,
        );
        if (status === "ok") status = "warning";
      }
      const citedYear = ref.citation.match(/\b(19|20)\d{2}\b/)?.[0];
      if (citedYear && work.year && Math.abs(Number(citedYear) - work.year) > 1) {
        problems.push(`Citation year ${citedYear} differs from the record year ${work.year}`);
        if (status === "ok") status = "warning";
      }
    }
  }

  if (ref.pmid) {
    const summary = pubmed.get(ref.pmid);
    if (!summary) {
      problems.push(`PMID ${ref.pmid} did not resolve at PubMed`);
      status = "error";
    } else {
      resolvedTitle = resolvedTitle ?? summary.title;
      resolvedJournal = resolvedJournal ?? summary.journal;
      resolvedYear = resolvedYear ?? summary.year;
      retracted = retracted || summary.isRetracted;
      erratum = erratum || summary.hasErratum;
      if (similarity === undefined && summary.title) {
        similarity = titleSimilarity(ref.citation, summary.title);
        if (similarity < TITLE_MATCH_THRESHOLD) {
          problems.push(
            `Citation text does not match PubMed title ("${summary.title}") — ` +
              `overlap ${(similarity * 100).toFixed(0)}%`,
          );
          if (status === "ok") status = "warning";
        }
      }
      if (doi && summary.doi && summary.doi !== doi) {
        problems.push(`DOI ${doi} and PMID ${ref.pmid} point at different records`);
        status = "error";
      }
    }
  }

  if (retracted) {
    problems.push("SOURCE IS RETRACTED — must be removed or replaced");
    status = "error";
  }
  if (erratum) {
    problems.push("Source has a published erratum/correction — confirm the cited figures");
    if (status === "ok") status = "warning";
  }

  return {
    topic_id: topicId,
    reference_label: ref.label,
    citation: ref.citation,
    url: ref.url,
    doi,
    pmid: ref.pmid,
    status,
    problems,
    resolved_title: resolvedTitle,
    resolved_journal: resolvedJournal,
    resolved_year: resolvedYear,
    title_similarity: similarity,
    is_retracted: retracted,
    has_erratum: erratum,
    checked_at: new Date().toISOString(),
  };
}

async function main() {
  const refresh = process.argv.includes("--refresh");
  const jsonIdx = process.argv.indexOf("--json");
  const jsonOut = jsonIdx > -1 ? process.argv[jsonIdx + 1] : undefined;

  const cache = refresh ? {} : loadCache();
  const flat: Array<{ topicId: string; ref: any; key: string }> = [];
  for (const [topicId, refs] of Object.entries(topicReferences)) {
    for (const ref of refs) {
      flat.push({ topicId, ref, key: `${topicId}::${ref.label}::${ref.citation.slice(0, 80)}` });
    }
  }

  const pending = flat.filter((f) => !isFresh(cache[f.key]));
  const net = pending.length > 0 ? await online() : true;

  if (pending.length > 0 && !net) {
    const cached = flat.filter((f) => cache[f.key]).length;
    console.log(
      `⚠️  reference-integrity: offline — ${pending.length} of ${flat.length} citations not cached; ` +
        `reporting ${cached} cached results only (check skipped, not failed).`,
    );
  }

  if (net && pending.length > 0) {
    // Batch PubMed lookups (esummary takes many ids per call).
    const pmids = Array.from(
      new Set(pending.map((f) => f.ref.pmid).filter((p): p is string => !!p)),
    );
    const pubmed = new Map<string, any>();
    for (let i = 0; i < pmids.length; i += 100) {
      const batch = await pubmedSummaries(pmids.slice(i, i + 100));
      for (const [k, v] of batch) pubmed.set(k, v);
    }

    // Crossref one DOI at a time, small concurrency to stay polite.
    const CONCURRENCY = 4;
    let cursor = 0;
    let done = 0;
    await Promise.all(
      Array.from({ length: CONCURRENCY }, async () => {
        while (cursor < pending.length) {
          const item = pending[cursor++];
          cache[item.key] = await checkOne(item.topicId, item.ref, pubmed as any);
          done++;
          if (done % 25 === 0) {
            console.log(`   …checked ${done}/${pending.length}`);
          }
        }
      }),
    );
    saveCache(cache);
  }

  const results = flat.map((f) => cache[f.key]).filter(Boolean);
  const errors = results.filter((r) => r.status === "error");
  const warnings = results.filter((r) => r.status === "warning");
  const unverifiable = results.filter((r) => r.status === "unverifiable");

  console.log(
    `\n📚 Reference integrity: ${results.length}/${flat.length} citations checked — ` +
      `${errors.length} error, ${warnings.length} warning, ${unverifiable.length} unverifiable`,
  );

  const print = (label: string, rows: CheckResult[], cap = 25) => {
    if (rows.length === 0) return;
    console.log(`\n${label}`);
    for (const r of rows.slice(0, cap)) {
      console.log(`  • [${r.topic_id}] ${r.reference_label}: ${r.problems.join("; ")}`);
    }
    if (rows.length > cap) console.log(`  …and ${rows.length - cap} more`);
  };

  print("❌ Errors (must fix — unresolved identifiers or retractions):", errors);
  print("⚠️  Warnings (metadata mismatch, errata, bare URLs):", warnings);
  print("ℹ️  Unverifiable (add a DOI, PMID or URL):", unverifiable);

  if (jsonOut) {
    writeFileSync(resolve(ROOT, jsonOut), JSON.stringify({ results }, null, 2));
    console.log(`\nWrote ${jsonOut}`);
  }

  if (errors.length > 0) {
    console.error(`\nreference-integrity failed: ${errors.length} citation error(s).`);
    process.exit(1);
  }
  console.log("\n✅ No citation errors.");
}

main().catch((e) => {
  console.error("reference-integrity crashed:", e);
  process.exit(1);
});
