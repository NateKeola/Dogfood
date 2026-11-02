# Verification record

Date: **2026-11-02**. Runtime: Node.js 22.14.0. All records used here are invented test data; no provider APIs, real billing records, email, calls or outreach were used.

Story: a user enters or imports sanitized usage metadata locally, validation preserves provenance and unknowns, browser storage retains private records, and the UI shows budget signals and scoped costs without claiming a billing connection.

## Passed

- `npm test`: **23 tests**, using the built-in Node runner. Arithmetic, retry rounding, included credits and subscription allocation; unknown versus explicit zero; mixed currencies/provenance; UTC month boundaries and invalid dates; missing/zero/misaligned stage counts; failed/incomplete cost retention; scoped budgets; CSV roundtrip/quoting/formula neutralization; duplicate conflict atomicity; unsafe URLs and extra fields; synthetic/private isolation; size bounds; freshness; no network API calls in the UI.
- Outreach-Engine v1 adapter tests: stable JSONL deduplication, source cost/provenance mapping, null unknown costs, local-only zero scope, missing status/attempt preservation, malformed/extra-field rejection, no derived stage counts, and synthetic fixture rejection in private state.
- `npm run check`: application, core and server parse successfully.
- `node scripts/verify-server.mjs`: local root returns 200; strict CSP and no-store headers present; private/env/repository/missing paths return 404; POST returns 404; unexpected Host returns 403. Node fetch normalized the first attempted Host override, so the final test uses raw `node:http` to exercise the actual header.
- Chrome desktop visual inspection at the existing 1728×906 viewport: synthetic banner, separate cost cards, provider table, budget warnings and denominators rendered. Private mode with no records displayed unknown costs and unknown outcome ratios.
- Chrome mobile visual inspection at **390×844**: overview and scenario form reflowed; navigation scrolls horizontally, filters/cards wrap, and fields remain usable. Temporary viewport override was reset.
- Browser scenario interaction: the default 100-candidate estimate showed $0.5984 known subtotal plus 14 unpriced Apollo credits. Entering an illustrative $0.10 overage-credit rate and selecting Browserbase produced $21.9984, with the $20 subscription shown separately from usage. These were temporary forecasts, not actual spend.
- Browser text-import error path: a demo-mode JSON snapshot in private mode was rejected visibly, retaining the input text. The paste path uses the same validator as file imports.

## Verification limits

- Browser file chooser selection was blocked because the Chrome extension does not have file-URL access. No setting was changed. The attempted file was the public synthetic fixture; no real data was uploaded. A paste-import path was added and its rejection flow verified.
- A subsequent **empty private snapshot** test reached its replacement confirmation, then browser automation stalled on the JavaScript dialog. Acceptance/persistence could not be independently confirmed. The attempted snapshot contained zero events/counts/budgets and only the reviewed `exa` checklist label. No actual billing record was involved. Later browser operations also timed out; the dialog may need dismissal in Chrome.
- Consequently manual-add/delete, successful browser snapshot replacement/persistence, browser reset, and browser-generated downloads are not claimed as end-to-end passes. Their data/validation paths have unit coverage. After the user restricted further downloads, no export download, package installation, dataset download or further repository fetch was attempted.
- An optional Python JSON Schema check was unavailable because `jsonschema` was not installed in the default interpreter. No package was downloaded. The checked-in fixtures are covered by the runtime validators; a separate standards-validator certification is not claimed.
- No live provider entitlements, usage endpoints, invoices, hard caps, authentication, hosted deployment or cloud synchronization have been tested or connected.

## Local preview

`http://127.0.0.1:4176` is served by the loopback-only process started for this task. The server remains available while that local process runs. It is not an always-online service. The UI was opened in Chrome; its final automation state is subject to the dialog limitation above.
