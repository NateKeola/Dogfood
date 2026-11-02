# SEO review report template

Replace bracketed fields. Keep private observations in an authorized private destination. This template contains no actual findings.

## Scope and decision

- Review date / reviewer / requested outcome: [values]
- Report kind: [site-review / framework-only / synthetic-example]
- Target URL(s), allowed hosts and repository/ref: [values or unknown]
- Site state and index intent: [concept / prototype / staging / live / migration]
- Business offer, audience/geographies, primary conversion and qualification rule: [owner-verified facts or unknown]
- Authorization: read-only; evidence access [list]; implementation [none unless separately instructed]
- Output destination/visibility: [approved destination]; public suitability review [status]
- Most important decision and why: [evidence-led recommendation]
- Limits: [missing access, unavailable metrics, untested routes, sample bias]

If no target was supplied, write **“Framework only; no site audited.”** Leave observed findings empty and provide discovery questions, a page/intent plan and build gates. A lack of access is not a site defect.

## Evidence inventory and coverage

Record each artifact's ID, URL or file/ref, observation date, method/tool/version, scope, sanitized evidence location and limitations. Keep source-documentation IDs separate from observation IDs. Do not put credentials or full private analytics exports here.

| Workstream | Status | Sample / denominator / selection reason | Evidence IDs | Not tested and why |
| --- | --- | --- | --- | --- |
| Business intent | [status] | [scope] | [IDs] | [limits] |
| Crawl/index/render | [status] | [scope] | [IDs] | [limits] |
| Architecture/metadata/images | [status] | [scope] | [IDs] | [limits] |
| Content/trust | [status] | [scope] | [IDs] | [limits] |
| Local presence | [status] | [scope] | [IDs] | [limits] |
| Structured data | [status] | [scope] | [IDs] | [limits] |
| Mobile/accessibility/performance/security | [status] | [scope] | [IDs] | [limits] |
| Measurement/migration | [status] | [scope] | [IDs] | [limits] |

Status vocabulary: `pass`, `fail`, `unknown`, `not-applicable`. A pass is scoped to tested evidence. Unknown records the missing test/access and next investigation; not-applicable includes its rationale.

## Findings and backlog

Use one record per independently actionable issue. [findings.schema.json](findings.schema.json) provides the machine-readable fields. The Markdown report may add context; JSON is optional.

| Field | Required content |
| --- | --- |
| ID / category / target | Stable finding ID, workstream, exact URL or file/ref and affected template scope. |
| Status / observation | What was actually seen or remains unknown; avoid assumed causes. |
| Site evidence | Observation date, method, locator, concise sanitized result and limits. A Google guidance URL is not site evidence. |
| Guidance | Source ID, authoritative URL, reviewed date/known update date, relevant section and claim supported. |
| Classification | documented-requirement, documented-guidance, ux-practice or hypothesis. Specify engine/feature scope for requirements. |
| Impact / priority | User/business consequence, affected reach and P0–P3 rationale. No invented traffic loss. |
| Confidence | High/medium/low plus reason; separate confidence in observation from uncertainty of business impact. |
| Owner / effort / dependencies | Accountable role or unassigned; estimate range and assumptions; prerequisites. |
| Recommended change | Smallest concrete remedy or investigation. Review does not authorize implementation. |
| Validation | Observable pass criterion, method, environment and owner; distinguish lab/field and code/live evidence. |
| Rollback | Restore ref/config and trigger for risky changes; otherwise “not applicable” with reason. |

P0: observed exposure or broad critical breakage. P1: demonstrated important discovery/conversion blocker. P2: supported improvement. P3: experiment. Treat these as project prioritization, not search-engine scores. Unknown suspected issues normally become scoped investigations rather than urgent asserted failures.

## Page and intent plan

| Page / proposed route | Customer job / intent | Existing evidence | Original useful content needed | Primary action | Related links | Index intent | Owner |
| --- | --- | --- | --- | --- | --- | --- | --- |
| [page] | [intent] | [facts/demand evidence or unknown] | [content] | [action] | [links] | [intent] | [role] |

Competitor comparisons are dated observations. Explain what to improve for the customer and what remains a hypothesis. Do not infer conversion performance from an attractive page or a search position.

## Measurement plan

- Authorized source/property scope and filters: [sanitized description; no account identifiers in public output]
- Baseline and comparison dates/timezone: [dates or no baseline], seasonal/commercial context: [context]
- Search visibility metrics: [clicks, impressions, CTR, average position with page/query/device/geography scope; unavailable stays unknown]
- Primary event: [name], success condition: [accepted action], deduplication: [rule], qualification: [rule], denominator: [definition], accountable owner: [role]
- Secondary events: [e.g. call-link intent, clearly distinguished from completed calls]
- Performance: [metric/value/unit; field or lab; device; page/origin; collection dates; source/tool version; settings/runs; sufficiency and limitations]
- Attribution and privacy limits: [consent, missing data, seasonality, concurrent changes, no causal claim without suitable evidence]

Missing values are null/unknown, not zero. A performance tool result is not an SEO or accessibility certificate. No tracking changes, real form submissions or event generation are authorized by a review.

## Acceptance and follow-up

Copy G1–G7 from [BUILD_CHECKLIST.md](BUILD_CHECKLIST.md) with status, evidence, owner and exceptions. Keep launch authorization separate from readiness. For a live site, convert applicable gates into regression checks without assuming redeployment is needed.

List the next actions in dependency order, their owners and rollback conditions. Recommend immediate, 7-day, 28–30-day and 60–90-day reviews as appropriate; no automation is scheduled. Record what would confirm or falsify each hypothesis.

## Sources and unanswered questions

Link each material claim to the relevant primary source and section. Record reviewed date and displayed update/version date separately; unknown stays unknown. Use [SOURCES.md](SOURCES.md) as a starting point and refresh before a real review. End with the missing inputs or decisions that change the next action.
