# API Spend Dashboard

A separate, local-first reference for the Dogfood research and outreach engine. The code and invented demonstration data are public. Real usage records stay in your browser or private exports. **No live billing or API integration is connected.**

## Run

Requires Node.js 20 or newer. No install, API key, account, or runtime dependency is needed.

```sh
cd projects/api-spend-dashboard
npm start
```

Open **http://127.0.0.1:4176**. The server binds only to loopback and serves an explicit list of public UI assets. It does not serve private files, import files, repository contents or documentation. `PORT=4186 npm start` can use another free port; do not stop another project's preview. This is available only while the local server runs, not an always-online hosted service.

## What it does

- Separate synthetic demonstration and private modes; private records persist at this exact browser origin. Synthetic demo is conspicuous and resets on reload.
- Provider inventory and prioritized connection checklist. A reviewed checklist item never changes “not connected.”
- UTC monthly totals, project/batch filters and seven separately tracked currencies. Provider-reported, manually entered, estimated and unknown costs remain distinct.
- Explicit zero costs require a record and provenance. No record means unknown, never verified zero. “Provider-reported” is an importer assertion, not independent verification.
- Monthly, provider, project and batch budgets with thresholds. **Alerts do not enforce caps or stop jobs.**
- A provider-neutral CSV/Outreach-Engine JSONL ledger and JSON snapshot import, manual entry, backups, deletion and typed-confirmation reset.
- Outcome costs for discovered candidates, audited sites, qualified accounts, prototypes and call-ready leads. Missing/zero counts or mismatched batch coverage yield unknown, not a zero-cost claim.
- Failed/incomplete events and separate retry attempts retain cost. 100/1,000-candidate forecasts expose usage, included allowances, subscriptions and overhead allocation.

Read [the connection plan](CONNECTIONS.md), [pricing assumptions](PRICING.md), [usage contract](USAGE_CONTRACT.md), and [verification record](VERIFICATION.md). The [JSON Schema](usage-ledger.schema.json), [empty CSV template](templates/usage-template.csv), [empty private JSON template](templates/private-empty.json), and [synthetic fixture](fixtures/synthetic-demo.json) are included. The fixture is deliberately rejected in private mode.

## Private data workflow

1. Choose **Private ledger**. Add reviewed metadata by hand or import sanitized events through **Data & privacy**. Keep only opaque project/batch/run labels; never include prospect text, contact information, account IDs, credentials, full invoices or raw provider responses.
2. Use one stable ID per billable operation/attempt. CSV is an atomic append: identical duplicates are skipped, conflicting IDs reject the import. To correct an estimate into an actual, remove the old event and add its corrected replacement; do not add a second charge under a fresh ID.
3. Add outcome counts for the exact UTC month/project/batch and budgets for the desired scope. Stage snapshots replace matching scopes instead of accumulating duplicates.
4. Export private backups outside Git or into this project's ignored `private/` directory. Exports named `*.private.json` and `*.private.csv` / `*.private.jsonl` are also ignored here. Never force-add them. Ignoring a path is not encryption or an automatic privacy guarantee.
5. Reconcile with provider records. Do not combine an aggregate invoice/usage total with the same underlying per-call charges. This MVP cannot detect semantic overlap under different IDs.

Data lives unencrypted in localStorage under `dogfood.api-spend.private.v1`. Browser profiles and ports do not share it. Clearing browser storage removes it. Anyone with access to the profile can read it. No secrets belong in browser storage; there is no key input or key store. A failed load preserves the original storage for recovery export rather than silently overwriting it. There is no cloud sync, telemetry, backend database or authentication service.

## Validation and limits

```sh
npm test
npm run check
```

Tests use Node's built-in runner; no third-party install or provider call is needed. See [VERIFICATION.md](VERIFICATION.md) for completed UI and server checks. Optional runtime HTTP checks: `node scripts/verify-server.mjs` while the server is running.

Imports are capped at 2 MB and 10,000 events, reject unexpected fields, invalid dates/currencies/amounts, unsafe evidence URLs, and conflicting IDs. Text is escaped before HTML rendering; CSV exports neutralize formula prefixes. A strict CSP blocks remote fetches and scripts. These checks do **not** determine whether a free-text field contains private information. The user must inspect data before importing or publishing.

Negative adjustments/refunds, FX conversion, taxes, invoice reconciliation, billing-cycle proration, live billing ingestion, and hard spending gates are not implemented. Enter nonnegative net charges with clear provenance or keep unsupported adjustments outside this MVP. Scenario settings are temporary; JSON backup covers the ledger, counts, budgets and reviewed checklist. Pricing is a dated baseline, not a quote. No outreach, email, calls, purchases, deployment or provider account changes occur.

## Repository fit

The inspected main branch had no AGENTS.md, Software Factory workflow, or `.agents/skills` instructions. This project follows the root standalone-project convention. It does not modify the archive, research workbench, Outreach-Engine, SEO review, root README or shared workflows. The JSONL adapter supports Outreach-Engine v1 at commit a11445487f615fbffa89bfca653d9b3e0c8c8bdd; this is a local import path, not a live connection.
