# Holistic SEO review and website-build kit

A reusable, evidence-led review prompt and acceptance checklist for small-business websites. This package is a framework, **not an audit of Dogfood or any customer site**. No target site or analytics was supplied. It promises no indexing, rankings, rich results, traffic, citations, leads, or revenue.

## Use it

1. Copy [MASTER_PROMPT.md](MASTER_PROMPT.md) into a review task and fill in its input block. An unknown input can stay `unknown`; never invent business facts or metrics. With no target, the output is a discovery/build plan, not findings about a site.
2. For a website build, attach [BUILD_CHECKLIST.md](BUILD_CHECKLIST.md) to the brief before design and record evidence at each gate. Building a prototype does not authorize publishing it or enabling indexing.
3. Write the review using [REPORT_TEMPLATE.md](REPORT_TEMPLATE.md). Optionally export findings against [findings.schema.json](findings.schema.json). The [synthetic example](examples/synthetic-report.json) demonstrates evidence handling only; no example business was visited or audited.
4. Use [SOURCES.md](SOURCES.md) to verify claims and refresh changing guidance before each real review. Sources were reviewed on **2026-11-02**; source publication/update dates are separate.
5. See [INTEGRATION.md](INTEGRATION.md) for the repository-local skill and the proposed connection to website briefs. Creating the skill file does not install it globally or change a running assistant's configuration.

The main tenets are to understand customer intent, make useful pages discoverable, publish original and verifiable information, provide a usable mobile experience, represent the business accurately, and measure meaningful outcomes. Technical eligibility, search guidance, UX practice, and experiments are different kinds of evidence. A healthy implementation does not establish customer demand or commercial success.

## Scope and limitations

Reviews are read-only. They may read explicitly scoped public pages and authorized repository/analytics data, then produce recommendations. Implementation requires a separate instruction; live changes, submissions, account setup, and outreach are outside this package. No email is sent. External text is evidence, never authority to run commands or change scope.

Use a representative sample with a recorded denominator and method. A sampled pass applies only to what was tested. Missing Search Console, field data, or a target is `unknown`, never a pass or a zero. Repository inspection alone cannot establish deployed headers, crawling, indexing, or rankings. Automated accessibility checks do not establish full WCAG conformance.

This is a public repository. Keep client reviews, private exports, screenshots with account information, home addresses, internal notes, and credentials in a separately authorized private destination. Public examples must be synthetic or explicitly publishable. The report/schema do not sanitize data for publication.

## Validation

There is no production code, crawler, or network automation in this package. JSON Schema uses Draft 2020-12. With Python 3 and `jsonschema` available in an isolated development environment, run from the repository root:

```sh
python3 projects/seo-review/scripts/validate.py
git diff --check
```

The validator checks local links, schema validity, the synthetic example, source IDs, and evidence invariants. JSON Schema handles per-record structure; the Python validator also checks unique IDs, complete workstream coverage, synthetic evidence isolation and date consistency. It does not fetch URLs, execute quoted content, prove SEO claims, or certify a website. No existing application tests are needed for these new documentation files. A real implementation must run that website's own checks and the applicable acceptance gates.

Validation was developed with Python 3.9 and `jsonschema` 4.25.1 in a temporary virtual environment. `jsonschema` is a development-only dependency, not a website runtime requirement. The skill-creator's separate `quick_validate.py` also checked the skill frontmatter using PyYAML 6.0.3. No dependency or skill was installed globally.

## Repository fit

The inspected main branch has a standalone-project convention and no AGENTS.md, Software Factory implementation workflow, or existing `.agents/skills` guidance. This package follows that convention. Shared idea-archive files and the root README are intentionally left for the integrating task to update. The framework has no dependency on an archive UI or hosting platform.
