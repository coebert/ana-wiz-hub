import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowUpRight, BookOpen, Search } from "lucide-react";
import { SectionLayout } from "@/components/layout/SectionLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import inventory from "@/data/anatomyDiagramSources.generated.json";

export default function DiagramSources() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [group, setGroup] = useState("all");
  const groups = useMemo(() => [...new Set(inventory.entries.map(e => e.group))], []);
  const needsReview = inventory.entries.filter(e => e.status === "needs-review").length;
  const entries = useMemo(() => {
    const q = query.trim().toLowerCase();
    return inventory.entries.filter(e => (status === "all" || e.status === status) && (group === "all" || e.group === group) && (!q || [e.title, e.group, e.kind, e.credit, ...e.uncertainty, ...e.sources.flatMap(s => [s.label, s.detail ?? "", s.basis])].join(" ").toLowerCase().includes(q)));
  }, [query, status, group]);

  return (
    <SectionLayout title="Anatomy diagram sources" subtitle="References, artwork provenance and outstanding anatomical uncertainty." backPath="/anatomy" backLabel="Anatomy" accentColor="text-anatomy" disableAutoTOC metaDescription="Sources for AnaesthesiaCore anatomy diagrams and surgical atlas plates, including landmark citations, image credits and outstanding anatomical review findings.">
      <div className="border-l-2 border-anatomy pl-4 mb-7 space-y-2">
        <p className="text-foreground font-medium">A citation is not an accuracy certificate.</p>
        <p className="text-sm text-muted-foreground leading-relaxed">Listed sources support anatomical teaching; they do not prove every drawn boundary, printed label or hotspot. “Citations recorded” means references are present, not that the diagram is 100% verified. Known errors, missing provenance and incomplete source records are flagged below.</p>
      </div>

      <dl className="grid grid-cols-3 border-y border-border py-4 mb-7 gap-3">
        {[{ label: "Diagrams & plates", value: inventory.entries.length }, { label: "Need review", value: needsReview }, { label: "Citations recorded", value: inventory.entries.length - needsReview }].map(s => (
          <div key={s.label}><dt className="text-xs sm:text-sm text-muted-foreground">{s.label}</dt><dd className="mt-1 text-2xl font-semibold text-foreground tabular-nums">{s.value}</dd></div>
        ))}
      </dl>

      <div className="space-y-3 mb-6">
        <label htmlFor="diagram-search" className="text-sm font-medium">Search diagrams and sources</label>
        <div className="relative"><Search aria-hidden="true" className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input id="diagram-search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Brain, femoral, Gray’s Anatomy…" className="pl-9" /></div>
        <div className="grid sm:grid-cols-2 gap-3">
          <Select value={status} onValueChange={setStatus}><SelectTrigger aria-label="Review status"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All review statuses</SelectItem><SelectItem value="needs-review">Needs review</SelectItem><SelectItem value="cited">Citations recorded</SelectItem></SelectContent></Select>
          <Select value={group} onValueChange={setGroup}><SelectTrigger aria-label="Diagram group"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All diagram groups</SelectItem>{groups.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent></Select>
        </div>
      </div>
      <p role="status" className="text-sm text-muted-foreground mb-4">Showing {entries.length} of {inventory.entries.length} diagrams and plates</p>
      {entries.length === 0 ? <div className="py-10 border-t border-border text-center"><p className="text-muted-foreground mb-3">No diagrams match these filters.</p><Button variant="outline" onClick={() => { setQuery(""); setGroup("all"); setStatus("all"); }}>Clear filters</Button></div> : (
        <div className="divide-y divide-border">
          {entries.map(entry => (
            <article key={entry.id} id={entry.id} className="py-6 scroll-mt-28 min-w-0" data-diagram-entry>
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div className="min-w-0"><p className="text-xs text-muted-foreground mb-1">{entry.group} · {entry.kind}</p><h2 className="text-xl font-serif font-semibold text-foreground break-words">{entry.title}</h2></div>
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${entry.status === "needs-review" ? "text-destructive" : "text-muted-foreground"}`}>{entry.status === "needs-review" ? <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" /> : <BookOpen className="h-4 w-4 shrink-0" aria-hidden="true" />}{entry.status === "needs-review" ? "Needs review" : "Citations recorded"}</span>
              </div>
              {entry.uncertainty.length > 0 && <ul className="border-l-2 border-destructive pl-3 space-y-1.5 mb-4 text-sm text-foreground leading-relaxed">{entry.uncertainty.map((note, i) => <li key={i}>{note}</li>)}</ul>}
              <p className="text-sm text-muted-foreground mb-3"><strong className="font-medium text-foreground">Artwork:</strong> {entry.credit}</p>
              <h3 className="text-sm font-semibold mb-2">Sources</h3>
              {entry.sources.length ? <ul className="space-y-3 text-sm">{entry.sources.map((source, i) => <li key={`${source.label}-${i}`} className="break-words"><p className="text-xs text-muted-foreground mb-0.5">{source.basis}</p>{source.url && /^https?:\/\//.test(source.url) ? <a className="text-primary underline underline-offset-4 inline-flex items-baseline gap-1 hover:text-foreground" href={source.url} target="_blank" rel="noopener noreferrer">{source.label}<ArrowUpRight className="h-3 w-3 shrink-0 self-center" aria-hidden="true" /></a> : <span className="font-medium">{source.label}</span>}{source.detail && <p className="text-muted-foreground mt-1 whitespace-pre-line leading-relaxed">{source.detail}</p>}</li>)}</ul> : <p className="text-sm text-muted-foreground">No diagram-specific source recorded; provenance remains uncertain.</p>}
              <div className="flex flex-wrap gap-2 mt-4">{entry.topicLinks.map(topic => <Button key={topic.path} asChild variant="outline" size="sm" className="max-w-full h-auto min-h-9 whitespace-normal text-left"><Link to={topic.path}>View {topic.title}<ArrowUpRight className="h-3.5 w-3.5 ml-1 shrink-0" aria-hidden="true" /></Link></Button>)}</div>
            </article>
          ))}
        </div>
      )}
    </SectionLayout>
  );
}