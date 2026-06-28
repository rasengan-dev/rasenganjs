import { useEffect, useRef } from 'react';
import { useSocket } from './useSocket.js';

export function useEvent<
  Events extends Record<string, (...args: any[]) => void>,
  Event extends keyof Events,
>(event: Event, handler: Events[Event], deps?: any[]): void;

export function useEvent<
  Events extends Record<string, (...args: any[]) => void>,
  Event extends keyof Events,
>(name: string, event: Event, handler: Events[Event], deps?: any[]): void;

export function useEvent(
  nameOrEvent: string,
  eventOrHandler: any,
  handlerOrDeps?: any,
  deps?: any[]
) {
  let name = 'default';
  let event: string;
  let handler: (...args: any[]) => void;

  if (typeof eventOrHandler === 'string') {
    name = nameOrEvent;
    event = eventOrHandler;
    handler = handlerOrDeps;
  } else {
    event = nameOrEvent;
    handler = eventOrHandler;
    deps = handlerOrDeps;
  }

  const socket = useSocket(name);
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!socket) return;

    const listener = (...args: any[]) => {
      handlerRef.current(...args);
    };

    socket.on(event, listener);

    return () => {
      socket.off(event, listener);
    };
  }, [socket, event, ...(deps ?? [])]);
}
