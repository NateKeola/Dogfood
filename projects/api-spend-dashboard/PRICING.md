# Dated pricing assumptions

Checked **2026-11-02 UTC** using official public documentation. Currency: **USD**. Recheck after 30 days and before a purchase. Account-specific eligibility, discounts, tax, prepaid balances and billing cycles remain unverified.

| Baseline | Unit and rate | Official evidence |
| --- | --- | --- |
| Exa Lite | $0.004/search, up to 10 results; extras vary | [Pricing](https://exa.ai/docs/admin/pricing) |
| OpenAI GPT-4.1 mini, standard text | $0.40/1M input tokens; $1.60/1M output tokens | [Model pricing](https://developers.openai.com/api/docs/models/gpt-4.1-mini) |
| Browserbase Developer, optional | $20/month, 100 included browser hours, then $0.12/hour | [Plans](https://docs.browserbase.com/account/billing/plans) |
| Apollo people enrichment | 1–9 credits depending on returned data; waterfall can cost more | [API credit rules](https://docs.apollo.io/docs/api-pricing) |
| Local browser and storage | External API cost assumed $0; labor/hardware excluded | Explicit planning assumption, not provider pricing |

The illustration chooses a small known text model to make arithmetic reviewable, not as a “latest” recommendation. It excludes caching discounts, Batch discounts, images and tool fees. Exa's [public plan](https://exa.ai/pricing) advertises $10 monthly promotional credit; default remaining credit is **0** until the user confirms eligibility and remaining balance. Search-result content is not charged twice as a separate contents request in this model.

Apollo's [pricing page](https://www.apollo.io/pricing) distinguishes monthly billing from annual commitments. Verify the actual seat fee and credit cycle in your account. The calculator deliberately has no universal dollar-per-credit rate. Enter a documented **overage** rate only; put a subscription fee in overhead once. Included credits consume a remaining allowance, not another amortized per-credit fee. Unknown overage pricing leaves the full forecast incomplete unless all demand is covered by the entered allowance.

## Calculation

For candidates `N`, audit rate `a`, extra-attempt rate `r`, searches per candidate `q`, and enriched share of audited sites `e`:

```text
audits = ceil(N × a)
audit attempts = ceil(audits × (1 + r))
search requests = ceil(N × q × (1 + r))
Apollo credits = ceil(audits × e × (1 + r)) × selected depth (0, 1 or 9)
Exa net usage = max(0, requests × 0.004 − remaining eligible USD credit)
model usage = attempts × (input tokens × 0.40 + output tokens × 1.60) / 1,000,000
browser hours = attempts × max(1, ceil(minutes per attempt)) / 60
remote browser overage = max(0, hours − remaining included hours) × 0.12
Apollo overage = max(0, credits − remaining included credits) × entered overage rate
subscription commitment = optional Browserbase $20 + other monthly subscriptions
allocated overhead = subscription commitment × allocation share
batch forecast = marginal usage + allocated overhead
```

Rates in the formulas use fractions (50% = 0.5). Rounding avoids binary floating-point artifacts around whole attempt counts. Browser time has a one-minute minimum per session in the source plan. The comparison is an alternative scenario using the same remaining allowances, not an additional batch to sum with the first.

With default assumptions, 100 candidates produce 50 audits, 55 audit attempts, 110 searches, **14 Apollo credits**, and a known search/model subtotal of **$0.5984**. The full forecast stays **incomplete** because Apollo overage dollars are unknown. At 1,000 candidates the corresponding known subtotal is **$5.984**, plus **138 credits**. Neither is a customer-acquisition cost or a price for a complete outreach engine.

No forecast includes tax, local labor, human review, support, browser proxy bandwidth, premium research/SEO/video, prototypes, hosting or outreach costs. Add actual charges separately. No account-level hard spending cap has been established.

## Estimate versus reported cost

Exa's [Search response](https://exa.ai/docs/reference/search) documents `costDollars` as estimated request cost. Preserve that as `estimate` when appropriate rather than turning it into a reconciled invoice. Exa's [admin period report](https://exa.ai/docs/reference/team-management/get-api-key-usage) exposes billing totals after separate access setup. Browserbase usage units and Apollo credits likewise require reconciliation; they are not automatically actual USD.
