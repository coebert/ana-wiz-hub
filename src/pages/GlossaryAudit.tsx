import { Link } from "react-router-dom";
import { PageSection } from "@/components/layout/PageSection";
import { ArrowLeft, CheckCircle2, AlertCircle, MinusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LAB_GLOSSARY } from "@/lib/lab-glossary";

/**
 * App-wide audit of every glossary / popover / inline-reference component.
 *
 * Status legend:
 *  - full       → uses the canonical trend + action + sourced-link pattern
 *                 (LabGlossaryPopover backed by LAB_GLOSSARY).
 *  - partial    → has popover/citation surface and external links, but does
 *                 not yet split content into trend + action chips.
 *  - none       → tap-to-reveal panel without external sourced links.
 */
type Status = "full" | "partial" | "none";

interface AuditEntry {
  name: string;
  file: string;
  surface: "Popover" | "Drawer" | "Inline panel" | "Tooltip";
  scope: string;
  status: Status;
  notes: string;
  usedIn?: string[];
}

const ENTRIES: AuditEntry[] = [
  {
    name: "LabGlossaryPopover",
    file: "src/components/LabGlossaryPopover.tsx",
    surface: "Popover",
    scope: `Shared lab/value glossary — ${Object.keys(LAB_GLOSSARY).length} canonical labs`,
    status: "full",
    notes:
      "Renders trend + why + clinical + action with sourced chips (verbatim quote in title attr). Single source of truth in src/lib/lab-glossary.ts.",
    usedIn: ["RefeedingSyndromeAnimation", "EndocrineSymptomTriage"],
  },
  {
    name: "RefeedingSyndromeAnimation",
    file: "src/components/diagrams/RefeedingSyndromeAnimation.tsx",
    surface: "Popover",
    scope: "K⁺ / PO₄ / Mg²⁺ / glucose / thiamine on the refeeding timeline",
    status: "full",
    notes:
      "Refactored onto LabGlossaryPopover with refeeding-specific overrides; sources resolve via LAB_GLOSSARY (BJA Mehanna, NICE CG32, ASPEN 2020).",
  },
  {
    name: "EndocrineSymptomTriage",
    file: "src/components/diagrams/EndocrineSymptomTriage.tsx",
    surface: "Popover",
    scope: "Lab badges on DKA / HHS / thyroid storm / adrenal crisis routes",
    status: "full",
    notes:
      "Wires LabGlossaryPopover into the diagnosis cards; investigations now carry a per-test 'why' rationale beneath each line.",
  },
  {
    name: "InlineRef",
    file: "src/components/InlineRef.tsx",
    surface: "Popover",
    scope: "Topic-level numeric citation markers (BJA-Education style)",
    status: "partial",
    notes:
      "Has citation + 'Open source' link + optional key-points block, but is reference-focused — does not split content into trend vs action chips. Same source-link affordance, different semantic role.",
    usedIn: [
      "EmergencySurgeryTopic",
      "EquipmentMonitoringTopic",
      "EnhancedRecoveryTopic",
      "ImmuneCellLineageDiagram",
      "LaryngoscopeBladesDiagram",
    ],
  },
  {
    name: "EmergencySurgeryGlossaryDrawer",
    file: "src/components/EmergencySurgeryGlossaryDrawer.tsx",
    surface: "Drawer",
    scope: "NELA / NCEPOD / P-POSSUM / SORT acronym glossary",
    status: "none",
    notes:
      "Term + expansion + definition + exam takeaway, but no external source chips. Candidate for adding 'guideline' chip row mirroring LabGlossaryPopover sources.",
  },
  {
    name: "AnticoagRestartTimeline tooltips",
    file: "src/components/diagrams/AnticoagRestartTimeline.tsx",
    surface: "Tooltip",
    scope: "Hover labels on DOAC / LMWH restart bars",
    status: "none",
    notes:
      "Plain hover tooltip with restart window text. No sourced chip row — could link to BSH/NICE NG89 if upgraded.",
  },
  {
    name: "HygrometersDiagram tooltips",
    file: "src/components/diagrams/HygrometersDiagram.tsx",
    surface: "Tooltip",
    scope: "Hygrometer parts on hover",
    status: "none",
    notes: "Pure descriptive tooltip; no sourced links and no glossary registry behind it.",
  },
];

const STATUS_META: Record<Status, { label: string; icon: typeof CheckCircle2; cls: string }> = {
  full: {
    label: "Full pattern",
    icon: CheckCircle2,
    cls: "text-emerald-700 bg-emerald-500/10 border-emerald-500/30",
  },
  partial: {
    label: "Partial",
    icon: AlertCircle,
    cls: "text-amber-700 bg-amber-500/10 border-amber-500/30",
  },
  none: {
    label: "Not yet",
    icon: MinusCircle,
    cls: "text-muted-foreground bg-muted border-border",
  },
};

const counts = ENTRIES.reduce(
  (acc, e) => ({ ...acc, [e.status]: acc[e.status] + 1 }),
  { full: 0, partial: 0, none: 0 } as Record<Status, number>,
);

const GlossaryAudit = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageSection spacing="tight" width="wide">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
            Glossary &amp; popover audit
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
            Every component across the app that surfaces an explanatory popover, drawer or
            tooltip — and whether it already follows the canonical{" "}
            <span className="font-medium text-foreground">trend + action + sourced-link</span>{" "}
            pattern established by <code className="text-xs">LabGlossaryPopover</code>.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {(Object.keys(STATUS_META) as Status[]).map((s) => {
              const meta = STATUS_META[s];
              const Icon = meta.icon;
              return (
                <span
                  key={s}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${meta.cls}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {meta.label} · {counts[s]}
                </span>
              );
            })}
          </div>
        </header>

        <ul className="space-y-3">
          {ENTRIES.map((e) => {
            const meta = STATUS_META[e.status];
            const Icon = meta.icon;
            return (
              <li
                key={e.name}
                className="rounded-lg border border-border bg-card p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="min-w-0">
                    <h2 className="font-serif font-semibold text-foreground text-lg leading-tight">
                      {e.name}
                    </h2>
                    <p className="text-[11px] text-muted-foreground font-mono mt-0.5 break-all">
                      {e.file}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${meta.cls}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {meta.label}
                  </span>
                </div>

                <div className="mt-3 grid sm:grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  <div>
                    <dt className="uppercase tracking-wider text-[10px] font-semibold text-muted-foreground">
                      Surface
                    </dt>
                    <dd className="text-foreground">{e.surface}</dd>
                  </div>
                  <div>
                    <dt className="uppercase tracking-wider text-[10px] font-semibold text-muted-foreground">
                      Scope
                    </dt>
                    <dd className="text-foreground">{e.scope}</dd>
                  </div>
                </div>

                <p className="mt-3 text-sm text-muted-foreground leading-snug">{e.notes}</p>

                {e.usedIn && e.usedIn.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground self-center">
                      Used in
                    </span>
                    {e.usedIn.map((u) => (
                      <Badge key={u} variant="secondary" className="text-[10px] font-normal">
                        {u}
                      </Badge>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <section className="mt-10 rounded-lg border border-dashed border-border bg-muted/30 p-5">
          <h3 className="font-serif font-semibold text-foreground mb-2">Migration backlog</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            To bring every entry to <span className="font-medium text-foreground">Full pattern</span>,
            extend <code className="text-xs">LAB_GLOSSARY</code> (or add a sibling registry such as{" "}
            <code className="text-xs">SCORE_GLOSSARY</code> for NELA/NCEPOD/P-POSSUM) and replace
            inline tooltip/drawer copy with <code className="text-xs">LabGlossaryPopover</code> or a
            small wrapper that mirrors its trendSources / actionSources contract.
          </p>
        </section>
      </PageSection>
    </div>
  );
};

export default GlossaryAudit;
