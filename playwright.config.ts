import { createLovableConfig } from "lovable-agent-playwright-config/config";
import { devices } from "@playwright/test";

/**
 * Cross-browser matrix.
 *
 * The default `chromium` project runs the whole suite (visual regression
 * snapshots are chromium-only by design). Firefox and WebKit are scoped to
 * `tests/e2e/` so the auth/session/localStorage rehydration flows are proven
 * on all three engines — Safari/WebKit in particular has stricter storage
 * partitioning and cookie policies that can break session persistence.
 */
export default createLovableConfig({
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      testDir: "./tests/e2e",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      testDir: "./tests/e2e",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
