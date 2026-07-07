import { useEffect } from "react";
import { PageSection } from "@/components/layout/PageSection";
import SpoofedDomainsPanel from "@/components/admin/SpoofedDomainsPanel";

export default function SpoofedDomains() {
  useEffect(() => { document.title = "Spoofed Backlinks — Admin"; }, []);
  return (
    <PageSection as="main" spacing="tight" width="wide">
      <header className="mb-2">
        <h1 className="font-serif text-3xl font-semibold">Spoofed backlinks</h1>
      </header>
      <SpoofedDomainsPanel />
    </PageSection>
  );
}
