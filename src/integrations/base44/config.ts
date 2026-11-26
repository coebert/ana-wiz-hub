/**
 * Opt-in switch for the staged Base44 admin session.
 *
 * Production stays on the existing Supabase auth path until both the account
 * migration and the role migration have been validated. Nothing here enables
 * the Base44 path by accident: the flag must be exactly "1" and an app id must
 * be configured, otherwise the admin routes keep using Supabase unchanged.
 */
export const BASE44_ADMIN_SESSION_ENV = "VITE_BASE44_ADMIN_SESSION";
export const BASE44_APP_ID_ENV = "VITE_BASE44_APP_ID";

export type Base44AdminSessionConfig = {
  enabled: boolean;
  appId: string;
};

export function readBase44AdminSessionConfig(
  env: Record<string, string | undefined> = import.meta.env as Record<string, string | undefined>
): Base44AdminSessionConfig {
  return {
    enabled: env[BASE44_ADMIN_SESSION_ENV] === "1",
    appId: (env[BASE44_APP_ID_ENV] ?? "").trim(),
  };
}
