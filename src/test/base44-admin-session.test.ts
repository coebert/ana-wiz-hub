import { describe, expect, it, vi } from "vitest";
import {
  ADMIN_SESSION_FUNCTION,
  readAdminSessionBody,
  resolveBase44AdminSession,
} from "@/integrations/base44/admin-session";

const transport = (
  options: {
    invoke?: () => Promise<{ data?: unknown; status?: number }>;
  } = {}
) => ({
  invoke: vi.fn(options.invoke ?? (async () => ({ data: {} }))),
});

describe("Base44 admin session boundary", () => {
  it("asks the server function and accepts a confirmed admin session", async () => {
    const api = transport({
      invoke: async () => ({
        data: { authenticated: true, isAdmin: true, userId: "user-admin" },
        status: 200,
      }),
    });
    await expect(resolveBase44AdminSession(api)).resolves.toEqual({
      state: "admin",
      userId: "user-admin",
    });
    expect(api.invoke).toHaveBeenCalledWith(ADMIN_SESSION_FUNCTION, {});
  });

  it("reports denied for a signed-in non-admin", async () => {
    const api = transport({
      invoke: async () => ({
        data: { authenticated: true, isAdmin: false, reason: "not_admin" },
        status: 200,
      }),
    });
    await expect(resolveBase44AdminSession(api)).resolves.toEqual({ state: "denied" });
  });

  it("never grants admin from an incomplete or wrongly typed response", async () => {
    for (const data of [
      { isAdmin: true },
      { isAdmin: true, userId: "user-admin" },
      { authenticated: true, isAdmin: "true", userId: "user-admin" },
      { authenticated: true, isAdmin: 1, userId: "user-admin" },
      { authenticated: true, isAdmin: true },
      { authenticated: true, isAdmin: true, userId: "" },
      { authenticated: false, isAdmin: true, userId: "user-admin" },
      null,
      "admin",
      [],
    ]) {
      const result = readAdminSessionBody(data);
      expect(result.state).not.toBe("admin");
      expect(result.state === "admin" ? result.userId : null).toBeNull();
    }
  });

  it("maps HTTP failures to signed out, denied or an error", async () => {
    const failure = (status: number) =>
      transport({
        invoke: async () => {
          throw Object.assign(new Error("request failed"), { status });
        },
      });
    await expect(resolveBase44AdminSession(failure(401))).resolves.toEqual({ state: "signedOut" });
    await expect(resolveBase44AdminSession(failure(403))).resolves.toEqual({ state: "denied" });
    for (const status of [400, 404, 500, 503]) {
      await expect(resolveBase44AdminSession(failure(status))).resolves.toMatchObject({
        state: "error",
      });
    }
  });

  it("treats a network failure without a status as an error, not as admin", async () => {
    const api = transport({
      invoke: async () => {
        throw new Error("Network Error");
      },
    });
    await expect(resolveBase44AdminSession(api)).resolves.toMatchObject({ state: "error" });
  });

  it("reads the status from an axios-shaped error response", async () => {
    const api = transport({
      invoke: async () => {
        throw { response: { status: 401 } };
      },
    });
    await expect(resolveBase44AdminSession(api)).resolves.toEqual({ state: "signedOut" });
  });
});
