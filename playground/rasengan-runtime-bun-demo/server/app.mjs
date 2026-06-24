#!/usr/bin/env bun

import { Application, logger, bodyParser } from '@rasenganjs/runtime';

const app = new Application();

app.use(logger());
app.use(bodyParser());

app.get('/', (ctx) => ctx.response.html(`
  <h1>@rasenganjs/runtime-bun — demo server</h1>
  <p>Try <a href="/hello/World">/hello/World</a></p>
`));

app.get('/hello/:name', (ctx) =>
  ctx.response.json({ message: `Hello, ${ctx.params.name}!` })
);

app.post('/echo', async (ctx) => {
  const body = ctx.get('parsedBody');

  return ctx.response
    .status(201)
    .json({ echo: body ?? null });
});

app.onError((err, ctx) =>
  ctx.response
    .status(500)
    .json({ error: err.message })
);

app.notFound((ctx) => ctx.response.html('<h1>404 — not found</h1>'));

export default app;
