// End-to-end exercise of the chat gateway using Node's built-in
// WebSocket: lobby room list, join (+uniqueness rejection), history,
// messages, typing relay, leave notices, live room counts.
//
// Usage: start `pnpm dev` in one terminal, then:
//   node scripts/ws-chat-client.mjs

const port = process.env.PORT ?? 3007;

let failures = 0;
function assert(name, cond) {
  console.log(`${cond ? 'PASS' : 'FAIL'} — ${name}`);
  if (!cond) failures++;
}

function connect() {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(`ws://127.0.0.1:${port}/chat`);
    const inbox = [];
    socket.addEventListener('message', (event) => {
      inbox.push(JSON.parse(event.data));
    });
    socket.addEventListener('open', () => resolve({ socket, inbox }));
    socket.addEventListener('error', reject);
  });
}

function send(socket, event, data) {
  socket.send(JSON.stringify({ event, data }));
}

// Waits for the Nth (default: first) message matching `event`.
function waitFor(inbox, event, { nth = 1, timeoutMs = 1000 } = {}) {
  return new Promise((resolve) => {
    const start = Date.now();
    const check = () => {
      const found = inbox.filter((m) => m.event === event);
      if (found.length >= nth) return resolve(found[nth - 1]);
      if (Date.now() - start > timeoutMs) return resolve(undefined);
      setTimeout(check, 10);
    };
    check();
  });
}

const alice = await connect();
const bob = await connect();

// ── Lobby: room list on connect ─────────────────────────────────────
const lobby = await waitFor(alice.inbox, 'rooms');
assert(
  'lobby lists preset rooms',
  lobby &&
    ['general', 'random', 'tech'].every((r) =>
      lobby.data.rooms.some((room) => room.name === r)
    )
);

// ── Alice joins ─────────────────────────────────────────────────────
send(alice.socket, 'join', { username: 'Alice', room: 'general' });
const aliceJoined = await waitFor(alice.inbox, 'joined');
assert(
  'alice joined general with herself as only member',
  aliceJoined?.data.room === 'general' &&
    aliceJoined?.data.members.length === 1
);

// ── Username uniqueness ─────────────────────────────────────────────
send(bob.socket, 'join', { username: 'alice', room: 'general' });
const rejected = await waitFor(bob.inbox, 'joinError');
assert('duplicate username rejected (case-insensitive)', !!rejected);

// ── Bob joins, gets history containing alice's join notice ──────────
send(bob.socket, 'join', { username: 'Bob', room: 'general' });
const bobJoined = await waitFor(bob.inbox, 'joined');
assert(
  'bob sees both members and history with join notice',
  bobJoined?.data.members.length === 2 &&
    bobJoined?.data.history.some(
      (e) => e.kind === 'join' && e.username === 'Alice'
    )
);
// Alice's own join already produced her first `members` event.
const aliceSeesBob = await waitFor(alice.inbox, 'members', { nth: 2 });
assert('alice receives members update', aliceSeesBob?.data.members.length === 2);

// ── Rooms count updates in the lobby ────────────────────────────────
const carol = await connect();
const carolLobby = await waitFor(carol.inbox, 'rooms');
assert(
  'lobby shows live member count',
  carolLobby?.data.rooms.find((r) => r.name === 'general')?.members === 2
);

// ── Messages: everyone in the room gets the same canonical message ──
send(alice.socket, 'message', { text: 'hello room' });
const bobMsg = await waitFor(bob.inbox, 'message');
const aliceMsg = await waitFor(alice.inbox, 'message');
assert(
  'message broadcast to room including sender, same id',
  bobMsg?.data.text === 'hello room' && bobMsg?.data.id === aliceMsg?.data.id
);
assert('carol (lobby) got no message', !carol.inbox.some((m) => m.event === 'message'));

// ── Typing relayed, sender excluded ─────────────────────────────────
send(alice.socket, 'typing', { isTyping: true });
const bobTyping = await waitFor(bob.inbox, 'typing');
assert(
  'bob sees alice typing',
  bobTyping?.data.username === 'Alice' && bobTyping?.data.isTyping === true
);
assert(
  'alice does not see her own typing',
  !alice.inbox.some((m) => m.event === 'typing')
);

// ── Leave: notice + members + freed username ────────────────────────
send(alice.socket, 'leave');
await waitFor(alice.inbox, 'left');
// Bob's live system events: his own join (Alice's predates him, it came
// via history), then Alice's leave.
const bobLeaveNotice = await waitFor(bob.inbox, 'system', { nth: 2 });
assert(
  'bob sees alice leave notice',
  bobLeaveNotice?.data.kind === 'leave' && bobLeaveNotice?.data.username === 'Alice'
);
send(carol.socket, 'join', { username: 'ALICE', room: 'general' });
const carolJoined = await waitFor(carol.inbox, 'joined');
assert('username freed after leave', !!carolJoined);

// ── Disconnect also frees presence ──────────────────────────────────
bob.socket.close();
const carolMembers = await waitFor(carol.inbox, 'members', { nth: 2 });
assert(
  'disconnect removes bob from members',
  carolMembers?.data.members.length === 1
);

alice.socket.close();
carol.socket.close();

console.log(failures === 0 ? '\nAll checks passed ✔' : `\n${failures} check(s) failed ✘`);
process.exit(failures === 0 ? 0 : 1);
