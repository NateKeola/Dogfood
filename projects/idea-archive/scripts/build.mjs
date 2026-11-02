import { cp, mkdir, rm } from 'node:fs/promises';
import { validateArchive } from './validate.mjs';

await validateArchive();
const root = new URL('../', import.meta.url);
const destination = new URL('dist/', root);
await rm(destination, { recursive: true, force: true });
await mkdir(destination);
for (const file of ['index.html', 'styles.css', 'app.js', 'archive.js', 'dom.js', 'data', 'templates', 'idea.schema.json', 'README.md', 'WISHLIST.md']) {
  await cp(new URL(file, root), new URL(file, destination), { recursive: true });
}
console.log('Built static archive in dist/ (no dependencies or deployment).');
