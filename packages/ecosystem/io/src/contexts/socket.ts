import { createContext } from 'react';
import type { SocketEntry } from '../types/index.js';

export const SocketContext = createContext<Map<string, SocketEntry>>(new Map());
