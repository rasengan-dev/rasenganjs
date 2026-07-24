import { Provider } from '@rasenganjs/server';

/**
 * Tiny in-memory tally, purely to demonstrate that a `Gateway` can inject
 * a `Provider` the exact same way a `Controller` does (same DI container).
 */
export class ChatRoomService extends Provider {
  private messageCounts = new Map<string, number>();

  recordMessage(room: string): number {
    const count = (this.messageCounts.get(room) ?? 0) + 1;
    this.messageCounts.set(room, count);
    return count;
  }
}
