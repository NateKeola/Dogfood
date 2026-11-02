# Small-business service opportunities

Reviewed **2026-11-02**. Public research and proposed experiments; no customers, prospects, credentials, account usage, or private billing data. This project does not establish willingness to pay, validated demand, or realized results.

## Decision memo

Pilot a **quote-request repair and website-care service for established residential cleaning businesses in one service area**, selected only when the owner has capacity for additional recurring jobs and an observable inquiry problem. Start with five discovery interviews and at most three paid implementations. A broken form, unclear service boundary, or unanswered recurring question is easier to demonstrate and measure than a promise of AI visibility. Industry selection is a hypothesis; the exact locality remains open.

The evidence supports investigating this narrow workflow, not assuming every business needs more leads. Jobber's survey of 1,050 US home-service owners reports that 80% were fully booked or close to it, while cleaning businesses had more open capacity. Communication and quoting consumed substantial owner time. These are vendor-sponsored self-reports, not measured demand for this proposed service. [Jobber report](https://www.getjobber.com/home-service-trends-report/)

Published prices show distinct products. Oak Harbor advertises a five-page site at $175/month with a 12-month minimum, and separates ongoing SEO from website care. WebFX advertises local SEO from $575/month and SMB SEO from $2,900/month. These are individual advertised offers, not a market median or proof of results. [Price comparison](market-prices.md)

Test **$399 for a bounded repair sprint**, followed by optional **$149/month care**. Offer a standalone diagnostic at **$99**, credited against the $399 total if the customer proceeds within 30 days; do not count the credit twice. These are price experiments, not established rates. A lower $99/month care variant should only proceed if actual time and costs support it. Let customers buy the completed repair without a retainer. Keep a client-owned domain, explicit export rights, and a clear cancellation path.

The illustrative $10/$30/$40 prices can work as capped additions on an existing invoice. They do not fund a complete managed SEO program. In the base model, a $40 standalone account leaves only about $4/month after cost allocations and replacement acquisition/onboarding. A 45-minute support month makes that account substantially negative. The model includes labor, payment processing, acquisition, onboarding, churn, and overhead; it is a scenario calculator, **not an API spend dashboard**. [Economics and assumptions](economics/README.md)

Defer distributor catalog assistants until a buyer can supply authorized product data and describe a specific search or quoting failure. Supplier APIs demonstrate that prices, inventory, variants, and customer-specific fields exist; they do not make integration trivial. Begin with read-only search over a small approved catalog and human-reviewed quote requests. [Industry comparison](industry-analysis.md)

AI-search readiness should initially mean accurate, crawlable, useful pages and measured referral/lead quality. Google says its AI search features require no special AI files or additional schema. That guidance is specific to Google; it does not establish how every other assistant ranks sources. No file, schema change, or monitoring score guarantees citations. [Google guidance](https://developers.google.com/search/docs/appearance/ai-features)

**Reddit evidence remains unavailable in this project.** Official policies require commercial permission; no suitable authorization was established. We reviewed policy pages and stopped before collecting community threads. The evidence ledger has zero observations and includes a bounded future protocol. A search connector is not proof of a commercial content license. [Reddit access review and ledger](reddit-evidence.md)

## Deliverables

- [Industry/ICP comparison](industry-analysis.md): buyers, alternatives, integration friction, qualification and unknowns.
- [Published market prices](market-prices.md) and [CSV](data/market-prices-2026-11-02.csv): prices and scope, without blending tools, agencies and surveys.
- [Service menu](service-menu.md): prototype status, access, effort, caps, acceptance and price tests.
- [Economics](economics/README.md): reproducible model, public assumptions, sensitivity outputs.
- [Reddit evidence/access ledger](reddit-evidence.md): current limits and an unexecuted sampling method.
- [Pilot and research backlog](pilot-backlog.md): decision gates, measurements and next evidence.
- [Source register](sources.md): review dates, caveats and search coverage.

## Status and boundaries

Documentation and the economics calculator are delivered. Customer-facing prototypes, commercial connections, deployments, outreach and Reddit sampling have **not** been performed. No claims of customer benefits are presented as observed results. Keyword volumes, municipality business counts and prospect sourcing belong to separate research; no values are invented here.

Based on Dogfood main commit `d4b4498aa9c3c17ec1c098cf1272f37b78f40b8b`. The checkout contained README guidance but no AGENTS.md, .agents skills or Software Factory files. All changes stay inside this research directory.
