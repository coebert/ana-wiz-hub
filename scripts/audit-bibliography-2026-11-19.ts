/**
 * Batched bibliographic audit for the 19 November 2026 learner-content review.
 *
 * Every DOI/PMID stored in src/data/references.ts is resolved against Crossref
 * (DOIs) and NCBI E-utilities (PMIDs) in batches. Europe PMC is used only as a
 * secondary DOI fallback when available. For each record the report keeps:
 *   • the exact stored URL and the DOI/PMID actually found,
 *   • the resolved source title, journal, year and volume/pages,
 *   • the supplied citation exactly as stored,
 *   • a title-coverage score and a disposition,
 *   • an explicit "incomplete" bucket for records with no identifier, a short
 *     citation that cannot be compared, or a failed/absent lookup.
 *
 * The check is deliberately conservative: it verifies bibliographic identity,
 * never that a source supports the sentence it is attached to. A `match` means
 * the resolved title overlaps the supplied citation; it is not clinical
 * validation.
 *
 * Usage: npx tsx scripts/audit-bibliography-2026-11-19.ts
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { topicReferences } from "../src/data/references";

const ROOT = resolve(import.meta.dirname ?? __dirname, "..");
const OUT_JSON = resolve(ROOT, "docs/audit-2026-11-19/bibliography-lookup.json");
const OUT_MD = resolve(ROOT, "docs/audit-2026-11-19/bibliography-lookup.md");
const CACHE = resolve(ROOT, ".cache/bibliography-audit.json");
const USER_AGENT = "AnaesthesiaCore-audit/1.0 (mailto:audit@anaesthesiacore.example)";
const DOI_RE = /\b(10\.\d{4,9}\/[-._;()/:A-Za-z0-9]+)\b/g;
const PMID_RE = /\bPMID[:\s]*(\d{6,9})\b/gi;
const CROSSREF_BATCH = 35;
const PMID_BATCH = 80;

type Disposition =
  | "match"
  | "title_mismatch"
  | "short_citation"
  | "not_found"
  | "lookup_failed"
  | "retracted"
  | "no_identifier";

interface Entry {
  topic: string;
  label: string;
  supplied_citation: string;
  exact_url: string | null;
  doi: string | null;
  pmid: string | null;
  disposition: Disposition;
  resolved_title: string | null;
  resolved_journal: string | null;
  resolved_year: number | null;
  resolved_volume: string | null;
  resolved_pages: string | null;
  title_coverage: number | null;
  citation_word_count: number;
  note: string;
}

interface Resolved {
  title: string;
  journal: string | null;
  year: number | null;
  volume: string | null;
  pages: string | null;
  first_author: string | null;
  retracted: boolean;
  source: "crossref" | "europepmc" | "ncbi";
}

type CacheValue = Resolved | null;
type Cache = Record<string, CacheValue>;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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

function cleanDoi(value: string): string {
  return value.replace(/[.,;:)\]}]+$/g, "").replace(/^doi:\s*/i, "").trim();
}

function extractDoi(entry: { url?: string; citation?: string }): string | null {
  const url = entry.url ?? "";
  const doiOrg = url.match(/doi\.org\/(10\.\d{4,9}\/[^\s?#]+)/i);
  if (doiOrg) return cleanDoi(decodeURIComponent(doiOrg[1]));
  const fromCitation = (entry.citation ?? "").match(DOI_RE);
  if (fromCitation?.length) return cleanDoi(fromCitation[0]);
  return null;
}

function extractPmid(entry: { url?: string; citation?: string }): string | null {
  const url = entry.url ?? "";
  const urlMatch = url.match(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d{6,9})/i)
    ?? url.match(/[?&]term=(\d{6,9})/i)
    ?? url.match(/europepmc\.org\/(?:article|abstract)\/MED\/(\d{6,9})/i);
  if (urlMatch) return urlMatch[1];
  const citationMatch = (entry.citation ?? "").match(PMID_RE);
  return citationMatch ? citationMatch[1] : null;
}

function normalise(text: string): string {
  return text
    .toLowerCase()
    .replace(/&[a-z]+;/g, " ")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const STOP = new Set([
  "a", "an", "the", "of", "and", "in", "on", "for", "to", "with", "by", "from",
  "at", "as", "is", "are", "be", "or", "vs", "versus", "into", "their", "its",
]);

function titleWords(text: string): Set<string> {
  return new Set(normalise(text).split(" ").filter((w) => w.length > 2 && !STOP.has(w)));
}

/** Fraction of resolved-title words that also appear in the supplied citation. */
function titleCoverage(resolvedTitle: string, citation: string): number {
  const resolved = [...titleWords(resolvedTitle)];
  if (!resolved.length) return 0;
  const supplied = titleWords(citation);
  const hit = resolved.filter((word) => supplied.has(word)).length;
  return Number((hit / resolved.length).toFixed(3));
}

/** First three significant words of the resolved title, in order. */
function titlePrefix(resolvedTitle: string): string[] {
  return [...titleWords(resolvedTitle)].slice(0, 3);
}

/** First surname-like token at the start of the citation. */
function citationFirstAuthor(citation: string): string | null {
  const first = citation.split(/[.;]/)[0].trim();
  const match = first.match(/^([A-Z][A-Za-zÀ-ÿ'’-]{1,})/);
  return match ? match[1].toLowerCase() : null;
}

function citationYear(citation: string): number | null {
  const match = citation.match(/\b(19|20)\d{2}\b/);
  return match ? Number(match[0]) : null;
}

/** All-caps group/organisation token at the start of the citation. */
function citationGroup(citation: string): string | null {
  const first = citation.split(/[.;]/)[0].trim();
  const match = first.match(/^([A-Z][A-Z0-9/&-]{2,})/);
  return match ? match[1] : null;
}

/** A whole citation segment that appears verbatim inside the resolved title. */
function citationPhraseMatch(resolvedTitle: string, citation: string): boolean {
  const resolved = normalise(resolvedTitle);
  return citation
    .split(/[.;]/)
    .map((segment) => normalise(segment))
    .filter((segment) => segment.split(" ").filter(Boolean).length >= 4 && segment.length >= 20)
    .some((segment) => resolved.includes(segment));
}

async function fetchJson(url: string, attempts = 3): Promise<any> {
  let lastError: unknown;
  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
        signal: AbortSignal.timeout(20_000),
      });
      if (response.ok) return await response.json();
      if (response.status === 404) return null;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    await sleep(500 * (attempt + 1));
  }
  throw lastError instanceof Error ? lastError : new Error("lookup failed");
}

function crossrefItemToResolved(item: any): Resolved {
  const title = Array.isArray(item.title) ? item.title[0] : item.title ?? "";
  const journal = Array.isArray(item["container-title"]) ? item["container-title"][0] : item["container-title"] ?? null;
  const year = item.issued?.["date-parts"]?.[0]?.[0] ?? item["published-print"]?.["date-parts"]?.[0]?.[0] ?? null;
  const updateTo = Array.isArray(item["update-to"]) ? item["update-to"] : [];
  const relation = item.relation ?? {};
  const retracted = updateTo.some((u: any) => /retraction/i.test(u.type ?? ""))
    || Boolean(relation["is-retracted-by"]);
  return {
    title: String(title),
    journal: journal ? String(journal) : null,
    year: typeof year === "number" ? year : null,
    volume: item.volume ?? null,
    pages: item.page ?? null,
    first_author: item.author?.[0]?.family ? String(item.author[0].family) : null,
    retracted,
    source: "crossref",
  };
}

async function crossrefBatch(dois: string[], cache: Cache): Promise<Map<string, Resolved | null>> {
  const result = new Map<string, Resolved | null>();
  const uncached: string[] = [];
  for (const doi of dois) {
    const key = `doi:${doi.toLowerCase()}`;
    if (Object.prototype.hasOwnProperty.call(cache, key)) result.set(doi, cache[key]);
    else uncached.push(doi);
  }
  if (!uncached.length) return result;

  // A DOI containing a comma or semicolon cannot be expressed in Crossref's
  // comma-separated filter; resolve those individually.
  const simple = uncached.filter((d) => !/[,;]/.test(d));
  const awkward = uncached.filter((d) => /[,;]/.test(d));
  for (let i = 0; i < simple.length; i += CROSSREF_BATCH) {
    if (i % (CROSSREF_BATCH * 10) === 0) console.error(`[audit] Crossref ${i}/${simple.length}`);
    const chunk = simple.slice(i, i + CROSSREF_BATCH);
    const filter = chunk.map((d) => `doi:${d}`).join(",");
    const url = `https://api.crossref.org/works?filter=${filter}&rows=${chunk.length + 5}`
      + `&select=DOI,title,container-title,issued,volume,page,author,update-to,relation`;
    try {
      const data = await fetchJson(url);
      const items = data?.message?.items ?? [];
      const found = new Map<string, Resolved>();
      for (const item of items) found.set(String(item.DOI).toLowerCase(), crossrefItemToResolved(item));
      for (const doi of chunk) {
        const value = found.get(doi.toLowerCase()) ?? null;
        result.set(doi, value);
        cache[`doi:${doi.toLowerCase()}`] = value;
      }
    } catch {
      for (const doi of chunk) result.set(doi, undefined as any);
    }
    await sleep(120);
  }
  for (const doi of awkward) {
    try {
      const data = await fetchJson(`https://api.crossref.org/works/${encodeURIComponent(doi)}`);
      const value = data?.message ? crossrefItemToResolved(data.message) : null;
      result.set(doi, value);
      cache[`doi:${doi.toLowerCase()}`] = value;
    } catch {
      result.set(doi, undefined as any);
    }
    await sleep(120);
  }
  return result;
}

async function ncbiPmids(pmids: string[], cache: Cache): Promise<Map<string, Resolved | null>> {
  const result = new Map<string, Resolved | null>();
  const uncached: string[] = [];
  for (const pmid of pmids) {
    const key = `pmid:${pmid}`;
    if (Object.prototype.hasOwnProperty.call(cache, key)) result.set(pmid, cache[key]);
    else uncached.push(pmid);
  }
  for (let i = 0; i < uncached.length; i += PMID_BATCH) {
    const chunk = uncached.slice(i, i + PMID_BATCH);
    const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed`
      + `&id=${chunk.join(",")}&retmode=json`;
    try {
      const data = await fetchJson(url);
      for (const pmid of chunk) {
        const record = data?.result?.[pmid];
        if (!record || record.error) {
          result.set(pmid, null);
          cache[`pmid:${pmid}`] = null;
          continue;
        }
        const value: Resolved = {
          title: String(record.title ?? "").replace(/<[^>]+>/g, ""),
          journal: record.fulljournalname ?? record.source ?? null,
          year: record.pubdate ? Number(String(record.pubdate).match(/\d{4}/)?.[0]) || null : null,
          volume: record.volume ?? null,
          pages: record.pages ?? null,
          first_author: record.authors?.[0]?.name ? String(record.authors[0].name).split(" ")[0] : null,
          retracted: /retract/i.test(`${record.title ?? ""} ${record.pubtype ?? ""}`),
          source: "ncbi",
        };
        result.set(pmid, value);
        cache[`pmid:${pmid}`] = value;
      }
    } catch {
      for (const pmid of chunk) result.set(pmid, undefined as any);
    }
    await sleep(200);
  }
  return result;
}

async function europePmcDoiFallback(dois: string[], cache: Cache): Promise<Map<string, Resolved | null>> {
  const result = new Map<string, Resolved | null>();
  for (const doi of dois) {
    const key = `doi:${doi.toLowerCase()}`;
    if (Object.prototype.hasOwnProperty.call(cache, key)) {
      result.set(doi, cache[key]);
      continue;
    }
    try {
      const url = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(`DOI:"${doi}"`)}&resultType=core&format=json&pageSize=3`;
      const data = await fetchJson(url, 2);
      const record = data?.resultList?.result?.[0];
      if (!record) {
        result.set(doi, null);
        cache[key] = null;
      } else {
        const value: Resolved = {
          title: String(record.title ?? ""),
          journal: record.journalInfo?.journal?.title ?? null,
          year: record.pubYear ? Number(record.pubYear) : null,
          volume: record.journalInfo?.volume ?? null,
          pages: record.pageInfo ?? null,
          first_author: record.authorString ? String(record.authorString).split(",")[0].split(" ")[0] : null,
          retracted: /retract/i.test(`${record.title ?? ""} ${record.pubType ?? ""}`),
          source: "europepmc",
        };
        result.set(doi, value);
        cache[key] = value;
      }
    } catch {
      // Europe PMC is best-effort; leave the value unresolved for the caller.
      result.set(doi, undefined as any);
    }
    await sleep(150);
  }
  return result;
}

async function main() {
  const cache = loadCache();
  const entries: Entry[] = [];
  for (const [topic, refs] of Object.entries(topicReferences)) {
    for (const ref of refs as any[]) {
      entries.push({
        topic,
        label: String(ref.label ?? ""),
        supplied_citation: String(ref.citation ?? ""),
        exact_url: ref.url ?? null,
        doi: extractDoi(ref),
        pmid: extractPmid(ref),
        disposition: "no_identifier",
        resolved_title: null,
        resolved_journal: null,
        resolved_year: null,
        resolved_volume: null,
        resolved_pages: null,
        title_coverage: null,
        citation_word_count: titleWords(String(ref.citation ?? "")).size,
        note: "",
      });
    }
  }

  const dois = [...new Set(entries.map((e) => e.doi).filter((d): d is string => Boolean(d)))];
  const pmids = [...new Set(entries.map((e) => e.pmid).filter((p): p is string => Boolean(p)))];
  console.error(`[audit] ${entries.length} reference records; ${dois.length} unique DOIs; ${pmids.length} unique PMIDs`);

  const crossref = await crossrefBatch(dois, cache);
  console.error("[audit] Crossref batch complete");
  const ncbi = await ncbiPmids(pmids, cache);
  console.error("[audit] NCBI PMID batch complete");

  const unresolvedDois = dois.filter((d) => crossref.get(d) == null);
  const epmcDoi = unresolvedDois.length
    ? await europePmcDoiFallback(unresolvedDois, cache)
    : new Map<string, Resolved | null>();
  console.error(`[audit] Europe PMC DOI fallback complete for ${unresolvedDois.length} unresolved DOIs`);
  saveCache(cache);

  for (const entry of entries) {
    if (!entry.doi && !entry.pmid) {
      entry.disposition = "no_identifier";
      entry.note = "No DOI or PMID recorded; bibliographic identity not checked.";
      continue;
    }
    let resolved: Resolved | null | undefined;
    let failed = false;
    if (entry.doi) {
      resolved = crossref.get(entry.doi);
      if (resolved === undefined) failed = true;
      if (resolved == null) {
        const fallback = epmcDoi.get(entry.doi);
        if (fallback === undefined) failed = true;
        else resolved = fallback;
      }
    }
    if ((resolved == null || resolved === undefined) && entry.pmid) {
      const byPmid = ncbi.get(entry.pmid);
      if (byPmid === undefined) failed = true;
      if (byPmid) resolved = byPmid;
    }
    if (failed && resolved === undefined) {
      entry.disposition = "lookup_failed";
      entry.note = "Network lookup failed after retries; identity not checked.";
      continue;
    }
    if (!resolved) {
      entry.disposition = "not_found";
      entry.note = "Identifier did not resolve in Crossref, NCBI or Europe PMC.";
      continue;
    }
    entry.resolved_title = resolved.title;
    entry.resolved_journal = resolved.journal;
    entry.resolved_year = resolved.year;
    entry.resolved_volume = resolved.volume;
    entry.resolved_pages = resolved.pages;
    entry.title_coverage = titleCoverage(resolved.title, entry.supplied_citation);
    const suppliedWords = titleWords(entry.supplied_citation);
    const exactInCitation = normalise(entry.supplied_citation).includes(normalise(resolved.title));
    const prefixMatch = titlePrefix(resolved.title).every((word) => suppliedWords.has(word));
    const citationAuthor = citationFirstAuthor(entry.supplied_citation);
    const resolvedAuthor = resolved.first_author ? normalise(resolved.first_author).split(" ")[0] : null;
    const citedYear = citationYear(entry.supplied_citation);
    const yearMatch = resolved.year != null && citedYear != null && Math.abs(resolved.year - citedYear) <= 1;
    const authorMatch = Boolean(
      citationAuthor && resolvedAuthor && citationAuthor === resolvedAuthor
      && (entry.title_coverage >= 0.25 || yearMatch),
    );
    const group = citationGroup(entry.supplied_citation);
    const groupMatch = Boolean(
      group && normalise(resolved.title).includes(normalise(group.split("/")[0])),
    );
    const phraseMatch = citationPhraseMatch(resolved.title, entry.supplied_citation);
    if (resolved.retracted) {
      entry.disposition = "retracted";
      entry.note = "Resolved record carries a retraction marker.";
    } else if (exactInCitation || prefixMatch || phraseMatch || entry.title_coverage >= 0.6 || authorMatch || groupMatch) {
      entry.disposition = "match";
      entry.note = exactInCitation
        ? "Resolved title appears verbatim in the supplied citation."
        : authorMatch
          ? "First author and year match the resolved record; title abbreviated."
          : phraseMatch
            ? "A citation segment appears verbatim in the resolved title; author prefix or journal suffix differs."
            : groupMatch
              ? "Group acronym matches the resolved record; title abbreviated."
              : "Resolved title words largely present in the supplied citation; clinical support not checked.";
    } else if (entry.citation_word_count < 6) {
      entry.disposition = "short_citation";
      entry.note = "Supplied citation is too short to compare with the resolved title; identity only partly checked.";
    } else {
      entry.disposition = "title_mismatch";
      entry.note = "Resolved title does not match the supplied citation; bibliography needs correction.";
    }
  }

  const order: Disposition[] = ["title_mismatch", "retracted", "not_found", "lookup_failed", "short_citation", "match", "no_identifier"];
  entries.sort((a, b) => {
    const byDisposition = order.indexOf(a.disposition) - order.indexOf(b.disposition);
    if (byDisposition !== 0) return byDisposition;
    return a.topic.localeCompare(b.topic) || a.label.localeCompare(b.label);
  });

  const counts = Object.fromEntries(order.map((d) => [d, entries.filter((e) => e.disposition === d).length]));
  const checked = entries.filter((e) => e.disposition !== "no_identifier").length;
  const report = {
    generated_at: new Date().toISOString(),
    method: "Batched Crossref (filter=doi:…) lookups for DOIs and NCBI E-utilities esummary for PMIDs, with a best-effort Europe PMC DOI fallback. Title coverage is the fraction of resolved-title words present in the supplied citation; a three-word prefix match also counts. A match verifies bibliographic identity only, never that the source supports the claim.",
    totals: {
      records: entries.length,
      with_identifier: checked,
      without_identifier: entries.length - checked,
      unique_dois: dois.length,
      unique_pmids: pmids.length,
      dispositions: counts,
    },
    entries,
  };

  const esc = (value: unknown) => String(value ?? "—").replace(/\|/g, "\\|").replace(/\n/g, " ");
  const table = (rows: Entry[]) => [
    "| Topic | Label | Supplied citation | Exact URL / DOI | Resolved source title | Journal / year | Coverage | Disposition |",
    "| --- | --- | --- | --- | --- | --- | --- | --- |",
    ...rows.map((e) => `| ${esc(e.topic)} | ${esc(e.label)} | ${esc(e.supplied_citation).slice(0, 220)} | ${esc(e.exact_url ?? (e.doi ? `https://doi.org/${e.doi}` : e.pmid ? `PMID ${e.pmid}` : "—"))} | ${esc(e.resolved_title)} | ${esc(e.resolved_journal)}${e.resolved_year ? ` / ${e.resolved_year}` : ""} | ${e.title_coverage ?? "—"} | ${e.disposition} |`),
  ].join("\n");

  const md = [
    "# Bibliographic lookup — 19 November 2026",
    "",
    `Generated ${report.generated_at}. Source records: \`src/data/references.ts\`.`,
    "",
    "## Method and limits",
    "",
    report.method,
    "",
    "A `match` is bibliographic identity only. It does **not** prove that the source supports the sentence it is attached to, and it is not clinical validation. Records with no DOI/PMID, failed lookups, unresolved identifiers and citations too short to compare are listed as incomplete checks.",
    "",
    "## Totals",
    "",
    `- Reference records: **${entries.length}**`,
    `- With a DOI or PMID: **${checked}**`,
    `- Without any identifier: **${entries.length - checked}**`,
    `- Unique DOIs queried: **${dois.length}**`,
    `- Unique PMIDs queried: **${pmids.length}**`,
    "",
    "| Disposition | Count |",
    "| --- | --- |",
    ...order.map((d) => `| ${d} | ${counts[d]} |`),
    "",
    "## Confirmed title mismatches",
    "",
    counts.title_mismatch ? table(entries.filter((e) => e.disposition === "title_mismatch")) : "None found.",
    "",
    "## Retraction markers",
    "",
    counts.retracted ? table(entries.filter((e) => e.disposition === "retracted")) : "None found.",
    "",
    "## Identifiers that did not resolve",
    "",
    counts.not_found ? table(entries.filter((e) => e.disposition === "not_found")) : "None found.",
    "",
    "## Lookup failures",
    "",
    counts.lookup_failed ? table(entries.filter((e) => e.disposition === "lookup_failed")) : "None found.",
    "",
    "## Incomplete checks — citation too short to compare",
    "",
    counts.short_citation ? table(entries.filter((e) => e.disposition === "short_citation")) : "None.",
    "",
    "## Incomplete checks — no DOI or PMID",
    "",
    counts.no_identifier ? table(entries.filter((e) => e.disposition === "no_identifier")) : "None.",
    "",
    "## Matched records",
    "",
    counts.match ? table(entries.filter((e) => e.disposition === "match")) : "None.",
    "",
  ].join("\n");

  mkdirSync(resolve(ROOT, "docs/audit-2026-11-19"), { recursive: true });
  writeFileSync(OUT_JSON, JSON.stringify(report, null, 2));
  writeFileSync(OUT_MD, md);
  console.log(JSON.stringify(report.totals, null, 2));
  console.log(`[audit] wrote ${OUT_JSON}`);
  console.log(`[audit] wrote ${OUT_MD}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
