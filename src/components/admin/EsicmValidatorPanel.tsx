import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, ChevronDown, ChevronRight, FileWarning, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { validateEsicmReferences, type Issue } from "@/lib/esicmValidator";

/**
 * Embeddable ESICM dose-statement validator panel.
 * Used inside the unified Content Audit page so admins can run topic
 * audits, formulary verification and ESICM dose validation from one place.
 */
const EsicmValidatorPanel = () => {
  const [collapsed, setCollapsed] = useState(true);
  const report = useMemo(() => validateEsicmReferences(), []);
  const byTopic = useMemo(() => {
    const map = new Map<string, Issue[]>();
    for (const i of report.issues) {
      const arr = map.get(i.topicId) ?? [];
      arr.push(i);
      map.set(i.topicId, arr);
    }
    return Array.from(map.entries()).sort((a, b) => b[1].length - a[1].length);
  }, [report]);

  const allClear = report.issues.length === 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <CardTitle className="text-base flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCollapsed((v) => !v)}
              className="inline-flex items-center gap-1 hover:text-primary"
              aria-expanded={!collapsed}
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              <ShieldCheck className="w-4 h-4 text-primary" />
              ESICM dose validator
            </button>
            <span className="text-xs font-normal text-muted-foreground">
              ({report.totalEsicmRefs} refs)
            </span>
          </CardTitle>
          {allClear ? (
            <Badge variant="secondary" className="text-emerald-700 dark:text-emerald-300">
              All clear
            </Badge>
          ) : (
            <Badge variant="destructive">
              {report.issues.length} issue{report.issues.length === 1 ? "" : "s"}
            </Badge>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Client-side check — flags ESICM-backed references (ESICM, SSC, ERC/ESICM, SCCM/ESICM)
          whose citation mentions a dose or threshold without a matching verbatim excerpt.
        </p>
      </CardHeader>
      {!collapsed && (
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Stat label="ESICM references" value={report.totalEsicmRefs} />
            <Stat label="Missing excerpt" value={report.refsMissingExcerpt} tone="bad" />
            <Stat label="Dose mismatches" value={report.doseMismatches} tone="bad" />
          </div>

          {allClear ? (
            <div className="flex items-center gap-3 py-4 px-3 rounded-md border border-border bg-muted/40 text-sm">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <p>
                All ESICM-backed references have excerpts and every dose statement
                in the citation appears verbatim in the excerpt.
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[480px] overflow-y-auto">
              {byTopic.map(([topicId, issues]) => (
                <div key={topicId} className="rounded-md border border-border p-3">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs">{topicId}</span>
                    <Badge variant="destructive">
                      {issues.length} issue{issues.length === 1 ? "" : "s"}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {issues.map((i, idx) => (
                      <div
                        key={`${i.refIndex}-${idx}`}
                        className="flex gap-2 items-start text-xs border-l-2 border-destructive/60 pl-3 py-1"
                      >
                        {i.kind === "missing-excerpt" ? (
                          <FileWarning className="h-3.5 w-3.5 mt-0.5 text-destructive flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="h-3.5 w-3.5 mt-0.5 text-destructive flex-shrink-0" />
                        )}
                        <div className="min-w-0">
                          <p className="font-medium">
                            {i.refLabel}{" "}
                            <span className="text-muted-foreground font-normal">[{i.kind}]</span>
                          </p>
                          <p className="text-muted-foreground">{i.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};

const Stat = ({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone?: "bad";
}) => (
  <div className="rounded-md border border-border bg-card p-3">
    <p className="text-xs text-muted-foreground">{label}</p>
    <p
      className={`text-xl font-semibold ${
        tone === "bad" && value > 0 ? "text-destructive" : "text-foreground"
      }`}
    >
      {value}
    </p>
  </div>
);

export default EsicmValidatorPanel;
