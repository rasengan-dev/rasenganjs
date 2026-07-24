import { useEffect, useRef } from 'react';
import { useSocket } from './useSocket.js';
import type { EventsMap } from '../core/socket.js';

export function useEvent<
  Events extends EventsMap,
  Event extends keyof Events & string,
>(event: Event, handler: Events[Event]): void;

export function useEvent<
  Events extends EventsMap,
  Event extends keyof Events & string,
>(name: string, event: Event, handler: Events[Event]): void;

/**
 * Subscribe to one server event for the lifetime of the component.
 * The handler is kept fresh via a ref, so it can freely close over
 * state without re-subscribing — no dependency array needed.
 */
export function useEvent(
  nameOrEvent: string,
  eventOrHandler: string | ((data: any) => void),
  maybeHandler?: (data: any) => void
) {
  let name = 'default';
  let event: string;
  let handler: (data: any) => void;

  if (typeof eventOrHandler === 'string') {
    name = nameOrEvent;
    event = eventOrHandler;
    handler = maybeHandler!;
  } else {
    event = nameOrEvent;
    handler = eventOrHandler;
  }

  const socket = useSocket(name);
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!socket) return;

    return socket.on(event, (data: any) => {
      handlerRef.current(data);
    });
  }, [socket, event]);
}
