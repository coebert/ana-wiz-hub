import { ArrowRight, ExternalLink, Smartphone } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getReduceMotion } from "@/contexts/MotionPreferenceContext";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/PageContainer";
import { isNativeApp } from "@/lib/native-platform";
import { cn } from "@/lib/utils";
import anaesthesiaCoreIcon from "@/assets/app-store/anaesthesiacore_app_icon.webp.asset.json";
import lungSimProIcon from "@/assets/app-store/lung_sim_pro_app_icon.webp.asset.json";

export type StoreApp = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  note?: string;
  href: string;
  iconUrl: string;
};

/** Verified direct UK App Store listings (store titles match exactly). */
export const STORE_APPS: StoreApp[] = [
  {
    id: "anaesthesiacore",
    name: "AnaesthesiaCore",
    tagline: "FRCA & FFICM revision on the go",
    description:
      "Structured curriculum notes, interactive diagrams and topic quizzes on your iPhone, with references to the original guidance and a spaced-repetition quiz review queue.",
    note: "Buying the iPhone app supports development — revision on this website stays free.",
    href: "https://apps.apple.com/gb/app/anaesthesiacore/id6829783342",
    iconUrl: anaesthesiaCoreIcon.url,
  },
  {
    id: "lung-sim-pro",
    name: "Lung Sim Pro",
    tagline: "Hands-on mechanical ventilation practice",
    description:
      "Adjust ventilator settings across six modes and 11 simulated patient profiles, and watch pressure, flow and volume waveforms respond live in a teaching model.",
    href: "https://apps.apple.com/gb/app/lung-sim-pro/id6829721030",
    iconUrl: lungSimProIcon.url,
  },
  {
    id: "anaesthesia-drug-guide",
    name: "Anaesthesia Drug Guide",
    tagline: "Adult anaesthesia & critical care reference",
    description:
      "Browse 210 drug monographs, search by name or class, save favourites and compare selected medicines. Core reference content is available offline on iPhone and iPad.",
    note: "For qualified healthcare professionals. Use alongside current product information, the BNF and local policies.",
    href: "https://apps.apple.com/gb/app/anaesthesia-drug-guide/id6830358278",
    iconUrl:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/04/b6/90/04b6902d-2153-2a52-bdf3-1978a60eb65a/AppIcon-0-0-1x_U007epad-0-1-85-220.png/512x512bb.jpg",
  },
];

/**
 * Compact "Now on the App Store" band for the public web homepage.
 * Web marketing only: renders nothing inside the installed iOS app.
 */
export function AppStoreApps() {
  const native = isNativeApp();
  const location = useLocation();

  // The SPA mounts after the browser's own anchor jump, so align /#app-store
  // once mounted and again after late layout shifts, unless the user scrolls.
  useEffect(() => {
    if (native || location.hash !== "#app-store") return;
    const events = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    let timer = 0;
    const cancel = () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, cancel, true));
    };
    events.forEach((e) => window.addEventListener(e, cancel, { capture: true, passive: true }));
    const align = (smooth: boolean) =>
      document.getElementById("app-store")?.scrollIntoView({
        behavior: smooth && !getReduceMotion() ? "smooth" : "auto",
        block: "start",
      });
    align(true);
    timer = window.setTimeout(() => {
      align(false);
      cancel();
    }, 700);
    return cancel;
  }, [native, location.hash, location.key]);

  if (native) return null;

  return (
    <section
      id="app-store"
      aria-labelledby="app-store-heading"
      className="scroll-mt-20 border-b border-border bg-background"
    >
      <PageContainer className="py-8 md:py-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow text-muted-foreground mb-2">
                <Smartphone className="inline h-3.5 w-3.5 mr-1.5 -mt-0.5" aria-hidden />
                New for iPhone
              </p>
              <h2 id="app-store-heading" className="h2">
                Now on the App Store
              </h2>
            </div>
            <Link
              to="/revise"
              className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            >
              Or keep revising free on the web
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STORE_APPS.map((app, index) => (
              <li
                key={app.id}
                className={cn(
                  "flex flex-col rounded-xl border border-border bg-card p-5 shadow-elev-1 md:p-6",
                  // Odd card count: let the last card span the pair row on tablets.
                  index === STORE_APPS.length - 1 &&
                    STORE_APPS.length % 2 === 1 &&
                    "sm:col-span-2 lg:col-span-1"
                )}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={app.iconUrl}
                    alt=""
                    width={64}
                    height={64}
                    loading="lazy"
                    decoding="async"
                    className="h-16 w-16 shrink-0 rounded-[22%] border border-border bg-muted"
                  />
                  <div className="min-w-0">
                    <h3 className="h3 text-foreground">{app.name}</h3>
                    <p className="mt-0.5 text-sm font-medium text-foreground/80">{app.tagline}</p>
                  </div>
                </div>
                <p className="small mt-4 leading-relaxed flex-1">{app.description}</p>
                {app.note && (
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{app.note}</p>
                )}
                <div className="mt-5">
                  <Button asChild variant="cta" size="lg" className="w-full sm:w-auto">
                    <a href={app.href} target="_blank" rel="noopener noreferrer">
                      View on the App Store
                      <span className="sr-only">{` for ${app.name} (opens in a new tab)`}</span>
                      <ExternalLink className="h-4 w-4" aria-hidden />
                    </a>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </PageContainer>
    </section>
  );
}
