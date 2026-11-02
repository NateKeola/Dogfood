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
| S30 | [Google AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) | 2025-12-10 | Guidance: established SEO practices apply. No extra AI text file or special Schema.org markup is needed for these Google features. This is Google-specific and does not prove every AI system uses the same rules. |

## Decisions this research changes

- A discovery/indexability failure takes precedence over polishing metadata on an inaccessible critical page. This prioritization is our workflow inference from S01–S08.
- Use real business and customer evidence to decide content and location pages; a source trend does not establish demand. This is a business hypothesis discipline informed by S09–S12.
- Privacy outranks obtaining a rich-result feature: S12 and S19 have different purposes, so preserve a private address and accept the documented eligibility limitation.
- Review field performance separately from lab diagnostics. New sites can launch with a measured lab baseline and an explicit unknown field state; the acceptance decision is a project choice, not a claimed field pass.
- Keep AI-search recommendations tied to each engine's actual documentation. Clear, useful, verifiable pages are supported foundations; invented “AI SEO” guarantees are not.
