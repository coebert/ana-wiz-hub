import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";
import { useBase44AdminSession } from "@/hooks/useBase44AdminSession";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { toast } from "sonner";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const base44AdminSession = useBase44AdminSession();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = base44AdminSession.enabled
      ? await base44AdminSession.signIn(email, password)
      : await signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error(error);
    } else {
      navigate("/admin");
    }
  };

  if (base44AdminSession.enabled && base44AdminSession.status === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Helmet>
        <title>Admin sign in – AnaesthesiaCore</title>
        <meta
          name="description"
          content="Restricted admin sign in for AnaesthesiaCore curriculum editors. Public learners do not need an account to revise."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-foreground">Admin Login</h1>
          <p className="text-sm text-muted-foreground">Sign in to access the admin dashboard</p>
          {base44AdminSession.enabled && (
            <p className="text-xs text-muted-foreground">
              Staged Base44 admin session. Learner accounts and production sign-in are unchanged.
            </p>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
