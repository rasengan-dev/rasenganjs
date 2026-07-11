import { useCallback, useEffect, useRef, useState } from 'react';
import { useConnection, useEmit, useEvent } from '@rasenganjs/io';
import type {
  ChatMessage,
  FeedEntry,
  JoinedPayload,
  RoomSummary,
  SystemNotice,
} from '@/lib/protocol';

/** How long a peer's "typing" stays visible without a refresh frame. */
const TYPING_TTL = 3000;
/** Idle time after the last keystroke before we send isTyping: false. */
const TYPING_IDLE = 1800;

export type ChatStatus = 'connecting' | 'lobby' | 'chat';

/** Server → client events, as emitted by the ChatGateway. */
type GatewayEvents = {
  connected: (data: { id: string }) => void;
  rooms: (data: { rooms: RoomSummary[] }) => void;
  joined: (data: JoinedPayload) => void;
  joinError: (data: { message: string }) => void;
  left: () => void;
  message: (data: ChatMessage) => void;
  system: (data: SystemNotice) => void;
  members: (data: { members: string[] }) => void;
  typing: (data: { username: string; isTyping: boolean }) => void;
};

/** Reserved @rasenganjs/io lifecycle events this hook cares about. */
type LifecycleEvents = {
  connect: () => void;
  disconnect: (info: { code?: number; reason?: string }) => void;
};

/** Client → server events, as handled by the ChatGateway's router. */
type ChatEvents = {
  join: (data: { username: string; room: string }) => void;
  leave: () => void;
  message: (data: { text: string }) => void;
  typing: (data: { isTyping: boolean }) => void;
};

type AppState = {
  /** Which screen to show while the socket is connected. */
  phase: 'lobby' | 'chat';
  rooms: RoomSummary[];
  joinError: string | null;
  room: string | null;
  username: string | null;
  feed: FeedEntry[];
  members: string[];
  /** Peers currently typing (never includes the local user). */
  typing: string[];
};

const INITIAL: AppState = {
  phase: 'lobby',
  rooms: [],
  joinError: null,
  room: null,
  username: null,
  feed: [],
  members: [],
  typing: [],
};

/**
 * The chat gateway connection as a small state machine:
 * connecting → lobby → chat (and back). Built entirely on the
 * @rasenganjs/io React API — `RasenganIOProvider` (see main.tsx) owns
 * the socket; this hook only holds app-level state, subscribes with
 * `useEvent`, and re-joins the last room after a reconnect.
 */
export function useChat() {
  const { isConnected } = useConnection();
  const emit = useEmit<ChatEvents>();

  const [state, setState] = useState<AppState>(INITIAL);

  // Last successful join, replayed on reconnect.
  const sessionRef = useRef<{ username: string; room: string } | null>(null);
  const typingTimersRef = useRef(new Map<string, number>());
  const idleTimerRef = useRef<number | null>(null);
  const isTypingSentRef = useRef(false);
  const lastTypingFrameRef = useRef(0);

  const clearPeerTyping = useCallback(() => {
    for (const timer of typingTimersRef.current.values()) {
      window.clearTimeout(timer);
    }
    typingTimersRef.current.clear();
  }, []);

  // Clear pending timers when the component owning this hook unmounts.
  useEffect(() => {
    return () => {
      clearPeerTyping();
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }
    };
  }, [clearPeerTyping]);

  // ── Socket lifecycle (reserved events) ────────────────────────────

  useEvent<LifecycleEvents, 'connect'>('connect', () => {
    // Restore the previous room silently after a server restart or
    // network blip; otherwise the gateway's `connected` event decides.
    const session = sessionRef.current;
    if (session) {
      emit('join', session);
    }
  });

  useEvent<LifecycleEvents, 'disconnect'>('disconnect', () => {
    clearPeerTyping();
    setState((s) => ({ ...s, typing: [] }));
  });

  // ── Gateway events ────────────────────────────────────────────────

  useEvent<GatewayEvents, 'connected'>('connected', () => {
    // Only surface the lobby if we're not mid auto-rejoin.
    if (!sessionRef.current) {
      setState((s) => ({ ...s, phase: 'lobby' }));
    }
  });

  useEvent<GatewayEvents, 'rooms'>('rooms', (data) => {
    setState((s) => ({ ...s, rooms: data.rooms }));
  });

  useEvent<GatewayEvents, 'joined'>('joined', (joined) => {
    sessionRef.current = { username: joined.username, room: joined.room };
    clearPeerTyping();
    setState((s) => ({
      ...s,
      phase: 'chat',
      joinError: null,
      room: joined.room,
      username: joined.username,
      feed: joined.history,
      members: joined.members,
      typing: [],
    }));
  });

  useEvent<GatewayEvents, 'joinError'>('joinError', (data) => {
    sessionRef.current = null;
    setState((s) => ({ ...s, phase: 'lobby', joinError: data.message }));
  });

  useEvent<GatewayEvents, 'left'>('left', () => {
    sessionRef.current = null;
    clearPeerTyping();
    setState((s) => ({
      ...s,
      phase: 'lobby',
      room: null,
      username: null,
      feed: [],
      members: [],
      typing: [],
    }));
  });

  useEvent<GatewayEvents, 'message'>('message', (data) => {
    // A message from a peer implicitly ends their typing state.
    const timer = typingTimersRef.current.get(data.username);
    if (timer !== undefined) {
      window.clearTimeout(timer);
      typingTimersRef.current.delete(data.username);
    }
    setState((s) => ({
      ...s,
      feed: [...s.feed, data],
      typing: s.typing.filter((u) => u !== data.username),
    }));
  });

  useEvent<GatewayEvents, 'system'>('system', (data) => {
    setState((s) => ({ ...s, feed: [...s.feed, data] }));
  });

  useEvent<GatewayEvents, 'members'>('members', (data) => {
    setState((s) => ({ ...s, members: data.members }));
  });

  useEvent<GatewayEvents, 'typing'>('typing', ({ username, isTyping }) => {
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
  });

  // ── Actions ─────────────────────────────────────────────────────────

  const join = useCallback(
    (username: string, room: string) => {
      setState((s) => ({ ...s, joinError: null }));
      emit('join', { username, room });
    },
    [emit]
  );

  const leave = useCallback(() => {
    sessionRef.current = null;
    emit('leave');
  }, [emit]);

  const sendMessage = useCallback(
    (text: string) => {
      emit('message', { text });
      // Sending a message ends the local typing state immediately.
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
      if (isTypingSentRef.current) {
        isTypingSentRef.current = false;
        emit('typing', { isTyping: false });
      }
    },
    [emit]
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
      emit('typing', { isTyping: true });
    }
    if (idleTimerRef.current !== null) {
      window.clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = window.setTimeout(() => {
      idleTimerRef.current = null;
      isTypingSentRef.current = false;
      emit('typing', { isTyping: false });
    }, TYPING_IDLE);
  }, [emit]);

  // The socket-level connection gates everything: while it isn't open
  // (initial connect, reconnect backoff, SSR) the app shows "connecting".
  const status: ChatStatus = !isConnected ? 'connecting' : state.phase;

  return { ...state, status, join, leave, sendMessage, notifyTyping };
}
