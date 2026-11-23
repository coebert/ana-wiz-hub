import { describe, expect, it } from "vitest";
import { buildMigrationManifest } from "../../scripts/base44/migration-manifest.ts";

describe("Base44 migration manifest", () => {
  const manifest = buildMigrationManifest(process.cwd());

  it("is deterministic and derived from the repository", () => {
    expect(buildMigrationManifest(process.cwd())).toEqual(manifest);
    expect(manifest.source).toBe("coebert/ana-wiz-hub");
  });

  it("lists every table the cutover has to account for", () => {
    const names = manifest.tables.map((table) => table.name);
    for (const expected of [
      "user_roles",
      "user_topic_progress",
      "user_subsection_progress",
      "user_study_time",
      "user_recent_topics",
      "support_tickets",
      "support_messages",
      "viva_attempts",
      "podcasts",
      "drugs",
      "viva_model_answers",
      "home_announcement",
    ]) {
      expect(names).toContain(expected);
    }
  });

  it("classifies account, progress, support and payment tables as personal data", () => {
    const category = (name: string) =>
      manifest.tables.find((table) => table.name === name)?.personal;
    expect(category("user_roles")).toBe("account");
    expect(category("user_topic_progress")).toBe("progress");
    expect(category("viva_attempts")).toBe("progress");
    expect(category("support_tickets")).toBe("private-correspondence");
    expect(category("support_messages")).toBe("private-correspondence");
    expect(category("inaccuracy_reports")).toBe("contributor-contact");
    expect(category("donations")).toBe("payment");
    expect(category("app_visits")).toBe("visitor");
    expect(category("drugs")).toBeNull();
  });

  it("records storage buckets, scheduled work and function surfaces", () => {
    expect(manifest.storageBuckets).toEqual([
      { name: "lighthouse-reports", public: false },
      { name: "podcasts", public: true },
    ]);
    expect(manifest.scheduledJobs).toEqual([
      "content-audit-watchdog",
      "podcast-rerecord-watchdog",
      "weekly-topic-audit",
    ]);
    const edge = manifest.edgeFunctions.map((fn) => fn.name);
    expect(edge).toContain("ai-relay-jwks");
    expect(edge).toContain("support-inbox");
    expect(edge).toContain("viva");
    expect(manifest.edgeFunctions.find((fn) => fn.name === "kb-chat")?.ai).toBe(true);
    expect(manifest.base44Functions).toEqual(["adminSession", "aiRelay"]);
  });

  it("records the native release identity and the identity-mapping requirement", () => {
    expect(manifest.native.webDir).toBe("dist/native");
    expect(manifest.native.appId).toMatch(/^app\.lovable\./);
    expect(manifest.identity).toMatchObject({
      source: "auth.users",
      target: "Base44 user",
      joinKey: "email",
      requiresExplicitIdMap: true,
    });
  });

  it("never carries credentials or personal data", () => {
    const serialized = JSON.stringify(manifest);
    expect(serialized).not.toMatch(/eyJ[A-Za-z0-9_-]{10,}/);
    expect(serialized).not.toMatch(/service_role|SUPABASE_SERVICE|sk-[A-Za-z0-9]/);
    expect(serialized).not.toMatch(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
  });
});
