import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { getAdminFunctionHeaders } from "@/lib/admin-function-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { RefreshCw, ShieldCheck, ShieldOff, Copy, Trash2, ExternalLink, Download } from "lucide-react";

type Status = "pending" | "confirmed" | "dismissed";

interface FlaggedDomain {
  id: string;
  domain: string;
  status: Status;
  source: string;
  authority_score: number | null;
  anchor_text_sample: string | null;
  reason: string | null;
  notes: string | null;
  first_seen_at: string;
  last_seen_at: string;
}

interface SyncResult {
  ok: boolean;
  scannedDomains: number;
  flaggedDomains: number;
  inserted: number;
  refreshed: number;
  ranAt: string;
}

const STATUS_LABEL: Record<Status, string> = {
  pending: "Pending review",
  confirmed: "Confirmed spoofed",
  dismissed: "Dismissed (legit)",
};

const STATUS_BADGE: Record<Status, "default" | "destructive" | "secondary"> = {
  pending: "default",
  confirmed: "destructive",
  dismissed: "secondary",
};

function fmtDate(iso: string) {
  try { return new Date(iso).toLocaleString(); } catch { return iso; }
}

function buildDisavowFile(domains: string[]) {
  const today = new Date().toISOString().slice(0, 10);
  const sorted = [...domains].sort();
  return [
    `# Disavow file for https://anaesthesiacore.app/`,
    `#`,
    `# Upload at: https://search.google.com/search-console/disavow-links`,
    `# Uploading REPLACES the previous list — always upload the full file.`,
    `#`,
    `# Generated from the confirmed-spoofed watchlist on ${today}`,
    `# Entries: ${sorted.length} domains`,
    ``,
    `# --- Disavowed domains (covers all subdomains + paths) ---`,
    ...sorted.map((d) => `domain:${d}`),
    ``,
  ].join("\n");
}

export default function SpoofedDomainsPanel() {
  const qc = useQueryClient();
  const [lastSync, setLastSync] = useState<SyncResult | null>(null);
  const [tab, setTab] = useState<Status>("pending");

  const { data: rows, isLoading } = useQuery({
    queryKey: ["flagged_domains"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("flagged_domains")
        .select("*")
        .order("last_seen_at", { ascending: false });
      if (error) throw error;
      return data as FlaggedDomain[];
    },
  });

  const sync = useMutation({
    mutationFn: async () => {
      const headers = await getAdminFunctionHeaders();
      const { data, error } = await supabase.functions.invoke("semrush-backlink-sync", {
        method: "POST",
        headers,
      });
      if (error) throw error;
      return data as SyncResult;
    },
    onSuccess: (data) => {
      setLastSync(data);
      qc.invalidateQueries({ queryKey: ["flagged_domains"] });
      toast({
        title: "Semrush sync complete",
        description: `Scanned ${data.scannedDomains} referring domain${data.scannedDomains === 1 ? "" : "s"} · ${data.inserted} new flagged · ${data.refreshed} refreshed.`,
      });
    },
    onError: (err: Error) => toast({
      title: "Sync failed",
      description: err.message,
      variant: "destructive",
    }),
  });

  const setStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Status }) => {
      const { error } = await supabase.from("flagged_domains").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["flagged_domains"] }),
    onError: (err: Error) => toast({ title: "Update failed", description: err.message, variant: "destructive" }),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("flagged_domains").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["flagged_domains"] }),
    onError: (err: Error) => toast({ title: "Delete failed", description: err.message, variant: "destructive" }),
  });

  const counts = useMemo(() => {
    const c = { pending: 0, confirmed: 0, dismissed: 0 } as Record<Status, number>;
    for (const r of rows ?? []) c[r.status]++;
    return c;
  }, [rows]);

  const filtered = useMemo(
    () => (rows ?? []).filter((r) => r.status === tab),
    [rows, tab],
  );

  const confirmedDomains = useMemo(
    () => (rows ?? []).filter((r) => r.status === "confirmed").map((r) => r.domain),
    [rows],
  );

  const disavowFile = useMemo(
    () => (confirmedDomains.length ? buildDisavowFile(confirmedDomains) : ""),
    [confirmedDomains],
  );

  async function copyDisavow() {
    if (!disavowFile) {
      toast({ title: "Nothing to copy", description: "No confirmed-spoofed domains yet." });
      return;
    }
    await navigator.clipboard.writeText(disavowFile);
    toast({ title: "Copied disavow.txt", description: "Paste into Search Console or docs/seo/disavow.txt." });
  }

  function downloadDisavow() {
    if (!disavowFile) {
      toast({ title: "Nothing to download", description: "No confirmed-spoofed domains yet." });
      return;
    }
    const blob = new Blob([disavowFile], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "disavow.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
        <div>
          <CardTitle>Spoofed backlinks</CardTitle>
          <CardDescription className="mt-1">
            Auto-imported from Semrush. Confirm spoofed entries, then export the disavow file for Search Console.
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={copyDisavow} disabled={!disavowFile}>
            <Copy className="mr-2 h-4 w-4" /> Copy disavow.txt
          </Button>
          <Button size="sm" variant="outline" onClick={downloadDisavow} disabled={!disavowFile}>
            <Download className="mr-2 h-4 w-4" /> Download disavow.txt
          </Button>
          <Button size="sm" onClick={() => sync.mutate()} disabled={sync.isPending}>
            <RefreshCw className={`mr-2 h-4 w-4 ${sync.isPending ? "animate-spin" : ""}`} />
            {sync.isPending ? "Syncing…" : "Sync from Semrush"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {lastSync ? (
          <div className="rounded-md border border-primary/30 bg-primary/5 p-3 text-xs text-muted-foreground">
            Last sync at {fmtDate(lastSync.ranAt)}: scanned <strong className="text-foreground">{lastSync.scannedDomains}</strong> referring
            domains, flagged <strong className="text-foreground">{lastSync.flaggedDomains}</strong> ({lastSync.inserted} new,
            {" "}{lastSync.refreshed} refreshed).
          </div>
        ) : null}

        <Tabs value={tab} onValueChange={(v) => setTab(v as Status)}>
          <TabsList>
            <TabsTrigger value="pending">Pending ({counts.pending})</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed ({counts.confirmed})</TabsTrigger>
            <TabsTrigger value="dismissed">Dismissed ({counts.dismissed})</TabsTrigger>
          </TabsList>

          {(["pending", "confirmed", "dismissed"] as Status[]).map((s) => (
            <TabsContent key={s} value={s} className="mt-4 space-y-3">
              {isLoading ? (
                <Skeleton className="h-32 w-full" />
              ) : filtered.length === 0 ? (
                <div className="rounded-md border border-dashed border-border bg-muted/30 p-6 text-sm text-muted-foreground">
                  No domains in <em>{STATUS_LABEL[s].toLowerCase()}</em>.
                </div>
              ) : (
                filtered.map((row) => (
                  <FlaggedRow
                    key={row.id}
                    row={row}
                    onApprove={() => setStatus.mutate({ id: row.id, status: "confirmed" })}
                    onDismiss={() => setStatus.mutate({ id: row.id, status: "dismissed" })}
                    onReopen={() => setStatus.mutate({ id: row.id, status: "pending" })}
                    onDelete={() => remove.mutate(row.id)}
                    busy={setStatus.isPending || remove.isPending}
                  />
                ))
              )}
              {s === "confirmed" && filtered.length > 0 ? (
                <div className="rounded-md border border-border bg-muted/30 p-3 text-sm">
                  <a
                    href="https://search.google.com/search-console/disavow-links"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                  >
                    Open Google Search Console disavow tool <ExternalLink className="h-3 w-3" />
                  </a>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Upload the <code className="font-mono">disavow.txt</code> file above. Uploading replaces the previous list — always upload the full file.
                  </p>
                </div>
              ) : null}
            </TabsContent>
          ))}
        </Tabs>

        <details className="rounded-md border border-border bg-muted/30">
          <summary className="cursor-pointer select-none px-3 py-2 text-sm font-medium">
            disavow.txt preview ({confirmedDomains.length} confirmed {confirmedDomains.length === 1 ? "domain" : "domains"})
          </summary>
          <pre className="max-h-72 overflow-auto border-t border-border bg-background px-3 py-2 text-xs font-mono whitespace-pre-wrap break-all">
{disavowFile || "# No confirmed-spoofed domains yet. Confirm entries above to populate this file."}
          </pre>
        </details>
      </CardContent>
    </Card>
  );
}

function FlaggedRow({
  row, onApprove, onDismiss, onReopen, onDelete, busy,
}: {
  row: FlaggedDomain;
  onApprove: () => void;
  onDismiss: () => void;
  onReopen: () => void;
  onDelete: () => void;
  busy: boolean;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base font-mono">
              <a
                href={`https://${row.domain}`}
                target="_blank"
                rel="noreferrer nofollow"
                className="hover:underline inline-flex items-center gap-1"
              >
                {row.domain} <ExternalLink className="h-3 w-3" />
              </a>
            </CardTitle>
            <CardDescription className="mt-1 flex flex-wrap items-center gap-2">
              <Badge variant={STATUS_BADGE[row.status]}>{STATUS_LABEL[row.status]}</Badge>
              {row.authority_score !== null ? (
                <Badge variant="outline">AS {row.authority_score}/100</Badge>
              ) : null}
              <span className="text-xs">First seen {fmtDate(row.first_seen_at)}</span>
              <span className="text-xs">· Last seen {fmtDate(row.last_seen_at)}</span>
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {row.status !== "confirmed" ? (
              <Button size="sm" variant="destructive" onClick={onApprove} disabled={busy}>
                <ShieldCheck className="mr-1 h-3 w-3" /> Confirm spoofed
              </Button>
            ) : null}
            {row.status !== "dismissed" ? (
              <Button size="sm" variant="outline" onClick={onDismiss} disabled={busy}>
                <ShieldOff className="mr-1 h-3 w-3" /> Dismiss (legit)
              </Button>
            ) : null}
            {row.status !== "pending" ? (
              <Button size="sm" variant="ghost" onClick={onReopen} disabled={busy}>
                Reopen
              </Button>
            ) : null}
            <Button size="sm" variant="ghost" onClick={onDelete} disabled={busy}>
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 pt-0 text-sm">
        {row.reason ? (
          <p className="text-muted-foreground">
            <strong className="text-foreground">Why flagged:</strong> {row.reason}
          </p>
        ) : null}
        {row.anchor_text_sample ? (
          <Textarea
            readOnly
            value={row.anchor_text_sample}
            className="font-mono text-xs h-16"
          />
        ) : null}
      </CardContent>
    </Card>
  );
}
