import { Suspense, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle2, AlertTriangle, ExternalLink } from "lucide-react";
import {
  FLOWCHART_AUDIT_REGISTRY,
  type FlowchartAuditEntry,
} from "@/lib/flowchart-a11y-registry";

interface AuditResult {
  svgCount: number;
  groupCount: number;
  unlabelledGroups: number;
  labels: string[];
  status: "pass" | "warn" | "fail";
}

const DiagramProbe = ({
  entry,
  onResult,
}: {
  entry: FlowchartAuditEntry;
  onResult: (id: string, result: AuditResult) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const Component = entry.component;

  useEffect(() => {
    // Probe after the lazy component mounts + paints.
    const t = setTimeout(() => {
      const root = ref.current;
      if (!root) return;
      const svgs = root.querySelectorAll("svg");
      const labelled = root.querySelectorAll(
        'g[role="group"][aria-label]',
      ) as NodeListOf<SVGGElement>;
      const allGroups = root.querySelectorAll(
        'g[role="group"]',
      ) as NodeListOf<SVGGElement>;
      const labels = Array.from(labelled).map(
        (g) => g.getAttribute("aria-label") || "",
      );
      const unlabelledGroups = allGroups.length - labelled.length;
      const ok = labelled.length >= entry.expectedGroups;
      const status: AuditResult["status"] = ok
        ? "pass"
        : labelled.length === 0
          ? "fail"
          : "warn";
      onResult(entry.id, {
        svgCount: svgs.length,
        groupCount: labelled.length,
        unlabelledGroups,
        labels,
        status,
      });
    }, 400);
    return () => clearTimeout(t);
  }, [entry, onResult]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      // Off-screen but rendered so the SVG actually mounts.
      style={{
        position: "absolute",
        left: "-10000px",
        top: 0,
        width: "1024px",
        pointerEvents: "none",
      }}
    >
      <Suspense fallback={null}>
        <Component />
      </Suspense>
    </div>
  );
};

const StatusBadge = ({ status }: { status: AuditResult["status"] }) => {
  if (status === "pass")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-700 dark:text-green-400">
        <CheckCircle2 className="h-3 w-3" /> Pass
      </span>
    );
  if (status === "warn")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-700 dark:text-amber-400">
        <AlertTriangle className="h-3 w-3" /> Below target
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-medium text-destructive">
      <AlertTriangle className="h-3 w-3" /> Missing labels
    </span>
  );
};

const A11yAudit = () => {
  const [results, setResults] = useState<Record<string, AuditResult>>({});
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleResult = (id: string, r: AuditResult) =>
    setResults((prev) => ({ ...prev, [id]: r }));

  const total = FLOWCHART_AUDIT_REGISTRY.length;
  const done = Object.keys(results).length;
  const passed = Object.values(results).filter((r) => r.status === "pass").length;
  const warned = Object.values(results).filter((r) => r.status === "warn").length;
  const failed = Object.values(results).filter((r) => r.status === "fail").length;

  return (
    <main className="container max-w-5xl py-8">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <header className="mb-6">
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Flowchart accessibility audit
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Renders each registered flowchart in the background, queries the DOM
          for <code>g[role=&quot;group&quot;][aria-label]</code> nodes, and
          flags diagrams whose step / decision / outcome groups fall short of
          the expected count.
        </p>
      </header>

      <section
        className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4"
        aria-label="Audit summary"
      >
        <SummaryCard label="Diagrams" value={`${done}/${total}`} tone="muted" />
        <SummaryCard label="Pass" value={passed} tone="ok" />
        <SummaryCard label="Below target" value={warned} tone="warn" />
        <SummaryCard label="Missing labels" value={failed} tone="bad" />
      </section>

      <ul className="space-y-3">
        {FLOWCHART_AUDIT_REGISTRY.map((entry) => {
          const r = results[entry.id];
          const isOpen = expanded === entry.id;
          return (
            <li
              key={entry.id}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="font-medium text-foreground">{entry.name}</h2>
                    {r ? (
                      <StatusBadge status={r.status} />
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        probing…
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Expected ≥ {entry.expectedGroups} labelled groups
                    {r && (
                      <>
                        {" · "}
                        found {r.groupCount}
                        {r.unlabelledGroups > 0 &&
                          ` · ${r.unlabelledGroups} unlabelled`}
                        {" · "}
                        {r.svgCount} svg{r.svgCount === 1 ? "" : "s"}
                      </>
                    )}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {entry.route && (
                    <Link
                      to={entry.route}
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                    >
                      Open <ExternalLink className="h-3 w-3" />
                    </Link>
                  )}
                  {r && r.labels.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : entry.id)}
                      className="text-xs text-muted-foreground hover:text-foreground"
                      aria-expanded={isOpen}
                    >
                      {isOpen ? "Hide labels" : "Show labels"}
                    </button>
                  )}
                </div>
              </div>

              {isOpen && r && (
                <ol className="mt-3 space-y-1 border-t border-border pt-3 text-xs text-muted-foreground">
                  {r.labels.map((label, i) => (
                    <li key={i} className="font-mono">
                      <span className="mr-2 text-muted-foreground/60">
                        {String(i + 1).padStart(2, "0")}.
                      </span>
                      {label}
                    </li>
                  ))}
                </ol>
              )}

              {/* Probe — renders off-screen */}
              <DiagramProbe entry={entry} onResult={handleResult} />
            </li>
          );
        })}
      </ul>
    </main>
  );
};

const SummaryCard = ({
  label,
  value,
  tone,
}: {
  label: string;
  value: string | number;
  tone: "muted" | "ok" | "warn" | "bad";
}) => {
  const toneCls =
    tone === "ok"
      ? "text-green-700 dark:text-green-400"
      : tone === "warn"
        ? "text-amber-700 dark:text-amber-400"
        : tone === "bad"
          ? "text-destructive"
          : "text-foreground";
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div className={`mt-1 text-2xl font-semibold ${toneCls}`}>{value}</div>
    </div>
  );
};

export default A11yAudit;
