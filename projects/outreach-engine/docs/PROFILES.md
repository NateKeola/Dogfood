# Reusable core and industry audit profiles

The core owns permitted intake, identity/deduplication, provenance, contacts, review decisions, freshness, suppression, private briefs, outcomes and usage exports. An ICP selects a **trusted built-in profile ID**; it does not supply executable rules. Industries, geography, buying workflow and exclusions remain ordinary ICP data. Real-source/provider adapters remain disabled.

## Built-in profiles

| Profile | Fit requirement | Pain requirement | Unknown handling |
|---|---|---|---|
| `catalog-discovery-v1` (default) | ICP industry/geography/maturity and a known catalog meeting `catalog_min_products` | Successful known-product/SKU control plus matching discovery friction repeated at two distinct times | Missing catalog/control, blocked access or unreproduced misses stay incomplete. No inference that semantic search is absent. |
| `local-service-inquiry-v1` | ICP industry/geography/maturity; catalog threshold is not applicable and may be null | Successful known-service control plus repeated friction in inquiry route, quote clarity, service area or contact navigation | Inconclusive public information stays unknown. No form submission, call, message or invented appointment; missing published prices alone does not prove friction. |

Both profiles require current business/domain and operating evidence, public accessibility, medium/high evidence confidence, a fresh reviewed business phone, a specific original brief and all human review gates. Both keep the same source/URL/privacy validation, query cap, immutable evidence IDs, conflict review, suppression, synthetic counts and safe exports. A profile cannot turn off any of these requirements or authorize outreach.

For the service control, confirm that a specific service is actually described on a public page. Then define a task such as finding the required information and next step for a quote. Reproduce a concrete navigation/information mismatch, not an assumption about how a business should price or sell. Unknown backend behavior and untested conversion impact must remain unknown. A no-website seed remains in registry/workbench staging; this second profile does not declare website absence from a blank field.

## Try both synthetic examples

```sh
python3 -B engine.py profiles
python3 -B engine.py --workspace catalog-demo demo
python3 -B engine.py --workspace service-demo demo --profile local-service-inquiry-v1
```

The catalog walkthrough retains five synthetic candidates and one demo-ready record. The service walkthrough has two synthetic candidates: one demo-ready and one with an unknown quote path. Both have **zero real prospects, live audits or outreach**. They reuse the same database schema, import, review, run/resume and export code. The service candidate has no catalog count and no SKU evidence. Both demo briefs remain planned.

For a real configuration, copy a permitted existing local file into a private working location and choose `audit_profile`. For service work, use the shape in `fixtures/local-service/icp.example.json`; its fictional industry/geography are examples, not a discovered market. Imported profile objects, custom gate definitions, scripts, paths, skip flags and unknown IDs are rejected. To add a third audit family later, change and review the trusted source code plus tests; never load executable rules from a dataset or source page.

## Evidence origin is separate from a decision

Evidence has an optional `origin`: `manual`, `agent`, `synthetic` or `legacy_unspecified`. Omission means `legacy_unspecified`; it never silently becomes manual. An origin is an untrusted provenance assertion, not authentication or independent truth.

- `manual` records a claimed direct observation that a human still must review.
- `agent` is a suggestion; it cannot satisfy any evidence gate, even with a `pass` result and high confidence. No agent provider is connected here.
- `synthetic` can satisfy simulated gates only for a synthetic candidate and cannot be added to a real candidate.
- `legacy_unspecified` remains readable but cannot satisfy evidence gates until a new observation is recorded.

A new manual observation may include `rechecks_evidence_id` to identify the earlier suggestion/legacy record it actually rechecked. The old record stays unchanged; the new one needs its own observation and real checked time. Copying a source claim into a manual field is not verification. Human approvals remain separate interactive `review` commands, never an imported field. `status` exposes per-origin counts. A future model must not receive the approval interface or general shell authority.

## Compatibility and approval migration

Existing version-1 ICP files without `audit_profile` retain the catalog profile. Candidate, contact, registry, brief and outcome shapes remain compatible; `catalog_size` already allowed null. Service profiles allow `catalog_min_products=null`; the catalog profile rejects null. Existing evidence without `origin` is readable as unspecified.

**Old approvals must be reviewed again.** Each new decision records a fingerprint of the full ICP, trusted profile definition and shared policy version. An old decision without this fingerprint, or one whose fingerprint differs, is treated as pending; its history remains in the audit log. New observations still change the candidate revision. Interactive confirmation binds both revision and policy fingerprint to prevent approval of a different context.

ICP changes remain rejected within an initialized job. Choose a new workspace for a changed ICP/profile and independently re-review; approvals are never imported. Changing the trusted profile definition or incrementing the shared policy version invalidates incompatible stored decisions and re-prepares stale local tasks. Before changing shared gate semantics in future code, increment `REVIEW_POLICY_VERSION`. Current workspace-local suppression limitations still apply: carry the complete suppression set into any separately authorized later campaign, never use a new profile/workspace to evade it.

Public-template export selects one of two fixed original text files using the built-in ID. It interpolates no prospect, source or model text. Private queue CSV adds `audit_profile`; consumers that require exact columns should account for this additive field. Usage events retain their existing schema.
