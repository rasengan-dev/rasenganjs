/**
 * Mirror of server/src/chat/protocol.ts — the `{ event, data }` payloads
 * exchanged with the chat gateway. Update both files together.
 */

export const PRESET_ROOMS = ['general', 'random', 'tech'] as const;

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
 * chat message. `url` is server-relative (`/files/<name>`) — resolve it
 * with `fileUrl()` from lib/upload.
 */
export type Attachment = {
  kind: AttachmentKind;
  url: string;
  originalname: string;
  mimetype: string;
  size: number;
};

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

export type FeedEntry = ChatMessage | SystemNotice;

export function isSystemNotice(entry: FeedEntry): entry is SystemNotice {
  return 'kind' in entry;
}

export type RoomSummary = {
  name: string;
  members: number;
  preset: boolean;
};

export type JoinedPayload = {
  room: string;
  username: string;
  members: string[];
  history: FeedEntry[];
};
