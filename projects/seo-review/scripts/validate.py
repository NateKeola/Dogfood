"""Validate this local SEO documentation package without network access."""
import copy
import json
import re
from pathlib import Path

from jsonschema import Draft202012Validator, FormatChecker, ValidationError


PACKAGE = Path(__file__).resolve().parents[1]
ROOT = PACKAGE.parents[1]
SKILL = ROOT / ".agents/skills/holistic-seo-review/SKILL.md"
SCHEMA = json.loads((PACKAGE / "findings.schema.json").read_text())
Draft202012Validator.check_schema(SCHEMA)
VALIDATOR = Draft202012Validator(SCHEMA, format_checker=FormatChecker())


def validate_report(report):
    VALIDATOR.validate(report)
    findings = report["findings"]
    ids = [finding["id"] for finding in findings]
    if len(ids) != len(set(ids)):
        raise ValueError("Duplicate finding ID")
    areas = [item["area"] for item in report["coverage"]]
    if len(areas) != len(set(areas)):
        raise ValueError("Duplicate coverage area")
    if set(areas) != set(SCHEMA["$defs"]["area"]["enum"]):
        raise ValueError("All workstreams need explicit coverage, including unknowns")
    if report["report_kind"] == "framework-only" and any(
        item["status"] in ("pass", "fail") for item in report["coverage"]
    ):
        raise ValueError("A framework without a target cannot pass or fail site coverage")
    for finding in findings:
        if finding["priority"] == "P0" and finding["status"] != "fail":
            raise ValueError("P0 requires an observed failure, not an unknown or proposal")
        for evidence in finding["evidence"]:
            is_synthetic = evidence["kind"] == "synthetic"
            if is_synthetic != (report["report_kind"] == "synthetic-example"):
                raise ValueError("Synthetic evidence must remain in a synthetic report")
            if evidence["observed_on"] > report["reviewed_on"]:
                raise ValueError("Evidence cannot postdate the report")
        for source in finding["sources"]:
            if source["reviewed_on"] > report["reviewed_on"]:
                raise ValueError("Source review cannot postdate the report")
            if source["source_updated_on"] and source["source_updated_on"] > source["reviewed_on"]:
                raise ValueError("Known source update cannot postdate its review")


def check_links_and_sources():
    sources_text = (PACKAGE / "SOURCES.md").read_text()
    source_ids = set(re.findall(r"^\| (S\d+) \|", sources_text, re.M))
    if len(source_ids) != len(re.findall(r"^\| S\d+ \|", sources_text, re.M)):
        raise ValueError("Duplicate bibliography ID")
    for path in [*PACKAGE.rglob("*.md"), SKILL]:
        # Prose integration suggestions inside fenced code are not live local links.
        text = re.sub(r"```.*?```", "", path.read_text(), flags=re.S)
        for target in re.findall(r"\[[^\]]+\]\(([^)]+)\)", text):
            if re.match(r"https?://", target) or target.startswith("#"):
                continue
            destination = (path.parent / target.split("#", 1)[0]).resolve()
            if not destination.is_relative_to(ROOT) or not destination.exists():
                raise ValueError(f"Missing or out-of-repository link: {path.name}: {target}")
        for source_id in re.findall(r"\bS\d{2}\b", text):
            if source_id not in source_ids:
                raise ValueError(f"Unknown source ID: {source_id}")
    return source_ids


def main():
    report = json.loads((PACKAGE / "examples/synthetic-report.json").read_text())
    validate_report(report)
    legacy = copy.deepcopy(report)
    for finding in legacy["findings"]:
        finding.pop("technical_lift", None)
    validate_report(legacy)
    source_ids = check_links_and_sources()
    for finding in report["findings"]:
        for source in finding["sources"]:
            if source["id"] not in source_ids:
                raise ValueError(f"Example references unknown source {source['id']}")

    # Evidence-contract regression checks: plausible but invalid report states.
    mutations = [
        ("unsupported pass", lambda x: x["findings"][0].update(status="pass", evidence=[])),
        ("unsupported requirement", lambda x: x["findings"][0].update(sources=[])),
        ("framework with findings", lambda x: x.update(report_kind="framework-only", target=None)),
        ("synthetic passed off as real", lambda x: x.update(report_kind="site-review")),
        ("missing coverage", lambda x: x["coverage"].pop()),
        ("duplicate finding", lambda x: x["findings"].append(copy.deepcopy(x["findings"][0]))),
        ("invalid date", lambda x: x.update(reviewed_on="2026-02-30")),
        ("future evidence", lambda x: x["findings"][0]["evidence"][0].update(observed_on="2099-01-01")),
        ("speculative critical issue", lambda x: x["findings"][1].update(priority="P0")),
        ("lift without assumptions", lambda x: x["findings"][0]["technical_lift"].update(assumptions=[])),
        ("unsupported lift class", lambda x: x["findings"][0]["technical_lift"].update(classes=["guaranteed-ranking"])),
    ]
    for name, mutate in mutations:
        invalid = copy.deepcopy(report)
        mutate(invalid)
        try:
            validate_report(invalid)
        except (ValueError, ValidationError):
            continue
        raise ValueError(f"Invalid fixture accepted: {name}")

    framework = copy.deepcopy(report)
    framework.update(report_kind="framework-only", target=None, findings=[])
    for coverage in framework["coverage"]:
        coverage.update(status="unknown", sample="No target supplied", reason="Discovery input needed")
    validate_report(framework)
    print(f"PASS: schema, synthetic/framework/legacy reports, {len(mutations)} evidence-contract checks, local links and {len(source_ids)} source IDs")
    print("No external URLs fetched; no factual, privacy or site-level certification performed.")


if __name__ == "__main__":
    main()
