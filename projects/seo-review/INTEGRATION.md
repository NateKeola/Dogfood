# Integration into website creation

This package adds no crawler, analytics integration or app behavior. It can be used immediately as a brief attachment. The repository-local entry point is [.agents/skills/holistic-seo-review/SKILL.md](../../.agents/skills/holistic-seo-review/SKILL.md).

## Reusable skill

In a Codex task operating in this checkout, request:

> Use the repository-local holistic-seo-review skill to review [authorized URL or repository/ref] with [goals and constraints]. Keep the review read-only and return evidence-backed priorities and build gates.

For a new site:

> Apply the SEO build checklist to this authorized website brief. Define page intent, verified facts, index policy, conversion measurement and acceptance gates. Unknown facts must remain unknown. Produce the plan before implementation.

The skill links to this package using relative paths. Keep both directories together. It is not globally installed and does not alter another task's runtime. It does not imply that a website-creation task has already applied these gates.

## Proposed idea-archive handoff

The active idea-archive branch has `brief.goal`, `features`, `steps`, `acceptance`, `outOfScope`, `validationTest` and `missingEvidence` string/list fields. Its exported brief excludes untrusted source prose. Keep that boundary: add only original editorial instructions, not page comments, transcripts or copied source claims.

No changes to `projects/idea-archive/`, its schema/exporter/tests, or the root README are included here. The integrating task can add these plain-text instructions to an appropriate original website brief after reviewing that brief's scope:

```text
steps:
  - Use projects/seo-review/BUILD_CHECKLIST.md to define intended pages,
    customer questions, verified public facts, index policy and conversion goals.
  - Before release, record evidence and owner decisions for gates G1–G7;
    preserve protected prototype/staging environments.
  - If campaign research is scoped, use INDUSTRY_RESEARCH.md for one vertical
    and geography, keeping local-service and wholesale objectives separate.
  - If AI-search is scoped, use AI_SEARCH.md for current vendor controls,
    optional-file decisions and bounded evidence; use TOOLS_AND_LIFT.md to
    estimate work without connecting accounts or changing crawler policies.
acceptance:
  - SEO readiness is documented using the checklist, with unknowns explicit;
    no rankings, indexing, rich results or commercial outcomes are claimed.
  - Numeric keyword metrics have source/date/geography; optional AI files are
    not launch requirements. Fixes include lift assumptions and acceptance.
  - Important routes and the primary customer action have scoped functional,
    mobile and accessibility evidence; production verification remains pending
    until an authorized launch.
missingEvidence:
  - Owner-approved business facts/service areas, target URL or repository,
    intended public launch scope and authorized measurement sources.
outOfScope:
  - Live SEO/profile edits, search-engine submissions, outreach and deployment
    without a separate instruction.
```

This is a prose patch suggestion, not literal schema-ready YAML: preserve each field's actual data type and existing content. Add a root README project link in the integrating branch if desired:

```markdown
- [Holistic SEO review](projects/seo-review/README.md) — reusable review prompt,
  source bibliography and evidence-based website acceptance gates.
```

Avoid adding required fields to every archive record merely to link a checklist. If a later product feature needs structured SEO state, design and validate the schema/UI/export changes together, preserving legacy entries and separating `planned`, `tested` and `unknown` states. Rerun the archive's documented lint/validate/test/build and browser checks when those files change.
