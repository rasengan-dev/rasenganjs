// Manual multi-client test for /rooms (the @rasenganjs/ws Gateway demo
// in src/chat-room.gateway.ts). Uses Node's built-in global WebSocket.
//
// Usage: start `pnpm dev` in one terminal, then in another:
//   node scripts/ws-rooms-client.mjs

const port = process.env.PORT ?? 3006;

let failures = 0;
function assert(name, cond) {
  console.log(`${cond ? 'PASS' : 'FAIL'} — ${name}`);
  if (!cond) failures++;
}

function connect(room) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(`ws://127.0.0.1:${port}/rooms?room=${room}`);
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

function waitFor(inbox, event, timeoutMs = 500) {
  return new Promise((resolve) => {
    const start = Date.now();
    const check = () => {
      const found = inbox.find((m) => m.event === event);
      if (found) return resolve(found);
      if (Date.now() - start > timeoutMs) return resolve(undefined);
      setTimeout(check, 10);
    };
    check();
  });
}

const alice = await connect('lobby');
const bob = await connect('lobby');
const carol = await connect('other'); // different room — should never see lobby traffic

// Everyone gets a `connected` ack on open.
assert('alice got connected ack', (await waitFor(alice.inbox, 'connected')) !== undefined);
assert('bob got connected ack', (await waitFor(bob.inbox, 'connected')) !== undefined);
assert('carol got connected ack', (await waitFor(carol.inbox, 'connected')) !== undefined);

// Alice sends a message in "lobby".
send(alice.socket, 'sendMessage', { text: 'hello lobby' });

const bobMessage = await waitFor(bob.inbox, 'newMessage');
assert('bob (same room) received newMessage', bobMessage?.data.text === 'hello lobby');

const aliceAck = await waitFor(alice.inbox, 'messageSent');
assert('alice (sender) received a direct messageSent ack', aliceAck !== undefined);
assert(
  'alice (sender) did NOT receive her own broadcast',
  (await waitFor(alice.inbox, 'newMessage', 100)) === undefined
);
assert(
  'carol (different room) received nothing from lobby',
  (await waitFor(carol.inbox, 'newMessage', 100)) === undefined
);

// Carol switches into "lobby" and should now receive lobby broadcasts.
send(carol.socket, 'switchRoom', { room: 'lobby' });
assert('carol got roomSwitched ack', (await waitFor(carol.inbox, 'roomSwitched')) !== undefined);

send(bob.socket, 'sendMessage', { text: 'hi again' });
const carolMessage = await waitFor(carol.inbox, 'newMessage');
assert('carol (after switching rooms) now receives lobby broadcasts', carolMessage?.data.text === 'hi again');

for (const { socket } of [alice, bob, carol]) socket.close();

console.log(failures === 0 ? '\nALL PASS' : `\n${failures} FAILURE(S)`);
process.exit(failures === 0 ? 0 : 1);
