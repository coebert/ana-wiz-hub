// Real-User Monitoring (RUM) reporter for Core Web Vitals.
//
// Buffers samples and flushes them in a single batched sendBeacon when the
// page is hidden/unloaded (or after a short idle delay), so samples are not
// lost on fast navigations. Gated to the production hosts so we don't
// pollute the dataset with preview or localhost traffic. Errors are
// swallowed — monitoring must never break the app.

import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from "web-vitals";

const PRODUCTION_HOSTS = new Set<string>([
  "anaesthesiacore.app",
  "www.anaesthesiacore.app",
  "ana-wiz-hub.lovable.app",
]);

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const RELEASE_SHA =
  (import.meta.env.VITE_RELEASE_SHA as string | undefined) ??
  (import.meta.env.VITE_COMMIT_SHA as string | undefined) ??
  null;

const ENDPOINT = SUPABASE_URL ? `${SUPABASE_URL}/functions/v1/ingest-web-vitals` : null;

// Edge function accepts at most 20 samples per request.
const MAX_BATCH = 20;
const IDLE_FLUSH_MS = 5000;

type Sample = {
  metric: string;
  value: number;
  rating?: string | null;
  navigation_type?: string | null;
  route: string;
  release_sha: string | null;
  device_type: string;
  connection: string | null;
  session_id: string;
};

let queue: Sample[] = [];
let idleTimer: ReturnType<typeof setTimeout> | null = null;

function deviceType(): "mobile" | "tablet" | "desktop" | "unknown" {
  const ua = navigator.userAgent || "";
  if (/Tablet|iPad/i.test(ua)) return "tablet";
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) return "mobile";
  if (ua) return "desktop";
  return "unknown";
}

function connection(): string | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = (navigator as any).connection;
  return c?.effectiveType ?? null;
}

function sessionId(): string {
  const key = "__wv_session__";
  try {
    let s = sessionStorage.getItem(key);
    if (!s) {
      s = crypto.randomUUID();
      sessionStorage.setItem(key, s);
    }
    return s;
  } catch {
    return "anonymous";
  }
}

function send(batch: Sample[]) {
  if (!ENDPOINT || batch.length === 0) return;
  const body = JSON.stringify(batch.length === 1 ? batch[0] : batch);
  try {
    const blob = new Blob([body], { type: "application/json" });
    if (navigator.sendBeacon?.(ENDPOINT, blob)) return;
  } catch {
    /* fall through to fetch */
  }
  try {
    void fetch(ENDPOINT, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* monitoring must never throw */
  }
}

function flush() {
  if (idleTimer) {
    clearTimeout(idleTimer);
    idleTimer = null;
  }
  if (queue.length === 0) return;
  const pending = queue;
  queue = [];
  for (let i = 0; i < pending.length; i += MAX_BATCH) {
    send(pending.slice(i, i + MAX_BATCH));
  }
}

function scheduleFlush() {
  if (queue.length >= MAX_BATCH) {
    flush();
    return;
  }
  if (idleTimer) clearTimeout(idleTimer);
  idleTimer = setTimeout(flush, IDLE_FLUSH_MS);
}

function report(metric: Metric) {
  if (!ENDPOINT) return;
  if (!Number.isFinite(metric.value) || metric.value < 0) return;
  queue.push({
    metric: metric.name,
    value: metric.name === "CLS" ? Number(metric.value.toFixed(4)) : Math.round(metric.value),
    rating: metric.rating,
    navigation_type: metric.navigationType,
    route: location.pathname,
    release_sha: RELEASE_SHA,
    device_type: deviceType(),
    connection: connection(),
    session_id: sessionId(),
  });
  scheduleFlush();
}

/**
 * Start the RUM reporter. Safe to call unconditionally — it opts out of
 * every non-production host (preview, localhost, iframes) internally.
 */
export function startWebVitalsReporting() {
  if (typeof window === "undefined") return;
  const host = window.location.hostname;
  if (!PRODUCTION_HOSTS.has(host)) return;
  // Skip when embedded in the Lovable editor preview iframe.
  try {
    if (window.self !== window.top) return;
  } catch {
    return;
  }

  onLCP(report);
  onCLS(report);
  onINP(report);
  onFCP(report);
  onTTFB(report);

  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.visibilityState === "hidden") flush();
    },
    { capture: true },
  );
  window.addEventListener("pagehide", flush, { capture: true });
}
