import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Trash2, Loader2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { PageSection } from "@/components/layout/PageSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Donation {
  id: string;
  donated_on: string;
  amount: number;
  currency: string;
  donor_name: string | null;
  method: string;
  note: string | null;
}

// Tables are new; cast until generated types refresh.
const db = supabase as any;

const fmt = (amount: number, currency: string) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency }).format(amount);

export default function Donations() {
  const [rows, setRows] = useState<Donation[]>([]);
  const [clicks, setClicks] = useState<{ total: number; last30: number }>({ total: 0, last30: 0 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    donated_on: new Date().toISOString().slice(0, 10),
    amount: "",
    currency: "GBP",
    donor_name: "",
    method: "PayPal",
    note: "",
  });

  const load = useCallback(async () => {
    setLoading(true);
    const since = new Date(Date.now() - 30 * 864e5).toISOString();
    const [d, all, recent] = await Promise.all([
      db.from("donations").select("*").order("donated_on", { ascending: false }),
      db.from("donation_clicks").select("id", { count: "exact", head: true }),
      db.from("donation_clicks").select("id", { count: "exact", head: true }).gte("clicked_at", since),
    ]);
    if (d.error) toast.error("Couldn't load donations");
    setRows((d.data ?? []).map((r: any) => ({ ...r, amount: Number(r.amount) })));
    setClicks({ total: all.count ?? 0, last30: recent.count ?? 0 });
    setLoading(false);
  }, []);

  useEffect(() => {
    document.title = "Donations — Admin";
    load();
  }, [load]);

  const totals = useMemo(() => {
    const byCurrency: Record<string, number> = {};
    const now = new Date();
    const thisMonth: Record<string, number> = {};
    for (const r of rows) {
      byCurrency[r.currency] = (byCurrency[r.currency] ?? 0) + r.amount;
      const d = new Date(r.donated_on);
      if (d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth()) {
        thisMonth[r.currency] = (thisMonth[r.currency] ?? 0) + r.amount;
      }
    }
    const show = (m: Record<string, number>) =>
      Object.keys(m).length ? Object.entries(m).map(([c, v]) => fmt(v, c)).join(" + ") : fmt(0, "GBP");
    return { all: show(byCurrency), month: show(thisMonth) };
  }, [rows]);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(form.amount);
    if (!amount || amount <= 0) return toast.error("Enter an amount above zero");
    setSaving(true);
    const { data: u } = await supabase.auth.getUser();
    const { error } = await db.from("donations").insert({
      donated_on: form.donated_on,
      amount,
      currency: form.currency.toUpperCase().slice(0, 3),
      donor_name: form.donor_name.trim() || null,
      method: form.method.trim() || "PayPal",
      note: form.note.trim() || null,
      created_by: u.user?.id ?? null,
    });
    setSaving(false);
    if (error) return toast.error("Couldn't save donation");
    toast.success("Donation recorded");
    setForm((f) => ({ ...f, amount: "", donor_name: "", note: "" }));
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this donation record?")) return;
    const { error } = await db.from("donations").delete().eq("id", id);
    if (error) return toast.error("Couldn't delete");
    load();
  };

  return (
    <PageSection as="main" spacing="tight" width="wide">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h1 className="font-serif text-3xl font-semibold flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" aria-hidden /> Donations
        </h1>
        <Link to="/admin" className="text-sm underline text-muted-foreground hover:text-foreground">
          Back to admin
        </Link>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        {[
          ["Total received", totals.all],
          ["This month", totals.month],
          ["Donations recorded", String(rows.length)],
          ["Donate button clicks", `${clicks.total} (${clicks.last30} in last 30 days)`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-1 text-lg font-semibold text-foreground">{value}</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        PayPal.me doesn't report payments back to the app, so add each donation here when it
        arrives.{" "}
        <a href="https://www.paypal.com/activities" target="_blank" rel="noreferrer" className="underline inline-flex items-center gap-1">
          Open PayPal activity <ExternalLink className="h-3 w-3" aria-hidden />
        </a>
      </p>

      <form onSubmit={add} className="rounded-lg border border-border bg-card p-4 mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <label className="text-xs text-muted-foreground">Date
          <Input type="date" required value={form.donated_on} onChange={(e) => setForm({ ...form, donated_on: e.target.value })} />
        </label>
        <label className="text-xs text-muted-foreground">Amount
          <Input type="number" step="0.01" min="0.01" required value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
        </label>
        <label className="text-xs text-muted-foreground">Currency
          <Input maxLength={3} value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} />
        </label>
        <label className="text-xs text-muted-foreground">Donor (optional)
          <Input maxLength={120} value={form.donor_name} onChange={(e) => setForm({ ...form, donor_name: e.target.value })} />
        </label>
        <label className="text-xs text-muted-foreground">Method
          <Input maxLength={40} value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })} />
        </label>
        <label className="text-xs text-muted-foreground">Note (optional)
          <Input maxLength={300} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
        </label>
        <div className="sm:col-span-2 lg:col-span-6">
          <Button type="submit" disabled={saving}>
            {saving && <Loader2 className="h-4 w-4 mr-1 animate-spin" />} Add donation
          </Button>
        </div>
      </form>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">No donations recorded yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left text-muted-foreground">
              <tr>
                <th className="p-2">Date</th><th className="p-2">Amount</th><th className="p-2">Donor</th>
                <th className="p-2">Method</th><th className="p-2">Note</th><th className="p-2"><span className="sr-only">Delete</span></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-border">
                  <td className="p-2 whitespace-nowrap">{new Date(r.donated_on).toLocaleDateString("en-GB")}</td>
                  <td className="p-2 font-medium">{fmt(r.amount, r.currency)}</td>
                  <td className="p-2">{r.donor_name ?? "Anonymous"}</td>
                  <td className="p-2">{r.method}</td>
                  <td className="p-2 text-muted-foreground">{r.note}</td>
                  <td className="p-2 text-right">
                    <Button variant="ghost" size="icon" aria-label="Delete donation" onClick={() => remove(r.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageSection>
  );
}
