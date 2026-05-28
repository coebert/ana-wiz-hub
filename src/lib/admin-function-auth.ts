import { supabase } from "@/integrations/supabase/client";

const EXPIRED_SESSION_MESSAGE = "Your admin session has expired. Please sign in again.";

export async function getAdminFunctionHeaders() {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw new Error(EXPIRED_SESSION_MESSAGE);
  }

  if (session?.access_token) {
    return { Authorization: `Bearer ${session.access_token}` };
  }

  const {
    data: refreshed,
    error: refreshError,
  } = await supabase.auth.refreshSession();

  if (refreshError || !refreshed.session?.access_token) {
    throw new Error(EXPIRED_SESSION_MESSAGE);
  }

  return { Authorization: `Bearer ${refreshed.session.access_token}` };
}