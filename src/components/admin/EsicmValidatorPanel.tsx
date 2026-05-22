import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clipboard,
  FileWarning,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { topicReferences } from "@/data/references";
import { validateEsicmReferences, type Issue, type ValidationReport } from "@/lib/esicmValidator";

/**
 * Embeddable ESICM dose-statement validator panel.
 *
 * Re-validates against the live `topicReferences` module on every render +
 * whenever the user clicks "Re-scan", so once an admin fixes an excerpt via
 * Lovable chat (HMR re-imports references.ts) the resolved issue disappears
 * from the list automatically.
 */
const EsicmValidatorPanel = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [scanTick, setScanTick] = useState(0);

  const report: ValidationReport = useMemo(
    () => validateEsicmReferences(topicReferences),
    // Re-run when references module reloads (HMR replaces the binding) and on
    // explicit user re-scan.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [topicReferences, scanTick],
  );

  // Re-scan automatically when the admin returns to the tab — covers the
  // common "switch to Lovable, paste prompt, come back" workflow.
  useEffect(() => {
    const onFocus = () => setScanTick((t) => t + 1);
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

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

  const buildPrompt = useCallback((): string => {
    const lines: string[] = [
      `Please resolve the following ESICM dose-statement validator issues in \`src/data/references.ts\`.`,
      ``,
      `For each issue: locate the matching reference entry (by topic key + ref label / index) and either:`,
      `- **missing-excerpt** — add an \`excerpt: "..."\` field containing a verbatim quote from the source that supports the dose/threshold mentioned in the citation. Excerpts must be ≤600 characters and copied verbatim — never paraphrase.`,
      `- **dose-mismatch** — either (a) update the \`excerpt\` so the exact value + unit appears verbatim, or (b) correct the dose in the \`citation\`/\`label\` if the excerpt is right and the citation was wrong.`,
      ``,
      `After all edits, run \`npm run check:source-excerpts\` to confirm coverage. Do not silently drop or shorten existing excerpts.`,
      ``,
      `The list below is regenerated live from the validator. Once an entry is fixed in the source file it will automatically disappear from the admin panel on the next HMR reload, so there is no separate "mark fixed" step.`,
      ``,
      `---`,
      ``,
      `## ${report.issues.length} issue${report.issues.length === 1 ? "" : "s"} across ${byTopic.length} topic${byTopic.length === 1 ? "" : "s"}`,
      ``,
      `- ESICM references scanned: **${report.totalEsicmRefs}**`,
      `- Missing excerpt: **${report.refsMissingExcerpt}**`,
      `- Dose mismatches: **${report.doseMismatches}**`,
      ``,
    ];

    for (const [topicId, issues] of byTopic) {
      lines.push(`### \`${topicId}\`  (${issues.length} issue${issues.length === 1 ? "" : "s"})`);
      lines.push("");
      for (const i of issues) {
        lines.push(`- **[${i.kind.toUpperCase()}]** ${i.refLabel}`);
        lines.push(`  - Ref index in \`topicReferences["${topicId}"]\`: \`${i.refIndex}\``);
        lines.push(`  - Detail: ${i.detail}`);
        if (i.dose) {
          lines.push(
            `  - Dose token: raw=\`${i.dose.raw}\` · value=\`${i.dose.value}\` · unit=\`${i.dose.unit}\``,
          );
        }
        if (i.kind === "missing-excerpt") {
          lines.push(
            `  - **Suggested fix:** open the source URL on the reference entry, copy the sentence containing the dose verbatim, and add it as \`excerpt: "..."\`.`,
          );
        } else {
          lines.push(
            `  - **Suggested fix:** verify the dose against the cited guideline. If the guideline is right, expand the \`excerpt\` to include the value+unit verbatim. If the citation drifted, correct the \`citation\`/\`label\` to match the excerpt.`,
          );
        }
      }
      lines.push("");
    }

    lines.push(
      `---`,
      ``,
      `When done, briefly tell me how many issues you resolved and list any you intentionally skipped with a one-line reason.`,
    );
    return lines.join("\n");
  }, [byTopic, report]);

  const copyPrompt = useCallback(async () => {
    if (allClear) return;
    const prompt = buildPrompt();
    try {
      await navigator.clipboard.writeText(prompt);
      toast.success(
        `Copied ${report.issues.length} ESICM issue${report.issues.length === 1 ? "" : "s"} as a Lovable chat prompt. Paste into chat to apply fixes.`,
        { duration: 7000 },
      );
    } catch {
      // Fallback: download as .md so the admin can still get the prompt out.
      const blob = new Blob([prompt], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `esicm-validator-prompt-${new Date().toISOString().slice(0, 10)}.md`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.message("Clipboard blocked — prompt downloaded as .md instead.");
    }
  }, [allClear, buildPrompt, report.issues.length]);

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
          <div className="flex items-center gap-2 flex-wrap">
            {allClear ? (
              <Badge variant="secondary" className="text-emerald-700 dark:text-emerald-300">
                All clear
              </Badge>
            ) : (
              <Badge variant="destructive">
                {report.issues.length} issue{report.issues.length === 1 ? "" : "s"}
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setScanTick((t) => t + 1)}
              title="Re-run validator against the current references.ts"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
              Re-scan
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={copyPrompt}
              disabled={allClear}
              title="Copy a Lovable chat prompt that resolves every listed ESICM issue"
            >
              <Clipboard className="w-3.5 h-3.5 mr-1.5" />
              Copy fix prompt
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Client-side check — flags ESICM-backed references (ESICM, SSC, ERC/ESICM, SCCM/ESICM)
          whose citation mentions a dose or threshold without a matching verbatim excerpt.
          Fixed issues disappear automatically on reload.
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
