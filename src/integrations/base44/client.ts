import type { Base44Client } from "@base44/sdk";

/**
 * Lazily created Base44 client for the staged admin session.
 *
 * The SDK is imported on demand so the learner-facing bundle does not carry it
 * while the Base44 path is switched off. Analytics is disabled: this app has no
 * cookie-consent banner, and a migration probe must not start sending usage
 * telemetry to a second backend.
 */
let pending: { appId: string; client: Promise<Base44Client> } | null = null;

export function getBase44Client(appId: string): Promise<Base44Client> {
  if (!appId) {
    return Promise.reject(new Error("Base44 app id is not configured"));
  }
  if (!pending || pending.appId !== appId) {
    const client = import("@base44/sdk").then(({ createClient }) =>
      createClient({ appId, analytics: { enabled: false } })
    );
    pending = { appId, client };
    // Let a failed import be retried instead of caching the rejection forever.
    client.catch(() => {
      if (pending?.client === client) pending = null;
    });
  }
  return pending.client;
}

export function resetBase44ClientForTests(): void {
  pending = null;
}
