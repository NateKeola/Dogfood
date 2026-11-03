# A practical 100-candidate pilot, then 1,000

The first goal is a repeatable path to **a few defensible value demonstrations**, not an impressive raw lead count. No real batch has run. All numerical funnel and time figures below are planning assumptions, not measured conversion rates or sales promises.

## Define the ICP before buying data

Start with one jurisdiction, one catalog-heavy business category and one buying task. For example: a trade catalog with at least 200 products where a buyer knows an application/attribute but not the SKU. Agree industry/geography, acceptable business maturity evidence, relevant buyer/decision role, exclusions, maximum query count and evidence freshness. Registration age may guide sampling but never qualifies pain.

Use an evidence card for **task frequency, baseline failure, impact, owner, budget, integration reuse and economics**. Before a separately authorized paid pilot, require an identified decision owner, a confirmed budget/process, access to permitted catalog inputs, a measurable acceptance test and plausible support/API margins. Unknown owner/budget can remain an explicit question in a preparation queue; it cannot justify a quote or revenue claim. Negative economics or unsuitable integration requirements should reject the offer even when the website has friction.

The first reusable module should solve one narrow task: e.g. better product selection from application constraints, with known-SKU controls and transparent compatibility reasons. Avoid selling a generic chatbot or assuming every old/no-site business needs lead generation. A modular retainer needs recurring valuable work and a support budget; await the separate pricing research for market benchmarks and $10/$30/$40 add-on economics.

## Checkpoints and planning effort

| Stage | Working cap / assumed effort | Stop or continue decision |
|---|---|---|
| Source sample | 10 registry/licensed/manual rows, including edge cases | Validate source rights, jurisdiction, active/closed uncertainty, identity matches, home-based/privacy exclusions, duplicate rate and availability of relevant businesses. Stop if the seed is unsuitable. |
| Import | Up to 100 unique candidates; 10 per review chunk | Report imported, duplicate, conflicting, synthetic and real counts separately. Registry seeds missing websites stay in staging. No expectation all 100 qualify. |
| Identity/fit triage | Planning: 3 min × 100 = 5 hours | Require current operating and domain evidence plus fit/exclusion review. Record incomplete/reject/blocked separately. |
| Product-discovery audit | Planning: 25 shortlisted × 8 min ≈ 3 h 20 min | Up to 8 queries/site including repeats; control must succeed. Qualify a reproducible customer task, not a presumed search technology. |
| Contact review | Planning: 25 × 3 min = 1 h 15 min | Official mainline first. Optional paid enrichment only for approved gaps in a separately authorized sample. Missing contacts stay incomplete. |
| Original prototypes | Planning: 3 selected × 2 hours = 6 hours | Build actual original local demos only after scope agreement. Record simulation and measured task results. A brief alone remains planned. |
| Final preparation queue | Review every proposed ready row | Recheck freshness, identity conflicts, business phone, value brief, suppression and the exact question/demo. Calls/emails are still unauthorized. |

This illustrative allocation totals roughly **15 h 35 min**, excluding source setup, rework and conversations. Actual audit complexity can be much higher. Measure time per gate during the first ten records; revise the plan before expanding. The optional API arithmetic is in [INTEGRATIONS.md](INTEGRATIONS.md); labor is likely to dominate this small manual pilot.

## Pause, resume and retry

Set `batch_limit=100`, `review_chunk=10`, `max_audit_queries=8`, `max_attempts=3`, `freshness_days=14` and external budgets zero for this MVP. Use `pause` to stop task preparation, `resume` to continue, and repeat `run --limit 10`. Finished candidate/revision/provider tasks are skipped. State and audit entries persist transactionally. `run` remains a preparation command; no background scheduler is installed.

Stop for unexpected data/rights issues, blocked targets, rising identity conflicts, a cost threshold or a material change in scope. Imported text and provider/model responses cannot authorize continuation. If a future billable call has an uncertain outcome, reconcile it before retrying. Preserve `Retry-After`/quota failures; do not evade limits. The current disabled providers cannot incur costs.

## Gates before increasing to 1,000

1. Independently review at least 10 qualified and 10 rejected/incomplete rows (or all available if fewer). Look for false pain claims and missed appropriate cases. Record the sample selection and evidence, not a combined score.
2. Suggested pilot targets, to agree in advance: zero unresolved identity conflicts in ready rows, zero missing provenance, zero suppression breaches, at least 90% reproducibility of reviewed friction in a fresh spot check. These are proposed QA thresholds, not industry benchmarks.
3. Confirm at least one real scoped demo addresses a customer task and can be implemented with a reusable integration. No commercial demand is established until a real authorized conversation and outcome provide evidence.
4. Review cost per **qualified** prospect and per verified demo, including review/support time. Confirm account limits and separately approve any provider budget. Keep dollar spend, credits, tokens and labor separate.
5. Use ten batches of 100, each with ten-record QA samples, bounded concurrency and a pause after each batch. The runner permits at most 1,000 candidates in one configured job; its single-owner SQLite design should be reassessed before multiuser operation.
6. Share suppression across every batch before a contact campaign. Current suppression is workspace-local; a central suppression service/approved private CRM is a prerequisite for cross-workspace outreach. Do not use new workspaces to reset an opt-out.

## Report the funnel honestly

Count source seeds → website-resolved candidates → identity/fit-reviewed → reproducible pain-reviewed → current business-phone-reviewed → original value brief reviewed → call-preparation ready. Always include incomplete, blocked, rejected, suppressed, stale, duplicate/conflict and synthetic counts. Later actual results should separately count attempts, conversations, meetings booked, meetings held, pilots signed, pilots paid and measured delivery results, with channel attribution and dates. No calling/email actions are implemented here.

## Remaining decisions for a real run

The user must choose the actual ICP/geography/exclusions and permitted seed source, approve a real batch/review owner and private retention destination, and identify the actual account access/budget before any paid integration. A real 100-company run is not authorized merely by creating this prototype. External app credentials, enrichment purchases, communications, deployments and public sharing require separate instructions. No such action was taken.
