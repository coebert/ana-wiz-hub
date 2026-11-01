import { ExternalLink } from "lucide-react";
import { normaliseDrugSources } from "@/lib/drug-sources";

export function DrugSources({ sources }: { sources: unknown }) {
  const entries = normaliseDrugSources(sources);
  return (
    <section id="references" aria-labelledby="drug-references-heading" tabIndex={-1} className="mt-6 scroll-mt-32 border-t border-border pt-4 text-sm">
      <h2 id="drug-references-heading" className="font-semibold text-foreground">References</h2>
      <p className="mt-2 text-muted-foreground">Sources support only their recorded product, population and claim scope; inclusion does not verify every dose or the whole monograph.</p>
      {entries.length === 0 && <p className="mt-3 text-muted-foreground">No usable source records are available.</p>}
      {[false, true].map(search => {
        const group = entries.filter(source => source.search === search);
        if (!group.length) return null;
        return <div key={String(search)} className="mt-4">
          <h3 className="font-medium text-foreground">{search ? "Find a source — search tools" : "Product, guideline and other source records"}</h3>
          {search && <p className="mt-1 text-muted-foreground">Search destinations are not monographs or product labels.</p>}
          <ul className="mt-2 divide-y divide-border">
            {group.map((source, index) => <li key={`${source.url}-${index}`} className="py-3 min-w-0 break-words [overflow-wrap:anywhere]">
              {source.url ? <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm">
                <span>{source.title}</span><ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0" /><span className="sr-only"> (opens in a new tab)</span>
              </a> : <p className="font-medium text-foreground">{source.title} — link unavailable</p>}
              {source.provenance.map((record, i) => <div key={i} className="mt-1 space-y-1 text-muted-foreground">
                {!search && record.title && record.title !== source.title && <p className="font-medium">{record.title}</p>}
                {record.publisher && <p>{record.publisher}</p>}
                {!search && (record.section || record.sections) && <p>Sections: {record.section || record.sections}</p>}
                {!search && record.revision && <p>Revision: {record.revision}</p>}
                {record.accessed && <p>{search ? "Recorded search access" : "Accessed"}: {record.accessed}</p>}
                {record.scope && <p>Scope: {record.scope}</p>}
                {record.reviewNote && <p>Review note: {record.reviewNote}</p>}
              </div>)}
            </li>)}
          </ul>
        </div>;
      })}
    </section>
  );
}