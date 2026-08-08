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
  /** Per-file upload cap (bytes) enforced by the /upload endpoint. */
  fileSize: 25 * 1024 * 1024,
} as const;

/** What the UI renders an attachment as. Derived from its MIME type. */
export type AttachmentKind = 'image' | 'video' | 'audio' | 'document';

/**
 * A file already uploaded over HTTP (POST /upload), referenced from a
 * chat message. `url` is server-relative (`/files/<name>`) — clients
 * resolve it against the chat server's HTTP origin.
 */
export type Attachment = {
  kind: AttachmentKind;
  url: string;
  originalname: string;
  mimetype: string;
  size: number;
};

// ── Client → server ─────────────────────────────────────────────────

export type JoinPayload = { username: string; room: string };
export type SendMessagePayload = { text?: string; attachment?: Attachment };
export type TypingPayload = { isTyping: boolean };

// ── Server → client ─────────────────────────────────────────────────

export type ChatMessage = {
  id: string;
  username: string;
  text: string;
  at: number;
  attachment?: Attachment;
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
