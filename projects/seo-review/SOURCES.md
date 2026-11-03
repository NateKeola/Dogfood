# Primary-source bibliography

**Reviewed: 2026-11-02.** This date applies to every entry below and is not a publication date. Dates in the table are the displayed source update date unless labeled otherwise. “Unknown” means no reliable update date was observed. These are short paraphrases of relevant sections, not copies of the source documents. Sources establish guidance, not facts about a target website.

Google/web.dev pages were reviewed through retrieved page text and targeted sections; Bing's JavaScript page was reviewed in the rendered browser after the text fetch returned only an application shell. Schema.org's type page identifies itself as a development view; its release listing provides the published version context. Do not treat the visible development vocabulary as evidence that a search engine supports every field. No target-site crawl, account access or analytics export was performed.

## How to use the evidence

| Label | Meaning | Common mistake to avoid |
| --- | --- | --- |
| Requirement | Documented engine technical/policy or feature eligibility condition. | Claiming every recommendation is required for indexing. |
| Guidance | Official recommendation, including a scoped ranking statement. | Inventing weighting, guaranteed outcomes or universal quotas. |
| UX | Accessibility or engineering practice and measurement guidance. | Calling every usability improvement a proven ranking factor. |
| Hypothesis | Our proposed application to a particular business. | Treating a competitor observation as causal evidence. |

Launch gates, priority labels, conversion definitions, sampling plans and the review schedule are original workflow recommendations. They are not Google/Bing requirements. Refresh the specific sources before an audit, especially feature eligibility, metrics, policies, and tooling. If a source changes or is inaccessible, record the gap and narrow the claim.

## Crawl, index and architecture

| ID | Source | Source update | Relevant evidence and limits |
| --- | --- | --- | --- |
| S01 | [Google Search technical requirements](https://developers.google.com/search/docs/essentials/technical) | 2025-12-18 | Requirement: Googlebot access, successful HTTP response and indexable content establish eligibility; they do not guarantee indexing. `noindex` must be crawlable to be seen. |
| S02 | [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) | 2025-12-10 | Guidance: useful content, discoverable links and understandable site organization. Search effects may take time and are not assured; sitemap submission is not universally required. |
| S03 | [Introduction to robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro) | 2025-12-10 | Requirement/guidance: robots controls crawler access, not confidentiality or reliable index exclusion. Use appropriate access control for private content; do not block access to a noindex instruction and expect it to be read. |
| S04 | [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) | 2026-07-08 | Guidance: list preferred canonical URLs. `lastmod` should reflect significant updates accurately; Google ignores `priority` and `changefreq`. Our sitemap launch check is an engineering convention. |
| S05 | [Canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) | 2026-07-10 | Guidance: redirects and canonical annotations are stronger canonical signals than sitemap inclusion. They express preference; Google can choose differently. |
| S06 | [JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics) | 2026-03-04 | Guidance: crawling, rendering and indexing are distinct. Check content and links after rendering. Initial noindex can prevent rendering, so removing it with JavaScript is unreliable. |
| S07 | [HTTP status codes and Google crawlers](https://developers.google.com/crawling/docs/troubleshooting/http-status-codes) | 2026-02-04 | Requirement/guidance: 200 error content can be a soft 404; absent URLs, temporary failure and moves need meaningful status codes. 429 is treated differently from other 4xx codes. The older Search Central URL now redirects here. |
| S08 | [Link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) | 2025-12-10 | Guidance: standard anchors with resolvable hrefs support crawling; descriptive link text helps context. Avoid arbitrary “three clicks” or link-count ranking rules. |
| S23 | [Redirects and Google Search](https://developers.google.com/search/docs/crawling-indexing/301-redirects) | 2026-04-14 | Guidance: choose permanent versus temporary redirects based on the actual move. Prefer server-side redirects where feasible; follow host-specific implementation guidance rather than executing page examples. |
| S24 | [Managing faceted navigation crawling](https://developers.google.com/crawling/docs/faceted-navigation) | 2025-12-18 | Guidance: filters can create enormous URL spaces; decide whether they need discovery before choosing controls. Crawl reduction and removing indexed URLs are separate goals. The older Search Central URL redirects here. |

## Content, local presence and search presentation

| ID | Source | Source update | Relevant evidence and limits |
| --- | --- | --- | --- |
| S09 | [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies) | 2026-08-28 | Requirement: avoid cloaking, doorway abuse, link spam and scaled content abuse. A technology choice alone does not establish useful content. |
| S10 | [Helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) | 2026-10-05 | Guidance: original useful information, factual accuracy and credible experience/expertise matter. E-E-A-T is not a single ranking factor; no preferred word count is prescribed. |
| S11 | [Improve local ranking](https://support.google.com/business/answer/7091?hl=en) | Unknown | Guidance: relevance, distance and prominence affect local results. Accurate complete profile information helps matching; a site edit cannot erase distance. No guaranteed paid route to a higher local rank. |
| S12 | [Represent your business on Google](https://support.google.com/business/answer/3038177?hl=en) | Unknown | Requirement/guidance for Business Profiles: represent the real business accurately. A service-area business should hide its customer-facing address; do not expose a residential address or invent a storefront. |
| S13 | [Influencing title links](https://developers.google.com/search/docs/appearance/title-link) | 2025-12-10 | Guidance: descriptive, distinct titles and a clear main title; avoid stuffing/boilerplate. Google generates title links and may choose other text. Fixed character counts are not eligibility rules. |
| S14 | [Control search snippets](https://developers.google.com/search/docs/appearance/snippet) | 2026-04-20 | Guidance: accurate page-specific descriptions can inform snippets; Google also selects page text according to the query. No guaranteed displayed wording or fixed description-length requirement. |
| S15 | [Google image SEO](https://developers.google.com/search/docs/appearance/google-images) | 2026-03-02 | Guidance: HTML image discovery, responsive/fallback sources and relevant surrounding context/alternative text. Image search discovery is distinct from purely decorative backgrounds. |
| S31 | [Generative AI content guidance](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) | 2026-10-01 | Guidance/policy: fact-check and editorially review generated content, including metadata. Many generated pages without added user value can violate scaled-content policies. |

## Structured data

| ID | Source | Source update/version | Relevant evidence and limits |
| --- | --- | --- | --- |
| S17 | [General structured-data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) | 2026-07-10 | Requirement for rich-result eligibility: accurate, current markup corresponding to visible content plus feature-specific rules. A valid test result does not guarantee a rich result. |
| S19 | [LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business) | 2026-09-08 | Requirement/guidance for Google's feature: required name and physical address; truthful supported properties. Do not fabricate an address or publish a private one to obtain eligibility. Omitting it means this feature's requirements are not met. |
| S26 | [Schema.org LocalBusiness](https://schema.org/LocalBusiness), [release listing](https://schema.org/docs/releases.html) | Type-page update unknown; release listing shows **30.1, 2026-09-16** | Vocabulary/reference: LocalBusiness describes a physical business or branch. The type page says development version. Schema.org vocabulary validity and a Google-supported result type are different tests. |
| S27 | [Review snippet guidelines](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) | 2026-09-08 | Feature requirement: LocalBusiness/Organization review eligibility is restricted to reviews about other businesses/organizations; self-serving business stars are not eligible. Genuine testimonials are not permission to claim those stars. |

## Experience, measurement and migrations

| ID | Source | Source update/version | Relevant evidence and limits |
| --- | --- | --- | --- |
| S16 | [Web Vitals](https://web.dev/articles/vitals) | Published 2020-05-04; updated 2024-10-31 | UX measurement: current stable metrics are LCP, INP and CLS. Good thresholds are ≤2.5 s, ≤200 ms and ≤0.1 respectively, at the 75th percentile for all three, segmented by device. Lighthouse load tests do not measure field INP; TBT is a lab proxy. |
| S18 | [Mobile-first indexing guidance](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing) | 2025-12-10 | Guidance: Google uses mobile content for indexing/ranking; do not require interaction to load primary content. Responsive design is recommended; separate mobile sites need careful content/directive parity. |
| S20 | [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [quick reference](https://www.w3.org/WAI/WCAG22/quickref/) | W3C Recommendation displayed 2024-12-12; quickref update unknown | Accessibility standard/practice, not a Google ranking specification. Relevant checks include text alternatives, keyboard access, focus, contrast, reflow, labels and errors. A limited checklist/scan does not prove conformance. |
| S21 | [Site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes) | 2026-08-20 | Guidance: prepare/test, map URLs, redirect and monitor both sites; avoid unnecessary simultaneous changes. Keep redirects generally at least one year. Temporary ranking fluctuations can occur. |
| S22 | [Search Console performance report](https://support.google.com/webmasters/answer/7576553?hl=en) | Unknown | Measurement definitions: clicks, impressions, CTR and average position; segmentation and periods matter. Search result observations vary by time/place/device/history. These metrics are not qualified leads or revenue. |
| S28 | [Why lab and field data differ](https://web.dev/articles/lab-and-field-data-differences) | 2022-07-18 | UX measurement: lab uses controlled conditions; field reflects real visitors. This older explanation supplies the distinction, while S16 supplies current metric names and thresholds. |
| S29 | [Page experience in Google Search](https://developers.google.com/search/docs/appearance/page-experience) | 2026-09-22 | Ranking guidance: Core Web Vitals are used by ranking systems, but no single page-experience signal guarantees success. Secure delivery, mobile presentation and avoiding intrusive overlays support a good experience. |

## Bing and AI-search scope

| ID | Source | Source update | Relevant evidence and limits |
| --- | --- | --- | --- |
| S25 | [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a) | Unknown | Guidance/policy, rendered page reviewed: crawlable links, accurate sitemaps/canonicals, useful independently verifiable content and correct directives support traditional and AI search. Bing recommends IndexNow for changed URLs, but setup/submission is outside a read-only review. It rejects deceptive content, link schemes and prompt-injection manipulation. No ranking/citation guarantee. |
| S30 | [Google AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) | 2025-12-10 | Foundational guidance, not a complete current controls/measurement reference. Use newer S32, S42 and S62 for dedicated reporting and Search generative AI controls. Google-specific guidance does not prove every AI system uses the same rules. |

## AI-search, browser agents and proposed files

| ID | Source | Source update/version | Relevant evidence and limits |
| --- | --- | --- | --- |
| S32 | [Google generative AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) | 2026-07-10 | Search guidance: ordinary SEO foundations, no special AI files/markup or artificial chunking requirement. Explicitly rejects treating llms.txt as a Google visibility/ranking lever. |
| S33 | [OpenAI crawler overview](https://developers.openai.com/api/docs/bots) | Unknown | Product-specific access: independent OAI-SearchBot, GPTBot and ChatGPT-User roles; user fetch may not follow robots. Navigational links are an exception to search-answer exclusion. No llms.txt/agents.txt ranking requirement established. |
| S34 | [Anthropic crawler guidance](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) | 2026-04-07 | Distinguishes ClaudeBot, Claude-User and Claude-SearchBot; all honor robots. Blocking search/user access can reduce visibility/retrieval. No citation guarantee. |
| S35 | [Google common crawlers](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) | 2026-10-30 | Google-Extended token, defined training/grounding scope, no Search ranking/inclusion effect; shared training preference support described as planned for early 2027. |
| S36 | [llms.txt proposal](https://llmstxt.org/) | v2; published 2024-09-03, modified 2026-08-10 | Optional context/link format. Proposal/consumer support is different from a search-engine requirement. |
| S37 | [Chrome Lighthouse llms.txt audit](https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt) | 2026-05-05 | Specific documented tooling support: server-error check; 404 is N/A because file is optional. This is not Google Search ranking guidance. |
| S38 | [Codex AGENTS.md instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md) | Unknown; official developer guide redirects here | Coding-agent instruction discovery, not public search optimization. Local official-doc skill checked first; no crawler reference was available locally. |
| S39 | [agents policy Internet-Draft](https://datatracker.ietf.org/doc/draft-srijal-agents-policy/) | `-00`, 2025-10-07; expired/archived 2026-04-10 | Individual draft with no IETF endorsement/standards standing. Not interchangeable with other agents.txt proposals. |
| S40 | [agents.txt capability-discovery Internet-Draft](https://datatracker.ietf.org/doc/draft-car-agents-txt-wellknown/) | `-00`, 2026-06-12; expires 2026-12-14 | Active individual informational draft, not an endorsed standard. No Google/OpenAI/Anthropic adoption established here. |
| S41 | [Build agent-friendly websites](https://web.dev/articles/ai-agent-site-ux) | 2026-04-01 | UX: semantics, labels and stable controls support DOM/accessibility-tree/screenshot interaction. WebMCP is evolving; not a search ranking requirement. |
| S42 | [Google Generative AI report help](https://support.google.com/webmasters/answer/16984139), [launch announcement](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports) | Help update unknown; announcement 2026-06-03; both note rollout 2026-08-31 | Impressions and dimensions for covered features; availability thresholds, aggregation and unavailable-to-zero export caveat. Supersedes older aggregate-only measurement guidance. |
| S62 | [Control what you share](https://developers.google.com/search/docs/crawling-indexing/control-what-you-share), [Search generative AI control help](https://support.google.com/webmasters/answer/16908024) | Guide 2026-10-21; help update unknown, rollout note 2026-08-31 | Property control includes/excludes covered Search AI content/links and supports inheritance. Separate from training and ordinary Search inclusion/ranking; not a robots.txt replacement. |

## Tool access, pricing and measurement contracts

These sources describe capabilities, not an entitlement for this task. No private dashboard or paid request was accessed. The Bing retirement page was verified in the rendered browser because text retrieval returned an application shell. Unknown dates are not inferred from crawler timestamps. Prices/quotas are snapshots; check live account terms before adoption.

| ID | Source | Source update/version | Relevant evidence and limits |
| --- | --- | --- | --- |
| S43 | [Search Analytics query reference](https://developers.google.com/webmaster-tools/v1/searchanalytics/query) | 2026-08-11 | Top rows, pagination, types and incomplete-data metadata. No dedicated generative-AI type established in this reference. |
| S44 | [Search Console API export guide](https://support.google.com/webmasters/answer/12919192?hl=en), [About Search Console](https://support.google.com/webmasters/answer/9128668?hl=en) | Unknown | Free service/API; export limit 50K rows/day/type/property. Does not guarantee exhaustive query data. |
| S45 | [Search Console API authorization](https://developers.google.com/webmaster-tools/v1/how-tos/authorizing) | 2025-08-28 | OAuth scopes/consent for private user data; API keys are not property permission. |
| S46 | [Search Console API quotas](https://developers.google.com/webmaster-tools/limits) | 2025-08-28 | Site/user/project and load limits; distinguish Search Analytics and URL Inspection quotas. |
| S47 | [Google Analytics product overview](https://marketingplatform.google.com/about/analytics/) | Unknown | Standard Analytics offered free; not a guarantee that every cloud/export integration is free. |
| S48 | [Analytics API quickstart](https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart) | 2026-10-26 | User/service-account authentication, enabled API and property access. Code samples were not executed. |
| S49 | [GA4 Data API quotas](https://developers.google.com/analytics/devguides/reporting/data/v1/quotas) | 2026-10-26 | Core quotas, concurrency, property token accounting and backoff; other categories have different limits. |
| S50 | [PageSpeed API getting started](https://developers.google.com/speed/docs/insights/v5/get-started) | 2025-08-28 | Optional key/recommended for automation; announced future removal of bundled field data. No exact universal project quota verified. |
| S51 | [CrUX API](https://developer.chrome.com/docs/crux/api) | 2026-10-13 | Public field-data retrieval, rolling window and collection scope; no-charge 150 QPM/project limit. |
| S52 | [Bing AI Performance launch](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/), [expanded preview](https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/) | Published 2026-02-10 and 2026-06-16 | Citation reporting across covered experiences; later intent/topic/share/compare previews. These are not ecosystem-wide metrics. |
| S53 | [Bing Topics Portfolio beta](https://blogs.bing.com/webmaster/2026/10/introducing-topics-portfolio-beta-in-ai-performance/), [free Webmaster tools](https://www.bing.com/webmasters) | Published 2026-10-13; tools page date unknown | Current UI workflow and beta caveats; no AI-report API parity established. |
| S54 | [Bing Webmaster API access](https://learn.microsoft.com/en-us/bingwebmaster/getting-access), [API key scope](https://blogs.bing.com/webmaster/2021/9/Access-to-Instant-Indexing-%C2%A0Bing%C2%A0URL-submission-API/) | Access guide 2022-10-13; key article published 2021-09-09, update unknown | OAuth recommended or API key; key can span a user's verified sites. Submission capability is outside this review. |
| S55 | [Bing SOAP/POX retirement](https://www.bing.com/webmasters/help/soap-pox-api-deprecation-s0appox01) | Update unknown; stated retirement 2026-08-31 | Rendered official notice: migrate to JSON/HTTP; permissions/quotas unchanged. No live endpoint test performed. |
| S56 | [Ahrefs API v3 eligibility](https://help.ahrefs.com/en/articles/6559232-about-api-v3) | 2026-09-23 | Direct API/MCP/Connect available on Lite+ with shared units and plan row caps. Current guidance supersedes older Enterprise-only statements. |
| S57 | [Lighthouse overview](https://developer.chrome.com/docs/lighthouse/overview) | Unknown | Open-source local/DevTools diagnostics; automated audits are not comprehensive SEO/accessibility certification. |
| S58 | [Ahrefs pricing](https://ahrefs.com/pricing) | Unknown; price snapshot 2026-11-02 | Displayed monthly Lite/Standard/Advanced prices; plan/add-on/billing terms need rechecking. Not agency service pricing. |
| S59 | [Ahrefs API introduction](https://docs.ahrefs.com/en/api/docs/introduction) | Unknown | Owner/admin keys, default rate limit, unit consumption/free exceptions, possible paid overages and usage caps. |
| S60 | [Ahrefs MCP](https://docs.ahrefs.com/en/mcp/docs/introduction) | Unknown | Supported paid connection consumes the same API allowance; a connector is an access method, not a new entitlement. |
| S61 | [Semrush API access](https://developer.semrush.com/api/v4/get-started/api-access/) | Unknown | Standard API needs Business plus separately purchased units; other APIs differ. Complete current cost not verified. |

## Decisions this research changes

- A discovery/indexability failure takes precedence over polishing metadata on an inaccessible critical page. This prioritization is our workflow inference from S01–S08.
- Use real business and customer evidence to decide content and location pages; a source trend does not establish demand. This is a business hypothesis discipline informed by S09–S12.
- Privacy outranks obtaining a rich-result feature: S12 and S19 have different purposes, so preserve a private address and accept the documented eligibility limitation.
- Review field performance separately from lab diagnostics. New sites can launch with a measured lab baseline and an explicit unknown field state; the acceptance decision is a project choice, not a claimed field pass.
- Keep AI-search recommendations tied to each engine's actual documentation. Clear, useful, verifiable pages are supported foundations; invented “AI SEO” guarantees are not.
