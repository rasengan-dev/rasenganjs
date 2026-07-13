// The backend for the @rasenganjs/io demo — a rasengan-server app with a
// single @rasenganjs/ws gateway. The frontend talks to it through
// RasenganIOProvider over the Web Standard WebSocket class (no Socket.IO
// on either side).
//
// Run with: pnpm run server
import { bootstrap, defineModule } from '@rasenganjs/server';
import { Gateway, createWsPlugin } from '@rasenganjs/ws';

const ROOM = 'lobby';

class LobbyGateway extends Gateway {
  path = '/lobby';

  /** clientId → registered display name */
  users = new Map();

  onConnect(client) {
    console.log(`[connect] ${client.id}`);
    client.emit('system:message', {
      text: 'Enter a unique name to join the chat.',
    });
  }

  onDisconnect(client) {
    const name = this.users.get(client.id);
    if (!name) return;
    this.users.delete(client.id);
    this.server.to(ROOM).emit('users:update', { users: this.list() });
    this.server.to(ROOM).emit('system:message', { text: `${name} left.` });
    console.log(`[disconnect] ${client.id} ("${name}")`);
  }

  messages(router) {
    // Ack-style registration: the return value resolves the client's
    // emitWithAck() promise; throwing rejects it. No user:registered /
    // user:error events needed anymore.
    router.on('user:register', (client, data) => {
      const trimmed = data?.name?.trim();
      if (!trimmed) {
        throw new Error('Name cannot be empty.');
      }

      const taken = [...this.users.values()].some(
        (name) => name.toLowerCase() === trimmed.toLowerCase()
      );
      if (taken) {
        throw new Error(`"${trimmed}" is already taken.`);
      }

      this.users.set(client.id, trimmed);
      client.join(ROOM);

      // client.to() excludes the registering client, like socket.to() did.
      client.to(ROOM).emit('users:update', { users: this.list() });
      client.to(ROOM).emit('system:message', { text: `${trimmed} joined.` });

      console.log(`[register] ${client.id} as "${trimmed}"`);

      return { name: trimmed, users: this.list() };
    });

    router.on('chat:message', (client, data) => {
      const name = this.users.get(client.id);
      if (!name) return;

      // server.to() has no sender to exclude — everyone in the room,
      // including the author, receives the same canonical message.
      this.server.to(ROOM).emit('chat:message', {
        id: crypto.randomUUID(),
        user: name,
        text: data.text,
        timestamp: Date.now(),
      });
    });
  }

  list() {
    return [...this.users.values()];
  }
}

bootstrap(
  async (app) => {
    app.registerPlugin(createWsPlugin());
    app.registerModule(defineModule({ gateways: [LobbyGateway] }));
  },
  { port: 4000 }
);
