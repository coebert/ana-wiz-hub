
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
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Play,
  RefreshCw,
  Square,
  ShieldCheck,
  Wifi,
  WifiOff,
} from "lucide-react";
import { sectionAnchorId } from "@/lib/sectionAnchor";
import { getAdminFunctionHeaders } from "@/lib/admin-function-auth";

import { toast } from "sonner";
import EsicmValidatorPanel from "@/components/admin/EsicmValidatorPanel";
import FormularyVerificationPanel from "@/components/admin/FormularyVerificationPanel";
import InaccuracyReportsPanel from "@/components/admin/InaccuracyReportsPanel";
import { Sparkles } from "lucide-react";

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
  in_topic_section: string | null;
  status: "open" | "acknowledged" | "fixed" | "dismissed";
  created_at: string;
};
type TopicLog = {
  id: string;
  job_id: string;
  topic_id: string;
  topic_title: string;
  section: string;
  topic_url: string | null;
  status: "pending" | "running" | "succeeded" | "failed" | "skipped";
  started_at: string | null;
  completed_at: string | null;
  duration_ms: number | null;
  error_message: string | null;
  stages: Record<string, unknown>;
  findings_count: number;
  updated_at: string;
};

const logStatusColors: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  running: "bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200",
  succeeded:
    "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-200",
  failed: "bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-200",
  skipped: "bg-muted text-muted-foreground",
};


const severityColors: Record<string, string> = {
  info: "bg-muted text-muted-foreground",
  minor: "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200",
  major: "bg-orange-100 text-orange-900 dark:bg-orange-900/30 dark:text-orange-200",
  critical: "bg-red-100 text-red-900 dark:bg-red-900/30 dark:text-red-200",
};

// Categories the auditor uses to describe coverage gaps rather than factual
// errors. These get a dedicated "expansion brief" prompt — Lovable is asked
// to expand / add content rather than to correct an inaccuracy.
const EXPANSION_CATEGORIES = new Set(["thin", "gap", "update", "missing"]);
const isExpansionFinding = (f: { category: string }) =>
  EXPANSION_CATEGORIES.has(f.category);

const ACCURACY_CATEGORIES = new Set(["factual", "outdated", "citation", "terminology"]);
const isAccuracyFinding = (f: { category: string }) =>
  ACCURACY_CATEGORIES.has(f.category);

/**
 * The audit edge function embeds new structured fields inside `details` as a
 * machine-parseable header block (so we didn't need a DB migration). Shape:
 *
 *   [Confidence: high · Exam: Final]
 *
 *   > Topic passage:
 *   > verbatim text from the page (≤300 char)
 *
 *   > Source evidence:
 *   > verbatim text from the reference (≤400 char)
 *
 *   <free-form details>
 *
 * This helper splits the block back out so we can render quotes inline.
 */
type ParsedFinding = {
  confidence: "low" | "medium" | "high" | null;
  exam: "Primary" | "Final" | "FFICM" | "All" | null;
  topicQuote: string | null;
  sourceQuote: string | null;
  rest: string;
};
const parseFindingDetails = (raw: string | null | undefined): ParsedFinding => {
  const out: ParsedFinding = {
    confidence: null,
    exam: null,
    topicQuote: null,
    sourceQuote: null,
    rest: "",
  };
  if (!raw) return out;
  let text = String(raw);

  // Header: [Confidence: high · Exam: Final]
  const header = text.match(/^\s*\[([^\]]+)\]\s*\n+/);
  if (header) {
    const inside = header[1];
    const conf = inside.match(/Confidence:\s*(low|medium|high)/i);
    if (conf) out.confidence = conf[1].toLowerCase() as ParsedFinding["confidence"];
    const exam = inside.match(/Exam:\s*(Primary|Final|FFICM|All)/i);
    if (exam) {
      const e = exam[1];
      out.exam = (e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()) as ParsedFinding["exam"];
      if (e.toUpperCase() === "FFICM") out.exam = "FFICM";
    }
    text = text.slice(header[0].length);
  }

  // Pull quote blocks of the form: "> Topic passage:\n> ...\n> ...\n\n"
  const pullBlock = (label: RegExp): string | null => {
    const rx = new RegExp(
      `>\\s*${label.source}[^\\n]*\\n((?:>\\s?[^\\n]*\\n?)+)`,
      "i",
    );
    const m = text.match(rx);
    if (!m) return null;
    const body = m[1]
      .split("\n")
      .map((line) => line.replace(/^>\s?/, ""))
      .join("\n")
      .trim();
    text = text.replace(m[0], "").trim();
    return body || null;
  };
  out.topicQuote = pullBlock(/Topic passage:?/);
  out.sourceQuote = pullBlock(/Source evidence:?/);
  out.rest = text.trim();
  return out;
};

const confidenceColors: Record<string, string> = {
  high: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-200",
  medium: "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200",
  low: "bg-muted text-muted-foreground",
};


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

const ContentAudit = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [starting, setStarting] = useState(false);
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("open");
  const [sectionFilter, setSectionFilter] = useState<string>("all");
  const [lensFilter, setLensFilter] = useState<"all" | "accuracy" | "coverage" | "diagram">("all");
  const [confidenceFilter, setConfidenceFilter] = useState<string>("all");

  const [bulkBusy, setBulkBusy] = useState(false);
  const [topicLogs, setTopicLogs] = useState<TopicLog[]>([]);
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());
  const [logsCollapsed, setLogsCollapsed] = useState(false);


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

  const fetchTopicLogs = async (jobId?: string) => {
    if (!jobId) {
      setTopicLogs([]);
      return;
    }
    const { data } = await supabase
      .from("topic_audit_topic_logs")
      .select("*")
      .eq("job_id", jobId)
      .order("started_at", { ascending: false, nullsFirst: false })
      .order("updated_at", { ascending: false })
      .limit(1000);
    setTopicLogs(((data as unknown) as TopicLog[]) ?? []);
  };

  useEffect(() => {
    (async () => {
      const j = await fetchLatestJob();
      await Promise.all([fetchFindings(j?.id), fetchTopicLogs(j?.id)]);
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
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "topic_audit_topic_logs",
          filter: `job_id=eq.${jobId}`,
        },
        (payload) => {
          const row = (payload.new ?? payload.old) as TopicLog | undefined;
          if (!row) return;
          setTopicLogs((prev) => {
            const idx = prev.findIndex((x) => x.id === row.id);
            if (payload.eventType === "DELETE") {
              return idx >= 0 ? prev.filter((x) => x.id !== row.id) : prev;
            }
            const next = payload.new as TopicLog;
            if (idx >= 0) {
              const copy = prev.slice();
              copy[idx] = { ...prev[idx], ...next };
              return copy;
            }
            return [next, ...prev];
          });
        },
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setRtStatus("live");
          // resync after any (re)connect so we don't miss events
          (async () => {
            const j = await fetchLatestJob();
            if (j) {
              await Promise.all([fetchFindings(j.id), fetchTopicLogs(j.id)]);
            }
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
      if (j) await Promise.all([fetchFindings(j.id), fetchTopicLogs(j.id)]);
    }, interval);
    return () => clearInterval(t);
  }, [job?.status, rtStatus]);

  const startAudit = async (scope: "all" | "section", section?: string) => {
    setStarting(true);
    try {
      const headers = await getAdminFunctionHeaders();
      const topics = (scope === "section" && section
        ? allTopics.filter((t) => t.section === section)
        : allTopics
      )
        .filter((t) => t.available)
        .map((t) => {
          const sectionPath = sectionMeta[t.section].path.replace(/^\/+|\/+$/g, "");

          return {
            id: t.id,
            title: t.title,
            section: t.section,
            description: t.description,
            url: `https://anaesthesiacore.app/${sectionPath}/${t.id}`,
          };
        });

      const { data, error } = await supabase.functions.invoke("audit-topics", {
        body: {
          action: "start",
          trigger: "manual",
          user_id: user?.id,
          topics,
        },
        headers,
      });
      if (error) throw error;
      toast.success(`Audit started for ${topics.length} topics`);
      // brief wait then refresh
      setTimeout(async () => {
        const j = await fetchLatestJob();
        if (j) await Promise.all([fetchFindings(j.id), fetchTopicLogs(j.id)]);
      }, 600);
      return true;
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to start audit");
      return false;
    } finally {
      setStarting(false);
    }
  };

  const cancelAudit = async () => {
    if (!job) return;
    const headers = await getAdminFunctionHeaders();
    await supabase.functions.invoke("audit-topics", {
      body: { action: "cancel", job_id: job.id },
      headers,
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

  // Max characters per generated prompt. Lovable chat enforces a per-message
  // character cap; keep well under it so the pasted prompt always fits.
  const MAX_PROMPT_CHARS = 45000;

  const renderFindingLines = (f: Finding): string[] => {
    const lines: string[] = [];
    lines.push(`- **[${f.severity.toUpperCase()} · ${f.category}]** ${f.summary}`);
    if (f.section) lines.push(`  - Section: ${f.section}`);
    if (f.in_topic_section)
      lines.push(`  - In-page section: ${f.in_topic_section}`);
    if (f.diagram_ref) lines.push(`  - Diagram: \`${f.diagram_ref}\``);
    if (f.details) lines.push(`  - Details: ${f.details}`);
    if (f.suggested_fix) lines.push(`  - **Suggested fix:** ${f.suggested_fix}`);
    if (f.sources?.length) {
      lines.push(`  - Sources:`);
      f.sources.forEach((s) => lines.push(`    - [${s.title}](${s.url})`));
    }
    lines.push(`  - Finding id: \`${f.id}\``);
    return lines;
  };

  const buildPromptForBatch = (
    batch: Finding[],
    batchIndex: number,
    batchCount: number,
  ) => {
    const byTopic = new Map<string, Finding[]>();
    for (const f of batch) {
      const key = `${f.section}/${f.topic_id}`;
      if (!byTopic.has(key)) byTopic.set(key, []);
      byTopic.get(key)!.push(f);
    }
    const batchLabel =
      batchCount > 1 ? ` (batch ${batchIndex + 1} of ${batchCount})` : "";
    const lines: string[] = [
      `Please apply the following content-audit fixes to the topic source files${batchLabel}.`,
      ``,
      `For each finding below: open the referenced topic file under \`src/pages/topics/\` (the topic id matches the route segment), locate the named section, and edit the JSX/data so it matches the **Suggested fix**. Keep voice/style consistent with the rest of the topic. Cite the listed sources via the existing \`InlineRef\` / \`sectionSources\` / \`references.ts\` pattern where appropriate. Do not silently delete affected content unless the suggested fix explicitly says to.`,
      ``,
      `After all edits, run typecheck.`,
      ``,
      `**IMPORTANT — auto-mark fixed:** For every finding you actually actioned (i.e. the source file now matches the suggested fix, OR the finding was already addressed in a previous turn and you have verified this in the current code), you MUST mark it as fixed in the database by running the SQL block at the end of this prompt via \`psql\` (managed Supabase DB access is enabled in this project). Remove from that SQL any IDs you could not safely fix and report them back to me explicitly. Do not skip this step — the user relies on it to keep the Content Audit list in sync.`,
      ``,
    ];
    if (batchCount > 1) {
      lines.push(
        `> This is **batch ${batchIndex + 1} of ${batchCount}**. The full fix list was split to stay under the Lovable per-message character limit. Each batch is self-contained — apply only the findings listed here and run the SQL block at the bottom of *this* batch. Subsequent batches will be sent as separate messages.`,
        ``,
      );
    }
    lines.push(
      `---`,
      ``,
      `## ${batch.length} finding${batch.length === 1 ? "" : "s"} across ${byTopic.size} topic${byTopic.size === 1 ? "" : "s"}${batchLabel}`,
      ``,
    );
    for (const [key, items] of byTopic) {
      const t = items[0];
      lines.push(`### ${t.topic_title}  \`(${key})\``);
      if (t.topic_url) lines.push(`URL: ${t.topic_url}`);
      lines.push("");
      for (const f of items) lines.push(...renderFindingLines(f));
      lines.push("");
    }
    const idList = batch.map((f) => `  '${f.id}'`).join(",\n");
    lines.push(
      ``,
      `---`,
      ``,
      `## Mark actioned findings as fixed${batchLabel}`,
      ``,
      `After applying the fixes above (and only for the IDs you actually actioned — delete the rest from the list), run this exactly once via \`psql\`:`,
      ``,
      "```sql",
      `UPDATE public.topic_audit_findings`,
      `SET status = 'fixed', resolved_at = now()`,
      `WHERE id IN (`,
      idList,
      `);`,
      "```",
      ``,
      `> **Citation guard:** a database trigger rejects \`status = 'fixed'\` unless the finding has at least one entry in \`sources\` *or* an \`unverifiable_reason\` is set. For each ID you fixed by adding/keeping a real citation, the existing \`sources\` array satisfies the trigger automatically. For IDs that cannot be cited (e.g. transient Firecrawl scrape failure, auditor false-positive), instead run:`,
      ``,
      "```sql",
      `UPDATE public.topic_audit_findings`,
      `SET status = 'fixed', resolved_at = now(), unverifiable_reason = '<one-line reason>'`,
      `WHERE id = '<id>';`,
      "```",
      ``,
      `After the UPDATE(s), run \`npm run check:audit-fixes\` to confirm every newly-fixed finding has a matching \`InlineRef\` / \`sectionSources\` citation in the topic file. The script exits non-zero on any failure; fix the citation (or set \`unverifiable_reason\`) before reporting back.`,
      ``,
      `Then tell me how many findings you marked fixed and list any IDs you intentionally left open with a one-line reason.`,
    );
    return lines.join("\n");
  };

  // Greedy bin-packing: keep adding findings to the current batch while the
  // rendered prompt stays under MAX_PROMPT_CHARS. A single finding that on its
  // own would exceed the cap still goes in its own batch.
  const buildFixPromptBatches = (targets: Finding[]): string[] => {
    if (targets.length === 0) return [];
    const batches: Finding[][] = [];
    let current: Finding[] = [];
    for (const f of targets) {
      const trial = [...current, f];
      const size = buildPromptForBatch(trial, 0, 1).length;
      if (size > MAX_PROMPT_CHARS && current.length > 0) {
        batches.push(current);
        current = [f];
      } else {
        current = trial;
      }
    }
    if (current.length > 0) batches.push(current);
    return batches.map((b, i) => buildPromptForBatch(b, i, batches.length));
  };

  // ─── Expansion brief prompt ──────────────────────────────────────────────
  // For thin / gap / update / missing findings, Lovable should ADD or EXPAND
  // content rather than just patch an inaccuracy. The prompt is shaped
  // accordingly: it asks for new subsections, expanded prose with values,
  // and updated guideline references — and uses the same "auto-mark fixed"
  // SQL convention so the audit list stays in sync.
  const buildExpansionPromptForBatch = (
    batch: Finding[],
    batchIndex: number,
    batchCount: number,
  ) => {
    const byTopic = new Map<string, Finding[]>();
    for (const f of batch) {
      const key = `${f.section}/${f.topic_id}`;
      if (!byTopic.has(key)) byTopic.set(key, []);
      byTopic.get(key)!.push(f);
    }
    const batchLabel =
      batchCount > 1 ? ` (batch ${batchIndex + 1} of ${batchCount})` : "";
    const lines: string[] = [
      `Please **expand the content** of the topic files below to address the following coverage findings${batchLabel}.`,
      ``,
      `These are NOT factual-error corrections. Each finding identifies an area that is too thin, a missing subtopic that should be added, or content that needs updating to reflect a newer guideline / dose / threshold. Treat each finding as an instruction to **add or rewrite the relevant section** so it meets FRCA / FFICM exam depth.`,
      ``,
      `For each finding:`,
      `1. Open the referenced topic file under \`src/pages/topics/\` (the topic id matches the route segment).`,
      `2. Locate the named section. If the finding is a **gap** and the section does not yet exist, add a new \`CollapsibleSubsection\` (or appropriate sibling block) in the correct logical place inside \`coreConcepts\`.`,
      `3. Write new content that:`,
      `   - matches the depth, voice and house style of the surrounding topic,`,
      `   - includes the specific values, doses, classifications, thresholds and clinical relevance an FRCA/FFICM candidate would be examined on,`,
      `   - cites every authoritative claim via the existing \`InlineRef\` / \`sectionSources\` / \`references.ts\` pattern using the listed Sources (add new entries to \`src/data/references.ts\` if needed, including an \`excerpt\` verbatim quote where the source supports a specific dose or threshold).`,
      `4. Where the finding is **thin**, expand the existing prose in place — don't replace it wholesale unless the existing wording is also wrong.`,
      `5. Where the finding is **update**, integrate the newer guideline alongside (or in place of) the older one, and update the citation.`,
      ``,
      `After all edits, run typecheck and \`npm run check:source-excerpts\`.`,
      ``,
      `**IMPORTANT — auto-mark fixed:** For every finding you actually actioned (i.e. the source file now contains the expanded / added / updated content with a real citation), mark it fixed in the database by running the SQL block at the bottom of this prompt via \`psql\`. Remove from that SQL any IDs you could not safely action and report them back to me with a one-line reason.`,
      ``,
    ];
    if (batchCount > 1) {
      lines.push(
        `> This is **batch ${batchIndex + 1} of ${batchCount}**. The full expansion list was split to stay under the Lovable per-message character limit. Each batch is self-contained — apply only the findings listed here and run the SQL block at the bottom of *this* batch.`,
        ``,
      );
    }
    lines.push(
      `---`,
      ``,
      `## ${batch.length} expansion finding${batch.length === 1 ? "" : "s"} across ${byTopic.size} topic${byTopic.size === 1 ? "" : "s"}${batchLabel}`,
      ``,
    );
    for (const [key, items] of byTopic) {
      const t = items[0];
      lines.push(`### ${t.topic_title}  \`(${key})\``);
      if (t.topic_url) lines.push(`URL: ${t.topic_url}`);
      lines.push("");
      for (const f of items) lines.push(...renderFindingLines(f));
      lines.push("");
    }
    const idList = batch.map((f) => `  '${f.id}'`).join(",\n");
    lines.push(
      ``,
      `---`,
      ``,
      `## Mark actioned expansion findings as fixed${batchLabel}`,
      ``,
      `After applying the expansions above (and only for the IDs you actually actioned — delete the rest from the list), run this exactly once via \`psql\`:`,
      ``,
      "```sql",
      `UPDATE public.topic_audit_findings`,
      `SET status = 'fixed', resolved_at = now()`,
      `WHERE id IN (`,
      idList,
      `);`,
      "```",
      ``,
      `> **Citation guard:** the database trigger rejects \`status = 'fixed'\` unless the finding has at least one entry in \`sources\` *or* an \`unverifiable_reason\` is set. Expansion findings should always be backed by the sources listed above, so the trigger will pass for any ID you genuinely actioned.`,
      ``,
      `Then tell me how many findings you actioned, and list any IDs you intentionally left open (e.g. needs a chart that the textual prompt can't produce) with a one-line reason.`,
    );
    return lines.join("\n");
  };

  const buildExpansionPromptBatches = (targets: Finding[]): string[] => {
    if (targets.length === 0) return [];
    const batches: Finding[][] = [];
    let current: Finding[] = [];
    for (const f of targets) {
      const trial = [...current, f];
      const size = buildExpansionPromptForBatch(trial, 0, 1).length;
      if (size > MAX_PROMPT_CHARS && current.length > 0) {
        batches.push(current);
        current = [f];
      } else {
        current = trial;
      }
    }
    if (current.length > 0) batches.push(current);
    return batches.map((b, i) =>
      buildExpansionPromptForBatch(b, i, batches.length),
    );
  };

  const expandAll = async () => {
    const targets = filtered.filter(
      (f) => f.status === "open" && isExpansionFinding(f),
    );
    if (targets.length === 0) return;
    const prompts = buildExpansionPromptBatches(targets);
    const batchCount = prompts.length;
    const batchNote =
      batchCount > 1
        ? `\n\nSplit into ${batchCount} batches (each under ${MAX_PROMPT_CHARS.toLocaleString()} chars). Batch 1 will be copied to your clipboard; all batches will download as .md files. Paste them into Lovable chat one at a time.`
        : `\n\nThe brief will be copied to your clipboard and downloaded as a .md file. Paste it into Lovable chat and the AI will expand / add the listed sections.`;
    const ok = window.confirm(
      `Generate a Lovable expansion brief for ${targets.length} thin/gap/update finding${targets.length === 1 ? "" : "s"}?${batchNote}`,
    );
    if (!ok) return;
    setBulkBusy(true);
    try {
      const dateStr = new Date().toISOString().slice(0, 10);
      prompts.forEach((prompt, i) => {
        const suffix =
          batchCount > 1 ? `-batch-${i + 1}-of-${batchCount}` : "";
        const blob = new Blob([prompt], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `audit-expansion-brief-${dateStr}${suffix}.md`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      });
      let copied = false;
      try {
        await navigator.clipboard.writeText(prompts[0]);
        copied = true;
      } catch {
        copied = false;
      }
      const base = `${targets.length} expansion finding${targets.length === 1 ? "" : "s"}`;
      toast.success(
        batchCount > 1
          ? `${base} split into ${batchCount} batches. ${copied ? "Batch 1 copied to clipboard; all batches downloaded." : "All batches downloaded."}`
          : copied
            ? `Expansion brief for ${base} copied to clipboard and downloaded.`
            : `Expansion brief downloaded (${base}). Open the .md and paste into Lovable chat.`,
        { duration: 9000 },
      );
    } catch (e: any) {
      toast.error(e?.message ?? "Failed to build expansion brief");
    } finally {
      setBulkBusy(false);
    }
  };



  const correctAll = async (
    targetStatus: Finding["status"] = "open",
  ) => {
    const targets = filtered.filter((f) => f.status === targetStatus);
    if (targets.length === 0) return;
    const verb = targetStatus === "fixed" ? "re-apply" : "apply";
    const label = targetStatus === "fixed" ? "previously-fixed" : "open";
    const prompts = buildFixPromptBatches(targets);
    const batchCount = prompts.length;
    const batchNote =
      batchCount > 1
        ? `\n\nThe list is too large for a single Lovable message, so it has been split into ${batchCount} batches. Each batch will be downloaded as its own .md file; the first batch is copied to your clipboard. Paste batches one at a time into Lovable chat.`
        : `\n\nThe prompt will be copied to your clipboard and downloaded as a .md file. Paste it into Lovable chat and the AI will ${verb} each suggested fix in the topic source files.`;
    const ok = window.confirm(
      `Generate a Lovable chat prompt for ${targets.length} ${label} finding${targets.length === 1 ? "" : "s"}?${batchNote}`,
    );
    if (!ok) return;
    setBulkBusy(true);
    try {
      const dateStr = new Date().toISOString().slice(0, 10);
      prompts.forEach((prompt, i) => {
        const suffix =
          batchCount > 1 ? `-batch-${i + 1}-of-${batchCount}` : "";
        const blob = new Blob([prompt], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `audit-${targetStatus}-prompt-${dateStr}${suffix}.md`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      });

      let copied = false;
      try {
        await navigator.clipboard.writeText(prompts[0]);
        copied = true;
      } catch {
        copied = false;
      }

      const base = `${targets.length} ${label} finding${targets.length === 1 ? "" : "s"}`;
      toast.success(
        batchCount > 1
          ? `${base} split into ${batchCount} batches (each <${MAX_PROMPT_CHARS.toLocaleString()} chars). ${copied ? "Batch 1 copied to clipboard; all batches downloaded." : "All batches downloaded — open them in order."}`
          : copied
            ? `Prompt for ${base} copied to clipboard and downloaded.`
            : `Prompt downloaded (${base}). Open the .md and paste into Lovable chat.`,
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
      expansion: open.filter(isExpansionFinding).length,
    };
  }, [findings]);

  const running = job?.status === "running" || job?.status === "pending";
  const jobFinished = job?.status === "completed" || job?.status === "completed_with_errors";
  const progress =
    job && job.total > 0 ? Math.round((job.processed / job.total) * 100) : 0;

  // tick every second so elapsed/ETA refresh smoothly while running
  const [, setTick] = useState(0);
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setTick((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, [running]);

  const elapsedMs = job ? Date.now() - new Date(job.created_at).getTime() : 0;

  // Average per-topic duration from completed topic logs for this job.
  // Falls back to overall elapsed/processed when no log durations are available yet.
  const { avgTopicMs, avgSource } = useMemo(() => {
    if (!job) return { avgTopicMs: 0, avgSource: "none" as const };
    const completed = topicLogs.filter(
      (l) =>
        l.job_id === job.id &&
        (l.status === "succeeded" || l.status === "failed") &&
        typeof l.duration_ms === "number" &&
        l.duration_ms! > 0,
    );
    if (completed.length > 0) {
      const sum = completed.reduce((s, l) => s + (l.duration_ms || 0), 0);
      return { avgTopicMs: sum / completed.length, avgSource: "logs" as const };
    }
    if (job.processed > 0) {
      return {
        avgTopicMs: elapsedMs / job.processed,
        avgSource: "elapsed" as const,
      };
    }
    return { avgTopicMs: 0, avgSource: "none" as const };
  }, [topicLogs, job?.id, job?.processed, elapsedMs]);

  const etaMs =
    running && job && avgTopicMs > 0 && job.total > job.processed
      ? avgTopicMs * (job.total - job.processed)
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
                NICE, BNF, ESICM and Resuscitation Council UK. Runs weekly.
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
                await Promise.all([fetchFindings(j?.id), fetchTopicLogs(j?.id)]);
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
                onClick={async () => {
                  const auditStarted = await startAudit("all");
                  if (!auditStarted) return;
                  try {
                    const headers = await getAdminFunctionHeaders();
                    const { data, error } = await supabase.functions.invoke("verify-drugs", {
                      body: { action: "start" },
                      headers,
                    });
                    if (error) throw error;
                    if ((data as any)?.error) throw new Error((data as any).error);
                    toast.success("Formulary verification started in background");
                  } catch (e: any) {
                    // Audit was already started; just surface the verify-drugs problem.
                    toast.error(
                      `Topic audit started, but formulary verification failed to start: ${e?.message ?? "Unknown error"}`,
                    );
                  }
                }}
                disabled={starting || running}
                variant="default"
              >
                <Sparkles className="w-4 h-4 mr-1" />
                Run all checks
              </Button>
              <Button
                onClick={() => startAudit("all")}
                disabled={starting || running}
                variant="outline"
              >
                <Play className="w-4 h-4 mr-1" />
                Audit topics only ({allTopics.filter((t) => t.available).length})
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
                  Cancel topic audit
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              <strong>Run all checks</strong> kicks off the topic audit, the formulary verification,
              and re-runs the ESICM dose validator below — one click to verify everything.
            </p>


            {job && (
              <div className="rounded-md border border-border p-3 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {jobFinished ? (
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

                {/* Timeline UI */}
                <AuditTimeline
                  job={job}
                  topicLogs={topicLogs}
                  etaMs={etaMs}
                  avgTopicMs={avgTopicMs}
                  avgSource={avgSource}
                />

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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <StatTile label="Open findings" value={stats.open} />
          <StatTile label="Critical" value={stats.critical} tone="critical" />
          <StatTile label="Major" value={stats.major} tone="major" />
          <StatTile label="Diagram issues" value={stats.diagrams} />
          <StatTile label="Thin / gap / update" value={stats.expansion} />
        </div>

        {/* Companion checks: formulary verification + ESICM dose validator */}
        <FormularyVerificationPanel />
        <EsicmValidatorPanel />
        <InaccuracyReportsPanel />



        {/* Per-topic logs */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLogsCollapsed((v) => !v)}
                  className="inline-flex items-center gap-1 hover:text-primary"
                  aria-expanded={!logsCollapsed}
                >
                  {logsCollapsed ? (
                    <ChevronRight className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                  Topic logs
                </button>
                <span className="text-xs font-normal text-muted-foreground">
                  ({topicLogs.length})
                </span>
              </CardTitle>
              {topicLogs.some((l) => l.status === "failed") && (
                <Badge className={`${logStatusColors.failed} border-0`}>
                  {topicLogs.filter((l) => l.status === "failed").length} failed
                </Badge>
              )}
            </div>
          </CardHeader>
          {!logsCollapsed && (
            <CardContent className="space-y-2">
              {topicLogs.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  No per-topic logs yet. Start an audit to see live progress here.
                </p>
              ) : (
                <div className="divide-y divide-border rounded-md border border-border overflow-hidden">
                  {topicLogs.map((log) => {
                    const expanded = expandedLogs.has(log.id);
                    const toggle = () => {
                      setExpandedLogs((prev) => {
                        const next = new Set(prev);
                        if (next.has(log.id)) next.delete(log.id);
                        else next.add(log.id);
                        return next;
                      });
                    };
                    return (
                      <div key={log.id} className="bg-card">
                        <button
                          type="button"
                          onClick={toggle}
                          className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-muted/40"
                          aria-expanded={expanded}
                        >
                          {expanded ? (
                            <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                          )}
                          <Badge
                            className={`${logStatusColors[log.status] ?? ""} border-0 capitalize text-[10px] py-0`}
                          >
                            {log.status}
                          </Badge>
                          <span className="text-sm text-foreground truncate flex-1">
                            {log.topic_title}
                          </span>
                          <span className="text-xs text-muted-foreground hidden sm:inline truncate">
                            {log.section}
                          </span>
                          <span className="text-xs text-muted-foreground tabular-nums">
                            {log.duration_ms != null
                              ? `${(log.duration_ms / 1000).toFixed(1)}s`
                              : log.status === "running"
                                ? "…"
                                : "—"}
                          </span>
                          <span className="text-xs text-muted-foreground tabular-nums w-12 text-right">
                            {log.findings_count} f
                          </span>
                        </button>
                        {expanded && (
                          <div className="px-3 pb-3 pt-1 space-y-2 text-xs">
                            <div className="flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground">
                              {log.topic_url && (
                                <a
                                  href={log.topic_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 text-primary hover:underline"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  {log.topic_url}
                                </a>
                              )}
                              {log.started_at && (
                                <span>
                                  Started:{" "}
                                  {new Date(log.started_at).toLocaleTimeString()}
                                </span>
                              )}
                              {log.completed_at && (
                                <span>
                                  Ended:{" "}
                                  {new Date(log.completed_at).toLocaleTimeString()}
                                </span>
                              )}
                            </div>
                            {log.error_message && (
                              <div className="rounded border border-destructive/40 bg-destructive/10 p-2 text-destructive">
                                <div className="font-medium mb-1 flex items-center gap-1">
                                  <AlertCircle className="w-3 h-3" />
                                  Error
                                </div>
                                <pre className="whitespace-pre-wrap break-words text-[11px] leading-snug">
                                  {log.error_message}
                                </pre>
                              </div>
                            )}
                            {log.stages && Object.keys(log.stages).length > 0 && (
                              <div className="rounded border border-border bg-muted/30 p-2">
                                <div className="font-medium mb-1 text-muted-foreground">
                                  Stages
                                </div>
                                <pre className="whitespace-pre-wrap break-words text-[11px] leading-snug text-foreground">
                                  {JSON.stringify(log.stages, null, 2)}
                                </pre>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          )}
        </Card>



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
              <div className="w-full sm:w-auto sm:ml-auto flex flex-wrap items-center gap-2">
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
                  variant="secondary"
                  onClick={() => correctAll("fixed")}
                  disabled={
                    bulkBusy ||
                    filtered.filter((f) => f.status === "fixed").length === 0
                  }
                  title="Re-build a Lovable chat prompt from findings already marked fixed (useful if edits were lost or need re-applying)."
                >
                  {`Re-apply fixed (${filtered.filter((f) => f.status === "fixed").length})`}
                </Button>
                <Button
                  size="sm"
                  onClick={() => correctAll("open")}
                  disabled={
                    bulkBusy ||
                    filtered.filter((f) => f.status === "open").length === 0
                  }
                  title="Build a Lovable chat prompt that applies every suggested fix to the topic source files. Copies to clipboard + downloads .md."
                >
                  {bulkBusy
                    ? "Building prompt…"
                    : `Correct all (${filtered.filter((f) => f.status === "open").length})`}
                </Button>
                <Button
                  size="sm"
                  variant="default"
                  onClick={expandAll}
                  disabled={
                    bulkBusy ||
                    filtered.filter(
                      (f) => f.status === "open" && isExpansionFinding(f),
                    ).length === 0
                  }
                  title="Build a Lovable chat prompt that expands thin sections, adds missing subtopics, and updates content for newer guidelines. Copies to clipboard + downloads .md."
                >
                  {bulkBusy
                    ? "Building brief…"
                    : `Expand thin / gap / update (${filtered.filter((f) => f.status === "open" && isExpansionFinding(f)).length})`}
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
                          {f.topic_url && f.in_topic_section && (
                            <a
                              href={`${f.topic_url}#${sectionAnchorId(f.in_topic_section)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary hover:bg-primary/20 inline-flex items-center gap-1"
                              title={`Open topic and scroll to "${f.in_topic_section}"`}
                            >
                              Jump to: {f.in_topic_section}
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

/* ------------------------------------------------------------------
   Audit Timeline — per-job visual progress strip
   ------------------------------------------------------------------ */
const AuditTimeline = ({
  job,
  topicLogs,
  etaMs = 0,
  avgTopicMs = 0,
  avgSource = "none",
}: {
  job: Job;
  topicLogs: TopicLog[];
  etaMs?: number;
  avgTopicMs?: number;
  avgSource?: "logs" | "elapsed" | "none";
}) => {
  if (!job) return null;

  const running = job.status === "running" || job.status === "pending";
  const finished = job.status === "completed" || job.status === "completed_with_errors";

  // Sort logs by when they started (oldest first) so the timeline reads left→right
  const sorted = useMemo(
    () =>
      [...topicLogs].sort((a, b) => {
        const ta = a.started_at ? new Date(a.started_at).getTime() : Infinity;
        const tb = b.started_at ? new Date(b.started_at).getTime() : Infinity;
        return ta - tb;
      }),
    [topicLogs],
  );

  const counts = useMemo(() => {
    const c = { pending: 0, running: 0, succeeded: 0, failed: 0, skipped: 0 };
    for (const l of sorted) {
      if (l.status in c) c[l.status as keyof typeof c]++;
    }
    return c;
  }, [sorted]);

  const dotCls = (status: TopicLog["status"]) => {
    switch (status) {
      case "succeeded":
        return "bg-emerald-500";
      case "failed":
        return "bg-red-500";
      case "running":
        return "bg-blue-500 animate-pulse";
      case "skipped":
        return "bg-muted";
      default:
        return "bg-muted/40 border border-muted";
    }
  };

  return (
    <div className="space-y-3">
      {/* Metric pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground">
          {job.processed} / {job.total} processed
        </span>
        <span className="text-muted-foreground">·</span>
        {finished && (
          <>
            <span className="text-xs text-emerald-600 font-medium">job finished</span>
            <span className="text-muted-foreground">·</span>
          </>
        )}
        <span className="text-xs text-emerald-600 font-medium">
          {counts.succeeded} succeeded
        </span>
        <span className="text-muted-foreground">·</span>
        <span className="text-xs text-red-600 font-medium">
          {counts.failed} failed
        </span>
        <span className="text-muted-foreground">·</span>
        <span className="text-xs text-muted-foreground">
          {counts.running} running
        </span>
        {running && (
          <>
            <span className="text-muted-foreground">·</span>
            <span className="text-xs text-muted-foreground">
              Elapsed: {fmtDuration(Date.now() - new Date(job.created_at).getTime())}
            </span>
            {etaMs > 0 && (
              <>
                <span className="text-muted-foreground">·</span>
                <span
                  className="text-xs text-muted-foreground"
                  title={
                    avgSource === "logs"
                      ? "ETA based on average duration of completed topics in this job"
                      : "ETA based on overall elapsed time (no completed topic durations yet)"
                  }
                >
                  ETA: ~{fmtDuration(etaMs)}
                </span>
              </>
            )}
            {avgTopicMs > 0 && (
              <>
                <span className="text-muted-foreground">·</span>
                <span className="text-xs text-muted-foreground">
                  Avg/topic: {(avgTopicMs / 1000).toFixed(1)}s
                  {avgSource === "elapsed" && (
                    <span className="opacity-60"> (est.)</span>
                  )}
                </span>
              </>
            )}
          </>
        )}
      </div>

      {/* Visual dot strip */}
      {sorted.length > 0 && (
        <div className="space-y-1">
          <div className="flex flex-wrap gap-[2px]">
            {sorted.map((log) => (
              <div
                key={log.id}
                className={`w-3 h-5 rounded-sm ${dotCls(log.status)}`}
                title={`${log.topic_title} — ${log.status}${log.duration_ms ? ` — ${(log.duration_ms / 1000).toFixed(1)}s` : ""}`}
              />
            ))}
            {/* Fill remaining pending slots so the bar grows to full width */}
            {Array.from({ length: Math.max(0, job.total - sorted.length) }).map(
              (_, i) => (
                <div
                  key={`pending-${i}`}
                  className="w-3 h-5 rounded-sm bg-muted/40 border border-muted"
                  title="Pending"
                />
              ),
            )}
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground tabular-nums">
            <span>0</span>
            <span>{Math.round(job.total / 2)}</span>
            <span>{job.total}</span>
          </div>
        </div>
      )}

      {/* Current topic */}
      {job.current_topic && (
        <div className="flex items-center gap-2 text-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
          </span>
          <span className="text-muted-foreground">Now auditing:</span>
          <span className="font-medium text-foreground">{job.current_topic}</span>
        </div>
      )}
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
