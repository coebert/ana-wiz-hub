import { useEffect, useMemo, useState } from "react";
import { PageSection } from "@/components/layout/PageSection";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, HelpCircle, Loader2 } from "lucide-react";

interface Row {
  id: string;
  topic_id: string;
  topic_title: string | null;
  section: string;
  severity: "info" | "minor" | "major" | "critical";
  status: string;
  sources: { url?: string }[] | null;
  unverifiable_reason: string | null;
  summary: string;
  resolved_at: string | null;
}

const sevColor: Record<Row["severity"], string> = {
  critical: "bg-destructive text-destructive-foreground",
  major: "bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/30",
  minor: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border-yellow-500/30",
  info: "bg-muted text-muted-foreground",
};

export default function AuditReport() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("topic_audit_findings")
        .select(
          "id, topic_id, topic_title, section, severity, status, sources, unverifiable_reason, summary, resolved_at",
        )
        .eq("status", "fixed")
        .order("resolved_at", { ascending: false });
      if (error) setErr(error.message);
      else setRows((data ?? []) as Row[]);
      setLoading(false);
    })();
  }, []);

  const { fixed, unverifiable, missingCitations, byTopicMissing } = useMemo(() => {
    const fixed: Row[] = [];
    const unverifiable: Row[] = [];
    const missing: Row[] = [];
    for (const r of rows) {
      const hasUnv = r.unverifiable_reason && r.unverifiable_reason.trim().length > 0;
      const hasSrc = Array.isArray(r.sources) && r.sources.length > 0;
      if (hasUnv) unverifiable.push(r);
      else fixed.push(r);
      if (!hasUnv && !hasSrc) missing.push(r);
    }
    const byTopic = new Map<string, { title: string; section: string; rows: Row[] }>();
    for (const r of missing) {
      const key = `${r.section}/${r.topic_id}`;
      const existing = byTopic.get(key);
      if (existing) existing.rows.push(r);
      else
        byTopic.set(key, {
          title: r.topic_title ?? r.topic_id,
          section: r.section,
          rows: [r],
        });
    }
    return {
      fixed,
      unverifiable,
      missingCitations: missing,
      byTopicMissing: Array.from(byTopic.entries())
        .map(([k, v]) => ({ key: k, ...v }))
        .sort((a, b) => b.rows.length - a.rows.length),
    };
  }, [rows]);

  return (
    <PageSection spacing="tight" width="wide">
      <Helmet>
        <title>Audit Report — Fixed vs Unverifiable</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <header className="mb-6">
        <h1 className="text-3xl font-serif font-bold text-foreground">Audit Report</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Snapshot of resolved content-audit findings — split into genuinely fixed (carrying a
          source citation) vs unverifiable (closed with a documented reason). See the{" "}
          <Link to="/admin/audit-dashboard" className="underline text-primary">
            full dashboard
          </Link>{" "}
          for open findings.
        </p>
      </header>

      {loading && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading findings…
        </div>
      )}
      {err && <p className="text-sm text-destructive">Error: {err}</p>}

      {!loading && !err && (
        <>
          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            <Stat
              label="Fixed (cited)"
              value={fixed.length}
              icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" />}
              tone="emerald"
            />
            <Stat
              label="Unverifiable (closed w/ reason)"
              value={unverifiable.length}
              icon={<HelpCircle className="h-4 w-4 text-amber-600" />}
              tone="amber"
            />
            <Stat
              label="Topics missing citations"
              value={byTopicMissing.length}
              icon={<AlertTriangle className="h-4 w-4 text-destructive" />}
              tone="destructive"
            />
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                Topics with fixed findings but no citation
              </CardTitle>
            </CardHeader>
            <CardContent>
              {byTopicMissing.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Every fixed finding either carries a source citation or a documented unverifiable
                  reason. Nothing to flag.
                </p>
              ) : (
                <ul className="divide-y divide-border">
                  {byTopicMissing.map((t) => (
                    <li
                      key={t.key}
                      className="py-2 flex items-center justify-between gap-3 text-sm"
                    >
                      <Link
                        to={`/${t.section}/${t.key.split("/")[1]}`}
                        className="text-primary hover:underline truncate"
                      >
                        {t.title}
                      </Link>
                      <Badge variant="outline" className="shrink-0">
                        {t.rows.length} finding{t.rows.length === 1 ? "" : "s"}
                      </Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Section title="Unverifiable findings" rows={unverifiable} showReason />
          <Section title="Fixed findings (cited)" rows={fixed.slice(0, 50)} />
          {fixed.length > 50 && (
            <p className="text-xs text-muted-foreground mt-2">
              Showing 50 most recent of {fixed.length} fixed findings.
            </p>
          )}
        </>
      )}
    </PageSection>
  );
}

function Stat({
  label,
  value,
  icon,
  tone,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  tone: "emerald" | "amber" | "destructive";
}) {
  const toneClasses = {
    emerald: "border-emerald-500/30 bg-emerald-500/5",
    amber: "border-amber-500/30 bg-amber-500/5",
    destructive: "border-destructive/30 bg-destructive/5",
  }[tone];
  return (
    <div className={`rounded-lg border p-4 ${toneClasses}`}>
      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
        {icon}
        {label}
      </div>
      <p className="text-2xl font-semibold mt-1 text-foreground">{value}</p>
    </div>
  );
}

function Section({
  title,
  rows,
  showReason = false,
}: {
  title: string;
  rows: Row[];
  showReason?: boolean;
}) {
  if (rows.length === 0) return null;
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">
          {title} <span className="text-muted-foreground text-sm">({rows.length})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {rows.map((r) => (
            <li key={r.id} className="text-sm border-l-2 border-border pl-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={sevColor[r.severity]} variant="outline">
                  {r.severity}
                </Badge>
                <Link
                  to={`/${r.section}/${r.topic_id}`}
                  className="font-medium text-foreground hover:underline"
                >
                  {r.topic_title ?? r.topic_id}
                </Link>
                <span className="text-xs text-muted-foreground">· {r.section}</span>
              </div>
              <p className="text-muted-foreground mt-1">{r.summary}</p>
              {showReason && r.unverifiable_reason && (
                <p className="text-xs text-muted-foreground/80 mt-1 italic">
                  Reason: {r.unverifiable_reason}
                </p>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
