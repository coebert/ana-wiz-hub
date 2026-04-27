import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FlaskConical, Heart, Atom, Search, Stethoscope, Activity, ClipboardList, HandHeart, Network, BarChart3, Headphones, Mic, Pill } from "lucide-react";
import brainLogo from "/brain-logo.png";
import { SearchDialog } from "@/components/SearchDialog";
import { useExamFilter } from "@/contexts/ExamFilterContext";
import { Exam, ExamTag } from "@/data/curriculum";

const navItems = [
  { label: "Physics", path: "/physics", icon: Atom, color: "text-physics" },
  { label: "Physiology", path: "/physiology", icon: Heart, color: "text-physiology" },
  { label: "Pharmacology", path: "/pharmacology", icon: FlaskConical, color: "text-pharmacology" },
  { label: "Clinical", path: "/clinical", icon: Stethoscope, color: "text-clinical" },
  { label: "ICU", path: "/intensive-care", icon: Activity, color: "text-icu" },
  { label: "Periop", path: "/perioperative", icon: ClipboardList, color: "text-perioperative" },
  { label: "Drugs", path: "/drugs", icon: Pill, color: "text-drugs" },
  { label: "Map", path: "/map", icon: Network, color: "text-primary" },
  { label: "Progress", path: "/progress", icon: BarChart3, color: "text-accent" },
  { label: "Podcasts", path: "/podcasts", icon: Headphones, color: "text-primary" },
  { label: "Viva", path: "/viva", icon: Mic, color: "text-accent" },
];

const examFilters: { label: string; value: ExamTag | null }[] = [
  { label: "All", value: null },
  { label: "Primary", value: Exam.PRIMARY },
  { label: "Final", value: Exam.FINAL },
  { label: "FFICM", value: Exam.FFICM },
  { label: "EDIC", value: Exam.EDIC },
];

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const { activeExam, setActiveExam } = useExamFilter();

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

  useEffect(() => {
    if (location.pathname === "/" && location.hash === "#support") {
      const el = document.getElementById("support");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.pathname, location.hash]);

  const goToSupport = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      document.getElementById("support")?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", "/#support");
    } else {
      navigate("/#support");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={brainLogo} alt="AnaesthesiaCore" className="h-6 w-6" />
            <span className="text-base font-semibold text-foreground hidden lg:inline">
              AnaesthesiaCore
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className={`h-3.5 w-3.5 ${isActive ? item.color : ""}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Exam filter chips */}
            <div className="hidden sm:flex items-center gap-0.5 mr-1">
              {examFilters.map((f) => (
                <button
                  key={f.label}
                  onClick={() => setActiveExam(f.value)}
                  className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                    activeExam === f.value
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <a
              href="/#support"
              onClick={goToSupport}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Support this app"
            >
              <HandHeart className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Support</span>
            </a>

            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Search className="h-3.5 w-3.5" />
              <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono text-[10px]">
                ⌘K
              </kbd>
            </button>

            {/* Mobile nav */}
            <nav className="flex md:hidden items-center gap-0.5 overflow-x-auto">
              {navItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                      isActive ? "bg-secondary" : "hover:bg-muted"
                    }`}
                  >
                    <item.icon className={`h-4 w-4 ${isActive ? item.color : "text-muted-foreground"}`} />
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Mobile exam filter */}
        <div className="flex sm:hidden items-center gap-1 px-4 pb-2 overflow-x-auto">
          {examFilters.map((f) => (
            <button
              key={f.label}
              onClick={() => setActiveExam(f.value)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors whitespace-nowrap ${
                activeExam === f.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
