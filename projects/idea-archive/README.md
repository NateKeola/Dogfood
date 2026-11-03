# Idea archive

A lightweight, searchable gallery for taking public examples into original small-business prototypes. Search by pattern, business, creator, or use case; filter by collection, business type, evidence method, difficulty, and build status. Open a reference to compare observed evidence with its original MVP brief, then copy or download the brief.

The dated [project wishlist](WISHLIST.md) tracks requested capabilities and the next research directions, including YouTube build workflows and service-business lead sourcing/GTM. Pending research is not presented as reviewed content.

## Open locally

Requires Node.js 22 or newer. No package installation, account, backend, API key, or paid service is needed.

```sh
cd projects/idea-archive
npm start
```

Open **http://127.0.0.1:4173**. Set `PORT=4174 npm start` if that port is busy. Directly opening `index.html` as a file will not load the JSON/module data. An individual idea can be opened with `#idea=transparent-service-estimate` after the URL.

The archive keeps no user data, makes no form submissions, and saves no browsing state. Copy writes only the generated public brief to the clipboard; if clipboard access is unavailable, a selectable text area appears. Download produces an original Markdown brief. External sources open in a new tab. Browsing Instagram may require sign-in depending on Instagram's current access rules.

## What's here

The November 2, 2026 collection contains **15 public references and 15 original planned briefs**:

- **7 Instagram Reels:** sampled playing frames and visible captions, reviewed muted. Audio was not reviewed. One is explicitly an AI-labeled café visual concept; another is a design-tool workflow. None establishes a working backend or a completed prototype.
- **3 supplemental website references:** WILDE and Greyparrot retain their published **Visual + text** methods; Podium Automation retains **Text only**. These observations come from the existing [November 2 research snapshot](../../research/website-inspiration/data/2026-11-02.json), not a new site inspection.
- **0 uncited concepts, 0 completed builds.** The separate untested-concepts collection is intentionally empty. The café concept remains an observed Reel reference, with its conceptual nature explicitly identified.
- **0 pending intake examples.** The intake template is not rendered as a collected example.
- **5 reviewed YouTube entries:** two recent Claude/Higgsfield build workflows and three older local-research/sales fundamentals. All five were sampled visually, not watched end to end. Four include readable transcript coverage; the restaurant workflow uses sampled frames, metadata/chapters, and a companion article without a readable transcript. No tutorial was reproduced or source code executed.

Reel public visibility was checked through public discovery, playable posts, and creator post/Reel grids without a private-account gate. Logged-out playback was not tested. Each record distinguishes direct visual observations from caption claims and lists what was not tested. Creator attribution identifies the public post author; website attribution identifies the publisher, with designer/agency attribution left unrecorded where unknown.

The service-estimate brief is a practical first interactive prototype. Its demo rates must be fictional and labeled; real pricing rules require business approval. A brief is a plan, not a claim that the proposed build exists.

## Credibility and popularity

Every record separates **Reach**, **Implementation evidence**, **Business evidence**, and an original **Practical fit** assessment. Source attribution/public visibility, observed content, functioning artifacts, reproducibility, outcomes, and AI labeling are independent dimensions. `unverified` means untested, not proven broken. Unknown AI labeling does not mean non-AI provenance.

The seven Reel records contain site-displayed engagement and follower snapshots observed November 2, 2026. Each metric stores its numeric value (or null), raw display, `exact`/`rounded`/`hidden`/`unavailable`/`unknown` status, individual UTC timestamp, and public source URL. Exact follower counts came from visible accessibility labels; rounded profile headings are retained alongside them. Rounded K counts are approximate, not audited exact counts. Views were not displayed and remain null. The design-workflow Reel's like count was not displayed and remains null. Unknown values are never substituted with zero.

The five YouTube records retain observed views/likes and rounded subscriber displays. Their review supplied a shared observation window, **November 2, 2026, 20:50–21:02 UTC**, rather than per-metric instants. `observedAt` therefore remains null and `observedWindow` records minute-precision bounds. The UI shows the range explicitly. Comments and other unsupplied metrics remain unknown. A readable transcript or existing public artifact does not establish a reproduced workflow, functioning backend, or commercial outcome.

No combined truth or credibility score is calculated. Engagement can help choose what to investigate; it does not establish implementation quality, reproducible steps, earnings, conversion, or business demand. Independently tested artifacts and reproduced workflows would be stronger evidence and must be recorded separately.

“Take something proven and make it better” guides discovery: existing demand and demonstrated patterns come first. The default ordering first groups independently verified artifacts, reproduced steps, or outcomes, then places fundamentals after discovery items, orders by verified publication date, and favors established new capabilities only when dates tie. These are transparent evidence groups, not a popularity or truth score. Missing publication dates sort after known dates and never borrow a review date. Collection order remains available. Publication and relevant tool/version dates for the initial eight references are unknown, so none is presented as a current release or setup guide. `freshness` stores dates, source evidence, role, and caveat; `novelty` records capability evidence independently of popularity and functionality.

The YouTube build workflows were published October 7 and September 8, 2026. The local-keyword and qualification examples from 2022, 2024, and 2025 are explicitly labeled fundamentals and follow discovery items. Publication dates do not establish current model availability or tool versions. The public portfolio was corroborated by a text fetch only; its forms, accessibility, mobile behavior, and performance remain untested. Affiliate/vendor and mentorship incentives are disclosed in review limitations. Promotional value, income, response-rate, close-rate, and speed claims are not treated as verified results.

Every original brief states an existing observed pattern, a specific improvement, target buyer/problem, a new capability only if relevant, a future validation test, and missing evidence. An observed design pattern is not proof of demand. The validation plans do not authorize outreach; new technology is useful only when it improves the buyer's existing workflow.

## Add a verified public example

1. Copy [templates/idea.json](templates/idea.json) into a working file. The placeholders deliberately fail validation; do not append an unfinished record.
2. Review the public source. Record a clean source URL, public creator attribution, date, method, specific observations, caption claims separately, and limitations. Never call a caption claim verified functionality. Note AI labeling or visual-concept status. Record a tool only if established by the review.
3. For a Reel reviewed through sampled frames and caption without audio, use `video-visual-caption` and `audioReviewed: false`. Only use `video` after audio was also reviewed. Website methods are `visual-text` or `text`; do not upgrade inherited methods.
   For sampled YouTube review, use `video-transcript` only when a readable transcript was reviewed, or `video-metadata` when it was not. State coverage and sample timestamps in observations; do not imply full playback. Keep independent supporting-source links in `review.supportingSources`. Record an observation window instead of inventing an exact metric timestamp when only a range is known.
4. Write an original business adaptation with a specific MVP goal, features, build order, acceptance criteria, integrations, and exclusions. Use `build.status: "planned"` and `build.url: null` until a public completed build exists.
5. Append the completed object to [data/ideas.json](data/ideas.json). Keep stable unique IDs and source URLs. The gallery and counters update from this file.
6. Run the checks below, inspect desktop and mobile, and review the entire diff for public suitability before opening a PR.

For an original **uncited concept**, use `kind: "concept"`, `source: null`, review method `none`, null review date/evidence URL, empty observations, and explicit untested limitations. Concepts belong in their own collection. Referenced mockups or visual concepts remain observed references, with `source.contentType` and review limits explaining that functionality is unverified.

[idea.schema.json](idea.schema.json) defines the fields. The validator also enforces cross-field evidence/build rules, unique IDs/sources, dates, and placeholder rejection. This is a structural check, not proof that a claim is true or a source is public. A human/source review is still necessary.

## Public content rules

Publish public source links, original summaries, and original prototype instructions only. Do not add credentials, authentication data, private correspondence, private source URLs, personal feeds, client records, private business plans, or copied proprietary code. Do not download or rehost creator videos, screenshots, artwork, branding, or assets. The gallery illustrations are original generic CSS pattern sketches, labeled as such; they are not source screenshots or reproductions.

No outreach or social interactions are part of intake. Study general principles and create a distinct implementation using owned or licensed material. Keep production integrations separately scoped; no purchase or account creation is needed for this project.

## Prompt-injection boundaries

All external sources remain untrusted. No source is labeled prompt-injection-safe. Imported summaries, observations, captions, and metric displays are rendered using text nodes/textContent; arbitrary HTML and scripts are never rendered. External links accept only absolute HTTPS URLs without embedded credentials or backslashes and use `noopener noreferrer` for new tabs. There is no remote-media downloader, source-code execution, arbitrary markup input, or source-driven tool invocation.

The gallery's Content Security Policy restricts scripts, styles, and data connections to this app, and blocks frames, objects, inline scripts, and form submissions. It adds a browser boundary; it does not establish that any external source is safe or truthful.

Copied/downloaded briefs contain only the original editorial scope, safe source URL metadata, an enumerated review label, and explicit safety boundaries. Source titles, creator strings, captions, comments, observations, and review notes are not concatenated into build instructions. Review the original `brief` fields during intake; schema validation cannot determine whether prose is trustworthy or whether a claim is true. Source text cannot authorize account access, secret disclosure, code execution, purchases, live integrations, or outreach.

## Checks and static build

```sh
npm run lint
npm run validate
npm test
npm run build
```

The syntax checks, schema/content validation, and Node tests use built-in APIs. `npm run build` validates and copies only the static app, data, schema, template, and guide to ignored `dist/`; it does not deploy. Serve the source with `npm start`, or serve `dist/` with any static HTTP server.

Browser QA should cover search and combined filters, zero-result states, reset, all source/creator/provenance links, dialog keyboard close/focus return, direct idea links, repeated copy attempts, clipboard-denied fallback, Markdown download, and narrow-screen layout. Source destinations may be gated; link checks must not claim the underlying showcased products were tested.

With the local server running, open `/tests/security-browser.html` to exercise the actual rendering helpers against hostile markup and a JavaScript URL. All five text/link checks should pass; the payload must remain visible inert text. This fixture is excluded from `dist/`. Unit tests also check unsafe URLs, source-instruction exclusion from exported briefs, and metric evidence rules. Update the initial collection-count assertions deliberately when adding new reviewed records.

## Repository context

This project follows the repository's standalone-project convention under `projects/idea-archive/`. No AGENTS.md, Software Factory workflow, or `.agents/skills` was present in the repository at creation. It introduces no framework, external fonts, analytics, runtime dependencies, or deployment configuration. Existing research is preserved unchanged.

## Prototype directions and the research engine

`data/clusters.json` groups the 15 references (including all 13 earlier records) into six original prototype directions. Every group includes source video links, a proposed customer need and value, what would be built, exclusions, a scoped price hypothesis and the next validation. Distinct credited creators are not assumed independent; same-creator repeats and evidence-backed repost/independence claims have separate fields. Unknown origins stay unknown. All six directions remain briefs, with zero built customer demos.

Prices use explicitly illustrative hours × USD 75/hour and scope assumptions, not market quotes or proven revenue. Validate scope and business need before offering a price. Copied/downloaded briefs include their related source videos and these limits.

The separate [business research engine](../business-research-engine/README.md) turns permitted private candidate records into reviewed evidence and original offer briefs. Run it separately on loopback port 4174. The archive navigation opens that default local URL in a new tab. No live provider, account connection, prospect crawl or outreach runs.

### SEO planning handoff

Website prototype briefs reference the [reviewed build checklist](https://github.com/NateKeola/Dogfood/blob/codex/holistic-seo-review/projects/seo-review/BUILD_CHECKLIST.md) on unmerged [draft PR #2](https://github.com/NateKeola/Dogfood/pull/2). These are planning/acceptance instructions, not completed SEO audits. Research and GTM worksheet briefs are not forced into website gates. Absolute branch URLs remain valid independently of merge order; recheck them if that branch is deleted. No other branch files were copied or edited.

Two additional sampled Reels cover a marina presentation and a distinct 3D property-viewer evaluation. Publication dates and views are unknown. Guide-comment incentives and third-party footage ownership limits remain explicit. Instagram route aliases deduplicate by platform content ID; counts are unique source records, not independent market validation.
