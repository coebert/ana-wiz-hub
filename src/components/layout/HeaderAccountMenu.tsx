import { Link } from "react-router-dom";
import { LogIn, LogOut, User as UserIcon, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

/**
 * Header account chip. Shows a compact "Sign in" link when anonymous and an
 * account dropdown (email + sign-out) when signed in. Kept independent of
 * the admin flow — admins still use /admin/login.
 */
export const HeaderAccountMenu = () => {
  const { user, loading, isAdmin, signOut } = useAuth();

  if (loading) {
    return <div className="w-8 h-8" aria-hidden />;
  }

  if (!user) {
    return (
      <Link
        to="/login"
        className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        title="Sign in to sync progress"
      >
        <LogIn className="h-3.5 w-3.5" aria-hidden />
        <span>Sign in</span>
      </Link>
    );
  }

  const label = user.email ?? "Account";
  const initial = (user.email ?? "?").slice(0, 1).toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Account menu"
          title={label}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/15 transition-colors"
        >
          {initial}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="text-xs font-medium text-muted-foreground">Signed in as</span>
          <span className="text-sm truncate">{label}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/progress" className="cursor-pointer">
            <UserIcon className="h-4 w-4 mr-2" aria-hidden /> My progress
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            void signOut();
          }}
          className="cursor-pointer"
        >
          <LogOut className="h-4 w-4 mr-2" aria-hidden /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
