import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageSection } from "@/components/layout/PageSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import {
  ACCENT_BANK,
  ACCENT_GROUPS,
  accentsInGroup,
  podcastVoiceLabel,
} from "@/lib/podcastVoices";
import { hasNativeVoice } from "@/lib/podcastNativeVoices";
import {
  BATCH_SIZE_OPTIONS,
  cancelJob,
  createRerecordJob,
  DEFAULT_BATCH_SIZE,
  fetchItems,
  fetchJob,
  fetchLatestJob,
  keepAwake,
  MAX_JOB_VOICES,
  rerecordableTopics,
  runRerecordQueue,
  setJobPaused,
  type RerecordItem,
  type RerecordJob,
} from "@/lib/podcastRerecord";

export default function PodcastRerecord() {
  const [job, setJob] = useState<RerecordJob | null>(null);
  const [items, setItems] = useState<RerecordItem[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [password, setPassword] = useState("");
  const [batchSize, setBatchSize] = useState<number>(DEFAULT_BATCH_SIZE);
  const [log, setLog] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const stopRef = useRef<{ stopped: boolean }>({ stopped: false });
  const navigate = useNavigate();

  const topicCount = useMemo(() => rerecordableTopics().length, []);

  useEffect(() => {
    document.title = "Re-record podcasts — Admin";
    (async () => {
      const latest = await fetchLatestJob();
      setJob(latest);
      if (latest) setItems(await fetchItems(latest.id, 60));
    })();
  }, []);

  // Keep the numbers fresh while a run is in flight.
  useEffect(() => {
    if (!job || job.status === "complete" || job.status === "cancelled") return;
    const t = setInterval(async () => {
      const fresh = await fetchJob(job.id);
      if (fresh) setJob(fresh);
      setItems(await fetchItems(job.id, 60));
    }, 15_000);
    return () => clearInterval(t);
  }, [job?.id, job?.status]);

  // Warn before the tab closes mid-run — the queue needs this page open.
  useEffect(() => {
    if (!running) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [running]);

  const addLog = useCallback((line: string) => {
    setLog((prev) => [`${new Date().toLocaleTimeString()} — ${line}`, ...prev].slice(0, 200));
  }, []);

  const startRunner = useCallback(
    async (jobId: string) => {
      if (!password.trim()) {
        toast({ title: "Enter the recording password first.", variant: "destructive" });
        return;
      }
      stopRef.current = { stopped: false };
      setRunning(true);
      const release = await keepAwake();
      try {
        await runRerecordQueue(
          jobId,
          password.trim(),
          stopRef.current,
          {
            onProgress: setJob,
            onLog: addLog,
            onItem: async () => setItems(await fetchItems(jobId, 60)),
          },
          { batchSize },
        );
      } finally {
        release();
        setRunning(false);
      }
    },
    [addLog, password, batchSize],
  );

  // Coming back to the page after the browser suspended it: pick the run up
  // again automatically instead of leaving it looking stalled.
  useEffect(() => {
    const onVisible = async () => {
      if (document.visibilityState !== "visible") return;
      if (running || !password.trim()) return;
      const latest = await fetchLatestJob();
      if (!latest) return;
      setJob(latest);
      if (latest.paused || latest.status === "cancelled" || latest.status === "complete") return;
      addLog("Page was asleep — picking the run back up.");
      void startRunner(latest.id);
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [running, password, startRunner, addLog]);

  const handleStart = async () => {
    if (selected.length === 0) {
      toast({ title: "Choose at least one accent.", variant: "destructive" });
      return;
    }
    try {
      const created = await createRerecordJob(selected);
      setJob(created);
      setItems(await fetchItems(created.id, 60));
      addLog(`Queued ${created.total} recordings across ${created.voices.length} accent(s).`);
      void startRunner(created.id);
    } catch (err) {
      toast({
        title: "Could not start",
        description: err instanceof Error ? err.message : String(err),
        variant: "destructive",
      });
    }
  };

  const toggleVoice = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((v) => v !== id);
      if (prev.length >= MAX_JOB_VOICES) {
        toast({ title: `Up to ${MAX_JOB_VOICES} accents per run.` });
        return prev;
      }
      return [...prev, id];
    });
  };

  const pct = job && job.total > 0 ? Math.round((job.processed / job.total) * 100) : 0;
  const active = job && job.status !== "complete" && job.status !== "cancelled";

  return (
    <PageSection as="main" spacing="tight" width="wide">
      <Button
        variant="ghost"
        size="sm"
        className="mb-2 -ml-2"
        onClick={() => navigate("/admin")}
        aria-label="Back to admin dashboard"
      >
        <ArrowLeft className="w-4 h-4 mr-1" aria-hidden="true" />
        Back to admin dashboard
      </Button>
      <header className="mb-6">
        <h1 className="font-serif text-3xl font-semibold">Re-record podcasts</h1>
        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Records every topic again with a real regional voice and a fresh script, so episodes
          reflect the current page content. Each existing episode keeps playing until its
          replacement is ready. Pick up to {MAX_JOB_VOICES} accents — {topicCount} topics per
          accent, one at a time. Keep this page open while it runs; you can pause and resume, and
          finished episodes are never repeated.
        </p>
      </header>

      {!active && (
        <section className="mb-8 rounded-lg border border-border p-4">
          <h2 className="mb-3 font-medium">Choose accents</h2>
          <div className="mb-4 flex flex-wrap gap-2">
            {selected.map((id) => (
              <Badge key={id} variant="secondary">
                {podcastVoiceLabel(id)}
              </Badge>
            ))}
            {selected.length === 0 && (
              <span className="text-sm text-muted-foreground">Nothing selected yet.</span>
            )}
          </div>

          <div className="max-h-80 space-y-4 overflow-y-auto pr-2">
            {ACCENT_GROUPS.map((group) => (
              <div key={group}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {group}
                </p>
                <div className="grid gap-1 sm:grid-cols-2">
                  {accentsInGroup(group).map((a) => (
                    <label
                      key={a.id}
                      className="flex items-start gap-2 rounded px-2 py-1 text-sm hover:bg-muted/50"
                    >
                      <Checkbox
                        checked={selected.includes(a.id)}
                        onCheckedChange={() => toggleVoice(a.id)}
                        aria-label={a.label}
                      />
                      <span>
                        <span className="font-medium">{a.label}</span>
                        {hasNativeVoice(a.id) && (
                          <span className="ml-1 text-[0.65rem] uppercase tracking-wide text-primary">
                            native voice
                          </span>
                        )}
                        <span className="block text-xs text-muted-foreground">{a.description}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input
              type="password"
              placeholder="Recording password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="sm:max-w-xs"
            />
            <label className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Episodes per batch</span>
              <select
                value={batchSize}
                onChange={(e) => setBatchSize(Number(e.target.value))}
                className="h-9 rounded-md border border-input bg-background px-2 text-sm"
                aria-label="Episodes per batch"
              >
                {BATCH_SIZE_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>
            <Button onClick={handleStart} disabled={selected.length === 0}>
              Start re-recording {selected.length * topicCount || ""} episodes
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {ACCENT_BANK.length} accents are available; each one you add multiplies the number of
            recordings and the cost. Work runs in small batches, alternating accents, and any single
            episode that takes more than eight minutes is skipped so the run keeps moving.
          </p>
        </section>
      )}

      {job && (
        <section className="mb-8 rounded-lg border border-border p-4">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <h2 className="font-medium">Current run</h2>
            <Badge variant={job.paused ? "destructive" : "secondary"}>{job.status}</Badge>
            {job.voices.map((v) => (
              <Badge key={v} variant="outline">
                {podcastVoiceLabel(v)}
              </Badge>
            ))}
          </div>

          <Progress value={pct} className="mb-2" />
          <p className="text-sm text-muted-foreground">
            {job.processed} of {job.total} done · {job.succeeded} recorded · {job.failed} failed
            {job.current_topic && !job.paused ? ` · now: ${job.current_topic}` : ""}
          </p>
          {job.paused_reason && (
            <p className="mt-2 text-sm text-destructive">{job.paused_reason}</p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {!running && active && (
              <>
                <Input
                  type="password"
                  placeholder="Recording password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="sm:max-w-xs"
                />
                <Button
                  onClick={async () => {
                    await setJobPaused(job.id, false);
                    const fresh = await fetchJob(job.id);
                    if (fresh) setJob(fresh);
                    void startRunner(job.id);
                  }}
                >
                  {job.processed > 0 ? "Resume" : "Start"}
                </Button>
              </>
            )}
            {running && (
              <Button
                variant="secondary"
                onClick={async () => {
                  stopRef.current.stopped = true;
                  await setJobPaused(job.id, true, "Paused by admin");
                  const fresh = await fetchJob(job.id);
                  if (fresh) setJob(fresh);
                  addLog("Paused after the current episode.");
                }}
              >
                Pause
              </Button>
            )}
            {active && (
              <Button
                variant="outline"
                onClick={async () => {
                  stopRef.current.stopped = true;
                  await cancelJob(job.id);
                  const fresh = await fetchJob(job.id);
                  if (fresh) setJob(fresh);
                  addLog("Run cancelled.");
                }}
              >
                Cancel run
              </Button>
            )}
          </div>
        </section>
      )}

      {log.length > 0 && (
        <section className="mb-8 rounded-lg border border-border p-4">
          <h2 className="mb-2 font-medium">Activity</h2>
          <ul className="max-h-60 space-y-1 overflow-y-auto text-xs text-muted-foreground">
            {log.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </section>
      )}

      {items.length > 0 && (
        <section className="rounded-lg border border-border p-4">
          <h2 className="mb-2 font-medium">Recent episodes</h2>
          <ul className="space-y-1 text-sm">
            {items.map((it) => (
              <li key={it.id} className="flex flex-wrap items-center gap-2">
                <Badge
                  variant={
                    it.status === "done"
                      ? "secondary"
                      : it.status === "failed"
                        ? "destructive"
                        : "outline"
                  }
                >
                  {it.status}
                </Badge>
                <span>{it.topic_title}</span>
                <span className="text-muted-foreground">— {podcastVoiceLabel(it.voice)}</span>
                {it.error_message && (
                  <span className="text-xs text-destructive">{it.error_message}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </PageSection>
  );
}
