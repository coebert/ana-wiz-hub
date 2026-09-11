import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Activity, RefreshCw } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip as RTooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

type MetricName = "LCP" | "INP" | "CLS" | "FCP" | "TTFB";

interface VitalRow {
  metric: string;
  value: number;
  rating: string | null;
  route: string;
  device_type: string | null;
  created_at: string;
}

const METRICS: MetricName[] = ["LCP", "INP", "CLS", "FCP", "TTFB"];

/** Google Core Web Vitals thresholds: [good, needs-improvement] upper bounds. */
const THRESHOLDS: Record<MetricName, [number, number]> = {
  LCP: [2500, 4000],
  INP: [200, 500],
  CLS: [0.1, 0.25],
  FCP: [1800, 3000],
  TTFB: [800, 1800],
};

const RANGE_OPTIONS = [7, 30, 90] as const;

function p75(values: number[]): number | null {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = Math.min(sorted.length - 1, Math.ceil(0.75 * sorted.length) - 1);
  return sorted[Math.max(0, idx)];
}

function fmt(metric: MetricName, v: number | null): string {
  if (v === null) return "—";
  if (metric === "CLS") return v.toFixed(3);
  return v >= 1000 ? `${(v / 1000).toFixed(2)} s` : `${Math.round(v)} ms`;
}

function ratingOf(metric: MetricName, v: number | null): "good" | "needs-improvement" | "poor" | null {
  if (v === null) return null;
  const [good, ni] = THRESHOLDS[metric];
  if (v <= good) return "good";
  if (v <= ni) return "needs-improvement";
  return "poor";
}

const ratingClass: Record<string, string> = {
  good: "text-emerald-600 dark:text-emerald-400",
  "needs-improvement": "text-amber-600 dark:text-amber-400",
  poor: "text-rose-600 dark:text-rose-400",
};

const ratingDot: Record<string, string> = {
  good: "bg-emerald-500",
  "needs-improvement": "bg-amber-500",
  poor: "bg-rose-500",
};

function dayKey(iso: string): string {
  return iso.slice(0, 10);
}

/**
 * Admin panel: Real-User Monitoring for Core Web Vitals.
 * Shows p75 per metric, trend over time, pass/fail distribution,
 * device split and the slowest routes — all from live visitor samples.
 */
export const WebVitalsPanel = () => {
  const [rows, setRows] = useState<VitalRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState<number>(30);
  const [device, setDevice] = useState<"all" | "mobile" | "desktop">("all");
  const [trendMetric, setTrendMetric] = useState<MetricName>("LCP");

  const load = async (rangeDays: number) => {
    setLoading(true);
    setError(null);
    const since = new Date(Date.now() - rangeDays * 86_400_000).toISOString();
    const { data, error } = await supabase
      .from("web_vitals")
      .select("metric,value,rating,route,device_type,created_at")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(20000);
    if (error) setError(error.message);
    setRows((data as VitalRow[] | null) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    void load(days);
  }, [days]);

  const filtered = useMemo(
    () => (device === "all" ? rows : rows.filter(r => (r.device_type ?? "unknown") === device)),
    [rows, device],
  );

  const byMetric = useMemo(() => {
    const map = new Map<MetricName, number[]>();
    for (const m of METRICS) map.set(m, []);
    for (const r of filtered) {
      const list = map.get(r.metric as MetricName);
      if (list) list.push(Number(r.value));
    }
    return map;
  }, [filtered]);

  const distribution = useMemo(() => {
    const map = new Map<MetricName, { good: number; ni: number; poor: number }>();
    for (const m of METRICS) map.set(m, { good: 0, ni: 0, poor: 0 });
    for (const r of filtered) {
      const m = r.metric as MetricName;
      const bucket = map.get(m);
      if (!bucket) continue;
      const rating = (r.rating as string | null) ?? ratingOf(m, Number(r.value));
      if (rating === "good") bucket.good += 1;
      else if (rating === "needs-improvement") bucket.ni += 1;
      else if (rating === "poor") bucket.poor += 1;
    }
    return map;
  }, [filtered]);

  const trendData = useMemo(() => {
    const buckets = new Map<string, number[]>();
    for (const r of filtered) {
      if (r.metric !== trendMetric) continue;
      const k = dayKey(r.created_at);
      const arr = buckets.get(k) ?? [];
      arr.push(Number(r.value));
      buckets.set(k, arr);
    }
    const out: { day: string; p75: number | null; samples: number }[] = [];
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86_400_000);
      const k = d.toISOString().slice(0, 10);
      const vals = buckets.get(k) ?? [];
      out.push({ day: k.slice(5), p75: p75(vals), samples: vals.length });
    }
    return out;
  }, [filtered, trendMetric, days]);

  const slowestRoutes = useMemo(() => {
    const buckets = new Map<string, number[]>();
    for (const r of filtered) {
      if (r.metric !== trendMetric) continue;
      const arr = buckets.get(r.route) ?? [];
      arr.push(Number(r.value));
      buckets.set(r.route, arr);
    }
    return [...buckets.entries()]
      .filter(([, v]) => v.length >= 3)
      .map(([route, v]) => ({ route, p75: p75(v) as number, samples: v.length }))
      .sort((a, b) => b.p75 - a.p75)
      .slice(0, 12);
  }, [filtered, trendMetric]);

  const deviceCounts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const r of rows) {
      const d = r.device_type ?? "unknown";
      c[d] = (c[d] ?? 0) + 1;
    }
    return c;
  }, [rows]);

  const [thGood, thNi] = THRESHOLDS[trendMetric];

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-serif text-xl font-semibold">
          <Activity className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
          Real-user performance (Core Web Vitals)
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-md border border-border overflow-hidden">
            {RANGE_OPTIONS.map(d => (
              <button
                key={d}
                type="button"
                onClick={() => setDays(d)}
                className={`px-3 py-1 text-xs ${days === d ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                {d}d
              </button>
            ))}
          </div>
          <div className="flex rounded-md border border-border overflow-hidden">
            {(["all", "mobile", "desktop"] as const).map(d => (
              <button
                key={d}
                type="button"
                onClick={() => setDevice(d)}
                className={`px-3 py-1 text-xs capitalize ${device === d ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                {d}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => void load(days)}
            className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-1 text-xs hover:bg-muted"
          >
            <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} aria-hidden="true" />
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
          Could not load performance data: {error}
        </p>
      )}

      {!loading && filtered.length === 0 && !error && (
        <p className="rounded-md border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
          No samples yet for this range. Samples arrive from real visitors on the live site.
        </p>
      )}

      {/* Metric summary cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {METRICS.map(m => {
          const vals = byMetric.get(m) ?? [];
          const v = p75(vals);
          const rating = ratingOf(m, v);
          const dist = distribution.get(m)!;
          const total = dist.good + dist.ni + dist.poor;
          const goodPct = total ? Math.round((dist.good / total) * 100) : 0;
          return (
            <button
              key={m}
              type="button"
              onClick={() => setTrendMetric(m)}
              className={`rounded-lg border p-3 text-left transition ${
                trendMetric === m ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-muted-foreground">{m}</span>
                {rating && <span className={`h-2 w-2 rounded-full ${ratingDot[rating]}`} aria-hidden="true" />}
              </div>
              <div className={`mt-1 font-serif text-xl font-semibold tabular-nums ${rating ? ratingClass[rating] : ""}`}>
                {fmt(m, v)}
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground tabular-nums">
                p75 · {vals.length} samples
              </div>
              {total > 0 && (
                <div className="mt-2 flex h-1.5 overflow-hidden rounded-full bg-muted" title={`${goodPct}% good`}>
                  <span className="bg-emerald-500" style={{ width: `${(dist.good / total) * 100}%` }} />
                  <span className="bg-amber-500" style={{ width: `${(dist.ni / total) * 100}%` }} />
                  <span className="bg-rose-500" style={{ width: `${(dist.poor / total) * 100}%` }} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Trend chart */}
      <div className="rounded-lg border border-border p-4">
        <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-sm font-medium">{trendMetric} — daily p75 over {days} days</h3>
          <p className="text-xs text-muted-foreground">
            Good ≤ {fmt(trendMetric, thGood)} · Poor &gt; {fmt(trendMetric, thNi)}
          </p>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                interval="preserveStartEnd"
                minTickGap={24}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                width={52}
                tickFormatter={(v: number) => (trendMetric === "CLS" ? v.toFixed(2) : String(Math.round(v)))}
              />
              <RTooltip
                contentStyle={{
                  background: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  fontSize: 12,
                  color: "hsl(var(--popover-foreground))",
                }}
                formatter={(value: number | null) => [fmt(trendMetric, value ?? null), `${trendMetric} p75`]}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line
                type="monotone"
                dataKey="p75"
                name={`${trendMetric} p75`}
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Slowest routes + device split */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-border p-4 lg:col-span-2">
          <h3 className="mb-3 text-sm font-medium">Slowest pages by {trendMetric} (p75, ≥3 samples)</h3>
          {slowestRoutes.length === 0 ? (
            <p className="text-sm text-muted-foreground">Not enough samples yet.</p>
          ) : (
            <ul className="divide-y divide-border text-sm">
              {slowestRoutes.map(r => {
                const rating = ratingOf(trendMetric, r.p75);
                return (
                  <li key={r.route} className="flex items-center justify-between gap-3 py-2">
                    <span className="min-w-0 flex-1 truncate font-mono text-xs" title={r.route}>
                      {r.route}
                    </span>
                    <span className="text-[11px] text-muted-foreground tabular-nums">{r.samples}</span>
                    <span className={`w-24 text-right tabular-nums ${rating ? ratingClass[rating] : ""}`}>
                      {fmt(trendMetric, r.p75)}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="rounded-lg border border-border p-4">
          <h3 className="mb-3 text-sm font-medium">Samples by device</h3>
          <ul className="space-y-2 text-sm">
            {Object.entries(deviceCounts)
              .sort((a, b) => b[1] - a[1])
              .map(([d, n]) => (
                <li key={d} className="flex items-center justify-between">
                  <span className="capitalize text-muted-foreground">{d}</span>
                  <span className="tabular-nums">{n}</span>
                </li>
              ))}
            {Object.keys(deviceCounts).length === 0 && (
              <li className="text-muted-foreground">No samples yet.</li>
            )}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Total samples in range: <span className="tabular-nums">{rows.length}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WebVitalsPanel;
