# Toolkit audit and changes

**Reviewed 2026-11-02.** Target: this toolkit's prior committed version (`9d5ffbed46c2965f29ee5df1ea3fe2246358d591`), not a business website. Review method: read prompt/checklist/schema/validator, compare claims with primary documentation, exercise evidence-contract fixtures and inspect the patch. Findings below are about package coverage/usability; no search performance was measured.

| Gap or risk found | Fix applied | Verification / remaining limit |
| --- | --- | --- |
| AI guidance was a short Google/Bing paragraph; no vendor control matrix or file-role distinctions | Added [AI_SEARCH.md](AI_SEARCH.md), including OpenAI/Claude search/user/training distinctions, exact agents.txt draft status and optional llms.txt tooling support | S32–S41; vendor docs do not establish guaranteed visibility or adoption of proposed files |
| Older Google AI reference was insufficient for current controls/reporting | Added current Search Console AI inclusion/inheritance control and dedicated impressions report; flagged stale source scope | S42/S62; no live account read/change; no dedicated API parity established in S43 |
| Industry research lacked a repeatable evidence table and campaign distinction | Added [INDUSTRY_RESEARCH.md](INDUSTRY_RESEARCH.md), intent clustering, query budget and separate local-service/wholesale outcomes | Empty reusable table; no fabricated client, competitors, volume or difficulty |
| Effort was free text and tools were not evaluated | Added [TOOLS_AND_LIFT.md](TOOLS_AND_LIFT.md), documented prerequisites/limits, permission boundaries and optional structured lift | Current Ahrefs Lite+ eligibility replaces obsolete Enterprise-only assumptions; Semrush package price and some quotas remain unverified |
| Applying every detail could make a small-site review cumbersome | Added bounded triage, top-five decision summary, optional module routing and a concise [service menu](SERVICE_MENU.md); shortened core workstream instructions | Full coverage still marks untested areas unknown; all observed critical issues remain in backlog |
| Export format had no lift contract | Added optional classes/band/assumptions without changing schema version or existing required fields | Legacy reports still validate; malformed lift records are rejected; estimates remain human judgments |

Preserved: privacy and prompt-injection boundaries, original eight workstreams, G1–G7, evidence/source separation, CWV thresholds, field/lab distinctions, local private-address handling, synthetic isolation and read-only default. No unsupported ranking guarantees were found in the prior package; these changes expand coverage and current-source precision rather than asserting a real site was defective.

## Validation and evidence gaps

Run the [README validation](README.md) against the final commit. The validator checks structure, local links/source IDs, synthetic/framework/legacy examples and negative evidence-contract fixtures. It does not check factual truth, sanitize private reports or certify search outcomes. Skill frontmatter validation and `git diff --check` are separate checks.

No target, vertical/geography, authorized analytics, actual subscription entitlement or deployment was provided. Thus no real website audit, SERP campaign, API integration, Lighthouse/CrUX measurement, live crawler-policy test or AI citation experiment was run. Primary links were opened and substantive sections reviewed; JavaScript-only Bing policy/retirement documentation was checked in a rendered browser. No account login was needed. Some source update dates are not displayed and remain unknown.

Remaining decisions for a pilot: choose a real campaign, provide an authorized target/output destination, confirm public business facts and access, agree sample limits and metric definitions, then re-estimate lift. API support for newer AI-report UI features and actual account quotas/prices must be verified before integration. Optional proposed files need an actual consuming implementation and an explicit test objective.
