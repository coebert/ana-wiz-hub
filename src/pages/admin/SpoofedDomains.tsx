import { useEffect } from "react";
import SpoofedDomainsPanel from "@/components/admin/SpoofedDomainsPanel";

export default function SpoofedDomains() {
  useEffect(() => { document.title = "Spoofed Backlinks — Admin"; }, []);
  return (
    <main className="container mx-auto max-w-5xl px-4 py-8">
      <header className="mb-2">
        <h1 className="font-serif text-3xl font-semibold">Spoofed backlinks</h1>
      </header>
      <SpoofedDomainsPanel />
    </main>
  );
}
