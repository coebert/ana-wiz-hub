/**
 * Canonical source library.
 *
 * Each entry describes ONE bibliographic source (a textbook, a journal, a
 * guideline body, a national audit project) — the things citation labels in
 * `topicReferences` actually point at. Centralising these lets us:
 *
 *   1. Stop duplicating full citation prose across 121 topics. A single
 *      "Peck & Hill 5th ed." authoritative title now lives in one place.
 *   2. Render references in a CONSISTENT FORMAT (author. title. publisher;
 *      year. <locator>. URL) regardless of who authored the topic.
 *   3. Surface the underlying SOURCE TYPE (textbook / journal / guideline /
 *      audit / society) so the UI can group, badge, or filter by evidence
 *      class later without changing every topic file.
 *
 * Two ways to cite a source from `topicReferences[topicId]`:
 *
 *   A. Legacy (still supported, no changes needed): hand-rolled
 *      `{ label, citation, url? }` objects.
 *
 *   B. New: `resolveReference({ sourceId: "peck-hill", locator: "Ch.3" })`
 *      which returns a `Reference` with `label`, `citation`, and `url`
 *      formatted from the canonical `Source` record below.
 *
 * Adding a new source: append to `sources` with a stable kebab-case id.
 */

export type SourceType =
  | "textbook"
  | "journal"
  | "guideline"
  | "audit"
  | "society"
  | "report"
  | "website";

export interface Source {
  /** Stable identifier used by `resolveReference({ sourceId })`. */
  id: string;
  /** Short, human-friendly name for the citation label, e.g. "Peck & Hill" or "BJA Education". */
  shortName: string;
  /** Source classification — drives potential UI grouping/badging. */
  type: SourceType;
  /** Full author / corporate author string, e.g. "Peck TE, Hill SA" or "NICE". */
  author?: string;
  /** Title of the work (book / journal / guideline). */
  title: string;
  /** Publisher (textbooks, guidelines). */
  publisher?: string;
  /** Edition (textbooks). */
  edition?: string;
  /** Default publication year — overridable per-citation. */
  year?: number;
  /** ISSN / ISBN (informational, not currently rendered). */
  identifier?: string;
  /** Canonical landing URL — overridable per-citation. */
  url?: string;
}

/**
 * Master source library. Add new sources here as they are first cited.
 * Keep `id` kebab-case and stable — these are referenced from topic data.
 */
export const sources: Source[] = [
  // ──────── Anaesthesia / ICM Textbooks ────────
  {
    id: "peck-hill",
    shortName: "Peck & Hill",
    type: "textbook",
    author: "Peck TE, Hill SA",
    title: "Pharmacology for Anaesthesia and Intensive Care",
    publisher: "Cambridge University Press",
    edition: "5th ed.",
    year: 2021,
  },
  {
    id: "cross-plunkett",
    shortName: "Cross & Plunkett",
    type: "textbook",
    author: "Cross ME, Plunkett EVE",
    title: "Physics, Pharmacology and Physiology for Anaesthetists",
    publisher: "Cambridge University Press",
    edition: "2nd ed.",
    year: 2014,
  },
  {
    id: "al-shaikh-stacey",
    shortName: "Al-Shaikh & Stacey",
    type: "textbook",
    author: "Al-Shaikh B, Stacey S",
    title: "Essentials of Anaesthetic Equipment",
    publisher: "Elsevier",
    edition: "5th ed.",
    year: 2019,
  },
  {
    id: "davey-diba",
    shortName: "Davey & Diba",
    type: "textbook",
    author: "Davey AJ, Diba A",
    title: "Ward's Anaesthetic Equipment",
    publisher: "Elsevier",
    edition: "6th ed.",
    year: 2012,
  },
  {
    id: "middleton-physics",
    shortName: "Middleton",
    type: "textbook",
    author: "Middleton B, Phillips J, Thomas R",
    title: "Physics in Anaesthesia",
    publisher: "Scion Publishing",
    edition: "2nd ed.",
    year: 2019,
  },
  {
    id: "millers-anesthesia",
    shortName: "Miller's Anesthesia",
    type: "textbook",
    author: "Gropper MA (ed.)",
    title: "Miller's Anesthesia",
    publisher: "Elsevier",
    edition: "9th ed.",
    year: 2020,
  },
  {
    id: "oh-icm",
    shortName: "Oh's Intensive Care Manual",
    type: "textbook",
    author: "Bersten AD, Handy JM (eds.)",
    title: "Oh's Intensive Care Manual",
    publisher: "Elsevier",
    edition: "8th ed.",
    year: 2019,
  },

  // ──────── Journals ────────
  {
    id: "bja-education",
    shortName: "BJA Education",
    type: "journal",
    title: "BJA Education",
    publisher: "Oxford Academic / Royal College of Anaesthetists",
    url: "https://www.bjaed.org/",
  },
  {
    id: "british-journal-anaesthesia",
    shortName: "Br J Anaesth",
    type: "journal",
    title: "British Journal of Anaesthesia",
    publisher: "Elsevier",
    url: "https://www.bjanaesthesia.org/",
  },
  {
    id: "anaesthesia",
    shortName: "Anaesthesia",
    type: "journal",
    title: "Anaesthesia",
    publisher: "Wiley / Association of Anaesthetists",
    url: "https://associationofanaesthetists-publications.onlinelibrary.wiley.com/journal/13652044",
  },
  {
    id: "critical-care-medicine",
    shortName: "Crit Care Med",
    type: "journal",
    title: "Critical Care Medicine",
    publisher: "Wolters Kluwer / SCCM",
    url: "https://journals.lww.com/ccmjournal",
  },
  {
    id: "intensive-care-medicine",
    shortName: "Intensive Care Med",
    type: "journal",
    title: "Intensive Care Medicine",
    publisher: "Springer / ESICM",
    url: "https://www.springer.com/journal/134",
  },
  {
    id: "nejm",
    shortName: "NEJM",
    type: "journal",
    title: "New England Journal of Medicine",
    publisher: "Massachusetts Medical Society",
    url: "https://www.nejm.org/",
  },

  // ──────── UK Guidelines & Societies ────────
  {
    id: "nice",
    shortName: "NICE",
    type: "guideline",
    author: "National Institute for Health and Care Excellence",
    title: "NICE Guidance",
    url: "https://www.nice.org.uk/guidance",
  },
  {
    id: "aagbi",
    shortName: "AAGBI",
    type: "society",
    author: "Association of Anaesthetists",
    title: "AAGBI Guidelines",
    url: "https://anaesthetists.org/Home/Resources-publications/Guidelines",
  },
  {
    id: "rcoa",
    shortName: "RCoA",
    type: "society",
    author: "Royal College of Anaesthetists",
    title: "RCoA Guidance",
    url: "https://www.rcoa.ac.uk/",
  },
  {
    id: "das",
    shortName: "DAS",
    type: "society",
    author: "Difficult Airway Society",
    title: "DAS Guidelines",
    url: "https://das.uk.com/guidelines",
  },
  {
    id: "ics",
    shortName: "ICS",
    type: "society",
    author: "Intensive Care Society",
    title: "ICS Standards & Guidelines",
    url: "https://ics.ac.uk/resources",
  },
  {
    id: "ficm",
    shortName: "FICM",
    type: "society",
    author: "Faculty of Intensive Care Medicine",
    title: "FICM Guidance",
    url: "https://ficm.ac.uk/standardssafetyguidelines-standards",
  },
  {
    id: "resus-council-uk",
    shortName: "RCUK",
    type: "society",
    author: "Resuscitation Council UK",
    title: "Resuscitation Council UK Guidelines",
    url: "https://www.resus.org.uk/library/2021-resuscitation-guidelines",
  },

  // ──────── International Guidelines ────────
  {
    id: "ssc",
    shortName: "Surviving Sepsis",
    type: "guideline",
    author: "Surviving Sepsis Campaign",
    title: "International Guidelines for Management of Sepsis and Septic Shock",
    publisher: "SCCM / ESICM",
  },
  {
    id: "esa",
    shortName: "ESAIC",
    type: "society",
    author: "European Society of Anaesthesiology and Intensive Care",
    title: "ESAIC Guidelines",
    url: "https://www.esaic.org/",
  },
  {
    id: "kdigo",
    shortName: "KDIGO",
    type: "guideline",
    author: "Kidney Disease: Improving Global Outcomes",
    title: "KDIGO Clinical Practice Guidelines",
    url: "https://kdigo.org/guidelines/",
  },

  // ──────── National Audits / Reports ────────
  {
    id: "nap",
    shortName: "NAP",
    type: "audit",
    author: "Royal College of Anaesthetists / NAP",
    title: "National Audit Project (NAP) reports",
    url: "https://www.nationalauditprojects.org.uk/",
  },
];

/** Lookup by id with a friendly error in dev. */
const sourceById = new Map(sources.map((s) => [s.id, s]));

export const getSource = (id: string): Source | undefined => sourceById.get(id);

/**
 * A compact citation that points at a canonical `Source` plus the specific
 * locator (chapter, year, page, guideline number, NAP report number, etc.)
 * that pins down the exact piece of evidence.
 */
export interface SourceCitation {
  /** Must match an `id` in `sources`. */
  sourceId: string;
  /**
   * Specific locator within the source. For textbooks: "Ch.3" / "Ch.7-8".
   * For journals: "2017;17(3):73-78". For NICE: "CG65". For NAP: "NAP5".
   * Free-form so we can match the evidence class.
   */
  locator?: string;
  /** Year override (e.g. for a specific guideline edition). */
  year?: number;
  /** Override the canonical landing URL with a deeper link (DOI, PDF, page). */
  url?: string;
  /**
   * Optional override for the rendered short label. Defaults to a sensible
   * combination of `shortName` + `locator` (or year for journals).
   */
  label?: string;
  /**
   * Optional extra title line — useful for a SPECIFIC article in a journal,
   * a SPECIFIC NICE guideline, or a SPECIFIC NAP report. Renders between
   * author and source title.
   */
  articleTitle?: string;
  /** Optional article authors (for journal articles in a journal source). */
  articleAuthor?: string;
}

import type { Reference } from "./references";

/**
 * Format a `SourceCitation` against the canonical `sources` library into a
 * `Reference` suitable for inclusion in `topicReferences[topicId]`.
 *
 * Format (consistent across all sources):
 *   <author>. <articleTitle?>. <title>. <publisher>; <year>. <locator>. <url>
 *
 * Missing fields are quietly dropped so the output stays clean for sources
 * that don't have an author (e.g. NICE) or a publisher.
 */
export const resolveReference = (cite: SourceCitation): Reference => {
  const src = getSource(cite.sourceId);
  if (!src) {
    if (import.meta.env.DEV) {
       
      console.warn(
        `[sources] Unknown sourceId "${cite.sourceId}". ` +
          `Add it to src/data/sources.ts.`,
      );
    }
    return {
      label: cite.label ?? cite.sourceId,
      citation: `Unknown source: ${cite.sourceId}${cite.locator ? ` ${cite.locator}` : ""}`,
      url: cite.url,
    };
  }

  const year = cite.year ?? src.year;
  const url = cite.url ?? src.url;

  // Default label: "<shortName> <locator>" or "<shortName> <year>" for journals.
  const defaultLabel =
    cite.label ??
    [
      src.shortName,
      cite.locator ?? (src.type === "journal" && year ? String(year) : undefined),
    ]
      .filter(Boolean)
      .join(" ");

  // Citation parts — joined with ". " so missing fields collapse cleanly.
  const articleAuthorSegment = cite.articleAuthor
    ? cite.articleAuthor
    : src.author;

  const titleSegment = cite.articleTitle
    ? `${cite.articleTitle}. ${src.title}`
    : src.title;

  const editionSegment = src.edition ? `${src.edition}` : undefined;

  const publisherYearSegment = [src.publisher, year ? String(year) : undefined]
    .filter(Boolean)
    .join("; ");

  const parts = [
    articleAuthorSegment,
    titleSegment,
    editionSegment,
    publisherYearSegment || undefined,
    cite.locator,
  ].filter(Boolean) as string[];

  return {
    label: defaultLabel,
    citation: parts.join(". ") + ".",
    url,
  };
};

/**
 * Convenience: resolve an array of citations (or pre-formed Reference
 * objects) into a single `Reference[]`. Lets a topic mix the new compact
 * form with legacy hand-rolled entries during incremental migration.
 */
export const resolveReferences = (
  entries: Array<SourceCitation | Reference>,
): Reference[] =>
  entries.map((e) =>
    "sourceId" in e ? resolveReference(e) : e,
  );
