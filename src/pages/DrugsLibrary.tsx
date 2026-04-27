import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Pill, Search, ChevronDown, ChevronUp, Minimize2, Maximize2 } from "lucide-react";
import { Header } from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";

interface DrugRow {
  slug: string;
  name: string;
  drug_class: string;
  indication_oneliner: string;
  synonyms: string[];
}

export default function DrugsLibrary() {
  const [rows, setRows] = useState<DrugRow[]>([]);
  const [q, setQ] = useState("");
  const [activeClass, setActiveClass] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem("drugs-library-collapsed");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("drugs-library-collapsed", JSON.stringify(collapsed));
    } catch {
      // ignore
    }
  }, [collapsed]);

  const toggleCollapsed = (slug: string) => {
    setCollapsed((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("drugs")
        .select("slug,name,drug_class,indication_oneliner,synonyms")
        .order("name");
      if (!error && data) setRows(data as DrugRow[]);
      setLoading(false);
    })();
  }, []);

  const classes = useMemo(() => {
    const s = new Set(rows.map((r) => r.drug_class));
    return Array.from(s).sort();
  }, [rows]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (activeClass && r.drug_class !== activeClass) return false;
      if (!needle) return true;
      return (
        r.name.toLowerCase().includes(needle) ||
        r.drug_class.toLowerCase().includes(needle) ||
        r.indication_oneliner.toLowerCase().includes(needle) ||
        (r.synonyms || []).some((s) => s.toLowerCase().includes(needle))
      );
    });
  }, [rows, q, activeClass]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6 flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-drugs/10 text-drugs grid place-items-center shrink-0">
            <Pill className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Drug Formulary</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Searchable monographs across anaesthesia and critical care — presentation, MoA, PK, preparation, dosing, monitoring, side effects.
            </p>
          </div>
        </div>

        <div className="mb-4 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, class, indication, or brand name…"
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-border bg-card text-sm focus:outline-none focus:border-drugs/50"
          />
        </div>

        <div className="mb-4 flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveClass(null)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
              activeClass === null
                ? "bg-drugs text-white border-drugs"
                : "bg-card text-muted-foreground border-border hover:border-drugs/50"
            }`}
          >
            All ({rows.length})
          </button>
          {classes.map((c) => (
            <button
              key={c}
              onClick={() => setActiveClass(c === activeClass ? null : c)}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                activeClass === c
                  ? "bg-drugs text-white border-drugs"
                  : "bg-card text-muted-foreground border-border hover:border-drugs/50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading formulary…</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">No drugs match your search.</p>
        ) : (
          <>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {filtered.length} drug{filtered.length === 1 ? "" : "s"}
              </p>
              <div className="flex gap-1.5">
                <button
                  onClick={() =>
                    setCollapsed((prev) => {
                      const next = { ...prev };
                      filtered.forEach((d) => (next[d.slug] = true));
                      return next;
                    })
                  }
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md border border-border bg-card text-muted-foreground hover:border-drugs/50 hover:text-foreground transition-colors"
                  aria-label="Minimise all cards"
                >
                  <Minimize2 className="h-3 w-3" /> Minimise all
                </button>
                <button
                  onClick={() =>
                    setCollapsed((prev) => {
                      const next = { ...prev };
                      filtered.forEach((d) => (next[d.slug] = false));
                      return next;
                    })
                  }
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md border border-border bg-card text-muted-foreground hover:border-drugs/50 hover:text-foreground transition-colors"
                  aria-label="Expand all cards"
                >
                  <Maximize2 className="h-3 w-3" /> Expand all
                </button>
              </div>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((d) => {
                const isCollapsed = !!collapsed[d.slug];
                return (
                  <li key={d.slug}>
                    <div className="bg-card border border-border rounded-lg hover:border-drugs/50 transition-colors h-full flex flex-col">
                      <div className="flex items-start justify-between gap-2 p-3 pb-2">
                        <Link
                          to={`/drugs/${d.slug}`}
                          className="min-w-0 flex-1 group"
                        >
                          <h2 className="text-sm font-semibold text-foreground leading-tight group-hover:text-drugs transition-colors">
                            {d.name}
                          </h2>
                          <p className="text-[10px] uppercase tracking-wide text-drugs font-medium mt-1">
                            {d.drug_class}
                          </p>
                        </Link>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleCollapsed(d.slug);
                          }}
                          className="shrink-0 h-6 w-6 grid place-items-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          aria-label={isCollapsed ? `Expand ${d.name}` : `Minimise ${d.name}`}
                          aria-expanded={!isCollapsed}
                        >
                          {isCollapsed ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronUp className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {!isCollapsed && (
                        <Link to={`/drugs/${d.slug}`} className="px-3 pb-3 block">
                          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                            {d.indication_oneliner}
                          </p>
                        </Link>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}
