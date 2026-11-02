# Industry and ICP analysis

Reviewed 2026-11-02. US-first pilot assumptions; no market-size estimate. Geography and budget must be validated with the buyer. Evidence supports problem discovery, not a claim that a vertical will buy.

| Candidate | Buyer and workflow hypothesis | Evidence and alternatives | ROI/budget proxy to obtain | Capacity, friction and technical lift |
|---|---|---|---|---|
| Established residential cleaning business, one service area | Owner or office manager; incomplete inquiries, unclear service scope and recurring pre-sale questions | Jobber reports cleaning firms have relatively more spare capacity. Owner-reported communication and quoting burdens span home services. Existing alternatives include referrals, Business Profile, an existing website/form and field-service software. Reconfigure an owned tool first. | Actual contribution margin of one recurring customer; quote volume and conversion; time spent qualifying; incremental capacity. No assumed job value or lifetime value. | Low-to-medium for a form and service page on a supported stack; higher if replacing scheduling/payments. Owner must approve copy and respond to inquiries. No instant quotes without pricing rules. |
| HVAC/plumbing operator | Owner/dispatcher; urgent inquiry routing and qualification | Same Jobber report says HVAC is highly booked. More traffic may worsen service quality. Existing phone/dispatch systems can already solve routing. | Unanswered qualified calls, cost of dispatch time, spare capacity by job type; compare repair vs installation economics. | Higher operational risk: urgent calls and false availability. Avoid diagnosis, emergency triage promises and autonomous scheduling in an initial offer. |
| Apparel distributor/decorator with an established catalog | Owner, sales operations or ecommerce manager; variant discovery and quote preparation | S&S publishes product, inventory and pricing integration docs; SanMar documents authenticated services and an integration agreement. Incumbent supplier portals, ecommerce plugins and ERP/PIM workflows are alternatives. Their existence does not prove dissatisfaction. | Quotes/week; rep minutes per quote; rework caused by wrong variants; completed orders and gross contribution, excluding pass-through supplier cost. | Read-only small-catalog prototype can be bounded. Production requires authorized feeds, data rights, variant mapping, customer-price separation, freshness and support. Larger budget possible but unmeasured; access and approvals lengthen sales. |
| Industrial/MRO distributor | Sales/branch operations, ecommerce lead, sometimes IT/security | Channel Marketing Group's sponsored buyer research emphasizes price checks, product research and inventory visibility. Accurate search and ordering matter alongside the website itself. Existing ERP search, distributor portal and B2B commerce platforms may already suffice. | Search failures, zero-result queries, repeated rep lookups, quote cycle time and order errors; willingness to pay for a measured time saving. | Highest initial burden: ERP/PIM, units, equivalent parts, permissions, customer pricing, stock and possible procurement integration. No safety-critical substitution advice. Better second-stage project with an internal champion. |

Sources: [Jobber, 2026](https://www.getjobber.com/home-service-trends-report/), [Channel Marketing Group preview, May 2025](https://electricaltrends.com/2025/05/01/ecommerce-survey-results-preview/), [BigCommerce report landing page](https://www.bigcommerce.com/resources/2025-industrial-buyer-report/), [S&S integrations](https://www.ssactivewear.com/marketing/edi), [S&S product fields](https://api.ssactivewear.com/V2/Products.aspx), [SanMar integration guide](https://www.sanmar.com/medias/sys_master/root/h5b/hde/10127344533534/SanMar-Web-Services-Integration-Guide-v18.8.pdf?attachment=true).

## Why cleaning first

The proposed pilot combines a visible acquisition/qualification workflow with relatively little system integration. It avoids assuming that a booked-out trade needs more demand and avoids the catalog complexity that is intrinsic to distributor projects. That is an implementation-risk judgment, not a proven revenue ranking. A warm distributor relationship with clean data and a quantified problem could reverse the choice.

Qualification requires all of the following: an established service and actual customers; an owner or office manager who can approve changes; an existing site/domain they control; capacity for the requested job type; a reproducible inquiry defect or information gap; a supported platform; permission to measure outcomes; and agreement to a fixed scope. Reject prospects whose current tools already solve the issue or whose primary bottleneck is staffing, pricing, workmanship or cash flow.

Do not infer willingness to pay from poor design. A directory entry is not a qualified prospect, and business registration is not proof of active trading, budget, ownership or website need. Locality-specific sourcing, registry coverage and outreach permissions must be resolved separately before contact.

## Customer-value measurements

Use customer value = verified staff minutes saved × the customer's agreed time value + incremental fulfilled jobs × contribution per job − incremental fulfillment/marketing costs. Track the time and job components separately to avoid counting the same gain twice. Website traffic and form submissions are intermediate outcomes, not profit. A click-to-call event is not evidence that a call connected.

For low-volume sites, compare task success (can a visitor identify services, coverage and the next step?) and delivery reliability before claiming conversion improvement. Use 30 days of baseline and 30–60 days after launch when volumes permit; report sample size, seasonality, pricing changes, ad changes and service capacity. Without enough events, report direction and operational evidence, not statistical uplift.

## Candidate intent clusters, not keyword-volume research

| Vertical | Search-intent hypotheses | What validates them |
|---|---|---|
| Cleaning | recurring house cleaning in [actual service area]; move-out cleaning scope; cleaning quote; what is included; pet/entry arrangements | Owner's real jobs, approved service area, Search Console queries and customer questions; then a permitted keyword tool. Do not create doorway pages for every township. |
| Apparel | [brand/model] size and color availability; decoration-compatible garment; bulk quote; order minimum | Authorized supplier fields, search logs and rep questions; distinguish wholesale account pricing from public prices. |
| Industrial | exact part number; documented specifications; stocked product category; request availability | Approved catalog, authorized query logs and buyer interviews; no invented compatibility or equivalent parts. |

## Evidence limits

Jobber surveyed 1,050 US owners through Conjointly in December 2025 and publishes a ±3-point margin at 90% confidence. Its customer-expectation statements largely appear within an owner survey; do not relabel them as an independent consumer experiment. Associations between AI use and successful operators are not evidence that AI caused success. This memo uses the capacity and workflow signals rather than the causal marketing claims.

Channel Marketing Group's May 2025 preview says “almost 400” buyers; BigCommerce's later industrial article identifies 345 respondents. Treat this as a preview/final-sample discrepancy and avoid merging denominators or projecting results onto all small distributors. Research is sponsored by an ecommerce vendor, and the public landing page is less detailed than the gated report. No form was submitted to obtain it. The SanMar guide version is v18.8; current onboarding, limits and permissions must be reconfirmed before implementation.
