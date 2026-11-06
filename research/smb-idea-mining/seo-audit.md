# Evidence-backed SEO and lead-path audits

## Framework

Produce three separate outputs: observed readiness, opportunity priority and evidence coverage/confidence. This is a proposed sales-workflow rubric, not Google's ranking formula or a predictor of revenue.

Suggested category weights:
- Technical accessibility: 20.
- Service/location clarity: 25.
- Lead-path usability: 20.
- Public local-profile consistency: 20.
- Performance/page experience: 15.

Define subchecks before comparing businesses. Score each 0 (confirmed substantial issue), 1 (partial/moderate issue), 2 (meets criterion in sample), unknown, or not applicable with reason. Assign category weight equally across its predefined subchecks unless another allocation is documented. Earned weighted points are each assessed subcheck's weight times score/2. Readiness = 100 times earned weighted points divided by assessed applicable weight. Coverage = assessed applicable weight divided by all applicable weight. Unknown contributes to applicable coverage denominator, not earned or assessed weight. Exclude genuinely not-applicable weight from both. Withhold overall readiness below 60% coverage; 60–79% is provisional. These coverage thresholds are proposed workflow choices.

Example: 60 of 100 applicable weight assessed, 45 earned gives readiness 75/100 with 60% coverage, provisional. It is not 45/100 readiness or proof of lost leads.

Opportunity priority is separate: geography/service fit 0–2; verified fixable problems 0–3; customer-journey importance 0–2; observable actionability 0–2; specific useful outreach insight 0–1. Do not infer budget or buying intent.

## Reusable audit prompt

Audit [COUNT] service businesses in [COUNTY/CITIES] for [ACTUAL SERVICES OFFERED], using [TOOLS/BUDGET] on [DATE]. Start with [DOMAINS/SOURCES]. Confirm official identity, domain, actual services and located-in versus serves.

Inspect a bounded sample: desktop/mobile homepage, core service, contact/booking and genuine location page where available. Record actual pages and device/viewport. Follow contact destinations without sending forms, messages or calls. Review rendered content, navigation, useful titles/headings, canonicals/robots where relevant, HTTPS, clear service area, mobile CTA and accessible form labels.

Apply the readiness, coverage and separate opportunity framework above. Unknown is not failure. Record exact affected URL, timestamp, method, observation, narrow plausible impact, confidence, fix, effort assumption, verification and owner-access need for each finding. High confidence means directly reproduced; medium reflects limited sampling; low is a hypothesis and cannot become a declarative sales claim.

Separate Lighthouse laboratory diagnostics from CrUX field results and URL-level from origin-level results. Repeat suspicious lab runs. Missing CrUX is insufficient eligible data, not zero traffic or slow performance. Treat search results as snapshots: record query, location, device, date, result type and depth. Use at least three specific service/city queries when assessing a small visibility sample. Separate ads, map results and organic listings.

Do not treat absent sitemap/schema, multiple H1s or a missing meta description as critical failures by themselves. Do not penalize service-area businesses for legitimately hidden addresses. Verify identity before comparing profile details. A blocked crawler does not prove Google cannot crawl. A site: query is not an exhaustive index test.

Public checks cannot establish actual Search Console clicks, GA4 conversions, GBP performance, call outcomes, private account status or penalties. Mark these as owner-authorized follow-up questions. Commercial SEO metrics are provider estimates with date/database/geography, not facts about the business.

Reproduce the strongest issue manually. Return top three findings per qualified prospect, source ledger, coverage, confidence, owner-access questions and one draft-only outreach angle. Recheck outages immediately before any later authorized communication. Do not guarantee ranking, citations, revenue or legal compliance.

## Integrations and outcomes

Public layer: bounded website inspection; PSI lab diagnostics; separate CrUX APIs for field data; permitted search; optional licensed SEO estimates. Google Places has storage/attribution restrictions, including a specific place-ID exception, not unrestricted database rights.

Owner-authorized layer: Search Console, GA4, GBP Performance, booking/call/CRM outcomes. Seeing an analytics tag does not prove events work. No integration was activated here.

Measure repaired journeys and qualified inquiries after agreement on baseline and attribution. Avoid fake locations, doorway pages, purchased reviews and keyword-stuffed profile names.

## Official references

- https://support.google.com/business/answer/7091
- https://developers.google.com/speed/docs/insights/v5/about
- https://developers.google.com/speed/docs/insights/v5/get-started
- https://web.dev/articles/vitals
- https://developers.google.com/webmaster-tools/v1/prereqs
- https://developers.google.com/my-business/reference/performance/rest
- https://developers.google.com/my-business/content/prereqs
- https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site
- https://developers.google.com/search/docs/essentials/spam-policies
- https://developers.google.com/maps/documentation/places/web-service/policies

Check current access, terms and pricing before implementation. These references support methodology, not audited prospect findings.
