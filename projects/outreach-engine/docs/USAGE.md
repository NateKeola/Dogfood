# Provider-neutral usage events

The separate API Spend Dashboard owns spend reporting. Outreach-Engine exposes a small local contract; it does not connect accounts, collect secrets, fetch invoices or build a second dashboard.

`schema.json` → `$defs.usage_event` and `fixtures/usage-event.example.json` define version 1:

| Field | Meaning |
|---|---|
| `event_id` | Stable event identity for downstream deduplication; never count a reimport twice |
| `provider`, `operation` | Short non-sensitive identifiers; no request/query text |
| `units`, `unit` | Nonnegative quantity, with candidate/request/page/credit/token/minute unit |
| `timestamp` | UTC time of the usage observation |
| `run_id`, `batch_id` | Opaque local job and invocation IDs; no prospect or account identifiers |
| `amount`, `currency` | Decimal major currency units and ISO currency code when known; both null when unknown |
| `cost_basis` | `actual`, `estimated` or `unknown` |
| `provenance` | `local_execution`, `provider_response`, `invoice`, `rate_card_estimate` or `unknown` |

```sh
python3 -B engine.py --workspace demo usage
python3 -B engine.py --workspace demo export usage
```

The export is `.local/demo/exports/usage.jsonl`. Each task attempt records an event in the same transaction as its durable task result. Skipped/resumed completed items do not add events. A manual preparation attempt records one candidate and zero external API dollars; a disabled adapter records zero requests and zero cost with operation `disabled-no-request`. These are actual facts about local execution, **not model-subscription costs or external invoices**. Error attempts are still attempts, not successfully audited candidates.

Future paid adapters must emit provider-reported usage/costs where available, or explicit estimates/unknowns. Unknown must never become zero. Keep API credits separate from currency and tokens; never sum incompatible units or currencies. Estimates and actual reconciliations need separate event IDs plus a future reconciliation reference before any dashboard sums them; this MVP does not emit paid estimates/reconciliations. An event's provider-response provenance still needs invoice reconciliation for billing accuracy.

Strict schema validation rejects account IDs, secrets, source URLs, prospect names, prompts, contact data and arbitrary extra fields. Identifier values are still the producer's responsibility: do not encode sensitive text into them. This exporter supplies opaque IDs and controlled provider/operation names. Transfer to a dashboard remains local/manual until its private ingest destination is approved. No upload occurs here.
