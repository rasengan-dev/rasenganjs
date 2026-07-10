import type { Redis } from 'ioredis';
import type { GatewayAdapter, BroadcastMessage } from '../types.js';

/**
 * This file only ever imports `ioredis` as a type (`import type`), which
 * is erased at compile time — so `@rasenganjs/ws` has zero runtime
 * dependency on `ioredis` actually being installed. Mirrors how
 * `@rasenganjs/validators`' `zodAdapter` never imports `zod` at runtime
 * either: the caller constructs the library-specific object (a Zod
 * schema there, an `ioredis` client here) and hands it to the adapter.
 */
export interface RedisGatewayAdapterOptions {
  /** `ioredis` client used for `PUBLISH`. Can be shared with app code. */
  publisher: Redis;
  /**
   * A *separate* `ioredis` client used for `SUBSCRIBE`. Redis puts a
   * connection into subscriber mode as soon as it issues `SUBSCRIBE`,
   * after which that connection can no longer run other commands —
   * typically `publisher.duplicate()`.
   */
  subscriber: Redis;
}

/**
 * `GatewayAdapter` backed by Redis Pub/Sub, for horizontally-scaled
 * deployments: a broadcast published on one process is relayed to every
 * other subscribed process, so `client.to(room).emit(...)` reaches room
 * members regardless of which process holds their connection.
 *
 * One Redis channel per gateway `path`. Room membership itself is never
 * stored in Redis — see the design note in `types.ts` on `GatewayAdapter`.
 */
export class RedisGatewayAdapter implements GatewayAdapter {
  private publisher: Redis;
  private subscriber: Redis;
  private handlers = new Map<
    string,
    Set<(message: BroadcastMessage) => void>
  >();

  constructor(options: RedisGatewayAdapterOptions) {
    this.publisher = options.publisher;
    this.subscriber = options.subscriber;

    this.subscriber.on('message', (channel: string, raw: string) => {
      const subs = this.handlers.get(channel);
      if (!subs) return;

      let message: BroadcastMessage;
      try {
        message = JSON.parse(raw);
      } catch {
        return; // Not a message we published — ignore.
      }

      for (const onMessage of subs) {
        onMessage(message);
      }
    });
  }

  async publish(channel: string, message: BroadcastMessage): Promise<void> {
    await this.publisher.publish(channel, JSON.stringify(message));
  }

  subscribe(
    channel: string,
    onMessage: (message: BroadcastMessage) => void
  ): () => void {
    let subs = this.handlers.get(channel);
    const isFirstSubscriber = !subs;
    if (!subs) {
      subs = new Set();
      this.handlers.set(channel, subs);
    }
    subs.add(onMessage);

    if (isFirstSubscriber) {
      // Fire-and-forget: ioredis queues commands issued before the
      // connection is ready and sends them once connected.
      void this.subscriber.subscribe(channel);
    }

    return () => {
      subs!.delete(onMessage);
      if (subs!.size === 0) {
        this.handlers.delete(channel);
        void this.subscriber.unsubscribe(channel);
      }
    };
  }
}
