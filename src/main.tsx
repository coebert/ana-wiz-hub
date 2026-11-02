import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import App from "./App.tsx";
import "./index.css";
import { startVersionCheck } from "./lib/version-check";
import { startWebVitalsReporting } from "./lib/web-vitals-reporter";
import { isNativeApp } from "./lib/native-platform";
import {
  installStaleChunkRecovery,
  unregisterPreviewServiceWorker,
} from "./lib/stale-chunk-recovery";

const standaloneRedirect = (window as { __AC_STANDALONE_REDIRECT__?: boolean }).__AC_STANDALONE_REDIRECT__ === true;

if (standaloneRedirect) {
  // index.html is loading the static iPhone privacy notice; start nothing here.
} else if (!isNativeApp()) {
  unregisterPreviewServiceWorker();
  installStaleChunkRecovery();
  startVersionCheck();
} else {
  document.documentElement.dataset.nativeApp = 'true';
}
const root = document.getElementById('root');
if (!root) throw new Error('Application root is missing');
if (!standaloneRedirect) startWebVitalsReporting();
if (!standaloneRedirect) createRoot(root).render(
  <HelmetProvider>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <App />
    </ThemeProvider>
  </HelmetProvider>,
);
