import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  clusterSummary,
  formatClusterContext,
  validateClusters,
} from "../clusters.js";
const [clusters, ideas] = await Promise.all(
  ["clusters", "ideas"].map(async (name) =>
    JSON.parse(
      await readFile(new URL(`../data/${name}.json`, import.meta.url), "utf8"),
    ),
  ),
);
test("15 references remain in six groups with videos", () => {
  assert.equal(ideas.length, 15);
  assert.equal(clusters.length, 6);
  assert.deepEqual(validateClusters(clusters, ideas), []);
  assert.ok(clusters.every((c) => clusterSummary(c, ideas).videos.length));
});
test("Same-creator repeats are not independent corroboration", () => {
  const s = clusterSummary(clusters[0], ideas);
  assert.equal(s.videos.length, 3);
  assert.equal(s.distinctCreators, 2);
  assert.equal(s.sameCreatorRepeats, 1);
  assert.equal(s.verifiedIndependent, 0);
  assert.equal(s.verifiedReposts, 0);
});
test("Independent/repost claims need provenance", () => {
  for (const relationship of ["independent", "repost"]) {
    const copy = structuredClone(clusters);
    copy[0].members[0].relationship = relationship;
    assert.ok(
      validateClusters(copy, ideas).includes("Origin claims require evidence"),
    );
  }
});
test("Briefs state unbuilt status, source videos and price hypotheses", () => {
  for (const group of clusters) {
    const brief = formatClusterContext(group, ideas);
    assert.match(brief, /No customer demo has been built/);
    assert.match(brief, /scoped hypothesis/);
    for (const { reference } of clusterSummary(group, ideas).videos)
      assert.ok(brief.includes(reference.source.url));
  }
});
test("Missing references and invalid pricing/build claims fail", () => {
  for (const mutate of [
    (c) => c.pop(),
    (c) =>
      c[0].members.push({
        referenceId: "missing",
        relationship: "unknown-origin",
        originEvidence: null,
      }),
    (c) => (c[0].pricing.hoursHigh = -1),
    (c) => (c[0].prototype.builtArtifactUrl = "https://example.com/"),
  ]) {
    const copy = structuredClone(clusters);
    mutate(copy);
    assert.ok(validateClusters(copy, ideas).length);
  }
});
