#!/usr/bin/env deno

/**
 * @rasenganjs/runtime — Deno demo server
 *
 * Deno.serve() is Web API native — Request in, Response out.
 * No adapter needed since Application.fetch() returns a standard Response.
 *
 * Run:   deno run --allow-net server/deno.mjs
 *        pnpm start:deno
 */

import demo from "./app.mjs";

const PORT = parseInt(Deno.env.get("PORT") || "5323", 10);

Deno.serve({ port: PORT }, (request) => demo.fetch(request));