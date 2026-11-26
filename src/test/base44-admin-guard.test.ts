import { describe, expect, it, vi } from "vitest";
import { resolveAdminSession, type SessionUser } from "../../base44/shared/admin-guard.ts";

const ADMIN: SessionUser = { id: "user-admin", role: "admin" };
const MEMBER: SessionUser = { id: "user-member", role: "user" };

function probe({
  method = "POST",
  authorization = "Bearer test-token",
  body,
}: { method?: string; authorization?: string | null; body?: unknown } = {}) {
  const headers = new Headers({ "Content-Type": "application/json" });
  if (authorization) headers.set("Authorization", authorization);
  return new Request("https://ana-core-link.base44.app/api/adminSession", {
    method,
    headers,
    body: method === "GET" || body === undefined ? undefined : JSON.stringify(body),
  });
}

function deps(user: SessionUser | null, adminRole: string | null | undefined = "admin") {
  return { me: vi.fn(async () => user), adminRole };
}

describe("Base44 admin session guard", () => {
  it("grants admin only when the server-side role matches the configured role", async () => {
    const response = await resolveAdminSession(probe(), deps(ADMIN));
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      authenticated: true,
      isAdmin: true,
      userId: "user-admin",
    });
    expect(response.headers.get("Cache-Control")).toBe("no-store");
  });

  it("refuses admin authority to a signed-in non-admin", async () => {
    const response = await resolveAdminSession(probe(), deps(MEMBER));
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      authenticated: true,
      isAdmin: false,
      reason: "not_admin",
    });
  });

  it("does not fall back to a default role name when the deployment is unconfigured", async () => {
    const configured = deps(ADMIN, null);
    const response = await resolveAdminSession(probe(), configured);
    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({
      isAdmin: false,
      reason: "not_configured",
    });
    expect(configured.me).not.toHaveBeenCalled();

    const missing = { me: vi.fn(async () => ADMIN), adminRole: undefined };
    expect((await resolveAdminSession(probe(), missing)).status).toBe(503);
    expect(missing.me).not.toHaveBeenCalled();

    const blank = deps(ADMIN, "   ");
    expect((await resolveAdminSession(probe(), blank)).status).toBe(503);
    expect(blank.me).not.toHaveBeenCalled();
  });

  it("rejects a role that only matches when the configured name is different", async () => {
    const response = await resolveAdminSession(probe(), deps(ADMIN, "clinician-admin"));
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ isAdmin: false, reason: "not_admin" });
  });

  it("treats a missing or malformed bearer token as signed out without calling the backend", async () => {
    for (const authorization of [null, "", "Basic abc", "Bearer", "Bearer   "]) {
      const configured = deps(ADMIN);
      const response = await resolveAdminSession(probe({ authorization }), configured);
      expect(response.status).toBe(401);
      await expect(response.json()).resolves.toMatchObject({
        authenticated: false,
        isAdmin: false,
        reason: "unauthenticated",
      });
      expect(configured.me).not.toHaveBeenCalled();
    }
  });

  it("treats an expired or forged token as signed out", async () => {
    const response = await resolveAdminSession(probe(), {
      me: vi.fn(async () => {
        throw new Error("401 Unauthorized");
      }),
      adminRole: "admin",
    });
    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toMatchObject({ reason: "unauthenticated" });
  });

  it("treats an empty user record as signed out", async () => {
    const response = await resolveAdminSession(probe(), deps(null));
    expect(response.status).toBe(401);
    const anonymous = await resolveAdminSession(probe(), deps({ id: "" }));
    expect(anonymous.status).toBe(401);
  });

  it("refuses a disabled account even when its role would grant admin", async () => {
    const response = await resolveAdminSession(
      probe(),
      deps({ id: "user-disabled", role: "admin", disabled: true })
    );
    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toMatchObject({
      authenticated: true,
      isAdmin: false,
      reason: "disabled",
    });
  });

  it("ignores roles supplied by the caller", async () => {
    const request = probe({
      authorization: "Bearer test-token",
      body: { role: "admin", isAdmin: true, userId: "user-member" },
    });
    request.headers.set("x-base44-role", "admin");
    const response = await resolveAdminSession(request, deps(MEMBER));
    await expect(response.json()).resolves.toMatchObject({ isAdmin: false, reason: "not_admin" });
  });

  it("only answers POST", async () => {
    const response = await resolveAdminSession(
      probe({ method: "GET", authorization: null }),
      deps(ADMIN)
    );
    expect(response.status).toBe(405);
    await expect(response.json()).resolves.toMatchObject({ reason: "method_not_allowed" });
  });
});
