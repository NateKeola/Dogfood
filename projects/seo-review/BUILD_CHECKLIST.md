# Website-build checklist and acceptance gates

Use this in the brief, implementation review and release handoff. Record **status, owner, evidence/ref, checked date, blocker/exception and next check** for each applicable item. Status is pass, fail, unknown or not-applicable. A checked box without evidence is not acceptance. Source IDs link to the [bibliography](SOURCES.md); the gate design and review cadence are project workflow choices, not search-engine requirements.

## 1. Brief and information architecture

- [ ] Business owner confirms the actual offer, target customer, real service areas, public contact details, address-visibility rule and useful differentiator. Record provenance; leave unverified facts unpublished. [S10–S12]
- [ ] Define one primary business outcome and its successful event (for example, an accepted inquiry), qualified-lead criteria, owner, baseline or “new site/no baseline,” and comparison window. Identify who will assess lead quality. [S22; workflow]
- [ ] Map intended customer questions to a manageable page inventory: route, intent, content owner, factual sources, primary action, parent/related links, index intent and canonical target. Include a reason for separate service/location pages. [S02, S05, S08, S10]
- [ ] Record competitor references as observations and hypotheses. No copied content/assets, assumed demand or invented search volumes. New location pages need distinct useful information and real service, not swapped city names. [S09, S10]
- [ ] Record what is a demo: fictional prices, mock testimonials (omit from publishable content), disabled forms and prototype-only claims. A prototype is not a live business. [workflow]

## 2. Implementation checks

| Area | Check and evidence to save | Sources |
| --- | --- | --- |
| Index intent | Identify production, preview and private routes separately. Protect confidential staging with access controls; noindex is not security. Preserve intentional exclusions. Check both response headers and HTML for indexing directives. | S01, S03, S04 |
| HTTP | On direct navigation and refresh, intended landing pages return useful content and 200; moved URLs have deliberate redirects; absent pages have a real 404/410 as appropriate. Detect error content served as 200, loops and long chains. Save a status/target sample. | S01, S07, S23 |
| Rendering | Compare initial and rendered title, canonical, main content, navigation and structured data for each template. Ensure important content is available without clicking or scrolling to fetch it. Record browser/tool and limitations; inspect Search Console rendering later only with access. | S06, S18 |
| Canonicals/duplicates | Choose consistent HTTPS/host/path rules. Canonical annotations, links and sitemaps agree; no staging or unrelated canonical destinations. Canonicals are signals, not guarantees or substitutes for redirects after a move. | S05, S21 |
| Facets/parameters | List filters, sorting, search, tracking and pagination separately. Decide which combinations deserve discovery; prevent infinite spaces without hiding valuable pages. Blocking crawling does not remove an already known URL; do not apply a sitewide blanket rule. | S03, S24 |
| Discovery | Important pages have standard `a href` navigation/context links and descriptive anchors. Review broken links and orphan pages. Provide sitemap URLs for intended canonical public pages; exclude private, redirected/error and noindex URLs. Use truthful lastmod values when known. | S04, S08, S25 |
| Content | Each important page answers intent, states verifiable business facts and gives a clear next step. Original explanations, real experience and accountable authorship are proportionate to the topic; claims are reviewed by the owner. | S10 |
| Titles/headings | Distinct descriptive titles; clear main heading and logical semantic sections; concise accurate descriptions. Preview presentation without claiming Google must use it. No rigid character-count ranking gate or keyword stuffing. | S13, S14, S20 |
| Images | Owned/licensed accurate imagery, useful alt text and empty alt for decoration; discoverable `img`/`src` where image search matters. Suitable formats/sizes, dimensions/aspect ratio to prevent shifts, and appropriate loading behavior. Avoid lazy-loading the identified LCP hero without measuring the impact. | S15, S16, S20 |
| Local facts | Match verified name, phone, hours, site and actual service areas across controlled public representations. Review meaningful mismatches; do not publish private addresses or keyword-stuff the business name. A citation audit does not authorize edits. | S11, S12 |
| Structured data | Document entity/type and intended supported feature, if any. Truthful visible facts, applicable required fields and allowed reviews; no unsupported ratings or fabricated address. Validate vocabulary and Google eligibility separately and record remaining warnings. Omit ineligible markup/claims rather than invent facts. | S17, S19, S26, S27 |
| Mobile/accessibility | Test navigation and main action at narrow/wide viewports; keyboard operation, visible focus, labels, errors, headings, alt text, zoom/reflow and contrast. Record automated results plus manual coverage. Set an appropriate accessibility target; do not claim certification from a scan. | S18, S20 |
| Performance | Collect repeatable lab evidence on key templates and actual interactions; identify resource, script and layout bottlenecks. Record field metrics separately when available. Agree project-specific lab budgets in the brief instead of imposing a universal Lighthouse score. | S16, S28 |
| HTTPS/security | Verify certificate, HTTPS routing, no mixed-content breakage and working critical resources. Preserve authentication and request protections. Do not loosen access for crawlers or external validators. | S03, S29 |
| Migration | If URLs change, save old-to-new mappings, backups/ref and rollback owner. Validate relevant permanent redirects, internal links, canonicals and new sitemap. Avoid routing everything to the home page. Plan redirect retention (Google recommends generally at least one year) and monitor old and new routes. | S21 |
| Measurement | Agree event names, triggers, deduplication and privacy constraints. Instrument only when separately authorized. Validate in a test environment/safe debug path without real submissions; document unavailable production verification. | S22; workflow |

For multilingual, ecommerce, video or regulated content, add an explicitly scoped module and current primary guidance before acceptance. A small service site should not inherit irrelevant requirements.

## 3. Pre-launch gates

These gates assess readiness; passing them does not authorize deployment. For every gate use `status | owner | evidence/ref/date | exceptions | follow-up`. An exception needs a reason, consequence and owner acceptance. **Unknown is not pass.** Privacy leaks, fabricated claims and critical indexing/conversion failures remain blocking issues; do not waive them with a high aggregate score.

| Gate | Acceptance condition | If not established |
| --- | --- | --- |
| G1: Scope and truth | Owner-approved publishable offer, real locations/service areas, contact and claims. No private records, secrets or home address leaks in HTML, JSON-LD, assets, sitemap, source maps or reports. | Keep prototype protected; resolve facts/exposure. |
| G2: Environment and discovery | Release candidate has intended production host, routing, robots/meta/header/canonical/sitemap behavior; private/staging areas stay protected. Important pages are reachable and content renders on direct load. Record all critical routes and representative template coverage. | Block launch for unintended exclusions/leaks; prepare a production recheck. |
| G3: Content and navigation | Priority pages answer their intended customer questions; useful titles, descriptions, headings, images and links reviewed. No doorway, copied or unsupported promotional content. | Resolve material gaps; log minor editorial follow-ups. |
| G4: Structured data | Every included type has truthful visible data and applicable validation evidence; eligibility limits documented. A reasoned decision to include no rich-result markup is acceptable. | Correct or remove problematic markup; no invented fields. |
| G5: Usable conversion path | Relevant mobile/desktop and keyboard paths pass the agreed functional/accessibility scope. Safe test evidence establishes success/error handling where implemented. Disabled demo actions are labeled. | Block release of a broken intended primary action; retain explicit limits for a demo. |
| G6: Performance | Repeatable lab results meet agreed budgets or a documented noncritical exception. Field LCP/INP/CLS state is reported separately; a new site can have unknown field status plus a named post-launch measurement plan. | Fix severe issues; do not label unknown field data a pass. |
| G7: Release and measurement | Known commit/build, release owner, regression/rollback plan and authorized measurement plan. Migration mappings verified if applicable. Baselines and missing data recorded. | Do not deploy until release authority and recovery are clear. |

**Field performance reference (verify before reuse):** good LCP ≤2.5 seconds, INP ≤200 milliseconds and CLS ≤0.1 at the 75th percentile, across all three and segmented by device. Record source, collection window, page versus origin scope and data availability. Lab TBT is diagnostic, not INP; a lab pass is not a field pass. [S16, S28]

Protected staging cannot establish public crawl/index behavior. Test the candidate's intended release configuration safely, then leave production confirmation pending until an authorized launch. Do not publish a staging site for an SEO tool.

## 4. Recommended post-launch review schedule

This is a recommendation to assign to an owner, **not an automation and not a ranking forecast**. No calendar entries, reminders or recurring tasks are created.

| When | Review | Evidence and decision |
| --- | --- | --- |
| Immediately after authorized launch | Production status, HTTPS, robots/meta/headers, canonical, sitemap, rendering and priority conversion path; staging remains protected. Recheck redirects for migrations. | Compare actual release SHA/config with gates; rollback or patch critical regressions through the authorized release process. |
| About day 7 | Authorized Search Console/Bing indexing and crawl signals, sitemap processing, errors and safe conversion instrumentation checks. | Distinguish not yet crawled, excluded intentionally, and observed errors. Submit/request indexing only with separate authorization. |
| About days 28–30 | Field data where sufficient; query/page impressions, clicks/CTR, useful landing pages, qualified leads and conversion rates with explicit denominators. | Compare compatible periods and segment/device scope; do not attribute movement to SEO alone. Low traffic may still mean unknown. |
| About days 60–90 | Customer questions, lead quality, page usefulness, local facts, content gaps and supported experiments. | Keep, revise or stop hypotheses; document seasonality, competition and concurrent changes. Refresh primary-source guidance. |
| After major releases or business changes | Repeat affected gates, hours/service-area facts, schema and migration checks. | Update owner, evidence and next review date. |
