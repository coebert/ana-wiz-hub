import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Pill, Search, ChevronDown, ChevronUp, Minimize2, Maximize2, Info } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { getDrugLabelInlineStyles, DRUG_LABEL_LEGEND } from "@/lib/drug-label-colours";
import { BROAD_DRUG_CATEGORIES, getBroadCategory } from "@/lib/drug-categories";
import { Breadcrumbs } from "@/components/Breadcrumbs";

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
  const [activeBroad, setActiveBroad] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLegend, setShowLegend] = useState(false);
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
    // When a broad category is active, only show its granular sub-classes.
    const bucket = activeBroad
      ? BROAD_DRUG_CATEGORIES.find((b) => b.key === activeBroad) ?? null
      : null;
    const pool = bucket ? rows.filter((r) => bucket.match(r.drug_class)) : rows;
    return Array.from(new Set(pool.map((r) => r.drug_class))).sort();
  }, [rows, activeBroad]);

  /** Counts per broad bucket — drives chip badges and lets us hide empties. */
  const broadCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of rows) {
      const cat = getBroadCategory(r.drug_class);
      if (!cat) continue;
      counts.set(cat.key, (counts.get(cat.key) ?? 0) + 1);
    }
    return counts;
  }, [rows]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const bucket = activeBroad
      ? BROAD_DRUG_CATEGORIES.find((b) => b.key === activeBroad) ?? null
      : null;
    return rows.filter((r) => {
      if (bucket && !bucket.match(r.drug_class)) return false;
      if (activeClass && r.drug_class !== activeClass) return false;
      if (!needle) return true;
      return (
        r.name.toLowerCase().includes(needle) ||
        r.drug_class.toLowerCase().includes(needle) ||
        r.indication_oneliner.toLowerCase().includes(needle) ||
        (r.synonyms || []).some((s) => s.toLowerCase().includes(needle))
      );
    });
  }, [rows, q, activeClass, activeBroad]);

  return (
    <div className="min-h-screen bg-background">
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Breadcrumbs items={[{ label: "Drug Formulary" }]} />
        <div className="mb-6 flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-drugs/10 text-drugs grid place-items-center shrink-0">
            <Pill className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">Drug Formulary</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Searchable monographs across anaesthesia and critical care — presentation, MoA, PK, preparation, dosing, monitoring, side effects.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Class colours follow the international user-applied syringe-label standard (ISO 26825 / ASTM D4774) where possible.
            </p>
          </div>
          <button
            onClick={() => setShowLegend((v) => !v)}
            className="shrink-0 inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-md border border-border bg-card text-muted-foreground hover:border-drugs/50 hover:text-foreground transition-colors"
            aria-expanded={showLegend}
          >
            <Info className="h-3.5 w-3.5" /> Colour key
          </button>
        </div>

        {showLegend && (
          <div className="mb-5 p-3 rounded-lg border border-border bg-card">
            <p className="text-xs font-semibold text-foreground mb-2">Anaesthetic label colour key</p>
            <ul className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
              {DRUG_LABEL_LEGEND.map((entry) => (
                <li key={entry.example} className="flex items-center gap-2">
                  <span
                    className="inline-block h-3.5 w-6 rounded-sm border border-border"
                    style={entry.style}
                    aria-hidden="true"
                  />
                  <span className="text-[11px] text-muted-foreground">{entry.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

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

        {/* Broad-category browser — collapses the granular drug_class strings
            into the high-level buckets a trainee would actually scan by. */}
        <div className="mb-2">
          <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1.5">
            Browse by class
          </p>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => {
                setActiveBroad(null);
                setActiveClass(null);
              }}
              className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                activeBroad === null
                  ? "bg-drugs text-white border-drugs"
                  : "bg-card text-muted-foreground border-border hover:border-drugs/50"
              }`}
            >
              All classes
            </button>
            {BROAD_DRUG_CATEGORIES.filter((c) => (broadCounts.get(c.key) ?? 0) > 0).map((c) => {
              const isActive = activeBroad === c.key;
              const count = broadCounts.get(c.key) ?? 0;
              return (
                <button
                  key={c.key}
                  onClick={() => {
                    const next = isActive ? null : c.key;
                    setActiveBroad(next);
                    // Clear granular sub-filter when broad bucket changes.
                    setActiveClass(null);
                  }}
                  className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                    isActive
                      ? "bg-drugs text-white border-drugs"
                      : "bg-card text-foreground border-border hover:border-drugs/50"
                  }`}
                >
                  {c.label}{" "}
                  <span className={isActive ? "opacity-80" : "text-muted-foreground"}>({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Granular sub-class chips — narrow within the active broad bucket
            (or across the full library when no bucket is active). */}
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
          {classes.map((c) => {
            const styles = getDrugLabelInlineStyles(c);
            const isActive = activeClass === c;
            return (
              <button
                key={c}
                onClick={() => setActiveClass(c === activeClass ? null : c)}
                style={isActive ? styles.solid : styles.tint}
                title={styles.standardName}
                className="text-xs px-3 py-1 rounded-full border transition-colors font-medium"
              >
                {c}
              </button>
            );
          })}
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
                const styles = getDrugLabelInlineStyles(d.drug_class);
                return (
                  <li key={d.slug}>
                    <div
                      className="bg-card border border-border rounded-lg hover:border-drugs/50 transition-colors h-full flex flex-col overflow-hidden"
                      style={{ borderLeft: `4px solid ${styles.railColor}` }}
                    >
                      <div className="flex items-start justify-between gap-2 p-3 pb-2">
                        <Link
                          to={`/drugs/${d.slug}`}
                          className="min-w-0 flex-1 group"
                        >
                          <h2 className="text-sm font-semibold text-foreground leading-tight group-hover:text-drugs transition-colors">
                            {d.name}
                          </h2>
                          <span
                            className="inline-block mt-1.5 text-[10px] uppercase tracking-wide font-semibold px-1.5 py-0.5 rounded border"
                            style={styles.tint}
                            title={styles.standardName}
                          >
                            {d.drug_class}
                          </span>
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
