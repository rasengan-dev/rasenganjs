import { useSocket } from './useSocket.js';

export function useEmit<ClientEvents = any>(name: string = 'default') {
  const socket = useSocket<any, ClientEvents>(name);

  return <Event extends keyof ClientEvents & string>(
    event: Event,
    ...args: ClientEvents[Event] extends (...args: infer A) => any ? A : never
  ): void => {
    socket?.emit(event, ...args);
  };
}
