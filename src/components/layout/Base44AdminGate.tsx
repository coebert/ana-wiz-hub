import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useBase44AdminSession } from "@/hooks/useBase44AdminSession";
import { Button } from "@/components/ui/button";

/**
 * Admin gate for the staged Base44 session. Rendered only when the opt-in flag
 * is on; the Supabase gate in RequireAdmin stays the production default.
 *
 * Every state that is not a server-confirmed admin session fails closed.
 */
export const Base44AdminGate = ({ children }: { children: ReactNode }) => {
  const { status, error, refresh } = useBase44AdminSession();

  if (status === "checking") {
    return (
      <div
        className="min-h-screen flex items-center justify-center text-sm text-muted-foreground"
        aria-live="polite"
      >
        Checking access…
      </div>
    );
  }

  if (status === "signedOut" || status === "disabled") {
    return <Navigate to="/admin/login" replace />;
  }

  if (status === "denied") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center space-y-3">
        <h1 className="text-2xl font-serif font-bold text-foreground">Access denied</h1>
        <p className="text-sm text-muted-foreground max-w-sm">
          Your account does not have administrator privileges.
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center space-y-3">
        <h1 className="text-2xl font-serif font-bold text-foreground">
          Access could not be verified
        </h1>
        <p className="text-sm text-muted-foreground max-w-sm" role="status">
          {error ?? "Could not verify admin access."}
        </p>
        <Button variant="outline" onClick={refresh}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {children}
    </>
  );
};

export default Base44AdminGate;
