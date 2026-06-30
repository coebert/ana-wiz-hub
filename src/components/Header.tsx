import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FlaskConical, Heart, Atom, Search, Stethoscope, Activity, ClipboardList, HandHeart, Network, BarChart3, Headphones, Mic, Pill, GraduationCap, Calculator, Brain, BookOpen, Sparkles, Menu } from "lucide-react";
import brainLogo from "/brain-logo.webp";
import { SearchDialog } from "@/components/SearchDialog";
import { ReduceMotionToggle } from "@/components/ReduceMotionToggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UnitPreferenceMenu } from "@/components/UnitPreferenceMenu";
import { useExamFilter } from "@/contexts/ExamFilterContext";
import { Exam, ExamTag } from "@/data/curriculum";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { label: "Ask AI", path: "/ask", icon: Sparkles, color: "text-primary" },
  { label: "Physics", path: "/physics", icon: Atom, color: "text-physics" },
  { label: "Physiology", path: "/physiology", icon: Heart, color: "text-physiology" },
  { label: "Pharmacology", path: "/pharmacology", icon: FlaskConical, color: "text-pharmacology" },
  { label: "Clinical", path: "/clinical", icon: Stethoscope, color: "text-clinical" },
  { label: "ICU", path: "/intensive-care", icon: Activity, color: "text-icu" },
  { label: "Periop", path: "/perioperative", icon: ClipboardList, color: "text-perioperative" },
  { label: "Drugs", path: "/drugs", icon: Pill, color: "text-drugs" },
  { label: "Tools", path: "/tools", icon: Calculator, color: "text-primary" },
  { label: "Map", path: "/map", icon: Network, color: "text-primary" },
  { label: "Curriculum", path: "/curriculum", icon: GraduationCap, color: "text-primary" },
  { label: "Progress", path: "/progress", icon: BarChart3, color: "text-accent" },
  { label: "Review", path: "/review", icon: Brain, color: "text-primary" },
  { label: "Podcasts", path: "/podcasts", icon: Headphones, color: "text-primary" },
  { label: "Notes", path: "/notes", icon: BookOpen, color: "text-primary" },
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
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
        <div className="container mx-auto flex h-14 items-center justify-between gap-2 px-3 sm:px-4">
          {(() => {
            // From inside the app (any route other than the marketing landing
            // page) the logo should return users to the core disciplines hub
            // at /revise rather than the public landing page.
            const homeTarget = location.pathname === "/" ? "/" : "/revise";
            return (
              <Link to={homeTarget} className="flex items-center gap-2 shrink-0">
                <img src={brainLogo} alt="AnaesthesiaCore brain and pulse logo" width={24} height={24} decoding="async" className="h-6 w-6" />
                <span className="text-base font-semibold text-foreground hidden xl:inline whitespace-nowrap">
                  AnaesthesiaCore
                </span>
              </Link>
            );
          })()}

          {/* Desktop nav — icons only on all desktop sizes. 15 nav items + brand + exam filter chips
              + support link + toggles + search will not fit horizontally even at 1920px if labels are
              shown, so we rely on icon + title/aria-label for identification on every breakpoint. */}
          <nav className="hidden md:flex items-center gap-0.5 min-w-0 flex-1 justify-center overflow-hidden">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  title={item.label}
                  aria-label={item.label}
                  className={`flex items-center justify-center p-2 rounded-lg transition-colors shrink-0 ${
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className={`h-4 w-4 ${isActive ? item.color : ""}`} />
                </Link>
              );
            })}
          </nav>


          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Exam filter chips — slightly larger type and consistent spacing so chips never clip on laptop */}
            <div className="hidden sm:flex items-center gap-1 mr-1 shrink-0">
              {examFilters.map((f) => (
                <button
                  key={f.label}
                  onClick={() => setActiveExam(f.value)}
                  className={`shrink-0 px-2 py-1 rounded text-[11px] font-medium leading-none whitespace-nowrap transition-colors ${
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
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0 whitespace-nowrap"
              title="Support this app"
              aria-label="Support this app"
            >
              <HandHeart className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden xl:inline">Support</span>
            </a>

            <div className="hidden sm:block">
              <UnitPreferenceMenu />
            </div>
            <div className="hidden sm:block">
              <ReduceMotionToggle />
            </div>
            <ThemeToggle />

            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
              aria-label="Search"
            >
              <Search className="h-3.5 w-3.5" />
              <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono text-[10px] whitespace-nowrap">
                ⌘K
              </kbd>
            </button>
          </div>
        </div>

        {/* Mobile nav — full-width horizontally scrollable row below the main header bar */}
        <nav className="flex md:hidden items-center gap-0.5 overflow-x-auto px-3 pb-2">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                aria-label={item.label}
                className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                  isActive ? "bg-secondary" : "hover:bg-muted"
                }`}
              >
                <item.icon className={`h-4 w-4 ${isActive ? item.color : "text-muted-foreground"}`} />
              </Link>
            );
          })}
        </nav>

        {/* Mobile exam filter — pill chips with consistent padding & whitespace-nowrap so labels never clip */}
        <div className="flex sm:hidden items-center gap-1 px-3 pb-2 overflow-x-auto">
          {examFilters.map((f) => (
            <button
              key={f.label}
              onClick={() => setActiveExam(f.value)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium leading-none transition-colors whitespace-nowrap shrink-0 ${
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
