import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, CheckCircle2, FileWarning } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { validateEsicmReferences, type Issue } from "@/lib/esicmValidator";

/**
 * Admin page: in-app ESICM dose-statement validator.
 * Flags any ESICM-backed Reference whose citation mentions a dose
 * (value + unit) without a matching verbatim excerpt, or with a
 * mismatching/unrecognised unit.
 */
const EsicmValidator = () => {
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
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <Helmet>
        <title>ESICM dose validator</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <Button asChild variant="ghost" size="sm" className="mb-4">
        <Link to="/admin">
          <ArrowLeft className="h-4 w-4 mr-1" /> Admin
        </Link>
      </Button>

      <header className="mb-6">
        <h1 className="text-3xl font-serif font-semibold mb-1">ESICM dose validator</h1>
        <p className="text-sm text-muted-foreground">
          Flags ESICM-backed references (ESICM, SSC, ERC/ESICM, SCCM/ESICM) whose
          citation mentions a dose or threshold without a matching verbatim excerpt,
          or where the unit differs from the excerpt.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              ESICM references
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {report.totalEsicmRefs}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Missing excerpt
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-destructive">
            {report.refsMissingExcerpt}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Dose mismatches
            </CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold text-destructive">
            {report.doseMismatches}
          </CardContent>
        </Card>
      </section>

      {allClear ? (
        <Card>
          <CardContent className="flex items-center gap-3 py-8 text-foreground">
            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            <p className="text-base">
              All ESICM-backed references have excerpts and every dose
              statement in the citation appears verbatim in the excerpt.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {byTopic.map(([topicId, issues]) => (
            <Card key={topicId}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold flex items-center justify-between gap-2">
                  <span className="font-mono text-sm">{topicId}</span>
                  <Badge variant="destructive">{issues.length} issue{issues.length === 1 ? "" : "s"}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {issues.map((i, idx) => (
                  <div
                    key={`${i.refIndex}-${idx}`}
                    className="flex gap-2 items-start text-sm border-l-2 border-destructive/60 pl-3 py-1"
                  >
                    {i.kind === "missing-excerpt" ? (
                      <FileWarning className="h-4 w-4 mt-0.5 text-destructive flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 mt-0.5 text-destructive flex-shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="font-medium">
                        {i.refLabel}{" "}
                        <span className="text-muted-foreground font-normal">
                          [{i.kind}]
                        </span>
                      </p>
                      <p className="text-muted-foreground">{i.detail}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EsicmValidator;
