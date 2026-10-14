import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Atom, Heart, FlaskConical, Stethoscope, Activity, ClipboardList, Bone, Beaker, Loader2 } from "lucide-react";
import { allTopics, Topic, Section, sectionMeta } from "@/data/curriculum";
import { useExamFilter } from "@/contexts/ExamFilterContext";

/**
 * Site search.
 *
 * Full-text search over every topic's content, not just titles: the index
 * (src/data/searchIndex.generated.json, rebuilt on predev/prebuild) contains
 * heading and prose snippets extracted from each topic's source, each tagged
 * with the in-page section anchor it came from, so results deep-link to the
 * exact section (e.g. "APRV" → Mechanical Ventilation § Airway Pressure
 * Release Ventilation).
 *
 * The index is ~1.3 MB, so it is lazy-loaded on first open of the dialog and
 * never touches the initial page load.
 */

interface SearchRecord {
  t: string;
  a: string | null;
  k: "heading" | "prose";
}

interface SearchIndexEntry {
  id: string;
  section: Section;
  path: string;
  title: string;
  description: string;
  examTags: string[];
  records: SearchRecord[];
}

interface LoadedEntry extends SearchIndexEntry {
  normTitle: string;
  normDesc: string;
  normRecords: { rec: SearchRecord; norm: string }[];
}

const stripDiacritics = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const normalize = (s: string) => stripDiacritics(s.toLowerCase());

/** Singular/plural tolerance: "vaporisers" should also match "vaporiser". */
const tokenVariants = (token: string): string[] => {
  const out = [token];
  if (token.length >= 5 && token.endsWith("s")) out.push(token.slice(0, -1));
  if (token.length >= 4 && token.endsWith("es")) out.push(token.slice(0, -2));
  return out;
};

/** Does `norm` contain the token, preferring word-start matches? */
const tokenHit = (norm: string, token: string): boolean => {
  for (const v of tokenVariants(token)) {
    if (v.length >= 4) {
      if (norm.includes(v)) return true;
    } else {
      // Short tokens (e.g. "icu", "tiva") must match at a word start.
      const idx = norm.indexOf(v);
      if (idx === 0 || (idx > 0 && /[^a-z0-9]/.test(norm[idx - 1]))) return true;
    }
  }
  return false;
};

const sectionIcons: Record<Section, typeof Atom> = {
  physics: Atom,
  physiology: Heart,
  pharmacology: FlaskConical,
  anatomy: Bone,
  clinical: Stethoscope,
  "intensive-care": Activity,
  perioperative: ClipboardList,
  chemistry: Beaker,
};

const sectionColors: Record<Section, string> = {
  physics: "text-physics",
  physiology: "text-physiology",
  pharmacology: "text-pharmacology",
  anatomy: "text-anatomy",
  clinical: "text-clinical",
  "intensive-care": "text-icu",
  perioperative: "text-perioperative",
  chemistry: "text-chemistry",
};

interface Result {
  entry: LoadedEntry | (Topic & { path: string; records?: never });
  score: number;
  snippet: string | null;
  anchor: string | null;
}

/** Snippet centred on the first matched token in a record. */
const makeSnippet = (text: string, token: string): string => {
  const norm = normalize(text);
  let idx = -1;
  for (const v of tokenVariants(token)) {
    idx = norm.indexOf(v);
    if (idx >= 0) break;
  }
  if (idx < 0) return text.slice(0, 120);
  const start = Math.max(0, idx - 40);
  const end = Math.min(text.length, idx + token.length + 80);
  const raw = text.slice(start, end).replace(/\s+/g, " ").trim();
  return `${start > 0 ? "…" : ""}${raw}${end < text.length ? "…" : ""}`;
};

export const SearchDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<LoadedEntry[] | null>(null);
  const [indexLoading, setIndexLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { matchesFilter } = useExamFilter();

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Lazy-load the content index on first open; never blocks the initial load.
  useEffect(() => {
    if (!open || index || indexLoading) return;
    setIndexLoading(true);
    import("@/data/searchIndex.generated.json")
      .then((mod) => {
        const data = mod.default as { topics: SearchIndexEntry[] };
        setIndex(
          data.topics.map((e) => ({
            ...e,
            normTitle: normalize(e.title),
            normDesc: normalize(e.description),
            normRecords: e.records.map((rec) => ({ rec, norm: normalize(rec.t) })),
          })),
        );
      })
      .catch(() => setIndex([]))
      .finally(() => setIndexLoading(false));
  }, [open, index, indexLoading]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const filtered = useMemo(
    () => index?.filter((e) => matchesFilter(e.examTags)) ?? null,
    [index, matchesFilter],
  );

  const { results, total } = useMemo((): { results: Result[]; total: number } => {
    const trimmed = query.trim();

    // No query yet: list every topic (title/description only, no index needed).
    if (trimmed.length === 0) {
      const base = (filtered ?? allTopics).filter((t) => t.available);
      return {
        results: base.map((t) => ({
          entry: {
            ...t,
            path: `${sectionMeta[t.section].path}/${t.id}`,
          },
          score: 0,
          snippet: null,
          anchor: null,
        })),
        total: base.length,
      };
    }

    // Content index still loading: nothing to search yet.
    if (!filtered) return { results: [], total: 0 };

    const normQuery = normalize(trimmed);
    const tokens = normQuery.split(/\s+/).filter((t) => t.length > 0);
    const scored: Result[] = [];

    for (const entry of filtered) {
      let score = 0;
      let snippet: string | null = null;
      let anchor: string | null = null;

      // Title and description first — strongest signals.
      if (entry.normTitle.includes(normQuery)) score += 120;
      if (entry.normTitle.startsWith(tokens[0])) score += 40;
      if (entry.normDesc.includes(normQuery)) score += 30;
      for (const tok of tokens) {
        if (tokenHit(entry.normTitle, tok)) score += 25;
        if (tokenHit(entry.normDesc, tok)) score += 8;
      }

      // Content records: every token must appear somewhere in the topic.
      const matchedRecords = new Set<number>();
      let allTokensFound = true;
      for (const tok of tokens) {
        let best = -1;
        let bestScore = 0;
        entry.normRecords.forEach(({ rec, norm }, i) => {
          if (!tokenHit(norm, tok)) return;
          allTokensFound = true;
          // Prefer heading records; prefer earlier (higher-level) records.
          const recScore =
            (rec.k === "heading" ? 30 : 8) + (norm.startsWith(tok) ? 12 : 0);
          if (recScore > bestScore) {
            bestScore = recScore;
            best = i;
          }
        });
        if (best < 0) {
          // Token not in title, description or content at all → no match.
          if (!tokenHit(entry.normTitle, tok) && !tokenHit(entry.normDesc, tok)) {
            allTokensFound = false;
            break;
          }
        } else {
          matchedRecords.add(best);
          score += bestScore;
        }
      }
      if (!allTokensFound) continue;

      // Diversity bonus: matching several distinct sections beats one hit.
      score += Math.min(matchedRecords.size, 6) * 5;

      // Best snippet: prefer a matched heading (deep-linkable), else best prose.
      let bestIdx = -1;
      let bestSnippetScore = -1;
      for (const i of matchedRecords) {
        const { rec, norm } = entry.normRecords[i];
        const s = (rec.k === "heading" ? 50 : 10) + (norm.startsWith(tokens[0]) ? 10 : 0);
        if (s > bestSnippetScore) {
          bestSnippetScore = s;
          bestIdx = i;
        }
      }
      if (bestIdx >= 0) {
        const { rec } = entry.normRecords[bestIdx];
        snippet = makeSnippet(rec.t, tokens[0]);
        anchor = rec.a;
        if (rec.k === "heading") snippet = `§ ${snippet}`;
      }

      scored.push({ entry, score, snippet, anchor });
    }

    scored.sort((a, b) => b.score - a.score);
    return { results: scored.slice(0, 25), total: scored.length };
  }, [query, filtered]);

  const handleSelect = (r: Result) => {
    if (!r.entry.available) return;
    const href = r.anchor ? `${r.entry.path}#${r.anchor}` : r.entry.path;
    navigate(href);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" onClick={onClose} />
      <div className="relative mx-auto mt-[15vh] w-[90%] max-w-lg">
        <div className="rounded-xl bg-card border border-border shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 px-4 border-b border-border">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search all topic content — e.g. APRV, cauda equina, TOF…"
              className="flex-1 py-3.5 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
            />
            {indexLoading && <Loader2 className="h-4 w-4 text-muted-foreground animate-spin shrink-0" />}
            {query && (
              <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="max-h-[50vh] overflow-y-auto py-2">
            {results.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                {indexLoading
                  ? "Loading search index…"
                  : `No topics found${query ? ` for "${query}"` : ""}`}
              </p>
            ) : (
              results.map((r) => {
                const Icon = sectionIcons[r.entry.section];
                return (
                  <button
                    key={`${r.entry.section}-${r.entry.id}-${r.anchor ?? ""}`}
                    onClick={() => handleSelect(r)}
                    disabled={!r.entry.available}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                      r.entry.available
                        ? "hover:bg-muted cursor-pointer"
                        : "opacity-40 cursor-not-allowed"
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${sectionColors[r.entry.section]}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{r.entry.title}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {r.snippet ?? r.entry.description}
                      </p>
                    </div>
                    {!r.entry.available && (
                      <span className="ml-auto text-xs text-muted-foreground shrink-0">Soon</span>
                    )}
                  </button>
                );
              })
            )}
          </div>
          <div className="px-4 py-2 border-t border-border text-xs text-muted-foreground flex items-center justify-between">
            <span>
              {query
                ? `${total} topic${total === 1 ? "" : "s"} match — searches all content`
                : "Type to search titles, sections and content"}
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono text-[10px]">Esc</kbd> to close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
