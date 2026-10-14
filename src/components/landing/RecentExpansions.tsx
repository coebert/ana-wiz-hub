import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { sectionMeta, type Section } from "@/data/curriculum";

/**
 * Home-page summary of the most recent content-expansion batches.
 * Curated (newest first) — keep in sync with expansionStatus.ts and
 * curriculum-expansion.md when a batch is completed.
 */
interface RecentExpansion {
  topicId: string;
  section: Section;
  title: string;
  note: string;
}

const RECENT_EXPANSIONS: RecentExpansion[] = [
  {
    topicId: "ophthalmic-anaesthesia",
    section: "clinical",
    title: "Ophthalmic Anaesthesia",
    note: "Evidence lesson: topical vs sub-Tenon's pain outcomes (Guay 2015 Cochrane) and the oculocardiac reflex.",
  },
  {
    topicId: "interventional-radiology",
    section: "clinical",
    title: "Anaesthesia for Interventional Radiology",
    note: "Stroke-thrombectomy evidence lesson (SIESTA / ANSTROKE / GOLIATH, Bai 2021) and a corrected FAQ answer.",
  },
  {
    topicId: "surgical-protocols",
    section: "clinical",
    title: "Perioperative Protocols by Surgery Type",
    note: "All ten surgery guides source-linked, plus an ERAS evidence lesson (Greco 2014 meta-analysis).",
  },
  {
    topicId: "mechanical-ventilation",
    section: "intensive-care",
    title: "Mechanical Ventilation",
    note: "Stress ulcer prophylaxis lesson (SUP-ICU 2018, REVISE 2024) and a full APRV section.",
  },
  {
    topicId: "icu-nutrition",
    section: "intensive-care",
    title: "Nutrition in Critical Care",
    note: "Protein and calorie trial evidence (EFFORT Protein, NUTRIREA-2/3, TARGET) with corrected trial data.",
  },
  {
    topicId: "elderly-anaesthesia",
    section: "clinical",
    title: "Anaesthesia for the Elderly",
    note: "Hip-fracture anaesthesia evidence (RAGA / REGAIN) and a corrected mortality claim.",
  },
  {
    topicId: "neurointensive-care",
    section: "intensive-care",
    title: "Neurointensive Care",
    note: "Transfusion-threshold evidence lesson (HEMOTION / TRAIN) with sources list.",
  },
  {
    topicId: "sepsis",
    section: "intensive-care",
    title: "Sepsis & Septic Shock",
    note: "Lessons on the 65 trial (permissive hypotension) and HYPRESS (steroids before shock).",
  },
];

export const RecentExpansions = () => {
  return (
    <section aria-labelledby="recent-expansions-heading">
      <div className="mb-8 max-w-2xl">
        <p className="eyebrow text-muted-foreground mb-2">
          <Sparkles className="inline h-3.5 w-3.5 mr-1.5 -mt-0.5" aria-hidden />
          Content updates
        </p>
        <h2 id="recent-expansions-heading" className="h2">Recently expanded</h2>
        <p className="lead mt-2 text-foreground/70">
          The latest topics to receive in-depth, source-linked teaching — each new lesson
          cites the studies and guidelines behind it.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {RECENT_EXPANSIONS.map((item) => {
          const meta = sectionMeta[item.section];
          return (
            <Link
              key={item.topicId}
              to={`/${item.section}/${item.topicId}`}
              className="group flex flex-col rounded-xl border border-border bg-card p-4 shadow-elev-1 transition-[transform,box-shadow,border-color] duration-150 ease-out hover:-translate-y-px hover:shadow-elev-2 hover:border-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground mono mb-2">
                {meta.label}
              </span>
              <h3 className="h4 mb-1.5 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="small leading-relaxed text-foreground/70 flex-1">
                {item.note}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                Read topic
                <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-6">
        <Link
          to="/curriculum/expansion"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          See full expansion progress across all topics
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
};
