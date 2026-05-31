import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Pill,
  Play,
  RotateCw,
  Square,
} from "lucide-react";
import { toast } from "sonner";
import { getAdminFunctionHeaders } from "@/lib/admin-function-auth";

// A job is considered "stuck" if its updated_at hasn't moved for this long
// while still in pending/running. 3 min comfortably exceeds normal per-drug
// processing time (~20s) and any transient network hiccup.
const STUCK_THRESHOLD_MS = 3 * 60_000;

interface VerificationJob {
  id: string;
  status: string;
  total: number;
  processed: number;
  succeeded: number;
  failed: number;
  current_drug: string | null;
  last_error: string | null;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

interface VerificationLog {
  id: string;
  drug_name: string;
  drug_slug: string;
  status: string;
  fields_changed: string[];
  error: string | null;
  created_at: string;
}

export interface FormularyVerificationPanelHandle {
  start: () => Promise<void>;
}

interface Props {
  /** When true, panel mounts open by default (e.g. from a deep-link). */
  initiallyOpen?: boolean;
  /** Notify parent when a job is started so it can update its "run all" state. */
  onStarted?: () => void;
}

/**
 * Embeddable formulary verification panel.
 * Talks to the `verify-drugs` edge function and `drug_verification_*` tables.
 */
const FormularyVerificationPanel = ({ initiallyOpen = false, onStarted }: Props) => {
  const [collapsed, setCollapsed] = useState(!initiallyOpen);
  const [job, setJob] = useState<VerificationJob | null>(null);
  const [logs, setLogs] = useState<VerificationLog[]>([]);
  const [starting, setStarting] = useState(false);

  const fetchJob = useCallback(async () => {
    const { data: jobs } = await supabase
      .from("drug_verification_jobs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1);
    const j = (jobs?.[0] as VerificationJob | undefined) ?? null;
    setJob(j);
    if (j) {
      const { data: logRows } = await supabase
        .from("drug_verification_log")
        .select("*")
        .eq("job_id", j.id)
        .order("created_at", { ascending: false })
        .limit(50);
      setLogs((logRows ?? []) as VerificationLog[]);
    } else {
      setLogs([]);
    }
  }, []);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  // Poll every 3s while panel is open AND a job is active. Keeps load down
  // when collapsed and idle.
  useEffect(() => {
    if (collapsed) return;
    const isActive = job && ["pending", "running"].includes(job.status);
    const interval = setInterval(fetchJob, isActive ? 3000 : 15000);
    return () => clearInterval(interval);
  }, [collapsed, job?.status, fetchJob]);

  const startVerification = async () => {
    setStarting(true);
    // Retry on 409 ("already running") with exponential backoff:
    // 2s → 4s → 8s → 16s → 32s (5 attempts, ~62s total).
    const MAX_ATTEMPTS = 5;
    const BASE_DELAY_MS = 2000;
    try {
      const headers = await getAdminFunctionHeaders();
      let lastError: unknown = null;
      for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const { data, error } = await supabase.functions.invoke("verify-drugs", {
          body: { action: "start" },
          headers,
        });
        const payloadError = (data as any)?.error as string | undefined;
        const errMsg = error?.message ?? payloadError ?? "";
        const is409 =
          /\b409\b/.test(errMsg) ||
          /already running/i.test(errMsg) ||
          (data as any)?.jobId; // server returns existing jobId on 409
        if (!error && !payloadError) {
          toast.success("Formulary verification started");
          setCollapsed(false);
          onStarted?.();
          await fetchJob();
          return;
        }
        lastError = error ?? new Error(payloadError ?? "Unknown error");
        if (!is409 || attempt === MAX_ATTEMPTS - 1) break;
        const delay = BASE_DELAY_MS * 2 ** attempt;
        toast.info(
          `A verification job is already running — retrying in ${delay / 1000}s (attempt ${attempt + 2}/${MAX_ATTEMPTS})`,
        );
        setCollapsed(false);
        await fetchJob();
        await new Promise((r) => setTimeout(r, delay));
      }
      throw lastError ?? new Error("Unknown error");
    } catch (e) {
      toast.error(
        `Could not start formulary verification: ${e instanceof Error ? e.message : "Unknown error"}`,
      );
    } finally {
      setStarting(false);
    }
  };

  const cancelVerification = async () => {
    if (!job) return;
    if (!confirm("Cancel the running formulary verification job?")) return;
    const headers = await getAdminFunctionHeaders();
    await supabase.functions.invoke("verify-drugs", {
      body: { action: "cancel", jobId: job.id },
      headers,
    });
    await fetchJob();
  };

  const resumeVerification = async () => {
    const headers = await getAdminFunctionHeaders();
    const { data, error } = await supabase.functions.invoke("verify-drugs", {
      body: { action: "resume" },
      headers,
    });
    if (error || (data as any)?.error) {
      toast.error(
        `Could not resume: ${error?.message ?? (data as any)?.error ?? "Unknown"}`,
      );
    }
    await fetchJob();
  };

  const isStalled = !!job
    && ["pending", "running"].includes(job.status)
    && Date.now() - new Date(job.updated_at).getTime() > 90_000;

  const isActive = !!job && ["pending", "running"].includes(job.status);
  const pct = job && job.total ? (job.processed / job.total) * 100 : 0;

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
              <Pill className="w-4 h-4 text-primary" />
              Formulary verification
            </button>
            {job && (
              <Badge
                variant="secondary"
                className={
                  job.status === "running" ? "text-blue-700 dark:text-blue-300" :
                  job.status === "completed" ? "text-emerald-700 dark:text-emerald-300" :
                  job.status === "failed" ? "text-red-700 dark:text-red-300" :
                  ""
                }
              >
                {job.status}
              </Badge>
            )}
          </CardTitle>
          <div className="flex gap-2">
            {(!job || ["completed", "failed", "cancelled"].includes(job.status)) && (
              <Button onClick={startVerification} disabled={starting} size="sm">
                <Play className="w-4 h-4 mr-1" />
                {starting ? "Starting…" : "Verify all drugs"}
              </Button>
            )}
            {isActive && (
              <>
                {isStalled && (
                  <Button onClick={resumeVerification} size="sm" variant="secondary">
                    <Play className="w-4 h-4 mr-1" /> Resume
                  </Button>
                )}
                <Button onClick={cancelVerification} variant="destructive" size="sm">
                  <Square className="w-4 h-4 mr-1" /> Cancel
                </Button>
              </>
            )}
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Re-checks every drug monograph for consistency with eMC SPCs, NICE BNF, and AAGBI / ICS / RCoA guidelines.
          Updates are written directly to the formulary.
        </p>
      </CardHeader>
      {!collapsed && (
        <CardContent className="space-y-3">
          {job && (
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap text-xs">
                <span className="text-muted-foreground">
                  {job.processed} / {job.total} processed
                </span>
                <span className="text-emerald-600 dark:text-emerald-400">{job.succeeded} ok</span>
                {job.failed > 0 && (
                  <span className="text-red-600 dark:text-red-400">{job.failed} failed</span>
                )}
                {job.current_drug && (
                  <span className="text-muted-foreground">→ {job.current_drug}</span>
                )}
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              {job.last_error && (
                <p className="text-xs text-red-600 dark:text-red-400 break-words">
                  Last error: {job.last_error}
                </p>
              )}
            </div>
          )}
          {logs.length > 0 && (
            <div className="rounded-md border border-border p-3 bg-card">
              <h3 className="text-xs font-semibold text-foreground mb-2">
                Recent activity (latest 50)
              </h3>
              <div className="space-y-1.5 max-h-[360px] overflow-y-auto">
                {logs.map((l) => (
                  <div key={l.id} className="flex items-start gap-2 text-xs">
                    {l.status === "updated" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                    ) : l.status === "unchanged" ? (
                      <CheckCircle2 className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-foreground">{l.drug_name}</span>
                      <span className="text-muted-foreground ml-2">
                        {l.status === "updated"
                          ? `updated · ${l.fields_changed.join(", ")}`
                          : l.status === "unchanged"
                            ? "no changes needed"
                            : `failed: ${l.error ?? "unknown"}`}
                      </span>
                    </div>
                    <span className="text-muted-foreground shrink-0">
                      {new Date(l.created_at).toLocaleTimeString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {!job && (
            <p className="text-xs text-muted-foreground py-2">
              No verification jobs yet. Start one to populate the formulary verification log.
            </p>
          )}
        </CardContent>
      )}
    </Card>
  );
};

export default FormularyVerificationPanel;
