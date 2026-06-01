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
  };

  useEffect(() => {
    let cancelled = false;

    const applySession = async (nextSession: Session | null) => {
      if (cancelled) return;
      setSession(nextSession);
      setUser(nextSession?.user ?? null);

      if (!nextSession?.user) {
        setIsAdmin(false);
        resolvedAdminForUserRef.current = null;
        if (!cancelled) setLoading(false);
        return;
      }

      // Only resolve admin role when the signed-in user actually changes.
      // TOKEN_REFRESHED / periodic refresh events should NOT re-check
      // (avoids flipping isAdmin to false on a transient RPC blip).
      if (resolvedAdminForUserRef.current !== nextSession.user.id) {
        // Mark loading so RequireAdmin shows "Checking access…" instead of
        // briefly rendering "Access denied" with stale isAdmin=false while
        // the has_role RPC resolves after a fresh sign-in.
        if (!cancelled) setLoading(true);
        await checkAdmin(nextSession.user.id);
      }
      if (!cancelled) setLoading(false);
    };

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
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    resolvedAdminForUserRef.current = null;
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
