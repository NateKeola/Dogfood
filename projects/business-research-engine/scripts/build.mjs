import { readFile, writeFile, mkdir, rm, cp } from "node:fs/promises";
import { validateProject } from "./validate.mjs";
import { clusterSummary } from "../../idea-archive/clusters.js";
await validateProject();
const root = new URL("../", import.meta.url),
  dist = new URL("dist/", root);
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
for (const file of [
  "index.html",
  "styles.css",
  "app.js",
  "core.js",
  "providers.json",
  "README.md",
  "WISHLIST.md",
  "templates",
])
  await cp(new URL(file, root), new URL(file, dist), { recursive: true });
const [clusters, ideas] = await Promise.all(
  ["clusters", "ideas"].map(async (name) =>
    JSON.parse(
      await readFile(
        new URL(`../../idea-archive/data/${name}.json`, import.meta.url),
        "utf8",
      ),
    ),
  ),
);
const patterns = clusters.map((group) => {
  const summary = clusterSummary(group, ideas);
  return {
    ...group,
    videos: summary.videos.map(({ reference }) => ({
      url: reference.source.url,
      creator: reference.source.creator.name,
      title: reference.title,
    })),
    uniqueContent: summary.uniqueContent,
    distinctCreators: summary.distinctCreators,
    sameCreatorRepeats: summary.sameCreatorRepeats,
  };
});
await writeFile(
  new URL("patterns.json", dist),
  JSON.stringify(patterns, null, 2) + "\n",
);
console.log(
  `Built local workbench: ${patterns.length} public prototype patterns; zero real prospect records. No network fetch or provider execution.`,
);
