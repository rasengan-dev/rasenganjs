import { useSocket } from './useSocket.js';
import type { EventsMap } from '../core/socket.js';

/**
 * Typed `emit` bound to the socket registered under `name`. Emits are
 * buffered by the socket while the connection isn't open (see
 * `RasenganSocketOptions.emitBufferSize`), so calling this before the
 * connection settles is safe.
 */
export function useEmit<ClientEvents extends EventsMap = EventsMap>(
  name: string = 'default'
) {
  const socket = useSocket<EventsMap, ClientEvents>(name);

  return <Event extends keyof ClientEvents & string>(
    event: Event,
    ...data: Parameters<ClientEvents[Event]>
  ): void => {
    socket?.emit(event, data[0]);
  };
}
