import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export interface Crumb {
  label: string;
  to?: string;
}

/**
 * Compact breadcrumb trail for orienting users inside major sections.
 * The final crumb (no `to`) is rendered as the current page.
 */
export const Breadcrumbs = ({ items }: { items: Crumb[] }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center flex-wrap gap-1 text-xs text-muted-foreground">
        <li className="flex items-center">
          <Link
            to="/revise"
            className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            aria-label="Core disciplines"
          >
            <Home className="h-3 w-3" />
            <span>Core disciplines</span>
          </Link>
        </li>
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1 min-w-0">
              <ChevronRight className="h-3 w-3 shrink-0 opacity-60" />
              {c.to && !isLast ? (
                <Link to={c.to} className="hover:text-foreground transition-colors truncate">
                  {c.label}
                </Link>
              ) : (
                <span
                  className="text-foreground font-medium truncate"
                  aria-current={isLast ? "page" : undefined}
                >
                  {c.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
