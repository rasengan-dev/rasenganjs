import { createStore } from '@rasenganjs/kurama';

interface State {
  count: number;
}

interface Actions {
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useCountStore = createStore<State & Actions>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
