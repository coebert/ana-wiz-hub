import { useEffect, useMemo, useState } from "react";
import { Flag, Loader2, RefreshCw, ExternalLink, ChevronDown, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * Admin triage view for reader-submitted inaccuracy reports.
 *
 * Mounted inside the Content Audit page. Lets editors:
 *  - Filter by status (new / acknowledged / published / dismissed / all)
 *  - Read the quote, message, suggested correction, and contact email
 *  - Promote a report to `published` (with an editor-written `public_note`
 *    that surfaces on /errata) or mark it acknowledged / dismissed
 *
 * All writes go through RLS: only `has_role(auth.uid(), 'admin')` users
 * can update or delete rows. `reviewed_by` / `reviewed_at` are stamped on
 * any status change so the audit trail is preserved.
 */

type Status = "new" | "acknowledged" | "published" | "dismissed";

type Report = {
  id: string;
  topic_id: string;
  topic_title: string;
  topic_url: string | null;
  quoted_text: string | null;
  message: string;
  suggested_correction: string | null;
  contact_email: string | null;
  user_agent: string | null;
  status: Status;
  public_note: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
  created_at: string;
  updated_at: string;
};

const STATUS_FILTERS: { value: Status | "all"; label: string }[] = [
  { value: "new", label: "New" },
  { value: "acknowledged", label: "Acknowledged" },
  { value: "published", label: "Published" },
  { value: "dismissed", label: "Dismissed" },
  { value: "all", label: "All" },
];

const statusTone: Record<Status, string> = {
  new: "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200",
  acknowledged: "bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200",
  published:
    "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-200",
  dismissed: "bg-muted text-muted-foreground",
};

const fmtDateTime = (iso: string | null) => {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
};

const InaccuracyReportsPanel = () => {
  const { user, isAdmin } = useAuth();
  const [filter, setFilter] = useState<Status | "all">("new");
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [busyId, setBusyId] = useState<string | null>(null);
  const [counts, setCounts] = useState<Record<Status, number>>({
    new: 0,
    acknowledged: 0,
    published: 0,
    dismissed: 0,
  });

  const load = async () => {
    setLoading(true);
    let q = supabase
      .from("inaccuracy_reports")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (filter !== "all") q = q.eq("status", filter);
    const { data, error } = await q;
    if (error) {
      console.error("load inaccuracy_reports failed", error);
      toast.error("Could not load inaccuracy reports.");
      setLoading(false);
      return;
    }
    setReports((data ?? []) as Report[]);

    // Refresh status counts (separate query so filters don't skew them).
    const { data: allData } = await supabase
      .from("inaccuracy_reports")
      .select("status");
    if (allData) {
      const next: Record<Status, number> = {
        new: 0,
        acknowledged: 0,
        published: 0,
        dismissed: 0,
      };
      for (const row of allData as { status: Status }[]) {
        if (row.status in next) next[row.status] += 1;
      }
      setCounts(next);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isAdmin) void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, filter]);

  const update = async (
    report: Report,
    nextStatus: Status,
    publicNote?: string | null,
  ) => {
    if (!user) return;
    setBusyId(report.id);
    const patch: Partial<Report> = {
      status: nextStatus,
      reviewed_at: new Date().toISOString(),
      reviewed_by: user.id,
    };
    if (nextStatus === "published") {
      const note = (publicNote ?? "").trim();
      if (!note) {
        toast.error(
          "Add an editor note before publishing — it appears on the public errata page.",
        );
        setBusyId(null);
        return;
      }
      patch.public_note = note.slice(0, 4000);
    } else if (nextStatus === "dismissed" || nextStatus === "new") {
      // Clear any previously published note so /errata doesn't show a stale entry.
      patch.public_note = null;
    } else if (publicNote !== undefined) {
      patch.public_note = publicNote ? publicNote.trim().slice(0, 4000) : null;
    }
    const { error } = await supabase
      .from("inaccuracy_reports")
      .update(patch)
      .eq("id", report.id);
    setBusyId(null);
    if (error) {
      console.error("update inaccuracy_report failed", error);
      toast.error("Update failed. Check your admin role and try again.");
      return;
    }
    toast.success(
      nextStatus === "published"
        ? "Published to /errata."
        : `Marked as ${nextStatus}.`,
    );
    await load();
  };

  const remove = async (report: Report) => {
    if (!confirm("Delete this report permanently? This cannot be undone.")) return;
    setBusyId(report.id);
    const { error } = await supabase
      .from("inaccuracy_reports")
      .delete()
      .eq("id", report.id);
    setBusyId(null);
    if (error) {
      toast.error("Delete failed.");
      return;
    }
    toast.success("Report deleted.");
    await load();
  };

  const headerCounts = useMemo(
    () =>
      `${counts.new} new · ${counts.acknowledged} ack · ${counts.published} published · ${counts.dismissed} dismissed`,
    [counts],
  );

  if (!isAdmin) return null;

  return (
    <Card className="mt-6">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Flag className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-base">Reader inaccuracy reports</CardTitle>
            <Badge variant="secondary" className="ml-1 text-xs">
              {headerCounts}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Select value={filter} onValueChange={(v) => setFilter(v as Status | "all")}>
              <SelectTrigger className="h-8 w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_FILTERS.map((f) => (
                  <SelectItem key={f.value} value={f.value}>
                    {f.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => void load()}
              disabled={loading}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {loading && reports.length === 0 ? (
          <p className="text-sm text-muted-foreground">Loading reports…</p>
        ) : reports.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No reports{filter !== "all" ? ` with status “${filter}”` : ""}.
          </p>
        ) : (
          reports.map((r) => {
            const expanded = expandedId === r.id;
            const draft = drafts[r.id] ?? r.public_note ?? "";
            return (
              <div
                key={r.id}
                className="rounded-md border border-border bg-card"
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(expanded ? null : r.id)}
                  className="flex w-full items-start gap-2 px-3 py-2 text-left hover:bg-muted/40"
                >
                  {expanded ? (
                    <ChevronDown className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronRight className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${statusTone[r.status]}`}>
                        {r.status}
                      </span>
                      <span className="font-medium text-sm truncate">{r.topic_title}</span>
                      <span className="text-xs text-muted-foreground">
                        {fmtDateTime(r.created_at)}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-sm text-muted-foreground">
                      {r.message}
                    </p>
                  </div>
                </button>
                {expanded && (
                  <div className="space-y-3 border-t border-border px-3 py-3 text-sm">
                    {r.quoted_text && (
                      <div>
                        <div className="text-xs font-medium text-muted-foreground">
                          Quoted text
                        </div>
                        <blockquote className="mt-1 border-l-2 border-border pl-2 italic text-foreground/90">
                          {r.quoted_text}
                        </blockquote>
                      </div>
                    )}
                    <div>
                      <div className="text-xs font-medium text-muted-foreground">
                        Reporter message
                      </div>
                      <p className="mt-1 whitespace-pre-wrap">{r.message}</p>
                    </div>
                    {r.suggested_correction && (
                      <div>
                        <div className="text-xs font-medium text-muted-foreground">
                          Suggested correction
                        </div>
                        <p className="mt-1 whitespace-pre-wrap">
                          {r.suggested_correction}
                        </p>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span>Topic id: <code>{r.topic_id}</code></span>
                      {r.topic_url && (
                        <a
                          href={r.topic_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          Open topic <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      {r.contact_email && (
                        <a
                          href={`mailto:${r.contact_email}`}
                          className="text-primary hover:underline"
                        >
                          {r.contact_email}
                        </a>
                      )}
                      {r.reviewed_at && (
                        <span>Reviewed {fmtDateTime(r.reviewed_at)}</span>
                      )}
                    </div>

                    <div>
                      <div className="text-xs font-medium text-muted-foreground">
                        Public errata note{" "}
                        <span className="font-normal">
                          (required to publish; appears on /errata)
                        </span>
                      </div>
                      <Textarea
                        value={draft}
                        onChange={(e) =>
                          setDrafts((d) => ({ ...d, [r.id]: e.target.value }))
                        }
                        rows={3}
                        maxLength={4000}
                        placeholder="e.g. Corrected noradrenaline infusion upper limit from 3 to 1 mcg/kg/min (BNF, May 2026)."
                        className="mt-1"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => void update(r, "published", draft)}
                        disabled={busyId === r.id}
                      >
                        {busyId === r.id && (
                          <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                        )}
                        Publish to errata
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => void update(r, "acknowledged")}
                        disabled={busyId === r.id || r.status === "acknowledged"}
                      >
                        Acknowledge
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => void update(r, "dismissed")}
                        disabled={busyId === r.id || r.status === "dismissed"}
                      >
                        Dismiss
                      </Button>
                      {r.status !== "new" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => void update(r, "new")}
                          disabled={busyId === r.id}
                        >
                          Reopen
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive ml-auto"
                        onClick={() => void remove(r)}
                        disabled={busyId === r.id}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};

export default InaccuracyReportsPanel;
