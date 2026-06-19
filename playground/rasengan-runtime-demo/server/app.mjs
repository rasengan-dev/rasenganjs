/**
 * @rasenganjs/runtime — shared demo app
 *
 * Single Application instance consumed by both
 * the Node (http.createServer) and Bun (Bun.serve) servers.
 * Import and call `.fetch(request)` in any runtime.
 */

import {
  Application,
  json,
  html,
  streamResponse,
  requestId,
  logger,
  cors,
  bodyParser,
  redirect,
} from "@rasenganjs/runtime";

const demo = new Application();

demo.use(requestId());
demo.use(logger());
demo.use(cors({ origin: "*" }));
demo.use(bodyParser());

demo.get("/", () => html(`
  <h1>@rasenganjs/runtime — demo server</h1>
  <ul>
    <li><a href="/hello/World">GET /hello/:name</a></li>
    <li><a href="/api/users">GET /api/users</a></li>
    <li><a href="/stream">GET /stream</a></li>
  </ul>
`));

demo.get("/hello/:name", (ctx) =>
  json({ message: `Hello, ${ctx.params.name}!` })
);

demo.group("/api", (api) => {
  api.get("/users", () => json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]));

  api.get("/users/:id", (ctx) =>
    json({ id: ctx.params.id, name: "User " + ctx.params.id })
  );
});

demo.post("/echo", async (ctx) => {
  const body = ctx.get("parsedBody");
  return json({ echo: body });
});

demo.get("/stream", () => {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode("<p>streamed content</p>"));
      controller.close();
    },
  });
  return streamResponse(stream);
});

demo.get("/redirect", () => redirect("/"));

demo.get("/crash", () => { throw new Error("demo error"); });

demo.onError((err, _ctx) =>
  json({ error: err.message }, { status: 500 })
);

demo.notFound(() => html("<h1>404 — not found</h1>"));

export default demo;
