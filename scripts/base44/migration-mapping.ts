/**
 * Concrete target mapping for the AnaesthesiaCore → Base44 data cutover.
 *
 * Every migrated row keeps its source identifier: id-keyed tables reuse the
 * source UUID as the Base44 record id, and composite-key tables keep their
 * source column names verbatim. Account identity cannot be copied — Base44 user
 * ids are not Supabase auth UUIDs — so ownership is resolved through an
 * explicit, reviewed id map, and e-mail is a join hint only, never proof of
 * identity.
 *
 * This file is data, not behaviour. `migration-validate.ts` reads it to run a
 * dry run; nothing here writes to a database, and nothing here carries a
 * credential, an e-mail address or any other value.
 */

export type EntityAccess =
  /** Server-side only: no client read or write, ever. */
  | "service-only"
  /** Admin UI reads through a server-checked admin function; no client write. */
  | "admin-only"
  /** A signed-in account reads and writes only rows it owns. */
  | "owner-scoped";

export type FieldTransform = "as-is" | "iso-timestamp" | "role-name";

export type FieldMapping = {
  source: string;
  target: string;
  required: boolean;
  transform: FieldTransform;
  note?: string;
};

export type EntityMapping = {
  sourceTable: string;
  /** Restricted Base44 entity name. */
  targetEntity: string;
  access: EntityAccess;
  /** Single identifier carried from source to target; null for composite keys. */
  stableId: { source: string; target: string } | null;
  /** Source columns that identify a row when there is no single id. */
  naturalKey: string[];
  /** Source column holding the owning account's auth user id, if any. */
  ownerColumn: string | null;
  /** Source column pointing at a parent row in another mapped table. */
  parent: { column: string; table: string } | null;
  fields: FieldMapping[];
  restrictions: string[];
};

/** The source `app_role` enum — the only values a role row may carry. */
export const SOURCE_ALLOWED_ROLES = ["admin", "user"] as const;

/** The only source role that grants admin access. */
export const ADMIN_SOURCE_ROLE = "admin";

const ACCOUNTS = "auth.users";

export const MIGRATION_MAPPING: EntityMapping[] = [
  {
    sourceTable: ACCOUNTS,
    targetEntity: "MigratedAccountIdentity",
    access: "service-only",
    stableId: { source: "id", target: "id" },
    naturalKey: ["id"],
    ownerColumn: null,
    parent: null,
    fields: [
      { source: "id", target: "id", required: true, transform: "as-is" },
      {
        source: "email",
        target: "joinEmail",
        required: true,
        transform: "as-is",
        note: "Join hint only, compared case-insensitively; deleted once the cutover is signed off.",
      },
      { source: "created_at", target: "createdAt", required: false, transform: "iso-timestamp" },
    ],
    restrictions: [
      "Service-role only: no client read, no client write, no public field.",
      "Never copies a password hash, MFA secret, OAuth token, refresh token or session state.",
      "joinEmail is never rendered, exported or logged, and is purged after cutover.",
    ],
  },
  {
    sourceTable: "user_roles",
    targetEntity: "MigratedAccountRole",
    access: "admin-only",
    stableId: null,
    naturalKey: ["user_id", "role"],
    ownerColumn: "user_id",
    parent: null,
    fields: [
      { source: "user_id", target: "user_id", required: true, transform: "as-is" },
      {
        source: "role",
        target: "role",
        required: true,
        transform: "role-name",
        note: "Re-validated against the source enum; the admin role is named by BASE44_ADMIN_ROLE.",
      },
    ],
    restrictions: [
      "Admin-only read through a server-checked admin function; no client write.",
      "A role row is assigned only by an owner-approved, audited step — never inferred from an e-mail domain.",
      "The admin role name is deployment configuration with no default; unset means nobody is admin.",
    ],
  },
  {
    sourceTable: "user_topic_progress",
    targetEntity: "MigratedTopicProgress",
    access: "owner-scoped",
    stableId: null,
    naturalKey: ["user_id", "topic_id"],
    ownerColumn: "user_id",
    parent: null,
    fields: [
      { source: "user_id", target: "user_id", required: true, transform: "as-is" },
      { source: "topic_id", target: "topic_id", required: true, transform: "as-is" },
      {
        source: "completed_at",
        target: "completedAt",
        required: false,
        transform: "iso-timestamp",
      },
    ],
    restrictions: ["Owner-scoped: a signed-in account sees and writes only its own rows."],
  },
  {
    sourceTable: "user_subsection_progress",
    targetEntity: "MigratedSubsectionProgress",
    access: "owner-scoped",
    stableId: null,
    naturalKey: ["user_id", "topic_id", "subsection_id"],
    ownerColumn: "user_id",
    parent: null,
    fields: [
      { source: "user_id", target: "user_id", required: true, transform: "as-is" },
      { source: "topic_id", target: "topic_id", required: true, transform: "as-is" },
      { source: "subsection_id", target: "subsection_id", required: true, transform: "as-is" },
      { source: "checked_at", target: "checkedAt", required: false, transform: "iso-timestamp" },
    ],
    restrictions: ["Owner-scoped: a signed-in account sees and writes only its own rows."],
  },
  {
    sourceTable: "user_study_time",
    targetEntity: "MigratedStudyTime",
    access: "owner-scoped",
    stableId: null,
    naturalKey: ["user_id", "topic_id", "day"],
    ownerColumn: "user_id",
    parent: null,
    fields: [
      { source: "user_id", target: "user_id", required: true, transform: "as-is" },
      { source: "topic_id", target: "topic_id", required: true, transform: "as-is" },
      { source: "day", target: "day", required: true, transform: "as-is" },
      { source: "seconds", target: "seconds", required: true, transform: "as-is" },
      { source: "updated_at", target: "updatedAt", required: false, transform: "iso-timestamp" },
    ],
    restrictions: ["Owner-scoped: a signed-in account sees and writes only its own rows."],
  },
  {
    sourceTable: "user_recent_topics",
    targetEntity: "MigratedRecentTopic",
    access: "owner-scoped",
    stableId: null,
    naturalKey: ["user_id", "topic_id"],
    ownerColumn: "user_id",
    parent: null,
    fields: [
      { source: "user_id", target: "user_id", required: true, transform: "as-is" },
      { source: "topic_id", target: "topic_id", required: true, transform: "as-is" },
      { source: "visited_at", target: "visitedAt", required: false, transform: "iso-timestamp" },
    ],
    restrictions: ["Owner-scoped: a signed-in account sees and writes only its own rows."],
  },
  {
    sourceTable: "viva_attempts",
    targetEntity: "MigratedVivaAttempt",
    access: "owner-scoped",
    stableId: { source: "id", target: "id" },
    naturalKey: ["id"],
    ownerColumn: "user_id",
    parent: null,
    fields: [
      { source: "id", target: "id", required: true, transform: "as-is" },
      { source: "user_id", target: "user_id", required: true, transform: "as-is" },
      { source: "exam", target: "exam", required: true, transform: "as-is" },
      { source: "topic_id", target: "topic_id", required: true, transform: "as-is" },
      { source: "topic_title", target: "topic_title", required: true, transform: "as-is" },
      { source: "question", target: "question", required: true, transform: "as-is" },
      { source: "answer", target: "answer", required: true, transform: "as-is" },
      { source: "score", target: "score", required: true, transform: "as-is" },
      { source: "verdict", target: "verdict", required: false, transform: "as-is" },
      { source: "feedback", target: "feedback", required: false, transform: "as-is" },
      { source: "created_at", target: "createdAt", required: false, transform: "iso-timestamp" },
    ],
    restrictions: [
      "Owner-scoped: only the account that sat the viva reads its attempt.",
      "Scores are historical records, not eligibility or clinical clearance.",
    ],
  },
  {
    sourceTable: "support_tickets",
    targetEntity: "MigratedSupportTicket",
    access: "service-only",
    stableId: { source: "id", target: "id" },
    naturalKey: ["id"],
    ownerColumn: "owner_id",
    parent: null,
    fields: [
      { source: "id", target: "id", required: true, transform: "as-is" },
      { source: "request_id", target: "request_id", required: true, transform: "as-is" },
      { source: "owner_id", target: "owner_id", required: false, transform: "as-is" },
      { source: "contact_name", target: "contact_name", required: false, transform: "as-is" },
      { source: "reply_email", target: "reply_email", required: false, transform: "as-is" },
      { source: "category", target: "category", required: true, transform: "as-is" },
      { source: "subject", target: "subject", required: true, transform: "as-is" },
      { source: "status", target: "status", required: true, transform: "as-is" },
      { source: "submitter_hash", target: "submitter_hash", required: true, transform: "as-is" },
      { source: "created_at", target: "createdAt", required: false, transform: "iso-timestamp" },
      { source: "updated_at", target: "updatedAt", required: false, transform: "iso-timestamp" },
    ],
    restrictions: [
      "Service-role only until the owner signs the privacy and retention decision.",
      "Owner reads its own ticket; admin reads only through a server-checked admin function.",
      "An anonymous ticket has no owner and stays reachable only by its request id.",
    ],
  },
  {
    sourceTable: "support_messages",
    targetEntity: "MigratedSupportMessage",
    access: "service-only",
    stableId: { source: "id", target: "id" },
    naturalKey: ["id"],
    ownerColumn: "author_id",
    parent: { column: "ticket_id", table: "support_tickets" },
    fields: [
      { source: "id", target: "id", required: true, transform: "as-is" },
      { source: "ticket_id", target: "ticket_id", required: true, transform: "as-is" },
      { source: "request_id", target: "request_id", required: true, transform: "as-is" },
      { source: "author_id", target: "author_id", required: false, transform: "as-is" },
      { source: "author_kind", target: "author_kind", required: true, transform: "as-is" },
      { source: "body", target: "body", required: true, transform: "as-is" },
      { source: "delivery_status", target: "delivery_status", required: true, transform: "as-is" },
      { source: "delivery_error", target: "delivery_error", required: false, transform: "as-is" },
      { source: "provider_id", target: "provider_id", required: false, transform: "as-is" },
      { source: "created_at", target: "createdAt", required: false, transform: "iso-timestamp" },
    ],
    restrictions: [
      "Service-role only: message bodies are private correspondence, never public content.",
      "A message must keep its parent ticket and is never copied without one.",
      "Delivery metadata is retained so a failed send is never silently resent.",
    ],
  },
];

export const ACCOUNT_TARGET_ENTITY = "MigratedAccountIdentity";
