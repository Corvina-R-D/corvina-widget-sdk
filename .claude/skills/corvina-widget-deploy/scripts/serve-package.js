#!/usr/bin/env node
/*
 * Serves the built packages (dist/upload/*.zip) to the Corvina page, for its WebMCP tool
 * upload_widget_package, which downloads the zip from this computer only.
 *
 *   node .claude/skills/corvina-widget-deploy/scripts/serve-package.js [--port 8090] [--dir dist/upload] [--token <secret>]
 *
 *   GET /<token>/             the zips served, as JSON
 *   GET /<token>/<name>.zip   one zip
 *
 * Listens on 127.0.0.1 only, but any site open in the browser can ask a local server: so every
 * request needs the token in the path, which only this run (and whoever started it) knows, and
 * the Host must be this computer's name. Without the token the answer is a bare 404, with no CORS
 * headers. The token is random at every start (--token sets it, 16 or more letters, digits, _ or -:
 * the caller then knows the URL without reading this output). The page has another origin, so the
 * answers carry CORS headers, and the Private Network Access preflight, needed when the page is
 * served by a Corvina instance on https, is answered.
 */
const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const path = require("path");

function option(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i > 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const port = Number(option("port", 8090));
const dir = path.resolve(option("dir", "dist/upload"));
const token = option("token", crypto.randomBytes(16).toString("hex"));
if (!/^[\w-]{16,}$/.test(token)) {
  console.error("--token must have 16 or more letters, digits, _ or -");
  process.exit(2);
}

const LOCAL_HOSTS = ["localhost", "127.0.0.1"];
const zips = () => (fs.existsSync(dir) ? fs.readdirSync(dir).filter(file => file.endsWith(".zip")) : []);
const same = (a, b) => a.length == b.length && crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
const refuse = (res, status, why) => {
  console.log(`refused: ${why}`);
  res.writeHead(status).end();
};

const server = http.createServer((req, res) => {
  res.setHeader("Cache-Control", "no-store");
  // A site that points its own name to 127.0.0.1 (DNS rebinding) sends its name as Host
  const host = String(req.headers.host || "").replace(/:\d+$/, "").toLowerCase();
  if (!LOCAL_HOSTS.includes(host)) return refuse(res, 403, "Host is not this computer");
  let pathname;
  try {
    pathname = decodeURIComponent((req.url || "/").split("?")[0]);
  } catch {
    return refuse(res, 400, "malformed URL");
  }
  const [first, ...rest] = pathname.replace(/^\/+/, "").split("/");
  if (!same(first, token)) return refuse(res, 404, "no token");

  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Vary", "Origin");
  if (req.method == "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET");
    if (req.headers["access-control-request-private-network"])
      res.setHeader("Access-Control-Allow-Private-Network", "true");
    res.writeHead(204).end();
    return;
  }
  const name = rest.join("/");
  console.log(`${req.method} /${name}`);
  if (req.method != "GET") {
    res.writeHead(405).end();
    return;
  }
  if (!name) {
    res.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify(zips().map(file => url(file))));
    return;
  }
  // Only the zips of the folder: no subfolders, no other files
  if (name.includes("/") || !zips().includes(name)) {
    res.writeHead(404, { "Content-Type": "text/plain" }).end(`${name} not found in ${dir}: run "yarn build"`);
    return;
  }
  const file = path.join(dir, name);
  res.writeHead(200, { "Content-Type": "application/zip", "Content-Length": fs.statSync(file).size });
  fs.createReadStream(file).pipe(res);
});

const url = file => `http://localhost:${port}/${token}/${encodeURIComponent(file)}`;

server.on("error", e => {
  console.error(e.code == "EADDRINUSE" ? `Port ${port} is in use: pass another one with --port` : e.message);
  process.exit(1);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Serving ${dir}; the URL to give to upload_widget_package:`);
  for (const file of zips()) console.log(`  ${url(file)}`);
  if (!zips().length) console.log(`  (no zip yet: run "yarn build"; then http://localhost:${port}/${token}/<name>.zip)`);
});
