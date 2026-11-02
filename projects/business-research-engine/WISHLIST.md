# Research engine requirements

Updated 2026-11-02. This is a project-specific public requirements log, not a prospect dataset.

| Request | Status | Current result / next validation |
| --- | --- | --- |
| See a first useful business research engine | Implemented | Local manual CSV/JSON intake, evidence review, qualification and original prototype offers. No live provider or real lead dataset. |
| Find businesses with an unmet web need | Implemented with manual gates | Missing website fields trigger investigation. Presence, health, identity, actual friction and capacity remain separate. Test with a small permitted private dataset next. |
| Deduplicate companies and domains | Implemented | Exact-domain and normalized company/locality suggestions; explicit branch/DBA review. No silent merges. |
| Preserve conflicting and unknown evidence | Implemented | Dated observations and superseded history, independent health classification, readiness blocks. |
| Show what is built, what it does, why it helps and a scoped price | Implemented | Planned default, evidence required for analyst-attested builds, linked source videos, original scope and editable estimate hypothesis. Validate usability with a real business before quoting. |
| Keep real prospects private | Implemented | Local browser state, private exports, ignored local directories; public templates contain no prospect context. |
| Secure source intake | Implemented | Text rendering, input limits and validation, safe links, formula-safe CSV, no arbitrary fetch or source execution. |
| Evaluate registry / OSM / enrichment providers | Documented; integration deferred | Public source rules and links recorded. All adapters disabled pending current rights, scope and budget review. |
| Account-based multichannel outreach playbook and measured pilot | Strategy pending | No sending, dialing or social automation. Research readiness does not authorize contact. |
| Shared SEO acceptance checklist | Linked planning reference | Absolute links to unmerged draft PR #2; website acceptance gates remain untested, with no copied toolkit files. |
| Import verification history / team sync | Deferred | Private snapshots are inspectable; re-intake resets trust. Validate demand before adding backend or collaboration. |

## 2026-11-02 — SEO planning integration

**Linked, not audited:** appropriate website prototypes now reference the [reviewed checklist](https://github.com/NateKeola/Dogfood/blob/codex/holistic-seo-review/projects/seo-review/BUILD_CHECKLIST.md) and [integration proposal](https://github.com/NateKeola/Dogfood/blob/codex/holistic-seo-review/projects/seo-review/INTEGRATION.md) on unmerged draft PR #2. Research/GTM worksheet briefs retain their own scope. Define page intent, verified facts, index/privacy policy and conversion goals; document applicable gates G1–G7 before separately authorized launch. Unknowns stay unknown. No live edits, submissions, deployment, ranking promises or passed audit claims. Earlier pending integration items are superseded by this entry; merge order remains unresolved and absolute branch URLs avoid broken local links.

## 2026-11-02 — Configurable research core and related projects

The next product direction is an **industry-agnostic core with configurable industry and audit profiles**. The current MVP remains a manual workflow centered on business web presence; broader profiles are planned, not implemented. Keep common intake, identity matching, deduplication, evidence, uncertainty, qualification and reporting in the core. Profiles should supply industry-specific questions, evidence requirements, audit criteria and output templates without treating one industry's assumptions as universal.

| Direction | Status | Intended output / next validation |
| --- | --- | --- |
| Configurable industry and audit profiles | Planned | Define a small profile contract, then compare two materially different industries before refactoring the core. Preserve manual review and explicit unknowns. |
| Free, permitted public datasets as candidate sources | Source strategy; adapters not implemented | Prefer sources with documented license, intended-use, provenance and freshness. A free dataset is not automatically unrestricted, complete or evidence of a business need. Keep real candidate records local/private and evaluate a bounded pilot. |
| Useful alternatives to Ahrefs-style outputs | Planned output comparison | Produce evidence-linked page/opportunity audits, service/query research worksheets and prioritized experiments using permitted inputs. Do not imply a proprietary global keyword-volume database, backlink index or competitor-traffic estimate exists. |
| Useful alternatives to vidIQ-style outputs | Planned output comparison | Produce source-linked content/video briefs, observed-pattern comparisons and testable next actions. Show coverage and dates; do not imply comprehensive platform analytics, hidden creator data or a proprietary prediction model. |
| Ahrefs and vidIQ integrations | Optional, not requirements | The core and its useful reports should work without either subscription. Add an integration only after a specific output gap and its access/cost/terms are established. |

### Related project status

These are separate workstreams. A link records context, not a merged integration or validated business outcome. PR statuses below were checked on 2026-11-02.

| Related project | Status | Relationship to this workbench |
| --- | --- | --- |
| [SEO and AI-search toolkit — PR #2](https://github.com/NateKeola/Dogfood/pull/2) | Open draft; unmerged | Evidence-led website planning and acceptance reference. Website briefs already link its checklist; no site audit pass is claimed. |
| [Outreach-Engine — PR #3](https://github.com/NateKeola/Dogfood/pull/3) | Open draft; unmerged | Separate local prospect-preparation project. Plan a reviewed handoff of qualified evidence and original briefs; no integration or outreach execution is claimed here. |
| [Service-market and pricing research — PR #4](https://github.com/NateKeola/Dogfood/pull/4) | Open draft; unmerged | Research on service offers, scoped pricing and retainer economics. Use it to inform hypotheses and validation, not to present assumed prices or demand as proven. |
| API spend dashboard | In progress; no verified PR link yet | Future visibility into API usage, costs and budget decisions. Integration remains pending; no completed dashboard is claimed. |
