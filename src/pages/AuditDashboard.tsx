import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  ImageIcon,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { sectionAnchorId } from "@/lib/sectionAnchor";
import { sectionMeta } from "@/data/curriculum";

type StatusBucket = "open" | "fixed" | "unverifiable";

interface Finding {
  id: string;
  topic_id: string;
  topic_title: string;
  section: string;
  topic_url: string | null;
  severity: "info" | "minor" | "major" | "critical";
  category: string;
  summary: string;
  details: string | null;
  suggested_fix: string | null;
  sources: { title?: string; url: string }[] | null;
  diagram_ref: string | null;
  in_topic_section: string | null;
  status: string;
  unverifiable_reason: string | null;
  resolved_at: string | null;
  created_at: string;
}

const severityColor: Record<Finding["severity"], string> = {
  critical: "bg-destructive text-destructive-foreground",
  major: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30",
  minor: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border-yellow-500/30",
  info: "bg-muted text-muted-foreground",
};

function bucketOf(f: Finding): StatusBucket {
  if (f.status === "fixed") {
    return f.unverifiable_reason && f.unverifiable_reason.trim().length > 0
      ? "unverifiable"
      : "fixed";
  }
  return "open";
}

function topicHref(f: Finding): string {
  if (f.topic_url) {
    try {
      const u = new URL(f.topic_url);
      return u.pathname + (f.in_topic_section ? `#${sectionAnchorId(f.in_topic_section)}` : "");
    } catch {
      // fall through
    }
  }
  const path = `/${f.section}/${f.topic_id}`;
  return f.in_topic_section ? `${path}#${sectionAnchorId(f.in_topic_section)}` : path;
}

export default function AuditDashboard() {
  const [findings, setFindings] = useState<Finding[]>([]);
  const [loading, setLoading] = useState(true);
  const [bucket, setBucket] = useState<StatusBucket | "all">("open");
  const [section, setSection] = useState<string>("all");
  const [severity, setSeverity] = useState<string>("all");
  const [search, setSearch] = useState("");

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("topic_audit_findings")
      .select(
        "id,topic_id,topic_title,section,topic_url,severity,category,summary,details,suggested_fix,sources,diagram_ref,in_topic_section,status,unverifiable_reason,resolved_at,created_at",
      )
      .order("created_at", { ascending: false })
      .limit(2000);
    if (error) {
      console.error(error);
    } else {
      setFindings((data ?? []) as unknown as Finding[]);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  const stats = useMemo(() => {
    const s = { open: 0, fixed: 0, unverifiable: 0, total: findings.length };
    for (const f of findings) s[bucketOf(f)]++;
    return s;
  }, [findings]);

  const sections = useMemo(() => {
    const set = new Set(findings.map((f) => f.section));
    return Array.from(set).sort();
  }, [findings]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return findings.filter((f) => {
      if (bucket !== "all" && bucketOf(f) !== bucket) return false;
      if (section !== "all" && f.section !== section) return false;
      if (severity !== "all" && f.severity !== severity) return false;
      if (q) {
        const hay = `${f.topic_title} ${f.summary} ${f.in_topic_section ?? ""} ${f.details ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [findings, bucket, section, severity, search]);

  const grouped = useMemo(() => {
    const map = new Map<string, { title: string; section: string; items: Finding[] }>();
    for (const f of filtered) {
      const key = f.topic_id;
      if (!map.has(key)) map.set(key, { title: f.topic_title, section: f.section, items: [] });
      map.get(key)!.items.push(f);
    }
    return Array.from(map.entries()).sort((a, b) => b[1].items.length - a[1].items.length);
  }, [filtered]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Helmet>
        <title>Audit findings dashboard</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <header className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-serif font-bold">Audit findings dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Topic-audit findings grouped by status. Click any item to jump directly to the affected
            section or diagram.
          </p>
        </div>
        <Button onClick={load} variant="outline" size="sm" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
          Refresh
        </Button>
      </header>

      {/* Status buckets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatusCard
          label="Open"
          count={stats.open}
          active={bucket === "open"}
          onClick={() => setBucket("open")}
          tone="open"
          icon={<AlertTriangle className="h-4 w-4" />}
        />
        <StatusCard
          label="Fixed (cited)"
          count={stats.fixed}
          active={bucket === "fixed"}
          onClick={() => setBucket("fixed")}
          tone="fixed"
          icon={<CheckCircle2 className="h-4 w-4" />}
        />
        <StatusCard
          label="Unverifiable"
          count={stats.unverifiable}
          active={bucket === "unverifiable"}
          onClick={() => setBucket("unverifiable")}
          tone="unverifiable"
          icon={<HelpCircle className="h-4 w-4" />}
        />
        <StatusCard
          label="All"
          count={stats.total}
          active={bucket === "all"}
          onClick={() => setBucket("all")}
          tone="all"
          icon={null}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Input
          placeholder="Search topic, summary, section…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select value={section} onValueChange={setSection}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Section" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All sections</SelectItem>
            {sections.map((s) => (
              <SelectItem key={s} value={s}>
                {sectionMeta[s as keyof typeof sectionMeta]?.label ?? s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={severity} onValueChange={setSeverity}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All severities</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="major">Major</SelectItem>
            <SelectItem value="minor">Minor</SelectItem>
            <SelectItem value="info">Info</SelectItem>
          </SelectContent>
        </Select>
        <div className="text-xs text-muted-foreground ml-auto">
          {filtered.length} finding{filtered.length === 1 ? "" : "s"} · {grouped.length} topic
          {grouped.length === 1 ? "" : "s"}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading findings…
        </div>
      ) : grouped.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No findings match the current filters.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {grouped.map(([topicId, group]) => (
            <Card key={topicId}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Link
                        to={`/${group.section}/${topicId}`}
                        className="hover:underline"
                      >
                        {group.title}
                      </Link>
                      <Badge variant="outline" className="text-xs font-normal">
                        {sectionMeta[group.section as keyof typeof sectionMeta]?.label ?? group.section}
                      </Badge>
                    </CardTitle>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {group.items.length} finding{group.items.length === 1 ? "" : "s"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0 space-y-3">
                {group.items.map((f) => (
                  <FindingRow key={f.id} f={f} />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusCard({
  label,
  count,
  active,
  onClick,
  tone,
  icon,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  tone: "open" | "fixed" | "unverifiable" | "all";
  icon: React.ReactNode;
}) {
  const toneClass = {
    open: "border-orange-500/40",
    fixed: "border-emerald-500/40",
    unverifiable: "border-amber-500/40",
    all: "border-border",
  }[tone];
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-lg border p-4 transition-all hover:shadow-md ${toneClass} ${
        active ? "ring-2 ring-primary bg-primary/5" : "bg-card"
      }`}
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
        <span className="flex items-center gap-1.5">
          {icon}
          {label}
        </span>
      </div>
      <div className="text-3xl font-bold mt-1">{count}</div>
    </button>
  );
}

function FindingRow({ f }: { f: Finding }) {
  const href = topicHref(f);
  const bucket = bucketOf(f);
  return (
    <div className="rounded-md border border-border bg-background/50 p-3 space-y-2">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className={severityColor[f.severity]} variant="outline">
            {f.severity}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {f.category}
          </Badge>
          {bucket === "fixed" && (
            <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30" variant="outline">
              fixed
            </Badge>
          )}
          {bucket === "unverifiable" && (
            <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30" variant="outline">
              unverifiable
            </Badge>
          )}
          {f.in_topic_section && (
            <span className="text-xs text-muted-foreground">§ {f.in_topic_section}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={href}
            className="text-xs text-primary hover:underline inline-flex items-center gap-1"
          >
            Jump to section <ExternalLink className="h-3 w-3" />
          </Link>
          {f.diagram_ref && (
            <a
              href={f.diagram_ref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline inline-flex items-center gap-1"
            >
              <ImageIcon className="h-3 w-3" /> Diagram
            </a>
          )}
        </div>
      </div>

      <p className="text-sm font-medium text-foreground">{f.summary}</p>

      {f.suggested_fix && (
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground/80">Suggested fix:</span> {f.suggested_fix}
        </p>
      )}

      {bucket === "unverifiable" && f.unverifiable_reason && (
        <p className="text-xs text-amber-700 dark:text-amber-400">
          <span className="font-semibold">Unverifiable:</span> {f.unverifiable_reason}
        </p>
      )}

      {f.sources && f.sources.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {f.sources.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] px-2 py-0.5 rounded border border-border bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted inline-flex items-center gap-1"
            >
              {s.title || new URL(s.url).hostname.replace(/^www\./, "")}
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          ))}
        </div>
      )}

      <div className="text-[10px] text-muted-foreground/70 font-mono">{f.id}</div>
    </div>
  );
}
