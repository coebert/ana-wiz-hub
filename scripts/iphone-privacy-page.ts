import { readFileSync } from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

// The exact extensionless output is a real file, not a client-side SPA route.
export function iphonePrivacyPage(): Plugin {
  const sourcePath = path.resolve("public/iphone/privacy.html");
  const readPage = () => readFileSync(sourcePath, "utf8");
  return {
    name: "iphone-privacy-static-page",
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const pathname = request.url?.split("?")[0];
        if (pathname !== "/iphone/privacy" && pathname !== "/iphone/privacy/") {
          next();
          return;
        }
        if (request.method !== "GET" && request.method !== "HEAD") {
          next();
          return;
        }
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.end(request.method === "HEAD" ? undefined : readPage());
      });
    },
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "iphone/privacy", source: readPage() });
    },
  };
}