import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Cache the admin flag per-user in localStorage so reloads are instant
// and resilient to transient RPC failures. The cache is keyed by user id,
// so it is invalidated automatically if a different user signs in.
const ADMIN_CACHE_KEY = "ac.adminFor";

const readAdminCache = (): { userId: string; isAdmin: boolean } | null => {
  try {
    const raw = localStorage.getItem(ADMIN_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.userId === "string" && typeof parsed.isAdmin === "boolean") {
      return parsed;
    }
  } catch {
    /* ignore */
  }
  return null;
};

const writeAdminCache = (userId: string, isAdmin: boolean) => {
  try {
    localStorage.setItem(ADMIN_CACHE_KEY, JSON.stringify({ userId, isAdmin }));
  } catch {
    /* ignore */
  }
};

const clearAdminCache = () => {
  try {
    localStorage.removeItem(ADMIN_CACHE_KEY);
  } catch {
    /* ignore */
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  // Track the user id whose admin status we last resolved so we don't
  // re-issue the RPC on every TOKEN_REFRESHED (which fires on tab focus
  // and periodic refresh). A transient RPC failure there would otherwise
  // flip isAdmin → false and lock the user out mid-session.
  const resolvedAdminForUserRef = useRef<string | null>(null);

  const checkAdmin = async (userId: string) => {
    const { data, error } = await supabase.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });
    if (error) {
      // Network / transient error — DO NOT demote an already-admin user.
      // Leave previous isAdmin value untouched; we'll retry on next sign-in.
      return;
    }
    setIsAdmin(!!data);
    resolvedAdminForUserRef.current = userId;
    writeAdminCache(userId, !!data);
  };

  // Stable ref to the current applySession so `signIn` can eagerly commit
  // the new session BEFORE returning to the caller. Without this, callers
  // that navigate() immediately after signIn (e.g. AdminLogin) would mount
  // guarded pages while user/isAdmin are still stale — causing the page to
  // bounce back to /admin/login and appear to "spontaneously log out".
  const applySessionRef = useRef<(s: Session | null) => Promise<void>>(
    async () => {},
  );

  useEffect(() => {
    let cancelled = false;

    const applySession = async (nextSession: Session | null) => {
      if (cancelled) return;

      const nextUser = nextSession?.user ?? null;
      const needsAdminResolve =
        !!nextUser && resolvedAdminForUserRef.current !== nextUser.id;

      // Hydrate isAdmin from per-user cache before the RPC resolves so a
      // returning admin sees no "Checking access…" flash and no "Access
      // denied" flicker on reload or tab focus.
      if (nextUser && resolvedAdminForUserRef.current !== nextUser.id) {
        const cached = readAdminCache();
        if (cached && cached.userId === nextUser.id) {
          setIsAdmin(cached.isAdmin);
          resolvedAdminForUserRef.current = nextUser.id;
        }
      }

      const stillNeedsResolve =
        !!nextUser && resolvedAdminForUserRef.current !== nextUser.id;

      // CRITICAL: set loading=true BEFORE committing the new user, so
      // RequireAdmin never observes a (user, !isAdmin, !loading) tuple
      // between the user-state render and the has_role RPC resolving.
      if (stillNeedsResolve && !cancelled) setLoading(true);

      setSession(nextSession);
      setUser(nextUser);

      if (!nextUser) {
        setIsAdmin(false);
        resolvedAdminForUserRef.current = null;
        clearAdminCache();
        if (!cancelled) setLoading(false);
        return;
      }

      // Always re-verify in the background so a revoked admin is eventually
      // demoted — but don't gate the UI on it when we already have a cache hit.
      if (needsAdminResolve) {
        await checkAdmin(nextUser.id);
      }
      if (!cancelled) setLoading(false);
    };

    applySessionRef.current = applySession;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        // Defer to avoid deadlocks inside the auth callback.
        setTimeout(() => applySession(nextSession), 0);
      }
    );

    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      applySession(initialSession);
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    // Pre-set loading so any guarded page that mounts between signIn
    // resolving and the deferred onAuthStateChange handler firing will
    // wait instead of bouncing the user back to /admin/login.
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setLoading(false);
      return { error: error.message };
    }
    // Eagerly commit the fresh session so context reflects the signed-in
    // user synchronously — before the caller navigates to a protected route.
    await applySessionRef.current(data.session ?? null);
    return { error: null };
  };

  const signOut = async () => {
    // Best-effort revoke the Supabase session. Swallow errors so a network
    // blip can't strand the user in a half-signed-out state — we always
    // clear local caches + reload below.
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn("[auth] supabase.signOut failed, clearing locally", e);
    }

    setSession(null);
    setUser(null);
    setIsAdmin(false);
    resolvedAdminForUserRef.current = null;
    clearAdminCache();

    // Purge per-user progress caches so the next account (e.g. a different
    // Apple ID) does NOT union-merge the previous user's local ticks into
    // their cloud rows on first sign-in.
    try {
      const KEYS = [
        "anaesthesia-core-progress",
        "anaesthesia-core-subsection-progress",
        "anaesthesia-core-recent-topics",
      ];
      for (const k of KEYS) localStorage.removeItem(k);
      // Drop every "…-cloud-migrated:<userId>" flag so a returning user
      // re-hydrates cleanly from the cloud on next sign-in.
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (key && key.includes("-cloud-migrated:")) localStorage.removeItem(key);
      }
      window.dispatchEvent(new CustomEvent("recent-topics-updated"));
    } catch {
      /* ignore quota / access errors */
    }

    // Hard reload to the landing page so every in-memory context
    // (ProgressContext, SubsectionProgressContext, recent topics) reboots
    // from the now-empty localStorage — no stale sets can leak across users.
    if (typeof window !== "undefined") {
      window.location.assign("/");
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
