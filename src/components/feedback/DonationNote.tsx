import { Link } from "react-router-dom";
import { scrollToSupport } from "@/lib/donation";

/** Quiet, single-line voluntary-support note. No pop-up, no repeat prompts. */
export const DonationNote = ({ className = "" }: { className?: string }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>
    Free to use. If it helps, you can{" "}
    <Link
      to="/#support"
      onClick={() => window.setTimeout(() => scrollToSupport(), 0)}
      className="underline underline-offset-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
    >
      support its upkeep
    </Link>
    .
  </p>
);
