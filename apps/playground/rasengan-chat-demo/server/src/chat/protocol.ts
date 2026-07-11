/**
 * Wire protocol for the chat gateway — every payload exchanged over the
 * `{ event, data }` envelope, in both directions. The web app keeps a
 * mirror of this file (web/src/lib/protocol.ts); update both together.
 */

/** Rooms shown as quick-pick cards on the login screen. */
export const PRESET_ROOMS = ['general', 'random', 'tech'] as const;

/** Hard limits enforced server-side and mirrored in the UI. */
export const LIMITS = {
  username: { min: 2, max: 20 },
  room: { min: 2, max: 24 },
  message: { max: 1000 },
  history: 50,
} as const;

// ── Client → server ─────────────────────────────────────────────────

export type JoinPayload = { username: string; room: string };
export type SendMessagePayload = { text: string };
export type TypingPayload = { isTyping: boolean };

// ── Server → client ─────────────────────────────────────────────────

export type ChatMessage = {
  id: string;
  username: string;
  text: string;
  at: number;
};

export type SystemNotice = {
  id: string;
  kind: 'join' | 'leave';
  username: string;
  at: number;
};

export type RoomSummary = {
  name: string;
  members: number;
  /** True for PRESET_ROOMS entries, which are listed even when empty. */
  preset: boolean;
};

/** Sent right after a successful `join`. */
export type JoinedPayload = {
  room: string;
  username: string;
  members: string[];
  history: Array<ChatMessage | SystemNotice>;
};

export type JoinErrorPayload = { message: string };
export type MembersPayload = { members: string[] };
export type RoomsPayload = { rooms: RoomSummary[] };
export type TypingBroadcast = { username: string; isTyping: boolean };
