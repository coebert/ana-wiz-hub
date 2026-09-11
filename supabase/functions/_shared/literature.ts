/**
 * Structured literature evidence layer for the content audit.
 *
 * Replaces web-scraping of journal/guideline sites with the free, machine-readable
 * research databases:
 *
 *   • Europe PMC   — search + abstracts + open-access full text (no key needed)
 *   • NCBI PubMed  — esearch/esummary for PMIDs and record metadata
 *   • Crossref     — /works/{doi} for authoritative DOI metadata + retraction links
 *
 * Every returned record carries a DOI and/or PMID so any audit finding built on it
 * is one click from the primary source. Records are never paraphrased here — the
 * `excerpt` field is the verbatim abstract (or verbatim OA full-text section).
 */

const EUROPEPMC = "https://www.ebi.ac.uk/europepmc/webservices/rest";
const EUTILS = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";
const CROSSREF = "https://api.crossref.org";

/** Polite-pool contact — Crossref/NCBI ask for an identifying UA. */
const UA =
  "AnaesthesiaCore-ContentAudit/1.0 (https://anaesthesiacore.app; mailto:hello@anaesthesiacore.app)";

/** Journals / sources we treat as high-reputation for UK anaesthesia + ICM. */
export const REPUTABLE_JOURNAL_PATTERNS: RegExp[] = [
  /BJA Educ/i,
  /Br J Anaesth/i,
  /Contin Educ Anaesth/i,
  /Intensive Care Medicine/i,
  /Critical Care Medicine/i,
  /Br J Clin Pharmacol/i,
  /Eur Respir J/i,
  /MMWR/i,
  /British Journal of Anaesthesia/i,
  /BJA Open/i,
  /Anaesthesia\b/i,
  /Anesthesiology/i,
  /Anesthesia and Analgesia/i,
  /Intensive Care Med/i,
  /Critical Care Med/i,
  /Crit Care\b/i,
  /Lancet/i,
  /N Engl J Med/i,
  /JAMA/i,
  /BMJ\b/i,
  /Cochrane/i,
  /Br J Clin Pharmacol/i,
  /Eur J Anaesthesiol/i,
  /Can J Anaesth/i,
  /Chest\b/i,
  /Am J Respir Crit Care Med/i,
  /Thorax/i,
  /Resuscitation/i,
  /Circulation/i,
  /Eur Heart J/i,
];

export function isReputableJournal(journal?: string | null): boolean {
  if (!journal) return false;
  return REPUTABLE_JOURNAL_PATTERNS.some((re) => re.test(journal));
}

export interface LiteratureRecord {
  /** Europe PMC id, when the record came from there. */
  epmcId?: string;
  source?: string;
  pmid?: string;
  pmcid?: string;
  doi?: string;
  title: string;
  authors?: string;
  journal?: string;
  year?: number;
  /** Verbatim abstract, or verbatim OA full-text extract when requested. */
  excerpt: string;
  isOpenAccess: boolean;
  hasFullText: boolean;
  isRetracted: boolean;
  hasErratum: boolean;
  citedByCount?: number;
  /** Canonical link — DOI first, then PubMed, then Europe PMC. */
  url: string;
  publicationTypes?: string[];
}

// ---------------------------------------------------------------- fetch helpers

const RETRYABLE = new Set([408, 425, 429, 500, 502, 503, 504]);

async function fetchWithRetry(
  url: string,
  timeoutMs = 15_000,
  attempts = 3,
): Promise<{ ok: boolean; status: number; text: string }> {
  let last = { ok: false, status: 0, text: "" };
  for (let attempt = 1; attempt <= attempts; attempt++) {
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        signal: ac.signal,
        headers: { "User-Agent": UA, Accept: "application/json" },
      });
      const text = await res.text();
      last = { ok: res.ok, status: res.status, text };
      if (res.ok) return last;
      if (!RETRYABLE.has(res.status)) return last;
      const retryAfter = Number(res.headers.get("retry-after"));
      const waitMs = Number.isFinite(retryAfter) && retryAfter > 0
        ? Math.min(retryAfter * 1000, 10_000)
        : Math.min(500 * 2 ** (attempt - 1), 6_000) + Math.random() * 250;
      if (attempt < attempts) await new Promise((r) => setTimeout(r, waitMs));
    } catch (e) {
      last = { ok: false, status: 0, text: (e as Error).message };
      if (attempt < attempts) {
        await new Promise((r) => setTimeout(r, Math.min(500 * 2 ** (attempt - 1), 4_000)));
      }
    } finally {
      clearTimeout(timer);
    }
  }
  return last;
}

async function fetchJson<T>(url: string, timeoutMs = 15_000): Promise<T | null> {
  const r = await fetchWithRetry(url, timeoutMs);
  if (!r.ok) return null;
  try {
    return JSON.parse(r.text) as T;
  } catch {
    return null;
  }
}

// ----------------------------------------------------------------- Europe PMC

function canonicalUrl(rec: { doi?: string; pmid?: string; epmcId?: string; source?: string }) {
  if (rec.doi) return `https://doi.org/${rec.doi}`;
  if (rec.pmid) return `https://pubmed.ncbi.nlm.nih.gov/${rec.pmid}/`;
  if (rec.epmcId && rec.source) {
    return `https://europepmc.org/article/${rec.source}/${rec.epmcId}`;
  }
  return "https://europepmc.org/";
}

function mapEpmcResult(r: Record<string, any>): LiteratureRecord {
  const pubTypes: string[] = Array.isArray(r.pubTypeList?.pubType)
    ? r.pubTypeList.pubType.map(String)
    : r.pubTypeList?.pubType
      ? [String(r.pubTypeList.pubType)]
      : [];
  const commentCorrections = r.commentCorrectionList?.commentCorrection;
  const corrections: any[] = Array.isArray(commentCorrections)
    ? commentCorrections
    : commentCorrections
      ? [commentCorrections]
      : [];

  const base = {
    epmcId: r.id ? String(r.id) : undefined,
    source: r.source ? String(r.source) : undefined,
    pmid: r.pmid ? String(r.pmid) : undefined,
    pmcid: r.pmcid ? String(r.pmcid) : undefined,
    doi: r.doi ? String(r.doi).toLowerCase() : undefined,
  };

  return {
    ...base,
    title: String(r.title ?? "").replace(/\s+/g, " ").trim(),
    authors: r.authorString ? String(r.authorString) : undefined,
    journal: r.journalInfo?.journal?.title
      ? String(r.journalInfo.journal.title)
      : r.journalTitle
        ? String(r.journalTitle)
        : r.journalInfo?.journal?.medlineAbbreviation
          ? String(r.journalInfo.journal.medlineAbbreviation)
          : r.bookOrReportDetails?.publisher,
    year: r.pubYear ? Number(r.pubYear) : undefined,
    excerpt: String(r.abstractText ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
    isOpenAccess: r.isOpenAccess === "Y",
    hasFullText: r.hasTextMinedTerms === "Y" || r.inEPMC === "Y" || r.isOpenAccess === "Y",
    isRetracted:
      pubTypes.some((t) => /retract/i.test(t)) ||
      corrections.some((c) => /retraction/i.test(String(c?.type ?? ""))),
    hasErratum: corrections.some((c) => /erratum|correction/i.test(String(c?.type ?? ""))),
    citedByCount: typeof r.citedByCount === "number" ? r.citedByCount : undefined,
    url: canonicalUrl(base),
    publicationTypes: pubTypes,
  };
}

export interface SearchOptions {
  /** Max records to return. */
  limit?: number;
  /** Only return records published in or after this year. */
  fromYear?: number;
  /** Restrict to reviews / guidelines (best signal for exam-level revision). */
  reviewsOnly?: boolean;
  /** Require an abstract — records without one carry no quotable evidence. */
  requireAbstract?: boolean;
  timeoutMs?: number;
}

/**
 * Search Europe PMC. Query syntax is Europe PMC's own; callers should pass plain
 * topic terms and let the helper add the quality/recency filters.
 */
export async function searchEuropePmc(
  query: string,
  opts: SearchOptions = {},
): Promise<LiteratureRecord[]> {
  const limit = opts.limit ?? 6;
  const clauses = [`(${query})`];
  if (opts.fromYear) clauses.push(`(FIRST_PDATE:[${opts.fromYear}-01-01 TO 3000-12-31])`);
  if (opts.reviewsOnly) {
    clauses.push(`(PUB_TYPE:"review" OR PUB_TYPE:"guideline" OR PUB_TYPE:"practice guideline")`);
  }
  if (opts.requireAbstract !== false) clauses.push("(HAS_ABSTRACT:Y)");

  const url =
    `${EUROPEPMC}/search?query=${encodeURIComponent(clauses.join(" AND "))}` +
    `&format=json&pageSize=${Math.min(limit * 3, 50)}&resultType=core&sort=CITED%20desc`;

  const json = await fetchJson<any>(url, opts.timeoutMs ?? 15_000);
  const results: any[] = json?.resultList?.result ?? [];
  return results
    .map(mapEpmcResult)
    .filter((r) => r.title && r.excerpt.length > 120)
    .slice(0, limit);
}

/**
 * Topic-scoped evidence search biased towards UK anaesthesia / ICM sources.
 * Returns the reputable-journal hits first, then the rest, so the LLM pass sees
 * BJA Education / BJA / Anaesthesia / Intensive Care Medicine at the top.
 */
export async function searchTopicEvidence(
  topicTitle: string,
  opts: SearchOptions & { extraTerms?: string; context?: string } = {},
): Promise<LiteratureRecord[]> {
  const term = topicTitle.replace(/["]/g, " ").trim();
  const extra = opts.extraTerms ? ` AND (${opts.extraTerms})` : "";

  const UK_JOURNALS =
    `(JOURNAL:"BJA Education" OR JOURNAL:"British Journal of Anaesthesia" ` +
    `OR JOURNAL:"Anaesthesia" OR JOURNAL:"BJA Open" OR JOURNAL:"Intensive Care Medicine" ` +
    `OR JOURNAL:"Critical Care" OR JOURNAL:"Critical Care Medicine" ` +
    `OR JOURNAL:"Continuing Education in Anaesthesia Critical Care & Pain")`;

  const DOMAIN =
    `(anaesthesia OR anesthesia OR anaesthetic OR "intensive care" OR "critical care" OR perioperative)`;

  // Content words from the topic title plus its stated scope. Exact-phrase
  // matching alone is far too brittle for titles like "Gas Laws" — it returns
  // whatever paper happens to contain that phrase. Requiring the significant
  // words in title/abstract, inside the anaesthesia/ICM domain, gives evidence
  // that is actually about the topic.
  const STOP = new Set([
    "and", "the", "for", "with", "of", "in", "to", "a", "an", "on", "its",
    "their", "clinical", "applications", "basics", "principles", "overview",
  ]);
  const words = `${term} ${opts.context ?? ""}`
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOP.has(w));
  const keyWords = Array.from(new Set(words)).slice(0, 6);
  const wordClause = keyWords.length > 0
    ? keyWords.map((w) => `TITLE_ABS:"${w}"`).join(" AND ")
    : `TITLE_ABS:"${term}"`;

  const uk = `TITLE_ABS:"${term}" AND ${UK_JOURNALS}${extra}`;
  const ukWords = `(${wordClause}) AND ${UK_JOURNALS}${extra}`;
  const broad = `(${wordClause}) AND ${DOMAIN}${extra}`;

  const [ukHits, ukWordHits, broadHits] = await Promise.all([
    searchEuropePmc(uk, { ...opts, limit: opts.limit ?? 4 }),
    searchEuropePmc(ukWords, { ...opts, limit: opts.limit ?? 4 }),
    searchEuropePmc(broad, { ...opts, limit: opts.limit ?? 4, reviewsOnly: true }),
  ]);

  const seen = new Set<string>();
  const merged: LiteratureRecord[] = [];
  for (const rec of [...ukHits, ...ukWordHits, ...broadHits]) {
    const key = rec.doi ?? rec.pmid ?? rec.title.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(rec);
  }

  merged.sort((a, b) => {
    const rep = Number(isReputableJournal(b.journal)) - Number(isReputableJournal(a.journal));
    if (rep !== 0) return rep;
    return (b.year ?? 0) - (a.year ?? 0);
  });

  return merged.slice(0, opts.limit ?? 6);
}

/** Recent (default last 4 years) reviews/guidelines — drives the freshness pass. */
export async function searchRecentGuidance(
  topicTitle: string,
  opts: { limit?: number; years?: number; timeoutMs?: number } = {},
): Promise<LiteratureRecord[]> {
  const years = opts.years ?? 4;
  const fromYear = new Date().getUTCFullYear() - years;
  return await searchEuropePmc(
    `TITLE_ABS:"${topicTitle.replace(/["]/g, " ").trim()}" AND ` +
      `(anaesthesia OR anesthesia OR "intensive care" OR perioperative)`,
    {
      limit: opts.limit ?? 4,
      fromYear,
      reviewsOnly: true,
      timeoutMs: opts.timeoutMs,
    },
  );
}

/**
 * Verbatim open-access full text for a PMC record, trimmed to the most useful
 * body sections. Returns null when the article is not open access.
 */
export async function fetchOpenAccessFullText(
  pmcid: string,
  maxChars = 12_000,
  timeoutMs = 20_000,
): Promise<string | null> {
  const id = pmcid.startsWith("PMC") ? pmcid : `PMC${pmcid}`;
  const r = await fetchWithRetry(`${EUROPEPMC}/${id}/fullTextXML`, timeoutMs, 2);
  if (!r.ok || !r.text || r.text.length < 200) return null;
  const body = r.text
    .replace(/<\?xml[\s\S]*?\?>/g, "")
    .replace(/<(ref-list|back|fig|table-wrap|graphic|media)[\s\S]*?<\/\1>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return body.slice(0, maxChars) || null;
}

// -------------------------------------------------------------------- PubMed

export interface PubmedSummary {
  pmid: string;
  title: string;
  journal?: string;
  year?: number;
  doi?: string;
  publicationTypes: string[];
  isRetracted: boolean;
  hasErratum: boolean;
}

/** esummary for one or more PMIDs — used to validate stored `pmid` fields. */
export async function pubmedSummaries(pmids: string[], timeoutMs = 15_000) {
  const ids = pmids.filter((p) => /^\d+$/.test(p));
  if (ids.length === 0) return new Map<string, PubmedSummary>();
  const url = `${EUTILS}/esummary.fcgi?db=pubmed&retmode=json&id=${ids.join(",")}`;
  const json = await fetchJson<any>(url, timeoutMs);
  const out = new Map<string, PubmedSummary>();
  const result = json?.result;
  if (!result) return out;
  for (const pmid of ids) {
    const rec = result[pmid];
    if (!rec || rec.error) continue;
    const pubTypes: string[] = Array.isArray(rec.pubtype) ? rec.pubtype.map(String) : [];
    const doi = Array.isArray(rec.articleids)
      ? rec.articleids.find((a: any) => a?.idtype === "doi")?.value
      : undefined;
    out.set(pmid, {
      pmid,
      title: String(rec.title ?? "").replace(/<[^>]+>/g, "").trim(),
      journal: rec.fulljournalname ?? rec.source,
      year: rec.pubdate ? Number(String(rec.pubdate).slice(0, 4)) : undefined,
      doi: doi ? String(doi).toLowerCase() : undefined,
      publicationTypes: pubTypes,
      isRetracted: pubTypes.some((t) => /retracted publication|retraction of/i.test(t)),
      hasErratum: pubTypes.some((t) => /erratum|corrected and republished/i.test(t)),
    });
  }
  return out;
}

// ------------------------------------------------------------------- Crossref

export interface CrossrefWork {
  doi: string;
  title: string;
  containerTitle?: string;
  year?: number;
  type?: string;
  isRetracted: boolean;
  hasErratum: boolean;
  publisher?: string;
}

/** Authoritative metadata for a DOI. `null` means the DOI does not resolve. */
export async function crossrefWork(doi: string, timeoutMs = 15_000): Promise<CrossrefWork | null> {
  const clean = doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, "").trim();
  if (!clean) return null;
  const json = await fetchJson<any>(
    `${CROSSREF}/works/${encodeURIComponent(clean)}?mailto=hello@anaesthesiacore.app`,
    timeoutMs,
  );
  const m = json?.message;
  if (!m) return null;
  const updates: any[] = Array.isArray(m["update-to"]) ? m["update-to"] : [];
  const updatedBy: any[] = Array.isArray(m["updated-by"]) ? m["updated-by"] : [];
  const relations = updatedBy.concat(updates);
  const issuedYear = m.issued?.["date-parts"]?.[0]?.[0];
  return {
    doi: String(m.DOI ?? clean).toLowerCase(),
    title: Array.isArray(m.title) ? String(m.title[0] ?? "") : String(m.title ?? ""),
    containerTitle: Array.isArray(m["container-title"])
      ? m["container-title"][0]
      : m["container-title"],
    year: typeof issuedYear === "number" ? issuedYear : undefined,
    type: m.type,
    isRetracted:
      /retraction/i.test(String(m.type ?? "")) ||
      relations.some((r) => /retraction/i.test(String(r?.type ?? ""))),
    hasErratum: relations.some((r) => /correction|erratum/i.test(String(r?.type ?? ""))),
    publisher: m.publisher,
  };
}

/** Extract a DOI from any URL or citation string. */
export function extractDoi(...candidates: (string | undefined | null)[]): string | undefined {
  for (const c of candidates) {
    if (!c) continue;
    // DOIs legitimately contain parentheses (Lancet/Elsevier style), so keep
    // them and only trim unbalanced trailing punctuation.
    const m = c.match(/10\.\d{4,9}\/[^\s"'<>\]},;]+/i);
    if (!m) continue;
    let doi = m[0].replace(/[.,;]+$/, "");
    const opens = (doi.match(/\(/g) ?? []).length;
    const closes = (doi.match(/\)/g) ?? []).length;
    if (closes > opens) doi = doi.replace(/\)+$/, "");
    return doi.toLowerCase();
  }
  return undefined;
}

/** Normalise a title for fuzzy comparison against a stored citation. */
export function normaliseTitle(s: string): string {
  return s
    .toLowerCase()
    .replace(/&[a-z]+;/g, " ")
    .replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Token-overlap similarity (0–1) between a stored citation and an official title. */
export function titleSimilarity(citation: string, officialTitle: string): number {
  const cit = new Set(normaliseTitle(citation).split(" ").filter((w) => w.length > 3));
  const off = normaliseTitle(officialTitle).split(" ").filter((w) => w.length > 3);
  if (off.length === 0) return 0;
  let hits = 0;
  for (const w of off) if (cit.has(w)) hits++;
  return hits / off.length;
}
