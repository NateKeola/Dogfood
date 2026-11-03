# Retainer economics

Reviewed 2026-11-02. This is a working **scenario model**, not a billing integration, API spend dashboard, forecast, valuation or validated customer price. All operating costs, support times, acquisition, churn and target margins are explicit hypotheses. The payment-processing example is anchored to [Stripe's published US pricing](https://stripe.com/pricing); a separate **1% billing allowance is unverified**, because the fetched [Billing page](https://stripe.com/billing/pricing) did not expose its numerical pay-as-you-go rate. Replace that allowance and actual provider costs before selling.

Run from the repository root:

```sh
python3 research/smb-service-opportunities/economics/model.py
```

Inputs: [assumptions.json](assumptions.json). Outputs: [24 scenarios](scenarios.csv), [price floors](price-floors.csv), [add-on sensitivity](addons.csv). Python standard library only; no network or credentials. The script checks accounting identities, adverse-support scenarios and the target-margin calculation.

## Core assumptions and treatment

Direct labor costs $60/hour. Base support is 15 minutes/account/month, including scheduled checks, communication, triage and reporting. Infrastructure is $3/account/month; shared overhead is $10, representing $200 spread over 20 accounts. The five-account pilot spreads the same $200 over five. These figures are planning allocations, not provider bills or evidence of scale discounts.

Acquisition costs $200 per new account. Setup is $399 for six total labor hours plus $30 other cost. After a 2.9% + $0.30 processing charge, setup net is $387.129 versus $390 implementation cost. Acquisition plus unrecovered setup therefore totals **$202.871**. A paid diagnostic credited toward the repair must fit within this same $399 total and six hours; it is not additional setup revenue. Customer interviews, failed sales and free demonstrations belong in CAC.

For a stable-size book with 3% monthly churn, the replacement allowance is $202.871 × 3% = **$6.08613/account/month**. This represents replacing lost customers with the same setup economics. It is not an extra cash charge to a single continuing customer. We separately show recurring contribution before replacement and simple lifetime contribution; do not subtract both unrecovered acquisition and the replacement allowance again in an LTV calculation.

Let `P` be monthly price, `r` processing plus billing rate, `F` the fixed transaction fee, `H` support hours, `L` labor/hour, `I` infrastructure, `O` allocated overhead, `C` unrecovered acquisition/setup, `q` churn and `m` target margin:

```text
recurring contribution = P × (1 − r) − F − H × L − I − O
economic contribution = recurring contribution − q × C
break-even P = (F + H × L + I + O + q × C) / (1 − r)
P at target margin m = (F + H × L + I + O + q × C) / (1 − r − m)
simple lifetime contribution = recurring contribution / q − C
```

Lifetime contribution assumes constant churn, constant costs and a geometrically distributed lifetime, without discounting. Payback divides C by positive monthly recurring contribution before replacement and ignores churn during payback. Neither is a guaranteed lifetime outcome. Setup fees are not ARR, monthly revenue is not profit, and this contribution measure excludes tax, financing, refunds, bad debt and extraordinary incidents. A 40% contribution target is a chosen planning cushion, not a known industry standard.

## Standalone accounts

Monthly economic contribution after replacement, USD:

| Monthly price | Batched base: 15 min support | Support stress: 45 min, higher infra/overhead | Five-account pilot: 30 min, $40 overhead | Base with 8% churn |
|---:|---:|---:|---:|---:|
| $10 | -$24.78 | -$64.78 | -$71.78 | -$34.92 |
| $30 | -$5.56 | -$45.56 | -$52.56 | -$15.70 |
| $40 | $4.05 | -$35.95 | -$42.95 | -$6.09 |
| $79 | $41.53 | $1.53 | -$5.47 | $31.39 |
| $99 | $60.75 | $20.75 | $13.75 | $50.61 |
| $149 | $108.80 | $68.80 | $61.80 | $98.66 |

The 40% target floors are **$61.29 base**, **$132.60 support stress**, **$145.07 low utilization**, and **$79.38 high churn**. These are conditional arithmetic results, not what customers will pay. They motivate a $149 care experiment during a small pilot and tight scope, not a claim that $149 is universally sustainable. $99 may work after real support and utilization data, or with a smaller service. An account with little recurring need should buy a one-off fix.

At $40 in the base scenario, simple acquisition/setup payback is roughly 20 months before churn. At $149 it is about 1.77 months; the five-account pilot stretches $149 to about 2.99 months. A zero-down site would increase unrecovered implementation cost and makes cheap retainers harder, not cheaper, to deliver.

## Incremental additions

Same invoice as an existing base account, so no new $0.30 fixed transaction fee, base overhead or CAC. Add-on setup must be paid separately or incorporated in a revised model. These margins cannot be substituted for standalone-account margins.

| Add-on price | Extra human time/month | Extra infrastructure | Incremental contribution | Margin | Break-even human time | Contribution if it takes 60 minutes |
|---:|---:|---:|---:|---:|---:|---:|
| $10 | 2 min | $0.50 | $7.11 | 71.1% | 9.11 min | -$50.89 |
| $30 | 10 min | $1.00 | $17.83 | 59.4% | 27.83 min | -$32.17 |
| $40 | 20 min | $2.00 | $16.44 | 41.1% | 36.44 min | -$23.56 |

This supports small menu items only when they add a bounded, distinct obligation. Billing each separately adds a fixed fee and administrative work. Broad “unlimited edits,” recurring custom content and live AI support do not fit these caps. Record actual minutes across quiet and incident-heavy months; averages hide tail risk.

## Acquisition and scale sensitivity

Researching 1,000 prospects for five minutes each takes **83.3 hours**, or $5,000 at the modeled labor rate, before calls, demos, follow-up or paid data. At a hypothetical 1% paid conversion, research alone costs $500/customer; at 3%, $166.67. These conversion rates are scenarios, not observed benchmarks. Measure cost per qualified conversation and acquired paying account, not just API cost per lead.

At 1,000 active accounts, 15 support minutes each is **250 hours/month**. Replacing 3% monthly churn means 30 new accounts; six hours each adds **180 setup hours**, before sales and incident work. Scaling this service therefore requires capacity, standardized delivery and measured exceptions. It cannot be assumed to run flawlessly or on one person's spare time.

Before adopting a price, replace labor/support assumptions with time logs; measure failed acquisition and cancellation reasons; get actual commercial infrastructure/tool quotes; record refunds and incidents; verify billing fees; and preserve a margin reserve. Small samples can validate delivery mechanics, but they do not establish long-run churn.
