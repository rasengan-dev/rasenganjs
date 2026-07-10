// Manual test client for the /chat route in src/main.ts.
// Uses Node's built-in global WebSocket (no extra dependency needed).
//
// Usage: start `pnpm dev` in one terminal, then in another:
//   node scripts/ws-client.mjs             # talks to /chat, expects an echo
//   node scripts/ws-client.mjs /nope       # talks to an unregistered path, expects a 404 upgrade rejection

const path = process.argv[2] ?? '/chat';
const port = process.env.PORT ?? 3006;
const url = `ws://127.0.0.1:${port}${path}`;

console.log(`Connecting to ${url} ...`);
const socket = new WebSocket(url);

socket.addEventListener('open', () => {
  console.log(socket)
  console.log('[client] open — sending "hello"');
  socket.send('hello');
});

socket.addEventListener('message', (event) => {
  console.log('[client] received:', event.data);
  socket.close(1000, 'done');
});

socket.addEventListener('close', (event) => {
  console.log('[client] closed:', event.code, event.reason);
  process.exit(0);
});

socket.addEventListener('error', (event) => {
  console.error('[client] error:', event.message ?? event);
  process.exit(1);
});
