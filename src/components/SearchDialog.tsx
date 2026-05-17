import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Atom, Heart, FlaskConical, Stethoscope, Activity, ClipboardList, Bone, Beaker } from "lucide-react";
import { allTopics, Topic, Section, sectionMeta } from "@/data/curriculum";
import { useExamFilter } from "@/contexts/ExamFilterContext";
import * as quizzes from "@/data/quizzes";

const toCamel = (id: string) => id.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

const quizMap = quizzes as Record<string, Array<{ question?: string; options?: string[]; explanation?: string }>>;

const stripDiacritics = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

type IndexedTopic = Topic & { path: string; haystack: string; keywords: string[] };

const buildHaystack = (t: Topic): { haystack: string; keywords: string[] } => {
  const parts: string[] = [t.title, t.description, t.section];
  const quizKey = `${toCamel(t.id)}Quiz`;
  const quiz = quizMap[quizKey];
  if (Array.isArray(quiz)) {
    for (const q of quiz) {
      if (q.question) parts.push(q.question);
      if (q.explanation) parts.push(q.explanation);
      if (Array.isArray(q.options)) parts.push(q.options.join(" "));
    }
  }
  const joined = stripDiacritics(parts.join(" ").toLowerCase());
  // Extract keywords (words >= 3 chars) for snippet/match hinting
  const keywords = Array.from(new Set(joined.match(/[a-z0-9][a-z0-9-]{2,}/g) ?? []));
  return { haystack: joined, keywords };
};

const topicsWithPaths: IndexedTopic[] = allTopics.map((t) => {
  const { haystack, keywords } = buildHaystack(t);
  return {
    ...t,
    path: `${sectionMeta[t.section].path}/${t.id}`,
    haystack,
    keywords,
  };
});

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

export const SearchDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { matchesFilter } = useExamFilter();

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const filtered = useMemo(
    () => topicsWithPaths.filter((t) => matchesFilter(t.examTags)),
    [matchesFilter],
  );

  const { results, snippets } = useMemo(() => {
    const trimmed = query.trim();
    if (trimmed.length === 0) {
      return {
        results: filtered.filter((t) => t.available),
        snippets: new Map<string, string>(),
      };
    }
    const normQuery = stripDiacritics(trimmed.toLowerCase());
    const tokens = normQuery.split(/\s+/).filter((t) => t.length > 0);
    const snippetMap = new Map<string, string>();
    const scored: { topic: IndexedTopic; score: number }[] = [];

    for (const t of filtered) {
      const title = stripDiacritics(t.title.toLowerCase());
      const desc = stripDiacritics(t.description.toLowerCase());
      if (!tokens.every((tok) => t.haystack.includes(tok))) continue;

      let score = 0;
      if (title.includes(normQuery)) score += 100;
      if (title.startsWith(tokens[0])) score += 30;
      if (desc.includes(normQuery)) score += 40;
      for (const tok of tokens) {
        if (title.includes(tok)) score += 10;
        if (desc.includes(tok)) score += 5;
      }
      if (!t.available) score -= 5;

      if (!title.includes(tokens[0]) && !desc.includes(tokens[0])) {
        const idx = t.haystack.indexOf(tokens[0]);
        if (idx >= 0) {
          const start = Math.max(0, idx - 40);
          const end = Math.min(t.haystack.length, idx + tokens[0].length + 60);
          const raw = t.haystack.slice(start, end).replace(/\s+/g, " ").trim();
          snippetMap.set(t.id, `${start > 0 ? "…" : ""}${raw}${end < t.haystack.length ? "…" : ""}`);
        }
      }
      scored.push({ topic: t, score });
    }
    scored.sort((a, b) => b.score - a.score);
    return { results: scored.map((s) => s.topic), snippets: snippetMap };
  }, [query, filtered]);

  const handleSelect = (topic: typeof topicsWithPaths[0]) => {
    if (topic.available) {
      navigate(topic.path);
      onClose();
    }
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
              placeholder="Search topics…"
              className="flex-1 py-3.5 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="max-h-[50vh] overflow-y-auto py-2">
            {results.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                No topics found{query ? ` for "${query}"` : ""}
              </p>
            ) : (
              results.map((topic) => {
                const Icon = sectionIcons[topic.section];
                return (
                  <button
                    key={`${topic.section}-${topic.id}`}
                    onClick={() => handleSelect(topic)}
                    disabled={!topic.available}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                      topic.available
                        ? "hover:bg-muted cursor-pointer"
                        : "opacity-40 cursor-not-allowed"
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${sectionColors[topic.section]}`} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{topic.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{topic.description}</p>
                    </div>
                    {!topic.available && (
                      <span className="ml-auto text-xs text-muted-foreground shrink-0">Soon</span>
                    )}
                  </button>
                );
              })
            )}
          </div>
          <div className="px-4 py-2 border-t border-border text-xs text-muted-foreground">
            <kbd className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono text-[10px]">Esc</kbd> to close
          </div>
        </div>
      </div>
    </div>
  );
};
