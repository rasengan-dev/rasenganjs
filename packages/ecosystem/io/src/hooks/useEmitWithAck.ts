import { useSocket } from './useSocket.js';
import type { EventsMap } from '../core/socket.js';

/**
 * Typed request/response bound to the socket registered under `name` —
 * the hook form of `RasenganSocket.emitWithAck()`.
 *
 * The promise resolves with the gateway handler's return value and
 * rejects when the handler throws, the event is unknown, the timeout
 * passes (default 10s), the connection drops before the reply, or the
 * socket doesn't exist yet (SSR / provider not mounted). Unlike
 * `useEmit`, nothing is ever buffered while offline.
 *
 * ```tsx
 * const emitWithAck = useEmitWithAck<ClientEvents>();
 *
 * const handleJoin = async () => {
 *   try {
 *     const reply = await emitWithAck<'user:register', RegisterReply>(
 *       'user:register',
 *       { name }
 *     );
 *     setUsers(reply.users);
 *   } catch (error) {
 *     setError((error as Error).message);
 *   }
 * };
 * ```
 */
export function useEmitWithAck<ClientEvents extends EventsMap = EventsMap>(
  name: string = 'default'
) {
  const socket = useSocket<EventsMap, ClientEvents>(name);

  return <Event extends keyof ClientEvents & string, Reply = unknown>(
    event: Event,
    data?: Parameters<ClientEvents[Event]>[0],
    options?: { timeout?: number }
  ): Promise<Reply> => {
    if (!socket) {
      return Promise.reject(
        new Error(
          `[rasengan-io] emitWithAck("${event}") has no socket — the ` +
            `RasenganIOProvider isn't mounted yet (or this is running on the server).`
        )
      );
    }
    return socket.emitWithAck<Event, Reply>(event, data, options);
  };
}
