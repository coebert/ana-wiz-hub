import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Atom, Heart, FlaskConical, Stethoscope, Activity, ClipboardList, Bone } from "lucide-react";
import { allTopics, Topic, Section, sectionMeta } from "@/data/curriculum";
import { useExamFilter } from "@/contexts/ExamFilterContext";

const topicsWithPaths: (Topic & { path: string })[] = allTopics.map((t) => ({
  ...t,
  path: `${sectionMeta[t.section].path}/${t.id}`,
}));

const sectionIcons: Record<Section, typeof Atom> = {
  physics: Atom,
  physiology: Heart,
  pharmacology: FlaskConical,
  anatomy: Bone,
  clinical: Stethoscope,
  "intensive-care": Activity,
  perioperative: ClipboardList,
};

const sectionColors: Record<Section, string> = {
  physics: "text-physics",
  physiology: "text-physiology",
  pharmacology: "text-pharmacology",
  anatomy: "text-anatomy",
  clinical: "text-clinical",
  "intensive-care": "text-icu",
  perioperative: "text-perioperative",
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

  const filtered = topicsWithPaths.filter((t) => matchesFilter(t.examTags));

  const results = query.trim().length > 0
    ? filtered.filter((t) => {
        const q = query.toLowerCase();
        return (
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.section.toLowerCase().includes(q)
        );
      })
    : filtered.filter((t) => t.available);

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
