import { createStore, persist } from '@rasenganjs/kurama';

interface State {
  mode: 'light' | 'dark';
}

interface Actions {
  toggle: () => void;
}

export const useThemeStore = createStore<State & Actions>(
  persist(
    (set) => ({
      mode: 'light',
      toggle: () =>
        set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'theme',
      storage: 'session',
    }
  )
);
