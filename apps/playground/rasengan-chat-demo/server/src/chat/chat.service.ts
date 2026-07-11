import { Provider } from '@rasenganjs/server';
import {
  LIMITS,
  PRESET_ROOMS,
  type ChatMessage,
  type RoomSummary,
  type SystemNotice,
} from './protocol.js';

/**
 * In-memory chat state: who is in which room, and each room's recent
 * feed (messages + join/leave notices, capped at LIMITS.history).
 *
 * Presence is per-process by design — a client only ever lives on the
 * process holding its connection (see the design note in
 * packages/ecosystem/ws/src/types.ts), so this demo's member lists and
 * counts are exact as long as it runs single-process (the default
 * MemoryGatewayAdapter setup).
 */
export class ChatService extends Provider {
  /** room → (clientId → username) */
  private members = new Map<string, Map<string, string>>();

  /** room → recent feed, oldest first */
  private feeds = new Map<string, Array<ChatMessage | SystemNotice>>();

  // ── Presence ──────────────────────────────────────────────────────

  /** @returns An error message, or null if the username is free & valid. */
  validateJoin(room: string, username: string): string | null {
    if (
      username.length < LIMITS.username.min ||
      username.length > LIMITS.username.max
    ) {
      return `Username must be ${LIMITS.username.min}–${LIMITS.username.max} characters.`;
    }
    if (room.length < LIMITS.room.min || room.length > LIMITS.room.max) {
      return `Room name must be ${LIMITS.room.min}–${LIMITS.room.max} characters.`;
    }
    const taken = [...(this.members.get(room)?.values() ?? [])].some(
      (name) => name.toLowerCase() === username.toLowerCase()
    );
    return taken ? `"${username}" is already taken in #${room}.` : null;
  }

  join(room: string, clientId: string, username: string): void {
    if (!this.members.has(room)) this.members.set(room, new Map());
    this.members.get(room)!.set(clientId, username);
  }

  leave(room: string, clientId: string): void {
    const roomMembers = this.members.get(room);
    if (!roomMembers) return;
    roomMembers.delete(clientId);
    // Drop empty non-preset rooms so the lobby list doesn't grow forever.
    if (roomMembers.size === 0) {
      this.members.delete(room);
      if (!(PRESET_ROOMS as readonly string[]).includes(room)) {
        this.feeds.delete(room);
      }
    }
  }

  memberNames(room: string): string[] {
    return [...(this.members.get(room)?.values() ?? [])];
  }

  /** Preset rooms always listed (even empty), plus any live custom room. */
  roomSummaries(): RoomSummary[] {
    const names = new Set<string>([...PRESET_ROOMS, ...this.members.keys()]);
    return [...names].map((name) => ({
      name,
      members: this.members.get(name)?.size ?? 0,
      preset: (PRESET_ROOMS as readonly string[]).includes(name),
    }));
  }

  // ── Feed (history) ────────────────────────────────────────────────

  record<T extends ChatMessage | SystemNotice>(room: string, entry: T): T {
    const feed = this.feeds.get(room) ?? [];
    feed.push(entry);
    if (feed.length > LIMITS.history) feed.shift();
    this.feeds.set(room, feed);
    return entry;
  }

  history(room: string): Array<ChatMessage | SystemNotice> {
    return this.feeds.get(room) ?? [];
  }
}
