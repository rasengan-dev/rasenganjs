import type { GatewayAdapter, BroadcastMessage } from '../types.js';

/**
 * Default `GatewayAdapter` — an in-process pub/sub relay. Correct for a
 * single server instance; broadcasts never leave the process. For
 * multiple instances behind a load balancer, use `RedisGatewayAdapter`
 * so a broadcast published on one process reaches clients connected to
 * another.
 */
export class MemoryGatewayAdapter implements GatewayAdapter {
  private subscribers = new Map<
    string, // channel / path
    Set<(message: BroadcastMessage) => void>
  >();

  async publish(channel: string, message: BroadcastMessage): Promise<void> {
    const subs = this.subscribers.get(channel);
    if (!subs) return;
    for (const onMessage of subs) {
      onMessage(message);
    }
  }

  subscribe(
    channel: string,
    onMessage: (message: BroadcastMessage) => void
  ): () => void {
    let subs = this.subscribers.get(channel);
    if (!subs) {
      subs = new Set();
      this.subscribers.set(channel, subs);
    }
    subs.add(onMessage);

    return () => {
      subs!.delete(onMessage);
      if (subs!.size === 0) {
        this.subscribers.delete(channel);
      }
    };
  }
}
