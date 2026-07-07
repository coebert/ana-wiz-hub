import { ReactNode, ElementType } from "react";
import { cn } from "@/lib/utils";
import { PageContainer, PageContainerWidth } from "@/components/layout/PageContainer";

/**
 * <PageSection> — a vertical-rhythm wrapper for a stacked page block.
 *
 * Every marketing page, section index and topic page composes itself
 * out of PageSections so the vertical spacing between blocks (hero →
 * feature grid → evidence band → footer) stays consistent regardless
 * of author.
 *
 * `spacing` scales the top/bottom padding:
 *   - `tight`   — closely-stacked bands (py-6 sm:py-8)
 *   - `default` — most content sections (py-10 md:py-14)
 *   - `loose`   — hero / opening sections (py-12 md:py-16)
 *   - `flush`   — no vertical padding (use for full-bleed rows that
 *                  supply their own spacing)
 *
 * `bleed` toggles the outer PageContainer. When `true`, the section
 * root spans the full viewport and renders `children` directly — use
 * this when you need a coloured band that runs to the viewport edges
 * and put a `PageContainer` inside it yourself.
 */
export type PageSectionSpacing = "flush" | "tight" | "default" | "loose";

const SPACING: Record<PageSectionSpacing, string> = {
  flush: "",
  tight: "py-6 sm:py-8",
  default: "py-10 md:py-14",
  loose: "py-12 md:py-16",
};

interface PageSectionProps {
  as?: ElementType;
  spacing?: PageSectionSpacing;
  width?: PageContainerWidth;
  /** Skip the built-in PageContainer wrapper. */
  bleed?: boolean;
  children: ReactNode;
  className?: string;
  /** Applied only to the inner container (ignored when `bleed`). */
  innerClassName?: string;
  id?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
}

export const PageSection = ({
  as: Tag = "section",
  spacing = "default",
  width = "default",
  bleed = false,
  children,
  className,
  innerClassName,
  id,
  ...aria
}: PageSectionProps) => {
  if (bleed) {
    return (
      <Tag id={id} className={cn(SPACING[spacing], className)} {...aria}>
        {children}
      </Tag>
    );
  }
  return (
    <Tag id={id} className={cn(SPACING[spacing], className)} {...aria}>
      <PageContainer width={width} className={innerClassName}>
        {children}
      </PageContainer>
    </Tag>
  );
};
