/**
 * Client-side boundary for the staged Base44 admin session.
 *
 * This module never decides admin authority. It asks the Base44 backend
 * function `adminSession` and maps the *server's* answer into a UI state:
 *
 *   admin     — signed in, server confirmed the admin role
 *   denied    — signed in, server refused admin authority
 *   signedOut — no usable Base44 session
 *   error     — the server could not be reached or answered ambiguously
 *
 * A client-side `auth.me()` role, a cached flag, a query parameter or any other
 * browser value is deliberately not consulted. `error` is always treated as
 * "not admin" by callers (fail closed).
 */
export const ADMIN_SESSION_FUNCTION = "adminSession";

export type Base44AdminSessionState = "admin" | "denied" | "signedOut" | "error";

export type Base44AdminSessionResult = {
  state: Base44AdminSessionState;
  userId?: string;
  message?: string;
};

export type AdminSessionTransport = {
  invoke: (
    name: string,
    payload: Record<string, unknown>
  ) => Promise<{ data?: unknown; status?: number }>;
};

const UNVERIFIED = "Could not verify admin access.";

export async function resolveBase44AdminSession(
  transport: AdminSessionTransport
): Promise<Base44AdminSessionResult> {
  let response: { data?: unknown; status?: number };
  try {
    response = await transport.invoke(ADMIN_SESSION_FUNCTION, {});
  } catch (error) {
    return fromError(error);
  }
  return readAdminSessionBody(response?.data);
}

export function readAdminSessionBody(body: unknown): Base44AdminSessionResult {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { state: "error", message: UNVERIFIED };
  }
  const record = body as Record<string, unknown>;

  if (record.authenticated === false) return { state: "signedOut" };
  if (record.authenticated !== true) return { state: "error", message: UNVERIFIED };

  if (record.isAdmin === true) {
    return typeof record.userId === "string" && record.userId.length > 0
      ? { state: "admin", userId: record.userId }
      : { state: "error", message: UNVERIFIED };
  }
  if (record.isAdmin === false) return { state: "denied" };

  return { state: "error", message: UNVERIFIED };
}

function fromError(error: unknown): Base44AdminSessionResult {
  const status = statusOf(error);
  if (status === 401) return { state: "signedOut" };
  if (status === 403) return { state: "denied" };
  return { state: "error", message: UNVERIFIED };
}

function statusOf(error: unknown): number | undefined {
  if (!error || typeof error !== "object") return undefined;
  const candidate = error as {
    status?: unknown;
    response?: { status?: unknown };
  };
  if (typeof candidate.status === "number") return candidate.status;
  if (typeof candidate.response?.status === "number") return candidate.response.status;
  return undefined;
}
