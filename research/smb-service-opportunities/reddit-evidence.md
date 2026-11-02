# Reddit access review and evidence ledger

Reviewed **2026-11-02**. **Community sample size: 0.** No thread evidence, prevalence estimate or customer-demand conclusion is available. Only official policy pages were searched and read. No Reddit posts, comments, usernames, profiles, votes or contact details were collected; no API signup, permission request, corpus download or outreach occurred.

## Access determination

| Official source | Source date shown | What it establishes for this project |
|---|---|---|
| [Responsible Builder Policy](https://support.reddithelp.com/hc/en-us/articles/42728983564564-Responsible-Builder-Policy) | Updated 2026-10-05 | API access requires approval; commercial use needs explicit written approval. The policy covers AI agents and public content. Its research section restricts research collection to approved RFR use. |
| [Developer Platform & Accessing Reddit Data](https://support.reddithelp.com/hc/en-us/articles/14945211791892-Developer-Platform-Accessing-Reddit-Data) | Updated 2026-05-28 | Business/product use is commercial; commercial data use requires permission and a contract. RFR is the stated route for eligible research. A noncommercial academic route is not a fit merely because a business project calls its work research. |
| [Public Content Policy](https://support.reddithelp.com/hc/en-us/articles/26410290525844-Public-Content-Policy) | Updated 2026-10-06 | Public visibility is not unrestricted commercial reuse. Licensing can impose deletion, privacy and use restrictions. |
| [Data API Terms](https://redditinc.com/policies/data-api-terms) | Effective 2023-06-19; revised 2026-07-20 | Commercial/otherwise unpermitted uses require a separate agreement. Authorized access, data retention and user rights still matter. |

Practical action: establish whether a **Reddit commercial agreement** or an authorized data provider covers this exact market-research use, derived summaries, retention and publication. Then configure the approved access mechanism and scope. An OAuth key alone does not establish permission. No applicable agreement was demonstrated in this project, so automated commercial thread sampling is **access-gated and unattempted**. This is not an API denial or an uncertain write outcome; no request was submitted. Exact terms and legal applicability should be checked with the provider before building a recurring system.

A generic search or fetch connector does not establish Reddit licensing. Do not route around this gate through old Reddit endpoints, mirrors, .json URLs, data brokers or alternate accounts. Do not assume an academic exemption. The project can continue with vendor pricing, public industry reports and customer interviews conducted through an authorized channel.

## Ledger

Machine-readable record: [reddit-evidence-2026-11-02.json](data/reddit-evidence-2026-11-02.json).

| Measure | Completed value |
|---|---:|
| Policy search requests | 1 |
| Policy result slots requested | 5 |
| Official policy pages fetched | 4 |
| Community queries executed | 0 |
| Unique community threads screened | 0 |
| Threads included / excluded | 0 / 0 |
| Firsthand buyer experiences / promotional anecdotes | 0 / 0 |

The unexecuted protocol below is preparation, not evidence. No claims such as “Reddit owners repeatedly complain about agency fees” may be made from this ledger.

## Bounded protocol after permission

The intended recent window is **2025-11-02 through 2026-11-02**, calculated as the review date minus 12 calendar months. Update the window when the study actually runs. Older material, if included, must be separately labelled and cannot fill the recent denominator silently.

1. Confirm permitted sources, queries, derivative storage, public citation and deletion handling with the approved provider. Resolve scope before requesting data.
2. Use four topical buckets: small-business buyer experience; cleaning/home-service workflow; web-design/SEO service delivery; entrepreneurship/pricing. Candidate communities include r/smallbusiness, r/Entrepreneur, r/web_design and r/SEO; actual available communities depend on permission. A topic bucket is not a claim of subreddit membership or respondent identity.
3. Pre-register two distinct questions per bucket, then request at most six ranked results per question: **48 candidate result slots**, target at most **24 unique eligible threads**, no more than six per bucket. Log actual returned, duplicate, inaccessible, date-excluded, irrelevant and promotion-only counts. Do not keep searching until a preferred story appears.
4. Query angles: paid website/SEO disappointing outcomes; successful DIY or existing-tool substitutes; unwanted agency pitches; cost/support/cancellation friction; qualification and missed-inquiry workflows; practical successes and reasons to decline more leads. Include counterevidence deliberately.
5. Record canonical thread URL, post date, review date, topic, retrieval method, brief original pain/objection paraphrase, product/service context, buyer self-report versus provider claim, promotion/conflict indicators, counterevidence and confidence. Do not retain usernames, full transcripts, contact details or sensitive personal information. Record unavailable/deleted material as unavailable and respect the agreement's removal obligations.
6. Distinguish firsthand self-report from verified experience: no identity verification is implied. Comments within a thread are not independent buyers, and multiple threads may involve the same speaker. Do not infer unique people from unique URLs or count votes as demand.
7. Publish only what the agreement and user-content rights permit. Summaries should pose interview questions and implementation hypotheses; they should never become a prospect database or unsolicited Reddit outreach list.

Potential research questions, **not findings**: Are owners buying peace of mind or measurable leads? Is cancellation/ownership more painful than sticker price? Which recurring tasks have actual repeat value? Are businesses booked out already? What do successful low-budget buyers do themselves? Which claim would make an agency pitch feel untrustworthy?
