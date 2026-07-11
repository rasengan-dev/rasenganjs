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
} as const;

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
