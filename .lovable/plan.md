# Replace scraped content audits with a source-and-literature audit

## Why the current audit underperforms

Today's audit reads each topic by scraping the **published web page**, then searches
reputable sites by scraping **search results**. Both halves are fragile:

- Scraped pages return partial text (diagrams, tabs and interactive panels never
  appear), so the auditor judges content it cannot fully see.
- Journal and guideline sites block or truncate scrapes, so "evidence" is often a
  snippet or a paywall notice rather than the actual paper.
- Nothing checks whether the references already in the app are real, current, or
  correctly quoted.

## The alternative strategy

Audit against **two things we can read completely and reliably**: the app's own
content files, and the structured research databases that publish machine-readable
records for free.

1. **Read the content, don't scrape it.** A build step assembles an audit corpus
   straight from the topic source files, glossary, drug data and reference list —
   complete text, every diagram label, every citation, no rendering involved.

2. **Get evidence from research databases, not web pages.** Use Europe PMC,
   PubMed and Crossref: they return full records (title, journal, year, abstract,
   and open-access full text where available), plus retraction and erratum flags.
   Every audit finding must quote the retrieved record verbatim and carry a DOI or
   PubMed link, so each one is checkable in one click.

3. **Check what can be checked without AI, every build.** Three deterministic
   checks run in CI and fail fast:
   - *Reference integrity* — every DOI and PubMed ID resolves, and the stored
     title, journal and year match the official record; retracted or corrected
     papers are flagged loudly.
   - *Freshness* — guidelines and textbook editions cited are compared against the
     newest version the databases know about.
   - *Citation coverage* — any dose, threshold or numeric claim without a nearby
     reference is reported, extending the existing citation checks.

4. **Use AI only for judgement, with evidence in hand.** One pass per topic
   compares the app's text against the retrieved abstracts and open-access full
   text, and may only raise a finding when it can quote the source sentence that
   contradicts or updates the app. No quote, no finding.

5. **Run it on a rotation.** A scheduled job audits a small batch of topics per
   run so the whole curriculum cycles through regularly, with progress recorded per
   topic and a single-flight lock. It pauses itself and tells you if AI credits run
   out.

6. **Expansion, not just correction.** The same retrieved literature drives a
   "content gaps" report: recent high-quality reviews on a topic that the app does
   not yet cover or cite, surfaced as suggested additions with citations attached.

## What you will see

- The Content Audit dashboard gains findings that each carry a quoted source
  passage and a direct DOI/PubMed link, plus separate tabs for reference problems,
  outdated guidance, and suggested expansions.
- Builds fail when a reference is broken, retracted or misquoted, so bad citations
  cannot ship.
- The audit keeps working through the curriculum on its own instead of needing a
  manual scrape run.

## Technical notes

- New `scripts/build-audit-corpus.ts` emits `audit-corpus.json` (topic text, diagram
  labels, references, exam tags) from `src/data/*` and topic `.tsx` sources.
- New `scripts/check-reference-integrity.mjs`, `check-source-freshness.mjs` wired
  into `scripts/content-check.mjs` and the CI workflow; results cached in
  `scripts/reference-integrity.snapshot.json` to keep CI fast and offline-safe.
- Evidence layer: `supabase/functions/_shared/literature.ts` wrapping Europe PMC
  (`/webservices/rest/search`, `/fullTextXML`), NCBI E-utilities (`esearch`/`esummary`)
  and Crossref (`/works/{doi}`) with rate-limit-aware backoff. No API keys required;
  Firecrawl kept only as an optional fallback for guideline PDFs.
- `audit-topics` rewritten: corpus-driven, literature-backed, batched (default 5
  topics/run), lease-row single-flight lock, idempotent per-topic progress, circuit
  breaker halting on `402`/`403` and parking on repeated `429`.
- New tables: `audit_reference_checks`, `audit_content_gaps`, plus a
  `audit_job_state` lease/pause row — each with GRANTs and admin-only RLS.
- Findings gain `evidence_quote`, `evidence_doi`, `evidence_pmid`, `evidence_year`
  columns; `ContentAudit.tsx` renders them.
- Scheduling via pg_cron calling the function, with the paused-state guard checked
  at entry.
