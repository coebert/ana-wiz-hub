import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageSection } from "@/components/layout/PageSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { allTopics } from "@/data/curriculum";
import { topicPath } from "@/lib/study-plan";
import type { ContentOverride, OverrideKind, OverrideStatus } from "@/hooks/useContentOverrides";
import { Trash2, Eye, Save, Plus, ExternalLink, Copy } from "lucide-react";

const KIND_LABELS: Record<OverrideKind, string> = {
  note: "Extra note",
  correction: "Correction to existing text",
  subsection: "New subsection",
  key_point: "Extra key learning point",
  reference: "Extra reference",
};

const STATUS_LABELS: Record<OverrideStatus, string> = {
  draft: "Draft (not visible)",
  live: "Live on the page",
  merged: "Folded into the page",
  archived: "Archived",
};

interface FormState {
  id?: string;
  topic_id: string;
  kind: OverrideKind;
  anchor: string;
  heading: string;
  body: string;
  original_text: string;
  ref_label: string;
  ref_url: string;
  ref_pmid: string;
  ref_excerpt: string;
  position: number;
  status: OverrideStatus;
  queued: boolean;
}

const emptyForm = (topicId: string): FormState => ({
  topic_id: topicId,
  kind: "note",
  anchor: "",
  heading: "",
  body: "",
  original_text: "",
  ref_label: "",
  ref_url: "",
  ref_pmid: "",
  ref_excerpt: "",
  position: 0,
  status: "draft",
  queued: true,
});

export default function ContentEditor() {
  const topics = useMemo(
    () => [...allTopics].sort((a, b) => a.title.localeCompare(b.title)),
    [],
  );
  const [topicId, setTopicId] = useState(topics[0]?.id ?? "");
  const [rows, setRows] = useState<ContentOverride[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm(topics[0]?.id ?? ""));

  const topic = topics.find((t) => t.id === topicId);

  useEffect(() => {
    document.title = "Content editor — Admin";
  }, []);

  const load = async (id: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("content_overrides")
      .select("*")
      .eq("topic_id", id)
      .order("updated_at", { ascending: false });
    setLoading(false);
    if (error) {
      toast({ title: "Could not load edits", description: error.message, variant: "destructive" });
      return;
    }
    setRows((data ?? []) as unknown as ContentOverride[]);
  };

  useEffect(() => {
    if (topicId) {
      void load(topicId);
      setForm((f) => ({ ...f, topic_id: topicId }));
    }
  }, [topicId]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const save = async () => {
    if (!form.body.trim()) {
      toast({ title: "Add some text first", variant: "destructive" });
      return;
    }
    setSaving(true);
    const payload = {
      topic_id: form.topic_id,
      topic_title: topics.find((t) => t.id === form.topic_id)?.title ?? "",
      kind: form.kind,
      anchor: form.anchor.trim() || null,
      heading: form.heading.trim() || null,
      body: form.body.trim(),
      original_text: form.original_text.trim() || null,
      ref_label: form.ref_label.trim() || null,
      ref_url: form.ref_url.trim() || null,
      ref_pmid: form.ref_pmid.trim() || null,
      ref_excerpt: form.ref_excerpt.trim() || null,
      position: form.position,
      status: form.status,
      queued: form.queued,
    };
    const { error } = form.id
      ? await supabase.from("content_overrides").update(payload).eq("id", form.id)
      : await supabase.from("content_overrides").insert(payload);
    setSaving(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: form.id ? "Edit updated" : "Edit saved" });
    setForm(emptyForm(topicId));
    void load(topicId);
  };

  const edit = (row: ContentOverride) => {
    setForm({
      id: row.id,
      topic_id: row.topic_id,
      kind: row.kind,
      anchor: row.anchor ?? "",
      heading: row.heading ?? "",
      body: row.body,
      original_text: row.original_text ?? "",
      ref_label: row.ref_label ?? "",
      ref_url: row.ref_url ?? "",
      ref_pmid: row.ref_pmid ?? "",
      ref_excerpt: row.ref_excerpt ?? "",
      position: row.position,
      status: row.status,
      queued: row.queued,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const setStatus = async (row: ContentOverride, status: OverrideStatus) => {
    const { error } = await supabase.from("content_overrides").update({ status }).eq("id", row.id);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    void load(topicId);
  };

  const remove = async (row: ContentOverride) => {
    if (!window.confirm("Delete this edit permanently?")) return;
    const { error } = await supabase.from("content_overrides").delete().eq("id", row.id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Edit deleted" });
    void load(topicId);
  };

  const copyQueue = async () => {
    const { data } = await supabase
      .from("content_overrides")
      .select("*")
      .eq("queued", true)
      .in("status", ["draft", "live"])
      .order("topic_id");
    const queue = (data ?? []) as unknown as ContentOverride[];
    if (queue.length === 0) {
      toast({ title: "Nothing queued yet" });
      return;
    }
    const text = queue
      .map(
        (q) =>
          `## ${q.topic_title || q.topic_id} (${q.topic_id}) — ${KIND_LABELS[q.kind]}\n` +
          (q.anchor ? `Section: ${q.anchor}\n` : "") +
          (q.heading ? `Heading: ${q.heading}\n` : "") +
          (q.original_text ? `Replace: "${q.original_text}"\n` : "") +
          (q.ref_label ? `Reference label: ${q.ref_label}\n` : "") +
          (q.ref_url ? `URL: ${q.ref_url}\n` : "") +
          (q.ref_pmid ? `PMID: ${q.ref_pmid}\n` : "") +
          `\n${q.body}\n`,
      )
      .join("\n---\n\n");
    await navigator.clipboard.writeText(
      `Please fold these admin content edits into the topic source files:\n\n${text}`,
    );
    toast({ title: `Copied ${queue.length} queued edit(s)` });
  };

  const isRef = form.kind === "reference";

  return (
    <PageSection as="main" spacing="tight" width="wide">
      <header className="mb-6">
        <h1 className="font-serif text-3xl font-semibold">Content editor</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Publish your own notes, corrections, subsections, key points and references onto a topic
          page. Live edits appear on the page immediately; anything you keep queued can also be
          folded permanently into the page later.
        </p>
      </header>

      <div className="mb-6 flex flex-wrap items-end gap-3">
        <div className="min-w-[260px] flex-1">
          <Label htmlFor="topic">Topic</Label>
          <Select value={topicId} onValueChange={setTopicId}>
            <SelectTrigger id="topic" className="mt-1">
              <SelectValue placeholder="Choose a topic" />
            </SelectTrigger>
            <SelectContent className="max-h-[320px]">
              {topics.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {topic && (
          <Button asChild variant="outline">
            <Link to={topicPath(topic)} target="_blank">
              View page <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        )}
        <Button variant="outline" onClick={copyQueue}>
          <Copy className="mr-1 h-3.5 w-3.5" /> Copy queued edits
        </Button>
      </div>

      <Tabs defaultValue="new">
        <TabsList>
          <TabsTrigger value="new">{form.id ? "Edit" : "New edit"}</TabsTrigger>
          <TabsTrigger value="list">Existing edits ({rows.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="kind">What kind of edit?</Label>
              <Select value={form.kind} onValueChange={(v) => set("kind", v as OverrideKind)}>
                <SelectTrigger id="kind" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(KIND_LABELS) as OverrideKind[]).map((k) => (
                    <SelectItem key={k} value={k}>
                      {KIND_LABELS[k]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Visibility</Label>
              <Select value={form.status} onValueChange={(v) => set("status", v as OverrideStatus)}>
                <SelectTrigger id="status" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(STATUS_LABELS) as OverrideStatus[]).map((s) => (
                    <SelectItem key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {!isRef && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="anchor">Which section is this about? (optional)</Label>
                <Input
                  id="anchor"
                  className="mt-1"
                  placeholder="e.g. Complement pathway"
                  value={form.anchor}
                  onChange={(e) => set("anchor", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="heading">Heading (optional)</Label>
                <Input
                  id="heading"
                  className="mt-1"
                  placeholder="Shown above your text"
                  value={form.heading}
                  onChange={(e) => set("heading", e.target.value)}
                />
              </div>
            </div>
          )}

          {form.kind === "correction" && (
            <div>
              <Label htmlFor="original">Text being corrected</Label>
              <Textarea
                id="original"
                className="mt-1"
                rows={3}
                placeholder="Paste the wording currently on the page"
                value={form.original_text}
                onChange={(e) => set("original_text", e.target.value)}
              />
            </div>
          )}

          <div>
            <Label htmlFor="body">
              {isRef ? "Full citation" : "Your text"}
            </Label>
            <Textarea
              id="body"
              className="mt-1 font-sans"
              rows={isRef ? 4 : 10}
              placeholder={
                isRef
                  ? "Author. Title. Journal. Year;vol(issue):pages."
                  : "Blank line = new paragraph. Start a line with '- ' for a bullet."
              }
              value={form.body}
              onChange={(e) => set("body", e.target.value)}
            />
          </div>

          {isRef && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="reflabel">Short label</Label>
                <Input
                  id="reflabel"
                  className="mt-1"
                  placeholder="e.g. BJA Educ 2024"
                  value={form.ref_label}
                  onChange={(e) => set("ref_label", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="refurl">Link (DOI or URL)</Label>
                <Input
                  id="refurl"
                  className="mt-1"
                  placeholder="https://doi.org/…"
                  value={form.ref_url}
                  onChange={(e) => set("ref_url", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="refpmid">PubMed ID</Label>
                <Input
                  id="refpmid"
                  className="mt-1"
                  value={form.ref_pmid}
                  onChange={(e) => set("ref_pmid", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="refexcerpt">Verbatim quote from the source</Label>
                <Textarea
                  id="refexcerpt"
                  className="mt-1"
                  rows={3}
                  value={form.ref_excerpt}
                  onChange={(e) => set("ref_excerpt", e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={save} disabled={saving}>
              <Save className="mr-1 h-4 w-4" />
              {saving ? "Saving…" : form.id ? "Update edit" : "Save edit"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                set("status", "live");
                void save();
              }}
              disabled={saving}
            >
              <Eye className="mr-1 h-4 w-4" /> Save &amp; publish live
            </Button>
            {form.id && (
              <Button variant="ghost" onClick={() => setForm(emptyForm(topicId))}>
                <Plus className="mr-1 h-4 w-4" /> New edit instead
              </Button>
            )}
            <label className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={form.queued}
                onChange={(e) => set("queued", e.target.checked)}
              />
              Queue for permanent merge into the page
            </label>
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-4">
          {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
          {!loading && rows.length === 0 && (
            <p className="text-sm text-muted-foreground">No edits for this topic yet.</p>
          )}
          <div className="space-y-3">
            {rows.map((row) => (
              <article key={row.id} className="rounded-lg border border-border p-4">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary">{KIND_LABELS[row.kind]}</Badge>
                  <Badge variant={row.status === "live" ? "default" : "outline"}>
                    {STATUS_LABELS[row.status]}
                  </Badge>
                  {row.queued && <Badge variant="outline">Queued for merge</Badge>}
                  {row.anchor && (
                    <span className="text-xs text-muted-foreground">{row.anchor}</span>
                  )}
                </div>
                {row.heading && <h2 className="font-semibold">{row.heading}</h2>}
                <p className="whitespace-pre-wrap text-sm text-foreground">{row.body}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" onClick={() => edit(row)}>
                    Edit
                  </Button>
                  {row.status !== "live" ? (
                    <Button size="sm" variant="outline" onClick={() => setStatus(row, "live")}>
                      Publish live
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => setStatus(row, "draft")}>
                      Unpublish
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={() => setStatus(row, "archived")}>
                    Archive
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => remove(row)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </PageSection>
  );
}
