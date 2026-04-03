import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface SectionLayoutProps {
  title: string;
  subtitle: string;
  backPath?: string;
  backLabel?: string;
  children: ReactNode;
  accentColor?: string;
}

export const SectionLayout = ({ title, subtitle, backPath, backLabel, children, accentColor }: SectionLayoutProps) => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {backPath && (
        <Link
          to={backPath}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          {backLabel || "Back"}
        </Link>
      )}
      <div className="mb-8">
        <h1 className={`text-3xl md:text-4xl font-serif font-bold ${accentColor || "text-foreground"}`}>
          {title}
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">{subtitle}</p>
      </div>
      {children}
    </div>
  );
};
