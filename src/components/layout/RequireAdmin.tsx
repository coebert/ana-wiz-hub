import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const RequireAdmin = ({ children }: { children: ReactNode }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-sm text-muted-foreground"
        aria-live="polite"
      >
        Checking access…
      </div>
    );
  }

  if (!user) return <Navigate to="/admin/login" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center space-y-3">
        <h1 className="text-2xl font-serif font-bold text-foreground">Access denied</h1>
        <p className="text-sm text-muted-foreground max-w-sm">
          Your account does not have administrator privileges.
        </p>
      </div>
    );
  }

  return <>{children}</>;
};

export default RequireAdmin;
