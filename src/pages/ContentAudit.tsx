import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { allTopics, sectionMeta } from "@/data/curriculum";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Play,
  RefreshCw,
  Square,
  ShieldCheck,
  Wifi,
  WifiOff,
} from "lucide-react";
import { toast } from "sonner";

type Job = {
  id: string;
  status: string;
  trigger: string;
  total: number;
  processed: number;
  succeeded: number;
  failed: number;
  findings_count: number;
  current_topic: string | null;
  last_error: string | null;
  created_at: string;
  completed_at: string | null;
};

type Finding = {
  id: string;
  job_id: string;
  topic_id: string;
  topic_title: string;
  section: string;
  topic_url: string | null;
  severity: "info" | "minor" | "major" | "critical";
  category: string;
  summary: string;
  details: string | null;
  suggested_fix: string | null;
  sources: { title: string; url: string }[];
  diagram_ref: string | null;
  status: "open" | "acknowledged" | "fixed" | "dismissed";
  created_at: string;
};

const severityColors: Record<string, string> = {
  info: "bg-muted text-muted-foreground",
  minor: "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200",
  major: "bg-orange-100 text-orange-900 dark:bg-orange-900/30 dark:text-orange-200",
  critical: "bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-200",
};

const ContentAudit = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [starting, setStarting] = useState(false);
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("open");
  const [sectionFilter, setSectionFilter] = useState<string>("all");
  const [bulkBusy, setBulkBusy] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) navigate("/admin/login");
  }, [authLoading, user, isAdmin, navigate]);

  const fetchLatestJob = async () => {
    const { data } = await supabase
      .from("topic_audit_jobs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    setJob((data as Job) ?? null);
    return data as Job | null;
  };

  const fetchFindings = async (jobId?: string) => {
    let q = supabase
      .from("topic_audit_findings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (jobId) q = q.eq("job_id", jobId);
    const { data } = await q;
    setFindings(((data as unknown) as Finding[]) ?? []);
  };

  useEffect(() => {
    (async () => {
      const j = await fetchLatestJob();
      await fetchFindings(j?.id);
    })();
  }, []);

  // Realtime connection state + auto-reconnect
  type RTStatus = "connecting" | "live" | "offline" | "reconnecting";
  const [rtStatus, setRtStatus] = useState<RTStatus>("connecting");
  const [reconnectNonce, setReconnectNonce] = useState(0);

  // Realtime: live job progress + streaming findings while audit runs
  useEffect(() => {
    if (!job?.id) return;
    const jobId = job.id;
    setRtStatus((s) => (s === "live" ? s : "connecting"));

    const channel = supabase
      .channel(`audit-job-${jobId}-${reconnectNonce}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "topic_audit_jobs",
          filter: `id=eq.${jobId}`,
        },
        (payload) => {
          setJob((prev) => ({ ...(prev as Job), ...(payload.new as Job) }));
        },
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "topic_audit_findings",
          filter: `job_id=eq.${jobId}`,
        },
        (payload) => {
          const f = payload.new as Finding;
          setFindings((prev) =>
            prev.some((x) => x.id === f.id) ? prev : [f, ...prev],
          );
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setRtStatus("live");
          // resync after any (re)connect so we don't miss events
          (async () => {
            const j = await fetchLatestJob();
            if (j) await fetchFindings(j.id);
          })();
        } else if (
          status === "CHANNEL_ERROR" ||
          status === "TIMED_OUT" ||
          status === "CLOSED"
        ) {
          setRtStatus("reconnecting");
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [job?.id, reconnectNonce]);

  // Browser online/offline → drive status + trigger channel rebuild
  useEffect(() => {
    const goOffline = () => setRtStatus("offline");
    const goOnline = () => {
      setRtStatus("reconnecting");
      setReconnectNonce((n) => n + 1);
    };
    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      setRtStatus("offline");
    }
    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, []);

  // Auto-retry while in reconnecting state (exponential-ish, capped)
  useEffect(() => {
    if (rtStatus !== "reconnecting") return;
    const t = setTimeout(() => {
      setReconnectNonce((n) => n + 1);
    }, 5000);
    return () => clearTimeout(t);
  }, [rtStatus, reconnectNonce]);

  const reconnectNow = () => {
    setRtStatus("reconnecting");
    setReconnectNonce((n) => n + 1);
  };

  // Fallback poll while running (in case realtime drops). Polls faster
  // when realtime isn't live so the UI stays accurate.
  useEffect(() => {
    if (job?.status !== "running" && job?.status !== "pending") return;
    const interval = rtStatus === "live" ? 8000 : 3000;
    const t = setInterval(async () => {
      const j = await fetchLatestJob();
      if (j) await fetchFindings(j.id);
    }, interval);
    return () => clearInterval(t);
  }, [job?.status, rtStatus]);

  const startAudit = async (scope: "all" | "section", section?: string) => {
    setStarting(true);
    try {
      const topics = (scope === "section" && section
        ? allTopics.filter((t) => t.section === section)
        : allTopics
      )
        .filter((t) => t.available)
        .map((t) => ({
          id: t.id,
          title: t.title,
          section: t.section,
          description: t.description,
          url: `https://anaesthesiacore.app/${sectionMeta[t.section].path}/${t.id}`,
        }));

      const { data, error } = await supabase.functions.invoke("audit-topics", {
        body: {
          action: "start",
          trigger: "manual",
          user_id: user?.id,
          topics,
        },
      });
      if (error) throw error;
      toast.success(`Audit started for ${topics.length} topics`);
      // brief wait then refresh
      setTimeout(async () => {
        const j = await fetchLatestJob();
        if (j) await fetchFindings(j.id);
      }, 600);
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to start audit");
    } finally {
      setStarting(false);
    }
  };

  const cancelAudit = async () => {
    if (!job) return;
    await supabase.functions.invoke("audit-topics", {
      body: { action: "cancel", job_id: job.id },
    });
    toast.message("Cancellation requested");
    setTimeout(fetchLatestJob, 1000);
  };

  const updateFindingStatus = async (
    id: string,
    status: Finding["status"],
  ) => {
    const patch: any = { status };
    if (status === "fixed" || status === "dismissed") {
      patch.resolved_by = user?.id;
      patch.resolved_at = new Date().toISOString();
    }
    const { error } = await supabase
      .from("topic_audit_findings")
      .update(patch)
      .eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setFindings((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    );
  };

  const buildFixPrompt = (targets: Finding[]) => {
    const byTopic = new Map<string, Finding[]>();
    for (const f of targets) {
      const key = `${f.section}/${f.topic_id}`;
      if (!byTopic.has(key)) byTopic.set(key, []);
      byTopic.get(key)!.push(f);
    }
    const lines: string[] = [
      `Please apply the following content-audit fixes to the topic source files.`,
      ``,
      `For each finding below: open the referenced topic file under \`src/pages/topics/\` (the topic id matches the route segment), locate the named section, and edit the JSX/data so it matches the **Suggested fix**. Keep voice/style consistent with the rest of the topic. Cite the listed sources via the existing \`InlineRef\` / \`sectionSources\` / \`references.ts\` pattern where appropriate. Do not silently delete affected content unless the suggested fix explicitly says to.`,
      ``,
      `After all edits, run typecheck and tell me any findings you could not safely fix.`,
      ``,
      `---`,
      ``,
      `## ${targets.length} finding${targets.length === 1 ? "" : "s"} across ${byTopic.size} topic${byTopic.size === 1 ? "" : "s"}`,
      ``,
    ];
    for (const [key, items] of byTopic) {
      const t = items[0];
      lines.push(`### ${t.topic_title}  \`(${key})\``);
      if (t.topic_url) lines.push(`URL: ${t.topic_url}`);
      lines.push("");
      for (const f of items) {
        lines.push(`- **[${f.severity.toUpperCase()} · ${f.category}]** ${f.summary}`);
        if (f.section) lines.push(`  - Section: ${f.section}`);
        if (f.diagram_ref) lines.push(`  - Diagram: \`${f.diagram_ref}\``);
        if (f.details) lines.push(`  - Details: ${f.details}`);
        if (f.suggested_fix) lines.push(`  - **Suggested fix:** ${f.suggested_fix}`);
        if (f.sources?.length) {
          lines.push(`  - Sources:`);
          f.sources.forEach((s) => lines.push(`    - [${s.title}](${s.url})`));
        }
        lines.push(`  - Finding id: \`${f.id}\``);
      }
      lines.push("");
    }
    lines.push(
      `When done, I will mark these finding ids as fixed in the Content Audit page.`,
    );
    return lines.join("\n");
  };

  const correctAll = async () => {
    const targets = filtered.filter((f) => f.status === "open");
    if (targets.length === 0) return;
    const ok = window.confirm(
      `Generate a Lovable chat prompt for ${targets.length} open finding${targets.length === 1 ? "" : "s"}?\n\nThe prompt will be copied to your clipboard and downloaded as a .md file. Paste it into Lovable chat and the AI will edit the topic source files to apply each suggested fix. Findings stay 'open' until you mark them fixed after reviewing the edits.`,
    );
    if (!ok) return;
    setBulkBusy(true);
    try {
      const prompt = buildFixPrompt(targets);

      const blob = new Blob([prompt], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `audit-fix-prompt-${new Date().toISOString().slice(0, 10)}.md`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      let copied = false;
      try {
        await navigator.clipboard.writeText(prompt);
        copied = true;
      } catch {
        copied = false;
      }

      toast.success(
        copied
          ? `Fix prompt for ${targets.length} finding${targets.length === 1 ? "" : "s"} copied to clipboard and downloaded. Paste it into Lovable chat to apply the edits.`
          : `Fix prompt downloaded (${targets.length} finding${targets.length === 1 ? "" : "s"}). Open the .md file and paste it into Lovable chat to apply the edits.`,
        { duration: 9000 },
      );
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to build fix prompt");
    } finally {
      setBulkBusy(false);
    }
  };

  const downloadFixReport = () => {
    const targets = filtered.filter((f) => f.status === "open");
    if (targets.length === 0) return;
    const byTopic = new Map<string, Finding[]>();
    for (const f of targets) {
      const key = `${f.section}/${f.topic_id}`;
      if (!byTopic.has(key)) byTopic.set(key, []);
      byTopic.get(key)!.push(f);
    }
    const lines: string[] = [
      `# Content Audit – Fix Report`,
      `Generated ${new Date().toISOString()}`,
      `${targets.length} open finding${targets.length === 1 ? "" : "s"} across ${byTopic.size} topic${byTopic.size === 1 ? "" : "s"}`,
      "",
    ];
    for (const [key, items] of byTopic) {
      const t = items[0];
      lines.push(`## ${t.topic_title} (${key})`);
      if (t.topic_url) lines.push(`<${t.topic_url}>`);
      lines.push("");
      for (const f of items) {
        lines.push(`### [${f.severity.toUpperCase()}] ${f.category} — ${f.summary}`);
        if (f.details) lines.push(f.details);
        if (f.suggested_fix) lines.push(`\n**Suggested fix:** ${f.suggested_fix}`);
        if (f.sources?.length) {
          lines.push("");
          lines.push("Sources:");
          f.sources.forEach((s) => lines.push(`- [${s.title}](${s.url})`));
        }
        lines.push("");
      }
    }
    const blob = new Blob([lines.join("\n")], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-fix-report-${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const filtered = useMemo(() => {
    return findings.filter((f) => {
      if (severityFilter !== "all" && f.severity !== severityFilter)
        return false;
      if (statusFilter !== "all" && f.status !== statusFilter) return false;
      if (sectionFilter !== "all" && f.section !== sectionFilter) return false;
      return true;
    });
  }, [findings, severityFilter, statusFilter, sectionFilter]);

  const stats = useMemo(() => {
    const open = findings.filter((f) => f.status === "open");
    return {
      open: open.length,
      critical: open.filter((f) => f.severity === "critical").length,
      major: open.filter((f) => f.severity === "major").length,
      diagrams: open.filter((f) => f.category === "diagram").length,
    };
  }, [findings]);

  const running = job?.status === "running" || job?.status === "pending";
  const progress =
    job && job.total > 0 ? Math.round((job.processed / job.total) * 100) : 0;

  // tick every second so elapsed/ETA refresh smoothly while running
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  const fmtDuration = (ms: number) => {
    if (!Number.isFinite(ms) || ms < 0) return "—";
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    if (m >= 60) {
      const h = Math.floor(m / 60);
      return `${h}h ${m % 60}m`;
    }
    return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
  };

  const elapsedMs = job ? Date.now() - new Date(job.created_at).getTime() : 0;
  const etaMs =
    running && job && job.processed > 0 && job.total > job.processed
      ? (elapsedMs / job.processed) * (job.total - job.processed)
      : 0;

  const recentFindings = useMemo(
    () => (job ? findings.filter((f) => f.job_id === job.id).slice(0, 5) : []),
    [findings, job?.id],
  );

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Content Audit – AnaesthesiaCore Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin")}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Admin
            </Button>
            <div>
              <h1 className="text-xl font-serif font-bold text-foreground flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Content Accuracy Audit
              </h1>
              <p className="text-xs text-muted-foreground">
                Cross-checks topics against BJA Education, RCoA, FICM, ICS,
                NICE, BNF and Resuscitation Council UK. Runs weekly.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <RealtimeStatusPill status={rtStatus} onReconnect={reconnectNow} />
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                const j = await fetchLatestJob();
                await fetchFindings(j?.id);
              }}
            >
              <RefreshCw className="w-4 h-4 mr-1" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Run controls */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Run audit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => startAudit("all")}
                disabled={starting || running}
              >
                <Play className="w-4 h-4 mr-1" />
                Audit all topics ({allTopics.filter((t) => t.available).length})
              </Button>
              <Select
                onValueChange={(v) => startAudit("section", v)}
                disabled={starting || running}
              >
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Audit one section…" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(sectionMeta).map(([k, v]) => (
                    <SelectItem key={k} value={k}>
                      {v.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {running && (
                <Button variant="destructive" onClick={cancelAudit}>
                  <Square className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
              )}
            </div>

            {job && (
              <div className="rounded-md border border-border p-3 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {job.status === "completed" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : job.status === "failed" ? (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    ) : (
                      <RefreshCw
                        className={`w-4 h-4 ${
                          running ? "animate-spin text-primary" : ""
                        }`}
                      />
                    )}
                    <span className="font-medium capitalize">{job.status}</span>
                    <Badge variant="secondary" className="text-xs">
                      {job.trigger}
                    </Badge>
                    <span className="text-muted-foreground text-xs">
                      {new Date(job.created_at).toLocaleString()}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {job.processed} / {job.total} ({progress}%)
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span>Succeeded: {job.succeeded}</span>
                  <span>Failed: {job.failed}</span>
                  <span>Findings: {job.findings_count}</span>
                  <span>Elapsed: {fmtDuration(elapsedMs)}</span>
                  {running && etaMs > 0 && (
                    <span>ETA: ~{fmtDuration(etaMs)}</span>
                  )}
                  {job.current_topic && (
                    <span className="text-foreground">
                      Now auditing:{" "}
                      <span className="font-medium">{job.current_topic}</span>
                    </span>
                  )}
                </div>
                {job.last_error && (
                  <p className="text-xs text-red-600">
                    Last error: {job.last_error}
                  </p>
                )}
                {running && recentFindings.length > 0 && (
                  <div className="pt-2 border-t border-border space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">
                      Live activity
                    </p>
                    {recentFindings.map((f) => (
                      <div
                        key={f.id}
                        className="flex items-center gap-2 text-xs"
                      >
                        <Badge
                          className={`${severityColors[f.severity]} border-0 capitalize text-[10px] py-0`}
                        >
                          {f.severity}
                        </Badge>
                        <span className="truncate text-foreground">
                          {f.topic_title}
                        </span>
                        <span className="truncate text-muted-foreground">
                          — {f.summary}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatTile label="Open findings" value={stats.open} />
          <StatTile label="Critical" value={stats.critical} tone="critical" />
          <StatTile label="Major" value={stats.major} tone="major" />
          <StatTile label="Diagram issues" value={stats.diagrams} />
        </div>

        {/* Filters */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Findings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="acknowledged">Acknowledged</SelectItem>
                  <SelectItem value="fixed">Fixed</SelectItem>
                  <SelectItem value="dismissed">Dismissed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All severities</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="major">Major</SelectItem>
                  <SelectItem value="minor">Minor</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sectionFilter} onValueChange={setSectionFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All sections</SelectItem>
                  {Object.entries(sectionMeta).map(([k, v]) => (
                    <SelectItem key={k} value={k}>
                      {v.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {filtered.length} shown
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={downloadFixReport}
                  disabled={filtered.filter((f) => f.status === "open").length === 0}
                >
                  Download fix report
                </Button>
                <Button
                  size="sm"
                  onClick={correctAll}
                  disabled={
                    bulkBusy ||
                    filtered.filter((f) => f.status === "open").length === 0
                  }
                >
                  {bulkBusy
                    ? "Correcting…"
                    : `Correct all (${filtered.filter((f) => f.status === "open").length})`}
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              {filtered.length === 0 ? (
                <p className="text-sm text-muted-foreground py-8 text-center">
                  No findings match the current filters.
                </p>
              ) : (
                filtered.map((f) => (
                  <div
                    key={f.id}
                    className="rounded-md border border-border p-3 space-y-2"
                  >
                    <div className="flex flex-wrap items-start gap-2 justify-between">
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            className={`${severityColors[f.severity]} border-0 capitalize`}
                          >
                            {f.severity}
                          </Badge>
                          <Badge variant="outline" className="capitalize">
                            {f.category}
                          </Badge>
                          <Badge variant="secondary" className="capitalize">
                            {f.status}
                          </Badge>
                          {f.topic_url && (
                            <a
                              href={f.topic_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                            >
                              {f.topic_title}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {sectionMeta[f.section as keyof typeof sectionMeta]
                              ?.label ?? f.section}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-foreground">
                          {f.summary}
                        </p>
                        {f.details && (
                          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                            {f.details}
                          </p>
                        )}
                        {f.suggested_fix && (
                          <p className="text-sm text-foreground">
                            <span className="font-medium">Suggested fix: </span>
                            {f.suggested_fix}
                          </p>
                        )}
                        {f.sources?.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {f.sources.map((s, i) => (
                              <a
                                key={i}
                                href={s.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs px-2 py-0.5 rounded bg-muted hover:bg-muted/70 inline-flex items-center gap-1"
                              >
                                {s.title}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        )}
                        {f.diagram_ref && (
                          <a
                            href={f.diagram_ref}
                            target="_blank"
                            rel="noreferrer"
                            className="block mt-2"
                          >
                            <img
                              src={f.diagram_ref}
                              alt="Inspected diagram"
                              className="max-h-40 rounded border border-border"
                            />
                          </a>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 shrink-0">
                        {f.status !== "fixed" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateFindingStatus(f.id, "fixed")}
                          >
                            Mark fixed
                          </Button>
                        )}
                        {f.status === "open" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              updateFindingStatus(f.id, "acknowledged")
                            }
                          >
                            Acknowledge
                          </Button>
                        )}
                        {f.status !== "dismissed" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              updateFindingStatus(f.id, "dismissed")
                            }
                          >
                            Dismiss
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

const RealtimeStatusPill = ({
  status,
  onReconnect,
}: {
  status: "connecting" | "live" | "offline" | "reconnecting";
  onReconnect: () => void;
}) => {
  const cfg = {
    live: {
      label: "Live",
      icon: Wifi,
      cls: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-200",
      dot: "bg-emerald-500 animate-pulse",
    },
    connecting: {
      label: "Connecting…",
      icon: Wifi,
      cls: "bg-muted text-muted-foreground",
      dot: "bg-muted-foreground animate-pulse",
    },
    reconnecting: {
      label: "Reconnecting…",
      icon: RefreshCw,
      cls: "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200",
      dot: "bg-amber-500 animate-pulse",
    },
    offline: {
      label: "Offline",
      icon: WifiOff,
      cls: "bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-200",
      dot: "bg-red-500",
    },
  }[status];
  const Icon = cfg.icon;
  const clickable = status === "offline" || status === "reconnecting";
  return (
    <button
      type="button"
      onClick={clickable ? onReconnect : undefined}
      disabled={!clickable}
      title={
        clickable
          ? "Click to reconnect now"
          : "Realtime connection to the audit feed"
      }
      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${cfg.cls} ${clickable ? "hover:opacity-80 cursor-pointer" : "cursor-default"}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      <Icon
        className={`w-3 h-3 ${status === "reconnecting" ? "animate-spin" : ""}`}
      />
      {cfg.label}
    </button>
  );
};

const StatTile = ({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone?: "critical" | "major";
}) => (
  <Card>
    <CardContent className="pt-6">
      <div
        className={`text-3xl font-bold ${
          tone === "critical"
            ? "text-red-600"
            : tone === "major"
              ? "text-orange-600"
              : "text-foreground"
        }`}
      >
        {value}
      </div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </CardContent>
  </Card>
);

export default ContentAudit;
