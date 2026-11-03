# Municipal and territorial registry seeds

Yes: a municipality's official business-registration or license dataset can be a useful starting population for a geographic ICP. It is **not a complete list of all operating businesses**, and “registered/active” is not proof of current operation, age, website absence, budget or demand. Use a registry as a seed, then independently verify company identity, current operating evidence, website and a specific buyer problem.

Primary-source review: **November 2, 2026**. No real rows were downloaded or imported, no acceptance button was clicked, no public-record request was submitted, and no restricted search was scraped.

## Verified examples and reuse boundaries

| Source | Observed coverage/access | Reuse posture and pilot choice |
|---|---|---|
| **City of Los Angeles — Listing of Active Businesses** | Official federal catalog points to city dataset `6rrh-rzua`, offers JSON/CSV resources and describes monthly updates. “Active” means registered without the owner notifying Finance that operations ceased. Catalog showed modified October 15, 2026. | Catalog identifies **CC0**. Good candidate for a manually selected, minimized seed subset after checking current city metadata. Start/registration date is not founded date; an active tax registration does not prove operation. [Official catalog/license/resources](https://catalog.data.gov/dataset/listing-of-active-businesses), [city dataset](https://data.lacity.org/d/6rrh-rzua). |
| **Los Angeles County — Business License program** | Covers specified activities in unincorporated County areas and contract cities **Malibu, Santa Clarita and Westlake Village**. It is not a countywide census of all businesses in incorporated cities. [Requirements](https://ttc.lacounty.gov/business-license-requirements-2/), [program overview](https://ttc.lacounty.gov/business-license-general-information/). | Public inquiry has an explicit terms-acceptance gate and disclaims completeness/accuracy. No bulk open-data license or approved bulk export was established in this review. Treat as a potential manual verification source after authorized terms review, **not an automated seed source**. No acceptance or query performed. [Inquiry/access terms](https://ttc.lacounty.gov/search-existing-business-license/). |
| **City of Santa Monica — Active Business Licenses** | Smaller municipality with public directory search and an official open-data dataset. Current dataset page showed updated **November 2, 2026, 09:00 UTC**. The linked resource lists business name/category and license/status fields; metadata is not proof each row was freshly verified. [Dataset](https://data.santamonica.gov/dataset/active-business-licenses), [directory](https://www.santamonica.gov/finance/business-license-directory-search). | Dataset marks **ODC-By 1.0**. Prefer its documented export over scraping the search form; preserve source attribution and license notices with derived data. Review database and individual-content rights and privacy obligations separately. [ODC-By license](https://opendatacommons.org/licenses/by/1-0/). No export was downloaded here. |

The LA Finance explanatory page appeared in official search results but its full fetch timed out; the LA coverage/license claims above rely on the accessible official catalog. County bulk reuse remains **unresolved**. The Santa Monica canonical dataset was checked after a search result pointed to an older snapshot; do not use that stale snapshot's date as the current dataset date.

## Different registries answer different questions

| Source type | Appropriate inference | What it does not establish |
|---|---|---|
| State entity registry | Legal-entity filings/status for covered entity types | Every local business, storefront operation, website, contact role or customer need. California SOS says sole proprietorships are not registered there and business telephone/email data is not made of record. [SOS record scope](https://www.sos.ca.gov/business-programs/business-entities/information-requests). |
| City business license/tax registry | A registration/license within that jurisdiction and program | Complete business population; present trading activity; age; permission to market |
| County business license | Covered activities/areas within the county program | Every municipality or every industry in the county |
| Professional license | Status of a covered professional/firm's license | Current business website, authority to purchase software, or demand. DCA warns that errors and update delays are possible. [DCA search](https://search.dca.ca.gov/), [disclaimer](https://search.dca.ca.gov/disclaimer). |
| Chamber membership directory | Membership/listing in that particular organization | Statutory registration or full local coverage; reuse terms need separate review |
| Map listing | A platform's place listing | A reusable public registry, complete geographic coverage, lawful bulk prospect export or proof of operation |

Some records may concern closed firms, home-based work, registered agents, duplicate licenses or branches; unlicensed/exempt businesses may be missing. Legal entities may trade under several names. Zip codes can cross jurisdiction boundaries. Verify jurisdiction and business identity rather than equating mailing city or registration address with an operating location. Do not retain residential addresses, agent-service addresses, unrelated owner details or sensitive categories for this ICP.

## Working local staging module

The engine accepts **minimized manual JSON snapshots**, not raw municipal downloads. `registry_seed` in `schema.json` has a registry ID, business name, geography, optional industry, source type, registration status/date, optional website, premises classification, synthetic flag and source/license provenance. It has **no street-address, owner, household or personal-contact fields**; extra fields are rejected. Null website means *unknown*, never “no website.” Unknown/home-based premises remain visible and should be reviewed/excluded where outside the agreed ICP.

```sh
python3 -B engine.py --workspace registry-demo init fixtures/icp.example.json
python3 -B engine.py --workspace registry-demo import-registry fixtures/registry-seeds.example.json
python3 -B engine.py --workspace registry-demo registry-summary
```

For a real batch, minimize the authorized export locally before staging it and store the file under `.local/`. Preserve attribution/license notices in `source.usage_notes` and `source.url`; do not copy a municipal license identifier into `legal_id` unless independently established to be a legal-entity identifier.

Once an independently sourced candidate website/identity has been found, create a normal candidate object in a private file and link it to the staged seed:

```sh
python3 -B engine.py --workspace registry-demo promote-registry SEED_ID .local/registry-demo/candidate.json
```

Promotion requires matching name/geography/synthetic classification and official-website provenance. It imports a **pending** candidate; it grants no gate approvals, does not verify operating status and does not assert pain. Inactive snapshots cannot be promoted without a newer source snapshot. Differing names/domains require manual identity reconciliation, not a guessed merge. Seeds without websites remain in staging, outside the website audit queue.

Seed IDs hash source URL + registry ID + snapshot checked timestamp. Exact duplicates are idempotent; conflicting contents for the same snapshot are rejected. Later source snapshots remain separate for review. Candidate promotion is safe to repeat after interruption. Up to the job's configured seed cap is allowed; the candidate cap is separately enforced. Source freshness and actual observation dates must not be replaced with import time.

## Geographic GTM loop

Pick one jurisdiction and one buying workflow, then take a stratified 10-row sample before importing 100. Inspect stale/closed/duplicate/home-based/out-of-scope rates and whether the source even contains the required kind of business. For qualified candidates, document current operating evidence and identity; then audit one measurable task. An old company or a missing website is not automatically a lead-generation buyer.

Record the owner/decision role, budget status, task frequency/value, reusable integration fit, likely implementation/support cost and a benefit hypothesis. Unknown owner/budget is a question for a later authorized conversation, not an invented qualification. Start with a small original demonstration of a recurring problem. Modular retainers need measured recurring work and viable support/API economics; the separate pricing task owns benchmark prices and $10/$30/$40 add-on economics. This module makes no price promises.

See the [100-to-1,000 pilot gates](PILOT.md). High-volume contact execution is outside this prototype and requires its own authorization and policy checks after list quality and economics are demonstrated.
