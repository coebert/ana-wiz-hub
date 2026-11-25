import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { PageSection } from "@/components/layout/PageSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { canRecordDraft, holdKeyTerms } from "@/lib/podcastHolds";
import { allTopics } from "@/data/curriculum";
import { topicPath } from "@/lib/study-plan";

type HeldRow = { id: string; topic_id: string; topic_title: string; voice: string; audit_hold: boolean; audit_hold_reason: string | null; error_message: string | null };
type Draft = { id: string; topic_id: string; draft_script: string; status: string; reviewed_by: string | null; reviewed_at: string | null; hold_reasons: unknown; updated_at: string };

const callPodcast = async (mode: "hold_draft" | "hold_record", topicId: string) => {
  const { data, error } = await supabase.functions.invoke("generate-podcast", { body: { mode, topicId } });
  if (error) {
    let msg = error.message;
    try { msg = (await (error as { context?: Response }).context?.json())?.error ?? msg; } catch { /* keep */ }
    throw new Error(msg);
  }
  return data;
};

function Highlighted({ text, terms }: { text: string; terms: string[] }) {
  if (!terms.length) return <>{text}</>;
  const re = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  return <>{text.split(re).map((p, i) => (i % 2 ? <mark key={i} className="bg-accent text-accent-foreground rounded px-0.5">{p}</mark> : p))}</>;
}

function TopicCard({ topicId, rows, draft, onChange }: { topicId: string; rows: HeldRow[]; draft: Draft | null; onChange: () => void }) {
  const reasons = useMemo(() => [...new Set(rows.map((r) => r.audit_hold_reason ?? "").filter(Boolean))], [rows]);
  const terms = useMemo(() => holdKeyTerms(reasons), [reasons]);
  const [text, setText] = useState(draft?.draft_script ?? "");
  const [busy, setBusy] = useState<string | null>(null);
  useEffect(() => setText(draft?.draft_script ?? ""), [draft?.draft_script]);
  const held = rows.filter((r) => r.audit_hold);
  const released = rows.length - held.length;

  const run = async (label: string, fn: () => Promise<unknown>, ok: string) => {
    setBusy(label);
    try { await fn(); toast({ title: ok }); onChange(); }
    catch (e) { toast({ title: "Could not complete", description: e instanceof Error ? e.message : String(e), variant: "destructive" }); }
    finally { setBusy(null); }
  };
  const save = (status: "draft" | "approved" | "rejected") =>
    run(status, async () => {
      const { error } = await supabase.from("podcast_review_drafts").update({ draft_script: text, status }).eq("id", draft!.id);
      if (error) throw error;
    }, status === "approved" ? "Script approved" : status === "rejected" ? "Script rejected" : "Edits saved");

  return (
    <article className="rounded-lg border bg-card p-4 space-y-3" aria-labelledby={`h-${topicId}`}>
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <h2 id={`h-${topicId}`} className="font-semibold text-lg">{rows[0].topic_title}</h2>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline">{held.length} held{released ? ` · ${released} released` : ""}</Badge>
          {draft && <Badge variant={draft.status === "approved" ? "default" : "secondary"}>{draft.status}</Badge>}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">Voices: {rows.map((r) => r.voice).join(", ")} · {(() => { const t = allTopics.find((x) => x.id === topicId); return t ? <Link className="underline" to={topicPath(t)}>Open topic</Link> : null; })()}</p>
      <div className="rounded-md bg-muted p-3 text-sm space-y-1">
        <p className="font-medium">Why it was held</p>
        {reasons.map((r) => <p key={r}>{r}</p>)}
      </div>
      {rows.some((r) => r.error_message?.startsWith("Reviewed re-record failed")) && (
        <p className="text-sm text-destructive">{rows.find((r) => r.error_message?.startsWith("Reviewed re-record failed"))?.error_message}</p>
      )}
      {!draft || draft.status === "rejected" ? (
        <Button size="sm" disabled={!!busy || !held.length} onClick={() => run("draft", () => callPodcast("hold_draft", topicId), "Drafting started — this takes a minute or two")}>
          {busy === "draft" ? "Starting…" : draft ? "Draft a new script" : "Draft corrected script"}
        </Button>
      ) : draft.status === "recorded" ? (
        <p className="text-sm">Recorded from the approved script and released.</p>
      ) : (
        <div className="space-y-2">
          {terms.length > 0 && (
            <details className="text-sm">
              <summary className="cursor-pointer">Check highlighted phrases ({terms.join(", ")})</summary>
              <div className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap rounded border p-2"><Highlighted text={text} terms={terms} /></div>
            </details>
          )}
          <label className="text-sm font-medium" htmlFor={`s-${topicId}`}>Replacement script ({text.split(/\s+/).filter(Boolean).length} words)</label>
          <Textarea id={`s-${topicId}`} value={text} onChange={(e) => setText(e.target.value)} rows={12} disabled={draft.status === "approved"} />
          <div className="flex flex-wrap gap-2">
            {draft.status !== "approved" ? (
              <>
                <Button size="sm" variant="outline" disabled={!!busy || text === draft.draft_script} onClick={() => save("draft")}>Save edits</Button>
                <Button size="sm" disabled={!!busy} onClick={() => save("approved")}>Approve script</Button>
                <Button size="sm" variant="ghost" disabled={!!busy} onClick={() => save("rejected")}>Reject</Button>
              </>
            ) : (
              <>
                <Button size="sm" disabled={!!busy || !canRecordDraft(draft) || !held.length} onClick={() => run("record", () => callPodcast("hold_record", topicId), `Recording ${held.length} voice(s) — this can take several minutes`)}>
                  {busy === "record" ? "Starting…" : `Record and release (${held.length})`}
                </Button>
                <Button size="sm" variant="outline" disabled={!!busy} onClick={() => save("draft")}>Back to editing</Button>
              </>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

export default function PodcastHolds() {
  const [rows, setRows] = useState<HeldRow[]>([]);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data: heldNow } = await supabase.from("podcasts").select("topic_id").eq("audit_hold", true);
    const topicIds = [...new Set((heldNow ?? []).map((r) => r.topic_id))];
    const { data: d } = await supabase.from("podcast_review_drafts").select("*");
    const draftTopics = (d ?? []).map((x) => x.topic_id);
    const all = [...new Set([...topicIds, ...draftTopics])];
    const { data: r } = all.length
      ? await supabase.from("podcasts").select("id,topic_id,topic_title,voice,audit_hold,audit_hold_reason,error_message").in("topic_id", all)
      : { data: [] as HeldRow[] };
    setRows(((r ?? []) as HeldRow[]).filter((x) => x.audit_hold || draftTopics.includes(x.topic_id)));
    setDrafts((d ?? []) as Draft[]);
    setLoading(false);
  }, []);

  useEffect(() => { document.title = "Held episodes — Admin"; load(); const t = setInterval(load, 15_000); return () => clearInterval(t); }, [load]);

  const byTopic = useMemo(() => {
    const m = new Map<string, HeldRow[]>();
    for (const r of rows) m.set(r.topic_id, [...(m.get(r.topic_id) ?? []), r]);
    return [...m.entries()].sort((a, b) => a[1][0].topic_title.localeCompare(b[1][0].topic_title));
  }, [rows]);
  const heldCount = rows.filter((r) => r.audit_hold).length;

  return (
    <PageSection>
      <div className="max-w-4xl mx-auto space-y-4 py-6">
        <Link to="/admin" className="inline-flex items-center gap-1 text-sm underline"><ArrowLeft className="w-4 h-4" aria-hidden="true" />Admin</Link>
        <h1 className="font-display text-3xl">Held episodes</h1>
        <p className="text-muted-foreground">
          {loading ? "Loading…" : `${heldCount} recording(s) held across ${byTopic.filter(([, rs]) => rs.some((r) => r.audit_hold)).length} topic(s).`}{" "}
          Each one comes back only after you approve a corrected script; new audio is then recorded to a new file and the original is kept. Approval is your own review, not an automatic clinical check.
        </p>
        {byTopic.map(([id, rs]) => (
          <TopicCard key={id} topicId={id} rows={rs} draft={drafts.find((d) => d.topic_id === id) ?? null} onChange={load} />
        ))}
      </div>
    </PageSection>
  );
}
