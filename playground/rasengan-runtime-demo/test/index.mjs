/**
 * @rasenganjs/runtime — Test Suite
 *
 * Run:   node --test
 *        node --test test/index.mjs
 *
 * Tests every facet of the runtime using only Web API primitives.
 * No Express, no external server — just app.fetch().
 */

import { describe, it, before } from "node:test";
import assert from "node:assert/strict";

import {
  Application,
  Router,
  json,
  text,
  html,
  redirect,
  status,
  notFound,
  streamResponse,
  setCookie,
  parseCookies,
  bodyParser,
  compose,
  matchPath,
  parseQueryString,
} from "@rasenganjs/runtime";

// ═══════════════════════════════════════════════════════════════
// 1. Basic Application — GET, JSON, text, redirect
// ═══════════════════════════════════════════════════════════════

describe("Application — basic routing", () => {
  let app;

  before(() => {
    app = new Application();

    app.get("/hello", () => json({ message: "Hello, world!" }));
    app.get("/hello/:name", (ctx) => json({ message: `Hello, ${ctx.params.name}!` }));
    app.get("/text", () => text("plain response"));
    app.get("/html", () => html("<h1>Title</h1>"));
    app.get("/redirect-me", () => redirect("/hello", 301));
    app.get("/status-only", () => status(204));
  });

  it("GET /hello returns JSON", async () => {
    const res = await app.fetch(new Request("http://test/hello"));
    assert.equal(res.status, 200);
    assert.equal(res.headers.get("content-type"), "application/json");
    assert.deepEqual(await res.json(), { message: "Hello, world!" });
  });

  it("GET /hello/:name extracts params", async () => {
    const res = await app.fetch(new Request("http://test/hello/Rasengan"));
    assert.deepEqual(await res.json(), { message: "Hello, Rasengan!" });
  });

  it("GET /text returns plain text", async () => {
    const res = await app.fetch(new Request("http://test/text"));
    assert.equal(await res.text(), "plain response");
  });

  it("GET /html returns HTML with correct Content-Type", async () => {
    const res = await app.fetch(new Request("http://test/html"));
    assert.equal(res.headers.get("content-type"), "text/html; charset=utf-8");
  });

  it("GET /redirect-me returns 301", async () => {
    const res = await app.fetch(new Request("http://test/redirect-me"));
    assert.equal(res.status, 301);
    assert.equal(res.headers.get("location"), "/hello");
  });

  it("GET /status-only returns 204", async () => {
    const res = await app.fetch(new Request("http://test/status-only"));
    assert.equal(res.status, 204);
  });

  it("unknown route returns 404", async () => {
    const res = await app.fetch(new Request("http://test/nope"));
    assert.equal(res.status, 404);
  });
});

// ═══════════════════════════════════════════════════════════════
// 2. Middleware chain — onion model, state passing
// ═══════════════════════════════════════════════════════════════

describe("Middleware — onion model & state", () => {
  it("middleware runs in order and can pass state", async () => {
    const app = new Application();
    const order = [];

    app.use(async (ctx, next) => {
      order.push("a-in");
      ctx.set("token", "secret-123");
      const res = await next();
      order.push("a-out");
      return res;
    });

    app.use(async (ctx, next) => {
      order.push("b-in");
      assert.equal(ctx.get("token"), "secret-123");
      const res = await next();
      order.push("b-out");
      return res;
    });

    app.get("/state", (ctx) => {
      order.push("handler");
      return json({ token: ctx.get("token") });
    });

    const res = await app.fetch(new Request("http://test/state"));
    assert.deepEqual(await res.json(), { token: "secret-123" });
    assert.deepEqual(order, ["a-in", "b-in", "handler", "b-out", "a-out"]);
  });

  it("path-scoped middleware only runs for matching paths", async () => {
    const app = new Application();
    const ran = [];

    app.use("/api", async (_ctx, next) => {
      ran.push("api-mw");
      return next();
    });

    app.get("/api/data", () => json({ ok: true }));
    app.get("/other", () => text("no mw"));

    await app.fetch(new Request("http://test/api/data"));
    await app.fetch(new Request("http://test/other"));

    assert.deepEqual(ran, ["api-mw"]);
  });

  it("next() called multiple times throws", async () => {
    const app = new Application();
    app.use(async (_ctx, next) => { await next(); await next(); });
    app.get("/", () => text("ok"));
    const res = await app.fetch(new Request("http://test/"));
    assert.equal(res.status, 500);
  });
});

// ═══════════════════════════════════════════════════════════════
// 3. Body parsing
// ═══════════════════════════════════════════════════════════════

describe("Body parsing", () => {
  it("POST JSON body is parsed", async () => {
    const app = new Application();
    app.use(bodyParser());
    app.post("/data", async (ctx) => {
      const body = ctx.get("parsedBody");
      return json({ received: body });
    });

    const res = await app.fetch(new Request("http://test/data", {
      method: "POST",
      body: JSON.stringify({ foo: 1, bar: "baz" }),
      headers: { "content-type": "application/json" },
    }));

    assert.deepEqual(await res.json(), { received: { foo: 1, bar: "baz" } });
  });

  it("POST URL-encoded body is parsed", async () => {
    const app = new Application();
    app.use(bodyParser());
    app.post("/form", async (ctx) => {
      const body = ctx.get("parsedBody");
      return json({ received: body });
    });

    const res = await app.fetch(new Request("http://test/form", {
      method: "POST",
      body: "name=rasengan&version=1",
      headers: { "content-type": "application/x-www-form-urlencoded" },
    }));

    assert.deepEqual(await res.json(), { received: { name: "rasengan", version: "1" } });
  });
});

// ═══════════════════════════════════════════════════════════════
// 4. Router groups
// ═══════════════════════════════════════════════════════════════

describe("Router — groups", () => {
  it("routes are prefixed and can nest", async () => {
    const router = new Router();

    router.group("/api", (api) => {
      api.get("/status", () => json({ live: true }));
      api.group("/v2", (v2) => {
        v2.get("/health", () => json({ ok: true }));
      });
    });

    const app = new Application();
    app.use(router.middleware());

    const r1 = await app.fetch(new Request("http://test/api/status"));
    assert.deepEqual(await r1.json(), { live: true });

    const r2 = await app.fetch(new Request("http://test/api/v2/health"));
    assert.deepEqual(await r2.json(), { ok: true });

    const r3 = await app.fetch(new Request("http://test/api/nope"));
    assert.equal(r3.status, 404);
  });

  it("group middleware only applies to its routes", async () => {
    const app = new Application();
    const ran = [];

    app.group("/admin", { middlewares: [
      async (_ctx, next) => { ran.push("admin"); return next(); },
    ]}, (admin) => {
      admin.get("/dashboard", () => json({ admin: true }));
    });

    app.get("/public", () => json({ public: true }));

    await app.fetch(new Request("http://test/admin/dashboard"));
    await app.fetch(new Request("http://test/public"));

    assert.deepEqual(ran, ["admin"]);
  });
});

// ═══════════════════════════════════════════════════════════════
// 5. Custom error & 404 handlers
// ═══════════════════════════════════════════════════════════════

describe("Error handling", () => {
  it("onError catches thrown errors", async () => {
    const app = new Application();
    app.get("/crash", () => { throw new Error("boom"); });
    app.onError((err, _ctx) => {
      return json({ error: err.message }, { status: 500 });
    });

    const res = await app.fetch(new Request("http://test/crash"));
    assert.equal(res.status, 500);
    assert.deepEqual(await res.json(), { error: "boom" });
  });

  it("notFound handler returns custom 404", async () => {
    const app = new Application();
    app.notFound((_ctx) => html("<h1>Custom 404</h1>"));

    const res = await app.fetch(new Request("http://test/missing"));
    assert.equal(res.status, 404);
    assert.equal(res.headers.get("content-type"), "text/html; charset=utf-8");
  });
});

// ═══════════════════════════════════════════════════════════════
// 6. Cookies (request parsing + response setting)
// ═══════════════════════════════════════════════════════════════

describe("Cookies", () => {
  it("parseCookies reads from Cookie header", async () => {
    const req = new Request("http://test", {
      headers: { cookie: "session=abc123; theme=dark" },
    });
    const cookies = parseCookies(req);
    assert.equal(cookies.session, "abc123");
    assert.equal(cookies.theme, "dark");
  });

  it("setCookie appends Set-Cookie header", async () => {
    const res = setCookie(
      json({ ok: true }),
      "token",
      "xyz",
      { httpOnly: true, maxAge: 3600 },
    );
    const cookieHeader = res.headers.get("Set-Cookie");
    assert.ok(cookieHeader.includes("token=xyz"));
    assert.ok(cookieHeader.includes("HttpOnly"));
  });
});

// ═══════════════════════════════════════════════════════════════
// 7. Streaming
// ═══════════════════════════════════════════════════════════════

describe("Streaming", () => {
  it("streamResponse returns chunked HTML", async () => {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode("<h1>Streamed</h1>"));
        controller.close();
      },
    });

    const app = new Application();
    app.get("/stream", () => streamResponse(stream));

    const res = await app.fetch(new Request("http://test/stream"));
    assert.equal(res.status, 200);
    assert.equal(res.headers.get("transfer-encoding"), "chunked");
    assert.equal(await res.text(), "<h1>Streamed</h1>");
  });
});

// ═══════════════════════════════════════════════════════════════
// 8. Hook system
// ═══════════════════════════════════════════════════════════════

describe("HookSystem", () => {
  it("beforeRequest and afterResponse fire", async () => {
    const app = new Application();
    const events = [];

    app.hooks.on("beforeRequest", () => { events.push("before"); });
    app.hooks.on("afterResponse", () => { events.push("after"); });
    app.get("/", () => text("ok"));

    await app.fetch(new Request("http://test/"));
    assert.deepEqual(events, ["before", "after"]);
  });
});

// ═══════════════════════════════════════════════════════════════
// 9. Path matching utilities
// ═══════════════════════════════════════════════════════════════

describe("matchPath", () => {
  it("matches required params", () => {
    assert.deepEqual(matchPath("/users/:id", "/users/42"), { id: "42" });
  });

  it("matches optional params", () => {
    assert.deepEqual(matchPath("/users/:id?", "/users"), {});
    assert.deepEqual(matchPath("/users/:id?", "/users/42"), { id: "42" });
  });

  it("matches wildcard params", () => {
    const result = matchPath("/files/:path*", "/files/a/b/c");
    assert.equal(result.path, "a/b/c");
  });

  it("matches catch-all", () => {
    assert.deepEqual(matchPath("/static/*", "/static/foo.js"), { _: "foo.js" });
  });

  it("returns null for no match", () => {
    assert.equal(matchPath("/users/:id", "/posts/1"), null);
  });
});

describe("parseQueryString", () => {
  it("parses key=value pairs", () => {
    assert.deepEqual(parseQueryString("?a=1&b=2"), { a: "1", b: "2" });
  });

  it("handles no query string", () => {
    assert.deepEqual(parseQueryString("/path"), {});
  });
});
