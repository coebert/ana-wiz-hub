/**
 * Server-side authorization for the staged Base44 admin session.
 *
 * The browser never decides whether a session is an admin session. This guard
 * runs inside a Base44 backend function, resolves the caller from the request
 * token with the official SDK, and compares the *server-side* role record with
 * an explicitly configured role name. Client-supplied roles, e-mail addresses,
 * user-id lists and shared codes are ignored on purpose.
 *
 * Kept free of Deno and SDK imports so the same module is unit-testable with
 * Vitest (`src/test/base44-admin-guard.test.ts`) and reusable from any future
 * Base44 admin function.
 */

/** The subset of a Base44 user record this guard is allowed to trust. */
export type SessionUser = {
  id: string;
  role?: string | null;
  disabled?: boolean | null;
};

export type AdminSessionReason =
  "unauthenticated" | "not_admin" | "disabled" | "not_configured" | "method_not_allowed";

export type AdminSessionBody =
  | { authenticated: true; isAdmin: true; userId: string }
  | {
      authenticated: true;
      isAdmin: false;
      reason: Exclude<
        AdminSessionReason,
        "unauthenticated" | "not_configured" | "method_not_allowed"
      >;
    }
  | { authenticated: false; isAdmin: false; reason: AdminSessionReason };

export type AdminSessionDeps = {
  /** Resolves the caller from the request's Base44 token; throws when invalid. */
  me: () => Promise<SessionUser | null>;
  /** Role name that grants admin, read from server configuration. */
  adminRole: string | null | undefined;
};

const NO_STORE = { "Cache-Control": "no-store" } as const;

const json = (status: number, body: AdminSessionBody) =>
  Response.json(body, { status, headers: NO_STORE });

/**
 * Resolves one admin-session probe.
 *
 * - `200 { isAdmin: true }` — signed in and the server-side role grants admin.
 * - `200 { isAdmin: false }` — signed in without admin authority (a normal
 *   "access denied" state for the UI, not an error).
 * - `401` — no usable session; the caller must sign in.
 * - `403` — the account is disabled.
 * - `503` — the deployment has not configured an admin role; admin is denied
 *   for everyone rather than falling back to a hard-coded role name.
 */
export async function resolveAdminSession(
  request: Request,
  deps: AdminSessionDeps
): Promise<Response> {
  if (request.method !== "POST") {
    return json(405, {
      authenticated: false,
      isAdmin: false,
      reason: "method_not_allowed",
    });
  }

  const role = deps.adminRole?.trim();
  if (!role) {
    return json(503, {
      authenticated: false,
      isAdmin: false,
      reason: "not_configured",
    });
  }

  const authorization = request.headers.get("Authorization") ?? "";
  if (!/^Bearer\s+\S+$/i.test(authorization.trim())) {
    return json(401, {
      authenticated: false,
      isAdmin: false,
      reason: "unauthenticated",
    });
  }

  let user: SessionUser | null;
  try {
    user = await deps.me();
  } catch {
    // Expired, revoked or forged token — indistinguishable to the caller.
    return json(401, {
      authenticated: false,
      isAdmin: false,
      reason: "unauthenticated",
    });
  }

  if (!user || typeof user.id !== "string" || user.id.length === 0) {
    return json(401, {
      authenticated: false,
      isAdmin: false,
      reason: "unauthenticated",
    });
  }

  if (user.disabled === true) {
    return json(403, {
      authenticated: true,
      isAdmin: false,
      reason: "disabled",
    });
  }

  if (user.role !== role) {
    return json(200, {
      authenticated: true,
      isAdmin: false,
      reason: "not_admin",
    });
  }

  return json(200, { authenticated: true, isAdmin: true, userId: user.id });
}
