/**
 * Express server entry — Node only.
 *
 * Run with:
 *   node --import tsx servers/express.ts
 */

import { createApp } from '../frameworks/express.js';

const port = Number(process.env.PORT ?? 3210);
const host = '127.0.0.1';

const app = createApp();

app.listen(port, host, () => {
  console.log(`[express] listening on http://${host}:${port}`);
});
