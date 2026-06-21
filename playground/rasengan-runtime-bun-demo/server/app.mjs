#!/usr/bin/env bun

import { Application, json, html, logger, bodyParser } from '@rasenganjs/runtime';

const app = new Application();

app.use(logger());
app.use(bodyParser());

// app.get('/', () => html(`
//   <h1>@rasenganjs/runtime-bun — demo server</h1>
//   <p>Try <a href="/hello/World">/hello/World</a></p>
// `));

app.get('/hello/:name', (ctx) =>
  json({ message: `Hello, ${ctx.params.name}!` })
);

app.post('/echo', async (ctx) => {
  const body = ctx.get('parsedBody');
  return json({ echo: body ?? null });
});

app.onError((err) =>
  json({ error: err.message }, { status: 500 })
);

app.notFound(() => html('<h1>404 — not found</h1>'));

export default app;
