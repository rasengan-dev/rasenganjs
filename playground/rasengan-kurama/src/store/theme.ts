import { createStore, middleware } from '@rasenganjs/kurama';

interface State {
  mode: 'light' | 'dark';
}

interface Actions {
  toggle: () => void;
}

export const useThemeStore = createStore<State & Actions>((set) => ({
  mode: 'light',
  toggle: () =>
    set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
}));
