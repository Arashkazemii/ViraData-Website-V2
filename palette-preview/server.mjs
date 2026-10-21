import { createServer, request as httpRequest } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const directory = dirname(fileURLToPath(import.meta.url));
const upstream = new URL(process.env.PALETTE_UPSTREAM || "http://127.0.0.1:3000");
const port = Number(process.env.PALETTE_PORT || 3001);
const assets = new Map([
  ["/palette-comparison.html", ["comparison.html", "text/html; charset=utf-8"]],
  ["/palette-fullsize.html", ["fullsize.html", "text/html; charset=utf-8"]],
  ["/__palette-preview.css", ["palette-preview.css", "text/css; charset=utf-8"]],
  ["/__palette-apply.js", ["apply.js", "text/javascript; charset=utf-8"]],
]);

createServer(async (incoming, outgoing) => {
  const pathname = new URL(incoming.url || "/", "http://localhost").pathname;
  const asset = assets.get(pathname);
  if (asset) {
    const [name, type] = asset;
    try {
      const body = await readFile(join(directory, name));
      outgoing.writeHead(200, { "Content-Type": type, "Cache-Control": "no-store" });
      outgoing.end(incoming.method === "HEAD" ? undefined : body);
    } catch {
      outgoing.writeHead(500);
      outgoing.end("Preview asset unavailable");
    }
    return;
  }

  const target = new URL(incoming.url || "/", upstream);
  const proxy = httpRequest(target, {
    method: incoming.method,
    headers: { ...incoming.headers, host: upstream.host },
  }, (response) => {
    const headers = { ...response.headers };
    if (String(headers["content-type"] || "").includes("text/html")) headers["cache-control"] = "no-store";
    outgoing.writeHead(response.statusCode || 200, headers);
    response.pipe(outgoing);
  });
  proxy.on("error", () => {
    if (!outgoing.headersSent) outgoing.writeHead(502);
    outgoing.end("Start the ViraData site on port 3000 first");
  });
  incoming.pipe(proxy);
}).listen(port, "127.0.0.1", () => {
  process.stdout.write(`Palette comparison: http://127.0.0.1:${port}/palette-comparison.html\n`);
});
