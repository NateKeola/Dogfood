# Usage ledger v1

The dashboard accepts CSV events, Outreach-Engine v1 JSONL, or a complete JSON snapshot conforming to [usage-ledger.schema.json](usage-ledger.schema.json). No live connection is present. Runtime validators additionally enforce real dates, safe URLs, duplicate IDs and synthetic/private separation.

## Event fields

| Field | Meaning |
| --- | --- |
| `id` | Stable, opaque, unique event identifier. Same operation retry = new ID; re-importing the same attempt = same ID |
| `provider`, `operation` | Lowercase provider slug and an operation label; do not use account IDs or prompts |
| `units`, `unit` | Nonnegative usage and its unit, such as request, input-token, browser-minute or credit |
| `timestamp` | Valid UTC ISO timestamp, e.g. `2026-11-02T12:00:00Z`; month attribution uses this date |
| `project`, `batch`, `run` | Opaque internal labels, never company/contact names or provider account identifiers |
| `status` | `completed`, `failed`, `incomplete` or `unknown` for this event/attempt, not inferred run completion |
| `attempt` | Positive integer beginning at 1, or null when not supplied; retries can still be billed |
| `category` | `usage` or `subscription` |
| `costKind` | `provider_reported`, `manual`, `estimate` or `unknown` |
| `amount`, `currency` | Nonnegative currency amount, or `null` for unknown. Currency: USD/EUR/GBP/CAD/AUD/NZD/JPY, or null only with unknown amount. Credits stay in units, not currency |
| `evidence` | Short provenance description, e.g. sanitized report reference or rate assumption; not raw provider response/invoice |
| `evidenceUrl` | Optional public HTTPS source without credentials, query strings or fragments. Never fetched automatically |

Unknown amounts require `costKind: unknown`; explicit 0 is allowed for the other provenance types. The app does not verify imported provider assertions. All text is data, never executable content. Supported identifiers contain ASCII letters/digits, spaces, periods, underscores and hyphens and begin with an alphanumeric character. Provider-native request IDs should be mapped to internal aliases if they expose account/secret information.

Use one cost-bearing event for an operation; a multi-unit model call can be split into input/output events with distinct stable component IDs if each contains only that component's cost. Never duplicate a whole-call amount across both components. Do not import the same charge once as a manual invoice and again as provider-reported usage. Exact duplicate IDs are skipped; semantic overlap under different IDs is not detected.

## Snapshot and CSV

A private snapshot has `version: 1`, `mode: private`, `events`, `stages`, `budgets`, and `checklist` arrays. JSON imports replace the private snapshot after confirmation. CSV is events only, in the template's exact header order; blank amount/currency cells mean null. It atomically appends, skips identical IDs and rejects conflicting IDs. CSV exports neutralize formula prefixes with a leading apostrophe; those sanitized text values remain sanitized on reimport.

`stages` contains one record per `month/project/batch` with `discovered`, `audited`, `qualified`, `prototypes`, and `call_ready` counts. Use deduplicated outcomes, not attempt counts. Each count is a nonnegative integer or null. A UI save replaces that scope; duplicate snapshots in a JSON import are rejected. Counts may span different definitions, so the app does not invent a funnel or assume every stage decreases monotonically. A batch crossing months needs explicit per-month allocation of both costs and counts. Subscription overhead without a matching outcome scope intentionally leaves per-outcome ratios unknown.

`budgets` contains ID, month, scope (`monthly`, `provider`, `project`, `batch`), target, amount, currency and threshold percentage (1–100). Batch labels should be unique across projects when a batch-scoped budget is used: its scope matches that label globally. Monthly target is `all`. `checklist` contains reviewed provider labels only; it never establishes a connection.

## Outreach-Engine adapter

Implemented against [the v1 contract at a114454](https://github.com/NateKeola/Dogfood/blob/a11445487f615fbffa89bfca653d9b3e0c8c8bdd/projects/outreach-engine/docs/USAGE.md). Select its private `usage.jsonl` export in the import control. The adapter validates every line before appending anything; stable IDs support identical reimports. It does not copy the engine, read its workspace, or import prospect records.

| Source | Dashboard mapping |
| --- | --- |
| `version` | Must equal 1 |
| `event_id`, `run_id`, `batch_id` | `id`, `run`, `batch` |
| `provider`, `operation`, `units`, `unit`, `timestamp`, `amount`, `currency` | Preserved; unsupported currency or invalid UTC timestamp is rejected |
| `cost_basis: estimated` | `costKind: estimate`, irrespective of provenance |
| `cost_basis: actual` + `provider_response` or `invoice` | `provider_reported` (still an importer's assertion, not independent invoice verification) |
| Other `actual` provenance, including `local_execution` | `manual`, with exact source basis/provenance retained in the evidence label |
| `cost_basis: unknown` | `unknown`; both amount and currency must be null |
| No project field | Fixed `project: outreach-engine` |
| No status or attempt field | `status: unknown`, `attempt: null`; no invented completion/retry claim |
| No category field | `category: usage`; this exporter does not produce subscription totals |

Local-preparation/disabled-no-request zeros describe only those operations. They do **not** establish zero API subscription spending, zero provider invoices, completed audits or qualified leads. No stage counts are inferred from units. Credits, minutes, requests and tokens are never summed into a common usage number. Source timestamps must already be UTC; stage allocations across months remain explicit.

The source has no synthetic flag, so opaque IDs cannot prove whether a file is real. The built-in fixture uses reserved `synthetic-` IDs and is rejected in private mode. Review each private import; do not rename demo IDs to bypass separation. The [adapter tests](test/outreach.test.mjs) cover mapping, duplicates, unknowns and zero scope. Paid reconciliation with separate estimate/actual IDs requires future explicit linkage; do not append overlapping charges now.
