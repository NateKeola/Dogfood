# Living tool/service shortlist: callable local-service prospects

Reviewed 2026-11-06. This is an adoption order, not a shopping list. No account creation, purchase, subscription, credential generation, API integration, or outreach was performed for this research. Costs below are public vendor observations, not quotes; recheck currency, tax, billing term, quota and license before adoption.

## Selection criteria and starting recommendation

Prioritize (1) permission to use and retain the data for the intended workflow, (2) verified public business phone coverage in the chosen trade/geography, (3) actionable evidence per audit minute, (4) reproducibility and provenance, and (5) marginal cost. Start with first-party business websites, public search/manual inspection, a small evidence ledger, and free website diagnostics. Paid lead databases and rank grids are optional until a pilot demonstrates that they improve qualified-call yield.

Keep prospect discovery, website diagnosis, owner-only measurement, and outreach separate. A published phone number makes a business contactable, not automatically legally callable. Do not put real prospect contact data or private account information in a public repository.

## Priority 0: nearly essential to start

1. **Business websites + permitted public search/directory research.** Identify locally relevant firms and independently verify their published business phone, domain, service area and trade on their own contact/about pages. Record source URL and observation date. Search visibility is contextual, not proof of an absolute ranking. Directory access does not imply a license for bulk extraction; check terms first. Manual browser access needs no target-owner login; automated search products may require a paid account. No external paid prospecting service is essential for an initial small pilot.

2. **Evidence ledger: existing spreadsheet/CSV/CRM.** Track business, domain, public contact source, observed date, deduplication key, audit evidence, uncertainty, outreach status and suppression/opt-out status. Normalize domains and phones, but preserve source text. Recommended workflow: verify phone and trade before spending on a deep audit. Existing local files have no incremental vendor subscription; a cloud CRM is optional. Store personal contact data only where authorized, never in public issue bodies.

3. **Chrome DevTools / Lighthouse, plus PageSpeed Insights.** Public-page performance, accessibility, basic SEO and rendering checks. Inspect home, primary service and contact page on mobile; manually verify click-to-call, navigation and form affordances without submitting forms. Lighthouse can run locally; PSI is a public URL diagnostic with an API. The PSI documentation permits keyless use and recommends a key for frequent automated requests; quota must be checked for the actual project. Never equate a Lighthouse score with ranking, traffic or revenue. Lab results vary; missing field data is unknown, not failure. Use CrUX separately for field data because Google documents planned removal from the PSI API. Sources: https://developer.chrome.com/docs/lighthouse/overview and https://developers.google.com/speed/docs/insights/v5/get-started .

4. **Screaming Frog SEO Spider, free tier.** Crawl accessible public pages for broken links, redirects, titles, metadata and internal structure. Vendor advertises a free 500-URL crawl limit; paid license £199/year removes that limit and unlocks advanced features. Free is generally enough for a small-business triage. Respect site restrictions and use restrained crawl rates; no vulnerability scans, authentication bypass or form submissions. Source: https://www.screamingfrog.co.uk/seo-spider/ .

## Priority 1: useful after a pilot proves a specific need

5. **BrightLocal: local visibility, citations and grid tracking.** Useful when a real question requires repeatable keyword/location measurements, citation checks or review monitoring. Public audit features differ from account-connected listing management; changing listings/replying to reviews requires owner authorization. Pricing page shows Track at $369 annually, displayed as about $31/month for one location, with usage limits; billing term matters. API solutions are a separate offering. Do not infer a limitless prospect-audit quota from a location plan. Source: https://www.brightlocal.com/pricing/ .

6. **DataForSEO: structured SERP / business-data APIs.** Candidate for controlled batch discovery and repeatable search snapshots. Account and API credentials required; pay-as-you-go and endpoint-specific pricing. Its Business Listings page currently describes $0.012 per task plus $0.00036 per returned item; do not apply this to every endpoint, depth or priority. Vendor reports a July 2026 price update. A provider returning data does not settle downstream storage, redistribution or marketing rights: review the agreement and provenance before importing prospects. Prefer one provider pilot over parallel subscriptions. Sources: https://dataforseo.com/pricing/business-data/business-listings-api and https://dataforseo.com/update/pricing-update-in-dataforseo-apis .

7. **Apollo or another licensed B2B contact provider.** Optional enrichment when the public office line cannot reach an appropriate business contact. Test actual coverage for small local trades before paying; corporate-directory coverage may not match this segment. Credits, phone access, exports and API availability depend on plan; no universal price or phone allowance is asserted here. Apollo's pricing page says standard terms do not cover powering external products, sharing data with customers or resale. A prospecting account is not an unrestricted product-data license. Prefer public business numbers to personal mobiles where sufficient. Source: https://www.apollo.io/pricing .

8. **Google Places API (New): conditional, not the default persistent lead store.** Supports place lookup and business details; requires Google Cloud setup, billing and an API key. Field masks affect billing; phone fields fall in Enterprise tiers. Pay-as-you-go cost varies by SKU. Current platform terms restrict scraping, storage and certain derivative uses. Do not treat buying API calls as permission to create a permanent prospect database. Review the intended workflow, attribution and permitted retention before enabling. Sources: https://developers.google.com/maps/documentation/places/web-service/usage-and-billing , https://developers.google.com/maps/documentation/places/web-service/data-fields and https://cloud.google.com/maps-platform/terms .

## Priority 2: owner-authorized diagnostics after engagement

9. **Google Search Console.** Actual search impressions, clicks, query/page data and indexing diagnostics for authorized properties. Not a public prospect-audit source. API requires OAuth and the appropriate property permission; obtain least-privilege owner-granted access. Never invent traffic or indexing diagnoses from public-page observation. Source: https://developers.google.com/webmaster-tools/v1/prereqs .

10. **Google Business Profile management/performance APIs.** Owner-authorized location management and performance, not a general prospect search API. Google project access approval and OAuth setup are required; listing visibility does not grant permission to manage it. Keep all writes out of a read-only audit. Sources: https://developers.google.com/my-business/content/prereqs and https://developers.google.com/my-business/content/implement-oauth .

11. **GA4, call tracking and CRM outcomes.** Add only when the client wants measurement and grants appropriate access. Necessary to substantiate conversion outcomes, not to produce an initial public audit. Treat visitor/call data as private; recording or marketing automation introduces separate consent and legal obligations. Cost and scope remain unverified until a provider and plan are chosen.

## Defer by default

Do not buy multiple overlapping SEO suites, mass scrapers, bulk dialers or personal-mobile enrichment just to start. An automated finding should become a call topic only after human verification. Avoid publicly accessible scan/report services for secret URLs, staging links, tokens or private reports. Do not describe third-party traffic estimates as owner analytics, inaccessible pages as broken, low scores as lost revenue, or absent CrUX data as poor real-user performance.

## Compliance and operational gates

- Check source terms before collection and keep provenance/retention rules with each provider. A scraper vendor's availability is not a legal approval.
- Confirm outreach jurisdiction, number type and applicable do-not-call/consent rules before activating calls or messages. Maintain suppression and opt-outs. Public availability is not consent, and a B2B label is not a blanket exemption. FTC rules prohibit deceptive B2B telemarketing; state rules and FCC/TCPA obligations may also apply. Sources: https://www.ftc.gov/business-guidance/resources/complying-telemarketing-sales-rule and https://www.ftc.gov/policy/public-comments/telemarketing-sales-rule-9 .
- No calls, emails, signups, payments, credential generation or account connections are authorized by this shortlist.
- Report every finding with URL, timestamp, tool/version if available, observed evidence, confidence, and a specific fix or verification step. Label lab vs field data and public vs owner-provided facts.

## Maintenance rule

Re-review on provider price/terms/API changes, before any purchase or integration, or when pilot results expose a gap. For each candidate keep: priority, stage, purpose, access class, verified price/limit date, license gate, evidence source, next evaluation and pilot result. Promote a paid tool only when it increases verified callable prospects or audit usefulness enough to justify its cost and handling obligations. This document does not establish a recurring automation.
