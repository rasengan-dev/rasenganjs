#!/usr/bin/env node

/**
 * @rasenganjs/runtime — Node.js demo server
 *
 * Uses Node's built-in http module.  No Express, no deps.
 * Run:   node server/index.mjs
 *        pnpm start
 */

import http from "node:http";
import demo from "./app.mjs";

const PORT = process.env.PORT || 5321;

const server = http.createServer(async (req, res) => {
  try {
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const host = req.headers.host || "localhost";
    const url = `${protocol}://${host}${req.url}`;

    let body = null;
    if (req.method !== "GET" && req.method !== "HEAD") {
      body = await new Promise((resolve) => {
        const chunks = [];
        req.on("data", (c) => chunks.push(c));
        req.on("end", () => resolve(Buffer.concat(chunks)));
      });
    }

    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body: body || undefined,
    });

    const response = await demo.fetch(request);

    const responseHeaders = {};
    response.headers.forEach((value, key) => { responseHeaders[key] = value; });
    res.writeHead(response.status, responseHeaders);

    if (response.body) {
      const reader = response.body.getReader();
      const pump = () => {
        reader.read().then(({ done, value }) => {
          if (done) return res.end();
          res.write(value);
          pump();
        });
      };
      pump();
    } else {
      res.end();
    }
  } catch {
    res.writeHead(500);
    res.end("Internal Server Error");
  }
});

server.listen(PORT, () => {
  console.log(`\n  🟢 Rasengan Runtime Demo (Node)`);
  console.log(`  ───────────────────────────────`);
  console.log(`  http://localhost:${PORT}`);
  console.log(`  http://localhost:${PORT}/hello/Rasengan`);
  console.log(`  http://localhost:${PORT}/api/users`);
  console.log(`  http://localhost:${PORT}/stream\n`);
});
