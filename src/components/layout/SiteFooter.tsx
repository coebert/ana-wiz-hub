import { PageContainer } from "@/components/layout/PageContainer";

interface FooterLink {
  label: string;
  href: string;
}

interface SiteFooterProps {
  /** Additional right-column links appended after the Sitemap link. */
  extraLinks?: FooterLink[];
}

const DEFAULT_LINKS: FooterLink[] = [
  { label: "Sitemap", href: "/sitemap.xml" },
];

/**
 * <SiteFooter> — the single muted footer row used on Landing, the
 * `/revise` hub and every section / topic page.
 *
 * Kept content-terse on purpose: a factual sourcing note on the left,
 * author credentials + a small set of utility links on the right.
 * Layout, tokens and spacing stay identical across every page so
 * users see a consistent close to the reading flow.
 */
export const SiteFooter = ({ extraLinks = [] }: SiteFooterProps) => {
  const links = [...DEFAULT_LINKS, ...extraLinks];
  return (
    <footer className="border-t border-border bg-surface">
      <PageContainer
        width="full"
        className="py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-muted-foreground"
      >
        <p>
          Content sourced from BJA Education, Miller&apos;s Anesthesia,
          Oh&apos;s ICU Manual and established literature. Not a substitute for
          clinical judgement.
        </p>
        <p className="flex items-center gap-4 shrink-0 flex-wrap">
          <span className="text-muted-foreground">
            Dr Rob Coe · BA MA (Oxon) MBBS FRCA FFICM
          </span>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-foreground underline-offset-4 hover:underline"
            >
              {l.label}
            </a>
          ))}
        </p>
      </PageContainer>
    </footer>
  );
};
