import { describe, it, expect, vi } from 'vitest';
import { EventEmitter } from 'node:events';
import { RedisGatewayAdapter } from '../adapters/redis.js';

/**
 * Minimal fake standing in for an `ioredis` client: enough surface
 * (`on('message', ...)`, `publish`, `subscribe`, `unsubscribe`) to
 * exercise `RedisGatewayAdapter`'s wiring without a real Redis server.
 * `publisher` and `subscriber` share the same emitter here purely so the
 * test can trigger "a message arrived" by emitting on either handle.
 */
function fakeRedisPair() {
  const emitter = new EventEmitter();
  const publish = vi.fn(async (_channel: string, _message: string) => 1);
  const subscribe = vi.fn(async (_channel: string) => 1);
  const unsubscribe = vi.fn(async (_channel: string) => 1);

  const client = Object.assign(emitter, { publish, subscribe, unsubscribe });
  return {
    publisher: client as any,
    subscriber: client as any,
    publish,
    subscribe,
    unsubscribe,
    emitter,
  };
}

describe('RedisGatewayAdapter', () => {
  it('publish() JSON-serializes the message and calls the publisher client', async () => {
    const { publisher, subscriber, publish } = fakeRedisPair();
    const adapter = new RedisGatewayAdapter({ publisher, subscriber });

    await adapter.publish('/chat', { event: 'hello', data: { text: 'hi' } });

    expect(publish).toHaveBeenCalledWith(
      '/chat',
      JSON.stringify({ event: 'hello', data: { text: 'hi' } })
    );
  });

  it('subscribe() issues SUBSCRIBE once per channel and delivers relayed messages', async () => {
    const { publisher, subscriber, subscribe, emitter } = fakeRedisPair();
    const adapter = new RedisGatewayAdapter({ publisher, subscriber });

    const first = vi.fn();
    const second = vi.fn();
    adapter.subscribe('/chat', first);
    adapter.subscribe('/chat', second);

    // ioredis subscribe() is fire-and-forget in our adapter; give it a tick.
    await Promise.resolve();
    expect(subscribe).toHaveBeenCalledTimes(1);
    expect(subscribe).toHaveBeenCalledWith('/chat');

    emitter.emit(
      'message',
      '/chat',
      JSON.stringify({ event: 'hello', data: null })
    );

    expect(first).toHaveBeenCalledWith({ event: 'hello', data: null });
    expect(second).toHaveBeenCalledWith({ event: 'hello', data: null });
  });

  it('ignores messages on channels nobody subscribed to', () => {
    const { publisher, subscriber, emitter } = fakeRedisPair();
    const adapter = new RedisGatewayAdapter({ publisher, subscriber });
    const onMessage = vi.fn();
    adapter.subscribe('/chat', onMessage);

    emitter.emit(
      'message',
      '/other',
      JSON.stringify({ event: 'hello', data: null })
    );

    expect(onMessage).not.toHaveBeenCalled();
  });

  it('silently ignores a message that fails to JSON.parse', () => {
    const { publisher, subscriber, emitter } = fakeRedisPair();
    const adapter = new RedisGatewayAdapter({ publisher, subscriber });
    const onMessage = vi.fn();
    adapter.subscribe('/chat', onMessage);

    expect(() => emitter.emit('message', '/chat', 'not json')).not.toThrow();
    expect(onMessage).not.toHaveBeenCalled();
  });

  it('unsubscribe stops delivery and issues UNSUBSCRIBE once the last local subscriber is gone', async () => {
    const { publisher, subscriber, unsubscribe, emitter } = fakeRedisPair();
    const adapter = new RedisGatewayAdapter({ publisher, subscriber });
    const onMessage = vi.fn();

    const stop = adapter.subscribe('/chat', onMessage);
    stop();
    await Promise.resolve();

    expect(unsubscribe).toHaveBeenCalledWith('/chat');

    emitter.emit(
      'message',
      '/chat',
      JSON.stringify({ event: 'hello', data: null })
    );
    expect(onMessage).not.toHaveBeenCalled();
  });
});
