import { describe, it, expect, vi } from 'vitest';
import type { WebSocketConnection } from '@rasenganjs/server';
import {
  createGatewayClient,
  createGatewayServer,
  deliverLocally,
  parseEnvelope,
  serializeEnvelope,
  type LocalClientEntry,
} from '../client.js';
import type { GatewayAdapter } from '../types.js';

function fakeConnection(): WebSocketConnection & { sent: string[] } {
  const sent: string[] = [];
  return {
    sent,
    send: (data) => sent.push(String(data)),
    close: vi.fn(),
    readyState: 1,
    protocol: '',
  };
}

function fakeAdapter(): GatewayAdapter & {
  published: Array<{ channel: string; message: unknown }>;
} {
  const published: Array<{ channel: string; message: unknown }> = [];
  return {
    published,
    publish: vi.fn(async (channel, message) => {
      published.push({ channel, message });
    }),
    subscribe: vi.fn(() => () => {}),
  };
}

describe('serializeEnvelope / parseEnvelope', () => {
  it('round-trips an event/data pair', () => {
    const raw = serializeEnvelope('hello', { text: 'hi' });
    expect(parseEnvelope(raw)).toEqual({
      event: 'hello',
      data: { text: 'hi' },
    });
  });

  it('returns null for invalid JSON', () => {
    expect(parseEnvelope('not json')).toBeNull();
  });

  it('returns null when "event" is missing or not a string', () => {
    expect(parseEnvelope(JSON.stringify({ data: 1 }))).toBeNull();
    expect(parseEnvelope(JSON.stringify({ event: 42, data: 1 }))).toBeNull();
  });
});

describe('createGatewayClient', () => {
  it('emit() sends a serialized envelope directly on the connection', () => {
    const connection = fakeConnection();
    const entry: LocalClientEntry = {
      connection,
      rooms: new Set(),
      data: {},
      client: undefined as any,
    };
    const client = createGatewayClient(
      'id-1',
      new Request('http://x/chat'),
      entry,
      '/chat',
      fakeAdapter()
    );
    entry.client = client;

    client.emit('newMessage', { text: 'hi' });

    expect(connection.sent).toEqual([
      serializeEnvelope('newMessage', { text: 'hi' }),
    ]);
  });

  it('join/leave/rooms track local room membership', () => {
    const entry: LocalClientEntry = {
      connection: fakeConnection(),
      rooms: new Set(),
      data: {},
      client: undefined as any,
    };
    const client = createGatewayClient(
      'id-1',
      new Request('http://x/chat'),
      entry,
      '/chat',
      fakeAdapter()
    );

    client.join('lobby');
    client.join('vip');
    expect(client.rooms().sort()).toEqual(['lobby', 'vip']);

    client.leave('vip');
    expect(client.rooms()).toEqual(['lobby']);
  });

  it('data getter/setter read and write the same backing object as the entry', () => {
    const entry: LocalClientEntry = {
      connection: fakeConnection(),
      rooms: new Set(),
      data: {},
      client: undefined as any,
    };
    const client = createGatewayClient(
      'id-1',
      new Request('http://x/chat'),
      entry,
      '/chat',
      fakeAdapter()
    );

    client.data.user = 'alice';
    expect(entry.data.user).toBe('alice');

    client.data = { user: 'bob' };
    expect(entry.data).toEqual({ user: 'bob' });
  });

  it('to(room) publishes a room-scoped broadcast that excludes the sender', async () => {
    const adapter = fakeAdapter();
    const entry: LocalClientEntry = {
      connection: fakeConnection(),
      rooms: new Set(),
      data: {},
      client: undefined as any,
    };
    const client = createGatewayClient(
      'id-1',
      new Request('http://x/chat'),
      entry,
      '/chat',
      adapter
    );

    await client.to('lobby').emit('newMessage', { text: 'hi' });

    expect(adapter.published).toEqual([
      {
        channel: '/chat',
        message: {
          event: 'newMessage',
          data: { text: 'hi' },
          room: 'lobby',
          excludeClientId: 'id-1',
        },
      },
    ]);
  });

  it('broadcast excludes the sender but is not room-scoped', async () => {
    const adapter = fakeAdapter();
    const entry: LocalClientEntry = {
      connection: fakeConnection(),
      rooms: new Set(),
      data: {},
      client: undefined as any,
    };
    const client = createGatewayClient(
      'id-1',
      new Request('http://x/chat'),
      entry,
      '/chat',
      adapter
    );

    await client.broadcast.emit('ping', null);

    expect(adapter.published[0].message).toMatchObject({
      event: 'ping',
      excludeClientId: 'id-1',
      room: undefined,
    });
  });

  it('disconnect() closes the underlying connection', () => {
    const connection = fakeConnection();
    const entry: LocalClientEntry = {
      connection,
      rooms: new Set(),
      data: {},
      client: undefined as any,
    };
    const client = createGatewayClient(
      'id-1',
      new Request('http://x/chat'),
      entry,
      '/chat',
      fakeAdapter()
    );

    client.disconnect(1000, 'bye');

    expect(connection.close).toHaveBeenCalledWith(1000, 'bye');
  });
});

describe('createGatewayServer', () => {
  it('to(room).emit() publishes a room-scoped broadcast with no excluded client', async () => {
    const adapter = fakeAdapter();
    const server = createGatewayServer('/chat', adapter);

    await server.to('lobby').emit('announcement', { text: 'hi' });

    expect(adapter.published).toEqual([
      {
        channel: '/chat',
        message: {
          event: 'announcement',
          data: { text: 'hi' },
          room: 'lobby',
          excludeClientId: undefined,
        },
      },
    ]);
  });

  it('emit() publishes to everyone with no room and no excluded client', async () => {
    const adapter = fakeAdapter();
    const server = createGatewayServer('/chat', adapter);

    await server.emit('announcement', null);

    expect(adapter.published[0].message).toEqual({
      event: 'announcement',
      data: null,
    });
  });
});

describe('deliverLocally', () => {
  it('delivers to every local client when no room is set', () => {
    const a = fakeConnection();
    const b = fakeConnection();
    const localClients = new Map<string, LocalClientEntry>([
      [
        'a',
        { connection: a, rooms: new Set(), data: {}, client: undefined as any },
      ],
      [
        'b',
        { connection: b, rooms: new Set(), data: {}, client: undefined as any },
      ],
    ]);

    deliverLocally(localClients, { event: 'ping', data: null });

    expect(a.sent).toEqual([serializeEnvelope('ping', null)]);
    expect(b.sent).toEqual([serializeEnvelope('ping', null)]);
  });

  it('only delivers to local clients in the given room', () => {
    const inRoom = fakeConnection();
    const outOfRoom = fakeConnection();
    const localClients = new Map<string, LocalClientEntry>([
      [
        'a',
        {
          connection: inRoom,
          rooms: new Set(['lobby']),
          data: {},
          client: undefined as any,
        },
      ],
      [
        'b',
        {
          connection: outOfRoom,
          rooms: new Set(),
          data: {},
          client: undefined as any,
        },
      ],
    ]);

    deliverLocally(localClients, { event: 'ping', data: null, room: 'lobby' });

    expect(inRoom.sent).toEqual([serializeEnvelope('ping', null)]);
    expect(outOfRoom.sent).toEqual([]);
  });

  it('skips the excluded client id', () => {
    const sender = fakeConnection();
    const other = fakeConnection();
    const localClients = new Map<string, LocalClientEntry>([
      [
        'sender',
        {
          connection: sender,
          rooms: new Set(),
          data: {},
          client: undefined as any,
        },
      ],
      [
        'other',
        {
          connection: other,
          rooms: new Set(),
          data: {},
          client: undefined as any,
        },
      ],
    ]);

    deliverLocally(localClients, {
      event: 'ping',
      data: null,
      excludeClientId: 'sender',
    });

    expect(sender.sent).toEqual([]);
    expect(other.sent).toEqual([serializeEnvelope('ping', null)]);
  });
});
