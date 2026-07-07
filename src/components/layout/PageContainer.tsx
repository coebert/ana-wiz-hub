import { ReactNode, ElementType } from "react";
import { cn } from "@/lib/utils";

/**
 * <PageContainer> — the single source of truth for horizontal
 * gutters and reading-measure widths across Landing, section index
 * and topic pages.
 *
 * Widths map directly to the design system's reading measures:
 *   - `narrow` (max-w-3xl) — long-form topic body (~72ch)
 *   - `default` (max-w-4xl) — section index pages
 *   - `wide` (max-w-5xl) — feature cards, evidence bands
 *   - `xwide` (max-w-6xl) — hero rows and marketing grids
 *   - `full` (no max) — bleed sections that manage their own inner width
 *
 * Horizontal padding steps up predictably across breakpoints so every
 * page shares the same edge-to-content rhythm.
 */
export type PageContainerWidth = "narrow" | "default" | "wide" | "xwide" | "full";

const WIDTHS: Record<PageContainerWidth, string> = {
  narrow: "max-w-3xl",
  default: "max-w-4xl",
  wide: "max-w-5xl",
  xwide: "max-w-6xl",
  full: "",
};

interface PageContainerProps {
  as?: ElementType;
  width?: PageContainerWidth;
  children: ReactNode;
  className?: string;
}

export const PageContainer = ({
  as: Tag = "div",
  width = "default",
  children,
  className,
}: PageContainerProps) => (
  <Tag
    className={cn(
      "container mx-auto px-3 sm:px-4 lg:px-6",
      WIDTHS[width],
      className,
    )}
  >
    {children}
  </Tag>
);
