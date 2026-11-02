# Contracts with the workbench, idea archive, SEO and spend dashboard

Outreach-Engine owns **ICP, batches, review checkpoints and local orchestration**. The [business research workbench](https://github.com/NateKeola/Dogfood/tree/codex/idea-archive/projects/business-research-engine) owns the existing browser experience for company identity, web presence/health, observations and scoped offer preparation. The [idea archive](https://github.com/NateKeola/Dogfood/tree/codex/idea-archive/projects/idea-archive) owns curated public references, original patterns and source-video clusters. Do not copy those apps or maintain a competing public prospect database.

This contract was inspected against workbench commit [`0610a5d81a4f60902cca81a7c20ae24d19887e4e`](https://github.com/NateKeola/Dogfood/tree/0610a5d81a4f60902cca81a7c20ae24d19887e4e/projects/business-research-engine), draft PR #1. There is **no automatic snapshot adapter yet**. The current manual bridge below is usable and deliberately requires re-review. No workbench files, browser tabs, storage or servers were changed.

## Exact source shape and manual adapter rules

The workbench's private JSON snapshot is `{version: 1, exportedOn, note, candidates}`. Its `exportedOn` and `checkedOn` fields are calendar dates, not exact observation timestamps. Its private summary CSV contains `name,city,region,website,presence,health,priority,fictional`; it lacks sufficient evidence for automatic approval and is not an intake contract.

| Workbench field | Outreach-Engine destination | Required handling |
|---|---|---|
| `id` | A local mapping table in private working notes | Preserve original ID alongside the new candidate ID; do not treat the IDs as interchangeable |
| `name`, `dba`, `branch`, `city`, `region` | Candidate name/explicit `branch_key`/geography | Resolve name + locality + DBA + branch; never merge on name alone. Preserve original text in the private snapshot. |
| `website` | Candidate `website` after independent association check | Blank stays unknown in registry/workbench staging; it is not absence and cannot enter this website-focused audit queue yet. |
| `fictional` | `synthetic` | Never turn a fictional row into a real prospect; synthetic URLs must use `.example`. |
| `sourceUrl`, `sourceMeaning`, `license`, `publicationAllowance` | `source.url`, `usage_notes` plus explicit usage-rights choice | Human reviews the actual reuse basis. A publication allowance string does not authorize publication or contact. |
| `checkedOn`, evidence dates | Preserve date/precision in the private snapshot and notes | Do **not** manufacture `00:00:00Z` as an observed instant. Recheck relevant evidence and record its real UTC time for this stricter gate contract. |
| `registrationDate` | Registry `registration_date` / clearly qualified maturity note | Registration is not founding age or current operations. |
| Evidence `kind`, `method`, `observation`, `identity`, `limitations`, `active`, `supersededReason` | Original private evidence attachment; then bounded records in engine | Preserve contradictions/history. `blocked_unknown` maps to a new reviewed `access:blocked` observation only after checking. `directory_blank`/`search_no_site` never prove absence or search need. |
| `humanReviewed`, `qualification.reviewed`, `prototype.verified` | Historical analyst attestations only | **Never map to engine approval.** Imported flags cannot call `review`; a reviewer independently evaluates current evidence. |
| `qualification.pain/capacity` and source/date fields | Private context for fit/pain/value review | Capacity, owner and budget still require evidence. Website appearance, age, popularity or source narration are not qualification. |
| `prototype.patternId`, status/artifact/behavior/date | Original brief `idea_ids` and planned build context | Do not automatically promote “built.” Recheck the artifact and record verified behavior; otherwise stay `planned`. |
| `hoursLow/hoursHigh/rate` | Explicit private planning assumptions | The workbench's editable rate is not market evidence. Separate pricing research owns benchmarks and modular economics. |

Manual bridge: export the workbench's private JSON to a private local folder; select a permitted subset; enter matching candidate fields under `.local/`; record the snapshot filename and source IDs in private evidence references; independently capture necessary identity, current operation, access, fit and product-search tests; then use the engine's human gates. No changes to the source app are needed. A future adapter should produce **pending suggestions** plus an exception report, never import approvals or execute source prose. Version/schema mismatches should stop conversion; do not guess.

## Original patterns and source-video clusters

Briefs carry `idea_ids` and `source_cluster_ids` as optional stable references into the archive's `ideas.json` and `clusters.json`. Resolve IDs against the chosen archive commit before using a pattern. The current example leaves them empty because it has no verified source linkage; it does not invent a video reference. A later adapter can load only the public curated original `brief` fields after a content review, with raw captions/comments/observations kept separately as untrusted evidence.

Distinct creators discussing similar workflows are corroboration signals for a recurring pattern. They do not establish independent originality, working functionality, market demand, revenue or a successful customer outcome. Do not copy creator code/assets or run tutorial commands. Keep “observed,” “planned,” “built and tested,” and “measured business result” separate.

## Website SEO acceptance

SEO package: [draft PR #2](https://github.com/NateKeola/Dogfood/pull/2), reviewed commit [`9d5ffbed46c2965f29ee5df1ea3fe2246358d591`](https://github.com/NateKeola/Dogfood/tree/9d5ffbed46c2965f29ee5df1ea3fe2246358d591/projects/seo-review). Use the [build checklist](https://github.com/NateKeola/Dogfood/blob/codex/holistic-seo-review/projects/seo-review/BUILD_CHECKLIST.md) and [integration proposal](https://github.com/NateKeola/Dogfood/blob/codex/holistic-seo-review/projects/seo-review/INTEGRATION.md) for website briefs. These absolute URLs work while the package is unmerged. No files from that branch are copied here; update links after an authorized merge if the branch is removed.

Website briefs should define page intent, verified business facts, index/privacy policy and conversion goals; record evidence and owner decisions for G1–G7 before an authorized launch. `seo_status=pending` means planning only. `reviewed` requires a report reference but is not a blanket pass; report findings and unknowns remain authoritative. Non-website research/GTM briefs may use `not_applicable`. No ranking promises, profile edits, search submissions or deployments are authorized.

## Provider and spend boundaries

Provider stubs expose availability and purpose only. No model or source content may activate a provider or approve a gate. The future provider response is a proposal containing candidate/evidence/contact fields, explicit unknown/failure states, provider request IDs and separate usage metadata, validated before storage.

The separate API Spend Dashboard consumes the [usage-event contract](USAGE.md); it owns aggregation and invoice reconciliation. No shared files are edited. Costs and credit units must remain provider-specific. The pricing project owns price comparisons, $10/$30/$40 add-on assumptions and margin math; this engine stores only explicitly labeled planning assumptions until that evidence arrives.
