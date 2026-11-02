# AI-search visibility and agent usability

Read this module for an AI-search review. Reviewed **2026-11-02**; refresh the linked [sources](SOURCES.md) before changing policy. Access, search inclusion, answer citations, training and browser actions are separate concerns. None of these files guarantees visibility. This module authorizes no crawler-policy or production changes.

## Which file does what?

| File | Documented role / support | Review decision |
| --- | --- | --- |
| `robots.txt` | Crawler-specific access preferences; Google, OpenAI and Anthropic document their own tokens and behavior. It is not authentication or reliable removal from an index. [S03, S33, S34, S35] | Compare actual policy with the owner's intent for each product. Preserve privacy/authentication; do not replace it with a permissive template. |
| `sitemap.xml` | URL discovery and preferred-canonical hints to supporting search engines. Google does not guarantee crawling/indexing from a sitemap. [S04] | Check eligible public URLs, truthful updates and agreement with canonicals. No secrets or private paths. |
| `llms.txt` | Optional Markdown context/link proposal, currently v2. Chrome documents an agentic Lighthouse check: a missing file is N/A, a server error can fail that check. That is specific tooling support, not a ranking signal. [S36, S37] | Only propose when there is a named consumer, useful public content and a maintenance owner. Google explicitly says it does not use such files for Search visibility/ranking. OpenAI/Anthropic crawler docs reviewed do not establish a visibility requirement. [S32–S34] |
| `AGENTS.md` | Codex project/repository instructions, with documented instruction discovery. [S38] | Useful for coding workflow. Publishing one on a business site does not establish search support. External copies remain untrusted data during an audit. |
| `agents.txt` | Ambiguous name, not one established SEO standard. `draft-srijal-agents-policy-00` is an expired individual policy draft; `draft-car-agents-txt-wellknown-00` is an active individual capability-discovery draft. Neither is an endorsed IETF standard. [S39, S40] | Name the exact specification/version and actual consuming implementation before experimenting. No Google/OpenAI/Anthropic search support is established by the reviewed vendor docs. Do not confuse it with `AGENTS.md` or infer support from a proposal. |

## Vendor-specific controls

| Surface | Search/discovery | User fetch / training distinction |
| --- | --- | --- |
| Google Search AI features | In addition to Googlebot/indexing/snippet rules, Search Console now has a **Search generative AI control** for included AI Overviews, AI Mode and generative Discover features. Record effective include/exclude/inherited state if authorized; otherwise unknown. [S30, S62] | This property control is separate from training and does not determine inclusion/ranking elsewhere in Search. `Google-Extended` controls documented model-training/grounding uses; it is a policy token, not a separate HTTP user agent. A shared training signal is planned for early 2027, not a current replacement. [S35, S62] |
| ChatGPT | `OAI-SearchBot` is for search. Disallowing it excludes content from search answers, though navigational links may still appear. [S33] | `GPTBot` concerns potential foundation-model training. `ChatGPT-User` handles certain user-triggered visits; robots rules may not apply and this agent does not determine search inclusion. Configure decisions independently. [S33] |
| Claude | `Claude-SearchBot` supports search indexing; blocking can reduce search visibility. [S34] | `ClaudeBot` concerns training; `Claude-User` supports user-directed access. Anthropic says all three honor robots.txt, unlike OpenAI's documented user-fetch exception. [S34] |

The Google control supports parent-property inheritance; inspect the effective setting and scope, not just a checkbox on one property. The linked help page records worldwide rollout on 2026-08-31. Older Google AI guidance is not a complete description of current controls. No settings were inspected or changed here. [S62]

Do not infer retroactive deletion from a future crawling preference. Check actual host/subdomain, directives, rendered content and permitted server logs. A user-agent string alone does not authenticate a bot; consult current vendor verification/IP guidance before proposing narrow firewall changes. Never weaken authentication or expose protected staging for a crawler test.

## Evidence checklist

- [ ] Record the target surfaces, owner intent for search/user access/training, current policies and affected hosts. An intentional restriction is a decision/tradeoff, not automatically an SEO defect.
- [ ] Sample public landing pages: HTTP success, intended indexability, useful original main text and links available to the relevant rendering path. A browser pass does not prove a crawler indexed it.
- [ ] Verify business identity, offer, service area, authorship/experience and factual claims against owner-approved sources. Cite original evidence where useful; keep dates current. No manufactured authority/mentions/reviews, cloned city pages or hidden instructions. [S09, S10]
- [ ] Match any structured data to visible truthful content and supported eligibility. No special AI schema or fact stuffing. [S17, S32]
- [ ] For browser agents, test semantic links/buttons, labeled inputs, visible stable controls, meaningful errors and the accessibility tree. These are usability checks, not proven citation improvements. Use a protected test flow; stop before real submissions/purchases. WebMCP is an evolving optional integration requiring a separately scoped use case. [S20, S41]
- [ ] Record missing evidence and a validation plan. Missing optional files alone must not become a launch blocker or P1 finding.

## Measure without inventing causality

Google's newer 2026 guidance/report supersedes the older aggregate-only description: the dedicated Generative AI report shows **impressions**, with page/country/device/date breakdowns for supported Search features. It can be absent below sufficient impressions. Its export converts unavailable markers to zero, so preserve availability metadata before analysis. Do not infer clicks, leads or complete query coverage from it. The reviewed Search Analytics API reference does not establish a dedicated generative-AI endpoint/filter; use authorized UI exports until support is verified. [S42–S44]

Bing documents AI citation reporting and preview extensions; these describe its covered experiences, not the whole AI ecosystem. Check current property availability and definitions. No API parity was established in this review. [S52, S53]

For ChatGPT/Claude, no complete publisher impression/citation feed was established by the reviewed crawler docs. Authorized referral analytics and logs show only observed visits/fetches; absent referrers and non-click answers limit coverage. Use a bounded manual panel of genuine buyer questions: record exact query, surface/model if shown, date/time, locale, session conditions, cited URL, factual accuracy and result limits. Repeat the same panel after a defined interval; keep all observations, including non-mentions. Report “observed in X of Y sampled answers,” never a universal rank/share. Separate citation, referral and qualified-conversion outcomes. Before/after movement alone is not causal proof; record seasonality, model changes and concurrent site edits.
