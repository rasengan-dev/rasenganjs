import { useCallback, useEffect, useRef, useState } from 'react';
import type { FeedEntry, JoinedPayload, RoomSummary } from '@/lib/protocol';

const WS_URL =
  (import.meta.env.RASENGAN_CHAT_WS_URL as string | undefined) ??
  'ws://localhost:3007/chat';

/** How long a peer's "typing" stays visible without a refresh frame. */
const TYPING_TTL = 3000;
/** Idle time after the last keystroke before we send isTyping: false. */
const TYPING_IDLE = 1800;
const RECONNECT_DELAY = 2000;

export type ChatStatus = 'connecting' | 'lobby' | 'chat';

export type ChatState = {
  status: ChatStatus;
  rooms: RoomSummary[];
  joinError: string | null;
  room: string | null;
  username: string | null;
  feed: FeedEntry[];
  members: string[];
  /** Peers currently typing (never includes the local user). */
  typing: string[];
};

const INITIAL: ChatState = {
  status: 'connecting',
  rooms: [],
  joinError: null,
  room: null,
  username: null,
  feed: [],
  members: [],
  typing: [],
};

/**
 * Single WebSocket connection to the chat gateway, exposed as a small
 * state machine: connecting → lobby → chat (and back). Speaks the
 * `{ event, data }` envelope from @rasenganjs/ws and auto-rejoins the
 * last room after a reconnect.
 */
export function useChat() {
  const [state, setState] = useState<ChatState>(INITIAL);

  const socketRef = useRef<WebSocket | null>(null);
  // Last successful join, replayed on reconnect.
  const sessionRef = useRef<{ username: string; room: string } | null>(null);
  const typingTimersRef = useRef(new Map<string, number>());
  const idleTimerRef = useRef<number | null>(null);
  const isTypingSentRef = useRef(false);
  const lastTypingFrameRef = useRef(0);

  const send = useCallback((event: string, data?: unknown) => {
    const socket = socketRef.current;
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ event, data }));
    }
  }, []);

  useEffect(() => {
    let disposed = false;
    let reconnectTimer: number | undefined;

    const clearPeerTyping = () => {
      for (const timer of typingTimersRef.current.values()) {
        window.clearTimeout(timer);
      }
      typingTimersRef.current.clear();
    };

    const connect = () => {
      const socket = new WebSocket(WS_URL);
      socketRef.current = socket;

      socket.addEventListener('open', () => {
        // Restore the previous room silently after a server restart or
        // network blip; otherwise the `connected` handler shows the lobby.
        const session = sessionRef.current;
        if (session) {
          socket.send(JSON.stringify({ event: 'join', data: session }));
        }
      });

      socket.addEventListener('message', (raw) => {
        let envelope: { event: string; data: any };
        try {
          envelope = JSON.parse(raw.data as string);
        } catch {
          return;
        }
        const { event, data } = envelope;

        switch (event) {
          case 'connected':
            // Only surface the lobby if we're not mid auto-rejoin.
            if (!sessionRef.current) {
              setState((s) => ({ ...s, status: 'lobby' }));
            }
            break;

          case 'rooms':
            setState((s) => ({ ...s, rooms: data.rooms }));
            break;

          case 'joined': {
            const joined = data as JoinedPayload;
            sessionRef.current = {
              username: joined.username,
              room: joined.room,
            };
            clearPeerTyping();
            setState((s) => ({
              ...s,
              status: 'chat',
              joinError: null,
              room: joined.room,
              username: joined.username,
              feed: joined.history,
              members: joined.members,
              typing: [],
            }));
            break;
          }

          case 'joinError':
            sessionRef.current = null;
            setState((s) => ({
              ...s,
              status: 'lobby',
              joinError: data.message,
            }));
            break;

          case 'left':
            sessionRef.current = null;
            clearPeerTyping();
            setState((s) => ({
              ...s,
              status: 'lobby',
              room: null,
              username: null,
              feed: [],
              members: [],
              typing: [],
            }));
            break;

          case 'message':
          case 'system':
            setState((s) => ({ ...s, feed: [...s.feed, data] }));
            // A message from a peer implicitly ends their typing state.
            if (event === 'message') {
              const timer = typingTimersRef.current.get(data.username);
              if (timer !== undefined) {
                window.clearTimeout(timer);
                typingTimersRef.current.delete(data.username);
                setState((s) => ({
                  ...s,
                  typing: s.typing.filter((u) => u !== data.username),
                }));
              }
            }
            break;

          case 'members':
            setState((s) => ({ ...s, members: data.members }));
            break;

          case 'typing': {
            const { username, isTyping } = data as {
              username: string;
              isTyping: boolean;
            };
            const timers = typingTimersRef.current;
            const existing = timers.get(username);
            if (existing !== undefined) window.clearTimeout(existing);

            if (isTyping) {
              // Expire on our side even if the peer's "stopped" frame is lost.
              timers.set(
                username,
                window.setTimeout(() => {
                  timers.delete(username);
                  setState((s) => ({
                    ...s,
                    typing: s.typing.filter((u) => u !== username),
                  }));
                }, TYPING_TTL)
              );
              setState((s) => ({
                ...s,
                typing: s.typing.includes(username)
                  ? s.typing
                  : [...s.typing, username],
              }));
            } else {
              timers.delete(username);
              setState((s) => ({
                ...s,
                typing: s.typing.filter((u) => u !== username),
              }));
            }
            break;
          }
        }
      });

      socket.addEventListener('close', () => {
        if (disposed) return;
        clearPeerTyping();
        setState((s) => ({ ...s, status: 'connecting', typing: [] }));
        reconnectTimer = window.setTimeout(connect, RECONNECT_DELAY);
      });
    };

    connect();

    return () => {
      disposed = true;
      if (reconnectTimer !== undefined) window.clearTimeout(reconnectTimer);
      clearPeerTyping();
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, []);

  // ── Actions ─────────────────────────────────────────────────────────

  const join = useCallback(
    (username: string, room: string) => {
      setState((s) => ({ ...s, joinError: null }));
      send('join', { username, room });
    },
    [send]
  );

  const leave = useCallback(() => {
    sessionRef.current = null;
    send('leave');
  }, [send]);

  const sendMessage = useCallback(
    (text: string) => {
      send('message', { text });
      // Sending a message ends the local typing state immediately.
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
      if (isTypingSentRef.current) {
        isTypingSentRef.current = false;
        send('typing', { isTyping: false });
      }
    },
    [send]
  );

  /**
   * Call on every keystroke. Throttled to one `true` frame per ~1.5s so
   * long typing bursts keep refreshing the peers' TYPING_TTL without
   * flooding the socket.
   */
  const notifyTyping = useCallback(() => {
    const now = Date.now();
    if (!isTypingSentRef.current || now - lastTypingFrameRef.current > 1500) {
      isTypingSentRef.current = true;
      lastTypingFrameRef.current = now;
      send('typing', { isTyping: true });
    }
    if (idleTimerRef.current !== null) {
      window.clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = window.setTimeout(() => {
      idleTimerRef.current = null;
      isTypingSentRef.current = false;
      send('typing', { isTyping: false });
    }, TYPING_IDLE);
  }, [send]);

  return { ...state, join, leave, sendMessage, notifyTyping };
}
