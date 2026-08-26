import { test, expect, type Page } from "@playwright/test";

/**
 * End-to-end proof that account creation persists progress across sessions.
 *
 * Flow:
 *   1. Sign up a brand-new user through the /login "Create account" tab.
 *   2. Mark a topic as completed (writes to `public.user_topic_progress`).
 *   3. Sign out (which purges every local progress cache).
 *   4. Wipe localStorage entirely — simulating a different device/browser.
 *   5. Sign back in and assert the topic still reads "Completed!" — i.e. the
 *      state came from the cloud, not from local storage.
 *
 * The signup path only yields a session when email confirmation is disabled
 * on the project. When confirmation is on, `signUp()` returns no session and
 * the new account cannot be used unattended — in that case the spec falls
 * back to TEST_USER_EMAIL / TEST_USER_PASSWORD if provided, and otherwise
 * skips rather than failing spuriously.
 *
 * Run:
 *   npx playwright test tests/e2e/signup-progress-rehydrates.spec.ts
 */

const TOPIC_PATH = "/physics/temperature-measurement";

const PROGRESS_KEYS = [
  "anaesthesia-core-progress",
  "anaesthesia-core-subsection-progress",
  "anaesthesia-core-recent-topics",
];

const FALLBACK_EMAIL = process.env.TEST_USER_EMAIL;
const FALLBACK_PASSWORD = process.env.TEST_USER_PASSWORD;

const uniqueEmail = () =>
  `e2e-progress-${Date.now()}-${Math.floor(Math.random() * 10000)}@example.com`;
const PASSWORD = "E2e-Progress-Test!2026";

/** Fill and submit the /login form in the requested mode. */
async function submitAuthForm(page: Page, mode: "signin" | "signup", email: string, password: string) {
  await page.goto("/login");
  if (mode === "signup") {
    await page.getByRole("tab", { name: /create account|sign up/i }).click();
  }
  const form = page.locator("form").filter({ has: page.locator('input[type="password"]') }).first();
  await form.locator('input[type="email"]').fill(email);
  await form.locator('input[type="password"]').fill(password);
  await form.getByRole("button", { name: /sign in|create account/i }).first().click();
}

/** True once the Supabase client has an access token in storage. */
async function hasSession(page: Page): Promise<boolean> {
  return page
    .waitForFunction(
      () =>
        Object.keys(localStorage).some(
          (k) => k.startsWith("sb-") && k.endsWith("-auth-token") && !!localStorage.getItem(k)
        ),
      undefined,
      { timeout: 15000 }
    )
    .then(() => true)
    .catch(() => false);
}

const completionToggle = (page: Page) =>
  page.getByRole("button", { name: /mark as completed|completed!/i }).first();

test.describe("progress survives sign-out and a fresh session", () => {
  test("a new account's topic completion rehydrates from the cloud", async ({ page }) => {
    // ---- 1. Create the account ----------------------------------------
    let email = uniqueEmail();
    let password = PASSWORD;

    await submitAuthForm(page, "signup", email, password);
    let signedIn = await hasSession(page);

    if (!signedIn) {
      // Email confirmation is enabled — the new account is unusable here.
      test.skip(
        !FALLBACK_EMAIL || !FALLBACK_PASSWORD,
        "Email confirmation is enabled; set TEST_USER_EMAIL/TEST_USER_PASSWORD to run this spec"
      );
      email = FALLBACK_EMAIL!;
      password = FALLBACK_PASSWORD!;
      await submitAuthForm(page, "signin", email, password);
      signedIn = await hasSession(page);
    }
    expect(signedIn, "expected an authenticated session after account creation").toBe(true);

    // ---- 2. Record progress on a topic --------------------------------
    await page.goto(TOPIC_PATH);
    const toggle = completionToggle(page);
    await expect(toggle).toBeVisible({ timeout: 15000 });

    // Normalise: if the fallback account already completed it, untick first
    // so we exercise a real write in this session.
    if (await toggle.getByText(/completed!/i).count()) {
      await toggle.click();
      await expect(toggle).toContainText(/mark as completed/i);
      await page.waitForTimeout(1000);
    }
    await toggle.click();
    await expect(toggle).toContainText(/completed!/i);
    // Let the fire-and-forget cloud upsert land before signing out.
    await page.waitForTimeout(2000);

    // ---- 3. Sign out ---------------------------------------------------
    await page
      .getByRole("button", { name: /account|profile|menu/i })
      .first()
      .click()
      .catch(() => {});
    await page
      .getByRole("menuitem", { name: /sign out/i })
      .or(page.getByRole("button", { name: /sign out/i }))
      .first()
      .click();
    await page.waitForURL(/\/$/, { timeout: 15000 });

    // ---- 4. Simulate a different device: nuke all local state ----------
    await page.evaluate(() => localStorage.clear());
    await page.context().clearCookies();
    await page.reload();

    // The topic must now read as NOT completed (no local cache, no session).
    await page.goto(TOPIC_PATH);
    await expect(completionToggle(page)).toContainText(/mark as completed/i, { timeout: 15000 });

    // ---- 5. Sign back in and expect the cloud state to rehydrate -------
    await submitAuthForm(page, "signin", email, password);
    expect(await hasSession(page), "expected to be signed in again").toBe(true);

    await page.goto(TOPIC_PATH);
    await expect(completionToggle(page)).toContainText(/completed!/i, { timeout: 20000 });

    // And the local cache should have been repopulated from the cloud rows.
    const cached = await page.evaluate((k) => localStorage.getItem(k), PROGRESS_KEYS[0]);
    expect(cached ?? "").not.toEqual("");
  });
});
