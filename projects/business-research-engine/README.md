# Business research engine

A dependency-free local workbench for turning permitted candidate records into reviewed evidence, a qualified problem and an original prototype/offer plan. **No provider crawl or real prospect research has run.** Public Git contains only original templates, `.example` fictional fixtures, public policy links and curated archive patterns.

## Open locally

Requires Node 22+. From this folder:

```sh
npm start
```

Open `http://127.0.0.1:4174/`. The server binds loopback only and serves an explicit allowlist of built public assets. It has no upload, arbitrary URL fetch, proxy, provider, outreach or account endpoints. `PORT=4175 npm start` chooses another port if needed. The archive runs separately on port 4173. Local navigation links use those default ports; custom-port users should open the respective URL directly.

`npm start` builds from the six curated source groups in `../idea-archive/data/clusters.json` and the 15 references (including all 13 earlier records) in `ideas.json`. `dist/patterns.json` is generated, ignored output. There are no paid dependencies, backend services or credentials.

## Manual workflow

1. Use **Try fictional examples** to explore two unique test businesses. The three-row fixture includes one possible duplicate. Every source/domain ends in `.example`; no real phones, addresses or leads are included. Fictional rows never count as real candidates, including manual template imports.
2. Import a permitted CSV or JSON array matching `templates/intake.*`. Preview validation and duplicate suggestions before accepting. Unknown columns and verification/build flags are rejected. Limits: 2 MB, 500 rows per import. Imported evidence always starts unreviewed. Review sources' licenses and intended-use rules yourself; import permission is not inferred by this app.
3. Match company name plus locality, DBA and branch before assigning a website. Exact domains and normalized name/locality suggest duplicates; social/shared host domains do not. Suggestions do not merge data. You may explicitly retain separate branch/DBA records. No fuzzy merger or ownership assertion runs.
4. Review the exact cited source, record method, date, observation, identity match, limitations, license and publication allowance. Add findings as evidence. Contradictions remain visible; superseding requires a reason and preserves history. A missing directory field remains **website not listed**, never proof of absence.
5. Review actual customer friction and dated capacity/timing evidence. Age, registration dates, appearance, followers and search volume never qualify a business. Pending evidence, identity uncertainty or conflicts block prototype readiness. The analyst checkbox is an attestation; the application does not independently validate claims.
6. Select an original archive pattern. Default status is **planned — no customer demo built**. Built status requires an artifact URL, checked date, observed behavior and analyst attestation. Save hours and a planning rate. Price = hours × rate, explicitly a scoped hypothesis, not a quote or verified revenue. USD 75/hour is an illustrative editable assumption, not a market benchmark.
7. Download a **public original template** (no prospect data), or after qualification generate a **private offer brief** (includes bounded prospect context). Source videos remain linked. No calls, emails, social actions, deployment or automated sending is implemented or authorized by these gates.

## Presence and health

Presence: not reviewed; website not listed; website found; social-only observed; no site found in the reviewed sources; identity uncertain; unresolved/conflicting; business-confirmed no website. Business confirmation requires an explicit dated statement entered by an analyst. A scoped search is never omniscient absence.

Health: not checked; reachable; broken/possibly unavailable; blocked/unknown; parked/unrelated; conflicting. HTTP 403/429, timeouts, TLS/CORS/robots errors remain unknown. Browser cross-origin errors are not a health detector. No automated network checks run.

Registration/business-start dates preserve their source meaning. They are not necessarily founding dates or evidence of current operation. A registry-active label does not establish an operating company or a customer need.

## Private data and exports

Real records stay in localStorage on this exact browser origin (port included). They are not encrypted; anyone using this browser profile can access them. Browser data clearing can remove them. The server never receives imported records. File reads happen in the browser. An unreadable previous workspace is preserved; saving is disabled until recovery. Quota failures are visible, and the current tab can still export a private snapshot.

Private JSON snapshots preserve review history for offline inspection; they are **not** trusted re-imports. Intake deliberately accepts only the flat template fields and rejects imported verification flags. To re-intake a snapshot, extract only those fields and re-review. Private CSV summaries neutralize formula prefixes; they are review summaries, not the intake schema. Do not commit private downloads. `private/`, `imports/`, `exports/`, `.env*` and `*.local.*` are ignored and never served. Store real files there or outside the checkout, not alongside public assets. Public templates and private exports are separate buttons; there is no public prospect-sharing action.

Imported prose is rendered with textContent. Safe source links reject executable schemes and credentials; new tabs use noopener/noreferrer. CSP blocks inline scripts and third-party connections. Private briefs isolate prospect text inside an explicitly untrusted JSON data block and use original template instructions. These controls contain source content; they do not declare external sources prompt-injection-safe. No imported code, captions or scripts are executed.

## Provider constraints

See the visible Source Rules panel and `providers.json`, reviewed November 2, 2026. LA registry is a prospective licensed seed; OSM requires ODbL/shared-service review. Google Maps scraping and default Places lead harvesting are disabled; API access alone does not settle terms. Apollo enrichment is disabled pending access, credits and redistribution review. No adapter is authenticated or budget-approved. Rules and policies can change; verify before a future integration.

## Verification

```sh
npm run lint
npm run validate
npm test
npm run build
```

Tests cover CSV/JSON parsing, limits, dedup, synthetic counts, untrusted verification flags, presence/health distinctions, unknown/conflicting evidence, explicit no-site claims, qualification, build claims, safe URLs, formula-safe CSV and public/private brief separation. Desktop/mobile UI checks cover the manual path and repeated interactions. Website templates link the separately reviewed SEO planning checklist; no audit pass is claimed.

### SEO planning handoff

Website prototype briefs reference the [reviewed build checklist](https://github.com/NateKeola/Dogfood/blob/codex/holistic-seo-review/projects/seo-review/BUILD_CHECKLIST.md) on unmerged [draft PR #2](https://github.com/NateKeola/Dogfood/pull/2). These are planning/acceptance instructions, not completed SEO audits. Research and GTM worksheet briefs are not forced into website gates. Absolute branch URLs remain valid independently of merge order; recheck them if that branch is deleted. No other branch files were copied or edited.
