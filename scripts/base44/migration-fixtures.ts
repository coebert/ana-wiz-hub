/**
 * Synthetic fixtures for the cutover dry run.
 *
 * Every identifier, address and body here is invented: UUIDs are in the
 * `00000000-0000-4000-8000-…` range and every address uses the reserved
 * `example.invalid` domain. They exist so the validator can be exercised and
 * tested without touching a real record, and they must never be replaced with
 * production data.
 */
import {
  MIGRATION_MAPPING,
  SOURCE_ALLOWED_ROLES,
  type EntityMapping,
} from "./migration-mapping.ts";
import type {
  IdentityMap,
  Row,
  SourceSnapshot,
  TargetSnapshot,
  ValidationInput,
} from "./migration-validate.ts";

const uuid = (n: number) => `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`;

const account = (n: number, local: string) => ({
  id: uuid(n),
  email: `${local}@example.invalid`,
  created_at: `2026-01-0${n}T09:00:00.000Z`,
});

const source: SourceSnapshot = {
  tables: {
    "auth.users": [account(1, "owner"), account(2, "learner"), account(3, "visitor")],
    user_roles: [
      { user_id: uuid(1), role: "admin" },
      { user_id: uuid(2), role: "user" },
    ],
    user_topic_progress: [
      {
        user_id: uuid(1),
        topic_id: "acid-base-disorders",
        completed_at: "2026-02-01T10:00:00.000Z",
      },
      {
        user_id: uuid(1),
        topic_id: "mechanical-ventilation",
        completed_at: "2026-02-02T10:00:00.000Z",
      },
      { user_id: uuid(2), topic_id: "peep", completed_at: "2026-02-03T10:00:00.000Z" },
    ],
    user_subsection_progress: [
      {
        user_id: uuid(2),
        topic_id: "peep",
        subsection_id: "peep-basics",
        checked_at: "2026-02-03T11:00:00.000Z",
      },
    ],
    user_study_time: [
      {
        user_id: uuid(2),
        topic_id: "peep",
        day: "2026-02-03",
        seconds: 900,
        updated_at: "2026-02-03T12:00:00.000Z",
      },
      {
        user_id: uuid(2),
        topic_id: "peep",
        day: "2026-02-04",
        seconds: 600,
        updated_at: "2026-02-04T12:00:00.000Z",
      },
    ],
    user_recent_topics: [
      {
        user_id: uuid(1),
        topic_id: "mechanical-ventilation",
        visited_at: "2026-02-02T10:05:00.000Z",
      },
      { user_id: uuid(2), topic_id: "peep", visited_at: "2026-02-03T10:05:00.000Z" },
    ],
    viva_attempts: [
      {
        id: uuid(11),
        user_id: uuid(2),
        exam: "primary",
        topic_id: "peep",
        topic_title: "PEEP",
        question: "Synthetic fixture question.",
        answer: "Synthetic fixture answer.",
        score: 7,
        verdict: "Synthetic fixture verdict.",
        feedback: { note: "synthetic" },
        created_at: "2026-02-05T09:00:00.000Z",
      },
    ],
    support_tickets: [
      {
        id: uuid(21),
        request_id: uuid(31),
        owner_id: uuid(2),
        contact_name: "Synthetic Learner",
        reply_email: "learner@example.invalid",
        category: "support",
        subject: "Synthetic ticket subject",
        status: "open",
        submitter_hash: "synthetic-hash-1",
        created_at: "2026-02-06T09:00:00.000Z",
        updated_at: "2026-02-06T09:30:00.000Z",
      },
      {
        id: uuid(22),
        request_id: uuid(32),
        owner_id: null,
        contact_name: "",
        reply_email: null,
        category: "error",
        subject: "Synthetic anonymous ticket",
        status: "resolved",
        submitter_hash: "synthetic-hash-2",
        created_at: "2026-02-07T09:00:00.000Z",
        updated_at: "2026-02-07T09:10:00.000Z",
      },
    ],
    support_messages: [
      {
        id: uuid(41),
        ticket_id: uuid(21),
        request_id: uuid(51),
        author_id: uuid(2),
        author_kind: "user",
        body: "Synthetic fixture message one.",
        delivery_status: "sent",
        delivery_error: null,
        provider_id: "synthetic-provider-1",
        created_at: "2026-02-06T09:00:00.000Z",
      },
      {
        id: uuid(42),
        ticket_id: uuid(21),
        request_id: uuid(52),
        author_id: uuid(1),
        author_kind: "admin",
        body: "Synthetic fixture message two.",
        delivery_status: "sent",
        delivery_error: null,
        provider_id: "synthetic-provider-2",
        created_at: "2026-02-06T09:30:00.000Z",
      },
      {
        id: uuid(43),
        ticket_id: uuid(22),
        request_id: uuid(53),
        author_id: null,
        author_kind: "user",
        body: "Synthetic fixture message three.",
        delivery_status: "saved",
        delivery_error: null,
        provider_id: null,
        created_at: "2026-02-07T09:00:00.000Z",
      },
    ],
  },
};

/** Apply the mapping's field projection, keeping key and owner column names. */
function project(entity: EntityMapping, rows: Row[]): Row[] {
  return rows.map((row) => {
    const projected: Row = {};
    for (const field of entity.fields) {
      projected[field.target] = row[field.source] ?? null;
    }
    return projected;
  });
}

export function buildSyntheticTarget(): TargetSnapshot {
  const entities: Record<string, Row[]> = {};
  for (const entity of MIGRATION_MAPPING) {
    entities[entity.targetEntity] = project(entity, source.tables[entity.sourceTable] ?? []);
  }
  return { entities };
}

export function buildSyntheticIdentities(): IdentityMap {
  return [uuid(1), uuid(2), uuid(3)].map((sourceId, index) => ({
    sourceId,
    targetUserId: `base44-user-${index + 1}`,
  }));
}

export function buildSyntheticMigrationInput(): ValidationInput {
  return {
    mapping: MIGRATION_MAPPING,
    source: structuredClone(source),
    target: buildSyntheticTarget(),
    identities: buildSyntheticIdentities(),
    allowedRoles: SOURCE_ALLOWED_ROLES,
    adminRole: "admin",
  };
}

/** Values that must never appear in an aggregate report. */
export const SYNTHETIC_SENSITIVE_VALUES = [
  ...source.tables["auth.users"].flatMap((row) => [String(row.id), String(row.email)]),
  ...source.tables.support_messages.map((row) => String(row.body)),
  ...source.tables.support_tickets.map((row) => String(row.subject)),
];
