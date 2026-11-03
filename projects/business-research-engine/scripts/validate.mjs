import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import {
  parseImport,
  makeCandidate,
  validateCandidate,
  safeUrl,
  domain,
} from "../core.js";
import { validateArchive } from "../../idea-archive/scripts/validate.mjs";
export async function validateProject() {
  await validateArchive();
  const root = new URL("../", import.meta.url);
  for (const file of ["intake.json", "intake.csv"]) {
    const rows = parseImport(
      await readFile(new URL("templates/" + file, root), "utf8"),
    );
    for (const [i, row] of rows.entries()) {
      const errors = validateCandidate(
        makeCandidate(row, `fixture-${i}`, true),
      );
      if (
        !row.name.startsWith("FICTIONAL ") ||
        !domain(row.sourceUrl).endsWith(".example")
      )
        errors.push(
          "Public fixtures must be explicitly fictional .example data",
        );
      if (errors.length) throw new Error(`${file}: ${errors.join("; ")}`);
    }
  }
  const providers = JSON.parse(
    await readFile(new URL("providers.json", root), "utf8"),
  );
  if (providers.some((p) => p.sources.some((s) => !safeUrl(s.url))))
    throw new Error("Unsafe provider reference");
  console.log(
    "Validated synthetic-only fixtures, source policies and archive patterns.",
  );
}
if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  validateProject().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
