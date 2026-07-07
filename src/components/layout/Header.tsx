import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FlaskConical, Heart, Atom, Search, Stethoscope, Activity, ClipboardList, HandHeart, Network, BarChart3, Headphones, Mic, Pill, GraduationCap, Calculator, Brain, BookOpen, Sparkles, Menu } from "lucide-react";
import brainLogo from "/brain-logo.webp";
import { SearchDialog } from "@/components/layout/SearchDialog";
import { ReduceMotionToggle } from "@/components/layout/ReduceMotionToggle";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { UnitPreferenceMenu } from "@/components/layout/UnitPreferenceMenu";
import { HeaderAccountMenu } from "@/components/layout/HeaderAccountMenu";
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

  // Close the mobile drawer automatically whenever the route changes.
  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  // ----- Touch swipe gestures for the mobile drawer -----
  // Edge-swipe-right from the left edge opens the drawer; swipe-left on the
  // open drawer closes it. Gestures only fire on coarse-pointer devices and
  // only below the `md` breakpoint where the drawer actually exists.
  const SWIPE_EDGE_PX = 24;        // start zone for open gesture
  const SWIPE_THRESHOLD_PX = 60;   // min horizontal distance to count
  const SWIPE_MAX_VERTICAL_PX = 50; // max vertical drift before we abandon
  const touchStartRef = useRef<{ x: number; y: number; fromEdge: boolean } | null>(null);

  useEffect(() => {
    const mql = window.matchMedia("(pointer: coarse) and (max-width: 767px)");
    if (!mql.matches) return;

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      touchStartRef.current = {
        x: t.clientX,
        y: t.clientY,
        fromEdge: t.clientX <= SWIPE_EDGE_PX,
      };
    };
    const onEnd = (e: TouchEvent) => {
      const start = touchStartRef.current;
      touchStartRef.current = null;
      if (!start) return;
      const t = e.changedTouches[0];
      if (!t) return;
      const dx = t.clientX - start.x;
      const dy = Math.abs(t.clientY - start.y);
      if (dy > SWIPE_MAX_VERTICAL_PX) return;
      // Swipe right from the left edge → open (only when closed).
      if (!mobileNavOpen && start.fromEdge && dx > SWIPE_THRESHOLD_PX) {
        setMobileNavOpen(true);
      }
    };

    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [mobileNavOpen]);

  // Per-panel handlers: swipe left on the open drawer closes it.
  const panelTouchRef = useRef<{ x: number; y: number } | null>(null);
  const onPanelTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (!t) return;
    panelTouchRef.current = { x: t.clientX, y: t.clientY };
  };
  const onPanelTouchEnd = (e: React.TouchEvent) => {
    const start = panelTouchRef.current;
    panelTouchRef.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    if (!t) return;
    const dx = t.clientX - start.x;
    const dy = Math.abs(t.clientY - start.y);
    if (dy > SWIPE_MAX_VERTICAL_PX) return;
    if (dx < -SWIPE_THRESHOLD_PX) setMobileNavOpen(false);
  };


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
                {/* Wordmark held back to 2xl so it never collides with the
                    labelled xl nav row on standard 13–14" laptops. */}
                <span className="text-base font-semibold text-foreground hidden 2xl:inline whitespace-nowrap">
                  AnaesthesiaCore
                </span>
              </Link>
            );
          })()}

          {/* Desktop nav — icons only at every width so the wordmark,
              exam-filter cluster and preference cluster all coexist
              without any label ever clipping. Tooltips + aria-labels
              retain the semantics; the full labelled list is available
              in the mobile drawer and via ⌘K search. */}
          <nav
            aria-label="Sections"
            className="hidden md:flex items-center gap-0.5 min-w-0 flex-1 justify-center overflow-hidden"
          >
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  title={item.label}
                  aria-label={item.label}
                  className={`flex items-center justify-center p-2 rounded-md transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
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
            <HeaderAccountMenu />

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

            {/* Mobile hamburger — replaces the old scrolling nav + exam chip rows below md */}
            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetTrigger asChild>
                <button
                  className="md:hidden flex items-center justify-center p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-4 w-4" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[85vw] max-w-sm p-0 flex flex-col"
                aria-modal="true"
                aria-label="Main navigation"
                onTouchStart={onPanelTouchStart}
                onTouchEnd={onPanelTouchEnd}
              >
                <SheetHeader className="px-5 pt-5 pb-3 border-b border-border">
                  <SheetTitle className="text-left text-base">Navigation</SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto">
                  {/* Exam filter section */}
                  <div className="px-5 pt-4 pb-3 border-b border-border">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                      Exam filter
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {examFilters.map((f) => (
                        <button
                          key={f.label}
                          onClick={() => setActiveExam(f.value)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium leading-none transition-colors whitespace-nowrap ${
                            activeExam === f.value
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground hover:bg-muted/70"
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Nav items with labels */}
                  <nav className="px-2 py-2">
                    {navItems.map((item) => {
                      const isActive = location.pathname.startsWith(item.path);
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setMobileNavOpen(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                            isActive
                              ? "bg-secondary text-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                        >
                          <item.icon className={`h-4 w-4 shrink-0 ${isActive ? item.color : ""}`} />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </nav>

                  {/* Support + preferences */}
                  <div className="px-2 pb-4 border-t border-border pt-2 mt-2">
                    <a
                      href="/#support"
                      onClick={(e) => {
                        setMobileNavOpen(false);
                        goToSupport(e);
                      }}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      <HandHeart className="h-4 w-4 shrink-0" />
                      <span>Support this app</span>
                    </a>
                    <div className="flex items-center justify-between px-3 py-2 mt-2 gap-2">
                      <span className="text-xs text-muted-foreground">Preferences</span>
                      <div className="flex items-center gap-1">
                        <UnitPreferenceMenu />
                        <ReduceMotionToggle />
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
