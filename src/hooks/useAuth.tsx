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

      const nextUser = nextSession?.user ?? null;
      const needsAdminResolve =
        !!nextUser && resolvedAdminForUserRef.current !== nextUser.id;

      // CRITICAL: set loading=true BEFORE committing the new user, so
      // RequireAdmin never observes a (user, !isAdmin, !loading) tuple
      // between the user-state render and the has_role RPC resolving.
      // Without this, React renders the user change first and flashes
      // "Access denied" for one frame after sign-in.
      if (needsAdminResolve && !cancelled) setLoading(true);

      setSession(nextSession);
      setUser(nextUser);

      if (!nextUser) {
        setIsAdmin(false);
        resolvedAdminForUserRef.current = null;
        if (!cancelled) setLoading(false);
        return;
      }

      if (needsAdminResolve) {
        await checkAdmin(nextUser.id);
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
