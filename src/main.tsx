import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import App from "./App.tsx";
import "./index.css";
import { startVersionCheck } from "./lib/version-check";
import { startWebVitalsReporting } from "./lib/web-vitals-reporter";
import {
  installStaleChunkRecovery,
  unregisterPreviewServiceWorker,
} from "./lib/stale-chunk-recovery";

unregisterPreviewServiceWorker();
installStaleChunkRecovery();

startVersionCheck();
startWebVitalsReporting();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <App />
    </ThemeProvider>
  </HelmetProvider>,
);
