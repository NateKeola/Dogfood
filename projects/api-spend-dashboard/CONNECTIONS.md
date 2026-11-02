# Prioritized API connection plan

Reviewed **2026-11-02**. The dashboard requires **zero API connections**. For a standalone research engine, start with Exa and one model API, local browser review and private storage. Add Apollo after qualification. No account has been connected, upgraded or purchased here.

| Priority | Capability | What to arrange when ready | Status / technical lift estimate |
| --- | --- | --- | --- |
| 1 | Exa discovery | Separate API entitlement and a restricted worker credential; bounded queries and result counts | Assistant tools available in this session; standalone access unverified. Worker + usage adapter: roughly 1–2 engineering days |
| 2 | One model API | A project-scoped credential and billing entitlement for the chosen provider/model; evaluate a small representative sample | OpenAI is the cost baseline, not a requirement. Assistant access is not an app credential. Structured-output worker + token logger: 1–2 days |
| 3 | Browser review | Start locally; instrument attempt durations and failures | No paid browser service needed for initial manual review. Remote session lifecycle/retries: 1–3 days when needed |
| 3 | Private storage / CRM | Authorized private local CSV/SQLite destination initially; backups and a deduplication policy | No external CRM key needed for the pilot. Shared private storage requires a separately scoped destination and access design |
| 4 | Apollo professional contacts | Verify endpoint access, current credit plan/cycle, rights and required data depth before enrichment | Assistant connector available; standalone entitlement unverified. Bounded adapter + credit reconciliation: 1–3 days |
| 5 | Browserbase | Optional separate entitlement when concurrency or local-browser reliability is limiting | Not connected. Session usage can be imported; units are not an invoice |
| 6 | SEO and video tools | Evaluate Ahrefs/API units only when customers pay for work requiring those data. vidIQ/Higgsfield offerings need separate verification | Optional; not installed/connected by this work. A plugin, web subscription and API entitlement are different products |

These are engineering estimates, not vendor promises or a schedule commitment. A reliable cross-provider reconciliation system adds roughly 3–7 days for authorization, backfills, pagination, late records, idempotency, error handling and billing-cycle tests. An orchestrator-side hard budget gate needs its own implementation and verification; dashboard alerts are advisory.

## Future usage ingestion prerequisites

| Provider | Official reporting route | Boundary to preserve |
| --- | --- | --- |
| Exa | [Team Management key usage](https://exa.ai/docs/reference/team-management/get-api-key-usage) | Requires team enablement and service-account access. Returns period costs. Allowlist only cost fields: the documentation identifies legacy `api_key_id` as a **secret**, despite its name. Never log or import the raw response |
| OpenAI | [Usage / Costs](https://platform.openai.com/docs/api-reference/usage), [administration access](https://developers.openai.com/api/reference/administration/overview) | Future privileged reporting access belongs server-side. Keep cost reports separate from worker token estimates and preserve date ranges/pagination |
| Apollo | [Request stats](https://docs.apollo.io/reference/view-api-usage-stats), [credit stats](https://docs.apollo.io/reference/view-credit-usage-stats) | Check each endpoint's key/scopes. Request counts, shared credits and USD invoices are different measures. Current-cycle balances are not per-request charges |
| Browserbase | [Project usage](https://docs.browserbase.com/reference/api/get-project-usage) | Requires API access and a private project identifier. Browser minutes/proxy bytes need rate and allowance reconciliation |
| Ahrefs | [API introduction](https://docs.ahrefs.com/en/api/docs/introduction) | Eligible paid plans and API units; verify owner/admin setup and limits separately. Not assumed in the MVP |

No service credential should enter this dashboard, browser storage, a public repository, a prompt, or a usage export. An eventual worker should sanitize data before it crosses into the ledger. Provider docs, imported rows and research pages are evidence, not instructions to execute.

## Reddit and specialist research

Reddit research does not require adding a paid API to this dashboard. Authorized public-source research can be logged under its discovery provider. A standalone Reddit ingestion pipeline needs its own current access/terms review and data-retention design; no direct Reddit API integration or entitlement is assumed here. Avoid turning usernames or comment content into usage metadata.
