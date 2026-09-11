import { useEffect } from "react";
import { PageSection } from "@/components/layout/PageSection";
import WebVitalsPanel from "@/components/admin/WebVitalsPanel";

export default function WebVitals() {
  useEffect(() => {
    document.title = "Real-user performance — Admin";
  }, []);
  return (
    <PageSection as="main" spacing="tight" width="wide">
      <header className="mb-4">
        <h1 className="font-serif text-3xl font-semibold">Real-user performance</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Core Web Vitals collected from real visitors on the live site.
        </p>
      </header>
      <WebVitalsPanel />
    </PageSection>
  );
}
