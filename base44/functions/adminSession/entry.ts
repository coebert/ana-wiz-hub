import { createClientFromRequest } from "npm:@base44/sdk@0.8.52";
import { resolveAdminSession } from "../../shared/admin-guard.ts";

/**
 * Staged Base44 admin-session probe.
 *
 * The caller's identity comes only from the Base44 token on the request, and
 * admin authority comes only from the role the Base44 backend holds for that
 * user. The granting role name is deployment configuration
 * (`BASE44_ADMIN_ROLE`); when it is unset every caller is refused.
 */
export default function adminSession(request: Request): Promise<Response> {
  const base44 = createClientFromRequest(request);
  return resolveAdminSession(request, {
    me: () => base44.auth.me(),
    adminRole: Deno.env.get("BASE44_ADMIN_ROLE"),
  });
}
