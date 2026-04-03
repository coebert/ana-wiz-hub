import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, FlaskConical, Heart, Atom, Search } from "lucide-react";
import { SearchDialog } from "@/components/SearchDialog";

const navItems = [
  { label: "Physics", path: "/physics", icon: Atom, color: "text-physics" },
  { label: "Physiology", path: "/physiology", icon: Heart, color: "text-physiology" },
  { label: "Pharmacology", path: "/pharmacology", icon: FlaskConical, color: "text-pharmacology" },
];

export const Header = () => {
  const location = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setSearchOpen(true);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-foreground">
              AnaesthesiaCore
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className={`h-4 w-4 ${isActive ? item.color : ""}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono text-[10px]">
                ⌘K
              </kbd>
            </button>

            {/* Mobile nav */}
            <nav className="flex md:hidden items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`p-2 rounded-lg transition-colors ${
                      isActive ? "bg-secondary" : "hover:bg-muted"
                    }`}
                  >
                    <item.icon className={`h-5 w-5 ${isActive ? item.color : "text-muted-foreground"}`} />
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
