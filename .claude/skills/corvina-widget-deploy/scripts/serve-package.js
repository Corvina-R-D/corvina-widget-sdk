#!/usr/bin/env node
/*
 * Serves the built packages (dist/upload/*.zip) to the Corvina page, for its WebMCP tool
 * upload_widget_package, which downloads the zip from this computer only.
 *
 *   node .claude/skills/corvina-widget-deploy/scripts/serve-package.js [--port 8090] [--dir dist/upload]
 *
 *   GET /             the zips served, as JSON
 *   GET /<name>.zip   one zip
 *
 * Listens on 127.0.0.1 only. Sends CORS headers (the page has another origin) and answers the
 * Private Network Access preflight, needed when the page is served by a Corvina instance on https.
 */
const fs = require("fs");
const http = require("http");
const path = require("path");

function option(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i > 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const port = Number(option("port", 8090));
const dir = path.resolve(option("dir", "dist/upload"));

const zips = () => (fs.existsSync(dir) ? fs.readdirSync(dir).filter(file => file.endsWith(".zip")) : []);

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Vary", "Origin");
  res.setHeader("Cache-Control", "no-store");
  if (req.method == "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "GET");
    if (req.headers["access-control-request-private-network"])
      res.setHeader("Access-Control-Allow-Private-Network", "true");
    res.writeHead(204).end();
    return;
  }
  const name = decodeURIComponent((req.url || "/").split("?")[0]).replace(/^\/+/, "");
  console.log(`${req.method} /${name}`);
  if (req.method != "GET") {
    res.writeHead(405).end();
    return;
  }
  if (!name) {
    res.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify(zips().map(file => `http://localhost:${port}/${file}`)));
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

server.on("error", e => {
  console.error(e.code == "EADDRINUSE" ? `Port ${port} is in use: pass another one with --port` : e.message);
  process.exit(1);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Serving ${dir} at http://localhost:${port}/`);
  for (const file of zips()) console.log(`  http://localhost:${port}/${file}`);
});
