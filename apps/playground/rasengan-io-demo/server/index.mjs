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
    router.on('user:register', (client, data) => {
      const trimmed = data?.name?.trim();
      if (!trimmed) {
        client.emit('user:error', { message: 'Name cannot be empty.' });
        return;
      }

      const taken = [...this.users.values()].some(
        (name) => name.toLowerCase() === trimmed.toLowerCase()
      );
      if (taken) {
        client.emit('user:error', {
          message: `"${trimmed}" is already taken.`,
        });
        return;
      }

      this.users.set(client.id, trimmed);
      client.join(ROOM);

      client.emit('user:registered', { name: trimmed, users: this.list() });
      // client.to() excludes the registering client, like socket.to() did.
      client.to(ROOM).emit('users:update', { users: this.list() });
      client.to(ROOM).emit('system:message', { text: `${trimmed} joined.` });

      console.log(`[register] ${client.id} as "${trimmed}"`);
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
