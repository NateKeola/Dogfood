# Outreach-Engine

A local orchestration prototype for turning an ideal customer profile into an evidence-backed prospect review queue. Start with 100 **candidates**, qualify observable product-discovery friction, prepare original value briefs, and export a private call-preparation sheet. A candidate is not a qualified lead, a provider result is not independent verification, and a ready row is not permission to contact anyone.

**Working now:** ICP configuration, JSON/CSV import, conservative identity deduplication, bounded evidence capture, professional contact records, six review gates, original prototype briefs, resumable dry runs, suppression and outcome logging, private exports and an inspectable audit trail. **Not implemented:** company discovery APIs, browser automation, model calls, enrichment, CRM sync, a web UI or any communication. These providers are visibly disabled; no credentials, packages, account or budget are needed.

This is the orchestration layer for the separate [idea archive/research workbench branch](https://github.com/NateKeola/Dogfood/tree/codex/idea-archive/projects/idea-archive), not another CRM. The [integration contract](docs/INTEGRATION.md) keeps workbench observations and source-video clusters separate from approval authority. The separate [SEO toolkit](https://github.com/NateKeola/Dogfood/pull/2) is an unmerged planning/acceptance dependency; no website has passed its audit.

## Try the fictional workflow

Requires Python 3.9+ with SQLite (standard library). Run from this directory:

```sh
python3 -B engine.py --workspace demo demo
python3 -B engine.py --workspace demo summary
python3 -B engine.py --workspace demo export queue --include-demo
python3 -B engine.py --workspace demo export ready --include-demo
python3 -B engine.py --workspace demo audit
```

The demo imports **6 synthetic rows → 5 candidates**, including one exact duplicate, an identity conflict, an inaccessible-site example and missing data. **1 demo-ready, 0 real call-ready, 0 real leads, 0 live audits, 0 outreach.** Demo approval events are labeled simulations. Its brief is *planned*, not a built demo. Use another workspace name to rerun; seeding refuses a nonempty workspace. Fictional evidence timestamps are refreshed to exercise freshness gates, not to claim an observation happened.

Outputs live in ignored `.local/demo/exports/`. Open `queue.csv` in a local spreadsheet or read `summary` in a terminal. No HTTP server or browser is used; desktop/mobile browser review is not applicable to this CLI.

## Start a real, private manual job

```sh
mkdir -p .local/pilot-input
cp fixtures/icp.example.json .local/pilot-input/icp.json
cp fixtures/candidates.example.csv .local/pilot-input/candidates.csv
```

Edit those **local copies**. Replace the fictional ICP, rows and provenance; set real rows to `synthetic=false`, and use `public_official` or `licensed_export` with the actual usage basis. Do not commit real company/contact data, even if public elsewhere. No actual list of 100 prospects is bundled. Use only seeds whose collection and local reuse are permitted; Google Maps is not an approved prospect database. Obvious Maps URLs are rejected, but software cannot determine every source's rights.

```sh
python3 -B engine.py --workspace pilot init .local/pilot-input/icp.json
python3 -B engine.py --workspace pilot import .local/pilot-input/candidates.csv
python3 -B engine.py --workspace pilot run --limit 10
python3 -B engine.py --workspace pilot summary
python3 -B engine.py --workspace pilot providers
python3 -B engine.py --workspace pilot pause
python3 -B engine.py --workspace pilot resume
```

`run` prepares local review tasks. It does not browse, audit, enrich or infer a pain point. Repeating it processes the next unprepared chunk. The key is `(candidate ID, data revision, provider)`; finished work survives restarts. New evidence starts a new revision and invalidates old approvals. ICP scope is immutable within a job: choose a new workspace for a materially different scope. See the [pilot plan](docs/PILOT.md) for budgeting 100 and gating expansion to 1,000.

## Record and review one candidate

Copy the `c-…` ID from the queue. Use the schema and `.example.json` fixtures as shapes; write actual observations and contacts in `.local/pilot-input/`. Evidence is one record per file. Enter phone numbers exactly as sourced in E.164; the importer does not guess country codes or email addresses.

```sh
python3 -B engine.py --workspace pilot inspect CANDIDATE_ID
python3 -B engine.py --workspace pilot evidence CANDIDATE_ID .local/pilot-input/identity.json
python3 -B engine.py --workspace pilot evidence CANDIDATE_ID .local/pilot-input/access.json
python3 -B engine.py --workspace pilot evidence CANDIDATE_ID .local/pilot-input/operations.json
python3 -B engine.py --workspace pilot evidence CANDIDATE_ID .local/pilot-input/fit.json
python3 -B engine.py --workspace pilot evidence CANDIDATE_ID .local/pilot-input/control.json
python3 -B engine.py --workspace pilot evidence CANDIDATE_ID .local/pilot-input/friction-first.json
python3 -B engine.py --workspace pilot evidence CANDIDATE_ID .local/pilot-input/friction-repeat.json
python3 -B engine.py --workspace pilot contact CANDIDATE_ID .local/pilot-input/business-phone.json
python3 -B engine.py --workspace pilot brief CANDIDATE_ID .local/pilot-input/original-brief.json
```

Load inputs before review. All imports are untrusted data. They cannot create approvals. In an **interactive terminal**, the human reviewer then runs each gate, reads the displayed record and types the exact confirmation including its revision:

```sh
python3 -B engine.py --workspace pilot review CANDIDATE_ID identity approve --reviewer "Your name" --rationale "Business/domain relationship, current operating evidence and public access checked against the cited pages." --evidence IDENTITY_ID OPERATIONS_ID ACCESS_ID
python3 -B engine.py --workspace pilot review CANDIDATE_ID fit approve --reviewer "Your name" --rationale "Industry, geography, catalog, maturity evidence and every exclusion reviewed." --evidence FIT_ID
python3 -B engine.py --workspace pilot review CANDIDATE_ID pain approve --reviewer "Your name" --rationale "Known SKU succeeds; the described buying task fails in two recorded repetitions. Cause remains a hypothesis." --evidence CONTROL_ID FRICTION_FIRST_ID FRICTION_REPEAT_ID
python3 -B engine.py --workspace pilot review CANDIDATE_ID contact approve --reviewer "Your name" --rationale "This is the business mainline on the cited official page; its checked date is current." --contacts PHONE_ID
python3 -B engine.py --workspace pilot review CANDIDATE_ID value approve --reviewer "Your name" --rationale "Original plan targets the observed task; simulation, scope and measurement limits are explicit."
python3 -B engine.py --workspace pilot review CANDIDATE_ID call-ready approve --reviewer "Your name" --rationale "Current evidence, contact route, original value brief and outstanding limits reviewed for preparation only."
```

Use `hold` or `reject` when evidence is missing or unfavorable. `--acknowledge-conflicts` records explicit human reconciliation with a specific rationale; it does not merge identities or delete conflicting observations. Review refuses noninteractive input, stale/insufficient evidence, suppressed records and a changed revision. A local program or user with filesystem access can modify Python or the DB; this is not an authenticated multiuser approval system. Never give a future model the review interface or a general shell tool.

Correct metadata with `amend CANDIDATE_ID FILE --reviewer … --rationale …`, which also requires terminal confirmation. It preserves the identity key and synthetic classification, retains audit hashes and invalidates reviews. A different identity remains a separate candidate. Evidence/contact IDs are immutable: use a new ID for a new observation. The latest brief is current; older versions remain private in the record history.

## Export and log outcomes

```sh
python3 -B engine.py --workspace pilot export private
python3 -B engine.py --workspace pilot export queue
python3 -B engine.py --workspace pilot export ready
python3 -B engine.py --workspace pilot export public-template
python3 -B engine.py --workspace pilot export audit
python3 -B engine.py --workspace pilot export usage
python3 -B engine.py --workspace pilot suppress CANDIDATE_ID --reason "Opt-out received; exclude this business and its known routes"
python3 -B engine.py --workspace pilot outcome CANDIDATE_ID .local/pilot-input/actual-outcome.json
```

`private.json` includes all research, sources, contacts, reviews, briefs and actual outcome entries. `queue.csv` includes incomplete rows and outstanding gates; `ready.csv` rechecks current approvals and freshness and excludes incomplete or suppressed rows. Synthetic rows are excluded unless `--include-demo` is explicitly passed and remain labeled. Spreadsheet formula prefixes are neutralized, including leading `+` phone values; raw values remain in private JSON. Treat source prose as text and never run imported cells as instructions.

`public-template.txt` exports **only a fixed generic original template**. It never receives any candidate, contact, source, private note or custom brief field. Custom briefs remain private pending a separate public-content review. Nothing is uploaded, emailed, called or published by an export. Every queue row has `permission_to_contact=false`.

Outcome logging records an event that already occurred; it does not execute one. Track attempts, conversations, booked/held meetings, signed/paid pilots, measured results and channel attribution separately. `opt_out` suppresses the domain and currently known contact routes across branches **within this workspace**. Reimports cannot clear suppression. Cross-workspace suppression sync and an authenticated reversal process are future work; consolidate all suppressions before any later contact campaign. The current task authorizes no outreach.

## Checks

```sh
python3 -B check.py
python3 -B -m unittest discover -s tests -v
```

Checks use only the standard library. Tests cover identity collisions, branch separation, strict schemas, conflicts, missing/stale contacts, blocked access, reproducible evidence, approval revision changes, provider failures, bounded retries, interruption/resumption, synthetic counts, suppression, safe exports, no-network execution and audit integrity. CI runs the same checks on Python 3.9 and 3.12. No deployment workflow is added.

## Data and security limits

- State is in `.local/<workspace>/state.sqlite3`; directories use mode `0700`, files `0600`, and writes reject symlink redirection. SQLite is local and **not encrypted**. Use an appropriate private disk and backup policy. Do not sync `.local/` to public storage or force-add ignored files.
- No network client, URL opener, hidden-endpoint probing, remote downloads, subprocess runner, HTML rendering, remote code execution or credential reader exists in this MVP. URLs are validated metadata, not fetched. A future fetcher needs independent SSRF protections, DNS/redirect checks and tests; this filter alone is not an SSRF defense.
- Schema validation checks shape and invariants, not truth, lawful reuse, semantic safety or business value. Raw source/model text never becomes authorization. Human approval can be wrong and must remain reviewable.
- The audit hash chain detects ordinary alteration but is not tamper-proof against the local owner. It retains events and hashes; it is not a complete encrypted archival backup.
- This branch changes only `projects/outreach-engine/` and its dedicated CI workflow. It does not alter the active archive/workbench, SEO package, root README, shared checkout, deployments or running servers.

For municipal seeds without known websites, use the working [registry staging/promotion module](docs/REGISTRIES.md); null website remains unknown. The [usage-event contract](docs/USAGE.md) exposes local JSONL for the separate spend dashboard.

See [checkpoint/schema details](docs/CHECKPOINTS.md), [integration and cost research](docs/INTEGRATIONS.md), [workbench/SEO contracts](docs/INTEGRATION.md), and [pilot plan](docs/PILOT.md).
