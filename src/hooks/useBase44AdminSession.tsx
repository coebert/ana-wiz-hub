import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getBase44Client } from "@/integrations/base44/client";
import { readBase44AdminSessionConfig } from "@/integrations/base44/config";
import {
  resolveBase44AdminSession,
  type Base44AdminSessionResult,
} from "@/integrations/base44/admin-session";

/**
 * Staged, opt-in Base44 admin session.
 *
 * When `VITE_BASE44_ADMIN_SESSION=1` and `VITE_BASE44_APP_ID` is set, admin
 * routes resolve their session and role through the Base44 backend function
 * `adminSession` instead of Supabase. With the flag off this provider does
 * nothing and every existing Supabase path is untouched.
 *
 * Only the admin gate reads this context. Learner accounts, progress and all
 * clinical content keep using their current backend until the data migration
 * has been validated.
 */
export type Base44AdminSessionStatus =
  "disabled" | "checking" | "admin" | "denied" | "signedOut" | "error";

type Base44AdminSessionValue = {
  enabled: boolean;
  status: Base44AdminSessionStatus;
  userId: string | null;
  error: string | null;
  refresh: () => void;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => void;
};

const Base44AdminSessionContext = createContext<Base44AdminSessionValue | undefined>(undefined);

const NOT_CONFIGURED = "Base44 admin sessions are enabled but VITE_BASE44_APP_ID is missing.";

const errorMessage = (error: unknown, fallback: string) =>
  error instanceof Error && error.message ? error.message : fallback;

export const Base44AdminSessionProvider = ({ children }: { children: ReactNode }) => {
  const config = useMemo(() => readBase44AdminSessionConfig(), []);
  const enabled = config.enabled;

  const [status, setStatus] = useState<Base44AdminSessionStatus>(enabled ? "checking" : "disabled");
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Only the newest resolve may commit; a slow earlier probe must not overwrite
  // the result of a later sign-in or retry.
  const generation = useRef(0);

  const apply = useCallback((result: Base44AdminSessionResult) => {
    setStatus(result.state);
    setUserId(result.userId ?? null);
    setError(result.message ?? null);
  }, []);

  const resolve = useCallback(async () => {
    if (!enabled) return;
    const run = ++generation.current;
    setStatus("checking");
    setError(null);

    if (!config.appId) {
      if (run === generation.current) {
        setStatus("error");
        setUserId(null);
        setError(NOT_CONFIGURED);
      }
      return;
    }

    let result: Base44AdminSessionResult;
    try {
      const client = await getBase44Client(config.appId);
      result = await resolveBase44AdminSession({
        invoke: (name, payload) => client.functions.invoke(name, payload),
      });
    } catch (cause) {
      result = {
        state: "error",
        message: errorMessage(cause, "Could not reach the Base44 admin session."),
      };
    }

    if (run === generation.current) apply(result);
  }, [enabled, config.appId, apply]);

  useEffect(() => {
    void resolve();
  }, [resolve]);

  const signIn = useCallback(
    async (email: string, password: string): Promise<{ error: string | null }> => {
      if (!enabled) return { error: "Base44 admin sessions are disabled." };
      if (!config.appId) return { error: NOT_CONFIGURED };
      try {
        const client = await getBase44Client(config.appId);
        await client.auth.loginViaEmailPassword(email, password);
      } catch (cause) {
        return { error: errorMessage(cause, "Sign in failed.") };
      }
      await resolve();
      return { error: null };
    },
    [enabled, config.appId, resolve]
  );

  const signOut = useCallback(() => {
    if (!enabled || !config.appId) return;
    void import("@base44/sdk").then(({ removeAccessToken }) => {
      removeAccessToken({});
      // Full reload so no in-memory SDK state survives the sign-out.
      window.location.assign("/admin/login");
    });
  }, [enabled, config.appId]);

  const value = useMemo<Base44AdminSessionValue>(
    () => ({ enabled, status, userId, error, refresh: () => void resolve(), signIn, signOut }),
    [enabled, status, userId, error, resolve, signIn, signOut]
  );

  return (
    <Base44AdminSessionContext.Provider value={value}>
      {children}
    </Base44AdminSessionContext.Provider>
  );
};

export const useBase44AdminSession = () => {
  const ctx = useContext(Base44AdminSessionContext);
  if (!ctx) {
    throw new Error("useBase44AdminSession must be used within Base44AdminSessionProvider");
  }
  return ctx;
};
