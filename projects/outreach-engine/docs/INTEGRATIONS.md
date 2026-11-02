# Minimum integration stack and cost assumptions

Research checked **November 2, 2026** against the primary pages linked below. Prices and access can change; recheck the actual account, plan and terms before enabling an adapter. No paid API request, enrichment, credential creation or account connection was performed. The working prototype's observed external-provider spend is **$0** because it makes **zero external requests**. Assistant connectors do not supply app API credentials or approve a budget.

## Recommended order

| Need | Minimum pilot choice | Optional next integration | Access, quota, price and tradeoff |
|---|---|---|---|
| Company seeds | A permitted local CSV/JSON; official registry subsets | Exa Search API | Key and an approved account budget needed. Auto search: $7/1,000 requests for up to 10 results; Lite $4; Deep $12. More results/content options can add cost. Default search 10 QPS; deep modes 5 QPS. Search discovers candidates, not verified need. [Pricing](https://exa.ai/pricing), [limits](https://docs.exa.ai/reference/rate-limits), [API](https://docs.exa.ai/reference/search) |
| Registry discovery | Official LA or Santa Monica metadata, then minimized permitted export | Source-specific adapter after license/access review | Free public access does not mean complete coverage or unrestricted reuse. Municipal record IDs are not necessarily legal-entity IDs. [Registry module](REGISTRIES.md) |
| Website inspection | Human browser, visible public pages, bounded task card | Browser automation after a scoped security review | No new service required. Labor is the main cost. Login/CAPTCHA/403/429 stay blocked/unknown. No source-code execution or private logs. The runner only stores observations. |
| Contact routes | Official business contact page and public professional roles | Apollo search/enrichment | Search and enrichment are distinct. People Search does not return email/phone, uses 0 credits, allows 100/page and up to 500 pages. It needs appropriate API-key/OAuth access; free-account eligibility can vary. [People Search](https://docs.apollo.io/reference/people-api-search) |
| Licensed contact enrichment | Only after a candidate passes identity, fit and pain review | Apollo enrichment for a small qualified subset | Current documented people enrichment is 1–9 credits/person: demographic/email 1, returned mobile +8; bulk supports up to 10/request. Organization search is 1 credit/page (up to 100 results); organization enrichment 1/company. Waterfall can cost more and can charge unsuccessful lookups. Confirm the user's plan and actual balance; no dollar-per-credit conversion is established here. [API pricing](https://docs.apollo.io/docs/api-pricing), [plan page](https://www.apollo.io/pricing) |
| API throttling | Disabled adapters | Account-specific throttler | Apollo limits are shared by team and endpoint. Its current free enrichment table shows 50/minute (bulk 20), 200/hour (bulk 100), 600/day; plan/endpoint and legacy limits differ. Honor response headers/`Retry-After`; don't infer the connected account's allowance. [Limits](https://docs.apollo.io/reference/rate-limits) |
| Email verification | Skip for a calling-first pilot unless needed | Hunter Email Verifier | API key/account needed. Pricing lists 0.5 credit/verification, with unknown outcomes not charged; free plan 50 credits/month. API reference lists 10 requests/second and 300/minute for verifier. Paid annual Starter is shown as $34/month billed $408/year, 24,000 credits/year; this is an annual commitment, not a proposed purchase. [Pricing](https://hunter.io/pricing), [Verifier API](https://hunter.io/api-documentation/v2#email-verifier) |
| Private system of record | Local SQLite and local CSV | Existing approved private CRM | $0 new hosted service for MVP. Local SQLite is unencrypted and single-owner; multiuser work needs authenticated roles, encrypted storage/backups and shared suppression. Do not put contact rows or internal notes in the public repository. |
| Original prototype | Existing Codex workflow, local fictional/licensed catalog, workbench brief | A reusable product-finder module after business validation | No new API or hosting purchase needed for this engine. A specific demo plan and measured result precede a “built” claim. Existing model subscription/usage costs are not estimated here. SEO toolkit remains a separate dependency. |
| Human calling | Later: existing approved business phone and manual disposition logging | Existing CRM dialer if justified | No calling provider is required to prepare a list. No new phone number, voice API, dialer, mailbox or sequence is provisioned. Future calls require separate authorization and the applicable privacy/suppression/contact policy; this prototype cannot call. |
| Spend visibility | `export usage` produces local schema-validated events | Separate API Spend Dashboard | See [usage contract](USAGE.md). No secrets, account IDs, prospect names, query text or source content. Events do not claim to be an invoice. |

Apollo's public plan page did not expose a stable numerical seat-price table in the fetched content, so subscription totals remain **unknown**, not guessed. Its terms restrict redistribution of contact data and competing/resold uses; review the intended internal workflow and license before integration. This public code must never include Apollo-derived contact records. [Apollo service terms](https://www.apollo.io/terms), [API terms](https://www.apollo.io/terms/api).

Do not add a larger automation stack, second CRM, paid scraper and dialer before the manual pilot demonstrates useful matches. Exa finds source candidates; browser review proves the behavior; enrichment fills an already justified contact gap. Each can be substituted without changing the human gates.

## Illustrative variable API budget, not observed spend

This example assumes **100 candidate inputs**, not 100 contacts found or businesses audited. It uses up to 10 Exa Auto results per search, one content type, no summaries, no retries and no waterfall. Result duplication, coverage, taxes, subscriptions and human time are excluded. The same official Exa rates above imply:

| Optional operation | 100-candidate planning case | 1,000-candidate linear illustration |
|---|---:|---:|
| Discovery searches | 30 × $0.007 = **$0.21** | 300 × $0.007 = **$2.10** |
| Contents, if needed | 200 pages × $0.001 = **$0.20** | 2,000 × $0.001 = **$2.00** |
| Combined example | **$0.41**, excluding everything above | **$4.10**, excluding everything above |
| Apollo person enrichment, 25% shortlisted, one person/company | **25–225 credits** for 25 people, conditional on returned data | **250–2,250 credits** for 250 people |
| Hunter verification, if each shortlisted person has an email | **12.5 credits** for 25 verifications | **125 credits** for 250 verifications |

These calculations do not imply that 30 searches yield 100 unique companies, that a contact is returned, or that purchased credit balances match these amounts. Provider credits are different units and must not be summed. Account billing may be subscription-based or use prepaid minimums; verify privately. Current configured limits are zero external cents/credits and all adapters remain disabled. A conservative proposed initial API spending ceiling can be chosen only after a real 10-record sample and account/terms review; no ceiling is approved by this document.

Exa's free tier currently advertises $10/month plus an onboarding bonus, with eligibility and expiry rules; it is not evidence the user's account has that allowance. No signup, recharge or credit purchase was attempted. [Billing details](https://docs.exa.ai/reference/rate-limits).

## Excluded acquisition route

Google Maps/Places must not become the exportable prospect database for this MVP. The current Maps Platform terms restrict scraping/export, storage/caching and certain directory/advertising uses. No Maps scraping, mass Places querying or workaround through another scraper is proposed. Use permitted official/licensed seed sources instead. [Google Maps Platform terms, section 3.2.3](https://cloud.google.com/maps-platform/terms).

## Adapter activation checklist

Before any real external adapter is implemented: establish permitted use and retention; choose the exact endpoint; obtain user-authorized app credentials through an approved secret store; check the actual account's limits; approve an explicit sample and cost cap; implement least-privilege access, payload minimization, time/size bounds, safe retries and spend reservation/reconciliation; and test with synthetic responses first. Provider credentials are never extracted from assistant connectors. Agents may propose evidence and briefs; only the reviewer may approve gates.

A future browser/network adapter also needs allowlisted public targets, public DNS/IP checks before connection and on every redirect, loopback/private/link-local/metadata blocking, DNS-rebinding defenses, redirect/time/byte caps and no credential forwarding. The current metadata URL validator is intentionally not represented as that implementation.
