import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
const port = Number(process.env.PORT || 4174);
if (!Number.isInteger(port) || port < 1024 || port > 65535)
  throw new Error("Use a port from 1024 to 65535");
const root = new URL("../dist/", import.meta.url);
const allowed = new Set([
  "index.html",
  "styles.css",
  "app.js",
  "core.js",
  "patterns.json",
  "providers.json",
  "README.md",
  "WISHLIST.md",
  "templates/intake.csv",
  "templates/intake.json",
]);
const types = {
  html: "text/html; charset=utf-8",
  js: "text/javascript; charset=utf-8",
  css: "text/css; charset=utf-8",
  json: "application/json; charset=utf-8",
  csv: "text/csv; charset=utf-8",
  md: "text/plain; charset=utf-8",
};
createServer(async (req, res) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Cache-Control", "no-store");
  if (!["GET", "HEAD"].includes(req.method)) {
    res.writeHead(405);
    res.end();
    return;
  }
  try {
    const path =
      decodeURIComponent(new URL(req.url, "http://127.0.0.1").pathname).replace(
        /^\//,
        "",
      ) || "index.html";
    if (!allowed.has(path)) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const data = await readFile(new URL(path, root));
    res.writeHead(200, {
      "Content-Type": types[path.split(".").pop()] || "text/plain",
    });
    res.end(req.method === "HEAD" ? undefined : data);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(port, "127.0.0.1", () =>
  console.log(
    `Research engine: http://127.0.0.1:${port}/ (loopback only; no upload, fetch or provider endpoints)`,
  ),
);
