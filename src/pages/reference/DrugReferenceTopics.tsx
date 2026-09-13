import { useMemo } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, BookOpen } from "lucide-react";

import ReferenceAppLayout from "@/features/drugReference/ReferenceAppLayout";
import { useDrugList } from "@/features/drugReference/useDrugReference";
import { allReferenceTopics, topicForClass } from "@/features/drugReference/topics";

export default function DrugReferenceTopics() {
  const { drugs, loading } = useDrugList();

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const d of drugs) {
      const slug = topicForClass(d.drug_class).slug;
      map.set(slug, (map.get(slug) ?? 0) + 1);
    }
    return map;
  }, [drugs]);

  const topics = allReferenceTopics.filter((t) => loading || (counts.get(t.slug) ?? 0) > 0);

  return (
    <ReferenceAppLayout
      title="Drug topics — vasoactive, sedation, analgesia & more | Drug Reference"
      description="Browse the anaesthetics and critical care drug reference by topic: vasoactive support, sedation, analgesia, neuromuscular blockade, local anaesthetics, anticoagulation, fluids, antimicrobials, antidotes and more."
      canonicalPath="/reference/topics"
    >
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="font-serif text-3xl text-foreground sm:text-4xl">Drug topics</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          The whole library grouped the way you use it on the ward: each topic opens with the
          practical points that matter at the bedside, then lists every drug in that group with its
          dosing, dilutions, safety and blood level monitoring.
        </p>

        <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
          {loading ? "Loading topics…" : `${topics.length} topics covering ${drugs.length} drugs`}
        </p>

        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <li key={topic.slug}>
              <Link
                to={`/reference/topics/${topic.slug}`}
                className="flex h-full flex-col rounded-lg border border-border bg-card p-4 transition hover:border-primary hover:shadow-sm"
              >
                <span className="flex items-center gap-2 font-semibold text-foreground">
                  <BookOpen aria-hidden="true" className="h-4 w-4 text-primary" />
                  {topic.title}
                </span>
                <span className="mt-2 text-sm text-muted-foreground">{topic.blurb}</span>
                <span className="mt-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {counts.get(topic.slug) ?? 0} drugs
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <aside className="mt-10 flex gap-3 rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          <AlertTriangle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Educational reference for trained clinicians. Check every dose, dilution and monitoring
            target against the BNF, the product SPC, your smart-pump drug library and local
            protocols before use.
          </p>
        </aside>
      </main>
    </ReferenceAppLayout>
  );
}
