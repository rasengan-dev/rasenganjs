# rasengan-chat-demo

Real-time chat rooms — a full-stack playground for `@rasenganjs/server` + `@rasenganjs/ws`
(backend) and Rasengan.js + Tailwind v4 (frontend).

## Features

- Login with a username and a room (preset rooms with live member counts, or create your own)
- Messages broadcast per room, with in-memory history (last 50 entries) for late joiners
- "is typing…" indicator (throttled frames, TTL expiry on the receiver side)
- Join/leave system notices and a live members sidebar
- Per-room username uniqueness, case-insensitive
- Auto-reconnect with silent room re-join

## Run it

```bash
# terminal 1 — the gateway (ws://localhost:3007/chat)
cd server && pnpm dev

# terminal 2 — the web app (http://localhost:5320)
cd web && pnpm dev
```

Open two browser windows to see rooms, typing, and presence in action.

## Protocol check without the browser

```bash
cd server && node scripts/ws-chat-client.mjs
```

Exercises the whole wire protocol (join, uniqueness rejection, history,
messages, typing relay, leave/disconnect presence) against a running dev server.

## Layout

- `server/` — rasengan-server app: `ChatGateway` (@rasenganjs/ws) + `ChatService` (in-memory state)
- `web/` — Rasengan.js app: `useChat()` hook speaking the `{ event, data }` envelope, lobby + chat UI
- The wire protocol lives twice by design: `server/src/chat/protocol.ts` and `web/src/lib/protocol.ts`
